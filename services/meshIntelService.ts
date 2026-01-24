import { GoogleGenAI } from "@google/genai";

/**
 * Validates that API_KEY is configured.
 * Throws a clear error if missing to prevent silent failures.
 * Explicitly rejects undefined, "undefined", "null", empty strings, and placeholder values.
 */
const validateApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  const placeholderPatterns = [
    'placeholder',
    'your_api_key',
    'your_actual_api_key',
    'example',
    'demo',
    'test'
  ];
  
  if (!apiKey || apiKey === 'undefined' || apiKey === 'null' || apiKey.trim() === '') {
    throw new Error(
      '[VIGIL API KEY MISSING] The API_KEY environment variable is not set. ' +
      'Please configure your Google AI API key in your environment variables or .env file. ' +
      'The application requires a valid API key to function.'
    );
  }
  
  const lowerKey = apiKey.toLowerCase();
  if (placeholderPatterns.some(pattern => lowerKey.includes(pattern))) {
    throw new Error(
      '[VIGIL API KEY INVALID] The API_KEY appears to be a placeholder value. ' +
      'Please replace it with your actual Google AI API key from https://aistudio.google.com/apikey'
    );
  }
  
  return apiKey;
};

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
  const apiKey = validateApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const lowerQuery = query.toLowerCase();
  
  // High-level Gate for Market/Financial terms
  if (['buy', 'sell', 'price', 'moon', 'pump', 'invest'].some(w => lowerQuery.includes(w))) {
    throw new Error(`[CLASSIFICATION] RESTRICTED\n[!] ACCESS_DENIED: VIGIL IS A SECURITY PRIMITIVE. MARKET DATA ACCESS DENIED.`);
  }

  const stream = await ai.models.generateContentStream({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
      temperature: 0.1,
    }
  }, { signal });

  // Transform Gemini's response format to our expected format
  for await (const chunk of stream) {
    yield {
      text: chunk.text || '',
      usageMetadata: chunk.usageMetadata
    };
  }
};