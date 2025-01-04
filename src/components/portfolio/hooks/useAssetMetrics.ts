import { useMemo } from "react";
import type { Asset } from "@/types/portfolio";
import {
  calculateTotalValue,
  calculateTotalChange,
  calculateProfitLoss,
  calculateROI,
} from "@/utils/portfolio";

export function useAssetMetrics(assets: Asset[]) {
  const metrics = useMemo(
    () => ({
      totalValue: calculateTotalValue(assets),
      totalChange: calculateTotalChange(assets),
      profitLoss: calculateProfitLoss(assets),
      roi: calculateROI(assets),
    }),
    [assets],
  );

  return metrics;
}
