import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { validateEnvironment } from '../utils/validate-env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

async function deployDatabase() {
  try {
    console.log('🚀 Starting Supabase deployment...');
    
    // Validate environment
    validateEnvironment();

    // Run db push command
    execSync('npx supabase db push', {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });

    console.log('✅ Database deployment completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database deployment failed:', error);
    process.exit(1);
  }
}

// Run deployment and handle any uncaught errors
deployDatabase().catch(error => {
  console.error('Deployment failed:', error);
  process.exit(1);
});