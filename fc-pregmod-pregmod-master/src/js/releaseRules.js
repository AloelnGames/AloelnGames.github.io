/**
 * Returns true if two slaves are allowed to have sex according to the rules.
 * @param {App.Entity.SlaveState} slaveA
 * @param {App.Entity.SlaveState} slaveB
 * @returns {boolean}
 */
App.Utils.sexAllowed = function sexAllowed(slaveA, slaveB) {
	/* check most specific to least specific - master, partner, family, slaves */
	if (slaveA === V.PC) {
		return slaveB.rules.release.master === 1;
	} else if (slaveB === V.PC) {
		return slaveA.rules.release.master === 1;
	} else if (haveRelationshipP(slaveA, slaveB)) {
		return (slaveA.rules.release.partner === 1) && (slaveB.rules.release.partner === 1);
	} else if (areRelated(slaveA, slaveB)) {
		return V.seeIncest && (slaveA.rules.release.family === 1) && (slaveB.rules.release.family === 1);
	} else {
		return (slaveA.rules.release.slaves === 1) && (slaveB.rules.release.slaves === 1);
	}
};

/**
 * Returns true if a slave has a romantic partner other than the PC who is both willing and allowed to have sex with her.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasPartnerSex = function hasPartnerSex(slave) {
	const hasWillingSlavePartner = (slave.rules.relationship === "permissive") && (slave.relationship >= 3) && (slave.relationshipTarget > 0);
	return hasWillingSlavePartner && this.sexAllowed(slave, getSlave(slave.relationshipTarget));
};

/**
 * Returns true if a slave has a close family member other than the PC who is both willing and allowed to have sex with her.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasFamilySex = function hasFamilySex(slave) {
	if (V.seeIncest === 0 || slave.rules.release.family === 0) {
		return false;
	}
	if (V.familyTesting === 0 && slave.relationTarget > 0) {
		return this.sexAllowed(slave, getSlave(slave.relationTarget));
	} else { // familyTesting === 1
		return jsDef(randomRelatedSlave(slave, (s) => { return this.sexAllowed(slave, s); }));
	}
};

/**
 * Returns true if the slave has any kind of nonassignment sex with someone other than the PC.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasNonassignmentSex = function hasNonassignmentSex(slave) {
	return (slave.rules.release.slaves === 1) || this.hasFamilySex(slave) || this.hasPartnerSex(slave);
};

/**
 * Returns true if there is any restriction at all on how a slave may choose to get off.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.releaseRestricted = function releaseRestricted(slave) {
	return (slave.rules.release.slaves === 0) || (slave.rules.release.family === 0) || (slave.rules.release.masturbation === 0) || (slave.rules.release.partner === 0);
};

/**
 * Returns a short summary of the slave's release rules
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Utils.releaseSummaryShort = function releaseSummaryShort(slave) {
	const rel = slave.rules.release;
	let ret = "";
	if (rel.masturbation === 1) {
		ret += "M";
	}
	if (rel.partner === 1) {
		ret += "P";
	}
	if (rel.family === 1 && V.seeIncest === 1) {
		ret += "F";
	}
	if (rel.slaves === 1) {
		ret += "O";
	}
	if (rel.master === 1) {
		ret += "Y";
	}
	if (ret === "") {
		ret = "None";
	}
	return ret;
};

/**
 * Returns a longer summary of the slave's release rules
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Utils.releaseSummaryLong = function releaseSummaryLong(slave) {
	const rel = slave.rules.release;
	const includeFamily = (rel.family === 1) && (V.seeIncest === 1);
	if (rel.masturbation === 0 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "chastity";
	} else if (rel.masturbation === 1 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "masturbation only";
	} else if (rel.masturbation === 0 && rel.partner === 1 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "partner only";
	} else if (rel.masturbation === 0 && rel.partner === 0 && includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "family only";
	} else if (rel.masturbation === 0 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 1) {
		return "you only";
	} else if (rel.slaves === 1) {
		let ret = "permissive";
		let exceptions = [];
		if (rel.partner === 0) {
			exceptions.push("partner");
		}
		if (!includeFamily) {
			exceptions.push("family");
		}
		if (rel.master === 0) {
			exceptions.push("you");
		}
		if (exceptions.length > 0) {
			ret += " except " + exceptions.reduce(function(res, ch, i, arr) { return res + (i === arr.length - 1 ? ' and ' : ', ') + ch; });
		}
		if (rel.masturbation === 0) {
			ret += ", no masturbation";
		}
		return ret;
	} else {
		let permissions = [];
		if (rel.masturbation === 1) {
			permissions.push("masturbation");
		}
		if (rel.partner === 1) {
			permissions.push("partner");
		}
		if (includeFamily) {
			permissions.push("family");
		}
		if (rel.master === 1) {
			permissions.push("you");
		}
		if (permissions.length < 1) { return "unknown"; } // probably means BC didn't get run, but let's not die because of it
		return permissions.reduce(function(res, ch, i, arr) { return res + (i === arr.length - 1 ? ' and ' : ', ') + ch; });
	}
};

/**
 * Returns a description of the slave's release rules
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.releaseDesc = function releaseDesc(slave) {
	const rel = slave.rules.release;
	const includeFamily = (rel.family === 1) && (V.seeIncest === 1);
	const {He, he, his} = getPronouns(slave);
	let r = "and ";
	let appendFrequency = false;
	if (rel.masturbation === 0 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is to remain completely chaste.`;
	} else if (rel.masturbation === 1 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is only allowed to masturbate`;
		if (slave.energy > 95) {
			r += `, which ${he} is constantly doing.`;
		} else {
			r += `.`;
		}
	} else if (rel.masturbation === 0 && rel.partner === 1 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is not allowed to masturbate or proposition `;
		if (slave.rules.relationship === "permissive" && slave.relationship >= 3) {
			r += `slaves other than ${his} ${relationshipTerm(slave)}.`;
		} else {
			r += `other slaves; ${he} must find sexual release in ${his} duties.`;
		}
	} else if (rel.masturbation === 0 && rel.partner === 0 && includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is not allowed to masturbate. ${He} is only allowed to achieve sexual release with close family members,`;
		appendFrequency = true;
	} else if (rel.masturbation === 0 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 1) {
		r += `${he} is not allowed to masturbate. ${He} must find you if ${he} wants sexual release,`;
		appendFrequency = true;
	} else if (rel.slaves === 1) {
		if (rel.masturbation === 0) {
			r += `${he} is not allowed to masturbate, but may `;
		} else {
			r += `${he} is allowed to masturbate. ${He} may also `;
		}
		if (V.universalRulesConsent === 1) {
			r += "proposition other slaves to find sexual release,";
		} else {
			r += "demand sex from other slaves,";
		}

		const exceptPartner = (rel.partner === 0) && (slave.rules.relationship === "permissive") && (slave.relationship >= 3);
		if (exceptPartner && !includeFamily) {
			r += ` except for ${his} ${relationshipTerm(slave)} and close family members,`;
		} else if (exceptPartner) {
			r += ` except for ${his} ${relationshipTerm(slave)},`;
		} else if (!includeFamily) {
			r += ` except for ${his} close family members,`;
		}

		appendFrequency = true;
	} else {
		if (rel.masturbation === 0) {
			r += `${he} is not allowed to masturbate, but may `;
		} else {
			r += `${he} is allowed to masturbate. ${He} may also `;
		}

		const showPartner = (rel.partner === 1) && (slave.rules.relationship === "permissive") && (slave.relationship >= 3);
		if (includeFamily && showPartner) {
			r += `have sex with ${his} ${relationshipTerm(slave)} and close family members,`;
		} else if (showPartner) {
			r += `fuck ${his} ${relationshipTerm(slave)} as much as he wants,`;
		} else if (includeFamily && rel.master === 1) {
			r += `proposition sex from ${his} close family members and you,`;
		} else if (includeFamily) {
			r += `proposition sex from ${his} close family members,`;
		} else { // should mean rel.master === 1
			r += `find you for sexual relief,`;
		}

		appendFrequency = true;
	}
	if (appendFrequency) {
		if ((slave.devotion > 50) || (slave.energy > 95)) {
			r += ` which ${he} is constantly doing.`;
		} else if (slave.devotion > 20) {
			r += ` which ${he} is often willing to do.`;
		} else {
			r += ` which ${he} is rarely willing to do.`;
		}
	}
	return r;
};

App.Utils.testAllReleaseText = function testAllReleaseText() {
	let slave = new App.Entity.SlaveState();
	slave.rules.relationship = "permissive";
	slave.relationship = 4;
	slave.relationshipTarget = -1;
	let r = "";
	for (let i = 0; i < Math.pow(2, 5); ++i) {
		const bits = i.toString(2).padStart(5, "0");
		let rule = new App.Entity.ReleaseRulesState();
		rule.masturbation = Number(bits[0]);
		rule.partner = Number(bits[1]);
		rule.family = Number(bits[2]);
		rule.slaves = Number(bits[3]);
		rule.master = Number(bits[4]);
		slave.rules.release = rule;

		r += JSON.stringify(rule) + "\n";
		r += App.Utils.releaseSummaryShort(slave) + "\n";
		r += App.Utils.releaseSummaryLong(slave) + "\n";
		r += App.Desc.releaseDesc(slave) + "\n";
	}
	return r;
};
