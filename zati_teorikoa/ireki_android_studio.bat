@echo off
title Android Studio - Zibersegurtasuna Quiz Irekitzen
echo ========================================================
echo    ANDROID STUDIO - ZIBERSEGURTASUNA QUIZ IREKITZEN
echo ========================================================
set STUDIO_EXE=%LOCALAPPDATA%\Programs\android-studio\bin\studio64.exe
set PROJECT_DIR=%~dp0zibersegurtasuna_quiz_app

if exist "%STUDIO_EXE%" (
    echo Android Studio aurkitu da! Proiektua irekitzen...
    start "" "%STUDIO_EXE%" "%PROJECT_DIR%"
) else (
    echo Android Studio abiarazlea ez da ohiko bidean aurkitu.
    echo Mesedez, ireki Android Studio eskuz eta aukeratu karpeta hau:
    echo %PROJECT_DIR%
)
pause
