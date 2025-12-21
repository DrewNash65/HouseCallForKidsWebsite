import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract required fields
    const {
      parentName,
      phoneNumber,
      email,
      patientName,
      dateOfBirth,
      californiaResident,
      concerns
    } = body;

    // Validate required fields
    if (!parentName || !phoneNumber || !email || !patientName || !dateOfBirth || !concerns) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check California resident
    if (californiaResident !== 'yes') {
      return NextResponse.json({
        error: 'At this time, we only serve patients located in California. Please check back if our service area expands.'
      }, { status: 400 });
    }

    // Build email content
    const practiceEmail = `
NEW PATIENT INQUIRY - HouseCall for Kids

PARENT/GUARDIAN: ${parentName}
EMAIL: ${email}
PHONE: ${phoneNumber}

PATIENT: ${patientName}
DATE OF BIRTH: ${dateOfBirth}
CONCERNS: ${concerns}

SUBMISSION TIME: ${new Date().toLocaleString()}
`.trim();

    const confirmationEmail = `
Thank you for your inquiry - HouseCall for Kids

Dear ${parentName},

Thank you for your interest in HouseCall for Kids! We've received your inquiry for ${patientName} and are excited to connect with you.

We'll contact you soon about our Early January 2026 launch. You'll be among the first families to access our virtual pediatric urgent care services.

Warm regards,
The HouseCall for Kids Team
`.trim();

    // Get API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not found');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Send practice email
    const practiceResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@1to1pediatrics.com',
        to: ['ADHD@1to1Pediatrics.com'],
        subject: `New Patient Inquiry: ${patientName}`,
        html: practiceEmail.replace(/\n/g, '<br>'),
        text: practiceEmail,
        replyTo: email
      })
    });

    if (!practiceResponse.ok) {
      console.error('Failed to send practice email:', await practiceResponse.text());
    }

    // Send confirmation email
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@1to1pediatrics.com',
        to: [email],
        subject: 'Your Inquiry Confirmation - HouseCall for Kids',
        html: confirmationEmail.replace(/\n/g, '<br>'),
        text: confirmationEmail,
        replyTo: 'HouseCallForKids@Gmail.com'
      })
    });

    if (!confirmationResponse.ok) {
      console.error('Failed to send confirmation email:', await confirmationResponse.text());
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: Date.now().toString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      error: 'Failed to submit inquiry. Please try again or contact us directly.'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}