/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
App.Facilities.Farmyard.foodAmount = function(slave) {
	if (!slave) {
		return `Current slave is not valid. Please report this`;
	}
	let food = 150;													// kg of food produced per week by slave, before upgrades
	if (V.farmyardUpgrade.pump === 1) {
		food += 15;													// pump upgrade for farmyard
	}
	if (V.farmyardUpgrade.fertilizer === 1) {
		food += 35;													// fertilizer upgrade for farmyard
	}
	if (V.farmyardUpgrade.seeds === 1) {
		food += 65;													// seeds upgrade for farmyard
	}
	if (V.farmyardUpgrade.machinery === 1) {
		food += 65;													// machinery upgrade for farmyard
	}		
	if (V.Farmer === 0) {
		return null;
	} else {
		if (V.Farmer !== 0) {										// if a farmer is assigned
			food *= 1.1;											// TODO: expand this to account for farmer XP and skill
			if (V.Farmer.skill.farmer >= V.masteredXP) {			// if farmer is master
				food *= 1.1;
			}
		}
		if (slave.devotion > 50) {
			food *= 1.1;
		} else if (slave.devotion < -50) {
			food *= 0.8;
		}
		if (slave.muscles > 30) {									// slave is muscular or more
			food *= 1.1;
		} else if (slave.muscles <= -6) {							// slave is weak or less
			food *= 0.8;
		}
		if (slave.weight > 95) {									// slave is overweight or more
			food *= 0.9;
		} else if (slave.weight > 130) {							// slave is fat or more
			food *= 0.8;
		} else if (slave.weight > 160) {							// slave is obese or more
			food *= 0.7;
		} else if (slave.weight > 190) {							// slave is very obese or more
			food *= 0.6;
		}
		if (!canSee(slave)) {										// slave is blind
			food *= 0.6;
		} else if (!canSeePerfectly(slave)) {						// slave is nearsighted
			food *= 0.8;
		}
		if (slave.hears === -1) {									// slave is hard of hearing
			food *= 0.8;
		} else if (slave.hears < -1) {								// slave is deaf
			food *= 0.6;
		}
		food *= healthPenalty(slave);
		food = Math.trunc(food);
		food = Math.clamp(food, 1, 1000000000000000000);
		return food;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
App.Facilities.Farmyard.farmShowsIncome = function(slave) {
	// TODO: incorporate farmyardRestraints
	let arcology = V.arcologies[0];
	let cash = 100;													// TODO: this is just a placeholder
	if (!slave) {
		return null;
	} else {
		if (V.Farmer !== 0) {										// farmer is assigned
			cash *= 1.1;
			if (V.Farmer.skill.farmer >= V.masteredXP) {			// farmer is master
				cash *= 1.1;
			}
		}
		/* OPEN FS EFFECTS */
		if (arcology.FSSupremacist !== "unset") {
			if (slave.race === arcology.FSSupremacistRace) {		// slave is of supreme race
				cash *= 0.9;										// TODO: should supreme race slaves receive a penalty?
				repX(-10, "food");									// TODO: should this cause a rep loss
			}
		}
		if (arcology.FSSubjugationist !== "unset") {
			if (slave.race === arcology.FSSubjugationistRace) { 	// slave is of subjugated race
				cash *= 1.1;
				repX(10, "food");									// TODO: should this cause a rep gain?
			} else {
				cash *= 0.9;										// TODO: should unsubjugated race slaves receive a penalty?
			}
		}
		if (arcology.FSRepopulationFocus !== "unset") {
			if (slave.pregWeek > 16) {								// slave is visibly pregnant
				if (slave.eggType !== "human") {					// with a non-human
					cash *= 1.1;
				}
				cash *= 1.2;
			} else {												// slave is not visibly pregnant
				cash *= 0.8;										// TODO: should non-pregnant slaves receive a penalty?
			}
		}
		if (arcology.FSRestart !== "unset") {
			if (slave.pregWeek > 16) {								// slave is visibly pregnant
				if (slave.eggType !== "human") {					// with a non-human
					cash *= 0.9;
					repX(-15, "food");
				}
				cash *= 0.6;
				repX(-10, "food");
			}
		}
		if (arcology.FSGenderRadicalist !== "unset") {
			if (slave.dick > 0) {									// TODO: does this make sense?
				cash *= 1.1;
			} else {
				cash *= 0.8;
			}
		}
		if (arcology.FSGenderFundamentalist !== "unset") {
			if (slave.dick > 0) {
				cash *= 1.1;										// TODO: does this make sense?
			} else {
				cash *= 0.8;
			}
		}
		if (arcology.FSPaternalist !== "unset") {
			if (V.seeBestiality === 1) {
				if (V.farmyardBreeding === 1) {						// slaves are being bred
					cash *= 0.8;
				} else {											// slaves are putting on shows
					cash *= 0.9;
				}
			}
		}
		if (arcology.FSDegradationist !== "unset") {
			if (V.seeBestiality === 1) {
				if (V.farmyardBreeding === 1) {						// slaves are being bred
					cash *= 1.2;
				} else {											// slaves are putting on shows
					cash *= 1.1;
				}
			}
		}
		if (arcology.FSBodyPurist !== "unset") {
			if (slave.boobsImplant > 0) {							// slave has breast implants
				cash *= 0.9;
			}
			if (slave.buttImplant > 0) {							// slave has butt implants
				cash *= 0.9;
			}
			if (slave.faceImplant > 0) {							// slave has had facial surgery
				cash *= 0.9;
			}
			if (slave.lipsImplant > 0) {							// slave has lip implants
				cash *= 0.9;
			}
		}
		if (arcology.FSTransformationFetishist !== "unset") {
			if (slave.boobsImplant > 0) {							// slave has breast implants
				cash *= 1.1;
			}
			if (slave.buttImplant > 0) {							// slave has butt implants
				cash *= 1.1;
			}
			if (slave.faceImplant > 0) {							// slave has had facial surgery
				cash *= 1.1;
			}
			if (slave.lipsImplant > 0) {							// slave has lip implants
				cash *= 1.1;
			}
		}
		if (arcology.FSYouthPreferentialist !== "unset") {
			if (slave.visualAge > 25) {								// slave looks older than 25
				cash *= 0.8;										// TODO: not sure what age this should be
			} else {
				cash *= 1.2;
			}
		}
		if (arcology.FSMaturityPreferentialist !== "unset") {
			if (slave.visualAge > 25) {								// slave looks older than 25
				cash *= 1.2;										// TODO: not sure what age this should be
			} else {
				cash *= 0.8;
			}
		}
		if (arcology.FSSlimnessEnthusiast !== "unset") {
			if (slave.weight > 10) {								// slave is curvy or more
				cash *= 0.9;										// TODO: not sure what weight this should be
			}														// TODO: should implants affect income?
			if (slave.boobs > 799) {								// slave has larger than a D cup
				cash *= 0.9;										// TODO: should this be smaller?
			}
			if (slave.butt > 3) {									// slave has bigger than a bubble butt
				cash *= 0.9;
			}
		}
		if (arcology.FSAssetExpansionist !== "unset") {
			if (slave.weight > 10) {								// slave is curvy or more
				cash *= 1.1;										// TODO: not sure what weight this should be
			}														// TODO: should implants affect income?
			if (slave.boobs > 799) {								// slave has larger than a D cup
				cash *= 1.1;										// TODO: should this be smaller?
			}
			if (slave.butt > 3) {									// slave has bigger than a bubble butt
				cash *= 1.1;
			}
		}
		if (arcology.FSPastoralist !== "unset") {
			if (slave.boobs > 799) {								// slave has larger than a D cup
				cash *= 1.2;
			}
			if (slave.lactation > 0) {								// slave is lactating
				cash *= 1.1;
			}
		}
		if (arcology.FSPhysicalIdealist !== "unset") {
			if (slave.height > 169) {								// slave is tall or taller
				cash *= 1.1;
			} else if (slave.height < 160) {						// slave is short or shorter
				cash *= 0.9;
			}
		}
		if (arcology.FSHedonisticDecadence !== "unset") {
			if (slave.weight > 10) { 								// slave is curvy or fatter
				cash *= 1.1;
			} else if (slave.weight < -10) { 						// slave is thin or thinner
				cash *= 0.9;
			}
		}
		if (arcology.FSChattelReligionist !== "unset") { 			// TODO: I don't know what to put for this one
			if (slave.devotion < 21) { 								// if slave is careful or less
				cash *= 0.9;
			}
		}
		// TODO: should I add the ancient cultures FS?
		/* CLOSE FS EFFECTS */

		if (setup.entertainmentCareers.includes(slave.career)) {
			cash *= 1.1;
		} else if (setup.farmerCareers.includes(slave.career)) {
			cash *= 1.1;
		}
		if (slave.prestige === 1) { 								// slave is prestigious
			cash *= 1.1;
		} else if (slave.prestige === 2) { 							// slave is very prestigious
			cash *= 1.2;
		} else if (slave.prestige === 3) { 							// slave is extremely prestigious
			cash *= 1.3;
		}
		if (slave.porn.prestige === 1) { 							// slave is prestigious from porn
			cash *= 1.1;
		} else if (slave.porn.prestige === 2) { 						// slave is very prestigious from porn
			cash *= 1.2;
		} else if (slave.porn.prestige === 3) { 						// slave is extremely prestigious from porn
			cash *= 1.3;
		} 															// TODO: add relationship checks
		if (slave.face > 40) {										// slave is beautiful or more
			cash *= 1.3;
		} else if (slave.face > 10) {								// slave is very pretty or more
			cash *= 1.1;
		} else if (slave.face < -10) {								// slave is less than unattractive
			cash *= 0.9;
		} else if (slave.face < -40) {								// slave is less than ugly
			cash *= 0.7;
		}
		if (slave.devotion > 50) { 									// slave is devoted or more
			cash *= 1.1;
		} else if (slave.devotion < -50) { 							// slave is reluctant or less
			cash *= 0.8;
		}
		if (slave.trust > 50) { 									// slave is trusting or more
			cash *= 1.1;
		} else if (slave.trust < -50) { 							// slave is less than frightened
			cash *= 0.8;											// TODO: should trust be a factor?
		}
		if (slave.weight > 30) { 									// slave is curvy or more
			cash *= 0.8;											// TODO: tie in Hedonistic FS
		} else if (slave.weight < -30) { 							// slave is very thin or less
			cash *= 0.8;											// TODO: put this on a scale
		}
		if (slave.muscles > 30) { 									// slave is muscular or more
			cash *= 0.9;											// TODO: tie in height eugenics policy
		} else if (slave.muscles < -30) {							// slave is very weak or less
			cash *= 0.9;											// TODO: should this be on a scale?
		}
		if (!canSeePerfectly(slave)) {								// slaves eyesight is nearsighted or worse
			cash *= 0.9;											// TODO: should nearsighted and blind slaves receive a penalty?
		}
		if (slave.hears < 0) {										// slave is hard of hearing or less
			cash *= 0.9;											// TODO: should hard of hearing slaves receive a penalty?
		}
		if (slave.boobs > 800) {									// slave has a DD cup or bigger
			cash *= 0.9;											// TODO: would this make sense?
		}
		if (slave.butt > 4) {										// slave has an enormous butt or bigger
			cash *= 0.9;											// TODO: would this make sense?
		}
		if (slave.preg > 10) {										// slave is pregnant and showing
			cash *= 0.8;											// TODO: not sure how to incorporate pregnancy
		}															// TODO: incorporate skills
		cash *= healthPenalty(slave);
		if (slave.intelligence > 50) {								// slave is very smart or better
			cash *= 1.1;
		} else if (slave.intelligence < -50) {						// slave is very slow or less
			cash *= 0.8;
		}
		if (slave.energy <= 20) {									// slave has no sex drive
			cash *= 0.7;
		} else if (slave.energy <= 40) {							// slave has poor sex drive
			cash *= 0.8;
		} else if (slave.energy <= 60) {							// slave has average sex drive
			cash *= 0.9;
		} else if (slave.energy <= 80) {							// slave has good sex drive
			cash *= 1.1;
		} else if (slave.energy <= 95) {							// slave has powerful sex drive
			cash *= 1.2;
		} else {													// slave is a nymphomaniac
			cash *= 1.3;
		}
		if (slave.fetish === "submissive") {
			cash *= 1.1;
		} else if (slave.fetish === "humiliation") {
			cash *= 1.1;
		} else if (slave.fetish === "masochist") {
			cash *= 1.1;
		}															// TODO: tie in quirks and flaws
		return cash;
	}
};
