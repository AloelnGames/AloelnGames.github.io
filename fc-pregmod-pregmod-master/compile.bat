@echo off
:: Free Cities Basic Compiler - Windows

:: Set working directory
pushd %~dp0
if not exist "bin\resources" mkdir bin\resources
CALL devTools/concatFiles.bat js/ "*.js" bin/fc.js
:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
	CALL "%~dp0devTools\tweeGo\tweego_win64.exe" -o "%~dp0bin/FC_pregmod.html" --module=bin/fc.js --head devTools/head.html "%~dp0src"
) else (
	CALL "%~dp0devTools\tweeGo\tweego_win86.exe" -o "%~dp0bin/FC_pregmod.html" --module=bin/fc.js --head devTools/head.html "%~dp0src"
)
DEL bin\fc.js

popd
ECHO Done
