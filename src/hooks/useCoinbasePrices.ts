import { useState, useEffect, useCallback } from "react";
import { coinbaseWebSocket } from "@/lib/coinbase/websocket";
import type { PriceUpdate } from "@/lib/coinbase/types";

interface PriceState {
  prices: Record<string, number>;
  lastUpdate: Date | null;
}

export function useCoinbasePrices(productIds: string[]) {
  const [state, setState] = useState<PriceState>({
    prices: {},
    lastUpdate: null,
  });

  const handlePriceUpdate = useCallback((update: PriceUpdate) => {
    setState((prevState) => ({
      prices: {
        ...prevState.prices,
        [update.product_id]: update.price,
      },
      lastUpdate: new Date(),
    }));
  }, []);

  useEffect(() => {
    // Subscribe to price updates
    coinbaseWebSocket.subscribe(productIds, handlePriceUpdate);

    return () => {
      // Unsubscribe from price updates
      coinbaseWebSocket.unsubscribe(productIds, handlePriceUpdate);
    };
  }, [productIds, handlePriceUpdate]);

  return state;
}
