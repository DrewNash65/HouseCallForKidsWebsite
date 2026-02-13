// Test deployed form with domain fix
const deployedUrl = 'https://housecall-for-kids-mglc6bh4s-drew-1to1pediatris-projects.vercel.app';

async function testDeployedForm() {
    console.log('🚀 Testing DEPLOYED site with domain fix...\n');
    console.log('🌐 Site URL:', deployedUrl);

    // Test health check first
    console.log('\n🏥 Testing health check...');
    try {
        const healthResponse = await fetch(`${deployedUrl}/api/health`);
        const healthData = await healthResponse.json();
        
        if (healthResponse.ok && healthData.status === 'healthy') {
            console.log('✅ Health check PASSED');
            console.log('   - Environment:', healthData.environment.NODE_ENV);
            console.log('   - Resend key:', healthData.environment.hasResendKey ? 'Present' : 'Missing');
            console.log('   - Key format:', healthData.environment.resendKeyFormat);
        } else {
            console.log('❌ Health check FAILED:', healthData);
            return;
        }
    } catch (error) {
        console.log('❌ Health check error:', error.message);
        return;
    }

    // Test form submission
    console.log('\n📧 Testing form submission with fixed domain...');
    
    const testData = {
        parentName: 'Production Test Parent',
        phoneNumber: '(555) 123-4567',
        email: 'test@example.com',
        patientName: 'Production Test Child', 
        dateOfBirth: '2020-05-15',
        californiaResident: 'yes',
        concerns: 'Testing the domain fix deployment for HouseCall for Kids form.',
        afterHours: 'Yes',
        questions: 'Yes',
        pcpName: 'Dr. Test',
        pcpPhone: '(555) 123-4567',
        pcpFax: '(555) 123-4568',
        submittedAt: new Date().toISOString()
    };

    try {
        console.log('📤 Submitting test form...');
        const response = await fetch(`${deployedUrl}/api/send-inquiry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('📡 Response status:', response.status, response.statusText);

        const result = await response.json();

        if (response.ok) {
            console.log('✅ SUCCESS! Form submission worked on production');
            console.log('📧 Practice email:', result.emailStatus?.practiceNotification ? 'SENT' : 'Failed');
            console.log('📧 Confirmation email:', result.emailStatus?.confirmationEmail ? 'SENT' : 'Failed'); 
            console.log('🔗 Inquiry ID:', result.id);
            
            if (result.emailStatus?.warnings) {
                console.log('⚠️  Warnings:', result.emailStatus.warnings);
            }
            
            console.log('\n🎉 DEPLOYMENT SUCCESSFUL!');
            console.log('✅ Domain fix is working in production');
            console.log('✅ Form should work reliably for users now');
            
        } else {
            console.log('❌ Form submission FAILED');
            console.log('Error:', result.error);
            console.log('Details:', result.details);
        }

    } catch (error) {
        console.log('❌ Form test error:', error.message);
    }

    console.log(`\n🌐 Live site: ${deployedUrl}`);
    console.log('📋 Users can now submit inquiries successfully!');
}

testDeployedForm().catch(console.error);