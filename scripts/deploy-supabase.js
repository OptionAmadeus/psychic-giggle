#!/usr/bin/env node
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

async function deployDatabase() {
  try {
    if (!process.env.SUPABASE_ACCESS_TOKEN) {
      throw new Error('Missing SUPABASE_ACCESS_TOKEN environment variable');
    }

    console.log('🚀 Starting Supabase deployment...');

    // Link to project
    console.log('Linking to Supabase project...');
    execSync(
      `npx supabase link --project-ref jrtnypbsfgxfacytsddy --access-token ${process.env.SUPABASE_ACCESS_TOKEN}`,
      { stdio: 'inherit' }
    );

    // Push database changes
    console.log('Pushing database changes...');
    execSync('npx supabase db push', { stdio: 'inherit' });

    console.log('✅ Database deployment completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error deploying database:', error);
    return false;
  }
}

deployDatabase()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('Deployment failed:', error);
    process.exit(1);
  });