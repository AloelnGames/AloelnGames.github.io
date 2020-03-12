@ECHO OFF
REM Quickly rebuild 64-bit VS2015 solution/project files from the CMake files.

cmake -G "Visual Studio 14 Win64"
pause