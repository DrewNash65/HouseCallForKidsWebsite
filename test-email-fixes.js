// Test email delivery with actual email addresses  
async function testEmailFixes() {
    console.log('🔧 Testing Email Delivery Fixes\n');
    
    const deployedUrl = 'https://housecall-for-kids-myk2yopfz-drew-1to1pediatris-projects.vercel.app';
    
    console.log('📧 Updated Email Configuration:');
    console.log('   - Practice notifications: housecallforkids@gmail.com ✅');  
    console.log('   - User confirmations: housecallforkids@gmail.com (for testing)');
    console.log('   - Subject line: More spam-friendly');
    console.log('');

    // Test form submission with the user's actual email
    const testData = {
        parentName: 'Email Test Parent',
        phoneNumber: '(555) 123-4567',
        email: 'housecallforkids@gmail.com', // User's actual email  
        patientName: 'Email Fix Test Child',
        dateOfBirth: '2020-06-15',
        californiaResident: 'yes',
        concerns: 'Testing the email delivery fixes for HouseCall for Kids. Both practice notification and user confirmation should be delivered correctly now.',
        afterHours: 'Yes', 
        questions: 'Yes',
        pcpName: 'Dr. Email Test',
        pcpPhone: '(555) 000-1111',
        pcpFax: '(555) 000-1112',
        submittedAt: new Date().toISOString()
    };

    console.log('🧪 Submitting test form to verify fixes...');
    console.log('📧 Both emails should go to: housecallforkids@gmail.com');
    console.log('   - Practice notification (internal)');
    console.log('   - Confirmation email (sent to user)');
    
    try {
        const response = await fetch(`${deployedUrl}/api/send-inquiry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log(`\n📡 Response: ${response.status} ${response.statusText}`);

        const result = await response.json();

        if (response.ok) {
            console.log('✅ FORM SUBMISSION SUCCESSFUL!');
            console.log('\n📊 Email Status:');
            console.log(`   - Practice notification: ${result.emailStatus?.practiceNotification ? '✅ SENT' : '❌ FAILED'}`);
            console.log(`   - User confirmation: ${result.emailStatus?.confirmationEmail ? '✅ SENT' : '❌ FAILED'}`);
            console.log(`   - Inquiry ID: ${result.id}`);

            if (result.emailStatus?.warnings) {
                console.log('\n⚠️  Warnings:', result.emailStatus.warnings);
            }

            console.log('\n🎯 WHAT TO CHECK:');
            console.log('1. Check housecallforkids@gmail.com inbox for BOTH emails:');
            console.log('   a) Practice notification: "New Patient Inquiry: Email Fix Test Child"');
            console.log('   b) User confirmation: "Thank you for your HouseCall for Kids inquiry!"');
            console.log('2. If not in inbox, check spam/junk folder');
            console.log('3. Gmail may group them together in conversation view');
            
            console.log('\n✅ FIXES APPLIED:');
            console.log('✅ Changed practice email to working Gmail address');
            console.log('✅ Updated subject line to be more spam-friendly'); 
            console.log('✅ No more suppressed emails');
            
        } else {
            console.log('❌ FORM SUBMISSION FAILED');
            console.log('Error:', result.error);
            console.log('Details:', result.details);
        }

    } catch (error) {
        console.log('❌ ERROR:', error.message);
    }

    console.log('\n📋 TROUBLESHOOTING:');
    console.log('If emails still don\'t appear:');
    console.log('1. Check Gmail spam folder thoroughly'); 
    console.log('2. Search Gmail for "HouseCall" or "inquiry"');
    console.log('3. Check Resend dashboard for delivery status');
    console.log('4. Verify housecallforkids@gmail.com is accessible');
}

testEmailFixes().catch(console.error);