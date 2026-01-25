# Git Setup Guide for MacBook Terminal & Cursor AI Terminal

## Current Status
- ✅ Git is installed (version 2.39.5 - Apple Git)
- ✅ Homebrew is installed
- ✅ Git is configured with your email: `github@vigilcore.org`
- ✅ Git is configured with your name: `Vigil-Core`
- ✅ GitHub credentials are set up via GitHub CLI
- ✅ Both MacBook Terminal and Cursor AI Terminal can use the same GitHub account

## Using Both Terminals with GitHub

**Good News!** Both your **MacBook Terminal** and **Cursor AI Terminal** can use the same GitHub account and configuration. Here's how it works:

### How It Works

1. **Shared Git Configuration**: Both terminals use the same global git config stored at `~/.gitconfig`
   - Email: `github@vigilcore.org`
   - Name: `Vigil-Core`
   - Both terminals will use these settings automatically

2. **Shared GitHub Authentication**: GitHub CLI (`gh`) stores authentication in `~/.config/gh/`
   - Once you authenticate in one terminal, both can use it
   - Both terminals will use the same GitHub account

3. **Same Repository Access**: Both terminals can work with the same repositories
   - Navigate to your project: `cd ~/Downloads/vigil-core`
   - Use all git commands in both terminals

### Verifying Setup in Both Terminals

**In MacBook Terminal:**
```bash
# Check git config
git config --global user.email
git config --global user.name

# Check GitHub auth
gh auth status

# Check git status
cd ~/Downloads/vigil-core
git status
```

**In Cursor AI Terminal:**
```bash
# Check git config (should show same values)
git config --global user.email
git config --global user.name

# Check GitHub auth (should show same account)
gh auth status

# Check git status
cd ~/Downloads/vigil-core
git status
```

### Important Notes

- ✅ **Same Account**: Both terminals will use the same GitHub account
- ✅ **Same Config**: Changes in one terminal affect both (since it's global config)
- ✅ **Same Repositories**: Both can work with the same local repositories
- ⚠️ **Be Careful**: If you're working in both terminals simultaneously, make sure to pull latest changes before pushing

## Step 1: Fix Homebrew Permissions (if needed)

If you encounter permission errors, run these commands in your MacBook Terminal:

```bash
# Fix Homebrew directory permissions
sudo chown -R $(whoami) /opt/homebrew/Cellar
sudo chown -R $(whoami) /opt/homebrew/Library
sudo chown -R $(whoami) /opt/homebrew/var
```

## Step 2: Update Git via Homebrew

Run these commands in your MacBook Terminal:

```bash
# Install/update git via Homebrew
brew install git

# Verify the new version
git --version
```

After installation, Homebrew's git (usually newer) will be used automatically since `/opt/homebrew/bin` is in your PATH.

## Step 3: Verify Git Configuration

Check your git configuration:

```bash
# Check git version and location
which git
git --version

# Check your git config
git config --global --list

# If needed, set your name (email is already set)
git config --global user.name "Your Name"
```

## Step 4: Navigate to Your Project

```bash
# Navigate to your project directory
cd ~/Downloads/vigil-core

# Or if you renamed it differently, adjust the path
# cd ~/Downloads/VIGIL-Core

# Verify git status
git status
git remote -v
```

## Step 5: Test GitHub Connection

```bash
# Test fetching from GitHub (dry run)
git fetch --dry-run

# Or check if you can see remote branches
git branch -r
```

## Complete Git Commands Reference

### Basic Commands

```bash
# Check git version
git --version

# Check which git is being used
which git

# Check current directory
pwd

# List files in current directory
ls -la
```

### Repository Status & Information

```bash
# Check current status (most common command)
git status

# Short status format
git status -s
git status --short

# Check remote repository
git remote -v

# Show remote URL
git remote get-url origin

# Check current branch
git branch

# Show only current branch name
git branch --show-current

# Show all branches (local + remote)
git branch -a

# Show branches with tracking info
git branch -vv

# Show remote branches only
git branch -r

# View commit history
git log

# View commit history (one line per commit)
git log --oneline

# View commit history (graphical)
git log --graph --oneline --all

# View last N commits
git log -n 5

# Show file differences
git diff

# Show staged differences
git diff --staged
git diff --cached
```

### Branching Commands

```bash
# List all branches
git branch

# Create a new branch
git branch branch-name

# Switch to a branch
git checkout branch-name
git switch branch-name

# Create and switch to new branch
git checkout -b branch-name
git switch -c branch-name

# Rename current branch
git branch -m new-branch-name

# Delete a branch (local)
git branch -d branch-name

# Force delete a branch (local)
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name

# Track remote branch
git branch --set-upstream-to=origin/branch-name branch-name
```

### Staging & Committing

```bash
# Add specific file
git add filename

# Add all files in current directory
git add .

# Add all files (including deleted)
git add -A
git add --all

# Add specific file type
git add *.js
git add *.tsx

# Stage all changes
git add -u

# Unstage a file (keep changes)
git reset filename
git restore --staged filename

# Discard changes in working directory
git restore filename
git checkout -- filename

# Commit changes
git commit -m "Your commit message"

# Commit with detailed message
git commit -m "Title" -m "Description"

# Amend last commit (change message)
git commit --amend -m "New message"

# Amend last commit (add more changes)
git add .
git commit --amend --no-edit
```

### Remote Operations

```bash
# View remotes
git remote -v

# Add remote repository
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/repo.git

# Remove remote
git remote remove origin

# Fetch from remote (doesn't merge)
git fetch

# Fetch specific remote
git fetch origin

# Fetch all remotes
git fetch --all

# Pull latest changes (fetch + merge)
git pull

# Pull from specific branch
git pull origin branch-name

# Pull with rebase
git pull --rebase

# Push to remote
git push

# Push to specific branch
git push origin branch-name

# Push and set upstream
git push -u origin branch-name
git push --set-upstream origin branch-name

# Force push (use with caution!)
git push --force
git push -f

# Push all branches
git push --all

# Push all tags
git push --tags
```

### Tagging

```bash
# List all tags
git tag

# Create a tag
git tag tag-name

# Create annotated tag
git tag -a tag-name -m "Tag message"

# Push a tag
git push origin tag-name

# Push all tags
git push --tags

# Delete a tag (local)
git tag -d tag-name

# Delete remote tag
git push origin --delete tag-name
```

### Merging & Rebasing

```bash
# Merge a branch into current branch
git merge branch-name

# Merge with no fast-forward (creates merge commit)
git merge --no-ff branch-name

# Abort a merge
git merge --abort

# Start rebase
git rebase branch-name

# Interactive rebase (last N commits)
git rebase -i HEAD~3

# Continue rebase after resolving conflicts
git rebase --continue

# Abort rebase
git rebase --abort

# Skip current commit in rebase
git rebase --skip
```

### Stashing

```bash
# Stash current changes
git stash

# Stash with message
git stash save "Stash message"

# List all stashes
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Apply and remove stash
git stash pop

# Delete a stash
git stash drop stash@{0}

# Delete all stashes
git stash clear

# Show stash contents
git stash show
git stash show -p
```

### Undoing Changes

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo to specific commit (keep changes)
git reset --soft commit-hash

# Undo to specific commit (discard changes)
git reset --hard commit-hash

# Revert a commit (creates new commit)
git revert commit-hash

# Discard all uncommitted changes
git reset --hard HEAD

# Discard changes to specific file
git restore filename
git checkout -- filename

# Unstage a file
git restore --staged filename
git reset HEAD filename
```

### Configuration

```bash
# View all config
git config --list

# View global config
git config --global --list

# View local config
git config --local --list

# Set user name
git config --global user.name "Your Name"

# Set user email
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"

# Set default branch name
git config --global init.defaultBranch main

# View specific config
git config user.name
git config user.email

# Unset a config
git config --global --unset user.name
```

### Cloning & Initialization

```bash
# Clone a repository
git clone https://github.com/user/repo.git

# Clone specific branch
git clone -b branch-name https://github.com/user/repo.git

# Clone into specific directory
git clone https://github.com/user/repo.git my-folder

# Initialize new repository
git init

# Initialize with specific branch name
git init -b main
```

### Useful Aliases (Optional)

```bash
# Create useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### Quick Reference Commands

```bash
# Most commonly used commands
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push                # Push to remote
git pull                # Pull from remote
git branch              # List branches
git checkout branch     # Switch branch
git log --oneline       # View history
```

## Troubleshooting

### If git commands don't work:
1. Make sure you're in the project directory
2. Check if git is in your PATH: `echo $PATH`
3. Restart your terminal after installing git via Homebrew

### If GitHub authentication fails:
- You're using GitHub CLI (`gh`) for authentication
- Make sure you're logged in: `gh auth status`
- If not logged in: `gh auth login`

## Your Project Details
- **Repository**: https://github.com/Vigilcore/vigil-core.git
- **Current Branch**: development
- **Project Path**: ~/Downloads/vigil-core (or VIGIL-Core)

---

**Note**: After renaming your folder, make sure you navigate to the correct path. The git repository will work from any location as long as you're inside the project directory.
