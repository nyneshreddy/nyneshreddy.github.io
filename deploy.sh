#!/bin/bash
# ============================================================
# deploy.sh — Deploy site to Raspberry Pi as a Docker container
# Copies build output + Dockerfile to Pi, builds image there,
# and starts the container.
# Run this from WSL: bash deploy.sh
# ============================================================
set -e

PI_HOST="pi"
IMAGE_NAME="nynesh-site"
CONTAINER_NAME="nynesh-site"
PI_DEPLOY_DIR="/tmp/pi-deploy"
PROJECT_DIR="$HOME/nyneshreddy.github.io"

echo "=== Verifying build output exists ==="
if [ ! -d "$PROJECT_DIR/out" ]; then
    echo "ERROR: out/ directory not found. Run 'bash build.sh' first."
    exit 1
fi

echo "=== Preparing deploy directory on Pi ==="
ssh $PI_HOST "rm -rf $PI_DEPLOY_DIR && mkdir -p $PI_DEPLOY_DIR"

echo "=== Copying build output, Dockerfile, and nginx config to Pi ==="
scp -r "$PROJECT_DIR/out" $PI_HOST:$PI_DEPLOY_DIR/
scp "$PROJECT_DIR/Dockerfile" $PI_HOST:$PI_DEPLOY_DIR/
scp "$PROJECT_DIR/nginx.conf" $PI_HOST:$PI_DEPLOY_DIR/

echo "=== Building Docker image on Pi ==="
ssh $PI_HOST "cd $PI_DEPLOY_DIR && sudo docker build -t $IMAGE_NAME ."

echo "=== Stopping old container if running ==="
ssh $PI_HOST "sudo docker rm -f $CONTAINER_NAME 2>/dev/null || true"

echo "=== Starting new container ==="
ssh $PI_HOST "sudo docker run -d --name $CONTAINER_NAME -p 80:80 --restart unless-stopped $IMAGE_NAME"

echo "=== Cleaning up deploy directory on Pi ==="
ssh $PI_HOST "rm -rf $PI_DEPLOY_DIR"

echo "=== Verifying container is running ==="
sleep 2
ssh $PI_HOST "sudo docker ps --filter name=$CONTAINER_NAME"

echo ""
echo "=== Deployment complete! ==="
echo "Your site is live at http://192.168.10.239"
