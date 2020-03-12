window.saServeThePublic = (function saServeThePublic() {
	"use strict";

	let T;
	let r;
	let arcology;

	let cervixPump;
	let pronouns;
	let he, him, his, hers, himself, girl, loli, He, His;

	// if the following are set outside this file, they must be set in it too!
	let oralUse;
	let analUse;
	let vaginalUse;
	let mammaryUse;
	let penetrativeUse;

	return saServeThePublic;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function saServeThePublic(slave) {
		T = State.temporary;
		arcology = V.arcologies[0];
		r = ` `;
		({
			// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, girl, He, His, loli
		} = getPronouns(slave));

		gatherStatistics(slave);
		if (slave.assignment === "serve in the club") {
			// By being at the end, every slave after the first will get a bonus. By moving it up, the first can enjoy it too. slaveJobValues() checks Edo Revivalist, so here we are.
			applyFSDecoration(slave);
		}
		addRep(slave);
		sexCounts(slave);
		jobPreface(slave);
		bonusMultiplierText(slave);
		usageCountDescriptions(slave);
		if (V.seeAge === 1) {
			comingOfAge(slave);
		}
		mentalEffects(slave);
		physicalEffects(slave);
		slaveSkills(slave);
		if (V.showEWM === 1) {
			publicReactions(slave);
		}
		if (slave.sexualFlaw === "none") {
			addFlaw(slave);
		}
		sexualSatiation(slave);
		if (V.showVignettes === 1) {
			assignmentVignette(slave);
		}

		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function gatherStatistics(slave) {
		/* Statistics gathering */
		const facility = slave.assignment === Job.CLUB ? V.facility.club : undefined;
		T.incomeStats = getSlaveStatisticData(slave, facility);
		T.incomeStats.customers = slave.sexAmount;
		V.publicServants++;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobPreface(slave) {
		if (slave.devotion > 95 || slave.energy > 95) {
			r += `enthusiastically serves`;
		} else if (slave.devotion > 50) {
			r += `willingly serves`;
		} else if (slave.devotion > 20) {
			r += `obediently serves`;
		} else if (slave.trust < -20) {
			r += `reluctantly serves`;
		} else {
			r += `is forced to serve`;
		}
		r += ` the public.`;
	}


	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bonusMultiplierText(slave) {
		if (V.club > 0) {
			if ((V.universalRulesFacilityWork === 1 && slave.assignment === "serve the public" && V.clubSpots > 0) || (slave.assignment === "serve in the club")) {
				if (slave.assignment === "serve the public") {
					r += ` Since there's extra space in ${V.clubName}, ${he}'s promiscuous there.`;
				}
				// ads
				if (V.clubAdsSpending !== 0) {
					const adcats = App.Ads.Categories; // for brevity
					if (V.clubAdsStacked === 1 && adcats.assetSize.classifySlave(slave) === 1) {
						r += ` ${His} stacked body fits ${V.clubName}'s ad campaign, getting ${him} more attention.`;
					} else if (V.clubAdsStacked === -1 && adcats.assetSize.classifySlave(slave) === -1) {
						r += ` ${His} slim body fits ${V.clubName}'s ad campaign, getting ${him} more attention.`;
					}
					if (V.clubAdsPreg === 1 && adcats.preg.classifySlave(slave) === 1) {
						r += ` ${His} gravid body fits ${V.clubName}'s ad campaign, getting ${him} more attention.`;
					} else if (V.clubAdsPreg === -1 && adcats.preg.classifySlave(slave) === -1) {
						r += ` ${His} flat belly fits ${V.clubName}'s ad campaign, getting ${him} more attention.`;
					}
					if (V.clubAdsModded === 1 && adcats.mods.classifySlave(slave) === 1) {
						r += ` Body art like ${hers} is a major draw.`;
					} else if (V.clubAdsModded === -1 && adcats.mods.classifySlave(slave) === -1) {
						r += ` Very clean bodies like ${hers} are a major draw.`;
					}
					if (V.clubAdsImplanted === 1 && adcats.assetOrigin.classifySlave(slave) === 1) {
						r += ` Many citizens come to ${V.clubName} looking to fuck a plastic slut like ${him}.`;
					} else if (V.clubAdsImplanted === -1 && adcats.assetOrigin.classifySlave(slave) === -1) {
						r += ` Many citizens come to ${V.clubName} looking to get with a natural ${girl} like ${him}.`;
					}
					if (V.clubAdsOld === 1 && adcats.age.classifySlave(slave) === 1) {
						r += ` ${He}'s perfect for ${V.clubName}, which practically exists to match citizens up with mature slaves.`;
					} else if (V.clubAdsOld === -1 && adcats.age.classifySlave(slave) === -1) {
						r += ` ${He}'s perfect for ${V.clubName}, which practically exists to match citizens up with young slaves.`;
					} else if (V.clubAdsOld === -2 && adcats.age.classifySlave(slave) === -2) {
						r += ` ${He}'s perfect for ${V.clubName}, which practically exists to match citizens up with teenage slaves.`;
					} else if (V.clubAdsOld === -3 && adcats.age.classifySlave(slave) === -3) {
						r += ` ${He}'s perfect for ${V.clubName}, which practically exists to match citizens up with ${loli} slaves.`;
					}
					if (V.clubAdsXX === 1 && adcats.genitalia.classifySlave(slave) === 1) {
						r += ` Almost everyone who comes to ${V.clubName} is looking to fuck a ${girl} like ${him}.`;
					} else if (V.clubAdsXX === -1 && adcats.genitalia.classifySlave(slave) === -1) {
						r += ` Almost everyone who comes to ${V.clubName} is looking to poke a ${girl} who cums when buttfucked.`;
					}
				}
				if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs") || (slave.hears === -2)) {
					r += ` ${His} inability to move to the rhythm of the music is very off putting to those looking to party.`;
				}
				if (V.DJ !== 0) {
					const DJpronouns = getPronouns(V.DJ);
					if (V.DJRepBonus > 0) {
						if (slave.assignment === "serve the public") {
							r += ` Working`;
						} else {
							r += ` Living and working`;
						}
						r += ` out of the club, ${he} comes under ${SlaveFullName(V.DJ)}'s `;
						if (V.DJRepBonus < 0.1) {
							r += `completely inept`;
						} else if (V.DJRepBonus < 0.2) {
							r += `unskilled`;
						} else if (V.DJRepBonus < 0.3) {
							r += `skillful`;
						} else {
							r += `masterful`;
						}
						r += ` leadership.`;
						if (V.DJ.face > 40 && (V.DJ.intelligence + V.DJ.intelligenceImplant > 50)) {
							if (slave.devotion > 20) {
								r += ` The DJ is such a gorgeous diva that ${he}'s swept along by ${DJpronouns.possessive} charisma, and does ${his} best to be a worthy part of ${DJpronouns.possessive} entourage.`;
							}
						}
						if (V.DJignoresFlaws !== 1) {
							if (!["abusive", "anal addict", "attention whore", "breast growth", "breeder", "cum addict", "malicious", "neglectful", "none", "self hating"].includes(slave.sexualFlaw) && jsRandom(1, 100) > 90) {
								r += ` ${SlaveFullName(V.DJ)} manages to <span class="flaw break">break</span> ${slave.slaveName} of ${his} sexual flaws.`;
								slave.sexualFlaw = "none";
							} else if (slave.behavioralFlaw !== "none" && jsRandom(1, 100) > 90) {
								r += ` ${SlaveFullName(V.DJ)} manages to <span class="flaw break">break</span> ${slave.slaveName} of ${his} flaws.`;
								slave.behavioralFlaw = "none";
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function usageCountDescriptions(slave) {
		r += ` ${His} appearance attracted ${slave.sexAmount} members of the public (${Math.trunc(slave.sexAmount / 7)} a day)`;
		if (slave.sexAmount > 160) {
			r += `, so many that `;
			if (canDoVaginal(slave) && canDoAnal(slave)) {
				r += `each of ${his} holes was`;
			} else if (canDoVaginal(slave) || canDoAnal(slave)) {
				r += `each of ${his} available holes was`;
			} else {
				r += `${his} mouth and anywhere else a dick could fit was`;
			}
			r += ` often filled by more than one cock`;
		} else if (slave.sexAmount > 140) {
			r += `, so many that ${he} spent much of ${his} time getting gangbanged`;
		} else if (slave.sexAmount > 120) {
			r += `, so many that citizens often `;
			if (canDoAnal(slave) || canDoVaginal(slave)) {
				r += `spitroasted`;
			} else {
				r += `double-teamed`;
			}
			r += ` the slut`;
		} else if (slave.sexAmount > 100) {
			r += `, so many that ${he} frequently had sex with multiple citizens at once`;
		} else if (slave.sexAmount > 70) {
			r += `, so many that ${he} occasionally had sex with multiple citizens at once`;
		}
		r += `. Most of them `;
		if (slave.sexQuality > 15) {
			r += `were putty in ${his} hand`;
			if (hasBothArms(slave) || !hasAnyArms(slave)) {
				r += `s`;
				if (!hasAnyArms(slave)) {
					r += `, so to speak`;
				}
			}
			r += `.`;
		} else if (slave.sexQuality > 10) {
			r += `greatly enjoyed ${his} services.`;
		} else if (slave.sexQuality > 5) {
			r += `enjoyed ${his} body.`;
		} else {
			r += `liked using ${him}.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function comingOfAge(slave) {
		if (slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset") && arcology.FSRestart === "unset") {
			if (slave.birthWeek === 0) {
				r += ` ${He} just turned ${V.minimumSlaveAge} this week, giving ${him} an immense boost to both popularity and appeal. ${He} is also expected to become fertile soon, giving ${him} an additional boost as citizens clamor to claim ${his} fresh womb.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which it's legal to pay to fuck ${him}, giving ${him} a boost to both popularity and appeal. ${He} was also anticipated to become fertile this month, and ${his} womb is still unoccupied, giving ${him} an additional boost.`;
			}
		} else if (slave.physicalAge === V.minimumSlaveAge) {
			if (slave.birthWeek === 0) {
				r += ` ${He} just turned ${V.minimumSlaveAge} this week, giving ${him} an immense boost to both popularity and appeal.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which it's legal to pay to fuck ${him}, giving ${him} a boost to both popularity and appeal.`;
			}
		} else if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset")) {
			if (slave.birthWeek === 0) {
				r += ` ${He} is expected to become fertile soon, giving ${him} an immense boost to both popularity and appeal as citizens clamor to claim ${his} fresh womb.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which ${he} was anticipated to become fertile, and ${his} womb is still unoccupied, giving ${him} a boost to both popularity and appeal.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mentalEffects(slave) {
		if (slave.behavioralQuirk === "advocate") {
			r += ` ${slave.slaveName} <span class="devotion inc">really enjoys</span> being able to share ${his} convert's enthusiasm about slavery with new people.`;
			slave.devotion += 1;
		} else if (slave.behavioralQuirk === "funny") {
			r += ` ${slave.slaveName} <span class="devotion inc">really enjoys</span> making so many people laugh.`;
			slave.devotion += 1;
		}
		if (slave.sexualQuirk === "tease") {
			r += ` ${slave.slaveName} <span class="trust inc">trusts your judgment</span> in assigning ${him} a job that affords ${him} a chance to tease and flirt.`;
			slave.trust += 1;
		}
		if (slave.assignment === "serve in the club" && slave.devotion > 50) {
			r += ` Being so far from your presence <span class="mediumorchid">weakens ${his} intense devotion to you.</span>`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function physicalEffects(slave) {
		if (slave.assignment !== "serve in the club") {
			if (slave.curatives > 0 || slave.inflationType === "curative") {
				r += ` The drugs `;
				if (slave.inflationType === "curative") {
					r += `${he} holds within ${his} gut`;
				} else {
					r += `${he}'s on`;
				}
				r += ` protect ${him} from the wear of being a slut.`;
			} else if (slave.health.condition < -50) {
				r += ` The stress of being a slut while in terrible condition is <span class="red">very hard on ${him}.</span>`;
			} else if (slave.health.condition < -20 && jsRandom(1, 100) > 50) {
				r += ` The stress of being a slut while in poor condition is <span class="red">hard on ${him}.</span>`;
			} else if (slave.vagina < 0) {
				if (slave.minorInjury === 0) {
					r += ` ${He}'s such an expert public servant that ${he} copes with the stress of being a ${SlaveTitle(slave)} slut.`;
				} else {
					r += ` The stress of being a ${SlaveTitle(slave)} slut is <span class="red">hard on ${him}.</span>`;
				}
			} else if (slave.vagina > 0 && !canDoVaginal(slave)) {
				if (canDoAnal(slave)) {
					if (slave.minorInjury === 0) {
						r += ` ${He}'s such an expert slut that ${he} copes with the stress of being limited to buttsex and oral.`;
					} else {
						r += ` The stress of being limited to buttsex and oral is <span class="red">hard on ${him}.</span>`;
					}
				} else {
					if (slave.minorInjury === 0) {
						r += ` ${He}'s such an expert slut that ${he} copes with the stress of being limited to oral.`;
					} else {
						r += ` The stress of being limited to oral sex is <span class="red">hard on ${him}.</span>`;
					}
				}
			}
			if (slave.minorInjury !== 0) {
				if (slave.minorInjury === "sore ass") {
					r += ` Rough anal with a careless citizen left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (slave.minorInjury === "black eye") {
					r += ` A violent citizen left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (slave.minorInjury === "split lip") {
					r += ` An abusive citizen left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (slave.minorInjury === "bad bruise") {
					r += ` A rough citizen left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else {
					r += ` The hard labor of constant sex left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
				}
			}
		}

		if (slave.health.illness > 0 || slave.health.tired > 60) {
			r += ` ${He} performed worse this week due to<span class="red">`;
			if (slave.health.illness === 1) {
				r += ` feeling under the weather`;
			} else if (slave.health.illness === 2) {
				r += ` a minor illness`;
			} else if (slave.health.illness === 3) {
				r += ` being sick`;
			} else if (slave.health.illness === 4) {
				r += ` being very sick`;
			} else if (slave.health.illness === 5) {
				r += ` a terrible illness`;
			}
			if (slave.health.illness > 0 && slave.health.tired > 60) {
				r += ` and`;
			}
			if (slave.health.tired > 90) {
				r += ` exhaustion`;
			} else if (slave.health.tired > 60) {
				r += ` being tired`;
			}
			r += `.</span>`;
		}

		if (canDoVaginal(slave)) {
			if (slave.vagina === 0) {
				if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
					r += ` ${His} virginity goes to the <span class="green">citizen who most deserves the gift of a slave's cherry.</span> ${He}'s so full of aphrodisiacs that ${he} <span class="devotion inc">enjoys the experience.</span> <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion += 4;
					slave.vagina = 1;
				} else if (slave.devotion > 20) {
					r += ` ${His} virginity goes to the <span class="green">citizen who most deserves the gift of a slave's cherry.</span> Losing ${his} virginity in this way <span class="devotion inc">confirms ${his} submission to you.</span> <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion += 4;
					slave.vagina = 1;
				} else {
					r += ` ${His} virginity goes to the <span class="green">citizen who most deserves the gift of a slave's cherry.</span> ${He} tries to resist, and losing ${his} virginity to a rape makes ${him} <span class="devotion dec">hate</span> and <span class="trust dec">fear</span> you a great deal. <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion -= 10;
					slave.trust -= 10;
					slave.vagina = 1;
				}
			} else if (slave.vagina < 3) {
				if (jsRandom(1, 100) > ((170 - slave.sexAmount) + (slave.vagina * 10) + (slave.skill.vaginal / 3))) {
					r += ` <span class="change positive">${His} pussy gets loosened by the intense use.</span>`;
					slave.vagina += 1;
				}
			}
		}

		if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
					r += ` ${His} tight little anus goes to the <span class="green">most prominent citizen</span> to show an interest in an anal virgin. ${He}'s so full of aphrodisiacs that ${he} <span class="devotion inc">enjoys the experience.</span> ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion += 4;
					slave.anus = 2;
				} else if (slave.devotion > 20) {
					r += ` ${His} tight little anus goes to the <span class="green">most prominent citizen</span> to show an interest in an anal virgin. The pain and humiliation <span class="devotion inc">confirm ${his} submission to you.</span> ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion += 4;
					slave.anus = 2;
				} else {
					r += ` ${His} tight little anus goes to the <span class="green">most prominent citizen</span> to show an interest in an anal virgin. The pain and humiliation increases ${his} <span class="devotion dec">hatred</span> and <span class="trust dec">fear</span> for you. ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion -= 5;
					slave.trust -= 5;
					slave.anus = 2;
				}
			} else if (slave.anus < 3) {
				if (slave.vagina < 0) {
					if (jsRandom(1, 100) > ((150 - slave.sexAmount) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole sees constant use in place of a pussy and loosens.</span>`;
						slave.anus += 1;
					}
				} else if (!canDoVaginal(slave)) {
					if (jsRandom(1, 100) > ((150 - slave.sexAmount) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole sees constant use in place of ${his} protected pussy and loosens.</span>`;
						slave.anus += 1;
					}
				} else {
					if (jsRandom(1, 100) > ((160 - slave.sexAmount) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole loosens with constant use.</span>`;
						slave.anus += 1;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function slaveSkills(slave) {
		let skillIncrease;
		if (!setup.entertainmentCareers.includes(slave.career) && slave.skill.entertainer < V.masteredXP) {
			slave.skill.entertainer += jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 15) + 8);
		}
		if (setup.entertainmentCareers.includes(slave.career)) {
			r += ` ${He} has experience with entertainment from ${his} life before ${he} was a slave, making ${him} more effective.`;
		} else if (slave.skill.entertainer >= V.masteredXP) {
			r += ` ${He} has learned to be entertaining from working for you, making ${him} more effective.`;
		}

		if (slave.devotion > 20) {
			if (!canWalk(slave)) {
				r += ` Since ${he} can't walk, never mind dance, ${he} sits on a stool near the floor to flirt until a citizen feels like helping ${him} back to a private room.`;
			} else if (slave.skill.entertainment <= 30) {
				r += ` ${He} attracts some attention by stripping, come-ons, and simple dancing.`;
			} else if (slave.skill.entertainment <= 60) {
				r += ` ${He} attracts more attention with striptease, flirting, and erotic dancing.`;
			} else if (slave.skill.entertainment < 100) {
				r += ` ${He} attracts much attention with arousing innuendo and lusty striptease.`;
			} else {
				r += ` ${He} attracts popular attention with clever flirting and world-class erotic dancing.`;
			}
		}

		if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
			r += ` The aphrodisiac cocktail has ${him} so desperately horny that regardless of ${his} personal feelings, ${he} <span class="devotion inc">gets off with the public all week.</span> In ${his} drug-addled state ${he} doesn't remember enough to learn sexual skills.`;
			slave.devotion += 4;
		} else if (slave.devotion <= 20 && slave.energy <= 95) {
			if (slave.trust >= -20) {
				r += ` ${He} tries to refuse being treated as an open slut, so ${he} is restrained for public use. ${He} loses a bit of ${himself} to a week of rape, but remembers enough to know <span class="devotion dec">you're responsible,</span> and <span class="trust dec">can force ${him} if necessary.</span>`;
				slave.devotion -= 5;
				slave.trust -= 5;
			} else {
				r += ` ${He} doesn't show much enthusiasm, but the habit of sexual slavery <span class="devotion inc">wears away at ${his} will.</span>`;
				slave.devotion += 4;
			}
		} else {
			if ((slave.skill.oral + slave.skill.anal >= 200) && ((slave.skill.vaginal >= 100) || !canDoVaginal(slave))) {
				r += ` ${He}'s a <span class="slave skill">sexual master</span> `;
				if (canDoVaginal(slave)) {
					r += `whose`;
				} else {
					r += `and despite `;
					if (slave.vagina < 0) {
						r += `${his} lack of a`;
					} else {
						r += `the inaccessibility of ${his}`;
					}
					r += ` front hole, ${his}`;
				}
				r += ` charms are only for the <span class="green">most prominent citizens.</span> When ${he}'s not `;
				if (canDoVaginal(slave) && jsRandom(1, 4) === 1) {
					r += `pleasing high society with ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `prestigious`;
					} else {
						r += `popular`;
					}
					r += ` pussy,`;
				} else if (slave.sexAmount > 70 && jsRandom(1, 3) === 1) {
					r += `getting gangbanged,`;
				} else if (jsRandom(1, 2) === 1) {
					r += `giving away one of ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `famous`;
					} else {
						r += `top-tier`;
					}
					r += ` blowjobs,`;
				} else {
					r += `providing free access to ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `legendary`;
					} else {
						r += `notorious`;
					}
					r += ` anus,`;
				}
				r += ` ${he} offers personal training and sexual therapy.`;
			} else {
				r += ` ${He} shows diligence, and ${his} <span class="skill inc">sexual skills improve,</span> according to what the citizens demand`;
				if (!canDoVaginal(slave)) {
					r += ` and what's possible for ${him}`;
				}
				r += `.`;
				skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.oralUseWeight);
				r += ` ${SkillIncrease.Oral(slave, skillIncrease)}`;
				if (canDoVaginal(slave)) {
					skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.vaginalUseWeight);
					r += ` ${SkillIncrease.Vaginal(slave, skillIncrease)}`;
				}
				if (canDoAnal(slave)) {
					skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.analUseWeight);
					r += ` ${SkillIncrease.Anal(slave, skillIncrease)}`;
				}
			}
			if (!isAmputee(slave)) {
				if (slave.skill.entertainment < 100) {
					r += ` ${He} gains experience as a public slut.`;
					skillIncrease = (10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32));
					r += ` ${SkillIncrease.Entertain(slave, skillIncrease)}`;
				}
				if (slave.skill.entertainment > jsRandom(50, 99) && slave.skill.whore < 50) {
					r += ` ${His} ability to entertain gave ${him} a better understanding of ${his} <span class="skill inc">body's worth as a sexual object.</span>`;
					slave.skill.whore += (2.5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 64));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function publicReactions(slave) {
		let sstp;

		if ((slave.rules.release.masturbation === 0 && !App.Utils.hasFamilySex(slave) && slave.rules.release.slaves === 0) && slave.rules.reward !== "orgasm") {
			r += ` ${He}'s a better slut because public service is ${his} main sexual outlet.`;
		}

		// Someone double check this block
		if (V.familyTesting === 1) {
			if (totalRelatives(slave) > 0) {
				let children = [];
				children = V.slaves.filter(
					function(s) {
						return ((slave.ID === s.father || slave.ID === s.mother || s.ID === slave.father || s.ID === slave.mother || areSisters(slave, s) > 0) && (s.assignment === slave.assignment));
					}
				);
				if (children.length > 2) {
					r += ` Since ${his} relatives,`;
					sstp = 0;
					for (; sstp < children.length; sstp++) {
						if (sstp < children.length - 1) {
							r += ` ${children[sstp].slaveName},`;
						} else {
							r += ` and ${children[sstp].slaveName},`;
						}
					}
					r += ` are public sluts too, ${he} earns extra attention.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Citizens are very excited about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Citizens are very excited about being able to participate in incestuous sex.`;
					}
				} else if (children.length > 1) {
					r += ` Since ${his} relatives, ${children[0].slaveName} and ${children[1].slaveName}, are public sluts too, ${he} earns extra attention.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Citizens are very excited about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Citizens are very excited about being able to participate in incestuous sex.`;
					}
				} else if (children.length > 0) {
					r += ` Since ${his} relative, ${children[0].slaveName}, is a public slut too, ${he} earns extra attention.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Citizens are very excited about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Citizens are very excited about being able to participate in incestuous sex.`;
					}
				}
			}
		} else {
			if (slave.relation !== 0) {
				sstp = V.slaveIndices[slave.relationTarget];
				if (sstp !== undefined && slave.assignment === V.slaves[sstp].assignment) {
					r += ` Since ${his} ${V.slaves[sstp].relation} ${V.slaves[sstp].slaveName} is a public slut too, ${he} earns extra attention.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Citizens are very excited about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Citizens are very excited about being able to participate in incestuous sex.`;
					}
				}
			}
		}
		if (slave.relationship > 0) {
			sstp = V.slaveIndices[slave.relationshipTarget];
			if (sstp !== undefined && slave.assignment === V.slaves[sstp].assignment) {
				r += ` ${His} ${relationshipTerm(slave)} ${V.slaves[sstp].slaveName} is also serving the public and they work well together.`;
			}
		} else if (slave.relationship === -1) {
			r += ` ${He} relies on citizens' desire to fuck ${him} for emotional support, making ${him} an excellent, if occasionally disturbing, slut.`;
		}
		if (slave.rivalry !== 0) {
			sstp = V.slaveIndices[slave.rivalryTarget];
			if (sstp !== undefined && slave.assignment === V.slaves[sstp].assignment) {
				r += ` ${He}'s a little less effective due to ${his} mutual dislike with ${V.slaves[sstp].slaveName}.`;
			}
		}

		if (slave.minorInjury !== 0) {
			r += ` ${He} attracts fewer people due to ${his} minor injury.`;
		}

		if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs") || (slave.hears === -2)) {
			r += ` ${His} trouble hearing causes ${him} to miss potential partners.`;
		}

		if (canTalk(slave)) {
			if (arcology.FSSlaveProfessionalism !== "unset" && slave.accent > 1) {
				r += ` ${His} butchery of the local tongue drives away curious citizens.`;
			} else if (slave.voice > 2) {
				if (slave.voiceImplant > 0) {
					r += ` ${His} high-pitched bimbo voice improves ${his} come-ons.`;
				} else {
					r += ` ${His} high, girly voice improves ${his} come-ons.`;
				}
			} else if (slave.voice === 1) {
				r += ` Most citizens find ${his} deep voice unattractive, making it harder for ${him} to flirt successfully.`;
			}
		}

		if (arcology.FSTransformationFetishist > 20 || arcology.FSDegradationist > 20) {
			if ((V.modScore > 15) || (V.piercingScore > 8 && V.tatScore > 5)) {
				r += ` The public fetishizes body mods and considers ${hers} fascinating.`;
			} else if (V.modScore > 7) {
				r += ` The public fetishizes body mods and considers ${hers} interesting.`;
			}
		} else if (arcology.FSBodyPurist > 20 || arcology.FSPaternalist > 20) {
			if (V.modScore <= 7) {
				r += ` The public disapproves of body mods and is pleased that ${he}'s unspoiled in that regard.`;
			} else {
				r += ` The public disapproves of body mods and considers ${hers} unappealing.`;
			}
		} else {
			if ((V.modScore > 15) || (V.piercingScore > 8 && V.tatScore > 5)) {
				r += ` ${He} has so much body art that most potential patrons don't think ${he} needs any more.`;
			} else if (slave.corsetPiercing !== 0 || V.piercingScore >= 3 || V.tatScore >= 2) {
				r += ` ${His} body art helps attract patrons to use ${him} freely.`;
			}
		}

		if (slave.aphrodisiacs > 1 || (slave.inflationType === "aphrodisiac" && slave.inflation > 1)) {
			r += ` On such a heavy aphrodisiac dose, ${he} can't wait for each citizen to fuck ${him}.`;
			if (slave.inflationType === "aphrodisiac" && canDoAnal(slave)) {
				r += ` Which is practically nonstop, as anyone that fucks ${his} ass gets a hit of the aphrodisiacs within ${his} belly.`;
			}
		} else if (slave.aphrodisiacs > 0 || (slave.inflationType === "aphrodisiac")) {
			r += ` On aphrodisiacs, ${he} climaxes with every citizen.`;
			if (slave.inflationType === "aphrodisiac" && canDoAnal(slave)) {
				r += ` Which happens often, as anyone that fucks ${his} ass gets a tiny hit of the aphrodisiacs within ${his} belly.`;
			}
		} else if (slave.devotion > 95) {
			r += ` ${He}'s so devoted that ${he} does ${his} best and pleases every citizen.`;
		} else if (slave.devotion > 50) {
			r += ` ${He}'s so devoted that ${he} works hard to please citizens.`;
		} else if (slave.trust < -20) {
			r += ` ${He}'s afraid of you, so ${he} works hard to please citizens.`;
		} else {
			r += ` ${He} neither loves nor fears you enough to work hard, and makes a poor slut.`;
		}

		if (isStacked(slave)) {
			if (arcology.FSAssetExpansionist !== "unset") {
				r += ` ${His} huge, fashionable assets are immensely popular.`;
				if (canTalk(slave)) {
					if (slave.voice > 2) {
						r += ` ${His} high voice contributes to ${his} bimbo image, so ${he} does even better.`;
					}
				}
			} else if (arcology.FSSlimnessEnthusiast >= 20) {
				r += ` ${He} receives little attention for ${his} large assets since many citizens consider them disgusting.`;
			} else {
				r += ` The public enjoys ${his} huge assets.`;
			}
			if (arcology.FSGenderRadicalist !== "unset") {
				if (slave.dick > 0) {
					r += ` The new appetite for stacked sluts with dicks makes ${him} especially successful.`;
				}
			}
		}

		if (arcology.FSPetiteAdmiration !== "unset") {
			if (heightPass(slave)) {
				r += ` ${His} adorably petite stature catches and holds the public's eye.`;
			} else if (slave.height >= 170) {
				r += ` ${His} tall stature turns off most citizens.`;
			}
		} else if (arcology.FSStatuesqueGlorification !== "unset") {
			if (heightPass(slave)) {
				r += ` ${His} gloriously tall stature catches and holds the public's eye.`;
			} else {
				r += ` ${His} short stature turns off most citizens.`;
			}
		}

		if (slave.visualAge >= 30) {
			if (arcology.FSMaturityPreferentialist !== "unset") {
				r += ` ${His} mature body is very fashionable.`;
			} else if (arcology.FSYouthPreferentialist !== "unset") {
				r += ` ${His} old body is badly out of fashion.`;
			}
		} else {
			if (arcology.FSYouthPreferentialist !== "unset") {
				r += ` ${His} youthful body is very fashionable.`;
			} else if (arcology.FSMaturityPreferentialist !== "unset") {
				r += ` ${His} young body is out of fashion.`;
			}
		}

		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (genderLawPass(slave) === 1) {
				if (arcology.FSAssetExpansionist !== "unset") {
					r += ` The public enjoys ${his} fashionably feminine body.`;
				} else {
					r += ` The public enjoys ${his} sleek, girlish figure.`;
				}
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
				}
			}
		} else if (arcology.FSSlimnessEnthusiastLaw === 1) {
			if (slimLawPass(slave) === 1) {
				r += ` The public enjoys ${his} fashionably sleek little body.`;
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
				}
			}
		} else if (arcology.FSHedonisticDecadenceLaw2 === 1) {
			if (slave.boobs >= 2000 && slave.butt >= 5 && slave.weight > 95) {
				r += ` The public enjoys ${his} fashionably plump body.`;
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} feminine image, so ${he} does even better.`;
				}
			}
		} else {
			if (slave.boobs < 500 && slave.butt < 3) {
				if (slave.muscles <= 30 && arcology.FSPhysicalIdealist === "unset" && slave.weight <= 10 && arcology.FSHedonisticDecadence === "unset") {
					if (arcology.FSSlimnessEnthusiast > 20) {
						r += ` The public enjoys ${his} fashionably sleek little body.`;
					} else {
						r += ` The public enjoys ${his} sleek, girlish figure.`;
					}
					if (canTalk(slave) && slave.voice > 2) {
						r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
					}
				} else if (arcology.FSPhysicalIdealist !== "unset") { // no muscle malus for muscle loving societies
					if ((arcology.FSPhysicalIdealistStrongFat === 1 && slave.weight <= 30) || slave.weight <= 10) { // reduced weight malus for fat loving societies
						if (arcology.FSSlimnessEnthusiast > 20) {
							r += ` The public enjoys ${his} fashionably sleek little body.`;
						} else {
							r += ` The public enjoys ${his} sleek, girlish figure.`;
						}
						if (canTalk(slave) && slave.voice > 2) {
							r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
						}
					}
				} else if (arcology.FSHedonisticDecadence !== "unset" && slave.weight <= 30) { // reduced weight malus for fat loving societies
					if (arcology.FSHedonisticDecadenceStrongFat === 1 || slave.muscles <= 30) { // no muscle malus for muscle loving societies
						if (arcology.FSSlimnessEnthusiast > 20) {
							r += ` The public enjoys ${his} fashionably sleek little body.`;
						} else {
							r += ` The public enjoys ${his} sleek, girlish figure.`;
						}
						if (canTalk(slave) && slave.voice > 2) {
							r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
						}
					}
				}
			}
		}

		if (arcology.FSIntellectualDependencyLawBeauty === 1) {
			if (bimboScore(slave) >= 6) {
				r += ` Citizens flock to spend time with a complete bimbo like ${him}.`;
			}
		}

		if (slave.boobsImplant === 0 && slave.buttImplant === 0 && slave.waist >= -95 && slave.bellyImplant === -1 && slave.lipsImplant === 0 && slave.faceImplant < 30) {
			if (arcology.FSBodyPurist !== "unset") {
				r += ` With ${his} all-natural, implant free appearance, ${he}'s very popular.`;
			} else if (arcology.FSTransformationFetishist >= 20) {
				r += ` The public is disappointed by ${his} all-natural, implant free appearance.`;
			} else {
				r += ` Some discerning people appreciate ${his} all-natural, implant free appearance.`;
			}
		} else {
			if (arcology.FSTransformationFetishist !== "unset") {
				r += ` The public appreciates ${his} augmented body.`;
			}
		}

		if (slave.nipples === "fuckable") {
			if (arcology.FSTransformationFetishist !== "unset") {
				r += ` ${His} fuckable nipples give ${him} an edge over those without such body modifications.`;
			} else {
				r += ` ${His} fuckable nipples entice some of the more curious citizens.`;
			}
		}

		if (slave.teeth === "removable") {
			r += ` The extra attention ${he} receives from ${his} ability to give toothless sucks is about balanced out by the citizens who are disgusted by it.`;
		} else if (slave.teeth === "pointy") {
			r += ` The extra attention ${he} receives due to ${his} sharp teeth is balanced by the citizens who are scared off by them.`;
		}

		if (slave.dick !== 0) {
			if (arcology.FSGenderRadicalist === "unset") {
				r += ` ${He}'s less popular because many citizens prefer sluts without cocks.`;
			} else if (arcology.FSGenderRadicalist < 50) {
				r += ` ${His} cock entices some citizens and disappoints others; it has little effect on ${his} popularity.`;
			} else {
				r += ` The overwhelming majority of citizens consider ${his} cock an attraction.`;
			}
		}

		if (slave.muscles > 95) {
			if (arcology.FSPhysicalIdealist !== "unset") {
				r += ` In the new culture of ${arcology.name} ${his} muscles are cause for great admiration.`;
			} else {
				r += ` ${His} muscles scare off many, but some will do anything to enjoy a muscular slave.`;
			}
		}

		if (isAmputee(slave)) {
			r += ` Many prefer to fuck someone with limbs, but some greatly enjoy fucking a helpless amputee.`;
		}

		if (slave.lactation > 0) {
			r += ` ${He} appeals to citizens who like lactation play, or just like sluts they can drink milk from.`;
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}

		if (slave.bellyPreg >= 1500 || setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
			if (arcology.FSRepopulationFocus !== "unset") {
				r += ` In the new culture of ${arcology.name}, ${his}`;
				if (setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += ` apparent`;
				}
				r += ` pregnancy gets ${him} lots of attention.`;
			} else if (slave.bellyAccessory.FSRepopulationFocusPregPolicy === 1 && slave.bellyPreg >= 1500) {
				r += ` It's currently trendy to be ripe with child, so ${his} pregnancy gets ${him} lots of attention.`;
			} else if (arcology.FSRestart !== "unset") {
				r += ` In the new culture of ${arcology.name}, ${his}`;
				if (setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += ` apparent`;
				}
				r += ` pregnancy is a massive turn off to citizens.`;
			} else if (arcology.FSGenderFundamentalist !== "unset") {
				r += ` The new respect for slave fertility ensures that ${he} gets just as much love as slaves without pregnant bellies`;
				if (setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += `, even if ${his} bump isn't real`;
				}
				r += `.`;
			} else {
				r += ` Many citizens avoid visibly pregnant slaves.`;
			}
		}

		if (arcology.FSRepopulationFocusMilfPolicy === 1 && slave.counter.birthsTotal > 0) {
			r += ` Slaves that have had children are hot right now making ${him} quite the appealing MILF.`;
		}

		if (V.seeRace === 1) {
			if (slave.race === "white") {
				r += ` The public tastes favor white ${girl}s like ${slave.slaveName}.`;
			}
		}
		if (arcology.FSSupremacist !== "unset") {
			if (slave.race !== arcology.FSSupremacistRace) {
				r += ` Some citizens fetishize ${girl}s of the servile races.`;
			}
		}
		if (arcology.FSSubjugationist !== "unset") {
			if (slave.race === arcology.FSSubjugationistRace) {
				r += ` Many prefer to use and abuse sluts of the proper slave race.`;
			}
		}
		if (arcology.FSEdoRevivalist !== "unset") {
			if (slave.nationality === "Japanese" || slave.nationality === "Edo Revivalist") {
				r += ` As a proper Japanese ${girl}, ${he} is considered extremely desirable.`;
			}
		} else if (arcology.FSChineseRevivalist !== "unset") {
			if (slave.nationality === "Chinese" || slave.nationality === "Chinese Revivalist") {
				r += ` As a proper Chinese ${girl}, ${he} is considered extremely desirable.`;
			}
		}

		if (arcology.FSSlaveProfessionalism !== "unset") {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r += ` ${His} intelligence satisfies citizens looking for something more than just a hole.`;
			} else if (slave.intelligence + slave.intelligenceImplant < -10) {
				r += ` ${His} stupidity aggravates citizens looking for something more than just a cum dump.`;
			}
		} else if (arcology.FSIntellectualDependency !== "unset") {
			if (slave.intelligence + slave.intelligenceImplant > 10) {
				r += ` ${His} intellectual baggage is more than most citizens wish to deal with.`;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += ` ${His} simplicity makes ${him} pliable and ready to do or try anything.`;
			}
		} else if (slave.intelligence + slave.intelligenceImplant > 15) {
			r += ` ${His} intelligence helps ${him} discern everyone's needs.`;
		} else if (slave.intelligence + slave.intelligenceImplant < -15) {
			r += ` ${He} has trouble figuring out what everyone needs.`;
		}

		if (slave.prestige > 0) {
			r += ` ${He} attracts more attention because it's prestigious to be seen with ${him}.`;
		}

		if (slave.porn.prestige > 2) {
			r += ` Patrons line up for the chance to spend time with the face of ${slave.porn.fameType} porn.`;
		} else if (slave.porn.prestige > 1) {
			r += ` ${He} has a sizable fanbase, one that is eager to spend time with ${him}.`;
		} else if (slave.porn.prestige > 0) {
			r += ` A few of ${his} fans recognize ${him} and eagerly make use of ${him}.`;
		}

		if (slave.clitPiercing === 3 && slave.devotion >= -20) {
			r += ` Almost everyone loves ${his} orgasms encouraged by ${his} smart piercing.`;
		} else if (slave.clitPiercing === 3) {
			r += ` Almost everyone appreciates ${his} reduced reluctance caused by ${his} smart piercing.`;
		}

		if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			switch (slave.fetish) {
				case "submissive":
					r += ` ${He} receives extra attention for ${his} eagerness to submit.`;
					break;
				case "cumslut":
					r += ` ${He} receives extra attention for ${his} enjoyment of cum.`;
					break;
				case "humiliation":
					r += ` ${He} receives extra attention for ${his} eagerness to be humiliated by citizens.`;
					break;
				case "buttslut":
					if (canDoAnal(slave)) {
						r += ` ${He} receives extra attention for ${his} obvious enjoyment of buttsex.`;
					}
					break;
				case "dom":
					r += ` ${He} receives some extra attention for ${his} enthusiasm dominating other slaves in group sex.`;
					break;
				case "masochist":
					r += ` ${He} receives extra attention for ${his} obvious enjoyment of pain.`;
					break;
				case "boobs":
					r += ` ${He} receives extra attention for ${his} obvious enjoyment of a solid chest groping.`;
					break;
				case "sadist":
					r += ` ${He} receives some extra attention for ${his} willingness to abuse other slaves.`;
					break;
				case "pregnancy":
					if (slave.mpreg === 0) {
						if (slave.vagina > 0 && canDoVaginal(slave)) {
							r += ` As an impregnation fetishist ${he}'s very enthusiastic about vaginal sex.`;
						}
					} else {
						if (slave.anus > 0 && canDoAnal(slave)) {
							r += ` As an impregnation fetishist ${he}'s very enthusiastic about anal sex.`;
						}
					}
					break;
				case "mindbroken":
					r += ` ${He} receives less attention because ${he} just lies there, totally unresponsive.`;
					break;
			}
		}

		if (slave.attrKnown === 1) {
			if (slave.energy > 95) {
				r += ` As a nymphomaniac ${he} gets sexual release from every sex act and is a crowd favorite.`;
				slave.need -= slave.sexAmount;
			} else if (slave.energy > 80) {
				r += ` With ${his} powerful sex drive ${he} rarely has to fake an orgasm.`;
				slave.need -= (slave.sexAmount * 0.9);
			} else if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
				r += ` With ${his} aphrodisiac boosted libido, it's barely possible to discern ${him} from a natural nymphomaniac.`;
				slave.need -= (slave.sexAmount * 0.9);
			} else if (slave.energy > 60) {
				r += ` With ${his} good sex drive ${he} often orgasms with citizens.`;
				slave.need -= (slave.sexAmount * 0.8);
			} else if (slave.energy > 40) {
				r += ` With ${his} average sex drive ${he} occasionally orgasms with citizens.`;
				slave.need -= (slave.sexAmount * 0.5);
			} else if (slave.energy > 20) {
				r += ` With ${his} poor sex drive ${he} almost never orgasms with citizens.`;
				slave.need -= (slave.sexAmount * 0.1);
			} else {
				r += ` Since ${he}'s frigid, ${he} rarely experiences authentic arousal with citizens.`;
			}
			if (slave.attrXY <= 15) {
				if (slave.attrXX <= 15) {
					r += ` ${His} general disgust with sex makes ${him} a very poor slut.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual disgust with men makes ${him} a poor slut.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${His} sexual disgust with men hinders ${him}, though ${he} is more enthusiastic with female citizens.`;
				} else {
					r += ` ${His} sexual disgust with men hinders ${him}, though ${he} makes up for it with female citizens.`;
				}
			} else if (slave.attrXY <= 85) {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women makes ${him} a poor slut.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} indifference to men and women makes ${him} a poor slut.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${His} sexual indifference to men hinders ${him}, though ${he} is more enthusiastic with female citizens.`;
				} else {
					r += ` ${His} sexual indifference to men hinders ${him}, though ${he} makes up for it with female citizens.`;
				}
			} else if (slave.attrXY <= 95) {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women hinders ${him}, though ${he} makes up for it with male citizens.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual indifference to women hinders ${him}, though ${he} makes up for it with male citizens.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${He} has the advantage of sexual sincerity with both men and women.`;
				} else {
					r += ` ${He}'s a good slut with male citizens, and truly enthusiastic with women.`;
				}
			} else {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women hinders ${him}, though ${he} is enthusiastic with male citizens.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual indifference to women hinders ${him}, though ${he} is enthusiastic with male citizens.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${He}'s a good slut with female citizens, and truly enthusiastic with men.`;
				} else {
					r += ` ${He}'s openly lustful towards all citizens, men and women.`;
				}
			}
		}

		switch (slave.behavioralQuirk) {
			case "confident":
				r += ` ${He}'s better at ${his} job because ${he}'s so confident in the club.`;
				break;
			case "cutting":
				r += ` ${He} gets a lot of attention for ${his} ability to joke at a patron's expense.`;
				break;
			case "funny":
				r += ` ${He} frequently has ${his} corner of the club doubled over with laughter at ${his} antics.`;
				break;
			case "adores women":
				r += ` ${He} singles out the prettiest ladies in the club for special personal attention.`;
				break;
			case "adores men":
				r += ` ${He} singles out the hottest hunks in the club for special personal attention.`;
				break;
			case "fitness":
				r += ` ${He} approaches life in the club as a good workout, to the delight of ${his} exhausted partners.`;
				break;
			case "insecure":
				r += ` ${He}'s very willing to be promiscuous, since ${he} values ${himself} mainly as a sex object.`;
				break;
			case "sinful":
				r += ` ${He}'s explicitly sacrilegious in the club, happily transgressing against cultural boundaries.`;
				break;
			case "advocate":
				r += ` ${He} believes that the club represents ${arcology.name} well, and does ${his} best to contribute.`;
				break;
		}
		switch (slave.sexualQuirk) {
			case "gagfuck queen":
				r += ` ${He}'s a popular target for oral gangbangs in the club, late at night.`;
				break;
			case "painal queen":
				if (canDoAnal(slave)) {
					r += ` ${He}'s a popular target for anal gangbangs in the club, late at night.`;
				}
				break;
			case "strugglefuck queen":
				r += ` ${He}'s a popular target for gangbangs in the club, late at night.`;
				break;
			case "tease":
				r += ` Despite being a club slut, ${he} somehow retains the ability to blush enticingly at nudity.`;
				break;
			case "romantic":
				r += ` Despite being a club slut, ${he} somehow retains the ability to make ${his} citizens feel special.`;
				break;
			case "perverted":
				r += ` ${He}'s comfortable with the most perverted citizens' desires.`;
				break;
			case "unflinching":
				r += ` ${He}'s impossible to disgust or surprise, pleasing citizens with odd tastes.`;
				break;
			case "size queen":
				r += ` ${He}'s very eager to spend quality time with big cocks, making ${him} a favorite among the well-endowed.`;
				break;
			case "caring":
				r += ` ${He} really cares for everyone ${he} meets in the club, and will provide a sympathetic ear for anyone who just feels like talking.`;
				break;
		}

		switch (slave.behavioralFlaw) {
			case "arrogant":
				r += ` ${He} receives less gratitude because ${he} treats clients like they are beneath ${his} dignity.`;
				break;
			case "bitchy":
				r += ` ${He} receives less gratitude because ${he} makes cutting remarks to clients.`;
				break;
			case "odd":
				r += ` ${He} receives less gratitude because clients are annoyed by ${his} odd behavior.`;
				break;
			case "hates men":
				r += ` ${He} receives less gratitude because ${he} can't conceal ${his} distaste for the company of men.`;
				break;
			case "hates women":
				r += ` ${He} receives less gratitude because ${he} can't conceal ${his} distaste for the company of women.`;
				break;
			case "devout":
				r += ` ${He} receives less gratitude because people are annoyed by ${his} habit of praying for forgiveness during sex.`;
				break;
			case "liberated":
				r += ` ${He} receives less gratitude because people are annoyed by ${his} obvious belief that being forced to serve them is wrong.`;
				break;
		}
		switch (slave.sexualFlaw) {
			case "hates oral":
				r += ` ${He} receives less gratitude because ${he} tries to avoid sucking cock.`;
				break;
			case "hates anal":
				if (canDoAnal(slave)) {
					r += ` ${He} receives less gratitude because ${he} tries to avoid taking it up the ass.`;
				}
				break;
			case "hates penetration":
				r += ` ${He} receives less gratitude because ${he} tries to avoid getting fucked.`;
				break;
			case "repressed":
				r += ` ${He} receives less gratitude because citizens who don't feel like forcing ${him} sometimes have to cajole ${him} past ${his} repressed sexuality.`;
				break;
			case "idealistic":
				r += ` ${He} receives less gratitude because citizens who don't feel like forcing ${him} sometimes have to convince ${him} to have sex with them.`;
				break;
			case "apathetic":
				r += ` ${He} receives less gratitude because ${he} often just lies there taking dick.`;
				break;
			case "crude":
				r += ` ${He} receives less gratitude because ${he} isn't exactly the most elegant sexual partner.`;
				break;
			case "judgemental":
				r += ` ${He} receives less gratitude because ${he} openly disdains unattractive citizens.`;
				break;
			case "shamefast":
				r += ` ${He} receives less gratitude because ${he} sometimes hesitates to take ${his} clothes off and get to work.`;
				break;
			case "cum addict":
				r += ` ${His} abject begging for cum annoys citizens who aren't looking for oral, but this is more than outweighed by how much it delights those who are.`;
				break;
			case "anal addict":
				r += ` ${His} abject begging for buttsex annoys citizens who aren't interested in fucking ${his} ass, but this is more than outweighed by how much it delights those who are.`;
				break;
			case "attention whore":
				r += ` As an attention whore, public service is ${his} forte, and ${he} delights citizens with ${his} eager willingness to try anything in the open.`;
				break;
			case "breast growth":
				r += ` ${His} excessive obsession with ${his} own breasts, to the detriment of most sexual intercourse, annoys citizens.`;
				break;
			case "abusive":
				r += ` ${He} annoys citizens whenever ${his} sexual abusiveness becomes apparent.`;
				break;
			case "malicious":
				r += ` ${He} annoys citizens whenever ${his} sexual maliciousness becomes apparent.`;
				break;
			case "self hating":
				r += ` ${He} annoys citizens during the crying jags brought on by ${his} self hatred.`;
				break;
			case "neglectful":
				r += ` ${He} annoys those discerning citizens who can tell that ${he} neglects to orgasm with them.`;
				break;
			case "breeder":
				r += ` ${His} obsession with pregnancy annoys citizens who aren't interested in that.`;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function addFlaw(slave) {
		if (slave.devotion < 10) {
			if (jsRandom(1, 100) > 70) {
				if (slave.skill.vaginal <= 30 && canDoVaginal(slave)) {
					r += ` After being fucked too hard too often, ${he} now <span class="flaw gain">dislikes being penetrated.</span>`;
					slave.sexualFlaw = "hates penetration";
				} else if (slave.skill.anal <= 30 && canDoAnal(slave)) {
					r += ` After so much anal pain, ${he} now <span class="flaw gain">dislikes being buttfucked.</span>`;
					slave.sexualFlaw = "hates anal";
				} else if (slave.skill.oral <= 30) {
					r += ` After one too many facials, ${he} now <span class="flaw gain">dislikes sucking cock.</span>`;
					slave.sexualFlaw = "hates oral";
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function addRep(slave) {
		if (slave.assignment !== "recruit girls") {
			if (slave.assignment === "be the DJ") {
				repX(Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15), "publicServant", slave);
				// DJ bonus rep
				repX(Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15), "publicServantClub", slave);
				T.incomeStats.income += Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15);
			} else if (slave.assignment === "serve in the club") {
				repX(Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15), "publicServantClub", slave);
			} else if (slave.assignment === "serve the public") {
				repX(Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15), "publicServant", slave);
			} else {
				repX(Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15), "serving the public in an unregistered building", slave);
			}
		}
		T.incomeStats.income += Math.trunc((slave.sexAmount * slave.sexQuality) * (1 + (0.003 * slave.skill.entertainment)) * 0.15);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function applyFSDecoration(slave) {
		/* FACILITY DECORATION IMPACTS */
		const fsBeauty = (0.0005 * V.FSSingleSlaveRep * slave.sexAmount);
		switch (V.clubDecoration) {
			case "Roman Revivalist":
				arcology.FSRomanRevivalist += fsBeauty;
				break;
			case "Aztec Revivalist":
				arcology.FSAztecRevivalist += fsBeauty;
				break;
			case "Egyptian Revivalist":
				arcology.FSEgyptianRevivalist += fsBeauty;
				break;
			case "Edo Revivalist":
				arcology.FSEdoRevivalist += fsBeauty;
				break;
			case "Arabian Revivalist":
				arcology.FSArabianRevivalist += fsBeauty;
				break;
			case "Chinese Revivalist":
				arcology.FSChineseRevivalist += fsBeauty;
				break;
			case "Chattel Religionist":
				arcology.FSChattelReligionist += fsBeauty;
				break;
			case "Degradationist":
				arcology.FSDegradationist += fsBeauty;
				break;
			case "Asset Expansionist":
				arcology.FSAssetExpansionist += fsBeauty;
				break;
			case "Transformation Fetishist":
				arcology.FSTransformationFetishist += fsBeauty;
				break;
			case "Gender Radicalist":
				arcology.FSGenderRadicalist += fsBeauty;
				break;
			case "Repopulation Focus":
				arcology.FSRepopulationFocus += fsBeauty;
				break;
			case "Eugenics":
				arcology.FSRestart += fsBeauty;
				break;
			case "Gender Fundamentalist":
				arcology.FSGenderFundamentalist += fsBeauty;
				break;
			case "Physical Idealist":
				arcology.FSPhysicalIdealist += fsBeauty;
				break;
			case "Hedonistic":
				arcology.FSHedonisticDecadence += fsBeauty;
				break;
			case "Supremacist":
				arcology.FSSupremacist += fsBeauty;
				break;
			case "Subjugationist":
				arcology.FSSubjugationist += fsBeauty;
				break;
			case "Paternalist":
				arcology.FSPaternalist += fsBeauty;
				break;
			case "Pastoralist":
				arcology.FSPastoralist += fsBeauty;
				break;
			case "Maturity Preferentialist":
				arcology.FSMaturityPreferentialist += fsBeauty;
				break;
			case "Youth Preferentialist":
				arcology.FSYouthPreferentialist += fsBeauty;
				break;
			case "Body Purist":
				arcology.FSBodyPurist += fsBeauty;
				break;
			case "Slimness Enthusiast":
				arcology.FSSlimnessEnthusiast += fsBeauty;
				break;
			case "Slave Professionalism":
				arcology.FSSlaveProfessionalism += fsBeauty;
				break;
			case "Intellectual Dependency":
				arcology.FSIntellectualDependency += fsBeauty;
				break;
			case "Petite Admiration":
				arcology.FSPetiteAdmiration += fsBeauty;
				break;
			case "Statuesque Glorification":
				arcology.FSStatuesqueGlorification += fsBeauty;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexCounts(slave) {
		/* SEX ACT COUNTS AND SEXUAL SATISFACTION */

		oralUse = (V.oralUseWeight + (slave.skill.oral / 30) + (slave.lips / 20));
		analUse = 0;
		if (canDoAnal(slave)) {
			analUse = (V.analUseWeight + (slave.skill.anal / 30) - slave.anus);
			if (analUse < 0) {
				analUse = 0;
			}
		}
		vaginalUse = 0;
		if (canDoVaginal(slave)) {
			vaginalUse = (V.vaginalUseWeight + (slave.skill.vaginal / 30) - slave.vagina);
			if (vaginalUse < 0) {
				vaginalUse = 0;
			}
		}
		mammaryUse = 0;
		// perhaps boost this for truly massive breasts
		if (slave.boobs > 10000) {
			mammaryUse = (5 + V.mammaryUseWeight);
		} else if (slave.boobs > 500) {
			mammaryUse = (V.mammaryUseWeight + (slave.boobs / 2000));
		}
		if (slave.nipples === "fuckable") {
			mammaryUse *= 2;
		}
		penetrativeUse = 0;
		if (canDoVaginal(slave) && slave.clit > 1) {
			penetrativeUse += (V.penetrativeUseWeight + (slave.skill.vaginal / 30) + slave.clit);
		}
		if (slave.dick && slave.chastityPenis !== 1) {
			if (canPenetrate(slave)) {
				penetrativeUse += (V.penetrativeUseWeight + slave.dick + Math.min(slave.balls, 10) / 4);
				if (slave.drugs === "hyper testicle enhancement") {
					penetrativeUse += Math.min(slave.balls, 5);
				}
			} else {
				penetrativeUse += (V.penetrativeUseWeight + Math.min(slave.balls, 15) + Math.min(slave.balls, 10) / 8);
				if (slave.drugs === "hyper testicle enhancement") {
					penetrativeUse += Math.min(slave.balls, 5);
				}
			}
		}

		const demand = (oralUse + analUse + vaginalUse + mammaryUse + penetrativeUse);
		oralUse = Math.trunc((oralUse / demand) * slave.sexAmount);
		analUse = Math.trunc((analUse / demand) * slave.sexAmount);
		vaginalUse = Math.trunc((vaginalUse / demand) * slave.sexAmount);
		mammaryUse = Math.trunc((mammaryUse / demand) * slave.sexAmount);
		penetrativeUse = Math.trunc((penetrativeUse / demand) * slave.sexAmount);

		seX(slave, "oral", "public", "penetrative", oralUse);
		seX(slave, "anal", "public", "penetrative", analUse);
		seX(slave, "vaginal", "public", "penetrative", vaginalUse);
		seX(slave, "mammary", "public", "penetrative", mammaryUse);
		seX(slave, "penetrative", "public", "penetrative", penetrativeUse);

		cervixPump = 0;
		if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
			cervixPump += (20 * vaginalUse);
		}
		if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
			cervixPump += (20 * analUse);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexualSatiation(slave) {
		if (slave.need) {
			if (slave.fetishKnown) {
				switch (slave.fetish) {
					case "submissive":
					case "masochist":
						if (analUse + vaginalUse > 0) {
							r += ` ${He} enjoys being fucked, and got sexual satisfaction from the ${num(analUse + vaginalUse)} dicks stuck inside ${him} this week.`;
							slave.need -= (analUse + vaginalUse);
						}
						break;
					case "dom":
					case "sadist":
						if (penetrativeUse > 0) {
							r += ` ${He} enjoys being on top, and got special sexual satisfaction from the ${num(penetrativeUse)} times ${he} got to fuck someone this week.`;
							slave.need -= 2 * penetrativeUse;
						}
						break;
					case "cumslut":
						if (oralUse > 0) {
							r += ` ${He} enjoys sucking, and got sexual satisfaction from the ${num(oralUse)} blowjobs ${he} gave this week.`;
							slave.need -= oralUse;
						}
						break;
					case "buttslut":
						if (analUse > 0) {
							r += ` ${He} enjoys getting buttfucked, and got sexual satisfaction from the ${num(analUse)} times ${he} was sodomized this week.`;
							slave.need -= analUse;
						}
						break;
					case "boobs":
						if (mammaryUse > 0) {
							r += ` ${He} enjoys `;
							if (slave.nipples === "fuckable") {
								r += `having ${his} tits fucked,`;
							} else {
								r += `giving a good titfuck,`;
							}
							r += ` and got sexual satisfaction from the ${num(mammaryUse)} times they were used this week.`;
							slave.need -= mammaryUse;
						}
						break;
					case "pregnancy":
						if (slave.mpreg === 0) {
							if (vaginalUse > 0) {
								r += ` ${He} enjoys having ${his} pussy fucked, and got sexual satisfaction from the ${num(vaginalUse)} times ${he} got dick this week.`;
								slave.need -= vaginalUse;
							}
						} else {
							if (analUse > 0) {
								r += ` ${He} enjoys having ${his} ass fucked, and got sexual satisfaction from the ${num(analUse)} times ${he} got dick this week.`;
								slave.need -= analUse;
							}
						}
						break;
					case "humiliation":
						r += ` ${He} enjoys the humiliation of being a public slut, and got a bit of sexual satisfaction from every sex act ${he} performed this week.`;
						slave.need -= slave.sexAmount;
				}
			}
		}

		if (slave.energy > 40 && slave.energy < 95) {
			r += ` Being used sexually all week <span class="change positive">increases ${his} sex drive.</span>`;
			slave.energy += 1;
		}

		if (cervixPump > 0) {
			r += ` ${He} notices ${his} <span class="change positive">belly has swollen</span> from all the `;
			if (slave.cervixImplant === 1) {
				r += `vaginal`;
			} else if (slave.cervixImplant === 2) {
				r += `anal`;
			}
			r += ` sex ${he} had throughout the week.`;
			slave.bellyImplant += cervixPump;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function assignmentVignette(slave) {
		let vignette;
		if (slave.assignment !== "recruit girls") {
			vignette = GetVignette(slave);
			r += ` <span class="story-label">This week</span> ${vignette.text} `;
			if (vignette.type === "cash") {
				if (vignette.effect > 0) {
					r += `<span class="cash inc">making you an extra ${cashFormat(Math.trunc(slave.sexQuality * vignette.effect))}.</span>`;
				} else if (vignette.effect < 0) {
					r += `<span class="cash dec">losing you ${cashFormat(Math.abs(Math.trunc(slave.sexQuality * vignette.effect)))}.</span>`;
				} else {
					r += `an incident without lasting effect.`;
				}
				cashX(Math.trunc(slave.sexQuality * vignette.effect), "publicServant", slave);
				T.incomeStats.rep += Math.trunc(slave.sexQuality * vignette.effect);
			} else if (vignette.type === "devotion") {
				if (vignette.effect > 0) {
					if (slave.devotion > 50) {
						r += `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
					} else if (slave.devotion >= -20) {
						r += `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
					} else if (slave.devotion >= -50) {
						r += `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
					} else {
						r += `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
					}
				} else if (vignette.effect < 0) {
					if (slave.devotion > 50) {
						r += `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
					} else if (slave.devotion >= -20) {
						r += `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
					} else if (slave.devotion >= -50) {
						r += `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
					} else {
						r += `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
					}
				} else {
					r += `an incident without lasting effect.`;
				}
				slave.devotion += (1 * vignette.effect);
			} else if (vignette.type === "trust") {
				if (vignette.effect > 0) {
					if (slave.trust > 20) {
						r += `<span class="trust inc">increasing ${his} trust in you.</span>`;
					} else if (slave.trust >= -50) {
						r += `<span class="trust inc">reducing ${his} fear of you.</span>`;
					} else {
						r += `<span class="trust inc">reducing ${his} terror of you.</span>`;
					}
				} else if (vignette.effect < 0) {
					if (slave.trust > 20) {
						r += `<span class="trust dec">reducing ${his} trust in you.</span>`;
					} else if (slave.trust >= -20) {
						r += `<span class="trust dec">increasing ${his} fear of you.</span>`;
					} else {
						r += `<span class="trust dec">increasing ${his} terror of you.</span>`;
					}
				} else {
					r += `an incident without lasting effect.`;
				}
				slave.trust += (1 * vignette.effect);
			} else if (vignette.type === "health") {
				if (vignette.effect > 0) {
					r += `<span class="health inc">improving ${his} health.</span>`;
					improveCondition(slave, 2 * vignette.effect);
				} else if (vignette.effect < 0) {
					r += `<span class="health dec">affecting ${his} health.</span>`;
					healthDamage(slave, 2 * vignette.effect);
				} else {
					r += `an incident without lasting effect.`;
				}
			} else {
				if (vignette.effect > 0) {
					r += `<span class="reputation inc">gaining you a bit of reputation.</span>`;
				} else if (vignette.effect < 0) {
					r += `<span class="reputation dec">losing you a bit of reputation.</span>`;
				} else {
					r += `an incident without lasting effect.`;
				}
				repX(Math.trunc(slave.sexQuality * vignette.effect * 0.1), "vignette", slave);
				T.incomeStats.income += Math.trunc(slave.sexQuality * vignette.effect * 0.1);
			}
		}
	}
})();
