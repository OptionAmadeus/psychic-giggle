export interface CoinbaseConfig {
  apiKey: string;
  apiSecret: string;
  sandbox: boolean;
}

export interface CoinbaseBalance {
  id: string;
  currency: string;
  balance: string;
  available: string;
  hold: string;
  price?: string;
  change24h?: string;
}

export interface CoinbaseOrder {
  id: string;
  side: 'buy' | 'sell';
  productId: string;
  size: string;
  price?: string;
  type: 'market' | 'limit';
  status: 'pending' | 'open' | 'done' | 'rejected';
  createdAt: string;
}

export interface PriceHistory {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Granularity = 60 | 300 | 900 | 3600 | 21600 | 86400;

export interface PriceUpdate {
  productId: string;
  price: number;
  time: Date;
}