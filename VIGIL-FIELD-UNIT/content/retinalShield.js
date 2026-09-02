// VIGIL FIELD UNIT: TACTICAL DISPATCHER
// VERSION: 1.8.0 (ALPHA_FORENSICS_INTEGRATION)

(async function() {
  const validatorSrc = chrome.runtime.getURL('core/addressValidator.js');
  const indexerSrc = chrome.runtime.getURL('core/threatIndex.js');
  const diffSrc = chrome.runtime.getURL('core/addressDiff.js');
  
  const { isValidSolanaAddress, CANONICAL_MINTS } = await import(validatorSrc);
  const { calculateCompositeThreat, getAxesFromVerdict } = await import(indexerSrc);
  const { calculateEntropy, getSimilarityScore } = await import(diffSrc);

  const HIGH_RISK_DOMAINS = ['t.me', 'twitter.com', 'x.com', 'discord.com', 'web.telegram.org'];

  const STYLES = `
    vigil-shield {
      position: relative;
      background: rgba(59, 130, 246, 0.05);
      border-bottom: 1px dashed rgba(59, 130, 246, 0.4);
      cursor: help;
      transition: all 0.3s;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    vigil-shield:hover { background: rgba(59, 130, 246, 0.1); border-color: #3b82f6; }
    vigil-shield.trusted { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
    vigil-shield.poison { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); animation: vigil-pulse 2s infinite; }
    vigil-shield.market_intel { border-bottom: 1px dashed #06b6d4; }
    
    @keyframes vigil-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    
    .vigil-radar-trigger { 
      cursor: pointer; 
      font-size: 14px; 
      animation: vigil-radar-pulse 2s infinite; 
      filter: drop-shadow(0 0 5px #06b6d4);
      margin-right: 4px;
    }
    @keyframes vigil-radar-pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.innerText = STYLES;
  document.head.appendChild(styleSheet);

  async function fetchForensics(address) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ 
        type: 'FETCH_TELEMETRY', 
        payload: { address } 
      }, (response) => {
        resolve(response || { status: 'ERROR' });
      });
    });
  }

  async function analyzeAddress(addr) {
    const data = await chrome.storage.local.get(['VIG_USER_TRUSTED_NODES', 'VIG_CLIPBOARD_INTENT']);
    const userWhitelist = data.VIG_USER_TRUSTED_NODES || [];
    const currentOrigin = window.location.hostname;

    if (userWhitelist.includes(addr) || Object.values(CANONICAL_MINTS).includes(addr)) return 'TRUSTED';

    const isHighRiskContext = HIGH_RISK_DOMAINS.some(d => currentOrigin.includes(d));
    if (isHighRiskContext) return 'PHISHING';

    const mints = Object.values(CANONICAL_MINTS);
    const isCounterfeitMint = mints.some(m => getSimilarityScore(addr, m) > 90 && addr !== m);
    if (isCounterfeitMint) return 'MINT';

    const entropy = calculateEntropy(addr);
    if (entropy < 3.8) return 'SIMILARITY';

    for (const trusted of userWhitelist) {
      const sim = getSimilarityScore(addr, trusted);
      if (sim > 85 && addr !== trusted) return 'POISON';
    }

    if (data.VIG_CLIPBOARD_INTENT && data.VIG_CLIPBOARD_INTENT !== addr) return 'CLIPBOARD';
    
    return 'NEW';
  }

  async function wrapAddress(node) {
    if (node.parentElement && (node.parentElement.tagName === 'VIGIL-SHIELD' || node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE')) return;
    const text = node.textContent;
    const regex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
    const matches = text.match(regex);
    if (!matches) return;

    for (const addr of matches) {
      if (isValidSolanaAddress(addr)) {
        const verdict = await analyzeAddress(addr);
        const shield = document.createElement('vigil-shield');
        shield.className = verdict.toLowerCase();

        const span = document.createElement('span');
        span.textContent = addr;
        span.onclick = (e) => {
          e.stopPropagation();
          dispatchHUD(addr, verdict);
        };
        shield.appendChild(span);
        
        try {
          const range = document.createRange();
          const start = text.indexOf(addr);
          range.setStart(node, start);
          range.setEnd(node, start + addr.length);
          range.deleteContents();
          range.insertNode(shield);
        } catch (e) {}
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) wrapAddress(node);
        else if (node.nodeType === Node.ELEMENT_NODE) {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          let textNode;
          while (textNode = walker.nextNode()) wrapAddress(textNode);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  async function dispatchHUD(address, verdict) {
    if (document.getElementById('vigil-hud-root')) return;
    
    const forensics = await fetchForensics(address);
    const axes = getAxesFromVerdict(verdict);
    const index = calculateCompositeThreat(axes);
    
    // Map verdict to UI component
    const moduleName = verdict.charAt(0) + verdict.slice(1).toLowerCase();

    const moduleSrc = chrome.runtime.getURL(`content/ui/Alert${moduleName}.js`);

    // Telemetry fails closed: when evidence is unavailable it is reported as
    // UNAVAILABLE. It is never presented as verified or trusted provenance.
    const telemetryAvailable = forensics && forensics.status === 'SUCCESS';

    try {
      const { render } = await import(moduleSrc);
      render(address, index, {
        age: telemetryAvailable ? (forensics.age || 'UNKNOWN') : 'UNAVAILABLE',
        activity: telemetryAvailable ? String(forensics.data?.length ?? 0) : 'UNAVAILABLE',
        status: (forensics && forensics.status) || 'UNAVAILABLE',
        axes
      });
    } catch (e) { console.error(`[VIGIL] HUD Error:`, e); }
  }

  document.addEventListener('copy', () => {
    const text = window.getSelection().toString().trim();
    if (isValidSolanaAddress(text)) {
      chrome.storage.local.set({ 'VIG_CLIPBOARD_INTENT': text });
    }
  });
})();