declare global {
	namespace SugarCubeLib {

		type navigationOverride = (passageName: string) => any;
		type saveObjectHander = (save: SaveObject) => void;

		type DisplayTaskFunction = (taskName: string) => void;
		type RenderTaskFunction = (content: HTMLElement, taskName: string) => void;

		export interface StringTMap<T> { [key: string]: T; }

		interface Config {
			audio: {
				pauseOnFadeToZero: boolean;
				preloadMetadata: boolean;
			};
			history: {
				controls: boolean;
				maxStates: number;
			};
			macros: {
				ifAssignmentError: boolean;
				maxLoopIterations: number;
			};
			navigation: {
				override: navigationOverride;
			};
			passages: {
				descriptions: any;
				/** Determines whether passage titles are combined with the story title, within the browser's/tab's titlebar, when
				 * passages are displayed.
				 * @default false
				 */
				displayTitles: boolean;
				/**
				 * Determines whether rendering passages have their leading/trailing newlines removed and all remaining sequences of
				 * newlines replaced with single spaces before they're rendered. Equivalent to including the nobr special tag on
				 * every passage.
				 * @default false
				 */
				nobr: boolean;

				/**
				 * Sets the title of the initial passage, the very first passage which will be displayed.
				 *
				 * @default Twine 2: none; Twine 1/Twee: "Start"
				 */
				start: string;

				/**
				 * Determines whether outgoing passage transitions are enabled. Valid values are the name of the property being
				 * animated, which causes the outgoing passage elements to be removed once that transition animation is complete,
				 * or an integer delay (in milliseconds), which causes the outgoing passage elements to be removed once the delay
				 * has expired.
				 */
				transitionOut: string | number;
			};

			saves: {
				/**
				 * Determines whether the autosave, if it exists, is automatically loaded upon story startup. Valid values are
				 * boolean true, which simply causes the autosave to be loaded, the string "prompt", which prompts the player via a
				 * dialog to load the autosave, or a function, which causes the autosave to be loaded if its return value is truthy.

				 NOTE: If the autosave cannot be loaded, for any reason, then the start passage is loaded instead.
				 * @since 2.0.0
				 */
				autoload: boolean | string | Function;

				/**
				 * Determines whether the autosave is created/updated when passages are displayed. Valid values are boolean true,
				 * which causes the autosave to be updated with every passage, a string, which causes the autosave to be updated for
				 * each passage with a matching tag, or an array of strings, which causes the autosave to be updated for each
				 * passage with at least one matching tag.
				 *
				 * NOTE: When setting the value to boolean true, you will likely also need to use the Config.saves.isAllowed
				 * property to disallow saving on the start passage. Or, if you use the start passage as real part of your story and
				 * allow the player to reenter it, rather than just as the initial landing/cover page, then you might wish to only
				 * disallow saving on the start passage the very first time it's displayed (at story startup).
				 * @since 2.0.0
				 */
				autosave: boolean | string | string[];

				/**
				 * Sets the story ID associated with saves.
				 * @default slugified story title
				 * @since 2.0.0
				 * @example
				 *  Config.saves.id = "a-big-huge-story-part-1";
				 */
				id: string;

				/**
				 * Determines whether saving is allowed within the current context. The callback is invoked each time a save is
				 * requested. If its return value is false, the save is disallowed. If its return value is truthy, the save is
				 * allowed to continue unperturbed.
				 * @default undefined
				 * @since 2.0.0
				 * @example
				 * Config.saves.isAllowed = function () {
				 * // code
				 * };
				 */
				isAllowed: Function;

				/**
				 * Performs any required pre-processing before the save data is loaded. The callback is passed one parameter, the
				 * save object to be processed. If it encounters an unrecoverable problem during its processing, it may throw an
				 * exception containing an error message; the message will be displayed to the player and loading of the save will
				 * be terminated.
				 * @default undefined
				 * @since 2.0.0
				 * @example
				 * Config.saves.onLoad = function (save) {
				 * // code
				 * };
				 */
				onLoad: saveObjectHander;

				/**
				 * Performs any required post-processing before the save data is saved. The callback is passed one parameter, the
				 * save object to be processed.
				 *
				 * NOTE: See the save objects section of the Save API for information on the format of a save.
				 * @default undefined
				 * @since 2.0.0
				 * @example
				 * Config.saves.onSave = function (save) {
				 * // code
				 * };
				 */
				onSave: saveObjectHander;

				/**
				 * Sets the maximum number of available save slots.
				 * @default 8
				 * @since 2.0.0
				 * @example
				 * Config.saves.slots = 4;
				 */
				slots: number;

				/**
				 * Sets the version property of saves.
				 *
				 * NOTE: This completely optional property is only for developer use, it is ignored by SugarCube.
				 *
				 * @since 2.0.0
				 * @example
				 * // As an integer
				 * Config.saves.version = 3;
				 * @example
				 * // As a string
				 * Config.saves.version = "v3";
				 */
				version: any;
			};

			ui: {
				/**
				 * Determines whether the UI bar (sidebar) starts in the stowed (shut) state initially. Valid values are boolean
				 * true/false, which causes the UI bar to always/never start in the stowed state, or an integer, which causes the UI
				 * bar to start in the stowed state if the viewport width is less-than-or-equal-to the specified number of pixels.
				 *
				 * @since 2.11.0
				 *
				 * @example
				 * // As a boolean; always start stowed
				 * Config.ui.stowBarInitially = true;
				 *
				 * @example
				 * // As a boolean; never start stowed
				 * Config.ui.stowBarInitially = false;
				 *
				 * @example
				 * // As an integer; start stowed if the viewport is 800px or less
				 * Config.ui.stowBarInitially = 800;
				 */
				stowBarInitially: boolean | number;

				/**
				 * Determines whether certain elements within the UI bar are updated when passages are displayed. The affected
				 * elements are the story: banner, subtitle, author, caption, and menu.
				 *
				 * NOTE: SugarCube uses the story's title as the basis for the key used to store and load data used when playing the
				 * story and for saves. Because of this, the story title is not included in updates and it is strongly recommended
				 * that you do not add any kind of dynamic code to it.
				 *
				 * @default true
				 * @since 2.0.0
				 * @example
				 * // If you don't need those elements to update
				 * Config.ui.updateStoryElements = false;
				 */
				updateStoryElements: boolean;
			};

			/**
			 * Determines whether the link-visited class is added to internal passage links which go to previously visited
			 * passages — i.e. the passage already exists within the story history
			 * @default false
			 * NOTE You must provide your own styling for the link-visited class as none is provided by default.
			 * @since 2.0.0
			 * @example
			 * Config.addVisitedLinkClass = true;
			 * // An example style: (Twine 2: goes in Story Stylesheet; Twine 1/Twee: goes in a stylesheet-tagged passage)
			 * .link-visited {
			 *  	color: purple;
			 * }
			 */
			addVisitedLinkClass: boolean;

			/**
			 * Determines whether the output of the Wikifier is post-processed into more sane markup — i.e. where appropriate, it
			 * tries to transition the plethora of <br> elements into <p> elements.
			 * @default false
			 * @since 2.0.0
			 * @example
			 * Config.cleanupWikifierOutput = true;
			 */
			cleanupWikifierOutput: boolean;

			/**
			 * Indicates whether SugarCube is running in test mode, which enables debug views. See Test Mode for more information.
			 *
			 * NOTE: This property is automatically set based on whether you're using a testing mode in a Twine compiler — i.e. Test
			 * mode in Twine 2, Test Play From Here in Twine 1, or the test mode options (-t, --test) in Tweego. You may, however,
			 * forcibly enable it if you need to for some reason — e.g. if you're using another compiler, which doesn't offer a way
			 * to enable test mode.
			 *
			 * @default false
			 * @since 2.2.0
			 * @example
			 * // Forcibly enable test mode
			 *  Config.debug = true;
			 *
			 * @example
			 * // Check if test mode is enabled in JavaScript
			 * if (Config.debug) {
			 *	// do something debug related
			 * }
			 *
			 * @example
			 * // Check if test mode is enabled via the <<if>> macro
			 * <<if Config.debug>>
			 *	 // do something debug related
			 * <</if>>
			 */
			debug: boolean;

			/**
			 * Sets the integer delay (in milliseconds) before the loading screen is dismissed, once the document has signaled its
			 * readiness. Not generally necessary, however, some browsers render slower than others and may need a little extra time
			 * to get a media-heavy page done. This allows you to fine tune for those cases.
			 *
			 * @default 0
			 * @since 2.0.0
			 *
			 * @example
			 * // Delay the dismissal of the loading screen by 2000ms (2s)
			 * Config.loadDelay = 2000;
			 */
			loadDelay: number;
		}

		interface Dialog {
			/**
			 * Adds WAI-ARIA-compatible mouse/keyboard event handlers to the target element(s) which open the dialog when
			 * activated.
			 * @param targets The DOM element(s) to attach the handler to—may be either an HTMLElement object, a jQuery object,
			 * or a jQuery-style selector set.
			 * @param options he options object; the currently understood properties are:
			 *	top: Top y-coordinate of the dialog (default: 50; in pixels, but without the unit).
			 *	opacity: Opacity of the overlay (default: 0.8).
			 * @param tartFn The function to execute at the start of Dialog.addClickHandler(). This is commonly used to setup
			 * the dialog.
			 * @param doneFn The function to execute at the end of Dialog.addClickHandler().
			 * @param closeFn The function to execute whenever the associated dialog is closed.
			 * @since 2.0.0
			 * @example
			 * // Commonly used something like the following.
			 * Dialog.addClickHandler("#some-element", null, function () {
			 *	 Dialog.setup("My Dialog Title", "my-dialog-class");
			 *	 Dialog.wiki(Story.get("MyDialogContents").processText());
			 * });
			 */
			addClickHandler(targets: HTMLElement | string, options?: object,
				tartFn?: () => void, doneFn?: () => void, closeFn?: () => void): void;

			/**
			 * Appends the given content to the dialog's content area. Returns a reference to the Dialog object for chaining.
			 *
			 * NOTE: If your content contains any SugarCube markup, you'll need to use the Dialog.wiki() method instead.
			 * @param content The content to append. As this method is essentially a shortcut for jQuery(Dialog.body()).append
			 * (…), see jQuery's append() method for the range of valid content types.
			 * @since 2.9.0
			 * @example
			 * Dialog.append("Cry 'Havoc!', and let slip the <em>ponies</em> of <strong>friendship</strong>.");
			 * Dialog.append( <some DOM nodes> );
			 */
			append(content: string | string[]): Dialog;

			/**
			 * Returns a reference to the dialog's content area
			 * @since 2.0.0
			 * @example
			 * jQuery(Dialog.body()).append("Cry 'Havoc!', and let slip the <em>ponies</em> of <strong>friendship</strong>.");
			 * jQuery(Dialog.body()).wiki("Cry 'Havoc!', and let slip the //ponies// of ''friendship''.");
			 */
			body(): HTMLElement;

			/**
			 * Closes the dialog. Returns a reference to the Dialog object for chaining.
			 * @since 2.0.0
			 */
			close(): Dialog;

			/**
			 * Returns whether the dialog is currently open.
			 * @param classNames the space-separated-list of classes to check for when determining the state of the dialog.
			 * Each of built-in dialogs contains a name-themed class which can be tested for in this manner—e.g. the Saves
			 * dialog contains the class saves.
			 * @since 2.0.0
			 * @example
			 * if (Dialog.isOpen()) {
			 *		// code to execute if the dialog is open...
			 * }
			 * @example
			 * if (Dialog.isOpen("saves")) {
			 *		// code to execute if the Saves dialog is open
			 * }
			 */
			isOpen(classNames?: string): boolean;

			/**
			 * Opens the dialog. Returns a reference to the Dialog object for chaining.
			 *
			 * NOTE: Call this only after populating the dialog with content.
			 * @param options The options object. @see addClickHandler() for more information.
			 * @param closeFn The function to execute whenever the dialog is closed.
			 * @since 2.0.0
			 */
			open(options?: object, closeFn?: () => void): Dialog;

			/**
			 * Prepares the dialog for use and returns a reference to its content area.
			 * @param title The title of the dialog.
			 * @param classNames The space-separated-list of classes to add to the dialog.
			 * @since 2.0.0
			 * @example
			 * // Basic example.
			 * Dialog.setup();
			 * Dialog.wiki("Blah //blah// ''blah''.");
			 * Dialog.open();
			 *
			 * @example
			 * // Adding a title to the dialog.
			 * Dialog.setup("Character Sheet");
			 * Dialog.wiki(Story.get("PC Sheet").processText());
			 * Dialog.open();
			 *
			 * @example
			 * // Adding a title and class to the dialog.
			 * Dialog.setup("Character Sheet", "charsheet");
			 * Dialog.wiki(Story.get("PC Sheet").processText());
			 * Dialog.open();
			 */
			setup(title?: string, classNames?: string): HTMLElement;

			/**
			 * Renders the given markup and appends it to the dialog's content area. Returns a reference to the Dialog object
			 * for chaining.
			 *
			 * NOTE: If your content consists of DOM nodes, you'll need to use the @see Dialog.append() method instead.
			 * @param wikiMarkup The markup to render.
			 * @since 2.9.0
			 * @example
			 * Dialog.wiki("Cry 'Havoc!', and let slip the //ponies// of ''friendship''.");
			 */
			wiki(wikiMarkup: string): Dialog;
		}

		interface Engine {
			/**
			 * Returns a timestamp representing the last time Engine.play() was called.
			 * @since 2.0.0
			 */
			lastPlay: number;

			/**
			 * Returns the current state of the engine ("idle", "playing", "rendering").
			 * States:
			 *	"idle": The engine is idle, awaiting the triggering of passage navigation—the default state.
			 *	"playing": Passage navigation has been triggered and a turn is being processed.
			 *	"rendering": The incoming passage is being rendered and added to the page—takes place during turn processing,
			 *	so implies "playing".
			 * @since 2.7.0
			 */
			state: string;

			/**
			 * Moves backward one moment within the full history (past + future), if possible, activating and showing the
			 * moment moved to. Returns whether the history navigation was successful (should only fail if already at the
			 * beginning of the full history).
			 * @since 2.0.0
			 */
			backward(): boolean;

			/**
			 * Moves forward one moment within the full history (past + future), if possible, activating and showing the moment
			 * moved to. Returns whether the history navigation was successful (should only fail if already at the end of the
			 * full history).
			 * @since 2.0.0
			 */
			forward(): boolean;

			/**
			 * Activates the moment at the given offset from the active (present) moment within the full state history and show
			 * it. Returns whether the history navigation was successful (should only fail if the offset from the active
			 * (present) moment is not within the bounds of the full history).
			 * @param offset The offset from the active (present) moment of the moment to go to.
			 * @since 2.0.0
			 */
			go(offset: number): boolean;

			/**
			 * Activates the moment at the given index within the full state history and show it. Returns whether the history
			 * navigation was successful (should only fail if the index is not within the bounds of the full history).
			 * @param index The index of the moment to go to.
			 * @since 2.0.0
			 * @example
			 * Engine.goTo(0) // Goes to the first moment
			 * Engine.goTo(9) // Goes to the tenth moment
			 */
			goTo(index: number): boolean;

			/**
			 * Returns whether the engine is idle.
			 * @since 2.16.0
			 */
			isIdle(): boolean;

			/**
			 * Returns whether the engine is processing a turn — i.e. passage navigation has been triggered.
			 * @since 2.16.0
			 */
			isPlaying(): boolean;

			/**
			 * Returns whether the engine is rendering the incoming passage.
			 * @since 2.16.0
			 */
			isRendering(): boolean;

			/**
			 * Renders and displays the passage referenced by the given title, optionally without adding a new moment to the
			 * history.
			 * @param passageTitle The title of the passage to play.
			 * @param noHistory Disables the update of the history (i.e. no moment is added to the history).
			 * @since 2.0.0
			 */
			play(passageTitle: string, noHistory?: boolean): HTMLElement;

			/**
			 * Restarts the story.
			 *
			 * WARNING: The player will not be prompted and all unsaved state will be lost.
			 * NOTE: In general, you should not call this method directly. Instead, call the UI.restart() static method, which
			 * prompts the player with an OK/Cancel dialog before itself calling Engine.restart(), if they accept.
			 * @since 2.0.0
			 */
			restart(): void;

			/**
			 * Renders and displays the active (present) moment's associated passage without adding a new moment to the history.
			 * @since 2.0.0
			 */
			show(): HTMLElement;
		}

		interface LoadScreen {
			/**
			 * Acquires a loading screen lock and returns its ID. Displays the loading screen, if necessary.
			 * @since 2.15.0
			 */
			lock(): number;

			/**
			 * Releases the loading screen lock with the given ID. Hides the loading screen, if no other locks exist.
			 * @param lockId The loading screen lock ID.
			 * @since 2.15.0
			 * @example
			 * var lockId = LoadScreen.lock();
			 * // Do something whose timing is unpredictable which should be hidden by the loading screen
			 * LoadScreen.unlock(lockId);
			 */
			unlock(lockId: number): void;
		}

		interface MacroTags {
			/**
			 * Return the named macro tag's parents array (includes the names of all macros who have registered the tag as a
			 * child), or null on failure.
			 * @param name Name of the macro tag whose parents array should be returned.
			 * @since 2.0.0
			 * @example
			 * Macro.tags.get("else") // For the standard library, returns: ["if"]
			 */
			get(name: string): string[];

			/**
			 * Returns whether the named macro tag exists.
			 * @param name Name of the macro tag to search for.
			 * @since 2.0.0
			 */
			has(name: string): boolean;
		}

		interface MacroArgsArray extends Array<String> {
			/**
			 * The current tag's argument string after converting all TwineScript syntax elements into their
			 * native JavaScript counterparts. Equivalent in function to <MacroContext>.args.full.
			 */
			full: string;
			/**
			 * The current tag's unprocessed argument string. Equivalent in function to <MacroContext>.args.raw.
			 */
			raw: string;
		}

		interface MacroContexObject {
			/**
			 * Name of the current tag.
			 */
			name: string;
			/**
			 * The current tag's argument string parsed into an array of discrete arguments.
			 * Equivalent in function to <MacroContext>.args.
			 */
			args: MacroArgsArray;

			/**
			 * The current tag's contents—i.e. the text between the current tag and the next.
			 */
			contents: string;
		}

		interface MacroContex {
			/**
			 * The argument string parsed into an array of discrete arguments.
			 * @since 2.0.0
			 */
			args: MacroArgsArray;

			/**
			 * The name of the macro.
			 * @since 2.0.0
			 */
			name: string;

			/**
			 * The current output element.
			 * @since 2.0.0
			 */
			output: HTMLElement;

			/**
			 * The (execution) context object of the macro's parent, or null if the macro has no parent.
			 * @since 2.0.0
			 */
			parent: object;

			/**
			 * The text of a container macro parsed into discrete payload objects by tag.
			 * @since 2.0.0
			 */
			payload: MacroContexObject[];

			/**
			 * The macro's definition — created via @see Macro.add()
			 * @since 2.0.0
			 */
			self: object;

			/**
			 * Returns whether any of the macro's ancestors passed the test implemented by the given
			 * filter function.
			 * @param filter he function used to test each ancestor execution context object, which
			 * is passed in as its sole parameter.
			 * @since 2.0.0
			 */
			contextHas(filter: (MacroContexObject) => boolean): boolean;

			/**
			 * Returns the first of the macro's ancestors which passed the test implemented by the given
			 * filter function or null, if no members pass.
			 * @param filter The function used to test each ancestor execution context object, which is
			 * passed in as its sole parameter.
			 * @since 2.0.0
			 */
			contextSelect(filter: (MacroContexObject) => boolean): object;

			/**
			 * Returns a new array containing all of the macro's ancestors which passed the test implemented
			 * by the given filter function or an empty array, if no members pass.
			 * @since 2.0.0
			 * @param filter
			 */
			contextSelectAll(filter: (MacroContexObject) => boolean): object[];

			/**
			 * Renders the message prefixed with the name of the macro and returns false.
			 * @param message The error message to output.
			 * @since 2.0.0
			 */
			error(message: string): false;
		}

		interface Macro {
			/**
			 * Add new macro(s).
			 * @param name Name, or array of names, of the macro(s) to add.
			 * @param definition Definition of the macro(s) or the name of an existing macro whose definition to copy.
			 * Definition object:
			 * A macro definition object should have some of the following properties (only handler is absolutely required):
			 * skipArgs: (optional, boolean) Disables parsing argument strings into discrete arguments. Used by macros which
			 * only use the raw/full argument strings.
			 * tags: (optional, null | string array) Signifies that the macro is a container macro—i.e. not self-closing. An
			 * array of the names of the child tags, or null if there are no child tags.
			 * handler: (function) The macro's main function. It will be called without arguments, but with its this set to a
			 * macro context object.
			 * @param deep Enables deep cloning of the definition. Used to give macros separate instances of the same
			 * definition.
			 * @since 2.0.0
			 * @example
			 * // Example of a very simple/naive <<if>>/<<elseif>>/<<else>> macro implementation.
			 * Macro.add('if', {
			 *	skipArgs: true,
			 *	tags: ['elseif', 'else'],
			 *	handler: function () {
			 *		try {
			 *			for (var i = 0, len = this.payload.length; i < len; ++i) {
			 *				if (
			 *					this.payload[i].name === 'else' ||
			 *					!!Scripting.evalJavaScript(this.payload[i].args.full)
			 *				) {
			 *					jQuery(this.output).wiki(this.payload[i].contents);
			 *					break;
			 *				}
			 *			}
			 *		}
			 *		catch (ex) {
			 *			return this.error('bad conditional expression: ' + ex.message);
			 *		}
			 *	}
			 * });
			 */
			add(name: string | string[],
				definition: { handler: (this: MacroContex) => void, tags?: string[], skipArgs?: boolean },
				deep?: boolean): void;

			/**
			 * Remove existing macro(s).
			 * @param name Name, or array of names, of the macro(s) to remove.
			 * @since 2.0.0
			 */
			delete(name: string | string[]): void;

			/**
			 * Return the named macro definition, or null on failure.
			 * @param name Name of the macro whose definition should be returned.
			 * @since 2.0.0
			 */
			get(name: string): object;

			/**
			 * Returns whether the named macro exists.
			 * @param name Name of the macro to search for.
			 * @since 2.0.0
			 */
			has(name: string): boolean;

			/**
			 * @since 2.0.0
			 */
			tags: MacroTags;
		}

		interface Passage {
			/**
			 * The DOM ID of the passage (created from the slugified passage title).
			 * @since 2.0.0
			 */
			domId: string;

			/**
			 * The tags of the passage.
			 * @since 2.0.0
			 */
			tags: string[];

			/**
			 * The raw text of the passage.
			 * @since 2.0.0
			 */
			text: string;

			/**
			 * The title of the passage.
			 * @since 2.0.0
			 */
			title: string;

			/**
			 * Returns the description of the passage (created from either an excerpt of the passage or the
			 * Config.passages.descriptions object).
			 * @since 2.0.0
			 */
			description(): string;

			/**
			 * Returns the text of the Passage object (similar to <Passage>.text) after applying nobr tag and image passage
			 * processing to it.
			 * @since 2.0.0
			 */
			processText(): string;
		}

		interface SavedMoment {
			/** The title of the associated passage. */
			title: string;
			/** The current variable store object, which contains sigil - less name ⇒ value pairs(e.g.$foo exists as foo). */
			variables: any;
			/** The current pull count of SugarCube's seedable PRNG, exists only if enabled. */
			pull?: number;
		}

		interface SavedState {
			/** The array of moment objects. */
			history: SavedMoment[];
			/** The index of the active moment. */
			index: number;
			/** The array of expired moment passage titles, exists only if any moments have expired. */
			expired?: string[];
			/** The seed of SugarCube's seedable PRNG, exists only if enabled. */
			seed?: string;
		}

		interface SaveObject {
			/** The story's save ID.*/
			id: string;
			/** The marshaled story history(see below for details). */
			state: SavedState;
			/** The title of the save. */
			title: string;
			/** The date when the save was created(in milliseconds elapsed since epoch). */
			date: number;
			/** Save metadata(end - user specified; must be JSON - serializable). */
			metadata?: any;
			/** Save version(end - user specified via Config.saves.version). */
			version?: any;
		}
		interface Save {
			/**
			 * Deletes all slot saves and the autosave, if it's enabled.
			 * @since 2.0.0
			 */
			clear(): void;

			/**
			 * Returns the saves object.
			 * @since 2.0.0
			 */
			get(): object;

			/**
			 * Returns whether both the slot saves and autosave are available and ready.
			 * @since 2.0.0
			 */
			ok(): boolean;

			slots: {
				/**
				 * Returns the total number of available slots.
				 * @since 2.0.0
				 */
				length: number;

				/**
				 * Returns the total number of filled slots.
				 * @since 2.0.0
				 */
				count(): number;

				/**
				 * Deletes a save from the given slot.
				 * @param slot Save slot index (0-based).
				 * @since 2.0.0
				 */
				delete(slot: number): void;

				/**
				 * Returns a save object from the given slot or null, if there was no save in the given slot.
				 * @param slot Save slot index (0-based).
				 * @since 2.0.0
				 */
				get(slot: number): SaveObject;

				/**
				 * Returns whether the given slot is filled.
				 * @param slot Save slot index (0-based).
				 * @since 2.0.0
				 */
				has(slot: number): boolean;

				/**
				 * Returns whether there are any filled slots.
				 * @since 2.0.0
				 */
				isEmpty(): boolean;

				/**
				 * Loads a save from the given slot.
				 * @param slot
				 */
				load(slot: number): void;

				/**
				 * Returns whether the slot saves are available and ready.
				 * @since 2.0.0
				 */
				ok(): boolean;

				/**
				 * Saves to the given slot.
				 * @param slot Save slot index (0-based).
				 * @param title The title of the save. If omitted or null, defaults to the passage's description.
				 * @param metadata The data to be stored in the save object's metadata property. Must be JSON-serializable.
				 * @since 2.0.0
				 */
				save(slot: number, title?: string, metadata?: any): void;
			}

			autosave: {
				/**
				 * Deletes the autosave.
				 * @since 2.0.0
				 */
				delete(): void;

				/**
				 * Returns the save object from the autosave or null, if there was no autosave.
				 * @since 2.0.0
				 */
				get(): SaveObject;

				/**
				 * Returns whether the autosave is filled.
				 * @since 2.0.0
				 */
				has(): boolean;

				/**
				 * Loads the autosave.
				 * @since 2.0.0
				 */
				load(): void;

				/**
				 * Returns whether the autosave is available and ready.
				 * @since 2.0.0
				 */
				ok(): boolean;

				/**
				 * Saves to the autosave.
				 * @param title The title of the save. If omitted or null, defaults to the passage's description.
				 * @param metadata The data to be stored in the save object's metadata property. Must be JSON-serializable.
				 * @since 2.0.0
				 */
				save(title?: string, metadata?: any): void;
			}

			/**
			 * Saves to disk.
			 * @param filename The base filename of the save, which gets slugified to remove most symbols. Appended to this is a datestamp
			 * (format: YYYMMDD-hhmmss) and the file extension .save. (e.g. "The Scooby Chronicles" would result in the full filename:
			 * the-scooby-chronicles-{datestamp}.save). If omitted or null, defaults to the story's title.
			 * @param metadata The data to be stored in the save object's metadata property. Must be JSON-serializable.
			 * @since 2.8.0
			 */
			export(filename?: string, metadata?: any): void;

			/**
			 * Loads a save from disk.
			 *
			 * NOTE: You do not call this manually, it must be called by the change event handler of an <input type="file"> element.
			 * @param event The event object which was passed to the change event handler of the associated <input type="file"> element.
			 * @since 2.0.0
			 * @example
			 * // Add file input
			 * var input  = document.createElement('input');
			 * input.type = 'file';
			 * input.id   = 'saves-import-file';
			 * input.name = 'saves-import-file';
			 * // Set up Save.import() as the event handler for when a file has been chosen
			 * jQuery(input).on('change', Save.import);
			 */
			import(event: Event): void;

			/**
			 * Returns a save as a serialized string, or null if saving is not allowed within the current context.
			 * @param metadata The data to be stored as metadata. Must be JSON-serializable.
			 * @since 2.21.0
			 */
			serialize(metadata?: any): string;

			/**
			 * Deserializes the given save string, created via Save.serialize(), and loads the save. Returns the bundled metadata, if any,
			 * or null if the given save could not be deserialized and loaded.
			 * @param saveStr The serialized save string.
			 * @since 2.21.0
			 */
			deserialize(saveStr: string): any;
		}

		interface Settings {
			/**
			 * Adds a header to the Settings dialog.
			 * @param name Name of the header.
			 * @param desc Description explaining the header in greater detail.
			 * @since 2.7.1
			 */
			addHeader(name: string, desc?: string): void;

			/**
			 * Adds the named property to the settings object and a toggle control for it to the Settings dialog.
			 * @param name Name of the settings property to add, which the control will manage.
			 * @param definition Definition of the control.
			 * @since 2.26.0
			 */
			addToggle(name: string, definition: {
				label: string,
				desc?: string,
				default?: boolean,
				onInit?: () => void,
				onChange?: () => void
			}): void;

			/**
			 * Adds the named property to the settings object and a list control for it to the Settings dialog.
			 * @param name Name of the settings property to add, which the control will manage.
			 * @param definition Definition of the control.
			 * @since 2.26.0
			 */
			addList(name: string, definition: {
				label: string,
				list: [],
				desc?: string,
				default?: any,
				onInit?: () => void,
				onChange?: () => void
			}): void;

			/**
			 * Adds the named property to the settings object and a range control for it to the Settings dialog.
			 * @param name Name of the settings property to add, which the control will manage.
			 * @param definition Definition of the control.
			 * @since 2.0.0
			 */
			addRange(name: string, definition: {
				/** Label to use for the control. */
				label: string,
				/** The minimum value. */
				min: number,
				/** The maximum value. */
				max: number,
				/** Limits the increments to which the value may be set.It must be evenly divisible into the full range
				 * — i.e.max - min. */
				step: number,
				/** Description explaining the control in greater detail. */
				desc?: string,
				/**  The default value for the setting and default state of the control.Leaving it undefined means to use
				 * the value of max as the default. */
				default?: number,
				/** The function to call during initialization. */
				onInit?: () => void,
				/** The function to call when the control's state is changed. */
				onChange?: () => void
			}): void;

			/**
			 * Loads the settings from storage.
			 *
			 * NOTE: The API automatically calls this method at startup, so you should never need to call this method manually.
			 * @since 2.0.0
			 */
			load(): void;

			/**
			 * Resets the setting with the given name to its default value. If no name is given, resets all settings.
			 * @param name Name of the settings object property to reset.
			 * @since 2.0.0
			 */
			reset(name?: string): void;

			/**
			 * Saves the settings to storage.
			 *
			 * NOTE: The controls of the Settings dialog automatically call this method when settings are changed,
			 * so you should normally never need to call this method manually. Only when manually modifying the values
			 * of settings object properties, outside of the controls, would you need to call this method.
			 * @since 2.0.0
			 */
			save();
		}

		interface Story {
			/**
			 * The DOM ID of the story (created from the slugified story title).
			 * @since 2.0.0
			 */
			domId: string;

			/**
			 * The title of the story.
			 * @since 2.0.0
			 */
			title: string;

			/**
			 * Returns the Passage object referenced by the given title, or an empty Passage object on failure.
			 * @param passageTitle The title of the Passage object to return.
			 * @since 2.0.0
			 */
			get(passageTitle: string): Passage;

			/**
			 * Returns whether a Passage object referenced by the given title exists.
			 * @param passageTitle The title of the Passage object whose existence will be verified.
			 * @since 2.0.0
			 */
			has(passageTitle): boolean;

			/**
			 * Returns an array of Passage objects each of which must contain a property matching the given name,
			 * whose value matches the given needle, or an empty array, if no matches are made.
			 * @param propertyName The name of property whose value will be compared to the search value.
			 * @param searchValue he value to search for within the matched property. The type of the property determines
			 * how the search occurs; direct comparison for non-arrays, while arrays are iterated over. If the property
			 * value, for non-arrays, or any of the property members' values, for arrays, match, then the Passage object
			 * is added to the results array.
			 * @param sortProperty The property whose value will be used to lexicographically sort the returned array.
			 * If not given, the Passage object's title property is used.
			 * @since 2.0.0
			 * @example
			 * // Returns all 'forest'-tagged Passage objects, sorted by their titles
			 * Story.lookup("tags", "forest");
			 */
			lookup(propertyName: string, searchValue: string | number, sortProperty?: string): Passage[];

			/**
			 * Returns an array of Passage objects which passed the test implemented by the given filter function or
			 * an empty array, if no objects pass.
			 * @param filter The function used to test each Passage object, which is passed in as its sole parameter.
			 * If the function returns true, then the Passage object is added to the results array.
			 * @param sortProperty The property whose value will be used to lexicographically sort the returned array.
			 * If not given, the Passage object's title property is used.
			 * @since 2.11.0
			 */
			lookupWith(filter: (p: Passage) => boolean, sortProperty?: string): Passage[];
		}

		interface UI {
			/**
			 * Opens the built-in alert dialog, displaying the given message to the player.
			 * @param message The message to display to the player.
			 * @param options The options object. @see Dialog.addClickHandler() for more information.
			 * @param closeFn The function to execute whenever the dialog is closed.
			 * @since 2.0.0
			 */
			alert(message: string, options?: object, closeFn?: () => void): void;

			/**
			 * Opens the built-in jump to dialog, which is populated via the bookmark tag.
			 * @param options The options object. @see Dialog.addClickHandler() for more information.
			 * @param closeFn The function to execute whenever the dialog is closed.
			 * @since 2.0.0
			 */
			jumpto(options: object, closeFn?: () => void): void;

			/**
			 * Opens the built-in restart dialog, prompting the player to restart the story.
			 * @param options The options object. @see Dialog.addClickHandler() for more information.
			 * @since 2.0.0
			 */
			restart(options?: any): void;

			/**
			 * Opens the built-in saves dialog.
			 * @param options The options object. See Dialog.addClickHandler() for more information.
			 * @param closeFn The function to execute whenever the dialog is closed.
			 * @since 2.0.0
			 */
			saves(options: object, closeFn?: () => void): void;

			/**
			 * Opens the built-in settings dialog, which is populated from the Setting API.
			 * @param options The options object. See Dialog.addClickHandler() for more information.
			 * @param closeFn The function to execute whenever the dialog is closed.
			 * @sine 2.0.0
			 *
			 */
			settings(options: object, closeFn?: () => void): void;

			/**
			 * Opens the built-in share dialog, which is populated from the StoryShare passage.
			 * @param options The options object. See Dialog.addClickHandler() for more information.
			 * @param closeFn The function to execute whenever the dialog is closed.
			 * @since 2.0.0
			 */
			share(options: object, closeFn?: () => void): void;
		}

		interface UIBar {
			/**
			 * Completely removes the UI bar and all of its associated styles and event handlers.
			 * @since 2.17.0
			 */
			destroy(): void;

			/**
			 * Stows the UI bar, so that it takes up less space.
			 * @since 2.17.0
			 */
			stow(): void;

			/**
			 * Unstows UI bar, so that it is fully accessible again.
			 * @since 2.17.0
			 */
			unstow(): void;
		}

		interface StoryMoment {
			title: string;
			variables: any;
		}

		interface State {
			/**
			 * Returns the active (present) moment.
			 * @since 2.0.0
			 */
			active: StoryMoment;
			/**
			 * Returns the bottommost (least recent) moment from the full in-play history (past + future).
			 * @since 2.0.0
			 */
			bottom: StoryMoment;
			/**
			 * Returns the current moment from the full in-play history (past + future), which is the pre-play version of the active
			 * moment.
			 *
			 * WARNING: State.current is not a synonym for State.active. You will, very likely, never need to use State.current
			 * directly within your code.
			 *
			 * @since 2.8.0
			 */
			current: StoryMoment;
			/**
			 * Returns the number of moments within the past in-play history (past only).
			 * @since 2.0.0
			 */
			length: number;
			/**
			 * Returns the title of the passage associated with the active (present) moment.
			 * @since 2.0.0
			 */
			passage: string;
			/**
			 * Returns the current temporary variables.
			 * @since 2.13.0
			 */
			temporary: any;
			/**
			 * Returns the number of moments within the full in-play history (past + future).
			 * @since 2.0.0
			 */
			size: number;
			/**
			 * Returns the topmost (most recent) moment from the full in-play history (past + future).
			 *
			 * WARNING: State.top is not a synonym for State.active. You will, very likely, never need to use State.top directly
			 * within your code.
			 * @since 2.0.0
			 */
			top: StoryMoment;
			/**
			 * Returns the total number of played moments within the extended past history (expired + past).
			 * @since 2.0.0
			 */
			turns: number;
			/**
			 * Returns the variables from the active (present) moment.
			 * @since 2.0.0
			 */
			variables: any;
			/**
			 * Returns the value of the story or temporary variable by the given name.
			 * @param varName The name of the story or temporary variable, including its sigil—e.g. $charName.
			 * @since 2.22.0
			 */
			getVar(varName: string): any;
			/**
			 * Returns whether any moments with the given title exist within the past in-play history (past only).
			 *
			 * NOTE: State.has() does not check expired moments. If you need to know if the player has ever been to a particular
			 * passage, then you must use the State.hasPlayed() method or the hasVisited() story function.
			 * @param passageTitle The title of the moment whose existence will be verified.
			 * @since 2.0.0
			 */
			has(passageTitle: string): boolean;
			/**
			 * Returns whether any moments with the given title exist within the extended past history (expired + past).
			 *
			 * NOTE: If you need to check for multiple passages, the hasVisited() story function will likely be more convenient to
			 * use.
			 * @param passageTitle The title of the moment whose existence will be verified.
			 * @since 2.0.0
			 */
			hasPlayed(passageTitle: string): boolean;
			/**
			 * Returns the moment, relative to the bottom of the past in-play history (past only), at the given index.
			 * @param index The index of the moment to return.
			 * @since 2.0.0
			 */
			index(index: number): StoryMoment;
			/**
			 * Initializes the seedable pseudo-random number generator (PRNG) and integrates it into the story state and saves.
			 * Once initialized, the State.random() method and story functions, random() and randomFloat(), return results from
			 * the seeded PRNG (by default, they return results from Math.random()).
			 *
			 * NOTE: State.initPRNG() must be called during story initialization, within either a script section (Twine 2: the
			 * Story JavaScript, Twine 1/Twee: a script-tagged passage) or the StoryInit special passage. Additionally, it is
			 * recommended that you do not specify any arguments to State.initPRNG() and allow it to automatically seed itself. If
			 * you should chose to use an explicit seed, however, it is strongly recommended that you also enable additional
			 * entropy, otherwise all playthroughs for all players will be exactly the same.
			 * @param seed The explicit seed used to initialize the pseudo-random number generator.
			 * @param useEntropy Enables the use of additional entropy to pad the specified explicit seed.
			 * @since 2.0.0
			 * @example
			 * State.initPRNG() // Automatically seed the PRNG (recommended)
			 * State.initPRNG("aVeryLongSeed") // Seed the PRNG with "aVeryLongSeed"
			 * State.initPRNG("aVeryLongSeed", true) // Seed the PRNG with "aVeryLongSeed" and pad it with extra entropy
			 */
			initPRNG(seed?: string, useEntropy?: boolean): void;
			/**
			 * Returns whether the full in-play history (past + future) is empty.
			 * @since 2.0.0
			 */
			isEmpty(): boolean;
			/**
			 * Returns the moment, relative to the top of the past in-play history (past only), at the, optional, offset.
			 * @param offset The offset, from the top of the past in-play history, of the moment to return. If not given, an offset
			 * of 0 is used.
			 */
			peek(offset?: number): StoryMoment;
			/**
			 * Returns a pseudo-random real number (floating-point) in the range 0 (inclusive) up to, but not including, 1
			 * (exclusive).
			 *
			 * NOTE: By default, it simply returns results from Math.random(), however, when the seedable PRNG has been enabled,
			 * via State.initPRNG(), it returns results from the seeded PRNG instead.
			 * @since 2.0.0
			 */
			random(): number;
			/**
			 * Sets the value of the story or temporary variable by the given name. Returns whether the operation was successful.
			 * @param varName The name of the story or temporary variable, including its sigil—e.g. $charName.
			 * @param value The value to assign.
			 * @since 2.22.0
			 */
			setVar(varName: string, value: any): boolean;
		}
		interface Wikifier {
			createExternalLink(destination: string, url: string, text: string): HTMLElement;
			createInternalLink(destination: string, passage: string, text: string, callback: () => void): HTMLElement;
			evalExpression(code: string, output: any): any;
			evalStatements(code: string, output: any): any;
			/**
			 * @see State.getVar
			 */
			getValue(varName: string): any;
			/**
			 * @see Story.has
			 * @param link link
			 */
			isExternalLink(link: string): boolean;
			parse(text: string): any;
			/**
			 * @see State.setVar
			 */
			setValue(varName: string, value: any): boolean;
			wikifyEval(text: string): string;
		}

		interface ISugarCube {
			Config: Config;
			Dialog: Dialog;
			Engine: Engine;
			Macro: Macro;
			Save: Save;
			State: State;
			Story: Story;
			UI: UI;
			/**
			 * Player settings object, set up by the author/developer. See Setting API for more information.
			 * @since 2.0.0
			 */
			settings: any;
			/**
			 * Object that authors/developers may use to set up various bits of static data.
			 *
			 * Generally, you would use this for data that does not change and should not be stored
			 * within story variables, which would make it part of the history.
			 * @since 2.0.0
			 * */
			setup: any;

			Wikifier: Wikifier;
		}
	}

	var SugarCube: SugarCubeLib.ISugarCube;

	const setup: any;
	/**
	 * A prototype-less generic object whose properties and values are defined by the Setting.addToggle(),
	 * Setting.addList(), and Setting.addRange() methods.
	 *
	 * Normally, the values of its properties are automatically managed by their associated Settings dialog
	 * control. If necessary, however, you may manually change their values—n.b. you'll need to call the
	 * Setting.save() after having done so.
	 * @since 2.0.0
	 */
	const settings: SugarCubeLib.Settings;
	const Config: SugarCubeLib.Config;
	const Engine: SugarCubeLib.Engine;
	const Macro: SugarCubeLib.Macro;
	let State: SugarCubeLib.State;
	let Story: SugarCubeLib.Story;
	let Wikifier: SugarCubeLib.Wikifier;
	/**
	 * Executed before the modification of the state history.
	 * @since 2.0.0
	 */
	let prehistory: Record<string, SugarCubeLib.DisplayTaskFunction>;
	/**
	 * Executed before the rendering of the incoming passage.
	 * @since 2.0.0
	 */
	let predisplay: Record<string, SugarCubeLib.DisplayTaskFunction>;

	/**
	 * Executed before the rendering of the incoming passage.
	 * @since 2.0.0
	 */
	let prerender: Record<string, SugarCubeLib.RenderTaskFunction>;

	/**
	 * Executed after the rendering of the incoming passage.
	 * @since 2.0.0
	 */
	let postrender: Record<string, SugarCubeLib.RenderTaskFunction>;

	/**
	 * Executed after the display (i.e. output) of the incoming passage.
	 * @since 2.0.0
	 */
	let postdisplay: Record<string, SugarCubeLib.DisplayTaskFunction>;

	// SugarCube functions

	/**
	 * Returns a deep copy of the given value.
	 *
	 * @param original The object to value.
	 *
	 * NOTE: Only the primitives, generic objects, some JavaScript natives (specifically: Array, Date, Map, RegExp, and Set),
	 * and DOM node objects are supported by default. Unsupported objects will need a .clone() method to be properly supported
	 * by the cone() function—when called on such an object, it will simply defer to the local method.
	 *
	 * @since 2.0.0
	 *
	 * @example
	 * // Without clone(); given the generic object: $foo = { id : 1 }
	 * <<set $bar to $foo>>
	 * <<set $bar.id to 5>>
	 * $foo.id -> Returns: 5
	 * $bar.id -> Returns: 5
	 * // With clone(); given the generic object: $foo = { id : 1 }
	 * <<set $bar to clone($foo)>>
	 * <<set $bar.id to 5>>
	 * $foo.id -> Returns: 1
	 * $bar.id -> Returns: 5
	 */
	function clone(original: any): any;

	/**
	 * Returns a random value from its given arguments.
	 *
	 * @param list The list of values to operate on. May be any combination of singular values, actual arrays, or array-like
	 * objects. All values will be concatenated into a single list for selection. NOTE: Does not flatten nested arrays — if
	 * this is required, the <Array>.flatten() method may be used to flatten the nested arrays prior to passing them to
	 * either().
	 * @since 2.0.0
	 * @example
	 * // Using singular values
	 * either("Blueberry", "Cherry", "Pecan") -> Returns a random pie from the whole list
	 *
	 * // Using arrays; given: $pies = ["Blueberry", "Cherry", "Pecan"]
	 * either($pies) -> Returns a random pie from the whole array
	 *
	 * // Using singular values and arrays; given: $letters = ["A", "B"]
	 * either($letters, "C", "D") -> Returns a random value from the whole list (i.e. "A", "B", "C", "D")
	 *
	 * // Using multiple arrays; given: $letters = ["A", "B"] & $numerals = ["1", "2"]
	 * either($letters, $numerals) -> Returns a random value from the whole list (i.e. "A", "B", "1", "2")
	 */
	function either(...list: any): any;

	/**
	 * Returns whether the passage with the given title occurred within the story history. If multiple passage titles are given,
	 * returns the logical-AND aggregate of the set (i.e. true if all were found, false if any were not found).
	 * @param passageNames The title(s) of the passage(s) to search for. May be a list or an array of passages.
	 * @since 2.7.0
	 * @example
	 * <<if hasVisited("Bar")>>…has been to the Bar…<</if>>
	 * <<if not hasVisited("Bar")>>…has never been to the Bar…<</if>>
	 * <<if hasVisited("Bar", "Café")>>…has been to both the Bar and Café<</if>>
	 * <<if not hasVisited("Bar", "Café")>>…has never been to either the Bar, Café, or both…<</if>>
	 */
	function hasVisited(...passageNames: string[]): boolean;

	/**
	 * Returns the number of turns that have passed since the last instance of the passage with the given title occurred within
	 * the story history or -1 if it does not exist. If multiple passage titles are given, returns the lowest count (which can
	 * be -1).
	 * @param passageNames The title(s) of the passage(s) to search for. May be a list or an array of passages.
	 * @since 2.0.0
	 * @example
	 * <<if lastVisited("Bar") is -1>>…has never been to the Bar…<</if>>
	 * <<if lastVisited("Bar") is 0>>…is currently in the Bar…<</if>>
	 * <<if lastVisited("Bar") is 1>>…was in the Bar one turn ago…<</if>>
	 * <<if lastVisited("Bar", "Café") is -1>>…has never been to the Bar, Café, or both…<</if>>
	 * <<if lastVisited("Bar", "Café") is 2>>…has been to both the Bar and Café, most recently two turns ago…<</if>>
	 */
	function lastVisited(...passageNames: string[]): number;

	/**
	 * Load and integrate external JavaScript scripts.
	 *
	 * NOTE: Loading is done asynchronously at run time, so if the script must be available within a tight time frame, then you
	 * should use the Promise returned by the function to ensure the script is loaded before before it is needed.
	 *
	 * NOTE: A script section (Twine 2: the Story JavaScript; Twine 1/Twee: a script-tagged passage) is normally the best place
	 * to call importScripts().
	 *
	 * @param urls The URLs of the external scripts to import. Loose URLs are imported concurrently, arrays of URLs are imported
	 *  sequentially.
	 *
	 * @since 2.16.0
	 *
	 * @example Basic usage
	 * // Import all scripts concurrently
	 * importScripts(
	 *	"https://somesite/a/path/a.js",
	 *	"https://somesite/a/path/b.js",
	 *	"https://somesite/a/path/c.js",
	 *	"https://somesite/a/path/d.js"
	 * );
	 *
	 * // Import all scripts sequentially
	 * importScripts([
	 *   "https://somesite/a/path/a.js",
	 *   "https://somesite/a/path/b.js",
	 *   "https://somesite/a/path/c.js",
	 *   "https://somesite/a/path/d.js"
	 * ]);
	 *
	 * // Import scripts a.js, b.js, and the c.js/d.js group concurrently,
	 * // while importing c.js and d.js sequentially relative to each other
	 * importScripts(
	 *   "https://somesite/a/path/a.js",
	 *   "https://somesite/a/path/b.js",
	 *   [
	 *	   "https://somesite/a/path/c.js",
	 *	   "https://somesite/a/path/d.js"
	 *   ]
	 * );
	 *
	 * @example Basic usage with the returned Promise object
	 * // Import a script while using the returned Promise to ensure that
	 * // the script has been fully loaded before executing dependent code
	 * importScripts("https://somesite/a/path/a.js")
	 *	.then(function () {
	 *	   // Code that depends on the script goes here.
	 * })
	 * .catch(function (err) {
	 *	 // There was an error loading the script, log it to the console.
	 *	 console.log(err);
	 * });
	 *
	 * @example <caption>Saving the returned Promise object for later use</caption>
	 * // Import a script while saving the returned Promise so it may be used later
	 * setup.aScriptImport = importScripts("https://somesite/a/path/aScript.js");
	 *
	 * // Use the returned Promise later on to ensure that the script has been fully
	 * // loaded before executing dependent code
	 * setup.aScriptImport
	 *	.then(function () {
	 *		// Code that depends on the script goes here.
	 * })
	 *  .catch(function (err) {
	 *	 // There was an error loading the script, log it to the console.
	 *	 console.log(err);
	 * });
	 */
	function importScripts(...urls: string[]): Promise<any>;

	/**
	 * Load and integrate external CSS stylesheets.
	 *
	 * NOTE: Loading is done asynchronously at run time, so if the stylesheet must be available within a tight time frame, then
	 * you should use the Promise returned by the function to ensure the stylesheet is loaded before it is needed.
	 *
	 * NOTE: A script section (Twine 2: the Story JavaScript; Twine 1/Twee: a script-tagged passage) is normally the best place
	 * to call importStyles().
	 * @param urls The URLs of the external stylesheets to import. Loose URLs are imported concurrently, arrays of URLs are imported sequentially.
	 * @since 2.16.0
	 * @example <caption>Basic usage</caption>
	 * // Import all stylesheets concurrently
	 * importStyles(
	 *	"https://somesite/a/path/a.css",
	 *	"https://somesite/a/path/b.css",
	 *	"https://somesite/a/path/c.css",
	 *	"https://somesite/a/path/d.css"
	 * );
	 *
	 * // Import all stylesheets sequentially
	 * importStyles([
	 *	"https://somesite/a/path/a.css",
	 *	"https://somesite/a/path/b.css",
	 *	"https://somesite/a/path/c.css",
	 *	"https://somesite/a/path/d.css"
	 * ]);
	 *
	 * // Import stylesheets a.css, b.css, and the c.css/d.css group concurrently,
	 * // while importing c.css and d.css sequentially relative to each other
	 * importStyles(
	 *	"https://somesite/a/path/a.css",
	 *	"https://somesite/a/path/b.css",
	 *	[
	 *		 "https://somesite/a/path/c.css",
	 *		 "https://somesite/a/path/d.css"
	 *	]
	 * );
	 *
	 * @example <caption>Basic usage with the returned Promise object</caption>
	 * // Grab a loading screen lock
	 * var lsLockId = LoadScreen.lock();
	 *
	 * // Import a stylesheet while using the returned Promise to ensure that the
	 * // stylesheet has been fully loaded before unlocking the loading screen
	 * importStyles("https://somesite/a/path/a.css")
	 *	.then(function () {
	 *	  // The stylesheet has been loaded, release the loading screen lock.
	 *		LoadScreen.unlock(lsLockId);
	 * })
	 *   .catch(function (err) {
	 *	  // There was an error loading the stylesheet, log it to the console.
	 *	  console.log(err);
	 * });
	 */
	function importStyles(...urls: string[]): Promise<any>;

	/**
	 * Returns the title of the active (present) passage.
	 * @since 2.0.0
	 * @example
	 * <<if passage() is "Café">>…the current passage is the Café passage…<</if>>
	 */
	function passage(): string;

	/**
	 * Returns the title of the most recent previous passage whose title does not match that of the active passage or an empty
	 * string, if there is no such passage.
	 * @since 2.0.0
	 * @example
	 * <<if previous() is "Café">>…the most recent non-active passage is the Café passage…<</if>>
	 * @example
	 * // Commonly used as part of a link to return to the most recent non-active passage
	 * [[Return|previous()]]
	 */
	function previous(): string;

	/**
	 * Returns a pseudo-random whole number (integer) within the range of the given bounds (inclusive)—i.e. [min, max].
	 *
	 * NOTE: By default, it uses Math.random() as its source of randomness, however, when the seedable PRNG has been enabled,
	 * via State.initPRNG(), it uses the seeded PRNG instead.
	 * @param min The lower bound of the random number (inclusive). If omitted, will default to 0.
	 * @param max The upper bound of the random number (inclusive).
	 * @since 2.0.0
	 * @example
	 * random(5) // Returns a number in the range 0–5
	 * random(1, 6) // Returns a number in the range 1–6
	 */
	function random(min: number, max: number): number;
	function random(max: number): number;

	/**
	 * Returns a pseudo-random real number (floating-point) within the range of the given bounds (inclusive for the minimum,
	 * exclusive for the maximum) — i.e. [min, max).
	 *
	 * NOTE: By default, it uses Math.random() as its source of randomness, however, when the seedable PRNG has been enabled,
	 * via State.initPRNG(), it uses the seeded PRNG instead.
	 * @param min The lower bound of the random number (inclusive). If omitted, will default to 0.0.
	 * @param max The upper bound of the random number (exclusive).
	 * @since 2.0.0
	 * @example
	 * randomFloat(5.0) // Returns a number in the range 0.0–4.9999999…
	 * randomFloat(1.0, 6.0) // Returns a number in the range 1.0–5.9999999…
	 */
	function randomFloat(max: number): number;
	function randomFloat(min: number, max: number): number;

	/**
	 * Renders the selected passage into the target element, replacing any existing content, and returns the element. If no passages are found and default text is specified, it will be used instead.
	 * @param idOrElement The ID of the element or the element itself.
	 * @param passages The name(s) of the passage(s) to search for. May be a single passage or an array of passages. If an array
	 * of passage names is specified, the first passage to be found is used.
	 * @param defaultText The default text to use if no passages are found.
	 *
	 * @since 2.0.0
	 *
	 * NOTE: As it is highly unlikely that either an array of passage names or default text will be needed in the vast majority
	 * of cases, only a few basic examples will be given.
	 * @example
	 * // Using an ID; given an existing element on the page: <div id="my-display"></div>
	 * setPageElement("my-display", "MyPassage");
	 * @example
	 * // Using an element; given a reference to an existing element: myElement
	 * setPageElement(myElement, "MyPassage");
	 */
	function setPageElement(
		idOrElement: string | HTMLElement,
		passages: string | string[],
		defaultText?: string): HTMLElement | null;

	/**
	 * Returns a new array consisting of all of the tags of the given passages.
	 * @param passages The passages from which to collect tags. May be a list or an array of passages. If omitted, will default
	 * to the current passage.
	 * @since 2.0.0
	 * @example
	 * <<if tags().includes("forest")>>…the current passage is part of the forest…<</if>>
	 * <<if tags("Lonely Glade").includes("forest")>>…the Lonely Glade passage is part of the forest…<</if>>
	 */
	function tags(...passages: string[]): string[];

	/**
	 * Returns a reference to the current temporary variables store (equivalent to: State.temporary). This is only really useful
	 * within pure JavaScript code, as within TwineScript you may simply access temporary variables natively.
	 * @since 2.19.0
	 * @example
	 * // Given: _selection is 'Zagnut Bar'
	 * if (temporary().selection === 'Zagnut Bar') {
	 *   // Do something...
	 * }
	 */
	function temporary(): object;

	/**
	 * Returns the number of milliseconds which have passed since the current passage was rendered to the page.
	 * @since 2.0.0
	 * @example
	 * // Links which vary based on the time
	 * In the darkness, something wicked this way comes.  Quickly!  Do you \
	 * <<link "try to run back into the light">>
	 *   <<if time() lt 5000>>
	 *		/% The player clicked the link in under 5s, so they escape %/
	 *		<<goto "Well lit passageway">>
	 *   <<else>>
	 *		/% Else, they're eaten by a grue %/
	 *		<<goto "Eaten by a grue">>
	 *	<</if>>
	 * <</link>> \
	 * or [[stand your ground|Eaten by a grue]]?
	 */
	function time(): number;

	/**
	 * Returns the number of passages that the player has visited.
	 * @since 2.0.0
	 * @example
	 * << print "This is turn #" + turns() >>
	 */
	function turns(): number;

	/**
	 * Returns a reference to the active(present) story variables store(equivalent to: State.variables).This is only really
	 * useful within pure JavaScript code, as within TwineScript you may simply access story variables natively.
	 * @since 2.0.0
	 * @example
	 * // Given: $hasGoldenKey is true
	 * if (variables().hasGoldenKey) {
	 *	//Do something
	 * }
	 */
	function variables(): any;

	/**
	 * Returns the number of times that the passage with the given title occurred within the story history. If multiple passage
	 * titles are given, returns the lowest count.
	 * @param passages The title(s) of the passage(s) to search for. May be a list or an array of passages. If omitted, will
	 * default to the current passage.
	 * @since 2.0.0
	 * @example
	 * <<if visited() is 3>>…this is the third visit to the current passage…<</if>>
	 * <<if visited("Bar")>>…has been to the Bar at least once…<</if>>
	 * <<if visited("Café") is 1>>…has been to the Café exactly once…<</if>>
	 * <<if visited("Bar", "Café") is 4>>…has been to both the Bar and Café at least four times…<</if>>
	 */
	function visited(...passages: string[]): number;

	/**
	 * Returns the number of passages within the story history which are tagged with all of the given tags.
	 * @param tags The tags to search for. May be a list or an array of tags.
	 * @since 2.0.0
	 * @example
	 * <<if visitedTags("forest")>>…has been to some part of the forest at least once…<</if>>
	 * <<if visitedTags("forest", "haunted") is 1>>…has been to the haunted part of the forest exactly once…<</if>>
	 * <<if visitedTags("forest", "burned") is 3>>…has been to the burned part of the forest three times…<</if>>
	 */
	function visitedTags(...tags: string[]): number;

	interface Array<T> {
		/**
		 * Concatenates one or more unique members to the end of the base array and returns the result as a new array. Does not modify the original.
		 * @param members The members to concatenate. Members which are arrays will be merged—i.e. their members will be concatenated, rather than the array itself.
		 * @since SugarCube 2.21.0
		 * @example
		 * // Given: $fruits1 = ["Apples", "Oranges"], $fruits2 = ["Pears", "Plums"]
		 * $fruits1.concatUnique($fruits2)			→ Returns ["Apples", "Oranges", "Pears", "Plums"]
		 * $fruits1.concatUnique($fruits2, $fruits2)  → Returns ["Apples", "Oranges", "Pears", "Plums"]
		 * $fruits1.concatUnique("Pears")			 → Returns ["Apples", "Oranges", "Pears"]
		 * $fruits1.concatUnique("Pears", "Pears")	→ Returns ["Apples", "Oranges", "Pears"]
		 * $fruits1.concatUnique($fruits2, "Pears")   → Returns ["Apples", "Oranges", "Pears", "Plums"]
		 */
		concatUnique(...members: any): T[];

		/**
		 * Returns the number of times that the given member was found within the array, starting the search at position.
		 * @param needle The member to count.
		 * @param position The zero-based index at which to begin searching for needle. If omitted, will default to 0.
		 * @since SugarCube 2.0.0
		 * @example
		 * // Given: $fruits = ["Apples", "Oranges", "Plums", "Oranges"]
		 * $fruits.count("Oranges")	 → Returns 2
		 * $fruits.count("Oranges", 2)  → Returns 1
		 */
		count(needle: any, position?: number): number;

		/**
		 * Removes all instances of the given members from the array and returns a new array containing the removed members.
		 * @param needles The members to remove. May be a list of members or an array.
		 * @returns new array
		 * @since SugarCube 2.5.0
		 * @example
		 * // Given: $fruits = ["Apples", "Oranges", "Plums", "Oranges"]
		 * $fruits.delete("Oranges")		  → Returns ["Oranges", "Oranges"]; $fruits ["Apples", "Plums"]
		 * $fruits.delete("Apples", "Plums")  → Returns ["Apples", "Plums"]; $fruits ["Oranges", "Oranges"]
		 */
		delete(...needles: any): T[];

		/**
		 * Removes all of the members at the given indices from the array and returns a new array containing the removed
		 *  members.
		 * @param indices The indices of the members to remove.
		 * @sine SugarCube 2.5.0
		 * @example
		 * // Given: $fruits = ["Apples", "Oranges", "Plums", "Oranges"]
		 * $fruits.deleteAt(2)	 → Returns ["Plums"]; $fruits ["Apples", "Oranges", "Oranges"]
		 * $fruits.deleteAt(1, 3)  → Returns ["Oranges", "Oranges"]; $fruits ["Apples", "Plums"]
		 * $fruits.deleteAt(0, 2)  → Returns ["Apples", "Plums"]; $fruits ["Oranges", "Oranges"]
		 */
		deleteAt(...indices: number[]): T[];

		/**
		 * Removes all of the members that pass the test implemented by the given predicate function from the array and returns
		 * a new array containing the removed members.
		 * @param predicate The function used to test each member. It is called with three arguments:
		 * value: The member being processed.
		 * index: (optional, integer) The index of member being processed.
		 * array: (optional, array) The array being processed.
		 * @param thisArg The value to use as this when executing predicate.
		 * @example
		 * // Given: $fruits = ["Apples", "Apricots", "Oranges"]
		 * $fruits.deleteWith(function (val) {
		 *	return val === "Apricots";
		 * }) // Returns ["Apricots"];
		 * // and now $fruits is ["Apples", "Oranges"]
		 *
		 * $fruits.deleteWith(function (val) {
		 *	return val.startsWith("Ap");
		 * }) // Returns ["Apples", "Apricots"];
		 * // and now $fruits is ["Oranges"]
		 *
		 * // Given: $fruits = [{ name : "Apples" }, { name : "Apricots" }, { name : "Oranges" }]
		 * $fruits.deleteWith(function (val) {
		 *	 return val.name === "Apricots";
		 * }) // Returns [{ name : "Apricots" }]; $fruits [{ name : "Apples" }, { name : "Oranges" }]
		 *
		 * $fruits.deleteWith(function (val) {
		 *	 return val.name.startsWith("Ap");
		 * }) // Returns [{ name : "Apples" }, { name : "Apricots" }];
		 * // and now $fruits is [{ name : "Oranges" }]
		 */
		deleteWith(predicate: (value: T, index?: number, array?: T[]) => boolean, thisArg?: T[]): T[];

		/**
		 * Returns the first member from the array. Does not modify the original.
		 * @since SugarCube 2.2.7.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.first() // Returns "Blueberry"
		 */
		first(): T;

		/**
		 * Returns a new array consisting of the flattened source array (i.e. flat map reduce). Does not modify the original.
		 * @since SugarCube 2.0.0
		 * @example
		 * // Given: $npa = [["Alfa", "Bravo"], [["Charlie", "Delta"], ["Echo"]], "Foxtrot"]
		 * $npa.flatten() //  Returns ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"]
		 */
		flatten(): T[];

		/**
		 * Returns whether all of the given members were found within the array.
		 * @param needles The members to find. May be a list of members or an array.
		 * @since SugarCube 2.10.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * <<if $pies.includesAll("Cherry", "Pecan")>>…found Cherry and Pecan pies…<</if>>
		 * @example
		 * // Given: $search = ["Blueberry", "Pumpkin"]
		 * <<if $pies.includesAll($search)>>…found Blueberry and Pumpkin pies…<</if>>
		 */
		includesAll(...needles: T[]): boolean;

		/**
		 * Returns whether any of the given members were found within the array.
		 * @param needles The members to find. May be a list of members or an array.
		 * @since SugarCube 2.10.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * <<if $pies.includesAny("Cherry", "Pecan")>>…found Cherry or Pecan pie…<</if>>
		 * @example
		 * // Given: $search = ["Blueberry", "Pumpkin"]
		 * <<if $pies.includesAny($search)>>…found Blueberry or Pumpkin pie…<</if>>
		 */
		includesAny(...needles: T[]): boolean;

		/**
		 * Returns the last member from the array. Does not modify the original.
		 * @since SugarCube 2.27.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.last() // Returns "Pumpkin"
		 */
		last(): T;

		/**
		 * Removes and returns a random member from the array.
		 * @since SugarCube 2.0.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.pluck() // Removes and returns a random pie from the array
		 */
		pluck(): T;

		/**
		 * Randomly removes the given number of members from the base array and returns the removed members as a new array.
		 * @param want The number of members to pluck.
		 * @since SugarCube 2.20.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.pluckMany(3) // Removes three random pies from the array and returns them as a new array
		 */
		pluckMany(want?: number): T[];

		/**
		 * Appends one or more unique members to the end of the base array and returns its new length.
		 * @param members The members to append.
		 * @since 2.21.0
		 * @example
		 * // Given: $fruits = ["Apples", "Oranges"]
		 * $fruits.pushUnique("Apples") // Returns 2; $fruits ["Apples", "Oranges"]
		 * $fruits.pushUnique("Plums", "Plums") // Returns 3; $fruits ["Apples", "Oranges", "Plums"]
		 */
		pushUnique(...members): number;

		/**
		 * Returns a random member from the array. Does not modify the original.
		 * @since SugarCube 2.0.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.random() // Returns a random pie from the array
		 */
		random(): T;

		/**
		 * Randomly selects the given number of unique members from the array and returns the selected members as a new array.
		 * Does not modify the original.
		 * @param want The number of members to select.
		 * @since SugarCube 2.20.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.randomMany(3) // Returns a new array containing three unique random pies from the array
		 */
		randomMany(want?: number): T[];

		/**
		 * Randomly shuffles the array.
		 * @since SugarCube 2.0.0
		 * @example
		 * // Given: $pies = ["Blueberry", "Cherry", "Cream", "Pecan", "Pumpkin"]
		 * $pies.shuffle() // Randomizes the order of the pies in the array
		 */
		shuffle(): T[];


		/**
		 * Prepends one or more unique members to the beginning of the base array and returns its new length.
		 * @param members The members to append.
		 * @since SugarCube 2.21.0
		 * @example
		 * // Given: $fruits = ["Oranges", "Plums"]
		 * $fruits.unshiftUnique("Oranges") // Returns 2; $fruits ["Oranges", "Plums"]
		 * $fruits.unshiftUnique("Apples", "Apples") // Returns 3; $fruits ["Apples", "Oranges", "Plums"]
		 */
		unshiftUnique(...members: T[]): number;

		// deprecated members

		/**
		 *
		 * @param needle
		 * @param position
		 * @deprecated in favor of <Array>.includes().
		 */
		contains(needle: any, position?: number): boolean;

		/**
		 *
		 * @param needle
		 * @deprecated in favor of <Array>.includesAll().
		 */
		containsAll(...needle): boolean;

		/**
		 *
		 * @param needle
		 * @deprecated in favor of <Array>.includesAny().
		 */
		containsAny(...needle): boolean;

		/**
		 *
		 * @param array
		 * @deprecated
		 */
		random(array: []): any;
	}


	interface JSON {
		/**
		 * Returns the given code string, and optional data chunk, wrapped within the JSON deserialization revive wrapper.
		 * Intended to allow authors to easily wrap their custom object types (a.k.a. classes) revival code and associated data
		 * within the revive wrapper, which should be returned from an object instance's .toJSON() method, so that the instance
		 * may be properly revived upon deserialization.
		 * @param codeString The revival code string to wrap.
		 * @param reviveData he data which should be made available to the evaluated revival code during deserialization via the
		 * special $ReviveData$ variable. WARNING: Attempting to pass the value of an object instance's this directly as the
		 * reviveData parameter will trigger out of control recursion in the serializer, so a clone of the instance's own data
		 * must be passed instead.
		 * @since SugarCube 2.9.0
		 * @example
		 * JSON.reviveWrapper( <valid JavaScript code string> ); // -> Without data chunk
		 * JSON.reviveWrapper( <valid JavaScript code string> , myOwnData); // -> With data chunk
		 * // E.g. Assume that you're attempting to revive an instance of a custom class named
		 * // `Character`, which is assigned to a story variable named `$pc`.  The call
		 * // to `JSON.reviveWrapper()` might look something like the following.
		 * var ownData = {};
		 * Object.keys(this).forEach(function (pn) { ownData[pn] = clone(this[pn]); }, this);
		 * return JSON.reviveWrapper('new Character($ReviveData$)', ownData);
		 */
		reviveWrapper(codeString: string, reviveData?: any): [];
	}

	interface Math {
		/**
		 * Returns the given number clamped to the specified bounds. Does not modify the original.
		 * @param num The number to clamp. May be an actual number or a numerical string.
		 * @param min The lower bound of the number.
		 * @param max The upper bound of the number.
		 * @since SugarCube 2.0.0
		 * @example
		 * Math.clamp($stat, 0, 200) // Clamps $stat to the bounds 0–200 and returns the new value
		 * Math.clamp($stat, 1, 6.6) // Clamps $stat to the bounds 1–6.6 and returns the new value
		 */
		clamp(num: number | string, min: number, max: number): number;

		/**
		 * Returns the whole(integer) part of the given number by removing its fractional part, if any. Does not modify the
		 * original.
		 * @param num The number to truncate to an integer.
		 * @since SugarCube 2.0.0
		 * @example
		 * Math.trunc(12.7) // Returns 12
		 * Math.trunc(-12.7) // Returns -12
		 */
		trunc(num: number): number;
	}

	interface JQuery {
		wikiWithOptions(options: any, ...sources): JQuery;
		wiki(...sources): JQuery;
	}
}

export { };
