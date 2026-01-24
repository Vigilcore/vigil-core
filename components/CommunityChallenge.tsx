import React, { useState, useEffect, useRef } from 'react';
import { Target, Search, Trophy, Terminal as TerminalIcon, Lock, Unlock, ChevronRight, AlertCircle, CheckCircle2, User, Globe, Loader2, ShieldCheck, Wifi, WifiOff, LogOut, RefreshCcw, Wallet, Coins, ArrowUpRight, FileText, Database, ShieldAlert, Zap, Skull, Timer, Fingerprint, Brain, Activity, ShieldX, Info, History, List, Eye, AlertTriangle, Map as MapIcon, BarChart3, TrendingUp, Medal, Star, Shield, ZapOff, HeartPulse } from 'lucide-react';
import { playSuccessChime, playDeniedSound } from '../utils/audio';

const REGISTRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbwY5wE282Rqmec5bMYsQLTm1nsbbxzzfD8B7Q_AsuA1VC2PNucGCfFDYo4l7f2J5h6CQQ/exec"; 
const CHALLENGE_DURATION = 5.0;

interface Puzzle {
  id: number;
  question: string;
  hint: string;
  answer: string;
  referenceAddr: string;
}

interface ClaimRecord {
  id: number;
  receipt: string;
  timestamp: string;
}

const isValidSolanaAddress = (addr: string) => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
};

const generatePoisonMimic = (real: string): string => {
  const prefix = real.slice(0, 4);
  const suffix = real.slice(-4);
  const charset = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let middle = "";
  for (let i = 0; i < real.length - 8; i++) {
    if (Math.random() > 0.65) {
      middle += real[i + 4];
    } else {
      middle += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return prefix + middle + suffix;
};

// SIMULATED LEADERBOARD DATA - SORTED BY RESILIENCE
const INITIAL_LEADERBOARD = [
  { handle: "@sol_guard", bri: 98, rank: "APEX", intercepted: 142 },
  { handle: "@vigil_01", bri: 94, rank: "SENTINEL", intercepted: 89 },
  { handle: "@nexus_sent", bri: 88, rank: "GUARDIAN", intercepted: 64 },
  { handle: "@phantom_eye", bri: 82, rank: "USER", intercepted: 41 },
  { handle: "@0x_shadow", bri: 76, rank: "ANALYST", intercepted: 22 }
];

export const CommunityChallenge: React.FC = () => {
  const puzzles: Puzzle[] = [
    { id: 1, question: "IDENTIFY_FRAGMENT_01: Locate the 4-character prefix of the 'FAKE' address used to demonstrate 'Vanishing Entropy' in the primary vulnerability analysis.", hint: "Search the registry focused on Adversarial Analysis and Entropy Collisions.", answer: "Ab1C", referenceAddr: "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90" },
    { id: 2, question: "IDENTIFY_FRAGMENT_02: Identify the 'Archive ID' assigned to the Shadow dApp dataset utilized in the peer-reviewed methodology.", hint: "Inspect the Methodology section of the document documenting 'Project Mirror'.", answer: "BSEC-2024-POISON-V2", referenceAddr: "BSECv27821xPoisoN7729110028x992211" },
    { id: 3, question: "IDENTIFY_FRAGMENT_03: Provide the terminal 'Registry ID' that concludes the primary compliance framework for operational standards.", hint: "Find the document governing 'Operational Terms' and scroll to the absolute end-of-file string.", answer: "VG-TOS-INST-A1", referenceAddr: "VIG1nsT7281x992811772008x99120817" },
    { id: 4, question: "IDENTIFY_FRAGMENT_04: Find the 'LOG_ID' of the specific validation snapshot window that indicates 'COMPLETE' for poisoning patterns.", hint: "Inspect the visual UI mockups embedded within the architectural documentation.", answer: "8821-X", referenceAddr: "8821xVIGIL0091128x772199291120038" },
    { id: 5, question: "IDENTIFY_FRAGMENT_05: State the total count of 'Registered Assets' (Wordmarks and Marks) currently held in the restricted media gateway.", hint: "You must first unlock the v0.0.1.1 gateway to count the definitive wordmarks.", answer: "19", referenceAddr: "REG19xASSET992811x772199291120038" },
    { id: 6, question: "IDENTIFY_FRAGMENT_06: Identify the target latency threshold (in milliseconds) required for 0.5 Layer DOM interception.", hint: "Refer to the Operational Latency section in the Technical Specification.", answer: "12ms", referenceAddr: "LAT12msX992811x772199291120038" },
    { id: 7, question: "IDENTIFY_FRAGMENT_07: Provide the operation ID assigned to the Adversarial Mimicry Lab experimental environment.", hint: "Check the top label of the Adversarial Mimicry Lab / Trial by Fire section.", answer: "VG-POI-X1", referenceAddr: "VIGP01X1x992811x772199291120038" },
    { id: 8, question: "IDENTIFY_FRAGMENT_08: Locate the specific Registry ID found at the conclusion of the 'Privacy Protocol'.", hint: "Navigate to the end of the Data Governance Privacy Protocol document.", answer: "VG-PRV-INST-03", referenceAddr: "V1GPRV1NST03x772199291120038" },
    { id: 9, question: "IDENTIFY_FRAGMENT_09: Identify the Reference ID (REF) used for the classified Strategic Intelligence Threat Model.", hint: "Inspect the header of the Threat Model document in the registry.", answer: "VG-TM-2026.09", referenceAddr: "VIGTM202609x772199291120038" },
    { id: 10, question: "IDENTIFY_FRAGMENT_10: State the ID assigned to the 'Heuristic Signal' specification within the Intent Validator engine.", hint: "Check the Engine Specification label inside the Intent Validator breakdown.", answer: "VG-HEUR-01", referenceAddr: "VIGHEUR01x772199291120038" },
    { id: 11, question: "IDENTIFY_FRAGMENT_11: List the four flagship wordmark types (letters only) mentioned in the Institutional Design Note.", hint: "Look for the types (e.g. Type A, B...) listed in the Brand Assets section.", answer: "PQRS", referenceAddr: "TYPEPQRSx772199291120038" },
    { id: 12, question: "IDENTIFY_FRAGMENT_12: Identify the Tier designation assigned to the 'Baseline Awareness' baseline protection plan.", hint: "Refer to the baseline plan label in the Plans & Licensing section.", answer: "TIER: 01", referenceAddr: "TIER01xREGRx772199291120038" },
    { id: 13, question: "IDENTIFY_FRAGMENT_13: Provide the Registry ID that concludes the official Research Briefing (Annotated Edition).", hint: "Scroll to the final data log entry of the Research Briefing document.", answer: "VG-INTEL-RP-01-FULL-H2", referenceAddr: "VIGINTELRP01FULLH2x77219929" },
    { id: 14, question: "IDENTIFY_FRAGMENT_14: State the specific operational version tag displayed on the VIGIL system dashboard.", hint: "Check the version label found in the sidebar or header (e.g. v 0.x.x.x).", answer: "v 0.0.1.1", referenceAddr: "V0011xSYSx772199291120038" },
    { id: 15, question: "IDENTIFY_FRAGMENT_15: Provide the terminal Registry Reference ID mentioned at the absolute end of the Institutional Disclaimer.", hint: "Inspect the end of the legal registry's disclaimer fragment.", answer: "VG-LEGAL-CORE-A1", referenceAddr: "VIGLEGALCOREA1x772199291120038" }
  ];

  const [userHandle, setUserHandle] = useState('');
  const [solanaAddress, setSolanaAddress] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [bri, setBri] = useState(100);
  const [view, setView] = useState<'INTEL' | 'GLOBAL'>('INTEL');

  const [flowState, setFlowState] = useState<'QUESTION' | 'TRIAL_PREP' | 'TRIAL' | 'SYNCING' | 'SUCCESS' | 'ERROR' | 'BREACH'>('QUESTION');
  const [errorMsg, setErrorMsg] = useState('');
  const [claimHistory, setClaimHistory] = useState<ClaimRecord[]>([]);

  const [trialOptions, setTrialOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vigil_challenge_pro_v2');
    const savedHandle = localStorage.getItem('vigil_user_handle');
    const savedAddress = localStorage.getItem('vigil_user_address');
    const savedClaims = localStorage.getItem('vigil_claims_v3');
    const savedXp = localStorage.getItem('vigil_user_xp');
    const savedBri = localStorage.getItem('vigil_user_bri');
    
    if (saved) setCurrentStep(Math.min(parseInt(saved), puzzles.length));
    if (savedHandle) setUserHandle(savedHandle);
    if (savedAddress) setSolanaAddress(savedAddress);
    if (savedClaims) setClaimHistory(JSON.parse(savedClaims));
    if (savedXp) {
      const parsedXp = parseInt(savedXp);
      setXp(parsedXp);
      setLevel(Math.floor(parsedXp / 100) + 1);
    }
    if (savedBri) setBri(parseInt(savedBri));
    
    if (savedHandle && savedAddress) {
      setIsSessionActive(true);
    }
  }, []);

  const updateBri = (delta: number) => {
    const nextBri = Math.max(0, Math.min(100, bri + delta));
    setBri(nextBri);
    localStorage.setItem('vigil_user_bri', nextBri.toString());
  };

  const initiateSession = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError(null);
    const error = validateIdentity();
    if (error) {
      setRegistrationError(error);
      return;
    }
    const cleanHandle = userHandle.trim();
    const cleanAddr = solanaAddress.trim();
    setUserHandle(cleanHandle);
    setSolanaAddress(cleanAddr);
    setIsSessionActive(true);
    localStorage.setItem('vigil_user_handle', cleanHandle);
    localStorage.setItem('vigil_user_address', cleanAddr);
  };

  const validateIdentity = () => {
    const cleanHandle = userHandle.trim();
    const cleanAddr = solanaAddress.trim();
    const isHandleInvalid = !cleanHandle.startsWith('@') || cleanHandle.length < 2;
    const isAddrInvalid = cleanAddr === '' || !isValidSolanaAddress(cleanAddr);
    if (isHandleInvalid && isAddrInvalid) return "CRITICAL_AUTH_FAILURE: DUAL_FRAGMENT_MISMATCH";
    if (isHandleInvalid) return "IDENTITY_FAILURE: INVALID X_ID";
    if (isAddrInvalid) return "MALFORMED_PAYLOAD: INVALID ADDRESS";
    return null;
  };

  const handlePuzzleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = puzzles[currentStep];
    if (inputValue.trim().toUpperCase() === current.answer.toUpperCase()) {
      setFlowState('TRIAL_PREP');
    } else {
      playDeniedSound();
      setFlowState('ERROR');
      setErrorMsg('Intel Fragment mismatch. Data refused.');
      updateBri(-2);
      setTimeout(() => setFlowState('QUESTION'), 2000);
    }
  };

  const initiateTrial = () => {
    const current = puzzles[currentStep];
    const mimics = [
      generatePoisonMimic(current.referenceAddr),
      generatePoisonMimic(current.referenceAddr),
      generatePoisonMimic(current.referenceAddr),
      generatePoisonMimic(current.referenceAddr)
    ];
    setTrialOptions([...mimics, current.referenceAddr].sort(() => Math.random() - 0.5));
    setFlowState('TRIAL');
    startTrialTimer();
  };

  const startTrialTimer = () => {
    setTimeLeft(CHALLENGE_DURATION);
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        failTrial('Cognitive Timeout. Biological response delayed.');
      }
    }, 10);
  };

  const failTrial = (msg: string) => {
    playDeniedSound();
    if (timerRef.current) clearInterval(timerRef.current);
    setFlowState('BREACH');
    setErrorMsg(msg);
    updateBri(-10);
    setTimeout(() => {
      setFlowState('QUESTION');
      setInputValue('');
    }, 3000);
  };

  const handleTrialSelection = async (selection: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const current = puzzles[currentStep];
    
    if (selection === current.referenceAddr) {
      playSuccessChime();
      setFlowState('SYNCING');
      const speedBonus = timeLeft > 3.5 ? 2 : 0;
      updateBri(2 + speedBonus);
      await submitClaim(currentStep + 1);
    } else {
      playDeniedSound();
      failTrial('Biological Failure. Intent mismatched.');
    }
  };

  const submitClaim = async (id: number) => {
    const proof = btoa(`${solanaAddress}_${id}_${Date.now()}`).slice(0, 10).toUpperCase();
    try {
      const newClaim: ClaimRecord = { id, receipt: `VG-REC-${proof}`, timestamp: new Date().toLocaleTimeString() };
      const updated = [...claimHistory, newClaim];
      setClaimHistory(updated);
      localStorage.setItem('vigil_claims_v3', JSON.stringify(updated));

      const newXp = xp + 50;
      setXp(newXp);
      setLevel(Math.floor(newXp / 100) + 1);
      localStorage.setItem('vigil_user_xp', newXp.toString());
      
      setFlowState('SUCCESS');
      setTimeout(() => {
        const next = currentStep + 1;
        setCurrentStep(next);
        localStorage.setItem('vigil_challenge_pro_v2', next.toString());
        setInputValue('');
        setFlowState('QUESTION');
      }, 1500);
    } catch (err) {
      setFlowState('ERROR');
      setErrorMsg('Registry Sync Failure.');
      setTimeout(() => setFlowState('QUESTION'), 2000);
    }
  };

  const terminateSession = () => {
    if (confirm("Revoke identity session? Registry records will be preserved.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const currentEarnings = claimHistory.length * 0.1;
  const userRank = bri >= 90 ? "APEX" : bri >= 75 ? "SENTINEL" : bri >= 50 ? "GUARDIAN" : "RECRUIT";

  return (
    <div className="w-full h-full max-w-[1600px] mx-auto flex flex-col relative z-10 overflow-hidden">
      {!isSessionActive ? (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-700 px-4">
           <div className="w-full max-w-2xl text-center space-y-12">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-amber-600/10 border border-amber-500/30 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                  <User className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">User <br/> Assessment.</h2>
              </div>
              <form onSubmit={initiateSession} className="space-y-8">
                <div className="space-y-4">
                  <input autoFocus type="text" value={userHandle} onChange={(e) => setUserHandle(e.target.value)} placeholder="@X_ID" className="w-full bg-[#080808] border-2 border-zinc-900 rounded-3xl py-5 px-8 text-xl font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                  <input type="text" value={solanaAddress} onChange={(e) => setSolanaAddress(e.target.value)} placeholder="SOL_ADDRESS" className="w-full bg-[#080808] border-2 border-zinc-900 rounded-3xl py-5 px-8 text-sm font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-all uppercase" />
                </div>
                {registrationError && <div className="p-5 bg-red-600 border border-red-500 rounded-2xl flex items-center gap-4 animate-pulse"><AlertTriangle className="w-5 h-5 text-white" /><span className="text-[10px] font-black text-white uppercase tracking-widest">{registrationError}</span></div>}
                <button type="submit" className="w-full py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-3xl hover:bg-amber-600 hover:text-white transition-all">INITIATE ASSESSMENT</button>
              </form>
           </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full min-h-0 animate-in fade-in duration-1000 px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-4 py-6 shrink-0">
            <div className="space-y-1 text-center lg:text-left">
               <div className="flex items-center gap-3 justify-center lg:justify-start">
                 <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
                 <span className="text-amber-500 font-black text-[9px] uppercase tracking-[0.6em]">Biological Integrity: MONITORING</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Sentinel Ops.</h2>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
                  <button onClick={() => setView('INTEL')} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'INTEL' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <TerminalIcon className="w-3.5 h-3.5 inline mr-2" /> Decryption
                  </button>
                  <button onClick={() => setView('GLOBAL')} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${view === 'GLOBAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <Globe className="w-3.5 h-3.5 inline mr-2" /> Global Shield
                  </button>
               </div>

               <div className="p-3 h-20 bg-[#0a0a0a] border border-zinc-800 rounded-[1.5rem] shadow-2xl flex items-center gap-4 relative overflow-hidden group">
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                     <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-900" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className={`transition-all duration-1000 ${bri > 80 ? 'text-emerald-500' : bri > 50 ? 'text-amber-500' : 'text-red-500'}`} strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * (bri / 100))} />
                     </svg>
                     <div className="text-center">
                        <div className="text-[10px] font-black text-white italic leading-none">{bri}%</div>
                     </div>
                  </div>
                  <div className="space-y-0.5 pr-2">
                     <div className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Resilience Index</div>
                     <div className={`text-[11px] font-black italic tracking-tighter leading-none ${bri > 80 ? 'text-emerald-500' : bri > 50 ? 'text-amber-500' : 'text-red-500'}`}>{userRank} Rank</div>
                  </div>
               </div>

               <button onClick={terminateSession} className="group flex items-center justify-center w-14 h-20 bg-zinc-900 border border-zinc-800 rounded-[1.5rem] text-zinc-600 hover:text-red-500 transition-all">
                  <LogOut className="w-5 h-5" />
               </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-4 overflow-hidden h-full">
            <div className="lg:col-span-3 h-full overflow-hidden">
              <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] shadow-2xl flex flex-col h-full overflow-hidden">
                <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-3 flex items-center gap-2 shrink-0 mb-4">
                  <List className="w-3 h-3" /> Intel index
                </div>
                <div className="space-y-3 overflow-y-auto no-scrollbar pr-1 flex-1">
                  {puzzles.map((p, idx) => {
                    const isUnlocked = idx < currentStep;
                    const isActive = idx === currentStep;
                    return (
                      <div key={p.id} className={`p-4 rounded-xl border transition-all duration-500 flex items-center justify-between group ${isActive ? 'bg-amber-600/5 border-amber-600/30' : isUnlocked ? 'bg-emerald-600/5 border-emerald-600/20' : 'bg-zinc-950 border-zinc-900 opacity-80'}`}>
                         <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${isActive ? 'bg-amber-600 text-white' : isUnlocked ? 'bg-emerald-600/10 text-emerald-500' : 'bg-zinc-900 text-zinc-400'}`}>
                               {isActive ? <Target className="w-3.5 h-3.5" /> : isUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                            </div>
                            <div className="space-y-0.5">
                               <p className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : isUnlocked ? 'text-emerald-500' : 'text-zinc-500'}`}>Fragment {p.id < 10 ? `0${p.id}` : p.id}</p>
                               <p className="text-[6.5px] font-bold text-zinc-700 uppercase tracking-widest">{isUnlocked ? 'SYNCED' : isActive ? 'IN_PROGRESS' : 'ENCRYPTED'}</p>
                            </div>
                         </div>
                         <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-amber-500 animate-pulse' : isUnlocked ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 h-full overflow-hidden">
              <div className={`h-full bg-[#080808] border-2 rounded-[3.5rem] overflow-hidden transition-all duration-700 flex flex-col ${flowState === 'ERROR' || flowState === 'BREACH' ? 'border-red-900/50' : (flowState === 'TRIAL' || flowState === 'TRIAL_PREP') ? 'border-amber-600/40' : flowState === 'SUCCESS' ? 'border-emerald-600/30' : 'border-zinc-900 shadow-2xl'}`}>
                <div className="h-14 bg-zinc-950 border-b border-zinc-900 flex items-center px-8 justify-between shrink-0">
                   <div className="flex items-center gap-3">
                      <HeartPulse className={`w-3.5 h-3.5 ${bri > 50 ? 'text-emerald-500' : 'text-red-500'} animate-pulse`} />
                      <span className="text-[9px] font-mono text-zinc-600 font-bold uppercase tracking-widest italic">FRAGMENT_{puzzles[currentStep]?.id || 'DONE'} // BRI: {bri}%</span>
                   </div>
                </div>

                <div className={`flex-1 p-6 md:p-8 relative overflow-hidden flex flex-col justify-center`}>
                   {currentStep < puzzles.length ? (
                     <div className="h-full flex flex-col justify-center">
                        {flowState === 'QUESTION' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                              <h3 className="text-xl md:text-2xl font-black text-zinc-100 italic uppercase tracking-tight">{puzzles[currentStep].question}</h3>
                              <form onSubmit={handlePuzzleSubmit} className="space-y-6">
                                  <input autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="ENTER_FRAGMENT_SECRET..." className="w-full bg-black border-2 border-zinc-900 rounded-2xl py-5 px-6 text-sm font-mono text-white focus:outline-none focus:border-amber-600 uppercase" />
                                  <button type="submit" className="px-10 py-4 bg-amber-600 text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-amber-500 transition-all shadow-xl active:scale-95">AUTHENTICATE FRAGMENT</button>
                              </form>
                            </div>
                        )}
                        {flowState === 'TRIAL_PREP' && (
                          <div className="text-center space-y-10">
                            <h3 className="text-2xl font-black text-white italic uppercase">Memorize Target.</h3>
                            <p className="font-mono text-xs text-emerald-500 bg-zinc-950 p-4 border border-zinc-800 rounded-xl">{puzzles[currentStep].referenceAddr}</p>
                            <button onClick={initiateTrial} className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3">
                              <Zap size={14} className="fill-current" /> INITIATE_TRIAL
                            </button>
                          </div>
                        )}
                        {flowState === 'TRIAL' && (
                          <div className="flex flex-col items-center gap-8">
                             <div className="text-4xl font-black text-white">{timeLeft.toFixed(1)}s</div>
                             <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                               {trialOptions.map((opt, i) => (
                                 <button key={i} onClick={() => handleTrialSelection(opt)} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-[9px] text-zinc-400 hover:text-white hover:border-amber-600 transition-all text-center truncate">{opt}</button>
                               ))}
                             </div>
                          </div>
                        )}
                     </div>
                   ) : (
                     <div className="text-center space-y-10">
                        <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(16,185,129,0.2)]">
                           <Trophy className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div className="space-y-4">
                           <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Mission Accomplished.</h3>
                           <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest italic">All intel fragments synchronized. You are now a Sentinel Operator.</p>
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 h-full flex flex-col gap-6 overflow-hidden">
               <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] flex flex-col h-full overflow-hidden shadow-2xl">
                  <div className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] border-b border-zinc-900 pb-3 flex items-center gap-2 shrink-0">
                    <History size={12} /> Claim History
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pt-4">
                    {claimHistory.map((claim, i) => (
                      <div key={i} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-2 animate-in slide-in-from-right-2 duration-300">
                         <div className="flex justify-between items-center">
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Fragment {claim.id}</span>
                            <span className="text-[7px] font-mono text-zinc-700">{claim.timestamp}</span>
                         </div>
                         <div className="text-[9px] font-mono text-zinc-400 break-all">{claim.receipt}</div>
                      </div>
                    ))}
                    {claimHistory.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-30 gap-4">
                         <FileText size={48} />
                         <p className="text-[8px] font-black uppercase tracking-widest">No claims registered.</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};