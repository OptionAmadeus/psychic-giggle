/*
  # Update Auth Configuration Settings

  1. Changes
    - Update site URL and redirect URLs
    - Configure JWT settings
    - Update email authentication settings
    - Configure Coinbase OAuth settings

  2. Security
    - Updates authentication security parameters
    - Sets proper JWT expiration time
    - Configures secure email settings
*/

-- Update core auth settings
SELECT auth.set_config(
  'site_url',
  'https://tryself.ai',
  'Primary site URL'
);

SELECT auth.set_config(
  'additional_redirect_urls',
  'https://tryself.ai',
  'Additional redirect URLs'
);

-- Configure JWT settings
SELECT auth.set_config(
  'jwt_expiry',
  '3600',
  'JWT expiry time in seconds'
);

SELECT auth.set_config(
  'enable_refresh_token_rotation',
  'true',
  'Enable refresh token rotation'
);

SELECT auth.set_config(
  'refresh_token_reuse_interval',
  '10',
  'Refresh token reuse window'
);

--- Configure email authentication
SELECT auth.set_config(
  'email.enable_signup',
  'true',
  'Allow email signups'
);

SELECT auth.set_config(
  'email.double_confirm_changes',
  'true',
  'Require confirmation for email changes'
);

-- Configure Coinbase OAuth
SELECT auth.set_config(
  'external.coinbase.enabled',
  'true',
  'Enable Coinbase OAuth'
);

SELECT auth.set_config(
  'external.coinbase.client_id',
  'f9ea95af-876c-4a33-9230-bed617584e83',
  'Coinbase OAuth client ID'
);

SELECT auth.set_config(
  'external.coinbase.redirect_uri',
  'https://tryself.ai/auth/callback',
  'Coinbase OAuth redirect URI'
);