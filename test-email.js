// Test script for HouseCall for Kids email functionality
// This simulates a form submission to test both practice and patient emails

async function testEmailFunctionality() {
    console.log('🧪 Testing HouseCall for Kids Email Functionality...\n');

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
        submittedAt: new Date().toISOString()
    };

    try {
        console.log('📤 Sending test inquiry...');
        console.log('👤 Parent:', testData.parentName);
        console.log('👶 Patient:', testData.patientName);
        console.log('📧 Email:', testData.email);
        console.log('📱 Phone:', testData.phoneNumber);
        console.log('📍 Located in California:', testData.californiaResident);
        console.log('📝 Concerns:', testData.concerns);
        console.log('');

        const response = await fetch('https://housecall-for-kids-nnnipxy7u-drew-1to1pediatris-projects.vercel.app/api/send-inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ SUCCESS! Email functionality test passed.');
            console.log('📧 Practice notification sent to: ADHD@1to1Pediatrics.com');
            console.log('📧 Confirmation email sent to:', testData.email);
            console.log('🔗 Inquiry ID:', result.id);
            console.log('\n🎉 Both emails should be arriving shortly!');
        } else {
            console.log('❌ FAILED! Email functionality test failed.');
            console.log('Error:', result.error);
        }

    } catch (error) {
        console.log('❌ ERROR! Test failed with exception:');
        console.log(error.message);
    }
}

// Run the test
testEmailFunctionality();