# APP.TSX SECTION BREAKDOWN PROPOSAL
**READ-ONLY ANALYSIS FOR REFACTORING GUIDANCE**

## EXECUTIVE SUMMARY

**Total Sections Proposed:** 8 top-level sections

**File Size:** ~1645 lines
**Current Structure:** Monolithic component with mixed concerns
**Refactoring Goal:** Logical, semantic separation without breaking functionality

---

## PROPOSED SECTION BREAKDOWN

### 1. **AppImports**
**Lines:** 1-60
**Purpose:** Centralized import management and type definitions
**Content:**
- All React imports
- All component imports (Header, Hero, Footer, etc.)
- All service/utility imports
- Type definitions (ViewMode, RegistryDoc, ExitType)
**Should NOT be split further:** Yes - This is a standard import block. Splitting would break module resolution.
**Note:** Keep as-is. This is conventional React structure.

---

### 2. **AppState**
**Lines:** 63-117
**Purpose:** All state declarations and refs initialization
**Content:**
- All `useState` hooks (UI state, user state, modal state, view mode, unlock level, etc.)
- All `useRef` hooks (scroll refs, animation refs, flags)
- State initialization from localStorage
**Should NOT be split further:** Yes - State declarations are tightly coupled and should remain together for readability and React rules compliance.
**Note:** This section is cohesive and follows React hooks rules. Splitting would require custom hooks, which is beyond move-only refactor scope.

---

### 3. **AppEffects**
**Lines:** 119-228
**Purpose:** All side effects and lifecycle management
**Content:**
- `useEffect` for localStorage persistence
- `useEffect` for telemetry visibility
- `useEffect` for session resume prompt
- `useEffect` for intersection observer (scroll anchoring)
- `useEffect` for smooth scroll animation loop
- `useEffect` for tutorial mode handling
**Should NOT be split further:** No - This section is large (~110 lines) and could later be split into:
  - `useLocalStorageSync` (lines 123-133)
  - `useTelemetryVisibility` (lines 136-148)
  - `useScrollAnchoring` (lines 160-198)
  - `useSmoothScroll` (lines 200-217)
  - `useTutorialMode` (lines 219-228)
**Note:** For move-only refactor, keep together. Future optimization could extract custom hooks.

---

### 4. **AppEventHandlers**
**Lines:** 230-357
**Purpose:** All event handler functions and business logic
**Content:**
- `handleScroll` - Scroll tracking
- `scrollToPercentage` - Programmatic scroll to percentage
- `scrollToSection` - Navigation to section by ID
- `handleScoring` - Scoring/XP/BRI calculation
- `handleCalibrationComplete` - Boot sequence completion
- `handleDisconnect` / `confirmDisconnect` - Wallet disconnect flow
- `incrementUnlockLevel` - Level progression logic
- `handleCodeSubmit` - Admin code validation
- `deployMeshKernel` - Mesh kernel deployment
- `ambientStatus` - Status string generation
**Should NOT be split further:** No - This section could later be split into:
  - `useScrollHandlers` (scroll-related functions)
  - `useScoringHandlers` (scoring/XP/BRI functions)
  - `useNavigationHandlers` (section navigation)
  - `useAdminHandlers` (admin code, mesh kernel)
**Note:** For move-only refactor, keep together. Functions are logically grouped by concern.

---

### 5. **SiloContentRenderer**
**Lines:** 359-810
**Purpose:** Switch statement that renders silo content based on unlock level
**Content:**
- Large switch statement (cases 1-10, default)
- Each case returns JSX for that silo level
- Includes inline JSX for "Calibration Journey" section (lines 405-546)
- Includes inline JSX for hub sections (Execution, Synthesis, Biological, Apex)
- Includes inline JSX for Silo 9 (Mesh Kernel Bridge)
- Includes inline JSX for Silo 10 (Admin tools or Graduation)
**Should NOT be split further:** **NO - This is the LARGEST section (~450 lines) and MUST be split further:**
  - **Sub-section 5a:** `CalibrationJourneySection` (lines 405-546) - Inline JSX for calibration journey intro
  - **Sub-section 5b:** `HubExecutionSection` (lines 549-564) - Execution Sandbox hub
  - **Sub-section 5c:** `HubSynthesisSection` (lines 565-584) - Synthesis Node hub
  - **Sub-section 5d:** `HubBiologicalSection` (lines 585-600) - Biological Calibration hub
  - **Sub-section 5e:** `HubApexSection` (lines 601-612) - Apex Terminal hub
  - **Sub-section 5f:** `MeshKernelBridgeSection` (lines 650-696) - Silo 9 kernel bridge UI
  - **Sub-section 5g:** `GraduationSection` (lines 740-803) - Silo 10 graduation UI
  - **Sub-section 5h:** `AdminToolsSection` (lines 716-738) - Admin-only tools in Silo 10
**Note:** This section is too large and contains significant inline JSX that should be extracted. However, for a move-only refactor, the switch statement structure should be preserved.

---

### 6. **StandaloneModeHandler**
**Lines:** 812-827
**Purpose:** Early return for standalone kernel mode
**Content:**
- `isRealWallet` helper constant
- Conditional check for `isStandalone`
- Early return JSX for standalone MeshQueryTerminal
**Should NOT be split further:** Yes - This is a small, cohesive early return block. Splitting would add unnecessary complexity.
**Note:** Keep as-is. This is a clear conditional rendering pattern.

---

### 7. **AppLayout**
**Lines:** 829-1564
**Purpose:** Main application layout and conditional rendering
**Content:**
- Root container div with classes
- Background overlays (CRT overlay, SecurityZoneBackground)
- SecurityAnnouncementBar
- All modals (SecurityModal, IdentitySelectionModal, RevokeSessionModal)
- Conditional overlays (SystemBoot, SessionResumeOverlay, OnboardingTutorial)
- Topology and Mission Briefing modals
- Conditional UI for `hasAcknowledged`:
  - TelemetryDisplay
  - View mode toggle buttons
  - Wallet connection UI
  - Mobile menu button
- Header component
- ScrollProgress component
- Main content area:
  - NARRATIVE mode: All silo sections (Hero, EncryptedSections, etc.)
  - TACTICAL mode: TacticalAtrium component
- Footer component
- OperationalRegistry modal
- MeshQueryTerminal overlay (conditional)
- ExitProtocolOverlay
- ScrollToTop component
**Should NOT be split further:** **NO - This section is VERY LARGE (~735 lines) and should be split:**
  - **Sub-section 7a:** `AppModals` (lines 836-887) - All modal components
  - **Sub-section 7b:** `AppOverlays` (lines 859-886) - Conditional overlays (SystemBoot, SessionResume, Tutorial, Topology, Briefing)
  - **Sub-section 7c:** `AppHeaderControls` (lines 892-970) - View mode toggle, wallet UI, telemetry display
  - **Sub-section 7d:** `AppMainContent` (lines 995-1538) - Main content area with NARRATIVE/TACTICAL conditional
  - **Sub-section 7e:** `AppFooterAndRegistry` (lines 1538-1549) - Footer and OperationalRegistry
  - **Sub-section 7f:** `AppGlobalOverlays` (lines 1551-1564) - MeshQueryTerminal overlay, ExitProtocolOverlay, ScrollToTop
**Note:** This is the most complex section. For move-only refactor, consider splitting into logical JSX groups.

---

### 8. **AppStyles**
**Lines:** 1566-1640
**Purpose:** Inline CSS keyframe animations and utility classes
**Content:**
- `<style>` tag with all keyframe definitions
- Animation classes (scan-vertical, manifest-reveal, heartbeat, shatter-flash, fracture-pulse, shard-chaos-0 through shard-chaos-11, micro-telemetry, spin-slow)
**Should NOT be split further:** Yes - This is a single `<style>` block. Splitting would require external CSS files, which is beyond move-only scope.
**Note:** Keep as-is. Inline styles are intentional for component-scoped animations.

---

## SECTION SIZE ANALYSIS

| Section | Lines | Complexity | Split Recommendation |
|---------|-------|------------|----------------------|
| AppImports | 60 | Low | Keep as-is |
| AppState | 55 | Medium | Keep as-is |
| AppEffects | 110 | Medium | Keep for move-only, split later |
| AppEventHandlers | 128 | Medium | Keep for move-only, split later |
| SiloContentRenderer | 450 | **HIGH** | **MUST SPLIT** - Too large |
| StandaloneModeHandler | 16 | Low | Keep as-is |
| AppLayout | 735 | **HIGH** | **MUST SPLIT** - Too large |
| AppStyles | 75 | Low | Keep as-is |

---

## RECOMMENDED SPLITTING PRIORITY

### Phase 1 (Move-Only Refactor - Safe)
1. Extract `AppImports` → Keep in main file (conventional)
2. Extract `AppState` → Keep in main file (React hooks rules)
3. Extract `AppEffects` → Keep in main file (can split later)
4. Extract `AppEventHandlers` → Keep in main file (can split later)
5. Extract `StandaloneModeHandler` → Keep in main file (small, cohesive)
6. Extract `AppStyles` → Keep in main file (single style block)

### Phase 2 (Requires Careful Extraction)
7. Extract `SiloContentRenderer` → **SPLIT INTO:**
   - Main switch statement (keep in App.tsx)
   - Extract inline JSX sections to separate components:
     - `CalibrationJourneySection` (lines 405-546)
     - `MeshKernelBridgeSection` (lines 650-696)
     - `GraduationSection` (lines 740-803)
     - `AdminToolsSection` (lines 716-738)

8. Extract `AppLayout` → **SPLIT INTO:**
   - `AppModals` component (all modal JSX)
   - `AppOverlays` component (conditional overlays)
   - `AppHeaderControls` component (view toggle, wallet UI)
   - `AppMainContent` component (NARRATIVE/TACTICAL content)
   - `AppFooterAndRegistry` component (footer + registry)
   - `AppGlobalOverlays` component (terminal overlay, exit protocol, scroll to top)

---

## SECTIONS THAT SHOULD NOT BE SPLIT FURTHER

1. **AppImports** (lines 1-60)
   - **Reason:** Standard React import pattern. Splitting would break module resolution and add no value.

2. **AppState** (lines 63-117)
   - **Reason:** React hooks must be called in the same order. Splitting state declarations would violate React rules and require custom hooks (beyond move-only scope).

3. **StandaloneModeHandler** (lines 812-827)
   - **Reason:** Small, cohesive early return block. Splitting would add unnecessary complexity.

4. **AppStyles** (lines 1566-1640)
   - **Reason:** Single `<style>` block for component-scoped animations. Splitting would require external CSS files, changing architecture.

---

## SECTIONS THAT ARE TOO LARGE

1. **SiloContentRenderer** (~450 lines)
   - **Issue:** Contains massive inline JSX (Calibration Journey section is ~140 lines of JSX)
   - **Recommendation:** Extract inline JSX sections to separate components:
     - `CalibrationJourneySection` - The 4-hub intro section
     - `MeshKernelBridgeSection` - Silo 9 kernel bridge UI
     - `GraduationSection` - Silo 10 graduation screen
     - `AdminToolsSection` - Admin-only tools in Silo 10
   - **Note:** The switch statement itself should remain in App.tsx, but the returned JSX can be extracted.

2. **AppLayout** (~735 lines)
   - **Issue:** Contains all JSX for modals, overlays, header controls, main content, footer
   - **Recommendation:** Split into logical JSX groups:
     - Modals group
     - Overlays group
     - Header controls group
     - Main content group
     - Footer/registry group
     - Global overlays group
   - **Note:** These can be extracted as separate components or render functions.

---

## FINAL VERDICT

**Total Top-Level Sections:** 8

**For Move-Only Refactor (Phase 1):**
- Extract 6 sections that are safe to move
- Keep 2 large sections (`SiloContentRenderer`, `AppLayout`) in main file initially
- These can be split in Phase 2

**For Complete Refactor (Phase 2):**
- Split `SiloContentRenderer` into switch + extracted components
- Split `AppLayout` into 6 sub-components
- Total sections after Phase 2: ~14-16 sections

**Architectural Note:** The current structure mixes concerns (state, effects, handlers, rendering) in a single file. The proposed breakdown maintains logical grouping while preserving React's rules and component structure.

---

**END OF ANALYSIS**
