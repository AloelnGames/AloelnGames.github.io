/**
 * @param {App.Entity.SlaveState} A
 * @param {App.Entity.SlaveState} B
 * @returns {boolean}
 */
window.sameAssignmentP = function sameAssignmentP(A, B) {
	return A.assignment === B.assignment;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canImproveIntelligence = function canImproveIntelligence(slave) {
	let origIntel = V.genePool.find(function(s) { return s.ID === slave.ID; }).intelligence;
	return (slave.intelligence < origIntel+15) && (slave.intelligence < 100);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.maxHeight = function maxHeight(slave) {
	let max = Math.trunc(Math.clamp((Height.mean(slave) * 1.25), 0, 274)); /* max achievable height is expected height plus 25% */

	if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
		max = Math.min(max, 160);
	}

	return max;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canImproveHeight = function canImproveHeight(slave) {
	return slave.height < maxHeight(slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.SlaveState} target
 * @returns {boolean}
 */
window.haveRelationshipP = function haveRelationshipP(slave, target) {
	return slave.relationshipTarget === target.ID;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.SlaveState} target
 * @returns {boolean}
 */
window.isRivalP = function isRivalP(slave, target) {
	return slave.rivalryTarget === target.ID;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.supremeRaceP = function supremeRaceP(slave) {
	return State.variables.arcologies[0].FSSupremacistRace === slave.race;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.inferiorRaceP = function inferiorRaceP(slave) {
	return State.variables.arcologies[0].FSSubjugationistRace === slave.race;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isLeaderP = function isLeaderP(slave) {
	/** @type {App.Entity.SlaveState[]} */
	const leaders = [V.HeadGirl, V.Bodyguard, V.Recruiter, V.Concubine, V.Nurse, V.Attendant, V.Matron, V.Madam, V.DJ, V.Milkmaid, V.Farmer, V.Stewardess, V.Schoolteacher, V.Wardeness];
	return leaders.some(leader => leader.ID && leader.ID === slave.ID);
};

/**
 * colors skin, eyes and hair based on genetic Color.
 * Takes .override_*_Color into account.
 *
 * @param {App.Entity.SlaveState} slave
 */
window.applyGeneticColor = function(slave) {
	if (slave.override_Eye_Color !== 1) {
		resetEyeColor(slave, "both");
	}
	if (slave.override_H_Color !== 1) {
		slave.hColor = getGeneticHairColor(slave);
	}
	if (slave.override_Arm_H_Color !== 1) {
		slave.underArmHColor = getGeneticHairColor(slave);
	}
	if (slave.override_Pubic_H_Color !== 1) {
		slave.pubicHColor = getGeneticHairColor(slave);
	}
	if (slave.override_Brow_H_Color !== 1) {
		slave.eyebrowHColor = getGeneticHairColor(slave);
	}
	if (slave.override_Skin !== 1) {
		if (!(slave.skin === "sun tanned" || slave.skin === "spray tanned")) {
			slave.skin = getGeneticSkinColor(slave);
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.newSlave = function newSlave(slave) {
	if (slave.override_Race !== 1) {
		slave.origRace = slave.race;
	}

	applyGeneticColor(slave);

	/* eslint-disable camelcase */
	slave.override_Race = 0;
	slave.override_H_Color = 0;
	slave.override_Arm_H_Color = 0;
	slave.override_Pubic_H_Color = 0;
	slave.override_Brow_H_Color = 0;
	slave.override_Skin = 0;
	slave.override_Eye_Color = 0;
	/* eslint-enable camelcase */

	// too tall to be a dwarf catch for event slaves
	if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2 && slave.height > 165) {
		slave.geneticQuirks.dwarfism = 1;
	}

	if (V.surnamesForbidden === 1) {
		slave.slaveSurname = 0;
	}

	if (slave.preg > 0) {
		slave.pregWeek = slave.preg;
	} else {
		slave.pregWeek = 0;
	}

	if (slave.clone !== 0) {
		slave.canRecruit = 0;
	}

	if (V.familyTesting === 1) {
		slave.sisters = 0;
		slave.daughters = 0;
		if (slave.mother === -1 || slave.father === -1) {
			V.PC.daughters += 1;
		}
		if (areSisters(V.PC, slave) > 0) {
			V.PC.sisters += 1;
		}
		for (let k = 0; k < V.slaves.length; k++) {
			if (V.slaves[k].mother === slave.ID || V.slaves[k].father === slave.ID) {
				slave.daughters++;
			}
			if (slave.mother === V.slaves[k].ID || slave.father === V.slaves[k].ID) {
				V.slaves[k].daughters++;
			}
			if (areSisters(V.slaves[k], slave) > 0) {
				slave.sisters++;
				V.slaves[k].sisters++;
			}
		}
	}

	if (slave.dick > 0 &&
		slave.balls > 0 &&
		slave.devotion <= 50 &&
		(slave.fetish !== "buttslut" || slave.fetishKnown !== 1) &&
		slave.sexualFlaw !== "hates women") {
		V.REFeminizationCheckinIDs.push(slave.ID);
	}
	if (slave.actualAge > 35 && slave.face < 40 && slave.skill.anal <= 30) {
		V.REMILFCheckinIDs.push(slave.ID);
	}
	if (slave.attrXY <= 60 && slave.attrXX > 60) {
		V.REOrientationCheckinIDs.push(slave.ID);
	}
	if (slave.face < -10) {
		V.REUglyCheckinIDs.push(slave.ID);
	}
	if (slave.anus < 2) {
		V.REButtholeCheckinIDs.push(slave.ID);
	}
	if (slave.boobs < 800) {
		V.REReductionCheckinIDs.push(slave.ID);
	}

	if (slave.genes === "XX") {
		if (slave.pubertyXX === 1) {
			if (slave.pubertyXY === 1) {
				slave.hormoneBalance = 20;
			} else {
				slave.hormoneBalance = 60;
			}
		} else {
			if (slave.pubertyXY === 1) {
				slave.hormoneBalance = -20;
			} else {
				slave.hormoneBalance = 20;
			}
		}
	} else if (slave.genes === "XY") {
		if (slave.pubertyXX === 1) {
			if (slave.pubertyXY === 1) {
				slave.hormoneBalance = 20;
			} else {
				slave.hormoneBalance = 40;
			}
		} else {
			if (slave.pubertyXY === 1) {
				slave.hormoneBalance = -40;
			} else {
				slave.hormoneBalance = 20;
			}
		}
	}

	generatePronouns(slave);
	SetBellySize(slave);
	addSlave(slave);

	if (slave.origin !== "$He was your slave, but you freed $him, which $he repaid by participating in a coup attempt against you. It failed, and $he is again your chattel." && slave.ID !== V.boomerangSlave.ID) {
		V.genePool.push(clone(slave));
	} else {
		if (!V.genePool.some(s => s.ID === slave.ID)) {
			V.genePool.push(slave);
		}
	}

	/* special case for dulling intelligence via drugs in slave acquisition */
	if (slave.dullIntelligence) {
		slave.intelligence = -100;
		slave.dullIntelligence = null;
	}

	if (slave.assignment) {
		assignJob(slave, slave.assignment);
	} else {
		slave.assignment = "choose her own job";
	}

	/** do not run the Rules Assistant before adding the new slave to the slaves list! **/
	if (V.ui !== "start" && V.universalRulesNewSlavesRA === 1 && V.rulesAssistantAuto !== 0) {
		DefaultRules(slave);
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.addSlave = function addSlave(slave) {
	State.variables.slaves.push(slave);
	State.variables.slaveIndices[slave.ID] = State.variables.slaves.length - 1;
};

window.removeSlave = function removeSlave(index) {
	const ret = State.variables.slaves.deleteAt(index);
	State.variables.slaveIndices = slaves2indices();
	return ret;
};

/**
 * @param {App.Entity.SlaveState[]} [slaves]
 * @returns {Object.<number, number>}
 */
window.slaves2indices = function slaves2indices(slaves = State.variables.slaves) {
	return slaves.reduce((acc, slave, i) => { acc[slave.ID] = i; return acc; }, {});
};

/**
 * @param {number} ID
 * @returns {App.Entity.SlaveState}
 */
window.getSlave = function getSlave(ID) {
	const index = State.variables.slaveIndices[ID];
	return index === undefined ? undefined : State.variables.slaves[index];
};

window.getChild = function getChild(ID) {
	return State.variables.cribs.find(s => s.ID === ID);
};

App.Utils.Pronouns = class {
	/**
	 * @param {{pronoun: number}} obj
	 */
	constructor(obj) {
		/** @type {App.Data.Pronouns.Definition} */
		this._pronouns = obj.pronoun < App.Data.Pronouns.Kind.custom ?
			App.Data.Pronouns.Std[obj.pronoun] :
			State.variables.customPronouns[obj.pronoun];
	}

	get pronoun() { return this._pronouns.pronoun; }
	get possessivePronoun() { return this._pronouns.possessivePronoun; }
	get possessive() { return this._pronouns.possessive; }
	get object() { return this._pronouns.object; }
	get objectReflexive() { return this._pronouns.objectReflexive; }
	get noun() { return this._pronouns.noun; }

	get Pronoun() { return capFirstChar(this.pronoun); }
	get PossessivePronoun() { return capFirstChar(this.possessivePronoun); }
	get Possessive() { return capFirstChar(this.possessive); }
	get Object() { return capFirstChar(this.object); }
	get ObjectReflexive() { return capFirstChar(this.objectReflexive); }
	get Noun() { return capFirstChar(this.noun); }

	get he() { return this.pronoun; }
	get him() { return this.object; }
	get his() { return this.possessive; }
	get himself() { return this.objectReflexive; }
	get boy() { return this.noun; }

	get He() { return this.Pronoun; }
	get Him() { return this.Object; }
	get His() { return this.Possessive; }
	get Himself() { return this.ObjectReflexive; }
	get Boy() { return this.Noun; }

	get she() { return this.pronoun; }
	get her() { return this.object; }
	get hers() { return this.possessivePronoun; }
	get herself() { return this.objectReflexive; }
	get girl() { return this.noun; }

	get She() { return this.Pronoun; }
	get Her() { return this.Object; }
	get Hers() { return this.PossessivePronoun; }
	get Herself() { return this.ObjectReflexive; }
	get Girl() { return this.Noun; }

	get woman() { return this.noun === "girl" ? "woman" : "man"; }
	get women() { return this.noun === "girl" ? "women" : "men"; }
	get loli() { return this.noun === "girl" ? "loli" : "shota"; }

	get Woman() { return capFirstChar(this.woman); }
	get Women() { return capFirstChar(this.women); }
	get Loli() { return capFirstChar(this.loli); }

	get daughter() { return this.noun === "girl" ? "daughter" : "son"; }
	get Daughter() { return capFirstChar(this.daughter); }

	get sister() { return this.noun === "girl" ? "sister" : "brother"; }
	get Sister() { return capFirstChar(this.sister); }

	get wife() { return this.noun === "girl" ? "wife" : "wife"; }
	get Wife() { return capFirstChar(this.wife); }
	get wives() { return this.noun === "girl" ? "wives" : "wives"; }
	get Wives() { return capFirstChar(this.wives); }

	get mother() { return this.noun === "girl" ? "mother" : "father"; }
	get Mother() { return capFirstChar(this.mother); }

	get father() { return this.noun === "girl" ? "mother" : "father"; }
	get Father() { return capFirstChar(this.father); }

	/**
	 * @param {string} suffix
	 * @returns {Object.<string, string>}
	 */
	appendSuffix(suffix) {
		const r = {};
		// "constructor" will be the first property. slice(1) to skip it
		for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this)).slice(1)) {
			r[prop + suffix] = this[prop];
		}
		// @ts-ignore
		return r;
	}
};

/**
 * @param {{pronoun: number}} obj
 * @returns {App.Utils.Pronouns}
 */
window.getPronouns = function(obj) {
	return new App.Utils.Pronouns(obj);
};

/**
 * @param {number} dickRatio
 * @returns {App.Utils.Pronouns}
 */
window.getNonlocalPronouns = function(dickRatio) {
	/* a fake slave object, we need the .pronoun attribute only */
	const slave = {pronoun: App.Data.Pronouns.Kind.female};
	/* Used for generic slaves, citizens, security, etc. */
	if (V.diversePronouns === 1 && dickRatio > 0 && (dickRatio >= 100 || random(1, 100) <= dickRatio)) {
		slave.pronoun = App.Data.Pronouns.Kind.male;
	}

	return getPronouns(slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.WrittenMaster = function WrittenMaster(slave) {
	if (slave !== undefined) {
		Enunciate(slave);
	} else if (V.titleEnunciate === undefined) {
		Enunciate(V.activeSlave);
	}
	return V.writtenTitle;
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.Enunciate = function Enunciate(slave) {
	if (SlaveStatsChecker.checkForLisp(slave)) {
		if (V.PC.customTitleLisp !== undefined) {
			V.titleEnunciate = V.PC.customTitleLisp;
		} else if (V.PC.title !== 0) {
			V.titleEnunciate = "Mathter";
		} else {
			V.titleEnunciate = "Mithtreth";
		}
		if (V.allowFamilyTitles === 1) {
			if (slave.father === -1) {
				if (slave.actualAge < 4 && slave.physicalAge < 4) {
					V.titleEnunciate = "Dadda";
				} else if (slave.actualAge < 9) {
					V.titleEnunciate = "Daddy";
				} else {
					V.titleEnunciate = "Dad";
				}
			} else if (slave.mother === -1) {
				if (slave.actualAge < 4 && slave.physicalAge < 4) {
					V.titleEnunciate = "Mama";
				} else if (slave.actualAge < 9) {
					V.titleEnunciate = "Mommy";
				} else {
					V.titleEnunciate = "Mom";
				}
			} else if (V.PC.mother === slave.ID || V.PC.father === slave.ID) {
				if (V.PC.title === 1) {
					V.titleEnunciate = "Thon";
				} else if (V.PC.title === 0) {
					V.titleEnunciate = "Daughter";
				}
			} else if (areSisters(slave, V.PC) > 0) {
				if (V.PC.title === 1) {
					if (slave.actualAge < 18) {
						V.titleEnunciate = "Bro";
					} else {
						V.titleEnunciate = "Brother";
					}
				} else if (V.PC.title === 0) {
					if (slave.actualAge < 18) {
						V.titleEnunciate = "Thith";
					} else {
						V.titleEnunciate = "Thithter";
					}
				}
			}
		}
		if (slave.custom.titleLisp !== undefined && slave.custom.titleLisp !== "") {
			if (slave.rudeTitle === 1) {
				if (slave.trust > 20) {
					V.titleEnunciate = slave.custom.titleLisp;
				}
			} else {
				V.titleEnunciate = slave.custom.titleLisp;
			}
		}
		V.sayEnunciate = "lisp";
		V.sEnunciate = "th";
		V.SEnunciate = "Th";
		V.ssEnunciate = "th";
		V.cEnunciate = "th";
		V.CEnunciate = "Th";
		V.ccEnunciate = "kth";
		V.zEnunciate = "th";
		V.ZEnunciate = "Th";
		V.zzEnunciate = "th";
		V.chEnunciate = "th";
		V.ChEnunciate = "Th";
		V.psEnunciate = "th";
		V.PsEnunciate = "Th";
		V.shEnunciate = "th";
		V.ShEnunciate = "Th";
		V.scEnunciate = "th";
		V.ScEnunciate = "Th";
		V.schEnunciate = "th";
		V.SchEnunciate = "Th";
		V.xEnunciate = "kth";
		V.XEnunciate = "Th";
	} else {
		if (V.PC.customTitle !== undefined) {
			V.titleEnunciate = V.PC.customTitle;
		} else if (V.PC.title !== 0) {
			V.titleEnunciate = "Master";
		} else {
			V.titleEnunciate = "Mistress";
		}
		if (V.allowFamilyTitles === 1) {
			if (slave.father === -1) {
				if (slave.actualAge < 4 && slave.physicalAge < 4) {
					V.titleEnunciate = "Dadda";
				} else if (slave.actualAge < 9) {
					V.titleEnunciate = "Daddy";
				} else {
					V.titleEnunciate = "Dad";
				}
			} else if (slave.mother === -1) {
				if (slave.actualAge < 4 && slave.physicalAge < 4) {
					V.titleEnunciate = "Mama";
				} else if (slave.actualAge < 9) {
					V.titleEnunciate = "Mommy";
				} else {
					V.titleEnunciate = "Mom";
				}
			} else if (V.PC.mother === slave.ID || V.PC.father === slave.ID) {
				if (V.PC.title === 1) {
					V.titleEnunciate = "Son";
				} else if (V.PC.title === 0) {
					V.titleEnunciate = "Daughter";
				}
			} else if (areSisters(slave, V.PC) > 0) {
				if (V.PC.title === 1) {
					if (slave.actualAge < 18) {
						V.titleEnunciate = "Bro";
					} else {
						V.titleEnunciate = "Brother";
					}
				} else if (V.PC.title === 0) {
					if (slave.actualAge < 18) {
						V.titleEnunciate = "Sis";
					} else {
						V.titleEnunciate = "Sister";
					}
				}
			}
		}
		if (slave.custom.title !== undefined && slave.custom.title !== "") {
			if (slave.rudeTitle === 1) {
				if (slave.trust > 20) {
					V.titleEnunciate = slave.custom.title;
				}
			} else {
				V.titleEnunciate = slave.custom.title;
			}
		}
		V.sayEnunciate = "say";
		V.sEnunciate = "s";
		V.SEnunciate = "S";
		V.ssEnunciate = "ss";
		V.cEnunciate = "c";
		V.CEnunciate = "C";
		V.ccEnunciate = "cc";
		V.zEnunciate = "z";
		V.ZEnunciate = "Z";
		V.zzEnunciate = "zz";
		V.chEnunciate = "ch";
		V.ChEnunciate = "Ch";
		V.psEnunciate = "ps";
		V.PsEnunciate = "Ps";
		V.shEnunciate = "sh";
		V.ShEnunciate = "Sh";
		V.scEnunciate = "sc";
		V.ScEnunciate = "Sc";
		V.schEnunciate = "sch";
		V.SchEnunciate = "Sch";
		V.xEnunciate = "x";
		V.XEnunciate = "X";
	}
	// writtenTitle should be defined outside of the lispCheck.
	if (V.PC.customTitle !== undefined) {
		V.writtenTitle = V.PC.customTitle;
	} else if (V.PC.title !== 0) {
		V.writtenTitle = "Master";
	} else {
		V.writtenTitle = "Mistress";
	}
	if (slave.custom.title !== undefined && slave.custom.title !== "" && slave.rudeTitle === 0) {
		V.writtenTitle = slave.custom.title;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.fetishChangeChance = function fetishChangeChance(slave) {
	let chance = 0,
		fetish = (slave.fetishStrength / 4),
		sex = 0;

	if (slave.clitSetting !== slave.fetish) {
		// fetish should be more uncertain leading towards puberty and then steadily become more set in stone afterwards
		if (slave.balls) {
			if (V.potencyAge >= slave.actualAge) {
				sex = (50 - ((V.potencyAge - slave.actualAge) * 10));
				fetish = (slave.fetishStrength / 2);
			} else {
				sex = ((slave.actualAge - V.potencyAge) / 4);
			}
		} else if (slave.ovaries || slave.mpreg) {
			if (V.fertilityAge >= slave.actualAge) {
				sex = (50 - ((V.fertilityAge - slave.actualAge) * 10));
				fetish = (slave.fetishStrength / 2);
			} else {
				sex = ((slave.actualAge - V.fertilityAge) / 4);
			}
		}
		chance = Math.trunc(Math.clamp((slave.devotion / 4) - (fetish) - (sex), 0, 100));
	}

	return chance;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.SlaveFullName = function SlaveFullName(slave) {
	const pair = slave.slaveSurname ? [slave.slaveName, slave.slaveSurname] : [slave.slaveName];
	if ((V.surnameOrder !== 1 && ["Cambodian", "Chinese", "Hungarian", "Japanese", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(slave.nationality)) || (V.surnameOrder === 2)) {
		pair.reverse();
	}
	return pair.join(" ");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.SlaveFullBirthName = function SlaveFullBirthName(slave) {
	const pair = slave.birthSurname ? [slave.birthName, slave.birthSurname] : [slave.birthName];
	if ((V.surnameOrder !== 1 && ["Cambodian", "Chinese", "Hungarian", "Japanese", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(slave.nationality)) || (V.surnameOrder === 2)) {
		pair.reverse();
	}
	return pair.join(" ");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.PoliteRudeTitle = function PoliteRudeTitle(slave) {
	const PC = V.PC;
	const s = V.sEnunciate;
	const ss = V.ssEnunciate;

	let r = "";
	if (slave.nationality === "Japanese") {
		if (slave.trust > 0) {
			r += `${PC.slaveName}${PC.title > 0 ? "kun" : "chan"}`;
		} else {
			r += (PC.slaveSurname ? PC.slaveSurname : `${PC.slaveName}${s}an`);
		}
	} else {
		if (slave.intelligence + slave.intelligenceImplant < -95) {
			r += V.titleEnunciate;
		} else if (slave.intelligence + slave.intelligenceImplant > 50) {
			r += (PC.title > 0 ? `Ma${s}ter` : `Mi${s}tre${ss}`);
		} else if (slave.trust > 0) {
			r += PC.slaveName;
		} else {
			r += (PC.slaveSurname ? PC.slaveSurname : PC.slaveName);
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.SlaveTitle = function SlaveTitle(slave) {
	let r = "";
	if (V.newDescriptions === 1) {
		if (slave.dick > 0 && slave.balls > 0 && slave.boobs > 300 && slave.vagina > -1 && slave.ovaries === 1) {
			if (jsRandom(1, 100) > 50) {
				r = "futanari";
			} else {
				r = "herm";
			}
		} else if (slave.dick > 0 && slave.balls === 0 && slave.boobs > 300 && slave.vagina > -1 && slave.ovaries === 1) {
			r = "dickgirl";
		} else if (slave.dick > 0 && slave.vagina > -1 && slave.ovaries === 0) {
			r = "shemale";
		} else if (slave.dick > 0 && slave.balls === 0 && slave.vagina === -1 && slave.ovaries === 0) {
			r = "eunuch";
		} else if (slave.dick > 0 && slave.balls > 0 && slave.vagina === -1 && slave.ovaries === 0) {
			if (slave.face > 10 && slave.hips > -1 && slave.shoulders < 1 && slave.faceShape !== "masculine") {
				r = "trap";
			} else if (slave.boobs > 800) {
				r = "tittyboy";
			} else if (slave.dick === 1 && slave.balls === 1) {
				r = "sissy";
			} else if (slave.dick > 1 && slave.balls > 1 && slave.height < 165 && slave.muscles < 5 && slave.visualAge < 19 && slave.faceShape !== "masculine") {
				r = "twink";
			} else if (slave.dick > 1 && slave.balls > 1 && slave.height < 160 && slave.muscles < 5 && slave.visualAge < 19) {
				r = "boytoy";
			} else if (slave.muscles > 95 && slave.height >= 185) {
				r = "titan";
			} else if (slave.muscles > 30) {
				r = "muscleboy";
			} else {
				r = "slaveboy";
			}
		} else if (slave.dick === 0 && slave.balls === 0 && slave.vagina > -1) {
			if ((slave.shoulders > slave.hips || slave.faceShape === "masculine") && slave.boobs < 400 && slave.genes === "XY") {
				r = "cuntboy";
			} else if (slave.ovaries === 0 && slave.genes === "XY") {
				r = "tranny";
			} else if (slave.weight > 10 && slave.boobs > 800 && slave.counter.birthsTotal > 0 && slave.physicalAge > 59) {
				r = "GMILF";
			} else if (slave.weight > 10 && slave.boobs > 800 && slave.counter.birthsTotal > 0 && slave.physicalAge > 35) {
				r = "MILF";
			} else if (slave.lips > 70 && slave.boobs > 2000 && slave.butt > 3) {
				r = "bimbo";
			} else if (slave.hips > 1 && slave.boobs > 2000 && slave.butt > 3 && slave.waist < 50) {
				r = "hourglass";
			} else if (slave.muscles > 95 && slave.height >= 185) {
				r = "amazon";
			} else if (slave.muscles > 30) {
				r = "musclegirl";
			} else {
				r = "slavegirl";
			}
		} else if (slave.dick === 0 && slave.balls === 0 && slave.vagina === -1) {
			r = "neuter";
		} else if (slave.dick === 0 && slave.vagina === -1) {
			r = "ballslave";
		} else {
			r = "slave";
		}

		if (slave.visualAge < 13) {
			if (slave.actualAge < 3) {
				if (slave.actualAge < 1) {
					r = "baby " + r;
				} else {
					r = "toddler " + r;
				}
			} else {
				if (slave.genes === "XY" && slave.vagina === -1) {
					r = "shota " + r;
				} else {
					r = "loli " + r;
				}
			}
		}

		if (slave.geneticQuirks.albinism === 2) {
			r = `albino ${r}`;
		}

		if (slave.dick > 9 && slave.balls > 9 && slave.boobs > 12000) {
			r = `hyper ${r}`;
		}

		if (slave.boobs > 4000 && slave.lactation > 0) {
			if (slave.physicalAge < 13) {
				r = `${r} calf`;
			} else {
				r = `${r} cow`;
			}
		} else if (slave.lactation > 0) {
			r = `milky ${r}`;
		}

		if (slave.boobs > 20000) {
			r = `supermassive titted ${r}`;
		} else if (slave.boobs > 10000) {
			r = `giant titted ${r}`;
		} else if (slave.boobs > 4000) {
			r = `huge titted ${r}`;
		} else if (slave.boobs > 1000) {
			r = `busty ${r}`;
		}

		if (slave.dick > 5 && slave.balls > 5) {
			r = `womb filling ${r}`;
		} else if (slave.dick > 5) {
			r = `well hung ${r}`;
		}

		if (slave.butt >= 12) {
			r = `colossal assed ${r}`;
		} else if (slave.butt >= 10) {
			r = `massive assed ${r}`;
		} else if (slave.butt >= 8) {
			r = `fat assed ${r}`;
		} else if (slave.butt >= 6) {
			r = `bottom heavy ${r}`;
		} else if (slave.butt >= 4) {
			r = `big bottomed ${r}`;
		}

		if (slave.weight > 10 && slave.weight < 100 && slave.boobs > 5000 && slave.butt > 5 && slave.hips >= 2 && slave.bellyPreg >= 30000 && slave.counter.births >= 10) {
			r = `${r} fertility goddess`;
		} else if (slave.counter.births >= 6) {
			r = `${r} broodmother`;
		} else if (slave.counter.births >= 3) {
			r = `${r} breeder`;
		}

		if (slave.indenture > -1) {
			r = `indentured ${r}`;
		}

		if (slave.preg > slave.pregData.normalBirth / 4 && slave.pregKnown === 1) {
			r = `pregnant ${r}`;
		} else if (slave.bellyFluid >= 5000) {
			r = `bloated ${r}`;
		} else if (slave.belly >= 5000) {
			r = `gravid ${r}`;
		}

		if (slave.fuckdoll > 0) {
			r = `${r} fuckdoll`;
		}
	} else {
		r = "slave"; /* I don't tihnk there is an 'else'? */
		if ((slave.dick === 0) && (slave.vagina === -1)) {
			/* NULLS */
			r = "null";
			if ((slave.lactation > 0) && (slave.boobs > 2000)) {
				r = `${r} cow`;
			} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
				r = `${r} bimbo `;
			} else if (slave.boobs > 6000) {
				r = `${r} boob`;
			} else if (slave.butt > 6) {
				r = `${r} ass`;
			} else if ((slave.muscles > 30) && (slave.height < 185)) {
				r = `${r} muscle`;
			}
			if (slave.visualAge > 55) {
				r = `${r}GILF`;
			} else if (slave.visualAge > 35) {
				r = `${r}MILF`;
			} else if (slave.visualAge >= 25) {
				r = `${r}slave`;
			} else {
				r = `${r}girl`;
			}
		}

		if ((slave.dick === 0) && (slave.vagina !== -1)) {
			/* FEMALES */
			if (slave.visualAge > 55) {
				r = "GILF";
			} else if (slave.visualAge > 35) {
				r = "MILF";
			} else if (slave.visualAge >= 25) {
				r = "slave";
			} else {
				r = "slavegirl";
			}
			if ((slave.muscles > 30) && (slave.height < 185)) {
				r = `muscle ${r}`;
			} else if ((slave.lactation > 0) && (slave.boobs > 2000)) {
				r = `${r} cow`;
			} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
				r = `${r} bimbo`;
			} else if (slave.boobs > 6000) {
				r = `boob${r}`;
			} else if (slave.butt > 6) {
				r = `ass${r}`;
			}
		}

		if ((slave.dick !== 0) && (slave.vagina !== -1)) {
			if (slave.balls > 0) {
				/* FUTANARI: cock & balls & vagina */
				r = "futanari ";
			} else {
				/* FUTANARI: cock & vagina */
				r = "futa ";
			}
			if ((slave.lactation > 0) && (slave.boobs > 2000)) {
				r = `${r}cow`;
			} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
				r = `${r}bimbo `;
			} else if (slave.boobs > 6000) {
				r = `${r}boob`;
			} else if (slave.butt > 6) {
				r = `${r}ass`;
			} else if ((slave.muscles > 30) && (slave.height < 185)) {
				r = `${r}muscle`;
			}
			if (slave.visualAge > 55) {
				r = `${r}GILF`;
			} else if (slave.visualAge > 35) {
				r = `${r}MILF`;
			} else if (slave.visualAge >= 25) {
				r = `${r}slave`;
			} else {
				r = `${r}girl`;
			}
			if (slave.dick > 5 && slave.balls > 5 && slave.boobs > 5000) {
				r = `hyper ${r}`;
			}
		}

		if ((slave.dick !== 0) && (slave.vagina === -1) && (slave.balls > 0) && (slave.boobs > 300) && (slave.butt > 2)) {
			/* SHEMALES: cock & balls, T&A above minimum */
			if (slave.visualAge > 55) {
				r = "sheGILF";
			} else if (slave.visualAge > 35) {
				r = "sheMILF";
			} else if (slave.visualAge >= 25) {
				r = "shemale";
			} else {
				r = "tgirl";
			}
			if ((slave.muscles > 30) && (slave.height < 185)) {
				r = `muscle${r}`;
			} else if ((slave.lactation > 0) && (slave.boobs > 2000)) {
				r = `${r} cow`;
			} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
				r = `${r} bimbo`;
			} else if (slave.boobs > 6000) {
				r = `topheavy ${r}`;
			} else if (slave.butt > 6) {
				r = `bottomheavy ${r}`;
			}
		}

		if ((slave.boobs < 300) || (slave.butt < 2)) {
			if ((slave.dick !== 0) && (slave.vagina === -1) && (slave.balls > 0)) {
				if ((slave.shoulders < 1) || (slave.muscles <= 30)) {
					if ((slave.faceShape === "masculine") || (slave.faceShape === "androgynous")) {
						/* SISSIES: feminine shoulders or muscles, masculine faces */
						if (slave.visualAge > 55) {
							r = "sissyGILF";
						} else if (slave.visualAge > 35) {
							r = "sissyMILF";
						} else {
							r = "sissy";
						}
					} else {
						/* TRAPS: feminine shoulders or muscles, feminine faces */
						if (slave.visualAge > 55) {
							r = "trapGILF";
						} else if (slave.visualAge > 35) {
							r = "trapMILF";
						} else if (slave.visualAge >= 25) {
							r = "trap";
						} else {
							r = "trapgirl";
						}
					}
					if (slave.lactation > 0) {
						r = `${r} cow`;
					} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
						r = `${r} bimbo`;
					}
				}
			}
		}

		if ((slave.boobs < 300) || (slave.butt < 2)) {
			if ((slave.dick !== 0) && (slave.vagina === -1) && (slave.balls > 0)) {
				if ((slave.shoulders > 1) || (slave.muscles >= 30)) {
					/* BITCHES: masculine shoulders or muscles */
					r = "bitch";
					if ((slave.muscles > 30) && (slave.height < 185)) {
						r = `muscle${r}`;
					} else if (slave.lactation > 0) {
						r = `${r}cow`;
					} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
						r = `bimbo ${r}`;
					}
					if (slave.visualAge > 55) {
						r = `aged ${r}`;
					} else if (slave.visualAge > 35) {
						r = `mature ${r}`;
					} else if (slave.visualAge < 25) {
						r = `young ${r}`;
					}
				}
			}
		}

		if ((slave.dick !== 0) && (slave.vagina === -1) && (slave.balls === 0)) {
			r = "dick";
			if (slave.visualAge > 55) {
				r = `${r}GILF`;
			} else if (slave.visualAge > 35) {
				r = `${r}MILF`;
			} else if (slave.visualAge >= 25) {
				r = `${r}slave`;
			} else {
				r = `${r}girl`;
			}
			if ((slave.muscles > 30) && (slave.height < 185)) {
				r = `muscle${r}`;
			} else if ((slave.lactation > 0) && (slave.boobs > 2000)) {
				r = `${r} cow`;
			} else if ((slave.boobsImplant > 0) && (slave.buttImplant > 0)) {
				r = `${r} bimbo`;
			} else if (slave.boobs > 6000) {
				r = `boob ${r}`;
			} else if (slave.butt > 6) {
				r = `ass ${r}`;
			}
		}

		if ((slave.muscles > 30) && (slave.height > 185)) {
			r = `amazon ${r}`;
		} else if ((slave.muscles < 30) && (slave.height > 185)) {
			r = `statuesque ${r}`;
		} else if ((slave.boobs < 800) && (slave.height < 150)) {
			r = `petite ${r}`;
		} else if ((slave.boobs > 800) && (slave.height < 150)) {
			r = `shortstack ${r}`;
		}

		if (slave.counter.births >= 5) {
			r = `${r} broodmother`;
		} else if (slave.counter.births >= 2) {
			r = `${r} breeder`;
		}

		if (slave.geneticQuirks.albinism === 2) {
			r = `albino ${r}`;
		}

		if (slave.indenture > -1) {
			r = `indentured ${r}`;
		}

		if (slave.preg > slave.pregData.normalBirth / 4 && slave.pregKnown === 1) {
			r = `pregnant ${r}`;
		} else if (slave.bellyFluid >= 5000) {
			r = `bloated ${r}`;
		} else if (slave.belly >= 5000) {
			r = `gravid ${r}`;
		}

		if (slave.fuckdoll > 0) {
			r = `${r} fuckdoll`;
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.DegradingName = function DegradingName(slave) {
	const leadershipPosition = [
		"be the Attendant",
		"be the Matron",
		"be the Stewardess",
		"be the Milkmaid",
		"be the Farmer",
		"be the DJ",
		"be your Concubine",
		"be the Madam",
		"be the Schoolteacher",
		"be the Wardeness",
		"be the Nurse",
		"be your Head Girl",
		"guard you",
		"recruit girls"
	];
	const names = [];
	const suffixes = [];

	if (slave.fuckdoll > 0) {
		slave.slaveName = `Fuckdoll No. ${slave.ID}`;
		slave.slaveSurname = 0;
	} else if (slave.assignment === "work in the dairy" && V.dairyRestraintsSetting >= 2) {
		slave.slaveName = `Bioreactor No. ${slave.ID}`;
		slave.slaveSurname = 0;
	} else {
		if (V.seeRace === 1) {
			switch (slave.race) {
				case "white":
					names.push("Pale", "White");
					break;
				case "asian":
					names.push("Asian", "Yellow");
					break;
				case "latina":
					names.push("Brown", "Latina");
					break;
				case "black":
					names.push("Black", "Dark");
					break;
				case "pacific islander":
					names.push("Islander", "Pacific", "Sea");
					break;
				case "malay":
					names.push("Cinnamon", "Pinoy", "Spice");
					break;
				case "southern european":
					names.push("Mediterranean", "Olive");
					break;
				case "amerindian":
					names.push("Indian", "Reservation");
					break;
				case "semitic":
					names.push("Semite", "Semitic");
					break;
				case "middle eastern":
					names.push("Arab", "Sand");
					break;
				case "indo-aryan":
					names.push("Brown", "Indian");
					break;
				case "mixed race":
					names.push("Mixed", "Mulatto", "Mutt");
					break;
			}
		}
		names.push(slave.hColor);
		if (!hasAnyEyes(slave)) {
			names.push("Blind", "Eyeless", "Sightless");
		}
		if (slave.hears === -2) {
			names.push("Deaf", "Earless", "Unhearing");
		}
		if (slave.boobs >= 2000) {
			suffixes.push("Boob", "Boobs", "Titty");
		}
		if (slave.boobs < 500 && slave.butt < 3) {
			names.push("Girly", "Slim", "Thin");
		}
		if (slave.boobs < 300) {
			names.push("Flat");
		}
		if (slave.anus > 2 || slave.vagina > 2) {
			names.push("Gaping", "Hallway", "Slit", "Wideopen");
		}
		if (slave.weight > 160) {
			names.push("Blimp", "Cow", "Fat", "Fatass", "Whale");
		} else if (slave.weight > 30) {
			names.push("Chubby", "Fat", "Whale");
		} else if (slave.weight <= -30) {
			names.push("Bony", "Rail", "Skinny");
		}
		if (slave.muscles > 30) {
			names.push("Huge", "Muscles", "Ripped", "Strong");
		}
		if (slave.fetishKnown === 1) {
			if (slave.fetish === "buttslut") {
				names.push("Anal", "Sodomy");
			}
			if (slave.fetish === "cumslut") {
				names.push("Cum", "Dicksuck", "Sucker");
			}
			if (slave.fetish === "humiliation") {
				names.push("Rape");
			}
			if (slave.fetish === "masochist") {
				names.push("Pain", "Rape", "Struggle");
			}
			if (slave.fetish === "pregnancy") {
				names.push("Fertile");
			}
		}
		if (slave.boobs * slave.lactation > 1000) {
			names.push("Creamy", "Milky");
			suffixes.push("Cow");
		}
		if (slave.skill.oral <= 30 && slave.skill.anal <= 30) {
			names.push("Cheap", "Fail", "Gutter");
		}
		if (slave.nipples === "fuckable") {
			names.push("Nipplefuck", "Nipplecunt");
		} else if (slave.nipples !== "tiny" && slave.nipples !== "cute") {
			names.push("Pointy", "Titclit");
			suffixes.push("Nipples");
		}
		if (slave.visualAge > 35) {
			names.push("Mature");
			suffixes.push("Cougar", "MILF");
		} else if (slave.visualAge < 25) {
			names.push("Girly", "Thin", "Young");
		}
		if (isAmputee(slave)) {
			names.push("Stumpy");
			suffixes.push("Stumpy");
		}
		if (slave.boobsImplant > 1000 || slave.buttImplant > 3) {
			names.push("Fake", "Plastic", "Silicone");
		}
		if (slave.dick > 5 && slave.balls > 5) {
			names.push("Potent");
			suffixes.push("Cannon", "Daddy");
		}
		if (slave.preg > slave.pregData.normalBirth / 1.33) {
			if (slave.broodmother === 2) {
				names.push("Bursting", "Seeded");
				suffixes.push("Factory", "Nursery");
			} else if (slave.broodmother === 1) {
				names.push("Bloated", "Stuffed");
				suffixes.push("Breeder", "Factory");
			}
		}
		if (slave.bellyPreg >= 450000) {
			names.push("Bulging", "Squirming");
		}
		if (slave.bellyPreg >= 5000) {
			names.push("Preg");
			suffixes.push("Belly", "Mommy");
		}
		if (slave.belly > 150000) {
			suffixes.push("Balloon");
		}
		if (slave.belly > 1500) {
			suffixes.push("Belly");
		}
		if (slave.dick > 0) {
			if (slave.dick > 4) {
				names.push("Dangle", "Hung");
				suffixes.push("Cock", "Dick");
			}
			if (slave.balls === 0) {
				names.push("Cut", "Gelded", "Soft");
			} else {
				names.push("Erect", "Hard", "Stiff");
			}
		}
		if (slave.dick === 1) {
			names.push("Micro", "Tiny");
			suffixes.push("Bitch");
		}
		if (slave.height >= 185) {
			names.push("Tall", "Top");
			suffixes.push("Tower");
		} else if (slave.height < 150) {
			names.push("Stumpy", "Tiny");
			suffixes.push("Shortstack", "Stumpy");
		}
		if (slave.skill.whoring > 95) {
			names.push("Money", "Street");
			suffixes.push("Whore");
		}
		if (slave.skill.entertainment > 95) {
			names.push("Easy", "Club");
			suffixes.push("Slut");
		}
		if (slave.skill.oral > 95) {
			names.push("Suck");
			suffixes.push("Throat");
		}
		if (slave.skill.vaginal > 95) {
			suffixes.push("Channel", "Kegel", "Pussy");
		}
		if (slave.skill.anal > 95) {
			suffixes.push("Asspussy", "Sphincter");
		}
		if (slave.intelligence + slave.intelligenceImplant > 50) {
			names.push("Bright", "Clever", "Smart");
			if (slave.intelligenceImplant >= 15) {
				names.push("College", "Graduate", "Nerdy");
			}
		} else if (slave.intelligence + slave.intelligenceImplant < -50) {
			names.push("Cretin", "Dumb", "Retarded", "Stupid");
		}
		if (slave.vagina === 1 && slave.skill.vaginal <= 10) {
			names.push("Fresh", "New", "Tight");
		}
		if (slave.devotion < -75) {
			names.push("Angry", "Biter", "Caged");
		} else if (slave.devotion < -50) {
			names.push("Cell", "Cuffs");
		} else if (slave.devotion < -20) {
			names.push("Bag", "Box");
		} else if (slave.devotion <= 20) {
			names.push("Sad", "Whiner");
		} else if (slave.devotion > 50) {
			names.push("Prize");
			if (slave.visualAge > 35) {
				names.push("Queen");
			} else if (slave.visualAge < 25) {
				names.push("Princess");
			}
		}
		if (slave.trust < -50) {
			names.push("Screaming");
			suffixes.push("Sobber");
		} else if (slave.trust < -20) {
			names.push("Crying");
			suffixes.push("Meat", "Tears", "Thing", "Weeper");
		} else if (slave.trust < 20) {
			names.push("Begging");
		}

		if (slave.dick === 0) {
			if (slave.vagina === -1) {
				suffixes.push("Null");
			} else {
				if (slave.visualAge < 25) {
					suffixes.push("Girl");
				}
			}
		} else {
			if (slave.vagina !== -1) {
				suffixes.push("Futa");
			} else {
				if (slave.balls > 0) {
					if (slave.boobs > 300 && slave.butt > 2) {
						/* SHEMALES: cock & balls, T&A above minimum */
						suffixes.push("Shemale");
					} else {
						if (slave.shoulders < 1 && slave.muscles <= 30) {
							if (slave.faceShape === "masculine" || slave.faceShape === "androgynous") {
								/* SISSIES: feminine shoulders or muscles, masculine faces */
								suffixes.push("Sissy");
							} else {
								/* TRAPS: feminine shoulders or muscles, feminine faces */
								suffixes.push("Trap");
							}
						} else {
							/* BITCHES: masculine shoulders or muscles */
							suffixes.push("Bitch");
						}
					}
				} else {
					if (slave.visualAge > 35) {
						suffixes.push("DickMILF");
					} else if (slave.visualAge >= 25) {
						suffixes.push("Dickslave");
					} else {
						suffixes.push("Dickgirl");
					}
				}
			}
		}
		if (slave.anus > 0) {
			suffixes.push("Anus", "Asshole", "Backdoor", "Butt", "Butthole");
		}
		if (slave.anus === 1) {
			suffixes.push("Tightass", "Tightbutt");
		}
		if (slave.vagina > 0) {
			suffixes.push("Cunt", "Pussy", "Vagina");
		}
		if (slave.boobs < 500 && slave.butt < 3 && slave.dick > 0) {
			suffixes.push("Bitch", "Bottom", "Sissy", "Trap");
		}
		if (slave.energy > 95) {
			suffixes.push("Fuck", "Fuckaddict", "Nympho", "Sexaddict");
		}
		if (slave.fetishKnown === 1) {
			if (slave.fetish === "humiliation") {
				suffixes.push("Rapebait", "Showgirl");
			}
			if (slave.fetish === "submissive") {
				suffixes.push("Bottom", "Fuckee", "Rapebait");
			}
			if (slave.fetish === "dom") {
				suffixes.push("Dom", "Fucker", "Top");
			}
			if (slave.fetish === "pregnancy") {
				suffixes.push("Breeder", "Mommy");
			}
			if (slave.fetish === "boobs") {
				suffixes.push("Boob", "Boobie", "Tit", "Titty");
			}
		}
		if (slave.counter.births >= 2) {
			suffixes.push("Breeder");
			if (slave.counter.births >= 5) {
				suffixes.push("Broodmother");
			}
		}
		if (slave.areolae > 2) {
			suffixes.push("Areolas", "Headlights");
		}
		if (slave.lips > 40) {
			suffixes.push("Lips", "Pillows");
		}
		if (slave.labia > 1) {
			suffixes.push("Curtains", "Flower", "Lips");
		}
		if (slave.breedingMark === 1 && V.propOutcome === 1 && V.arcologies[0].FSRestart !== "unset") {
			suffixes.push("Breeder", "Oven", "Womb");
		}
		if (slave.butt > 5) {
			suffixes.push("Ass", "Bottom", "Butt");
		}
		if (slave.vagina === 0) {
			suffixes.push("Virgin");
		}

		slave.slaveName = jsEither(names);
	}
	if (leadershipPosition.includes(slave.assignment)) {
		switch (slave.assignment) {
			case "be the Attendant":
				slave.slaveName = jsEither(["Bath", "Spa"]);
				break;
			case "be the Matron":
				slave.slaveName = jsEither(["Matron", "Nursery"]);
				break;
			case "be the Stewardess":
				slave.slaveName = jsEither(["Maid", "Servant"]);
				break;
			case "be the Milkmaid":
				if (V.cumSlaves > 3) {
					slave.slaveName = jsEither(["Fucker", "Milker"]);
				} else {
					slave.slaveName = jsEither(["Dairy", "Farm"]);
				}
				break;
			case "be the Farmer":
				slave.slaveName = jsEither(["Farmer", "Farmhand"]);
				break;
			case "be the DJ":
				slave.slaveName = jsEither(["Bass", "Booth"]);
				break;
			case "be your Concubine":
				slave.slaveName = jsEither(["Bed", "Master"]);
				break;
			case "be the Madam":
				slave.slaveName = jsEither(["Madam", "Pimp"]);
				break;
			case "be the Schoolteacher":
				slave.slaveName = jsEither(["Classroom", "Teacher"]);
				break;
			case "be the Wardeness":
				slave.slaveName = jsEither(["Jail", "Prison"]);
				break;
			case "be the Nurse":
				slave.slaveName = jsEither(["Clinic", "Nurse"]);
				break;
			case "be your Head Girl":
				slave.slaveName = jsEither(["Chief", "Head"]);
				break;
			case "guard you":
				slave.slaveName = jsEither(["Battle", "Guard"]);
				break;
			case "recruit girls":
				slave.slaveName = jsEither(["Cam", "Recruiter"]);
				break;
		}
	}
	const surname = jsEither(suffixes);
	if (typeof surname === "string" && surname.toLowerCase() === slave.slaveName.toLowerCase()) {
		DegradingName(slave);
	}
	slave.slaveName = capFirstChar(slave.slaveName);
	slave.slaveSurname = surname;
};

window.PaternalistName = function PaternalistName(slave) {
	if (slave.slaveName.search("Miss") === -1) {
		if (slave.slaveName.search("Ms.") === -1) {
			if (slave.slaveName.search("Mrs.") === -1) {
				if (slave.relationship > 4) {
					slave.slaveName = ("Mrs. " + slave.slaveName);
				} else if (slave.actualAge > 24) {
					slave.slaveName = ("Ms. " + slave.slaveName);
				} else {
					slave.slaveName = ("Miss " + slave.slaveName);
				}
			}
		}
	}
};

window.SlaveSort = function() {
	const comparators = {
		Aassignment: (a, b) => a.assignment < b.assignment ? -1 : 1,
		Dassignment: (a, b) => a.assignment > b.assignment ? -1 : 1,
		Aname: (a, b) => a.slaveName < b.slaveName ? -1 : 1,
		Dname: (a, b) => a.slaveName > b.slaveName ? -1 : 1,
		Aseniority: (a, b) => b.weekAcquired - a.weekAcquired,
		Dseniority: (a, b) => a.weekAcquired - b.weekAcquired,
		AactualAge: (a, b) => a.actualAge - b.actualAge,
		DactualAge: (a, b) => b.actualAge - a.actualAge,
		AvisualAge: (a, b) => a.visualAge - b.visualAge,
		DvisualAge: (a, b) => b.visualAge - a.visualAge,
		AphysicalAge: (a, b) => a.physicalAge - b.physicalAge,
		DphysicalAge: (a, b) => b.physicalAge - a.physicalAge,
		Adevotion: (a, b) => a.devotion - b.devotion,
		Ddevotion: (a, b) => b.devotion - a.devotion,
		AID: (a, b) => a.ID - b.ID,
		DID: (a, b) => b.ID - a.ID,
		AweeklyIncome: (a, b) => a.lastWeeksCashIncome - b.lastWeeksCashIncome,
		DweeklyIncome: (a, b) => b.lastWeeksCashIncome - a.lastWeeksCashIncome
	};

	return {
		slaves: sortSlaves,
		IDs: sortIDs,
		indices: sortIndices
	};

	/** @param {App.Entity.SlaveState[]} [slaves] */
	function sortSlaves(slaves) {
		slaves = slaves || V.slaves;
		slaves.sort(_comparator());
		if (slaves === V.slaves) {
			V.slaveIndices = slaves2indices();
		}
	}

	/** @param {number[]} [slaveIDs] */
	function sortIDs(slaveIDs) {
		const slaves = State.variables.slaves;
		const slaveIndices = State.variables.slaveIndices;
		const cmp = _comparator();
		slaveIDs = slaveIDs || slaves.map(s => s.ID);
		slaveIDs.sort((IDa, IDb) => cmp(slaveIndices[IDa], slaveIndices[IDb]));
	}

	/** @param {number[]} [slaveIdxs] */
	function sortIndices(slaveIdxs) {
		const slaves = State.variables.slaves;
		const cmp = _comparator();
		slaveIdxs = slaveIdxs || [...slaves.keys()];
		slaveIdxs.sort((ia, ib) => cmp(slaves[ia], slaves[ib]));
	}

	/**
	 * @callback slaveComparator
	 * @param {App.Entity.SlaveState} a
	 * @param {App.Entity.SlaveState} b
	 * @returns {number}
	 */
	/** @returns {slaveComparator} */
	function _comparator() {
		return comparators[(V.sortSlavesOrder === "ascending" ? 'A' : 'D') + V.sortSlavesBy];
	}
}();

/**
 * @param {App.Entity.SlaveState[]} slaves
 */
window.slaveSortMinor = function slaveSortMinor(slaves) {
	slaves.sort((a, b) => a.slaveName < b.slaveName ? -1 : 1);
};

window.MenialPopCap = function MenialPopCap() {
	let r = "";

	let popCap = 500 * (1 + V.building.findCells(cell => cell instanceof App.Arcology.Cell.Manufacturing && cell.type === "Pens").length);

	let overMenialCap = V.menials + V.fuckdolls + V.menialBioreactors - popCap;
	if (overMenialCap > 0) {
		const price = menialSlaveCost(-overMenialCap);
		if (V.menials > 0) {
			if (V.menials > overMenialCap) {
				cashX((overMenialCap * price), "menialTrades");
				V.menialDemandFactor -= overMenialCap;
				V.menials -= overMenialCap;
				overMenialCap = 0;
				r += "You don't have enough room for all your menials and are obliged to sell some.";
			} else {
				cashX((V.menials * price), "menialTrades");
				V.menialDemandFactor -= V.menials;
				overMenialCap -= V.menials;
				V.menials = 0;
				r += "You don't have enough room for your menials and are obliged to sell them.";
			}
		}
		if (overMenialCap > 0 && V.fuckdolls > 0) {
			if (V.fuckdolls > overMenialCap) {
				cashX(overMenialCap * (price * 2), "menialTrades");
				V.menialDemandFactor -= overMenialCap;
				V.fuckdolls -= overMenialCap;
				overMenialCap = 0;
				r += "You don't have enough room for all your Fuckdolls and are obliged to sell some.";
			} else {
				cashX(V.fuckdolls * (price * 2), "menialTrades");
				V.menialDemandFactor -= V.fuckdolls;
				overMenialCap -= V.fuckdolls;
				V.fuckdolls = 0;
				r += "You don't have enough room for your Fuckdolls and are obliged to sell them.";
			}
		}
		if (overMenialCap > 0 && V.menialBioreactors > 0) {
			cashX(overMenialCap * (price - 100), "menialTrades");
			V.menialDemandFactor -= overMenialCap;
			V.menialBioreactors -= overMenialCap;
			r += "You don't have enough room for all your menial bioreactors and are obliged to sell some.";
		}
	}
	V.PopCap = popCap;
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} amount
 * @returns {string}
 */
window.faceIncrease = function faceIncrease(slave, amount) {
	const pronouns = getPronouns(slave);
	const his = pronouns.possessive;
	const His = capFirstChar(his);
	let r = "";
	if (slave.face <= -95) {
		r += `<span class="green">${His} face is no longer horrifying,</span> and is now merely ugly.`;
	} else if (slave.face <= -40 && slave.face + amount > -40) {
		r += `<span class="green">${His} face is no longer ugly,</span> and is now merely unattractive.`;
	} else if (slave.face <= -10 && slave.face + amount > -10) {
		r += `<span class="green">${His} face is no longer unattractive,</span> and is now somewhat tolerable.`;
	} else if (slave.face <= 10 && slave.face + amount > 10) {
		r += `<span class="green">${His} face is now decently attractive,</span> rather than merely tolerable.`;
	} else if (slave.face <= 40 && slave.face + amount > 40) {
		r += `<span class="green">${His} face is now quite beautiful,</span> rather than merely pretty.`;
	} else if (slave.face <= 95 && slave.face + amount > 95) {
		r += `<span class="green">${His} face is now perfect.</span> It's difficult to imagine how it could be any more beautiful.`;
	}
	slave.face = Math.clamp(slave.face + amount, -100, 100);
	if (slave.face > 95) {
		slave.face = 100;
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.Deadliness = function Deadliness(slave) {
	let deadliness = 2;

	if (slave.skill.combat > 0) {
		deadliness += 2;
	}

	if (setup.bodyguardCareers.includes(slave.career)) {
		deadliness += 1;
	} else if (slave.skill.bodyguard >= V.masteredXP) {
		deadliness += 1;
	}

	if (slave.muscles > 30 && slave.muscles <= 95) {
		deadliness += 1;
	} else if (slave.muscles > 95 && slave.height >= 185) {
		deadliness += 2;
	} else if (slave.muscles > 95) {
		deadliness -= 1;
	} else if (slave.muscles < -95) {
		deadliness -= 20;
	} else if (slave.muscles < -30) {
		deadliness -= 7;
	} else if (slave.muscles < -5) {
		deadliness -= 3;
	}

	if (slave.height >= 170) {
		deadliness += 1;
	}

	if (slave.health.condition > 50) {
		deadliness += 1;
	} else if (slave.health.condition < -50) {
		deadliness -= 1;
	}

	if (slave.health.illness > 3) {
		deadliness -= 3;
	} else if (slave.health.illness > 1) {
		deadliness -= 2;
	} else if (slave.health.illness > 0) {
		deadliness -= 1;
	}

	if (slave.boobs > 4000) {
		deadliness -= 2;
	} else if (slave.boobs > 2000) {
		deadliness -= 1;
	}

	if (slave.butt > 6) {
		deadliness -= 1;
	}

	if (slave.hips > 2) {
		deadliness -= 1;
	}

	if (slave.weight > 190) {
		deadliness -= 20;
	} else if (slave.weight > 160) {
		deadliness -= 10;
	} else if (slave.weight > 130) {
		deadliness -= 3;
	} else if (slave.weight > 30 || slave.weight < -10) {
		deadliness -= 1;
	}

	if (slave.bellyFluid >= 10000) {
		deadliness -= 3;
	} else if (slave.bellyFluid >= 5000) {
		deadliness -= 2;
	} else if (slave.bellyFluid >= 2000) {
		deadliness -= 1;
	}

	if (slave.pregKnown === 1 || slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500) {
		if (slave.belly >= 750000) {
			deadliness -= 50;
		} else if (slave.belly >= 600000) {
			deadliness -= 25;
		} else if (slave.belly >= 450000) {
			deadliness -= 15;
		} else if (slave.belly >= 300000) {
			deadliness -= 10;
		} else if (slave.belly >= 150000) {
			deadliness -= 8;
		} else if (slave.belly >= 100000) {
			deadliness -= 7;
		} else if (slave.belly >= 10000) {
			deadliness -= 3;
		} else if (slave.belly >= 5000) {
			deadliness -= 2;
		} else {
			deadliness -= 1;
		}
	}

	if (slave.labor === 1) {
		deadliness -= 15;
	} else if (slave.preg >= slave.pregData.normalBirth && slave.pregControl !== "labor suppressors") {
		deadliness -= 5;
	}

	if (slave.balls >= 15) {
		deadliness -= 1;
	}

	if (slave.dick >= 10) {
		deadliness -= 1;
	}

	deadliness -= getLimbCount(slave, 0) * 5;
	deadliness -= getLimbCount(slave, 2) * 0.25;
	deadliness -= getLimbCount(slave, 3) * 0.25;
	deadliness -= getLimbCount(slave, 4) * 0.25;
	deadliness += getLimbCount(slave, 5) * 1.25;
	deadliness += getLimbCount(slave, 6) * 2.5;
	if (hasBothLegs(slave) && !canWalk(slave)) {
		deadliness -= 20;
	}

	if (!canSee(slave)) {
		deadliness -= 8;
	} else if (!canSeePerfectly(slave)) {
		deadliness -= 1;
	}

	if (!canHear(slave)) {
		deadliness -= 4;
	} else if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs")) {
		deadliness -= 1;
	}

	if (slave.tail === "combat") {
		deadliness += 2;
	}

	if (slave.health.tired > 90) {
		deadliness -= 10;
	} else if (slave.health.tired > 60) {
		deadliness -= 3;
	} else if (slave.health.tired > 30) {
		deadliness -= 1;
	}

	return Math.max(deadliness, 1);
};

/** Is the slave ready to retire?
 * @param {SlaveState} slave
 * @returns {boolean}
 */
window.retirementReady = function RetirementReady(slave) {
	// indentured slaves don't retire, they expire
	if (slave.indenture >= 0) {
		return false;
	}

	// retirement by age
	if (V.PhysicalRetirementAgePolicy !== 1 && slave.actualAge >= V.retirementAge) {
		return true;
	} else if (V.PhysicalRetirementAgePolicy === 1 && slave.physicalAge >= V.retirementAge) {
		return true;
	}

	// retirement by milestone
	if (V.SexMilestoneRetirement === 1 && (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.penetrative + slave.counter.mammary) > V.retirementSex) {
		return true;
	}
	if (V.MilkMilestoneRetirement === 1 && slave.counter.milk > V.retirementMilk) {
		return true;
	}
	if (V.CumMilestoneRetirement === 1 && slave.counter.cum > V.retirementCum) {
		return true;
	}
	if (V.BirthsMilestoneRetirement === 1 && slave.counter.births > V.retirementBirths) {
		return true;
	}
	if (V.KillsMilestoneRetirement === 1 && slave.counter.pitKills > V.retirementKills) {
		return true;
	}

	// no retirement for you
	return false;
};

/** Is the slave a shelter slave?
 * @param {SlaveState} slave
 * @returns {boolean}
 */
window.isShelterSlave = function isShelterSlave(slave) {
	return (typeof slave.origin === "string" && slave.origin.includes("Slave Shelter"));
};
