#!/bin/sh
# Generates devNotes/twine CSS.txt from all .css files in src/ subdir

# Joins all .css files from the current dir (recursive) into a Twee [script] passage
# arguments:
# $1: root repo dir
# $2: output file name
collectCSSForTwine() {
	local files=$(find . -iname '*.css' -print)
	files=$(echo "$files" | sort)
	echo "" > "$2"
	for f in $files; do
		printf "\n/* ${f} */\n" >> "$2"
		cat "$f" >> "$2"
	done
}

ROOT_REPO_DIR="$(git rev-parse --show-toplevel)"
cd "${ROOT_REPO_DIR}"/src
collectCSSForTwine "${ROOT_REPO_DIR}" "${ROOT_REPO_DIR}/devNotes/twine CSS.txt"
