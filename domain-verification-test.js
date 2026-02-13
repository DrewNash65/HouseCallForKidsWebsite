// Domain Verification Test for HouseCall for Kids
// This script tests domain setup and identifies configuration issues

async function testDomainSetup() {
    console.log('🔍 Domain Verification Test for HouseCall for Kids\n');

    // Check DNS records for domain verification
    const domains = [
        '1to1pediatrics.com',
        '1to1Pediatrics.com'  // Note: checking case sensitivity issue
    ];

    console.log('📋 Current Email Configuration Analysis:');
    console.log('─'.repeat(50));
    console.log('FROM address: noreply@1to1pediatrics.com');
    console.log('TO address: ADHD@1to1Pediatrics.com');  
    console.log('REPLY-TO: HouseCallForKids@Gmail.com');
    console.log('');
    console.log('🚨 ISSUES IDENTIFIED:');
    console.log('1. Domain case inconsistency: 1to1pediatrics.com vs 1to1Pediatrics.com');
    console.log('2. Mixed domains: Sending from 1to1pediatrics.com but reply-to Gmail.com');
    console.log('3. This can cause authentication failures!\n');

    // Test if we can get domain info from Resend API
    const apiKey = process.env.RESEND_API_KEY || 're_PfHrnoKE_DgarDsrBWyQ15KWrugfajpVA';
    
    if (!apiKey) {
        console.log('❌ RESEND_API_KEY not found');
        return;
    }

    console.log('🔑 Testing Resend API authentication...');
    
    try {
        // Test API connection with domains endpoint
        const response = await fetch('https://api.resend.com/domains', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('📡 Resend API Response:', response.status, response.statusText);

        if (response.ok) {
            const domains = await response.json();
            console.log('✅ Connected to Resend API successfully');
            console.log('\n📊 Your Verified Domains:');
            console.log('─'.repeat(30));
            
            if (domains.data && domains.data.length > 0) {
                domains.data.forEach((domain, index) => {
                    console.log(`${index + 1}. ${domain.name}`);
                    console.log(`   Status: ${domain.status}`);
                    console.log(`   Region: ${domain.region}`);
                    console.log(`   Created: ${new Date(domain.created_at).toLocaleDateString()}`);
                    if (domain.records) {
                        console.log(`   DNS Records: ${domain.records.length} configured`);
                    }
                    console.log('');
                });

                // Check if the domain we're using is verified
                const usingDomain = '1to1pediatrics.com';
                const verifiedDomain = domains.data.find(d => 
                    d.name.toLowerCase() === usingDomain.toLowerCase() && 
                    d.status === 'verified'
                );

                if (verifiedDomain) {
                    console.log(`✅ Domain ${usingDomain} is verified and ready!`);
                } else {
                    console.log(`❌ Domain ${usingDomain} is NOT verified or configured!`);
                    console.log('🔧 Next steps:');
                    console.log('1. Add 1to1pediatrics.com to your Resend dashboard');
                    console.log('2. Configure the required DNS records');
                    console.log('3. Wait for verification to complete\n');
                }
            } else {
                console.log('❌ No domains found in your Resend account!');
                console.log('🔧 You need to add and verify 1to1pediatrics.com in Resend dashboard\n');
            }

        } else {
            const errorText = await response.text();
            console.log('❌ Failed to connect to Resend API');
            console.log('Error:', errorText);
            
            if (response.status === 401) {
                console.log('🔧 API key is invalid or expired - get a new one from Resend dashboard');
            }
        }

    } catch (error) {
        console.log('❌ Error testing Resend API:', error.message);
    }

    // Test email sending to identify specific issues
    console.log('\n🧪 Testing minimal email send to diagnose issues...');
    
    try {
        const testEmailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'noreply@1to1pediatrics.com',
                to: ['test@resend.dev'], // Resend's test email
                subject: 'Domain Verification Test',
                html: '<p>Testing domain setup for HouseCall for Kids</p>'
            })
        });

        console.log('📤 Test email response:', testEmailResponse.status, testEmailResponse.statusText);
        
        if (testEmailResponse.ok) {
            const result = await testEmailResponse.json();
            console.log('✅ Test email sent successfully:', result.id);
        } else {
            const errorText = await testEmailResponse.text();
            console.log('❌ Test email failed:', errorText);
            
            try {
                const errorData = JSON.parse(errorText);
                if (errorData.name === 'validation_error') {
                    console.log('🔧 Validation Error Details:');
                    errorData.errors?.forEach(err => {
                        console.log(`   - ${err.path}: ${err.message}`);
                    });
                }
            } catch {
                // Error text wasn't JSON
            }
        }

    } catch (error) {
        console.log('❌ Error sending test email:', error.message);
    }

    console.log('\n📋 RECOMMENDED FIXES:');
    console.log('─'.repeat(40));
    console.log('1. Standardize domain casing to: 1to1pediatrics.com');
    console.log('2. Use consistent email addresses within same domain');
    console.log('3. Verify 1to1pediatrics.com is properly set up in Resend');
    console.log('4. Consider using a subdomain like mail.1to1pediatrics.com for emails');
    console.log('5. Update Gmail reply-to to use your verified domain');
}

// Run the test
testDomainSetup().catch(console.error);