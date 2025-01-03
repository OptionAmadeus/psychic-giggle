import { checkSupabaseHealth } from '../src/lib/supabase/health/check';

async function runHealthCheck() {
  console.log('\nChecking Supabase connection...');
  
  const result = await checkSupabaseHealth();
  
  console.log('\nHealth Check Results:');
  console.log('-------------------');
  console.log('Status:', result.status);
  console.log('Time:', result.timestamp);
  console.log('Message:', result.message);
  
  if (result.error) {
    console.error('Error:', result.error);
    process.exit(1);
  }

  process.exit(0);
}

runHealthCheck().catch(console.error);