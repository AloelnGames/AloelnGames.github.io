
/*
* <<htag>> macro
* A simple macro which allows to create wrapping html elements with dynamic IDs.
*	idea blatantly robbed from the spanMacroJS.tw but expanded to a more generic
*	case, allowing <div>, <button> or whatever you want. elements, default is for
*	the div though. In addition, you can pass an object in as the first argument
*	instead of an id, and each of the object's attributes will become attributes
*	of the generate tag.
*
* Usage: <<htag id>>...<</htag>>
* Usage: <<htag id tag>>...<</htag>>
* Usage: <<htag attributes>>...<</htag>>
* Usage: <<htag attributes tag>>...<</htag>>
*/
Macro.add('htag', {
	tags: null,
	handler() {
		const payload = this.payload[0].contents.replace(/(^\n+|\n+$)/, '');
		let htag = 'div';
		let attributes;

		function munge(val, key) {
			return `${key}="${val}"`;
		}

		if (this.args.length === 0) { return this.error('invalid syntax, format: <<htag [id [ tag ] | attributes [ tag ] >>'); }
		if (this.args.length > 1) { htag = String(this.args[1]).trim(); }
		if (typeof this.args[0] === "object") {
			attributes = $.map(this.args[0], munge).join(" ");
		} else {
			attributes = `id="${String(this.args[0]).trim()}"`;
		}
		if (Config.debug) {
			this.debugView.modes({
				block: true
			});
		}

		jQuery(`<${htag} ${attributes} />`)
			.wiki(payload)
			.appendTo(this.output);
	}
});
