@echo off
cd /d "%~dp0"
start "mock server 10117" cmd /k node automation\node-runner\mock-server.mjs 10117
timeout /t 2 /nobreak >nul
node automation\node-runner\run-flow.mjs flows\books\AY-120-08-001.yaml --base http://127.0.0.1:10117/AMB/dummy.html --headless --yes
echo.
echo Expected: done 8  pending 5  failed 0  skipped 0  evidence 3
echo Evidence: logs\AY-120-08-001-flow\
pause
