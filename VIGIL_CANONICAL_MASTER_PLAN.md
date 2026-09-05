# VIGIL Core — Canonical Master Plan

> **Version:** 1.1.0 — Owner-directed revision; CTO review pending
> **Status:** Owner-directed revision; CTO review pending. Last CTO-approved version: 1.0.5 (commit `45ccba0ce84932957b32537a4f476d3dab9645cc`). This revision records owner decisions and proposals; it does not itself carry CTO approval.
> **Approval date:** 2026-09-03 — historical owner/CTO approval of Versions 1.0 through 1.0.5; this 1.1.0 revision is **not yet approved**
> **Last updated:** 2026-09-05
> **Canonical repository:** `/Users/ajmalfahad/Desktop/Web Projects -Playground/VIGIL/Website-Stable/VIGIL-Core`
> **Development baseline analyzed:** `5f0dd69d82dd7da74a0e62fad763c76d4d5c9869`
> **Main baseline at plan approval:** `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`

> ## ⚠️ The VIGIL extension is intentionally NON-PROTECTIVE at this stage
>
> The Chrome extension **issues no threat verdicts, performs no scanning, and provides no protection whatsoever**. It is deliberately failed closed pending a validated deterministic detector (Phase 01). Runtime verification (Task 016) confirms that this contained state *behaves as documented* — it does **not** mean the extension detects anything. Nothing in this plan may be read as a deployment, release, production-readiness, or active-protection claim.
>
> **No detector capability may be marketed as live.** VIGIL has no validated detector in production.
>
> **API source containment is not deployment.** Task 020 removed two unsafe API surfaces (F11, F13) from the tracked source; Task 022 **published** those commits to `origin/development`. They are **not deployed**. The deployed site may still expose the old routes until an authorized deployment occurs. **F12 (open Helius proxy): the route and its client were removed from the tracked source in Task 029 and committed locally by Task 030 (`CONTAINED-COMMIT` — not pushed, not merged into `main`, not deployed); production `main` still serves the open proxy until an authorized release/deployment. F19 and the Helius portion of F20 are superseded locally by that removal; F20's AI-route logging and F25 (mesh prompt control) remain open.**
>
> **Owner direction (v1.1.0): Robinhood Chain is the exclusive initial product target and the Chrome extension is the product.** Nothing in that direction is implemented, tested, provider-selected, deployed, or production-ready. Pre-sign trading assistance on Robinhood Chain is the central deliverable; a standalone watchlist/dashboard is not. Robinhood Chain compatibility never implies partnership, endorsement, affiliation, or listing. **No token work, no legacy-integration retirement, and no monetization implementation is authorized by this document.** The Helius route/client were retired in Task 029 and committed locally by Task 030 (not pushed, not deployed); the remaining legacy Solana code stays in the code base until further separately authorized, dependency-aware retirement.

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
| Status | 1.1.0 — Owner-directed revision; CTO review pending · last CTO-approved version 1.0.5 |

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

**What VIGIL is.** A Chrome extension that gives Robinhood Chain traders evidence-backed safety checks **where they already are** — on their trading platform, before an irreversible on-chain action — without visiting the VIGIL website to cross-check a token.

**Owner-approved direction (v1.1.0, §18.A).** *Robinhood Chain only* as the exclusive initial target · *Chrome extension first* — the extension is the product · *cross-platform trading assistance* on supported Robinhood Chain trading and launch workflows · *evidence-backed analysis* of token identity, deployer provenance, allocations, holder concentration, liquidity/control risk, poisoning/destination/phishing evidence and decoded approval intent · *Free + Pro* · a *VIGIL token ambition* (gated, unresolved) · a *30-day progressive public-release campaign* as launch strategy. None of this is implemented; see §5, §6.1, §10.1, §12.2, §16.1, §11.1, §13.

**Problem.** Losses occur at the human decision layer — address substitution, look-alike recipients, inherited trust, malicious approvals, rug-prone launches — not only in broken contracts. Wallet history and launch platforms themselves become attack surfaces.

**Positioning.** *The last safety check before an on-chain action becomes irreversible.*

**Wedge.** Background analysis, compact in-page findings, expandable evidence and relevant signing-time warnings for Robinhood Chain trading workflows, built on a shared deterministic engine, a Robinhood-compatible EVM adapter and normalized evidence. Solana and other chains are **removed from active product requirements, release scope and future-facing positioning**; existing Solana code is legacy pending a separately authorized retirement (§6.2).

**Why integrity first.** The interface currently looks more mature than the protection behind it. Every later phase depends on verdicts being real, so fabrication removal, the API containment and a deterministic kernel precede website polish, marketing, monetization and any token discussion.

**Why the extension is primary.** Protection must fire at the browser decision point (pre-sign), which a marketing site cannot do. Coverage is bounded: **VIGIL does not promise universal website/wallet interception or visibility into every intent** — supported platforms and wallets are named only after their domains, deployments, chain support and wallet compatibility are verified (§12.3).

**Why the website supports (not leads).** The site exists for discovery, installation, documentation, support and **clearly labelled demonstrations** — not as a mandatory analysis dashboard. It is rebuilt after the alpha proves what the extension does.

**Why token work is gated.** No token exists. The owner's ambition for a VIGIL token with subscription-payment utility is recorded in §13, behind the unchanged necessity, legal, security and owner-approval gates — never a precondition for the product.

---

## 3. Current verified state

### 3.1 Completed & verified foundation (evidence: Git + this session)
- ✅ `VERIFIED` — GitHub-account isolation: VIGIL uses `Vigilcore` via `github-vigil`; `origin` = `git@github-vigil:Vigilcore/vigil-core.git`; repo-local identity `Vigilcore` / `github@vigilcore.org` (from `.git/config`). BourseWire isolated.
- ✅ `VERIFIED` — Branch consolidation: only `development` (`5f0dd69`) and `main` (`0f66464`) exist locally and on `origin`; `playground` and the Claude worktree branch retired after preservation.
- ✅ `VERIFIED` — Worktree removed; single canonical checkout.
- ✅ `VERIFIED` — Recovery tags: `backup/pre-consolidation-{playground-f3b331c, main-a4107da, development-8987be4}`.
- ✅ `VERIFIED` — `utils/poisoningDetector.ts` preserved (SHA-256 `c174cd08…acccc97`), untracked; **reviewed in Task 006** and classified a deterministic Solana **candidate** — not integrated.
- ✅ `VERIFIED` — Root `CLAUDE.md` charter created, committed (`5f0dd69`), pushed to `origin/development`.

> **Phase 00 status.** The repository foundation, artifact classification, technical baseline, and the F1–F27 inventory (F1–F23 via Tasks 012/013-R1; F24–F27 via Task 019) are **complete**. Extension containment is **implemented, statically checked, committed (`3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`), published to `origin/development` (Task 015), and verified in an isolated browser runtime (Task 016)**, but remains **undeployed, unreleased, and unmerged to `main`**. API containment batch 1 (F11, F13) is **published on `origin/development` (Task 022) but undeployed**. F12, F19, F20, F25, website, simulation, quality-floor, CI, and the final Phase 00 gates remain **open**. See §3.9.

### 3.2 Product assets carried forward (qualified)
- 🟨 `PARTIALLY VERIFIED` — **Legacy deterministic heuristic prototype**: `VIGIL-FIELD-UNIT/content/retinalShield.js` `analyzeAddress()`. It contains **unvalidated entropy/similarity thresholds**, contained the **F21 domain-only phishing logic**, and its active reachability was **disabled by Task 013-R1**. It is **not production-valid**. Candidate concepts may inform Phase 01; **the implementation is not an approved detector.**
- 🟨 `PARTIALLY VERIFIED` — **Telemetry plumbing exists**: `api/helius.ts` (server-side keyed proxy) + `services/heliusService.ts` provide real provider plumbing, **but the API boundary remains unsafe/open (F12, F19) and is not production-approved.**
- ✅ `VERIFIED` — Shared primitives present: `utils/addressValidator.ts`, `addressDiff.ts`, `threatIndex.ts`, `scoring.ts` — thresholds unvalidated; Phase 01 owns validation.
- ✅ `VERIFIED` — Grounded search: `MeshQueryTerminal` (candidate for explain-only / `/lab`).
- 🟨 `PARTIALLY VERIFIED` — `utils/poisoningDetector.ts` (untracked): reviewed and classified a deterministic Solana candidate; **requires Phase 01 fixtures, threshold calibration, and a measured false-positive rate** before any integration.
- ⚠️ **Legacy classification (v1.1.0).** Under the Robinhood-only direction every Solana-specific asset above (`retinalShield.js` Solana heuristics, the Helius telemetry plumbing, `poisoningDetector.ts`) is **legacy**: it may inform transferable concepts and remains in the tree to explain existing code, security findings and completed containment, but it is **not** in active product requirements. **Task 029 removed the Helius route `api/helius.ts` and client `services/heliusService.ts` from the tracked source; Task 030 committed that retirement locally (not pushed, not deployed)**; `retinalShield.js` and the protected `poisoningDetector.ts` are untouched. Its retirement is planned as a separately authorized, dependency-aware task (§6.2) and is **not** performed by this revision.

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

### 3.7 Primary finding ledger — F1–F27 (single source; each ID appears once)

**Category key:** (1) clearly labelled harmless demo randomness · (2) unlabelled simulation needing disclosure/`/lab` isolation · (3) affects a verdict, warning, score, security evidence, telemetry, campaign, forensic conclusion, entitlement, or user metric. Not every `Math.random()` is a vulnerability; only reachable, user-impacting cases are Category 3.

**Status key:** `CONTAINED-RUNTIME-VERIFIED` = *the fabrication or unsafe surface is absent from the published `development` source (containment commit `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`, pushed in Task 015) **and** its absence was confirmed in an isolated browser runtime (Task 016)*. This status means **containment only**. It is **not** a permanent remediation, **not** production validation, **not** deployment, and **not** release; the underlying capability is honestly replaced only in Phase 01, and each row's remaining blocker still applies. `OPEN` = not yet contained.

`CONTAINED-SOURCE-LOCAL` = *the unsafe surface has been removed from the tracked source in a **local commit that has not been pushed**.* Five states are tracked separately and **none implies another**: **committed locally** → **pushed to `development`** → **deployed** → **runtime verified** → **permanently remediated**. `CONTAINED-SOURCE-LOCAL` asserts only the first. **The currently deployed site may still expose the old routes until an authorized deployment occurs.** *(No finding currently carries this status; F11 and F13 advanced to `CONTAINED-SOURCE-PUBLISHED` in Task 022.)*

`CONTAINED-SOURCE-PUBLISHED` = *the unsafe surface was removed from tracked source **and** the containment commit was pushed to `origin/development`* (Task 022). It asserts the first two states only. It does **not** mean deployed, does **not** mean runtime-verified in production, does **not** mean released, does **not** mean merged to `main`, and does **not** mean permanently remediated. The deployed site may still expose the old routes.

Reachability is stated **as of Task 012 (pre-containment)** for F1–F23 and **as of Task 019** for F24–F27; live deployed reachability remains unverified.

| ID | File(s) | Finding | Reachability (pre-containment) | Cat | Current status | Containment / target batch | Acceptance evidence | Remaining limitation / blocker |
|---|---|---|---|---|---|---|---|---|
| F1 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | Fabricated global campaign timer + payload | Conditional (required `VIG_NODE_VERIFIED`, set only via F15) | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013 | `GLOBAL_CAMPAIGN_SIGNAL`, `INDUSTRIALIZED` absent; build pass | Deployment, release and Phase 01 replacement pending |
| F2 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | Random concentration-trap verdict + fabricated forensic fields | Conditional (paid tier via F15) | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013 | `isAccumulationTrap`, `motherWallet` absent | Deployment, release and Phase 01 replacement pending |
| F3 | `VIGIL-FIELD-UNIT/content/ui/AlertMarketIntel.js` | Random rug-risk decision + hardcoded holder/bundling/dev/mcap metrics + proceed-or-abort recommendation | Conditional (discovery domain + non-BASELINE tier) | 3 | **CONTAINED-RUNTIME-VERIFIED** — replaced with labelled unavailable state | Task 013 | `isRugRisk`, `rug-pulls` absent; zero `Math.random` extension-wide | Deployment, release and Phase 01 replacement pending |
| F4 | `retinalShield.js` → `serviceWorker.js` | `THREAT_LOG` on any HUD open mutated `VIG_TOTAL_POISONS` / `VIG_USER_BRI` regardless of verdict | Currently reachable | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013 / 013-R1 | `THREAT_LOG`, `updateLocalIntelligence` absent; invalid keys **removed**, not re-initialised | Deployment, release and Phase 01 replacement pending |
| F5 | `api/gemini.ts`, `api/openai.ts` | AI-generated risk/reputation/honeypot/Sybil verdicts from an address alone | Currently reachable | 3 | **OPEN** | API containment batch | — | **Verdict endpoints can be disabled during Phase 00.** Only the *honest replacement* requires the Phase 01 engine — that is not a blocker to containment |
| F6 | `components/IntentValidatorDemo.tsx` | Forced `NEW` verdict for real addresses + fabricated `9.2–11.3 ms` latency shown as measurement | Currently reachable | 3 | **OPEN** | Website containment batch | — | **Forced `NEW` and fabricated latency can be removed/suppressed now.** Only the evidence-derived replacement requires Phase 01 |
| F7 | `utils/marketMath.ts` | Hardcoded distribution `{top10:1,top20:3,top50:12}` + placeholder bundling presented as analysis | Conditional | 2/3 | **OPEN** | Website containment batch | — | **Hardcoded values can be removed or hidden now.** Only real distribution requires validated holder data later |
| F8 | `components/Pricing.tsx` | **Dangerous dead payment code** — placeholder treasury address, `PLEASE_REPLACE…` extension id, `localStorage` entitlement with no server verification | **Apparently unreachable** (0 imports) | 3 | **OPEN** (dead code, **not** an active payment vulnerability) | Simulation/dead-code batch | — | Must not be revived without a full rewrite |
| F9 | `App.tsx` | Client-side admin backdoor (hardcoded unlock code → `localStorage` master auth) | Currently reachable | 3 | **OPEN** | Website containment batch | — | **Can be removed/disabled now.** Server-side authorization is required only if an admin feature is later restored |
| F10 | `App.tsx` | `?mode=standalone_kernel` query-parameter gating bypass | Currently reachable | **2 (presentation/gating, not an emergency vulnerability)** | **OPEN** | Simulation/dead-code batch | — | Relabel / isolate |
| F11 | `api/openai.ts` | Unauthenticated `generateText` let the client choose `model`, `maxTokens`, `temperature` and an unconstrained prompt — uncapped provider cost, no system-prompt constraint | Reachable over the network **before Task 020**; no UI caller ever existed | 3 (cost) | **CONTAINED-SOURCE-PUBLISHED** | Task 020 Commit 2 `962c854`; published Task 022 | `generateText` case removed; server-controlled endpoint allowlist added **before** SDK construction; stubbed local runtime harness — 7/7 rejection paths returned HTTP 400 with a generic body and **no provider call**; production build passed | **Published on `origin/development` (Task 022) — NOT deployed, NOT production-verified, NOT permanently remediated.** The deployed site may still expose the old endpoint. Five retained fallback operations remain server-controlled |
| F12 | `api/helius.ts` | Unauthenticated **general-purpose** proxy — arbitrary `rpcMethod`/`rpcParams` (including state-changing methods) and arbitrary `endpoint`/`method`/`payload` executed with the server-side key | Currently reachable | 3 | **OPEN** | API containment batch 2 | — | **Highest-priority remaining API exposure.** The provider key is never revealed but is fully abusable. Requires a purpose-specific operation contract, **not** a superficial method allowlist. Must land **before/with** any extension re-route. **Task 028 decision: `RETIRE BEFORE ROBINHOOD IMPLEMENTATION`. Task 029/R1: `api/helius.ts` and `services/heliusService.ts` deleted from the tracked source; the Task 027 bounded replacement was discarded, never committed. Task 030 committed the retirement locally (`CONTAINED-COMMIT`).** Status stays `OPEN` for production because the removal is **committed locally only — not pushed, not merged into `main`, not deployed; production `main` (`0f66464`) still serves the open proxy** until an authorized release/deployment. Provider credential removal/rotation remains an owner-controlled deployment action |
| F13 | `api/cache.ts` *(deleted in source)* | Unauthenticated shared-cache `get`/`set` — cache poisoning, unbounded value size, unvalidated key namespace; **no legitimate caller existed** | Reachable over the network **before Task 020** | 3 | **CONTAINED-SOURCE-PUBLISHED** | Task 020 Commit 1 `71b78ed`; published Task 022 | `api/cache.ts` and `lib/cache.ts` deleted; dead import, `CACHE_VERSION`, commented integration and cache-status logs removed from `services/heliusService.ts`; **170 deletions / 0 insertions**; repo-wide tracked search finds no residual reference; production build passed | **Published on `origin/development` (Task 022) — NOT deployed, NOT production-verified, NOT permanently remediated.** Validated **statically and by build only** — no runtime exercise, because nothing calls it |
| F14 | `VIGIL-FIELD-UNIT/background/serviceWorker.js` | **Credential-bearing provider endpoint** distributed inside the extension | Currently reachable | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013 | `HELIUS_SECURE_LINK`, provider hostname absent | Provider-side credential rotation remains an **owner action**; **not proven leaked** |
| F15 | `serviceWorker.js`, `manifest.json` | Unsigned external entitlement handshake self-granting paid tier | Conditional — externally reachable **only through the configured Googleusercontent scope** | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013 / 013-R1 | `onMessageExternal`, `VIGIL_HANDSHAKE_ACTIVATE`, `externally_connectable` absent | Deployment, release and Phase 01 replacement pending |
| F16 | `VIGIL-FIELD-UNIT/core/addressValidator.js` | Incorrect USDC value auto-trusted as a canonical mint | Currently reachable | 3 | **CONTAINED-RUNTIME-VERIFIED** — the **unsafe auto-trust behaviour is contained by removal**; no replacement asserted | Task 013 | Prior value absent; remaining registry unchanged | Authoritative replacement was **separately pending** (`NEEDS OFFICIAL EXTERNAL VERIFICATION`) — not a blocker to the containment already applied. **Superseded (v1.1.0):** under the Robinhood-only direction the Solana canonical registry is **not** re-populated and no replacement value will be asserted; **closure requires the separately authorized legacy retirement (§6.2) plus verification — F16 is NOT closed now** |
| F17 | `EntropyCollider.tsx`, `SiloGate.tsx`, `NeuralAttentionalAudit.tsx` | Training-game randomness using production threat vocabulary without an explicit simulation label | Currently reachable | 2 | **OPEN** | Simulation/dead-code batch | — | Relabel / `/lab` isolation |
| F18 | `components/IntelligenceForge.tsx` | Randomly assigned "cluster" presented as global threat intelligence | Currently reachable | 2/3 | **OPEN** | Simulation/dead-code batch | — | Relabel or replace with evidence |
| F19 | `services/heliusService.ts` | Provider-call amplification: ≤1 balance + ≤50 signature pages (500/page) + ≤250 parse calls + 1 newest page + ≤2 parse ⇒ **structural ceiling ≈304 provider calls per user action** | Currently reachable | 3 (cost) | **OPEN** — superseded by removal (Task 029; `CONTAINED-COMMIT` via Task 030 — not pushed, not deployed) | Retired with the Helius client | — | **Theoretical structural ceiling derived from code — NOT observed usage.** The amplifying client no longer exists in the committed `development` source; production `main` still runs it until deployment. Real production volume, latency and cost remain **unknown and uninstrumented**. Bounded in practice only by one 9 s client-side abort covering the whole sequence; an aborted client fetch does **not** cancel in-flight server-side provider calls. Task 020 does **not** reduce amplification — caching was already disabled (F26) |
| F20 | `services/heliusService.ts`, `api/*` | Unconditional, production-capable logging of addresses, transaction signatures and pagination cursors; provider error objects logged raw | Currently reachable | 2 | **OPEN** | API containment batch 2 | — | **No log statement is environment-gated** — the only `NODE_ENV` use in tracked source was the cache-delete guard deleted in Task 020. `api/helius.ts:118` logs the raw error object, which can carry a request URL bearing the provider key: a **credible but UNVERIFIED** key-in-logs path, to be treated fail-closed. Unchanged by Task 020 apart from two cache-status logs removed with the deleted integration. **Task 029 (committed locally by Task 030 — not pushed, not deployed): the Helius portion (route + client logging, including the key-in-error-log path) is removed from the tracked source; the `api/gemini.ts` / `api/openai.ts` raw error logging keeps F20 `OPEN`** |
| F24 | *(repository-wide)* | No tracked deployment/runtime configuration — `vercel.json` absent, so function `maxDuration`, memory, region and headers are unpinned platform defaults | N/A — configuration | — (operational) | **OPEN** | Deferred until verified against the live environment | — | **Operational / governance reproducibility gap — NOT an established exploitable vulnerability.** Its consequence is that every server-side time bound recorded here is an assumption rather than a pinned fact |
| F25 | `api/gemini.ts` | `queryMeshIntelligence` concatenates client-supplied `query` into the model prompt behind only a six-word denylist; `query.toLowerCase()` throws on a non-string input | Currently reachable | 3 | **OPEN** | API containment batch 2 | — | **Active input-validation / prompt-injection concern.** The six-word denylist and the missing string validation are **insufficient**; Google Search grounding is enabled on this path |
| F26 | `services/heliusService.ts`, `api/cache.ts` | Cache integration commented out in the client while the writable route stayed deployed — guaranteed 100% cache misses | Historic (pre-Task 020) | — | **CONTRIBUTING EVIDENCE — not an independent finding** | Recorded under F13 and F19 | Task 020 Commit 1 removed the route and helper from source | **Design debt, not a separate exploit class.** F19 amplification remains fully open |
| F27 | `components/VideoProductionStudio.tsx` | Dead client-side provider-key pattern after an unconditional `throw`; references undefined `apiKey`/`ai` | **Unreachable — dead code** | — (hygiene) | **OPEN — hygiene only** | Deferred cleanup task | — | **Dead-code hygiene, NOT an active vulnerability.** Must never be revived as a client-side key pattern |
| F21 | `VIGIL-FIELD-UNIT/content/retinalShield.js` | Domain-only automatic `PHISHING` verdict — returned purely from the host name, with no address evidence | Currently reachable (pre-containment) | 3 | **CONTAINED-RUNTIME-VERIFIED by reachability removal** | Task 013-R1 | `content_scripts` absent → script never injected | **Underlying heuristic is NOT fixed** — disabled and deferred to Phase 01 |
| F22 | `popup/popup.html`, `popup/popup.js`, `serviceWorker.js` | Invented/unvalidated popup metrics and operational claims (resilience %, trusted/poison/mesh/VCI counts, "secure relay stable", "telemetry stream listening") | Currently reachable | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013-R1 | Popup is a static honest state; 7 invalid metric keys removed from storage | Deployment, release and Phase 01 replacement pending |
| F23 | `popup/popup.html`, `popup/popup.js` | Obsolete external activation UI (handshake button + command-centre link) still reachable after the backend handshake was removed | Currently reachable | 3 | **CONTAINED-RUNTIME-VERIFIED** | Task 013-R1 | Handshake UI and external URL absent from the reachable surface | Deployment, release and Phase 01 replacement pending |

Non-security randomness (visual/demo) is Category 1 and out of emergency-containment scope unless it feeds an entry above.

### 3.8 Task execution ledger (Tasks 001–030)

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
| 013 | Extension Containment Batch 1 | 🟨 | 5 files; static checks pass | Yes | **Committed + pushed** — `3c1fb2b` | Deployment, release and Phase 01 replacement pending |
| 013-R1 | Complete fail-closed containment; identified F21–F23 | 🟨 | 7 files total; static checks pass; CTO diff approval recorded | Yes | **Committed + pushed** — `3c1fb2b` | Deployment, release and Phase 01 replacement pending |
| 014 | Two auditable local commits — the seven-file extension containment, then this plan update | ✅ | preflight passed; `node --check` ×5, manifest parse + surface assertions, production build and forbidden-identifier searches all passed; containment commit `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` | No new product code | Committed locally | Published later, in Task 015 |
| 015 | Publish the two Task 014 commits to `origin/development` | ✅ | fast-forward `bfcf850..ec78e0c`, non-forced; local `development`, tracking `origin/development` and the actual remote `refs/heads/development` all resolved to `ec78e0c`; `main` untouched at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8` | No | **Pushed** | **Publication of development source only — NOT deployment, release, or production readiness** |
| 016 | Isolated Chrome extension runtime verification | ✅ | two explicitly separated evidence layers — see §3.12 and §19.1 | No — verification only | N/A | Deployment, Chrome Web Store release and merge to `main` remain pending |
| 017 | Record publication and runtime-verification evidence in this plan | ✅ | version 1.0.3; diff inspected; table columns checked; no finding marked permanently resolved | **Documentation only — no product or extension code** | Committed locally | Published in Task 018 |
| 018 | Publish the Task 017 documentation commit | ✅ | fast-forward `ec78e0c..a6d2bbf`, non-forced; local, tracking and actual remote `development` all resolved to `a6d2bbf`; `main` untouched at `0f66464` | No | **Pushed** | Publication only — not deployment or release |
| 019 | **Read-only** API emergency-containment analysis (F11, F12, F13, F19, F20) | ✅ | complete route inventory, end-to-end reachability maps and an impact matrix. Established that **no authentication, authorization, rate limiting, strict schema boundary, CORS policy, body-size guard or API test exists anywhere in tracked `api/`, `services/` or `lib/`**. Identified F24–F27 | No — read-only, nothing edited | N/A | Containment design approved in part; the Helius operation contract is deferred to a dedicated task |
| 020 | API emergency containment batch 1 — two local commits | ✅ | Commit 1 `71b78eda56eb6dadfe4867f42dbbc17788f9fa3d` (F13) and Commit 2 `962c854261a8d29dba5142e8f84b787c7b65fef3` (F11) — full evidence in §3.13 | Yes — API source only | Committed locally; **subsequently published in Task 022** | Deployment and production verification pending |
| 021 | Record Task 019 findings and Task 020 containment in this plan | ✅ | version 1.0.4; complete diff inspected; table columns checked; commit SHAs and Git-derived change counts verified against `git show --numstat` | **Documentation only — no product code** | Committed locally (`7fab8af`); **subsequently published in Task 022** | — |
| 022 | Review and publish the three Task 020/021 commits | ✅ | reviewed chain `a6d2bbf → 71b78ed → 962c854 → 7fab8af` (parents, author and committer `Vigilcore <github@vigilcore.org>` verified; changed paths and Git-derived counts matched); non-forced fast-forward `a6d2bbf..7fab8af`; local, tracking and actual remote `development` all `7fab8af3850e7d7f7f7c7b5258d84d8ad5c67d62`; ahead/behind 0/0; local, tracking and actual remote `main` unchanged at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`; production build passed at `7fab8af`; no protected file touched | No | **Pushed** | **Publication of development source only — nothing deployed, released, merged or production-verified** |
| 023 (+R1, R2) | Synchronize Task 022 publication and record the Robinhood Chain priority in this plan | ✅ | version 1.0.5; corrections R1/R2; committed in Task 024 | **Documentation only — no product code** | Committed `45ccba0ce84932957b32537a4f476d3dab9645cc` (Task 024); pushed (Task 025) | — |
| 024 | Commit the approved 1.0.5 plan update | ✅ | one commit, `VIGIL_CANONICAL_MASTER_PLAN.md` only, +90/−40 | No | Committed | Published in Task 025 |
| 025 (+R1) | Publish `45ccba0` to `origin/development` | ✅ | fresh fetch; non-forced fast-forward `7fab8af..45ccba0`; local, tracking and actual remote `development` all `45ccba0`; `main` untouched | No | **Pushed** | Publication of development source only — not deployment or release |
| 026 (+R1, R2) | Read-only design of the F12 purpose-specific Helius operation contract | ✅ | design approved by CTO with corrections (single `{address}` operation, server-side orchestration, hard call budget, closed completeness enums, `server/helius/` helpers, zero-install tests) | No — read-only | N/A | Implementation in Task 027 |
| 027 (+R1, R2) | Implement the bounded Helius telemetry contract | ❌ superseded | implemented as an uncommitted working-tree change (bounded `{address}` contract, 8-call ceiling, fixed-schema logging, fabricated-fallback removal); results reported by its own run only and never independently re-verified; **retired by Task 029 before any commit** | Yes — discarded | **Never committed; must not be committed in its former form** | Provider-neutral lessons recorded by Task 028; the R1/R2 fabricated-fallback removals in `IntentValidatorDemo.tsx` are carried forward by Task 029 |
| 028 | Read-only disposition review of Task 027 | ✅ | static evidence: `/api/helius` reachable only via `IntentValidatorDemo.tsx` → `services/heliusService.ts`, Solana-only telemetry, no non-Solana capability depends on it; committed `api/helius.ts` still the open proxy; deploy target `main` still contains the proxy and `api/cache.ts`; decision **`RETIRE BEFORE ROBINHOOD IMPLEMENTATION`**; Task 027 not to be committed in its former form | No — read-only | N/A | Task 029 |
| 029 (+R1) | Retire the legacy Helius integration | ✅ | deleted tracked `api/helius.ts` and `services/heliusService.ts`; removed the Helius import, request and consumers from `components/IntentValidatorDemo.tsx` while preserving the R1/R2 fabricated-fallback removal (`realtimeStatus` is now a constant `null` → honest `Unavailable`); reconciled the duplicate telemetry type in `types.ts`; added the narrow neutral `utils/telemetryDisplay.ts`; deleted the seven untracked Task 027 files; `package.json` untouched; protected files untouched. **R1 (2026-09-05):** removed the Solana-specific `BalanceBand`/`balanceBand` field and the unreachable “SOL Balance” rendering (no ETH replacement — balance semantics belong to the future EVM adapter); replaced the `null as` type assertion with a typed no-provider function returning `RealtimeTelemetry \| null`; added the persistent regression test `tests/utils/telemetryDisplay.test.mjs` (Node test runner + installed esbuild, no new dependency) covering labelled simulations, missing/`OFFLINE` → `Unavailable`, no simulation fallback, exact age, `At least` lower bound, missing count ≠ zero | Yes — deletions + component/type reconciliation + one test file | **Committed locally by Task 030 (`CONTAINED-COMMIT`) — not pushed, not merged into `main`, not deployed** | Separate push authorization; production `main` remains exposed until an authorized release/deployment; `HELIUS_*` environment removal/rotation is an owner-controlled deployment action |
| 030 | Commit the Task 029/R1 retirement and the Version 1.1.0 plan revision | ✅ | one local commit on `development` (parent `45ccba0`) containing exactly seven paths: this plan, `api/helius.ts` (deleted), `components/IntentValidatorDemo.tsx`, `services/heliusService.ts` (deleted), `types.ts`, `utils/telemetryDisplay.ts`, `tests/utils/telemetryDisplay.test.mjs`; pre-commit reverification: regression test, build, `git diff --check`, bounded residue checks, scoped type-error signature comparison (repository-wide TypeScript baseline remains **failing**, not claimed passing); no remote contact | Yes — commit only | **Committed locally — not pushed, not merged into `main`, not deployed, not production-remediated** | Separate push authorization; production `main` remains exposed until an authorized release/deployment; `HELIUS_*` credential removal/rotation remains an owner action |

### 3.9 Phase 00 progress

Completed and verified:
✅ GitHub account isolation · ✅ Branch consolidation to `development` + `main` · ✅ Worktree removal · ✅ Repository operating charter · ✅ Canonical master-plan adoption · ✅ Authorized untracked-artifact classification · ✅ Obsolete sensitive ZIP deletion · ✅ Share-archive exclusion hardening and publication · ✅ Reproducible technical baseline · ✅ Reachability-aware containment inventory through F23 · ✅ Exact extension-containment change list approved · ✅ Extension containment implemented and statically checked · ✅ Extension containment committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016) · ✅ Containment commits published to `origin/development` (Task 015) · ✅ **Extension containment runtime-verified in an isolated browser (Task 016)** · ✅ Read-only API-boundary analysis (Task 019) · ✅ F11 and F13 source-contained in local commits (Task 020) · ✅ **API containment batch 1 published to `origin/development` (Task 022 — fast-forward `a6d2bbf..7fab8af`)**

**Phase 00 remains 🟨 IN PROGRESS.** Specifically:
- Task 013/013-R1 changes are **committed and published** (`3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`, published in Task 015) and **runtime-verified in isolation** (Task 016), but remain **undeployed, unreleased, and unmerged to `main`**.
- Containment is **not** remediation: the extension still performs **no detection and issues no verdicts**, by design.
- Extension containment is **not** release-complete and **not** Chrome Web Store ready.
- Still pending: the complete quality floor · TypeScript remediation · tests, lint and CI · the provider credential decision · F16 closure via separately authorized legacy retirement plus verification (the Solana USDC replacement is **superseded**, v1.1.0) · full detector implementation · deployment · Chrome Web Store release · merge into `main`.
- **API containment batch 1 is `CONTAINED-SOURCE-PUBLISHED`.** F11 and F13 are removed from the tracked source in commits `71b78ed` and `962c854`, **published to `origin/development` in Task 022**, but **not deployed, not production-verified, and not permanently remediated**. The deployed site may still expose the old routes.
- **F12/F19/F20-Helius: removed from the tracked source by Task 029 and committed locally by Task 030 (`CONTAINED-COMMIT`)** — not pushed, not merged into `main`, not deployed, not production-remediated; production `main` still serves the open proxy until an authorized deployment. **F25 and the AI-route portion of F20 remain open.**
- F24 is an open **configuration reproducibility gap**; F26 is **contributing evidence** under F13/F19; F27 is open **dead-code hygiene**. None of these three is an established active vulnerability.
- **F5–F10 and F17–F18 remain incomplete/open**, as recorded in their individual rows; the website, simulation labelling and the Phase 00 exit gate are **not** complete.
- **F14–F16 containment is published and runtime-verified in isolation**, but their recorded limitations remain: deployment/release verification (all three), provider-side credential rotation (F14 — owner action), F16 closure only through separately authorized legacy retirement plus verification (the USDC replacement is **superseded**, v1.1.0 — **not closed now**), and Phase 01 replacement. **None is permanently resolved.**

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

### 3.12 Extension containment state (Tasks 013–016)

**Status: `CONTAINED-RUNTIME-VERIFIED — PUBLISHED TO ORIGIN/DEVELOPMENT — DEPLOYMENT, RELEASE AND MERGE TO MAIN PENDING`.**

Containment commit: `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` — parent `bfcf8503803c48a0c2120561ebcbe2600083279f`, branch `development`, seven files, +186 / −609. Published to `origin/development` in Task 015 together with plan commit `ec78e0cc0eea30e1e58db05c94034fe9e628bb2e`; `main` untouched at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`. **Publication of development source is not deployment or release.**

Removed or contained: F1 (fabricated campaign timer + payload), F2 (random trap verdict + fabricated forensics), F3 (random market-intelligence verdict + hardcoded metrics; unavailable state substituted), F4 (unconditional poison/resilience metric mutation), F14 (client-distributed provider endpoint), F15 (unsigned external activation — removed from worker **and** manifest), F16 (incorrect USDC auto-trust — removed **without** replacement), F21 (domain-only phishing behaviour — contained by disabling content-script reachability; **underlying heuristic remains unfixed and deferred**), F22 (invented popup metrics/operational claims — removed; invalid metric keys removed from storage), F23 (obsolete handshake UI and external command-centre link — removed).

Extension containment state: content scripts disabled · `<all_urls>` host permission removed · web-accessible resources removed · externally-connectable scope removed · unnecessary `scripting` permission removed · unused sandbox CSP entry removed · popup replaced with an honest contained-alpha state · telemetry fails closed as unavailable · no wallet connection required · no verdicts issued · active scanning disabled · **the extension currently provides no protection — intentionally, until Phase 01**.

**Static evidence (Tasks 013–014).** JavaScript syntax checks passed (`node --check`, five files) · manifest JSON parsing passed · manifest surface assertions passed (`content_scripts`, `host_permissions`, `web_accessible_resources`, `externally_connectable` and the `scripting` permission all absent) · production build passed · static forbidden-identifier searches passed, including zero `Math.random` extension-wide · exactly seven authorized tracked files staged and committed.

#### Runtime evidence (Task 016) — two separate layers, not to be combined

**Layer 1 — automated isolated runtime verification.** Google Chrome for Testing `148.0.7778.96`, fresh disposable profile outside the repository, extension ID `ccolepkadgjblolibndpeglajhokknbg`, loaded unpacked from the exact canonical `VIGIL-FIELD-UNIT` directory:

- manifest accepted, no manifest error
- MV3 service worker **activated with zero captured errors**
- static popup rendered the honest disabled state with **zero scripts and zero errors**
- runtime permissions: **`storage` only, origins empty**
- **no content-script injection, no overlay, no DOM mutation, no provider request**
- `FETCH_TELEMETRY` returned the documented **`UNAVAILABLE`** response
- the seven deprecated metric keys **absent after install**
- a genuine disposable-copy version update **behaviourally removed all seven deprecated keys while preserving a sentinel control key**, proving persisted storage was cleaned by the install/update handler
- all temporary profiles and disposable copies were removed afterwards

**Command-line load attempts against the installed browser failed and were discarded. They must never be represented as VIGIL evidence.**

**Layer 2 — owner-assisted confirmation in the installed browser.** Installed Google Chrome `152.0.7977.65`, observed by the owner, loaded unpacked via `chrome://extensions` from the exact canonical `VIGIL-FIELD-UNIT` directory:

- extension ID matched `ccolepkadgjblolibndpeglajhokknbg`
- service-worker inspection opened successfully
- console empty; Chrome displayed “No issues”
- toolbar popup opened and displayed the honest disabled / contained-alpha state
- Chrome reported “This extension requires no special permissions”
- Chrome reported “This extension has no additional site access”
- incognito access remained off; file-URL access was turned off
- Phantom was disabled before testing; VIGIL was removed afterwards and the temporary Chrome profile deleted

**Evidence boundary (binding).** Chrome for Testing 148 received the **complete automated behavioural verification**. Installed Chrome 152 received **only the limited owner-assisted confirmation listed above**. Telemetry response, storage migration, DOM-injection absence and update-cleanup behaviour were **NOT independently exercised in Chrome 152**. The two layers must never be combined into a claim of a single full-browser behavioural test.

**Chrome-version gap: partially closed.** Installed Chrome 152 accepted the unpacked extension and passed the limited owner checks above; full automated behavioural coverage still rests on Chrome for Testing 148.

None of this is deployment, release, production validation, or evidence of protective capability. **The extension issues no verdicts and provides no protection.**

### 3.13 API boundary containment state (Tasks 019–022)

**Status: `CONTAINED-SOURCE-PUBLISHED` for F11 and F13 only — pushed to `origin/development` (Task 022), NOT deployed, NOT production-verified, NOT permanently remediated. F12, F19, F20 and F25 remain fully OPEN.**

**Commit 1 — `71b78eda56eb6dadfe4867f42dbbc17788f9fa3d`** · `security(api): remove unauthenticated cache mutation surface`
Deleted `api/cache.ts` and `lib/cache.ts`; removed the dead `lib/cache` import, the now-unused `CACHE_VERSION` constant, the commented-out cache integration and the two cache-status logs from `services/heliusService.ts`. **170 deletions, zero insertions.** No live tracked caller existed. Production build passed.

**Commit 2 — `962c854261a8d29dba5142e8f84b787c7b65fef3`** · `security(api): remove client-controlled model and prompt endpoint`
`api/openai.ts` only, **17 insertions / 25 deletions**. The `generateText` case is removed; a server-controlled endpoint allowlist is evaluated **before** SDK construction; unsupported, missing and non-string endpoints return a generic HTTP 400 that reveals no internal configuration. The five fixed-purpose Gemini-fallback operations are retained and still select their own model, system prompt, response format and temperature. Production build passed.

**Evidence boundary.** Commit 2's rejection paths were **runtime-verified locally**: the real transpiled handler was executed against a **stubbed SDK with no network I/O**, and 7/7 rejection paths returned HTTP 400 with an identical generic body while the provider client was **never constructed**; a retained endpoint still routed correctly through the stub. Commit 1 rests on **static search plus production build only** — there was no runtime exercise, because nothing calls the deleted route. **Neither commit has been deployed or verified in production.**

**Publication (Task 022).** Read-only review of the exact first-parent chain `a6d2bbf → 71b78ed → 962c854 → 7fab8af` — parents, author and committer verified; changed paths and Git-derived counts (0/170, 17/25, 68/20) matched; no protected file included; no secret or private endpoint added; `git diff --check` clean; production build passed at `7fab8af`. Fresh fetch confirmed `origin/development` still at `a6d2bbf`; a **non-forced fast-forward push `a6d2bbf..7fab8af`** followed. Local, tracking and actual remote `development` all resolve to `7fab8af3850e7d7f7f7c7b5258d84d8ad5c67d62`; ahead/behind 0/0. Local, tracking and actual remote `main` unchanged at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`. **Nothing was deployed, released, merged, or production-verified.**

**Residual Task 020 debt (recorded, not fixed).**

- Dead `generateText` / narrative client wrappers remain in `services/openaiService.ts` and `services/aiRouter.ts` — unreachable from any component, but misleading; cleanup deferred.
- `@vercel/kv` is now an **unused dependency** in `package.json`; dependency changes were not authorized.
- API logging is **unchanged** apart from the two cache-status logs removed with the deleted integration — F20 stands.
- **`api/helius.ts` is the highest-priority remaining API exposure** and was not touched.
- Cache deletion does **not** reduce current provider-call amplification, because caching was already disabled (F26); F19 stands.
- A fresh remote fetch was unavailable during Task 020 because of a command safety-classifier outage; **no push occurred**, and a fresh fetch was completed successfully in the Task 021 preflight.
- **Tasks 027–029.** Task 027's bounded replacement was reviewed read-only in Task 028 and **retired instead of committed** (`RETIRE BEFORE ROBINHOOD IMPLEMENTATION`). Task 029/R1 removed `api/helius.ts` and `services/heliusService.ts` from the tracked source; Task 030 committed that retirement locally (`CONTAINED-COMMIT`). F12 stays `OPEN` for production because nothing is pushed, merged into `main` or deployed; production `main` remains exposed until an authorized release/deployment, and provider credential removal/rotation is an owner deployment action.

---

## 4. Cross-review reconciliation

| Topic | ChatGPT/Codex | Claude | Grok | Current evidence | Final decision |
|---|---|---|---|---|---|
| Website crawlability | Static/SSR essential content | No SSR; content in JS | Crawler saw empty; others got content | `VERIFIED` client-rendered SPA | Render essential content statically/SSR + metadata/sitemap |
| Fabricated/random verdicts | Contain now | Remove | Claims must be evidence-backed | `VERIFIED` (F1–F27, §3.7) | Extension subset **contained, published and runtime-verified in isolation**; API batch 1 (F11, F13) **published, undeployed**; website/simulation findings and F12/F19/F20/F25 **remain open**; **no live deployment claim** |
| Helius integration | Exists | Corrected: exists, AI still decides | — | `VERIFIED` telemetry; AI verdicts | Telemetry is evidence; deterministic verdict consumes it |
| Deterministic detection | Shared engine | `retinalShield` is real core | — | `VERIFIED` | One shared engine; AI explains only |
| Testing & CI | Add | Zero infra | — | `VERIFIED` none | Quality floor (Phase 00) |
| Extension priority | Primary | Flagship | Must be verifiable | Legacy deterministic logic exists but is unvalidated and disabled | Primary surface; pre-sign coverage separately designed |
| Solana vs EVM/RH | RH-first, keep Solana | Isolate Solana, add EVM | — | Legacy deterministic Solana logic exists but is unvalidated and disabled | **Superseded by owner direction (v1.1.0): Robinhood Chain only.** Solana leaves active scope; legacy code is retired by a separately authorized task (§6.2), not discarded blindly |
| API security | Allowlist/auth/limits | Open proxy + unauth cache | — | `VERIFIED` | Harden `/api/*` (Phase 00) — batch 1 (F11, F13) published, undeployed; F12 purpose-specific operation contract pending |
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
9. **Chains** — **Robinhood Chain is the exclusive initial target** (owner direction, v1.1.0). One EVM adapter behind a common interface; explicit, honest unsupported-chain behaviour everywhere else. Legacy Solana support is out of active scope and is retired only by a separately authorized, dependency-aware task (§6.2).
10. **Public claims** — no accuracy/latency/adoption/partnership/protection claim without methodology, date, version, limits.
11. **Token status** — no official token/presale/airdrop exists; no token functionality without a separate approved gate.
12. **Robinhood references** — chain compatibility never implies partnership, endorsement, exchange listing, or a guaranteed token path.
13. **Evidence accuracy rules (owner-approved, v1.1.0)** — an EVM address has **no universal creation timestamp**; Robinhood-only history **cannot establish lifetime activity on other chains**; "deployer" does **not** automatically mean every developer-controlled wallet; shared funding does **not** prove common ownership; transfers are **not** automatically sales; a token name/symbol is **not** contract identity; official identity or verified source does **not** establish safety; unknown, incomplete, stale or unsupported evidence must remain **explicit**; VIGIL makes **no claim** to detect every hack, predict every rug pull or guarantee profitable decisions.
14. **Coverage honesty** — no promise of universal website/wallet interception or visibility into every intent; supported platforms and wallets are named only after verification (§12.3).
15. **Monetization honesty** — never mark an unchecked feature safe, never hide a detected serious warning behind payment, never promise unlimited usage before cost validation (§16.1).

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

### 6.1 Extension architecture (proposed; CTO review pending)

- **Shared wallet-request inspection** — one boundary that observes wallet requests (EIP-1193-style provider calls, signing and transaction requests) on supported pages and normalizes them into inspectable intents. Its exact coverage per wallet is a verification result, never an assumption (X8).
- **Platform-specific context adapters** — small adapters that read platform page context (token contract in view, launch metadata, pool/route) for each **verified** supported platform (§12.3). Adapters are candidates until domains, deployments, chain support and wallet compatibility are verified.
- **Background analysis** — the extension service worker requests bounded, server-orchestrated evidence (§12.2) and caches nothing sensitive client-side without disclosure.
- **Compact in-page findings** — a small, non-blocking summary at the point of decision; **expandable evidence** shows the reproducible basis for every finding; **signing-time warnings** appear only when decoded intent or evidence warrants them.
- **Normalized evidence schema** shared by extension and website (Phase 01) with explicit `UNKNOWN`/`ERROR` states; simulations are always labelled.

### 6.2 Legacy-integration retirement (planned; NOT authorized by this revision)

Solana-specific code — `VIGIL-FIELD-UNIT/content/retinalShield.js` heuristics, `api/helius.ts` and `server/helius/*` (Task 027 working tree), `services/heliusService.ts`, `utils/poisoningDetector.ts` (protected, untracked), Solana mint registries, Solana-only simulation scenarios — is retired through a **separately authorized, dependency-aware task** that: maps every dependency and caller first; preserves security findings and their evidence; keeps history intact; removes or fences code in reviewable batches with build and test evidence; and never leaves an unauthenticated provider route behind. **General legacy-retirement authorization does NOT authorize inspecting, hashing, modifying, moving or deleting the protected files `AGENTS.md`, `services/heliusService copy.bak.co` and `utils/poisoningDetector.ts`; each requires separate owner authorization naming its exact path.** Until then, each legacy integration retains its **individually recorded status and unresolved exposures in §3.7** — some contained, some still `OPEN` — pending verified containment or retirement; none is marketed. Task 028 decided to retire rather than commit Task 027; Task 029 removed the Helius route and client from the tracked source and Task 030 committed it locally (not pushed, not deployed) — **no production remediation is claimed**; production `main` still serves the legacy routes until an authorized deployment.

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
   - ✅ F1–F23 reachability inventory (Task 012 + CTO review + 013-R1, §3.7) · ✅ F24–F27 API-boundary observations (Task 019, §3.7)
   - 🟨 extension containment **subset** implemented, statically verified, published in `3c1fb2b` and runtime-verified in isolation (F1–F4, F14–F16, F21–F23) — containment only, not remediation
   - 🟨 credential-bearing provider endpoint removed and committed locally; **any provider credential rotation remains an owner action**
   - 🟨 unsigned external handshake removed and committed locally (worker + manifest)
   - ⬜ paid checkout / dead payment code (F8)
   - ⬜ admin backdoor (F9)
   - 🟨 API boundary — **F11 and F13 `CONTAINED-SOURCE-PUBLISHED`** (Task 020 source, Task 022 push; **undeployed**); **F12, F19, F20, F25 open**
   - ✅ push of API containment batch 1 to `origin/development` (Task 022)
   - ⬜ deployment and production verification of API containment batch 1
   - ⬜ website integrity (F5, F6, F7)
   - ⬜ simulation labelling (F10, F17, F18)
   - ⬜ TypeScript / test / lint / dependency / CI quality floor
   - ✅ **browser runtime verification of the containment** (Task 016 — isolated Chrome for Testing 148 + owner-assisted Chrome 152 confirmation)
   - ✅ local commit of the approved seven-file containment (`3c1fb2b`)
   - ✅ push to `origin/development` (Task 015)
   - ⬜ deployment / release verification
5. **Security requirements** — no client-distributed provider secret/endpoint; allowlisted, bounded, authenticated API operations; secret history scan.
6. **Privacy requirements** — logging without sensitive data; no new outbound data flows; cache not client-writable.
7. **Required evidence** — build log, typecheck log, audit output, containment diff, CI run.
8. **Acceptance criteria** — all Category-3 items disabled/contained; no client secret; `/api/*` bounded+validated; reproducible branch.
9. **Exit gate** — install/build/targeted-tests/security-checks run predictably; containment verified by re-inspection.
10. **Key risks** — breaking the build during containment; a missed reachable fabrication path.
11. **Out of scope** — monorepo migration; website redesign; new features; token work.

### Phase 01 — Deterministic detection kernel  ⬜
1. **Objective** — one deterministic, explainable evidence engine for **Robinhood Chain** shared by extension + website, built as the foundation for pre-sign trading assistance and the analysis priorities in §12.2 (owner direction, §18.A).
2. **Rationale** — the verdict is the product; it must be reproducible from evidence.
3. **Dependencies** — Phase 00 containment + quality floor. **Phase 01 implementation must not begin before those Phase 00 dependencies pass.**
4. **Checklist** — **Priority order (owner-approved, §18.A):** (a) the shared deterministic engine; (b) the Robinhood-compatible EVM adapter; (c) a normalized chain-event and evidence schema; (d) deterministic provider-failure behaviour that returns `UNKNOWN` or `ERROR` — **never fabricated fallback evidence**; (e) identical evidence semantics for the website and the extension. **None of these capabilities exists yet; nothing in this list is implemented.** Then: define verdict states (`SAFE`/`CAUTION`/`HIGH_RISK`/`UNKNOWN`/`ERROR`), evidence+confidence schema, fail-safe behavior, FP/FN measurement, registry provenance; capabilities (chain-aware validation, prefix/suffix + full-distance similarity, history provenance, first/last-seen, dust/zero-value, trusted-recipient recognition, allow/deny lists, canonical-asset verification, versioned rules, human-readable evidence, **no random/AI verdicts**); adapters (**Robinhood Chain EVM/EIP-55 only** behind a common interface — the Solana adapter is **superseded** under v1.1.0 and retired via §6.2); test corpus (confirmed poisoning, lookalikes, dust, clean repeats, new-legit, malformed, contracts, checksum, provider-failure, registry-tampering, FP-boundary — all on Robinhood Chain fixtures); integration (**no instruction to open `utils/poisoningDetector.ts` — it is a protected file; any transferable concept comes only from the Task 006 review already on record unless separate owner authorization naming that exact path is granted**; keep only validated rules, wire Robinhood Chain provenance through a **verified, separately approved provider — none selected**, remove forced `NEW`+fake latency, AI explains only, single engine everywhere).
5. **Security requirements** — deterministic path immune to AI/randomness; registry integrity; safe provider failure.
6. **Privacy requirements** — local-first analysis; minimized retained data; documented telemetry.
7. **Required evidence** — versioned test-corpus report (catches/misses/uncertain) + measured FP rate.
8. **Acceptance criteria** — corpus passes; FP documented; failure/unknown safe; verdicts reproducible from recorded evidence.
9. **Exit gate** — no AI/random controls a classification; engine consumed identically by both surfaces.
10. **Key risks** — false positives; magic-number thresholds (`retinalShield` entropy `<3.8`, similarity `>85`).
11. **Out of scope** — EVM feature depth beyond adapter; UI polish; store submission.

### Phase 02 — Chrome extension private alpha  ⬜
1. **Objective** — evidence-backed pre-sign assistance for **one end-to-end Robinhood Chain trading workflow** on one verified platform and wallet: background analysis, compact in-page findings, expandable evidence, signing-time warnings (§6.1), **and a bounded pre-buy token-evidence panel (X34)** — token identity, earliest **observed** Robinhood Chain activity, immediate funding evidence, holder concentration with pools/burns separated, deployer holdings, and decoded purchases/sales — every value carrying its observation block/time, history coverage, evidence link and explicit unavailable/stale state. Advanced cluster investigation (A12–A13) and wider platform coverage stay in Phase 07.
2. **Rationale** — protection at the decision point, on the platform the user already uses, is the product.
3. **Dependencies** — Phase 01 engine + EVM adapter + normalized evidence; the browser-wallet interception boundary and threat model (X8, established first); one verified platform (§12.3).
4. **Checklist** — single purpose; shared wallet-request inspection + one platform context adapter; decode approval spender/allowance and transaction intent; bounded pre-buy token-evidence panel (A1–A6 scope, §12.2; X34); detect addresses in relevant contexts; local analysis; safe/caution/high-risk/unknown with evidence; confirm/cancel/allowlist; fix `document_start`/`document.body` race; minimize `<all_urls>` → optional permissions; validate runtime messages+origins; remove duplicated detector (use shared engine); no sensitive data in unencrypted storage; pause + per-site controls; safe update/rollback; document outbound requests; FP-report flow; no embedded provider credential.
5. **Security requirements** — MV3 minimum permissions; message/origin validation; no privileged endpoint in client.
6. **Privacy requirements** — disclosed data handling; telemetry only with consent; local storage hygiene.
7. **Required evidence** — alpha test log; crash/FP records; permission-justification doc; **historical-replay and warning-timing report (§12.4)**.
8. **Acceptance criteria** — no critical/high findings; no random/fabricated verdict; disclosure matches behavior; every permission justified; **the token panel shows only obtained evidence, each value with observation block/time, coverage and evidence link, and explicit unavailable/stale states; the §12.4 replay shows no future-information leakage and reports false alerts and warning timing honestly**.
9. **Exit gate** — emergency-disable + rollback tested; alpha stable.
10. **Key risks** — store distrust of a new security extension; pre-sign scope creep.
11. **Out of scope** — store submission; marketing launch; broad protocol coverage and advanced analysis beyond what the first workflow needs. **In scope** for that workflow: approval spender/allowance and transaction-intent decoding, token-contract identity, and destination/poisoning evidence at signing time. Wider protocol coverage, advanced cluster and coordinated-selling investigation (A12–A13 depth), additional platforms and wallets are Phase 07.

### Phase 03 — Crawlable & truthful website  ⬜
1. **Objective** — a clear, accessible, crawlable site for **discovery, installation, documentation, support and clearly labelled demonstrations** of verified extension capabilities — **not a mandatory analysis dashboard**; facility → `/lab`.
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
3. **Dependencies** — Phase 02 alpha; from Phase 03 only the **essential** items — a truthful installation page, the privacy/data-flow disclosure (W19), a support and security-disclosure channel, and accurate release disclosures — **not** completion of the full website work package (W1–W25).
4. **Checklist** — beta users (provisional CTO target range 100–250 — requires owner approval & capacity review); crash-free + retention baselines; FP/override rates; privacy policy + data disclosures; permission justifications; store assets; support/incident channels; independent security review where feasible; submit; respond to review; publish V1 after release gate; **validate the Free/Pro allocation, quotas and operating costs with beta evidence (§16.1)**. Release gates rest primarily on representative coverage, absence of unresolved critical/high findings, measured false-positive behavior, stability, privacy compliance, and support capacity — not a fixed tester count.
5. **Security requirements** — reproducible, signed release; supply-chain controls; MV3 remote-code policy.
6. **Privacy requirements** — store data-handling disclosure matches behavior.
7. **Required evidence** — beta metrics; review correspondence; reproducible-build record.
8. **Acceptance criteria** — no critical/high findings; store policy ↔ behavior agree; docs match reviewed build.
9. **Exit gate** — support/incident processes live; rollback tested.
10. **Key risks** — store rejection on permissions/privacy; FP spikes at scale.
11. **Out of scope** — token; multi-chain breadth beyond adapter.

### Phase 05 — Evidence-led marketing & X/Twitter plan  ⬜ (runs in parallel from Phase 01)
1. **Objective** — build trust/distribution via threat education, real progress, verifiable evidence (see §11), and — once a tested release backlog exists — the 30-day progressive release campaign (§11.1), which is a strategy, not a promise of 30 features.
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
1. **Objective (re-scoped v1.1.0)** — Robinhood Chain is now the **exclusive** target from Phase 01 onward, so this phase covers **expansion of verified checks, platforms and wallets beyond the first workflow validated in Phase 02** (§12.2, §12.3), independent of any token. Phase 02 owns first-workflow validation; Phase 07 does not duplicate it. This is a scope statement, **not** an implementation claim — nothing is built, tested, or provider-selected.
2. **Rationale** — serve a young EVM ecosystem's vulnerable users.
3. **Dependencies** — Phase 00 containment and quality-floor exit (unchanged); Phase 01 deterministic engine; Phase 01 EVM adapter; Phase 02 first-workflow validation; **current** external verification of Robinhood Chain facts (§12 gate). **Clarifications:** architecture and provider *evaluation* may begin after Phase 00; production integration remains gated by Phase 01 evidence; real-time (post-chain) monitoring is **separate from and does not prove** wallet-level pre-sign protection; compatibility **never** implies Robinhood partnership, endorsement, affiliation, or listing.
4. **Checklist** — analysis priorities A1–A13 (§12.2), including the advanced cluster and coordinated-selling depth (A12–A13), with the accuracy rules of §5.13; platform/wallet verification and context adapters (§12.3); the bounded R1–R13 package (§12.1) with R5/R7 re-scoped as optional post-purchase alerts, not a primary dashboard; chain config; validate EOA/contract addresses; EIP-55; calldata/simulation inspection; approval/allowance risk; contract-verification awareness; EVM-history poisoning evidence; token metadata; wallet compatibility; publish RH threat report; endorsement-avoiding disclaimers.
5. **Security requirements** — provider allowlist for EVM RPC; safe simulation; no privileged endpoint in client.
6. **Privacy requirements** — local-first EVM analysis where possible; disclosed remote calls.
7. **Required evidence** — chain-specific corpus report; verified-source external references.
8. **Acceptance criteria** — explainable RH warnings; safe provider-failure degradation; expanded checks pass the §12.4 replay with reported false-alert rates and warning lead times.
9. **Exit gate** — docs distinguish chain support from partnership; external facts verified (§12).
10. **Key risks** — reliance on unverified chain facts; endorsement misperception.
11. **Out of scope** — any token; Robinhood partnership/listing claims.

### Phase 08 — Product traction & business validation  ⬜
1. **Objective** — prove users need/trust/repeatedly use VIGIL before token complexity (see §16).
2. **Rationale** — token discussion requires demand evidence.
3. **Dependencies** — Phases 02/04 usage.
4. **Checklist** — track KPIs (§16); validate the Free + Pro split, quotas, price hypothesis and operating costs with private-beta evidence (§16.1); evaluate other non-token revenue (wallet/dApp API, SDK, feeds, partnerships).
5. **Security requirements** — analytics without sensitive data; secure metrics pipeline.
6. **Privacy requirements** — consented, aggregated, anonymized metrics.
7. **Required evidence** — measured baselines; documented product-market evidence.
8. **Acceptance criteria** — meaningful repeated usage; FP within approved boundary; ≥1 sustainable non-token path evaluated.
9. **Exit gate** — honest product-market evidence documented.
10. **Key risks** — vanity metrics; premature monetization.
11. **Out of scope** — token; unproven partnership claims.

### Phase 09 — Formal token necessity, legal & economic review  ⬜ (gate, not a launch)
1. **Objective** — decide whether a token enables an essential capability unattainable more safely otherwise (see §13), including the owner's recorded intent of a VIGIL token with subscription-payment utility on Robinhood Chain.
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
2. 🟨 **Task 013 extension containment** — implementation, static checks, production build, CTO diff approval, publication and isolated runtime verification all complete · **deployment, release and Phase 01 replacement pending**
3. ✅ Commit the approved seven-file extension containment — `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` (Task 014)
4. ✅ Push it to `origin/development` — fast-forward `bfcf850..ec78e0c` (Task 015)
5. ✅ Perform extension runtime/browser verification — isolated Chrome for Testing 148 plus owner-assisted Chrome 152 confirmation (Task 016, §3.12)
6. 🟨 API emergency containment — **batch 1 `CONTAINED-SOURCE-PUBLISHED`** (F11 via `962c854`, F13 via `71b78ed`; pushed in Task 022, fast-forward `a6d2bbf..7fab8af`) · **deployment and production verification pending** · **F12, F19, F20, F25 still open** (batch 2 — F12 is the highest-priority current API exposure)
7. ⬜ Website integrity containment — F5, F6, F7, F9
8. ⬜ Simulation / dead-code containment — F8, F10, F17, F18
9. ⬜ Establish the TypeScript, test, lint, dependency and CI quality floor
10. ⬜ Re-inspect F1–F27 and record acceptance evidence
11. ⬜ Release-gated merge to `main`
12. 🟦 Task 028 → **retire** Task 027; Task 029/R1 retirement committed locally by Task 030 (`CONTAINED-COMMIT`) — push only on separate authorization; production `main` remains exposed until an authorized release/deployment; `HELIUS_*` environment removal/rotation is an owner deployment action
13. ⬜ **After the Phase 00 exit gate** — the v1.1.0 sequence below

**Sequencing (owner-approved direction, v1.1.0).**
1. Phase 00 containment and quality-floor dependencies remain the current priority and are **preserved unchanged**: API Batch 2 (F12, F19, F20, F25), website containment (F5, F6, F7, F9), simulation/dead-code containment (F8, F10, F17, F18), and the quality floor.
2. Then: establish the **browser-wallet interception boundaries and threat model** (X8 first).
3. Build the **shared deterministic analysis engine, the Robinhood-compatible EVM adapter and normalized evidence** (Phase 01).
4. **Validate one end-to-end Robinhood Chain trading workflow** on one verified platform and wallet, including the bounded pre-buy token-evidence panel (Phase 02, X34).
5. **Expand verified checks and platform/wallet coverage** (Phase 07, §12.2–§12.3).
6. **Validate private beta, monetization and operating costs** (Phases 04/08, §16.1).
7. **Prepare the release backlog and the 30-day launch campaign** (§11.1).
8. Pre-sign assistance is central; a standalone watchlist/dashboard is **not** the primary deliverable. Legacy-integration retirement (§6.2) is scheduled dependency-aware and separately authorized.

**Finding status summary (four separated categories — see §3.7 for each row's exact status).**

- **Still open, or with an underlying unresolved component:** F5 · F6 · F7 · F8 (dead code, not an active vulnerability) · F9 · F10 · **F12** (removed from tracked source by Task 029, committed locally by Task 030 — not pushed, not production-remediated) · F17 · F18 · **F19** · **F20** · F21 (unsafe reachability contained; **underlying heuristic unfixed**, currently unreachable) · **F24** (configuration/reproducibility gap) · **F25** · F27 (hygiene only).
- **Source-contained and published, but undeployed:** **F11 and F13** — `CONTAINED-SOURCE-PUBLISHED` on `development` (Task 022); **not deployed, not production-verified, not permanently remediated**; the deployed site may still expose the old routes.
- **Extension findings contained and runtime-verified in isolation, with limitations remaining:** F1 · F2 · F3 · F4 · F14 · F15 · F16 · F22 · F23 — `CONTAINED-RUNTIME-VERIFIED` (`3c1fb2b`, Tasks 015–016); **deployment/release verification, Phase 01 replacement, provider-side rotation (F14) and F16 closure via authorized legacy retirement plus verification (USDC replacement superseded, v1.1.0) remain pending**.
- **Other outstanding verification and quality-floor work:** deployment/release verification (Task 016's isolated browser runtime verification is **complete** and is *not* pending) · F16 closure via authorized legacy retirement and verification (replacement superseded) · orphaned extension files and unused CSS · the dependency/type/test/lint/CI quality floor.

**Explicitly still pending (none of these is complete):** complete quality floor · TypeScript remediation · tests, lint and CI · provider credential decision · F16 closure via authorized legacy retirement plus verification · full detector implementation · deployment · Chrome Web Store release · merge into `main`.

**Must NOT do yet:** monorepo migration, website redesign, token work, broad feature development.

---

## 9. Website plan (executable work packages)

**Role (v1.1.0):** the website serves discovery, installation, documentation, support and clearly labelled demonstrations of verified extension capabilities. It is **not** a mandatory analysis dashboard, and it must never imply that visiting the site is required to cross-check a token.

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
| X5 | ~~Preserve validated Solana logic~~ **Superseded (v1.1.0)** — transferable concepts only; Solana rules leave active scope | — | — | — | Retired via §6.2 |
| X6 | ~~Solana adapter~~ **Superseded (v1.1.0)** | — | — | — | Retired via §6.2 |
| X7 | **Robinhood Chain EVM adapter (primary)** | Adapter module | X4, §12 | Fixtures | Passes Robinhood Chain corpus |
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
| X27 | Shared wallet-request inspection boundary | Provider-call/signing-request observer + normalized intent | X8 | Coverage matrix per wallet | Verified interception on supported wallets; explicit "not covered" elsewhere |
| X28 | Platform context adapters (verified platforms only) | One adapter per §12.3-verified platform | X27, §12.3 | Fixtures per platform | Correct token/launch context; graceful failure on layout change |
| X29 | Background analysis client | Bounded evidence requests to the server operations | Phase 01 engine | Test | No credential in client; `UNKNOWN`/`ERROR` honoured |
| X30 | Compact in-page findings + expandable evidence | Non-blocking summary + evidence panel | X10, X11, X29 | UI review | Every finding shows reproducible evidence and limits |
| X31 | Signing-time warnings | Decoded spender/allowance/intent warnings at signature time | X27, A10 | Test | Warnings match decoded intent; no fabricated evidence |
| X32 | Post-purchase alerts (optional, Pro candidate) | Material-change alerts for user-authorized addresses | R5, R7, §16.1 | Test | Opt-in only; evidence-backed; not a primary dashboard |
| X33 | Entitlement enforcement (Free/Pro) | Server-enforced entitlements + secure payment handling | §16.1; separate approved implementation | Test | Warnings never hidden behind payment; quotas disclosed |
| X34 | Pre-buy token-evidence panel (bounded, Phase 02) | Panel presenting A1–A6 evidence with observation block/time, history coverage, evidence links and unavailable/stale states | X29, X30, Phase 01 engine | Fixtures + §12.4 replay | Only obtained evidence shown; every value dated and sourced; nothing implied where evidence is absent |

### 10.1 Intent Validator reconciliation (v1.1.0) — scoped requirements, not implemented protection

The existing Intent Validator carries twelve **labelled simulation scenarios** (`testScenarios` in `components/IntentValidatorDemo.tsx`). They are demonstrations. This table converts each into a **scoped requirement** for Robinhood Chain; **none is an implemented or tested protection**, and each becomes real only with reproducible evidence and verified browser coverage.

| Vector (simulation) | v1.1.0 scoped requirement | Status |
|---|---|---|
| `NEW` (new provenance) | Deployer/counterparty earliest **observed Robinhood Chain** activity with explicit observation window; never a universal creation time (§5.13) | ⬜ requirement |
| `TRUSTED` | Local, user-controlled recognition of previously confirmed destinations; **not** a safety verdict | ⬜ requirement |
| `POISON` (visual poisoning) | Address-poisoning evidence: look-alike destination vs user history, with reproducible diff | ⬜ requirement |
| `ZERO_VALUE_SPOOF` | Zero-value / history-injection transfer evidence | ⬜ requirement |
| `CLIPBOARD` | Clipboard / destination-mismatch detection with verified browser coverage | ⬜ requirement |
| `DUST` | Unsolicited dust-transfer evidence | ⬜ requirement |
| `SIMILARITY` | Prefix/suffix/edit-distance similarity with calibrated thresholds and measured FP rate | ⬜ requirement |
| `MINT` (Solana mint mismatch) | **Replaced:** EVM **token-contract identity** — contract address vs name/symbol, deployment history, verified-source status (§12.2 A1) | ⬜ requirement |
| `MARKET_INTEL` ("Pump.fun Rug-Risk") | **Replaced:** platform-neutral **Launch & Liquidity Risk** — allocations, holder concentration with pools/burns separated, liquidity and protocol-specific withdrawal/control risk (§12.2 A4–A7) | ⬜ requirement |
| `ACCUMULATION_TRAP` | Deployer/holder accumulation evidence with explicit denominator and observation block/time; candidate-cluster combined holdings and decoded selling (§12.2 A5–A6, A12–A13) | ⬜ requirement |
| `PHISHING` | Source-context phishing evidence (not domain-only verdicts — F21 lesson) | ⬜ requirement |
| `SUPPLY_POISONING` (clustered seeding) | Suspicious funding/seeding pattern evidence; **shared funding is not proof of common ownership** (§5.13) | ⬜ requirement |

Simulations stay visibly labelled and isolated from live evidence (Task 027-R2 display selector); implemented and tested capabilities are recorded only in §3.7/§19 with evidence.

---

## 11. Marketing & X/Twitter plan

**Positioning:** *"the last safety check before an on-chain action becomes irreversible."*
**Pillars:** threat education · build-in-public · verified fixture demonstrations · privacy/security explanations · weekly progress · Robinhood Chain technical research · extension alpha recruitment. **Positioning is Robinhood-Chain-only and extension-first (v1.1.0); no multi-chain claims.**

### 11.1 Thirty-day progressive public-release campaign (owner-approved strategy, v1.1.0)

Owner intent: build and test updates in advance, then release them progressively over 30 days. This is a **launch strategy — not a promise of 30 completed features**. Rules:

- Every planned release ships **tested functionality or another genuinely useful deliverable** (documentation, verified demo, support material), with a dependency order, an accurate announcement/demo, stated limitations and rollback criteria.
- Prebuilt work may be announced when released; **never pretend it was coded that day**.
- **Urgent security fixes are never delayed** for the campaign.
- Git publication, website deployment and extension distribution are **separate events** with their own gates; routine release checks and necessary maintenance remain required throughout.
- The backlog is prepared only after private beta, monetization and cost validation (§8 sequence step 7). Content follows the §11 evidence and defamation rules.

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

**Owner direction (v1.1.0): Robinhood Chain is the exclusive initial product target.** Tracks: technical compatibility · testnet evaluation · wallet/tx UX · chain adapter · threat fixtures · platform/wallet verification (§12.3) · ecosystem participation · production-support gate. "Partnership outreach" is retained only as outreach; no partnership, listing or endorsement is claimed or assumed.

**Research gate — `NEEDS CURRENT EXTERNAL VERIFICATION`.** Official primary sources are required **before**: choosing chain configuration; publishing chain IDs or RPC info; making ecosystem claims; making partnership claims; publishing token/airdrop statements; finalizing Robinhood-focused marketing. Do not rely on prior-session memory for any time-sensitive fact.

**Non-negotiable:** technical chain support never implies Robinhood partnership, endorsement, listing, or exchange access.

### 12.1 Real-time Robinhood Chain monitoring — bounded work package (owner-approved priority, §18.A)

> **Status: ⬜ NOT STARTED. Nothing below is implemented, tested, or provider-selected.** This package becomes active only after the Phase 00 exit gate; production integration is gated by Phase 01 evidence. **No production provider has been selected or approved.** Do **not** assume Helius — or any Solana-era provider — supports Robinhood Chain; provider capability requires current external verification. Real-time (post-chain) monitoring is **separate from** pre-sign interception and does not prove it.

| # | Work package | Deliverable | Dependency | Acceptance |
|---|---|---|---|---|
| R1 | Real-time block and event ingestion | Ingestion service consuming Robinhood Chain blocks/logs | Phase 01 EVM adapter; §12 gate | Deterministic, replayable ingestion; gaps detected and reported |
| R2 | Token-transfer and approval-event monitoring | ERC-20/721 transfer + approval decoding | R1 | Events decoded against verified ABIs; unknown ABI → `UNKNOWN` |
| R3 | Address classification | Public-address vs contract-address vs token-address classifier | R1 | Evidence-backed classification; ambiguous → `UNKNOWN` |
| R4 | Indexed history where standard JSON-RPC is insufficient | Evaluated indexing approach (no provider selected) | R1; provider evaluation | Documented gap analysis; provider chosen only by separate owner/CTO approval |
| R5 | Watched-address monitoring **(re-scoped v1.1.0: optional post-purchase alerts, Pro candidate — not a primary dashboard)** | Server-side watch list with evidence trail | R1–R3; §16.1 | Only user-authorized addresses; opt-in; no covert tracking |
| R6 | Normalized evidence delivery | Shared normalized chain-event + evidence schema consumed by website and extension | Phase 01 schema | Identical evidence semantics on both surfaces |
| R7 | Evidence-backed user notifications **(re-scoped v1.1.0: material-change alerts after purchase, optional)** | Notification pipeline | R6 | Every notification carries reproducible evidence; no verdict without evidence |
| R8 | Server-side provider credentials only | Credential boundary | Phase 00 F12/F14 lessons | No provider secret or privileged endpoint in any client |
| R9 | Purpose-specific, validated, bounded API operations | Operation contract (not a proxy) | Phase 00 F12 remediation | Allowlisted operations, strict schemas, bounded pagination |
| R10 | Authentication, rate limits, cost ceilings, privacy-safe logging | Boundary controls | R9 | Enforced in code and tested; logs redacted |
| R11 | `UNKNOWN` / `ERROR` when evidence is unavailable | Deterministic failure behaviour | Phase 01 engine | Provider failure never yields a fabricated or "safe" result |
| R12 | Testnet verification before production use | Testnet corpus + run log | R1–R11; §12 gate | Passes on Robinhood Chain testnet before any production traffic |
| R13 | Separation of post-chain monitoring from pre-sign interception | Documented boundary + UI language | X8 (§10) | No monitoring feature is described as pre-sign protection |

### 12.2 Analysis priorities (owner-approved scope, v1.1.0) — nothing below is implemented

Each item is a requirement for **evidence-backed** analysis. Every emitted value must carry its **observation block/time**, the **history coverage** actually inspected, an **evidence link** to the underlying on-chain data, and explicit **unavailable/stale** states; `UNKNOWN`/`ERROR` behaviour is mandatory. **Provider evaluation must establish the required historical coverage, latency and cost before any provider or platform is called supported** — none is selected. The accuracy rules of §5.13 bind every row.

| # | Analysis | Evidence required | Explicit limits |
|---|---|---|---|
| A1 | Token contract identity and deployment history | Contract address, creation transaction, deployer, verified-source status | Name/symbol ≠ identity; verified source ≠ safety |
| A2 | Deployer's earliest **observed** Robinhood Chain activity | First observed transaction within the indexed window | No universal creation timestamp; other-chain history unknown |
| A3 | Funding time, immediate funding source, reliable attribution | Funding transaction + immediate counterparty, with observation block/time and history coverage | Shared funding or entry timing **alone** ≠ ownership ≠ developer attribution; attribution stated with confidence and source |
| A4 | Deployer allocations, purchases, transfers, sales, holdings | Decoded events **distinguished** as plain transfers, swaps, exchange deposits or liquidity operations, with direction and venue | Transfers ≠ sales unless a swap/sale is decoded; an exchange deposit is not a sale; a liquidity operation is not a sale; "deployer" ≠ every dev wallet |
| A5 | Supply percentages | Numerator, **explicit denominator** (total / circulating as defined), observation block/time | Denominator and block/time always shown |
| A6 | Holder concentration | Top-holder table with identifiable pools/burn addresses **separated**, observation block/time | Unidentified contracts stay `UNKNOWN` |
| A7 | Liquidity and protocol-specific withdrawal/control risk | Pool identity, lock/ownership state where verifiable | Unsupported protocols → `UNKNOWN`, never "safe" |
| A8 | Mint / pause / blacklist / upgrade / transfer restrictions | Verified-source or bytecode-signature evidence for **supported** patterns | Unsupported patterns explicitly unsupported |
| A9 | Address poisoning, destination mismatch, phishing evidence | Reproducible diffs against user history/context | Requires verified browser coverage |
| A10 | Actual approval spender, allowance, decoded transaction intent | Decoded calldata at signing time | Undecodable intent is reported as undecodable |
| A11 | Optional post-purchase alerts for material changes | Opt-in watched addresses (R5/R7) | Optional; not a primary dashboard |
| A12 | Historical token redistribution and evidence-backed candidate wallet clusters (hidden supply) | Allocation/transfer graph from deployer and early recipients; each cluster labelled **candidate** with the specific on-chain evidence linking its members; **combined current holdings without double counting**, with observation block/time | **Connected wallets ≠ proven common ownership ≠ proven developer wallets.** Shared funding or entry timing alone never establishes ownership or developer attribution |
| A13 | Coordinated or subsequent selling by candidate clusters | Decoded swaps/sales and exchange deposits per cluster over time, distinguished from transfers and liquidity operations | Only decoded selling counts as selling; a cluster's later sales do not retroactively prove its ownership |

### 12.3 Platform and wallet candidates (unverified until proven)

MEVX, "PONs" (owner-provided spelling; exact identity unresolved), Uniswap and other Robinhood Chain trading/launch platforms are **candidates only**. Before any is named as supported, verify: exact domains, contract deployments on Robinhood Chain, chain support, and wallet compatibility — from primary sources, recorded with dates. Architecture: shared wallet-request inspection (X27) plus a platform-specific context adapter (X28). **No universal website/wallet interception and no visibility into every intent is promised.**

### 12.4 Historical replay and warning-timing evaluation (required before any early-warning claim)

- Replay historical Robinhood Chain activity using **only the information available at each decision point** (block/time cutoff); any use of later data is a leakage defect.
- Include **benign shared-infrastructure cases** (innocent shared funding, common launch tooling, legitimate market makers), **incomplete-history cases** and **provider-outage cases**; the evaluation reports false alerts and warning timing for each.
- **A warning discovered after the dump does not count as successful advance detection.** Report the distribution of warning lead times honestly, including zero and negative cases.
- Fixtures require on-chain evidence; **social-media accusations are not verified incidents** and may not seed a fixture without independent on-chain confirmation.
- VIGIL makes **no promise** to predict every rug pull or to see private/off-chain transactions; results are reported with their coverage limits.

---

## 13. Token decision framework (gate, not a promise)

**Owner ambition recorded (v1.1.0).** Ajmal Fahad intends a VIGIL token on Robinhood Chain with **subscription-payment utility**. Recorded as intent only. **Undecided:** mandatory vs optional token payment. **Unresolved:** dollar-denominated pricing vs token quantity, reliable price quotes, refunds, entitlement expiry, legal requirements, and token economics. All gates below remain in force; this revision **does not** authorize token issuance and claims **no** Robinhood listing, affiliation or endorsement.

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
⭐ False-positive rate (primary) · false-negative discovery process · precision/recall where datasets permit · warning acceptance vs override rate · extension activation & retention · protected-action count · performance overhead · API reliability · crawler/indexability · incident rate · marketing conversion · user-trust signals · **operating cost per active user and per check (required before any quota or price is finalized)**.

### 16.1 Free + Pro monetization (owner decision: Free + Pro; allocation and pricing are proposals)

- **Owner decision:** the product is Free + Pro.
- **Price hypothesis:** **$19/month** is a *proposed launch-price hypothesis*, not a finalized price; $9 and $25 were alternatives discussed. Final price, feature allocation, quotas and operating costs are settled through **beta evidence** (Phases 04/08).
- **Candidate split (proposal):** *Free* — essential identity, poisoning, destination and approval checks within disclosed limits. *Pro* — deeper provenance/holdings analysis, expanded supported checks, higher limits, optional continuous monitoring (X32).
- **Non-negotiables:** never mark an unchecked feature safe; never hide a detected serious warning behind payment; never promise unlimited usage before cost validation.
- **Implementation gate:** server-enforced entitlements and secure payment handling (X33) require their own approved implementation; nothing here is built.

## 17. Risk register

| Risk | Severity | Likelihood | Evidence | Mitigation | Owner | Trigger | Status |
|---|---|---|---|---|---|---|---|
| False-positive warnings | High | Med | magic-number thresholds | corpus + evidence + `UNKNOWN` | Eng | FP report | ⚠️ |
| Fabricated/random intelligence | Critical | Present | F1–F27 `VERIFIED` (§3.7) | F1–F4, F14–F16, F21–F23 **contained, published and runtime-verified in isolation** (`3c1fb2b`, Tasks 015–016) with their recorded deployment/release/replacement limitations; **F5–F10, F12 and F17–F20 remain open**; **F11 and F13 `CONTAINED-SOURCE-PUBLISHED`** but undeployed and not permanently remediated; F21's underlying heuristic remains unfixed and currently unreachable | Eng | prod exposure | ⚠️ **OPEN** until deployment, release and Phase 01 replacement |
| Corrupted user metric (`VIG_TOTAL_POISONS`) | High | Present | F4 `VERIFIED` | **contained, published and runtime-verified**; invalid keys removed (not re-initialised) on install **and** update | Eng | any HUD open | ⚠️ deployment/release pending |
| Credential-bearing provider endpoint | High | Present | F14 (pre-containment location `serviceWorker.js:5`) | **removed, published and runtime-verified absent**; provider-side rotation decision **remains open** | Eng/Owner | extraction | ⚠️ |
| Provider/API abuse | High | Med | open proxy (F12) + unauth cache (F13) | F13 and F11 **`CONTAINED-SOURCE-PUBLISHED`** (Task 020 source, Task 022 push — **undeployed**); **F12 route removed from tracked source (Task 029) and committed locally (Task 030, `CONTAINED-COMMIT`)**; no auth or rate limiting exists on the remaining AI routes | Eng | cost spike | ⚠️ **OPEN** — committed locally only, not pushed or deployed; production `main` still serves the proxy |
| Incorrect canonical registry | High | Present | F16 (pre-containment location `addressValidator.js:8`) | **unsafe USDC auto-trust removed**; replacement **superseded** (v1.1.0); closure requires separately authorized legacy retirement plus verification — **not closed** | Eng | wrong trust | ⚠️ |
| Privacy-claim mismatch | Med | Present | README/context vs code | data-flow audit + rewrite | Eng/Owner | store/legal review | ⚠️ |
| Brand collision | Med | Likely | `NEEDS VERIFICATION` | trademark/naming review | Owner | marketing spend | ⚠️ |
| Premature token launch | High | Gated | policy | locked gate (Phase 09) | Owner | external pressure | ⚠️ |
| Unsupported Robinhood claims | High | Possible | policy | explicit disclosure + §12 gate | Owner | marketing copy | ⚠️ |
| No test/CI safety net | High | Present | `VERIFIED` none | quality floor | Eng | regression | ⚠️ |
| Committed secret in history | High | Unknown | `NEEDS VERIFICATION` | history scan + rotation | Eng | disclosure | ⚠️ |
| Pre-sign coverage assumed but absent | High | Present | page-scan ≠ pre-sign | design + verify (X8) | Eng | overclaim | ⚠️ |
| Legacy Solana retirement breaks dependencies | Med | Possible | Solana code across extension, API, client, simulations | dependency map first; separately authorized batched retirement (§6.2) | Eng/CTO | retirement task | ⚠️ planned, not started |
| Platform adapter breakage / unverified platform identity | High | Likely | MEVX, "PONs", Uniswap unverified (§12.3) | verify before naming; adapters fail closed on layout change | Eng | third-party page change | ⚠️ |
| Wallet-interception coverage overclaimed | High | Possible | X27 coverage matrix absent | explicit "not covered" states; verified matrix per wallet | Eng | marketing copy | ⚠️ |
| Monetization hides or dilutes warnings | High | Possible | §16.1 non-negotiables | serious warnings never paywalled; quotas disclosed | Owner/Eng | Pro rollout | ⚠️ |
| Token-payment complexity (quotes, refunds, expiry, legal) | High | Unresolved | §13 owner ambition | gates retained; no issuance authorized | Owner/Legal | token discussion | ⚠️ |
| Campaign overclaiming or delayed security fixes | Med | Possible | §11.1 rules | release-by-evidence; security fixes never delayed | Owner/CTO | campaign cadence | ⚠️ |
| Warnings arrive after the dump / false alerts on benign shared infrastructure | High | Likely without replay | §12.4 not yet run | historical replay without future leakage; report lead times and false alerts; no prediction promise | Eng | early-warning claim | ⚠️ |

## 18. Decision log

### A. Active owner-approved decisions
Canonical checkout only; no routine isolated worktree; only `development` + `main`; `development` = implementation; `main` = stable/release; no direct product work on `main` without explicit authorization; VIGIL uses the `github-vigil` SSH identity; BourseWire isolated; `CLAUDE.md` tracked on `development`; `AGENTS.md` local/untracked/protected; no fabricated verdicts/metrics/evidence/partnerships/adoption; AI must not create the verdict; no official token currently; token work gated & unapproved; Robinhood Chain integration implies no partnership/endorsement/listing; the Chrome extension is the primary protection surface; false-positive risk is a critical metric.

**Owner-approved (Task 023, verbatim):**

> After Phase 00 containment and quality-floor work is complete, Robinhood Chain real-time monitoring becomes VIGIL’s highest-priority product-development track. Phase 01 must prioritize the shared deterministic engine, EVM adapter, normalized event schema, and provider-failure behavior required by this integration.

*This is a priority decision, not an implementation or readiness claim. No Robinhood capability is implemented or tested; no provider is selected; real-time monitoring does not prove pre-sign protection; compatibility never implies partnership, endorsement, affiliation, or listing.*

**Owner-approved product direction (v1.1.0; CTO review pending).** (1) **Robinhood Chain only** — exclusive initial target; Solana and other chains leave active requirements, release scope and positioning; legacy retirement is a separately authorized, dependency-aware task. (2) **Chrome extension first** — the extension is the product; users stay on their trading platform; background analysis, compact in-page findings, expandable evidence, signing-time warnings; the website is discovery/installation/documentation/support/labelled demos. (3) **Cross-platform trading assistance** on supported Robinhood Chain trading and launch workflows; platforms are candidates until verified; no universal interception promise. (4) **Analysis priorities** A1–A13 (§12.2) under the accuracy rules of §5.13. (5) **Intent Validator reconciliation** — simulations become scoped requirements (§10.1); Solana "mint" → EVM token-contract identity; "Pump.fun Rug-Risk" → "Launch & Liquidity Risk". (6) **Free + Pro** as the product model. (7) **VIGIL token ambition** with subscription-payment utility, recorded as intent behind unchanged gates. (8) **30-day progressive release campaign** as launch strategy. (9) **Latest extension-first / bundled-wallet requirements (2026-09-04):** the beta is not gated on completing the full website — only essential installation, privacy, support and accurate disclosures; the first useful extension release includes a **bounded pre-buy token-evidence panel** (X34); hidden-supply and coordinated-selling analysis (A12–A13) with the distinction *connected wallets ≠ proven common ownership ≠ proven developer wallets*; and **replay-based early-warning evaluation** (§12.4) in which a warning found after the dump never counts as advance detection. *Nothing in (1)–(9) is implemented, tested, provider-selected, deployed or production-ready.*

### B. Historical completed decisions
`playground` was selected as the consolidation source at `f3b331c`; its retained work moved into `development`; `development` merged into `main`; `playground` and the Claude worktree retired after preservation; only `development` and `main` now remain. *(`playground` is not an active branch or current policy.)*

### C. CTO recommendations awaiting owner confirmation
Exact shared-engine package structure; complete `apps/`+`packages/` monorepo layout; moving the Facility to `/lab`; exact marketing cadence (the four-week plan in §11) and the 30-day campaign backlog (§11.1); exact analytics provider; **the extension architecture in §6.1 (wallet-request inspection + platform context adapters)**; **the Free/Pro feature allocation, quotas and the $19/month launch-price hypothesis ($9/$25 alternatives) in §16.1**; **the legacy-retirement plan in §6.2**; **which platforms/wallets qualify as supported (§12.3)**; **whether token payment is mandatory or optional and every §13 pricing/quote/refund/expiry/legal question**; exact commercial model. *(None are marked ✅; they are proposals or open questions.)*

## 19. Evidence ledger & requirements traceability

### 19.1 Evidence ledger

| Finding | Source | Repo file / doc | Evidence status | Date | Implication |
|---|---|---|---|---|---|
> All file:line references below are **pre-containment locations**; Task 013/013-R1 deleted or shifted code in the seven extension files.

| Finding | Source | Repo file / doc | Evidence status | Date | Implication |
|---|---|---|---|---|---|
| Containment commits published to `origin/development` | Claude/CTO (Task 015) | `VIGIL-FIELD-UNIT/*`, `VIGIL_CANONICAL_MASTER_PLAN.md` | VERIFIED | 2026-09-03 | Fast-forward `bfcf850..ec78e0c`, non-forced; local, tracking and actual remote `development` all `ec78e0c`; `main` untouched at `0f66464`. **Publication of development source only — not deployment or release** |
| Automated isolated runtime verification of the contained extension | Claude (Task 016) | `VIGIL-FIELD-UNIT/` loaded unpacked from the canonical directory | VERIFIED (isolated runtime) | 2026-09-03 | Google Chrome for Testing `148.0.7778.96`, fresh disposable profile, extension ID `ccolepkadgjblolibndpeglajhokknbg`: manifest accepted · MV3 service worker **activated, zero captured errors** · static popup rendered honestly, **zero scripts, zero errors** · runtime permissions **`storage` only, origins empty** · **no content-script injection, overlay, DOM mutation or provider request** · `FETCH_TELEMETRY` returned **`UNAVAILABLE`** · deprecated metric keys **absent after install** · a genuine disposable-copy version update **behaviourally removed all seven deprecated keys while preserving the sentinel control** · temporary artifacts removed. **Installed-browser command-line load attempts were discarded and are NOT VIGIL evidence.** Containment behaviour only — not remediation, deployment, or release |
| Owner-assisted confirmation in the installed browser | Owner (Task 016) | `VIGIL-FIELD-UNIT/` loaded unpacked via `chrome://extensions` | VERIFIED (limited scope) | 2026-09-03 | Installed Google Chrome `152.0.7977.65` observed by the owner: loaded unpacked from the exact canonical directory · extension ID matched `ccolepkadgjblolibndpeglajhokknbg` · service-worker inspection opened · console empty, Chrome showed “No issues” · toolbar popup displayed the honest disabled / contained-alpha state · “This extension requires no special permissions” · “This extension has no additional site access” · incognito access off · file-URL access off · Phantom disabled before testing · VIGIL removed afterwards and the temporary Chrome profile deleted. **Telemetry, storage migration, DOM injection and update behaviour were NOT independently exercised in Chrome 152** |
| Legacy deterministic heuristic prototype exists | Claude/CTO | `content/retinalShield.js` | PARTIALLY VERIFIED | 2026-09-03 | Unvalidated thresholds; contained F21; disabled by 013-R1; **not an approved detector** — concepts may inform Phase 01 |
| Telemetry plumbing exists | Claude/CTO | `api/helius.ts`, `services/heliusService.ts` | PARTIALLY VERIFIED | 2026-09-03 | Plumbing is real, but the **API boundary remains unsafe/open (F12, F19) and is not production-approved** |
| `poisoningDetector.ts` reviewed | Claude/CTO | `utils/poisoningDetector.ts` (untracked) | VERIFIED (reviewed, Task 006) | 2026-09-03 | Deterministic Solana **candidate**; needs Phase 01 fixtures + FP measurement |
| AI generates verdicts | Claude | `api/gemini.ts`, `api/openai.ts` | VERIFIED | 2026-09-03 | Endpoints can be **disabled in Phase 00**; honest replacement is Phase 01 |
| Fake campaign / random trap | Claude | `serviceWorker.js:24,75` *(pre-containment)* | VERIFIED | 2026-09-03 | Contained — published and runtime-verified in isolation (F1, F2; Tasks 015–016); deployment pending |
| Random rug-risk + hardcoded forensics | CTO/Claude | `AlertMarketIntel.js:12,14,111` *(pre-containment)* | VERIFIED | 2026-09-03 | Contained — published and runtime-verified in isolation (F3; Tasks 015–016); deployment pending |
| Corrupted poison metric | CTO/Claude | `serviceWorker.js:113`; `retinalShield.js:172` *(pre-containment)* | VERIFIED | 2026-09-03 | Contained — published and runtime-verified in isolation (F4; Tasks 015–016); deployment pending |
| Credential-bearing provider endpoint | Claude | `serviceWorker.js:5` *(pre-containment)* | VERIFIED (redacted) | 2026-09-03 | Removed — published and runtime-verified absent (F14; Tasks 015–016); **provider-side rotation remains an owner action** |
| Inconsistent USDC value | Claude | `core/addressValidator.js:8` *(pre-containment)* | VERIFIED (value) / NEEDS OFFICIAL EXTERNAL VERIFICATION (replacement) | 2026-09-03 | **Unsafe auto-trust removed now**; replacement only after official verification *(v1.1.0, 2026-09-04: replacement superseded; closure via §6.2 retirement plus verification — not closed)* |
| Forced `NEW` + fabricated latency | Claude/CTO | `IntentValidatorDemo.tsx:545,547` | VERIFIED | 2026-09-03 | **Removable/suppressible now**; evidence-derived replacement is Phase 01 |
| Open proxy / unauth cache | Claude | `api/helius.ts:25`; `api/cache.ts:34` *(cache route deleted in source, Task 020)* | VERIFIED | 2026-09-03 | Cache surface **`CONTAINED-SOURCE-PUBLISHED`** (F13, Task 022); **open proxy F12 remains fully unmitigated** |
| API-boundary analysis (Task 019) | Claude/CTO | `api/*`, `services/*`, `lib/*` | VERIFIED (read-only) | 2026-09-03 | Route inventory and reachability maps. **No authentication, authorization, rate limiting, strict schema boundary, CORS policy, body-size guard or API test exists in tracked code.** `/api/cache` was deployed with **no** legitimate caller; `generateText` was reachable over the network with **no** UI caller. F19 restated as a structural ceiling, not observed usage |
| API containment batch 1 (Task 020) | Claude/CTO | `api/cache.ts`, `lib/cache.ts`, `services/heliusService.ts`, `api/openai.ts` | VERIFIED (local source + build; rejection paths runtime-verified against a stub) | 2026-09-03 | Commit `71b78eda56eb6dadfe4867f42dbbc17788f9fa3d`: 170 deletions / 0 insertions, no live tracked caller, build passed. Commit `962c854261a8d29dba5142e8f84b787c7b65fef3`: `api/openai.ts` only, **17 insertions / 25 deletions**, `generateText` removed, allowlist added before SDK construction, unsupported/missing/non-string endpoints return generic HTTP 400, stubbed harness confirmed **no provider call** on rejection, build passed. **Both commits published to `origin/development` in Task 022; no deployment** |
| Publication of API containment batch 1 (Task 022) | Claude/CTO/Owner | `api/cache.ts` (deleted), `lib/cache.ts` (deleted), `services/heliusService.ts`, `api/openai.ts`, `VIGIL_CANONICAL_MASTER_PLAN.md` — exactly these five paths | VERIFIED | 2026-09-03 | Read-only review of chain `a6d2bbf → 71b78ed → 962c854 → 7fab8af` (parents, author, paths, counts); non-forced fast-forward `a6d2bbf..7fab8af`; local, tracking and actual remote `development` all `7fab8af3850e7d7f7f7c7b5258d84d8ad5c67d62`; ahead/behind 0/0; `main` unchanged at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`; build passed; no protected file touched. **Development-source publication only — not deployed, released, merged or production-verified** |
| Duplicate deps | Claude | `package.json` | VERIFIED | 2026-09-03 | Deterministic installs |
| Zero test/CI/lint | Claude/CTO | repo root | VERIFIED | 2026-09-03 | Quality floor |
| No SSR / crawlability | Grok/Claude | `index.html` | PARTIALLY VERIFIED | 2026-09-03 | SSR essential content |
| Privacy docs contradict code | Docs | README/VIGIL_CONTEXT | VERIFIED (mismatch) | 2026-09-03 | Rewrite |
| TS diagnostics / build / bundle | CTO/Claude | Task 011 build + `tsc --noEmit` | **MEASURED** (§3.11) | 2026-09-03 | Build PASS; TS FAIL @ 12,994; bundle ≈1,445.76 kB / ≈348.17 kB gzip |
| Dependency advisories | CTO/Claude | Task 011 `npm audit` | **MEASURED count** (19: 1/12/5/1) / **reachability NEEDS VERIFICATION** | 2026-09-03 | Counts are measured; **no advisory claimed exploitable**; upgrade paths unverified |
| Robinhood facts | Web (earlier) | external | NEEDS CURRENT EXTERNAL VERIFICATION | — | Re-verify |
| Base `$VIGIL` / trademark | Grok/Claude | external | NEEDS VERIFICATION | — | Record first |

### 19.2 Requirements traceability (critical Phase 00 findings)

> Extension rows distinguish separate states: **implementation complete, committed and published (`3c1fb2b`)** · **static acceptance and production build passed** · **isolated runtime verification passed (Task 016)** · **deployment, release and Phase 01 replacement still pending**. Runtime verification confirms containment behaviour only — it is not remediation. Line references are **pre-containment locations**.

| ID | Finding | Evidence status | Phase | Planned task | Acceptance evidence | Release gate |
|---|---|---|---|---|---|---|
| F1 | `…/serviceWorker.js:24` fake campaign *(pre-containment)* | VERIFIED | 00 | Remove timer | ✅ static: no `GLOBAL_CAMPAIGN_SIGNAL` — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); deployment/release verification pending | Phase 00 exit |
| F2 | `…/serviceWorker.js:75` random trap *(pre-containment)* | VERIFIED | 00 | Remove random verdict | ✅ static: no random verdict path — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); deployment/release verification pending | Phase 00 exit |
| F3 | `…/AlertMarketIntel.js:12` random rug-risk *(pre-containment)* | VERIFIED | 00 | Remove/replace with unavailable state | ✅ static: no invented metric or verdict — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); deployment/release verification pending | Phase 00 exit |
| F4 | `…/serviceWorker.js:113` corrupted metric *(pre-containment)* | VERIFIED | 00 | Remove mutation path; delete invalid keys | ✅ static: keys removed, not re-initialised — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); deployment/release verification pending | Phase 00 exit |
| F14 | `…/serviceWorker.js:5` credential-bearing endpoint *(pre-containment)* | VERIFIED | 00 | Remove from client | ✅ static: no endpoint in extension — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); **provider rotation = owner action**; deployment/release verification pending | Phase 00 exit |
| F15 | `…/serviceWorker.js:121` unsigned handshake *(pre-containment)* | VERIFIED | 00 | Remove listener + manifest scope | ✅ static: no `onMessageExternal`, no `externally_connectable` — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); deployment/release verification pending | Phase 00 exit |
| F16 | `…/core/addressValidator.js:8` USDC value *(pre-containment)* | VERIFIED (value); replacement **superseded** (v1.1.0) | 00 → legacy retirement (§6.2) | **Unsafe auto-trust removed now**; replacement superseded — retire via §6.2 | ✅ static: prior value absent — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016); **closure requires authorized retirement plus verification — not closed** | Legacy-retirement task + verification |
| F21 | `…/content/retinalShield.js` domain-only `PHISHING` *(pre-containment)* | VERIFIED | 00 → 01 | Contain by removing content-script reachability | ✅ static: `content_scripts` absent → not injected — **heuristic itself unfixed, deferred** | Phase 01 exit (heuristic) |
| F22 | `popup/popup.html`, `popup/popup.js`, `serviceWorker.js` invented metrics/claims | VERIFIED | 00 | Replace popup with honest state; delete invalid keys | ✅ static: no resilience/trusted/poison/mesh/VCI/relay/telemetry claim — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016) | Phase 00 exit |
| F23 | `popup/popup.html`, `popup/popup.js` obsolete activation UI | VERIFIED | 00 | Remove handshake UI + external link | ✅ static: absent from reachable surface — committed and published (`3c1fb2b`); runtime-verified in isolation (Task 016) | Phase 00 exit |
| F5 | `api/gemini.ts` / `api/openai.ts` AI verdicts | VERIFIED | 00 (disable) → 01 (replace) | Disable verdict endpoints now | **OPEN** — no acceptance evidence yet | Phase 01 exit |
| F6 | `components/IntentValidatorDemo.tsx:545,547` forced `NEW` + fabricated latency | VERIFIED | 00 (remove) → 01 (replace) | Remove/suppress now | **OPEN** | Phase 01 exit |
| F7 | `utils/marketMath.ts:19,42` hardcoded distribution | VERIFIED | 00 (remove/hide) → 01 (real data) | Remove or hide now | **OPEN** | Phase 01 exit |
| F8 | `components/Pricing.tsx` dead payment code | VERIFIED | 00 | Explicit disable guard | **OPEN** — dead code, not an active vulnerability | Phase 00 exit |
| F9 | `App.tsx` admin backdoor | VERIFIED | 00 | Remove/disable now | **OPEN** | Phase 00 exit |
| F11 | `api/openai.ts:193` client-chosen model/tokens *(pre-containment)* | VERIFIED | 00 | Remove the endpoint; server-controlled allowlist | ✅ removed in `962c854`; rejection paths runtime-verified against a stub (no provider call); **published to `origin/development` (Task 022) — NOT deployed, NOT production-verified** | Phase 00 exit |
| F12 | `api/helius.ts:25` open proxy | VERIFIED | 00 | Retire the route (Task 028 decision) | 🟦 route + client deleted (Task 029) and **committed locally (Task 030, `CONTAINED-COMMIT`)** — not pushed, not merged into `main`, not deployed | Authorized push + release/deployment verification |
| F13 | `api/cache.ts:34` unauth `set` *(pre-containment)* | VERIFIED | 00 | Delete the unused writable route | ✅ route and helper deleted in `71b78ed`; no residual tracked reference; build passed — **static + build evidence only; published to `origin/development` (Task 022) — NOT deployed, NOT production-verified** | Phase 00 exit |
| F24 | No tracked `vercel.json` | VERIFIED (absence) | 00 → later | Pin runtime config **after** verifying the live environment | **OPEN** — configuration/reproducibility gap, not an established vulnerability | Phase 00 exit |
| F25 | `api/gemini.ts:242` mesh denylist + missing string validation | VERIFIED | 00 | Type-guard, length cap, real input contract | **OPEN** — active input/prompt-control concern | Phase 00 exit |
| F26 | Disabled cache while route deployed | VERIFIED | 00 | Recorded under F13 / F19 | **CONTRIBUTING EVIDENCE** — source removed in `71b78ed`; F19 still open | n/a |
| F27 | `components/VideoProductionStudio.tsx` dead key pattern | VERIFIED | 00 | Delete dead block | **OPEN — hygiene only**, unreachable | Phase 00 exit |
| F19 | `services/heliusService.ts:216` provider-call ceiling | VERIFIED (static upper bound) | 00 | Superseded by removal of the client (Task 029) | 🟦 amplifying client deleted and **committed locally (Task 030)** — not pushed; production `main` unchanged | Authorized push + release/deployment |
| F20 | `services/heliusService.ts:310` debug logging; `api/gemini.ts`/`api/openai.ts` raw error logs | VERIFIED | 00 | Helius portion removed (Task 029); AI-route logging still to gate/redact | **OPEN** — Helius portion removed and committed locally (Task 030 — not pushed, not deployed); AI-route portion untouched | Phase 00 exit |
| F10, F17, F18 | Gating bypass + unlabelled simulations | VERIFIED | 00 | Relabel / `/lab` isolation | **OPEN** | Phase 00 exit |
| — | `package.json` duplicate `vite` | VERIFIED | 00 | Deduplicate | **OPEN** | Phase 00 exit |
| — | No test/CI/lint | VERIFIED | 00 | Add quality floor | **OPEN** | Phase 00 exit |

## 20. Change log

| Version | Date | Summary |
|---|---|---|
| Version 1.1.0 | 2026-09-04 | **Owner-directed revision; CTO review pending.** Records the owner-approved product direction (§18.A): **Robinhood Chain only** as exclusive initial target (Solana/other chains removed from active requirements, release scope and positioning; legacy code retained pending a separately authorized, dependency-aware retirement, §6.2); **Chrome extension first** with background analysis, in-page findings, expandable evidence and signing-time warnings (§6.1, X27–X33); **cross-platform trading assistance** with platforms as unverified candidates (§12.3); **analysis priorities A1–A13** and the evidence-accuracy rules (§5.13, §12.2); **Intent Validator reconciliation** of the twelve simulations into scoped requirements, mint → token-contract identity, Pump.fun → Launch & Liquidity Risk (§10.1); **Free + Pro** with $19/month recorded as a hypothesis and $9/$25 as alternatives (§16.1); the **VIGIL token ambition** recorded as intent behind unchanged gates (§13); the **30-day progressive release campaign** as strategy (§11.1). Re-scopes Phases 01–09 and X5–X7 without renumbering; updates §8 sequencing while preserving Phase 00 dependencies; reconciles §2, §3.2, §3.7 (F12/F16 notes), §3.8 (Tasks 023–027), §3.13, §4, §5, §9, §12, §17 and §18. **Nothing is marked implemented, tested, provider-selected, deployed or production-ready; no legacy retirement, token issuance, monetization implementation, staging, commit, push, deployment or release is authorized by this revision.** Task 027/R1/R2 was, at the time of this revision, an uncommitted, unreviewed working-tree implementation (since retired — see Tasks 028–030 below). **Correction pass (2026-09-04):** F16 reconciled as superseded-but-not-closed across current sections; Phase 02 explicitly includes the bounded decoding checks its workflow needs while Phase 07 owns expansion only; Phase 01 no longer directs review of the protected `utils/poisoningDetector.ts`; §6.2 states that legacy integrations keep their individually recorded statuses and that retirement authorization never covers the protected files; Task 027 results attributed to the reported run; dates corrected. **Amendment (2026-09-04, extension-first / bundled-wallet requirements):** Phase 04 no longer depends on full Phase 03 completion (essential installation/privacy/support/disclosures only); Phase 02 gains the bounded pre-buy token-evidence panel (X34) while advanced clustering and wider coverage stay in Phase 07; §12.2 A3–A6 expanded and A12–A13 added for historical redistribution, evidence-backed candidate clusters, combined holdings without double counting and decoded selling, with transfers/swaps/exchange deposits/liquidity operations distinguished and observation block/time, coverage, evidence links and unavailable/stale states required; provider evaluation must establish historical coverage, latency and cost; new §12.4 requires historical replay without future-information leakage, benign shared-infrastructure cases and honest warning-timing reporting; §18.A item (9), §17 risk row, §8 step 4 and §10.1 updated. Phase 00 gates, F16 NOT-closed status, Task 027 review status, protected-file restrictions and pricing/token/campaign boundaries unchanged. **Tasks 028–029 (2026-09-04):** Task 028 read-only review decided **`RETIRE BEFORE ROBINHOOD IMPLEMENTATION`**; Task 029 deleted `api/helius.ts` and `services/heliusService.ts`, removed the Helius import/request/consumers from `IntentValidatorDemo.tsx` (fabricated-fallback removal preserved; live telemetry constant `null` → honest `Unavailable`), reconciled `types.ts`, added `utils/telemetryDisplay.ts`, and deleted the seven untracked Task 027 files. F12 is removed from the tracked source but **not production-remediated**; F19 and F20-Helius are superseded locally; F20-AI and F25 stay open; production `main` remains exposed until an authorized release/deployment; environment-variable removal/rotation is an owner deployment action; Task 027 must not be committed in its former form. **Task 029-R1 (2026-09-05):** Solana-specific balance band and “SOL Balance” UI removed from the provider-neutral telemetry model; type assertion replaced; regression test for the truth-display selector added (`tests/utils/telemetryDisplay.test.mjs`). Remaining active Solana simulation/validator surface is deferred to a separate bounded retirement task. **Task 030 (2026-09-05):** the Task 029/R1 retirement and this 1.1.0 revision are placed into one local commit on `development` (`CONTAINED-COMMIT`) — not pushed, not merged into `main`, not deployed, not production-remediated; F12 stays open for production pending authorized release/deployment verification; F20-AI and F25 stay open; production credential removal/rotation remains an owner action; the 1.1.0 approval status is unchanged (owner-directed, CTO review pending). No canonical publication, deployment, production containment or CTO approval is claimed. |
| Version 1.0.5 | 2026-09-03 | **Status: Owner and CTO Approved; documentation update remains uncommitted pending Task 024.** **Task 022 publication verified:** the reviewed chain `a6d2bbf → 71b78ed → 962c854 → 7fab8af` was fast-forward pushed (non-forced, `a6d2bbf..7fab8af`); local, tracking and actual remote `development` all `7fab8af3850e7d7f7f7c7b5258d84d8ad5c67d62`; ahead/behind 0/0; `main` unchanged at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`; production build passed; no protected file touched; nothing deployed, released, merged or production-verified. Introduces **`CONTAINED-SOURCE-PUBLISHED`** and moves **F11 and F13** to it — **published on `development` but NOT deployed**; the deployed site may still expose the old routes. **F12 remains the highest-priority current API exposure; F19, F20 and F25 remain open.** Records that **Ajmal Fahad approved Robinhood Chain real-time monitoring as the post-Phase-00 product-development priority** (verbatim in §18.A); **Phases 01 and 07 reconciled** to that priority without renumbering; the bounded **real-time work package §12.1 (R1–R13) added**. **No provider was selected; no Robinhood capability was implemented or tested; no deployment, release, partnership, or readiness claim was introduced.** Real-time monitoring does not prove pre-sign protection; compatibility never implies partnership or endorsement; no token work is authorized. Phase 00 remains 🟨 **IN PROGRESS**. Task 023 itself is documentation-only and **uncommitted** at the time of writing. **Task 023-R1 correction pass:** removed premature CTO-approval metadata; corrected the Phase 00 finding range (F5–F10 and F17–F18 open; F14–F16 published and runtime-verified with recorded limitations); expanded reinspection scope to F1–F27; restructured the §8 retained-findings paragraph into separated categories and replaced the completed browser runtime verification with the still-pending deployment/release verification; corrected the §17 fabricated-intelligence row; listed the five exact Task 022 paths in §19.1. |
| Version 1.0.4 | 2026-09-03 | Records **Task 019** — the read-only API-boundary analysis covering F11, F12, F13, F19 and F20, which established that **no authentication, authorization, rate limiting, strict schema boundary, CORS policy, body-size guard or API test exists in tracked code**, and which identified **F24** (deployment/runtime configuration reproducibility gap — *not* an established exploitable vulnerability), **F25** (active mesh-query input/prompt-control weakness), **F26** (disabled cache integration while the writable route stayed deployed — *contributing evidence* under F13/F19, not an independent exploit class) and **F27** (unreachable dead client-side provider-key pattern — hygiene only). Records **Task 020** API containment batch 1: commit `71b78eda56eb6dadfe4867f42dbbc17788f9fa3d` deleted `api/cache.ts` and `lib/cache.ts` and the dead cache integration in `services/heliusService.ts` (170 deletions / 0 insertions), and commit `962c854261a8d29dba5142e8f84b787c7b65fef3` removed the client-controlled `generateText` endpoint from `api/openai.ts` (17 insertions / 25 deletions) while retaining the five fixed-purpose, server-controlled fallback operations. **F11 and F13 move to `CONTAINED-SOURCE-LOCAL`** — removed from tracked source in **local, unpushed** commits; neither is deployed, production-remediated, or permanently resolved, and the deployed site may still expose the old routes. **F12, F19, F20 and F25 remain fully open.** Phase 00 remains 🟨 **IN PROGRESS**. No deployment or production remediation has occurred. |
| Version 1.0.3 | 2026-09-03 | Records **Task 015** — the containment commit `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a` and plan commit `ec78e0cc0eea30e1e58db05c94034fe9e628bb2e` were fast-forward pushed to `origin/development`; local, tracking and actual remote `development` all resolved to `ec78e0c`; `main` remained untouched at `0f664644e8bdc7fe2a0af76d1c6c1b5470f273c8`; this was publication of development source only, not deployment or release. Records **Task 016** isolated runtime verification (Google Chrome for Testing `148.0.7778.96`, fresh disposable profile, extension ID `ccolepkadgjblolibndpeglajhokknbg`) and, as a **separately bounded second layer**, the **owner-assisted confirmation in installed Google Chrome `152.0.7977.65`**; the two layers are not combined, and telemetry, storage migration, DOM injection and update behaviour were not independently exercised in Chrome 152. Moves F1–F4, F14–F16 and F21–F23 from `CONTAINED-COMMIT` to **`CONTAINED-RUNTIME-VERIFIED`** (§3.7) and marks the Phase 00 containment runtime-verification step complete (§7). Records that the Chrome-version gap is **partially** closed. States prominently that the extension is **intentionally non-protective and issues no threat verdicts**. Phase 00 remains 🟨 **IN PROGRESS**; F5–F13 and F17–F20 stay open; quality floor, TypeScript remediation, tests/lint/CI, provider credential decision, authoritative USDC replacement, full detector implementation, deployment, Chrome Web Store release and merge into `main` all remain pending. No finding is marked permanently resolved and no deployment, release, production-readiness or active-protection claim is introduced. |
| Version 1.0.2 | 2026-09-03 | Records Tasks 001–013 (§3.8), artifact and archive containment (§3.10), the measured technical baseline (§3.11), the F1–F23 reachability ledger (§3.7), and Task 013 extension-containment implementation status (§3.12). Adds the progress-control rule (§1) and updates the immediate-action sequence (§8). Phase 00 remains in progress; at the time of that revision Task 013 changes were uncommitted, unpushed and not runtime-verified. **Task 013-R3 reconciliation:** corrected the stale Phase 00 summary and the main Phase 00 checklist; requalified product-asset claims (`retinalShield.js` = legacy unvalidated prototype, disabled; Helius = plumbing only, boundary unsafe; `poisoningDetector.ts` = reviewed candidate); separated immediate containment from eventual replacement (F5, F6, F7, F9, F14, F16); corrected the task ledger (001 docs-only, 009/010 commit `bfcf850`, 012 initial F1–F20 later expanded); reconciled the cross-review table, risk register, evidence ledger and traceability to the F1–F23 ledger; and labelled superseded line numbers as pre-containment locations.  **Task 014 amendment (same version):** the approved seven-file extension containment is now committed locally as `3c1fb2bb5f9b257a10649ab211c7561fe2b9ca3a`; §2, §3.7, §3.8, §3.9, §3.12, §7, §8, §17 and §19.2 move from `CONTAINED-WT` to `CONTAINED-COMMIT`. Push, browser/runtime verification, deployment and release verification remain pending and unauthorized. No doctrine, scope, architecture, finding classification or approval status changed, so the version remains 1.0.2. |
| Version 1.0.1 | 2026-09-03 | Clarified immutable baseline and adoption references so the plan does not contain a self-invalidating "current HEAD" field. |
| Version 1.0 | 2026-09-03 | Draft 1.2 approved by Ajmal Fahad and the CTO and adopted as the single canonical VIGIL master plan. |
| Draft 1.2 | 2026-09-03 | Owner-alignment: first return post set to the gated Robinhood Chain security post (HIGH claim-risk, Owner+CTO reviewers, full verification/citation gate); prohibited unsupported volume/fee/dump/liquidity figures as facts; capabilities (tx decoding, honeypot, vanishing-token, wallet-level pre-sign) marked target/under-development; alpha/beta counts (10–25 / 100–250) relabelled provisional CTO target ranges pending owner approval & capacity review; Phase 09 security/privacy requirements made substantive (no contract/treasury/keys; protect legal/compliance/identity data); added source-of-truth rule (canonical only after owner approval + commit). All prior corrections preserved. Status: Final Owner Approval Required. |
| Draft 1.1 | 2026-09-03 | Expanded all Phase 00–10 with 11 fields; added documentation-reconciliation table (§3.6); added reachability-aware fabrication inventory (§3.7) incl. newly found `AlertMarketIntel.js` random rug-risk and `VIG_TOTAL_POISONS` corruption; split USDC evidence (verified value / needs official external verification); reclassified Decision Log into A/B/C; excluded `AGENTS.md` from inspection with verbatim policy; corrected the immediate sequence; added executable website (§9) and extension (§10) work packages incl. pre-sign scope statement; replaced the campaign with a four-week X plan (§11); added requirements traceability (§19.2); qualified uncertain claims (removed "all major integrity claims verified"). Status: CTO Review Required. |
| Draft 1.0 | 2026-09-03 | Initial consolidated plan reconciling CTO/Claude/Grok reviews against the current tree. |

**How to update:** change a `⬜`→`🟨`→`🟦`→`✅` only with linked evidence; add a Decision Log row (A/B/C) for material choices; append a Change Log row per revision; move findings between §3 buckets as evidence changes; never mark `✅` without verification.
