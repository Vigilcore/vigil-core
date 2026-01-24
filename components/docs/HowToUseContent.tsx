
import React, { useState } from 'react';
import { 
  BookOpen, ChevronRight, Smartphone, ShieldCheck, 
  Search, Info, Zap, Globe, Cpu, Radio, Target, 
  Layers, Lock, Activity, Radar, Fingerprint, 
  ShieldAlert, Scan, Binary, MousePointer2, ExternalLink, 
  Skull, Terminal, Eye, Filter, Code2, Database, Layout, 
  ArrowRight, ShieldX, Server, Microscope, CheckCircle2,
  FileCode, ClipboardPaste, Gauge, BarChart3, History as HistoryIcon,
  Copy, ZapOff, Calculator, FileWarning, MicroscopeIcon,
  Crosshair, BrainCircuit, RotateCcw, Shield
} from 'lucide-react';
import { DocCard, TechLabel, TechNote } from './DocHelpers';
import { TacticalPoisonDiagram } from '../TacticalPoisonDiagram';

export const HowToUseContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: '0. Manual Index', icon: <Globe size={14} /> },
    { id: 'protocol-a', label: '1. Analysis Phase', icon: <BrainCircuit size={14} /> },
    { id: 'scavenger', label: '2. Retinal Shield', icon: <Scan size={14} /> },
    { id: 'hygiene', label: '3. Tactical Hygiene', icon: <RotateCcw size={14} /> },
    { id: 'forensics', label: '4. Alpha Forensics', icon: <BarChart3 size={14} /> },
    { id: 'ops', label: '5. Field Unit Hub', icon: <Layout size={14} /> },
    { id: 'mobile', label: '6. Mobile Layer', icon: <Smartphone size={14} /> }
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`htu-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-full animate-in fade-in duration-700 overflow-hidden bg-[#020202]">
      
      {/* GITBOOK SIDEBAR */}
      <aside className="w-80 border-r border-zinc-900 bg-zinc-950/20 hidden lg:flex flex-col shrink-0">
        <div className="p-10 border-b border-zinc-900">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg"><div className="w-4 h-4 bg-white rotate-45" /></div>
              <div className="flex flex-col">
                 <span className="text-[12px] font-black text-white uppercase tracking-[0.2em]">Operational Manual</span>
                 <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-1">Ref: VIG-MAN-CORE</span>
              </div>
           </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-6 space-y-1 custom-scrollbar">
           <div className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-6 pl-4 flex items-center gap-2">
              <MicroscopeIcon size={12} /> System_Modules
           </div>
           {sections.map(s => (
             <button 
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full text-left px-6 py-4 rounded-2xl transition-all flex items-center gap-4 group ${activeSection === s.id ? 'bg-blue-600/10 border border-blue-500/20 text-white shadow-xl shadow-blue-500/5' : 'text-zinc-600 hover:text-zinc-300'}`}
             >
                {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: activeSection === s.id ? 'text-blue-500 scale-110' : 'text-zinc-800 group-hover:text-zinc-500' })}
                <span className="text-[11px] font-black uppercase tracking-widest">{s.label}</span>
             </button>
           ))}
        </nav>
      </aside>

      {/* DOCUMENTATION FEED */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-20 space-y-48">
        
        {/* SECTION 0: OVERVIEW */}
        <section id="htu-intro" className="scroll-mt-32 space-y-16">
          <header className="space-y-6">
             <TechLabel text="SYSTEM_ABSTRACT" color="blue" />
             <h2 className="text-5xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">The <br/>Standard.</h2>
             <p className="text-zinc-500 text-2xl font-medium leading-relaxed italic max-w-3xl border-l-4 border-blue-900/30 pl-10">
               "VIGIL intercepts the cognitive gap between what you see and what you sign. This manual serves as the tactical briefing for sovereign operators."
             </p>
          </header>
        </section>

        {/* SECTION 2: RETINAL SHIELD */}
        <section id="htu-scavenger" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_R: RETINAL_SHIELD" color="blue" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Retinal <br/> Shield.</h2>
          </header>
          <DocCard border="blue">
             <div className="space-y-8">
                <p className="text-zinc-400 text-xl font-medium leading-relaxed italic">
                  "Identifying history poisoning vectors before they bypass biological scrutiny."
                </p>
                <TacticalPoisonDiagram />
             </div>
          </DocCard>
        </section>

        {/* SECTION 3: TACTICAL HYGIENE */}
        <section id="htu-hygiene" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_H: SOVEREIGN_HYGIENE" color="emerald" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Tactical <br/> Hygiene.</h2>
          </header>

          <DocCard border="emerald" glow>
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-10">
                   <p className="text-zinc-400 text-xl font-medium leading-relaxed italic border-l-4 border-emerald-600/30 pl-10">
                      "Hygiene is the manual counterpart to automated defense. VIGIL advises operators on breaking the profiling patterns that adversaries exploit."
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-3xl space-y-6 group hover:border-emerald-500/30 transition-all">
                         <div className="flex items-center gap-4">
                            <Shield className="text-emerald-500" />
                            <h4 className="text-white font-black uppercase text-sm">Safe Node Indexing</h4>
                         </div>
                         <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                            Index your frequent, high-value destinations into the Local Trust Graph. VIGIL marks these with a definitive emerald anchor, making mimics instantly visible via similarity contrast.
                         </p>
                      </div>
                      <div className="p-8 bg-zinc-950 border border-zinc-800 rounded-3xl space-y-6 group hover:border-blue-500/30 transition-all">
                         <div className="flex items-center gap-4">
                            <RotateCcw className="text-blue-500" />
                            <h4 className="text-white font-black uppercase text-sm">Address Rotation</h4>
                         </div>
                         <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                            Regularly rotating your receiving addresses breaks the financial profile an adversary builds around your history. Reducing predictability neutralizes the ROI of targeted vanity generation.
                         </p>
                      </div>
                   </div>
                </div>
                <div className="lg:col-span-4">
                   <TechNote title="HYGIENE REMINDERS">
                      VIGIL Mesh Intelligence kernel provides automated reminders to rotate addresses every 30 days or after detecting high-volume industrialised seeding activity in your network cluster.
                   </TechNote>
                </div>
             </div>
          </DocCard>
        </section>

        {/* SECTION 4: ALPHA FORENSICS */}
        <section id="htu-forensics" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_F: ALPHA_FORENSICS" color="cyan" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Alpha <br/> Forensics.</h2>
          </header>
          <DocCard border="cyan">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-10">
                   <p className="text-zinc-400 text-xl font-medium leading-relaxed italic border-l-4 border-cyan-600/30 pl-10">
                      "Utilizing adversarial economics to detect systemic traps. Identifying high-fidelity mimics by auditing the compute cost of their generation."
                   </p>
                   <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6">
                      <div className="flex items-center gap-4">
                         <Calculator className="text-cyan-500" size={20} />
                         <h4 className="text-white font-black uppercase text-sm">Adversarial Compute Audit</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Collision Threshold</span>
                            <div className="text-2xl font-black text-white italic">d=14 (Standard)</div>
                            <p className="text-[9px] text-zinc-700 font-bold uppercase">Matches found via consumer-grade CPU compute.</p>
                         </div>
                         <div className="space-y-2">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Sovereign Breach</span>
                            <div className="text-2xl font-black text-red-500 italic">d=20 (Industrial)</div>
                            <p className="text-[9px] text-zinc-700 font-bold uppercase">Requires GPU-clusters ($1.7M+ overhead).</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="lg:col-span-5">
                   <TechNote title="FORENSIC DIRECTIVE">
                      When a mimic achieves d=20 similarity, VIGIL escalates to CRITICAL_INTERCEPT state, as the mathematical probability of organic collision p ≈ r/16^d is effectively zero.
                   </TechNote>
                </div>
             </div>
          </DocCard>
        </section>

        <footer className="pt-48 border-t border-zinc-900 text-center space-y-12 pb-60">
           <div className="h-[2px] w-48 bg-zinc-900 mx-auto" />
           <div className="space-y-6">
              <h3 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-[0.2em]">Manual Concluded.</h3>
              <p className="text-zinc-700 text-[12px] font-black uppercase tracking-[0.8em] italic leading-relaxed">
                 VIGIL SECURITY STANDARD // REGISTRY_REF: VIG-MAN-CORE-FINAL
              </p>
           </div>
        </footer>

      </main>
    </div>
  );
};
