/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.saWorkTheFarm = function(slave) {
	const arcology = V.arcologies[0];
	const {
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave),
		incomeStats = getSlaveStatisticData(slave, V.facility.farmyard);

	let food = Math.trunc(App.Facilities.Farmyard.foodAmount(slave));
	let t = `works as a farmhand this week. `;



	const foodTotal = (slave, food) => {
		t += foodFarmer();
		t += foodDevotion(slave);
		t += foodHealth(slave);
		t += foodMuscles(slave);
		t += foodWeight(slave);
		t += foodSight(slave);
		t += foodHearing(slave);

		t += V.foodMarket ? `As a result, ${he} produces <span class="chocolate">${massFormat(food)}</span> of food over the week. ` : ``;
	};

	const foodFarmer = () => {
		if (V.Farmer) {
			return `${V.Farmer.slaveName} watches over ${him}, making sure that ${he} doesn't slack off and works as hard as ${he} should. `;
		}
	};

	const foodDevotion = slave => {
		if (slave.devotion > 50) {
			return `${He}'s so devoted to you that ${he} works harder and produces more food. `;
		} else if (slave.devotion < -50) {
			return `${He}'s so resistant that ${he} doesn't work as hard, and thus produces less food. `;
		} else {
			// TODO: third case for neutral?
		}
	};

	const foodHealth = slave => {
		foodHealthCondition(slave);
		foodHealthIllness(slave);
	};

	const foodHealthCondition = slave => {
		if (slave.health.condition > 50) {
			return `${His} shining health helps ${him} work harder and longer. `;
		} else if (slave.health.condition < -50) {
			return `${His} poor health impedes ${his} ability to work efficiently. `;
		} else {
			// TODO: third case?
		}
	};

	const foodHealthIllness = slave => {
		if (slave.health.illness > 0 || slave.health.tired > 60) {
			let t = ` ${He} performed worse this week due to<span class="red">`;
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
				foodHealthTired(slave);
			}

			t += `.</span> `;

			return t;
		}
	};

	const foodHealthTired = slave => {
		if (slave.health.tired > 90) {
			return ` exhaustion`;
		} else if (slave.health.tired > 60) {
			return ` being tired`;
		}
	};

	const foodMuscles = slave => {
		if (slave.muscles > 50) {
			return `${His} muscular form helps ${him} work better, increasing ${his} productivity. `;
		} else if (slave.muscles < -50) {
			return `${He} is so weak that ${he} is not able to work effectively. `;
		} else {
			// TODO: third case?
		}
	};

	const foodWeight = slave => {
		return slave.weight > 95 ? `${He} is so overweight that ${he} has to stop every few minutes to catch ${his} breath, and so ${his} productivity suffers. ` : null;
	};

	const foodSight = slave => {
		if (!canSee(slave)) {
			t += `${His} blindness makes it extremely difficult for ${him} to work, severely limiting ${his} production. `;
		} else if (!canSeePerfectly(slave)) {
			t += `${His} nearsightedness makes it harder for ${him} to work as hard as ${he} otherwise would. `;
		} else {
			// TODO: third case?
		}
	};

	const foodHearing = slave => {
		if (slave.hears === -1) {
			return `${He} is hard-of-hearing, which gets in the way of ${his} work whenever ${he} misses directions${V.Farmer ? ` from ${V.Farmer.slaveName}` : ``}. `;
		} else if (slave.hears < -1) {
			return `${He} is deaf, which gets in the way of ${his} work whenever ${he} misses directions${V.Farmer ? ` from ${V.Farmer.slaveName}` : ``}. `;
		} else {
			// TODO: third case?
		}
	};


	if (V.Farmer !== 0) {
		t += `While there, ${he} benefits from ${V.Farmer.slaveName}'s `;
		if (V.Farmer.physicalAge < 21) {
			t += `youthful energy`;
		} else {
			t += `care`;
		}
		if (V.Farmer.skill.oral) { // TODO: keep this? replace with something else?
			t += ` and talented tongue`;
		}
		t += `. `;
		if (slave.devotion < V.FarmerDevotionThreshold) {
			slave.devotion += V.FarmerDevotionBonus;
		}
		if (slave.devotion < V.FarmerTrustThreshold) {
			slave.trust += V.FarmerTrustBonus;
		}
		if (slave.health.condition < 100) {
			improveCondition(slave, V.FarmerHealthBonus);
		}
	}

	// Open Food Production

	if (V.foodMarket) {
		if (food < 1) {
			food = 1;
		}
		V.food += food;
		V.foodTotal += food;
		incomeStats.food += food;

		foodTotal(slave, food);
	}

	// Close Food Production

	// Open Shows

	incomeStats.income += App.Facilities.Farmyard.farmShowsIncome(slave);

	if (V.farmyardShows) {
		t += `${He} also puts on shows with animals this week. `;

		// Open FS Subsection

		if (arcology.FSSupremacist !== "unset") {
			if (slave.race === arcology.FSSupremacistRace) {
				t += `Society <span class="red">disapproves</span> of your allowing a member of the elite race to be degraded in such a fashion, and thus ${he} didn't earn as much. `;
			}
		}
		if (arcology.FSSubjugationist !== "unset") {
			if (slave.race === arcology.FSSubjugationistRace) {
				t += `Society <span class="green">approves</span> of the degradation you submit your ${arcology.FSSubjugationistRace} slaves to, and so ${he} earns you a bit more. `;
			} else {
				t += `Society doesn't disapprove of ${him} not being ${arcology.FSSubjugationistRace}, but ${he} doesn't earn as much as ${he} would if ${he} was ${arcology.FSSubjugationistRace}. `;
			}
		}
		if (arcology.FSRepopulationFocus !== "unset") {
			if (slave.pregWeek > 16) {
				if (slave.eggType !== "human") {
					t += `Society is <span class="red">disgusted</span> by ${his} pregnancy when they realize that what it is in ${his} womb is not human. `;
				} else {
					t += `Society <span class="green">greatly approves</span> of your having pregnant slaves `;
					if (V.seeBestiality === 1) {
						t += `have sex`;
					} else {
						t += `put on shows`;
					}
					t += ` with animals. `;
				}
			}
		}
		if (arcology.FSRestart !== "unset") {
			if (slave.pregWeek > 16) {
				if (slave.eggType !== "human") {
					t += `Society is disgusted by ${his} pregnancy until they learn that what is in ${his} womb is not human. `;
				} else {
					t += `Society is <span class="red">extremely disgusted</span> by ${his} pregnancy and the fact that you would have ${him} `;
					if (V.seeBestiality === 1) {
						t += `have sex`;
					} else if (V.farmyardShows) {
						t += `put on shows`;
					}
					t += ` with animals while sporting a baby bump. `;
				}
			}
		}
		if (arcology.FSGenderRadicalist !== "unset") {
			if (slave.dick > 0) {
				t += `${His} patrons <span class="green">approve</span> of the fact that ${he} has a dick. `;
			} else {
				// TODO: not sure what to do for this
			}
		}
		if (arcology.FSGenderFundamentalist !== "unset") {
			if (slave.pregWeek > 16) {
				t += `${His} patrons <span class="green">approve</span> of the fact that ${he} is sporting a baby bump. `;
			} else {
				// TODO: also this
			}
			if (slave.dick > 0) {
				// TODO: something here?
			}
		}
		if (arcology.FSPaternalist !== "unset") {
			if (V.seeBestiality === 1 && V.farmyardBreeding) {
				t += `Your citizens are <span class="red">very disapproving</span> of the fact that you would allow something as degrading as having your slaves to be knocked up by filthy beasts. `;
			} else {
				t += `Your citizens <span class="red">disapprove</span> of the fact that you would allow your slaves to be degraded in such a manner. `;
			}
		}
		if (arcology.FSDegradationist !== "unset") {
			if (V.seeBestiality === 1 && V.farmyardBreeding) {
				t += `Your citizens are <span class="green">very approving</span> of the fact that you would allow something as degrading as having your slaves to be knocked up by filthy beasts. `;
			} else {
				t += `Your citizens <span class="green">approve</span> of the fact that you would allow your slaves to be degraded in such a manner. `;
			}
		}
		if (arcology.FSBodyPurist !== "unset") {
			/* TODO: requirements for these might change */
			if (slave.boobsImplant > 0) {
				// TODO: add stuff here
			}
			if (slave.buttImplant > 0) {
				// TODO: add stuff here
			}
			if (slave.faceImplant > 0) {
				// TODO: add stuff here
			}
			if (slave.lipsImplant > 0) {
				// TODO: add stuff here
			}
		}
		if (arcology.FSTransformationFetishist !== "unset") {
			/* TODO: requirements for these might change */
			if (slave.boobsImplant > 0) {
				// TODO: add stuff here
			}
			if (slave.buttImplant > 0) {
				// TODO: add stuff here
			}
			if (slave.faceImplant > 0) {
				// TODO: add stuff here
			}
			if (slave.lipsImplant > 0) {
				// TODO: add stuff here
			}
		}
		if (arcology.FSYouthPreferentialist !== "unset") {
			if (slave.visualAge > 25) { // TODO: not sure about this age
				t += `${arcology.name}'s citizens <span class="red">disapprove</span> of your using such old slaves to put on shows. `;
			} else {
				t += `${arcology.name}'s citizens <span class="green">approve</span> of your using young slaves to put on shows. `;
			}
		}
		if (arcology.FSMaturityPreferentialist !== "unset") {
			if (slave.visualAge > 25) { // TODO: not sure about this age
				t += `${arcology.name}'s citizens <span class="green">approve</span> of your using mature slaves to put on shows. `;
			} else {
				t += `${arcology.name}'s citizens <span class="red">disapprove</span> of your using such young slaves to put on shows. `;
			}
		}
		if (arcology.FSSlimnessEnthusiast !== "unset") {
			if (slave.weight > 10) {
				t += `Society finds a slave with such a flabby body <span class="red">absolutely disgusting.</span> `;
			}
			if (slave.boobs > 799) {
				t += `Your citizens `;
				if (slave.weight > 10) {
					t += `also `;
				}
				t += `don't approve of you using a slave with such large tits as a showgirl. `;
			}
			if (slave.butt > 3) {
				// TODO: write this
			}
		}
		if (arcology.FSAssetExpansionist !== "unset") {
			if (slave.weight > 10) {
				// TODO: should weight be in here?
			}
			if (slave.boobs > 799) {
				// TODO: write this
			}
			if (slave.butt > 3) {
				// TODO: write this
			}
		}
		if (arcology.FSPastoralist !== "unset") {
			if (slave.boobs > 799) {
				// TODO: does this make sense?
			}
			if (slave.lactation > 0) {
				// TODO: write this
			}
		}
		if (arcology.FSPhysicalIdealist !== "unset") {
			if (slave.height > 169) {
				// TODO: write this
			} else {
				// TODO: write this
			}
		}
		if (arcology.FSHedonisticDecadence !== "unset") {
			if (slave.weight > 10) {
				// TODO: write this
			} else {
				// TODO: write this
			}
		}
		if (arcology.FSChattelReligionist !== "unset") {
			if (slave.devotion <= 20) {
				// TODO: write this
			} else {
				// TODO: write this
			}
		}

		// Close FS Subsection

		if (setup.entertainmentCareers.includes(slave.career)) {
			t += ` ${He} has experience with putting on shows from ${his} life before ${he} was a slave, making ${him} more effective at putting on shows. `;
		}
		if (setup.farmerCareers.includes(slave.career)) { // TODO: does this even make sense to include?
			// TODO: write this
		}
		if (slave.prestige === 1) {
			t += `Because some of your citizens already know of ${him}, ${he} earns more. `;
		} else if (slave.prestige === 2) {
			t += `Because a lot of your citizens already know of ${him}, ${he} earns quite a bit more. `;
		} else if (slave.prestige === 3) {
			t += `Because ${he} is so famous, ${he} earns a lot more then ${he} would otherwise. `;
		}
		if (slave.porn.prestige === 1) { // TODO: are prestige and pornPrestige mutually exclusive?
			t += `${He} earns a bit more because some of your citizens already know ${him} from porn. `;
		} else if (slave.porn.prestige === 2) {
			t += `${He} earns quite a bit more because a lot of your citizens already know ${him} from porn. `;
		} else if (slave.porn.prestige === 3) {
			t += `${He} earns a lot more because ${he} is so famous from porn. `;
		}
		if (slave.health.condition > 20) {
			t += `${He} is in such excellent health that ${he} is able to put on longer and more energetic shows, earning you more. `;
		} else if (slave.health.condition < -20) {
			t += `${His} poor health negatively affects ${his} ability to put on good shows, cutting into your profits. `;
		}
		if (slave.face > 40) {
			t += `${He} is so `;
			if (slave.genes === "XY") {
				t += `handsome`;
			} else {
				t += `beautiful`;
			}
			t += ` that ${his} audience is willing to pay more to watch ${him} put on shows. `;
		} else if (slave.face > 10) {
			t += `${He} is so `;
			if (slave.genes === "XY") {
				t += `good-looking`;
			} else {
				t += `pretty`;
			}
			t += ` that ${his} audience is willing to pay more to watch ${him} put on shows. `;
		} else if (slave.face < -10) {
			t += `${His} audience isn't willing to pay as much because of how unattractive ${his} face is. `;
		} else if (slave.face < -40) {
			t += `${His} audience isn't willing to pay as much because of how hard ${his} face is to look at. `;
		}
		// TODO: write this block with different combinations of trust / devotion
		if (slave.devotion > 50) {
			// TODO: write this
		} else if (slave.devotion < -50) {
			// TODO: write this
		}
		if (slave.trust > 50) {
			// TODO: write this
		} else if (slave.trust < -50) {
			// TODO: write this
		}
		if (slave.weight > 30 && arcology.FSHedonisticDecadence === "unset") {
			t += `Your citizens are not willing to pay as much to see such a fat slave put on shows, so ${he} loses some income. `;
		} else if (slave.weight < -30) {
			t += `Your citizens don't like watching such a sickly-looking slaves put on shows, so ${he} loses some income. `;
		}
		if (slave.muscles > 30) {
			// TODO: write this - do we want something for muscles?
		} else if (slave.muscles < -30) {
			// TODO: write this - maybe something about the slave's ability to handle the animal?
		}
		if (!canSeePerfectly(slave)) {
			t += `${His} `;
			if (!canSee(slave)) {
				t += `blindness makes it impossible`;
			} else {
				t += `nearsightedness makes it harder`;
			}
			t += ` for ${him} to see what ${he}'s doing, affecting ${his} ability to put on a good show. `;
		}
		if (slave.hears < 0) {
			t += `${His} `;
			if (slave.hears < -1) {
				t += `lack of`;
			} else {
				t += `poor`;
			}
			t += `hearing makes it difficult for ${him} to do a good job of putting on a show. `;
		}
		if (slave.boobs > 800) {
			// TODO: write this
		}
		if (slave.butt > 4) {
			// TODO: write this
		}
		if (slave.preg > 10) {
			// TODO: write this
		}
		if (slave.health.tired > 60) {
			t += `${He} is so tired that the energy in ${his} shows is basically nonexistent, affecting ${his} profits. `;
		}
		if (slave.chem > 10) {
			// TODO: write this - would this make sense to include?
		}
		if (slave.intelligence > 50) {
			// TODO: write this - include something about .intelligenceImplant?
		} else if (slave.intelligence < -50) {
			// TODO: write this
		}
		if (slave.energy <= 20) {
			// TODO: write this
		} else if (slave.energy <= 40) {
			// TODO: write this
		} else if (slave.energy <= 60) {
			// TODO: write this
		} else if (slave.energy <= 80) {
			// TODO: write this
		} else if (slave.energy <= 95) {
			// TODO: write this
		} else {
			// TODO: write this
		}
		if (slave.fetish === "submissive") {
			// TODO: write this
		} else if (slave.fetish === "humiliation") {
			// TODO: write this
		} else if (slave.fetish === "masochist") {
			// TODO: write this
		} // TODO: incorporate quirks
	}

	// Close Shows

	// Open Long-Term Effects

	if (slave.fetishKnown && (slave.fetish === "submissive" || slave.fetish === "humiliation" || slave.fetish === "masochist") || slave.energy > 95) {
		if (V.farmyardShows) {
			if (V.seeBestiality === 1) {
				t += `Getting fucked by animals is the perfect job for ${him}, as far as ${he} can tell. <span class="devotion inc">${He} is happy</span> to spend ${his} days being utterly degraded. `;
			} else {
				t += `${He} loves putting on shows with animals, and as far as ${he} can tell, it's the perfect job for ${him}. <span class="devotion inc">${He} is happy</span> to spend ${his} days doing something so degrading. `; // TODO: not sure how degrading putting on shows is
			}
		}
		slave.devotion += 1;
		if (slave.need) {
			slave.need = 0;
		}
	}
	if (slave.behavioralQuirk === "fitness") {
		t += `${slave.slaveName} <span class="devotion inc">privately enjoys</span> the exercise ${he} receives while working in ${V.farmyardName}. `;
		slave.devotion += 1;
	}

	// Close Long-Term Effects

	// Open Vignettes

	if (V.showVignettes) {
		const vignette = GetVignette(slave);
		t += `<span class="story-label">This week</span> ${vignette.text}`;
		if (vignette.type === "cash") {
			let FResultNumber = FResult(slave);
			if (vignette.effect > 0) {
				t += ` <span class="yellowgreen">making you an extra ${cashFormat(Math.trunc(FResultNumber * vignette.effect))}.</span> `;
			} else if (vignette.effect < 0) {
				t += ` <span class="red">losing you ${cashFormat(Math.abs(Math.trunc(FResultNumber * vignette.effect)))}.</span> `;
			} else {
				t += ` an incident without lasting effect. `;
			}
			cashX(Math.trunc(FResultNumber * vignette.effect), "farmyard");
			incomeStats.income += (Math.trunc(FResultNumber * vignette.effect));
		} else if (vignette.type === "devotion") {
			if (vignette.effect > 0) {
				if (slave.devotion > 50) {
					t += ` <span class="devotion inc">increasing ${his} devotion to you.</span> `;
				} else if (slave.devotion >= 20) {
					t += ` <span class="devotion inc">increasing ${his} acceptance of you.</span> `;
				} else if (slave.devotion >= -20) {
					t += ` <span class="devotion inc">reducing ${his} dislike of you.</span> `;
				} else {
					t += ` <span class="devotion inc">reducing ${his} hatred of you.</span> `;
				}
			} else if (vignette.effect < 0) {
				if (slave.devotion > 50) {
					t += ` <span class="devotion dec">reducing ${his} devotion to you.</span> `;
				} else if (slave.devotion >= 20) {
					t += ` <span class="devotion dec">reducing ${his} acceptance of you.</span> `;
				} else if (slave.devotion >= -20) {
					t += ` <span class="devotion dec">increasing ${his} dislike of you.</span> `;
				} else {
					t += ` <span class="devotion dec">increasing ${his} hatred of you.</span> `;
				}
			} else {
				t += ` an incident without lasting effect. `;
			}
			slave.devotion += 1 * vignette.effect;
		} else if (vignette.type === "trust") {
			if (vignette.effect > 0) {
				if (slave.trust > 20) {
					t += ` <span class="trust inc">increasing ${his} trust in you.</span> `;
				} else if (slave.trust >= -20) {
					t += ` <span class="trust inc">reducing ${his} fear of you.</span> `;
				} else {
					t += ` <span class="trust inc">reducing ${his} terror of you.</span> `;
				}
			} else if (vignette.effect < 0) {
				if (slave.trust > 20) {
					t += ` <span class="trust dec">reducing ${his} trust in you.</span> `;
				} else if (slave.trust >= -20) {
					t += ` <span class="trust dec">increasing ${his} fear of you.</span> `;
				} else {
					t += ` <span class="trust dec">increasing ${his} terror of you.</span> `;
				}
			} else {
				t += ` an incident without lasting effect. `;
			}
			slave.trust += 1 * vignette.effect;
		} else if (vignette.type === "health") {
			if (vignette.effect > 0) {
				t += ` <span class="green">improving ${his} health.</span> `;
				improveCondition(slave, 2 * vignette.effect);
			} else if (vignette.effect < 0) {
				t += ` <span class="red">affecting ${his} health.</span> `;
				healthDamage(slave, 2 * vignette.effect);
			} else {
				t += ` an incident without lasting effect. `;
			}
		} else {
			let FResultNumber = FResult(slave);
			if (vignette.effect > 0) {
				t += ` <span class="green">gaining you a bit of reputation.</span> `;
			} else if (vignette.effect < 0) {
				t += ` <span class="red">losing you a bit of reputation.</span> `;
			} else {
				t += ` an incident without lasting effect. `;
			}
			repX(Math.trunc(FResultNumber * vignette.effect * 0.1), "vignette", slave);
			incomeStats.rep += Math.trunc(FResultNumber * vignette.effect * 0.1);
		}
	}

	// Close Vignettes

	// Open Facility Decorations

	if (V.farmyardDecoration !== "standard") {
		const fsGain = Math.min(0.0001 * V.FSSingleSlaveRep * (food), 1);
		switch (V.farmyardDecoration) {
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
	return t;
};
