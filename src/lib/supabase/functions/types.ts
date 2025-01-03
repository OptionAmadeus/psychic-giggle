export interface FunctionResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    status?: number;
  };
}

export interface TokenExchangePayload {
  code: string;
  codeVerifier: string;
  redirect_uri: string;
}

export interface EmailConfirmationPayload {
  email: string;
  name: string;
  token: string;
}