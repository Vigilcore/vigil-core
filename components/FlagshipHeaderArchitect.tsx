import React, { useState, useEffect } from 'react';
import { 
  Download, Twitter, Sparkles, Terminal, 
  Cpu, Activity, Layout, 
  Settings2, Loader2, RotateCcw, 
  ShieldAlert, Lock, Zap, Box, 
  Maximize, Layers, Ruler, Plus, Archive,
  ImageIcon, Type, Palette, Monitor,
  Waves, Ghost, Eye
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
// NOTE: Image generation uses direct API calls - needs API route for full security
import { TechLabel, TechNote } from './docs/DocHelpers';
import { VigilScanner } from './VigilScanner';
import { playSuccessChime } from '../utils/audio';
import { useApiGuard } from '../hooks/useApiGuard';
import { ApiErrorDisplay } from './ApiErrorDisplay';

type ArchitectState = 'IDLE' | 'AUTH_REQUIRED' | 'FORGING' | 'COMPLETED' | 'ERROR' | 'QUOTA_EXHAUSTED';
type Resolution = '1K' | '2K' | '4K';
type AssetType = 'HEADER' | 'LOGO';
type AestheticMode = 'SCHEMATIC' | 'CINEMATIC';

const HEADER_CINEMATIC = (res: string) => `
MASTER ARTISTIC DIRECTIVE — VIGIL MASTER BANNER (1500×500):
Execute a world-class, multi-software digital composite. 

ARTISTIC PIPELINE (STRICT RULES):
• RENDERING (Blender Cycles): Photorealistic 3D glass rendering. Centerpiece is a monolithic geometric "V" with a bottom-center notch (The V-Notch). Material: High-refractive frosted glass with 1.45 IOR. 
• LIGHTING: Volumetric "Prussian Blue" atmospheric fog. Subsurface scattering on the glass edges. Cold cyan (#22d3ee) rim-lighting. Deep ambient occlusion in the recesses.
• COMPOSITING (Photoshop): Heavy cinematic vignetting. The background is NOT pure black; it is a deep, textured zinc-charcoal with a midnight blue color grade. Add "Atmospheric Light Leaks" that catch the glass prism.
• VECTOR (Illustrator): Overlay the 3D scene with ultra-fine 1px technical schematics, mathematical grids, and micro-telemetry readouts. The vectors should have a slight 3D Z-offset from the background.

AESTHETIC FINISH:
• Soft 35mm film grain.
• Sub-pixel chromatic aberration on the extreme edges.
• Horizontal 1px cyan laser scan-line glowing through the center of the V-Notch.
• Extreme depth of field; the background schematics are softly blurred (bokeh).

Output Fidelity: ${res} Definitive Master Print Standard.
`;

const HEADER_SCHEMATIC = (res: string) => `
MASTER PROMPT — VIGIL SCHEMATIC HEADER (1500×500):
Design a pure 2D Flat Vector Schematic. Absolute charcoal background (#050505). Technical 1px grids, white lines, cyan scan pass-lines.
Resolution: ${res} Standard.
`;

const LOGO_CONSTRAINTS = (res: string) => `
MASTER PROMPT — VIGIL MONOLITH LOGO (1:1):
Construct a photorealistic 3D glass "V-Notch" mark. Cycles Render. Volumetric cyan lighting. Textured charcoal background.
Resolution: ${res} Master Standard.
`;

export const FlagshipHeaderArchitect: React.FC = () => {
  const apiGuard = useApiGuard();
  const [state, setState] = useState<ArchitectState>('IDLE');
  const [resolution, setResolution] = useState<Resolution>('2K');
  const [assetType, setAssetType] = useState<AssetType>('HEADER');
  const [aesthetic, setAesthetic] = useState<AestheticMode>('CINEMATIC');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState('INITIALIZING_CYCLES_RENDER_LINK');
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [usage, setUsage] = useState<{ tokens: number; latency: number } | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
      if (!hasKey) setState('AUTH_REQUIRED');
    };
    checkAuth();
  }, []);

  const triggerSuccessFeedback = () => {
    playSuccessChime();
    const flash = document.getElementById('flash-overlay');
    if (flash) {
      flash.classList.add('animate-refractive-flash');
      setTimeout(() => flash.classList.remove('animate-refractive-flash'), 800);
    }
  };

  const handleSelectKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setApiKeySelected(true);
      setState('IDLE');
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  const startForge = async () => {
    setState('FORGING');
    setError(null);
    setHasSaved(false);
    setProgressMsg(`BOOTING_${aesthetic}_COMPOSITING_PIPELINE`);
    const start = Date.now();

    if (!apiGuard.isValid) {
      setState('AUTH_REQUIRED');
      return;
    }

    try {
      const apiKey = apiGuard.apiKey!;
      const ai = new GoogleGenAI({ apiKey });
      let prompt = "";
      
      if (assetType === 'LOGO') {
        prompt = LOGO_CONSTRAINTS(resolution);
      } else {
        prompt = aesthetic === 'CINEMATIC' ? HEADER_CINEMATIC(resolution) : HEADER_SCHEMATIC(resolution);
      }
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: assetType === 'HEADER' ? "16:9" : "1:1", 
            imageSize: resolution
          }
        }
      });

      const latency = Date.now() - start;
      
      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) throw new Error("Forge engine failed to output pixel data.");

      setUsage({
        tokens: response.usageMetadata?.totalTokenCount || 0,
        latency: latency
      });
      setState('COMPLETED');
      triggerSuccessFeedback();
    } catch (err: any) {
      console.error("Forge Error:", err);
      const rawMsg = err.message || "";
      if (rawMsg.includes("429") || rawMsg.includes("quota")) {
        setState('QUOTA_EXHAUSTED');
      } else if (rawMsg.includes("entity was not found")) {
        setApiKeySelected(false);
        setState('AUTH_REQUIRED');
      } else {
        setError(rawMsg || "Forge kernel exception.");
        setState('ERROR');
      }
    }
  };

  const handleSaveToVault = () => {
    if (!imageUrl) return;
    if (!confirm("SYNC_DIRECTIVE: Archive this asset to the Sovereign Asset Vault?")) return;

    const currentVault = JSON.parse(localStorage.getItem('vigil_forge_vault') || '[]');
    const newEntry = {
      id: `FORGE-${Math.random().toString(16).slice(2, 8).toUpperCase()}`,
      type: assetType,
      label: `Master Forged ${aesthetic} ${assetType}`,
      version: 'v2.1_ULTRA',
      fidelity: resolution,
      timestamp: new Date().toLocaleTimeString(),
      imgUrl: imageUrl,
      specs: [`Mode: ${aesthetic}`, `Res: ${resolution}`, 'Blender/PS Pipeline']
    };
    localStorage.setItem('vigil_forge_vault', JSON.stringify([newEntry, ...currentVault].slice(0, 20)));
    setHasSaved(true);
    triggerSuccessFeedback();
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700 pb-32">
      
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-900" />
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.6em]">Pro Identity Forge // Ultra Standard</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
            Brand <br/> Architect.
          </h2>
          <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
            "Construct world-class cinematic identities. Replicating the Blender, Photoshop, and Illustrator workflow for the sovereign standard."
          </p>
        </div>

        <div className="flex flex-col gap-4 items-end">
           <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
              <button 
                onClick={() => setAesthetic('SCHEMATIC')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${aesthetic === 'SCHEMATIC' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-400'}`}
              >
                Schematic
              </button>
              <button 
                onClick={() => setAesthetic('CINEMATIC')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${aesthetic === 'CINEMATIC' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-400'}`}
              >
                Cinematic
              </button>
           </div>
           <div className="p-1 bg-[#0a0a0a] border border-zinc-900 rounded-2xl flex">
              {(['HEADER', 'LOGO'] as AssetType[]).map(t => (
                <button 
                  key={t}
                  onClick={() => { setAssetType(t); setImageUrl(null); setState('IDLE'); }}
                  disabled={state === 'FORGING'}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${assetType === t ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-400'}`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* CONTROL SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                 <Ruler size={120} className="text-white" />
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Palette className="w-4 h-4 text-blue-500" />
                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Post-Processing Stack</span>
                    </div>
                    <div className="space-y-2">
                       {[
                         aesthetic === 'CINEMATIC' ? "Blender Cycles Glass Render" : "2D Flat Vector",
                         aesthetic === 'CINEMATIC' ? "Prussian Blue Fog Effects" : "Absolute Void",
                         "Illustrator Telemetry Overlays",
                         "Photoshop Color Grading"
                       ].map(c => (
                         <div key={c} className="flex items-center gap-3 text-[9px] font-black text-zinc-500 uppercase tracking-widest p-3.5 bg-black/40 border border-zinc-900 rounded-xl">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {c}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Monitor className="w-4 h-4 text-zinc-500" />
                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Master Fidelity</span>
                    </div>
                    <div className="p-1 bg-black border border-zinc-900 rounded-xl flex">
                      {(['1K', '2K', '4K'] as Resolution[]).map(res => (
                        <button 
                          key={res} 
                          onClick={() => setResolution(res)}
                          disabled={state === 'FORGING'}
                          className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all ${resolution === res ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-400'}`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                {!apiKeySelected ? (
                  <button 
                    onClick={handleSelectKey}
                    className="w-full py-6 bg-amber-600 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.4em] transition-all hover:bg-amber-500 shadow-2xl flex items-center justify-center gap-4 active:scale-95"
                  >
                    <Lock className="w-4 h-4" /> AUTHORIZE MASTER FORGE
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={startForge}
                      disabled={state === 'FORGING'}
                      className={`w-full py-7 rounded-2xl text-[13px] font-black uppercase tracking-[0.6em] transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 ${
                        state === 'FORGING' ? 'bg-zinc-950 text-zinc-700 cursor-wait border border-zinc-900' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {state === 'FORGING' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> F O R G E  {assetType}</>}
                    </button>
                    
                    {state === 'COMPLETED' && (
                      <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-500">
                        <button 
                          onClick={handleSaveToVault}
                          disabled={hasSaved}
                          className={`py-4 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${hasSaved ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'}`}
                        >
                          <Archive size={14} /> {hasSaved ? 'VAULTED' : 'SAVE_TO_VAULT'}
                        </button>
                        <button 
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = imageUrl!;
                            a.download = `VIGIL_${aesthetic}_${assetType}.png`;
                            a.click();
                          }}
                          className="py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-xl hover:text-white hover:border-zinc-700 transition-all flex items-center justify-center gap-3"
                        >
                          <Download size={14} /> MASTER_EXPORT
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
           </div>

           <TechNote title="DESIGN PHILOSOPHY">
             "Identity is the final line of defense. The VIGIL Master Standard utilizes 3D depth and atmospheric lighting to project institutional authority."
           </TechNote>
        </div>

        {/* PREVIEW CANVAS */}
        <div className="lg:col-span-8 flex flex-col items-center gap-8">
           <div className={`relative w-full border-2 rounded-[3.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#020202] p-4 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${state === 'FORGING' ? 'border-blue-600/40 shadow-[0_0_50px_rgba(59,130,246,0.1)]' : 'border-zinc-900'}`}>
              
              {/* HUD OVERLAY */}
              <div className="absolute top-10 left-10 opacity-30 pointer-events-none z-20">
                 <div className="text-[9px] font-mono text-zinc-500 font-bold tracking-widest uppercase flex items-center gap-4">
                    <span>SYS_REF: VIG-ARCH-${assetType}</span>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    <span>AESTHETIC: ${aesthetic}_MASTER</span>
                 </div>
              </div>

              {/* CANVAS FRAME */}
              <div className={`relative w-full ${assetType === 'LOGO' ? 'aspect-square max-w-[500px]' : 'aspect-[1500/500] max-w-[1200px]'} border border-zinc-800 bg-[#050505] rounded-2xl overflow-hidden flex items-center justify-center shadow-inner group transition-all duration-500`}>
                 
                 {/* IDLE VIEW */}
                 {state === 'IDLE' && (
                   <div className="text-center space-y-6 animate-in fade-in duration-1000">
                      <div className="relative inline-block">
                         <Box className="w-20 h-20 text-zinc-900 mx-auto" strokeWidth={0.5} />
                         <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-zinc-800 uppercase tracking-[0.4em]">Blank Canvas.</h4>
                        <p className="text-[9px] font-black text-zinc-900 uppercase tracking-widest italic">AWAITING_MASTER_PIPELINE</p>
                      </div>
                   </div>
                 )}

                 {/* AUTH VIEW */}
                 {apiGuard.error ? (
                   <ApiErrorDisplay error={apiGuard.error} />
                 ) : state === 'AUTH_REQUIRED' && (
                   <div className="text-center space-y-8 animate-in zoom-in duration-500 relative z-10">
                      <Lock className="w-16 h-16 text-amber-600/50 mx-auto" strokeWidth={1} />
                      <div className="space-y-4">
                        <h4 className="text-2xl font-black text-amber-600 uppercase italic tracking-tighter">Auth Required.</h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] max-w-xs mx-auto">
                          A paid API key is required for High-Fidelity {resolution} rendering.
                        </p>
                        <button onClick={handleSelectKey} className="px-8 py-3 bg-amber-600 text-white text-xs font-black uppercase rounded-lg">SELECT KEY</button>
                      </div>
                   </div>
                 )}

                 {/* FORGING VIEW */}
                 {state === 'FORGING' && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202]">
                       <VigilScanner size="lg" label={progressMsg} />
                       <div className="mt-8 flex gap-2">
                          {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                          ))}
                       </div>
                    </div>
                 )}

                 {/* RESULT VIEW */}
                 {state === 'COMPLETED' && imageUrl && (
                   <div className="w-full h-full relative group/img animate-in zoom-in duration-700">
                      <img src={imageUrl} alt="Forged VIGIL Asset" className="w-full h-full object-cover" />
                      
                      {/* Post-Process UI Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[size:10px_10px] bg-[radial-gradient(circle,white_1px,transparent_0)]" />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                         <button 
                           onClick={() => {
                             const a = document.createElement('a');
                             a.href = imageUrl!;
                             a.download = `VIGIL_${aesthetic}_${assetType}.png`;
                             a.click();
                           }}
                           className="p-5 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-2xl active:scale-95"
                         >
                            <Download size={24} />
                         </button>
                         <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=Elevating the security standard with @Vigil_Research.`, '_blank')} className="p-5 bg-[#1DA1F2] text-white rounded-full hover:scale-110 transition-transform shadow-2xl active:scale-95">
                            <Twitter size={24} />
                         </button>
                      </div>

                      {/* Professional Info Watermark */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover/img:opacity-40 transition-opacity">
                         <div className="text-right space-y-1">
                            <div className="text-[10px] font-black text-white uppercase tracking-widest italic">VIG-PRO-FORGE</div>
                            <div className="text-[8px] font-mono text-zinc-400">ENGINE_v2.1_ULTRA</div>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* ERROR VIEW */}
                 {(state === 'ERROR' || state === 'QUOTA_EXHAUSTED') && (
                   <div className="text-center space-y-6">
                      <ShieldAlert className="w-16 h-16 text-red-600 mx-auto" strokeWidth={1} />
                      <div className="space-y-2">
                         <h4 className="text-xl font-black text-red-600 uppercase italic">{state === 'QUOTA_EXHAUSTED' ? 'Quota Exhausted' : 'Forge Breach'}</h4>
                         <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest max-w-xs mx-auto">{error || 'Rate limit reached.'}</p>
                      </div>
                      <button onClick={state === 'QUOTA_EXHAUSTED' ? handleSelectKey : startForge} className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-black uppercase tracking-widest rounded-lg hover:text-white transition-all">
                        {state === 'QUOTA_EXHAUSTED' ? 'SWITCH KEY' : 'RETRY'}
                      </button>
                   </div>
                 )}
              </div>
           </div>

           {/* TELEMETRY FOOTER */}
           {usage && (
             <div className="grid grid-cols-3 gap-12 w-full max-w-2xl px-6 opacity-40 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="space-y-1">
                   <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Master Pipeline</div>
                   <div className="text-xl font-black text-white italic tracking-tighter uppercase">Blender+PS v2.1</div>
                </div>
                <div className="space-y-1 border-x border-zinc-900 px-12 text-center">
                   <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Aesthetic Score</div>
                   <div className="text-xl font-black text-blue-500 italic tracking-tighter">{aesthetic}_ULTRA</div>
                </div>
                <div className="text-right space-y-1">
                   <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Asset Fidelity</div>
                   <div className="text-xl font-black text-emerald-500 italic tracking-tighter uppercase">{resolution}</div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
