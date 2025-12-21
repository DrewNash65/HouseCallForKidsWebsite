import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    return NextResponse.json({
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyStart: apiKey ? apiKey.substring(0, 8) + '...' : 'N/A',
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check environment' });
  }
}