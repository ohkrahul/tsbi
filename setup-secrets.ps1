# ─────────────────────────────────────────────────────────────
#  TSBI — Add secrets to GitHub + Vercel in one shot
#  Run:  powershell -ExecutionPolicy Bypass -File setup-secrets.ps1
# ─────────────────────────────────────────────────────────────

$REPO = "ohkrahul/tsbi"
$PROJECT_ID = "prj_Vr3Fvcv1aQQTZ5bj4XfNqXf8r2xG"

Write-Host ""
Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   TSBI — GitHub + Vercel Secret Setup    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ── 1. Collect values securely ──────────────────────────────
$VERCEL_TOKEN   = Read-Host "Vercel Token  (vercel.com → Settings → Tokens)" -MaskInput
$VERCEL_ORG_ID  = Read-Host "Vercel Org ID (vercel.com → Settings → General → Your ID)" -MaskInput
$GITHUB_PAT     = Read-Host "GitHub PAT    (github.com → Settings → Developer settings → Tokens → classic, needs repo+secrets scope)" -MaskInput

Write-Host ""
Write-Host "► Adding secrets to GitHub repo: $REPO ..." -ForegroundColor Yellow

# ── 2. GitHub secrets via REST API ──────────────────────────
$headers = @{
    Authorization = "Bearer $GITHUB_PAT"
    Accept        = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

# Get repo public key for secret encryption
$keyResp = Invoke-RestMethod -Uri "https://api.github.com/repos/$REPO/actions/secrets/public-key" -Headers $headers
$pubKey  = $keyResp.key
$keyId   = $keyResp.key_id

# Encrypt secret using libsodium (via NuGet Sodium.Core)
function Encrypt-Secret($secret, $base64Key) {
    Add-Type -AssemblyName System.Security
    $keyBytes    = [Convert]::FromBase64String($base64Key)
    $secretBytes = [System.Text.Encoding]::UTF8.GetBytes($secret)

    # Download Sodium.Core if not present
    $sodiumDll = "$env:TEMP\Sodium.Core.dll"
    if (-not (Test-Path $sodiumDll)) {
        Write-Host "  Downloading Sodium.Core for encryption..." -ForegroundColor Gray
        $pkg = "$env:TEMP\sodium.zip"
        Invoke-WebRequest "https://www.nuget.org/api/v2/package/Sodium.Core/1.3.5" -OutFile $pkg
        Expand-Archive $pkg "$env:TEMP\sodium_pkg" -Force
        Copy-Item "$env:TEMP\sodium_pkg\lib\net6.0\Sodium.Core.dll" $sodiumDll -Force
    }
    Add-Type -Path $sodiumDll

    $sealed = [Sodium.SealedPublicKeyBox]::Create($secretBytes, $keyBytes)
    return [Convert]::ToBase64String($sealed)
}

function Set-GHSecret($name, $value) {
    $enc = Encrypt-Secret $value $pubKey
    $body = @{ encrypted_value = $enc; key_id = $keyId } | ConvertTo-Json
    Invoke-RestMethod -Method PUT `
        -Uri "https://api.github.com/repos/$REPO/actions/secrets/$name" `
        -Headers $headers `
        -Body $body -ContentType "application/json" | Out-Null
    Write-Host "  ✓ GitHub secret set: $name" -ForegroundColor Green
}

Set-GHSecret "VERCEL_TOKEN"      $VERCEL_TOKEN
Set-GHSecret "VERCEL_ORG_ID"     $VERCEL_ORG_ID
Set-GHSecret "VERCEL_PROJECT_ID" $PROJECT_ID

Write-Host ""
Write-Host "► Adding env vars to Vercel project: $PROJECT_ID ..." -ForegroundColor Yellow

# ── 3. Vercel environment variables via REST API ─────────────
$vHeaders = @{
    Authorization  = "Bearer $VERCEL_TOKEN"
    "Content-Type" = "application/json"
}

function Set-VercelEnv($key, $value) {
    $body = @{
        key    = $key
        value  = $value
        type   = "encrypted"
        target = @("production", "preview", "development")
    } | ConvertTo-Json
    try {
        Invoke-RestMethod -Method POST `
            -Uri "https://api.vercel.com/v10/projects/$PROJECT_ID/env" `
            -Headers $vHeaders -Body $body | Out-Null
        Write-Host "  ✓ Vercel env set: $key" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠ Vercel env $key may already exist (skipping)" -ForegroundColor DarkYellow
    }
}

Set-VercelEnv "VERCEL_TOKEN"      $VERCEL_TOKEN
Set-VercelEnv "VERCEL_ORG_ID"     $VERCEL_ORG_ID
Set-VercelEnv "VERCEL_PROJECT_ID" $PROJECT_ID

Write-Host ""
Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  All done! Push to main to trigger CI.   ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
