
import { RegistryDoc } from "../components/OperationalRegistry";

export interface TacticalIntercept {
  id: string;
  status: string;
  content: string;
  tagline: string;
  url?: string; 
}

export interface NetworkCampaignSignal {
  id: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'CAUTION';
  affectedCount: string;
  seederSource: string;
}

export const LATEST_INTERCEPT: TacticalIntercept = {
  id: "VIG-GEN-01",
  status: "PROTOCOL_ESTABLISHED // LAYER_0.5",
  content: "Web3 security has spent years patching code. Attackers moved to patching the human. VIGIL intercepts the cognitive gap before finality.",
  tagline: "DON'T BLOCK THE ADDRESS. BLOCK THE PATTERN.",
  url: "https://x.com/vigil_layer"
};

export const GLOBAL_CAMPAIGN_SIGNAL: NetworkCampaignSignal = {
  id: "CAM-VIG-2026-X",
  title: "INDUSTRIALIZED POISONING DETECTED",
  description: "Automated Seeder Program [Vig1...8821] currently executing 20k+ unique recipient injections per minute.",
  severity: "CRITICAL",
  affectedCount: "82k+ Wallets Targeted",
  seederSource: "Vig1nsT7281x992811772008x99120817"
};

export interface PhaseConfig {
  label: string;
  subtext: string;
  icon: 'fingerprint' | 'chrome' | 'shield';
  actionType: 'DOC' | 'EXTERNAL';
  actionValue: string;
}

export const PHASE_UI_CONFIG: Record<number, PhaseConfig> = {
  1: {
    label: "EXPLORE IDENTITY MANIFEST",
    subtext: "Silo 01 // Identity Layer established",
    icon: "fingerprint",
    actionType: "DOC",
    actionValue: "identity_manifest"
  },
  10: {
    label: "INSTALL VIGIL EXTENSION",
    subtext: "Standard v1.0 // Global Mesh Synchronized",
    icon: "chrome",
    actionType: "EXTERNAL",
    actionValue: "https://chrome.google.com/webstore"
  }
};
