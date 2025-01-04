import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthCallbackView } from "@/components/auth/callback/AuthCallbackView";
import { useAuthCallback } from "@/components/auth/callback/useAuthCallback";

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { error, processCallback } = useAuthCallback();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    processCallback(code, state);
  }, [searchParams, processCallback]);

  return <AuthCallbackView error={error} />;
}
