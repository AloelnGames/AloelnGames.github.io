window.generateRelatedSlave = (function() {
	/**
	 * Generate a very similar relative for an existing slave (for use in Household Liquidators, for example).
	 * @param {SlaveState} slave - the source relative
	 * @param {string} relationship - the relationship that the new relative has with the source.  Currently supports "daughter", "sibling", "twin".
	 * @param {bool} oppositeSex - set to true if the new relative should be the opposite sex of the old one (otherwise it will be the same sex).
	 * @returns {SlaveState} - new relative
	 */
	function generateRelative(slave, relationship, oppositeSex=false) {
		let relative = prepareClone(slave);
		if (relationship === "twin") {
			makeTwin(relative);
		} else if (relationship === "daughter") {
			makeDaughter(relative);
		} else if (relationship === "sibling") {
			makeSibling(relative);
		}
		if (oppositeSex) {
			if (slave.genes === "XX") {
				changeSexToXY(relative);
			} else if (slave.genes === "XY") {
				changeSexToXX(relative);
			} else {
				// we'll assume futa are their own opposites and don't need tweaking
			}
		}
		if (relative.actualAge < slave.actualAge || oppositeSex) { // not used for same-sex twins
			ageFixup(relative);
		}
		return relative;
	}

	/**
	 * Clone the original slave and do some common preparations to it.
	 * @param {SlaveState} slave - the source relative
	 * @returns {SlaveState} - the new relative
	 */
	function prepareClone(slave) {
		let relative = clone(slave);

		// match surnames
		const surname = slave.slaveSurname;
		const birthSurname = slave.birthSurname;
		nationalityToName(relative);
		relative.slaveSurname = surname;
		relative.birthSurname = birthSurname;

		// regenerate accent
		nationalityToAccent(relative);

		// fuzz trust/devotion
		relative.devotion += random(-5, 5);
		relative.oldDevotion = relative.devotion;
		relative.trust += random(-5, 5);
		relative.oldTrust = relative.trust;

		// fuzz attraction and energy
		relative.attrXX += random(-20, 20);
		relative.attrXX = Math.clamp(relative.attrXX, 0, 100);
		relative.attrXY += random(-20, 20);
		relative.attrXY = Math.clamp(relative.attrXX, 0, 100);
		relative.energy += random(-20, 20);

		// set ID (the original slave expects this to be their ID + 1000)
		relative.ID += 1000;

		return relative;
	}

	/**
	 * Finish configuring an identical twin
	 * @param {SlaveState} slave - the new twin
	 */
	function makeTwin(slave) {
		if (!V.familyTesting) {
			slave.relation = "twin";
			slave.relationTarget = slave.ID - 1000;
		}
	}

	/**
	 * Finish configuring a sibling
	 * @param {SlaveState} slave - the new sibling
	 */
	function makeSibling(slave) {
		if (!V.familyTesting) {
			slave.relation = "sister";
			slave.relationTarget = slave.ID - 1000;
		}

		// reduce age
		slave.actualAge -= random(2, 6);
		slave.actualAge = Math.max(slave.actualAge, V.minimumSlaveAge);
		slave.visualAge = slave.actualAge;
		slave.physicalAge = slave.actualAge;
		slave.ovaryAge = slave.actualAge;
		slave.birthWeek = random(0, 51);

		// fuzz boobs/butt
		if (slave.boobs > 200) {
			slave.boobs += either(-100, 0, 100);
		}
		if (slave.butt > 1) {
			slave.butt += random(-1, 1);
		}

		randomiseFetishFlaws(slave);
	}

	/**
	 * Finish configuring a daughter
	 * @param {SlaveState} slave - the new daughter
	 */
	function makeDaughter(slave) {
		if (!V.familyTesting) {
			slave.relation = "daughter";
			slave.relationTarget = slave.ID - 1000;
		} else {
			slave.mother = slave.genes === "XX" ? slave.ID - 1000 : 0;
			slave.father = slave.genes !== "XX" ? slave.ID - 1000 : 0;
		}

		// select age
		const parentAge = slave.actualAge;
		let maxAge = Math.min(22, Math.max(V.minimumSlaveAge, parentAge - 11));
		let minAge = Math.min(Math.max(8, V.minimumSlaveAge), maxAge);
		if (V.pedo_mode === 1) {
			minAge = V.minimumSlaveAge;
		}
		slave.actualAge = random(minAge, maxAge);
		slave.visualAge = slave.actualAge;
		slave.physicalAge = slave.actualAge;
		slave.ovaryAge = slave.actualAge;
		slave.birthWeek = random(0, 51);

		// daughter always has less devotion/trust
		slave.devotion -= 10;
		slave.trust -= 10;

		// daughter always has less boobs/butt
		slave.boobs -= 100;
		slave.butt -= 1;

		// fuzz boobs/butt
		if (slave.boobs > 200) {
			slave.boobs += either(-100, 100);
		}
		if (slave.butt > 1) {
			slave.butt += random(-1, 1);
		}

		// daughter has never had children and is likely a virgin
		slave.vagina = either(0, 0, 0, 1);
		slave.counter.birthsTotal = 0;

		randomiseFetishFlaws(slave);
	}

	/**
	 * Randomize fetish and flaws
	 * @param {SlaveState} slave
	 */
	function randomiseFetishFlaws(slave) {
		slave.fetishStrength = random(0, 90);
		slave.fetish = either("buttslut", "cumslut", "dom", "humiliation", "masochist", "none", "none", "none", "none", "none", "none", "pregnancy", "sadist", "submissive");
		slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "devout", "gluttonous", "hates men", "hates women", "hates women", "liberated", "masochist", "none", "none", "none", "odd");
		if (slave.behavioralFlaw === "devout") {
			slave.sexualFlaw = either("apathetic", "none", "repressed", "shamefast");
		} else {
			slave.sexualFlaw = either("apathetic", "crude", "hates anal", "hates oral", "hates penetration", "idealistic", "judgemental", "none", "none", "none", "none", "repressed", "shamefast");
		}
	}

	/**
	 * Fix age-related factors including physical immaturity, height, pregnancy, and health
	 * Must be after age is recomputed, obviously; should not be needed for twins
	 * @param {SlaveState} slave - the new relative
	 */
	function ageFixup(slave) {
		// adjust for age
		if (slave.physicalAge <= 15) {
			ageAdjustYoungRelative(slave);
		}
		slave.height = Math.trunc(Height.random(slave));

		// reset pregnancy
		WombFlush(slave);
		if (V.arcologies[0].FSRepopulationFocusSMR === 1 && canGetPregnant(slave)) {
			slave.preg = random(1, 38);
			slave.pregWeek = slave.preg;
			slave.pregKnown = 1;
			slave.pregType = setPregType(slave);
			if (slave.vagina === 0) {
				slave.vagina = 1;
			}
		}
		SetBellySize(slave);

		// reset health
		setHealth(slave, slave.health.condition);
	}

	/**
	 * When generating a younger relative by cloning an older one (for example, for Household Liquidators),
	 * clamp certain physical parameters of the younger relative appropriately for their physical age.
	 * Generally these adjustments should match the age limiters found in generateNewSlave.js.
	 * @param {SlaveState} slave - the slave to adjust
	 */
	function ageAdjustYoungRelative(slave) {
		/* breast size */
		const origBoobs = slave.boobs;
		if (slave.physicalAge <= 10) {
			slave.boobs = Math.clamp(slave.boobs, 0, 100);
		} else if (slave.physicalAge <= 12) {
			slave.boobs = Math.clamp(slave.boobs, 0, 300);
		} else if (slave.physicalAge <= 14) {
			slave.boobs = Math.clamp(slave.boobs, 0, 400);
		} else if (slave.physicalAge <= 15) {
			slave.boobs = Math.clamp(slave.boobs, 0, 450);
		}

		/* if we've reduced breast size because of age, reapply minimum weight modifiers */
		if (origBoobs > slave.boobs && State.variables.weightAffectsAssets !== 0) {
			if (slave.weight > 190) {
				slave.boobs += 300;
			} else if (slave.weight > 160) {
				slave.boobs += 200;
			} else if (slave.weight > 30) {
				slave.boobs += 100;
			}
		}

		/* if we've managed to *increase* breast size, just put it back */
		if (origBoobs < slave.boobs) {
			slave.boobs = origBoobs;
		}

		/* breast shape - preserve if it would have been valid, otherwise reset to normal (don't reroll) */
		const AllowedBoobShapes = [];
		if (slave.boobs > 250 && slave.boobs < 800) {
			AllowedBoobShapes.push("perky");
			AllowedBoobShapes.push("downward-facing");
		}
		if (slave.boobs > 400 && slave.boobs < 1200) {
			AllowedBoobShapes.push("torpedo-shaped");
			AllowedBoobShapes.push("wide-set");
		}
		if (!AllowedBoobShapes.includes(slave.boobShape)) {
			slave.boobShape = "normal";
		}

		/* voice */
		if (slave.physicalAge <= 16 && slave.voice <= 1) {
			slave.voice = 2;
		}

		/* XX genitals */
		if (slave.physicalAge < 20 && slave.vagina > 1) {
			slave.vagina = 1;
		}

		if (slave.physicalAge <= 13 && slave.clit > 1) {
			slave.clit = 1;
		}

		if (slave.physicalAge <= 13 && slave.labia > 1) {
			slave.labia = 1;
		} else if (slave.physicalAge <= 15 && slave.labia > 2) {
			slave.labia = 2;
		}

		/* XY genitals */
		if (slave.physicalAge <= 13) {
			if (slave.geneticQuirks.wellHung === 2 && slave.physicalAge >= 8 && slave.dick > 4) {
				slave.dick = 4;
			} else if (slave.dick > 3) {
				slave.dick = 3;
			}
			if (slave.balls > 3) {
				slave.balls = 3;
				slave.scrotum = slave.balls;
			}
		} else if (slave.physicalAge <= 15) {
			if (slave.geneticQuirks.wellHung === 2 && slave.dick > 5) {
				slave.dick = 5;
			} else if (slave.dick > 3) {
				slave.dick = 3;
			}
			if (slave.balls > 4) {
				slave.balls = 4;
				slave.scrotum = slave.balls;
			}
		}

		/* teeth */
		if (slave.physicalAge < 6) {
			slave.teeth = "baby";
		} else if (slave.physicalAge < 12) {
			slave.teeth = "mixed";
		}

		/* reset puberty status */
		generatePuberty(slave);
	}

	/**
	 * Give a slave a realistic chance to activate a sexlinked genetic quirk which her opposite-sex relative was only a carrier for.
	 * @param {SlaveState} slave - the slave to adjust
	 * @param {string} quirk - the sex-linked quirk to test
	 */
	function activateSexlinkedGeneticQuirk(slave, quirk) {
		if (slave.geneticQuirks[quirk] === 1) {
			if (random(1, 4) > 3) {
				slave.geneticQuirks[quirk] = 2;
			}
		}
	}

	/**
	 * Make a slave a carrier for a genetic sexlinked quirk which her opposite-sex relative had active.
	 * @param {SlaveState} slave - the slave to adjust
	 * @param {string} quirk - the sex-linked quirk to test
	 */
	function deactivateSexlinkedGeneticQuirk(slave, quirk) {
		if (slave.geneticQuirks[quirk] === 2) {
			slave.geneticQuirks[quirk] = 1;
		}
	}

	/**
	 * Changes the new relative's sex from XY to XX.
	 * @param {SlaveState} slave - the slave to adjust
	 */
	function changeSexToXX(slave) {
		slave.genes = "XX";
		slave.pronoun = App.Data.Pronouns.Kind.female;

		// activate/deactivate sexlinked genetic quirks
		["wellHung"].forEach((q) => deactivateSexlinkedGeneticQuirk(slave, q));
		["fertility", "hyperFertility", "macromastia", "gigantomastia"].forEach((q) => activateSexlinkedGeneticQuirk(slave, q));

		// alter body proportions
		slave.hips = Math.clamp(slave.hips + 1, -2, 2);
		slave.butt++;
		slave.waist = Math.clamp(slave.waist - random(15, 25), -100, 100);
		slave.face = Math.clamp(slave.face + random(15, 25), -100, 100);
		slave.boobs = either(200, 300, 400, 450, 500, 550, 600, 700);

		// alter genitals
		slave.dick = 0;
		slave.balls = 0;
		slave.scrotum = 0;
		slave.prostate = 0;
		slave.vagina = 1; // no virgins here?
		slave.clit = either(0, 0, 0, 0, 0, 0, 1, 1, 2);
		slave.labia = either(0, 0, 0, 1, 1, 1, 1, 2, 2, 3);
		slave.ovaries = 1;
		slave.preg = -1; // might get pregnant from repop check later on anyway

		// swap attraction
		[slave.attrXX, slave.attrXY] = [slave.attrXY, slave.attrXX];

		// adjust voice and hair
		slave.voice = Math.min(3, slave.voice + 1);
		slave.hLength = 60;

		// rotate hormone balance around a center of 10 (60 becomes -40 and vice versa)
		slave.hormoneBalance -= (slave.hormoneBalance - 10) * 2;

		// regenerate piercings (would be nice to just call generateXXMods here)
		slave.earPiercing = jsEither([0, 1]);
		slave.nosePiercing = jsEither([0, 0, 0, 1]);
		slave.eyebrowPiercing = jsEither([0, 0, 0, 0, 0, 1]);
		slave.clitPiercing = jsEither([0, 0, 0, 0, 0, 1]);
		slave.lipsPiercing = jsEither([0, 0, 0, 0, 0, 1]);
		slave.navelPiercing = jsEither([0, 0, 0, 1]);
		slave.nipplesPiercing = jsEither([0, 0, 0, 0, 1]);
	}

	/**
	 * Changes the new relative's sex from XX to XY.
	 * @param {SlaveState} slave - the slave to adjust
	 */
	function changeSexToXY(slave) {
		slave.genes = "XY";
		slave.pronoun = App.Data.Pronouns.Kind.male;

		// activate/deactivate sexlinked genetic quirks
		["wellHung"].forEach((q) => activateSexlinkedGeneticQuirk(slave, q));
		["fertility", "hyperFertility", "macromastia", "gigantomastia"].forEach((q) => deactivateSexlinkedGeneticQuirk(slave, q));

		// alter body proportions
		slave.hips = Math.clamp(slave.hips - 1, -2, 2);
		slave.butt = Math.max(0, slave.butt - 1);
		slave.waist = Math.clamp(slave.waist + random(15, 25), -100, 100);
		slave.face = Math.clamp(slave.face - random(15, 25), -100, 100);
		slave.boobs = either(100, 200);

		// alter genitals
		slave.vagina = -1;
		slave.clit = 0;
		slave.labia = 0;
		slave.ovaries = 0;
		slave.preg = -2;
		if (slave.geneticQuirks.wellHung === 2) {
			slave.dick = either(5, 5, 6);
		} else {
			slave.dick = either(1, 2, 2, 2, 3, 3, 3, 4, 4, 5);
		}
		slave.balls = either(1, 2, 2, 2, 3, 3, 3, 4, 4, 5);
		slave.scrotum = slave.balls;
		slave.prostate = 1;

		// swap attraction
		[slave.attrXX, slave.attrXY] = [slave.attrXY, slave.attrXX];

		// adjust voice and hair
		slave.voice = Math.max(1, slave.voice - 1);
		slave.hLength = 10;

		// rotate hormone balance around a center of 10 (60 becomes -40 and vice versa)
		slave.hormoneBalance -= (slave.hormoneBalance - 10) * 2;

		// regenerate piercings (would be nice to just call generateXYMods here)
		slave.earPiercing = jsEither([0, 0, 0, 1]);
		slave.nosePiercing = jsEither([0, 0, 0, 0, 1]);
		slave.eyebrowPiercing = jsEither([0, 0, 0, 0, 0, 1]);
		slave.clitPiercing = jsEither([0, 0, 0, 0, 0, 1]);
		slave.lipsPiercing = jsEither([0, 0, 0, 0, 0, 1]);
		slave.navelPiercing = jsEither([0, 0, 0, 0, 1]);
		slave.nipplesPiercing = jsEither([0, 0, 0, 0, 1]);
	}

	return generateRelative;
})();
