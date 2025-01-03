import fetch from 'node-fetch';

export async function testConnection(url, timeoutMs = 5000) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });

    clearTimeout(timeout);

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        ok: false,
        error: 'Connection timed out'
      };
    }
    return {
      ok: false,
      error: error.message
    };
  }
}

export function isDNSError(error) {
  const dnsErrors = [
    'DNS',
    'ENOTFOUND',
    'getaddrinfo',
    'resolve',
    'lookup'
  ];
  return dnsErrors.some(term => error?.toLowerCase().includes(term.toLowerCase()));
}