// Test script for HouseCall for Kids email functionality
// This simulates a form submission to test both practice and patient emails

async function testEmailFunctionality() {
    console.log('🧪 Testing HouseCall for Kids Email Functionality...\n');

    // Determine the base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://housecall-for-kids-nnnipxy7u-drew-1to1pediatris-projects.vercel.app'
        : 'http://localhost:3000';

    console.log('🌐 Using base URL:', baseUrl);

    // First, test the health check endpoint
    console.log('\n🏥 Testing health check endpoint...');
    try {
        const healthResponse = await fetch(`${baseUrl}/api/health`);
        const healthData = await healthResponse.json();
        
        if (healthResponse.ok) {
            console.log('✅ Health check passed:');
            console.log('  - Status:', healthData.status);
            console.log('  - Environment:', healthData.environment.NODE_ENV);
            console.log('  - Resend key present:', healthData.environment.hasResendKey ? 'Yes' : 'No');
            console.log('  - Resend key format:', healthData.environment.resendKeyFormat);
            console.log('  - Resend key length:', healthData.environment.resendKeyLength);
        } else {
            console.log('❌ Health check failed:', healthData);
        }
    } catch (healthError) {
        console.log('❌ Health check error:', healthError.message);
    }

    // Test data for the inquiry
    const testData = {
        parentName: 'Test Parent',
        phoneNumber: '(555) 123-4567',
        email: 'test@example.com', // Change to your email for testing
        patientName: 'Test Child',
        dateOfBirth: '2020-05-15',
        californiaResident: 'yes',
        concerns: 'Test inquiry for virtual pediatric urgent care services. Interested in learning more about the practice launch.',
        afterHours: 'Yes',
        questions: 'Yes',
        pcpName: 'Dr. Test PCP',
        pcpPhone: '(555) 987-6543',
        pcpFax: '(555) 987-6544',
        submittedAt: new Date().toISOString()
    };

    console.log('\n📤 Testing inquiry submission...');
    console.log('👤 Parent:', testData.parentName);
    console.log('👶 Patient:', testData.patientName);
    console.log('📧 Email:', testData.email);
    console.log('📱 Phone:', testData.phoneNumber);
    console.log('📍 Located in California:', testData.californiaResident);
    console.log('📝 Concerns:', testData.concerns.substring(0, 50) + '...');
    console.log('');

    try {
        const response = await fetch(`${baseUrl}/api/send-inquiry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('📡 Response status:', response.status, response.statusText);

        const result = await response.json();

        if (response.ok) {
            console.log('✅ SUCCESS! Email functionality test passed.');
            console.log('📧 Practice notification:', result.emailStatus?.practiceNotification ? 'Sent' : 'Failed');
            console.log('📧 Confirmation email:', result.emailStatus?.confirmationEmail ? 'Sent' : 'Failed');
            console.log('🔗 Inquiry ID:', result.id);
            
            if (result.emailStatus?.warnings) {
                console.log('⚠️  Warnings:', result.emailStatus.warnings);
            }
            
            console.log('\n🎉 Test completed successfully!');
            
            if (result.emailStatus?.practiceNotification && result.emailStatus?.confirmationEmail) {
                console.log('📬 Both emails should be arriving shortly!');
            } else {
                console.log('📭 Some emails may have failed - check the logs above.');
            }
        } else {
            console.log('❌ FAILED! Email functionality test failed.');
            console.log('Error:', result.error);
            console.log('Details:', result.details);
            console.log('Troubleshooting:', result.troubleshooting);
        }

    } catch (error) {
        console.log('❌ ERROR! Test failed with exception:');
        console.log(error.message);
        console.log('\nPossible causes:');
        console.log('- Development server not running (try: npm run dev)');
        console.log('- Network connectivity issues');
        console.log('- API endpoint configuration problems');
    }
}

// Add a helper to test with different environments
async function testWithEnvironment(environment = 'development') {
    console.log(`\n🔧 Testing in ${environment} environment...`);
    
    if (environment === 'development') {
        process.env.NODE_ENV = 'development';
    } else {
        process.env.NODE_ENV = 'production';
    }
    
    await testEmailFunctionality();
}

// Run the test
console.log('🚀 Starting comprehensive email functionality test...');
testEmailFunctionality();