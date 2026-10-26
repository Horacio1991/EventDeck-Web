// Public configuration only. No environment secrets or browser-supplied base URL.
export const SUPPORT_API_BASE = 'https://eventdeck-support-api.onrender.com';
export class SupportApiError extends Error {
  constructor(code) { super(code); this.name = 'SupportApiError'; this.code = code; }
}
export function parsePublicConfig(value) {
  if (!value || Array.isArray(value) || typeof value !== 'object' ||
      typeof value.ready !== 'boolean' || typeof value.testMode !== 'boolean' ||
      !(value.amount === null || (Number.isFinite(value.amount) && value.amount > 0)) ||
      typeof value.currency !== 'string' || !/^[A-Z]{3}$/.test(value.currency)) {
    throw new SupportApiError('INVALID_CONFIG');
  }
  // Discard all other fields: public configuration can NEVER carry authorization.
  return Object.freeze({ready:value.ready, testMode:value.testMode, amount:value.amount, currency:value.currency});
}
export function createSupportClient({fetchImpl = globalThis.fetch, timeoutMs = 12000} = {}) {
  return Object.freeze({async getConfig() {
    const controller = new AbortController();
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => { reject(new SupportApiError('TIMEOUT')); controller.abort(); }, timeoutMs);
    });
    try {
      return await Promise.race([timeout, (async () => {
        const response = await fetchImpl(`${SUPPORT_API_BASE}/api/support/config`, {
          method:'GET', mode:'cors', credentials:'omit', cache:'no-store', redirect:'error',
          referrerPolicy:'no-referrer', headers:{Accept:'application/json'}, signal:controller.signal,
        });
        if (!response.ok) throw new SupportApiError('HTTP_ERROR');
        if (!/\bapplication\/json\b/i.test(response.headers.get('content-type') || '')) throw new SupportApiError('INVALID_JSON');
        let value;
        try { value = await response.json(); } catch { throw new SupportApiError('INVALID_JSON'); }
        return parsePublicConfig(value);
      })()]);
    } catch (error) {
      if (error instanceof SupportApiError) throw error;
      throw new SupportApiError('NETWORK_ERROR');
    } finally { clearTimeout(timer); }
  }});
}
