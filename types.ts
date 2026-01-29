
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

// Real-time telemetry types (additive, for Helius integration)
export type NetworkStatus = 'CONNECTED' | 'DEGRADED' | 'OFFLINE';
export type FundingSourceType = 'EXCHANGE' | 'PRIVATE_WALLET' | 'UNKNOWN';
export type ActivityPulse = 'ACTIVE' | 'DORMANT';
export type ClusterSignal = 'SINGLE_ORIGIN' | 'MULTI_SOURCE' | 'SEEDER_PATTERN';
export type SimilarityCollision = 'ZERO_DETECTION' | 'LOCAL_MATCH' | 'SOVEREIGN_NODE_MIMIC';
export type FlowType = 'ORGANIC' | 'SINGLE_USE' | 'UNKNOWN';
export type BalanceBand = '0 SOL' | '<0.01' | '0.01–1' | '>1';

export interface RealtimeTelemetry {
  status: NetworkStatus;
  addressAge?: string;
  lastSeen?: string;
  fundingSource?: FundingSourceType;
  activityPulse?: ActivityPulse;
  clusterSignal?: ClusterSignal;
  firstTxSignature?: string;
  lastTxSignature?: string;
  txCount?: number;
  tx15d?: number;
  similarityCollision?: SimilarityCollision;
  flowType?: FlowType;
  balanceBand?: BalanceBand;
  tokenCount?: number;
  balance10dAvg?: number;
  fundedBy?: string;
  _version?: number; // Cache version for automatic invalidation
}
