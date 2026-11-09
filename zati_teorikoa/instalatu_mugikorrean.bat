@echo off
chcp 65001 > nul
echo ========================================================
echo  Zibersegurtasuna Quiz: Mugikorrean Instalatzen (ADB)
echo ========================================================
echo Ziurtatu mugikorra USB bidez konektatuta dagoela...
"D:\Android\Sdk\platform-tools\adb.exe" wait-for-device
echo Gailua hauteman da! APK eguneratua instalatzen...
"D:\Android\Sdk\platform-tools\adb.exe" install -r "zibersegurtasuna_quiz_app\app\build\outputs\apk\debug\app-debug.apk"
echo Aplikazioa irekitzen mugikorraren pantailan...
"D:\Android\Sdk\platform-tools\adb.exe" shell am start -n "eus.goierrieskola.kriptoquiz/.MainActivity"
echo.
echo BIKAIN! Aplikazioa eguneratu da zure Samsung mugikorrean.
pause
