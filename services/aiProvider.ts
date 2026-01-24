/**
 * Central AI Provider Configuration
 * NOTE: API keys are now server-side only (via /api routes)
 * This file provides fallback routing logic
 */

export type AIProvider = 'GOOGLE_AI' | 'OPENAI';

export interface ProviderConfig {
  provider: AIProvider;
  available: boolean; // Always true now - API routes handle availability
}

/**
 * Gets Google AI (Gemini) configuration
 * API keys are server-side, so we assume available (API route will handle errors)
 */
export const getGoogleAIConfig = (): ProviderConfig => {
  return {
    provider: 'GOOGLE_AI',
    available: true // API route will handle if key is missing
  };
};

/**
 * Gets OpenAI configuration
 * API keys are server-side, so we assume available (API route will handle errors)
 */
export const getOpenAIConfig = (): ProviderConfig => {
  return {
    provider: 'OPENAI',
    available: true // API route will handle if key is missing
  };
};

/**
 * Gets all available provider configurations
 */
export const getAllProviders = (): ProviderConfig[] => {
  return [
    getGoogleAIConfig(),
    getOpenAIConfig()
  ];
};

/**
 * Validates that at least one provider is available
 * Always passes now - API routes handle actual availability
 */
export const validateAtLeastOneProvider = (): void => {
  // Always valid - API routes will handle errors server-side
  return;
};
