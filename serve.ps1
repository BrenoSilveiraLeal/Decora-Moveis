# Servidor local de desenvolvimento com páginas estáticas e API Node.js.
# Uso: powershell -ExecutionPolicy Bypass -File serve.ps1 [-Port 5173]
param([int]$Port = 5173)

$node = Get-Command node -ErrorAction Stop
$server = Join-Path $PSScriptRoot 'server.mjs'
& $node.Source $server --port $Port
exit $LASTEXITCODE
