/* eslint-disable camelcase */
/* eslint-disable no-empty */
/* Use like:
	<<options $varname "New Passage (defaults to current passage)">>
	  A title
	  <<option "value_to_set_varname_to" "English text to show user" "additional variables to set when clicked" "Extra English text to show, but not as a link">>
		 Text to show if $varname matches this option
	  <<option ....>>
	  <<comment>>
		Some comment to add at the end
	<</option>>

	optionlt and optionslte lets you also specify a 'less than' or 'less than or
	equal' value, to show an option as selected if it is less than this amount
	(and not selected by a previous option)

	<<optionlt "less than value" "value_to_set_varname_to" "English text to show user" "additional variables to set when clicked" "Extra English text to show, but not as a link">>
  */
Macro.add('options', {
	skipArgs : false,
	tags	 : ['option', 'comment', 'optionlt', 'optionlte', 'optiongt', 'optiongte',
				'optiondefault', 'optionif'],
	handler : function() {
		try {
			let currentOption = this.payload[0].args[0];
			let currentOptionIsNumber = typeof currentOption === "number";
			let variable = null;
			let title = this.payload[0].contents || '';
			let passageName = this.payload[0].args[1] || passage();
			let found = false;
			let found_index = 0;
			let comment = null;
			let hasMultipleOptionsWithSameValue = false;
			let description = "";
			let hasCurrentOption = this.payload[0].args.full &&
				this.payload[0].args.full !== '""' && this.payload[0].args.full !== "''";

			// Check if we have a first argument - if we do, it should be a variable like $foo
			if (hasCurrentOption) {
				if (currentOption === undefined) {
					currentOption = false;
				}
				if (this.payload[0].args.full.startsWith("State.temporary.")) {
					variable = "_" + this.payload[0].args.full.split(' ', 1)[0].substring("State.temporary.".length);
				} else if (this.payload[0].args.full.startsWith("State.variables.")) {
					variable = "$" + this.payload[0].args.full.split(' ', 1)[0].substring("State.variables.".length);
				} else {
					// eslint-disable-next-line no-console
					console.log(this.payload[0].args.full);
					throw new Error("First parameter to 'options' must be a variable");
				}

				/* First print out the string for the current value */
				for (let i = 1, len = this.payload.length; i < len; ++i) {
					if (this.payload[i].name === 'option') {
						if (this.payload[i].args[0] === currentOption) {
							if (found) {
								hasMultipleOptionsWithSameValue = true;
							} else {
								description = this.payload[i].contents;
								found_index = i;
								found = true;
							}
						}
					} else if (this.payload[i].name === 'optionlt') {
						if (!found && this.payload[i].args[0] > currentOption) {
							description = this.payload[i].contents;
							found = true;
							found_index = i;
						}
					} else if (this.payload[i].name === 'optionlte') {
						if (!found && this.payload[i].args[0] >= currentOption) {
							description = this.payload[i].contents;
							found = true;
							found_index = i;
						}
					} else if (this.payload[i].name === 'optiongt') {
						if (!found && this.payload[i].args[0] < currentOption) {
							description = this.payload[i].contents;
							found = true;
							found_index = i;
						}
					} else if (this.payload[i].name === 'optiongte') {
						if (!found && this.payload[i].args[0] <= currentOption) {
							description = this.payload[i].contents;
							found = true;
							found_index = i;
						}
					} else if (this.payload[i].name === 'optiondefault') {
						if (!found) {
							description = this.payload[i].contents;
							found = true;
							found_index = i;
						}
					} else if (this.payload[i].name === 'comment') {
					} else if (this.payload[i].name === 'optionif') {
					} else {
						throw new Error("Only valid tag is 'option' inside 'options'");
					}
				}
			} else {
				// No variable was passed to <<options>>
				// This is valid, but then we only allow an empty <<option>> or <<comment>>
				// inside
				for (let i = 1, len = this.payload.length; i < len; ++i) {
					if (this.payload[i].name === 'option' && this.payload[i].args.length === 0) {
						// This is valid for an empty <<options>>
					} else if (this.payload[i].name === "comment") {
						// This is valid for an empty <<options>>
					} else {
						throw new Error("Missing variable to <<options>>");
					}
				}
			}

			let showSelectedOption = true; // this.payload.length !== 3 || !description;
			/* Now print out the list of options */
			let output = "";
			let optionIfIsFalse = false;
			for (let i = 1, len = this.payload.length; i < len; ++i) {
				if (this.payload[i].name === "optionif") {
					if (this.payload[i].args.length === 0) {
						optionIfIsFalse = false; /* No options means to turn off optionif */
					} else if (this.payload[i].args.length === 1) {
						// Evaluate it and see if is false
						if (typeof (this.payload[i].args[0]) !== 'boolean') {
							throw new Error("optionif requires true or false for the first (and only) parameter");
						}
						optionIfIsFalse = !this.payload[i].args[0];
					} else {
						throw new Error("Only one argument expected to 'optionif'");
					}
					continue;
				}
				if (optionIfIsFalse) {
					continue;
				} else if (this.payload[i].name.startsWith('option')) {
					let args = this.payload[i].args;
					let hasComparitor = this.payload[i].name !== "option" && this.payload[i].name !== "optiondefault";
					let argText = args[hasComparitor ? 2 : 1] || "";
					if (args.length === 0) {
						output += this.payload[i].contents.trim();
					} else {
						let extraComment = args[hasComparitor ? 4 : 3];
						extraComment = extraComment ? ' ' + extraComment : '';
						// We use a very crude heuristic for styling 'Enable'
						// and 'Disable' buttons differently.
						const isEnableOption = argText && (argText.startsWith("Enable") || argText === "Yes" || argText.startsWith("Allow"));
						const isDisableOption = argText && (argText.startsWith("Disable") || argText === "No" || argText.startsWith("Deny"));
						let className = "optionMacroOption ";
						if (isEnableOption) {
							className += "optionMacroEnable";
						} else if (isDisableOption) {
							className += "optionMacroDisable";
						}
						if (found_index !== i || hasMultipleOptionsWithSameValue) {
							let onClickChange = args[hasComparitor ? 3 : 2];
							onClickChange = onClickChange ? ', ' + onClickChange : '';
							output += `<span class="${className}">[[${argText}${extraComment}|${passageName}][${variable}=${JSON.stringify(args[hasComparitor ? 1 : 0])}${onClickChange}]]</span>`;
						} else if (showSelectedOption) {
							output += `<span class="optionMacroSelected ${className}">${argText}${extraComment}</span>`;
						}
					}
				} else if (this.payload[i].name === 'comment') {
					comment = this.payload[i].contents;
				}
			}
			jQuery(this.output).wiki(
				'<span class="optionMacro ' + (currentOptionIsNumber ? 'optionMacroNumber' : '') + '">' +
					'<span class="optionDescription">' + title + ' ' + description +
						(comment ? '<span class="optionComment"><span class="detail"><br>' + comment + "</span></span>" : '') +
					"</span>" +
					'<span class="optionValue">' + output + "</span>" +
				'</span>'
				);
		} catch (ex) {
			return this.error('bad options expression: ' + ex.message);
		}
	}
});
