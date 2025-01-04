import type {
  Asset,
  Transaction,
  TradeRecommendation,
} from "@/types/portfolio";

export interface PortfolioState {
  assets: Asset[];
  transactions: Transaction[];
  recommendations: TradeRecommendation[];
  performanceHistory: Array<{
    timestamp: number;
    totalValue: number;
  }>;
  stats: {
    totalValue: number;
    totalChange24h: number;
    totalProfitLoss: number;
    totalROI: number;
    lastUpdated: Date;
  };
  isConnected: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface PortfolioActions {
  refreshPortfolio: () => Promise<void>;
  getRecommendations: () => Promise<void>;
  setWalletAddress: (address: string) => void;
  clearPortfolio: () => void;
}

export type PortfolioStore = PortfolioState & PortfolioActions;
