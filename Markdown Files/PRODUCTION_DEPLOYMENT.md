# Production Deployment Guide

## How Production Works

### Architecture Overview

**Production Setup:**
- **Frontend**: Static files (React SPA) built by Vite, served by Vercel CDN
- **Backend**: Vercel Serverless Functions (`/api/gemini` and `/api/openai`)
- **Environment Variables**: Set in Vercel Dashboard (not in `.env.local`)

### Deployment Process

#### 1. **Automatic Detection**
When you push to GitHub and Vercel is connected:
- Vercel automatically detects the project structure
- Recognizes `/api` folder as serverless functions
- Builds the frontend with `npm run build`
- Deploys both frontend and API routes

#### 2. **Build Process**
```bash
# Vercel runs this automatically:
npm run build
```

This creates:
- **Frontend**: Optimized static files in `dist/` folder
- **API Routes**: Serverless functions from `/api` folder are automatically deployed

#### 3. **Serverless Functions in Production**

**How it works:**
- Files in `/api` folder become Vercel serverless functions
- `/api/gemini.ts` → `https://your-domain.vercel.app/api/gemini`
- `/api/openai.ts` → `https://your-domain.vercel.app/api/openai`
- Each function runs in an isolated serverless environment
- API keys are read from Vercel environment variables (server-side only)

**Benefits:**
- ✅ API keys never exposed to client
- ✅ Automatic scaling (handles traffic spikes)
- ✅ Global edge network (low latency)
- ✅ Pay-per-use pricing

### Environment Variables in Production

#### Setting Up API Keys

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Go to **Settings** → **Environment Variables**

2. **Add Environment Variables**
   ```
   GEMINI_API_KEY=your_production_gemini_key
   OPENAI_API_KEY=your_production_openai_key
   ```

3. **Select Environments**
   - ✅ Production
   - ✅ Preview (optional, for PR previews)
   - ✅ Development (optional, for `vercel dev`)

4. **Redeploy**
   - After adding variables, Vercel will automatically redeploy
   - Or manually trigger: **Deployments** → **Redeploy**

#### Security

**Production Environment Variables:**
- ✅ Stored securely in Vercel (encrypted)
- ✅ Never exposed to client-side code
- ✅ Only accessible in serverless functions
- ✅ Can be different per environment (prod, preview, dev)

**vs Local Development:**
- Local: Uses `.env.local` file
- Production: Uses Vercel Dashboard settings

### Request Flow in Production

```
User Browser
    ↓
Frontend (React SPA on Vercel CDN)
    ↓ (fetch request)
/api/gemini or /api/openai (Serverless Function)
    ↓ (reads API key from Vercel env vars)
Gemini API or OpenAI API
    ↓ (response)
Serverless Function
    ↓ (JSON response)
Frontend
    ↓
User Browser
```

### Key Differences: Local vs Production

| Aspect | Local Development | Production |
|--------|------------------|------------|
| **Frontend** | `npm run dev` (Vite dev server) | Static files on Vercel CDN |
| **API Routes** | `vercel dev` (local serverless) | Vercel serverless functions |
| **Environment** | `.env.local` file | Vercel Dashboard |
| **API Keys** | Local file (your keys) | Vercel env vars (team keys) |
| **URL** | `localhost:5173` or `localhost:3000` | `your-domain.vercel.app` |
| **Performance** | Development mode | Optimized production build |

### Deployment Checklist

Before deploying to production:

- [ ] **Environment Variables Set**
  - `GEMINI_API_KEY` in Vercel Dashboard
  - `OPENAI_API_KEY` in Vercel Dashboard

- [ ] **Build Works Locally**
  ```bash
  npm run build
  ```

- [ ] **API Routes Tested**
  - Test with `vercel dev` locally
  - Verify API keys are working

- [ ] **GitHub Connected**
  - Vercel connected to your GitHub repo
  - Auto-deploy enabled (optional)

- [ ] **Domain Configured** (optional)
  - Custom domain in Vercel Dashboard
  - DNS records configured

### Automatic Deployments

**Vercel automatically deploys when:**
- You push to `main` branch → Production deployment
- You push to other branches → Preview deployment
- You open a PR → Preview deployment with unique URL

**Manual Deployment:**
- Go to Vercel Dashboard
- Click **Deployments** → **Redeploy**

### Monitoring & Logs

**Vercel Dashboard provides:**
- Function logs (API route execution)
- Error tracking
- Performance metrics
- Usage analytics

**Access logs:**
- Vercel Dashboard → **Functions** tab
- See real-time logs for `/api/gemini` and `/api/openai`

### Cost Considerations

**Vercel Pricing:**
- Frontend hosting: Free tier available
- Serverless functions: Pay-per-invocation
- Bandwidth: Included in plan

**API Costs:**
- Gemini API: Pay-per-use (your account)
- OpenAI API: Pay-per-use (your account)
- These are separate from Vercel costs

### Troubleshooting Production

**If AI features don't work in production:**

1. **Check Environment Variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Ensure `GEMINI_API_KEY` and `OPENAI_API_KEY` are set
   - Check they're enabled for "Production" environment

2. **Check Function Logs**
   - Vercel Dashboard → Functions tab
   - Look for errors in `/api/gemini` or `/api/openai`

3. **Verify API Keys**
   - Test keys work with direct API calls
   - Check API key permissions/quotas

4. **Redeploy**
   - After changing env vars, redeploy is required
   - Vercel Dashboard → Deployments → Redeploy

### Summary

**Production is simpler than local development:**
- ✅ No need to run `vercel dev` manually
- ✅ Environment variables managed in Vercel Dashboard
- ✅ Automatic deployments on git push
- ✅ API keys secure (server-side only)
- ✅ Global CDN for fast performance

**The main difference:**
- **Local**: You manage `.env.local` and run `vercel dev`
- **Production**: Vercel manages everything automatically
