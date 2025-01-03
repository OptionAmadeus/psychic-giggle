import { useEffect, useRef, useCallback } from 'react';

interface AutoRefreshConfig {
  onRefresh: () => Promise<void>;
  interval: number;
  enabled?: boolean;
}

export function useAutoRefresh({ onRefresh, interval, enabled = true }: AutoRefreshConfig) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return;
    
    try {
      await onRefresh();
    } catch (error) {
      console.error('Error during refresh:', error);
    }
  }, [enabled, onRefresh]);

  useEffect(() => {
    if (!enabled) return;

    const handleRefresh = async () => {
      await refresh();
      timeoutRef.current = setTimeout(handleRefresh, interval);
    };

    handleRefresh();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, interval, refresh]);

  return null;
}