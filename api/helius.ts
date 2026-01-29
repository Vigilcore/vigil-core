/**
 * Vercel Serverless Function for Helius Enhanced API
 * Keeps Enhanced API keys secure on the server side
 * NEVER exposes keys to client bundles
 */

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get Enhanced API key from environment (server-side only)
  const apiKey = process.env.HELIUS_ENHANCED_API_KEY || process.env.HELIUS_API_KEY;
  
  if (!apiKey || apiKey === 'undefined') {
    return res.status(500).json({ 
      error: 'HELIUS_ENHANCED_API_KEY not configured on server',
      status: 'OFFLINE'
    });
  }

  try {
    const { endpoint, method, queryParams, payload, rpcMethod, rpcParams } = req.body || {};

    // Support server-side JSON-RPC passthrough (for balance + pagination-safe history)
    // Uses Helius RPC endpoint with server-side API key (never exposed to client).
    if (rpcMethod) {
      const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      try {
        const response = await fetch(rpcUrl, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'vigil-helius-proxy',
            method: rpcMethod,
            params: Array.isArray(rpcParams) ? rpcParams : []
          })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          return res.status(response.status).json({
            error: `Helius RPC error: ${response.statusText}`,
            status: 'DEGRADED'
          });
        }

        const data = await response.json();
        return res.status(200).json(data);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          return res.status(504).json({
            error: 'Request timeout',
            status: 'DEGRADED'
          });
        }
        throw fetchError;
      }
    }

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint' });
    }

    // Use Enhanced Solana APIs base URL (matches dashboard examples)
    const HELIUS_API_BASE = 'https://api-mainnet.helius-rpc.com/v0';
    const httpMethod = method || (payload ? 'POST' : 'GET');
    
    // Build URL with query params for GET requests
    let url = `${HELIUS_API_BASE}${endpoint}?api-key=${apiKey}`;
    if (httpMethod === 'GET' && queryParams) {
      const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
      url += `&${queryString}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    try {
      const response = await fetch(url, {
        method: httpMethod,
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : undefined
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return res.status(response.status).json({
          error: `Helius API error: ${response.statusText}`,
          status: 'DEGRADED'
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        return res.status(504).json({
          error: 'Request timeout',
          status: 'DEGRADED'
        });
      }
      throw fetchError;
    }
  } catch (err: any) {
    console.error('[HELIUS_API_ERROR]', err);
    return res.status(500).json({
      error: err?.message || 'Internal server error',
      status: 'OFFLINE'
    });
  }
}
