#!/bin/bash
# ============================================================
# logs.sh — View container logs on the Pi
# Run this from WSL: bash logs.sh
# ============================================================
set -e

PI_HOST="pi"
CONTAINER_NAME="nynesh-site"

echo "=== Recent container logs ==="
ssh $PI_HOST "sudo docker logs --tail 50 $CONTAINER_NAME 2>&1 || echo 'Container not found.'"

echo ""
echo "=== Live logs (Ctrl+C to exit) ==="
ssh $PI_HOST "sudo docker logs -f $CONTAINER_NAME 2>&1" || true
