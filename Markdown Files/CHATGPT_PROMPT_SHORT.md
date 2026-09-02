# ChatGPT Prompt: Fix Helius API - Find Oldest Inbound Native SOL Transfer

## Problem
I'm using Helius Enhanced Solana API to find the **oldest inbound native SOL transfer** to a wallet address to calculate its age. The code is **failing** - showing "3 min" instead of "7 days".

## Current Approach
1. Paginate `getSignaturesForAddress` (up to 5,000 signatures)
2. Parse transactions using Helius `/transactions/` endpoint (batches of 100)
3. Try to find oldest transaction where address **received** native SOL

## What's Failing
I'm checking 4 different data structures but **none work**:
- `tx.nativeTransfers[]` - not finding inbound transfers
- `tx.events[].nativeTransfers[]` - not finding inbound transfers  
- `tx.accountData[]` (balance changes) - can't reliably identify sender
- `tx.accountKeys[]` + instruction parsing - not working

## Reference Data (Solscan)
- **Funded by**: Gate.io
- **Block Time**: Jan 21, 2026 00:26:12 UTC
- **Age**: 7 days (not 3 minutes)

## What I Need
1. **Exact structure** of Helius `/transactions/` response for native SOL transfers
2. **Working code** to identify inbound native transfers in Helius transaction data
3. **How to get sender address** (`fromUserAccount`) from Helius transaction

## Helius API Details
- **RPC**: `https://mainnet.helius-rpc.com/?api-key={KEY}` (getSignaturesForAddress)
- **Enhanced API**: `https://api-mainnet.helius-rpc.com/v0/transactions/?api-key={KEY}` (POST with `{ transactions: [signatures] }`)

## Code Context
```typescript
// Current parsing attempt
const parsed = await fetch('/api/helius', {
  method: 'POST',
  body: JSON.stringify({
    endpoint: '/transactions/',
    method: 'POST',
    payload: { transactions: sigs }
  })
});

// What structure does `parsed[0]` have for a native SOL transfer?
// How do I find: toUserAccount, fromUserAccount, amount?
```

## Questions
1. What is the **exact field path** in Helius transaction response for inbound native transfers?
2. How do I identify the **sender address** of a native transfer?
3. Is there a **better Helius endpoint** to get first funding transaction?
4. Can you provide **working TypeScript code** that correctly finds the oldest inbound native transfer?

**Constraints**: Helius API only, server-side, must handle pagination, 9-second timeout.
