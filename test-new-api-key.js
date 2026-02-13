// Test form submission with new HouseCall for Kids API key
const deployedUrl = 'https://housecall-for-kids-mglc6bh4s-drew-1to1pediatris-projects.vercel.app';

async function testNewAPIKey() {
    console.log('🔑 Testing Form with NEW HouseCall for Kids API Key\n');
    console.log('🌐 Site URL:', deployedUrl);

    // Test health check to verify API key
    console.log('🏥 Checking API key status...');
    try {
        const healthResponse = await fetch(`${deployedUrl}/api/health`);
        const healthData = await healthResponse.json();
        
        if (healthResponse.ok && healthData.status === 'healthy') {
            console.log('✅ API Key Health Check:');
            console.log('   - Key Present:', healthData.environment.hasResendKey ? 'YES' : 'NO');
            console.log('   - Key Format:', healthData.environment.resendKeyFormat);
            console.log('   - Key Length:', healthData.environment.resendKeyLength);
            console.log('   - Environment:', healthData.environment.NODE_ENV);
        } else {
            console.log('❌ Health check failed:', healthData);
            return;
        }
    } catch (error) {
        console.log('❌ Health check error:', error.message);
        return;
    }

    // Test form submission with comprehensive data
    console.log('\n📧 Testing form submission with new API key...');
    
    const testData = {
        parentName: 'Test Parent - New API Key',
        phoneNumber: '(555) 987-6543',
        email: 'newkey-test@example.com',
        patientName: 'API Key Test Child',
        dateOfBirth: '2021-03-10',
        californiaResident: 'yes',
        concerns: 'Testing form submission with the new HouseCall for Kids specific Resend API key. This should work independently from the ADHD website.',
        afterHours: 'Yes',
        questions: 'No',
        pcpName: 'Dr. New Key Test',
        pcpPhone: '(555) 111-2222',
        pcpFax: '(555) 111-2223',
        submittedAt: new Date().toISOString()
    };

    console.log('📝 Test Data:');
    console.log('   - Parent:', testData.parentName);
    console.log('   - Patient:', testData.patientName);
    console.log('   - Email:', testData.email);

    try {
        console.log('\n📤 Submitting form...');
        const submitStart = Date.now();
        
        const response = await fetch(`${deployedUrl}/api/send-inquiry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const submitTime = Date.now() - submitStart;
        console.log(`📡 Response received in ${submitTime}ms`);
        console.log('   Status:', response.status, response.statusText);

        let result;
        try {
            result = await response.json();
        } catch (parseError) {
            console.log('❌ Failed to parse response JSON:', parseError.message);
            console.log('Raw response:', await response.text());
            return;
        }

        if (response.ok) {
            console.log('✅ FORM SUBMISSION SUCCESSFUL!');
            console.log('\n📊 Email Delivery Status:');
            console.log('   - Practice Notification:', result.emailStatus?.practiceNotification ? '✅ SENT' : '❌ FAILED');
            console.log('   - Confirmation Email:', result.emailStatus?.confirmationEmail ? '✅ SENT' : '❌ FAILED');
            console.log('   - Inquiry ID:', result.id);
            
            if (result.emailStatus?.warnings && result.emailStatus.warnings.length > 0) {
                console.log('\n⚠️  Email Warnings:');
                result.emailStatus.warnings.forEach(warning => {
                    console.log(`   - ${warning}`);
                });
            }
            
            console.log('\n🎉 SUCCESS! New API key is working perfectly');
            console.log('✅ Form is fully operational with HouseCall for Kids API key');
            console.log('✅ Independent from ADHD.1to1pediatrics.com');
            
        } else {
            console.log('❌ FORM SUBMISSION FAILED');
            console.log('   Error:', result.error);
            console.log('   Details:', result.details);
            console.log('   Troubleshooting:', result.troubleshooting || 'None provided');
            
            // Check for specific API key issues
            if (response.status === 401 || response.status === 403) {
                console.log('\n🔧 LIKELY ISSUE: API Key Authentication');
                console.log('   - Verify new API key is correctly set in Vercel dashboard');
                console.log('   - Ensure key has proper permissions for housecallforkids.com domain');
                console.log('   - Check if key is for the correct Resend account/project');
            } else if (response.status === 422) {
                console.log('\n🔧 LIKELY ISSUE: Domain Verification');
                console.log('   - Verify housecallforkids.com is verified in the new API key\'s account');
                console.log('   - Check DNS records are properly configured');
            } else if (response.status === 500) {
                console.log('\n🔧 LIKELY ISSUE: Server Error');
                console.log('   - API key may be invalid or expired');
                console.log('   - Rate limits may be exceeded');
                console.log('   - Check Vercel function logs for details');
            }
        }

    } catch (error) {
        console.log('❌ NETWORK/CONNECTION ERROR:', error.message);
        
        if (error.message.includes('fetch')) {
            console.log('🔧 Check network connectivity and site availability');
        }
    }

    console.log('\n📋 NEXT STEPS:');
    if (response && response.ok) {
        console.log('✅ No action needed - form is working correctly');
        console.log('✅ You can now use separate API keys for each website');
    } else {
        console.log('🔧 Troubleshooting needed:');
        console.log('   1. Verify new API key in Vercel environment variables');
        console.log('   2. Check Resend dashboard for domain verification status');
        console.log('   3. Ensure API key has proper permissions');
        console.log('   4. Test API key directly in Resend dashboard');
    }
}

testNewAPIKey().catch(console.error);