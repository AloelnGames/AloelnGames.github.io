// MAIN FUNCTIONS

App.Facilities.Farmyard.farmyardReport = () => {
	const
		slaves = V.slaves,
		Farmer = V.Farmer,
		FL = V.FarmyardiIDs.length;

	let
		t = ``,
		profits = 0,
		foodWeek = 0;
	let he, him, his, hers, himself, girl, loli, He, His;   // TODO: alternative method?



	// FARMER

	const farmerHealth = slave => {
		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 15);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 7);
		}
	};

	const farmerFetish = slave => {
		if (slave.fetish !== 'dom') {
			if (fetishChangeChance(slave) > jsRandom(0, 100)) {
				slave.fetishKnown = 1;
				slave.fetish = 'dom';
				return 1;
			}
		} else if (!slave.fetishKnown) {
			slave.fetishKnown = 1;
			return 1;
		} else {
			slave.fetishStrength += 4;
			return 2;
		}
	};

	const farmerFetishEffects = (fetish = 0) => {
		if (fetish === 1) {
			return `${He} isn't above sampling the merchandise ${himself}; before long it's obvious to ${his} workers that ${he} <span class="lightcoral">really likes fucking them.</span> `;
		} else if (fetish === 2) {
			return `${He}'s careful that all of the farmhands under ${his} supervision are all ready to work every morning, and ${he} <span class="lightsalmon">becomes more dominant.</span> `;
		}
	};

	const farmerSkill = slave => {
		let t = ``;

		if (slave.skill.farmer <= 10) {
			t += `Though ${slave.slaveName} does ${his} best to manage the farmyard, with ${his} lack of skill ${he} can do little. `;
		} else if (slave.skill.farmer <= 30) {
			t += `${slave.slaveName}'s basic skills marginally <span class="yellowgreen">improve</span> business at ${V.farmyardName}. `;
		} else if (slave.skill.farmer <= 60) {
			t += `${slave.slaveName}'s skills <span class="yellowgreen">improve</span> business at ${V.farmyardName}. `;
		} else if (slave.skill.farmer < 100) {
			t += `${slave.slaveName}'s skills greatly <span class="yellowgreen">improve</span> business at ${V.farmyardName}. `;
		} else {
			t += `${slave.slaveName}'s mastery immensely <span class="yellowgreen">improves</span> business at ${V.farmyardName}. `;
		}

		t += slave.actualAge > 35 ?`${His} age and experience also contribute. ` : ``;

		return t;
	};

	const farmerCashBonus = slave => {
		let FarmerCashBonus = Math.min(0.2, slave.skill.farmer * 0.002);

		FarmerCashBonus += slave.intelligence + slave.intelligenceImplant > 15 ? 0.05 : 0;
		FarmerCashBonus += slave.dick > 2 && canPenetrate(slave) ? 0.05 : 0;
		FarmerCashBonus += !canSmell(slave) ? 0.05 : 0;

		if (slave.actualAge > 35) {
			FarmerCashBonus += 0.05;
		} else if (!V.AgePenalty) {
			FarmerCashBonus += 0.05;
		}

		if (setup.farmerCareers.includes(slave.career)) {
			FarmerCashBonus += 0.05;
			if (slave.skill.farmer >= V.masteredXP) {
				FarmerCashBonus += 0.05;
			}
		} else if (slave.skill.farmer >= V.masteredXP) {
			FarmerCashBonus += 0.05;
		}

		if (Farmer.relationshipTarget === slave.ID) {
			FarmerCashBonus -= 0.05;
		} else if (areRelated(Farmer, slave)) {
			FarmerCashBonus += 0.05;
		}

		return FarmerCashBonus;
	};


	const farmerExperience = slave => {
		if (setup.farmerCareers.includes(slave.career)) {
			return `${He} has experience from ${his} life before ${he} was a slave that helps ${him} in the difficult life of managing animals and property. `;
		} else if (slave.skill.farmer >= V.masteredXP) {
			return `${He} has experience from working for you that helps ${him} in the difficult life of managing animals and property. `;
		} else {
			slave.skill.farmer += jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 32));
		}
	};


	const farmerDick = slave => {
		if (slave.dick > 2 && canPenetrate(slave)) {
			return `${His} turgid dick helps ${him} manage ${his} workers. `;
		}
	};


	const farmerRelationshipSlaves = (length, Farmer) => {
		for (let i = length; i--;) {
			const
				s = V.slaveIndices[V.FarmyardiIDs[i]],
				slave = V.slaves[s],
				p = getPronouns(Farmer);

			let t = ``;

			if (Farmer.rivalryTarget === slave.ID) {
				t += `${p.He} forces ${p.his} ${rivalryTerm(Farmer)} to service all the slaves in ${V.farmyardName}. `;    // TODO: not sure about this
				slave.devotion -= 2; slaves.trust -= 2;
				if (canDoVaginal(slave)) {
					seX(slave, 'vaginal', 'public', 'penetrative', 10);
				}
				if (canDoAnal(slave)) {
					seX(slave, 'anal', 'public', 'penetrative', 10);
				}
				seX(slave, 'oral', 'public', 'penetrative', 10);
				if (jsRandom(1, 100) > 65) {
					Farmer.rivalry++; slave.rivalry++;
				}
			} else if (Farmer.relationshipTarget === slave.ID) {
				t += `${p.He} dotes over ${p.his} ${relationshipTerm(Farmer)}, ${slave.slaveName}, making sure ${he} isn't worked too hard, but unfortunately manages to get in the way of ${his} work. `;
				slave.devotion++;
			} else if (areRelated(Farmer, slave)) {
				t += `${p.He} pays special attention to ${p.his} ${relativeTerm(Farmer.ID, slave.ID)}, ${slave.slaveName}, making sure ${he} is treated well and showing off ${his} skills. `;
				slave.trust++;
			}

			return t;
		}
	};

	const farmerWorks = slave => {
		let
			t = ``,
			oldCash = V.cash,
			seed,
			beauty;

		if (V.showEWD) {
			t += `<br>&nbsp;&nbsp;&nbsp;&nbsp;${He} ${saWorkTheFarm(slave)}`;
		} else {
			saWorkTheFarm(slave);
		}

		seed = V.cash - oldCash;
		cashX(Math.trunc(0.5 * seed), 'farmyard');
		seed = Math.trunc(1.5 * seed);
		profits += seed;
		beauty = Beauty(V.activeSlave);

		t += `<br>&nbsp;&nbsp;&nbsp;&nbsp;Since ${he} doesn't have enough farmhands to manage to keep ${him} busy, ${he} sees ${beauty} customers ${himself} (${Math.trunc(beauty / 7)} a day), earning you <span class="yellowgreen">${cashFormat(seed)}</span> ${He} can charge more for ${his} time, since many citizens find it erotic to fuck the Farmer. `;

		return t;
	};

	const farmerEndWeek = slave => {
		let t = ``;

		if (V.showEWD) {
			t += `<br><br>`;
			/* 000-250-006 */   // TODO: legacy - needed?
			if (V.seeImages && V.seeReportImages) {
				t += `<div class="imageRef tinyImg">
					  ${SlaveArt(slave, 0, 0)}
				  </div>`;
			}
			/* 000-250-006 */
			t += `<span class="slave-name">${SlaveFullName(slave)}</span> is serving as the Farmer. `;
			t += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
			t += saChoosesOwnClothes(slave);
			t += `<<include "SA rules">>`;
			t += `<<include "SA diet">>`;
			t += `<<include "SA long term effects">>`;
			t += `<<include "SA drugs">>`;
			t += `<<include "SA relationships">>`;
			t += `<<include "SA rivalries">>`;
			t += `<br><<include "SA devotion">>`;
		} else {
			saChoosesOwnClothes(slave);
			t += `<<silently>><<include "SA rules">><</silently>>`;
			t += `<<silently>><<include "SA diet">><</silently>>`;
			t += `<<silently>><<include "SA long term effects">><</silently>>`;
			t += `<<silently>><<include "SA drugs">><</silently>>`;
			t += `<<silently>><<include "SA relationships">><</silently>>`;
			t += `<<silently>><<include "SA rivalries">><</silently>>`;
			t += `<<silently>><br><<include "SA devotion">><</silently>>`;
		}

		return t;
	};

	const farmerRelationshipPC = slave => slave.relationship === -3 && slave.devotion > 50 ? `As your loving ${wife}, ${he} does ${his} best to ensure ${V.farmyardName} runs smoothly. ` : ``;

	const farmerAgeSkill = slave => slave.actualAge > 35 ? `${His} age and experience also contribute. ` : ``;

	const farmerIntelligence = slave => slave.intelligence + slave.intelligenceImplant > 15 ? `${He} is a clever manager. ` : ``;

	const farmerSmell = slave => !canSmell(slave) ? `${His} lack of a sense of smell protects ${him} from that omnipresent barnyard stench. ` : ``;

	const farmerIntro = slave => `&nbsp;&nbsp;&nbsp;&nbsp;${SlaveFullName(slave)} is serving as the Farmer. `;

	const farmerDevotion = slave => slave.devotion < 45 ? slave.devotion += 5 : null;

	const farmerTrust = slave => slave.trust < 45 ? slave.trust += 5 : null;

	const farmerLivingRules = slave => slave.rules.living !== 'luxurious' ? slave.rules.living = 'luxurious' : null;



	// FARMHANDS

	const farmhandCount = count => count > 0 ? `&nbsp;&nbsp;&nbsp;&nbsp;There ${count !== 1 ? `are ${count} farmhands` : `is one farmhand`} working out of ${V.farmyardName}.` : ``;

	const farmhandLivingRules = slave => {
		switch (V.farmyardDecoration) {
			case 'Degradation':
			case 'standard':
				slave.rules.living = 'spare';
				break;
			case 'Roman Revivalist':
				slave.rules.living = 'luxurious';
				break;
			default:
				slave.rules.living = 'normal';
		}
		// TODO: should FS with 'spare' living rules cause minor health damage and devotion / trust loss?
	};

	const farmhandHealth = slave => {
		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 15);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 7);
		}
	};

	// TODO: check over all of these numbers, make sure they make sense
	const farmhandDevotion = slave => {
		if (slave.devotion <= 20 && slave.trust >= -20) {
			slave.devotion -= 5; slave.trust -= 5;
		} else if (slave.devotion < 45) {
			slave.devotion += 4;
		} else if (slave.devotion > 50) {
			slave.devotion -= 4;
		}
	};

	const farmhandEndWeek = slave => {
		let t = ``;

		if (V.showEWD) {
			t += `<br><br>`;
			/* 000-250-006 */   // TODO: legacy - needed?
			if (V.seeImages && V.seeReportImages) {
				t += `<div class="imageRef tinyImg">
					  ${SlaveArt(slave, 0, 0)}
				  </div>`;
			}
			/* 000-250-006 */
			t += `<span class="slave-name">${SlaveFullName(slave)}</span> ${slave.choosesOwnAssignment === 2 ? `<<include "SA chooses own job">>` : `is working out of ${V.farmyardName}`}. `;
			t += `<br>&nbsp;&nbsp;&nbsp;&nbsp;${He} ${saWorkTheFarm(slave)}`;
			t += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
			t += saChoosesOwnClothes(slave);
			t += `<<include "SA rules">>`;
			t += `<<include "SA diet">>`;
			t += `<<include "SA long term effects">>`;
			t += `<<include "SA drugs">>`;
			t += `<<include "SA relationships">>`;
			t += `<<include "SA rivalries">>`;
			t += `<br><<include "SA devotion">>`;
		} else {
			t += `<<silently>><<include "SA chooses own job">><</silently>>`;
			t += saChoosesOwnClothes(slave);
			t += `<<silently>><<include "SA rules">><</silently>>`;
			t += `<<silently>><<include "SA diet">><</silently>>`;
			t += `<<silently>><<include "SA long term effects">><</silently>>`;
			t += `<<silently>><<include "SA drugs">><</silently>>`;
			t += `<<silently>><<include "SA relationships">><</silently>>`;
			t += `<<silently>><<include "SA rivalries">><</silently>>`;
			t += `<<silently>><br><<include "SA devotion">><</silently>>`;
		}

		return t;
	};

	const farmhandProfit = slave => {
		let incomeStats = getSlaveStatisticData(slave, slave.assignment === Job.FARMYARD ? V.facility.farmyard : undefined);
		return incomeStats.income;
	};

	const farmhandFood = slave => {
		let
			incomeStats = getSlaveStatisticData(slave, slave.assignment === Job.FARMYARD ? V.facility.farmyard : undefined),
			foodWeek = 0;

		foodWeek += incomeStats.food;
		if (V.farmMenials > 0) {
			foodWeek += (V.farmMenials * 350);
		}

		return foodWeek;
	};

	const farmhandTrust = slave => slave.trust < 30 ? slave.trust += 5 : null;

	const farmhandEnergy = slave => slave.energy > 40 && slave.energy < 95 ? slave.energy++ : null;

	// FARMYARD

	const farmyardStatsRecords = () => {
		// TODO: check over these setters and remove those we don't need
		let f = V.facility.farmyard;

		f.farmhandIncome = 0;
		f.customers = 0;
		f.farmhandCosts = 0;
		f.rep = 0;
		f.adsCosts = V.farmyardAdsSpending;
		f.maintenance = V.farmyard * V.facilityCost;
		f.totalIncome = f.farmhandIncome + f.adsIncome;
		f.totalExpenses = f.farmhandCosts + f.maintenance;
		f.profit = f.totalIncome - f.totalExpenses;

		for (let i of f.income.values()) {
			f.farmhandIncome += i.income + i.adsIncome;
			f.customers += i.customers;
			f.farmhandCosts += i.cost;
			f.rep += i.rep;
		}
	};

	const farmyardDecoration = () => {
		let t = ``;

		// TODO: add checks for the different FSs
		if (V.farmyardDecoration !== 'standard') {
			if (!profits && !foodWeek) {
				t += `<br>`;
			}
			t += `<br>${V.farmyardNameCaps}'s customer's enjoyed `;
			if (V.seeBestiality && V.farmyardBreeding > 0 && (V.canines.length || V.hooved.length || V.felines.length)) {
				t += `<span class="green">watching farmhands fuck animals in ${V.farmyardDecoration} surroundings.</span>`;
			} else if (V.farmyardShows) {
				t += `<span class="green">watching farmhands put on shows in ${V.farmyardDecoration} surroundings.</span>`;
			} else {
				// TODO: not sure about this one
				t += `<span class="green">partaking of ${V.farmyardName}'s fine produce in its ${V.farmyardDecoration} décor.</span>`;
			}
		}

		return t;
	};

	const farmyardProfit = (profit, foodWeek) => {
		let t = ``;

		if (profit || foodWeek) {
			t += `<br><br>${V.farmyardNameCaps} `;
			if (profit) {
				t += `makes you <span class="yellowgreen">${cashFormat(Math.trunc(profit))}</span>`;
			}
			if (profit && foodWeek && V.foodMarket) {
				t += ` and `;
			}
			if (foodWeek && V.foodMarket) {
				t += `produced <span class="chocolate"> ${massFormat(foodWeek)}</span> of food`;
			}
			t += ` this week. `;
		}

		return t;
	};

	const farmyardStatsDisplay = () => `<<FarmyardStatistics 0>><<timed 50ms>><<replace #farmyardstats>><<FarmyardStatistics 1>><</replace>><</timed>>`;

	t += `<span id="farmyardstats"></span>`;
	SlaveSort.IDs(V.FarmyardiIDs);  // TODO: not sure if I called this correctly



	// MAIN LOOP

	if (Farmer) {
		t += farmerHealth(Farmer);
		t += farmerDevotion(Farmer);
		t += farmerTrust(Farmer);
		t += farmerLivingRules(Farmer);

		getSlaveStatisticData(Farmer, V.facility.farmyard); // make sure we have registered living expenses

		t += farmerIntro(Farmer);
		t += farmerRelationshipPC(Farmer);
		t += farmerFetishEffects(farmerFetish(Farmer));
		t += farmerSkill(Farmer);
		t += farmerCashBonus(Farmer);
		t += farmerAgeSkill(Farmer);
		t += farmerExperience(Farmer);
		t += farmerIntelligence(Farmer);
		t += farmerDick(Farmer);
		t += farmerSmell(Farmer);
		t += farmerRelationshipSlaves(FL, Farmer);
		t += farmerWorks(Farmer);
	}

	t += farmhandCount(FL);

	if (Farmer) {
		t += farmerEndWeek(Farmer);
	}

	if (FL > 0) {
		let oldCash = V.cash,
			oldFood = V.food;

		for (let i = FL; i--;) {
			V.i = V.slaveIndices[V.FarmyardiIDs[i]];
			const slave = slaves[V.i];

			({
				he, him, his, hers, himself, girl, He, His, loli
			} = getPronouns(slave));

			farmhandLivingRules(slave);
			farmhandHealth(slave);
			farmhandDevotion(slave);
			farmhandTrust(slave);
			farmhandEnergy(slave);
			farmhandFood(slave);
			profits += farmhandProfit(slave);

			t += farmhandEndWeek(slave);
		}

		profits += V.cash - oldCash;    // FIXME: equal to 0 - what is this supposed to represent?
		oldCash = V.cash;
		foodWeek += V.food + oldFood;
	}

	farmyardStatsRecords();
	t += farmyardProfit(profits, foodWeek);
	t += farmyardDecoration();
	t += farmyardStatsDisplay();

	V.food += foodWeek;

	return t;
};
