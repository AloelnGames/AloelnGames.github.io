// this code applies RA rules onto slaves
window.DefaultRules = (function() {
	"use strict";

	const assignedTypes = {
		"auto": {success: "has been automatically assigned", unable: "could not be assigned"},
		"allowed": {success: "is allowed", unable: "could not be allowed"},
	};
	const getAssignmentDescription = function({rule, slave, assignmentResult, append = null}) {
		const job = App.Utils.jobForAssignment(rule.setAssignment).desc;
		let work = job.assignment;
		let descriptionType = "auto";
		const assignmentInfo = (job.description || {}).rulesAssistant;
		if (assignmentInfo != null) {
			if (assignmentInfo.assigned != null) {
				work = assignmentInfo.assigned({slave, pronouns, rule});
			}
			if (assignmentInfo.assignedType != null) {
				descriptionType = assignmentInfo.assignedType;
			}
		}
		const assignedTypeInfo = assignedTypes[descriptionType];
		if (assignedTypeInfo == null) { throw Error(`Unknown description type ${JSON.stringify(descriptionType)} in ${JSON.stringify(rule.setAssignment)}`); }
		const hasBeenAssigned = assignedTypeInfo[assignmentResult];
		return `<br>${slave.slaveName} ${hasBeenAssigned} to ${work}${append || ''}.`;
	};

	/** @type {string} */
	let r;
	let pronouns, he, him, his;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function DefaultRules(slave) {
		if (slave.useRulesAssistant === 0) { return r; } // exempted
		r = "";
		({he, him, his} = pronouns = getPronouns(slave));
		const slaveReadOnly = createReadonlyProxy(slave);
		const {rule, ruleIds} = runWithReadonlyProxy(()=>ProcessSlaveRules(slaveReadOnly));
		slave.currentRules = ruleIds;
		if (ruleIds.length === 0) { return r; } // no rules apply

		AssignJobToSlave(slave, rule);
		if (slave.fuckdoll === 0) {
			ProcessClothing(slave, rule);
			ProcessCollar(slave, rule);
			ProcessEyewear(slave, rule);
			ProcessEarwear(slave, rule);
			ProcessDildos(slave, rule);
			ProcessDickAccessories(slave, rule);
			ProcessAnalAccessories(slave, rule);
			ProcessChastity(slave, rule);
			ProcessShoes(slave, rule);
			ProcessBellyAccessories(slave, rule);
			ProcessArmAccessory(slave, rule);
			ProcessLegAccessory(slave, rule);
		}
		ProcessPit(slave, rule);
		ProcessBellyImplant(slave, rule);
		if (isFertile(slave) || slave.pregWeek < 0) {
			ProcessContraceptives(slave, rule);
		}
		if (slave.preg > 0 && slave.pregKnown === 1 && slave.broodmother === 0) {
			ProcessAbortions(slave, rule);
		}
		ProcessOtherDrugs(slave, rule);
		ProcessAssetGrowthDrugs(slave, rule);
		ProcessEnema(slave, rule);
		ProcessDiet(slave, rule);
		ProcessCuratives(slave, rule);
		ProcessAphrodisiacs(slave, rule);
		ProcessPenisHormones(slave, rule);
		ProcessFemaleHormones(slave, rule);
		ProcessPregnancyDrugs(slave, rule);
		if (slave.fuckdoll === 0) {
			ProcessLivingStandard(slave, rule);
			ProcessSpeech(slave, rule);
			ProcessRelationship(slave, rule);
			ProcessRelease(slave, rule);
			ProcessPunishment(slave, rule);
			ProcessReward(slave, rule);
		}
		ProcessToyHole(slave, rule);
		ProcessDietCum(slave, rule);
		ProcessDietMilk(slave, rule);
		if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
			ProcessSolidFood(slave, rule);
		}
		ProcessTeeth(slave, rule);
		ProcessStyle(slave, rule);
		ProcessPiercings(slave, rule);
		ProcessSmartPiercings(slave, rule);
		ProcessTattoos(slave, rule);
		ProcessPornFeedEnabled(slave, rule);
		ProcessPorn(slave, rule);
		ProcessLabel(slave, rule);
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {map}
	 */
	function ProcessSlaveRules(slave) {
		// merge all rules applying on a slave into one big rule
		/** @type {App.RA.Rule[]} */
		const rules = V.defaultRules.filter((x) => ruleAppliesP(x.condition, slave));
		const ruleIds = [], assignments = [];
		for (const rule of rules) {
			ruleIds.push(rule.ID);
			assignments.push(ProcessAssignments(slave, Object.assign({}, rule.set)));
		}
		return {ruleIds, rule: mergeRules(assignments)};
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 * @returns {App.RA.RuleSetters}
	 */
	function ProcessAssignments(slave, rule) {
		// Before merging rules, we process assignments for each rule separately so we can remove slaves from facilities when they no longer qualify, even if the final "winning" rule assigns them elsewhere
		// We also ignore inapplicable assignments for the current slave, so we only merge assignments that are valid
		if (rule.setAssignment === null) {
			delete rule.setAssignment;
			return rule;
		}
		const job = App.Utils.jobForAssignment(rule.setAssignment);
		if (job === undefined) {
			r += `<span class="red">raWidgets missing case for assignment 'V.{rule.setAssignment}'.</span>`;
			return rule;
		}
		const removeAssignment = ()=> {
			if (job.facility !== App.Entity.facilities.penthouse) {
				RAFacilityRemove(slave, rule); // before deleting rule.setAssignment
			}
			delete rule.setAssignment;
		};
		switch (rule.setAssignment) {
			case "rest":
			case "please you":
				// slaves always qualify for this assignment
				break;
			default:
				if (job.checkRequirements(slave).length !== 0) {
					// no message to prevent spam
					removeAssignment();
				} else if (!job.facility.hasFreeSpace) {
					r += getAssignmentDescription({
						rule, slave, assignmentResult: "unable",
						append: " because it was full"
					});
					removeAssignment();
				}
				break;
		}
		return rule;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function AssignJobToSlave(slave, rule) {
		// place slave on assignment defined by the rule
		if ((rule.setAssignment !== undefined && rule.setAssignment !== null)) {
			if (((rule.setAssignment === "choose her own job" && !slave.choosesOwnAssignment) || rule.setAssignment !== slave.assignment)) {
				r += getAssignmentDescription({rule, slave, assignmentResult: "success"});
				assignJob(slave, rule.setAssignment);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessClothing(slave, rule) {
		// apply clothes to slave
		if ((rule.clothes !== undefined) && (rule.clothes !== null)) {
			if ((rule.clothes === "choosing her own clothes")) {
				if ((slave.choosesOwnClothes === 0)) {
					slave.clothes = "choosing her own clothes";
					slave.choosesOwnClothes = 1;
					r += `<br>${slave.slaveName} is now allowed to choose ${his} own clothes.`;
				}
			} else if (slave.clothes !== rule.clothes) {
				slave.clothes = rule.clothes;
				slave.choosesOwnClothes = 0;
				r += `<br>${slave.slaveName} is now wearing ${slave.clothes}.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessCollar(slave, rule) {
		// apply collar to slave
		if ((rule.collar !== undefined) && (rule.collar !== null)) {
			if (slave.collar !== rule.collar) {
				r += "<br>";
				if (rule.collar === "preg biometrics" && slave.preg <= -1 && slave.ovaries === 0 && slave.mpreg === 0) {
					slave.collar = "none";
					r += `${slave.slaveName} cannot utilize preg biometrics. `;
				} else if ((rule.collar === "massive dildo gag" && slave.skill.oral <= 50)) {
					slave.collar = "none";
					r += `${slave.slaveName} lacks the oral skill to successfully keep the massive dildo gag in ${his} throat. `;
				} else {
					slave.collar = rule.collar;
				}
				if ((slave.collar === "none")) {
					r += `${slave.slaveName} has been given no collar.`;
				} else if ((slave.collar === "pretty jewelry")) {
					r += `${slave.slaveName} has been given ${slave.collar}.`;
				} else if ((["ball gag", "bell collar", "bit gag", "bowtie", "dildo gag", "massive dildo gag", "neck corset", "porcelain mask"].includes(slave.collar))) {
					r += `${slave.slaveName} has been given a ${slave.collar}.`;
				} else {
					r += `${slave.slaveName} has been given a ${slave.collar} collar.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessEyewear(slave, rule) {
		// apply glasses, contacts to slave
		if ((rule.eyewear !== undefined) && (rule.eyewear !== null)) {
			switch (rule.eyewear) {
				case "correct with glasses":
					if (anyVisionEquals(slave, 1)) {
						if (slave.eyewear !== "corrective glasses") {
							slave.eyewear = "corrective glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given corrective glasses.`;
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							r += `<br>${slave.slaveName}'s eyewear has been removed.`;
						}
					}
					break;

				case "correct with contacts":
					if (anyVisionEquals(slave, 1)) {
						if (slave.eyewear !== "corrective contacts") {
							slave.eyewear = "corrective contacts";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given corrective contacts.`;
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							r += `<br>${slave.slaveName}'s eyewear has been removed.`;
						}
					}
					break;

				case "blur with glasses":
					if (anyVisionEquals(slave, 2)) {
						if (slave.eyewear !== "blurring glasses") {
							slave.eyewear = "blurring glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given blurring glasses.`;
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							r += `<br>${slave.slaveName}'s eyewear has been removed.`;
						}
					}
					break;

				case "blur with contacts":
					if (anyVisionEquals(slave, 2)) {
						if (slave.eyewear !== "blurring contacts") {
							slave.eyewear = "blurring contacts";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given blurring contacts.`;
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							r += `<br>${slave.slaveName}'s eyewear has been removed.`;
						}
					}
					break;

				case "universal glasses":
					if (anyVisionEquals(slave, 1)) {
						if (slave.eyewear !== "corrective glasses") {
							slave.eyewear = "corrective glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given corrective glasses.`;
						}
					} else {
						if (slave.eyewear !== "glasses") {
							slave.eyewear = "glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given decorative glasses.`;
						}
					}
					break;

				default:
					if (slave.eyewear !== "none") {
						slave.eyewear = "none";
						r += `<br>${slave.slaveName}'s eyewear has been removed.`;
					}
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessEarwear(slave, rule) {
		// apply earplugs to slave
		if ((rule.earwear !== undefined) && (rule.earwear !== null)) {
			switch (rule.earwear) {
				case "correct with hearing aids":
					if (slave.hears === -1) {
						if (slave.earwear !== "hearing aids") {
							slave.earwear = "hearing aids";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given hearing aids.`;
						}
					} else {
						if (slave.earwear !== "none") {
							slave.earwear = "none";
							r += `<br>${slave.slaveName}'s earwear has been removed.`;
						}
					}
					break;

				case "muffle with ear plugs":
					if (slave.hears > -1) {
						if (slave.earwear !== "muffling ear plugs") {
							slave.earwear = "muffling ear plugs";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given muffling ear plugs.`;
						}
					} else {
						if (slave.earwear !== "none") {
							slave.earwear = "none";
							r += `<br>${slave.slaveName}'s earwear has been removed.`;
						}
					}
					break;

				case "deafen with ear plugs":
					if (slave.hears > -2) {
						if (slave.earwear !== "deafening ear plugs") {
							slave.earwear = "deafening ear plugs";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							r += `<br>${slave.slaveName} has been given deafening ear plugs.`;
						}
					} else {
						if (slave.earwear !== "none") {
							slave.earwear = "none";
							r += `<br>${slave.slaveName}'s earwear has been removed.`;
						}
					}
					break;

				default:
					if (slave.earwear !== "none") {
						slave.earwear = "none";
						r += `<br>${slave.slaveName}'s earwear has been removed.`;
					}
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessDildos(slave, rule) {
		// apply vaginal dildos to slave
		if (slave.vagina === 0) {
			ProcessVVirginDildos(slave, rule);
		} else if ((slave.vagina > 0) && (slave.anus === 0)) {
			ProcessAVirginDildos(slave, rule);
		} else if (slave.vagina > 0) {
			ProcessNonVirginDildos(slave, rule);
			ProcessVaginalAttachments(slave, rule);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessVVirginDildos(slave, rule) {
		// apply vaginal dildos to vaginal virgins
		if ((rule.virginAccessory !== undefined) && (rule.virginAccessory !== null)) {
			if (slave.vaginalAccessory !== rule.virginAccessory) {
				slave.vaginalAccessory = rule.virginAccessory;
				switch (slave.vaginalAccessory) {
					case "huge dildo":
						r += `<br>${slave.slaveName} is a virgin and has been given a `;
						if (slave.vagina >= 2) {
							r += `massive dildo to permanently gape ${his} cunt.`;
						} else {
							r += `large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`;
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length dildo for ${his} pussy.`;
							slave.vaginalAccessory = "dildo";
						}
						break;

					case "long, large dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length large dildo for ${his} pussy.`;
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long, huge dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length huge dildo for ${his} pussy.`;
							slave.vaginalAccessory = "huge dildo";
						} else {
							r += `<br>${slave.slaveName} is a virgin and has been given a `;
							if (slave.vagina >= 2) {
								r += `massive and oversized dildo to permanently gape ${his} cunt.`;
							} else {
								r += `long, large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`;
								slave.vaginalAccessory = "long, large dildo";
							}
						}
						break;

					case "none":
						r += `<br>${slave.slaveName} is a virgin and has been instructed not to use a vaginal accessory.`;
						break;

					default:
						r += `<br>${slave.slaveName} is a virgin and has been given a ${slave.vaginalAccessory} for ${his} pussy.`;
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessAVirginDildos(slave, rule) {
		// apply vaginal dildos to anal virgins
		if ((rule.aVirginAccessory !== undefined) && (rule.aVirginAccessory !== null)) {
			if (slave.vaginalAccessory !== rule.aVirginAccessory) {
				slave.vaginalAccessory = rule.aVirginAccessory;
				switch (slave.vaginalAccessory) {
					case "huge dildo":
						r += `<br>${slave.slaveName} is a virgin and has been given a `;
						if (slave.vagina >= 2) {
							r += `massive dildo to permanently gape ${his} cunt.`;
						} else {
							r += `large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`;
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length dildo for ${his} pussy.`;
							slave.vaginalAccessory = "dildo";
						}
						break;

					case "long, large dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length large dildo for ${his} pussy.`;
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long, huge dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length huge dildo for ${his} pussy.`;
							slave.vaginalAccessory = "huge dildo";
						} else {
							r += `<br>${slave.slaveName} is a virgin and has been given a `;
							if (slave.vagina >= 2) {
								r += `massive and oversized dildo to permanently gape ${his} cunt.`;
							} else {
								r += `long, large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`;
								slave.vaginalAccessory = "long, large dildo";
							}
						}
						break;

					case "none":
						r += `<br>${slave.slaveName} is a virgin and has been instructed not to use a vaginal accessory.`;
						break;

					default:
						r += `<br>${slave.slaveName} is a virgin and has been given a ${slave.vaginalAccessory} for ${his} pussy.`;
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessNonVirginDildos(slave, rule) {
		// apply vaginal dildos to non-virgins
		if ((rule.vaginalAccessory !== undefined) && (rule.vaginalAccessory !== null)) {
			if (slave.vaginalAccessory !== rule.vaginalAccessory) {
				slave.vaginalAccessory = rule.vaginalAccessory;
				switch (slave.vaginalAccessory) {
					case "huge dildo":
						r += `<br>${slave.slaveName} has been given a `;
						if (slave.vagina >= 2) {
							r += `massive dildo to permanently gape ${his} cunt.`;
						} else {
							r += `large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`;
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so ${slave.slaveName} has been given a standard length dildo for ${his} pussy.`;
							slave.vaginalAccessory = "dildo";
						}
						break;

					case "long, large dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so ${slave.slaveName} has been given a standard length large dildo for ${his} pussy.`;
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long, huge dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so ${slave.slaveName} has been given a standard length huge dildo for ${his} pussy.`;
							slave.vaginalAccessory = "huge dildo";
						} else {
							r += `<br>${slave.slaveName} has been given a `;
							if (slave.vagina >= 2) {
								r += `massive and oversized dildo to permanently gape ${his} cunt.`;
							} else {
								r += `long, large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`;
								slave.vaginalAccessory = "long, large dildo";
							}
						}
						break;
					case "none":
						r += `<br>${slave.slaveName} has been instructed not to use a vaginal accessory.`;
						break;

					default:
						r += `<br>${slave.slaveName} has been given a ${slave.vaginalAccessory} for ${his} pussy.`;
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessVaginalAttachments(slave, rule) {
		// apply vaginal accessories to slaves
		if (slave.vaginalAccessory === "none" && slave.vaginalAttachment === "vibrator") {
			slave.vaginalAttachment = "none"; // clears dildo attachment when dildos are removed above
		} else if ((rule.vaginalAttachment !== undefined) && (rule.vaginalAttachment !== null)) {
			if (slave.vaginalAttachment !== rule.vaginalAttachment) {
				slave.vaginalAttachment = rule.vaginalAttachment;
				if (slave.vaginalAccessory !== "none") {
					switch (slave.vaginalAttachment) {
						case "none":
							r += `<br>${slave.slaveName} has been instructed not to use an attachment for ${his} dildo.`;
							break;

						case "vibrator":
							r += `<br>${slave.slaveName}'s dildo has been replaced with a vibrating model.`;
							break;

						default:
							r += `<br>${slave.slaveName} has been given a ${slave.vaginalAttachment}.`;
							break;
					}
				} else {
					switch (slave.vaginalAttachment) {
						case "none":
							r += `<br>${slave.slaveName} has been instructed not to use any vaginal accessories.`;
							break;

						default:
							r += `<br>${slave.slaveName} has been given a ${slave.vaginalAttachment}.`;
							break;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessDickAccessories(slave, rule) {
		// apply dick accessories to slave
		if ((slave.dick > 0)) {
			if (slave.anus === 0) {
				if ((rule.aVirginDickAccessory !== undefined) && (rule.aVirginDickAccessory !== null)) {
					if (slave.dickAccessory !== rule.aVirginDickAccessory) {
						slave.dickAccessory = rule.aVirginDickAccessory;
						if (slave.dickAccessory === "none") {
							r += `<br>${slave.slaveName} is a virgin and has been instructed not to wear a dick accessory.`;
						} else {
							r += `<br>${slave.slaveName} is a virgin and has been given a ${slave.dickAccessory} accessory for ${his} cock.`;
						}
					}
				}
			} else {
				if ((rule.dickAccessory !== undefined) && (rule.dickAccessory !== null)) {
					if (slave.dickAccessory !== rule.dickAccessory) {
						slave.dickAccessory = rule.dickAccessory;
						if (slave.dickAccessory === "none") {
							r += `<br>${slave.slaveName} has been instructed not to wear a dick accessory.`;
						} else {
							r += `<br>${slave.slaveName} has been given a ${slave.dickAccessory} accessory for ${his} cock.`;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessChastity(slave, rule) {
		// apply chastity to slave
		if ((rule.chastityVagina !== undefined) && (rule.chastityVagina !== null)) {
			if (slave.vagina > -1) {
				if (slave.chastityVagina !== rule.chastityVagina) {
					slave.chastityVagina = rule.chastityVagina;
					if (rule.chastityVagina === 1) {
						r += `<br>${slave.slaveName} has been given a chastity belt to wear.`;
					} else {
						r += `<br>${slave.slaveName}'s vaginal chastity has been removed.`;
					}
				}
			}
		}
		if ((rule.chastityPenis !== undefined) && (rule.chastityPenis !== null)) {
			if (slave.dick > 0) {
				if (slave.chastityPenis !== rule.chastityPenis) {
					slave.chastityPenis = rule.chastityPenis;
					if (rule.chastityPenis === 1) {
						r += `<br>${slave.slaveName} has been given a chastity cage to wear.`;
					} else {
						r += `<br>${slave.slaveName}'s chastity cage has been removed.`;
					}
				}
			}
		}
		if ((rule.chastityAnus !== undefined) && (rule.chastityAnus !== null)) {
			if (slave.chastityAnus !== rule.chastityAnus) {
				slave.chastityAnus = rule.chastityAnus;
				if (rule.chastityAnus === 1) {
					r += `<br>${slave.slaveName} has been given anal chastity to wear.`;
				} else {
					r += `<br>${slave.slaveName}'s anal chastity has been removed.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessShoes(slave, rule) {
		// apply shoes to slave
		if ((rule.shoes !== undefined) && (rule.shoes !== null)) {
			if (slave.shoes !== rule.shoes) {
				if (hasAnyLegs(slave)) {
					slave.shoes = rule.shoes;
					r += `<br>${slave.slaveName}'s shoes have been set to ${slave.shoes}.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessBellyAccessories(slave, rule) {
		// apply belly accessories to slave
		if ((rule.bellyAccessory !== undefined) && (rule.bellyAccessory !== null)) {
			if (slave.bellyAccessory !== rule.bellyAccessory) {
				if ((slave.belly >= 1500 || slave.weight >= 130) && setup.fakeBellies.includes(rule.bellyAccessory)) {
					r += `<br>${slave.slaveName}'s natural belly is too big to properly wear an empathy belly.`;
					slave.bellyAccessory = "none";
				} else {
					slave.bellyAccessory = rule.bellyAccessory;
					if (slave.bellyAccessory === "none") {
						r += `<br>${slave.slaveName} has been instructed not to wear a torso accessory.`;
					} else {
						r += `<br>${slave.slaveName} has been given ${slave.bellyAccessory} to wear.`;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessArmAccessory(slave, rule) {
		if (rule.armAccessory !== undefined && rule.armAccessory !== null && hasAnyArms(slave) && slave.armAccessory !== rule.armAccessory) {
			slave.armAccessory = rule.armAccessory;
			r += `<br>${slave.slaveName}'s arm accessory was set to ${rule.armAccessory}.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessLegAccessory(slave, rule) {
		if (rule.legAccessory !== undefined && rule.legAccessory !== null && hasAnyLegs(slave) && slave.legAccessory !== rule.legAccessory) {
			slave.legAccessory = rule.legAccessory;
			r += `<br>${slave.slaveName}'s leg accessory was set to ${rule.legAccessory}.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessAnalAccessories(slave, rule) {
		// apply buttplugs and buttplug accessories to slave
		if (slave.chastityAnus !== 1) {
			if (slave.anus === 0) {
				ProcessAnalVirginButtplugs(slave, rule);
			} else {
				ProcessNonVirginButtplugs(slave, rule);
			}
		}
		ProcessButtplugAttachments(slave, rule);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessAnalVirginButtplugs(slave, rule) {
		// apply buttplugs to virgins
		if ((rule.aVirginButtplug !== undefined) && (rule.aVirginButtplug !== null)) {
			if (slave.buttplug !== rule.aVirginButtplug) {
				slave.buttplug = rule.aVirginButtplug;
				switch (slave.buttplug) {
					case "huge plug":
						r += `<br>${slave.slaveName} is an anal virgin and has been given a `;
						if ((slave.anus >= 2)) {
							r += `massive plug to permanently gape ${his} asshole.`;
						} else {
							slave.buttplug = "large plug";
							r += `large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`;
						}
						break;

					case "long plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so the anal virgin ${slave.slaveName} has been given a standard length plug for ${his} anus.`;
							slave.buttplug = "plug";
						}
						break;

					case "long, large plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so the anal virgin ${slave.slaveName} has been given a standard length large plug for ${his} anus.`;
							slave.buttplug = "large plug";
						}
						break;

					case "long, huge plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so the anal virgin ${slave.slaveName} has been given a standard length huge plug for ${his} anus.`;
							slave.buttplug = "huge plug";
						} else {
							r += `<br>${slave.slaveName} is an anal virgin and has been given a `;
							if (slave.anus >= 2) {
								r += `massive and oversized plug to permanently gape ${his} asshole.`;
							} else {
								r += `long, large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`;
								slave.buttplug = "long, large plug";
							}
						}
						break;

					case "none":
						r += `<br>${slave.slaveName} is an anal virgin and has been instructed not to use an anal accessory.`;
						break;

					default:
						r += `<br>${slave.slaveName} is an anal virgin and has been given a ${slave.buttplug} for ${his} asshole.`;
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessNonVirginButtplugs(slave, rule) {
		// apply buttplugs to non-virgins
		if ((rule.buttplug !== undefined) && (rule.buttplug !== null)) {
			if (slave.buttplug !== rule.buttplug) {
				slave.buttplug = rule.buttplug;
				switch (slave.buttplug) {
					case "huge plug":
						r += `<br>${slave.slaveName} has been given a `;
						if ((slave.anus >= 2)) {
							r += `massive plug to permanently gape ${his} asshole.`;
						} else {
							slave.buttplug = "large plug";
							r += `large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`;
						}
						break;

					case "long plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so ${slave.slaveName} has been given a standard length plug for ${his} anus.`;
							slave.buttplug = "plug";
						}
						break;

					case "long, large plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so ${slave.slaveName} has been given a standard length large plug for ${his} anus.`;
							slave.buttplug = "large plug";
						}
						break;

					case "long, huge plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && V.arcologies[0].FSRestart !== "unset") {
							r += `<br>Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so ${slave.slaveName} has been given a standard length huge plug for ${his} anus.`;
							slave.buttplug = "huge plug";
						} else {
							r += `<br>${slave.slaveName} has been given a `;
							if (slave.anus >= 2) {
								r += `massive and oversized plug to permanently gape ${his} asshole.`;
							} else {
								r += `long, large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`;
								slave.buttplug = "long, large plug";
							}
						}
						break;

					case "none":
						r += `<br>${slave.slaveName} has been instructed not to use an anal accessory.`;
						break;

					default:
						r += `<br>${slave.slaveName} has been given a ${slave.buttplug} for ${his} asshole.`;
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessButtplugAttachments(slave, rule) {
		// apply buttplug accessories to slaves
		if (slave.buttplug === "none") {
			if (slave.buttplugAttachment !== "none") {
				slave.buttplugAttachment = "none"; // clears buttplug attachments when buttplugs are removed above
			} // otherwise ignores the rule since the slave is not wearing a buttplug
		} else if ((rule.buttplugAttachment !== undefined) && (rule.buttplugAttachment !== null)) {
			if (slave.buttplugAttachment !== rule.buttplugAttachment) {
				slave.buttplugAttachment = rule.buttplugAttachment;
				switch (slave.buttplugAttachment) {
					case "none":
						r += `<br>${slave.slaveName} has been instructed not to use an attachment for ${his} anal accessory.`;
						break;

					default:
						r += `<br>${slave.slaveName} has been given a ${slave.buttplugAttachment} to attach to ${his} buttplug.`;
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessBellyImplant(slave, rule) {
		// Here is belly implant size control, it's used in Surgery Degradation passage to setup devotion and trust changes.
		// silent calls to surgery degradation have been replaced with a js function, which is less hacky
		if ((rule.bellyImplantVol !== undefined) && slave.bellyImplant >= 0 && rule.bellyImplantVol >= 0) {
			r += "<br>";
			if (slave.health.condition > -10) {
				let diff = rule.bellyImplantVol - slave.bellyImplant;
				if (diff >= 5000 && slave.bellyPain === 0 && slave.health.condition > 50) {
					r += `${slave.slaveName}'s belly is way too small, so ${he} has been directed to have intensive belly implant filling procedures throughout this week.`;
					slave.bellyImplant += 1000;
					slave.bellyPain += 2;
					BellySurgery(slave, diff);
				} else if (diff >= 500 && slave.bellyPain < 2) {
					r += `${slave.slaveName}'s belly has not reached the desired size, so ${he} has been directed to have belly implant filling procedures throughout this week.`;
					slave.bellyImplant += 500;
					slave.bellyPain += 1;
					BellySurgery(slave, diff);
				} else if (diff <= -5000) {
					r += `${slave.slaveName}'s belly is way too big, so ${he} has been directed to have intensive belly implant draining procedures throughout this week.`;
					slave.bellyImplant -= 1000;
					BellySurgery(slave, diff);
				} else if (diff <= -500) {
					r += `${slave.slaveName}'s belly is too big, so ${he} has been directed to have belly implant draining procedures throughout this week.`;
					slave.bellyImplant -= 500;
					BellySurgery(slave, diff);
				}
			} else {
				r += `${slave.slaveName} is not healthy enough to safely adjust ${his} belly implant.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {object} volume
	 */
	function BellySurgery(slave, volume) {
		// this is a port of the belly implant portion of surgeryDegradation.tw
		// that way, we don't have to use ugly hacks
		// the original still exists, and may be worth replacing
		if (volume > 0) { // bellyUp
			SetBellySize(slave);
			if (slave.bellyPain === 1) {
				if (slave.devotion > 50) {
					slave.devotion += 4;
				} else if (slave.devotion >= -20) {
					slave.trust -= 5;
				} else {
					slave.trust -= 10;
					slave.devotion -= 5;
				}
			} else if (slave.bellyPain === 2) {
				if (slave.devotion > 50) {
					slave.devotion += 2;
				} else if (slave.devotion >= -20) {
					slave.trust -= 7;
				} else {
					slave.trust -= 12;
					slave.devotion -= 7;
				}
			}
		} else { // bellyDown
			if (slave.bellyImplant < 0) {
				slave.bellyImplant = 0;
			}
			SetBellySize(slave);
			if (slave.devotion > 50) {
				slave.devotion += 3;
				slave.trust += 3;
			} else if (slave.devotion >= -20) {
				slave.trust += 2;
			} else {
				slave.devotion += 1;
				slave.trust -= 10;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessContraceptives(slave, rule) {
		if ((rule.preg !== undefined) && (rule.preg !== null)) {
			if (rule.preg === true && slave.preg === 0) {
				r += `<br>${slave.slaveName} is being given contraceptives.`;
				slave.preg = -1;
			} else if (slave.preg === -1 && rule.preg === false) {
				r += `<br>${slave.slaveName} is no longer being put on contraceptives.`;
				slave.preg = 0;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessAbortions(slave, rule) {
		function conditionalTermination(slave, predicate) {
			let res = false;
			if (slave.preg < 4) {
				let WL = slave.womb.length;
				for (let index = 0; index < WL; index++) {
					if (predicate(slave.womb[index])) {
						WombRemoveFetus(slave, index);
						index--;
						WL--;
						res = true;
					}
				}
				if (WL === 0) {
					TerminatePregnancy(slave);
				}
			}
			return res;
		}

		if ((rule.abortion !== undefined) && (rule.abortion !== null)) {
			for (const ar of rule.abortion) {
				if (ar === "all") {
					if (slave.preg < 4 || (slave.fetish === "mindbroken" || slave.fuckdoll !== 0)) {
						r += `<br>${slave.slaveName}'s pregnancy has been terminated.`;
					} else {
						r += `<br>${slave.slaveName}'s pregnancy has been terminated; `;
						if (slave.sexualFlaw === "breeder") {
							r += `it broke ${his} mind.`;
							slave.fetish = "mindbroken";
							slave.behavioralQuirk = "none";
							slave.behavioralFlaw = "none";
							slave.sexualQuirk = "none";
							slave.sexualFlaw = "none";
							slave.devotion = 0;
							slave.trust = 0;
						} else if (slave.devotion < -50) {
							r += `${he} did not handle it well.`;
							slave.trust -= 10;
							slave.devotion -= 25;
						} else if (slave.devotion < -20) {
							r += `${he} did not handle it well.`;
							slave.trust -= 10;
							slave.devotion -= 10;
						} else if (slave.fetish === "pregnancy") {
							r += `${he} did not handle it well.`;
							let fetishModifier = slave.fetishStrength / 2;
							slave.devotion -= fetishModifier;
							slave.trust -= fetishModifier;
						} else if (slave.devotion <= 20) {
							r += `${he} did not handle it well.`;
							slave.trust -= 10;
							slave.devotion -= 5;
						} else if (slave.devotion <= 50) {
							r += `${he} did not handle it well.`;
							slave.trust -= 10;
						} else {
							r += "it had little mental effect.";
						}
					}

					if (lastPregRule(slave, V.defaultRules)) {
						slave.preg = -1;
					} else {
						slave.preg = 0;
					}
					if (slave.abortionTat > -1) {
						slave.abortionTat++;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
					}
					V.reservedChildren = FetusGlobalReserveCount("incubator");
					V.reservedChildrenNursery = FetusGlobalReserveCount("nursery");
					TerminatePregnancy(slave);
				} else if (ar === "male") {
					if (conditionalTermination(slave, fetus => fetus.genetics.gender === "XY")) {
						r += `<br>${slave.slaveName}'s male fetuses have been terminated.`;
					}
				} else if (ar === "female") {
					if (conditionalTermination(slave, fetus => fetus.genetics.gender === "XX")) {
						r += `<br>${slave.slaveName}'s female fetuses have been terminated.`;
					}
				} else if (ar.startsWith("race:")){ // ar is the race name in the notation "race:<lowercase_race_name>"
					const race = ar.substr("race:".length);
					if (conditionalTermination(slave, fetus => fetus.genetics.race === race)) {
						r += `<br>${slave.slaveName}'s ${race} fetuses have been terminated.`;
					}
				}
				SetBellySize(slave);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessAssetGrowthDrugs(slave, rule) {
		if ((slave.drugs === "super fertility drugs" || slave.drugs === "fertility drugs") && isFertile(slave)) {
			r += `<br>${slave.slaveName} is on ${slave.drugs} and will not be considered for drug enhancement until that regime is complete.`;
			return;
		} else if (slave.indentureRestrictions > 1 || (rule.growth.boobs === null && rule.growth.butt === null && rule.growth.lips === null && rule.growth.dick === null && rule.growth.balls === null)) {
			return;
		}

		// Asset Growth
		const growthDrugs = new Set(["breast injections", "breast redistributors", "butt injections", "butt redistributors", "hyper breast injections", "hyper butt injections", "hyper penis enhancement", "hyper testicle enhancement", "intensive breast injections", "intensive butt injections", "intensive penis enhancement", "intensive testicle enhancement", "lip atrophiers", "lip injections", "penis atrophiers", "penis enhancement", "testicle atrophiers", "testicle enhancement"]);

		// WARNING: property names in fleshFunc, growDrugs, and shrinkDrugs must be identical and this fact is used by the drugs() below
		const fleshFunc = {
			lips: s => s.lips - s.lipsImplant,
			boobs: s => s.boobs - s.boobsImplant - s.boobsMilk,
			butt: s => Math.trunc(s.butt - s.buttImplant),
			dick: s => s.dick,
			balls: s => s.balls,
		};

		const maxAssetSize = {
			lips: V.seeExtreme ? 95 : 85,
			boobs: 48000,
			butt: 20,
			dick: 31,
			balls: 125
		};

		const growDrugs = {
			lips: "lip injections",
			boobs: "breast injections",
			butt: "butt injections",
			dick: null,
			balls: null
		};

		if (slave.dick > 0) {
			growDrugs.dick = "penis enhancement";
		}
		if (slave.balls > 0) {
			growDrugs.balls = "testicle enhancement";
		}

		if (rule.hyper_drugs === 1 && V.arcologies[0].FSAssetExpansionistResearch === 1) {
			growDrugs.boobs = "hyper breast injections";
			growDrugs.butt = "hyper butt injections";
			if (slave.dick > 0) {
				growDrugs.dick = "hyper penis enhancement";
			}
			if (slave.balls > 0) {
				growDrugs.balls = "hyper testicle enhancement";
			}
		} else if (rule.growth.intensity && slave.indentureRestrictions < 2 && slave.health.condition > 0) {
			growDrugs.boobs = "intensive breast injections";
			growDrugs.butt = "intensive butt injections";
			if (slave.dick > 0) {
				growDrugs.dick = "intensive penis enhancement";
			}
			if (slave.balls > 0) {
				growDrugs.balls = "intensive testicle enhancement";
			}
		}

		const shrinkDrugs = {
			lips: null,
			boobs: null,
			butt: null,
			dick: null,
			balls: null
		};

		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			shrinkDrugs.lips = "lip atrophiers";
			if (slave.dick > 0) {
				shrinkDrugs.penis = "penis atrophiers";
			}
			if (slave.balls > 0) {
				shrinkDrugs.balls = "testicle atrophiers";
			}
			if (slave.weight < 100) {
				shrinkDrugs.boobs = "breast redistributors";
				shrinkDrugs.butt = "butt redistributors";
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {string} asset
		 * @param {App.RA.NumericTarget} target
		 * @param {Array} priorities
		 * @param {number} step
		 */
		function drugs(slave, asset, target, priorities, step) {
			if (target === null || (growDrugs[asset] === null && shrinkDrugs[asset] === null)) {
				return;
			}

			const flesh = fleshFunc[asset](slave);
			if (growDrugs[asset] !== null && App.RA.shallGrow(flesh, target, step) && maxAssetSize[asset] > slave[asset]) {
				priorities.push({
					drug: growDrugs[asset],
					weight: 1.0 - (flesh / target.val)
				});
			} else if (shrinkDrugs[asset] !== null && App.RA.shallShrink(flesh, target, step)) {
				priorities.push({
					drug: shrinkDrugs[asset],
					weight: flesh / target.val - 1.0
				});
			}
		}

		let _priorities = [];
		drugs(slave, "boobs", rule.growth.boobs, _priorities, 200);
		drugs(slave, "butt", rule.growth.butt, _priorities, 1);
		drugs(slave, "lips", rule.growth.lips, _priorities, 1);
		drugs(slave, "dick", rule.growth.dick, _priorities, 1);
		drugs(slave, "balls", rule.growth.balls, _priorities, 1);

		if (_priorities.length > 0) {
			const action = _priorities.reduce((acc, cur) => (acc.weight > cur.weight) ? acc : cur);
			if (slave.drugs !== action.drug) {
				slave.drugs = action.drug;
				r += `<br>${slave.slaveName} has been put on ${slave.drugs}, since `;
				if (action.drug.startsWith("intensive")) {
					r += `since ${he}'s healthy enough to take them, and `;
				}
				if (_priorities.length > 1) {
					r += `that part of ${his} body is `;
					if (!isNaN(action.weight)) {
						r += `${Math.trunc(action.weight * 100)}% `;
					}
					if (action.weight < 1) {
						r += "below ";
					} else {
						r += "above ";
					}
					r += "the targeted size.";
				} else {
					r += `that is the only part of ${his} body that does not meet the targeted size.`;
				}
			}
		} else if (growthDrugs.has(slave.drugs)) {
			slave.drugs = "no drugs";
			r += `<br>${slave.slaveName}'s body has met all relevant growth targets, so ${his} pharmaceutical regime has been ended.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessOtherDrugs(slave, rule) {
		// Other Drugs
		if (slave.indentureRestrictions < 2 && rule.drug !== null && slave.drugs !== rule.drug) {
			let flag = true;
			switch (rule.drug) {
				case "anti-aging cream":
					if (slave.visualAge < 18) {
						flag = false;
					}
					break;

				case "growth stimulants":
					if (!canImproveHeight(slave)) {
						flag = false;
					}
					break;

				case "sag-B-gone":
					if (!(slave.boobs > 250 && slave.boobShape !== "saggy")) {
						flag = false;
					}
					break;

				case "female hormone injections":
					if (!((slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset") && (slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 0)) {
						flag = false;
					}
					break;

				case "male hormone injections":
					if (!((slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset") && slave.balls > 0 && slave.pubertyXY === 0)) {
						flag = false;
					}
					break;

				case "psychosuppressants":
					if (!(slave.intelligence > -100 && slave.indentureRestrictions < 1)) {
						flag = false;
					}
					break;

				case "psychostimulants":
					if (!canImproveIntelligence(slave)) {
						flag = false;
					}
					break;

				case "breast injections":
					if (slave.boobs >= 48000) {
						flag = false;
					}
					break;

				case "hyper breast injections":
					if (slave.boobs >= 48000) {
						flag = false;
					}
					break;

				case "breast redistributors":
					if (slave.boobs - slave.boobsImplant <= 100) {
						flag = false;
					}
					break;

				case "butt injections":
					if (slave.butt >= 9) {
						flag = false;
					}
					break;

				case "hyper butt injections":
					if (slave.butt >= 20) {
						flag = false;
					}
					break;

				case "nipple atrophiers":
					if (!(["cute", "huge", "puffy"].includes(slave.nipples))) {
						flag = false;
					}
					break;

				case "butt redistributors":
					if (slave.buttImplant <= 0) {
						flag = false;
					}
					break;

				case "lip injections":
					if (!(slave.lips <= 95 || (slave.lips <= 85 && V.seeExtreme !== 1))) {
						flag = false;
					}
					break;

				case "lip atrophiers":
					if (slave.lips - slave.lipsImplant <= 0) {
						flag = false;
					}
					break;

				case "super fertility drugs":
					if (!(slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset"))) {
						flag = false;
					}
					break;

				case "penis enhancement":
					if (!((slave.dick > 0 && slave.dick < 10) || slave.clit < 5)) {
						flag = false;
					}
					break;

				case "hyper penis enhancement":
					if (!((slave.dick > 0 && slave.dick < 31) || slave.clit < 5)) {
						flag = false;
					}
					break;

				case "penis atrophiers":
					if (slave.dick <= 1) {
						flag = false;
					}
					break;

				case "testicle enhancement":
					if (slave.balls <= 0) {
						flag = false;
					}
					break;

				case "hyper testicle enhancement":
					if (slave.balls <= 0) {
						flag = false;
					}
					break;

				case "testicle atrophiers":
					if (slave.balls <= 1) {
						flag = false;
					}
					break;

				case "clitoris atrophiers":
					if (slave.clit <= 0) {
						flag = false;
					}
					break;

				case "labia atrophiers":
					if (slave.labia <= 0) {
						flag = false;
					}
					break;

				case "appetite suppressors":
					if (slave.weight > -95) {
						flag = false;
					}
					break;

				case "priapism agents":
					if (slave.dick === 0 || slave.dick > 10 || slave.chastityPenis === 1 || (canAchieveErection(slave) && slave.drugs !== "priapism agents")) {
						flag = false;
					}
					break;
			}
			if (flag) {
				slave.drugs = rule.drug;
				r += `<br>${slave.slaveName} has been put on ${slave.drugs}.`;
			} else {
				slave.drugs = "no drugs";
				r += `<br>${slave.slaveName} cannot benefit from ${his} assigned drug and has been defaulted to ${slave.drugs}`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessEnema(slave, rule) {
		if ((rule.inflationType !== undefined) && (rule.inflationType !== null)) {
			if (slave.inflationType !== rule.inflationType) {
				if ((slave.inflationType === "curative" && slave.health.condition > 90) || (slave.inflationType === "tightener" && slave.anus <= 1 && slave.vagina <= 1)) {
					r += `<br>${slave.slaveName} cannot benefit from ${his} assigned enema and has been defaulted to none.`;
					slave.inflation = 0;
					slave.inflationType = "none";
					slave.inflationMethod = 0;
					slave.milkSource = 0;
					slave.cumSource = 0;
					SetBellySize(slave);
				} else if ((rule.inflationType === "curative" && slave.health.condition > 90) || (rule.inflationType === "tightener" && slave.anus <= 1 && slave.vagina <= 1)) {
					// empty block
				} else {
					r += `<br>${slave.slaveName}'s current enema regimen has been set to ${rule.inflationType}.`;
					slave.inflation = 1;
					slave.inflationType = rule.inflationType;
					slave.inflationMethod = 2;
					slave.milkSource = 0;
					slave.cumSource = 0;
					SetBellySize(slave);
				}
			}
			if (slave.inflationType !== "none" && slave.inflation > 1 && slave.health.condition < -50) {
				r += `<br>${slave.slaveName}'s current enema regimen risks death, so it has been reduced to a less threatening level.`;
				slave.inflation = 1;
				SetBellySize(slave);
			} else if (slave.inflation > 1 && (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500)) {
				r += `<br>${slave.slaveName}'s current enema is too much for ${his} body, so it has been reduced.`;
				slave.inflation = 1;
				SetBellySize(slave);
			} else if (slave.inflationType === "none") {
				slave.inflation = 0;
				slave.inflationMethod = 0;
				slave.milkSource = 0;
				slave.cumSource = 0;
				SetBellySize(slave);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */

	function ProcessPit(slave, rule) {
		if (rule.pitRules !== undefined && rule.pitRules !== null) {
			if (V.pit > 0) {
				if (rule.pitRules === 0) {
					V.fighterIDs = V.fighterIDs.filter(e => e !== slave.ID);
					r += `<br>${slave.slaveName} has been removed from the pit.`;
				} else {
					if (App.Entity.facilities.pit.job().checkRequirements(slave).length !== 0) {
						V.fighterIDs = V.fighterIDs.filter(e => e !== slave.ID);
						r += `<br>${slave.slaveName} is not eligible to fight.`;
					} else {
						if (!V.fighterIDs.includes(slave.ID)) {
							V.fighterIDs.push(slave.ID);
						}
						r += `<br>${slave.slaveName} has been automatically assigned to fight in the pit.`;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessDiet(slave, rule) {
		// Diet Setting
		if ((rule.diet !== undefined && rule.diet !== null) || rule.weight !== null || rule.muscles !== null) {
			/*
			if ((slave.boobs >= 1600) && (slave.muscles <= 5) && !isAmputee(slave) && ((rule.muscles == null) || (rule.muscles === 0))) {
				if ((slave.diet !== "muscle building")) {
					slave.diet = "muscle building"
					r += `<br>${slave.slaveName} has big tits and no back muscles, so ${he}'s been assigned to gain some.`
				}
			} else if ((slave.boobs >= 1600) && (slave.muscles > 5) && (slave.diet == "muscle building") && ((rule.muscles == null) || (rule.muscles === 0))) {
			*/
			if (rule.diet === "healthy" && slave.diet !== "healthy") {
				slave.diet = "healthy";
				r += `<br>${slave.slaveName} has been assigned to a healthy diet.`;
			} else if ((slave.boobs >= 1600) && (slave.muscles > 5) && (slave.diet === "muscle building") && ((rule.muscles === null) || (rule.muscles.val === 0))) {
				slave.diet = "healthy";
				r += `<br>${slave.slaveName} has huge boobs, but ${he} already has the back muscles to bear them, so ${he}'s been assigned to stop working out so hard.`;
			} else if ((rule.dietGrowthSupport === 1) && ((slave.drugs === "breast injections") || (slave.drugs === "butt injections")) && (slave.weight <= 95)) {
				if (slave.diet !== "fattening") {
					slave.diet = "fattening";
					r += `<br>${slave.slaveName} is on drugs designed to expand major body parts, so ${he}'s been put on a fattening diet to provide ${his} body as much fuel for growth as possible.`;
				}
			} else {
				// priority to growing/losing muscles, then general body mass, then rest of the diets
				if (!isAmputee(slave) && (App.RA.shallShrink(slave.muscles, rule.muscles, 8) || App.RA.shallGrow(slave.muscles, rule.muscles, 2))) {
					if (App.RA.shallShrink(slave.muscles, rule.muscles, 8)) {
						if ((slave.diet !== "slimming")) {
							slave.diet = "slimming";
							r += `<br>${slave.slaveName} has been put on a slimming exercise regime.`;
						}
					} else if (App.RA.shallGrow(slave.muscles, rule.muscles, 2)) {
						if ((slave.diet !== "muscle building")) {
							slave.diet = "muscle building";
							r += `<br>${slave.slaveName} has been put on a muscle building exercise regime.`;
						}
					} else {
						if ((slave.diet !== "healthy")) {
							slave.diet = "healthy";
							r += `<br>${slave.slaveName} is at the target weight, so ${his} diet has been normalized.`;
						}
					}
				} else if (rule.weight !== null && (slave.weight > rule.weight.max || slave.weight < rule.weight.min)) {
					if (slave.weight > rule.weight.max) {
						if (slave.diet !== "restricted") {
							slave.diet = "restricted";
							r += `<br>${slave.slaveName} is too fat so ${his} diet has been set to restricted.`;
						}
					} else if (slave.weight < rule.weight.min) {
						if (slave.diet !== "fattening") {
							slave.diet = "fattening";
							r += `<br>${slave.slaveName} is too skinny so ${his} diet has been set to fattening.`;
						}
					} else {
						if ((slave.diet !== "healthy")) {
							slave.diet = "healthy";
							r += `<br>${slave.slaveName} is at the target weight, so ${his} diet has been normalized.`;
						}
					}
				} else if ((rule.diet === "attractive")) {
					if (((slave.weight > 95) || ((slave.weight > 30) && (slave.hips < 2)))) {
						if ((slave.diet !== "restricted")) {
							slave.diet = "restricted";
							r += `<br>${slave.slaveName} is too fat so ${his} diet has been set to restricted.`;
						}
					} else if (((slave.weight < -95) || ((slave.weight < -30) && (slave.hips > -2)))) {
						if ((slave.diet !== "fattening")) {
							slave.diet = "fattening";
							r += `<br>${slave.slaveName} is too skinny so ${his} diet has been set to fattening.`;
						}
					} else {
						if ((slave.diet !== "healthy")) {
							slave.diet = "healthy";
							r += `<br>${slave.slaveName} is at the target weight, so ${his} diet has been normalized.`;
						}
					}
				} else if ((rule.diet === "XX")) {
					if ((slave.diet !== "XX")) {
						slave.diet = "XX";
						r += `<br>${slave.slaveName} has been put on a diet that favors feminine development.`;
					}
				} else if ((rule.diet === "XY")) {
					if ((slave.diet !== "XY")) {
						slave.diet = "XY";
						r += `<br>${slave.slaveName} has been put on a diet that favors masculine development.`;
					}
				} else if ((rule.diet === "XXY")) {
					if (slave.balls > 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
						if ((slave.diet !== "XXY")) {
							slave.diet = "XXY";
							r += `<br>${slave.slaveName} has been put on a diet that enhances a herm's unique sexuality.`;
						}
					} else {
						if ((slave.diet !== "healthy")) {
							slave.diet = "healthy";
							r += `<br>${slave.slaveName} has been put on a standard diet since ${he} is not a hermaphrodite.`;
						}
					}
				} else if ((rule.diet === "cleansing")) {
					if ((slave.diet !== "cleansing") && (slave.health.condition < 90 || slave.chem >= 10)) {
						slave.diet = "cleansing";
						r += `<br>${slave.slaveName} has been put on a diet of cleansers.`;
					}
				} else if ((rule.diet === "fertility")) {
					if ((isFertile(slave) && slave.preg === 0) || (slave.geneticQuirks.superfetation === 2 && canGetPregnant(slave) && V.geneticMappingUpgrade !== 0)) {
						if ((slave.diet !== "fertility")) {
							slave.diet = "fertility";
							r += `<br>${slave.slaveName} has been put on a diet to enhance fertility.`;
						}
					} else {
						if ((slave.diet !== "healthy")) {
							slave.diet = "healthy";
							if (slave.pregKnown === 0 && slave.preg > 0) {
								r += `<br>${slave.slaveName} has been put on a standard diet since tests reveal ${he} has become pregnant.`;
								slave.pregKnown = 1;
							} else {
								r += `<br>${slave.slaveName} has been put on a standard diet since ${he} is currently unable to become pregnant.`;
							}
						}
					}
				} else if ((rule.diet === "cum production")) {
					if ((slave.balls > 0)) {
						if ((slave.diet !== "cum production")) {
							slave.diet = "cum production";
							r += `<br>${slave.slaveName} has been put on a diet to promote cum production.`;
						}
					} else {
						if ((slave.diet !== "healthy")) {
							slave.diet = "healthy";
							r += `<br>${slave.slaveName} has been put on a standard diet since ${he} is no longer able to produce cum.`;
						}
					}
				}
			}

			if (slave.drugs === "appetite suppressors" && slave.diet !== "restricted") {
				slave.drugs = "no drugs";
				r += `<br>${slave.slaveName} no longer needs to lose weight, so ${he}'s no longer being given appetite suppressors.`;
			} else if (slave.diet === "restricted" && V.arcologies[0].FSSlimnessEnthusiastResearch === 1 && (slave.drugs === "no drugs" || slave.drugs === "none")) {
				slave.drugs = "appetite suppressors";
				r += `<br>${slave.slaveName} needs to lose weight so ${he} will be given weight loss pills.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessCuratives(slave, rule) {
		if ((rule.curatives !== undefined) && (rule.curatives !== null)) {
			if (slave.curatives !== rule.curatives) {
				if (rule.curatives === 2) {
					if (slave.health.condition > 100) {
						if ((slave.curatives !== 1)) {
							r += `<br>${slave.slaveName} has been put on preventatives, since curatives cannot improve ${his} health further.`;
							slave.curatives = 1;
						}
					} else {
						r += `<br>${slave.slaveName} has been put on curatives.`;
						slave.curatives = rule.curatives;
					}
				} else {
					r += `<br>${slave.slaveName} has been ${rule.curatives > 0 ? "put on preventatives" : "taken off health drugs"}`;
					slave.curatives = rule.curatives;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessAphrodisiacs(slave, rule) {
		if ((rule.aphrodisiacs !== undefined) && (rule.aphrodisiacs !== null)) {
			if (slave.aphrodisiacs !== rule.aphrodisiacs) {
				r += `<br>${slave.slaveName} has been ${rule.aphrodisiacs > 0 ? "put on the proper" : "taken off"} aphrodisiacs.`;
				slave.aphrodisiacs = rule.aphrodisiacs;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessPenisHormones(slave, rule) {
		if ((slave.dick > 0)) {
			if ((slave.balls === 0)) {
				if ((rule.gelding !== undefined) && (rule.gelding !== null)) {
					if (slave.hormones !== rule.gelding) {
						const _oldHormones = slave.hormones;
						slave.hormones = rule.gelding;
						if (slave.indentureRestrictions >= 2) {
							slave.hormones = Math.clamp(slave.hormones, -1, 1);
						}
						if (slave.hormones !== _oldHormones) {
							r += `<br>${slave.slaveName} is a gelding, so ${he} has been put on the appropriate hormonal regime.`;
						}
					}
				}
			} else if ((slave.balls > 0)) {
				if ((rule.XY !== undefined) && (rule.XY !== null)) {
					if (slave.hormones !== rule.XY) {
						if ((slave.assignment !== "recruit girls")) {
							if ((slave.assignment !== "be the Wardeness")) {
								if ((slave.assignment !== "be the Madam")) {
									const _oldHormones = slave.hormones;
									slave.hormones = rule.XY;
									if (slave.indentureRestrictions >= 2) {
										slave.hormones = Math.clamp(slave.hormones, -1, 1);
									}
									if (slave.hormones !== _oldHormones) {
										r += `<br>${slave.slaveName} is a shemale, so ${he} has been put on the appropriate hormonal regime.`;
									}
								}
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessFemaleHormones(slave, rule) {
		if ((slave.vagina > -1) && (slave.dick === 0) && (rule.XX !== undefined) && (rule.XX !== null)) {
			if (slave.hormones !== rule.XX) {
				const _oldHormones = slave.hormones;
				slave.hormones = rule.XX;
				if (slave.indentureRestrictions >= 2) {
					slave.hormones = Math.clamp(slave.hormones, -1, 1);
				}
				if (slave.hormones !== _oldHormones) {
					r += `<br>${slave.slaveName} is a female, so ${he} has been put on the appropriate hormonal regime.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessPregnancyDrugs(slave, rule) {
		if (slave.pregKnown === 1 && rule.pregSpeed !== null && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset") && slave.indentureRestrictions < 1 && slave.broodmother === 0) {
			if (rule.pregSpeed === "slow" && slave.preg < slave.pregData.minLiveBirth) {
				slave.pregControl = "slow gestation";
				r += `<br>${slave.slaveName} is pregnant, so ${he} has been put on the gestation slowing agents.`;
			} else if (rule.pregSpeed === "fast" && slave.preg < slave.pregData.minLiveBirth && slave.health.condition > -50) {
				slave.pregControl = "speed up";
				r += `<br>${slave.slaveName} is pregnant, so ${he} has been put on rapid gestation agents. CAUTION! Can be dangerous. Clinic supervision is recommended.`;
			} else if (rule.pregSpeed === "suppress" && slave.preg >= slave.pregData.minLiveBirth && slave.health.condition > -50) {
				slave.pregControl = "labor suppressors";
				r += `<br>${slave.slaveName} is ready to birth, so ${he} has been put on labor suppressing agents.`;
			} else if (rule.pregSpeed === "stimulate" && slave.preg > slave.pregData.minLiveBirth && slave.health.condition > -50) {
				slave.labor = 1;
				slave.induce = 1;
				V.birthee = 1;
				r += `<br>${slave.slaveName} is ready to birth, so ${his} labor has been stimulated.`;
			} else if (rule.pregSpeed === "fast" && slave.pregControl === "speed up" && slave.health.condition <= -50) {
				slave.pregControl = "none";
				r += `<br>${slave.slaveName} is on rapid gestation agents and dangerously unhealthy, so ${his} agent regimen has been stopped.`;
			} else if (rule.pregSpeed === "suppress" && slave.pregControl === "labor suppressors" && slave.health.condition <= -50) {
				slave.pregControl = "none";
				r += `<br>${slave.slaveName} is on labor suppression agents and unhealthy, so ${his} agent regimen has been stopped.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessLivingStandard(slave, rule) {
		if ((rule.livingRules !== undefined) && (rule.livingRules !== null)) {
			if (setup.facilityCareers.includes(slave.assignment)) {
				r += ""; // `<br>${slave.slaveName}'s living standards are controlled by ${his} assignment.`;
			} else if (((slave.assignment === "be your Head Girl") && (V.HGSuite === 1)) || ((slave.assignment === "guard you") && (V.dojo > 1))) {
				r += `<br>${slave.slaveName} has a private room.`;
			} else if ((slave.fetish === "mindbroken")) {
				if ((slave.rules.living !== "spare")) {
					slave.rules.living = "spare";
					r += `<br>Since ${slave.slaveName} is mindbroken, ${his} living standard has been set to spare.`;
				}
			} else if (slave.rules.living !== rule.livingRules) {
				if (rule.livingRules !== "luxurious") {
					if (V.roomsPopulation <= V.rooms - 0.5) {
						slave.rules.living = rule.livingRules;
						r += `<br>${slave.slaveName}'s living standard has been set to ${rule.livingRules}.`;
						if (slave.relationship >= 4) {
							V.roomsPopulation += 0.5;
						} else {
							V.roomsPopulation += 1;
						}
					} else {
						slave.rules.living = "normal";
						r += `<br>${slave.slaveName}'s living standard has been set to normal, since there is no room for ${him} to occupy.`;
					}
				} else {
					slave.rules.living = rule.livingRules;
					r += `<br>${slave.slaveName}'s living standard has been set to ${rule.livingRules}.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessSpeech(slave, rule) {
		if ((rule.speechRules !== undefined) && (rule.speechRules !== null) && (slave.rules.speech !== rule.speechRules)) {
			if (slave.fetish === "mindbroken") {
				if ((slave.rules.speech !== "restrictive")) {
					slave.rules.speech = "restrictive";
					r += `<br>Since ${slave.slaveName} is mindbroken, ${his} speech rules have been set to restrictive.`;
				}
			} else if (slave.accent === 4) {
				if (rule.speechRules === "accent elimination" && slave.rules.speech !== "language lessons") {
					slave.rules.speech = "language lessons";
					r += `<br>Since ${slave.slaveName} does not know how to talk, ${his} speech rules have been set to language learning.`;
				} else {
					slave.rules.speech = "restrictive";
					r += `<br>Since ${slave.slaveName} does not know how to talk, ${his} speech rules have been set to restrictive.`;
				}
			} else if (rule.speechRules === "accent elimination") {
				if (slave.accent > 0) {
					slave.rules.speech = "accent elimination";
					r += `<br>${slave.slaveName}'s speech rules have been set to ${rule.speechRules}.`;
				} else {
					slave.rules.speech = "restrictive";
					r += `<br>Since ${slave.slaveName} has no accent, ${his} speech rules have been set to restrictive.`;
				}
			} else if (slave.rules.speech !== rule.speechRules) {
				slave.rules.speech = rule.speechRules;
				r += `<br>${slave.slaveName}'s speech rules have been set to ${rule.speechRules}.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessRelationship(slave, rule) {
		if ((slave.fetish !== "mindbroken")) {
			if ((rule.relationshipRules !== undefined) && (rule.relationshipRules !== null)) {
				if (slave.rules.relationship !== rule.relationshipRules ) {
					slave.rules.relationship = rule.relationshipRules;
					r += `<br>${slave.slaveName}'s relationship rules have been set to ${rule.relationshipRules}.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessRelease(slave, rule) {
		if ((rule.releaseRules !== undefined) && (rule.releaseRules !== null)) {
			let changed = false;
			let processReleaseProp = (property) => {
				if (rule.releaseRules[property] !== undefined && rule.releaseRules[property] !== null) {
					if (slave.rules.release[property] !== rule.releaseRules[property]) {
						slave.rules.release[property] = rule.releaseRules[property];
						return true;
					}
				}
				return false;
			};
			changed |= processReleaseProp('masturbation');
			changed |= processReleaseProp('partner');
			changed |= processReleaseProp('family');
			changed |= processReleaseProp('slaves');
			changed |= processReleaseProp('master');
			if (changed) {
				r += `<br>${slave.slaveName}'s release rules have been set to: ${App.Utils.releaseSummaryLong(slave)}.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessPunishment(slave, rule) {
		if ((rule.standardPunishment !== undefined) && (rule.standardPunishment !== null)) {
			if (slave.rules.punishment !== rule.standardPunishment) {
				slave.rules.punishment = rule.standardPunishment;
				r += `<br>${slave.slaveName}'s typical punishment has been updated to ${rule.standardPunishment}.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessReward(slave, rule) {
		if ((rule.standardReward !== undefined) && (rule.standardReward !== null)) {
			if (slave.rules.reward !== rule.standardReward) {
				slave.rules.reward = rule.standardReward;
				r += `<br>${slave.slaveName}'s typical reward has been updated to ${rule.standardReward}.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessToyHole(slave, rule) {
		if ((rule.toyHole !== undefined) && (rule.toyHole !== null)) {
			if (rule.toyHole === "pussy") {
				if (slave.vagina > 0 && canDoVaginal(slave)) {
					slave.toyHole = rule.toyHole;
					r += `<br>${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`;
				} else if (slave.toyHole !== "all her holes") {
					slave.toyHole = "all her holes";
					r += `<br>${slave.slaveName}'s hole preference has defaulted to all ${his} holes.`;
				}
			} else if (rule.toyHole === "ass") {
				if (slave.anus > 0 && canDoAnal(slave)) {
					slave.toyHole = rule.toyHole;
					r += `<br>${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`;
				} else if (slave.toyHole !== "all her holes") {
					slave.toyHole = "all her holes";
					r += `<br>${slave.slaveName}'s hole preference has defaulted to all ${his} holes.`;
				}
			} else if (rule.toyHole === "dick") {
				if (slave.dick > 0 && canPenetrate(slave)) {
					slave.toyHole = rule.toyHole;
					r += `<br>${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`;
				} else if (slave.toyHole !== "all her holes") {
					slave.toyHole = "all her holes";
					r += `<br>${slave.slaveName}'s hole preference has defaulted to all ${his} holes.`;
				}
			} else if (slave.toyHole !== rule.toyHole) {
				slave.toyHole = rule.toyHole;
				r += `<br>${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessDietCum(slave, rule) {
		if ((rule.dietCum !== undefined) && (rule.dietCum !== null)) {
			if (slave.dietCum !== rule.dietCum) {
				slave.dietCum = rule.dietCum;
				if (slave.dietCum === 2) {
					r += `<br>${slave.slaveName} has been put on a diet based on cum.`;
					slave.dietMilk = 0;
				} else if (slave.dietCum === 1) {
					r += `<br>${slave.slaveName} has had cum added to ${his} diet.`;
				} else {
					r += `<br>${slave.slaveName} has had cum removed from ${his} diet.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessDietMilk(slave, rule) {
		if ((rule.dietMilk !== undefined) && (rule.dietMilk !== null)) {
			if (slave.dietMilk !== rule.dietMilk) {
				slave.dietMilk = rule.dietMilk;
				if (slave.dietMilk === 2) {
					r += `<br>${slave.slaveName} has been put on a diet based on human milk.`;
					slave.dietCum = 0;
				} else if (slave.dietMilk === 1) {
					r += `<br>${slave.slaveName} has had human milk added to ${his} diet.`;
				} else {
					r += `<br>${slave.slaveName} has had human milk removed from ${his} diet.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessSolidFood(slave, rule) {
		if ((rule.onDiet !== undefined) && (rule.onDiet !== null)) {
			if (slave.onDiet !== rule.onDiet) {
				slave.onDiet = rule.onDiet;
				if (slave.onDiet === 1) {
					r += `<br>${slave.slaveName} is not permitted to eat the solid slave food.`;
				} else {
					r += `<br>${slave.slaveName} is permitted to eat the solid slave food.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessTeeth(slave, rule) {
		if ((rule.teeth !== undefined) && (rule.teeth !== null)) {
			if ((rule.teeth === "universal")) {
				if ((slave.teeth === "crooked")) {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					r += `<br>${slave.slaveName} has been given braces for ${his} crooked teeth.`;
				} else if (slave.teeth === "gapped") {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					r += `<br>${slave.slaveName} has been given braces to close the gap in ${his} teeth.`;
				} else if ((slave.teeth === "normal")) {
					slave.teeth = "cosmetic braces";
					cashX(forceNeg(V.modCost), "slaveSurgery", slave);
					r += `<br>${slave.slaveName} has been given cosmetic braces.`;
				}
			} else if ((rule.teeth === "straighten")) {
				if ((slave.teeth === "crooked")) {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					r += `<br>${slave.slaveName} has been given braces for ${his} crooked teeth.`;
				} else if (slave.teeth === "gapped") {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					r += `<br>${slave.slaveName} has been given braces to close the gap in ${his} teeth.`;
				} else if ((slave.teeth === "cosmetic braces")) {
					slave.teeth = "normal";
					r += `<br>${slave.slaveName} has had ${his} braces removed, since ${his} teeth are straight.`;
				}
			} else if ((rule.teeth === "none")) {
				if ((slave.teeth === "straightening braces")) {
					slave.teeth = "crooked";
					r += `<br>${slave.slaveName} has had ${his} braces removed.`;
				} else if ((slave.teeth === "cosmetic braces")) {
					slave.teeth = "normal";
					r += `<br>${slave.slaveName} has had ${his} braces removed.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessStyle(slave, rule) {
		if (rule.eyeColor !== undefined && (rule.eyeColor !== null)) {
			if (getLeftEyeColor(slave) !== rule.eyeColor || getRightEyeColor(slave) !== rule.eyeColor) {
				setEyeColor(slave, rule.eyeColor);
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName} has been given ${rule.eyeColor} contact lenses.`;
			}
		}

		if (rule.makeup !== undefined && (rule.makeup !== null)) {
			if (slave.makeup !== rule.makeup) {
				slave.makeup = rule.makeup;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName} has been assigned the standard makeup.`;
			}
		}

		if (hasAnyArms(slave)) {
			if (rule.nails !== undefined && (rule.nails !== null)) {
				if (slave.nails !== rule.nails) {
					slave.nails = rule.nails;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName} has been assigned the standard nails.`;
				}
			}
		}

		if (rule.hColor !== undefined && (rule.hColor !== null)) {
			if (slave.bald !== 1) {
				if (slave.hColor !== rule.hColor) {
					slave.hColor = rule.hColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s hair has been dyed ${rule.hColor}.`;
				}
			}
		}

		if (rule.hornColor !== undefined && (rule.hornColor !== null)) {
			if (slave.horn !== "none") {
				if (slave.hornColor !== rule.hornColor) {
					slave.hornColor = rule.hornColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s horns has been dyed ${rule.hornColor}.`;
				}
			}
		}

		if (rule.hStyle !== undefined && (rule.hStyle !== null)) {
			if (slave.bald !== 1) {
				if (slave.hStyle !== rule.hStyle) {
					slave.hStyle = rule.hStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					if ((rule.hStyle === "shaved")) {
						slave.hLength = 0;
						r += `<br>${slave.slaveName}'s hair has been shaved.`;
					} else {
						r += `<br>${slave.slaveName}'s hair has been restyled.`;
					}
				}
			}
		}

		if (rule.hLength !== undefined && (rule.hLength !== null)) {
			if (slave.bald !== 1) {
				if (slave.hLength !== rule.hLength) {
					if (slave.hLength > rule.hLength) {
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						r += `<br>${slave.slaveName}'s hair has been cut; it `;
					} else {
						cashX(forceNeg(V.modCost * Math.trunc((rule.hLength - slave.hLength) / 10)), "slaveMod", slave);
						r += `<br>${slave.slaveName} has been given extensions; ${his} hair `;
					}
					r += `is now ${lengthToEitherUnit(rule.hLength)} long.`;
					slave.hLength = rule.hLength;
				}
			}
		}

		if (rule.haircuts !== undefined && (rule.haircuts !== null)) {
			if (slave.bald !== 1) {
				if (rule.haircuts === 1 && slave.haircuts !== 1) {
					r += `<br>${slave.slaveName}'s hair will now be maintained at ${lengthToEitherUnit(slave.hLength)} long.`;
					slave.haircuts = 1;
				} else if (rule.haircuts === 0 && slave.haircuts !== 0) {
					r += `<br>${slave.slaveName}'s hair length will no longer be maintained.`;
					slave.haircuts = 0;
				}
			}
		}

		if (rule.eyebrowHColor !== undefined && (rule.eyebrowHColor !== null)) {
			if (slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "hairless") {
				if (slave.eyebrowHColor !== rule.eyebrowHColor) {
					slave.eyebrowHColor = rule.eyebrowHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrow hair, if present, has been dyed ${rule.eyebrowHColor}.`;
				}
			}
		}

		if (rule.eyebrowHStyle !== undefined && (rule.eyebrowHStyle !== null)) {
			if (slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "hairless") {
				if (slave.eyebrowHStyle !== rule.eyebrowHStyle) {
					slave.eyebrowHStyle = rule.eyebrowHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrow hair has been restyled; they are now ${rule.eyebrowHStyle}.`;
				}
			}
		}

		if (rule.eyebrowFullness !== undefined && (rule.eyebrowFullness !== null)) {
			if (slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "hairless") {
				if (slave.eyebrowFullness !== rule.eyebrowFullness) {
					slave.eyebrowFullness = rule.eyebrowFullness;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrow hair thickness has been adjusted; they are now ${rule.eyebrowFullness}.`;
				}
			}
		}

		if (rule.pubicHColor !== undefined && (rule.pubicHColor !== null)) {
			if (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless") {
				if (slave.pubicHColor !== rule.pubicHColor) {
					slave.pubicHColor = rule.pubicHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s pubic hair, if present, has been dyed ${rule.pubicHColor}.`;
				}
			}
		}

		if (rule.pubicHStyle !== undefined && (rule.pubicHStyle !== null)) {
			if (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless") {
				if (slave.pubicHStyle !== rule.pubicHStyle) {
					slave.pubicHStyle = rule.pubicHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s pubic hair has been restyled; it is now ${rule.pubicHStyle}.`;
				}
			}
		}

		if (rule.underArmHColor !== undefined && (rule.underArmHColor !== null)) {
			if (slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") {
				if (slave.underArmHColor !== rule.underArmHColor) {
					slave.underArmHColor = rule.underArmHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s underarm hair, if present, has been dyed ${rule.underArmHColor}.`;
				}
			}
		}

		if (rule.underArmHStyle !== undefined && (rule.underArmHStyle !== null)) {
			if (slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") {
				if (slave.underArmHStyle !== rule.underArmHStyle) {
					slave.underArmHStyle = rule.underArmHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s underarm hair has been restyled; it is now ${rule.underArmHStyle}.`;
				}
			}
		}

		if (rule.eyebrowHColor !== undefined && (rule.eyebrowHColor !== null)) {
			if (slave.eyebrowHStyle !== "bald") {
				if (slave.eyebrowHColor !== rule.eyebrowHColor) {
					slave.eyebrowHColor = rule.eyebrowHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrow hair, if present, has been dyed ${rule.eyebrowHColor}.`;
				}
			}
		}

		if (rule.eyebrowHStyle !== undefined && (rule.eyebrowHStyle !== null)) {
			if (slave.eyebrowHStyle !== "bald") {
				if (slave.eyebrowHStyle !== rule.eyebrowHStyle) {
					slave.eyebrowHStyle = rule.eyebrowHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrow hair has been restyled; it is now ${rule.eyebrowHStyle}.`;
				}
			}
		}

		if (rule.eyebrowFullness !== undefined && (rule.eyebrowFullness !== null)) {
			if (slave.eyebrowHStyle !== "bald") {
				if (slave.eyebrowFullness !== rule.eyebrowFullness) {
					slave.eyebrowFullness = rule.eyebrowFullness;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrow hair has been reshaped; it is now ${rule.eyebrowFullness}.`;
				}
			}
		}

		if (rule.markings !== undefined && (rule.markings !== null)) {
			if (slave.markings === "beauty mark" && (rule.markings === "remove beauty marks" || rule.markings === "remove both")) {
				r += `<br>${slave.slaveName}'s beauty mark has been removed.`;
				slave.markings = "none";
				cashX(forceNeg(V.modCost), "slaveMod", slave);
			}
			if (slave.markings === "birthmark" && (rule.markings === "remove birthmarks" || rule.markings === "remove both")) {
				r += `<br>${slave.slaveName}'s birthmark has been bleached away.`;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				slave.markings = "none";
			}
		}

		if (rule.skinColor !== undefined && rule.skinColor !== null && rule.skinColor !== slave.skin) {
			if (rule.skinColor === "natural") {
				slave.skin = slave.origSkin;
				r += `<br>${slave.slaveName}'s skin color has been returned to ${slave.origSkin}.`;
			} else {
				slave.skin = rule.skinColor;
				r += `<br>${slave.slaveName}'s skin color has been set to ${rule.skinColor}.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessPiercings(slave, rule) {
		if (rule.nipplesPiercing !== undefined && (rule.nipplesPiercing !== null)) {
			if (slave.nipplesPiercing !== rule.nipplesPiercing) {
				if ((rule.nipplesPiercing === 0)) {
					slave.nipplesPiercing = 0;
					r += `<br>${slave.slaveName}'s nipple piercings have been removed.`;
				} else if (slave.nipples !== "fuckable") {
					slave.nipplesPiercing = rule.nipplesPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s nipples have been pierced.`;
				} else {
					r += `<br>${slave.slaveName}'s nipples are inverted and cannot be pierced.`;
				}
			}
		}

		if (rule.areolaePiercing !== undefined && (rule.areolaePiercing !== null)) {
			if (slave.areolaePiercing !== rule.areolaePiercing) {
				if ((rule.areolaePiercing === 0)) {
					slave.areolaePiercing = 0;
					r += `<br>${slave.slaveName}'s areolae piercings have been removed.`;
				} else {
					slave.areolaePiercing = rule.areolaePiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s areolae have been given stud piercings.`;
				}
			}
		}

		if (rule.clitPiercing !== undefined && (rule.clitPiercing !== null)) {
			if (slave.clitPiercing !== rule.clitPiercing) {
				if ((rule.clitPiercing === 0)) {
					slave.clitPiercing = 0;
					if (slave.dick > 0) {
						r += `<br>${slave.slaveName}'s frenulum piercing has been removed.`;
					} else {
						r += `<br>${slave.slaveName}'s clit piercing has been removed.`;
					}
				} else if ((slave.vagina !== -1) || (slave.dick !== 0)) {
					slave.clitPiercing = rule.clitPiercing;
					if (slave.dick > 0) {
						r += `<br>${slave.slaveName}'s frenulum has been pierced.`;
					} else {
						r += `<br>${slave.slaveName}'s clit has been pierced.`;
					}

					if (rule.clitPiercing === 3) {
						cashX(forceNeg(V.SPcost), "slaveMod", slave);
					} else {
						cashX(forceNeg(V.modCost), "slaveMod", slave);
					}
				}
			}
		}

		if ((slave.vagina !== -1)) {
			if (rule.vaginaPiercing !== undefined && (rule.vaginaPiercing !== null)) {
				if (slave.vaginaPiercing !== rule.vaginaPiercing) {
					if ((rule.vaginaPiercing === 0)) {
						slave.vaginaPiercing = 0;
						r += `<br>${slave.slaveName}'s labia piercings have been removed.`;
					} else {
						slave.vaginaPiercing = rule.vaginaPiercing;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						r += `<br>${slave.slaveName}'s pussylips have been pierced.`;
					}
				}
			}
		}

		if ((slave.dick > 0)) {
			if (rule.dickPiercing !== undefined && (rule.dickPiercing !== null)) {
				if (slave.dickPiercing !== rule.dickPiercing) {
					if ((rule.dickPiercing === 0)) {
						slave.dickPiercing = 0;
						r += `<br>${slave.slaveName}'s shaft piercings have been removed.`;
					} else {
						slave.dickPiercing = rule.dickPiercing;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						r += `<br>${slave.slaveName}'s shaft has been pierced.`;
					}
				}
			}
		}

		if (rule.anusPiercing !== undefined && (rule.anusPiercing !== null)) {
			if (slave.anusPiercing !== rule.anusPiercing) {
				if ((rule.anusPiercing === 0)) {
					slave.anusPiercing = 0;
					r += `<br>${slave.slaveName}'s asshole piercings have been removed.`;
				} else {
					slave.anusPiercing = rule.anusPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s asshole has been pierced.`;
				}
			}
		}

		if (rule.lipsPiercing !== undefined && (rule.lipsPiercing !== null)) {
			if (slave.lipsPiercing !== rule.lipsPiercing) {
				if ((rule.lipsPiercing === 0)) {
					slave.lipsPiercing = 0;
					r += `<br>${slave.slaveName}'s lip piercings have been removed.`;
				} else {
					slave.lipsPiercing = rule.lipsPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s lips have been pierced.`;
				}
			}
		}

		if (rule.tonguePiercing !== undefined && (rule.tonguePiercing !== null)) {
			if (slave.tonguePiercing !== rule.tonguePiercing) {
				if ((rule.tonguePiercing === 0)) {
					slave.tonguePiercing = 0;
					r += `<br>${slave.slaveName}'s tongue piercings have been removed.`;
				} else {
					slave.tonguePiercing = rule.tonguePiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s tongue has been pierced.`;
				}
			}
		}

		if (rule.earPiercing !== undefined && (rule.earPiercing !== null)) {
			if (slave.earPiercing !== rule.earPiercing) {
				if ((rule.earPiercing === 0)) {
					slave.earPiercing = 0;
					r += `<br>${slave.slaveName}'s ear piercings have been removed.`;
				} else {
					slave.earPiercing = rule.earPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s ears have been pierced.`;
				}
			}
		}

		if (rule.nosePiercing !== undefined && (rule.nosePiercing !== null)) {
			if (slave.nosePiercing !== rule.nosePiercing) {
				if ((rule.nosePiercing === 0)) {
					slave.nosePiercing = 0;
					r += `<br>${slave.slaveName}'s nose piercing has been removed.`;
				} else {
					slave.nosePiercing = rule.nosePiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s nose has been pierced.`;
				}
			}
		}

		if (rule.eyebrowPiercing !== undefined && (rule.eyebrowPiercing !== null)) {
			if (slave.eyebrowPiercing !== rule.eyebrowPiercing) {
				if ((rule.eyebrowPiercing === 0)) {
					slave.eyebrowPiercing = 0;
					r += `<br>${slave.slaveName}'s eyebrow piercings have been removed.`;
				} else {
					slave.eyebrowPiercing = rule.eyebrowPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s eyebrows have been pierced.`;
				}
			}
		}

		if (rule.navelPiercing !== undefined && (rule.navelPiercing !== null)) {
			if (slave.navelPiercing !== rule.navelPiercing) {
				if ((rule.navelPiercing === 0)) {
					slave.navelPiercing = 0;
					r += `<br>${slave.slaveName}'s navel piercing have been removed.`;
				} else {
					slave.navelPiercing = rule.navelPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s navel has been pierced.`;
				}
			}
		}

		if (rule.corsetPiercing !== undefined && (rule.corsetPiercing !== null)) {
			if (slave.corsetPiercing !== rule.corsetPiercing) {
				if ((rule.corsetPiercing === 0)) {
					slave.corsetPiercing = 0;
					r += `<br>${slave.slaveName}'s corset piercings have been removed.`;
				} else {
					slave.corsetPiercing = rule.corsetPiercing;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName} has been given a set of corset piercings.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessSmartPiercings(slave, rule) {
		if ((slave.clitPiercing === 3)) {
			let _used = 0;
			if (rule.clitSetting !== undefined && (rule.clitSetting !== null)) {
				if (slave.clitSetting !== rule.clitSetting) {
					slave.clitSetting = rule.clitSetting;
					_used = 1;
					r += `<br>${slave.slaveName}'s smart piercing has been set to ${slave.clitSetting}.`;
				} else if (slave.fetishStrength < 100) {
					_used = 1;
				}
			}
			if (_used === 0) {
				if (rule.clitSettingEnergy !== undefined && (rule.clitSettingEnergy !== null)) {
					if (slave.energy < rule.clitSettingEnergy) {
						if (slave.clitSetting !== "all") {
							r += `<br>${slave.slaveName}'s smart piercing has been set to enhance libido.`;
						}
						slave.clitSetting = "all";
						_used = 1;
					} else if (slave.energy >= rule.clitSettingEnergy + 10) {
						if (slave.clitSetting !== "none") {
							r += `<br>${slave.slaveName}'s smart piercing has been set to suppress libido.`;
						}
						slave.clitSetting = "none";
						_used = 1;
					}
				}
			}
			if (_used === 0) {
				if (rule.clitSettingXY !== undefined && (rule.clitSettingXY !== null)) {
					if (slave.attrXY < rule.clitSettingXY) {
						if (slave.clitSetting !== "men") {
							r += `<br>${slave.slaveName}'s smart piercing has been set to encourage attraction to men.`;
						}
						slave.clitSetting = "men";
						_used = 1;
					} else if (slave.attrXY >= rule.clitSettingXY + 10) {
						if (slave.clitSetting !== "anti-men") {
							r += `<br>${slave.slaveName}'s smart piercing has been set to discourage attraction to men.`;
						}
						slave.clitSetting = "anti-men";
						_used = 1;
					}
				}
			}
			if (_used === 0) {
				if (rule.clitSettingXX !== undefined && (rule.clitSettingXX !== null)) {
					if (slave.attrXX < rule.clitSettingXX) {
						if (slave.clitSetting !== "women") {
							r += `<br>${slave.slaveName}'s smart piercing has been set to encourage attraction to women.`;
						}
						slave.clitSetting = "women";
						_used = 1;
					} else if (slave.attrXX >= rule.clitSettingXX + 10) {
						if (slave.clitSetting !== "anti-women") {
							r += `<br>${slave.slaveName}'s smart piercing has been set to discourage attraction to women.`;
						}
						slave.clitSetting = "anti-women";
						_used = 1;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessTattoos(slave, rule) {
		if (rule.boobsTat !== undefined && (rule.boobsTat !== null)) {
			if (slave.boobsTat !== rule.boobsTat) {
				slave.boobsTat = rule.boobsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s chest has been tattooed.`;
			}
		}

		if (rule.buttTat !== undefined && (rule.buttTat !== null)) {
			if (slave.buttTat !== rule.buttTat) {
				slave.buttTat = rule.buttTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s butt has been tattooed.`;
			}
		}

		if (rule.vaginaTat !== undefined && (rule.vaginaTat !== null)) {
			if (slave.vaginaTat !== rule.vaginaTat) {
				slave.vaginaTat = rule.vaginaTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s abdomen has been tattooed.`;
			}
		}

		if ((slave.dick > 0)) {
			if (rule.dickTat !== undefined && (rule.dickTat !== null)) {
				if (slave.dickTat !== rule.dickTat) {
					slave.dickTat = rule.dickTat;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					r += `<br>${slave.slaveName}'s dick has been tattooed.`;
				}
			}
		}

		if (rule.lipsTat !== undefined && (rule.lipsTat !== null)) {
			if (slave.lipsTat !== rule.lipsTat) {
				slave.lipsTat = rule.lipsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s face has been tattooed.`;
			}
		}

		if (rule.anusTat !== undefined && (rule.anusTat !== null)) {
			if (slave.anusTat !== rule.anusTat) {
				slave.anusTat = rule.anusTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s asshole has been modded.`;
			}
		}

		if (rule.backTat !== undefined && (rule.backTat !== null)) {
			if (slave.backTat !== rule.backTat) {
				slave.backTat = rule.backTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s back has been tattooed.`;
			}
		}

		if (rule.shouldersTat !== undefined && (rule.shouldersTat !== null)) {
			if (slave.shouldersTat !== rule.shouldersTat) {
				slave.shouldersTat = rule.shouldersTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s shoulders have been tattooed.`;
			}
		}

		if (rule.armsTat !== undefined && (rule.armsTat !== null)) {
			if (slave.armsTat !== rule.armsTat) {
				slave.armsTat = rule.armsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s `;
				if (hasBothArms(slave)) {
					r += `arms have`;
				} else {
					r += `arm has`;
				}
				r += ` been tattooed.`;
			}
		}

		if (rule.legsTat !== undefined && (rule.legsTat !== null)) {
			if (slave.legsTat !== rule.legsTat) {
				slave.legsTat = rule.legsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s legs have been tattooed.`;
			}
		}

		if (rule.stampTat !== undefined && (rule.stampTat !== null)) {
			if (slave.stampTat !== rule.stampTat) {
				slave.stampTat = rule.stampTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				r += `<br>${slave.slaveName}'s lower back has been tattooed.`;
			}
		}
		if (rule.birthsTat !== undefined && (rule.birthsTat !== null)) {
			if (slave.birthsTat !== rule.birthsTat) {
				if (rule.birthsTat === "remove") {
					if (slave.birthsTat > 0) {
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						r += `<br>${slave.slaveName}'s birth tallies have been removed.`;
					} else if (slave.birthsTat > -1) {
						r += `<br>${slave.slaveName} will no longer be tattooed with each birth.`;
					}
					slave.birthsTat = -1;
				} else if (slave.birthsTat > 0) {
					r += `<br>${slave.slaveName} will not be tattooed with each birth.`;
				} else {
					r += `<br>${slave.slaveName} will be tattooed with each birth.`;
				}
				slave.birthsTat = rule.birthsTat;
			}
		}
		if (rule.abortionTat !== undefined && (rule.abortionTat !== null)) {
			if (slave.abortionTat !== rule.abortionTat) {
				if (rule.abortionTat === "remove") {
					if (slave.abortionTat > 0) {
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						r += `<br>${slave.slaveName}'s abortion tallies have been removed.`;
					} else if (slave.abortionTat > -1) {
						r += `<br>${slave.slaveName} will no longer be tattooed with each abortion and miscarriage.`;
					}
					slave.abortionTat = -1;
				} else if (slave.birthsTat > 0) {
					r += `<br>${slave.slaveName} will not be tattooed with each abortion and miscarriage.`;
				} else {
					r += `<br>${slave.slaveName} will be tattooed with each abortion and miscarriage.`;
				}
				slave.abortionTat = rule.abortionTat;
			}
		}
		if ((rule.autoBrand === 1)) {
			if ((slave.health.condition > -20)) {
				let brandPlace = "";
				let left;
				let right;

				// Brand location needs to be split into a left and right
				if (["ankles", "calves", "feet", "hands", "lower arms", "shoulders", "upper arms", "wrists", "cheeks", "ears", "buttocks", "breasts"].includes(rule.brandTarget)) {
					if (rule.brandTarget === "ankles") {
						left = "left ankle";
						right = "right ankle";
					} else if (rule.brandTarget === "calves") {
						left = "left calf";
						right = "right calf";
					} else if (rule.brandTarget === "feet") {
						left = "left foot";
						right = "right foot";
					} else if (rule.brandTarget === "hands") {
						left = "left hand";
						right = "right hand";
					} else if (rule.brandTarget === "lower arms") {
						left = "left lower arm";
						right = "right lower arm";
					} else if (rule.brandTarget === "shoulders") {
						left = "left shoulder";
						right = "right shoulder";
					} else if (rule.brandTarget === "upper arms") {
						left = "left upper arm";
						right = "right upper arm";
					} else if (rule.brandTarget === "wrists") {
						left = "left wrist";
						right = "right wrist";
					} else if (rule.brandTarget === "cheeks") {
						left = "left cheek";
						right = "right cheek";
					} else if (rule.brandTarget === "ears") {
						left = "left ear";
						right = "right ear";
					} else if (rule.brandTarget === "buttocks") {
						left = "left buttock";
						right = "right buttock";
					} else if (rule.brandTarget === "breasts") {
						left = "left breast";
						right = "right breast";
					}
					if (rule.brandDesign !== slave.brand[left] && rule.brandDesign !== slave.brand[right]) {
						brandPlace = "both";
					} else if (rule.brandDesign !== slave.brand[left]) {
						brandPlace = "left";
					} else if (rule.brandDesign !== slave.brand[right]) {
						brandPlace = "right";
					}

					// Check for amputations:
					if (["upper arms", "lower arms", "wrists", "hands"].includes(rule.brandTarget)) {
						// Arms
						if (!hasAnyArms(slave)) {
							brandPlace = "";
						} else if (!hasLeftArm(slave)) {
							if (brandPlace === "both") {
								brandPlace = "right";
							}
							if (brandPlace === "left") {
								brandPlace = "";
							}
						} else if (!hasRightArm(slave)) {
							if (brandPlace === "both") {
								brandPlace = "left";
							}
							if (brandPlace === "right") {
								brandPlace = "";
							}
						}
					} else if (["thighs", "calves", "ankles", "feet"].includes(rule.brandTarget)) {
						// Legs
						if (!hasAnyLegs(slave)) {
							brandPlace = "";
						} else if (!hasLeftLeg(slave)) {
							if (brandPlace === "both") {
								brandPlace = "right";
							}
							if (brandPlace === "left") {
								brandPlace = "";
							}
						} else if (!hasRightLeg(slave)) {
							if (brandPlace === "both") {
								brandPlace = "left";
							}
							if (brandPlace === "right") {
								brandPlace = "";
							}
						}
					} else if (["ears"].includes(rule.brandTarget)) {
						// Ears
						if (slave.earShape === "none") {
							brandPlace = "";
						}
					}

				// Brand location does NOT need to be split into a left and right, (and may or may not contain left OR right already.)
				} else if (slave.brand[rule.brandTarget] !== rule.brandDesign) {
					if (
						(!hasLeftArm(slave) && ["left upper arm", "left lower arm", "left wrist", "left hand"].includes(rule.brandTarget)) ||
						(!hasRightArm(slave) && ["right upper arm", "right lower arm", "right wrist", "right hand"].includes(rule.brandTarget)) ||
						(!hasLeftLeg(slave) && ["left thigh", "left calf", "left ankle", "left foot"].includes(rule.brandTarget)) ||
						(!hasRightLeg(slave) && ["right thigh", "right calf", "right ankle", "right foot"].includes(rule.brandTarget)) ||
						(slave.earShape === "none" && ["left ear"].includes(rule.brandTarget)) ||
						(slave.earShape === "none" && ["right ear"].includes(rule.brandTarget))
					) {
						brandPlace = "";
					} else {
						brandPlace = "anywhere";
					}
				}

				// Apply brands:
				if (["left", "right", "anywhere"].includes(brandPlace)) {
					healthDamage(slave, 10);
					r += `<br>${slave.slaveName} has been branded on the `;
					if (brandPlace === "left") {
						slave.brand[left] = rule.brandDesign;
						r += `${left}`;
					} else if (brandPlace === "right") {
						slave.brand[right] = rule.brandDesign;
						r += `${right}`;
					} else if (brandPlace === "anywhere") {
						slave.brand[rule.brandTarget] = rule.brandDesign;
						r += `${rule.brandTarget}`;
					}
					r += `, with <span class="trust dec">fear</span>${slave.devotion < 18 ? `, <span class="devotion dec">regard,</span>` : ``} and <span class="red">health</span> consequences.`;
					if (slave.devotion < 18) {
						slave.devotion -= 5;
					}
					slave.trust -= 5;
				} else if (brandPlace === "both") {
					slave.brand[left] = rule.brandDesign;
					slave.brand[right] = rule.brandDesign;
					healthDamage(slave, 20);
					r += `<br>${slave.slaveName} has been branded on both ${rule.brandTarget}, with <span class="trust dec">fear</span>${slave.devotion < 18 ? `, <span class="devotion dec">regard,</span>` : ``} and <span class="red">health</span> consequences.`;
					if ((slave.devotion < 18)) {
						slave.devotion -= 10;
					}
					slave.trust -= 10;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessPornFeedEnabled(slave, rule) {
		if (rule.pornFeed === undefined || rule.pornFeed == null) {
			return;
		}
		if (rule.pornFeed === slave.porn.feed) {
			return;
		}
		slave.porn.feed = rule.pornFeed;
		let yesno = slave.porn.feed ? "are now" : "are no longer";
		if (slave.porn.feed === 0) {
			slave.porn.spending = 0;
		}
		r += `<br>Highlights of ${slave.slaveName}'s sex life ${yesno} being released.`;
	}

	/** @param {App.Entity.SlaveState} slave */
	function ProcessPorn(slave, rule) {
		if ((rule.pornFameSpending !== undefined) && (rule.pornFameSpending !== null)) {
			if ((slave.porn.prestige < 3)) {
				if (slave.porn.spending !== rule.pornFameSpending) {
					slave.porn.spending = rule.pornFameSpending;
					r += `<br>${slave.slaveName}'s porn publicity has been corrected.`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.RA.RuleSetters} rule
	 */
	function ProcessLabel(slave, rule) {
		// mass removal of old tags, variant from '*' mask.
		if (rule.removeLabel !== null && rule.removeLabel !== '' && rule.removeLabel === '*') {
			slave.custom.label = slave.custom.label.replace(/(?:\[.+\])+/, "");
			r += `<br>All of ${slave.slaveName}'s tags have been removed.`;
		}

		// mass removal of old tags, variant from GUI swith.
		if (rule.labelTagsClear === true) {
			slave.custom.label = slave.custom.label.replace(/(?:\[.+\])+/, "");
			r += `<br>All of ${slave.slaveName}'s tags have been removed.`;
		}

		// removing tags selected for removal.
		let tags = [], i;
		if (rule.removeLabel != null && rule.removeLabel !== '') {
			tags = rule.removeLabel.split("|");
		}

		for (i in tags) {
			if (tags[i] !== null && tags[i] !== '' && slave.custom.label.includes(`[${tags[i]}]`)) {
				slave.custom.label = slave.custom.label.replace(`[${tags[i]}]`, "");
				r += `<br>${slave.slaveName}'s tag [${tags[i]}] is removed.`;
			}
		}

		// finally adding new tags.
		tags = [];
		if (rule.label != null && rule.label !== '') {
			tags = rule.label.split("|");
		}

		for (i in tags) {
			if (tags[i] != null && tags[i] !== '' && !slave.custom.label.includes(`[${tags[i]}]`)) {
				slave.custom.label = `${slave.custom.label}[${tags[i]}]`;
				r += `<br>${slave.slaveName} has been tagged as ${tags[i]}`;
			}
		}
	}

	const rxCheckEqual = /[^!=<>]=[^=<>]/gi;
	const compileCheck = function(code) {
		try {
			// TODO: This should use a cached Function, which should be the same as below.
			new Function(`return ${code}`);
		} catch (e) {
			return false;
		}
		return true;
	};
	window.RuleHasError = (rule) => rule.condition.function === "custom"
								 && (rule.condition.data.match(rxCheckEqual)
								 || !compileCheck(rule.condition.data));
	window.DefaultRulesError = () => V.defaultRules.some(r => RuleHasError(r));
	return DefaultRules;
})();
