export const COINBASE_CONFIG = {
  TOKEN_URL: 'https://api.coinbase.com/oauth/token',
  HEADERS: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};