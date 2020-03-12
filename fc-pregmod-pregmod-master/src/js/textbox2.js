Macro.add("textbox2", {
	handler: function() {
		if (this.args.length < 2) {
			const e = [];
			return this.args.length < 1 && e.push("variable name"), this.args.length < 2 && e.push("default value"), this.error(`no ${e.join(" or ")} specified`);
		}
		if (typeof this.args[0] !== "string") { return this.error("variable name argument is not a string"); }
		const t = this.args[0].trim();
		if (t[0] !== "$" && t[0] !== "_") { return this.error(`variable name "${this.args[0]}" is missing its sigil ($ or _)`); }
		Config.debug && this.debugView.modes({
			block: true
		});
		const r = Util.slugify(t);
		const a = this.args[1];
		const isNumber = typeof(a) === "number";
		const inputElement = document.createElement("input");
		let autofocus = false;
		let passage = void 0;
		let setargs = null;
		if (this.args.length > 3) {
			passage = this.args[2];
			autofocus = this.args[3] === "autofocus";
			if (!autofocus) {
				setargs = this.args[3];
			}
		} else if (this.args.length > 2) {
			if (this.args[2] === "autofocus") {
				autofocus = true;
			} else {
				passage = this.args[2];
			}
		}
		if (passage !== (void 0) && typeof(passage) === "object") {
			passage = passage.link;
		}
		if (!passage) {
			passage = State.passage;
		}

		function gotoPassage() {
			if (passage) {
				const currentScrollPosition = window.pageYOffset;
				const currentPassage = State.passage;
				if (setargs) {
					Scripting.evalTwineScript(setargs);
				}
				Engine.play(passage);
				if (currentPassage === passage) {
					Scripting.evalJavaScript(`window.scrollTo(0, ${currentScrollPosition});`);
				}
			}
		}

		function valueToNumberIfSame(v) {
			if (!isNumber) {
				return v;
			} // Do nothing
			try {
				return parseInt(v, 10);
			} catch (error) {
				return v;
			}
		}

		jQuery(inputElement).attr({
			id: `${this.name}-${r}`,
			name: `${this.name}-${r}`,
			// type: isNumber ? "number" : "text", /* TODO - hide spinner if we do this */
			tabindex: 0
		}).addClass(`macro-${this.name}`)
			.on("change", function() {
				State.setVar(t, valueToNumberIfSame(this.value));
			}).on("blur", function() {
				State.setVar(t, valueToNumberIfSame(this.value));
				// eslint-disable-next-line eqeqeq
				if (this.value != a) { // If the value has actually changed, reload the page. Note != and not !== because types might be different
					gotoPassage();
				}
			})
			.on("keypress", function(e) {
				e.which === 13 && (e.preventDefault(), State.setVar(t, valueToNumberIfSame(this.value)), gotoPassage());
			}).appendTo(this.output), State.setVar(t, a), inputElement.value = a, autofocus && (inputElement.setAttribute("autofocus", "autofocus"), postdisplay[`#autofocus:${inputElement.id}`] = function(e) {
			delete postdisplay[e], setTimeout(function() {
				return inputElement.focus();
			}, Engine.minDomActionDelay);
		});
	}
});
