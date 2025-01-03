export const SUPABASE_CONFIG = {
  version: '1.127.0',
  binaryName: 'supabase',
  platform: process.platform === 'darwin' ? 'darwin' : 'linux',
  arch: process.arch === 'arm64' ? 'arm64' : 'amd64',
  baseUrl: 'https://github.com/supabase/cli/releases/download'
};

export function getBinaryUrl() {
  const { version, platform, arch } = SUPABASE_CONFIG;
  return `${SUPABASE_CONFIG.baseUrl}/v${version}/supabase_${platform}_${arch}.tar.gz`;
}