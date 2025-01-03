export function validateEnvironment() {
  const required = [
    'SUPABASE_ACCESS_TOKEN',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate token format
  if (!process.env.SUPABASE_ACCESS_TOKEN.startsWith('sbp_')) {
    throw new Error('Invalid SUPABASE_ACCESS_TOKEN format');
  }

  // Validate URL format
  try {
    new URL(process.env.VITE_SUPABASE_URL);
  } catch {
    throw new Error('Invalid VITE_SUPABASE_URL format');
  }
}