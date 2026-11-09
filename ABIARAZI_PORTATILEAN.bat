@echo off
chcp 65001 > nul
title KriptoQuiz 2026 - Zibersegurtasuna
cd /d "%~dp0zati_teorikoa"
echo ========================================================
echo    KRIPTOQUIZ 2026 - ZIBERSEGURTASUNA (2MG3)
echo ========================================================
echo Zerbitzaria abiarazten eta nabigatzailea irekitzen...
echo.
node server.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js-ekin arazorik balego, nabigatzailean zuzenean irekitzen...
    start index.html
)
pause
