/* This function adds the missing slave object variables to the player object and prunes player exclusive variables. You can only imagine what this is used for. */
/* This needs to find some way to survive refresh/newgame without showing up on all saves */
window.convertPlayerToSlave = function(slave, badEnd = "boring") {
	/* add slave variables */
	slave.skill.vaginal = 100;
	slave.skill.oral = 100;
	slave.skill.anal = 100;
	slave.skill.whoring = 0;
	slave.skill.entertainment = 100;
	slave.skill.combat = 1;
	slave.skill.headGirl = 200;
	slave.skill.recruiter = 200;
	slave.skill.bodyguard = 0;
	slave.skill.madam = 100;
	slave.skill.DJ = 0;
	slave.skill.nurse = 0;
	slave.skill.teacher = 0;
	slave.skill.attendant = 0;
	slave.skill.matron = 0;
	slave.skill.stewardess = 0;
	slave.skill.milkmaid = 0;
	slave.skill.farmer = 0;
	slave.skill.wardeness = 200;
	slave.skill.servant = 0;
	slave.skill.entertainer = 100;
	slave.skill.whore = 0;
	/* small skill adjustments */
	if (slave.career === "medicine") {
		slave.skill.nurse = 200;
	} else if (slave.career === "escort") {
		slave.skill.whoring = 100;
		slave.skill.whore = 100;
	} else if (slave.career === "servant") {
		slave.skill.stewardess = 200;
	}
	slave.career = "an arcology owner";
	slave.pronoun = App.Data.Pronouns.Kind.female;
	slave.counter.births = 0;
	slave.counter.publicUse = 0;
	slave.counter.pitKills = 0;
	slave.counter.PCChildrenFathered = 0;
	slave.counter.PCKnockedUp = 0;
	slave.counter.slavesFathered = 0;
	slave.counter.slavesKnockedUp = 0;
	slave.tattoo = "";
	slave.label = "";
	slave.desc = "";
	slave.title = "";
	slave.titleLisp = "";
	slave.image = null;
	slave.hairVector = 0;
	slave.weekAcquired = 0;
	slave.origin = "A former arcology owner that made some poor decisions in $his life.";
	slave.porn = new App.Entity.PlayerPornPerformanceState();
	slave.recruiter = 0;
	slave.relation = 0;
	slave.relationTarget = 0;
	slave.relationship = 0;
	slave.relationshipTarget = 0;
	slave.rivalry = 0;
	slave.rivalryTarget = 0;
	slave.subTarget = 0;
	slave.father = 0;
	slave.mother = 0;
	slave.daughters = 0;
	slave.sisters = 0;
	slave.canRecruit = 0;
	slave.choosesOwnAssignment = 0;
	slave.assignment = "rest";
	slave.sentence = 0;
	slave.training = 0;
	slave.toyHole = "all her holes";
	slave.indenture = -1;
	slave.indentureRestrictions = 0;
	slave.trust = 0;
	slave.oldTrust = 0;
	slave.devotion = -100;
	slave.oldDevotion = -100;
	slave.clitSetting = "vanilla";
	slave.rules = new App.Entity.PlayerRulesState();
	slave.useRulesAssistant = 1;
	slave.dietCum = 0;
	slave.dietMilk = 0;
	slave.fuckdoll = 0;
	slave.choosesOwnClothes = 0;
	slave.clothes = "no clothing";
	slave.sexAmount = 0;
	slave.sexQuality = 0;
	slave.attrKnown = 0;
	slave.fetishKnown = 0;
	slave.rudeTitle = 0;
	slave.currentRules = [];
	slave.HGExclude = 0;
	slave.choosesOwnChastity = 0;
	slave.pregControl = "none";
	slave.readyProsthetics = [];
	slave.death = "";
	slave.onDiet = 0;
	slave.haircuts = 0;
	slave.newGamePlus = 0;
	/* eslint-disable camelcase*/
	slave.NCSyouthening = 0;
	slave.override_Race = 0;
	slave.override_Skin = 0;
	slave.override_Eye_Color = 0;
	slave.override_H_Color = 0;
	slave.override_Pubic_H_Color = 0;
	slave.override_Arm_H_Color = 0;
	slave.override_Brow_H_Color = 0;
	/* eslint-enable */
	slave.albinismOverride = null;
	slave.slaveCost = 0;
	slave.lifetimeCashExpenses = 0;
	slave.lifetimeCashIncome = 0;
	slave.lastWeeksCashIncome = 0;
	slave.lifetimeRepExpenses = 0;
	slave.lifetimeRepIncome = 0;
	slave.lastWeeksRepIncome = 0;
	slave.lastWeeksRepExpenses = 0;
	slave.reservedChildren = 0;
	slave.reservedChildrenNursery = 0;

	/* remove player variables */
	delete slave.skill.trading;
	delete slave.skill.warfare;
	delete slave.skill.slaving;
	delete slave.skill.engineering;
	delete slave.skill.medicine;
	delete slave.skill.hacking;
	delete slave.skill.cumTap;
	delete slave.counter.birthElite;
	delete slave.counter.birthMaster;
	delete slave.counter.birthDegenerate;
	delete slave.counter.birthClient;
	delete slave.counter.birthArcOwner;
	delete slave.counter.birthCitizen;
	delete slave.counter.birthFutaSis;
	delete slave.counter.birthSelf;
	delete slave.counter.birthLab;
	delete slave.counter.birthOther;
	delete slave.counter.storedCum;
	delete slave.relationships;
	delete slave.title;
	delete slave.degeneracy;
	delete slave.refreshment;
	delete slave.refreshmentType;
	delete slave.rumor;
	delete slave.physicalImpairment;
	delete slave.fertDrugs;
	delete slave.forcedFertDrugs;
	delete slave.staminaPills;

	/* badEnd will be used here to apply unique effects depending on the ending */

	switch (badEnd) {
		case "notSupreme":
			slave.boobsTat = `'Subhuman ${capFirstChar(slave.race)}' is printed across $his chest.`;
			break;
		case "subjugated":
			slave.stampTat = `'${capFirstChar(slave.race)} Fuckmeat' is printed above $his butt.`;
			break;
		default:
			slave.buttTat = `'Product of ${V.arcologies[0].name}.' is stamped on $his left buttock.`;
	}

	return slave;
};
