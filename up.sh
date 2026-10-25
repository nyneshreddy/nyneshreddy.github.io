#!/bin/bash
# ============================================================
# up.sh — Start the website container on the Pi
# Run this from WSL: bash up.sh
# ============================================================
set -e

PI_HOST="pi"
CONTAINER_NAME="nynesh-site"

echo "=== Starting container on Pi ==="
ssh $PI_HOST "sudo docker start $CONTAINER_NAME 2>/dev/null || echo 'Container not found. Run deploy.sh first.'"

echo "=== Container status ==="
ssh $PI_HOST "sudo docker ps --filter name=$CONTAINER_NAME"

echo ""
echo "Site is up at http://192.168.10.239"
