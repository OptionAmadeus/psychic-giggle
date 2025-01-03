import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { validateEnvironment } from '../utils/validate-env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

export async function runSupabaseCommand(command) {
  try {
    validateEnvironment();

    // Use npx for running Supabase commands since Docker isn't available
    const cmd = `npx supabase ${command} --project-ref ${process.env.SUPABASE_PROJECT_REF || 'dvkpanntfxehgasngylg'} --access-token ${process.env.SUPABASE_ACCESS_TOKEN}`;
    
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error('Failed to run Supabase command:', error);
    return false;
  }
}