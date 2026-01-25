# Low Opacity Text Audit Report
**Generated:** Analysis of all text elements with opacity < 50% (0.5) on main website

---

## 📋 Summary
This report lists all text elements that have opacity less than 50%, which may cause readability issues. These are organized by component file.

---

## 🔍 Text Elements with Low Opacity (< 50%)

### 1. **Hero.tsx**
- **Line 175:** Ellipsis in wallet address
  - **Text:** `"..."` (between address segments)
  - **Opacity:** `opacity-40` (40%)
  - **Context:** Address display: `{targetAddress.slice(0, 4)}<span className="opacity-40 mx-1">...</span>{targetAddress.slice(-4)}`

---

### 2. **MeshQueryTerminal.tsx**
- **Line 50:** Packet history text (non-active items)
  - **Text:** Packet labels in history
  - **Opacity:** `opacity-30` (30%)
  - **Context:** `text-zinc-800 opacity-30` for non-first packet items

- **Line 372:** Disabled button text
  - **Text:** Button label when disabled
  - **Opacity:** `disabled:opacity-20` (20%)
  - **Context:** Session action button when disabled

- **Line 586:** Disabled submit button text
  - **Text:** Send button icon/text when disabled
  - **Opacity:** `disabled:opacity-20` (20%)
  - **Context:** Submit button when input is empty or API guard invalid

---

### 3. **FieldUnitHub.tsx**
- **Line 382:** Footer version text
  - **Text:** `"V 0.0.5.1 // DEFINITIVE"`
  - **Opacity:** `opacity-30` (30%)
  - **Context:** Footer at bottom of Field Unit Hub

---

### 4. **CommunityChallenge.tsx**
- **Line 419:** Empty state message
  - **Text:** `"No claims registered."`
  - **Opacity:** `opacity-30` (30%)
  - **Context:** Displayed when claim history is empty

---

### 5. **NeuralFirewall.tsx**
- **Line 98:** Reference protocol address text
  - **Text:** Origin address characters (blurred)
  - **Opacity:** `opacity-40` (40%)
  - **Context:** `font-mono text-[10px] md:text-xl text-zinc-500 flex flex-wrap opacity-40 blur-[0.5px]`

---

### 6. **AdversarialMimicryLab.tsx**
- **Line 191:** Idle state message
  - **Text:** `"Awaiting Identity"` (with icon)
  - **Opacity:** `opacity-40` (40%)
  - **Context:** Displayed when game state is IDLE

---

### 7. **SovereignSocialForge.tsx**
- **Line 236:** Large quote text
  - **Text:** `"VIGILANCE IS THE ONLY PERMANENT SHIELD."`
  - **Opacity:** `opacity-40` (40%)
  - **Context:** Large monospace quote text (4xl font)

- **Line 283:** Link/action text (hidden until hover)
  - **Text:** Link text in group
  - **Opacity:** `opacity-20` (20%, reveals to 100% on hover)
  - **Context:** `text-blue-500 opacity-20 group-hover:opacity-100`

---

### 8. **CalibrationJourneySection.tsx**
- **Line 100:** Telemetry status text (hidden until hover)
  - **Text:** `"Telemetry Status"` and `"Operational"`
  - **Opacity:** `opacity-20` (20%, reveals to 100% on hover)
  - **Context:** Right-side status indicator, reveals on group hover

---

### 9. **ContextualReputationSearch.tsx**
- **Line 86:** Disabled button text
  - **Text:** Button label when disabled
  - **Opacity:** `disabled:opacity-30` (30%)
  - **Context:** Search button when disabled

---

### 10. **SocialIntelligenceLab.tsx**
- **Line 366:** Blurred address segment
  - **Text:** Middle segment of address (blurred)
  - **Opacity:** `opacity-20` (20%) or `opacity-10` (10% in light mode)
  - **Context:** `text-zinc-900 blur-md opacity-20 px-4 ${isLight ? 'opacity-10' : ''}`

---

### 11. **NarrativeGlitchForge.tsx**
- **Line 257:** Blurred word segment
  - **Text:** Middle segment of word (blurred)
  - **Opacity:** `opacity-40` (40%)
  - **Context:** `text-zinc-800 blur-[3.5px] opacity-40 px-6 scale-90`

---

### 12. **NeuralProficiencyAudit.tsx**
- **Line 187:** Disabled/incorrect answer text
  - **Text:** Answer option text when incorrect and not selected
  - **Opacity:** `opacity-40` (40%)
  - **Context:** `bg-black border-zinc-900 text-zinc-800 opacity-40`

---

### 13. **ChronicleNarrativeLibrary.tsx**
- **Line 252:** Visual prompt number badge
  - **Text:** `"#{i+1}"` (numbered badge)
  - **Opacity:** `opacity-40` (40%)
  - **Context:** `text-[10px] font-black text-blue-500 opacity-40 shrink-0`

---

### 14. **SentinelControlDeck.tsx**
- **Line 104:** Empty state message
  - **Text:** `"Awaiting Payload..."`
  - **Opacity:** `opacity-30` (30%)
  - **Context:** Displayed when no scan result and not scanning

- **Line 154:** Empty state message (vector selection)
  - **Text:** `"Select Vector to Simulate"`
  - **Opacity:** `opacity-40` (40%, increases to 60% on hover)
  - **Context:** Displayed when no vector is selected

- **Line 91:** Disabled button text
  - **Text:** Button label when disabled
  - **Opacity:** `disabled:opacity-30` (30%)
  - **Context:** Action button when disabled

---

### 15. **SecurityModal.tsx**
- **Line 350:** Disabled button text
  - **Text:** `"Back to System Disclosure"` button when disabled
  - **Opacity:** `disabled:opacity-30` (30%)
  - **Context:** Back button when `isConnecting` is true

---

### 16. **TacticalPoisonDiagram.tsx**
- **Line 122:** Reference text (hidden until hover)
  - **Text:** `"Vector_Ref"` and `"VG-POI-CORE-v2"`
  - **Opacity:** `opacity-20` (20%, reveals to 100% on hover)
  - **Context:** Right-side reference text, reveals on group hover

---

## 📊 Statistics

- **Total Components Affected:** 16
- **Total Text Elements:** 22
- **Opacity Range:** 10% - 40%
- **Most Common Opacity:** 30% and 40% (tied)

---

## 🎯 Opacity Distribution

- **opacity-10 (10%):** 1 instance
- **opacity-20 (20%):** 6 instances
- **opacity-30 (30%):** 6 instances
- **opacity-40 (40%):** 9 instances

---

## ⚠️ Readability Concerns

### High Priority (Always Visible, Low Opacity)
1. **Hero.tsx** - Address ellipsis (40%)
2. **FieldUnitHub.tsx** - Footer version text (30%)
3. **CommunityChallenge.tsx** - Empty state message (30%)
4. **NeuralFirewall.tsx** - Reference protocol address (40%)
5. **AdversarialMimicryLab.tsx** - "Awaiting Identity" (40%)
6. **SovereignSocialForge.tsx** - Large quote text (40%)
7. **SocialIntelligenceLab.tsx** - Blurred address (20%/10%)
8. **NarrativeGlitchForge.tsx** - Blurred word segment (40%)
9. **NeuralProficiencyAudit.tsx** - Disabled answer text (40%)
10. **ChronicleNarrativeLibrary.tsx** - Number badge (40%)
11. **SentinelControlDeck.tsx** - Empty state messages (30%/40%)

### Medium Priority (Hover-Revealed, Low Base Opacity)
1. **SovereignSocialForge.tsx** - Link text (20% → 100% on hover)
2. **CalibrationJourneySection.tsx** - Telemetry status (20% → 100% on hover)
3. **TacticalPoisonDiagram.tsx** - Vector reference (20% → 100% on hover)

### Low Priority (Disabled States)
1. **MeshQueryTerminal.tsx** - Disabled buttons (20%)
2. **ContextualReputationSearch.tsx** - Disabled button (30%)
3. **SentinelControlDeck.tsx** - Disabled button (30%)
4. **SecurityModal.tsx** - Disabled button (30%)

---

## 💡 Recommendations

1. **Increase base opacity** for always-visible text from 30-40% to at least 50-60%
2. **Review hover-revealed text** - Consider increasing base opacity from 20% to 30-40% for better discoverability
3. **Disabled states** - Current 20-30% opacity is acceptable for disabled UI, but consider 40% for better visibility
4. **Blurred text** - If text is intentionally blurred for security/privacy, low opacity is acceptable, but ensure it's clearly intentional

---

**Note:** This audit focuses on text readability. Background elements, decorative patterns, and non-text UI elements with low opacity are excluded from this report.
