import { NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function maskEmail(email?: string) {
  if (!email) return undefined;
  const parts = email.split('@');
  if (parts.length !== 2) return '[redacted]';
  return `${parts[0].slice(0, 1)}***@${parts[1]}`;
}

export async function OPTIONS() {
  return corsResponse(200, {});
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
      pcpFax,
      formType,
      reasonForVisit
    } = body;

    // Check if this is a Lake Wildwood housecall request
    const isLakeWildwoodRequest = formType === 'Lake Wildwood Housecall Request';

    // Validate required fields based on form type
    if (isLakeWildwoodRequest) {
      if (!patientName || !email || !phoneNumber || !reasonForVisit) {
        return corsResponse(400, { error: 'Missing required fields' });
      }
    } else {
      if (!parentName || !phoneNumber || !email || !patientName || !dateOfBirth || !concerns) {
        return corsResponse(400, { error: 'Missing required fields' });
      }
    }

    if (!emailRegex.test(email)) {
      return corsResponse(400, { error: 'Invalid email format' });
    }

    // Log useful, non-sensitive debug info to help track down 500s in production
    try {
      console.info('send-inquiry request', {
        formType: formType || 'Standard Inquiry',
        parentName: parentName || undefined,
        patientName: patientName || undefined,
        email: maskEmail(email),
        californiaResident,
        hasResendKey: !!process.env.RESEND_API_KEY
      });
    } catch (logErr) {
      console.warn('Failed to log request debug info', logErr);
    }

    // Only check California residency for standard inquiries
    if (!isLakeWildwoodRequest && californiaResident !== 'yes') {
      return corsResponse(400, {
        error:
          'At this time, we only serve patients located in California. Please check back if our service area expands.'
      });
    }

    let practiceEmailContent: string;
    let confirmationEmailContent: string;
    let emailSubject: string;

    if (isLakeWildwoodRequest) {
      practiceEmailContent = buildLakeWildwoodEmail({
        patientName,
        email,
        phoneNumber,
        reasonForVisit,
        submittedAt
      });
      confirmationEmailContent = buildLakeWildwoodConfirmation({
        patientName,
        reasonForVisit
      });
      emailSubject = `Lake Wildwood Housecall Request: ${patientName}`;
    } else {
      practiceEmailContent = buildPracticeEmail({
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
      confirmationEmailContent = buildConfirmationEmail({
        parentName,
        patientName,
        dateOfBirth,
        concerns
      });
      emailSubject = `New Patient Inquiry: ${patientName}`;
    }

    try {
      await sendEmail({
        to: ['ADHD@1to1Pediatrics.com'],
        subject: emailSubject,
        text: practiceEmailContent,
        html: practiceEmailContent.replace(/\n/g, '<br>'),
        replyTo: email
      });
    } catch (err) {
      console.error('Failed to send practice email', err instanceof Error ? err.stack || err.message : err);
      throw err;
    }

    const confirmationSubject = isLakeWildwoodRequest 
      ? 'Lake Wildwood Housecall Request Received'
      : 'Your Inquiry Confirmation - HouseCall for Kids';

    await sendEmail({
      to: [email],
      subject: confirmationSubject,
      text: confirmationEmailContent,
      html: confirmationEmailContent.replace(/\n/g, '<br>'),
      replyTo: 'HouseCallForKids@Gmail.com'
    }).catch(error => {
      console.error('Failed to send confirmation email', error);
    });

    return corsResponse(200, {
      success: true,
      message: 'Inquiry submitted successfully',
      id: Date.now().toString()
    });
  } catch (error) {
    console.error('Inquiry submission error:', error instanceof Error ? error.stack || error.message : error);
    // In non-production environments include detailed debug info to aid troubleshooting.
    const debugInfo =
      process.env.NODE_ENV !== 'production' && error instanceof Error
        ? { message: error.message, stack: error.stack }
        : undefined;

    return corsResponse(500, {
      error: 'Failed to submit inquiry. Please try again or contact us directly.',
      debug: debugInfo
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
    throw new Error('RESEND_API_KEY missing');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'noreply@1to1pediatrics.com',
      to,
      subject,
      html,
      text,
      replyTo
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend API Error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }
    throw new Error(`Failed to send email: ${errorData.message || response.statusText}`);
  }
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

function buildLakeWildwoodEmail(fields: {
  patientName: string;
  email: string;
  phoneNumber: string;
  reasonForVisit: string;
  submittedAt: string;
}) {
  const { patientName, email, phoneNumber, reasonForVisit } = fields;

  return `
LAKE WILDWOOD HOUSECALL REQUEST

CONTACT INFORMATION:
• Patient Name: ${patientName}
• Email: ${email}
• Phone: ${phoneNumber}

REQUEST DETAILS:
• Reason for Visit: ${reasonForVisit}

SUBMISSION DETAILS:
• Submitted: ${new Date().toLocaleString()}
• Service Type: Lake Wildwood In-Home Housecall
• Location: Lake Wildwood (within gates only)

---
This is an automated message from the Lake Wildwood housecall request form.
Please contact the patient to schedule the in-home visit.
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

function buildLakeWildwoodConfirmation({
  patientName,
  reasonForVisit
}: {
  patientName: string;
  reasonForVisit: string;
}) {
  return `
Lake Wildwood Housecall Request Received

Thank you for your housecall request! We've received your request for ${patientName} and will contact you soon to schedule your in-home visit.

YOUR REQUEST DETAILS:
• Patient: ${patientName}
• Reason for Visit: ${reasonForVisit}
• Service Area: Lake Wildwood (within gates)

WHAT HAPPENS NEXT:
• We'll contact you within 24-48 hours to schedule your visit
• We'll confirm your Lake Wildwood address and provide an estimated arrival time
• Payment (starting at $250) will be due at the time of service

IMPORTANT REMINDERS:
• This service is exclusively for Lake Wildwood residents within the gates
• Available during select days and times
• For medical emergencies, call 911
• Additional testing and procedures may incur extra charges

WHAT TO EXPECT:
• Comprehensive in-home urgent care evaluation
• Diagnostic testing when appropriate (strep, flu, COVID, RSV)
• Treatment and prescriptions as needed
• Professional medical care in the comfort of your home

We look forward to providing personalized medical care for your family!

Best regards,
Dr. Nash & The HouseCall for Kids Team

---
This is an automated confirmation. We will contact you directly to schedule your appointment.
For urgent concerns, please call (530) 799-0746 or email HouseCallForKids@gmail.com.
  `.trim();
}
