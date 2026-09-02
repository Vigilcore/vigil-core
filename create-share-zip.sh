#!/bin/bash

# Script to create a clean ZIP archive for sharing with Google AI Studio
# Excludes node_modules, dist, .git, and other unnecessary files

echo "📦 Creating clean ZIP archive for Google AI Studio..."
echo ""

# Get current branch name
BRANCH=$(git branch --show-current)
COMMIT=$(git rev-parse --short HEAD)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# ZIP filename
ZIP_NAME="vigil-core-${BRANCH}-${COMMIT}-${TIMESTAMP}.zip"

echo "Branch: $BRANCH"
echo "Commit: $COMMIT"
echo "Output: $ZIP_NAME"
echo ""

# Create ZIP excluding unnecessary files
zip -r "$ZIP_NAME" . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x "*.zip" \
  -x ".DS_Store" \
  -x "*.log" \
  -x "vigil-core-full.zip" \
  -x "vigil-core-*.zip" \
  -x ".env.local" \
  -x ".env" \
  -x ".vercel/*" \
  -x "*.bak" \
  -x "*.backup" \
  -x "services/heliusService copy.bak.co" \
  > /dev/null 2>&1

if [ $? -eq 0 ]; then
  SIZE=$(du -h "$ZIP_NAME" | cut -f1)
  echo "✅ ZIP created successfully!"
  echo "📊 Size: $SIZE"
  echo "📁 File: $ZIP_NAME"
  echo ""
  echo "📋 Ready to share with Google AI Studio!"
  echo "   Branch: $BRANCH"
  echo "   Commit: $COMMIT"
else
  echo "❌ Error creating ZIP file"
  exit 1
fi
