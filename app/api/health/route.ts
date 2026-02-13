import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  
  console.log('=== HEALTH CHECK ===');
  console.log('Timestamp:', timestamp);
  
  // Check environment variables
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const nodeEnv = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV;
  
  const healthStatus = {
    status: 'healthy',
    timestamp,
    environment: {
      NODE_ENV: nodeEnv,
      VERCEL_ENV: vercelEnv,
      hasResendKey: !!apiKey,
      resendKeyFormat: apiKey ? (apiKey.startsWith('re_') ? 'valid' : 'invalid') : 'missing',
      resendKeyLength: apiKey?.length || 0
    },
    api: {
      version: '1.0.0',
      emailService: 'resend'
    }
  };

  console.log('Health check result:', healthStatus);

  return NextResponse.json(healthStatus, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}