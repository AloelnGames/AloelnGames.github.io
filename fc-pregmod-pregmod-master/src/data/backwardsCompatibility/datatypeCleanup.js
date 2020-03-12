/**
 * Applies data scheme updates to the slave object
 *
 * This function only handles data scheme changes (attribute renaming, other reorganizations)
 * and in general pays no attention to the property values unless they need to be changed due
 * to the schema change.
 */
App.Entity.Utils.SlaveDataSchemeCleanup = (function() {
	"use strict";
	return SlaveDataSchemeCleanup;

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function SlaveDataSchemeCleanup(slave) {
		migrateRules(slave);
		migrateReleaseRules(slave.rules);
		migratePorn(slave);
		migrateSkills(slave);
		migrateCounters(slave);
		migrateCustomProperties(slave);
		migrateBrand(slave);
		migrateScars(slave);
		migrateHealth(slave);
		App.Entity.Utils.migratePronouns(slave);

		if (slave.hasOwnProperty("assignmentVisible")) {
			delete slave.assignmentVisible;
		}
		if (slave.hasOwnProperty("tired")) {
			delete slave.tired;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateHealth(slave) {
		if (typeof slave.health === "number") {
			const condition = slave.health;
			slave.health = {};
			slave.health.condition = condition;
			slave.health.shortDamage = 0;
			slave.health.longDamage = 0;
			slave.health.illness = 0;
			slave.health.tired = 0;
			slave.health.health = condition;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateRules(slave) {
		if (!slave.hasOwnProperty("rules")) {
			slave.rules = new App.Entity.RuleState();
			slave.rules.lactation = slave.lactationRules;
			delete slave.lactationRules;
			slave.rules.living = slave.livingRules;
			delete slave.livingRules;
			slave.rules.relationship = slave.relationshipRules;
			delete slave.relationshipRules;
			slave.rules.release = slave.releaseRules;
			delete slave.releaseRules;
			slave.rules.speech = slave.speechRules;
			delete slave.speechRules;
			slave.rules.punishment = slave.standardPunishment;
			delete slave.standardPunishment;
			slave.rules.reward = slave.standardReward;
			delete slave.standardReward;
		}
	}

	/**
	 * Must be run AFTER migrateRules
	 * @param {App.Entity.RuleState} rulestate
	 */
	function migrateReleaseRules(rulestate) {
		if (typeof rulestate.release === "string") {
			let newRule = new App.Entity.ReleaseRulesState();
			switch (rulestate.release) {
				case "chastity":
					newRule.masturbation = 0;
					newRule.partner = 0;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 0;
					break;
				case "restrictive":
					newRule.masturbation = 0;
					newRule.partner = 1;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 1;
					break;
				case "masturbation":
					newRule.masturbation = 1;
					newRule.partner = 0;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 1;
					break;
				case "sapphic":
					newRule.masturbation = 0;
					newRule.partner = 1;
					newRule.family = 1;
					newRule.slaves = 1;
					newRule.master = 1;
					break;
				case "permissive":
					newRule.masturbation = 1;
					newRule.partner = 1;
					newRule.family = 1;
					newRule.slaves = 1;
					newRule.master = 1;
					break;
			}
			rulestate.release = newRule;
		} else if (typeof rulestate.release !== "object" || rulestate.release === null) {
			rulestate.release = new App.Entity.ReleaseRulesState();
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migratePorn(slave) {
		if (!slave.hasOwnProperty("porn")) {
			slave.porn = new App.Entity.SlavePornPerformanceState();
			const pornType = "pornType";
			const pornTypeLength = pornType.length;
			for (let prop in slave) {
				if (prop.startsWith("pornType")) {
					let fameName = prop.substr(pornTypeLength);
					// lowercase first character
					fameName = fameName.charAt(0).toLowerCase() + fameName.substr(1);
					slave.porn.fame[fameName] = slave[prop];
					delete slave[prop];
				}
			}
			if (slave.hasOwnProperty("pornFameType")) {
				slave.porn.fameType = slave.pornFameType;
				delete slave.pornFameType;
			}

			if (slave.hasOwnProperty("pornFocus")) {
				slave.porn.focus = slave.pornFocus;
				delete slave.pornFocus;
			}
		}

		if (slave.hasOwnProperty("pornFeed")) {
			slave.porn.feed = slave.pornFeed;
			delete slave.pornFeed;
		}

		if (slave.hasOwnProperty("pornFame")) {
			slave.porn.viewerCount = slave.pornFame;
			delete slave.pornFame;
		}

		if (slave.hasOwnProperty("pornFameSpending")) {
			slave.porn.spending = slave.pornFameSpending;
			delete slave.pornFameSpending;
		}

		if (slave.hasOwnProperty("pornPrestige")) {
			slave.porn.prestige = slave.pornPrestige;
			delete slave.pornPrestige;
		}

		if (slave.hasOwnProperty("pornPrestigeDesc")) {
			slave.porn.prestigeDesc = slave.pornPrestigeDesc;
			delete slave.pornPrestigeDesc;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateSkills(slave) {
		if (!slave.hasOwnProperty("skill")) {
			slave.skill = new App.Entity.SlaveSkillsState();
			slave.skill.anal = slave.analSkill;
			slave.skill.combat = slave.combatSkill;
			slave.skill.entertainment = slave.entertainSkill;
			slave.skill.oral = slave.oralSkill;
			slave.skill.vaginal = slave.vaginalSkill;
			slave.skill.whoring = slave.whoreSkill;
			delete slave.analSkill;
			delete slave.combatSkill;
			delete slave.entertainSkill;
			delete slave.oralSkill;
			delete slave.vaginalSkill;
			delete slave.whoreSkill;

			const nameMap = {
				"HG": "headGirl",
				"RC": "recruiter",
				"BG": "bodyguard",
				"MD": "madam",
				"DJ": "DJ",
				"NU": "nurse",
				"TE": "teacher",
				"AT": "attendant",
				"MT": "matron",
				"ST": "stewardess",
				"MM": "milkmaid",
				"FA": "farmer",
				"WA": "wardeness",
				"S": "servant",
				"E": "entertainer",
				"W": "whore"
			};
			for (let prop in slave) {
				const skillStr = "skill";
				if (prop.length > skillStr.length && prop.startsWith(skillStr)) {
					let skillName = prop.substr(skillStr.length);
					slave.skill[nameMap[skillName]] = slave[prop];
					delete slave[prop];
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateCounters(slave) {
		if (!slave.hasOwnProperty("counter")) {
			slave.counter = new App.Entity.SlaveActionsCountersState();
			let c = slave.counter;
			const nameMap = { // old => new
				analCount: "anal",
				mammaryCount: "mammary",
				oralCount: "oral",
				penetrativeCount: "penetrative",
				vaginalCount: "vaginal",
				publicCount: "publicUse",
				pitKills: "pitKills",
				milk: "milk",
				cum: "cum",
				births: "births",
				birthsTotal: "birthsTotal",
				laborCount: "laborCount",
				slavesFathered: "slavesFathered",
				PCChildrenFathered: "PCChildrenFathered",
				slavesKnockedUp: "slavesKnockedUp",
				PCKnockedUp: "PCKnockedUp",
			};
			for (let prop in slave) {
				if (nameMap.hasOwnProperty(prop)) {
					c[nameMap[prop]] = slave[prop];
					delete slave[prop];
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateCustomProperties(slave) {
		if (!slave.hasOwnProperty("custom")) {
			slave.custom = new App.Entity.SlaveCustomAddonsState();
			const c = slave.custom;
			// custom image and format compose an object together
			if (slave.customImage !== "" && slave.customImage !== undefined) {
				const fileType = slave.customImageFormat || "png";
				c.image = {
					filename: slave.customImage,
					format: fileType
				};
			}
			delete slave.customImageFormat;
			delete slave.customImage;

			const nameMap = { // old => new
				customTat: "tattoo",
				customLabel: "label",
				customDesc: "desc",
				customTitle: "title",
				customTitleLisp: "titleLisp",
				customHairVector: "hairVector"
			};

			for (let prop in slave) {
				if (nameMap.hasOwnProperty(prop)) {
					c[nameMap[prop]] = slave[prop];
					delete slave[prop];
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateBrand(slave) {
		if (typeof slave.brand !== "object") {
			let brand = {};
			if (slave.brand !== 0) {
				brand["left buttock"] = slave.brand;
			}
			slave.brand = brand;
		} else if (typeof slave.brand === "object") { // Make sure key and value are strings
			for (let [key, value] of Object.entries(slave.brand)) {
				if (typeof key !== "string" || typeof value !== "string") {
					delete slave.brand[key];
				}
			}
		}

		/* Head */
		if (slave.brand.cheeks) {
			slave.brand["left cheek"] = slave.brand.cheeks;
			slave.brand["right cheek"] = slave.brand.cheeks;
			delete slave.brand.cheeks;
		}
		if (slave.brand.ears) {
			slave.brand["left ear"] = slave.brand.ears;
			slave.brand["right ear"] = slave.brand.ears;
			delete slave.brand.ears;
		}

		/* Torso */
		if (slave.brand.breasts) {
			slave.brand["left breast"] = slave.brand.breasts;
			slave.brand["right breast"] = slave.brand.breasts;
			delete slave.brand.breasts;
		}

		/* Arms */
		if (slave.brand.shoulders) {
			slave.brand["left shoulder"] = slave.brand.shoulders;
			slave.brand["right shoulder"] = slave.brand.shoulders;
			delete slave.brand.shoulders;
		}
		if (slave.brand["upper arms"]) {
			slave.brand["left upper arm"] = slave.brand["upper arms"];
			slave.brand["right upper arm"] = slave.brand["upper arms"];
			delete slave.brand["upper arms"];
		}
		if (slave.brand["lower arms"]) {
			slave.brand["left lower arm"] = slave.brand["lower arms"];
			slave.brand["right lower arm"] = slave.brand["lower arms"];
			delete slave.brand["lower arms"];
		}
		if (slave.brand.wrists) {
			slave.brand["left wrist"] = slave.brand.wrists;
			slave.brand["right wrist"] = slave.brand.wrists;
			delete slave.brand.wrists;
		}
		if (slave.brand.hands) {
			slave.brand["left hand"] = slave.brand.hands;
			slave.brand["right hand"] = slave.brand.hands;
			delete slave.brand.hands;
		}

		/* Legs */
		if (slave.brand.buttocks) {
			slave.brand["left buttock"] = slave.brand.buttocks;
			slave.brand["right buttock"] = slave.brand.buttocks;
			delete slave.brand.buttocks;
		}
		if (slave.brand.thighs) {
			slave.brand["left thigh"] = slave.brand.thighs;
			slave.brand["right thigh"] = slave.brand.thighs;
			delete slave.brand.thigh;
		}
		if (slave.brand.calves) {
			slave.brand["left calf"] = slave.brand.calves;
			slave.brand["right calf"] = slave.brand.calves;
			delete slave.brand.calves;
		}
		if (slave.brand.ankles) {
			slave.brand["left ankle"] = slave.brand.ankles;
			slave.brand["right ankle"] = slave.brand.ankles;
			delete slave.brand.ankles;
		}
		if (slave.brand.feet) {
			slave.brand["left foot"] = slave.brand.feet;
			slave.brand["right foot"] = slave.brand.feet;
			delete slave.brand.feet;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateScars(slave) {
		if (!slave.hasOwnProperty("scar")) {
			slave.scar = {}; // switching to singular to match .brand and someday others.
		}
		if (slave.hasOwnProperty("scars")) { // even if it's 0
			if (slave.scars === 5) {
				App.Medicine.Modification.addScar(slave, "left cheek", "menacing"); // old location was not defined, but surgery described it as facial.  Putting it on left cheek for a default.
			} else if (slave.scars === 6) {
				App.Medicine.Modification.addScar(slave, "left cheek", "exotic");
			} else if (slave.scars) { // not 0
				App.Medicine.Modification.addScar(slave, "left cheek", "generic");
			}
			delete slave.scars;
		}
		if (slave.hasOwnProperty("cSec")) { // if it's not 0
			if (slave.cSec) { // not 0
				App.Medicine.Modification.addScar(slave, "belly", "c-section");
			}
			delete slave.cSec; // delete even if 0
		}
	}
})();

/*
	This function does not ensure values make sense. For example, it does not fix weird relations/relationships/rivalries/pregnancies/prosthetics.
	It only makes sure most datatypes are correct, and sets to default if not. Number values are clamped to the correct bounds.
	Any values that are supposed to be objects or arrays are not handled (yet).

	A tutorial on how to add to this passage:
		The || operator can be very useful for setting default values. To be precise,
			x = y || z
		is the same thing as
			if (y) {x = y}
			else {x = z}
		This means that if z is the default value, in the ideal case you could write x = x || z. If x is already in use, this won't change it, and if x is not defined it will set it to z.
		However, for example, if x is 0 but the default is -1 this will actually set x to -1! So care must be taken.

		Let's say you want to add slave.value to this function, and you want it to be a number.
		First, you need to take whatever slave.value currently is, and turn it into a number. You can use either +slave.value or Number(slave.value) to do this.
		Second, you need to determine what range to restrict slave.value to. You'll either use Math.max, Math.min, Math.clamp, or none of them.
		Finally, you need to consider the default value if the .max/.min/.clamp returned 0 (or NaN). To make a long story short,
			Use slave.value = Math.max(+slave.value, a) || default; if you need slave.value >= a.
			Use slave.value = Math.min(+slave.value, a) || default; if you need slave.value <= a.
			Use slave.value = Math.clamp(+slave.value, a, b) || default; if you need a <= slave.value <= b.
			Use slave.value = +slave.value || default; if slave.value can be any number.
		The exception to this is if the default !== 0. In this case, it's usually good enough to just check if slave.value !== 0 first. The strict equality is important!

		If you want slave.value to be a string, there's no easy tricks to make sure it's already an accepted value. The simplest way is the following
			if (typeof slave.value !== "string") slave.value = default;
*/
window.SlaveDatatypeCleanup = (function SlaveDatatypeCleanup() {
	"use strict";

	return SlaveDatatypeCleanup;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {boolean} [isIncubatorSlave]
	 */
	function SlaveDatatypeCleanup(slave, isIncubatorSlave = false) {
		if (!isIncubatorSlave && !slave.tankBaby) {
			slaveAgeDatatypeCleanup(slave);
		}
		slavePhysicalDatatypeCleanup(slave);
		slaveFaceDatatypeCleanup(slave);
		slaveHairDatatypeCleanup(slave);
		slaveBoobsDatatypeCleanup(slave);
		slaveButtDatatypeCleanup(slave);
		slaveNekoDatatypeCleanup(slave);
		slavePregnancyDatatypeCleanup(slave);
		slaveBellyDatatypeCleanup(slave);
		slaveGenitaliaDatatypeCleanup(slave);
		slaveImplantsDatatypeCleanup(slave);
		slavePiercingsDatatypeCleanup(slave);
		slaveTattooDatatypeCleanup(slave);
		slaveCosmeticsDatatypeCleanup(slave);
		slaveDietDatatypeCleanup(slave);
		slavePornDatatypeCleanup(slave);
		slaveRelationDatatypeCleanup(slave);
		slaveSkillsDatatypeCleanup(slave);
		slaveStatCountDatatypeCleanup(slave);
		slavePreferencesDatatypeCleanup(slave);
		slaveRulesDatatypeCleanup(slave);
		slaveCustomStatsDatatypeCleanup(slave);
		slaveMiscellaneousDatatypeCleanup(slave);
		generatePronouns(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveAgeDatatypeCleanup(slave) {
		slave.birthWeek = Math.clamp(+slave.birthWeek, 0, 51) || 0;
		if (slave.age > 0) {
			slave.actualAge = Math.clamp(+slave.actualAge, V.minimumSlaveAge, Infinity) || slave.age; /* if undefined, this sets to slave.age */
			delete slave.age;
		} else {
			slave.actualAge = Math.clamp(+slave.actualAge, V.minimumSlaveAge, Infinity) || 18;
		}
		slave.visualAge = Math.max(+slave.visualAge, 0) || slave.actualAge;
		slave.physicalAge = Math.max(+slave.physicalAge, 0) || slave.actualAge;
		slave.ovaryAge = Math.max(+slave.ovaryAge, 0) || slave.physicalAge;
		slave.pubertyAgeXX = Math.max(+slave.pubertyAgeXX, 0) || V.fertilityAge;
		slave.pubertyAgeXY = Math.max(+slave.pubertyAgeXY, 0) || V.potencyAge;
		slave.ageAdjust = Math.clamp(+slave.ageAdjust, -40, 40) || 0;
		slave.NCSyouthening = Math.max(+slave.NCSyouthening, 0) || 0;
		slave.health.shortDamage = Math.max(+slave.health.shortDamage, 0) || 0;
		slave.health.longDamage = Math.max(+slave.health.longDamage, 0) || 0;
		slave.health.illness = Math.max(+slave.health.illness, 0) || 0;
		slave.health.tired = Math.clamp(+slave.health.tired, 0, 100) || 0;
		slave.health.health = Math.clamp(slave.health.health, -100, 200) || 0;
		slave.health.condition = Math.clamp(slave.health.condition, -100, 200) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePhysicalDatatypeCleanup(slave) {
		if (typeof slave.nationality !== "string") {
			slave.nationality = "slave";
		}
		if (typeof slave.race !== "string") {
			nationalityToRace(slave);
		}
		if (typeof slave.origRace !== "string") {
			slave.origRace = slave.race;
		}
		if (typeof slave.skin !== "string") {
			slave.skin = "light";
		}
		if (typeof slave.origSkin !== "string") {
			slave.origSkin = slave.skin;
		}
		if (typeof slave.minorInjury !== "string") {
			slave.minorInjury = 0;
		}
		if (typeof slave.health === "number") {
			const condition = slave.health;
			slave.health = {};
			slave.health.condition = condition;
		}
		slave.health.condition = Math.clamp(slave.health.condition, -100, 100) || 0;
		slave.health.shortDamage = Math.max(+slave.health.shortDamage, 0) || 0;
		slave.health.longDamage = Math.max(+slave.health.longDamage, 0) || 0;
		slave.health.illness = Math.max(+slave.health.illness, 0) || 0;
		slave.health.tired = Math.clamp(+slave.health.tired, 0, 100) || 0;
		slave.health.health = Math.clamp(slave.health.condition - slave.health.shortDamage - slave.health.longDamage, -100, 100) || 0;
		slave.muscles = Math.clamp(+slave.muscles, -100, 100) || 0;
		slave.weight = Math.clamp(+slave.weight, -100, 200) || 0;
		slave.waist = Math.clamp(+slave.waist, -100, 100) || 0;
		slave.height = Math.round(Math.max(+slave.height, 0)) || Math.round(Height.mean(slave));
		slave.shoulders = Math.clamp(+slave.shoulders, -2, 2) || 0;
		slave.hips = Math.clamp(+slave.hips, -2, 3) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveFaceDatatypeCleanup(slave) {
		slave.face = Math.clamp(+slave.face, -100, 100) || 0;
		if (typeof slave.faceShape !== "string") {
			slave.faceShape = "normal";
		}
		if (slave.lips !== 0) {
			slave.lips = Math.clamp(+slave.lips, 0, 100) || 15;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveHairDatatypeCleanup(slave) {
		if (typeof slave.hColor !== "string") {
			slave.hColor = "brown";
		}
		if (typeof slave.origHColor !== "string") {
			slave.origHColor = slave.hColor;
		}
		if (slave.hLength !== 0) {
			slave.hLength = Math.clamp(+slave.hLength, 0, 300) || 60;
		}
		if (typeof slave.hStyle !== "string") {
			slave.hStyle = "long";
		}
		slave.haircuts = Math.clamp(+slave.haircuts, 0, 1) || 0;
		slave.bald = Math.clamp(+slave.bald, 0, 1) || 0;
		if (typeof slave.pubicHColor !== "string") {
			slave.pubicHColor = slave.hColor;
		}
		if (typeof slave.pubicHStyle !== "string") {
			slave.pubicHStyle = "neat";
		}
		if (typeof slave.underArmHColor !== "string") {
			slave.underArmHColor = "slave.hColor";
		}
		if (typeof slave.underArmHStyle !== "string") {
			slave.underArmHStyle = "waxed";
		}
		if (typeof slave.eyebrowHColor !== "string") {
			slave.eyebrowHColor = "slave.hColor";
		}
		if (typeof slave.eyebrowHStyle !== "string") {
			slave.eyebrowHStyle = "natural";
		}
		if (typeof slave.eyebrowFullness !== "string") {
			slave.eyebrowFullness = "natural";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveBoobsDatatypeCleanup(slave) {
		slave.boobs = Math.max(+slave.boobs, 100) || 200;
		if (typeof slave.boobShape !== "string") {
			slave.boobShape = "normal";
		}
		if (typeof slave.nipples !== "string") {
			slave.nipples = "cute";
		}
		if (typeof slave.nipplesAccessory !== "string") {
			slave.nipplesAccessory = "none";
		}
		slave.areolae = Math.clamp(+slave.areolae, 0, 4) || 0;
		if (typeof slave.areolaeShape !== "string") {
			slave.areolaeShape = "circle";
		}
		slave.lactation = Math.clamp(+slave.lactation, 0, 2) || 0;
		slave.boobsMilk = Math.max(+slave.boobsMilk, 0) || 0;
		slave.lactationAdaptation = Math.clamp(+slave.lactationAdaptation, 0, 100) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveButtDatatypeCleanup(slave) {
		if (slave.butt !== 0) {
			slave.butt = Math.clamp(+slave.butt, 0, 20) || 1;
		}
		slave.anus = Math.clamp(+slave.anus, 0, 4) || 0;
		slave.analArea = Math.max(+slave.analArea, 0) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveNekoDatatypeCleanup(slave) {
		if (typeof slave.earShape !== "string") {
			slave.earShape = "normal";
		}
		if (typeof slave.earT !== "string") {
			slave.earT = "none";
		}
		if (typeof slave.earTColor !== "string") {
			slave.earTColor = "none";
		}
		if (typeof slave.horn !== "string") {
			slave.horn = "none";
		}
		if (typeof slave.hornColor !== "string") {
			slave.hornColor = "none";
		}
		if (typeof slave.tail !== "string") {
			slave.tail = "none";
		}
		if (typeof slave.tailShape !== "string") {
			slave.tailShape = "none";
		}
		if (typeof slave.tailColor !== "string") {
			slave.tailColor = "none";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePregnancyDatatypeCleanup(slave) {
		slave.induce = Math.clamp(+slave.induce, 0, 1) || 0;
		slave.labor = Math.clamp(+slave.labor, 0, 1) || 0;
		slave.prematureBirth = Math.clamp(+slave.prematureBirth, 0, 1) || 0;
		slave.ovaries = Math.clamp(+slave.ovaries, 0, 1) || 0;
		slave.vasectomy = Math.clamp(+slave.vasectomy, 0, 1) || 0;
		slave.mpreg = Math.clamp(+slave.mpreg, 0, 1) || 0;
		if (slave.pregAdaptation !== 0) {
			slave.pregAdaptation = Math.max(+slave.pregAdaptation, 0) || 50;
		}
		if (typeof slave.ovaImplant !== "string") {
			slave.ovaImplant = 0;
		}
		slave.fertPeak = Math.clamp(+slave.fertPeak, 0, 4) || 0;
		slave.broodmother = Math.clamp(+slave.broodmother, 0, 3) || 0;
		slave.broodmotherFetuses = Math.max(+slave.broodmotherFetuses, 0) || 0;
		slave.broodmotherOnHold = Math.clamp(+slave.broodmotherOnHold, 0, 1) || 0;
		slave.pregSource = +slave.pregSource || 0;
		if (typeof slave.pregControl !== "string") {
			slave.pregControl = "none";
		}
		WombNormalizePreg(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveBellyDatatypeCleanup(slave) {
		slave.inflation = Math.clamp(+slave.inflation, 0, 3) || 0;
		if (typeof slave.inflationType !== "string") {
			slave.inflationType = "none";
		}
		slave.inflationMethod = Math.clamp(+slave.inflationMethod, 0, 3) || 0;
		slave.milkSource = Math.max(+slave.milkSource, 0) || 0;
		slave.cumSource = Math.max(+slave.cumSource, 0) || 0;
		slave.burst = Math.clamp(+slave.burst, 0, 1) || 0;
		if (slave.bellyImplant !== 0) {
			slave.bellyImplant = Math.max(+slave.bellyImplant, -1) || -1;
		}
		slave.cervixImplant = Math.clamp(+slave.cervixImplant, 0, 3) || 0;
		slave.bellySag = Math.max(+slave.bellySag, 0) || 0;
		slave.bellySagPreg = Math.max(+slave.bellySagPreg, 0) || slave.bellySag;
		slave.bellyPain = Math.clamp(+slave.bellyPain, 0, 2) || 0;
		SetBellySize(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveGenitaliaDatatypeCleanup(slave) {
		slave.vagina = Math.clamp(+slave.vagina, -1, 10) || 0;
		slave.vaginaLube = Math.clamp(+slave.vaginaLube, 0, 2) || 0;
		slave.labia = Math.clamp(+slave.labia, 0, 3) || 0;
		slave.clit = Math.clamp(+slave.clit, 0, 5) || 0;
		slave.foreskin = Math.max(+slave.foreskin, 0) || 0;
		slave.dick = Math.max(+slave.dick, 0) || 0;
		if (slave.dick && slave.prostate !== 0) {
			slave.prostate = Math.clamp(+slave.prostate, 0, 3) || 1;
		} else {
			slave.prostate = Math.clamp(+slave.prostate, 0, 3) || 0;
		}
		slave.balls = Math.max(+slave.balls, 0) || 0;
		if (slave.scrotum !== 0) {
			slave.scrotum = Math.max(+slave.scrotum, 0) || slave.balls;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveImplantsDatatypeCleanup(slave) {
		slave.ageImplant = Math.clamp(+slave.ageImplant, 0, 1) || 0;
		slave.faceImplant = Math.clamp(+slave.faceImplant, 0, 100) || 0;
		slave.lipsImplant = Math.clamp(+slave.lipsImplant, 0, 100) || 0;
		slave.voiceImplant = Math.clamp(+slave.voiceImplant, -1, 1) || 0;
		slave.boobsImplant = Math.max(+slave.boobsImplant, 0) || 0;
		if (slave.boobsImplant === 0) {
			slave.boobsImplantType = "none";
		} else if (slave.boobsImplantType === "none") {
			slave.boobsImplantType = "normal";
		}
		slave.breastMesh = Math.clamp(+slave.breastMesh, 0, 1) || 0;
		slave.buttImplant = Math.clamp(+slave.buttImplant, 0, 3) || 0;
		if (slave.buttImplant === 0) {
			slave.buttImplantType = "none";
		} else if (slave.buttImplantType === "none") {
			slave.buttImplantType = "normal";
		}
		slave.heightImplant = Math.clamp(+slave.heightImplant, -1, 1) || 0;
		slave.earImplant = Math.clamp(+slave.earImplant, 0, 1) || 0;
		slave.shouldersImplant = Math.clamp(+slave.shouldersImplant, -1, 1) || 0;
		slave.hipsImplant = Math.clamp(+slave.hipsImplant, -1, 1) || 0;

	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePiercingsDatatypeCleanup(slave) {
		slave.earPiercing = Math.clamp(+slave.earPiercing, 0, 2) || 0;
		slave.nosePiercing = Math.clamp(+slave.nosePiercing, 0, 2) || 0;
		slave.eyebrowPiercing = Math.clamp(+slave.eyebrowPiercing, 0, 2) || 0;
		slave.lipsPiercing = Math.clamp(+slave.lipsPiercing, 0, 2) || 0;
		slave.tonguePiercing = Math.clamp(+slave.tonguePiercing, 0, 2) || 0;
		slave.nipplesPiercing = Math.clamp(+slave.nipplesPiercing, 0, 2) || 0;
		slave.areolaePiercing = Math.clamp(+slave.areolaePiercing, 0, 2) || 0;
		slave.corsetPiercing = Math.clamp(+slave.corsetPiercing, 0, 1) || 0;
		slave.navelPiercing = Math.clamp(+slave.navelPiercing, 0, 2) || 0;
		slave.clitPiercing = Math.clamp(+slave.clitPiercing, 0, 3) || 0;
		slave.vaginaPiercing = Math.clamp(+slave.vaginaPiercing, 0, 2) || 0;
		slave.dickPiercing = Math.clamp(+slave.dickPiercing, 0, 2) || 0;
		slave.anusPiercing = Math.clamp(+slave.anusPiercing, 0, 2) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveTattooDatatypeCleanup(slave) {
		if (typeof slave.shouldersTat !== "string") {
			slave.shouldersTat = 0;
		}
		if (typeof slave.lipsTat !== "string") {
			slave.lipsTat = 0;
		}
		if (typeof slave.boobsTat !== "string") {
			slave.boobsTat = 0;
		}
		if (typeof slave.armsTat !== "string") {
			slave.armsTat = 0;
		}
		if (typeof slave.backTat !== "string") {
			slave.backTat = 0;
		}
		if (typeof slave.stampTat !== "string") {
			slave.stampTat = 0;
		}
		if (typeof slave.buttTat !== "string") {
			slave.buttTat = 0;
		}
		if (typeof slave.vaginaTat !== "string") {
			slave.vaginaTat = 0;
		}
		if (typeof slave.dickTat !== "string") {
			slave.dickTat = 0;
		}
		if (typeof slave.anusTat !== "string") {
			slave.anusTat = 0;
		}
		if (typeof slave.legsTat !== "string") {
			slave.legsTat = 0;
		}
		if (typeof slave.bellyTat !== "string") {
			slave.bellyTat = 0;
		}
		if (typeof slave.custom.tattoo !== "string" || slave.custom.tattoo === " ") {
			slave.custom.tattoo = "";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveCosmeticsDatatypeCleanup(slave) {
		slave.makeup = Math.clamp(+slave.makeup, 0, 8) || 0;
		slave.nails = Math.clamp(+slave.nails, 0, 9) || 0;
		slave.chastityAnus = Math.clamp(+slave.chastityAnus, 0, 1) || 0;
		slave.chastityPenis = Math.clamp(+slave.chastityPenis, 0, 1) || 0;
		slave.chastityVagina = Math.clamp(+slave.chastityVagina, 0, 1) || 0;
		slave.choosesOwnClothes = Math.clamp(+slave.choosesOwnClothes, 0, 1) || 0;
		if (typeof slave.clothes !== "string") {
			slave.clothes = "no clothing";
		}
		if (typeof slave.collar !== "string") {
			slave.collar = "none";
		}
		if (typeof slave.shoes !== "string") {
			slave.shoes = "none";
		}
		if (typeof slave.eyewear !== "string") {
			slave.eyewear = "none";
		}
		if (typeof slave.markings !== "string") {
			slave.markings = "none";
		}
		if (typeof slave.bellyAccessory !== "string") {
			slave.bellyAccessory = "none";
		}
		if (typeof slave.vaginalAccessory !== "string") {
			slave.vaginalAccessory = "none";
		}
		if (typeof slave.vaginalAttachment !== "string") {
			slave.vaginalAttachment = "none";
		}
		if (typeof slave.dickAccessory !== "string") {
			slave.dickAccessory = "none";
		}
		if (typeof slave.armAccessory !== "string") {
			slave.armAccessory = "none";
		}
		if (typeof slave.legAccessory !== "string") {
			slave.legAccessory = "none";
		}
		if (typeof slave.buttplug !== "string") {
			slave.buttplug = "none";
		}
		if (typeof slave.buttplugAttachment !== "string") {
			slave.buttplugAttachment = "none";
		}
		if (typeof slave.headAccessory !== "string") {
			slave.headAccessory = "none";
		}
		if (typeof slave.rearAccessory !== "string") {
			slave.rearAccessory = "none";
		}
		if (typeof slave.backAccessory !== "string") {
			slave.backAccessory = "none";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveDietDatatypeCleanup(slave) {
		if (typeof slave.diet !== "string") {
			slave.diet = "healthy";
		}
		slave.dietCum = Math.clamp(+slave.dietCum, 0, 2) || 0;
		slave.dietMilk = Math.clamp(+slave.dietMilk, 0, 2) || 0;
		slave.onDiet = Math.clamp(+slave.onDiet, 0, 1) || 0;
		slave.hormones = Math.clamp(+slave.hormones, -2, 2) || 0;
		slave.hormoneBalance = Math.clamp(+slave.hormoneBalance, -400, 400) || 0;
		if (typeof slave.drugs !== "string" || slave.drugs === "none") {
			slave.drugs = "no drugs";
		}
		slave.aphrodisiacs = Math.clamp(+slave.aphrodisiacs, 0, 2) || 0;
		slave.curatives = Math.clamp(+slave.curatives, 0, 2) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePornDatatypeCleanup(slave) {
		slave.porn.feed = Math.clamp(+slave.porn.feed, 0, 1) || 0;
		slave.porn.viewerCount = Math.max(+slave.porn.viewerCount, 0) || 0;
		slave.porn.spending = Math.max(+slave.porn.spending, 0) || 0;
		slave.porn.prestige = Math.clamp(+slave.porn.prestige, 0, 3) || 0;
		if (typeof slave.porn.prestigeDesc !== "string") {
			slave.porn.prestigeDesc = 0;
		}
		if (typeof slave.porn.fameType !== "string") {
			slave.porn.fameType = "none";
		}
		if (typeof slave.porn.focus !== "string") {
			slave.porn.focus = "none";
		}
		for (const genre of App.Porn.getAllGenres()) {
			slave.porn.fame[genre.fameVar] = Math.max(+slave.porn.fame[genre.fameVar], 0) || 0;
		}

		// there was a bug where the ui would set focus to "well hung" instead of "stud" for the "big dick" genre.
		if (slave.porn.focus === "well hung") {
			slave.porn.focus = "stud";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveRelationDatatypeCleanup(slave) {
		slave.mother = +slave.mother || 0;
		slave.father = +slave.father || 0;
		if (V.familyTesting === 0) {
			slave.relationTarget = Math.max(+slave.relationTarget, 0) || 0;
		}
		slave.canRecruit = Math.clamp(+slave.canRecruit, 0, 1) || 0;
		slave.relationship = Math.clamp(+slave.relationship, -3, 5) || 0;
		slave.relationshipTarget = Math.max(+slave.relationshipTarget, 0) || 0;
		slave.rivalryTarget = Math.max(+slave.rivalryTarget, 0) || 0;
		slave.rivalry = Math.clamp(+slave.rivalry, 0, 3) || 0;
		slave.cloneID = +slave.cloneID || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveSkillsDatatypeCleanup(slave) {
		slave.skill.oral = Math.clamp(+slave.skill.oral, 0, 100) || 0;
		slave.skill.vaginal = Math.clamp(+slave.skill.vaginal, 0, 100) || 0;
		slave.skill.anal = Math.clamp(+slave.skill.anal, 0, 100) || 0;
		slave.skill.whoring = Math.clamp(+slave.skill.whoring, 0, 100) || 0;
		slave.skill.entertainment = Math.clamp(+slave.skill.entertainment, 0, 100) || 0;
		slave.skill.combat = Math.clamp(+slave.skill.combat, 0, 1) || 0;
		slave.skill.headGirl = Math.clamp(+slave.skill.headGirl, 0, 200) || 0;
		slave.skill.recruiter = Math.clamp(+slave.skill.recruiter, 0, 200) || 0;
		slave.skill.bodyguard = Math.clamp(+slave.skill.bodyguard, 0, 200) || 0;
		slave.skill.madam = Math.clamp(+slave.skill.madam, 0, 200) || 0;
		slave.skill.DJ = Math.clamp(+slave.skill.DJ, 0, 200) || 0;
		slave.skill.nurse = Math.clamp(+slave.skill.nurse, 0, 200) || 0;
		slave.skill.teacher = Math.clamp(+slave.skill.teacher, 0, 200) || 0;
		slave.skill.attendant = Math.clamp(+slave.skill.attendant, 0, 200) || 0;
		slave.skill.matron = Math.clamp(+slave.skill.matron, 0, 200) || 0;
		slave.skill.stewardess = Math.clamp(+slave.skill.stewardess, 0, 200) || 0;
		slave.skill.milkmaid = Math.clamp(+slave.skill.milkmaid, 0, 200) || 0;
		slave.skill.farmer = Math.clamp(+slave.skill.farmer, 0, 200) || 0;
		slave.skill.wardeness = Math.clamp(+slave.skill.wardeness, 0, 200) || 0;
		slave.skill.servant = Math.clamp(+slave.skill.servant, 0, 200) || 0;
		slave.skill.entertainer = Math.clamp(+slave.skill.entertainer, 0, 200) || 0;
		slave.skill.whore = Math.clamp(+slave.skill.whore, 0, 200) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveStatCountDatatypeCleanup(slave) {
		slave.counter.oral = Math.max(+slave.counter.oral, 0) || 0;
		slave.counter.vaginal = Math.max(+slave.counter.vaginal, 0) || 0;
		slave.counter.anal = Math.max(+slave.counter.anal, 0) || 0;
		slave.counter.publicUse = Math.max(+slave.counter.publicUse, 0) || 0;
		slave.counter.mammary = Math.max(+slave.counter.mammary, 0) || 0;
		slave.counter.penetrative = Math.max(+slave.counter.penetrative, 0) || 0;
		slave.counter.pitKills = Math.max(+slave.counter.pitKills, 0) || 0;
		slave.counter.milk = Math.max(+slave.counter.milk, 0) || 0;
		slave.counter.cum = Math.max(+slave.counter.cum, 0) || 0;
		slave.counter.births = Math.max(+slave.counter.births, 0) || 0;
		slave.counter.birthsTotal = Math.max(+slave.counter.birthsTotal, 0) || slave.counter.births;
		slave.counter.laborCount = Math.max(+slave.counter.laborCount, 0) || slave.counter.birthsTotal;
		slave.counter.slavesFathered = Math.max(+slave.counter.slavesFathered, 0) || 0;
		slave.counter.PCChildrenFathered = Math.max(+slave.counter.PCChildrenFathered, 0) || 0;
		slave.counter.slavesKnockedUp = Math.max(+slave.counter.slavesKnockedUp, 0) || 0;
		slave.counter.PCKnockedUp = Math.max(+slave.counter.PCKnockedUp, 0) || 0;
		slave.bodySwap = Math.max(+slave.bodySwap, 0) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePreferencesDatatypeCleanup(slave) {
		slave.energy = Math.clamp(+slave.energy, 0, 100) || 0;
		slave.need = Math.max(+slave.need, 0) || 0;
		slave.attrXY = Math.clamp(+slave.attrXY, 0, 100) || 0;
		slave.attrXX = Math.clamp(+slave.attrXX, 0, 100) || 0;
		slave.attrKnown = Math.clamp(+slave.attrKnown, 0, 1) || 0;
		slave.fetishStrength = Math.clamp(+slave.fetishStrength, 0, 100) || 0;
		slave.fetishKnown = Math.clamp(+slave.fetishKnown, 0, 1) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveRulesDatatypeCleanup(slave) {
		if (typeof slave.standardPunishment !== "string") {
			slave.standardPunishment = "situational";
		}
		if (typeof slave.standardReward !== "string") {
			slave.standardReward = "situational";
		}
		if (slave.useRulesAssistant !== 0) {
			slave.useRulesAssistant = 1;
		}
		slave.choosesOwnAssignment = Math.clamp(+slave.choosesOwnAssignment, 0) || 0;
		slave.HGExclude = Math.clamp(+slave.HGExclude, 0, 1) || 0;
		slave.choosesOwnChastity = Math.clamp(+slave.choosesOwnChastity, 0, 1) || 0;
		slave.breedingMark = Math.clamp(+slave.breedingMark, 0, 1) || 0;
		slave.rudeTitle = Math.clamp(+slave.rudeTitle, 0, 1) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveCustomStatsDatatypeCleanup(slave) {
		if (typeof slave.custom.label !== "string") {
			slave.custom.label = "";
		}
		if (typeof slave.custom.desc !== "string") {
			slave.custom.desc = "";
		}
		if (typeof slave.custom.title !== "string") {
			slave.custom.title = "";
		}
		if (typeof slave.custom.titleLisp !== "string") {
			slave.custom.titleLisp = "";
		}
		if (slave.custom.image !== null) {
			if (typeof slave.custom.image.filename !== "string") {
				slave.custom.image = null;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveMiscellaneousDatatypeCleanup(slave) {
		slave.weekAcquired = Math.max(+slave.weekAcquired, 0) || 0;
		slave.newGamePlus = Math.clamp(+slave.newGamePlus, 0, 1) || 0;
		slave.prestige = Math.clamp(+slave.prestige, 0, 3) || 0;
		slave.devotion = Math.clamp(+slave.devotion, -100, 100) || 0;
		slave.oldDevotion = Math.clamp(+slave.oldDevotion, -100, 100) || 0;
		slave.trust = Math.clamp(+slave.trust, -100, 100) || 0;
		slave.oldTrust = Math.clamp(+slave.oldTrust, -100, 100) || 0;
		slave.fuckdoll = Math.clamp(+slave.fuckdoll, 0, 100) || 0;
		slave.chem = Math.max(+slave.chem, 0) || 0;
		slave.addict = Math.max(+slave.addict, 0) || 0;
		slave.intelligence = Math.clamp(+slave.intelligence, -100, 100) || 0;
		slave.intelligenceImplant = Math.clamp(+slave.intelligenceImplant, 0, 30) || 0;
		slave.premature = Math.clamp(+slave.premature, 0, 1) || 0;
		slave.tankBaby = Math.clamp(+slave.tankBaby, 0, 2) || 0;
		slave.subTarget = Math.max(+slave.subTarget, 0) || 0;
		slave.sentence = Math.max(+slave.sentence, 0) || 0;
		slave.training = Math.clamp(+slave.training, 0, 150) || 0;
		if (slave.indenture !== 0) {
			slave.indenture = Math.max(+slave.indenture, -1) || -1;
		}
		slave.indentureRestrictions = Math.clamp(+slave.indentureRestrictions, 0, 2) || 0;
		slave.hears = Math.clamp(+slave.hears, -2, 0) || 0;
		slave.smells = Math.clamp(+slave.smells, -1, 0) || 0;
		slave.tastes = Math.clamp(+slave.tastes, -1, 0) || 0;
		if (typeof slave.earwear !== "string") {
			slave.earwear = "none";
		}
		slave.heels = Math.clamp(+slave.heels, 0, 1) || 0;
		slave.PLimb = Math.clamp(+slave.PLimb, 0, 2) || 0;
		if (slave.voice !== 0) {
			slave.voice = Math.clamp(+slave.voice, 0, 3) || 1;
		}
		slave.electrolarynx = Math.clamp(+slave.electrolarynx, 0, 1) || 0;
		slave.accent = Math.clamp(+slave.accent, 0, 4) || 0;
		if (typeof slave.ballType !== "string") {
			slave.ballType = "human";
		}
		if (typeof slave.eggType !== "string") {
			slave.eggType = "human";
		}
		if (typeof slave.origBodyOwner !== "string") {
			slave.origBodyOwner = "";
		}
		slave.origBodyOwnerID = Math.max(+slave.origBodyOwnerID, 0) || 0;
		if (typeof slave.death !== "string") {
			slave.death = "";
		}
		if (slave.slaveCost !== 0) {
			slave.slaveCost = Math.min(+slave.slaveCost, 1) || 1;
		}
		slave.lifetimeCashExpenses = Math.min(+slave.lifetimeCashExpenses, 0) || 0;
		slave.lifetimeCashIncome = Math.max(+slave.lifetimeCashIncome, 0) || 0;
		slave.lastWeeksCashIncome = Math.max(+slave.lastWeeksCashIncome, 0) || 0;
		slave.lifetimeRepExpenses = Math.min(+slave.lifetimeRepExpenses, 0) || 0;
		slave.lifetimeRepIncome = Math.max(+slave.lifetimeRepIncome, 0) || 0;
		slave.lastWeeksRepExpenses = Math.min(+slave.lastWeeksRepExpenses, 0) || 0;
		slave.lastWeeksRepIncome = Math.max(+slave.lastWeeksRepIncome, 0) || 0;
		slave.sexAmount = Math.max(+slave.sexAmount, 0) || 0;
		slave.sexQuality = Math.max(+slave.sexQuality, 0) || 0;
		slave.whoreClass = Math.max(+slave.whoreClass, 0) || 0;
		slave.effectiveWhoreClass = Math.max(+slave.effectiveWhoreClass, effectiveWhoreClass(slave)) || 0;
	}
})();

/* a lot of this may need to be removed */
window.ChildDatatypeCleanup = function ChildDatatypeCleanup(child) {
	childAgeDatatypeCleanup(child);
	childPhysicalDatatypeCleanup(child);
	childFaceDatatypeCleanup(child);
	childHairDatatypeCleanup(child);
	childBoobsDatatypeCleanup(child);
	childButtDatatypeCleanup(child);
	childPregnancyDatatypeCleanup(child);
	childBellyDatatypeCleanup(child);
	childGenitaliaDatatypeCleanup(child);
	childImplantsDatatypeCleanup(child);
	childPiercingsDatatypeCleanup(child);
	childTattooDatatypeCleanup(child);
	childCosmeticsDatatypeCleanup(child);
	childDietDatatypeCleanup(child);
	childPornDatatypeCleanup(child);
	childRelationDatatypeCleanup(child);
	childSkillsDatatypeCleanup(child);
	childStatCountDatatypeCleanup(child);
	childPreferencesDatatypeCleanup(child);
	childRulesDatatypeCleanup(child);
	childCustomStatsDatatypeCleanup(child);
	childMiscellaneousDatatypeCleanup(child);
	generatePronouns(child);
};

window.childAgeDatatypeCleanup = function childAgeDatatypeCleanup(child) {
	child.birthWeek = Math.clamp(+child.birthWeek, 0, 51) || 0;
	if (child.age > 0) {
		child.actualAge = Math.clamp(+child.actualAge, V.minimumChildAge, Infinity) || child.age; /* if undefined, this sets to child.age */
		delete child.age;
	} else {
		child.actualAge = Math.clamp(+child.actualAge, V.minimumChildAge, Infinity) || 18;
	}
	child.visualAge = Math.max(+child.visualAge, 0) || child.actualAge;
	child.physicalAge = Math.max(+child.physicalAge, 0) || child.actualAge;
	child.ovaryAge = Math.max(+child.ovaryAge, 0) || child.physicalAge;
	child.pubertyAgeXX = Math.max(+child.pubertyAgeXX, 0) || V.fertilityAge;
	child.pubertyAgeXY = Math.max(+child.pubertyAgeXY, 0) || V.potencyAge;
};

window.childPhysicalDatatypeCleanup = function childPhysicalDatatypeCleanup(child) {
	if (typeof child.nationality !== "string") {
		child.nationality = "child";
	}
	if (typeof child.race !== "string") {
		nationalityToRace(child);
	}
	if (typeof child.origRace !== "string") {
		child.origRace = child.race;
	}
	if (typeof child.skin !== "string") {
		child.skin = "light";
	}
	if (typeof child.origSkin !== "string") {
		child.origSkin = child.skin;
	}
	if (typeof child.minorInjury !== "string") {
		child.minorInjury = 0;
	}
	if (typeof child.health === "number") {
		const condition = child.health;
		child.health = {};
		child.health.condition = condition;
	}
	child.health.condition = Math.clamp(child.health.condition, -100, 100) || 0;
	child.health.shortDamage = Math.max(+child.health.shortDamage, 0) || 0;
	child.health.longDamage = Math.max(+child.health.longDamage, 0) || 0;
	child.health.illness = Math.max(+child.health.illness, 0) || 0;
	child.health.tired = Math.clamp(+child.health.tired, 0, 100) || 0;
	child.health.health = Math.clamp(child.health.condition - child.health.shortDamage - child.health.longDamage, -100, 100) || 0;
	child.muscles = Math.clamp(+child.muscles, -100, 100) || 0;
	child.weight = Math.clamp(+child.weight, -100, 200) || 0;
	child.waist = Math.clamp(+child.waist, -100, 100) || 0;
	child.height = Math.round(Math.max(+child.height, 0)) || Math.round(Height.mean(child));
	child.shoulders = Math.clamp(+child.shoulders, -2, 2) || 0;
	child.hips = Math.clamp(+child.hips, -2, 3) || 0;
};

window.childFaceDatatypeCleanup = function childFaceDatatypeCleanup(child) {
	child.face = Math.clamp(+child.face, -100, 100) || 0;
	if (typeof child.faceShape !== "string") {
		child.faceShape = "normal";
	}
	if (child.lips !== 0) {
		child.lips = Math.clamp(+child.lips, 0, 100) || 15;
	}
};

window.childHairDatatypeCleanup = function childHairDatatypeCleanup(child) {
	if (typeof child.hColor !== "string") {
		child.hColor = "brown";
	}
	if (typeof child.origHColor !== "string") {
		child.origHColor = child.hColor;
	}
	if (child.hLength !== 0) {
		child.hLength = Math.clamp(+child.hLength, 0, 300) || 60;
	}
	if (typeof child.hStyle !== "string") {
		child.hStyle = "long";
	}
	child.haircuts = Math.clamp(+child.haircuts, 0, 1) || 0;
	child.bald = Math.clamp(+child.bald, 0, 1) || 0;
	if (typeof child.pubicHColor !== "string") {
		child.pubicHColor = child.hColor;
	}
	if (typeof child.pubicHStyle !== "string") {
		child.pubicHStyle = "neat";
	}
	if (typeof child.underArmHColor !== "string") {
		child.underArmHColor = "child.hColor";
	}
	if (typeof child.underArmHStyle !== "string") {
		child.underArmHStyle = "waxed";
	}
	if (typeof child.eyebrowHColor !== "string") {
		child.eyebrowHColor = "child.hColor";
	}
	if (typeof child.eyebrowHStyle !== "string") {
		child.eyebrowHStyle = "natural";
	}
	if (typeof child.eyebrowFullness !== "string") {
		child.eyebrowFullness = "natural";
	}
};

window.childBoobsDatatypeCleanup = function childBoobsDatatypeCleanup(child) {
	child.boobs = Math.max(+child.boobs, 100) || 200;
	if (typeof child.boobShape !== "string") {
		child.boobShape = "normal";
	}
	if (typeof child.nipples !== "string") {
		child.nipples = "cute";
	}
	if (typeof child.nipplesAccessory !== "string") {
		child.nipplesAccessory = "none";
	}
	child.areolae = Math.clamp(+child.areolae, 0, 4) || 0;
	if (typeof child.areolaeShape !== "string") {
		child.areolaeShape = "circle";
	}
	child.lactation = Math.clamp(+child.lactation, 0, 2) || 0;
	child.lactationAdaptation = Math.clamp(+child.lactationAdaptation, 0, 100) || 0;
};

window.childButtDatatypeCleanup = function childButtDatatypeCleanup(child) {
	if (child.butt !== 0) {
		child.butt = Math.clamp(+child.butt, 0, 20) || 1;
	}
	child.anus = Math.clamp(+child.anus, 0, 4) || 0;
	child.analArea = Math.max(+child.analArea, 0) || 0;
};

window.childPregnancyDatatypeCleanup = function childPregnancyDatatypeCleanup(child) {
	child.induce = Math.clamp(+child.induce, 0, 1) || 0;
	child.labor = Math.clamp(+child.labor, 0, 1) || 0;
	child.prematureBirth = Math.clamp(+child.prematureBirth, 0, 1) || 0;
	child.ovaries = Math.clamp(+child.ovaries, 0, 1) || 0;
	child.vasectomy = Math.clamp(+child.vasectomy, 0, 1) || 0;
	child.mpreg = Math.clamp(+child.mpreg, 0, 1) || 0;
	if (child.pregAdaptation !== 0) {
		child.pregAdaptation = Math.max(+child.pregAdaptation, 0) || 50;
	}
	child.pregSource = +child.pregSource || 0;
	if (typeof child.pregControl !== "string") {
		child.pregControl = "none";
	}
	child.fertPeak = Math.clamp(+child.fertPeak, 0, 4) || 0;
	WombNormalizePreg(child);
};

window.childBellyDatatypeCleanup = function childBellyDatatypeCleanup(child) {
	child.bellySag = Math.max(+child.bellySag, 0) || 0;
	child.bellySagPreg = Math.max(+child.bellySagPreg, 0) || child.bellySag;
	SetBellySize(child);
};

window.childGenitaliaDatatypeCleanup = function childGenitaliaDatatypeCleanup(child) {
	child.vagina = Math.clamp(+child.vagina, -1, 10) || 0;
	child.vaginaLube = Math.clamp(+child.vaginaLube, 0, 2) || 0;
	child.labia = Math.clamp(+child.labia, 0, 3) || 0;
	child.clit = Math.clamp(+child.clit, 0, 5) || 0;
	child.foreskin = Math.max(+child.foreskin, 0) || 0;
	child.dick = Math.max(+child.dick, 0) || 0;
	if (child.dick && child.prostate !== 0) {
		child.prostate = Math.clamp(+child.prostate, 0, 3) || 1;
	} else {
		child.prostate = Math.clamp(+child.prostate, 0, 3) || 0;
	}
	child.balls = Math.max(+child.balls, 0) || 0;
	if (child.scrotum !== 0) {
		child.scrotum = Math.max(+child.scrotum, 0) || child.balls;
	}
};

window.childImplantsDatatypeCleanup = function childImplantsDatatypeCleanup(child) {
	child.ageImplant = Math.clamp(+child.ageImplant, 0, 1) || 0;
	child.faceImplant = Math.clamp(+child.faceImplant, 0, 100) || 0;
	child.lipsImplant = Math.clamp(+child.lipsImplant, 0, 100) || 0;
	child.voiceImplant = Math.clamp(+child.voiceImplant, -1, 1) || 0;
	child.boobsImplant = Math.max(+child.boobsImplant, 0) || 0;
	if (child.boobsImplant === 0) {
		child.boobsImplantType = "none";
	} else if (child.boobsImplantType === "none") {
		child.boobsImplantType = "normal";
	}
	child.breastMesh = Math.clamp(+child.breastMesh, 0, 1) || 0;
	child.buttImplant = Math.clamp(+child.buttImplant, 0, 3) || 0;
	if (child.buttImplant === 0) {
		child.buttImplantType = "none";
	} else if (child.buttImplantType === "none") {
		child.buttImplantType = "normal";
	}
	child.earImplant = Math.clamp(+child.earImplant, 0, 1) || 0;
};

window.childPiercingsDatatypeCleanup = function childPiercingsDatatypeCleanup(child) {
	child.earPiercing = Math.clamp(+child.earPiercing, 0, 2) || 0;
	child.nosePiercing = Math.clamp(+child.nosePiercing, 0, 2) || 0;
	child.eyebrowPiercing = Math.clamp(+child.eyebrowPiercing, 0, 2) || 0;
	child.lipsPiercing = Math.clamp(+child.lipsPiercing, 0, 2) || 0;
	child.tonguePiercing = Math.clamp(+child.tonguePiercing, 0, 2) || 0;
	child.nipplesPiercing = Math.clamp(+child.nipplesPiercing, 0, 2) || 0;
	child.areolaePiercing = Math.clamp(+child.areolaePiercing, 0, 2) || 0;
	child.corsetPiercing = Math.clamp(+child.corsetPiercing, 0, 1) || 0;
	child.navelPiercing = Math.clamp(+child.navelPiercing, 0, 2) || 0;
	child.clitPiercing = Math.clamp(+child.clitPiercing, 0, 3) || 0;
	child.vaginaPiercing = Math.clamp(+child.vaginaPiercing, 0, 2) || 0;
	child.dickPiercing = Math.clamp(+child.dickPiercing, 0, 2) || 0;
	child.anusPiercing = Math.clamp(+child.anusPiercing, 0, 2) || 0;
};

window.childTattooDatatypeCleanup = function childTattooDatatypeCleanup(child) {
	if (typeof child.shouldersTat !== "string") {
		child.shouldersTat = 0;
	}
	if (typeof child.lipsTat !== "string") {
		child.lipsTat = 0;
	}
	if (typeof child.boobsTat !== "string") {
		child.boobsTat = 0;
	}
	if (typeof child.armsTat !== "string") {
		child.armsTat = 0;
	}
	if (typeof child.backTat !== "string") {
		child.backTat = 0;
	}
	if (typeof child.stampTat !== "string") {
		child.stampTat = 0;
	}
	if (typeof child.buttTat !== "string") {
		child.buttTat = 0;
	}
	if (typeof child.vaginaTat !== "string") {
		child.vaginaTat = 0;
	}
	if (typeof child.dickTat !== "string") {
		child.dickTat = 0;
	}
	if (typeof child.anusTat !== "string") {
		child.anusTat = 0;
	}
	if (typeof child.legsTat !== "string") {
		child.legsTat = 0;
	}
	if (typeof child.bellyTat !== "string") {
		child.bellyTat = 0;
	}
	if (typeof child.custom.tattoo !== "string") {
		child.custom.tattoo = "";
	}
};

window.childCosmeticsDatatypeCleanup = function childCosmeticsDatatypeCleanup(child) {
	child.makeup = Math.clamp(+child.makeup, 0, 8) || 0;
	child.nails = Math.clamp(+child.nails, 0, 9) || 0;
	child.chastityAnus = Math.clamp(+child.chastityAnus, 0, 1) || 0;
	child.chastityPenis = Math.clamp(+child.chastityPenis, 0, 1) || 0;
	child.chastityVagina = Math.clamp(+child.chastityVagina, 0, 1) || 0;
	child.choosesOwnClothes = Math.clamp(+child.choosesOwnClothes, 0, 1) || 0;
	if (typeof child.clothes !== "string") {
		child.clothes = "no clothing";
	}
	if (typeof child.collar !== "string") {
		child.collar = "none";
	}
	if (typeof child.shoes !== "string") {
		child.shoes = "none";
	}
	if (typeof child.eyewear !== "string") {
		child.eyewear = "none";
	}
	if (typeof child.markings !== "string") {
		child.markings = "none";
	}
	if (typeof child.bellyAccessory !== "string") {
		child.bellyAccessory = "none";
	}
	if (typeof child.vaginalAccessory !== "string") {
		child.vaginalAccessory = "none";
	}
	if (typeof child.vaginalAttachment !== "string") {
		child.vaginalAttachment = "none";
	}
	if (typeof child.dickAccessory !== "string") {
		child.dickAccessory = "none";
	}
	if (typeof child.armAccessory !== "string") {
		child.armAccessory = "none";
	}
	if (typeof child.legAccessory !== "string") {
		child.legAccessory = "none";
	}
	if (typeof child.buttplug !== "string") {
		child.buttplug = "none";
	}
	if (typeof child.buttplugAttachment !== "string") {
		child.buttplugAttachment = "none";
	}
	if (typeof child.headAccessory !== "string") {
		child.headAccessory = "none";
	}
	if (typeof child.rearAccessory !== "string") {
		child.rearAccessory = "none";
	}
	if (typeof child.backAccessory !== "string") {
		child.backAccessory = "none";
	}
};

window.childDietDatatypeCleanup = function childDietDatatypeCleanup(child) {
	if (typeof child.diet !== "string") {
		child.diet = "healthy";
	}
	child.dietCum = Math.clamp(+child.dietCum, 0, 2) || 0;
	child.dietMilk = Math.clamp(+child.dietMilk, 0, 2) || 0;
	child.onDiet = Math.clamp(+child.onDiet, 0, 1) || 0;
	child.hormones = Math.clamp(+child.hormones, -2, 2) || 0;
	child.hormoneBalance = Math.clamp(+child.hormoneBalance, -400, 400) || 0;
	if (typeof child.drugs !== "string" || slave.drugs === "none") {
		child.drugs = "no drugs";
	}
	child.aphrodisiacs = Math.clamp(+child.aphrodisiacs, 0, 2) || 0;
	child.curatives = Math.clamp(+child.curatives, 0, 2) || 0;
};

window.childPornDatatypeCleanup = function childPornDatatypeCleanup(child) {
	child.porn.feed = Math.clamp(+child.porn.feed, 0, 1) || 0;
	child.porn.viewerCount = Math.max(+child.porn.viewerCount, 0) || 0;
	child.porn.spending = Math.max(+child.porn.spending, 0) || 0;
	child.porn.prestige = Math.clamp(+child.porn.prestige, 0, 3) || 0;
	if (typeof child.porn.prestigeDesc !== "string") {
		child.porn.prestigeDesc = 0;
	}
	if (typeof child.porn.fameType !== "string") {
		child.porn.fameType = "none";
	}
	if (typeof child.porn.focus !== "string") {
		child.porn.focus = "none";
	}
	for (const genre of App.Porn.getAllGenres()) {
		child.porn.fame[genre.fameVar] = Math.max(+child.porn.fame[genre.fameVar], 0) || 0;
	}
};

window.childRelationDatatypeCleanup = function childRelationDatatypeCleanup(child) {
	child.mother = +child.mother || 0;
	child.father = +child.father || 0;
	if (State.variables.familyTesting === 0) {
		child.relationTarget = Math.max(+child.relationTarget, 0) || 0;
	}
	child.canRecruit = Math.clamp(+child.canRecruit, 0, 1) || 0;
	child.relationship = Math.clamp(+child.relationship, -3, 5) || 0;
	child.relationshipTarget = Math.max(+child.relationshipTarget, 0) || 0;
	child.rivalryTarget = Math.max(+child.rivalryTarget, 0) || 0;
	child.rivalry = Math.clamp(+child.rivalry, 0, 3) || 0;
};

window.childSkillsDatatypeCleanup = function childSkillsDatatypeCleanup(child) {
	child.skill.oral = Math.clamp(+child.skill.oral, 0, 100) || 0;
	child.skill.vaginal = Math.clamp(+child.skill.vaginal, 0, 100) || 0;
	child.skill.anal = Math.clamp(+child.skill.anal, 0, 100) || 0;
	child.skill.whoring = Math.clamp(+child.skill.whoring, 0, 100) || 0;
	child.skill.entertainment = Math.clamp(+child.skill.entertainment, 0, 100) || 0;
	child.skill.combat = Math.clamp(+child.skill.combat, 0, 1) || 0;
	child.skill.headGirl = Math.clamp(+child.skill.headGirl, 0, 200) || 0;
	child.skill.recruiter = Math.clamp(+child.skill.recruiter, 0, 200) || 0;
	child.skill.bodyguard = Math.clamp(+child.skill.bodyguard, 0, 200) || 0;
	child.skill.madam = Math.clamp(+child.skill.madam, 0, 200) || 0;
	child.skill.DJ = Math.clamp(+child.skill.DJ, 0, 200) || 0;
	child.skill.nurse = Math.clamp(+child.skill.nurse, 0, 200) || 0;
	child.skill.teacher = Math.clamp(+child.skill.teacher, 0, 200) || 0;
	child.skill.attendant = Math.clamp(+child.skill.attendant, 0, 200) || 0;
	child.skill.matron = Math.clamp(+child.skill.matron, 0, 200) || 0;
	child.skill.stewardess = Math.clamp(+child.skill.stewardess, 0, 200) || 0;
	child.skill.milkmaid = Math.clamp(+child.skill.milkmaid, 0, 200) || 0;
	child.skill.farmer = Math.clamp(+child.skill.farmer, 0, 200) || 0;
	child.skill.wardeness = Math.clamp(+child.skill.wardeness, 0, 200) || 0;
	child.skill.servant = Math.clamp(+child.skill.servant, 0, 200) || 0;
	child.skill.entertainer = Math.clamp(+child.skill.entertainer, 0, 200) || 0;
	child.skill.whore = Math.clamp(+child.skill.whore, 0, 200) || 0;
};

window.childStatCountDatatypeCleanup = function childStatCountDatatypeCleanup(child) {
	child.counter.oral = Math.max(+child.counter.oral, 0) || 0;
	child.counter.vaginal = Math.max(+child.counter.vaginal, 0) || 0;
	child.counter.anal = Math.max(+child.counter.anal, 0) || 0;
	child.counter.publicUse = Math.max(+child.counter.publicUse, 0) || 0;
	child.counter.mammary = Math.max(+child.counter.mammary, 0) || 0;
	child.counter.penetrative = Math.max(+child.counter.penetrative, 0) || 0;
	child.counter.pitKills = Math.max(+child.counter.pitKills, 0) || 0;
	child.counter.milk = Math.max(+child.counter.milk, 0) || 0;
	child.counter.cum = Math.max(+child.counter.cum, 0) || 0;
	child.counter.births = Math.max(+child.counter.births, 0) || 0;
	child.counter.birthsTotal = Math.max(+child.counter.birthsTotal, 0) || child.counter.births;
	child.counter.laborCount = Math.max(+child.counter.laborCount, 0) || child.counter.birthsTotal;
	child.childsFathered = Math.max(+child.childsFathered, 0) || 0;
	child.counter.PCChildrenFathered = Math.max(+child.counter.PCChildrenFathered, 0) || 0;
	child.childsKnockedUp = Math.max(+child.childsKnockedUp, 0) || 0;
	child.counter.PCKnockedUp = Math.max(+child.counter.PCKnockedUp, 0) || 0;
	child.bodySwap = Math.max(+child.bodySwap, 0) || 0;
};

window.childPreferencesDatatypeCleanup = function childPreferencesDatatypeCleanup(child) {
	child.energy = Math.clamp(+child.energy, 0, 100) || 0;
	child.need = Math.max(+child.need, 0) || 0;
	child.attrXY = Math.clamp(+child.attrXY, 0, 100) || 0;
	child.attrXX = Math.clamp(+child.attrXX, 0, 100) || 0;
	child.attrKnown = Math.clamp(+child.attrKnown, 0, 1) || 0;
	child.fetishStrength = Math.clamp(+child.fetishStrength, 0, 100) || 0;
	child.fetishKnown = Math.clamp(+child.fetishKnown, 0, 1) || 0;
};

window.childRulesDatatypeCleanup = function childRulesDatatypeCleanup(child) {
	child.breedingMark = Math.clamp(+child.breedingMark, 0, 1) || 0;
	child.rudeTitle = Math.clamp(+child.rudeTitle, 0, 1) || 0;
};

window.childCustomStatsDatatypeCleanup = function childCustomStatsDatatypeCleanup(child) {
	if (typeof child.custom.label !== "string") {
		child.custom.label = "";
	}
	if (typeof child.custom.desc !== "string") {
		child.custom.desc = "";
	}
	if (typeof child.custom.title !== "string") {
		child.custom.title = "";
	}
	if (typeof child.custom.titleLisp !== "string") {
		child.custom.titleLisp = "";
	}
	if (child.custom.image !== null) {
		if (typeof child.custom.image.filename !== "string") {
			child.custom.image = null;
		}
	}
};

window.childMiscellaneousDatatypeCleanup = function childMiscellaneousDatatypeCleanup(child) {
	child.weekAcquired = Math.max(+child.weekAcquired, 0) || 0;
	child.prestige = Math.clamp(+child.prestige, 0, 3) || 0;
	child.devotion = Math.clamp(+child.devotion, -100, 100) || 0;
	child.oldDevotion = Math.clamp(+child.oldDevotion, -100, 100) || 0;
	child.trust = Math.clamp(+child.trust, -100, 100) || 0;
	child.oldTrust = Math.clamp(+child.oldTrust, -100, 100) || 0;
	child.chem = Math.max(+child.chem, 0) || 0;
	child.addict = Math.max(+child.addict, 0) || 0;
	child.intelligence = Math.clamp(+child.intelligence, -100, 100) || 0;
	child.intelligenceImplant = Math.clamp(+child.intelligenceImplant, 0, 30) || 0;
	child.premature = Math.clamp(+child.premature, 0, 1) || 0;
	child.training = Math.clamp(+child.training, 0, 150) || 0;
	child.hears = Math.clamp(+child.hears, -2, 0) || 0;
	child.smells = Math.clamp(+child.smells, -1, 0) || 0;
	child.tastes = Math.clamp(+child.tastes, -1, 0) || 0;
	if (typeof child.earwear !== "string") {
		child.earwear = "none";
	}
	if (child.voice !== 0) {
		child.voice = Math.clamp(+child.voice, 0, 3) || 1;
	}
	child.electrolarynx = Math.clamp(+child.electrolarynx, 0, 1) || 0;
	child.accent = Math.clamp(+child.accent, 0, 4) || 0;
};

/* Make sure any new PC variables put into use are added to this! */
window.PCDatatypeCleanup = function PCDatatypeCleanup() {
	const PC = V.PC;

	if (PC.title !== 0) {
		PC.title = Math.clamp(+PC.title, 0, 1) || 1;
	}
	if (PC.dick !== 0) {
		PC.dick = Math.clamp(+PC.dick, 0, 5) || 4;
	}
	if (PC.vagina !== -1) {
		PC.vagina = Math.clamp(+PC.vagina, 0, 5) || 0;
	}
	if (typeof PC.genes !== "string") {
		PC.genes = "XY";
	}
	if (typeof PC.nationality !== "string") {
		PC.nationality = "Stateless";
	}
	if (typeof PC.race !== "string") {
		PC.race = "white";
	}
	if (typeof PC.skin !== "string") {
		PC.skin = "light";
	}
	if (typeof PC.markings !== "string") {
		PC.markings = "none";
	}
	if (typeof PC.hColor !== "string") {
		PC.hColor = "blonde";
	}
	if (typeof PC.eye.origColor !== "string") {
		PC.eye.origColor = "blue";
	}
	PC.belly = Math.max(+PC.belly, 0) || 0;
	PC.fertPeak = Math.clamp(+PC.fertPeak, 0, 4) || 0;
	PC.pregMood = Math.clamp(+PC.pregMood, 0, 2) || 0;
	PC.boobs = Math.clamp(+PC.boobs, 100, 1500) || 100;
	PC.boobsImplant = Math.clamp(+PC.boobsImplant, 0, 1000) || 0;
	PC.butt = Math.clamp(+PC.butt, 0, 5) || 2;
	PC.buttImplant = Math.clamp(+PC.buttImplant, 0, 5) || 0;
	PC.balls = Math.clamp(+PC.balls, 0, 100) || 0;
	PC.ballsImplant = Math.clamp(+PC.ballsImplant, 0, 100) || 0;
	PC.prostate = Math.clamp(+PC.prostate, 0, 1) || 0;
	PC.degeneracy = Math.max(+PC.degeneracy, 0) || 0;
	PC.birthWeek = Math.clamp(+PC.birthWeek, 0, 51) || 0;
	if (PC.sexualEnergy !== 0) {
		PC.sexualEnergy = +PC.sexualEnergy || 4;
	}
	if (typeof PC.refreshment !== "string") {
		PC.refreshment = "cigar";
	}
	if (!(V.ver.startsWith("0.10"))) {
		if (V.PC.refreshment === "cigar") {
			V.PC.refreshmentType = 0;
		} else {
			V.PC.refreshmentType = 1;
		}
	}
	PC.refreshmentType = Math.clamp(+PC.refreshmentType, 0, 6) || 0;
	PC.skill.trading = Math.clamp(+PC.skill.trading, -100, 100) || 0;
	PC.skill.warfare = Math.clamp(+PC.skill.warfare, -100, 100) || 0;
	PC.skill.slaving = Math.clamp(+PC.skill.slaving, -100, 100) || 0;
	PC.skill.engineering = Math.clamp(+PC.skill.engineering, -100, 100) || 0;
	PC.skill.medicine = Math.clamp(+PC.skill.medicine, -100, 100) || 0;
	PC.skill.hacking = Math.clamp(+PC.skill.hacking, -100, 100) || 0;
	PC.skill.cumTap = Math.max(+PC.skill.cumTap, 0) || 0;
	PC.mother = +PC.mother || 0;
	PC.father = +PC.father || 0;
	PC.labor = Math.clamp(+PC.labor, 0, 1) || 0;
	PC.counter.birthsTotal = Math.max(+PC.counter.birthsTotal, 0) || 0;
	PC.counter.birthElite = Math.max(+PC.counter.birthElite, 0) || 0;
	PC.counter.birthMaster = Math.max(+PC.counter.birthMaster, 0) || 0;
	PC.counter.birthDegenerate = Math.max(+PC.counter.birthDegenerate, 0) || 0;
	PC.counter.birthClient = Math.max(+PC.counter.birthClient, 0) || 0;
	PC.counter.birthOther = Math.max(+PC.counter.birthOther, 0) || 0;
	PC.counter.birthArcOwner = Math.max(+PC.counter.birthArcOwner, 0) || 0;
	PC.counter.birthCitizen = Math.max(+PC.counter.birthCitizen, 0) || 0;
	PC.counter.birthSelf = Math.max(+PC.counter.birthSelf, 0) || 0;
	PC.counter.birthLab = Math.max(+PC.counter.birthLab, 0) || 0;
	PC.counter.birthFutaSis = Math.max(+PC.counter.birthFutaSis, 0) || 0;
	PC.counter.slavesFathered = Math.max(+PC.counter.slavesFathered, 0) || 0;
	PC.counter.slavesKnockedUp = Math.max(+PC.counter.slavesKnockedUp, 0) || 0;
	PC.intelligence = 100;
	PC.face = 100;
	PC.actualAge = Math.clamp(+PC.actualAge, 14, 80) || 35;
	PC.physicalAge = Math.clamp(+PC.physicalAge, 14, 80) || PC.actualAge;
	PC.visualAge = Math.clamp(+PC.visualAge, 14, 80) || PC.actualAge;
	PC.ovaryAge = Math.clamp(+PC.ovaryAge, 14, 80) || PC.physicalAge;
	if (V.playerAging !== 0) {
		V.playerAging = Math.clamp(+V.playerAging, 0, 2) || 2;
	}
	PC.newVag = Math.clamp(+PC.newVag, 0, 1) || 0;
	PC.fertDrugs = Math.clamp(+PC.fertDrugs, 0, 1) || 0;
	PC.forcedFertDrugs = Math.max(+PC.forcedFertDrugs, 0) || 0;
	PC.staminaPills = Math.clamp(+PC.staminaPills, 0, 1) || 0;
	PC.storedCum = Math.max(+PC.storedCum, 0) || 0;
	PC.mpreg = 0; /* So knockMeUp() may be used with the PC */
	PC.lactation = Math.max(+PC.lactation, 0) || 0;
	PC.lactationDuration = Math.max(+PC.lactationDuration, 0) || 0;
	PC.muscles = Math.clamp(+PC.muscles, -100, 100) || 50;
	PC.hLength = Math.clamp(+PC.hLength, 0, 150) || 2;
	PC.voice = Math.clamp(+PC.voice, 1, 3) || 1;
	if (typeof PC.health === "number") {
		const condition = PC.health;
		PC.health = {};
		PC.health.condition = condition;
	}
	PC.health.condition = Math.clamp(PC.health.condition, -100, 100) || 0;
	if (PC.majorInjury !== undefined) {
		if (PC.majorInjury > 0) {
			PC.health.shortDamage = Math.max(PC.majorInjury * 20, 30);
		} else {
			PC.health.shortDamage = 0;
		}
		delete PC.majorInjury;
	} else {
		PC.health.shortDamage = Math.max(+PC.health.shortDamage, 0) || 0;
	}
	PC.health.longDamage = Math.max(+PC.health.longDamage, 0) || 0;
	PC.health.illness = Math.max(+PC.health.illness, 0) || 0;
	PC.health.tired = Math.clamp(+PC.health.tired, 0, 100) || 0;
	PC.health.health = Math.clamp(PC.health.condition - PC.health.shortDamage - PC.health.longDamage, -100, 100) || 0;
	if (typeof PC.rules.living !== "string") {
		PC.rules.living = "normal";
	}
	if (typeof PC.rules.lactation !== "string") {
		PC.rules.lactation = "none";
	}
	if (typeof PC.rules.rest !== "string") {
		PC.rules.rest = "permissive";
	}
	App.Entity.Utils.migratePronouns(PC);
	generatePlayerPronouns(PC);

	if (PC.age !== undefined) {
		delete PC.age;
	}
	if (PC.indenture !== undefined) {
		delete PC.indenture;
	}
	if (PC.indentureRestrictions !== undefined) {
		delete PC.indentureRestrictions;
	}
	if (PC.boobsImplant > 0) {
		PC.boobsImplantType = "normal";
	} else {
		PC.boobsImplantType = "none";
	}
	if (PC.buttImplant > 0) {
		PC.buttImplantType = "normal";
	} else {
		PC.buttImplantType = "none";
	}
	if (V.PC.customTitle === "") {
		V.PC.customTitle = undefined, V.PC.customTitleLisp = undefined;
	}
	if (typeof V.PC.counter.oral === "undefined") {
		V.PC.counter.oral = 0;
	}
	if (typeof V.PC.counter.vaginal === "undefined") {
		V.PC.counter.vaginal = 0;
	}
	if (typeof V.PC.counter.anal === "undefined") {
		V.PC.counter.anal = 0;
	}
	if (typeof V.PC.counter.mammary === "undefined") {
		V.PC.counter.mammary = 0;
	}
	if (typeof V.PC.counter.penetrative === "undefined") {
		V.PC.counter.penetrative = 0;
	}
	WombInit(V.PC);
	if (typeof V.PC.ID === "undefined") {
		V.PC.ID = -1;
	}

	/* None of these are in use */
	PC.bellyPreg = PC.belly;
	PC.ageImplant = 0;
	PC.voiceImplant = 0;
	PC.accent = 0;
};

window.EconomyDatatypeCleanup = function EconomyDatatypeCleanup() {
	V.arcologies[0].prosperity = Math.clamp(+V.arcologies[0].prosperity, 1, V.AProsperityCap) || 1;
	V.AProsperityCap = Math.max(+V.AProsperityCap, 0) || 0;
	V.economy = Math.max(+V.economy, 20) || 100;
	if (V.economy === 0.5) {
		V.economy = 200;
	} else if (V.economy === 1) {
		V.economy = 100;
	} else if (V.economy === 1.5) {
		V.economy = 67;
	}
	V.difficultySwitch = Math.clamp(+V.difficultySwitch, 0, 1) || 0;
	if (V.baseDifficulty) {
		V.baseDifficulty = Math.clamp(+V.baseDifficulty, 1, 5) || 3;
	} else if (V.economy > 125) {
		V.baseDifficulty = 1;
	} else if (V.economy > 100) {
		V.baseDifficulty = 2;
	} else if (V.economy > 80) {
		V.baseDifficulty = 3;
	} else if (V.economy > 67) {
		V.baseDifficulty = 4;
	} else {
		V.baseDifficulty = 5;
	}
	V.localEcon = Math.max(+V.localEcon, 20) || V.economy;
	V.econRate = Math.clamp(+V.econRate, 1, 4) || 2;
	V.slaveCostFactor = Math.max(+V.slaveCostFactor, 0) || 1;
	if (V.menialSupplyFactor !== 0) {
		V.menialSupplyFactor = Math.clamp(+V.menialSupplyFactor, -50000, 50000) || (1 - V.slaveCostFactor) * 400 * 1000 * 0.5; /* (1 - slaveCostFactor) * price elasticity * base price * 0.5 */
	}
	if (V.menialDemandFactor !== 0) {
		V.menialDemandFactor = Math.clamp(+V.menialDemandFactor, -50000, 50000) || -V.menialSupplyFactor;
	}
	V.slaveCostRandom = Math.clamp(+V.slaveCostRandom, -3, 3) || 0;
	V.demandTimer = Math.max(+V.demandTimer, 0) || 0;
	V.elapsedDemandTimer = Math.max(+V.elapsedDemandTimer, 0) || 0;
	V.supplyTimer = Math.max(+V.supplyTimer, 0) || 0;
	V.elapsedSupplyTimer = Math.max(+V.elapsedSupplyTimer, 0) || 0;
	V.deltaSupply = Math.clamp(+V.deltaSupply, -6500, 6500) || 0;
	V.deltaDemand = Math.clamp(+V.deltaDemand, -6500, 6500) || 0;
	V.deltaSupplyOld = Math.clamp(+V.deltaSupply, -6500, 6500) || 0;
	V.deltaDemandOld = Math.clamp(+V.deltaDemand, -6500, 6500) || 0;
	V.sexSubsidies.lowerClass = Math.clamp(+V.sexSubsidies.lowerClass, 0, 4) || 0;
	V.sexSubsidies.middleClass = Math.clamp(+V.sexSubsidies.middleClass, 0, 4) || 0;
	V.sexSubsidies.upperClass = Math.clamp(+V.sexSubsidies.upperClass, 0, 4) || 0;
	V.sexSubsidies.topClass = Math.clamp(+V.sexSubsidies.topClass, 0, 4) || 0;
	V.sexSupplyBarriers.lowerClass = Math.clamp(+V.sexSupplyBarriers.lowerClass, 0, 4) || 0;
	V.sexSupplyBarriers.middleClass = Math.clamp(+V.sexSupplyBarriers.middleClass, 0, 4) || 0;
	V.sexSupplyBarriers.upperClass = Math.clamp(+V.sexSupplyBarriers.upperClass, 0, 4) || 0;
	V.sexSupplyBarriers.topClass = Math.clamp(+V.sexSupplyBarriers.topClass, 0, 4) || 0;
	V.NPCSexSupply.lowerClass = Math.max(+V.NPCSexSupply.lowerClass, 500) || 3000;
	V.NPCSexSupply.middleClass = Math.max(+V.NPCSexSupply.middleClass, 500) || 3000;
	V.NPCSexSupply.upperClass = Math.max(+V.NPCSexSupply.upperClass, 500) || 3000;
	V.NPCSexSupply.topClass = Math.max(+V.NPCSexSupply.topClass, 500) || 3000;

	V.rentDefaults.lowerClass = Math.max(+V.rentDefaults.lowerClass, 0) || 20; /* nowhere modified */
	V.rentDefaults.middleClass = Math.max(+V.rentDefaults.middleClass, 0) || 50; /* nowhere modified */
	V.rentDefaults.upperClass = Math.max(+V.rentDefaults.upperClass, 0) || 180; /* nowhere modified */
	V.rentDefaults.topClass = Math.max(+V.rentDefaults.topClass, 0) || 650; /* nowhere modified */

	if (!V.whoreBudget) {
		V.whoreBudget = {};
	}
	if (V.whoreBudget.lowerClass) {
		V.whoreBudget.lowerClass = Math.max(+V.whoreBudget.lowerClass, 8) || 10;
	} else {
		V.whoreBudget.lowerClass = (0.8 + (V.rent.lowerClass / V.rentDefaults.lowerClass) / 5) * 7;
	}
	if (V.whoreBudget.middleClass) {
		V.whoreBudget.middleClass = Math.max(+V.whoreBudget.middleClass, 40) || 50;
	} else {
		V.whoreBudget.middleClass = (0.8 + (V.rent.middleClass / V.rentDefaults.middleClass) / 5) * 40;
	}
	if (V.whoreBudget.upperClass) {
		V.whoreBudget.upperClass = Math.max(+V.whoreBudget.upperClass, 200) || 250;
	} else {
		V.whoreBudget.upperClass = (0.8 + (V.rent.upperClass / V.rentDefaults.upperClass) / 5) * 200;
	}
	if (V.whoreBudget.topClass) {
		V.whoreBudget.topClass = Math.max(+V.whoreBudget.topClass, 1200) || 1500;
	} else {
		V.whoreBudget.topClass = (0.8 + (V.rent.topClass / V.rentDefaults.topClass) / 5) * 1500;
	}
	if (!V.NPCMarketShare) {
		V.NPCMarketShare = {};
	}

	// fixing potential massive oversupply
	if (V.NPCSexSupply.lowerClass > V.lowerClass * V.whoreBudget.lowerClass) {
		V.NPCSexSupply.lowerClass = V.lowerClass * V.whoreBudget.lowerClass;
	}

	V.NPCMarketShare.lowerClass = Math.clamp(+V.NPCMarketShare.lowerClass, 0, 1000) || 0;
	V.NPCMarketShare.middleClass = Math.clamp(+V.NPCMarketShare.middleClass, 0, 1000) || 0;
	V.NPCMarketShare.upperClass = Math.clamp(+V.NPCMarketShare.upperClass, 0, 1000) || 0;
	V.NPCMarketShare.topClass = Math.clamp(+V.NPCMarketShare.topClass, 0, 1000) || 0;
	V.econWeatherDamage = Math.max(+V.econWeatherDamage, 0) || 0;
	V.disasterResponse = Math.clamp(+V.disasterResponse, 0, 2) || 0;
	V.antiWeatherFreeze = Math.clamp(+V.antiWeatherFreeze, 0, 2) || 0;
	V.GDP = Math.max(+V.GDP, 1) || 278.6;
	V.NPCSlaves = Math.max(+V.NPCSlaves, 0) || 0;
	V.visitors = Math.max(+V.visitors, 0) || 0;

	V.LSCBase = Math.max(+V.LSCBase, 0) || 800; /* nowhere modified */
	V.rentEffectL = Math.max(+V.rentEffectL, 0) || 1;
	if (V.lowerClass !== 0) {
		V.lowerClass = Math.max(+V.lowerClass, 0) || 3120;
	}

	V.MCBase = Math.max(+V.MCBase, 0) || 200; /* nowhere modified */
	V.rentEffectM = Math.max(+V.rentEffectM, 0) || 1;
	if (V.middleClass !== 0) {
		V.middleClass = Math.max(+V.middleClass, 0) || 890;
	}

	V.UCBase = Math.max(+V.UCBase, 0) || 40; /* nowhere modified */
	V.rentEffectU = Math.max(+V.rentEffectU, 0) || 1;
	if (V.upperClass !== 0) {
		V.upperClass = Math.max(+V.upperClass, 0) || 200;
	}

	V.TCBase = Math.max(+V.TCBase, 0) || 20; /* nowhere modified */
	V.rentEffectT = Math.max(+V.rentEffectT, 0) || 1;
	if (V.topClass !== 0) {
		V.topClass = Math.max(+V.topClass, 0) || 40;
	}
};

window.ArcologyDatatypeCleanup = function ArcologyDatatypeCleanup() {
	V.arcologies[0].ownership = Math.clamp(+V.arcologies[0].ownership, 0, 100) || 0;
	V.arcologies[0].minority = Math.clamp(+V.arcologies[0].minority, 0, 100) || 0;

	V.menials = Math.max(+V.menials, 0) || 0;
	V.fuckdolls = Math.max(+V.fuckdolls, 0) || 0;
	V.menialBioreactors = Math.max(+V.menialBioreactors, 0) || 0;

	V.ACitizens = Math.max(+V.ACitizens, 0) || 0;
	V.ASlaves = Math.max(+V.ASlaves, 0) || V.NPCSlaves + V.menials + V.fuckdolls + V.menialBioreactors;
	V.shelterAbuse = Math.max(+V.shelterAbuse, 0) || 0;

	if (V.localEcon > 100) {
		V.farmyardFoodCost = Math.max(5 / (1 + (Math.trunc(1000-100000/V.localEcon)/10)/100), 3.125);
	} else if (V.localEcon === 100) {
		V.farmyardFoodCost = 5;
	} else {
		V.farmyardFoodCost = Math.min(5 * (1 + 1.5 * Math.sqrt(Math.trunc(100000/V.localEcon-1000)/10)/100), 6.5);
	}
	V.foodCost = Math.trunc(2500 / V.localEcon);
	V.drugsCost = Math.trunc(10000 / V.localEcon);
	V.rulesCost = Math.trunc(10000 / V.localEcon);
	V.modCost = Math.trunc(5000 / V.localEcon);
	V.surgeryCost = Math.trunc(30000 / (V.localEcon * (V.PC.career === "medicine" ? 2 : 1)));
	V.facilityCost = +V.facilityCost || 100;
	V.policyCost = +V.policyCost || 5000;

	V.TSS.studentsBought = Math.max(+V.TSS.studentsBought, 0) || 0;
	V.TSS.schoolProsperity = Math.clamp(+V.TSS.schoolProsperity, -10, 10) || 0;
	V.GRI.studentsBought = Math.max(+V.GRI.studentsBought, 0) || 0;
	V.GRI.schoolProsperity = Math.clamp(+V.GRI.schoolProsperity, -10, 10) || 0;
	V.SCP.studentsBought = Math.max(+V.SCP.studentsBought, 0) || 0;
	V.SCP.schoolProsperity = Math.clamp(+V.SCP.schoolProsperity, -10, 10) || 0;
	V.LDE.studentsBought = Math.max(+V.LDE.studentsBought, 0) || 0;
	V.LDE.schoolProsperity = Math.clamp(+V.LDE.schoolProsperity, -10, 10) || 0;
	V.TGA.studentsBought = Math.max(+V.TGA.studentsBought, 0) || 0;
	V.TGA.schoolProsperity = Math.clamp(+V.TGA.schoolProsperity, -10, 10) || 0;
	V.HA.studentsBought = Math.max(+V.HA.studentsBought, 0) || 0;
	V.HA.schoolProsperity = Math.clamp(+V.HA.schoolProsperity, -10, 10) || 0;
	V.TCR.studentsBought = Math.max(+V.TCR.studentsBought, 0) || 0;
	V.TCR.schoolProsperity = Math.clamp(+V.TCR.schoolProsperity, -10, 10) || 0;
	V.TFS.studentsBought = Math.max(+V.TFS.studentsBought, 0) || 0;
	V.TFS.schoolProsperity = Math.clamp(+V.TFS.schoolProsperity, -10, 10) || 0;
	V.NUL.studentsBought = Math.max(+V.NUL.studentsBought, 0) || 0;
	V.NUL.schoolProsperity = Math.clamp(+V.NUL.schoolProsperity, -10, 10) || 0;
};

window.FacilityDatatypeCleanup = (function() {
	"use strict";

	return FacilityDatatypeCleanup;

	function FacilityDatatypeCleanup() {
		/* common variables */
		FacilityIDArrayCleanup();
		FutureSocieties.DecorationCleanup();
		FacilityNameCleanup();
		/* facility specific variables */
		BrothelDatatypeCleanup();
		DairyDatatypeCleanup();
		FarmyardDatatypeCleanup();
		ClubDatatypeCleanup();
		ServantsQuartersDatatypeCleanup();
		SchoolroomDatatypeCleanup();
		SpaDatatypeCleanup();
		ClinicDatatypeCleanup();
		ArcadeDatatypeCleanup();
		CellblockDatatypeCleanup();
		MasterSuiteDatatypeCleanup();
		HeadGirlSuiteDatatypeCleanup();
		NurseryDatatypeCleanup();

		V.Recruiter = V.slaves.find(s => s.assignment === "recruit girls") || 0;
		V.Bodyguard = V.slaves.find(s => s.assignment === "guard you") || 0;
		if (V.Lurcher) {
			V.Lurcher = V.slaves[V.slaveIndices[V.Lurcher.ID]];
		}
		if (V.Stud) {
			V.Stud = V.slaves[V.slaveIndices[V.Stud.ID]];
		}
	}

	function FacilityIDArrayCleanup() {
		function helperFunction(facilityIDArray) {
			if (!Array.isArray(facilityIDArray)) {
				return [];
			} else if (typeof facilityIDArray[0] === "object") {
				return facilityIDArray.map(a => a.ID);
			} else {
				const si = V.slaveIndices;
				return facilityIDArray.filter(id => si.hasOwnProperty(id));
			}
		}

		V.slaveIndices = slaves2indices();

		V.BrothiIDs = helperFunction(V.BrothiIDs);
		V.DairyiIDs = helperFunction(V.DairyiIDs);
		V.ClubiIDs = helperFunction(V.ClubiIDs);
		V.ServQiIDs = helperFunction(V.ServQiIDs);
		V.SchlRiIDs = helperFunction(V.SchlRiIDs);
		V.SpaiIDs = helperFunction(V.SpaiIDs);
		V.CliniciIDs = helperFunction(V.CliniciIDs);
		V.ArcadeiIDs = helperFunction(V.ArcadeiIDs);
		V.CellBiIDs = helperFunction(V.CellBiIDs);
		V.MastSiIDs = helperFunction(V.MastSiIDs);
		V.HGSuiteiIDs = helperFunction(V.HGSuiteiIDs);
		V.NurseryiIDs = helperFunction(V.NurseryiIDs);
		V.FarmyardiIDs = helperFunction(V.FarmyardiIDs);
	}

	function FacilityNameCleanup() {
		V.arcologies[0].name = V.arcologies[0].name || "Arcology X-4";
		V.brothelName = V.brothelName || "the Brothel";
		V.brothelNameCaps = V.brothelNameCaps || "The Brothel";
		V.dairyName = V.dairyName || "the Dairy";
		V.dairyNameCaps = V.dairyNameCaps || "The Dairy";
		V.clubName = V.clubName || "the Club";
		V.clubNameCaps = V.clubNameCaps || "The Club";
		V.servantsQuartersName = V.servantsQuartersName || "the Servants' Quarters";
		V.servantsQuartersNameCaps = V.servantsQuartersNameCaps || "The Servants' Quarters";
		V.schoolroomName = V.schoolroomName || "the Schoolroom";
		V.schoolroomNameCaps = V.schoolroomNameCaps || "The Schoolroom";
		V.spaName = V.spaName || "the Spa";
		V.spaNameCaps = V.spaNameCaps || "The Spa";
		V.nurseryName = V.nurseryName || "the Nursery";
		V.nurseryNameCaps = V.nurseryNameCaps || "The Nursery";
		V.clinicName = V.clinicName || "the Clinic";
		V.clinicNameCaps = V.clinicNameCaps || "The Clinic";
		V.arcadeName = V.arcadeName || "the Arcade";
		V.arcadeNameCaps = V.arcadeNameCaps || "The Arcade";
		V.cellblockName = V.cellblockName || "the Cellblock";
		V.cellblockNameCaps = V.cellblockNameCaps || "The Cellblock";
		V.masterSuiteName = V.masterSuiteName || "the Master Suite";
		V.masterSuiteNameCaps = V.masterSuiteNameCaps || "The Master Suite";
		V.HGSuiteName = V.HGSuiteName || "the Head Girl Suite";
		V.HGSuiteNameCaps = V.HGSuiteNameCaps || "The Head Girl Suite";
		V.pitName = V.pitName || "the Pit";
		V.pitNameCaps = V.pitNameCaps || "The Pit";
		V.incubatorName = V.incubatorName || "the Incubator";
		V.incubatorNameCaps = V.incubatorNameCaps || "The Incubator";
		V.farmyardName = V.farmyardName || "the Farmyard";
		V.farmyardNameCaps = V.farmyardNameCaps || "The Farmyard";
	}

	function BrothelDatatypeCleanup() {
		/* ads */
		V.brothelAdsSpending = Math.clamp(+V.brothelAdsSpending, 0, 5000) || 0;
		V.brothelAdsStacked = Math.clamp(+V.brothelAdsStacked, -1, 1) || 0;
		V.brothelAdsImplanted = Math.clamp(+V.brothelAdsImplanted, -1, 1) || 0;
		V.brothelAdsModded = Math.clamp(+V.brothelAdsModded, -1, 1) || 0;
		V.brothelAdsPreg = Math.clamp(+V.brothelAdsPreg, -1, 1) || 0;
		V.brothelAdsOld = Math.clamp(+V.brothelAdsOld, -3, 1) || 0;
		V.brothelAdsXX = Math.clamp(+V.brothelAdsXX, -1, 1) || 0;
		/* upgrades */
		V.brothel = Math.max(+V.brothel, 0) || 0;
		V.brothelUpgradeDrugs = Math.clamp(+V.brothelUpgradeDrugs, 0, 2) || 0;
		/* madam */
		V.Madam = V.slaves.find(s => s.assignment === "be the Madam") || 0;
		V.MadamIgnoresFlaws = Math.clamp(+V.MadamIgnoresFlaws, 0, 1) || 0;
	}

	function DairyDatatypeCleanup() {
		/* upgrades */
		V.dairy = Math.max(+V.dairy, 0) || 0;
		V.dairyFeedersUpgrade = Math.clamp(+V.dairyFeedersUpgrade, 0, 1) || 0;
		V.dairyFeedersSetting = Math.clamp(+V.dairyFeedersSetting, 0, 2) || 0;
		V.dairyPregUpgrade = Math.clamp(+V.dairyPregUpgrade, 0, 1) || 0;
		V.dairyPregSetting = Math.clamp(+V.dairyPregSetting, 0, 3) || 0;
		V.dairyStimulatorsUpgrade = Math.clamp(+V.dairyStimulatorsUpgrade, 0, 1) || 0;
		V.dairyStimulatorsSetting = Math.clamp(+V.dairyStimulatorsSetting, 0, 2) || 0;
		V.dairyRestraintsUpgrade = Math.clamp(+V.dairyRestraintsUpgrade, 0, 1) || 0;
		V.dairyRestraintsSetting = Math.clamp(+V.dairyRestraintsSetting, 0, 2) || 0;
		V.dairySlimMaintainUpgrade = Math.clamp(+V.dairySlimMaintainUpgrade, 0, 1) || 0;
		V.dairySlimMaintain = Math.clamp(+V.dairySlimMaintain, 0, 1) || 0;
		V.dairyPrepUpgrade = Math.clamp(+V.dairyPrepUpgrade, 0, 1) || 0;
		V.dairyHyperPregRemodel = Math.clamp(+V.dairyHyperPregRemodel, 0, 1) || 0;
		V.dairyImplantsSetting = Math.clamp(+V.dairyImplantsSetting, 0, 3) || 0;
		V.dairyWeightSetting = Math.clamp(+V.dairyWeightSetting, -1, 4) || 0;
		/* bioreactors */
		V.bioreactorsAnnounced = Math.clamp(+V.bioreactorsAnnounced, 0, 1) || 0;
		V.createBioreactors = Math.clamp(+V.createBioreactors, 0, 1) || 0;
		V.dairyUpgradeMenials = Math.clamp(+V.dairyUpgradeMenials, 0, 1) || 0;
		V.bioreactorsHerm = Math.max(+V.bioreactorsHerm, 0) || 0;
		V.bioreactorsXX = Math.max(+V.bioreactorsXX, 0) || 0;
		V.bioreactorsXY = Math.max(+V.bioreactorsXY, 0) || 0;
		V.bioreactorsBarren = Math.max(+V.bioreactorsBarren, 0) || 0;
		/* milkmaid */
		V.Milkmaid = V.slaves.find(s => s.assignment === "be the Milkmaid") || 0;
		V.milkmaidImpregnates = Math.clamp(+V.milkmaidImpregnates, 0, 1) || 0;
	}

	function FarmyardDatatypeCleanup() {
		V.farmyard = Math.max(+V.farmyard, 0) || 0;
		V.farmyardBreeding = Math.clamp(+V.farmyardBreeding, 0, 1) || 0;
		V.farmyardShows = Math.clamp(+V.farmyardShows, 0, 1) || 0;
		/* farmer */
		V.Farmer = V.slaves.find(s => s.assignment === "be the Farmer") || 0;
	}

	function ClubDatatypeCleanup() {
		/* ads */
		V.clubAdsSpending = Math.clamp(+V.clubAdsSpending, 0, 5000) || 0;
		V.clubAdsStacked = Math.clamp(+V.clubAdsStacked, -1, 1) || 0;
		V.clubAdsImplanted = Math.clamp(+V.clubAdsImplanted, -1, 1) || 0;
		V.clubAdsModded = Math.clamp(+V.clubAdsModded, -1, 1) || 0;
		V.clubAdsPreg = Math.clamp(+V.clubAdsPreg, -1, 1) || 0;
		V.clubAdsOld = Math.clamp(+V.clubAdsOld, -3, 1) || 0;
		V.clubAdsXX = Math.clamp(+V.clubAdsXX, -1, 1) || 0;
		/* upgrades */
		V.club = Math.max(+V.club, 0) || 0;
		V.clubUpgradePDAs = Math.clamp(+V.clubUpgradePDAs, 0, 1) || 0;
		/* madam */
		V.DJ = V.slaves.find(s => s.assignment === "be the DJ") || 0;
		V.DJignoresFlaws = Math.clamp(+V.DJignoresFlaws, 0, 1) || 0;
	}

	function ServantsQuartersDatatypeCleanup() {
		/* upgrades */
		V.servantsQuarters = Math.max(+V.servantsQuarters, 0) || 0;
		V.servantsQuartersUpgradeMonitoring = Math.clamp(+V.servantsQuartersUpgradeMonitoring, 0, 1) || 0;
		/* stewardess */
		V.Stewardess = V.slaves.find(s => s.assignment === "be the Stewardess") || 0;
		V.stewardessImpregnates = Math.clamp(+V.stewardessImpregnates, 0, 1) || 0;
	}

	function SchoolroomDatatypeCleanup() {
		/* upgrades */
		V.schoolroom = Math.max(+V.schoolroom, 0) || 0;
		V.schoolroomUpgradeSkills = Math.clamp(+V.schoolroomUpgradeSkills, 0, 1) || 0;
		V.schoolroomUpgradeLanguage = Math.clamp(+V.schoolroomUpgradeLanguage, 0, 1) || 0;
		V.schoolroomUpgradeRemedial = Math.clamp(+V.schoolroomUpgradeRemedial, 0, 1) || 0;
		/* schoolteacher */
		V.Schoolteacher = V.slaves.find(s => s.assignment === "be the Schoolteacher") || 0;
	}

	function SpaDatatypeCleanup() {
		/* upgrades */
		V.spa = Math.max(+V.spa, 0) || 0;
		V.spaUpgrade = Math.clamp(+V.spaUpgrade, 0, 1) || 0;
		/* attendant */
		V.Attendant = V.slaves.find(s => s.assignment === "be the Attendant") || 0;
		V.spaFix = Math.clamp(+V.spaFix, 0, 2) || 0;
	}

	function ClinicDatatypeCleanup() {
		/* upgrades */
		V.clinic = Math.max(+V.clinic, 0) || 0;
		V.clinicUpgradeScanner = Math.clamp(+V.clinicUpgradeScanner, 0, 1) || 0;
		V.clinicUpgradeFilters = Math.clamp(+V.clinicUpgradeFilters, 0, 1) || 0;
		V.clinicUpgradePurge = Math.clamp(+V.clinicUpgradePurge, 0, 3) || 0;
		V.clinicObservePregnancy = Math.clamp(+V.clinicObservePregnancy, 0, 1) || 1;
		V.clinicInflateBelly = Math.clamp(+V.clinicInflateBelly, 0, 1) || 0;
		V.clinicSpeedGestation = Math.clamp(+V.clinicSpeedGestation, 0, 1) || 0;
		/* nurse */
		V.Nurse = V.slaves.find(s => s.assignment === "be the Nurse") || 0;
	}

	function ArcadeDatatypeCleanup() {
		/* upgrades */
		V.arcade = Math.max(+V.arcade, 0) || 0;
		V.arcadeUpgradeInjectors = Math.clamp(+V.arcadeUpgradeInjectors, 0, 1) || 0;
		V.arcadeUpgradeCollectors = Math.clamp(+V.arcadeUpgradeCollectors, 0, 1.5) || 0;
		V.arcadeUpgradeFuckdolls = Math.clamp(+V.arcadeUpgradeFuckdolls, 0, 2) || 0;
		V.arcadeUpgradeHealth = Math.clamp(+V.arcadeUpgradeHealth, -1, 2) || 0;
	}

	function CellblockDatatypeCleanup() {
		/* upgrades */
		V.cellblock = Math.max(+V.cellblock, 0) || 0;
		V.cellblockUpgrade = Math.clamp(+V.cellblockUpgrade, 0, 1) || 0;
		/* wardeness */
		V.Wardeness = V.slaves.find(s => s.assignment === "be the Wardeness") || 0;
		V.cellblockWardenCumsInside = Math.clamp(+V.cellblockWardenCumsInside, 0, 1) || 0;
	}

	function MasterSuiteDatatypeCleanup() {
		/* upgrades */
		V.masterSuite = Math.max(+V.masterSuite, 0) || 0;
		V.masterSuiteUpgradeLuxury = Math.clamp(+V.masterSuiteUpgradeLuxury, 0, 2) || 0;
		V.masterSuiteUpgradePregnancy = Math.clamp(+V.masterSuiteUpgradePregnancy, 0, 1) || 0;
		V.masterSuitePregnancyFertilitySupplements = Math.clamp(+V.masterSuitePregnancyFertilitySupplements, 0, 1) || 0;
		V.masterSuitePregnancySlaveLuxuries = Math.clamp(+V.masterSuitePregnancySlaveLuxuries, 0, 1) || 0;
		V.masterSuitePregnancyFertilityDrugs = Math.clamp(+V.masterSuitePregnancyFertilityDrugs, 0, 1) || 0;
		V.masterSuiteHyperPregnancy = Math.clamp(+V.masterSuiteHyperPregnancy, 0, 1) || 0;
		/* concubine */
		V.Concubine = V.slaves.find(s => s.assignment === "be your Concubine") || 0;
	}

	function HeadGirlSuiteDatatypeCleanup() {
		/* headgirl */
		V.HeadGirl = V.slaves.find(s => s.assignment === "be your Head Girl") || 0;
		V.HGSuiteEquality = Math.clamp(+V.HGSuiteEquality, 0, 1) || 0;
		if (V.HGSuiteSurgery !== 0) {
			V.HGSuiteSurgery = 1;
		}
		if (V.HGSuiteDrugs !== 0) {
			V.HGSuiteDrugs = 1;
		}
		if (V.HGSuiteHormones !== 0) {
			V.HGSuiteHormones = 1;
		}
	}

	function NurseryDatatypeCleanup() {
		/* matron */
		V.Matron = V.slaves.find(s => s.assignment === "be the Matron") || 0;
	}
})();


/**
 * Cleans up a slave record assuming it is used for the gene pool.
 *
 * It removes all the unneeded properties for the gene pool attributes.
 * @todo remove after refactoring the slave state class
 */
App.Entity.Utils.GenePoolRecordCleanup = (function() {
	"use strict";
	return GenePoolRecordCleanup;

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function GenePoolRecordCleanup(slave) {
		App.Entity.Utils.SlaveDataSchemeCleanup(slave);

		// the following attributes are unneeded for gene pool records
		[
			"counters", "custom", "porn",
			"prestige", "pornFeed", "pornFame", "pornFameSpending", "pornPrestige", "pornPrestigeDesc", "prestigeDesc",
			"recruiter", "relation", "relationTarget", "subTarget", "relationship", "relationshipTarget", "rivalry", "rivalryTarget",
			"pronoun", "possessive", "possessivePronoun", "objectReflexive", "object", "noun",
			"weekAcquired", "HGExclude",
			"daughters", "origin",
			"canRecruit",
			"choosesOwnAssignment", "assignment",
			"sentence", "training", "toyHole",
			"indenture", "indentureRestrictions",
			"minorInjury",
			"oldTrust", "oldDevotion",
			"eyewear", "earwear",
			"preg", "pregSource", "pregType", "pregAdaptation", "labor",
			"bellyAccessory",
			"clitSetting",
			"rules",
			"useRulesAssistant",
			"diet", "dietCum", "dietMilk",
			"tired",
			"drugs", "curatives", "aphrodisiacs",
			"choosesOwnClothes", "clothes", "collar", "shoes",
			"makeup", "nails",
			"vaginalAccessory", "dickAccessory", "armAccessory", "legAccessory",
			"buttplug", "buttplugAttachment",
			"fetishKnown",
			"rudeTitle",
			"currentRules",
			"induce",
			"mpreg",
			"inflation", "inflationType", "inflationMethod", "milkSource", "cumSource",
			"burst",
			"pregKnown", "pregWeek",
			"belly", "bellyPreg", "bellyFluid", "bellyImplant", "bellySag", "bellySagPreg", "bellyPain",
			"cervixImplant",
			"birthsTotal",
			"scar",
			"choosesOwnChastity",
			"pregControl",
			"death",
			"onDiet",
			"prematureBirth",
			"slaveCost"
		].forEach((s) => delete slave[s]);
	}
})();

App.Entity.Utils.RARuleDatatypeCleanup = function() {
	"use strict";

	return ruleCleanup;

	/** @param {App.RA.Rule} rule */
	function ruleCleanup(rule) {
		// ensure rule has all required properties
		let newRule = App.RA.ruleDeepAssign(emptyDefaultRule(), rule);
		cleanupConditions(newRule.condition);
		cleanupSetters(newRule.set);
		return newRule;
	}

	/** @param {App.RA.RuleConditions} cond */
	function cleanupConditions(cond) {
		if (cond.excludeSpecialSlaves !== undefined) {
			if (cond.excludeSpecialSlaves) {
				cond.specialSlaves = 0;
			} else {
				cond.specialSlaves = -1;
			}
			delete cond.excludeSpecialSlaves;
		}

		if (cond.specialSlaves !== undefined) {
			const f = App.Data.Facilities;
			// facilities with heads
			/** @type {App.Data.FacilityDesc[]} */
			const fwh = [
				f.brothel,
				f.cellblock,
				f.clinic,
				f.club,
				f.dairy,
				f.farmyard,
				f.headGirlSuite,
				f.masterSuite,
				f.nursery,
				f.schoolroom,
				f.servantsQuarters,
				f.spa
			];

			// migrate .specialSlaves to assignments list
			if (cond.specialSlaves === -1) { // include: duplicate regular assignments
				for (const f of fwh) {
					if (cond.assignment.includes(f.jobs[f.defaultJob].assignment)) {
						cond.assignment.push(f.manager.assignment);
					}
				}
			} else if (cond.specialSlaves === 1) { // only: replace regular assignments
				let newAssignments = [];
				for (const a of cond.assignment) {
					let found = false;
					for (const f of fwh) {
						if (a === f.jobs[f.defaultJob].assignment) {
							newAssignments.push(f.manager.assignment);
							found = true;
							break;
						}
					}
					if (!found) {
						newAssignments.push(a);
					}
				}
				// now if newAssignments is empty, we add all facility heads and special slaves
				if (newAssignments.length === 0) {
					fwh.forEach(f => newAssignments.push(f.manager.assignment));
					newAssignments.push("recruit girls");
					newAssignments.push("guard you");
				}
				cond.assignment = newAssignments;
			}
			delete cond.specialSlaves;
		}
	}

	/** @param {object} o */
	function replaceDefaultValues(o) {
		for (const [k, v] of Object.entries(o)) {
			if (v === "no default setting" || v === "no default change" || Number.isNaN(v) || v === undefined) {
				o[k] = null;
			} else if (v !== null && typeof v === 'object') {
				replaceDefaultValues(v);
			}
		}
	}

	/** @param {App.RA.RuleSetters} set */
	function settersSchemeCleanup(set) {
		/**
		 * Moves properties of the given object, whose names start with prefix to the suboject newProp
		 * @param {object} obj
		 * @param {string} prefix
		 * @param {string} newProp
		 */
		function moveProperties(obj, prefix, newProp) {
			if (!obj.hasOwnProperty(newProp)) {
				obj[newProp] = {};
			}
			let dest = obj[newProp];
			for (const p of Object.keys(obj)) {
				if (p.startsWith(prefix)) {
					dest[p.slice(prefix.length)] = obj[p];
					delete obj[p];
				}
			}
		}

		moveProperties(set, 'growth_', 'growth');
		moveProperties(set, 'surgery_', 'surgery');
	}

	/**
	 * @param {App.RA.RuleSetters} set
	 */
	function correctStringValues(set) {
		for (const [k, v] of Object.entries(set)) {
			if (typeof v !== 'string') {
				continue;
			}
			if (["XX", "XY", "XXY"].includes(v)) {
				continue;
			}
			if (v === "null") {
				set[k] = null;
			}
			if (k === 'assignment' || k === 'clothes' || k === 'label' || k === 'removeLabel' ) {
				continue;
			}
			if (v[0] === undefined) {
				continue;
			}
			if (v[0].toLowerCase() !== v[0]) {
				set[k] = v.charAt(0).toLowerCase() + v.substr(1);
			}
		}
	}

	/**
	 * @param {App.RA.RuleSetters} set
	 */
	function migrateReleaseRules(set) {
		if (typeof set.releaseRules === 'string') {
			let newRule = {};
			switch (set.releaseRules) {
				case "chastity":
					newRule.masturbation = 0;
					newRule.partner = 0;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 0;
					break;
				case "restrictive":
					newRule.masturbation = 0;
					newRule.partner = 1;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 1;
					break;
				case "masturbation":
					newRule.masturbation = 1;
					newRule.partner = 0;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 1;
					break;
				case "sapphic":
					newRule.masturbation = 0;
					newRule.partner = 1;
					newRule.family = 1;
					newRule.slaves = 1;
					newRule.master = 1;
					break;
				case "permissive":
					newRule.masturbation = 1;
					newRule.partner = 1;
					newRule.family = 1;
					newRule.slaves = 1;
					newRule.master = 1;
					break;
			}
			set.releaseRules = newRule;
		}
	}

	/** @param {App.RA.RuleSetters} set */
	function cleanupSetters(set) {
		settersSchemeCleanup(set);
		migrateReleaseRules(set);
		replaceDefaultValues(set);

		function transformValues(obj, props, cb) {
			props.forEach(p => {
				let v = obj[p];
				if (v !== null) {
					obj[p] = cb(v);
				}
			});
		}

		function ensureNumTarget(val) {
			switch (typeof val) {
				case 'number':
					return Number.isNaN(val) ? null : App.RA.makeTarget('==', val);
				case 'string':
					return App.RA.makeTarget('==', parseInt(val));
				case 'object':
					if (val.hasOwnProperty('val') && (val.val === null || Number.isNaN(val.val))) {
						return null;
					}
					return val;
				default:
					return val;
			}
		}

		if (!([true, false, null].includes(set.preg))) {
			set.preg = (set.preg === -1);
		}

		if (set.pornFameSpending === undefined || set.pornFameSpending === -1) {
			set.pornFameSpending = null;
		}

		transformValues(set.growth,
			['boobs', 'butt', 'lips', 'dick', 'balls'],
			ensureNumTarget
		);

		transformValues(set, ['muscles'], ensureNumTarget);
		transformValues(set.surgery, ['butt', 'boobs', 'lips'], ensureNumTarget);

		set.growth.intensity = Math.clamp(+set.growth.intensity, 0, 1) || 0;

		correctStringValues(set);

		// moving numeric diets to the 'weight' attribute
		if (typeof set.diet === 'number') {
			set.weight = App.RA.makeRange(set.diet, set.diet);
			set.diet = null;
		} else {
			set.weight = null;
		}

		// Fix particular rules where a setting might no longer be valid
		if (set.drug === "none") {
			set.drug = "no drugs";
		}
		if (set.brandDesign === "") {
			set.brandDesign = null;
		}
		if (set.label === "") {
			set.label = null;
		}
		if (set.removeLabel === "") {
			set.removeLabel = null;
		}
		if (typeof (set.abortion) === "string") {
			set.abortion = [set.abortion];
		}
	}
}();

App.Entity.Utils.validateRules = function() {
	/** @type {App.RA.Rule[]} */
	const rules = State.variables.defaultRules;

	function testObject(o, path) {
		for (const p in o) {
			const v = o[p];
			if (v === undefined) {
				throw `Property ${path}.${p} is undefined`;
			}
			if (v !== null && typeof v === 'object') {
				testObject(v, `${path}.${p}`);
			}
		}
	}

	/** @type {App.RA.Rule} */
	for (const rule of rules) {
		try {
			testObject(rule.set, "set");
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(`Error in rule ${rule.name}: ${e}`);
		}
	}
};

/** @param {object} subject */
App.Entity.Utils.migratePronouns = function(subject) {
	if (subject.pronoun === undefined || typeof subject.pronoun === 'number') {
		return;
	}

	switch (subject.pronoun) {
		case "she":
			subject.pronoun = App.Data.Pronouns.Kind.female;
			break;
		case "he":
			subject.pronoun = App.Data.Pronouns.Kind.male;
			break;
		case "it":
			subject.pronoun = App.Data.Pronouns.Kind.neutral;
			break;
		default:
			throw `Unrecognized custom pronoun "${subject.pronoun}"`;
	}

	/* eslint-disable dot-notation */
	delete subject["possessive"];
	delete subject["possessivePronoun"];
	delete subject["possessivePronoun"];
	delete subject["objectReflexive"];
	delete subject["object"];
	delete subject["noun"];
	/* eslint-enable dot-notation */
};

App.Update.FScheatDatatypeCleanup = function() {
	if (V.arcologies[0].FSSupremacist !== "unset") {
		V.arcologies[0].FSSupremacist = Number(V.arcologies[0].FSSupremacist) || "unset";
		V.arcologies[0].FSSupremacistDecoration = Number(V.arcologies[0].FSSupremacistDecoration) || 0;
		V.arcologies[0].FSSupremacistLawME = Number(V.arcologies[0].FSSupremacistLawME) || 0;
	}
	if (V.arcologies[0].FSSubjugationist !== "unset") {
		V.arcologies[0].FSSubjugationist = Number(V.arcologies[0].FSSubjugationist) || "unset";
		V.arcologies[0].FSSubjugationistDecoration = Number(V.arcologies[0].FSSubjugationistDecoration) || 0;
		V.arcologies[0].FSSubjugationistLawME = Number(V.arcologies[0].FSSubjugationistLawME) || 0;
	}
	if (V.arcologies[0].FSGenderRadicalist !== "unset") {
		V.arcologies[0].FSGenderRadicalist = Number(V.arcologies[0].FSGenderRadicalist) || "unset";
		V.arcologies[0].FSGenderRadicalistDecoration = Number(V.arcologies[0].FSGenderRadicalistDecoration) || 0;
		V.arcologies[0].FSGenderRadicalistLawBeauty = Number(V.arcologies[0].FSGenderRadicalistLawBeauty) || 0;
		V.arcologies[0].FSGenderRadicalistLawFuta = Number(V.arcologies[0].FSGenderRadicalistLawFuta) || 0;
	}
	if (V.arcologies[0].FSRepopulationFocus !== "unset") {
		V.arcologies[0].FSRepopulationFocus = Number(V.arcologies[0].FSRepopulationFocus) || "unset";
		V.arcologies[0].FSRepopulationFocusDecoration = Number(V.arcologies[0].FSRepopulationFocusDecoration) || 0;
		V.arcologies[0].FSRepopulationFocusSMR = Number(V.arcologies[0].FSRepopulationFocusSMR) || 0;
		V.arcologies[0].FSRepopulationFocusLaw = Number(V.arcologies[0].FSRepopulationFocusLaw) || 0;
	}
	if (V.arcologies[0].FSRestart !== "unset") {
		V.arcologies[0].FSRestart = Number(V.arcologies[0].FSRestart) || "unset";
		V.arcologies[0].FSRestartDecoration = Number(V.arcologies[0].FSRestartDecoration) || 0;
		V.arcologies[0].FSRestartSMR = Number(V.arcologies[0].FSRestartSMR) || 0;
		V.arcologies[0].FSRestartLaw = Number(V.arcologies[0].FSRestartLaw) || 0;
	}
	if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
		V.arcologies[0].FSHedonisticDecadence = Number(V.arcologies[0].FSHedonisticDecadence) || "unset";
		V.arcologies[0].FSHedonisticDecadenceDecoration = Number(V.arcologies[0].FSHedonisticDecadenceDecoration) || 0;
		V.arcologies[0].FSHedonisticDecadenceSMR = Number(V.arcologies[0].FSHedonisticDecadenceSMR) || 0;
		V.arcologies[0].FSHedonisticDecadenceLaw = Number(V.arcologies[0].FSHedonisticDecadenceLaw) || 0;
		V.arcologies[0].FSHedonisticDecadenceLaw2 = Number(V.arcologies[0].FSHedonisticDecadenceLaw2) || 0;
		V.arcologies[0].FSHedonisticDecadenceStrongFat = Number(V.arcologies[0].FSHedonisticDecadenceStrongFat) || 0;
	}
	if (V.arcologies[0].FSIntellectualDependency !== "unset") {
		V.arcologies[0].FSIntellectualDependency = Number(V.arcologies[0].FSIntellectualDependency) || "unset";
		V.arcologies[0].FSIntellectualDependencyDecoration = Number(V.arcologies[0].FSIntellectualDependencyDecoration) || 0;
		V.arcologies[0].FSIntellectualDependencySMR = Number(V.arcologies[0].FSIntellectualDependencySMR) || 0;
		V.arcologies[0].FSIntellectualDependencyLaw = Number(V.arcologies[0].FSIntellectualDependencyLaw) || 0;
		V.arcologies[0].FSIntellectualDependencyLawBeauty = Number(V.arcologies[0].FSIntellectualDependencyLawBeauty) || 0;
	}
	if (V.arcologies[0].FSSlaveProfessionalism !== "unset") {
		V.arcologies[0].FSSlaveProfessionalism = Number(V.arcologies[0].FSSlaveProfessionalism) || "unset";
		V.arcologies[0].FSSlaveProfessionalismDecoration = Number(V.arcologies[0].FSSlaveProfessionalismDecoration) || 0;
		V.arcologies[0].FSSlaveProfessionalismSMR = Number(V.arcologies[0].FSSlaveProfessionalismSMR) || 0;
		V.arcologies[0].FSSlaveProfessionalismLaw = Number(V.arcologies[0].FSSlaveProfessionalismLaw) || 0;
	}
	if (V.arcologies[0].FSPetiteAdmiration !== "unset") {
		V.arcologies[0].FSPetiteAdmiration = Number(V.arcologies[0].FSPetiteAdmiration) || "unset";
		V.arcologies[0].FSPetiteAdmirationDecoration = Number(V.arcologies[0].FSPetiteAdmirationDecoration) || 0;
		V.arcologies[0].FSPetiteAdmirationSMR = Number(V.arcologies[0].FSPetiteAdmirationSMR) || 0;
		V.arcologies[0].FSPetiteAdmirationLaw = Number(V.arcologies[0].FSPetiteAdmirationLaw) || 0;
		V.arcologies[0].FSPetiteAdmirationLaw2 = Number(V.arcologies[0].FSPetiteAdmirationLaw2) || 0;
	}
	if (V.arcologies[0].FSStatuesqueGlorification !== "unset") {
		V.arcologies[0].FSStatuesqueGlorification = Number(V.arcologies[0].FSStatuesqueGlorification) || "unset";
		V.arcologies[0].FSStatuesqueGlorificationDecoration = Number(V.arcologies[0].FSStatuesqueGlorificationDecoration) || 0;
		V.arcologies[0].FSStatuesqueGlorificationSMR = Number(V.arcologies[0].FSStatuesqueGlorificationSMR) || 0;
		V.arcologies[0].FSStatuesqueGlorificationLaw = Number(V.arcologies[0].FSStatuesqueGlorificationLaw) || 0;
		V.arcologies[0].FSStatuesqueGlorificationLaw2 = Number(V.arcologies[0].FSStatuesqueGlorificationLaw2) || 0;
	}
	if (V.arcologies[0].FSGenderFundamentalist !== "unset") {
		V.arcologies[0].FSGenderFundamentalist = Number(V.arcologies[0].FSGenderFundamentalist) || "unset";
		V.arcologies[0].FSGenderFundamentalistDecoration = Number(V.arcologies[0].FSGenderFundamentalistDecoration) || 0;
		V.arcologies[0].FSGenderFundamentalistLawBeauty = Number(V.arcologies[0].FSGenderFundamentalistLawBeauty) || 0;
		V.arcologies[0].FSGenderFundamentalistLawBimbo = Number(V.arcologies[0].FSGenderFundamentalistLawBimbo) || 0;
		V.arcologies[0].FSGenderFundamentalistSMR = Number(V.arcologies[0].FSGenderFundamentalistSMR) || 0;
	}
	if (V.arcologies[0].FSPaternalist !== "unset") {
		V.arcologies[0].FSPaternalist = Number(V.arcologies[0].FSPaternalist) || "unset";
		V.arcologies[0].FSPaternalistDecoration = Number(V.arcologies[0].FSPaternalistDecoration) || 0;
		V.arcologies[0].FSPaternalistLaw = Number(V.arcologies[0].FSPaternalistLaw) || 0;
	}
	if (V.arcologies[0].FSDegradationist !== "unset") {
		V.arcologies[0].FSDegradationist = Number(V.arcologies[0].FSDegradationist) || "unset";
		V.arcologies[0].FSDegradationistDecoration = Number(V.arcologies[0].FSDegradationistDecoration) || 0;
		V.arcologies[0].FSDegradationistLaw = Number(V.arcologies[0].FSDegradationistLaw) || 0;
	}
	if (V.arcologies[0].FSBodyPurist !== "unset") {
		V.arcologies[0].FSBodyPurist = Number(V.arcologies[0].FSBodyPurist) || "unset";
		V.arcologies[0].FSBodyPuristDecoration = Number(V.arcologies[0].FSBodyPuristDecoration) || 0;
		V.arcologies[0].FSBodyPuristLaw = Number(V.arcologies[0].FSBodyPuristLaw) || 0;
	}
	if (V.arcologies[0].FSTransformationFetishist !== "unset") {
		V.arcologies[0].FSTransformationFetishist = Number(V.arcologies[0].FSTransformationFetishist) || "unset";
		V.arcologies[0].FSTransformationFetishistDecoration = Number(V.arcologies[0].FSTransformationFetishistDecoration) || 0;
		V.arcologies[0].FSTransformationFetishistSMR = Number(V.arcologies[0].FSTransformationFetishistSMR) || 0;
	}
	if (V.arcologies[0].FSYouthPreferentialist !== "unset") {
		V.arcologies[0].FSYouthPreferentialist = Number(V.arcologies[0].FSYouthPreferentialist) || "unset";
		V.arcologies[0].FSYouthPreferentialistDecoration = Number(V.arcologies[0].FSYouthPreferentialistDecoration) || 0;
		V.arcologies[0].FSYouthPreferentialistLaw = Number(V.arcologies[0].FSYouthPreferentialistLaw) || 0;
	}
	if (V.arcologies[0].FSMaturityPreferentialist !== "unset") {
		V.arcologies[0].FSMaturityPreferentialist = Number(V.arcologies[0].FSMaturityPreferentialist) || "unset";
		V.arcologies[0].FSMaturityPreferentialistDecoration = Number(V.arcologies[0].FSMaturityPreferentialistDecoration) || 0;
		V.arcologies[0].FSMaturityPreferentialistLaw = Number(V.arcologies[0].FSMaturityPreferentialistLaw) || 0;
	}
	if (V.arcologies[0].FSSlimnessEnthusiast !== "unset") {
		V.arcologies[0].FSSlimnessEnthusiast = Number(V.arcologies[0].FSSlimnessEnthusiast) || "unset";
		V.arcologies[0].FSSlimnessEnthusiastDecoration = Number(V.arcologies[0].FSSlimnessEnthusiastDecoration) || 0;
		V.arcologies[0].FSSlimnessEnthusiastSMR = Number(V.arcologies[0].FSSlimnessEnthusiastSMR) || 0;
		V.arcologies[0].FSSlimnessEnthusiastLaw = Number(V.arcologies[0].FSSlimnessEnthusiastLaw) || 0;
	}
	if (V.arcologies[0].FSAssetExpansionist !== "unset") {
		V.arcologies[0].FSAssetExpansionist = Number(V.arcologies[0].FSAssetExpansionist) || "unset";
		V.arcologies[0].FSAssetExpansionistDecoration = Number(V.arcologies[0].FSAssetExpansionistDecoration) || 0;
		V.arcologies[0].FSAssetExpansionistSMR = Number(V.arcologies[0].FSAssetExpansionistSMR) || 0;
	}
	if (V.arcologies[0].FSPastoralist !== "unset") {
		V.arcologies[0].FSPastoralist = Number(V.arcologies[0].FSPastoralist) || "unset";
		V.arcologies[0].FSPastoralistDecoration = Number(V.arcologies[0].FSPastoralistDecoration) || 0;
		V.arcologies[0].FSPastoralistLaw = Number(V.arcologies[0].FSPastoralistLaw) || 0;
	}
	if (V.arcologies[0].FSPhysicalIdealist !== "unset") {
		V.arcologies[0].FSPhysicalIdealist = Number(V.arcologies[0].FSPhysicalIdealist) || "unset";
		V.arcologies[0].FSPhysicalIdealistDecoration = Number(V.arcologies[0].FSPhysicalIdealistDecoration) || 0;
		V.arcologies[0].FSPhysicalIdealistLaw = Number(V.arcologies[0].FSPhysicalIdealistLaw) || 0;
		V.arcologies[0].FSPhysicalIdealistSMR = Number(V.arcologies[0].FSPhysicalIdealistSMR) || 0;
		V.arcologies[0].FSPhysicalIdealistStrongFat = Number(V.arcologies[0].FSPhysicalIdealistStrongFat) || 0;
	}
	if (V.arcologies[0].FSChattelReligionist !== "unset") {
		V.arcologies[0].FSChattelReligionist = Number(V.arcologies[0].FSChattelReligionist) || "unset";
		V.arcologies[0].FSChattelReligionistDecoration = Number(V.arcologies[0].FSChattelReligionistDecoration) || 0;
		V.arcologies[0].FSChattelReligionistLaw = Number(V.arcologies[0].FSChattelReligionistLaw) || 0;
		V.arcologies[0].FSChattelReligionistCreed = Number(V.arcologies[0].FSChattelReligionistCreed) || 0;
	}
	if (V.arcologies[0].FSEdoRevivalist !== "unset") {
		V.arcologies[0].FSEdoRevivalist = Number(V.arcologies[0].FSEdoRevivalist) || "unset";
		V.arcologies[0].FSEdoRevivalistDecoration = Number(V.arcologies[0].FSEdoRevivalistDecoration) || 0;
		V.arcologies[0].FSEdoRevivalistLaw = Number(V.arcologies[0].FSEdoRevivalistLaw) || 0;
	}
	if (V.arcologies[0].FSRomanRevivalist !== "unset") {
		V.arcologies[0].FSRomanRevivalist = Number(V.arcologies[0].FSRomanRevivalist) || "unset";
		V.arcologies[0].FSRomanRevivalistDecoration = Number(V.arcologies[0].FSRomanRevivalistDecoration) || 0;
		V.arcologies[0].FSRomanRevivalistLaw = Number(V.arcologies[0].FSRomanRevivalistLaw) || 0;
	}
	if (V.arcologies[0].FSAztecRevivalist !== "unset") {
		V.arcologies[0].FSAztecRevivalist = Number(V.arcologies[0].FSAztecRevivalist) || "unset";
		V.arcologies[0].FSAztecRevivalistDecoration = Number(V.arcologies[0].FSAztecRevivalistDecoration) || 0;
		V.arcologies[0].FSAztecRevivalistLaw = Number(V.arcologies[0].FSAztecRevivalistLaw) || 0;
	}
	if (V.arcologies[0].FSEgyptianRevivalist !== "unset") {
		V.arcologies[0].FSEgyptianRevivalist = Number(V.arcologies[0].FSEgyptianRevivalist) || "unset";
		V.arcologies[0].FSEgyptianRevivalistDecoration = Number(V.arcologies[0].FSEgyptianRevivalistDecoration) || 0;
		V.arcologies[0].FSEgyptianRevivalistLaw = Number(V.arcologies[0].FSEgyptianRevivalistLaw) || 0;
	}
	if (V.arcologies[0].FSEdoRevivalist !== "unset") {
		V.arcologies[0].FSEdoRevivalist = Number(V.arcologies[0].FSEdoRevivalist) || "unset";
		V.arcologies[0].FSEdoRevivalistDecoration = Number(V.arcologies[0].FSEdoRevivalistDecoration) || 0;
		V.arcologies[0].FSEdoRevivalistLaw = Number(V.arcologies[0].FSEdoRevivalistLaw) || 0;
	}
	if (V.arcologies[0].FSArabianRevivalist !== "unset") {
		V.arcologies[0].FSArabianRevivalist = Number(V.arcologies[0].FSArabianRevivalist) || "unset";
		V.arcologies[0].FSArabianRevivalistDecoration = Number(V.arcologies[0].FSArabianRevivalistDecoration) || 0;
		V.arcologies[0].FSArabianRevivalistLaw = Number(V.arcologies[0].FSArabianRevivalistLaw) || 0;
	}
	if (V.arcologies[0].FSChineseRevivalist !== "unset") {
		V.arcologies[0].FSChineseRevivalist = Number(V.arcologies[0].FSChineseRevivalist) || "unset";
		V.arcologies[0].FSChineseRevivalistDecoration = Number(V.arcologies[0].FSChineseRevivalistDecoration) || 0;
		V.arcologies[0].FSChineseRevivalistLaw = Number(V.arcologies[0].FSChineseRevivalistLaw) || 0;
	}
	for (let _fscdc = 0; _fscdc < setup.FutureSocieties.length; _fscdc++) {
		if (!(V.arcologies[0][setup.FutureSocieties[_fscdc]] > 0)) {
			FutureSocieties.remove(setup.FutureSocieties[_fscdc]);
		}
	}
};

App.Update.neighborArcologyCheatDatatypeCleanup = function() {
	let _l = V.arcologies.length;
	for (let _i = 1; _i < _l; _i++) {
		V.arcologies[_i].honeymoon = Number(V.arcologies[_i].honeymoon) || 0;
		V.arcologies[_i].prosperity = Number(V.arcologies[_i].prosperity) || 0;
		V.arcologies[_i].ownership = Number(V.arcologies[_i].ownership) || 0;
		V.arcologies[_i].minority = Number(V.arcologies[_i].minority) || 0;
		V.arcologies[_i].PCminority = Number(V.arcologies[_i].PCminority) || 0;
		V.arcologies[_i].demandFactor = Number(V.arcologies[_i].demandFactor) || 0;
		if (V.arcologies[_i].FSSupremacist !== "unset") {
			V.arcologies[_i].FSSupremacist = Number(V.arcologies[_i].FSSupremacist) || "unset";
		}
		if (V.arcologies[_i].FSSupremacist !== "unset" && !setup.filterRacesLowercase.includes(V.arcologies[_i].FSSupremacistRace)) {
			V.arcologies[_i].FSSupremacistRace = setup.filterRacesLowercase.random();
		}
		if (V.arcologies[_i].FSSubjugationist !== "unset") {
			V.arcologies[_i].FSSubjugationist = Number(V.arcologies[_i].FSSubjugationist) || "unset";
		}
		if (V.arcologies[_i].FSSubjugationist !== "unset" && !setup.filterRacesLowercase.includes(V.arcologies[_i].FSSubjugationistRace)) {
			V.arcologies[_i].FSSubjugationistRace = setup.filterRacesLowercase.random();
		}
		if (V.arcologies[_i].FSGenderRadicalist !== "unset") {
			V.arcologies[_i].FSGenderRadicalist = Number(V.arcologies[_i].FSGenderRadicalist) || "unset";
			V.arcologies[_i].FSGenderFundamentalist = "unset";
		}
		if (V.arcologies[_i].FSGenderFundamentalist !== "unset") {
			V.arcologies[_i].FSGenderFundamentalist = Number(V.arcologies[_i].FSGenderFundamentalist) || "unset";
			V.arcologies[_i].FSGenderRadicalist = "unset";
		}
		if (V.arcologies[_i].FSPaternalist !== "unset") {
			V.arcologies[_i].FSPaternalist = Number(V.arcologies[_i].FSPaternalist) || "unset";
			V.arcologies[_i].FSDegradationist = "unset";
		}
		if (V.arcologies[_i].FSDegradationist !== "unset") {
			V.arcologies[_i].FSDegradationist = Number(V.arcologies[_i].FSDegradationist) || "unset";
			V.arcologies[_i].FSPaternalist = "unset";
		}
		if (V.arcologies[_i].FSBodyPurist !== "unset") {
			V.arcologies[_i].FSBodyPurist = Number(V.arcologies[_i].FSBodyPurist) || "unset";
			V.arcologies[_i].FSTransformationFetishist = "unset";
		}
		if (V.arcologies[_i].FSTransformationFetishist !== "unset") {
			V.arcologies[_i].FSTransformationFetishist = Number(V.arcologies[_i].FSTransformationFetishist) || "unset";
			V.arcologies[_i].FSBodyPurist = "unset";
		}
		if (V.arcologies[_i].FSYouthPreferentialist !== "unset") {
			V.arcologies[_i].FSYouthPreferentialist = Number(V.arcologies[_i].FSYouthPreferentialist) || "unset";
			V.arcologies[_i].FSMaturityPreferentialist = "unset";
		}
		if (V.arcologies[_i].FSMaturityPreferentialist !== "unset") {
			V.arcologies[_i].FSMaturityPreferentialist = Number(V.arcologies[_i].FSMaturityPreferentialist) || "unset";
			V.arcologies[_i].FSYouthPreferentialist = "unset";
		}
		if (V.arcologies[_i].FSSlimnessEnthusiast !== "unset") {
			V.arcologies[_i].FSSlimnessEnthusiast = Number(V.arcologies[_i].FSSlimnessEnthusiast) || "unset";
			V.arcologies[_i].FSAssetExpansionist = "unset";
		}
		if (V.arcologies[_i].FSAssetExpansionist !== "unset") {
			V.arcologies[_i].FSAssetExpansionist = Number(V.arcologies[_i].FSAssetExpansionist) || "unset";
			V.arcologies[_i].FSSlimnessEnthusiast = "unset";
		}
		if (V.arcologies[_i].FSPastoralist !== "unset") {
			V.arcologies[_i].FSPastoralist = Number(V.arcologies[_i].FSPastoralist) || "unset";
		}
		if (V.arcologies[_i].FSPhysicalIdealist !== "unset") {
			V.arcologies[_i].FSPhysicalIdealist = Number(V.arcologies[_i].FSPhysicalIdealist) || "unset";
			V.arcologies[_i].FSHedonisticDecadence = "unset";
		}
		if (V.arcologies[_i].FSHedonisticDecadence !== "unset") {
			V.arcologies[_i].FSHedonisticDecadence = Number(V.arcologies[_i].FSHedonisticDecadence) || "unset";
			V.arcologies[_i].FSPhysicalIdealist = "unset";
		}
		if (V.arcologies[_i].FSChattelReligionist !== "unset") {
			V.arcologies[_i].FSChattelReligionist = Number(V.arcologies[_i].FSChattelReligionist) || "unset";
		}
		if (V.arcologies[_i].FSRomanRevivalist !== "unset") {
			V.arcologies[_i].FSRomanRevivalist = Number(V.arcologies[_i].FSRomanRevivalist) || "unset";
			V.arcologies[_i].FSArabianRevivalist = V.arcologies[_i].FSAztecRevivalist = V.arcologies[_i].FSChineseRevivalist = V.arcologies[_i].FSEdoRevivalist = V.arcologies[_i].FSEgyptianRevivalist = "unset";
		}
		if (V.arcologies[_i].FSAztecRevivalist !== "unset") {
			V.arcologies[_i].FSAztecRevivalist = Number(V.arcologies[_i].FSAztecRevivalist) || "unset";
			V.arcologies[_i].FSArabianRevivalist = V.arcologies[_i].FSChineseRevivalist = V.arcologies[_i].FSEdoRevivalist = V.arcologies[_i].FSEgyptianRevivalist = V.arcologies[_i].FSRomanRevivalist = "unset";
		}
		if (V.arcologies[_i].FSEgyptianRevivalist !== "unset") {
			V.arcologies[_i].FSEgyptianRevivalist = Number(V.arcologies[_i].FSEgyptianRevivalist) || "unset";
			V.arcologies[_i].FSArabianRevivalist = V.arcologies[_i].FSAztecRevivalist = V.arcologies[_i].FSChineseRevivalist = V.arcologies[_i].FSEdoRevivalist = V.arcologies[_i].FSRomanRevivalist = "unset";
		}
		if (V.arcologies[_i].FSEdoRevivalist !== "unset") {
			V.arcologies[_i].FSEdoRevivalist = Number(V.arcologies[_i].FSEdoRevivalist) || "unset";
			V.arcologies[_i].FSArabianRevivalist = V.arcologies[_i].FSAztecRevivalist = V.arcologies[_i].FSChineseRevivalist = V.arcologies[_i].FSEgyptianRevivalist = V.arcologies[_i].FSRomanRevivalist = "unset";
		}
		if (V.arcologies[_i].FSArabianRevivalist !== "unset") {
			V.arcologies[_i].FSArabianRevivalist = Number(V.arcologies[_i].FSArabianRevivalist) || "unset";
			V.arcologies[_i].FSAztecRevivalist = V.arcologies[_i].FSChineseRevivalist = V.arcologies[_i].FSEdoRevivalist = V.arcologies[_i].FSEgyptianRevivalist = V.arcologies[_i].FSRomanRevivalist = "unset";
		}
		if (V.arcologies[_i].FSChineseRevivalist !== "unset") {
			V.arcologies[_i].FSChineseRevivalist = Number(V.arcologies[_i].FSChineseRevivalist) || "unset";
			V.arcologies[_i].FSArabianRevivalist = V.arcologies[_i].FSAztecRevivalist = V.arcologies[_i].FSEdoRevivalist = V.arcologies[_i].FSEgyptianRevivalist = V.arcologies[_i].FSRomanRevivalist = "unset";
		}
		if (V.arcologies[_i].FSNull !== "unset") {
			V.arcologies[_i].FSNull = Number(V.arcologies[_i].FSNull) || "unset";
		}
		if (V.arcologies[_i].FSRepopulationFocus !== "unset") {
			V.arcologies[_i].FSRepopulationFocus = Number(V.arcologies[_i].FSRepopulationFocus) || "unset";
			V.arcologies[_i].FSRestart = "unset";
		}
		if (V.arcologies[_i].FSRestart !== "unset") {
			V.arcologies[_i].FSRestart = Number(V.arcologies[_i].FSRestart) || "unset";
			V.arcologies[_i].FSRepopulationFocus = "unset";
		}
		if (V.arcologies[_i].FSIntellectualDependency !== "unset") {
			V.arcologies[_i].FSIntellectualDependency = Number(V.arcologies[_i].FSIntellectualDependency) || "unset";
			V.arcologies[_i].FSSlaveProfessionalism = "unset";
		}
		if (V.arcologies[_i].FSSlaveProfessionalism !== "unset") {
			V.arcologies[_i].FSSlaveProfessionalism = Number(V.arcologies[_i].FSSlaveProfessionalism) || "unset";
			V.arcologies[_i].FSIntellectualDependency = "unset";
		}
		if (V.arcologies[_i].FSPetiteAdmiration !== "unset") {
			V.arcologies[_i].FSPetiteAdmiration = Number(V.arcologies[_i].FSPetiteAdmiration) || "unset";
			V.arcologies[_i].FSStatuesqueGlorification = "unset";
		}
		if (V.arcologies[_i].FSStatuesqueGlorification !== "unset") {
			V.arcologies[_i].FSStatuesqueGlorification = Number(V.arcologies[_i].FSStatuesqueGlorification) || "unset";
			V.arcologies[_i].FSPetiteAdmiration = "unset";
		}
		if (V.arcologies[_i].FSCummunism !== "unset") {
			V.arcologies[_i].FSCummunism = Number(V.arcologies[_i].FSCummunism) || "unset";
		}
		if (V.arcologies[_i].FSIncestFetishist !== "unset") {
			V.arcologies[_i].FSIncestFetishist = Number(V.arcologies[_i].FSIncestFetishist) || "unset";
		}
		V.arcologies[_i].embargo = Number(V.arcologies[_i].embargo) || 0;
		V.arcologies[_i].embargoTarget = Number(V.arcologies[_i].embargoTarget) || 0;
		V.arcologies[_i].CyberEconomic = Number(V.arcologies[_i].CyberEconomic) || 0;
		V.arcologies[_i].CyberEconomicTarget = Number(V.arcologies[_i].CyberEconomicTarget) || 0;
		V.arcologies[_i].CyberReputation = Number(V.arcologies[_i].CyberReputation) || 0;
		V.arcologies[_i].CyberReputationTarget = Number(V.arcologies[_i].CyberReputationTarget) || 0;
		V.arcologies[_i].influenceTarget = Number(V.arcologies[_i].influenceTarget) || 0;
		V.arcologies[_i].influenceBonus = Number(V.arcologies[_i].influenceBonus) || 0;
		V.arcologies[_i].rival = Number(V.arcologies[_i].rival) || 0;
	}
};
