import { execSync } from 'child_process';

function getCurrentNodeVersion() {
  return process.version.slice(1); // Remove 'v' prefix
}

function getRequiredNodeVersion() {
  try {
    const pkg = JSON.parse(process.env.npm_package_json);
    return pkg.engines?.node?.replace('>=', '') || '20.0.0';
  } catch {
    return '20.0.0'; // Fallback version
  }
}

function compareVersions(current, required) {
  const currentParts = current.split('.').map(Number);
  const requiredParts = required.split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    if (currentParts[i] > requiredParts[i]) return 1;
    if (currentParts[i] < requiredParts[i]) return -1;
  }
  return 0;
}

try {
  const currentVersion = getCurrentNodeVersion();
  const requiredVersion = getRequiredNodeVersion();
  
  if (compareVersions(currentVersion, requiredVersion) < 0) {
    console.error('\nNode.js Version Error');
    console.error('-------------------');
    console.error(`Current version: v${currentVersion}`);
    console.error(`Required version: v${requiredVersion} or higher`);
    console.error('\nTo upgrade Node.js:');
    console.error('\n1. Visit: https://nodejs.org/');
    console.error('2. Download Node.js 20 LTS');
    console.error('3. Run the installer');
    console.error('\nAfter installing, verify with:');
    console.error('   node --version');
    console.error('\nThen try again!');
    process.exit(1);
  }
} catch (error) {
  console.error('Error checking Node.js version:', error);
  process.exit(1);
}