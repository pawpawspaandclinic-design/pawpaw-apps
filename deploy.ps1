# PawPaw PWA Deployment Script for Hostinger
# Run this script from the project root directory

$ErrorActionPreference = "Stop"

# Configuration
$SSH_HOST = "72.61.150.17"
$SSH_PORT = "65002"
$SSH_USER = "u151624428"
$SSH_PASS = "Enemy@2025"
$REMOTE_ROOT = "/home/u151624428/domains/app.pawpawspaandclinic.com"
$TIMESTAMP = Get-Date -Format "yyyyMMddHHmmss"
$RELEASE_DIR = "release_$TIMESTAMP"

Write-Host "=== PawPaw PWA Deployment ===" -ForegroundColor Cyan
Write-Host "Target: app.pawpawspaandclinic.com" -ForegroundColor Cyan
Write-Host "Release: $RELEASE_DIR" -ForegroundColor Cyan
Write-Host ""

# Check if build exists
if (-not (Test-Path ".next")) {
    Write-Host "ERROR: Build not found. Run 'npm run build' first." -ForegroundColor Red
    exit 1
}

Write-Host "[1/6] Creating release directory on server..." -ForegroundColor Yellow
$createDirCmd = "mkdir -p $REMOTE_ROOT/$RELEASE_DIR"
echo y | plink -P $SSH_PORT -pw $SSH_PASS $SSH_USER@$SSH_HOST $createDirCmd

Write-Host "[2/6] Uploading .next directory..." -ForegroundColor Yellow
pscp -r -P $SSH_PORT -pw $SSH_PASS .next "$SSH_USER@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"

Write-Host "[3/6] Uploading public directory..." -ForegroundColor Yellow
pscp -r -P $SSH_PORT -pw $SSH_PASS public "$SSH_USER@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"

Write-Host "[4/6] Uploading configuration files..." -ForegroundColor Yellow
pscp -P $SSH_PORT -pw $SSH_PASS package.json "$SSH_USER@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"
pscp -P $SSH_PORT -pw $SSH_PASS next.config.js "$SSH_USER@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"

Write-Host "[5/6] Creating symbolic link (zero-downtime swap)..." -ForegroundColor Yellow
$symlinkCmd = @"
cd $REMOTE_ROOT && \
rm -f public_html && \
ln -sf $RELEASE_DIR public_html && \
chmod -R 755 $RELEASE_DIR
"@
echo y | plink -P $SSH_PORT -pw $SSH_PASS $SSH_USER@$SSH_HOST $symlinkCmd

Write-Host "[6/6] Verifying deployment..." -ForegroundColor Yellow
$verifyCmd = "ls -la $REMOTE_ROOT/public_html"
echo y | plink -P $SSH_PORT -pw $SSH_PASS $SSH_USER@$SSH_HOST $verifyCmd

Write-Host ""
Write-Host "=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Live URL: https://app.pawpawspaandclinic.com" -ForegroundColor Green
Write-Host "Release: $RELEASE_DIR" -ForegroundColor Green
Write-Host ""
Write-Host "Note: If you need to rollback, SSH to the server and run:" -ForegroundColor Yellow
Write-Host "  cd $REMOTE_ROOT && rm public_html && ln -sf [previous_release] public_html" -ForegroundColor Yellow
