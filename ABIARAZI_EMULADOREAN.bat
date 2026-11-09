@echo off
title Zibersegurtasuna - Abiarazi Emuladorean
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "%~dp0abiarazi_emuladorean.ps1"
if %ERRORLEVEL% NEQ 0 pause
