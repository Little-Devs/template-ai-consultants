# Submit Inquiry Edge Function

This Supabase Edge Function handles form submissions from the inquiry form on the Studio website.

## Setup

1. Deploy the function to Supabase:
   ```bash
   supabase functions deploy submit-inquiry
   ```

2. Set the required secrets in Supabase Dashboard or via CLI:
   ```bash
   supabase secrets set RESEND_API_KEY=your_resend_api_key
   supabase secrets set RESEND_FROM_EMAIL=noreply@example.com
   ```

3. The function requires the following environment variables:
   - `RESEND_API_KEY` - Your Resend API key
   - `RESEND_FROM_EMAIL` - Verified sender email in Resend (defaults to noreply@example.com)
   - `SUPABASE_URL` - Automatically provided by Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` - Automatically provided by Supabase

## Functionality

- Validates form data (name, email, services)
- Stores inquiry in Supabase database
- Sends formatted email notification to contact@example.com via Resend API
- Returns success/error response to frontend

## Database Schema

The function inserts data into the `inquiries` table with the following structure:
- `id` (UUID, auto-generated)
- `name` (TEXT, required)
- `email` (TEXT, required)
- `services` (TEXT[], required, array of selected services)
- `goals` (TEXT[], optional, array of selected goals)
- `notes` (TEXT, optional, additional details)
- `created_at` (TIMESTAMPTZ, auto-generated)
- `updated_at` (TIMESTAMPTZ, auto-generated)
