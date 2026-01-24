<div align="center">

![VIGIL Core Banner](https://github.com/user-attachments/assets/4bc52511-6e56-4b9b-ba74-978a53622de0)

# VIGIL Core
**AI-Powered Security Intelligence for Blockchain**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)

*Defending against address poisoning, phishing attacks, and social engineering across blockchain networks*

</div>

---

## 🎯 What is VIGIL?

**VIGIL** is an open-source security intelligence platform that provides **Layer 0.5** protection for blockchain users. It analyzes wallet addresses, transaction patterns, and social media content to detect:

- 🚨 **Address Poisoning**: Fake addresses designed to trick you via transaction history
- 🎣 **Phishing Attempts**: Scam links and malicious contracts
- 🤖 **Social Engineering**: AI-generated fake influencer accounts and pump-and-dump schemes
- 📊 **Market Manipulation**: Coordinated trading patterns and bot activity

### Why "Layer 0.5"?

VIGIL operates **before** you interact with the blockchain, providing an early warning system that complements (not replaces) your existing security tools like hardware wallets and network validators.

---

## ⚠️ Important Disclaimer

**VIGIL is a probabilistic security tool**, not a guarantee.

- ✅ **It can:** Significantly improve your threat detection and reduce risk
- ❌ **It cannot:** Provide 100% protection or eliminate all threats
- 🧠 **It uses AI:** Which means false positives and false negatives are possible

**Always verify critical transactions manually.** VIGIL is designed to be humble about its capabilities—we aim to help you make safer decisions, not make decisions for you.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download here](https://nodejs.org/))
- **API Keys** (free tier available):
  - [Gemini API](https://aistudio.google.com/app/apikey) (Primary AI provider)
  - [OpenAI API](https://platform.openai.com/api-keys) (Fallback provider)

### Installation

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

---

## 🏗️ Architecture

VIGIL is built with:

- **Frontend**: React 19 + TypeScript + Vite
- **AI Providers**: Gemini API (primary) + OpenAI (fallback)
- **Blockchain**: Currently optimized for Solana (Web3.js)
- **Styling**: Modern CSS with security-themed UI
- **State Management**: React hooks with `useApiGuard` for rate limiting

### Key Components

| Component | Purpose |
|-----------|---------|
| `VigilScanner` | Main threat detection interface |
| `IntentValidatorDemo` | Analyzes transaction intent vs. actual behavior |
| `AdversarialMimicryLab` | Tests social engineering resistance |
| `SocialIntelligenceLab` | Detects fake influencers and coordinated attacks |
| `MeshQueryTerminal` | Cross-chain threat intelligence lookup |

---

## 🛡️ Security Features

### API Key Protection
- ✅ Environment variables via `.env.local`
- ✅ Excluded from git via `.gitignore`
- ✅ Rate limiting with `useApiGuard` hook
- ✅ Multi-provider fallback (Gemini → OpenAI)

### Privacy-First Design
- ✅ **No server-side data storage**: All analysis happens client-side
- ✅ **No tracking**: No analytics or telemetry
- ✅ **Open source**: Full transparency—audit the code yourself

### Reporting Vulnerabilities
See our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

---

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Development

### Project Structure
```
vigilcore/
├── components/         # React components
│   ├── docs/          # Documentation pages
│   └── ...            # Feature components
├── services/          # AI provider integrations
│   ├── aiRouter.ts    # Smart routing + fallback
│   ├── geminiService.ts
│   └── openaiService.ts
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── registry/          # Broadcast system
└── types.ts           # TypeScript definitions
```

### Key Files
- `App.tsx` - Main application router
- `services/aiRouter.ts` - AI provider orchestration
- `hooks/useApiGuard.ts` - Rate limiting and error handling

---

## 🤝 Contributing

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

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Free to use, modify, and distribute
- ✅ Can be used in commercial projects
- ⚠️ No warranty or liability—use at your own risk

---

## 🌐 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [/components/docs/](components/docs/)
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

**Built with ❤️ by the VIGIL community**

*"Improving safety, not eliminating risk"*

</div>
