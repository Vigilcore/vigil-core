import { useState, useEffect } from 'react';
import { getGoogleAIConfig, getOpenAIConfig } from '../services/aiProvider';

export interface ApiGuardResult {
  error?: string;
  isValid: boolean;
  googleAIAvailable?: boolean;
  openAIAvailable?: boolean;
}

/**
 * Hook to guard AI-powered components
 * API keys are now server-side via /api routes, so we just check if routes are available
 * Actual API key validation happens server-side
 */
export const useApiGuard = (): ApiGuardResult => {
  const [result, setResult] = useState<ApiGuardResult>({ isValid: true });

  useEffect(() => {
    // API keys are now server-side, so we assume available
    // The API routes will handle errors if keys are missing
    const googleConfig = getGoogleAIConfig();
    const openaiConfig = getOpenAIConfig();
    
    setResult({ 
      isValid: true,
      googleAIAvailable: googleConfig.available,
      openAIAvailable: openaiConfig.available
    });
  }, []);

  return result;
};
