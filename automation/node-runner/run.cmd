@echo off

setlocal

set NODE_EXE=%~dp0node.exe

if not exist "%NODE_EXE%" set NODE_EXE=node

set CASE=%1

if "%CASE%"=="" set CASE=AZ-110-01-010

set BASE=%~2
if "%BASE%"=="" set BASE=http://127.0.0.1:82/mhkcmwa11/dummy.html

"%NODE_EXE%" "%~dp0runner.mjs" --case %CASE% --base-url "%BASE%" --live

endlocal

