Macro.add('scope', {
	skipArgs : true,
	tags     : null,
	handler() {
		const oldTemporary = State.temporary;
		const restoreOldTemporary = function() {
			let keys = Object.keys(oldTemporary);
			for(let i=0; i<keys.length; ++i) {
				let key = keys[i];
				let obj = oldTemporary[key];
				State.temporary[key] = obj;
			}
		};
		let keepOverwrites = false;
		try {
			State.clearTemporary();
			if(/^\s*as\s+child\s*$/.test(this.args.raw)) {
				restoreOldTemporary();
				keepOverwrites = true;
			} else {
				const varRe = new RegExp(`(${Patterns.variable})`, 'g');
				let match;
				/*
					Cache the existing values of the variables and add a shadow.
				*/
				while ((match = varRe.exec(this.args.raw)) !== null) {
					const varName = match[1];
					const varKey  = varName.slice(1);
					if(varName[0] === '$') {
						return this.error("Global variable '" + varName + "'cannot be scoped.");
					}

					if (!oldTemporary.hasOwnProperty(varKey)) {
						continue;
					}

					State.temporary[varKey] = oldTemporary[varKey];
				}
			}
			new Wikifier(this.output, this.payload[0].contents.trim());
		} finally {
			if(!keepOverwrites) {
				State.clearTemporary();
				restoreOldTemporary();
			} else {
				const overwrites = State.temporary;
				State.clearTemporary();
				let keys = Object.keys(oldTemporary);
				for(let i=0; i<keys.length; ++i) {
					let key = keys[i];
					let obj = overwrites[key];
					State.temporary[key] = obj;
				}
			}
		}
	}
});
