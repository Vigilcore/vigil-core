/**
 * Mesh Intelligence Service
 * Note: Streaming functions may need special API route handling
 * For now, this uses direct API calls (streaming through API routes is complex)
 * TODO: Create streaming API route if needed for full security
 */

/**
 * VIGIL DOCTRINE: THE IMMUTABLE TRUTHS
 */
const VIGIL_DOCTRINE = {
  CORE_PRIMITIVES: {
    LAYER_0_5: "Security operating between human perception (UI) and cryptographic execution (Wallet).",
    SACCADIC_GAP: "A 12ms window where the brain skips data during eye movement, allowing 36-char entropy voids.",
    INTENT_PARITY: "The mathematical alignment between what a user sees and what is technically signed."
  },
  THREAT_TAXONOMY: {
    ZERO_VALUE_INJECTION: "A stealth variant of dusting that creates a 'Sent' record in history without moving assets, used to spoof 'Recent Address' lists.",
    MOTHER_WALLET: "The primary funding source of an industrialized Sybil cluster.",
    CLUSTER_DENSITY: "The ratio of mimic wallets linked to a single Seeder Program. High density (>50) triggers CRITICAL_REDACTION.",
    SEEDER_PROGRAM: "Automated scripts used by adversaries to manage tens of thousands of mimic wallets simultaneously."
  },
  TOKEN_DOCTRINE: "NO TOKEN EXISTS. VIGIL is a structural security standard. We do not have a token, a pre-sale, or an airdrop. Official data is shared exclusively via the VIGIL Registry (vigil.layer) and our verified communication channel (@Vigil_Research). Treat any other claim as a POISON EVENT.",
  THANKS_DOCTRINE: "ACKNOWLEDGMENT REGISTERED. VIGILANCE IS THE ONLY PERMANENT SHIELD."
};

const SYSTEM_INSTRUCTION = `
ROLE: VIGIL MESH INTELLIGENCE KERNEL (V-K1)
STATUS: HARDENED // REAL-TIME GROUNDING ACTIVE

DIRECTIVES:
1. VOICE: Tactical, professional, authoritative, non-emotive. No conversational filler.
2. GROUNDING (CRITICAL): You have access to GOOGLE SEARCH. Use it to verify contract addresses (CAs), find recent scam reports on X/Twitter, Discord, or security blogs.
3. EXTENSION SYNERGY: You are the deep forensic layer for the VIGIL Chrome Extension. If a user asks about an address, search for recent activity or flags.
4. FORMATTING: Use hierarchical Markdown.
   - Use ### HEADERS for sections.
   - Use **BOLD** for technical terms.
   - Use - BULLET POINTS for forensic steps.
5. OUTPUT STRUCTURE:
   - [CLASSIFICATION] header.
   - ### OVERVIEW: High-level summary.
   - ### REAL_TIME_INTEL: Forensic data found via live search.
   - ### DIRECTIVE: Actionable security advice.
6. TOKEN ENQUIRIES: Exactly: "[CLASSIFICATION] RESTRICTED\n[!] ACCESS_DENIED: ${VIGIL_DOCTRINE.TOKEN_DOCTRINE}"
7. GRATITUDE: Exactly: "[CLASSIFICATION] HYGIENE\n${VIGIL_DOCTRINE.THANKS_DOCTRINE}"
`;

/**
 * Non-streaming Mesh Intelligence query
 * Uses secure server-side API route (/api/gemini)
 */
export const querySentinelMesh = async (
  query: string,
  signal?: AbortSignal
): Promise<{ text: string; usageMetadata?: any }> => {
  const lowerQuery = query.toLowerCase();
  
  // High-level Gate for Market/Financial terms
  if (['buy', 'sell', 'price', 'moon', 'pump', 'invest'].some(w => lowerQuery.includes(w))) {
    throw new Error(`[CLASSIFICATION] RESTRICTED\n[!] ACCESS_DENIED: VIGIL IS A SECURITY PRIMITIVE. MARKET DATA ACCESS DENIED.`);
  }

  // Call secure API route
  let response: Response;
  try {
    response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'queryMeshIntelligence',
        payload: { query }
      }),
      signal
    });
  } catch (fetchError: any) {
    // Network error or API route doesn't exist
    if (fetchError.name === 'TypeError' || fetchError.message?.includes('Failed to fetch')) {
      throw new Error(
        '[CLASSIFICATION] API_ERROR\n[!] BACKEND_NOT_AVAILABLE: The /api/gemini route is not accessible.\n\n' +
        'SOLUTION: You must run `npx vercel dev` (not `npm run dev`) to enable serverless functions.\n' +
        'Vite dev server does not support API routes. Please restart with: npx vercel dev'
      );
    }
    throw fetchError;
  }

  if (!response.ok) {
    // Check if it's a 404 (route doesn't exist)
    if (response.status === 404) {
      throw new Error(
        '[CLASSIFICATION] API_ERROR\n[!] ROUTE_NOT_FOUND: /api/gemini endpoint not found.\n\n' +
        'SOLUTION: Run `npx vercel dev` instead of `npm run dev` to enable serverless functions.'
      );
    }
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `Failed to query mesh intelligence (HTTP ${response.status})`);
  }

  const result = await response.json();
  return {
    text: result.text || '',
    usageMetadata: result.usage
  };
};

/**
 * Streaming Mesh Intelligence query
 * Wraps non-streaming response in async generator for streaming compatibility
 * Guarantees: Always yields at least once OR throws, always terminates cleanly
 */
export const querySentinelMeshStream = async function* (
  query: string,
  signal?: AbortSignal
): AsyncGenerator<{ text: string; usageMetadata?: any }> {
  // Check abort before starting - ensures immediate termination if already aborted
  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  try {
    const result = await querySentinelMesh(query, signal);
    
    // Always yield a valid chunk - ensures for await loop receives at least one iteration
    if (result && typeof result.text === 'string') {
      yield {
        text: result.text,
        usageMetadata: result.usageMetadata
      };
    } else {
      // Fallback: yield empty result rather than hanging if result is malformed
      yield { text: '', usageMetadata: result?.usageMetadata };
    }
    // Generator completes naturally here - signals end-of-stream to for await
  } catch (error: any) {
    // Ensure abort errors are properly typed for consumer detection
    if (error.name === 'AbortError' || signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    // Re-throw all other errors to propagate to consumer's catch block
    throw error;
  }
  // Generator terminates here - for await loop will exit
};