Common problems:

How do I start the game?
-Run the compile file, go to folder "bin", click the "FC_Pregmod" and play. (Recommendation: Drag it into incognito mode)

I get an error on gamestart reading "Apologies! A fatal error has occurred. Aborting. Error: Unexpected token @ in JSON at position 0. Stack Trace: SyntaxError: Unexpected token @ in JSON at position 0 at JSON.parse (<anonymous>) at JSON.value" or some variant
-clear cookies

Everything is broken!
-Do not copy over your existing download as it may leave old files behind, replace it entirely

I can't save more than once or twice.
-Known issue caused by sugarcube level changes. Save to file doesn't have this problem and will likely avoid the first problem as well.
-It is possible to increase the memory utilized by your browser to delay this

I wish to report a sanityCheck issue.
-Great, however a large majority of the results are false positives coming from those specific sections being split over several lines in the name of readability and git grep's intentionally (http://git.661346.n2.nabble.com/bug-git-grep-P-and-multiline-mode-td7613900.html ) lacking support for multiline. An Attempt to add -Pzl (https://gitgud.io/pregmodfan/fc-pregmod/merge_requests/2108 ) created a sub condition black hole. What follows are examples of common false positives that can safely be ignored;

	[MissingClosingAngleBracket]src/art/vector/Generate_Stylesheet.tw:11:<<print "<style>."+_art_display_class+" {
		<<print "<style>."+_art_display_class+" {
	position: absolute;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
	left: 0;
	right: 0;
	}

How to mod (basic doc):

1. All sources now in the src subdir, in separate files. 1 passage = 1 file.

2. Special files and dir's:
	- src/config		- configuration of the story is here.
	- src/config/start.tw	- contains list of .tw passage files, regenerated automatic, by building scripts. Do not change by hands. (original passage Start from pregmod renamed and moved to src/events/intro/introSummary.tw)
	- src/js/storyJS.tw		- special passage with [script] tag - contain all native JavaScript from pregmod.
	- devTools/tweeGo/targets/sugarcube-2/userlib.js - on original FC JS moved here (I deleted it after moving JS to storyJS.tw). Compare to storyJS.tw but do not copy file here. May conflict with src/js/storyJS.tw if copied.
	- src/pregmod		- I put all pregmod-only passages here.
	- .gitignore		- special file for git - to ignore some files. For example - compilation results.

3. Compilation:

	Windows:
	Run compile.bat - result will be file bin/FC_pregmod.html
	Second run of compile.but will overwrite bin/FC_pregmod.html without prompt.

	Linux:
	Ensure executable permission on file "devTools/tweeGo/tweego" (not tweego.exe!)
	Ensure executable permission on file "compile.sh"
	In the root dir of sources (where you see src, devTools, bin...) run command "./compile.sh" from console
	Alternatively, if you have make installed, run "make all" in the root directory

	Mac:
	Not supported directly (I don't have access to Mac for testing).
	But you can use linux compilation script if you download tweego for mac from here: https://bitbucket.org/tmedwards/tweego/downloads/ and replace linux executable with mac executable in ./devTools/tweeGo/ folder. This is not tested though, so be warned.

4. Simple comparing and merging with original FC:

	Use meld tool. Place folder FreeCities (original FC sources tree) near FreeCitiesPregmod (this sources tree) and use command:
	meld FreeCities FreeCitiesPregmod
	or just select these folders in meld's GUI.

5. All modders will be very grateful if anyone who makes some changes to game with .html file also post their resulting src folder tree.

6. For contributors to pregmod: if you don't use git, then you need to post your version of src folder tree, not just produced FC_pregmod.html file!!! This html file can't be reverted to proper sources, and useless as contribution!

7. Git workflow:
	- Master branch is pregmod-master. Only Pregmodder can add something to it directly. Always contain his last public changes.
	- pregmod-dev - branch with experimental code mainly by pregmodfan.
	- Any contributions will be placed in separate branches like pregmod-mod-<something> (if it's ready to merge with master complete feature/mod) or pregmod-contrib-<something> if it's partial work until contributions is reviewed.

	Typical cycle with git:
	1. Make account on gitgud if you don't have usable one.
	2. Fork main repository through gitgud interface. (Or pull changes from main repo if you already have fork.)
	3. Clone your fork to local machine with git client (Or pull changes if already cloned.)
	4. Make you changes as you like, commit, and push result into your forked repository (with git client).
	5. (optional, but recommended) Run sanityCheck before final push to catch any errors you missed. (You can ignore errors unrelated to files you changed.)
	6. Make merge request through gitgud interface.
