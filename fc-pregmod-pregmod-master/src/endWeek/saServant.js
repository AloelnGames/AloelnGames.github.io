/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.saServant = function saServant(slave) {
	/* eslint-disable no-unused-vars*/
	const {
		he, him, his, hers, himself, boy, wife,
		He, His
	} = getPronouns(slave);
	/* eslint-enable */

	let t = `works as a servant. ${He} performs the lowest jobs in your penthouse, cleaning up after your other slaves, bathing them, helping them dress, and giving them sexual relief.`;

	if (V.servantsQuarters > 0) {
		if ((V.universalRulesFacilityWork === 1 && slave.assignment === "be a servant" && V.servantsQuartersSpots > 0) || (slave.assignment === "work as a servant")) {
			if (slave.assignment === "be a servant") {
				t += ` Since there's extra space in the servants' quarters, ${V.assistant.name} attaches ${him} to the cadre of maids there.`;
				V.servantsQuartersSpots--;
			}
			if (V.Stewardess !== 0) {
				t += ` This brings ${him} under ${V.Stewardess.slaveName}'s supervision. The Stewardess `;
				if (slave.devotion < -20) {
					t += `subjects ${him} to <span class="trust dec">corrective rape</span> when ${his} service is imperfect, <span class="devotion inc">when ${he} steps out of line,</span> or when the Stewardess just feels like raping ${him}, forcing the poor slave to <span class="yellowgreen">find refuge in work.</span>`;
					slave.devotion += 2;
					slave.trust -= 2;
				} else if (slave.devotion <= 20) {
					t += `molests ${him}, encouraging the poor slave to <span class="devotion inc">keep ${his} head down</span> and <span class="cash inc">work harder.</span>`;
					slave.devotion += 2;
				} else {
					t += `uses <span class="devotion inc">sex as a reward,</span> getting ${him} off when ${he} <span class="cash inc">works harder.</span>`;
					slave.devotion++;
				}
				if (!(canHear(slave))) {
					t += ` However, ${his} inability to hear often leaves ${him} oblivious to ${V.Stewardess.slaveName}'s orders, limiting their meaningful interactions.`;
					cashX(V.stewardessBonus / 4 * healthPenalty(slave), "houseServant", slave);
				} else if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs")) {
					t += ` However, ${he} often doesn't catch what ${V.Stewardess.slaveName} says, leading to frustration, confusion and less work done.`;
					cashX(V.stewardessBonus / 2 * healthPenalty(slave), "houseServant", slave);
				} else {
					cashX(V.stewardessBonus * healthPenalty(slave), "houseServant", slave);
				}
			}
		}
	}

	t += ` ${He} is `;
	if (slave.trust < -20) {
		t += `frightened of punishment and works very hard, <span class="cash inc">reducing the upkeep</span> of your slaves.`;
	} else if (slave.devotion < -20) {
		if (slave.trust >= 20) {
			t += `uninterested in doing such work and barely lifts a finger to <span class="cash inc">reduce the upkeep</span> of your slaves.`;
		} else {
			t += `reluctant, requiring your other slaves to force ${his} services, and does not <span class="cash inc">reduce upkeep</span> of your slaves much.`;
		}
	} else if (slave.devotion <= 20) {
		t += `hesitant, requiring your other slaves to demand ${his} services, and only slightly <span class="cash inc">reduces upkeep</span> of your slaves.`;
	} else if (slave.devotion <= 50) {
		t += `obedient, offering your other slaves ${his} services, and moderately <span class="cash inc">reduces the upkeep</span> of your slaves.`;
	} else if (slave.devotion <= 95) {
		t += `devoted, happily giving your other slaves ${his} services, and <span class="cash inc">reduces the upkeep</span> of your slaves.`;
	} else {
		t += `so happy to serve your other slaves that ${he} often sees to their needs before they know they have them, and greatly <span class="cash inc">reduces the upkeep</span> of your slaves.`;
	}

	if (slave.health.illness > 0 || slave.health.tired > 60) {
		t += ` ${He} performed worse this week due to<span class="red">`;
		if (slave.health.illness === 1) {
			t += ` feeling under the weather`;
		} else if (slave.health.illness === 2) {
			t += ` a minor illness`;
		} else if (slave.health.illness === 3) {
			t += ` being sick`;
		} else if (slave.health.illness === 4) {
			t += ` being very sick`;
		} else if (slave.health.illness === 5) {
			t += ` a terrible illness`;
		}
		if (slave.health.illness > 0 && slave.health.tired > 60) {
			t += ` and`;
		}
		if (slave.health.tired > 90) {
			t += ` exhaustion`;
		} else if (slave.health.tired > 60) {
			t += ` being tired`;
		}
		t += `.</span>`;
	}

	// TODO: this flat unchecked oral sex is a bit problematic
	// who is she serving and why aren't they benefiting?
	// is the current number of servants correct to accomplish this task?
	// why can't the player prevent this on-assignment sex while still getting the other benefits of having a servant?
	actX(slave, "oral", jsRandom(5, 10));

	if (slave.relationship === -2) {
		t += ` ${He} does ${his} best to perfect your domesticity due to ${his} emotional bond to you.`;
	} else if (slave.relationship === -3 && slave.devotion > 50) {
		t += ` ${He} does ${his} very best to be the perfect house${wife}, making ${him} an outstanding servant.`;
	}

	if (setup.servantCareers.includes(slave.career)) {
		t += ` ${He} has experience with house keeping from ${his} life before ${he} was a slave, making ${him} more effective.`;
	} else if (slave.skill.servant >= V.masteredXP) {
		t += ` ${He} has experience with house keeping from working for you, making ${him} more effective.`;
	} else {
		slave.skill.servant += jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 15) + 8);
	}

	if (slave.fetishStrength > 60) {
		if (slave.fetish === "submissive" && slave.fetishKnown === 1) {
			t += ` ${His} natural affinity for submission increases ${his} effectiveness.`;
		} else if (slave.fetishKnown === 1 && slave.fetish === "dom") {
			t += ` ${His} sexual appetite for domination reduces ${his} effectiveness.`;
		}
	}

	if (slave.energy < 20) {
		t += ` ${His} frigidity allows ${him} to ignore the intercourse all around ${him}, making ${him} very efficient.`;
	} else if (slave.energy < 40) {
		t += ` ${His} low sex drive keeps ${him} from becoming too distracted by the intercourse all around ${him}, making ${him} more efficient.`;
	}

	if (!canSeePerfectly(slave)) {
		t += ` ${His} bad vision makes ${him} a worse servant.`;
	}

	if (slave.lactation > 0) {
		t += ` Since ${he} is lactating, `;
		if (slave.devotion > 20 || slave.trust < -20) {
			t += ` ${he} serves `;
		} else {
			t += `and disobedient, ${he} is restrained to serve `;
		}
		t += `as a drink dispenser at mealtimes, and makes a meaningful contribution to ${his} fellow slaves' nutrition in concert with the feeding systems.`;
		slave.lactationDuration = 2;
		if (slave.boobsMilk > 0) {
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}
	}

	if (V.showVignettes === 1 && (slave.assignment === Job.SERVANT || slave.assignment === Job.SERVER)) {
		const vignette = GetVignette(slave);
		t += ` <span class="story-label">This week</span> ${vignette.text} `;
		if (vignette.type === "cash") {
			let modifier = FResult(slave);
			if (vignette.effect > 0) {
				t += `<span class="cash inc">making you an extra ${cashFormat(Math.trunc(modifier * vignette.effect))}.</span>`;
			} else if (vignette.effect < 0) {
				t += `<span class="cash dec">losing you ${cashFormat(Math.abs(Math.trunc(modifier * vignette.effect)))}.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			cashX(Math.trunc(modifier * vignette.effect), "houseServant", slave);
		} else if (vignette.type === "devotion") {
			if (vignette.effect > 0) {
				if (slave.devotion > 50) {
					t += `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					t += `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
				} else if (slave.devotion > -10) {
					t += `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
				} else {
					t += `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
				}
			} else if (vignette.effect < 0) {
				if (slave.devotion > 50) {
					t += `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					t += `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
				} else if (slave.devotion > -10) {
					t += `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
				} else {
					t += `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
				}
			} else {
				t += `an incident without lasting effect.`;
			}
			slave.devotion += (1 * vignette.effect);
		} else if (vignette.type === "trust") {
			if (vignette.effect > 0) {
				if (slave.trust > 20) {
					t += `<span class="trust inc">increasing ${his} trust in you.</span>`;
				} else if (slave.trust > -10) {
					t += `<span class="trust inc">reducing ${his} fear of you.</span>`;
				} else {
					t += `<span class="trust inc">reducing ${his} terror of you.</span>`;
				}
			} else if (vignette.effect < 0) {
				if (slave.trust > 20) {
					t += `<span class="trust dec">reducing ${his} trust in you.</span>`;
				} else if (slave.trust >= -20) {
					t += `<span class="trust dec">increasing ${his} fear of you.</span>`;
				} else {
					t += `<span class="trust dec">increasing ${his} terror of you.</span>`;
				}
			} else {
				t += `an incident without lasting effect.`;
			}
			slave.trust += (1 * vignette.effect);
		} else if (vignette.type === "health") {
			if (vignette.effect > 0) {
				t += `<span class="health inc">improving ${his} health.</span>`;
			} else if (vignette.effect < 0) {
				t += `<span class="health dec">affecting ${his} health.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			improveCondition(slave, 2 * vignette.effect);
		} else {
			let modifier = FResult(slave);
			if (vignette.effect > 0) {
				t += `<span class="reputation inc">gaining you a bit of reputation.</span>`;
			} else if (vignette.effect < 0) {
				t += `<span class="reputation dec">losing you a bit of reputation.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			repX((modifier * vignette.effect * 0.1), "vignette", slave);
		}
	}

	return t;
};
