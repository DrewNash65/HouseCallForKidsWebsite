import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    // Check if we have the API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }

    // Try a simple email
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@1to1pediatrics.com',
        to: ['HouseCallForKids@Gmail.com'],
        subject: 'Test Email',
        html: 'This is a test email from the API.'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        error: 'Email failed', 
        details: `${response.status}: ${errorText}`
      }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}