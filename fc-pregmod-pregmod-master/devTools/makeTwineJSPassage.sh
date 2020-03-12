#!/bin/sh
# Generates devNotes/twine JS.txt from all .js files in src/ subdir

# Joins all .js files from the current dir (recursive) into a Twee [script] passage
# arguments:
# $1: root repo dir
# $2: output file name
collectJSForTwine() {
	local files=$(find . -path ./art/assistantArt.js -prune -o -name '*.js' -print)
	files=$(echo "$files" | sort)
	echo "" > "$2"
	for f in $files; do
		printf "\n/* ${f} */\n" >> "$2"
		sed -nf "$1"/devTools/stripComments.sed "$f" >> "$2"
	done
}

ROOT_REPO_DIR="$(git rev-parse --show-toplevel)"
cd "${ROOT_REPO_DIR}"/src
collectJSForTwine "${ROOT_REPO_DIR}" "${ROOT_REPO_DIR}/devNotes/twine JS.txt"
