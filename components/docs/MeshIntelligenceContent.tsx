
import React from 'react';
import { Globe, Cpu, Zap, ShieldCheck, Search, Activity, Database, Radar, Brain } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const MeshIntelligenceContent: React.FC = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-cyan-500/20 relative">
    <DocumentWatermark text="SENTINEL MESH BRIEFING" />
    
    <SectionHeader 
      id="DOC: VG-MESH-K1-2026"
      category="Neural Intelligence Unit"
      title="Mesh Intelligence."
      subtitle="Operational capabilities of the V-K1 Kernel"
      colorClass="text-cyan-500"
      bgGlow="bg-cyan-600/10"
    />

    <div className="space-y-16 px-6 md:px-12 relative z-10">
      
      <DocCard border="cyan" glow>
        <div className="flex items-center gap-4 mb-8">
           <Cpu className="w-8 h-8 text-cyan-500" />
           <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">The Neural Backbone</h3>
        </div>
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium italic border-l-4 border-cyan-500/40 pl-8">
          "The V-K1 Kernel serves as the decentralized brain of the VIGIL ecosystem, providing every Field Unit with high-fidelity forensic intelligence grounded in real-time truth."
        </p>
      </DocCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[
           {
             id: "01",
             title: "Live Grounding",
             icon: <Globe className="text-blue-500" />,
             desc: "Unlike static security databases, the Mesh utilizes real-time Google Search grounding to verify zero-day contract threats. It cross-references trending addresses against security alerts on social platforms and forensic blogs."
           },
           {
             id: "02",
             title: "Multimodal Autopsy",
             icon: <Radar className="text-red-500" />,
             desc: "V-K1 performs structural autopsies on contract addresses, analyzing funding lineage and cluster density. It identifies the 'Mother Wallet' behind industrialized poisoning campaigns before they interact with your history."
           },
           {
             id: "03",
             title: "Collective Immunity",
             icon: <Activity className="text-emerald-500" />,
             desc: "Utilizing the Gossip Protocol, an interception verified by a single Sentinel node is instantly broadcast to the entire Mesh. One user's vigilance immunizes the entire network in under 200ms."
           },
           {
             id: "04",
             title: "Predictive VCI",
             icon: <Brain className="text-purple-500" />,
             desc: "The Vanity Cluster Index (VCI) monitors mathematical entropy deviations. V-K1 predicts the deployment of look-alike clusters by identifying the high-density GPU signatures required to generate them."
           }
         ].map(capability => (
           <ClauseFrame key={capability.id} id={`MESH-CAP-${capability.id}`}>
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                    {capability.icon}
                 </div>
                 <h4 className="text-xl font-black text-white italic uppercase">{capability.title}</h4>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                {capability.desc}
              </p>
           </ClauseFrame>
         ))}
      </div>

      <TechNote title="FORENSIC PROTOCOL">
        The V-K1 Kernel is restricted from market speculation. It is architected solely as a security primitive to neutralize the cognitive gap. All queries are processed with absolute zero-knowledge on local hardware.
      </TechNote>

      <div className="pt-24 text-center space-y-8">
         <div className="h-[2px] w-24 bg-cyan-900/30 mx-auto" />
         <h3 className="text-3xl font-black text-white italic uppercase tracking-[0.3em]">Neural Stability: 100%</h3>
         <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em]">AUTH_NODE: VK-1_STABLE_DEFINITIVE</p>
      </div>
    </div>
  </div>
);
