/* eslint-disable camelcase */
window.GenerateNewSlave = (function() {
	"use strict";

	let chance;
	/**
	 * @type {App.Entity.SlaveState} */
	let slave;

	function GenerateNewSlave(sex) {
		slave = BaseSlave();

		preGenCombinedStats();
		if (!sex) {
			if (jsRandom(0, 99) < V.seeDicks) {
				GenerateXYSlave();
			} else if (V.seeDicks > 0) {
				let femaleSlaveGen = 80;
				if (V.arcologies[0].FSGenderFundamentalistSMR === 1 || V.arcologies[0].FSRepopulationFocusSMR === 1) {
					femaleSlaveGen = 90;
				} else if (V.arcologies[0].FSGenderRadicalist !== "unset") {
					femaleSlaveGen = 50;
				}
				if (jsRandom(1, 100) > femaleSlaveGen && jsRandom(0, 99) < V.seeDicks) {
					GenerateXYSlave();
				} else {
					GenerateXXSlave();
				}
			} else {
				GenerateXXSlave();
			}
		} else if (sex === "XY") {
			GenerateXYSlave();
		} else {
			GenerateXXSlave();
		}
		postGenCleanup();

		return slave;
	}

	function preGenCombinedStats() {
		slave.ID = generateSlaveID();
		slave.weekAcquired = V.week;
		slave.canRecruit = 1;
		slave.devotion = jsRandom(-90, -60);
		slave.trust = jsRandom(-45, -25);
		slave.weight = jsRandom(-100, 180);
		setHealth(slave);

		WombInit(slave);
		generateAge();
		generateIntelligence();
		generateCareer();
		generateNationality(); /* includes race selection */
		generateAccent();
		generateRacialTraits();
	}

	function postGenCleanup() {
		nationalityToName(slave);
		generatePuberty(slave);
		generateBoobTweaks(); /* split this up for female vs. male? */
		generateSkills();
		generateDisabilities();
		generateGeneticQuirkTweaks();
		generateHormones();
		generatePronouns(slave);
		slave.origRace = slave.race;
		slave.hColor = getGeneticHairColor(slave);
		slave.skin = getGeneticSkinColor(slave);
		resetEyeColor(slave, "both");
	}

	function GenerateXXSlave() {
		slave.ovaries = 1;
		slave.energy = jsRandom(1, 85);

		generateXXGeneticQuirks();
		generateXXBodyProportions();
		generateVagina();
		generateXXPreferences();
		generateXXButt();
		generateXXBoobs();
		generateXXFace();
		generateXXPregAdaptation();
		generateXXVoice();
		generateXXTeeth();
		generateXXMods();
		generateXXBodyHair();
	}

	function GenerateXYSlave() {
		slave.genes = "XY";
		slave.hLength = 10;
		slave.prostate = 1;
		slave.energy = jsRandom(15, 90);

		generateXYGeneticQuirks();
		generateXYBodyProportions();
		generateDick();
		generateCircumcision();
		generateXYPreferences(); /* must happen after genitalia generation */
		generateXYButt(); /* must happen after preferences */
		generateXYBoobs();
		generateXYFace();
		generateXYPregAdaptation();
		generateXYVoice();
		generateXYTeeth();
		generateXYMods();
		generateXYBodyHair();
	}

	function generateXXBodyProportions() {
		if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
			slave.height = Math.round(Height.random(slave, {limitMult: [-4, -1], spread: 0.15}));
		} else if (slave.geneticQuirks.gigantism === 2) {
			slave.height = Math.round(Height.random(slave, {limitMult: [3, 10], spread: 0.15}));
		} else {
			slave.height = Math.round(Height.random(slave));
		}
		if (slave.height >= Height.mean(slave) * 170 / 162.5) {
			slave.hips = jsEither([-1, 0, 0, 1, 1, 2, 2]);
			slave.shoulders = jsEither([-1, -1, 0, 0, 0, 1]);
		} else {
			slave.hips = jsEither([-1, 0, 0, 0, 1, 1, 2]);
			slave.shoulders = jsEither([-2, -1, -1, 0, 0, 1]);
		}
		if (slave.physicalAge <= 11) {
			slave.hips = jsEither([-2, -2, -1, -1, 0]);
		} else if (slave.physicalAge <= 13) {
			slave.hips = jsEither([-2, -1, -1, 0, 1]);
		}
		if (slave.weight < -30) {
			slave.waist = jsRandom(-55, 0);
		} else if (slave.physicalAge < 13) {
			slave.waist = jsRandom(-25, 25);
		} else if (slave.weight <= 30) {
			slave.waist = jsRandom(-45, 45);
		} else if (slave.weight <= 160) {
			slave.waist = jsRandom(0, 55);
		} else {
			slave.waist = jsRandom(50, 100);
		}
	}

	function generateXYBodyProportions() {
		if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
			slave.height = Math.round(Height.random(slave, {limitMult: [-4, -1], spread: 0.15}));
		} else if (slave.geneticQuirks.gigantism === 2) {
			slave.height = Math.round(Height.random(slave, {limitMult: [3, 10], spread: 0.15}));
		} else {
			slave.height = Math.round(Height.random(slave));
		}
		if (slave.physicalAge <= 13) {
			if (slave.height > Height.mean(slave) * 170 / 172.5) {
				slave.hips = jsEither([-2, -1, -1, 0, 1]);
				slave.shoulders = jsEither([-1, -1, 0, 0, 0, 1]);
			} else {
				slave.hips = jsEither([-2, -2, -1, -1, 0]);
				slave.shoulders = jsEither([-2, -1, -1, 0, 0, 1]);
			}
		} else {
			if (slave.height > Height.mean(slave) * 170 / 172.5) {
				slave.hips = jsEither([-2, -1, -1, 0, 1]);
				slave.shoulders = jsEither([-1, 0, 1, 1, 2, 2]);
			} else {
				slave.hips = jsEither([-2, -2, -1, -1, 0]);
				slave.shoulders = jsEither([-1, 0, 0, 1, 1, 2]);
			}
		}
		if (slave.physicalAge < 13) {
			slave.waist = jsRandom(-15, 25);
		} else if (slave.weight < -30) {
			slave.waist = jsRandom(-45, 45);
		} else if (slave.weight <= 30) {
			slave.waist = jsRandom(-15, 65);
		} else if (slave.weight <= 160) {
			slave.waist = jsRandom(5, 100);
		} else {
			slave.waist = jsRandom(50, 100);
		}
	}

	function generateVagina() {
		if (slave.physicalAge <= 13) {
			slave.vagina = jsEither([0, 0, 0, 0, 0, 0, 0, 1]);
		} else if (slave.physicalAge <= 15) {
			slave.vagina = jsEither([0, 0, 0, 0, 0, 0, 1, 1]);
		} else if (slave.physicalAge <= 17) {
			slave.vagina = jsEither([0, 0, 0, 0, 0, 1, 1, 1]);
		} else if (slave.physicalAge < 20) {
			slave.vagina = jsEither([0, 1]);
		} else if (slave.physicalAge > 30) {
			slave.vagina = jsEither([1, 1, 1, 1, 2]);
		} else {
			slave.vagina = jsEither([0, 0, 1, 1, 1]);
		}

		if (slave.physicalAge <= 11) {
			slave.clit = jsEither([0, 0, 0, 0, 0, 0, 0, 0, 1]);
		} else if (slave.physicalAge <= 13) {
			slave.clit = jsEither([0, 0, 0, 0, 0, 0, 0, 1, 1]);
		} else if (slave.physicalAge <= 15) {
			slave.clit = jsEither([0, 0, 0, 0, 0, 0, 0, 1, 2]);
		} else {
			slave.clit = jsEither([0, 0, 0, 0, 0, 0, 1, 1, 2]);
		}

		if (slave.physicalAge <= 11) {
			slave.labia = jsEither([0, 0, 0, 0, 0, 0, 0, 1, 1]);
		} else if (slave.physicalAge <= 12) {
			slave.labia = jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1]);
		} else if (slave.physicalAge <= 13) {
			slave.labia = jsEither([0, 0, 0, 0, 0, 1, 1, 1, 1]);
		} else if (slave.physicalAge <= 14) {
			slave.labia = jsEither([0, 0, 0, 0, 1, 1, 1, 1, 2]);
		} else if (slave.physicalAge <= 15) {
			slave.labia = jsEither([0, 0, 0, 1, 1, 1, 1, 2, 2]);
		} else {
			slave.labia = jsEither([0, 0, 0, 1, 1, 1, 1, 2, 2, 3]);
		}

		if (slave.energy < jsRandom(1, 80)) {
			slave.vaginaLube = 0;
		} else if (slave.physicalAge > jsRandom(35, 60)) {
			slave.vaginaLube = 0;
		} else {
			slave.vaginaLube = 1;
		}
		slave.foreskin = jsRandom(0, 4);
	}

	function generateDick() {
		slave.vagina = -1;
		slave.clit = 0;
		slave.preg = 0;

		if (slave.physicalAge <= 13) {
			if (slave.geneticQuirks.wellHung === 2) {
				if (slave.physicalAge >= 8) {
					slave.dick = jsEither([2, 2, 3, 3, 4]);
				} else {
					slave.dick = jsEither([1, 2, 2, 3]);
				}
			} else {
				slave.dick = jsEither([1, 1, 1, 1, 2, 2, 2, 3]);
			}
			if (V.seeExtreme === 1) {
				slave.balls = jsEither([0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3]);
			} else {
				slave.balls = jsEither([1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3]);
			}
			slave.scrotum = slave.balls;
		} else if (slave.physicalAge <= 15) {
			if (slave.geneticQuirks.wellHung === 2) {
				slave.dick = jsEither([3, 3, 4, 4, 5]);
			} else {
				slave.dick = jsEither([1, 1, 1, 2, 2, 2, 3]);
			}
			if (V.seeExtreme === 1) {
				slave.balls = jsEither([0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4]);
			} else {
				slave.balls = jsEither([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4]);
			}
			slave.scrotum = slave.balls;
		} else if (slave.physicalAge <= 17) {
			if (slave.geneticQuirks.wellHung === 2) {
				slave.dick = jsEither([4, 4, 5, 5, 6]);
			} else {
				slave.dick = jsEither([1, 1, 2, 2, 3, 3]);
			}
			if (V.seeExtreme === 1) {
				slave.balls = jsEither([0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5]);
			} else {
				slave.balls = jsEither([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5]);
			}
			slave.scrotum = slave.balls;
		} else {
			if (slave.geneticQuirks.wellHung === 2) {
				slave.dick = jsEither([5, 5, 6]);
			} else {
				slave.dick = jsEither([1, 2, 2, 2, 3, 3, 3, 4, 4, 5]);
			}
			if (V.seeExtreme === 1) {
				slave.balls = jsEither([0, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5]);
			} else {
				slave.balls = jsEither([1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5]);
			}
			if (slave.balls !== 0) {
				if (slave.geneticQuirks.wellHung === 2) {
					slave.balls++;
				}
				slave.scrotum = slave.balls + jsEither([0, 0, 1]);
			} else {
				slave.scrotum = 0;
			}
			if (jsRandom(1, 100) < 3) {
				slave.vasectomy = 1;
			}
		}
	}

	function generateCircumcision() {
		/* The default rate of 50* is wildly unrepresentative, and there is extreme regional variation. */
		/*
		What we want is the prevalence among newborns, since this game
		happens about 20 years in the future, but we'll use this lacking
		something better.
		https://pophealthmetrics.biomedcentral.com/articles/10.1186/s12963-016-0073-5
		Right now we mostly just break it down by country.
		It would be better to break it down by both country
		and race if statistics are available.
		*/
		if (V.seeCircumcision === 0) {
			slave.foreskin = slave.dick + jsRandom(0, 1);
		} else {
			/* Temporarily use activeSlave.foreskin to store the chance of circumcision. */
			switch (slave.nationality) {
				case "Afghan":
				case "Iranian":
				case "Moroccan":
				case "Palestinian":
				case "Sahrawi":
				case "Tunisian":
					slave.foreskin = 100;
					break;
				case "Comorian":
				case "Gabonese":
				case "Iraqi":
				case "Jordanian":
				case "Kurdish":
				case "Mauritanian":
				case "Nigerian":
				case "Tajik":
				case "Turkish":
				case "Yemeni":
					slave.foreskin = 99;
					break;
				case "Algerian":
				case "Azerbaijani":
				case "Liberian":
				case "Maldivian":
					slave.foreskin = 98;
					break;
				case "Djiboutian":
				case "Eritrean":
				case "Ivorian":
				case "Libyan":
				case "Saudi":
				case "Uzbek":
					slave.foreskin = 97;
					break;
				case "Nigerien":
				case "Pakistani":
				case "Sierra Leonean":
				case "Turkmen":
				case "Zairian":
					slave.foreskin = 96;
					break;
				case "a Cook Islander":
				case "Egyptian":
				case "Gambian":
				case "Guamanian":
				case "Malagasy":
				case "Nauruan":
				case "Ni-Vanuatu":
				case "Niuean":
				case "Palauan":
				case "Samoan":
				case "a Solomon Islander":
				case "Togolese":
				case "Tongan":
				case "Tuvaluan":
					slave.foreskin = 95;
					break;
				case "Cameroonian":
				case "Senegalese":
				case "Somali":
					slave.foreskin = 94;
					break;
				case "Bangladeshi":
				case "Beninese":
				case "Bissau-Guinean":
				case "Indonesian":
				case "Syrian":
					slave.foreskin = 93;
					break;
				case "Ethiopian":
				case "Filipina":
				case "Ghanan":
				case "Israeli":
				case "Kosovan":
					slave.foreskin = 92;
					break;
				case "Kenyan":
				case "Kyrgyz":
					slave.foreskin = 91;
					break;
				case "Burkinabé":
				case "Omani":
					slave.foreskin = 88;
					break;
				case "Equatoguinean":
					slave.foreskin = 87;
					break;
				case "Kuwaiti":
				case "Malian":
					slave.foreskin = 86;
					break;
				case "Guinean":
					slave.foreskin = 84;
					break;
				case "Bahraini":
					slave.foreskin = 81;
					break;
				case "French Polynesian":
					slave.foreskin = 78;
					break;
				case "American":
				case "Qatari":
					slave.foreskin = 77;
					break;
				case "Emirati":
					slave.foreskin = 76;
					break;
				case "Chadian":
					slave.foreskin = 74;
					break;
				case "Tanzanian":
					slave.foreskin = 72;
					break;
				case "Congolese":
					slave.foreskin = 70;
					break;
				case "Central African":
					slave.foreskin = 63;
					break;
				case "Burundian":
				case "Malaysian":
					slave.foreskin = 61;
					break;
				case "Lebanese":
					slave.foreskin = 60;
					break;
				case "Angolan":
					slave.foreskin = 58;
					break;
				case "Fijian":
				case "Kazakh":
					slave.foreskin = 56;
					break;
				case "Bruneian":
				case "Korean":
				case "Mosotho":
					/* Population-weighted average of South Korea and North Korea. */
					slave.foreskin = 52;
					break;
				case "New Caledonian":
					slave.foreskin = 50;
					break;
				case "Albanian":
					slave.foreskin = 48;
					break;
				case "Mozambican":
					slave.foreskin = 47;
					break;
				case "South African":
					slave.foreskin = 45;
					break;
				case "Dominican":
					slave.foreskin = 43;
					break;
				case "Bosnian":
					slave.foreskin = 42;
					break;
				case "Sudanese":
					slave.foreskin = 39;
					break;
				case "Mexican":
					slave.foreskin = 38;
					break;
				case "Macedonian":
					slave.foreskin = 34;
					break;
				case "a New Zealander":
					slave.foreskin = 33;
					break;
				case "Canadian":
					slave.foreskin = 32;
					break;
				case "Scottish":
					slave.foreskin = 28;
					break;
				case "Australian":
				case "Ugandan":
					slave.foreskin = 27;
					break;
				case "Namibian":
					slave.foreskin = 26;
					break;
				case "South Sudanese":
					slave.foreskin = 24;
					break;
				case "Belgian":
				case "Cypriot":
				case "Thai":
					slave.foreskin = 23;
					break;
				case "Malawian":
					slave.foreskin = 22;
					break;
				case "British":
					slave.foreskin = 21;
					break;
				case "Puerto Rican":
					slave.foreskin = 20;
					break;
				case "Montenegrin":
					slave.foreskin = 19;
					break;
				case "Mauritian":
					slave.foreskin = 17;
					break;
				case "Motswana":
				case "Singaporean":
				case "Surinamese":
					slave.foreskin = 15;
					break;
				case "Chinese":
				case "French":
				case "Indian":
				case "Jamaican":
					slave.foreskin = 14;
					break;
				case "Bulgarian":
				case "Rwandan":
				case "Zambian":
					slave.foreskin = 13;
					break;
				case "French Guianan":
				case "Guyanese":
				case "Russian":
					slave.foreskin = 12;
					break;
				case "German":
					slave.foreskin = 11;
					break;
				case "Belarusian":
				case "Georgian":
				case "Papua New Guinean":
					slave.foreskin = 10;
					break;
				case "Japanese":
				case "Zimbabwean":
					slave.foreskin = 9;
					break;
				case "Slovene":
				case "Sri Lankan":
				case "Swazi":
				case "Taiwanese":
					slave.foreskin = 8;
					break;
				case "Catalan":
				case "Haitian":
				case "Spanish":
					slave.foreskin = 7;
					break;
				case "Austrian":
				case "Dutch":
				case "East Timorese":
				case "Swiss":
				case "Trinidadian":
					slave.foreskin = 6;
					break;
				case "Danish":
				case "Greek":
				case "a Liechtensteiner":
				case "Swedish":
					slave.foreskin = 5;
					break;
				case "Burmese":
				case "Cambodian":
				case "Mongolian":
				case "Nepalese":
				case "Peruvian":
				case "Serbian":
					slave.foreskin = 4;
					break;
				case "Argentinian":
				case "Italian":
				case "Norwegian":
					slave.foreskin = 3;
					break;
				case "Luxembourgian":
				case "Tibetan":
				case "Ukrainian":
				case "Vincentian":
					slave.foreskin = 2;
					break;
				case "Andorran":
				case "Barbadian":
				case "Bermudian":
				case "Bhutanese":
				case "Brazilian":
				case "Croatian":
				case "Finnish":
				case "Hungarian":
				case "Irish":
				case "Moldovan":
				case "Monégasque":
				case "Panamanian":
				case "Portuguese":
				case "Seychellois":
				case "Uruguayan":
					slave.foreskin = 1;
					break;
				case "Antiguan":
				case "Armenian":
				case "Bahamian":
				case "Belizean":
				case "Bolivian":
				case "Cape Verdean":
				case "Chilean":
				case "Colombian":
				case "Costa Rican":
				case "Cuban":
				case "Curaçaoan":
				case "Czech":
				case "Dominiquais":
				case "Ecuadorian":
				case "Estonian":
				case "Greenlandic":
				case "Grenadian":
				case "Guatemalan":
				case "Honduran":
				case "I-Kiribati":
				case "Icelandic":
				case "Kittitian":
				case "Laotian":
				case "Latvian":
				case "Lithuanian":
				case "Maltese":
				case "Marshallese":
				case "Micronesian":
				case "Nicaraguan":
				case "Paraguayan":
				case "Polish":
				case "Romanian":
				case "Saint Lucian":
				case "Salvadoran":
				case "Sammarinese":
				case "São Toméan":
				case "Slovak":
				case "Vatican":
				case "Venezuelan":
				case "Vietnamese":
					slave.foreskin = 0;
					break;
				default:
					/* Some overlooked country, or possibly stateless. Use global average. */
					slave.foreskin = 38;
			}
			/* Second pass for minorities in other countries. */
			if (slave.race === "middle eastern" && slave.foreskin < 76) {
				slave.foreskin = 76;
			}
			if (slave.race === "semitic" && slave.foreskin < 90) {
				slave.foreskin = 90;
			}
			/* Chance activeSlave.foreskin back to the normal meaning. */
			if (jsRandom(0, 99) < slave.foreskin) {
				slave.foreskin = 0;
			} else {
				slave.foreskin = slave.dick + jsRandom(0, 1);
			}
		}
	}

	function generateXXPreferences() {
		randomizeAttraction(slave);
		slave.fetishStrength = jsRandom(0, 90);
		slave.fetish = jsEither(["boobs", "buttslut", "cumslut", "dom", "humiliation", "humiliation", "masochist", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "pregnancy", "sadist", "submissive", "submissive"]);
		slave.behavioralFlaw = jsEither(["anorexic", "arrogant", "bitchy", "devout", "gluttonous", "hates men", "hates women", "hates women", "liberated", "none", "none", "none", "odd"]);

		if (slave.behavioralFlaw === "devout") {
			slave.sexualFlaw = jsEither(["apathetic", "crude", "judgemental", "none", "repressed", "shamefast"]);
		} else {
			slave.sexualFlaw = jsEither(["apathetic", "crude", "hates anal", "hates oral", "hates penetration", "idealistic", "judgemental", "none", "none", "none", "none", "repressed", "shamefast"]);
		}
		if (slave.behavioralFlaw === "none" && jsRandom(1, 10) === 1) {
			slave.behavioralQuirk = jsEither(["adores men", "adores women", "advocate", "confident", "cutting", "fitness", "funny", "insecure", "sinful"]);
		}
		if (slave.sexualFlaw === "none" && jsRandom(1, 10) === 1) {
			slave.sexualQuirk = jsEither(["caring", "gagfuck queen", "painal queen", "perverted", "romantic", "size queen", "strugglefuck queen", "tease", "unflinching"]);
		}
	}

	function generateXYPreferences() {
		randomizeAttraction(slave);
		slave.fetishStrength = jsRandom(0, 90);
		slave.fetish = jsEither(["boobs", "buttslut", "buttslut", "cumslut", "dom", "humiliation", "masochist", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "sadist", "submissive"]);
		slave.behavioralFlaw = jsEither(["anorexic", "arrogant", "bitchy", "devout", "gluttonous", "hates men", "hates men", "hates men", "hates women", "liberated", "none", "none", "none", "odd"]);

		if (slave.behavioralFlaw === "devout") {
			slave.sexualFlaw = jsEither(["apathetic", "crude", "judgemental", "none", "repressed", "shamefast"]);
		} else {
			slave.sexualFlaw = jsEither(["apathetic", "crude", "hates anal", "hates anal", "hates oral", "idealistic", "judgemental", "none", "none", "none", "none", "repressed", "shamefast"]);
		}
		if (slave.behavioralFlaw === "none" && jsRandom(1, 10) === 1) {
			slave.behavioralQuirk = jsEither(["adores men", "adores women", "advocate", "confident", "cutting", "fitness", "funny", "insecure", "sinful"]);
		}
		if (slave.sexualFlaw === "none" && jsRandom(1, 10) === 1) {
			slave.sexualQuirk = jsEither(["caring", "gagfuck queen", "painal queen", "perverted", "romantic", "size queen", "strugglefuck queen", "tease", "unflinching"]);
		}
	}

	function generateXXButt() {
		if (slave.physicalAge <= 11) {
			slave.butt = jsEither([1, 1, 1, 1, 1, 1, 1]);
		} else if (slave.physicalAge <= 12) {
			slave.butt = jsEither([1, 1, 1, 1, 1, 2, 2]);
		} else if (slave.physicalAge <= 13) {
			slave.butt = jsEither([1, 1, 1, 1, 2, 2, 2]);
		} else if (slave.physicalAge <= 14) {
			slave.butt = jsEither([1, 1, 1, 2, 2, 2, 3]);
		} else if (slave.physicalAge <= 15) {
			slave.butt = jsEither([1, 1, 2, 2, 2, 2, 3]);
		} else {
			switch (slave.race) {
				case "black":
					slave.butt = jsEither([1, 2, 2, 3, 3, 4, 4]);
					break;
				case "indo-aryan":
				case "malay":
				case "pacific islander":
				case "amerindian":
				case "asian":
				case "middle eastern":
				case "semitic":
				case "southern european":
					slave.butt = jsEither([1, 2, 2, 3, 3]);
					break;
				default:
					slave.butt = jsEither([1, 2, 2, 3, 3, 4]);
			}
		}
		if (V.weightAffectsAssets !== 0) {
			if (slave.weight < -10 && slave.butt > 1) {
				slave.butt -= 1;
			} else if (slave.weight > 100 && slave.butt < 6) {
				slave.butt += jsRandom(1, 2);
			} else if (slave.weight > 10 && slave.butt < 4) {
				slave.butt += 1;
			}
		}
		slave.anus = jsEither([0, 0, 1, 1, 2]);
		slave.analArea = slave.anus + jsEither([0, 0, 0, 1]);
	}

	function generateXYButt() {
		if (slave.physicalAge <= 13) {
			slave.butt = jsEither([1, 1, 1, 2, 2, 3, 3, 4]);
		} else {
			slave.butt = jsEither([1, 1, 2, 3]);
		}
		if (V.weightAffectsAssets !== 0) {
			if (slave.weight < -10 && slave.butt > 1) {
				slave.butt -= 1;
			} else if (slave.weight > 100 && slave.butt < 6) {
				slave.butt += jsRandom(1, 2);
			} else if (slave.weight > 10 && slave.butt < 4) {
				slave.butt += 1;
			}
		}
		if (slave.attrXY > 0) {
			slave.anus = jsEither([0, 1, 2]);
		} else {
			if (slave.physicalAge <= 13) {
				slave.anus = jsEither([0, 0, 0, 0, 0, 1]);
			} else if (slave.physicalAge <= 15) {
				slave.anus = jsEither([0, 0, 0, 0, 1, 1, 1]);
			} else if (slave.physicalAge <= 17) {
				slave.anus = jsEither([0, 0, 0, 1, 1, 1]);
			} else {
				slave.anus = jsEither([0, 0, 1, 1, 2]);
			}
		}
		slave.analArea = slave.anus + jsEither([0, 0, 0, 1]);
	}

	function generateXXBoobs() {
		function rollBreast(modif) {
			const volume = [0, 300, 500, 650, 800, 1000, 1200, 1400, 1600, 1800, 2050, 2300, 2600, 2900, 3250, 3600, 3950, 4300, 4700, 5100, 5500, 5900];
			const volume_dist = [90000, 470000, 720000, 840000, 908574, 947759, 970151, 982946, 990258, 994436, 996824, 998188, 998968, 999414, 999669, 999814, 999897, 999945, 999972, 999987, 999995, 1000000];
			const randomRoll = Math.floor(Math.random() * 1000000) + 1;
			let actualSize = 0;
			let minorSizeAdjustment = 0;

			while (randomRoll > volume_dist[actualSize]) {
				actualSize += 1;
			}
			if (Math.random() < 0.5) {
				minorSizeAdjustment = (Math.floor(Math.random() * 2) + 1) * 50;
			}
			return Math.max(volume[actualSize] + minorSizeAdjustment + modif, 0);
		}

		if (slave.physicalAge <= 10) {
			slave.boobs = 100;
		} else if (slave.physicalAge === 11) {
			slave.boobs = jsEither([100, 100, 150, 150, 150, 300]);
		} else if (slave.physicalAge === 12) {
			slave.boobs = jsEither([100, 100, 150, 150, 150, 200, 200, 300]);
		} else if (slave.physicalAge === 13) {
			slave.boobs = jsEither([100, 150, 200, 200, 300, 300, 300, 400]);
		} else if (slave.physicalAge === 14) {
			slave.boobs = jsEither([100, 150, 200, 300, 300, 300, 350, 400, 400]);
		} else if (slave.physicalAge === 15) {
			slave.boobs = jsEither([150, 200, 300, 300, 300, 350, 350, 350, 400, 400, 450, 450]);
		} else {
			switch (slave.race) {
				case "black":
					slave.boobs = rollBreast(150);
					break;
				case "white":
					slave.boobs = rollBreast(50);
					break;
				case "asian":
					slave.boobs = rollBreast(-100);
					break;
				default:
					slave.boobs = rollBreast(0);
			}
		}
	}

	function generateXYBoobs() {
		if (slave.physicalAge <= 10) {
			slave.boobs = 100;
		} else if (slave.physicalAge === 11) {
			slave.boobs = jsEither([100, 100, 150]);
		} else if (slave.physicalAge === 12) {
			slave.boobs = jsEither([100, 100, 150, 150]);
		} else if (slave.physicalAge === 13) {
			slave.boobs = jsEither([100, 100, 150, 150, 200, 200]);
		} else if (slave.physicalAge === 14) {
			slave.boobs = jsEither([100, 100, 150, 150, 200, 200, 300]);
		} else if (slave.physicalAge === 15) {
			slave.boobs = jsEither([100, 100, 150, 150, 200, 200, 300, 300, 350, 350]);
		} else {
			slave.boobs = jsEither([100, 200, 200, 300, 300, 400, 500]);
		}
	}

	function generateXXFace() {
		slave.face = jsRandom(-60, 60);
		if (jsRandom(0, 2) === 0) {
			slave.face = jsRandom(-10, 10);
		}
		if (slave.physicalAge > 40) {
			slave.face -= jsRandom(0, 20);
		} else if (slave.physicalAge > 35) {
			slave.face -= jsRandom(0, 10);
		} else if (slave.physicalAge <= 20) {
			slave.face += jsRandom(0, 20);
		} else if (slave.physicalAge <= 25) {
			slave.face += jsRandom(0, 10);
		}
		if (slave.physicalAge > 10) {
			slave.faceShape = jsEither(["androgynous", "cute", "exotic", "normal", "normal", "sensual"]);
		} else {
			slave.faceShape = jsEither(["androgynous", "androgynous", "cute", "cute", "exotic", "normal", "normal", "sensual"]);
		}
		switch (slave.faceShape) {
			case "sensual":
			case "cute":
				slave.face += jsRandom(0, 20);
				break;
			case "exotic":
			case "androgynous":
				slave.face += jsRandom(-10, 10);
				break;
			case "masculine":
				slave.face += jsRandom(-10, 0);
		}
		if (slave.face >= 100 && slave.face >= jsRandom(-100000, 100)) {
			slave.geneticQuirks.pFace = 2;
		} else if (slave.face <= -100 && slave.face <= jsRandom(-100, 100000)) {
			slave.geneticQuirks.uFace = 2;
		}
	}

	function generateXYFace() {
		slave.face = jsRandom(-70, 20);
		if (jsRandom(0, 2) === 0) {
			slave.face = jsRandom(-40, -10);
		}
		if (slave.physicalAge > 40) {
			slave.face -= jsRandom(0, 20);
		} else if (slave.physicalAge > 35) {
			slave.face -= jsRandom(0, 10);
		} else if (slave.physicalAge <= 20) {
			slave.face += jsRandom(0, 20);
		} else if (slave.physicalAge <= 25) {
			slave.face += jsRandom(0, 10);
		}
		if (slave.physicalAge >= 17) {
			slave.faceShape = jsEither(["androgynous", "masculine", "masculine", "masculine"]);
		} else if (slave.physicalAge >= 15) {
			slave.faceShape = jsEither(["androgynous", "exotic", "masculine", "masculine", "masculine", "masculine", "masculine", "masculine", "masculine", "masculine", "normal", "sensual"]);
		} else if (slave.physicalAge >= 13) {
			slave.faceShape = jsEither(["androgynous", "cute", "exotic", "masculine", "masculine", "masculine", "normal", "sensual"]);
		} else if (slave.physicalAge >= 11) {
			slave.faceShape = jsEither(["androgynous", "cute", "exotic", "masculine", "normal", "normal", "sensual"]);
		} else {
			slave.faceShape = jsEither(["androgynous", "androgynous", "cute", "cute", "exotic", "normal", "normal", "sensual"]);
		}
		switch (slave.faceShape) {
			case "sensual":
			case "cute":
				slave.face += jsRandom(0, 20);
				break;
			case "exotic":
			case "androgynous":
				slave.face += jsRandom(-10, 10);
				break;
			case "masculine":
				slave.face += jsRandom(-10, 0);
		}
		if (slave.face >= 100 && slave.face >= jsRandom(-100000, 100)) {
			slave.geneticQuirks.pFace = 2;
		} else if (slave.face <= -100 && slave.face <= jsRandom(-100, 100000)) {
			slave.geneticQuirks.uFace = 2;
		}
	}

	function generateXXPregAdaptation() {
		if (slave.physicalAge <= 6) {
			slave.pregAdaptation = 5;
		} else if (slave.physicalAge <= 11) {
			slave.pregAdaptation = slave.physicalAge - 1;
		} else if (slave.physicalAge <= 14) {
			slave.pregAdaptation = 4 * (slave.physicalAge - 12) + 14;
		} else if (slave.physicalAge <= 15) {
			slave.pregAdaptation = 28;
		} else if (slave.physicalAge <= 16) {
			slave.pregAdaptation = 34;
		} else if (slave.physicalAge <= 17) {
			slave.pregAdaptation = 42;
		} else {
			slave.pregAdaptation = 50;
		}
	}

	function generateXYPregAdaptation() {
		if (slave.physicalAge <= 6) {
			slave.pregAdaptation = 5;
		} else if (slave.physicalAge <= 11) {
			slave.pregAdaptation = slave.physicalAge - 1;
		} else if (slave.physicalAge <= 15) {
			slave.pregAdaptation = 2 * (slave.physicalAge - 12) + 12;
		} else {
			slave.pregAdaptation = 20;
		}
	}

	function generateXXVoice() {
		if (slave.physicalAge <= 13) {
			slave.voice = jsEither([2, 2, 2, 3, 3, 3, 3, 3, 3]);
		} else if (slave.physicalAge <= 16) {
			slave.voice = jsEither([2, 2, 2, 2, 2, 3, 3, 3, 3]);
		} else {
			slave.voice = jsEither([1, 2, 2, 2, 2, 2, 2, 3, 3, 3]);
		}
	}

	function generateXYVoice() {
		if (slave.physicalAge <= 11) {
			slave.voice = jsEither([2, 2, 2, 3, 3, 3, 3, 3, 3]);
		} else if (slave.physicalAge <= 13) {
			slave.voice = jsEither([1, 1, 2, 2, 2, 2, 2, 3, 3]);
		} else if (slave.physicalAge <= 16) {
			slave.voice = jsEither([1, 1, 1, 2, 2, 2, 2, 2, 3]);
		} else {
			if (slave.balls > 2) {
				slave.voice = 1;
			} else if (slave.balls > 0) {
				slave.voice = jsEither([1, 1, 2]);
			} else {
				slave.voice = jsEither([1, 2, 2]);
			}
		}
	}

	function generateXXTeeth() {
		let femaleCrookedTeethGen = slave.intelligence + slave.intelligenceImplant;
		if (slave.nationality === "American") {
			femaleCrookedTeethGen += 20;
		} else if (["Andorran", "Antiguan", "Argentinian", "Aruban", "Australian", "Austrian", "Bahamian", "Bahraini", "Barbadian", "Belarusian", "Belgian", "Bermudian", "Brazilian", "British", "Bruneian", "Bulgarian", "Canadian", "Catalan", "Chilean", "a Cook Islander", "Croatian", "Curaçaoan", "Cypriot", "Czech", "Danish", "Dutch", "Emirati", "Estonian", "Finnish", "French", "German", "Greek", "Greenlandic", "Guamanian", "Hungarian", "Icelandic", "Irish", "Israeli", "Italian", "Japanese", "Kazakh", "Korean", "Kuwaiti", "Latvian", "a Liechtensteiner", "Lithuanian", "Luxembourgian", "Malaysian", "Maltese", "Mauritian", "Monégasque", "Montenegrin", "New Caledonian", "a New Zealander", "Niuean", "Norwegian", "Omani", "Palauan", "Panamanian", "Polish", "Portuguese", "Puerto Rican", "Qatari", "Romanian", "Russian", "Sammarinese", "Saudi", "Seychellois", "Singaporean", "Slovak", "Slovene", "Spanish", "Swedish", "Swiss", "Taiwanese", "Trinidadian", "Uruguayan", "Vatican"].includes(slave.nationality)) {
			/* do nothing */
		} else {
			femaleCrookedTeethGen -= 20;
		}

		if (jsRandom(0, femaleCrookedTeethGen) <= 15 && slave.physicalAge >= 12) {
			slave.teeth = jsEither(["crooked", "crooked", "crooked", "crooked", "crooked", "crooked", "crooked", "gapped"]);
		}

		if (slave.physicalAge < 6) {
			slave.teeth = "baby";
		} else if (slave.physicalAge < 12) {
			slave.teeth = "mixed";
		}
	}

	function generateXYTeeth() {
		let maleCrookedTeethGen = slave.intelligence + slave.intelligenceImplant;
		if (slave.nationality === "American") {
			maleCrookedTeethGen += 22;
		} else if (["Andorran", "Antiguan", "Argentinian", "Aruban", "Australian", "Austrian", "Bahamian", "Bahraini", "Barbadian", "Belarusian", "Belgian", "Bermudian", "Brazilian", "British", "Bruneian", "Bulgarian", "Canadian", "Catalan", "Chilean", "a Cook Islander", "Croatian", "Curaçaoan", "Cypriot", "Czech", "Danish", "Dutch", "Emirati", "Estonian", "Finnish", "French", "German", "Greek", "Greenlandic", "Guamanian", "Hungarian", "Icelandic", "Irish", "Israeli", "Italian", "Japanese", "Kazakh", "Korean", "Kuwaiti", "Latvian", "a Liechtensteiner", "Lithuanian", "Luxembourgian", "Malaysian", "Maltese", "Mauritian", "Monégasque", "Montenegrin", "New Caledonian", "a New Zealander", "Niuean", "Norwegian", "Omani", "Palauan", "Panamanian", "Polish", "Portuguese", "Puerto Rican", "Qatari", "Romanian", "Russian", "Sammarinese", "Saudi", "Seychellois", "Singaporean", "Slovak", "Slovene", "Spanish", "Swedish", "Swiss", "Taiwanese", "Trinidadian", "Uruguayan", "Vatican"].includes(slave.nationality)) {
			/* do nothing */
		} else {
			maleCrookedTeethGen -= 20;
		}

		if (jsRandom(0, maleCrookedTeethGen) <= 15 && slave.physicalAge >= 12) {
			slave.teeth = jsEither(["crooked", "crooked", "crooked", "crooked", "crooked", "crooked", "crooked", "gapped"]);
		}

		if (slave.physicalAge < 6) {
			slave.teeth = "baby";
		} else if (slave.physicalAge < 12) {
			slave.teeth = "mixed";
		}
	}

	function generateXXMods() {
		if (passage() !== "Starting Girls") {
			slave.earPiercing = jsEither([0, 1]);
			slave.nosePiercing = jsEither([0, 0, 0, 1]);
			slave.eyebrowPiercing = jsEither([0, 0, 0, 0, 0, 1]);
			slave.clitPiercing = jsEither([0, 0, 0, 0, 0, 1]);
			slave.lipsPiercing = jsEither([0, 0, 0, 0, 0, 1]);
			slave.navelPiercing = jsEither([0, 0, 0, 1]);
			slave.nipplesPiercing = jsEither([0, 0, 0, 0, 1]);
		}
		if (slave.anus !== 0 && Math.random() < 0.25) {
			slave.anusTat = "bleached";
		}
	}

	function generateXYMods() {
		if (passage() !== "Starting Girls") {
			slave.earPiercing = jsEither([0, 0, 0, 1]);
			slave.nosePiercing = jsEither([0, 0, 0, 0, 1]);
			slave.eyebrowPiercing = jsEither([0, 0, 0, 0, 0, 1]);
			slave.clitPiercing = jsEither([0, 0, 0, 0, 0, 1]);
			slave.lipsPiercing = jsEither([0, 0, 0, 0, 0, 1]);
			slave.navelPiercing = jsEither([0, 0, 0, 0, 1]);
			slave.nipplesPiercing = jsEither([0, 0, 0, 0, 1]);
		}
		if (slave.anus !== 0 && Math.random() < 0.25) {
			slave.anusTat = "bleached";
		}
	}

	function generateXXBodyHair() {
		slave.pubicHColor = slave.origHColor;
		slave.underArmHColor = slave.origHColor;
		slave.pubicHStyle = jsEither(["bald", "bald", "bushy in the front and neat in the rear", "bushy in the front and neat in the rear", "bushy in the front and neat in the rear", "bushy in the front and neat in the rear", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless", "in a strip", "in a strip", "in a strip", "in a strip", "in a strip", "neat", "neat", "neat", "neat", "neat", "very bushy", "very bushy", "waxed", "waxed", "waxed", "waxed", "waxed", "waxed"]);
		slave.underArmHStyle = jsEither(["bald", "bald", "bushy", "bushy", "bushy", "hairless", "neat", "neat", "neat", "neat", "neat", "shaved", "shaved", "shaved", "shaved", "shaved", "waxed", "waxed", "waxed", "waxed"]);
		if ((slave.pubicHStyle === "hairless" || slave.underArmHStyle === "hairless") && Math.random() > 0.4) {
			slave.pubicHStyle = "hairless";
			slave.underArmHStyle = "hairless";
		}
		if (slave.origHColor === "blonde" && Math.random() > 0.85) {
			slave.eyebrowHColor = jsEither(["black", "brown", "brown", "brown", "brown"]);
			slave.override_Brow_H_Color = 1;
		} else {
			slave.eyebrowHColor = slave.origHColor;
		}
		slave.eyebrowHStyle = jsEither(["bald", "curved", "curved", "curved", "curved", "curved", "curved", "curved", "elongated", "elongated", "elongated", "high-arched", "high-arched", "high-arched", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "rounded", "rounded", "rounded", "rounded", "rounded", "shaved", "shaved", "shortened", "shortened", "shortened", "slanted inwards", "slanted inwards", "slanted outwards", "slanted outwards", "straight", "straight", "straight", "straight", "straight", "straight"]);
		slave.eyebrowFullness = jsEither(["bushy", "bushy", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "pencil-thin", "pencil-thin", "tapered", "tapered", "tapered", "tapered", "thick", "thick", "thick", "thin", "thin", "thin", "threaded", "threaded", "threaded", "threaded"]);
	}

	function generateXYBodyHair() {
		slave.pubicHColor = slave.origHColor;
		slave.underArmHColor = slave.origHColor;
		slave.pubicHStyle = jsEither(["bald", "bald", "bushy in the front and neat in the rear", "bushy in the front and neat in the rear", "bushy in the front and neat in the rear", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless", "in a strip", "in a strip", "in a strip", "neat", "neat", "neat", "neat", "neat", "neat", "very bushy", "very bushy", "waxed", "waxed", "waxed", "waxed", "waxed", "waxed"]);
		slave.underArmHStyle = jsEither(["bald", "bald", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless", "neat", "neat", "neat", "neat", "neat", "neat", "neat", "shaved", "shaved", "shaved", "shaved", "shaved", "waxed", "waxed", "waxed", "waxed"]);
		if ((slave.pubicHStyle === "hairless" || slave.underArmHStyle === "hairless") && Math.random() > 0.4) {
			slave.pubicHStyle = "hairless";
			slave.underArmHStyle = "hairless";
		}
		if (slave.origHColor === "blonde" && Math.random() > 0.85) {
			slave.eyebrowHColor = jsEither(["black", "brown", "brown", "brown", "brown"]);
			slave.override_Brow_H_Color = 1;
		} else {
			slave.eyebrowHColor = slave.origHColor;
		}
		slave.eyebrowHStyle = jsEither(["bald", "curved", "curved", "curved", "curved", "curved", "elongated", "high-arched", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "rounded", "shaved", "shaved", "shortened", "slanted inwards", "slanted outwards", "straight", "straight", "straight", "straight", "straight", "straight"]);
		slave.eyebrowFullness = jsEither(["bushy", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "natural", "pencil-thin", "tapered", "tapered", "tapered", "thick", "thick", "thin", "thin", "threaded", "threaded", "threaded"]);
	}

	function generateXXGeneticQuirks() {
		chance = jsRandom(1, 1000);
		if (chance >= 980) {
			slave.geneticQuirks.fertility = 2;
		} else if (chance >= 900) {
			slave.geneticQuirks.fertility = 1;
		}
		chance = jsRandom(1, 10000);
		if (chance >= 9970) {
			slave.geneticQuirks.hyperFertility = 2;
		} else if (chance >= 9900) {
			slave.geneticQuirks.hyperFertility = 1;
		}
		chance = jsRandom(1, 100000);
		if (chance < 3) {
			slave.geneticQuirks.superfetation = 2;
		}
		chance = jsRandom(1, 20000);
		if (chance === 777) {
			slave.geneticQuirks.albinism = 2;
		} else if (chance >= 19500) {
			slave.geneticQuirks.albinism = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance === 10001) {
			slave.geneticQuirks.heterochromia = 2;
		} else if (chance >= 19750) {
			slave.geneticQuirks.heterochromia = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance === 19999) {
			slave.geneticQuirks.rearLipedema = 2;
		} else if (chance < 100) {
			slave.geneticQuirks.rearLipedema = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19975) {
			slave.geneticQuirks.gigantomastia = 2;
		} else if (chance >= 19800) {
			slave.geneticQuirks.gigantomastia = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19900) {
			slave.geneticQuirks.macromastia = 2;
		} else if (chance >= 19500) {
			slave.geneticQuirks.macromastia = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19975) {
			slave.geneticQuirks.dwarfism = 2;
		} else if (chance >= 19900) {
			slave.geneticQuirks.dwarfism = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19995) {
			slave.geneticQuirks.gigantism = 2;
		} else if (chance >= 19950) {
			slave.geneticQuirks.gigantism = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19900) {
			slave.geneticQuirks.mGain = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.mGain = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19950) {
			slave.geneticQuirks.mLoss = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.mLoss = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19800) {
			slave.geneticQuirks.wGain = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.wGain = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19850) {
			slave.geneticQuirks.wLoss = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.wLoss = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19500) {
			slave.geneticQuirks.androgyny = 2;
		} else if (chance >= 19000) {
			slave.geneticQuirks.androgyny = 1;
		}
	}

	function generateXYGeneticQuirks() {
		chance = jsRandom(1, 10000);
		if (chance >= 9750) {
			slave.geneticQuirks.wellHung = 2;
		} else if (chance >= 9500) {
			slave.geneticQuirks.wellHung = 1;
		}
		chance = jsRandom(1, 1000);
		if (chance >= 950) {
			slave.geneticQuirks.fertility = 1;
		}
		chance = jsRandom(1, 10000);
		if (chance >= 9900) {
			slave.geneticQuirks.hyperFertility = 1;
		}
		if (chance === 777) {
			slave.geneticQuirks.albinism = 2;
		} else if (chance >= 19500) {
			slave.geneticQuirks.albinism = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance === 10001) {
			slave.geneticQuirks.heterochromia = 2;
		} else if (chance >= 19750) {
			slave.geneticQuirks.heterochromia = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance === 19999) {
			slave.geneticQuirks.rearLipedema = 2;
		} else if (chance < 10) {
			slave.geneticQuirks.rearLipedema = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19975) {
			slave.geneticQuirks.gigantomastia = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance > 19900) {
			slave.geneticQuirks.macromastia = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19975) {
			slave.geneticQuirks.dwarfism = 2;
		} else if (chance >= 19900) {
			slave.geneticQuirks.dwarfism = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19995) {
			slave.geneticQuirks.gigantism = 2;
		} else if (chance >= 19950) {
			slave.geneticQuirks.gigantism = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19875) {
			slave.geneticQuirks.mGain = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.mGain = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19950) {
			slave.geneticQuirks.mLoss = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.mLoss = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19900) {
			slave.geneticQuirks.wGain = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.wGain = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19950) {
			slave.geneticQuirks.wLoss = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.wLoss = 1;
		}
		chance = jsRandom(1, 20000);
		if (chance >= 19200) {
			slave.geneticQuirks.androgyny = 2;
		} else if (chance >= 18500) {
			slave.geneticQuirks.androgyny = 1;
		}
	}

	function generateAge() {
		if (V.activeSlaveOneTimeMaxAge > 998) {
			V.activeSlaveOneTimeMaxAge = (V.pedo_mode === 1) ? 18 : 42;
		} else if (V.pedo_mode === 1 && V.one_time_age_overrides_pedo_mode === 0 && V.activeSlaveOneTimeMaxAge > 18) {
			V.activeSlaveOneTimeMaxAge = 18;
		}
		V.activeSlaveOneTimeMaxAge = Math.min(V.retirementAge - 1, V.activeSlaveOneTimeMaxAge);
		V.activeSlaveOneTimeMinAge = Math.min(V.retirementAge - 1, V.activeSlaveOneTimeMinAge);
		if (V.activeSlaveOneTimeMinAge < V.minimumSlaveAge) {
			V.activeSlaveOneTimeMinAge = V.minimumSlaveAge;
		} else if (V.pedo_mode === 1 && V.one_time_age_overrides_pedo_mode === 0) {
			V.activeSlaveOneTimeMinAge = V.minimumSlaveAge;
		}
		V.activeSlaveOneTimeMaxAge = Math.max(V.activeSlaveOneTimeMaxAge, V.activeSlaveOneTimeMinAge);
		if (V.activeSlaveOneTimeMaxAge >= 30 && V.arcologies[0].FSMaturityPreferentialist !== "unset" && V.ageAdjustOverride !== 1) {
			V.activeSlaveOneTimeMaxAge += 10;
		}
		slave.actualAge = jsRandom(V.activeSlaveOneTimeMinAge, V.activeSlaveOneTimeMaxAge);
		const secondAgeRoll = jsRandom(V.activeSlaveOneTimeMinAge, V.activeSlaveOneTimeMaxAge);
		if (V.arcologies[0].FSYouthPreferentialist !== "unset" && V.arcologies[0].FSYouthPreferentialist >= jsRandom(1, 100)) {
			slave.actualAge = Math.min(slave.actualAge, secondAgeRoll);
		} else if (V.arcologies[0].FSMaturityPreferentialist !== "unset" && V.arcologies[0].FSMaturityPreferentialist >= jsRandom(1, 100)) {
			slave.actualAge = Math.max(slave.actualAge, secondAgeRoll);
		}
		if (slave.actualAge >= V.retirementAge) {
			slave.actualAge = (V.retirementAge - 2);
		}
		V.activeSlaveOneTimeMinAge = 0;
		V.activeSlaveOneTimeMaxAge = 999;
		V.one_time_age_overrides_pedo_mode = 0;
		V.ageAdjustOverride = 0;
		slave.visualAge = slave.actualAge;
		slave.physicalAge = slave.actualAge;
		slave.ovaryAge = slave.actualAge;
		slave.pubertyAgeXX = V.fertilityAge;
		slave.pubertyAgeXY = V.potencyAge;
	}

	function generateIntelligence() {
		const gaussian = gaussianPair();
		slave.intelligence = Intelligence.random();
		if (V.AgePenalty === 1 && slave.actualAge <= 24) {
			if (gaussian[0] < gaussian[1] + slave.intelligence / 29 + (slave.actualAge - 24) / 8 - 0.35) {
				slave.intelligenceImplant = 15;
				if (slave.intelligenceImplant > 0 && jsRandom(15, 150) < slave.intelligence) {
					slave.intelligenceImplant = 30;
				}
			}
		} else {
			if (gaussian[0] < gaussian[1] + slave.intelligence / 29 - 0.35) {
				/* 40.23% chance if intelligence is 0, 99.26% chance if intelligence is 100 */
				slave.intelligenceImplant = 15;
				if (slave.intelligenceImplant > 0 && jsRandom(15, 150) < slave.intelligence) {
					slave.intelligenceImplant = 30;
				}
			}
		}
	}

	function generateCareer() {
		if (V.AgePenalty === 1) {
			if (slave.actualAge < 16) {
				slave.career = setup.veryYoungCareers.random();
			} else if (slave.actualAge <= 24) {
				slave.career = setup.youngCareers.random();
			} else if (slave.intelligenceImplant >= 15) {
				slave.career = setup.educatedCareers.random();
			} else {
				slave.career = setup.uneducatedCareers.random();
			}
		} else {
			if (slave.actualAge < 16) {
				slave.career = setup.veryYoungCareers.random();
			} else if (slave.intelligenceImplant >= 15) {
				slave.career = setup.educatedCareers.random();
			} else if (slave.actualAge <= 24) {
				slave.career = setup.youngCareers.random();
			} else {
				slave.career = setup.uneducatedCareers.random();
			}
		}
	}

	function generateNationality() {
		if (V.fixedRace === 0) {
			if (V.fixedNationality === 0) {
				slave.nationality = hashChoice(V.nationalities);
			} else {
				slave.nationality = V.fixedNationality;
				V.fixedNationality = 0;
			}
			nationalityToRace(slave);
		} else {
			slave.race = V.fixedRace;
			if (V.fixedNationality === 0) {
				raceToNationality(slave);
			} else {
				slave.nationality = V.fixedNationality;
				V.fixedNationality = 0;
			}
			V.fixedRace = 0;
		}
	}

	function generateAccent() {
		nationalityToAccent(slave);
		if ((slave.intelligenceImplant >= 15 || slave.intelligence > 95) && slave.accent >= 3 && slave.intelligence > jsRandom(0, 100)) {
			slave.accent -= 1;
		}
	}

	function generateRacialTraits() {
		switch (slave.race) {
			case "black":
				slave.lips = jsRandom(5, 30);
				slave.origSkin = jsEither(["pure black", "ebony", "black", "dark brown", "brown"]);
				slave.origHColor = jsEither(["jet black", "black", "black", "black", "dark brown"]);
				slave.hStyle = jsEither(["crinkled", "neat"]);
				eyeColor(["brown"], true);
				break;
			case "white":
				slave.lips = jsRandom(5, 25);
				if (["German", "Polish", "Danish", "Estonian", "Latvian", "Lithuanian"].includes(slave.nationality)) {
					slave.origSkin = jsEither(["tan", "light", "light", "light", "fair", "fair", "fair", "fair", "pale", "very pale"]);
					eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "brown", "green"]);
					slave.origHColor = jsEither(["jet black", "black", "black", "dark brown", "dark brown", "brown", "brown", "brown", "chestnut", "chocolate", "amber", "golden", "golden", "blonde", "blonde", "platinum blonde", "red"]);
				} else if (["Icelandic", "Norwegian"].includes(slave.nationality)){
					slave.origSkin = jsEither(["tan", "light", "light", "light", "fair", "fair", "fair", "pale", "pale", "very pale", "very pale"]);
					eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "green"]);
					slave.origHColor = jsEither(["jet black", "black", "dark brown", "brown", "brown", "brown", "chestnut", "chocolate", "amber", "golden", "golden", "blonde", "blonde", "platinum blonde", "platinum blonde", "red"]);
				} else if (["Swedish", "Finnish"].includes(slave.nationality)) {
					slave.origSkin = jsEither(["tan", "light", "light", "fair", "fair", "fair", "fair", "pale", "pale", "pale", "very pale", "very pale"]);
					eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "green"]);
					slave.origHColor = jsEither(["jet black", "black", "dark brown", "brown", "chestnut", "chocolate", "amber", "golden", "golden", "golden", "blonde", "blonde", "blonde", "platinum blonde", "platinum blonde", "platinum blonde", "red"]);
				} else if (["Irish", "Scottish"].includes(slave.nationality)) {
					slave.origSkin = jsEither(["light", "light", "fair", "fair", "fair", "pale", "pale", "pale", "very pale", "very pale", "very pale", "very pale"]);
					eyeColor(["light grey", "blue", "blue", "blue", "brown", "brown", "green", "green", "green"]);
					slave.origHColor = jsEither(["jet black", "black", "dark brown", "brown", "brown", "chestnut", "chestnut", "chestnut", "chocolate", "amber", "golden", "golden", "blonde", "platinum blonde", "red", "red"]);
				} else {
					slave.origSkin = jsEither(["tan", "light", "light", "light", "fair", "fair", "fair", "pale", "very pale"]);
					eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "brown", "brown", "green"]);
					slave.origHColor = jsEither(["jet black", "jet black", "black", "black", "black", "dark brown", "dark brown", "dark brown", "dark brown", "brown", "brown", "brown", "brown", "chestnut", "chocolate", "amber", "golden", "blonde", "platinum blonde", "red"]);
				}
				slave.hStyle = "neat";
				break;
			case "latina":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["dark brown", "dark olive", "dark olive", "dark olive", "olive", "olive", "light olive", "light olive", "tan", "light"]);
				slave.origHColor = jsEither(["jet black", "black", "black", "dark brown", "dark brown", "brown"]);
				slave.hStyle = "neat";
				eyeColor(["blue", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "green"]);
				break;
			case "indo-aryan":
				slave.lips = jsRandom(5, 25);
				if (["Iranian", "Pakistani", "Tajik", "Kazakh", "Kurdish", "Azerbaijani", "Syrian", "Kyrgyz", "Afghan", "Mongolian", "Turkmen", "Turkish", "Uzbek"].includes(slave.nationality) || (jsRandom(1, 8) === 1)) {
					slave.origSkin = jsEither(["olive", "bronze", "tan", "light olive", "light olive", "light", "light", "fair"]);
					if (jsRandom(1, 10) === 1){
						slave.origHColor = jsEither(["black", "dark brown", "brown", "chestnut", "blonde", "red"]);
						eyeColor(["light grey", "blue", "blue", "brown", "green", "green"]);
					} else {
						slave.origHColor = jsEither(["jet black", "black", "black", "dark brown", "dark brown", "brown", "brown"]);
						eyeColor(["brown", "brown", "brown", "brown", "brown", "brown", "green"]);
					}
				} else {
					slave.origSkin = jsEither(["ebony", "dark brown", "dark brown", "dark olive", "olive", "light olive", "tan", "light"]);
					slave.origHColor = jsEither(["jet black", "black", "black", "black", "dark brown"]);
					eyeColor(["brown"], true);
				}
				slave.hStyle = "neat";
				break;
			case "malay":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["ebony", "black", "dark brown", "brown", "dark olive", "olive", "light olive", "light olive", "light", "fair"]);
				slave.origHColor = jsEither(["jet black", "jet black", "black", "black", "black", "dark brown"]);
				slave.hStyle = "neat";
				eyeColor(["brown"], true);
				break;
			case "pacific islander":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["ebony", "black", "dark brown", "brown", "brown", "dark olive", "dark olive", "olive", "light olive", "light olive"]);
				slave.origHColor = jsEither(["jet black", "jet black", "black", "black", "black", "dark brown"]);
				slave.hStyle = "neat";
				eyeColor(["brown"], true);
				break;
			case "amerindian":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["dark brown", "brown", "dark olive", "olive", "light olive", "light olive"]);
				slave.origHColor = jsEither(["jet black", "jet black", "black", "black", "black", "dark brown"]);
				slave.hStyle = "neat";
				eyeColor(["brown"], true);
				break;
			case "asian":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["dark olive", "bronze", "olive", "tan", "light olive", "light", "fair", "fair", "pale", "pale", "very pale", "very pale"]);
				slave.origHColor = jsEither(["jet black", "jet black", "jet black", "black", "black", "black", "dark brown"]);
				slave.hStyle = "neat";
				eyeColor(["blue", "brown", "green"], true);
				break;
			case "middle eastern":
			case "semitic":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["brown", "dark olive", "tan", "tan", "tan", "light olive", "light olive", "light"]);
				slave.origHColor = jsEither(["jet black", "black", "black", "black", "dark brown", "dark brown", "dark brown"]);
				slave.hStyle = "neat";
				eyeColor(["blue", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "green"]);
				break;
			case "southern european":
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["dark olive", "olive", "olive", "light olive", "light olive", "light olive", "bronze", "tan", "light", "fair"]);
				slave.origHColor = jsEither(["jet black", "black", "black", "dark brown", "dark brown", "brown", "chestnut", "chocolate"]);
				slave.hStyle = "neat";
				eyeColor(["blue", "brown", "brown", "brown", "brown", "brown", "green"]);
				break;
			default:
				slave.lips = jsRandom(5, 25);
				slave.origSkin = jsEither(["brown", "dark olive", "olive", "light olive", "tan", "light"]);
				slave.origHColor = jsEither(["jet black", "black", "black", "black", "black", "dark brown", "brown", "chestnut"]);
				slave.hStyle = "neat";
				eyeColor(["blue", "brown", "green"], true);
		}
		if (slave.origHColor === "red"){
			slave.origHColor = jsEither(["chestnut", "auburn", "auburn", "auburn", "auburn", "ginger", "ginger", "copper", "copper", "red"]);
		}
		if ((skinToneLevel(slave.origSkin) > 5) && (skinToneLevel(slave.origSkin) < 10)) {
			if (jsRandom(1, 4) === 1) {
				slave.markings = jsEither(["beauty mark", "beauty mark", "birthmark", "birthmark", "freckles", "freckles", "freckles", "heavily freckled"]);
			}
		} else if (jsRandom(1, 8) === 1) {
			slave.markings = jsEither(["beauty mark", "birthmark"]);
		}

		/**
		 * @param {string[]} colors
		 * @param {boolean} [heteroOnly]
		 */
		function eyeColor(colors, heteroOnly = false) {
			if (!heteroOnly) {
				setGeneticEyeColor(slave, jsEither(colors));
			}
			if (slave.geneticQuirks.heterochromia === 2) {
				setGeneticEyeColor(slave, jsEither(colors), true);
			}
		}
	}

	function generateBoobTweaks() {
		if (V.weightAffectsAssets !== 0) {
			if (slave.weight < -10 && slave.boobs > 200) {
				slave.boobs -= 100;
			} else if (slave.weight > 190 && slave.boobs < 3000) {
				slave.boobs += (jsRandom(3, 8) * 100);
			} else if (slave.weight > 160 && slave.boobs < 1500) {
				slave.boobs += (jsRandom(2, 6) * 100);
			} else if (slave.weight > 130 && slave.boobs < 1500) {
				slave.boobs += (jsRandom(1, 4) * 100);
			} else if (slave.weight > 95 && slave.boobs < 1200) {
				slave.boobs += (jsRandom(1, 3) * 100);
			} else if (slave.weight > 30 && slave.boobs < 1000) {
				slave.boobs += 100;
			}
		}

		const BoobShapeGen = [];
		if (slave.boobs > 250 && slave.boobs < 800) {
			BoobShapeGen.push("perky");
			BoobShapeGen.push("downward-facing");
		}
		if (slave.boobs > 400 && slave.boobs < 1200) {
			BoobShapeGen.push("torpedo-shaped");
			BoobShapeGen.push("wide-set");
		}
		if (slave.boobs > 800 && slave.physicalAge > jsRandom(10, 50)) {
			BoobShapeGen.push("saggy");
		}
		if (BoobShapeGen.length === 1) {
			if (Math.random() < 0.5) {
				slave.boobShape = jsEither(BoobShapeGen);
			}
		} else if (BoobShapeGen.length > 1) {
			if (jsRandom(1, 3) !== 1) {
				slave.boobShape = jsEither(BoobShapeGen);
			}
		}

		if (slave.boobs < 250) {
			slave.nipples = jsEither(["cute", "cute", "partially inverted", "puffy", "tiny", "tiny", "tiny", "tiny"]);
		} else if (slave.boobs < 500) {
			slave.nipples = jsEither(["cute", "cute", "cute", "partially inverted", "puffy", "tiny"]);
		} else if (slave.boobs < 1000) {
			slave.nipples = jsEither(["cute", "cute", "cute", "inverted", "partially inverted", "puffy", "puffy", "tiny"]);
		} else {
			slave.nipples = jsEither(["cute", "huge", "inverted", "partially inverted", "puffy"]);
		}
	}

	function generateSkills() {
		slave.skill.vaginal = (slave.vagina === 0 ? 0 : jsRandom(0, 15));
		slave.skill.anal = (slave.anus === 0 ? 0 : jsRandom(0, 15));
		slave.skill.oral = jsRandom(0, 15);
		slave.skill.entertainment = jsRandom(0, 15);
		slave.skill.whoring = jsRandom(0, 15);
	}

	function generateDisabilities() {
		if (slave.physicalAge >= jsRandom(0, 100)) {
			eyeSurgery(slave, "both", "blur");
		}
		if (slave.physicalAge >= jsRandom(30, 100)) {
			slave.hears = -1;
		}
		if (V.seeExtreme === 1) {
			const disList = [];
			disList.push("hearNot");
			disList.push("seeNot");
			disList.push("speakNot");
			disList.push("smellNot");
			disList.push("tasteNot");
			let disableCount = 0;
			if (V.oneTimeDisableDisability === 0) {
				while (disList.length > 0) {
					const rolled = jsEither(disList);
					switch (rolled) {
						case "hearNot":
							if ((jsRandom(1, 100) - (disableCount * 2)) > 90) {
								slave.hears = -2;
							}
							disList.delete("hearNot");
							disableCount++;
							break;
						case "seeNot":
							if ((jsRandom(1, 100) - (disableCount * 2)) > 90) {
								eyeSurgery(slave, "both", "blind");
							}
							disList.delete("seeNot");
							disableCount++;
							break;
						case "speakNot":
							if ((jsRandom(1, 100) - (disableCount * 2)) > 90) {
								slave.voice = 0;
							}
							disList.delete("speakNot");
							disableCount++;
							break;
						case "smellNot":
							if ((jsRandom(1, 100) - (disableCount * 2)) > 90) {
								slave.smells = -1;
							}
							disList.delete("smellNot");
							disableCount++;
							break;
						case "tasteNot":
							if ((jsRandom(1, 100) - (disableCount * 2)) > 90) {
								slave.tastes = -1;
							}
							disList.delete("tasteNot");
							disableCount++;
							break;
					}
				}
			}
			V.oneTimeDisableDisability = 0;
		}
	}

	function generateGeneticQuirkTweaks() {
		if (slave.geneticQuirks.albinism === 2) {
			slave.albinismOverride = {
				skin: 0,
				eyeColor: "red",
				hColor: "white"
			};
			switch (slave.race) {
				case "black":
				case "indo-aryan":
				case "malay":
				case "pacific islander":
				case "amerindian":
					slave.albinismOverride.skin = "very fair";
					break;
				case "latina":
					slave.albinismOverride.skin = "extremely fair";
					break;
				case "asian":
				case "middle eastern":
				case "semitic":
				case "southern european":
				case "white":
					slave.albinismOverride.skin = "pure white";
					break;
				default:
					slave.albinismOverride.skin = "pure white";
			}
		}
		if (slave.geneticQuirks.rearLipedema === 2) {
			slave.butt += jsRandom(0.2 * slave.physicalAge, 0.5 * slave.physicalAge);
			slave.butt = Math.clamp(slave.butt, 0, 24);
		}
		if (slave.geneticQuirks.macromastia === 3) {
			if (slave.pubertyXX > 0) {
				if (jsRandom(1, 10) > 3) {
					slave.geneticQuirks.macromastia = 2;
				}
			}
		}
		if (slave.geneticQuirks.macromastia === 2) {
			slave.boobs += jsRandom(1 * slave.physicalAge, 3 * slave.physicalAge) * 100;
			slave.boobs = Math.clamp(slave.boobs, 300, 5000);
		}
		if (slave.geneticQuirks.gigantomastia === 3) {
			if (slave.pubertyXX > 0) {
				if (jsRandom(1, 10) > 3) {
					slave.geneticQuirks.gigantomastia = 2;
				}
			}
		}
		if (slave.geneticQuirks.gigantomastia === 2) {
			slave.boobs += jsRandom(1 * slave.physicalAge, 20 * slave.physicalAge) * 100;
			if (slave.geneticQuirks.macromastia === 2) {
				slave.boobs = Math.clamp(slave.boobs, 300, 100000);
			} else {
				slave.boobs = Math.clamp(slave.boobs, 300, 25000);
			}
		}
		if (slave.geneticQuirks.mGain === 2) {
			slave.muscles += jsRandom(10, 50);
			slave.muscles = Math.clamp(slave.muscles, -100, 100);
		}
		if (slave.geneticQuirks.mLoss === 2) {
			slave.muscles -= jsRandom(10, 50);
			slave.muscles = Math.clamp(slave.muscles, -100, 100);
		}
		if (slave.geneticQuirks.wGain === 2) {
			slave.weight += jsRandom(10, 50);
			slave.weight = Math.clamp(slave.weight, -100, 200);
			slave.weightDirection = 1;
		}
		if (slave.geneticQuirks.wLoss === 2) {
			slave.weight -= jsRandom(10, 50);
			slave.weight = Math.clamp(slave.weight, -100, 200);
			slave.weightDirection = -1;
		}
		if (slave.geneticQuirks.androgyny === 2) {
			slave.faceShape = "androgynous";
			if (slave.face < 60) {
				slave.face += 15;
			}
		}
	}

	function generateHormones() {
		// PubertyXX and PubertyXY == 1 at this point should guarantee functioning sex organs of the appropriate type
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
	}

	return GenerateNewSlave;
})();
