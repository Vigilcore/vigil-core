/**
 * Vercel Serverless Function for Gemini API
 * Keeps API keys secure on the server side
 */

import { GoogleGenAI, Type } from "@google/genai";

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment (server-side only)
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMINI_API_KEY not configured on server' 
    });
  }

  try {
    const { endpoint, payload } = req.body;

    if (!endpoint || !payload) {
      return res.status(400).json({ error: 'Missing endpoint or payload' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const start = Date.now();

    // Route to the appropriate Gemini function based on endpoint
    let response;
    
    switch (endpoint) {
      case 'analyzeSecurityIntent': {
        const { currentAddress, historicalAddress, sourceContext } = payload;
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `FAST_SECURITY_AUDIT:
            CONTEXT: "${sourceContext || 'UNKNOWN'}"
            HIST: "${historicalAddress}"
            CURR: "${currentAddress}"
            DETECT_ZERO_VALUE: true
            IDENTIFY_SYBIL_CLUSTERS: true`,
          config: {
            responseMimeType: "application/json",
            thinkingConfig: { thinkingBudget: 0 },
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                riskScore: { type: Type.NUMBER },
                threatCategory: { type: Type.STRING },
                intentState: { type: Type.STRING, enum: ['INFO', 'CAUTION', 'TRUSTED', 'POISON', 'NEW', 'SPOOF', 'MARKET_INTEL', 'ZERO_VALUE_SPOOF'] },
                similarityIndex: { type: Type.NUMBER },
                reasoning: { type: Type.STRING },
                advisory: { type: Type.STRING },
                isPoisoningAttempt: { type: Type.BOOLEAN },
                isZeroValueInjection: { type: Type.BOOLEAN },
                sybilClusterDensity: { type: Type.NUMBER },
                campaignId: { type: Type.STRING, nullable: true },
                onChainAge: { type: Type.STRING },
                globalReputation: { type: Type.STRING, enum: ['CLEAN', 'FLAGGED', 'UNKNOWN'] },
                mismatchDetails: {
                  type: Type.OBJECT,
                  properties: {
                    prefixMatch: { type: Type.BOOLEAN },
                    suffixMatch: { type: Type.BOOLEAN },
                    entropyCheck: { type: Type.STRING }
                  },
                  required: ["prefixMatch", "suffixMatch", "entropyCheck"]
                },
                evidenceFlags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["riskScore", "threatCategory", "intentState", "similarityIndex", "reasoning", "advisory", "isPoisoningAttempt", "isZeroValueInjection", "sybilClusterDensity", "onChainAge", "globalReputation", "mismatchDetails", "evidenceFlags"]
            }
          }
        });
        const latency = Date.now() - start;
        const text = response.text;
        const data = JSON.parse(text || '{}');
        return res.status(200).json({
          data,
          usage: {
            promptTokens: response.usageMetadata?.promptTokenCount || 0,
            candidatesTokens: response.usageMetadata?.candidatesTokenCount || 0,
            totalTokens: response.usageMetadata?.totalTokenCount || 0,
            latencyMs: latency
          }
        });
      }

      case 'analyzeMarketIntel': {
        const { contractAddress } = payload;
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `MARKET_FORENSIC_AUTOPSY: "${contractAddress}". 
          Analyze the following:
          1. Supply distribution: How many wallets hold top 10%, 20%, and 50% of supply?
          2. Bundling/Concentration: How many wallets are funded by the deployer or associated insiders? Even for old projects.
          3. Project Age: How long since launch?
          4. Concentration Grade: If old but concentrated, mark as SYSTEMIC_TRAP.
          5. DEV DNA: Reputation of the creator wallet.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                bundledSupply: { type: Type.NUMBER },
                clusterCount: { type: Type.NUMBER },
                tokenAge: { type: Type.STRING },
                concentrationGrade: { type: Type.STRING, enum: ['ORGANIC', 'DANGEROUS', 'SYSTEMIC_TRAP'] },
                devWalletsConnected: { type: Type.NUMBER },
                nonDevWalletsConnected: { type: Type.NUMBER },
                distribution: {
                  type: Type.OBJECT,
                  properties: {
                    top10Count: { type: Type.NUMBER },
                    top20Count: { type: Type.NUMBER },
                    top50Count: { type: Type.NUMBER }
                  },
                  required: ["top10Count", "top20Count", "top50Count"]
                },
                activity1h: {
                  type: Type.OBJECT,
                  properties: {
                    newBuyers: { type: Type.NUMBER },
                    oldSellers: { type: Type.NUMBER }
                  },
                  required: ["newBuyers", "oldSellers"]
                },
                creatorReputation: { type: Type.STRING, enum: ['HIGH', 'MEDIUM', 'LOW', 'MALICIOUS'] },
                honeypotRisk: { type: Type.STRING, enum: ['NONE', 'LOW', 'CRITICAL'] },
                liquidityStatus: { type: Type.STRING },
                verdict: { type: Type.STRING },
                signals: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      value: { type: Type.STRING },
                      state: { type: Type.STRING, enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] }
                    },
                    required: ["label", "value", "state"]
                  }
                }
              },
              required: ["bundledSupply", "clusterCount", "tokenAge", "concentrationGrade", "devWalletsConnected", "nonDevWalletsConnected", "distribution", "activity1h", "creatorReputation", "honeypotRisk", "liquidityStatus", "verdict", "signals"]
            }
          }
        });
        const text = response.text;
        return res.status(200).json(JSON.parse(text || '{}'));
      }

      case 'analyzeAddressInterception': {
        const { address } = payload;
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `RETINAL_SHIELD_SCAN: "${address}". Determine if this is a known mimic or trusted protocol node.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                verdict: { type: Type.STRING, enum: ['SAFE', 'SUSPICIOUS', 'MALICIOUS'] },
                confidence: { type: Type.NUMBER },
                clusterMatch: { type: Type.STRING },
                threatLabel: { type: Type.STRING },
                telemetry: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["verdict", "confidence", "clusterMatch", "threatLabel", "telemetry"]
            }
          }
        });
        const text = response.text;
        return res.status(200).json(JSON.parse(text || '{}'));
      }

      case 'synthesizeAddressReputation': {
        const { address } = payload;
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `SYNTHESIS: ADDR: "${address}". Technical reputation synthesis.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reputationScore: { type: Type.NUMBER },
                synthesis: { type: Type.STRING },
                verdict: { type: Type.STRING },
                sentinelSignals: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      value: { type: Type.STRING },
                      state: { type: Type.STRING, enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] }
                    },
                    required: ["label", "value", "state"]
                  }
                }
              },
              required: ["reputationScore", "synthesis", "verdict", "sentinelSignals"]
            }
          }
        });
        const text = response.text;
        return res.status(200).json(JSON.parse(text || '{}'));
      }

      case 'generateCognitiveAutopsy': {
        const { real, selected } = payload;
        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `COGNITIVE_AUTOPSY: REAL_ADDR: "${real}", SELECTED_ADDR: "${selected}". Explain why a human eye might fail this check.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                autopsy: { type: Type.STRING },
                biologicalVulnerability: { type: Type.STRING },
                visualAnchor: { type: Type.STRING }
              },
              required: ["autopsy", "biologicalVulnerability", "visualAnchor"]
            }
          }
        });
        const text = response.text;
        return res.status(200).json(JSON.parse(text || '{}'));
      }

      case 'queryMeshIntelligence': {
        const { query } = payload;
        const lowerQuery = query.toLowerCase();
        
        // High-level Gate for Market/Financial terms
        if (['buy', 'sell', 'price', 'moon', 'pump', 'invest'].some(w => lowerQuery.includes(w))) {
          return res.status(200).json({
            text: '[CLASSIFICATION] RESTRICTED\n[!] ACCESS_DENIED: VIGIL IS A SECURITY PRIMITIVE. MARKET DATA ACCESS DENIED.',
            usage: {
              promptTokens: 0,
              candidatesTokens: 0,
              totalTokens: 0,
              latencyMs: Date.now() - start
            }
          });
        }

        const SYSTEM_INSTRUCTION = `
ROLE: VIGIL MESH INTELLIGENCE KERNEL (V-K1)
STATUS: HARDENED // REAL-TIME GROUNDING ACTIVE

DIRECTIVES:
1. VOICE: Tactical, professional, authoritative, non-emotive. No conversational filler.
2. GROUNDING (CRITICAL): You have access to GOOGLE SEARCH. Use it to verify contract addresses (CAs), find recent scam reports on X/Twitter, Discord, or security blogs.
3. EXTENSION SYNERGY: You are the deep forensic layer for the VIGIL Chrome Extension. If a user asks about an address, search for recent activity or flags.
4. FORMATTING: Use hierarchical Markdown.
   - Use ### HEADERS for sections.
   - Use **BOLD** for technical terms.
   - Use - BULLET POINTS for forensic steps.
5. OUTPUT STRUCTURE:
   - [CLASSIFICATION] header.
   - ### OVERVIEW: High-level summary.
   - ### REAL_TIME_INTEL: Forensic data found via live search.
   - ### DIRECTIVE: Actionable security advice.
6. TOKEN ENQUIRIES: Exactly: "[CLASSIFICATION] RESTRICTED\n[!] ACCESS_DENIED: NO TOKEN EXISTS. VIGIL is a structural security standard. We do not have a token, a pre-sale, or an airdrop. Official data is shared exclusively via the VIGIL Registry (vigil.layer) and our verified communication channel (@Vigil_Research). Treat any other claim as a POISON EVENT."
7. GRATITUDE: Exactly: "[CLASSIFICATION] HYGIENE\nACKNOWLEDGMENT REGISTERED. VIGILANCE IS THE ONLY PERMANENT SHIELD."
`;

        response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `${SYSTEM_INSTRUCTION}\n\nQUERY: ${query}`,
          config: {
            tools: [{ googleSearch: {} }], // Enable Google Search grounding
            thinkingConfig: { thinkingBudget: 0 }
          }
        });
        
        const latency = Date.now() - start;
        const text = response.text || '';
        
        return res.status(200).json({
          text,
          usage: {
            promptTokens: response.usageMetadata?.promptTokenCount || 0,
            candidatesTokens: response.usageMetadata?.candidatesTokenCount || 0,
            totalTokens: response.usageMetadata?.totalTokenCount || 0,
            latencyMs: latency
          }
        });
      }

      default:
        return res.status(400).json({ error: `Unknown endpoint: ${endpoint}` });
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Gemini API request failed' 
    });
  }
}
