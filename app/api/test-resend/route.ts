import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY not found',
        env: Object.keys(process.env).filter(key => key.includes('RESEND'))
      }, { status: 500 });
    }

    // Test a simple email send
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@1to1pediatrics.com',
        to: ['ADHD@1to1Pediatrics.com'],
        subject: 'Test Email from API Route',
        html: '<h1>Test Email</h1><p>This is a test email from the API route.</p>',
        text: 'Test Email\n\nThis is a test email from the API route.'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        error: 'Resend API failed',
        status: response.status,
        statusText: response.statusText,
        body: errorText
      }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({
      success: true,
      result: result
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Catch block triggered',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}