import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { getSupabaseConfig, validateUrl, validateKey } from './utils/config.js';
import { testConnection, isDNSError } from './utils/network.js';

dotenv.config();

async function checkHealth() {
  try {
    // Get and validate config
    const config = getSupabaseConfig();
    
    if (!validateUrl(config.url)) {
      throw new Error('Invalid Supabase URL format');
    }
    if (!validateKey(config.key)) {
      throw new Error('Invalid Supabase key format');
    }

    // Test connectivity
    console.log('\nTesting connectivity...');
    const connTest = await testConnection(config.url);
    
    if (!connTest.ok) {
      const error = connTest.error || connTest.statusText;
      if (isDNSError(error)) {
        throw new Error('DNS resolution failed - please check your Supabase project URL');
      }
      throw new Error(`Connection failed: ${error}`);
    }

    console.log('✅ Connection successful');

    // Initialize Supabase client
    const supabase = createClient(config.url, config.key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    // Test database
    const { error: dbError } = await supabase
      .from('waitlist')
      .select('count')
      .limit(1);

    if (dbError) {
      console.error('❌ Database check failed:', dbError.message);
    } else {
      console.log('✅ Database connection successful');
    }

    // Test auth
    const { error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('❌ Auth service check failed:', authError.message);
    } else {
      console.log('✅ Auth service operational');
    }

    return !dbError && !authError;
  } catch (error) {
    console.error('\n❌ Health check failed:', error.message);
    return false;
  }
}

checkHealth().then(success => {
  process.exit(success ? 0 : 1);
});