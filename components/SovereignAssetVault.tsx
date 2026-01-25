import React, { useState, useEffect } from 'react';
import { 
  Shield, Image as ImageIcon, Download, 
  Trash2, Search, Filter, Maximize2, 
  ExternalLink, Fingerprint, Cpu, 
  Zap, Database, Terminal, Ruler, 
  LayoutGrid, List, CheckCircle2,
  FileCode, Sparkles, Plus
} from 'lucide-react';
import { TechLabel, TechNote } from './docs/DocHelpers';

interface Asset {
  id: string;
  type: 'LOGO' | 'HEADER' | 'ICON' | 'MARK';
  label: string;
  version: string;
  fidelity: string;
  timestamp: string;
  imgUrl: string;
  specs: string[];
}

interface SovereignAssetVaultProps {
  onInitialize?: () => void;
}

const CANONICAL_MARKS: Asset[] = [
  {
    id: 'V-NOTCH-CORE',
    type: 'LOGO',
    label: 'The V-Notch Monolith',
    version: 'v1.0',
    fidelity: 'VECTOR',
    timestamp: 'PROT_INIT',
    imgUrl: 'https://images.unsplash.com/photo-1635776062127-d379bfcbb9c8?auto=format&fit=crop&q=80&w=800',
    specs: ['1px stroke-weight', 'Monolithic italic', 'Notch-delta: 12%']
  },
  {
    id: 'RETINAL-SHIELD',
    type: 'MARK',
    label: 'The Retinal Perimeter',
    version: 'v1.2',
    fidelity: '4K',
    timestamp: 'H2_2025',
    imgUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800',
    specs: ['Prismatic refraction', 'Cyan-trace overlay', 'Saccadic focus']
  },
  {
    id: 'VOID-SYMBOL',
    type: 'ICON',
    label: 'The Sovereignty Shard',
    version: 'v0.9',
    fidelity: '2K',
    timestamp: 'PRE_GEN',
    imgUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    specs: ['Absolute Zinc #050505', 'Glass material study', 'Void-axis lock']
  }
];

export const SovereignAssetVault: React.FC<SovereignAssetVaultProps> = ({ onInitialize }) => {
  const [forges, setForges] = useState<Asset[]>([]);
  const [activeFilter, setActiveFilter] = useState<Asset['type'] | 'ALL'>('ALL');

  useEffect(() => {
    const saved = localStorage.getItem('vigil_forge_vault');
    if (saved) {
      try {
        setForges(JSON.parse(saved));
      } catch (e) {
        console.error("Vault parse failure", e);
      }
    }
  }, []);

  const clearVault = () => {
    if (confirm("Terminate all forged asset pointers? Raw data will remain in cache until browser purge.")) {
      localStorage.removeItem('vigil_forge_vault');
      setForges([]);
    }
  };

  const filtered = activeFilter === 'ALL' 
    ? [...CANONICAL_MARKS, ...forges] 
    : [...CANONICAL_MARKS, ...forges].filter(a => a.type === activeFilter);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-16 py-12 px-6 animate-in fade-in duration-1000">
      
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.6em]">Registry Hub // Asset Archive</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Asset <br/> Vault.
          </h2>
          <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
            "The persistent repository of forged identities. Calibrated marks, logos, and headers for the sovereign standard."
          </p>
        </div>

        <div className="flex flex-col items-end gap-6">
           <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-lg md:rounded-2xl flex">
              {(['ALL', 'LOGO', 'HEADER', 'ICON'] as const).map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-2.5 rounded-lg md:rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-400'}`}
                >
                  {f}
                </button>
              ))}
           </div>
           <button 
            onClick={clearVault}
            className="flex items-center gap-2 text-[8px] font-black text-zinc-700 hover:text-red-500 transition-colors uppercase tracking-widest"
           >
             <Trash2 size={10} /> TERMINATE_VAULT_POINTERS
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filtered.map((asset, i) => (
          <div 
            key={asset.id + i} 
            className="group relative bg-[#080808] border-2 border-zinc-900 rounded-[20px] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 hover:border-zinc-700"
          >
            {/* Asset Preview */}
            <div className={`relative ${asset.type === 'LOGO' || asset.type === 'ICON' ? 'aspect-square' : 'aspect-video'} bg-black overflow-hidden flex items-center justify-center border-b border-zinc-900`}>
               <img 
                 src={asset.imgUrl} 
                 alt={asset.label} 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
               />
               
               {/* Hover HUD Overlay */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button onClick={() => {
                    const a = document.createElement('a');
                    a.href = asset.imgUrl;
                    a.download = `${asset.id}.png`;
                    a.click();
                  }} className="p-4 bg-white text-black rounded-lg md:rounded-2xl hover:scale-110 transition-transform shadow-2xl active:scale-95">
                     <Download size={20} />
                  </button>
                  <button className="p-4 bg-zinc-900 border border-zinc-700 text-white rounded-lg md:rounded-2xl hover:scale-110 transition-transform shadow-2xl active:scale-95">
                     <Maximize2 size={20} />
                  </button>
               </div>

               <div className="absolute top-6 left-6">
                  <TechLabel text={asset.type} color={asset.type === 'LOGO' ? 'blue' : asset.type === 'HEADER' ? 'purple' : 'cyan'} />
               </div>

               <div className="absolute bottom-6 right-8 pointer-events-none">
                  <div className="flex items-center gap-4 opacity-40">
                     <span className="text-[10px] font-mono text-white tracking-widest uppercase">{asset.version}</span>
                     <div className="h-4 w-[1px] bg-zinc-700" />
                     <span className="text-[10px] font-mono text-white tracking-widest uppercase">{asset.fidelity}</span>
                  </div>
               </div>
            </div>

            {/* Asset Info */}
            <div className="p-8 space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{asset.id}</span>
                     <span className="text-[9px] font-mono text-zinc-800">{asset.timestamp}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight">{asset.label}</h4>
               </div>

               <div className="space-y-2">
                  {asset.specs.map((spec, si) => (
                    <div key={si} className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                       <div className="w-1 h-1 rounded-full bg-zinc-800" />
                       {spec}
                    </div>
                  ))}
               </div>

               <div className="pt-4 border-t border-zinc-900 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Integrity_Verified</span>
                  </div>
                  <CheckCircle2 size={14} className="text-zinc-800" />
               </div>
            </div>
          </div>
        ))}

        {/* Empty State / Call to Action */}
        <div className="p-8 border-2 border-dashed border-zinc-900 rounded-xl md:rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] group hover:border-blue-500/20 transition-all">
           <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-700 group-hover:text-blue-500 transition-colors">
              <Plus size={32} />
           </div>
           <div className="space-y-2">
              <h4 className="text-xl font-black text-zinc-500 uppercase tracking-widest">Awaiting Forgery</h4>
              <p className="text-zinc-700 text-sm font-bold uppercase italic max-w-xs">
                 Initialize the Brand Architect to forge new identities and anchor them in the vault.
              </p>
           </div>
           <button 
             onClick={onInitialize}
             className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-lg md:rounded-xl hover:text-white hover:border-blue-600/50 transition-all"
           >
              INITIALIZE_ARCHITECT
           </button>
        </div>
      </div>
    </div>
  );
};