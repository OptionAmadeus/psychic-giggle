import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { validateEnvironment } from '../utils/validate-env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

export async function runSupabaseCLI(command) {
  try {
    validateEnvironment();

    // Execute command with proper error handling
    execSync(`npx supabase ${command}`, {
      stdio: ['inherit', 'inherit', 'pipe'],
      env: {
        ...process.env,
        SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
        SUPABASE_PROJECT_REF: process.env.SUPABASE_PROJECT_REF || 'dvkpanntfxehgasngylg'
      }
    });

    return true;
  } catch (error) {
    // Handle specific error cases
    if (error.stderr) {
      console.error('Command error:', error.stderr.toString());
    }
    if (error.status === 130) {
      console.log('Command interrupted by user');
    }
    return false;
  }
}