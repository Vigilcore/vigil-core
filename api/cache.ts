/**
 * Vercel KV Cache API Route
 * Server-side caching for Helius telemetry data
 */

import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const CACHE_TTL = 86400; // 24 hours in seconds

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, address, data } = req.body || {};

  try {
    if (action === 'get') {
      // Get cached telemetry
      if (!address) {
        return res.status(400).json({ error: 'Address required' });
      }

      const cached = await kv.get(`vigil:address:${address}`);
      if (cached) {
        console.log(`[VIGIL CACHE KV] Hit for ${address.slice(0, 8)}...`);
        return res.status(200).json({ data: cached });
      }

      console.log(`[VIGIL CACHE KV] Miss for ${address.slice(0, 8)}...`);
      return res.status(200).json({ data: null });

    } else if (action === 'set') {
      // Set cached telemetry
      if (!address || !data) {
        return res.status(400).json({ error: 'Address and data required' });
      }

      await kv.set(`vigil:address:${address}`, data, { ex: CACHE_TTL });
      console.log(`[VIGIL CACHE KV] Stored for ${address.slice(0, 8)}... (24h TTL)`);
      return res.status(200).json({ success: true });

    } else if (action === 'delete') {
      // Delete cached telemetry (for testing/debugging)
      // Security: Only allow in development or with admin key
      const isDevelopment = process.env.NODE_ENV !== 'production';
      const adminKey = req.headers['x-admin-key'] || req.body?.adminKey;
      const validAdminKey = process.env.ADMIN_CACHE_KEY;

      if (!isDevelopment && (!adminKey || adminKey !== validAdminKey)) {
        return res.status(403).json({ error: 'Delete action requires admin key in production' });
      }

      if (!address) {
        return res.status(400).json({ error: 'Address required' });
      }

      await kv.del(`vigil:address:${address}`);
      console.log(`[VIGIL CACHE KV] Deleted cache for ${address.slice(0, 8)}...`);
      return res.status(200).json({ success: true, message: 'Cache deleted' });

    } else {
      return res.status(400).json({ error: 'Invalid action. Use "get", "set", or "delete"' });
    }
  } catch (error: any) {
    console.error('[VIGIL CACHE KV] Error:', error);
    return res.status(500).json({ error: error?.message || 'Cache operation failed' });
  }
}
