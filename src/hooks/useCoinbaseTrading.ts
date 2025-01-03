import { useState, useCallback } from 'react';
import { tradingService } from '@/services/trading/TradingService';
import type { TradeRecommendation, TradeTransaction } from '@/types/portfolio';

export function useCoinbaseTrading() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeTrade = useCallback(async (recommendation: TradeRecommendation): Promise<TradeTransaction | null> => {
    setIsExecuting(true);
    setError(null);

    try {
      const transaction = await tradingService.executeRecommendation(recommendation);
      return transaction;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  return { isExecuting, error, executeTrade };
}