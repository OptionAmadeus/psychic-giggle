export function logResults(results) {
  console.log('\nHealth Check Results:');
  console.log('-------------------');
  
  // Log database status
  console.log('Database:', results.database ? '✅ Connected' : '❌ Failed');
  if (results.errors.database) {
    console.log('  Error:', results.errors.database);
  }

  // Log auth status
  console.log('Auth Service:', results.auth ? '✅ Operational' : '❌ Failed');
  if (results.errors.auth) {
    console.log('  Error:', results.errors.auth);
  }

  // Overall status
  const isHealthy = results.database && results.auth;
  console.log('\nOverall Status:', isHealthy ? '✅ Healthy' : '❌ Unhealthy');

  return isHealthy;
}