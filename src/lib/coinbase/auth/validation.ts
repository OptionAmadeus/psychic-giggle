import { CoinbaseOAuthError } from "./errors";
import { OAuthStateManager } from "./state";

export function validateCallbackParams(
  code: string | null,
  state: string | null,
): void {
  if (!code || !state) {
    throw new CoinbaseOAuthError("Missing required OAuth parameters");
  }

  const storedState = OAuthStateManager.validate(state);
  if (!storedState) {
    throw CoinbaseOAuthError.invalidState();
  }
}
