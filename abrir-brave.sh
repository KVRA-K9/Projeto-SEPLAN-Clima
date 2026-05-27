#!/bin/bash
# Script para abrir o Dashboard de Crédito de Carbono no navegador Brave

URL="http://localhost:5173/"

# Verifica se o servidor está rodando
if ! curl -s -o /dev/null --connect-timeout 2 "$URL"; then
    echo "Servidor não está rodando. Iniciando..."
    cd "$(dirname "$0")"
    nohup npm run dev > vite.log 2>&1 &
    sleep 4
fi

# Abre no Brave
if [ -x "/opt/brave.com/brave/brave" ]; then
    "/opt/brave.com/brave/brave" --no-sandbox "$URL" &
else
    echo "Brave não encontrado em /opt/brave.com/brave/brave"
    exit 1
fi

echo "Abrindo $URL no Brave..."
