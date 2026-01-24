<div align="center">

![VIGIL Core Banner](https://github.com/user-attachments/assets/4bc52511-6e56-4b9b-ba74-978a53622de0)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Operational-10b981?style=for-the-badge&logo=shield&logoColor=white" />
  <img src="https://img.shields.io/badge/Standard-Layer_0.5-3b82f6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Trial-30_Days_Free-8b5cf6?style=for-the-badge" />
</p>

# VIGIL CORE
**The Security Standard for the Retinal Perimeter**

**[🚀 Launch Facility](https://www.vigilcore.org)** • **[📑 Read Whitepaper](https://www.vigilcore.org?doc=whitepaper)** • **[🛠️ Deploy Field Unit](https://www.vigilcore.org)**

</div>

---

## 🚨 The Vulnerability: The 8-Character Blind Spot

### The Cognitive Gap

Research from **SlowMist** and **Chainalysis** reveals that **94% of users** only verify the first 4 and last 4 characters of wallet addresses. Adversaries exploit this using high-density GPU clusters to generate "Vanity Mimics"—addresses that appear identical at the edges but lead to total asset loss.

| How the Human Sees It | How the Adversary Attacks It |
|----------------------|------------------------------|
| `7xKXt`**`...`**`vR3p` | `7xKXt`**`Xy9m`**`vR3p` |
| ✅ First 4 + Last 4 verified | ❌ **Middle 8 characters differ** |
| ✅ Looks like trusted address | ❌ **Leads to attacker's wallet** |
| ✅ Transaction approved | ❌ **Complete asset loss** |

**Result:** You approve a transaction believing it's going to a trusted address, but the middle characters are different—leading to complete asset loss.

### 📊 Forensic Telemetry (2025-2026)

```text
[VIGIL_FORENSIC_LOG]
>> GLOBAL SCAM LOSSES: $17B (Projected 2025)
>> AI REVENUE MULTIPLIER: 4.5x (Adversarial Efficiency)
>> IMPERSONATION SURGE: 1400% YoY
>> USER VERIFICATION GAP: 94% (First/Last 4 Only)
>> VERDICT: HUMAN-LAYER IS THE PRIMARY ATTACK VECTOR.
```

> *"The theft lives in the gap between what you see and what you sign."*

### Real Attack Vectors

- 🚨 **Address Poisoning**: Fake addresses designed to trick you via transaction history
- 🎣 **Phishing Attempts**: Scam links and malicious contracts
- 🤖 **Social Engineering**: AI-generated fake influencer accounts and pump-and-dump schemes
- 📊 **Market Manipulation**: Coordinated trading patterns and bot activity

---

## ⚠️ Why Existing Security Tools Fall Short

Traditional blockchain security operates at two layers:

| Layer | Tools | What They Protect | What They Don't Protect |
|-------|-------|-------------------|------------------------|
| **Layer 1** | Consensus protocols, validators | Cryptographic integrity of the chain | ❌ User intent validation |
| **Layer 0** | Hardware wallets, explorers | Transaction signing and broadcast | ❌ Visual deception detection |

**The Gap:** Your wallet correctly signs the transaction you approved. The blockchain correctly executes what was signed. But **you approved the wrong address** because your eyes were deceived.

**Cryptographic validation ≠ Intent validation**

---

## 🏗️ Architecture: Layer 0.5 Interception

**VIGIL** is an open-source security intelligence platform that provides **Layer 0.5** protection—a pre-transaction defense system that validates your intent before cryptographic execution.

| Layer | Component | Function | Status |
| :--- | :--- | :--- | :--- |
| **Layer 0** | dApp UI / Browser DOM | Intent Origination | *Untrusted* |
| **Layer 0.5** | **VIGIL INTERCEPTION** | **Cognitive Validation** | **ACTIVE** |
| **Layer 1** | Wallet / Blockchain | Cryptographic Settlement | *Finality* |

**VIGIL secures the Retinal Perimeter**—the cognitive gap where adversaries exploit human visual limitations to generate addresses that appear identical to trusted contacts.

---

## 🛡️ Security Primitives

VIGIL provides multiple security primitives designed to intercept threats at the human decision layer:

| Primitive | Function | Performance | Intelligence Source |
|-----------|----------|-------------|---------------------|
| **Retinal Shield** | DOM interception of address swaps | <12ms detection latency | Local Heuristic Matrix |
| **Intent Validator** | Real-time forensic analysis of transaction intent | AI-powered cognitive autopsy | Google Gemini API |
| **Neural Firewall** | Biological calibration for pattern recognition | Levenshtein-based entropy detection | Saccadic Calibration Engine |
| **Sentinel Mesh** | Global threat feed synchronization | <200ms mesh propagation | P2P Intelligence Relay |
| **Market Intel Auditor** | Detects bundling and manipulation patterns | Pattern recognition engine | Market Analysis API |
| **Address Scanner** | Forensic analysis of any wallet address | Multi-source reputation synthesis | Reputation Mesh |

### Technical Stack

- **Frontend**: React 19 + TypeScript + Vite
- **AI Providers**: Gemini API (primary) + OpenAI (fallback)
- **Blockchain**: Currently optimized for Solana (Web3.js)
- **Security Engine**: Levenshtein-based entropy analysis
- **State Management**: React hooks with rate limiting

### Key Components

| Component | Purpose |
|-----------|---------|
| `VigilScanner` | Main threat detection interface |
| `IntentValidatorDemo` | Analyzes transaction intent vs. actual behavior |
| `AdversarialMimicryLab` | Tests social engineering resistance |
| `SocialIntelligenceLab` | Detects fake influencers and coordinated attacks |
| `MeshQueryTerminal` | Cross-chain threat intelligence lookup |

---

## 🔒 Sovereign Trust Model

### Absolute Truths

- ✅ **Non-Custodial**: VIGIL never handles private keys or executes transactions
- ✅ **Zero-Knowledge Architecture**: Your history stays in local IndexedDB—never transmitted
- ✅ **No Transaction Signing**: Analysis only, never controls your wallet
- ✅ **No Tracking**: No analytics or telemetry on user behavior
- ✅ **Open Source**: Full transparency—audit the code yourself
- ✅ **Client-Side Processing**: Your data stays local whenever possible

### API Key Protection

- ✅ Server-side API management (users never see keys)
- ✅ Rate limiting per user tier
- ✅ Multi-provider fallback (Gemini → OpenAI)

### ⚠️ Probabilistic Security Standard

**VIGIL is a probabilistic security tool**, not an absolute guarantee.

> **TechNote:** Security is probabilistic by nature. VIGIL significantly improves threat detection and reduces risk, but cannot provide 100% protection or eliminate all threats. AI-powered analysis means false positives and false negatives are possible. Always verify critical transactions manually. VIGIL is designed to improve safety, not eliminate risk.

### Reporting Vulnerabilities

See our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

---

## 🎯 Get Protected Now (30-Day Free Trial)

Visit **[www.vigilcore.org](https://www.vigilcore.org)** to start using VIGIL immediately:

✅ **No API keys required**  
✅ **No installation needed**  
✅ **No credit card**  
✅ **Full feature access for 30 days**

### After Your Trial

Connect your wallet to continue with:
- 🆓 **Baseline**: Community protection (5 intercepts, throttled AI)
- 💎 **Sentinel**: Full unlimited access ($50/year)
- 👑 **Apex**: Predictive intelligence + priority mesh ($100/year)

**View pricing details on the platform** - Visit [www.vigilcore.org](https://www.vigilcore.org) and access pricing from the footer menu

---

## 🔮 Roadmap: Horizon 2026

| Phase | Progress | Status | Features |
|-------|----------|--------|----------|
| **Phase 01: Genesis** | [████████████] 100% | ✅ Complete | Web-native facility with AI-powered demos |
| **Phase 02: Field Unit** | [████████░░░░] 60% | 🔧 In Progress | Packaged browser extension deployment |
| **Phase 03: Universal Layer** | [░░░░░░░░░░░░] 0% | 📋 Planned | Native mobile keyboard & multi-chain support (EVM, BTC, Avalanche) |

---

<details>
<summary><b>👨‍💻 Developer Gateway: Local Development & Contribution</b></summary>

**⚠️ IMPORTANT**: This section is ONLY for developers contributing to the codebase or auditing the source.

**If you're a user looking to protect yourself**, visit the hosted platform at **[www.vigilcore.org](https://www.vigilcore.org)** instead.

### Why Use the Hosted Version?

✅ **Zero setup** - No installation, no API keys, just visit and use  
✅ **Always updated** - Latest features and security patches  
✅ **Enterprise hosting** - Fast, reliable, globally distributed  
✅ **Subscription management** - Your wallet unlocks premium features  
✅ **No costs** - We handle the AI API costs, not you  

**Running locally is only for developers contributing code.**

### Why Contribute Instead of Self-Hosting?

Running VIGIL locally means:
- ❌ You pay for API costs (not us)
- ❌ No subscription features (wallet-gated access)
- ❌ You miss updates and security patches
- ❌ No support (you're on your own)
- ❌ Setup complexity (environment, keys, builds)

**The hosted version is better for 99% of users.**

### Neural Parity Protocol

**Critical Engineering Note:** The logic used in the **Web Facility** (this repository) is identical to the logic in the **Field Unit** (browser extension). This ensures bit-perfect parity between the calibration environment and the production extension, preventing verdict divergence. Any changes to `/services` or `/utils` must maintain this parity.

### Prerequisites (Development Environment)
- **Node.js** 18+ ([Download here](https://nodejs.org/))
- **Your own API keys** (you'll pay for API usage):
  - [Gemini API](https://aistudio.google.com/app/apikey) (Primary)
  - [OpenAI API](https://platform.openai.com/api-keys) (Fallback)
  
**Note**: The hosted version uses server-side API keys. Users never need their own keys.

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vigilcore/vigil-core.git
   cd vigil-core
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```
   GEMINI_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Project Structure

```
vigil-core/
├── components/         # React components
│   ├── docs/          # Documentation pages
│   └── ...            # Feature components
├── services/          # Neural Hub: AI provider integrations
│   ├── aiRouter.ts    # Smart routing + fallback
│   ├── geminiService.ts
│   └── openaiService.ts
├── hooks/             # Custom React hooks
├── utils/             # Mathematical Primitives: Scoring, Market Math
├── registry/          # Broadcast system
└── types.ts           # Shared Security Event Classifications
```

### Contributing

We welcome contributions! Here's how to help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Commit your changes**: `git commit -m "Add: your feature"`
4. **Push to the branch**: `git push origin feature/your-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Write clear, commented code
- Follow existing TypeScript patterns
- Add tests for new features (when applicable)
- Update documentation for user-facing changes
- **Maintain Neural Parity** between Web Facility and Field Unit

</details>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Free to use, modify, and distribute
- ✅ Can be used in commercial projects
- ⚠️ No warranty or liability—use at your own risk

---

## 🌐 Links

- **Live Platform**: [www.vigilcore.org](https://www.vigilcore.org) *(Documentation & pricing available within the platform)*
- **Report Issues**: [GitHub Issues](https://github.com/Vigilcore/vigil-core/issues)
- **Security Reports**: [SECURITY.md](SECURITY.md)

---

## 🙏 Acknowledgments

Built with modern open-source technologies:
- Powered by Gemini and OpenAI APIs
- Modern blockchain infrastructure
- React and TypeScript ecosystem
- Security research community

---

<div align="center">


Built in response to **real attack vectors.**

*"Improving safety, not eliminating risk"*

### [VIGILANCE IS THE ONLY PERMANENT SHIELD.](https://www.vigilcore.org)

</div>

<!-- 
DOCUMENT_INTEGRITY_LOG: 
VERSION: v0.0.1.1 
LINES: 400+ 
STATUS: DEFINITIVE_LANDING_PAGE 
-->