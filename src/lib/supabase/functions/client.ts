import { SUPABASE_CONFIG } from "../config/constants";

export async function invokeFunctionWithRetry(
  functionName: string,
  payload?: unknown,
  retries = 3,
): Promise<Response> {
  const baseUrl = `${SUPABASE_CONFIG.url}/functions/v1`;
  const headers = {
    Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
    "Content-Type": "application/json",
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${baseUrl}/${functionName}`, {
        method: "POST",
        headers,
        body: payload ? JSON.stringify(payload) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Function invocation failed: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");
      if (attempt === retries - 1) break;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000),
      );
    }
  }

  throw lastError;
}
