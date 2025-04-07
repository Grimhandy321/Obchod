@echo off
setlocal

REM Vytvoření složky cert pokud neexistuje
if not exist ".\cert" (
    mkdir ".\cert"
)

REM Export certifikátu
dotnet dev-certs https --export-path ".\cert\https-cert.pem" --format Pem --no-password

echo Hotovo!
endlocal
pause
