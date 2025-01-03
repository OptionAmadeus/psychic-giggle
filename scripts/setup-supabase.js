import { installCLI } from './supabase/setup/install.js';

async function setup() {
  console.log('Setting up Supabase CLI...');
  
  const success = await installCLI();
  
  if (!success) {
    console.error('Failed to setup Supabase CLI');
    process.exit(1);
  }
  
  console.log('Setup complete!');
}

setup().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});