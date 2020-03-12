/**
 * @param {{ rivalry: number; }} id
 * @returns {string}
 */
window.rivalryTerm = function(id) {
	if (id.rivalry === 1) {
		return "growing rival";
	} else if (id.rivalry === 2) {
		return "rival";
	} else {
		return "bitter rival";
	}
};

/**
 * @param {{ relationship: number; }} id
 * @returns {string}
 */
window.relationshipTerm = function(id) {
	if (id.relationship === 1) {
		return "friend";
	} else if (id.relationship === 2) {
		return "best friend";
	} else if (id.relationship === 3) {
		return "friend with benefits";
	} else if (id.relationship === 4) {
		return "lover";
	} else {
		return `slave ${getPronouns(id).wife}`;
	}
};

/**
 * @param {{ relationship: number; }} id
 * @returns {string}
 */
window.relationshipTermShort = function(id) {
	if (id.relationship === 1) {
		return "friend";
	} else if (id.relationship === 2) {
		return "BFF";
	} else if (id.relationship === 3) {
		return "FWB";
	} else if (id.relationship === 4) {
		return "lover";
	} else {
		return `${getPronouns(id).wife}`;
	}
};

/**
 * @param {{ relationship: number; }} id
 * @returns {string}
 */
window.PCrelationshipTerm = function(id) {
	if (id.relationship === -2) {
		return "lover";
	} else if (id.relationship === -3) {
		return `${getPronouns(id).wife}`;
	}
};

/**
 * Introduces an actor by using any meaningful relationship(s) with an already on-screen actor, and their name.
 * Returns strings like: "your husband John", "his growing rival and mother Alice", or "her best friend and twin sister Carla".
 * If there is no known relationship between them, retuns the name alone.
 * Use this function instead of just printing the slave's name when you'd like to let the player to know if two actors are related,
 * even though it's not going to have any mechanical impact on the scene.
 * @param {App.Entity.SlaveState|App.Entity.PlayerState} context
 * @param {App.Entity.SlaveState|App.Entity.PlayerState} actor
 * @param {boolean} [asLink=false] - when true, instead of using the slave's first name, use their full name with a (SC Markup) link to the slave description dialog.
 * @param {boolean} [insertComma=false] - when true, if a relationship is found, it will be separated from the actor's name by a comma ("her father, Dave" instead of "her father Dave")
 * @returns {string}
 */
window.contextualIntro = function(context, actor, asLink=false, insertComma=false) {
	let first = true;
	let r = ``;
	const firstPreamble = (context === V.PC) ? "your" : getPronouns(context).possessive;
	let preamble = () => {
		let s = first ? `${firstPreamble} ` : ` and `;
		first = false;
		return s;
	};

	if (context.relationship > 0 && context.relationshipTarget === actor.ID) {
		r += preamble() + relationshipTerm(context);
	} else if (context === V.PC && actor.relationship < -1) {
		r += preamble() + PCrelationshipTerm(actor);
	} else if (actor === V.PC && context.relationship < -1) {
		r += preamble() + PCrelationshipTerm(context);
	} else if (context.rivalry > 0 && context.rivalryTarget === actor.ID) {
		r += preamble() + rivalryTerm(context);
	}

	const _relative = relativeTerm(context, actor);
	if (_relative) {
		r += preamble() + _relative;
	}

	if (r !== ``) {
		r += (insertComma || actor === V.PC) ? ", " : " ";
	}
	const namePart = asLink ? App.UI.slaveDescriptionDialog(actor) : actor.slaveName;
	r += actor === V.PC ? "you" : namePart;
	return r;
};
