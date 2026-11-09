<#
 .SYNOPSIS
  Zibersegurtasuna Quiz aplikazioa Pixel Emuladore independentean (Portua 5556) automatikoki abiarazteko script-a.
#>
$ErrorActionPreference = "Continue"

$adbPath = "D:\Android\Sdk\platform-tools\adb.exe"
$emulatorPath = "D:\Android\Sdk\emulator\emulator.exe"
$avdName = "pixel_zibersegurtasuna"
$emulatorId = "emulator-5556"
$apkPath = "$PSScriptRoot\Zibersegurtasuna_Quiz_2MG3.apk"
$appPackage = "eus.goierrieskola.kriptoquiz"
$mainActivity = "$appPackage/.MainActivity"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [1/3] Zibersegurtasuna Emuladorea egiaztatzen ($avdName - $emulatorId)..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Egiaztatu ea martxan dagoen
$devices = & $adbPath devices
if ($devices -notmatch $emulatorId) {
    Write-Host "Emuladorea ez dago martxan. Abiarazten ($emulatorId)..." -ForegroundColor Yellow
    Start-Process -FilePath $emulatorPath -ArgumentList @("-avd", $avdName, "-port", "5556") -WorkingDirectory "D:\Android\Sdk\emulator"
    
    Write-Host "Itxaroten emuladorea piztu arte..." -ForegroundColor Yellow
    & $adbPath -s $emulatorId wait-for-device
    Start-Sleep -Seconds 5
} else {
    Write-Host "Emuladorea martxan dago jada ($emulatorId)." -ForegroundColor Green
}

Write-Host "`n[2/3] APK-a instalatzen emuladorean..." -ForegroundColor Cyan
if (Test-Path $apkPath) {
    & $adbPath -s $emulatorId install -r $apkPath
} else {
    Write-Host "ERROREA: Ez da aurkitu $apkPath fitxategia!" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "`n[3/3] Aplikazioa irekitzen pantailan..." -ForegroundColor Cyan
& $adbPath -s $emulatorId shell am start -n $mainActivity

Write-Host "`nBikain! Zibersegurtasuna Aplikazioa martxan dago $emulatorId gailuan!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
