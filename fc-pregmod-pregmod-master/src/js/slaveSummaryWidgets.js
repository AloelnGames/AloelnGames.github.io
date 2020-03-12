/* eslint-disable camelcase */

window.SlaveSummary = (function() {
	/** @type {DocumentFragment} */
	let res;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment} */
	function SlaveSummary(slave) {
		res = document.createDocumentFragment();
		let para = makeParagraph(res);

		if (V.abbreviateDevotion === 1) {
			short_devotion(slave, para);
		} else if (V.abbreviateDevotion === 2) {
			long_devotion(slave, para);
		}
		if (slave.fuckdoll === 0) {
			if (V.abbreviateRules === 1) {
				short_rules(slave, para);
			} else if (V.abbreviateRules === 2) {
				long_rules(slave, para);
			}
		}
		if (V.abbreviateDiet === 1) {
			short_weight(slave, para);
		} else if (V.abbreviateDiet === 2) {
			long_weight(slave, para);
		}
		if (V.abbreviateDiet === 1) {
			short_diet(slave, para);
		} else if (V.abbreviateDiet === 2) {
			long_diet(slave, para);
		}
		if (V.abbreviateHealth === 1) {
			short_health(slave, para);
			short_illness(slave, para);
			short_tired(slave, para);
		} else if (V.abbreviateHealth === 2) {
			long_health(slave, para);
			long_illness(slave, para);
			long_tired(slave, para);
		}
		if (V.abbreviateDrugs === 1) {
			short_drugs(slave, para);
		} else if (V.abbreviateDrugs === 2) {
			long_drugs(slave, para);
		}

		para = makeParagraph(res);
		para.classList.add("pink");

		makeSpan(para, `${capFirstChar(SlaveTitle(slave))}${V.abbreviatePhysicals === 2 ? '.' : ''}`, ["coral", "strong"]);
		if (V.seeRace === 1 && V.abbreviateRace !== 0) {
			makeSpan(para, V.abbreviateRace === 1 ? short_race(slave) : long_race(slave), "tan");
		}
		if (V.abbreviateNationality !== 0) {
			makeSpan(para, V.abbreviateNationality === 1 ? short_nationality(slave) : long_nationality(slave), "tan");
		}
		makeSpan(para, V.abbreviatePhysicals === 1 ? short_skin(slave) : `${capFirstChar(slave.skin)} skin.`);
		if (V.abbreviateGenitalia === 1) {
			short_genitals(slave, para);
		} else if (V.abbreviateGenitalia === 2) {
			long_genitals(slave, para);
		}
		if (V.abbreviatePhysicals === 1) {
			short_age(slave, para);
			short_face(slave, para);
			short_eyes(slave, para);
			short_ears(slave, para);
			if (slave.markings !== "none") {
				makeSpan(para, "Markings");
			}
			short_lips(slave, para);
			short_teeth(slave, para);
			short_muscles(slave, para);
			addText(para, App.Desc.shortLimbs(slave));
			short_voice(slave, para);
			short_tits_ass(slave, para);
			short_hips(slave, para);
			short_waist(slave, para);
			short_implants(slave, para);
			short_lactation(slave, para);
			short_mods(slave, para);
		} else if (V.abbreviatePhysicals === 2) {
			long_age(slave, para);
			long_face(slave, para);
			long_eyes(slave, para);
			long_ears(slave, para);
			long_lips(slave, para);
			long_teeth(slave, para);
			long_muscles(slave, para);
			makeSpan(para, App.Desc.longLimbs(slave));
			long_voice(slave, para);
			long_tits_ass(slave, para);
			long_hips(slave, para);
			long_waist(slave, para);
			long_implants(slave, para);
			long_lactation(slave, para);
			long_mods(slave, para);
			if (!jQuery.isEmptyObject(slave.brand)) {
				makeSpan(para, `Branded.`);
			}
		}
		if (V.abbreviateHormoneBalance === 1) {
			if (slave.hormoneBalance <= -21) {
				makeSpan(para, "HB:M", ["deepskyblue", "strong"]);
			} else if (slave.hormoneBalance <= 20) {
				makeSpan(para, "HB:N", ["pink", "strong"]);
			} else if (slave.hormoneBalance <= 500) {
				makeSpan(para, "HB:F", ["pink", "strong"]);
			}
		} else if (V.abbreviateHormoneBalance === 2) {
			const colorClass = slave.hormoneBalance <= -21 ? "deepskyblue" : "pink";
			let desc = "";
			if (slave.hormoneBalance < -400) {
				desc = `Overwhelmingly masculine`;
			} else if (slave.hormoneBalance <= -300) {
				desc = `Extremely masculine`;
			} else if (slave.hormoneBalance <= -200) {
				desc = `Heavily masculine`;
			} else if (slave.hormoneBalance <= -100) {
				desc = `Very masculine`;
			} else if (slave.hormoneBalance <= -21) {
				desc = `Masculine`;
			} else if (slave.hormoneBalance <= 20) {
				desc = `Neutral`;
			} else if (slave.hormoneBalance <= 99) {
				desc = `Feminine`;
			} else if (slave.hormoneBalance <= 199) {
				desc = `Very feminine`;
			} else if (slave.hormoneBalance <= 299) {
				desc = `Heavily feminine`;
			} else if (slave.hormoneBalance <= 399) {
				desc = `Extremely feminine`;
			} else if (slave.hormoneBalance <= 500) {
				desc = `Overwhelmingly feminine`;
			}
			makeSpan(para, desc + " hormone balance.", colorClass);
		}

		para = makeParagraph(res);

		if (V.abbreviateSkills === 1) {
			short_intelligence(slave, para);
			short_skills(slave, para);
			short_prestige(slave, para);
			short_porn_prestige(slave, para);
		} else if (V.abbreviateSkills === 2) {
			long_intelligence(slave, para);
			long_skills(slave, para);
			long_prestige(slave, para);
			long_porn_prestige(slave, para);
		}
		if (V.abbreviateMental === 1) {
			if (slave.fetish !== "mindbroken") {
				if (slave.fetishKnown === 1) {
					short_fetish(slave, para);
				}
				if (slave.attrKnown === 1) {
					short_attraction(slave, para);
				}
			}
			if (slave.clitPiercing === 3) {
				short_smart_fetish(slave, para);
				short_smart_attraction(slave, para);
			}
			short_behavior_flaw(slave, para);
			short_sex_flaw(slave, para);
			short_behavior_quirk(slave, para);
			short_sex_quirk(slave, para);
		} else if (V.abbreviateMental === 2) {
			if (slave.fetish !== "mindbroken") {
				if (slave.fetishKnown === 1) {
					long_fetish(slave, para);
				}
				if (slave.attrKnown === 1) {
					long_attraction(slave, para);
				}
			}
			if (slave.clitPiercing === 3) {
				long_smart_fetish(slave, para);
				long_smart_attraction(slave, para);
			}
			long_behavior_flaw(slave, para);
			long_sex_flaw(slave, para);
			long_behavior_quirk(slave, para);
			long_sex_quirk(slave, para);
		}
		if (slave.custom.label) {
			makeSpan(res, `${capFirstChar(slave.custom.label)}.`, ["yellow", "strong"]);
		}
		if ((slave.relationship !== 0) || (slave.relation !== 0) || (V.abbreviateClothes === 2) || (V.abbreviateRulesets === 2)) {
			para = makeParagraph(res);
		}
		if (V.abbreviateMental === 1) {
			makeSpan(para, V.familyTesting === 1 ? short_extended_family(slave) : short_legacy_family(slave), "lightgreen");
			short_clone(slave, para);
			short_rival(slave, para);
		} else if (V.abbreviateMental === 2) {
			if (V.familyTesting === 1) {
				long_extended_family(slave, para);
			} else {
				long_legacy_family(slave, para);
			}
			long_clone(slave, para);
			long_rival(slave, para);
		}
		if (slave.fuckdoll === 0) {
			if (V.abbreviateClothes === 2) {
				const dressingBlock = makeBlock(para);
				if (slave.choosesOwnClothes === 1) {
					makeSpan(dressingBlock, `Dressing ${getPronouns(slave).himself}.`);
				}
				long_clothes(slave, dressingBlock);
				long_collar(slave, dressingBlock);
				long_belly(slave, dressingBlock);
				if (hasAnyArms(slave)) {
					long_arms(slave, dressingBlock);
				}
				if (hasAnyLegs(slave)) {
					long_legs(slave, dressingBlock);
					long_shoes(slave, dressingBlock);
				}
				long_chastity(slave, dressingBlock);
				long_vaginal_acc(slave, dressingBlock);
				long_dick_acc(slave, dressingBlock);
				long_buttplug(slave, dressingBlock);
			}
		}
		const RABlock = makeBlock(para);
		rules_assistant(slave, RABlock);
		if (V.abbreviateOrigins === 2 && slave.origin !== 0) {
			origins(slave, res);
		}
		return res;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 */
	function short_devotion(slave, c) {
		if (slave.fetish === "mindbroken") {
			makeSpan(c, "MB", "mindbroken");
		} else if (slave.devotion < -95) {
			makeSpan(c, "Hate", ["devotion", "hateful"], true, slave.devotion);
		} else if (slave.devotion < -50) {
			makeSpan(c, "Hate", ["devotion", "hateful"], true, slave.devotion);
		} else if (slave.devotion < -20) {
			makeSpan(c, "Res", ["devotion", "resistant"], true, slave.devotion);
		} else if (slave.devotion <= 20) {
			makeSpan(c, "Ambiv", ["devotion", "ambivalent"], true, slave.devotion);
		} else if (slave.devotion <= 50) {
			makeSpan(c, "Accept", ["devotion", "accept"], true, slave.devotion);
		} else if (slave.devotion <= 95) {
			makeSpan(c, "Devo", ["devotion", "devoted"], true, slave.devotion);
		} else {
			makeSpan(c, "Wor", ["devotion", "worship"], true, slave.devotion);
		}
		if (slave.fetish === "mindbroken") {
			return;
		} else if (slave.trust < -95) {
			makeSpan(c, "ETerr", ["trust", "extremely-terrified"], true, slave.trust);
		} else if (slave.trust < -50) {
			makeSpan(c, "Terr", ["trust", "terrified"], true, slave.trust);
		} else if (slave.trust < -20) {
			makeSpan(c, "Fright", ["trust", "frightened"], true, slave.trust);
		} else if (slave.trust <= 20) {
			makeSpan(c, "Fear", ["trust", "fearful"], true, slave.trust);
		} else if (slave.trust <= 50) {
			if (slave.devotion < -20) {
				makeSpan(c, "Caref", ["defiant", "careful"], true, slave.trust);
			} else {
				makeSpan(c, "Caref", ["trust", "careful"], true, slave.trust);
			}
		} else if (slave.trust < 95) {
			if (slave.devotion < -20) {
				makeSpan(c, "Bold", ["defiant", "bold"], true, slave.trust);
			} else {
				makeSpan(c, "Trust", ["trust", "trusting"], true, slave.trust);
			}
		} else {
			if (slave.devotion < -20) {
				makeSpan(c, "Defiant", ["defiant", "full"], true, slave.trust);
			} else {
				makeSpan(c, "VTrust", ["trust", "prof-trusting"], true, slave.trust);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_devotion(slave, c) {
		if (slave.fetish === "mindbroken") {
			makeSpan(c, "Mindbroken.", "mindbroken");
		} else if (slave.devotion < -95) {
			makeSpan(c, "Very hateful", ["devotion", "hateful"], true, slave.devotion);
		} else if (slave.devotion < -50) {
			makeSpan(c, "Hateful", ["devotion", "hateful"], true, slave.devotion);
		} else if (slave.devotion < -20) {
			makeSpan(c, "Resistant", ["devotion", "resistant"], true, slave.devotion);
		} else if (slave.devotion <= 20) {
			makeSpan(c, "Ambivalent", ["devotion", "ambivalent"], true, slave.devotion);
		} else if (slave.devotion <= 50) {
			makeSpan(c, "Accepting", ["devotion", "accept"], true, slave.devotion);
		} else if (slave.devotion <= 95) {
			makeSpan(c, "Devoted", ["devotion", "devoted"], true, slave.devotion);
		} else {
			makeSpan(c, "Worshipful", ["devotion", "worship"], true, slave.devotion);
		}
		if (slave.fetish === "mindbroken") {
			return;
		} else if (slave.trust < -95) {
			makeSpan(c, "Extremely terrified", ["trust", "extremely-terrified"], true, slave.trust);
		} else if (slave.trust < -50) {
			makeSpan(c, "Terrified", ["trust", "terrified"], true, slave.trust);
		} else if (slave.trust < -20) {
			makeSpan(c, "Frightened", ["trust", "frightened"], true, slave.trust);
		} else if (slave.trust <= 20) {
			makeSpan(c, "Fearful", ["trust", "fearful"], true, slave.trust);
		} else if (slave.trust <= 50) {
			if (slave.devotion < -20) {
				makeSpan(c, "Careful", ["defiant", "careful"], true, slave.trust);
			} else {
				makeSpan(c, "Careful", ["trust", "careful"], true, slave.trust);
			}
		} else if (slave.trust <= 95) {
			if (slave.devotion < -20) {
				makeSpan(c, "Bold", ["defiant", "bold"], true, slave.trust);
			} else {
				makeSpan(c, "Trusting", ["trust", "trusting"], true, slave.trust);
			}
		} else {
			if (slave.devotion < -20) {
				makeSpan(c, "Defiant", ["defiant", "full"], true, slave.trust);
			} else {
				makeSpan(c, "Profoundly trusting", ["trust", "prof-trusting"], true, slave.trust);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_rules(slave, c) {
		const styles = "strong";
		switch (slave.rules.living) {
			case "luxurious":
				makeSpan(c, "LS:Lux", styles);
				break;
			case "normal":
				makeSpan(c, "LS:Nor", styles);
				break;
			default:
				makeSpan(c, "LS:Spa", styles);
				break;
		}
		if (canTalk(slave, false)) {
			switch (slave.rules.speech) {
				case "permissive":
					makeSpan(c, "SpR:P", styles);
					break;
				case "accent elimination":
					makeSpan(c, "SpR:NoAcc", styles);
					break;
				case "language lessons":
					makeSpan(c, "SpR:LL", styles);
					break;
				default:
					makeSpan(c, "SpR:R", styles);
					break;
			}
		}
		switch (slave.rules.relationship) {
			case "permissive":
				makeSpan(c, "ReR:P", styles);
				break;
			case "just friends":
				makeSpan(c, "ReR:Fr", styles);
				break;
			default:
				makeSpan(c, "ReR:R", styles);
				break;
		}
		switch (slave.rules.punishment) {
			case "confinement":
				makeSpan(c, "Pun:Conf", styles);
				break;
			case "whipping":
				makeSpan(c, "Pun:Whip", styles);
				break;
			case "chastity":
				makeSpan(c, "Pun:Chas", styles);
				break;
			default:
				makeSpan(c, "Pun:Situ", styles);
				break;
		}
		switch (slave.rules.reward) {
			case "relaxation":
				makeSpan(c, "Rew:Relx", styles);
				break;
			case "drugs":
				makeSpan(c, "Rew:Drug", styles);
				break;
			case "orgasm":
				makeSpan(c, "Rew:Orga", styles);
				break;
			default:
				makeSpan(c, "Rew:Situ", styles);
				break;
		}
		makeSpan(c, "MaR:" + App.Utils.releaseSummaryShort(slave), styles);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_rules(slave, c) {
		addText(c, `Living standard: ${slave.rules.living}. `);
		if (canTalk(slave, false)) {
			addText(c, `Speech rules: ${slave.rules.speech}. `);
		}
		addText(c, `Relationship rules: ${slave.rules.relationship}. `);
		addText(c, `Typical punishment: ${slave.rules.punishment}. `);
		addText(c, `Typical reward: ${slave.rules.reward}. `);
		addText(c, `Release rules: ${App.Utils.releaseSummaryLong(slave)}. `);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_weight(slave, c) {
		if (slave.weight < -95) {
			makeSpan(c, "W---", ["red", "strong"], true, slave.weight);
		} else if (slave.weight < -30) {
			if (slave.hips < -1) {
				makeSpan(c, "W--", "strong", true, slave.weight);
			} else {
				makeSpan(c, "W--", ["red", "strong>"], true, slave.weight);
			}
		} else if (slave.weight < -10) {
			makeSpan(c, "W-", "strong", true, slave.weight);
		} else if (slave.weight <= 10) {
			makeSpan(c, "W", "strong", true, slave.weight);
		} else if (slave.weight <= 30) {
			makeSpan(c, "W+", "strong", true, slave.weight);
		} else if (slave.weight <= 95) {
			if (slave.hips > 1 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "W++", "strong", true, slave.weight);
			} else {
				makeSpan(c, "W++", ["red", "strong"], true, slave.weight);
			}
		} else if (slave.weight <= 130) {
			if (slave.hips > 2 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "W+++", "strong", true, slave.weight);
			} else {
				makeSpan(c, "W+++", ["red", "strong"], true, slave.weight);
			}
		} else if (slave.weight <= 160) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "W++++", "strong", true, slave.weight);
			} else {
				makeSpan(c, "W++++", ["red", "strong"], true, slave.weight);
			}
		} else if (slave.weight <= 190) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "W+++++", "strong", true, slave.weight);
			} else {
				makeSpan(c, "W+++++", ["red", "strong"], true, slave.weight);
			}
		} else {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "W++++++", "strong", true, slave.weight);
			} else {
				makeSpan(c, "W++++++", ["red", "strong"], true, slave.weight);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_weight(slave, c) {
		if (slave.weight < -95) {
			makeSpan(c, "Emaciated", "red", true, slave.weight);
		} else if (slave.weight < -30) {
			if (slave.hips < -1) {
				makeSpan(c, "Model-thin", null, true, slave.weight);
			} else {
				makeSpan(c, "Very thin", "red", true, slave.weight);
			}
		} else if (slave.weight < -10) {
			makeSpan(c, "Thin", null, true, slave.weight);
		} else if (slave.weight <= 10) {
			makeSpan(c, "Trim", null, true, slave.weight);
		} else if (slave.weight <= 30) {
			makeSpan(c, "Plush", null, true, slave.weight);
		} else if (slave.weight <= 95) {
			if (slave.hips > 1 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "Nicely chubby", null, true, slave.weight);
			} else {
				makeSpan(c, "Overweight", "red", true, slave.weight);
			}
		} else if (slave.weight <= 130) {
			if (slave.hips > 2 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "Pleasantly soft and shapely", null, true, slave.weight);
			} else {
				makeSpan(c, "Fat", "red", true, slave.weight);
			}
		} else if (slave.weight <= 160) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "Amazingly voluptuous", null, true, slave.weight);
			} else {
				makeSpan(c, "Obese", "red", true, slave.weight);
			}
		} else if (slave.weight <= 190) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "SSBBW", null, true, slave.weight);
			} else {
				makeSpan(c, "Super Obese", "red", true, slave.weight);
			}
		} else {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				makeSpan(c, "Perfectly massive", null, true, slave.weight);
			} else {
				makeSpan(c, "Dangerously Obese", "red", true, slave.weight);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_diet(slave, c) {
		let diet = makeSpan(null, "", ["teal", "strong"]);
		switch (slave.diet) {
			case "restricted":
				diet.textContent = "Di:W-";
				break;
			case "fattening":
				diet.textContent = "Di:W+";
				break;
			case "corrective":
				diet.textContent = "Di:W=";
				break;
			case "XX":
				diet.textContent = "Di:XX+";
				break;
			case "XY":
				diet.textContent = "Di:XY+";
				break;
			case "XXY":
				diet.textContent = "Di:XXY+";
				break;
			case "muscle building":
				diet.textContent = "Di:M+";
				break;
			case "slimming":
				diet.textContent = "Di:M-";
				break;
			case "cum production":
				diet.textContent = "Di:C+";
				break;
			case "cleansing":
				diet.textContent = "Di:H+";
				break;
			case "fertility":
				diet.textContent = "Di:F+";
				break;
		}
		if (diet.textContent.length > 0) {
			c.appendChild(diet);
		}
		let specialDiet = makeSpan(null, "", ["cyan", "strong"]);
		if (slave.dietCum === 2) {
			specialDiet.textContent = "Cum++";
		} else if (((slave.dietCum === 1) && (slave.dietMilk === 0))) {
			specialDiet.textContent = "Cum+";
		} else if (((slave.dietCum === 1) && (slave.dietMilk === 1))) {
			specialDiet.textContent = "Cum+ Milk+";
		} else if (((slave.dietCum === 0) && (slave.dietMilk === 1))) {
			specialDiet.textContent = "Milk+";
		} else if ((slave.dietMilk === 2)) {
			specialDiet.textContent = ">Milk++";
		}
		if (specialDiet.textContent.length > 0) {
			c.appendChild(specialDiet);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_diet(slave, c) {
		let dietDesc = "";
		switch (slave.diet) {
			case "restricted":
				dietDesc = `Dieting.`;
				break;
			case "fattening":
				dietDesc = `Gaining weight.`;
				break;
			case "corrective":
				dietDesc = `Corrective.`;
				break;
			case "XX":
				dietDesc = `Estrogen rich.`;
				break;
			case "XY":
				dietDesc = `Testosterone rich.`;
				break;
			case "XXY":
				dietDesc = `Futanari mix.`;
				break;
			case "muscle building":
				dietDesc = `Pumping iron.`;
				break;
			case "slimming":
				dietDesc = `Slimming down.`;
				break;
			case "cum production":
				dietDesc = `Cum production.`;
				break;
			case "cleansing":
				dietDesc = `Cleansing.`;
				break;
			case "fertility":
				dietDesc = `Fertility.`;
				break;
		}

		if (dietDesc) {
			makeSpan(c, dietDesc, "teal");
		}

		function specialDiet(text) {
			addText(c, "Diet base: ");
			makeSpan(c, text, "cyan");
		}

		if (slave.dietCum === 2) {
			specialDiet("Cum Based.");
		} else if (((slave.dietCum === 1) && (slave.dietMilk === 0))) {
			specialDiet("Cum Added.");
		} else if (((slave.dietCum === 1) && (slave.dietMilk === 1))) {
			specialDiet("Milk & Cum Added.");
		} else if (((slave.dietCum === 0) && (slave.dietMilk === 1))) {
			specialDiet("Milk Added.");
		} else if ((slave.dietMilk === 2)) {
			specialDiet("Milk Based.");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_health(slave, c) {
		if (slave.health.health < -20) {
			makeSpan(c, "H", ["red", "strong"], true, slave.health.health);
		} else if (slave.health.health <= 20) {
			makeSpan(c, "H", ["yellow", "strong"], true, slave.health.health);
		} else if (slave.health.health > 20) {
			makeSpan(c, "H", ["green", "strong"], true, slave.health.health);
		}
		if (passage() === "Clinic" && V.clinicUpgradeScanner) {
			if (slave.chem > 15) {
				makeSpan(c, `C${Math.ceil(slave.chem/10)}`, ["cyan", "strong"]);
			} else if (slave.chem <= 15 && slave.assignment === "get treatment in the clinic") {
				makeSpan(c, `CSafe`, ["green", "strong"]);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_health(slave, c) {
		if (slave.health.health < -90) {
			makeSpan(c, "On the edge of death", ["red", "strong"], true, slave.health.health);
		} else if (slave.health.health < -50) {
			makeSpan(c, "Extremely unhealthy", ["red", "strong"], true, slave.health.health);
		} else if (slave.health.health < -20) {
			makeSpan(c, "Unhealthy", ["red", "strong"], true, slave.health.health);
		} else if (slave.health.health <= 20) {
			makeSpan(c, "healthy", "yellow", true, slave.health.health);
		} else if (slave.health.health <= 50) {
			makeSpan(c, "Very healthy", "green", true, slave.health.health);
		} else if (slave.health.health <= 90) {
			makeSpan(c, "Extremely healthy", "green", true, slave.health.health);
		} else {
			makeSpan(c, "Unnaturally healthy", "green", true, slave.health.health);
		}
		if (passage() === "Clinic" && V.clinicUpgradeScanner) {
			if (slave.chem > 15) {
				makeSpan(c, `Carcinogen buildup: ${Math.ceil(slave.chem/10)}.`, "cyan");
			} else if (slave.chem <= 15 && slave.assignment === "get treatment in the clinic") {
				makeSpan(c, `Safe chem levels.`, "green");
			}
		}
	}

	function short_illness(slave, c) {
		if (slave.health.illness > 4) {
			makeSpan(c, `Ill${slave.health.illness}`, ["red", "strong"], true, slave.health.illness);
		} else if (slave.health.illness > 3) {
			makeSpan(c, `Ill${slave.health.illness}`, ["red", "strong"], true, slave.health.illness);
		} else if (slave.health.illness > 2) {
			makeSpan(c, `Ill${slave.health.illness}`, ["red", "strong"], true, slave.health.illness);
		} else if (slave.health.illness > 0) {
			makeSpan(c, `Ill${slave.health.illness}`, ["yellow", "strong"], true, slave.health.illness);
		}
	}

	function long_illness(slave, c) {
		if (slave.health.illness > 4) {
			makeSpan(c, "Terribly ill", ["red", "strong"], true, slave.health.illness);
		} else if (slave.health.illness > 3) {
			makeSpan(c, "Very ill", ["red", "strong"], true, slave.health.illness);
		} else if (slave.health.illness > 2) {
			makeSpan(c, "Ill", ["red", "strong"], true, slave.health.illness);
		} else if (slave.health.illness > 0) {
			makeSpan(c, "Sick", "yellow", true, slave.health.illness);
		}
	}

	function short_tired(slave, c) {
		if (slave.health.tired > 90) {
			makeSpan(c, "Exh", ["red", "strong"], true, slave.health.tired);
		} else if (slave.health.tired > 60) {
			makeSpan(c, "Tir+", "orange", true, slave.health.tired);
		} else if (slave.health.tired > 30) {
			makeSpan(c, "Tir", "yellow", true, slave.health.tired);
		} else if (slave.health.tired < 0) {
			makeSpan(c, "Ene", "green", true, slave.health.tired);
		}
	}

	function long_tired(slave, c) {
		if (slave.health.tired > 90) {
			makeSpan(c, "Exhausted", ["red", "strong"], true, slave.health.tired);
		} else if (slave.health.tired > 60) {
			makeSpan(c, "Fatigued", "orange", true, slave.health.tired);
		} else if (slave.health.tired > 30) {
			makeSpan(c, "Tired", "yellow", true, slave.health.tired);
		} else if (slave.health.tired < 0) {
			makeSpan(c, "Energetic", "green", true, slave.health.tired);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_drugs(slave, c) {
		let drugDesc = "";
		switch (slave.drugs) {
			case "breast injections":
				drugDesc = "Boobs+";
				break;
			case "intensive breast injections":
				drugDesc = "Boobs++";
				break;
			case "hyper breast injections":
				drugDesc = "Boobs+++";
				break;
			case "butt injections":
				drugDesc = "Butt+";
				break;
			case "intensive butt injections":
				drugDesc = "Butt++";
				break;
			case "hyper butt injections":
				drugDesc = "Butt+++";
				break;
			case "lip injections":
				drugDesc = "Lip+";
				break;
			case "fertility drugs":
				drugDesc = "Fert+";
				break;
			case "super fertility drugs":
				drugDesc = "Fert++";
				break;
			case "penis enhancement":
				drugDesc = "Dick+";
				break;
			case "intensive penis enhancement":
				drugDesc = "Dick++";
				break;
			case "hyper penis enhancement":
				drugDesc = "Dick+++";
				break;
			case "testicle enhancement":
				drugDesc = "Balls+";
				break;
			case "intensive testicle enhancement":
				drugDesc = "Balls++";
				break;
			case "hyper testicle enhancement":
				drugDesc = "Balls+++";
				break;
			case "psychosuppressants":
				drugDesc = "Psych-";
				break;
			case "psychostimulants":
				drugDesc = "Psych+";
				break;
			case "steroids":
				drugDesc = "Ster";
				break;
			case "female hormone injections":
				drugDesc = "HormXX++";
				break;
			case "male hormone injections":
				drugDesc = "HormXY++";
				break;
			case "hormone enhancers":
				drugDesc = "Horm+";
				break;
			case "hormone blockers":
				drugDesc = "Horm-";
				break;
			case "anti-aging cream":
				drugDesc = "Age-";
				break;
			case "appetite suppressors":
				drugDesc = "ApSup";
				break;
			case "penis atrophiers":
				drugDesc = "Dick-";
				break;
			case "testicle atrophiers":
				drugDesc = "Balls-";
				break;
			case "clitoris atrophiers":
				drugDesc = "Clit-";
				break;
			case "labia atrophiers":
				drugDesc = "Labia-";
				break;
			case "nipple atrophiers":
				drugDesc = "Nipple-";
				break;
			case "lip atrophiers":
				drugDesc = "Lip-";
				break;
			case "breast redistributors":
				drugDesc = "Breast-";
				break;
			case "butt redistributors":
				drugDesc = "Butt-";
				break;
			case "sag-B-gone":
				drugDesc = "AntiSag";
				break;
			case "growth stimulants":
				drugDesc = "GroStim";
				break;
			case "priapism agents":
				drugDesc = "Erection";
				break;
		}
		if (drugDesc) {
			makeSpan(c, "Dr:" + drugDesc, ["tan", "strong"]);
		}
		if (slave.curatives === 2) {
			makeSpan(c, "Cura", ["lightgreen", "strong"]);
		} else if (slave.curatives === 1) {
			makeSpan(c, "Prev", ["lightgreen", "strong"]);
		}
		if (slave.aphrodisiacs !== 0) {
			if (slave.aphrodisiacs === 1) {
				makeSpan(c, "Aph", ["lightblue", "strong"]);
			} else if (slave.aphrodisiacs === 2) {
				makeSpan(c, "Aph++", ["lightblue", "strong"]);
			} else {
				makeSpan(c, "Anaph", ["lightblue", "strong"]);
			}
		}
		if (slave.addict !== 0) {
			makeSpan(c, "Add", "cyan");
		}
		let styles = ["lightsalmon", "strong"];
		if (slave.hormones > 1) {
			makeSpan(c, "Ho:F+", styles);
		} else if (slave.hormones > 0) {
			makeSpan(c, "Ho:F", styles);
		} else if (slave.hormones < -1) {
			makeSpan(c, "Ho:M+", styles);
		} else if (slave.hormones < 0) {
			makeSpan(c, "Ho:M", styles);
		}

		styles = ["mediumseagreen", "strong"];
		if ((slave.bellyImplant > -1)) {
			makeSpan(c, "Belly Imp", styles);
		} else if (((slave.preg <= -2) || (slave.ovaries === 0)) && (slave.vagina !== -1)) {
			makeSpan(c, "Barr", styles);
		} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Prepub", styles);
		} else if (slave.ovaryAge >= 47 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Meno", styles);
		} else if (slave.pregWeek < 0) {
			makeSpan(c, "Postpartum", styles);
		} else if (slave.preg === -1) {
			makeSpan(c, "CC", styles);
		} else if (slave.preg === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Fert+", styles);
		} else if (((slave.preg < slave.pregData.normalBirth / 10) && (slave.preg > 0) && slave.pregKnown === 0) || slave.pregWeek === 1) {
			makeSpan(c, "Preg?", styles);
		} else if ((slave.preg >= 36) && (slave.broodmother > 0)) {
			makeSpan(c, "Perm preg", styles);
		} else if (slave.pregKnown === 1) {
			makeSpan(c, `${slave.pregWeek} wks preg`, styles);
		}
		if (slave.induce === 1) {
			makeSpan(c, "Early Labor", ["orange", "strong"]);
		}
		if (slave.pubertyXY === 0 && slave.balls > 0) {
			makeSpan(c, "Prepub balls", "strong");
		}
		if (slave.balls > 0 && slave.vasectomy === 1) {
			makeSpan(c, "Vasect", "strong");
		}
		styles = ["springgreen", "strong"];
		if (slave.inflation === 3) {
			makeSpan(c, `8 ltr ${slave.inflationType}`, styles);
		} else if (slave.inflation === 2) {
			makeSpan(c, `4 ltr ${slave.inflationType}`, styles);
		} else if (slave.inflation === 1) {
			makeSpan(c, `2 ltr ${slave.inflationType}`, styles);
		} else if (slave.bellyFluid > 0) {
			makeSpan(c, `${slave.bellyFluid}ccs ${slave.inflationType}`, styles);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_drugs(slave, c) {
		let swd = WombGetLittersData(slave);
		if ((slave.drugs !== "no drugs") && (slave.drugs !== "none")) {
			makeSpan(c, `On ${slave.drugs}.`, "tan");
		}
		if (slave.curatives === 2) {
			makeSpan(c, "On curatives.", "lightgreen");
		} else if (slave.curatives === 1) {
			makeSpan(c, "On preventatives.", "lightgreen");
		}
		if (slave.aphrodisiacs > 0) {
			makeSpan(c, `On ${slave.aphrodisiacs > 1 ? 'extreme' : ''} aphrodisiacs.`, "lightblue");
		} else if (slave.aphrodisiacs === -1) {
			makeSpan(c, "On anaphrodisiacs.", "lightblue");
		}
		if (slave.addict !== 0) {
			makeSpan(c, "Addict.", "cyan");
		}
		if (slave.hormones > 1) {
			makeSpan(c, "Heavy female hormones.", "lightsalmon");
		} else if (slave.hormones > 0) {
			makeSpan(c, "Female hormones.", "lightsalmon");
		} else if (slave.hormones < -1) {
			makeSpan(c, "Heavy male hormones.", "lightsalmon");
		} else if (slave.hormones < 0) {
			makeSpan(c, "Male hormones.", "lightsalmon");
		}
		let styles = "mediumseagreen";
		if ((slave.bellyImplant > -1)) {
			makeSpan(c, "Belly Implant.", styles);
		} else if ((slave.preg <= -2) && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Barren.", styles);
		} else if ((slave.ovaries === 0) && (slave.vagina !== -1) && (slave.genes === "XX")) {
			makeSpan(c, "Barren.", styles);
		} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Not ovulating yet.", styles);
		} else if (slave.ovaryAge >= 47 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Menopausal.", styles);
		} else if (slave.pregWeek < 0) {
			makeSpan(c, "Postpartum.", styles);
		} else if (slave.preg === -1) {
			makeSpan(c, "On contraceptives.", styles);
		} else if (slave.preg === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			makeSpan(c, "Fertile.", styles);
		} else if ((slave.preg >= 36) && (slave.broodmother > 0)) {
			makeSpan(c, "Permanently pregnant.", styles);
		} else if (swd.litters.length > 1) {
			let pregTxt = `Concurrent pregnancies: (${swd.litters.length} sets).`;
			pregTxt += ` Max:${swd.litters[0]} / Min:${swd.litters[swd.litters.length-1]} week(s).`;
			makeSpan(c, pregTxt, "lime");
		} else if (((slave.preg < slave.pregData.normalBirth / 10) && (slave.preg > 0) && slave.pregKnown === 0) || slave.pregWeek === 1) {
			makeSpan(c, "May be pregnant.");
		} else if (slave.pregKnown === 1) {
			if (slave.pregType < 2 || slave.broodmother > 0) {
				makeSpan(c, `${slave.pregWeek} weeks pregnant.`);
			} else {
				let desc = `${slave.pregWeek} weeks pregnant with `;
				if (slave.pregType >= 40) {
					desc += `a tremendous brood of offspring.`;
				} else if (slave.pregType >= 20) {
					desc += `a brood of offspring.`;
				} else if (slave.pregType >= 10) {
					desc += `${slave.pregType} babies.`;
				} else if (slave.pregType === 9) {
					desc += `nonuplets.`;
				} else if (slave.pregType === 8) {
					desc += `octuplets.`;
				} else if (slave.pregType === 7) {
					desc += `septuplets.`;
				} else if (slave.pregType === 6) {
					desc += `sextuplets.`;
				} else if (slave.pregType === 5) {
					desc += `quintuplets.`;
				} else if (slave.pregType === 4) {
					desc += `quadruplets.`;
				} else if (slave.pregType === 3) {
					desc += `triplets.`;
				} else {
					desc += `twins.`;
				}
				makeSpan(c, desc);
			}
			if (slave.preg > slave.pregData.normalBirth && slave.broodmother === 0) {
				makeSpan(c, "(Overdue.)");
			}
		}
		if (slave.induce === 1) {
			makeSpan(c, "Showing signs of early labor.", "orange");
		}
		if (slave.pubertyXY === 0 && slave.balls > 0) {
			makeSpan(c, "Has not had first ejaculation.");
		}
		if (slave.balls > 0 && slave.vasectomy === 1) {
			makeSpan(c, "Vasectomy.");
		}
		if (slave.inflation === 3) {
			makeSpan(c, `Filled with 8 liters of ${slave.inflationType}.`, "springgreen");
		} else if (slave.inflation === 2) {
			makeSpan(c, `Filled with 4 liters of ${slave.inflationType}.`, "springgreen");
		} else if (slave.inflation === 1) {
			makeSpan(c, `Filled with 2 liters of ${slave.inflationType}.`, "springgreen");
		} else if (slave.bellyFluid > 0) {
			makeSpan(c, `Stuffed with ${slave.bellyFluid}ccs of ${slave.inflationType}.`, "springgreen");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function long_race(slave) {
		switch (slave.race) {
			case "white":
				return `Caucasian.`;
			case "asian":
				return `Asian.`;
			case "indo-aryan":
				return `Indo-aryan.`;
			case "latina":
				return `Latina.`;
			case "middle eastern":
				return `Middle Eastern.`;
			case "black":
				return `Black.`;
			case "pacific islander":
				return `Pacific Islander.`;
			case "malay":
				return `Malay.`;
			case "amerindian":
				return `Amerindian.`;
			case "semitic":
				return `Semitic.`;
			case "southern european":
				return `Southern European.`;
			case "mixed race":
				return `Mixed race.`;
			default:
				return `${slave.race.charAt(0).toUpperCase() + slave.race.slice(1)}.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function short_race(slave) {
		switch (slave.race) {
			case "white":
				return `C`;
			case "asian":
				return `A`;
			case "indo-aryan":
				return `I`;
			case "latina":
				return `L`;
			case "middle eastern":
				return `ME`;
			case "black":
				return `B`;
			case "pacific islander":
				return `PI`;
			case "malay":
				return `M`;
			case "amerindian":
				return `AI`;
			case "semitic":
				return `S`;
			case "southern european":
				return `SE`;
			case "mixed race":
				return `MR`;
			default:
				return `${slave.race.charAt(0).toUpperCase() + slave.race.charAt(1) + slave.race.charAt(2)}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function short_nationality(slave) {
		switch (slave.nationality) {
			case "Afghan":
				return "Afg";
			case "Albanian":
				return "Alb";
			case "Algerian":
				return "Alg";
			case "American":
				return "USA";
			case "Andorran":
				return "And";
			case "Angolan":
				return "Ang";
			case "Antiguan":
				return "AB";
			case "Argentinian":
				return "Arg";
			case "Armenian":
				return "Arm";
			case "Aruban":
				return "Aru";
			case "Australian":
				return "Aus";
			case "Austrian":
				return "Aut";
			case "Azerbaijani":
				return "Aze";
			case "Bahamian":
				return "Bah";
			case "Bahraini":
				return "Bah";
			case "Bangladeshi":
				return "Bgd";
			case "Barbadian":
				return "Bar";
			case "Belarusian":
				return "Ber";
			case "Belgian":
				return "Bel";
			case "Belizean":
				return "Blz";
			case "Beninese":
				return "Ben";
			case "Bermudian":
				return "Bmd";
			case "Bhutanese":
				return "Bhu";
			case "Bissau-Guinean":
				return "GB";
			case "Bolivian":
				return "Bol";
			case "Bosnian":
				return "Bos";
			case "Brazilian":
				return "Bra";
			case "British":
				return "UK";
			case "Bruneian":
				return "Bru";
			case "Bulgarian":
				return "Bul";
			case "Burkinabé":
				return "BF";
			case "Burmese":
				return "Bur";
			case "Burundian":
				return "Bnd";
			case "Cambodian":
				return "Kam";
			case "Cameroonian":
				return "Cam";
			case "Canadian":
				return "Can";
			case "Cape Verdean":
				return "CV";
			case "Catalan":
				return "Cat";
			case "Central African":
				return "CAR";
			case "Chadian":
				return "Cha";
			case "Chilean":
				return "Chl";
			case "Chinese":
				return "Chi";
			case "Colombian":
				return "Col";
			case "Comorian":
				return "Com";
			case "Congolese":
				return "RC";
			case "a Cook Islander":
				return "CI";
			case "Costa Rican":
				return "CR";
			case "Croatian":
				return "Cro";
			case "Cuban":
				return "Cub";
			case "Curaçaoan":
				return "Cur";
			case "Cypriot":
				return "Cyp";
			case "Czech":
				return "Cze";
			case "Danish":
				return "Den";
			case "Djiboutian":
				return "Dji";
			case "Dominican":
				return "DR";
			case "Dominiquais":
				return "Dom";
			case "Dutch":
				return "Nld";
			case "East Timorese":
				return "ET";
			case "Ecuadorian":
				return "Ecu";
			case "Egyptian":
				return "Egy";
			case "Emirati":
				return "UAE";
			case "Equatoguinean":
				return "EG";
			case "Eritrean":
				return "Eri";
			case "Estonian":
				return "Est";
			case "Ethiopian":
				return "Eth";
			case "Fijian":
				return "Fij";
			case "Filipina":
				return "Phl";
			case "Finnish":
				return "Fin";
			case "French":
				return "Fra";
			case "French Guianan":
				return "FG";
			case "French Polynesian":
				return "FP";
			case "Gabonese":
				return "Gab";
			case "Gambian":
				return "Gam";
			case "Georgian":
				return "Geo";
			case "German":
				return "Ger";
			case "Ghanan":
				return "Gha";
			case "Greek":
				return "Gre";
			case "Greenlandic":
				return "Grn";
			case "Grenadian":
				return "Gda";
			case "Guamanian":
				return "Gua";
			case "Guatemalan":
				return "Gtm";
			case "Guinean":
				return "Gui";
			case "Guyanese":
				return "Guy";
			case "Haitian":
				return "Hai";
			case "Honduran":
				return "Hon";
			case "Hungarian":
				return "Hun";
			case "I-Kiribati":
				return "Kir";
			case "Icelandic":
				return "Ice";
			case "Indian":
				return "Ind";
			case "Indonesian":
				return "Idn";
			case "Iranian":
				return "Irn";
			case "Iraqi":
				return "Irq";
			case "Irish":
				return "Irl";
			case "Israeli":
				return "Isr";
			case "Italian":
				return "Ita";
			case "Ivorian":
				return "IC";
			case "Jamaican":
				return "Jam";
			case "Japanese":
				return "Jpn";
			case "Jordanian":
				return "Jor";
			case "Kazakh":
				return "Kaz";
			case "Kenyan":
				return "Ken";
			case "Kittitian":
				return "SKN";
			case "Korean":
				return "Kor";
			case "Kosovan":
				return "Kos";
			case "Kurdish":
				return "Kur";
			case "Kuwaiti":
				return "Kuw";
			case "Kyrgyz":
				return "Kyr";
			case "Laotian":
				return "Lao";
			case "Latvian":
				return "Lat";
			case "Lebanese":
				return "Lbn";
			case "Liberian":
				return "Lib";
			case "Libyan":
				return "Lby";
			case "a Liechtensteiner":
				return "Lie";
			case "Lithuanian":
				return "Lit";
			case "Luxembourgian":
				return "Lux";
			case "Macedonian":
				return "Mac";
			case "Malagasy":
				return "Mad";
			case "Malawian":
				return "Mwi";
			case "Malaysian":
				return "Mys";
			case "Maldivian":
				return "Mdv";
			case "Malian":
				return "Mal";
			case "Maltese":
				return "Mlt";
			case "Marshallese":
				return "MI";
			case "Mauritanian":
				return "Mta";
			case "Mauritian":
				return "Mts";
			case "Mexican":
				return "Mex";
			case "Micronesian":
				return "FSM";
			case "Moldovan":
				return "Mol";
			case "Monégasque":
				return "Mnc";
			case "Mongolian":
				return "Mon";
			case "Montenegrin":
				return "Mng";
			case "Moroccan":
				return "Mor";
			case "Mosotho":
				return "Les";
			case "Motswana":
				return "Bot";
			case "Mozambican":
				return "Moz";
			case "Namibian":
				return "Nam";
			case "Nauruan":
				return "Nau";
			case "Nepalese":
				return "Npl";
			case "New Caledonian":
				return "NC";
			case "a New Zealander":
				return "NZ";
			case "Ni-Vanuatu":
				return "Van";
			case "Nicaraguan":
				return "Nic";
			case "Nigerian":
				return "Nga";
			case "Nigerien":
				return "Ngr";
			case "Niuean":
				return "Niu";
			case "Norwegian":
				return "Nor";
			case "Omani":
				return "Omn";
			case "Pakistani":
				return "Pak";
			case "Palauan":
				return "Plu";
			case "Palestinian":
				return "Pal";
			case "Panamanian":
				return "Pan";
			case "Papua New Guinean":
				return "PNG";
			case "Paraguayan":
				return "Par";
			case "Peruvian":
				return "Per";
			case "Polish":
				return "Pol";
			case "Portuguese":
				return "Por";
			case "Puerto Rican":
				return "PR";
			case "Qatari":
				return "Qat";
			case "Romanian":
				return "Rom";
			case "Russian":
				return "Rus";
			case "Rwandan":
				return "Rwa";
			case "Sahrawi":
				return "Sah";
			case "Saint Lucian":
				return "SL";
			case "Salvadoran":
				return "ES";
			case "Sammarinese":
				return "SM";
			case "Samoan":
				return "Sam";
			case "São Toméan":
				return "STP";
			case "Saudi":
				return "Sau";
			case "Scottish":
				return "Sco";
			case "Senegalese":
				return "Sen";
			case "Serbian":
				return "Srb";
			case "Seychellois":
				return "Sey";
			case "Sierra Leonean":
				return "Sie";
			case "Singaporean":
				return "Sng";
			case "Slovak":
				return "Svk";
			case "Slovene":
				return "Svn";
			case "a Solomon Islander":
				return "SI";
			case "Somali":
				return "Som";
			case "South African":
				return "RSA";
			case "South Sudanese":
				return "SS";
			case "Spanish":
				return "Spa";
			case "Sri Lankan":
				return "Sri";
			case "Sudanese":
				return "Sud";
			case "Surinamese":
				return "Sur";
			case "Swazi":
				return "Swa";
			case "Swedish":
				return "Swe";
			case "Swiss":
				return "Swi";
			case "Syrian":
				return "Syr";
			case "Taiwanese":
				return "Tai";
			case "Tajik":
				return "Taj";
			case "Tanzanian":
				return "Tza";
			case "Thai":
				return "Tha";
			case "Tibetan":
				return "Tib";
			case "Togolese":
				return "Tog";
			case "Tongan":
				return "Ton";
			case "Trinidadian":
				return "TT";
			case "Tunisian":
				return "Tun";
			case "Turkish":
				return "Tur";
			case "Turkmen":
				return "Tkm";
			case "Tuvaluan":
				return "Tuv";
			case "Ugandan":
				return "Uga";
			case "Ukrainian":
				return "Ukr";
			case "Uruguayan":
				return "Uru";
			case "Uzbek":
				return "Uzb";
			case "Vatican":
				return "VC";
			case "Venezuelan":
				return "Ven";
			case "Vietnamese":
				return "Vnm";
			case "Vincentian":
				return "SVG";
			case "Yemeni":
				return "Yem";
			case "Zairian":
				return "DRC";
			case "Zambian":
				return "Zam";
			case "Zimbabwean":
				if (slave.race === "white") {
					return `Rho`;
				} else {
					return `Zwe`;
				}
			case "Ancient Chinese Revivalist":
				return `Chi Rev`;
			case "Ancient Egyptian Revivalist":
				return `Egy Rev`;
			case "Arabian Revivalist":
				return `Ara Rev`;
			case "Aztec Revivalist":
				return `Azt Rev`;
			case "Edo Revivalist":
				return `Edo Rev`;
			case "Roman Revivalist":
				return `Rom Rev`;
			case "":
			case "none":
			case "slave":
			case "Stateless":
				return "None";
			default:
				return `${slave.nationality.charAt(0) + slave.nationality.charAt(1) + slave.nationality.charAt(2)}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function long_nationality(slave) {
		switch (slave.nationality) {
			case "a Cook Islander":
				return `Cook Islander.`;
			case "a Liechtensteiner":
				return `Liechtensteiner.`;
			case "a New Zealander":
				return `New Zealander.`;
			case "a Solomon Islander":
				return `Solomon Islander.`;
			case "Zimbabwean":
				if (slave.race === "white") {
					return `Rhodesian.`;
				} else {
					return `${slave.nationality}.`;
				}
			case "slave":
			case "none":
			case "":
			case "Stateless":
				return `Stateless.`;
			default:
				return `${slave.nationality}.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function short_skin(slave) {
		switch (slave.skin) {
			case "pure white":
				return `P. Whi`;
			case "extremely fair":
				return `E. Fai`;
			case "very fair":
				return `V. Fai`;
			case "extremely pale":
				return `E. Pal`;
			case "very pale":
				return `V. Pal`;
			case "light brown":
				return `L. Br`;
			case "dark brown":
				return `D. Br`;
			case "light olive":
				return `L. Oli`;
			case "dark olive":
				return `D. Oli`;
			case "light beige":
				return `L. Bei`;
			case "dark beige":
				return `D. Bei`;
			case "tan":
				return `Tan`;
			case "bronze":
				return `Bron`;
			case "ebony":
				return `Ebon`;
			case "pure black":
				return `P. Bla`;
			case "dark":
			case "fair":
			case "pale":
				return `${slave.skin.charAt(0).toUpperCase() + slave.skin.slice(1)}`;
			default:
				return `${slave.skin.charAt(0).toUpperCase() + slave.skin.charAt(1) + slave.skin.charAt(2)}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_genitals(slave, c) {
		if (slave.dick > 0) {
			let dickDesc = "";
			if (slave.balls === 0) {
				dickDesc += `Geld`;
			}
			if ((slave.dick > 8) && (slave.balls > 8)) {
				dickDesc += `Junk+++`;
			} else if ((slave.dick > 5) && (slave.balls > 5)) {
				dickDesc += `Junk++`;
			} else if ((slave.dick > 4) && (slave.balls > 4)) {
				dickDesc += `Junk+`;
			} else if ((slave.dick > 3) && (slave.balls > 3)) {
				dickDesc += `Junk`;
			} else if (slave.dick > 8) {
				dickDesc += `Dick+++`;
			} else if (slave.dick > 5) {
				dickDesc += `Dick++`;
			} else if (slave.dick > 4) {
				dickDesc += `Dick+`;
			} else if (slave.dick > 3) {
				dickDesc += `Dick`;
			} else if (slave.balls > 10) {
				dickDesc += `Balls+++`;
			} else if (slave.balls > 5) {
				dickDesc += `Balls++`;
			} else if (slave.balls > 4) {
				dickDesc += `Balls+`;
			} else if (slave.balls > 3) {
				dickDesc += `Balls`;
			}
			if (dickDesc.length) {
				makeSpan(c, dickDesc, "pink");
			}
		}
		if (slave.vagina === 0) {
			makeSpan(c, "VV", "lime");
		} else if ((slave.pregKnown === 1) && canWalk(slave) && (slave.clothes === "no clothing" || slave.clothes === "body oil") && (slave.shoes === "none")) {
			makeSpan(c, "NBP", "pink");
		}
		if (slave.anus === 0) {
			makeSpan(c, "AV", "lime");
		}
		let holesDesc = "";
		if ((slave.vagina > 3) && (slave.anus > 3)) {
			holesDesc += `V++A++`;
		} else if ((slave.vagina > 2) && (slave.anus > 2)) {
			holesDesc += `V+A+`;
		} else if (slave.vagina > 3) {
			holesDesc += `V++`;
		} else if (slave.vagina > 2) {
			holesDesc += `V+`;
		} else if (slave.anus > 3) {
			holesDesc += `A++`;
		} else if (slave.anus > 2) {
			holesDesc += `A+`;
		}
		if (holesDesc.length) {
			makeSpan(c, holesDesc, "pink");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_genitals(slave, c) {
		if (slave.dick > 0) {
			let dickDesc = "";
			if (slave.balls === 0) {
				dickDesc += 'Gelded.';
			}
			if ((slave.dick > 8) && (slave.balls > 8)) {
				dickDesc += `Hyper dick & balls.`;
			} else if ((slave.dick > 5) && (slave.balls > 5)) {
				dickDesc += `Monster dick & balls.`;
			} else if ((slave.dick > 4) && (slave.balls > 4)) {
				dickDesc = `Huge dick & balls.`;
			} else if ((slave.dick > 3) && (slave.balls > 3)) {
				dickDesc = `Big dick & balls.`;
			} else if (slave.dick > 8) {
				dickDesc = `Hyper dong.`;
			} else if (slave.dick > 5) {
				dickDesc = `Monster dong.`;
			} else if (slave.dick > 4) {
				dickDesc = `Huge dick.`;
			} else if (slave.dick > 3) {
				dickDesc = `Big dick.`;
			} else if (slave.balls > 8) {
				dickDesc = `Hyper balls.`;
			} else if (slave.balls > 5) {
				dickDesc = `Monstrous balls.`;
			} else if (slave.balls > 4) {
				dickDesc = `Huge balls.`;
			} else if (slave.balls > 3) {
				dickDesc = `Big balls.`;
			}
			if (dickDesc.length) {
				makeSpan(c, dickDesc, "pink");
			}
		}
		if (slave.vagina === 0) {
			makeSpan(c, "Virgin.", "lime");
		} else if ((slave.pregKnown === 1) && canWalk(slave) && (slave.clothes === "no clothing" || slave.clothes === "body oil") && (slave.shoes === "none")) {
			makeSpan(c, "Naked, barefoot, and pregnant.", "pink");
		}
		if (slave.anus === 0) {
			makeSpan(c, "Anal virgin.", "lime");
		}
		let holesDesc = "";
		if ((slave.vagina > 3) && (slave.anus > 3)) {
			holesDesc += `Blown out holes.`;
		} else if ((slave.vagina > 2) && (slave.anus > 2)) {
			holesDesc += `High mileage.`;
		} else if (slave.vagina > 3) {
			holesDesc += `Cavernous pussy.`;
		} else if (slave.vagina > 2) {
			holesDesc += `Loose pussy.`;
		} else if (slave.anus > 3) {
			holesDesc += `Permagaped anus.`;
		} else if (slave.anus > 2) {
			holesDesc += `Gaping anus.`;
		}
		if (holesDesc.length) {
			makeSpan(c, holesDesc, "pink");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_age(slave, c) {
		let r = makeSpan(c, "", "pink");
		if (V.showAgeDetail === 1) {
			r.textContent += slave.actualAge.toString();
		} else if (slave.actualAge >= 40) {
			r.textContent += "40s";
		} else if (slave.actualAge >= 35) {
			r.textContent += "Lt30s";
		} else if (slave.actualAge >= 30) {
			r.textContent += "Ea30s";
		} else if (slave.actualAge >= 25) {
			r.textContent += "Lt20s";
		} else if (slave.actualAge >= 20) {
			r.textContent += "Ea20s";
		} else if (slave.actualAge >= 18) {
			r.textContent += slave.actualAge.toString();
		}
		if (slave.actualAge !== slave.physicalAge) {
			r.textContent += ` w ${slave.physicalAge}y-bdy`;
		}
		if (slave.visualAge !== slave.physicalAge) {
			r.textContent += ` Lks${slave.visualAge}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_face(slave, c) {
		if (slave.face < -95) {
			makeSpan(c, "Face---", "red", true, slave.face);
		} else if (slave.face < -40) {
			makeSpan(c, "Face--", "red", true, slave.face);
		} else if (slave.face < -10) {
			makeSpan(c, "Face-", "red", true, slave.face);
		} else if (slave.face <= 10) {
			makeSpan(c, "Face", null, true, slave.face);
		} else if (slave.face <= 40) {
			makeSpan(c, "Face+", "pink", true, slave.face);
		} else if (slave.face <= 95) {
			makeSpan(c, "Face++", "pink", true, slave.face);
		} else {
			makeSpan(c, "Face+++", "pink", true, slave.face);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_eyes(slave, c) {
		if (!canSee(slave)) {
			makeSpan(c, "Blind", "red");
		} else if (!canSeePerfectly(slave)) {
			makeSpan(c, "Sight-", "yellow");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_ears(slave, c) {
		if (slave.hears === -2) {
			makeSpan(c, "Deaf", "red");
		} else if ((slave.hears === -1) && (slave.earwear !== "hearing aids")) {
			makeSpan(c, "Hearing-", "yellow");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_lips(slave, c) {
		if (slave.lips > 95) {
			makeSpan(c, "Facepussy");
		} else if (slave.lips > 70) {
			makeSpan(c, "Lips+++", null, true, slave.lips);
		} else if (slave.lips > 40) {
			makeSpan(c, "Lips++", null, true, slave.lips);
		} else if (slave.lips > 20) {
			makeSpan(c, "Lips+", null, true, slave.lips);
		} else if (slave.lips > 10) {
			makeSpan(c, "Lips", null, true, slave.lips);
		} else {
			makeSpan(c, "Lips-", "red", true, slave.lips);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_teeth(slave, c) {
		if (slave.teeth === "crooked") {
			makeSpan(c, "Cr Teeth", "yellow");
		} else if (slave.teeth === "gapped") {
			makeSpan(c, "Gap", "yellow");
		} else if (slave.teeth === "cosmetic braces") {
			makeSpan(c, `Cos Braces`);
		} else if (slave.teeth === "straightening braces") {
			makeSpan(c, `Braces`);
		} else if (slave.teeth === "removable") {
			makeSpan(c, `Rem Teeth`);
		} else if (slave.teeth === "pointy") {
			makeSpan(c, `Fangs`);
		} else if (slave.teeth === "baby") {
			makeSpan(c, `Baby`);
		} else if (slave.teeth === "mixed") {
			makeSpan(c, `Mixed`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_muscles(slave, c) {
		if (slave.muscles > 95) {
			makeSpan(c, "Musc++", undefined, true, slave.muscles);
		} else if (slave.muscles > 50) {
			makeSpan(c, "Musc+", undefined, true, slave.muscles);
		} else if (slave.muscles > 30) {
			makeSpan(c, "Fit", undefined, true, slave.muscles);
		} else if (slave.muscles > 5) {
			makeSpan(c, "Toned", undefined, true, slave.muscles);
		} else if (slave.muscles > -6) {
			makeSpan(c, "Soft", undefined, true, slave.muscles);
		} else if (slave.muscles > -31) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				makeSpan(c, "Weak", "red", true, slave.muscles);
			} else {
				makeSpan(c, "Soft", undefined, true, slave.muscles);
			}
		} else if (slave.muscles > -96) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				makeSpan(c, "Weak+", "red", true, slave.muscles);
			} else {
				makeSpan(c, "Soft+", undefined, true, slave.muscles);
			}
		} else {
			makeSpan(c, "Weak++", "red", true, slave.muscles);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_voice(slave, c) {
		if (slave.voice === 0) {
			makeSpan(c, "Mute", "red");
		} else {
			if (slave.accent === 3) {
				makeSpan(c, "Acc--", "red");
			} else if (slave.accent === 2) {
				makeSpan(c, "Acc-");
			} else if (slave.accent === 4) {
				makeSpan(c, "Acc--");
			} else if (slave.accent === 1) {
				makeSpan(c, "Acc", "pink");
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_tits_ass(slave, c) {
		let styles = "pink";
		if ((slave.boobs >= 12000) && (slave.butt > 9)) {
			makeSpan(c, "T&A+++", styles);
		} else if ((slave.boobs > 4000) && (slave.butt > 8)) {
			makeSpan(c, "T&A++", styles);
		} else if ((slave.boobs > 2000) && (slave.butt > 6)) {
			makeSpan(c, "T&A+", styles);
		} else if ((slave.boobs > 800) && (slave.butt > 4)) {
			makeSpan(c, "T&A", styles);
		} else if ((slave.boobs < 500) && (slave.butt < 3) && (slave.weight <= 10) && (slave.muscles <= 30)) {
			makeSpan(c, "Girlish", styles);
		} else if (slave.boobs >= 12000) {
			makeSpan(c, "Boobs+++", styles);
		} else if (slave.boobs > 4000) {
			makeSpan(c, "Boobs++", styles);
		} else if (slave.boobs > 2000) {
			makeSpan(c, "Boobs+", styles);
		} else if (slave.boobs > 800) {
			makeSpan(c, "Boobs", styles);
		} else if (slave.butt > 9) {
			makeSpan(c, "Ass+++", styles);
		} else if (slave.butt > 8) {
			makeSpan(c, "Ass++", styles);
		} else if (slave.butt > 6) {
			makeSpan(c, "Ass+", styles);
		} else if (slave.butt > 4) {
			makeSpan(c, "Ass", styles);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_hips(slave, c) {
		let desc = "";
		if (slave.hips < -1) {
			if (slave.butt > 2 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
				desc = `Disp+`;
			}
		} else if (slave.hips < 0) {
			if (slave.butt > 4 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
				desc = `Disp+`;
			}
		} else if (slave.hips > 2) {
			if (slave.butt <= 8) {
				desc = `Disp-`;
			}
		} else if (slave.hips > 1) {
			if (slave.butt <= 3 && (V.arcologies[0].FSSlimnessEnthusiast === "unset" || (slave.boobs >= 500))) {
				desc = `Disp-`;
			}
		} else if (slave.hips > 0) {
			if (slave.butt > 8) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
					desc = `Disp+`;
				}
			} else if (slave.butt <= 2 && (V.arcologies[0].FSSlimnessEnthusiast === "unset" || (slave.boobs >= 500))) {
				desc = `Disp-`;
			}
		} else {
			if (slave.butt > 6) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
					desc = `Disp+`;
				}
			} else if (slave.butt <= 1 && (V.arcologies[0].FSSlimnessEnthusiast === "unset" || (slave.boobs >= 500))) {
				desc = `Disp-`;
			}
		}
		if (desc) {
			makeSpan(c, desc, "red");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_waist(slave, c) {
		if (slave.waist > 95) {
			makeSpan(c, "Wst---", "red", false, slave.waist);
		} else if (slave.waist > 40) {
			makeSpan(c, "Wst--", "red", false, slave.waist);
		} else if (slave.waist > 10) {
			makeSpan(c, "Wst-", "red", false, slave.waist);
		} else if (slave.waist >= -10) {
			makeSpan(c, "Wst", undefined, false, slave.waist);
		} else if (slave.waist >= -40) {
			makeSpan(c, "Wst+", "pink", false, slave.waist);
		} else if (slave.waist >= -95) {
			makeSpan(c, "Wst++", "pink", false, slave.waist);
		} else {
			makeSpan(c, "Wst+++", "pink", false, slave.waist);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_implants(slave, c) {
		if ((slave.boobsImplant === 0) && (slave.buttImplant === 0) && (slave.waist >= -95) && (slave.lipsImplant === 0) && (slave.faceImplant <= 5) && (slave.bellyImplant === -1)) {
			makeSpan(c, "Natr", "pink");
		} else {
			makeSpan(c, "Impl", "pink");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_lactation(slave, c) {
		if (slave.lactation === 1) {
			makeSpan(c, "Lact", "pink");
		} else if (slave.lactation === 2) {
			makeSpan(c, "Lact", "pink");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_mods(slave, c) {
		V.modScore = SlaveStatsChecker.modScore(slave);
		if (slave.corsetPiercing === 0 && V.piercingScore < 3 && V.tatScore < 2) {
			return;
		} else if (V.modScore > 15 || (V.piercingScore > 8 && V.tatScore > 5)) {
			makeSpan(c, "Mods++");
		} else if (V.modScore > 7) {
			makeSpan(c, "Mods+");
		} else {
			makeSpan(c, "Mods");
		}
		if (!jQuery.isEmptyObject(slave.brand)) {
			makeSpan(c, "Br");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_age(slave, c) {
		let r = makeSpan(c, "", "pink");
		if (V.showAgeDetail === 1) {
			r.textContent += `Age ` + `${slave.actualAge}` + `.`;
		} else if (slave.actualAge >= 40) {
			r.textContent += `Forties.`;
		} else if (slave.actualAge >= 35) {
			r.textContent += `Late thirties.`;
		} else if (slave.actualAge >= 30) {
			r.textContent += `Early thirties.`;
		} else if (slave.actualAge >= 25) {
			r.textContent += `Late twenties.`;
		} else if (slave.actualAge >= 20) {
			r.textContent += `Early twenties.`;
		} else if (slave.actualAge >= 19) {
			r.textContent += `Nineteen.`;
		} else if (slave.actualAge >= 18) {
			r.textContent += `Eighteen.`;
		} else {
			r.textContent += `Underage.`;
		}
		/*
		 ** No NCS, then do the standard, However because of the wrinkles of Incubators, as long as visual age is greater
		 ** than or equal to physical age, we do the old physical body/Looks for fresh out of the can NCS slaves.
		 */
		if (((slave.geneMods.NCS === 0) || (slave.visualAge >= slave.physicalAge))) {
			if (slave.actualAge !== slave.physicalAge) {
				r.textContent += ` ${slave.physicalAge}` + ` year old body.`;
			}
			if (slave.visualAge !== slave.physicalAge) {
				r.textContent += ` Looks ` + `${slave.visualAge}` + `.`;
			}
		} else {
			/*
			 ** Now the rub. The use of physical Age for the year old body above, basically conflicts with the changes
			 ** that NCS introduces, so here to *distinguish* the changes, we use visual age with the 'year old body'
			 ** and appears, for example: Slave release from incubator at age 10, Her summary would show, 'Age 0. 10
			 ** year old body.' But if she's given NCS a few weeks after release, while she's still before her first
			 ** birthday, it'll appear the same. But once her birthday fires, if we ran with the above code it would
			 ** say: 'Age 1. 11 year old body.' -- this conflicts with the way NCS works though, because she hasn't
			 ** visually aged, so our change here makes it say 'Age 1. Appears to have a 10 year old body.'
			 */
			r.textContent += ` Appears to have a ` + `${slave.visualAge}` + ` year old body.`;
		}
		if (slave.geneMods.NCS === 1) {
			makeSpan(r, "NCS", "orange");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_face(slave, c) {
		if (slave.face < -95) {
			makeSpan(c, `Very ugly ${slave.faceShape} face`, "red", true, slave.face);
		} else if (slave.face < -40) {
			makeSpan(c, `Ugly ${slave.faceShape} face`, "red", true, slave.face);
		} else if (slave.face < -10) {
			makeSpan(c, `Unattractive ${slave.faceShape} face`, "red", true, slave.face);
		} else if (slave.face <= 10) {
			makeSpan(c, `Average ${slave.faceShape} face`, null, true, slave.face);
		} else if (slave.face <= 40) {
			makeSpan(c, `Attractive ${slave.faceShape} face`, "pink", true, slave.face);
		} else if (slave.face <= 95) {
			makeSpan(c, `Beautiful ${slave.faceShape} face`, "pink", true, slave.face);
		} else {
			makeSpan(c, `Very beautiful ${slave.faceShape} face`, "pink", true, slave.face);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_eyes(slave, c) {
		if (!canSee(slave)) {
			makeSpan(c, "Blind.", "red");
		} else if (!canSeePerfectly(slave)) {
			makeSpan(c, "Nearsighted.", "yellow");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_ears(slave, c) {
		if (slave.hears <= -2) {
			makeSpan(c, "Deaf.", "red");
		} else if ((slave.hears === -1) && (slave.earwear !== "hearing aids")) {
			makeSpan(c, "Hard of hearing.", "yellow");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_lips(slave, c) {
		if (slave.lips > 95) {
			makeSpan(c, "Facepussy", undefined, true, slave.lips);
		} else if (slave.lips > 70) {
			makeSpan(c, "Huge lips", undefined, true, slave.lips);
		} else if (slave.lips > 40) {
			makeSpan(c, "Big lips", undefined, true, slave.lips);
		} else if (slave.lips > 20) {
			makeSpan(c, "Pretty lips", undefined, true, slave.lips);
		} else if (slave.lips > 10) {
			makeSpan(c, "Normal lips", undefined, true, slave.lips);
		} else {
			makeSpan(c, "Thin lips", "red", true, slave.lips);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_teeth(slave, c) {
		if (slave.teeth === "crooked") {
			makeSpan(c, "Crooked teeth.", "yellow");
		} else if (slave.teeth === "gapped") {
			makeSpan(c, "Tooth gap.", "yellow");
		} else if (slave.teeth === "cosmetic braces") {
			makeSpan(c, "Cosmetic braces.");
		} else if (slave.teeth === "straightening braces") {
			makeSpan(c, "Braces.");
		} else if (slave.teeth === "removable") {
			makeSpan(c, "Removable teeth.");
		} else if (slave.teeth === "pointy") {
			makeSpan(c, "Sharp fangs.");
		} else if (slave.teeth === "baby") {
			makeSpan(c, "Baby teeth.");
		} else if (slave.teeth === "mixed") {
			makeSpan(c, "Mixed teeth.");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_muscles(slave, c) {
		if (slave.muscles > 95) {
			makeSpan(c, "Hugely muscular", undefined, true, slave.muscles);
		} else if (slave.muscles > 50) {
			makeSpan(c, "Muscular", undefined, true, slave.muscles);
		} else if (slave.muscles > 30) {
			makeSpan(c, "Fit", undefined, true, slave.muscles);
		} else if (slave.muscles > 5) {
			makeSpan(c, "Toned", undefined, true, slave.muscles);
		} else if (slave.muscles > -6) {
			makeSpan(c, "Soft", undefined, true, slave.muscles);
		} else if (slave.muscles > -31) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				makeSpan(c, "Weak", "red", true, slave.muscles);
			} else {
				makeSpan(c, "Weak", undefined, true, slave.muscles);
			}
		} else if (slave.muscles > -96) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				makeSpan(c, "Very weak", "red", true, slave.muscles);
			} else {
				makeSpan(c, "Very weak", undefined, true, slave.muscles);
			}
		} else {
			makeSpan(c, "Frail", "red", true, slave.muscles);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_voice(slave, c) {
		if (slave.voice === 0) {
			makeSpan(c, "Mute.", "red");
		} else {
			if (slave.accent === 3) {
				makeSpan(c, "Bad accent.", "red");
			} else if (slave.accent === 4) {
				makeSpan(c, "No language skills.", "red");
			} else if (slave.accent === 2) {
				makeSpan(c, "Accent.");
			} else if (slave.accent === 1) {
				makeSpan(c, "Cute accent.", "pink");
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_tits_ass(slave, c) {
		const styles = "pink";
		if ((slave.boobs >= 12000) && (slave.butt > 9)) {
			makeSpan(c, "Hyper T&A.", styles);
		} else if ((slave.boobs > 4000) && (slave.butt > 8)) {
			makeSpan(c, "Enormous T&A.", styles);
		} else if ((slave.boobs > 2000) && (slave.butt > 6)) {
			makeSpan(c, "Huge T&A.", styles);
		} else if ((slave.boobs > 800) && (slave.butt > 4)) {
			makeSpan(c, "Big T&A.", styles);
		} else if ((slave.boobs < 500) && (slave.butt < 3) && (slave.weight <= 10) && (slave.muscles <= 30)) {
			makeSpan(c, "Girlish figure.", styles);
		} else if (slave.boobs >= 12000) {
			makeSpan(c, "Immobilizing tits.", styles);
		} else if (slave.boobs > 4000) {
			makeSpan(c, "Monstrous tits.", styles);
		} else if (slave.boobs > 2000) {
			makeSpan(c, "Huge tits.", styles);
		} else if (slave.boobs > 800) {
			makeSpan(c, "Big tits.", styles);
		} else if (slave.butt > 9) {
			makeSpan(c, "Hyper ass.", styles);
		} else if (slave.butt > 8) {
			makeSpan(c, "Titanic ass.", styles);
		} else if (slave.butt > 6) {
			makeSpan(c, "Huge ass.", styles);
		} else if (slave.butt > 4) {
			makeSpan(c, "Big ass.", styles);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_hips(slave, c) {
		const styles = "red";
		if (slave.hips < -1) {
			if (slave.butt > 2 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset") && (V.arcologies[0].FSIntellectualDependencyLawBeauty === 0)) {
				makeSpan(c, "Disproportionately big butt.", styles);
			}
		} else if (slave.hips < 0) {
			if (slave.butt > 4 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset") && (V.arcologies[0].FSIntellectualDependencyLawBeauty === 0)) {
				makeSpan(c, "Disproportionately big butt.", styles);
			}
		} else if (slave.hips > 2) {
			if (slave.butt <= 8) {
				makeSpan(c, "Disproportionately small butt.", styles);
			}
		} else if (slave.hips > 1) {
			if (slave.butt <= 3 && ((V.arcologies[0].FSSlimnessEnthusiast === "unset") || (slave.boobs >= 500))) {
				makeSpan(c, "Disproportionately small butt.", styles);
			}
		} else if (slave.hips > 0) {
			if (slave.butt > 8) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset") && (V.arcologies[0].FSIntellectualDependencyLawBeauty === 0)) {
					makeSpan(c, "Disproportionately big butt.", styles);
				}
			} else if (slave.butt <= 2 && ((V.arcologies[0].FSSlimnessEnthusiast === "unset") || (slave.boobs >= 500))) {
				makeSpan(c, "Disproportionately small butt.", styles);
			}
		} else {
			if (slave.butt > 6) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset") && (V.arcologies[0].FSIntellectualDependencyLawBeauty === 0)) {
					makeSpan(c, "Disproportionately big butt.", styles);
				}
			} else if (slave.butt <= 1 && ((V.arcologies[0].FSSlimnessEnthusiast === "unset") || (slave.boobs >= 500))) {
				makeSpan(c, "Disproportionately small butt.", styles);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_waist(slave, c) {
		if (slave.waist > 95) {
			makeSpan(c, "Masculine waist", "red", true, slave.waist);
		} else if (slave.waist > 40) {
			makeSpan(c, "Ugly waist", "red", true, slave.waist);
		} else if (slave.waist > 10) {
			makeSpan(c, "Unattractive waist", "red", true, slave.waist);
		} else if (slave.waist >= -10) {
			makeSpan(c, "Average waist", null, true, slave.waist);
		} else if (slave.waist >= -40) {
			makeSpan(c, "Feminine waist", "pink", true, slave.waist);
		} else if (slave.waist >= -95) {
			makeSpan(c, "Hourglass waist", "pink", true, slave.waist);
		} else {
			makeSpan(c, "Absurdly narrow waist", "pink", true, slave.waist);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_implants(slave, c) {
		const styles = "pink";
		if ((slave.boobsImplant !== 0) || (slave.buttImplant !== 0) || (slave.lipsImplant !== 0) || (slave.bellyImplant !== -1)) {
			makeSpan(c, "Implants.", styles);
		} else if ((slave.faceImplant >= 30) || (slave.waist < -95)) {
			makeSpan(c, "Surgery enhanced.", styles);
		} else {
			makeSpan(c, "All natural.", styles);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_lactation(slave, c) {
		if (slave.lactation === 1) {
			makeSpan(c, "Lactating naturally.", "pink");
		} else if (slave.lactation === 2) {
			makeSpan(c, "Heavy lactation.", "pink");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_mods(slave, c) {
		V.modScore = SlaveStatsChecker.modScore(slave);
		if (slave.corsetPiercing === 0 && V.piercingScore < 3 && V.tatScore < 2) {
			return;
		} else if (V.modScore > 15 || (V.piercingScore > 8 && V.tatScore > 5)) {
			makeSpan(c, "Extensive body mods.");
		} else if (V.modScore > 7) {
			makeSpan(c, "Noticeable body mods.");
		} else {
			makeSpan(c, "Light body mods.");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_intelligence(slave, c) {
		const intelligence = slave.intelligence + slave.intelligenceImplant;
		if (slave.fetish === "mindbroken") {
			return;
		}
		let education = "";
		let naturalIntelligence = "";
		let styles = undefined;
		if (slave.intelligenceImplant >= 30) {
			education = "(e+)";
		} else if (slave.intelligenceImplant >= 15) {
			education = "(e)";
		} else if (slave.intelligenceImplant <= -15) {
			education = "(e-)";
		}
		if (intelligence >= 130) {
			naturalIntelligence = "I++++";
			styles = "deepskyblue";
		} else if (intelligence > 95) {
			naturalIntelligence = "I+++";
			styles = "deepskyblue";
		} else if (intelligence > 50) {
			naturalIntelligence = "I++";
			styles = "deepskyblue";
		} else if (intelligence > 15) {
			naturalIntelligence = "I+";
			styles = "deepskyblue";
		} else if (intelligence >= -15) {
			naturalIntelligence = "I";
		} else if (intelligence >= -50) {
			naturalIntelligence = "I-";
			styles = "orangered";
		} else if (intelligence >= -95) {
			naturalIntelligence = "I--";
			styles = "orangered";
		} else {
			naturalIntelligence = "I---";
			styles = "orangered";
		}
		makeSpan(c, `${naturalIntelligence}${education}`, styles, true, intelligence);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_skills(slave, c) {
		let _SSkills = slave.skill.anal + slave.skill.oral;
		let r = makeSpan(c, "", "aquamarine");
		if (((_SSkills + slave.skill.whoring + slave.skill.entertainment) >= 400) && ((slave.vagina < 0) || (slave.skill.vaginal >= 100))) {
			r.textContent += `MSS`;
		} else {
			_SSkills += slave.skill.vaginal;
			_SSkills = Math.trunc(_SSkills);
			if (_SSkills > 180) {
				r.textContent += `S++`;
			} else if ((_SSkills > 120) && (slave.vagina < 0)) {
				r.textContent += `Sh++`;
			} else if (_SSkills > 90) {
				r.textContent += `S+`;
			} else if (_SSkills > 30) {
				r.textContent += `S`;
			} else {
				r.textContent += `S-`;
			}
			if (V.summaryStats) {
				r.textContent += `[${_SSkills}]`;
			}
			r.textContent += " ";
			if (slave.skill.whoring >= 100) {
				r.textContent += `W+++`;
			} else if (slave.skill.whoring > 60) {
				r.textContent += `W++`;
			} else if (slave.skill.whoring > 30) {
				r.textContent += `W+`;
			} else if (slave.skill.whoring > 10) {
				r.textContent += `W`;
			}
			if (slave.skill.whoring > 10) {
				if (V.summaryStats) {
					r.textContent += `[${slave.skill.whoring}]`;
				}
			}
			r.textContent += " ";
			if (slave.skill.entertainment >= 100) {
				r.textContent += `E+++`;
			} else if (slave.skill.entertainment > 60) {
				r.textContent += `E++`;
			} else if (slave.skill.entertainment > 30) {
				r.textContent += `E+`;
			} else if (slave.skill.entertainment > 10) {
				r.textContent += `E`;
			}
			if (slave.skill.entertainment > 10) {
				if (V.summaryStats) {
					r.textContent += `[${slave.skill.entertainment}]`;
				}
			}
		}
		if (slave.skill.combat > 0) {
			r.textContent += " C";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_prestige(slave, c) {
		if (slave.prestige > 0) {
			const styles = "green";
			if (slave.prestige > 2) {
				makeSpan(c, "Prest++", styles);
			} else if (slave.prestige === 2) {
				makeSpan(c, "Prest+", styles);
			} else if (slave.prestige === 1) {
				makeSpan(c, "Prest", styles);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_porn_prestige(slave, c) {
		if (slave.porn.prestige > 0) {
			const styles = "green";
			if (slave.porn.prestige > 2) {
				makeSpan(c, "PPrest++", styles);
			} else if (slave.porn.prestige === 2) {
				makeSpan(c, "PPrest+", styles);
			} else if (slave.porn.prestige === 1) {
				makeSpan(c, "PPrest", styles);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_intelligence(slave, c) {
		const intelligence = slave.intelligence + slave.intelligenceImplant;
		if (slave.fetish === "mindbroken") {
			return;
		}
		let education = "";
		let naturalIntelligence = "";
		let styles = undefined;
		if (slave.intelligenceImplant >= 30) {
			education = ", well educated";
		} else if (slave.intelligenceImplant >= 15) {
			education = ", educated";
		} else if (slave.intelligenceImplant <= -15) {
			education = ", hindered";
		}
		if (intelligence >= 130) {
			naturalIntelligence = "Genius";
			styles = "deepskyblue";
		} else if (intelligence > 95) {
			naturalIntelligence = "Brilliant";
			styles = "deepskyblue";
		} else if (intelligence > 50) {
			naturalIntelligence = "Very smart";
			styles = "deepskyblue";
		} else if (intelligence > 15) {
			naturalIntelligence = "Smart";
			styles = "deepskyblue";
		} else if (intelligence >= -15) {
			naturalIntelligence = "Average intelligence";
		} else if (intelligence >= -50) {
			naturalIntelligence = "Slow";
			styles = "orangered";
		} else if (intelligence >= -95) {
			naturalIntelligence = "Very slow";
			styles = "orangered";
		} else {
			naturalIntelligence = "Moronic";
			styles = "orangered";
		}
		makeSpan(c, `${naturalIntelligence}${education}`, styles, true, intelligence);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_skills(slave, c) {
		let _SSkills = (slave.skill.anal + slave.skill.oral);
		if (((_SSkills + slave.skill.whoring + slave.skill.entertainment) >= 400) && ((slave.vagina < 0) || (slave.skill.vaginal >= 100))) {
			makeSpan(c, "Masterful Sex Slave.", "aquamarine");
		} else {
			let desc;
			_SSkills += slave.skill.vaginal;
			if (_SSkills > 180) {
				desc = "Sex master";
			} else if ((_SSkills > 120) && (slave.vagina < 0)) {
				desc = "Masterful shemale";
			} else if (_SSkills > 90) {
				desc = "Sexual expert";
			} else if (_SSkills > 30) {
				desc = "Sexually skilled";
			} else {
				desc = "Sexually unskilled";
			}
			if (desc) {
				makeSpan(c, desc, "aquamarine", true, Math.trunc(_SSkills));
				desc = "";
			}
			if (slave.skill.whoring >= 100) {
				desc = "Masterful whore";
			} else if (slave.skill.whoring >= 60) {
				desc = "Expert whore";
			} else if (slave.skill.whoring >= 30) {
				desc = "Skilled whore";
			} else if (slave.skill.whoring >= 10) {
				desc = "Basic whore";
			}
			if (desc) {
				makeSpan(c, desc, "aquamarine", true, slave.skill.whoring);
				desc = "";
			}
			if (slave.skill.entertainment >= 100) {
				desc = "Masterful entertainer";
			} else if (slave.skill.entertainment >= 60) {
				desc = "Expert entertainer";
			} else if (slave.skill.entertainment >= 30) {
				desc = "Skilled entertainer";
			} else if (slave.skill.entertainment >= 10) {
				desc = "Basic entertainer";
			}
			if (desc) {
				makeSpan(c, desc, "aquamarine", true, slave.skill.entertainment);
				desc = "";
			}
		}
		if (slave.skill.combat > 0) {
			makeSpan(c, "Trained fighter.", "aquamarine");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_prestige(slave, c) {
		if (slave.prestige > 0) {
			const styles = "green";
			if (slave.prestige > 2) {
				makeSpan(c, "Extremely prestigious.", styles);
			} else if (slave.prestige === 2) {
				makeSpan(c, "Very prestigious.", styles);
			} else if (slave.prestige === 1) {
				makeSpan(c, "Prestigious.", styles);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_porn_prestige(slave, c) {
		if (slave.porn.prestige > 0) {
			const styles = "green";
			if (slave.porn.prestige > 2) {
				makeSpan(c, "Porn star.", styles);
			} else if (slave.porn.prestige === 2) {
				makeSpan(c, "Porn slut.", styles);
			} else if (slave.porn.prestige === 1) {
				makeSpan(c, "Porn amateur.", styles);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_fetish(slave, c) {
		let descStr = "";
		switch (slave.fetish) {
			case "submissive":
				if (slave.fetishStrength > 95) {
					descStr = `Sub++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Sub+`;
				} else {
					descStr = `Sub`;
				}
				break;
			case "cumslut":
				if (slave.fetishStrength > 95) {
					descStr = `Oral++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Oral+`;
				} else {
					descStr = `Oral`;
				}
				break;
			case "humiliation":
				if (slave.fetishStrength > 95) {
					descStr = `Humil++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Humil+`;
				} else {
					descStr = `Humil`;
				}
				break;
			case "buttslut":
				if (slave.fetishStrength > 95) {
					descStr = `Anal++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Anal+`;
				} else {
					descStr = `Anal`;
				}
				break;
			case "boobs":
				if (slave.fetishStrength > 95) {
					descStr = `Boobs++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Boobs+`;
				} else {
					descStr = `Boobs`;
				}
				break;
			case "sadist":
				if (slave.fetishStrength > 95) {
					descStr = `Sadist++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Sadist+`;
				} else {
					descStr = `Sadist`;
				}
				break;
			case "masochist":
				if (slave.fetishStrength > 95) {
					descStr = `Pain++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Pain+`;
				} else {
					descStr = `Pain`;
				}
				break;
			case "dom":
				if (slave.fetishStrength > 95) {
					descStr = `Dom++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Dom+`;
				} else {
					descStr = `Dom`;
				}
				break;
			case "pregnancy":
				if (slave.fetishStrength > 95) {
					descStr = `Preg++`;
				} else if (slave.fetishStrength > 60) {
					descStr = `Preg+`;
				} else {
					descStr = `Preg`;
				}
				break;
			default:
				descStr = `Vanilla`;
				break;
		}
		if (V.summaryStats) {
			descStr += `[${slave.fetishStrength}]`;
		}
		makeSpan(c, descStr, "lightcoral");
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_attraction(slave, c) {
		if (slave.attrXY <= 5) {
			makeSpan(c, "XY---", "red", false, slave.attrXY);
		} else if (slave.attrXY <= 15) {
			makeSpan(c, "XY--", "red", false, slave.attrXY);
		} else if (slave.attrXY <= 35) {
			makeSpan(c, "XY---", "red", false, slave.attrXY);
		} else if (slave.attrXY <= 65) {
			makeSpan(c, "XY", undefined, false, slave.attrXY);
		} else if (slave.attrXY <= 85) {
			makeSpan(c, "XY+", "green", false, slave.attrXY);
		} else if (slave.attrXY <= 95) {
			makeSpan(c, "XY++", "green", false, slave.attrXY);
		} else if (slave.attrXX > 95) {
			if (slave.energy <= 95) {
				makeSpan(c, "Omni!", "green");
			} else {
				makeSpan(c, "Omni+Nympho!!", "green");
			}
		} else {
			makeSpan(c, "XY+++", "green", false, slave.attrXY);
		}
		if (slave.attrXX <= 5) {
			makeSpan(c, "XX---", "red", false, slave.attrXX);
		} else if (slave.attrXX <= 15) {
			makeSpan(c, "XX--", "red", false, slave.attrXX);
		} else if (slave.attrXX <= 35) {
			makeSpan(c, "XX-", "red", false, slave.attrXX);
		} else if (slave.attrXX <= 65) {
			makeSpan(c, "XX", undefined, false, slave.attrXX);
		} else if (slave.attrXX <= 85) {
			makeSpan(c, "XX+", "green", false, slave.attrXX);
		} else if (slave.attrXX <= 95) {
			makeSpan(c, "XX++", "green", false, slave.attrXX);
		} else if (slave.attrXY <= 95) {
			makeSpan(c, "XX+++", "green", false, slave.attrXX);
		}
		if (slave.energy > 95) {
			if ((slave.attrXY <= 95) || (slave.attrXX <= 95)) {
				makeSpan(c, "Nympho!", "green");
			}
		} else if (slave.energy > 80) {
			makeSpan(c, "SD++", "green", false, slave.energy);
		} else if (slave.energy > 60) {
			makeSpan(c, "SD+", "green", false, slave.energy);
		} else if (slave.energy > 40) {
			makeSpan(c, "SD", "green", false, slave.energy);
		} else if (slave.energy > 20) {
			makeSpan(c, "SD-", "red", false, slave.energy);
		} else {
			makeSpan(c, "SD--", "red", false, slave.energy);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_smart_fetish(slave, c) {
		function settingStr() {
			if (slave.fetishKnown === 1) {
				if (slave.clitSetting === "off") {
					return `SP-`;
				} else if (((slave.fetish !== "submissive") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "submissive")) {
					return `SP:sub`;
				} else if (((slave.fetish !== "cumslut") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "oral")) {
					return `SP:oral`;
				} else if (((slave.fetish !== "humiliation") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "humiliation")) {
					return `SP:humil`;
				} else if (((slave.fetish !== "buttslut") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "anal")) {
					return `SP:anal`;
				} else if (((slave.fetish !== "boobs") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "boobs")) {
					return `SP:boobs`;
				} else if (((slave.fetish !== "sadist") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "sadist")) {
					return `SP:sade`;
				} else if (((slave.fetish !== "masochist") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "masochist")) {
					return `SP:pain`;
				} else if (((slave.fetish !== "dom") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "dom")) {
					return `SP:dom`;
				} else if (((slave.fetish !== "pregnancy") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "pregnancy")) {
					return `SP:preg`;
				} else if (((slave.fetish !== "none") && (slave.clitSetting === "vanilla"))) {
					return `SP:vanilla`;
				} else if ((slave.energy <= 95) && (slave.clitSetting === "all")) {
					return `SP:all`;
				} else if ((slave.energy > 5) && (slave.clitSetting === "none")) {
					return `SP:none`;
				} else if (!["anti-men", "anti-women", "men", "women"].includes(slave.clitSetting)) {
					return `SP:monitoring`;
				}
			} else {
				switch (slave.clitSetting) {
					case "off":
						return `SP-`;
					case "submissive":
						return `SP:sub`;
					case "lesbian":
						return `SP:les`;
					case "oral":
						return `SP:oral`;
					case "humiliation":
						return `SP:humil`;
					case "anal":
						return `SP:anal`;
					case "boobs":
						return `SP:boobs`;
					case "sadist":
						return `SP:sade`;
					case "masochist":
						return `SP:pain`;
					case "dom":
						return `SP:dom`;
					case "pregnancy":
						return `SP:pregnancy`;
					case "vanilla":
						return `SP:vanilla`;
					case "all":
						return `SP:all`;
					case "none":
						return `SP:none`;
				}
			}
			return null;
		}
		const s = settingStr();
		if (s) {
			makeSpan(c, settingStr());
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_smart_attraction(slave, c) {
		function settingStr() {
			if (slave.attrKnown === 1) {
				if (slave.clitSetting === "women") {
					if (slave.attrXX < 95) {
						return `SP:women`;
					} else {
						return `SP:monitoring`;
					}
				} else if (slave.clitSetting === "men") {
					if (slave.attrXY < 95) {
						return `SP:men`;
					} else {
						return `SP:monitoring`;
					}
				} else if (slave.clitSetting === "anti-women") {
					if (slave.attrXX > 0) {
						return `SP:anti-women`;
					} else {
						return `SP:monitoring`;
					}
				} else if (slave.clitSetting === "anti-men") {
					if (slave.attrXY > 0) {
						return `SP:anti-men`;
					} else {
						return `SP:monitoring`;
					}
				}
			} else {
				if (slave.clitSetting === "women") {
					return `SP:women`;
				} else if (slave.clitSetting === "men") {
					return `SP:men`;
				} else if (slave.clitSetting === "anti-women") {
					return `SP:anti-women`;
				} else if (slave.clitSetting === "anti-men") {
					return `SP:anti-men`;
				}
			}
			return null;
		}
		const s = settingStr();
		if (s) {
			makeSpan(c, settingStr());
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_behavior_flaw(slave, c) {
		function descStr() {
			switch (slave.behavioralFlaw) {
				case "arrogant":
					return `Arrog`;
				case "bitchy":
					return `Bitchy`;
				case "odd":
					return `Odd`;
				case "hates men":
					return `Men-`;
				case "hates women":
					return `Women-`;
				case "gluttonous":
					return `Glut`;
				case "anorexic":
					return `Ano`;
				case "devout":
					return `Dev`;
				case "liberated":
					return `Lib`;
				default:
					slave.behavioralFlaw = "none";
					return null;
			}
		}
		const s = descStr();
		if (s) {
			makeSpan(c, descStr(), "red");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_sex_flaw(slave, c) {
		switch (slave.sexualFlaw) {
			case "hates oral":
				makeSpan(c, "Oral-", "red");
				break;
			case "hates anal":
				makeSpan(c, "Anal-", "red");
				break;
			case "hates penetration":
				makeSpan(c, "Fuck-", "red");
				break;
			case "shamefast":
				makeSpan(c, "Shame", "red");
				break;
			case "idealistic":
				makeSpan(c, "Ideal", "red");
				break;
			case "repressed":
				makeSpan(c, "Repre", "red");
				break;
			case "apathetic":
				makeSpan(c, "Apath", "red");
				break;
			case "crude":
				makeSpan(c, "Crude", "red");
				break;
			case "judgemental":
				makeSpan(c, "Judge", "red");
				break;
			case "cum addict":
				makeSpan(c, "CumAdd", "yellow");
				break;
			case "anal addict":
				makeSpan(c, "AnalAdd", "yellow");
				break;
			case "attention whore":
				makeSpan(c, "Attention", "yellow");
				break;
			case "breast growth":
				makeSpan(c, "BoobObsess", "yellow");
				break;
			case "abusive":
				makeSpan(c, "Abusive", "yellow");
				break;
			case "malicious":
				makeSpan(c, "Malice", "yellow");
				break;
			case "self hating":
				makeSpan(c, "SelfHatr", "yellow");
				break;
			case "neglectful":
				makeSpan(c, "SelfNeglect", "yellow");
				break;
			case "breeder":
				makeSpan(c, "BreedObsess", "yellow");
				break;
			default:
				slave.sexualFlaw = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_behavior_quirk(slave, c) {
		function descStr() {
			switch (slave.behavioralQuirk) {
				case "confident":
					return `Confid`;
				case "cutting":
					return `Cutting`;
				case "funny":
					return `Funny`;
				case "fitness":
					return `Fit`;
				case "adores women":
					return `Women+`;
				case "adores men":
					return `Men+`;
				case "insecure":
					return `Insec`;
				case "sinful":
					return `Sinf`;
				case "advocate":
					return `Advoc`;
				default:
					slave.behavioralQuirk = "none";
					return null;
			}
		}
		const s = descStr();
		if (s) {
			makeSpan(c, s, "green");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_sex_quirk(slave, c) {
		function descStr() {
			switch (slave.sexualQuirk) {
				case "gagfuck queen":
					return `Gagfuck`;
				case "painal queen":
					return `Painal`;
				case "strugglefuck queen":
					return `Struggle`;
				case "tease":
					return `Tease`;
				case "romantic":
					return `Romantic`;
				case "perverted":
					return `Perverted`;
				case "caring":
					return `Caring`;
				case "unflinching":
					return `Unflinch`;
				case "size queen":
					return `SizeQ`;
				default:
					slave.sexualQuirk = "none";
					return null;
			}
		}
		const s = descStr();
		if (s) {
			makeSpan(c, s, "green");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_fetish(slave, c) {
		function fetishStr() {
			switch (slave.fetish) {
				case "submissive":
					if (slave.fetishStrength > 95) {
						return "Complete submissive";
					} else if (slave.fetishStrength > 60) {
						return "Submissive";
					} else {
						return "Submissive tendencies";
					}
				case "cumslut":
					if (slave.fetishStrength > 95) {
						return "Cumslut";
					} else if (slave.fetishStrength > 60) {
						return "Oral fixation";
					} else {
						return "Prefers oral";
					}
				case "humiliation":
					if (slave.fetishStrength > 95) {
						return "Humiliation slut";
					} else if (slave.fetishStrength > 60) {
						return "Exhibitionist";
					} else {
						return "Interest in humiliation";
					}
				case "buttslut":
					if (slave.fetishStrength > 95) {
						return "Buttslut";
					} else if (slave.fetishStrength > 60) {
						return "Anal fixation";
					} else {
						return "Prefers anal";
					}
				case "boobs":
					if (slave.fetishStrength > 95) {
						return "Boobslut";
					} else if (slave.fetishStrength > 60) {
						return "Breast fixation";
					} else {
						return "Loves boobs";
					}
				case "sadist":
					if (slave.fetishStrength > 95) {
						return "Complete sadist";
					} else if (slave.fetishStrength > 60) {
						return "Sadist";
					} else {
						return "Sadistic tendencies";
					}
				case "masochist":
					if (slave.fetishStrength > 95) {
						return "Complete masochist";
					} else if (slave.fetishStrength > 60) {
						return "Masochist";
					} else {
						return "Masochistic tendencies";
					}
				case "dom":
					if (slave.fetishStrength > 95) {
						return "Complete dom";
					} else if (slave.fetishStrength > 60) {
						return "Dominant";
					} else {
						return "Dominant tendencies";
					}
				case "pregnancy":
					if (slave.fetishStrength > 95) {
						return "Pregnancy fetish";
					} else if (slave.fetishStrength > 60) {
						return "Pregnancy kink";
					} else {
						return "Interest in impregnation";
					}
				default:
					return "Sexually vanilla";
			}
		}
		makeSpan(c, fetishStr(), "lightcoral", true, slave.fetishStrength);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_attraction(slave, c) {
		if (slave.attrXY <= 5) {
			makeSpan(c, "Disgusted by men", "red", true, slave.attrXY);
		} else if (slave.attrXY <= 15) {
			makeSpan(c, "Turned off by men", "red", true, slave.attrXY);
		} else if (slave.attrXY <= 35) {
			makeSpan(c, "Not attracted to men", "red", true, slave.attrXY);
		} else if (slave.attrXY <= 65) {
			makeSpan(c, "Indifferent to men", undefined, true, slave.attrXY);
		} else if (slave.attrXY <= 85) {
			makeSpan(c, "Attracted to men", "green", true, slave.attrXY);
		} else if (slave.attrXY <= 95) {
			makeSpan(c, "Aroused by men", "green", true, slave.attrXY);
		} else if (slave.attrXX > 95) {
			if (slave.energy <= 95) {
				makeSpan(c, "Omnisexual!", "green");
			} else {
				makeSpan(c, "Omnisexual nymphomaniac!", "green");
			}
		} else {
			makeSpan(c, "Passionate about men", "green", true, slave.attrXY);
		}
		if (slave.attrXX <= 5) {
			makeSpan(c, "disgusted by women", "red", true, slave.attrXX);
		} else if (slave.attrXX <= 15) {
			makeSpan(c, "turned off by women", "red", true, slave.attrXX);
		} else if (slave.attrXX <= 35) {
			makeSpan(c, "not attracted to women", "red", true, slave.attrXX);
		} else if (slave.attrXX <= 65) {
			makeSpan(c, "indifferent to women", undefined, true, slave.attrXX);
		} else if (slave.attrXX <= 85) {
			makeSpan(c, "attracted to women", "green", true, slave.attrXX);
		} else if (slave.attrXX <= 95) {
			makeSpan(c, "aroused by women", "green", true, slave.attrXX);
		} else if (slave.attrXY <= 95) {
			makeSpan(c, "passionate about women", "green", true, slave.attrXX);
		}
		if (slave.energy > 95) {
			if ((slave.attrXY <= 95) || (slave.attrXX <= 95)) {
				makeSpan(c, "Nymphomaniac!", "green");
			}
		} else if (slave.energy > 80) {
			makeSpan(c, "Powerful sex drive", "green", true, slave.energy);
		} else if (slave.energy > 60) {
			makeSpan(c, "Good sex drive", "green", true, slave.energy);
		} else if (slave.energy > 40) {
			makeSpan(c, "Average sex drive", "yellow", true, slave.energy);
		} else if (slave.energy > 20) {
			makeSpan(c, "Poor sex drive", "red", true, slave.energy);
		} else {
			makeSpan(c, "No sex drive", "red", true, slave.energy);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_smart_fetish(slave, c) {
		function descStr() {
			if (slave.fetishKnown === 1) {
				if (slave.clitSetting === "off") {
					return `SP off.`;
				} else if (((slave.fetish !== "submissive") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "submissive")) {
					return `SP: submissive.`;
				} else if (((slave.fetish !== "cumslut") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "oral")) {
					return `SP: oral.`;
				} else if (((slave.fetish !== "humiliation") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "humiliation")) {
					return `SP: humiliation.`;
				} else if (((slave.fetish !== "buttslut") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "anal")) {
					return `SP: anal.`;
				} else if (((slave.fetish !== "boobs") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "boobs")) {
					return `SP: breasts.`;
				} else if (((slave.fetish !== "sadist") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "sadist")) {
					return `SP: sadism.`;
				} else if (((slave.fetish !== "masochist") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "masochist")) {
					return `SP: masochism.`;
				} else if (((slave.fetish !== "dom") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "dom")) {
					return `SP: dominance.`;
				} else if (((slave.fetish !== "pregnancy") || (slave.fetishStrength <= 95)) && (slave.clitSetting === "pregnancy")) {
					return `SP: pregnancy.`;
				} else if ((slave.fetish !== "none") && (slave.clitSetting === "vanilla")) {
					return `SP: vanilla.`;
				} else if ((slave.energy <= 95) && (slave.clitSetting === "all")) {
					return `SP: all.`;
				} else if ((slave.energy > 5) && (slave.clitSetting === "none")) {
					return `SP: none.`;
				} else if (!["anti-men", "anti-women", "men", "women"].includes(slave.clitSetting)) {
					return `SP: monitoring.`;
				}
			} else {
				switch (slave.clitSetting) {
					case "off":
						return `SP off.`;
					case "submissive":
						return `SP: submissive.`;
					case "oral":
						return `SP: oral.`;
					case "humiliation":
						return `SP: humiliation.`;
					case "anal":
						return `SP: anal.`;
					case "boobs":
						return `SP: breasts.`;
					case "sadist":
						return `SP: sadism.`;
					case "masochist":
						return `SP: masochism.`;
					case "dom":
						return `SP: dominance.`;
					case "pregnancy":
						return `SP: pregnancy.`;
					case "vanilla":
						return `SP: vanilla.`;
					case "all":
						return `SP: all.`;
					case "none":
						return `SP: none.`;
				}
			}
			return null;
		}
		const s = descStr();
		if (s) {
			makeSpan(c, s);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_smart_attraction(slave, c) {
		if (slave.attrKnown === 1) {
			if ((slave.attrXX < 100) && (slave.clitSetting === "women")) {
				makeSpan(c, `SP: women.`);
			} else if ((slave.attrXY < 100) && (slave.clitSetting === "men")) {
				makeSpan(c, `SP: men.`);
			}
		} else {
			if (slave.clitSetting === "women") {
				makeSpan(c, `SP: women.`);
			} else if (slave.clitSetting === "men") {
				makeSpan(c, `SP: men.`);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_behavior_flaw(slave, c) {
		function descStr() {
			switch (slave.behavioralFlaw) {
				case "arrogant":
					return `Arrogant.`;
				case "bitchy":
					return `Bitchy.`;
				case "odd":
					return `Odd.`;
				case "hates men":
					return `Hates men.`;
				case "hates women":
					return `Hates women.`;
				case "gluttonous":
					return `Stress eater.`;
				case "anorexic":
					return `Anorexic.`;
				case "devout":
					return `Devoutly religious.`;
				case "liberated":
					return `Mentally liberated.`;
				default:
					slave.behavioralFlaw = "none";
					return null;
			}
		}
		const s = descStr();
		if (s) {
			makeSpan(c, s, "red");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_sex_flaw(slave, c) {
		switch (slave.sexualFlaw) {
			case "hates oral":
			case "hates anal":
			case "hates penetration":
			case "shamefast":
				makeSpan(c, slave.sexualFlaw, "red", true);
				break;
			case "idealistic":
			case "repressed":
			case "apathetic":
			case "crude":
			case "judgemental":
				makeSpan(c, `Sexually ${slave.sexualFlaw}.`, "red");
				break;
			case "cum addict":
			case "anal addict":
			case "attention whore":
				makeSpan(c, slave.sexualFlaw, "yellow", true);
				break;
			case "breast growth":
				makeSpan(c, `Breast obsession.`, "yellow");
				break;
			case "abusive":
			case "malicious":
				makeSpan(c, `Sexually ${slave.sexualFlaw}.`, "yellow");
				break;
			case "self hating":
				makeSpan(c, `Self hatred.`, "yellow");
				break;
			case "neglectful":
				makeSpan(c, `Self neglectful.`, "yellow");
				break;
			case "breeder":
				makeSpan(c, `Breeding obsession.`, "yellow");
				break;
			default:
				slave.sexualFlaw = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_behavior_quirk(slave, c) {
		switch (slave.behavioralQuirk) {
			case "confident":
			case "cutting":
			case "funny":
			case "fitness":
			case "adores women":
			case "adores men":
			case "insecure":
			case "sinful":
			case "advocate":
				makeSpan(c, slave.behavioralQuirk, "green", true);
				break;
			default:
				slave.behavioralQuirk = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_sex_quirk(slave, c) {
		switch (slave.sexualQuirk) {
			case "gagfuck queen":
			case "painal queen":
			case "strugglefuck queen":
			case "tease":
			case "romantic":
			case "perverted":
			case "caring":
			case "unflinching":
			case "size queen":
				makeSpan(c, slave.sexualQuirk, "green", true);
				break;
			default:
				slave.sexualQuirk = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function short_extended_family(slave) {
		let res = "";
		let handled = 0;
		if (slave.mother > 0) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.mother);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s ${getPronouns(slave).daughter}`;
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(slave);
					res += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			res += " ";
		} else if (slave.mother === -1) {
			res += `Your ${getPronouns(slave).daughter}`;
			if (slave.relationship < -1) {
				res += ` & ${PCrelationshipTerm(slave)}`;
				handled = 1;
			}
			res += " ";
		} else if (slave.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			res += `${V.missingTable[slave.mother].fullName}'s ${getPronouns(slave).daughter} `;
		}
		if (slave.father > 0 && slave.father !== slave.mother) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.father);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s ${getPronouns(slave).daughter}`;
				if (slave.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(slave);
					res += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			res += " ";
		} else if (slave.father === -1 && slave.mother !== -1) {
			res += `Your ${getPronouns(slave).daughter}`;
			if (slave.relationship < -1) {
				res += ` & ${PCrelationshipTerm(slave)}`;
				handled = 1;
			}
			res += " ";
		} else if (slave.father in V.missingTable && slave.father !== slave.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			res += `${V.missingTable[slave.father].fullName}'s ${getPronouns(slave).daughter}`;
		}
		if (slave.daughters === 1) {
			let _ssj = V.slaves.findIndex(s => s.mother === slave.ID);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s mother`;
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(slave);
					res += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			res += " ";
			_ssj = V.slaves.findIndex(s => s.father === slave.ID);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s father`;
				if (slave.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(slave);
					res += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			res += " ";
		} else if (slave.daughters > 1) {
			res += `multiple daughters `;
		}
		if (slave.sisters === 1) {
			const _ssj = V.slaves.findIndex(s => areSisters(s, slave) > 0);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s ${getPronouns(slave).sister}`;
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(slave);
					res += `& ${friendShipShort}`;
					handled = 1;
				}
			}
			res += " ";
		} else if (slave.sisters > 1) {
			res += `multiple sisters `;
		}
		if (slave.relationship > 0 && handled !== 1) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.relationshipTarget);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s`;
				const friendShipShort = relationshipTermShort(slave);
				res += ` ${friendShipShort}`;
			}
		} else if (slave.relationship === -3 && slave.mother !== -1 && slave.father !== -1) {
			res += `Your ${getPronouns(slave).wife}`;
		} else if (slave.relationship === -2) {
			res += `E Bonded`;
		} else if (slave.relationship === -1) {
			res += `E Slut`;
		}
		return res;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function short_legacy_family(slave) {
		let res = "";
		if (slave.relation !== 0) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.relationTarget);
			if (_ssj !== -1) {
				res += `${SlaveFullName(V.slaves[_ssj])}'s ${slave.relation}`;
			}
		}
		if (slave.relationship > 0) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.relationshipTarget);
			if (_ssj !== -1) {
				const friendship = relationshipTerm(slave);
				if (slave.relationshipTarget !== slave.relationTarget) {
					res += `${SlaveFullName(V.slaves[_ssj])}'s`;
				} else {
					res += ` &`;
				}
				res += ` ${friendship}`;
			}
		} else if (slave.relationship === -3) {
			res += `Your ${getPronouns(slave).wife}`;
		} else if (slave.relationship === -2) {
			res += `E Bonded`;
		} else if (slave.relationship === -1) {
			res += `E Slut`;
		}
		return res;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_clone(slave, c) {
		if (slave.clone !== 0) {
			makeSpan(c, "Clone");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function short_rival(slave, c) {
		if (slave.rivalry !== 0) {
			const block = makeBlock(c, "lightsalmon");
			const _ssj = V.slaves.findIndex(s => s.ID === slave.rivalryTarget);
			if (_ssj !== -1) {
				if (slave.rivalry <= 1) {
					block.textContent = `Disl ${SlaveFullName(V.slaves[_ssj])}`;
				} else if (slave.rivalry <= 2) {
					block.textContent = `${SlaveFullName(V.slaves[_ssj])}'s rival`;
				} else {
					block.textContent = `Hates ${SlaveFullName(V.slaves[_ssj])}`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_extended_family(slave, c) {
		let handled = 0;
		const block = makeBlock();
		if (slave.mother > 0) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.mother);
			if (_ssj !== -1) {
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				const tmpSpan = makeSpan(block, getPronouns(slave).daughter, "lightgreen");
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(slave);
					tmpSpan.textContent += ` and ${friendShipShort}`;
					handled = 1;
				}
				tmpSpan.textContent += '.';
			}
		} else if (slave.mother === -1) {
			addText(block, `Your `);
			if (slave.relationship < -1) {
				makeSpan(block, `${getPronouns(slave).daughter} and ${PCrelationshipTerm(slave)}.`, "lightgreen");
				handled = 1;
			} else {
				makeSpan(block, `${getPronouns(slave).daughter}.`, "lightgreen");
			}
		} else if (slave.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			addText(block, `${V.missingTable[slave.mother].fullName}'s `);
			makeSpan(block, `${getPronouns(slave).daughter}.`, "lightgreen");
		}
		if (slave.father > 0 && slave.father !== slave.mother) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.father);
			if (_ssj !== -1) {
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				const tmpSpan = makeSpan(block, getPronouns(slave).daughter, "lightgreen");
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(slave);
					tmpSpan.textContent += ` and ${friendShipShort}`;
					handled = 1;
				}
				tmpSpan.textContent += '.';
			}
		} else if (slave.father === -1 && slave.father !== slave.mother) {
			addText(block, `Your `);
			if (slave.relationship < -1) {
				makeSpan(block, `${getPronouns(slave).daughter} and ${PCrelationshipTerm(slave)}.`, "lightgreen");
				handled = 1;
			} else {
				makeSpan(block, `${getPronouns(slave).daughter}.`, "lightgreen");
			}
		} else if (slave.father in V.missingTable && slave.father !== slave.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			addText(block, `${V.missingTable[slave.father].fullName}'s `);
			makeSpan(block, `${getPronouns(slave).daughter}.`, "lightgreen");
		}
		if (areSisters(V.PC, slave) > 0) {
			addText(block, `Your `);
			if (slave.relationship < -1) {
				makeSpan(block, `${relativeTerm(V.PC, slave)} and ${PCrelationshipTerm(slave)}.`, "lightgreen");
				handled = 1;
			} else {
				makeSpan(block, `${relativeTerm(V.PC, slave)}.`, "lightgreen");
			}
		}
		if (slave.daughters === 1) {
			let _ssj = V.slaves.findIndex(s => s.mother === slave.ID);
			if (_ssj !== -1) {
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				const tmpSpan = makeSpan(block, "mother", "lightgreen");
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(slave);
					tmpSpan.textContent += ` and ${friendShipShort}`;
					handled = 1;
				}
				tmpSpan.textContent += '.';
			}
			_ssj = V.slaves.findIndex(s => s.father === slave.ID);
			if (_ssj !== -1) {
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				const tmpSpan = makeSpan(block, "father", "lightgreen");
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(slave);
					tmpSpan.textContent += ` and ${friendShipShort}`;
					handled = 1;
				}
				tmpSpan.textContent += '.';
			}
		} else if (slave.daughters > 1) {
			if (slave.daughters > 10) {
				makeSpan(block, "Has tons of daughters.", "lightgreen");
			} else if (slave.daughters > 5) {
				makeSpan(block, "Has many daughters.", "lightgreen");
			} else {
				makeSpan(block, "Has several daughters.", "lightgreen");
			}
		}
		if (slave.sisters === 1) {
			const _ssj = V.slaves.findIndex(s => areSisters(s, slave) > 0);
			if (_ssj !== -1) {
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				const tmpSpan = makeSpan(block, getPronouns(slave).sister, "lightgreen");
				if (slave.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(slave);
					tmpSpan.textContent += ` and ${friendShipShort}`;
					handled = 1;
				}
				tmpSpan.textContent += '.';
			}
		} else if (slave.sisters > 1) {
			if (slave.sisters > 10) {
				makeSpan(block, "One of many sisters.", "lightgreen");
			} else if (slave.sisters > 5) {
				makeSpan(block, "Has many sisters.", "lightgreen");
			} else {
				makeSpan(block, "Has several sisters.", "lightgreen");
			}
		}
		if (slave.relationship > 0 && handled !== 1) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.relationshipTarget);
			if (_ssj !== -1) {
				const friendship = relationshipTerm(slave);
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				makeSpan(block, `${friendship}.`, "lightgreen");
			}
		} else if (slave.relationship === -3 && slave.mother !== -1 && slave.father !== -1 && areSisters(V.PC, slave) === 0) {
			makeSpan(block, `Your ${getPronouns(slave).wife}.`, "lightgreen");
		} else if (slave.relationship === -2) {
			makeSpan(block, "Emotionally bonded to you.", "lightgreen");
		} else if (slave.relationship === -1) {
			makeSpan(block, "Emotional slut.", "lightgreen");
		}

		if (block.textContent.length > 0) {
			c.appendChild(block);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_legacy_family(slave, c) {
		const block = makeBlock();
		if (slave.relation !== 0) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.relationTarget);
			if (_ssj !== -1) {
				addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				if (slave.relationshipTarget !== slave.relationTarget) {
					makeSpan(block, `${slave.relation}.`, "lightgreen");
				} else {
					makeSpan(block, `${slave.relation}`, "lightgreen");
				}
			}
		}
		if (slave.relationship > 0) {
			const _ssj = V.slaves.findIndex(s => s.ID === slave.relationshipTarget);
			if (_ssj !== -1) {
				const friendship = relationshipTerm(slave);
				if (slave.relationshipTarget !== slave.relationTarget) {
					addText(block, `${SlaveFullName(V.slaves[_ssj])}'s `);
				} else {
					addText(block, `and `);
				}
				makeSpan(block, `${friendship}.`, "lightgreen");
			}
		} else if (slave.relationship === -3) {
			makeSpan(block, `Your ${getPronouns(slave).wife}.`, "lightgreen");
		} else if (slave.relationship === -2) {
			makeSpan(block, "Emotionally bonded to you.", "lightgreen");
		} else if (slave.relationship === -1) {
			makeSpan(block, "Emotional slut.", "lightgreen");
		}

		if (block.textContent.length > 0) {
			c.appendChild(block);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_clone(slave, c) {
		if (slave.clone !== 0) {
			makeSpan(c, `Clone of ${slave.clone}.`, "skyblue");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_rival(slave, c) {
		if (slave.rivalry !== 0) {
			const block = makeBlock(c);
			const _ssj = V.slaves.findIndex(s => s.ID === slave.rivalryTarget);
			if (_ssj !== -1) {
				if (slave.rivalry <= 1) {
					makeSpan(block, "Dislikes", "lightsalmon");
					block.appendChild(document.createTextNode(` ${SlaveFullName(V.slaves[_ssj])}.`));
				} else if (slave.rivalry <= 2) {
					block.appendChild(document.createTextNode(`${SlaveFullName(V.slaves[_ssj])}'s `));
					makeSpan(block, "rival.", "lightsalmon");
				} else {
					makeSpan(block, "Hates", "lightsalmon");
					block.appendChild(document.createTextNode(` ${SlaveFullName(V.slaves[_ssj])}.`));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_clothes(slave, c) {
		function descStr() {
			switch (slave.clothes) {
				case "attractive lingerie":
					return `Nice lingerie.`;
				case "a succubus outfit":
					return `Succubus outfit.`;
				case "a string bikini":
					return `String bikini.`;
				case "a scalemail bikini":
					return `Scalemail bikini.`;
				case "striped panties":
					return `Striped panties.`;
				case "a monokini":
					return `Monokini.`;
				case "an apron":
					return `Apron.`;
				case "a cybersuit":
					return `Cybersuit.`;
				case "cutoffs and a t-shirt":
					return `Cutoffs, t-shirt.`;
				case "a slutty outfit":
					return `Slutty outfit.`;
				case "uncomfortable straps":
					return `Leather straps.`;
				case "a fallen nuns habit":
					return `Slutty habit.`;
				case "a chattel habit":
					return `Chattel habit.`;
				case "a penitent nuns habit":
					return `Cilice.`;
				case "slutty jewelry":
					return `Bangles.`;
				case "attractive lingerie for a pregnant woman":
					return `Preggo lingerie.`;
				case "a maternity dress":
					return `Maternity dress.`;
				case "stretch pants and a crop-top":
					return `Stretch pants, crop-top.`;
				case "harem gauze":
					return `Harem outfit.`;
				case "a slave gown":
					return `Slave gown.`;
				case "a halter top dress":
					return `Halter top dress.`;
				case "a mini dress":
					return `Mini dress.`;
				case "a ball gown":
					return `Ball gown.`;
				case "slutty business attire":
					return `Slutty suit.`;
				case "nice business attire":
					return `Nice suit.`;
				case "a comfortable bodysuit":
					return `Bodysuit.`;
				case "a military uniform":
					return `Military uniform.`;
				case "a schutzstaffel uniform":
					return `Schutzstaffel uniform.`;
				case "a slutty schutzstaffel uniform":
					return `Slutty Schutzstaffel uniform.`;
				case "a red army uniform":
					return `Red Army uniform.`;
				case "a long qipao":
					return `Long Qipao.`;
				case "battlearmor":
					return `Battlearmor.`;
				case "a mounty outfit":
					return `Mounty outfit.`;
				case "a dirndl":
					return `Dirndl.`;
				case "lederhosen":
					return `Lederhosen.`;
				case "a biyelgee costume":
					return `Biyelgee costume.`;
				case "a leotard":
					return `Leotard.`;
				case "a bunny outfit":
					return `Bunny outfit.`;
				case "a slutty maid outfit":
					return `Slutty maid.`;
				case "a nice maid outfit":
					return `Nice maid.`;
				case "a slutty nurse outfit":
					return `Slutty nurse.`;
				case "a nice nurse outfit":
					return `Nice nurse.`;
				case "a schoolgirl outfit":
					return `Schoolgirl outfit.`;
				case "a kimono":
					return `Kimono.`;
				case "a hijab and abaya":
					return `Hijab and abaya.`;
				case "battledress":
					return `Battledress.`;
				case "a latex catsuit":
					return `Nice latex.`;
				case "restrictive latex":
					return `Bondage latex.`;
				case "conservative clothing":
					return `Conservative clothing.`;
				case "chains":
					return `Chains.`;
				case "overalls":
					return `Overalls.`;
				case "a cheerleader outfit":
					return `Cheerleader.`;
				case "clubslut netting":
					return `Netting.`;
				case "shibari ropes":
					return `Shibari.`;
				case "Western clothing":
					return `Chaps.`;
				case "body oil":
					return `Body oil.`;
				case "a toga":
					return `Toga.`;
				case "a huipil":
					return `Huipil.`;
				case "a slutty qipao":
					return `Slutty qipao.`;
				case "spats and a tank top":
					return `Spats, tank top.`;
				case "a burkini":
					return `Burkini.`;
				case "a niqab and abaya":
					return `Niqab and abaya.`;
				case "a klan robe":
					return `Klan robe.`;
				case "a hijab and blouse":
					return `Hijab and blouse.`;
				case "a burqa":
					return `Burqa.`;
				case "kitty lingerie":
					return `Kitty lingerie.`;
				case "a tube top and thong":
					return `Tube top, thong.`;
				case "a button-up shirt and panties":
					return `Button-up shirt, panties.`;
				case "a gothic lolita dress":
					return `Gothic lolita dress.`;
				case "a hanbok":
					return `Hanbok.`;
				case "a bra":
					return `Nice bra.`;
				case "a button-up shirt":
					return `Nice button-up shirt.`;
				case "a nice pony outfit":
					return `Nice pony outfit.`;
				case "a sweater":
					return `Nice sweater.`;
				case "a tank-top":
					return `Nice tank-top.`;
				case "a thong":
					return `Nice thong.`;
				case "a tube top":
					return `Nice tube top.`;
				case "a one-piece swimsuit":
					return `Swimsuit.`;
				case "a police uniform":
					return `Police uniform.`;
				case "a striped bra":
					return `Striped bra.`;
				case "a skimpy loincloth":
					return `Skimpy loincloth.`;
				case "a slutty klan robe":
					return `Slutty klan robe.`;
				case "a slutty pony outfit":
					return `Slutty pony outfit.`;
				case "a Santa dress":
					return `Santa dress.`;
				case "a sports bra":
					return `Sports bra.`;
				case "a sweater and panties":
					return `Sweater, panties.`;
				case "a t-shirt":
					return `T-shirt.`;
				case "a tank-top and panties":
					return `Tank-top, panties.`;
				case "a t-shirt and thong":
					return `Thong, t-shirt.`;
				case "an oversized t-shirt and boyshorts":
					return `Over-sized t-shirt, boy shorts.`;
				case "an oversized t-shirt":
					return `Nice over-sized t-shirt.`;
				case "a t-shirt and jeans":
					return `Blue jeans, t-shirt.`;
				case "boyshorts":
					return `Boy shorts.`;
				case "cutoffs":
					return `Jean shorts.`;
				case "leather pants and pasties":
					return `Leather pants, pasties.`;
				case "leather pants":
					return `Nice leather pants.`;
				case "panties":
					return `Nice panties.`;
				case "sport shorts and a t-shirt":
					return `Nice sport shorts, shirt.`;
				case "a t-shirt and panties":
					return `Panties, t-shirt.`;
				case "panties and pasties":
					return `Pasties, panties.`;
				case "pasties":
					return `Pasties.`;
				case "striped underwear":
					return `Striped underwear`;
				case "sport shorts and a sports bra":
					return `Shorts, bra.`;
				case "jeans":
					return `Tight blue jeans.`;
				case "a sweater and cutoffs":
					return `Jean shorts, sweater.`;
				case "leather pants and a tube top":
					return `Leather pants, tube top.`;
				case "sport shorts":
					return `Shorts.`;
				case "a bimbo outfit":
					return `Bimbo outfit.`;
				case "a courtesan dress":
					return `Courtesan dress.`;
				default:
					return `Naked.`;
			}
		}
		makeSpan(c, descStr());
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_collar(slave, c) {
		function descStr() {
			switch (slave.collar) {
				case "uncomfortable leather":
					return `Leather collar.`;
				case "tight steel":
					return `Steel collar.`;
				case "preg biometrics":
					return `Pregnancy biometrics collar.`;
				case "cruel retirement counter":
					return `Cruel counter collar.`;
				case "shock punishment":
					return `Shock collar.`;
				case "dildo gag":
					return `Dildo gag.`;
				case "massive dildo gag":
					return `Throat-bulging dildo gag.`;
				case "neck corset":
					return `Neck corset.`;
				case "stylish leather":
					return `Stylish leather collar.`;
				case "satin choker":
					return `Satin choker.`;
				case "silk ribbon":
					return `Silken ribbon.`;
				case "heavy gold":
					return `Gold collar.`;
				case "bowtie":
					return `Bowtie collar.`;
				case "pretty jewelry":
					return `Pretty collar.`;
				case "nice retirement counter":
					return `Nice counter collar.`;
				case "bell collar":
					return `Bell collar.`;
				case "leather with cowbell":
					return `Cowbell collar.`;
				case "ancient Egyptian":
					return `Wesekh.`;
				case "ball gag":
					return `Ball gag.`;
				case "bit gag":
					return `Bit gag.`;
				case "porcelain mask":
					return `Porcelain mask.`;
				default:
					return null;
			}
		}
		const s = descStr();
		if (s) {
			makeSpan(c, s);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_belly(slave, c) {
		function descStr() {
			switch (slave.bellyAccessory) {
				case "shapewear":
					return `Shapewear.`;
				case "a small empathy belly":
					return `Small fake belly.`;
				case "a medium empathy belly":
					return `Medium fake belly.`;
				case "a large empathy belly":
					return `Large fake belly.`;
				case "a huge empathy belly":
					return `Huge fake belly.`;
				case "a corset":
					return `Corset.`;
				case "an extreme corset":
					return `Extreme corsetage.`;
				case "a support band":
					return `Support band.`;
				default:
					return null;
			}
		}
		const s = descStr();
		if (s) {
			makeSpan(c, s);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_arms(slave, c) {
		if (["hand gloves", "elbow gloves"].includes(slave.armAccessory)) {
			makeSpan(c, slave.armAccessory, undefined, true);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_legs(slave, c) {
		if (slave.legAccessory === "short stockings") {
			makeSpan(c, "Short stockings.");
		} else if (slave.legAccessory === "long stockings") {
			makeSpan(c, "Long stockings.");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_shoes(slave, c) {
		if (["boots", "extreme heels", "extreme platform heels", "flats", "heels", "platform heels", "platform shoes", "pumps"].includes(slave.shoes)) {
			makeSpan(c, slave.shoes, undefined, true);
		} else if (slave.heels === 1) {
			makeSpan(c, "Crawling.", "yellow");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_chastity(slave, c) {
		if (slave.chastityAnus === 1 && slave.chastityPenis === 1 && slave.chastityVagina === 1) {
			makeSpan(c, "Full chastity.");
		} else if (slave.chastityPenis === 1 && slave.chastityVagina === 1) {
			makeSpan(c, "Genital chastity.");
		} else if ((slave.chastityAnus === 1 && slave.chastityVagina === 1) || (slave.chastityAnus === 1 && slave.chastityPenis === 1)) {
			makeSpan(c, "Combined chastity.");
		} else if (slave.chastityVagina === 1) {
			makeSpan(c, "Vaginal chastity.");
		} else if (slave.chastityPenis === 1) {
			makeSpan(c, "Chastity cage.");
		} else if (slave.chastityAnus === 1) {
			makeSpan(c, "Anal chastity.");
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_vaginal_acc(slave, c) {
		if (slave.vaginalAttachment !== "vibrator") {
			switch (slave.vaginalAccessory) {
				case "bullet vibrator":
					makeSpan(c, "Attached bullet vibrator.");
					break;
				case "smart bullet vibrator":
					makeSpan(c, "Attached smart bullet vibrator.");
					break;
				case "dildo":
					makeSpan(c, "Vaginal dildo.");
					break;
				case "large dildo":
					makeSpan(c, "Large vaginal dildo.");
					break;
				case "huge dildo":
					makeSpan(c, "Huge vaginal dildo.");
					break;
				case "long dildo":
					makeSpan(c, "Long vaginal dildo.");
					break;
				case "long, large dildo":
					makeSpan(c, "Long and large vaginal dildo.");
					break;
				case "long, huge dildo":
					makeSpan(c, "Long and wide vaginal dildo.");
					break;
			}
		}
		if (slave.vaginalAttachment !== "none") {
			switch (slave.vaginalAttachment) {
				case "vibrator":
					makeSpan(c, "Vibrating dildo.");
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_dick_acc(slave, c) {
		switch (slave.dickAccessory) {
			case "sock":
				makeSpan(c, "Cock sock.");
				break;
			case "bullet vibrator":
				makeSpan(c, "Frenulum bullet vibrator.");
				break;
			case "smart bullet vibrator":
				makeSpan(c, "Smart frenulum bullet vibrator.");
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function long_buttplug(slave, c) {
		switch (slave.buttplug) {
			case "plug":
				makeSpan(c, "Buttplug.");
				break;
			case "large plug":
				makeSpan(c, "Large buttplug.");
				break;
			case "huge plug":
				makeSpan(c, "Huge buttplug.");
				break;
			case "long plug":
				makeSpan(c, "Long buttplug.");
				break;
			case "long, large plug":
				makeSpan(c, "Large, long buttplug.");
				break;
			case "long, huge plug":
				makeSpan(c, "Enormous buttplug.");
				break;
		}
		switch (slave.buttplugAttachment) {
			case "tail":
				makeSpan(c, "Attached tail.");
				break;
			case "cat tail":
				makeSpan(c, "Attached cat tail.");
				break;
			case "fox tail":
				makeSpan(c, "Attached fox tail.");
				break;
			case "cow tail":
				makeSpan(c, "Attached cow tail.");
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function rules_assistant(slave, c) {
		if (slave.useRulesAssistant === 0) {
			makeSpan(c, "RA-Exempt", "lightgreen");
		} else if (V.abbreviateRulesets === 2 && (slave.currentRules !== undefined) && (slave.currentRules.length > 0)) {
			c.innerHTML = `Rules: ${V.defaultRules.filter(x => ruleApplied(slave, x)).map(x => x.name).join(", ")}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Node} c
	 * @returns {void}
	 */
	function origins(slave, c) {
		const para = makeParagraph(c);
		para.classList.add("gray");
		const pronouns = getPronouns(slave);
		para.textContent = `${slave.origin.replace(/\$([A-Z]?[a-z]+)/g, (match, cap1) => pronouns[cap1] || match)}`;
	}

	/**
	 * @param {HTMLElement} element
	 * @param {string|string[]} [classNames]
	 */
	function _addClassNames(element, classNames) {
		if (classNames != undefined) { /* eslint-disable-line eqeqeq */
			if (Array.isArray(classNames)) {
				element.classList.add(...classNames);
			} else {
				element.classList.add(classNames);
			}
		}
	}

	/**
	 * @param {Node} container
	 * @param {string} text
	 * @param {string|string[]} [classNames]
	 * @param {boolean} [stdDecor=false]
	 * @param {number} [value]
	 */
	function makeSpan(container, text, classNames, stdDecor = false, value) {
		let r = document.createElement("span");
		r.classList.add("ssi");
		_addClassNames(r, classNames);
		if (value != undefined && V.summaryStats) { /* eslint-disable-line eqeqeq */
			text += `[${value}]`;
		}
		r.textContent = stdDecor ? `${capFirstChar(text)}.` : text;
		if (container) {
			container.appendChild(r);
		}
		return r;
	}

	/**
	 * @param {Node} container
	 * @param {string} text
	 * @returns {Text}
	 */
	function addText(container, text) {
		const r = document.createTextNode(text);
		if (container) {
			container.appendChild(r);
		}
		return r;
	}

	/**
	 * @param {Node} [container]
	 * @param {string|string[]} [classNames]
	 */
	function makeBlock(container, classNames) {
		let r = document.createElement("span");
		r.classList.add("ssb");
		_addClassNames(r, classNames);
		if (container) {
			container.appendChild(r);
		}
		return r;
	}

	/**
	 * @param {Node} container
	 * @param {string|string[]} [classNames]
	 * @returns {HTMLParagraphElement}
	 */
	function makeParagraph(container, classNames) {
		let r = document.createElement("p");
		r.classList.add("si");
		_addClassNames(r, classNames);
		if (container) {
			container.appendChild(r);
		}
		return r;
	}

	return SlaveSummary;
})();
