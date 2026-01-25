
import React from 'react';
import { Skull, Target, ShieldCheck, Zap, Ghost, Layers, Cpu, TrendingUp } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

export const TacticalPoisonDiagram: React.FC = () => {
  return (
    <div className="w-full space-y-10 py-12 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {/* Panel A: Tiny Transfer */}
        <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] space-y-6 relative overflow-hidden group hover:border-blue-500/20 transition-all shadow-2xl">
          <div className="absolute top-4 right-6 text-[8px] font-black text-zinc-800 uppercase tracking-widest">Protocol_Vector_A</div>
          <div className="space-y-1">
             <TechLabel text="HISTORY_INJECTION" color="blue" />
             <h5 className="text-xl font-black text-white uppercase italic tracking-tight">(a) Tiny Transfer</h5>
          </div>
          <div className="aspect-video relative bg-black/40 rounded-2xl border border-zinc-900 flex items-center justify-center p-4">
             <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                <circle cx="30" cy="40" r="10" fill="#050505" stroke="#10b981" strokeWidth="1.5" />
                <text x="30" y="43" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="900" className="italic">V</text>
                
                <circle cx="170" cy="40" r="10" fill="#050505" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="170" y="43" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="900" className="italic">R</text>
                
                <circle cx="170" cy="90" r="10" fill="#050505" stroke="#ef4444" strokeWidth="1.5" />
                <text x="170" y="93" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="900" className="italic">L</text>
                
                <path d="M45 40 H155" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrowB)" />
                <text x="100" y="35" textAnchor="middle" fill="#3b82f6" fontSize="6" fontWeight="bold">1) 123.4 SOL</text>
                
                <path d="M155 90 L45 50" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" markerEnd="url(#arrowR)" />
                <text x="90" y="80" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold" transform="rotate(-20, 90, 80)">2) 0.01 SOL</text>
                
                <path d="M45 40 L155 90" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrowR)" />
                <text x="110" y="75" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold" transform="rotate(25, 110, 75)">3) 100 SOL</text>
                
                <defs>
                   <marker id="arrowB" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/></marker>
                   <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/></marker>
                </defs>
             </svg>
          </div>
          <p className="text-[11px] text-zinc-500 font-medium italic leading-relaxed">Adversary injects small asset units to position mimic at the top of 'Recent Activity'.</p>
        </div>

        {/* Panel B: Zero-Value */}
        <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] space-y-6 relative overflow-hidden group hover:border-red-500/20 transition-all shadow-2xl">
          <div className="absolute top-4 right-6 text-[8px] font-black text-zinc-800 uppercase tracking-widest">Protocol_Vector_B</div>
          <div className="space-y-1">
             <TechLabel text="DOM_SPOOF" color="red" />
             <h5 className="text-xl font-black text-white uppercase italic tracking-tight">(b) Zero-Value</h5>
          </div>
          <div className="aspect-video relative bg-black/40 rounded-2xl border border-zinc-900 flex items-center justify-center p-4">
             <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                <circle cx="30" cy="40" r="10" fill="#050505" stroke="#10b981" strokeWidth="1.5" />
                <text x="30" y="43" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="900" className="italic">V</text>
                <circle cx="170" cy="40" r="10" fill="#050505" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="170" y="43" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="900" className="italic">R</text>
                <circle cx="170" cy="90" r="10" fill="#050505" stroke="#ef4444" strokeWidth="1.5" />
                <text x="170" y="93" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="900" className="italic">L</text>
                
                <path d="M45 40 H155" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrowB)" />
                <text x="100" y="35" textAnchor="middle" fill="#3b82f6" fontSize="6" fontWeight="bold">1) 123.4 SOL</text>
                
                <path d="M45 40 L155 85" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" markerEnd="url(#arrowR)" />
                <text x="100" y="65" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold" transform="rotate(15, 100, 65)">2) 0 SOL (Spoof)</text>
                
                <path d="M45 40 L155 90" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrowR)" />
                <text x="110" y="75" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold" transform="rotate(25, 110, 75)">3) 100 SOL</text>
             </svg>
          </div>
          <p className="text-[11px] text-zinc-500 font-medium italic leading-relaxed">Exploits smart contract transferFrom to force a fake 'Sent' record into victim history.</p>
        </div>

        {/* Panel C: Counterfeit */}
        <div className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] space-y-6 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl">
          <div className="absolute top-4 right-6 text-[8px] font-black text-zinc-800 uppercase tracking-widest">Protocol_Vector_C</div>
          <div className="space-y-1">
             <TechLabel text="MINT_DECEPTION" color="cyan" />
             <h5 className="text-xl font-black text-white uppercase italic tracking-tight">(c) Counterfeit</h5>
          </div>
          <div className="aspect-video relative bg-black/40 rounded-2xl border border-zinc-900 flex items-center justify-center p-4">
             <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                <circle cx="30" cy="40" r="10" fill="#050505" stroke="#10b981" strokeWidth="1.5" />
                <text x="30" y="43" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="900" className="italic">V</text>
                <circle cx="170" cy="40" r="10" fill="#050505" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="170" y="43" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="900" className="italic">R</text>
                <circle cx="170" cy="90" r="10" fill="#050505" stroke="#ef4444" strokeWidth="1.5" />
                <text x="170" y="93" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="900" className="italic">L</text>
                
                <path d="M45 40 H155" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrowB)" />
                <text x="100" y="35" textAnchor="middle" fill="#3b82f6" fontSize="6" fontWeight="bold">1) 123.4 USDC</text>
                
                <path d="M45 40 L155 85" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 1" markerEnd="url(#arrowC)" />
                <text x="100" y="65" textAnchor="middle" fill="#22d3ee" fontSize="6" fontWeight="bold" transform="rotate(15, 100, 65)">2) 123.4 USDTT</text>
                
                <path d="M45 40 L155 90" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" markerEnd="url(#arrowR)" />
                <text x="110" y="75" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="bold" transform="rotate(25, 110, 75)">3) 5,000 USDC</text>
                
                <defs>
                   <marker id="arrowC" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee"/></marker>
                   <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/></marker>
                </defs>
             </svg>
          </div>
          <p className="text-[11px] text-zinc-500 font-medium italic leading-relaxed">Adversary uses look-alike tokens to confuse asset context and biological verification.</p>
        </div>
      </div>
      
      {/* Research-Driven Compute Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2rem] flex items-center justify-between group overflow-hidden">
           <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                 <Zap className="text-blue-500 animate-pulse" size={18} />
              </div>
              <div className="space-y-1">
                 <h6 className="text-[12px] font-black text-white uppercase tracking-widest italic">VIGIL INTERCEPTION STANDARD</h6>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sovereign standard for neutralizing history injections.</p>
              </div>
           </div>
           <div className="text-right opacity-20 group-hover:opacity-100 transition-opacity">
              <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Vector_Ref</div>
              <div className="text-[11px] font-black text-white italic uppercase">VG-POI-CORE-v2</div>
           </div>
        </div>

        <div className="p-8 bg-purple-600/5 border border-purple-500/20 rounded-[2rem] flex items-center justify-between group overflow-hidden">
           <div className="flex items-center gap-6">
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                 <Cpu className="text-purple-500" size={18} />
              </div>
              <div className="space-y-1">
                 <h6 className="text-[12px] font-black text-white uppercase tracking-widest italic">COMPUTE INTENSITY: 16^d</h6>
                 <div className="flex items-center gap-3">
                   <div className="h-1.5 w-24 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 animate-marquee" style={{ width: '85%' }} />
                   </div>
                   <span className="text-[9px] font-mono text-zinc-500">d=20 | GPU_CLUSTER_DET</span>
                 </div>
              </div>
           </div>
           <div className="text-right">
              <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Audit_Cost</div>
              <div className="text-[11px] font-black text-red-500 italic uppercase">$1.7M FORGE</div>
           </div>
        </div>
      </div>
    </div>
  );
};
