# Supabase Backend Setup Guide

This guide will help you set up the Supabase backend for the inquiry form.

## Prerequisites

1. A Supabase account (https://supabase.com)
2. A Resend account (https://resend.com) - Free tier available (3,000 emails/month)
3. Your Supabase project created

## Step 1: Create the Database Table

1. Go to your Supabase Dashboard → SQL Editor
2. Run the migration file: `supabase/migrations/20250101000000_create_inquiries_table.sql`
   - Or copy the SQL from that file and execute it in the SQL Editor

This creates the `inquiries` table with proper indexes and Row Level Security policies.

## Step 2: Set Up Resend

1. Sign up at https://resend.com (if you haven't already)
2. Verify your domain or use the default sending domain
3. Get your API key from the Resend dashboard (API Keys section)
4. Note: You'll need to verify `contact@example.com` as a recipient or use a verified sending domain

## Step 3: Deploy the Edge Function

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI if you haven't:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
   (Find your project ref in your Supabase dashboard URL)

4. Set secrets:
   ```bash
   supabase secrets set RESEND_API_KEY=your_resend_api_key_here
   supabase secrets set RESEND_FROM_EMAIL=noreply@example.com
   ```
   (Replace with your actual Resend API key and verified sender email)

5. Deploy the function:
   ```bash
   supabase functions deploy submit-inquiry
   ```

### Option B: Using Supabase Dashboard (Easier - No CLI Required)

1. **Create the Edge Function:**
   - Go to your Supabase Dashboard → Edge Functions
   - Click "Create a new function"
   - Name it: `submit-inquiry`
   - Copy the entire contents of `supabase/functions/submit-inquiry/index.ts` into the function editor
   - Click "Deploy function"

2. **Set the secrets:**
   - Go to Dashboard → Project Settings → Edge Functions → Secrets
   - Add secret: `RESEND_API_KEY` = `YOUR_RESEND_API_KEY_HERE` (get this from your Resend dashboard)
   - Add secret: `RESEND_FROM_EMAIL` = `onboarding@resend.dev` (or your verified domain email)
   - Click "Save"

3. **Verify deployment:**
   - Go back to Edge Functions
   - You should see `submit-inquiry` listed and active

## Step 4: Configure Frontend

1. Get your Supabase project URL and anon key from Dashboard → Project Settings → API

2. In `index.html`, find the configuration script (around line 68) and set:
   ```javascript
   window.SUPABASE_URL = 'https://your-project-ref.supabase.co';
   window.SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

   Or set these as environment variables if you're using a build process.

## Step 5: Test the Form

1. Open your website
2. Click the inquiry button to open the form
3. Fill out the form:
   - Name (required, min 2 characters)
   - Email (required, valid format)
   - At least one service (required)
   - Goals (optional)
   - Additional details (optional)
4. Submit the form
5. Check:
   - Success message appears
   - Email arrives at contact@example.com
   - Record appears in Supabase `inquiries` table

## Troubleshooting

### Form submission fails
- Check browser console for errors
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly
- Check that the Edge Function is deployed and accessible

### Email not sending
- Verify Resend API key is set correctly in Supabase secrets
- Check Resend dashboard for any errors or rate limits
- Ensure `RESEND_FROM_EMAIL` is a verified domain/email in Resend
- Check Edge Function logs in Supabase Dashboard

### Database errors
- Verify the migration was run successfully
- Check Row Level Security policies are correct
- Ensure service role key has proper permissions

### CORS errors
- Edge Function should handle CORS automatically
- If issues persist, check Edge Function code includes CORS headers

## Security Notes

- Never commit your `SUPABASE_ANON_KEY` or `RESEND_API_KEY` to version control
- The anon key is safe to use in frontend code (it's public by design)
- The service role key is automatically used by Edge Functions (never expose this)
- All form inputs are sanitized server-side before database insertion
- Email addresses are validated on both client and server

## Monitoring

- View form submissions in Supabase Dashboard → Table Editor → `inquiries`
- Monitor Edge Function logs in Supabase Dashboard → Edge Functions → Logs
- Check Resend dashboard for email delivery statistics
