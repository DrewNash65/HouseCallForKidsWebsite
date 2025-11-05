export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
    } = req.body;

    // Validate required fields
    if (!parentName || !phoneNumber || !email || !patientName || !dateOfBirth || !concerns) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // California residency validation
    if (californiaResident !== 'yes') {
      return res.status(400).json({
        error: 'At this time, we only serve patients located in California. Please check back if our service area expands.'
      });
    }

    // Create email content for practice
    const practiceEmailContent = `
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
Patient is reserving spot for Early January 2026 launch.
    `.trim();

    // Create confirmation email content
    const confirmationEmailContent = `
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

    // Send notification email to practice
    const practiceResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@1to1pediatrics.com',
        to: ['ADHD@1to1Pediatrics.com'], // Practice email
        subject: `New Patient Inquiry: ${patientName}`,
        html: practiceEmailContent.replace(/\n/g, '<br>'),
        text: practiceEmailContent,
        replyTo: email
      })
    });

    if (!practiceResponse.ok) {
      const errorData = await practiceResponse.json().catch(() => ({}));
      throw new Error(`Failed to send practice notification: ${errorData.message || 'Unknown error'}`);
    }

    // Send confirmation email to parent
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@1to1pediatrics.com',
        to: [email],
        subject: 'Your Inquiry Confirmation - HouseCall for Kids',
        html: confirmationEmailContent.replace(/\n/g, '<br>'),
        text: confirmationEmailContent,
        replyTo: 'ADHD@1to1Pediatrics.com' // Practice email
      })
    });

    if (!confirmationResponse.ok) {
      const errorData = await confirmationResponse.json().catch(() => ({}));
      console.error('Failed to send confirmation email:', errorData);
      // Don't throw error here - practice notification was sent successfully
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
      id: Date.now().toString()
    });

  } catch (error) {
    console.error('Inquiry submission error:', error);
    return res.status(500).json({
      error: 'Failed to submit inquiry. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}