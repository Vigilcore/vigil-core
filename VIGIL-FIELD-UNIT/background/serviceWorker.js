
// VIGIL BACKGROUND GUARDIAN
// VERSION: 2.0.0 (PHASE_00_INTEGRITY_CONTAINMENT)
//
// This batch removed, deliberately:
//   - the client-distributed provider endpoint (a credential-bearing URL must
//     never ship inside a distributed extension)
//   - the simulated campaign timer and every fabricated campaign payload
//   - randomised "concentration trap" verdicts and fabricated forensic fields
//   - direct client-side provider requests
//   - the unauthenticated external entitlement handshake
//   - the unconditional poison / resilience counter mutation
//
// Telemetry now FAILS CLOSED. When evidence is unavailable the extension says
// so; it never substitutes a mock, random, or placeholder value. Evidence-backed
// telemetry returns only once a validated detector can supply it.

const TELEMETRY_UNAVAILABLE = Object.freeze({
  status: 'UNAVAILABLE',
  data: [],
  reason: 'Evidence-backed telemetry is temporarily disabled pending a validated detector.'
});

// Metrics produced by the removed fabricated/unvalidated paths. They are
// DELETED rather than re-initialised: assigning a baseline such as "resilience
// 100%" or "1 trusted node" would invent a product measurement just as surely
// as the code that originally produced them. Absent keys let the popup show
// "unavailable" instead of a number that means nothing.
const INVALID_METRIC_KEYS = [
  'VIG_USER_BRI',
  'VIG_TOTAL_TRUSTED',
  'VIG_TOTAL_POISONS',
  'VIG_MESH_SYNC_COUNT',
  'VIG_VCI_HITS',
  'VIG_TOTAL_VANITY',
  'VIG_TOTAL_ZERO_VALUE'
];

// Runs on install AND update, unconditionally, so that a paid tier granted by
// the removed unauthenticated handshake cannot survive into this build.
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({
    'VIG_PLAN_TIER': 'BASELINE',
    'VIG_NODE_VERIFIED': false,
    'VIG_ACTIVE_CAMPAIGN': null,
    'VIG_LINKED_WALLET': null
  });
  await chrome.storage.local.remove(INVALID_METRIC_KEYS);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'FETCH_TELEMETRY') {
    sendResponse({ ...TELEMETRY_UNAVAILABLE });
    return false;
  }

  if (message?.type === 'DISMISS_CAMPAIGN') {
    chrome.storage.local.set({ 'VIG_ACTIVE_CAMPAIGN': null });
  }

  return false;
});
