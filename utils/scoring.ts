/**
 * VIGIL SCORING & XP PRIMITIVES
 * VERSION: 1.1.0
 */

export const SILO_DIFFICULTY: Record<number, number> = {
  1: 1.0, // Identity
  2: 1.2, // Intel
  3: 1.5, // Logic
  4: 2.0, // Execution
  5: 2.5, // Purity
  6: 3.0, // Evolution
  7: 3.5, // Log
  8: 5.0, // Audit
  9: 7.0, // Mesh
  10: 10.0 // Void
};

export interface ScoringResult {
  briDelta: number;
  xpGained: number;
}

/**
 * Calculates BRI and XP changes based on performance and silo level.
 * Success grants points * difficulty * plan_multiplier.
 */
export function calculateScoring(isSuccess: boolean, level: number): ScoringResult {
  const siloMultiplier = SILO_DIFFICULTY[level] || 1.0;
  
  // Commercial Tier Multipliers
  let planMultiplier = 1.0;
  if (typeof localStorage !== 'undefined') {
    const tier = localStorage.getItem('vigil_plan_tier');
    if (tier === 'SENTINEL') planMultiplier = 1.5;
    else if (tier === 'APEX') planMultiplier = 2.5;
  }
  
  if (isSuccess) {
    const basePoints = 10;
    return {
      briDelta: basePoints,
      xpGained: Math.round(basePoints * siloMultiplier * 10 * planMultiplier)
    };
  } else {
    return {
      briDelta: -5,
      xpGained: 0
    };
  }
}