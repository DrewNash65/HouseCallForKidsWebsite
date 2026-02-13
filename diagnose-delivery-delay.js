// Diagnose "delivery delayed" issue with confirmation emails
async function diagnoseDeliveryDelay() {
    console.log('🔍 Diagnosing "Delivery Delayed" Issue\n');
    
    console.log('📊 LIKELY CAUSES OF DELIVERY DELAYS:');
    console.log('─'.repeat(50));
    console.log('1. 📧 Gmail Rate Limiting:');
    console.log('   → Two emails sent to same address in quick succession');
    console.log('   → Gmail may throttle the second email');
    console.log('');
    console.log('2. 🚩 Spam Trigger Words:');
    console.log('   → "$150", "$250" (pricing information)');
    console.log('   → "payment", "urgent care" (medical/commercial terms)');
    console.log('   → Long email content can trigger filters');
    console.log('');
    console.log('3. ⚡ Content Differences:');
    console.log('   → Practice email: Short, simple notification');
    console.log('   → Confirmation email: Long, detailed with pricing');
    console.log('');
    console.log('4. 🔄 Email Frequency:');
    console.log('   → Multiple emails to same domain can cause delays');
    console.log('   → Gmail protects against spam patterns');
    console.log('');

    console.log('🔧 RECOMMENDED SOLUTIONS:');
    console.log('─'.repeat(50));
    console.log('Solution 1: Simplify Confirmation Email');
    console.log('   → Remove pricing details from initial confirmation');
    console.log('   → Keep it brief and welcoming');
    console.log('   → Send detailed info in separate follow-up');
    console.log('');
    console.log('Solution 2: Add Delay Between Emails');
    console.log('   → Wait 30-60 seconds between practice and confirmation emails');
    console.log('   → Reduces rate limiting issues');
    console.log('');
    console.log('Solution 3: Different Subject Lines');
    console.log('   → Use very different subject patterns');
    console.log('   → Avoid looking like automated bulk mail');
    console.log('');
    console.log('Solution 4: Content Optimization');
    console.log('   → Remove price mentions from confirmation');
    console.log('   → Use warmer, less commercial language');
    console.log('   → Shorter, more personal tone');
    console.log('');

    console.log('🧪 TESTING SPECIFIC ISSUES...');
    
    const apiKey = process.env.RESEND_API_KEY || 're_PfHrnoKE_DgarDsrBWyQ15KWrugfajpVA';
    
    // Test 1: Simplified confirmation email
    console.log('\n📧 Test 1: Simplified confirmation email');
    try {
        const simplifiedEmail = {
            from: 'noreply@housecallforkids.com',
            to: ['housecallforkids@gmail.com'],
            subject: 'Welcome to HouseCall for Kids!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Thank you for reaching out!</h2>
                    
                    <p>Dear Parent/Guardian,</p>
                    
                    <p>We've received your inquiry for your child and are excited to help your family!</p>
                    
                    <h3>What happens next:</h3>
                    <ul>
                        <li>We'll contact you soon to schedule your appointment</li>
                        <li>We'll send scheduling details and portal information</li>
                        <li>Our team will reach out with any questions</li>
                    </ul>
                    
                    <p>Thank you for choosing HouseCall for Kids!</p>
                    
                    <p>Warm regards,<br>
                    The HouseCall for Kids Team</p>
                </div>
            `
        };

        const response1 = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(simplifiedEmail)
        });

        if (response1.ok) {
            const result1 = await response1.json();
            console.log('✅ Simplified email sent:', result1.id);
            console.log('   → Check if this delivers faster');
        } else {
            console.log('❌ Simplified email failed');
        }

    } catch (error) {
        console.log('❌ Test 1 error:', error.message);
    }

    // Wait 2 seconds before next test
    console.log('\n⏱️  Waiting 2 seconds before next test...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Different subject pattern
    console.log('\n📧 Test 2: Different subject pattern');
    try {
        const differentSubject = {
            from: 'noreply@housecallforkids.com',
            to: ['housecallforkids@gmail.com'],
            subject: 'Received: Your family inquiry',
            html: `
                <p>Hello!</p>
                <p>This is just a quick note to confirm we received your message.</p>
                <p>Our team will be in touch soon.</p>
                <p>Best regards,<br>HouseCall for Kids</p>
            `
        };

        const response2 = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(differentSubject)
        });

        if (response2.ok) {
            const result2 = await response2.json();
            console.log('✅ Different subject email sent:', result2.id);
            console.log('   → Check if this delivers faster');
        } else {
            console.log('❌ Different subject email failed');
        }

    } catch (error) {
        console.log('❌ Test 2 error:', error.message);
    }

    console.log('\n📋 MONITORING CHECKLIST:');
    console.log('─'.repeat(40));
    console.log('1. Check Resend dashboard for delivery status of test emails');
    console.log('2. Compare delivery times between different formats');
    console.log('3. Look for patterns in what gets delayed vs delivered');
    console.log('4. Check if simplified emails avoid delays');
    console.log('');

    console.log('💡 IMMEDIATE FIXES TO IMPLEMENT:');
    console.log('─'.repeat(40));
    console.log('✅ Remove pricing info from confirmation emails');
    console.log('✅ Simplify and shorten confirmation content'); 
    console.log('✅ Add delay between practice and confirmation emails');
    console.log('✅ Use more personal, less commercial language');
    console.log('✅ Consider different "from" names for variety');
}

diagnoseDeliveryDelay().catch(console.error);