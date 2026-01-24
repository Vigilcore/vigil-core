
import React from 'react';
import { 
  Gavel, ShieldCheck, Scale, AlertTriangle, Lock, FileText, Globe, Info, 
  Zap, UserCheck, Book, Landmark, ShieldAlert, Cpu, Network, History,
  HardDrive, AlertOctagon, HelpCircle, Target, Scan, Fingerprint
} from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const TermsContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-blue-500/20 relative">
    <DocumentWatermark text="VIGIL OPERATIONAL TERMS" />
    
    <SectionHeader 
      id="DOC: VG-TOS-MASTER-2026.02"
      category="Strategic Compliance Unit"
      title="Terms of Service."
      subtitle="Enterprise-grade legal and operational framework v1.2"
      colorClass="text-blue-500"
      bgGlow="bg-blue-600/10"
    />

    <div className="space-y-24 px-6 md:px-12 relative z-10">
      
      {/* PREAMBLE */}
      <section className="space-y-8">
        <DocCard border="blue" glow>
          <div className="flex items-center gap-4 mb-8">
             <Gavel className="w-8 h-8 text-blue-500" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Preamble</h3>
          </div>
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
            <p>Last Updated: <b>Current Protocol State</b></p>
            <p>These Terms and Conditions constitute a legally binding agreement between you and <b>VIGIL</b> governing your access to the Layer 0.5 Security Standard.</p>
            <p className="bg-blue-950/20 border border-blue-900/30 p-8 rounded-3xl text-blue-100 italic relative overflow-hidden">
               <span className="absolute top-0 right-0 p-4 opacity-10"><Scale className="w-20 h-20" /></span>
               "By accessing, installing, or using any part of the Service, you acknowledge that security is a shared responsibility and that human intent is the final perimeter."
            </p>
          </div>
        </DocCard>
      </section>

      {/* NEW SECTION: CANONICAL DEFINITIONS */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="CANONICAL_PRIMITIVES" color="cyan" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="cyan" glow>
           <div className="space-y-10">
              <ClauseFrame id="DEF-01">
                 <div className="flex items-center gap-4 mb-2">
                    <Target className="text-cyan-500" size={18} />
                    <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Intent Synchronization</h4>
                 </div>
                 <p className="text-zinc-300 text-lg font-bold uppercase tracking-tight italic">"Decoupling perception from malicious UI shifts"</p>
                 <p className="text-zinc-500 text-sm leading-relaxed">The standard for ensuring visual belief aligns with cryptographic reality prior to finality.</p>
              </ClauseFrame>

              <ClauseFrame id="DEF-02">
                 <div className="flex items-center gap-4 mb-2">
                    <Scan className="text-cyan-500" size={18} />
                    <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Sub-Frame Autopsy</h4>
                 </div>
                 <p className="text-zinc-300 text-lg font-bold uppercase tracking-tight italic">"Heuristic analysis at the retinal threshold"</p>
                 <p className="text-zinc-500 text-sm leading-relaxed">Mandatory security verdicts rendered in &lt;12ms to neutralize the 16.6ms biological refresh gap.</p>
              </ClauseFrame>

              <ClauseFrame id="DEF-03">
                 <div className="flex items-center gap-4 mb-2">
                    <Fingerprint className="text-cyan-500" size={18} />
                    <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Sovereign Context</h4>
                 </div>
                 <p className="text-zinc-300 text-lg font-bold uppercase tracking-tight italic">"Local mapping with absolute zero data leakage"</p>
                 <p className="text-zinc-500 text-sm leading-relaxed">Zero-knowledge architecture ensuring user history remains isolated within local IndexedDB environments.</p>
              </ClauseFrame>
           </div>
        </DocCard>
      </section>

      {/* SECTION 1: DEFINITIONS */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 01" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-4xl font-black text-white uppercase italic tracking-tight leading-none">Operational <br/> Terminology</h3>
            <div className="space-y-4">
              {[
                { t: "Layer 0.5", d: "The intermediate security protocol operating between the application layer and the cryptographic execution layer." },
                { t: "Local Sandbox", d: "The isolated browser-level execution environment where all VIGIL processing occurs." },
                { t: "Heuristic Signal", d: "A probabilistic risk indicator derived from pattern analysis and historical continuity." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-start gap-4 group hover:border-blue-500/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">{item.t}</h5>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-medium italic">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
             <TechNote title="LEGAL SCOPE">
               Definitions provided herein are binding and govern the interpretation of all clauses in this agreement.
             </TechNote>
          </div>
        </div>
      </section>

      {/* SECTION 2: PURPOSE AND NATURE */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <TechLabel text="SECTION 02" color="blue" />
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>
        
        <DocCard border="zinc">
          <div className="flex items-center gap-4 mb-10">
             <Info className="w-8 h-8 text-blue-500" />
             <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Purpose of Service</h3>
          </div>
          <div className="space-y-10">
            <ClauseFrame id="TOS-1.1">
               <h5 className="text-white font-black uppercase tracking-widest text-xs">Human-Layer Security</h5>
               <p className="text-zinc-500 text-base italic leading-relaxed font-medium">
                 VIGIL provides an awareness platform designed to identify potential risks associated with blockchain usage, including address poisoning, impersonation, visual deception, and phishing indicators.
               </p>
            </ClauseFrame>
            <ClauseFrame id="TOS-1.2">
               <h5 className="text-white font-black uppercase tracking-widest text-xs">Advisory Limitation</h5>
               <p className="text-zinc-500 text-base italic leading-relaxed font-medium text-red-500/80">
                 The Service operates as a decision-support tool only. It does not execute transactions, control wallets, store private keys, or alter blockchain behavior. All final authority resides with the human user.
               </p>
            </ClauseFrame>
          </div>
        </DocCard>
      </section>

      {/* FINAL NOTICE */}
      <section className="pt-24 space-y-12 text-center">
        <div className="h-[2px] w-48 bg-blue-900/30 mx-auto" />
        <div className="space-y-8">
           <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8 text-zinc-600" />
           </div>
           <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Legal Finality</h3>
           <div className="p-10 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
              <p className="text-zinc-500 text-lg font-bold italic leading-relaxed relative z-10 uppercase tracking-tight">
                "Security tools reduce risk — they do not eliminate it. Human judgment remains the final security primitive in decentralized systems."
              </p>
           </div>
           <div className="space-y-2">
              <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.6em]">VIGIL OPERATIONAL TERMS // REGISTRY ID: VG-TOS-INST-A1</p>
              <p className="text-[8px] font-black text-zinc-900 uppercase tracking-widest text-center">END OF DOCUMENT</p>
           </div>
        </div>
      </section>
    </div>
  </div>
);
