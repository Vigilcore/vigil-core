/**
 * Telemetry display selection (pure, provider-neutral).
 *
 * Simulation values are shown ONLY when `isSimulation === true`. For every real
 * inspection the display is derived solely from obtained telemetry: a missing exact
 * age shows a labelled lower bound when one exists, otherwise "Unavailable";
 * last-seen evidence is not supplied by any wired provider and is therefore
 * "Unavailable"; a missing count is "Unavailable". OFFLINE or absent telemetry
 * yields "Unavailable" for all three — it never falls back to simulation data.
 */

import type { RealtimeTelemetry } from '../types';

export const TELEMETRY_UNAVAILABLE = 'Unavailable';

/** Explicitly labelled simulation-scenario telemetry (never evidence). */
export interface SimulationTelemetryDisplay {
  age: string;
  lastTx: string;
  activity15d: string;
}

/** Display strings for the three telemetry cards. */
export interface TelemetryDisplay {
  age: string;
  lastSeen: string;
  tx15d: string;
}

export function selectTelemetryDisplay(
  telemetry: RealtimeTelemetry | null | undefined,
  simulation: SimulationTelemetryDisplay | undefined,
  isSimulation: boolean
): TelemetryDisplay {
  if (isSimulation === true) {
    return {
      age: simulation?.age ?? TELEMETRY_UNAVAILABLE,
      lastSeen: simulation?.lastTx ?? TELEMETRY_UNAVAILABLE,
      tx15d: simulation?.activity15d ?? TELEMETRY_UNAVAILABLE
    };
  }
  if (!telemetry || (telemetry.status !== 'CONNECTED' && telemetry.status !== 'DEGRADED')) {
    return { age: TELEMETRY_UNAVAILABLE, lastSeen: TELEMETRY_UNAVAILABLE, tx15d: TELEMETRY_UNAVAILABLE };
  }
  let age = TELEMETRY_UNAVAILABLE;
  if (telemetry.addressAge) {
    age = telemetry.addressAge;
  } else if (telemetry.addressAgeLowerBound) {
    age = `At least ${telemetry.addressAgeLowerBound.replace(/^>\s*/, '')}`;
  }
  const tx15d = telemetry.tx15d !== undefined ? String(telemetry.tx15d) : TELEMETRY_UNAVAILABLE;
  return { age, lastSeen: TELEMETRY_UNAVAILABLE, tx15d };
}
