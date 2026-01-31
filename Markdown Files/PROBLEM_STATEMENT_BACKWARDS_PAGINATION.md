# PROBLEM STATEMENT: Solana Backwards Pagination Not Working

## OBJECTIVE
Implement backwards pagination for Solana's `getSignaturesForAddress` RPC method to find the oldest transaction for a wallet address. The goal is to calculate the wallet's true age (e.g., "1 year 11 days" instead of "1 month").

## CURRENT IMPLEMENTATION

### Architecture
- **Frontend**: React/TypeScript calling `heliusService.ts`
- **Backend**: Vercel serverless function `/api/helius.ts` (proxy)
- **API**: Helius RPC endpoint (`https://mainnet.helius-rpc.com/?api-key=...`)
- **Method**: `getSignaturesForAddress` with `before` parameter for pagination

### Code Flow

1. **Client calls `getAddressTelemetry(address)`** in `heliusService.ts`
2. **RPC call structure**:
   ```typescript
   const fetchSigsPage = async (before?: string, limit: number = 100): Promise<SigRow[]> => {
     const cfg: any = { limit };
     if (before) cfg.before = before;
     const result = await heliusRpc('getSignaturesForAddress', [address, cfg]);
     return Array.isArray(result) ? result : [];
   };
   ```

3. **RPC proxy** (`/api/helius.ts`):
   ```typescript
   // Sends JSON-RPC request:
   {
     jsonrpc: '2.0',
     id: 'vigil-helius-proxy',
     method: 'getSignaturesForAddress',
     params: [address, { limit: 1000, before: cursorSignature }]
   }
   ```

4. **Pagination loop**:
   ```typescript
   while (discoveryCallCount < MAX_DISCOVERY_CALLS) {
     const batch = await fetchSigsPage(before, 1000);
     // Process batch...
     // Set cursor: before = batch[batch.length - 1].signature;
   }
   ```

## PROBLEM SYMPTOMS

### Console Logs Show:
```
[VIGIL DEBUG] Call 1: received 1000 raw signatures
[VIGIL DEBUG] Call 1: age range 6 min → 1 day (2026-01-29 → 2026-01-28)
[VIGIL DEBUG] Call 1: cursor set to last in raw batch (1 day ago, sig: 3G6CPrMaMxwbDtE1REuz...)

[VIGIL DEBUG] Call 2: received 1000 raw signatures
[VIGIL DEBUG] Call 2: age range 1 day → 1 day (2026-01-28 → 2026-01-28)  ← SAME RANGE!
[VIGIL DEBUG] Call 2: cursor set to last in raw batch (1 day ago, sig: 45egfqNhNbG7ELdfGevV...)

[VIGIL DEBUG] Call 3: received 0 raw signatures  ← EMPTY!
[VIGIL] Empty batch on call 3 (1 consecutive)

[VIGIL DEBUG] Call 4: received 0 raw signatures  ← EMPTY!
[VIGIL] Empty batch on call 4 (2 consecutive)

[VIGIL DEBUG] Call 5: received 0 raw signatures  ← EMPTY!
[VIGIL] Empty batch on call 5 (3 consecutive)
[VIGIL] Stopping: 3 consecutive empty batches
```

### Results:
- **Expected**: Find transactions from January 18, 2025 (1 year 11 days ago)
- **Actual**: Only finds transactions from December 18, 2025 (1 month ago)
- **Missing**: ~11 months of transaction history

## EXPECTED BEHAVIOR

### Solana `getSignaturesForAddress` API:
- **Returns**: Signatures in **reverse chronological order** (newest first)
- **`before` parameter**: Should return signatures **older than** (before) the specified signature
- **Pagination**: Using the **last signature** from previous batch as `before` should return older transactions

### Expected Flow:
```
Call 1: before=undefined → Returns newest 1000 signatures (Jan 29 → Jan 28)
Call 2: before=lastSigFromCall1 → Returns next 1000 signatures (Jan 28 → Jan 27)
Call 3: before=lastSigFromCall2 → Returns next 1000 signatures (Jan 27 → Jan 26)
...
Call 10: before=lastSigFromCall9 → Returns 245 signatures (Jan 18, 2025) ← OLDEST
```

## ACTUAL BEHAVIOR

### What's Happening:
1. **Call 1**: Successfully gets 1000 signatures (6 min → 1 day ago)
2. **Call 2**: Gets 1000 signatures but **SAME age range** (1 day → 1 day) ← **DUPLICATE DATA**
3. **Call 3-5**: Returns **0 signatures** (empty batches)
4. **Result**: Stops after 4 calls, only finds 1 month old transactions

### Key Observations:
- Call 2 shows **identical age range** as Call 1 (suggests duplicate data or cursor not working)
- Cursor **is changing** (different signature: `3G6CPr...` → `45egfq...`)
- But next call returns **0 signatures** (cursor might be invalid or API rejecting it)
- Wallet has **9,245 total transactions** but only **2,000 fetched** (should need ~10 calls)

## CODE DETAILS

### Current Cursor Logic:
```typescript
// After processing batch:
const lastSigInRawBatch = batch[batch.length - 1];  // Last item in array
before = lastSigInRawBatch.signature;  // Use as cursor for next call
```

### Assumptions Made:
1. Solana returns signatures in reverse chronological order (newest first)
2. Last item in array = oldest transaction in that batch
3. Using last signature as `before` cursor should return older transactions
4. API accepts signature string directly as `before` parameter

## WHAT WE'VE TRIED

1. ✅ Using last signature from raw batch (not sorted)
2. ✅ Validating cursor exists in batch
3. ✅ Checking cursor changes between calls
4. ✅ Handling empty batches gracefully
5. ✅ Adding comprehensive logging
6. ❌ Still getting duplicate data on Call 2
7. ❌ Still getting empty batches on Call 3+

## KEY QUESTIONS FOR CHATGPT

1. **Is the `before` parameter format correct?**
   - Should it be just the signature string?
   - Or does it need additional formatting/encoding?
   - Does Helius RPC require a different format than native Solana RPC?

2. **Is the cursor signature correct?**
   - Should we use the **last signature** in the array (oldest in batch)?
   - Or should we use a different signature from the batch?
   - Does the signature need to be from a specific position?

3. **Is the API call structure correct?**
   - Current: `{ limit: 1000, before: signatureString }`
   - Should it be: `{ limit: 1000, before: { signature: signatureString } }`?
   - Or some other format?

4. **Why is Call 2 returning duplicate data?**
   - Is the cursor being ignored?
   - Is the API returning cached data?
   - Is the signature format wrong?

5. **Why are subsequent calls returning empty?**
   - Is the cursor signature invalid?
   - Is there a rate limit being hit?
   - Is the API rejecting the cursor format?

6. **Should we use a different pagination approach?**
   - Use `until` parameter instead of `before`?
   - Use block height/slot instead of signature?
   - Fetch all signatures first, then sort?

## API DOCUMENTATION NEEDED

- **Helius RPC `getSignaturesForAddress` documentation**
- **Exact format for `before` parameter**
- **Expected response structure**
- **Pagination best practices**
- **Known limitations or gotchas**

## TEST DATA

- **Address**: `2myVjgs3288WTH8mc3mgNyjuJfDfYkA7qdcJb9LQyoTx`
- **Total Transactions**: 9,245 (per Solscan)
- **First Transaction**: January 18, 2025 (1 year 11 days ago)
- **Current Age Shown**: 1 month (WRONG)
- **Expected Age**: 1 year 11 days (or ">1 year" if we stop at 1-year threshold)

## ENVIRONMENT

- **Framework**: React 19 + TypeScript
- **Deployment**: Vercel serverless functions
- **API Provider**: Helius (Enhanced Solana API)
- **RPC Endpoint**: `https://mainnet.helius-rpc.com/?api-key=...`
- **Method**: JSON-RPC 2.0

## SUCCESS CRITERIA

1. ✅ Pagination continues through all batches (not stopping at Call 2)
2. ✅ Each call returns progressively older transactions
3. ✅ Finds transactions from January 2025 (1+ year ago)
4. ✅ Correctly calculates wallet age as ">1 year" or exact age if <1 year
5. ✅ Handles wallets of any age (1 day to 10+ years)

---

**Please provide a working solution with:**
- Correct cursor format for `before` parameter
- Proper pagination logic
- Explanation of why current approach fails
- Code examples if possible
