# Environment Setup Guide

## Resend API Configuration

This application uses Resend for email delivery. Follow these steps to properly configure the API:

### 1. Environment Variables

The application requires the following environment variable:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

### 2. Local Development Setup

1. Ensure you have a valid Resend API key from [resend.com](https://resend.com)
2. Add the API key to `.env.local`:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```

### 3. Production/Vercel Setup

1. In your Vercel dashboard, go to your project settings
2. Navigate to Environment Variables
3. Add `RESEND_API_KEY` with your production API key
4. Make sure it's available for all environments (Production, Preview, Development)

### 4. Domain Verification (Important!)

**This is crucial for email delivery:**

1. Log into your Resend dashboard
2. Go to "Domains" section
3. Verify the domain `1to1pediatrics.com`
4. Add the required DNS records:
   - MX record
   - TXT record for verification
   - DKIM records 

Without proper domain verification, emails may be rejected or fail intermittently.

### 5. API Key Best Practices

- Use separate API keys for development and production
- Regularly rotate API keys (monthly)
- Monitor API usage in Resend dashboard
- Set up webhooks for delivery tracking

### 6. Troubleshooting

If emails are failing:

1. Check Resend dashboard for API usage limits
2. Verify domain DNS settings
3. Check API key permissions
4. Review bounce rates and spam reports
5. Monitor Vercel function logs for detailed errors

### 7. Rate Limits

Resend has the following limits:
- Free tier: 100 emails/day
- Paid tiers: Higher limits based on plan

Make sure your usage doesn't exceed these limits.

## Testing Email Functionality

Use the `test-email.js` script to test email functionality:

```bash
node test-email.js
```

This will send test emails and help identify configuration issues.

## Common Issues and Solutions

### Issue: "Failed to send emails" error
**Solution**: Check API key, domain verification, and rate limits

### Issue: Emails sent but not received
**Solution**: Check spam folders, verify domain DNS settings

### Issue: 401/403 authentication errors
**Solution**: Verify API key is correct and has proper permissions

### Issue: Intermittent failures
**Solution**: Check rate limits, implement retry logic (already included in code)

## Monitoring

Monitor the following:
- Vercel function logs
- Resend dashboard analytics  
- Email delivery reports
- API usage metrics

---

For additional support, contact the Resend support team or check their documentation.