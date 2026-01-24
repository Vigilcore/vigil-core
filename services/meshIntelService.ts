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

export const querySentinelMeshStream = async function* (
  query: string,
  signal?: AbortSignal
): AsyncGenerator<{ text: string; usageMetadata?: any }> {
  // NOTE: Streaming requires direct API call for now
  // TODO: Implement streaming API route for full security
  // For now, this will need API key in client (temporary solution)
  
  const lowerQuery = query.toLowerCase();
  
  // High-level Gate for Market/Financial terms
  if (['buy', 'sell', 'price', 'moon', 'pump', 'invest'].some(w => lowerQuery.includes(w))) {
    throw new Error(`[CLASSIFICATION] RESTRICTED\n[!] ACCESS_DENIED: VIGIL IS A SECURITY PRIMITIVE. MARKET DATA ACCESS DENIED.`);
  }

  // Call API route for streaming (if we implement it) or use direct call
  // For now, using direct call - this needs to be secured with API route later
  try {
    // Try API route first (if streaming endpoint exists)
    const response = await fetch('/api/gemini/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal
    });

    if (response.ok && response.body) {
      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              yield { text: data.text || '', usageMetadata: data.usageMetadata };
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
      return;
    }
  } catch (e) {
    // Fallback: API route not available, use direct call (temporary)
    console.warn('Streaming API route not available, using direct call');
  }

  // Fallback to direct API call (TEMPORARY - needs to be secured)
  // This requires API key in client - should be moved to server-side streaming route
  throw new Error('Streaming not yet fully secured - API route needed');
};