@echo off
:: Concatenates files from dir %1 specified with wildcard %2 and outputs result to %3

:: TODO Proper temp file instead of bin\list.txt
SET _LISTFILE="bin\list.txt"
>%_LISTFILE% (FOR /R "%~1" %%F IN (%2) DO echo "%%F")
sort /O %_LISTFILE% %_LISTFILE%
>%3 (FOR /F "usebackq delims=" %%F IN (`type "%_LISTFILE%"`) DO (
	echo /* %%F */
	type %%F
	)
)

DEL %_LISTFILE%
