/*
* <<span>> macro
* A minimal macro which allows to create <span> elements with dynamic IDs.
*
* Usage: <<span $variable>>...<</span>>
*/
Macro.add('span', {
	skipArgs: true,
	tags: null,

	handler() {
		const payload = this.payload[0].contents.replace(/(^\n+|\n+$)/, '');
		let statement = this.args.raw.trim();
		let result;

		if (statement.length === 0) {
			return this.error('invalid syntax, format: <<span id>>');
		}

		try {
			result = Scripting.evalTwineScript(statement);
		} catch (ex) {
			return this.error(`bad evaluation: ${typeof ex === 'object' ? ex.message : ex}`);
		}

		Config.debug && this.debugView.modes({block: true});

		jQuery(`<span id='${String(result)}' />`)
			.wiki(payload)
			.appendTo(this.output);
	}
});
