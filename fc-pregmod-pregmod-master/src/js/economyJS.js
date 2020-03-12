window.LivingRule = Object.freeze({LUXURIOUS: 'luxurious', NORMAL: 'normal', SPARE: 'spare'});
window.Job = Object.freeze({
	DAIRY: 'work in the dairy',
	MILKMAID: 'be the Milkmaid',
	MASTER_SUITE: 'serve in the master suite',
	CONCUBINE: 'be your Concubine',
	BABY_FACTORY: 'labor in the production line',
	BROTHEL: 'work in the brothel',
	MADAM: 'be the Madam',
	ARCADE: 'be confined in the arcade',
	SERVANT: 'work as a servant',
	SERVER: 'be a servant',
	STEWARD: 'be the Stewardess',
	CLUB: 'serve in the club',
	DJ: 'be the DJ',
	JAIL: 'be confined in the cellblock',
	WARDEN: 'be the Wardeness',
	CLINIC: 'get treatment in the clinic',
	NURSE: 'be the Nurse',
	HGTOY: 'live with your Head Girl',
	SCHOOL: 'learn in the schoolroom',
	TEACHER: 'be the Schoolteacher',
	SPA: 'rest in the spa',
	ATTEND: 'be the Attendant',
	NANNY: 'work as a nanny',
	MATRON: 'be the Matron',
	FARMYARD: 'work as a farmhand',
	FARMER: 'be the Farmer',
	REST: 'rest'
});
window.PersonalAttention = Object.freeze({
	TRADE: 'trading',
	WAR: 'warfare',
	SLAVING: 'slaving',
	ENGINEERING: 'engineering',
	MEDICINE: 'medicine',
	MAID: 'upkeep',
	HACKING: 'hacking'
});

window.calculateCosts = (function() {
	return {
		predict: predictCost,
		bill: getCost,
	};

	function predictCost() {
		let totalCosts = (
			getBrothelCosts() +
	getBrothelAdsCosts() +
	getArcadeCosts() +
	getClubCosts() +
	getClubAdsCosts() +
	getDairyCosts() +
	getIncubatorCosts() +
	getServantsQuartersCosts() +
	getMasterSuiteCosts() +
	getNurseryCosts() +
	getFarmyardCosts() +
	getSecurityExpansionCost() +
	getLifestyleCosts() +
	getFSCosts() +
	getCitizenOrphanageCosts() +
	getPrivateOrphanageCosts() +
	getPeacekeeperCosts() +
	getMercenariesCosts() +
	getMenialRetirementCosts() +
	getRecruiterCosts() +
	getSchoolCosts() +
	getPolicyCosts() +
	getProstheticsCosts() +
	getPCTrainingCosts() +
	getPCCosts() +
	predictTotalSlaveCosts()
		);

		// these two apply a multiplicative effect to all costs so far.
		totalCosts = getEnvironmentCosts(totalCosts);
		totalCosts = getPCMultiplierCosts(totalCosts);

		// in the old order these were applied after multiplication. Not sure if deliberate, but I'm leaving it for now.
		totalCosts += getSFCosts() + getWeatherCosts();
		/*
		// clean up
		if (totalCosts > 0) {
			totalCosts = 0;
		} else {
			totalCosts = Math.ceil(totalCosts);
		}
		*/
		return totalCosts;
	}

	function getCost() {
		const oldCash = State.variables.cash;
		cashX(forceNeg(getBrothelCosts()), "brothel");
		cashX(forceNeg(getBrothelAdsCosts()), "brothelAds");
		cashX(forceNeg(getArcadeCosts()), "arcade");
		cashX(forceNeg(getClubCosts()), "club");
		cashX(forceNeg(getClubAdsCosts()), "brothelAds");
		cashX(forceNeg(getDairyCosts()), "dairy");
		cashX(forceNeg(getIncubatorCosts()), "incubator");
		cashX(forceNeg(getServantsQuartersCosts()), "servantsQuarters");
		cashX(forceNeg(getMasterSuiteCosts()), "masterSuite");
		cashX(forceNeg(getNurseryCosts()), "nursery");
		cashX(forceNeg(getFarmyardCosts()), "farmyard");
		cashX(forceNeg(getSecurityExpansionCost()), "securityExpansion");
		cashX(forceNeg(getLifestyleCosts()), "personalLivingExpenses");
		cashX(forceNeg(getFSCosts()), "futureSocieties");
		cashX(forceNeg(getCitizenOrphanageCosts()), "citizenOrphanage");
		cashX(forceNeg(getPrivateOrphanageCosts()), "privateOrphanage");
		cashX(forceNeg(getPeacekeeperCosts()), "peacekeepers");
		cashX(forceNeg(getMercenariesCosts()), "mercenaries");
		cashX(forceNeg(getMenialRetirementCosts()), "menialRetirement");
		cashX(forceNeg(getRecruiterCosts()), "recruiter");
		cashX(forceNeg(getSchoolCosts()), "schoolBacking");
		cashX(forceNeg(getPolicyCosts()), "policies");
		cashX(forceNeg(getProstheticsCosts()), "lab");
		cashX(forceNeg(getPCTrainingCosts()), "PCtraining");
		cashX(forceNeg(getPCCosts()), "PCmedical");
		getTotalSlaveCosts();


		// these two apply a multiplicative effect to all costs so far.
		// Calculate what the deduced expenses would be, then subtract
		let costSoFar = (oldCash - State.variables.cash); // How much we have spent by this point; expected to be positive.
		cashX(costSoFar - getEnvironmentCosts(costSoFar), "environment"); // getEnv takes total costs and makes it worse. Figure out how much worse and record it

		costSoFar = (oldCash - State.variables.cash);
		cashX(costSoFar - getPCMultiplierCosts(costSoFar), "PCskills");

		// in the old order these were applied after multiplication. Not sure if deliberate, but I'm leaving it for now.
		cashX(forceNeg(getSFCosts()), "specialForces");
		cashX(forceNeg(getWeatherCosts()), "weather");
		return (oldCash - State.variables.cash);
	}

	// slave expenses
	function predictTotalSlaveCosts() {
		const V = State.variables;
		let loopCosts = 0;
		let number = 0;
		for (const slave of V.slaves) {
			loopCosts += getSlaveCost(slave);
		}
		const reducibleUpkeep = Math.trunc(loopCosts * 0.2);
		V.ServQiIDs.forEach(ID => {
			number += getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]);
		});
		V.JobIDArray["be a servant"].forEach(ID => {
			number += getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]);
		});
		if (V.slaves.length > number) {
			loopCosts -= Math.trunc(reducibleUpkeep / V.slaves.length * number);
		} else {
			loopCosts -= reducibleUpkeep;
		}
		return loopCosts;
	}

	function getTotalSlaveCosts() {
		const V = State.variables;
		let slaveCost = 0;
		let slaveCostMinor = 0;
		let numberServed = 0;
		let loopCosts = 0;

		// Figure out how many slaves are effectively getting their upkeep reduced by 20%
		V.ServQiIDs.forEach(ID => {
			numberServed += getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]);
		});
		V.JobIDArray["be a servant"].forEach(ID => {
			numberServed += getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]);
		});

		// Find the total slave upkeep and pay for it
		for (const slave of V.slaves) {
			slaveCost = getSlaveCost(slave);
			loopCosts += slaveCost;
			cashX(forceNeg(slaveCost), "slaveUpkeep", slave);
		}

		// Calculate the servant reduction and credit them for it
		const reducibleUpkeep = Math.trunc(loopCosts * 0.2);
		V.ServQiIDs.forEach(ID => {
			if (V.slaves.length > numberServed) {
				slaveCostMinor = Math.trunc(reducibleUpkeep / V.slaves.length * getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]));
				cashX(Math.abs(slaveCostMinor), "houseServant", V.slaves[V.slaveIndices[ID]]);
			} else {
				slaveCostMinor = Math.trunc(reducibleUpkeep / numberServed * getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]));
				cashX(Math.abs(slaveCostMinor), "houseServant", V.slaves[V.slaveIndices[ID]]);
			}
		});
		V.JobIDArray["be a servant"].forEach(ID => {
			if (V.slaves.length > numberServed) {
				slaveCostMinor = Math.trunc(reducibleUpkeep / V.slaves.length * getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]));
				cashX(Math.abs(slaveCostMinor), "houseServant", V.slaves[V.slaveIndices[ID]]);
			} else {
				slaveCostMinor = Math.trunc(reducibleUpkeep / numberServed * getSlaveMinorCosts(V.slaves[V.slaveIndices[ID]]));
				cashX(Math.abs(slaveCostMinor), "houseServant", V.slaves[V.slaveIndices[ID]]);
			}
		});
	// nothing to return, cashX already billed.
	}

	// facility expenses
	function getBrothelCosts() {
		return (1 + 0.1 * V.brothelUpgradeDrugs) * (V.brothel * V.facilityCost);
	}

	function getBrothelAdsCosts() {
		return (State.variables.brothel > 0) ? State.variables.brothelAdsSpending : 0;
	}

	function getArcadeCosts() {
		return (0.05 + 0.02 * V.arcadeUpgradeInjectors + 0.05 * V.arcadeUpgradeCollectors + 0.02 * V.arcadeUpgradeHealth) * (V.arcade * V.facilityCost);
	}

	function getClubCosts() {
		const initCosts = (V.club * V.facilityCost) + (0.2 * V.clubUpgradePDAs * V.club * V.facilityCost);
		return (V.club > 0) ? initCosts + V.clubAdsSpending : initCosts;
	}

	function getClubAdsCosts() {
		return (State.variables.club > 0) ? State.variables.clubAdsSpending : 0;
	}

	function getDairyCosts() {
		const facDairyMultiplier = V.facilityCost * V.dairy;
		let costs = facDairyMultiplier + (0.2 * V.dairyFeedersUpgrade + 0.1 * V.dairyPregUpgrade) * facDairyMultiplier + (0.2 * V.dairyStimulatorsUpgrade * V.facilityCost);
		if (V.dairy > 0) {
			costs += ((V.bioreactorsXY + V.bioreactorsXX + V.bioreactorsHerm + V.bioreactorsBarren) * 100);
		}
		return costs;
	}

	function getIncubatorCosts() {
		const facIncMultiplier = V.facilityCost * V.incubator;
		let costs = (facIncMultiplier * 10);
		costs += (0.2 * V.incubatorUpgradeWeight + 0.2 * V.incubatorUpgradeMuscles +
			0.2 * V.incubatorUpgradeReproduction + 0.2 * V.incubatorUpgradeGrowthStims +
			0.5 * V.incubatorUpgradeSpeed) * facIncMultiplier;
		if (V.incubator > 0) {
			costs += ((V.incubatorWeightSetting + V.incubatorMusclesSetting + V.incubatorReproductionSetting + V.incubatorGrowthStimsSetting) * 500);
		}
		return costs;
	}

	function getServantsQuartersCosts() {
		return (0.2 * V.servantsQuartersUpgradeMonitoring * V.servantsQuarters * V.facilityCost);
	}

	function getMasterSuiteCosts() {
		let costs = 0;
		if (State.variables.masterSuitePregnancySlaveLuxuries === 1) {
			costs += 500;
		}
		if (State.variables.masterSuitePregnancyFertilitySupplements === 1) {
			costs += 1000;
		}
		return costs;
	}

	function getNurseryCosts() {
		return (State.variables.nursery * State.variables.facilityCost);
	}

	function getFarmyardCosts() {
		return (State.variables.farmyard * State.variables.facilityCost);
	}

	// security expansion
	function getSecurityExpansionCost() {
		let secExpCost = 0, soldierMod = 0;
		if (V.secExpEnabled > 0) {
			secExpCost += App.SecExp.upkeep('edictsCash');
			secExpCost += App.SecExp.upkeep('SF');
			secExpCost += App.SecExp.upkeep('buildings');
			if (V.soldierWages === 0) {
				soldierMod = 1;
			} else if (V.soldierWages === 1) {
				soldierMod = 1.5;
			} else {
				soldierMod = 2;
			}
			const militiaUnits = V.militiaUnits.length, slaveUnits = V.slaveUnits.length, mercUnits = V.mercUnits.length; // predefined for optimization
			const soldierUpkeep = 10;
			if (V.militiaUnits !== null) {
				for (let i = 0; i < militiaUnits; i++) {
					if (V.militiaUnits[i] !== null) {
						secExpCost += V.militiaUnits[i].troops * soldierUpkeep * soldierMod;
					}
				}
			}
			if (V.slaveUnits !== null) {
				for (let i = 0; i < slaveUnits; i++) {
					if (V.slaveUnits[i] !== null) {
						secExpCost += V.slaveUnits[i].troops * soldierUpkeep * 0.5 * soldierMod;
					}
				}
			}
			if (V.mercUnits !== null) {
				for (let i = 0; i < mercUnits; i++) {
					if (V.mercUnits[i] !== null) {
						secExpCost += V.mercUnits[i].troops * soldierUpkeep * 1.5 * soldierMod;
					}
				}
			}
		}
		return secExpCost;
	}

	// general arcology costs

	function getLifestyleCosts() {
		let ownerExpense = 1;
		if (V.PC.rules.living === "luxurious") {
			ownerExpense = 3;
		} else if (V.PC.rules.living === "normal") {
			ownerExpense = 2;
		}
		return (ownerExpense * (250 + (50000 / State.variables.localEcon)));
	}

	function getFSCosts() {
		let costs = State.variables.FSSpending;
		if (State.variables.arcologies[0].FSRepopulationFocusLaw === 1 && State.variables.PC.pregKnown === 1) {
			costs -= 500;
		}
		return costs;
	}

	function getCitizenOrphanageCosts() {
		return State.variables.citizenOrphanageTotal * 100;
	}

	function getPrivateOrphanageCosts() {
		const costs = State.variables.privateOrphanageTotal * 500;
		return (State.variables.breederOrphanageTotal > 0) ? costs + 50 : costs;
	}

	function getPeacekeeperCosts() {
		return (State.variables.peacekeepers !== 0 && State.variables.peacekeepers.undermining !== 0) ? State.variables.peacekeepers.undermining : 0;
	}

	function getMercenariesCosts() {
		let costs = 0;
		let mercCosts = V.mercenaries * 2000;
		if (V.mercenaries > 0) {
			if (V.barracks) {
				mercCosts *= 0.5;
			}
			if ((V.PC.skill.warfare >= 100) || (V.PC.career === 'arcology owner')) {
				mercCosts *= 0.5;
			}
			costs += mercCosts;
		}
		return costs;
	}

	function getMenialRetirementCosts() {
		return (State.variables.citizenRetirementMenials === 1) ? State.variables.menials * 2 : 0;
	}

	// policy and other expenses
	function getRecruiterCosts() {
		return (State.variables.Recruiter !== 0) ? 250 : 0;
	}

	function getSchoolCosts() {
		let costs = 0;
		if (State.variables.TSS.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.GRI.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.SCP.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.LDE.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.TGA.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.HA.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.TCR.schoolPresent === 1) {
			costs += 1000;
		}
		if (State.variables.NUL.schoolPresent === 1) {
			costs += 1000;
		}
		if ((State.variables.TFS.schoolPresent === 1) && ((State.variables.PC.dick === 0) || (State.variables.PC.vagina === -1) || (State.variables.PC.boobs < 300))) {
			costs += 1000;
		}
		if (State.variables.TSS.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.GRI.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.SCP.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.LDE.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.TGA.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.HA.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.TCR.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.NUL.subsidize !== 0) {
			costs += 1000;
		}
		if (State.variables.TFS.subsidize !== 0) {
			costs += 1000;
		}
		return costs;
	}

	function getPolicyCosts() {
		let costs = 0;
		const policyCost = State.variables.policyCost;
		if (State.variables.alwaysSubsidizeGrowth === 1) {
			costs += policyCost;
		}
		if (State.variables.alwaysSubsidizeRep === 1) {
			costs += policyCost;
		}
		if (State.variables.RegularParties === 1) {
			costs += policyCost;
		}
		if (State.variables.ProImmigrationCash === 1) {
			costs += policyCost;
		}
		if (State.variables.AntiEnslavementCash === 1) {
			costs += policyCost;
		}
		if (State.variables.CoursingAssociation === 1) {
			costs += 1000;
		}
		return costs;
	}

	function getProstheticsCosts() {
		return ((100 * State.variables.researchLab.maxSpace) + (300 * State.variables.researchLab.hired) + (100 * State.variables.researchLab.hired));
	}


	// player expenses
	function getPCTrainingCosts() {
		const PA = Object.values(PersonalAttention);
		const currentPA = V.personalAttention;
		let costs = 0;
		if (V.PC.actualAge >= V.IsInPrimePC && V.PC.actualAge < V.IsPastPrimePC) {
			if (PA.includes(currentPA) && currentPA !== PersonalAttention.MAID) {
				costs += 10000 * V.AgeEffectOnTrainerPricingPC;
			}
		}
		return costs;
	}

	function getPCCosts() {
		let costs = 0;
		if (State.variables.PC.preg === -1) {
			costs += 25;
		} else if (State.variables.PC.fertDrugs === 1) {
			costs += 50;
		} else if (State.variables.PC.preg >= 16) {
			costs += 100;
		}
		if (State.variables.PC.staminaPills === 1) {
			costs += 50;
		}
		return costs;
	}


	function getPCMultiplierCosts(cost) {
		if (State.variables.PC.career === 'servant') {
			if (State.variables.personalAttention === PersonalAttention.MAID) {
				if (State.variables.PC.belly >= 5000) {
					cost *= 0.80;
				} else {
					cost *= 0.75;
				}
			} else {
				cost *= 0.9;
			}
		}
		return cost;
	}

	function getEnvironmentCosts(cost = 0) {
		if (State.variables.secExpEnabled > 0) {
			if (State.variables.terrain === 'oceanic' || State.variables.terrain === 'marine') {
				if (State.variables.docks > 0) {
					cost *= (1 - State.variables.docks * 0.05);
				}
			} else if (State.variables.railway > 0) {
				cost *= (1 - State.variables.railway * 0.05);
			}
		}
		return Math.trunc(cost);
	}

	function getSFCosts() {
		let costs = 0;
		if (State.variables.SF.Toggle && State.variables.SF.Active >= 1) {
			const SFSubsidy = App.SF.AAR(0);
			if (SFSubsidy > 0) {
				costs += Math.ceil(5000 * (1 + ((State.variables.SF.Squad.Troops / 100) + (State.variables.SF.Size / 100))));
			}
		}
		return costs;
	}

	function getWeatherCosts() {
		let costs = 0;
		if (State.variables.econWeatherDamage && State.variables.disasterResponse > 0) {
			costs += Math.trunc(State.variables.disasterResponse * 200000 / State.variables.localEcon);
		}
		if (State.variables.antiWeatherFreeze > 0) {
			costs += Math.trunc(State.variables.antiWeatherFreeze * 200000 / State.variables.localEcon);
		}
		return costs;
	}

	/**
		* The amount of slaves served by a servant
		* @param {App.Entity.SlaveState} slave
		*/
	function getSlaveMinorCosts(slave) {
		let effectiveness = 0;
		if (slave.trust < -20) {
			effectiveness = 80;
		} else if (slave.devotion < -20) {
			effectiveness += (slave.trust >= 20) ? 25 : 50;
		} else if (slave.devotion <= 20) {
			effectiveness = 65;
		} else if (slave.devotion <= 50) {
			effectiveness = 80;
		} else {
			effectiveness = 100;
		}
		if (slave.fetish === 'submissive') {
			effectiveness *= 1.1;
		} else if (slave.fetish === 'dom') {
			effectiveness *= 0.9;
		}
		if (slave.relationship < -1) {
			effectiveness *= 1.1;
		}
		if (slave.energy < 20) {
			effectiveness *= 1.1;
		} else if (slave.energy < 40) {
			effectiveness *= 1.05;
		}
		if (slave.lactation > 0) {
			effectiveness *= 1.025;
		}
		if (slave.assignment === Job.SERVANT) {
			effectiveness *= 1.1;
		}
		if (setup.servantCareers.includes(slave.career) || slave.skill.servant >= State.variables.masteredXP) {
			effectiveness *= 1.1;
		}
		effectiveness = Math.trunc(effectiveness * healthPenalty(slave) / 10);
		return effectiveness;
	}
})();

/**
 * @param {App.Entity.SlaveState} s
 * @returns {Array}
 */
window.getSlaveCostArray = function(s) {
	if (!s) {
		return 0;
	}
	// Data duplicated from Cost Report
	let cost = 0;
	let retval = [];
	let t = "";
	const rulesCost = State.variables.rulesCost;
	const foodCost = State.variables.foodCost;
	const drugsCost = State.variables.drugsCost;

	// Living expenses
	switch (s.assignment) {
		case Job.ARCADE:
			cost += rulesCost * 0.75;
			break;
		case Job.DAIRY:
			if (State.variables.dairyRestraintsSetting >= 2) {
				cost += rulesCost * 0.75;
			} else if (s.rules.living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else if (State.variables.dairyDecoration === 'Degradationist') {
				cost += rulesCost * 0.90;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.FARMYARD:
			if (s.rules.living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else if (State.variables.farmyardDecoration === 'Roman Revivalist') {
				cost += rulesCost * 1.5;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.BROTHEL:
			cost += (s.rules.living === LivingRule.NORMAL) ? rulesCost * 1.5 : rulesCost;
			break;
		case Job.SCHOOL:
		case Job.CLUB:
			cost += rulesCost * 1.5;
			break;
		case Job.CLINIC:
			if (s.rules.living === LivingRule.LUXURIOUS) {
				cost += rulesCost * 2;
			} else if (s.rules.living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.SPA:
		case Job.NANNY:
			if (s.rules.living === LivingRule.LUXURIOUS) {
				cost += rulesCost * 1.75;
			} else if (s.rules.living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.SERVANT:
			if (s.rules.living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else {
				cost += (State.variables.servantsQuartersDecoration === 'Degradationist') ? rulesCost * 0.90 : rulesCost;
			}
			break;
		case Job.JAIL:
			cost += (s.rules.living === LivingRule.NORMAL) ? rulesCost * 1.25 : rulesCost * 0.90;
			break;
		case Job.MADAM:
		case Job.DJ:
		case Job.NURSE:
		case Job.WARDEN:
		case Job.ATTEND:
		case Job.STEWARD:
		case Job.MILKMAID:
		case Job.FARMER:
		case Job.TEACHER:
		case Job.MATRON:
			cost += rulesCost * 2;
			break;
		default:
			if (s.rules.living === LivingRule.LUXURIOUS) {
				cost += rulesCost * (s.relationship >= 4 ? 3 : 4);
			} else if (s.rules.living === LivingRule.NORMAL) {
				cost += rulesCost * 2;
			} else {
				cost += rulesCost;
			}
			break;
	}

	retval.push({text: "Living Expenses", value: cost});
	cost = 0;

	// Food
	retval.push({text: "Basic slave food cost", value: foodCost * 4});

	switch (s.diet) {
		case 'fattening':
		case 'muscle building':
			retval.push({text: "Heavy diet", value: foodCost});
			break;
		case 'restricted':
		case 'slimming':
			retval.push({text: "Light diet, reduced by", value: -Math.abs(foodCost)});
			break;
	}
	if (s.weight > 130) {
		retval.push({text: "Heavy weight", value: foodCost * 2});
	} else if (s.weight > 50) {
		retval.push({text: "High weight", value: foodCost});
	} else if (s.weight < -50) {
		retval.push({text: "Light weight, reduced by", value: -Math.abs(foodCost)});
	}
	if (s.geneticQuirks.fertility === 2 && s.geneticQuirks.hyperFertility === 2 && s.preg === 0 && (s.ovaries === 1 || s.mpreg === 1)) {
		if (V.geneticMappingUpgrade >= 1) {
			retval.push({text: "Additional dietary supplements due to genetic hyper-fertility", value: foodCost * 0.5});
		} else {
			retval.push({text: "Adjustment for unusual dietary deficiencies", value: foodCost * 0.5});
		}
	}
	if (s.geneticQuirks.rearLipedema === 2) {
		if (V.geneticMappingUpgrade >= 1) {
			retval.push({text: "Additional dietary supplements due to lipedema", value: foodCost * 0.2});
		} else {
			retval.push({text: "Adjustment for unusual dietary deficiencies", value: foodCost * 0.2});
		}
	}
	if (s.geneticQuirks.macromastia === 2) {
		if (V.geneticMappingUpgrade >= 1) {
			retval.push({text: "Additional dietary supplements due to macromastia", value: foodCost * 0.2});
		} else {
			retval.push({text: "Adjustment for unusual dietary deficiencies", value: foodCost * 0.2});
		}
	}
	if (s.geneticQuirks.gigantomastia === 2) {
		if (V.geneticMappingUpgrade >= 1) {
			retval.push({text: "Additional dietary supplements due to gigantomastia", value: foodCost * 0.2});
		} else {
			retval.push({text: "Adjustment for unusual dietary deficiencies", value: foodCost * 0.2});
		}
	}
	if (s.geneticQuirks.mGain === 2 && s.geneticQuirks.mLoss !== 2) {
		if (V.geneticMappingUpgrade >= 1) {
			retval.push({text: "Additional dietary supplements due to muscle loss", value: Math.trunc(foodCost * 0.2)});
		} else {
			retval.push({text: "Adjustment for unusual dietary deficiencies", value: Math.trunc(foodCost * 0.2)});
		}
	}
	if (s.geneticQuirks.wGain === 2 && s.geneticQuirks.wLoss !== 2) {
		if (V.geneticMappingUpgrade >= 1) {
			retval.push({text: "Additional dietary supplements due to weight loss", value: Math.trunc(foodCost * 0.2)});
		} else {
			retval.push({text: "Adjustment for unusual dietary deficiencies", value: Math.trunc(foodCost * 0.2)});
		}
	}
	if (s.drugs === 'appetite suppressors') {
		retval.push({text: "Food saved via supressed appetite", value: -Math.abs(foodCost)});
	}
	if (s.lactation > 0) {
		t = "Food to support ";
		if (s.lactation > 1) {
			t += "heavy ";
		} else {
			t += "natural ";
		}
		t += "lactation from ";
		if (Math.trunc(s.boobs/10000) > 2) {
			t += "absurd udders";
		} else if (Math.trunc(s.boobs/10000) > 1) {
			t += "enormous boobs";
		} else {
			t += "reasonable breasts";
		}
		retval.push({text: t, value: foodCost * s.lactation * (1 + Math.trunc(s.boobs / 10000))});
	}
	if (s.preg > s.pregData.normalBirth / 8) {
		if (s.assignment === Job.DAIRY && State.variables.dairyFeedersSetting > 0) {
			// Extra feeding costs to support pregnancy are covered by dairy feeders.
			// TODO: Include them here anyway?
			retval.push({text: "Extra feeding costs to support pregnancy are covered by dairy feeders", value: 0});
		} else if ((s.assignment === Job.MASTER_SUITE || s.assignment === Job.CONCUBINE) &&
			State.variables.masterSuiteUpgradePregnancy === 1) {
			// Extra feeding costs to support pregnancy are covered by master suite luxuries.
			// TODO: Include them here anyway?
			retval.push({text: "Extra feeding costs to support pregnancy are covered by $masterSuiteName luxuries", value: 0});
		} else {
			t = "Extra feeding to support ";
			if (s.pregControl === "speed up") {
				t += "accelerated ";
			}
			t += "pregnancy";
			retval.push({
				text: t,
				value: foodCost * s.pregType * (s.pregControl === 'speed up' ? 3 : 1)
			});

			if (s.pregType >= 100) {
				retval.push({
					text: "Specialized dietary requirements and feeding methods to support absurd multiples",
					value: foodCost * 5 * s.pregType * (s.pregControl === 'speed up' ? 3 : 1)
				});
			} else if (s.pregType >= 50) {
				retval.push({
					text: "Specialized dietary adjustments and concentrated, quick to digest food required to support absurd multiples",
					value: foodCost * 3 * s.pregType * (s.pregControl === 'speed up' ? 3 : 1)
				});
			} else if (s.pregType >= 30) {
				retval.push({
					text: "Concentrated, quick to digest food blend to support extreme multiples",
					value: foodCost * 2 * s.pregType * (s.pregControl === 'speed up' ? 3 : 1)
				});
			} else if (s.pregType >= 10) {
				retval.push({
					text: "Specialized food blend to support multiples",
					value: foodCost * s.pregType * (s.pregControl === 'speed up' ? 3 : 1)
				});
			}
		}
	}
	if (s.diet === 'XX' || s.diet === 'XY') {
		retval.push({text: "Hormone enriched diet", value: 25});
	} else if (s.diet === 'fertility') {
		retval.push({text: "Specialized fertility diet", value: 25});
	} else if (s.diet === 'cleansing') {
		retval.push({text: "Chemical cleansing diet", value: 50});
	} else if (s.diet === 'XXY') {
		retval.push({text: "Specialized hermaphrodite diet", value: 75});
	}

	// Accessibility costs
	if (State.variables.boobAccessibility !== 1 && s.boobs > 20000 &&
		(s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to inconveniently huge boobs", value: 50});
	}
	if (State.variables.pregAccessibility !== 1 &&
		(s.belly >= 60000) && s.assignment !== Job.BABY_FACTORY && (s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to an inconveniently huge belly", value: 100});
	}
	if (State.variables.dickAccessibility !== 1 && s.dick > 45 && (s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to an inconveniently huge penis", value: 50});
	}
	if (State.variables.ballsAccessibility !== 1 && s.balls > 90 && (s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to inconveniently huge balls", value: 50});
	}
	if (State.variables.buttAccessibility !== 1 && s.butt > 15 && (s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to an inconveniently huge butt", value: 50});
	}
	if (!canSee(s) && (s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to lack of sight", value: 50});
	} else if (!canSeePerfectly(s)) {
		if (getBestVision(s) < 2) {
			retval.push({text: "Increased living expenses due to poor vision", value: 25});
		} else {
			retval.push({text: "Increased living expenses due to blurred vision", value: 25});
		}
	}
	if (!canHear(s) && (s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to lack of hearing", value: 40});
	} else if (s.hears <= -1 && s.earwear !== 'hearing aids') {
		retval.push({text: "Increased living expenses due to poor hearing", value: 15});
	} else if (s.earwear === 'muffling ear plugs') {
		retval.push({text: "Increased living expenses due to muffled hearing", value: 15});
	}
	if ((s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		if (!canWalk) {
			retval.push({text: "Increased living expenses due to immobility", value: rulesCost});
		} else {
			if (!hasAllLimbs(s)) {
				retval.push({
					text: "Increased living expenses due to limblessness",
					value: Math.trunc(getLimbCount(s, 0) * 0.25 * rulesCost)
				});
			}
			if (hasAnyProstheticLimbs(s)) {
				retval.push({
					text: "Increased living expenses due to prosthetics",
					value: Math.trunc(getLimbCount(s, 102) * 0.125 * rulesCost)
				});
			}
		}
	}

	// Maintenance
	if (s.boobsImplant > 10000 && s.boobsImplantType === "string") {
		retval.push({text: "Maintenance cost for oversized string implants", value: 50});
	}
	if (s.buttImplant > 5 && s.buttImplantType === "string") {
		retval.push({text: "Maintenance cost for oversized string implants", value: 50});
	}
	if ((s.assignment !== Job.DAIRY || State.variables.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		if (s.preg > s.pregData.minLiveBirth && State.variables.universalRulesBirthing === 1) {
			retval.push({text: "Coverage cost for daily pregnancy scanning", value: 50});
		}
	}

	// Retirement account
	if (State.variables.citizenRetirementMenials === 1 && State.variables.CitizenRetirement === 0) {
		retval.push({text: "Retirement account payments for menials", value: 2});
	}

	if (State.variables.CitizenRetirement === 1) {
		retval.push({text: "Retirement account payments", value: 250});
	}

	// Enemas
	if (s.inflation === 3) {
		switch (s.inflationType) {
			case 'water':
				retval.push({text: "Costs of specially formulated water for enemas; 2 gallons", value: 100});
				break;
			case 'food':
				retval.push({text: "Costs of filler food for slave stuffing; 2 gallons", value: (foodCost * 4)});
				break;
			case 'curative':
			case 'aphrodisiac':
			case 'tightener':
				retval.push({text: "Costs of specially formulated drug mixtures for enemas; 2 gallons", value: (100 + (drugsCost * 2))});
				break;
		}
	} else if (s.inflation === 2) {
		switch (s.inflationType) {
			case 'water':
				retval.push({text: "Costs of specially formulated water for enemas; 1 gallon", value: 50});
				break;
			case 'food':
				retval.push({text: "Costs of filler food for slave stuffing; 1 gallon", value: foodCost * 2});
				break;
			case 'curative':
			case 'aphrodisiac':
			case 'tightener':
				retval.push({text: "Costs of specially formulated drug mixtures for enemas", value: (50 + (drugsCost * 2))});
				break;
		}
	} else if (s.inflation === 1) {
		switch (s.inflationType) {
			case 'water':
				retval.push({text: "Costs of specially formulated water for enemas; 2 quarts", value: 25});
				break;
			case 'food':
				retval.push({text: "Costs of filler food for slave stuffing; 2 quarts", value: foodCost});
				break;
			case 'curative':
			case 'aphrodisiac':
			case 'tightener':
				retval.push({text: "Costs of specially formulated drug mixtures for enemas", value: (25 + (drugsCost * 2))});
				break;
		}
	}

	// Drugs
	switch (s.drugs) {
		case 'anti-aging cream':
			retval.push({text: "Anti-aging creams", value: drugsCost * 10});
			break;
		case 'female hormone injections':
		case 'male hormone injections':
			retval.push({text: "Hormonal injections", value: drugsCost * 5});
			break;
		case 'intensive breast injections':
		case 'intensive butt injections':
		case 'intensive penis enhancement':
		case 'intensive testicle enhancement':
		case 'intensive lip injections':
		case 'hyper breast injections':
		case 'hyper butt injections':
		case 'hyper penis enhancement':
		case 'hyper testicle enhancement':
		case 'hyper lip injections':
			retval.push({text: "Intensive drugs", value: drugsCost * 5});
			break;
		case 'growth stimulants':
			retval.push({text: "Growth stimulants", value: drugsCost * 5});
			break;
		case 'psychostimulants':
			retval.push({text: "Mental stimulants", value: drugsCost * 5});
			break;
		case 'sag-B-gone':
			retval.push({text: "Questionable infomercial creams", value: Math.trunc(drugsCost * 0.1)});
			break;
		case 'no drugs':
		case 'none':
			break;
		default:
			retval.push({text: "Standard drugs", value: drugsCost * 2});
			break;
	}
	if (s.curatives > 0 && assignmentVisible(s)) {
		retval.push({text: "Health drugs", value: drugsCost * s.curatives});
	}
	if (s.aphrodisiacs !== 0) {
		retval.push({text: "Aphrodisiacs/Anaphrodisiacs", value: Math.trunc(drugsCost * Math.abs(s.aphrodisiacs))});
	}
	if (s.hormones !== 0) {
		retval.push({text: "Hormones", value: Math.trunc((drugsCost * Math.abs(s.hormones) * 0.5))});
	}
	if (s.bodySwap > 0) {
		retval.push({text: "JS-Suppressants", value: Math.trunc((drugsCost * s.bodySwap * 10))});
	}
	if (s.preg === -1 && isFertile(s)) {
		retval.push({text: "Contraceptives", value: Math.trunc((drugsCost * 0.5))});
	}

	if ((Job.CONCUBINE === s.assignment || s.relationship === -3) && State.variables.arcologies[0].FSPetiteAdmirationLaw === 1) {
		retval.push({text: "Big & Small Subsidy", value: -200});
	}

	return retval;
};

/**
 * @param {App.Entity.SlaveState} s
 * @returns {number}
 */
window.getSlaveCost = function(s) {
	return getSlaveCostArray(s).reduce((result, {value})=>result + value, 0);
};

/**
 * Supply and Demand for slaves (linear, simple)
 * PC buying slaves reduces supply, selling slaves reduces demand.
 * @param {number} q
 * @returns {number}
 */
window.menialSlaveCost = function(q = 0) {
	const demand = State.variables.menialDemandFactor;
	const supply = State.variables.menialSupplyFactor;
	const baseCost = 1000;
	const random = State.variables.slaveCostRandom;
	return (Math.trunc(baseCost + demand / 400 - supply / 400 + q / 400) + random);
};

window.NPCSexSupply = function(lowerDemandLeft, lowerTotalDemand, middleDemandLeft, middleTotalDemand, upperDemandLeft, upperTotalDemand, topDemandLeft, topTotalDemand) {
	const NPCSexSupply = {
		lowerClass: V.NPCSexSupply.lowerClass,
		middleClass: V.NPCSexSupply.middleClass,
		upperClass: V.NPCSexSupply.upperClass,
		topClass: V.NPCSexSupply.topClass
	};

	// Lower class calculations
	const lowerClassNPCRatio = NPCSexSupply.lowerClass / lowerDemandLeft;
	const lowerClassOptimalRatio = 0.5 + V.sexSubsidies.lowerClass / 10 - V.sexSupplyBarriers.lowerClass / 10;
	const lowerClassOptimal = lowerDemandLeft * lowerClassOptimalRatio;
	if (NPCSexSupply.lowerClass > lowerTotalDemand * (0.3 - V.sexSupplyBarriers.lowerClass / 20)) { // Checking if NPCs are supplying more than the standard minimum share of supply
		if (lowerClassNPCRatio >= lowerClassOptimalRatio + 0.05) { // NPCs provide more than they really care to and some wish to stop providing sexual services, max reduction of 10% of previous
			NPCSexSupply.lowerClass -= Math.min(NPCSexSupply.lowerClass - Math.trunc((NPCSexSupply.lowerClass * 4 + lowerClassOptimal) / 5), Math.trunc(NPCSexSupply.lowerClass * 0.1));
		} else if (lowerClassNPCRatio <= lowerClassOptimalRatio - 0.05) { // NPCs see business opportunities and provide more sexual services, minimum increse of 500, max of 10% of previous
			NPCSexSupply.lowerClass += Math.trunc(Math.clamp((NPCSexSupply.lowerClass * 4 + lowerClassOptimal) / 5 - NPCSexSupply.lowerClass, 500, NPCSexSupply.lowerClass * 0.1) * (1 - V.sexSupplyBarriers.lowerClass / 5)); // Slow down NPC growth through beauraucracy
		} else {
			NPCSexSupply.lowerClass = Math.trunc(NPCSexSupply.lowerClass * (1 + normalRandInt(0, 20) / 1000)); // Some random fluxuations whenever the NPC supply is roughly on target.
		}
	} else { // Increase NPC supply if it drops below the standard minimum share of supply
		NPCSexSupply.lowerClass += Math.max(Math.trunc(NPCSexSupply.lowerClass * (normalRandInt(150, 10) / 1000)), 500);
	}


	// Middle class calculations
	const middleClassNPCRatio = NPCSexSupply.middleClass / middleDemandLeft;
	const middleClassOptimalRatio = 0.5 + V.sexSubsidies.middleClass / 10 - V.sexSupplyBarriers.middleClass / 10;
	const middleClassOptimal = middleDemandLeft * middleClassOptimalRatio;
	if (NPCSexSupply.middleClass > middleTotalDemand * (0.3 - V.sexSupplyBarriers.middleClass / 20)) {
		if (middleClassNPCRatio >= middleClassOptimalRatio + 0.05) {
			NPCSexSupply.middleClass -= Math.min(NPCSexSupply.middleClass - Math.trunc((NPCSexSupply.middleClass * 4 + middleClassOptimal) / 5), Math.trunc(NPCSexSupply.middleClass * 0.1));
		} else if (middleClassNPCRatio <= middleClassOptimalRatio - 0.05) {
			NPCSexSupply.middleClass += Math.trunc(Math.clamp((NPCSexSupply.middleClass * 4 + middleClassOptimal) / 5 - NPCSexSupply.middleClass, 500, NPCSexSupply.middleClass * 0.1) * (1 - V.sexSupplyBarriers.middleClass / 5));
		} else {
			NPCSexSupply.middleClass = Math.trunc(NPCSexSupply.middleClass * (1 + normalRandInt(0, 20) / 1000));
		}
	} else {
		NPCSexSupply.middleClass += Math.max(Math.trunc(NPCSexSupply.middleClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	// Upper class Calculations
	const upperClassNPCRatio = NPCSexSupply.upperClass / upperDemandLeft;
	const upperClassOptimalRatio = 0.5 + V.sexSubsidies.upperClass / 10 - V.sexSupplyBarriers.upperClass / 10;
	const upperClassOptimal = upperDemandLeft * upperClassOptimalRatio;
	if (NPCSexSupply.upperClass > upperTotalDemand * (0.3 - V.sexSupplyBarriers.upperClass / 20)) {
		if (upperClassNPCRatio >= upperClassOptimalRatio + 0.05) {
			NPCSexSupply.upperClass -= Math.min(NPCSexSupply.upperClass - Math.trunc((NPCSexSupply.upperClass * 4 + upperClassOptimal) / 5), Math.trunc(NPCSexSupply.upperClass * 0.1));
		} else if (upperClassNPCRatio <= upperClassOptimalRatio - 0.05) {
			NPCSexSupply.upperClass += Math.trunc(Math.clamp((NPCSexSupply.upperClass * 4 + upperClassOptimal) / 5 - NPCSexSupply.upperClass, 500, NPCSexSupply.upperClass * 0.1) * (1 - V.sexSupplyBarriers.upperClass / 5));
		} else {
			NPCSexSupply.upperClass = Math.trunc(NPCSexSupply.upperClass * (1 + normalRandInt(0, 20) / 1000));
		}
	} else {
		NPCSexSupply.upperClass += Math.max(Math.trunc(NPCSexSupply.upperClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	// Top class calculations
	const topClassNPCRatio = NPCSexSupply.topClass / topDemandLeft;
	const topClassOptimalRatio = 0.5 + V.sexSubsidies.topClass / 8 - V.sexSupplyBarriers.topClass / 10;
	const topClassOptimal = topDemandLeft * topClassOptimalRatio;
	if (NPCSexSupply.topClass > topTotalDemand * (0.3 - V.sexSupplyBarriers.topClass / 20)) {
		if (topClassNPCRatio >= topClassOptimalRatio + 0.025) {
			NPCSexSupply.topClass -= Math.min(NPCSexSupply.topClass - Math.trunc((NPCSexSupply.topClass * 4 + topClassOptimal) / 5), Math.trunc(NPCSexSupply.topClass * 0.1));
		} else if (topClassNPCRatio <= topClassOptimalRatio - 0.025) {
			NPCSexSupply.topClass += Math.trunc(Math.clamp((NPCSexSupply.topClass * 4 + topClassOptimal) / 5 - NPCSexSupply.topClass, 500, NPCSexSupply.topClass * 0.1) * (1 - V.sexSupplyBarriers.topClass / 5));
		} else {
			NPCSexSupply.topClass = Math.trunc(NPCSexSupply.topClass * (1 + normalRandInt(0, 20) / 1000));
		}
	} else {
		NPCSexSupply.topClass += Math.max(Math.trunc(NPCSexSupply.topClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	return NPCSexSupply;
};

// The function for calculating and storing a slave's sexual interaction with citizens/'the outside'
window.slaveJobValues = function(lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef) {
	const slaveJobValues = {
		arcade: 0,
		club: 0,
		clubSP: 0,
		brothel: {
			lowerClass: 0,
			middleClass: 0,
			upperClass: 0,
			topClass: 0
		} // A list of values for each tier of whore (low, middle, upper, top)
	};
	let clubSpots;
	let brothelSpots;
	let toTheClubTotal = 0;
	let toTheBrothelTotal = 0;
	const AL = V.ArcadeiIDs.length;
	const CL = V.ClubiIDs.length;
	const BL = V.BrothiIDs.length;
	V.clubSlavesGettingHelp = 0;
	V.brothelSlavesGettingHelp = 0;

	// This section is for specific slaves or non-unique slaves adding their values to the whole
	// Accounting for Fuckdolls
	if (V.fuckdolls > 0) {
		slaveJobValues.arcade += (V.fuckdolls - (V.arcade - AL)) * 150 + (V.arcade - AL) * (200 + 20 * V.arcadeUpgradeInjectors);
	}

	// Accounting for the DJ.
	V.DJ = V.slaves.find(s => {
		return s.assignment === "be the DJ";
	});
	if (V.DJ !== 0) {
		if (!canTalk(V.DJ)) {
			V.DJ = 0;
			V.unDJ = 1;
		} else if (V.DJ.preg > 37 && V.DJ.broodmother === 2) {
			V.DJ = 0;
			V.unDJ = 2;
		} else if (V.DJ.fetish === "mindbroken") {
			V.DJ = 0;
			V.unDJ = 3;
		} else if (!canWalk(V.DJ)) {
			V.DJ = 0;
			V.unDJ = 4;
		} else if (!canHear(V.DJ)) {
			V.DJ = 0;
			V.unDJ = 5;
		}
	}
	if (V.DJ !== 0) {
		const djIntel = V.DJ.intelligence + V.DJ.intelligenceImplant;
		V.DJRepBonus = 0;
		if (V.DJ.relationship === -3 && V.DJ.devotion > 50) {
			V.DJRepBonus += 0.1;
			// $He tries $his best to be your energetic, cheerful $wife.
		}
		if (!canSee(V.DJ)) {
			V.DJRepBonus += 0.15;
		}
		if ( V.DJ.skill.entertainment > 10 && V.DJ.skill.entertainment <= 30) {
			V.DJRepBonus += 0.05;
			// $DJ.slaveName's basic skills marginally <span class="green">improve</span> the atmosphere in $clubName.
		} else if (V.DJ.skill.entertainment <= 60) {
			V.DJRepBonus += 0.1;
			// $DJ.slaveName's skills <span class="green">improve</span> the atmosphere in $clubName.
		} else if (V.DJ.skill.entertainment < 100) {
			V.DJRepBonus += 0.15;
			// $DJ.slaveName's skills greatly <span class="green">improve</span> the atmosphere in $clubName.
		} else if (V.DJ.skill.entertainment >= 100) {
			V.DJRepBonus += 0.20;
			// $DJ.slaveName's mastery immensely <span class="green">;improves</span> the atmosphere in $clubName.
		}
		if (V.DJ.muscles > 5 && V.DJ.muscles <= 95) {
			V.DJRepBonus += 0.05;
			// $His toned body helps $him lead $his fellow club sluts by letting $him dance all night.
		}
		if (djIntel > 15) {
			V.DJRepBonus += 0.05 * Math.floor((-0.00008 * djIntel * djIntel) + (0.0337 * djIntel) + 0.5);
			// $He's smart enough to make an actual contribution to the music, greatly enhancing the entire experience.
		}
		if (V.DJ.face > 95) {
			V.DJRepBonus += 0.05;
			// $His great beauty is a further draw, even when $he's in $his DJ booth, but especially when $he comes out to dance.
		}
		if (setup.DJCareers.includes(V.DJ.career)) {
			V.DJRepBonus += 0.05;
			// $He has musical experience from $his life before $he was a slave, a grounding that gives $his tracks actual depth.
		} else if (V.DJ.skill.DJ >= V.masteredXP) {
			V.DJRepBonus += 0.05;
			// $He has musical experience from working for you, giving $his tracks actual depth.
		}

		// The DJ adding to 'club'
		SJVClub(V.slaves[V.slaveIndices[V.DJ.ID]]);
	}

	// Checking for space in the club
	if (V.club > 0 && CL < V.club) {
		clubSpots = V.club - CL;
	}

	// Accounting for the Madam
	V.Madam = V.slaves.find(s => {
		return s.assignment === "be the Madam";
	});
	if (V.Madam !== 0) {
		if (!canTalk(V.Madam)) {
			V.Madam = 0;
			V.unMadam = 1;
		} else if (V.Madam.preg > 37 && V.Madam.broodmother === 2) {
			V.Madam = 0;
			V.unMadam = 2;
		} else if (V.Madam.fetish === "mindbroken") {
			V.Madam = 0;
			V.unMadam = 3;
		} else if (!canWalk(V.Madam)) {
			V.Madam = 0;
			V.unMadam = 4;
		} else if (!canSee(V.Madam)) {
			V.Madam = 0;
			V.unMadam = 5;
		} else if (!canHear(V.Madam)) {
			V.Madam = 0;
			V.unMadam = 6;
		} else if (!canHold(V.Madam)) {
			V.Madam = 0;
			V.unMadam = 7;
		}
	}
	if (V.Madam !== 0) {
		const madamIntel = V.Madam.intelligence + V.Madam.intelligenceImplant;
		V.MadamCashBonus = 0;
		if (V.Madam.relationship === -3 && V.Madam.devotion > 50) {
		// As your loving $wife, $he does $his best to attract attention to your brothel.
			V.MadamCashBonus += 0.25;
		}
		if (V.Madam.skill.whoring > 10 && V.Madam.skill.whoring <= 30) {
			// V.Madam.slaveName's basic skills marginally yellowgreen;improve business at $brothelName.
			V.MadamCashBonus += 0.05;
		} else if (V.Madam.skill.whoring <= 60) {
			// V.Madam.slaveName's skills yellowgreen;improve business at $brothelName.
			V.MadamCashBonus += 0.1;
		} else if (V.Madam.skill.whoring < 100) {
			// V.Madam.slaveName's skills greatly yellowgreen;improve business at $brothelName.
			V.MadamCashBonus += 0.15;
		} else {
			// V.Madam.slaveName's mastery immensely yellowgreen;improves business at $brothelName.
			V.MadamCashBonus += 0.20;
		}
		if (V.Madam.actualAge > 35) {
			// $His age and experience also contribute.
			V.MadamCashBonus += 0.05;
		} else if (V.AgePenalty === 0) {
			V.MadamCashBonus += 0.05;
		}
		if (setup.madamCareers.includes(V.Madam.career)) {
			// $He has experience from $his life before $he was a slave that helps $him in the seedy business of selling other people's bodies for sex.
			V.MadamCashBonus += 0.05;
		} else if (V.Madam.skill.madam >= V.masteredXP) {
			// $He has experience from working for you that helps $him in the seedy business of selling other people's bodies for sex.
			V.MadamCashBonus += 0.05;
		} else {
			V.Madam.skill.madam += jsRandom(1, Math.ceil((madamIntel) / 15) + 8);
		}
		if (madamIntel > 15) {
			// $He is a clever manager.
			V.MadamCashBonus += 0.05 * Math.floor((-0.00008 * madamIntel * madamIntel) + (0.0337 * madamIntel) + 0.5);
		}
		if (V.Madam.dick > 2 && canPenetrate(V.Madam)) {
			// $His turgid dick helps $him manage the bitches.
			V.MadamCashBonus += 0.05;
		}
		for (let dI = 0; dI < BL; dI++) {
			let i = V.slaveIndices[V.BrothiIDs[dI]];
			if (V.Madam.relationshipTarget === V.slaves[i].ID) {
				V.MadamCashBonus -= 0.05;
			} else if (areRelated(V.Madam, V.slaves[i])) {
				V.MadamCashBonus += 0.05;
			}
			if (V.slaves[i].prestigeDesc === "$He is a famed Free Cities whore, and commands top prices.") {
				V.MadamCashBonus += 0.15;
			} else if (V.slaves[i].prestigeDesc === "$He is a famed Free Cities slut, and can please anyone.") {
				V.MadamCashBonus += 0.15;
			} else if (V.slaves[i].prestigeDesc === "$He is remembered for winning best in show as a dairy cow.") {
				if (V.arcologies[0].FSPhysicalIdealist !== "unset") {
					if (V.slaves[i].muscles > 60 && V.slaves[i].weight < 30 && V.slaves[i].lactation > 0 && V.slaves[i].boobs - V.slaves[i].boobsImplant > 6000) {
						V.MadamCashBonus += 0.15;
					}
				} else if (V.slaves[i].lactation > 0 && V.slaves[i].boobs - V.slaves[i].boobsImplant > 6000) {
					V.MadamCashBonus += 0.10;
				}
			} else if (V.slaves[i].prestigeDesc === "$He is remembered for winning best in show as a cockmilker.") {
				if (V.arcologies[0].FSGenderFundamentalist !== "unset") {
					if (V.slaves[i].balls === 0 && V.slaves[i].dick === 0 && V.slaves[i].vagina > -1) { /* this needs review - doesn't fit right. An XY slave would be expected to be masculine. */
						V.MadamCashBonus += 0.20;
					}
				} else if ((V.slaves[i].balls > 5 && V.slaves[i].dick !== 0) || (V.slaves[i].balls > 4 && V.slaves[i].dick !== 0 && V.slaves[i].prostate > 1)) {
					V.MadamCashBonus += 0.15;
				}
			} else if (V.slaves[i].prestigeDesc === "$He is remembered for winning best in show as a breeder.") {
				if (canGetPregnant(V.slaves[i])) {
					V.MadamCashBonus += 0.15;
				} else if (isPreg(V.slaves[i]) && V.slaves[i].bellyPreg >= 5000) {
					V.madamCashBonus += 0.1;
				}
			}
		}

		// The Madam adding to 'brothel'
		SJVBrothel(V.slaves[V.slaveIndices[V.Madam.ID]]);
	}


	// Checking for space in the brothel
	if (V.brothel > 0 && BL < V.club) {
		brothelSpots = V.brothel - BL;
	}

	// Glory hole slaves adding to 'arcade'
	V.JobIDArray["work a glory hole"].forEach(ID => {
		const s = V.slaves[V.slaveIndices[ID]];
		s.sexAmount = Math.trunc((normalRandInt(600, 20) + (4 - s.anus) * 10 + (4 - s.vagina) * 10 + Math.trunc(s.health.condition / 2)) * 0.75);
		tiredFucks(s);
		slaveJobValues.arcade += s.sexAmount;
	});

	// Arcade slaves adding to 'arcade'
	V.ArcadeiIDs.forEach(ID => {
		const s = V.slaves[V.slaveIndices[ID]];
		s.sexAmount = (normalRandInt(600, 20) + (4 - (s.anus - 2 * V.arcadeUpgradeInjectors)) * 10 + (4 - (s.vagina - 2 * V.arcadeUpgradeInjectors)) * 10 + Math.trunc(s.health.condition / 2));
		tiredFucks(s);
		slaveJobValues.arcade += s.sexAmount;
	});

	// Public sluts adding to 'club'
	V.JobIDArray["serve the public"].forEach(ID => {
		SJVClub(V.slaves[V.slaveIndices[ID]]);
	});

	// Club sluts adding to 'club'
	V.ClubiIDs.forEach(ID => {
		SJVClub(V.slaves[V.slaveIndices[ID]]);
	});

	// Saturation penalty for public servants. Even the most beautiful slaves lose some of their shine if they have too much competition.
	if (slaveJobValues.club > 0) {
		slaveJobValues.clubSP = (Math.pow(slaveJobValues.club / 1000, 0.95) * 1000) / slaveJobValues.club;
	}

	// Street whores adding to 'brothel'
	V.JobIDArray["whore"].forEach(ID => {
		SJVBrothel(V.slaves[V.slaveIndices[ID]]);
	});

	// Brothel whores adding to 'brothel'
	V.BrothiIDs.forEach(ID => {
		SJVBrothel(V.slaves[V.slaveIndices[ID]], lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);
	});

	function SJVClub(s) {
		let toTheClub = 0;
		let beautyMultiplier = 1;
		s.minorInjury = 0;

		// The beauty multiplier
		if (s.sexualFlaw === "attention whore") {
			beautyMultiplier += 0.1;
		}
		if (V.arcologies[0].FSEdoRevivalist !== "unset") {
			beautyMultiplier += V.arcologies[0].FSEdoRevivalist / (V.FSLockinLevel * 3);
		}
		if (((V.universalRulesFacilityWork === 1) && (s.assignment === "serve the public") && (clubSpots > 0)) || (s.assignment === "serve in the club")) {
			if (s.assignment === "serve the public") {
				toTheClub = 1;
				toTheClubTotal += 1;
				V.clubSlavesGettingHelp += 1;
			}
			if (V.clubAdsSpending !== 0) {
				beautyMultiplier += 0.05 * App.Ads.getMatchedCategoryCount(s, "club");
			}
		}
		if (s.assignment === "serve in the club" || toTheClub === 1) {
			beautyMultiplier += V.DJRepBonus;
			if (canHear(s) === false) {
				beautyMultiplier -= 0.65;
				// $His inability to move to the rhythm of the music is very off putting to those looking to party.
			} else if ((s.hears === -1 && s.earwear !== "hearing aids") || (s.hears === 0 && s.earwear === "muffling ear plugs")) {
				beautyMultiplier -= 0.75;
			}
		}

		// Injuries
		if (s.assignment === "serve the public" && !toTheClub) {
			if (s.curatives < 1 && s.inflationType !== "curative") {
				if (s.health.condition < -50) {
					healthDamage(s, 13);
					s.minorInjury = 1;
				} else if (s.health.condition < -20 && jsRandom(1, 100) > 50) {
					healthDamage(s, 10);
					s.minorInjury = 1;
				} else {
					let canA = canDoAnal(s);
					let canV = canDoVaginal(s);
					let skilltarget = (100 + ((s.skill.anal - 100) * canA * (1.5 - 0.5 * canV) + (s.skill.vaginal - 100) * canV * (1.5 - 0.5 * canA) + (s.skill.oral - 100) * (3 - 1.5 * canA - 1.5 * canV + canA * canV)) * 3 / 10);
					// Complicated, I know - but it should automatically account for what acts are possible to scale the injury risk smoothly between 90% when totally unskilled
					// and 0% when perfectly skilled in the relevant method or methods.

					if (jsRandom(1, 100) > skilltarget) {
						healthDamage(s, 10 - 7 * canA * canV); // Any limitations means an injury inflicts the harsher 10 instead of 3
						s.minorInjury = 1;
					}
				}
			}
			if (s.minorInjury === 1) {
				let injuryChance;
				beautyMultiplier -= 0.05;
				if (canDoAnal(s)) {
					injuryChance = jsRandom(1, 100);
				} else {
					injuryChance = jsRandom(1, 80);
				}
				if (injuryChance > 80) {
					s.minorInjury = "sore ass";
				} else if (injuryChance > 60) {
					s.minorInjury = "black eye";
				} else if (injuryChance > 40) {
					s.minorInjury = "split lip";
				} else if (injuryChance > 20) {
					s.minorInjury = "bad bruise";
				} else {
					s.minorInjury = "sore muscle";
				}
			}
		}

		// The amount of sexual acts
		s.sexAmount = Beauty(s) / 2 + 100;

		if (s.assignment === "be the DJ") {
			if ((CL + toTheClubTotal > 0) && (CL + toTheClubTotal < 10)) {
				s.sexAmount *= (10 - CL - toTheClubTotal) / 10;
			}
		}
		s.sexAmount = Math.trunc(s.sexAmount * beautyMultiplier);

		// The effect of sexual acts on tiredness
		tiredFucks(s);

		// The quality/value of each sexual act
		s.sexQuality = FResult(s);
		if (!App.Utils.hasNonassignmentSex(s) && s.rules.reward !== "orgasm" && s.energy >= 20) {
			s.sexQuality += 2;
		}
		if (canDoAnal(s) && s.anus === 0) {
			s.sexQuality += 5; // This was at 10, not sure what the reasoning behind that was
		}
		if (canDoVaginal(s) && s.vagina === 0) {
			s.sexQuality += 5;
		}
		if (s.devotion > 95 || s.energy > 95) {
			s.sexQuality += 2;
		} else if (s.devotion > 50) {
			s.sexQuality += 1;
		} else if (s.trust > -20 && s.trust <= 20) {
			s.sexQuality -= 1;
		} else if (s.trust < -20) {
			s.sexQuality -= 2;
		}
		if (s.assignment === "serve in the club") {
			s.sexQuality += 2;
		} else if (toTheClub === 1) {
			s.sexQuality += 2;
			clubSpots -= 1;
		}
		if (s.assignment !== "recruit girls") {
			slaveJobValues.club += s.sexAmount * s.sexQuality * healthPenalty(s);
		}
	}

	/**
		* @param {App.Entity.SlaveState} s
		* @param {number} lowerClassSexDemandRef
		* @param {number} middleClassSexDemandRef
		* @param {number} upperClassSexDemandRef
		* @param {number} topClassSexDemandRef
		*/
	function SJVBrothel(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef) {
		let toTheBrothel = 0;
		let beautyMultiplier = 1;
		s.minorInjury = 0;

		// Beauty multipliers
		if (s.sexualFlaw === "neglectful") {
			beautyMultiplier += 0.1;
		}
		if ((s.hears === -1 && s.earwear !== "hearing aids") || (s.hears === 0 && s.earwear === "muffling ear plugs") || (s.hears === -2)) {
			if (!canHear(s)) {
				beautyMultiplier -= 0.25;
			} else {
				beautyMultiplier -= 0.10;
			}
		}
		if (V.brothel > 0) {
			if ((V.universalRulesFacilityWork === 1 && s.assignment === "whore" && brothelSpots > 0) || (s.assignment === "work in the brothel")) {
				if (s.assignment === "whore") {
					toTheBrothel = 1;
					toTheBrothelTotal += 1;
					V.brothelSlavesGettingHelp += 1;
				}
				// ads
				if (V.brothelAdsSpending !== 0) {
					beautyMultiplier += 0.05 * App.Ads.getMatchedCategoryCount(s, "brothel");
				}
				if (V.Madam !== 0) {
					if (V.madamCashBonus > 0) {
						if (!canHear(s)) {
							beautyMultiplier += V.madamCashBonus * 0.5;
						} else {
							beautyMultiplier += V.madamCashBonus;
						}
					}
				}
			}
		}

		// Injuries
		if (s.assignment === "whore" && !toTheBrothel) {
			if (s.curatives < 1 && s.inflationType !== "curative") {
				if (s.health.condition < -50) {
					healthDamage(s, 13);
					s.minorInjury = 1;
				} else if (s.health.condition < -20 && jsRandom(1, 100) > 50) {
					healthDamage(s, 10);
					s.minorInjury = 1;
				} else {
					let canA = canDoAnal(s);
					let canV = canDoVaginal(s);
					let skilltarget = (100 + ((s.skill.anal - 100) * canA * (1.5 - 0.5 * canV) + (s.skill.vaginal - 100) * canV * (1.5 - 0.5 * canA) + (s.skill.oral - 100) * (3 - 1.5 * canA - 1.5 * canV + canA * canV)) * 3 / 10);
					// Complicated, I know - but it should automatically account for what acts are possible to scale the injury risk smoothly between 90% when totally unskilled
					// and 0% when perfectly skilled in the relevant method or methods.

					if (jsRandom(1, 100) > skilltarget) {
						healthDamage(s, 10 - 7 * canA * canV); // Any limitations means an injury inflicts the harsher 10 instead of 3
						s.minorInjury = 1;
					}
				}
			}
			if (s.minorInjury === 1) {
				let injuryChance;
				beautyMultiplier -= 0.05;
				if (canDoAnal(s)) {
					injuryChance = jsRandom(1, 100);
				} else {
					injuryChance = jsRandom(1, 80);
				}
				if (injuryChance > 80) {
					s.minorInjury = "sore ass";
				} else if (injuryChance > 60) {
					s.minorInjury = "black eye";
				} else if (injuryChance > 40) {
					s.minorInjury = "split lip";
				} else if (injuryChance > 20) {
					s.minorInjury = "bad bruise";
				} else {
					s.minorInjury = "sore muscle";
				}
			}
		}

		// The amount of sexual acts
		s.sexAmount = Math.trunc(Beauty(s) * beautyMultiplier * (1 + (0.002 * s.skill.whoring)));

		// The quality/value of each sexual act
		s.sexQuality = FResult(s);
		if (!App.Utils.hasNonassignmentSex(s) && s.standardReward !== "orgasm" && s.energy >= 20) {
			s.sexQuality += 2;
		}
		if (canDoAnal(s) && s.anus === 0) {
			s.sexQuality += 5; // This was at 10, not sure what the reasoning behind that was
		}
		if (canDoVaginal(s) && s.vagina === 0) {
			s.sexQuality += 5;
		}
		if (s.devotion > 95 || s.energy > 95) {
			s.sexQuality += 2;
		} else if (s.devotion > 50) {
			s.sexQuality += 1;
		} else if (s.trust > -20 && s.trust <= 20) {
			s.sexQuality -= 1;
		} else if (s.trust < -20) {
			s.sexQuality -= 2;
		}
		if (s.assignment === "work in the brothel" || s.assignment === "be the Madam") {
			s.sexQuality += 2;
		} else if (toTheBrothel === 1) {
			s.sexQuality += 2;
			brothelSpots -= 1;
		}
		if (s.sexQuality < 2) {
			s.sexQuality = 2;
		}

		/**
			* The whoreScore function finds the appropriate customer class and then calculates the whore income stats associated with that class and adds to the class supply.
			* whoreClass is the MAXIMUM player set class the whore is allowed to service, if the whore is not eligable it will service the highest it is capable of servicing properly. A whoreClass of 0 means it is on auto (always service the highest possible class).
			* @param {App.Entity.SlaveState} s
			* @param {number} lowerClassSexDemandRef
			* @param {number} middleClassSexDemandRef
			* @param {number} upperClassSexDemandRef
			* @param {number} topClassSexDemandRef
			*/
		function whoreScore(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef) {
			let income = s.sexAmount * s.sexQuality;
			let sexMin;
			let sexBudget;
			const initialHealthPenalty = healthPenalty(s);
			s.effectiveWhoreClass = effectiveWhoreClass(s);
			s.maxWhoreClass = s.effectiveWhoreClass;
			income *= initialHealthPenalty;

			// Automatically changing effectiveWhoreClass
			// what is the initial effective whore class? Are we providing more sex than overal demand? Is the ratio of supply/demand for this tier higher than the one below it?
			// This also takes into consideration public sluts and ignores the NPC market and arcades
			const topSDRatio = slaveJobValues.brothel.topClass / (topClassSexDemandRef - V.NPCSexSupply.topClass);
			const upperSDRatio = slaveJobValues.brothel.upperClass / (upperClassSexDemandRef - V.NPCSexSupply.upperClass);
			const middleClubSupply = slaveJobValues.club * slaveJobValues.clubSP * (middleClassSexDemandRef / (lowerClassSexDemandRef + middleClassSexDemandRef));
			const middleSupply = slaveJobValues.brothel.middleClass + middleClubSupply;
			const middleSDRatio = middleSupply / (middleClassSexDemandRef - V.NPCSexSupply.middleClass);
			const lowerClubSupply = slaveJobValues.club * slaveJobValues.clubSP * (lowerClassSexDemandRef / (lowerClassSexDemandRef + middleClassSexDemandRef));
			const lowerSupply = slaveJobValues.brothel.lowerClass + lowerClubSupply;
			const lowerSDRatio = lowerSupply / (lowerClassSexDemandRef - V.NPCSexSupply.lowerClass);
			if (s.effectiveWhoreClass === 4 && topSDRatio > 1 && topSDRatio > upperSDRatio) {
				s.effectiveWhoreClass -= 1;
			}
			if (s.effectiveWhoreClass === 3 && upperSDRatio > 1 && upperSDRatio > middleSDRatio) {
				s.effectiveWhoreClass -= 1;
			}
			if (s.effectiveWhoreClass === 2 && middleSDRatio > 1 && middleSDRatio > lowerSDRatio) {
				s.effectiveWhoreClass -= 1;
			}

			// Calculate the stats
			if (s.effectiveWhoreClass === 4) {
				sexMin = normalRandInt(30, 2); // The minimum of fucks per week; can increase if needed
				sexBudget = Math.trunc(V.whoreBudget.topClass * 0.2); // initial maximum price per fuck; can increase if needed
				while (income > sexBudget * sexMin) { // if the income can not be caught within the initial values of sexMin and sexBudget we increase both as needed in this loop
					sexMin = Math.trunc(sexMin * 1.1);
					if (income > sexBudget * sexMin) {
						sexBudget = Math.trunc(sexBudget * 1.1);
					}
				}
				s.sexAmount = sexMin;
				tiredFucks(s); // adding tiredness based on number of fucks and then adjusting income in case the tiredness penalty changed as a result.
				if (healthPenalty(s) < initialHealthPenalty) {
					income *= healthPenalty(s) / initialHealthPenalty;
				}
				s.sexQuality = Math.trunc(income / s.sexAmount);
				slaveJobValues.brothel.topClass += s.sexAmount * s.sexQuality; // Registering the job value in the right slot
			} else if (s.effectiveWhoreClass === 3) {
				sexMin = normalRandInt(40, 3);
				sexBudget = Math.trunc(V.whoreBudget.upperClass * 0.5);
				while (income > sexBudget * sexMin) {
					sexMin = Math.trunc(sexMin * 1.1);
					if (income > sexBudget * sexMin) {
						sexBudget = Math.trunc(sexBudget * 1.1);
					}
				}
				s.sexAmount = sexMin;
				tiredFucks(s);
				if (healthPenalty(s) < initialHealthPenalty) {
					income *= healthPenalty(s) / initialHealthPenalty;
				}
				s.sexQuality = Math.trunc(income / s.sexAmount);
				slaveJobValues.brothel.upperClass += s.sexAmount * s.sexQuality;
			} else if (s.effectiveWhoreClass === 2) {
				sexMin = normalRandInt(50, 3);
				sexBudget = V.whoreBudget.middleClass;
				while (income > sexBudget * sexMin) {
					sexMin = Math.trunc(sexMin * 1.1);
					if (income > sexBudget * sexMin) {
						sexBudget = Math.trunc(sexBudget * 1.1);
					}
				}
				s.sexAmount = sexMin;
				tiredFucks(s);
				if (healthPenalty(s) < initialHealthPenalty) {
					income *= healthPenalty(s) / initialHealthPenalty;
				}
				s.sexQuality = Math.trunc(income / s.sexAmount);
				slaveJobValues.brothel.middleClass += s.sexAmount * s.sexQuality;
			} else {
				sexMin = normalRandInt(60, 3);
				sexBudget = V.whoreBudget.lowerClass * 3;
				while (income > sexBudget * sexMin) {
					sexMin = Math.trunc(sexMin * 1.1);
					if (income > sexBudget * sexMin) {
						sexBudget = Math.trunc(sexBudget * 1.1);
					}
				}
				s.sexAmount = sexMin;
				tiredFucks(s);
				if (healthPenalty(s) < initialHealthPenalty) {
					income *= healthPenalty(s) / initialHealthPenalty;
				}
				s.sexQuality = Math.max(Math.trunc(income / s.sexAmount), 2); // The lower class will pay a minimum of 2 per fuck
				slaveJobValues.brothel.lowerClass += s.sexAmount * s.sexQuality;
			}
		}

		whoreScore(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);

		if (s.assignment === "be the Madam") {
			if ((BL + toTheBrothelTotal > 0) && (BL + toTheBrothelTotal < 10)) {
				s.sexAmount = Math.trunc(s.sexAmount * ((10 - BL - toTheBrothelTotal) / 10));
				s.sexQuality = Math.trunc(s.sexQuality * 1.2);
			}
		}
	}

	return slaveJobValues;
};

/**
 * @param {App.Entity.SlaveState} s
 * @returns {number}
 */
window.effectiveWhoreClass = function(s) {
	let score = s.sexAmount * s.sexQuality;
	let result;
	if (typeof s.whoreClass === 'undefined' || s.whoreClass === 0) {
		result = 4;
	} else {
		result = s.whoreClass;
	}
	// Find maximum eligable class
	// these could be refined further if needed.
	if (result === 4 && !(score > 5000 && s.skill.whoring > 80 && s.skill.entertainment > 50)) {
		result -= 1;
	}
	if (result === 3 && !(score > 2500 && s.skill.whoring > 50)) {
		result -= 1;
	}
	if (result === 2 && (score <= 1000)) {
		result -= 1;
	}
	return result;
};

/**
 * End week function to handle the (menial) slave market prices through supply and demand
 * @returns {void}
 */
window.endWeekSlaveMarket = function() {
	const demandVariance = jsRandom(-10, 10) * 20;
	const supplyVariance = jsRandom(-10, 10) * 20;
	const demand = V.menialDemandFactor;
	const supply = V.menialSupplyFactor;
	const relativeDemand = Math.trunc(Math.pow(Math.abs(demand) / 10000, 2)); // A variable that gets much greater the further demand is from 0
	const relativeSupply = Math.trunc(Math.pow(Math.abs(supply) / 10000, 2));
	let randomDemand;
	let randomSupply;
	V.slaveCostRandom = jsRandom(-3, 3);

	if (V.demandTimer === 0) { // First week setup
		let random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaDemand = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaDemand = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaDemand = 0;
		}
		newTimer();
		random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaDemand = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaDemand = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaDemand = 0;
		}
	}

	if (demand >= 50000 && V.deltaDemand >= 0) { // Turning the market around if demand hits the upper bound
		newTimer();
		V.deltaDemand = normalRandInt(-500, 40) * 10; // Force with which the market moves
	} else if (demand <= -50000 && V.deltaDemand <= 0) { // Turning the market around if demand hits the lower bound
		newTimer();
		V.deltaDemand = normalRandInt(500, 40) * 10;
	}

	if (V.elapsedDemandTimer >= V.demandTimer) { // Changing the delta once the timer runs out
		newTimer();
		randomDemand = jsRandom(1, 100) - relativeDemand * 2; // A variable used to determine if demand will go up, down or remain stable while taking into account relativeDemand, thus making movement towards the extreme less likely
		if (demand >= 0) { // If demand is currently positive (or 0) the chances for even greater demand are reduced by randomDemand
			if (randomDemand > 55) {
				V.deltaDemand = normalRandInt(350, 60) * 10;
			} else if (randomDemand <= 45) {
				V.deltaDemand = normalRandInt(-350, 60) * 10;
			} else {
				V.deltaDemand = 0;
			}
		} else { // If demand is currently negative the chances for even lower demand are reduced by randomDemand
			if (randomDemand > 55) {
				V.deltaDemand = normalRandInt(-350, 60) * 10;
			} else if (randomDemand <= 45) {
				V.deltaDemand = normalRandInt(350, 60) * 10;
			} else {
				V.deltaDemand = 0;
			}
		}
	}
	V.elapsedDemandTimer += 1;
	const relativeTimeDemand = V.elapsedDemandTimer / V.demandTimer;
	V.menialDemandFactor += demandVariance + Math.trunc(relativeTimeDemand * V.deltaDemand + (1 - relativeTimeDemand) * V.deltaDemandOld); // Actual movement of demand gradually shifts from old to 'new' deltaDemand

	if (V.supplyTimer === 0) { // First week setup
		let random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaSupply = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaSupply = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaSupply = 0;
		}
		newTimer("supply");
		random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaSupply = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaSupply = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaSupply = 0;
		}
	}

	if (supply >= 50000 && V.deltaSupply >= 0) { // Turning the market around if supply hits the upper bound
		newTimer("supply");
		V.deltaSupply = normalRandInt(-500, 40) * 10; // Force with which the market moves
	} else if (supply <= -50000 && V.deltaSupply <= 0) { // Turning the market around if supply hits the lower bound
		newTimer("supply");
		V.deltaSupply = normalRandInt(500, 40) * 10;
	}

	if (V.elapsedSupplyTimer >= V.supplyTimer) { // Changing the delta once the timer runs out
		newTimer("supply");
		randomSupply = jsRandom(1, 100) - relativeSupply * 2;
		if (supply >= 0) { // If supply is currently positive (or 0) the chances for even greater supply are reduced by randomSupply
			if (randomSupply > 55) {
				V.deltaSupply = normalRandInt(350, 60) * 10;
			} else if (randomSupply <= 45) {
				V.deltaSupply = normalRandInt(-350, 60) * 10;
			} else {
				V.deltaSupply = 0;
			}
		} else { // If supply is currently negative the chances for even lower supply are reduced by randomSupply
			if (randomSupply > 55) {
				V.deltaSupply = normalRandInt(-350, 60) * 10;
			} else if (randomSupply <= 45) {
				V.deltaSupply = normalRandInt(350, 60) * 10;
			} else {
				V.deltaSupply = 0;
			}
		}
	}
	V.elapsedSupplyTimer += 1;
	const relativeTimeSupply = V.elapsedSupplyTimer / V.supplyTimer;
	V.menialSupplyFactor += supplyVariance + Math.trunc(relativeTimeSupply * V.deltaSupply + (1 - relativeTimeSupply) * V.deltaSupplyOld); // Actual movement of supply gradually shifts from old to 'new' deltaSupply

	function newTimer(side="demand") {
		if (side === "demand") {
			V.demandTimer = jsRandom(6, 10);
			V.elapsedDemandTimer = 0;
			V.deltaDemandOld = V.deltaDemand;
		} else if (side === "supply") {
			V.supplyTimer = jsRandom(6, 10);
			V.elapsedSupplyTimer = 0;
			V.deltaSupplyOld = V.deltaSupply;
		}
	}
};

/**
 * @param {App.Entity.SlaveState} s
 * @param {object|undefined} facility
 * @returns {Object}
 */
window.getSlaveStatisticData = function(s, facility) {
	if (!facility) { // Base data, even without facility
		return {
			ID: s.ID,
			slaveName: s.slaveName,
			customLabel: s.custom.label,
			income: 0,
			adsIncome: 0,
			rep: 0,
			food: 0,
			cost: getSlaveCost(s),
			customers: 0 // brothel, club, ...
		};
	}

	if (!facility.income) {
		facility.income = new Map();
	}

	if (facility.income.has(s.ID)) {
		return facility.income.get(s.ID);
	}

	const data = {
		ID: s.ID,
		slaveName: s.slaveName,
		customLabel: s.custom.label,
		income: 0,
		adsIncome: 0,
		rep: 0,
		food: 0,
		cost: getSlaveCost(s),
		customers: 0 /* brothel, club, ... */
	};
	facility.income.set(s.ID, data);
	return data;
};

window.initFacilityStatistics = function(facility = {}) {
	facility.adsIncome = 0;
	facility.maintenance = 0;
	facility.totalIncome = 0;
	facility.totalExpenses = 0;
	facility.profit = 0;
	facility.income = new Map();
	return facility;
};

/*

Welcome to the new way to spend and make money, all while having it recorded: cashX! In the past, costs were directly deducted from $cash, with something like <<set $cash -= 100>>.

The new system will still happily spend your money, but it will also record it in the appropriate budget category and (optionally) the appropriate slave as well.

Let's say you were going to spend 100 on your favorite $activeSlave with cashX. You might try:

<<run cashX(-100, "slaveMod", $activeSlave)>>

There we go!
1. -100 taken from your account
2. Recorded: -100 for the slaveMod category, to be displayed on the Budget screen
3. Recorded: -100 noted in your activeSlave's permanent record. $He better get busy paying that off!

cashX can be used in JS as well, and can be included in [[]] style links.

Make sure that expenses arrive in the COST slot as a negative, they are often positive in code. Use the new function forceNeg or pass it along on a temporary variable if needed.

Costs don't have to be numbers either, you can use variables. <<run cashX(forceNeg(_ContractCost), "slaveTransfer", $activeSlave)>>. forceNeg makes sure that whatever value _ContractCost has is negative, and will therefore be recorded as an expense. You don't have to use it if you're sure the number you are passing along is negative.

A full list of categories (slaveMod, slaveTransfer, event) are in the widget "setupLastWeeksCash", currently found in costsWidgets.tw. It's important to match your cost to one of those categories (or add a new one there, and display it in costsBudget.tw.)

The third category, the "slave slot" is completely optional. Sometimes you just want to spend money by yourself.

*/
window.cashX = function(cost, what, who) {
	if (!Number.isFinite(cost)) {
		V.lastWeeksCashErrors += `Expected a finite number for ${what}, but got ${cost}<br>`;
		return 0;
	}

	// remove fractions from the money
	cost = Math.trunc(cost);

	// Spend the money
	V.cash += cost;

	// INCOME
	if (cost > 0) {
		// record the action
		if (typeof V.lastWeeksCashIncome[what] !== 'undefined') {
			V.lastWeeksCashIncome[what] += cost;
		} else {
			V.lastWeeksCashErrors += `Unknown place "${what}" gained you ${cost}<br>`;
		}

		// record the slave, if available
		if (typeof who !== 'undefined') {
			who.lastWeeksCashIncome += cost;
			who.lifetimeCashIncome += cost;
		}
	} else if (cost < 0) { // EXPENSES
		// record the action
		if (typeof V.lastWeeksCashExpenses[what] !== 'undefined') {
			V.lastWeeksCashExpenses[what] += cost;
		} else {
			V.lastWeeksCashErrors += `Unknown place "${what}" charged you ${cost}<br>`;
		}

		// record the slave, if available
		if (typeof who !== 'undefined') {
			if (what === "slaveTransfer") {
				who.slaveCost = cost;
			} else {
				who.lifetimeCashExpenses += cost;
			}
		}
	}
	return cost;
};

window.repX = function(rep, what, who) {
	if (!Number.isFinite(rep)) {
		V.lastWeeksRepErrors += `Expected a finite number for ${what}, but got ${rep}<br>`;
		return 0;
	}

	// round the change
	rep = Math.trunc(rep);

	// INCOME
	// These are all scaled relative to current rep except when recording the who, to keep comparisons between slaves possible across times. This quite drastically reduces rep income at high levels of rep and only slightly at low levels.
	if (rep > 0) {
		// record the slave, if available
		if (typeof who !== 'undefined') {
			who.lastWeeksRepIncome += rep;
			who.lifetimeRepIncome += rep;
		}

		// record the action
		if (what === "cheating" || passage() === "init" || passage() === "init Nationalities") {
			/* we don't want to curve startup or cheating.*/
			V.lastWeeksRepIncome[what] += rep;
		} else if (typeof V.lastWeeksRepIncome[what] !== 'undefined') {
			rep = Math.round(Math.pow(1000 * rep + Math.pow(V.rep, 2), 0.5) - V.rep);
			V.lastWeeksRepIncome[what] += rep;
		} else {
			V.lastWeeksRepErrors += `Unknown place "${what}" gained you ${rep}<br>`;
		}
	} else if (rep < 0) { // EXPENSES
		// record the action
		if (typeof V.lastWeeksRepExpenses[what] !== 'undefined') {
			V.lastWeeksRepExpenses[what] += rep;
		} else {
			V.lastWeeksRepErrors += `Unknown place "${what}" cost you ${rep}<br>`;
		}

		// record the slave, if available
		if (typeof who !== 'undefined') {
			who.lastWeeksRepExpenses += rep;
			who.lifetimeRepExpenses += rep;
		}
	}

	// Apply the reputation change
	V.rep += rep;

	// Check if total rep is over cap, and use "overflow" category to expense it down if needed.
	if (V.rep > 20000) {
		V.lastWeeksRepExpenses.overflow += (20000 - V.rep);
		V.rep = 20000;
	} else if (V.rep < 0) { // Rep should never be lower than 0. Record this rounding purely to keep the books balanced.
		V.lastWeeksRepIncome.overflow += (0 - V.rep);
		V.rep = 0;
	}

	return rep;
};

window.forceNeg = function(x) {
	return -Math.abs(x);
};

Number.prototype.toFixedHTML = function() {
	return num(Number.prototype.toFixed.apply(this, arguments)).replace(/\.0+$/, '<span style="opacity: 0.3">$&</span>');
};

window.SectorCounts = function() {
	// Ternaries: - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
	V.AProsperityCapModified = V.AProsperityCapModified > 0 ? V.AProsperityCapModified : 0;
	const caps = [
		{upgrade: "drones", cap: 10},
		{upgrade: "hydro", cap: 30},
		{upgrade: "apron", cap: 60},
		{upgrade: "grid", cap: 100},
		{upgrade: "spire", cap: 150}];

	V.AProsperityCap = 0;
	caps.forEach(cap => {
		if (V.arcologyUpgrade[cap.upgrade] > 0) {
			V.AProsperityCap = cap.cap;
		}
	});

	// The idea is that cells used for your private benefit contribute less to the economy as they cannot be used by
	// others to generate revenue and therefore increase total cash flow. Can be offset by more luxury apartments.
	V.Sweatshops = 0;
	V.building.findCells(cell => !(cell instanceof App.Arcology.Cell.Penthouse))
		.forEach(cell => {
			if (cell instanceof App.Arcology.Cell.Apartment) {
				if (cell.type === 1) {
					V.AProsperityCap += 10;
				} else if (cell.type === 2) {
					V.AProsperityCap += 5;
				}
			} else if (cell instanceof App.Arcology.Cell.Shop) {
				if (cell.type !== "Club" && cell.type !== "Brothel") {
					V.AProsperityCap += 10;
				}
			} else if (cell instanceof App.Arcology.Cell.Market) {
				if (cell.type === "Transport Hub") {
					V.AProsperityCap += 15;
				} else if (cell.type !== "Pit" && cell.type !== "Arcade") {
					V.AProsperityCap += 10;
				}
			} else if (cell instanceof App.Arcology.Cell.Manufacturing) {
				if (cell.type !== "Dairy" && cell.type !== "Farmyard" && cell.type !== "Barracks") {
					V.AProsperityCap += 10;
					if (cell.type === "Sweatshops") {
						V.Sweatshops++;
					}
				}
			}
		});

	V.AProsperityCap += V.AProsperityCapModified;
};

/**
 * Calculate the agent bonus for a given arcology governed by an agent.
 * @param {number} arcology Arcology Index
 * @returns {number}
 */
window.agentBonus = function(arcology) {
	const agent = App.currentAgent(arcology);
	let bonus = Math.floor((agent.intelligence+agent.intelligenceImplant)/32);
	if (agent.actualAge > 35) {
		bonus++;
	}
	if (agent.career === "an arcology owner" || setup.HGCareers.includes(agent.career)) {
		bonus++;
	}
	if (agent.fetishStrength > 95) {
		if (agent.fetish === "dom" || agent.fetish === "sadist") {
			bonus++;
		} else if (agent.fetish === "submissive" || agent.fetish === "masochist") {
			bonus--;
		}
	}
	if (agent.energy > 95) {
		bonus++;
	}
	if (bonus > jsRandom(0, 5)) {
		bonus++;
	}
	return bonus;
};

/**
 * Report supply market status, charge for subsidies and supply barriers and report the results
 * @param {string} NPCclass One of "lower", "middle", "upper", or "top"
 * @returns {string}
 */
window.supplyPoliciesReport = function(NPCclass) {
	let r = ``;
	const varName = `${NPCclass}Class`;
	const className = NPCclass !== 'top' ? `<b>${NPCclass} class citizens</b>` : `<b>arcology's millionaires</b>`;
	const dissatisfaction = `and their <span class='red'>dissatisfaction</span> with you is rising.`;
 let overSupply = 0;

	if (V.sexDemandResult[varName] < 350) {
		r += `Your ${className} have <span class='red'>far too few options for sexual relief</span> inside your arcology`;
		if (V.classSatisfied[varName] === 0) {
			r += `. They trust you will take care of this issue as soon as you are settled in.`;
		} else {
			r += ` ${dissatisfaction}`;
		}
	} else if (V.sexDemandResult[varName] < 550) {
		r += `Your ${className} need <span class='red'>some more avenues for sexual relief</span> inside your arcology`;
		if (V.classSatisfied[varName] === 1) {
			r += `. They see <span class='green'>you are on the right track</span> and anticipate further improvements.`;
		} else if (V.classSatisfied[varName] === 0) {
			r += `. Their patience is being tested.`;
		} else {
			r += ` ${dissatisfaction}`;
		}
	} else if (V.sexDemandResult[varName] < 750) {
			r += `<b>Your ${className} have no issue finding the sexual relief they need inside your arcology.`;
			if (V.classSatisfied[varName] === 1) {
				r += ` They are <span class='green'>delighted</span> with how quickly you've provided for them.`;
			}
	} else {
		r += `Your ${className} are <span class='green'>${V.sexDemandResult[varName] < 950 ? `happy with the availability` : `delighted with the abundance`} of sexual services</span> inside your arcology.`;
	}

	if (V.sexDemandResult[varName] > 1000) {
		overSupply = V.sexDemandResult[varName] - 1000; V.sexDemandResult[varName] = 1000;
	}
	r += `<i><br>&nbsp;Satisfaction is at ${V.sexDemandResult[varName]/10}%`;
	if (overSupply > 0) {
		r += ` and the arcology provides ${overSupply/10}% more sexual services than required which <span class='red'>drives prices down</span>`;
	}
 r += `, ${V.NPCMarketShare[varName]/10 === V.sexDemandResult[varName]/10 ? `the entire` : `${V.NPCMarketShare[varName]/10}% of the`} market is serviced by other suppliers operating inside your arcology.</i><br>`;

	// charge supply barriers (unreported, since it's a flat amount that you were told when you enacted the policy)
	const supplyCosts = [0, 1000, 5000, 20000, 60000];
	cashX(forceNeg(supplyCosts[V.sexSupplyBarriers[varName]]), "policies");

	// report subsidy cost since it is variable
	if (V.sexSubsidies[varName] > 0) {
		const severity = ["none", "minor", "moderate", "substantial", "gratuitous"];
		const subsidyCost = forceNeg(Math.trunc(V.NPCSexSupply[varName] * Math.pow(V.sexSubsidies[varName], 2) * 0.25));
		r += `<i>&nbsp;Your ${severity[V.sexSubsidies[varName]]} subsidy costs ${cashFormatColor(subsidyCost)} this week</i>`;
		cashX(subsidyCost, "policies");

		// warn about conflicting policies
		if (V.sexSupplyBarriers[varName] > 0) {
			r += `<i>, however the barriers that are also in place <span class="red">reduce its effectiveness and increase</span> your costs</i>`;
		}
		r += `.<br>`;
	}

	return r;
};

window.ownershipReport = function({sidebar}) {
	let tint, warrning = false, detail = `${V.arcologies[0].ownership}%`;
	detail += V.assistant.power >= 1 && V.arcologies[0].ownership < 100 ? `:${V.arcologies[0].minority}%` : ``;
	if (V.arcologies[0].ownership < 100 && V.arcologies[0].minority+5 >= V.arcologies[0].ownership) {
		tint = 'red'; warrning = true;
	} else if (V.arcologies[0].ownership >= V.arcologies[0].minority+10) {
		tint = 'yellowgreen';
	} else if (V.arcologies[0].ownership >= V.arcologies[0].minority) {
		tint = 'yellow';
	}
	if (sidebar === true) {
		return `(<span class='${tint}'>${detail}</span>)`;
	} else {
		let r = `You own <strong>${V.arcologies[0].ownership}%</strong> of ${V.arcologies[0].name}, `;
		if (V.arcologies[0].minority > 0) {
			r += `against <strong>${V.arcologies[0].minority}%</strong> owned by the second most significant holder.`;
		} else {
			r += `and there are no other significant holders.`;
		}
		return r += warrning ? `<span class="warning"> A dangerously narrow margin of control.</span>` : ``;
	}
};

window.setupLastWeeksCash = function() {
	V.lastWeeksCashIncome = new App.Data.Records.LastWeeksCash();
	V.lastWeeksCashExpenses = new App.Data.Records.LastWeeksCash();
	V.lastWeeksCashProfits = new App.Data.Records.LastWeeksCash();
};

window.setupLastWeeksRep = function() {
	V.lastWeeksRepIncome = new App.Data.Records.LastWeeksRep();
	V.lastWeeksRepExpenses = new App.Data.Records.LastWeeksRep();
	V.lastWeeksRepProfits = new App.Data.Records.LastWeeksRep();
};
