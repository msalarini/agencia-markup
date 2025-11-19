@echo off
echo ===================================
echo Setup Git e GitHub - Agencia Markup
echo ===================================
echo.

REM Adicionar Git ao PATH temporariamente
set "PATH=%PATH%;C:\Program Files\Git\bin;C:\Program Files\Git\cmd"
set "PATH=%PATH%;C:\Program Files\GitHub CLI"

echo Configurando Git...
git config --global user.name "Frank"
git config --global user.email "seu-email@exemplo.com"

echo.
echo Inicializando repositorio Git...
git init
git add .
git commit -m "feat: Implementar PRO Nivel 1 - salvar pacotes, comissao, duplicar"

echo.
echo ===========================================
echo PRÓXIMOS PASSOS:
echo ===========================================
echo.
echo 1. Feche e reabra o terminal (para carregar o PATH)
echo 2. Execute: gh auth login
echo 3. Escolha: GitHub.com
echo 4. Escolha: HTTPS
echo 5. Autentique via browser
echo 6. Execute: gh repo create agencia-markup --public --source=. --push
echo.
echo ===========================================
pause
