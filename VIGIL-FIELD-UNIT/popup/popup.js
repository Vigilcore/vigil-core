// VIGIL FIELD UNIT: POPUP CONTROLLER
// VERSION: 2.0.0 (PHASE_00_INTEGRITY_CONTAINMENT)
//
// Intentionally inert. The previous controller rendered a dashboard of
// unvalidated product measurements — resilience percentage, trusted-node and
// poisons-blocked counts, mesh-sync and prediction totals, "secure relay
// stable", "telemetry stream listening" — alongside a paid-tier handshake and
// an external command-centre link. None of those were backed by evidence, and
// the handshake they drove has been removed from the background worker.
//
// popup.html is now a static, self-contained honest status page and loads no
// script. This file is retained as a placeholder so the popup has an obvious
// home for logic once Phase 01 supplies a tested deterministic engine whose
// output can be displayed truthfully.
//
// Do not reintroduce a metric here unless the value it displays is derived
// from verified evidence.
