/**
 * Helius Service - Real-time blockchain telemetry
 * Non-blocking, additive enhancement to Intent Validator
 * Gracefully handles failures without breaking simulation flow
 */

export type NetworkStatus = 'CONNECTED' | 'DEGRADED' | 'OFFLINE';
export type FundingSourceType = 'EXCHANGE' | 'PRIVATE_WALLET' | 'UNKNOWN';
export type ActivityPulse = 'ACTIVE' | 'DORMANT';
export type ClusterSignal = 'SINGLE_ORIGIN' | 'MULTI_SOURCE' | 'SEEDER_PATTERN';

export interface RealtimeTelemetry {
  status: NetworkStatus;
  addressAge?: string;
  fundingSource?: FundingSourceType;
  activityPulse?: ActivityPulse;
  clusterSignal?: ClusterSignal;
  firstTxSignature?: string;
  lastTxSignature?: string;
  txCount?: number;
}

export interface HeliusAddressResponse {
  account?: {
    lamports?: number;
    owner?: string;
    executable?: boolean;
    rentEpoch?: number;
  };
  transactions?: Array<{
    signature: string;
    blockTime?: number;
    slot?: number;
  }>;
}

// Server-side API route - Enhanced API key is NEVER exposed to client
const HELIUS_API_ROUTE = '/api/helius';
const REQUEST_TIMEOUT = 9000; // 9 seconds

/**
 * Get address telemetry from Helius API via server-side proxy
 * Returns normalized telemetry or unavailable status
 * Enhanced API key is NEVER exposed to client
 */
export async function getAddressTelemetry(address: string): Promise<RealtimeTelemetry> {
  if (!address || address.length < 32) {
    return { status: 'OFFLINE' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    // Call server-side API route (Enhanced API key is server-side only)
    const transactionsRes = await fetch(HELIUS_API_ROUTE, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: `/addresses/${address}/transactions`,
        payload: { limit: 10 }
      })
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (!transactionsRes?.ok) {
      const errorData = await transactionsRes?.json().catch(() => ({}));
      return { status: errorData.status || 'DEGRADED' };
    }

    const transactions = await transactionsRes.json().catch(() => []);

    // Normalize response
    const sortedTxs = (transactions || []).sort((a: any, b: any) => 
      (b.blockTime || 0) - (a.blockTime || 0)
    );

    const firstTx = sortedTxs[sortedTxs.length - 1];
    const lastTx = sortedTxs[0];

    // Calculate address age
    let addressAge: string | undefined;
    if (firstTx?.blockTime) {
      const ageMs = Date.now() - (firstTx.blockTime * 1000);
      const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
      if (ageDays === 0) addressAge = '<1 Day';
      else if (ageDays < 30) addressAge = `${ageDays} Day${ageDays > 1 ? 's' : ''}`;
      else if (ageDays < 365) addressAge = `${Math.floor(ageDays / 30)} Month${Math.floor(ageDays / 30) > 1 ? 's' : ''}`;
      else addressAge = `${Math.floor(ageDays / 365)} Year${Math.floor(ageDays / 365) > 1 ? 's' : ''}`;
    }

    // Determine activity pulse
    let activityPulse: ActivityPulse | undefined;
    if (lastTx?.blockTime) {
      const hoursSinceLastTx = (Date.now() - (lastTx.blockTime * 1000)) / (1000 * 60 * 60);
      activityPulse = hoursSinceLastTx < 1 ? 'ACTIVE' : hoursSinceLastTx > (30 * 24) ? 'DORMANT' : 'ACTIVE';
    }

    // Determine funding source (simplified heuristic)
    let fundingSource: FundingSourceType = 'UNKNOWN';
    // In a real implementation, you'd analyze transaction patterns
    // For now, we'll use a simple heuristic based on transaction count
    if (sortedTxs.length > 100) {
      fundingSource = 'EXCHANGE';
    } else if (sortedTxs.length > 10) {
      fundingSource = 'PRIVATE_WALLET';
    }

    // Determine cluster signal (simplified)
    let clusterSignal: ClusterSignal = 'SINGLE_ORIGIN';
    if (sortedTxs.length > 1000) {
      clusterSignal = 'SEEDER_PATTERN';
    } else if (sortedTxs.length > 50) {
      clusterSignal = 'MULTI_SOURCE';
    }

    return {
      status: 'CONNECTED',
      addressAge,
      fundingSource,
      activityPulse,
      clusterSignal,
      firstTxSignature: firstTx?.signature,
      lastTxSignature: lastTx?.signature,
      txCount: sortedTxs.length
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { status: 'DEGRADED' };
    }
    return { status: 'OFFLINE' };
  }
}

/**
 * Get transaction telemetry from Helius API via server-side proxy
 * Returns normalized telemetry or unavailable status
 * Enhanced API key is NEVER exposed to client
 */
export async function getTransactionTelemetry(signature: string): Promise<RealtimeTelemetry> {
  if (!signature || signature.length < 64) {
    return { status: 'OFFLINE' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    // Call server-side API route (Enhanced API key is server-side only)
    const res = await fetch(HELIUS_API_ROUTE, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: '/transactions/',
        payload: { transactions: [signature] }
      })
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { status: errorData.status || 'DEGRADED' };
    }

    const data = await res.json().catch(() => []);
    const tx = Array.isArray(data) ? data[0] : null;

    if (!tx) {
      return { status: 'DEGRADED' };
    }

    return {
      status: 'CONNECTED',
      lastTxSignature: signature
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { status: 'DEGRADED' };
    }
    return { status: 'OFFLINE' };
  }
}
