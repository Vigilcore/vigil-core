
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

export interface RealtimeTelemetry {
  status: NetworkStatus;
  addressAge?: string;
  fundingSource?: FundingSourceType;
  activityPulse?: ActivityPulse;
  clusterSignal?: ClusterSignal;
  firstTxSignature?: string;
  lastTxSignature?: string;
  txCount?: number;
}
