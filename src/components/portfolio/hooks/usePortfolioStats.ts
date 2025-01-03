import { useMemo } from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { calculatePortfolioStats } from '@/utils/portfolio';

export function usePortfolioStats() {
  const { assets } = usePortfolioStore();

  const stats = useMemo(() => 
    calculatePortfolioStats(assets), 
    [assets]
  );

  return stats;
}