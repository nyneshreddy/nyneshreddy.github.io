#!/bin/bash
# ============================================================
# down.sh — Stop the website container on the Pi
# Run this from WSL: bash down.sh
# ============================================================
set -e

PI_HOST="pi"
CONTAINER_NAME="nynesh-site"

echo "=== Stopping container on Pi ==="
ssh $PI_HOST "sudo docker stop $CONTAINER_NAME 2>/dev/null || echo 'Container not running.'"

echo "=== Container status ==="
ssh $PI_HOST "sudo docker ps -a --filter name=$CONTAINER_NAME"

echo ""
echo "Site is down. Run 'bash up.sh' to start it again."
