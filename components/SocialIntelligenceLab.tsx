
import React, { useState, useRef, useEffect } from 'react';
import { 
  Share2, Zap, Shield, Download, Terminal as TerminalIcon, 
  Bookmark, Fingerprint, ShieldAlert, ShieldCheck, Type, 
  Settings2, Info, Globe, Cpu, Radio, Layout, EyeOff, 
  Lock, Activity, Target, Layers, Play, Video, X, 
  Timer, Film, CheckCircle2, Loader2, RotateCcw, Box,
  Glasses, Waves, Flame, Move, Gauge, Activity as ActivityIcon,
  Ruler, Eye, Skull, AlertCircle, FileText
} from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

type LayoutType = 'COMPARISON' | 'MANIFESTO' | 'ARCHITECTURE' | 'BENCHMARK' | 'RETINAL_AUTOPSY';
type EngineType = 'BRUTALIST' | 'ISOMETRIC' | 'REFRACTIVE' | 'MESH' | 'PAPER' | 'HEATMAP' | 'SCHEMATIC';

interface Preset {
  id: string;
  label: string;
  layout: LayoutType;
  title: string;
  sub: string;
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  summary: string;
  statusCode: string;
  accent: 'RED' | 'BLUE' | 'EMERALD' | 'CYAN';
}

const PRESETS: Preset[] = [
  {
    id: 'CATANA_FORENSIC',
    label: 'CATANA CASE STUDY',
    layout: 'RETINAL_AUTOPSY',
    title: 'THE MATURITY \n TRAP.',
    sub: 'CONCENTRATION_FORENSIC',
    leftLabel: 'PERCEPTION',
    leftValue: '1yr Maturity',
    rightLabel: 'REALITY',
    rightValue: 'Systemic Trap',
    summary: "The $CATANA incident proves age is not security. One entity bought at 500k and dumped at 20M after a year. Biological eyes saw 'Maturity'; VIGIL sees 'Concentration Risk'. We map the dominant entity before you follow the chart.",
    statusCode: 'LIQUIDITY_EXTORTION_RISK',
    accent: 'RED'
  },
  {
    id: 'RETINAL_AUTOPSY',
    label: 'RETINAL AUTOPSY',
    layout: 'RETINAL_AUTOPSY',
    title: 'THE RETINA IS A \n HALLUCINATION.',
    sub: 'SACCADIC EXPLOIT',
    leftLabel: 'PERCEPTION',
    leftValue: 'Edge Verification',
    rightLabel: 'REALITY',
    rightValue: 'Intent Mismatch',
    summary: 'In the 12ms it takes to "verify" an address, your brain only captures the edges. The adversary owns the 36-character gap in the middle. Your eyes are a hallucination engine; VIGIL is the validator.',
    statusCode: 'INTENT_MISMATCH_DETECTED',
    accent: 'RED'
  },
  {
    id: 'SOL_15B_SURGE',
    label: 'MILESTONE: $15B STABLE SURGE',
    layout: 'BENCHMARK',
    title: 'SCALING THE \n SHIELD.',
    sub: 'LIQUIDITY THRESHOLD // $15B CAP',
    leftLabel: 'MARKET_VELOCITY',
    leftValue: 'Parabolic',
    rightLabel: 'VIGIL_PROTECTION',
    rightValue: 'Sub-Frame',
    summary: 'As Solana stablecoin liquidity reaches a $15B all-time high, the attack surface for human-layer deception expands. High-velocity environments drive users toward cognitive shortcuts (the 8-character blind spot). VIGIL intercepts this risk in 12ms.',
    statusCode: 'LIQUIDITY_SECURED',
    accent: 'CYAN'
  },
  {
    id: 'X_VIG_12_BENCHMARK',
    label: 'VIG-12 SPEED BENCHMARK',
    layout: 'BENCHMARK',
    title: 'THE RETINAL \n SHIELD.',
    sub: 'SPEED_VERIFICATION',
    leftLabel: 'SCREEN_REFRESH',
    leftValue: '16.6ms (60Hz)',
    rightLabel: 'VIGIL_AUTOPSY',
    rightValue: '12.0ms',
    summary: 'Saccadic Interception Confirmed. Hardware Refresh Cycle Alignment: COMPLETED. VIGIL renders a security verdict in 12ms, while a 60Hz display requires 16.6ms for a single frame update. Delta: -4.6ms (System Advantage).',
    statusCode: 'LATENCY_STABLE',
    accent: 'CYAN'
  },
  {
    id: 'BLIND_SPOT',
    label: 'BLIND SPOT ANALYSIS',
    layout: 'COMPARISON',
    title: 'THE 8-CHAR \n BLIND SPOT.',
    sub: 'COGNITIVE TRUNCATION RISK',
    leftLabel: 'USER_SCAN',
    leftValue: 'Edge Verification',
    rightLabel: 'ADVERSARY_MIMIC',
    rightValue: 'Entropy Collision',
    summary: 'Most users only check the first and last four characters of an address. Scammers use this "blind spot" to create fake addresses that look identical to your friends. VIGIL watches the middle characters so you don’t have to.',
    statusCode: 'RISK_DETECTED',
    accent: 'RED'
  },
  {
    id: 'DUST_VELOCITY',
    label: 'DUST VELOCITY AUDIT',
    layout: 'ARCHITECTURE',
    title: 'POLLUTED \n HISTORY.',
    sub: 'NETWORK_NOISE',
    leftLabel: 'BOT_VOLUME',
    leftValue: '20k/hr',
    rightLabel: 'PURIFICATION',
    rightValue: '0.5 Layer',
    summary: 'Bots are generating 20,000+ zero-value transfers per hour. This isn’t network activity; it’s a deliberate attempt to pollute your history logs. VIGIL filters the noise to ensure your "Recent" list isn’t a list of traps.',
    statusCode: 'SIGNAL_PURIFIED',
    accent: 'CYAN'
  },
  {
    id: 'FINAL_GUARD',
    label: 'THE FINAL GUARD',
    layout: 'MANIFESTO',
    title: 'THE FINAL \n PERIMETER.',
    sub: 'VIGILANCE_CALIBRATION',
    leftLabel: 'TECHNOLOGY',
    leftValue: 'Filter',
    rightLabel: 'HUMAN',
    rightValue: 'Shield',
    summary: 'Security tools reduce risk, but they do not eliminate it. The final perimeter isn’t code or encryption—it’s your own eyes. VIGIL restores the awareness you need to be your own greatest defense.',
    statusCode: 'VIGILANCE_ESTABLISHED',
    accent: 'EMERALD'
  }
];

const VL_Logo = ({ mode = 'DARK' }: { mode?: 'DARK' | 'LIGHT' }) => (
  <div className="flex flex-col items-center gap-3">
    <div className={`w-24 h-24 ${mode === 'LIGHT' ? 'bg-black' : 'bg-white'} flex items-center justify-center rounded-[1.2rem] shadow-2xl relative overflow-hidden group`}>
       {/* SYNCHRONIZED SCANNER LOGO PATH */}
       <svg viewBox="0 0 400 400" className={`w-14 h-14 ${mode === 'LIGHT' ? 'text-white' : 'text-black'}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 200 H120 L180 350 L240 120 V350 H350" stroke="currentColor" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
       </svg>
       {/* Corner Glint */}
       <div className={`absolute top-0 right-0 w-4 h-4 ${mode === 'LIGHT' ? 'bg-red-500' : 'bg-blue-600'} rounded-tr-[1.2rem] opacity-20`} />
    </div>
    <span className={`italic font-black text-2xl tracking-[0.5em] ${mode === 'LIGHT' ? 'text-black' : 'text-white'} uppercase ml-[0.5em]`}>VIGIL</span>
  </div>
);

// Added LatencyDiagram component to resolve "Cannot find name 'LatencyDiagram'" error.
const LatencyDiagram = ({ accentColor, mode }: { accentColor: string; mode: 'DARK' | 'LIGHT' }) => (
  <div className="w-full flex flex-col gap-12 py-10 relative group">
    {/* Background Rail */}
    <div className={`absolute top-[60%] left-0 right-0 h-[2px] ${mode === 'LIGHT' ? 'bg-zinc-100' : 'bg-zinc-900'} z-0`} />
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
       <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
             <span className={`text-[10px] font-black ${mode === 'LIGHT' ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-widest`}>Screen Refresh</span>
             <span className={`text-[12px] font-black ${mode === 'LIGHT' ? 'text-zinc-800' : 'text-zinc-200'}`}>16.6ms</span>
          </div>
          <div className={`h-4 w-full ${mode === 'LIGHT' ? 'bg-zinc-100' : 'bg-zinc-900'} rounded-full overflow-hidden`}>
             <div className="h-full bg-zinc-700 w-full" />
          </div>
       </div>
       <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
             <span className={`text-[10px] font-black uppercase tracking-widest`} style={{ color: accentColor }}>VIGIL Autopsy</span>
             <span className="text-[12px] font-black" style={{ color: accentColor }}>12.0ms</span>
          </div>
          <div className={`h-4 w-full ${mode === 'LIGHT' ? 'bg-zinc-100' : 'bg-zinc-900'} rounded-full overflow-hidden relative`}>
             <div className="h-full w-[72%] transition-all duration-[2000ms] ease-out" style={{ backgroundColor: accentColor }} />
             <div className="absolute top-0 left-[72%] bottom-0 w-[1px] bg-white animate-pulse h-full" />
          </div>
       </div>
    </div>

    <div className="flex justify-center">
       <div className={`px-12 py-6 ${mode === 'LIGHT' ? 'bg-white' : 'bg-[#0a0a0a]'} border-2 rounded-full flex items-center gap-6 shadow-2xl`} style={{ borderColor: `${accentColor}44` }}>
          <div className="text-center">
             <div className={`text-[8px] font-black ${mode === 'LIGHT' ? 'text-zinc-400' : 'text-zinc-600'} uppercase mb-1`}>Time Saved</div>
             <div className="text-3xl font-black italic tracking-tighter" style={{ color: accentColor }}>-4.6ms</div>
          </div>
          <div className="h-8 w-[1px] bg-zinc-800" />
          <div className="text-center">
             <div className={`text-[8px] font-black ${mode === 'LIGHT' ? 'text-zinc-400' : 'text-zinc-600'} uppercase mb-1`}>Fidelity</div>
             <div className={`text-xl font-black ${mode === 'LIGHT' ? 'text-black' : 'text-white'}`}>ULTRA</div>
          </div>
       </div>
    </div>
  </div>
);

interface TacticalContainerProps {
  children: React.ReactNode;
  className?: string;
  defaultHeight?: number;
  mode?: 'DARK' | 'LIGHT';
}

const TacticalContainer: React.FC<TacticalContainerProps> = ({ children, className = "", defaultHeight, mode = 'DARK' }) => {
  const [height, setHeight] = useState(defaultHeight || 0);
  const [isResizing, setIsResizing] = useState(false);
  const startYRef = useRef(0);
  const startHRef = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startYRef.current = e.clientY;
    startHRef.current = height || 0;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const deltaY = e.clientY - startYRef.current;
      const newHeight = Math.max(100, startHRef.current + deltaY);
      setHeight(newHeight);
    };
    const onMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing]);

  return (
    <div 
      className={`relative group/tactical transition-all duration-300 ${className} ${isResizing ? 'border-blue-500/40 ring-1 ring-blue-500/20' : ''}`}
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      <div className="h-full w-full overflow-hidden">
        {children}
      </div>
      
      <div 
        onMouseDown={onMouseDown}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-4 cursor-ns-resize flex flex-col items-center justify-center gap-0.5 opacity-0 group-hover/tactical:opacity-100 transition-opacity z-[100]"
      >
        <div className={`w-8 h-[1px] ${mode === 'LIGHT' ? 'bg-zinc-300' : 'bg-zinc-700'}`} />
        <div className={`w-8 h-[1px] ${mode === 'LIGHT' ? 'bg-zinc-200' : 'bg-zinc-900'}`} />
      </div>
    </div>
  );
};

export const SocialIntelligenceLab: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<EngineType>('PAPER');
  const [activeLayout, setActiveLayout] = useState<LayoutType>(PRESETS[6].layout);
  const [title, setTitle] = useState(PRESETS[6].title);
  const [sub, setSub] = useState(PRESETS[6].sub);
  const [leftLabel, setLeftLabel] = useState(PRESETS[6].leftLabel);
  const [leftValue, setLeftValue] = useState(PRESETS[6].leftValue);
  const [rightLabel, setRightLabel] = useState(PRESETS[6].rightLabel);
  const [rightValue, setRightValue] = useState(PRESETS[6].rightValue);
  const [summary, setSummary] = useState(PRESETS[6].summary);
  const [statusCode, setStatusCode] = useState(PRESETS[6].statusCode);
  const [accentColor, setAccentColor] = useState(PRESETS[6].accent);
  const [isExporting, setIsExporting] = useState(false);
  const [isMotionFocus, setIsMotionFocus] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(1);
  const [analogJitter, setAnalogJitter] = useState(false);
  
  const captureRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!captureRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      // @ts-ignore
      const canvas = await window.html2canvas(captureRef.current, {
        backgroundColor: activeEngine === 'PAPER' ? '#ffffff' : '#050505',
        scale: 3, 
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      const link = document.createElement('a');
      link.download = `VIGIL_TACTICAL_REPORT_${activeEngine}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const applyPreset = (p: Preset) => {
    setActiveLayout(p.layout);
    setTitle(p.title);
    setSub(p.sub);
    setLeftLabel(p.leftLabel);
    setLeftValue(p.leftValue);
    setRightLabel(p.rightLabel);
    setRightValue(p.rightValue);
    setSummary(p.summary);
    setStatusCode(p.statusCode);
    setAccentColor(p.accent);
  };

  const getAccentHex = () => {
    switch (accentColor) {
      case 'RED': return '#ef4444';
      case 'EMERALD': return '#10b981';
      case 'CYAN': return '#06b6d4';
      default: return '#3b82f6';
    }
  };

  const isLight = activeEngine === 'PAPER';
  const isSchematic = activeEngine === 'SCHEMATIC';
  const isHeatmap = activeEngine === 'HEATMAP';

  const renderLayoutContent = () => {
    return (
       <>
          {/* PERSISTENT LOGO IN TOP RIGHT FOR ALL LAYOUTS */}
          <div className="absolute top-16 right-16 z-[100] group-hover:scale-110 transition-transform">
             <VL_Logo mode={isLight ? 'LIGHT' : 'DARK'} />
          </div>

          {(() => {
            switch (activeLayout) {
              case 'RETINAL_AUTOPSY':
                return (
                  <div className={`relative z-10 flex flex-col h-full animate-in fade-in duration-1000 pr-40 ${isSchematic ? 'schematic-style' : ''}`}>
                     <div className="flex justify-between items-start mb-8 shrink-0">
                        <div className="space-y-4">
                           <div className={`px-6 py-2 ${isLight ? 'bg-red-50 border-red-100' : 'bg-red-600/10 border-red-500/30'} border rounded-lg inline-block`}>
                              <span className={`text-sm font-black ${isLight ? 'text-red-600' : 'text-red-500'} uppercase tracking-widest`}>{sub}</span>
                           </div>
                           <h2 className={`text-[7.5rem] font-black ${isLight ? 'text-black' : 'text-white'} italic uppercase tracking-tighter leading-[0.8] whitespace-pre-line`}>
                              {title}
                           </h2>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-12 flex-1 items-stretch min-h-0">
                        {/* PERCEPTION SIDE */}
                        <div className={`relative flex flex-col ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950/40 border-zinc-900'} border rounded-[3.5rem] overflow-hidden group/side`}>
                           {isHeatmap && <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />}
                           <div className={`p-8 border-b ${isLight ? 'border-zinc-200 bg-white' : 'border-zinc-900 bg-zinc-900/30'} flex items-center justify-between`}>
                              <div className="flex items-center gap-4">
                                 <div className={`w-8 h-8 rounded-lg ${isLight ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'} border flex items-center justify-center`}>
                                    <Eye size={16} />
                                 </div>
                                 <span className={`text-[16px] font-black ${isLight ? 'text-zinc-500' : 'text-zinc-400'} uppercase tracking-[0.4em]`}>{leftLabel}</span>
                              </div>
                              <TechLabel text="BIOLOGICAL_INPUT" color="zinc" />
                           </div>
                           <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-10">
                              <div className="space-y-6 w-full relative z-10">
                                 <div className={`text-[10px] font-black ${isLight ? 'text-zinc-300' : 'text-zinc-700'} uppercase tracking-widest`}>{leftLabel === 'SACCADIC_SKIP' || leftValue === '1yr Maturity' ? 'Cognitive Shortcut Observed' : 'Cognitive Capture Active'}</div>
                                 <div className={`p-10 ${isLight ? 'bg-white border-zinc-100' : 'bg-black border-zinc-900'} border rounded-[2.5rem] font-mono text-3xl tracking-tighter flex items-center justify-center gap-2 shadow-inner`}>
                                    {leftValue === 'Moonshot Hype' ? (
                                        <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">MOONSHOT_HALLUCINATION</span>
                                    ) : leftValue === '1yr Maturity' ? (
                                        <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">MATURE_SAFE_SIGNAL</span>
                                    ) : (
                                        <>
                                            <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">Ab1C</span>
                                            <span className={`text-zinc-900 blur-md opacity-20 px-4 ${isLight ? 'opacity-10' : ''}`}>92kLp6mX9wR7yT5vB4nQ8jK3</span>
                                            <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">Zz90</span>
                                        </>
                                    )}
                                 </div>
                                 <p className={`text-4xl ${isLight ? 'text-zinc-400' : 'text-zinc-600'} font-black uppercase italic px-6 leading-[1.1]`}>
                                    {leftValue === 'Moonshot Hype' ? '"Retina fixed on candle velocity. Scrutiny threshold: bypassed."' : leftValue === '1yr Maturity' ? '"The brain assumes safety based on provenance, skipping structural verification."' : '"The eye prioritized edge anchors, assuming historical parity."'}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* REALITY SIDE */}
                        <div className={`relative flex flex-col ${isLight ? 'bg-zinc-50 border-red-100' : 'bg-zinc-950/40 border-red-900/40'} border rounded-[3.5rem] overflow-hidden group/side`}>
                           {isHeatmap && <div className="absolute inset-0 bg-red-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 animate-pulse" />}
                           <div className={`p-8 border-b ${isLight ? 'border-red-100 bg-red-50/30' : 'border-red-900/20 bg-red-900/5'} flex items-center justify-between`}>
                              <div className="flex items-center gap-4">
                                 <div className={`w-8 h-8 rounded-lg ${isLight ? 'bg-red-50 border-red-100 text-red-600' : 'bg-red-600/10 border-red-500/30 text-red-500'} border flex items-center justify-center`}>
                                    <Skull size={16} />
                                 </div>
                                 <span className={`text-[16px] font-black ${isLight ? 'text-red-600' : 'text-red-500'} uppercase tracking-[0.4em]`}>{rightLabel}</span>
                              </div>
                              <TechLabel text="FORENSIC_TRUTH" color="red" />
                           </div>
                           <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-10 relative z-10">
                              <div className="space-y-6 w-full">
                                 <div className={`text-[10px] font-black ${isLight ? 'text-red-300' : 'text-red-700'} uppercase tracking-widest animate-pulse`}>
                                    {rightValue === 'Bundled Supply' || rightValue === 'Systemic Trap' ? 'Supply Manipulation Analysis' : 'Poison Mimic Identified'}
                                 </div>
                                 <div className={`p-10 ${isLight ? 'bg-white border-red-100' : 'bg-black border-red-900/30'} border rounded-[2.5rem] font-mono text-3xl tracking-tighter flex items-center justify-center gap-2 animate-haptic-shake`}>
                                    {rightValue === 'Bundled Supply' ? (
                                        <span className="text-red-500 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)]">92% CLUSTERED BUNDLE</span>
                                    ) : rightValue === 'Systemic Trap' ? (
                                        <span className="text-red-500 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)]">SINGLE ENTITY EXIT</span>
                                    ) : (
                                        <>
                                            <span className={`${isLight ? 'text-zinc-300' : 'text-zinc-500'}`}>Ab1C</span>
                                            <span className="text-red-500 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)] bg-red-500/5 px-4 rounded-lg">000000X99120817</span>
                                            <span className={`${isLight ? 'text-zinc-300' : 'text-zinc-500'}`}>Zz90</span>
                                        </>
                                    )}
                                 </div>
                                 <p className={`text-4xl ${isLight ? 'text-red-700' : 'text-red-400'} font-black uppercase italic px-6 leading-[1.1]`}>
                                    {rightValue === 'Bundled Supply' ? '"Mother-Wallet identified. Multi-threaded funding loop neutralised."' : rightValue === 'Systemic Trap' ? '"Insider holding exceeds liquidity floor. Age is a mask for manipulation."' : '"Cryptography is correct. Intent is mismatched."'}
                                 </p>
                              </div>
                           </div>
                           
                           {/* INTENT MISMATCH STAMP */}
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] z-30 pointer-events-none opacity-0 group-hover/side:opacity-100 transition-opacity duration-500">
                              <div className="px-12 py-8 border-[8px] border-red-600 text-red-600 rounded-[2rem] font-black text-6xl uppercase tracking-tighter shadow-[0_0_80px_rgba(239,68,68,0.4)] bg-black/60 backdrop-blur-md">
                                 [!] {rightValue === 'Bundled Supply' || rightValue === 'Systemic Trap' ? 'CONCENTRATION_TRAP' : 'INTENT_MISMATCH'}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className={`mt-8 pt-8 border-t ${isLight ? 'border-zinc-200' : 'border-zinc-900'} flex justify-between items-end shrink-0`}>
                        <div className="flex-1 max-w-4xl">
                           <p className={`text-4xl ${isLight ? 'text-zinc-400' : 'text-zinc-500'} font-medium italic leading-relaxed`}>
                              "{summary}"
                           </p>
                        </div>
                        <div className="text-right ml-12">
                           <div className={`text-[11px] font-black ${isLight ? 'text-zinc-300' : 'text-zinc-700'} uppercase tracking-[0.6em] mb-1`}>VIGIL_FORENSIC_UNIT</div>
                           <div className="text-2xl font-black text-red-600 uppercase italic tracking-widest">{statusCode}</div>
                        </div>
                     </div>
                  </div>
                );
              case 'BENCHMARK':
                return (
                  <div className="relative z-10 flex flex-col h-full justify-center space-y-10 animate-in fade-in duration-1000 pr-40">
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className={`w-8 h-8 rounded-lg ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} border flex items-center justify-center`}>
                              <ActivityIcon size={16} style={{ color: getAccentHex() }} />
                           </div>
                           <span className={`text-[14px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-500'} uppercase tracking-[0.6em]`}>{sub}</span>
                        </div>
                        <h2 className={`text-[4.5rem] font-black ${isLight ? 'text-black' : 'text-white'} italic uppercase tracking-tighter leading-[0.9] whitespace-pre-line drop-shadow-2xl`}>
                           {title}
                        </h2>
                     </div>

                     <div className="w-full">
                        <LatencyDiagram accentColor={getAccentHex()} mode={isLight ? 'LIGHT' : 'DARK'} />
                     </div>

                     <div className="grid grid-cols-12 gap-12 items-end">
                        <div className="col-span-8">
                           <p className={`text-xl ${isLight ? 'text-zinc-400' : 'text-zinc-400'} font-medium italic leading-relaxed border-l-4 pl-8`} style={{ borderColor: getAccentHex() }}>
                              "{summary}"
                           </p>
                        </div>
                        <div className="col-span-4 text-right">
                           <div className={`text-[10px] font-black ${isLight ? 'text-zinc-300' : 'text-zinc-800'} uppercase tracking-[0.5em] mb-1`}>EXECUTION_VERDICT</div>
                           <div className="text-xl font-black uppercase italic tracking-widest" style={{ color: getAccentHex() }}>{statusCode}</div>
                        </div>
                     </div>
                  </div>
                );
              case 'MANIFESTO':
                return (
                  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center space-y-12 animate-in fade-in duration-700">
                     <div className="space-y-4">
                        <div className="flex items-center justify-center gap-6">
                           <div className={`h-[1px] w-16 ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
                           <span className={`text-[16px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-500'} uppercase tracking-[1em]`}>{sub}</span>
                           <div className={`h-[1px] w-16 ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
                        </div>
                        <h2 className={`text-[8.5rem] font-black ${isLight ? 'text-black' : 'text-white'} italic uppercase tracking-tighter leading-[0.75] whitespace-pre-line drop-shadow-2xl`}>
                           {title}
                        </h2>
                     </div>
                     
                     <TacticalContainer 
                        mode={isLight ? 'LIGHT' : 'DARK'}
                        className={`max-w-4xl w-full p-12 ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'} border backdrop-blur-3xl rounded-[3.5rem] relative overflow-hidden group`} 
                        defaultHeight={280}
                      >
                        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-br from-black/[0.01] to-transparent' : 'bg-gradient-to-br from-white/[0.03] to-transparent'} pointer-events-none`} />
                        <p className={`text-4xl ${isLight ? 'text-zinc-700' : 'text-zinc-300'} font-medium italic leading-snug`}>
                           "{summary}"
                        </p>
                     </TacticalContainer>

                     <div className="pt-8 flex items-center gap-10">
                        <div className="flex items-center gap-4">
                           <Lock className="w-8 h-8 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                           <span className={`text-[14px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-[0.4em]`}>{statusCode}</span>
                        </div>
                     </div>
                  </div>
                );
              case 'COMPARISON':
                return (
                  <div className="relative z-10 flex flex-col h-full animate-in slide-in-from-left-4 duration-700 pr-40">
                     <div className="space-y-4 mb-16">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded bg-red-600 flex items-center justify-center text-black">
                              <Radio size={28} />
                           </div>
                           <span className={`text-[16px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-500'} uppercase tracking-[0.8em]`}>{sub}</span>
                        </div>
                        <h2 className={`text-[7rem] font-black ${isLight ? 'text-black' : 'text-white'} italic uppercase tracking-tighter leading-[0.8] whitespace-pre-line`}>
                           {title}
                        </h2>
                     </div>

                     <div className="grid grid-cols-2 gap-16 flex-1">
                        <div className="space-y-6">
                           <div className="flex items-center gap-4">
                              <div className={`h-0.5 flex-1 ${isLight ? 'bg-zinc-100' : 'bg-zinc-900'}`} />
                              <span className={`text-[14px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-600'} uppercase tracking-[0.4em]`}>{leftLabel}</span>
                           </div>
                           <div className={`p-12 ${isLight ? 'bg-white border-zinc-200' : 'bg-[#0a0a0a] border-zinc-800'} border rounded-[3rem] shadow-inner relative group`}>
                              <p className={`text-4xl font-black ${isLight ? 'text-zinc-300' : 'text-zinc-500'} uppercase italic leading-none`}>{leftValue}</p>
                              <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                 <EyeOff size={40} className={isLight ? 'text-black' : 'text-white'} />
                              </div>
                           </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="flex items-center gap-4">
                              <span className="text-[14px] font-black uppercase tracking-[0.4em]" style={{ color: getAccentHex() }}>{rightLabel}</span>
                              <div className={`h-0.5 flex-1 ${isLight ? 'bg-zinc-100' : 'bg-zinc-900'}`} />
                           </div>
                           <div className={`p-12 ${isLight ? 'bg-white border-zinc-200' : 'bg-[#0a0a0a] border-zinc-800'} rounded-[3rem] shadow-2xl relative border-2`} style={{ borderColor: `${getAccentHex()}44` }}>
                              <p className="text-4xl font-black italic leading-none" style={{ color: getAccentHex() }}>{rightValue}</p>
                              <div className="absolute top-4 right-6 opacity-10 animate-pulse">
                                 <Zap size={40} fill={getAccentHex()} color={getAccentHex()} />
                              </div>
                           </div>
                        </div>
                     </div>

                     <TacticalContainer mode={isLight ? 'LIGHT' : 'DARK'} className={`pt-12 border-t ${isLight ? 'border-zinc-200' : 'border-zinc-900'} flex items-end justify-between w-full`} defaultHeight={160}>
                        <div className="flex items-start gap-10 max-w-4xl">
                           <Fingerprint className={`w-16 h-16 ${isLight ? 'text-zinc-200' : 'text-zinc-800'}`} strokeWidth={0.5} />
                           <p className={`text-[20px] ${isLight ? 'text-zinc-400' : 'text-zinc-500'} font-bold tracking-tight leading-relaxed max-w-3xl italic`}>
                              {summary}
                           </p>
                        </div>
                        <div className="text-right shrink-0">
                           <div className={`text-[11px] font-black ${isLight ? 'text-zinc-300' : 'text-zinc-700'} uppercase tracking-[0.5em] mb-1`}>VIGIL_INTEL_SYSTEM</div>
                           <div className="text-[14px] font-black uppercase italic tracking-widest" style={{ color: getAccentHex() }}>{statusCode}</div>
                        </div>
                     </TacticalContainer>
                  </div>
                );
              case 'ARCHITECTURE':
                return (
                  <div className="relative z-10 flex flex-col h-full animate-in zoom-in duration-1000 pr-40">
                     <div className="flex justify-between items-start mb-20">
                        <div className="space-y-4">
                           <div className={`px-6 py-2 ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950 border-zinc-800'} border rounded-lg inline-block`}>
                              <span className={`text-[14px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-500'} uppercase tracking-widest`}>{sub}</span>
                           </div>
                           <h2 className={`text-[8rem] font-black ${isLight ? 'text-black' : 'text-white'} italic uppercase tracking-tighter leading-[0.75] whitespace-pre-line`}>
                              {title}
                           </h2>
                        </div>
                     </div>

                     <div className="grid grid-cols-12 gap-12 items-center flex-1">
                        <TacticalContainer mode={isLight ? 'LIGHT' : 'DARK'} className={`col-span-8 p-12 ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.02] border-white/10'} border rounded-[4rem] backdrop-blur-3xl space-y-10`} defaultHeight={400}>
                           <div className="flex items-center gap-6">
                              <div className={`w-16 h-16 rounded-[1.5rem] ${isLight ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-800'} border flex items-center justify-center shadow-xl`}>
                                 <Cpu className="w-8 h-8 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
                              </div>
                              <div className="space-y-1">
                                 <div className="text-[14px] font-black text-cyan-500 uppercase tracking-[0.3em]">Module Specifications</div>
                                 <div className={`text-3xl font-black ${isLight ? 'text-black' : 'text-white'} italic`}>{statusCode}</div>
                              </div>
                           </div>
                           <p className={`text-3xl ${isLight ? 'text-zinc-500' : 'text-zinc-400'} font-medium italic leading-relaxed`}>
                              {summary}
                           </p>
                        </TacticalContainer>
                        
                        <div className="col-span-4 space-y-4">
                           {[
                              { l: leftLabel, v: leftValue, i: <Layers size={24} /> },
                              { l: rightLabel, v: rightValue, i: <Radio size={24} /> },
                              { l: 'VERDICT_STATE', v: 'ISOLATED', i: <ShieldCheck size={24} /> }
                           ].map((pod, i) => (
                             <div key={i} className={`p-8 ${isLight ? 'bg-white border-zinc-200' : 'bg-black/40 border-zinc-900'} border rounded-2xl space-y-2 flex flex-col items-center text-center group hover:border-zinc-700 transition-all`}>
                                <div className={`mb-2 group-hover:text-cyan-500 transition-colors ${isLight ? 'text-zinc-300' : 'text-zinc-600'}`}>{pod.i}</div>
                                <div className={`text-[12px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-700'} uppercase tracking-widest`}>{pod.l}</div>
                                <div className={`text-2xl font-bold ${isLight ? 'text-zinc-800' : 'text-zinc-300'} uppercase`}>{pod.v}</div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className={`mt-12 pt-12 border-t ${isLight ? 'border-zinc-200' : 'border-zinc-900'} flex justify-between items-end`}>
                        <div className={`text-[14px] font-black ${isLight ? 'text-zinc-200' : 'text-zinc-800'} uppercase tracking-[1em]`}>VIGIL_LAYER_BLUEPRINT</div>
                        <div className={`flex items-center gap-4 text-[14px] font-black ${isLight ? 'text-zinc-300' : 'text-zinc-700'} uppercase tracking-widest`}>
                           <Activity size={18} className="text-emerald-500" /> SYSTEM_PARITY_VERIFIED
                        </div>
                     </div>
                  </div>
                );
            }
          })()}
       </>
    );
  };

  return (
    <div 
      className={`space-y-16 max-w-[1500px] mx-auto selection:bg-red-500/20 px-6 transition-all duration-700 ${isMotionFocus ? 'bg-black pt-10' : ''}`}
    >
      
      {!isMotionFocus && (
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12 animate-in fade-in duration-700">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-zinc-900" />
              <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em]">Visual Intelligence Unit // Asset Forge</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Comms <br/> Terminal.
            </h2>
            <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
              "Construct evidence-based infographics for your narrative. Visual integrity is the ultimate validator."
            </p>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${isMotionFocus ? 'xl:grid-cols-1' : 'xl:grid-cols-12'} gap-12 items-start`}>
        
        {/* EDITOR SIDEBAR */}
        {!isMotionFocus && (
          <div className="xl:col-span-4 space-y-8 h-full animate-in slide-in-from-left-4 duration-700">
             <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl">
                
                {/* FORGE ENGINE SELECTOR */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Cpu className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Infographic Engine</span>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'BRUTALIST', icon: <TerminalIcon size={12} />, label: 'Brutalist' },
                        { id: 'ISOMETRIC', icon: <Box size={12} />, label: 'Isometric' },
                        { id: 'REFRACTIVE', icon: <Glasses size={12} />, label: 'Refractive' },
                        { id: 'MESH', icon: <Waves size={12} />, label: 'Neural Mesh' },
                        { id: 'PAPER', icon: <FileText size={12} />, label: 'Forensic-Paper' },
                        { id: 'HEATMAP', icon: <Waves size={12} />, label: 'Heatmap-Pulse' },
                        { id: 'SCHEMATIC', icon: <Layout size={12} />, label: 'Obsidian-Schematic' }
                      ].map((eng) => (
                        <button 
                          key={eng.id}
                          onClick={() => setActiveEngine(eng.id as EngineType)}
                          className={`p-3 rounded-xl border text-[9px] font-black uppercase transition-all flex items-center justify-between ${activeEngine === eng.id ? (eng.id === 'PAPER' ? 'bg-white border-white text-black shadow-lg' : 'bg-blue-600 border-blue-500 text-white shadow-lg') : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'}`}
                        >
                          {eng.icon} {eng.label}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Bookmark className="w-3.5 h-3.5 text-zinc-600" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Narrative Presets</span>
                   </div>
                   <div className="grid grid-cols-1 gap-2">
                      {PRESETS.map((p) => (
                        <button 
                          key={p.id}
                          onClick={() => applyPreset(p)}
                          className={`p-4 text-left rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex justify-between items-center ${
                            title === p.title ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'
                          }`}
                        >
                          {p.label}
                          {title === p.title && <Zap size={12} className="fill-current" />}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Settings2 className="w-4 h-4 text-zinc-600" />
                         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Canvas Variables</span>
                      </div>
                      <div className="p-1 bg-black border border-zinc-900 rounded-lg flex gap-1">
                         {(['RED', 'BLUE', 'EMERALD', 'CYAN'] as const).map(c => (
                           <button 
                              key={c}
                              onClick={() => setAccentColor(c)}
                              className={`w-4 h-4 rounded-full transition-all ${
                                accentColor === c ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'
                              } ${
                                c === 'RED' ? 'bg-red-500' : c === 'BLUE' ? 'bg-blue-500' : c === 'EMERALD' ? 'bg-emerald-500' : c === 'CYAN' ? 'bg-cyan-500' : ''
                              }`}
                           />
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Layout</label>
                         <div className="grid grid-cols-2 gap-2">
                            {(['COMPARISON', 'MANIFESTO', 'ARCHITECTURE', 'BENCHMARK', 'RETINAL_AUTOPSY'] as LayoutType[]).map(l => (
                              <button 
                                key={l}
                                onClick={() => setActiveLayout(l)}
                                className={`py-2 px-1 rounded-lg border text-[8px] font-black uppercase tracking-all ${activeLayout === l ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-black border-zinc-900 text-zinc-600'}`}
                              >
                                {l.replace('_', ' ')}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Post Title</label>
                         <textarea value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} className="w-full h-20 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-zinc-300 focus:border-red-600 outline-none resize-none uppercase" />
                      </div>

                      <div className="space-y-1.5 pt-2">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Plain English Summary</label>
                         <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full h-32 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-300 focus:border-blue-600 outline-none resize-none italic" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <button 
                     onClick={handleExport}
                     disabled={isExporting}
                     className="w-full py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                   >
                     {isExporting ? <Activity className="w-5 h-5 animate-spin" /> : <><Download className="w-5 h-5" /> EXPORT TECHNICAL_REPORT</>}
                   </button>
                   
                   <button 
                     onClick={() => setIsMotionFocus(true)}
                     className="w-full py-4 bg-zinc-950 border border-zinc-900 text-zinc-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                   >
                     <Video className="w-4 h-4" /> MOTION CAPTURE MODE
                   </button>

                   <p className="text-center text-[9px] font-black text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Info className="w-3 h-3" /> PNG: 1200x675 // WEBM: Master Loop
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* CANVAS PREVIEW AREA */}
        <div className={`${isMotionFocus ? 'col-span-full' : 'xl:col-span-8'} flex flex-col items-center animate-in fade-in zoom-in duration-700 relative`}>
           
           <div className={`relative group w-full flex justify-center border-2 ${isMotionFocus ? 'border-red-900/40' : 'border-zinc-900'} rounded-[3.5rem] bg-black p-4 md:p-12 overflow-hidden shadow-inner min-h-[500px]`}>
              <div 
                ref={captureRef}
                className={`${isLight ? 'bg-white' : 'bg-[#050505]'} rounded-[3.5rem] border ${isLight ? 'border-zinc-200' : 'border-zinc-900'} relative overflow-hidden flex flex-col p-12 justify-center shadow-[0_40px_150px_rgba(0,0,0,1)] shrink-0 
                  ${analogJitter ? 'animate-analog-jitter' : ''}
                `}
                style={{ 
                  width: '1200px', 
                  height: '675px', 
                  transform: 'scale(var(--canvas-scale))', 
                  transformOrigin: 'center',
                  perspective: '1500px'
                }}
              >
                 <style>{`
                   :root { --canvas-scale: 0.65; --motion-vel: ${4 / motionIntensity}s; }
                   @media (max-width: 1500px) { --canvas-scale: 0.55; }
                   @media (max-width: 1350px) { --canvas-scale: 0.45; }
                   @media (max-width: 1024px) { --canvas-scale: 0.4; }
                   @media (max-width: 768px) { --canvas-scale: 0.28; }
                   @media (max-width: 500px) { --canvas-scale: 0.22; }
                   
                   @keyframes scan-line {
                     0% { transform: translateY(-100%); }
                     100% { transform: translateY(1500%); }
                   }
                   .animate-scan-line { animation: scan-line var(--motion-vel) linear infinite; }
                   .engine-isometric { transform: rotateX(25deg) rotateY(-25deg) rotateZ(5deg); }
                   .engine-mesh { background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 40px 40px; }
                   .engine-heatmap { background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15), transparent 70%); }
                   .schematic-style * { border-radius: 0 !important; border-width: 1px !important; }
                   .schematic-style .bg-zinc-950 { background: transparent !important; }
                 `}</style>

                 <div className={`absolute inset-0 opacity-[0.05] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'}_1px,transparent_1px),linear-gradient(90deg,${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'}_1px,transparent_1px)]`} />
                 
                 {/* INTENSIFIED AMBIENT GLOW */}
                 <div 
                   className={`absolute -top-[150px] -right-[150px] w-[600px] h-[600px] blur-[160px] ${isLight ? 'opacity-20' : 'opacity-40'} pointer-events-none transition-colors duration-1000 animate-pulse`}
                   style={{ backgroundColor: getAccentHex() }}
                 />
                 <div 
                   className={`absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] blur-[140px] ${isLight ? 'opacity-10' : 'opacity-20'} pointer-events-none transition-colors duration-1000`}
                   style={{ backgroundColor: getAccentHex() }}
                 />

                 <div className={`absolute top-0 left-0 w-full h-[2px] ${isLight ? 'bg-black opacity-10' : 'bg-white opacity-10'} shadow-[0_0_25px_white] pointer-events-none animate-scan-line`} />

                 <div className={`h-full w-full relative z-10 transition-all duration-1000 
                   ${activeEngine === 'ISOMETRIC' ? 'engine-isometric' : ''}
                   ${activeEngine === 'MESH' ? 'engine-mesh' : ''}
                   ${activeEngine === 'HEATMAP' ? 'engine-heatmap' : ''}
                 `}>
                    {renderLayoutContent()}
                 </div>

                 <div className="absolute bottom-16 right-20 flex items-center gap-10 opacity-30 pointer-events-none">
                    <div className="text-right">
                       <div className={`text-[11px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-zinc-400'}`}>SYS_REF</div>
                       <div className={`text-[9px] font-mono ${isLight ? 'text-black' : 'text-zinc-500'}`}>X-VIG-12-COMMS-2026</div>
                    </div>
                    <div className={`h-8 w-[1px] ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
                    <div className="text-right">
                       <div className={`text-[11px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-zinc-400'}`}>ENCRYPTION</div>
                       <div className={`text-[9px] font-mono ${isLight ? 'text-black' : 'text-zinc-500'}`}>AES-256-L0.5</div>
                    </div>
                 </div>
              </div>
           </div>

           {isMotionFocus && (
              <div className="mt-12 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Video className="w-5 h-5 text-blue-500" />
                       <span className="text-[12px] font-black text-white uppercase tracking-widest">Motion Controller</span>
                    </div>
                    <button onClick={() => setIsMotionFocus(false)} className="text-zinc-600 hover:text-white transition-colors">
                       <X size={20} />
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Render Velocity</label>
                       <input type="range" min="0.5" max="5" step="0.1" value={motionIntensity} onChange={(e) => setMotionIntensity(parseFloat(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none accent-blue-500 cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-xl">
                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Analog Jitter</span>
                       <button onClick={() => setAnalogJitter(!analogJitter)} className={`w-10 h-5 rounded-full relative transition-all ${analogJitter ? 'bg-emerald-600' : 'bg-zinc-800'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${analogJitter ? 'right-1' : 'left-1'}`} />
                       </button>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
