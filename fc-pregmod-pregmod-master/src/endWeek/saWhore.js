window.saWhore = (function saWhore() {
	"use strict";

	let T;
	let r;
	let arcology;

	// if the following are set outside this file, they must be set in it too!
	let beauty;
	let customers;
	let FuckResult;
	let cash;

	let cervixPump;
	let he, him, his, hers, himself, girl, loli, He, His;

	// if the following are set outside this file, they must be set in it too!
	let oralUse;
	let analUse;
	let vaginalUse;
	let mammaryUse;
	let penetrativeUse;

	return saWhore;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function saWhore(slave) {
		T = State.temporary;
		arcology = V.arcologies[0];
		r = ` `;
		({
			// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, girl, He, His, loli
		} = getPronouns(slave));

		gatherStatistics(slave);
		updateNonSlaveVariables(slave); // must be run before applyFSDecoration() or you will face NaNs
		if (slave.assignment === "work in the brothel" || slave.assignment === "be the Madam") {
			// By being at the end, every slave after the first will get a bonus. By moving it up, the first can enjoy it too. slaveJobValues() checks Edo Revivalist, so here we are.
			applyFSDecoration();
		}
		addCash(slave);
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
		addCashText(slave);
		sexualSatiation(slave);
		if (V.showVignettes === 1) {
			assignmentVignette(slave);
		}

		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function gatherStatistics(slave) {
		/* Statistics gathering */
		let facility;
		if (slave.assignment === Job.BROTHEL || slave.assignment === Job.MADAM) {
			facility = V.facility.brothel;
		}
		T.incomeStats = getSlaveStatisticData(slave, facility);
	}

	// I suspect this one will mostly be cut out in the overhauling
	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function updateNonSlaveVariables(slave) {
		// FuckResult and FuckAmount setting
		beauty = slave.sexAmount;
		T.incomeStats.customers = beauty;
		if (slave.effectiveWhoreClass === 4) {
			customers = "extremely wealthy";
			FuckResult = Math.trunc(slave.sexQuality * V.whorePriceAdjustment.topClass);
		} else if (slave.effectiveWhoreClass === 3) {
			customers = "upper class";
			FuckResult = Math.trunc(slave.sexQuality * V.whorePriceAdjustment.upperClass);
		} else if (slave.effectiveWhoreClass === 2) {
			customers = "middle class";
			FuckResult = Math.trunc(slave.sexQuality * V.whorePriceAdjustment.middleClass);
		} else if (slave.effectiveWhoreClass === 1) {
			customers = "lower class";
			FuckResult = Math.trunc(slave.sexQuality * V.whorePriceAdjustment.lowerClass);
		} else {
			customers = "ERROR";
			FuckResult = "ERROR";
			console.log("Error in effectiveWhoreClass for " + slave.slaveName + ", expected 1-4, got: ", slave.effectiveWhoreClass, "whoreClass:", slave.whoreClass, slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function jobPreface(slave) {
		if (slave.devotion > 95 || slave.energy > 95) {
			r += `enthusiastically sells`;
		} else if (slave.devotion > 50) {
			r += `willingly sells`;
		} else if (slave.devotion > 20) {
			r += `obediently sells`;
		} else if (slave.trust < -20) {
			r += `reluctantly sells`;
		} else {
			r += `is forced to sell`;
		}
		r += ` ${his} body.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function bonusMultiplierText(slave) {
		if (V.brothel > 0) {
			if ((V.universalRulesFacilityWork === 1 && slave.assignment === "whore" && V.brothelSpots > 0) || (slave.assignment === "work in the brothel")) {
				if (slave.assignment === "whore") {
					r += ` Since there's extra space in ${V.brothelName}, ${he} sells ${himself} there.`;
				}
				// ads
				if (V.brothelAdsSpending !== 0) {
					const adcats = App.Ads.Categories; // for brevity
					if (V.brothelAdsStacked === 1 && adcats.assetSize.classifySlave(slave) === 1) {
						r += ` ${His} stacked body fits ${V.brothelName}'s ad campaign, getting ${him} more business.`;
					} else if (V.brothelAdsStacked === -1 && adcats.assetSize.classifySlave(slave) === -1) {
						r += ` ${His} slim body fits ${V.brothelName}'s ad campaign, getting ${him} more business.`;
					}
					if (V.brothelAdsPreg === 1 && adcats.preg.classifySlave(slave) === 1) {
						r += ` ${His} gravid body fits ${V.brothelName}'s ad campaign, getting ${him} more attention.`;
					} else if (V.brothelAdsPreg === -1 && adcats.preg.classifySlave(slave) === -1) {
						r += ` ${His} flat belly fits ${V.brothelName}'s ad campaign, getting ${him} more attention.`;
					}
					if (V.brothelAdsModded === 1 && adcats.mods.classifySlave(slave) === 1) {
						r += ` Body art like ${hers} is a major draw.`;
					} else if (V.brothelAdsModded === -1 && adcats.mods.classifySlave(slave) === -1) {
						r += ` Very clean bodies like ${hers} are a major draw.`;
					}
					if (V.brothelAdsImplanted === 1 && adcats.assetOrigin.classifySlave(slave) === 1) {
						r += ` Many citizens come to ${V.brothelName} looking to rent a plastic slut like ${him}.`;
					} else if (V.brothelAdsImplanted === -1 && adcats.assetOrigin.classifySlave(slave) === -1) {
						r += ` Many citizens come to ${V.brothelName} looking to play with a natural ${girl} like ${him}.`;
					}
					if (V.brothelAdsOld === 1 && adcats.age.classifySlave(slave) === 1) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is mature slaves.`;
					} else if (V.brothelAdsOld === -1 && adcats.age.classifySlave(slave) === -1) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is young slaves.`;
					} else if (V.brothelAdsOld === -2 && adcats.age.classifySlave(slave) === -2) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is teenage slaves.`;
					} else if (V.brothelAdsOld === -3 && adcats.age.classifySlave(slave) === -3) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is ${loli} slaves.`;
					}
					if (V.brothelAdsXX === 1 && adcats.genitalia.classifySlave(slave) === 1) {
						r += ` Almost everyone who comes to ${V.brothelName} is looking to fuck a ${girl} like ${him}.`;
					} else if (V.brothelAdsXX === -1 && adcats.genitalia.classifySlave(slave) === -1) {
						r += ` Almost everyone who comes to ${V.brothelName} is looking to pound a ${girl} who cums when buttfucked.`;
					}
				}
				if (V.Madam !== 0) {
					const madamPronouns = getPronouns(V.Madam);
					if (V.madamCashBonus > 0) {
						if (slave.assignment === "whore") {
							r += ` Working`;
						} else {
							r += ` Living and working`;
						}
						r += ` out of the brothel, ${he} comes under ${SlaveFullName(V.Madam)}'s `;
						if (V.madamCashBonus < 0.1) {
							r += `completely inept`;
						} else if (V.madamCashBonus < 0.2) {
							r += `unskilled`;
						} else if (V.madamCashBonus < 0.3) {
							r += `skillful`;
						} else {
							r += `masterful`;
						}
						r += ` leadership.`;
						if (V.Madam.dick > 2 && canAchieveErection(V.Madam)) {
							if (slave.devotion <= 20) {
								r += ` The Madam rapes ${him} when ${he} fails to meet standards.`;
							} else {
								r += ` The Madam uses ${madamPronouns.his} dick to reward ${him} when ${he} does well and needs some loving.`;
							}
						}
						if (!canHear(slave)) {
							r += ` Unfortunately, ${his} inability to hear wastes most of ${V.Madam.slaveName}'s advice.`;
						}
						if (V.MadamIgnoresFlaws !== 1) {
							if (!["abusive", "anal addict", "attention whore", "breast growth", "breeder", "cum addict", "malicious", "neglectful", "none", "self hating"].includes(slave.sexualFlaw) && jsRandom(1, 100) > 90) {
								r += ` ${SlaveFullName(V.Madam)} manages to <span class="flaw break">break</span> ${slave.slaveName} of ${his} sexual flaws.`;
								slave.sexualFlaw = "none";
							} else if (slave.behavioralFlaw !== "none" && jsRandom(1, 100) > 90) {
								r += ` ${SlaveFullName(V.Madam)} manages to <span class="flaw break">break</span> ${slave.slaveName} of ${his} flaws.`;
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
	 */
	function usageCountDescriptions(slave) {
		r += ` ${His} appearance`;
		if (slave.maxWhoreClass > slave.effectiveWhoreClass) {
			let customers2;
			if (slave.maxWhoreClass === 4) {
				customers2 = "extremely wealthy";
			} else if (slave.maxWhoreClass === 3) {
				customers2 = "upper class";
			} else if (slave.maxWhoreClass === 2) {
				customers2 = "middle class";
			} else {
				customers2 = "ERROR";
			}
			r += ` can attract the ${customers2}, but they already had plenty of other slaves to fuck so ${he} `;
		}
		r += ` attracted ${beauty} ${customers} members of the public (${Math.trunc(beauty / 7)} a day)`;
		if (slave.maxWhoreClass > slave.effectiveWhoreClass) {
			r += ` instead`;
		}
		if (beauty > 160) {
			r += `, so many that `;
			if (canDoVaginal(slave) && canDoAnal(slave)) {
				r += `each of ${his} holes was`;
			} else if (canDoVaginal(slave) || canDoAnal(slave)) {
				r += `each of ${his} available holes was`;
			} else {
				r += `${his} mouth and anywhere else a dick could fit was`;
			}
			r += ` often filled by more than one cock`;
		} else if (beauty > 140) {
			r += `, so many that ${he} spent much of ${his} time getting gangbanged`;
		} else if (beauty > 120) {
			r += `, so many that customers often `;
			if (canDoAnal(slave) || canDoVaginal(slave)) {
				r += `spitroasted`;
			} else {
				r += `double-teamed`;
			}
			r += ` the slut`;
		} else if (beauty > 100) {
			r += `, so many that ${he} frequently had sex with multiple customers at once`;
		} else if (beauty > 70) {
			r += `, so many that ${he} occasionally had sex with multiple customers at once`;
		}
		r += `. They paid ${cashFormat(FuckResult)} on average`;
		r += `.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function comingOfAge(slave) {
		if (slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset") && arcology.FSRestart === "unset") {
			if (slave.birthWeek === 0) {
				r += ` ${He} just turned ${V.minimumSlaveAge} this week, giving ${him} an immense boost to both popularity and price. ${He} is also expected to become fertile soon, giving ${him} an additional boost as customers clamor to claim ${his} fresh womb.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which it's legal to pay to fuck ${him}, giving ${him} a boost to both popularity and price. ${He} was also anticipated to become fertile this month, and ${his} womb is still unoccupied, giving ${him} an additional boost.`;
			}
		} else if (slave.physicalAge === V.minimumSlaveAge) {
			if (slave.birthWeek === 0) {
				r += ` ${He} just turned ${V.minimumSlaveAge} this week, giving ${him} an immense boost to both popularity and price.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which it's legal to pay to fuck ${him}, giving ${him} a boost to both popularity and price.`;
			}
		} else if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcology.FSRepopulationFocus !== "unset" || arcology.FSGenderFundamentalist !== "unset")) {
			if (slave.birthWeek === 0) {
				r += ` ${He} is expected to become fertile soon, giving ${him} an immense boost to both popularity and price as citizens clamor to claim ${his} fresh womb.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which ${he} was anticipated to become fertile, and ${his} womb is still unoccupied, giving ${him} a boost to both popularity and price.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function mentalEffects(slave) {
		if (slave.behavioralQuirk === "sinful") {
			r += ` ${slave.slaveName} <span class="devotion inc">secretly enjoys</span> how utterly sinful and depraved it is for ${him} to sell ${his} body.`;
			slave.devotion += 1;
		} else if (slave.behavioralQuirk === "cutting") {
			r += ` ${slave.slaveName} <span class="devotion inc">openly enjoys</span> the direct, frank language of prostitution, and delights customers with cutting remarks even as they fuck ${him}.`;
			slave.devotion += 1;
		}
		if (slave.sexualQuirk === "caring") {
			r += ` ${slave.slaveName} sees ${his} role as helping people with their sexual needs, and ${he} <span class="trust inc">trusts that ${his} place</span> in society is an important one.`;
			slave.trust += 1;
		}
		if (slave.assignment === "work in the brothel" && slave.devotion > 50) {
			r += ` Being so far from your presence <span class="mediumorchid">weakens ${his} intense devotion to you.</span>`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function physicalEffects(slave) {
		let injury = 0;
		if (slave.assignment !== "work in the brothel") {
			if (slave.curatives > 0 || slave.inflationType === "curative") {
				r += ` The drugs `;
				if (slave.inflationType === "curative") {
					r += `${he} holds inside ${his} belly`;
				} else {
					r += `${he}'s on`;
				}
				r += ` protect ${him} from the wear of whoring.`;
			} else if (slave.health.condition < -50) {
				r += ` The stress of whoring while in terrible condition is <span class="red">very hard on ${him}.</span>`;
				healthDamage(slave, 13);
				injury = 1;
			} else if (slave.health.condition < -20 && jsRandom(1, 100) > 50) {
				r += ` The stress of whoring while in poor condition is <span class="red">hard on ${him}.</span>`;
				healthDamage(slave, 10);
				injury = 1;
			} else {
				let canA = canDoAnal(slave);
				let canV = canDoVaginal(slave);
				let skilltarget = (100 + ((slave.skill.anal - 100)*canA*(1.5 - 0.5*canV) + (slave.skill.vaginal - 100)*canV*(1.5 - 0.5*canA) + (slave.skill.oral - 100)*(3 - 1.5*canA - 1.5*canV + canA*canV))*3/10);
				// Complicated, I know - but it should automatically account for what acts are possible to scale the injury risk smoothly between 90% when totally unskilled
				// and 0% when perfectly skilled in the relevant method or methods.
				if (jsRandom(1, 100) > skilltarget) {
					healthDamage(slave, 10 - 7 * canA * canV);		// Any limitations means an injury inflicts the harsher 10 instead of 3
					injury = 1;
				}

				if (slave.vagina < 0) {
					if (!injury) {
						r += ` ${He}'s such an expert whore that ${he} copes with the stress of being a ${SlaveTitle(slave)} slut.`;
					} else {
						r += ` The stress of being a ${SlaveTitle(slave)} prostitute is <span class="red">hard on ${him}.</span>`;
					}
				} else if (!canV && canA) {
					if (!injury) {
						r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to buttsex and oral.`;
					} else {
						r += ` The stress of being limited to buttsex and oral is <span class="red">hard on ${him}.</span>`;
					}
				} else if (!canA && canV) {
					if (!injury) {
						r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to vaginal and oral.`;
					} else {
						r += ` The stress of being limited to vaginal and oral is <span class="red">hard on ${him}.</span>`;
					}
				} else if (!canA && !canV) {
					if (!injury) {
						r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to oral.`;
					} else {
						r += ` The stress of being limited to oral sex is <span class="red">hard on ${him}.</span>`;
					}
				}
			}
			if (injury === 1) {
				let injuryChance;
				if (canDoAnal(slave)) {
					injuryChance = jsRandom(1, 100);
				} else {
					injuryChance = jsRandom(1, 80);
				}
				if (injuryChance > 80) {
					slave.minorInjury = "sore ass";
					r += ` Rough anal with a careless customer left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (injuryChance > 60) {
					slave.minorInjury = "black eye";
					r += ` A violent customer left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (injuryChance > 40) {
					slave.minorInjury = "split lip";
					r += ` An abusive customer left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (injuryChance > 20) {
					slave.minorInjury = "bad bruise";
					r += ` A rough customer left ${him} with a <span class="red">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else {
					slave.minorInjury = "sore muscle";
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
					r += ` ${His} virginity goes to the highest bidder, earning ${cashFormat(beauty * 10)}. ${He}'s so full of aphrodisiacs that ${he} <span class="devotion inc">enjoys the experience.</span> <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion += 4;
					slave.vagina = 1;
				} else if (slave.devotion > 20) {
					r += ` ${His} virginity goes to the highest bidder, earning ${cashFormat(beauty * 10)}. Losing ${his} virginity in this way <span class="devotion inc">confirms ${his} submission to you.</span> <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion += 4;
					slave.vagina = 1;
				} else {
					r += ` ${His} virginity goes to the highest bidder, earning ${cashFormat(beauty * 10)}. ${He} tries to resist, and losing ${his} virginity to a rape makes ${him} <span class="devotion dec">hate</span> and <span class="trust dec">fear</span> you a great deal. <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion -= 10;
					slave.trust -= 10;
					slave.vagina = 1;
				}
			} else if (slave.vagina < 3) {
				if (jsRandom(1, 100) > ((170 - beauty) + (slave.vagina * 10) + (slave.skill.vaginal / 3))) {
					r += ` <span class="change positive">${His} pussy gets loosened by the intense use.</span>`;
					slave.vagina += 1;
				}
			}
		}

		if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
					r += ` ${His} tight little anus goes to the highest bidder, earning ${cashFormat(beauty * 5)}. ${He}'s so full of aphrodisiacs that ${he} <span class="devotion inc">enjoys the experience.</span> ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion += 4;
					slave.anus = 2;
				} else if (slave.devotion > 20) {
					r += ` ${His} tight little anus goes to the highest bidder, earning ${cashFormat(beauty * 5)}. The pain and humiliation <span class="devotion inc">confirm ${his} submission to you.</span> ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion += 4;
					slave.anus = 2;
				} else {
					r += ` ${His} tight little anus goes to the highest bidder, earning ${cashFormat(beauty * 5)}. The pain and humiliation increases ${his} <span class="devotion dec">hatred</span> and <span class="trust dec">fear</span> for you. ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion -= 5;
					slave.trust -= 5;
					slave.anus = 2;
				}
			} else if (slave.anus < 3) {
				if (slave.vagina < 0) {
					if (jsRandom(1, 100) > ((150 - beauty) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole sees constant use in place of a pussy and loosens.</span>`;
						slave.anus += 1;
					}
				} else if (!canDoVaginal(slave)) {
					if (jsRandom(1, 100) > ((150 - beauty) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole sees constant use in place of ${his} protected pussy and loosens.</span>`;
						slave.anus += 1;
					}
				} else {
					if (jsRandom(1, 100) > ((160 - beauty) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole loosens with constant use.</span>`;
						slave.anus += 1;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveSkills(slave) {
		let skillIncrease;
		if (!setup.whoreCareers.includes(slave.career) && slave.skill.whore < V.masteredXP) {
			slave.skill.whore += jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 15) + 8);
		}
		if (setup.whoreCareers.includes(slave.career)) {
			r += ` ${He} has sex work experience from ${his} life before ${he} was a slave, making ${him} more effective.`;
		} else if (slave.skill.whore >= V.masteredXP) {
			r += ` ${He} has experience as a prostitute from working for you, making ${him} more effective.`;
		}

		if (!canWalk(slave)) {
			if ((V.universalRulesFacilityWork === 1 && slave.assignment === "whore" && V.brothelSpots > 0) || (slave.assignment === "work in the brothel")) {
				r += ` Since ${he} can't walk, ${he} spends all of ${his} time in ${his} own room in ${V.brothelName}. Customers come in, fuck ${him}, and leave.`;
			} else {
				r += ` Since ${he} can't walk, ${he}'s set up so customers can use ${him}, pay and carry on their way.`;
			}
		}

		if (slave.skill.whoring >= 100) {
			r += ` As a masterful prostitute, ${he} makes more money.`;
		} else if (slave.skill.whoring > 60) {
			r += ` As an expert prostitute, ${he} gets more money out of customers.`;
		} else if (slave.skill.whoring > 30) {
			r += ` As a skilled prostitute, ${he} gets a little more money out of customers.`;
		}
		if (!isAmputee(slave)) {
			if (slave.skill.whoring < 100) {
				slave.skill.whoring += 10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32);
				r += ` ${He} <span class="skill inc">gains experience as a prostitute,</span> and gets better at `;
				if (slave.skill.whoring <= 30) {
					r += `basic street smarts.`;
				} else if (slave.skill.whoring <= 60) {
					r += `steering clients to more lucrative sex acts.`;
				} else {
					r += `squeezing johns for every penny.`;
				}
			}
			if (slave.skill.entertainment < 50 && slave.effectiveWhoreClass > 2) {
				slave.skill.entertainment += Math.floor(2.5 + (slave.intelligence + slave.intelligenceImplant) / 64);
				r += ` ${He} learns a little about how to better <span class="skill inc">entertain</span> ${his} classy clients.`;
			}
		}

		if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
			r += ` The aphrodisiac cocktail has ${him} so desperately horny that regardless of ${his} personal feelings, ${he} <span class="devotion inc">gets off with customers all week.</span> In ${his} drug-addled state ${he} doesn't remember enough to learn sexual skills.`;
			slave.devotion += 4;
		} else if (slave.devotion <= 20 && slave.energy <= 95) {
			if (slave.trust >= -20) {
				r += ` ${He} tries to refuse being sold as a whore, so ${he} is restrained for sale. ${He} loses a bit of ${himself} to a week of rape, but remembers enough to know <span class="devotion dec">you're responsible,</span> and <span class="trust dec">can force ${him} if necessary.</span>`;
				slave.devotion -= 5;
				slave.trust -= 5;
			} else {
				r += ` ${He} doesn't show much enthusiasm, but the habit of sexual prostitution <span class="devotion inc">wears away at ${his} will.</span>`;
				slave.devotion += 4;
			}
		} else {
			if ((slave.skill.oral >= 100) && ((slave.skill.anal >= 100) || !canDoAnal(slave)) && ((slave.skill.vaginal >= 100) || !canDoVaginal(slave))) {
				r += ` ${He}'s a <span class="skill">sexual master</span> `;
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
				r += ` body commands <span class="cash inc">a high price.</span> When ${he}'s not `;
				if (canDoVaginal(slave) && jsRandom(1, 4) === 1) {
					r += `pleasing the rich with ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `prestigious`;
					} else {
						r += `popular`;
					}
					r += ` pussy,`;
				} else if (beauty > 70 && jsRandom(1, 3) === 1) {
					r += `getting gangbanged,`;
				} else if (jsRandom(1, 2) === 1) {
					r += `performing one of ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `famous`;
					} else {
						r += `top-tier`;
					}
					r += ` blowjobs,`;
				} else if (canDoAnal(slave)) {
					r += ` selling access to ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `legendary`;
					} else {
						r += `notorious`;
					}
					r += ` anus,`;
				} else {
					r += ` pleasing the masses with ${his} chest,`;
				}
				r += ` ${he} works social gatherings and high society.`;
			} else {
				r += ` ${He} shows diligence, and ${his} <span class="skill inc">sexual skills improve,</span> according to what the customers demand`;
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
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function publicReactions(slave) {
		let SWi;

		if ((slave.rules.release.masturbation === 0 && !App.Utils.hasFamilySex(slave) && slave.rules.release.slaves === 0) && slave.rules.reward !== "orgasm") {
			r += ` ${He}'s a better whore because prostitution is ${his} main sexual outlet.`;
		}

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
					SWi = 0;
					for (; SWi < children.length; SWi++) {
						if (SWi < children.length - 1) {
							r += ` ${children[SWi].slaveName},`;
						} else {
							r += ` and ${children[SWi].slaveName},`;
						}
					}
					r += ` are selling themselves too, ${he} earns extra ¤ by working with them.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex.`;
					}
				} else if (children.length > 1) {
					r += ` Since ${his} relatives, ${children[0].slaveName} and ${children[1].slaveName}, are selling themselves too, ${he} earns extra ¤ by working with them.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex.`;
					}
				} else if (children.length > 0) {
					const relativePronouns = getPronouns(children[0]);
					r += ` Since ${his} relative, ${children[0].slaveName}, is selling ${relativePronouns.objectReflexive} too, ${he} earns extra ¤ by working with ${relativePronouns.object}.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex.`;
					}
				}
			}
		} else {
			if (slave.relation !== 0) {
				SWi = V.slaveIndices[slave.relationTarget];
				if (SWi !== undefined && slave.assignment === V.slaves[SWi].assignment) {
					const relativePronouns = getPronouns(V.slaves[SWi]);
					r += ` Since ${his} ${V.slaves[SWi].relation} ${V.slaves[SWi].slaveName} is selling ${relativePronouns.objectReflexive} too, ${he} earns extra ¤ by working with ${relativePronouns.object}.`;
					if (arcology.FSEgyptianRevivalist > 20) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex like the ancient Egyptians.`;
					} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
						r += ` Customers are very enthusiastic about being able to participate in incestuous sex.`;
					}
				}
			}
		}
		if (slave.relationship > 0) {
			SWi = V.slaveIndices[slave.relationshipTarget];
			if (SWi !== undefined && slave.assignment === V.slaves[SWi].assignment) {
				r += ` ${His} ${relationshipTerm(slave)} ${V.slaves[SWi].slaveName} is also whoring, so ${he} earns a bit more.`;
			}
		} else if (slave.relationship === -1) {
			r += ` ${He} relies on citizens' desire to fuck ${him} for emotional support, making ${him} an excellent, if occasionally disturbing, whore.`;
		}
		if (slave.rivalry !== 0) {
			SWi = V.slaveIndices[slave.rivalryTarget];
			if (SWi !== undefined && slave.assignment === V.slaves[SWi].assignment) {
				r += ` ${He} earns a little less ¤ due to bickering with ${V.slaves[SWi].slaveName}.`;
			}
		}

		if (slave.minorInjury !== 0) {
			r += ` ${He} attracts fewer people due to ${his} minor injury.`;
		}

		if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs") ||(slave.hears === -2)) {
			r += ` ${His} trouble hearing causes ${him} to often not recognize ${he}'s being picked up, missing out on partners.`;
		}

		if (canTalk(slave)) {
			if (arcology.FSSlaveProfessionalism !== "unset" && slave.accent > 1) {
				r += ` ${His} butchery of the local tongue drives away potential customers.`;
			} else if (slave.voice > 2) {
				if (slave.voiceImplant > 0) {
					r += ` ${His} high-pitched bimbo voice makes it easier for ${him} to entice potential customers.`;
				} else {
					r += ` ${His} high, girly voice makes it easier for ${him} to entice potential customers.`;
				}
			} else if (slave.voice === 1) {
				r += ` Most potential customers find ${his} deep voice unattractive, making it harder for ${him} to entice them.`;
			}
		}

		if (arcology.FSTransformationFetishist > 20 || arcology.FSDegradationist > 20) {
			if ((V.modScore > 15) || (V.piercingScore > 8 && V.tatScore > 5)) {
				r += ` Many customers fetishize body mods and consider ${hers} fascinating.`;
			} else if (V.modScore > 7) {
				r += ` Many customers fetishize body mods and consider ${hers} interesting.`;
			}
		} else if (arcology.FSBodyPurist > 20 || arcology.FSPaternalist > 20) {
			if (V.modScore <= 7) {
				r += ` Many customers disapprove of body mods and are pleased that ${he}'s unspoiled in that regard.`;
			} else {
				r += ` Many customers disapprove of body mods and consider ${hers} unappealing.`;
			}
		} else {
			if ((V.modScore > 15) || (V.piercingScore > 8 && V.tatScore > 5)) {
				r += ` ${He} has so much body art that most customers don't think ${he} needs any more.`;
			} else if (slave.corsetPiercing !== 0 || V.piercingScore >= 3 || V.tatScore >= 2) {
				r += ` ${His} body art helps attract customers.`;
			}
		}

		if (slave.aphrodisiacs > 1 || (slave.inflationType === "aphrodisiac" && slave.inflation > 1)) {
			r += ` On such a heavy aphrodisiac dose, ${he} can't wait for each customer to fuck ${him}.`;
			if (slave.inflationType === "aphrodisiac" && canDoAnal(slave)) {
				r += ` Which is practically nonstop, as anyone that fucks ${his} ass gets a hit of the aphrodisiacs within ${his} belly.`;
			}
		} else if (slave.aphrodisiacs > 0 || (slave.inflationType === "aphrodisiac")) {
			r += ` On aphrodisiacs, ${he} climaxes with every customer.`;
			if (slave.inflationType === "aphrodisiac" && canDoAnal(slave)) {
				r += ` Which happens often, as anyone that fucks ${his} ass gets a tiny hit of the aphrodisiacs within ${his} belly.`;
			}
		} else if (slave.devotion > 95) {
			r += ` ${He}'s so devoted that ${he} does ${his} best and pleases every customer.`;
		} else if (slave.devotion > 50) {
			r += ` ${He}'s so devoted that ${he} works hard to please customers.`;
		} else if (slave.trust < -20) {
			r += ` ${He}'s afraid of you, so ${he} works hard to please customers.`;
		} else {
			r += ` ${He} neither loves nor fears you enough to work hard, and makes a poor whore.`;
		}

		if (slave.butt > 4 && slave.boobs > 800) {
			if (arcology.FSAssetExpansionist !== "unset") {
				r += ` ${He} makes a river of ¤ with ${his} huge, fashionable assets.`;
				if (canTalk(slave)) {
					if (slave.voice > 2) {
						r += ` ${His} high voice contributes to ${his} bimbo image, so ${he} does even better.`;
					}
				}
			} else if (arcology.FSSlimnessEnthusiast >= 20) {
				r += ` ${He} makes no extra ¤ with ${his} large assets since many citizens consider them disgusting.`;
			} else {
				r += ` ${He} receives extra ¤ for having huge assets.`;
			}
			if (arcology.FSGenderRadicalist !== "unset") {
				if (slave.dick > 0) {
					r += ` Society's appetite for stacked whores with dicks makes ${him} especially profitable.`;
				}
			}
		}

		if (arcology.FSPetiteAdmiration !== "unset") {
			if (heightPass(slave)) {
				r += ` ${His} adorably petite stature attracts additional customers.`;
			} else if (slave.height >= 170) {
				r += ` ${His} tall stature turns off potential costumers.`;
			}
		} else if (arcology.FSStatuesqueGlorification !== "unset") {
			if (heightPass(slave)) {
				r += ` ${His} gloriously tall stature attracts additional customers.`;
			} else {
				r += ` ${His} short stature turns off potential costumers.`;
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
					r += ` ${He} makes extra ¤ due to ${his} fashionably feminine body.`;
				} else {
					r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
				}
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
				}
			}
		} else if (arcology.FSSlimnessEnthusiastLaw === 1) {
			if (slimLawPass(slave) === 1) {
				r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
				}
			}
		} else if (arcology.FSHedonisticDecadenceLaw2 === 1) {
			if (slave.boobs >= 2000 && slave.butt >= 5 && slave.weight > 95) {
				r += ` ${He} makes extra ¤ due to ${his} fashionably plump body.`;
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} feminine image, so ${he} does even better.`;
				}
			}
		} else {
			if (slave.boobs < 500 && slave.butt < 3) {
				if (slave.muscles <= 30 && arcology.FSPhysicalIdealist === "unset" && slave.weight <= 10 && arcology.FSHedonisticDecadence === "unset") {
					if (arcology.FSSlimnessEnthusiast > 20) {
						r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
					} else {
						r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
					}
					if (canTalk(slave) && slave.voice > 2) {
						r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
					}
				} else if (arcology.FSPhysicalIdealist !== "unset") { // no muscle malus for muscle loving societies
					if ((arcology.FSPhysicalIdealistStrongFat === 1 && slave.weight <= 30) || slave.weight <= 10) { // reduced weight malus for fat loving societies
						if (arcology.FSSlimnessEnthusiast > 20) {
							r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
						} else {
							r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
						}
						if (canTalk(slave) && slave.voice > 2) {
							r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
						}
					}
				} else if (arcology.FSHedonisticDecadence !== "unset" && slave.weight <= 30) { // reduced weight malus for fat loving societies
					if (arcology.FSHedonisticDecadenceStrongFat === 1 || slave.muscles <= 30) { // no muscle malus for muscle loving societies
						if (arcology.FSSlimnessEnthusiast > 20) {
							r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
						} else {
							r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
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
				r += ` Clients are more than willing to pay extra ¤ to spend time with a complete bimbo like ${him}.`;
			}
		}

		if (slave.boobsImplant === 0 && slave.buttImplant === 0 && slave.waist >= -95 && slave.bellyImplant === -1 && slave.lipsImplant === 0 && slave.faceImplant < 30) {
			if (arcology.FSBodyPurist !== "unset") {
				r += ` With ${his} all-natural, implant free appearance, ${he}'s very profitable.`;
			} else if (arcology.FSTransformationFetishist >= 20) {
				r += ` Customers are disappointed by ${his} all-natural, implant free appearance.`;
			} else {
				r += ` Some discerning customers appreciate ${his} all-natural, implant free appearance.`;
			}
		} else {
			if (arcology.FSTransformationFetishist !== "unset") {
				r += ` The public is willing to pay more for ${his} augmented body.`;
			}
		}

		if (slave.nipples === "fuckable") {
			if (arcology.FSTransformationFetishist !== "unset") {
				r += ` ${His} fuckable nipples give ${him} a profitable edge over those without such body modifications.`;
			} else {
				r += ` ${His} fuckable nipples entice some of the more adventurous customers.`;
			}
		}

		if (slave.teeth === "removable") {
			r += ` The extra attention ${he} receives from ${his} ability to give toothless sucks is about balanced out by the customers who are disgusted by it.`;
		} else if (slave.teeth === "pointy") {
			r += ` The extra attention ${he} receives from ${his} terrifying mouth of sharp teeth is balanced by the customers who are scared off by them.`;
		}

		if (slave.dick !== 0) {
			if (arcology.FSGenderRadicalist === "unset") {
				r += ` ${He} sees fewer customers because many prefer whores without cocks.`;
			} else if (arcology.FSGenderRadicalist < 50) {
				r += ` ${His} cock entices some customers and disappoints others; it has little effect on ${his} popularity.`;
			} else {
				r += ` The overwhelming majority of potential customers consider ${his} cock an attraction.`;
			}
		}

		if (slave.muscles > 95) {
			if (arcology.FSPhysicalIdealist !== "unset") {
				r += ` In the new culture of ${arcology.name} ${his} muscles make ${him} a very profitable whore.`;
			} else {
				r += ` ${His} muscles scare off some customers, but some pay well to enjoy a muscular whore.`;
			}
		}

		if (isAmputee(slave)) {
			r += ` Many prefer to fuck a whore with limbs, but some greatly enjoy buying the use of a helpless amputee.`;
		}

		if (slave.lactation > 0) {
			r += ` ${He} appeals to customers who like lactation play, or just want a whore they can drink milk from.`;
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}

		if (slave.bellyPreg >= 1500 || setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
			if (arcology.FSRepopulationFocus !== "unset") {
				r += ` In the new culture of ${arcology.name}, ${his} pregnancy makes ${him} a profitable whore`;
				if (setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += `, even if it's not real`;
				}
				r += `.`;
			} else if (slave.bellyAccessory.FSRepopulationFocusPregPolicy === 1 && slave.bellyPreg >= 1500) {
				r += ` It's currently trendy to plow a whore laden with child, a role ${he} fits perfectly.`;
			} else if (arcology.FSRestart !== "unset") {
				r += ` In the new culture of ${arcology.name}, ${his}`;
				if (setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += ` apparent`;
				}
				r += ` pregnancy is a massive turn off to potential customers.`;
			} else if (arcology.FSGenderFundamentalist !== "unset") {
				r += ` The new respect for traditional gender roles has given many citizens a taste for pregnant whores`;
				if (setup.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += `, even if they only look pregnant`;
				}
				r += `.`;
			} else {
				r += ` Many customers avoid visibly pregnant whores.`;
			}
		}

		if (arcology.FSRepopulationFocusMilfPolicy === 1 && slave.counter.birthsTotal > 0) {
			r += ` Slaves that have had children are hot right now making ${him} quite the appealing MILF.`;
		}

		if (V.seeRace === 1) {
			if (slave.race === "white") {
				r += ` Many customers prefer white ${girl}s like ${slave.slaveName}.`;
			}
		}
		if (arcology.FSSupremacist !== "unset") {
			if (slave.race !== arcology.FSSupremacistRace) {
				r += ` Some citizens fetishize whores of the servile races.`;
			}
		}
		if (arcology.FSSubjugationist !== "unset") {
			if (slave.race === arcology.FSSubjugationistRace) {
				r += ` Many prefer to use and abuse whores of the proper slave race.`;
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
				r += ` ${His} intelligence satisfies customers looking for more than just a hole to fuck.`;
			} else if (slave.intelligence + slave.intelligenceImplant < -10) {
				r += ` ${His} stupidity aggravates customers looking for more than just a hole to fuck.`;
			}
		} else if (arcology.FSIntellectualDependency !== "unset") {
			if (slave.intelligence + slave.intelligenceImplant > 10) {
				r += ` ${His} intellectual baggage annoys customers looking for a simple fuck.`;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += ` ${His} simplicity makes ${him} pliable and ready to try anything with a customer.`;
			}
		} else if (slave.intelligence + slave.intelligenceImplant > 15) {
			r += ` ${His} intelligence gives ${him} an advantage at the business of selling ${his} body.`;
		} else if (slave.intelligence + slave.intelligenceImplant < -15) {
			r += ` ${His} stupidity gives ${him} a handicap at the business of selling ${his} body.`;
		}

		if (slave.prestige > 0) {
			r += ` ${He} attracts more attention because it's prestigious to fuck ${him}.`;
		}

		if (slave.porn.prestige > 2) {
			r += ` Customers line up for the chance to buy time with the face of ${slave.porn.fameType} porn.`;
		} else if (slave.porn.prestige > 1) {
			r += ` ${He} has a sizable fanbase, one that is eager to buy time with ${him}.`;
		} else if (slave.porn.prestige > 0) {
			r += ` A few of ${his} fans recognize ${him} and eagerly patronize ${him}.`;
		}

		if (slave.clitPiercing === 3 && slave.devotion >= -20) {
			r += ` Almost everyone loves ${his} enthusiasm for sex encouraged by ${his} smart piercing.`;
		} else if (slave.clitPiercing === 3) {
			r += ` Almost everyone appreciates ${his} reduced reluctance towards sex encouraged by ${his} smart piercing.`;
		}

		if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			switch (slave.fetish) {
				case "submissive":
					r += ` ${He} gets more ¤ for ${his} eagerness to submit.`;
					break;
				case "cumslut":
					r += ` ${He} gets more ¤ for ${his} enjoyment of cum.`;
					break;
				case "humiliation":
					r += ` ${He} gets more ¤ for ${his} eagerness to be humiliated by citizens.`;
					break;
				case "buttslut":
					if (canDoAnal(slave)) {
						r += ` ${He} gets more ¤ for ${his} obvious enjoyment of buttsex.`;
					}
					break;
				case "dom":
					r += ` ${He} gets more ¤ for ${his} enthusiasm dominating other slaves in group sex.`;
					break;
				case "masochist":
					r += ` ${He} gets more ¤ for ${his} obvious enjoyment of pain.`;
					break;
				case "boobs":
					r += ` ${He} receives more ¤ for ${his} eagerness to get some hands on ${his} chest.`;
					break;
				case "sadist":
					r += ` ${He} gets some more ¤ for ${his} willingness to abuse other slaves.`;
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
					r += ` ${He} gets less ¤ because ${he} just lies there, totally unresponsive.`;
					break;
			}
		}

		if (slave.attrKnown === 1) {
			if (slave.energy > 95) {
				r += ` As a nymphomaniac ${he} gets sexual release from every transaction and is wildly successful.`;
				slave.need -= beauty;
			} else if (slave.energy > 80) {
				r += ` With ${his} powerful sex drive ${he} rarely has to fake an orgasm.`;
				slave.need -= (beauty * 0.9);
			} else if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
				r += ` With ${his} aphrodisiac boosted libido, it's barely possible to discern ${him} from a natural nymphomaniac.`;
				slave.need -= (beauty * 0.9);
			} else if (slave.energy > 60) {
				r += ` With ${his} good sex drive ${he} often orgasms with customers.`;
				slave.need -= (beauty * 0.8);
			} else if (slave.energy > 40) {
				r += ` With ${his} average sex drive ${he} occasionally orgasms with customers.`;
				slave.need -= (beauty * 0.5);
			} else if (slave.energy > 20) {
				r += ` With ${his} poor sex drive ${he} almost never orgasms with customers.`;
				slave.need -= (beauty * 0.1);
			} else {
				r += ` Since ${he}'s frigid, ${he} rarely experiences authentic arousal at work.`;
			}
			if (slave.attrXY <= 15) {
				if (slave.attrXX <= 15) {
					r += ` ${His} general disgust with sex makes ${him} a very poor whore.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual disgust with men makes ${him} a poor whore.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${His} sexual disgust with men hinders ${him}, though ${he} is more enthusiastic with female customers.`;
				} else {
					r += ` ${His} sexual disgust with men hinders ${him}, though ${he} makes up for it with female customers.`;
				}
			} else if (slave.attrXY <= 85) {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women makes ${him} a poor whore.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} indifference to men and women makes ${him} a poor whore.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${His} sexual indifference to men hinders ${him}, though ${he} is more enthusiastic with female customers.`;
				} else {
					r += ` ${His} sexual indifference to men hinders ${him}, though ${he} makes up for it with female customers.`;
				}
			} else if (slave.attrXY <= 95) {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women hinders ${him}, though ${he} makes up for it with male customers.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual indifference to women hinders ${him}, though ${he} makes up for it with male customers.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${He} has the advantage of sexual sincerity with both men and women.`;
				} else {
					r += ` ${He}'s a good slut with male customers, and truly enthusiastic with women.`;
				}
			} else {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women hinders ${him}, though ${he} is enthusiastic with male customers.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual indifference to women hinders ${him}, though ${he} is enthusiastic with male customers.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${He}'s a good slut with female customers, and truly enthusiastic with men.`;
				} else {
					r += ` ${He}'s openly lustful towards all customers, men and women.`;
				}
			}
		}

		switch (slave.behavioralQuirk) {
			case "confident":
				r += ` ${He}'s better at ${his} job because ${he}'s such a confident whore.`;
				break;
			case "cutting":
				r += ` ${He} gets a lot of attention for ${his} ability to joke at a customer's expense.`;
				break;
			case "funny":
				r += ` ${He} brings unintentional comic relief to the hard work of prostitution.`;
				break;
			case "adores women":
				r += ` ${He}'s a favorite among female customers, whom ${he} greets with real enthusiasm.`;
				break;
			case "adores men":
				r += ` ${He}'s a favorite among male customers, whom ${he} greets with frank and open lust.`;
				break;
			case "fitness":
				r += ` ${He}'s eager to please customers because ${he} finds validation in their willingness to pay for sex with ${him}.`;
				break;
			case "insecure":
				r += ` ${He} thinks of ${himself} as really beautiful, despite the occasional harshness of sex work.`;
				break;
			case "sinful":
				r += ` ${He} identifies with prostitutes from the holy books, and scandalizes customers with ${his} explicit scriptural references.`;
				break;
			case "advocate":
				r += ` ${He} reassures uncomfortable customers that prostitution isn't bad for ${him} at all.`;
				break;
		}
		switch (slave.sexualQuirk) {
			case "gagfuck queen":
				r += ` ${He}'s a favorite among customers who like to throatfuck a retching whore.`;
				break;
			case "painal queen":
				if (canDoAnal(slave)) {
					r += ` ${He}'s a favorite among customers who like to assrape a struggling whore.`;
				}
				break;
			case "strugglefuck queen":
				r += ` ${He}'s a favorite among customers who like to wrestle with a struggling whore.`;
				break;
			case "tease":
				r += ` Despite being a whore, ${he} somehow retains the ability to blush enticingly at nudity.`;
				break;
			case "romantic":
				r += ` Despite being a whore, ${he} somehow retains the ability to make ${his} customers feel special.`;
				break;
			case "perverted":
				r += ` ${He} enjoys unexpected, perverted requests from customers.`;
				break;
			case "unflinching":
				r += ` ${He}'s impossible to disgust or surprise, pleasing customers with odd tastes.`;
				break;
			case "size queen":
				r += ` ${He}'s very eager to spend quality time with big cocks, making ${him} a favorite among the well-endowed.`;
				break;
			case "caring":
				r += ` ${He}'s a relaxing whore to patronize, doing everything ${he} can to make ${his} customers comfortable.`;
				break;
		}

		switch (slave.behavioralFlaw) {
			case "arrogant":
				r += ` ${He} receives less ¤ because ${he} treats clients like they are beneath ${his} dignity.`;
				break;
			case "bitchy":
				r += ` ${He} receives less ¤ because ${he} makes cutting remarks to clients.`;
				break;
			case "odd":
				r += ` ${He} receives less ¤ because clients are annoyed by ${his} odd behavior.`;
				break;
			case "hates men":
				r += ` ${He} receives less ¤ because ${he} can't conceal ${his} distaste for the company of men.`;
				break;
			case "hates women":
				r += ` ${He} receives less ¤ because ${he} can't conceal ${his} distaste for the company of women.`;
				break;
			case "devout":
				r += ` ${He} receives less ¤ because people are annoyed by ${his} habit of praying for forgiveness during sex.`;
				break;
			case "liberated":
				r += ` ${He} receives less ¤ because people are annoyed by ${his} obvious belief that being forced to serve them is wrong.`;
				break;
		}
		switch (slave.sexualFlaw) {
			case "hates oral":
				r += ` ${He} receives less ¤ because ${he} tries to avoid sucking cock.`;
				break;
			case "hates anal":
				if (canDoAnal(slave)) {
					r += ` ${He} receives less ¤ because ${he} tries to avoid taking it up the ass.`;
				}
				break;
			case "hates penetration":
				r += ` ${He} receives less ¤ because ${he} tries to avoid getting fucked.`;
				break;
			case "repressed":
				r += ` ${He} receives less ¤ because customers who don't feel like forcing ${him} sometimes have to cajole ${him} past ${his} repressed sexuality.`;
				break;
			case "idealistic":
				r += ` ${He} receives less ¤ because customers who don't feel like forcing ${him} sometimes have to convince ${him} to have sex with them.`;
				break;
			case "apathetic":
				r += ` ${He} receives less ¤ because ${he} often just lies there taking dick.`;
				break;
			case "crude":
				r += ` ${He} receives less ¤ because ${he} isn't exactly the most elegant sexual partner.`;
				break;
			case "judgemental":
				r += ` ${He} receives less ¤ because ${he} openly disdains unattractive citizens.`;
				break;
			case "shamefast":
				r += ` ${He} receives less ¤ because ${he} sometimes hesitates to take ${his} clothes off and get to work.`;
				break;
			case "cum addict":
				r += ` ${His} abject begging for cum annoys customers who aren't looking for oral, but this is more than outweighed by how much it delights those who are.`;
				break;
			case "anal addict":
				r += ` ${His} abject begging for buttsex annoys customers who aren't interested in fucking ${his} ass, but this is more than outweighed by how much it delights those who are.`;
				break;
			case "attention whore":
				r += ` ${He} loses customers by ${his} constant attention seeking.`;
				break;
			case "breast growth":
				r += ` ${His} excessive obsession with ${his} own breasts, to the detriment of most sexual intercourse, loses customers.`;
				break;
			case "abusive":
				r += ` ${He} loses customers whenever ${his} sexual abusiveness becomes apparent.`;
				break;
			case "malicious":
				r += ` ${He} loses customers whenever ${his} sexual maliciousness becomes apparent.`;
				break;
			case "self hating":
				r += ` ${He} loses customers during the crying jags brought on by ${his} self hatred.`;
				break;
			case "neglectful":
				r += ` The occasional customer who likes a whore to climax authentically and can tell the difference is disappointed by ${his} neglect of ${his} own pleasure, but they're rare. Most are thrilled by ${him}.`;
				break;
			case "breeder":
				r += ` ${His} obsession with pregnancy loses customers who aren't interested in that.`;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
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
	 */
	function addCash(slave) {
		let whoreScore = slave.sexAmount * slave.sexQuality; // The standard amount of money the whore is expected to make in a week
		if (slave.effectiveWhoreClass === 4) {
			cash = Math.trunc(whoreScore * V.whorePriceAdjustment.topClass); // final price adjustment for supply and demand
			slave.sexQuality = Math.trunc(slave.sexQuality); // rounding it after we're done with it
		} else if (slave.effectiveWhoreClass === 3) {
			cash = Math.trunc(whoreScore * V.whorePriceAdjustment.upperClass);
			slave.sexQuality = Math.trunc(slave.sexQuality);
		} else if (slave.effectiveWhoreClass === 2) {
			cash = Math.trunc(whoreScore * V.whorePriceAdjustment.middleClass);
			slave.sexQuality = Math.trunc(slave.sexQuality);
		} else {
			cash = Math.trunc(whoreScore * V.whorePriceAdjustment.lowerClass);
			slave.sexQuality = Math.trunc(slave.sexQuality);
		}
		if (slave.assignment === "work in the brothel") {
			cashX(cash, "whoreBrothel", slave);
		} else if (slave.assignment === "be the Madam") {
			cashX(cash, "whoreBrothel", slave);
		} else if (slave.assignment === "whore") {
			cashX(cash, "whore", slave);
		} else {
			cashX(cash, "whoring in an unregistered building", slave);
		}
		T.incomeStats.income += cash;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function addCashText(slave) {
		r += ` In total, you were paid <span class="cash inc">${cashFormat(cash)}</span> for the use of ${slave.slaveName}'s body this week.`;
	}

	/**
	 */
	function applyFSDecoration() {
		/* FACILITY DECORATION IMPACTS */
		const fsBeauty = (0.0005 * V.FSSingleSlaveRep * beauty);
		switch (V.brothelDecoration) {
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
		oralUse = Math.trunc((oralUse / demand) * beauty);
		analUse = Math.trunc((analUse / demand) * beauty);
		vaginalUse = Math.trunc((vaginalUse / demand) * beauty);
		mammaryUse = Math.trunc((mammaryUse / demand) * beauty);
		penetrativeUse = Math.trunc((penetrativeUse / demand) * beauty);

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
						r += ` ${He} enjoys the humiliation of being a whore, and got a bit of sexual satisfaction from every sex act ${he} performed this week.`;
						slave.need -= beauty;
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
	 */
	function assignmentVignette(slave) {
		const vignette = GetVignette(slave);
		r += ` <span class="story-label">This week</span> ${vignette.text} `;
		if (vignette.type === "cash") {
			const cashVign = Math.trunc(FuckResult * vignette.effect);
			if (vignette.effect > 0) {
				r += `<span class="cash inc">making you an extra ${cashFormat(cashVign)}.</span>`;
			} else if (vignette.effect < 0) {
				r += `<span class="cash dec">losing you ${cashFormat(Math.abs(cashVign))}.</span>`;
			} else {
				r += `an incident without lasting effect.`;
			}
			if (slave.assignment === "work in the brothel") {
				cashX(cashVign, "whoreBrothel", slave);
			} else if (slave.assignment === "be the Madam") {
				cashX(cash, "whoreBrothel", slave);
			} else if (slave.assignment === "whore") {
				cashX(cashVign, "whore", slave);
			} else {
				cashX(cashVign, "whoring in an unregistered building", slave);
			}
			T.incomeStats.income += cashVign;
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
			repX(Math.trunc(FuckResult * vignette.effect * 0.1), "vignette", slave);
			T.incomeStats.rep += Math.trunc(FuckResult * vignette.effect * 0.1);
		}
	}
})();
