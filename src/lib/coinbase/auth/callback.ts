import { CoinbaseOAuthError } from "./errors";
import { OAuthStorage } from "./storage";
import { validateCallbackParams } from "./validation";
import { exchangeToken } from "./token";

export async function handleOAuthCallback(
  code: string | null,
  state: string | null,
): Promise<boolean> {
  try {
    validateCallbackParams(code, state);

    const codeVerifier = OAuthStorage.getCodeVerifier();
    if (!codeVerifier) {
      throw CoinbaseOAuthError.missingCodeVerifier();
    }

    const tokens = await exchangeToken(code!, codeVerifier);
    OAuthStorage.setTokens(tokens.access_token, tokens.refresh_token);
    return true;
  } catch (error) {
    console.error("OAuth callback failed:", error);
    throw error instanceof CoinbaseOAuthError
      ? error
      : CoinbaseOAuthError.tokenExchangeFailed();
  } finally {
    OAuthStorage.clearCodeVerifier();
  }
}
