import { NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function OPTIONS() {
  return corsResponse(200, {});
}

export async function POST(request: Request) {
  try {
    console.log('API route started');
    
    const body = await request.json();
    console.log('Request body parsed:', JSON.stringify(body, null, 2));

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

    console.log('Checking required fields...');
    console.log('Required fields check:', {
      parentName: !!parentName,
      phoneNumber: !!phoneNumber, 
      email: !!email,
      patientName: !!patientName,
      dateOfBirth: !!dateOfBirth,
      concerns: !!concerns
    });

    if (!parentName || !phoneNumber || !email || !patientName || !dateOfBirth || !concerns) {
      console.log('Missing required fields');
      return corsResponse(400, { error: 'Missing required fields' });
    }

    console.log('Email validation...', email);
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return corsResponse(400, { error: 'Invalid email format' });
    }

    console.log('California resident check:', californiaResident);
    if (californiaResident !== 'yes') {
      console.log('Not California resident');
      return corsResponse(400, {
        error:
          'At this time, we only serve patients located in California. Please check back if our service area expands.'
      });
    }

    console.log('Building email content...');
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

    console.log('Sending emails...');
    try {
      console.log('Sending practice email...');
      await sendEmail({
        to: ['ADHD@1to1Pediatrics.com'],
        subject: `New Patient Inquiry: ${patientName}`,
        text: practiceEmailContent,
        html: practiceEmailContent.replace(/\n/g, '<br>'),
        replyTo: email
      });
      console.log('Practice email sent successfully');

      console.log('Sending confirmation email...');
      await sendEmail({
        to: [email],
        subject: 'Your Inquiry Confirmation - HouseCall for Kids',
        text: confirmationEmailContent,
        html: confirmationEmailContent.replace(/\n/g, '<br>'),
        replyTo: 'HouseCallForKids@Gmail.com'
      });
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success since the inquiry was received
      // The email failure shouldn't block the user experience
    }

    console.log('API route completed successfully');
    return corsResponse(200, {
      success: true,
      message: 'Inquiry submitted successfully',
      id: Date.now().toString()
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return corsResponse(500, {
      error: 'Failed to submit inquiry. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const emailPayload = {
    from: 'noreply@1to1pediatrics.com',
    to,
    subject,
    html,
    text,
    replyTo
  };

  console.log('Sending email with payload:', {
    ...emailPayload,
    html: html.substring(0, 100) + '...',
    text: text.substring(0, 100) + '...'
  });

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailPayload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend API Error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`Resend API failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  console.log('Email sent successfully:', result);
  return result;
}

function buildPracticeEmail(fields: Record<string, string>) {
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
• Name: ${parentName}
• Email: ${email}
• Phone: ${phoneNumber}

PATIENT INFORMATION:
• Name: ${patientName}
• Date of Birth: ${dateOfBirth}
• Located in California: ${californiaResident === 'yes' ? 'Yes' : 'No'}

PRIMARY CARE PROVIDER:
• PCP Name: ${pcpName || 'Not provided'}
• PCP Phone: ${pcpPhone || 'Not provided'}
• PCP Fax: ${pcpFax || 'Not provided'}

INQUIRY DETAILS:
• Concerns: ${concerns}
• Interested in After-Hours: ${afterHours || 'No'}
• Has Practice Questions: ${questions || 'No'}

SUBMISSION DETAILS:
• Submitted: ${new Date().toLocaleString()}
• Practice Launch: Early January 2026
• Service Area: California (patients 17 years and under)

---
This is an automated message from your HouseCall for Kids website inquiry form.
Patient is reserving a spot for the Early January 2026 launch.
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
Thank you for your inquiry - HouseCall for Kids

Dear ${parentName},

Thank you for your interest in HouseCall for Kids! We've received your inquiry for ${patientName} and are excited to connect with you.

WHAT HAPPENS NEXT:
• We'll contact you soon about our Early January 2026 launch
• You'll be among the first families to access our virtual pediatric urgent care services
• We'll provide information about scheduling and our OpenEMR patient portal

YOUR INQUIRY DETAILS:
• Patient: ${patientName}
• Date of Birth: ${dateOfBirth}
• Concerns: ${concerns}

IMPORTANT REMINDERS:
• Our practice launches Early January 2026
• We serve patients located in California (patients 17 years and under)
• This is not emergency medical care
• For medical emergencies, call 911 or visit your nearest emergency room

SERVICE INFORMATION:
• Virtual visits via secure video conferencing
• Standard 15-minute visits: $150
• Extended 30-minute visits: $250
• Payment required at time of service (out-of-network for commercial insurance)
• Conditions treated: URIs, ear infections, sinus infections, coughs, fever, plus behavioral/parenting concerns

We're looking forward to serving your family!

Warm regards,
The HouseCall for Kids Team
A division of 1-to-1 Pediatrics

---
This is an automated confirmation. Please do not reply to this email.
For questions, we'll contact you directly soon.
  `.trim();
}
