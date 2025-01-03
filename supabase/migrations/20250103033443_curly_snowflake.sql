-- Update auth configuration
SELECT auth.set_config(
  'site_url',
  'https://tryself.ai',
  'Site URL for authentication'
);

SELECT auth.set_config(
  'additional_redirect_urls',
  'https://tryself.ai',
  'Additional redirect URLs'
);

SELECT auth.set_config(
  'jwt_expiry',
  '3600',
  'JWT expiry time in seconds'
);

-- Update Coinbase OAuth settings
SELECT auth.set_config(
  'external.coinbase.redirect_uri',
  'https://tryself.ai/auth/callback',
  'Coinbase OAuth redirect URI'
);