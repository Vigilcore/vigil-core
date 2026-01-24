import React from 'react';
import { HubHeader } from './HubHeader';
import { VideoProductionStudio } from './VideoProductionStudio';
import { ChronicleNarrativeLibrary } from './ChronicleNarrativeLibrary';
import { FlagshipHeaderArchitect } from './FlagshipHeaderArchitect';
import { SovereignAssetVault } from './SovereignAssetVault';
import { SocialIntelligenceLab } from './SocialIntelligenceLab';
import { CommunityChallenge } from './CommunityChallenge';
import { NarrativeGlitchForge } from './NarrativeGlitchForge';

interface AdminToolsSectionProps {
  scrollToSection: (id: string) => void;
}

export const AdminToolsSection: React.FC<AdminToolsSectionProps> = ({
  scrollToSection
}) => {
  return (
    <>
      <div id="brand-architect">
        <HubHeader number="07" title="Brand Architect." subtitle="Institutional Visual Logic" />
        <div className="py-12">
          <FlagshipHeaderArchitect />
        </div>
      </div>

      <div id="brand-vault">
        <HubHeader number="08" title="Asset Registry." subtitle="Master Brand Archive" />
        <div className="py-12">
          <SovereignAssetVault onInitialize={() => scrollToSection('brand-architect')} />
        </div>
      </div>

      <div id="comms-terminal">
        <HubHeader number="09" title="Comms Terminal." subtitle="Visual Evidence Generator" />
        <div className="py-12">
          <SocialIntelligenceLab />
        </div>
      </div>

      <div id="active-challenge">
        <HubHeader number="10" title="Active Challenge." subtitle="Global Sentinel Assessment" />
        <div className="py-24">
          <CommunityChallenge />
        </div>
      </div>

      <div id="daily-distraction">
        <HubHeader number="11" title="Daily Distraction." subtitle="Narrative Kinetic Glitches" />
        <div className="py-12">
          <NarrativeGlitchForge />
        </div>
      </div>
    </>
  );
};