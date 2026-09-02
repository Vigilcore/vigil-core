# Google AI Studio Codebase Sharing Guide

## 📋 Overview

This guide explains how to share your VIGIL codebase with Google AI Studio and keep it synchronized, while understanding how Git branches affect the sharing process.

---

## 🎯 Which Branch to Share?

### **RECOMMENDATION: Share `playground` Branch**

**Why `playground`?**
- ✅ Contains the **latest experimental features** (Helius integration, real-time telemetry)
- ✅ Most **up-to-date** with recent development
- ✅ Includes **all improvements** from Google AI Studio + Cursor AI
- ✅ Has the **complete feature set** you want Google AI to see

### Branch Comparison:

| Branch | Status | Contains | Best For |
|--------|--------|---------|----------|
| **playground** | ✅ **RECOMMENDED** | Latest features, Helius integration, experimental work | Sharing with Google AI Studio |
| **development** | ⚠️ Older | Stable features, no Helius integration | Production-ready code |
| **main** | ⚠️ Older | Same as development (merged) | Production deployment |

---

## 📤 How to Share Codebase with Google AI Studio

### **Method 1: ZIP Archive (EASIEST)**

1. **Create a clean ZIP** (exclude node_modules, dist, .git):
   ```bash
   # From project root
   zip -r vigil-core-for-google-ai.zip . \
     -x "node_modules/*" \
     -x "dist/*" \
     -x ".git/*" \
     -x "*.zip" \
     -x ".DS_Store" \
     -x "*.log"
   ```

2. **Upload to Google AI Studio:**
   - Go to Google AI Studio
   - Create a new project/conversation
   - Use the "Attach Files" or "Upload" feature
   - Select `vigil-core-for-google-ai.zip`

### **Method 2: GitHub Repository Link (BEST FOR SYNC)**

1. **Share GitHub Repository:**
   - Go to: `https://github.com/Vigilcore/vigil-core`
   - Copy the repository URL
   - Share the **specific branch URL**:
     ```
     https://github.com/Vigilcore/vigil-core/tree/playground
     ```

2. **In Google AI Studio:**
   - Paste the GitHub URL
   - Google AI can clone/read the repository
   - Specify branch: `playground`

### **Method 3: Individual File Upload (FOR SPECIFIC FILES)**

1. **Select Key Files:**
   - `App.tsx`
   - `components/IntentValidatorDemo.tsx`
   - `services/heliusService.ts`
   - `api/helius.ts`
   - `types.ts`
   - `README.md`

2. **Upload to Google AI Studio:**
   - Attach files one by one
   - Or create a folder structure

---

## 🔄 How Git Branches Affect Sharing

### **Scenario 1: You Share `playground` Branch**

✅ **What Google AI Sees:**
- Latest Helius integration
- Real-time telemetry features
- All experimental work
- Complete codebase as of commit `88b8a63`

✅ **What Happens When You Update:**
- If you commit to `playground` → Google AI needs updated files
- If you commit to `main` → Google AI won't see changes (different branch)

### **Scenario 2: You Share `main` Branch**

⚠️ **What Google AI Sees:**
- Older code (before Helius integration)
- Missing recent features
- Stable but outdated

⚠️ **What Happens When You Update:**
- If you commit to `playground` → Google AI won't see changes
- If you commit to `main` → Google AI sees updates

### **Scenario 3: You Share Multiple Branches**

✅ **Best Practice:**
- Share **`playground`** for development/experimental work
- Share **`main`** for production/stable reference
- Clearly label which branch is which

---

## 🔗 Keeping Codebase in Sync

### **Option A: Manual Sync (Simple)**

1. **When you make changes:**
   ```bash
   git add .
   git commit -m "Update: [description]"
   git push origin playground
   ```

2. **Re-upload to Google AI Studio:**
   - Create new ZIP
   - Or re-share GitHub link (Google AI will see updates)

### **Option B: GitHub Integration (Automatic)**

1. **Share GitHub Repository URL:**
   ```
   https://github.com/Vigilcore/vigil-core/tree/playground
   ```

2. **Google AI Studio can:**
   - Read latest code from GitHub
   - See new commits automatically
   - Access specific branches

### **Option C: Branch-Specific Sharing**

1. **For Development Work:**
   - Share `playground` branch
   - Google AI sees experimental features

2. **For Production Reference:**
   - Share `main` branch
   - Google AI sees stable code

---

## 📝 Step-by-Step: Share `playground` Branch

### **Step 1: Ensure You're on Playground Branch**
```bash
git checkout playground
git pull origin playground  # Get latest
```

### **Step 2: Create Clean Archive**
```bash
# Create ZIP excluding unnecessary files
zip -r vigil-core-playground.zip . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x "*.zip" \
  -x ".DS_Store" \
  -x "*.log" \
  -x "vigil-core-full.zip"
```

### **Step 3: Share with Google AI Studio**

**Option A: Upload ZIP**
- Go to Google AI Studio
- Click "Attach Files" or "Upload"
- Select `vigil-core-playground.zip`

**Option B: Share GitHub Link**
- Copy: `https://github.com/Vigilcore/vigil-core/tree/playground`
- Paste in Google AI Studio conversation
- Mention: "This is the `playground` branch with latest features"

### **Step 4: Document What You Shared**
Create a note in Google AI Studio:
```
Branch: playground
Commit: 88b8a63
Date: [current date]
Contains: Helius integration, real-time telemetry, parse-as-we-paginate
```

---

## 🔄 Updating Google AI Studio After Changes

### **When You Make Changes:**

1. **Commit to playground:**
   ```bash
   git add .
   git commit -m "feat: [description]"
   git push origin playground
   ```

2. **Notify Google AI Studio:**
   - If using GitHub link: "Codebase updated, latest commit: [hash]"
   - If using ZIP: Upload new ZIP with timestamp

3. **Document Changes:**
   ```
   Updated: [date]
   New commit: [hash]
   Changes: [brief description]
   ```

---

## ⚠️ Important Considerations

### **1. Branch Divergence**
- `playground` has **5 commits** ahead of `main`
- If you merge `playground` → `main`, Google AI should update to `main`
- If you keep working on `playground`, keep sharing `playground`

### **2. File Size Limits**
- Google AI Studio may have file size limits
- ZIP should be < 100MB (excluding node_modules)
- If too large, share only key files/folders

### **3. Sensitive Information**
- ⚠️ **Remove API keys** before sharing
- Check `.env.local`, `.env` files
- Use `.env.example` instead
- Remove any hardcoded secrets

### **4. Version Control**
- Always mention which **branch** you're sharing
- Include **commit hash** for reference
- Document **date** of sharing

---

## 🎯 Recommended Workflow

### **Initial Share:**
1. ✅ Share `playground` branch (latest features)
2. ✅ Use GitHub link (easiest to update)
3. ✅ Document branch + commit hash

### **Ongoing Updates:**
1. ✅ Continue working on `playground`
2. ✅ Push commits regularly
3. ✅ Notify Google AI when major changes occur
4. ✅ Keep branch name consistent

### **When Ready for Production:**
1. ✅ Merge `playground` → `development` → `main`
2. ✅ Update Google AI to use `main` branch
3. ✅ Document the transition

---

## 📋 Quick Reference

| Action | Command | Branch |
|--------|---------|--------|
| **Share with Google AI** | Upload ZIP or GitHub link | `playground` |
| **Make changes** | `git commit && git push` | `playground` |
| **Update Google AI** | Re-upload or notify | `playground` |
| **Production ready** | Merge to `main` | `main` |

---

## ✅ Checklist Before Sharing

- [ ] On correct branch (`playground`)
- [ ] Latest code pulled (`git pull`)
- [ ] No sensitive data (API keys removed)
- [ ] ZIP created (or GitHub link ready)
- [ ] Branch name documented
- [ ] Commit hash noted
- [ ] README updated (if needed)

---

**Last Updated:** [Current Date]  
**Current Branch:** `playground`  
**Latest Commit:** `88b8a63`
