import React from 'react';
import { BarChart3, Users, TrendingUp, ShieldX, ExternalLink, AlertTriangle, Globe, Cpu, Link as LinkIcon, Eye, Brain, Activity } from 'lucide-react';

interface StickyCardProps {
  icon: React.ReactNode;
  label: string;
  scopeLabel?: string;
  title: string;
  description: string;
  source: string;
  stat: string;
  statLabel: string;
  colorClass: string;
  borderClass?: string;
  index: number;
  link?: string;
}

const StickyCard: React.FC<StickyCardProps> = ({ 
  icon, label, scopeLabel, title, description, source, stat, statLabel, colorClass, borderClass, index, link 
}) => {
  const activeBorderColor = borderClass || colorClass;
  const borderColor = activeBorderColor.replace('text-', 'border-');

  // Staggered offsets for persistent stacking with proper spacing
  // Balance: small enough to allow sticky behavior, large enough for visual separation
  const baseOffsetMobile = 60;
  const baseOffsetDesktop = 100;
  // Increment creates visual stacking offset while maintaining scrollable sticky behavior
  const spacingIncrementMobile = 20;
  const spacingIncrementDesktop = 70;
  
  const mobileTop = baseOffsetMobile + (index * spacingIncrementMobile);
  const desktopTop = baseOffsetDesktop + (index * spacingIncrementDesktop);

  return (
    <>
      {index > 0 && (
        <div className="h-8 md:h-32" aria-hidden="true" />
      )}
    <div 
        className={`sticky w-full last:mb-0 sticky-container-${index}`} 
      style={{ 
        top: `var(--stack-top)`,
        zIndex: 50 + index,
        '--stack-top': `${mobileTop}px`
      } as React.CSSProperties}
    >
      <style>{`
        @media (min-width: 768px) {
          .sticky-container-${index} { --stack-top: ${desktopTop}px; }
        }
      `}</style>
      
        <div className={`bg-[#0c0c0c] border ${borderColor}/30 border-t-[4px] ${borderColor} rounded-[20px] md:rounded-[32px] p-5 md:p-8 lg:pl-8 lg:pr-16 shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] group overflow-hidden relative transition-all duration-500 mx-1 md:mx-0`}>
        <div className={`absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 opacity-5 blur-[60px] md:blur-[120px] rounded-full transition-opacity group-hover:opacity-10 ${activeBorderColor.replace('text-', 'bg-')}`} />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">
          <div className="lg:col-span-7 space-y-3 md:space-y-5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-5">
              <div className={`p-2 md:p-3 rounded-[8px] bg-zinc-950 border border-zinc-700 ${colorClass}`}>
                {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 16 }) : icon}
              </div>
              <div className={`px-3 md:px-5 py-1 md:py-2 rounded-full bg-opacity-10 border border-opacity-40 text-[8px] md:text-[11px] font-black tracking-widest uppercase ${activeBorderColor.replace('text-', 'bg-')} ${activeBorderColor.replace('text-', 'border-')} ${activeBorderColor}`}>
                {label}
              </div>
              {scopeLabel && (
                <div className="px-3 md:px-5 py-1 md:py-2 rounded-full bg-zinc-900 border border-zinc-800 text-[8px] md:text-[11px] font-black tracking-widest uppercase text-zinc-500">
                  {scopeLabel}
                </div>
              )}
            </div>
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] italic uppercase whitespace-pre-line">
                {title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-xl lg:text-2xl leading-relaxed font-medium max-w-3xl italic">
                {description}
              </p>
            </div>
            <div 
              className={`flex items-center gap-2 text-[8px] md:text-[12px] font-black text-zinc-500 group-hover:text-white uppercase tracking-widest pt-3 md:pt-6 border-t border-zinc-800 transition-colors duration-500 ${link ? 'cursor-pointer' : ''}`}
              onClick={link ? (e) => { e.stopPropagation(); window.open(link, '_blank', 'noopener,noreferrer'); } : undefined}
            >
              <ExternalLink size={12} className="opacity-50" />
              {source}
            </div>
          </div>
          <div className="lg:col-span-5 text-center lg:text-right flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-zinc-800 pt-4 md:pt-8 lg:pt-0 lg:pl-8 min-w-0">
            <div className={`text-4xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-black tracking-tighter italic leading-none mb-2 md:mb-4 ${colorClass} drop-shadow-2xl whitespace-nowrap`}>
              {stat}
            </div>
            <div className="text-[9px] md:text-[14px] font-black text-zinc-500 uppercase tracking-[0.3em] whitespace-nowrap">
              {statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export const ScamStats: React.FC = () => {
  const cards = [
    { icon: <Globe />, label: "SUPPLEMENTARY INTEL", scopeLabel: "MARKET TRENDS", title: "Industrialized Theft Standard", description: "Aggregate on-chain estimates for scams and fraud reached $17 billion in 2025, reflecting the terminal professionalization of cybercriminal infrastructure.", source: "CHAINALYSIS: 2026 CRYPTO CRIME REPORT", stat: "$17B", statLabel: "PROJECTED LOSS (2025)", colorClass: "text-amber-500", link: "https://www.chainalysis.com/blog/crypto-scams-2026/" },
    { icon: <Brain />, label: "2025 THREAT INTEL", title: "COGNITIVE\nPERIMETER\nBREACH", description: "Phishing and key compromises now constitute nearly 75% of total losses, exposing the terminal failure of protocol-only security models.", source: "CERTIK: HACK3D WEB3 SECURITY REPORT 2025", stat: "$1.57B", statLabel: "HUMAN-LAYER EXTRACTION", colorClass: "text-red-500", link: "https://www.certik.com/resources/blog/hack3d-the-web3-security-report-2025" },
    // { icon: <BarChart3 />, label: "GLOBAL IMPACT", scopeLabel: "UI ATTACKS", title: "Billions Lost to Mimicry", description: "Address poisoning evolved into a multi-billion dollar illicit industry. Total global losses exceeded $3.85B by 31st Dec 2025.", source: "SLOWMIST: GLOBAL CRYPTO CRIME 2025", stat: "$3.85B", statLabel: "TOTAL LOSSES (2025)", colorClass: "text-red-500", borderClass: "text-red-500" },
    { icon: <Users />, label: "COGNITIVE GAP", title: "The 8-Char Blind Spot", description: "Adversaries exploit visual truncation to bypass scrutiny. 80% of all Web3 financial losses now originate at the human layer through phishing and intent deception.", source: "CERTIK: HACK3D WEB3 SECURITY REPORT 2025", stat: "80%", statLabel: "TOTAL LOSS VECTOR", colorClass: "text-blue-500" },
    // { icon: <TrendingUp />, label: "SOLANA ACTIVITY", title: "Automated Deception", description: "In 2025, bots generate over 20,000 malicious 'zero-value' transfers per hour to 'poison' history logs.", source: "SLOWMIST: CHAIN HEURISTICS ANALYSIS", stat: "528k+", statLabel: "DAILY ATTACKS", colorClass: "text-orange-500" },
    { icon: <ShieldX />, label: "RECORD LOSS", title: "The $71M 'Poison' Record", description: "In 2024, a high-value wallet lost 1,155 WBTC using a vanity address that matched the victim's destination edges.", source: "ON-CHAIN FORENSICS: WHALE EXPLOIT ANALYSIS", stat: "$71M+", statLabel: "SINGLE LOSS EVENT", colorClass: "text-red-500", link: "https://slowmist.medium.com/small-bait-big-fish-unveiling-the-1155-wbtc-phishing-incident-22bf53b6fe60" },
    { icon: <AlertTriangle />, label: "LATEST INCIDENT", title: "$50M USDT Poisoning", description: "In Dec 2025, a trader lost $50M USDT by selecting a poisoned look-alike address from transaction history.", source: "BINANCE SQUARE - COINTELEGRAPH", stat: "$50M", statLabel: "SINGLE LOSS (DEC 2025)", colorClass: "text-rose-600", link: "https://www.binance.com/en-IN/square/post/33963187530122" },
    { icon: <Cpu />, label: "AI EFFICIENCY", title: "Algorithmic Extraction", description: "AI-enabled scams extract 4.5 times more revenue per operation compared to legacy methods, leveraging deepfakes and automated victim management.", source: "CHAINALYSIS: 2026 CRYPTO CRIME REPORT", stat: "4.5x", statLabel: "AI REVENUE MULTIPLIER", colorClass: "text-cyan-500", link: "https://www.chainalysis.com/blog/crypto-scams-2026/?utm_source=chatgpt.com" },
    { icon: <LinkIcon />, label: "VECTOR EVOLUTION", title: "Identity Deception Dominance", description: "Impersonation scams saw a 1400% year-over-year increase, signaling a definitive shift toward high-fidelity trust-based social engineering.", source: "CHAINALYSIS: 2026 CRYPTO CRIME REPORT", stat: "1400%", statLabel: "IMPERSONATION SURGE", colorClass: "text-purple-500", link: "https://www.chainalysis.com/blog/crypto-scams-2026/?utm_source=chatgpt.com" },
    // { icon: <Eye />, label: "Q4 SURVEILLANCE", title: "Retinal Hijack Extraction", description: "Human-layer deception accounted for nearly half of all tracked losses in Q4 2025, validating the terminal vulnerability of the retinal perimeter.", source: "SLOWMIST: 2025 Q4 MISTTRACK ANALYSIS", stat: "$46.51M", statLabel: "Q4 PHISHING LOSSES", colorClass: "text-indigo-500" },
    { icon: <Globe />, label: "NETWORK INTEL", scopeLabel: "L1 ACTIVITY", title: "ETHEREUM\nACTIVITY\nPEAK", description: "Network activity hit a record 2.5 million daily active addresses in Jan 2026. High-fidelity telemetry identifies this as automated 'Packet Storm' volume rather than retail growth.", source: "COINDESK: ASIA MORNING BRIEFING (JAN 20, 2026)", stat: "2.5M", statLabel: "DAILY ACTIVE ADDRESSES", colorClass: "text-cyan-500", link: "https://www.coindesk.com/markets/2026/01/20/ethereum-posts-record-on-chain-activity-as-research-points-to-possible-spam-driven-growth-asia-morning-briefing" },
    { icon: <Activity />, label: "THREAT SIGNAL", title: "SPAM\nDRIVEN\nDYNAMICS", description: "Research indicates that the recent surge is largely driven by automated mimicry and 'spam-based' growth patterns, the primary infrastructure for mass address poisoning campaigns.", source: "COINDESK / MARKET_RESEARCH_UNIT", stat: "60%+", statLabel: "AUTOMATED_TRAFFIC_BIAS", colorClass: "text-red-500", link: "https://www.coindesk.com/markets/2026/01/20/ethereum-posts-record-on-chain-activity-as-research-points-to-possible-spam-driven-growth-asia-morning-briefing" }
  ];

  return (
    <section className="px-1 md:px-20 pt-8 pb-12 md:pt-16 md:pb-24 relative z-10 bg-[#020202] overflow-visible">
      <div className="max-w-7xl mx-auto overflow-visible relative">
        <div className="text-center space-y-4 md:space-y-8 max-w-4xl mx-auto mb-12 md:mb-32 px-4">
          <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em] block">The Cost of Silence</span>
          <h2 className="text-[2.25rem] md:text-[4.5rem] font-black text-white tracking-tighter italic leading-[0.8] uppercase">Address <br/> Poisoning.</h2>
          <p className="text-zinc-500 text-sm md:text-2xl font-medium mt-6 md:mt-12 max-w-2xl mx-auto italic">
            Real-world data through 2025 reveals the devastating scale of human-layer attacks.
          </p>
          <p className="text-zinc-400 text-sm md:text-lg font-medium mt-4 md:mt-6 max-w-3xl mx-auto italic leading-relaxed">
            Behind every statistic lies a pattern of industrialized deception. These datasets reveal a coordinated attack surface where protocol-level security fails at the terminal point of human decision—targeting the gap between intent and cryptographic execution.
          </p>
        </div>
        <div className="relative space-y-0 overflow-visible min-h-[160vh] md:min-h-[300vh]">
          {cards.map((card, idx) => (
            <StickyCard key={idx} index={idx} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
};