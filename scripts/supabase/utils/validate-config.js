export function validateConfig() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
  }

  try {
    new URL(url);
  } catch {
    throw new Error('Invalid Supabase URL format');
  }

  if (!key.startsWith('eyJ')) {
    throw new Error('Invalid Supabase key format');
  }

  return { url, key };
}