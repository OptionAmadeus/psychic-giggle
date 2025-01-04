import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

// Ensure that 'handleOAuthCallback' is a property of 'AuthStore'
interface AuthStore {
  handleOAuthCallback: () => void;
}

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback, error } = useAuthStore();

  useEffect(() => {
    async function processCallback() {
      try {
        const code = searchParams.get("code");
        if (!code) {
          throw new Error("No authorization code provided");
        }

        const success = await handleOAuthCallback(code);
        if (success) {
          navigate("/dashboard", { replace: true });
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        console.error("OAuth callback failed:", err);
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      }
    }

    processCallback();
  }, [searchParams, handleOAuthCallback, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} />
          <p className="mt-2 text-center text-gray-600">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Connecting your account...</p>
      </div>
    </div>
  );
}
