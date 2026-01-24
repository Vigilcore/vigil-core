/**
 * Gemini Service - Client-side wrapper for secure API routes
 * All API calls are proxied through /api/gemini serverless function
 * API keys are kept secure on the server side
 */

export type IntentCategory = 'INFO' | 'CAUTION' | 'TRUSTED' | 'POISON' | 'NEW' | 'SPOOF' | 'MARKET_INTEL' | 'ZERO_VALUE_SPOOF';

export interface UsageData {
  promptTokens: number;
  candidatesTokens: number;
  totalTokens: number;
  latencyMs: number;
}

export interface ThreatAnalysisResponse {
  riskScore: number;
  threatCategory: string;
  intentState: IntentCategory; 
  similarityIndex: number;
  reasoning: string;
  advisory: string;
  isPoisoningAttempt: boolean;
  isZeroValueInjection: boolean;
  sybilClusterDensity: number;
  campaignId: string | null;
  onChainAge: string;
  globalReputation: 'CLEAN' | 'FLAGGED' | 'UNKNOWN';
  mismatchDetails: {
    prefixMatch: boolean;
    suffixMatch: boolean;
    entropyCheck: string;
  };
  evidenceFlags: string[];
}

export interface MarketIntelResponse {
  bundledSupply: number;
  clusterCount: number;
  tokenAge: string;
  concentrationGrade: 'ORGANIC' | 'DANGEROUS' | 'SYSTEMIC_TRAP';
  devWalletsConnected: number;
  nonDevWalletsConnected: number;
  distribution: {
    top10Count: number;
    top20Count: number;
    top50Count: number;
  };
  activity1h: {
    newBuyers: number;
    oldSellers: number;
  };
  creatorReputation: 'HIGH' | 'MEDIUM' | 'LOW' | 'MALICIOUS';
  honeypotRisk: 'NONE' | 'LOW' | 'CRITICAL';
  liquidityStatus: string;
  verdict: string;
  signals: {
    label: string;
    value: string;
    state: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
}

export interface ReputationSynthesisResponse {
  reputationScore: number;
  synthesis: string;
  verdict: string;
  sentinelSignals: {
    label: string;
    value: string;
    state: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
}

export interface InterceptionSynthesisResponse {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS';
  confidence: number;
  clusterMatch: string;
  threatLabel: string;
  telemetry: string[];
}

export interface CognitiveAutopsyResponse {
  autopsy: string;
  biologicalVulnerability: string;
  visualAnchor: string;
}

export const analyzeSecurityIntent = async (
  currentAddress: string, 
  historicalAddress: string,
  sourceContext: string = 'UNKNOWN'
): Promise<{ data: ThreatAnalysisResponse; usage: UsageData }> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'analyzeSecurityIntent',
      payload: { currentAddress, historicalAddress, sourceContext }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to analyze security intent');
  }

  const result = await response.json();
  return { data: result.data, usage: result.usage };
};

export const analyzeMarketIntel = async (ca: string): Promise<MarketIntelResponse> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'analyzeMarketIntel',
      payload: { contractAddress: ca }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to analyze market intel');
  }

  return await response.json();
};

export const analyzeAddressInterception = async (address: string): Promise<InterceptionSynthesisResponse> => {
  // Call secure API route instead of direct API call
  try {
    const response = await fetch('/api/gemini', {
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
  } catch (e) {
    return { verdict: 'SUSPICIOUS', confidence: 50, clusterMatch: 'Unknown', threatLabel: 'Scan Failed', telemetry: [] };
  }
};

export const synthesizeAddressReputation = async (address: string): Promise<ReputationSynthesisResponse> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'synthesizeAddressReputation',
      payload: { address }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to synthesize reputation');
  }

  return await response.json();
};

export const generateCognitiveAutopsy = async (real: string, selected: string): Promise<CognitiveAutopsyResponse> => {
  // Call secure API route instead of direct API call
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'generateCognitiveAutopsy',
      payload: { real, selected }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to generate autopsy');
  }

  return await response.json();
};
