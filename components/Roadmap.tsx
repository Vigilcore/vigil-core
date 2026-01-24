import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Shield, Brain, Globe, CheckCircle2, Zap, Radio, X, Info, Layers, Lock, Cpu, Dna, Radar } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

interface RoadmapCardProps {
  version: string;
  status: 'ACTIVE' | 'DEVELOPMENT' | 'PLANNED';
  title: string;
  subtitle: string;
  points: string[];
  colorClass: string;
  accentColor: string;
  icon: React.ReactNode;
  onPointInteraction: (point: string | null, pos?: { x: number; y: number }, sourceVersion?: string) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ 
  version, status, title, subtitle, points, colorClass, accentColor, icon, onPointInteraction 
}) => {
  const isEmerald = accentColor === 'emerald';
  const isAmber = accentColor === 'amber';
  const isRed = accentColor === 'red';

  return (
    <div className={`flex-1 min-w-[300px] p-10 bg-[#0B0E12] border border-zinc-900 rounded-[1.5rem] relative group transition-all duration-500 hover:border-${accentColor}-500/40 shadow-2xl flex flex-col`}>
      {/* Background Radial Glow */}
      <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(var(--${accentColor}-rgb),0.08),transparent_70%)] pointer-events-none rounded-[1.5rem]`} />
      
      {/* Header Section */}
      <div className="relative z-10 space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${colorClass}`}>
            Milestone {version}
          </div>
          <div className={`px-2 py-0.5 rounded border ${isEmerald ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : isAmber ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} text-[8px] font-black uppercase tracking-widest`}>
            {status}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-${accentColor}-500/30 group-hover:bg-black ${colorClass}`}>
            {icon}
          </div>
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{title}</h3>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed font-medium italic border-l border-zinc-800 pl-4">
          {subtitle}
        </p>
      </div>

      {/* Points Section */}
      <div className="relative z-10 flex-1">
        <ul className="space-y-4">
          {points.map((point, i) => (
            <li 
              key={i} 
              onMouseEnter={(e) => {
                // Desktop Hover logic
                if (window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024) {
                  onPointInteraction(point, { x: e.clientX, y: e.clientY }, version);
                }
              }}
              onMouseLeave={() => {
                if (window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024) {
                  onPointInteraction(null);
                }
              }}
              onClick={(e) => {
                // Mobile Click logic for Popup
                onPointInteraction(point, { x: e.clientX, y: e.clientY }, version);
              }}
              className={`flex items-start gap-4 transition-all duration-300 cursor-pointer group/item`}
            >
              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full border transition-all duration-300 border-${accentColor}-500 group-hover/item:bg-${accentColor}-500 group-hover/item:border-${accentColor}-500 shadow-[0_0_10px_rgba(59,130,246,0)] group-hover/item:shadow-[0_0_10px_rgba(var(--${accentColor}-rgb),0.5)] shrink-0`} />
              <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors text-white group-hover/item:text-${accentColor}-500`}>
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative Corner Element */}
      <div className={`absolute bottom-6 right-6 w-8 h-8 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none ${colorClass}`}>
        <div className="w-full h-full border-r-2 border-b-2" />
      </div>
    </div>
  );
};

const PRIMITIVE_DETAILS: Record<string, { definition: string; example: string; integration: string; benefit: string }> = {
  "DOM CONTEXT SCAVENGER": {
    definition: "A background process that scans the Document Object Model (DOM) to identify Solana addresses in real-time.",
    example: "As you scroll through a new project's documentation, VIGIL identifies an address and prepares an autopsy before you even hover over it.",
    integration: "Uses a browser-native MutationObserver to watch for text node changes without slowing down the page.",
    benefit: "Identifies threats 'at rest' on a page, preventing you from ever interacting with a deceptive string."
  },
  "TACTICAL HUD MATRIX": {
    definition: "A modular UI layer injected via ShadowDOM that delivers one of 10 specific security verdicts.",
    example: "A pulsing red overlay appears over a detected mimic, physically blocking the 'Copy' area with a threat warning.",
    integration: "Uses CSS-isolated ShadowDOM to ensure the website cannot hide, alter, or 'see' the security warning.",
    benefit: "Provides unhackable visual feedback directly where your attention is focused."
  },
  "8-CHAR SIMILARITY CORE": {
    definition: "A mathematical logic engine that measures the visual distance between your trusted history and a new address.",
    example: "Detecting that a malicious address matches your hardware wallet's first and last 4 characters but differs in the middle.",
    integration: "Implements the Levenshtein distance algorithm on the client-side for sub-millisecond similarity checks.",
    benefit: "Neutralizes vanity attacks that rely on the human habit of only checking address edges."
  },
  "CLIPBOARD GUARD": {
    definition: "A monitor that ensures the data you copy to your clipboard is exactly what gets pasted into your wallet.",
    example: "You copy a safe address, but hidden malware swaps it. VIGIL detects the change and triggers a 'Clipboard Breach' alert.",
    integration: "Listens to system-level copy and paste events to verify string integrity.",
    benefit: "Stops 'Silent Swaps,' one of the most effective and hardest-to-detect malware attacks."
  },
  "DUST PATTERN ANALYZER": {
    definition: "A heuristic filter that identifies zero-value or near-zero transfers used to pollute your transaction history.",
    example: "A bot sends 0.000001 SOL to your account so its address appears at the top of your 'Recent' list. VIGIL flags and hides it.",
    integration: "Checks transaction amounts and sender frequency against your typical interaction volume.",
    benefit: "Keeps your transaction history clean of 'poisoned' entries that you might accidentally select."
  },
  "LOCAL TRUST GRAPH": {
    definition: "An encrypted, private local database of addresses you have successfully and repeatedly interacted with.",
    example: "After sending SOL to your exchange twice, VIGIL marks the address as a 'Verified Node' with a green checkmark.",
    integration: "Uses browser-local IndexedDB to store a mapping of 'Confirmed Intent' destinations.",
    benefit: "Instantly identifies 'Safe Zones' so you can move with confidence during high-speed trades."
  },
  "CANONICAL MINT REGISTRY": {
    definition: "A verification list that checks token contract IDs against official, verified asset records.",
    example: "You are buying 'USDC,' but VIGIL warns you that the contract ID does not match the official Circle USDC mint.",
    integration: "A hardcoded, local-first list of the top 100 verified Solana assets.",
    benefit: "Prevents 'Fake Asset' scams where imposter tokens are used to drain your wallet or liquidity."
  },
  "UNICODE HOMOGRAPH SHIELD": {
    definition: "A detector for look-alike characters from non-standard alphabets used to impersonate valid Base58 strings.",
    example: "A scam site displays an address using a Greek 'ο' that looks identical to a Latin 'o' to trick your eye.",
    integration: "Scans DOM text nodes for extended Unicode characters that are illegal in valid Solana addresses.",
    benefit: "Prevents visual spoofing where the address looks identical to a human but is technically a different destination."
  },
  "BRI CALIBRATION ENGINE": {
    definition: "A system that measures your personal ability to spot these threats during training (the Silos).",
    example: "If you pass a Silo test quickly, your BRI increases. If you miss a 'Poison' address, it decreases, and the system advises you to take a break.",
    integration: "A persistent state variable that updates based on your interactions with the site's simulations.",
    benefit: "Makes you aware of your own 'Cognitive Fatigue'—the point where you are most likely to make a mistake."
  },
  "OFFLINE-ONLY STANDARD": {
    definition: "A zero-knowledge architecture where all security mathematics happen on your device, not on our servers.",
    example: "You can perform a full VIGIL security audit on an address even while in Airplane Mode.",
    integration: "All logic is bundled into the client-side binary; no 'Phone Home' tracking requests are permitted.",
    benefit: "Absolute Privacy. VIGIL never knows your balance, your identity, or who you are transacting with."
  },
  "GLOBAL CLUSTER MAPPING": {
    definition: "A visual forensic layer that groups disparate malicious addresses by their primary funding source ('The Mother Wallet').",
    example: "Identifying one mimic exposes the entire swarm of 10k+ addresses deployed in the same campaign.",
    integration: "Integrated into the Mesh graph to map root actors and adversarial genesis nodes.",
    benefit: "Neutralizes mass-automated campaigns by identifying the source entity rather than individual strings."
  },
  "P2P THREAT PROPAGATION": {
    definition: "A low-latency intelligence relay that broadcasts verified intercept signatures from one unit to the entire network.",
    example: "If a user in Singapore intercepts a new poison mimic, your Field Unit is immunized against that pattern in under 200ms.",
    integration: "Utilizes the Sentinel Mesh gossip protocol for decentralized intelligence sharing.",
    benefit: "Provides collective immunity; the first user to see a threat secures the entire network."
  },
  "MULTI-NODE SYNC PROTOCOL": {
    definition: "The state-management logic ensuring your BRI score and Trust Graph are mirrored across all authorized surfaces.",
    example: "Your 'Safe Labels' set on the browser extension appear instantly on your mobile keyboard interface.",
    integration: "Cryptographically mirrored state across Web, Extension, and Mobile surfaces.",
    benefit: "Eliminates state divergence, maintaining a consistent security perimeter across all user devices."
  },
  "ADVERSARIAL HONEYPOTS": {
    definition: "Controlled on-chain decoy nodes deployed by VIGIL Research to attract and analyze new vanity-generation heuristics.",
    example: "VIGIL observes predator behavior in the wild before they target real retail participants.",
    integration: "Active deployment of high-entropy traps used to feed the Heuristic Matrix.",
    benefit: "Proactive intelligence gathering to stay ahead of evolving adversarial compute capabilities."
  },
  "REAL-TIME REGISTRY UPDATES": {
    definition: "An automated high-frequency data push that updates local safety databases without requiring manual software restarts.",
    example: "New malicious clusters are blacklisted on your device as soon as they are identified by the Mesh.",
    integration: "Automated background registry streaming for zero-day protection.",
    benefit: "Ensures the local heuristic matrix is always calibrated to the absolute latest on-chain metadata."
  },
  "DEV DNA SEQUENCER": {
    definition: "A behavioral analysis tool that scans a deployer's 'Genesis SOL' history to count failed projects and genetic code patterns.",
    example: "VIGIL identifies a 'Serial Rugger' by tracing the genetic lineage of their funding through multiple hop-wallets.",
    integration: "Recursive on-chain funding path audit engine.",
    benefit: "Identifies adversaries by their transactional DNA, even when they deploy from fresh wallets."
  },
  "BUNDLING FORENSICS": {
    definition: "A recursive funding-path auditor detecting if the top 20 holders of a token were funded by the same entity.",
    example: "Revealing a pre-programmed exit where 40% of supply is controlled by one developer cluster.",
    integration: "Supply concentration heatmap analysis integrated into the Market Intel HUD.",
    benefit: "Exposes 'Concentration Traps' where a single entity controls enough supply to bypass organic market discovery."
  },
  "VIGIL SCANNER (WEB NATIVE)": {
    definition: "A standalone technical analysis suite mapping liquidity clusters and adversarial DNA without browser extension requirements.",
    example: "A trader scans a trending CA and immediately identifies a block-0 bundled launch through a high-fidelity visual graph.",
    integration: "Server-side high-performance indexers feeding a React-based forensic frontend.",
    benefit: "Universal accessibility for high-fidelity technical analysis on any device."
  },
  "VIGIL DEX: SECURE SETTLEMENT": {
    definition: "A high-velocity decentralized exchange interface with the Layer 0.5 security standard natively integrated into the trade lifecycle.",
    example: "Initiating a swap triggers a mandatory Retinal Shield verification of the liquidity provider and destination mint.",
    integration: "Solana liquidity aggregation via Jupiter V6 API wrapped in VIGIL interceptor logic.",
    benefit: "Eliminates visual deception risks at the point of capital deployment."
  },
  "MULTI-CHAIN RELAY": {
    definition: "Expansion of the VIGIL heuristic matrix to support major EVM and non-EVM ecosystems.",
    example: "Identifying a vanity mimic on an EVM network using the same entropy deviation patterns established on Solana.",
    integration: "Cross-chain regex and checksum calibration libraries for standardized cryptographic architectures.",
    benefit: "Unified human-layer security across the entire fragmented liquidity landscape."
  },
  "SOVEREIGN NATIVE WALLET": {
    definition: "A dedicated mobile and desktop wallet application with the 0.5 standard hardcoded into the kernel.",
    example: "The 'Approve' sequence is physically blocked by the hardware enclave until biometrics confirm intent parity.",
    integration: "Native secure-enclave integration with shared local provenance history.",
    benefit: "Absolute security isolation from browser-based attack vectors."
  },
  "NATIVE MOBILE KEYBOARD": {
    definition: "A system-level custom keyboard for iOS and Android that performs forensic checks on pasted strings before they enter a wallet.",
    example: "You copy an address from a Telegram DM; as you paste it into your mobile wallet, the VIGIL keyboard triggers a FaceID lock.",
    integration: "Implemented as a native OS input-method extension with shared local history.",
    benefit: "Extends Layer 0.5 security to mobile participants without relying on browser extensions."
  },
  "BIOMETRIC FRICTION": {
    definition: "A mandatory biometric verification step triggered by the system when high-entropy address collisions are detected.",
    example: "The 'Sign' button becomes a 'Scan Fingerprint' button if the destination matches a known vanity cluster pattern.",
    integration: "Hooks into WebAuthn and native OS biometric APIs.",
    benefit: "Forces a conscious biological pause at the exact moment a visual bypass is most likely."
  },
  "VIGIL APP ECOSYSTEM": {
    definition: "A touch-optimized mobile environment centralizing the Scanner, DEX, and Wallet layers.",
    example: "A user navigates from a forensic scan directly into a secure swap within a single verified surface.",
    integration: "PWA and React Native cross-platform application architecture.",
    benefit: "Consistency of the 'Sovereign Tactical' aesthetic and security standard on mobile units."
  }
};

const PrimitiveDetailModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  primitive: string;
  sourceVersion: string | null;
  mousePos: { x: number; y: number } | null;
}> = ({ isOpen, onClose, primitive, sourceVersion, mousePos }) => {
  if (!isOpen || !PRIMITIVE_DETAILS[primitive]) return null;
  const detail = PRIMITIVE_DETAILS[primitive];
  
  // High fidelity mobile detection
  const isMobile = window.innerWidth < 1024;

  const getTheme = () => {
    if (sourceVersion === "01") return { color: "emerald", hex: "#10b981", bg: "bg-emerald-600/10", panelBg: "#041008" };
    if (sourceVersion === "02") return { color: "amber", hex: "#f59e0b", bg: "bg-amber-600/10", panelBg: "#120a04" };
    return { color: "red", hex: "#ef4444", bg: "bg-red-600/10", panelBg: "#120404" };
  };

  const theme = getTheme();

  const getStyle = (): React.CSSProperties => {
    if (isMobile) {
      return { 
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '36rem',
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: `${theme.panelBg}f2`,
        zIndex: 1001,
        pointerEvents: 'auto'
      };
    }
    
    if (!mousePos) return {};

    const modalWidth = 480; 
    const modalHeight = 400; 
    const headerGuard = 480; 

    let left = sourceVersion === "01" ? (window.innerWidth / 2) - (modalWidth / 2) : 100;
    let top = Math.max(headerGuard, mousePos.y);
    
    if (top + (modalHeight / 2) > window.innerHeight - 40) {
      top = window.innerHeight - (modalHeight / 2) - 40;
    }

    return {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      transform: 'translateY(-50%)',
      width: `${modalWidth}px`,
      pointerEvents: 'auto',
      backgroundColor: `${theme.panelBg}f2`,
      zIndex: 1001
    };
  };

  const modalContent = (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 ${isMobile ? 'bg-black/90 pointer-events-auto backdrop-blur-xl' : 'pointer-events-none'}`}>
      {/* Backdrop for mobile closing */}
      {isMobile && <div className="absolute inset-0 cursor-pointer" onClick={onClose} />}
      
      <div 
        style={getStyle()}
        className={`relative backdrop-blur-3xl border-2 rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_150px_rgba(0,0,0,1)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 border-${theme.color}-500/40 custom-scrollbar`}
      >
        <div className={`absolute inset-0 opacity-[0.05] pointer-events-none bg-[size:25px_25px] bg-[linear-gradient(rgba(var(--${theme.color}-rgb),0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--${theme.color}-rgb),0.2)_1px,transparent_1px)]`} />
        
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-${theme.color}-400 shadow-[0_0_15px_${theme.hex}] animate-pulse`} />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-3 text-zinc-500 hover:text-white transition-colors z-50 rounded-full hover:bg-white/5">
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-8 relative z-10">
          <div className="space-y-3">
            <TechLabel text="SYSTEM_PRIMITIVE_AUDIT" color={theme.color} />
            <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{primitive}</h3>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 text-${theme.color}-700`}>Definition</span>
                <p className="text-zinc-200 text-sm md:text-lg leading-relaxed font-medium italic">"{detail.definition}"</p>
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 text-${theme.color}-700`}>Integration</span>
                <p className={`text-${theme.color}-500/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed`}>[{detail.integration}]</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="p-6 bg-black/60 border border-zinc-800 rounded-2xl shadow-inner">
                 <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 text-${theme.color}-500`}>Behavioral Example</span>
                 <p className="text-zinc-400 text-xs md:text-sm italic leading-relaxed font-medium">"{detail.example}"</p>
              </div>
              <div className={`${theme.bg} border rounded-2xl p-6 border-${theme.color}-500/20`}>
                 <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 text-${theme.color}-500`}>Primary Benefit</span>
                 <p className="text-zinc-300 text-xs md:text-sm font-bold uppercase tracking-tight leading-relaxed">{detail.benefit}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 rounded-br-3xl pointer-events-none border-${theme.color}-500/20`} />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export const Roadmap: React.FC = () => {
  const [selectedPrimitive, setSelectedPrimitive] = useState<string | null>(null);
  const [sourceVersion, setSourceVersion] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const handleInteraction = (p: string | null, pos?: { x: number; y: number }, version?: string) => {
    const isMobile = window.innerWidth < 1024;

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (p) {
      setSelectedPrimitive(p);
      setSourceVersion(version || null);
      if (pos) setMousePos(pos);
    } else {
      if (!isMobile) {
        closeTimeoutRef.current = window.setTimeout(() => {
          setSelectedPrimitive(null);
          setSourceVersion(null);
          setMousePos(null);
        }, 100);
      } else {
        setSelectedPrimitive(null);
        setSourceVersion(null);
        setMousePos(null);
      }
    }
  };

  return (
    <section className="px-1 md:px-20 py-24 bg-[#020202] relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-6">
            <div className="h-[1px] w-16 bg-zinc-900" />
            <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.6em]">Ecosystem Evolution // Horizon 2026</span>
            <div className="h-[1px] w-16 bg-zinc-900" />
          </div>
          <h2 className="text-[2.25rem] md:text-[4.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            SECURITY <br/> EXPANSION.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <RoadmapCard 
            version="01" 
            status="ACTIVE" 
            title="Core Primitives" 
            subtitle="Establishing the foundational Layer 0.5 security standard."
            points={[
              "DOM CONTEXT SCAVENGER", "TACTICAL HUD MATRIX", "8-CHAR SIMILARITY CORE", "CLIPBOARD GUARD", "DUST PATTERN ANALYZER",
              "LOCAL TRUST GRAPH", "CANONICAL MINT REGISTRY", "UNICODE HOMOGRAPH SHIELD", "BRI CALIBRATION ENGINE", "OFFLINE-ONLY STANDARD"
            ]}
            colorClass="text-emerald-500" 
            accentColor="emerald"
            icon={<Cpu size={24} />}
            onPointInteraction={handleInteraction}
          />
          <RoadmapCard 
            version="02" 
            status="DEVELOPMENT" 
            title="Mesh Expansion" 
            subtitle="Scaling local intelligence via collective threat feeds."
            points={[
               "GLOBAL CLUSTER MAPPING", "P2P THREAT PROPAGATION", "MULTI-NODE SYNC PROTOCOL", "ADVERSARIAL HONEYPOTS", "REAL-TIME REGISTRY UPDATES", "DEV DNA SEQUENCER", "BUNDLING FORENSICS"
            ]}
            colorClass="text-amber-500" 
            accentColor="amber"
            icon={<Globe size={24} />}
            onPointInteraction={handleInteraction}
          />
          <RoadmapCard 
            version="03" 
            status="PLANNED" 
            title="Universal Layer" 
            subtitle="Consolidating the 0.5 standard into a sovereign multi-chain ecosystem."
            points={[
              "VIGIL SCANNER (WEB NATIVE)", "VIGIL DEX: SECURE SETTLEMENT", "MULTI-CHAIN RELAY", "SOVEREIGN NATIVE WALLET", "NATIVE MOBILE KEYBOARD", "BIOMETRIC FRICTION", "VIGIL APP ECOSYSTEM"
            ]}
            colorClass="text-red-500" 
            accentColor="red"
            icon={<Shield size={24} />}
            onPointInteraction={handleInteraction}
          />
        </div>

        <PrimitiveDetailModal 
          isOpen={!!selectedPrimitive} 
          onClose={() => handleInteraction(null)} 
          primitive={selectedPrimitive || ''} 
          sourceVersion={sourceVersion}
          mousePos={mousePos}
        />
      </div>
    </section>
  );
};