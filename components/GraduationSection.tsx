import React from 'react';
import { Activity, Trophy, Globe, Medal, RotateCcw, Zap } from 'lucide-react';

interface GraduationSectionProps {
  bri: number;
  xp: number;
  setActiveDoc: (doc: any) => void;
}

export const GraduationSection: React.FC<GraduationSectionProps> = ({
  bri,
  xp,
  setActiveDoc
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24 text-center space-y-16 md:space-y-24 animate-in fade-in duration-1000">
      <div className="space-y-10 md:space-y-12">
        <div className="relative inline-block">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-emerald-500/20 flex items-center justify-center mx-auto shadow-[0_0_120px_rgba(16,185,129,0.15)] relative group">
            <Medal className="w-16 h-16 md:w-24 md:h-24 text-emerald-500 transition-transform group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-full animate-spin-slow opacity-40" />
          </div>
          <div className="absolute -top-4 -right-4 px-5 py-2 bg-white text-black rounded-xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl">SENTINEL_ELITE</div>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          <h3 className="text-[2.25rem] md:text-[4.5rem] font-black text-white italic uppercase tracking-tighter leading-none drop-shadow-2xl">Graduation.</h3>
          <div className="h-1.5 w-32 bg-emerald-500 rounded-full mx-auto" />
          <p className="text-zinc-500 text-sm md:text-3xl font-medium max-w-4xl mx-auto italic leading-relaxed px-4">
            "Calibration successfully concluded. Operator has reached terminal proficiency. Final disengage sequence active. Your <span className="text-white">resilience</span> is now your permanent shield. Go forth into the wild, Sentinel."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
        <div className="p-10 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] space-y-4 shadow-inner group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-3">
            <Activity className="text-zinc-700 group-hover:text-emerald-500 transition-colors" size={16} />
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Final Resilience</div>
          </div>
          <div className="text-4xl md:text-6xl font-black text-emerald-500 italic tracking-tighter">{bri}% BRI</div>
        </div>
        <div className="p-10 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] space-y-4 shadow-inner group hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-3">
            <Trophy className="text-zinc-700 group-hover:text-blue-500 transition-colors" size={16} />
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Merit</div>
          </div>
          <div className="text-4xl md:text-6xl font-black text-blue-500 italic tracking-tighter">{xp.toLocaleString()} XP</div>
        </div>
        <div className="hidden md:block p-10 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] space-y-4 shadow-inner group hover:border-white/20 transition-all">
          <div className="flex items-center gap-3">
            <Globe className="text-zinc-700 group-hover:text-white transition-colors" size={16} />
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global State</div>
          </div>
          <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">VERIFIED</div>
        </div>
      </div>

      <div className="space-y-10 pt-10 md:pt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => setActiveDoc('how_to_use')}
            className="w-full md:w-auto px-16 py-8 bg-white text-black rounded-[2rem] text-[12px] font-black uppercase tracking-[0.5em] hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.15)] active:scale-95 flex items-center justify-center gap-5 group"
          >
            <Zap size={20} className="fill-current" /> DEPLOY FIELD UNIT
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="w-full md:w-auto px-12 py-8 bg-zinc-950 border border-zinc-900 text-zinc-500 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:text-white hover:border-zinc-700 transition-all flex items-center justify-center gap-4"
          >
            <RotateCcw size={18} /> NEW_CALIBRATION
          </button>
        </div>
        <div className="space-y-2 opacity-30">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.8em]">VIGIL SECURITY STANDARD // MASTER_REGISTRY_2026</p>
          <p className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">Node_Signature: 0x8821...FF_GRADUATED</p>
        </div>
      </div>
    </div>
  );
};