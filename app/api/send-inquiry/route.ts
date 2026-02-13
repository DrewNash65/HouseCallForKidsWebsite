import { NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function OPTIONS() {
  return corsResponse(200, {});
}

export async function POST(request: Request) {
  console.log('=== NEW INQUIRY SUBMISSION ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request URL:', request.url);
  
  try {
    const body = await request.json();
    console.log('Request body received:', Object.keys(body));

    const {
      parentName,
      phoneNumber,
      email,
      patientName,
      dateOfBirth,
      californiaResident,
      concerns,
      afterHours,
      questions,
      submittedAt,
      pcpName,
      pcpPhone,
      pcpFax
    } = body;

    // Enhanced validation with detailed error messages
    const missingFields = [];
    if (!parentName?.trim()) missingFields.push('parentName');
    if (!phoneNumber?.trim()) missingFields.push('phoneNumber');
    if (!email?.trim()) missingFields.push('email');
    if (!patientName?.trim()) missingFields.push('patientName');
    if (!dateOfBirth?.trim()) missingFields.push('dateOfBirth');
    if (!concerns?.trim()) missingFields.push('concerns');

    if (missingFields.length > 0) {
      console.log('❌ Missing required fields:', missingFields);
      return corsResponse(400, { 
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields 
      });
    }

    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return corsResponse(400, { error: 'Invalid email format' });
    }

    if (californiaResident !== 'yes') {
      console.log('❌ Non-California resident:', californiaResident);
      return corsResponse(400, {
        error: 'At this time, we only serve patients located in California. Please check back if our service area expands.'
      });
    }

    console.log('✅ Validation passed for:', { parentName, email, patientName });

    const practiceEmailContent = buildPracticeEmail({
      parentName,
      phoneNumber,
      email,
      patientName,
      dateOfBirth,
      californiaResident,
      concerns,
      afterHours,
      questions,
      submittedAt,
      pcpName,
      pcpPhone,
      pcpFax
    });

    const confirmationEmailContent = buildConfirmationEmail({
      parentName,
      patientName,
      dateOfBirth,
      concerns
    });

    // Email sending with individual error handling
    let practiceEmailSuccess = false;
    let confirmationEmailSuccess = false;
    const emailErrors: string[] = [];

    try {
      console.log('📧 Attempting to send practice notification email...');
      const practiceEmailResult = await sendEmail({
        to: ['housecallforkids@gmail.com'],
        subject: `New Patient Inquiry: ${patientName}`,
        text: practiceEmailContent,
        html: practiceEmailContent.replace(/\n/g, '<br>'),
        replyTo: email
      });
      console.log('✅ Practice email sent successfully:', practiceEmailResult.id);
      practiceEmailSuccess = true;
      
      // Add 5 second delay to prevent Gmail rate limiting while staying under Vercel timeout
      console.log('⏱️  Adding 5 second delay before confirmation email...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (practiceEmailError) {
      const errorMsg = `Practice email failed: ${practiceEmailError instanceof Error ? practiceEmailError.message : 'Unknown error'}`;
      console.error('❌ Practice email error:', errorMsg);
      emailErrors.push(errorMsg);
    }

    try {
      console.log('📧 Attempting to send confirmation email...');
      const confirmationEmailResult = await sendEmail({
        to: [email],
        subject: 'Welcome to HouseCall for Kids - We received your inquiry!',
        text: confirmationEmailContent,
        html: confirmationEmailContent.replace(/\n/g, '<br>'),
        replyTo: 'contact@housecallforkids.com'
      });
      console.log('✅ Confirmation email sent successfully:', confirmationEmailResult.id);
      confirmationEmailSuccess = true;
    } catch (confirmationEmailError) {
      const errorMsg = `Confirmation email failed: ${confirmationEmailError instanceof Error ? confirmationEmailError.message : 'Unknown error'}`;
      console.error('❌ Confirmation email error:', errorMsg);
      emailErrors.push(errorMsg);
    }

    // Handle partial failures
    if (!practiceEmailSuccess && !confirmationEmailSuccess) {
      console.log('🚫 Both emails failed');
      return corsResponse(500, {
        error: 'Failed to send emails. Please try again or contact us directly.',
        details: emailErrors.join(' | '),
        troubleshooting: 'This may be a temporary issue. Please try again in a few minutes.'
      });
    }

    if (!practiceEmailSuccess || !confirmationEmailSuccess) {
      console.log('⚠️  Partial email failure');
      // Still return success but log the issue
      const warning = emailErrors.join(' | ');
      console.log('Warning:', warning);
    }

    console.log('✅ Inquiry submission completed successfully');
    return corsResponse(200, {
      success: true,
      message: 'Inquiry submitted successfully',
      id: Date.now().toString(),
      emailStatus: {
        practiceNotification: practiceEmailSuccess,
        confirmationEmail: confirmationEmailSuccess,
        ...(emailErrors.length > 0 && { warnings: emailErrors })
      }
    });

  } catch (error) {
    console.error('❌ Critical error in inquiry submission:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return corsResponse(500, {
      error: 'Failed to submit inquiry. Please try again or contact us directly.',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}

function corsResponse(status: number, data: Record<string, unknown>) {
  const response = NextResponse.json(data, { status });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo
}: {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  
  console.log('=== RESEND API DEBUG INFO ===');
  console.log('API Key available:', !!apiKey);
  console.log('API Key length:', apiKey?.length || 0);
  console.log('API Key format check:', apiKey?.startsWith('re_') ? 'VALID' : 'INVALID');
  console.log('Environment details:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString()
  });
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is missing or empty');
  }

  if (!apiKey.startsWith('re_')) {
    throw new Error('RESEND_API_KEY appears to be invalid (should start with "re_")');
  }

  const emailPayload = {
    from: 'noreply@housecallforkids.com',
    to,
    subject,
    html,
    text,
    ...(replyTo && { replyTo })
  };

  console.log('=== SENDING EMAIL ===');
  console.log('Recipients:', to);
  console.log('Subject:', subject);
  console.log('From:', emailPayload.from);
  console.log('Reply-to:', replyTo || 'none');

  // Retry logic for better reliability
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} - Calling Resend API...`);
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'HouseCallForKids/1.0'
        },
        body: JSON.stringify(emailPayload),
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(15000) // 15 seconds
      });

      console.log(`Attempt ${attempt} - Response:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ SUCCESS on attempt ${attempt}:`, result);
        return result;
      } else {
        // Handle different types of errors
        const errorText = await response.text();
        console.error(`❌ FAILED attempt ${attempt}:`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        // Parse error details if possible
        let errorDetails;
        try {
          errorDetails = JSON.parse(errorText);
        } catch {
          errorDetails = { message: errorText };
        }

        // Don't retry for certain errors
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Authentication failed: ${errorDetails.message || errorText}`);
        }

        if (response.status === 422) {
          throw new Error(`Invalid request: ${errorDetails.message || errorText}`);
        }

        lastError = new Error(`Resend API error (${response.status}): ${errorDetails.message || errorText}`);
        
        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries) {
          const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
          console.log(`⏱️  Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    } catch (error) {
      console.error(`❌ EXCEPTION on attempt ${attempt}:`, error);
      
      if (error instanceof Error && error.name === 'TimeoutError') {
        lastError = new Error('Request timed out after 15 seconds');
      } else if (error instanceof Error && error.message.includes('Authentication failed')) {
        throw error; // Don't retry auth errors
      } else {
        lastError = error instanceof Error ? error : new Error('Unknown error occurred');
      }

      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000;
        console.log(`⏱️  Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // If we get here, all attempts failed
  console.error('🚫 All retry attempts failed');
  throw lastError || new Error('Failed to send email after multiple attempts');
}

function buildPracticeEmail(fields: Record<string, string | undefined>) {
  const {
    parentName,
    phoneNumber,
    email,
    patientName,
    dateOfBirth,
    californiaResident,
    concerns,
    afterHours,
    questions,
    pcpName,
    pcpPhone,
    pcpFax
  } = fields;

  return `
NEW PATIENT INQUIRY - HouseCall for Kids Virtual Pediatric Urgent Care

PARENT/GUARDIAN INFORMATION:
• Name: ${parentName || 'Not provided'}
• Email: ${email || 'Not provided'}
• Phone: ${phoneNumber || 'Not provided'}

PATIENT INFORMATION:
• Name: ${patientName || 'Not provided'}
• Date of Birth: ${dateOfBirth || 'Not provided'}
• Located in California: ${californiaResident === 'yes' ? 'Yes' : 'No'}

PRIMARY CARE PROVIDER:
• PCP Name: ${pcpName || 'Not provided'}
• PCP Phone: ${pcpPhone || 'Not provided'}
• PCP Fax: ${pcpFax || 'Not provided'}

INQUIRY DETAILS:
• Concerns: ${concerns || 'Not provided'}
• Interested in After-Hours: ${afterHours || 'No'}
• Has Practice Questions: ${questions || 'No'}

SUBMISSION DETAILS:
• Submitted: ${new Date().toLocaleString()}
• Practice Status: Now Active and Accepting Patients
• Service Area: California (patients 17 years and under)

---
This is an automated message from your HouseCall for Kids website inquiry form.
Patient inquiry for virtual pediatric urgent care services.
  `.trim();
}

function buildConfirmationEmail({
  parentName,
  patientName,
  dateOfBirth,
  concerns
}: {
  parentName: string;
  patientName: string;
  dateOfBirth: string;
  concerns: string;
}) {
  return `
Thank you for reaching out to HouseCall for Kids!

Dear ${parentName || 'Parent/Guardian'},

We've received your inquiry for ${patientName || 'your child'} and are excited to help your family access convenient, caring pediatric urgent care.

YOUR INQUIRY:
• Patient: ${patientName || 'Not provided'}
• Date of Birth: ${dateOfBirth || 'Not provided'}
• Concerns: ${concerns || 'Not provided'}

WHAT HAPPENS NEXT:
• Our team will contact you soon to schedule your virtual appointment
• We'll provide detailed service information and scheduling options
• You'll receive access to our patient portal

IMPORTANT REMINDERS:
• We serve families throughout California (patients 17 years and under)
• For medical emergencies, please call 911 or visit your nearest emergency room
• This confirmation is not medical advice

Thank you for choosing HouseCall for Kids. We look forward to caring for your family!

Warm regards,
The HouseCall for Kids Team
A division of 1-to-1 Pediatrics

---
Questions? We'll be in touch soon with all the details.
  `.trim();
}
