import { invokeFunctionWithRetry } from '../src/lib/supabase/functions/client';
import { FUNCTION_NAMES } from '../src/lib/supabase/functions';

async function verifyEdgeFunction() {
  try {
    console.log('Verifying Edge Function...');

    // Test the edge function with a sample payload
    const response = await invokeFunctionWithRetry(
      FUNCTION_NAMES.SEND_CONFIRMATION,
      {
        email: 'test@example.com',
        name: 'Test User',
        token: '123e4567-e89b-12d3-a456-426614174000'
      }
    );

    const data = await response.json();
    console.log('✅ Edge Function responded successfully:', data);
    return true;
  } catch (error) {
    console.error('❌ Edge Function verification failed:', error.message);
    return false;
  }
}

// Run verification
verifyEdgeFunction().then(success => {
  process.exit(success ? 0 : 1);
});