
import React from 'react';
import { Target, History, Zap, CheckCircle2 } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

export interface TacticalGif {
  id: string;
  theme: string;
  script: string;
  visualPrompt: string;
  metadata: {
    type: string;
    loop: string;
    status: 'PENDING' | 'GENERATED';
  };
}

export interface ChronicleVideo {
  day: number;
  era: string;
  theme: string;
  script: string;
  visualPrompt: string | string[];
  metadata: {
    location: string;
    riskFactor: string;
    outcome: string;
  };
}

export const GIF_VAULT: TacticalGif[] = [
  {
    id: 'GIF_SUBFRAME_LIGHT',
    theme: 'SUB-FRAME EXECUTION TRACE (LIGHT SYSTEM MODE)',
    script: 'Forensic computation trace. Inspecting and halting a malicious action within a fraction of a system refresh cycle. Real-time deterministic inspection.',
    visualPrompt: `⸻
MASTER GIF PROMPT
VIGIL // SUB-FRAME EXECUTION TRACE (LIGHT SYSTEM MODE)
⸻
CORE DIRECTIVE: Create a high-fidelity, ultra-precise, short-loop GIF that visualizes VIGIL performing a sub-frame execution analysis — inspecting and halting a malicious action within a fraction of a system refresh cycle.

AESTHETIC & ENVIRONMENT:
- Bright, realistic system background: Frosted system gray (#f1f5f9), interface silver (#e5e7eb), or computational blue (#eef2ff).
- Surgical, neutral, functional lighting. No glow, no bloom, no neon.

COMPOSITION:
1. THE EXECUTION PAYLOAD: Alphanumeric string in modern monospace.
2. THE SUB-FRAME SCAN: Razor-thin horizontal plane. Pass revealing structured fault artifacts on corrupted segments.
3. THE TIMING TRACE: Precise timer counting 00.00 ms → XX.XX ms.
4. THE INTERCEPT: Status text appears: EXECUTION_PAUSED // DIVERGENCE_CONFIRMED // LAYER_0.5_ACTIVE.
5. BRAND ANCHOR: Small, static "VIGIL" in corner.

MOTION: No bounce, no shake. Clocked, stepped, deterministic.`,
    metadata: { type: "Execution Trace", loop: "Sub-Frame Sync", status: "PENDING" }
  },
  {
    id: 'GIF_MASTER_MULTIMODAL',
    theme: 'MASTER MULTIMODAL PROMPT (SCAN SYSTEM)',
    script: 'VIGIL behavioral system output. Visual motion and sonic behavior locked in sync. Not branding—this is machine cognition.',
    visualPrompt: `🔒 MASTER MULTIMODAL PROMPT
VIGIL // HUMAN-LAYER SCAN SYSTEM (VIDEO + AUDIO)

CORE DIRECTIVE: Create a high-fidelity, system-grade scanning visualization with synchronized diagnostic audio for a security platform named VIGIL. 

VISUAL SYSTEM:
- Deep charcoal background (#020202 – #050505)
- Geometry subtly forms V or VL shapes
- Measured, diagnostic, inevitable motion
- Intent Blue #3b82f6, Vigil Cyan #22d3ee, Anomaly Amber #f59e0b, Threat Red #ef4444

AUDIO SYSTEM:
- Machine cognition pulses
- Non-musical, precise tonal pulses
- Clean attack, short decay
- Dry, cold, neutral texture

SYNC: Audio pulses align with scan motion. No dramatic ending. Seamless loop.`,
    metadata: { type: "Multimodal Core", loop: "System Scan", status: "PENDING" }
  },
  {
    id: 'GIF_HEURISTIC_PULSE',
    theme: 'HEURISTIC PULSE (12ms CYCLE)',
    script: 'Sub-frame verification is the VIGIL standard. We analyze the DOM in 12ms—intercepting the threat before your retina can even process the frame.',
    visualPrompt: "High-fidelity 3D technical animation (Cycles render). Absolute charcoal #050505 background. A macro isometric view of a single pixel-perfect character string floating in space. A series of rapid-fire volumetric laser-light sheets (Cyan #22d3ee) sweep vertically at extreme speed. Each sweep reveals a layer of technical micro-telemetry data floating in front of the characters. A countdown timer in the top right corner rapidly ticks from 16.6ms down to 12.0ms. At 12.0ms, the entire scene freezes, a sharp emerald 'VALIDATED' stamp appearing in the air. 1px line weights, shallow depth of field, cinematic 35mm grain. 16:9 aspect ratio.",
    metadata: { type: "Speed Benchmarking", loop: "Pulse Cycle", status: "GENERATED" }
  },
  {
    id: 'GIF_GENETIC_TRACE',
    theme: 'GENETIC TRACE (PROJECT DNA)',
    script: 'Don\'t trust the contract; trust the lineage. VIGIL traces every token back to its funding genesis—identifying the Mother Wallet before you click buy.',
    visualPrompt: "Cinematic 3D forensic visualization. Dark void background. A central high-refractive glass node labeled 'MOTHER_WALLET' glows with a dim inner white light. From this node, hundreds of glowing cyan fiber-optic threads branch out like neural pathways, connecting to smaller hexagonal nodes representing child-wallets. The camera follows one thread at high speed. As it reaches a final node, a red 'ADVERSARY_DETECTED' HUD overlay flickers. The connections represent transactional DNA. Macro lens, high-contrast lighting, technical UI overlays. 16:9 aspect ratio.",
    metadata: { type: "Provenance Mapping", loop: "Neural Branching", status: "GENERATED" }
  },
  {
    id: 'GIF_ENTROPY_SIPHON',
    theme: 'ENTROPY SIPHON (VANITY ATTACK)',
    script: 'Attackers exploit the 8-character blind spot. While you check the edges, they siphon the middle. VIGIL watches the entropy you can\'t see.',
    visualPrompt: "Macro 3D text animation. A 44-character Solana address is centered in the frame. The first 4 and last 4 characters are made of solid, unmoving white marble. The middle 36 characters are represented by liquid digital ink that violently swirls and transforms every 0.5 seconds, shifting between randomized red symbols. A cyan 1px scan-reticle is locked onto the center, highlighting the 'Collision Risk'. The marble edges remain perfectly stable, illustrating the deception. Global illumination from the glowing red ink. 16:9 aspect ratio.",
    metadata: { type: "Heuristic Visualization", loop: "Morphing Core", status: "GENERATED" }
  },
  {
    id: 'GIF_NEURAL_LOCK',
    theme: 'NEURAL LOCK (MOBILE HUD)',
    script: 'The keyboard is the final perimeter. VIGIL Mobile implements biometric friction for high-risk overrides. Your fingerprint is the ultimate signature.',
    visualPrompt: "Close-up 3D render of a futuristic smartphone screen floating in a dark environment. The screen shows a 'Keyboard Hard-Lock' state with a heavy red pulsing 'THREAT_INTERCEPTED' banner. A translucent blue 3D holographic FaceID mesh (geometric dots and lines) projects out from the screen towards the camera, scanning the air. As the scan completes, a large green 'NEURAL_LINK_ESTABLISHED' prompt appears, and a glass biometric icon ignites with emerald light. High-refractive materials, volumetric lighting, technical HUD elements. 16:9 aspect ratio.",
    metadata: { type: "Mobile Sovereignty", loop: "Scanning Cycle", status: "GENERATED" }
  },
  {
    id: 'GIF_STANDARD_PARITY',
    theme: 'STANDARD PARITY (LEGACY VS VIGIL)',
    script: 'Legacy security is reactive. VIGIL is structural. We move the defensive line from the wallet to the retina.',
    visualPrompt: "Split-screen 3D technical comparison. LEFT SIDE ('Legacy'): A red transaction rail shatters into hundreds of shards under a heavy 'LOSS' text stamp. RIGHT SIDE ('VIGIL'): An identical rail is shielded by a rotating, thick 3D glass notched 'V' logo. The 'V' catches cyan light and deflects a swarm of red digital particles. The 'VIGIL' side remains perfectly stable and silent. Minimalist charcoal environment, 1px vector grids, macro photography style. 16:9 aspect ratio.",
    metadata: { type: "Comparison Study", loop: "Seamless Loop", status: "GENERATED" }
  },
  {
    id: 'GIF_HUMAN_GAP',
    theme: 'SECURING THE HUMAN GAP',
    script: 'Smart contracts are audited. Wallets are secure. Yet assets are still drained—not to broken code, but to deception at the moment of decision. That gap is human. We build VIGIL to secure that gap.',
    visualPrompt: "Professional 3D technical forensic animation (Cycles style). Background: Absolute charcoal #050505. A floating horizontal data rail represents a transaction flow. On the left, a white geometric icon labeled 'INTENT'. On the right, a pulsing red icon labeled 'SIGNATURE'. In the center, a wide structural void where chaotic red digital noise flickers. Suddenly, a heavy, monolithic V-Notch logo (a bold geometric 'V' with the signature central notch) made of thick refractive glass descends into the center. The glass notched logo is rotating slowly in 3D space, catching cold blue highlights. A precise vertical cyan 1px laser scan-line sweeps from left to right across the rotating logo. As the laser passes, the red 'SIGNATURE' icon on the right transforms into a steady, glowing emerald 'SECURED' icon. High-fidelity 1px line weights, macro lens depth-of-field, sharp tactical aesthetic. 16:9 Aspect ratio.",
    metadata: { type: "3D Narrative Logic", loop: "Rotating Bridge", status: "GENERATED" }
  },
  {
    id: 'GIF_FACILITY',
    theme: 'THE REGISTRY FACILITY (10 SILOS)',
    script: 'The facility is not a website. It is an engineered environment of 10 distinct silos, each designed to calibrate the human eye for the Layer 0.5 standard.',
    visualPrompt: "High-fidelity 3D technical animation (Blender/Cycles style). Background: Absolute charcoal #050505. A 2x5 grid of 10 wireframe rectangular boxes (Silos) starts empty. One by one, in a fast sequence (0.2s intervals), each box ignites with a violent cyan pulse, revealing a sharp white tactical icon (Fingerprint, Radar, Brain, Shield, Target). Once all 10 silos are fully lit and glowing with VIGIL cyan, a horizontal 1px cyan laser scan-line sweeps perfectly from top to bottom across the whole grid. In the bottom right corner, a tiny monospace tag [REGISTRY_v1.0.1_STABLE] pulses once. Sharp 1px line weights. Zero motion blur. 16:9 Aspect ratio.",
    metadata: { type: "3D System Blueprint", loop: "Sequential Ignition", status: "GENERATED" }
  },
  {
    id: 'GIF_00',
    theme: 'RETINAL_AUTOPSY (MIMIC_INTERCEPT)',
    script: 'Don\'t block the address; block the pattern. Blacklists require a victim to exist. VIGIL identifies the structural intent of the mimic before the first signature is even generated.',
    visualPrompt: "Professional 3D Technical Render (Blender Cycles). Background: Absolute Void #050505. Camera: 80mm Macro lens, shallow depth of field, slight isometric tilt. Two floating data rails. TOP: 'LEGACY_REACTIVE'. Address '0x53e56c74808EEA832862AED571C56dF4C3C5fD9E' in etched white 'JetBrains Mono'. A red volumetric laser sheet scans it. Text displays 'DATABASE_QUERY: NO_MATCH'. 1 second later, the rail shatters into red glowing shards with a 'LOSS_DETECTED' HUD flicker. BOTTOM: 'VIGIL_PROACTIVE'. Identical address '0x53e56c74808EEA832862AED571C56dF4C3C5fD9E' appears. A cyan 1px laser sweep happens at 60fps. HUD displays 'HEURISTIC_COLLISION_88%'. A heavy black frosted-glass bar slams onto the middle 24 characters, redacting them. The transaction path is physically severed. Lighting: Global illumination from scanners only. No logos. Sharp 1px line weights. 16:9 Aspect.",
    metadata: { type: "3D Tactical GIF", loop: "A/B Comparison", status: "GENERATED" }
  }
];

export const CHRONICLES: ChronicleVideo[] = [
  {
    day: 1,
    era: "2026 // THE AWAKENING",
    theme: "The 8-Char Blind Spot",
    script: "Smart contracts are audited. Wallets are secure. Yet, millions in $USDC and $USDT are still lost every day—not to broken code, but to deception at the moment of decision. That gap is human. It lives in speed, assumptions, and the $SOL you send in a hurry. We’re building VIGIL to secure that gap—the Layer 0.5 standard between intent and signature, before a click becomes irreversible. 🦾 1/8",
    visualPrompt: [
      "A professional 4K screencast simulation of a high-end dark-mode Solana blockchain explorer–style interface. Background is absolute zinc #050505. The UI features sharp, flat vector graphics with 1px line weights and JetBrains Mono typography. A clinical white cursor moves with natural inertia over a transaction grid. The cursor highlights a long wallet address string and clicks a minimalist ‘COPY’ icon. A subtle 1px cyan border-flash confirms the action. Lighting is cold and top-down with zero bloom. 16:9 aspect ratio, 60fps movement, physically based rendering (PBR) clarity.",
      "Macro perspective transition to a dark-mode cryptocurrency wallet ‘Send’ screen. A cursor clicks the recipient input field and performs a ‘PASTE’ action. The address string appears. The first 4 and last 4 characters are sharp, high-contrast cyan, while the middle 36 characters are covered by a soft, low-contrast red digital haze that does not immediately trigger alarm, representing a biological ‘blind spot.’ The cursor moves toward a ‘Confirm’ button, pausing briefly in an unconscious hesitation typical of routine verification. Orthographic depth, high-contrast Zinc palette, zero motion blur, ultra-sharp vector edges.",
      "The wallet interface is suddenly frozen in time. A precise horizontal 1px cyan laser scan-line sweeps from the top of the frame to the bottom. As the line passes over the blurred address, the red haze vanishes instantly, leaving the entire address string perfectly sharp and legible. Total visual clarity is restored. Hard cut to an absolute black void. Centered in the frame is a heavy monolithic ‘V’ shard made of high-refractive glass. A cold cyan light source sweeps across the glass, creating sharp prismatic glints. Tiny monospace text ‘LAYER 0.5’ fades in beneath the ‘V’. Static, heavy, authoritative sensor-clean finish with subtle digital precision noise."
    ],
    metadata: { location: "The Retinal Layer", riskFactor: "Cognitive Truncation", outcome: "Intent Intercepted" }
  },
  {
    day: 30,
    era: "2026 // THE FINAL PERIMETER",
    theme: "Birth of Layer 0.5",
    script: "Log 30. December. Fifty million dollars lost to a simple poison attack. Cryptography didn't fail. The human did. That was the day I stopped being a victim and became the architect. Welcome to VIGIL. The bridge is now secure.",
    visualPrompt: "Sovereign 3D Material study. Background: #050505. A single large white 'V' made of heavy glass floats in a dark void. Cyan light refracts through the edges. Monospace text: 'LAYER 0.5 ESTABLISHED'. Absolute stillness. Heavy 35mm grain. No logos.",
    metadata: { location: "The Bridge", riskFactor: "Neutralized", outcome: "Permanent Shield" }
  }
];

export const ChronicleNarrativeLibrary: React.FC = () => {
  return (
    <div className="space-y-12 pb-32">
      <div className="flex items-center gap-4 border-b border-zinc-900 pb-8">
        <div className="w-12 h-12 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center">
           <Zap className="w-6 h-6 text-red-500" />
        </div>
        <div>
           <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Tactical Loops.</h3>
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">High-Fidelity Visual Evidence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GIF_VAULT.map((g) => (
          <div key={g.id} className={`p-8 bg-zinc-950 border rounded-[2.5rem] space-y-6 transition-all group ${g.metadata.status === 'GENERATED' ? 'border-emerald-500/30' : 'border-zinc-900 hover:border-red-500/30'}`}>
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <div className={`text-[10px] font-black uppercase tracking-widest italic ${g.metadata.status === 'GENERATED' ? 'text-emerald-500' : 'text-red-500'}`}>PRESET: {g.id}</div>
                     {g.metadata.status === 'GENERATED' && (
                       <CheckCircle2 size={10} className="text-emerald-500" />
                     )}
                   </div>
                   <h4 className="text-xl font-black text-white uppercase italic">{g.theme}</h4>
                </div>
                <TechLabel text={g.metadata.status === 'GENERATED' ? 'PROD_READY' : g.metadata.type} color={g.metadata.status === 'GENERATED' ? 'emerald' : 'red'} />
             </div>
             
             <div className="p-6 bg-black border border-zinc-900 rounded-2xl">
                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase tracking-tight">
                  <span className={g.metadata.status === 'GENERATED' ? 'text-emerald-600 mr-2' : 'text-red-600 mr-2'}>[X_COPY]:</span>
                  "{g.script}"
                </p>
             </div>

             <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                   <Target size={12} /> Render Directive (Veo 3.1)
                </div>
                <div className={`text-[10px] italic leading-relaxed bg-black/40 p-4 rounded-xl border ${g.metadata.status === 'GENERATED' ? 'border-emerald-900/40 text-zinc-400' : 'border-zinc-900 text-zinc-500'}`}>
                  {g.visualPrompt.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-b border-zinc-900 pb-8 pt-20">
        <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
           <History className="w-6 h-6 text-blue-500" />
        </div>
        <div>
           <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Chronicle Repository.</h3>
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">30 Days of Sovereignty // Act I: Genesis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHRONICLES.map((v) => (
          <div key={v.day} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6 hover:border-blue-500/30 transition-all group">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest italic">Day {v.day < 10 ? `0${v.day}` : v.day}</div>
                   <h4 className="text-xl font-black text-white uppercase italic">{v.theme}</h4>
                </div>
                <TechLabel text={v.era} color="blue" />
             </div>
             
             <div className="p-6 bg-black border border-zinc-900 rounded-2xl">
                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase tracking-tight">
                  <span className="text-blue-600 mr-2">[TTS_SCRIPT]:</span>
                  "{v.script}"
                </p>
             </div>

             <div className="space-y-3">
                <div className="flex items-center justify-between text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                     <Target size={12} /> Visual Directive (Veo 3.1)
                   </div>
                   {Array.isArray(v.visualPrompt) && (
                     <span className="text-blue-500">Multi-Prompt Sequence ({v.visualPrompt.length})</span>
                   )}
                </div>
                <div className="space-y-2">
                  {Array.isArray(v.visualPrompt) ? (
                    v.visualPrompt.map((p, i) => (
                      <div key={i} className="p-4 bg-black/40 rounded-xl border border-zinc-900 flex gap-4">
                         <span className="text-[10px] font-black text-blue-500 opacity-40 shrink-0">#{i+1}</span>
                         <p className="text-[10px] text-zinc-500 italic leading-relaxed">{p}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-zinc-500 italic leading-relaxed bg-black/40 p-4 rounded-xl border border-zinc-900">
                      {v.visualPrompt}
                    </p>
                  )}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
