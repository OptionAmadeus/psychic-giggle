import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import type { PortfolioStats as Stats } from "@/types/portfolio";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down";
}

function StatCard({ label, value, icon, trend }: StatCardProps) {
  const trendColor =
    trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "";

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 text-gray-600 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${trendColor}`}>{value}</div>
    </div>
  );
}

interface PortfolioStatsProps {
  stats: Stats;
}

export function PortfolioStats({ stats }: PortfolioStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Total Value"
        value={formatCurrency(stats.totalValue)}
        icon={<DollarSign className="w-4 h-4" />}
      />

      <StatCard
        label="24h Change"
        value={formatPercentage(stats.totalChange24h)}
        icon={
          stats.totalChange24h >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )
        }
        trend={stats.totalChange24h >= 0 ? "up" : "down"}
      />

      <StatCard
        label="Total P/L"
        value={formatCurrency(stats.totalProfitLoss)}
        icon={<DollarSign className="w-4 h-4" />}
        trend={stats.totalProfitLoss >= 0 ? "up" : "down"}
      />

      <StatCard
        label="ROI"
        value={formatPercentage(stats.totalROI)}
        icon={<Percent className="w-4 h-4" />}
        trend={stats.totalROI >= 0 ? "up" : "down"}
      />
    </div>
  );
}
