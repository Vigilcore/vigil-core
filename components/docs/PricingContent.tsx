import React from 'react';
import { Check, X, ShieldCheck, Zap, Lock, Info, Terminal, ShieldAlert, Cpu, Database, BarChart3, Globe, Activity, Fingerprint, Target, Scan, FileJson } from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const PricingContent = () => (
  <div className="space-y-0 pb-20 md:pb-40 max-w-6xl mx-auto selection:bg-emerald-500/20 relative">
    <DocumentWatermark text="VIGIL COMMERCIAL REGISTRY" />
    
    <SectionHeader 
      id="DOC: VG-PRC-2026.01"
      category="Strategic Commercial Unit"
      title="Licensing Registry."
      subtitle="Security is a structural requirement, not a luxury."
      colorClass="text-emerald-500"
      bgGlow="bg-emerald-600/10"
    />

    <div className="mt-12 space-y-32 px-6 md:px-12 relative z-10">
      
      {/* TIER CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* BASELINE */}
        <DocCard border="zinc">
          <div className="space-y-8 h-full flex flex-col">
            <div className="space-y-4">
              <TechLabel text="TIER 01" color="zinc" />
              <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">Baseline.</h4>
              <div className="space-y-1">
                <p className="text-zinc-500 text-sm font-black uppercase tracking-widest">Free Forever</p>
                <p className="text-zinc-700 text-[10px] font-bold uppercase italic leading-tight">Essential community protection layer.</p>
              </div>
            </div>
            
            <div className="h-px w-full bg-zinc-900" />
            
            <ul className="space-y-6 flex-1">
              {[
                { f: 'Restricted Intercepts', d: '5 of 11 threat types | 5 total uses.' },
                { f: 'AI Throttling', d: '5 prompts per 24h cycle.' },
                { f: 'Standard Merit', d: 'No multiplier (1.0x) on leaderboard XP.' },
                { f: 'Local Sandbox', d: 'Zero-knowledge localized processing.' }
              ].map(item => (
                <li key={item.f} className="group/item">
                  <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">
                    <Check size={14} className="text-zinc-800 group-hover/item:text-zinc-400 transition-colors" /> {item.f}
                  </div>
                  <p className="text-[9px] text-zinc-700 font-bold uppercase italic leading-relaxed pl-7">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </DocCard>

        {/* SENTINEL */}
        <DocCard border="blue" glow>
          <div className="absolute top-0 right-10 -translate-y-1/2 z-20">
            <div className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl animate-pulse">
              PRO_STANDBY
            </div>
          </div>
          <div className="space-y-8 h-full flex flex-col">
            <div className="space-y-4">
              <TechLabel text="TIER 02" color="blue" />
              <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">Sentinel.</h4>
              <div className="space-y-1">
                <p className="text-blue-500 text-sm font-black uppercase tracking-widest">$50 / YEAR</p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase italic leading-tight">Professional standard for high-velocity traders.</p>
              </div>
            </div>

            <div className="h-px w-full bg-blue-900/20" />

            <ul className="space-y-6 flex-1">
              {[
                { f: 'Full Intercept Suite', d: 'All 11 threat types | Unlimited usage.' },
                { f: 'Merit Acceleration', d: 'Permanent 1.5x XP multiplier active.' },
                { f: 'Unthrottled Mesh', d: 'Unlimited AI forensic contract autopsies.' },
                { f: 'Tactical Sync', d: 'Mirror state across 3 authorized units.' }
              ].map(item => (
                <li key={item.f} className="group/item">
                  <div className="flex items-center gap-3 text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1">
                    <Check size={14} className="text-blue-500" /> {item.f}
                  </div>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase italic leading-relaxed pl-7">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </DocCard>

        {/* APEX */}
        <DocCard border="purple">
          <div className="space-y-8 h-full flex flex-col">
            <div className="space-y-4">
              <TechLabel text="TIER 03" color="purple" />
              <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">Apex.</h4>
              <div className="space-y-1">
                <p className="text-purple-500 text-sm font-black uppercase tracking-widest">$100 / YEAR</p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase italic leading-tight">Institutional-grade security & alpha forensics.</p>
              </div>
            </div>

            <div className="h-px w-full bg-purple-900/20" />

            <ul className="space-y-6 flex-1">
              {[
                { f: 'VCI Prediction', d: 'Flag mimics before the first dust transfer.' },
                { f: 'Elite Merit Boost', d: 'Maximum 2.5x XP multiplier for dominance.' },
                { f: 'Forensic Export', d: 'Cryptographically signed audit logs (JSON/PDF).' },
                { f: 'Unlimited Sync', d: 'Fleet-wide synchronization for pro units.' }
              ].map(item => (
                <li key={item.f} className="group/item">
                  <div className="flex items-center gap-3 text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1">
                    <Check size={14} className="text-purple-500" /> {item.f}
                  </div>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase italic leading-relaxed pl-7">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </DocCard>
      </div>

      {/* DOCTRINE QUOTE */}
      <div className="py-12 border-y border-zinc-900 flex justify-center text-center">
         <p className="text-2xl md:text-4xl font-black text-zinc-500 italic uppercase tracking-tighter leading-tight max-w-4xl">
            "THE THEFT LIVES IN THE GAP. <br/> <span className="text-white">THE SHIELD LIVES IN YOUR EYES.</span>"
         </p>
      </div>

      {/* FEATURE DEEP DIVE */}
      <div className="space-y-16">
        <div className="space-y-4">
           <TechLabel text="DETAILED_MODULE_BREAKDOWN" color="cyan" />
           <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Feature Autopsy.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-10">
              <ClauseFrame id="VIG-MOD-01">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                       <Scan size={20} />
                    </div>
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tight">Retinal Shield v1.2</h5>
                 </div>
                 <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                    The core interception logic. Baseline units utilize a restricted subset of 5 threat types with a lifetime usage cap. Sentinel and Apex units unlock the full 11-type suite with unlimited triggering capabilities.
                 </p>
              </ClauseFrame>

              <ClauseFrame id="VIG-MOD-02">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan-600/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-500">
                       <Activity size={20} />
                    </div>
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tight">Heuristic Matrix Sync</h5>
                    <TechLabel text="PRO_ONLY" color="cyan" />
                 </div>
                 <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                    While Baseline units update daily, Sentinel and Apex units utilize the high-frequency Gossip Protocol. Your unit receives real-time intercept signatures from 1.2M+ global nodes, providing immediate collective immunity.
                 </p>
              </ClauseFrame>
           </div>

           <div className="space-y-10">
              <ClauseFrame id="VIG-MOD-03">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-600/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-500">
                       <Cpu size={20} />
                    </div>
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tight">Predictive VCI Engine</h5>
                    <TechLabel text="APEX_ONLY" color="purple" />
                 </div>
                 <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                    The Vanity Cluster Index (VCI) uses probabilistic modeling to identify addresses generated via industrial-scale GPU clusters. This allows for proactive identification of threats before they ever touch your transaction history.
                 </p>
              </ClauseFrame>

              <ClauseFrame id="VIG-MOD-04">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-600/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                       <Database size={20} />
                    </div>
                    <h5 className="text-xl font-black text-white uppercase italic tracking-tight">Merit Multipliers</h5>
                 </div>
                 <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                    Acquisition strategy based on status. Sentinel users receive a 1.5x multiplier on all XP gained through intercepts and audits. Apex users receive 2.5x. Free users operate at a 1.0x baseline to encourage tier migration.
                 </p>
              </ClauseFrame>
           </div>
        </div>
      </div>

      {/* COMPARISON MATRIX */}
      <div className="space-y-10">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Technical Comparison Matrix</h3>
        <div className="bg-[#080808] border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)]" />
          <table className="w-full text-left relative z-10">
            <thead className="bg-zinc-950 border-b border-zinc-900">
              <tr>
                <th className="p-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Feature Vector</th>
                <th className="p-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Baseline</th>
                <th className="p-8 text-[10px] font-black text-blue-500 uppercase tracking-widest">Sentinel</th>
                <th className="p-8 text-[10px] font-black text-purple-500 uppercase tracking-widest">Apex</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest">
              {[
                { f: "Intercept Suite", b: "5/11 (Restricted)", s: "11/11 (Full)", a: "11/11 (Full)" },
                { f: "XP Multiplier", b: "1.0x", s: "1.5x", a: "2.5x" },
                { f: "AI Mesh Queries", b: "5 / 24h", s: "Unlimited", a: "Unlimited" },
                { f: "Device Sync Limit", b: "1", s: "3", a: "Unlimited" },
                { f: "Vanity Farm Detection", b: false, s: "Basic", a: "Predictive VCI" },
                { f: "Forensic Reporting", b: false, s: false, a: "JSON / PDF" },
                { f: "RPC Tunneling", b: false, s: false, a: true }
              ].map((row, i) => (
                <tr key={i} className="border-b border-zinc-900/50 group/row hover:bg-white/[0.01] transition-colors">
                  <td className="p-8 border-r border-zinc-900/50 text-zinc-500 group-hover/row:text-zinc-300 transition-colors">{row.f}</td>
                  <td className="p-8 border-r border-zinc-900/50 text-center md:text-left">{row.b === false ? <X size={14} className="text-zinc-800 mx-auto md:mx-0" /> : row.b === true ? <Check size={14} className="text-zinc-500 mx-auto md:mx-0" /> : row.b}</td>
                  <td className="p-8 border-r border-zinc-900/50 text-center md:text-left">{row.s === false ? <X size={14} className="text-zinc-800 mx-auto md:mx-0" /> : row.s === true ? <Check size={14} className="text-blue-500 mx-auto md:mx-0" /> : row.s}</td>
                  <td className="p-8 text-center md:text-left">{row.a === false ? <X size={14} className="text-zinc-800 mx-auto md:mx-0" /> : row.a === true ? <Check size={14} className="text-purple-500 mx-auto md:mx-0" /> : row.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL QUOTE */}
      <section className="pt-24 space-y-12 text-center">
        <div className="h-[2px] w-48 bg-emerald-900/30 mx-auto" />
        <div className="space-y-6">
           <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Operational Finality.</h3>
           <p className="max-w-2xl mx-auto text-zinc-500 text-lg font-medium italic leading-relaxed">
             "Choose your tier based on your personal risk threshold. Security is an infrastructure requirement, not an occasional preference."
           </p>
        </div>
        <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.6em]">VIGIL COMMERCIAL REGISTRY // REGISTRY ID: VG-PRC-INST-A1</p>
      </section>
    </div>
  </div>
);