import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface EmailPayload {
  email: string
  name: string
  token: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  try {
    const { email, name, token } = await req.json() as EmailPayload;

    // Validate input
    if (!email || !name || !token) {
      throw new Error('Missing required fields');
    }

    // Send email using Supabase's built-in email service
    const emailResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/auth/v1/admin/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
        },
        body: JSON.stringify({
          email,
          template: 'confirmation',
          template_data: {
            name,
            confirmation_url: `${Deno.env.get('PUBLIC_URL')}/confirm?token=${token}`
          }
        })
      }
    );

    if (!emailResponse.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    );
  }
});