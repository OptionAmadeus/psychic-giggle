import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { handleOAuthCallback } from "@/lib/coinbase/auth/callback";

export function useAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const processCallback = useCallback(
    async (code: string | null, state: string | null) => {
      try {
        if (!code || !state) {
          throw new Error("Missing required OAuth parameters");
        }

        const success = await handleOAuthCallback(code, state);
        if (success) {
          navigate("/dashboard", { replace: true });
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Authentication failed";
        console.error("OAuth callback failed:", err);
        setError(message);
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      }
    },
    [navigate],
  );

  return {
    error,
    processCallback,
  };
}
