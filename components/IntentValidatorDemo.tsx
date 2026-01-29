
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Terminal, ShieldAlert, ShieldCheck, Search, Binary, AlertTriangle, CheckCircle2, Info, UserPlus, Globe, MessageSquare, ExternalLink, Activity, Zap, ClipboardPaste, Clock, ShieldQuestion, Wifi, ShieldX, Scan, AlertOctagon, Scale, X, Fingerprint, Database, HelpCircle, History, MousePointerClick, Brain, Skull, Radar, Eye, Calculator, ChevronRight, ChevronDown, BarChart3, RotateCcw, Target, Timer, Gauge, FileText, User, Lock, TrendingUp, Ghost } from 'lucide-react';
import { ThreatAnalysisResponse, IntentCategory, UsageData } from '../services/geminiService';
import { routeSecurityIntent } from '../services/aiRouter';
import { AddressGlyph } from './AddressGlyph';
import { VigilScanner } from './VigilScanner';
import { TechLabel, TechNote } from './docs/DocHelpers';
import { getAddressTelemetry, RealtimeTelemetry } from '../services/heliusService';
import { isValidSolanaAddress } from '../utils/addressValidator';

interface TIMAxes {
  vsi: number; edi: number; pdi: number; cri: number; ipi: number; rii: number; eii: number;
}

interface IntentValidatorDemoProps {
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}

/**
 * Calculate threat indices from real-time telemetry
 * This function is used both in the modal and in the main component
 */
const calculateRealtimeAxes = (telemetry: RealtimeTelemetry | null, source: 'EXPLORER' | 'SOCIAL' | 'DAPP', address: string): TIMAxes => {
  if (!telemetry || telemetry.status === 'OFFLINE') {
    return { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 };
  }

  // VSI: Visual Similarity Index
  let vsi = 10; // Base low risk
  if (telemetry.similarityCollision === 'LOCAL_MATCH') {
    vsi = 75; // High risk if matches local trust graph
  } else if (telemetry.similarityCollision === 'SOVEREIGN_NODE_MIMIC') {
    vsi = 95; // Critical risk if mimics infrastructure
  }

  // EDI: Entropy Deviation Index
  let edi = 0; // Assume random generation unless evidence suggests otherwise
  // Could be enhanced with pattern analysis in future

  // PDI: Provenance Depth Index
  let pdi = 100; // Default high risk (new address)
  if (telemetry.addressAge) {
    const ageStr = telemetry.addressAge.toLowerCase();
    if (ageStr.includes('year')) {
      pdi = 10; // Very old = low risk
    } else if (ageStr.includes('month')) {
      const months = parseInt(ageStr) || 0;
      pdi = months < 3 ? 80 : months < 6 ? 50 : 30;
    } else if (ageStr.includes('day')) {
      const days = parseInt(ageStr) || 0;
      pdi = days < 7 ? 95 : days < 30 ? 85 : 70;
    } else if (ageStr.includes('hour') || ageStr.includes('min')) {
      pdi = 100; // Very new = maximum risk
    }
  }
  
  // BALANCE_PERSISTENCE: Minor adjustment to PDI (informational-weight only)
  // Balance persistence suggests address retains value, slightly reducing provenance risk
  // But this must never override age-based risk assessment
  if (telemetry.balance10dAvg !== undefined && telemetry.balance10dAvg > 0) {
    // If address has maintained balance, reduce PDI by small amount (max 5 points)
    // Only applies if PDI is already moderate/high (not overriding low-risk old addresses)
    if (pdi > 50) {
      const persistenceAdjustment = Math.min(5, Math.floor(telemetry.balance10dAvg * 2)); // Max 5 point reduction
      pdi = Math.max(50, pdi - persistenceAdjustment); // Never go below 50 for new addresses
    }
  }

  // CRI: Context Risk Index
  let cri = 30; // Base moderate risk
  if (source === 'SOCIAL') {
    cri = 90; // High risk from social media
  } else if (source === 'DAPP') {
    cri = 50; // Moderate risk from dApp
  } else {
    cri = 20; // Lower risk from explorer
  }
  
  // BALANCE_PERSISTENCE: Minor adjustment to CRI (informational-weight only)
  // Balance persistence can slightly reduce context risk, but never override source-based risk
  if (telemetry.balance10dAvg !== undefined && telemetry.balance10dAvg > 0.1) {
    // If address has maintained meaningful balance (>0.1 SOL), reduce CRI slightly
    // But never override high-risk sources (SOCIAL stays high)
    if (cri < 90) {
      const persistenceAdjustment = Math.min(3, Math.floor(telemetry.balance10dAvg)); // Max 3 point reduction
      cri = Math.max(15, cri - persistenceAdjustment); // Never go below 15
    }
  }

  // IPI: Interaction Pattern Index
  let ipi = 10; // Base low risk
  if (telemetry.tx15d !== undefined) {
    if (telemetry.tx15d > 1000) {
      ipi = 100; // Extremely high activity = suspicious
    } else if (telemetry.tx15d > 100) {
      ipi = 80; // High activity = suspicious
    } else if (telemetry.tx15d === 0) {
      ipi = 50; // No activity = moderate risk
    }
  }
  if (telemetry.flowType === 'SINGLE_USE') {
    ipi = Math.max(ipi, 60); // Single-use patterns are suspicious
  }

  // RII: Registry Integrity Index (requires mint/contract analysis)
  let rii = 0; // Default safe (not applicable to regular addresses)

  // EII: Execution Integrity Index (requires runtime detection)
  let eii = 0; // Default safe (requires extension context)

  return { vsi, edi, pdi, cri, ipi, rii, eii };
};

/**
 * MODAL A: THREAT INDEX CALCULATIONS
 */
const ThreatIndexModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  axes: TIMAxes; 
  totalIndex: number; 
  address: string;
  realtimeStatus?: RealtimeTelemetry | null;
  source?: 'EXPLORER' | 'SOCIAL' | 'DAPP';
  isSimulation?: boolean;
}> = ({ isOpen, onClose, axes, totalIndex, address, realtimeStatus, source, isSimulation }) => {
  if (!isOpen) return null;

  // Calculate real-time axes if telemetry is available
  const realtimeAxes = realtimeStatus && !isSimulation 
    ? calculateRealtimeAxes(realtimeStatus, source || 'EXPLORER', address)
    : null;
  
  // Use real-time axes if available, otherwise use provided axes
  const displayAxes = realtimeAxes || axes;
  const displayIndex = realtimeAxes 
    ? (realtimeAxes.rii === 100 || realtimeAxes.eii === 100 ? 100 : Math.round(0.20 * realtimeAxes.vsi + 0.15 * realtimeAxes.edi + 0.15 * realtimeAxes.pdi + 0.15 * realtimeAxes.cri + 0.15 * realtimeAxes.ipi + 0.10 * realtimeAxes.rii + 0.10 * realtimeAxes.eii))
    : totalIndex;

  const getCalculationMethod = (axisId: string, score: number): string => {
    if (realtimeAxes && !isSimulation) {
      switch (axisId) {
        case 'VSI':
          if (realtimeStatus?.similarityCollision === 'SOVEREIGN_NODE_MIMIC') {
            return `SOVEREIGN_NODE_MIMIC detected: Prefix/suffix collision with infrastructure address → ${score}%`;
          } else if (realtimeStatus?.similarityCollision === 'LOCAL_MATCH') {
            return `LOCAL_MATCH detected: Prefix/suffix collision with local trust graph → ${score}%`;
          }
          return `ZERO_DETECTION: No prefix/suffix collisions → ${score}%`;
        case 'PDI':
          const age = realtimeStatus?.addressAge || 'Unknown';
          let pdiCalc = '';
          if (age.includes('year')) {
            pdiCalc = `Address age: ${age} (established provenance)`;
          } else if (age.includes('month')) {
            pdiCalc = `Address age: ${age} (moderate provenance)`;
          } else if (age.includes('day')) {
            pdiCalc = `Address age: ${age} (new provenance)`;
          } else {
            pdiCalc = `Address age: ${age} (insufficient history)`;
          }
          // Add balance persistence note if applicable
          if (realtimeStatus?.balance10dAvg !== undefined && realtimeStatus.balance10dAvg > 0) {
            pdiCalc += `, Balance persistence: ${realtimeStatus.balance10dAvg.toFixed(4)} SOL (minor adjustment)`;
          }
          return `${pdiCalc} → ${score}%`;
        case 'CRI':
          const src = source || 'EXPLORER';
          let criCalc = `Source context: ${src}`;
          // Add balance persistence note if applicable
          if (realtimeStatus?.balance10dAvg !== undefined && realtimeStatus.balance10dAvg > 0.1) {
            criCalc += `, Balance persistence: ${realtimeStatus.balance10dAvg.toFixed(4)} SOL (minor adjustment)`;
          }
          return `${criCalc} → ${score}%`;
        case 'IPI':
          const tx15d = realtimeStatus?.tx15d ?? 0;
          const flowType = realtimeStatus?.flowType || 'UNKNOWN';
          return `15D transactions: ${tx15d}, Flow Type: ${flowType} → ${score}%`;
        case 'EDI':
          return `Entropy analysis: Random generation assumed → ${score}%`;
        case 'RII':
          return `Registry check: Not applicable (standard address) → ${score}%`;
        case 'EII':
          return `Execution check: Requires runtime context → ${score}%`;
        default:
          return `Calculated from telemetry → ${score}%`;
      }
    } else {
      return `Simulated scenario value → ${score}%`;
    }
  };

  const axisDefinitions = [
    { id: 'VSI', label: 'Visual Similarity', score: displayAxes.vsi, weight: 0.20, desc: 'Prefix/suffix collisions and character overlap risk.', calc: getCalculationMethod('VSI', displayAxes.vsi) },
    { id: 'EDI', label: 'Entropy Deviation', score: displayAxes.edi, weight: 0.15, desc: 'Likelihood of vanity/non-random generation.', calc: getCalculationMethod('EDI', displayAxes.edi) },
    { id: 'PDI', label: 'Provenance Depth', score: displayAxes.pdi, weight: 0.15, desc: 'Address age and recurring interaction history.', calc: getCalculationMethod('PDI', displayAxes.pdi) },
    { id: 'CRI', label: 'Context Risk', score: displayAxes.cri, weight: 0.15, desc: 'Source vulnerability (DM, Clipboard, or UI).', calc: getCalculationMethod('CRI', displayAxes.cri) },
    { id: 'IPI', label: 'Interaction Pattern', score: displayAxes.ipi, weight: 0.15, desc: 'Evidence of dust transfers or zero-value injections.', calc: getCalculationMethod('IPI', displayAxes.ipi) },
    { id: 'RII', label: 'Registry Integrity', score: displayAxes.rii, weight: 0.10, desc: 'Mint authenticity vs official Circle/Solana registry.', calc: getCalculationMethod('RII', displayAxes.rii) },
    { id: 'EII', label: 'Execution Integrity', score: displayAxes.eii, weight: 0.10, desc: 'Real-time clipboard mutation or DOM swap events.', calc: getCalculationMethod('EII', displayAxes.eii) }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-4xl bg-[#050505] border border-zinc-800 rounded-[3rem] p-8 md:p-14 relative shadow-2xl my-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-red-600 opacity-40" />
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors z-50"><X className="w-8 h-8" /></button>
        
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-zinc-900 pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TechLabel text="CORE_THREAT_CALCULATION" color="red" />
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest italic">VG-THREAT-MATRIX-v1.2</span>
              </div>
              <h3 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Heuristic Audit.</h3>
              <p className="font-mono text-xs text-zinc-500">Vector Breakdown: {address.slice(0, 12)}...</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                {realtimeAxes && !isSimulation && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-[8px] font-black text-cyan-500 uppercase tracking-wider">
                    <Wifi className="w-2.5 h-2.5" />
                    REAL-TIME
                  </div>
                )}
                {isSimulation && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[8px] font-black text-blue-500 uppercase tracking-wider">
                    SIMULATION
                  </div>
                )}
              </div>
              <div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Composite Index</div>
              <div className={`text-6xl md:text-8xl font-black italic tracking-tighter ${displayIndex > 75 ? 'text-red-500' : displayIndex > 45 ? 'text-amber-500' : 'text-emerald-500'}`}>{displayIndex}%</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-xs font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-900 pb-4">
              <div className="col-span-2">Axis ID</div>
              <div className="col-span-3">Factor Definition</div>
              <div className="col-span-3 text-center">Heuristic Distribution</div>
              <div className="col-span-2 text-right">Contribution</div>
              <div className="col-span-2">Calculation</div>
            </div>
            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {axisDefinitions.map((axis) => {
                const contribution = (axis.score * axis.weight).toFixed(1);
                const isCritical = axis.score >= 90;
                return (
                  <div key={axis.id} className="grid grid-cols-12 gap-3 items-start p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl group hover:border-zinc-700 transition-all">
                    <div className={`col-span-2 font-mono text-[11px] font-black ${isCritical ? 'text-red-500' : 'text-zinc-500'}`}>{axis.id}</div>
                    <div className="col-span-3">
                      <div className="text-xs font-black text-white uppercase tracking-tight">{axis.label}</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase italic mt-0.5 leading-tight">{axis.desc}</div>
                    </div>
                    <div className="col-span-3">
                      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div className={`h-full transition-all duration-1000 ${isCritical ? 'bg-red-600 shadow-[0_0_10px_#ef4444]' : 'bg-zinc-700'}`} style={{ width: `${axis.score}%` }} />
                      </div>
                      <div className="text-center text-[10px] font-mono text-zinc-700 mt-1.5">{axis.score}/100</div>
                    </div>
                    <div className={`col-span-2 text-right font-mono text-[13px] font-black ${isCritical ? 'text-red-500' : 'text-white'}`}>+{contribution}%</div>
                    <div className="col-span-2">
                      <div className="text-[9px] font-mono text-zinc-600 leading-tight italic">{axis.calc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Flow Type Calculation Explanation */}
          {realtimeAxes && !isSimulation && realtimeStatus?.flowType && (
            <div className="pt-4 border-t border-zinc-900">
              <TechNote title="FLOW TYPE CALCULATION">
                <div className="space-y-2 text-xs text-zinc-400 font-mono">
                  <p><span className="text-cyan-500 font-black">Flow Type:</span> {realtimeStatus.flowType}</p>
                  <p className="text-[10px] leading-relaxed">
                    {realtimeStatus.flowType === 'ORGANIC' 
                      ? 'ORGANIC: Transactions span >7 days or multiple transactions detected, indicating recurrent activity over time.'
                      : realtimeStatus.flowType === 'SINGLE_USE'
                      ? 'SINGLE_USE: 1-3 transactions within 1 day detected, indicating one-off or minimal interaction history.'
                      : 'UNKNOWN: Insufficient telemetry to classify transaction patterns.'}
                  </p>
                  {realtimeStatus.tx15d !== undefined && (
                    <p className="text-[10px] text-zinc-600">
                      <span className="text-zinc-500">15D Transaction Count:</span> {realtimeStatus.tx15d}
                    </p>
                  )}
                </div>
              </TechNote>
            </div>
          )}
          
          <TechNote title="CALCULATION NOTE">
            Weighting is derived from Project Mirror saccadic study datasets. RII (Registry) and EII (Execution) axes trigger immediate 100% overrides upon confirmation of protocol breach.
          </TechNote>
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * MODAL B: IDENTITY PROFILE
 */
const IdentityProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; address: string; threatIndex: number; clusterDensity?: number; campaignId?: string | null }> = ({ isOpen, onClose, address, threatIndex, clusterDensity, campaignId }) => {
  if (!isOpen) return null;

  const telemetryReadouts = [
    { label: 'TRANSACTION HISTORY', val: 'ACTIVE', state: 'POSITIVE' },
    { label: 'CLUSTER DENSITY', val: clusterDensity ? `${clusterDensity} Wallets` : 'UNKNOWN', state: clusterDensity && clusterDensity > 50 ? 'NEGATIVE' : 'NEUTRAL' },
    { label: 'CAMPAIGN AFFILIATION', val: campaignId || 'NONE', state: campaignId ? 'NEGATIVE' : 'POSITIVE' },
    { label: 'IDENTITY VERIFICATION', val: 'NONE', state: 'NEUTRAL' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-[800px] bg-[#050505] border border-zinc-800 rounded-[2.5rem] p-8 md:p-14 relative shadow-2xl my-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors z-50">
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 bg-[#ff4d4d] flex items-center justify-center shadow-[0_0_40px_rgba(255,77,77,0.3)]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                   <div className="absolute bottom-1 right-[-4px] w-6 h-6 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
                     <User size={12} className="text-zinc-500" />
                   </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Mesh Identification</div>
                <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Identity Profile</h3>
                <div className="font-mono text-[10px] md:text-xs text-zinc-500 mt-1">{address.slice(0, 16)}...{address.slice(-16)}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Resilience Score</div>
              <div className={`text-5xl md:text-6xl font-black italic tracking-tighter text-[#ff4d4d]`}>
                {threatIndex}%
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-zinc-900/50" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Sentinel Synthesis</span>
                </div>
                <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2rem] relative group min-h-[300px] flex flex-col justify-center">
                   <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FileText size={48} className="text-white" />
                   </div>
                   <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed italic pr-4">
                     "The address <span className="text-zinc-500 break-all">{address}</span> belongs to an industrialized Sybil cluster managed by Seeder Wallet [Vig1...8821]. Detection of automated mass-dispersion patterns confirms this is an adversarial mimic designed to pollute high-value history logs."
                   </p>
                </div>
              </div>

              <div className={`p-8 border-2 rounded-[2.5rem] space-y-4 ${threatIndex > 75 ? 'bg-red-600/5 border-red-500/40' : 'bg-[#0a0a0a] border-zinc-900'}`}>
                 <div className="flex items-center gap-3 text-[#ff4d4d]">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Current Verdict</span>
                 </div>
                 <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">{threatIndex > 75 ? 'MALICIOUS' : 'Neutral'}</h4>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-4">Telemetry Readouts</h4>
                <div className="space-y-3">
                  {telemetryReadouts.map((readout, i) => (
                    <div key={i} className="p-6 bg-[#0a0a0a] border border-zinc-800 rounded-3xl flex items-center justify-between group hover:border-cyan-500/30 transition-all shadow-inner">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">{readout.label}</span>
                        <span className="text-sm md:text-base font-black text-white uppercase italic">{readout.val}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full shadow-[0_0_12px_currentColor] ${
                        readout.state === 'POSITIVE' ? 'text-emerald-500' : readout.state === 'NEGATIVE' ? 'text-red-500' : 'text-blue-500'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-zinc-700" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">History Check</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase italic">PASS</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Entropy</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase italic">VANITY_FORCED</span>
                  </div>
                  <Lock className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-zinc-900/50" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                   <Globe className="text-cyan-500 animate-spin-slow" size={24} />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Mesh Synchronization</p>
                   <p className="text-[11px] text-zinc-700 font-bold uppercase italic">VG-NODE-8821 // LIVE</p>
                </div>
             </div>
             <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-10 py-5 bg-[#1a0a0a] border border-red-900/40 text-red-500 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-red-900 hover:text-white transition-all shadow-2xl">
                  Report Identity Clash
                </button>
                <button onClick={onClose} className="flex-1 md:flex-none px-10 py-5 bg-black border border-zinc-800 text-zinc-500 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all">
                  New Scan
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const IntentValidatorDemo: React.FC<IntentValidatorDemoProps> = ({ onUsageUpdate, onScanningChange }) => {
  const [historyAddr, setHistoryAddr] = useState('Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90');
  const [currentAddr, setCurrentAddr] = useState('');
  const [source, setSource] = useState<'EXPLORER' | 'SOCIAL' | 'DAPP'>('EXPLORER');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedSims, setCompletedSims] = useState<Set<string>>(new Set());
  
  const [isThreatModalOpen, setIsThreatModalOpen] = useState(false);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);

  const [holdProgress, setHoldProgress] = useState(0);
  const [simLatency, setSimLatency] = useState(12.1);
  const holdTimerRef = useRef<number | null>(null);
  const hudBodyRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [result, setResult] = useState<(ThreatAnalysisResponse & { telemetry?: { age: string; lastTx: string; activity15d: string; latency?: number }; threatIndex?: number; axes?: TIMAxes; projectName?: string; contractAddress?: string; isSimulation?: boolean; }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<RealtimeTelemetry | null>(null);

  /*
   * Fixed: Renamed 'iip' property to 'cri' in all scenarios to match the TIMAxes interface.
   */
  const testScenarios = [
    { id: 'NEW', label: 'New Provenance', addr: '5U398zH6pA2wM1nL9xT4vR7yB8jK2mQ5v', telemetry: { age: '1 Day', lastTx: 'New', activity15d: '0' }, axes: { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 } },
    { id: 'TRUSTED', label: 'Test Trusted', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90', telemetry: { age: '1,204 Days', lastTx: '14m ago', activity15d: '402' }, axes: { vsi: 5, edi: 0, pdi: 10, cri: 0, ipi: 0, rii: 0, eii: 0 } },
    { id: 'POISON', label: 'Visual Poisoning', addr: 'Ab1C00000000000000000000000000Zz90', telemetry: { age: '2,401 Days', lastTx: '14m ago', activity15d: '402' }, axes: { vsi: 95, edi: 92, pdi: 50, cri: 30, ipi: 80, rii: 0, eii: 0 } },
    { id: 'ZERO_VALUE_SPOOF', label: 'Zero-Value Injection', addr: '6vX9f72Lp6mX9wR7yT5vB4nQ8jK3mZzM1', telemetry: { age: '1 Day', lastTx: 'New', activity15d: '20,000+' }, axes: { vsi: 85, edi: 98, pdi: 100, cri: 40, ipi: 100, rii: 0, eii: 0 } },
    { id: 'CLIPBOARD', label: 'Clipboard Intercept', addr: 'Sol1Restored92kLp6mX9wR7yT5vB4nQ8jK3', telemetry: { age: '1,102 Days', lastTx: '12m ago', activity15d: '55' }, axes: { vsi: 10, edi: 0, pdi: 70, cri: 90, ipi: 10, rii: 0, eii: 100 } },
    { id: 'DUST', label: 'Dust Injection', addr: 'Dust99kLp6mX9wR7yT5vB4nQ8jK3mZzDust', telemetry: { age: '42 Days', lastTx: '14d ago', activity15d: '1' }, axes: { vsi: 50, edi: 40, pdi: 60, cri: 30, ipi: 100, rii: 0, eii: 0 } },
    { id: 'SIMILARITY', label: 'Similarity/Entropy', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz91', telemetry: { age: '891 Days', lastTx: '2h ago', activity15d: '82' }, axes: { vsi: 85, edi: 60, pdi: 30, cri: 30, ipi: 10, rii: 0, eii: 0 } },
    { id: 'MINT', label: 'Mint Mismatch', addr: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', telemetry: { age: '12 Days', lastTx: '3h ago', activity15d: '1,209' }, axes: { vsi: 20, edi: 0, pdi: 80, cri: 30, ipi: 10, rii: 100, eii: 0 } },
    { id: 'MARKET_INTEL', label: 'Pump.fun Rug-Risk', addr: 'Rug44DeployerX992811x772199291120038', projectName: 'RUG_PUMP_EXPERIMENTAL', contractAddress: 'Rug44DeployerX992811x772199291120038', telemetry: { age: '4 Minutes', lastTx: 'New', activity15d: '142' }, axes: { vsi: 20, edi: 98, pdi: 100, cri: 90, ipi: 80, rii: 0, eii: 0 } },
    { id: 'ACCUMULATION_TRAP', label: 'Stealth Accumulation', addr: 'VGAccNodeX772199291120038xPoisoN', projectName: 'STEALTH_LIQUIDITY_CORE', contractAddress: 'VGAccNodeX772199291120038xPoisoN', telemetry: { age: '340 Days', lastTx: 'New', activity15d: '1,200' }, axes: { vsi: 20, edi: 85, pdi: 40, cri: 80, ipi: 95, rii: 0, eii: 0 } },
    { id: 'PHISHING', label: 'Phishing Shield', addr: '6vX9f72Lp6mX9wR7yT5vB4nQ8jK3mZzM1', telemetry: { age: '3 Days', lastTx: 'Never', activity15d: '1' }, axes: { vsi: 30, edi: 0, pdi: 100, cri: 100, ipi: 0, rii: 0, eii: 0 } },
    { id: 'SUPPLY_POISONING', label: 'Clustered Seeding', addr: 'Seeder8821xPoisoN7729110028x992211', projectName: 'SYBIL_DISPERSION_NODE', contractAddress: 'Seeder8821xPoisoN7729110028x992211', telemetry: { age: '4h', lastTx: 'New', activity15d: '82,000+' }, axes: { vsi: 40, edi: 98, pdi: 100, cri: 20, ipi: 100, rii: 0, eii: 0 } }
  ];

  const calculateThreatIndex = (axes: TIMAxes, telemetry?: RealtimeTelemetry | null, isRealInspection?: boolean) => {
    // Use real-time calculation if telemetry is available and this is a real inspection
    if (telemetry && isRealInspection && telemetry.status !== 'OFFLINE') {
      const realtimeAxes = calculateRealtimeAxes(telemetry, source, currentAddr);
      if (realtimeAxes.rii === 100 || realtimeAxes.eii === 100) return 100;
      let total = (0.20 * realtimeAxes.vsi + 0.15 * realtimeAxes.edi + 0.15 * realtimeAxes.pdi + 0.15 * realtimeAxes.cri + 0.15 * realtimeAxes.ipi + 0.10 * realtimeAxes.rii + 0.10 * realtimeAxes.eii);
      return Math.round(total);
    }
    // Fallback to provided axes
    if (axes.rii === 100 || axes.eii === 100) return 100;
    let total = (0.20 * axes.vsi + 0.15 * axes.edi + 0.15 * axes.pdi + 0.15 * axes.cri + 0.15 * axes.ipi + 0.10 * axes.rii + 0.10 * axes.eii);
    return Math.round(total);
  };

  const injectScenario = (sc: typeof testScenarios[0]) => { setCurrentAddr(sc.addr); setResult(null); setError(null); };

  const checkScrollOverflow = () => {
    if (hudBodyRef.current) {
      const { scrollHeight, clientHeight } = hudBodyRef.current;
      setShowScrollHint(scrollHeight > clientHeight + 10);
    }
  };

  const handleHudScroll = () => {
    if (showScrollHint && hudBodyRef.current) {
      if (hudBodyRef.current.scrollTop > 20) {
        setShowScrollHint(false);
      }
    }
  };

  useEffect(() => {
    if (result) {
      // Allow time for DOM to update and layout to calculate
      const timer = setTimeout(checkScrollOverflow, 300);
      return () => clearTimeout(timer);
    } else {
      setShowScrollHint(false);
    }
  }, [result]);

  const handleValidate = async () => {
    if (!currentAddr) return;
    setIsAnalyzing(true);
    setError(null);
    setRealtimeStatus(null);
    onScanningChange?.(true);

    // Start Helius fetch in parallel (non-blocking)
    const heliusPromise = getAddressTelemetry(currentAddr).catch(() => ({ status: 'OFFLINE' as const }));

    try {
      const matchedScenario = testScenarios.find(s => s.addr === currentAddr);
      const { data, usage } = await routeSecurityIntent(currentAddr, historyAddr, source);
      
      onUsageUpdate?.(usage);
      
      // Determine if this is NEW_PROVENANCE mode (Real address with no scenario match)
      const isRealInspection = !matchedScenario;
      const finalIntentState = isRealInspection ? 'NEW' : (matchedScenario?.id as IntentCategory) || data.intentState;
      
      const latency = 9.2 + (Math.random() * 2.1);
      setSimLatency(latency);

      // Initial result with base threat index (will be updated when telemetry arrives)
      const baseAxes = matchedScenario?.axes || { vsi: data.riskScore || 10, edi: 10, pdi: 100, cri: 30, ipi: 5, rii: 0, eii: 0 };
      const baseThreatIndex = calculateThreatIndex(baseAxes, null, isRealInspection);

      setResult({ 
        ...data, 
        intentState: finalIntentState,
        telemetry: { ...(matchedScenario?.telemetry || { age: data.onChainAge, lastTx: 'New', activity15d: '0' }), latency: latency },
        threatIndex: isRealInspection ? baseThreatIndex : baseThreatIndex,
        axes: baseAxes,
        projectName: matchedScenario?.projectName, 
        contractAddress: matchedScenario?.contractAddress,
        isSimulation: !!matchedScenario
      });

      if (matchedScenario) setCompletedSims(prev => new Set([...prev, matchedScenario.id]));

      // Update real-time status and recalculate threat index when Helius completes (non-blocking)
      heliusPromise.then((telemetry) => {
        setRealtimeStatus(telemetry);
        
        // Recalculate threat index with real-time data if this is a real inspection
        if (isRealInspection && telemetry.status !== 'OFFLINE') {
          const realtimeAxes = calculateRealtimeAxes(telemetry, source, currentAddr);
          const realtimeThreatIndex = calculateThreatIndex(realtimeAxes, telemetry, true);
          
          // Update result with real-time calculations
          setResult(prev => prev ? {
            ...prev,
            threatIndex: realtimeThreatIndex,
            axes: realtimeAxes
          } : null);
        }
      });
    } catch (err: any) {
      console.error('[SIMULATION_CRASH]', err);
      const errorMessage = err?.message || String(err);
      if (errorMessage.includes('BACKEND_NOT_FOUND') || errorMessage.includes('API_KEY_MISSING')) {
        setError(errorMessage);
      } else {
        setError(`SIMULATION_ERROR: The request timed out or returned an invalid response. ${errorMessage}`);
      }
      // Still try to get Helius data even if simulation fails
      heliusPromise.then((telemetry) => {
        setRealtimeStatus(telemetry);
      });
    } finally {
      setIsAnalyzing(false);
      onScanningChange?.(false);
    }
  };

  const startHold = () => { const startTime = Date.now(); holdTimerRef.current = window.setInterval(() => { const elapsed = Date.now() - startTime; const p = Math.min(100, (elapsed / 1500) * 100); setHoldProgress(p); if (p >= 100) { clearInterval(holdTimerRef.current!); handleOverride(); } }, 10); };
  const cancelHold = () => { if (holdTimerRef.current) clearInterval(holdTimerRef.current); setHoldProgress(0); };
  const handleOverride = () => {
    const currentBri = parseInt(localStorage.getItem('vigil_user_bri') || '100');
    const nextBri = Math.max(0, Math.min(100, currentBri - 15));
    localStorage.setItem('vigil_user_bri', nextBri.toString());
    setResult(null);
  };

  const getStatusConfig = (state: string) => {
    switch (state) {
      case 'POISON': return { color: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500/20', icon: <Skull className="w-6 h-6" />, label: 'POSSIBLE ADDRESS POISONING', glow: 'bg-red-600', animation: 'animate-scan-vertical', primaryCta: "HALT: ADDRESS POISONING DETECTED", secondaryCta: "OVERRIDE: PROCEED WITH RISK", why: "DEFINITION: Critical detection of vanity mimics designed to exploit the human eye's 8-character verification gap.\nEXAMPLE: An attacker sees you frequently send to Ab1C...Zz90 and generates a fake address Ab1C...Hacker...Zz90. You almost click it because the start and end look identical." };
      case 'ZERO_VALUE_SPOOF': return { color: 'text-red-600', bg: 'bg-red-600/5', border: 'border-red-600/40', icon: <Ghost className="w-6 h-6" />, label: 'ZERO_VALUE_INJECTION_DETECTED', glow: 'bg-red-700', animation: 'animate-glitch', primaryCta: "HALT: HISTORY TAMPERING", secondaryCta: "OVERRIDE: TRUST INJECTION", why: "DEFINITION: High-loss variant of dusting that injects a 'Sent' record into history without moving assets or requiring balance.\nEXAMPLE: A seeder program triggers a 0 SOL transfer to your wallet. You see a 'Sent' record in history and accidentally copy the look-alike address for your next main transfer." };
      case 'SUPPLY_POISONING': return { color: 'text-red-600', bg: 'bg-red-600/10', border: 'border-red-500/60', icon: <Radar className="w-6 h-6" />, label: 'INDUSTRIALIZED_SEEDING_DETECTED', glow: 'bg-red-700', animation: 'animate-pulse', primaryCta: "HALT: SYBIL CLUSTER ACTIVE", secondaryCta: "OVERRIDE: TRUST MOTHER_WALLET", why: "DEFINITION: Detection of an industrialized Sybil cluster where a single 'Mother Wallet' funds thousands of fresh mimics.\nEXAMPLE: VIGIL identifies that this address was funded by 0x8821...Seeder, which has generated 82,000 identical look-alike addresses in the last 24 hours." };
      case 'ACCUMULATION_TRAP': return { color: 'text-orange-500', bg: 'bg-orange-500/5', border: 'border-orange-500/40', icon: <TrendingUp className="w-6 h-6" />, label: 'STEALTH_ACCUMULATION_DETECTED', glow: 'bg-orange-600', animation: 'animate-sonar-ripple', primaryCta: "ABORT: LIQUIDITY RISK EXTREME", secondaryCta: "IGNORE FORENSIC: TRUST CLUSTER", why: "DEFINITION: Detection of a stealth entity accumulating >1% total supply or >2% rapid accumulation (0-5 days).\nEXAMPLE: A single cluster of linked wallets swept 2.1% of supply in 72 hours. This positioning allows the entity to drain 80% of liquidity in one transaction." };
      case 'MARKET_INTEL': return { color: 'text-red-600', bg: 'bg-red-600/5', border: 'border-red-600/40', icon: <Target className="w-6 h-6" />, label: 'CRITICAL RUG RISK: BUNDLED', glow: 'bg-red-700', animation: 'animate-strobe', primaryCta: "ABORT: SYSTEMIC MANIPULATION", secondaryCta: "IGNORE INTEL: EXECUTE ENTRY", why: "DEFINITION: Forensic detection of 'Bundling' where one entity funds multiple wallets to control supply before retail entry.\nEXAMPLE: On Pump.fun, a deployer uses 30 wallets to buy 40% of supply in Block 0. VIGIL identifies the shared funding source and flags the trap." };
      case 'PHISHING': return { color: 'text-purple-500', bg: 'bg-purple-500/5', border: 'border-purple-500/30', icon: <Radar className="w-6 h-6" />, label: 'PHISHING SHIELD ACTIVE', glow: 'bg-purple-600', animation: 'animate-sonar-ripple', primaryCta: "TERMINAL ABORT: SOURCE UNTRUSTED", secondaryCta: "IGNORE SHIELD: TRUST MANUALLY", why: "DEFINITION: Interception triggered by high-risk source contexts such as social DMs or unverified dApp portals.\nEXAMPLE: You copy a 'Treasury Address' from a Telegram DM or a random X (Twitter) comment; VIGIL flags the source as a high-risk entry point." };
      case 'DUST': return { color: 'text-amber-500', bg: 'bg-emerald-500/5', border: 'border-amber-500/20', icon: <AlertOctagon className="w-6 h-6 text-amber-500" />, label: 'DUST TRANSFER DETECTED', glow: 'bg-amber-600', animation: 'animate-float-dust', primaryCta: "DISCARD INJECTED DATA", secondaryCta: "PROCEED: DUST VERIFIED", why: "DEFINITION: Identification of unsolicited transfers used to pollute transaction logs with malicious destination history.\nEXAMPLE: A bot sends 0.000001 SOL to your wallet so that their malicious address appears at the top of your 'Recent Transactions' list." };
      case 'NEW': return { color: 'text-cyan-500', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', icon: <Fingerprint className="w-6 h-6" />, label: 'REPORT: NEW_PROVENANCE', glow: 'bg-cyan-600', animation: 'animate-breathe', primaryCta: "INITIATE FORENSIC VERIFICATION", secondaryCta: "ABORT: UNTRUSTED_PROVENANCE", why: "DEFINITION: Forensic alert for addresses with no prior interaction history or established on-chain reputation within your local trust graph.\nDIRECTIVE: Standard manual verification of the center-string characters is advised. This address has not been observed by your local node before this cycle." };
      case 'TRUSTED': return { color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', icon: <ShieldCheck className="w-6 h-6" />, label: 'TRUSTED DESTINATION', glow: 'bg-emerald-600', animation: '', primaryCta: "RETURN TO SOURCE", secondaryCta: "SETTLE INTENT: CONFIRM", why: "DEFINITION: Verification of intent against an established safe node within your local historical trust graph.\nEXAMPLE: You are sending SOL to your hardware wallet address that you have used successfully 20 times this year." };
      case 'VIP_MIMIC': return { color: 'text-red-600', bg: 'bg-red-600/10', border: 'border-red-600/40', icon: <Skull className="w-6 h-6" />, label: 'REGISTRY_INTEGRITY_BREACH', glow: 'bg-red-700', animation: 'animate-strobe', primaryCta: "HALT: OFFICIAL ENTITY SPOOF", secondaryCta: "IGNORE REGISTRY: PROCEED", why: "DEFINITION: Detection of a high-fidelity mimic targeting a Protocol-Critical Node. The edges match exactly but the identity fails Sovereign Registry verification." };
      default: return { color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: <Info className="w-5 h-5" />, label: 'REPORT: INFO WARNING', glow: 'bg-blue-600', animation: '', primaryCta: "ABORT TRANSACTION", secondaryCta: "PROCEED MANUALLY", why: "Analysis Layer Online. System monitoring interaction context and validating structural intent." };
    }
  };

  return (
    // DESIGN RULE: Root container locked to h-screen to prevent page scrolling
    <section id="system-simulation" className="h-screen max-h-screen overflow-hidden bg-[#020202] relative z-10 flex flex-col">
      
      {result?.axes && <ThreatIndexModal 
        isOpen={isThreatModalOpen} 
        onClose={() => setIsThreatModalOpen(false)} 
        axes={result.axes} 
        totalIndex={result.threatIndex || 0} 
        address={currentAddr}
        realtimeStatus={realtimeStatus}
        source={source}
        isSimulation={result.isSimulation}
      />}
      {result && <IdentityProfileModal isOpen={isIdentityModalOpen} onClose={() => setIsIdentityModalOpen(false)} address={currentAddr} threatIndex={result.threatIndex || 0} clusterDensity={result.sybilClusterDensity} campaignId={result.campaignId} />}

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col overflow-hidden px-6 md:px-20 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch flex-1 min-h-0">
          
          {/* LEFT COLUMN: Simulation Controls ONLY - NON-SCROLLABLE */}
          <div className="lg:w-[42%] space-y-6 flex flex-col w-full overflow-hidden">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Sandbox Environment // Execution</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Intent Validator.</h2>
              </div>
              <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed italic animate-in fade-in duration-1000">"Validating user <span className="text-blue-500">belief against reality.</span> Ensure the destination you see is the one you sign."</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] flex items-center gap-2"><Zap className="w-3 h-3 text-amber-500" /> SIMULATION CONTROL</label>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">STATUS: {completedSims.size} / 12 VECTORS ANALYZED</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 border border-blue-500/20 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                  <MousePointerClick className="w-4 h-4 text-blue-500 relative z-10" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest relative z-10 leading-tight">To synchronize biological perception with VIGIL Layer 0.5, execute all simulation vectors.</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 overflow-visible pt-2">
                {testScenarios.map((sc) => (
                  <button key={sc.id} onClick={() => injectScenario(sc)} className={`py-3.5 px-4 border rounded-xl hover:border-blue-500/50 hover:bg-blue-600/5 transition-all group relative overflow-visible active:scale-[0.97] flex items-center justify-center ${currentAddr === sc.addr ? 'bg-zinc-900 border-blue-500/50 shadow-lg shadow-blue-500/5' : 'bg-zinc-950 border-zinc-900'}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors z-10 text-center ${currentAddr === sc.addr ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>{sc.label}</span>
                    {completedSims.has(sc.id) && <div className="absolute left-2 top-2 text-emerald-500"><CheckCircle2 size={10} /></div>}
                    <div className="absolute top-0 right-2 -translate-y-1/2 px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[7px] font-black text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all whitespace-nowrap z-20">INJECT</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* SOURCE CONTEXT MOVED TO BOTTOM OF LEFT PANEL */}
            <div className="space-y-4 pt-4 border-t border-zinc-900/50 mt-auto">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] text-center block w-full">Source Context</label>
                <div className="flex gap-2">
                  {[{ id: 'EXPLORER', icon: <Globe className="w-3.5 h-3.5" />, label: 'Explorer' }, { id: 'DAPP', icon: <ExternalLink className="w-3.5 h-3.5" />, label: 'dApp' }, { id: 'SOCIAL', icon: <MessageSquare className="w-3.5 h-3.5" />, label: 'Social' }].map((s) => (
                    <button key={s.id} onClick={() => setSource(s.id as any)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${source === s.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-[#080808] border-zinc-900 text-zinc-500'}`}>{s.icon} {s.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Pre-Simulation Inputs OR Post-Simulation HUD */}
          <div className="lg:w-[58%] w-full flex flex-col">
            <div className={`h-full bg-[#0a0a0a] border-2 rounded-[2.5rem] relative overflow-hidden transition-[border-color,box-shadow] duration-700 flex flex-col ${result ? 'min-h-0' : ''} ${result ? getStatusConfig(result.intentState).border : 'border-zinc-900 shadow-2xl'}`}>
              
              {result && (
                <>
                  <div className={`absolute -top-24 -right-24 w-64 h-64 ${getStatusConfig(result.intentState).glow} blur-[80px] opacity-20 pointer-events-none transition-opacity`} />
                  <div className={`absolute inset-0 pointer-events-none opacity-40 ${getStatusConfig(result.intentState).animation}`} />
                </>
              )}

              {/* PRE-SIMULATION STATE: Standby + Inputs */}
              {!result && !isAnalyzing && !error && (
                <div className="h-full flex flex-col items-center justify-center px-6 md:px-12 py-5 animate-in fade-in duration-1000">
                  <div className="flex flex-col items-center gap-4 w-full max-w-xl">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/10 blur-[60px] animate-pulse rounded-full" />
                        <Brain className="w-20 h-20 text-zinc-700 relative z-10 animate-pulse" strokeWidth={0.8} />
                      </div>
                      <div className="space-y-3 relative z-10 text-center">
                        <div className="space-y-1.5">
                          <h3 className="text-xl md:text-2xl font-black text-zinc-400 uppercase tracking-[0.4em]">
                            Awaiting Simulation
                          </h3>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">
                            LISTENING_FOR_INTENT
                          </p>
                        </div>
                        <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.8em] block">
                          Cognitive Core Standby
                        </span>
                      </div>
                    </div>

                    <div className="h-4" />

                    <div className="w-full space-y-3">
                      <div className="space-y-1.5 relative">
                        <label className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] flex items-center justify-center gap-2 w-full">
                          <ClipboardPaste className="w-3.5 h-3.5" />
                          Transfer Destination
                        </label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={currentAddr}
                            onChange={(e) => setCurrentAddr(e.target.value)}
                            placeholder="PASTE ADDRESS..."
                            className="w-full bg-[#080808] border-2 border-zinc-900 rounded-2xl py-3 px-6 text-[10px] font-mono text-white placeholder:text-zinc-800 focus:outline-none focus:border-blue-600 transition-all uppercase shadow-inner text-center"
                          />
                        </div>
                        {/* Ghost Load Bar */}
                        {isAnalyzing && (
                          <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-ghost-load" style={{ width: '100%' }} />
                        )}
                      </div>
                      <button
                        onClick={handleValidate}
                        disabled={isAnalyzing || !isValidSolanaAddress(currentAddr)}
                        className={`w-full py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-2xl ${
                          isAnalyzing
                            ? 'bg-zinc-950 text-zinc-800 cursor-wait border border-zinc-900'
                            : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {isAnalyzing ? (
                          <>
                            <Activity className="w-4 h-4 animate-pulse" />
                            ANALYZING...
                          </>
                        ) : (
                          <>
                            <Scan className="w-4 h-4" />
                            VALIDATE TRANSACTION
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ERROR STATE */}
              {error && !isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000 p-8">
                  <div className="flex flex-col items-center gap-6 max-w-lg">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-red-500/10 blur-[60px] animate-pulse rounded-full" />
                      <AlertOctagon className="w-20 h-20 text-red-500 relative z-10" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-4 relative z-10">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-black text-red-500 uppercase tracking-[0.4em]">Configuration Error</h3>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">API_KEY_NOT_CONFIGURED</p>
                      </div>
                      <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
                      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3">
                        <p className="text-xs md:text-sm text-zinc-300 font-medium leading-relaxed">{error}</p>
                        <div className="pt-2 border-t border-red-500/10">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Solution: Set API_KEY in .env or environment variables</p>
                        </div>
                      </div>
                      <button onClick={() => { setError(null); setResult(null); }} className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-all">Dismiss</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ANALYZING STATE */}
              {isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <VigilScanner label="EXECUTING_HEURISTIC_MATRIX" size="lg" />
                </div>
              )}

              {/* POST-SIMULATION HUD */}
              {result && (
                <div className="flex flex-col h-full min-h-0 animate-in fade-in duration-700 relative z-10 p-4 md:p-6">
                  {/* HUD HEADER - FIXED */}
                  <div className="pb-2 shrink-0">
                    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border shadow-2xl transition-all duration-500 flex-shrink-0 ${getStatusConfig(result.intentState).color} ${getStatusConfig(result.intentState).border} ${getStatusConfig(result.intentState).bg}`}>{getStatusConfig(result.intentState).icon}</div>
                        <div className="space-y-1 min-w-0">
                          <h3 className={`text-xl md:text-2xl font-black italic uppercase tracking-tighter ${getStatusConfig(result.intentState).color} break-words`}>{getStatusConfig(result.intentState).label}</h3>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusConfig(result.intentState).color}`} />
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Active_Interception_Layer</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => setIsThreatModalOpen(true)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 bg-black border-2 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 animate-inspect-flicker whitespace-nowrap ${
                            result.threatIndex! > 75
                              ? 'border-red-500/60'
                              : result.threatIndex! > 45
                              ? 'border-amber-500/60'
                              : 'border-emerald-500/60'
                          }`}
                        >
                      <Calculator className={`w-4 h-4 ${result.threatIndex! > 75 ? 'text-red-500' : result.threatIndex! > 45 ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <span className={`text-xs font-black italic ${result.threatIndex! > 75 ? 'text-red-500' : result.threatIndex! > 45 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.threatIndex}%</span>
                      <div className="h-3 w-[1px] bg-zinc-800 mx-1" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Threat Math</span>
                    </button>
                        <button
                          onClick={() => setIsIdentityModalOpen(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-black border-2 border-cyan-500/60 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 animate-inspect-flicker delay-300 whitespace-nowrap"
                        >
                      <UserPlus className="w-4 h-4 text-cyan-500" />
                      <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Identity Profile</span>
                    </button>
                  </div>
                    </div>

                {result.projectName && (
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 py-2 border-b border-white/5 animate-in fade-in duration-500">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] block">Project name:</span>
                          <span className="text-[14px] font-black text-white italic uppercase tracking-tighter">{result.projectName}</span>
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] block">contract address:</span>
                          <span className="text-[11px] font-mono text-cyan-500 break-all">{result.contractAddress}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* HUD BODY - SCROLLABLE CONTENT */}
                  <div ref={hudBodyRef} onScroll={handleHudScroll} className="flex-1 overflow-y-auto custom-scrollbar pt-2 space-y-6 pb-0 min-h-0">
                    {/* Retinal Core Entropy verification - Only for NEW or POISON states */}
                    {(result.intentState === 'NEW' || result.intentState === 'POISON') && (
                      <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">RETINAL_CORE_VERIFICATION</span>
                           <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest italic">Target Payload</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">VERIFY_CORE_ENTROPY</span>
                           <div className="font-mono text-[14px] md:text-base flex items-center gap-1.5 p-4 bg-black border border-zinc-800 rounded-xl w-full justify-center">
                              <span className="text-cyan-500 font-black shadow-[0_0_10px_rgba(6,182,212,0.4)]">{currentAddr.slice(0, 4)}</span>
                              <span className="text-zinc-800 opacity-40 select-all tracking-tighter">{currentAddr.slice(4, -4)}</span>
                              <span className="text-cyan-500 font-black shadow-[0_0_10px_rgba(6,182,212,0.4)]">{currentAddr.slice(-4)}</span>
                           </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 px-2">
                      <div className="flex items-center gap-2">
                        <Info className={`w-3 h-3 ${getStatusConfig(result.intentState).color}`} />
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] italic">Interception Logic</span>
                      </div>
                      <div className="space-y-4 text-zinc-400 text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line">
                        {getStatusConfig(result.intentState).why.split('\n').map((line, i) => (
                          <div key={i} className={i > 0 ? 'pt-4 border-t border-white/5' : ''}>
                            {line.startsWith('DEFINITION:') ? (
                              <div className="flex flex-col gap-2">
                                <span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20`}>DEFINITION</span>
                                <span className="italic">"{line.replace('DEFINITION:', '').trim()}"</span>
                              </div>
                            ) : line.startsWith('DIRECTIVE:') ? (
                              <div className="flex flex-col gap-2">
                                <span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-500 border border-cyan-500/20`}>DIRECTIVE</span>
                                <span className="italic text-zinc-200">"{line.replace('DIRECTIVE:', '').trim()}"</span>
                              </div>
                            ) : line.startsWith('EXAMPLE:') ? (
                              <div className="flex flex-col gap-2">
                                <span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20`}>EXAMPLE</span>
                                <span className="italic text-zinc-500">"{line.replace('EXAMPLE:', '').trim()}"</span>
                              </div>
                            ) : line}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {result.telemetry && (
                      <div className="p-4 bg-black/40 border border-white/5 rounded-3xl space-y-4 shadow-inner relative overflow-hidden">
                        {result.telemetry.latency && result.telemetry.latency <= 12 && (
                          <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/[0.02] pointer-events-none" />
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">
                              Subject Telemetry
                            </span>
                          </div>
                          {result.telemetry.latency && result.telemetry.latency <= 12.1 && (
                            <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md animate-in slide-in-from-right-2">
                              <Gauge className="w-2.5 h-2.5 text-emerald-500" />
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">
                                Sub-Frame Validated
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Real-time Helius Status Badges */}
                        {realtimeStatus && (
                          <div className="flex flex-wrap items-center gap-1.5 mb-2 pb-2 border-b border-white/5">
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                              realtimeStatus.status === 'CONNECTED' 
                                ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' 
                                : realtimeStatus.status === 'DEGRADED'
                                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                : 'bg-zinc-700/10 text-zinc-500 border border-zinc-700/20'
                            }`}>
                              <Wifi className={`w-2.5 h-2.5 ${realtimeStatus.status === 'CONNECTED' ? 'text-cyan-500' : realtimeStatus.status === 'DEGRADED' ? 'text-amber-500' : 'text-zinc-500'}`} />
                              {realtimeStatus.status === 'CONNECTED' ? 'LIVE TELEMETRY: ACTIVE' : realtimeStatus.status === 'DEGRADED' ? 'LIVE TELEMETRY: DEGRADED' : 'LIVE TELEMETRY: UNAVAILABLE'}
                            </div>
                            {realtimeStatus.addressAge && (
                              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                <Clock className="w-2.5 h-2.5 text-slate-400" />
                                AGE: {realtimeStatus.addressAge}
                              </div>
                            )}
                            {realtimeStatus.fundingSource && realtimeStatus.fundingSource !== 'UNKNOWN' && (
                              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                <User className="w-2.5 h-2.5 text-slate-400" />
                                {realtimeStatus.fundingSource}
                              </div>
                            )}
                            {realtimeStatus.activityPulse && (
                              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                realtimeStatus.activityPulse === 'ACTIVE'
                                  ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                  : 'bg-slate-600/10 text-slate-500 border border-slate-600/20'
                              }`}>
                                <Activity className={`w-2.5 h-2.5 ${realtimeStatus.activityPulse === 'ACTIVE' ? 'text-slate-400' : 'text-slate-500'}`} />
                                {realtimeStatus.activityPulse === 'ACTIVE' ? '<1H' : '>30D'}
                              </div>
                            )}
                            {realtimeStatus.clusterSignal && (
                              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                <Radar className="w-2.5 h-2.5 text-slate-400" />
                                {realtimeStatus.clusterSignal.replace('_', ' ')}
                              </div>
                            )}
                          </div>
                        )}
                        {(() => {
                          const base = result.telemetry!;
                          const isSimulationResult = result.isSimulation;
                          const live = !isSimulationResult && realtimeStatus && (realtimeStatus.status === 'CONNECTED' || realtimeStatus.status === 'DEGRADED') ? realtimeStatus : null;

                          const displayAge = live?.addressAge || base.age;
                          const displayLast = live?.lastSeen || base.lastTx || 'Unknown';
                          const display15d = live?.tx15d != null ? String(live.tx15d) : base.activity15d;
                          // Show balance field if we have real-time telemetry (even if 0 or undefined)
                          const displayBalance10d = !isSimulationResult && live 
                            ? (live.balance10dAvg !== undefined ? live.balance10dAvg.toFixed(4) : '0.0000')
                            : null;

                          return (
                            <>
                            <div className={`grid gap-4 ${displayBalance10d !== null ? 'grid-cols-5' : 'grid-cols-4'}`}>
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                              Address Age
                            </span>
                            <span className="text-[11px] font-mono font-bold text-zinc-200 tabular-nums">
                              {displayAge}
                            </span>
                          </div>
                          <div className="space-y-1 border-x border-white/5 px-4">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                              Last Time
                            </span>
                            <span className="text-[11px] font-mono font-bold text-zinc-200 tabular-nums">
                              {displayLast}
                            </span>
                          </div>
                          <div className="space-y-1 border-r border-white/5 pr-4">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                              15D Tx
                            </span>
                            <span className="text-[11px] font-mono font-bold text-zinc-200 tabular-nums">
                              {display15d}
                            </span>
                          </div>
                          {displayBalance10d !== null && (
                            <div className="space-y-1 border-r border-white/5 pr-4">
                              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                                10-Day Balance Persistence (SOL)
                              </span>
                              <span className="text-[11px] font-mono font-bold text-zinc-200 tabular-nums">
                                {displayBalance10d}
                              </span>
                            </div>
                          )}
                    <div className="space-y-1">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                              Latency
                            </span>
                            <div className="flex items-center gap-1">
                              <span
                                className={`text-[11px] font-mono font-black tabular-nums ${
                                  result.telemetry.latency && result.telemetry.latency <= 12.1
                                    ? 'text-emerald-500'
                                    : 'text-amber-500'
                                }`}
                              >
                                {result.telemetry.latency?.toFixed(1)}ms
                              </span>
                              <div
                                className={`w-1 h-1 rounded-full animate-pulse ${
                                  result.telemetry.latency && result.telemetry.latency <= 12.1
                                    ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                                    : 'bg-amber-500'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        {displayBalance10d !== null && (
                          <div className="mt-2 pt-2 border-t border-white/5 space-y-1">
                            <p className="text-[8px] font-mono text-zinc-600 italic leading-tight">
                              Represents average value retained by this address over the last 10 days.
                              Indicates balance persistence, not destination legitimacy.
                            </p>
                            {/* FUNDED BY — surfaced only for real addresses when Helius provides a best-effort funder */}
                            {live?.fundedBy && (
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                                  Funded By
                                </span>
                                <span className="text-[10px] font-mono text-zinc-300 truncate max-w-[60%]" title={live.fundedBy}>
                                  {live.fundedBy}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                          </>
                          );
                        })()}
                        
                        {/* NEW_PROVENANCE ENHANCEMENTS - Only for real address inspection */}
                        {result.intentState === 'NEW' && result.isSimulation !== true && realtimeStatus && (
                          <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                            {/* SIMILARITY COLLISION */}
                            {realtimeStatus.similarityCollision && (
                              <div className="space-y-1">
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                                  Similarity Collision
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                                    realtimeStatus.similarityCollision === 'ZERO_DETECTION'
                                      ? 'text-zinc-400'
                                      : realtimeStatus.similarityCollision === 'LOCAL_MATCH'
                                      ? 'text-amber-500'
                                      : 'text-red-500'
                                  }`}>
                                    {realtimeStatus.similarityCollision === 'ZERO_DETECTION' 
                                      ? 'ZERO_DETECTION' 
                                      : realtimeStatus.similarityCollision === 'LOCAL_MATCH'
                                      ? 'LOCAL_MATCH'
                                      : 'SOVEREIGN_NODE_MIMIC'}
                                  </span>
                                  {realtimeStatus.similarityCollision !== 'ZERO_DETECTION' && (
                                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* FLOW TYPE */}
                            {realtimeStatus.flowType && (
                              <div className="space-y-1">
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                                  Flow Type
                                </span>
                                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                                  realtimeStatus.flowType === 'ORGANIC'
                                    ? 'text-zinc-300'
                                    : realtimeStatus.flowType === 'SINGLE_USE'
                                    ? 'text-zinc-400'
                                    : 'text-zinc-500'
                                }`}>
                                  {realtimeStatus.flowType}
                                </span>
                              </div>
                            )}
                            
                            {/* BALANCE SIGNALS */}
                            {(realtimeStatus.balanceBand !== undefined || realtimeStatus.tokenCount !== undefined) && (
                              <div className="space-y-2 pt-2 border-t border-white/5">
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] block">
                                  Balance Signals
                                </span>
                                <div className="flex flex-col gap-2">
                                  {realtimeStatus.balanceBand && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-wider">SOL Balance</span>
                                      <span className="text-[10px] font-mono font-bold text-zinc-300">{realtimeStatus.balanceBand}</span>
                                    </div>
                                  )}
                                  {realtimeStatus.tokenCount !== undefined && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-wider">Token Accounts</span>
                                      <span className="text-[10px] font-mono font-bold text-zinc-300">{realtimeStatus.tokenCount}</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-[8px] font-mono text-zinc-600 italic leading-tight pt-1">
                                  Asset presence does not imply legitimacy.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* PRIMARY ACTION BUTTONS - Immediately after telemetry */}
                    <div className="pt-4 space-y-3">
                      <button onClick={() => setIsIdentityModalOpen(true)} className={`w-full py-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center gap-4 group/action hover:border-zinc-700 transition-all active:scale-[0.98] ${getStatusConfig(result.intentState).color}`}>
                        <Fingerprint className="w-5 h-5" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">{getStatusConfig(result.intentState).primaryCta}</span>
                      </button>
                      <button onClick={() => setResult(null)} className="w-full py-3.5 bg-zinc-950 border border-red-900/40 text-red-500 rounded-2xl flex items-center justify-center gap-3 group/risky hover:border-red-900/50 transition-all active:scale-[0.99] overflow-hidden">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">{getStatusConfig(result.intentState).secondaryCta}</span>
                      </button>
                      <button onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold} onTouchStart={startHold} onTouchEnd={cancelHold} className="relative w-full py-3.5 bg-transparent border border-zinc-900 rounded-2xl flex items-center justify-center gap-3 group/risky hover:border-emerald-900/50 transition-all active:scale-[0.99] overflow-hidden">
                        <div className="absolute top-0 left-0 bottom-0 bg-emerald-600/10 transition-all duration-75 pointer-events-none" style={{ width: `${holdProgress}%` }} />
                        <div className="relative z-10 flex items-center gap-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] group-hover/risky:text-zinc-500">SETTLE INTENT: PROCEED<span className="ml-2 text-xs font-mono">[HOLD 1.5S]</span></span>
                        </div>
                      </button>
                    </div>

                    {/* ADVISORY FOOTER - Refined minimalist etched look */}
                    <div className="pt-8 border-t border-white/5 text-center space-y-2">
                      <div className="flex items-center justify-center gap-4 opacity-30">
                        <div className="h-[1px] w-8 bg-zinc-700" /><span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">STANDARD: VG-0.5-S</span><div className="h-[1px] w-8 bg-zinc-900" />
                      </div>
                      <div className="font-mono italic text-[10px] text-zinc-400 opacity-40 leading-relaxed px-6 space-y-1 uppercase tracking-tight">
                        <p>VIGIL evaluates transaction intent through probabilistic inference and historical pattern recognition.</p>
                        <p>Signals indicate risk — not certainty, enforcement, or outcome.</p>
                        <p>VIGIL does not sign, submit, or alter transactions.</p>
                        <p>All execution authority and resulting risk remain with the operator.</p>
                      </div>
                    </div>
                  </div>

                  {/* SCROLL HINT */}
                  {showScrollHint && (
                     <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-1 animate-hint-pulse">
                       <span className="text-[8px] font-black text-cyan-500/40 uppercase tracking-[0.3em] whitespace-nowrap">Scroll for analysis</span>
                       <ChevronDown size={14} className="text-cyan-500/40" />
                     </div>
                  )}

                  <button onClick={() => setResult(null)} className="absolute top-0 right-0 p-2 text-zinc-800 hover:text-zinc-500 transition-colors z-[100]"><RotateCcw className="w-4 h-4" /></button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan-vertical { 0% { top: -100%; } 100% { top: 100%; } }
        .animate-scan-vertical::after { content: ""; position: absolute; left: 0; width: 100%; height: 3px; background: rgba(239, 68, 68, 0.4); box-shadow: 0 0 20px #ef4444; animation: scan-vertical 3s linear infinite; }
        @keyframes sonar { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
        .animate-sonar-ripple::after { content: ""; position: absolute; top: 50%; left: 50%; width: 300px; height: 300px; margin-top: -150px; margin-left: -150px; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 50%; animation: sonar 2s linear infinite; }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, 10px); } }
        .animate-float-dust::after { content: "· . · . ·"; position: absolute; font-size: 24px; color: rgba(245, 158, 11, 0.1); animation: drift 6s infinite linear; }
        @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-3px, 3px); } 40% { transform: translate(-3px, -3px); } 60% { transform: translate(3px, 3px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
        .animate-glitch { animation: glitch 0.25s infinite; opacity: 0.03; background: white; }
        @keyframes strobe { 0%, 100% { opacity: 1; } 50% { opacity: 0.1; } }
        .animate-strobe { animation: strobe 0.4s step-end infinite; opacity: 0.05; background: rgba(185, 28, 28, 0.3); }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.05), transparent); background-size: 200% 100%; animation: shimmer 4s infinite linear; }
        @keyframes magnify { 0% { transform: scale(1) translate(0); } 50% { transform: scale(1.1) translate(10px, 10px); } 100% { transform: scale(1) translate(0); } }
        .animate-magnify { animation: magnify 4s infinite ease-in-out; }
        @keyframes breathe { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.15; } }
        .animate-breathe { animation: breathe 4s infinite ease-in-out; background: #06b6d4; }
        @keyframes inspect-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .animate-inspect-flicker { animation: inspect-flicker 1s ease-in-out infinite; }
        @keyframes hint-pulse { 0%, 100% { opacity: 0.2; transform: translateY(0); } 50% { opacity: 0.6; transform: translateY(4px); } }
        .animate-hint-pulse { animation: hint-pulse 2s infinite ease-in-out; }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ghost-load { 0% { transform: scaleX(0); transform-origin: left; } 50% { transform: scaleX(1); transform-origin: left; } 50.1% { transform-origin: right; } 100% { transform: scaleX(0); transform-origin: right; } }
        .animate-ghost-load { animation: ghost-load 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </section>
  );
};
