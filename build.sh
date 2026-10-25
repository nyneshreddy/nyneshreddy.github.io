#!/bin/bash
# ============================================================
# build.sh — Build the Next.js site and Docker image
# Run this from WSL: bash build.sh
# ============================================================
set -e

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

PROJECT_DIR="$HOME/nyneshreddy.github.io"
PI_HOST="pi"
IMAGE_NAME="nynesh-site"

echo "=== Installing dependencies ==="
cd "$PROJECT_DIR"
npm install --legacy-peer-deps

echo "=== Building Next.js site ==="
npm run build

echo "=== Verifying build output ==="
if [ ! -d "out" ]; then
    echo "ERROR: out/ directory not found. Build may have failed."
    exit 1
fi

echo "Build complete. Files in out/:"
ls -la out/

echo ""
echo "Done! Run 'bash deploy.sh' to build the Docker image on the Pi and start it."
