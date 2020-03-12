// Generates a child's genetics based off mother and father and returns it as an object to be attached to an ovum

window.generateGenetics = (function() {
	"use strict";
	let genes;
	let mother;
	let activeMother;
	let father;
	let activeFather;


	// intelligence and face parameters are the same so we can use the same distribution for both values
	// clamping makes edge values (-100, 100) more likely; this is expected behavior
	// please see https://gitgud.io/pregmodfan/fc-pregmod/issues/852
	const fuzzy = (a, b) => Math.clamp(normalRandInt((a + b) / 2, 20), -100, 100);

	/**
	 * @param {App.Entity.SlaveState} actor1
	 * @param {number} actor2 Slave ID of actor 2
	 * @param {number} x
	 * @returns
	 */
	function generateGenetics(actor1, actor2, x) {
		genes = {
			gender: "XX",
			name: "blank",
			surname: 0,
			mother: 0,
			motherName: "none",
			father: 0,
			fatherName: "none",
			nationality: "Stateless",
			race: "white",
			intelligence: 0,
			face: 0,
			faceShape: "cute",
			eyeColor: "brown",
			hColor: "black",
			skin: "light",
			markings: "none",
			behavioralFlaw: "none",
			sexualFlaw: "none",
			pubicHStyle: "bushy",
			underArmHStyle: "bushy",
			clone: 0,
			cloneID: 0,
			geneticQuirks: {},
			fetish: "none"
		};
		if (actor1.ID > 0) {
			mother = V.genePool.find(s => s.ID === actor1.ID);
			if (mother === undefined) {
				mother = actor1;
			}
			activeMother = V.slaves[V.slaveIndices[actor1]];
			if (activeMother === undefined) {
				activeMother = actor1;
			}
		} else {
			activeMother = V.PC;
			mother = V.PC;
		}
		if (actor2 > 0) {
			father = V.genePool.find(s => s.ID === actor2);
			activeFather = V.slaves[V.slaveIndices[actor2]];
			if (father === undefined) {
				father = V.slaves[V.slaveIndices[actor2]];
				activeFather = V.slaves[V.slaveIndices[actor2]];
			}
			if (father === undefined) {
				if (V.incubator > 0) {
					father = V.tanks.find(s => s.ID === actor2);
					activeFather = 0; // activeFather = father?
				}
			}
			if (father === undefined) {
				if (V.nursery > 0) {
					father = V.cribs.find(s => s.ID === actor2);
					activeFather = 0; // activeFather = father?
				}
			}
			if (father === undefined) {
				father = 0;
				activeFather = 0;
			}
		} else if (actor2 === -1) {
			father = V.PC;
			activeFather = V.PC;
		} else {
			father = 0;
			activeFather = 0;
		}

		genes.gender = setGender(father, mother);
		genes.name = setName(x);
		genes.mother = setMotherID(actor1.ID);
		genes.motherName = setMotherName(activeMother);
		genes.father = setFatherID(actor2);
		genes.fatherName = setFatherName(father, activeFather, actor2);
		genes.nationality = setNationality(father, mother);
		genes.geneticQuirks = setGeneticQuirks(activeFather, activeMother, genes.gender);
		genes.skin = setSkin(father, mother, actor2);
		genes.race = setRace(father, mother, actor2);
		genes.intelligence = setIntelligence(father, mother, activeMother, actor2);
		genes.face = setFace(father, mother, activeMother, actor2, genes.geneticQuirks);
		genes.faceShape = setFaceShape(father, mother, genes.geneticQuirks);
		genes.eyeColor = setEyeColor(father, mother, actor2);
		if (genes.geneticQuirks.heterochromia === 2) {
			genes.geneticQuirks.heterochromia = setHeterochromaticEyeColor(father, mother, actor2);
		}
		genes.hColor = setHColor(father, mother, actor2);
		genes.underArmHStyle = setUnderArmHStyle(father, mother);
		genes.pubicHStyle = setPubicHStyle(father, mother);
		genes.markings = setMarkings(father, mother);
		genes.sexualFlaw = setSexualFlaw(father, mother);
		genes.behavioralFlaw = setBehavioralFlaw(father, mother);
		genes.fetish = setFetish(father, mother);

		return genes;
	}

	// gender
	function setGender(father, mother) {
		let gender;
		if (mother.geneticQuirks.girlsOnly === 2) {
			gender = "XX";
		} else if (V.seeDicksAffectsPregnancy === 1) {
			gender = jsRandom(0, 99) < V.seeDicks ? "XY" : "XX";
		} else if (V.adamPrinciple === 1) {
			if (father !== 0) {
				if (father.genes === "XX" && mother.genes === "XX") {
					gender = "XX";
				} else if (father.genes !== mother.genes) {
					gender = jsEither(["XX", "XY"]);
				} else {
					gender = jsEither(["XX", "XY", "XY", "YY"]);
				}
			} else {
				gender = jsEither(["XX", "XY"]);
			}
		} else {
			gender = jsEither(["XX", "XY"]);
		}
		return gender;
	}

	// name
	function setName(x) {
		return `ovum${x}`;
	}

	// motherID
	function setMotherID(actor1ID) {
		return actor1ID;
	}

	// motherName
	function setMotherName(activeMother) {
		let motherName;
		motherName = activeMother.slaveName;
		if (activeMother.slaveSurname !== 0 && activeMother.slaveSurname !== "") {
			motherName += ` ${activeMother.slaveSurname}`;
		}
		return motherName;
	}

	// fatherID
	function setFatherID(actor2) {
		return actor2;
	}

	// fatherName
	function setFatherName(father, activeFather, actor2) {
		let fatherName;
		if (father !== 0) {
			fatherName = activeFather.slaveName;
			if (activeFather.slaveSurname !== 0 && activeFather.slaveSurname !== "") {
				fatherName += ` ${activeFather.slaveSurname}`;
			}
		} else {
			switch (actor2) {
				case -2:
				case -5:
					fatherName = "Citizen";
					break;
				case -3:
					fatherName = "Your Master";
					break;
				case -4:
					fatherName = "Another arcology owner";
					break;
				case -6:
					fatherName = "The Societal Elite";
					break;
				case -7:
					fatherName = "Lab designed";
					break;
				case -9:
					fatherName = "A Futanari Sister";
					break;
				default:
					fatherName = "Unknown";
			}
		}
		return fatherName;
	}

	// nationality
	function setNationality(father, mother) {
		if (father === 0 || father.nationality !== mother.nationality) {
			return "Stateless";
		} else {
			return mother.nationality;
		}
	}

	// race
	function setRace(father, mother, actor2) {
		let race;
		let fatherRace = 0;
		if (father !== 0) {
			if (mother.origRace === father.origRace) {
				race = mother.origRace;
			} else if (jsRandom(1, 4) === 4) {
				race = jsEither([father.origRace, mother.origRace]);
			} else {
				race = "mixed race";
			}
		} else {
			if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSupremacistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSupremacist !== "unset")) {
				fatherRace = V.arcologies[0].FSSupremacistRace;
			} else if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSubjugationistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSubjugationist !== "unset")) {
				let racesList = setup.filterRacesLowercase.filter(race => race !== V.arcologies[0].FSSubjugationistRace);
				fatherRace = racesList.random();
			}
			if (fatherRace !== 0) {
				if (mother.origRace === fatherRace) {
					race = mother.origRace;
				} else if (jsRandom(1, 4) === 4) {
					race = jsEither([fatherRace, mother.origRace]);
				} else {
					race = "mixed race";
				}
			} else {
				race = mother.origRace;
			}
		}
		return race;
	}

	// skin
	function setSkin(father, mother, actor2) {
		let fatherSkin = 0;
		let dadSkinIndex;
		const skinToMelanin = {
			"pure black": 25,
			"ebony": 24,
			"black": 23,
			"dark brown": 22,
			"brown": 21,
			"light brown": 20,
			"dark beige": 19,
			"beige": 18,
			"light beige": 17,
			"dark": 16,
			"dark olive": 15,
			"bronze": 14,
			"olive": 13,
			"tan": 12,
			"light olive": 11,
			"light": 10,
			"fair": 9,
			"very fair": 8,
			"extremely fair": 7,
			"pale": 6,
			"very pale": 5,
			"extremely pale": 4,
			"white": 3,
			"ivory": 2,
			"pure white": 1
		};
		const momSkinIndex = mother ? (skinToMelanin[mother.origSkin] || 13) : 8;
		if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSupremacistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSupremacist !== "unset")) {
			fatherSkin = randomRaceSkin(V.arcologies[0].FSSupremacistRace);
		} else if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSubjugationistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSubjugationist !== "unset")) {
			let racesList = setup.filterRacesLowercase.filter(race => race !== V.arcologies[0].FSSubjugationistRace);
			fatherSkin = randomRaceSkin(racesList.random());
		}
		if (fatherSkin !== 0) {
			dadSkinIndex = father !== 0 ? (skinToMelanin[fatherSkin] || 13) : 8;
		} else {
			dadSkinIndex = father !== 0 ? (skinToMelanin[father.origSkin] || 13) : 8;
		}
		const skinIndex = Math.round(Math.random() * (dadSkinIndex - momSkinIndex) + momSkinIndex);

		let prop = "";
		for (prop in skinToMelanin) {
			if (!skinToMelanin.hasOwnProperty(prop)) { continue; }
			if (skinIndex >= skinToMelanin[prop]) { return prop; }
		}
		return prop; // skinIndex can be zero - now false?
	}

	// eyeColor
	function setEyeColor(father, mother, actor2) {
		let eyeColor;
		let fatherEye = 0;
		if (father !== 0) {
			if (mother.eye.origColor === father.eye.origColor) {
				eyeColor = mother.eye.origColor;
			} else if (["light red", "milky white", "pale gray", "pale red", "red"].contains(mother.eye.origColor)) {
				eyeColor = father.eye.origColor;
			} else if (["light red", "milky white", "pale gray", "pale red", "red"].contains(father.eye.origColor)) {
				eyeColor = mother.eye.origColor;
			} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].contains(mother.eye.origColor)) {
				if (jsRandom(1, 4) === 2) {
					eyeColor = mother.eye.origColor;
				} else {
					eyeColor = father.eye.origColor;
				}
			} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].contains(father.eye.origColor)) {
				if (jsRandom(1, 4) === 2) {
					eyeColor = father.eye.origColor;
				} else {
					eyeColor = mother.eye.origColor;
				}
			} else {
				eyeColor = jsEither([father.eye.origColor, mother.eye.origColor]);
			}
		} else {
			if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSupremacistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSupremacist !== "unset")) {
				fatherEye = randomRaceEye(V.arcologies[0].FSSupremacistRace);
			} else if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSubjugationistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSubjugationist !== "unset")) {
				let racesList = setup.filterRacesLowercase.filter(race => race !== V.arcologies[0].FSSubjugationistRace);
				fatherEye = randomRaceEye(racesList.random());
			}
			if (fatherEye !== 0) {
				if (mother.eye.origColor === fatherEye) {
					eyeColor = mother.eye.origColor;
				} else if (["light red", "milky white", "pale gray", "pale red", "red"].contains(mother.eye.origColor)) {
					eyeColor = fatherEye;
				} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].contains(mother.eye.origColor)) {
					if (jsRandom(1, 4) === 2) {
						eyeColor = mother.eye.origColor;
					} else {
						eyeColor = fatherEye;
					}
				} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].contains(fatherEye)) {
					if (jsRandom(1, 4) === 2) {
						eyeColor = fatherEye;
					} else {
						eyeColor = mother.eye.origColor;
					}
				} else {
					eyeColor = jsEither([fatherEye, mother.eye.origColor]);
				}
			} else {
				eyeColor = mother.eye.origColor;
			}
		}
		// just in case something wrong gets through
		switch (eyeColor) {
			case "blind blue":
				eyeColor = "deep blue";
				break;
			case "milky white":
			case "implant":
				eyeColor = jsEither(["blue", "brown", "dark blue", "dark green", "green", "hazel", "light blue", "light green"]);
				break;
		}
		return eyeColor;
	}

	function setHeterochromaticEyeColor(father, mother, actor2) {
		let hEyeColor;
		let fatherHEye = 0;
		let eyeColorArray = [];
		if (father !== 0) {
			eyeColorArray.push(mother.eye.origColor);
			eyeColorArray.push(father.eye.origColor);
			if (father.geneticQuirks.heterochromia !== 0 && father.geneticQuirks.heterochromia !== 1) {
				eyeColorArray.push(father.geneticQuirks.heterochromia);
			}
		} else {
			if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSupremacistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSupremacist !== "unset")) {
				fatherHEye = randomRaceEye(V.arcologies[0].FSSupremacistRace);
			} else if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSubjugationistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSubjugationist !== "unset")) {
				let racesList = setup.filterRacesLowercase.filter(race => race !== V.arcologies[0].FSSubjugationistRace);
				fatherHEye = randomRaceEye(racesList.random());
			}
			if (fatherHEye !== 0) {
				eyeColorArray.push(fatherHEye);
				eyeColorArray.push(mother.eye.origColor);
			} else {
				eyeColorArray.push(mother.eye.origColor);
			}
		}
		if (mother.geneticQuirks.heterochromia !== 0 && mother.geneticQuirks.heterochromia !== 1) {
			eyeColorArray.push(mother.geneticQuirks.heterochromia);
		}
		// just in case something wrong gets through
		switch (hEyeColor) {
			case "blind blue":
				hEyeColor = ["deep blue"];
				break;
			case "milky white":
			case "implant":
				hEyeColor = jsEither(["blue", "brown", "dark blue", "dark green", "green", "hazel", "light blue", "light green"]);
				break;
		}
		return jsEither(eyeColorArray);
	}

	// hColor
	function setHColor(father, mother, actor2) {
		let hairColor;
		let fatherHair = 0;
		if (father !== 0) {
			if (mother.origHColor === father.origHColor) {
				hairColor = mother.origHColor;
			} else if (mother.origHColor === "white") {
				hairColor = jsRandom(1, 100) === 69 ? mother.origHColor : father.origHColor;
			} else if (father.origHColor === "white") {
				hairColor = jsRandom(1, 100) === 69 ? father.origHColor : mother.origHColor;
			} else if (["black", "jet black"].contains(mother.origHColor)) {
				hairColor = jsEither([father.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor]);
			} else if (["black", "jet black"].contains(father.origHColor)) {
				hairColor = jsEither([father.origHColor, father.origHColor, father.origHColor, father.origHColor, father.origHColor, father.origHColor, father.origHColor, mother.origHColor]);
			} else if (["brown", "chestnut", "chocolate", "dark brown"].contains(mother.origHColor)) {
				hairColor = jsEither([father.origHColor, mother.origHColor, mother.origHColor, mother.origHColor]);
			} else if (["brown", "chestnut", "chocolate", "dark brown"].contains(father.origHColor)) {
				hairColor = jsEither([father.origHColor, father.origHColor, father.origHColor, mother.origHColor]);
			} else {
				hairColor = jsEither([father.origHColor, mother.origHColor]);
			}
		} else {
			if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSupremacistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSupremacist !== "unset")) {
				fatherHair = randomRaceHair(V.arcologies[0].FSSupremacistRace);
			} else if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSubjugationistLawME === 1) || (actor2 === -6 && V.arcologies[0].FSSubjugationist !== "unset")) {
				let racesList = setup.filterRacesLowercase.filter(race => race !== V.arcologies[0].FSSubjugationistRace);
				fatherHair = randomRaceHair(racesList.random());
			}
			if (fatherHair !== 0) {
				if (mother.origHColor === fatherHair) {
					hairColor = mother.origHColor;
				} else if (mother.origHColor === "white") {
					hairColor = jsRandom(1, 100) === 69 ? mother.origHColor : fatherHair;
				} else if (["black", "jet black"].contains(mother.origHColor)) {
					hairColor = jsEither([fatherHair, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor]);
				} else if (["black", "jet black"].contains(father.origHColor)) {
					hairColor = jsEither([fatherHair, fatherHair, fatherHair, fatherHair, fatherHair, fatherHair, fatherHair, mother.origHColor]);
				} else if (["brown", "chestnut", "chocolate", "dark brown"].contains(mother.origHColor)) {
					hairColor = jsEither([fatherHair, mother.origHColor, mother.origHColor, mother.origHColor]);
				} else if (["brown", "chestnut", "chocolate", "dark brown"].contains(father.origHColor)) {
					hairColor = jsEither([fatherHair, fatherHair, fatherHair, mother.origHColor]);
				} else {
					hairColor = jsEither([fatherHair, mother.origHColor]);
				}
			} else {
				hairColor = mother.origHColor;
			}
		}
		return hairColor;
	}

	// underArmHairStyle
	function setUnderArmHStyle(father, mother) {
		let hair;
		if (father !== 0) {
			if (mother.underArmHStyle === "hairless" && father.underArmHStyle === "hairless") {
				hair = "hairless";
			} else if (mother.underArmHStyle === "hairless" || father.underArmHStyle === "hairless") {
				hair = (jsRandom(1, 5) === 3) ? "hairless" : jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
			} else {
				hair = jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
			}
		} else if (mother.underArmHStyle === "hairless") {
			hair = (jsRandom(1, 5) === 3) ? "hairless" : jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
		} else {
			hair = jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
		}
		return hair;
	}

	// pubicHairStyle
	function setPubicHStyle(father, mother) {
		let hair;
		if (father !== 0) {
			if (mother.pubicHStyle === "hairless" && father.pubicHStyle === "hairless") {
				hair = "hairless";
			} else if (mother.pubicHStyle === "hairless" || father.pubicHStyle === "hairless") {
				hair = (jsRandom(1, 5) === 3) ? "hairless" : jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
			} else {
				hair = jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
			}
		} else if (mother.pubicHStyle === "hairless") {
			hair = (jsRandom(1, 5) === 3) ? "hairless" : jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
		} else {
			hair = jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
		}
		return hair;
	}

	// markings
	function setMarkings(father, mother) {
		let markings;
		if (jsRandom(1, 8) === 1) {
			markings = jsEither(["beauty mark", "birthmark"]);
		} else {
			markings = "none";
		}
		if (markings === "none") {
			if (father !== 0) {
				markings = jsEither(["none", "none", father.markings, mother.markings]);
			} else {
				markings = jsEither(["none", "none", mother.markings, mother.markings]);
			}
		}
		return markings;
	}

	// sexualFlaw
	function setSexualFlaw(father, mother) {
		let flaw;
		if (father !== 0) {
			flaw = jsEither(["none", "none", father.sexualFlaw, mother.sexualFlaw]);
		} else {
			flaw = jsEither(["none", "none", mother.sexualFlaw, mother.sexualFlaw]);
		}
		return flaw;
	}

	// behavioralFlaw
	function setBehavioralFlaw(father, mother) {
		let flaw;
		if (father !== 0) {
			flaw = jsEither(["none", "none", father.behavioralFlaw, mother.behavioralFlaw]);
		} else {
			flaw = jsEither(["none", "none", mother.behavioralFlaw, mother.behavioralFlaw]);
		}
		return flaw;
	}

	// fetish
	function setFetish(father, mother) {
		let fetish;
		if (father !== 0) {
			fetish = jsEither(["none", "none", "none", "none", "none", father.fetish, mother.fetish]);
		} else {
			fetish = jsEither(["none", "none", "none", "none", "none", mother.fetish, mother.fetish]);
		}
		if (fetish === "mindbroken") { fetish = "none"; }
		return fetish;
	}

	// intelligence
	function setIntelligence(father, mother, activeMother, actor2) {
		let smarts;
		if (mother.ID === -1) {
			if (actor2 === -6) {
				smarts = Math.clamp(normalRandInt(95, 2.5), -100, 100);
			} else if (father !== 0) {
				smarts = fuzzy(father.intelligence, mother.intelligence);
				// player is considered "good stock"
				while (smarts < 50) {
					smarts = fuzzy(father.intelligence, mother.intelligence);
				}
			} else {
				smarts = Math.clamp(normalRandInt(75, 12.5), -100, 100);
			}
		} else if (father !== 0) {
			smarts = fuzzy(father.intelligence, mother.intelligence);
			// elite slaves are also considered "good stock"
			while (activeMother.breedingMark && smarts < 50) {
				smarts = fuzzy(father.intelligence, mother.intelligence);
			}
		} else {
			smarts = mother.intelligence;
		}
		if (V.inbreeding === 1) {
			if (mother.ID !== -1) {
				if (father !== 0 && father.ID === -1 && activeMother.breedingMark !== 1) {
					if (smarts >= -95 && jsRandom(1, 100) < 40) {
						smarts -= jsRandom(1, 10);
						if (smarts >= -95 && jsRandom(1, 100) < 20) {
							smarts -= jsRandom(1, 5);
						}
					}
				} else {
					if (smarts >= -95 && jsRandom(1, 100) < 50) {
						smarts -= jsRandom(1, 15);
						if (smarts >= -95 && jsRandom(1, 100) < 30) {
							smarts -= jsRandom(1, 15);
						}
					}
				}
			}
		}
		return Math.clamp(smarts, -100, 100);
	}

	// face
	function setFace(father, mother, activeMother, actor2, genes) {
		let face;
		if (genes.pFace > 0 && genes.uFace > 0) {
			face = 0;
		} else if (genes.pFace > 0) {
			face = 100;
		} else if (genes.uFace > 0) {
			face = -100;
		} else if (mother.ID === -1) {
			if (actor2 === -6) {
				face = Math.clamp(normalRandInt(95, 2.5), -100, 100);
			} else if (father !== 0) {
				face = fuzzy(father.face, mother.face);
				// the player is considered "good stock"
				while (face < 50) {
					face = fuzzy(father.face, mother.face);
				}
			} else {
				face = Math.clamp(normalRandInt(60, 20), -100, 100);
			}
		} else if (father !== 0) {
			face = fuzzy(father.face, mother.face);
			// elite slaves are also considered "good stock"
			while (activeMother.breedingMark && face < 50) {
				face = fuzzy(father.face, mother.face);
			}
		} else {
			face = mother.face;
		}
		if (V.inbreeding === 1 && genes.pFace === 0 && genes.uFace === 0) {
			if (mother.ID !== -1) {
				if (father !== 0 && father.ID === -1 && activeMother.breedingMark !== 1) {
					if (face > -100 && jsRandom(1, 100) > 60) {
						face -= jsRandom(2, 20);
					}
				} else {
					if (face > -100 && jsRandom(1, 100) < 50) {
						face -= jsRandom(1, 15);
						if (face >= -95 && jsRandom(1, 100) < 30) {
							face -= jsRandom(5, 20);
						}
					}
				}
			}
		}
		return Math.clamp(face, -100, 100);
	}

	// face shape
	function setFaceShape(father, mother, genes) {
		let shape;
		if (genes.androgyny === 2) {
			shape = "androgynous";
		} else if (father !== 0) {
			if (mother.faceShape === father.faceShape) {
				shape = mother.faceShape;
			} else {
				shape = jsEither(["androgynous", "androgynous", "cute", "cute", "exotic", "normal", "normal", "sensual", mother.faceShape, mother.faceShape]);
			}
		} else {
			shape = jsEither(["androgynous", "androgynous", "cute", "cute", "exotic", "normal", "normal", "sensual", mother.faceShape, mother.faceShape]);
		}
		return shape;
	}

	/**
	 * Genetic quirks
	 * @param {App.Entity.SlaveState|number} father
	 * @param {App.Entity.SlaveState} mother
	 * @param {string} sex
	 * @returns {Object}
	 */
	function setGeneticQuirks(father, mother, sex) {
		let quirks = {
			macromastia: 0,
			gigantomastia: 0,
			fertility: 0,
			hyperFertility: 0,
			superfetation: 0,
			gigantism: 0,
			dwarfism: 0,
			pFace: 0,
			uFace: 0,
			albinism: 0,
			heterochromia: 0,
			rearLipedema: 0,
			wellHung: 0,
			wGain: 0,
			wLoss: 0,
			mGain: 0,
			mLoss: 0,
			androgyny: 0
		};
		let chance = 0;
		let fathergenes = 0;
		let genetarget = 0;

		// Genetics implementation
		// Autosomal recessive: For each gene, add up gene level (0, 1, or 2) for both parents; if total level 1 or above, then roll a d16.
		// If result is less than 2^(total gene level), child manifests the quirk.
		// Otherwise, if result is less than 3*2^(total gene level), child is carrier of the quirk.
		// This precisely duplicates autosomal recessive behavior for cases where both parents manifest, one manifests and one is carrier, or where both are carriers.
		// If one manifests and one normal, it behaves the same as both carriers instead of having 100% carrier children; result is more interesting this way.
		// If one carrier and one normal, it gives 1/8th manifesting, 1/4th carrier; small overall chance, more interesting than the realistic 50% carrier.

		// Sex-linked recessive: ???
		// realism would be, looking at hypothetical x-carried gene that by its nature can only affect women
		// Male carrier, female with condition:		100% of daughters have condition, 100% of sons carriers					genetotal 3
		// Normal male, female with condition:		100% of daughters are carriers, 100% of sons are carriers				genetotal 2
		// Carrier male, carrier female:			50% of daughters have condition, 50% carriers; 50% of sons carriers.	genetotal 2
		// Normal male, carrier female:				50% of daughters carriers,	50% of sons carriers						genetotal 1
		// Carrier male, normal female:				100% of daughters carriers, sons normal									genetotal 1

		// Sex-linked traits (fertility-affecting, well-hung) left handled by the old method; latter made mirror image to former.

		// fertility
		if (mother.geneticQuirks.fertility === 2) {
			if (sex === "XX") {
				quirks.fertility = 2;
			} else {
				quirks.fertility = 1;
			}
		} else if (mother.geneticQuirks.fertility === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.fertility >= 1) {
					if (sex === "XX") {
						if (chance > 500) {
							quirks.fertility = 2;
						} else if (chance > 50) {
							quirks.fertility = 1;
						}
					} else {
						if (chance > 500) {
							quirks.fertility = 1;
						}
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.fertility = 2;
					} else if (chance > 200) {
						quirks.fertility = 1;
					}
				} else {
					if (chance > 500) {
						quirks.fertility = 1;
					}
				}
			}
		}

		// hyper fertility
		if (mother.geneticQuirks.hyperFertility === 2) {
			if (sex === "XX") {
				quirks.hyperFertility = 2;
			} else {
				quirks.hyperFertility = 1;
			}
		} else if (mother.geneticQuirks.hyperFertility === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.hyperFertility >= 1) {
					if (sex === "XX") {
						if (chance > 750) {
							quirks.hyperFertility = 2;
						} else if (chance > 500) {
							quirks.hyperFertility = 1;
						}
					} else {
						if (chance > 500) {
							quirks.hyperFertility = 1;
						}
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.hyperFertility = 2;
					} else if (chance > 700) {
						quirks.hyperFertility = 1;
					}
				} else {
					if (chance > 700) {
						quirks.hyperFertility = 1;
					}
				}
			}
		}

		// superfetation
		if (mother.geneticQuirks.superfetation === 2) {
			if (sex === "XX") {
				quirks.superfetation = 2;
			} else {
				quirks.superfetation = 1;
			}
		} else if (mother.geneticQuirks.superfetation === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.superfetation >= 1) {
					if (sex === "XX") {
						if (chance > 750) {
							quirks.superfetation = 2;
						} else if (chance > 700) {
							quirks.superfetation = 1;
						}
					} else {
						if (chance > 700) {
							quirks.superfetation = 1;
						}
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.superfetation = 2;
					} else if (chance > 900) {
						quirks.superfetation = 1;
					}
				} else {
					if (chance > 900) {
						quirks.superfetation = 1;
					}
				}
			}
		}

		// well hung
		if (father !== 0) {
			if (father.geneticQuirks.wellHung === 2) {
				if (sex === "XY") {
					quirks.wellHung = 2;
				} else {
					quirks.wellHung = 1;
				}
			} else if (father.geneticQuirks.wellHung === 1) {
				chance = jsRandom(0, 1000);
				if (mother.geneticQuirks.wellHung >= 1) {
					if (sex === "XY") {
						if (chance > 750) {
							quirks.wellHung = 2;
						} else if (chance > 700) {
							quirks.wellHung = 1;
						}
					} else {
						if (chance > 700) {
							quirks.wellHung = 1;
						}
					}
				}
			}
		}


		// perfect face
		if (father !== 0) {
			fathergenes = father.geneticQuirks.pFace;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.pFace + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.pFace = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.pFace = 1;
			}
		}

		// ugly face
		if (father !== 0) {
			fathergenes = father.geneticQuirks.uFace;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.uFace + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.uFace = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.uFace = 1;
			}
		}

		// gigantism
		if (father !== 0) {
			fathergenes = father.geneticQuirks.gigantism;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.gigantism + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.gigantism = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.gigantism = 1;
			}
		}

		// dwarfism
		if (father !== 0) {
			fathergenes = father.geneticQuirks.dwarfism;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.dwarfism + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.dwarfism = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.dwarfism = 1;
			}
		}

		// albinism
		if (father !== 0) {
			fathergenes = father.geneticQuirks.albinism;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.albinism + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.albinism = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.albinism = 1;
			}
		}

		// heterochromia
		if (father !== 0) {
			fathergenes = father.geneticQuirks.heterochromia;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.heterochromia + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.heterochromia = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.heterochromia = 1;
			}
		}

		// rear lipedema
		if (father !== 0) {
			fathergenes = father.geneticQuirks.rearLipedema;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.rearLipedema + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.rearLipedema = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.rearLipedema = 1;
			}
		}

		// Gigantomastia
		if (father !== 0) {
			fathergenes = father.geneticQuirks.gigantomastia;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.gigantomastia + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.gigantomastia = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.gigantomastia = 1;
			}
		}

		// Macromastia
		if (father !== 0) {
			fathergenes = father.geneticQuirks.macromastia;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.macromastia + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.macromastia = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.macromastia = 1;
			}
		}

		// myotonic hypertrophy
		if (father !== 0) {
			fathergenes = father.geneticQuirks.mGain;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.mGain + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.mGain = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.mGain = 1;
			}
		}

		// myotonic dystrophy
		if (father !== 0) {
			fathergenes = father.geneticQuirks.mLoss;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.mLoss + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.mLoss = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.mLoss = 1;
			}
		}

		// hyperleptinemia
		if (father !== 0) {
			fathergenes = father.geneticQuirks.wGain;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.wGain + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.wGain = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.wGain = 1;
			}
		}

		// hypoleptinemia
		if (father !== 0) {
			fathergenes = father.geneticQuirks.wLoss;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.wLoss + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.wLoss = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.wLoss = 1;
			}
		}

		// androgyny
		if (father !== 0) {
			fathergenes = father.geneticQuirks.androgyny;
		}
		genetarget = Math.pow(2, mother.geneticQuirks.androgyny + fathergenes);
		if (genetarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= genetarget) {
				quirks.androgyny = 2;
			} else if (chance <= 3 * genetarget) {
				quirks.androgyny = 1;
			}
		}

		return clone(quirks);
	}

	return generateGenetics;
})();

/**
 * @param {App.Entity.SlaveState} mother
 */
window.generateChild = function(mother, ova, destination) {
	let genes = ova.genetics; // maybe just argument this? We'll see.
	let pregUpgrade = V.pregnancyMonitoringUpgrade;
	let child = {};

	if (!destination) { // does extra work for the incubator if defined, otherwise builds a simple object
		if (genes.gender === "XX") {
			child.genes = "XX";
			child.slaveSurname = genes.surname;
			if (!pregUpgrade) {
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveName = `Your clone`;
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						child.slaveName = `${genes.clone}'s clone`;
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed !== undefined) {
							if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
								child.slaveSurname = cloneSeed.slaveSurname;
							}
						}
					}
				} else if (genes.mother === -1) {
					if (genes.father <= 0) {
						child.slaveName = `Your daughter`;
					} else {
						child.slaveName = `Your and ${genes.fatherName}'s daughter`;
					}
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveName = `${genes.motherName}'s and your daughter`;
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						child.slaveName = `${genes.motherName} and ${genes.fatherName}'s daughter`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						child.slaveName = `${genes.motherName}'s bastard daughter`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			} else {
				let childName = genes.name;
				if (childName.indexOf("ovum") === 0) {
					if (genes.clone) {
						if (genes.cloneID === -1) {
							child.slaveName = `Your clone`;
							child.slaveSurname = V.PC.slaveSurname;
						} else {
							child.slaveName = `${genes.clone}'s clone`;
							let cloneSeed = getSlave(genes.cloneID);
							if (cloneSeed !== undefined) {
								if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
									child.slaveSurname = cloneSeed.slaveSurname;
								}
							}
						}
					} else if (genes.mother === -1) {
						if (genes.father <= 0) {
							child.slaveName = "Your son";
						} else {
							child.slaveName = `Your and ${genes.fatherName}'s son`;
						}
					} else {
						if (genes.father === -1) {
							child.slaveName = `${genes.motherName}'s and your son`;
						} else if (genes.father > 0) {
							child.slaveName = `${genes.motherName} and ${genes.fatherName}'s son`;
						} else {
							child.slaveName = `${genes.motherName}'s bastard son`;
						}
					}
				} else {
					child.slaveName = genes.name;
				}
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed !== undefined) {
							if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
								child.slaveSurname = cloneSeed.slaveSurname;
							}
						}
					}
				} else if (genes.mother === -1) {
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			}
		} else {
			child.genes = "XY";
			child.slaveSurname = genes.surname;
			if (!pregUpgrade) {
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveName = `Your clone`;
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						child.slaveName = `${genes.clone}'s clone`;
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed !== undefined) {
							if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
								child.slaveSurname = cloneSeed.slaveSurname;
							}
						}
					}
				} else if (genes.mother === -1) {
					if (genes.father <= 0) {
						child.slaveName = "Your son";
					} else {
						child.slaveName = `Your and ${genes.fatherName}'s son`;
					}
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveName = `${genes.motherName}'s and your son`;
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						child.slaveName = `${genes.motherName} and ${genes.fatherName}'s son`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						child.slaveName = `${genes.motherName}'s bastard son`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			} else {
				let childName = genes.name;
				if (childName.indexOf("ovum") === 0) {
					if (genes.clone) {
						if (genes.cloneID === -1) {
							child.slaveName = `Your clone`;
							child.slaveSurname = V.PC.slaveSurname;
						} else {
							child.slaveName = `${genes.clone}'s clone`;
							let cloneSeed = getSlave(genes.cloneID);
							if (cloneSeed !== undefined) {
								if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
									child.slaveSurname = cloneSeed.slaveSurname;
								}
							}
						}
					} else if (genes.mother === -1) {
						if (genes.father <= 0) {
							child.slaveName = "Your son";
						} else {
							child.slaveName = `Your and ${genes.fatherName}'s son`;
						}
					} else {
						if (genes.father === -1) {
							child.slaveName = `${genes.motherName}'s and your son`;
						} else if (genes.father > 0) {
							child.slaveName = `${genes.motherName} and ${genes.fatherName}'s son`;
						} else {
							child.slaveName = `${genes.motherName}'s bastard son`;
						}
					}
				} else {
					child.slaveName = genes.name;
				}
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed !== undefined) {
							if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
								child.slaveSurname = cloneSeed.slaveSurname;
							}
						}
					}
				} else if (genes.mother === -1) {
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			}
		}

		child.mother = genes.mother;
		child.father = genes.father;
		child.nationality = genes.nationality;
		child.race = genes.race;
		child.intelligence = genes.intelligence;
		if (mother.prematureBirth > 0) {
			if (child.intelligence >= -90) {
				child.intelligence -= jsRandom(0, 10);
			}
			child.premature = 1;
		}
		child.face = genes.face;
		child.underArmHStyle = genes.underArmHStyle;
		child.pubicHStyle = genes.pubicHStyle;
		child.markings = genes.markings;
		child.sexualFlaw = genes.sexualFlaw;
		child.behavioralFlaw = genes.behavioralFlaw;
		child.fetish = genes.fetish;
		child.geneticQuirks = clone(genes.geneticQuirks);
		if (child.geneticQuirks.albinism === 2) {
			child.albinismOverride = {
				skin: 0,
				eyeColor: "red",
				hColor: "white"
			};
			switch (child.race) {
				case "black":
				case "indo-aryan":
				case "malay":
				case "pacific islander":
				case "amerindian":
					child.albinismOverride.skin = "very fair";
					break;
				case "latina":
					child.albinismOverride.skin = "extremely fair";
					break;
				case "asian":
				case "middle eastern":
				case "semitic":
				case "southern european":
				case "white":
					child.albinismOverride.skin = "pure white";
					break;
				default:
					child.albinismOverride.skin = "pure white";
			}
		}
		child.origSkin = genes.skin;
		child.eye.origColor = genes.eyeColor;
		child.origHColor = genes.hColor;
		child.skin = getGeneticSkinColor(child);
		child.hColor = getGeneticHairColor(child);
		resetEyeColor(child, "both");
		child.pubicHColor = child.hColor;
		child.underArmHColor = child.hColor;
		child.eyebrowHColor = child.hColor;
		child.birthWeek = 0;
		child.actualAge = 0;
		if (genes.faceShape !== undefined) {
			child.faceShape = genes.faceShape;
		}
		if (mother.addict > 0) {
			child.addict = Math.trunc(mother.addict / 2);
		}
		child.weekAcquired = V.week;
		if (child.nationality === "Stateless") {
			if (V.arcologies[0].FSRomanRevivalist > 90) {
				child.nationality = "Roman Revivalist";
			} else if (V.arcologies[0].FSAztecRevivalist > 90) {
				child.nationality = "Aztec Revivalist";
			} else if (V.arcologies[0].FSEgyptianRevivalist > 90) {
				child.nationality = "Ancient Egyptian Revivalist";
			} else if (V.arcologies[0].FSEdoRevivalist > 90) {
				child.nationality = "Edo Revivalist";
			} else if (V.arcologies[0].FSArabianRevivalist > 90) {
				child.nationality = "Arabian Revivalist";
			} else if (V.arcologies[0].FSChineseRevivalist > 90) {
				child.nationality = "Ancient Chinese Revivalist";
			}
		}
	} else {
		V.activeSlaveOneTimeMinAge = V.targetAge;
		V.activeSlaveOneTimeMaxAge = V.targetAge;
		// eslint-disable-next-line camelcase
		V.one_time_age_overrides_pedo_mode = 1;
		V.ageAdjustOverride = 1;

		if (genes.gender === "XX") {
			child = GenerateNewSlave("XX");
			child.slaveSurname = genes.surname;
			if (!pregUpgrade) {
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveName = `Your clone`;
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						child.slaveName = `${genes.clone}'s clone`;
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
							child.slaveSurname = cloneSeed.slaveSurname;
						}
					}
				} else if (genes.mother === -1) {
					if (genes.father <= 0) {
						child.slaveName = `Your daughter`;
					} else {
						child.slaveName = `Yours and ${genes.fatherName}'s daughter`;
					}
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveName = `Yours and ${genes.motherName}'s daughter`;
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						child.slaveName = `${genes.motherName} and ${genes.fatherName}'s daughter`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						child.slaveName = `${genes.motherName}'s bastard daughter`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			} else {
				let childName = genes.name;
				if (childName.indexOf("ovum") === 0) {
					if (genes.clone) {
						if (genes.cloneID === -1) {
							child.slaveName = `Your clone`;
							child.slaveSurname = V.PC.slaveSurname;
						} else {
							child.slaveName = `${genes.clone}'s clone`;
							let cloneSeed = getSlave(genes.cloneID);
							if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
								child.slaveSurname = cloneSeed.slaveSurname;
							}
						}
					} else if (genes.mother === -1) {
						if (genes.father <= 0) {
							child.slaveName = `Your daughter`;
						} else {
							child.slaveName = `Yours and ${genes.fatherName}'s daughter`;
						}
					} else {
						if (genes.father === -1) {
							child.slaveName = `Yours and ${genes.motherName}'s daughter`;
						} else if (genes.father > 0) {
							child.slaveName = `${genes.motherName} and ${genes.fatherName}'s daughter`;
						} else {
							child.slaveName = `${genes.motherName}'s bastard daughter`;
						}
					}
				} else {
					child.slaveName = genes.name;
				}
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
							child.slaveSurname = cloneSeed.slaveSurname;
						}
					}
				} else if (genes.mother === -1) {
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			}
		} else {
			child = GenerateNewSlave("XY");
			child.slaveSurname = genes.surname;
			if (!pregUpgrade) {
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveName = `Your clone`;
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						child.slaveName = `${genes.clone}'s clone`;
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
							child.slaveSurname = cloneSeed.slaveSurname;
						}
					}
				} else if (genes.mother === -1) {
					if (genes.father <= 0) {
						child.slaveName = "Your son";
					} else {
						child.slaveName = `Your and ${genes.fatherName}'s son`;
					}
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveName = `${genes.motherName} and your son`;
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						child.slaveName = `${genes.motherName} and ${genes.fatherName}'s son`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						child.slaveName = `${genes.motherName}'s bastard son`;
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			} else {
				let childName = genes.name;
				if (childName.indexOf("ovum") === 0) {
					if (genes.clone) {
						if (genes.cloneID === -1) {
							child.slaveName = `Your clone`;
							child.slaveSurname = V.PC.slaveSurname;
						} else {
							child.slaveName = `${genes.clone}'s clone`;
							let cloneSeed = getSlave(genes.cloneID);
							if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
								child.slaveSurname = cloneSeed.slaveSurname;
							}
						}
					} else if (genes.mother === -1) {
						if (genes.father <= 0) {
							child.slaveName = "Your son";
						} else {
							child.slaveName = `Your and ${genes.fatherName}'s son`;
						}
					} else {
						if (genes.father === -1) {
							child.slaveName = `${genes.motherName} and your son`;
						} else if (genes.father > 0) {
							child.slaveName = `${genes.motherName} and ${genes.fatherName}'s son`;
						} else {
							child.slaveName = `${genes.motherName}'s bastard son`;
						}
					}
				} else {
					child.slaveName = genes.name;
				}
				if (genes.clone) {
					if (genes.cloneID === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else {
						let cloneSeed = getSlave(genes.cloneID);
						if (cloneSeed.slaveSurname !== 0 && cloneSeed.slaveSurname !== "") {
							child.slaveSurname = cloneSeed.slaveSurname;
						}
					}
				} else if (genes.mother === -1) {
					child.slaveSurname = V.PC.slaveSurname;
				} else {
					if (genes.father === -1) {
						child.slaveSurname = V.PC.slaveSurname;
					} else if (genes.father > 0) {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						} else {
							let currentFather = getSlave(genes.father);
							if (currentFather !== undefined) {
								if (currentFather.slaveSurname !== 0 && currentFather.slaveSurname !== "") {
									child.slaveSurname = currentFather.slaveSurname;
								}
							}
						}
					} else {
						let currentMother = getSlave(genes.mother);
						if (currentMother !== undefined) {
							if (currentMother.slaveSurname !== 0 && currentMother.slaveSurname !== "") {
								child.slaveSurname = currentMother.slaveSurname;
							}
						}
					}
				}
			}
		}

		child.actualAge = 0;
		if (genes.clone !== undefined) {
			child.clone = genes.clone;
			child.cloneID = genes.cloneID;
		}
		child.mother = genes.mother;
		child.father = genes.father;
		child.nationality = genes.nationality;
		child.race = genes.race;
		child.origRace = child.race;
		child.geneticQuirks = clone(genes.geneticQuirks);
		if (child.geneticQuirks.albinism === 2) {
			child.albinismOverride = {
				skin: 0,
				eyeColor: "red",
				hColor: "white"
			};
			switch (child.race) {
				case "black":
				case "indo-aryan":
				case "malay":
				case "pacific islander":
				case "amerindian":
					child.albinismOverride.skin = "very fair";
					break;
				case "latina":
					child.albinismOverride.skin = "extremely fair";
					break;
				case "asian":
				case "middle eastern":
				case "semitic":
				case "southern european":
				case "white":
					child.albinismOverride.skin = "pure white";
					break;
				default:
					child.albinismOverride.skin = "pure white";
			}
		}
		child.origSkin = genes.skin;
		child.eye.origColor = genes.eyeColor;
		child.origHColor = genes.hColor;
		child.skin = getGeneticSkinColor(child);
		child.hColor = getGeneticHairColor(child);
		resetEyeColor(child, "both");
		child.pubicHColor = child.hColor;
		child.underArmHColor = child.hColor;
		child.eyebrowHColor = child.hColor;
		child.intelligence = genes.intelligence;
		if (mother.prematureBirth > 0) {
			if (child.intelligence >= -90) {
				child.intelligence -= jsRandom(0, 10);
			}
			child.premature = 1;
		}
		if (child.geneticQuirks.dwarfism === 2 && child.geneticQuirks.gigantism !== 2) {
			child.height = Height.random(child, {limitMult: [-4, -1], spread: 0.15});
		} else if (child.geneticQuirks.gigantism === 2 && child.geneticQuirks.dwarfism !== 2) {
			child.height = Height.random(child, {limitMult: [3, 10], spread: 0.15});
		}
		child.face = genes.face;
		child.underArmHStyle = genes.underArmHStyle;
		child.pubicHStyle = genes.pubicHStyle;
		child.markings = genes.markings;
		child.sexualFlaw = genes.sexualFlaw;
		child.behavioralFlaw = genes.behavioralFlaw;
		child.fetish = genes.fetish;
		child.birthWeek = 0;
		child.energy = 0;
		child.anus = 0;
		if (child.vagina > 0) { child.vagina = 0; }
		if (child.fetish !== "none") { child.fetishStrength = 20; }
		if (child.dick > 0) { child.foreskin = 1; child.balls = 1; child.scrotum = 1; }
		if (genes.faceShape !== undefined) { child.faceShape = genes.faceShape; }
		if (mother.addict > 0) { child.addict = Math.trunc(mother.addict / 2); }
		child.career = "a slave since birth";
		child.birthName = child.slaveName;
		child.birthSurname = child.slaveSurname;
		child.devotion = 0;
		child.trust = 0;
		child.weekAcquired = V.week;
		if (child.nationality === "Stateless") {
			if (V.arcologies[0].FSRomanRevivalist > 90) {
				child.nationality = "Roman Revivalist";
			} else if (V.arcologies[0].FSAztecRevivalist > 90) {
				child.nationality = "Aztec Revivalist";
			} else if (V.arcologies[0].FSEgyptianRevivalist > 90) {
				child.nationality = "Ancient Egyptian Revivalist";
			} else if (V.arcologies[0].FSEdoRevivalist > 90) {
				child.nationality = "Edo Revivalist";
			} else if (V.arcologies[0].FSArabianRevivalist > 90) {
				child.nationality = "Arabian Revivalist";
			} else if (V.arcologies[0].FSChineseRevivalist > 90) {
				child.nationality = "Ancient Chinese Revivalist";
			}
		}

		child.weight = -100;
		child.muscles = -100;
		child.boobs = 0;
		child.butt = 0;
		child.chem = 990;
		child.areolaePiercing = 0;
		child.corsetPiercing = 0;
		child.boobsImplant = 0;
		child.boobsImplantType = "none";
		child.nipplesPiercing = 0;
		child.areolaePiercing = 0;
		child.lactation = 0;
		child.hipsImplant = 0;
		child.buttImplant = 0;
		child.buttImplantType = "none";
		child.lipsImplant = 0;
		child.lipsPiercing = 0;
		child.tonguePiercing = 0;
		child.vaginaPiercing = 0;
		child.preg = 0;
		child.pregType = 0;
		child.pregKnown = 0;
		child.belly = 0;
		child.bellyPreg = 0;
		child.bellyFluid = 0;
		child.bellyImplant = -1;
		child.cervixImplant = 0;
		child.clitPiercing = 0;
		child.dickPiercing = 0;
		child.makeup = 0;
		child.nails = 0;
		child.earPiercing = 0;
		child.nosePiercing = 0;
		child.eyebrowPiercing = 0;
		child.stampTat = 0;
		child.bellyTat = 0;
		child.anusPiercing = 0;
		child.anusTat = 0;
		child.shouldersTat = 0;
		child.armsTat = 0;
		child.legsTat = 0;
		child.backTat = 0;
		child.skill.combat = 0;
		child.skill.whoring = 0;
		child.skill.entertainment = 0;
		child.skill.oral = 0;
		child.skill.anal = 0;
		child.skill.vaginal = 0;
		child.accent = 4;
		child.canRecruit = 0;
		child.hStyle = "long";
		child.hLength = 300;
		if (V.incubatorImprintSetting === "terror") {
			child.origin = "$He was conditioned from birth into mindless terror in an aging tank.";
			child.tankBaby = 2;
		} else {
			child.origin = "$He was conditioned from birth into trusting obedience in an aging tank.";
			child.tankBaby = 1;
		}
		child.intelligenceImplant = 0;
		child.navelPiercing = 0;
	}

	generatePronouns(child);

	return child;
};
