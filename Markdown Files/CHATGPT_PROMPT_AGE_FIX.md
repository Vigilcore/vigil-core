# ChatGPT Prompt: Fix Solana Address Age Calculation Using Helius API

## Problem Statement

I'm building a Solana security tool (VIGIL) that needs to calculate the **exact age of a Solana wallet address** by finding the **oldest inbound native SOL transfer** (the first time the wallet received funds). The age calculation is currently **failing** - it shows incorrect ages (e.g., "3 min" instead of "7 days").

## Current Implementation

### Tech Stack
- **Language**: TypeScript/React
- **API**: Helius Enhanced Solana API (server-side proxy)
- **RPC**: Helius RPC (`getSignaturesForAddress`, `getBalance`, etc.)
- **Transaction Parsing**: Helius `/transactions/` Enhanced API endpoint

### Current Code Flow

1. **Pagination**: Uses `getSignaturesForAddress` RPC method to paginate through up to 5,000 signatures (50 pages × 100 per page)
2. **Signature Collection**: Collects all signatures with `blockTime` values, sorts by `blockTime` (oldest first)
3. **Transaction Parsing**: Parses transactions in batches of 100 using Helius `/transactions/` endpoint
4. **Inbound Transfer Detection**: Tries to find the oldest transaction where the address **received** native SOL (not sent)

### Current Detection Methods (All Failing)

The code attempts 4 different methods to detect inbound native transfers:

**Method 1**: Check `tx.nativeTransfers` array
```typescript
const nativeTransfers = Array.isArray(tx?.nativeTransfers) ? tx.nativeTransfers : [];
inbound = nativeTransfers.find((t: any) => 
  t?.toUserAccount === address && 
  typeof t?.amount === 'number' && 
  t.amount > 0
);
```

**Method 2**: Check `tx.events[].nativeTransfers`
```typescript
if (Array.isArray(tx?.events)) {
  for (const event of tx.events) {
    if (Array.isArray(event?.nativeTransfers)) {
      inbound = event.nativeTransfers.find(...)
    }
  }
}
```

**Method 3**: Check account balance changes (`tx.accountData`)
```typescript
if (account?.account === address && 
    account.postBalance > account.preBalance) {
  // Try to find sender from instructions
}
```

**Method 4**: Check account keys and instruction indexes
```typescript
if (Array.isArray(tx?.accountKeys)) {
  // Parse account keys and instruction indexes
}
```

## What's Not Working

1. **Age is incorrect**: Shows "3 min" instead of "7 days" (based on Solscan showing the wallet was funded on Jan 21, 2026)
2. **Inbound transfer not found**: None of the 4 detection methods are successfully identifying the first inbound native transfer
3. **Fallback is wrong**: Falls back to using the oldest transaction's `blockTime`, but this might be an outbound transfer or program interaction, not the first funding

## Expected Behavior

- **Input**: Solana address (e.g., `EmDewJpfQaxWqxthX1FUyBCCPNGt8Ac5ek4M4pnGTgxC`)
- **Expected Output**: 
  - Address Age: "7 days" (or "1 week" or exact time since first funding)
  - Funded By: Wallet address that sent the first native SOL transfer
  - Block Time: The exact timestamp of the first inbound native transfer

## Reference: Solscan Shows Correct Data

According to Solscan (solscan.io), the wallet shows:
- **Funded by**: `Gate.io` (exchange)
- **Block Time**: `00:26:12 Jan 21, 2026 (UTC)`
- **TxHash**: `Atq527WMJoqoLo...`

This confirms the wallet is **7 days old** (as of Jan 28, 2026), not 3 minutes.

## Helius API Details

### Endpoints Used

1. **RPC Endpoint** (for signatures):
   - URL: `https://mainnet.helius-rpc.com/?api-key={KEY}`
   - Method: `getSignaturesForAddress`
   - Returns: Array of `{ signature: string, blockTime: number | null }`

2. **Enhanced API** (for transaction parsing):
   - URL: `https://api-mainnet.helius-rpc.com/v0/transactions/?api-key={KEY}`
   - Method: POST
   - Payload: `{ transactions: string[] }` (array of signatures)
   - Returns: Array of parsed transaction objects

### Current API Call Structure

```typescript
// Server-side proxy route: /api/helius
const heliusParseTransactions = async (sigs: string[]) => {
  const res = await fetch('/api/helius', {
    method: 'POST',
    body: JSON.stringify({
      endpoint: '/transactions/',
      method: 'POST',
      payload: { transactions: sigs }
    })
  });
  return await res.json(); // Returns array of transaction objects
};
```

## What I Need Help With

1. **Correct Helius Response Structure**: What is the **actual structure** of the transaction object returned by Helius `/transactions/` endpoint? Specifically:
   - Where is the inbound native transfer data located?
   - What fields indicate a native SOL transfer TO the address?
   - How do I identify the sender (`fromUserAccount`) of a native transfer?

2. **Better Detection Method**: Provide a **working code example** that correctly identifies the oldest inbound native transfer from Helius transaction data.

3. **Alternative Approach**: If Helius doesn't provide this data in a parseable format, suggest:
   - Alternative Helius endpoints that might work better
   - A different approach using RPC methods only
   - Whether I need to parse raw transaction data differently

4. **Debugging Strategy**: How can I inspect the actual Helius API response to understand what data structure I'm working with?

## Constraints

- Must use **Helius API only** (no Solscan API)
- Must work **server-side** (API keys cannot be exposed to client)
- Must handle **pagination** (wallets can have thousands of transactions)
- Must be **efficient** (timeout is 9 seconds, parsing 2000+ transactions)

## Code Context

The function signature:
```typescript
export async function getAddressTelemetry(address: string): Promise<RealtimeTelemetry>
```

Returns:
```typescript
{
  addressAge?: string; // e.g., "7 days" or "1 year 2 months"
  fundedBy?: string;   // Wallet address that funded this address
  // ... other fields
}
```

## Questions for ChatGPT

1. **What is the exact structure of a Helius `/transactions/` response for a native SOL transfer?**
2. **How do I correctly identify an inbound native transfer in Helius transaction data?**
3. **What field contains the sender address (`fromUserAccount`) for a native transfer?**
4. **Is there a better Helius endpoint or method to get the first funding transaction?**
5. **Can you provide working TypeScript code that correctly parses Helius transaction data to find the oldest inbound native transfer?**

## Additional Context

- The code successfully paginates and collects signatures
- The code successfully parses transactions (gets response from Helius)
- The issue is specifically in **identifying which transaction is an inbound native transfer**
- Solscan can show this data correctly, so the blockchain data exists - I just need to parse it correctly from Helius

---

**Please provide:**
1. The correct Helius transaction data structure
2. Working code to detect inbound native transfers
3. A solution that finds the oldest inbound transfer correctly
