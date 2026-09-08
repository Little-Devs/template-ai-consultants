import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") || "noreply@example.com";
const TO_EMAIL = "contact@example.com";

interface InquiryData {
  name: string;
  email: string;
  services: string[];
  goals?: string[];
  notes?: string;
}

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

function validateServices(services: string[]): boolean {
  return Array.isArray(services) && services.length > 0;
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "https://example.com",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Parse request body
    const inquiryData: InquiryData = await req.json();

    // Server-side validation
    if (!validateName(inquiryData.name)) {
      return new Response(
        JSON.stringify({ error: "Name must be between 2 and 100 characters" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://example.com",
          },
        }
      );
    }

    if (!validateEmail(inquiryData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://example.com",
          },
        }
      );
    }

    if (!validateServices(inquiryData.services)) {
      return new Response(
        JSON.stringify({ error: "At least one service must be selected" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://example.com",
          },
        }
      );
    }

    // Sanitize inputs
    const sanitizedData: InquiryData = {
      name: sanitizeInput(inquiryData.name),
      email: sanitizeInput(inquiryData.email).toLowerCase(),
      services: inquiryData.services.map(s => sanitizeInput(s)),
      goals: inquiryData.goals?.map(g => sanitizeInput(g)) || [],
      notes: inquiryData.notes ? sanitizeInput(inquiryData.notes).substring(0, 2000) : null,
    };

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { data: dbData, error: dbError } = await supabase
      .from("inquiries")
      .insert([
        {
          name: sanitizedData.name,
          email: sanitizedData.email,
          services: sanitizedData.services,
          goals: sanitizedData.goals,
          notes: sanitizedData.notes,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save inquiry to database");
    }

    // Format email content
    const servicesList = sanitizedData.services.join(", ");
    const goalsList = sanitizedData.goals && sanitizedData.goals.length > 0
      ? sanitizedData.goals.join(", ")
      : "None specified";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry from ${sanitizedData.name}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1C1917; background-color: #FDFCF8; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #FDFCF8;">
    <div style="background-color: #FFFFFF; border-radius: 16px; padding: 40px; border: 1px solid #E7E5E4; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      <h1 style="font-size: 24px; font-weight: 600; color: #1C1917; margin: 0 0 8px 0; font-family: serif;">New Project Inquiry</h1>
      <p style="font-size: 14px; color: #78716C; margin: 0 0 32px 0;">You have received a new inquiry from your website.</p>
      
      <div style="background-color: #FDFCF8; border-left: 3px solid #C2410C; padding: 20px; margin: 24px 0; border-radius: 4px;">
        <h2 style="font-size: 16px; font-weight: 600; color: #1C1917; margin: 0 0 16px 0;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #78716C; width: 100px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #1C1917;">${sanitizedData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #78716C;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; font-size: 14px; color: #1C1917;"><a href="mailto:${sanitizedData.email}" style="color: #C2410C; text-decoration: none;">${sanitizedData.email}</a></td>
          </tr>
        </table>
      </div>

      <div style="background-color: #FDFCF8; border-left: 3px solid #C2410C; padding: 20px; margin: 24px 0; border-radius: 4px;">
        <h2 style="font-size: 16px; font-weight: 600; color: #1C1917; margin: 0 0 16px 0;">Services Required</h2>
        <p style="font-size: 14px; color: #1C1917; margin: 0;">${servicesList}</p>
      </div>

      ${sanitizedData.goals && sanitizedData.goals.length > 0 ? `
      <div style="background-color: #FDFCF8; border-left: 3px solid #C2410C; padding: 20px; margin: 24px 0; border-radius: 4px;">
        <h2 style="font-size: 16px; font-weight: 600; color: #1C1917; margin: 0 0 16px 0;">Primary Goals</h2>
        <p style="font-size: 14px; color: #1C1917; margin: 0;">${goalsList}</p>
      </div>
      ` : ""}

      ${sanitizedData.notes ? `
      <div style="background-color: #FDFCF8; border-left: 3px solid #C2410C; padding: 20px; margin: 24px 0; border-radius: 4px;">
        <h2 style="font-size: 16px; font-weight: 600; color: #1C1917; margin: 0 0 16px 0;">Additional Details</h2>
        <p style="font-size: 14px; color: #1C1917; margin: 0; white-space: pre-wrap;">${sanitizedData.notes}</p>
      </div>
      ` : ""}

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E7E5E4;">
        <p style="font-size: 12px; color: #78716C; margin: 0;">This inquiry was submitted through the Studio website contact form.</p>
        <p style="font-size: 12px; color: #78716C; margin: 8px 0 0 0;">Inquiry ID: ${dbData.id}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send email via Resend API
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email send");
    } else {
      console.log("Attempting to send email:", {
        from: RESEND_FROM_EMAIL,
        to: TO_EMAIL,
        hasApiKey: !!RESEND_API_KEY,
      });
      
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: TO_EMAIL,
          reply_to: sanitizedData.email,
          subject: `New Inquiry from ${sanitizedData.name}`,
          html: emailHtml,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.text();
        console.error("Resend API error:", {
          status: resendResponse.status,
          statusText: resendResponse.statusText,
          error: errorData,
        });
        // Don't fail the request if email fails, but log it
      } else {
        const successData = await resendResponse.json();
        console.log("Email sent successfully:", successData);
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Inquiry submitted successfully",
        id: dbData.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://example.com",
        },
      }
    );
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process inquiry. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://example.com",
        },
      }
    );
  }
});
