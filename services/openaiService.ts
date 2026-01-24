/**
 * OpenAI Service - Client-side wrapper for secure API routes
 * All API calls are proxied through /api/openai serverless function
 * API keys are kept secure on the server side
 */

import type {
  ThreatAnalysisResponse,
  MarketIntelResponse,
  InterceptionSynthesisResponse,
  ReputationSynthesisResponse,
  CognitiveAutopsyResponse,
  UsageData
} from './geminiService';

/**
 * FALLBACK SECURITY ANALYSIS FUNCTIONS
 * These mirror Gemini's structured analysis but use OpenAI's JSON mode
 */

/**
 * Security Intent Analysis (Fallback for Gemini)
 */
export const analyzeSecurityIntentWithOpenAI = async (
  currentAddress: string,
  historicalAddress: string,
  sourceContext: string = 'UNKNOWN'
): Promise<{ data: ThreatAnalysisResponse; usage: UsageData }> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'analyzeSecurityIntent',
      payload: { currentAddress, historicalAddress, sourceContext }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'OpenAI Security Analysis Error');
  }

  return await response.json();
};

/**
 * Market Intelligence Analysis (Fallback for Gemini)
 */
export const analyzeMarketIntelWithOpenAI = async (ca: string): Promise<MarketIntelResponse> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'analyzeMarketIntel',
      payload: { contractAddress: ca }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'OpenAI Market Intel Error');
  }

  return await response.json();
};

/**
 * Address Interception Analysis (Fallback for Gemini)
 */
export const analyzeAddressInterceptionWithOpenAI = async (
  address: string
): Promise<InterceptionSynthesisResponse> => {
  // Call secure API route instead of direct API call
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'analyzeAddressInterception',
        payload: { address }
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error: any) {
    return {
      verdict: 'SUSPICIOUS',
      confidence: 50,
      clusterMatch: 'FALLBACK_MODE',
      threatLabel: 'SCAN_DEGRADED',
      telemetry: ['OpenAI fallback active', error.message]
    };
  }
};

/**
 * Reputation Synthesis (Fallback for Gemini)
 */
export const synthesizeAddressReputationWithOpenAI = async (
  address: string
): Promise<ReputationSynthesisResponse> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'synthesizeAddressReputation',
      payload: { address }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'OpenAI Reputation Error');
  }

  return await response.json();
};

/**
 * Cognitive Autopsy (Fallback for Gemini)
 */
export const generateCognitiveAutopsyWithOpenAI = async (
  real: string,
  selected: string
): Promise<CognitiveAutopsyResponse> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'generateCognitiveAutopsy',
      payload: { real, selected }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'OpenAI Cognitive Autopsy Error');
  }

  return await response.json();
};

/**
 * Mesh Query Streaming (Fallback for Gemini)
 * NOTE: Streaming requires special API route implementation
 * TODO: Create /api/openai/stream endpoint for secure streaming
 */
export const querySentinelMeshStreamWithOpenAI = async function* (
  query: string,
  signal?: AbortSignal
): AsyncGenerator<{ text: string; usageMetadata?: any }> {
  // TODO: Implement streaming API route
  // For now, this function needs API route with streaming support
  throw new Error('Streaming not yet fully secured - API route with streaming needed');
};

/**
 * CREATIVE CONTENT FUNCTIONS (Primary use case for OpenAI)
 */

/**
 * Generates text content using OpenAI
 */
export const generateText = async (
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
  // Call secure API route instead of direct API call
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'generateText',
        payload: {
          prompt,
          model: options?.model,
          maxTokens: options?.maxTokens,
          temperature: options?.temperature
        }
      }),
      signal: options?.signal
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'OpenAI API error');
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Generates streaming text content using OpenAI
 * NOTE: Streaming requires special API route implementation
 * TODO: Create /api/openai/stream endpoint for secure streaming
 */
export const generateTextStream = async function* (
  prompt: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    signal?: AbortSignal;
  }
): AsyncGenerator<{ text: string; done: boolean; usage?: any }> {
  // TODO: Implement streaming API route
  // For now, this function needs API route with streaming support
  throw new Error('Streaming not yet fully secured - API route with streaming needed');
};
