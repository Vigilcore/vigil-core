/**
 * Regression tests for utils/telemetryDisplay.ts — the truth-display selector that
 * decides what the Intent Validator shows for address age, last-seen and 15-day count.
 *
 * Why these tests exist: the selector is the last guard against fabricated live evidence.
 * Simulation values may appear ONLY for explicitly labelled simulations; a real inspection
 * with missing, OFFLINE or partial telemetry must say "Unavailable" and must never borrow
 * simulation values or render a missing count as zero.
 *
 * Tooling: Node's built-in test runner plus the already-installed esbuild (a Vite
 * dependency) to strip TypeScript. No new dependency, no package.json change.
 *
 * Run from the repository root:
 *   node --test tests/utils/telemetryDisplay.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..');
const require = createRequire(join(repoRoot, 'package.json'));
const esbuild = require('esbuild');

const outDir = await mkdtemp(join(tmpdir(), 'vigil-telemetry-display-'));
await esbuild.build({
  entryPoints: [join(repoRoot, 'utils', 'telemetryDisplay.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: join(outDir, 'telemetryDisplay.mjs'),
  logLevel: 'silent'
});
const { selectTelemetryDisplay, TELEMETRY_UNAVAILABLE } = await import(
  pathToFileURL(join(outDir, 'telemetryDisplay.mjs')).href
);
process.on('exit', () => {
  rm(outDir, { recursive: true, force: true }).catch(() => {});
});

const UNAVAILABLE = 'Unavailable';
const ALL_UNAVAILABLE = { age: UNAVAILABLE, lastSeen: UNAVAILABLE, tx15d: UNAVAILABLE };

/** Scenario telemetry as supplied by a labelled simulation — never evidence. */
const SIMULATION = { age: '3 days', lastTx: '2 hours ago', activity15d: '47' };

test('exported sentinel is the literal "Unavailable"', () => {
  assert.equal(TELEMETRY_UNAVAILABLE, UNAVAILABLE);
});

test('labelled simulation may display simulation telemetry', () => {
  assert.deepEqual(selectTelemetryDisplay(null, SIMULATION, true), {
    age: '3 days',
    lastSeen: '2 hours ago',
    tx15d: '47'
  });
});

test('labelled simulation without scenario telemetry shows Unavailable, not zeros', () => {
  assert.deepEqual(selectTelemetryDisplay(null, undefined, true), ALL_UNAVAILABLE);
});

test('real inspection with missing telemetry returns Unavailable', () => {
  assert.deepEqual(selectTelemetryDisplay(null, undefined, false), ALL_UNAVAILABLE);
  assert.deepEqual(selectTelemetryDisplay(undefined, undefined, false), ALL_UNAVAILABLE);
});

test('OFFLINE telemetry returns Unavailable', () => {
  assert.deepEqual(
    selectTelemetryDisplay({ status: 'OFFLINE', addressAge: '9 days', tx15d: 12 }, undefined, false),
    ALL_UNAVAILABLE
  );
});

test('real inspection never falls back to supplied simulation values', () => {
  // Missing telemetry with simulation data present.
  assert.deepEqual(selectTelemetryDisplay(null, SIMULATION, false), ALL_UNAVAILABLE);
  // OFFLINE telemetry with simulation data present.
  assert.deepEqual(selectTelemetryDisplay({ status: 'OFFLINE' }, SIMULATION, false), ALL_UNAVAILABLE);
  // CONNECTED telemetry with no evidence fields: still nothing borrowed from the simulation.
  const partial = selectTelemetryDisplay({ status: 'CONNECTED' }, SIMULATION, false);
  assert.deepEqual(partial, ALL_UNAVAILABLE);
  for (const value of Object.values(partial)) {
    assert.ok(!Object.values(SIMULATION).includes(value), `leaked simulation value: ${value}`);
  }
  // A non-boolean truthy flag is not a labelled simulation.
  assert.deepEqual(selectTelemetryDisplay(null, SIMULATION, 'true'), ALL_UNAVAILABLE);
});

test('an exact observed age is displayed as observed', () => {
  const display = selectTelemetryDisplay({ status: 'CONNECTED', addressAge: '14 days' }, undefined, false);
  assert.equal(display.age, '14 days');
  assert.equal(display.lastSeen, UNAVAILABLE);
  assert.equal(display.tx15d, UNAVAILABLE);
  // An exact age takes precedence over a lower bound.
  assert.equal(
    selectTelemetryDisplay(
      { status: 'DEGRADED', addressAge: '14 days', addressAgeLowerBound: '> 10 days' },
      undefined,
      false
    ).age,
    '14 days'
  );
});

test('a lower-bound age is clearly labelled "At least"', () => {
  assert.equal(
    selectTelemetryDisplay({ status: 'DEGRADED', addressAgeLowerBound: '> 30 days' }, undefined, false).age,
    'At least 30 days'
  );
  assert.equal(
    selectTelemetryDisplay({ status: 'CONNECTED', addressAgeLowerBound: '2 months' }, undefined, false).age,
    'At least 2 months'
  );
});

test('missing transaction count remains Unavailable, not zero', () => {
  const missing = selectTelemetryDisplay({ status: 'CONNECTED', addressAge: '5 days' }, undefined, false);
  assert.equal(missing.tx15d, UNAVAILABLE);
  assert.notEqual(missing.tx15d, '0');
  // An observed zero is a real observation and is displayed as such.
  assert.equal(selectTelemetryDisplay({ status: 'CONNECTED', tx15d: 0 }, undefined, false).tx15d, '0');
  assert.equal(selectTelemetryDisplay({ status: 'CONNECTED', tx15d: 8 }, undefined, false).tx15d, '8');
});

test('last-seen is Unavailable for real inspections (no provider supplies it)', () => {
  assert.equal(
    selectTelemetryDisplay({ status: 'CONNECTED', addressAge: '5 days', tx15d: 3 }, SIMULATION, false).lastSeen,
    UNAVAILABLE
  );
});
