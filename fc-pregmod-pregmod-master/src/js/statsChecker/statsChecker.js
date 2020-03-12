/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isSexuallyPure = function(slave) {
	if (!slave) {
		return null;
	}
	return (slave.vagina < 1 && slave.anus < 1 && !slave.counter.anal && !slave.counter.vaginal && !slave.counter.oral && !slave.counter.mammary && !slave.counter.penetrative && !slave.counter.publicUse);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isSlaveAvailable = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.assignment === "be your agent") {
		return false;
	} else if (slave.assignment === "live with your agent") {
		return false;
	} else if (slave.assignment === "be confined in the arcade") {
		return false;
	} else if (slave.assignment === "work in the dairy" && State.variables.dairyRestraintsSetting >= 2) {
		return false;
	}
	return true;
};

window.SlaveStatsChecker = (function() {
	return {
		checkForLisp: hasLisp,
		isModded: isModded,
		isUnmodded: isUnmodded,
		modScore: modScore
	};

	/* call as SlaveStatsChecker.checkForLisp() */
	function hasLisp(slave) {
		if (State.variables.disableLisping === 1 || !canTalk(slave)) {
			return false;
		}
		return (slave.lips > 70 || (slave.lipsPiercing + slave.tonguePiercing > 2) || slave.teeth === "gapped");
	}

	/** call as SlaveStatsChecker.modScore()
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number} // I think
	 */
	function modScore(slave) {
		V.piercingScore = piercingScore(slave);
		V.tatScore = tatScore(slave);
		V.brandScore = brandScore(slave);
		V.scarScore = scarScore(slave);
		return V.tatScore + V.piercingScore + V.brandScore + V.scarScore;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function piercingScore(slave) {
		let score = 0;

		if (slave.earPiercing > 0) {
			score += slave.earPiercing * 0.75 - 0.5;
		}
		if (slave.nosePiercing > 0) {
			score += slave.nosePiercing * 0.75 - 0.5;
		}
		if (slave.eyebrowPiercing > 0) {
			score += slave.eyebrowPiercing * 0.75 - 0.5;
		}
		if (slave.navelPiercing > 0) {
			score += slave.navelPiercing * 0.75 - 0.5;
		}
		if (slave.corsetPiercing > 0) {
			score += slave.corsetPiercing * 0.75 + 0.5;
		}
		if (slave.nipplesPiercing > 0) {
			score += slave.nipplesPiercing * 0.75 - 0.25;
		}
		if (slave.areolaePiercing > 0) {
			score += slave.areolaePiercing * 0.75 + 0.5;
		}
		if (slave.lipsPiercing > 0) {
			score += slave.lipsPiercing * 0.75 - 0.25;
		}
		if (slave.tonguePiercing > 0) {
			score += slave.tonguePiercing * 0.75 - 0.25;
		}
		if (slave.clitPiercing === 3) /* smart piercing */ {
			score += 1.25;
		} else if (slave.clitPiercing > 0) {
			score += slave.clitPiercing * 0.75 - 0.25;
		}

		if (slave.vaginaPiercing > 0) {
			score += slave.vaginaPiercing * 0.75 - 0.25;
		}
		if (slave.dickPiercing > 0) {
			score += slave.dickPiercing * 0.75 - 0.25;
		}
		if (slave.anusPiercing > 0) {
			score += slave.anusPiercing * 0.75 - 0.25;
		}

		return score;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function tatScore(slave) {
		let score = 0;

		if (slave.boobsTat !== 0) {
			score += 1.25;
		}
		if (slave.buttTat !== 0) {
			score += 1.25;
		}
		if (slave.lipsTat !== 0) {
			score += 1.25;
		}
		if (slave.shouldersTat !== 0) {
			score += 1;
		}
		if (slave.backTat !== 0) {
			score += 1.25;
		}
		if (slave.armsTat !== 0) {
			score += 1;
		}
		if (slave.legsTat !== 0) {
			score += 1;
		}
		if (slave.stampTat !== 0) {
			score += 1;
		}
		if (slave.vaginaTat !== 0) {
			score += 1;
		}
		if (slave.dickTat !== 0) {
			score += 1;
		}
		if (slave.bellyTat !== 0) {
			if ((slave.preg > slave.pregData.normalBirth / 1.33 && slave.pregType >= 20) || slave.belly >= 300000) {
				score += 0.75;
			} else if ((slave.preg > slave.pregData.normalBirth / 2 && slave.pregType >= 20) || (slave.preg > slave.pregData.normalBirth / 1.33 && slave.pregType >= 10) || slave.belly >= 150000) {
				score += 1;
			} else if (slave.belly >= 10000 || slave.bellyImplant >= 8000) {
				score += 1;
			} else if ((slave.preg >= slave.pregData.normalBirth / 4 && slave.pregType >= 20) || (slave.preg > slave.pregData.normalBirth / 4 && slave.pregType >= 10) || slave.belly >= 5000) {
				score += 0.5;
			} else if (slave.belly >= 1500) {
				score += 0.25;
			} else {
				score += 0.1;
			}
		}
		if (slave.anusTat === "bleached") {
			score += 0.5;
		} else if (slave.anusTat !== 0) {
			score += 1.25;
		}
		if (slave.abortionTat > 0 || (slave.abortionTat === 0 && slave.pregKnown === 1)) {
			score += 1;
		}
		if (slave.birthsTat > 0 || (slave.birthsTat === 0 && slave.pregKnown === 1)) {
			score += 1;
		}
		return score;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function brandScore(slave) {
		let score = 0;
		score += Object.getOwnPropertyNames(slave.brand).length;
		return score;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function scarScore(slave) {
		let score = 0;
		let scars;
		if (slave.hasOwnProperty("scar")) { /* For very old saves this may not be defined yet and blocks the save from loading. */
			scars = Object.keys(slave.scar);
			for (const bodypart of scars) {
				const bodyparts = Object.keys(slave.scar[bodypart]);
				for (const kind of bodyparts) {
					score += slave.scar[bodypart][kind];
				}
			}
		}
		return score;
	}

	/**
	 * call as SlaveStatsChecker.isModded()
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	function isModded(slave) {
		const tattoos = tatScore(slave);
		const piercings = piercingScore(slave);
		const brands = brandScore(slave);
		const scars = scarScore(slave);
		const mods = piercings + tattoos + scars;

		return (mods > 15 || (piercings > 8 && tattoos > 5) || brands > 1);
	}

	/**
	 * call as SlaveStatsChecker.isUnmodded()
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	function isUnmodded(slave) {
		const tattoos = tatScore(slave);
		const piercings = piercingScore(slave);
		const brands = brandScore(slave);
		const scars = scarScore(slave);

		return (!isModded(slave) && slave.corsetPiercing === 0 && piercings < 3 && tattoos < 2 && brands === 0 && scars <= 1);
	}
}());

/**
 * Returns if slave is considered slim or not by arcology standards.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isSlim = function(slave) {
	let slim = false;
	const ArcologyZero = State.variables.arcologies[0];

	if (ArcologyZero.FSSlimnessEnthusiastLaw === 1) {
		return (slimLawPass(slave) === 1);
	}
	if ((slave.boobs < 500) && (slave.butt < 3)) {
		if ((slave.muscles <= 30) && (ArcologyZero.FSPhysicalIdealist === "unset") && (slave.weight <= 10) && (ArcologyZero.FSHedonisticDecadence === "unset")) {
			slim = true;
		} else if (ArcologyZero.FSPhysicalIdealist !== "unset") {
			if ((ArcologyZero.FSPhysicalIdealistStrongFat === 1) && (slave.weight <= 30)) {
				slim = true;
			} else if (slave.weight <= 10) {
				slim = true;
			}
		} else if ((ArcologyZero.FSHedonisticDecadence !== "unset") && (slave.weight <= 30)) {
			if (ArcologyZero.FSHedonisticDecadenceStrongFat === 1) {
				slim = true;
			} else if (slave.muscles <= 30) {
				slim = true;
			}
		}
	}
	return slim;
};

/**
 * Returns if slave is considered a fashionable body shape or not by arcology laws.
 * @param {App.Entity.SlaveState} slave
 * @returns {number} 1: yes, 0: no
 */
window.genderLawPass = function(slave) {
	let genderLawPass = 1;

	const arcology = V.arcologies[0];
	if (arcology.FSPhysicalIdealist === "unset" && arcology.FSHedonisticDecadenceStrongFat === 0 && slave.muscles > 30) {
		/* muscle check */
		genderLawPass = 0;
	}
	if (arcology.FSHedonisticDecadence !== "unset" || arcology.FSPhysicalIdealistStrongFat === 1) {
		/* weight check */
		if (slave.weight > 130 || slave.weight <= -30) {
			genderLawPass = 0;
		}
	} else if (Math.abs(slave.weight) > 30) {
		genderLawPass = 0;
	}
	if (arcology.FSAssetExpansionist !== "unset") {
		if (slave.boobs < 500 || slave.boobs > 1600 || slave.butt < 3 || slave.butt > 6) {
			genderLawPass = 0;
		}
	} else if (slave.boobs < 500 || slave.boobs > 800 || slave.butt < 3 || slave.butt > 4) {
		genderLawPass = 0;
	}

	return genderLawPass;
};

/**
 * Returns if slave is considered slim or not by Slimness Enthusiast Law.
 * @param {App.Entity.SlaveState} slave
 * @returns {number} 1: yes, 0: no
 */
window.slimLawPass = function(slave) {
	let slimLawPass = 0;
	const ArcologyZero = V.arcologies[0];

	if (ArcologyZero.FSSlimnessEnthusiastLaw === 1) {
		if ((slave.boobs < 300) && (slave.butt <= 1) && (slave.waist <= 10)) {
			if ((ArcologyZero.FSPhysicalIdealist === "unset") && (ArcologyZero.FSHedonisticDecadenceStrongFat === 0) && (slave.muscles > 30)) {
				/* muscle check*/
				slimLawPass = 0;
			} else if ((ArcologyZero.FSHedonisticDecadence !== "unset") || (ArcologyZero.FSPhysicalIdealistStrongFat === 1)) {
				/* weight check*/
				if (slave.weight > 30) {
					slimLawPass = 0;
				}
			} else if (slave.weight > 10) {
				slimLawPass = 0;
			} else {
				slimLawPass = 1;
			}
		}
	}

	return slimLawPass;
};

/**
 * Returns if slave is considered an acceptable height by arcology standards.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.heightPass = function(slave) {
	let arcology = V.arcologies[0];

	if (arcology.FSPetiteAdmiration !== "unset") {
		if (arcology.FSPetiteAdmirationLaw2 === 1) {
			if (slave.height < Height.mean(slave) - 5) {
				return true;
			}
		} else {
			if (slave.height < 160) {
				return true;
			}
		}
	} else if (arcology.FSStatuesqueGlorification !== "unset") {
		if (arcology.FSStatuesqueGlorificationLaw2 === 1) {
			if (slave.height + heelLength(slave) > Height.mean(slave) + 5) {
				return true;
			}
		} else {
			if (slave.height + heelLength(slave) >= 170) {
				return true;
			}
		}
	}
	return false;
};

/**
 * Returns the height, in cm, of a slave's heels
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.heelLength = function(slave) {
	switch (slave.shoes) {
		case "pumps":
			// 2 inch heels
			return 5;
		case "platform shoes":
			// 3 inch platform, no heels
			return 8;
		case "heels":
			// 5 inch heels
			return 13;
		case "extreme heels":
			// 8 inch heels
			return 21;
		case "platform heels":
			// 8 inches, but not painful like extremes (3 inch platforms)
			return 21;
		case "extreme platform heels":
			// 12 inches! 8 inch heel, 4 inch platform
			return 30;
	}
	return 0;
};

/**
 * Returns slave bimbo body degree (FSIntellectualDependencyLawBeauty).
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.bimboScore = function(slave) {
	let degree = 0;
	let mods = SlaveStatsChecker.modScore(slave);

	if (slave.lips > 70) {
		degree++;
	}
	if ((slave.lipsImplant / slave.lips) >= 0.60) {
		degree++;
	}
	if (slave.boobs >= 2000) {
		degree++;
		if (slave.boobs >= 10000) {
			degree++;
		}
	}
	if ((slave.boobsImplant / slave.boobs) >= 0.60) {
		degree++;
	}
	if (slave.butt > 4) {
		degree++;
		if (slave.butt > 10) {
			degree++;
		}
	}
	if ((slave.buttImplant / slave.butt) >= 0.60) {
		degree++;
	}
	if (slave.belly >= 1500) {
		degree++;
		if (slave.belly >= 20000) {
			degree++;
		}
	}
	if (slave.waist <= -60) {
		degree++;
	}
	if (slave.hips > 1) {
		degree++;
		if (slave.hips > 2) {
			degree++;
		}
	}
	if (slave.dick > 3 && canPenetrate(slave)) {
		degree++;
		if (slave.balls > 5) {
			degree++;
		}
	}
	if (slave.hLength >= 100) {
		degree++;
	}
	if (slave.makeup > 1 && slave.nails > 1) {
		degree++;
	}
	if (mods >= 10) {
		degree++;
	}
	if (V.piercingScore > 5) {
		degree++;
	}
	if (V.tatScore > 3) {
		degree++;
	}
	if (setup.highHeels.includes(slave.shoes)) {
		degree++;
	}
	if (slave.skin === "sun tanned" || slave.skin === "spray tanned") {
		degree++;
	}
	if (setup.sluttyClothes.includes(slave.clothes)) {
		degree++;
	}

	// degree can go far higher than the max to allow various FS combinations to take advantage.
	return Math.clamp(degree, 0, 6);
};

/**
 * Returns if slave is considered stacked (big T&A) or not.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isStacked = function(slave) {
	return (slave.butt > 4) && (slave.boobs > 800);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isXY = function(slave) {
	return (slave.dick > 0);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isYoung = function(slave) {
	return (slave.visualAge < 30);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isPreg = function(slave) {
	return ((slave.bellyPreg >= 5000) || (slave.bellyImplant >= 5000));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isNotPreg = function(slave) {
	return (!isPreg(slave) && (slave.belly < 100) && (slave.weight < 30) && !setup.fakeBellies.includes(slave.bellyAccessory));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isPure = function(slave) {
	return ((slave.boobsImplant === 0) && (slave.buttImplant === 0) && (slave.waist >= -95) && (slave.lipsImplant === 0) && (slave.faceImplant < 30) && (slave.bellyImplant === -1) && (Math.abs(slave.shouldersImplant) < 2) && (Math.abs(slave.hipsImplant) < 2));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isSurgicallyImproved = function(slave) {
	return ((slave.boobsImplant > 0) && (slave.buttImplant > 0) && (slave.waist < -10) && (slave.lipsImplant > 0));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isFullyPotent = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.dick > 0 && slave.balls > 0 && slave.ballType !== "sterile" && slave.hormoneBalance < 100 && slave.drugs !== "hormone blockers" && slave.pubertyXY === 1) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canGetPregnant = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.preg === -1) { /* contraceptives check */
		return false;
	} else if (!isFertile(slave)) { /* check other fertility factors */
		return false;
	} else if ((slave.ovaries === 1) && (canDoVaginal(slave))) {
		return true;
	} else if ((slave.mpreg === 1) && (canDoAnal(slave))) {
		/* pregmod */
		return true;
	}
	return false;
};

/** contraceptives (.preg === -1) do not negate this function
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isFertile = function(slave) {
	if (!slave) {
		return null;
	}

	if (slave.womb.length > 0 && slave.geneticQuirks.superfetation < 2) {
		/* currently pregnant without superfetation */
		return false;
	} else if (slave.broodmother > 0) {
		/* currently broodmother */
		return false;
	} else if (slave.preg < -1) {
		/* sterile */
		return false;
	} else if (slave.pregWeek < 0) {
		/* postpartum */
		return false;
	} else if (slave.pubertyXX === 0) {
		/* pregmod start */
		return false;
	} else if (slave.ovaryAge >= 47) {
		return false;
	} else if (slave.inflation > 2) {
		return false;
	} else if (slave.bellyImplant !== -1) {
		return false;
	} else if (slave.mpreg === 1 || slave.ovaries === 1) {
		if (slave.womb.length > 0) { // superfetation route
			if (slave.fertPeak !== 0) {
				return false;
			}
		}
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canAchieveErection = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.dick <= 0) {
		return false;
	} else if (slave.dick < 11 && slave.drugs === "priapism agents") {
		return true;
	} else if (slave.dick > 6) {
		return false;
	} else if (slave.aphrodisiacs > 1 || (slave.inflationType === "aphrodisiac" && slave.inflation >= 2)) {
		return true;
	} else if (slave.ballType === "sterile") {
		return false;
	} else if ((slave.balls > 0 ? slave.hormoneBalance < 100 : slave.hormoneBalance <= -100) && slave.drugs !== "hormone blockers") {
		return true;
	} else if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canPenetrate = function(slave) {
	if (!slave) {
		return null;
	} else if (!canAchieveErection(slave)) {
		return false;
	} else if (slave.chastityPenis === 1) {
		return false;
	} else if (slave.dick > 7) {
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canSee = function(slave) {
	if (!slave) {
		return null;
	}
	return (getBestVision(slave)) > 0;
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canSeePerfectly = function(slave) {
	if (!canSee(slave)) {
		return false;
	}

	if (getBestVision(slave) === 2 && (slave.eyewear === "blurring glasses") || (slave.eyewear === "blurring contacts")) {
		// could see perfectly, but being blurred
		return false;
	} else if (getBestVision(slave) < 2 && !(slave.eyewear === "corrective glasses" || slave.eyewear === "corrective contacts")) {
		// can't see perfectly and not corrected
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canHear = function(slave) {
	if (!slave) {
		return null;
	}
	return ((slave.hears > -2) && (slave.earwear !== "deafening ear plugs"));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canSmell = function(slave) {
	if (!slave) {
		return null;
	}
	return (slave.smells > -1);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canTaste = function(slave) {
	if (!slave) {
		return null;
	}
	return (slave.tastes > -1);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canHold = function(slave) {
	if (!slave) {
		return null;
	}
	return hasAnyArms(slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canWalk = function(slave) {
	if (!slave) {
		return null;
	} else if (!hasBothLegs(slave)) {
		return false;
	} else if (tooFatSlave(slave)) {
		return false;
	} else if (tooBigBreasts(slave)) {
		return false;
	} else if (tooBigDick(slave)) {
		return false;
	} else if (tooBigBalls(slave)) {
		return false;
	} else if (tooBigButt(slave)) {
		return false;
	} else if (tooBigBelly(slave)) {
		return false;
	} else if (slave.heels === 1 && !setup.highHeels.includes(slave.shoes)) {
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} checkLanguage Does a bad accent count as being unable to speak?
 * @returns {boolean}
 */
window.canTalk = function(slave, checkLanguage = true) {
	if (!slave) {
		return null;
	} else if (checkLanguage && slave.accent > 2) {
		return false;
	} else if (slave.voice === 0) {
		return false;
	} else if (slave.lips > 95) {
		return false;
	} else if (slave.collar === "dildo gag") {
		return false;
	} else if (slave.collar === "massive dildo gag") {
		return false;
	} else if (slave.collar === "ball gag") {
		return false;
	} else if (slave.collar === "bit gag") {
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canDoAnal = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.chastityAnus === 1) {
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.canDoVaginal = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.vagina < 0) {
		return false;
	} else if (slave.chastityVagina === 1) {
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.tooFatSlave = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.weight > 190 + (slave.muscles / 5) && slave.physicalAge >= 18) {
		return true;
	} else if (slave.weight > 130 + (slave.muscles / 20) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.weight > 160 + (slave.muscles / 15) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.weight > 185 + (slave.muscles / 10) && slave.physicalAge < 18) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.tooBigBreasts = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.boobs > 30000 + (slave.muscles * 100) && slave.physicalAge >= 18) {
		return true;
	} else if (slave.boobs > 5000 + (slave.muscles * 10) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.boobs > 10000 + (slave.muscles * 20) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.boobs > 20000 + (slave.muscles * 50) && slave.physicalAge < 18) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.tooBigBelly = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.belly >= 450000 + (slave.muscles * 2000) && slave.physicalAge >= 18) {
		return true;
	} else if (slave.belly >= 350000 + (slave.muscles * 1000) && slave.physicalAge >= 13) {
		return true;
	} else if (slave.belly >= 30000 + (slave.muscles * 500) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.belly >= 150000 + (slave.muscles * 800) && slave.physicalAge <= 12) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.tooBigBalls = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.balls >= 30 + (slave.muscles * 0.3) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.balls >= 60 + (slave.muscles * 0.5) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.balls >= 90 + (slave.muscles * 0.7)) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.tooBigDick = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.dick >= 20 + (slave.muscles * 0.1) && slave.physicalAge <= 3 && slave.dick !== 0) {
		return true;
	} else if (slave.dick >= 45 + (slave.muscles * 0.3) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.dick >= 68 + (slave.muscles * 0.4)) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.tooBigButt = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.butt > 10 && slave.physicalAge <= 3) {
		return true;
	} else if (slave.butt > 14 && slave.physicalAge <= 12) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isVegetable = function(slave) {
	if (!slave) {
		return false;
	}
	return (slave.fetish === "mindbroken");
};


/**
 * Returns the hair color the slave was (or would be) born with.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getGeneticHairColor = function(slave) {
	if (slave.geneticQuirks.albinism === 2) {
		return slave.albinismOverride.hColor;
	}
	return slave.origHColor;
};

/**
 * Returns the skin color the slave was (or would be) born with.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getGeneticSkinColor = function(slave) {
	if (slave.geneticQuirks.albinism === 2) {
		return slave.albinismOverride.skin;
	}
	return slave.origSkin;
};
