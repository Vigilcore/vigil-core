# Security Policy

## Purpose

VIGIL is a security intelligence platform designed to protect users from blockchain address poisoning, phishing attacks, and social engineering threats. As a security-focused project, we take vulnerability reporting seriously.

## Reporting a Vulnerability

**⚠️ DO NOT create a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in VIGIL Core, please report it privately through one of the following methods:

### Preferred Method: GitHub Security Advisories
1. Go to the **Security** tab of this repository
2. Click **"Report a vulnerability"**
3. Fill out the private vulnerability report form

### Alternative Method: Email
If you prefer email, please send details to: **[Your security contact email]**

### What to Include in Your Report

Please provide:
- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** (e.g., API key exposure, data leak, bypassing security checks)
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up

## What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Regular Updates**: Every 7-14 days until resolved
- **Public Disclosure**: Only after a fix is deployed (coordinated disclosure)

## Scope

### In Scope
- API key exposure or leakage
- Bypass of security validation logic
- Cross-site scripting (XSS) in the web interface
- Injection vulnerabilities (SQL, command, etc.)
- Authentication/authorization flaws
- Dependency vulnerabilities that affect VIGIL's security posture

### Out of Scope
- Social engineering attacks against VIGIL developers
- Denial of Service (DoS) attacks
- Issues in third-party dependencies (report to the upstream project)
- False positives from automated security scanners (verify manually first)

## Security Features

VIGIL includes the following security measures:
- ✅ **API Key Protection**: Environment variables with `.gitignore` enforcement
- ✅ **Input Sanitization**: Address and transaction validation
- ✅ **Rate Limiting**: API request throttling via `useApiGuard` hook
- ✅ **Multi-Provider Fallback**: Redundancy across Gemini and OpenAI
- ✅ **Client-Side Processing**: No user data is stored on servers
- ✅ **Open Source Transparency**: Full source code available for audit

## Disclaimer

VIGIL is a **probabilistic security tool** that enhances threat detection but does not guarantee 100% protection. Users should:
- Verify critical transactions manually
- Use VIGIL as a "Layer 0.5" supplement to existing security practices
- Understand that AI-based analysis can produce false positives/negatives

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |
| < 1.0   | ⚠️ Pre-release     |

We recommend always using the latest version from the `main` branch.

## Security Updates

Security patches will be:
1. Released as soon as possible after verification
2. Announced in the repository's **Releases** section
3. Tagged with a `[SECURITY]` prefix in commit messages

## Attribution

We appreciate responsible disclosure and will credit security researchers (with permission) in:
- The fix's commit message
- The release notes
- A `CONTRIBUTORS.md` file (if applicable)

---

**Thank you for helping keep VIGIL and its users safe!** 🛡️
