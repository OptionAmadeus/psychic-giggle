export interface TokenExchangeRequest {
  code: string;
  codeVerifier: string;
  redirect_uri: string;
}

export interface TokenExchangeResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}