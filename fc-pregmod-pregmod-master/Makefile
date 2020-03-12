MAKEFLAGS += -r
export TWEEGO_PATH=devTools/tweeGo/storyFormats
HASH := $(shell git rev-list -n 1 --abbrev-commit HEAD)
COMMIT := $(shell git rev-parse --short HEAD)
TWEEGO := $(shell command -v tweego 2>/dev/null)
ifndef TWEEGO
	uname := $(shell uname -s)
	arch := $(shell uname -m)
	arch := $(shell if test $(arch) = x86_64 -o $(arch) = amd64; then echo 64; else echo 32; fi)
	ifeq ($(uname),Linux)
		ifeq ($(arch),64)
			TWEEGO := devTools/tweeGo/tweego_nix64
		else
			TWEEGO := devTools/tweeGo/tweego_nix86
		endif
	else ifeq ($(uname),Darwin)
		ifeq ($(arch),64)
			TWEEGO := devTools/tweeGo/tweego_osx64
		else
			TWEEGO := devTools/tweeGo/tweego_osx86
		endif
	endif
endif

all: bin/FC_pregmod.html bin/resources

git: bin/FC_pregmod_$(HASH).html bin/resources

bin/resources: resources
	test -L "$@" || ln -s "../$<" bin/

bin/%.html: bin/tmp
	git checkout -- src/gui/mainMenu/AlphaDisclaimer.tw
	mv $< $@

bin/fc.js: bin/
	devTools/concatFiles.sh js/ '*.js' $@

bin/tmp: bin/fc.js src/gui/mainMenu/AlphaDisclaimer.tw
	$(TWEEGO) --module=bin/fc.js --head devTools/head.html src/ > $@
	rm -f bin/fc.js

src/gui/mainMenu/AlphaDisclaimer.tw:
	sed -Ei "s/build .releaseID/\0 commit $(COMMIT)/" $@

bin/:
	mkdir -p $@

sanity:
	./sanityCheck.sh

.PHONY: all sanity git
