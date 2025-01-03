export function getSupabaseConfig() {
  const url = process.env.VITE_SUPABASE_URL?.trim();
  const key = process.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    throw new Error('Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
  }

  return { url, key };
}

export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateKey(key) {
  return typeof key === 'string' && 
         key.startsWith('eyJ') && 
         key.split('.').length === 3;
}