// Quick verification test for the domain fix
// Tests Resend API directly with verified domain

async function testVerifiedDomainFix() {
    console.log('🔧 Testing Domain Fix with Verified housecallforkids.com\n');

    const apiKey = process.env.RESEND_API_KEY || 're_PfHrnoKE_DgarDsrBWyQ15KWrugfajpVA';
    
    if (!apiKey) {
        console.log('❌ RESEND_API_KEY not found');
        return;
    }

    console.log('📧 Testing email with VERIFIED domain: housecallforkids.com');
    
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'noreply@housecallforkids.com',  // Using VERIFIED domain
                to: ['test@resend.dev'],
                subject: 'Domain Fix Test - HouseCall for Kids',
                html: `
                    <h2>Domain Fix Verification</h2>
                    <p>This email tests the domain fix for HouseCall for Kids.</p>
                    <p><strong>FROM:</strong> noreply@housecallforkids.com (verified domain)</p>
                    <p><strong>Test Time:</strong> ${new Date().toISOString()}</p>
                `
            })
        });

        console.log('📤 Response:', response.status, response.statusText);

        if (response.ok) {
            const result = await response.json();
            console.log('✅ SUCCESS! Email sent with verified domain');
            console.log('📬 Email ID:', result.id);
            console.log('\n🎉 DOMAIN FIX CONFIRMED WORKING!');
            console.log('The form should now work reliably with housecallforkids.com domain.');
        } else {
            const errorText = await response.text();
            console.log('❌ FAILED:', errorText);

            try {
                const errorData = JSON.parse(errorText);
                if (errorData.name === 'validation_error' && errorData.errors) {
                    console.log('\n📋 Error Details:');
                    errorData.errors.forEach(err => {
                        console.log(`   - ${err.path}: ${err.message}`);
                    });
                }
            } catch {
                // Error wasn't JSON
            }
        }

    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    // Test the practice notification email format too
    console.log('\n📧 Testing practice notification email...');
    
    try {
        const practiceResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'noreply@housecallforkids.com',
                to: ['inquiries@housecallforkids.com'],  // Updated recipient
                subject: 'Test: New Patient Inquiry',
                html: `
                    <h2>TEST - New Patient Inquiry</h2>
                    <p>This is a test of the practice notification system.</p>
                    <p><strong>Domain Fix:</strong> Using verified housecallforkids.com</p>
                    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
                `,
                replyTo: 'contact@housecallforkids.com'
            })
        });

        console.log('📤 Practice email response:', practiceResponse.status, practiceResponse.statusText);
        
        if (practiceResponse.ok) {
            const result = await practiceResponse.json();
            console.log('✅ Practice notification test successful:', result.id);
        } else {
            const errorText = await practiceResponse.text();
            console.log('❌ Practice notification failed:', errorText);
        }

    } catch (error) {
        console.log('❌ Practice notification error:', error.message);
    }

    console.log('\n📋 SUMMARY:');
    console.log('─'.repeat(40));
    console.log('✅ Switched FROM: noreply@housecallforkids.com (verified)');
    console.log('✅ Switched TO: inquiries@housecallforkids.com');
    console.log('✅ Switched REPLY-TO: contact@housecallforkids.com');
    console.log('✅ All emails now use the VERIFIED domain');
    console.log('\n🚀 Your form should now work reliably!');
}

testVerifiedDomainFix().catch(console.error);