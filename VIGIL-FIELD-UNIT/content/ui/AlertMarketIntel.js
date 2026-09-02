
// VIGIL HUD: ALERT_MARKET_INTEL
// VERSION: 3.0.0 (PHASE_00_INTEGRITY_CONTAINMENT)
//
// The previous implementation decided a "rug risk" verdict with a random number
// generator and rendered hardcoded holder-distribution, bundling, deployer-history
// and market-cap figures as if they were forensic findings, ending in a
// proceed/abort recommendation. All of that has been removed.
//
// This surface now reports only that evidence-backed market intelligence is
// unavailable. It must not state a risk verdict, must not characterise a
// contract as clean, malicious, organic, or safe, and must not recommend
// proceeding with or aborting any transaction.

export function render(ca) {
  const host = document.createElement('div');
  host.id = 'vigil-hud-root';
  host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  const shadow = host.attachShadow({ mode: 'open' });

  const shownCa = typeof ca === 'string' && ca.length > 20
    ? `${ca.slice(0, 16)}...${ca.slice(-4)}`
    : String(ca ?? '');

  shadow.innerHTML = `
    <style>
      :host { --line: rgba(255,255,255,0.08); --font: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace; }
      .backdrop { position: fixed; inset: 0; background: rgba(5,5,5,0.85); backdrop-filter: blur(24px); opacity: 0; transition: opacity .4s ease; pointer-events: auto; display: flex; align-items: center; justify-content: center; font-family: var(--font); }
      .backdrop.active { opacity: 1; }
      .card { width: 460px; max-width: 90vw; background: rgba(10,10,10,0.92); border: 1px solid var(--line); border-radius: 24px; padding: 32px; color: #fafafa; display: flex; flex-direction: column; gap: 18px; }
      .label { font-size: 9px; font-weight: 900; letter-spacing: 0.4em; text-transform: uppercase; color: #666; margin: 0; }
      h3 { font-size: 18px; font-weight: 800; margin: 0; letter-spacing: -0.01em; }
      .ca { font-family: var(--mono); font-size: 11px; color: #666; word-break: break-all; margin: 0; }
      p.body { font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; }
      .btn { width: 100%; padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: transparent; color: #fafafa; font-weight: 800; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; cursor: pointer; }
      .btn:hover { background: rgba(255,255,255,0.05); }
    </style>
    <div class="backdrop" id="b">
      <div class="card">
        <p class="label">Market Intelligence // Status</p>
        <h3>Unavailable</h3>
        <p class="ca">CONTRACT: ${shownCa}</p>
        <p class="body">
          Evidence-backed market intelligence is under development. VIGIL has no
          verified holder distribution, bundling, deployer history, or liquidity
          data for this contract, and will not display an estimate in place of
          evidence.
        </p>
        <p class="body">
          No risk verdict is issued here. Verify this contract independently
          before taking any action.
        </p>
        <button class="btn" id="c">Close</button>
      </div>
    </div>
  `;

  document.documentElement.appendChild(host);
  setTimeout(() => shadow.getElementById('b').classList.add('active'), 10);

  shadow.getElementById('c').onclick = () => {
    shadow.getElementById('b').classList.remove('active');
    setTimeout(() => host.remove(), 400);
  };
}
