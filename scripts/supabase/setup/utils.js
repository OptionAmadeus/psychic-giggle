export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getExponentialDelay(attempt, { initialDelay, maxDelay }) {
  const exponentialDelay = initialDelay * Math.pow(2, attempt - 1);
  return Math.min(exponentialDelay, maxDelay);
}

export function validateResponse(response) {
  if (!response.statusCode) {
    throw new Error('No status code in response');
  }
  
  if (response.statusCode === 404) {
    throw new Error('Binary not found - invalid version or platform');
  }
  
  if (response.statusCode >= 400) {
    throw new Error(`HTTP ${response.statusCode}: ${response.statusMessage || 'Unknown error'}`);
  }

  // Verify content type for binary download
  const contentType = response.headers['content-type'];
  if (!contentType?.includes('application/octet-stream') && 
      !contentType?.includes('application/gzip')) {
    throw new Error(`Unexpected content type: ${contentType}`);
  }
}