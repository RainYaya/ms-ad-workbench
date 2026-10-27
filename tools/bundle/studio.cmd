@echo off
cd /d "%~dp0"
start "RPA Studio 10200" cmd /k node automation\node-runner\studio\server.mjs 10200
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:10200
echo Studio is running in the other window. Close that window or Ctrl+C to stop.
pause
