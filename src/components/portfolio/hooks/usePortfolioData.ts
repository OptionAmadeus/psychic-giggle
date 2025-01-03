import { useCallback } from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { API_CONFIG } from '@/config/api';

export function usePortfolioData() {
  const { error, isLoading, refreshPortfolio, getRecommendations } = usePortfolioStore();

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshPortfolio(),
      getRecommendations()
    ]);
  }, [refreshPortfolio, getRecommendations]);

  useAutoRefresh({
    onRefresh: refreshPortfolio,
    interval: API_CONFIG.refreshIntervals.portfolio
  });

  useAutoRefresh({
    onRefresh: getRecommendations,
    interval: API_CONFIG.refreshIntervals.recommendations
  });

  return { isLoading, error, refreshAll };
}