# EcoSphere OS - AWS Deployment Script
# Deploys the application to AWS using EC2 with a simple setup
# Usage: .\infra\deploy.ps1

param(
    [string]$Region = "us-east-1",
    [string]$StackName = "ecosphere-app",
    [string]$InstanceType = "t3.small"
)

$ErrorActionPreference = "Stop"

Write-Host "`n=== EcoSphere OS - AWS Deployment ===" -ForegroundColor Green
Write-Host "Region: $Region"
Write-Host "Stack: $StackName"
Write-Host "Instance: $InstanceType`n"

# Check AWS CLI
try {
    $identity = aws sts get-caller-identity --output json | ConvertFrom-Json
    Write-Host "AWS Account: $($identity.Account)" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: AWS CLI not configured. Run 'aws configure' first." -ForegroundColor Red
    exit 1
}

# Deploy CloudFormation stack
Write-Host "`n[1/3] Deploying CloudFormation stack..." -ForegroundColor Yellow

aws cloudformation deploy `
    --template-file infra/cloudformation.yaml `
    --stack-name $StackName `
    --parameter-overrides InstanceType=$InstanceType `
    --capabilities CAPABILITY_IAM `
    --region $Region `
    --no-fail-on-empty-changeset

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: CloudFormation deployment failed." -ForegroundColor Red
    exit 1
}

# Get outputs
Write-Host "`n[2/3] Getting deployment info..." -ForegroundColor Yellow

$outputs = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs" `
    --output json | ConvertFrom-Json

$publicIp = ($outputs | Where-Object { $_.OutputKey -eq "PublicIP" }).OutputValue
$instanceId = ($outputs | Where-Object { $_.OutputKey -eq "InstanceId" }).OutputValue

Write-Host "Instance ID: $instanceId" -ForegroundColor Cyan
Write-Host "Public IP: $publicIp" -ForegroundColor Cyan

# Wait for instance to be ready
Write-Host "`n[3/3] Waiting for instance to be ready..." -ForegroundColor Yellow
aws ec2 wait instance-status-ok --instance-ids $instanceId --region $Region

Write-Host "`n=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Application URL: http://$publicIp" -ForegroundColor Green
Write-Host "`nNote: The application needs source code deployed."
Write-Host "Use the deploy-app.ps1 script to push the built code to the server.`n"
