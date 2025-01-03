import { createWriteStream } from 'fs';
import { get } from 'https';
import { Agent } from 'https';
import { RETRY_CONFIG, HTTP_TIMEOUT } from './constants.js';
import { getBinaryUrl } from './config.js';
import { delay, getExponentialDelay, validateResponse } from './utils.js';

function getHttpsAgent() {
  return new Agent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 4,
    timeout: HTTP_TIMEOUT
  });
}

async function attemptDownload(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    
    const options = {
      agent: getHttpsAgent(),
      timeout: HTTP_TIMEOUT,
      headers: {
        'User-Agent': 'Node.js',
        'Accept': '*/*'
      }
    };

    const request = get(url, options, (response) => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close();
        attemptDownload(response.headers.location, dest)
          .then(resolve)
          .catch(reject);
        return;
      }

      try {
        validateResponse(response);
        response.pipe(file);

        let receivedBytes = 0;
        response.on('data', chunk => {
          receivedBytes += chunk.length;
          process.stdout.write(`\rDownloading... ${Math.round(receivedBytes / 1024)}KB`);
        });
      } catch (error) {
        file.close();
        reject(error);
        return;
      }
    });

    file.on('finish', () => {
      process.stdout.write('\n');
      file.close();
      resolve();
    });

    file.on('error', (err) => {
      file.close();
      reject(new Error(`Write failed: ${err.message}`));
    });

    request.on('error', (err) => {
      file.close();
      reject(new Error(`Request failed: ${err.message}`));
    });

    request.on('timeout', () => {
      request.destroy();
      file.close();
      reject(new Error('Request timed out'));
    });
  });
}

export async function downloadBinary(dest) {
  const url = getBinaryUrl();
  console.log(`Downloading Supabase CLI from: ${url}`);

  for (let attempt = 1; attempt <= RETRY_CONFIG.maxAttempts; attempt++) {
    try {
      if (attempt > 1) {
        const delayMs = getExponentialDelay(attempt, RETRY_CONFIG);
        console.log(`\nRetry attempt ${attempt}/${RETRY_CONFIG.maxAttempts} after ${delayMs}ms delay...`);
        await delay(delayMs);
      }

      await attemptDownload(url, dest);
      console.log('\nDownload completed successfully');
      return;
    } catch (error) {
      console.error(`\nAttempt ${attempt} failed:`, error.message);
      
      if (attempt === RETRY_CONFIG.maxAttempts) {
        throw new Error(`Download failed after ${RETRY_CONFIG.maxAttempts} attempts: ${error.message}`);
      }
    }
  }
}