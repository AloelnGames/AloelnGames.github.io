App.Update.Slave = function(slave) {

	slave.geneticQuirks = Object.assign({macromastia: 0, gigantomastia: 0, fertility: 0, hyperFertility: 0, superfetation: 0, gigantism: 0, dwarfism: 0, pFace: 0, uFace: 0, albinism: 0, heterochromia: 0, rearLipedema: 0, wellHung: 0, wGain: 0, wLoss: 0, mGain: 0, mLoss: 0, androgyny: 0, girlsOnly: 0}, slave.geneticQuirks);

	WombInit(slave);

	if (slave.earShape === undefined) { slave.earShape = "normal"; }
	if (slave.earT === undefined) { slave.earT = "none"; }
	if (slave.earTColor === undefined) { slave.earTColor = "hairless"; }
	if (slave.horn === undefined) { slave.horn = "none"; }
	if (slave.hornColor === undefined) { slave.hornColor = "none"; }
	if (slave.tail === undefined) { slave.tail = "none"; }
	if (slave.tailShape === undefined) { slave.tailShape = "none"; }
	if (slave.tailColor === undefined) { slave.tailColor = "none"; }
	if (slave.prostateImplant !== undefined) {
		if (slave.prostateImplant === 1) {
			slave.prostate = 3;
		}
		delete slave.prostateImplant;
	}
	if (slave.daughters === undefined) { slave.daughters = 0; }
	if (slave.sisters === undefined) { slave.sisters = 0; }
	if (slave.pregGenerator !== undefined) { delete slave.pregGenerator; }
	if (slave.pregAdaptation === undefined) {
		if (slave.physicalAge <= 3) {
			slave.pregAdaptation = 10;
		} else if (slave.physicalAge <= 12 || slave.genes === "XY") {
			slave.pregAdaptation = 20;
		} else if (slave.physicalAge <= 17) {
			slave.pregAdaptation = 30;
		} else {
			slave.pregAdaptation = 50;
		}
	}
	if (slave.pregKnown === undefined) {
		if (slave.preg > 0) {
			slave.pregKnown = 1;
		} else {
			slave.pregKnown = 0;
		}
	}
	if (slave.pregWeek === undefined) {
		if (slave.preg > 0) {
			slave.pregWeek = slave.preg;
		} else {
			slave.pregWeek = 0;
		}
	}
	if (slave.pubertyXX === undefined) {
		if (slave.physicalAge >= slave.pubertyAgeXX) {
			slave.pubertyXX = 1;
			slave.fertKnown = 1;
		} else {
			slave.pubertyXX = 0;
			slave.fertKnown = 0;
		}
	}
	if (slave.pubertyXY === undefined) {
		if (slave.physicalAge >= slave.pubertyAgeXY) {
			slave.pubertyXY = 1;
		} else {
			slave.pubertyXY = 0;
		}
	}
	if (slave.genetics === undefined) { slave.genetics = {}; }
	if (slave.geneMods === undefined) { geneMods = {NCS: 0, rapidCellGrowth: 0}; }
	if (slave.inducedNCS !== undefined) {
		slave.geneMods.NCS = slave.inducedNCS;
		delete slave.inducedNCS;
	}
	if (slave.PCSlutContacts !== undefined) { delete slave.PCSlutContacts; }
	if (slave.wombImplant === undefined) { slave.wombImplant = "none"; }
	if (slave.superfetation !== undefined) { delete slave.superfetation; }
	if (slave.lactationDuration === undefined) {
		if (slave.lactation === 0) {
			slave.lactationDuration = 0;
		} else {
			slave.lactationDuration = 2;
		}
	}
	if (slave.induceLactation === undefined) { slave.induceLactation = 0; }
	if (slave.weightDirection === undefined) { slave.weightDirection = 0; }
	if (V.releaseID < 1036) {
		for (let pmw = 0; pmw < slave.womb.length; pmw++) {
			if (slave.womb[pmw].genetics.mother !== slave.womb[pmw].motherID || slave.womb[pmw].genetics.father !== slave.womb[pmw].fatherID) {
				slave.womb[pmw].genetics = generateGenetics(slave, slave.womb[pmw].fatherID, pmw);
			}
		}
	}
	if (slave.clone === undefined) { slave.clone = 0; }
	if (slave.abortionTat === undefined) { slave.abortionTat = -1; }
	if (slave.birthsTat === undefined) { slave.birthsTat = -1; }
	if (slave.reservedChildren !== undefined) { delete slave.reservedChildren; }
	if (slave.origin !== undefined && slave.origin !== 0) { slave.origin = pronounReplacer(slave.origin); }
	if (slave.custom !== undefined) {
		if (slave.custom.desc !== undefined && slave.custom.desc !== "") {
			slave.custom.desc = pronounReplacer(slave.custom.desc);
		}
		if (slave.custom.tattoo !== undefined && slave.custom.tattoo !== "") {
			slave.custom.tattoo = pronounReplacer(slave.custom.tattoo);
		}
	}
	if (slave.prestigeDesc !== undefined && slave.prestigeDesc !== 0) { slave.prestigeDesc = pronounReplacer(slave.prestigeDesc); }
	if (slave.pornPrestigeDesc !== undefined && slave.pornPrestigeDesc !== 0) { // This must be defined first, hence the previous line.
		if (V.releaseID < 1050 && slave.prestigeDesc !== undefined && slave.prestigeDesc !== 0) { /* BC absolutely FUCKED this */
			const genre = App.Porn.getGenreByFameName(slave.pornFameType);
			if (jsDef(genre)) {
				if (slave.pornPrestige === 1) {
					slave.pornPrestigeDesc = `$He has a following in slave pornography. ${genre.prestigeDesc1}.`;
				} else if (slave.pornPrestige === 2) {
					slave.pornPrestigeDesc = `$He is well known from $his career in slave pornography. ${genre.prestigeDesc2}.`;
				} else if (slave.pornPrestige === 3) {
					slave.pornPrestigeDesc = `$He is world famous for $his career in slave pornography. ${genre.prestigeDesc3}.`;
				} else {
					slave.pornPrestigeDesc = 0;
				}
			} else {
				slave.pornPrestigeDesc = 0;
			}
		} else {
			slave.pornPrestigeDesc = pronounReplacer(slave.pornPrestigeDesc);
		}
	}

	if (slave.amp !== undefined) {
		if (slave.amp === 1) {
			slave.arm = {left: null, right: null};
			slave.leg = {left: null, right: null};
		} else {
			const newID = ((slave.amp * -1) + 1);
			slave.arm = {
				left: new App.Entity.LimbState(),
				right: new App.Entity.LimbState()
			};
			slave.leg = {
				left: new App.Entity.LimbState(),
				right: new App.Entity.LimbState()
			};
			slave.arm.left.type = newID;
			slave.arm.right.type = newID;
			slave.leg.left.type = newID;
			slave.leg.right.type = newID;
			/* no need to check partial amputation, since it is not possible to create prior to this */
		}
		delete slave.amp;
		delete slave.missingLegs;
		delete slave.missingArms;
	} else if (slave.arm === undefined) {
		slave.arm = {
			left: new App.Entity.LimbState(),
			right: new App.Entity.LimbState()
		};
		slave.leg = {
			left: new App.Entity.LimbState(),
			right: new App.Entity.LimbState()
		};
	}

	if (hasAnyProstheticLimbs(slave)) {
		slave.PLimb = 1;
		if (getLimbCount(slave, 6) > 0) {
			slave.PLimb = 2;
		}
	}

	if (slave.eyeball !== undefined) { delete slave.eyeball; }

	if (slave.auricle !== undefined) { delete slave.auricle; }

	if (slave.readyProsthetics === undefined) { slave.readyProsthetics = []; }
	if (slave.readyLimbs !== undefined) {
		for (let k = 0; k < slave.readyLimbs.length; k++) {
			switch (slave.readyLimbs[k].type) {
				case -1:
					addProsthetic(slave, "basicL");
					break;
				case -2:
					addProsthetic(slave, "sexL");
					break;
				case -3:
					addProsthetic(slave, "beautyL");
					break;
				case -4:
					addProsthetic(slave, "combatL");
					break;
				case -5:
					addProsthetic(slave, "cyberneticL");
					break;
			}
		}
	}

	if (V.releaseID < 1052) {
		const prosthetics = slave.readyProsthetics;
		slave.readyProsthetics = [];
		for (const p of prosthetics) {
			addProsthetic(slave, p.id);
		}
	}

	if (V.releaseID < 1058) {
		if (slave.albinism === 2) {
			let temp;
			temp = slave.origSkin;
			slave.origSkin = slave.albinismOverride.skin;
			slave.albinismOverride.skin = temp;
			temp = slave.origEye;
			slave.origEye = slave.albinismOverride.eyeColor;
			slave.albinismOverride.eyeColor = temp;
			temp = slave.origHColor;
			slave.origHColor = slave.albinismOverride.hColor;
			slave.albinismOverride.hColor = temp;
		}
	}

	if (V.releaseID < 1059) {
		slave.eye = new App.Entity.EyeState();
		setGeneticEyeColor(slave, slave.origEye);
		if (slave.eyes === -4) {
			eyeSurgery(slave, "both", "remove");
		} else {
			if (slave.eyesImplant === 1) {
				eyeSurgery(slave, "both", "cybernetic");
			}
			if (slave.eyes === -3) {
				eyeSurgery(slave, "both", "glass");
			} else if (slave.eyes === -2) {
				eyeSurgery(slave, "both", "blind");
			} else if (slave.eyes === -1) {
				eyeSurgery(slave, "both", "blur");
			}
			setEyeColorFull(slave, slave.eyeColor, slave.pupil, slave.sclerae, "both");
			if (typeof slave.geneticQuirks.heterochromia === "string") {
				setEyeColor(slave.geneticQuirks.heterochromia, "left");
			}
		}
		delete slave.eyes;
		delete slave.eyesImplant;
		delete slave.eyeColor;
		delete slave.origEye;
		delete slave.pupil;
		delete slave.sclerae;
	}

	if (slave.eyes !== undefined) {delete slave.eyes;}
	if (slave.eyeColor !== undefined) {delete slave.eyeColor;}
	if (slave.eyesImplant !== undefined) {delete slave.eyesImplant;}
	if (slave.origEye !== undefined) {delete slave.origEye;}
	if (slave.pupil !== undefined) {delete slave.pupil;}
	if (slave.sclerae !== undefined) {delete slave.sclerae;}

	if (slave.origin === "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows only of the terror that awaits $him should $he not obey $his master.") {
		slave.tankBaby = 2;
	} else if (slave.origin === "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows nothing of the world outside of what the tank imprinted $him with.") {
		slave.tankBaby = 1;
	} else if (slave.tankBaby === undefined) {
		slave.tankBaby = 0;
	}

	if (slave.origin === "$He sold $himself into slavery to feed $himself and $his growing brood.") {
		if (slave.pregAdaptation < 750) {
			slave.pregAdaptation = 750;
		}
	}

	let backwardsCompatibility;
	if (slave.rivalry !== 0) {
		backwardsCompatibility = V.slaveIndices[slave.rivalryTarget];
		if (backwardsCompatibility === undefined) {
			slave.rivalry = 0;
			slave.rivalryTarget = 0;
		}
	}
	if (slave.relationship > 0) {
		backwardsCompatibility = V.slaveIndices[slave.relationshipTarget];
		if (backwardsCompatibility === undefined) {
			slave.relationship = 0;
			slave.relationshipTarget = 0;
		}
	}
	if (V.familyTesting === 0 && slave.relation !== 0) {
		backwardsCompatibility = V.slaveIndices[slave.relationTarget];
		if (backwardsCompatibility === undefined) {
			slave.relation = 0;
			slave.relationTarget = 0;
		}
	}

	if (slave.race === "surgically altered to look amerindian") {
		slave.race = "amerindian";
	} else if (slave.race === "surgically altered to look asian") {
		slave.race = "asian";
	} else if (slave.race === "surgically altered to look black") {
		slave.race = "black";
	} else if (slave.race === "surgically altered to look indo-aryan") {
		slave.race = "indo-aryan";
	} else if (slave.race === "surgically altered to look latina") {
		slave.race = "latina";
	} else if (slave.race === "surgically altered to look malay") {
		slave.race = "malay";
	} else if (slave.race === "surgically altered to look middle eastern") {
		slave.race = "middle eastern";
	} else if (slave.race === "surgically altered to look mixed race" || slave.race === "surgically altered to look mixed") {
		slave.race = "mixed race";
	} else if (slave.race === "surgically altered to look pacific islander" || slave.race === "surgically altered to look like a pacific islander") {
		slave.race = "pacific islander";
	} else if (slave.race === "surgically altered to look southern european" || slave.race === "southern European") {
		slave.race = "southern european";
	} else if (slave.race === "surgically altered to look semitic") {
		slave.race = "semitic";
	} else if (slave.race === "surgically altered to look white") {
		slave.race = "white";
	}

	/* eslint-disable camelcase */
	if (slave.override_Race === undefined) { slave.override_Race = 0; }
	if (slave.override_Skin === undefined) { slave.override_Skin = 0; }
	if (slave.override_Eye_Color === undefined) { slave.override_Eye_Color = 0; }
	if (slave.override_H_Color === undefined) { slave.override_H_Color = 0; }
	if (slave.override_Pubic_H_Color === undefined) { slave.override_Pubic_H_Color = 0; }
	if (slave.override_Arm_H_Color === undefined) { slave.override_Arm_H_Color = 0; }
	/* eslint-enable camelcase */

	switch (slave.skin) {
		case "red dyed":
			slave.skin = "dyed red";
			break;
		case "green dyed":
			slave.skin = "dyed green";
			break;
		case "blue dyed":
			slave.skin = "dyed blue";
			break;
		case "tanned":
			slave.skin = "tan";
			break;
		case "lightened":
			slave.skin = "light";
			break;
		case "bronzed":
			slave.skin = "bronze";
			break;
		case "darkened":
			slave.skin = "dark";
			break;
	}

	switch (slave.origSkin) {
		case "blue dyed":
		case "dyed blue":
		case "dyed green":
		case "dyed red":
		case "green dyed":
		case "red dyed":
			slave.origSkin = randomRaceSkin(slave.origRace);
			break;
		case "tanned":
			slave.origSkin = "tan";
			break;
		case "lightened":
			slave.origSkin = "light";
			break;
		case "bronzed":
			slave.origSkin = "bronze";
			break;
		case "darkened":
			slave.origSkin = "dark";
			break;
	}

	if (slave.markings === "heavily") {
		slave.markings = "heavily freckled";
	} else if (slave.markings === "beauty") {
		slave.markings = "beauty mark";
	}

	if (slave.genes === undefined) {
		if (slave.ovaries === 1) {
			slave.genes = "XX";
		} else {
			slave.genes = "XY";
		}
	}

	if (V.releaseID < 1000) {
		if (slave.face === -3) {
			slave.face = -100;
		} else if (slave.face === -2) {
			slave.face = -50;
		} else if (slave.face === -1) {
			slave.face = -20;
		} else if (slave.face === 0) {
			slave.face = 0;
		} else if (slave.face === 1) {
			slave.face = 20;
		} else if (slave.face === 2) {
			slave.face = 50;
		} else {
			slave.face = 100;
		}
	}
	if (V.releaseID < 1031) {
		if (slave.intelligence === -3) {
			slave.intelligence = -100;
		} else if (slave.intelligence === -2) {
			slave.intelligence = -60;
		} else if (slave.intelligence === -1) {
			slave.intelligence = -30;
		} else if (slave.intelligence === 0) {
			slave.intelligence = 0;
		} else if (slave.intelligence === 1) {
			slave.intelligence = 30;
		} else if (slave.intelligence === 2) {
			slave.intelligence = 60;
		} else {
			slave.intelligence = 99;
		}
		if (slave.intelligenceImplant === 1) {
			slave.intelligenceImplant = 30;
		}
	}

	if (slave.teeth === 0) {
		slave.teeth = "normal";
	} else if (slave.teeth === "straightening") {
		slave.teeth = "straightening braces";
	} else if (slave.teeth === "cosmetic") {
		slave.teeth = "cosmetic braces";
	}

	if (slave.areolaeShape === undefined) {
		if (slave.areolae === 4) {
			slave.areolaeShape = "heart";
			slave.areolae = 3;
		} else if (slave.areolae === 5) {
			slave.areolaeShape = "star";
			slave.areolae = 3;
		} else {
			slave.areolaeShape = "circle";
		}
	}

	if (V.releaseID < 1061) {
		if (slave.boobsImplantType == 1) {
			slave.boobsImplantType = "string";
		} else if (slave.boobsImplant >= 10000) {
			slave.boobsImplantType = "hyper fillable";
		} else if (slave.boobsImplant >= 2000) {
			slave.boobsImplantType = "advanced fillable";
		} else if (slave.boobsImplant >= 800) {
			slave.boobsImplantType = "fillable";
		} else if (slave.boobsImplant > 0) {
			slave.boobsImplantType = "normal";
		} else {
			slave.boobsImplantType = "none";
		}
		if (slave.buttImplantType == 1) {
			slave.buttImplantType = "string";
		} else if (slave.buttImplant > 7) {
			slave.buttImplantType = "hyper fillable";
		} else if (slave.buttImplant >= 5) {
			slave.buttImplantType = "advanced fillable";
		} else if (slave.buttImplant >= 3) {
			slave.buttImplantType = "fillable";
		} else if (slave.buttImplant > 0) {
			slave.buttImplantType = "normal";
		} else {
			slave.buttImplantType = "none";
		}
	}

	if (V.releaseID < 1059) {
		if (slave.eyeColor === undefined) {
			slave.eyeColor = slave.eyes;
			slave.eyes = 1;
			if (slave.eyeColor === undefined) {
				slave.eyeColor = "brown";
			}
		}

		if (slave.pupil === undefined) {
			if (slave.eyeColor === "catlike") {
				slave.pupil = "catlike";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "serpent-like") {
				slave.pupil = "serpent-like";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "devilish") {
				slave.pupil = "devilish";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "demonic") {
				slave.pupil = "demonic";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "hypnotic") {
				slave.pupil = "hypnotic";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "heart-shaped") {
				slave.pupil = "heart-shaped";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "wide-eyed") {
				slave.pupil = "wide-eyed";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "almond-shaped") {
				slave.pupil = "almond-shaped";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "bright") {
				slave.pupil = "bright";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "teary") {
				slave.pupil = "teary";
				slave.eyeColor = "brown";
			} else if (slave.eyeColor === "vacant") {
				slave.pupil = "vacant";
				slave.eyeColor = "brown";
			} else {
				slave.pupil = "circular";
			}
		}
	}

	if (slave.pitkills !== undefined) { delete slave.pitkills; }
	if (slave.penetrationCount !== undefined) { delete slave.penetrationCount; }
	if (slave.oralTotal !== undefined) { delete slave.oralTotal; }
	if (slave.vaginaCount !== undefined) { delete slave.vaginaCount; }

	if (((V.ver.startsWith("0.6") && !V.ver.startsWith("10.6")) || (V.ver.startsWith("0.7")) || (V.ver.startsWith("0.8"))) && (!V.ver.startsWith("0.8.9")) && (!V.ver.startsWith("0.8.10")) && (!V.ver.startsWith("0.8.11")) && (!V.ver.startsWith("0.8.12"))) {
		if (slave.attrXX === 2) {
			slave.attrXX = 90;
		} else if (slave.attrXX === 1) {
			slave.attrXX = 70;
		} else if (slave.attrXX === 0) {
			slave.attrXX = 50;
		} else if (slave.attrXX === -1) {
			slave.attrXX = 30;
		} else {
			slave.attrXX = 10;
		}
		if (slave.attrXY === 2) {
			slave.attrXY = 90;
		} else if (slave.attrXY === 1) {
			slave.attrXY = 70;
		} else if (slave.attrXY === 0) {
			slave.attrXY = 50;
		} else if (slave.attrXY === -1) {
			slave.attrXY = 30;
		} else {
			slave.attrXY = 10;
		}
	}

	if ((V.ver.startsWith("0.6") && !V.ver.startsWith("10.6")) || (V.ver.startsWith("0.7")) || (V.ver.startsWith("0.8"))) {
		if (slave.health <= -9) {
			slave.health = -90;
		} else if (slave.health <= -7) {
			slave.health = jsRandom(-89, -70);
		} else if (slave.health <= -5) {
			slave.health = jsRandom(-69, -50);
		} else if (slave.health <= -3) {
			slave.health = jsRandom(-49, -30);
		} else if (slave.health <= -1) {
			slave.health = jsRandom(-29, -10);
		} else if (slave.health <= 1) {
			slave.health = jsRandom(-9, 10);
		} else if (slave.health <= 3) {
			slave.health = jsRandom(11, 30);
		} else if (slave.health <= 5) {
			slave.health = jsRandom(31, 50);
		} else if (slave.health <= 7) {
			slave.health = jsRandom(51, 70);
		} else if (slave.health <= 8) {
			slave.health = jsRandom(71, 80);
		} else if (slave.health <= 9) {
			slave.health = jsRandom(81, 90);
		} else if (slave.health <= 10) {
			slave.health = jsRandom(91, 100);
		} else if (slave.health <= 15) {
			slave.health = jsRandom(101, 150);
		} else if (slave.health <= 20) {
			slave.health = jsRandom(151, 200);
		} else if (slave.health >= 50) {
			slave.health = 500;
		} else if (slave.health > 20) {
			slave.health = 205;
		}

		slave.devotion = (slave.devotion * 5);
		slave.oldDevotion = (slave.oldDevotion * 5);
		slave.trust = (slave.trust * 5);
		slave.oldTrust = (slave.oldTrust * 5);

		if (slave.fetishStrength === 0) {
			slave.fetishStrength = jsRandom(0, 60);
		} else if (slave.fetishStrength === 1) {
			slave.fetishStrength = jsRandom(61, 80);
		} else if (slave.fetishStrength === 2) {
			slave.fetishStrength = jsRandom(96, 100);
		}

		if (slave.weight === -3) {
			slave.weight = jsRandom(-110, -96);
		} else if (slave.weight === -2) {
			slave.weight = jsRandom(-95, -31);
		} else if (slave.weight === -1) {
			slave.weight = jsRandom(-30, -11);
		} else if (slave.weight === 0) {
			slave.weight = jsRandom(-11, 10);
		} else if (slave.weight === 1) {
			slave.weight = jsRandom(11, 30);
		} else if (slave.weight === 2) {
			slave.weight = jsRandom(31, 95);
		} else if (slave.weight === 3) {
			slave.weight = jsRandom(96, 110);
		}

		if (slave.lips !== 0) {
			if (slave.lips === 3) {
				slave.lips = 85;
			} else if (slave.lips === 2) {
				slave.lips = 55;
			} else if (slave.lips === 1) {
				slave.lips = 35;
			}
		}
	}

	if (((V.ver.startsWith("0.6") && !V.ver.startsWith("10.6")) || (V.ver.startsWith("0.7")) || (V.ver.startsWith("0.8")) || (V.ver.startsWith("0.9"))) && (!V.ver.startsWith("0.9.5")) && (!V.ver.startsWith("0.9.6")) && (!V.ver.startsWith("0.9.7")) && (!V.ver.startsWith("0.9.8")) && (!V.ver.startsWith("0.9.9")) && (!V.ver.startsWith("0.9.10"))) {
		if (slave.skill === undefined) {
			if (slave.oralSkill > 0) {
				if (slave.oralSkill === 3) {
					slave.oralSkill = 100;
				} else if (slave.oralSkill === 2) {
					slave.oralSkill = 65;
				} else {
					slave.oralSkill = 35;
				}
			}
			if (slave.vaginalSkill > 0) {
				if (slave.vaginalSkill === 3) {
					slave.vaginalSkill = 100;
				} else if (slave.vaginalSkill === 2) {
					slave.vaginalSkill = 65;
				} else {
					slave.vaginalSkill = 35;
				}
			}
			if (slave.analSkill > 0) {
				if (slave.analSkill === 3) {
					slave.analSkill = 100;
				} else if (slave.analSkill === 2) {
					slave.analSkill = 65;
				} else {
					slave.analSkill = 35;
				}
			}
			if (slave.whoreSkill > 0) {
				if (slave.whoreSkill === 3) {
					slave.whoreSkill = 100;
				} else if (slave.whoreSkill === 2) {
					slave.whoreSkill = 65;
				} else {
					slave.whoreSkill = 35;
				}
			}
			if (slave.entertainSkill > 0) {
				if (slave.entertainSkill === 3) {
					slave.entertainSkill = 100;
				} else if (slave.entertainSkill === 2) {
					slave.entertainSkill = 65;
				} else {
					slave.entertainSkill = 35;
				}
			}
		}

		if (V.ver !== "0.9.4") {
			slave.aphrodisiacs = 0;
			if (slave.drugs === "curatives") {
				slave.curatives = 2;
				slave.drugs = "no drugs";
			} else if (slave.drugs === "preventatives") {
				slave.curatives = 1;
				slave.drugs = "no drugs";
			} else if (slave.drugs === "aphrodisiacs") {
				slave.aphrodisiacs = 1;
				slave.drugs = "no drugs";
			} else if (slave.drugs === "extreme aphrodisiacs") {
				slave.aphrodisiacs = 2;
				slave.drugs = "no drugs";
			}
			if (slave.muscles >= 3) {
				slave.muscles = 100;
			} else if (slave.muscles >= 2) {
				slave.muscles = 50;
			} else if (slave.muscles >= 1) {
				slave.muscles = 20;
			} else {
				slave.muscles = 0;
			}
		}
	}

	switch (slave.boobsTat) {
		case "floral designs":
			slave.boobsTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.boobsTat = "rude words";
			break;
		case "lewd scenes":
			slave.boobsTat = "scenes";
			break;
		case "degrading language":
			slave.boobsTat = "degradation";
			break;
		case "slutty advertisements":
			slave.boobsTat = "advertisements";
			break;
	}

	switch (slave.buttTat) {
		case "floral designs":
			slave.buttTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.buttTat = "rude words";
			break;
		case "lewd scenes":
			slave.buttTat = "scenes";
			break;
		case "degrading language":
			slave.buttTat = "degradation";
			break;
		case "slutty advertisements":
			slave.buttTat = "advertisements";
			break;
	}

	switch (slave.vaginaTat) {
		case "floral designs":
			slave.vaginaTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.vaginaTat = "rude words";
			break;
		case "lewd scenes":
			slave.vaginaTat = "scenes";
			break;
		case "degrading language":
			slave.vaginaTat = "degradation";
			break;
		case "slutty advertisements":
			slave.vaginaTat = "advertisements";
			break;
	}

	switch (slave.dickTat) {
		case "floral designs":
			slave.dickTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.dickTat = "rude words";
			break;
		case "lewd scenes":
			slave.dickTat = "scenes";
			break;
		case "degrading language":
			slave.dickTat = "degradation";
			break;
		case "slutty advertisements":
			slave.dickTat = "advertisements";
			break;
	}

	switch (slave.anusTat) {
		case "floral designs":
			slave.anusTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.anusTat = "rude words";
			break;
		case "lewd scenes":
			slave.anusTat = "scenes";
			break;
		case "degrading language":
			slave.anusTat = "degradation";
			break;
		case "slutty advertisements":
			slave.anusTat = "advertisements";
			break;
	}

	switch (slave.backTat) {
		case "floral designs":
			slave.backTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.backTat = "rude words";
			break;
		case "lewd scenes":
			slave.backTat = "scenes";
			break;
		case "degrading language":
			slave.backTat = "degradation";
			break;
		case "slutty advertisements":
			slave.backTat = "advertisements";
			break;
	}

	switch (slave.shouldersTat) {
		case "floral designs":
			slave.shouldersTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.shouldersTat = "rude words";
			break;
		case "lewd scenes":
			slave.shouldersTat = "scenes";
			break;
		case "degrading language":
			slave.shouldersTat = "degradation";
			break;
		case "slutty advertisements":
			slave.shouldersTat = "advertisements";
			break;
	}

	switch (slave.armsTat) {
		case "floral designs":
			slave.armsTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.armsTat = "rude words";
			break;
		case "lewd scenes":
			slave.armsTat = "scenes";
			break;
		case "degrading language":
			slave.armsTat = "degradation";
			break;
		case "slutty advertisements":
			slave.armsTat = "advertisements";
			break;
	}

	switch (slave.legsTat) {
		case "floral designs":
			slave.legsTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.legsTat = "rude words";
			break;
		case "lewd scenes":
			slave.legsTat = "scenes";
			break;
		case "degrading language":
			slave.legsTat = "degradation";
			break;
		case "slutty advertisements":
			slave.legsTat = "advertisements";
			break;
	}

	switch (slave.stampTat) {
		case "floral designs":
			slave.stampTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.stampTat = "rude words";
			break;
		case "lewd scenes":
			slave.stampTat = "scenes";
			break;
		case "degrading language":
			slave.stampTat = "degradation";
			break;
		case "slutty advertisements":
			slave.stampTat = "advertisements";
			break;
	}

	switch (slave.lipsTat) {
		case "floral designs":
			slave.lipsTat = "flowers";
			break;
		case "demeaning inscriptions":
			slave.lipsTat = "rude words";
			break;
		case "lewd scenes":
			slave.lipsTat = "scenes";
			break;
		case "degrading language":
			slave.lipsTat = "degradation";
			break;
		case "slutty advertisements":
			slave.lipsTat = "advertisements";
			break;
	}

	if (slave.currentRules === undefined || slave.currentRules.length < 1) {
		slave.currentRules = [];
	}

	if (slave.height < -1) {
		slave.height = jsRandom(140, 149);
	} else if (slave.height < 0) {
		slave.height = jsRandom(150, 159);
	} else if (slave.height < 1) {
		slave.height = jsRandom(160, 169);
	} else if (slave.height < 2) {
		slave.height = jsRandom(170, 184);
	} else if (slave.height <= 3) {
		slave.height = jsRandom(185, 200);
	}

	if (V.releaseID < 1059) {
		if (slave.eyeColor === "no default value") {
			slave.eyeColor = slave.origEye;
		}
	}

	if (slave.birthSurname === undefined) { slave.birthSurname = 0; }
	if (slave.slaveSurname === undefined) { slave.slaveSurname = 0; }

	if (slave.faceImplant === 1) {
		slave.faceImplant = 15;
	} else if (slave.faceImplant === 2) {
		slave.faceImplant = 65;
	}

	if (slave.areoleaPiercing !== undefined) { delete slave.areoleaPiercing; }
	if (slave.pregControl === undefined) { slave.pregControl = "none"; }
	if (slave.pregControl === "labor supressors") {
		slave.pregControl = "labor suppressors";
	}

	if (slave.chastityAnus === undefined || slave.chastityPenis === undefined || slave.chastityVagina === undefined) {
		if (slave.dickAccessory === "combined chastity") {
			slave.chastityAnus = 1;
			slave.chastityPenis = 1;
			slave.dickAccessory = "none";
		} else if (slave.vaginalAccessory === "combined chastity") {
			slave.chastityAnus = 1;
			slave.chastityVagina = 1;
			slave.vaginalAccessory = "none";
		} else if (slave.dickAccessory === "anal chastity" || slave.vaginalAccessory === "anal chastity") {
			slave.chastityAnus = 1;
			slave.dickAccessory = "none";
			slave.vaginalAccessory = "none";
		} else if (slave.dickAccessory === "chastity") {
			slave.chastityPenis = 1;
			slave.dickAccessory = "none";
		} else if (slave.vaginalAccessory === "chastity belt") {
			slave.chastityVagina = 1;
			slave.vaginalAccessory = "none";
		} else {
			slave.chastityAnus = 0;
			slave.chastityPenis = 0;
			slave.chastityVagina = 0;
		}
	}

	if (slave.rules !== undefined && slave.rules.rest === undefined) {
		slave.rules.rest = "restrictive";
	}
};
