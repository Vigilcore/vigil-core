# Git Branch Switching: How Files Change

## ⚠️ **YES - File Structure WILL Change When You Switch Branches**

When you run `git checkout <branch>`, Git **replaces your files** to match that branch.

---

## 📊 **What Happens When You Switch Branches**

### **Current Situation: You're on `playground`**

If you switch to `main` or `development`, here's what changes:

### **Files That Will Be DELETED** (exist in `playground` but NOT in `main`):

❌ **These files will disappear:**
- `BACKWARDS_PAGINATION_IMPLEMENTATION.md`
- `CACHE_VERSIONING_IMPLEMENTATION.md`
- `CHATGPT_PROMPT_AGE_FIX.md`
- `CHATGPT_PROMPT_SHORT.md`
- `PROBLEM_STATEMENT_BACKWARDS_PAGINATION.md`
- `api/cache.ts` ← **Important!**
- `api/helius.ts` ← **Important!**
- `lib/cache.ts` ← **Important!**
- `services/heliusService.ts` ← **Important!**

### **Files That Will Be MODIFIED** (reverted to older versions):

⚠️ **These files will change to older versions:**
- `.gitignore`
- `App.tsx`
- `VIGIL-FIELD-UNIT/background/serviceWorker.js`
- `components/IntentValidatorDemo.tsx` ← **Major changes!**
- `package-lock.json`
- `package.json`
- `types.ts`

---

## 🔄 **Example: Switching from `playground` → `main`**

### **Before Switch (on `playground`):**
```
📁 Your Project/
  ├── api/
  │   ├── cache.ts ✅ (exists)
  │   ├── helius.ts ✅ (exists)
  │   └── ...
  ├── lib/
  │   └── cache.ts ✅ (exists)
  ├── services/
  │   └── heliusService.ts ✅ (exists, 724 lines)
  └── components/
      └── IntentValidatorDemo.tsx ✅ (latest version)
```

### **After `git checkout main`:**
```
📁 Your Project/
  ├── api/
  │   ├── cache.ts ❌ (DELETED)
  │   ├── helius.ts ❌ (DELETED)
  │   └── ...
  ├── lib/
  │   └── cache.ts ❌ (DELETED)
  ├── services/
  │   └── heliusService.ts ❌ (DELETED)
  └── components/
      └── IntentValidatorDemo.tsx ⚠️ (reverted to older version)
```

---

## ⚠️ **Important Warnings**

### **1. Uncommitted Changes Will Be Lost**

If you have **uncommitted changes** and switch branches:
- Git will **warn you** if files would be overwritten
- You must **commit** or **stash** changes first

### **2. Files Only Exist in One Branch**

- Files in `playground` but not in `main` → **disappear** when switching to `main`
- Files in `main` but not in `playground` → **appear** when switching to `main`

### **3. Modified Files Revert**

- If a file exists in both branches but is different:
  - Switching branches **replaces** the file with the version from that branch
  - Your current version is **lost** (unless committed)

---

## 🛡️ **How to Protect Your Work**

### **Before Switching Branches:**

1. **Check for uncommitted changes:**
   ```bash
   git status
   ```

2. **Commit your work:**
   ```bash
   git add .
   git commit -m "Save work before switching branches"
   ```

3. **Or stash your changes:**
   ```bash
   git stash
   # Switch branches
   git checkout main
   # Later, get your changes back:
   git checkout playground
   git stash pop
   ```

---

## 📋 **File Differences Summary**

| File | playground | main/development | What Happens |
|------|-----------|------------------|--------------|
| `api/cache.ts` | ✅ Exists | ❌ Missing | **DELETED** when switching |
| `api/helius.ts` | ✅ Exists | ❌ Missing | **DELETED** when switching |
| `lib/cache.ts` | ✅ Exists | ❌ Missing | **DELETED** when switching |
| `services/heliusService.ts` | ✅ Exists (724 lines) | ❌ Missing | **DELETED** when switching |
| `components/IntentValidatorDemo.tsx` | ✅ Latest (1232 lines) | ⚠️ Older version | **REVERTED** to older version |
| `package.json` | ✅ Has @vercel/kv | ⚠️ Older | **REVERTED** to older version |

---

## ✅ **Safe Branch Switching**

### **Option 1: Commit First (Recommended)**
```bash
# On playground branch
git add .
git commit -m "Save current work"
git push origin playground

# Now safe to switch
git checkout main
```

### **Option 2: Stash Changes**
```bash
# On playground branch
git stash save "Work in progress"

# Switch branches
git checkout main

# Later, return to playground and restore:
git checkout playground
git stash pop
```

### **Option 3: Create New Branch**
```bash
# Create a backup branch from current work
git branch playground-backup

# Now safe to switch
git checkout main
```

---

## 🔄 **Switching Back**

When you switch back to `playground`:
- All deleted files **reappear**
- All modified files **revert to playground versions**
- Your working directory matches `playground` branch exactly

---

## 💡 **Best Practice**

### **For Sharing with Google AI Studio:**

1. **Stay on `playground` branch** (where you are now)
2. **Create ZIP from `playground`** (using the script)
3. **Don't switch branches** while working with Google AI
4. **If you must switch:**
   - Commit everything first
   - Document which branch you're on
   - Remember files will change

---

## 🎯 **Quick Reference**

| Action | Command | File Changes |
|--------|---------|--------------|
| **Switch to main** | `git checkout main` | ❌ Deletes Helius files, reverts to older code |
| **Switch to development** | `git checkout development` | ❌ Same as main |
| **Switch back to playground** | `git checkout playground` | ✅ Restores all files |
| **Check current branch** | `git branch --show-current` | Shows which branch you're on |

---

## ⚠️ **Critical Reminder**

**If you switch from `playground` to `main`:**
- ❌ You'll **lose** all Helius integration files
- ❌ You'll **lose** recent improvements
- ❌ You'll see **older code** without new features

**To get them back:**
- Just switch back: `git checkout playground`
- All files will be restored

---

**Bottom Line:** Yes, switching branches **absolutely changes your file structure**. Git replaces your files to match the branch you switch to.
