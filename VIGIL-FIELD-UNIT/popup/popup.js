
// VIGIL FIELD UNIT: POD CONTROLLER
// VERSION: 1.7.0 (CAMPAIGN_RELAY)

/**
 * Main dashboard update loop.
 * Syncs local storage state with the physical UI pods.
 */
async function updateDashboard() {
  const keys = [
    'VIG_USER_BRI', 
    'VIG_NODE_VERIFIED', 
    'VIG_PLAN_TIER',
    'VIG_LINKED_WALLET',
    'VIG_TOTAL_POISONS',
    'VIG_TOTAL_TRUSTED',
    'VIG_MESH_SYNC_COUNT',
    'VIG_VCI_HITS',
    'VIG_USER_TRUSTED_NODES',
    'VIG_ACTIVE_CAMPAIGN'
  ];
  
  const data = await chrome.storage.local.get(keys);
  
  const bri = data.VIG_USER_BRI !== undefined ? data.VIG_USER_BRI : 100;
  const isVerified = data.VIG_NODE_VERIFIED === true;
  const tier = data.VIG_PLAN_TIER || 'BASELINE';
  const wallet = data.VIG_LINKED_WALLET || 'UNLINKED';
  const activeCampaign = data.VIG_ACTIVE_CAMPAIGN;
  
  // Master Matrix Values
  const trusted = data.VIG_TOTAL_TRUSTED || 0;
  const poisons = data.VIG_TOTAL_POISONS || 0;
  const mesh = data.VIG_MESH_SYNC_COUNT || 0;
  const vci = data.VIG_VCI_HITS || 0;

  // Screen Orchestration
  const authScreen = document.getElementById('auth-screen');
  const dashScreen = document.getElementById('dashboard-screen');
  const campaignAnchor = document.getElementById('global-campaign-alert');
  
  if (!authScreen || !dashScreen || !campaignAnchor) return;

  const tierLabel = document.getElementById('tier-label');
  const rankLabel = document.getElementById('rank-label');
  const walletAddr = document.getElementById('wallet-addr');
  const apexGrid = document.getElementById('apex-grid');
  
  // Render Campaign Alert if active
  if (activeCampaign) {
    campaignAnchor.innerHTML = `
      <div class="campaign-alert-banner">
        <div class="c-header">
          <span class="c-tag">!! NETWORK_BREACH !!</span>
          <button id="dismiss-campaign">X</button>
        </div>
        <div class="c-body">
          <h4>${activeCampaign.title}</h4>
          <p>${activeCampaign.description}</p>
        </div>
        <div class="c-meta">${activeCampaign.affectedCount}</div>
      </div>
    `;
    campaignAnchor.style.display = 'block';
    document.getElementById('dismiss-campaign').onclick = () => {
      chrome.runtime.sendMessage({ type: 'DISMISS_CAMPAIGN' });
    };
  } else {
    campaignAnchor.style.display = 'none';
  }

  if (isVerified) {
    authScreen.classList.remove('active');
    dashScreen.classList.add('active');
    
    document.body.className = `tier-${tier.toLowerCase()}`;
    if (tierLabel) tierLabel.innerText = tier;
    
    if (walletAddr) {
      walletAddr.innerText = wallet !== 'UNLINKED' ? 
        `${wallet.slice(0, 4)}...${wallet.slice(-4)}` : 'GUEST_NODE';
    }

    if (rankLabel) {
      if (tier === 'APEX') rankLabel.innerText = 'SOVEREIGN APEX';
      else if (tier === 'SENTINEL') rankLabel.innerText = 'PRO SENTINEL';
      else rankLabel.innerText = 'BASELINE OPERATOR';
    }

    if (apexGrid) {
      if (tier === 'BASELINE') {
        apexGrid.classList.add('blurred');
      } else {
        apexGrid.classList.remove('blurred');
      }
    }

    const valEl = document.getElementById('bri-val');
    const fillEl = document.getElementById('gauge-fill');
    if (valEl) valEl.innerText = `${bri}%`;
    if (fillEl) {
      const offset = 283 - (283 * (bri / 100));
      fillEl.style.strokeDashoffset = offset;
      fillEl.style.stroke = bri > 80 ? '#10b981' : bri > 40 ? '#f59e0b' : '#ef4444';
    }

    updateStatValue('stat-trusted', trusted);
    updateStatValue('stat-poison', poisons);
    updateStatValue('stat-mesh', mesh);
    updateStatValue('stat-vci', vci);
  } else {
    authScreen.classList.add('active');
    dashScreen.classList.remove('active');
    document.body.className = 'tier-baseline';
  }
}

function updateStatValue(id, newVal) {
  const el = document.getElementById(id);
  if (!el) return;
  const oldVal = parseInt(el.innerText || "0");
  if (oldVal !== newVal) {
    el.innerText = newVal;
    el.classList.remove('pulse-up');
    void el.offsetWidth;
    el.classList.add('pulse-up');
  }
}

async function openDrillDown(type) {
  const overlay = document.getElementById('forensic-overlay');
  const title = document.getElementById('drill-title');
  const grid = document.getElementById('drill-grid');
  if (!overlay || !grid) return;
  grid.innerHTML = '';
  const data = await chrome.storage.local.get(null);

  if (type === 'POISON') {
    title.innerText = '>> POISON_FORENSICS';
    title.classList.add('title-poison');
    const items = [
      { label: 'VANITY_COLLISIONS', val: data.VIG_TOTAL_VANITY || 0 },
      { label: 'ZERO_VALUE_INJECTIONS', val: data.VIG_TOTAL_ZERO_VALUE || 0 },
      { label: 'VCI_PREDICTIONS', val: data.VIG_VCI_HITS || 0 }
    ];
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'drill-item';
      div.innerHTML = `<span class="label">${item.label}</span><span class="value">${item.val}</span>`;
      grid.appendChild(div);
    });
  }
  overlay.classList.add('active');
}

function closeDrillDown() {
  const overlay = document.getElementById('forensic-overlay');
  if (overlay) overlay.classList.remove('active');
}

async function performHandshake() {
  const btn = document.getElementById('handshake-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerText = 'WAITING_FOR_COMMAND...';
  window.open('https://48evb9yill5ja8sxgiy9hgzjcx1ocbouxx6c7nfxhgkt5ai2e3-h852644758.scf.usercontent.goog/index.html', '_blank');
}

async function terminateSession() {
  if (confirm("TERMINATE SESSION? DATA WILL BE PURGED.")) {
    await chrome.storage.local.set({ 
      'VIG_NODE_VERIFIED': false,
      'VIG_PLAN_TIER': 'BASELINE',
      'VIG_LINKED_WALLET': 'UNLINKED'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  const handshakeBtn = document.getElementById('handshake-btn');
  if (handshakeBtn) handshakeBtn.onclick = performHandshake;
  const terminateBtn = document.getElementById('terminate-btn');
  if (terminateBtn) terminateBtn.onclick = terminateSession;
  const poisonPod = document.getElementById('pod-poison');
  const trustedPod = document.getElementById('pod-trusted');
  const closeDrill = document.getElementById('close-drill');
  if (poisonPod) poisonPod.onclick = () => openDrillDown('POISON');
  if (trustedPod) trustedPod.onclick = () => openDrillDown('TRUSTED');
  if (closeDrill) closeDrill.onclick = closeDrillDown;
  chrome.storage.onChanged.addListener(() => updateDashboard());
});
