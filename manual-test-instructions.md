# Manual Email Testing Instructions for HouseCall for Kids

## 🧪 Testing the Email Functionality

Due to Vercel Authentication protection on the API endpoint, we need to test the email functionality through the website interface instead of direct API calls.

## 📧 Test Steps:

### 1. **Access the Website**
- Go to: https://housecall-for-kids-nnnipxy7u-drew-1to1pediatris-projects.vercel.app
- Scroll down to the "Get Early Access" section

### 2. **Fill Out the Form**
Use the following test data:
- **Parent/Guardian Name:** Test Parent
- **Phone Number:** (555) 123-4567
- **Email Address:** [Use your real email address for testing]
- **Patient's Name:** Test Child
- **Date of Birth:** 05/15/2020
- **Located in California:** Yes, I am located in California
- **What brings you to our practice:** Test inquiry - interested in virtual pediatric urgent care services for my child.
- **I'm interested in:**
  - ✅ After-hours appointments
  - ✅ Practice information and general questions

### 3. **Submit the Form**
- Click "Reserve My Spot" button
- Wait for the loading spinner to complete
- You should see a success message

### 4. **Check for Emails**

**📧 Practice Email (ADHD@1to1Pediatrics.com):**
- Check the ADHD@1to1Pediatrics.com inbox
- Look for email with subject: "New Patient Inquiry: Test Child"
- Verify it contains all the form information
- Verify the reply-to is set to your test email

**📧 Confirmation Email (Your Email):**
- Check your personal email inbox
- Look for email with subject: "Your Inquiry Confirmation - HouseCall for Kids"
- Verify it contains practice information and your inquiry details
- Verify the reply-to is set to ADHD@1to1Pediatrics.com

## 🔍 What to Verify:

### Practice Email Should Contain:
```
NEW PATIENT INQUIRY - HouseCall for Kids Virtual Pediatric Urgent Care

PARENT/GUARDIAN INFORMATION:
• Name: Test Parent
• Email: [your email]
• Phone: (555) 123-4567

PATIENT INFORMATION:
• Name: Test Child
• Date of Birth: 2020-05-15
• Located in California: Yes

INQUIRY DETAILS:
• Concerns: Test inquiry - interested in virtual pediatric urgent care services for my child.
• Interested in After-Hours: Yes
• Has Practice Questions: Yes
```

### Confirmation Email Should Contain:
- Personalized greeting
- Practice launch information (Early January 2026)
- Service details (virtual visits, pricing, etc.)
- Contact information
- HIPAA notice

## 🚨 Troubleshooting:

**If emails don't arrive:**
1. Check spam/junk folders
2. Verify Resend API key is correctly configured in Vercel environment variables
3. Check Vercel function logs for any errors
4. Verify the email address ADHD@1to1Pediatrics.com can receive emails

## 📊 Success Criteria:
✅ Practice receives notification email with all form data
✅ Parent receives confirmation email with practice information
✅ Both emails have correct reply-to addresses
✅ Email content is properly formatted and professional
✅ Form shows success message to user

## 🔧 Technical Notes:
- The Resend API key should be configured as `RESEND_API_KEY` in Vercel environment variables
- Both practice and confirmation emails use the same Resend API key
- The API endpoint handles validation for California residency
- Form includes comprehensive error handling and user feedback