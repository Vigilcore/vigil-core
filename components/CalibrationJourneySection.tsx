import React from 'react';
import { Target, Globe, Brain, Zap, Compass } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

interface CalibrationJourneySectionProps {
  // Pure presentation component - no logic
}

export const CalibrationJourneySection: React.FC<CalibrationJourneySectionProps> = () => {
  return (
    <div id="calibration-journey" className="px-6 md:px-20 py-24 md:py-32 bg-[#020202] border-b border-zinc-900/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_80%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[size:64px_64px] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
          <div className="space-y-10 lg:w-1/2">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[2px] bg-blue-600 rounded-full shadow-[0_0_15px_#3b82f6]" />
              <TechLabel text="CORE_OPERATIONAL_FRAMEWORK" color="blue" />
            </div>
            <h2 className="text-[2.25rem] md:text-[4.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
              Calibration <br/> Journey.
            </h2>
          </div>
          <div className="lg:w-1/2 pt-4">
            <div className="relative pl-12 border-l-2 border-zinc-800">
              <p className="text-zinc-400 text-sm md:text-lg font-medium leading-relaxed italic uppercase tracking-tight">
                "Beyond the digital frontier, the VIGIL Facility serves as the definitive proving ground for cognitive security. Within its walls, these four hubs represent the Calibration Journey: a rigorous path designed to transform a standard crypto user into a Sentinel Operator by systematically addressing the cognitive vulnerabilities that hackers exploit."
              </p>
              <div className="mt-8 flex items-center gap-4 text-blue-500/40">
                <Zap size={14} className="fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em]">Registry_Protocol: Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            { 
              id: '01', 
              title: 'Execution Sandbox', 
              why: "Real-world attacks happen too fast for a user to learn from them. Usually, by the time you realize you've been poisoned, your assets are gone. The adversary relies on your cognitive speed to bypass verification before you can consciously analyze the string entropy.", 
              purpose: "A high-fidelity, zero-risk simulation environment where users can \"inject\" common attack vectors like DOM Address Swaps, Vanity Mimics, and Phishing Overlays. This serves as the primary technical proving ground for incoming operators to recognize the subtle shift in UI pixels.", 
              help: "Builds the fundamental \"muscle memory\" needed to spot a 0.5 Layer breach before ever opening a real wallet. It provides immediate forensic feedback on your identification latency and saccadic focus quality.", 
              color: 'text-blue-500', 
              border: 'border-blue-500/20', 
              bg: 'bg-blue-500/5', 
              icon: <Target size={32} /> 
            },
            { 
              id: '02', 
              title: 'Synthesis Node', 
              why: "Local awareness isn't enough. An address might look safe but be part of a Malicious Cluster that hasn't been blacklisted yet. Modern attacks are industrialized at scale across global networks, utilizing seeder-funded mimetic swarms.", 
              purpose: "To synchronize local node telemetry with the Global Sentinel Mesh. It utilizes AI-driven forensics to calculate the \"DNA\" of a contract or wallet, searching for seeder-wallet associations and cluster density patterns that signify automated fraud.", 
              help: "Surfaces hidden data—like wallet funding sources and developer lineage—allowing decisions based on structural truth rather than visual trust. It provides collective immunity through decentralized intelligence distribution.", 
              color: 'text-cyan-500', 
              border: 'border-cyan-500/20', 
              bg: 'bg-cyan-500/5', 
              icon: <Globe size={32} /> 
            },
            { 
              id: '03', 
              title: 'Biological Calibration', 
              why: "The human eye is the ultimate vulnerability. Due to Saccadic Masking, our brains literally \"skip\" data when scanning long strings. Attackers generate vanity addresses that specifically target these biological blind spots (the 8-character gap).", 
              purpose: "To audit and retrain the biological eye. These modules (Neural Firewall & Saccadic Audit) measure Attentional Velocity and map unique biological thresholds to identify where an operator is most likely to fail during routine interaction.", 
              help: "Identifies unique Attentional Blind Spots, \"patching\" the biological eye to neutralize look-alike vanity addresses. It ensures that the retinal perimeter is as hardened as the cryptographic layer beneath it.", 
              color: 'text-purple-500', 
              border: 'border-purple-500/20', 
              bg: 'bg-purple-500/5', 
              icon: <Brain size={32} /> 
            },
            { 
              id: '04', 
              title: 'The Apex Terminal', 
              why: "Training in a slow environment is easy. Maintaining vigilance during a high-speed, multi-threaded market surge is where most operators fail. Panic and fatigue are the adversary's primary allies in the extraction process.", 
              purpose: "A terminal stress-test environment (The Entropy Collider) that simulates a compromised network under massive packet injection. It forces the operator to maintain focus during extreme cognitive load and high-velocity deception.", 
              help: "Establishes the operator's Biological Ceiling, ensuring they remain sovereign and secure even under panic or fatigue. It is the final verification of a Sentinel's readiness for live, unsupervised field deployment.", 
              color: 'text-amber-500', 
              border: 'border-amber-500/20', 
              bg: 'bg-amber-500/5', 
              icon: <Zap size={32} /> 
            }
          ].map((hub, idx) => (
            <div key={idx} className="relative group flex flex-col gap-6">
              <div className={`p-8 bg-zinc-950 border ${hub.border} rounded-3xl relative overflow-hidden flex items-center justify-between transition-all duration-500 group-hover:border-zinc-500`}>
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${hub.color} shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    {hub.icon}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-0.4em ${hub.color}`}>HUB_{hub.id}</span>
                      <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[7px] font-black text-zinc-500 uppercase tracking-widest">v1.0.1</div>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{hub.title}</h4>
                  </div>
                </div>
                <div className="text-right hidden sm:block opacity-20 group-hover:opacity-100 transition-opacity">
                  <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Telemetry Status</div>
                  <div className="text-[12px] font-black text-emerald-500 italic uppercase">Operational</div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
              </div>
              <div className="relative pl-10">
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${hub.color.replace('text-', 'bg-')} opacity-30`} />
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">The Vulnerability</span>
                  <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed italic">"{hub.why}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl space-y-4 group-hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <TechLabel text="CORE_PURPOSE" color="zinc" />
                  </div>
                  <p className="text-[11px] md:text-[12px] text-zinc-300 font-bold uppercase tracking-tight leading-relaxed italic">{hub.purpose}</p>
                </div>
                <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl space-y-4 group-hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${hub.color.replace('text-', 'bg-')}`} />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Operational Impact</span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-500 leading-relaxed uppercase tracking-tighter">{hub.help}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 md:px-12 md:py-20 bg-white text-black rounded-[16px] md:rounded-[4rem] relative overflow-hidden group shadow-[0_50px_150px_rgba(255,255,255,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-16 h-16 md:w-32 md:h-32 rounded-[2rem] md:rounded-[3rem] bg-black flex items-center justify-center shrink-0 shadow-2xl transform group-hover:rotate-12 transition-transform duration-700">
              <Compass size={64} className="text-white animate-spin-slow" />
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 font-black text-[14px] uppercase tracking-[1em]">Final_Mandate</span>
                <div className="h-[2px] flex-1 bg-zinc-100" />
              </div>
              <p className="text-[16px] md:text-[32px] font-black italic uppercase tracking-tighter leading-[0.85] whitespace-pre-line">
                "Sandbox teaches you <span className="text-blue-600">how they attack</span>;{"\n\n"}
                Synthesis teaches you <span className="text-cyan-600">who is attacking</span>;{"\n\n"}
                Calibration teaches you <span className="text-purple-600">how to see</span>;{"\n\n"}
                And the Terminal ensures you <span className="text-amber-600">survive.</span>"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};