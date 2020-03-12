App.Update.autoshred = function() {
	const set = new Set(
		Object.getOwnPropertyNames(App.Data.defaultGameStateVariables).concat(
			Object.getOwnPropertyNames(App.Data.resetOnNGPlus)
		)
	);
	let extraCount = 0;

	for (const v in V) {
		if (!set.has(v)) {
			if (V.debugMode) {
				if (!App.Data.ignoreGameStateVariables.includes(v)) {
					console.log("Not on whitelist, removed:", "V."+v+":", V[v]);
				} else {
					extraCount++;
				}
			}
			delete V[v];
		}
	}
	if (extraCount !== 0) {
		console.log(`and ${extraCount} more`);
	}
};

App.Update.setNonexistantProperties = function(obj, props) {
	console.log(obj, props);
	let count = 0;
	for (const p of Object.getOwnPropertyNames(props)) {
		if (typeof obj[p] === "undefined") {
			if (obj[p] !== props[p]) {
				console.log("setting V." + p + " to ", props[p]);
			}
			obj[p] = clone(props[p]);
			count++;
		}
	}
	return console.log(`Set up ${count} variables.`);
};

App.Update.setExistantProperties = function(obj, array) {
	for (let p in array) {
		if (Array.isArray(array[p])){
			obj[p] = Array.from(array[p]);
		} else if (typeof array[p] === "object" && typeof array[p] !== undefined) {
			console.log("forcing V." + p + " to ", array[p]);
			obj[p] = {};
			Object.assign(obj[p], array[p]);
		} else {
			obj[p] = array[p];
		}
	}
};

App.Update.globalVariables = function() {
	let r = `Setting missing global variables... `;
	if (Array.isArray(V.nationalities)) {
		V.nationalities = weightedArray2HashMap(V.nationalities);
	}

	// Records
	if (jQuery.isEmptyObject(V.lastWeeksCashIncome)) {
		setupLastWeeksCash();
	}

	if (jQuery.isEmptyObject(V.lastWeeksRepIncome)) {
		setupLastWeeksRep();
	}

	// Slave mods/surgery
	{
		if (typeof V.brandTarget === "string") {
			V.brandTarget = {primary: V.brandTarget, secondary: "buttock", local: "buttock"};
		} else if (typeof V.brandTarget !== "object") {
			V.brandTarget = {primary: "buttock", secondary: "buttock", local: "buttock"};
		}
		if (typeof V.brandDesign === "string") {
			V.brandDesign = {primary: V.brandDesign, official: V.brandDesign, local: V.brandDesign};
		} else if (typeof V.brandDesign !== "object") {
			V.brandDesign = {primary: "your initials", official: "your initials", local: "your initials"};
		}
		if (typeof V.brandDesign.official === "undefined") {
			V.brandDesign.official = "your personal symbol";
		}
		if (jQuery.isEmptyObject(V.scarTarget)) {
			V.scarTarget = {primary: "left cheek", secondary: "left cheek", local: "left cheek"};
		}
		if (jQuery.isEmptyObject(V.scarDesign)) {
			V.scarDesign = {primary: "generic", local: "generic"};
		}
	}

	// Reminders
	{
		if (!Array.isArray(V.reminders)) {
			let r = V.reminders;
			V.reminders = [];
			for (let i = 0; i < r.entries.length; i++) {
				App.Reminders.add(r.entries[i], V.week + Number(r.weeks[i]));
			}
			for (let i = 0; i < r.overdue.length; i++) {
				let s = r.overdue[i].split(" ");
				s.splice(s.length - 5, 5);
				s = s.join(" ");
				App.Reminders.add(s, V.week - 1);
			}
		}
	}

	// Display
	{
		if (typeof V.sideBarOptions.roomPop === "undefined") {
			V.sideBarOptions.roomPop = 1;
		}
		if (typeof V.sideBarOptions.compact === "undefined") {
			V.sideBarOptions.compact = 1;
		}
		if (V.sortSlavesBy === "income" || V.sortSlavesBy === "lastWeeksCashIncome") {
			V.sortSlavesBy = "weeklyIncome";
		}
	}

	if (typeof V.taitorWeeks !== "undefined") {
		V.traitorWeeks = V.taitorWeeks;
	}

	// Orphanages
	if ((typeof V.DefaultBirthDestination === "undefined") || (V.DefaultBirthDestination === "") || (V.DefaultBirthDestination === "anywhere")) {
		V.DefaultBirthDestination = "individually decided fates";
	}

	// Rent
	{
		if (typeof V.LCRent !== "undefined") {
			V.rent.lowerClass = V.LCRent;
		}
		if (typeof V.MCRent !== "undefined") {
			V.rent.middleClass = V.MCRent;
		}
		if (typeof V.UCRent !== "undefined") {
			V.rent.upperClass = V.UCRent;
		}
		if (typeof V.TCRent !== "undefined") {
			V.rent.topClass = V.TCRent;
		}
	}

	// PC
	{
		PCDatatypeCleanup();
		V.enduringTrust = Number(V.enduringTrust) || 0;
		V.enduringDevotion = Number(V.enduringDevotion) || 0;
		V.averageTrust = Number(V.averageTrust) || 0;
		V.averageDevotion = Number(V.averageDevotion) || 0;
		if (typeof V.trainingRegimen !== "undefined") {
			if (typeof V.personalAttention === "number") {
				V.personalAttention = [{ID: V.personalAttention, trainingRegimen: V.trainingRegimen}];
			}
		}
		V.HackingSkillMultiplier = upgradeMultiplier('hacking');
		V.upgradeMultiplierArcology = upgradeMultiplier('engineering');
		V.upgradeMultiplierMedicine = upgradeMultiplier('medicine');
		V.upgradeMultiplierTrade = upgradeMultiplier('trading');
	}

	// Looks at all wombs, including PC.
	BCReserveInit();

	// Menials
	{
		if (typeof V.AMenials !== "undefined") {
			V.ASlaves += Math.trunc(V.AMenials / 2);
		}
		if (typeof V.helots !== "undefined") {
			V.menials = V.helots;
		}
		if (typeof V.TradeShowHelots !== "undefined") {
			V.TradeShowMenials = V.TradeShowHelots;
		}
	}

	// Items/upgrades purchased
	{
		if (V.merchantFSWares.length === 0) {
			V.merchantFSWares.push("AssetExpansionistResearch");
			V.merchantFSWares.push("GenderRadicalistResearch");
			V.merchantFSWares.push("HedonisticDecadenceResearch");
			V.merchantFSWares.push("SlaveProfessionalismResearch");
			V.merchantFSWares.push("SlimnessEnthusiastResearch");
			V.merchantFSWares.push("TransformationFetishistResearch");
			V.merchantFSWares.push("YouthPreferentialistResearch");
		}
		if (V.merchantIllegalWares.length === 0) {
			V.merchantIllegalWares.push("childhoodFertilityInducedNCS");
			V.merchantIllegalWares.push("UterineRestraintMesh");
			V.merchantIllegalWares.push("RapidCellGrowthFormula");
			V.merchantIllegalWares.push("PGHack");
			V.merchantIllegalWares.push("sympatheticOvaries");
			V.merchantIllegalWares.push("asexualReproduction");
		}
		if (typeof V.arcologies[0].childhoodFertilityInducedNCSResearch === "undefined") {
			V.arcologies[0].childhoodFertilityInducedNCSResearch = 0;
		}
		delete V.arcologies[0].childFertilityInducedNCSResearch;
	}

	// Shopping for slaves
	if (jQuery.isEmptyObject(V.huskSlave)) {
		V.huskSlave = new App.Entity.CustomSlaveOrder();
	}
	if (V.prisonCircuit.length === 0) {
		V.prisonCircuit = ["low tier criminals", "gangs and smugglers", "white collar", "military prison"];
		V.prisonCircuitIndex = random(0, V.prisonCircuit.length - 1);
	}

	App.Update.CustomSlaveOrder(V.huskSlave);
	App.Update.CustomSlaveOrder(V.customSlave);

	// Farmyard Subsection
	const animalsBought = ["canines", "hooved", "felines", "labradorRetrievers", "germanShepherds", "goldenRetrievers", "frenchBulldogs", "bulldogs", "beagles", "poodles", "rottweilers", "yorkshireTerriers", "siberianHuskies", "horses", "bulls", "pigs", "siameses", "persians", "maineCoons", "ragdolls", "bengals", "abbysinians", "birmans", "orientalShorthairs", "sphynxes", "russianBlues", "wolves", "foxes", "jackals", "dingos", "zebras", "cougars", "jaguars", "pumas", "lynx", "leopards", "lions", "tigers"];
	animalsBought.forEach(function(species) { V.animalsBought[species] = V.animalsBought[species] || 0; });

	// SF
	App.SF.BC();

	// FS
	{
		if (V.FSGotRepCreditSix === 1) {
			V.FSGotRepCredits = 7;
		} else if (V.FSGotRepCreditFive === 1) {
			V.FSGotRepCredits = 6;
		} else if (V.FSGotRepCreditFour === 1) {
			V.FSGotRepCredits = 5;
		} else if (V.FSGotRepCreditThree === 1) {
			V.FSGotRepCredits = 4;
		} else if (V.FSGotRepCreditTwo === 1) {
			V.FSGotRepCredits = 3;
		} else if (V.FSGotRepCreditOne === 1) {
			V.FSGotRepCredits = 2;
		} else if (V.FSAnnounced === 1) {
			V.FSGotRepCredits = 1;
		} else {
			V.FSGotRepCredits = 0;
		}
		if (typeof V.arcologies[0].FSAztecRevivalist === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSAztecRevivalist = "unset", V.arcologies[bci].FSAztecRevivalistDecoration = 0;
			}
			V.arcologies[0].FSAztecRevivalistLaw = 0, V.arcologies[0].FSAztecRevivalistSMR = 0;
		}
		if (typeof V.arcologies[0].FSHedonisticDecadence === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSHedonisticDecadence = "unset", V.arcologies[bci].FSHedonisticDecadenceDecoration = 0;
			}
			V.arcologies[0].FSHedonisticDecadenceLaw = 0, V.arcologies[0].FSHedonisticDecadenceLaw2 = 0, V.arcologies[0].FSHedonisticDecadenceSMR = 0, V.arcologies[0].FSHedonisticDecadenceResearch = 0;
		}
		if (typeof V.arcologies[0].FSHedonisticDecadenceDietResearch === "undefined") {
			V.arcologies[0].FSHedonisticDecadenceDietResearch = 0;
		}
		if (typeof V.arcologies[0].FSPhysicalIdealistStrongFat === "undefined") {
			V.arcologies[0].FSPhysicalIdealistStrongFat = 0;
		}
		if (typeof V.arcologies[0].FSHedonisticDecadenceStrongFat === "undefined") {
			V.arcologies[0].FSHedonisticDecadenceStrongFat = 0;
		}
		if (typeof V.arcologies[0].FSIntellectualDependency === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSIntellectualDependency = "unset", V.arcologies[bci].FSIntellectualDependencyDecoration = 0;
			}
			V.arcologies[0].FSIntellectualDependencyLaw = 0, V.arcologies[0].FSIntellectualDependencyLawBeauty = 0, V.arcologies[0].FSIntellectualDependencySMR = 0, V.arcologies[0].FSIntellectualDependencyResearch = 0;
		}
		if (typeof V.arcologies[0].FSSlaveProfessionalism === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSSlaveProfessionalism = "unset", V.arcologies[bci].FSSlaveProfessionalismDecoration = 0;
			}
			V.arcologies[0].FSSlaveProfessionalismLaw = 0, V.arcologies[0].FSSlaveProfessionalismSMR = 0, V.arcologies[0].FSSlaveProfessionalismResearch = 0;
		}
		if (typeof V.arcologies[0].FSPetiteAdmiration === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSPetiteAdmiration = "unset", V.arcologies[bci].FSPetiteAdmirationDecoration = 0;
			}
			V.arcologies[0].FSPetiteAdmirationLaw = 0, V.arcologies[0].FSPetiteAdmirationLaw2 = 0, V.arcologies[0].FSPetiteAdmirationSMR = 0, V.arcologies[0].FSPetiteAdmirationResearch = 0;
		}
		if (typeof V.arcologies[0].FSStatuesqueGlorification === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSStatuesqueGlorification = "unset", V.arcologies[bci].FSStatuesqueGlorificationDecoration = 0;
			}
			V.arcologies[0].FSStatuesqueGlorificationLaw = 0, V.arcologies[0].FSStatuesqueGlorificationLaw2 = 0, V.arcologies[0].FSStatuesqueGlorificationSMR = 0, V.arcologies[0].FSStatuesqueGlorificationResearch = 0;
		}
		if (typeof V.arcologies[0].FSCummunism === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSCummunism = "unset", V.arcologies[bci].FSCummunismDecoration = 0;
			}
			V.arcologies[0].FSCummunismResearch = 0;
		}
		if (typeof V.arcologies[0].FSIncestFetishist === "undefined") {
			for (let bci = 0; bci < V.arcologies.length; bci++) {
				V.arcologies[bci].FSIncestFetishist = "unset", V.arcologies[bci].FSIncestFetishistDecoration = 0;
			}
			V.arcologies[0].FSIncestFetishistResearch = 0;
		}
		for (let bci = 0; bci < V.arcologies.length; bci++) {
			if (V.arcologies[bci].FSHedonisticDecadence === 0) {
				V.arcologies[bci].FSHedonisticDecadence = "unset", V.arcologies[bci].FSHedonisticDecadenceDecoration = 0;
			}
		}
		if (typeof V.arcologies[0].FSPhysicalIdealistLaw === "undefined") {
			V.arcologies[0].FSPhysicalIdealistLaw = 0;
		}
	}

	// Arcologies
	{
		if (jQuery.isEmptyObject(V.arcologies)) {
			V.arcologies = [];
			V.arcologies[0] = {
				name: "Arcology X-",
				direction: 0,
				government: 1,
				honeymoon: 0,
				prosperity: 50,
				FSSupremacist: "unset",
				FSSupremacistRace: 0,
				FSSubjugationist: "unset",
				FSSubjugationistRace: 0,
				FSGenderRadicalist: "unset",
				FSGenderFundamentalist: "unset",
				FSPaternalist: "unset",
				FSDegradationist: "unset",
				FSBodyPurist: "unset",
				FSTransformationFetishist: "unset",
				FSYouthPreferentialist: "unset",
				FSMaturityPreferentialist: "unset",
				FSSlimnessEnthusiast: "unset",
				FSAssetExpansionist: "unset",
				FSPastoralist: "unset",
				FSPhysicalIdealist: "unset",
				FSChattelReligionist: "unset",
				FSRomanRevivalist: "unset",
				FSEgyptianRevivalist: "unset",
				FSEdoRevivalist: "unset",
				FSArabianRevivalist: "unset",
				FSChineseRevivalist: "unset",
				FSNull: "unset",
				FSRepopulationFocus: "unset",
				FSRestart: "unset",
				FSHedonisticDecadence: "unset",
				FSIntellectualDependency: "unset",
				FSSlaveProfessionalism: "unset",
				FSPetiteAdmiration: "unset",
				FSStatuesqueGlorification: "unset",
				embargo: 1,
				embargoTarget: -1,
				influenceTarget: -1,
				influenceBonus: 0,
				rival: 0
			};
		}
	}

	// Player Arcology: object
	{
		if (typeof V.arcologyName !== "undefined") {
			V.arcologies[0].name = V.arcologyName;
		} else if (typeof V.arcologies[0].name === "undefined") {
			V.arcologies[0].name = "Arcology X-4";
		}
		if (typeof V.arcologies[0].ownership === "undefined") {
			V.arcologies[0].ownership = 50;
		}
		if (typeof V.arcologies[0].minority === "undefined") {
			V.arcologies[0].minority = 20;
		}
		if (typeof V.arcologies[0].embargo === "undefined") {
			V.arcologies[0].embargo = 1;
		}
		if (typeof V.arcologies[0].embargoTarget === "undefined") {
			V.arcologies[0].embargoTarget = -1;
		}
		if (typeof V.arcologies[0].hackingEconomic === "undefined") {
			V.arcologies[0].hackingEconomic = 1;
		}
		if (typeof V.arcologies[0].hackingEconomicTarget === "undefined") {
			V.arcologies[0].hackingEconomicTarget = -1;
		}
		if (typeof V.arcologies[0].hackingReputationTarget === "undefined") {
			V.arcologies[0].hackingReputationTarget = -1;
		}
		if (typeof V.arcologies[0].hackingReputation === "undefined") {
			V.arcologies[0].hackingReputation = 1;
		}
		if (typeof V.arcologies[0].influenceTarget === "undefined") {
			V.arcologies[0].influenceTarget = -1;
		}
		if (typeof V.arcologies[0].influenceBonus === "undefined") {
			V.arcologies[0].influenceBonus = -1;
		}
		if (typeof V.arcologies[0].CyberEconomic === "undefined") {
			V.arcologies[0].CyberEconomic = 1;
		}
		if (typeof V.arcologies[0].CyberEconomicTarget === "undefined") {
			V.arcologies[0].CyberEconomicTarget = -1;
		}
		if (typeof V.arcologies[0].CyberReputation === "undefined") {
			V.arcologies[0].CyberReputation = 1;
		}
		if (typeof V.arcologies[0].CyberReputationTarget === "undefined") {
			V.arcologies[0].CyberReputationTarget = -1;
		}
		if (typeof V.arcologies[0].rival === "undefined") {
			V.arcologies[0].rival = 0;
		}
		if (typeof V.arcologies[0].FSNull === "undefined") {
			V.arcologies[0].FSNull = "unset";
		}
		if (typeof V.arcologies[0].FSRepopulationFocus === "undefined") {
			V.arcologies[0].FSRepopulationFocus = "unset";
		}
		if (typeof V.arcologies[0].FSRepopulationFocusPregPolicy === "undefined") {
			V.arcologies[0].FSRepopulationFocusPregPolicy = 0;
		}
		if (typeof V.arcologies[0].FSRepopulationFocusMilfPolicy === "undefined") {
			V.arcologies[0].FSRepopulationFocusMilfPolicy = 0;
		}
		if (typeof V.arcologies[0].FSRepopulationFocusInterest === "undefined") {
			V.arcologies[0].FSRepopulationFocusInterest = 0;
		}
		if (typeof V.arcologies[0].FSRestart === "undefined") {
			V.arcologies[0].FSRestart = "unset";
		}
		if (typeof V.arcologies[0].FSEugenicsChastityPolicy === "undefined") {
			V.arcologies[0].FSEugenicsChastityPolicy = 0;
		}
		if (typeof V.arcologies[0].FSEugenicsSterilizationPolicy === "undefined") {
			V.arcologies[0].FSEugenicsSterilizationPolicy = 0;
		}
		if (typeof V.arcologies[0].FSEugenicsInterest === "undefined") {
			V.arcologies[0].FSEugenicsInterest = 0;
		}
		if (typeof V.arcologies[0].PCminority === "undefined") {
			V.arcologies[0].PCminority = 0;
		}
		if (typeof V.arcologies[0].demandFactor === "undefined") {
			V.arcologies[0].demandFactor = 250;
		}
		if (typeof V.arcologies[0].leaderID === "undefined") {
			V.arcologies[0].leaderID = 0;
		}
		// FS
		{
			if ((typeof V.FSSupremacist !== "undefined") && V.FSSupremacist !== "unset") {
				V.arcologies[0].FSSupremacist = V.FSSupremacist;
				V.arcologies[0].FSSupremacistRace = V.FSSupremacistRace;
			} else if (typeof V.arcologies[0].FSSupremacist === "undefined") {
				V.arcologies[0].FSSupremacist = "unset";
			}
			if ((typeof V.FSSupremacistLawME !== "undefined") && V.FSSupremacistLawME !== 0) {
				V.arcologies[0].FSSupremacistLawME = V.FSSupremacistLawME;
			} else if (typeof V.arcologies[0].FSSupremacistLawME === "undefined") {
				V.arcologies[0].FSSupremacistLawME = 0;
			}
			if (V.arcologies[0].FSSupremacistRace === "middle") {
				V.arcologies[0].FSSupremacistRace = "middle eastern";
			} else if (V.arcologies[0].FSSupremacistRace === "pacific") {
				V.arcologies[0].FSSupremacistRace = "pacific islander";
			} else if (V.arcologies[0].FSSupremacistRace === "southern") {
				V.arcologies[0].FSSupremacistRace = "southern european";
			} else if (V.arcologies[0].FSSupremacistRace === "mixed") {
				V.arcologies[0].FSSupremacistRace = "mixed race";
			}
			if ((typeof V.FSSubjugationist !== "undefined") && V.FSSubjugationist !== "unset") {
				V.arcologies[0].FSSubjugationist = V.FSSubjugationist;
				V.arcologies[0].FSSubjugationistRace = V.FSSubjugationistRace;
			} else if (typeof V.arcologies[0].FSSubjugationist === "undefined") {
				V.arcologies[0].FSSubjugationist = "unset";
			}
			if ((typeof V.FSSubjugationistLawME !== "undefined") && V.FSSubjugationistLawME !== 0) {
				V.arcologies[0].FSSubjugationistLawME = V.FSSubjugationistLawME;
			} else if (typeof V.arcologies[0].FSSubjugationistLawME === "undefined") {
				V.arcologies[0].FSSubjugationistLawME = 0;
			}
			if (V.arcologies[0].FSSubjugationistRace === "middle") {
				V.arcologies[0].FSSubjugationistRace = "middle eastern";
			} else if (V.arcologies[0].FSSubjugationistRace === "pacific") {
				V.arcologies[0].FSSubjugationistRace = "pacific islander";
			} else if (V.arcologies[0].FSSubjugationistRace === "southern") {
				V.arcologies[0].FSSubjugationistRace = "southern european";
			} else if (V.arcologies[0].FSSubjugationistRace === "mixed") {
				V.arcologies[0].FSSubjugationistRace = "mixed race";
			}
			if ((typeof V.FSDegradationist !== "undefined") && V.FSDegradationist !== "unset") {
				V.arcologies[0].FSDegradationist = V.FSDegradationist;
			} else if (typeof V.arcologies[0].FSDegradationist === "undefined") {
				V.arcologies[0].FSDegradationist = "unset";
			}
			if ((typeof V.FSDegradationistLaw !== "undefined") && V.FSDegradationistLaw !== 0) {
				V.arcologies[0].FSDegradationistLaw = V.FSDegradationistLaw;
			} else if (typeof V.arcologies[0].FSDegradationistLaw === "undefined") {
				V.arcologies[0].FSDegradationistLaw = 0;
			}
			if ((typeof V.FSPaternalist !== "undefined") && V.FSPaternalist !== "unset") {
				V.arcologies[0].FSPaternalist = V.FSPaternalist;
			} else if (typeof V.arcologies[0].FSPaternalist === "undefined") {
				V.arcologies[0].FSPaternalist = "unset";
			}
			if ((typeof V.FSPaternalistLaw !== "undefined") && V.FSPaternalistLaw !== 0) {
				V.arcologies[0].FSPaternalistLaw = V.FSPaternalistLaw;
			} else if (typeof V.arcologies[0].FSPaternalistLaw === "undefined") {
				V.arcologies[0].FSPaternalistLaw = 0;
			}
			if ((typeof V.FSGenderFundamentalist !== "undefined") && V.FSGenderFundamentalist !== "unset") {
				V.arcologies[0].FSGenderFundamentalist = V.FSGenderFundamentalist;
			} else if (typeof V.arcologies[0].FSGenderFundamentalist === "undefined") {
				V.arcologies[0].FSGenderFundamentalist = "unset";
			}
			if ((typeof V.FSGenderFundamentalistSMR !== "undefined") && V.FSGenderFundamentalistSMR !== 0) {
				V.arcologies[0].FSGenderFundamentalistSMR = V.FSGenderFundamentalistSMR;
			} else if (typeof V.arcologies[0].FSGenderFundamentalistSMR === "undefined") {
				V.arcologies[0].FSGenderFundamentalistSMR = 0;
			}
			delete V.arcologies[0].FSGenderFundamentalistLaw;
			if ((typeof V.FSGenderRadicalist !== "undefined") && V.FSGenderRadicalist !== "unset") {
				V.arcologies[0].FSGenderRadicalist = V.FSGenderRadicalist;
			} else if (typeof V.arcologies[0].FSGenderRadicalist === "undefined") {
				V.arcologies[0].FSGenderRadicalist = "unset";
			}
			if (typeof V.arcologies[0].FSGenderRadicalistLawBeauty === "undefined") {
				V.arcologies[0].FSGenderRadicalistLawBeauty = 0;
			}
			if (typeof V.arcologies[0].FSGenderRadicalistLawFuta === "undefined") {
				V.arcologies[0].FSGenderRadicalistLawFuta = 0;
			}
			delete V.arcologies[0].FSGenderRadicalistLawDicks;
			delete V.arcologies[0].FSGenderRadicalistSMR;
			if ((typeof V.FSBodyPurist !== "undefined") && V.FSBodyPurist !== "unset") {
				V.arcologies[0].FSBodyPurist = V.FSBodyPurist;
			} else if (typeof V.arcologies[0].FSBodyPurist === "undefined") {
				V.arcologies[0].FSBodyPurist = "unset";
			}
			if ((typeof V.FSBodyPuristLaw !== "undefined") && V.FSBodyPuristLaw !== 0) {
				V.arcologies[0].FSBodyPuristLaw = V.FSBodyPuristLaw;
			} else if (typeof V.arcologies[0].FSBodyPuristLaw === "undefined") {
				V.arcologies[0].FSBodyPuristLaw = 0;
			}
			if ((typeof V.FSPhysicalIdealist !== "undefined") && V.FSPhysicalIdealist !== "unset") {
				V.arcologies[0].FSPhysicalIdealist = V.FSPhysicalIdealist;
			} else if (typeof V.arcologies[0].FSPhysicalIdealist === "undefined") {
				V.arcologies[0].FSPhysicalIdealist = "unset";
			}
			if ((typeof V.FSPhysicalIdealistSMR !== "undefined") && V.FSPhysicalIdealistSMR !== 0) {
				V.arcologies[0].FSPhysicalIdealistSMR = V.FSPhysicalIdealistSMR;
			} else if (typeof V.arcologies[0].FSPhysicalIdealistSMR === "undefined") {
				V.arcologies[0].FSPhysicalIdealistSMR = 0;
			}
			if ((typeof V.FSTransformationFetishist !== "undefined") && V.FSTransformationFetishist !== "unset") {
				V.arcologies[0].FSTransformationFetishist = V.FSTransformationFetishist;
			} else if (typeof V.arcologies[0].FSTransformationFetishist === "undefined") {
				V.arcologies[0].FSTransformationFetishist = "unset";
			}
			if ((typeof V.FSTransformationFetishistSMR !== "undefined") && V.FSTransformationFetishistSMR !== 0) {
				V.arcologies[0].FSTransformationFetishistSMR = V.FSTransformationFetishistSMR;
			} else if (typeof V.arcologies[0].FSTransformationFetishistSMR === "undefined") {
				V.arcologies[0].FSTransformationFetishistSMR = 0;
			}
			delete V.arcologies[0].FSTransformationFetishistLaw;
			if ((typeof V.FSAssetExpansionist !== "undefined") && V.FSAssetExpansionist !== "unset") {
				V.arcologies[0].FSAssetExpansionist = V.FSAssetExpansionist;
			} else if (typeof V.arcologies[0].FSAssetExpansionist === "undefined") {
				V.arcologies[0].FSAssetExpansionist = "unset";
			}
			if ((typeof V.FSAssetExpansionistSMR !== "undefined") && V.FSAssetExpansionistSMR !== 0) {
				V.arcologies[0].FSAssetExpansionistSMR = V.FSAssetExpansionistSMR;
			} else if (typeof V.arcologies[0].FSAssetExpansionistSMR === "undefined") {
				V.arcologies[0].FSAssetExpansionistSMR = 0;
			}
			delete V.arcologies[0].FSAssetExpansionistLaw;
			if ((typeof V.FSSlimnessEnthusiast !== "undefined") && V.FSSlimnessEnthusiast !== "unset") {
				V.arcologies[0].FSSlimnessEnthusiast = V.FSSlimnessEnthusiast;
			} else if (typeof V.arcologies[0].FSSlimnessEnthusiast === "undefined") {
				V.arcologies[0].FSSlimnessEnthusiast = "unset";
			}
			if ((typeof V.FSSlimnessEnthusiastSMR !== "undefined") && V.FSSlimnessEnthusiastSMR !== 0) {
				V.arcologies[0].FSSlimnessEnthusiastSMR = V.FSSlimnessEnthusiastSMR;
			} else if (typeof V.arcologies[0].FSSlimnessEnthusiastSMR === "undefined") {
				V.arcologies[0].FSSlimnessEnthusiastSMR = 0;
			}
			if ((typeof V.FSMaturityPreferentialist !== "undefined") && V.FSMaturityPreferentialist !== "unset") {
				V.arcologies[0].FSMaturityPreferentialist = V.FSMaturityPreferentialist;
			} else if (typeof V.arcologies[0].FSMaturityPreferentialist === "undefined") {
				V.arcologies[0].FSMaturityPreferentialist = "unset";
			}
			if ((typeof V.FSMaturityPreferentialistLaw !== "undefined") && V.FSMaturityPreferentialistLaw !== 0) {
				V.arcologies[0].FSMaturityPreferentialistLaw = V.FSMaturityPreferentialistLaw;
			} else if (typeof V.arcologies[0].FSMaturityPreferentialistLaw === "undefined") {
				V.arcologies[0].FSMaturityPreferentialistLaw = 0;
			}
			if ((typeof V.FSYouthPreferentialist !== "undefined") && V.FSYouthPreferentialist !== "unset") {
				V.arcologies[0].FSYouthPreferentialist = V.FSYouthPreferentialist;
			} else if (typeof V.arcologies[0].FSYouthPreferentialist === "undefined") {
				V.arcologies[0].FSYouthPreferentialist = "unset";
			}
			if ((typeof V.FSYouthPreferentialistLaw !== "undefined") && V.FSYouthPreferentialistLaw !== 0) {
				V.arcologies[0].FSYouthPreferentialistLaw = V.FSYouthPreferentialistLaw;
			} else if (typeof V.arcologies[0].FSYouthPreferentialistLaw === "undefined") {
				V.arcologies[0].FSYouthPreferentialistLaw = 0;
			}
			if ((typeof V.FSPastoralist !== "undefined") && V.FSPastoralist !== "unset") {
				V.arcologies[0].FSPastoralist = V.FSPastoralist;
			} else if (typeof V.arcologies[0].FSPastoralist === "undefined") {
				V.arcologies[0].FSPastoralist = "unset";
			}
			if ((typeof V.FSPastoralistLaw !== "undefined") && V.FSPastoralistLaw !== 0) {
				V.arcologies[0].FSPastoralistLaw = V.FSPastoralistLaw;
			} else if (typeof V.arcologies[0].FSPastoralistLaw === "undefined") {
				V.arcologies[0].FSPastoralistLaw = 0;
			}
			if ((typeof V.FSChattelReligionist !== "undefined") && V.FSChattelReligionist !== "unset") {
				V.arcologies[0].FSChattelReligionist = V.FSChattelReligionist;
			} else if (typeof V.arcologies[0].FSChattelReligionist === "undefined") {
				V.arcologies[0].FSChattelReligionist = "unset";
			}
			if ((typeof V.FSChattelReligionistLaw !== "undefined") && V.FSChattelReligionistLaw !== 0) {
				V.arcologies[0].FSChattelReligionistLaw = V.FSChattelReligionistLaw;
			} else if (typeof V.arcologies[0].FSChattelReligionistLaw === "undefined") {
				V.arcologies[0].FSChattelReligionistLaw = 0;
			}
			if ((typeof V.FSRomanRevivalist !== "undefined") && V.FSRomanRevivalist !== "unset") {
				V.arcologies[0].FSRomanRevivalist = V.FSRomanRevivalist;
			} else if (typeof V.arcologies[0].FSRomanRevivalist === "undefined") {
				V.arcologies[0].FSRomanRevivalist = "unset";
			}
			if ((typeof V.FSRomanRevivalistLaw !== "undefined") && V.FSRomanRevivalistLaw !== 0) {
				V.arcologies[0].FSRomanRevivalistLaw = V.FSRomanRevivalistLaw;
			} else if (typeof V.arcologies[0].FSRomanRevivalistLaw === "undefined") {
				V.arcologies[0].FSRomanRevivalistLaw = 0;
			}
			if ((typeof V.FSEgyptianRevivalist !== "undefined") && V.FSEgyptianRevivalist !== "unset") {
				V.arcologies[0].FSEgyptianRevivalist = V.FSEgyptianRevivalist;
			} else if (typeof V.arcologies[0].FSEgyptianRevivalist === "undefined") {
				V.arcologies[0].FSEgyptianRevivalist = "unset";
			}
			if ((typeof V.FSEgyptianRevivalistLaw !== "undefined") && V.FSEgyptianRevivalistLaw !== 0) {
				V.arcologies[0].FSEgyptianRevivalistLaw = V.FSEgyptianRevivalistLaw;
			} else if (typeof V.arcologies[0].FSEgyptianRevivalistLaw === "undefined") {
				V.arcologies[0].FSEgyptianRevivalistLaw = 0;
			}
			if (typeof V.arcologies[0].FSEgyptianRevivalistIncestPolicy === "undefined") {
				V.arcologies[0].FSEgyptianRevivalistIncestPolicy = 0;
			}
			if (typeof V.arcologies[0].FSEgyptianRevivalistInterest === "undefined") {
				V.arcologies[0].FSEgyptianRevivalistInterest = 0;
			}
			if ((typeof V.FSEdoRevivalist !== "undefined") && V.FSEdoRevivalist !== "unset") {
				V.arcologies[0].FSEdoRevivalist = V.FSEdoRevivalist;
			} else if (typeof V.arcologies[0].FSEdoRevivalist === "undefined") {
				V.arcologies[0].FSEdoRevivalist = "unset";
			}
			if ((typeof V.FSEdoRevivalistLaw !== "undefined") && V.FSEdoRevivalistLaw !== 0) {
				V.arcologies[0].FSEdoRevivalistLaw = V.FSEdoRevivalistLaw;
			} else if (typeof V.arcologies[0].FSEdoRevivalistLaw === "undefined") {
				V.arcologies[0].FSEdoRevivalistLaw = 0;
			}
			if ((typeof V.FSArabianRevivalist !== "undefined") && V.FSArabianRevivalist !== "unset") {
				V.arcologies[0].FSArabianRevivalist = V.FSArabianRevivalist;
			} else if (typeof V.arcologies[0].FSArabianRevivalist === "undefined") {
				V.arcologies[0].FSArabianRevivalist = "unset";
			}
			if ((typeof V.FSArabianRevivalistLaw !== "undefined") && V.FSArabianRevivalistLaw !== 0) {
				V.arcologies[0].FSArabianRevivalistLaw = V.FSArabianRevivalistLaw;
			} else if (typeof V.arcologies[0].FSArabianRevivalistLaw === "undefined") {
				V.arcologies[0].FSArabianRevivalistLaw = 0;
			}
			if ((typeof V.FSChineseRevivalist !== "undefined") && V.FSChineseRevivalist !== "unset") {
				V.arcologies[0].FSChineseRevivalist = V.FSChineseRevivalist;
			} else if (typeof V.arcologies[0].FSChineseRevivalist === "undefined") {
				V.arcologies[0].FSChineseRevivalist = "unset";
			}
			if ((typeof V.FSChineseRevivalistLaw !== "undefined") && V.FSChineseRevivalistLaw !== 0) {
				V.arcologies[0].FSChineseRevivalistLaw = V.FSChineseRevivalistLaw;
			} else if (typeof V.arcologies[0].FSChineseRevivalistLaw === "undefined") {
				V.arcologies[0].FSChineseRevivalistLaw = 0;
			}
			delete V.arcologies[0].FSNullLaw;

			if (V.arcologies[0].FSSubjugationist !== "unset" && !Number.isFinite(V.arcologies[0].FSSubjugationist)) {
				V.arcologies[0].FSSubjugationist = 10;
				r += `<br>Fixed NaN FS value for FSSubjugationist`;
			}
			if (V.arcologies[0].FSGenderRadicalist !== "unset" && !Number.isFinite(V.arcologies[0].FSGenderRadicalist)) {
				V.arcologies[0].FSGenderRadicalist = 10;
				r += `<br>Fixed NaN FS value for FSGenderRadicalist`;
			}
			if (V.arcologies[0].FSRestart !== "unset" && !Number.isFinite(V.arcologies[0].FSRestart)) {
				V.arcologies[0].FSRestart = 10;
				r += `<br>Fixed NaN FS value for FSRestart`;
			}
			if (V.arcologies[0].FSRepopulationFocus !== "unset" && !Number.isFinite(V.arcologies[0].FSRepopulationFocus)) {
				V.arcologies[0].FSRepopulationFocus = 10;
				r += `<br>Fixed NaN FS value for FSRepopulationFocus`;
			}
			if (V.arcologies[0].FSSupremacist !== "unset" && !Number.isFinite(V.arcologies[0].FSSupremacist)) {
				V.arcologies[0].FSSupremacist = 10;
				r += `<br>Fixed NaN FS value for FSSupremacist`;
			}
			if (V.arcologies[0].FSBodyPurist !== "unset" && !Number.isFinite(V.arcologies[0].FSBodyPurist)) {
				V.arcologies[0].FSBodyPurist = 10;
				r += `<br>Fixed NaN FS value for FSBodyPurist`;
			}
			if (V.arcologies[0].FSPaternalist !== "unset" && !Number.isFinite(V.arcologies[0].FSPaternalist)) {
				V.arcologies[0].FSPaternalist = 10;
				r += `<br>Fixed NaN FS value for FSPaternalist`;
			}
			if (V.arcologies[0].FSSlimnessEnthusiast !== "unset" && !Number.isFinite(V.arcologies[0].FSSlimnessEnthusiast)) {
				V.arcologies[0].FSSlimnessEnthusiast = 10;
				r += `<br>Fixed NaN FS value for FSSlimnessEnthusiast`;
			}
			if (V.arcologies[0].FSGenderFundamentalist !== "unset" && !Number.isFinite(V.arcologies[0].FSGenderFundamentalist)) {
				V.arcologies[0].FSGenderFundamentalist = 10;
				r += `<br>Fixed NaN FS value for FSGenderFundamentalist`;
			}
			if (V.arcologies[0].FSMaturityPreferentialist !== "unset" && !Number.isFinite(V.arcologies[0].FSMaturityPreferentialist)) {
				V.arcologies[0].FSMaturityPreferentialist = 10;
				r += `<br>Fixed NaN FS value for FSMaturityPreferentialist`;
			}
			if (V.arcologies[0].FSYouthPreferentialist !== "unset" && !Number.isFinite(V.arcologies[0].FSYouthPreferentialist)) {
				V.arcologies[0].FSYouthPreferentialist = 10;
				r += `<br>Fixed NaN FS value for FSYouthPreferentialist`;
			}
			if (V.arcologies[0].FSTransformationFetishist !== "unset" && !Number.isFinite(V.arcologies[0].FSTransformationFetishist)) {
				V.arcologies[0].FSTransformationFetishist = 10;
				r += `<br>Fixed NaN FS value for FSTransformationFetishist`;
			}
			if (V.arcologies[0].FSHedonisticDecadence !== "unset" && !Number.isFinite(V.arcologies[0].FSHedonisticDecadence)) {
				V.arcologies[0].FSHedonisticDecadence = 10;
				r += `<br>Fixed NaN FS value for FSHedonisticDecadence`;
			}
			if (V.arcologies[0].FSPhysicalIdealist !== "unset" && !Number.isFinite(V.arcologies[0].FSPhysicalIdealist)) {
				V.arcologies[0].FSPhysicalIdealist = 10;
				r += `<br>Fixed NaN FS value for FSPhysicalIdealist`;
			}
			if (V.arcologies[0].FSPastoralist !== "unset" && !Number.isFinite(V.arcologies[0].FSPastoralist)) {
				V.arcologies[0].FSPastoralist = 10;
				r += `<br>Fixed NaN FS value for FSPastoralist`;
			}
			if (V.arcologies[0].FSAssetExpansionist !== "unset" && !Number.isFinite(V.arcologies[0].FSAssetExpansionist)) {
				V.arcologies[0].FSAssetExpansionist = 10;
				r += `<br>Fixed NaN FS value for FSAssetExpansionist`;
			}
			if (V.arcologies[0].FSDegradationist !== "unset" && !Number.isFinite(V.arcologies[0].FSDegradationist)) {
				V.arcologies[0].FSDegradationist = 10;
				r += `<br>Fixed NaN FS value for FSDegradationist`;
			}
			if (V.arcologies[0].FSRomanRevivalist !== "unset" && !Number.isFinite(V.arcologies[0].FSRomanRevivalist)) {
				V.arcologies[0].FSRomanRevivalist = 10;
				r += `<br>Fixed NaN FS value for FSRomanRevivalist`;
			}
			if (V.arcologies[0].FSChattelReligionist !== "unset" && !Number.isFinite(V.arcologies[0].FSChattelReligionist)) {
				V.arcologies[0].FSChattelReligionist = 10;
				r += `<br>Fixed NaN FS value for FSChattelReligionist`;
			}
			if (V.arcologies[0].FSChineseRevivalist !== "unset" && !Number.isFinite(V.arcologies[0].FSChineseRevivalist)) {
				V.arcologies[0].FSChineseRevivalist = 10;
				r += `<br>Fixed NaN FS value for FSChineseRevivalist`;
			}
			if (V.arcologies[0].FSArabianRevivalist !== "unset" && !Number.isFinite(V.arcologies[0].FSArabianRevivalist)) {
				V.arcologies[0].FSArabianRevivalist = 10;
				r += `<br>Fixed NaN FS value for FSArabianRevivalist`;
			}
			if (V.arcologies[0].FSEdoRevivalist !== "unset" && !Number.isFinite(V.arcologies[0].FSEdoRevivalist)) {
				V.arcologies[0].FSEdoRevivalist = 10;
				r += `<br>Fixed NaN FS value for FSEdoRevivalist`;
			}
			if (V.arcologies[0].FSEgyptianRevivalist !== "unset" && !Number.isFinite(V.arcologies[0].FSEgyptianRevivalist)) {
				V.arcologies[0].FSEgyptianRevivalist = 10;
				r += `<br>Fixed NaN FS value for FSEgyptianRevivalist`;
			}
			if (V.arcologies[0].FSAztecRevivalist !== "unset" && !Number.isFinite(V.arcologies[0].FSAztecRevivalist)) {
				V.arcologies[0].FSAztecRevivalist = 10;
				r += `<br>Fixed NaN FS value for FSAztecRevivalist`;
			}
			if (V.arcologies[0].FSIntellectualDependency !== "unset" && !Number.isFinite(V.arcologies[0].FSIntellectualDependency)) {
				V.arcologies[0].FSIntellectualDependency = 10;
				r += `<br>Fixed NaN FS value for FSIntellectualDependency`;
			}
			if (V.arcologies[0].FSSlaveProfessionalism !== "unset" && !Number.isFinite(V.arcologies[0].FSSlaveProfessionalism)) {
				V.arcologies[0].FSSlaveProfessionalism = 10;
				r += `<br>Fixed NaN FS value for FSSlaveProfessionalism`;
			}
			if (V.arcologies[0].FSPetiteAdmiration !== "unset" && !Number.isFinite(V.arcologies[0].FSPetiteAdmiration)) {
				V.arcologies[0].FSPetiteAdmiration = 10;
				r += `<br>Fixed NaN FS value for FSPetiteAdmiration`;
			}
			if (V.arcologies[0].FSStatuesqueGlorification !== "unset" && !Number.isFinite(V.arcologies[0].FSStatuesqueGlorification)) {
				V.arcologies[0].FSStatuesqueGlorification = 10;
				r += `<br>Fixed NaN FS value for FSStatuesqueGlorification`;
			}
			// Clean up FS in player arcology
			App.Update.FScheatDatatypeCleanup();
		}
	}

	// Player Arcology
	{
		if (typeof V.assistant === "number") {
			assistant.BC();
		} else {
			assistant.object();
		}
		if (jQuery.isEmptyObject(V.FSPromenade)) {
			V.FSPromenade = {
				Subjugationist: 0,
				Supremacist: 0,
				GenderRadicalist: 0,
				GenderFundamentalist: 0,
				Paternalist: 0,
				Degradationist: 0,
				BodyPurist: 0,
				TransformationFetishist: 0,
				YouthPreferentialist: 0,
				MaturityPreferentialist: 0,
				SlimnessEnthusiast: 0,
				AssetExpansionist: 0,
				Pastoralist: 0,
				PhysicalIdealist: 0,
				ChattelReligionist: 0,
				RomanRevivalist: 0,
				AztecRevivalist: 0,
				EgyptianRevivalist: 0,
				EdoRevivalist: 0,
				ArabianRevivalist: 0,
				ChineseRevivalist: 0,
				Repopulationist: 0,
				Eugenics: 0,
				Hedonism: 0,
				IntellectualDependency: 0,
				SlaveProfessionalism: 0,
				PetiteAdmiration: 0,
				StatuesqueGlorification: 0
			};
		}
		if (jQuery.isEmptyObject(V.arcologyUpgrade)) {
			V.arcologyUpgrade = {
				drones: 0,
				hydro: 0,
				apron: 0,
				grid: 0,
				spire: 0
			};
			V.arcologyUpgrade.drones = (V.AProsperityCap > 60) ? 1 : 0;
			V.arcologyUpgrade.hydro = (V.AProsperityCap > 80) ? 1 : 0;
			V.arcologyUpgrade.apron = (V.AProsperityCap > 100) ? 1 : 0;
			V.arcologyUpgrade.grid = (V.AProsperityCap > 120) ? 1 : 0;
			V.arcologyUpgrade.spire = (V.AProsperityCap > 240) ? 1 : 0;
		}
		if (jQuery.isEmptyObject(V.building)) {
			if (typeof V.sectors !== "undefined") {
				App.Update.sectorsToBuilding();
			} else {
				V.building = App.Arcology.defaultBuilding();
			}
		}

		if (jQuery.isEmptyObject(V.trinkets)) {
			V.trinkets = [];
			if (V.PC.career === "wealth") {
				V.trinkets.push("a collection of diplomas from expensive schools");
			} else if (V.PC.career === "capitalist") {
				V.trinkets.push("a framed low denomination piece of paper money from your native country");
			} else if (V.PC.career === "mercenary") {
				V.trinkets.push("a battered old assault rifle");
			} else if (V.PC.career === "slaver") {
				V.trinkets.push("a framed picture of a slave with her sale price scrawled across the bottom");
			} else if (V.PC.career === "engineer") {
				V.trinkets.push("an artist's impression of an early arcology design");
			} else if (V.PC.career === "medicine") {
				V.trinkets.push("a framed postsurgical x-ray");
			} else if (V.PC.career === "celebrity") {
				V.trinkets.push("a framed copy of the first news story featuring yourself");
			} else if (V.PC.career === "arcology owner") {
				V.trinkets.push("a miniature model of your first arcology");
			} else if (V.PC.career === "escort") {
				V.trinkets.push("a copy of the first porno you starred in");
			} else if (V.PC.career === "servant") {
				V.trinkets.push("a framed picture of your late Master");
			} else if (V.PC.career === "gang") {
				V.trinkets.push("your favorite handgun, whose sight has instilled fear in many");
			} else if (V.PC.career === "BlackHat") {
				V.trinkets.push("a news clipping of your first successful live hack");
			}
		}
	}

	// Clean up neighbor's arcologies
	App.Update.neighborArcologyCheatDatatypeCleanup();

	// Corp
	{
		// move from "V.corpDivArcade" format to "V.corp.DivArcade" (put corp into one object)
		for (let variable in State.variables) {
			if (variable.startsWith('corp') && variable !== "corp") {
				console.log ("Corp: moving V." + variable, V[variable], "to V.corp." + variable.slice(4));
				if (Array.isArray(V[variable])){
					V.corp[variable.slice(4)] = Array.from(V[variable]);
				} else if (typeof V[variable] === "object" && typeof V[variable] !== undefined) {
					V.corp[variable.slice(4)] = {};
					Object.assign(V.corp[variable.slice(4)], V[variable]);
				} else {
					V.corp[variable.slice(4)] = V[variable];
				}
			}
		}
		App.Corporate.Backcompat();
		/* Corporation variables added*/
		if (V.corp.ExpandToken > 1) {
			V.corp.ExpandToken = 1;
		}
		V.dividendTimer = V.dividendTimer || 13;

		/* Removing the old Corp from save*/
		if (V.corp.Value) {
			cashX(Math.min(Math.trunc((V.corp.Value / (V.publicShares + V.personalShares)) * V.personalShares), 1000000), "stocksTraded");
			/* Paying the player for his old corporation, so they can get the new one started with haste. It should perhaps have a message going with it*/
			if (typeof V.sectors !== "undefined") {
				for (let i = 0; i < V.sectors.length; i++) {
					if (V.sectors[i].type === "CorporateMarket") {
						V.sectors[i].type = "Markets";
						break;
					}
				}
			}
		}
	}

	// Organs
	{
		let newOrgans = [];
		V.organs.forEach(o => {
			if (o.type === "eyes") {
				newOrgans.push({type: "leftEye", weeksToCompletion: o.weeksToCompletion, ID: o.ID});
				newOrgans.push({type: "rightEye", weeksToCompletion: o.weeksToCompletion, ID: o.ID});
			} else {
				newOrgans.push(o);
			}
		});
		V.organs = newOrgans;

		newOrgans = [];
		V.completedOrgans.forEach(o => {
			if (o.type === "eyes") {
				newOrgans.push({type: "leftEye", ID: o.ID});
				newOrgans.push({type: "rightEye", ID: o.ID});
			} else {
				newOrgans.push(o);
			}
		});
		V.completedOrgans = newOrgans;
	}

	FacilityDatatypeCleanup();

	if (typeof V.TFS.compromiseWeek === "undefined") {
		V.TFS.compromiseWeek = 0;
	}

	// Pornstars
	{
		/* migrate to new genre-driven pornstar object */
		if (typeof V.pornStars === "number") {
			const oldPornStars = V.pornStars;

			V.pornStars = {};
			V.pornStars.general = {p1count: oldPornStars, p3ID: V.pornStarID};
			V.pornStars.fuckdoll = {p1count: V.pornStarFuckdolls, p3ID: V.pornStarFuckdollID};
			V.pornStars.rape = {p1count: V.pornStarRapees, p3ID: V.pornStarRapeID};
			V.pornStars.preggo = {p1count: V.pornStarPreggos, p3ID: V.pornStarPreggoID};
			V.pornStars.BBW = {p1count: V.pornStarBBWs, p3ID: V.pornStarBBWID};
			V.pornStars.gainer = {p1count: V.pornStarGainers, p3ID: V.pornStarGainerID};
			V.pornStars.stud = {p1count: V.pornStarStuds, p3ID: V.pornStarStudID};
			V.pornStars.loli = {p1count: V.pornStarLolis, p3ID: V.pornStarLoliID};
			V.pornStars.deepThroat = {p1count: V.pornStarDeepThroats, p3ID: V.pornStarDeepThroatID};
			V.pornStars.struggleFuck = {p1count: V.pornStarStruggleFucks, p3ID: V.pornStarStruggleFuckID};
			V.pornStars.painal = {p1count: V.pornStarPainals, p3ID: V.pornStarPainalID};
			V.pornStars.tease = {p1count: V.pornStarTeases, p3ID: V.pornStarTeaseID};
			V.pornStars.romantic = {p1count: V.pornStarRomantics, p3ID: V.pornStarRomanticID};
			V.pornStars.pervert = {p1count: V.pornStarPerverts, p3ID: V.pornStarPervertID};
			V.pornStars.caring = {p1count: V.pornStarCarings, p3ID: V.pornStarCaringID};
			V.pornStars.unflinching = {p1count: V.pornStarUnflinchings, p3ID: V.pornStarUnflinchingID};
			V.pornStars.sizeQueen = {p1count: V.pornStarSizeQueens, p3ID: V.pornStarSizeQueenID};
			V.pornStars.neglectful = {p1count: V.pornStarNeglectfuls, p3ID: V.pornStarNeglectfulID};
			V.pornStars.cumAddict = {p1count: V.pornStarCumAddicts, p3ID: V.pornStarCumAddictID};
			V.pornStars.analAddict = {p1count: V.pornStarAnalAddicts, p3ID: V.pornStarAnalAddictID};
			V.pornStars.attentionWhore = {p1count: V.pornStarAttentionWhores, p3ID: V.pornStarAttentionWhoreID};
			V.pornStars.breastGrowth = {p1count: V.pornStarBreastGrowths, p3ID: V.pornStarBreastGrowthID};
			V.pornStars.abusive = {p1count: V.pornStarAbusives, p3ID: V.pornStarAbusiveID};
			V.pornStars.malicious = {p1count: V.pornStarMalicious, p3ID: V.pornStarMaliciousID};
			V.pornStars.selfHating = {p1count: V.pornStarSelfHatings, p3ID: V.pornStarSelfHatingID};
			V.pornStars.breeder = {p1count: V.pornStarBreeders, p3ID: V.pornStarBreederID};
			V.pornStars.sub = {p1count: V.pornStarSubs, p3ID: V.pornStarSubID};
			V.pornStars.cumSlut = {p1count: V.pornStarCumSluts, p3ID: V.pornStarCumSlutID};
			V.pornStars.anal = {p1count: V.pornStarAnals, p3ID: V.pornStarAnalID};
			V.pornStars.humiliation = {p1count: V.pornStarHumiliations, p3ID: V.pornStarHumiliationID};
			V.pornStars.boobs = {p1count: V.pornStarBoobs, p3ID: V.pornStarBoobsID};
			V.pornStars.dom = {p1count: V.pornStarDoms, p3ID: V.pornStarDomID};
			V.pornStars.sadist = {p1count: V.pornStarSadists, p3ID: V.pornStarSadistID};
			V.pornStars.masochist = {p1count: V.pornStarMasochists, p3ID: V.pornStarMasochistID};
			V.pornStars.pregnancy = {p1count: V.pornStarPregnancySluts, p3ID: V.pornStarPregnancyID};
		}

		/* make sure that any new genres get added correctly (and populate V.pornStars for very old games) */
		for (let genre in App.Porn.getAllGenres()) {
			if (typeof V.pornStars[genre.fameVar] === "undefined") {
				V.pornStars[genre.fameVar] = {p1count: 0, p3ID: 0};
			}
		}
		if (V.PCSlutContacts === 0) {
			V.PCSlutContacts = 1;
		}
	}

	// Slave services and goods variables
	{
		if (typeof V.lowerClassSatisfied !== "undefined") {
			V.classSatisfied.lowerClass = V.lowerClassSatisfied;
		}
		if (typeof V.sexSubsidiesLC !== "undefined") {
			V.sexSubsidies.lowerClass = V.sexSubsidiesLC;
		}
		if (typeof V.sexSupplyBarriersLC !== "undefined") {
			V.sexSupplyBarriers.lowerClass = V.sexSupplyBarriersLC;
		}
		V.food = Math.max(+V.food, 0) || 12500;
		if (V.foodConsumption === 0) {
			V.foodConsumption = ((V.lowerClass * V.foodRate.lower) + (V.middleClass * V.foodRate.middle) + (V.upperClass * V.foodRate.upper) + (V.topClass * V.foodRate.top)); /* total amount food consumed per week */
		}
	}
	
	//Stud stuff
	{
		V.Stud = V.Stud || 0;
		V.StudCum = Math.max(+V.StudCum, 0) || 0;
	}

	EconomyDatatypeCleanup();
	ArcologyDatatypeCleanup();

	r += ` Done!<br>`;
	return r;
};

App.Update.slaveVariables = function() {
	let r = `Setting missing slave variables... `;
	/* Adding a new variable? Consider putting it in datatypeCleanupJS.tw instead of here */
	for (let bci = 0; bci < V.slaves.length; bci++) {
		let Slave = V.slaves[bci];

		if (typeof Slave !== "object") {
			V.slaves.deleteAt(bci), bci--;
			continue;
		}

		App.Update.Slave(Slave);

		V.slaves[bci] = Slave;
	}
	r += ` Done!<br>`;
	return r;
};

App.Update.slaveRecords = function() {
	let r = `Checking and fixing slave records...`;
	V.slaves.forEach((slave) => {
		App.Entity.Utils.SlaveDataSchemeCleanup(slave);
		SlaveDatatypeCleanup(slave);
		let leaderIdx = V.leaders.findIndex(function(s) { return s.ID === slave.ID; });
		if (leaderIdx !== -1) {
			V.leaders[leaderIdx] = slave;
		}
	});
	if (V.hostage !== 0) {
		App.Update.Slave(V.hostage);
		App.Entity.Utils.SlaveDataSchemeCleanup(V.hostage);
		SlaveDatatypeCleanup(V.hostage);
	}
	if (typeof V.slaveAfterRA !== "undefined") {
		App.Update.Slave(V.slaveAfterRA);
		App.Entity.Utils.SlaveDataSchemeCleanup(V.slaveAfterRA);
		SlaveDatatypeCleanup(V.slaveAfterRA);
	}
	if (V.boomerangSlave !== 0) {
		App.Update.Slave(V.boomerangSlave);
		App.Entity.Utils.SlaveDataSchemeCleanup(V.boomerangSlave);
		SlaveDatatypeCleanup(V.boomerangSlave);
	}
	if (V.traitor !== 0) {
		App.Update.Slave(V.traitor);
		App.Entity.Utils.SlaveDataSchemeCleanup(V.traitor);
		SlaveDatatypeCleanup(V.traitor);
	}
	r += ` Done!<br>`;

	if (V.tanks.length > 0) {
		r += `Checking and fixing records for incubator tanks... `;
		V.tanks.forEach((slave) => {
			App.Update.Slave(slave);
			App.Entity.Utils.SlaveDataSchemeCleanup(slave);
			SlaveDatatypeCleanup(slave, true);
			/* pass second argument as true so that slaveAgeDatatypeCleanup is not run */
		});
		r += ` Done!<br> `;
	}

	if (V.cribs.length > 0) {
		r += `Checking and fixing records for nursery cribs... `;
		V.cribs.forEach((child) => {
			if (child.actualAge < 3) {
				App.Facilities.Nursery.InfantDatatypeCleanup(child);
			} else {
				App.Entity.Utils.SlaveDataSchemeCleanup(child, true);
				App.Facilities.Nursery.ChildDatatypeCleanup(child);
			}
		});
		V.cribsIndices = App.Facilities.Nursery.cribsToIndices();
		r += ` Done!<br> `;
	}
	return r;
};

App.Update.specialSlaveRecords = function() {
	let r = "";
	if (V.heroSlaves.length > 0) {
		r += `Checking and fixing special slave records... `;
		V.heroSlaves.forEach((slave) => {
			App.Entity.Utils.SlaveDataSchemeCleanup(slave);
			/* No SlaveDatatypeCleanup() call as hero slaves are not SlaveState objects */
		});
		r += ` Done!<br> `;
	}
	return r;
};

App.Update.genePoolRecords = function() {
	let r = `Updating gene pool records... `;
	for (let bci = 0; bci < V.genePool.length; bci++) {
		let slave = V.genePool[bci];

		App.Update.Slave(slave);

		if (V.genePool.map(function(s) { return s.ID; }).count(slave.ID) > 1) {
			/* first check for duplicate IDs, keep the first entry and delete the others */
			for (let bci2 = bci + 1; bci2 < V.genePool.length; bci2++) {
				if (V.genePool[bci2].ID === slave.ID) {
					V.genePool.deleteAt(bci2), bci2--;
				}
			}
		}
		let dontDeleteMe = 0;
		if (typeof V.slaveIndices[slave.ID] !== "undefined") {
			/* are we still in the V.slaves array? */
			dontDeleteMe = 1;
		}
		if (V.traitor !== 0) {
			if (isImpregnatedBy(V.traitor, slave) || V.traitor.ID === slave.ID) {
				/* did we impregnate the traitor, or are we the traitor? */
				dontDeleteMe = 1;
			}
		}
		if (V.boomerangSlave !== 0) {
			if (isImpregnatedBy(V.boomerangSlave, slave) || V.boomerangSlave.ID === slave.ID) {
				/* did we impregnate the boomerang, or are we the boomerang? */
				dontDeleteMe = 1;
			}
		}
		if (isImpregnatedBy(V.PC, slave)) {
			/* did we impregnate the PC */
			dontDeleteMe = 1;
		}
		if (dontDeleteMe === 0) {
			/* avoid going through this loop if possible */
			for (let bci2 = 0; bci2 < V.slaves.length; bci2++) {
				if (isImpregnatedBy(V.slaves[bci2], slave)) {
					/* have we impregnated a slave on the slaves array? */
					dontDeleteMe = 1;
					break;
				}
			}
		}
		if (dontDeleteMe === 0) {
			V.genePool.deleteAt(bci), bci--;
			continue;
		}
		if (typeof slave.origSkin === "undefined") {
			slave.origSkin = slave.skin;
		}
		if (typeof slave.origRace === "undefined") {
			slave.origRace = slave.race;
		}
		if (V.releaseID < 1059) {
			if (typeof slave.eyesImplant === "undefined") {
				slave.eyesImplant = 0;
			}
			let oldEyes;
			if (slave.origEye === "implant") {
				slave.eyesImplant = 1;
				oldEyes = V.genePool.find(function(s) { return s.ID === slave.ID; });
				slave.origEye = oldEyes.origEye;
			}
			if (slave.origEye === "none") {
				slave.eyes = -3;
				oldEyes = V.genePool.find(function(s) { return s.ID === slave.ID; });
				slave.origEye = oldEyes.origEye;
			}
			if (slave.eyeColor === "empty") {
				slave.eyeColor = slave.origEye;
				slave.eyes = -4;
			}
		}
		if (typeof slave.custom === "undefined") {
			slave.custom = {};
		}
		slave.custom.tattoo = slave.customTat || "";
		slave.custom.label = slave.custom.label || "";
		slave.custom.desc = slave.custom.desc || "";
		slave.custom.title = slave.custom.title || "";
		slave.custom.titleLisp = slave.custom.titleLisp || "";
		slave.custom.hairVector = slave.custom.hairVector || 0;
		slave.custom.image = slave.custom.image || null;

		App.Entity.Utils.GenePoolRecordCleanup(slave);
		V.genePool[bci] = slave;
	}
	if (V.nurseryNannies > 0) {
		for (let bci = 0; bci < V.cribs.length; bci++) {
			App.Update.Slave(V.cribs[bci]);
			// let _nurseryChild = V.cribs[bci]; TODO: on importing this to JS, what is this even supposed to do?
		}
	}

	V.AgeEffectOnTrainerPricingPC = 1;
	V.AgeEffectOnTrainerEffectivenessPC = 1;
	V.AgeTrainingUpperBoundPC = 14;
	V.AgeTrainingLowerBoundPC = 12;
	V.IsInPrimePC = 3;
	V.IsPastPrimePC = 5000;
	r += ` Done!<br>`;
	return r;
};

App.Update.RAassistantData = function() {
	let r = `Updating Rules Assistant data...`;
	V.defaultRules = V.defaultRules.map(rule => App.Entity.Utils.RARuleDatatypeCleanup(rule));
	r += ` Done!<br>`;
	return r;
};

App.Update.oldVersions = function() {
	if (V.releaseID === 1021 || V.releaseID === 1020 || V.releaseID === 1019 || V.releaseID === 2022) {
		V.releaseID = 1022;
	}
	let r = "";
	if (V.releaseID < 1043) {
		V.defaultRules.forEach((rule) => {
			if (rule.condition.excludeSpecialSlaves) {
				rule.condition.specialSlaves = 0;
			} else {
				rule.condition.specialSlaves = -1;
			}
			delete rule.condition.excludeSpecialSlaves;
		});
	}
	if (V.releaseID === 1043) {
		V.slaves.forEach(s => { s.skill.whoring = s.skill.whore / 2; });
		V.tanks.forEach(s => { s.skill.whoring = s.skill.whore / 2; });
		V.cribs.forEach(s => { s.skill.whoring = s.skill.whore / 2; });
		V.heroSlaves.forEach(hs => {
			if (hs.hasOwnProperty("skill") && hs.skill.hasOwnProperty("whore")) {
				hs.skill.whoring = hs.skill.whore;
				delete hs.skill.whore;
			}
		});
	}
	/* unify cybermod & vanilla */
	/* limbs */
	if (V.releaseID < 1045) {
		if (typeof V.limbs !== "undefined") {
			V.adjustProsthetics = [];
			V.limbs.forEach((l) => {
				switch (l.type) {
					case "simple":
						V.adjustProsthetics.push({id: "basicL", workLeft: l.weeksToCompletion * 10, slaveID: l.ID});
						break;
					case "sex":
						V.adjustProsthetics.push({id: "sexL", workLeft: l.weeksToCompletion * 10, slaveID: l.ID});
						break;
					case "beauty":
						V.adjustProsthetics.push({id: "beautyL", workLeft: l.weeksToCompletion * 10, slaveID: l.ID});
						break;
					case "combat":
						V.adjustProsthetics.push({id: "combatL", workLeft: l.weeksToCompletion * 10, slaveID: l.ID});
						break;
					case "cyber":
						V.adjustProsthetics.push({id: "cyberneticL", workLeft: l.weeksToCompletion * 10, slaveID: l.ID});
						break;
				}
			});
		}
		if (typeof V.limbsCompleted !== "undefined") {
			V.adjustProstheticsCompleted = V.limbsCompleted;
		}

		/* lab */
		if (typeof V.researchLab.level === "undefined") {
			V.researchLab.level = 0;
			if (typeof V.researchLab.built !== "undefined") {
				if (V.researchLab.built === "true") {
					V.researchLab.level = 1;
					if (V.prostheticsUpgrade === 0) {
						V.prostheticsUpgrade = 1;
					}
				}
				delete V.researchLab.built;
			}
		}
		if (typeof V.researchLab.speed === "undefined") {
			V.researchLab.speed = ((V.researchLab.hired * 3) + V.researchLab.menials) * V.researchLab.aiModule;
		}
		if (typeof V.researchLab.tasks === "undefined") {
			V.researchLab.tasks = [];
		}
		if (typeof V.researchLab.research !== "undefined") {
			if (V.researchLab.research !== "none") {
				let id;
				switch (V.researchLab.research) {
					case "Basic prosthetics interface":
						id = "interfaceP1";
						break;
					case "Advanced prosthetics interface":
						id = "interfaceP2";
						break;
					case "Basic prosthetic limbs":
						id = "basicL";
						break;
					case "Advanced sex limbs":
						id = "sexL";
						break;
					case "Advanced beauty limbs":
						id = "beautyL";
						break;
					case "Advanced combat limbs":
						id = "combatL";
						break;
					case "Cybernetic limbs":
						id = "cyberneticL";
						break;
					case "Ocular implants":
						id = "ocular";
						break;
					case "Cochlear implants":
						id = "cochlear";
						break;
					case "Electrolarynx":
						id = "electrolarynx";
						break;
				}
				V.researchLab.tasks.push({type: "research", id: id, workLeft: V.researchLab.productionTime});
			}
			delete V.researchLab.research;
		}
		if (typeof V.researchLab.manufacture !== "undefined") {
			if (V.researchLab.manufacture !== "none") {
				let id;
				switch (V.researchLab.manufacture) {
					case "Basic prosthetics interface":
						id = "interfaceP1";
						break;
					case "Advanced prosthetics interface":
						id = "interfaceP2";
						break;
					case "Basic prosthetic limbs":
						id = "basicL";
						break;
					case "Advanced sex limbs":
						id = "sexL";
						break;
					case "Advanced beauty limbs":
						id = "beautyL";
						break;
					case "Advanced combat limbs":
						id = "combatL";
						break;
					case "Cybernetic limbs":
						id = "cyberneticL";
						break;
					case "Ocular implants":
						id = "ocular";
						break;
					case "Cochlear implants":
						id = "cochlear";
						break;
					case "Electrolarynx":
						id = "electrolarynx";
						break;
				}
				V.researchLab.tasks.push({type: "craft", id: id, workLeft: V.researchLab.productionTime});
			}
			delete V.researchLab.manufacture;
		}
		delete V.researchLab.productionTime;

		/* stockpile */
		if (jQuery.isEmptyObject(V.prosthetics)) {
			if (jQuery.isEmptyObject(V.stockpile)) {
				V.prosthetics = {};
				setup.prostheticIDs.forEach(function(id) {
					V.prosthetics[id] = {amount: 0, research: 0};
				});
			} else {
				if (typeof V.stockpile.cochlearImplant === "undefined") {
					V.stockpile.cochlearImplant = 0;
				}
				if (typeof V.stockpile.electrolarynx === "undefined") {
					V.stockpile.electrolarynx = 0;
				}
				if (typeof V.stockpile.interfacePTail === "undefined") {
					V.stockpile.interfacePTail = 0;
				}
				if (typeof V.stockpile.modPTail === "undefined") {
					V.stockpile.modPTail = 0;
				}
				if (typeof V.stockpile.warPTail === "undefined") {
					V.stockpile.warPTail = 0;
				}
				if (typeof V.stockpile.sexPTail === "undefined") {
					V.stockpile.sexPTail = 0;
				}
				V.prosthetics = {
					interfaceP1: {amount: V.stockpile.basicPLimbInterface, research: V.researchLab.basicPLimbInterface},
					interfaceP2: {amount: V.stockpile.advPLimbInterface, research: V.researchLab.advPLimbInterface},
					basicL: {amount: V.stockpile.basicPLimb, research: V.researchLab.basicPLimb},
					sexL: {amount: V.stockpile.advSexPLimb, research: V.researchLab.advSexPLimb},
					beautyL: {amount: V.stockpile.advGracePLimb, research: V.researchLab.advGracePLimb},
					combatL: {amount: V.stockpile.advCombatPLimb, research: V.researchLab.advCombatPLimb},
					cyberneticL: {amount: V.stockpile.cyberneticPLimb, research: V.researchLab.cyberneticPLimb},
					ocular: {amount: V.stockpile.ocularImplant, research: V.researchLab.ocularImplant},
					cochlear: {amount: V.stockpile.cochlearImplant, research: V.researchLab.cochlearImplant},
					electrolarynx: {amount: V.stockpile.electrolarynx, research: V.researchLab.electrolarynx},
					interfaceTail: {amount: V.stockpile.interfacePTail, research: 0},
					modT: {amount: V.stockpile.modPTail, research: 0},
					combatT: {amount: V.stockpile.warPTail, research: 0},
					sexT: {amount: V.stockpile.sexPTail, research: 0},
					erectile: {amount: V.stockpile.erectileImplant, research: V.researchLab.erectileImplant}
				};
				delete V.researchLab.basicPLimbInterface;
				delete V.researchLab.advPLimbInterface;
				delete V.researchLab.basicPLimb;
				delete V.researchLab.advSexPLimb;
				delete V.researchLab.advGracePLimb;
				delete V.researchLab.advCombatPLimb;
				delete V.researchLab.cyberneticPLimb;
				delete V.researchLab.ocularImplant;
				delete V.researchLab.cochlearImplant;
				delete V.researchLab.electrolarynx;
				delete V.researchLab.erectileImplant;
			}
		}
	}
	if (V.releaseID < 1047) {
		if (V.loliGrow > 0) {
			V.loliGrow = 1;
		} else {
			V.loliGrow = 0;
		}
	}
	if (V.releaseID < 1055) {
		if (V.disableLisping === 0) {
			V.disableLisping = 1;
		} else {
			V.disableLisping = 0;
		}
	}
	if (V.releaseID < 1057) {
		r += `Standardizing player object... `;
		if (typeof V.PC.actualAge === "undefined") {
			if (V.PC.age === 1) {
				V.PC.actualAge = 20;
			} else if (V.PC.age === 3) {
				V.PC.actualAge = 50;
			} else {
				V.PC.actualAge = 35;
			}
		}
		if (typeof V.PC.markings === "undefined") {
			V.PC.markings = "none";
		}
		if (typeof V.PC.pronoun === "undefined") {
			generatePlayerPronouns(V.PC);
		}
		if (typeof V.PC.pregKnown === "undefined") {
			if (V.PC.preg > 0) {
				V.PC.pregKnown = 1;
			} else {
				V.PC.pregKnown = 0;
			}
		}
		if (typeof V.PC.pregWeek === "undefined") {
			if (V.PC.preg > 0) {
				V.PC.pregWeek = V.PC.preg;
			} else {
				V.PC.pregWeek = 0;
			}
		}
		if (typeof V.PC.pregType === "undefined") {
			if (V.PC.preg > 0) {
				V.PC.pregType = 1;
			} else {
				V.PC.pregType = 0;
			}
		}
		if (typeof V.PC.belly === "undefined") {
			if (V.PC.preg > 0) {
				V.PC.belly = getPregBellySize(V.PC);
			} else {
				V.PC.belly = 0;
			}
		}
		if (typeof V.PC.skin === "undefined") {
			V.PC.skin = "light";
		}
		if (typeof V.PC.origSkin === "undefined") {
			V.PC.origSkin = V.PC.skin;
		}
		if (typeof V.PC.eyeColor === "undefined") {
			V.PC.eyeColor = "blue";
		}
		if (typeof V.PC.origEye === "undefined") {
			V.PC.origEye = V.PC.eyeColor;
		}
		if (typeof V.PC.pupil === "undefined") {
			if (V.PC.eyeColor === "catlike") {
				V.PC.pupil = "catlike";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "serpent-like") {
				V.PC.pupil = "serpent-like";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "devilish") {
				V.PC.pupil = "devilish";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "demonic") {
				V.PC.pupil = "demonic";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "hypnotic") {
				V.PC.pupil = "hypnotic";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "heart-shaped") {
				V.PC.pupil = "heart-shaped";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "wide-eyed") {
				V.PC.pupil = "wide-eyed";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "almond-shaped") {
				V.PC.pupil = "almond-shaped";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "bright") {
				V.PC.pupil = "bright";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "teary") {
				V.PC.pupil = "teary";
				V.PC.eyeColor = "blue";
			} else if (V.PC.eyeColor === "vacant") {
				V.PC.pupil = "vacant";
				V.PC.eyeColor = "blue";
			} else {
				V.PC.pupil = "circular";
			}
		}
		if (typeof V.PC.sclerae === "undefined") {
			V.PC.sclerae = "white";
		}
		if (typeof V.PC.race === "undefined") {
			V.PC.race = "white";
		}
		if (typeof V.PC.origRace === "undefined") {
			V.PC.origRace = V.PC.race;
		}
		if (typeof V.PC.hColor === "undefined") {
			V.PC.hColor = "blonde";
		}
		if (typeof V.PC.origHColor === "undefined") {
			V.PC.origHColor = V.PC.hColor;
		}
		if (typeof V.PC.nationality === "undefined") {
			V.PC.nationality = "Stateless";
		}
		if (V.PC.boobsBonus === -0.5) {
			V.PC.boobsBonus = -1;
		}
		if (typeof V.PC.sclerae === "undefined") {
			V.PC.sclerae = "white";
		}
		if (typeof V.PC.fetish === "undefined") {
			V.PC.fetish = "none";
		}
		if (typeof V.PC.behavioralFlaw === "undefined") {
			V.PC.behavioralFlaw = "none";
		}
		if (typeof V.PC.behavioralQuirk === "undefined") {
			V.PC.behavioralQuirk = "none";
		}
		if (typeof V.PC.sexualFlaw === "undefined") {
			V.PC.sexualFlaw = "none";
		}
		if (typeof V.PC.sexualQuirk === "undefined") {
			V.PC.sexualQuirk = "none";
		}
		if (typeof V.PC.pubicHStyle === "undefined") {
			V.PC.pubicHStyle = "hairless";
		}
		if (typeof V.PC.underArmHStyle === "undefined") {
			V.PC.underArmHStyle = "hairless";
		}
		if (typeof V.PC.eggType === "undefined") {
			V.PC.eggType = "human";
		}
		if (typeof V.PC.ballType === "undefined") {
			V.PC.ballType = "human";
		}
		if (typeof V.PC.geneticQuirks === "undefined") {
			V.PC.geneticQuirks = {
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
				wellHung: 1,
				wGain: 0,
				wLoss: 0,
				mGain: 0,
				mLoss: 0,
				androgyny: 0,
				girlsOnly: 0
			};
			if (V.PC.birthMaster > 0) {
				V.PC.geneticQuirks.fertility = 2;
			} else if (V.PC.career === "servant") {
				V.PC.geneticQuirks.fertility = 1;
			}
		} else {
			if (typeof V.PC.geneticQuirks.heterochromia === "undefined") {
				V.PC.geneticQuirks.heterochromia = 0;
			}
			if (typeof V.PC.geneticQuirks.girlsOnly === "undefined") {
				V.PC.geneticQuirks.girlsOnly = 0;
			}
			if (typeof V.PC.geneticQuirks.mGain === "undefined") {
				V.PC.geneticQuirks.mGain = 0;
			}
			if (typeof V.PC.geneticQuirks.mLoss === "undefined") {
				V.PC.geneticQuirks.mLoss = 0;
			}
		}
		if (V.releaseID < 1032) {
			if (V.PC.pregSource === -1) {
				V.PC.pregSource = -6;
			} else if (V.PC.pregSource === -2) {
				V.PC.pregSource = -5;
			} else if (V.PC.pregSource === -6) {
				V.PC.pregSource = -1;
			} else if (V.PC.pregSource === -5) {
				V.PC.pregSource = -2;
			}
		}
		if (typeof V.PC.genes === "undefined") {
			if (V.PC.title === 1) {
				V.PC.genes = "XY";
			} else {
				V.PC.genes = "XX";
			}
		}

		/* player object converter */
		let newPC = basePlayer();
		newPC.slaveName = V.PC.name;
		newPC.slaveSurname = V.PC.surname;
		newPC.birthName = V.PC.name;
		if (V.PC.slaveSurname) {
			newPC.birthSurname = V.PC.surname;
		} else {
			newPC.birthSurname = "";
		}
		newPC.title = V.PC.title;
		newPC.genes = V.PC.genes;
		newPC.career = V.PC.career;
		newPC.rumor = V.PC.rumor;
		newPC.birthWeek = V.PC.birthWeek;
		newPC.refreshment = V.PC.refreshment;
		newPC.refreshmentType = V.PC.refreshmentType;
		newPC.actualAge = V.PC.actualAge;
		newPC.physicalAge = V.PC.physicalAge;
		newPC.visualAge = V.PC.visualAge;
		newPC.ovaryAge = V.PC.ovaryAge;
		newPC.ageImplant = V.PC.ageImplant;
		newPC.nationality = V.PC.nationality;
		newPC.race = V.PC.race;
		newPC.origRace = V.PC.origRace;
		newPC.skin = V.PC.skin;
		newPC.origSkin = V.PC.origSkin;
		newPC.markings = V.PC.markings;
		newPC.hColor = V.PC.hColor;
		newPC.origHColor = V.PC.origHColor;
		newPC.origEye = V.PC.origEye;
		/* needed for compatibility currently */
		newPC.eye.origColor = V.PC.origEye;
		newPC.eye.left.iris = V.PC.eyeColor;
		newPC.eye.left.pupil = V.PC.pupil;
		newPC.eye.left.sclera = V.PC.sclerae;
		newPC.eye.right.iris = V.PC.eyeColor;
		newPC.eye.right.pupil = V.PC.pupil;
		newPC.eye.right.sclera = V.PC.sclerae;
		newPC.faceShape = V.PC.faceShape;
		newPC.skill.trading = V.PC.trading;
		newPC.skill.warfare = V.PC.warfare;
		newPC.skill.hacking = V.PC.hacking;
		newPC.skill.slaving = V.PC.slaving;
		newPC.skill.engineering = V.PC.engineering;
		newPC.skill.medicine = V.PC.medicine;
		newPC.skill.cumTap = V.PC.cumTap;
		newPC.father = V.PC.father;
		newPC.mother = V.PC.mother;
		newPC.sisters = V.PC.sisters;
		newPC.daughters = V.PC.daughters;
		newPC.counter.birthsTotal = V.PC.births;
		newPC.counter.birthElite = V.PC.birthElite;
		newPC.counter.birthMaster = V.PC.birthMaster;
		newPC.counter.birthDegenerate = V.PC.birthDegenerate;
		newPC.counter.birthClient = V.PC.birthClient;
		newPC.counter.birthArcOwner = V.PC.birthArcOwner;
		newPC.counter.birthCitizen = V.PC.birthCitizen;
		newPC.counter.birthFutaSis = V.PC.birthFutaSis;
		newPC.counter.birthSelf = V.PC.birthSelf;
		newPC.counter.birthLab = V.PC.birthLab;
		newPC.counter.birthOther = V.PC.birthOther;
		if (typeof V.PC.laborCount !== "undefined") {
			newPC.counter.laborCount = V.PC.laborCount;
		}
		newPC.counter.slavesFathered = V.PC.slavesFathered;
		newPC.counter.slavesKnockedUp = V.PC.slavesKnockedUp;
		newPC.sexualEnergy = V.PC.sexualEnergy;
		newPC.staminaPills = V.PC.staminaPills;
		newPC.preg = V.PC.preg;
		newPC.pregType = V.PC.pregType;
		newPC.pregWeek = V.PC.pregWeek;
		newPC.pregKnown = V.PC.pregKnown;
		newPC.fertKnown = V.PC.fertKnown;
		newPC.fertPeak = V.PC.fertPeak;
		newPC.fertDrugs = V.PC.fertDrugs;
		newPC.forcedFertDrugs = V.PC.forcedFertDrugs;
		newPC.belly = V.PC.belly;
		newPC.bellyPreg = V.PC.bellyPreg;
		newPC.pregSource = V.PC.pregSource;
		newPC.pregMood = V.PC.pregMood;
		newPC.labor = V.PC.labor;
		newPC.degeneracy = V.PC.degeneracy;
		newPC.pubicHStyle = V.PC.pubicHStyle;
		newPC.underArmHStyle = V.PC.underArmHStyle;
		if (V.PC.dick === 1) {
			newPC.dick = 4;
			newPC.prostate = 1;
			if (V.PC.ballsImplant === 4 || V.PC.balls === 4) {
				newPC.balls = 30;
				newPC.scrotum = 7;
			} else if (V.PC.ballsImplant === 3 || V.PC.balls === 3) {
				newPC.balls = 14;
				newPC.scrotum = 6;
			} else if (V.PC.ballsImplant === 2 || V.PC.balls === 2) {
				newPC.balls = 9;
				newPC.scrotum = 5;
			} else if (V.PC.ballsImplant === 1 || V.PC.balls === 1) {
				newPC.balls = 5;
				newPC.scrotum = 4;
			} else {
				newPC.balls = 3;
				newPC.scrotum = 3;
			}
			if (V.PC.ballsImplant > 0) {
				newPC.ballsImplant = newPC.balls - 3;
			}
		} else {
			newPC.dick = 0;
			newPC.prostate = 0;
			newPC.balls = 0;
			newPC.scrotum = 0;
		}
		newPC.newVag = V.PC.newVag;
		if (V.PC.vagina === 1) {
			newPC.ovaries = 1;
			newPC.vaginaLube = 1;
			if (V.PC.newVag === 1) {
				newPC.vagina = 1;
			} else if (V.PC.career === "escort" || V.PC.birthsTotal >= 10 || V.PC.career === "servant") {
				newPC.vagina = 4;
			} else if (V.PC.birthsTotal > 2) {
				newPC.vagina = 3;
			} else if (V.PC.career === "gang" || V.PC.career === "celebrity" || V.PC.career === "wealth" || V.PC.birthsTotal > 0) {
				newPC.vagina = 2;
			} else {
				newPC.vagina = 1;
			}
		}
		if (V.PC.boobs === 1) {
			if (V.PC.boobsBonus === -3) {
				newPC.boobs = 400;
			} else if (V.PC.boobsBonus === -2) {
				newPC.boobs = 500;
			} else if (V.PC.boobsBonus === -1) {
				newPC.boobs = 700;
			} else if (V.PC.boobsBonus === 1) {
				newPC.boobs = 1100;
			} else if (V.PC.boobsBonus === 2) {
				newPC.boobs = 1300;
			} else if (V.PC.boobsBonus === 3) {
				newPC.boobs = 1500;
			} else {
				newPC.boobs = 900;
			}
		} else if (V.PC.genes === "XX") {
			newPC.boobs = 200;
		} else {
			newPC.boobs = 100;
		}
		if (V.PC.boobsImplant === 1) {
			newPC.boobsImplant = newPC.boobs - 900;
		}
		newPC.lactation = V.PC.lactation;
		newPC.lactationDuration = V.PC.lactationDuration;
		newPC.genes = V.PC.genes;
		if (V.PC.butt === 3) {
			newPC.butt = 5;
		} else if (V.PC.butt === 2) {
			newPC.butt = 4;
		} else if (V.PC.butt === 1) {
			newPC.butt = 3;
		} else {
			newPC.butt = 2;
		}
		if (V.PC.buttImplant === 1) {
			newPC.buttImplant = newPC.butt - 2;
		}
		newPC.reservedChildren = V.PC.reservedChildren;
		newPC.reservedChildrenNursery = V.PC.reservedChildrenNursery;
		newPC.geneticQuirks = clone(V.PC.geneticQuirks);
		if (V.arcologies[0].FSPhysicalIdealist !== "unset") {
			newPC.muscles = 100;
		} else if (V.PC.title === 1) {
			newPC.muscles = 50;
		} else {
			newPC.muscles = 30;
		}
		if (V.PC.title === 0) {
			newPC.hLength = 15;
			newPC.waist = -20;
			newPC.voice = 2;
			newPC.shoulders = -1;
			newPC.hips = 1;
		}
		if (V.PC.career === "escort") {
			newPC.anus = 1;
			newPC.clothes = "a slutty outfit";
			newPC.intelligenceImplant = 15;
		} else if (V.PC.career === "servant") {
			newPC.clothes = "a nice maid outfit";
			newPC.intelligenceImplant = 0;
		}
		if (typeof V.PCWounded !== "undefined") {
			newPC.majorInjury = V.PCWounded;
		}
		if (typeof V.girls !== "undefined") {
			if (V.girls === 1) {
				newPC.rules.living = "spare";
			} else if (V.girls === 2) {
				newPC.rules.living = "normal";
			} else {
				newPC.rules.living = "luxurious";
			}
		}
		if (typeof V.playerGetsMilked !== "undefined") {
			if (V.playerGetsMilked === 2) {
				V.PC.rules.lactation = "sell";
			} else if (V.playerGetsMilked === 1) {
				V.PC.rules.lactation = "maintain";
			}
		}

		WombInit(newPC);

		V.PC = clone(newPC);

		if (typeof V.PC.name === "undefined") {
			if (typeof V.PCName !== "undefined") {
				V.PC.name = V.PCName;
			}
		}
		if (typeof V.PC.surname === "undefined") {
			V.PC.surname = 0;
		}
		if (typeof V.PC.faceShape === "undefined") {
			V.PC.faceShape = "normal";
		}

		r += ` Done!`;
	}
	return r;
};

App.Update.HeroSlavesCleanup = function() {
	V.heroSlaves.forEach(function(s) {
		/* Nationalities, races, surnames random fill */
		if (!s.nationality) {
			/* Check for a pre-set race and if the nationality fits, else regenerate */
			if (s.race && setup.filterRacesLowercase.includes(s.race)) {
				raceToNationality(s);
			} else {
				s.nationality = hashChoice(V.nationalities);
			}
		}
		if (!s.race || !setup.filterRacesLowercase.includes(s.race)) {
			nationalityToRace(s);
		}
		if (!s.birthSurname && s.birthSurname !== "") {
			s.birthSurname = (setup.surnamePoolSelector[s.nationality + "." + s.race] ||
				setup.surnamePoolSelector[s.nationality] ||
				setup.whiteAmericanSlaveSurnames).random();
		}
		if (!s.birthName && s.birthName !== "") {
			s.birthName = (setup.namePoolSelector[s.nationality + "." + s.race] ||
				setup.namePoolSelector[s.nationality] ||
				setup.whiteAmericanSlaveNames).random();
		}
		generatePronouns(s);
		if (s.geneMods.NCS === undefined) {
			s.geneMods.NCS = 0;
		}
		if (s.geneMods.rapidCellGrowth === undefined) {
			s.geneMods.rapidCellGrowth = 0;
		}
		// WombInit(s);
	});
	return;
};

App.Update.cleanUp = function() {
	/* leave this at the bottom of BC */
	if (V.releaseID < App.Version.release) {
		V.releaseID = App.Version.release;
	}
	/* reset NaNArray after BC is run */
	V.NaNArray = findNaN();
	return;
};

App.Update.sectorsToBuilding = function() {
	V.building = new App.Arcology.Building([]);
	const B = V.building;
	const S = V.sectors;

	B.sections.push(new App.Arcology.Section("penthouse", [
		[new App.Arcology.Cell.Penthouse()]
	]));
	if (V.arcologyUpgrade.spire === 1) {
		B.sections.push(new App.Arcology.Section("spire", [
			[
				sectorToApartment(S[1]), sectorToApartment(S[2])
			],
			[
				sectorToApartment(S[3]), sectorToApartment(S[4])
			]
		]));
	}
	B.sections.push(new App.Arcology.Section("apartments",
		[
			[sectorToApartment(S[8]), sectorToApartment(S[9]), sectorToApartment(S[10]), sectorToApartment(S[11])],
			[sectorToApartment(S[12]), sectorToApartment(S[13]), sectorToApartment(S[14]), sectorToApartment(S[15])],
			[sectorToApartment(S[16]), sectorToApartment(S[17]), sectorToApartment(S[18]), sectorToApartment(S[19])],
		]));

	function sectorToApartment(sector) {
		const a = new App.Arcology.Cell.Apartment(sector.ownership);
		if (sector.type === "LuxuryApartments") {
			a.type = 1;
		} else if (sector.type === "DenseApartments") {
			a.type = 3;
		}
		return a;
	}

	B.sections.push(new App.Arcology.Section("shops", [
		[sectorToShop(S[5]), sectorToShop(S[6]), sectorToShop(S[7])]
	]));

	function sectorToShop(sector) {
		return new App.Arcology.Cell.Shop(sector.ownership, sector.type);
	}

	B.sections.push(new App.Arcology.Section("markets",
		[
			[sectorToMarket(S[20]), sectorToMarket(S[21]), sectorToMarket(S[22]), sectorToMarket(S[23]), sectorToMarket(S[24])]
		]));

	function sectorToMarket(sector) {
		const m = new App.Arcology.Cell.Market(sector.ownership);
		if (sector.type === "transportHub") {
			m.type = "Transport Hub";
		} else if (sector.type === "CorporateMarket") {
			m.type = "Corporate Market";
		} else {
			m.type = sector.type;
		}
		return m;
	}

	B.sections.push(new App.Arcology.Section("manufacturing",
		[
			[sectorToManu(S[25]), sectorToManu(S[26]), sectorToManu(S[27]), sectorToManu(S[28]), sectorToManu(S[29])]
		]));

	function sectorToManu(sector) {
		const m = new App.Arcology.Cell.Manufacturing(sector.ownership);
		if (sector.type === "weapManu") {
			m.type = "Weapon Manufacturing";
		} else {
			m.type = sector.type;
		}
		return m;
	}
};

App.Update.slaveLoopInit = function() {
	let SL = V.slaves.length;
	for (let i = 0; i < SL; i++) {
		if (V.slaves[i].assignment !== "be imported") {
			removeNonNGPSlave(V.slaves[i]);
			i--, SL--;
		}
	}
	for (let i = 0; i < SL; i++) {
		if (V.slaves[i].assignment === "be imported") {
			V.slaves[i].ID += NGPOffset;
			V.slaves[i].assignment = "rest";
			V.slaves[i].weekAcquired = 0;
			V.slaves[i].newGamePlus = 1;
			if (V.slaves[i].mother > 0) {
				V.slaves[i].mother += NGPOffset;
			} else if (V.freshPC === 1 && V.slaves[i].mother === -1) {
				V.slaves[i].mother = -NGPOffset;
			} else if (V.slaves[i].mother < -1) {
				V.slaves[i].mother -= NGPOffset;
			}
			if (V.slaves[i].father > 0) {
				V.slaves[i].father += NGPOffset;
			} else if (V.freshPC === 1 && V.slaves[i].father === -1) {
				V.slaves[i].father = -NGPOffset;
			} else if (V.slaves[i].father < -1) {
				V.slaves[i].father -= NGPOffset;
			}
			V.slaves[i].daughters = 0;
			V.slaves[i].sisters = 0;
			V.slaves[i].canRecruit = 0;
			V.slaves[i].breedingMark = 0;
			if (V.arcologies[0].FSRomanRevivalist > 90) {
				V.slaves[i].nationality = "Roman Revivalist";
			} else if (V.arcologies[0].FSAztecRevivalist > 90) {
				V.slaves[i].nationality = "Aztec Revivalist";
			} else if (V.arcologies[0].FSEgyptianRevivalist > 90) {
				V.slaves[i].nationality = "Ancient Egyptian Revivalist";
			} else if (V.arcologies[0].FSEdoRevivalist > 90) {
				V.slaves[i].nationality = "Edo Revivalist";
			} else if (V.arcologies[0].FSArabianRevivalist > 90) {
				V.slaves[i].nationality = "Arabian Revivalist";
			} else if (V.arcologies[0].FSChineseRevivalist > 90) {
				V.slaves[i].nationality = "Ancient Chinese Revivalist";
			}
			if (V.slaves[i].relationTarget !== 0) {
				V.slaves[i].relationTarget += NGPOffset;
			}
			if (V.slaves[i].relationshipTarget !== 0) {
				V.slaves[i].relationshipTarget += NGPOffset;
			}
			if (V.slaves[i].cloneID !== 0) {
				V.slaves[i].cloneID += NGPOffset;
			}
			V.slaves[i].rivalry = 0, V.slaves[i].rivalryTarget = 0, V.slaves[i].subTarget = 0;
			V.slaves[i].drugs = "no drugs";
			V.slaves[i].porn.spending = 0;
			V.slaves[i].rules.living = "spare";
			V.slaves[i].diet = "healthy";
			V.slaves[i].pregControl = "none";
		}
	}
	V.slaveIndices = slaves2indices();
	for (let k = 0; k < SL; k++) {
		for (let i = 0; i < SL; i++) {
			if (V.slaves[k].mother === V.slaves[i].ID || V.slaves[k].father === V.slaves[i].ID) {
				V.slaves[i].daughters += 1;
			}
			if (areSisters(V.slaves[k], V.slaves[i]) > 0) {
				V.slaves[i].sisters += 1;
			}
		}
		if (V.slaves[k].pregSource > 0) {
			V.slaves[k].pregSource += NGPOffset;
			let getFather = V.slaveIndices[V.slaves[k].pregSource];
			if (getFather) {
				V.slaves[k].pregSource = 0;
			}
		}
		for (let sInit = 0; sInit < V.slaves[k].womb.length; sInit++) {
			if (V.slaves[k].womb[sInit].fatherID > 0) {
				V.slaves[k].womb[sInit].fatherID += NGPOffset;
			} else if (V.freshPC === 1 && V.slaves[k].womb[sInit].fatherID === -1) {
				V.slaves[k].womb[sInit].fatherID = -NGPOffset;
			} else if (V.slaves[k].womb[sInit].fatherID < -20) {
				V.slaves[k].womb[sInit].fatherID -= NGPOffset;
			}
			if (V.slaves[k].womb[sInit].genetics.father > 0) {
				V.slaves[k].womb[sInit].genetics.father += NGPOffset;
			} else if (V.freshPC === 1 && V.slaves[k].womb[sInit].genetics.father === -1) {
				V.slaves[k].womb[sInit].genetics.father = -NGPOffset;
			} else if (V.slaves[k].womb[sInit].genetics.father < -20) {
				V.slaves[k].womb[sInit].genetics.father -= NGPOffset;
			}
			if (V.slaves[k].womb[sInit].genetics.mother > 0) {
				V.slaves[k].womb[sInit].genetics.mother += NGPOffset;
			} else if (V.freshPC === 1 && V.slaves[k].womb[sInit].genetics.mother === -1) {
				V.slaves[k].womb[sInit].genetics.mother = -NGPOffset;
			} else if (V.slaves[k].womb[sInit].genetics.mother < -20) {
				V.slaves[k].womb[sInit].genetics.mother -= NGPOffset;
			}
		}
		if (V.slaves[k].cloneID !== 0) {
			let getClone = V.slaveIndices[V.slaves[k].cloneID];
			if (getClone) {
				V.slaves[k].cloneID = 0;
			}
		}
	}
	V.genePool = ngUpdateGenePool(V.genePool);
	if (typeof V.missingTable === undefined || V.showMissingSlaves === false) {
		V.missingTable = {};
	} else {
		V.missingTable = ngUpdateMissingTable(V.missingTable);
	}
	for (let i = 0; i < SL; i++) {
		if (V.slaves[i].relation !== 0) {
			let seed = 0, rt = V.slaves[i].relationTarget, ID = V.slaves[i].ID;
			let j = V.slaveIndices[rt];
			if ((j) && V.slaves[j].relationTarget === ID) {
				seed = 1;
			}
			if (seed === 0) {
				V.slaves[i].relation = 0, V.slaves[i].relationTarget = 0;
			}
		}
		if (V.slaves[i].relationship > 0) {
			let seed = 0, rt = V.slaves[i].relationshipTarget, ID = V.slaves[i].ID;
			let j = V.slaveIndices[rt];
			if ((j) && V.slaves[j].relationshipTarget === ID) {
				seed = 1;
			}
			if (seed === 0) {
				V.slaves[i].relationship = 0, V.slaves[i].relationshipTarget = 0;
			}
		}
	}
	for (let i = 0; i < SL; i++) {
		if (V.familyTesting === 1) {
			if (V.slaves[i].canRecruit === 1) {
				/* V.recruiters.push(V.slaves[i]);*/
			}
		} else {
			if (V.slaves[i].relation === 0) {
				if (random(1, 100) <= 5) {
					V.slaves[i].recruiter = "twin";
				} else if ((V.slaves[i].actualAge > 32) && (random(1, 100) <= 41)) {
					V.slaves[i].recruiter = "mother";
				} else if ((V.slaves[i].actualAge < 24) && (random(1, 100) <= 40)) {
					V.slaves[i].recruiter = "daughter";
				} else if ((V.slaves[i].actualAge < 43) && (random(1, 100) <= 20)) {
					V.slaves[i].recruiter = "older sister";
				} else if ((V.slaves[i].actualAge < 25) && (V.slaves[i].actualAge > 18) && (random(1, 100) <= 20)) {
					V.slaves[i].recruiter = "young sister";
				}
			} else {
				V.slaves[i].recruiter = 0;
			}
		}
		/* closes family mode */
		V.slaves[i].counter.milk = 0;
		V.slaves[i].counter.cum = 0;
		V.slaves[i].counter.births = 0;
		V.slaves[i].counter.mammary = 0;
		V.slaves[i].counter.penetrative = 0;
		V.slaves[i].counter.oral = 0;
		V.slaves[i].counter.anal = 0;
		V.slaves[i].counter.vaginal = 0;
		V.slaves[i].lifetimeCashExpenses = 0;
		V.slaves[i].lifetimeCashIncome = 0;
		V.slaves[i].lastWeeksCashIncome = 0;
		V.slaves[i].lifetimeRepExpenses = 0;
		V.slaves[i].lifetimeRepIncome = 0;
		V.slaves[i].lastWeeksRepExpenses = 0;
		V.slaves[i].lastWeeksRepIncome = 0;
	}
};
