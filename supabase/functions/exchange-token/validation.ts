import type { TokenExchangeRequest } from './types.ts';

export async function validateRequest(req: Request): Promise<TokenExchangeRequest> {
  const data = await req.json().catch(() => ({}));
  
  if (!data.code || !data.codeVerifier) {
    throw new Error('Missing required parameters: code or codeVerifier');
  }

  if (!data.redirect_uri) {
    throw new Error('Missing redirect_uri parameter');
  }

  return data as TokenExchangeRequest;
}