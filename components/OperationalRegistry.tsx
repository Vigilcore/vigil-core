
import React, { useEffect, useState, useRef } from 'react';
import { X, Terminal, Download, Share2, ImageIcon, Type, Palette } from 'lucide-react';

import { PrivacyContent } from './docs/PrivacyContent';
import { DisclaimerContent } from './docs/DisclaimerContent';
import { TechnicalSpecContent } from './docs/TechnicalSpecContent';
import { TermsContent } from './docs/TermsContent';
import { PricingContent } from './docs/PricingContent';
import { WhitepaperContent } from './docs/WhitepaperContent';
import { TechnicalDocumentationContent } from './docs/TechnicalDocumentationContent';
import { ThreatModelContent } from './docs/ThreatModelContent';
import { ResearchBriefingContent } from './docs/ResearchBriefingContent';
import { CodeRegistryContent } from './docs/CodeRegistryContent';
import { IdentityManifestContent } from './docs/IdentityManifestContent';
import { HowToUseContent } from './docs/HowToUseContent';
import { MeshIntelligenceContent } from './docs/MeshIntelligenceContent';
import { Leaderboard } from './Leaderboard';
import { HubHeader } from './HubHeader';
import { VigilScanner } from './VigilScanner';
import { UsageData } from '../services/geminiService';
import { TechLabel, SectionHeader, DocCard } from './docs/DocHelpers';

export type RegistryDoc = 'how_to_use' | 'privacy' | 'terms' | 'docs' | 'audit' | 'disclaimer' | 'pricing' | 'research_01' | 'technical_spec' | 'technical_doc' | 'press_kit' | 'whitepaper' | 'threat_model' | 'challenge' | 'comms_terminal' | 'social_forge' | 'prd_10_a' | 'master_broadcast' | 'chronicle_library' | 'identity_manifest' | 'mesh_intel' | 'narrative_forge' | 'header_architect' | 'leaderboard' | null;

const PressKitContent = () => (
  <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-purple-500/20 relative">
    <SectionHeader 
      id="DOC: VG-MEDIA-2026.01"
      category="Strategic Brand Unit"
      title="Media Kit."
      subtitle="Canonical brand assets and institutional visual logic"
      colorClass="text-purple-500"
      bgGlow="bg-purple-600/10"
    />

    <div className="space-y-12 px-6 md:px-12 relative z-10">
      <DocCard border="purple" glow>
        <div className="space-y-6">
           <h3 className="text-2xl font-black text-white italic uppercase">Institutional Voice</h3>
           <p className="text-zinc-400 text-lg leading-relaxed font-medium">
             VIGIL projects an image of <span className="text-white">Sovereign Authority</span>. Our visual language is defined by the "Tactical Monolith" aesthetic—precision engineering meets high-refractive depth.
           </p>
        </div>
      </DocCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <DocCard border="zinc">
            <div className="flex items-center gap-4 mb-6">
               <ImageIcon className="text-purple-500" size={24} />
               <h4 className="text-xl font-black text-white uppercase italic">Brand Marks</h4>
            </div>
            <div className="space-y-4">
               <div className="p-8 bg-black border border-zinc-900 rounded-3xl flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                    <div className="w-10 h-10 bg-black rotate-45" />
                  </div>
               </div>
               <button className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-xl hover:text-white transition-all flex items-center justify-center gap-3">
                  <Download size={14} /> DOWNLOAD VECTOR_SUITE (.SVG)
               </button>
            </div>
         </DocCard>

         <DocCard border="zinc">
            <div className="flex items-center gap-4 mb-6">
               <Palette className="text-purple-500" size={24} />
               <h4 className="text-xl font-black text-white uppercase italic">Palette Std</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Void Black', hex: '#050505', contrast: 'text-zinc-600' },
                 { label: 'Vigil Blue', hex: '#3b82f6', contrast: 'text-blue-900' },
                 { label: 'Saccadic Cyan', hex: '#22d3ee', contrast: 'text-cyan-900' },
                 { label: 'Threat Red', hex: '#ef4444', contrast: 'text-red-900' }
               ].map(color => (
                 <div key={color.hex} className="p-4 bg-black border border-zinc-900 rounded-2xl space-y-3">
                    <div className="h-10 w-full rounded-xl" style={{ backgroundColor: color.hex }} />
                    <div className="space-y-1">
                       <div className="text-[10px] font-black text-white uppercase">{color.label}</div>
                       <div className={`text-[8px] font-mono ${color.contrast}`}>{color.hex}</div>
                    </div>
                 </div>
               ))}
            </div>
         </DocCard>
      </div>

      <DocCard border="purple">
         <div className="flex items-center gap-4 mb-6">
            <Type className="text-purple-500" size={24} />
            <h4 className="text-xl font-black text-white uppercase italic">Typography</h4>
         </div>
         <div className="space-y-8">
            <div className="space-y-2">
               <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Primary: Inter Black Italic</span>
               <div className="text-4xl font-black text-white uppercase italic tracking-tighter">THE QUICK BROWN FOX.</div>
            </div>
            <div className="space-y-2">
               <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Telemetry: JetBrains Mono</span>
               <div className="text-xl font-mono text-zinc-500 uppercase tracking-widest">0x8821_SOVEREIGN_NODE_STABLE</div>
            </div>
         </div>
      </DocCard>
    </div>
  </div>
);

interface DocContentProps {
  type: RegistryDoc;
  onOpenDoc: (doc: RegistryDoc) => void;
  userWallet?: string;
  userBri?: number;
  userXp?: number;
  lightMode?: boolean;
}

const DocContent = ({ type, onOpenDoc, userWallet, userBri, userXp, lightMode }: DocContentProps) => {
  switch (type) {
    case 'identity_manifest': return <IdentityManifestContent />;
    case 'whitepaper': return <WhitepaperContent lightMode={lightMode} />;
    case 'disclaimer': return <DisclaimerContent />;
    case 'terms': return <TermsContent />;
    case 'privacy': return <PrivacyContent />;
    case 'pricing': return <PricingContent />;
    case 'technical_spec': return <TechnicalSpecContent />;
    case 'technical_doc': return <TechnicalDocumentationContent />;
    case 'threat_model': return <ThreatModelContent />;
    case 'research_01': return <ResearchBriefingContent lightMode={lightMode} />;
    case 'how_to_use': return <HowToUseContent />;
    case 'press_kit': return <PressKitContent />;
    case 'prd_10_a': return <CodeRegistryContent />;
    case 'mesh_intel': return <MeshIntelligenceContent />;
    case 'leaderboard': return (
      <div className="animate-in zoom-in duration-700">
        <HubHeader number="11" title="Merit Ledger." subtitle="Sentinel Network Rankings" />
        <Leaderboard userWallet={userWallet} userBri={userBri || 0} userXp={userXp || 0} />
      </div>
    );
    case 'docs': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-blue-500/20 relative">
        <SectionHeader 
          id="DOC: VG-DOCS-2026.01"
          category="Knowledge Base"
          title="Documentation Archive."
          subtitle="Technical reference and operational guides"
          colorClass="text-blue-500"
          bgGlow="bg-blue-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="blue" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Operational Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                This section provides access to the complete documentation archive. Use the navigation sidebar to access specific technical documents, specifications, and operational guides.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'audit': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-purple-500/20 relative">
        <SectionHeader 
          id="DOC: VG-AUDIT-2026.01"
          category="Certification Unit"
          title="Audit Reports."
          subtitle="Security assessments and compliance verification"
          colorClass="text-purple-500"
          bgGlow="bg-purple-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="purple" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Audit Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                Audit reports and security assessments are available through the Final Proficiency Audit section in the main navigation.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'challenge': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-emerald-500/20 relative">
        <SectionHeader 
          id="DOC: VG-CHALLENGE-2026.01"
          category="Community Unit"
          title="Active Challenge."
          subtitle="Competitive engagement and merit acquisition"
          colorClass="text-emerald-500"
          bgGlow="bg-emerald-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="emerald" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Challenge Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                Active challenges are available through the Active Challenge section in the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'comms_terminal': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-cyan-500/20 relative">
        <SectionHeader 
          id="DOC: VG-COMMS-2026.01"
          category="Communication Unit"
          title="Comms Terminal."
          subtitle="Network communication and messaging interface"
          colorClass="text-cyan-500"
          bgGlow="bg-cyan-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="cyan" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Communication Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                The Comms Terminal is available through the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'social_forge': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-blue-500/20 relative">
        <SectionHeader 
          id="DOC: VG-SOCIAL-2026.01"
          category="Content Generation Unit"
          title="Social Forge."
          subtitle="Social media asset generation and distribution"
          colorClass="text-blue-500"
          bgGlow="bg-blue-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="blue" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Social Media Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                The Social Forge interface is available through the Sovereign Social Forge section in the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'master_broadcast': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-red-500/20 relative">
        <SectionHeader 
          id="DOC: VG-BROADCAST-2026.01"
          category="Distribution Unit"
          title="Master Broadcast."
          subtitle="Network-wide announcement and messaging system"
          colorClass="text-red-500"
          bgGlow="bg-red-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="red" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Broadcast Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                The Master Broadcast system is available through the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'chronicle_library': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-amber-500/20 relative">
        <SectionHeader 
          id="DOC: VG-CHRONICLE-2026.01"
          category="Archive Unit"
          title="Chronicle Library."
          subtitle="Historical record and narrative repository"
          colorClass="text-amber-500"
          bgGlow="bg-amber-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="zinc" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Chronicle Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                The Chronicle Repository is available through the Chronicle Repository section in the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'narrative_forge': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-purple-500/20 relative">
        <SectionHeader 
          id="DOC: VG-NARRATIVE-2026.01"
          category="Content Generation Unit"
          title="Narrative Forge."
          subtitle="Narrative glitch generation and daily directive system"
          colorClass="text-purple-500"
          bgGlow="bg-purple-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="purple" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Narrative Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                The Narrative Forge interface is available through the Daily Distraction section in the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    case 'header_architect': return (
      <div className="space-y-16 pb-40 max-w-6xl mx-auto selection:bg-blue-500/20 relative">
        <SectionHeader 
          id="DOC: VG-HEADER-2026.01"
          category="Brand Unit"
          title="Header Architect."
          subtitle="Institutional visual logic and brand asset generation"
          colorClass="text-blue-500"
          bgGlow="bg-blue-600/10"
          lightMode={lightMode}
        />
        <div className="space-y-12 px-6 md:px-12 relative z-10">
          <DocCard border="blue" glow lightMode={lightMode}>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white italic uppercase">Brand Architect Interface</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                The Header Architect interface is available through the Brand Architect section in the main navigation. Access requires admin privileges.
              </p>
            </div>
          </DocCard>
        </div>
      </div>
    );
    default: return (
      <div className="flex flex-col items-center justify-center py-32">
        <VigilScanner label="PROVISIONING_REGISTRY_SEGMENT" size="lg" />
      </div>
    );
  }
};

interface OperationalRegistryProps {
  activeDoc: RegistryDoc;
  onClose: () => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  isUnlocked?: boolean;
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
  userWallet?: string;
  userBri?: number;
  userXp?: number;
}

export const OperationalRegistry: React.FC<OperationalRegistryProps> = ({ 
  activeDoc, onClose, onOpenDoc, userWallet, userBri, userXp 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = activeDoc === 'whitepaper';

  useEffect(() => {
    if (activeDoc) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [activeDoc]);

  if (!activeDoc && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center px-2 md:px-20 py-4 md:py-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-3xl" onClick={onClose} />
      <div ref={containerRef} className={`relative w-full max-w-[1400px] h-full ${isLight ? 'bg-[#FAF9F6] border-zinc-200' : 'bg-[#050505] border-zinc-900/50'} border rounded-3xl shadow-[0_100px_200px_-50px_rgba(0,0,0,${isLight ? '0.3' : '1'})] overflow-hidden transition-all duration-700 flex flex-col ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-20 scale-95'}`}>
        <div className={`h-16 md:h-20 border-b ${isLight ? 'border-zinc-200 bg-[#FAF9F6]/80' : 'border-zinc-900/50 bg-black/80'} px-6 md:px-14 flex items-center justify-between backdrop-blur-md z-[1001] shrink-0`}>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className={`w-5 h-5 md:w-6 md:h-6 ${isLight ? 'bg-black' : 'bg-blue-600'} rounded-[4px] flex items-center justify-center shadow-lg`}><div className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isLight ? 'bg-white' : 'bg-white'} rotate-45`} /></div>
              <span className={`text-base md:text-lg font-black tracking-tighter uppercase italic ${isLight ? 'text-black' : 'text-white'}`}>Vigil</span>
            </div>
            <div className={`h-6 w-[1px] ${isLight ? 'bg-zinc-200' : 'bg-zinc-900'} shrink-0`} />
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-hidden">
              <Terminal className="w-3 md:w-3.5 h-3 md:h-3.5" /> 
              <span>Registry</span>
              <span className={isLight ? 'text-zinc-300' : 'text-zinc-800'}>/</span> 
              <span className={`italic uppercase truncate ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>
                {activeDoc?.replace('_', ' ')}
              </span>
            </div>
          </div>
          <button onClick={onClose} className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-[12px] ${isLight ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200' : 'bg-zinc-950/50 hover:text-white border-zinc-800'} border flex items-center justify-center text-zinc-400 transition-all`}><X className="w-4 md:w-5 h-4 md:h-5" /></button>
        </div>
        <div className={`flex-1 overflow-y-auto custom-scrollbar pt-8 md:pt-24 px-2 md:px-20 relative z-10 no-scrollbar ${isLight ? 'selection:bg-blue-100' : 'selection:bg-blue-600/20'}`}>
           <DocContent 
            type={activeDoc} 
            onOpenDoc={onOpenDoc}
            userWallet={userWallet}
            userBri={userBri}
            userXp={userXp}
            lightMode={isLight}
           />
        </div>
        <div className={`h-8 md:h-10 border-t ${isLight ? 'border-zinc-200 bg-[#F5F5F0]' : 'border-zinc-900/50 bg-black/50'} px-6 md:px-14 flex items-center justify-between z-[1001] shrink-0`}>
           <div className={`flex items-center gap-2 md:gap-4 text-[7px] md:text-[8px] font-black ${isLight ? 'text-zinc-400' : 'text-zinc-700'} uppercase tracking-widest italic`}>
              <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${isLight ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse`} /> Silo 11 Operational
           </div>
           <div className={`text-[7px] md:text-[8px] font-black ${isLight ? 'text-zinc-300' : 'text-zinc-800'} uppercase tracking-widest italic`}>VG-Registry-11</div>
        </div>
      </div>
    </div>
  );
};
