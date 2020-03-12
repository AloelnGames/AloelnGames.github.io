window.SecExpBase = function SecExpBase() {
	return new App.SecExp.SecurityExpansionState();
};

App.SecExp.upkeep = function(input = '') {
	const V = State.variables;
	let value = 0;
	if (input === 'edictsCash') {
		const vars = ['slaveWatch', 'subsidyChurch', 'martialSchool',
		'legionTradition', 'pharaonTradition', 'eagleWarriors', 'ronin',
		'mamluks', 'sunTzu', 'tradeLegalAid', 'propCampaignBoost'];
			for(let i = 0; i < vars.length; i++) {
				if (jsDef(V[vars[i]]) && V[vars[i]] > 0) {
					value += 1000;
				}
			}
		} else if (input === 'edictsAuth') {
			if(V.enslavementRights > 0) {
				value += 10;
			}
			if (V.sellData === 1) {
				value += 10;
			}
			if (V.slaveSoldierPrivilege === 1) {
				value += 10;
			}
			if (V.weaponsLaw === 0) {
				value += 30;
			} else if (V.weaponsLaw === 2) {
				value += 10;
			} else if (V.weaponsLaw === 1) {
				value += 20;
			}
			if (V.slavesOfficers === 1) {
				value += 10;
			}
		} else if(input === 'SF') {
			if(V.SFSupportLevel >= 1) {
				value += 1000;
			}
			if (V.SFSupportLevel >= 2) {
				value += 2000;
			}
			if (V.SFSupportLevel >= 3) {
				value += 3000;
			}
			if (V.SFSupportLevel >= 4) {
				value += 3000;
			}
			if (V.SFSupportLevel >= 5) {
				value += 4000;
			}
		} else if (input === 'buildings') {
				const base = V.facilityCost * 5, upgrade = 50;
				let buildingUgradePool = [];
				if (V.propHub > 0) {
					value += base;
					buildingUgradePool.push(V.SecExp.buildings.propHub.campaign);
					buildingUgradePool.push(V.SecExp.buildings.propHub.miniTruth);
					buildingUgradePool.push(V.SecExp.buildings.propHub.fakeNews);
					buildingUgradePool.push(V.SecExp.buildings.propHub.controlLeaks);
					buildingUgradePool.push(V.SecExp.buildings.propHub.secretService);
					buildingUgradePool.push(V.SecExp.buildings.propHub.blackOps);
					buildingUgradePool.push(V.SecExp.buildings.propHub.marketInfiltration);
					for(let i = 0; i < buildingUgradePool; i++) {
						if(i > 0) {
							value += upgrade*buildingUgradePool[i];
						}
					}
				}
				if (V.secHQ > 0) {
					value += base + 20 * V.secMenials;
					buildingUgradePool.push(V.secUpgrades);
					buildingUgradePool.push(V.crimeUpgrades);
					buildingUgradePool.push(V.readinessUpgrades);
					buildingUgradePool.push(V.intelUpgrades);
					for(let i = 0; i < buildingUgradePool; i++) {
						if(i > 0) {
							value += upgrade*buildingUgradePool[i];
						}
					}
					if(V.SFSupportLevel >= 5) {
						value += 1000;
					}
				}
				if (V.secBarracks > 0) {
					value += base;
					buildingUgradePool.push(V.SecExp.buildings.barracks.upgrades);
					for(let i = 0; i < buildingUgradePool; i++) {
						if(i > 0) {
							value += upgrade*buildingUgradePool[i];
						}
					}
				}
				if (V.riotCenter > 0) {
					value += base;
					buildingUgradePool.push(V.riotUpgrades);
					for(let i = 0; i < buildingUgradePool; i++) {
						if(i > 0) {
							value += upgrade*buildingUgradePool[i];
						}
					}
					if(V.brainImplant < 106 && V.brainImplantProject > 0) {
						value += 5000*V.brainImplantProject;
					}
					if (V.SF.Toggle && V.SF.Active >= 1 && V.SFGear > 0) {
						value += 15000;
					}
				}
		}
			// break;
		return value;
}; // Closes upkeep function.

App.SecExp.conflict = (function() {
	"use strict";
	return {
		deployedUnits:deployedUnits,
		troopCount:troopCount,
	};

	function deployedUnits(input = '') {
		let bots = 0, militiaC = 0, slavesC = 0, mercsC = 0, init = 0;
		if(V.slaveRebellion !== 1 && V.citizenRebellion !== 1) {
			if(V.secBots.isDeployed > 0) {
				bots++;
			}
			if(passage() !== "attackOptions") {
				if (V.SF.Toggle && V.SF.Active >= 1 && V.SFIntervention) { // battle
					init++;
				}
			}
			if(V.slaveRebellion+V.citizenRebellion > 0) {
				if (V.SF.Toggle && V.SF.Active >= 1) { // rebellion
					init++;
				}
				if(V.irregulars > 0) {
					militiaC++;
				}
			}

			const Militia = V.militiaUnits.length;
			for(let i = 0; i < Militia; i++) {
				if(V.militiaUnits[i].isDeployed > 0) {
					militiaC++;
				}
			}

			const Slaves = V.slaveUnits.length;
			for(let i = 0; i < Slaves; i++) {
				if(V.slaveUnits[i].isDeployed > 0) {
					slavesC++;
				}
			}

			const Mercs = V.mercUnits.length;
			for(let i = 0; i < Mercs; i++) {
				if(V.mercUnits[i].isDeployed > 0) {
					mercsC++;
				}
			}
		} else {
			if(V.secBots.active > 0) {
				bots++;
			}
			if(passage() !== "attackOptions") {
				if (V.SF.Toggle && V.SF.Active >= 1 && V.SFIntervention) { // battle
					init++;
				}
			}
			if(V.slaveRebellion+V.citizenRebellion > 0) {
				if (V.SF.Toggle && V.SF.Active >= 1) { // rebellion
					init++;
				}
				if(V.irregulars > 0) {
					militiaC++;
				}
			}

			const Militia = V.militiaUnits.length;
			for(let i = 0; i < Militia; i++) {
				if(V.militiaUnits[i].active > 0) {
					militiaC++;
				}
			}

			const Slaves = V.slaveUnits.length;
			for(let i = 0; i < Slaves; i++) {
				if(V.slaveUnits[i].active > 0) {
					slavesC++;
				}
			}

			const Mercs = V.mercUnits.length;
			for(let i = 0; i < Mercs; i++) {
				if(V.mercUnits[i].active > 0) {
					mercsC++;
				}
			}
		}

		if(input === '') {
			return bots+militiaC+slavesC+mercsC+init;
		} else if(input === 'bots') {
			return bots;
		} else if(input === 'militia') {
			return militiaC;
		} else if(input === 'slaves') {
			return slavesC;
		} else if(input === 'mercs') {
			return mercsC;
		}
	}

	function troopCount() {
		let troops = 0;

		if (V.attackThisWeek === 1) {
			if (V.secBots.isDeployed === 1) {
				troops += V.secBots.troops;
			}
			for(let i = 0; i < V.militiaUnits.length; i++) {
				if (V.militiaUnits[i].isDeployed === 1) {
					troops += V.militiaUnits[i].troops;
				}
			}
			for(let i = 0; i < V.slaveUnits.length; i++) {
				if (V.slaveUnits[i].isDeployed === 1) {
					troops += V.slaveUnits[i].troops;
				}
			}
			for(let i = 0; i < V.mercUnits.length; i++) {
				if (V.mercUnits[i].isDeployed === 1) {
					troops += V.mercUnits[i].troops;
				}
			}
			if (V.SF.Toggle && V.SF.Active >= 1 && V.SFIntervention) {
				troops += V.carriableSoldiers;
			}
		} else if (V.slaveRebellion === 1 || V.citizenRebellion === 1) {
			if (V.irregulars > 0) {
				troops += V.irregulars;
			}
			if (V.secBots.active === 1) {
				troops += V.secBots.troops;
			}
			for(let i = 0; i < V.militiaUnits.length; i++) {
				if (V.militiaUnits[i].active === 1 && V.loyalID.includes(V.militiaUnits[i].ID)) {
					troops += V.militiaUnits[i].troops;
				}
			}
			for(let i = 0; i < V.slaveUnits.length; i++) {
				if (V.slaveUnits[i].active === 1 && V.loyalID.includes(V.slaveUnits[i].ID)) {
					troops += V.slaveUnits[i].troops;
				}
			}
			for(let i = 0; i < V.mercUnits.length; i++) {
				if (V.mercUnits[i].active === 1 && V.loyalID.includes(V.mercUnits[i].ID)) {
					troops += V.mercUnits[i].troops;
				}
			}
			if (V.SF.Toggle && V.SF.Active >= 1) {
				troops += V.carriableSoldiers;
			}
		}
		return troops;
	}
})();

App.SecExp.battle = (function() {
	"use strict";
	return {
		deploySpeed:deploySpeed,
		deployableUnits:deployableUnits,
		activeUnits:activeUnits,
		maxUnits:maxUnits,
		recon:recon,
		bribeCost:bribeCost,
	};

	function deploySpeed() {
		let init = 1;
		if(V.readinessUpgrades.pathways > 0) {
			init += 1;
		}
		if(V.readinessUpgrades.rapidVehicles > 0) {
			init += 2;
		}
		if(V.readinessUpgrades.rapidPlatforms > 0) {
			init += 2;
		}
		if(V.readinessUpgrades.earlyWarn > 0) {
			init += 2;
		}
		if( V.SF.Toggle && V.SF.Active >= 1 && V.sectionInFirebase >= 1) {
			init += 2;
		}
		return init;
	}

	function deployableUnits() {
		let init = 2 * App.SecExp.battle.deploySpeed();
		if(V.secBots.isDeployed > 0) {
			init--;
		}

		const Militia = V.militiaUnits.length;
		for(let i = 0; i < Militia; i++) {
			if(V.militiaUnits[i].isDeployed > 0) {
				init--;
			}
		}

		const Slaves = V.slaveUnits.length;
		for(let i = 0; i < Slaves; i++) {
			if(V.slaveUnits[i].isDeployed > 0) {
				init--;
			}
		}

		const Mercs = V.mercUnits.length;
		for(let i = 0; i < Mercs; i++) {
			if(V.mercUnits[i].isDeployed > 0) {
				init--;
			}
		}

		if(init < 0) {
			init = 0;
		}
		return init;
	}

	function activeUnits() {
		return V.secBots.isDeployed + V.militiaUnits.length + V.slaveUnits.length + V.mercUnits.length;
	}

	function maxUnits() {
		let max = 8 + (V.SecExp.buildings.barracks.upgrades.size * 2);
		if(App.SecExp.battle.deploySpeed() === 10) {
			max += 2;
		}
		return max;
	}

	function recon() {
		let recon = 0;
		if (V.intelUpgrades.sensors > 0) {
			recon++;
		}
		if (V.intelUpgrades.signalIntercept > 0) {
			recon++;
		}
		if (V.intelUpgrades.radar > 0) {
			recon++;
		}
		return recon;
	}

	function bribeCost() {
		let cost; const baseBribePerAttacker = 5;
		if (V.week <= 30) {
			cost = 5000 + baseBribePerAttacker * V.attackTroops;
		} else if (V.week <= 40) {
			cost = 10000 + baseBribePerAttacker * V.attackTroops;
		} else if (V.week <= 50) {
			cost = 15000 + baseBribePerAttacker * V.attackTroops;
		} else if (V.week <= 60) {
			cost = 20000 + baseBribePerAttacker * V.attackTroops;
		} else if (V.week <= 70) {
			cost = 25000 + baseBribePerAttacker * V.attackTroops;
		}
		if (V.majorBattle > 0) {
			cost *= 3;
		}
		cost = Math.trunc(Math.clamp(cost, 0, 1000000));
		return cost;
	}
})();

App.SecExp.Check = (function() {
	"use strict";
	return {
		general:general,
		secRestPoint:secRestPoint,
		crimeCap:crimeCap,
		reqMenials:reqMenials,
	};

	function general() {
		V.secBots = V.secBots || {};
		if (jsDef(V.secExp)) {
			if (V.secExpEnabled !== 1) {
				V.secExpEnabled = V.secExp;
			}
			delete V.secExp;
		}
		V.SecExp = V.SecExp || SecExpBase();
		V.SecExp.settings = V.SecExp.settings || {};

		V.SecExp.settings.show = V.SecExp.settings.show || 0;
		if (jsDef(V.showSecExp)) {
			V.SecExp.settings.show = V.showSecExp;
		}

		if (passage() === "init" || passage() === "New Game Plus") {
			V.SecExp = {settings:{show:V.SecExp.settings.show}};
		}

		delete V.SecExp.army;

		if (V.secExpEnabled > 0) {
			V.secBots.active = V.secBots.active || V.arcologyUpgrade.drones > 0 ? 1 : 0;
			V.secBots.ID = -1;
			V.secBots.isDeployed = V.secBots.isDeployed || 0;
			V.secBots.troops = V.secBots.troops || V.arcologyUpgrade.drones > 0 ? 30 : 0;
			V.secBots.maxTroops = V.secBots.equip || V.arcologyUpgrade.drones > 0 ? 30 : 0;

			V.SecExp.core = V.SecExp.core || {};

			V.SecExp.core.trade = V.SecExp.core.trade || 0;
			if (passage() === "Acquisition" || V.SecExp.core.trade === 0) {
				const V = State.variables;
				let init = jsRandom(20, 30);
				if (V.terrain === "urban") {
					init += jsRandom(10, 10);
				} else if (V.terrain === "ravine") {
					init -= jsRandom(5, 5);
				}
				if (["wealth", "capitalist", "celebrity", "BlackHat"].includes(V.PC.career)) {
					init += jsRandom(5, 5);
				} else if (["escort", "servant", "gang"].includes(V.PC.career)) {
					init -= jsRandom(5, 5);
				}
				V.SecExp.core.trade = init;
			}
			if (jsDef(V.trade)) {
				V.SecExp.core.trade = V.trade;
			}

			V.SecExp.core.authority = V.SecExp.core.authority || 0;
			if (jsDef(V.authority)) {
				V.SecExp.core.authority = V.authority;
			}

			V.SecExp.security = V.SecExp.security || {};
			V.SecExp.security.cap = V.SecExp.security.cap || 100;
			if (jsDef(V.security)) {
				V.SecExp.security.cap = V.security;
			}
			V.SecExp.core.crimeLow = V.SecExp.core.crimeLow || 30;
			if (jsDef(V.crime)) {
				V.SecExp.core.crimeLow = V.crime;
			}

			V.SecExp.settings.difficulty = V.SecExp.settings.difficulty || 1;
			if (jsDef(V.difficulty)) {
				V.SecExp.settings.difficulty = V.difficulty;
			}

			V.SecExp.settings.battle = V.SecExp.settings.battle || {};
			V.SecExp.settings.battle.enabled = V.SecExp.settings.battle.enabled || 1;
			if (jsDef(V.battlesEnabled)) {
				V.SecExp.settings.battle.enabled = V.battlesEnabled;
			}
			delete V.SecExp.battle;

			V.SecExp.settings.battle.major = V.SecExp.settings.battle.major || {};
			V.SecExp.settings.battle.frequency = V.SecExp.settings.battle.frequency || 1;
			if (jsDef(V.battleFrequency)) {
				V.SecExp.settings.battle.frequency = V.battleFrequency;
			}
			V.SecExp.settings.battle.force = V.SecExp.settings.battle.force || 0;
			if (jsDef(V.forceBattle)) {
				V.SecExp.settings.battle.force = V.forceBattle;
			}

			if (jsDef(V.readiness)) {
				if(V.readiness === 10) {
					V.sectionInFirebase = 1;
				}
			}

			V.SecExp.settings.unitDescriptions = V.SecExp.settings.unitDescriptions || 0;

			V.SecExp.settings.battle.allowSlavePrestige = V.SecExp.settings.battle.allowSlavePrestige || 1;
			if (jsDef(V.allowPrestigeFromBattles)) {
				V.SecExp.settings.battle.allowSlavePrestige = V.allowPrestigeFromBattles;
			}

			V.SecExp.settings.battle.major.enabled = 0;
			if (jsDef(V.majorBattlesEnabled)) {
				V.SecExp.settings.battle.major.enabled = V.majorBattlesEnabled;
			}

			V.SecExp.settings.battle.major.gameOver = V.SecExp.settings.battle.major.gameOver || 1;
			if (jsDef(V.majorBattleGameOver)) {
				V.SecExp.settings.battle.major.gameOver = V.majorBattleGameOver;
			}
			V.SecExp.settings.battle.major.force = V.SecExp.settings.battle.major.force || 0;
			if (jsDef(V.forceMajorBattle)) {
				V.SecExp.settings.battle.major.force = V.forceMajorBattle;
			}

			delete V.SecExp.settings.battle.major.mult;

			V.SecExp.settings.rebellion = V.SecExp.settings.rebellion || {};
			V.SecExp.settings.rebellion.enabled = V.SecExp.settings.rebellion.enabled || 1;
			if (jsDef(V.rebellionsEnabled)) {
				V.SecExp.settings.rebellion.enabled = V.rebellionsEnabled;
			}

			V.SecExp.settings.rebellion.force = V.SecExp.settings.rebellion.force || 0;
			if (jsDef(V.forceRebellion)) {
				V.SecExp.settings.rebellion.force = V.forceRebellion;
			}
			V.SecExp.settings.rebellion.gameOver = V.SecExp.settings.rebellion.gameOver || 1;
			if (jsDef(V.rebellionGameOver)) {
				V.SecExp.settings.rebellion.gameOver = V.rebellionGameOver;
			}

			V.SecExp.settings.rebellion.speed = V.SecExp.settings.rebellion.speed || 1;
			if (jsDef(V.rebellionSpeed)) {
				V.SecExp.settings.rebellion.speed = V.rebellionSpeed;
			}

			if (V.SecExp.settings.battle.enabled + V.SecExp.settings.rebellion.enabled > 0) {
				V.SecExp.settings.showStats = V.SecExp.settings.showStats || 0;
				if (jsDef(V.showBattleStatistics)) {
					V.SecExp.settings.showStats = V.showBattleStatistics;
				}
			}

			V.SecExp.buildings = V.SecExp.buildings || {};
			V.SecExp.buildings.propHub = V.SecExp.buildings.propHub || {};
			V.SecExp.buildings.propHub.active = V.SecExp.buildings.propHub.active || 0;
			if (V.SecExp.buildings.pr === null) {
				delete V.SecExp.buildings.pr;
			}
			if (jsDef(V.SecExp.buildings.pr)) {
				V.SecExp.buildings.propHub = V.SecExp.buildings.pr;
				delete V.SecExp.buildings.pr;
			}
			if (jsDef(V.propHub)) {
				V.SecExp.buildings.propHub.active = V.propHub;
			}

			if (V.SecExp.buildings.propHub.active > 0) {
				V.SecExp.buildings.propHub.recuriterOffice = V.SecExp.buildings.propHub.recuriterOffice || 0;
				V.SecExp.buildings.propHub.campaign = V.SecExp.buildings.propHub.campaign || 0;
				if (jsDef(V.propCampaign)) {
					V.SecExp.buildings.propHub.campaign = V.propCampaign;
				}

				V.SecExp.buildings.propHub.miniTruth = V.SecExp.buildings.propHub.miniTruth || 0;
				if (jsDef(V.miniTruth)) {
					V.SecExp.buildings.propHub.miniTruth = V.miniTruth;
				}

				V.SecExp.buildings.propHub.secretService = V.SecExp.buildings.propHub.secretService || 0;
				if (jsDef(V.secretService)) {
					V.SecExp.buildings.propHub.secretService = V.secretService;
				}
				if (jsDef(V.SecExp.buildings.propHub.SS)) {
					V.SecExp.buildings.propHub.secretService = V.SecExp.buildings.propHub.SS;
					delete V.SecExp.buildings.propHub.SS;
				}

				if (V.SecExp.buildings.propHub.campaign >= 1) {
					V.SecExp.buildings.propHub.focus = V.SecExp.buildings.propHub.focus || "social engineering";
					if (jsDef(V.propFocus) && V.propFocus !== "none") {
						V.SecExp.buildings.propHub.focus = V.propFocus;
					}
				}

				if (jsDef(V.RecuriterOffice)) {
					V.recuriterOffice = V.RecuriterOffice;
				}
				const vars = ['recuriterOffice', 'fakeNews', 'controlLeaks', 'marketInfiltration', 'blackOps'];
				for(let i = 0; i < vars.length; i++) {
					if (jsDef(V[vars[i]]) && V[vars[i]] > 0) {
						V.SecExp.buildings.propHub[vars[i]] = V[vars[i]];
						delete V[vars[i]];
					} else {
						V.SecExp.buildings.propHub[vars[i]] = V.SecExp.buildings.propHub[vars[i]] || 0;
					}
				}
			}

			V.SecExp.buildings.barracks = V.SecExp.buildings.barracks || {};
			V.SecExp.buildings.barracks.active = V.SecExp.buildings.barracks.active || 0;
			if (jsDef(V.secBarracks)) {
				V.SecExp.buildings.barracks.active = V.secBarracks;
			}

			if (V.SecExp.buildings.barracks.active > 0) {
				V.SecExp.buildings.barracks.upgrades = V.SecExp.buildings.barracks.upgrades || {};
				V.SecExp.buildings.barracks.upgrades.size = V.SecExp.buildings.barracks.upgrades.size || 0;
				V.SecExp.buildings.barracks.upgrades.luxury = V.SecExp.buildings.barracks.upgrades.luxury || 0;
				V.SecExp.buildings.barracks.upgrades.training = V.SecExp.buildings.barracks.upgrades.training || 0;
				V.SecExp.buildings.barracks.upgrades.loyaltyMod = V.SecExp.buildings.barracks.upgrades.loyaltyMod || 0;
				if (jsDef(V.secBarracksUpgrades)) {
					V.SecExp.buildings.barracks.upgrades = V.secBarracksUpgrades;
				}
			}

			V.SecExp.proclamation = V.SecExp.proclamation || {};
			V.SecExp.proclamation.cooldown = V.SecExp.proclamation.cooldown || 0;
			if (jsDef(V.proclamationsCooldown)) {
				V.SecExp.proclamation.cooldown = V.proclamationsCooldown;
			}
			V.SecExp.proclamation.currency = V.SecExp.proclamation.currency || "";
			if (jsDef(V.proclamationCurrency)) {
				V.SecExp.proclamation.currency = V.proclamationCurrency;
			}
			V.SecExp.proclamation.type = V.SecExp.proclamation.type || "crime";
			if (jsDef(V.proclamationType)) {
				if (V.proclamationType !== "none") {
					V.SecExp.proclamation.type = V.proclamationType;
				}
			}
		}

		if (jsDef(V.SecExp.core)) {
			delete V.SecExp.core.crimeCap;
		}
	} // Closes general check function.

	function secRestPoint() {
		let rest = 40;

		if(V.secUpgrades.nanoCams === 1) {
			rest += 15;
		}
		if(V.secUpgrades.cyberBots === 1) {
			rest += 15;
		}
		if(V.secUpgrades.eyeScan === 1) {
			rest += 20;
		}
		if(V.secUpgrades.cryptoAnalyzer === 1) {
			rest += 20;
		}

		return rest;
	}

	function crimeCap() {
		let cap = 100;

		if(V.crimeUpgrades.autoTrial === 1) {
			cap -= 10;
		}
		if(V.crimeUpgrades.autoArchive === 1) {
			cap -= 10;
		}
		if(V.crimeUpgrades.worldProfiler === 1) {
			cap -= 15;
		}
		if(V.crimeUpgrades.advForensic === 1) {
			cap -= 15;
		}

		return cap;
	}

	function reqMenials() {
		let Req = 20;

		if(V.secUpgrades.nanoCams === 1) {
			Req += 5;
		}
		if(V.secUpgrades.cyberBots === 1) {
			Req += 5;
		}
		if(V.secUpgrades.eyeScan === 1) {
			Req += 10;
		}
		if(V.secUpgrades.cryptoAnalyzer === 1) {
			Req += 10;
		}
		if(V.crimeUpgrades.autoTrial === 1) {
			Req += 5;
		}
		if(V.crimeUpgrades.autoArchive === 1) {
			Req += 5;
		}
		if(V.crimeUpgrades.worldProfiler === 1) {
			Req += 10;
		}
		if(V.crimeUpgrades.advForensic === 1) {
			Req += 10;
		}
		if(V.intelUpgrades.sensors === 1) {
			Req += 5;
		}
		if(V.intelUpgrades.signalIntercept === 1) {
			Req += 5;
		}
		if(V.intelUpgrades.radar === 1) {
			Req += 10;
		}
		if(V.readinessUpgrades.rapidVehicles === 1) {
			Req += 5;
		}
		if(V.readinessUpgrades.rapidPlatforms === 1) {
			Req += 10;
		}
		if(V.readinessUpgrades.earlyWarn === 1) {
			Req += 10;
		}
		if(V.SFSupportLevel >= 1) {
			Req -= 5 * V.SFSupportLevel;
		}
		if(V.secUpgrades.coldstorage >= 1) {
			Req -= 10 * V.secUpgrades.coldstorage;
		}

		return Req;
	}
})();

App.SecExp.unit = (function() {
	return {
		dec:description,
	};

	function description(input, unitType = '') {
		const V = State.variables; let r = ``;
		if (V.SecExp.settings.unitDescriptions === 0) {
			if (unitType !== "Bots") {
				r += `\n<strong>${input.platoonName}</strong> `;
			} else {
				r += `\nThe drone unit is made up of ${input.troops} drones. `;
			}
			if (jsDef(input.active) || input.active > 0) {
				if (unitType !== "Bots") {
						if(input.battlesFought > 1) {
							r += `has participated in ${input.battlesFought} battles and is ready to face the enemy once more at your command. `;
						} else if (input.battlesFought === 1) {
							r += `is ready to face the enemy once more at your command. `;
						} else {
							r += `is ready to face the enemy in battle. `;
						}
					r += `\nIt's ${input.troops} `;
				}

				if(unitType !== "Bots") {
					r += `men and women are `;
					if(unitType === "Militia") {
						r += `all proud citizens of your arcology, willing to put their lives on the line to protect their home. `;
					} else if (unitType === "Slaves") {
						r += `slaves in your possession, tasked with the protection of their owner and their arcology. `;
					} else if (unitType === "Mercs") {
					r += `mercenaries contracted to defend the arcology against external threats. `;
					}
				} else {
					r += `All of which are assembled in an ordered line in front of you, absolutely silent and ready to receive their orders. `;
				}

				if(input.troops < input.maxTroops) {
					r += `The unit is not at its full strength of ${input.maxTroops} operatives. `;
				}

				if(unitType !== "Bots") {
					if(input.equip === 0) {
						r += `They are issued with simple, yet effective equipment: firearms, a few explosives and standard uniforms, nothing more. `;
					} else if (input.equip === 1) {
						r += `They are issued with good, modern equipment: firearms, explosives and a few specialized weapons like sniper rifles and machine guns. They also carry simple body armor. `;
					} else if (input.equip === 2) {
						r += `They are issued with excellent, high tech equipment: modern firearms, explosives, specialized weaponry and modern body armor. They are also issued with modern instruments like night vision and portable radars. `;
					} else {
						r += `They are equipped with the best the modern world has to offer: modern firearms, explosives, specialized weaponry, experimental railguns, adaptive body armor and high tech recon equipment. `;
					}
				} else {
					if(input.equip === 0) {
						r += `They are equipped with light weaponry, mainly anti-riot nonlethal weapons. Not particularly effective in battle. `;
					} else if (input.equip === 1) {
						r += `They are equipped with light firearms, not an overwhelming amount of firepower, but with their mobility good enough to be effective. `;
					} else if (input.equip === 2) {
						r += `They are equipped with powerful, modern firearms and simple armor mounted around their frames. They do not make for a pretty sight, but on the battlefield they are a dangerous weapon. `;
					} else {
						r += `They are equipped with high energy railguns and adaptive armor. They are a formidable force on the battlefield, even for experienced soldiers. `;
					}
				}

				if(unitType !== "Bots") {
					if(input.training <= 33) {
						r += `They lack the experience to be considered professionals, but `;
					if (input === "Militia") {
						r += `their eagerness to defend the arcology makes up for it. `;
						} else if (unitType === "Slaves") {
							r += `their eagerness to prove themselves makes up for it. `;
						} else if (unitType === "Mercs") {
							r += `they're trained more than enough to still be an effective unit. `;
						}
					} else if (input.training <= 66) {
						r += `They have trained `;
						if (input.battlesFought > 0) {
							r += `and fought `;
						}
						r += `enough to be considered disciplined, professional soldiers, ready to face the battlefield. `;
					} else {
						r += `They are consummate veterans, with a wealth of experience and perfectly trained. On the battlefield they are a well oiled war machine capable of facing pretty much anything. `;
					}

					if(input.loyalty < 10) {
						r += `The unit is extremely disloyal. Careful monitoring of their activities and relationships should be implemented. `;
					} else if (input.loyalty < 33) {
						r += `Their loyalty is low. Careful monitoring of their activities and relationships is advised. `;
					} else if (input.loyalty < 66) {
						r += `Their loyalty is not as high as it can be, but they are not actively working against their arcology owner. `;
					} else if (input.loyalty < 90) {
						r += `Their loyalty is high and strong. The likelihood of this unit betraying the arcology is low to non-existent. `;
					} else {
						r += `The unit is fanatically loyal. They would prefer death over betrayal. `;
					}

					if (input.cyber > 0) {
						r += `The soldiers of the unit have been enhanced with numerous cyberaugmentations which greatly increase their raw power. `;
					}
					if (input.medics > 0) {
						r += `The unit has a dedicated squad of medics that will follow them in battle. `;
					}
					if(V.SF.Toggle && V.SF.Active >= 1 && input.SF > 0) {
						r += `The unit has attached "advisors" from ${V.SF.Lower} that will help the squad remain tactically aware and active. `;
					}
				}
			} else {
				r += `This unit has lost too many operatives`;
				if (jsDef(input.battlesFought)) {
					r += `in the ${input.battlesFought} it fought`;
				}
				r += `and can no longer be considered a unit at all. `;
			}
		} else if (V.SecExp.settings.unitDescriptions > 0) {
			if (unitType !== "Bots") {
				r += `\n${input.platoonName}. `;
			} else {
				r += `Drone squad. `;
			}
			r += `Unit size: ${input.troops}. `;
			r += `Equipment quality: `;
			if (input.equip === 0) {
				r += `basic. `;
			} else if (input.equip === 1) {
				r += `average. `;
			} else if (input.equip === 2) {
				r += `high. `;
			} else {
				r += `advanced. `;
			}
			if (jsDef(input.battlesFought)) {
				r += `Battles fought: ${input.battlesFought}. `;
			}
			if (jsDef(input.training)) {
				r += `\nTraining: `;
				if (input.training <= 33) {
					r += `low. `;
				} else if(input.training <= 66) {
					r += `medium. `;
				} else {
					r += `high. `;
				}
			}
			if (jsDef(input.loyalty)) {
				r += `Loyalty: `;
				if(input.loyalty < 10) {
						r += `extremely disloyal. `;
					} else if (input.loyalty < 33) {
						r += `low. `;
					} else if (input.loyalty < 66) {
						r += `medium. `;
					} else if (input.loyalty < 90) {
						r += `high. `;
					} else {
						r += `fanatical. `;
					}
			}
			if (jsDef(input.cyber) && input.cyber > 0) {
				r += `\nHave been cyberaugmentated. `;
			}
			if (jsDef(input.medics) && input.medics > 0) {
				r += `Has a medic squad attached. `;
			}
			if(V.SF.Toggle && V.SF.Active >= 1 && jsDef(input.SF) || input.SF > 0) {
				r += `${App.SF.Caps()} "advisors" are attached. `;
			}
		}
		return r;
	}
})();
