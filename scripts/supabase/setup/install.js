import { execSync } from 'child_process';
import { mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { downloadBinary } from './download.js';
import { BINARY_CONFIG } from './constants.js';

const CLI_DIR = join(process.cwd(), 'node_modules', '.bin');

async function createDirectory() {
  try {
    await mkdir(CLI_DIR, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create directory: ${error.message}`);
  }
}

async function extractBinary(tarFile) {
  try {
    execSync(`tar -xzf ${tarFile} -C ${CLI_DIR}`);
    execSync(`chmod +x ${join(CLI_DIR, BINARY_CONFIG.binaryName)}`);
  } catch (error) {
    throw new Error(`Failed to extract binary: ${error.message}`);
  }
}

async function verifyInstallation() {
  try {
    const binaryPath = join(CLI_DIR, BINARY_CONFIG.binaryName);
    const version = execSync(`${binaryPath} --version`).toString().trim();
    return version;
  } catch (error) {
    throw new Error(`Failed to verify installation: ${error.message}`);
  }
}

export async function installCLI() {
  const tarFile = join(CLI_DIR, 'supabase.tar.gz');
  
  try {
    await createDirectory();
    await downloadBinary(tarFile);
    await extractBinary(tarFile);
    const version = await verifyInstallation();
    
    console.log(`Supabase CLI ${version} installed successfully`);
    return true;
  } catch (error) {
    console.error('Installation failed:', error.message);
    return false;
  } finally {
    try {
      await unlink(tarFile);
    } catch {
      // Ignore cleanup errors
    }
  }
}