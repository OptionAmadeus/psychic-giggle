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
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchPriceHistory(productId, options);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, options]);

  return { data, isLoading, error };
}