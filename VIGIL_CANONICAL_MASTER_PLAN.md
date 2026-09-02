# VIGIL Core — Canonical Master Plan

> **Version:** 1.0.2 — Owner and CTO Approved
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
| Status | 1.0.2 — Owner and CTO Approved · Approved canonical master plan |

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

**Progress-control rule.**

- Chat memory is **not** the source of truth. This canonical document is the durable project record.
- *Implemented*, *statically verified*, *runtime verified*, *committed*, *pushed*, *deployed*, and *release verified* are **separate statuses**. Reaching one never implies another.
- A finding receives a final ✅ only after its required acceptance evidence exists **and** CTO review is complete.
- Every deferred item carries a **named blocker** and a **target phase**.
- Status never advances automatically. Absent evidence, an item stays where it is.

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
- ✅ `VERIFIED` — `utils/poisoningDetector.ts` preserved (SHA-256 `c174cd08…acccc97`), untracked; **reviewed in Task 006** and classified a deterministic Solana **candidate** — not integrated.
- ✅ `VERIFIED` — Root `CLAUDE.md` charter created, committed (`5f0dd69`), pushed to `origin/development`.

> **Phase 00 status.** The repository foundation, artifact classification, technical baseline, and the F1–F23 inventory are **complete**. Extension containment is **implemented, statically checked, and committed locally** (`3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`), but remains **unpushed, undeployed, and not browser/runtime verified**. API, website, simulation, quality-floor, CI, and the final Phase 00 gates remain **open**. See §3.9.

### 3.2 Product assets carried forward (qualified)
- 🟨 `PARTIALLY VERIFIED` — **Legacy deterministic heuristic prototype**: `VIGIL-FIELD-UNIT/content/retinalShield.js` `analyzeAddress()`. It contains **unvalidated entropy/similarity thresholds**, contained the **F21 domain-only phishing logic**, and its active reachability was **disabled by Task 013-R1**. It is **not production-valid**. Candidate concepts may inform Phase 01; **the implementation is not an approved detector.**
- 🟨 `PARTIALLY VERIFIED` — **Telemetry plumbing exists**: `api/helius.ts` (server-side keyed proxy) + `services/heliusService.ts` provide real provider plumbing, **but the API boundary remains unsafe/open (F12, F19) and is not production-approved.**
- ✅ `VERIFIED` — Shared primitives present: `utils/addressValidator.ts`, `addressDiff.ts`, `threatIndex.ts`, `scoring.ts` — thresholds unvalidated; Phase 01 owns validation.
- ✅ `VERIFIED` — Grounded search: `MeshQueryTerminal` (candidate for explain-only / `/lab`).
- 🟨 `PARTIALLY VERIFIED` — `utils/poisoningDetector.ts` (untracked): reviewed and classified a deterministic Solana candidate; **requires Phase 01 fixtures, threshold calibration, and a measured false-positive rate** before any integration.

### 3.3 Verified risks (see §3.7 primary ledger for detail)
Fabricated campaign, random verdicts (service worker **and** `AlertMarketIntel.js`), corrupted user metric, credential-bearing provider endpoint, incorrect USDC registry, AI-generated verdicts, forced `NEW`, open Helius proxy, unauthenticated cache writes, client-manipulable paid tier, unsigned handshake, admin backdoor, zero quality infra, duplicate deps, placeholder market math. All `VERIFIED`. **Line references recorded in §3.7 are pre-containment locations**; Task 013/013-R1 deleted or shifted code in the seven extension files.

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

### 3.7 Primary finding ledger — F1–F23 (single source; each ID appears once)

**Category key:** (1) clearly labelled harmless demo randomness · (2) unlabelled simulation needing disclosure/`/lab` isolation · (3) affects a verdict, warning, score, security evidence, telemetry, campaign, forensic conclusion, entitlement, or user metric. Not every `Math.random()` is a vulnerability; only reachable, user-impacting cases are Category 3.

**Status key:** `CONTAINED-COMMIT` = *contained and committed locally in `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` — static checks and production build passed — push, browser/runtime verification, deployment and release verification pending*. `OPEN` = not yet contained. Reachability is stated **as of Task 012 (pre-containment)**; live deployed reachability remains unverified.

| ID | File(s) | Finding | Reachability (pre-containment) | Cat | Current status | Containment / target batch | Acceptance evidence | Remaining limitation / blocker |
|---|---|---|---|---|---|---|---|---|
| F1 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | Fabricated global campaign timer + payload | Conditional (required `VIG_NODE_VERIFIED`, set only via F15) | 3 | **CONTAINED-COMMIT** | Task 013 | `GLOBAL_CAMPAIGN_SIGNAL`, `INDUSTRIALIZED` absent; build pass | Push + runtime verification |
| F2 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | Random concentration-trap verdict + fabricated forensic fields | Conditional (paid tier via F15) | 3 | **CONTAINED-COMMIT** | Task 013 | `isAccumulationTrap`, `motherWallet` absent | Push + runtime verification |
| F3 | `VIGIL-FIELD-UNIT/content/ui/AlertMarketIntel.js` | Random rug-risk decision + hardcoded holder/bundling/dev/mcap metrics + proceed-or-abort recommendation | Conditional (discovery domain + non-BASELINE tier) | 3 | **CONTAINED-COMMIT** — replaced with labelled unavailable state | Task 013 | `isRugRisk`, `rug-pulls` absent; zero `Math.random` extension-wide | Push + runtime verification |
| F4 | `retinalShield.js` → `serviceWorker.js` | `THREAT_LOG` on any HUD open mutated `VIG_TOTAL_POISONS` / `VIG_USER_BRI` regardless of verdict | Currently reachable | 3 | **CONTAINED-COMMIT** | Task 013 / 013-R1 | `THREAT_LOG`, `updateLocalIntelligence` absent; invalid keys **removed**, not re-initialised | Push + runtime verification |
| F5 | `api/gemini.ts`, `api/openai.ts` | AI-generated risk/reputation/honeypot/Sybil verdicts from an address alone | Currently reachable | 3 | **OPEN** | API containment batch | — | **Verdict endpoints can be disabled during Phase 00.** Only the *honest replacement* requires the Phase 01 engine — that is not a blocker to containment |
| F6 | `components/IntentValidatorDemo.tsx` | Forced `NEW` verdict for real addresses + fabricated `9.2–11.3 ms` latency shown as measurement | Currently reachable | 3 | **OPEN** | Website containment batch | — | **Forced `NEW` and fabricated latency can be removed/suppressed now.** Only the evidence-derived replacement requires Phase 01 |
| F7 | `utils/marketMath.ts` | Hardcoded distribution `{top10:1,top20:3,top50:12}` + placeholder bundling presented as analysis | Conditional | 2/3 | **OPEN** | Website containment batch | — | **Hardcoded values can be removed or hidden now.** Only real distribution requires validated holder data later |
| F8 | `components/Pricing.tsx` | **Dangerous dead payment code** — placeholder treasury address, `PLEASE_REPLACE…` extension id, `localStorage` entitlement with no server verification | **Apparently unreachable** (0 imports) | 3 | **OPEN** (dead code, **not** an active payment vulnerability) | Simulation/dead-code batch | — | Must not be revived without a full rewrite |
| F9 | `App.tsx` | Client-side admin backdoor (hardcoded unlock code → `localStorage` master auth) | Currently reachable | 3 | **OPEN** | Website containment batch | — | **Can be removed/disabled now.** Server-side authorization is required only if an admin feature is later restored |
| F10 | `App.tsx` | `?mode=standalone_kernel` query-parameter gating bypass | Currently reachable | **2 (presentation/gating, not an emergency vulnerability)** | **OPEN** | Simulation/dead-code batch | — | Relabel / isolate |
| F11 | `api/openai.ts` | `generateText` lets the client choose `model` and `maxTokens` — uncapped provider cost | Currently reachable | 3 (cost) | **OPEN** | API containment batch | — | Needs auth + model allowlist + token cap |
| F12 | `api/helius.ts` | Open proxy — arbitrary `rpcMethod`/`rpcParams` and arbitrary `endpoint`/`method` executed with the server-side key | Currently reachable | 3 | **OPEN** | API containment batch | — | Must land **before/with** any extension re-route |
| F13 | `api/cache.ts` | Unauthenticated cache `set` — cache poisoning | Currently reachable | 3 | **OPEN** | API containment batch | — | Needs server-only writes |
| F14 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | **Credential-bearing provider endpoint** distributed inside the extension | Currently reachable | 3 | **CONTAINED-COMMIT** | Task 013 | `HELIUS_SECURE_LINK`, provider hostname absent | Provider-side credential rotation remains an **owner action**; **not proven leaked** |
| F15 | `serviceWorker.js`, `manifest.json` | Unsigned external entitlement handshake self-granting paid tier | Conditional — externally reachable **only through the configured Googleusercontent scope** | 3 | **CONTAINED-COMMIT** | Task 013 / 013-R1 | `onMessageExternal`, `VIGIL_HANDSHAKE_ACTIVATE`, `externally_connectable` absent | Push + runtime verification |
| F16 | `VIGIL-FIELD-UNIT/core/addressValidator.js` | Incorrect USDC value auto-trusted as a canonical mint | Currently reachable | 3 | **CONTAINED-COMMIT** — the **unsafe auto-trust behaviour is contained by removal**; no replacement asserted | Task 013 | Prior value absent; remaining registry unchanged | Authoritative replacement is **separately pending** (`NEEDS OFFICIAL EXTERNAL VERIFICATION`) — not a blocker to the containment already applied |
| F17 | `EntropyCollider.tsx`, `SiloGate.tsx`, `NeuralAttentionalAudit.tsx` | Training-game randomness using production threat vocabulary without an explicit simulation label | Currently reachable | 2 | **OPEN** | Simulation/dead-code batch | — | Relabel / `/lab` isolation |
| F18 | `components/IntelligenceForge.tsx` | Randomly assigned "cluster" presented as global threat intelligence | Currently reachable | 2/3 | **OPEN** | Simulation/dead-code batch | — | Relabel or replace with evidence |
| F19 | `services/heliusService.ts` | Provider-call ceiling of 50 × 500 signatures plus parse batches | Currently reachable | 3 (cost) | **OPEN** | API containment batch | — | **Worst-case static upper bound — not measured real-world spend** |
| F20 | `services/heliusService.ts` | Privacy-adjacent debug logging of address/cursor material | Currently reachable | 2 | **OPEN** | API containment batch | — | Gate behind a debug flag |
| F21 | `VIGIL-FIELD-UNIT/content/retinalShield.js` | Domain-only automatic `PHISHING` verdict — returned purely from the host name, with no address evidence | Currently reachable (pre-containment) | 3 | **CONTAINED-COMMIT by reachability removal** | Task 013-R1 | `content_scripts` absent → script never injected | **Underlying heuristic is NOT fixed** — disabled and deferred to Phase 01 |
| F22 | `popup/popup.html`, `popup/popup.js`, `serviceWorker.js` | Invented/unvalidated popup metrics and operational claims (resilience %, trusted/poison/mesh/VCI counts, "secure relay stable", "telemetry stream listening") | Currently reachable | 3 | **CONTAINED-COMMIT** | Task 013-R1 | Popup is a static honest state; 7 invalid metric keys removed from storage | Push + runtime verification |
| F23 | `popup/popup.html`, `popup/popup.js` | Obsolete external activation UI (handshake button + command-centre link) still reachable after the backend handshake was removed | Currently reachable | 3 | **CONTAINED-COMMIT** | Task 013-R1 | Handshake UI and external URL absent from the reachable surface | Push + runtime verification |

Non-security randomness (visual/demo) is Category 1 and out of emergency-containment scope unless it feeds an entry above.

### 3.8 Task execution ledger (Tasks 001–014)

| Task | Objective | Status | Evidence / commit | Changed code | Committed / pushed | Follow-up |
|---|---|---|---|---|---|---|
| 001 | Create repository-root `CLAUDE.md` operating charter | ✅ | file created, 16 sections | **Documentation only — no product code** | Later, in 002/003 | — |
| 002 | Commit `CLAUDE.md` locally | ✅ | `5f0dd69d82dd7da74a0e62fad763c76d4d5c9869` | No | Committed | — |
| 003 | Publish the charter | ✅ | pushed to `origin/development` | No | Pushed | — |
| 004 (+R1, R2) | Synthesize and correct the canonical master plan from CTO, Claude, Grok and repository evidence | ✅ | Draft 1.0 → 1.1 → 1.2 | Yes (docs) | Later, in 005 | — |
| 005 (+R1, R2) | Owner approval, canonical adoption, metadata correction, publication | ✅ | `d10729d752acb263535a9c841a44f70391f44850`, `2daf67e9866955d1bbe1d724a0c87221e4da4438`, `4999d59d4e683c2e57f133f656b74c88c53bc94c` | Yes (docs) | Committed + pushed | — |
| 006 | Classify the authorized untracked artifacts | ✅ | read-only report; checksums recorded | No | N/A | Dispositions pending (§3.10) |
| 007 | Sanitized archive credential + redundancy triage | ✅ | variable names only; **no secret value recorded** | No | N/A | Credential rotation remains an owner decision |
| — (owner-authorized, between 007 and 008) | Delete the obsolete sensitive ZIP | ✅ | never tracked in reachable history; no Git cleanup required | No | N/A | Not proven leaked; no replacement archive created |
| 008 | Harden `create-share-zip.sh` against root **and nested** `.env*` / `.DS_Store` | ✅ | dummy-fixture test; `bash -n` pass | Yes | Later, in 009/010 | — |
| 009 | Commit the archive hardening | ✅ | created commit `bfcf8503803c48a0c2120561ebcbe2600083279f` | No | Committed | — |
| 010 | Push the archive hardening | ✅ | pushed that same commit `bfcf8503803c48a0c2120561ebcbe2600083279f` | No | Pushed | — |
| 011 | Capture the reproducible technical baseline | ✅ | measured results (§3.11) | No | N/A | Quality-floor gaps open |
| 012 | **Initial** reachability-aware containment inventory (F1–F20), **later expanded** through CTO review and Task 013-R1 to F1–F23 | ✅ | read-only report; superseded by the §3.7 primary ledger | No | N/A | Ledger is the living record — not permanently fixed at F20 |
| — CTO review of 012 | Corrected F8, F10, F15, F16, F19 classifications | ✅ | recorded in §3.7 | No | N/A | — |
| 013 | Extension Containment Batch 1 | 🟨 | 5 files; static checks pass | Yes | **Committed locally** — `3c1fb2b` | Push + runtime verification |
| 013-R1 | Complete fail-closed containment; identified F21–F23 | 🟨 | 7 files total; static checks pass; CTO diff approval recorded | Yes | **Committed locally** — `3c1fb2b` | Push + runtime verification |
| 014 | Two auditable local commits — the seven-file extension containment, then this plan update | ✅ | preflight passed; `node --check` ×5, manifest parse + surface assertions, production build and forbidden-identifier searches all passed; containment commit `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` | No new product code | Committed locally — **not pushed** | Push remains **unauthorized and pending** |

### 3.9 Phase 00 progress

Completed and verified:
✅ GitHub account isolation · ✅ Branch consolidation to `development` + `main` · ✅ Worktree removal · ✅ Repository operating charter · ✅ Canonical master-plan adoption · ✅ Authorized untracked-artifact classification · ✅ Obsolete sensitive ZIP deletion · ✅ Share-archive exclusion hardening and publication · ✅ Reproducible technical baseline · ✅ Reachability-aware containment inventory through F23 · ✅ Exact extension-containment change list approved · ✅ Extension containment implemented and statically checked · ✅ Extension containment committed locally (`3c1fb2b`)

**Phase 00 remains 🟨 IN PROGRESS.** Specifically:
- Task 013/013-R1 changes are **committed locally** (`3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`) but remain **unpushed and undeployed**.
- Extension **runtime/browser verification has not occurred**.
- Extension containment is **not** release-complete.
- API, website, simulation, quality-floor, CI, and the Phase 00 exit gate are **not** complete.

### 3.10 Artifact status

| Artifact | Status |
|---|---|
| `vigil_core_g.zip` | Sensitive **and** redundant local backup; contained an environment file; **never tracked in reachable Git history**; deleted with owner authorization; **not proven leaked**; no replacement archive created. |
| `services/heliusService copy.bak.co` | Byte-identical to the tracked Helius service; redundant; **remains untracked and protected** pending owner-authorized disposal. |
| `utils/poisoningDetector.ts` | Deterministic Solana detector **candidate**; remains untracked and protected; **not production-integrated**; thresholds and expected behaviour require Phase 01 tests and validation. |
| `AGENTS.md` | Protected — policy preserved verbatim in §6; excluded from inspection and from all cleanup. |

### 3.11 Measured technical baseline (Task 011)

| Capability | Result |
|---|---|
| Production build | **PASS** (observed Vite build version 6.4.1) |
| JavaScript bundle | ≈ **1,445.76 kB** (≈ **348.17 kB** gzip); existing chunk-size warning above 500 kB |
| TypeScript | **FAIL** — 12,994 observed diagnostics; the estimated post-type-install count **remains unverified** |
| Lint | **MISSING** |
| Tests | **MISSING** |
| CI | **MISSING** |
| Engine / package-manager pinning | **MISSING** |
| Dependency declarations | Duplicate/conflicting `vite` declarations; duplicated `@vitejs/plugin-react` declarations |
| Dependency audit | 19 advisories total — 1 critical, 12 high, 5 moderate, 1 low; 12 reported by the production-only audit. That production figure is **distorted** by build tooling sitting in runtime `dependencies`. **Actual reachability and upgrade paths remain unverified — no advisory is claimed exploitable.** |
| Build output vs Git | `dist/` is ignored; the build did **not** alter tracked Git state |

### 3.12 Task 013 / 013-R1 containment state

**Status: `CONTAINED AND COMMITTED LOCALLY — STATIC CHECKS AND PRODUCTION BUILD PASSED — PUSH, RUNTIME VERIFICATION, DEPLOYMENT AND RELEASE VERIFICATION PENDING`.**

Local containment commit: `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` — parent `bfcf8503803c48a0c2120561ebcbe2600083279f`, branch `development`, seven files, +186 / −609. **Not pushed.**

Removed or contained: F1 (fabricated campaign timer + payload), F2 (random trap verdict + fabricated forensics), F3 (random market-intelligence verdict + hardcoded metrics; unavailable state substituted), F4 (unconditional poison/resilience metric mutation), F14 (client-distributed provider endpoint), F15 (unsigned external activation — removed from worker **and** manifest), F16 (incorrect USDC auto-trust — removed **without** replacement), F21 (domain-only phishing behaviour — contained by disabling content-script reachability; **underlying heuristic remains unfixed and deferred**), F22 (invented popup metrics/operational claims — removed; invalid metric keys removed from storage), F23 (obsolete handshake UI and external command-centre link — removed).

Extension containment state: content scripts disabled · `<all_urls>` host permission removed · web-accessible resources removed · externally-connectable scope removed · unnecessary `scripting` permission removed · unused sandbox CSP entry removed · popup replaced with an honest contained-alpha state · telemetry fails closed as unavailable · no wallet connection required · no verdicts issued · active scanning disabled · **the extension currently provides no protection — intentionally, until Phase 01**.

Evidence: JavaScript syntax checks passed (`node --check`, five files) · manifest JSON parsing passed · manifest surface assertions passed (`content_scripts`, `host_permissions`, `web_accessible_resources`, `externally_connectable` and the `scripting` permission all absent) · production build passed · static forbidden-identifier searches passed, including zero `Math.random` extension-wide · exactly seven authorized tracked files staged and committed. **No browser/runtime extension test has run.** The changes are **committed locally only** and remain **unpushed and undeployed**. None of these findings is release-verified.

---

## 4. Cross-review reconciliation

| Topic | ChatGPT/Codex | Claude | Grok | Current evidence | Final decision |
|---|---|---|---|---|---|
| Website crawlability | Static/SSR essential content | No SSR; content in JS | Crawler saw empty; others got content | `VERIFIED` client-rendered SPA | Render essential content statically/SSR + metadata/sitemap |
| Fabricated/random verdicts | Contain now | Remove | Claims must be evidence-backed | `VERIFIED` (F1–F23, §3.7) | Extension subset **contained in working tree**; website/API/simulation findings **remain open**; **no live deployment claim** |
| Helius integration | Exists | Corrected: exists, AI still decides | — | `VERIFIED` telemetry; AI verdicts | Telemetry is evidence; deterministic verdict consumes it |
| Deterministic detection | Shared engine | `retinalShield` is real core | — | `VERIFIED` | One shared engine; AI explains only |
| Testing & CI | Add | Zero infra | — | `VERIFIED` none | Quality floor (Phase 00) |
| Extension priority | Primary | Flagship | Must be verifiable | Legacy deterministic logic exists but is unvalidated and disabled | Primary surface; pre-sign coverage separately designed |
| Solana vs EVM/RH | RH-first, keep Solana | Isolate Solana, add EVM | — | Legacy deterministic Solana logic exists but is unvalidated and disabled | Chain-adapter; do not discard Solana |
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
4. **Checklist** —
   - ✅ account isolation / branch consolidation / worktree removal / `CLAUDE.md` (§3.1)
   - ✅ artifact classification of the three authorized untracked artifacts (Task 006, §3.10)
   - ✅ measured technical baseline (Task 011, §3.11)
   - ✅ F1–F23 reachability inventory (Task 012 + CTO review + 013-R1, §3.7)
   - 🟨 extension containment **subset** implemented, statically verified and committed locally in `3c1fb2b` (F1–F4, F14–F16, F21–F23)
   - 🟨 credential-bearing provider endpoint removed and committed locally; **any provider credential rotation remains an owner action**
   - 🟨 unsigned external handshake removed and committed locally (worker + manifest)
   - ⬜ paid checkout / dead payment code (F8)
   - ⬜ admin backdoor (F9)
   - ⬜ API boundary (F11, F12, F13, F19, F20)
   - ⬜ website integrity (F5, F6, F7)
   - ⬜ simulation labelling (F10, F17, F18)
   - ⬜ TypeScript / test / lint / dependency / CI quality floor
   - ⬜ browser runtime verification
   - ✅ local commit of the approved seven-file containment (`3c1fb2b`)
   - ⬜ push / deployment / release verification
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

1. ✅ Tasks 001–012 — foundational work and evidence inventory (§3.8)
2. 🟨 **Task 013 extension containment** — implementation complete · static checks and production build complete · CTO diff approval recorded · **push and browser runtime verification pending**
3. ✅ Commit the approved seven-file extension containment — `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` (Task 014)
4. ⬜ Push it to `origin/development`
5. ⬜ Perform extension runtime/browser verification once an appropriate test procedure exists
6. ⬜ API emergency containment — F11, F12, F13, F19, F20
7. ⬜ Website integrity containment — F5, F6, F7, F9
8. ⬜ Simulation / dead-code containment — F8, F10, F17, F18
9. ⬜ Establish the TypeScript, test, lint, dependency and CI quality floor
10. ⬜ Re-inspect F1–F23 and record acceptance evidence
11. ⬜ Release-gated merge to `main`

**Open findings retained (not contained):** F5 · F6 · F7 · F8 · F9 · F10 · F11 · F12 · F13 · F17 · F18 · F19 · F20 · F21 (underlying heuristic, currently unreachable) — plus authoritative USDC replacement verification, orphaned extension files and unused CSS, browser runtime verification, and the dependency/type/test/lint/CI quality floor.

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
| Fabricated/random intelligence | Critical | Present | F1–F23 `VERIFIED` (§3.7) | F1–F4, F14–F16, F21–F23 **contained and committed locally** (`3c1fb2b`); **F5–F13 and F17–F20 remain open** | Eng | prod exposure | ⚠️ **OPEN** until push, deployment and verification |
| Corrupted user metric (`VIG_TOTAL_POISONS`) | High | Present | F4 `VERIFIED` | **contained and committed locally**; invalid keys removed, not re-initialised | Eng | any HUD open | ⚠️ publication/runtime pending |
| Credential-bearing provider endpoint | High | Present | F14 (pre-containment location `serviceWorker.js:5`) | **removed and committed locally**; provider-side rotation decision **remains open** | Eng/Owner | extraction | ⚠️ |
| Provider/API abuse | High | Med | open proxy + unauth cache | allowlist/auth/limits | Eng | cost spike | ⚠️ |
| Incorrect canonical registry | High | Present | F16 (pre-containment location `addressValidator.js:8`) | **unsafe USDC auto-trust removed**; replacement verification pending | Eng | wrong trust | ⚠️ |
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
> All file:line references below are **pre-containment locations**; Task 013/013-R1 deleted or shifted code in the seven extension files.

| Finding | Source | Repo file / doc | Evidence status | Date | Implication |
|---|---|---|---|---|---|
| Legacy deterministic heuristic prototype exists | Claude/CTO | `content/retinalShield.js` | PARTIALLY VERIFIED | 2026-09-03 | Unvalidated thresholds; contained F21; disabled by 013-R1; **not an approved detector** — concepts may inform Phase 01 |
| Telemetry plumbing exists | Claude/CTO | `api/helius.ts`, `services/heliusService.ts` | PARTIALLY VERIFIED | 2026-09-03 | Plumbing is real, but the **API boundary remains unsafe/open (F12, F19) and is not production-approved** |
| `poisoningDetector.ts` reviewed | Claude/CTO | `utils/poisoningDetector.ts` (untracked) | VERIFIED (reviewed, Task 006) | 2026-09-03 | Deterministic Solana **candidate**; needs Phase 01 fixtures + FP measurement |
| AI generates verdicts | Claude | `api/gemini.ts`, `api/openai.ts` | VERIFIED | 2026-09-03 | Endpoints can be **disabled in Phase 00**; honest replacement is Phase 01 |
| Fake campaign / random trap | Claude | `serviceWorker.js:24,75` *(pre-containment)* | VERIFIED | 2026-09-03 | Contained in working tree (F1, F2) |
| Random rug-risk + hardcoded forensics | CTO/Claude | `AlertMarketIntel.js:12,14,111` *(pre-containment)* | VERIFIED | 2026-09-03 | Contained in working tree (F3) |
| Corrupted poison metric | CTO/Claude | `serviceWorker.js:113`; `retinalShield.js:172` *(pre-containment)* | VERIFIED | 2026-09-03 | Contained in working tree (F4) |
| Credential-bearing provider endpoint | Claude | `serviceWorker.js:5` *(pre-containment)* | VERIFIED (redacted) | 2026-09-03 | Removed in working tree (F14); **provider-side rotation remains an owner action** |
| Inconsistent USDC value | Claude | `core/addressValidator.js:8` *(pre-containment)* | VERIFIED (value) / NEEDS OFFICIAL EXTERNAL VERIFICATION (replacement) | 2026-09-03 | **Unsafe auto-trust removed now**; replacement only after official verification |
| Forced `NEW` + fabricated latency | Claude/CTO | `IntentValidatorDemo.tsx:545,547` | VERIFIED | 2026-09-03 | **Removable/suppressible now**; evidence-derived replacement is Phase 01 |
| Open proxy / unauth cache | Claude | `api/helius.ts:25`; `api/cache.ts:34` | VERIFIED | 2026-09-03 | Allowlist + server-only writes — **open** |
| Duplicate deps | Claude | `package.json` | VERIFIED | 2026-09-03 | Deterministic installs |
| Zero test/CI/lint | Claude/CTO | repo root | VERIFIED | 2026-09-03 | Quality floor |
| No SSR / crawlability | Grok/Claude | `index.html` | PARTIALLY VERIFIED | 2026-09-03 | SSR essential content |
| Privacy docs contradict code | Docs | README/VIGIL_CONTEXT | VERIFIED (mismatch) | 2026-09-03 | Rewrite |
| TS diagnostics / build / bundle | CTO/Claude | Task 011 build + `tsc --noEmit` | **MEASURED** (§3.11) | 2026-09-03 | Build PASS; TS FAIL @ 12,994; bundle ≈1,445.76 kB / ≈348.17 kB gzip |
| Dependency advisories | CTO/Claude | Task 011 `npm audit` | **MEASURED count** (19: 1/12/5/1) / **reachability NEEDS VERIFICATION** | 2026-09-03 | Counts are measured; **no advisory claimed exploitable**; upgrade paths unverified |
| Robinhood facts | Web (earlier) | external | NEEDS CURRENT EXTERNAL VERIFICATION | — | Re-verify |
| Base `$VIGIL` / trademark | Grok/Claude | external | NEEDS VERIFICATION | — | Record first |

### 19.2 Requirements traceability (critical Phase 00 findings)

> Extension rows distinguish three separate states: **implementation complete and committed locally (`3c1fb2b`)** · **static acceptance and production build passed** · **push / runtime / deployment verification pending**. Line references are **pre-containment locations**.

| ID | Finding | Evidence status | Phase | Planned task | Acceptance evidence | Release gate |
|---|---|---|---|---|---|---|
| F1 | `…/serviceWorker.js:24` fake campaign *(pre-containment)* | VERIFIED | 00 | Remove timer | ✅ static: no `GLOBAL_CAMPAIGN_SIGNAL` — committed locally (`3c1fb2b`); push/runtime verification pending | Phase 00 exit |
| F2 | `…/serviceWorker.js:75` random trap *(pre-containment)* | VERIFIED | 00 | Remove random verdict | ✅ static: no random verdict path — committed locally (`3c1fb2b`); push/runtime verification pending | Phase 00 exit |
| F3 | `…/AlertMarketIntel.js:12` random rug-risk *(pre-containment)* | VERIFIED | 00 | Remove/replace with unavailable state | ✅ static: no invented metric or verdict — committed locally (`3c1fb2b`); push/runtime verification pending | Phase 00 exit |
| F4 | `…/serviceWorker.js:113` corrupted metric *(pre-containment)* | VERIFIED | 00 | Remove mutation path; delete invalid keys | ✅ static: keys removed, not re-initialised — committed locally (`3c1fb2b`); push/runtime verification pending | Phase 00 exit |
| F14 | `…/serviceWorker.js:5` credential-bearing endpoint *(pre-containment)* | VERIFIED | 00 | Remove from client | ✅ static: no endpoint in extension — committed locally (`3c1fb2b`); **provider rotation = owner action**; push/runtime verification pending | Phase 00 exit |
| F15 | `…/serviceWorker.js:121` unsigned handshake *(pre-containment)* | VERIFIED | 00 | Remove listener + manifest scope | ✅ static: no `onMessageExternal`, no `externally_connectable` — committed locally (`3c1fb2b`); push/runtime verification pending | Phase 00 exit |
| F16 | `…/core/addressValidator.js:8` USDC value *(pre-containment)* | VERIFIED / NEEDS OFFICIAL EXTERNAL VERIFICATION | 00 → 01 | **Unsafe auto-trust removed now**; replacement **only after official verification** | ✅ static: prior value absent — committed locally (`3c1fb2b`); replacement pending official source | Phase 01 exit (replacement) |
| F21 | `…/content/retinalShield.js` domain-only `PHISHING` *(pre-containment)* | VERIFIED | 00 → 01 | Contain by removing content-script reachability | ✅ static: `content_scripts` absent → not injected — **heuristic itself unfixed, deferred** | Phase 01 exit (heuristic) |
| F22 | `popup/popup.html`, `popup/popup.js`, `serviceWorker.js` invented metrics/claims | VERIFIED | 00 | Replace popup with honest state; delete invalid keys | ✅ static: no resilience/trusted/poison/mesh/VCI/relay/telemetry claim — committed locally (`3c1fb2b`) | Phase 00 exit |
| F23 | `popup/popup.html`, `popup/popup.js` obsolete activation UI | VERIFIED | 00 | Remove handshake UI + external link | ✅ static: absent from reachable surface — committed locally (`3c1fb2b`) | Phase 00 exit |
| F5 | `api/gemini.ts` / `api/openai.ts` AI verdicts | VERIFIED | 00 (disable) → 01 (replace) | Disable verdict endpoints now | **OPEN** — no acceptance evidence yet | Phase 01 exit |
| F6 | `components/IntentValidatorDemo.tsx:545,547` forced `NEW` + fabricated latency | VERIFIED | 00 (remove) → 01 (replace) | Remove/suppress now | **OPEN** | Phase 01 exit |
| F7 | `utils/marketMath.ts:19,42` hardcoded distribution | VERIFIED | 00 (remove/hide) → 01 (real data) | Remove or hide now | **OPEN** | Phase 01 exit |
| F8 | `components/Pricing.tsx` dead payment code | VERIFIED | 00 | Explicit disable guard | **OPEN** — dead code, not an active vulnerability | Phase 00 exit |
| F9 | `App.tsx` admin backdoor | VERIFIED | 00 | Remove/disable now | **OPEN** | Phase 00 exit |
| F11 | `api/openai.ts:193` client-chosen model/tokens | VERIFIED | 00 | Auth + allowlist + token cap | **OPEN** | Phase 00 exit |
| F12 | `api/helius.ts:25` open proxy | VERIFIED | 00 | Allowlist operations | **OPEN** — must precede any extension re-route | Phase 00 exit |
| F13 | `api/cache.ts:34` unauth `set` | VERIFIED | 00 | Server-only writes | **OPEN** | Phase 00 exit |
| F19 | `services/heliusService.ts:216` provider-call ceiling | VERIFIED (static upper bound) | 00 | Lower caps + budget | **OPEN** — upper bound, not measured spend | Phase 00 exit |
| F20 | `services/heliusService.ts:310` debug logging | VERIFIED | 00 | Gate behind debug flag | **OPEN** | Phase 00 exit |
| F10, F17, F18 | Gating bypass + unlabelled simulations | VERIFIED | 00 | Relabel / `/lab` isolation | **OPEN** | Phase 00 exit |
| — | `package.json` duplicate `vite` | VERIFIED | 00 | Deduplicate | **OPEN** | Phase 00 exit |
| — | No test/CI/lint | VERIFIED | 00 | Add quality floor | **OPEN** | Phase 00 exit |

## 20. Change log

| Version | Date | Summary |
|---|---|---|
| Version 1.0.2 | 2026-09-03 | Records Tasks 001–013 (§3.8), artifact and archive containment (§3.10), the measured technical baseline (§3.11), the F1–F23 reachability ledger (§3.7), and Task 013 extension-containment implementation status (§3.12). Adds the progress-control rule (§1) and updates the immediate-action sequence (§8). Phase 00 remains in progress; at the time of that revision Task 013 changes were uncommitted, unpushed and not runtime-verified. **Task 013-R3 reconciliation:** corrected the stale Phase 00 summary and the main Phase 00 checklist; requalified product-asset claims (`retinalShield.js` = legacy unvalidated prototype, disabled; Helius = plumbing only, boundary unsafe; `poisoningDetector.ts` = reviewed candidate); separated immediate containment from eventual replacement (F5, F6, F7, F9, F14, F16); corrected the task ledger (001 docs-only, 009/010 commit `bfcf850`, 012 initial F1–F20 later expanded); reconciled the cross-review table, risk register, evidence ledger and traceability to the F1–F23 ledger; and labelled superseded line numbers as pre-containment locations.  **Task 014 amendment (same version):** the approved seven-file extension containment is now committed locally as `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`; §2, §3.7, §3.8, §3.9, §3.12, §7, §8, §17 and §19.2 move from `CONTAINED-WT` to `CONTAINED-COMMIT`. Push, browser/runtime verification, deployment and release verification remain pending and unauthorized. No doctrine, scope, architecture, finding classification or approval status changed, so the version remains 1.0.2. |
| Version 1.0.1 | 2026-09-03 | Clarified immutable baseline and adoption references so the plan does not contain a self-invalidating "current HEAD" field. |
| Version 1.0 | 2026-09-03 | Draft 1.2 approved by Ajmal Fahad and the CTO and adopted as the single canonical VIGIL master plan. |
| Draft 1.2 | 2026-09-03 | Owner-alignment: first return post set to the gated Robinhood Chain security post (HIGH claim-risk, Owner+CTO reviewers, full verification/citation gate); prohibited unsupported volume/fee/dump/liquidity figures as facts; capabilities (tx decoding, honeypot, vanishing-token, wallet-level pre-sign) marked target/under-development; alpha/beta counts (10–25 / 100–250) relabelled provisional CTO target ranges pending owner approval & capacity review; Phase 09 security/privacy requirements made substantive (no contract/treasury/keys; protect legal/compliance/identity data); added source-of-truth rule (canonical only after owner approval + commit). All prior corrections preserved. Status: Final Owner Approval Required. |
| Draft 1.1 | 2026-09-03 | Expanded all Phase 00–10 with 11 fields; added documentation-reconciliation table (§3.6); added reachability-aware fabrication inventory (§3.7) incl. newly found `AlertMarketIntel.js` random rug-risk and `VIG_TOTAL_POISONS` corruption; split USDC evidence (verified value / needs official external verification); reclassified Decision Log into A/B/C; excluded `AGENTS.md` from inspection with verbatim policy; corrected the immediate sequence; added executable website (§9) and extension (§10) work packages incl. pre-sign scope statement; replaced the campaign with a four-week X plan (§11); added requirements traceability (§19.2); qualified uncertain claims (removed "all major integrity claims verified"). Status: CTO Review Required. |
| Draft 1.0 | 2026-09-03 | Initial consolidated plan reconciling CTO/Claude/Grok reviews against the current tree. |

**How to update:** change a `⬜`→`🟨`→`🟦`→`✅` only with linked evidence; add a Decision Log row (A/B/C) for material choices; append a Change Log row per revision; move findings between §3 buckets as evidence changes; never mark `✅` without verification.
