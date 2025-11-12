import { NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      submittedAt
    } = body;

    if (!parentName || !phoneNumber || !email || !patientName || !dateOfBirth || !concerns) {
      return corsResponse(400, { error: 'Missing required fields' });
    }

    if (!emailRegex.test(email)) {
      return corsResponse(400, { error: 'Invalid email format' });
    }

    if (californiaResident !== 'yes') {
      return corsResponse(400, {
        error:
          'At this time, we only serve patients located in California. Please check back if our service area expands.'
      });
    }

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
      submittedAt
    });

    const confirmationEmailContent = buildConfirmationEmail({
      parentName,
      patientName,
      dateOfBirth,
      concerns
    });

    await sendEmail({
      to: ['Drew@1to1Pediatrics.com'],
      subject: `New Patient Inquiry: ${patientName}`,
      text: practiceEmailContent,
      html: practiceEmailContent.replace(/\n/g, '<br>'),
      replyTo: email
    });

    await sendEmail({
      to: [email],
      subject: 'Your Inquiry Confirmation - HouseCall for Kids',
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
    console.error('Inquiry submission error:', error);
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
    throw new Error('RESEND_API_KEY missing');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'noreply@housecallforkids.com',
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
    questions
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
