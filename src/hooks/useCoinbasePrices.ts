import { useState, useEffect } from 'react';
import { coinbaseWebSocket } from '@/lib/coinbase/websocket';
import type { PriceUpdate } from '@/lib/coinbase/types';

interface PriceState {
  prices: Record<string, number>;
  lastUpdate: Date | null;
}

export function useCoinbasePrices(productIds: string[]) {
  const [state, setState] = useState<PriceState>({
    prices: {},
    lastUpdate: null
  });

  useEffect(() => {
    // Subscribe to price updates
    coinbaseWebSocket.subscribe(productIds);

    // Handle price updates
    const unsubscribe = coinbaseWebSocket.onPriceUpdate((update: PriceUpdate) => {
      setState(prev => ({
        prices: {
          ...prev.prices,
          [update.productId]: update.price
        },
        lastUpdate: update.time
      }));
    });

    // Cleanup
    return () => {
      unsubscribe();
      coinbaseWebSocket.unsubscribe(productIds);
    };
  }, [productIds.join(',')]); // Only re-run if product IDs change

  return state;
}