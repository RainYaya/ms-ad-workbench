@echo off
cd /d "%~dp0"
echo.
echo === AZ-110-01-009 (hand-written, 45 steps) ===
node automation\node-runner\check-flow.mjs flows\AZ-110-01-009.yaml
echo.
echo === books/AY-120-08-001 (generated, 13 steps) ===
node automation\node-runner\check-flow.mjs flows\books\AY-120-08-001.yaml
echo.
echo === AZ-150-05-001 (batch, no browser) ===
node automation\node-runner\check-flow.mjs flows\AZ-150-05-001.yaml
echo.
echo Expected: errors 0 in all three.
pause
