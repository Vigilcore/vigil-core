/**
 * Helius Service - Real-time blockchain telemetry
 * Non-blocking, additive enhancement to Intent Validator
 * Gracefully handles failures without breaking simulation flow
 */

import { getCachedTelemetry, setCachedTelemetry } from '../lib/cache';

/**
 * Cache version - increment when telemetry calculation logic changes
 * When incremented, all cached data with old version is automatically invalidated
 * 
 * Version History:
 * - v1: Forward pagination (incorrect ages for old wallets)
 * - v2: Backwards pagination (correct ages for all wallets) - had bug with empty batch filtering
 * - v3: Backwards pagination with fixed batch filtering (filters valid blockTime before checking empty)
 */
const CACHE_VERSION = 3;

export type NetworkStatus = 'CONNECTED' | 'DEGRADED' | 'OFFLINE';
export type FundingSourceType = 'EXCHANGE' | 'PRIVATE_WALLET' | 'UNKNOWN';
export type ActivityPulse = 'ACTIVE' | 'DORMANT';
export type ClusterSignal = 'SINGLE_ORIGIN' | 'MULTI_SOURCE' | 'SEEDER_PATTERN';
export type SimilarityCollision = 'ZERO_DETECTION' | 'LOCAL_MATCH' | 'SOVEREIGN_NODE_MIMIC';
export type FlowType = 'ORGANIC' | 'SINGLE_USE' | 'UNKNOWN';
export type BalanceBand = '0 SOL' | '<0.01' | '0.01–1' | '>1';

export interface RealtimeTelemetry {
  status: NetworkStatus;
  addressAge?: string;
  lastSeen?: string;
  fundingSource?: FundingSourceType;
  activityPulse?: ActivityPulse;
  clusterSignal?: ClusterSignal;
  firstTxSignature?: string;
  lastTxSignature?: string;
  txCount?: number;
  tx15d?: number;
  similarityCollision?: SimilarityCollision;
  flowType?: FlowType;
  balanceBand?: BalanceBand;
  tokenCount?: number;
  balance10dAvg?: number; // Average SOL balance over last 10 days
  fundedBy?: string; // First observed funder (best-effort)
  _version?: number; // Cache version for automatic invalidation
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

  // ===== CACHE TEMPORARILY DISABLED FOR TESTING =====
  // CHECK CACHE FIRST (with version validation)
  // const cached = await getCachedTelemetry(address);
  // if (cached && cached._version === CACHE_VERSION) {
  //   console.log(`[VIGIL CACHE] Hit (v${CACHE_VERSION}):`, address.slice(0, 8));
  //   return { ...cached, status: 'CONNECTED' };
  // } else if (cached) {
  //   console.log(`[VIGIL CACHE] Version mismatch (cached: v${cached._version || 'undefined'}, current: v${CACHE_VERSION}), refetching...`);
  //   // Cache exists but version is old - treat as miss and re-fetch
  // }
  console.log('[VIGIL] Cache disabled - running fresh backwards pagination');
  // ===== END CACHE DISABLE =====

  const controller = new AbortController();
  let timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const nowSec = Date.now() / 1000;
    const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;  // 1 year in seconds

    const formatAge = (seconds: number): string => {
      if (seconds < 60) return '<1 min';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} min`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}`;
      const days = Math.floor(hours / 24);
      if (days < 30) return `${days} day${days > 1 ? 's' : ''}`;
      const totalMonths = Math.floor(days / 30);
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      if (years > 0 && months > 0) {
        return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
      }
      if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
    };

    const formatAgo = (seconds: number): string => {
      if (seconds < 60) return '<1 min';
      const minutes = Math.round(seconds / 60);
      if (minutes < 60) return `${minutes} min`;
      const hours = Math.round(minutes / 60);
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}`;
      const days = Math.round(hours / 24);
      if (days < 30) return `${days} day${days > 1 ? 's' : ''}`;
      const months = Math.round(days / 30);
      if (months < 12) return `${months} month${months > 1 ? 's' : ''}`;
      const years = Math.round(days / 365);
      return `${years} year${years > 1 ? 's' : ''}`;
    };

    const heliusRpc = async (rpcMethod: string, rpcParams: any[]) => {
      const res = await fetch(HELIUS_API_ROUTE, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rpcMethod, rpcParams })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.error || `RPC_ERROR_${res.status}`);
      }
      const json = await res.json().catch(() => ({}));
      if (json?.error) {
        throw new Error(json.error?.message || 'RPC_ERROR');
      }
      return json?.result;
    };

    const heliusParseTransactions = async (sigs: string[]) => {
      const res = await fetch(HELIUS_API_ROUTE, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: '/transactions/',
          method: 'POST',
          payload: { transactions: sigs }
        })
      });
      if (!res.ok) return [];
      const data = await res.json().catch(() => []);
      return Array.isArray(data) ? data : [];
    };

    // 1) Pull REAL balances via RPC (server-side key only)
    const balanceResult = await heliusRpc('getBalance', [address]).catch(() => null);
    const currentLamports: number = typeof balanceResult?.value === 'number' ? balanceResult.value : 0;
    const currentSol = currentLamports / 1e9;

    const tokenAccountsResult = await heliusRpc('getTokenAccountsByOwner', [
      address,
      { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
      { encoding: 'jsonParsed' }
    ]).catch(() => null);
    const tokenCount = Array.isArray(tokenAccountsResult?.value) ? tokenAccountsResult.value.length : undefined;

    // 2) BACKWARDS PAGINATION - Fetch oldest signatures first
    // Works for wallets of ANY age (1 day to 10+ years)
    // Strategy: Jump to the END, then parse oldest batch
    type SigRow = { signature: string; blockTime?: number | null };

    const fetchSigsPage = async (before?: string, limit: number = 100): Promise<SigRow[]> => {
      const cfg: any = { limit };
      if (before) cfg.before = before;
      const result = await heliusRpc('getSignaturesForAddress', [address, cfg]).catch(() => []);
      return Array.isArray(result) ? result : [];
    };

    const window15dSec = 15 * 24 * 60 * 60;
    const window10dSec = 10 * 24 * 60 * 60;

    let lastSeen: string | undefined;
    let activityPulse: ActivityPulse | undefined;

    let tx15d = 0;
    const sigs10d: string[] = [];

    let newestSig: SigRow | undefined;
    let oldestSig: SigRow | undefined;
    let oldestBlockTime: number | undefined;
    let hitPageCap = false;
    let fundedBy: string | undefined;
    let oldestInboundBlockTime: number | undefined;
    let oldestInboundSignature: string | undefined;

    console.log(`[VIGIL] ========== FINDING FIRST FUNDING EVENT ==========`);
    console.log(`[VIGIL] Strategy: Parse-as-we-paginate, stop immediately when funding found`);

    // ============================================================
    // STEP 1: FIND FIRST FUNDING - Parse as we paginate backwards
    // ============================================================
    // Key insight: We want the FIRST INBOUND FUNDING EVENT, not the oldest transaction
    // This is more efficient and avoids deep pagination issues
    
    let before: string | undefined = undefined;
    let paginationCallCount = 0;
    let consecutiveEmptyBatches = 0;
    
    const PAGINATION_BATCH_SIZE = 500; // Smaller batches for faster parsing
    const MAX_PAGINATION_CALLS = 50; // Reduced since we stop early
    const MAX_CONSECUTIVE_EMPTY = 3;

    // Helper function to detect first funding (canonical Solana definition)
    // preBalance === 0 && postBalance > 0 = first time wallet received funds
    const isFirstFunding = (tx: any, targetAddress: string): { isFunding: boolean; sender?: string; blockTime?: number } => {
      if (!tx) return { isFunding: false };
      
      // Method 1: Check accountData for preBalance === 0 && postBalance > 0 (CANONICAL)
      if (Array.isArray(tx?.accountData)) {
        const targetEntry = tx.accountData.find((a: any) => 
          a?.account === targetAddress &&
          typeof a?.preBalance === 'number' &&
          typeof a?.postBalance === 'number' &&
          a.preBalance === 0 &&
          a.postBalance > 0
        );
        
        if (targetEntry) {
          // Find sender: account with negative balance change
          const senderEntry = tx.accountData
            .filter((a: any) => {
              if (a?.account === targetAddress) return false;
              if (a?.account === '11111111111111111111111111111111') return false; // System Program
              if (a?.account === 'SysvarRent111111111111111111111111111111111') return false;
              
              const delta = typeof a?.nativeBalanceChange === 'number'
                ? a.nativeBalanceChange
                : (typeof a?.preBalance === 'number' && typeof a?.postBalance === 'number'
                  ? a.postBalance - a.preBalance
                  : 0);
              return delta < 0;
            })
            .sort((a: any, b: any) => {
              const aDelta = typeof a?.nativeBalanceChange === 'number'
                ? a.nativeBalanceChange
                : (a.postBalance - a.preBalance);
              const bDelta = typeof b?.nativeBalanceChange === 'number'
                ? b.nativeBalanceChange
                : (b.postBalance - b.preBalance);
              return aDelta - bDelta;
            })[0];
          
          const blockTime = typeof tx?.timestamp === 'number' 
            ? tx.timestamp 
            : (typeof tx?.blockTime === 'number' ? tx.blockTime : undefined);
          
          return {
            isFunding: true,
            sender: senderEntry?.account,
            blockTime
          };
        }
      }
      
      // Method 2: Fallback - check nativeBalanceChange > 0 (if preBalance not available)
      if (Array.isArray(tx?.accountData)) {
        const targetEntry = tx.accountData.find((a: any) => 
          a?.account === targetAddress &&
          typeof a?.nativeBalanceChange === 'number' &&
          a.nativeBalanceChange > 0
        );
        
        if (targetEntry) {
          const senderEntry = tx.accountData
            .filter((a: any) => {
              if (a?.account === targetAddress) return false;
              const delta = typeof a?.nativeBalanceChange === 'number' ? a.nativeBalanceChange : 0;
              return delta < 0;
            })
            .sort((a: any, b: any) => {
              const aDelta = typeof a?.nativeBalanceChange === 'number' ? a.nativeBalanceChange : 0;
              const bDelta = typeof b?.nativeBalanceChange === 'number' ? b.nativeBalanceChange : 0;
              return aDelta - bDelta;
            })[0];
          
          const blockTime = typeof tx?.timestamp === 'number' 
            ? tx.timestamp 
            : (typeof tx?.blockTime === 'number' ? tx.blockTime : undefined);
          
          return {
            isFunding: true,
            sender: senderEntry?.account,
            blockTime
          };
        }
      }
      
      return { isFunding: false };
    };

    while (paginationCallCount < MAX_PAGINATION_CALLS) {
      console.log(`[VIGIL DEBUG] ----- Pagination Call ${paginationCallCount + 1} -----`);
      console.log(`[VIGIL DEBUG] Cursor: ${before ? before.slice(0, 25) + '...' : 'undefined (first call)'}`);
      
      const batch = await fetchSigsPage(before, PAGINATION_BATCH_SIZE);
      paginationCallCount++;
      
      console.log(`[VIGIL DEBUG] Call ${paginationCallCount}: received ${batch.length} raw signatures`);
      
      // Check if empty batch
      if (batch.length === 0) {
        consecutiveEmptyBatches++;
        console.warn(`[VIGIL] Empty batch on call ${paginationCallCount} (${consecutiveEmptyBatches} consecutive)`);
        
        if (consecutiveEmptyBatches >= MAX_CONSECUTIVE_EMPTY) {
          console.log(`[VIGIL] Stopping: ${consecutiveEmptyBatches} consecutive empty batches`);
          break;
        }
        continue;
      }
      
      // Reset consecutive empty counter
      consecutiveEmptyBatches = 0;
      
      // Filter for valid signatures with blockTime
      const validSigs = batch.filter(sig => typeof sig.blockTime === 'number');
      console.log(`[VIGIL DEBUG] Call ${paginationCallCount}: ${validSigs.length} signatures with blockTime`);
      
      if (validSigs.length === 0) {
        console.warn(`[VIGIL] No valid signatures in batch, continuing...`);
        // Still need to set cursor to continue
        const lastSig = batch[batch.length - 1];
        if (lastSig?.signature) before = lastSig.signature;
        continue;
      }
      
      // Sort by blockTime (oldest first) - we want to check oldest transactions first
      const sortedByTime = [...validSigs].sort((a, b) => a.blockTime! - b.blockTime!);
      
      // Track oldest signature for fallback
      if (!oldestSig || (sortedByTime[0].blockTime! < (oldestSig.blockTime || Infinity))) {
        oldestSig = sortedByTime[0];
        oldestBlockTime = oldestSig.blockTime!;
      }
      
      // Check 1-year threshold
      const oldestAgeSeconds = nowSec - sortedByTime[0].blockTime!;
      if (oldestAgeSeconds >= ONE_YEAR_SECONDS) {
        console.log(`[VIGIL] ✅ Reached 1 year threshold after ${paginationCallCount} calls`);
        hitPageCap = true;
        break;
      }
      
      // Parse transactions in this batch (check oldest first)
      console.log(`[VIGIL] Parsing ${validSigs.length} signatures to find first funding...`);
      
      // Parse in batches of 100 (Helius limit for /transactions/ endpoint)
      for (let i = 0; i < sortedByTime.length; i += 100) {
        const sigsToParse = sortedByTime.slice(i, i + 100).map(s => s.signature).filter((sig): sig is string => typeof sig === 'string');
        if (sigsToParse.length === 0) continue;
        
        const parsed = await heliusParseTransactions(sigsToParse).catch((err) => {
          console.error(`[VIGIL] Failed to parse batch:`, err);
          return [];
        });
        
        if (parsed.length === 0) {
          console.warn(`[VIGIL] No transactions returned for parsing batch`);
          continue;
        }
        
        // Check each transaction for first funding (oldest first)
        for (const tx of parsed) {
          const fundingCheck = isFirstFunding(tx, address);
          
          if (fundingCheck.isFunding && fundingCheck.blockTime) {
            // Found first funding! Stop immediately
            oldestInboundBlockTime = fundingCheck.blockTime;
            oldestInboundSignature = tx?.signature || tx?.transaction?.signatures?.[0];
            fundedBy = fundingCheck.sender;
            
            const fundingAge = formatAge(nowSec - fundingCheck.blockTime);
            const fundingDate = new Date(fundingCheck.blockTime * 1000).toISOString();
            
            console.log(`[VIGIL] ========================================`);
            console.log(`[VIGIL] ✅ FIRST FUNDING EVENT FOUND!`);
            console.log(`[VIGIL]   Age: ${fundingAge}`);
            console.log(`[VIGIL]   Date: ${fundingDate}`);
            console.log(`[VIGIL]   Funded by: ${fundedBy?.slice(0, 20)}...`);
            console.log(`[VIGIL]   Signature: ${oldestInboundSignature?.slice(0, 20)}...`);
            console.log(`[VIGIL] ========================================`);
            
            // Exit both loops
            paginationCallCount = MAX_PAGINATION_CALLS; // Force exit outer loop
            break;
          }
        }
        
        // If we found funding, break out of parsing loop
        if (oldestInboundBlockTime) break;
      }
      
      // If we found funding, break out of pagination loop
      if (oldestInboundBlockTime) break;
      
      // Set cursor for next pagination call
      const lastSigInRawBatch = batch[batch.length - 1];
      if (!lastSigInRawBatch || !lastSigInRawBatch.signature) {
        console.error(`[VIGIL ERROR] Cannot set cursor - last signature invalid`);
        break;
      }
      
      before = lastSigInRawBatch.signature;
      const cursorAge = lastSigInRawBatch.blockTime ? formatAge(nowSec - lastSigInRawBatch.blockTime) : 'unknown';
      console.log(`[VIGIL DEBUG] Call ${paginationCallCount}: cursor set to ${before.slice(0, 25)}... (${cursorAge} ago)`);
      
      // Check if this was the final batch (incomplete = true end of history)
      if (batch.length < PAGINATION_BATCH_SIZE) {
        console.log(`[VIGIL] Reached end of history after ${paginationCallCount} calls (${batch.length} in final batch)`);
        break;
      }
    }

    console.log(`[VIGIL] ========== FUNDING SEARCH COMPLETE ==========`);
    console.log(`[VIGIL] Total pagination calls: ${paginationCallCount}`);
    if (oldestInboundBlockTime) {
      console.log(`[VIGIL] ✅ First funding found: ${formatAge(nowSec - oldestInboundBlockTime)} ago`);
    } else if (oldestSig) {
      console.log(`[VIGIL] ⚠️  First funding not found, using oldest transaction: ${formatAge(nowSec - oldestSig.blockTime!)} ago`);
    }

    // ============================================================
    // STEP 3: Fetch NEWEST batch for "last seen" and activity metrics
    // ============================================================
    console.log(`[VIGIL] Fetching newest signatures for activity metrics...`);
    const newestBatch = await fetchSigsPage(undefined, 1000);

    if (newestBatch.length > 0) {
      newestSig = newestBatch[0];
      
      // Calculate recent activity metrics
      for (const sig of newestBatch) {
        if (!sig.blockTime) continue;
        const ageSec = nowSec - sig.blockTime;
        if (ageSec <= window15dSec) tx15d += 1;
        if (ageSec <= window10dSec && sigs10d.length < 200) {
          sigs10d.push(sig.signature);
        }
      }
      
      console.log(`[VIGIL] Activity metrics: ${tx15d} transactions in last 15 days`);
      
      // Last activity time from newest signature
      if (newestSig.blockTime) {
        const diff = nowSec - newestSig.blockTime;
        lastSeen = formatAgo(diff) + ' ago';
        const hoursSinceLastTx = diff / (60 * 60);
        activityPulse = hoursSinceLastTx < 1 ? 'ACTIVE' : hoursSinceLastTx > (30 * 24) ? 'DORMANT' : 'ACTIVE';
      }
    }

    // ============================================================
    // DONE: We now have:
    // - oldestInboundBlockTime = First funding event (if found)
    // - oldestSig/oldestBlockTime = Fallback (oldest transaction if funding not found)
    // - newestSig = Last activity
    // - tx15d, sigs10d = Activity metrics
    // ============================================================

    // Note: First funding search is now done during pagination (parse-as-we-go)
    // If funding was not found, we'll use oldestSig as fallback below

    // Address age from OLDEST INBOUND NATIVE TRANSFER (true funding moment)
    let addressAge: string | undefined;
    if (oldestInboundBlockTime) {
      const diff = nowSec - oldestInboundBlockTime;
      if (diff > 0) {
        const baseAge = formatAge(diff);
        
        // Check if wallet is older than 1 year
        if (diff >= ONE_YEAR_SECONDS) {
          // Wallet is 1+ years old - show ">1 year" instead of exact age
          addressAge = hitPageCap ? ">1 year" : baseAge;
          console.log(`[VIGIL] Address age: >1 year (stopped pagination at 1 year threshold)`);
        } else {
          // Wallet is less than 1 year - show exact age
          addressAge = baseAge;
          console.log(`[VIGIL] Address age calculated from inbound transfer: ${addressAge}`);
        }
      }
    } else if (oldestSig?.blockTime) {
      // Fallback: use oldest transaction if we couldn't find an inbound transfer
      const diff = nowSec - oldestSig.blockTime;
      if (diff > 0) {
        const baseAge = formatAge(diff);
        
        if (diff >= ONE_YEAR_SECONDS) {
          addressAge = ">1 year";
          console.warn(`[VIGIL] Could not find inbound transfer, using oldest transaction: >1 year`);
        } else {
          addressAge = baseAge;
          console.warn(`[VIGIL] Could not find inbound transfer, using oldest transaction: ${addressAge}`);
        }
      }
    } else {
      console.error(`[VIGIL] No blockTime found for address age calculation`);
    }

    // 4) Balance band from REAL balance
    let balanceBand: BalanceBand | undefined;
    if (currentSol === 0) balanceBand = '0 SOL';
    else if (currentSol < 0.01) balanceBand = '<0.01';
    else if (currentSol <= 1) balanceBand = '0.01–1';
    else balanceBand = '>1';

    // 5) 10-day “average balance persistence” (best-effort)
    // We reconstruct a coarse balance curve from parsed native transfers in last 10 days.
    let balance10dAvg: number | undefined = undefined;
    if (sigs10d.length > 0) {
      const dayDeltas = new Map<number, number>(); // dayIndex -> net SOL delta
      for (let i = 0; i < sigs10d.length; i += 100) {
        const batch = sigs10d.slice(i, i + 100);
        const parsed = await heliusParseTransactions(batch).catch(() => []);
        for (const tx of parsed) {
          const bt = typeof tx?.timestamp === 'number' ? tx.timestamp : (typeof tx?.blockTime === 'number' ? tx.blockTime : undefined);
          if (!bt) continue;
          const day = Math.floor(bt / 86400);

          const nativeTransfers = Array.isArray(tx?.nativeTransfers) ? tx.nativeTransfers : [];
          let netLamports = 0;
          for (const t of nativeTransfers) {
            if (t?.toUserAccount === address && typeof t?.amount === 'number') netLamports += t.amount;
            if (t?.fromUserAccount === address && typeof t?.amount === 'number') netLamports -= t.amount;
          }
          if (netLamports !== 0) {
            dayDeltas.set(day, (dayDeltas.get(day) || 0) + netLamports / 1e9);
          }
        }
      }

      const nowDay = Math.floor(nowSec / 86400);
      const startDay = nowDay - 9;

      // Estimate starting balance = current balance - sum(deltas over window)
      let sumWindowDelta = 0;
      for (const [day, delta] of dayDeltas.entries()) {
        if (day >= startDay && day <= nowDay) sumWindowDelta += delta;
      }
      let bal = currentSol - sumWindowDelta;

      // Walk days and compute average end-of-day balance
      let sum = 0;
      let days = 0;
      for (let d = startDay; d <= nowDay; d++) {
        bal += dayDeltas.get(d) || 0;
        sum += bal;
        days += 1;
      }
      balance10dAvg = days > 0 ? sum / days : currentSol;
    } else {
      // No tx in last 10 days: average equals current balance (persistence is “flat”)
      balance10dAvg = currentSol;
    }

    // 6) Flow Type (descriptive)
    let flowType: FlowType = 'UNKNOWN';
    if (tx15d <= 1) flowType = 'SINGLE_USE';
    else if (tx15d >= 4) flowType = 'ORGANIC';
    else flowType = 'UNKNOWN';

    // Funding source + cluster signals (keep heuristic, driven by activity volume)
    let fundingSource: FundingSourceType = 'UNKNOWN';
    if (tx15d > 200) fundingSource = 'EXCHANGE';
    else if (tx15d > 10) fundingSource = 'PRIVATE_WALLET';

    let clusterSignal: ClusterSignal = 'SINGLE_ORIGIN';
    if (tx15d > 1000) clusterSignal = 'SEEDER_PATTERN';
    else if (tx15d > 100) clusterSignal = 'MULTI_SOURCE';

    // Similarity Collision Detection
    // Check against local trust graph (from localStorage) and known sovereign nodes
    let similarityCollision: SimilarityCollision = 'ZERO_DETECTION';
    try {
      const prefix = address.slice(0, 4);
      const suffix = address.slice(-4);
      
      // Check local trust graph (stored in localStorage)
      const trustGraphStr = localStorage.getItem('vigil_trust_graph');
      if (trustGraphStr) {
        try {
          const trustGraph: string[] = JSON.parse(trustGraphStr);
          const hasLocalMatch = trustGraph.some((trustedAddr: string) => {
            return trustedAddr.slice(0, 4) === prefix || trustedAddr.slice(-4) === suffix;
          });
          if (hasLocalMatch) {
            similarityCollision = 'LOCAL_MATCH';
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
      
      // Check against known sovereign/infrastructure addresses
      // Common Solana infrastructure addresses (examples - expand as needed)
      const sovereignNodes = [
        '11111111111111111111111111111111', // System Program
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // Token Program
        'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL', // Associated Token Program
        'So11111111111111111111111111111111111111112', // Wrapped SOL
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
      ];
      
      const hasSovereignMatch = sovereignNodes.some((sovereignAddr: string) => {
        return sovereignAddr.slice(0, 4) === prefix || sovereignAddr.slice(-4) === suffix;
      });
      
      if (hasSovereignMatch && similarityCollision !== 'LOCAL_MATCH') {
        similarityCollision = 'SOVEREIGN_NODE_MIMIC';
      }
    } catch (e) {
      // If detection fails, default to ZERO_DETECTION
    }

    const base: RealtimeTelemetry = {
      status: 'CONNECTED',
      addressAge,
      lastSeen,
      fundingSource,
      activityPulse,
      clusterSignal,
      firstTxSignature: oldestInboundSignature || oldestSig?.signature, // Use oldest inbound transfer if found
      lastTxSignature: newestSig?.signature,
      txCount: undefined,
      similarityCollision,
      flowType,
      balanceBand,
      tokenCount,
      fundedBy
    };
    
    base.balance10dAvg = typeof balance10dAvg === 'number' ? balance10dAvg : currentSol;
    base.tx15d = tx15d;

    // ===== CACHE STORAGE TEMPORARILY DISABLED FOR TESTING =====
    // CACHE THE RESULT (with version tag)
    // const cachedData = { ...base, _version: CACHE_VERSION };
    // setCachedTelemetry(address, cachedData).catch(err => 
    //   console.error('[VIGIL] Cache failed:', err)
    // );
    console.log('[VIGIL] Cache storage disabled - not caching result');
    // ===== END CACHE STORAGE DISABLE =====

    clearTimeout(timeoutId);
    return base;
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
    // Helius /transactions/ requires POST with payload
    const res = await fetch(HELIUS_API_ROUTE, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: '/transactions/',
        method: 'POST',
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
