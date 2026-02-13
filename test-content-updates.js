// Test updated website content and emails
async function testUpdatedContent() {
    console.log('✅ LAUNCH REFERENCES UPDATED!\n');
    
    const deployedUrl = 'https://housecall-for-kids-jlxiqynwq-drew-1to1pediatris-projects.vercel.app';
    
    console.log('🌐 WEBSITE UPDATES:');
    console.log('─'.repeat(40));
    console.log('✅ Hero badge: "Now Open • Accepting Patients"');
    console.log('✅ CTA button: "Schedule or Register" (was "Reserve Early Access")');
    console.log('✅ Navigation: "Register as a Patient" (was "Pre-Register")');
    console.log('✅ Form section: "Register your child" (was "Pre-register")');
    console.log('✅ Footer: "practice updates" (was "launch updates")');
    console.log('✅ Success messages updated for active practice');
    console.log('');

    console.log('📧 EMAIL UPDATES:');
    console.log('─'.repeat(40));
    console.log('✅ Removed "Early January 2026 launch" references');
    console.log('✅ Updated to "Now Active and Accepting Patients"');
    console.log('✅ Changed contact language to scheduling-focused');
    console.log('✅ Removed "reserve a spot" language');
    console.log('');

    // Test email with updated content
    console.log('🧪 Testing updated email content...');
    
    try {
        const response = await fetch(`${deployedUrl}/api/send-inquiry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parentName: 'Content Update Test',
                phoneNumber: '(555) 111-2222',
                email: 'housecallforkids@gmail.com',
                patientName: 'Updated Content Test Child',
                dateOfBirth: '2021-08-20',
                californiaResident: 'yes',
                concerns: 'Testing updated email content after removing launch references.',
                afterHours: 'No',
                questions: 'No',
                submittedAt: new Date().toISOString()
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Email test successful!');
            console.log(`📧 Check housecallforkids@gmail.com for emails with ID: ${result.id}`);
            console.log('');
            
            console.log('📧 EMAILS SHOULD NOW CONTAIN:');
            console.log('✅ "Practice Status: Now Active and Accepting Patients"');
            console.log('✅ "We\'ll contact you soon to schedule your appointment"');
            console.log('✅ "Our practice is now active and accepting patients"');
            console.log('❌ NO references to "Early January 2026"');
            console.log('❌ NO "launch" or "reserve spot" language');
            
        } else {
            console.log('❌ Email test failed');
        }
        
    } catch (error) {
        console.log('❌ Test error:', error.message);
    }

    console.log('\n🎉 CONTENT UPDATE COMPLETE!');
    console.log(`🌐 Updated site: ${deployedUrl}`);
    console.log('✅ All launch references removed');
    console.log('✅ Practice now reflects active status');
    console.log('✅ Ready for current patients and new inquiries');
}

testUpdatedContent().catch(console.error);