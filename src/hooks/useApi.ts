import { useState, useCallback } from "react";
import type { ApiError } from "@/types/api";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiCall: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions<T> = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: unknown[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiCall(...args);
        setData(result);
        if (options.onSuccess) {
          options.onSuccess(result);
        }
      } catch (err) {
        setError(err as ApiError);
        if (options.onError) {
          options.onError(err as ApiError);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, options],
  );

  return { data, error, isLoading, execute };
}
