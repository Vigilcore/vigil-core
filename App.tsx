import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Binary, Target, ShieldX, Activity, Database, BarChart3, Globe, Trophy, Info, Zap, Radio, Smartphone, Monitor, Brain, Cpu, Layers, Sparkles, ShieldAlert, ShieldCheck, ZapOff, Clock, ArrowRight, ArrowLeft, ArrowDownRight, Compass, Wifi, LayoutGrid, List, Wallet, ChevronRight, LogOut, Medal, X, FileText, RotateCcw } from 'lucide-react';
import { Header } from './components/Header';
import { SecurityAnnouncementBar } from './components/SecurityAnnouncementBar';
import { SecurityModal } from './components/SecurityModal';
import { IdentitySelectionModal } from './components/IdentitySelectionModal';
import { RevokeSessionModal } from './components/RevokeSessionModal';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Problem } from './components/Problem';
import { Features } from './components/Features';
import { ScamStats } from './components/ScamStats';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { OperationalRegistry, RegistryDoc } from './components/OperationalRegistry';
import { ThreatResearch } from './components/ThreatResearch';
import { IntentValidatorDemo } from './components/IntentValidatorDemo';
import { AdversarialMimicryLab } from './components/AdversarialMimicryLab';
import { IntelligenceForge } from './components/IntelligenceForge';
import { ContextualReputationSearch } from './components/ContextualReputationSearch';
import { PathBriefing } from './components/PathBriefing';
import { SystemBoot } from './components/SystemBoot';
import { ExitProtocolOverlay, ExitType } from './components/ExitProtocolOverlay';
import { HubHeader } from './components/HubHeader';
import { SecurityZoneBackground } from './components/SecurityZoneBackground';
import { TelemetryDisplay } from './components/TelemetryDisplay';
import { ScrollProgress } from './components/ScrollProgress';
import { UsageData } from './services/geminiService';
import { SafetyVideo } from './components/SafetyVideo';
import { LATEST_INTERCEPT } from './registry/broadcast';
import { EncryptedSection } from './components/EncryptedSection';
import { FinalNotice } from './components/FinalNotice';
import { DefinitiveNonGoals } from './components/DefinitiveNonGoals';
import { MeshQueryTerminal } from './components/MeshQueryTerminal';
import { NeuralProficiencyAudit } from './components/NeuralProficiencyAudit';
import { FieldUnitHub } from './components/FieldUnitHub';
import { SiloGate } from './components/SiloGate';
import { SessionResumeOverlay } from './components/SessionResumeOverlay';
import { SiloTopology } from './components/SiloTopology';
import { MissionBriefing } from './components/MissionBriefing';
import { VideoProductionStudio } from './components/VideoProductionStudio';
import { ChronicleNarrativeLibrary } from './components/ChronicleNarrativeLibrary';
import { SocialIntelligenceLab } from './components/SocialIntelligenceLab';
import { FlagshipHeaderArchitect } from './components/FlagshipHeaderArchitect';
import { NarrativeGlitchForge } from './components/NarrativeGlitchForge';
import { CommunityChallenge } from './components/CommunityChallenge';
import { calculateScoring } from './utils/scoring';
import { NeuralFirewall } from './components/NeuralFirewall';
import { NeuralAttentionalAudit } from './components/NeuralAttentionalAudit';
import { SentinelControlDeck } from './components/SentinelControlDeck';
import { EntropyCollider } from './components/EntropyCollider';
import { TacticalAtrium } from './components/TacticalAtrium';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { SovereignAssetVault } from './components/SovereignAssetVault';
import { TechLabel } from './components/docs/DocHelpers';
import { CalibrationJourneySection } from './components/CalibrationJourneySection';
import { MeshKernelBridgeSection } from './components/MeshKernelBridgeSection';
import { GraduationSection } from './components/GraduationSection';
import { AdminToolsSection } from './components/AdminToolsSection';

export type ViewMode = 'NARRATIVE' | 'TACTICAL';

const App: React.FC = () => {
  // Check for ?doc=whitepaper in URL to skip boot sequence
  const hasWhitepaperParam = typeof window !== 'undefined' && 
    new URLSearchParams(window.location.search).get('doc')?.toLowerCase() === 'whitepaper';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Skip SecurityModal if whitepaper param is present (allow direct access)
  const [isModalOpen, setIsModalOpen] = useState(() => {
    if (hasWhitepaperParam) return false; // Skip boot for whitepaper
    return !localStorage.getItem('vigil_node_acknowledged');
  });
  const [isIdentitySelectionOpen, setIsIdentitySelectionOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  // Allow whitepaper to show even if not acknowledged
  const [hasAcknowledged, setHasAcknowledged] = useState(() => {
    if (hasWhitepaperParam) return true; // Allow whitepaper to show
    return !!localStorage.getItem('vigil_node_acknowledged');
  });
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('vigil_user_is_guest') === 'true');
  const [activeDoc, setActiveDoc] = useState<RegistryDoc>(null);
  const [activeAnchor, setActiveAnchor] = useState<string>('silo-1');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isPowerSave, setIsPowerSave] = useState(() => localStorage.getItem('vigil_user_pwr_save') === 'true');
  const [activeExit, setActiveExit] = useState<ExitType>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('vigil_master_auth') === 'true');
  const [showTutorial, setShowTutorial] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => localStorage.getItem('vigil_onboarding_completed') === 'true');
  
  // Standalone Mode Detection & Virtual Portal state
  const [isStandalone, setIsStandalone] = useState(() => {
    return new URLSearchParams(window.location.search).get('mode') === 'standalone_kernel';
  });
  const [isInternalKernelOpen, setIsInternalKernelOpen] = useState(false);

  // Interface Parity States
  const [viewMode, setViewMode] = useState<ViewMode>(() => 
    (localStorage.getItem('vigil_view_mode') as ViewMode) || 'NARRATIVE'
  );
  const [activeSpoke, setActiveSpoke] = useState<number | null>(null);
  
  // Session-only tracking for VALIDATOR typing completion (persists across view switches)
  const [validatorTypingCompleted, setValidatorTypingCompleted] = useState(false);
  
  const [wallet, setWallet] = useState(() => localStorage.getItem('vigil_user_wallet') || '');
  const [bri, setBri] = useState(() => Number(localStorage.getItem('vigil_node_bri')) || 0);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('vigil_user_xp')) || 0);
  
  const [unlockLevel, setUnlockLevel] = useState(() => Number(localStorage.getItem('vigil_node_level')) || 1);
  const [rank, setRank] = useState(() => localStorage.getItem('vigil_node_rank') || 'RECRUIT');

  const [lastUsage, setLastUsage] = useState<UsageData | null>(null);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [isTelemetryVisible, setIsTelemetryVisible] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetScrollTopRef = useRef<number>(0);
  const currentScrollTopRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  
  // Check if user has already dismissed the resume prompt
  const hasTriggeredPromptRef = useRef<boolean>(
    localStorage.getItem('vigil_resume_prompt_dismissed') === 'true'
  );
  const initialLevelOnMount = useRef<number>(Number(localStorage.getItem('vigil_node_level')) || 1);

  const [historyCount, setHistoryCount] = useState(() => {
    const saved = localStorage.getItem('vigil_claims_v3');
    return saved ? JSON.parse(saved).length : 0;
  });

  useEffect(() => {
    localStorage.setItem('vigil_view_mode', viewMode);
    // Reset scroll to top when switching to TACTICAL view
    if (viewMode === 'TACTICAL' && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      currentScrollTopRef.current = 0;
      targetScrollTopRef.current = 0;
    }
  }, [viewMode]);

  useEffect(() => {
    if (hasAcknowledged) {
      localStorage.setItem('vigil_node_acknowledged', 'true');
      localStorage.setItem('vigil_node_bri', bri.toString());
      localStorage.setItem('vigil_node_level', unlockLevel.toString());
      localStorage.setItem('vigil_node_rank', rank);
      localStorage.setItem('vigil_user_wallet', wallet);
      localStorage.setItem('vigil_user_xp', xp.toString());
      localStorage.setItem('vigil_user_is_guest', isGuest.toString());
    }
  }, [bri, unlockLevel, rank, hasAcknowledged, wallet, xp, isGuest]);

  // Refined Telemetry Visibility Logic
  useEffect(() => {
    if (isAiScanning) {
      setIsTelemetryVisible(true);
    } else if (lastUsage) {
      // Keep visible for a few seconds then hide
      const timer = setTimeout(() => {
        setIsTelemetryVisible(false);
        // Clear usage after hiding to prevent stale data on next open
        setLastUsage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isAiScanning, lastUsage]);

  useEffect(() => {
    // Only show resume prompt if:
    // 1. User has acknowledged
    // 2. User has unlocked level > 1
    // 3. User hasn't dismissed the prompt before (check localStorage directly)
    const hasDismissedPrompt = localStorage.getItem('vigil_resume_prompt_dismissed') === 'true';
    if (hasAcknowledged && initialLevelOnMount.current > 1 && !hasDismissedPrompt) {
      // Only trigger if we haven't already shown it in this session
      if (!hasTriggeredPromptRef.current) {
        const timer = setTimeout(() => {
          setShowResumePrompt(true);
          hasTriggeredPromptRef.current = true;
        }, 3200);
        return () => clearTimeout(timer);
      }
    } else {
      // If dismissed, make sure it stays hidden
      setShowResumePrompt(false);
    }
  }, [hasAcknowledged]);

  useEffect(() => {
    if (!hasAcknowledged || viewMode === 'TACTICAL' || isStandalone) return;

    const options = {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isProgrammaticScrollRef.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveAnchor(entry.target.id);
        }
      });
    }, options);

    const targetIds = [
      'silo-1', 'about-us', 'the-threat', 'ecosystem-impact',
      'flow', 'features', 'deep-dive', 
      'calibration-journey', 'hub-execution', 'intent-validator-demo', 'mimicry-lab-demo', 
      'hub-synthesis', 'intel-forge-demo', 'reputation-search', 'sentinel-deck-demo', 
      'hub-biological', 'neural-firewall-demo', 'neural-audit-demo',
      'hub-apex', 'entropy-collider-demo', 'field-unit-demo',
      'non-goals', 'roadmap', 'faq',
      'final-proficiency-audit', 'silo-9', 'prod-studio', 'chronicle-repo', 
      'brand-architect', 'comms-terminal', 'active-challenge', 'daily-distraction',
      'silo-10'
    ];

    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasAcknowledged, unlockLevel, isAdmin, viewMode, isStandalone]);

  // Open whitepaper immediately from GitHub link (skip boot sequence)
  // Whitepaper doesn't depend on app state, so it's safe to show before boot
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const docParam = params.get('doc');
    
    // Only handle whitepaper for now (as per user request)
    if (docParam?.toLowerCase() === 'whitepaper') {
      // Open whitepaper immediately (before boot sequence)
      setActiveDoc('whitepaper');
      
      // Clean up URL (remove ?doc=whitepaper from address bar)
      const newUrl = window.location.pathname + (window.location.hash || '');
      window.history.replaceState({}, '', newUrl);
    }
  }, []); // Run once on mount - footer button clicks work independently

  useEffect(() => {
    const smoothScrollLoop = () => {
      if (!scrollContainerRef.current || viewMode === 'TACTICAL' || isStandalone) return;
      const diff = targetScrollTopRef.current - currentScrollTopRef.current;
      
      if (Math.abs(diff) < 1) {
        currentScrollTopRef.current = targetScrollTopRef.current;
        isProgrammaticScrollRef.current = false;
      } else {
        currentScrollTopRef.current += diff * 0.12; 
      }
      
      scrollContainerRef.current.scrollTop = currentScrollTopRef.current;
      animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    };
    animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [viewMode, isStandalone]);

  useEffect(() => {
    if (showTutorial) {
      setViewMode('NARRATIVE');
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
        currentScrollTopRef.current = 0;
        targetScrollTopRef.current = 0;
      }
    }
  }, [showTutorial]);

  const handleScroll = () => {
    if (scrollContainerRef.current && viewMode === 'NARRATIVE') {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (!isProgrammaticScrollRef.current) {
        currentScrollTopRef.current = scrollTop;
        targetScrollTopRef.current = scrollTop;
      }
      const totalScrollable = scrollHeight - clientHeight;
      const percentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollPercentage(percentage);
    }
  };

  const scrollToPercentage = (percent: number) => {
    if (scrollContainerRef.current && viewMode === 'NARRATIVE') {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = (percent / 100) * (scrollHeight - clientHeight);
    }
  };

  const scrollToSection = (id: string) => {
    if (viewMode === 'TACTICAL') {
      const siloId = id.startsWith('silo-') ? parseInt(id.replace('silo-', '')) : null;
      if (siloId) {
        setActiveSpoke(siloId);
      }
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const absoluteTarget = container.scrollTop + (rect.top - containerRect.top);
      
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = absoluteTarget - 20;
      setActiveAnchor(id);
      setIsMenuOpen(false);
    }
  };

  const handleScoring = (isSuccess: boolean, level: number) => {
    if (isGuest) return; 

    const { briDelta, xpGained } = calculateScoring(isSuccess, level);
    
    setBri(prev => {
      const next = Math.max(0, Math.min(100, prev + briDelta));
      if (next >= 90) setRank('SENTINEL');
      else if (next >= 60) setRank('GUARDIAN');
      else setRank('RECRUIT');
      return next;
    });

    setXp(prev => prev + xpGained);

    // Sync history count if updated elsewhere
    const saved = localStorage.getItem('vigil_claims_v3');
    if (saved) setHistoryCount(JSON.parse(saved).length);
  };

  const handleCalibrationComplete = (points: number) => {
    setIsBooting(false);
    setHasAcknowledged(true);
    if (isGuest) {
      setUnlockLevel(10);
      setRank('VISITOR');
    } else {
      handleScoring(points > 0, 1);
    }
    
    // Trigger Onboarding Tutorial if first time
    if (!localStorage.getItem('vigil_onboarding_completed')) {
      setShowTutorial(true);
    }
  };

  const handleDisconnect = () => {
    setIsRevokeModalOpen(true);
  };

  const confirmDisconnect = () => {
    setWallet('');
    setIsGuest(false);
    localStorage.removeItem('vigil_user_wallet');
    localStorage.removeItem('vigil_user_is_guest');
    setIsRevokeModalOpen(false);
  };

  const ambientStatus = `STATUS: [LOCAL_NODE_OPERATIONAL] // v 0.0.0.1 // BRI: ${bri}% // RANK: ${rank}${isAdmin ? ' // MASTER_AUTH: OK' : ''}`;

  const incrementUnlockLevel = (target?: number) => {
    if (isGuest) return; 
    const nextLevel = target || Math.min(10, unlockLevel + 1);
    setUnlockLevel(nextLevel);
    handleScoring(true, nextLevel);
    
    if (viewMode === 'NARRATIVE') {
      setTimeout(() => {
        scrollToSection(`silo-${nextLevel}`);
      }, 1000);
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (code === 'VG-8821') { incrementUnlockLevel(2); return true; }
    if (code === 'VG-3305') { incrementUnlockLevel(3); return true; }
    if (code === 'VG-4991') { incrementUnlockLevel(4); return true; }
    if (code === 'VG-5220') { incrementUnlockLevel(5); return true; }
    if (code === 'VG-6101') { incrementUnlockLevel(6); return true; }
    if (code === 'VG-7742') { incrementUnlockLevel(7); return true; }
    if (code === 'VG-8008') { incrementUnlockLevel(8); return true; }
    
    if (code === 'VG-YASHMAL-6202') {
      setIsAdmin(true);
      localStorage.setItem('vigil_master_auth', 'true');
      return true;
    }
    return false;
  };

  const deployMeshKernel = () => {
    setIsInternalKernelOpen(true);
  };

  const renderSiloContent = (level: number) => {
    switch (level) {
      case 1:
        return (
          <div className="animate-in fade-in zoom-in duration-500">
            <div id="silo-1">
              <Hero 
                scrollToSection={scrollToSection} 
                onOpenDoc={(doc) => setActiveDoc(doc)} 
                powerSave={isPowerSave} 
                isReady={hasAcknowledged && (onboardingCompleted || !showTutorial)}
                onUnlockNext={() => incrementUnlockLevel(2)}
                unlockLevel={unlockLevel}
                onFail={() => handleScoring(false, 1)}
                onOpenMap={() => setIsTopologyOpen(true)}
                onOpenBriefing={() => setIsBriefingOpen(true)}
                isAdmin={isAdmin}
                onConnectWallet={() => setIsIdentitySelectionOpen(true)}
                wallet={wallet}
                isGuest={isGuest}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="about-us"><About /></div>
            <div id="the-threat"><Problem onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div><ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="ecosystem-impact"><ScamStats /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={3} onUnlock={() => incrementUnlockLevel(3)} onFail={() => handleScoring(false, 2)} />
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="flow"><HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="features"><Features onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="deep-dive"><SafetyVideo onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={4} onUnlock={() => incrementUnlockLevel(4)} onFail={() => handleScoring(false, 3)} />
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <CalibrationJourneySection />

            <div id="hub-execution">
              <HubHeader 
                number="01" 
                title="Execution Sandbox." 
                subtitle="Interception Proof-of-Work" 
                description="A safe zone to test and confirm where your funds are really going before you sign any transaction."
              />
              <div id="intent-validator-demo">
                <PathBriefing pathNumber="01" title="Intent Validator" objective="Context-aware verification." threatVector="DOM address swaps." rationale="Validating belief vs execution." colorClass="text-blue-500" />
                <IntentValidatorDemo onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} />
              </div>
              <div id="mimicry-lab-demo">
                <PathBriefing pathNumber="02" title="Adversarial Mimicry" objective="Test visual thresholds." threatVector="Vanity collisions." rationale="Experience visual failure." colorClass="text-red-500" />
                <AdversarialMimicryLab onGameComplete={() => handleScoring(true, 4)} />
              </div>
            </div>
            <div id="hub-synthesis">
              <HubHeader 
                number="02" 
                title="Synthesis Node." 
                subtitle="Synchronized Intelligence Mapping" 
                description="An intelligence bridge that syncs your local history with global threat data to detect hidden traps."
              />
              <div id="intel-forge-demo">
                <PathBriefing pathNumber="03" title="Intelligence Forge" objective="Global threat mapping." threatVector="Real-time cluster monitoring." rationale="Predictive intelligence for retail protection." colorClass="text-cyan-500" />
                <IntelligenceForge onOpenDoc={(doc) => setActiveDoc(doc)} powerSave={isPowerSave} />
              </div>
              <div id="reputation-search">
                <PathBriefing pathNumber="04" title="Reputation Synthesis" objective="Identity verification." threatVector="Address behavior profiling." rationale="Establishing trust via 1.2M+ global Sentinel nodes." colorClass="text-blue-400" />
                <ContextualReputationSearch />
              </div>
              <div id="sentinel-deck-demo">
                <PathBriefing pathNumber="05" title="Sentinel Deck" objective="Active intercept simulator." threatVector="Asset impersonation. Using look-alike tokens to deceive the human eye." rationale="Direct defensive calibration." colorClass="text-purple-500" />
                <SentinelControlDeck />
              </div>
            </div>
            <div id="hub-biological">
              <HubHeader 
                number="03" 
                title="Biological Calibration." 
                subtitle="Calibrating for High-Entropy" 
                description="A facility for training your eyes to spot the tiny address changes that most people miss."
              />
              <div id="neural-firewall-demo">
                <PathBriefing pathNumber="06" title="Neural Firewall" objective="Train saccadic movement." threatVector="Saccadic masking gaps." rationale="Training the eye to scan for entropy." colorClass="text-purple-500" />
                <NeuralFirewall />
              </div>
              <div id="neural-audit-demo">
                <PathBriefing pathNumber="07" title="Saccadic Audit" objective="Map blind spots." threatVector="Cognitive fatigue." rationale="Mapping biological vulnerability." colorClass="text-cyan-500" />
                <NeuralAttentionalAudit />
              </div>
            </div>
            <div id="hub-apex">
              <HubHeader 
                number="04" 
                title="The Apex Terminal." 
                subtitle="High-Velocity Simulation" 
                description="A stress-test environment for testing your reflexes and vigilance under high-speed market conditions."
              />
              <div id="entropy-collider-demo">
                <PathBriefing pathNumber="08" title="Entropy Collider" objective="Stress-test environment." threatVector="Massive scale poisoning." rationale="Establishing a biological ceiling." colorClass="text-amber-500" />
                <EntropyCollider powerSave={isPowerSave} />
              </div>
            </div>
            <div id="field-unit-demo" className="py-20 border-t border-zinc-800">
              <PathBriefing pathNumber="09" title="Virtual Field Unit / Watch Tower" objective="Persistent real-time protection." threatVector="Cross-platform deception." rationale="Utilizing the full VIGIL defense matrix (Retinal Shield, Guard, Heuristics) in a live workspace." colorClass="text-emerald-500" />
              <FieldUnitHub />
            </div>
            <SiloGate currentLevel={unlockLevel} gateLevel={5} onUnlock={() => incrementUnlockLevel(5)} onFail={() => handleScoring(false, 4)} />
          </div>
        );
      case 5:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="non-goals"><DefinitiveNonGoals /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={6} onUnlock={() => incrementUnlockLevel(6)} onFail={() => handleScoring(false, 5)} />
          </div>
        );
      case 6:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="roadmap"><Roadmap /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={7} onUnlock={() => incrementUnlockLevel(7)} onFail={() => handleScoring(false, 6)} />
          </div>
        );
      case 7:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="faq"><FAQ onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={8} onUnlock={() => incrementUnlockLevel(8)} onFail={() => handleScoring(false, 7)} />
          </div>
        );
      case 8:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="final-proficiency-audit"><NeuralProficiencyAudit onCompleteExit={() => incrementUnlockLevel(9)} /></div>
          </div>
        );
      case 9:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <MeshKernelBridgeSection 
              deployMeshKernel={deployMeshKernel}
              setActiveDoc={setActiveDoc}
            />
            {isAdmin && (
              <>
                <div id="prod-studio">
                  <HubHeader number="05" title="Production Studio." subtitle="High-Fidelity Narrative Forge" />
                  <div className="py-12"><VideoProductionStudio /></div>
                </div>
                <div id="chronicle-repo">
                  <HubHeader number="06" title="Narrative Archive." subtitle="30 Days of Sovereignty Logs" />
                  <div className="py-12 px-6 md:px-20"><ChronicleNarrativeLibrary /></div>
                </div>
              </>
            )}
            <SiloGate currentLevel={unlockLevel} gateLevel={10} onUnlock={() => incrementUnlockLevel(10)} onFail={() => handleScoring(false, 9)} />
          </div>
        );
      case 10:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {isAdmin ? (
              <AdminToolsSection scrollToSection={scrollToSection} />
            ) : (
              <GraduationSection 
                bri={bri}
                xp={xp}
                setActiveDoc={setActiveDoc}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const isRealWallet = !!wallet && !isGuest && !wallet.includes("SIM_NODE") && !wallet.includes("VISITOR_NODE");

  if (isStandalone) {
    return (
      <div className="h-screen w-screen bg-[#020202] text-[#fafafa] flex flex-col overflow-hidden">
        <div className="crt-overlay" />
        <main className="flex-1 overflow-hidden bg-black relative flex flex-col">
          <MeshQueryTerminal 
            isStandalone={true}
            onUsageUpdate={(usage) => setLastUsage(usage)} 
            onScanningChange={(scanning) => setIsAiScanning(scanning)} 
          />
        </main>
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen bg-[#020202] text-[#fafafa] selection:bg-blue-600/40 selection:text-white font-sans flex flex-col pt-10 overflow-hidden ${isPowerSave ? 'pwr-save' : ''}`}>
      
      {viewMode === 'TACTICAL' && <div className="crt-overlay" />}
      <SecurityZoneBackground activeAnchor={activeAnchor} powerSave={isPowerSave} />
      <SecurityAnnouncementBar onNeutralize={() => handleScoring(true, unlockLevel)} />
      
      <SecurityModal isOpen={isModalOpen} onClose={(walletAddr, isGuestUser) => {
        setWallet(walletAddr);
        setIsGuest(!!isGuestUser);
        setIsModalOpen(false);
        setIsBooting(true);
      }} />

      <IdentitySelectionModal 
        isOpen={isIdentitySelectionOpen} 
        onClose={() => setIsIdentitySelectionOpen(false)}
        onConnect={(walletAddr) => {
          setWallet(walletAddr);
          setIsGuest(false);
          setIsIdentitySelectionOpen(false);
        }}
      />

      <RevokeSessionModal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        onConfirm={confirmDisconnect}
      />

      {isBooting && (
        <SystemBoot onComplete={handleCalibrationComplete} skipGame={isGuest} isGuest={isGuest} />
      )}

      {showResumePrompt && (
        <SessionResumeOverlay 
          level={unlockLevel} 
          onJump={() => {
            setShowResumePrompt(false);
            // Save dismissal state to localStorage so it doesn't show again
            localStorage.setItem('vigil_resume_prompt_dismissed', 'true');
            scrollToSection(`silo-${unlockLevel}`);
          }} 
          onStay={() => {
            setShowResumePrompt(false);
            // Save dismissal state to localStorage so it doesn't show again
            localStorage.setItem('vigil_resume_prompt_dismissed', 'true');
            scrollToSection('silo-1');
          }} 
        />
      )}

      {showTutorial && (
        <OnboardingTutorial onComplete={() => {
          setShowTutorial(false);
          setOnboardingCompleted(true);
          localStorage.setItem('vigil_onboarding_completed', 'true');
        }} />
      )}

      <SiloTopology isOpen={isTopologyOpen} onClose={() => setIsTopologyOpen(false)} currentLevel={unlockLevel} />
      <MissionBriefing isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />

      {hasAcknowledged && (
        <>
          <TelemetryDisplay data={lastUsage} isScanning={isAiScanning} isVisible={isTelemetryVisible} />
          
          <div className="fixed top-12 right-12 z-[150] hidden md:flex items-center gap-6 animate-in fade-in duration-1000">
             <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
               <button 
                onClick={() => { setViewMode('NARRATIVE'); setActiveSpoke(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'NARRATIVE' ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 <List size={10} /> Narrative
               </button>
               <button 
                onClick={() => setViewMode('TACTICAL')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'TACTICAL' ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 <LayoutGrid size={10} /> Tactical
               </button>
             </div>

             <div className="h-10 w-[1px] bg-zinc-800" />

             <div className="flex flex-col items-end group/id">
                <div className="flex items-center gap-2 relative">
                   <button 
                     onClick={isRealWallet ? handleDisconnect : () => setIsIdentitySelectionOpen(true)}
                     className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 group ${isRealWallet ? 'bg-zinc-950 border border-zinc-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                   >
                     {wallet && wallet !== "VISITOR_NODE_UNSYNCED" ? (
                       <>
                         <div className={`w-1.5 h-1.5 rounded-full ${isRealWallet ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-blue-400'}`} />
                         <span className="font-mono">{wallet.slice(0, 4)}...{wallet.slice(-4)}</span>
                         <div className="w-[1px] h-3 bg-zinc-800 mx-1 group-hover:bg-zinc-600 transition-colors" />
                         <LogOut size={10} className="text-zinc-500 group-hover:text-red-500 transition-colors" />
                       </>
                     ) : (
                       <>
                         <Wallet size={12} className="group-hover:scale-110 transition-transform" /> 
                         CONNECT_IDENTITY
                       </>
                     )}
                   </button>
                   {isRealWallet && (
                     <div className="absolute top-full mt-2 right-0 opacity-0 group-hover/id:opacity-100 transition-opacity pointer-events-none z-[200]">
                       <div className="bg-[#0a0a0a] border border-zinc-800 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,1)] flex flex-col gap-2 min-w-[320px]">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                             <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Full_Identity_Node</span>
                             <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                          </div>
                          <p className="font-mono text-[10px] text-cyan-400 break-all leading-relaxed select-all">
                             {wallet}
                          </p>
                       </div>
                     </div>
                   )}
                </div>
                {wallet && (
                  <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1 mr-1">
                    {isRealWallet ? 'SECURE_NODE_SYNCED' : 'VISITOR_UNSYNCED'}
                  </span>
                )}
             </div>
             <div className="h-10 w-[1px] bg-zinc-800" />
             <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl">
                <Wifi size={14} className="text-blue-500" />
                <div className="space-y-0.5">
                   <div className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Relay</div>
                   <div className="text-[9px] font-black text-white uppercase italic">STABLE</div>
                </div>
             </div>
          </div>

          {!isMenuOpen && (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="fixed top-0 left-0 h-10 w-12 z-[150] md:hidden bg-zinc-950 border-r border-b border-zinc-800 rounded-br-[8px] text-white active:scale-95 flex items-center justify-center"
            >
              <Menu size={18} className="text-zinc-400" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
            </button>
          )}
        </>
      )}

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden relative transition-opacity duration-[1500ms] ${hasAcknowledged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          activeAnchor={viewMode === 'TACTICAL' ? (activeSpoke ? `silo-${activeSpoke}` : 'hub') : activeAnchor} 
          scrollToSection={scrollToSection} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          releasePhase={unlockLevel}
          onCodeSubmit={handleCodeSubmit}
          ambientStatus={ambientStatus}
          isAdmin={isAdmin}
          bri={bri}
          xp={xp}
          rank={rank}
          onOpenMap={() => setIsTopologyOpen(true)}
          onOpenDoc={(doc) => setActiveDoc(doc)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          wallet={wallet}
          isGuest={isGuest}
          onConnectWallet={() => setIsIdentitySelectionOpen(true)}
          onDisconnectWallet={handleDisconnect}
          onSelectSilo={(id) => setActiveSpoke(id)}
          activeSpoke={activeSpoke}
        />
        
        {viewMode === 'NARRATIVE' && (
          <ScrollProgress progress={scrollPercentage} onScrollTo={scrollToPercentage} />
        )}

        <main 
          ref={scrollContainerRef} 
          onScroll={handleScroll} 
          className="flex-1 overflow-y-auto no-scrollbar relative h-full scroll-smooth-none"
          style={{ overflowX: 'hidden' }}
        >
          {viewMode === 'NARRATIVE' ? (
            <>
              <div id="silo-1">
                <Hero 
                  scrollToSection={scrollToSection} 
                  onOpenDoc={(doc) => setActiveDoc(doc)} 
                  powerSave={isPowerSave} 
                  isReady={hasAcknowledged && (onboardingCompleted || !showTutorial)}
                  onUnlockNext={() => incrementUnlockLevel(2)}
                  unlockLevel={unlockLevel}
                  onFail={() => handleScoring(false, 1)}
                  onOpenMap={() => setIsTopologyOpen(true)}
                  onOpenBriefing={() => setIsBriefingOpen(true)}
                  isAdmin={isAdmin}
                  onConnectWallet={() => setIsIdentitySelectionOpen(true)}
                  wallet={wallet}
                  isGuest={isGuest}
                  validatorTypingCompleted={validatorTypingCompleted}
                  onValidatorTypingComplete={() => setValidatorTypingCompleted(true)}
                />
              </div>

              <EncryptedSection 
                id="silo-2" 
                isLocked={unlockLevel < 2} 
                level={2} 
                label="Silo 02: Threat Intel"
                icon={<Search />}
                colorClass="text-blue-500"
                description="Deep-layer threat vector analysis and the exposure of the 8-character blind spot."
              >
                <div id="about-us"><About /></div>
                <div id="the-threat"><Problem onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
                <div><ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
                <div id="ecosystem-impact">
                   <ScamStats />
                </div>
                <SiloGate currentLevel={unlockLevel} gateLevel={3} onUnlock={() => incrementUnlockLevel(3)} onFail={() => handleScoring(false, 2)} />
              </EncryptedSection>

              <div id="silo-3">
                <EncryptedSection 
                  isLocked={unlockLevel < 3} 
                  level={3} 
                  label="Silo 03: Logic Layer"
                  icon={<Binary />}
                  colorClass="text-cyan-500"
                  description="Heuristic operational flows, protocol specs, and Layer 0.5 primitives."
                >
                  <div id="flow"><HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
                  <div id="features"><Features onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
                  <div id="deep-dive"><SafetyVideo onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
                  <SiloGate currentLevel={unlockLevel} gateLevel={4} onUnlock={() => incrementUnlockLevel(4)} onFail={() => handleScoring(false, 3)} />
                </EncryptedSection>
              </div>

              <div id="silo-4">
                <EncryptedSection 
                  isLocked={unlockLevel < 4} 
                  level={4} 
                  label="Silo 04: Execution"
                  icon={<Target />}
                  colorClass="text-orange-500"
                  description="Interception sandbox featuring modular security hubs and live path simulations."
                >
                  <CalibrationJourneySection />

                  <div id="hub-execution">
                    <HubHeader 
                      number="01" 
                      title="Execution Sandbox." 
                      subtitle="Interception Proof-of-Work" 
                      description="A safe zone to test and confirm where your funds are really going before you sign any transaction."
                    />
                    <div id="intent-validator-demo">
                      <PathBriefing pathNumber="01" title="Intent Validator" objective="Context-aware verification." threatVector="DOM address swaps." rationale="Validating belief vs execution." colorClass="text-blue-500" />
                      <IntentValidatorDemo onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} />
                    </div>
                    <div id="mimicry-lab-demo">
                      <PathBriefing pathNumber="02" title="Adversarial Mimicry" objective="Test visual thresholds." threatVector="Vanity collisions." rationale="Experience visual failure." colorClass="text-red-500" />
                      <AdversarialMimicryLab onGameComplete={() => handleScoring(true, 4)} />
                    </div>
                  </div>
                  <div id="hub-synthesis">
                    <HubHeader 
                      number="02" 
                      title="Synthesis Node." 
                      subtitle="Synchronized Intelligence Mapping" 
                      description="An intelligence bridge that syncs your local history with global threat data to detect hidden traps."
                    />
                    <div id="intel-forge-demo">
                      <PathBriefing pathNumber="03" title="Intelligence Forge" objective="Global threat mapping." threatVector="Real-time cluster monitoring." rationale="Predictive intelligence for retail protection." colorClass="text-cyan-500" />
                      <IntelligenceForge onOpenDoc={(doc) => setActiveDoc(doc)} powerSave={isPowerSave} />
                    </div>
                    <div id="reputation-search">
                      <PathBriefing pathNumber="04" title="Reputation Synthesis" objective="Identity verification." threatVector="Address behavior profiling." rationale="Establishing trust via 1.2M+ global Sentinel nodes." colorClass="text-blue-400" />
                      <ContextualReputationSearch />
                    </div>
                    <div id="sentinel-deck-demo">
                      <PathBriefing pathNumber="05" title="Sentinel Deck" objective="Active intercept simulator." threatVector="Asset impersonation. Using look-alike tokens to deceive the human eye." rationale="Direct defensive calibration." colorClass="text-purple-500" />
                      <SentinelControlDeck />
                    </div>
                  </div>
                  <div id="hub-biological">
                    <HubHeader 
                      number="03" 
                      title="Biological Calibration." 
                      subtitle="Calibrating for High-Entropy" 
                      description="A facility for training your eyes to spot the tiny address changes that most people miss."
                    />
                    <div id="neural-firewall-demo">
                      <PathBriefing pathNumber="06" title="Neural Firewall" objective="Train saccadic movement." threatVector="Saccadic masking gaps." rationale="Training the eye to scan for entropy." colorClass="text-purple-500" />
                      <NeuralFirewall />
                    </div>
                    <div id="neural-audit-demo">
                      <PathBriefing pathNumber="07" title="Saccadic Audit" objective="Map blind spots." threatVector="Cognitive fatigue." rationale="Mapping biological vulnerability." colorClass="text-cyan-500" />
                      <NeuralAttentionalAudit />
                    </div>
                  </div>
                  <div id="hub-apex">
                    <HubHeader 
                      number="04" 
                      title="The Apex Terminal." 
                      subtitle="High-Velocity Simulation" 
                      description="A stress-test environment for testing your reflexes and vigilance under high-speed market conditions."
                    />
                    <div id="entropy-collider-demo">
                      <PathBriefing pathNumber="08" title="Entropy Collider" objective="Stress-test environment." threatVector="Massive scale poisoning." rationale="Establishing a biological ceiling." colorClass="text-amber-500" />
                      <EntropyCollider powerSave={isPowerSave} />
                    </div>
                  </div>
                  <div id="field-unit-demo" className="py-20 border-t border-zinc-800">
                    <PathBriefing pathNumber="09" title="Virtual Field Unit / Watch Tower" objective="Persistent real-time protection." threatVector="Cross-platform deception." rationale="Utilizing the full VIGIL defense matrix (Retinal Shield, Guard, Heuristics) in a live workspace." colorClass="text-emerald-500" />
                    <FieldUnitHub />
                  </div>
                  <SiloGate currentLevel={unlockLevel} gateLevel={5} onUnlock={() => incrementUnlockLevel(5)} onFail={() => handleScoring(false, 4)} />
                </EncryptedSection>
              </div>

              <div id="silo-5">
                <EncryptedSection 
                  isLocked={unlockLevel < 5} 
                  level={5} 
                  label="Silo 05: Purity"
                  icon={<ShieldX />}
                  colorClass="text-red-500"
                  description="Registry of strategic refusals, system boundaries, and definitive non-goals."
                >
                  <div id="non-goals"><DefinitiveNonGoals /></div>
                  <SiloGate currentLevel={unlockLevel} gateLevel={6} onUnlock={() => incrementUnlockLevel(6)} onFail={() => handleScoring(false, 5)} />
                </EncryptedSection>
              </div>

              <div id="silo-6">
                <EncryptedSection 
                  isLocked={unlockLevel < 6} 
                  level={6} 
                  label="Silo 06: Evolution"
                  icon={<Activity />}
                  colorClass="text-blue-400"
                  description="Ecosystem scalability roadmap and expansion into the multi-chain security standard."
                >
                  <div id="roadmap"><Roadmap /></div>
                  <SiloGate currentLevel={unlockLevel} gateLevel={7} onUnlock={() => incrementUnlockLevel(7)} onFail={() => handleScoring(false, 6)} />
                </EncryptedSection>
              </div>

              <div id="silo-7">
                <EncryptedSection 
                  isLocked={unlockLevel < 7} 
                  level={7} 
                  label="Silo 07: Technical Log"
                  icon={<Database />}
                  colorClass="text-zinc-500"
                  description="The Technical Knowledge Base, Master Registry FAQ, and internal briefings."
                >
                  <div id="faq"><FAQ onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
                  <SiloGate currentLevel={unlockLevel} gateLevel={8} onUnlock={() => incrementUnlockLevel(8)} onFail={() => handleScoring(false, 7)} />
                </EncryptedSection>
              </div>

              <div id="silo-8">
                <EncryptedSection 
                  isLocked={unlockLevel < 8} 
                  level={8} 
                  label="Silo 08: Proficiency Audit"
                  icon={<BarChart3 />}
                  colorClass="text-purple-500"
                  description="Final Proficiency Certification and the terminal Neural Link calibration."
                >
                  <div id="final-proficiency-audit"><NeuralProficiencyAudit onCompleteExit={() => incrementUnlockLevel(9)} /></div>
                </EncryptedSection>
              </div>

              <div id="silo-9">
                <EncryptedSection 
                  isLocked={!isAdmin && unlockLevel < 9} 
                  level={9} 
                  label="Silo 09: The Mesh"
                  icon={<Globe />}
                  colorClass="text-emerald-500"
                  description="The Sentinel Mesh serves as the decentralized neural backbone of the VIGIL ecosystem."
                >
                  <MeshKernelBridgeSection 
                    deployMeshKernel={deployMeshKernel}
                    setActiveDoc={setActiveDoc}
                  />
                  
                  {isAdmin && (
                    <>
                      <div id="prod-studio">
                        <HubHeader number="05" title="Production Studio." subtitle="High-Fidelity Narrative Forge" />
                        <div className="py-12">
                          <VideoProductionStudio />
                        </div>
                      </div>

                      <div id="chronicle-repo">
                        <HubHeader number="06" title="Narrative Archive." subtitle="30 Days of Sovereignty Logs" />
                        <div className="py-12 px-6 md:px-20">
                          <ChronicleNarrativeLibrary />
                        </div>
                      </div>
                    </>
                  )}

                  <SiloGate currentLevel={unlockLevel} gateLevel={10} onUnlock={() => incrementUnlockLevel(10)} onFail={() => handleScoring(false, 9)} />
                </EncryptedSection>
              </div>

              <div id="silo-10" className={`${!isAdmin && unlockLevel < 10 ? 'hidden' : ''} pt-20 md:pt-40`}>
                {isAdmin ? (
                  <AdminToolsSection scrollToSection={scrollToSection} />
                ) : (
                  <GraduationSection 
                    bri={bri}
                    xp={xp}
                    setActiveDoc={setActiveDoc}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="p-6 md:p-12 lg:p-20 relative">
               {activeSpoke ? (
                 // Show silo content when a silo is selected
                 <div className="animate-in fade-in duration-500">
                   <div className="mb-6 flex items-center justify-between">
                     <button
                       onClick={() => setActiveSpoke(null)}
                       className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-[9px] font-black text-zinc-400 uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-all"
                     >
                       <ArrowLeft size={12} />
                       BACK TO GRID
                     </button>
                     <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                       SILO 0{activeSpoke} ACTIVE
                     </div>
                   </div>
                   <div className="overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                     {renderSiloContent(activeSpoke)}
                   </div>
                 </div>
               ) : (
                 // Show silo grid when no silo is selected
                 <TacticalAtrium 
                   currentLevel={unlockLevel} 
                   isAdmin={isAdmin} 
                   bri={bri} 
                   xp={xp} 
                   rank={rank} 
                   historyCount={historyCount} 
                   onSelectSilo={(id) => {
                     // Set the active silo to display its content in TACTICAL view
                     setActiveSpoke(id);
                   }}
                 />
               )}
            </div>
          )}
          <Footer onOpenDoc={(doc) => setActiveDoc(doc)} />
        </main>
      </div>

      <OperationalRegistry 
        activeDoc={activeDoc} 
        onClose={() => setActiveDoc(null)} 
        onOpenDoc={(doc) => setActiveDoc(doc)} 
        userWallet={wallet}
        userBri={bri}
        userXp={xp}
      />
      
      {isInternalKernelOpen && (
        <div className="fixed inset-0 z-[600] bg-black animate-in fade-in duration-500 overflow-hidden">
          <MeshQueryTerminal 
            onClose={() => setIsInternalKernelOpen(false)}
            onUsageUpdate={(usage) => setLastUsage(usage)} 
            onScanningChange={(scanning) => setIsAiScanning(scanning)} 
          />
        </div>
      )}

      <div id="flash-overlay" className="fixed inset-0 z-[9000] pointer-events-none opacity-0 bg-white/20" />

      <ExitProtocolOverlay exitType={activeExit} onClose={() => setActiveExit(null)} />
      <ScrollToTop />
      
      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-20vh); }
          100% { transform: translateY(120vh); }
        }
        @keyframes manifest-reveal {
          0% { transform: scale(0.9); opacity: 0; filter: blur(20px); letter-spacing: 0em; }
          100% { transform: scale(1); opacity: 1; filter: blur(0); letter-spacing: -0.05em; }
        }
        .animate-manifest-reveal {
          animation: manifest-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-heartbeat {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: heartbeat 2s linear infinite;
        }
        @keyframes heartbeat {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        @keyframes shatter-flash { 
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); } 
          25% { opacity: 1; transform: translate(-50%, -50%) scale(2); } 
          100% { opacity: 0; transform: translate(-50%, -50%) scale(6); } 
        }
        .animate-shatter-flash { animation: shatter-flash 0.8s ease-out forwards; }
        @keyframes fracture-pulse { 
          0%, 100% { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 30px rgba(16, 185, 129, 0.2); } 
          50% { border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 0 80px rgba(16, 185, 129, 0.6); transform: translateZ(50px) scale(1.02); } 
        }
        .animate-fracture-pulse { animation: fracture-pulse 0.4s infinite ease-in-out; }
        
        @keyframes mission-briefing-pulse {
          0%, 100% { 
            border-color: rgba(59, 130, 246, 0.6); 
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.4), 0 0 40px rgba(37, 99, 235, 0.2);
            transform: scale(1);
          }
          50% { 
            border-color: rgba(96, 165, 250, 0.9); 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(37, 99, 235, 0.6);
            transform: scale(1.02);
          }
        }
        .animate-mission-briefing-pulse {
          animation: mission-briefing-pulse 2s infinite ease-in-out;
        }
        
        @keyframes mission-briefing-radar {
          0% { 
            transform: scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.15); 
            opacity: 0.5; 
          }
          100% { 
            transform: scale(1); 
            opacity: 0.3; 
          }
        }
        .animate-mission-briefing-radar {
          animation: mission-briefing-radar 2s infinite ease-in-out;
        }

        /* HIGH-FIDELITY SHARD PHYSICS ENGINE (RESTORED) */
        @keyframes shard-chaos-0 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(-350%, -450%, 1500px) rotateX(720deg) rotateY(180deg) rotateZ(360deg); opacity: 0; } }
        @keyframes shard-chaos-1 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(200%, -500%, -1200px) rotateX(-540deg) rotateY(1080deg) rotateZ(-180deg); opacity: 0; } }
        @keyframes shard-chaos-2 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(550%, -150%, 800px) rotateZ(720deg) rotateY(360deg) rotateX(180deg); opacity: 0; } }
        @keyframes shard-chaos-3 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(-600%, 0%, -1500px) rotateX(900deg) rotateZ(-360deg) rotateY(45deg); opacity: 0; } }
        @keyframes shard-chaos-4 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(650%, 400%, 2000px) rotateY(-1080deg) rotateX(90deg) rotateZ(540deg); opacity: 0; } }
        @keyframes shard-chaos-5 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(-400%, 550%, -1000px) rotateX(-720deg) rotateZ(360deg) rotateY(-180deg); opacity: 0; } }
        @keyframes shard-chaos-6 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(400%, 700%, 600px) rotateY(900deg) rotateX(360deg) rotateZ(-90deg); opacity: 0; } }
        @keyframes shard-chaos-7 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(-500%, 300%, 1200px) rotateX(540deg) rotateY(-720deg) rotateZ(270deg); opacity: 0; } }
        @keyframes shard-chaos-8 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(0%, -700%, -800px) rotateZ(1080deg) rotateX(720deg) rotateY(360deg); opacity: 0; } }
        @keyframes shard-chaos-9 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(700%, 0%, 1800px) rotateX(360deg) rotateY(360deg) rotateZ(-360deg); opacity: 0; } }
        @keyframes shard-chaos-10 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(-700%, -300%, 500px) rotateZ(-1080deg) rotateX(180deg) rotateY(720deg); opacity: 0; } }
        @keyframes shard-chaos-11 { 0% { transform: translate3d(0, 0, 0) rotate(0); opacity: 1; } 100% { transform: translate3d(250%, 800%, -1500px) rotateY(1800deg) rotateZ(45deg) rotateX(-360deg); opacity: 0; } }
        
        .shard-chaos-anim-0 { animation: shard-chaos-0 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-1 { animation: shard-chaos-1 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-2 { animation: shard-chaos-2 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-3 { animation: shard-chaos-3 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-4 { animation: shard-chaos-4 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-5 { animation: shard-chaos-5 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-6 { animation: shard-chaos-6 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-7 { animation: shard-chaos-7 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-8 { animation: shard-chaos-8 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-9 { animation: shard-chaos-9 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-10 { animation: shard-chaos-10 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-11 { animation: shard-chaos-11 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes micro-telemetry {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        .animate-micro-telemetry {
          animation: micro-telemetry 60s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;