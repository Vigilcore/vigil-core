/**
 * Client-side cache functions that call server-side API route
 * Vercel KV can only be used server-side, so we proxy through /api/cache
 */

const CACHE_API_ROUTE = '/api/cache';

export async function getCachedTelemetry(address: string): Promise<any | null> {
  try {
    const response = await fetch(CACHE_API_ROUTE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get', address })
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('[VIGIL CACHE KV] Read error:', error);
    return null;
  }
}

export async function setCachedTelemetry(address: string, data: any): Promise<void> {
  try {
    await fetch(CACHE_API_ROUTE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set', address, data })
    });
  } catch (error) {
    console.error('[VIGIL CACHE KV] Write error:', error);
  }
}

export async function deleteCachedTelemetry(address: string, adminKey?: string): Promise<boolean> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }

    const response = await fetch(CACHE_API_ROUTE, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: 'delete', address, adminKey })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('[VIGIL CACHE KV] Delete error:', error);
      return false;
    }

    console.log(`[VIGIL CACHE KV] Deleted cache for ${address.slice(0, 8)}...`);
    return true;
  } catch (error) {
    console.error('[VIGIL CACHE KV] Delete error:', error);
    return false;
  }
}
