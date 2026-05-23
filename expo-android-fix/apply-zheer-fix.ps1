param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectPath
)

$ErrorActionPreference = "Stop"
$fixRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$charactersSrc = Join-Path $fixRoot "Zheer_saz_doulingo/characters"
$scriptSrc = Join-Path $fixRoot "Zheer_saz_doulingo/fix-android-png-assets.py"
$charactersDest = Join-Path $ProjectPath "assets/images/characters"
$scriptDest = Join-Path $ProjectPath "scripts/fix-android-png-assets.py"

New-Item -ItemType Directory -Force -Path $charactersDest | Out-Null
New-Item -ItemType Directory -Force -Path (Split-Path $scriptDest) | Out-Null

Copy-Item -Recurse -Force "$charactersSrc/*" $charactersDest
Copy-Item -Force $scriptSrc $scriptDest
Remove-Item -Force (Join-Path $charactersDest "character1.jpeg") -ErrorAction SilentlyContinue

Write-Host "Applied Android PNG fix to $ProjectPath"
Write-Host "Next: cd $ProjectPath; npm run fix:android-assets; eas build -p android --profile production --clear-cache"
