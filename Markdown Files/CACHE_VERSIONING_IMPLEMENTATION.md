# CACHE VERSIONING IMPLEMENTATION GUIDE

## OBJECTIVE:
Add automatic cache invalidation when backwards pagination logic changes.

---

## STEP 1: Add Version Constant to heliusService.ts

**Location:** Top of services/heliusService.ts (after imports, before types)

**Add this:**
```typescript
/**
 * Cache version - increment when telemetry calculation logic changes
 * When incremented, all cached data with old version is automatically invalidated
 * 
 * Version History:
 * - v1: Forward pagination (incorrect ages for old wallets)
 * - v2: Backwards pagination (correct ages for all wallets)
 */
const CACHE_VERSION = 2;
```

---

## STEP 2: Update Cache Check Logic

**Location:** services/heliusService.ts, line ~64-67

**BEFORE:**
```typescript
// CHECK CACHE FIRST
const cached = await getCachedTelemetry(address);
if (cached) {
  return { ...cached, status: 'CONNECTED' };
}
```

**AFTER:**
```typescript
// CHECK CACHE FIRST (with version validation)
const cached = await getCachedTelemetry(address);
if (cached && cached._version === CACHE_VERSION) {
  console.log(`[VIGIL CACHE] Hit (v${CACHE_VERSION}):`, address.slice(0, 8));
  return { ...cached, status: 'CONNECTED' };
} else if (cached) {
  console.log(`[VIGIL CACHE] Version mismatch (cached: v${cached._version}, current: v${CACHE_VERSION}), refetching...`);
  // Cache exists but version is old - treat as miss and re-fetch
}
```

---

## STEP 3: Update Cache Storage Logic

**Location:** services/heliusService.ts, line ~635-638 (where cache is stored)

**BEFORE:**
```typescript
// CACHE THE RESULT
setCachedTelemetry(address, base).catch(err => 
  console.error('[VIGIL] Cache failed:', err)
);
```

**AFTER:**
```typescript
// CACHE THE RESULT (with version tag)
const cachedData = { ...base, _version: CACHE_VERSION };
setCachedTelemetry(address, cachedData).catch(err => 
  console.error('[VIGIL] Cache failed:', err)
);
```

---

## STEP 4: Update TypeScript Interface

**Location:** services/heliusService.ts, RealtimeTelemetry interface (line ~14-27)

**Add to interface:**
```typescript
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
  balance10dAvg?: number;
  fundedBy?: string;
  _version?: number; // ← ADD THIS LINE
}
```

---

## TESTING AFTER IMPLEMENTATION:

### Test 1: Version Mismatch Detection
```javascript
// In browser console:
// 1. Check current cache version
const cached = await fetch('/api/cache', {
  method: 'POST',
  body: JSON.stringify({ 
    action: 'get', 
    address: '2myVjgs3288WTH8mc3mgNyjuJfDfYkA7qdcJb9LQyoTx' 
  })
});
const data = await cached.json();
console.log('Cached version:', data.data?._version); // Should show undefined (old cache)

// 2. Search address - should see version mismatch log
// Console should show: "[VIGIL CACHE] Version mismatch (cached: v1, current: v2), refetching..."
```

### Test 2: New Cache Has Version
```javascript
// After searching once:
const cached = await fetch('/api/cache', {
  method: 'POST',
  body: JSON.stringify({ 
    action: 'get', 
    address: '2myVjgs3288WTH8mc3mgNyjuJfDfYkA7qdcJb9LQyoTx' 
  })
});
const data = await cached.json();
console.log('Cached version:', data.data?._version); // Should show 2

// 3. Search same address again - should see cache hit
// Console should show: "[VIGIL CACHE] Hit (v2): 2myVjgs3..."
```

### Test 3: Correct Age Displayed
```
UI should show:
ADDRESS AGE: 1 year 11 days ✅ (not "4 days")
```

---

## DEPLOYMENT IMPACT:

**What happens on deployment:**
1. All cached addresses have `_version: undefined` (old cache)
2. Version check fails: `undefined !== 2`
3. Cache treated as miss → backwards pagination runs
4. New data cached with `_version: 2`
5. Subsequent lookups: version matches → cache hit

**API call spike:**
- First lookup after deployment: Cache miss (re-fetch required)
- Estimated spike: 1000 unique addresses × $0.001 = $1.00 one-time cost
- Duration: ~1-2 hours (as users search addresses)
- After spike: Normal cache hit rate (95%+)

**User experience:**
- Transparent (automatic, no user action)
- Slight delay on first lookup (3-4 seconds vs 50ms)
- All subsequent lookups: Fast (cached)

---

## FUTURE VERSION INCREMENTS:

**When to increment CACHE_VERSION:**
- ✅ Change pagination logic (e.g., v2 → v3 if you optimize batch sizes)
- ✅ Change age calculation formula
- ✅ Change threat index calculation
- ✅ Add new required fields to telemetry
- ❌ UI-only changes (no need to invalidate cache)
- ❌ Performance optimizations that don't change output

**How to increment:**
```typescript
// Old:
const CACHE_VERSION = 2;

// New (after logic change):
const CACHE_VERSION = 3; // Update comment in version history
```

---

## SECURITY NOTE:

Cache versioning is **safe** because:
- Version check happens server-side (heliusService.ts)
- Users cannot manipulate version numbers
- Old cache gracefully expires naturally (24h TTL)
- No breaking changes to API

---

## MONITORING (Optional Enhancement):

Add cache version metrics:
```typescript
// In heliusService.ts, after cache check:
if (cached && cached._version !== CACHE_VERSION) {
  // Optional: Send to analytics
  console.warn(`[VIGIL ANALYTICS] Cache version mismatch: ${cached._version} → ${CACHE_VERSION}`);
}
```

---

## READY TO IMPLEMENT

This provides:
✅ Automatic invalidation on code changes
✅ No manual intervention required
✅ Future-proof for v3, v4, etc.
✅ Graceful degradation (old cache expires naturally)
✅ Zero breaking changes

**Next step:** Give this to Cursor AI to implement in your codebase.

