/**
 * Vercel Serverless Function for OpenAI API
 * Keeps API keys secure on the server side
 */

import OpenAI from 'openai';

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment (server-side only)
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'OPENAI_API_KEY not configured on server' 
    });
  }

  try {
    const { endpoint, payload } = req.body;

    if (!endpoint || !payload) {
      return res.status(400).json({ error: 'Missing endpoint or payload' });
    }

    const client = new OpenAI({ apiKey });
    const start = Date.now();

    // Route to the appropriate OpenAI function based on endpoint
    let response;
    
    switch (endpoint) {
      case 'analyzeSecurityIntent': {
        const { currentAddress, historicalAddress, sourceContext } = payload;
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

        response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `VERIFY_ADDR: ${currentAddress} VS ${historicalAddress} CONTEXT: ${sourceContext || 'UNKNOWN'}` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3
        });

        const latency = Date.now() - start;
        const text = response.choices[0]?.message?.content || '{}';
        const data = JSON.parse(text);

        return res.status(200).json({
          data,
          usage: {
            promptTokens: response.usage?.prompt_tokens || 0,
            candidatesTokens: response.usage?.completion_tokens || 0,
            totalTokens: response.usage?.total_tokens || 0,
            latencyMs: latency
          }
        });
      }

      case 'analyzeMarketIntel': {
        const { contractAddress } = payload;
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

        response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `FORENSIC_MKT_AUDIT: ${contractAddress}` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3
        });

        const text = response.choices[0]?.message?.content || '{}';
        return res.status(200).json(JSON.parse(text));
      }

      case 'analyzeAddressInterception': {
        const { address } = payload;
        const systemPrompt = `You are a security scanner. Analyze this address and return JSON:
{
  "verdict": "SAFE" | "SUSPICIOUS" | "MALICIOUS",
  "confidence": number (0-100),
  "clusterMatch": string,
  "threatLabel": string,
  "telemetry": string[]
}`;

        response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `SHIELD_SCAN: ${address}` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        });

        const text = response.choices[0]?.message?.content || '{}';
        return res.status(200).json(JSON.parse(text));
      }

      case 'synthesizeAddressReputation': {
        const { address } = payload;
        const systemPrompt = `You are a reputation analyst. Analyze this address and return JSON:
{
  "reputationScore": number (0-100),
  "synthesis": string,
  "verdict": string,
  "sentinelSignals": [{ "label": string, "value": string, "state": "POSITIVE" | "NEUTRAL" | "NEGATIVE" }]
}`;

        response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `REPUTATION_SYNTHESIS: ${address}` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3
        });

        const text = response.choices[0]?.message?.content || '{}';
        return res.status(200).json(JSON.parse(text));
      }

      case 'generateCognitiveAutopsy': {
        const { real, selected } = payload;
        const systemPrompt = `You are a cognitive security analyst. Analyze why a user selected the wrong address and return JSON:
{
  "autopsy": string,
  "biologicalVulnerability": string,
  "visualAnchor": string
}`;

        response = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `COGNITIVE_AUTOPSY_REQ: ORIGIN[${real}] VS SELECTED[${selected}]` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.4
        });

        const text = response.choices[0]?.message?.content || '{}';
        return res.status(200).json(JSON.parse(text));
      }

      case 'generateText': {
        const { prompt, model, maxTokens, temperature } = payload;
        response = await client.chat.completions.create({
          model: model || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: maxTokens || 2000,
          temperature: temperature || 0.7
        });

        const text = response.choices[0]?.message?.content || '';
        return res.status(200).json({
          text,
          usage: response.usage ? {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens
          } : undefined
        });
      }

      default:
        return res.status(400).json({ error: `Unknown endpoint: ${endpoint}` });
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'OpenAI API request failed' 
    });
  }
}
