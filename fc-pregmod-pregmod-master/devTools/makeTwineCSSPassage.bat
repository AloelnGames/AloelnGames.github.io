@echo off
:: Generates devNotes/twineCSS.txt from all .css files in src/ subdir

:: See if we can find a git installation
setlocal enabledelayedexpansion

for %%k in (HKCU HKLM) do (
	for %%w in (\ \Wow6432Node\) do (
		for /f "skip=2 delims=: tokens=1*" %%a in ('reg query "%%k\SOFTWARE%%wMicrosoft\Windows\CurrentVersion\Uninstall\Git_is1" /v InstallLocation 2^> nul') do (
			for /f "tokens=3" %%z in ("%%a") do (
				set GIT=%%z:%%b
				set GITFOUND=yes
				goto FOUND
			)
		)
	)
)

:FOUND
if %GITFOUND% == yes (
	set "PATH=%GIT%bin;%PATH%"
	bash --login -c ./makeTwineCSSPassage.sh
)
