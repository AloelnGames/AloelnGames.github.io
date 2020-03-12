window.saGetMilked = (function saGetMilked() {
	"use strict";

	let T;
	let r;
	let arcology;
	let cash;

	// If these are moved out of the file, they must be set in it as well!
	let milk;
	let milkSale;
	let cum;
	let cumSale;
	let fluid;
	let fluidSale;

	// could probably move these back or something
	let hormones;
	let cumHormones;
	let implantEffect;

	let he, him, his, hers, himself, girl, loli, He, His;

	return saGetMilked;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {boolean} preview are we trying to preview or actually record?
	 * @returns {(string|number)} returns number if 'preview' is true, string if it is not.
	 */
	function saGetMilked(slave, preview=false) {
		T = State.temporary;
		arcology = V.arcologies[0];
		milk = 0;
		cum = 0;
		fluid = 0;
		r = ` `;
		cash = 0;

		if (!preview) {
			({
				he, him, his, hers, himself, girl, He, His, loli
			} = getPronouns(slave));
			gatherStatistics(slave);
			jobPreface(slave);
		}

		if (slave.lactation > 0) {
			cash += milkStatistics(slave, preview);
			if (!preview) {
				harvestMilk(slave);
				milkingEffects(slave);
			}
		}
		// Limits penthouse milkers to milk only.
		if (["be confined in the arcade", "get milked", "work in the dairy"].includes(slave.assignment) || preview) {
			if (slave.balls > 0) {
				cash += cumStatistics(slave, preview);
				if (!preview) {
					harvestCum(slave);
					cumEffects(slave);
				}
			}
			if (slave.genes === "XX" && slave.prostate > 0 && slave.balls === 0) {
				cash += girlCumStatistics(slave, preview);
				if (!preview) {
					harvestGirlCum(slave);
				}
			}
		}
		if (preview) {
			return cash;
		} else {
			mentalEffects(slave);
			if (V.showVignettes === 1 && (slave.assignment === "get milked" || slave.assignment === "work in the dairy")) {
				assignmentVignette(slave);
			}
			if (slave.assignment === "work in the dairy") {
				applyFSDecoration();
			}
			if (slave.assignment === "work in the dairy") {
				cashX(cash, "milkedDairy", slave);
			} else if (slave.assignment === "get milked") {
				cashX(cash, "milked", slave);
			} else {
				cashX(cash, "extraMilk", slave);
			}
			// These are a pain. They are usually called immediately after this function. Could possibly return an object instead.
			V.cum = cum;
			V.milk = milk;
			V.milkSale = milkSale;
			V.cumSale = cumSale;
			V.fluid = fluid;
			V.fluidSale = fluidSale;
			return r;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function gatherStatistics(slave) {
		/* Statistics gathering */
		let facility;
		if (slave.assignment === Job.DAIRY) {
			facility = V.facility.dairy;
		}
		T.incomeStats = getSlaveStatisticData(slave, facility);
		T.incomeStats.milk = 0;
		T.incomeStats.cum = 0;
		T.incomeStats.fluid = 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function jobPreface(slave) {
		r += `gets milked this week.`;
		if (V.dairy > 0 && V.dairyRestraintsSetting < 2) {
			if ((V.universalRulesFacilityWork === 1 && slave.assignment === "get milked" && V.dairySpots > 0) || (slave.assignment === "work in the dairy")) {
				if (slave.assignment === "get milked") {
					r += ` Since there's extra space in ${V.dairyName}, ${he} spends most of ${his} milkings there.`;
					V.dairySpots -= 1; // Would this need to be pulled for statistics gathering?
				}
				if (V.Milkmaid !== 0) {
					r += ` While there, ${he} gets the benefit of ${V.Milkmaid.slaveName}'s `;
					if (V.Milkmaid.physicalAge < 21) {
						r += `youthful energy`;
					} else {
						r += `care`;
					}
					if (V.Milkmaid.skill.oral >= 100) {
						r += ` and talented tongue`;
					}
					r += `.`;
					if (slave.devotion < V.milkmaidDevotionThreshold) {
						slave.devotion += V.milkmaidDevotionBonus;
					}
					if (slave.trust < V.milkmaidTrustThreshold) {
						slave.trust += V.milkmaidTrustBonus;
					}
					if (slave.health.condition < 100) {
						slave.health.condition += V.milkmaidHealthBonus;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function harvestMilk(slave) {
		 /* milk = milkAmount(slave); // Set it or else! */

		r += ` ${He} produces from ${his} ${jsEither(["boobs", "breasts", "mammaries", "tits", "udders"])}, which have a combined volume of ${(slave.boobs * 2)} CCs; `;
		if (slave.lactation === 1) {
			r += `${he} is lactating naturally and produces `;
			if (implantEffect >= .90) {
				r += `a weak trickle of milk.`;
			} else if (implantEffect >= .75) {
				r += `a weak stream of milk.`;
			} else {
				r += `a healthy stream of milk.`;
			}
		} else if (slave.lactation === 2) {
			r += `${he} is on lactation drugs and produces `;
			if (implantEffect >= .90) {
				r += `a steady flow of milk.`;
			} else if (implantEffect >= .75) {
				r += `strong bursts of milk.`;
			} else {
				r += `a river of milk.`;
			}
			if (slave.lactationAdaptation < 100) {
				r += ` ${His} udders are forced to adapt to this unnatural productivity.`;
				slave.lactationAdaptation += 1;
			}
			if (slave.curatives === 0 && slave.inflationType !== "curative") {
				r += ` The stress of extreme milk production <span class="health dec">damages ${his} health.</span>`;
				healthDamage(slave, 3);
			}
		}

		if (slave.boobsMilk > 0) {
			r += ` ${He} was in need of a good milking, too.`;
		}

		if (slave.devotion > 50) {
			r += ` ${He}'s such a happy cow that ${his} mental state has a positive impact on ${his} production.`;
		} else if (slave.devotion < -50) {
			r += ` ${He}'s such an unhappy cow that ${his} mental state has a negative impact on ${his} production.`;
		}

		if (slave.boobsImplant > 0) {
			implantEffect = (slave.boobsImplant / slave.boobs);
		}
		if (slave.boobsImplant > 0) {
			r += ` However, ${his} `;
			if (implantEffect >= 0.90) {
				r += `breast implants are ill-suited for`;
			} else if (implantEffect >= 0.75) {
				r += `breasts are almost entirely implant, greatly restricting ${his}`;
			} else if (implantEffect >= 0.60) {
				r += `breasts are mostly implant, restricting ${his}`;
			} else if (implantEffect >= 0.45) {
				r += `implants make up a considerable amount of ${his} breasts and greatly impede`;
			} else if (implantEffect >= 0.30) {
				r += `breast implants take up enough space to impede`;
			} else if (implantEffect >= 0.10) {
				r += `breast implants slightly impede`;
			} else {
				r += `breast implants cause a minor decrease in`;
			}
			r += ` milk production`;
			if (implantEffect >= 0.90) {
				r += `, given the lack of actual breast flesh`;
			}
			r += `.`;
		}

		hormones = (slave.hormoneBalance / 100);
		if (slave.balls !== 0) {
			hormones -= 1;
		}
		if (slave.ovaries !== 0 || slave.mpreg !== 0) {
			hormones += 1;
		}
		if (hormones > 1) {
			r += ` ${His} internal chemistry is perfectly suited to milk production.`;
		} else if (hormones > 0) {
			r += ` ${His} hormonal balance favors milk production.`;
		} else if (hormones < 0) {
			r += ` ${His} hormonal balance impedes milk production.`;
		} else if (hormones < -1) {
			r += ` ${His} internal chemistry is poorly suited to milk production.`;
		}

		if (slave.lactationAdaptation < 100) {
			if (slave.assignment === "get milked" || slave.assignment === "work in the dairy") {
				r += ` Living as a cow helps ${his} body and mind adapt to producing milk.`;
				slave.lactationAdaptation += 1;
			}
		}

		if (slave.preg > (slave.pregData.normalBirth / 8) && slave.pregKnown === 1) {
			r += ` ${His} pregnancy helps ${his} body produce more milk naturally`;
			if (slave.lactationAdaptation < 100) {
				r += `, and also helps it adapt to milk production`;
				slave.lactationAdaptation += 1;
			}
			r += `.`;
		}

		if (slave.health.condition > 50) {
			r += ` ${His} shining health helps ${him} really produce.`;
		} else if (slave.health.condition < -50) {
			r += ` ${His} poor health impedes milk production.`;
		}

		if (slave.weight > 10) {
			r += ` ${His} extra weight supports ${his} productivity.`;
		} else if (slave.weight < -10) {
			r += ` ${His} thinness hinders ${his} productivity.`;
		}

		if (slave.lactationAdaptation > 10) {
			if (slave.lactationAdaptation > 50) {
				r += ` ${His} body has adapted heavily to milk production, making ${him} extremely productive.`;
			} else {
				r += ` ${His} body has gotten used to producing milk, making ${him} very productive.`;
			}
		}

		if (V.dairySlimMaintainUpgrade === 1) {
			if (V.dairySlimMaintain === 1) {
				if (slave.boobs <= 700) {
					if (arcology.FSSlimnessEnthusiast > 80) {
						r += ` Your arcology's milkers are optimized to extract maximum output from small breasted slaves, which substantially increases ${his} otherwise modest productivity.`;
					} else if (arcology.FSSlimnessEnthusiast > 20) {
						r += ` Your arcology's milkers have been carefully modified to more readily accommodate slaves with tiny breasts, which slightly mitigates ${his} less than ideal physiology for milk production.`;
					}
				}
			}
		}

		r += ` As a result, ${he} produces ${milk} liters of milk over the week.`;

		/*
		actX(slave, "milk", milk);
		T.incomeStats.milk = milk;
		*/

		// make sure milkSale is set here
		if (arcology.FSPastoralistLaw === 1) {
			r += ` Since breast milk is ${arcology.name}'s only legal dairy product, ${he} can scarcely be milked fast enough, and ${he} makes <span class="cash inc">${cashFormat(milkSale)}.</span>`;
		} else if (arcology.FSPastoralist !== "unset") {
			r += ` Since milk is fast becoming a major part of the ${arcology.name}'s dietary culture, ${his} milk is in demand, and ${he} makes <span class="cash inc">${cashFormat(milkSale)}.</span>`;
		} else if (arcology.FSRepopulationFocusLaw === 1) {
			r += ` Since the number of hungry babies outweighs the supply of available breasts in ${arcology.name}, ${his} milk is in demand, and ${he} makes <span class="cash inc">${cashFormat(milkSale)}.</span>`;
		} else {
			r += ` ${His} milk is sold for <span class="cash inc">${cashFormat(milkSale)}.</span>`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function milkStatistics(slave, preview) {
		milk = milkAmount(slave);

		if (V.dairySlimMaintainUpgrade === 1) {
			if (V.dairySlimMaintain === 1) {
				if (slave.boobs <= 700) {
					if (arcology.FSSlimnessEnthusiast > 80) {
						milk *= 1.5;
					} else if (arcology.FSSlimnessEnthusiast > 20) {
						milk *= 1.1;
					}
				}
			}
		}

		if (slave.assignment === "work in the dairy") {
			if (V.dairyFeedersUpgrade === 1) {
				if (V.dairyFeedersSetting > 0) {
					milk += (milk * (0.1 * (V.dairyFeedersUpgrade + V.dairyRestraintsSetting + ((50 - slave.physicalAge) / 20))));
					if (slave.chem > 360) {
						milk *= 0.6;
					} else if (slave.chem > 100) {
						milk *= ((600 - slave.chem) / 600);
					}
				}
			}
		} else if (slave.assignment === "be confined in the arcade") {
			milk *= 0.5;
		}

		milk *= V.servantMilkersMultiplier;
		milk = Math.trunc(milk);
		if (milk < 1) {
			milk = 1;
		}

		if (arcology.FSPastoralistLaw === 1) {
			milkSale = (milk * (8 + Math.trunc(arcology.FSPastoralist / 30)));
		} else if (arcology.FSPastoralist !== "unset") {
			milkSale = (milk * (6 + Math.trunc(arcology.FSPastoralist / 30)));
		} else if (arcology.FSRepopulationFocusLaw === 1) {
			milkSale = (milk * (6 + Math.trunc(arcology.FSRepopulationFocus / 50)));
		} else {
			milkSale = (milk * 6);
		}

		// Consider returning these if this function gets gutted
		if (!preview) {
			actX(slave, "milk", milk);
			T.incomeStats.milk = milk;
			T.incomeStats.income += milkSale;
		}
		return milkSale;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function milkingEffects(slave) {
		if (slave.fetishKnown) {
			if (slave.fetish === "boobs" || slave.energy > 95) {
				r += ` Getting constantly milked is as good as sex, as far as ${he}'s concerned. <span class="devotion inc">${He} is happy</span> to have ${his} breasts receive so much attention.`;
				slave.devotion += 1;
				if (slave.need > 0) {
					slave.need = 0;
				}
			}
		}

		if (slave.career === "a dairy cow" && slave.fetish !== "mindbroken" && slave.fuckdoll === 0) {
			r += ` ${He} feels like <span class="devotion inc">${he} was made to be milked,</span> <span class="trust inc">not that ${he}'d complain about such a good feeling.</span>`;
			slave.devotion++;
			slave.trust++;
			if (slave.need > 0) {
				slave.need = 0;
			}
		}

		if (slave.nipples !== "huge") {
			if (slave.nipples === "inverted") {
				if (slave.fetish === "masochist" && slave.fetishKnown === 1) {
					r += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion inc">extremely uncomfortable; ${he} loves it.</span>`;
					slave.devotion += 3;
				} else {
					r += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion dec">extremely uncomfortable.</span>`;
					slave.devotion -= 3;
				}
				if (jsRandom(1, 100) > 50) {
					r += ` The constant suction <span class="change positive">permanently protrudes them,</span> and `;
					if (jsRandom(1, 2) === 1) {
						r += `it turns out they're absolutely massive.`;
						slave.nipples = "huge";
					} else {
						r += `it turns out they're nice and puffy.`;
						slave.nipples = "puffy";
					}
				}
			} else if (slave.nipples === "partially inverted") {
				if (slave.fetish === "masochist" && slave.fetishKnown === 1) {
					r += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion inc">quite uncomfortable; ${he} loves it.</span>`;
					slave.devotion += 1;
				} else {
					r += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion dec">quite uncomfortable.</span>`;
					slave.devotion -= 1;
				}
				if (jsRandom(1, 100) > 30) {
					r += ` The constant suction <span class="change positive">permanently protrudes them,</span> and `;
					if (jsRandom(1, 2) === 1) {
						r += `it turns out they're pretty cute.`;
						slave.nipples = "cute";
					} else {
						r += `it turns out they're nice and puffy.`;
						slave.nipples = "puffy";
					}
				}
			} else if (slave.nipples === "puffy" && jsRandom(1, 100) > 90) {
				r += ` Producing this river of milk <span class="change positive">enlarges ${his} nipples:</span> they're now enormous.`;
				slave.nipples = "huge";
			} else if (slave.nipples === "cute" && jsRandom(1, 100) > 80) {
				r += ` Producing this river of milk <span class="change positve">makes ${his} nipples nice and puffy.</span>`;
				slave.nipples = "puffy";
			} else if (slave.nipples === "tiny") {
				r += ` Producing this river of milk <span class="change positive">makes ${his} nipples grow to a nice size.</span>`;
				slave.nipples = "cute";
			} else if (slave.areolae < 4 && jsRandom(1, 100) > (30 + (slave.areolae * 20))) {
				if (slave.nipples === "fuckable") {
					r += ` The constant suction around of ${his} nipples as their depths are drained of milk`;
				} else {
					r += ` Producing this river of milk`;
				}
				r += ` <span class="change positive">broadens ${his} areolae.</span>`;
				slave.areolae += 1;
			}
		}
		slave.lactationDuration = 2;
		if (slave.boobsMilk > 0) {
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function harvestCum(slave) {
		V.cumSlaves += 1;
		/* cum = cumAmount(slave); // Set it or else */

		if (slave.lactation > 0) {
			r += ` ${His} `;
		} else {
			r += ` ${slave.slaveName}'s `;
		}

		if (slave.dick > 0) {
			if (slave.dick > 6) {
				r += `inhuman`;
			} else if (slave.dick > 5) {
				r += `massive`;
			} else if (slave.dick > 4) {
				r += `big`;
			} else if (slave.dick > 3) {
				r += `sizable`;
			} else if (slave.dick > 2) {
				r += `moderate`;
			} else if (slave.dick > 1) {
				r += `little`;
			} else {
				r += `tiny`;
			}
			r += ` prick is`;
			if (slave.lactation > 0) {
				r += ` also`;
			}
			r += ` machine-milked`;
		} else {
			r += `butt is machine-fucked`;
		}
		r += ` to extract the cum from $his `;
		if (slave.scrotum === 0) {
			r += `invisible`;
		} else {
			if (slave.balls > 10) {
				r += `hypertrophied`;
			} else if (slave.balls >= 10) {
				r += `inhuman`;
			} else if (slave.balls >= 9) {
				r += `titanic`;
			} else if (slave.balls >= 8) {
				r += `gigantic`;
			} else if (slave.balls >= 7) {
				r += `monstrous`;
			} else if (slave.balls >= 6) {
				r += `pendulous`;
			} else if (slave.balls >= 5) {
				r += `huge`;
			} else if (slave.balls >= 4) {
				r += `swinging`;
			} else if (slave.balls >= 4) {
				r += `big`;
			} else if (slave.balls >= 3) {
				r += `average`;
			} else {
				r += `pathetic`;
			}
		}
		if (slave.drugs === "testicle enhancement") {
			r += ` balls, relieving them of the excessive cum production caused by the testicle enhancement drugs.`;
		} else if (slave.drugs === "hyper testicle enhancement") {
			r += ` balls, relieving them of the excessive cum production caused by the hyper testicle enhancement drugs.`;
		} else {
			r += ` balls.`;
		}

		if (slave.diet === "cum production") {
			r += ` ${His} diet is designed for cum production.`;
		}

		cumHormones = (slave.hormoneBalance / 50);
		if (cumHormones < -1) {
			r += ` ${His} internal chemistry is perfectly suited to cum production.`;
		} else if (cumHormones < 0) {
			r += ` ${His} hormonal balance favors cum production.`;
		} else if (cumHormones > 0) {
			r += ` ${His} hormonal balance impedes cum production.`;
		} else if (cumHormones > 1) {
			r += ` ${His} internal chemistry is poorly suited to cum production.`;
		}

		if (slave.scrotum === 0) {
			r += ` ${He} does produce cum despite ${his} apparent ballslessness, but less than ${he} would if they weren't hidden inside ${him}.`;
		}

		if (slave.prostate > 0) {
			if (slave.prostate > 2) {
				r += ` ${His} heavily altered prostate greatly increases the volume of ${his} ejaculations and promotes excessive, watery semen production. This dilute ejaculate<span class="cash dec">sells poorly</span> compared to normal cum.`;
			} else if (slave.prostate > 1) {
				r += ` ${His} hyperactive prostate increases the volume of ${his} ejaculations and promotes good semen production.`;
			}
		} else {
			r += ` ${His} lack of a prostate reduces the health and volume of ${his} ejaculations.`;
		}

		if (slave.devotion > 50) {
			r += ` ${He}'s so happy that ${his} mental state has a positive impact on ${his} semen production.`;
		} else if (slave.devotion < -50) {
			r += ` ${He}'s so unhappy that ${his} mental state has a negative impact on ${his} semen production.`;
		}

		if (slave.health.condition > 50) {
			r += ` ${His} shining health helps ${him} really produce.`;
		} else if (slave.health.condition < -50) {
			r += ` ${His} poor health impedes semen production.`;
		}

		if (slave.health.illness > 0 || slave.health.tired > 60) {
			r += ` ${He} performed worse this week due to<span class="cash dec">`;
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

		if (slave.vasectomy === 1) {
			r += ` ${His} cum lacks the primary ingredient, sperm, thanks to ${his} vasectomy, <span class="cash dec">considerably lowering the value</span> of ${his} ejaculate.`;
		} else if (slave.ballType === "sterile") {
			r += ` ${His} cum lacks vigor entirely, thanks to ${his} chemical castration, <span class="cash dec">considerably lowering the value</span> of ${his} ejaculate.`;
		}

		/* Dairy rework cum half here */
		if (slave.assignment === "work in the dairy") {
			if (V.dairyStimulatorsUpgrade !== 1) {
				if (V.Milkmaid !== 0) {
					if (V.Milkmaid.dick > 4 && canAchieveErection(V.Milkmaid)) {
						const milkmaidPronouns = getPronouns(V.Milkmaid);
						r += ` ${V.Milkmaid.slaveName} sometimes stands in for the machines, which is a polite way of saying ${milkmaidPronouns.he} sometimes fucks ${slave.slaveName}'s ass to help ${him} cum.`;
					}
				}
			}
		}

		/*
		actX(slave, "cum", cum);
		T.incomeStats.cum = cum;
		*/

		if (arcology.FSPastoralist === "unset") {
			r += ` ${He} produces ${cum} deciliters of cum over the week; the fresh ejaculate is sold for <span class="cash inc">${cashFormat(cumSale)}.</span>`;
		} else if (arcology.FSPastoralistLaw === 1) {
			r += ` ${He} produces ${cum} deciliters of cum over the week; the fresh ejaculate, which is in extremely high demand as one of ${arcology.name}'s few legal sources of animal protein, is sold for <span class="cash inc">${cashFormat(cumSale)}.</span>`;
		} else {
			r += ` ${He} produces ${cum} deciliters of cum over the week; the fresh ejaculate, which is in high demand given the new cultural preference for slave products, is sold for <span class="cash inc">${cashFormat(cumSale)}.</span>`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function cumStatistics(slave, preview) {
		cum = cumAmount(slave);

		/* Dairy rework cum half here */
		if (slave.assignment === "work in the dairy") {
			if (V.dairyStimulatorsUpgrade === 1) {
				if (V.dairyStimulatorsSetting > 0) {
					cum += (cum * (0.2 * (V.dairyStimulatorsSetting + V.dairyRestraintsSetting + Math.trunc((50 - slave.physicalAge) / 20))));
				}
				if (slave.chem > 360) {
					cum *= 0.6;
				} else if (slave.chem > 100) {
					cum *= ((600 - slave.chem) / 600);
				}
			} else if (V.Milkmaid !== 0) {
				if (V.Milkmaid.dick > 4 && canAchieveErection(V.Milkmaid)) {
					cum *= 1.2;
				}
			}
		} else if (slave.assignment === "be confined in the arcade") {
			cum *= 0.5;
		}

		cum = Math.trunc(cum);
		if (cum < 1) {
			cum = 1;
		}

		if (arcology.FSPastoralist === "unset") {
			cumSale = (cum * jsRandom(15, 25));
		} else if (arcology.FSPastoralistLaw === 1) {
			cumSale = (cum * (jsRandom(20, 40)));
		} else {
			cumSale = (cum * (jsRandom(10, 20) + Math.trunc(arcology.FSPastoralist / 10)));
		}
		if (slave.vasectomy === 1 || slave.ballType === "sterile") {
			cumSale *= 0.2;
		}
		if (slave.prostate === 3) {
			cumSale *= 0.5;
		}

		// Consider returning these if this function gets gutted
		if (!preview) {
			actX(slave, "cum", cum);
			T.incomeStats.cum = cum;
			T.incomeStats.income += cumSale;
		}
		return cumSale;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function cumEffects(slave) {
		if (slave.energy > 95) {
			r += ` Getting ${his} dick constantly milked is almost as good as getting constant blowjobs as far as ${he}'s concerned. <span class="devotion inc">${He} is happy</span> to have ${his} member receive so much attention.`;
			slave.devotion += 1;
		}

		if (slave.need > 0) {
			r += ` ${His} cock and balls are milked so thoroughly that ${he}'s involuntarily sexually sated, regardless of ${his} feelings and tastes.`;
			slave.need = 0;
		}

		if (!canAchieveErection(slave)) {
			r += ` Since ${he} cannot maintain an erection, ${he} requires <span class="trust dec">painful</span> and <span class="devotion dec">degrading</span> anal electrostimulation to produce.`;
			slave.devotion -= 2;
			slave.trust -= 2;
			if (slave.anus === 0) {
				r += ` The electrostimulator <span class="virginity loss">breaks in ${his} virgin asshole.</span>`;
				slave.anus = 1;
			}
		} else if (slave.devotion <= 20) {
			r += ` Since ${he}'s unaroused by ${his} situation, ${he} requires <span class="trust dec">painful</span> and <span class="devotion dec">degrading</span> anal electrostimulation to produce.`;
			slave.devotion -= 2;
			slave.trust -= 2;
			if (slave.anus === 0) {
				r += ` The electrostimulator <span class="virginity loss">breaks in ${his} virgin asshole.</span>`;
				slave.anus = 1;
			}
		}

		if (slave.balls < 3 && slave.ballType !== "sterile") {
			if (slave.balls < 2) {
				if (jsRandom(1, 100) > (70 + (slave.geneMods.NCS * 15))) {
					r += ` Constant semen production and continual emptying and refilling <span class="change positive">increases the size of ${his} tiny testicles.</span>`;
					slave.balls += 1;
				}
			} else if (jsRandom(1, 100) > (90 + (slave.geneMods.NCS * 5))) {
				r += ` Constant semen production and continual emptying and refilling <span class="change positive">increases the size of ${his} small testicles.</span>`;
				slave.balls += 1;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function harvestGirlCum(slave) {
		/* fluid = ((slave.prostate * (slave.energy / 5)) + 1); // Set it or else! */
		r += ` ${His} female prostate fluid is considered an exotic delicacy.`;
		if (slave.vagina >= 0) {
			if (slave.vaginaLube === 2) {
				r += ` ${His} excessive vaginal secretions bolster the mix.`;
			} else if (slave.vaginaLube === 1) {
				r += ` ${His} natural vaginal secretions add to the mix.`;
			}
		}
		if (slave.energy > 10) {
			if (slave.health.condition > 50) {
				if (slave.energy > 90) {
					r += ` As a nympho, ${he} has no trouble orgasming almost constantly.`;
				}
				r += ` ${His} shining health keeps ${his} juices flowing.`;
			} else if (slave.health.condition < -50) {
				r += ` ${He} is so unwell, ${he} produces less than normal.`;
			}
		} else {
			/* slave.energy <= 10 */
			r += ` Unfortunately, ${he} is frigid and rarely reaches orgasm in spite of the intense automatic stimulation.`;
		}

		// make sure fluidSale is set here
		r += ` ${fluid} deciliters of uncommon ejaculate is gathered during ${his} milkings.`;
		if (arcology.FSPastoralist !== "unset" && arcology.FSPastoralist > 30) {
			r += ` Because of your arcology's cultural preferences, it comes with extra value.`;
		}
		r += ` It is sold for <span class="cash inc">${cashFormat(fluidSale)}.</span>`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function girlCumStatistics(slave, preview) {
		fluid = ((slave.prostate * (slave.energy / 5)) + 1);
		if (slave.vagina >= 0) {
			if (slave.vaginaLube === 2) {
				fluid *= 1.3;
			} else if (slave.vaginaLube === 1) {
				fluid *= 1.1;
			}
		}
		if (slave.energy > 10) {
			if (slave.health.condition > 50) {
				fluid *= (slave.health.condition / 50);
			} else if (slave.health.condition < -50) {
				fluid *= (1 + (slave.health.condition / 50));
			}
		}
		fluid = Math.trunc(fluid);
		if (fluid < 1) {
			fluid = 1;
		}

		fluidSale = (fluid * jsRandom(40, 50));
		if (arcology.FSPastoralist !== "unset" && arcology.FSPastoralist > 30) {
			fluidSale = (Math.trunc(fluidSale*(1 + (arcology.FSPastoralist - 30) / 140))); /* fully accepted pastoralism gives +50% on the price*/
		}

		// Consider returning these if this function gets gutted
		if (!preview) {
			T.incomeStats.fluid = fluid;
			T.incomeStats.income += fluidSale;
		}

		return fluidSale;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function mentalEffects(slave) {
		if (slave.assignment === "get milked" || (slave.assignment === "work in the dairy" && V.dairyRestraintsSetting < 2)) {
			if (slave.behavioralQuirk === "fitness") {
				r += ` ${slave.slaveName} <span class="devotion inc">privately enjoys</span> the focus on ${his} health and fitness that comes with being a cow.`;
				slave.devotion += 1;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function assignmentVignette(slave) {
		const vignette = GetVignette(slave);
		const FuckResult = FResult(slave); // Got to be something better than this
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
			if (slave.assignment === "work in the dairy") {
				cashX(cashVign, "milkedDairy", slave);
			} else if (slave.assignment === "get milked") {
				cashX(cashVign, "milked", slave);
			} else {
				cashX(cashVign, "extraMilk", slave);
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
			} else if (vignette.effect < 0) {
				r += `<span class="health dec">affecting ${his} health.</span>`;
			} else {
				r += `an incident without lasting effect.`;
			}
			improveCondition(slave, 2 * vignette.effect);
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

	// FACILITY DECORATION IMPACTS
	function applyFSDecoration() {
		if (V.dairyDecoration !== "standard") {
			let fsGain = Math.min(0.0001 * V.FSSingleSlaveRep * (milk + (5 * cum)), 1);
			switch (V.dairyDecoration) {
				case "Roman Revivalist":
					arcology.FSRomanRevivalist = Math.clamp(arcology.FSRomanRevivalist += fsGain, 0, 100);
					break;
				case "Aztec Revivalist":
					arcology.FSAztecRevivalist = Math.clamp(arcology.FSAztecRevivalist += fsGain, 0, 100);
					break;
				case "Egyptian Revivalist":
					arcology.FSEgyptianRevivalist = Math.clamp(arcology.FSEgyptianRevivalist += fsGain, 0, 100);
					break;
				case "Edo Revivalist":
					arcology.FSEdoRevivalist = Math.clamp(arcology.FSEdoRevivalist += fsGain, 0, 100);
					break;
				case "Arabian Revivalist":
					arcology.FSArabianRevivalist = Math.clamp(arcology.FSArabianRevivalist += fsGain, 0, 100);
					break;
				case "Chinese Revivalist":
					arcology.FSChineseRevivalist = Math.clamp(arcology.FSChineseRevivalist += fsGain, 0, 100);
					break;
				case "Chattel Religionist":
					arcology.FSChattelReligionist = Math.clamp(arcology.FSChattelReligionist += fsGain, 0, 100);
					break;
				case "Degradationist":
					arcology.FSDegradationist = Math.clamp(arcology.FSDegradationist += fsGain, 0, 100);
					break;
				case "Repopulation Focus":
					arcology.FSRepopulationFocus = Math.clamp(arcology.FSRepopulationFocus += fsGain, 0, 100);
					break;
				case "Eugenics":
					arcology.FSRestart = Math.clamp(arcology.FSRestart += fsGain, 0, 100);
					break;
				case "Asset Expansionist":
					arcology.FSAssetExpansionist = Math.clamp(arcology.FSAssetExpansionist += fsGain, 0, 100);
					break;
				case "Transformation Fetishist":
					arcology.FSTransformationFetishist = Math.clamp(arcology.FSTransformationFetishist += fsGain, 0, 100);
					break;
				case "Gender Radicalist":
					arcology.FSGenderRadicalist = Math.clamp(arcology.FSGenderRadicalist += fsGain, 0, 100);
					break;
				case "Gender Fundamentalist":
					arcology.FSGenderFundamentalist = Math.clamp(arcology.FSGenderFundamentalist += fsGain, 0, 100);
					break;
				case "Physical Idealist":
					arcology.FSPhysicalIdealist = Math.clamp(arcology.FSPhysicalIdealist += fsGain, 0, 100);
					break;
				case "Hedonistic":
					arcology.FSHedonisticDecadence = Math.clamp(arcology.FSHedonisticDecadence += fsGain, 0, 100);
					break;
				case "Supremacist":
					arcology.FSSupremacist = Math.clamp(arcology.FSSupremacist += fsGain, 0, 100);
					break;
				case "Subjugationist":
					arcology.FSSubjugationist = Math.clamp(arcology.FSSubjugationist += fsGain, 0, 100);
					break;
				case "Paternalist":
					arcology.FSPaternalist = Math.clamp(arcology.FSPaternalist += fsGain, 0, 100);
					break;
				case "Pastoralist":
					arcology.FSPastoralist = Math.clamp(arcology.FSPastoralist += fsGain, 0, 100);
					break;
				case "Maturity Preferentialist":
					arcology.FSMaturityPreferentialist = Math.clamp(arcology.FSMaturityPreferentialist += fsGain, 0, 100);
					break;
				case "Youth Preferentialist":
					arcology.FSYouthPreferentialist = Math.clamp(arcology.FSYouthPreferentialist += fsGain, 0, 100);
					break;
				case "Body Purist":
					arcology.FSBodyPurist = Math.clamp(arcology.FSBodyPurist += fsGain, 0, 100);
					break;
				case "Slimness Enthusiast":
					arcology.FSSlimnessEnthusiast = Math.clamp(arcology.FSSlimnessEnthusiast += fsGain, 0, 100);
					break;
				case "Slave Professionalism":
					arcology.FSSlaveProfessionalism = Math.clamp(arcology.FSSlaveProfessionalism += fsGain, 0, 100);
					break;
				case "Intellectual Dependency":
					arcology.FSIntellectualDependency = Math.clamp(arcology.FSIntellectualDependency += fsGain, 0, 100);
					break;
				case "Petite Admiration":
					arcology.FSPetiteAdmiration = Math.clamp(arcology.FSPetiteAdmiration += fsGain, 0, 100);
					break;
				case "Statuesque Glorification":
					arcology.FSStatuesqueGlorification = Math.clamp(arcology.FSStatuesqueGlorification += fsGain, 0, 100);
					break;
			}
		}
	}
})();
