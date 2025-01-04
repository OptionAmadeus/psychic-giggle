import { CoinbaseOAuthError } from "./errors";
import type { TokenResponse } from "./types";

const EDGE_FUNCTION_URL =
  "https://dvkpanntfxehgasngylg.supabase.co/functions/v1/exchange-token";

export async function exchangeToken(
  code: string,
  codeVerifier: string,
): Promise<TokenResponse> {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        code,
        codeVerifier,
        redirect_uri: import.meta.env.VITE_COINBASE_REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Invalid response" }));
      console.error("Token exchange failed:", {
        status: response.status,
        error: errorData.error,
      });
      throw CoinbaseOAuthError.tokenExchangeFailed(errorData.error);
    }

    const data = await response.json();
    if (!data.access_token || !data.refresh_token) {
      throw CoinbaseOAuthError.tokenExchangeFailed(
        "Invalid token response format",
      );
    }

    return data;
  } catch (error) {
    console.error("Token exchange request failed:", error);
    throw error instanceof CoinbaseOAuthError
      ? error
      : CoinbaseOAuthError.tokenExchangeFailed("Network request failed");
  }
}
