#!/bin/bash
cd "$(dirname "$0")"
echo "Iniciando servidor do Dashboard de Crédito de Carbono..."
echo "Acesse: http://localhost:5173"
echo "Pressione Ctrl+C para parar"
npx vite --host
