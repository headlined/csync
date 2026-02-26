if (!(Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Bun..." -ForegroundColor Yellow
    powershell -c "irm bun.sh/install.ps1 | iex"
    $env:Path += ";$env:USERPROFILE\.bun\bin"
    Write-Host "Bun installed. Reload cmd to have the changes take effect."
} else {
    Write-Host "Bun is already installed." -ForegroundColor Green
}
if (!(Get-Command code -ErrorAction SilentlyContinue)) {
    Write-Host "Warning: 'code' CLI not found. Please install VS Code and add it to your PATH." -ForegroundColor Red
} else {
    Write-Host "VS Code CLI detected." -ForegroundColor Green
}
if (Test-Path "package.json") {
    Write-Host "Installing npm packages..." -ForegroundColor Yellow
    bun install
} else {
    Write-Host "package.json not found. Run this in the project root." -ForegroundColor Red
}