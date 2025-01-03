import { useState, useEffect } from 'react';
import { fetchPriceHistory } from '@/lib/coinbase/prices';
import type { PriceHistory } from '@/lib/coinbase/types';

interface UsePriceHistoryOptions {
  granularity?: number;
  start?: Date;
  end?: Date;
}

export function usePriceHistory(
  productId: string,
  options: UsePriceHistoryOptions = {}
) {
  const [data, setData] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadPriceHistory() {
      if (!productId) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const history = await fetchPriceHistory(
          productId,
          options.granularity,
          options.start,
          options.end
        );

        if (mounted) {
          setData(history);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch price history'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadPriceHistory();

    return () => {
      mounted = false;
    };
  }, [productId, options.granularity, options.start?.getTime(), options.end?.getTime()]);

  return { data, isLoading, error };
}