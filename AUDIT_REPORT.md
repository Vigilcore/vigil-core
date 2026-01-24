# VIGIL PRE-DEPLOYMENT INTEGRITY & CONSISTENCY AUDIT REPORT

**Date:** 2026-01-26  
**Scope:** Full frontend audit before production deployment  
**Status:** ANALYSIS COMPLETE - NO CODE CHANGES APPLIED

---

## EXECUTIVE SUMMARY

This audit identified **15 issues** across 5 categories:
- **HIGH Severity:** 3 issues
- **MEDIUM Severity:** 7 issues  
- **LOW Severity:** 5 issues

**Critical Findings:**
1. Navigation ID mismatch causing broken links
2. Unmapped document types showing placeholder content
3. Missing API key validation that could cause silent failures

---

## CATEGORY 1: NAVIGATION & ROUTING

### Issue N-001: Navigation ID Mismatch - Brand Architect
**Files:** `components/Header.tsx:100`, `App.tsx:720,1421`  
**Severity:** HIGH  
**Description:** 
- Header.tsx defines nav item with `id: 'brand-arch'` (line 100)
- App.tsx uses `id="brand-architect"` for the actual section (lines 720, 1421)
- Clicking "Brand Architect" in sidebar will fail to scroll to the correct section

**Impact:** Admin users clicking this nav item will not reach the intended content, breaking navigation flow.

**Why it matters:** Breaks core navigation functionality for admin-only features.

---

### Issue N-002: Duplicate Navigation Item - Field Unit Demo
**Files:** `components/Header.tsx:86-87`  
**Severity:** MEDIUM  
**Description:**
- Two nav items share the same `id: 'field-unit-demo'`:
  - Line 86: "Final Deployment" (type: 'item')
  - Line 87: "P9: Watch Tower (VFU)" (type: 'subitem')
- Both reference the same section ID, causing duplicate active states

**Impact:** Sidebar may show incorrect active highlighting, and scroll behavior may be unpredictable.

**Why it matters:** Confusing UX when both items appear active simultaneously.

---

### Issue N-003: Missing Section ID Validation
**Files:** `App.tsx:181-192`, `components/Header.tsx:54-104`  
**Severity:** MEDIUM  
**Description:**
- IntersectionObserver watches for IDs that may not exist in DOM
- Some nav items reference sections that only exist conditionally (admin-only, unlock-level gated)
- No validation that target elements exist before scrolling

**Impact:** Silent failures when clicking nav items for locked/unavailable sections.

**Why it matters:** Users may click nav items that don't scroll anywhere, creating confusion.

**Affected IDs:** `prod-studio`, `chronicle-repo`, `brand-architect`, `comms-terminal`, `active-challenge`, `daily-distraction` (admin-only)

---

## CATEGORY 2: MODALS & DOCUMENTS

### Issue D-001: Unmapped Document Types in Registry
**Files:** `components/OperationalRegistry.tsx:24,118-145`  
**Severity:** HIGH  
**Description:**
- `RegistryDoc` type includes 9 document types that are NOT handled in `DocContent` switch:
  - `'docs'`
  - `'audit'`
  - `'challenge'`
  - `'comms_terminal'`
  - `'social_forge'`
  - `'master_broadcast'`
  - `'chronicle_library'`
  - `'narrative_forge'`
  - `'header_architect'`
- These fall through to default case showing "PROVISIONING_REGISTRY_SEGMENT" placeholder

**Impact:** Clicking buttons/links that trigger these document types will show a loading placeholder instead of actual content.

**Why it matters:** Broken user experience - users expect documents but get placeholder content.

**Evidence:** No case handlers in switch statement (lines 119-145) for these types.

---

### Issue D-002: Document Type Never Used
**Files:** `components/OperationalRegistry.tsx:24`  
**Severity:** LOW  
**Description:**
- Several RegistryDoc types are defined but never referenced in codebase:
  - `'docs'`, `'audit'`, `'challenge'`, `'comms_terminal'`, `'social_forge'`, `'master_broadcast'`, `'chronicle_library'`, `'narrative_forge'`, `'header_architect'`
- These appear to be dead code or future features

**Impact:** Type definition bloat, potential confusion for developers.

**Why it matters:** Unclear if these are intentional placeholders or forgotten code.

---

### Issue D-003: Modal State Management Race Condition
**Files:** `components/OperationalRegistry.tsx:163-177`  
**Severity:** MEDIUM  
**Description:**
- `isVisible` state is set separately from `activeDoc`
- Early return `if (!activeDoc && !isVisible)` may cause flicker
- `useEffect` sets `isVisible` after `activeDoc` changes, creating a timing gap

**Impact:** Brief visual glitch when opening/closing modals.

**Why it matters:** Minor UX degradation, but could be noticeable on slower devices.

---

## CATEGORY 3: API & DATA FLOW

### Issue A-001: Missing API Key Validation
**Files:** `services/geminiService.ts:91,158,229,260,301`, `services/meshIntelService.ts:44`, `vite.config.ts:7`  
**Severity:** HIGH  
**Description:**
- All API calls use `process.env.API_KEY` without validation
- If `API_KEY` is undefined/null, GoogleGenAI will fail with cryptic errors
- No user-friendly error messages for missing API key
- Vite config defines the env var but doesn't validate it exists

**Impact:** 
- Production builds may fail silently if API_KEY not set
- Users see technical error messages instead of clear feedback
- No graceful degradation

**Why it matters:** Critical production issue - app will be non-functional if API key missing.

**Affected Functions:**
- `analyzeSecurityIntent()`
- `analyzeMarketIntel()`
- `analyzeAddressInterception()`
- `synthesizeAddressReputation()`
- `generateCognitiveAutopsy()`
- `querySentinelMeshStream()`

---

### Issue A-002: Inconsistent Error Handling in API Calls
**Files:** `services/geminiService.ts`, `components/VideoProductionStudio.tsx:147-159`, `components/FlagshipHeaderArchitect.tsx:144-156`  
**Severity:** MEDIUM  
**Description:**
- `geminiService.ts` throws generic errors without context
- Some components (VideoProductionStudio, FlagshipHeaderArchitect) handle quota/auth errors
- Other components using geminiService don't handle these specific error cases
- Error messages vary in format and user-friendliness

**Impact:** Inconsistent error UX across the application.

**Why it matters:** Users may see different error formats for the same underlying issue.

---

### Issue A-003: Hardcoded API Endpoint Assumptions
**Files:** `components/VideoProductionStudio.tsx:135`  
**Severity:** LOW  
**Description:**
- Video download URL construction assumes specific API response format
- Uses `&key=${process.env.API_KEY}` appended to URI
- No validation that `downloadLink` is a valid URL format

**Impact:** Potential runtime error if API response format changes.

**Why it matters:** Brittle code that could break with API updates.

---

## CATEGORY 4: STATE & FLOW

### Issue S-001: State Update Race Condition in Scoring
**Files:** `App.tsx:277-295`  
**Severity:** MEDIUM  
**Description:**
- `handleScoring()` updates multiple state variables (`bri`, `rank`, `xp`) sequentially
- `setBri()` callback also calls `setRank()` conditionally
- No batching of state updates, potential for intermediate renders

**Impact:** Multiple re-renders, potential UI flicker during scoring updates.

**Why it matters:** Performance and UX degradation.

---

### Issue S-002: localStorage Sync Timing
**Files:** `App.tsx:125-135`  
**Severity:** LOW  
**Description:**
- `useEffect` syncs state to localStorage on every change
- No debouncing, could cause excessive writes
- Multiple state variables trigger same effect

**Impact:** Performance impact from frequent localStorage writes.

**Why it matters:** localStorage writes are synchronous and can block UI.

---

### Issue S-003: Unlock Level Increment Without Validation
**Files:** `App.tsx:327-338`  
**Severity:** MEDIUM  
**Description:**
- `incrementUnlockLevel()` allows setting any target level
- No validation that target level is valid (1-10)
- Guest users bypass unlock logic but still trigger scoring

**Impact:** Potential for invalid state if called with bad parameters.

**Why it matters:** Could cause navigation to non-existent silos.

---

### Issue S-004: View Mode State Not Persisted on All Changes
**Files:** `App.tsx:90-92,122-123`  
**Severity:** LOW  
**Description:**
- `viewMode` is persisted to localStorage in useEffect
- But `setViewMode('NARRATIVE')` is called directly in some places (line 223) without ensuring persistence
- TACTICAL mode changes may not persist if component unmounts quickly

**Impact:** View mode preference may not be saved in edge cases.

**Why it matters:** User preference may be lost.

---

## CATEGORY 5: DEPENDENCIES & CODE HEALTH

### Issue C-001: Unused Import - RotateCcw
**Files:** `App.tsx:3`  
**Severity:** LOW  
**Description:**
- `RotateCcw` is imported from lucide-react (line 3)
- Only used once in line 797: `<RotateCcw size={18} />`
- Comment at top of file says "Added RotateCcw to the lucide-react imports" suggesting it was recently added
- Actually IS used, so this is a false positive - keeping for reference

**Impact:** None - import is actually used.

**Why it matters:** N/A - false positive.

---

### Issue C-002: Dead Code - Unused renderSiloContent Function
**Files:** `App.tsx:361-812` (renderSiloContent)  
**Severity:** MEDIUM  
**Description:**
- `renderSiloContent()` function (lines 361-812) is defined but NEVER USED
- NARRATIVE view mode renders content directly inline (lines 1007-1540)
- TACTICAL view mode uses `TacticalAtrium` component (line 1526), NOT `renderSiloContent()`
- Function contains 450+ lines of duplicate rendering logic

**Impact:** Dead code bloat, maintenance burden, confusion for developers.

**Why it matters:** Large unused function increases codebase size and maintenance cost. Should be removed or repurposed.

**Evidence:** 
- `renderSiloContent` is never called anywhere in codebase
- TACTICAL mode uses `<TacticalAtrium />` component instead
- NARRATIVE mode renders JSX directly

---

### Issue C-003: Hardcoded Development Assumptions
**Files:** `components/SecurityModal.tsx:77-101`  
**Severity:** LOW  
**Description:**
- Mobile detection uses user agent string matching
- Hardcoded URLs for Phantom/Solflare mobile deep links
- Assumes specific wallet provider URL formats

**Impact:** May break if wallet providers change their URL schemes.

**Why it matters:** Brittle integration with external services.

---

## SUMMARY BY SEVERITY

### HIGH SEVERITY (3 issues)
1. **N-001:** Navigation ID mismatch - Brand Architect
2. **D-001:** Unmapped document types in Registry
3. **A-001:** Missing API key validation

### MEDIUM SEVERITY (7 issues)
1. **N-002:** Duplicate navigation item
2. **N-003:** Missing section ID validation
3. **D-003:** Modal state race condition
4. **A-002:** Inconsistent error handling
5. **S-001:** State update race condition
6. **S-003:** Unlock level validation missing
7. **C-002:** Duplicate content rendering

### LOW SEVERITY (5 issues)
1. **D-002:** Unused document types
2. **A-003:** Hardcoded API endpoint assumptions
3. **S-002:** localStorage sync timing
4. **S-004:** View mode persistence edge case
5. **C-003:** Hardcoded dev assumptions

---

## RECOMMENDATIONS

### Immediate Actions (Before Deployment)
1. **Fix N-001:** Align navigation ID (`brand-arch` → `brand-architect`)
2. **Fix D-001:** Either map missing document types or remove from RegistryDoc type
3. **Fix A-001:** Add API key validation with user-friendly error messages

### Short-term Improvements
1. Remove duplicate nav item (N-002)
2. Add section existence validation before scrolling (N-003)
3. Batch state updates in scoring handler (S-001)
4. Consolidate duplicate rendering logic (C-002)

### Long-term Enhancements
1. Add comprehensive error boundaries
2. Implement API key configuration UI
3. Add analytics for navigation failures
4. Create integration tests for navigation flows

---

## UNCERTAIN ITEMS (Need Confirmation)

1. **Are unmapped document types (`docs`, `audit`, etc.) intentional placeholders for future features?**
   - **VERIFIED:** `renderSiloContent()` is confirmed dead code - never called, TACTICAL uses TacticalAtrium component
2. **Should API key be required at build time or runtime?**
   - Current implementation expects it at build time via vite.config.ts
3. **Are duplicate nav items intentional (field-unit-demo appearing twice)?**
   - Appears to be a mistake - same ID used for different labels

---

## TESTING RECOMMENDATIONS

1. **Navigation Testing:**
   - Click every sidebar item and verify correct section scrolls into view
   - Test admin-only nav items with/without admin privileges
   - Test locked sections with different unlock levels

2. **Document Modal Testing:**
   - Click every "Docs", "Details", "Read More" button
   - Verify correct document opens
   - Check for placeholder content

3. **API Error Testing:**
   - Test with missing API_KEY
   - Test with invalid API_KEY
   - Test with quota exceeded
   - Verify error messages are user-friendly

4. **State Flow Testing:**
   - Test unlock progression through all levels
   - Test scoring updates don't cause UI flicker
   - Test view mode persistence across page reloads

---

**END OF AUDIT REPORT**

*This report contains analysis only. No code changes have been applied. Awaiting approval before implementing fixes.*
