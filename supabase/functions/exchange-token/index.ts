import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { COINBASE_CONFIG } from './config.ts'
import { validateRequest } from './validation.ts'
import type { TokenExchangeRequest } from './types.ts'

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
    const { code, codeVerifier, redirect_uri } = await validateRequest(req);

    // Exchange code for tokens
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: Deno.env.get('VITE_COINBASE_CLIENT_ID') || '',
      client_secret: Deno.env.get('COINBASE_CLIENT_SECRET') || '',
      code_verifier: codeVerifier,
      redirect_uri
    });

    const response = await fetch(COINBASE_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: COINBASE_CONFIG.HEADERS,
      body: params.toString()
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_description || 'Token exchange failed');
    }

    return new Response(JSON.stringify(data), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
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