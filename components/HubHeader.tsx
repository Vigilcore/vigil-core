import React from 'react';

interface HubHeaderProps {
  title: string;
  subtitle: string;
  number: string;
  description?: string;
}

export const HubHeader: React.FC<HubHeaderProps> = ({ title, subtitle, number, description }) => (
  <div className="px-6 md:px-20 pt-10 pb-4 bg-transparent relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-6 mb-4">
        <div className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-sm shadow-xl">SECURITY HUB {number}</div>
        <div className="h-[1px] flex-1 bg-zinc-900" />
      </div>
      <h2 className="text-[2.25rem] md:text-[4.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.8]">{title}</h2>
      <p className="text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mt-6 mb-8">{subtitle}</p>
      
      {description && (
        <div className="p-8 md:p-14 bg-[#0a0a0a]/40 backdrop-blur-[40px] border border-zinc-800 rounded-[20px] md:rounded-[32px] relative overflow-hidden group shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000 mb-12">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
           <p className="text-[20px] md:text-[30px] font-black text-zinc-200 italic leading-tight md:leading-[1.1] uppercase tracking-tight">
             "{description}"
           </p>
           <div className="absolute bottom-4 right-8 flex items-center gap-2 opacity-10">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <span className="text-[8px] font-black text-white uppercase tracking-widest">MISSION_STATEMENT</span>
           </div>
        </div>
      )}
    </div>
  </div>
);