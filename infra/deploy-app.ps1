# EcoSphere OS - Deploy Application Code to EC2
# Builds the frontend, packages everything, and deploys via AWS SSM
# Usage: .\infra\deploy-app.ps1

param(
    [string]$Region = "us-east-1",
    [string]$StackName = "ecosphere-app"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "`n=== EcoSphere OS - Application Deployment ===" -ForegroundColor Green

# Get instance ID from CloudFormation
Write-Host "[1/5] Getting instance info..." -ForegroundColor Yellow
$outputs = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs" `
    --output json | ConvertFrom-Json

$instanceId = ($outputs | Where-Object { $_.OutputKey -eq "InstanceId" }).OutputValue
$publicIp = ($outputs | Where-Object { $_.OutputKey -eq "PublicIP" }).OutputValue

if (-not $instanceId) {
    Write-Host "ERROR: Could not find instance. Run deploy.ps1 first." -ForegroundColor Red
    exit 1
}
Write-Host "Target instance: $instanceId ($publicIp)" -ForegroundColor Cyan

# Build frontend
Write-Host "`n[2/5] Building frontend..." -ForegroundColor Yellow
Push-Location "$ProjectRoot\frontend"
$env:VITE_API_URL = ""
npm ci --silent
npm run build
Pop-Location

# Package application
Write-Host "`n[3/5] Packaging application..." -ForegroundColor Yellow
$distDir = "$ProjectRoot\deploy-package"
if (Test-Path $distDir) { Remove-Item -Recurse -Force $distDir }
New-Item -ItemType Directory -Path $distDir | Out-Null
New-Item -ItemType Directory -Path "$distDir\src" | Out-Null
New-Item -ItemType Directory -Path "$distDir\public" | Out-Null

# Copy backend
Copy-Item "$ProjectRoot\backend\package.json" "$distDir\"
Copy-Item "$ProjectRoot\backend\package-lock.json" "$distDir\"
Copy-Item "$ProjectRoot\backend\src\*" "$distDir\src\" -Recurse

# Copy built frontend
Copy-Item "$ProjectRoot\frontend\dist\*" "$distDir\public\" -Recurse

# Create tarball
Push-Location $distDir
tar -czf "$ProjectRoot\ecosphere-deploy.tar.gz" *
Pop-Location
Remove-Item -Recurse -Force $distDir

$fileSize = [math]::Round((Get-Item "$ProjectRoot\ecosphere-deploy.tar.gz").Length / 1KB, 1)
Write-Host "Package size: ${fileSize}KB" -ForegroundColor Cyan

# Upload to S3 (temp bucket)
Write-Host "`n[4/5] Uploading package..." -ForegroundColor Yellow
$bucket = "ecosphere-deploy-$($outputs | Where-Object { $_.OutputKey -eq 'InstanceId' } | Select-Object -ExpandProperty OutputValue)"
$bucket = "ecosphere-deploy-temp-961308088417"

# Use SSM to deploy directly (send commands)
Write-Host "`n[5/5] Deploying to instance via SSM..." -ForegroundColor Yellow

# First, upload the tar to S3
aws s3 mb "s3://$bucket" --region $Region 2>$null
aws s3 cp "$ProjectRoot\ecosphere-deploy.tar.gz" "s3://$bucket/ecosphere-deploy.tar.gz" --region $Region

# Run deployment commands on EC2 via SSM
$deployCommands = @"
#!/bin/bash
set -e
cd /opt/app
aws s3 cp s3://$bucket/ecosphere-deploy.tar.gz /tmp/ecosphere-deploy.tar.gz --region $Region
rm -rf /opt/app/src /opt/app/public /opt/app/package.json /opt/app/package-lock.json
tar -xzf /tmp/ecosphere-deploy.tar.gz -C /opt/app/
npm ci --omit=dev --silent
chown -R ec2-user:ec2-user /opt/app
systemctl restart ecosphere
rm /tmp/ecosphere-deploy.tar.gz
echo "Deploy complete at $(date)"
"@

$commandId = aws ssm send-command `
    --instance-ids $instanceId `
    --document-name "AWS-RunShellScript" `
    --parameters "commands=[$($deployCommands -replace '"','\"' -split "`n" | ForEach-Object { "`"$_`"" } | Join-String -Separator ',')]" `
    --region $Region `
    --query "Command.CommandId" `
    --output text

Write-Host "SSM Command ID: $commandId" -ForegroundColor Cyan
Write-Host "Waiting for deployment to complete..."

Start-Sleep -Seconds 5
aws ssm wait command-executed --command-id $commandId --instance-id $instanceId --region $Region 2>$null

# Cleanup
Remove-Item "$ProjectRoot\ecosphere-deploy.tar.gz" -ErrorAction SilentlyContinue

Write-Host "`n=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Application URL: http://$publicIp" -ForegroundColor Green
Write-Host "Health check: http://$publicIp/api/health`n"
