import React from 'react';
import { Globe, Monitor, FileText } from 'lucide-react';

interface MeshKernelBridgeSectionProps {
  deployMeshKernel: () => void;
  setActiveDoc: (doc: any) => void;
}

export const MeshKernelBridgeSection: React.FC<MeshKernelBridgeSectionProps> = ({
  deployMeshKernel,
  setActiveDoc
}) => {
  return (
    <div className="py-12 md:py-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl p-12 md:p-24 bg-[#0a0a0a] border-2 border-zinc-800 rounded-[3rem] md:rounded-[5rem] text-center space-y-12 md:space-y-20 shadow-[0_50px_150px_rgba(0,0,0,1)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="space-y-10">
          <div className="relative inline-block">
            <div className="w-24 h-24 md:w-32 h-32 bg-zinc-900 border border-zinc-800 rounded-[2rem] flex items-center justify-center mx-auto text-cyan-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Globe size={48} className="animate-spin-slow" />
            </div>
            <div className="absolute -top-2 -right-2 px-3 py-1 bg-cyan-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest animate-pulse">VK-1_STABLE</div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Kernel Bridge.</h3>
            <p className="text-zinc-500 text-sm md:text-2xl font-medium italic max-w-2xl mx-auto leading-relaxed px-4">
              "The Sentinel Mesh requires an isolated processing environment. Deploy the standalone kernel to initialize zero-knowledge reputation synthesis."
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={deployMeshKernel}
            className="w-full sm:w-auto px-16 py-8 bg-white text-black rounded-2xl md:rounded-3xl text-[12px] font-black uppercase tracking-[0.5em] shadow-[0_0_80px_rgba(255,255,255,0.15)] hover:bg-cyan-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-4 group/btn"
          >
            <Monitor size={20} className="group-hover/btn:scale-110 transition-transform" /> DEPLOY_MESH_KERNEL
          </button>
          <button 
            onClick={() => setActiveDoc('mesh_intel')}
            className="w-full sm:w-auto px-12 py-8 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded-2xl md:rounded-3xl text-[11px] font-black uppercase tracking-[0.4em] hover:text-white hover:border-zinc-500 transition-all active:scale-95 flex items-center justify-center gap-4 group/btn"
          >
            <FileText size={20} className="group-hover/btn:scale-110 transition-transform text-cyan-500" /> READ_CAPABILITIES
          </button>
        </div>
        <div className="pt-10 md:pt-16 border-t border-zinc-900/50 flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-4 opacity-20">
            <div className="h-[1px] w-12 bg-zinc-800" />
            <span className="text-[9px] font-black uppercase tracking-[0.6em]">Auth_Node: VK-1</span>
            <div className="h-[1px] w-12 bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl opacity-40 px-4">
            {['LATENCY: 8ms', 'MESH: 1.2M', 'UPTIME: 100%', 'RELAY: OK'].map(t => (
              <div key={t} className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-widest">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};