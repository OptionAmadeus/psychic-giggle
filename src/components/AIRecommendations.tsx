import { usePortfolioStore } from '../stores/portfolio';
import { RecommendationList } from './recommendations/RecommendationList';
import { RefreshButton } from './ui/RefreshButton';

export function AIRecommendations() {
  const { recommendations, isLoading, getRecommendations } = usePortfolioStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Recommendations</h2>
        <RefreshButton onClick={getRecommendations} isLoading={isLoading} />
      </div>
      <RecommendationList recommendations={recommendations} />
    </div>
  );
}