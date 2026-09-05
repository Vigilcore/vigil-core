
export enum VigilSection {
  HOME = 'HOME',
  TERMINAL = 'TERMINAL',
  TRANSPARENCY = 'TRANSPARENCY'
}

export enum ProjectStep {
  VISION = 'VISION',
  STRUCTURE = 'STRUCTURE',
  DESIGN = 'DESIGN',
  CODE = 'CODE'
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'POISONING_ATTEMPT' | 'VISUAL_SPOOF' | 'PHISHING_SHIELD' | 'CONTRACT_MISMATCH';
  status: 'MITIGATED' | 'INTERCEPTED' | 'FLAGGED';
  details: string;
}

export interface VigilAppState {
  currentSection: VigilSection;
  events: SecurityEvent[];
}

// Live-telemetry types (provider-neutral). The legacy Helius/Solana provider that
// populated these was retired in Task 029; no live provider is currently wired, so
// consumers receive `null` and must render honest "Unavailable" states.
export type NetworkStatus = 'CONNECTED' | 'DEGRADED' | 'OFFLINE';
export type FundingSourceType = 'EXCHANGE' | 'PRIVATE_WALLET' | 'UNKNOWN';
export type ActivityPulse = 'ACTIVE' | 'DORMANT';
export type ClusterSignal = 'SINGLE_ORIGIN' | 'MULTI_SOURCE' | 'SEEDER_PATTERN';
export type SimilarityCollision = 'ZERO_DETECTION' | 'LOCAL_MATCH' | 'SOVEREIGN_NODE_MIMIC';
export type FlowType = 'ORGANIC' | 'SINGLE_USE' | 'UNKNOWN';

/** Fields are present only when evidence-backed; absence is honest, never a zero. */
export interface RealtimeTelemetry {
  status: NetworkStatus;
  addressAge?: string;
  /** Evidence-backed lower bound, shown only when the exact age is not observed. */
  addressAgeLowerBound?: string;
  fundingSource?: FundingSourceType;
  activityPulse?: ActivityPulse;
  clusterSignal?: ClusterSignal;
  tx15d?: number;
  similarityCollision?: SimilarityCollision;
  flowType?: FlowType;
  tokenCount?: number;
}
