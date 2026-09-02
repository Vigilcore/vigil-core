# VIGIL CORE: UI/UX ANIMATION AUDIT REPORT

**Date:** 2026-01-26  
**Mode:** Read-Only Analysis  
**Objective:** Analyze current reveal behaviors and recommend intentional animation system aligned with "decrypted intelligence" theme

---

## EXECUTIVE SUMMARY

**Current State:**
- **Partial animation coverage:** ~40% of components have some form of reveal animation
- **Inconsistent patterns:** Mix of `animate-in`, `fade-in`, `slide-in`, `zoom-in`, and custom animations
- **Missing intelligence theme:** Most animations feel generic, not aligned with "decryption" or "system boot" narrative
- **Abrupt appearances:** Many sections render instantly without progressive reveal
- **Staggered reveals:** Only `Features.tsx` implements proper staggered card animations

**Key Findings:**
1. **EncryptedSection** has unlock animation (`animate-shatter`) but content appears instantly after unlock
2. **OperationalRegistry** modals use `zoom-in` but lack "decryption" feel
3. **TacticalAtrium** has `fade-in` but silos appear simultaneously
4. **Hero section** has no entry animation despite being first view
5. **Feature cards** have proper IntersectionObserver-based staggered reveals (good pattern)

---

## A. CLASSIFICATION TABLE

### Major Sections & Components

| Component | Current Behavior | UX Issue | Recommended Animation | Animation Intent |
|-----------|-----------------|----------|----------------------|------------------|
| **Hero** | Instant render | Feels abrupt, no "boot" sense | `INTEL_REVEAL` (fade + blur → clear) | System initialization |
| **EncryptedSection** (locked) | Static card with blur preview | Good locked state | Keep current | Encryption barrier |
| **EncryptedSection** (unlocked) | `animate-shatter` → instant content | Shatter happens, then content dumps | `DECRYPT_UNFOLD` (staggered content reveal after shatter) | Decryption process |
| **Features** | IntersectionObserver + staggered `translate-y` | ✅ Good pattern | Keep, enhance with `INTEL_REVEAL` variant | Intelligence catalog |
| **CalibrationJourneySection** | Instant render | No progressive reveal | `STAGGER_GRID` (hub cards appear sequentially) | Training module boot |
| **TacticalAtrium** | `fade-in` (entire grid) | All silos appear at once | `STAGGER_GRID` (silos reveal one-by-one with delay) | Tactical interface initialization |
| **OperationalRegistry** (modal) | `zoom-in duration-700` | Generic zoom, no "decryption" | `PANEL_BOOT` (scan line + progressive content) | Registry access protocol |
| **SecurityModal** | Instant with backdrop blur | No entry sequence | `SYSTEM_BOOT` (terminal boot sequence) | Security handshake |
| **IdentitySelectionModal** | Instant | Abrupt appearance | `PANEL_BOOT` (slide from top + scan) | Identity verification |
| **IntentValidatorDemo** | Instant render | Complex component appears abruptly | `INTEL_REVEAL` (fade + blur → clear, then stagger sub-panels) | Threat analysis interface |
| **SocialIntelligenceLab** | `fade-in zoom-in` on container | Canvas appears instantly | `CANVAS_DECRYPT` (scan line reveal + progressive canvas) | Forge engine activation |
| **SiloGate** | Custom shard chaos animation | ✅ Good for unlock | Keep, enhance with pre-unlock anticipation | Gate breach sequence |
| **ThreatResearch** | Instant render | No intelligence "unfolding" | `INTEL_REVEAL` (text appears progressively) | Threat data decryption |
| **About** | Instant render | Static appearance | `STAGGER_GRID` (cards appear sequentially) | Information catalog |
| **Problem** | Instant render | No narrative build-up | `INTEL_REVEAL` (section-by-section reveal) | Threat exposition |
| **Footer** | Instant render | Acceptable (low priority) | Optional: `FADE_IN` | Static reference |

### Cards & Panels

| Component | Current Behavior | UX Issue | Recommended Animation | Animation Intent |
|-----------|-----------------|----------|----------------------|------------------|
| **FeatureCard** | IntersectionObserver + `translate-y` + stagger | ✅ Good pattern | Enhance with `INTEL_REVEAL` glow-on | Intelligence artifact |
| **Hub cards** (CalibrationJourney) | Instant render | No progressive reveal | `STAGGER_GRID` (sequential with 150ms delay) | Training module catalog |
| **Silo cards** (TacticalAtrium) | Instant render | All appear simultaneously | `STAGGER_GRID` (sequential with 100ms delay) | Tactical grid initialization |
| **Threat cards** (ThreatResearch) | Instant render | No intelligence "unfolding" | `INTEL_REVEAL` (fade + blur → clear) | Threat data artifact |
| **TacticalContainer** (SocialIntelligenceLab) | Instant render | No progressive reveal | `PANEL_BOOT` (scan line + content fade) | Tactical panel activation |

### Modals & Overlays

| Component | Current Behavior | UX Issue | Recommended Animation | Animation Intent |
|-----------|-----------------|----------|----------------------|------------------|
| **OperationalRegistry** | `zoom-in duration-700` + backdrop fade | Generic, no "decryption" feel | `PANEL_BOOT` (scan line top → bottom, then content) | Registry access protocol |
| **SecurityModal** | Instant with backdrop | No boot sequence | `SYSTEM_BOOT` (terminal boot animation) | Security handshake |
| **IdentitySelectionModal** | Instant | Abrupt | `PANEL_BOOT` (slide from top + scan line) | Identity verification |
| **ThreatIndexModal** | `fade-in duration-300` | Too fast, generic | `INTEL_REVEAL` (progressive data reveal) | Threat calculation display |
| **ExitProtocolOverlay** | `fade-in duration-700` | Generic | `ALERT_FLASH` (red pulse + slide-in) | Critical alert |
| **SessionResumeOverlay** | Instant | No anticipation | `PANEL_BOOT` (scan line + content fade) | Session restoration |
| **RevokeSessionModal** | Instant | Abrupt | `ALERT_FLASH` (red pulse + slide-in) | Security alert |

### Interactive Elements

| Component | Current Behavior | UX Issue | Recommended Animation | Animation Intent |
|-----------|-----------------|----------|----------------------|------------------|
| **Buttons** (hover) | `transition-all` + `scale-95` on active | ✅ Good | Keep | Standard interaction |
| **Navigation items** | `transition-all` on hover | ✅ Good | Keep | Standard interaction |
| **Silo selection** (TacticalAtrium) | Instant highlight | No feedback | `GLOW_ACTIVATION` (pulse on select) | Silo activation |
| **Code input** (SiloGate) | Instant validation | No anticipation | `DECRYPT_UNFOLD` (success) or `ALERT_FLASH` (fail) | Code validation |

---

## B. ANIMATION STRATEGY (CONCEPTUAL)

### Standard Animation Types for VIGIL

#### 1. `INTEL_REVEAL`
**Purpose:** Intelligence artifacts, data displays, threat information  
**Behavior:**
- Start: `opacity: 0`, `filter: blur(20px)`, `transform: scale(0.95)`
- End: `opacity: 1`, `filter: blur(0)`, `transform: scale(1)`
- Duration: `800ms - 1200ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Use for:** Threat cards, research sections, intelligence displays, data panels
- **Do NOT use for:** Buttons, navigation, static text

**Visual metaphor:** Encrypted data being decrypted and revealed

---

#### 2. `PANEL_BOOT`
**Purpose:** System panels, modals, registry access  
**Behavior:**
- Phase 1: Scan line animation (top → bottom, 400ms)
- Phase 2: Panel slides in from top (`translate-y: -20px → 0`, 600ms)
- Phase 3: Content fades in (`opacity: 0 → 1`, 400ms, delay: 200ms)
- Total duration: `1000ms`
- **Use for:** Modals, overlays, registry panels, system interfaces
- **Do NOT use for:** Cards, buttons, inline content

**Visual metaphor:** System panel booting up, scan line indicates initialization

---

#### 3. `STAGGER_GRID`
**Purpose:** Grid layouts, card collections, silo grids  
**Behavior:**
- Cards appear sequentially with `100ms - 150ms` delay between each
- Each card uses `INTEL_REVEAL` animation
- Stagger direction: Top-left → bottom-right (reading order)
- **Use for:** Feature grids, hub cards, silo grids, calibration journey hubs
- **Do NOT use for:** Single items, modals, overlays

**Visual metaphor:** Intelligence grid being populated progressively

---

#### 4. `DECRYPT_UNFOLD`
**Purpose:** Unlocking encrypted sections, successful validations  
**Behavior:**
- Phase 1: Existing shatter animation (keep current `shard-chaos-*`)
- Phase 2: Content unfolds from center (`scale: 0.8 → 1`, `opacity: 0 → 1`, 600ms)
- Phase 3: Sub-elements stagger in (100ms delay between children)
- Total duration: `1400ms` (800ms shatter + 600ms unfold)
- **Use for:** EncryptedSection unlock, SiloGate success, code validation success
- **Do NOT use for:** Regular content, modals, alerts

**Visual metaphor:** Encrypted segment being decrypted and unfolded

---

#### 5. `ALERT_FLASH`
**Purpose:** Critical alerts, errors, security warnings  
**Behavior:**
- Phase 1: Red pulse flash (`opacity: 0 → 1 → 0.8`, 200ms)
- Phase 2: Slide in from top (`translate-y: -30px → 0`, 400ms)
- Phase 3: Subtle pulse (`box-shadow: red glow`, infinite, 2s)
- Total duration: `600ms` (entry) + continuous pulse
- **Use for:** ExitProtocolOverlay, RevokeSessionModal, error states, threat alerts
- **Do NOT use for:** Regular content, success states, information displays

**Visual metaphor:** Security alert being intercepted and displayed

---

#### 6. `SYSTEM_BOOT`
**Purpose:** Initial system startup, security modal, terminal interfaces  
**Behavior:**
- Phase 1: Terminal boot sequence (text appears character-by-character, 50ms/char)
- Phase 2: Scan line animation (top → bottom, 300ms)
- Phase 3: Interface fades in (`opacity: 0 → 1`, 400ms)
- Total duration: Variable (depends on boot text length)
- **Use for:** SecurityModal, SystemBoot, terminal interfaces, initial load
- **Do NOT use for:** Regular modals, content sections, cards

**Visual metaphor:** System initializing, terminal boot sequence

---

#### 7. `CANVAS_DECRYPT`
**Purpose:** Canvas-based components (SocialIntelligenceLab, infographics)  
**Behavior:**
- Phase 1: Scan line sweeps across canvas (left → right, 800ms)
- Phase 2: Canvas content fades in behind scan line (`opacity: 0 → 1`, 600ms)
- Phase 3: Canvas scales to final size (`scale: 0.95 → 1`, 400ms)
- Total duration: `1200ms`
- **Use for:** SocialIntelligenceLab canvas, infographic displays, large visual artifacts
- **Do NOT use for:** Regular cards, modals, text content

**Visual metaphor:** Canvas being decrypted and rendered progressively

---

#### 8. `GLOW_ACTIVATION`
**Purpose:** Interactive element activation (silo selection, button press)  
**Behavior:**
- Brief glow pulse (`box-shadow: accent-color glow`, 300ms)
- Subtle scale (`scale: 1 → 1.02 → 1`, 300ms)
- **Use for:** Silo selection, important button clicks, activation feedback
- **Do NOT use for:** Hover states, regular clicks, navigation

**Visual metaphor:** Element being activated, energy pulse

---

### Animation Usage Matrix

| Animation Type | Sections | Cards | Modals | Interactive | Alerts |
|----------------|----------|-------|--------|-------------|--------|
| `INTEL_REVEAL` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `PANEL_BOOT` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `STAGGER_GRID` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `DECRYPT_UNFOLD` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `ALERT_FLASH` | ❌ | ❌ | ✅ | ❌ | ✅ |
| `SYSTEM_BOOT` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `CANVAS_DECRYPT` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `GLOW_ACTIVATION` | ❌ | ❌ | ❌ | ✅ | ❌ |

---

## C. PRIORITY MAP

### HIGH PRIORITY (Must Animate First)

**Impact:** User's first impression, core narrative flow

1. **Hero Section** → `INTEL_REVEAL`
   - **Why:** First thing users see, sets tone for "intelligence unfolding"
   - **Impact:** High (first impression)
   - **Effort:** Low (single section)

2. **EncryptedSection (unlocked)** → `DECRYPT_UNFOLD`
   - **Why:** Core narrative element, currently has shatter but content dumps
   - **Impact:** High (core UX flow)
   - **Effort:** Medium (needs content stagger)

3. **OperationalRegistry Modal** → `PANEL_BOOT`
   - **Why:** Frequently used, currently generic zoom
   - **Impact:** High (frequent interaction)
   - **Effort:** Medium (needs scan line + content stagger)

4. **TacticalAtrium Silo Grid** → `STAGGER_GRID`
   - **Why:** Core tactical interface, all silos appear at once
   - **Impact:** High (core feature)
   - **Effort:** Low (add stagger delays)

5. **SecurityModal** → `SYSTEM_BOOT`
   - **Why:** First interaction, sets security tone
   - **Impact:** High (first impression)
   - **Effort:** High (needs terminal boot sequence)

---

### MEDIUM PRIORITY (Should Animate)

**Impact:** Enhances narrative, improves perceived quality

6. **CalibrationJourneySection Hubs** → `STAGGER_GRID`
   - **Why:** Training narrative, currently instant
   - **Impact:** Medium (narrative enhancement)
   - **Effort:** Low (add stagger delays)

7. **Features Grid** → Enhance existing with `INTEL_REVEAL` variant
   - **Why:** Already has stagger, enhance with blur reveal
   - **Impact:** Medium (polish existing)
   - **Effort:** Low (enhance existing)

8. **IntentValidatorDemo** → `INTEL_REVEAL` + sub-panel stagger
   - **Why:** Complex component, appears abruptly
   - **Impact:** Medium (complexity reduction)
   - **Effort:** Medium (needs sub-panel coordination)

9. **ThreatResearch Cards** → `INTEL_REVEAL`
   - **Why:** Threat intelligence should feel "decrypted"
   - **Impact:** Medium (narrative alignment)
   - **Effort:** Low (add reveal animation)

10. **IdentitySelectionModal** → `PANEL_BOOT`
    - **Why:** Identity verification should feel secure
    - **Impact:** Medium (security perception)
    - **Effort:** Medium (needs scan line)

---

### LOW PRIORITY (Nice to Have)

**Impact:** Polish, not critical for core narrative

11. **About Section Cards** → `STAGGER_GRID`
    - **Why:** Information display, low narrative impact
    - **Impact:** Low (polish)
    - **Effort:** Low

12. **Footer** → `FADE_IN` (optional)
    - **Why:** Static reference, rarely seen
    - **Impact:** Low (minimal visibility)
    - **Effort:** Low

13. **Problem Section** → `INTEL_REVEAL`
    - **Why:** Threat exposition, but not core interaction
    - **Impact:** Low (narrative enhancement)
    - **Effort:** Low

---

### STATIC (Do Not Animate)

**Reason:** Would hurt seriousness, performance, or UX

- **Navigation sidebar** (Header) - Keep instant, users need immediate access
- **Scroll progress indicator** - Keep instant, functional element
- **Button hover states** - Keep current `transition-all`, already good
- **Text content** (paragraphs, descriptions) - Keep instant, readability priority
- **Icons** - Keep instant, decorative elements
- **Background patterns** - Keep current subtle animations, already good
- **Telemetry streams** - Keep current `animate-micro-telemetry`, already good

---

## D. GUARDRAILS

### What NOT to Animate

1. **Navigation Elements**
   - **Why:** Users need immediate access, animation delays interaction
   - **Exception:** Modal navigation (can use `PANEL_BOOT`)

2. **Form Inputs**
   - **Why:** Accessibility, users need immediate feedback
   - **Exception:** Validation success/failure (can use `ALERT_FLASH` or `GLOW_ACTIVATION`)

3. **Critical Information**
   - **Why:** Security information must be immediately visible
   - **Exception:** Threat alerts (can use `ALERT_FLASH` for emphasis)

4. **Loading States**
   - **Why:** Users need immediate feedback that system is working
   - **Exception:** Initial page load (can use `SYSTEM_BOOT`)

5. **Error Messages**
   - **Why:** Errors must be immediately visible
   - **Exception:** Error appearance can use `ALERT_FLASH` (fast, 600ms)

6. **Accessibility Features**
   - **Why:** Screen readers, keyboard navigation must work instantly
   - **Exception:** Visual-only animations (use `prefers-reduced-motion`)

---

### Performance Considerations

1. **Reduce Motion on Low-End Devices**
   - Use `prefers-reduced-motion` media query
   - Disable animations on mobile if performance degrades
   - Use `will-change` sparingly (only on elements that will animate)

2. **Animation Duration Limits**
   - **Entry animations:** Max `1200ms` (most should be `600ms - 800ms`)
   - **Stagger delays:** Max `150ms` between items
   - **Total page load animation:** Max `2000ms`

3. **GPU Acceleration**
   - Use `transform` and `opacity` for animations (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left` (layout triggers)

4. **IntersectionObserver Usage**
   - Only animate elements when they enter viewport
   - Unobserve after animation completes (save resources)

---

### Laptop vs Mobile Considerations

**Laptop (Desktop):**
- ✅ Full animation suite
- ✅ Staggered reveals (good performance)
- ✅ Complex animations (scan lines, shatter effects)
- ✅ Multiple simultaneous animations

**Mobile:**
- ⚠️ Simplified animations (fade-in only, no stagger)
- ⚠️ Reduced blur effects (performance)
- ⚠️ Shorter durations (400ms - 600ms instead of 800ms - 1200ms)
- ⚠️ Disable `CANVAS_DECRYPT` (performance intensive)
- ⚠️ Disable `SYSTEM_BOOT` terminal sequence (too slow)

**Responsive Strategy:**
- Use `@media (max-width: 768px)` to disable/simplify animations
- Provide `prefers-reduced-motion` fallback
- Test on actual mobile devices (not just browser dev tools)

---

### Seriousness Preservation

**Do NOT:**
- ❌ Bouncy animations (e.g., `bounce-in`)
- ❌ Playful transitions (e.g., `rotate-in`, `flip-in`)
- ❌ Excessive motion (too many things moving at once)
- ❌ Slow animations (>1500ms) for regular content
- ❌ Animation on every hover (only important elements)

**DO:**
- ✅ Subtle, purposeful motion
- ✅ Fast, decisive animations (600ms - 800ms)
- ✅ Motion that reinforces narrative (decryption, boot, intelligence)
- ✅ Consistent timing (use same durations across similar elements)
- ✅ Respect user preferences (`prefers-reduced-motion`)

---

## IMPLEMENTATION NOTES (For Future Reference)

### Animation Library Structure

```
animations/
  ├── intel-reveal.ts        # INTEL_REVEAL animation
  ├── panel-boot.ts          # PANEL_BOOT animation
  ├── stagger-grid.ts        # STAGGER_GRID animation
  ├── decrypt-unfold.ts      # DECRYPT_UNFOLD animation
  ├── alert-flash.ts         # ALERT_FLASH animation
  ├── system-boot.ts         # SYSTEM_BOOT animation
  ├── canvas-decrypt.ts      # CANVAS_DECRYPT animation
  └── glow-activation.ts     # GLOW_ACTIVATION animation
```

### CSS Custom Properties

```css
:root {
  --animation-intel-reveal-duration: 800ms;
  --animation-panel-boot-duration: 1000ms;
  --animation-stagger-delay: 100ms;
  --animation-decrypt-unfold-duration: 1400ms;
  --animation-alert-flash-duration: 600ms;
  --animation-easing: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### React Hook Pattern

```typescript
// Example: useIntelReveal hook
const useIntelReveal = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
};
```

---

## SUMMARY

**Current State:** Partial animation coverage with inconsistent patterns. Most content appears instantly or with generic animations that don't reinforce the "decrypted intelligence" narrative.

**Recommended Approach:** Implement 8 standard animation types aligned with the security/intelligence theme. Prioritize Hero, EncryptedSection, OperationalRegistry, TacticalAtrium, and SecurityModal for high impact.

**Key Principle:** Every animation should reinforce the narrative that intelligence is being *unlocked* or *decrypted*, not just rendered. Motion should feel purposeful and serious, not playful.

**Next Steps:** (When ready to implement)
1. Create animation library with 8 standard types
2. Implement HIGH PRIORITY animations first
3. Test on mobile devices
4. Add `prefers-reduced-motion` support
5. Iterate based on user feedback

---

**End of Audit Report**
