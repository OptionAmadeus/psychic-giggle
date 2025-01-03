import { LineChart } from '../charts/LineChart';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatCurrency } from '@/utils/formatters';
import { EmptyState } from '../ui/EmptyState';

export function PerformanceChart() {
  const { performanceHistory, stats } = usePortfolioStore();

  if (!performanceHistory?.length) {
    return <EmptyState message="No performance data available" />;
  }

  const chartData = performanceHistory.map(point => ({
    timestamp: point.timestamp,
    value: point.totalValue
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
      <div className="h-[400px]">
        <LineChart
          data={chartData}
          valueFormatter={formatCurrency}
          dateFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
        />
      </div>
      <div className="mt-4 text-sm text-gray-500 text-right">
        Last updated: {stats.lastUpdated.toLocaleString()}
      </div>
    </div>
  );
}