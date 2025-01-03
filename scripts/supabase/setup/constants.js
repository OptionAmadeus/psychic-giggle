export const RETRY_CONFIG = {
  maxAttempts: 5, // Increased from 3
  initialDelay: 2000, // Increased from 1000
  maxDelay: 10000 // Increased from 5000
};

export const HTTP_TIMEOUT = 60000; // Increased from 30000

export const BINARY_CONFIG = {
  version: '1.127.0',
  binaryName: 'supabase',
  platform: process.platform === 'darwin' ? 'darwin' : 'linux',
  arch: process.arch === 'arm64' ? 'arm64' : 'amd64'
};