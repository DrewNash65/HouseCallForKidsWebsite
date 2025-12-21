import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Minimal test API started');
    
    const body = await request.json();
    console.log('Body received:', body);
    
    // Just return success without doing anything else
    return NextResponse.json({
      success: true,
      message: 'Minimal test completed',
      received: body
    });
    
  } catch (error) {
    console.error('Minimal test error:', error);
    return NextResponse.json({
      error: 'Minimal test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}