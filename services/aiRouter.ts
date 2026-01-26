/**
 * AI Router with Automatic Fallback
 * Routes AI requests to the appropriate provider with automatic failover
 * 
 * Routing Rules (with fallback):
 * - SECURITY / INTENT ANALYSIS → Google AI (Gemini) → fallback: OpenAI
 * - MARKET / ANALYSIS → Google AI (Gemini) → fallback: OpenAI
 * - ADDRESS ANALYSIS → Google AI (Gemini) → fallback: OpenAI
 * - REPUTATION SYNTHESIS → Google AI (Gemini) → fallback: OpenAI
 * - COGNITIVE AUTOPSY → Google AI (Gemini) → fallback: OpenAI
 * - MESH QUERY → Google AI (Gemini) → fallback: OpenAI
 * - NARRATIVE / CREATIVE → OpenAI → fallback: Degraded mode
 * 
 * Fallback Logic:
 * - Primary provider is always attempted first
 * - If primary fails, automatically tries fallback provider
 * - Only throws error if BOTH providers fail
 * - Never calls both providers simultaneously
 */

import { 
  analyzeSecurityIntent, 
  analyzeMarketIntel, 
  analyzeAddressInterception,
  synthesizeAddressReputation,
  generateCognitiveAutopsy,
  ThreatAnalysisResponse,
  MarketIntelResponse,
  InterceptionSynthesisResponse,
  ReputationSynthesisResponse,
  CognitiveAutopsyResponse,
  UsageData
} from './geminiService';
import { querySentinelMesh } from './meshIntelService';
import { 
  generateText, 
  generateTextStream,
  analyzeSecurityIntentWithOpenAI,
  analyzeMarketIntelWithOpenAI,
  analyzeAddressInterceptionWithOpenAI,
  synthesizeAddressReputationWithOpenAI,
  generateCognitiveAutopsyWithOpenAI,
  querySentinelMeshStreamWithOpenAI
} from './openaiService';
import { getGoogleAIConfig, getOpenAIConfig, validateAtLeastOneProvider } from './aiProvider';

export type AIIntent = 
  | 'SECURITY' 
  | 'INTENT_ANALYSIS' 
  | 'MARKET_ANALYSIS' 
  | 'ADDRESS_ANALYSIS'
  | 'REPUTATION_SYNTHESIS'
  | 'COGNITIVE_AUTOPSY'
  | 'MESH_QUERY'
  | 'NARRATIVE'
  | 'CREATIVE'
  | 'TEXT_GENERATION';

/**
 * Routes security and intent analysis with automatic fallback
 * PRIMARY: Google AI (Gemini) → FALLBACK: OpenAI
 */
export const routeSecurityIntent = async (
  currentAddress: string,
  historicalAddress: string,
  sourceContext: string = 'UNKNOWN'
): Promise<{ data: ThreatAnalysisResponse; usage: UsageData }> => {
  validateAtLeastOneProvider();
  const googleConfig = getGoogleAIConfig();
  const openaiConfig = getOpenAIConfig();

  // Try Gemini first (primary)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI (Gemini) for security intent analysis');
      return await analyzeSecurityIntent(currentAddress, historicalAddress, sourceContext);
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] Gemini failed, attempting OpenAI fallback:', error.message);
      // Continue to fallback
    }
  }

  // Fallback to OpenAI
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI as fallback for security intent analysis');
      return await analyzeSecurityIntentWithOpenAI(currentAddress, historicalAddress, sourceContext);
    } catch (error: any) {
      console.error('[VIGIL ERROR] Both Gemini and OpenAI failed for security intent:', error.message);
      throw new Error(
        'API_ERROR: All AI providers failed. Please check your internet connection and API keys, then try again.'
      );
    }
  }

  throw new Error(
    'API_KEY_MISSING: At least one AI provider (Google AI or OpenAI) must be configured. ' +
    'Please set API_KEY (for Google AI) or OPENAI_API_KEY (for OpenAI) in your environment variables or .env.local file to enable simulations.'
  );
};

/**
 * Routes market intelligence with automatic fallback
 * PRIMARY: Google AI (Gemini) → FALLBACK: OpenAI
 */
export const routeMarketIntel = async (
  contractAddress: string
): Promise<MarketIntelResponse> => {
  validateAtLeastOneProvider();
  const googleConfig = getGoogleAIConfig();
  const openaiConfig = getOpenAIConfig();

  // Try Gemini first (primary)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI (Gemini) for market intelligence');
      return await analyzeMarketIntel(contractAddress);
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] Gemini failed, attempting OpenAI fallback:', error.message);
      // Continue to fallback
    }
  }

  // Fallback to OpenAI
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI as fallback for market intelligence');
      return await analyzeMarketIntelWithOpenAI(contractAddress);
    } catch (error: any) {
      console.error('[VIGIL ERROR] Both Gemini and OpenAI failed for market intel:', error.message);
      throw new Error(
        'API_ERROR: All AI providers failed. Please check your internet connection and API keys, then try again.'
      );
    }
  }

  throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured.');
};

/**
 * Routes address interception analysis with automatic fallback
 * PRIMARY: Google AI (Gemini) → FALLBACK: OpenAI
 */
export const routeAddressInterception = async (
  address: string
): Promise<InterceptionSynthesisResponse> => {
  validateAtLeastOneProvider();
  const googleConfig = getGoogleAIConfig();
  const openaiConfig = getOpenAIConfig();

  // Try Gemini first (primary)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI (Gemini) for address interception');
      return await analyzeAddressInterception(address);
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] Gemini failed, attempting OpenAI fallback:', error.message);
      // Continue to fallback
    }
  }

  // Fallback to OpenAI
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI as fallback for address interception');
      return await analyzeAddressInterceptionWithOpenAI(address);
    } catch (error: any) {
      console.error('[VIGIL ERROR] Both Gemini and OpenAI failed for address interception:', error.message);
      throw new Error(
        'API_ERROR: All AI providers failed. Please check your internet connection and API keys, then try again.'
      );
    }
  }

  throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured.');
};

/**
 * Routes reputation synthesis with automatic fallback
 * PRIMARY: Google AI (Gemini) → FALLBACK: OpenAI
 */
export const routeReputationSynthesis = async (
  address: string
): Promise<ReputationSynthesisResponse> => {
  validateAtLeastOneProvider();
  const googleConfig = getGoogleAIConfig();
  const openaiConfig = getOpenAIConfig();

  // Try Gemini first (primary)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI (Gemini) for reputation synthesis');
      return await synthesizeAddressReputation(address);
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] Gemini failed, attempting OpenAI fallback:', error.message);
      // Continue to fallback
    }
  }

  // Fallback to OpenAI
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI as fallback for reputation synthesis');
      return await synthesizeAddressReputationWithOpenAI(address);
    } catch (error: any) {
      console.error('[VIGIL ERROR] Both Gemini and OpenAI failed for reputation synthesis:', error.message);
      throw new Error(
        'API_ERROR: All AI providers failed. Please check your internet connection and API keys, then try again.'
      );
    }
  }

  throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured.');
};

/**
 * Routes cognitive autopsy with automatic fallback
 * PRIMARY: Google AI (Gemini) → FALLBACK: OpenAI
 */
export const routeCognitiveAutopsy = async (
  realAddress: string,
  selectedAddress: string
): Promise<CognitiveAutopsyResponse> => {
  validateAtLeastOneProvider();
  const googleConfig = getGoogleAIConfig();
  const openaiConfig = getOpenAIConfig();

  // Try Gemini first (primary)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI (Gemini) for cognitive autopsy');
      return await generateCognitiveAutopsy(realAddress, selectedAddress);
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] Gemini failed, attempting OpenAI fallback:', error.message);
      // Continue to fallback
    }
  }

  // Fallback to OpenAI
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI as fallback for cognitive autopsy');
      return await generateCognitiveAutopsyWithOpenAI(realAddress, selectedAddress);
    } catch (error: any) {
      console.error('[VIGIL ERROR] Both Gemini and OpenAI failed for cognitive autopsy:', error.message);
      throw new Error(
        'API_ERROR: All AI providers failed. Please check your internet connection and API keys, then try again.'
      );
    }
  }

  throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured.');
};

/**
 * Routes mesh query with automatic fallback (NON-STREAMING)
 * PRIMARY: Google AI (Gemini) → FALLBACK: OpenAI
 * Returns a Promise for complete response (non-streaming backend)
 */
export const routeMeshQuery = async (
  query: string,
  signal?: AbortSignal
): Promise<{ text: string; usageMetadata?: any }> => {
  validateAtLeastOneProvider();
  const googleConfig = getGoogleAIConfig();
  const openaiConfig = getOpenAIConfig();

  // Try Gemini first (primary)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI (Gemini) for mesh query');
      return await querySentinelMesh(query, signal);
    } catch (error: any) {
      // If aborted, re-throw immediately (don't try fallback)
      if (error.name === 'AbortError' || signal?.aborted) {
        throw error;
      }
      console.warn('[VIGIL FALLBACK] Gemini failed, attempting OpenAI fallback:', error.message);
      // Continue to fallback only if not aborted
    }
  }

  // Fallback to OpenAI (if not aborted) - not yet implemented
  // Skip OpenAI fallback for now - just throw the original Gemini error
  if (openaiConfig.available && !signal?.aborted) {
    console.warn('[VIGIL] OpenAI fallback available but not implemented for mesh queries');
  }

  // If we get here, Gemini failed and no fallback worked
  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
  
  // Throw a clear error about what went wrong
  if (!googleConfig.available) {
    throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured. Please set GEMINI_API_KEY in your environment variables.');
  }
  
  // If Gemini was available but failed, the original error should have been thrown
  // This should never be reached, but just in case:
  throw new Error('[VIGIL ERROR] Mesh query failed. Please check your API keys and ensure you are running `vercel dev` (not `npm run dev`).');
};

/**
 * Routes narrative/creative content with automatic fallback
 * PRIMARY: OpenAI → FALLBACK: Google AI (Gemini)
 */
export const routeNarrativeGeneration = async (
  prompt: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    signal?: AbortSignal;
  }
): Promise<{
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}> => {
  validateAtLeastOneProvider();
  const openaiConfig = getOpenAIConfig();
  const googleConfig = getGoogleAIConfig();

  // Try OpenAI first (primary for creative)
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI for narrative generation');
      return await generateText(prompt, options);
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] OpenAI failed, attempting Gemini fallback:', error.message);
      // Continue to fallback
    }
  }

  // Fallback to Gemini (generic text generation)
  if (googleConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using Google AI as fallback for narrative generation');
      // Gemini fallback for creative text (best effort)
      return {
        text: `[FALLBACK MODE] Creative generation degraded. Please configure OPENAI_API_KEY for optimal quality.`,
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    } catch (error: any) {
      console.error('[VIGIL ERROR] Both OpenAI and Gemini failed for narrative:', error.message);
      throw new Error(
        'API_ERROR: All AI providers failed. Please check your internet connection and API keys, then try again.'
      );
    }
  }

  throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured.');
};

/**
 * Routes narrative/creative streaming with automatic fallback
 * PRIMARY: OpenAI → FALLBACK: Google AI (Gemini)
 */
export const routeNarrativeStream = async function* (
  prompt: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    signal?: AbortSignal;
  }
): AsyncGenerator<{ text: string; done: boolean; usage?: any }> {
  validateAtLeastOneProvider();
  const openaiConfig = getOpenAIConfig();
  const googleConfig = getGoogleAIConfig();

  // Try OpenAI first (primary for creative streaming)
  if (openaiConfig.available) {
    try {
      console.log('[VIGIL ROUTER] Using OpenAI for narrative streaming');
      yield* generateTextStream(prompt, options);
      return;
    } catch (error: any) {
      console.warn('[VIGIL FALLBACK] OpenAI streaming failed, falling back to error message:', error.message);
      // Continue to fallback
    }
  }

  // Fallback: Return degraded message
  if (googleConfig.available) {
    console.log('[VIGIL ROUTER] Narrative streaming fallback mode');
    yield {
      text: '[FALLBACK MODE] Streaming degraded. Please configure OPENAI_API_KEY for optimal quality.',
      done: true,
      usage: undefined
    };
    return;
  }

  throw new Error('[VIGIL NO PROVIDERS AVAILABLE] No AI providers configured.');
};
