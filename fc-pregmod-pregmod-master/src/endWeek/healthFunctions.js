/* Condition
	The current physical condition of the slave.
	Any health improvements get added here.
	Short term damage reduces it as it degrades.

Short term damage
	Anything that hurts a slave gets transferred into this.
	At the end of the week 25% of it will be removed and turned into condition damage instead.
	Usage of preventatives or curatives reduces the actual condition damage by 50%.

Long term damage
	Once ageing beyond 30 years old there is a chance of long term damage that increases with time. Calculated on birthday.
		Math.floor((slave.physicalAge - 25 + jsRandom(1, 15)) / 20)
	25% of the actual condition damage taken during a week also gets added to the pool (therefore gets reduced by preventatives and curatives if active).
	Nothing can reduce this value.
	Perhaps the effect can still be reduced through surgical implant with high upkeep.

Carcinogens
	Aside from a source of regular short term damage high levels will also increase the chances for severe illnesses
		3d6 rolls for illness
			illness > 8 -- 1 62.5%
			illness > 6 -- 2 21.3%
			illness > 5 -- 3 11.6%
			illness > 4 -- 4 2.8%
			illness = 3 or 4 -- 5 1.8%
		Carcinogens subtract Math.trunc(chem / 150) from the dice rolls for a max of -6 at >= 90
	There should be a natural decay of carcinogens every week of 10% of the level. But at the price of 0.2 short term damage per point of chem.
	Add carcinogen damage to serious medical procedures due to use of potent pharmaceuticals during them.

Illness
	There is always a chance a slave gets sick. Often they will just get better on their own, but sometimes it can be more serious and require a stay in the clinic.
	Sick slaves work at reduced effectiveness and will see their health lowered.

Tiredness
	Depending on various factors (living conditions, assignment, rewards, muscles, health) a slave may become more or less tired.
	Once tiredness reached 60 there will be negative effects for productivity and at 90 they become even more extreme.
	Being tired or exhausted also reduces a slave's ability to resist the player, increasing devotion and fear.

Health
	The aggregate of condition, short term damage and long term damage to provide an indication of the current overal state of the slave. The slave will die once this reached -100.
*/

/* Getting ill depends on the following factors;
	- current condition
	- long term damage (accumulated through getting old(er) and residual from short term damage)
	- short term damage (accumulated through serious illness, chemical carcinogens, damaging surgeries and other health damage sources) 125%
	- chemical carcinogens (more serious illness chance with high carcinogen levels)
	- age (long term damge takes care of older slaves, the young ones need a specific vulnerability)
	- use of curatives
	- assignment (rest, clinic, spa and master suite less likely, whoring, slutting and goloryholes more likely.)
	- random chance
	Can be blocked with preventatives.
*/

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.illness = function illness(slave) {
	const random = jsRandom(1, 100); // high rolls are good
	const H = slave.health;
	let r = ``;
	let assignBonus = 0; // bonus for healthy assignments

	let he, him, his, hers, himself, girl, loli, He, His;
	({
		he, him, his, hers, himself, girl, He, His, loli
	} = getPronouns(slave));
	let sicknessDegree = ["fine", "minor illness", "illness", "bad illness", "severe illness", "life-threatening illness"];

	// On the macro side of things disease could also happen to the acrology's population as the arcology becomes crowded, killing citizens and putting slaves at greater risk of getting ill. Again with upgrades/policies to mitigate the issue made available TODO?
	if (slave.assignment === "live with your agent" || slave.assignment === "be your agent") {
		if (H.illness !== 0) {
			H.illness = 0;
		}
		return r;
	} // Let's make sure agents don't get sick and accidentally die, they should take care of themselves
	if (slave.fuckdoll !== 0) {
		assignBonus += 50;
	} else if (slave.assignment === "get treatment in the clinic") {
		assignBonus += 40;
	} else if (slave.assignment === "rest in the spa" || slave.assignment === "rest") {
		assignBonus += 20;
	} else if ((slave.assignment === "serve in the master suite" || slave.assignment === "please you") && V.PC.skill.medicine >= 40) {
		assignBonus += 10;
	} else if (setup.nurseCareers.includes(slave.career) || slave.skill.nurse >= 100 || slave.intelligence + slave.intelligenceImplant > 95) { // Let slaves with experience or brains use it
		assignBonus += 10;
	}
	if (random < 6) { // There is always a 5% chance of a slave feeling worse or coming in contact with an illness
		if (H.illness > 0) {
			H.illness += 1 + Math.trunc((slave.chem / 10 + jsRandom(1, 50) + 15) / 100); // Illness progresses with 1, unless chem > 350, then there's a chance for 2
			r += ` <span class="red">${His} sickness has progressed.</span>`;
			if (H.illness > 5) {
				healthDamage(slave, 20 * (H.illness - 5)); // Condition penalty for going over maximum illness, very dangerous
				H.illness = 5;
				r += ` ${His} illness <span class="red">makes an attempt to claim ${his} life.</span>`;
			}
		} else {
			getIll(slave);
			if (H.illness > 0) {
				r += ` ${He} has come down with <span class="red">${addA(sicknessDegree[H.illness])}.</span>`;
			}
		}
	} else if (random > 95) { // There is always a 5% chance of a slave getting better
		H.illness -= 1;
		if (H.illness < 0) {
			H.illness = 0;
			improveCondition(slave, 5);
			r += ` <span class="green">${His} sickness has waned</span> and ${he} now feels better.`;
		} else {
			r += ` ${His} immune system <span class="green">fights back</span> against ${his} illness.`;
		}
	} else {
		/* eslint-disable camelcase */
		let nurse_effectiveness = nurseEffectiveness(slave);
		let health_adjusted = H.condition - H.longDamage - H.shortDamage * 1.25;
		let age_modifier = Math.min(Math.trunc((slave.physicalAge - 18) / 3), 0);
		let bonus_modifiers = random + assignBonus + nurse_effectiveness;
		let curativesBonus = (slave.curatives > 1 || slave.inflationType === "curative") ? 2 : 1;

		// When ill, a slave has a 60% chance of getting better the next week at complete default, 70% with a favourable assignment, 80% with curatives, 90% with both measures active and additional benefits depending on the nurse on duty
		if (H.illness > 0 && ((health_adjusted + age_modifier) / 3) + bonus_modifiers > 40 / curativesBonus) {
			if (nurse_effectiveness > 30 && (jsRandom(1, 2) === 2 || slave.assignment === "get treatment in the clinic") && H.illness > 1) { // A particularly effective nurse can improve illness faster
				H.illness -= 2;
				r += ` ${V.Nurse.slaveName} <span class="green">successfully treats</span> ${his} illness.`;
			} else {
				H.illness -= 1;
				r += ` ${His} body <span class="green">fights back</span> against ${his} illness.`;
			}
			if (H.illness === 0) {
				r += ` ${He} no longer <span class="green">shows any signs</span> of ${his} previous sickness.`;
			}
		} else if (H.illness === 0) {
			if (["guard you", "be the DJ", "be the Madam", "be confined in the arcade", "work a glory hole", "serve in the club", "serve the public", "whore", "work in the brothel"].includes(slave.assignment)) { // Limit to outside jobs only
				if (((Math.min(health_adjusted, 50) + age_modifier) / 3) + bonus_modifiers < 30 / Math.min(curativesBonus + 1, 2)) { // Chance of getting ill 30% at complete default, 20% with a favourable assignment, 15% with curatives or preventatives, 10% with both measures active and a small benefit from effective Nurse screening
					getIll(slave);
					r += ` ${He} has come down with <span class="red">${addA(sicknessDegree[H.illness])}.</span>`;
				}
			}
		} else {
			healthDamage(slave, Math.pow(H.illness, 2));
			r += ` ${He} <span class="red">suffers under ${his} ${sicknessDegree[H.illness]}.</span>`;
		}
		/* eslint-enable camelcase */
	}
	return r;
};

/**
 * Once a new illness is rolled this determines how bad it is initially, chem levels seriously increase the chances of a higher initial value. Health also factors in with weakened slaves being more likely to catch ill.
 * @param {App.Entity.SlaveState} slave
 * @returns {void}
 */
window.getIll = function getIll(slave) {
	const H = slave.health;
	const illness = jsRandom(1, 6) + jsRandom(1, 6) + jsRandom(1, 6) - Math.trunc(slave.chem / 150) + Math.trunc(H.condition / 20);
	if (V.seeIllness !== 0) {
		if (slave.curatives !== 1 && slave.inflationType !== "curative") {
			if (slave.assignment !== "get treatment in the clinic") {
				if (illness < 4) {
					H.illness = 5; // 1.8% chance
				} else if (illness < 5) {
					H.illness = 4; // 2.8% chance
				} else if (illness < 6) {
					H.illness = 3; // 11.6% chance
				} else if (illness < 8) {
					H.illness = 2; // 21.3% chance
				} else {
					H.illness = 1; // 62.5% chance
				}
			}
		}
	}
};

/**
 * Attempts to pass illness from slave1 to slave2.
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {string}
 */
window.passIllness = function passIllness(slave1, slave2) {
	if (V.seeIllness !== 0) {
		if (slave1.curatives !== 1) {
			if (slave1.assignment !== "get treatment in the clinic") {
				slave1.health.illness = ill;
			}
		}
	}
	return ` ${slave1.slaveName} has caught ${slave2.slaveName}'s sickness.`;
};

/**
 * Once a new illness is rolled this determines how bad it is initially, chem levels seriously increase the chances of a higher initial value
 * @param {App.Entity.SlaveState} slave
 * @returns {void}
 */
window.poorHealthNeedReduction = function poorHealthNeedReduction(slave) {
	// Slave .need reduction if ill or tired
	if (slave.energy > 20) {
		slave.need = Math.trunc(slave.need * healthPenalty(slave));
	}
};

/**
 * A better nurse and/or less slaves/patients to look out for makes for a better chance of curing illness
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.nurseEffectiveness = function nurseEffectiveness(slave) {
	const H = slave.health;
	const clinicUpgrade = 1; // Creating a purchasable upgrade to increase the amount of slaves the nurse can handle -- TODO
	const clinicScreening = 1; // Assumes the clinic is set to screening all slaves to improve their chances of staying healthy. Turning it off would allow the nurse to focus on just her patients in the clinic -- TODO
	if (V.Nurse !== 0) {
		const nurseSkill = setup.nurseCareers.includes(V.Nurse.career) ? 200 : V.Nurse.skill.nurse;
		let nurseEffectiveness = Math.trunc((nurseSkill * clinicUpgrade / Math.max((V.CliniciIDs.length * 10 + (V.slaves.length * 2) * clinicScreening), 1)) * 20);
		if (H.illness > 1 && slave.assignment === "get treatment in the clinic") {
			if (nurseEffectiveness < 20) {
				return nurseEffectiveness;
			} else if (nurseSkill > 80) {
				return Math.min(nurseEffectiveness, 40);
			} else if (nurseSkill > 40) {
				return Math.min(nurseEffectiveness, 30);
			} else {
				return 20;
			}
		} else if (H.illness < 2) { // reasonably ill slaves get no benefit from the nurse unless they are in the clinic, otherwise she can provide benefits to prevent illness in the first place and clearing up illnesses of level 1
			nurseEffectiveness = Math.trunc(nurseEffectiveness / 4);
			if (nurseEffectiveness < 5) {
				return nurseEffectiveness;
			} else {
				return 5;
			}
		}
	} else {
		return 0;
	}
};

/**
 * Run at the end of the week to take care of health changes
 * @param {App.Entity.SlaveState} slave
 * @returns {void}
 */
window.endWeekHealthDamage = function endWeekHealthDamage(slave) {
	const H = slave.health;
	let chemToShort = 0;
	let shortToCondition = 0;
	let shortToLong = 0;
	let tiredToCondition = 0;

	// Checking if we are dealing with the player
	// Player does not make use of most things slaves deal with, only short to long term damage
	if (slave.ID !== -1) {
		// dealing with carcinogens
		// They decay naturally at a rate of 10%, but at as they decay cause short term damage
		if (slave.chem > 0) {
			if (slave.chem > 10) {
				chemToShort += Math.max(Math.trunc(slave.chem * 0.1), 1);
			} else if (slave.chem > jsRandom(0, 9)) {
				chemToShort += 1;
			}
			slave.chem -= chemToShort;
			H.shortDamage += Math.max(Math.trunc(chemToShort * 0.1), 2);
		}

		// dealing with illness
		if (H.illness > 0) {
			H.shortDamage += Math.trunc(Math.pow(H.illness, 1.52) * 3 + 2); // 5, 10, 17, 26, 36 points of damage per respective level of illness
		}

		// Long term damage due to age calculated on birthdays only
		if (slave.birthWeek === 0 && slave.physicalAge > 29) {
			H.longDamage += Math.trunc((slave.physicalAge - 25 + jsRandom(1, 15)) / 20);
		}
	} else if (H.condition < 100) { // The player gets an automatic 5 condition recovery each weak up to 100
		H.condition = Math.min(H.condition + 5, 100);
	}

	// recovering and transferring short term damage to condition and long term
	if (H.shortDamage > 0) {
		shortToCondition += Math.max(Math.trunc(H.shortDamage * 0.5), 1); // 50% of short term damage gets transferred
		H.shortDamage -= shortToCondition;
		if (slave.assignment === "get treatment in the clinic") {
			H.shortDamage = Math.trunc(H.shortDamage * 0.5); // An aditional 50% of short term damage reduction (75% total) for getting treatment in the clinic
		} else if (slave.assignment === "rest" || slave.assignment === "rest in the spa") {
			H.shortDamage = Math.trunc(H.shortDamage * 0.75); // An additional 25% of short term damage reduction (62.5% total) for resting
		}
		if (slave.curatives > 0 || slave.ID === -1) { // transferred damage is half if on preventatives/curatives or target is the player
			shortToCondition = Math.trunc(shortToCondition * 0.5);
		}
		if (slave.assignment === "get treatment in the clinic") {
			shortToCondition = Math.trunc(shortToCondition * 0.75);
		}
		shortToLong += Math.trunc(shortToCondition * 0.1); // 10% of transferred damage gets added to long term damage, minimum of 20 short term damage before any long term damage is accumulated
		H.longDamage += shortToLong;
	}
	if (V.baseDifficulty === 1) { // Reducing longDamage up to a certain point depending on the difficulty
		if (H.longDamage > 0) {
			H.longDamage -= Math.min(Math.trunc(H.longDamage * 0.1), 1);
		}
	} else if (V.baseDifficulty === 2) {
		if (H.longDamage > 20) {
			H.longDamage -= Math.min(Math.trunc((H.longDamage - 20) * 0.1), 1);
		}
	} else if (V.baseDifficulty === 3) {
		if (H.longDamage > 40) {
			H.longDamage -= Math.min(Math.trunc((H.longDamage - 40) * 0.1), 1);
		}
	} else if (V.baseDifficulty === 4) {
		if (H.longDamage > 60) {
			H.longDamage -= Math.min(Math.trunc((H.longDamage - 60) * 0.1), 1);
		}
	}
	if (V.disableLongDamage) {
		H.longDamage = 0;
	}

	// Making sure condition doesn't get too high
	if (H.condition > 150) {
		H.condition -= Math.trunc(Math.pow(H.condition - 150, 0.5));
	}

	H.health = H.condition - H.longDamage - H.shortDamage;
};

/**
 * Tells if a slave will try to work to death due to mental hangups
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.willWorkToDeath = function willWorkToDeath(slave) {
	// More to come in the future
	if (slave.trust < -50) { // Maybe lower
		return true;
	} else if (slave.sexualFlaw === "self hating") {
		return true;
	}
	return false;
};

/**
 * Run at the end of the week to take care of tiredness changes
 * @param {App.Entity.SlaveState} slave
 * @returns {void}
 */
window.tired = function tired(slave) {
	const H = slave.health;
	let livingRules = 0;
	let assignment = 0;
	let reward = 0;
	let punishment = 0;
	// let muscles;
	// let health;
	let tiredChange;
	let spaFlag = 0;
	let dormPop = V.dormitoryPopulation - V.dormitory;

	if (!slave.fuckdoll) {
		// Assignment
		if (["rest in the spa"].includes(slave.assignment)) {
			assignment -= 40 * (V.spaUpgrade + 1); // Reduces tired by an average of 40 points while in the spa, double with the upgraded spa
			if (V.Attendant !== 0) {
				let skillBonus;
				if (setup.attendantCareers.includes(V.Attendant.career)) {
					skillBonus = 200;
				} else {
					skillBonus = V.Attendant.skill.attendant;
				}
				assignment -= Math.trunc(skillBonus / 10); // Maximum of 20 extra points of negative tiredness due to attendant skill
			}
		} else if (["rest", "get treatment in the clinic"].includes(slave.assignment)) {
			assignment -= 40; // Major tired reduction due to a solid week of rest
		} else if (["guard you"].includes(slave.assignment)) {
			assignment += 18; // A tough assignment with a girl that doesn't use her provided room unless it is attached to yours.
		} else if (["be your Head Girl"].includes(slave.assignment)) {
			assignment += 22; // Always busy. Could benefit from a helper...
		} else if (["be the Matron", "be the Stewardess", "be the Milkmaid", "be the Farmer", "be the DJ", "be the Madam", "be the Schoolteacher", "be the Wardeness", "be the Nurse"].includes(slave.assignment)) { // Heads are very busy, but always have luxurious conditions, so it balances out, save for the exceptions
			assignment += 15;
		} else if (["be the Attendant", "be your Concubine"].includes(slave.assignment)) { // Cushy head positions
			assignment += 5;
		} else if (["recruit girls"].includes(slave.assignment)) {
			if (H.tired > 80) { // I'll take it easy a week to better recruit the next.
				assignment -= 20;
			} else {
				assignment += 10;
			}
		} else if (["live with your Head Girl"].includes(slave.assignment)) {
			if (slave.tired > 60) {
				assignment += 2;
			} else if (slave.devotion > 20) {
				assignment += 5;
			} else {
				assignment += 10;
			}
		} else if (["get milked"].includes(slave.assignment)) {
			if (slave.devotion > 20) {
				assignment += 2;
			} else {
				assignment += 5;
			}
		} else if (["work in the dairy"].includes(slave.assignment)) {
			if (V.dairyRestraintsSetting > 1) {
				// assignment += 100; // Full industrial Dairy is exhausting
			} else if (V.dairyRestraintsSetting > 0) {
				assignment += 10; // Restraining while milking is a little stressful
			} else { // Being a free range cow is relatively relaxing
				if (slave.devotion > 20) {
					assignment += 2;
				} else {
					assignment += 5;
				}
			}
		} else if (["be confined in the cellblock", "stay confined"].includes(slave.assignment)) { // Generally not tiring unless a Wardeness is present, in which case she uses sleep deprivation to break slaves.
			if (slave.assignment === "be confined in the cellblock" && V.Wardeness !== 0 && slave.fetish !== "mindbroken") {
				if (V.Wardeness.fetish === "mindbroken") {
					if (H.tired > 80) {
						assignment -= 8;
					} else {
						assignment += 40;
					}
				} else if (V.Wardeness.sexualFlaw === "caring") {
					assignment += 5;
				} else if (V.Wardeness.sexualFlaw === "malicious" || V.Wardeness.sexualFlaw === "abusive") {
					if (H.condition > 20) {
						assignment += 40;
					} else if (H.tired > 80) {
						assignment -= 8;
					} else {
						assignment += 20;
					}
				} else if (H.tired > 50) {
					assignment -= 8;
				} else if (H.tired <= 30) {
					assignment += 33;
				} else {
					assignment += 20;
				}
			} else {
				assignment -= 8;
			}
		} else if (["be confined in the arcade"].includes(slave.assignment)) { // Brutal assignments
			// assignment += 50; // We should have a safeguard in place to prevent slave health meltdown while contained in the machine
		} else if (["work a glory hole", "work as a farmhand"].includes(slave.assignment)) { // Hard assignments
			if (!willWorkToDeath(slave)) {
				if (slave.tired > 90) {
					assignment += 1;
				} else if (slave.tired > 60) {
					assignment += 10;
				}
			} else {
				if (slave.devotion > 20) {
					assignment += 15;
				} else {
					assignment += 20;
				}
			}
		} else if (["serve in the club", "serve the public", "whore", "work in the brothel"].includes(slave.assignment)) { // Moderate assignments
			if (!willWorkToDeath(slave)) {
				if (slave.tired > 90) {
					assignment += 1;
				} else if (slave.tired > 70) {
					assignment += 7;
				}
			} else {
				if (slave.devotion > 20) {
					assignment += 10;
				} else {
					assignment += 15;
				}
			}
		} else if (["serve in the master suite", "please you", "be a servant"].includes(slave.assignment)) { // Easy assignments
			if (slave.tired > 75) {
				assignment += 2;
			} else if (slave.devotion > 20) {
				assignment += 5;
			} else {
				assignment += 10;
			}
		} else if (["learn in the schoolroom", "take classes"].includes(slave.assignment)) { // Trivial assignments
			if (slave.tired > 80) {
				assignment += 2;
			} else if (slave.devotion > 20) {
				assignment += 2;
			} else {
				assignment += 5;
			}
		}

		// Living Conditions
		if ((slave.assignment === "guard you" && V.dojo === 2) || (slave.assignment === "be your Head Girl" && V.HGSuite === 1)) {
			livingRules -= 20;
		} else if (slave.rules.living === "luxurious") {
			livingRules -= 15;
		} else if (slave.rules.living === "spare") {
			livingRules -= 2; // Barely reduce tiredness while sleeping in spare conditions
			if (dormPop > 10) { // Overcrowding penalty
				livingRules += 12;
			} else if (dormPop > 5) {
				livingRules += 7;
			}
		} else {
			livingRules -= 10;
			if (dormPop > 10) { // Overcrowding penalty
				livingRules += 15;
			} else if (dormPop > 5) {
				livingRules += 10;
			}
		}

		// Rewards
		if (slave.rules.reward === "drugs") {
			reward -= 4;
		} else if (slave.rules.reward === "relaxation") {
			if (V.spaSpots > 0) {
				reward -= 7;
				spaFlag = 1;
			} else {
				reward -= 5;
			}
		} else if (slave.rules.reward === "situational") {
			if (V.spaSpots > 0) {
				reward -= 4;
				spaFlag = 1;
			} else {
				reward -= 3;
			}
		}
		if (slave.devotion > 50) { // Considering how often the slave gets rewarded
			reward *= 3;
		} else if (slave.devotion > 20) {
			reward *= 2;
		} else if (slave.devotion < -20 || slave.trust >= -20) {
			reward = 0;
		}
		if (spaFlag) {
			V.spaSpots -= Math.abs(reward); // Reducing the available space in the spa depending on how often the slave can be found there
		}
		if (reward > 0) {
			if (spaFlag) {
				reward *= V.spaUpgrade + 1;
			}
		}

		// Punishments
		if (slave.rules.reward === "confinement" && V.cellblock !== 0) {
			punishment -= 2;
		}
		if (slave.devotion > 50) { // Considering how often the slave gets punished
			punishment = 0;
		} else if (slave.devotion >= -20) {
			if (slave.trust >= -20) {
				punishment *= 2;
			}
		} else {
			if (slave.trust >= -50) {
				punishment *= 3;
			}
		}

		/* Disabled for balancing
		// Muscles
		if (slave.muscles < 0) {
			muscles = -Math.trunc((slave.muscles / 10) * (1 + normalRandInt(0, 5) / 100)); // Being weak increases tiredness, building muscles eventually reduces tiredness
		} else {
			muscles = -Math.trunc(5 * (1 + normalRandInt(0, 5) / 100)); // Muscle benefits max out at 50
		}

		// Health
		health = Math.trunc((H.shortDamage / 2 - H.condition / 10) * (1 + normalRandInt(0, 5) / 100)); // Current condition reduces tiredness, health damage increases tiredness
		if (slave.assignment === "rest" || slave.assignment === "get treatment in the clinic" || slave.assignment === "rest in the spa") {
			health = Math.max(0, health); // break vicious cycle - no additional tiredness accumulates from bad health for slaves assigned to rest
		}
		*/

		// Add advanced pregnancy/high .bellyPreg (it is either caused by an advanced pregnancy or high multiples, both draining) tiredness gain gated under preg effects
		// Add pregnancy speed up effects

		tiredChange = livingRules + assignment + reward + punishment; //  + muscles + health
		H.tired += tiredChange;

		// HG special cases
		if (slave.assignment === "be your Head Girl") {
			if (V.HGSlaveSuccess === 1) {
				H.tired -= 5;
			}
			if (V.personalAttention === "HG") {
				H.tired -= 10;
			}
		}

		// H.tired = Math.clamp(H.tired, 0, 100); Disabled until hacky disabler is removed.
		if (H.tired < 0 || V.disableTiredness) {
			H.tired = 0;
		} else if (H.tired > 100) {
			H.tired = 100;
		}
	} else {
		// fuckdolls get a static tiredness drop due to drugs and suit control
		H.tired -= 30;
		if (H.tired <= 0 || V.disableTiredness) {
			H.tired = 1;
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {void}
 */
window.tiredFucks = function tiredFucks(slave) {
	/* temp disable
	if (!slave.fuckdoll && slave.fetish !== "mindbroken") {
		if (slave.assignment === "work a glory hole" || slave.assignment === "be confined in the arcade") {
			let acceptance = 0;
			acceptance += Math.trunc(slave.energy / 10);
			acceptance -= Math.trunc((slave.intelligence + slave.intelligenceImplant) / 10);
			if (slave.fetish === "masochist" || slave.fetish === "humiliation") {
				acceptance += Math.trunc(slave.fetishStrength / 10);
			}
			if ((acceptance > 20 && slave.devotion > 20) || slave.sexualFlaw === "self hating") {
				slave.health.tired += Math.trunc(slave.sexAmount * (1 + normalRandInt(0, 5) / 100) / 100);
			} else {
				slave.health.tired += Math.trunc(slave.sexAmount * (1 + normalRandInt(0, 5) / 100) / 50);
			}
		} else {
			slave.health.tired += Math.trunc(slave.sexAmount * (1 + normalRandInt(0, 5) / 100) / 25);
		}
	}
	*/
};
