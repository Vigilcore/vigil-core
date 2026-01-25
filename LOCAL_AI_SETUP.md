# Local AI Setup Guide

## ✅ Simple Solution (Verified Working)

**The Problem:** `vercel dev` was auto-detecting Vite and only running `npm run dev`, which prevented serverless functions from running.

**The Fix:** Set `"framework": null` in `vercel.json` to disable auto-detection.

## Quick Setup

### Step 1: Configure `vercel.json`

Your `vercel.json` must have `"framework": null`:

```json
{
  "version": 2,
  "framework": null,
  "buildCommand": "npm run build",
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" }
  ]
}
```

### Step 2: Run Vercel Dev

That's it! Just run:

```bash
npx vercel dev
```

When prompted:
- "Set up and develop?" → **yes**
- "Which scope?" → Select any
- "Link to existing project?" → **yes** (if you have one) or **no**
- "Pull environment variables?" → **yes** (downloads API keys from Vercel)

**Success signal:** You should see:
```
Serverless Functions:
  api/gemini.ts
  api/openai.ts

Ready! Available at http://localhost:3000
```

### Step 3: Access Your Application

Open `http://localhost:3000` in your browser.

**That's it!** Both frontend and API routes work on the same port.

## How It Works

- **Vercel Dev** runs both:
  - Your frontend (Vite app)
  - Serverless functions from `/api` directory
- **Relative API paths** (`/api/gemini`, `/api/openai`) work automatically
- **Environment variables** load from `.env.local` and `.vercel/.env.development.local`
- **API keys** remain secure (never exposed to browser)

## Important Notes

### ✅ DO THIS:
- Run `npx vercel dev` for local development
- Pull environment variables when prompted
- Access app at `http://localhost:3000`

### ❌ DON'T DO THIS:
- Don't run `npm run dev` alone for AI testing (serverless functions won't run)
- Don't hardcode `localhost:3000` in frontend code (relative paths work fine)
- Don't add Vite proxy (not needed - Vercel handles it)

## Official Development Flow

For the development branch:

```bash
git checkout development
npx vercel dev
```

That's it! No separate terminals, no port juggling, no proxy configuration needed.

## Environment Variables

Vercel Dev automatically loads:
- `.env.local` (your local file)
- `.vercel/.env.development.local` (pulled from Vercel when you answer "yes")

Make sure these contain:
```
GEMINI_API_KEY=your_actual_key_here
OPENAI_API_KEY=your_actual_key_here
```

## Troubleshooting

### Issue: "API_KEY_NOT_CONFIGURED" error
- **Solution:** Make sure you answered "yes" when Vercel asked to pull environment variables
- **Check:** Verify `.vercel/.env.development.local` exists and has your API keys

### Issue: Serverless functions not running
- **Solution:** Ensure `vercel.json` has `"framework": null`
- **Check:** Look for "Serverless Functions:" message when starting `vercel dev`

### Issue: Port conflicts
- **Solution:** Vercel will automatically use the next available port if 3000 is busy
- **Check:** Look at the terminal output for the actual port number

## Security Confirmation

✅ API keys live only in `.env.local` and `.vercel/.env.development.local`  
✅ Browser never sees Gemini/OpenAI keys  
✅ No key leaks in DevTools  
✅ Same security model as production (Vercel serverless functions)

---

**Note:** This setup mirrors your production architecture, ensuring local development matches production behavior.
