/**
 * @param {App.Entity.SlaveState} slave
 * @returns {Array}
 */
window.BeautyArray = (function() {
	"use strict";

	let arcology;
	let beauty;
	let retval;

	function BeautyReturn(slave) {
		arcology = V.arcologies[0];
		beauty = 0;
		retval = [];
		V.modScore = SlaveStatsChecker.modScore(slave);

		calcInitBeauty(slave);
		if (slave.fuckdoll === 0) {
			adjustBeauty("Not a fuckdoll", (30));
			calcIntelligenceBeauty(slave);
			calcFaceBeauty(slave);
			calcTeethBeauty(slave);
			calcModBeauty();
			calcCosmeticsBeauty(slave);
			calcFSNotFuckdollBeauty(slave);
			calcMiscNotFuckdollBeauty(slave);
		}
		calcHeightBeauty(slave);
		if (slave.dick > 0) {
			calcDickBeauty(slave);
		}
		if (slave.balls > 0) {
			calcBallsBeauty(slave);
		}
		calcButtBeauty(slave);
		calcHipsBeauty(slave);
		calcBoobsBeauty(slave);
		calcWeightBeauty(slave);
		calcMusclesBeauty(slave);
		calcBodyHairBeauty(slave);
		calcImplantBeauty(slave);
		if (arcology.FSRepopulationFocus > 40) {
			calcRepopulationPregBeauty(slave);
		} else if (arcology.FSRepopulationFocusPregPolicy === 1) {
			calcTrendyPregBeauty(slave);
		} else if (arcology.FSRestart > 40) {
			calcRestartPregBeauty(slave);
		}
		if (arcology.FSRepopulationFocusMilfPolicy === 1) {
			calcTrendyMilfBeauty(slave);
		}
		if (arcology.FSGenderRadicalistLawFuta !== 0) {
			calcFutaLawBeauty(slave);
		}
		calcBodyProportionBeauty(slave);
		calcVoiceBeauty(slave);
		calcLimbsBeauty(slave);
		calcPubertyBeauty(slave);
		calcFSMiscBeauty(slave);

		calcPurityBeauty(slave);
		calcPhysiqueBeauty(slave);
		if (arcology.FSSlimnessEnthusiastLaw === 1) {
			calcSlimBeauty(slave);
		}
		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			calcGenderLawBeauty(slave);
		}

		calcMultipliersBeauty(slave);

		return retval;
	}

	function adjustBeauty(text, beautyChange) {
		retval.push({text: text, value: beautyChange});
		beauty += beautyChange;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcInitBeauty(slave) {
		adjustBeauty("Base", 120);
		adjustBeauty("Waist", -(slave.waist / 20));
		adjustBeauty("Lips", (slave.lips / 10));
		adjustBeauty("Clit", (slave.clit));
		if (slave.anus > 3) {
			adjustBeauty("Anus", -(10 + (slave.anus * 2))); /* -20 */
		}
		if (slave.vagina > 3) {
			adjustBeauty("Vagina", -(10 + (slave.vagina * 2))); /* -20 */
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcIntelligenceBeauty(slave) {
		if (arcology.FSSlaveProfessionalism !== "unset") {
			adjustBeauty("Intelligence: Professional", ((arcology.FSSlaveProfessionalism / 10) * (slave.intelligence / 10))); /* 100 */
		} else if (arcology.FSIntellectualDependency !== "unset") {
			adjustBeauty("Intelligence: Intellectual Dependency", -((arcology.FSIntellectualDependency / 10) * ((slave.intelligence + slave.intelligenceImplant) / 20))); /* 65 */
		} else if (arcology.FSDegradationist !== "unset") {
			adjustBeauty("Intelligence: Degredationist", -((arcology.FSDegradationist / 10) * ((slave.intelligence + slave.intelligenceImplant) / 50))); /* 20 */
		} else {
			adjustBeauty("Intelligence: General", ((slave.intelligence + slave.intelligenceImplant) / 10)); /* -10 to 13 */
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHeightBeauty(slave) {
		if (arcology.FSPetiteAdmiration !== "unset") {
			if (arcology.FSPetiteAdmirationLaw2 === 1) {
				if (heightPass(slave)) {
					adjustBeauty("Height: Petite Admiration, law", ((Height.mean(slave) - slave.height) * (arcology.FSPetiteAdmiration / 50)));
				} else {
					adjustBeauty("Height: Petite Admiration, law", -((slave.height - Height.mean(slave)) * (arcology.FSPetiteAdmiration / 50)));
				}
			} else {
				if (heightPass(slave)) {
					let ageDiv = (slave.physicalAge >= 16) ? 1 : (16 - slave.physicalAge); // this could probably be better, but bad at math. Intent is for younger, and thus naturally shorter than the threshold, slaves receive a weaker bonus.
					adjustBeauty("Height: Petite Admiration", ((161 - slave.height) * ((arcology.FSPetiteAdmiration / 50) + 0.5) / ageDiv));
				} else if (slave.height >= 170) {
					adjustBeauty("Height: Petite Admiration", -((slave.height - 169) * (arcology.FSPetiteAdmiration / 50)));
				}
			}
		} else if (arcology.FSStatuesqueGlorification !== "unset") {
			if (arcology.FSStatuesqueGlorificationLaw2 === 1) {
				if (heightPass(slave)) {
					adjustBeauty("Height: Statuesque Glorification, law", ((slave.height - Height.mean(slave)) * (arcology.FSStatuesqueGlorification / 50)));
				} else {
					adjustBeauty("Height: Statuesque Glorification, law", -((Height.mean(slave) - slave.height) * (arcology.FSStatuesqueGlorification / 50)));
				}
			} else {
				if (heightPass(slave)) {
					adjustBeauty("Height: Statuesque Glorification", ((slave.height + heelLength(slave) - 169) * ((arcology.FSStatuesqueGlorification / 50) + 0.5)));
				} else {
					adjustBeauty("Height: Statuesque Glorification", -(((arcology.FSStatuesqueGlorification / 10) + (170 - slave.height + heelLength(slave))) * 2));
				}
			}
		} else {
			adjustBeauty("Height: General", ((slave.height - 160) / 10));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFaceBeauty(slave) {
		adjustBeauty("Face", (slave.face / 5));
		switch (slave.faceShape) {
			case "masculine":
				if (arcology.FSGenderRadicalist !== "unset") {
					adjustBeauty("Face: Gender Radicalist", -((2 - (arcology.FSGenderRadicalist / 25)) * (slave.face / 30)));
				} else if (arcology.FSGenderFundamentalist !== "unset") {
					adjustBeauty("Face: Gender Fundamentalist", -((2 + (arcology.FSGenderFundamentalist / 25)) * (slave.face / 30)));
				} else {
					adjustBeauty("Face: General", -(2 * (slave.face / 30)));
				}
				break;
			case "androgynous":
				if (arcology.FSGenderRadicalist !== "unset") {
					adjustBeauty("Face: Gender Radicalist", (2 - ((1 - (arcology.FSGenderRadicalist / 25)) * (slave.face / 30))));
				} else if (arcology.FSGenderFundamentalist !== "unset") {
					adjustBeauty("Face: Gender Fundamentalist", (2 - ((1 + (arcology.FSGenderFundamentalist / 25)) * (slave.face / 30))));
				} else {
					adjustBeauty("Face: General", (2 - (slave.face / 30)));
				}
				break;
			case "exotic":
				adjustBeauty("Face: General", (2 * (slave.face / 30)));
				break;
			case "sensual":
				adjustBeauty("Face: General", (2 + (slave.face / 30)));
				break;
			case "cute":
				adjustBeauty("Face: General", (8 / 3));
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTeethBeauty(slave) {
		switch (slave.teeth) {
			case "crooked":
				adjustBeauty("Teeth", -(3));
				break;
			case "gapped":
				if (slave.faceShape === "cute") {
					adjustBeauty("Teeth", (1));
				} else {
					adjustBeauty("Teeth", -(1));
				}
				break;
			case "braces":
			case "cosmetic braces":
				if (slave.visualAge > 14 && slave.visualAge < 18) {
					adjustBeauty("Teeth", (1));
				}
				break;
			case "removable":
			case "pointy":
			case "baby":
			case "mixed":
				adjustBeauty("Teeth", -(1));
				break;
		}
	}

	function calcModBeauty(
		/* slave
		 */
	) {
		if (arcology.FSTransformationFetishist > 20 || arcology.FSDegradationist > 20) {
			if (V.modScore > 15 || (V.piercingScore > 8 && V.tatScore > 5)) {
				adjustBeauty("Modded: Greatly", (8 + (V.modScore * 0.25)));
			} else if (V.modScore > 7) {
				adjustBeauty("Modded: Some", (V.modScore - 7));
			}
		} else if (arcology.FSBodyPurist > 20 || arcology.FSPaternalist > 20) {
			if (V.modScore <= 7) {
				adjustBeauty("Modded: Few: Body Purist / Paternalist", (10));
			} else {
				adjustBeauty("Modded: Body Purist", (15 - V.modScore));
			}
		} else {
			if (V.modScore <= 7) {
				adjustBeauty("Modded: Few", (V.modScore));
			} else if (V.modScore > 15 || (V.piercingScore > 8 && V.tatScore > 5)) {
				adjustBeauty("Modded: Greatly", (11));
			} else {
				adjustBeauty("Modded", (7 + (0.5 * (V.modScore - 7))));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcCosmeticsBeauty(slave) {
		if (V.rep > 10000 || V.rep < 5000) {
			if (Object.values(slave.brand).includes(V.brandDesign.official)) {
				if (V.rep > 10000) {
					adjustBeauty("Brand: Famous", (1));
				} else if (V.rep < 5000) {
					adjustBeauty("Brand: Owner not Famous", -(1));
				}
			}
		}
		if (slave.minorInjury !== 0) {
			adjustBeauty("Minor Injury", -(2));
		}
		if (slave.scar !== {}) {
			const scars = Object.keys(slave.scar);
			for (const bodypart of scars) {
				if (slave.scar[bodypart].surgical > 0) {
					adjustBeauty("Scar", -(slave.scar[bodypart].surgical));
				}
			}
		}
		if (slave.nails > 0) {
			adjustBeauty("Nails", (1));
		}
		if (slave.makeup > 0) {
			adjustBeauty("Makeup", (1));
		}
		switch (slave.markings) {
			case "beauty mark":
				if (slave.face > 40) {
					adjustBeauty("Beautymark: Beautiful Face", 6);
				} else if (slave.face < -10) {
					adjustBeauty("Beautymark: Ugly Face", -6);
				}
				break;
			case "birthmark":
				if (slave.prestige > 0 || slave.porn.prestige > 1) {
					adjustBeauty("Birthmark: Prestigious", 4);
				} else {
					adjustBeauty("Birthmark: Not Prestigious", -4);
				}
				break;
			case "freckles":
			case "heavily freckled":
				if ((skinToneLevel(slave.skin) > 5) && (skinToneLevel(slave.skin) < 10)) {
					adjustBeauty("Freckles", 2);
					if (slave.hColor === "red") {
						adjustBeauty("Freckles: Redhead", 2);
					}
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFSNotFuckdollBeauty(slave) {
		if (arcology.FSSupremacist !== "unset") {
			if (slave.race === arcology.FSSupremacistRace) {
				adjustBeauty("Supremacist Race", ((arcology.FSSupremacist / 3) + (arcology.FSSupremacistLawME * 10)));
			}
		}
		if (arcology.FSSubjugationist !== "unset") {
			if (slave.race === arcology.FSSubjugationistRace) {
				adjustBeauty("Inferior Race", -((arcology.FSSubjugationist / 2) - (arcology.FSSubjugationistLawME * 10)));
			}
		}
		if (arcology.FSGenderFundamentalistLawBimbo === 1) { // TODO: Needs review in light of miseducation
			if (slave.intelligenceImplant === 0) {
				adjustBeauty("Uneducated: Bimbo Law: Gender Fundamentalist", (30));
			} else if (slave.intelligenceImplant > 15) {
				adjustBeauty("Educated: Bimbo Law: Gender Fundamentalist", -((slave.intelligenceImplant * 3)));
			} else {
				adjustBeauty("Low Education/Miseducated: Bimbo Law: Gender Fundamentalist", -(Math.abs(slave.intelligenceImplant * 1.5)));
			}
		} else if (arcology.FSSlaveProfessionalism !== "unset") {
			if (slave.intelligenceImplant >= 30) {
				adjustBeauty("Highly Educated: Professionalism", (5 + (arcology.FSSlaveProfessionalism / 10))); /* 15 */
			} else if (slave.intelligenceImplant >= 15) {
				adjustBeauty("Educated: Professionalism", ((arcology.FSSlaveProfessionalism / 20))); /* 5 */
			} else {
				adjustBeauty("Low Education/Miseducated: Professionalism", -(((arcology.FSSlaveProfessionalism / 10) * 3) - slave.intelligenceImplant)); /* -30 */
			}
		} else if (arcology.FSIntellectualDependency !== "unset") {
			if (slave.intelligenceImplant > 15) {
				adjustBeauty("Educated: Intellectual Dependency", -((arcology.FSIntellectualDependency / 10) * (slave.intelligenceImplant / 10))); /* -30 */
			}
		}
		if (arcology.FSSlaveProfessionalism !== "unset") {
			adjustBeauty("Skilled: Slave Professionalism", ((arcology.FSSlaveProfessionalism / 50) * ((slave.skill.entertainment + slave.skill.whoring + slave.skill.oral + slave.skill.anal + slave.skill.vaginal) / 100))); /* 10 */
		}
		if (arcology.FSYouthPreferentialist !== "unset") {
			adjustBeauty("Age: Youth Preferentialist", ((30 - slave.visualAge) / (30 - V.minimumSlaveAge) * ((arcology.FSYouthPreferentialist / 2) + (arcology.FSYouthPreferentialistLaw * 10)))); /* max 60 */
		} else if (arcology.FSMaturityPreferentialist !== "unset") {
			if (V.retirementAge > 30) {
				adjustBeauty("Age: Maturity Preferentialist", ((30 - slave.visualAge) / (30 - V.retirementAge) * ((arcology.FSMaturityPreferentialist / 2) + (arcology.FSMaturityPreferentialistLaw * 10)))); /* max 60, problems if retirementAge is 30 or under */
			}
		}
		if (arcology.FSBodyPurist > 20) {
			/* bonus for virgin slaves */
			if (slave.vagina === 0 && slave.counter.vaginal === 0) {
				adjustBeauty("Vaginal: Body Purist", (30 * (arcology.FSBodyPurist / 100)));
			}
			if (slave.anus === 0 && slave.counter.anal === 0) {
				adjustBeauty("Anal: Body Purist", (30 * (arcology.FSBodyPurist / 100)));
			}
		}
		if (arcology.FSEdoRevivalist !== "unset") {
			if (slave.nationality === "Japanese" || slave.nationality === "Edo Revivalist") {
				adjustBeauty("Nationality: Japanese: Edo Revivalist", (arcology.FSEdoRevivalist / 2));
			} else if (slave.race === "asian") {
				adjustBeauty("Race: Asian: Edo Revivalist", (arcology.FSEdoRevivalist / 5));
			} else {
				adjustBeauty("Neither Asian nor Japanese: Edo Revivalist", -(arcology.FSEdoRevivalist / 4));
			}
			if (V.language === "Japanese" && canTalk(slave)) {
				if (slave.accent > 1) {
					adjustBeauty("Heavy Foreign Accent: Edo Revivalist", -(arcology.FSEdoRevivalist / 2));
				} else if (slave.accent > 0) {
					adjustBeauty("Foreign Accent: Edo Revivalist", -(arcology.FSEdoRevivalist / 5));
				} else {
					adjustBeauty("No Accent: Edo Revivalist", (arcology.FSEdoRevivalist / 10));
				}
			}
		} else if (arcology.FSChineseRevivalist !== "unset") {
			if (slave.nationality === "Chinese" || slave.nationality === "Ancient Chinese Revivalist") {
				adjustBeauty("Nationality: Chinese: Chinese Revivalist", (arcology.FSChineseRevivalist / 2));
			} else if (slave.race === "asian") {
				adjustBeauty("Race: Asian: Chinese Revivalist", (arcology.FSChineseRevivalist / 5));
			} else {
				adjustBeauty("Neither Asian nor Chinese: Chinese Revivalist", -(arcology.FSChineseRevivalist / 4));
			}
			if (V.language === "Chinese" && canTalk(slave)) {
				if (slave.accent > 1) {
					adjustBeauty("Heavy Foreign Accent: Chinese Revivalist", -(arcology.FSChineseRevivalist / 2));
				} else if (slave.accent > 0) {
					adjustBeauty("Foreign Accent: Chinese Revivalist", -(arcology.FSChineseRevivalist / 5));
				} else {
					adjustBeauty("No Accent: Chinese Revivalist", (arcology.FSChineseRevivalist / 10));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMiscNotFuckdollBeauty(slave) {
		adjustBeauty(`Health: Health (${slave.health.health})`, (Math.min(slave.health.health, 100) / 5));
		adjustBeauty(`Health: Tired (${slave.health.health})`, -(Math.trunc(slave.health.tired / 20)));
		if (slave.health.tired > 80) {
			adjustBeauty("Health: Extremely Tired", -2);
		} else if (slave.health.tired > 50) {
			adjustBeauty("Health: Very Tired", -1);
		}
		adjustBeauty(`Health: Ill (${slave.health.illness})`, -(Math.pow(slave.health.illness, 2)));
		adjustBeauty(`Voice Pitch`, (slave.voice));
		adjustBeauty(`Skill: Entertainment (${slave.skill.entertainment})`, (slave.skill.entertainment / 10));
		adjustBeauty(`Skill: Whoring (${slave.skill.whoring})`, (slave.skill.whoring / 10));
		adjustBeauty(`Age: Visual Age (${slave.visualAge})`, -(3 * slave.visualAge));
		if (setup.entertainmentCareers.includes(slave.career)) {
			adjustBeauty("Career: Entertainment", (20));
		} else if (V.week - slave.weekAcquired >= 20 && slave.skill.entertainment >= 100) {
			adjustBeauty("Experiance: Entertainment", (10));
		}
		if (slave.race === "white" && slave.origRace === "white") {
			adjustBeauty("White girls be like", 4);
		} else if (slave.race === "white") {
			adjustBeauty("Fake white girls be like", 2);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcDickBeauty(slave) {
		if (arcology.FSAssetExpansionist > 20 && arcology.FSGenderFundamentalist === "unset") {
			if (slave.dick >= 20) {
				adjustBeauty("Enormous Dick: Asset Expansionist", (17 + (slave.dick * (arcology.FSAssetExpansionist / 500)))); /* 23 */
			} else if (slave.dick >= 10) {
				adjustBeauty("Huge Dick: Asset Expansionist", (10 + (slave.dick * (arcology.FSAssetExpansionist / 300)))); /* 16.3 */
			} else if (slave.dick > 6) {
				adjustBeauty("Large Dick: Asset Expansionist", (slave.dick * (1 + (arcology.FSAssetExpansionist / 100)))); /* 10 */
			}
		} else if (arcology.FSGenderFundamentalist !== "unset") {
			if (slave.dick > 0) {
				adjustBeauty("Dick: Gender Fundamentalist", (3 - slave.dick));
			}
		} else if (arcology.FSGenderRadicalist !== "unset") {
			if (slave.dick > 20) {
				adjustBeauty("EnormousDick: Gender Radicalist", (20 + (slave.dick * (arcology.FSGenderRadicalist / 400)))); /* 27.5 */
			} else if (slave.dick >= 10) {
				adjustBeauty("HugeDick: Gender Radicalist", (10 + (slave.dick * (arcology.FSGenderRadicalist / 200)))); /* 20 */
			} else if (slave.dick > 0) {
				adjustBeauty("Dick: Gender Radicalist", (slave.dick * (1 + (arcology.FSGenderRadicalist / 100)))); /* 10 */
			}
		} else {
			adjustBeauty("Dick: General", -(2 * slave.dick));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBallsBeauty(slave) {
		if (arcology.FSAssetExpansionist > 20 && arcology.FSGenderFundamentalist === "unset") {
			if (slave.balls > 100) {
				adjustBeauty("Inhuman Balls: Asset Expansionist", (41 + (slave.balls * (arcology.FSAssetExpansionist / 500)))); /* 66 */
			} else if (slave.balls > 80) {
				adjustBeauty("Enormous Balls: Asset Expansionist", (16 + (slave.balls * (arcology.FSAssetExpansionist / 400)))); /* 41 */
			} else if (slave.balls > 60) {
				adjustBeauty("Huge Balls: Asset Expansionist", (6 + (slave.balls * (arcology.FSAssetExpansionist / 800)))); /* 16 */
			} else if (slave.balls > 10) {
				adjustBeauty("Vestigial Balls: Asset Expansionist", (slave.balls * (arcology.FSAssetExpansionist / 1000))); /* 6 */
			}
		} else if (arcology.FSGenderFundamentalist !== "unset") {
			if (slave.scrotum > 0) {
				adjustBeauty("Scrotum: Gender Fundamentalist", -(slave.balls * (1 + (arcology.FSGenderFundamentalist / 200))));
			}
		} else if (arcology.FSGenderRadicalist !== "unset") {
			if (slave.scrotum > 0) {
				if (slave.balls > 100) {
					adjustBeauty("Inhuman Scrotum: Gender Radicalist", (40 + (slave.balls * (arcology.FSGenderRadicalist / 2000)))); /* 46.25 */
				} else if (slave.balls > 60) {
					adjustBeauty("Enormous Scrotum: Gender Radicalist", (30 + (slave.balls * (arcology.FSGenderRadicalist / 1000)))); /* 40 */
				} else if (slave.balls > 10) {
					adjustBeauty("Huge Scrotum: Gender Radicalist", (15 + (slave.balls * (arcology.FSGenderRadicalist / 400)))); /* 30 */
				} else {
					adjustBeauty("Vestigial Scrotum: Gender Radicalist", (slave.balls * (1 + (arcology.FSGenderRadicalist / 200)))); /* 15 */
				}
			}
		} else {
			if (slave.scrotum > 0) {
				adjustBeauty("Scrotum: General", -(slave.balls));
			}
		}
		if (arcology.FSRestart !== "unset") {
			/* Eugenics does not like slaves having working balls */
			if (slave.ballType === "human") {
				adjustBeauty("Balls: Eugenics", -(slave.balls * (1 + (arcology.FSRestart / 100))));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcButtBeauty(slave) {
		if (slave.butt <= 10) {
			adjustBeauty("Small Butt", (1.5 * slave.butt)); /* max 15 */
		} else {
			adjustBeauty("Large Butt", (15 + (slave.butt / 4))); /* max 20 */
		}
		if ((arcology.FSTransformationFetishist > 20 && arcology.FSSlimnessEnthusiast === "unset") || arcology.FSAssetExpansionist > 20) {
			if (slave.butt <= 2) {
				adjustBeauty("Small Butt: Transformation Fetishist / Asset Expansionist", (2 * (slave.butt - 1))); /* 2 */
			} else if (slave.butt <= 4) {
				adjustBeauty("Big Bubble Butt: Transformation Fetishist / Asset Expansionist", (2 + 1.5 * (slave.butt - 2))); /* 5 */
			} else if (slave.butt <= 10) {
				adjustBeauty("Ridiculous Butt: Transformation Fetishist / Asset Expansionist", (5 + 1 * (slave.butt - 4))); /* 11 */
			} else {
				adjustBeauty("Inhuman Butt: Transformation Fetishist / Asset Expansionist", (7 + 0.5 * (slave.butt - 5))); /* 14.5 */
			} /* maybe buff butts? */
		} else if (arcology.FSSlimnessEnthusiast > 20) {
			if (slave.butt <= 3) {
				adjustBeauty("Small Butt: Slimness Enthusiast", (12 + 3 * (slave.butt - 1))); /* 18 buff if asses get buffed */
			} else if (slave.butt <= 5) {
				adjustBeauty("Big Butt: Slimness Enthusiast", 9);
			} else {
				adjustBeauty("Small Butt: Slimness Enthusiast", -(10 + 3 * slave.butt)); /* -70 */
			}
		} else {
			if (slave.butt <= 2) {
				adjustBeauty("Small Butt: General", (2 * (slave.butt - 1))); /* 2 */
			} else if (slave.butt <= 4) {
				adjustBeauty("Big Bubble Buttt: General", (2 + (1.5 * (slave.butt - 2)))); /* 5 */
			} else if (slave.butt <= 8) {
				adjustBeauty("Ridiculous Butt: General", (2 + (1.5 * (slave.butt - 2)))); /* 11 */
			} else {
				adjustBeauty("Inhuman Butt: General", 9);
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			/* the cost of using AE's values */
			if (arcology.FSSlimnessEnthusiast !== "unset") {
				if (slave.butt >= 3) {
					if (slave.buttImplant / slave.butt < 0.25) {
						adjustBeauty("Butt Implant: Slimness Enthusiast", -(2 * (slave.butt - 1) + 10));
					}
				}
			} else {
				if (slave.butt >= 6) {
					if (slave.buttImplant / slave.butt < 0.50) {
						adjustBeauty("Butt Implant: General", -((1.5 * slave.butt) + 6)); /* will get nasty at huge sizes */
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHipsBeauty(slave) {
		adjustBeauty("Hips", (2 * slave.hips));
		/* butts in general may need buffs */
		switch (slave.hips) {
			case -2:
				if (slave.butt > 2) {
					if (arcology.FSTransformationFetishist === "unset" && arcology.FSHedonisticDecadence === "unset") {
						adjustBeauty("Hips: General", (2 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case -1:
				if (slave.butt > 4) {
					if (arcology.FSTransformationFetishist === "unset" && arcology.FSHedonisticDecadence === "unset") {
						adjustBeauty("Hips: General", (4 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 0:
				if (slave.butt > 6) {
					if (arcology.FSTransformationFetishist === "unset" && arcology.FSHedonisticDecadence === "unset") {
						adjustBeauty("Hips: General", (6 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else if (slave.butt <= 1) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 2));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 1:
				if (slave.butt > 8) {
					if (arcology.FSTransformationFetishist === "unset" && arcology.FSHedonisticDecadence === "unset") {
						adjustBeauty("Hips: General", (8 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else if (slave.butt <= 2) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 3));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 2:
				if (slave.butt <= 3) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 4));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 3:
				if (slave.butt <= 8) {
					adjustBeauty("Hips: Small Butt", (slave.butt - 8));
				} else {
					adjustBeauty("Hips: Small Butt", 1);
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBoobsBeauty(slave) {
		if ((arcology.FSTransformationFetishist > 20 && arcology.FSSlimnessEnthusiast === "unset") || arcology.FSAssetExpansionist > 20) {
			if (slave.boobs <= 750) {
				adjustBeauty("Boob Size: Less than DD: Transformation Fetishist / Asset Expansionist", (-4 + 0.01 * (slave.boobs))); /* 3.5 */
			} else if (slave.boobs <= 2050) {
				adjustBeauty("Boob Size: Less than J: Transformation Fetishist / Asset Expansionist", (3.5 + 0.0175 * (slave.boobs - 750))); /* 26.25 */
			} else if (slave.boobs <= 3000) {
				adjustBeauty("Boob Size: Less than N: Transformation Fetishist / Asset Expansionist", (26.25 + 0.025 * (slave.boobs - 2050))); /* 50 */
			} else if (slave.boobs <= 25000) {
				adjustBeauty("Boob Size: Scalebreaking: Transformation Fetishist / Asset Expansionist", (50 + 0.005 * (slave.boobs - 3000))); /* 160 - this might need to be lowered. Maybe drop the 50? Otherwise break it down more. */
			} else {
				adjustBeauty("Boob Size: Inconceivable: Transformation Fetishist / Asset Expansionist", (160 + 0.001 * (slave.boobs - 25000))); /* 185 */
			}
		} else if (arcology.FSSlimnessEnthusiast > 20) {
			if (slave.boobs <= 500) {
				adjustBeauty("Boob Size: Less than C: Slimness Fetishist", (0.08 * (slave.boobs))); /* 40 - buff me to be in line with higher end asset exp */
			} else if (slave.boobs <= 1000) {
				adjustBeauty("Boob Size: Less than F: Slimness Fetishist", (10));
			} else if (slave.boobs <= 3000) {
				adjustBeauty("Boob Size: Less than N: Slimness Fetishist", 5);
			} else {
				adjustBeauty("Boob Size: Greater than N: Slimness Fetishist", -(5 + 0.005 * (slave.boobs - 3000))); /* -110 */
			}
		} else {
			if (slave.boobs <= 1200) {
				adjustBeauty("Boob Size: Less than G: General", (0.02 * (slave.boobs - 200))); /* 20 */
			} else if (slave.boobs <= 2400) {
				adjustBeauty("Boob Size: Less than L: General", (20 + (0.01 * (slave.boobs - 1200)))); /* 32 */
			} else if (slave.boobs <= 3600) {
				adjustBeauty("Boob Size: Less than P: General", (32 + (0.005 * (slave.boobs - 2400)))); /* 38 */
			} else if (slave.boobs <= 10000) {
				adjustBeauty("Boob Size: Less than Scalebreaking: General", 38);
			} else if (slave.boobs <= 25000) {
				adjustBeauty("Boob Size: Less than Inconceivable: General", (30));
			} else {
				adjustBeauty("Boob Size: Inconceivable: General", (20));
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			/* the cost of using AE's values */
			if (arcology.FSSlimnessEnthusiast !== "unset") {
				if (slave.boobs >= 400) {
					if (slave.boobs >= 10000) {
						if (slave.boobsImplant / slave.boobs < 0.75) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					} else if (slave.boobs >= 2000) {
						if (slave.boobsImplant / slave.boobs < 0.50) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					} else if (slave.boobs >= 1000) {
						if (slave.boobsImplant / slave.boobs < 0.25) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					} else {
						if (slave.boobsImplant / slave.boobs < 0.10) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					}
				}
			} else {
				if (slave.boobs >= 600) {
					if (slave.boobs >= 10000) {
						if (slave.boobsImplant / slave.boobs < 0.75) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					} else if (slave.boobs >= 2000) {
						if (slave.boobsImplant / slave.boobs < 0.50) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					} else if (slave.boobs >= 1000) {
						if (slave.boobsImplant / slave.boobs < 0.25) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					} else {
						if (slave.boobsImplant / slave.boobs < 0.10) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					}
				}
			}
		}
		if (slave.boobs > 250) {
			if (slave.boobShape === "perky") {
				adjustBeauty("Boob Shape", 6);
			} else if (slave.boobShape === "torpedo-shaped") {
				adjustBeauty("Boob Shape", 6);
			} else if (slave.boobShape === "downward-facing") {
				adjustBeauty("Boob Shape", -4);
			} else if (slave.boobShape === "saggy") {
				adjustBeauty("Boob Shape", -4);
			}
		}
		if (slave.nipples === "huge") {
			adjustBeauty("Nipples", 4);
		} else if (slave.nipples === "inverted") {
			adjustBeauty("Nipples", 2);
		} else if (slave.nipples === "puffy") {
			adjustBeauty("Nipples", 2);
		} else if (slave.nipples === "tiny") {
			adjustBeauty("Nipples", -2);
		} else if (slave.nipples === "fuckable") {
			if (arcology.FSTransformationFetishist !== "unset") {
				adjustBeauty("Nipples: Transformation Fetishist", (arcology.FSTransformationFetishist / 10));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWeightBeauty(slave) {
		if (arcology.FSHedonisticDecadence > 20) {
			if (slave.weight < -95) {
				adjustBeauty("Weight: Hedonistic Decadence", (-70 + (slave.weight / 10))); /* -80 */
			} else if (slave.weight < -30) {
				adjustBeauty("Weight: Hedonistic Decadence", (-30 + (slave.weight / 3))); /* -61 */
			} else if (slave.weight < -10) {
				adjustBeauty("Weight: Hedonistic Decadence", (slave.weight)); /* -30 */
			} else if (slave.weight <= 10) {
				/* no effect */
			} else if (slave.weight <= 30) {
				adjustBeauty("Weight: Hedonistic Decadence", ((slave.weight / 2))); /* 15 */
			} else if (slave.weight <= 95) {
				adjustBeauty("Weight: Hedonistic Decadence", (15 + (slave.weight / 7))); /* 28.5 */
			} else if (slave.weight <= 130) {
				adjustBeauty("Weight: Hedonistic Decadence", (28 + (slave.weight / 10))); /* 41 */
			} else if (slave.weight <= 160) {
				adjustBeauty("Weight: Hedonistic Decadence", (42 + (slave.weight / 20))); /* 50 */
			} else if (slave.weight <= 190) {
				adjustBeauty("Weight: Hedonistic Decadence", (50 - (slave.weight / 25))); /* 42.5 */
			} else {
				adjustBeauty("Weight: Hedonistic Decadence", (40 - (slave.weight / 20))); /* 30 */
			}
		} else {
			if (slave.weight > 130) {
				adjustBeauty("Weight", -(Math.abs(slave.weight) / 5));
			} else if (slave.hips === 3) {
				if (slave.weight < -10) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			} else if (slave.hips === 2) {
				if (slave.weight > 95) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 15));
				} else if (slave.weight < -30) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			} else if (slave.hips === -2) {
				if (slave.weight < -95 || slave.weight > 30) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			} else {
				if (Math.abs(slave.weight) > 30) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			}
		}
		if (arcology.FSPhysicalIdealist !== "unset") {
			if (arcology.FSPhysicalIdealistStrongFat === 1) {
				if (slave.weight > 10 && slave.weight <= 130) {
					adjustBeauty("Weight: Physical Idealist", (slave.weight * (arcology.FSPhysicalIdealist / 200))); /* 65 */
				} else {
					adjustBeauty("Weight: Physical Idealist", -(Math.abs(slave.weight) / 2));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMusclesBeauty(slave) {
		adjustBeauty("Muscles", -(slave.muscles / 30));
		if (arcology.FSPhysicalIdealist !== "unset") {
			if (arcology.FSPhysicalIdealistLaw === 1) {
				if (Math.abs(slave.weight) <= 30 && slave.health.condition >= 20 && slave.muscles >= 20 && slave.muscles <= 50) {
					adjustBeauty("Muscles: Physical Idealist: Law", ((slave.muscles + (Math.min(slave.health.condition, 300) / 5)) * (arcology.FSPhysicalIdealist / 100)));
				} else {
					adjustBeauty("Muscles: Physical Idealist: Law", -(30));
				}
			} else {
				if (slave.muscles > 30 || slave.muscles <= -5) {
					adjustBeauty("Muscles: Physical Idealist", (slave.muscles * (arcology.FSPhysicalIdealist / 120))); /* +-83 */
				}
			}
		} else if (arcology.FSHedonisticDecadence !== "unset") {
			if (slave.muscles < -10) {
				adjustBeauty("Muscles: Hedonistic Decadence", (Math.abs(slave.muscles) * (arcology.FSHedonisticDecadence / 160))); /* 62.5 */
			} else if (slave.muscles > 5) {
				if (arcology.FSHedonisticDecadenceStrongFat === 1) {
					adjustBeauty("Muscles: Hedonistic Decadence", (slave.muscles * (arcology.FSHedonisticDecadence / 200))); /* 50 */
				} else {
					adjustBeauty("Muscles: Hedonistic Decadence", -(slave.muscles * (arcology.FSHedonisticDecadence / 200))); /* -50 */
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBodyHairBeauty(slave) {
		if (slave.physicalAge < 11) {
			adjustBeauty("Hair: Youth", 4);
		} else if (slave.physicalAge >= 13) {
			switch (slave.underArmHStyle) {
				case "hairless":
				case "bald":
				case "waxed":
				case "shaved":
					adjustBeauty(`Armpit Hair: ${slave.underArmHStyle}`, 2);
					break;
				case "bushy":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Armpit Hair: ${slave.underArmHStyle}: Body Purist`, 4);
					} else {
						adjustBeauty(`Armpit Hair: ${slave.underArmHStyle}`, -2);
					}
					break;
			}
			switch (slave.pubicHStyle) {
				case "hairless":
				case "bald":
				case "waxed":
					adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}`, 2);
					break;
				case "bushy":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}: Body Purist`, 2);
					} else {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}`, -4);
					}
					break;
				case "bushy in the front and neat in the rear":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}: Body Purist`, 4);
					} else {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}`, -2);
					}
					break;
				case "very bushy":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}: Body Purist`, 2);
					} else {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}:`, -6);
					}
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcImplantBeauty(slave) {
		if (arcology.FSTransformationFetishist !== "unset") {
			if (Math.abs(slave.shouldersImplant) > 1) {
				adjustBeauty("Shoulders Implant: Transformation Fetishist", ((arcology.FSTransformationFetishist / 20) + Math.abs(slave.shouldersImplant)));
			}
			if (Math.abs(slave.hipsImplant) > 1) {
				adjustBeauty("Hips Implant: Transformation Fetishist", ((arcology.FSTransformationFetishist / 20) + Math.abs(slave.hipsImplant)));
			}
			if (slave.race !== slave.origRace) {
				adjustBeauty("Race Implant: Transformation Fetishist", (arcology.FSTransformationFetishist / 20));
			}
			if (slave.faceImplant > 95 && slave.face > 40) {
				adjustBeauty("Face Implant: Transformation Fetishist", (arcology.FSTransformationFetishist / 4));
			}
		} else if (arcology.FSBodyPurist !== "unset") {
			if (slave.faceImplant > 5) {
				adjustBeauty("Face Implant: Body Purist", -((arcology.FSBodyPurist / 100) * (slave.faceImplant / 10)));
			}
			if (slave.race !== slave.origRace) {
				adjustBeauty("Race Implant: Body Purist", -(arcology.FSBodyPurist / 5));
			}
		} else {
			if (slave.faceImplant > 30) {
				adjustBeauty("Face Implant", -((slave.faceImplant - 30) / 10));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcRepopulationPregBeauty(slave) {
		if (slave.preg > slave.pregData.normalBirth / 1.33) {
			/* limited huge boost for full term */
			if (slave.broodmother > 0) {
				adjustBeauty("Preg Beauty: Broodmother", (0.4 * (slave.broodmother * arcology.FSRepopulationFocus))); /* 40-80 limited due to constant presence. Also good breeders, but subpar mothers */
			} else if (slave.bellyPreg >= 600000) {
				adjustBeauty("Preg Beauty", (1.5 * arcology.FSRepopulationFocus)); /* 150 */
			} else if (slave.bellyPreg >= 300000) {
				adjustBeauty("Preg Beauty", (arcology.FSRepopulationFocus)); /* 100 */
			} else if (slave.bellyPreg >= 120000) {
				adjustBeauty("Preg Beauty", (0.9 * arcology.FSRepopulationFocus)); /* 90 */
			} else {
				adjustBeauty("Preg Beauty", (0.8 * arcology.FSRepopulationFocus)); /* 80 */
			}
		} else if (slave.preg > slave.pregData.normalBirth / 2) {
			if (slave.pregType >= 20) {
				adjustBeauty("Preg Beauty", (10 * (arcology.FSRepopulationFocus / 40))); /* 25 */
			} else if (slave.pregType >= 10) {
				adjustBeauty("Preg Beauty", (9 * (arcology.FSRepopulationFocus / 40))); /* 22.5 */
			} else {
				adjustBeauty("Preg Beauty", (8 * (arcology.FSRepopulationFocus / 40))); /* 20 */
			}
		} else if (slave.preg > slave.pregData.normalBirth / 4) {
			if (slave.pregType >= 20) {
				adjustBeauty("Preg Beauty", (arcology.FSRepopulationFocus / 5)); /* 20 */
			} else if (slave.pregType >= 10) {
				adjustBeauty("Preg Beauty", (arcology.FSRepopulationFocus / 6.25)); /* 16 */
			} else {
				adjustBeauty("Preg Beauty", (arcology.FSRepopulationFocus / 10)); /* 10 */
			}
		} else if (slave.pregWeek < 0) {
			adjustBeauty("Preg Beauty", (arcology.FSRepopulationFocus / 10)); /* 10 */
		} else if (slave.preg > 0 && slave.collar === "preg biometrics") {
			adjustBeauty("Preg Beauty", (arcology.FSRepopulationFocus / 12)); /* 8.33 */
		} else {
			adjustBeauty("Preg Beauty", -(arcology.FSRepopulationFocus / 2.5)); /* -40 */
		}
		if (slave.counter.births > 50) {
			adjustBeauty("Preg Beauty: Births", (arcology.FSRepopulationFocus / 1.5)); /* 66.6 */
		} else {
			adjustBeauty("Preg Beauty: Births", (slave.counter.births * (arcology.FSRepopulationFocus / 75)));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTrendyPregBeauty(slave) {
		if (slave.preg > slave.pregData.normalBirth / 1.33) {
			/* limited huge boost for full term */
			adjustBeauty("Preg Beauty: Trendy: Full Term", (20));
		} else if (slave.bellyPreg >= 1500) {
			adjustBeauty("Preg Beauty: Trendy", (10));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcRestartPregBeauty(slave) {
		if (slave.breedingMark === 1 && V.propOutcome === 1) {
			if ((slave.preg > slave.pregData.normalBirth / 8) && ((slave.pregSource === -1) || (slave.pregSource === -6))) {
				adjustBeauty("Preg Beauty: Eugenics", (arcology.FSRestart)); /* 100 */
			}
		} else {
			if (slave.preg > slave.pregData.normalBirth / 1.33) {
				if (slave.bellyPreg >= 600000) {
					adjustBeauty("Preg Beauty: Eugenics", -(2.5 * arcology.FSRestart)); /* -250 */
				} else if (slave.bellyPreg >= 300000) {
					adjustBeauty("Preg Beauty: Eugenics", -(1.25 * arcology.FSRestart)); /* -125 */
				} else if (slave.bellyPreg >= 120000) {
					adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart)); /* -100 */
				} else {
					adjustBeauty("Preg Beauty: Eugenics", -(0.75 * arcology.FSRestart)); /* -75 */
				}
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				if (slave.pregType >= 20) {
					adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart / 1.5)); /* -66.6 */
				} else if (slave.pregType >= 10) {
					adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart / 2)); /* -50 */
				} else {
					adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart / 3)); /* -33.3 */
				}
			} else if (slave.preg > slave.pregData.normalBirth / 4) {
				if (slave.pregType >= 20) {
					adjustBeauty("Preg Beauty: Eugenics", -(3 * (arcology.FSRestart / 8))); /* -37.5 */
				} else if (slave.pregType >= 10) {
					adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart / 4)); /* -25 */
				} else {
					adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart / 8)); /* -12.5 */
				}
			} else if (slave.preg === -2) {
				adjustBeauty("Preg Beauty: Eugenics", (arcology.FSRestart / 7)); /* 14.2 */
			} else if (slave.preg < 1) {
				adjustBeauty("Preg Beauty: Eugenics", (arcology.FSRestart / 5)); /* 20 */
			}
			if (slave.counter.births > 50) {
				adjustBeauty("Preg Beauty: Eugenics", -(arcology.FSRestart)); /* -100 */
			} else {
				adjustBeauty("Preg Beauty: Eugenics", -(slave.counter.births * (arcology.FSRestart / 50)));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTrendyMilfBeauty(slave) {
		if (slave.counter.births > 50) {
			adjustBeauty("Preg Beauty: MILF", 6);
		} else {
			adjustBeauty("Preg Beauty: MILF", (Math.ceil(slave.counter.births / 10)));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawBeauty(slave) {
		switch (arcology.FSGenderRadicalistLawFuta) {
			case 1:
				if (slave.dick > 0 && slave.vagina > -1) {
					/* herms */
					calcFutaLawTrueFutaBeauty(slave);
				}
				break;
			case 2:
				if (canAchieveErection(slave) && slave.balls > 0 && slave.scrotum > 0) {
					/* erection! */
					calcFutaLawBigDickBeauty(slave);
				}
				break;
			case 3:
				calcFutaLawBigBootyBeauty(slave);
				break;
			case 4:
				if (slave.dick > 0 && slave.vagina === -1 && slave.faceShape !== "masculine") {
					if (slave.boobs < 500 && slave.dick < 4 && slave.balls < 4) {
						calcFutaLawFemboyBeauty(slave);
					}
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawTrueFutaBeauty(slave) {
		if (slave.dick <= 10) {
			adjustBeauty("Dick: Futa Law: True", (slave.dick));
		} else if (slave.dick > 20) {
			adjustBeauty("Dick: Futa Law: True", 2);
		} else {
			adjustBeauty("Dick: Futa Law: True", 4);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawBigDickBeauty(slave) {
		adjustBeauty("Dick: Futa Law: Big", (slave.dick));
		if (slave.balls > 120) {
			adjustBeauty("Dick: Futa Law: Big", 14);
		} else if (slave.balls > 100) {
			adjustBeauty("Dick: Futa Law: Big", 12);
		} else if (slave.balls > 80) {
			adjustBeauty("Dick: Futa Law: Big", (10));
		} else if (slave.balls > 60) {
			adjustBeauty("Dick: Futa Law: Big", 8);
		} else if (slave.balls > 40) {
			adjustBeauty("Dick: Futa Law: Big", 6);
		} else if (slave.balls > 20) {
			adjustBeauty("Dick: Futa Law: Big", 4);
		} else if (slave.balls > 10) {
			adjustBeauty("Dick: Futa Law: Big", 2);
		} else {
			adjustBeauty("Dick: Futa Law: Big", (slave.balls));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawBigBootyBeauty(slave) {
		if (slave.hips >= 1) {
			adjustBeauty("Butt: Futa Law: Big", (4 * (slave.hips - 1))); /* 8 */
			if (arcology.FSSlimnessEnthusiast !== "unset") {
				adjustBeauty("Butt: Futa Law: Big: Slimness Enthusiast", (4 * (slave.hips - 1))); /* 8 */ /* offsets the malus for big butts */
			}
		}
		if (slave.skill.anal > 60 && slave.anus >= 2) {
			adjustBeauty("Butt: Futa Law: Big", (2 * (slave.anus - 2))); /* 6 */
			if (arcology.FSSlimnessEnthusiast !== "unset") {
				adjustBeauty("Butt: Futa Law: Big: Slimness Enthusiast", (2 * (slave.anus - 2))); /* 6 */ /* offsets the malus for big butts */
			}
		}
		if (slave.butt >= 5) {
			adjustBeauty("Butt: Futa Law: Big", ((slave.butt - 5))); /* 15 */
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawFemboyBeauty(slave) {
		if (arcology.FSSlimnessEnthusiast === "unset") {
			/* balance with slimness */
			adjustBeauty("Femboy: Futa Law", (20));
			if (slave.boobs < 300) {
				adjustBeauty("Femboy: Futa Law", 12);
			} else if (slave.boobs < 400) {
				adjustBeauty("Femboy: Futa Law", 6);
			}
		}
		if (slave.dick === 1) {
			adjustBeauty("Femboy: Futa Law", 12);
		} else if (slave.dick === 2) {
			adjustBeauty("Femboy: Futa Law", 6);
		}
		if (slave.balls <= 2) {
			adjustBeauty("Femboy: Futa Law", 8);
		}
		if (slave.faceShape === "cute" && slave.face > 0) {
			/* uggos need not apply, maybe a small boost for other faceShapes */
			adjustBeauty("Femboy: Futa Law", (((arcology.FSGenderRadicalist / 25) * (slave.face / 30)) - 2)); /* gives a slightly better boost than androgynous does with gendrad boost, 15.3 */
		}
		if (slave.nipples === "tiny") {
			adjustBeauty("Femboy: Futa Law", 5);
		} else if (slave.nipples === "cute") {
			adjustBeauty("Femboy: Futa Law", 2);
		} else {
			adjustBeauty("Femboy: Futa Law", -5);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBodyProportionBeauty(slave) {
		if (arcology.FSGenderFundamentalist !== "unset") {
			if (slave.shoulders > slave.hips) {
				if (slave.boobs <= 2000 * (slave.shoulders - slave.hips)) {
					adjustBeauty("Body Proportion: Gender Fundamentalist", -((slave.shoulders - slave.hips) * (1 + (arcology.FSGenderFundamentalist / 200))));
				}
			}
		} else if (arcology.FSGenderRadicalist === "unset") {
			if (slave.shoulders > slave.hips) {
				if (slave.boobs <= 2000 * (slave.shoulders - slave.hips)) {
					adjustBeauty("Body Proportion", -(slave.shoulders - slave.hips));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcVoiceBeauty(slave) {
		if (arcology.FSSlaveProfessionalism !== "unset") {
			if (canTalk(slave)) {
				if (slave.accent > 1) {
					adjustBeauty("Voice Accent: Slave Professionalism", -(20));
				} else if (slave.accent === 0) {
					adjustBeauty("Voice No Accent: Slave Professionalism", 4);
				}
			}
		} else {
			if (canTalk(slave)) {
				if (slave.accent >= 3) {
					adjustBeauty("Voice Accent: Bad", -1);
				} else if (slave.accent === 1) {
					adjustBeauty("Voice Accent: Sexy", 1);
				}
			} else {
				adjustBeauty("Voice Accent: Can't Talk", -2);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcLimbsBeauty(slave) {
		if (arcology.FSDegradationist !== "unset") {
			// missing limbs
			adjustBeauty("Limbs: Missing", -(getLimbCount(slave, 0) * 2.5));
			// non-beauty prosthetics
			adjustBeauty("Limbs: Non-beauty Prosthetics", -((getLimbCount(slave, 102) - getLimbCount(slave, 104)) * 0.5));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPubertyBeauty(slave) {
		if (slave.pubertyXX === 1) {
			adjustBeauty("Puberty Beauty", 5);
		}
		if (slave.pubertyXY === 0 && slave.physicalAge > V.potencyAge && slave.balls > 0) {
			adjustBeauty("Puberty Beauty", (10));
			if (arcology.FSGenderFundamentalist !== "unset") {
				adjustBeauty("Puberty Beauty: Gender Fundamentalist", 5);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFSMiscBeauty(slave) {
		if (arcology.FSTransformationFetishist > 20) {
			if (slave.lips > 70) {
				if (slave.lipsImplant / slave.lips < 0.5) {
					adjustBeauty("Lips: Transformation Fetishist", -(((slave.lips / 10) + (arcology.FSTransformationFetishist / 20))));
				}
			}
			if (slave.hips === 3) {
				adjustBeauty("Hips: Transformation Fetishist", (10));
			}
			if (hasAnyProstheticLimbs(slave)) {
				adjustBeauty("Artificial Limbs: Transformation Fetishist", (arcology.FSTransformationFetishist / 5));
			}
			if (slave.horn !== "none" || slave.tail !== "none" || (slave.earShape !== "normal" && slave.earShape !== "damaged") || slave.earT !== "none") {
				adjustBeauty("Horn/Tail/Odd Ears: Transformation Fetishist", (10));
			}
		}
		if ((arcology.FSGenderRadicalist > 20 && arcology.FSGenderRadicalistLawFuta !== 3) || arcology.FSSlimnessEnthusiast > 20) {
			if (slave.hips < 0) {
				adjustBeauty("Hips: Gender Radicalist / Gender Radicalist Law Futa / Slimness Enthusiast", (Math.abs(slave.hips)));
			}
		}
		if (arcology.FSPhysicalIdealist !== "unset") {
			if (slave.height > Height.mean(slave)) {
				adjustBeauty("Height: Physical Idealist", (10));
			}
		}
		if (arcology.FSHedonisticDecadenceLaw2 === 1) {
			if (slave.boobs >= 2000 && slave.butt >= 5 && slave.weight > 95) {
				adjustBeauty("Boobs/Butt/Weight: Hedonistic Decadence, Law (Rotund Feminine Ideal)", (5 + (arcology.FSHedonisticDecadence / 20))); /* 10 */
			} else {
				adjustBeauty("Boobs/Butt/Weight: Hedonistic Decadence, Law (Rotund Feminine Ideal)", -(15 + (arcology.FSHedonisticDecadence / 20))); /* -20 */
			}
		}
		if (arcology.FSSlaveProfessionalism !== "unset") {
			if (slave.energy > 80) {
				adjustBeauty("Energy: Slave Professionalism", -(slave.energy));
			} else if (slave.energy <= 40 && slave.devotion > 50) {
				adjustBeauty("Energy: Slave Professionalism", (slave.energy / 4));
			}
		} else if (arcology.FSIntellectualDependency !== "unset") {
			if (arcology.FSIntellectualDependencyLawBeauty === 1) {
				let bimboDegree = bimboScore(slave);
				if (bimboDegree > 0) {
					adjustBeauty("Bimbo Degree: Intellectual Dependency Law, Beauty", (Math.pow(2, bimboDegree))); /* 64 */
				} else {
					adjustBeauty("Bimbo Degree: Intellectual Dependency Law, Beauty", -(arcology.FSIntellectualDependency)); /* -100 */
				}
			}
			if (slave.energy > 80) {
				adjustBeauty("Energy: Intellectual Dependency", ((arcology.FSIntellectualDependency / 50) * (8 + (slave.energy / 10)))); /* 20 */
			} else if (slave.energy <= 60) {
				adjustBeauty("Energy: Intellectual Dependency", -((arcology.FSIntellectualDependency / 50) * (60 - slave.energy))); /* -120 */
			}
		}
		if (arcology.FSChattelReligionistCreed === 1) {
			if (V.nicaeaAssignment === slave.assignment) {
				adjustBeauty("Nicea Assignment: Chattel Religionist Creed", (2 * V.nicaeaPower));
			}
		}
		if (arcology.FSChattelReligionist > 40 && arcology.FSBodyPurist === "unset") {
			const tats = ["anusTat", "armsTat", "backTat", "boobsTat", "buttTat", "dickTat", "legsTat", "lipsTat", "shouldersTat", "stampTat", "vaginaTat"];
			let sacrilegeCount = 0;
			for (const index in tats) {
				if (slave[index] === "sacrilege") {
					sacrilegeCount++;
				}
			}
			if (sacrilegeCount > 0) {
				adjustBeauty("Sacrilege Tattoos: Chattel Religionist", ((1.5 * sacrilegeCount)));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPurityBeauty(slave) {
		if (isPure(slave)) {
			if (arcology.FSBodyPurist !== "unset") {
				adjustBeauty("Purity: Body Purist", (arcology.FSBodyPurist / 5));
			}
			if (arcology.FSTransformationFetishist === "unset") {
				adjustBeauty("Purity", 2);
			}
		} else if (arcology.FSTransformationFetishist !== "unset") {
			adjustBeauty("Purity: Transformation Fetishist", (arcology.FSTransformationFetishist / 40));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPhysiqueBeauty(slave) {
		let physiquePass = 0;

		if (slave.boobs < 500 && slave.butt < 3) {
			if (slave.muscles <= 30 && arcology.FSPhysicalIdealist === "unset" && slave.weight <= 10 && arcology.FSHedonisticDecadence === "unset") {
				physiquePass = 1;
			} else if (arcology.FSPhysicalIdealist !== "unset") {
				/* no muscle malus for muscle loving societies */
				if (arcology.FSPhysicalIdealistStrongFat === 1 && slave.weight <= 30) {
					/* reduced weight malus for fat loving societies */
					physiquePass = 1;
				} else if (slave.weight <= 10) {
					physiquePass = 1;
				}
			} else if (arcology.FSHedonisticDecadence !== "unset" && slave.weight <= 30) {
				/* reduced weight malus for fat loving societies */
				if (arcology.FSHedonisticDecadenceStrongFat === 1) {
					/* no muscle malus for muscle loving societies */
					physiquePass = 1;
				} else if (slave.muscles <= 30) {
					physiquePass = 1;
				}
			}
		}
		if (physiquePass === 1) {
			adjustBeauty("Physique Beauty", (40));
			if (arcology.FSSlimnessEnthusiast > 20) {
				adjustBeauty("Physique Beauty: Slimness Enthusiast", (arcology.FSSlimnessEnthusiast / 20));
				if (canTalk(slave) && slave.voice === 3) {
					adjustBeauty("Physique Beauty: Slimness Enthusiast: Deep Voice", (arcology.FSSlimnessEnthusiast / 40));
				}
			}
		} else if (isStacked(slave)) {
			if (arcology.FSSlimnessEnthusiast === "unset") {
				adjustBeauty("Physique Beauty", 1);
			}
			if (arcology.FSAssetExpansionist > 20) {
				adjustBeauty("Physique Beauty: Asset Expansionist", (arcology.FSAssetExpansionist / 20));
				if (canTalk(slave) && slave.voice === 3) {
					adjustBeauty("Physique Beauty: Asset Expansionist: Deep Voice", (arcology.FSAssetExpansionist / 40));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSlimBeauty(slave) {
		if (slimLawPass(slave) === 1) {
			adjustBeauty("Slim Beauty: Slimness Enthusiast: Slim Law", (40 + (arcology.FSSlimnessEnthusiast / 20))); /* 45 */
		} else {
			adjustBeauty("Slim Beauty: Slimness Enthusiast", -(arcology.FSSlimnessEnthusiast / 20));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcGenderLawBeauty(slave) {
		if (genderLawPass(slave) === 1) {
			adjustBeauty("Gender Law", (60));
		} else {
			adjustBeauty("Gender Law", -(10));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMultipliersBeauty(slave) {
		calcBellyBeauty(slave);
		if (slave.geneticQuirks.albinism === 2) {
			adjustBeauty("Albino", (0.1 * beauty));
		}
		if (slave.breedingMark === 1) {
			if (V.propOutcome === 1 && V.arcologies[0].FSRestart !== "unset") {
				adjustBeauty("Breeding Mark: Elite (Modifies all beauty)", beauty);
			} else {
				adjustBeauty("Breeding Mark: Elite", 2);
			}
		}
		if (slave.fuckdoll === 0 && V.seeAge === 1) {
			calcAgeBeauty(slave);
		}
		if (slave.prestige + slave.porn.prestige > 0) {
			calcPrestigeBeauty(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBellyBeauty(slave) {
		if (slave.bellySag > 0) {
			if (slave.belly < 100) {
				if (arcology.FSRepopulationFocus === "unset") {
					adjustBeauty("Belly Sag", -(20));
				}
			}
		}
		if (slave.bellyPreg >= 500 && arcology.FSRepopulationFocus === "unset" && arcology.FSRestart === "unset") {
			if (arcology.FSRepopulationFocusPregPolicy === 1) {
				adjustBeauty("(Modifies all beauty)", (-0.1 * beauty));
			} else if (arcology.FSGenderRadicalist !== "unset") {
				if (slave.mpreg === 1) {
					adjustBeauty("(Modifies all beauty)", (-0.1 * beauty));
				} else {
					adjustBeauty("(Modifies all beauty)", (-0.3 * beauty));
				}
			} else if (arcology.FSGenderFundamentalist === "unset") {
				adjustBeauty("(Modifies all beauty)", (-0.2 * beauty));
			} else {
				adjustBeauty("(Modifies all beauty)", (-0.3 * beauty));
			}
		}
		if (slave.bellyImplant >= 1500) {
			if (arcology.FSTransformationFetishist > 20) {
				adjustBeauty("Belly Impant: Transformation Fetishist", (Math.min(Math.trunc(slave.bellyImplant / 1000), 50))); /* 50 */
			} else if (arcology.FSRepopulationFocus > 60) {
				if ((slave.ovaries === 0 && slave.mpreg === 0) || slave.preg < -1) {
					adjustBeauty("Belly Impant: Repopulationist Focus", (20));
				}
			} else {
				if (slave.bellyImplant >= 750000) {
					/* multipliers */
					adjustBeauty("Belly Impant (Modifies all beauty)", (-0.8 * beauty));
				} else if (slave.bellyImplant >= 450000) {
					adjustBeauty("Belly Impant (Modifies all beauty)", (-0.5 * beauty));
				} else if (slave.bellyImplant >= 300000) {
					adjustBeauty("Belly Impant (Modifies all beauty)", (-0.3 * beauty));
				} else if (slave.bellyImplant >= 100000) {
					adjustBeauty("Belly Impant (Modifies all beauty)", (-0.2 * beauty));
				} else if (slave.bellyImplant >= 50000) {
					adjustBeauty("Belly Impant (Modifies all beauty)", (-0.15 * beauty));
				} else {
					adjustBeauty("Belly Impant: (Modifies all beauty)", (-0.1 * beauty));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAgeBeauty(slave) {
		if (slave.physicalAge === V.minimumSlaveAge) {
			adjustBeauty("Age: First Week Legal", 1);
			if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset") && arcology.FSRestart === "unset") {
				if (slave.birthWeek === 0) {
					adjustBeauty("Age: First Week Legal: Newborn: Fertile+FS", (1.6 * beauty));
				} else if (slave.birthWeek < 4) {
					adjustBeauty("Age: First Week Legal: Born Yesterday: Fertile+FS", (0.2 * beauty));
				}
			} else {
				if (slave.birthWeek === 0) {
					adjustBeauty("Age: First Week Legal: Newborn", (0.8 * beauty));
				} else if (slave.birthWeek < 4) {
					adjustBeauty("Age: First Week Legal: Born Yesterday", (0.1 * beauty));
				}
			}
		} else if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset") && arcology.FSRestart === "unset") {
			adjustBeauty("Age: Newborn: Fertile+FS", 1);
			if (slave.birthWeek === 0) {
				adjustBeauty("Age: Newborn", (0.8 * beauty));
			} else if (slave.birthWeek < 4) {
				adjustBeauty("Age: Born Yesterday", (0.1 * beauty));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPrestigeBeauty(slave) {
		/* multipliers */
		if (slave.prestige >= 3) {
			adjustBeauty("Prestige", (2 * beauty));
		} else if (slave.prestige === 2) {
			adjustBeauty("Prestige", (0.5 * beauty));
		} else if (slave.prestige === 1) {
			adjustBeauty("Prestige", (0.25 * beauty));
		}
		if (slave.porn.prestige === 3) {
			adjustBeauty("Porn Prestige", (beauty));
		} else if (slave.porn.prestige === 2) {
			adjustBeauty("Porn Prestige", (0.5 * beauty));
		} else if (slave.porn.prestige === 1) {
			adjustBeauty("Porn Prestige", (0.1 * beauty));
		}
	}
	return BeautyReturn;
})();

window.Beauty = function(s) {
	let beauty = BeautyArray(s).reduce((result, {value})=>result + value, 0);
	beauty = Math.max(1, Math.trunc(0.5 * beauty));
	return beauty;
};



window.BeautyTooltip = function(slave) {
	// Make a link.  Text should be slave'slave beauty.  Clicking the link will display detailed info about that beauty where the link used to be
	if (V.cheatMode || V.debugMode) {
		return jQuery('#BeautyTooltip').empty().append(BeautyDisplay(slave));
	} else {
		return BeautyDisplay(slave);
	}


	// Upon the link being clicked, set up some links to sort the info and a span to show it in
	function BeautyDisplay(slave) {
		let criteria = "value";
		let direction = "descending";

		// Link that shows beauty and will be used to toggle display
		let span  = document.createElement('span');
		span.appendChild(hide(slave));

		// Heading line that handles sorting
		let el = document.createElement('div');
		el.className = "clear-formatting";

		let textNode = document.createTextNode(`Sort by: `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Text", () => { criteria = "text", jQuery('#cheatBeautyContents').empty().append(BeautyFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Value", () => { criteria = "value", jQuery('#cheatBeautyContents').empty().append(BeautyFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Ascending", () => { direction = "ascending", jQuery('#cheatBeautyContents').empty().append(BeautyFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Descending", () => { direction = "descending", jQuery('#cheatBeautyContents').empty().append(BeautyFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		let cheatBeautyContents = document.createElement('div');
		cheatBeautyContents.id = "cheatBeautyContents";
		cheatBeautyContents.className = "clear-formatting";
		cheatBeautyContents.appendChild(BeautyFrame(slave));
		el.appendChild(cheatBeautyContents);
		span.appendChild(el);
		return span;

		// Set up the frame that contains the info
		function BeautyFrame(slave) {
			let el =  document.createDocumentFragment();
			let beautyArray;

			if ((criteria === "text" && direction === "descending") || (criteria === "value" && direction === "ascending")) {
				beautyArray = BeautyArray(slave).sort((a, b) => (a[criteria] > b[criteria]) ? 1 : -1);
			} else {
				beautyArray = BeautyArray(slave).sort((a, b) => (a[criteria] < b[criteria]) ? 1 : -1);
			}

			let domLine;
			let domCell;
			beautyArray.forEach((line) => {
				line.value = (Math.floor(line.value * 10) / 10);
				domLine =  document.createElement('div');
				domLine.style.display = "float";
					domCell =  document.createElement('span');
					domCell.style.float = "left";
					domCell.style.minWidth = "50px";

					let textNode = document.createTextNode(line.value);
					if (line.value > 0) {
						domCell.className = "green";
					} else if (line.value < 0) {
						domCell.className = "red";
					}
					domCell.appendChild(textNode);
					domLine.appendChild(domCell);

					textNode = document.createTextNode(line.text);
					domLine.appendChild(textNode);
				el.appendChild(domLine);
			});
			return el;
		}
	}

	function hide(slave) {
		return App.UI.DOM.link(Beauty(slave), () => { jQuery('#BeautyTooltip').empty().append(show(slave)); }, []);
	}

	function show(slave) {
		return App.UI.DOM.link(Beauty(slave), () => { jQuery('#BeautyTooltip').empty().append(BeautyDisplay(slave)); }, []);
	}
};

// this is a port of the FResult widget
// it has been broken up into several functions, because it grew too long
// it has been wrapped in a closure so as not to pollute the global namespace
// and so that nested functions are only evaluated once

window.FResultArray = (function() {
	"use strict";
	// we can't initialize our global variables on load, because SugarCube.State isn't initialized
	// instead, declare them and initialize on run time

	let result;
	let retval;
	let incestBonus;
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function FResult(slave, forSale = 0) {
		incestBonus = V.arcologies[0].FSEgyptianRevivalist > 20 || V.arcologies[0].FSEgyptianRevivalistIncestPolicy === 1;
		result = 0;
		retval = [];

		if (typeof forSale === undefined) {
			forSale = 0;
		}
		calcUseWeights(slave, forSale);
		if (!slave.fuckdoll) {
			calcNotFuckdoll(slave, forSale);
		} else {
			adjustFResult(`Fuckdoll`, slave.fuckdoll / 10);
		}

		if (!forSale) {
			adjustFResult(`Aphrodisiacs`, Math.max(0, slave.aphrodisiacs) * 2);

			if (slave.inflationType === "aphrodisiac") {
				adjustFResult(`Aphrodisiac: Inflation`, slave.inflation * 4);
			}
		}

		if (slave.lactation > 0) {
			adjustFResult(`Lactation`, 1);
		}

		if (slave.nipples === "fuckable") {
			calcFuckableTits(slave);
		}

		if (V.seeAge === 1) {
			calcAge(slave);
		}

		if (slave.pregWeek < 0) {
			adjustFResult(`Pregweek`, Math.trunc(result * slave.pregWeek / 10));
		} // reduced the most just after birth

		calcAmputation(slave);

		if (V.arcologies[0].FSHedonisticDecadence > 20) {
			calcHedonismWeight(slave);
		}

		if (slave.fetish === "mindbroken") {
			adjustFResult(`Mindbroken`, -Math.trunc(result * 0.6));
		} else {
			adjustFResult(`Not Mindbroken`, -Math.trunc(result * 0.3));
		}

		if (result < 2) {
			if (supremeRaceP(slave) && V.arcologies[0].FSSupremacist > 20) {
				adjustFResult(`Race is Supreme Race`, -result);
			} else {
				adjustFResult(`Rounding off: Slave value cannot be less than 2`, 2-result);
			}
		}
		return retval;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcUseWeights(slave, forSale=0) {
		adjustFResult(`Muscles`, (slave.muscles / 30)-result);
		if (slave.muscles < -95) {
			adjustFResult(`Muscles: Extremely weak`, -5);
		} else if (slave.muscles < -30) {
			adjustFResult(`Muscles: weak`, -2);
		}

		const uses = V.oralUseWeight + V.vaginalUseWeight + V.analUseWeight;
		if (uses <= 0) {
			return;
		}

		adjustFResult(`Oral potential: Tongue piercing, skill, and arcology oral weight`, (6 + slave.tonguePiercing) * (V.oralUseWeight / uses) * (slave.skill.oral / 30));
		if (slave.sexualFlaw === "cum addict") {
			adjustFResult(`Oral potential: Cum Addict, skill, and arcology oral weight`, (V.oralUseWeight / uses) * (slave.skill.oral / 30));
		}
		if (canDoVaginal(slave) || (slave.vagina > -1 && forSale)) {
			adjustFResult(`Vaginal potential: skill, and arcology vaginal weight`, 6 * (V.vaginalUseWeight / uses) * (slave.skill.vaginal / 30));
			adjustFResult(`Vaginal potential: Vagina stretched level`, (3 - slave.vagina));
			adjustFResult(`Vaginal: Lube`, slave.vaginaLube);
		}
		if (canDoAnal(slave) || forSale) {
			adjustFResult(`Anal potential: (TODO: does not include piercing?) skill, and arcology anal weight`, 6 * (V.analUseWeight / uses) * (slave.skill.anal / 30));
			adjustFResult(`Anus potential: Anus stretched level`, (3 - slave.anus));
			if (slave.sexualFlaw === "anal addict") {
				adjustFResult(`Anal potential: skill, and arcology anal weight`, (V.analUseWeight / uses) * (slave.skill.anal / 30));
			}
			if (slave.inflationType === "aphrodisiac" && !forSale) {
				adjustFResult(`Anal potential: Aphrodisiac inflation`, (V.analUseWeight / uses) * (slave.inflation * 3));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFuckableTits(slave) {
		adjustFResult(`Tits: base bonus for all slaves`, 2);
		if (slave.fetish === "boobs") {
			adjustFResult(`Tits`, Math.trunc(slave.fetishStrength / 20));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRelatives(slave) {
		V.slaves.forEach(islave => {
			if (isParentP(slave, islave) && sameAssignmentP(slave, islave)) {
				adjustFResult(`Works with their kid(s)`, 1);
				if (incestBonus) {
					adjustFResult(`Works with their kid(s): incest bonus`, 1);
				}
			}
			if (areSisters(slave, islave) > 0 && sameAssignmentP(slave, islave)) {
				adjustFResult(`Works with their sibling(s)`, 1);
				if (incestBonus) {
					adjustFResult(`Works with their sibling(s): incest bonus`, 1);
				}
			}
		});
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRelativesVanilla(slave) {
		const fre = getSlave(slave.relationTarget);
		if (fre !== undefined && sameAssignmentP(slave, fre)) {
			adjustFResult(`Works with relative`, 2);
			if (incestBonus) {
				adjustFResult(`Works with relative: incest bonus`, 2);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRelationship(slave) {
		const fre = V.slaves.findIndex(s => {
			return haveRelationshipP(slave, s) && sameAssignmentP(slave, s);
		});
		if (fre !== -1) {
			adjustFResult(`Works with lover`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRival(slave) {
		const en = getSlave(slave.rivalryTarget);
		if (en !== undefined && sameAssignmentP(slave, en)) {
			adjustFResult(`Works with rival`, -1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHInjectionsDiet(slave) {
		if (slave.drugs === "male hormone injections" || slave.drugs === "female hormone injections") {
			adjustFResult(`Hormone Injections`, -10);
		}
		if (slave.diet === "XXY") {
			adjustFResult(`Diet: XXY`, 2);
		} else if (slave.diet === "XY" || slave.diet === "XX") {
			adjustFResult(`Diet: XY/XX`, 1);
		} else if (slave.diet === "cum production") {
			adjustFResult(`Diet: Cum Production`, 1);
		} else if (slave.diet === "fertility") {
			adjustFResult(`Diet: Fertility`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPreg(slave) {
		if (V.arcologies[0].FSRepopulationFocus > 20) {
			if (slave.belly >= 1500) {
				adjustFResult(`Belly: Repopulationist`, 2);
			} else {
				adjustFResult(`Belly: Repopulationist`, -2);
			}
		} else if (V.arcologies[0].FSRepopulationFocusPregPolicy === 1) {
			if (slave.bellyPreg >= 1500) {
				adjustFResult(`Belly: Repopulationist: Preg Policy`, 1);
			}
		} else if (V.arcologies[0].FSRestart > 20) {
			if (slave.bellyPreg >= 500 && slave.breedingMark === 1 && V.propOutcome === 1) {
				adjustFResult(`Belly: Elitist, Has Mark`, 1);
			} else if (slave.bellyPreg >= 1500) {
				adjustFResult(`Belly: Elitist, No Mark`, -10);
			} else {
				adjustFResult(`Belly: Elitist, No Mark`, 0);
			}
		}
		if ((V.arcologies[0].FSRepopulationFocusMilfPolicy === 1 || V.arcologies[0].FSRepopulationFocus > 20) && slave.counter.birthsTotal > 0) {
			adjustFResult(`Belly: Elitist, MILF Policy`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcRace(slave) {
		if (V.arcologies[0].FSSupremacist !== "unset" && supremeRaceP(slave)) {
			adjustFResult(`Race is supreme race`, -(V.arcologies[0].FSSupremacist / 5) + (V.arcologies[0].FSSupremacistLawME * 10));
		}
		if (V.arcologies[0].FSSubjugationist !== "unset" && inferiorRaceP(slave)) {
			adjustFResult(`Race is inferior race`, (V.arcologies[0].FSSubjugationist / 10) + (V.arcologies[0].FSSubjugationistLawME));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSexAttributes(slave) {
		if (slave.clitPiercing > 2) {
			adjustFResult(`Piercings: Clit`, 1);
		}
		if (slave.tail === "sex") {
			adjustFResult(`Tail: Sex`, 1);
		}
		if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish !== "none") {
			adjustFResult(`Fetish: Known`, slave.fetishStrength / 5);
		}

		if (slave.attrKnown === 1) {
			adjustFResult(`Attraction Known: XX`, Math.trunc(slave.attrXX / 20));
			adjustFResult(`Attraction Known: XY`, Math.trunc(slave.attrXY / 20));
			if (slave.energy > 95) {
				adjustFResult(`Energy`, 3);
			} else if (slave.energy > 80) {
				adjustFResult(`Energy`, 2);
			} else if (slave.energy > 60) {
				adjustFResult(`Energy`, 1);
			} else if (slave.energy <= 20) {
				adjustFResult(`Energy`, -2);
			} else if (slave.energy <= 40) {
				adjustFResult(`Energy`, -1);
			}
		}
		if (slave.sexualFlaw !== "none") {
			adjustFResult(`Sexual Flaw`, -2);
		}
		if (slave.sexualQuirk !== "none") {
			adjustFResult(`Sexual Quirk`, 2);
		}
		if (slave.behavioralFlaw !== "none") {
			adjustFResult(`Behavioral Flaw`, -2);
		}
		if (slave.behavioralQuirk !== "none") {
			adjustFResult(`Behavioral Quirk`, 2);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcCareer(slave) {
		if (setup.whoreCareers.includes(slave.career)) {
			adjustFResult(`Whore Knowledge: Career`, 1);
		} else if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
			adjustFResult(`Whore Knowledge: Experiance`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSight(slave) {
		if (!canSee(slave)) {
			adjustFResult(`Eyes: Blind`, -3);
		} else if (!canSeePerfectly(slave)) {
			adjustFResult(`Eyes: Perfect vision`, -1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHearing(slave) {
		if (!canHear(slave)) {
			adjustFResult(`Ears: Deaf`, -2);
		} else if (slave.hears <= -1) {
			if (slave.earwear !== "hearing aids") {
				adjustFResult(`Ears: Bad Hearing`, -1);
			}
		} else if (slave.earwear === "muffling ear plugs") {
			adjustFResult(`Ears: Muffling Ear Plugs`, -1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcYouthBonus(slave) {
		if (slave.visualAge < 30) {
			if (slave.actualAge > 30) {
				adjustFResult(`Age: Actual`, 5);
			} // experienced for her apparent age
			if (slave.physicalAge > 30) {
				adjustFResult(`Age: Physical`, -slave.physicalAge / 2);
			} // too old :(
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMatureBonus(slave) {
		if (slave.visualAge >= 30 && slave.actualAge >= 30 && slave.physicalAge > slave.visualAge) {
			adjustFResult(`Age: Mature`, Math.min((slave.physicalAge - slave.visualAge) * 2, 20));
		} // looks and acts mature, but has a body that just won't quit
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSlaveProfessionalismBonus(slave) {
		if (slave.devotion > 50) {
			if (slave.energy <= 40) {
				adjustFResult(`Engery: Professionalism`, 4);
			} else {
				adjustFResult(`Engery: Professionalism`, 2);
			}
		} // Professional slaves try harder
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcNotFuckdoll(slave, forSale=0) {
		if (!forSale) {
			if (V.familyTesting === 1 && totalRelatives(slave) > 0) {
				calcWorksWithRelatives(slave);
			} else if (!V.familyTesting && slave.relation !== 0) {
				calcWorksWithRelativesVanilla(slave);
			}
			if (slave.relationship > 0) {
				calcWorksWithRelationship(slave);
			}
			if (slave.rivalry !== 0) {
				calcWorksWithRival(slave);
			}
			calcHInjectionsDiet(slave);
		}
		calcPreg(slave);
		calcRace(slave);
		calcSexAttributes(slave);
		calcCareer(slave);
		if (!forSale) {
			calcSight(slave);
			calcHearing(slave);
		} else {
			adjustFResult(`Ears: Hearing`, slave.hears);
			// see: 0
			// impaired: -1
			// blind: -3
			adjustFResult(`Eyes: Vision`, Math.clamp(getBestVision(slave) * 2 - 3, -3, 0));
		}
		if (V.arcologies[0].FSYouthPreferentialist !== "unset") {
			calcYouthBonus(slave);
		} else if (V.arcologies[0].FSMaturityPreferentialist !== "unset") {
			calcMatureBonus(slave);
		}
		if (V.arcologies[0].FSSlaveProfessionalism !== "unset") {
			calcSlaveProfessionalismBonus(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAge(slave) {
		if ((V.arcologies[0].FSRepopulationFocus !== "unset" || V.arcologies[0].FSGenderFundamentalist !== "unset") && slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave)) {
			adjustFResult(`Young and Fertile: Repopulationist /Gender Fundamentalist`, 1);
			if (slave.birthWeek === 0) {
				adjustFResult(`Newborn and Fertile: Repopulationist /Gender Fundamentalist`, result);
			} else if (slave.birthWeek < 4) {
				adjustFResult(`Very Young and Fertile: Repopulationist /Gender Fundamentalist`, 0.2 * result);
			}
		} else if (slave.physicalAge === V.minimumSlaveAge) {
			adjustFResult(`Young`, 1);
			if (slave.birthWeek === 0) {
				adjustFResult(`Newborn`, 0.5 * result);
			} else if (slave.birthWeek < 4) {
				adjustFResult(`Very Young`, 0.1 * result);
			}
		} else if ((V.arcologies[0].FSRepopulationFocus !== "unset" || V.arcologies[0].FSGenderFundamentalist !== "unset") && slave.physicalAge === V.fertilityAge && canGetPregnant(slave)) {
			adjustFResult(`Young and Fertile: Repopulationist /Gender Fundamentalist`, 1);
			if (slave.birthWeek === 0) {
				adjustFResult(`Newborn and Fertile: Repopulationist /Gender Fundamentalist`, 0.5 * result);
			} else if (slave.birthWeek < 4) {
				adjustFResult(`Very Young and Fertile: Repopulationist /Gender Fundamentalist`, 0.1 * result);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAmputation(slave) {
		// missing limbs
		adjustFResult(`Limbs: Missing`, -getLimbCount(slave, 0) * 0.5);
		// non-sex prosthetics
		adjustFResult(`Prosthetics: Non Sexual`, -getLimbCount(slave, 102) - getLimbCount(slave, 103) * 0.25);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHedonismWeight(slave) {
		if (slave.weight < 10) {
			adjustFResult(`Weight: Hedonism`, -2);
		} else if (slave.weight > 190) {
			adjustFResult(`Weight: Hedonism`, -5);
		} // too fat
	}

	/**
	 * @param {string} text blurb
	 * @param {number} FResultChange
	 */
	function adjustFResult(text, FResultChange) {
		retval.push({text: text, value: FResultChange});
		result += FResultChange;
	}

	return FResult;
})();

window.FResult = function(s) {
	let FResult = FResultArray(s).reduce((result, {value})=>result + value, 0);
	FResult = Math.trunc(FResult);
	return FResult;
};



window.FResultTooltip = function(slave) {
	// Make a link.  Text should be slave'slave FResult.  Clicking the link will display detailed info about that beauty where the link used to be
	if (V.cheatMode || V.debugMode) {
		return jQuery('#FResultTooltip').empty().append(FResultDisplay(slave));
	} else {
		return FResultDisplay(slave);
	}
	// Upon the link being clicked, set up some links to sort the info and a span to show it in
	function FResultDisplay(slave) {
		let criteria = "value";
		let direction = "descending";

		// Link that shows FResult and will be used to toggle display
		let span  = document.createElement('span');
		span.appendChild(hide(slave));

		// Heading line that handles sorting
		let el = document.createElement('div');
		el.className = "clear-formatting";

		let textNode = document.createTextNode(`Sort by: `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Text", () => { criteria = "text", jQuery('#cheatFResultContents').empty().append(FResultFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Value", () => { criteria = "value", jQuery('#cheatFResultContents').empty().append(FResultFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Ascending", () => { direction = "ascending", jQuery('#cheatFResultContents').empty().append(FResultFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		el.appendChild(App.UI.DOM.link("Descending", () => { direction = "descending", jQuery('#cheatFResultContents').empty().append(FResultFrame(slave)); }, []));

		textNode = document.createTextNode(` | `);
		el.appendChild(textNode);

		let cheatFResultContents = document.createElement('div');
		cheatFResultContents.id = "cheatFResultContents";
		cheatFResultContents.className = "clear-formatting";
		cheatFResultContents.appendChild(FResultFrame(slave));
		el.appendChild(cheatFResultContents);
		span.appendChild(el);
		return span;

		// Set up the frame that contains the info, returns dom node
		function FResultFrame(slave) {
			let el =  document.createDocumentFragment();
			let fResultArray;

			if ((criteria === "text" && direction === "descending") || (criteria === "value" && direction === "ascending")) {
				fResultArray = FResultArray(slave).sort((a, b) => (a[criteria] > b[criteria]) ? 1 : -1);
			} else {
				fResultArray = FResultArray(slave).sort((a, b) => (a[criteria] < b[criteria]) ? 1 : -1);
			}

			let domLine;
			let domCell;
			fResultArray.forEach((line) => {
				line.value = (Math.floor(line.value * 10) / 10);
				domLine =  document.createElement('div');
				domLine.style.display = "float";
					domCell =  document.createElement('span');
					domCell.style.float = "left";
					domCell.style.minWidth = "50px";

					let textNode = document.createTextNode(line.value);
					if (line.value > 0) {
						domCell.className = "green";
					} else if (line.value < 0) {
						domCell.className = "red";
					}
					domCell.appendChild(textNode);
					domLine.appendChild(domCell);

					textNode = document.createTextNode(line.text);
					domLine.appendChild(textNode);
				el.appendChild(domLine);
			});
			return el;
		}
	}

	function hide(slave) {
		return App.UI.DOM.link(FResult(slave), () => { jQuery('#FResultTooltip').empty().append(show(slave)); }, []);
	}

	function show(slave) {
		return App.UI.DOM.link(FResult(slave), () => { jQuery('#FResultTooltip').empty().append(FResultDisplay(slave)); }, []);
	}
};

window.slaveCost = function slaveCost(slave, isStartingSlave) {
	const milked = saGetMilked(slave, true);
	const beauty = slaveCostBeauty(slave, isStartingSlave);
	if ((milked*52) > beauty && !isStartingSlave) {  // Arbitrarily, let's say their milk worth is what they would make in a year.  Blocking starting slave for now because milk makes so much money, the estimation makes game start impossible.
		return milked*52;
	} else {
		return beauty;
	}
};

window.slaveCostBeauty = (function() {
	"use strict";

	let arcology;
	let multiplier;
	let cost;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} isStartingSlave
	 * @returns {number} Any number here means the slave
	 * is a "starting slave"
	 */
	function slaveCost(slave, isStartingSlave) {
		arcology = V.arcologies[0];
		multiplier = V.slaveCostFactor;
		cost = Beauty(slave) * FResult(slave, 1);

		calcGenitalsCost(slave);
		calcDevotionTrustCost(slave);
		calcPreferencesCost(slave);
		calcPregCost(slave);
		if (slave.prestige + slave.porn.prestige > 0) {
			calcPrestigeCost(slave);
		}
		calcFSCost(slave);
		if (V.seeAge === 1) {
			calcAgeCost(slave);
		}
		calcCareersCost(slave);
		calcMiscCost(slave);
		calcIndentureCost(slave); /* multipliers */

		calcCost();
		if (isStartingSlave) {
			calcStartingSlaveCost(slave);
		}
		return cost;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcGenitalsCost(slave) {
		if (slave.vagina === 0 && slave.counter.vaginal === 0) {
			multiplier += 0.2;
		}
		if (slave.anus === 0 && slave.counter.anal === 0) {
			multiplier += 0.2;
		}
		// Boosted these to 20% to account for the fact that it limits the skill that can be attained
		if (slave.vagina > -1 && arcology.FSRestartSMR === 1) {
			if (slave.dick > 0) {
				if (slave.ovaries === 0 && slave.balls === 0) {
					multiplier += 0.8;
				}
			}
		} else if (slave.vagina > -1) {
			if (slave.dick > 0) {
				if (V.ui !== "start" || V.PC.dick === 0 || V.PC.vagina === -1) {
					multiplier += 0.2;
					if (slave.ovaries > 0) {
						if (slave.balls > 0) {
							multiplier += 0.8;
						}
					}
				} else {
					multiplier += 0.1;
					if (slave.ovaries > 0) {
						if (slave.balls > 0) {
							multiplier += 0.2;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcDevotionTrustCost(slave) {
		if (V.specialSlavesPriceOverride === 1) {
			if (slave.devotion > 50) {
				multiplier += slave.devotion / 200;
			}
			if (slave.trust > 50) {
				multiplier += slave.trust / 200;
			}
		} else {
			multiplier += slave.devotion / 200;
			if (slave.devotion < -20) {
				if (slave.trust > 0) {
					multiplier -= slave.trust / 200;
				}
			} else {
				if (slave.trust > 0) {
					multiplier += slave.trust / 200;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPreferencesCost(slave) {
		if (slave.behavioralFlaw !== "none") {
			multiplier -= 0.1;
		}
		if (slave.behavioralQuirk !== "none") {
			multiplier += 0.1;
		}
		if (slave.sexualFlaw === "breeder" && arcology.FSRepopulationFocus !== "unset") {
			multiplier += 0.3;
		} else if (slave.sexualFlaw !== "none") {
			multiplier -= 0.1;
		}
		if (slave.sexualQuirk !== "none") {
			multiplier += 0.1;
		}
		if (slave.fetishKnown === 1) {
			if (slave.fetish === "mindbroken") {
				multiplier -= 0.3;
			} else if (slave.fetish !== "none") {
				multiplier += slave.fetishStrength / 1000;
			}
		} else {
			multiplier -= 0.1;
		}
		if (slave.attrKnown === 1) {
			if (slave.energy > 95) {
				multiplier += 0.2;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPregCost(slave) {
		if (slave.mpreg === 1) {
			multiplier += 0.2;
		}
		if (arcology.FSRepopulationFocusSMR === 1) {
			if (slave.preg < -1) {
				multiplier -= 0.5;
			} else if (slave.bellyPreg >= 300000) {
				multiplier += 1;
			} else if (slave.bellyPreg >= 120000) {
				multiplier += 0.5;
			} else if (slave.preg > slave.pregData.normalBirth / 4) {
				multiplier += 0.1;
			}
		} else if (arcology.FSRestartSMR === 1) {
			if (slave.preg < -1) {
				multiplier += 0.5;
			} else if (slave.bellyPreg >= 300000) {
				multiplier -= 2.5;
			} else if (slave.bellyPreg >= 30000) {
				multiplier -= 1.5;
			} else if (slave.preg > slave.pregData.normalBirth / 4) {
				multiplier -= 1.0;
			}
		} else {
			if (slave.preg < -1) {
				multiplier -= 0.1;
			} else if (slave.bellyPreg >= 300000) {
				multiplier -= 1.5;
			} else if (slave.bellyPreg >= 120000) {
				multiplier -= 0.5;
			} else if (slave.bellyPreg >= 500 || slave.pregKnown === 1) {
				multiplier -= 0.1;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPrestigeCost(slave) {
		if (slave.prestige > 0) {
			multiplier += 0.7 * slave.prestige;
		}
		if (slave.porn.prestige === 3) {
			multiplier += 1.5;
		} else if (slave.porn.prestige === 2) {
			multiplier += 0.7;
		} else if (slave.porn.prestige === 1) {
			multiplier += 0.2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFSCost(slave) {
		if (arcology.FSSupremacistLawME !== 0) {
			if (slave.race !== arcology.FSSupremacistRace) {
				multiplier -= 0.1;
			}
		}
		if (arcology.FSSubjugationistLawME !== 0) {
			if (slave.race === arcology.FSSubjugationistRace) {
				multiplier -= 0.2;
			}
		}
		if (arcology.FSRepopulationFocusSMR !== 0) {
			if (slave.preg > 0) {
				multiplier += 0.1;
			}
		} else if (arcology.FSRestartSMR !== 0) {
			if (slave.dick > 0) {
				multiplier -= 0.1;
			}
			if (slave.balls > 0) {
				multiplier -= 0.2;
			}
			if (slave.vagina > 0) {
				multiplier -= 0.1;
			}
			if (slave.ovaries > 0) {
				multiplier -= 0.5;
			}
		}
		if (arcology.FSGenderFundamentalistSMR !== 0) {
			if (slave.dick > 0) {
				multiplier -= 0.1;
			}
			if (slave.balls > 0) {
				multiplier -= 0.1;
			}
		} else if (arcology.FSGenderRadicalist !== "unset") {
			if (slave.dick > 0) {
				multiplier += 0.1;
			}
			if (slave.balls > 0) {
				multiplier -= 0.1;
			}
		}
		if (arcology.FSPetiteAdmirationSMR !== 0 || arcology.FSStatuesqueGlorificationSMR !== 0) {
			if (heightPass(slave)) {
				multiplier += 0.1;
			} else {
				multiplier -= 0.1;
			}
		}
		if (arcology.FSSlaveProfessionalism !== "unset") {
			multiplier += 0.1 * (slave.intelligence / 20);
		}
		if (arcology.FSHedonisticDecadenceSMR !== 0) {
			if (slave.weight > 60 && slave.muscles < 5) {
				multiplier += 0.1;
			}
		}
		if (arcology.FSArabianRevivalist > 50) {
			multiplier += 0.1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAgeCost(slave) {
		if (slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset")) {
			if (slave.birthWeek === 0) {
				multiplier += 0.4;
			} else if (slave.birthWeek < 4) {
				multiplier += 0.1;
			}
		} else if (slave.physicalAge === V.minimumSlaveAge) {
			if (slave.birthWeek === 0) {
				multiplier += 0.2;
			} else if (slave.birthWeek < 4) {
				multiplier += 0.05;
			}
		} else if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset")) {
			if (slave.birthWeek === 0) {
				multiplier += 0.2;
			} else if (slave.birthWeek < 4) {
				multiplier += 0.05;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcCareersCost(slave) {
		if (slave.career !== 0) {
			if (slave.career === "a slave") {
				multiplier += 0.1;
			} else if (setup.bodyguardCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.wardenessCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.attendantCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.matronCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.schoolteacherCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.stewardessCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.milkmaidCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.farmerCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.madamCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.DJCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.HGCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.recruiterCareers.includes(slave.career)) {
				multiplier += 0.1;
			} else if (setup.entertainmentCareers.includes(slave.career)) {
				multiplier += 0.05;
			} else if (setup.whoreCareers.includes(slave.career)) {
				multiplier += 0.05;
			} else if (setup.gratefulCareers.includes(slave.career)) {
				multiplier += 0.05;
			} else if (setup.menialCareers.includes(slave.career)) {
				multiplier += 0.05;
			} else if (setup.servantCareers.includes(slave.career)) {
				multiplier += 0.05;
			}
		}
		if (V.week - slave.weekAcquired >= 20 && slave.skill.entertainment >= 100) {
			if (!setup.entertainmentCareers.includes(slave.career)) {
				multiplier += 0.05;
			}
		}
		if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
			if (!setup.whoreCareers.includes(slave.career)) {
				multiplier += 0.05;
			}
		}
		if (!setup.bodyguardCareers.includes(slave.career) && slave.skill.bodyguard >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.wardenessCareers.includes(slave.career) && slave.skill.wardeness >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.attendantCareers.includes(slave.career) && slave.skill.attendant >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.matronCareers.includes(slave.career) && slave.skill.matron >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.schoolteacherCareers.includes(slave.career) && slave.skill.teacher >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.stewardessCareers.includes(slave.career) && slave.skill.stewardess >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.milkmaidCareers.includes(slave.career) && slave.skill.milkmaid >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.farmerCareers.includes(slave.career) && slave.skill.farmer >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.madamCareers.includes(slave.career) && slave.skill.madam >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.DJCareers.includes(slave.career) && slave.skill.DJ >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.HGCareers.includes(slave.career) && slave.skill.headGirl >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.recruiterCareers.includes(slave.career) && slave.skill.recruiter >= V.masteredXP) {
			multiplier += 0.1;
		}
		if (!setup.servantCareers.includes(slave.career) && slave.skill.servant >= V.masteredXP) {
			multiplier += 0.05;
		}
		if (!setup.entertainmentCareers.includes(slave.career) && slave.skill.entertainer >= V.masteredXP) {
			multiplier += 0.05;
		}
		if (!setup.whoreCareers.includes(slave.career) && slave.skill.whore >= V.masteredXP) {
			multiplier += 0.05;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMiscCost(slave) {
		const totalInt = Math.clamp(slave.intelligence + slave.intelligenceImplant, -130, 130);
		/* make absolutely certain we do not use +-131 in the next line
		 */
		multiplier += Math.floor((Math.asin(totalInt / 131)) * 50) / 50;
		if (slave.pubertyXY === 0 && slave.physicalAge >= V.potencyAge && slave.genes === "XY" && arcology.FSGenderRadicalist === "unset") {
			multiplier += 0.5;
		}
		if (slave.geneticQuirks.albinism === 2) {
			multiplier += 0.2;
		}
		if (V.rep > 10000) {
			multiplier += 0.1*(Object.getOwnPropertyNames(slave.brand).length);
		} else if (V.rep < 5000) {
			multiplier -= 0.1*(Object.getOwnPropertyNames(slave.brand).length);
		}
		multiplier -= getLimbCount(slave, 0) * 0.05;
		if (!canSee(slave)) {
			multiplier -= 0.2;
		}
		if (slave.hears === -2) {
			multiplier -= 0.1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcIndentureCost(slave) {
		if (slave.indenture > -1) {
			multiplier -= 0.1 * slave.indentureRestrictions;
			multiplier -= (260 - slave.indenture) / 260;
		} else if (V.seeAge === 1) {
			if (slave.actualAge >= (V.retirementAge - 5) && V.PhysicalRetirementAgePolicy !== 1) {
				multiplier *= (V.retirementAge - slave.actualAge) / 5;
			}
			if (slave.physicalAge >= (V.retirementAge - 5) && V.PhysicalRetirementAgePolicy === 1) {
				multiplier *= (V.retirementAge - slave.actualAge) / 5;
			}
		}
	}

	function calcCost( /* slave */ ) {
		cost *= multiplier * 50;
		cost = Number(cost) || 0;
		if (cost < V.minimumSlaveCost) {
			cost = V.minimumSlaveCost;
		} else if (cost <= 100000) {
			/* do nothing */
		} else if (cost <= 200000) {
			cost -= (cost - 100000) * 0.1;
		} else if (cost <= 300000) {
			cost -= 10000 + ((cost - 200000) * 0.2);
		} else if (cost <= 400000) {
			cost -= 30000 + ((cost - 300000) * 0.3);
		} else if (cost <= 500000) {
			cost -= 60000 + ((cost - 400000) * 0.4);
		} else {
			cost -= 100000 + ((cost - 500000) * 0.5);
		}
		if (cost < 1000) {
			cost = 1000;
		}
		cost = 500 * Math.trunc(cost / 500);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcStartingSlaveCost(slave) {
		let startingSlaveMultiplier = 0;

		if (slave.devotion > 20) {
			startingSlaveMultiplier += (0.000117 * (slave.devotion - 20) * (slave.devotion - 20)) + (0.003167 * (slave.devotion - 20));
		}
		if (slave.skill.whoring) {
			startingSlaveMultiplier += 0.00001 * slave.skill.whoring * slave.skill.whoring;
		}
		if (slave.skill.entertainment) {
			startingSlaveMultiplier += 0.00001 * slave.skill.entertainment * slave.skill.entertainment;
		}
		if (slave.skill.vaginal) {
			startingSlaveMultiplier += 0.00001 * slave.skill.vaginal * slave.skill.vaginal;
		}
		if (slave.skill.anal) {
			startingSlaveMultiplier += 0.00001 * slave.skill.anal * slave.skill.anal;
		}
		if (slave.skill.oral) {
			startingSlaveMultiplier += 0.00001 * slave.skill.oral * slave.skill.oral;
		}
		if (slave.skill.combat) {
			startingSlaveMultiplier += 0.1;
		}
		if (slave.prestige) {
			startingSlaveMultiplier += slave.prestige;
		}
		if (startingSlaveMultiplier) {
			if (slave.actualAge > 25) {
				startingSlaveMultiplier -= startingSlaveMultiplier * (slave.actualAge - 25) * 0.05;
			}
		}
		startingSlaveMultiplier = Math.clamp(startingSlaveMultiplier, 0, 10);
		cost += cost * startingSlaveMultiplier;
		cost = 500 * Math.trunc(cost / 500);
		if (V.PC.career === "slaver") {
			cost /= 2;
		}
	}

	return slaveCost;
})();

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.startingSlaveCost = function startingSlaveCost(slave) {
	return slaveCost(slave, true);
};
