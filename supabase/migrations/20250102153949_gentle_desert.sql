/*
  # Edge Functions and OAuth Setup
  
  1. Changes
    - Add pgcrypto extension
    - Create OAuth token validation functions
    - Create OAuth tokens table with indexes
    - Add RLS policies with conflict handling
    
  2. Security
    - Enable RLS
    - Add secure token storage
    - Add proper access policies
*/

-- Enable pgcrypto for token handling
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create function to validate OAuth tokens
CREATE OR REPLACE FUNCTION auth.validate_oauth_token(
  token_data jsonb
) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    token_data->>'access_token' IS NOT NULL AND
    token_data->>'refresh_token' IS NOT NULL AND
    token_data->>'expires_in' IS NOT NULL
  );
END;
$$;

-- Create function to store OAuth tokens securely
CREATE OR REPLACE FUNCTION auth.store_oauth_token(
  user_id uuid,
  token_data jsonb
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO auth.oauth_tokens (
    user_id,
    provider,
    access_token,
    refresh_token,
    expires_at
  ) VALUES (
    user_id,
    'coinbase',
    token_data->>'access_token',
    token_data->>'refresh_token',
    now() + ((token_data->>'expires_in')::int * interval '1 second')
  )
  ON CONFLICT (user_id, provider) DO UPDATE
  SET
    access_token = EXCLUDED.access_token,
    refresh_token = EXCLUDED.refresh_token,
    expires_at = EXCLUDED.expires_at;
END;
$$;

-- Create OAuth tokens table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.oauth_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- Enable RLS
ALTER TABLE auth.oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can read own tokens" ON auth.oauth_tokens;
  DROP POLICY IF EXISTS "Users can update own tokens" ON auth.oauth_tokens;
  
  -- Create new policies
  CREATE POLICY "Users can read own tokens"
    ON auth.oauth_tokens
    FOR SELECT
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can update own tokens"
    ON auth.oauth_tokens
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
END $$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION auth.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Safely create trigger
DROP TRIGGER IF EXISTS set_updated_at ON auth.oauth_tokens;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON auth.oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION auth.set_updated_at();

-- Add indexes (IF NOT EXISTS is already used in the original)
CREATE INDEX IF NOT EXISTS idx_oauth_tokens_user_provider 
  ON auth.oauth_tokens(user_id, provider);
CREATE INDEX IF NOT EXISTS idx_oauth_tokens_expires 
  ON auth.oauth_tokens(expires_at);