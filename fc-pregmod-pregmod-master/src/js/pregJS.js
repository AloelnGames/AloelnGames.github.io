/* Major props to the anons who worked together to forge the Super Pregnancy Project. Let your legacy go unforgotten.*/
window.getPregBellySize = function(s) {
	let targetLen;
	let gestastionWeek = s.preg;
	let fetuses = s.pregType;
	let phi = 1.618;

	if (gestastionWeek <= 32) {
		targetLen = ((0.00006396 * Math.pow(gestastionWeek, 4)) - (0.005501 * Math.pow(gestastionWeek, 3)) + (0.161 * Math.pow(gestastionWeek, 2)) - (0.76 * gestastionWeek) + 0.208);
	} else if (gestastionWeek <= 106) {
		targetLen = ((-0.0000004675 * Math.pow(gestastionWeek, 4)) + (0.0001905 * Math.pow(gestastionWeek, 3)) - (0.029 * Math.pow(gestastionWeek, 2)) + (2.132 * gestastionWeek) - 16.575);
	} else {
		targetLen = ((-0.00003266 * Math.pow(gestastionWeek, 2)) + (0.076 * gestastionWeek) + 43.843);
	}

	let bellySize = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((targetLen / 2), 3)) * fetuses);
	return bellySize;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.bellyAdjective = function(slave) {
	if (slave.belly >= 1500) {
		if (slave.belly >= 1000000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'unfathomably distended, brimming with life';
			} else {
				return `unfathomable`;
			}
		} else if (slave.belly >= 750000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'monolithic bulging';
			} else {
				return `monolithic`;
			}
		} else if (slave.belly >= 600000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'titanic bulging';
			} else {
				return `titanic`;
			}
		} else if (slave.belly >= 450000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'gigantic bulgy';
			} else {
				return `gigantic`;
			}
		} else if (slave.belly >= 300000) {
			return 'massive';
		} else if (slave.belly >= 100000) {
			return 'giant';
		} else if (slave.belly >= 15000) {
			return 'huge';
		} else if (slave.belly >= 10000) {
			return 'big';
		} else {
			return `swollen`;
		}
	}
	return "";
};

/* calculates and returns expected ovum count during conception*/
window.setPregType = function(actor) {
	/* IMHO rework is possible. Can be more interesting to play, if this code will take in account more body conditions - age, fat, food, hormone levels, etc. */

	let ovum = jsRandom(actor.pregData.normalOvaMin, actor.pregData.normalOvaMax); // for default human profile it's always 1.
	let fertilityStack = 0; // adds an increasing bonus roll for stacked fertility drugs

	/* Suggestion for better animal pregnancy support - usage of another variable then ovum for fertility drugs bonus, and then adding actor.pregData.drugsEffect multiplier to it before adding to ovum. Example:

		let bonus = 0;

		... (code below where ovum changed to bonus)

		bonus *= actor.pregData.drugsEffect;
		ovum += bonus;

	*/

	if (actor.broodmother < 1) { // Broodmothers should be not processed here. Necessary now.
		if (typeof actor.readyOva === "number" && actor.readyOva !== 0) {
			ovum = actor.readyOva; // just single override; for delayed impregnation cases
		} else if (actor.ID === -1) {
			if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
				if (actor.fertDrugs === 1) {
					ovum += jsEither([2, 3, 3, 3, 3, 4, 4, 5]);
				} else {
					ovum += jsEither([1, 1, 2, 2, 3, 3, 4]);
				}
				if (actor.forcedFertDrugs > 0) {
					ovum += jsEither([3, 3, 4, 4, 5]);
				}
			} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
				if (actor.fertDrugs === 1) {
					ovum += jsEither([1, 2, 2, 2, 2, 3, 3, 4]);
				} else {
					ovum += jsEither([0, 1, 1, 1, 1, 1, 2, 3]);
				}
				if (actor.forcedFertDrugs > 0) {
					ovum += jsEither([2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4]);
				}
			} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
				if (actor.fertDrugs === 1) {
					ovum += jsEither([1, 1, 2, 2, 2, 2, 3, 3]);
				} else {
					ovum += jsEither([0, 0, 0, 1, 1, 1, 1, 1, 1, 2]);
				}
				if (actor.forcedFertDrugs > 0) {
					ovum += jsEither([1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4]);
				}
			} else {
				if (actor.fertDrugs === 1) {
					ovum += jsEither([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3]);
				} else {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
				}
				if (actor.forcedFertDrugs > 0) {
					ovum += jsEither([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4]);
				}
			}
			ovum = Math.clamp(ovum, 0, 8);
		} else {
			if (actor.eggType === "horse" || actor.eggType === "cow") {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1]);
					fertilityStack += 0.8;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					fertilityStack += 0.4;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					fertilityStack += 0.2;
				}
				if (actor.ovaImplant === "fertility") {
					fertilityStack += 0.3;
				}
				if (actor.hormones === 2) {
					fertilityStack += 0.2;
				}
				if (actor.hormoneBalance >= 200) {
					fertilityStack += 0.3;
				}
				if (actor.diet === "fertility") {
					fertilityStack += 0.3;
				}
				if (State.variables.masterSuitePregnancyFertilitySupplements === 1 && ((actor.assignment === "serve in the master suite" || actor.assignment === "be your Concubine"))) {
					fertilityStack += 0.5;
				}
				if (State.variables.reproductionFormula === 1 && (State.variables.week - actor.weekAcquired > 0)) {
					fertilityStack += 0.2;
				}
				if (actor.drugs === "super fertility drugs") {
					fertilityStack += 1.6;
				} else if (actor.drugs === "fertility drugs") {
					fertilityStack += 0.6;
				}
				fertilityStack = Math.floor(fertilityStack);
				if (State.variables.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(0, fertilityStack * 2);
					} else {
						ovum += jsRandom(0, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 4) {
							ovum = 4;
						}
					} else if (ovum > 3) {
						ovum = 3;
					}
				}
			} else if (actor.eggType === "dog") {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsEither([1, 2, 2, 3]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					ovum += jsEither([0, 1, 1, 2]);
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					ovum += jsEither([0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.ovaImplant === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.hormones === 2) {
					ovum += jsEither([0, 0, 0, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.hormoneBalance >= 200) {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.diet === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (State.variables.masterSuitePregnancyFertilitySupplements === 1 && ((actor.assignment === "serve in the master suite" || actor.assignment === "be your Concubine"))) {
					ovum += jsEither([0, 0, 0, 1, 1, 2, 2, 2, 3, 3]);
					fertilityStack++;
					fertilityStack++;
				}
				if (State.variables.reproductionFormula === 1 && (State.variables.week - actor.weekAcquired > 0)) {
					fertilityStack++;
				}
				if (actor.drugs === "super fertility drugs") {
					ovum += jsEither([1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.drugs === "fertility drugs") {
					ovum += jsEither([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3]);
					fertilityStack++;
				}
				if (State.variables.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(0, fertilityStack * 2);
					} else {
						ovum += jsRandom(0, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 8) {
							ovum = jsEither([6, 8]);
						}
					} else if (ovum > 8) {
						ovum = jsRandom(6, 8);
					}
				}
			} else if (actor.eggType === "pig") {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsRandom(4, 8);
					fertilityStack += 16;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					ovum += jsRandom(2, 6);
					fertilityStack += 10;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					ovum += jsRandom(2, 4);
					fertilityStack += 6;
				}
				if (actor.ovaImplant === "fertility") {
					ovum += jsRandom(4, 12);
					fertilityStack += 6;
				}
				if (actor.hormones === 2) {
					ovum += jsRandom(0, 4);
					fertilityStack += 3;
				}
				if (actor.hormoneBalance >= 200) {
					ovum += jsRandom(0, 4);
					fertilityStack += 3;
				}
				if (actor.diet === "fertility") {
					ovum += jsRandom(4, 10);
					fertilityStack += 6;
				}
				if (State.variables.masterSuitePregnancyFertilitySupplements === 1 && ((actor.assignment === "serve in the master suite" || actor.assignment === "be your Concubine"))) {
					ovum += jsRandom(8, 16);
					fertilityStack += 10;
				}
				if (State.variables.reproductionFormula === 1 && (State.variables.week - actor.weekAcquired > 0)) {
					fertilityStack += 2;
				}
				if (actor.drugs === "super fertility drugs") {
					ovum += jsRandom(10, 40);
					fertilityStack += 32;
				} else if (actor.drugs === "fertility drugs") {
					ovum += jsRandom(10, 20);
					fertilityStack += 16;
				}
				if (State.variables.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(fertilityStack / 2, fertilityStack * 2);
					} else {
						ovum += jsRandom(fertilityStack / 4, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 76) {
							ovum = jsEither([70, 72, 74, 76]);
						}
					} else if (ovum > 75) {
						ovum = jsRandom(60, 75);
					}
				}
			} else {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsEither([1, 2, 2, 3]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					ovum += jsEither([0, 1, 1, 2]);
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					ovum += jsEither([0, 0, 0, 0, 1]);
					fertilityStack++;
				} else {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 1]); // base chance for twins
				}
				if (actor.ovaImplant === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.hormones === 2) {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.hormoneBalance >= 200) {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.diet === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (State.variables.masterSuitePregnancyFertilitySupplements === 1 && ((actor.assignment === "serve in the master suite" || actor.assignment === "be your Concubine"))) {
					ovum += jsEither([0, 0, 0, 1, 1, 2, 2, 2, 3, 3]);
					fertilityStack++;
					fertilityStack++;
				}
				if (State.variables.reproductionFormula === 1 && (State.variables.week - actor.weekAcquired > 0)) {
					fertilityStack++;
				}
				if (actor.drugs === "super fertility drugs") {
					ovum += jsEither([1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.drugs === "fertility drugs") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3]);
					fertilityStack++;
				}
				if (State.variables.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(0, fertilityStack * 2);
					} else {
						ovum += jsRandom(0, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 12) {
							ovum = jsEither([10, 12]);
						}
					} else if (ovum > 12) {
						ovum = jsRandom(6, 12);
					}
				}
			}
		}
	}

	if (actor.geneticQuirks.superfetation === 2 && actor.womb.length > 0) {
		let ftvol = FetusGetPrediction(actor, actor.pregData.normalBirth);
		let cmvol = ftvol * actor.womb.length;
		let maxvol = actor.pregAdaptation*2000;
		if (State.variables.seeHyperPreg === 0) {
			maxvol /= 10; // without hyperpreg enabled it's limited to be roughly ten times smaller.
		}
		let freevol = maxvol - cmvol;
		let coeff = ((maxvol/actor.womb.length) / (freevol/ftvol)) / 2; // more divide to 2 is to balance for ensured 1 ova even if over limit.

		if (coeff < 0) { coeff = 0; }

		if (State.variables.seeHyperPreg !== 0) {
			coeff += jsRandom(0, fertilityStack/2); // this second chance for implantation. Should be affected only by chemical and genetic for easier implantation. Not directly related to ova count, only to body/womb condition. Raise successful implantation chance with already overfull womb. AFTER previous check.
		}

		if (ovum > coeff) {
			ovum = coeff;
		}

		/* for future, if monthly cycle will be a thing to implement, this will be useful.
		if (ovum < 0)
			ovum = jsRandom(coeff/fertilityStack, 1);
		*/
		if (ovum < 1) { ovum = 1; }

		// console.log("Name: ", actor.slaveName, "  ftvol:", ftvol, "  cmvol:", cmvol, "  maxvol:", maxvol, "  freevol:", freevol, "  coeff:", coeff, "  fertilityStack: ", fertilityStack, "  ovum: ", ovum);
	}

	return Math.ceil(ovum);
};

/*
 Penetrative ability, ability to become pregnant, and canBreed() must be checked outside of this. Designed to assume .eggType === "human".
 target is the slave to get pregnant. Also accepts the PC.
 chance is the % chance to conceive.
 hole control's the hole involved (0 - vagina, 1 - ass, 2 - both). .mpreg did this.
 fatherID is the ID of her sire or 0 if undefined.
 displayOverride is an override if defined - fatherID must be defined in this case.
*/
window.knockMeUp = function(target, chance, hole, fatherID, displayOverride) {
	let He;
	let r = ``;
	if (target.ID !== -1) {
		({He} = getPronouns(target));
	}
	if (V.seePreg !== 0) {
		// eslint-disable-next-line no-nested-ternary
		if (jsRandom(0, 99) < (chance + (V.reproductionFormula * ((target.pregSource <= 0) ? ((target.ID === -1) ? 0 : 10) : 20)))) {
			if (target.mpreg === hole) {
				if (target.pregWeek <= 0) {
					target.preg = 1;
					target.pregSource = (!fatherID ? 0 : fatherID);
					if (target.ID !== -1) {
						target.pregWeek = 1;
					}
				}

				target.pregType = setPregType(target);
				WombImpregnate(target, target.pregType, target.pregSource, 1);

				if (V.menstruation === 1) {
					//
				} else if (!displayOverride) {
					target.pregKnown = 1;
					if (target.ID === -1) {
						/* r += "<span class="lime">You have gotten pregnant.</span>"; */
					} else {
						r += `<span class="lime">${He} has become pregnant.</span>`;
					}
					if (target.geneticQuirks.superfetation === 2 && target.womb.length > 0) {
						if (V.seeHyperPreg === 1) {
							target.fertPeak = 1;
						} else {
							target.fertPeak = 4;
						}
					}
				} else {
					target.pregKnown = 1;
					if (target.geneticQuirks.superfetation === 2 && target.womb.length > 0) {
						if (V.seeHyperPreg === 1) {
							target.fertPeak = 1;
						} else {
							target.fertPeak = 4;
						}
					}
				}
			} else if (hole === 2) {
				if (target.pregWeek <= 0) {
					target.preg = 1;
					target.pregSource = (!fatherID ? 0 : fatherID);
					if (target.ID !== -1) {
						target.pregWeek = 1;
					}
				}

				target.pregType = setPregType(target);
				WombImpregnate(target, target.pregType, target.pregSource, 1);

				if (V.menstruation === 1) {
					//
				} else if (!displayOverride) {
					target.pregKnown = 1;
					if (target.ID === -1) {
						/* r += "<span class="lime">You have gotten pregnant.</span>"; */
					} else {
						r += `<span class="lime">${He} has become pregnant.</span>`;
					}
					if (target.geneticQuirks.superfetation === 2 && target.womb.length > 0) {
						if (V.seeHyperPreg === 1) {
							target.fertPeak = 1;
						} else {
							target.fertPeak = 4;
						}
					}
				} else {
					target.pregKnown = 1;
					if (target.geneticQuirks.superfetation === 2 && target.womb.length > 0) {
						if (V.seeHyperPreg === 1) {
							target.fertPeak = 1;
						} else {
							target.fertPeak = 4;
						}
					}
				}
			}
		}
	}
	return r;
};

window.getIncubatorReserved = function( /* slaves */ ) {
	return FetusGlobalReserveCount("incubator");
};

window.getNurseryReserved = function( /* slaves */ ) {
	return FetusGlobalReserveCount("nursery");
};

window.findFather = function(fatherID) {
	let father;

	father = V.slaves[V.slaveIndices[fatherID]];
	if (father === undefined) {
		if (V.incubator > 0) {
			father = V.tanks.find(s => s.ID === fatherID);
		}
	}
	if (father === undefined) {
		if (V.nursery > 0) {
			father = V.cribs.find(s => s.ID === fatherID);
		}
	}

	return father;
};

window.adjustFatherProperty = function(actor, property, newValue) {
	let father = findFather(actor.ID);
	if (father) {
		father[property] = newValue;
	}
};

/* OLD
window.adjustFatherProperty = function(actor, property, newValue) {
	let fatherIndex;

	fatherIndex = V.slaves.findIndex(function(s) { return s.ID === actor.ID; });
	if (fatherIndex > 0) {
		V.slaves[fatherIndex][property] = newValue;
	} else if (V.incubator > 0) {
		fatherIndex = V.tanks.findIndex(function(s) { return s.ID === actor.ID; });
		if (fatherIndex > 0) {
			V.tanks[fatherIndex][property] = newValue;
		}
	}
	if (fatherIndex === -1) {
		if (V.nursery > 0) {
			fatherIndex = V.cribs.findIndex(function(s) { return s.ID === actor.ID; });
			if (fatherIndex !== -1) {
				V.cribs[fatherIndex][property] = newValue;
			}
		}
	}
}
*/

/* not to be used until that last part is defined. It may become slave.boobWomb.volume or some shit */
/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getBaseBoobs = function(slave) {
	return slave.boobs - slave.boobsImplant - slave.boobsMilk - slave.boobsWombVolume;
};

/**
 * Terminate a pregnancy without birth (i.e. miscarriage/abortion), while automatically applying the correct postpartum length
 * @param {App.Entity.SlaveState} slave
 */
window.TerminatePregnancy = function(slave) {
	if (slave.bellyPreg > 1500) {
		// late term - highly fertile slaves spring back quicker
		if (slave.geneticQuirks.fertility+slave.geneticQuirks.hyperFertility >= 4) {
			slave.pregWeek = -2;
		} else if (slave.geneticQuirks.hyperFertility > 1) {
			slave.pregWeek = -3;
		} else {
			slave.pregWeek = -4;
		}
	} else if (slave.pregWeek >= 4) {
		// still early
		slave.pregWeek = -2;
	} else if (slave.pregWeek > 0) {
		// very early
		slave.pregWeek = -1;
	}
	WombFlush(slave);
	SetBellySize(slave);
};
