import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, Zap, Smartphone, ChevronRight, Info, ShieldCheck, ChevronDown, Activity, Loader2, Target, AlertTriangle, Map, ShieldAlert, Fingerprint, Eye, Binary, Search, CheckCircle2, ShieldX, Map as MapIcon, Gauge, Terminal, Radio, Wallet, LogOut } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';
import { AddressGlyph } from './AddressGlyph';
import { FacilityArchitecture } from './FacilityArchitecture';
import { playSuccessChime, playDeniedSound } from '../utils/audio';

const TechnicalScanGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
    <div className="absolute inset-[-100px] opacity-[0.15] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-drift" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020202_85%)]" />
  </div>
);

const VisualDeceptionShield = () => (
  <div className="p-6 md:p-14 bg-[#080808] border-2 border-zinc-700 rounded-3xl relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-red-600/25">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
       <div className="text-[25rem] font-black text-white leading-none">X</div>
    </div>
    <div className="relative z-10 space-y-8 md:space-y-10">
      <div className="space-y-4">
        <span className="text-red-600 font-black text-[11px] md:text-[13px] uppercase tracking-[0.5em] block mb-2">Visual Deception Shield</span>
        <h2 className="text-3xl md:text-[3.25rem] font-black text-white italic uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
          STOP <br/> ADDRESS <br/> POISONING.
        </h2>
      </div>
      <div className="space-y-6 pt-4">
        <p className="text-lg md:text-2xl text-zinc-300 font-medium leading-relaxed italic">
          VIGIL intercepts attacks inside the browser DOM, where most address poisoning originates, <span className="text-white">validating belief against reality.</span>
        </p>
      </div>
      <div className="pt-8 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-700">
         <div className="flex items-center gap-4 px-6 py-3 bg-blue-600/10 border border-blue-500/25 rounded-full shadow-lg group-hover:bg-blue-600/20 transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Monitoring</span>
         </div>
         <div className="text-center md:text-right">
            <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none">Protected By</div>
            <div className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1 italic">0.5 Primitive</div>
         </div>
      </div>
    </div>
  </div>
);

const ShatterShard: React.FC<{ index: number; isShattering: boolean }> = ({ index, isShattering }) => {
  const paths = [
    "polygon(0% 0%, 30% 0%, 15% 40%)",
    "polygon(30% 0%, 60% 0%, 45% 40%)",
    "polygon(60% 0%, 100% 0%, 80% 40%)",
    "polygon(0% 0%, 15% 40%, 0% 50%)",
    "polygon(100% 0%, 100% 50%, 80% 40%)",
    "polygon(0% 50%, 15% 40%, 40% 60%, 0% 100%)",
    "polygon(100% 50%, 80% 40%, 60% 60%, 100% 100%)",
    "polygon(15% 40%, 45% 40%, 40% 60%)",
    "polygon(45% 40%, 80% 40%, 60% 60%)",
    "polygon(40% 60%, 60% 60%, 50% 100%)",
    "polygon(0% 100%, 50% 100%, 40% 60%)",
    "polygon(50% 100%, 100% 100%, 60% 60%)"
  ];
  return (
    <div 
      className={`absolute inset-0 bg-emerald-500/30 border border-emerald-400/50 backdrop-blur-md pointer-events-none transition-all duration-[800ms] ease-out ${
        isShattering ? `shard-chaos-anim-${index % 12}` : 'opacity-0'
      }`}
      style={{ clipPath: paths[index % 12], transformStyle: 'preserve-3d', zIndex: 100 + index }}
    />
  );
};

const WalletSimulator = ({ onUnlock, currentLevel, onFail, onOpenMap, onIntegratedChange }: { onUnlock: () => void, currentLevel: number, onFail: () => void, onOpenMap: () => void, onIntegratedChange: (val: boolean) => void }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [outcome, setOutcome] = useState<'IDLE' | 'BREACH' | 'VERIFIED'>('IDLE');
  const [autopsyActive, setAutopsyActive] = useState(false);
  const [isShattering, setIsShattering] = useState<boolean>(false);
  const [isIntegrated, setIsIntegrated] = useState(false);
  
  const isDecrypted = currentLevel >= 2;
  const targetAddress = "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90";
  const poisonAddress = "Ab1C00000000000000000000000000Zz90";

  useEffect(() => {
    if (isDecrypted && !isIntegrated) {
      const timer = setTimeout(() => {
        setIsShattering(true);
        setTimeout(() => {
          setIsIntegrated(true);
          onIntegratedChange(true);
        }, 800);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isDecrypted, isIntegrated, onIntegratedChange]);

  const handleIntercept = (type: 'FRIEND' | 'POISON') => {
    if (isDecrypted || isSyncing || autopsyActive) return;
    setAutopsyActive(true);
    setIsSyncing(true);
    if (type === 'FRIEND') {
      playSuccessChime();
      setOutcome('VERIFIED');
      setTimeout(() => {
        onUnlock();
        setIsSyncing(false);
      }, 800);
    } else {
      playDeniedSound();
      setOutcome('BREACH');
      onFail();
      setTimeout(() => {
        setAutopsyActive(false);
        setIsSyncing(false);
        setOutcome('IDLE');
      }, 4000);
    }
  };

  if (isIntegrated) return null;

  return (
    <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isShattering ? 'scale-125 opacity-0' : 'opacity-100'}`} style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
      <div className={`p-6 md:p-14 bg-[#0a0a0a] border transition-all duration-700 rounded-3xl relative overflow-hidden group shadow-2xl ${isDecrypted ? 'border-emerald-500/45 shadow-[0_0_80px_rgba(16,185,129,0.05)]' : 'border-zinc-700'} ${isShattering ? 'pointer-events-none' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        {isShattering && (
          <div className="absolute inset-0 z-[120] overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
             {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
               <ShatterShard key={i} index={i} isShattering={isShattering} />
             ))}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white blur-[120px] animate-shatter-flash rounded-full opacity-0 z-10" />
          </div>
        )}
        <div className={`transition-all duration-700 ${isShattering ? 'opacity-0 scale-110 blur-2xl grayscale' : 'opacity-100'}`}>
          <div className="absolute top-4 md:top-6 left-0 right-0 z-30 flex items-center justify-center px-4 md:px-8">
            {isDecrypted ? (
              <div className="flex items-center gap-2 px-5 py-2 bg-emerald-600/10 border border-emerald-500/35 rounded-full animate-in fade-in slide-in-from-top-2 duration-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Silo 01 Identity Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-5 py-2 bg-zinc-950/50 border border-zinc-700 rounded-full">
                <div className="w-2 h-2 rounded-full bg-zinc-500" />
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Silo 01: Proficiency Audit</span>
              </div>
            )}
          </div>
          <div className="space-y-8 md:space-y-10 animate-in zoom-in duration-500 pt-10 md:pt-12 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h4 className={`text-xl md:text-2xl font-black italic uppercase transition-colors ${isDecrypted ? 'text-emerald-500' : 'text-white'}`}>Identity Calibration</h4>
                    <p className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Forensic_Simulation_v1.0</p>
                </div>
                {!isDecrypted && !autopsyActive && (
                  <div className="flex items-center gap-3 px-5 py-3 bg-blue-600/10 border border-blue-500/25 rounded-3xl animate-pulse w-fit">
                    <Fingerprint className="text-blue-500 w-4 h-4" />
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest leading-none">Pattern_Match_Active</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                <div className="lg:col-span-7 space-y-6 md:space-y-8">
                   {!autopsyActive && !isDecrypted ? (
                     <div className="space-y-6 md:space-y-8">
                        <div className="p-6 md:p-8 bg-black border border-zinc-700 rounded-3xl space-y-5 relative group overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <ShieldCheck size={80} />
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-inner">
                                 <Target size={18} />
                              </div>
                              <span className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">Reference Node (Destination)</span>
                           </div>
                           <div className="flex items-center gap-4 md:gap-6">
                              <AddressGlyph address={targetAddress} size="md" />
                              <div className="font-mono text-sm md:text-2xl text-white tracking-tight break-all">
                                 {targetAddress.slice(0, 4)}<span className="opacity-40 mx-1">...</span>{targetAddress.slice(-4)}
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Identify the authenticated destination node:</p>
                           <div className="grid grid-cols-1 gap-3">
                              <button onClick={() => handleIntercept('POISON')} className="p-4 md:p-6 bg-zinc-900/50 border border-zinc-700 rounded-3xl flex items-center justify-between group/btn hover:border-red-500/35 transition-all active:scale-[0.98]">
                                 <div className="flex items-center gap-4"><AddressGlyph address={poisonAddress} size="sm" /><span className="font-mono text-[10px] md:text-xs text-zinc-300 group-hover/btn:text-white transition-colors">{poisonAddress.slice(0, 4)}...{poisonAddress.slice(-4)}</span></div>
                                 <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/btn:text-red-500 transition-colors" />
                              </button>
                              <button onClick={() => handleIntercept('FRIEND')} className="p-4 md:p-6 bg-zinc-900/50 border border-zinc-700 rounded-3xl flex items-center justify-between group/btn hover:border-emerald-500/35 transition-all active:scale-[0.98]">
                                 <div className="flex items-center gap-4"><AddressGlyph address={targetAddress} size="sm" /><span className="font-mono text-[10px] md:text-xs text-zinc-300 group-hover/btn:text-white transition-colors">{targetAddress.slice(0, 4)}...{targetAddress.slice(-4)}</span></div>
                                 <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/btn:text-emerald-500 transition-colors" />
                              </button>
                           </div>
                        </div>
                     </div>
                   ) : (
                     <div className="h-full flex flex-col justify-center py-10">
                        {outcome === 'VERIFIED' ? (
                           <div className={`space-y-8 animate-in zoom-in duration-500 text-center ${isDecrypted && !isShattering ? 'animate-fracture-pulse' : ''}`}>
                              <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                 <ShieldCheck className="text-emerald-500 w-10 h-10" />
                              </div>
                              <div className="space-y-2">
                                 <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Access Granted.</h3>
                                 <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Biological Parity Confirmed</p>
                              </div>
                           </div>
                        ) : outcome === 'BREACH' ? (
                           <div className="space-y-8 animate-in zoom-in duration-500 text-center">
                              <div className="w-20 h-20 bg-red-600/10 border-2 border-red-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                                 <ShieldX className="text-red-500 w-10 h-10" />
                              </div>
                              <div className="space-y-2">
                                 <h3 className="text-3xl font-black text-red-500 italic uppercase tracking-tighter leading-none">System Breach.</h3>
                                 <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Cognitive Filter Failure // BRI Reduced</p>
                              </div>
                           </div>
                        ) : (
                           <div className="flex flex-col items-center gap-6 animate-pulse">
                              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Syncing_Neural_Link...</p>
                           </div>
                        )}
                     </div>
                   )}
                </div>
                <div className="lg:col-span-5 flex flex-col gap-4">
                   <div className="flex-1 p-6 md:p-8 bg-black/40 border border-zinc-700 rounded-3xl space-y-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                         <Binary className="text-blue-500 w-4 h-4" />
                         <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Type-Audit</span>
                      </div>
                      <p className="text-sm md:text-[13px] text-zinc-400 font-bold leading-relaxed uppercase italic">
                        {outcome === 'VERIFIED' ? "Subject identified original intent destination despite high-fidelity vanity mimicking." : 
                         outcome === 'BREACH' ? "Subject failed to distinguish poison mimic. Biological filter requires further calibration." :
                         "Silo 01 requires a 100% accurate identification of the 'Safe Node' to synchronize the rest of the facility."}
                      </p>
                   </div>
                   <button onClick={onOpenMap} className="p-6 md:p-8 bg-blue-600/5 border border-blue-500/25 rounded-3xl flex items-center justify-between group hover:bg-blue-600/10 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><MapIcon size={20} /></div>
                         <div className="text-left"><div className="text-xs font-black text-white uppercase tracking-widest">System Topology</div><div className="text-xs font-bold text-zinc-500 uppercase mt-0.5">Explore Silo Layout</div></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-500 transition-colors" />
                   </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypingHeadline = ({ text, delay = 500, startTrigger = true, isCompleted = false, onComplete }: { text: string; delay?: number; startTrigger?: boolean; isCompleted?: boolean; onComplete?: () => void }) => {
  // Local state for typing animation
  const hasStartedRef = useRef(false);
  const [displayedText, setDisplayedText] = useState(() => {
    // If already completed from parent, show full text immediately
    if (isCompleted) return text;
    return '';
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isFullyTyped, setIsFullyTyped] = useState(isCompleted);
  
  // Sync with parent completion state
  useEffect(() => {
    if (isCompleted && !isFullyTyped) {
      setDisplayedText(text);
      setIsFullyTyped(true);
    }
  }, [isCompleted, isFullyTyped, text]);
  
  // Only start typing once, when startTrigger becomes true AND typing hasn't started/completed
  useEffect(() => {
    if (!startTrigger || hasStartedRef.current || isCompleted) return;
    hasStartedRef.current = true;
    const timer = setTimeout(() => setIsTyping(true), delay);
    return () => clearTimeout(timer);
  }, [delay, startTrigger, isCompleted]);
  
  // Typing animation - runs only once
  useEffect(() => {
    if (!isTyping || isCompleted) return;
    
    if (displayedText.length >= text.length) {
      // Animation complete - notify parent
      setIsFullyTyped(true);
      onComplete?.();
      return;
    }
    
    // Continue typing
    const timeout = setTimeout(() => {
      const newLength = displayedText.length + 1;
      setDisplayedText(text.slice(0, newLength));
      
      // Check if complete after this character
      if (newLength >= text.length) {
        setIsFullyTyped(true);
        onComplete?.();
      }
    }, 150);
    
    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text, isCompleted, onComplete]);
  
  // Determine what to display
  const finalText = isCompleted ? text : displayedText;
  const showGreyOutline = !isFullyTyped && !isCompleted && displayedText.length < text.length;
  
  return (
    <h1 className="text-[2.5rem] md:text-[4.8rem] font-black tracking-tighter leading-[0.8] uppercase italic select-none min-h-[1em] relative">
      {/* Grey outline - only show during typing animation (when text is not fully displayed), hide when completed */}
      {showGreyOutline && (
        <span className="absolute inset-0 text-transparent pointer-events-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>{text}</span>
      )}
      {/* White text - shows during typing and fully visible when completed */}
      <span className="relative text-white">{finalText}</span>
    </h1>
  );
};

interface HeroProps {
  scrollToSection: (id: string) => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  powerSave?: boolean;
  isReady?: boolean;
  onUnlockNext: () => void;
  unlockLevel: number;
  onFail: () => void;
  onOpenMap: () => void;
  onOpenBriefing: () => void;
  isAdmin?: boolean;
  isTacticalMode?: boolean;
  onConnectWallet?: () => void;
  wallet?: string;
  isGuest?: boolean;
  validatorTypingCompleted?: boolean;
  onValidatorTypingComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenDoc, powerSave, isReady = true, onUnlockNext, unlockLevel, onFail, onOpenMap, onOpenBriefing, isAdmin = false, isTacticalMode = false, onConnectWallet, wallet, isGuest = false, validatorTypingCompleted = false, onValidatorTypingComplete }) => {
  const [isSilo1Vanished, setIsSilo1Vanished] = useState(false);

  // Define isRealWallet strictly for cryptographic addresses
  const isRealWallet = !!wallet && !isGuest && !wallet.includes("SIM_NODE") && !wallet.includes("VISITOR_NODE");

  return (
    <section id="hero" className={`flex flex-col px-6 md:px-20 pt-8 md:pt-24 relative overflow-hidden bg-[#020202] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isSilo1Vanished ? 'min-h-fit pb-12' : 'min-h-screen pb-24 justify-center'}`}>
      {!powerSave && <TechnicalScanGrid />}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-10 md:gap-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="space-y-6 md:space-y-10">
              <div className="flex flex-col gap-6 md:gap-10">
                <div className="flex">
                  <span className="px-4 py-2 bg-blue-600/10 border border-blue-500/25 rounded-md text-xs font-black tracking-[0.3em] text-blue-500 uppercase">Operational Alpha v 0.0.0.1</span>
                </div>
                <div className="flex items-center gap-4">
                  <button id="tour-mission-briefing" onClick={onOpenBriefing} className="relative group active:scale-95 transition-all duration-300">
                    <div className="absolute inset-0 bg-blue-500/30 md:rounded-full rounded-lg animate-mission-briefing-radar" />
                    <div className="relative px-6 py-4 md:py-2.5 bg-black border border-blue-500/60 md:rounded-full rounded-lg flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:border-blue-400 animate-mission-briefing-pulse">
                      <Zap size={14} className="text-blue-400 fill-blue-400/20" />
                      <span className="text-[11px] md:text-[9px] font-black text-white uppercase tracking-[0.4em] italic">Mission Briefing</span>
                    </div>
                  </button>
                  <div className="h-[1px] w-8 md:w-32 bg-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 w-1/6 h-full bg-cyan-500 shadow-[0_0_8px_#22d3ee] animate-flowing-signal" />
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                    <span className="text-xs font-bold text-cyan-500 uppercase tracking-[0.4em]">Active</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-[2.5rem] md:text-[4.8rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic select-none">THE INTENT</h1>
                <TypingHeadline 
                  text="VALIDATOR." 
                  startTrigger={isReady} 
                  isCompleted={validatorTypingCompleted}
                  onComplete={onValidatorTypingComplete}
                />
              </div>
              <div className="pt-2 md:pt-3 space-y-6 md:space-y-8 max-w-2xl">
                <div className="space-y-4 md:space-y-6">
                   <h4 className="text-11px font-black text-cyan-500 uppercase tracking-[0.5em]">Introducing Layer 0.5 Security</h4>
                   <p className="text-xl md:text-3xl text-zinc-300 font-medium leading-relaxed italic border-l-4 border-cyan-500/50 pl-6 md:pl-8">
                    "A human-layer security model that operates <span className="text-white underline decoration-cyan-500/20 decoration-2 underline-offset-8">between user intent and cryptographic execution</span>, detecting context loss before irreversible signatures occur."
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8 md:space-y-12">
               <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
                 <button onClick={() => scrollToSection('about-us')} className="px-6 md:px-12 py-5 md:py-6 bg-white text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-800 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 rounded-none"><MousePointer2 size={18} /> Install VIGIL FIELD UNIT (Coming Soon)</button>
                 <button onClick={() => onOpenDoc('whitepaper')} className="px-6 md:px-12 py-5 md:py-6 border-2 border-zinc-700 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-900 hover:border-zinc-500 transition-all rounded-lg">READ WHITEPAPER</button>
               </div>
               <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left duration-1000 delay-500">
                  <div className="flex items-center gap-3"><Terminal size={14} className="text-zinc-500" /><span className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em]">Protocol Operating Standards</span></div>
                  <div className="space-y-3 font-mono text-[9px] md:text-[11px] text-zinc-400 font-bold uppercase">
                     <p className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />Intent Synchronization: Decoupling perception from malicious UI shifts</p>
                     <p className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />Sub-Frame Autopsy: Heuristic analysis at the retinal threshold</p>
                     <p className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />Sovereign Context: Local mapping with absolute zero data leakage</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
             <VisualDeceptionShield />
             <div className="mt-4"><FacilityArchitecture scrollToSection={scrollToSection} unlockLevel={unlockLevel} isAdmin={isAdmin} /></div>
          </div>
        </div>

        <div 
          className={`max-w-4xl mx-auto w-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSilo1Vanished ? 'max-h-0 opacity-0 pointer-events-none scale-95 overflow-hidden m-0 p-0' : 'max-h-[2000px] opacity-100 py-8 md:py-20'
          }`}
        >
           <div className="text-center space-y-6 mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-6">
                 <div className="h-[1px] w-12 md:w-16 bg-zinc-900" />
                 <span className="text-blue-500 font-black text-xs uppercase tracking-[0.6em] animate-pulse">Neural Link Audit Required</span>
                 <div className="h-[1px] w-12 md:w-16 bg-zinc-900" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Identity Calibration.</h3>
                 <p className="text-zinc-400 text-sm md:text-xl italic font-medium max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                   "AUDIT REQUIRED: You must identify the <span className="text-white font-bold">authenticated target</span> within the simulation to synchronize your perception and unlock the Intel phase."
                 </p>
              </div>
           </div>
           
           <div className="px-2 md:px-0">
             <WalletSimulator 
               onUnlock={onUnlockNext} 
               currentLevel={unlockLevel} 
               onFail={onFail} 
               onOpenMap={onOpenMap} 
               onIntegratedChange={(val) => setIsSilo1Vanished(val)}
             />
           </div>
        </div>
      </div>
    </section>
  );
};