window.VCheck = (function() {
	"use strict";
	/* eslint-disable no-unused-vars*/
	let he;
	let him;
	let his;
	let hers;
	let himself;
	let boy;
	let He;
	let His;
	/* eslint-enable */

	return {
		Anal: AnalVCheck,
		Vaginal: VaginalVCheck,
		Both: BothVCheck,
		Simple: SimpleVCheck,
		Partner: PartnerVCheck
	};

	function setScopedPronouns(slave) {
		({
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave));
	}

	/** call as VCheck.Anal()
	 * @param {number} [times=1] is how many times to increment the anal counts.
	 * @returns {string}
	 */
	function AnalVCheck(times = 1) {
		const slave = V.activeSlave;
		let r = '';
		setScopedPronouns(slave);

		if (canDoAnal(slave) && slave.anus === 0) {
			r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin ass.</span> `;
			if (slave.devotion > 50 || slave.career === "a slave since birth") {
				r += `Since it's ${his} first time, you gently ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. Before long ${he}'s moaning loudly as you continue working away at ${his} butthole. `;
				if (slave.tankBaby === 2) {
					r += `${He} thinks of losing ${his} anal virginity to ${his} ${WrittenMaster(slave)} a <span class="hotpink">necessity.</span> ${He} expects ${his} asshole to be seeing a lot more attention now.`;
				} else {
					r += `${He} thinks of losing ${his} anal virginity to you as a <span class="hotpink">connection</span> with ${his} beloved ${WrittenMaster(slave)}. `;
					if ((slave.fetishKnown && slave.fetish === "buttslut") || (slave.energy > 95) || (slave.attrXX >= 85 && V.PC.dick === 0)) {
						r += `${He} can't wait to be fucked in the ass by you again.`;
					} else {
						r += `${He} looks forward to having ${his} asshole fucked by you again.`;
					}
				}
				slave.devotion += 4;
			} else if (slave.devotion > 20) {
				r += `Since it's ${his} first time, you gently ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. ${His} moans become louder and louder as you continue working away at ${his} butthole. ${He} accepts the pain and humiliation of anal sex as part of ${his} sexual servitude, though ${he} hopes that ${his} next time will be less painful.`;
			} else if (slave.devotion >= -20) {
				r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="gold">fears</span> ${his} next anal sex, remembering the pain of losing ${his} anal virginity. ${He} dreads having ${his} ass violated by you again.`;
				slave.trust -= 5;
			} else {
				r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for violating ${his} virgin butt. ${He} dreads having ${his} ass fucked by you again.`;
				slave.trust -= 5;
				slave.devotion -= 5;
			}
			slave.anus = 1;
		}
		if (canDoAnal(slave)) {
			if (canImpreg(slave, V.PC)) {
				r += knockMeUp(slave, 10, 1, -1, 1);
			}
			actX(slave, "anal", times);
		}
		return r;
	}

	/** call as VCheck.Vaginal()
	 * @param {number} [times=1] is how many times to increment the vaginal counts.
	 * @returns {string}
	 */
	function VaginalVCheck(times = 1) {
		const slave = V.activeSlave;
		let r = '';
		setScopedPronouns(slave);

		if (canDoVaginal(slave) && slave.vagina === 0) {
			r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin pussy.</span> `;
			if (slave.devotion > 50 || slave.career === "a slave since birth") {
				r += `You ease yourself into ${his} pussy, since it's ${his} first time, then gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
				if (slave.tankBaby === 2) {
					r += `${He} thinks of losing ${his} virginity to ${his} ${WrittenMaster(slave)} a <span class="hotpink">necessity to be happy.</span> ${He} expects ${his} pussy to be seeing a lot more attention in the future.`;
				} else {
					r += `<span class="hotpink">${He} enjoys losing ${his} cherry to you.</span> `;
					if ((slave.fetishKnown && slave.fetish === "pregnancy") || (slave.energy > 95) || (slave.attrXY >= 85 && V.PC.dick > 0)) {
						r += `${He} can't wait to have ${his} pussy fucked by you again.`;
					} else {
						r += `${He} looks forward to having ${his} pussy fucked by you again.`;
					}
				}
				slave.devotion += 4;
			} else if (slave.devotion > 20) {
				r += `You ease yourself into ${his} pussy, since it's ${his} first time, then gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} accepts losing ${his} virginity to ${his} owner and ${he} looks forward to having ${his} pussy fucked by you again.`;
			} else if (slave.devotion >= -20) {
				r += `You force yourself into ${his} pussy. ${He} sobs and cries with disgust while you continue thrusting into ${his} fuck hole. ${He} <span class="mediumorchid">hates</span> losing ${his} virginity this way and <span class="gold">fears</span> the next time you'll conquer ${him}. ${He} dreads getting violated by you again.`;
				slave.trust -= 5;
				slave.devotion -= 5;
			} else {
				r += `You force yourself into ${his} pussy. ${He} sobs and cries with disgust while you continue working ${his} fuck hole. ${He} tries to struggle, but you only pound harder. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for robbing ${his} of ${his} virginity. ${He} dreads getting fucked by you again.`;
				slave.trust -= 10;
				slave.devotion -= 15;
			}
			slave.vagina = 1;
		}
		if (canDoVaginal(slave)) {
			if (canImpreg(slave, V.PC)) {
				r += knockMeUp(slave, 10, 0, -1, 1);
			}
			actX(slave, "vaginal", times);
		}
		return r;
	}

	/** call as VCheck.Both()
	 * @param {number} [analTimes=1] how many times to increment the anal counts, if there is no vagina available.
	 * @param {number} [bothTimes=1] how many times to increment both holes counts (usually it is half of analTimes).
	 * @returns {string}
	 */
	function BothVCheck(analTimes = 1, bothTimes = 1) {
		const slave = V.activeSlave;
		let r = '';
		setScopedPronouns(slave);

		if (canDoVaginal(slave)) {
			if (slave.vagina === 0) {
				if (canDoAnal(slave) && slave.anus === 0) {
					r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin holes.</span> `;
					if (slave.devotion > 50 || slave.career === "a slave since birth") {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy before gradually working your way into ${his} ass and alternate between the two holes while ${he} moans. `;
						if (slave.tankBaby === 2) {
							r += `${He} believes you taking ${his} virgin holes <span class="hotpink">will keep ${him} from suffering.</span> ${He} expects you to require ${his} holes as tribute again soon.`;
						} else {
							r += `<span class="hotpink">${He}'s so devoted ${he} enjoys being fucked in both holes for the first time.</span> ${He} looks forward to having ${his} holes fucked by you again.`;
						}
						slave.devotion += 4;
					} else if (slave.devotion <= 20) {
						r += `You force yourself into ${his} pussy before working your way into ${his} ass. ${He} sobs and cries with disgust while you alternate between the two holes. ${He} <span class="mediumorchid">hates</span> losing ${his} virginity and anal virginity in one <span class="gold">brutal</span> incident. ${He} dreads having ${his} holes violated by you again.`;
						slave.trust -= 5;
						slave.devotion -= 5;
					} else {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy before gradually working your way into ${his} ass and alternate between the two holes while ${he} moans. ${He} accepts being fucked in both holes for the first time. ${He} looks forward to having ${his} holes fucked by you again.`;
					}
					slave.anus = 1;
				} else {
					r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin pussy.</span> `;
					if (slave.devotion > 50 || slave.career === "a slave since birth") {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
						if (slave.tankBaby === 2) {
							r += `${He} thinks of losing ${his} virginity to ${his} ${WrittenMaster(slave)} a <span class="hotpink">necessity to be happy.</span> ${He} expects ${his} pussy to be seeing a lot more attention in the future.`;
						} else {
							r += `<span class="hotpink">${He} enjoys losing ${his} cherry to you.</span> ${He} looks forward to having ${his} pussy fucked by you again.`;
						}
						slave.devotion += 4;
					} else if (slave.devotion <= 20) {
						r += `You force yourself into ${his} pussy. ${He} sobs and cries with disgust while you continue working ${his} fuck hole. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for taking ${his} virginity. ${He} dreads having ${his} pussy violated by you again.`;
						slave.trust -= 5;
						slave.devotion -= 5;
					} else {
						r += `As it's ${his} first time, you ease yourself into ${his} pussy before gradually increasing the intensity of your thrusts while ${he} softly moans. ${He} accepts losing ${his} virginity to ${his} owner and ${he} looks forward to having ${his} pussy fucked by you again.`;
					}
				}
				slave.vagina = 1;
			} else if (canDoAnal(slave) && slave.anus === 0) {
				r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin ass.</span> `;
				if (slave.devotion > 50 || slave.career === "a slave since birth") {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
					if (slave.tankBaby === 2) {
						r += `${He} thinks of losing ${his} anal virginity to ${his} ${WrittenMaster(slave)} a <span class="hotpink">necessity.</span> ${He} expects ${his} asshole to be seeing a lot more attention now.`;
					} else {
						r += `${He} thinks of losing ${his} anal virginity to you as a <span class="hotpink">connection</span> with ${his} beloved ${WrittenMaster(slave)}. ${He} looks forward to having ${his} asshole fucked by you again.`;
					}
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. ${He} accepts the pain and humiliation of anal sex as part of ${his} sexual servitude, though ${he} hopes that ${his} next time will be less painful.`;
				} else if (slave.devotion >= -20) {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="gold">fears</span> ${his} next anal sex, remembering the pain of losing ${his} anal virginity. ${He} dreads having ${his} ass violated by you again.`;
					slave.trust -= 5;
				} else {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for violating ${his} virgin butt. ${He} dreads having ${his} ass fucked by you again.`;
					slave.trust -= 5;
					slave.devotion -= 5;
				}
				slave.anus = 1;
			}
			if (canDoAnal(slave)) {
				actX(slave, "vaginal", bothTimes);
				actX(slave, "anal", bothTimes);
				if (canImpreg(slave, V.PC)) {
					r += knockMeUp(slave, 10, 2, -1, 1);
				}
			} else {
				actX(slave, "vaginal", bothTimes);
				if (canImpreg(slave, V.PC)) {
					r += knockMeUp(slave, 10, 0, -1, 1);
				}
			}
		} else if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				r += `<span class="lime">This breaks in ${slave.slaveName}'s virgin ass.</span> `;
				if (slave.devotion > 50 || slave.career === "a slave since birth") {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually speed up your thrusts while ${he} slowly learns to move ${his} hips along with you. ${He} moans loudly. `;
					if (slave.tankBaby === 2) {
						r += `${He} thinks of losing ${his} anal virginity to ${his} ${WrittenMaster(slave)} a <span class="hotpink">necessity.</span> ${He} expects ${his} asshole to be seeing a lot more attention now.`;
					} else {
						r += `${He} thinks of losing ${his} anal virginity to you as a <span class="hotpink">connection</span> with ${his} beloved ${WrittenMaster(slave)}. ${He} looks forward to having ${his} asshole fucked by you again.`;
					}
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r += `As it's ${his} first time, you ease yourself into ${his} butthole and gradually increase the intensity of your thrusts. ${He} accepts the pain and humiliation of anal sex as part of ${his} sexual servitude, though ${he} hopes that ${his} next time will be less painful.`;
				} else if (slave.devotion >= -20) {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="gold">fears</span> ${his} next anal sex, remembering the pain of losing ${his} anal virginity. ${He} dreads having ${his} ass violated by you again.`;
					slave.trust -= 5;
				} else {
					r += `You force yourself into ${his} butthole. ${He} sobs and cries with disgust while you continue thrusting into ${his} ass. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for violating ${his} virgin butt. ${He} dreads having ${his} ass fucked by you again.`;
					slave.trust -= 5;
					slave.devotion -= 5;
				}
				slave.anus = 1;
			}
			actX(slave, "vaginal", analTimes);
			if (canImpreg(slave, V.PC)) {
				r += knockMeUp(slave, 10, 1, -1, 1);
			}
		}
		return r;
	}

	/** call as VCheck.Simple()
	 * @param {number} [times=1] how many times to increment either the Vaginal or the Anal counts, if there is no Vagina available.
	 * @returns {string}
	 */
	function SimpleVCheck(times = 1) {
		if (canDoVaginal(State.variables.activeSlave)) {
			return VaginalVCheck(times);
		} else if (canDoAnal(State.variables.activeSlave)) {
			return AnalVCheck(times);
		}
	}

	/* call as VCheck.Partner()
	Before using this function, set $partner to the index of the partner in the $slaves array
	analTimes is how many times to increment the Anal counts, if there is no Vagina available.
	bothTimes is how many times to increment both holes counts (usually it is half of Anal).
	In both cases if left undefined it will assume it to be 1.
	This also checks for a valid Vagina/Accessory, though most code I've seen does this already, you
	never know when someone might use the routine and forget to do such.
	*/
	function PartnerVCheck(analTimes = 1, bothTimes = 1) {
		const partner = V.slaves[V.partner];
		let r = '';
		if (partner === undefined) {
			return `<span class="red">PartnerVCheck called with invalid partner '${V.partner}' from passage ${passage()}.</span>`;
		}
		setScopedPronouns(partner);

		if (canDoVaginal(partner)) {
			if (partner.vagina === 0) {
				if (canDoAnal(partner) && partner.anus === 0) {
					r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} pussy before gradually working your way into ${his} butthole, alternating between ${his} holes. <span class="lime">This breaks in ${partner.slaveName}'s virgin holes.</span> `;
					partner.vagina = 1;
					partner.anus = 1;
				} else {
					r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} pussy before gradually increasing the intensity of your thrusts. <span class="lime">This breaks in ${partner.slaveName}'s virgin pussy.</span> `;
					partner.vagina = 1;
				}
			} else if (canDoAnal(partner) && partner.anus === 0) {
				r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} butthole before gradually increasing the intensity of your thrusts into ${his} ass. <span class="lime">This breaks in ${partner.slaveName}'s virgin ass.</span> `;
				partner.anus = 1;
			}

			if (canDoAnal(partner)) {
				actX(partner, "vaginal", bothTimes);
				actX(partner, "anal", bothTimes);
				if (canImpreg(partner, V.PC)) {
					r += knockMeUp(partner, 10, 2, -1);
				}
			} else {
				actX(partner, "vaginal", bothTimes);
				if (canImpreg(partner, V.PC)) {
					r += knockMeUp(partner, 10, 0, -1);
				}
			}
		} else if (canDoAnal(partner)) {
			if (partner.anus === 0) {
				r += `Since it's ${partner.slaveName}'s first time, you take your time and gently ease yourself into ${his} butthole before gradually increasing the intensity of your thrusts into ${his} ass. <span class="lime">This breaks in ${partner.slaveName}'s virgin ass.</span> `;
				partner.anus = 1;
			}
			actX(partner, "anal", analTimes);
			if (canImpreg(partner, V.PC)) {
				r += knockMeUp(partner, 10, 1, -1);
			}
		}
		return r;
	}
})();

window.SimpleSexAct = (function() {
	"use strict";

	return {
		Player: SimpleSexActPlayer,
		Slave: SimpleSlaveFucking,
		Slaves: SimpleSlaveSlaveFucking,
	};

	/**
	 * fuckCount is how many times to increment either the Vaginal, Anal, or Oral counts, depending on availability of slave.
	 * If count is left undefined it will assume it to be 1.
	 * Intended to be a simple "I want to fuck x and not have to code a bunch of logic for it".
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [fuckCount=1]
	 * @returns {string}
	 */
	function SimpleSexActPlayer(slave, fuckCount = 1) {
		let fuckTarget = 0;
		let r = "";

		for (let i = 0; i < fuckCount; i++) {
			fuckTarget = jsRandom(1, 100);
			if (slave.nipples === "fuckable" && V.PC.dick >0 && fuckTarget > 80) {
				actX(slave, "mammary");
			} else if (canDoVaginal(slave) && slave.vagina > 0 && fuckTarget > 33) {
				actX(slave, "vaginal");
				if (canImpreg(slave, V.PC)) {
					r += knockMeUp(slave, 10, 0, -1, 1);
				}
			} else if (canDoAnal(slave) && slave.anus > 0 && fuckTarget > 10) {
				actX(slave, "anal");
				if (canImpreg(slave, V.PC)) {
					r += knockMeUp(slave, 10, 1, -1, 1);
				}
			} else {
				actX(slave, "oral");
			}
		}
		return r;
	}

	/**
	 * count is how many times to increment either the Vaginal, Anal, or Oral counts, depending on availability of slave.
	 * If count is left undefined it will assume it to be 1.
	 * Intended to be a simple "x got fucked y times and I don't want to keep coding it".
	 * Pregnancy chance is handled in saLongTermEffects.tw.
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} fuckCount
	 */
	function SimpleSlaveFucking(slave, fuckCount = 1) {
		let fuckTarget = 0;

		for (let i = 0; i < fuckCount; i++) {
			fuckTarget = jsRandom(1, 100);
			if (slave.nipples === "fuckable" && fuckTarget > 80) {
				actX(slave, "mammary");
			} else if (canDoVaginal(slave) && slave.vagina > 0 && fuckTarget > 33) {
				actX(slave, "vaginal");
			} else if (canDoAnal(slave) && slave.anus > 0 && fuckTarget > 10) {
				actX(slave, "anal");
			} else {
				actX(slave, "oral");
			}
		}
	}

	/**
	 * count is how many times to increment either the Vaginal, Anal, or Oral counts, depending on availability of slave.
	 * If count is left undefined it will assume it to be 1.
	 * Intended to be a simple "x got fucked y times by z and I don't want to keep coding it".
	 * @param {App.Entity.SlaveState} subslave
	 * @param {App.Entity.SlaveState} domslave
	 * @param {number} fuckCount
	 * @returns {string}
	 */
	function SimpleSlaveSlaveFucking(subslave, domslave, fuckCount = 1) {
		let fuckTarget = 0;
		let r = "";
		let slave1ID;
		let slave2ID;
		let sex = "";

		for (let j = 0; j < fuckCount; j++) {
		// there is a reason randomization happens inside cycle - to spread fuck around, otherwise cycle isn't even needed
			fuckTarget = jsRandom(1, 100);
			if (subslave.nipples === "fuckable" && canPenetrate(domslave) && fuckTarget > 80) {
				sex = "mammary";
				if (passage() === "SA serve your other slaves") {
					if (subslave.ID === V.slaves[V.i].ID) {
						slave1ID = V.slaves[V.i].ID;
						slave2ID = domslave.ID;
					} else {
						slave1ID = subslave.ID;
						slave2ID = V.slaves[V.i].ID;
					}
				} else {
					slave1ID = subslave.ID;
					slave2ID = domslave.ID;
				}
			} else if (canDoVaginal(subslave) && subslave.vagina > 0 && canPenetrate(domslave) && fuckTarget > 33) {
				sex = "vaginal";
				if (passage() === "SA serve your other slaves") {
					if (subslave.ID === V.slaves[V.i].ID) {
						slave1ID = V.slaves[V.i].ID;
						slave2ID = domslave.ID;
					} else {
						slave1ID = subslave.ID;
						slave2ID = V.slaves[V.i].ID;
					}
				} else {
					slave1ID = subslave.ID;
					slave2ID = domslave.ID;
				}
				if (canImpreg(subslave, domslave)) {
					r += knockMeUp(subslave, 3, 0, domslave.ID, 1);
				}
			} else if (canDoAnal(subslave) && subslave.anus > 0 && canPenetrate(domslave) && fuckTarget > 10) {
				// i think would impregnate from anal here even without .mpreg? same in original widget too
				sex = "anal";
				if (canImpreg(subslave, domslave) && subslave.mpreg === 1) {
					r += knockMeUp(subslave, 3, 1, domslave.ID, 1);
				}
				if (passage() === "SA serve your other slaves") {
					if (subslave.ID === V.slaves[V.i].ID) {
						slave1ID = V.slaves[V.i].ID;
						slave2ID = domslave.ID;
					} else {
						slave1ID = subslave.ID;
						slave2ID = V.slaves[V.i].ID;
					}
				} else {
					slave1ID = subslave.ID;
					slave2ID = domslave.ID;
				}
			} else {
				actX(subslave, "oral");
			}
			if (typeof slave1ID === Number  && typeof slave2ID === Number) {
				seX(V.slaves[slave1ID], sex, V.slaves[slave2ID], "penetrative");
			}
		}
		return r;
	}
})();

/**
 * Increments a slave's personal counter and the global counter for a particular action.
 * @param {App.Entity.SlaveState} slave
 * @param {string} act oral, anal, etc
 * @param {number} count
 */
window.actX = function actX(slave, act, count = 1) {
	switch (act) {
		case "PCChildrenFathered":
			break;
		case "PCKnockedUp":
			break;
		case "anal":
			V.analTotal += count;
			break;
		case "births":
			V.birthsTotal += count;
			break;
		case "birthsTotal":
			break;
		case "cum":
			V.cumTotal += count;
			break;
		case "laborCount":
			break;
		case "mammary":
			V.mammaryTotal += count;
			break;
		case "milk":
			V.milkTotal += count;
			break;
		case "oral":
			V.oralTotal += count;
			break;
		case "penetrative":
			V.penetrativeTotal += count;
			break;
		case "pitKills":
			V.pitKillsTotal += count;
			break;
		case "publicUse":
			break;
		case "slavesFathered":
			break;
		case "slavesKnockedUp":
			break;
		case "vaginal":
			V.vaginalTotal += count;
			break;
		default:
			// Act was likely entered incorrectly.
			return;
	}
	if (act === "birth") { // Annoyingly at the moment, V.birthsTotal means all the births in your arc.  Within the slave counter though, .births is all births in your arc and .birthsTotal includes births outside your arch.
		slave.counter.birthsTotal += count;
	}
	slave.counter[act] += count;
};

/**
 * Sex is between two.  This is a handy wrapper for actX that emphasizes that.
 * @param {App.Entity.SlaveState} slave1 always a slave
 * @param {string} act1 oral, anal, etc
 * @param {App.Entity.SlaveState | string} slave2 slave or PC or "public"
 * @param {string} act2 oral, anal, etc
 * @param {number} count
 */
window.seX = function seX(slave1, act1, slave2, act2, count = 1) {
	// Slave 1 does their normal thing
	actX(slave1, act1, count);

	// Slave 2 does their normal thing.  If "Slave 2" is the public, then increment the public counter for slave 1 instead.
	if (slave2 === "public") {
		actX(slave1, "publicUse", count);
	} else if (typeof slave2 === 'string') {
		// someday we may track "slaves" and "assistant"
	} else {
		actX(slave2, act2, count);
	}
};
