# PawPaw PWA Deployment Script for Hostinger (Fixed)
$ErrorActionPreference = "Stop"

# Configuration
$SSH_HOST = "72.61.150.17"
$SSH_PORT = "65002"
$SSH_USER = "u151624428"
$SSH_PASS = 'Enemy@2025'  # Single quotes to prevent escaping issues
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

# Check if PuTTY tools are installed
$plinkPath = Get-Command plink -ErrorAction SilentlyContinue
$pscpPath = Get-Command pscp -ErrorAction SilentlyContinue

if (-not $plinkPath -or -not $pscpPath) {
    Write-Host "ERROR: PuTTY tools (plink/pscp) not found!" -ForegroundColor Red
    Write-Host "Please install PuTTY from: https://www.putty.org/" -ForegroundColor Yellow
    Write-Host "Or use Chocolatey: choco install putty" -ForegroundColor Yellow
    exit 1
}

# Clear any cached host keys
Write-Host "[0/6] Clearing cached SSH keys..." -ForegroundColor Yellow
$regPath = "HKCU:\Software\SimonTatham\PuTTY\SshHostKeys"
if (Test-Path $regPath) {
    Remove-Item -Path $regPath -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "[1/6] Testing SSH connection..." -ForegroundColor Yellow
$testCmd = "echo 'Connection OK'"
$result = echo y | plink -P $SSH_PORT -pw $SSH_PASS $SSH_USER@$SSH_HOST $testCmd 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: SSH connection failed!" -ForegroundColor Red
    Write-Host "Please verify your credentials and try again." -ForegroundColor Yellow
    Write-Host "Error details: $result" -ForegroundColor Red
    exit 1
}

Write-Host "[2/6] Creating release directory on server..." -ForegroundColor Yellow
$createDirCmd = "mkdir -p $REMOTE_ROOT/$RELEASE_DIR"
echo y | plink -P $SSH_PORT -pw $SSH_PASS -batch $SSH_USER@$SSH_HOST $createDirCmd

Write-Host "[3/6] Uploading .next directory..." -ForegroundColor Yellow
pscp -r -P $SSH_PORT -pw $SSH_PASS -batch .next "${SSH_USER}@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"

Write-Host "[4/6] Uploading public directory..." -ForegroundColor Yellow
pscp -r -P $SSH_PORT -pw $SSH_PASS -batch public "${SSH_USER}@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"

Write-Host "[5/6] Uploading configuration files..." -ForegroundColor Yellow
pscp -P $SSH_PORT -pw $SSH_PASS -batch package.json "${SSH_USER}@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"
pscp -P $SSH_PORT -pw $SSH_PASS -batch next.config.js "${SSH_USER}@${SSH_HOST}:$REMOTE_ROOT/$RELEASE_DIR/"

Write-Host "[6/6] Creating symbolic link (zero-downtime swap)..." -ForegroundColor Yellow
$symlinkCmd = "cd $REMOTE_ROOT && rm -f public_html && ln -sf $RELEASE_DIR public_html && chmod -R 755 $RELEASE_DIR"
echo y | plink -P $SSH_PORT -pw $SSH_PASS -batch $SSH_USER@$SSH_HOST $symlinkCmd

Write-Host ""
Write-Host "=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Live URL: https://app.pawpawspaandclinic.com" -ForegroundColor Green
Write-Host "Release: $RELEASE_DIR" -ForegroundColor Green
