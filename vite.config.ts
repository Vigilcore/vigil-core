import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Vite automatically loads .env, .env.local, .env.[mode], .env.[mode].local
  const env = loadEnv(mode, process.cwd(), '');
  
  // Get API_KEY from environment (supports both API_KEY and GEMINI_API_KEY for compatibility)
  const apiKey = env.API_KEY || env.GEMINI_API_KEY || process.env.API_KEY || process.env.GEMINI_API_KEY;
  // Get OPENAI_API_KEY from environment
  const openaiApiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.OPENAI_API_KEY': JSON.stringify(openaiApiKey)
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    }
  };
});