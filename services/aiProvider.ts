/**
 * Central AI Provider Configuration
 * Manages both Google AI (Gemini) and OpenAI providers
 */

export type AIProvider = 'GOOGLE_AI' | 'OPENAI';

export interface ProviderConfig {
  provider: AIProvider;
  apiKey: string;
  available: boolean;
}

const placeholderPatterns = [
  'placeholder',
  'your_api_key',
  'your_actual_api_key',
  'example',
  'demo',
  'test'
];

/**
 * Validates an API key for any provider
 */
const validateKey = (key: string | undefined, providerName: string): string => {
  if (!key || key === 'undefined' || key === 'null' || key.trim() === '') {
    throw new Error(
      `[VIGIL ${providerName} API KEY MISSING] The ${providerName} API key is not configured. ` +
      `Please set the API key in your environment variables or .env.local file.`
    );
  }
  
  const lowerKey = key.toLowerCase();
  if (placeholderPatterns.some(pattern => lowerKey.includes(pattern))) {
    throw new Error(
      `[VIGIL ${providerName} API KEY INVALID] The API key appears to be a placeholder value. ` +
      `Please replace it with your actual ${providerName} API key.`
    );
  }
  
  return key;
};

/**
 * Gets Google AI (Gemini) API key configuration
 */
export const getGoogleAIConfig = (): ProviderConfig => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  try {
    const validatedKey = validateKey(apiKey, 'GOOGLE_AI');
    return {
      provider: 'GOOGLE_AI',
      apiKey: validatedKey,
      available: true
    };
  } catch (error) {
    return {
      provider: 'GOOGLE_AI',
      apiKey: '',
      available: false
    };
  }
};

/**
 * Gets OpenAI API key configuration
 */
export const getOpenAIConfig = (): ProviderConfig => {
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const validatedKey = validateKey(apiKey, 'OPENAI');
    return {
      provider: 'OPENAI',
      apiKey: validatedKey,
      available: true
    };
  } catch (error) {
    return {
      provider: 'OPENAI',
      apiKey: '',
      available: false
    };
  }
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
 */
export const validateAtLeastOneProvider = (): void => {
  const providers = getAllProviders();
  const available = providers.filter(p => p.available);
  
  if (available.length === 0) {
    throw new Error(
      '[VIGIL NO AI PROVIDERS AVAILABLE] At least one AI provider (Google AI or OpenAI) must be configured. ' +
      'Please set API_KEY (for Google AI) or OPENAI_API_KEY (for OpenAI) in your environment variables or .env.local file.'
    );
  }
};
