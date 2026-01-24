import OpenAI from 'openai';
import { getOpenAIConfig } from './aiProvider';
import type {
  ThreatAnalysisResponse,
  MarketIntelResponse,
  InterceptionSynthesisResponse,
  ReputationSynthesisResponse,
  CognitiveAutopsyResponse,
  UsageData
} from './geminiService';

/**
 * OpenAI Service
 * Handles OpenAI API interactions for both creative content and security analysis (fallback)
 */

/**
 * Validates OpenAI API key and returns configured client
 */
const getOpenAIClient = (): OpenAI => {
  const config = getOpenAIConfig();
  if (!config.available) {
    throw new Error(
      '[VIGIL OPENAI API KEY MISSING] The OPENAI_API_KEY environment variable is not set. ' +
      'Please configure your OpenAI API key in your environment variables or .env.local file.'
    );
  }
  return new OpenAI({ apiKey: config.apiKey, dangerouslyAllowBrowser: true });
};

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
  const client = getOpenAIClient();
  const start = Date.now();

  const systemPrompt = `You are a blockchain security analyst. Analyze the following addresses and return a JSON object with this exact structure:
{
  "riskScore": number (0-100),
  "threatCategory": string,
  "intentState": "INFO" | "CAUTION" | "TRUSTED" | "POISON" | "NEW" | "SPOOF" | "MARKET_INTEL" | "ZERO_VALUE_SPOOF",
  "similarityIndex": number (0-100),
  "reasoning": string,
  "advisory": string,
  "isPoisoningAttempt": boolean,
  "isZeroValueInjection": boolean,
  "sybilClusterDensity": number,
  "campaignId": string | null,
  "onChainAge": string,
  "globalReputation": "CLEAN" | "FLAGGED" | "UNKNOWN",
  "mismatchDetails": {
    "prefixMatch": boolean,
    "suffixMatch": boolean,
    "entropyCheck": string
  },
  "evidenceFlags": string[]
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `VERIFY_ADDR: ${currentAddress} VS ${historicalAddress} CONTEXT: ${sourceContext}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const latency = Date.now() - start;
    const text = response.choices[0]?.message?.content || '{}';
    const data = JSON.parse(text) as ThreatAnalysisResponse;

    const usage: UsageData = {
      promptTokens: response.usage?.prompt_tokens || 0,
      candidatesTokens: response.usage?.completion_tokens || 0,
      totalTokens: response.usage?.total_tokens || 0,
      latencyMs: latency
    };

    return { data, usage };
  } catch (error: any) {
    throw new Error(`OpenAI Security Analysis Error: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Market Intelligence Analysis (Fallback for Gemini)
 */
export const analyzeMarketIntelWithOpenAI = async (ca: string): Promise<MarketIntelResponse> => {
  const client = getOpenAIClient();

  const systemPrompt = `You are a token market analyst. Analyze the following contract address and return a JSON object with this exact structure:
{
  "bundledSupply": number,
  "clusterCount": number,
  "tokenAge": string,
  "concentrationGrade": "ORGANIC" | "DANGEROUS" | "SYSTEMIC_TRAP",
  "devWalletsConnected": number,
  "nonDevWalletsConnected": number,
  "distribution": { "top10Count": number, "top20Count": number, "top50Count": number },
  "activity1h": { "newBuyers": number, "oldSellers": number },
  "creatorReputation": "HIGH" | "MEDIUM" | "LOW" | "MALICIOUS",
  "honeypotRisk": "NONE" | "LOW" | "CRITICAL",
  "liquidityStatus": string,
  "verdict": string,
  "signals": [{ "label": string, "value": string, "state": "POSITIVE" | "NEUTRAL" | "NEGATIVE" }]
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `FORENSIC_MKT_AUDIT: ${ca}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const text = response.choices[0]?.message?.content || '{}';
    return JSON.parse(text) as MarketIntelResponse;
  } catch (error: any) {
    throw new Error(`OpenAI Market Intel Error: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Address Interception Analysis (Fallback for Gemini)
 */
export const analyzeAddressInterceptionWithOpenAI = async (
  address: string
): Promise<InterceptionSynthesisResponse> => {
  const client = getOpenAIClient();

  const systemPrompt = `You are a security scanner. Analyze this address and return JSON:
{
  "verdict": "SAFE" | "SUSPICIOUS" | "MALICIOUS",
  "confidence": number (0-100),
  "clusterMatch": string,
  "threatLabel": string,
  "telemetry": string[]
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `SHIELD_SCAN: ${address}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2
    });

    const text = response.choices[0]?.message?.content || '{}';
    return JSON.parse(text) as InterceptionSynthesisResponse;
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
  const client = getOpenAIClient();

  const systemPrompt = `You are a reputation analyst. Analyze this address and return JSON:
{
  "reputationScore": number (0-100),
  "synthesis": string,
  "verdict": string,
  "sentinelSignals": [{ "label": string, "value": string, "state": "POSITIVE" | "NEUTRAL" | "NEGATIVE" }]
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `REPUTATION_SYNTHESIS: ${address}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    });

    const text = response.choices[0]?.message?.content || '{}';
    return JSON.parse(text) as ReputationSynthesisResponse;
  } catch (error: any) {
    throw new Error(`OpenAI Reputation Error: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Cognitive Autopsy (Fallback for Gemini)
 */
export const generateCognitiveAutopsyWithOpenAI = async (
  real: string,
  selected: string
): Promise<CognitiveAutopsyResponse> => {
  const client = getOpenAIClient();

  const systemPrompt = `You are a cognitive security analyst. Analyze why a user selected the wrong address and return JSON:
{
  "autopsy": string,
  "biologicalVulnerability": string,
  "visualAnchor": string
}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `COGNITIVE_AUTOPSY_REQ: ORIGIN[${real}] VS SELECTED[${selected}]` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4
    });

    const text = response.choices[0]?.message?.content || '{}';
    return JSON.parse(text) as CognitiveAutopsyResponse;
  } catch (error: any) {
    throw new Error(`OpenAI Cognitive Autopsy Error: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Mesh Query Streaming (Fallback for Gemini)
 */
export const querySentinelMeshStreamWithOpenAI = async function* (
  query: string,
  signal?: AbortSignal
): AsyncGenerator<{ text: string; usageMetadata?: any }> {
  const client = getOpenAIClient();

  const systemPrompt = `You are VIGIL MESH INTELLIGENCE KERNEL (V-K1).
Voice: Tactical, professional, authoritative, non-emotive.
Format: Use Markdown with ### HEADERS, **BOLD** for technical terms, - BULLET POINTS.
Output Structure: [CLASSIFICATION], ### OVERVIEW, ### DIRECTIVE.`;

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      stream: true,
      temperature: 0.1
    }, {
      signal
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        yield {
          text: delta,
          usageMetadata: chunk.usage
        };
      }
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`OpenAI Mesh Query Error: ${error.message || 'Unknown error'}`);
  }
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
  const client = getOpenAIClient();
  const start = Date.now();
  
  try {
    const response = await client.chat.completions.create({
      model: options?.model || 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: options?.maxTokens || 2000,
      temperature: options?.temperature || 0.7,
    }, {
      signal: options?.signal
    });

    const text = response.choices[0]?.message?.content || '';
    const usage = response.usage ? {
      promptTokens: response.usage.prompt_tokens,
      completionTokens: response.usage.completion_tokens,
      totalTokens: response.usage.total_tokens
    } : undefined;

    return {
      text,
      usage
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Generates streaming text content using OpenAI
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
  const client = getOpenAIClient();
  
  try {
    const stream = await client.chat.completions.create({
      model: options?.model || 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: options?.maxTokens || 2000,
      temperature: options?.temperature || 0.7,
      stream: true
    }, {
      signal: options?.signal
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        yield {
          text: delta,
          done: false,
          usage: chunk.usage
        };
      }
    }
    
    yield { text: '', done: true };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
};
