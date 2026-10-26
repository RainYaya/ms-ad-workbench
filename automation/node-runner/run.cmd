@echo off
setlocal
set NODE_EXE=%~dp0node.exe
if not exist "%NODE_EXE%" set NODE_EXE=node
set CASE=%1
if "%CASE%"=="" set CASE=AZ-110-01-010
"%NODE_EXE%" "%~dp0runner.mjs" --case %CASE% --base-url %2
endlocal
