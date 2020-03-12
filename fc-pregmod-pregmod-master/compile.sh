#!/bin/bash

output=/dev/stdout

# displays help text
function displayHelp {
  cat << HelpText
Usage: compile.sh [OPTION]...

Options:
  -d, --dry      Do not compile
  -g, --git      Add hash of HEAD to filename
  -h, --help     Show this help text
  -s, --sanity   Run sanityCheck
  -q, --quiet    Suppress terminal output
HelpText
}

#display an error message
function echoError {
	echo -e "\033[0;31m$@\033[0m"
}

#display message
function echoMessage {
	echo "$1" > "${output}"
}

#compile the HTML file
function compile {
	mkdir -p bin/resources
	export TWEEGO_PATH=devTools/tweeGo/storyFormats
	TWEEGO_EXE="tweego"

	if hash $TWEEGO_EXE 2>/dev/null; then
		echoMessage "system tweego binary"
	else
		case "$(uname -m)" in
		x86_64|amd64)
			echoMessage "x64 arch"
			if [ "$(uname -s)" = "Darwin" ]; then
				TWEEGO_EXE="./devTools/tweeGo/tweego_osx64"
			elif [ $OSTYPE = "msys" ]; then
				TWEEGO_EXE="./devTools/tweeGo/tweego_win64"
			else
				TWEEGO_EXE="./devTools/tweeGo/tweego_nix64"
			fi
			;;
		x86|i[3-6]86)
			echoMessage "x86 arch"
			if [ "$(uname -s)" = "Darwin" ]; then
				TWEEGO_EXE="./devTools/tweeGo/tweego_osx86"
			elif [ $OSTYPE = "msys" ]; then
				TWEEGO_EXE="./devTools/tweeGo/tweego_win86"
			else
				TWEEGO_EXE="./devTools/tweeGo/tweego_nix86"
			fi
			;;
		*)
			echoError "No system tweego binary found, and no precompiled binary for your platform available."
			echoError "Please compile tweego and put the executable in PATH."
			exit 2
		esac
	fi

	if [[ -d .git ]]; then
		COMMIT=$(git rev-parse --short HEAD) # Find and insert current commit
		if [[ "$usehash" ]]; then
			file="bin/FC_pregmod_${COMMIT}.html"
		else
			sed -Ei "s/build: .releaseID/\0, commit: $COMMIT/" src/gui/mainMenu/AlphaDisclaimer.tw
			file="bin/FC_pregmod.html"
		fi
	else
		file="bin/FC_pregmod.html"
	fi

	devTools/concatFiles.sh js/ '*.js' bin/fc.js
	$TWEEGO_EXE -o $file --module=bin/fc.js --head devTools/head.html src/ || build_failed="true"
	rm -f bin/fc.js
	if [ "$build_failed" = "true" ]
	then
		echoError "Build failed."
		exit 1
	fi

	#Make the output prettier, replacing \t with a tab and \n with a newline
	sed -i -e '/^.*<div id="store-area".*$/s/\\t/\t/g' -e '/^.*<div id="store-area".*$/s/\\n/\n/g' $file
	if [[ -d .git ]]; then
		git checkout -- src/gui/mainMenu/AlphaDisclaimer.tw # Revert AlphaDisclaimer for next compilation
	fi
	echoMessage "Saved to $file."
}

if [[ "$1" == "" ]]; then
	#tip if no option
	echoMessage "For more options see compile.sh -h."
else
	#parse options
	while [[ "$1" ]]
	do
		case $1 in
		-d|--dry)
			dry="true"
		;;
		-g|--git)
			usehash="true"
		;;
		-h|--help)
			displayHelp
			exit 0
		;;
		-s|--sanity)
			sanity="true"
		;;
		-q|--quiet)
			output=/dev/null
		;;
		*)
			echoError "Unknown argument $1."
			displayHelp
			exit 1
		esac
		shift
	done
fi

# Run sanity check.
[ -n "$sanity" ] && ./sanityCheck.sh

if ! [[ -d .git ]]; then
	echoMessage "No git repository. Git specfific actions disabled."
fi

#compile
if [[ "$dry" ]]; then
	echoMessage "Dry run finished."
else
	compile
	echoMessage "Compilation finished."
fi
