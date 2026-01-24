import { useState, useEffect } from 'react';
import { validateApiKey } from '../services/geminiService';
import { validateAtLeastOneProvider, getGoogleAIConfig, getOpenAIConfig } from '../services/aiProvider';

export interface ApiGuardResult {
  apiKey?: string;
  error?: string;
  isValid: boolean;
  googleAIAvailable?: boolean;
  openAIAvailable?: boolean;
}

/**
 * Hook to guard AI-powered components against missing API keys.
 * Validates API keys on mount and returns error state if invalid.
 * Supports both Google AI and OpenAI providers.
 */
export const useApiGuard = (): ApiGuardResult => {
  const [result, setResult] = useState<ApiGuardResult>({ isValid: false });

  useEffect(() => {
    try {
      // Check Google AI (for backward compatibility with existing components)
      const googleConfig = getGoogleAIConfig();
      const openaiConfig = getOpenAIConfig();
      
      // If Google AI is available, use it (maintains backward compatibility)
      if (googleConfig.available) {
        setResult({ 
          apiKey: googleConfig.apiKey, 
          isValid: true,
          googleAIAvailable: true,
          openAIAvailable: openaiConfig.available
        });
        return;
      }
      
      // If only OpenAI is available, that's fine too
      if (openaiConfig.available) {
        setResult({ 
          apiKey: openaiConfig.apiKey, 
          isValid: true,
          googleAIAvailable: false,
          openAIAvailable: true
        });
        return;
      }
      
      // Neither provider available - use legacy validation for error message
      validateApiKey();
    } catch (err: any) {
      const errorMessage = err?.message || String(err);
      let userMessage = errorMessage;
      
      if (errorMessage.includes('API KEY MISSING') || errorMessage.includes('API_KEY') || errorMessage.includes('NO AI PROVIDERS')) {
        userMessage = 'API_KEY_MISSING: At least one AI provider (Google AI or OpenAI) must be configured. Please set API_KEY (for Google AI) or OPENAI_API_KEY (for OpenAI) in your environment variables or .env.local file to enable simulations.';
      } else if (errorMessage.includes('API KEY INVALID') || errorMessage.includes('placeholder')) {
        userMessage = 'API_KEY_INVALID: The API key appears to be a placeholder value. Please replace it with your actual API key.';
      }
      
      setResult({ 
        error: userMessage, 
        isValid: false,
        googleAIAvailable: false,
        openAIAvailable: false
      });
    }
  }, []);

  return result;
};
