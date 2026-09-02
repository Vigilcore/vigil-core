# VIGIL Core — Canonical Master Plan

> **Version:** 1.0.1 — Owner and CTO Approved
> **Status:** Approved canonical master plan
> **Approval date:** 2026-09-03
> **Last updated:** 2026-09-03
> **Canonical repository:** `/Users/ajmalfahad/Desktop/Web Projects -Playground/VIGIL/Website-Stable/VIGIL-Core`
> **Development baseline analyzed:** `5f0dd69d82dd7da74a0e62fad763c76d4d5c9869`
> **Main baseline at plan approval:** `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`

---

## 1. Document control

**Purpose.** One evidence-led source of truth reconciling the CTO/Codex roadmap, Claude's repository audit / reboot plan / removal inventory, Grok's website & strategy review, and the repository's own documents against the current consolidated code. Where reviewers disagree, current code and Git evidence decide; unsupported claims are excluded or flagged.

| Field | Value |
|---|---|
| Owner / final decision-maker | Ajmal Fahad |
| CTO, task designer, reviewer | ChatGPT / Codex |
| Implementation engineer | Claude Code |
| Canonical repo path | `/Users/ajmalfahad/Desktop/Web Projects -Playground/VIGIL/Website-Stable/VIGIL-Core` |
| GitHub repository | `Vigilcore/vigil-core` (SSH alias `github-vigil`) |
| Development baseline analyzed | `5f0dd69d82dd7da74a0e62fad763c76d4d5c9869` |
| Main baseline at plan approval | `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8` |
| Plan adoption commit | `d10729d752acb263535a9c841a44f70391f44850` |
| Plan approval-metadata commit | `2daf67e9866955d1bbe1d724a0c87221e4da4438` |
| Status | 1.0.1 — Owner and CTO Approved · Approved canonical master plan |

**Update policy.** Update on any material decision, milestone start/finish, new/resolved risk, scope change, or when evidence changes a claim. Record in §18 (Decision Log) and §20 (Change Log). Never rewrite silently. Never mark `✅` without linked evidence (a run test/build/review or an approved document). Writing code is not completion; verification is.

**Status legend.** ⬜ Not started · 🟨 In progress · 🟦 In review/testing · ✅ Completed and verified · ⛔ Blocked · ⚠️ Risk · ❌ Rejected/cancelled

**Evidence legend.** `VERIFIED` (checked against current code/Git) · `PARTIALLY VERIFIED` · `NEEDS VERIFICATION` · `NEEDS CURRENT EXTERNAL VERIFICATION` · `STALE` · `REJECTED`.

**Uncertainty rule.** The following are **not** claimed fully verified without a dedicated measurement/authority: production reachability under real usage, external crawler behavior, privacy-regulation compliance, trademark status, external token facts, Robinhood Chain facts, authoritative token/mint addresses, dependency-vulnerability counts, TypeScript error counts, and production bundle measurements.

**Source-of-truth rule.**

> Ajmal Fahad and the CTO approved Draft 1.2 on 2026-09-03.
>
> This approved Version 1.0 is the single canonical VIGIL master plan.
>
> Earlier ChatGPT, Claude, Grok, repository, and artifact roadmaps remain historical evidence or reference material and must not operate as parallel sources of truth.

---

## 2. Executive summary

**What VIGIL is.** A browser-based transaction-safety layer that detects address poisoning and related wallet-manipulation threats **before** a user takes an irreversible on-chain action.

**Problem.** Losses occur at the human decision layer — address substitution, look-alike recipients, inherited trust, malicious approvals — not only in broken contracts. Wallet history itself becomes an attack surface.

**Positioning.** *The last safety check before an on-chain action becomes irreversible.*

**Recommended wedge.** A tested, deterministic address-poisoning detector delivered through a focused **Chrome extension**. Transaction simulation, approval/drainer detection, token verification, and multi-chain intelligence follow **after** this core is proven.

**Why integrity first.** The interface currently looks more mature than the protection behind it. Every later phase depends on verdicts being real, so fabrication removal and a deterministic kernel precede website polish, marketing, and any token discussion.

**Why the extension is primary.** Protection must fire at the browser decision point (pre-sign), which a marketing site cannot do. The extension's `retinalShield.js` already contains genuine deterministic detection — the strongest existing asset. **Note:** page-address scanning is not the same as wallet-level pre-sign interception (see §10).

**Why the website supports (not leads).** The site builds trust, explains the product, and drives installs; it is rebuilt **after** the alpha proves what the product does. A minimal truthful holding page may ship earlier.

**Why token work is gated.** No token exists. A token is a deferred, conditional decision behind a formal utility test, legal review, traction evidence, and security readiness — never a precondition for the product.

---

## 3. Current verified state

### 3.1 Completed & verified foundation (evidence: Git + this session)
- ✅ `VERIFIED` — GitHub-account isolation: VIGIL uses `Vigilcore` via `github-vigil`; `origin` = `git@github-vigil:Vigilcore/vigil-core.git`; repo-local identity `Vigilcore` / `github@vigilcore.org` (from `.git/config`). BourseWire isolated.
- ✅ `VERIFIED` — Branch consolidation: only `development` (`5f0dd69`) and `main` (`0f66464`) exist locally and on `origin`; `playground` and the Claude worktree branch retired after preservation.
- ✅ `VERIFIED` — Worktree removed; single canonical checkout.
- ✅ `VERIFIED` — Recovery tags: `backup/pre-consolidation-{playground-f3b331c, main-a4107da, development-8987be4}`.
- ✅ `VERIFIED` — `utils/poisoningDetector.ts` preserved (SHA-256 `c174cd08…acccc97`), untracked, unreviewed.
- ✅ `VERIFIED` — Root `CLAUDE.md` charter created, committed (`5f0dd69`), pushed to `origin/development`.

> **Phase 00 is NOT complete.** Only the Git/identity sub-tasks are done. Emergency containment, API hardening, and the quality floor remain ⬜.

### 3.2 Verified product assets (keep)
- ✅ `VERIFIED` — Deterministic detection: `VIGIL-FIELD-UNIT/content/retinalShield.js` `analyzeAddress()` (entropy, similarity-vs-whitelist, canonical-mint check, clipboard intent) — no AI/randomness in the core verdict path.
- ✅ `VERIFIED` — Real Helius data layer: `api/helius.ts` (server-side keyed proxy) + `services/heliusService.ts`.
- ✅ `VERIFIED` — Shared primitives: `utils/addressValidator.ts`, `addressDiff.ts`, `threatIndex.ts`, `scoring.ts`.
- ✅ `VERIFIED` — Grounded search: `MeshQueryTerminal` (candidate for explain-only / `/lab`).

### 3.3 Verified risks (see §3.7 reachability inventory for detail)
Fabricated campaign, random verdicts (service worker **and** `AlertMarketIntel.js`), corrupted user metric, client-visible provider endpoint, incorrect USDC registry, AI-generated verdicts, forced `NEW`, open Helius proxy, unauthenticated cache writes, client-manipulable paid tier, unsigned handshake, admin backdoor, zero quality infra, duplicate deps, placeholder market math. All `VERIFIED` at listed lines.

### 3.4 Needs verification
- `NEEDS VERIFICATION` — TS error count; dependency-advisory count; production bundle size (measure with a run).
- `NEEDS VERIFICATION` — Whether any secret/endpoint appears in committed history.
- `NEEDS VERIFICATION` — Base `$VIGIL` token specifics; "Vigil" trademark/store collisions.
- `NEEDS CURRENT EXTERNAL VERIFICATION` — All time-sensitive Robinhood Chain facts (§12).

### 3.5 Stale / rejected
- `STALE` — Any statement referencing `playground`, the Claude worktree, or "branch divergence unresolved." Superseded by §3.1.
- `REJECTED` — "No Helius integration; all detection data is AI-fabricated." Contradicted by `api/helius.ts` + `services/heliusService.ts`. Correction: real telemetry exists but the **verdict** is still AI-generated, so telemetry presence does not make verdicts trustworthy.
- `STALE` — "The site does not exist / is blank." A JS-capable browser renders substantial content; the real issue is no SSR/crawlability, not absence.

### 3.6 Repository-document reconciliation

| Document | Classification | Valid current claims | Stale / conflicting claims | Master-plan implication | Future disposition |
|---|---|---|---|---|---|
| `README.md` | CONFLICTING | Problem framing (8-char blind spot); MIT license; Layer 0.5 concept | "Status: Operational"; "Zero-Knowledge / local IndexedDB"; "No tracking"; "<12ms latency"; unsupported stats ($17B, 94%, 1400%); "Rate limiting per tier"; AI "cognitive autopsy" as verdict; `npm run dev` (needs `vercel dev`) | Rewrite to evidence-backed claims; remove ZK/IndexedDB and unsupported stats | Revise in Phase 03 + claims register |
| `Markdown Files/AUDIT_REPORT.md` (2026-01-26) | PARTIALLY CURRENT | Dead `renderSiloContent`; broken `VideoProductionStudio`/`FlagshipHeaderArchitect`; nav/registry bugs | Line numbers predate current `App.tsx`; `process.env.API_KEY` framing predates server-side `/api` | Reuse findings as bug list; re-verify line refs | Fold valid items into risk/traceability |
| `Markdown Files/API_KEY_INTEGRITY_AUDIT.md` | STALE | Residual: `VideoProductionStudio`/`FlagshipHeaderArchitect` still reference `process.env.API_KEY` | Whole "vite `define` exposes API_KEY client-side" model — superseded by server-side `/api` (`vite.config.ts` no longer defines it) | Re-audit current key handling; not the current architecture | Reference-only historical |
| `Markdown Files/EXTENSION_ARCHITECTURE.md` | PARTIALLY CURRENT | Directory layout; TS-hub → JS-core intent | "Bit-perfect parity / checksum verification" is aspirational; core copies have drifted; `<12ms` | Reinforces the shared-engine goal (end duplication) | Reference for shared-engine design |
| `Markdown Files/EXTENSION_PRD.md` | PARTIALLY CURRENT | Retinal Shield, Clipboard Guardian, Similarity engine (exist) | Solana-only; "Pro Sentinel Handshake" (the insecure handshake); "Sub-12ms" target | Baseline for extension plan; correct handshake + add EVM | Reference; reconcile with §10 |
| `Markdown Files/SECURITY.md` | PARTIALLY CURRENT / CONFLICTING | Disclosure process (`security@vigilcore.org`, coordinated disclosure) | "Rate Limiting via useApiGuard" (no-op); "No user data on servers" (server cache exists) | Keep disclosure workflow; correct overstated features | Revise security-features list |
| `Markdown Files/VIGIL_CONTEXT.md` | CONFLICTING / REFERENCE ONLY | Layer 0.5 identity; Sovereign Tactical brand | "IndexedDB / never touch remote server"; "Sub-12ms mandatory" | Brand reference; correct privacy claims to real data flow | Reference; correct privacy claims |
| `Markdown Files/PRODUCTION_DEPLOYMENT.md` | PARTIALLY CURRENT | Vercel static + `/api/gemini`,`/api/openai` serverless; server-side keys; auto-deploy on push to `main` | Omits `/api/helius`, `/api/cache`; predates them | Accurate deploy reference; add new routes; note deploy-from-`main` → branch protection | Keep, update |
| `Markdown Files/future expansion plan copy.md` | REFERENCE ONLY | Forward SSA "Semantic Context Firewall" concept | Far beyond current scope; repeats ZK/IndexedDB assumptions | Out of scope for reboot; possible far-future direction | Reference only; not in Phases 00–10 |

> `AGENTS.md` is **excluded** from this reconciliation and from all inspection/classification (see §6 policy and §8). It is not analysed as a routine artifact.

### 3.7 Reachability-aware fabrication inventory

**Classification key:** (1) harmless labelled demo randomness · (2) unlabelled simulation needing disclosure/`/lab` isolation · (3) randomness/hardcoded data affecting a verdict, warning, score, telemetry, campaign, forensic conclusion, or user metric — **emergency integrity issue**. Not every `Math.random()` is a vulnerability; only reachable, user-impacting cases are Category 3.

| # | Path | Function / line | Reachability | User impact | Category | Evidence | Disposition | Post-change verification |
|---|---|---|---|---|---|---|---|---|
| F1 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | fake campaign `:24–44` (`Math.random()>0.98`) | Fires only when `VIG_NODE_VERIFIED` true (set solely by unsigned handshake `:121–130`) | Pushes a fabricated CRITICAL "INDUSTRIALIZED POISONING" alert with invented counts | **3** | VERIFIED | Remove in Phase 00 | Confirm no timer emits `GLOBAL_CAMPAIGN_SIGNAL` |
| F2 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | random trap `:75`, forensics `:80–87` | `fetchBundlingData` runs only for tier `APEX`/`SENTINEL` (`:65`) | Random 30% "CONCENTRATION_TRAP" + fabricated `motherWallet`/`clusterCount`/`SYSTEMIC_EXIT` | **3** | VERIFIED | Remove in Phase 00 | Confirm no random verdict path remains |
| F3 | `VIGIL-FIELD-UNIT/content/ui/AlertMarketIntel.js` | `:12` `isRugRisk = … || Math.random()>0.6`; `:14` `bundled:42.8/4.1`; `:111` hardcoded "N rug-pulls in 48h" | `retinalShield.js analyzeAddress → MARKET_INTEL (discovery domains, non-BASELINE tier) → dispatchHUD() → AlertMarketIntel render` | Shows a **random 40% "rug risk"** + hardcoded forensic metrics as a security conclusion | **3** | VERIFIED (newly found) | Remove/replace in Phase 00 | Confirm HUD renders only evidence-backed data or a labelled demo in `/lab` |
| F4 | `retinalShield.js` → `serviceWorker.js` | `dispatchHUD :172` sends `THREAT_LOG` for **any** verdict → `updateLocalIntelligence :113–116` | Any user click opening a HUD (TRUSTED/NEW/etc.) | `VIG_TOTAL_POISONS` +1 and `VIG_USER_BRI` −5 **regardless of verdict** → corrupted "poison count" & resilience metric | **3** | VERIFIED (newly found) | Fix increment to fire only on real poison; contain in Phase 00 | Confirm counter changes only on a genuine poison verdict |
| F5 | `api/gemini.ts`, `api/openai.ts` | `analyzeSecurityIntent`, `analyzeMarketIntel`, `synthesizeAddressReputation`, `analyzeAddressInterception`, `generateCognitiveAutopsy` | Called by website AI demos | AI infers risk/reputation/honeypot from an address alone → verdict is model-generated | **3** | VERIFIED | Remove verdict generation; AI explains only | Confirm no endpoint returns a verdict field |
| F6 | `components/IntentValidatorDemo.tsx` | forced `NEW` `:545` (`isRealInspection ? 'NEW' : …`) | Any real-address inspection in the demo | Verdict label forced to `NEW` regardless of evidence (a telemetry-based index is still computed) | **3** (label) | VERIFIED | Replace with deterministic verdict in Phase 01; label as demo until then | Confirm real inspections produce evidence-derived states |
| F7 | `utils/marketMath.ts` | `:19` hardcoded `{top10:1,top20:3,top50:12}`; `:42` placeholder | Called where market distribution is shown | Hardcoded distribution presented as analysis | **2/3** | VERIFIED | Replace with real data or label; Phase 00/01 | Confirm no hardcoded distribution shown as real |

Non-security randomness (visual/demo) is Category 1 and out of scope for emergency containment unless it feeds any item above; each such use is to be confirmed labelled during the Phase 00 inventory.

**USDC registry (evidence split, per revision):**
- `VERIFIED` — `VIGIL-FIELD-UNIT/core/addressValidator.js:8` contains a USDC value that is **inconsistent with the expected canonical Solana USDC mint**, and it is auto-trusted.
- `NEEDS OFFICIAL EXTERNAL VERIFICATION` — the authoritative replacement value must be confirmed from an official issuer / authoritative registry **before** any code change. This plan does **not** propose a replacement address.

---

## 4. Cross-review reconciliation

| Topic | ChatGPT/Codex | Claude | Grok | Current evidence | Final decision |
|---|---|---|---|---|---|
| Website crawlability | Static/SSR essential content | No SSR; content in JS | Crawler saw empty; others got content | `VERIFIED` client-rendered SPA | Render essential content statically/SSR + metadata/sitemap |
| Fabricated/random verdicts | Contain now | Remove | Claims must be evidence-backed | `VERIFIED` (F1–F7) | Remove/contain all Category-3 paths (Phase 00) |
| Helius integration | Exists | Corrected: exists, AI still decides | — | `VERIFIED` telemetry; AI verdicts | Telemetry is evidence; deterministic verdict consumes it |
| Deterministic detection | Shared engine | `retinalShield` is real core | — | `VERIFIED` | One shared engine; AI explains only |
| Testing & CI | Add | Zero infra | — | `VERIFIED` none | Quality floor (Phase 00) |
| Extension priority | Primary | Flagship | Must be verifiable | Real detector present | Primary surface; pre-sign coverage separately designed |
| Solana vs EVM/RH | RH-first, keep Solana | Isolate Solana, add EVM | — | Solana logic is real | Chain-adapter; do not discard Solana |
| API security | Allowlist/auth/limits | Open proxy + unauth cache | — | `VERIFIED` | Harden `/api/*` (Phase 00) |
| Privacy claims | Match behavior | ZK/IndexedDB contradicts code | Transparency required | Mismatch | Rewrite privacy docs to reality |
| Branding/collision | Trademark review | PACOM + Base `$VIGIL` + Vigil ext | Disambiguation | `NEEDS VERIFICATION` | Sub-brand + trademark review before spend |
| Marketing | Evidence-led | Kill LARP; 0-follower reset | Evidence-backed | X account cold | Evidence-first; marketing follows product |
| Token timing | Gated | No token now | After integrity/traction/legal | No token exists | Deferred, conditional; utility test + gates |

---

## 5. Product doctrine (non-negotiable)

1. **Evidence** — never report a threat without real, reproducible evidence.
2. **Deterministic verdicts** — code produces classifications from evidence; never an LLM, never a random value.
3. **AI limits** — AI may explain established evidence; it must not create/modify/override a verdict.
4. **Simulations** — always visibly labelled; unlabelled simulation is isolated to `/lab`.
5. **Privacy** — user data stays local unless remote processing is necessary, secure, and disclosed; docs match data flow.
6. **User warnings** — every warning shows evidence; user can confirm/cancel/allowlist.
7. **False positives & negatives** — FP rate is a critical release metric; FN tracked via a discovery process; neither hidden.
8. **`UNKNOWN`** — insufficient evidence is `UNKNOWN`, never "safe."
9. **Chains** — keep Solana; add EVM/Robinhood behind an adapter; explicit unsupported-chain behavior.
10. **Public claims** — no accuracy/latency/adoption/partnership/protection claim without methodology, date, version, limits.
11. **Token status** — no official token/presale/airdrop exists; no token functionality without a separate approved gate.
12. **Robinhood references** — chain compatibility never implies partnership, endorsement, exchange listing, or a guaranteed token path.

---

## 6. Target product architecture

Target boundaries (do **not** force a disruptive migration before containment):

```
VIGIL-Core/
├── apps/{website, extension}
├── packages/{detection-engine, chain-adapters, threat-registry, shared-types}
├── contracts/   # only if Phase 09 approves
├── docs/  └── tests/
```

Three tracks: **immediate containment** (in-place edits; no restructure) → **incremental modularization** (extract shared `detection-engine` + `chain-adapters`, ending the `utils/` vs `VIGIL-FIELD-UNIT/core/` duplication) → **possible later directory restructuring** (monorepo layout, only after engine + tests are stable).

**AGENTS.md policy (verbatim):**
```
AGENTS.md remains local, untracked, protected, and untouched.
It must not be inspected as part of routine artifact classification and must
not be modified, moved, deleted, staged, committed, pushed, merged, or included
in broad cleanup.
```

---

## 7. Master implementation sequence

Dependency-driven. Effort ranges are **estimates only**, not deadlines. Every phase carries all 11 fields.

### Phase 00 — Repository control, evidence baseline & emergency containment  🟨
1. **Objective** — a safe, reproducible foundation; stop production paths exposing fabricated/bypassable/unsafe behavior.
2. **Rationale** — integrity precedes all product work; the credibility gap is the top risk.
3. **Dependencies** — none.
4. **Checklist** — ✅ account isolation/branch consolidation/worktree removal/`CLAUDE.md` (see §3.1); ⬜ classify the **three** authorized untracked artifacts (§8); ⬜ measured baseline (install/build/`tsc --noEmit`/audit); ⬜ contain F1–F7 (§3.7); ⬜ remove client Helius endpoint (`serviceWorker.js:5`) + rotate (separately authorized); ⬜ disable paid checkout (`Pricing.tsx`), unsigned handshake (`:121–130`), admin backdoor (`App.tsx`); ⬜ label remaining simulations / `/lab`; ⬜ API boundary: allowlist `/api/helius` ops, validate schema+chain/address, server-only `/api/cache` writes, bound pagination/size/timeout/cost, restrict `/api/openai` model+tokens, safe errors, privacy-conscious logging; ⬜ quality floor: TS deps, `tsc --noEmit`, ESLint+Prettier, Vitest, CI, `.env.example`, fix duplicate `vite`/`plugin-react`, triage advisories.
5. **Security requirements** — no client-distributed provider secret/endpoint; allowlisted, bounded, authenticated API operations; secret history scan.
6. **Privacy requirements** — logging without sensitive data; no new outbound data flows; cache not client-writable.
7. **Required evidence** — build log, typecheck log, audit output, containment diff, CI run.
8. **Acceptance criteria** — all Category-3 items disabled/contained; no client secret; `/api/*` bounded+validated; reproducible branch.
9. **Exit gate** — install/build/targeted-tests/security-checks run predictably; containment verified by re-inspection.
10. **Key risks** — breaking the build during containment; a missed reachable fabrication path.
11. **Out of scope** — monorepo migration; website redesign; new features; token work.

### Phase 01 — Deterministic detection kernel  ⬜
1. **Objective** — one deterministic, explainable address-poisoning engine shared by website + extension.
2. **Rationale** — the verdict is the product; it must be reproducible from evidence.
3. **Dependencies** — Phase 00 containment + quality floor.
4. **Checklist** — define verdict states (`SAFE`/`CAUTION`/`HIGH_RISK`/`UNKNOWN`/`ERROR`), evidence+confidence schema, fail-safe behavior, FP/FN measurement, registry provenance; capabilities (chain-aware validation, prefix/suffix + full-distance similarity, history provenance, first/last-seen, dust/zero-value, trusted-recipient recognition, allow/deny lists, canonical-asset verification, versioned rules, human-readable evidence, **no random/AI verdicts**); adapters (Solana, EVM/EIP-55, common interface); test corpus (confirmed poisoning, lookalikes, dust, clean repeats, new-legit, malformed, contracts, checksum, provider-failure, registry-tampering, FP-boundary); integration (review `poisoningDetector.ts` as candidate, keep only validated rules, wire real Helius provenance, remove forced `NEW`+fake latency, AI explains only, single engine everywhere).
5. **Security requirements** — deterministic path immune to AI/randomness; registry integrity; safe provider failure.
6. **Privacy requirements** — local-first analysis; minimized retained data; documented telemetry.
7. **Required evidence** — versioned test-corpus report (catches/misses/uncertain) + measured FP rate.
8. **Acceptance criteria** — corpus passes; FP documented; failure/unknown safe; verdicts reproducible from recorded evidence.
9. **Exit gate** — no AI/random controls a classification; engine consumed identically by both surfaces.
10. **Key risks** — false positives; magic-number thresholds (`retinalShield` entropy `<3.8`, similarity `>85`).
11. **Out of scope** — EVM feature depth beyond adapter; UI polish; store submission.

### Phase 02 — Chrome extension private alpha  ⬜
1. **Objective** — one focused feature: warn when an address/destination has suspicious evidence, pre-sign.
2. **Rationale** — protection at the decision point is the product.
3. **Dependencies** — Phase 01 engine.
4. **Checklist** — single purpose; detect addresses in relevant contexts; local analysis; safe/caution/high-risk/unknown with evidence; confirm/cancel/allowlist; fix `document_start`/`document.body` race; minimize `<all_urls>` → optional permissions; validate runtime messages+origins; remove duplicated detector (use shared engine); no sensitive data in unencrypted storage; pause + per-site controls; safe update/rollback; document outbound requests; FP-report flow; no embedded provider credential.
5. **Security requirements** — MV3 minimum permissions; message/origin validation; no privileged endpoint in client.
6. **Privacy requirements** — disclosed data handling; telemetry only with consent; local storage hygiene.
7. **Required evidence** — alpha test log; crash/FP records; permission-justification doc.
8. **Acceptance criteria** — no critical/high findings; no random/fabricated verdict; disclosure matches behavior; every permission justified.
9. **Exit gate** — emergency-disable + rollback tested; alpha stable.
10. **Key risks** — store distrust of a new security extension; pre-sign scope creep.
11. **Out of scope** — store submission; marketing launch; EVM depth beyond adapter.

### Phase 03 — Crawlable & truthful website  ⬜
1. **Objective** — a clear, accessible, crawlable product site around verified capabilities; facility → `/lab`.
2. **Rationale** — the site must be machine-readable, truthful, and consistent with the shipped extension.
3. **Dependencies** — Phase 02 alpha (claims match reality); a minimal holding page may precede.
4. **Checklist** — see §9 executable work packages.
5. **Security requirements** — CSP; security headers; no secrets in client; `security@` disclosure page.
6. **Privacy requirements** — accurate data-flow disclosure; consented analytics.
7. **Required evidence** — crawler fetch of essential content without JS; Lighthouse/a11y/perf reports.
8. **Acceptance criteria** — essential content understandable without JS; crawlers/social agents get correct info; claims match extension.
9. **Exit gate** — a11y/mobile/perf/security checks pass; post-deploy crawler verification passes.
10. **Key risks** — SSR migration regressions; residual unsupported claims.
11. **Out of scope** — token/marketing hype; unverified stats.

### Phase 04 — Extension beta & Chrome Web Store readiness  ⬜
1. **Objective** — a stable, privacy-compliant extension for public distribution.
2. **Rationale** — public trust requires measured stability + policy compliance.
3. **Dependencies** — Phases 02–03.
4. **Checklist** — beta users (provisional CTO target range 100–250 — requires owner approval & capacity review); crash-free + retention baselines; FP/override rates; privacy policy + data disclosures; permission justifications; store assets; support/incident channels; independent security review where feasible; submit; respond to review; publish V1 after release gate. Release gates rest primarily on representative coverage, absence of unresolved critical/high findings, measured false-positive behavior, stability, privacy compliance, and support capacity — not a fixed tester count.
5. **Security requirements** — reproducible, signed release; supply-chain controls; MV3 remote-code policy.
6. **Privacy requirements** — store data-handling disclosure matches behavior.
7. **Required evidence** — beta metrics; review correspondence; reproducible-build record.
8. **Acceptance criteria** — no critical/high findings; store policy ↔ behavior agree; docs match reviewed build.
9. **Exit gate** — support/incident processes live; rollback tested.
10. **Key risks** — store rejection on permissions/privacy; FP spikes at scale.
11. **Out of scope** — token; multi-chain breadth beyond adapter.

### Phase 05 — Evidence-led marketing & X/Twitter plan  ⬜ (runs in parallel from Phase 01)
1. **Objective** — build trust/distribution via threat education, real progress, verifiable evidence (see §11).
2. **Rationale** — marketing must follow, not outrun, product evidence.
3. **Dependencies** — real progress to show; claim-verification checklist.
4. **Checklist** — see §11 four-week plan + pillars + safeguards.
5. **Security requirements** — no exposure of unfixed vulnerabilities; coordinated disclosure respected.
6. **Privacy requirements** — no user PII in posts; consented testimonials only.
7. **Required evidence** — per-post evidence + reviewer sign-off.
8. **Acceptance criteria** — cadence sustained; no unsupported/manufactured claim published.
9. **Exit gate** — defamation firewall enforced; claim-risk review operating.
10. **Key risks** — overclaiming; defamation from named-project allegations.
11. **Out of scope** — token promotion; partnership claims; paid followers.

### Phase 06 — VIGIL Radar threat-data foundation  ⬜
1. **Objective** — a provenance-backed dataset + rule-improvement loop (not a simulated dashboard).
2. **Rationale** — the dataset is the durable moat.
3. **Dependencies** — Phase 01 engine.
4. **Checklist** — versioned threat-event schema; verified fixtures; signatures + provenance; canonical registries; FP reviews; rule-version history; researcher attribution + correction/appeal; integrity-protected registry releases; interface only after the data works.
5. **Security requirements** — integrity-protected/signed registry releases; tamper detection.
6. **Privacy requirements** — no user PII in shared records; provenance without exposure.
7. **Required evidence** — provenance per record; correction traceability; measured detector improvement.
8. **Acceptance criteria** — every public record has provenance; corrections traceable; registry changes reviewed/versioned.
9. **Exit gate** — Radar measurably improves detector quality.
10. **Key risks** — registry poisoning; unverified community submissions.
11. **Out of scope** — visual Radar UI before the data foundation works.

### Phase 07 — Robinhood Chain product integration  ⬜
1. **Objective** — make VIGIL useful on Robinhood Chain, independent of any token (see §12).
2. **Rationale** — serve a young EVM ecosystem's vulnerable users.
3. **Dependencies** — Phase 01 EVM adapter; §12 external-verification gate.
4. **Checklist** — chain config; validate EOA/contract addresses; EIP-55; calldata/simulation inspection; approval/allowance risk; contract-verification awareness; EVM-history poisoning evidence; token metadata; wallet compatibility; publish RH threat report; endorsement-avoiding disclaimers.
5. **Security requirements** — provider allowlist for EVM RPC; safe simulation; no privileged endpoint in client.
6. **Privacy requirements** — local-first EVM analysis where possible; disclosed remote calls.
7. **Required evidence** — chain-specific corpus report; verified-source external references.
8. **Acceptance criteria** — explainable RH warnings; safe provider-failure degradation.
9. **Exit gate** — docs distinguish chain support from partnership; external facts verified (§12).
10. **Key risks** — reliance on unverified chain facts; endorsement misperception.
11. **Out of scope** — any token; Robinhood partnership/listing claims.

### Phase 08 — Product traction & business validation  ⬜
1. **Objective** — prove users need/trust/repeatedly use VIGIL before token complexity (see §16).
2. **Rationale** — token discussion requires demand evidence.
3. **Dependencies** — Phases 02/04 usage.
4. **Checklist** — track KPIs (§16); evaluate non-token revenue (free extension, pro monitoring, wallet/dApp API, SDK, feeds, partnerships).
5. **Security requirements** — analytics without sensitive data; secure metrics pipeline.
6. **Privacy requirements** — consented, aggregated, anonymized metrics.
7. **Required evidence** — measured baselines; documented product-market evidence.
8. **Acceptance criteria** — meaningful repeated usage; FP within approved boundary; ≥1 sustainable non-token path evaluated.
9. **Exit gate** — honest product-market evidence documented.
10. **Key risks** — vanity metrics; premature monetization.
11. **Out of scope** — token; unproven partnership claims.

### Phase 09 — Formal token necessity, legal & economic review  ⬜ (gate, not a launch)
1. **Objective** — decide whether a token enables an essential capability unattainable more safely otherwise (see §13).
2. **Rationale** — a token is a decision, not a default.
3. **Dependencies** — Phase 08 traction; legal counsel.
4. **Checklist** — see §13 (utility test, legal, controls, collision review, NO-GO conditions).
5. **Security requirements** — no token contract or treasury deployment during the decision phase; no production keys or wallets created; no confidential legal or economic document exposed; threat assessment of governance, treasury, custody, impersonation, and market-manipulation risks.
6. **Privacy requirements** — protect identity, jurisdiction, legal, investor, contributor, and compliance information; collect only necessary review data; restrict access to confidential legal and compliance materials; do not publish personal or compliance information without authorization.
7. **Required evidence** — utility test result; legal memos; documented go/no-go.
8. **Acceptance criteria** — a documented NO-GO / DEFER / GO with rationale.
9. **Exit gate** — owner-approved decision recorded.
10. **Key risks** — speculation-driven pressure; legal exposure.
11. **Out of scope** — any contract/testnet/mainnet work; marketing.

### Phase 10 — Conditional token implementation (only if Phase 09 = GO)  ⬜
1. **Objective** — implement only a token justified and approved by Phase 09.
2. **Rationale** — locked unless a documented, owner-approved GO exists.
3. **Dependencies** — Phase 09 GO.
4. **Checklist** — minimal contract; no unnecessary admin/upgrade powers; invariant/unit/integration/fuzz tests; testnet; independent audit + re-audit; public test period; multisig + timelocks; published supply/allocation/vesting; verified source; mainnet only after sign-off; continuous monitoring; public incident response.
5. **Security requirements** — audited contract; multisig/timelock custody; no hidden mint/backdoor.
6. **Privacy requirements** — sanctions/KYC handling where applicable, disclosed.
7. **Required evidence** — audit reports; testnet results; published controls.
8. **Acceptance criteria** — all gates passed; independent launch-readiness review.
9. **Exit gate** — owner final sign-off.
10. **Key risks** — legal/market-manipulation; key compromise.
11. **Out of scope** — hype, price expectations, guaranteed listings, evasion tactics.
> **Disclosure:** deploying on Robinhood Chain ≠ listed/endorsed/partnered by Robinhood.

---

## 8. Immediate next actions

**Corrected sequence (repository preservation & consolidation are already complete — not unfinished):**
1. ⬜ Read-only classification of the **three authorized** untracked artifacts: `services/heliusService copy.bak.co`, `utils/poisoningDetector.ts`, `vigil_core_g.zip`. *(`AGENTS.md` excluded — protected, not inspected.)*
2. ⬜ Capture a reproducible baseline (install/build/typecheck/audit).
3. ⬜ Produce a complete reachability-aware containment inventory (extends §3.7).
4. ⬜ Obtain CTO approval of an exact file-by-file containment change list.
5. ⬜ Implement containment on `development`.
6. ⬜ Run proportional verification.
7. ⬜ Obtain CTO review of the diff + evidence.
8. ⬜ Commit and push only after separate authorization.
9. ⬜ Merge into `main` only through a later release gate.

**Must NOT do yet:** monorepo migration, website redesign, token work, broad feature development.

---

## 9. Website plan (executable work packages)

Every package: **Deliverable · Dependency · Evidence required · Acceptance criteria.**

| # | Work package | Deliverable | Dependency | Evidence | Acceptance |
|---|---|---|---|---|---|
| W1 | Content & claims inventory | List of every public claim + source | — | Inventory doc | Each claim mapped to evidence or removal |
| W2 | Rendering-architecture decision | SSR/prerender choice | W1 | Decision memo | Essential content server-rendered |
| W3 | Crawlable essential HTML | Static hero/product/limits | W2 | `curl` no-JS fetch | Content present without JS |
| W4 | No-JS behavior | Graceful no-JS page | W3 | Screenshot/fetch | Core message readable |
| W5 | Crawler behavior | Robots/sitemap correctness | W3 | Crawl log | Search/social agents get correct info |
| W6 | Title & metadata | `<title>`/description | W3 | HTML source | Present, accurate |
| W7 | Canonical tags | `<link rel=canonical>` | W3 | HTML source | Canonical correct |
| W8 | Sitemap | `sitemap.xml` | W5 | File + fetch | Valid, lists real URLs |
| W9 | Robots | `robots.txt` | W5 | File | Correct allow/deny |
| W10 | Structured data | JSON-LD | W6 | Rich-results test | Valid |
| W11 | Social previews | OG/Twitter cards | W6 | Preview render | Correct |
| W12 | Accessibility | a11y fixes | W3 | axe/Lighthouse | No critical a11y errors |
| W13 | Keyboard navigation | Focus states | W12 | Manual test | Fully navigable |
| W14 | Mobile behavior | Responsive layout | W3 | Device test | No horizontal scroll |
| W15 | Performance budgets | Budget doc | W2 | Lighthouse | Within budget |
| W16 | Bundle analysis & splitting | Analyzer report + splits | W2 | Report | Bundle reduced from baseline |
| W17 | Security headers | Header config | W2 | curl headers | Present |
| W18 | CSP | Content-Security-Policy | W17 | curl headers | Enforced, no violations |
| W19 | Privacy & data-flow disclosure | Privacy page matching code | §14 | Page + data-flow map | Matches reality (localStorage + server/AI/RPC) |
| W20 | Demo/simulation integrity | Labelled demos / `/lab` | §3.7 | Page review | No unlabelled simulation |
| W21 | Brand disambiguation | Footer disambiguation | §13 | Page review | Distinct from other "Vigil" products |
| W22 | Analytics consent | Consented analytics | W19 | Consent flow | Opt-in respected |
| W23 | Pre-deployment checks | Checklist run | all | CI log | All checks pass |
| W24 | Post-deployment crawler verification | Live crawl | W23 | Crawl log | Live content indexable |
| W25 | Rollback criteria | Rollback plan | W23 | Doc | Tested rollback path |

---

## 10. Chrome extension plan (executable work packages)

> **Explicit scope statement:** *The existing extension scans page addresses, but this alone does not prove wallet-level pre-sign interception. Pre-sign coverage must be separately designed, implemented, and verified.*

Every package: **Deliverable · Dependency · Evidence · Acceptance.**

| # | Work package | Deliverable | Dependency | Evidence | Acceptance |
|---|---|---|---|---|---|
| X1 | Current threat model | Extension threat model doc | — | Doc | Reviewed |
| X2 | Active-script & reachability inventory | Map of content/HUD/SW paths | X1 | Inventory | Every reachable path listed |
| X3 | Emergency fabrication containment | F1–F4 removed | §3.7 | Diff | No Category-3 path remains |
| X4 | Deterministic-engine integration | Shared engine wired in | Phase 01 | Test log | Single engine, no duplication |
| X5 | Preserve validated Solana logic | Kept rules behind adapter | X4 | Test | Solana verdicts unchanged where valid |
| X6 | Solana adapter | Adapter module | X4 | Fixtures | Passes Solana corpus |
| X7 | EVM/Robinhood adapter | Adapter module | X4, §12 | Fixtures | Passes EVM corpus |
| X8 | Pre-sign interception boundary | Design + implementation of wallet-level hook | X1 | Design + test | Verified pre-sign coverage (not just page scan) |
| X9 | Address-context detection | Context classifier | X4 | Fixtures | Correct context handling |
| X10 | Warning states | safe/caution/high/unknown UI | X4 | UI review | Evidence shown per state |
| X11 | Evidence UX | Evidence panel | X10 | UI review | Every warning explains itself |
| X12 | Override & allowlisting | User controls | X10 | UI test | Confirm/cancel/allowlist work |
| X13 | Minimal permissions | Reduced manifest | X2 | Manifest diff | `<all_urls>` minimized/optional |
| X14 | External-message validation | Message/origin checks | X2 | Test | Unsigned handshake rejected |
| X15 | Storage & privacy | No sensitive plaintext | X1 | Review | Sensitive data protected |
| X16 | API authentication | Authenticated `/api/*` | Phase 00 | Test | No client provider secret |
| X17 | Provider failure | Safe degradation | X16 | Test | Fails to `UNKNOWN`, not fake |
| X18 | False-positive reporting | Report flow | X11 | Test | FP captured |
| X19 | Fixtures | Test corpus | Phase 01 | Corpus | Reproducible |
| X20 | Regression tests | Test suite | X19 | CI | Green on shared corpus |
| X21 | Private alpha | Provisional CTO target range (10–25) — requires owner approval & capacity review | X3–X17 | Test log | Representative coverage; no unresolved critical/high findings; measured FP behavior; stability |
| X22 | Beta | Provisional CTO target range (100–250) — requires owner approval & capacity review | X21 | Metrics | Coverage; no unresolved critical/high; FP behavior; stability; privacy compliance; support capacity |
| X23 | Store readiness | Assets + policy docs | X22 | Submission | Policy ↔ behavior agree |
| X24 | Reproducible release build | Build artifact | X23 | Build record | Reproducible |
| X25 | Release signing | Signed release | X24 | Signature | Verified |
| X26 | Emergency disable & rollback | Kill-switch + rollback | X24 | Test | Verified |

---

## 11. Marketing & X/Twitter plan

**Positioning:** *"the last safety check before an on-chain action becomes irreversible."*
**Pillars:** threat education · build-in-public · verified fixture demonstrations · privacy/security explanations · weekly progress · Robinhood Chain technical research · extension alpha recruitment.

**Four-week draft content plan** — `CTO recommendation awaiting owner approval`. Account context: returning after ~5 months of inactivity; the **first return post must not claim unimplemented features exist** (use "we are building" / "VIGIL is being rebuilt" until verified).

| Week/Day | Pillar | Objective | Required evidence | Draft hook/angle | Visual/demo | CTA | Claim-risk | Reviewer | Publication gate |
|---|---|---|---|---|---|---|---|---|---|
| W1 Mon | Robinhood Chain threat education + VIGIL reintroduction | Return after ~5 months with an evidence-led warning: permissionless chain deployment ≠ Robinhood endorsement or listing | Official Robinhood Chain docs; official confirmation for any compromised-account claim; Blockscout contract+tx evidence; independently reproducible on-chain calculations; human review of attribution & financial figures | "The chain is real. 'Official' does not automatically mean safe." + "We are rebuilding VIGIL to provide the check before you sign." | Editorial security infographic — verified claims only | Follow the rebuild; inspect the cited evidence | **HIGH** | Owner + CTO | Every named incident, account-compromise claim, transaction, contract, volume, fee, dump, liquidity, token, airdrop, and Robinhood statement independently verified & cited |
| W1 Wed | Threat education | Explain poisoning | Public research | "How address poisoning uses your own history against you" | Diagram (labelled) | — | Low | CTO | Evidence check |
| W1 Fri | Privacy/security | State doctrine | Doctrine §5 | "Why we say UNKNOWN, never 'safe'" | none | — | Low | CTO | — |
| W1 Sun | Weekly progress | Show real work | Commit log | "Week 1: containment of fabricated paths" | Redacted diff summary | — | Low | Owner | No secret |
| W2 Mon | Threat education | Lookalike attacks | Synthetic fixture | "Two addresses, same ends, different middle" | Labelled synthetic example | — | Low | CTO | Fixture only |
| W2 Wed | Build-in-public | Deterministic engine | Test-corpus doc | "Verdicts come from code, not a vibe" | none | — | Med | CTO | Evidence check |
| W2 Fri | Verified fixture demo | Show detection | Passing fixture | "Detector flags a synthetic poisoning case" | Screen recording of a labelled fixture | — | Med | CTO | Human review |
| W2 Sun | Weekly progress | Methodology | FP report | "How we measure false positives" | Chart from real test run | — | Med | Owner | Data verified |
| W3 Mon | Privacy/security | Local-first | Data-flow map | "What leaves your browser — and what doesn't" | Data-flow diagram | — | Med | CTO | Matches code |
| W3 Wed | Build-in-public | Extension preview | Alpha build | "The warning you'll see before you sign" | UI screenshot (real) | Alpha waitlist | Med | Owner | Feature exists |
| W3 Fri | Verified fixture demo | Approval/drainer edu | Fixture | "Why infinite approvals are dangerous" | Labelled demo | — | Med | CTO | Human review |
| W3 Sun | Weekly progress | Limitations | Known-issues list | "What VIGIL does NOT do yet" | none | — | Low | Owner | — |
| W4 Mon | RH technical research | Chain support (guarded) | §12-verified facts | "Building EVM support; Robinhood Chain is a target" | none | — | **High** | Owner+CTO | External facts verified; no partnership implied |
| W4 Wed | Extension alpha recruitment | Recruit testers | Alpha build | "Join the private alpha (limited cohort)" | UI screenshot | Apply | Med | Owner | Feature exists; cohort size per owner approval |
| W4 Fri | Verified fixture demo | Evidence-first recap | Fixtures | "Every warning shows its evidence" | Recording | — | Med | CTO | Human review |
| W4 Sun | Weekly progress | Month recap + next | Commit log | "Month 1 recap; what's next" | Progress summary | Follow | Low | Owner | — |

**First-return-post gates (owner-aligned).** The first post is the Robinhood Chain security post above. **Prohibited until methodology and the underlying transactions are independently verified and cited:** any volume, fee, dump, or liquidity estimate (including figures from the Grok draft) — these must **not** be presented as established facts in this plan or in any post. Do **not** claim VIGIL already supports transaction decoding, honeypot detection, vanishing-token detection, or wallet-level pre-sign interception; describe these only as **target capabilities under development**. The generic "we went quiet — we are rebuilding" message is retained as an **optional supporting reply or second post**, not the primary return post.

**Reusable formats:** (a) *threat education* — attack → why it works → how to spot it; (b) *build-in-public* — what changed + evidence + what's next; (c) *verified fixture demo* — labelled synthetic case + detector output + disclaimer; (d) *privacy/security explanation* — claim + data-flow evidence; (e) *weekly progress* — done/observed/next; (f) *RH technical research* — verified facts only + explicit no-partnership disclaimer; (g) *alpha recruitment* — real screenshot + honest scope.

**Do not invent:** transaction hashes · victim stories · performance numbers · user counts · accuracy rates · partnerships · endorsements · test results · token statistics. Named-project allegations, scam labels, exploit attribution, and financial figures require **human review + documented evidence** (defamation firewall). **Marketing follows product evidence.**

---

## 12. Robinhood Chain plan

Tracks: technical compatibility · testnet evaluation · wallet/tx UX · chain adapter · threat fixtures · partnership outreach · ecosystem participation · production-support gate.

**Research gate — `NEEDS CURRENT EXTERNAL VERIFICATION`.** Official primary sources are required **before**: choosing chain configuration; publishing chain IDs or RPC info; making ecosystem claims; making partnership claims; publishing token/airdrop statements; finalizing Robinhood-focused marketing. Do not rely on prior-session memory for any time-sensitive fact.

**Non-negotiable:** technical chain support never implies Robinhood partnership, endorsement, listing, or exchange access.

---

## 13. Token decision framework (gate, not a promise)

- **Utility test** — define the essential capability; compare token vs non-token (points/USDC/DB/signed credentials); demonstrate real demand; reject utility that mainly justifies fundraising/speculation.
- **Legal** — entity; securities/crypto classification memo; tax advice; sanctions/AML/KYC; consumer-protection & marketing review (owner in India → jurisdiction-specific).
- **Name/impersonation** — `NEEDS VERIFICATION`: record Base `$VIGIL` facts (contract, deployer, activity, affiliation) + "Vigil" trademark/store collisions before weighting.
- **Controls** — governance & treasury; minimal contract; independent audit + re-audit; multisig + timelocks/key management; distribution & vesting; market-manipulation protections; incident response; testnet & mainnet gates.
- **Explicit NO-GO conditions** — any of: no essential token utility · insufficient product traction · unresolved legal classification · unresolved branding/token collision · unaudited contracts · unsafe treasury/key controls · misleading partnership/listing assumptions · inability to meet compliance obligations.
- **Excluded** — hype tactics, price expectations, guaranteed listings, evasion advice.

---

## 14. Security program
Threat model (web/API/extension supply chain) · secrets inventory + rotation (start: the exposed Helius endpoint) · never distribute secrets to clients · API allowlists · authN/authZ · rate limits + cost ceilings · timeouts · cache integrity (server-only writes) · dependency + secret scanning in CI · secure privacy-conscious logging · disclosure policy (keep `security@vigilcore.org`) · release signing · Chrome extension supply-chain security · audit strategy · incident response.

## 15. Quality & release program
Deterministic installs (fix duplicate deps/lockfile) · TypeScript gate · lint + format · unit/integration/extension/e2e tests · detector fixtures · CI checks · branch-protection recommendation on `main`/`development` (note: `main` auto-deploys via Vercel) · code review · release checklist · rollback plan · evidence retention.

## 16. KPI & evidence framework
Define methodology; **do not invent baselines/targets** — mark absent values as requiring measurement/owner approval.
⭐ False-positive rate (primary) · false-negative discovery process · precision/recall where datasets permit · warning acceptance vs override rate · extension activation & retention · protected-action count · performance overhead · API reliability · crawler/indexability · incident rate · marketing conversion · user-trust signals.

## 17. Risk register

| Risk | Severity | Likelihood | Evidence | Mitigation | Owner | Trigger | Status |
|---|---|---|---|---|---|---|---|
| False-positive warnings | High | Med | magic-number thresholds | corpus + evidence + `UNKNOWN` | Eng | FP report | ⚠️ |
| Fabricated/random intelligence | Critical | Present | F1–F7 `VERIFIED` | emergency containment | Eng | prod exposure | ⚠️ |
| Corrupted user metric (`VIG_TOTAL_POISONS`) | High | Present | F4 `VERIFIED` | fix increment logic | Eng | any HUD open | ⚠️ |
| Client-distributed provider endpoint | High | Present | `serviceWorker.js:5` | remove + rotate | Eng/Owner | extraction | ⚠️ |
| Provider/API abuse | High | Med | open proxy + unauth cache | allowlist/auth/limits | Eng | cost spike | ⚠️ |
| Incorrect canonical registry | High | Present | `addressValidator.js:8` | correct after official verification | Eng | wrong trust | ⚠️ |
| Privacy-claim mismatch | Med | Present | README/context vs code | data-flow audit + rewrite | Eng/Owner | store/legal review | ⚠️ |
| Brand collision | Med | Likely | `NEEDS VERIFICATION` | trademark/naming review | Owner | marketing spend | ⚠️ |
| Premature token launch | High | Gated | policy | locked gate (Phase 09) | Owner | external pressure | ⚠️ |
| Unsupported Robinhood claims | High | Possible | policy | explicit disclosure + §12 gate | Owner | marketing copy | ⚠️ |
| No test/CI safety net | High | Present | `VERIFIED` none | quality floor | Eng | regression | ⚠️ |
| Committed secret in history | High | Unknown | `NEEDS VERIFICATION` | history scan + rotation | Eng | disclosure | ⚠️ |
| Pre-sign coverage assumed but absent | High | Present | page-scan ≠ pre-sign | design + verify (X8) | Eng | overclaim | ⚠️ |

## 18. Decision log

### A. Active owner-approved decisions
Canonical checkout only; no routine isolated worktree; only `development` + `main`; `development` = implementation; `main` = stable/release; no direct product work on `main` without explicit authorization; VIGIL uses the `github-vigil` SSH identity; BourseWire isolated; `CLAUDE.md` tracked on `development`; `AGENTS.md` local/untracked/protected; no fabricated verdicts/metrics/evidence/partnerships/adoption; AI must not create the verdict; no official token currently; token work gated & unapproved; Robinhood Chain integration implies no partnership/endorsement/listing; the Chrome extension is the primary protection surface; false-positive risk is a critical metric.

### B. Historical completed decisions
`playground` was selected as the consolidation source at `f3b331c`; its retained work moved into `development`; `development` merged into `main`; `playground` and the Claude worktree retired after preservation; only `development` and `main` now remain. *(`playground` is not an active branch or current policy.)*

### C. CTO recommendations awaiting owner confirmation
Exact shared-engine package structure; complete `apps/`+`packages/` monorepo layout; moving the Facility to `/lab`; exact marketing cadence (the four-week plan in §11); exact analytics provider; exact EVM/Robinhood rollout scope; exact commercial model. *(None are marked ✅; they are proposals.)*

## 19. Evidence ledger & requirements traceability

### 19.1 Evidence ledger

| Finding | Source | Repo file / doc | Evidence status | Date | Implication |
|---|---|---|---|---|---|
| Deterministic detector exists | Claude/CTO | `content/retinalShield.js` | VERIFIED | 2026-09-03 | Engine seed |
| Real Helius layer exists | Claude/CTO | `api/helius.ts`, `services/heliusService.ts` | VERIFIED | 2026-09-03 | Evidence, not verdict |
| AI generates verdicts | Claude | `api/gemini.ts`, `api/openai.ts` | VERIFIED | 2026-09-03 | Remove verdict gen |
| Fake campaign / random trap | Claude | `serviceWorker.js:24,75` | VERIFIED | 2026-09-03 | Contain |
| Random rug-risk + hardcoded forensics | CTO/Claude | `AlertMarketIntel.js:12,14,111` | VERIFIED | 2026-09-03 | Contain |
| Corrupted poison metric | CTO/Claude | `serviceWorker.js:113`; `retinalShield.js:172` | VERIFIED | 2026-09-03 | Fix increment |
| Client Helius endpoint | Claude | `serviceWorker.js:5` | VERIFIED (redacted) | 2026-09-03 | Remove + rotate |
| Inconsistent USDC value | Claude | `core/addressValidator.js:8` | VERIFIED (value) / NEEDS OFFICIAL EXTERNAL VERIFICATION (replacement) | 2026-09-03 | Correct after official check |
| Forced `NEW` | Claude/CTO | `IntentValidatorDemo.tsx:545` | VERIFIED | 2026-09-03 | Deterministic verdict |
| Open proxy / unauth cache | Claude | `api/helius.ts:25`; `api/cache.ts:34` | VERIFIED | 2026-09-03 | Allowlist + server-only |
| Duplicate deps | Claude | `package.json` | VERIFIED | 2026-09-03 | Deterministic installs |
| Zero test/CI/lint | Claude/CTO | repo root | VERIFIED | 2026-09-03 | Quality floor |
| No SSR / crawlability | Grok/Claude | `index.html` | PARTIALLY VERIFIED | 2026-09-03 | SSR essential content |
| Privacy docs contradict code | Docs | README/VIGIL_CONTEXT | VERIFIED (mismatch) | 2026-09-03 | Rewrite |
| TS errors / bundle / advisories | CTO/Claude | build+audit | NEEDS VERIFICATION | — | Measure |
| Robinhood facts | Web (earlier) | external | NEEDS CURRENT EXTERNAL VERIFICATION | — | Re-verify |
| Base `$VIGIL` / trademark | Grok/Claude | external | NEEDS VERIFICATION | — | Record first |

### 19.2 Requirements traceability (critical Phase 00 findings)

| Finding | Evidence status | Phase | Planned task | Acceptance evidence | Release gate |
|---|---|---|---|---|---|
| `VIGIL-FIELD-UNIT/background/serviceWorker.js:24` fake campaign | VERIFIED | 00 | Remove timer | No `GLOBAL_CAMPAIGN_SIGNAL` emitted | Phase 00 exit |
| `VIGIL-FIELD-UNIT/background/serviceWorker.js:75` random trap | VERIFIED | 00 | Remove random verdict | No random verdict path | Phase 00 exit |
| `VIGIL-FIELD-UNIT/content/ui/AlertMarketIntel.js:12` random rug-risk | VERIFIED | 00 | Remove/replace + `/lab` | HUD shows evidence or labelled demo | Phase 00 exit |
| `VIGIL-FIELD-UNIT/background/serviceWorker.js:113` corrupted metric | VERIFIED | 00 | Fix increment to real poison only | Counter changes only on poison | Phase 00 exit |
| `VIGIL-FIELD-UNIT/background/serviceWorker.js:5` client endpoint | VERIFIED | 00 | Remove + rotate | No endpoint in client bundle | Phase 00 exit |
| `VIGIL-FIELD-UNIT/core/addressValidator.js:8` USDC value | VERIFIED / NEEDS OFFICIAL EXTERNAL VERIFICATION | 00/01 | Correct after official check | Value matches authoritative source | Phase 01 exit |
| `api/gemini.ts` / `api/openai.ts` AI verdicts | VERIFIED | 00/01 | Remove verdict generation | No verdict field returned | Phase 01 exit |
| `components/IntentValidatorDemo.tsx:545` forced `NEW` | VERIFIED | 01 | Deterministic verdict | Evidence-derived states | Phase 01 exit |
| `api/helius.ts:25` open proxy | VERIFIED | 00 | Allowlist operations | Only allowlisted ops succeed | Phase 00 exit |
| `api/cache.ts:34` unauth `set` | VERIFIED | 00 | Server-only writes | Client `set` rejected | Phase 00 exit |
| `components/Pricing.tsx` client entitlement | VERIFIED | 00 | Disable checkout | Path disabled | Phase 00 exit |
| `VIGIL-FIELD-UNIT/background/serviceWorker.js:121` unsigned handshake | VERIFIED | 00 | Disable/require signature | Unsigned handshake rejected | Phase 00 exit |
| `package.json` duplicate `vite` | VERIFIED | 00 | Deduplicate | Deterministic install | Phase 00 exit |
| No test/CI/lint | VERIFIED | 00 | Add quality floor | CI green | Phase 00 exit |

## 20. Change log

| Version | Date | Summary |
|---|---|---|
| Version 1.0.1 | 2026-09-03 | Clarified immutable baseline and adoption references so the plan does not contain a self-invalidating "current HEAD" field. |
| Version 1.0 | 2026-09-03 | Draft 1.2 approved by Ajmal Fahad and the CTO and adopted as the single canonical VIGIL master plan. |
| Draft 1.2 | 2026-09-03 | Owner-alignment: first return post set to the gated Robinhood Chain security post (HIGH claim-risk, Owner+CTO reviewers, full verification/citation gate); prohibited unsupported volume/fee/dump/liquidity figures as facts; capabilities (tx decoding, honeypot, vanishing-token, wallet-level pre-sign) marked target/under-development; alpha/beta counts (10–25 / 100–250) relabelled provisional CTO target ranges pending owner approval & capacity review; Phase 09 security/privacy requirements made substantive (no contract/treasury/keys; protect legal/compliance/identity data); added source-of-truth rule (canonical only after owner approval + commit). All prior corrections preserved. Status: Final Owner Approval Required. |
| Draft 1.1 | 2026-09-03 | Expanded all Phase 00–10 with 11 fields; added documentation-reconciliation table (§3.6); added reachability-aware fabrication inventory (§3.7) incl. newly found `AlertMarketIntel.js` random rug-risk and `VIG_TOTAL_POISONS` corruption; split USDC evidence (verified value / needs official external verification); reclassified Decision Log into A/B/C; excluded `AGENTS.md` from inspection with verbatim policy; corrected the immediate sequence; added executable website (§9) and extension (§10) work packages incl. pre-sign scope statement; replaced the campaign with a four-week X plan (§11); added requirements traceability (§19.2); qualified uncertain claims (removed "all major integrity claims verified"). Status: CTO Review Required. |
| Draft 1.0 | 2026-09-03 | Initial consolidated plan reconciling CTO/Claude/Grok reviews against the current tree. |

**How to update:** change a `⬜`→`🟨`→`🟦`→`✅` only with linked evidence; add a Decision Log row (A/B/C) for material choices; append a Change Log row per revision; move findings between §3 buckets as evidence changes; never mark `✅` without verification.
