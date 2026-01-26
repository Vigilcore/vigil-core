import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Zap, Cpu, Activity, RotateCcw, Loader2, Info, Lock, ShieldCheck, Copy, Check, Square, Timer, Database, Radio, Fingerprint, Download, History, Plus, Trash2, MessageSquare, X, Mic, MicOff, Globe, ExternalLink } from 'lucide-react';
import { routeMeshQuery } from '../services/aiRouter';
import { UsageData } from '../services/geminiService';
import { useApiGuard } from '../hooks/useApiGuard';
import { ApiErrorDisplay } from './ApiErrorDisplay';

interface Message {
  role: 'USER' | 'MESH' | 'SYSTEM';
  text: string;
  status?: string;
  command?: string;
  sources?: { uri: string; title: string }[];
}

interface ChatSession {
  id: string;
  title: string;
  history: Message[];
  timestamp: number;
}

interface MeshQueryTerminalProps {
  isStandalone?: boolean;
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
  onClose?: () => void;
}

const VIGIL_LEXICON = [
  "Zero-Value Injection",
  "Mother Wallet Lineage",
  "Cluster Density",
  "Saccadic Masking"
];

const PacketStreamTicker = () => {
  const [packets, setPackets] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const hex = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
      setPackets(prev => [hex, ...prev].slice(0, 8));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 overflow-hidden mask-fade-edges">
      {packets.map((p, i) => (
        <span key={i} className={`text-[9px] font-mono transition-opacity duration-700 ${i === 0 ? 'text-cyan-500 opacity-100' : 'text-zinc-800 opacity-30'}`}>
          {p}
        </span>
      ))}
    </div>
  );
};

const NeuralWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className={`flex items-center gap-0.5 h-3 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
    {[1, 2, 3, 4, 5, 6].map(i => (
      <div 
        key={i} 
        className="w-0.5 bg-blue-500 rounded-full animate-pulse" 
        style={{ 
          height: isActive ? `${20 + Math.random() * 80}%` : '20%',
          animationDelay: `${i * 0.1}s`,
          animationDuration: '0.4s'
        }} 
      />
    ))}
  </div>
);

export const MeshQueryTerminal: React.FC<MeshQueryTerminalProps> = ({ isStandalone = false, onUsageUpdate, onScanningChange, onClose }) => {
  const apiGuard = useApiGuard();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([
    { role: 'MESH', text: "VIGIL_SENTINEL_MESH ONLINE. NEURAL_PARITY: OK. STANDBY FOR DIRECTIVE." }
  ]);
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('vigil_mesh_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isSavedIndicator, setIsSavedIndicator] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [kernelHeat, setKernelHeat] = useState(38.4);
  const [uptime, setUptime] = useState("00:00:00");
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fullTextRef = useRef("");
  const typingTimerRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const isStreamingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentSourcesRef = useRef<{ uri: string; title: string }[]>([]);
  const isCreatingSessionRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('vigil_mesh_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const createNewSession = () => {
    if (isProcessing) return;
    setCurrentSessionId(null);
    setHistory([{ role: 'MESH', text: "VIGIL_SENTINEL_MESH ONLINE. NEURAL_PARITY: OK. STANDBY FOR DIRECTIVE." }]);
    setInput('');
  };

  const loadSession = (session: ChatSession) => {
    if (isProcessing) return;
    setCurrentSessionId(session.id);
    setHistory(session.history);
    setInput('');
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) createNewSession();
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser environment.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev ? `${prev} ${transcript}` : transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const formatMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.trim().startsWith('###')) {
        const headerText = line.replace('###', '').trim();
        return (
          <div key={idx} className="mt-6 mb-2 first:mt-0">
            <span className="text-cyan-400 font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <div className="w-1 h-3 bg-cyan-500 rounded-full" />
              {headerText}
            </span>
          </div>
        );
      }
      if (line.trim().startsWith('-')) {
        const bulletText = line.replace('-', '').trim();
        return (
          <div key={idx} className="ml-4 mb-1.5 flex gap-3 items-start">
            <span className="text-zinc-500 mt-1 shrink-0">•</span>
            <span className="text-zinc-400 text-[12px] leading-relaxed">
              {renderInlines(bulletText)}
            </span>
          </div>
        );
      }
      return (
        <div key={idx} className="mb-2 last:mb-0 text-[12px] leading-relaxed text-zinc-300">
          {renderInlines(line)}
        </div>
      );
    });
  };

  const renderInlines = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="text-cyan-400 font-bold border-b border-cyan-900/30 pb-0.5 px-1 bg-cyan-400/5 rounded-sm">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, isProcessing, isTyping]);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      setUptime(`${Math.floor(diff/3600).toString().padStart(2, '0')}:${Math.floor((diff%3600)/60).toString().padStart(2, '0')}:${(diff%60).toString().padStart(2, '0')}`);
      setKernelHeat(prev => {
        const base = isProcessing ? 54 : 38;
        return Math.min(85, Math.max(36, prev + (Math.random() - 0.5) * 0.2 + (base - prev) * 0.05));
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isProcessing]);

  useEffect(() => {
    if (isTyping && !typingTimerRef.current) {
      typingTimerRef.current = window.setInterval(() => {
        setHistory(prev => {
          const newHistory = [...prev];
          const lastMsg = newHistory[newHistory.length - 1];
          if (lastMsg && lastMsg.role === 'MESH') {
            if (lastMsg.text.length < fullTextRef.current.length) {
              // Continue typing - more text available
              return [...prev.slice(0, -1), { ...lastMsg, text: lastMsg.text + fullTextRef.current[lastMsg.text.length], sources: currentSourcesRef.current }];
            } else {
              // Text complete - stop typing deterministically
              clearInterval(typingTimerRef.current!);
              typingTimerRef.current = null;
              setIsTyping(false);
              
              updateSessionsInStorage([...prev.slice(0, -1), { ...lastMsg, text: fullTextRef.current, sources: currentSourcesRef.current }]);
            }
          }
          return prev;
        });
      }, 5);
    }
    return () => { if (typingTimerRef.current) clearInterval(typingTimerRef.current); };
  }, [isTyping]);

  const updateSessionsInStorage = (finalHistory: Message[]) => {
    if (currentSessionId) {
      setSessions(prev => prev.map(s => s.id === currentSessionId ? { ...s, history: finalHistory } : s));
    } else {
      // Prevent duplicate session creation with ref guard
      if (isCreatingSessionRef.current) return;
      isCreatingSessionRef.current = true;
      
      // Check for existing session with same first user message
      const firstUserMessage = finalHistory.find(m => m.role === 'USER')?.text;
      setSessions(prev => {
        if (firstUserMessage) {
          const existingSession = prev.find(s => {
            const existingFirstUser = s.history.find(m => m.role === 'USER')?.text;
            return existingFirstUser === firstUserMessage;
          });
          
          if (existingSession) {
            // Update existing session instead of creating duplicate
            setTimeout(() => {
              setCurrentSessionId(existingSession.id);
              isCreatingSessionRef.current = false;
            }, 0);
            return prev.map(s => s.id === existingSession.id ? { ...s, history: finalHistory } : s);
          }
        }
        
        // Create new session only if no duplicate found
        const newId = Date.now().toString();
        const title = finalHistory.find(m => m.role === 'USER')?.text.slice(0, 30) || "New Directive";
        setTimeout(() => {
          setCurrentSessionId(newId);
          isCreatingSessionRef.current = false;
        }, 0);
        return [{ id: newId, title, history: finalHistory, timestamp: Date.now() }, ...prev];
      });
    }
    setIsSavedIndicator(true);
    setTimeout(() => setIsSavedIndicator(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([history.map(m => `[${m.role}] ${m.text}`).join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VIGIL_INTEL_${Date.now()}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isProcessing || !apiGuard.isValid) return;

    const userQuery = input.trim();
    if (userQuery.startsWith('/purge')) {
      createNewSession();
      return;
    }

    abortControllerRef.current = new AbortController();
    const startTime = Date.now();
    setInput('');
    const newHistory: Message[] = [...history, { role: 'USER', text: userQuery }];
    setHistory(newHistory);
    setIsProcessing(true);
    onScanningChange?.(true);
    currentSourcesRef.current = [];

    // Timeout safety: ensure request doesn't hang forever
    const timeoutId = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }, 60000); // 60 second timeout

    try {
      // Non-streaming: await complete response
      console.log('[MESH] Awaiting response...');
      const response = await routeMeshQuery(userQuery, abortControllerRef.current.signal);
      console.log('[MESH] Response received:', response);
      clearTimeout(timeoutId);
      
      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('[CLASSIFICATION] MALFORMED_RESPONSE\n[!] Backend returned invalid response structure.');
      }
      
      // Set complete text immediately (non-streaming backend)
      fullTextRef.current = response.text || '';
      
      // Add empty MESH message to history - typing timer will animate it
      // If text is empty, timer will see 0 === 0 and finalize immediately
      setHistory([...newHistory, { role: 'MESH', text: '', sources: currentSourcesRef.current }]);
      setIsTyping(true);
      
      // Update usage metadata if available
      if (response.usageMetadata) {
        onUsageUpdate?.({
          promptTokens: response.usageMetadata.promptTokenCount || 0,
          candidatesTokens: response.usageMetadata.candidatesTokenCount || 0,
          totalTokens: response.usageMetadata.totalTokenCount || 0,
          latencyMs: Date.now() - startTime
        });
      }
      
      // Typing timer will handle completion when lastMsg.text.length === fullTextRef.current.length
      // DO NOT stop typing here - let the timer complete naturally
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('[MESH] Error:', error);
      if (error.name === 'AbortError') {
        // Abort is intentional - cleanup and return
        setIsProcessing(false);
        setIsTyping(false);
        onScanningChange?.(false);
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        return;
      }
      const errorMessage = error.message || "[CLASSIFICATION] RESTRICTED\n[!] CRITICAL_LINK_FAILURE: DATA_STREAM_COLLAPSE.";
      fullTextRef.current = errorMessage;
      // Immediately write error to history and stop typing
      setHistory([...newHistory, { role: 'MESH', text: errorMessage, sources: currentSourcesRef.current }]);
      setIsTyping(false);
      // Clear typing timer immediately on error
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    } finally {
      clearTimeout(timeoutId);
      console.log('[MESH] Finally block executing - resetting isProcessing');
      // Atomic finalizer: ALWAYS reset processing state
      // DO NOT stop typing on success - typing timer handles that
      setIsProcessing(false);
      onScanningChange?.(false);
      // Only clear typing timer on error/abort (handled in catch/abort blocks above)
    }
  };

  return (
    <div className="h-full w-full flex animate-in fade-in duration-1000 relative overflow-hidden bg-[#020202]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[size:100%_4px] bg-[linear-gradient(transparent_0px,transparent_2px,rgba(255,255,255,0.15)_2px,rgba(255,255,255,0.15)_3px)]" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[size:60px_100%] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
      
      <aside className="hidden md:flex w-72 bg-zinc-950/40 backdrop-blur-3xl border-r border-white/5 flex-col shrink-0 relative z-20 transition-all duration-500 overflow-hidden">
        <div className="p-6 border-b border-zinc-900 flex flex-col gap-6">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg shadow-xl shrink-0">
                 <div className="w-4 h-4 bg-black rotate-45" />
              </div>
              <span className="text-xl font-black italic uppercase tracking-tighter text-white">Vigil.</span>
           </div>
           <button 
             onClick={createNewSession}
             disabled={isProcessing}
             className="w-full py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/5 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-20"
           >
              <Plus size={14} /> New Directive
           </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
           <div className="px-3 mb-4 mt-2 flex items-center justify-between">
              <span className="text-xs font-black text-zinc-700 uppercase tracking-[0.4em] flex items-center gap-2">
                 <History size={10} /> Local_Silos
              </span>
              {isSavedIndicator && (
                <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-300">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                   <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">SAVED</span>
                </div>
              )}
           </div>
           {sessions.map(s => (
             <div 
               key={s.id}
               onClick={() => loadSession(s)}
               className={`group flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${currentSessionId === s.id ? 'bg-blue-600/10 border-blue-500/40 text-white' : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-400'}`}
             >
                <div className="flex items-center gap-3 overflow-hidden">
                   <MessageSquare size={12} className={currentSessionId === s.id ? 'text-blue-500' : 'text-zinc-800'} />
                   <span className="text-[10px] font-black uppercase tracking-widest truncate">{s.title}</span>
                </div>
                <button onClick={(e) => deleteSession(e, s.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all">
                   <Trash2 size={10} />
                </button>
             </div>
           ))}
        </div>

        <div className="p-6 border-t border-zinc-900 bg-black/40">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Sys_Relay: Stable</span>
           </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="h-10 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 border border-zinc-800 px-2 py-0.5 rounded bg-zinc-900/50">
                 <span className="text-xs font-black text-zinc-500 uppercase tracking-widest leading-none">MESH INTELLIGENCE</span>
                 <div className="h-1.5 w-px bg-zinc-800" />
                 <span className="text-xs font-mono text-blue-500/80">VK-1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Sys: Hardened</span>
              </div>
            </div>
            <div className="h-4 w-px bg-zinc-900 hidden sm:block" />
            <div className="hidden sm:block">
              <PacketStreamTicker />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs font-black text-zinc-700 uppercase tracking-widest">Kernel Heat:</span>
              <span className={`text-xs font-mono font-bold ${kernelHeat > 70 ? 'text-red-500' : 'text-zinc-500'}`}>{kernelHeat.toFixed(1)}°C</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Timer size={12} className="text-zinc-700" />
              <span className="text-[10px] font-mono text-zinc-500">{uptime}</span>
            </div>
            {onClose && (
              <button onClick={onClose} className="p-1 rounded hover:bg-white/5 text-zinc-500 hover:text-white transition-all ml-2">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 custom-scrollbar">
          {apiGuard.error ? (
            <ApiErrorDisplay error={apiGuard.error} />
          ) : (
            <>
              {history.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'USER' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
              {msg.role === 'USER' ? (
                <div className="space-y-2 max-w-[90%] md:max-w-[80%] text-right">
                   <div className="flex items-center justify-end gap-2 text-zinc-800">
                      <span className="text-xs font-black uppercase tracking-widest italic">Operator Directive</span>
                      <Fingerprint size={10} />
                   </div>
                   <div className="px-6 py-4 bg-black border border-zinc-500/60 rounded-l-[2rem] rounded-br-[2rem] shadow-2xl">
                      <p className="text-base md:text-lg font-black text-zinc-200 italic uppercase tracking-tighter leading-relaxed drop-shadow-xl text-left md:text-right">
                        "{msg.text}"
                      </p>
                   </div>
                </div>
              ) : (
                <div className="group relative max-w-[95%] md:max-w-[85%] w-full md:w-auto">
                   <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center ${msg.text.includes('RESTRICTED') ? 'text-red-500' : 'text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]'}`}>
                         <Cpu size={16} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-xs font-black text-zinc-500 uppercase tracking-widest leading-none">VIGIL_MESH_KERNEL</span>
                         <span className="text-xs font-mono text-zinc-800 uppercase tracking-tighter">NODE: VK-1_STABLE</span>
                      </div>
                   </div>
                   <div className={`p-4 md:p-6 rounded-r-[2rem] rounded-bl-[2rem] border transition-all duration-700 bg-black ${
                     msg.text.includes('RESTRICTED') 
                       ? 'border-red-900/60 border-l-4 border-l-red-600' 
                       : 'border-zinc-800 border-l-4 border-l-cyan-500'
                   }`}>
                      <div className={`font-mono tracking-tight ${isTyping && i === history.length - 1 ? 'border-r-2 border-cyan-500/50 animate-pulse' : ''}`}>
                         {formatMessage(msg.text)}
                      </div>

                      {/* DISPLAY INTELLIGENCE SOURCES */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-zinc-900 animate-in fade-in duration-1000">
                          <div className="flex items-center gap-2 mb-3">
                             <Globe size={10} className="text-blue-500" />
                             <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Intelligence Sources</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {msg.sources.map((s, si) => (
                               <a 
                                 key={si} 
                                 href={s.uri} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white hover:border-blue-500/30 transition-all group/src"
                               >
                                 <ExternalLink size={10} className="text-zinc-500 group-hover/src:text-blue-500" />
                                 <span className="truncate max-w-[200px]">{s.title || "External Fragment"}</span>
                               </a>
                             ))}
                          </div>
                        </div>
                      )}

                      {msg.text && (
                        <button 
                          onClick={() => { navigator.clipboard.writeText(msg.text); setCopiedIndex(i); setTimeout(() => setCopiedIndex(null), 2000); }}
                          className="absolute top-4 right-4 p-2 text-zinc-800 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                          {copiedIndex === i ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      )}
                   </div>
                </div>
              )}
            </div>
          ))}
            </>
          )}
          {!apiGuard.error && isProcessing && !isTyping && (
            <div className="flex items-center gap-4 animate-pulse">
               <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Loader2 size={14} className="text-blue-500 animate-spin" />
               </div>
               <span className="text-xs font-black text-zinc-700 uppercase tracking-[0.5em]">Grounded_Search_Active...</span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-10 shrink-0 relative flex justify-center bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent">
          <div className="w-full max-w-4xl space-y-4 md:space-y-6">
            <div className="flex gap-2 justify-center flex-wrap">
              {VIGIL_LEXICON.map(term => (
                <button 
                  key={term}
                  onClick={() => setInput(term)}
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-950/50 border border-white/5 rounded-full text-xs font-black text-zinc-500 uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-900/50 transition-all active:scale-95"
                >
                  {term}
                </button>
              ))}
              <button onClick={handleExport} className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-950/80 border border-zinc-900 rounded-full text-xs font-black text-zinc-700 uppercase tracking-widest hover:text-white flex items-center gap-2">
                 <Download size={10} /> .LOG
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 rounded-full blur-[10px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-zinc-950/80 backdrop-blur-3xl border-2 border-white/10 rounded-full p-1.5 md:p-2 group transition-all focus-within:border-cyan-500/5 shadow-2xl shadow-blue-500/5">
                <div className="pl-4 md:pl-6 text-zinc-500">
                  <Terminal size={16} />
                </div>
                <input 
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="CONSULT_GROUNDED_MESH..."
                  className="flex-1 bg-transparent py-3 md:py-4 px-3 md:px-6 text-sm md:text-base font-black italic uppercase tracking-tighter text-white placeholder:text-zinc-800 focus:outline-none"
                />
                <div className="flex items-center gap-2 pr-2 md:pr-4">
                  <div className="hidden sm:block">
                    <NeuralWaveform isActive={isProcessing} />
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={toggleListening}
                    className={`p-3 md:p-3.5 rounded-full transition-all active:scale-90 ${isListening ? 'bg-cyan-600 text-white animate-pulse shadow-[0_0_15px_#22d3ee]' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                  >
                    {isListening ? <Mic className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <MicOff className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  </button>

                  {isProcessing ? (
                    <button type="button" onClick={() => abortControllerRef.current?.abort()} className="p-3 md:p-3.5 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all"><Square size={14} fill="currentColor" /></button>
                  ) : (
                    <button type="submit" disabled={!input.trim() || !apiGuard.isValid} className="p-3 md:p-3.5 bg-white text-black rounded-full hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-20 active:scale-90"><Send size={14} /></button>
                  )}
                </div>
              </div>
            </form>
            <p className="text-center text-[7px] md:text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em] italic">Protocol: /ground [intel] // /sync [mesh]</p>
          </div>
        </div>
      </div>

      <style>{`
        .mask-fade-edges {
          mask-image: linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%);
        }
      `}</style>
    </div>
  );
};
