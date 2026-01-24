# LAYOUT CONSTRAINT AUDIT
**Mode:** READ-ONLY ANALYSIS  
**Objective:** Identify all max-width, width constraints, and centering rules affecting layout scaling on large screens (≥1440px, ≥1920px, ≥2560px)  
**Date:** Post-Responsive Hardening Verification

---

## SECTION A: GLOBAL LAYOUT CONSTRAINTS

### App.tsx Main Content Wrappers

**File:** `App.tsx`  
**Line 409:** `max-w-7xl mx-auto`  
- **Effective Width:** 1280px (80rem)
- **Applies At:** base (all breakpoints)
- **Usage:** Main section wrapper for NARRATIVE mode content
- **Centering:** `mx-auto` (horizontal centering)

**File:** `App.tsx`  
**Line 1072:** `max-w-7xl mx-auto`  
- **Effective Width:** 1280px (80rem)
- **Applies At:** base (all breakpoints)
- **Usage:** Main section wrapper for TACTICAL mode content
- **Centering:** `mx-auto` (horizontal centering)

**File:** `App.tsx`  
**Line 651:** `max-w-5xl`  
- **Effective Width:** 1024px (64rem)
- **Applies At:** base (all breakpoints)
- **Usage:** Modal/overlay content card
- **Centering:** Implicit via parent

**File:** `App.tsx`  
**Line 1349:** `max-w-5xl`  
- **Effective Width:** 1024px (64rem)
- **Applies At:** base (all breakpoints)
- **Usage:** Modal/overlay content card (TACTICAL mode)
- **Centering:** Implicit via parent

**Summary:**
- **Default Main Content Width:** 1280px (`max-w-7xl`)
- **No expansion at xl or 2xl** - Fixed constraint applies at all breakpoints

---

## SECTION B: SECTION-LEVEL MAX-WIDTHS

### Primary Section Containers

#### max-w-7xl (1280px) - Most Common Pattern

**Files Using max-w-7xl:**
1. **App.tsx** (Lines 409, 1072) - Main section wrappers
2. **EntropyCollider.tsx** (Line 88) - `max-w-7xl mx-auto`
3. **TraderAssistantSim.tsx** (Line 22) - `max-w-7xl w-full`
4. **NarrativeGlitchForge.tsx** (Line 98) - `max-w-7xl mx-auto`
5. **DefinitiveNonGoals.tsx** (Lines 68, 123) - `max-w-7xl mx-auto`
6. **IntelligenceForge.tsx** (Line 74) - `max-w-7xl mx-auto`
7. **MobileSovereignty.tsx** (Line 56) - `max-w-7xl mx-auto`
8. **PathBriefing.tsx** (Line 27) - `max-w-7xl mx-auto`
9. **HubHeader.tsx** (Line 12) - `max-w-7xl mx-auto`
10. **NeuralAttentionalAudit.tsx** (Line 86) - `max-w-7xl mx-auto`

**Effective Width:** 1280px  
**Applies At:** base (all breakpoints)  
**Centering:** All use `mx-auto`

---

#### max-w-6xl (1152px)

**Files Using max-w-6xl:**
1. **About.tsx** (Line 6) - `max-w-6xl mx-auto`
2. **HowItWorks.tsx** (Line 7) - `max-w-6xl`
3. **VideoProductionStudio.tsx** (Line 166) - `max-w-6xl mx-auto`
4. **ResearchBriefingContent.tsx** (Line 28) - `max-w-6xl mx-auto`
5. **ThreatResearch.tsx** (Line 163) - `max-w-6xl mx-auto`
6. **ThreatModelContent.tsx** (Line 22) - `max-w-6xl mx-auto`

**Effective Width:** 1152px (72rem)  
**Applies At:** base (all breakpoints)  
**Centering:** All use `mx-auto`

---

#### max-w-5xl (1024px)

**Files Using max-w-5xl:**
1. **App.tsx** (Lines 651, 1349) - Modal content cards
2. **SolscanMirror.tsx** (Line 100) - `max-w-5xl mx-auto`

**Effective Width:** 1024px (64rem)  
**Applies At:** base (all breakpoints)

---

#### max-w-4xl (896px)

**Files Using max-w-4xl:**
1. **SocialIntelligenceLab.tsx** (Lines 423, 483, 544) - Content panels
2. **NarrativeGlitchForge.tsx** (Line 275) - Content wrapper
3. **InfographicGenerator.tsx** (Line 199) - Content panel
4. **SiloGate.tsx** (Line 223) - Container
5. **SecurityModal.tsx** (Line 159) - Modal container
6. **SolscanMirror.tsx** (Line 51) - Content card

**Effective Width:** 896px (56rem)  
**Applies At:** base (all breakpoints)

---

### Canvas/Banner Max-Widths (Custom Values)

#### max-w-[1500px] - Widest Constraint

**Files Using max-w-[1500px]:**
1. **SocialIntelligenceLab.tsx** (Line 618) - Main container
2. **SovereignSocialForge.tsx** (Line 186) - Banner element

**Effective Width:** 1500px  
**Applies At:** base (all breakpoints)  
**Note:** Widest constraint in entire codebase

---

#### max-w-[1400px]

**Files Using max-w-[1400px]:**
1. **SovereignSocialForge.tsx** (Line 88) - Component root container

**Effective Width:** 1400px  
**Applies At:** base (all breakpoints)  
**Centering:** `mx-auto`

---

#### max-w-[1200px]

**Files Using max-w-[1200px]:**
1. **SocialIntelligenceLab.tsx** (Line 774) - Canvas element
2. **InfographicGenerator.tsx** (Line 134) - Canvas element

**Effective Width:** 1200px  
**Applies At:** base (all breakpoints)

---

#### max-w-[1080px]

**Files Using max-w-[1080px]:**
1. **NarrativeGlitchForge.tsx** (Line 187) - Canvas element

**Effective Width:** 1080px  
**Applies At:** base (all breakpoints)

---

### Text/Content Max-Widths (Tailwind Standard)

#### max-w-3xl (768px)
- **Usage:** Text content, paragraphs
- **Files:** SocialIntelligenceLab.tsx (Line 546), App.tsx (Line 690), etc.

#### max-w-2xl (672px)
- **Usage:** Text content, descriptions
- **Files:** Multiple components for text blocks

#### max-w-xl (576px)
- **Usage:** Text content, captions
- **Files:** Multiple components

#### max-w-lg (512px)
- **Usage:** Text content
- **Files:** Various

#### max-w-md (448px)
- **Usage:** Text content, small cards
- **Files:** Various

#### max-w-sm (384px)
- **Usage:** Text content, small elements
- **Files:** Various

#### max-w-xs (320px) - Narrowest Constraint
- **Usage:** Text content, labels
- **Files:** VideoProductionStudio.tsx (Lines 387, 441), etc.

---

## SECTION C: ULTRA-WIDE BEHAVIOR SUMMARY

### At 1440px Viewport

**Content Widths:**
- Main sections: 1280px (`max-w-7xl`)
- Some sections: 1152px (`max-w-6xl`)
- Widest content: 1500px (`max-w-[1500px]`)

**Blank Space:**
- For 1280px content: (1440 - 1280) / 2 = **80px per side**
- For 1500px content: **0px** (content exceeds viewport, but scales down via transform)

**Status:** ✅ Content fits comfortably with minimal blank space

---

### At 1920px Viewport

**Content Widths:**
- Main sections: 1280px (`max-w-7xl`)
- Widest content: 1500px (`max-w-[1500px]`)

**Blank Space:**
- For 1280px content: (1920 - 1280) / 2 = **320px per side** (640px total)
- For 1500px content: (1920 - 1500) / 2 = **210px per side** (420px total)

**Status:** ⚠️ **Significant blank space appears** - Content is centered but does not expand

---

### At 2560px Viewport (Ultra-Wide)

**Content Widths:**
- Main sections: 1280px (`max-w-7xl`)
- Widest content: 1500px (`max-w-[1500px]`)

**Blank Space:**
- For 1280px content: (2560 - 1280) / 2 = **640px per side** (1280px total)
- For 1500px content: (2560 - 1500) / 2 = **530px per side** (1060px total)

**Status:** ⚠️ **Extensive blank space** - Content remains constrained, does not expand

---

## SECTION D: EXPANSION BEHAVIOR ANALYSIS

### Do Sections Expand at xl or 2xl?

**Answer:** ❌ **NO** - All max-width constraints are fixed and apply at base breakpoint

**Evidence:**
- No `xl:max-w-*` or `2xl:max-w-*` variants found
- All constraints use base `max-w-*` classes
- Custom values like `max-w-[1500px]` are fixed, not responsive

**Implication:**
- Content width is **capped** at the specified max-width regardless of viewport size
- No progressive expansion at larger breakpoints
- Blank space increases proportionally with viewport width

---

## SECTION E: CONSTRAINT STATISTICS

### Width Distribution

| Constraint | Pixel Value | Count | Usage |
|------------|-------------|-------|-------|
| `max-w-[1500px]` | 1500px | 2 | Widest (canvases, main containers) |
| `max-w-[1400px]` | 1400px | 1 | Component root |
| `max-w-[1200px]` | 1200px | 2 | Canvas elements |
| `max-w-[1080px]` | 1080px | 1 | Canvas element |
| `max-w-7xl` | 1280px | 10+ | **Most common** (main sections) |
| `max-w-6xl` | 1152px | 6 | Secondary sections |
| `max-w-5xl` | 1024px | 3 | Modals, cards |
| `max-w-4xl` | 896px | 6+ | Content panels |
| `max-w-3xl` | 768px | Multiple | Text content |
| `max-w-2xl` | 672px | Multiple | Text content |
| `max-w-xl` | 576px | Multiple | Text content |
| `max-w-xs` | 320px | Multiple | **Narrowest** (text labels) |

### Summary Statistics

- **Narrowest Max-Width:** 320px (`max-w-xs`)
- **Widest Max-Width:** 1500px (`max-w-[1500px]`)
- **Default Main Content Width:** 1280px (`max-w-7xl`)
- **Most Common Pattern:** `max-w-7xl mx-auto` (10+ occurrences)

---

## SECTION F: CENTERING RULES

### mx-auto Usage

**Pattern:** Almost all section containers use `mx-auto` for horizontal centering

**Examples:**
- `max-w-7xl mx-auto` (most common)
- `max-w-6xl mx-auto`
- `max-w-[1400px] mx-auto`
- `max-w-5xl mx-auto`

**Effect:**
- Content is **centered** horizontally
- Blank space is **distributed equally** on left and right
- No left-aligned or right-aligned main content found

---

## SECTION G: WHY BLANK SPACE APPEARS

### Root Cause Analysis

**Question:** Why does blank space appear at 1920px and 2560px?

**Answer:** **INTENTIONAL CONTAINMENT** - The design uses fixed max-width constraints to:

1. **Maintain Readability:** Prevents text lines from becoming too long (optimal reading width is ~60-80 characters)
2. **Preserve Design Intent:** Keeps content density and visual hierarchy consistent
3. **Prevent Over-Stretching:** Avoids UI elements (cards, grids, canvases) from becoming too wide
4. **Centered Layout:** Uses `mx-auto` to center content, creating equal blank space on both sides

**Evidence:**
- All main sections use `max-w-7xl` (1280px) - a standard "desktop optimal" width
- No responsive expansion at `xl:` or `2xl:` breakpoints
- Consistent pattern across all components
- Blank space is **symmetrical** (centered via `mx-auto`)

---

## SECTION H: FINAL VERDICT

### INTENTIONAL vs ACCIDENTAL

**Verdict:** ✅ **INTENTIONAL CONTAINMENT**

**Reasoning:**

1. **Consistent Pattern:** All components follow the same max-width constraint pattern
2. **Design Best Practice:** 1280px (`max-w-7xl`) is a standard desktop content width
3. **No Expansion Logic:** Absence of `xl:` or `2xl:` variants indicates intentional fixed width
4. **Centering Strategy:** Universal use of `mx-auto` shows deliberate centering approach
5. **Readability Focus:** Text content uses narrower constraints (max-w-2xl, max-w-xl) for optimal reading

**Conclusion:**
The blank space at 1920px and 2560px is **intentional design choice**, not an oversight. The application prioritizes:
- Content readability
- Consistent visual density
- Centered, contained layouts
- Over progressive expansion at ultra-wide breakpoints

**Recommendation (if change desired):**
To reduce blank space at ultra-wide breakpoints, would need to:
- Add `xl:max-w-[1600px]` or `2xl:max-w-[1800px]` variants
- Implement progressive expansion logic
- Consider asymmetric layouts (content left-aligned with sidebar on right)

**Current State:** ✅ **Design is consistent and intentional**

---

## APPENDIX: COMPLETE CONSTRAINT INVENTORY

### By File (Key Components Only)

**App.tsx:**
- Line 409: `max-w-7xl mx-auto` (1280px)
- Line 651: `max-w-5xl` (1024px)
- Line 1072: `max-w-7xl mx-auto` (1280px)
- Line 1349: `max-w-5xl` (1024px)

**SocialIntelligenceLab.tsx:**
- Line 618: `max-w-[1500px] mx-auto` (1500px) - **WIDEST**
- Line 774: `max-w-[1200px]` (1200px)

**SovereignSocialForge.tsx:**
- Line 88: `max-w-[1400px] mx-auto` (1400px)
- Line 186: `max-w-[1500px]` (1500px) - **WIDEST**

**NarrativeGlitchForge.tsx:**
- Line 98: `max-w-7xl mx-auto` (1280px)
- Line 187: `max-w-[1080px]` (1080px)

**InfographicGenerator.tsx:**
- Line 134: `max-w-[1200px]` (1200px)

**EntropyCollider.tsx:**
- Line 88: `max-w-7xl mx-auto` (1280px)

**TraderAssistantSim.tsx:**
- Line 22: `max-w-7xl w-full` (1280px)

**VideoProductionStudio.tsx:**
- Line 166: `max-w-6xl mx-auto` (1152px)

**About.tsx:**
- Line 6: `max-w-6xl mx-auto` (1152px)

**ThreatResearch.tsx:**
- Line 163: `max-w-6xl mx-auto` (1152px)

**ThreatModelContent.tsx:**
- Line 22: `max-w-6xl mx-auto` (1152px)

**ResearchBriefingContent.tsx:**
- Line 28: `max-w-6xl mx-auto` (1152px)

---

**END OF AUDIT**
