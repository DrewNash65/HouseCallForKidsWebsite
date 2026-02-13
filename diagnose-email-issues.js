// Email Delivery Diagnostic Test
async function diagnoseEmailIssues() {
    console.log('🔍 Email Delivery Diagnostic Test\n');
    
    // Check if inquiries@housecallforkids.com exists
    console.log('📧 ISSUE ANALYSIS:');
    console.log('─'.repeat(50));
    console.log('1. inquiries@housecallforkids.com shows as SUPPRESSED');
    console.log('   → This means the email address doesn\'t exist or previously bounced');
    console.log('   → Resend automatically suppresses non-existent emails');
    console.log('');
    console.log('2. Confirmation email sent but not received');
    console.log('   → Could be spam folder, invalid email, or formatting issue');
    console.log('');

    // First, let's test what happens when we send to a known good email
    const apiKey = process.env.RESEND_API_KEY || 're_PfHrnoKE_DgarDsrBWyQ15KWrugfajpVA';
    
    console.log('🧪 Testing email to known working address...');
    
    try {
        // Test with a working email (your email for testing)
        const testResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'noreply@housecallforkids.com',
                to: ['test@resend.dev'], // Resend's test sink
                subject: 'Diagnostic Test - HouseCall for Kids',
                html: `
                    <h2>Email Diagnostic Test</h2>
                    <p>Testing email delivery for HouseCall for Kids</p>
                    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
                    <p><strong>Purpose:</strong> Verify email formatting and delivery</p>
                    <hr>
                    <p>If you receive this, the email system is working correctly.</p>
                `
            })
        });

        if (testResponse.ok) {
            const result = await testResponse.json();
            console.log('✅ Test email sent successfully:', result.id);
        } else {
            const error = await testResponse.text();
            console.log('❌ Test email failed:', error);
        }

    } catch (error) {
        console.log('❌ Test error:', error.message);
    }

    // Check if inquiries email exists by testing different approaches
    console.log('\n🔧 RECOMMENDED SOLUTIONS:');
    console.log('─'.repeat(50));
    console.log('📧 For Practice Notifications (inquiries@housecallforkids.com):');
    console.log('   Option 1: Create inquiries@housecallforkids.com email address');
    console.log('   Option 2: Use existing email like contact@housecallforkids.com'); 
    console.log('   Option 3: Use your personal email for now');
    console.log('');
    console.log('📧 For User Confirmations (delivery issues):');
    console.log('   Option 1: Test with your own email address');
    console.log('   Option 2: Check email content formatting');
    console.log('   Option 3: Add better error handling for bounced emails');
    console.log('');

    // Let's check what emails exist for this domain
    console.log('🏗️  NEXT STEPS:');
    console.log('─'.repeat(30));
    console.log('1. Set up inquiries@housecallforkids.com email address');
    console.log('2. Or redirect to existing working email');
    console.log('3. Test confirmation email with valid address');
    console.log('4. Monitor Resend dashboard for bounce patterns');
}

diagnoseEmailIssues().catch(console.error);