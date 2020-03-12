/* eslint-disable camelcase */
window.rulesAutosurgery = (function() {
	"use strict";

	let r;
	return rulesAutoSurgery;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function rulesAutoSurgery(slave) {
		r = "";
		const surgeries = [];
		const thisSurgery = ProcessHGTastes(slave);
		if (slave.health.health > 20) {
			CommitSurgery(slave, thisSurgery, surgeries);
		}
		if (surgeries.length > 0) {
			PrintResult(slave, thisSurgery, surgeries);
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters[]} ruleset
	 * @returns {App.RA.RuleSurgerySettings}
	 */
	function autoSurgerySelector(slave, ruleset) {
		const surgery = App.RA.newRule.surgery();
		ruleset.forEach(rule => {
			Object.keys(rule.surgery)
				.filter(key => rule.surgery[key] !== null)
				.forEach(key => {
					surgery[key] = rule.surgery[key];
				});
		});
		return surgery;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {App.RA.RuleSurgerySettings}
	 */
	function ProcessHGTastes(slave) {
		let thisSurgery = App.RA.newRule.surgery();
		switch (V.HGTastes) {
			case 1:
				thisSurgery.lactation = 0;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = "cute";
				thisSurgery.lips = App.RA.makeTarget('==', 10);
				thisSurgery.hips = 0;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.RA.makeTarget('==', 0);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.RA.makeTarget('==', 0);
				thisSurgery.holes = 0;
				break;
			case 2:
				thisSurgery.lactation = 0;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = "cute";
				thisSurgery.lips = App.RA.makeTarget('==', 60);
				thisSurgery.hips = 0;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.RA.makeTarget('==', 4);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.RA.makeTarget('==', 1200);
				thisSurgery.holes = 0;
				break;
			case 3:
				thisSurgery.lactation = 0;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = "cute";
				thisSurgery.lips = App.RA.makeTarget('==', 95);
				thisSurgery.hips = 0;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.RA.makeTarget('==', 8);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.RA.makeTarget('==', 10000);
				thisSurgery.holes = 2;
				break;
			case 4:
				thisSurgery.lactation = 1;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = "cute";
				thisSurgery.lips = App.RA.makeTarget('==', 10);
				thisSurgery.hips = 3;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.RA.makeTarget('==', 0);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.RA.makeTarget('==', 0);
				thisSurgery.holes = 0;
				break;
			default:
				thisSurgery = autoSurgerySelector(
					slave,
					V.defaultRules
						.filter(x => ruleApplied(slave, x) && x.set.autoSurgery === 1)
						.map(x => x.set));
				if ((thisSurgery.hips !== null) && (thisSurgery.butt !== null)) {
					if (slave.hips < -1) {
						if (App.RA.shallGrow(2, thisSurgery.butt)) {
							thisSurgery.butt = App.RA.makeTarget('==', 2);
						}
					} else if (slave.hips < 0) {
						if (App.RA.shallGrow(4, thisSurgery.butt)) {
							thisSurgery.butt = App.RA.makeTarget('==', 4);
						}
					} else if (slave.hips > 0) {
						if (App.RA.shallGrow(8, thisSurgery.butt)) {
							thisSurgery.butt = App.RA.makeTarget('==', 8);
						}
					} else if (slave.hips > 1) {
						// true
					} else {
						if (App.RA.shallGrow(6, thisSurgery.butt)) {
							thisSurgery.butt = App.RA.makeTarget('==', 6);
						}
					}
				}
				break;
		}
		return thisSurgery;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSurgerySettings} thisSurgery
	 * @param {string[]} surgeries
	 */
	function CommitSurgery(slave, thisSurgery, surgeries) {
		const {his, him} = getPronouns(slave);

		/**
		 * Performs an individual surgery procedure
		 * @param {string} desc
		 * @param {slaveOperation} proc
		 * @param {number} [healthCost=10] normal health cost
		 */
		function commitProcedure(desc, proc, healthCost = 10) {
			surgeries.push(desc);
			proc(slave);
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
			surgeryDamage(slave, healthCost);
		}

		/**
		 *
		 * @param {string} bodyPart
		 * @param {!App.RA.NumericTarget} target
		 */
		function bodyPartSizing(bodyPart, target) {
			const shallShrink = App.RA.shallShrink(slave[`${bodyPart}Implant`], target);
			let shallGrow = false;
			let options;
			let sorter;
			if (shallShrink) {
				if (target.val === 0) {
					commitProcedure(`surgery to remove ${his} ${bodyPart} implants`, slave => {
						slave[bodyPart] -= slave[`${bodyPart}Implant`];
						slave[`${bodyPart}Implant`] = 0;
						slave[`${bodyPart}ImplantType`] = "none";
					});
					return;
				}
				options = {reduction: true, replace: true};
				sorter = (left, right) => -right.targetEffect / right.costs + left.targetEffect / left.costs;
			} else if (App.RA.shallGrow(slave[`${bodyPart}Implant`], target)) {
				shallGrow = true;
				options = {augmentation: true, replace: true};
				sorter = (left, right) => right.targetEffect / right.costs - left.targetEffect / left.costs;
			}
			if (!shallShrink && !shallGrow) { return; }

			const surgeryOptions = App.Medicine.Surgery.sizingProcedures.bodyPart(bodyPart, slave, options)
				.filter(surgery => surgery.action !== undefined)
				.sort(sorter);
			for (const so of surgeryOptions) {
				if ((shallShrink && App.RA.shallShrink(slave[`${bodyPart}Implant`], target, so.targetEffect)) ||
					(shallGrow && App.RA.shallGrow(slave[`${bodyPart}Implant`], target, so.targetEffect))) {
					surgeries.push(`surgery to ${so.description}`);
					App.Medicine.Surgery.commit(so, slave);
					break;
				}
			}
		}

		// NOTE: App.RA.shallShrink() and App.RA.shallGrow() return 'false' when target is 'null'
		// Hence they have to be first conditions in the '&&' chains to avoid type errors
		// (reading properties of the 'null' object)
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (thisSurgery.eyes === 1 && anyVisionEquals(slave, 1)) {
				// possibly two surgeries at once, in turn health cost is halved
				if (getLeftEyeVision(slave) === 1) {
					commitProcedure(`surgery to correct ${his} left vision`, s => { eyeSurgery(s, "left", "fix"); }, 5);
				}
				if (getRightEyeVision(slave) === 1) {
					commitProcedure(`surgery to correct ${his} right vision`, s => { eyeSurgery(s, "right", "fix"); }, 5);
				}
			} else if (thisSurgery.eyes === -1 && anyVisionEquals(slave, 2)) {
				// possibly two surgeries at once, in turn health cost is halved
				if (getLeftEyeVision(slave) === 2) {
					commitProcedure(`surgery to blur ${his} left vision`, s => { eyeSurgery(s, "left", "blur"); }, 5);
				}
				if (getRightEyeVision(slave) === 2) {
					commitProcedure(`surgery to blur ${his} right vision`, s => { eyeSurgery(s, "right", "blur"); }, 5);
				}
			} else if (slave.hears === -1 && thisSurgery.hears === 0) {
				commitProcedure(`surgery to correct ${his} hearing`, s => { s.hears = 0; });
			} else if (slave.hears === 0 && thisSurgery.hears === -1) {
				commitProcedure(`surgery to muffle ${his} hearing`, s => { s.hears = -1; });
			} else if (slave.smells === -1 && thisSurgery.smells === 0) {
				commitProcedure(`surgery to correct ${his} sense of smell`, s => { s.smells = 0; });
			} else if (slave.smells === 0 && thisSurgery.smells === -1) {
				commitProcedure(`surgery to muffle ${his} sense of smell`, s => { s.smells = -1; });
			} else if (slave.tastes === -1 && thisSurgery.tastes === 0) {
				commitProcedure(`surgery to correct ${his} sense of taste`, s => { s.tastes = 0; });
			} else if (slave.tastes === 0 && thisSurgery.tastes === -1) {
				commitProcedure(`surgery to muffle ${his} sense of taste`, s => { s.tastes = -1; });
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.lactation === 2 && thisSurgery.lactation === 0) {
				commitProcedure(`surgery to remove ${his} lactation implants`, s => { s.lactation = 0; });
			} else if (slave.lactation !== 2 && (thisSurgery.lactation === 1)) {
				commitProcedure("lactation inducing implanted drugs", s => { s.lactation = 2; });
			} else if ((slave.boobShape === "saggy" || slave.boobShape === "downward-facing") && thisSurgery.cosmetic > 0 && slave.breastMesh !== 1) {
				commitProcedure("a breast lift", s => { s.boobShape = "normal"; });
			} else if ((slave.boobShape === "normal" || slave.boobShape === "wide-set") && thisSurgery.cosmetic > 0 && slave.breastMesh !== 1) {
				commitProcedure("more interestingly shaped breasts", slave => {
					if (slave.boobs > 800) {
						slave.boobShape = "torpedo-shaped";
					} else {
						slave.boobShape = "perky";
					}
				});
			} else if (thisSurgery.boobs) {
				bodyPartSizing("boobs", thisSurgery.boobs);
			}
		}
		if (thisSurgery.butt !== null && slave.health.health > 20 && surgeries.length < 3) {
			bodyPartSizing("butt", thisSurgery.butt);
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.anus > 3 && thisSurgery.cosmetic > 0) {
				commitProcedure("a restored anus", slave => {
					slave.anus = 3;
					if (slave.skill.anal > 10) {
						slave.skill.anal -= 10;
					}
				});
			} else if (slave.vagina > 3 && thisSurgery.cosmetic > 0) {
				commitProcedure("a restored pussy", slave => {
					slave.vagina = 3;
					if (slave.skill.vaginal > 10) {
						slave.skill.vaginal -= 10;
					}
				});
			} else if (slave.anus > 0 && V.surgeryUpgrade === 1 && thisSurgery.holes === 2) {
				commitProcedure("a virgin anus", slave => {
					slave.anus = 0;
					if (slave.skill.anal > 10) {
						slave.skill.anal -= 10;
					}
				});
			} else if (slave.vagina > 0 && V.surgeryUpgrade === 1 && thisSurgery.holes === 2) {
				commitProcedure("a virgin pussy", slave => {
					slave.vagina = 0;
					if (slave.skill.vaginal > 10) {
						slave.skill.vaginal -= 10;
					}
				});
			} else if (slave.anus > 1 && thisSurgery.holes === 1) {
				commitProcedure("a tighter anus", slave => {
					slave.anus = 1;
					if (slave.skill.anal > 10) {
						slave.skill.anal -= 10;
					}
				});
			} else if (slave.vagina > 1 && thisSurgery.holes === 1) {
				commitProcedure("a tighter pussy", slave => {
					slave.vagina = 1;
					if (slave.skill.vaginal > 10) {
						slave.skill.vaginal -= 10;
					}
				});
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.prostate === 2 && thisSurgery.prostate === 0) {
				commitProcedure(`surgery to remove ${his} prostate implant`, s => { s.prostate = 0; });
			} else if (slave.prostate === 1 && thisSurgery.prostate === 1) {
				commitProcedure("a precum production enhancing drug implant", s => { s.prostate = 2; });
			} else if (slave.balls > 0 && slave.vasectomy === 0 && thisSurgery.vasectomy === true) {
				commitProcedure("vasectomy", s => { s.vasectomy = 1; });
				V.surgeryType = "vasectomy";
			} else if (slave.balls > 0 && slave.vasectomy === 1 && thisSurgery.vasectomy === false) {
				commitProcedure("undo vasectomy", s => { s.vasectomy = 0; });
				V.surgeryType = "vasectomy undo";
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.faceImplant <= 15 && slave.face <= 95 && thisSurgery.cosmetic > 0) {
				commitProcedure("a nicer face", slave => {
					if (slave.faceShape === "masculine") { slave.faceShape = "androgynous"; }
					slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
					slave.face = Math.clamp(slave.face + 20, -100, 100);
				});
			} else if (slave.faceImplant <= 15 && slave.ageImplant !== 1 && slave.visualAge >= 25 && thisSurgery.cosmetic > 0) {
				commitProcedure("an age lift", slave => {
					slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
					applyAgeImplant(slave);
				});
			} else if (((slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") || (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless")) && thisSurgery.bodyhair === 2) {
				commitProcedure("body hair removal", slave => {
					if (slave.underArmHStyle !== "hairless") { slave.underArmHStyle = "bald"; }
					if (slave.pubicHStyle !== "hairless") { slave.pubicHStyle = "bald"; }
				}, 0);
			} else if ((slave.bald === 0 || slave.hStyle !== "bald" || slave.eyebrowHStyle !== "bald") && thisSurgery.hair === 2) {
				commitProcedure("hair removal", slave => {
					slave.eyebrowHStyle = "bald";
					slave.hStyle = "bald";
					slave.bald = 1;
				}, 0);
			} else if (slave.weight >= 10 && thisSurgery.cosmetic > 0) {
				commitProcedure("liposuction", s => { s.weight -= 50; });
			} else if ((slave.bellySagPreg > 0 || slave.bellySag > 0) && (thisSurgery.cosmetic > 0 || thisSurgery.tummy > 0 )) {
				commitProcedure("a tummy tuck", slave => {
					slave.bellySag = 0;
					slave.bellySagPreg = 0;
				}, 20);
			} else if (slave.voice === 1 && slave.voiceImplant === 0 && thisSurgery.cosmetic > 0) {
				commitProcedure("a feminine voice", slave => {
					slave.voice += 1;
					slave.voiceImplant += 1;
				});
			} else if (App.RA.shallShrink(slave.lipsImplant, thisSurgery.lips) && thisSurgery.lips.val === 0) {
				commitProcedure(`surgery to remove ${his} lip implants`, slave => {
					slave.lips -= slave.lipsImplant;
					slave.lipsImplant = 0;
					if (slave.skill.oral > 10) {
						slave.skill.oral -= 10;
					}
				});
			} else if (App.RA.shallGrow(slave.lipsImplant, thisSurgery.lips, 10) && slave.lips <= 95) {
				commitProcedure("bigger lips", slave => {
					slave.lipsImplant += 10;
					slave.lips += 10;
					if (slave.skill.oral > 10) {
						slave.skill.oral -= 10;
					}
				});
			} else if (slave.scar.hasOwnProperty("belly") && slave.scar.belly["c-section"] > 0 && thisSurgery.cosmetic > 0) {
				commitProcedure("surgery to remove a c-section scar", s => { App.Medicine.Modification.removeScar(s, "belly", "c-section"); });
			} else if (slave.faceImplant <= 45 && slave.face <= 95 && thisSurgery.cosmetic === 2) {
				commitProcedure("a nicer face", slave => {
					if (slave.faceShape === "masculine") { slave.faceShape = "androgynous"; }
					slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
					slave.face = Math.clamp(slave.face + 20, -100, 100);
				});
			} else if (slave.faceImplant <= 45 && slave.ageImplant !== 1 && slave.visualAge >= 25 && thisSurgery.cosmetic === 2) {
				commitProcedure("an age lift", slave => {
					applyAgeImplant(slave);
					slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
				});
			} else if (slave.voice < 3 && slave.voiceImplant === 0 && thisSurgery.cosmetic === 2) {
				commitProcedure("a bimbo's voice", slave => {
					slave.voice += 1;
					slave.voiceImplant += 1;
				});
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.waist >= -10 && thisSurgery.cosmetic > 0) {
				commitProcedure("a narrower waist", s => { s.waist -= 20; });
			} else if (thisSurgery.hips !== null && slave.hips < 1 && V.surgeryUpgrade === 1 && (slave.hips < thisSurgery.hips)) {
				commitProcedure("wider hips", slave => {
					slave.hips++;
					slave.hipsImplant++;
				});
			} else if (slave.waist >= -95 && V.seeExtreme === 1 && thisSurgery.cosmetic === 2) {
				commitProcedure("a narrower waist", s => { s.waist = Math.clamp(s.waist - 20, -100, 100); });
			} else if (thisSurgery.hips !== null && slave.hips < 2 && V.surgeryUpgrade === 1 && (slave.hips < thisSurgery.hips)) {
				commitProcedure("wider hips", slave => {
					slave.hips++; // FIXME: repeats branch above
					slave.hipsImplant++;
				});
			} else if (thisSurgery.hips !== null && slave.hips < 3 && V.surgeryUpgrade === 1 && (slave.hips < thisSurgery.hips)) {
				commitProcedure("wider hips", slave => {
					slave.hips++; // FIXME: repeats branch above
					slave.hipsImplant++;
				});
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.bellyImplant < 0 && V.bellyImplants > 0 && thisSurgery.bellyImplant === "install" && slave.womb.length === 0 && slave.broodmother === 0) {
				const proc = slave => {
					slave.bellyImplant = 100;
					slave.preg = -2;
				};
				if (slave.ovaries === 1 || slave.mpreg === 1) {
					V.surgeryType = "bellyIn";
					commitProcedure("belly implant", proc, 10);
				} else {
					V.surgeryType = "bellyInMale";
					commitProcedure("male belly implant", proc, 50);
				}
				bellyIn(slave);
			} else if (slave.bellyImplant >= 0 && thisSurgery.bellyImplant === "remove") {
				commitProcedure("belly implant removal", slave => {
					slave.preg = 0;
					slave.bellyImplant = -1;
					slave.cervixImplant = 0;
				});
				V.surgeryType = "bellyOut";
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.horn !== "none" && thisSurgery.horn === 1) {
				commitProcedure(`surgery to remove ${his} implanted horns`, s => { s.horn = "none"; });
			} else if (slave.horn !== "curved succubus horns" && thisSurgery.horn === 2) {
				commitProcedure(`surgery to implant ${him} with curved succubus horns`, s => { s.horn = "curved succubus horns"; s.hornColor = "white"; });
			} else if (slave.horn !== "backswept horns" && thisSurgery.horn === 3) {
				commitProcedure(`surgery to implant ${him} with backswept horns`, s => { s.horn = "backswept horns"; s.hornColor = "white"; });
			} else if (slave.horn !== "cow horns" && thisSurgery.horn === 4) {
				commitProcedure(`surgery to implant ${him} with cow horns`, s => { s.horn = "cow horns"; s.hornColor = "white"; });
			} else if (slave.horn !== "one long oni horn" && thisSurgery.horn === 5) {
				commitProcedure(`surgery to implant ${him} with one long oni horn`, s => { s.horn = "one long oni horn"; s.hornColor = "white"; });
			} else if (slave.horn !== "two long oni horns" && thisSurgery.horn === 6) {
				commitProcedure(`surgery to implant ${him} with two long oni horns`, s => { s.horn = "two long oni horns"; s.hornColor = "white"; });
			} else if (slave.horn !== "small horns" && thisSurgery.horn === 7) {
				commitProcedure(`surgery to implant ${him} with small horns`, s => { s.horn = "small horns"; s.hornColor = "white"; });
			}
		}
		if (slave.health.health > 20 && surgeries.length < 3) {
			if (slave.earShape !== "normal" && thisSurgery.earShape === 1) {
				commitProcedure(`surgery to restore ${his} modified ears`, s => { s.earShape = "normal"; });
			} else if (slave.earShape !== "pointy" && thisSurgery.earShape === 2) {
				commitProcedure(`surgery to modify ${his} ears into a pair of small pointy ears`, s => { s.earShape = "pointy"; });
			} else if (slave.earShape !== "elven" && thisSurgery.earShape === 3) {
				commitProcedure(`surgery to modify ${his} ears into a pair of elven ears`, s => { s.earShape = "elven"; });
			} else if (slave.earShape !== "ushi" && thisSurgery.earShape === 4) {
				commitProcedure(`surgery to modify ${his} ears into a pair of bovine-like ears`, s => { s.earShape = "ushi"; });
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {object} thisSurgery
	 * @param {string[]} surgeries
	 */
	function PrintResult(slave, thisSurgery, surgeries) {
		let surgeriesDisplay = "";
		if (surgeries.length === 1) {
			surgeriesDisplay = surgeries[0];
		} else {
			surgeriesDisplay = surgeries.slice(0, surgeries.length - 1).join(", ");
			surgeriesDisplay += `, and ${surgeries[surgeries.length - 1]}`;
		}
		r += `${capFirstChar(V.assistant.name)}, ordered to apply surgery, gives ${slave.slaveName} <span class="lime">${surgeriesDisplay}.</span>`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function bellyIn(slave) {
		// less hacky version of calling surgery degradation silently
		if (slave.devotion > 50) {
			slave.devotion += 4;
		} else if (slave.devotion >= -20) {
			slave.trust -= 5;
		} else {
			slave.trust -= 5;
			slave.devotion -= 5;
		}
	}
})();
