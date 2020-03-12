App.Medicine.Modification = {};

/**
 * Basic application of scar
 * @param {App.Entity.SlaveState} slave
 * @param {string} scar
 * @param {string} design
 * @param {number} weight
 */
App.Medicine.Modification.addScar = function(slave, scar, design, weight) {
	/*
	V.scarApplied = 1;
	V.degradation += 10;
	surgeryDamage(slave, 10); // dangerous to uncomment this as sometimes many scars are applied at once.
	cashX(forceNeg(surgery.costs), "slaveSurgery", slave);
	surgeryDamage(slave, (V.PC.skill.medicine >= 100) ? Math.round(surgery.healthCosts / 2) : surgery.healthCosts);*/
	if (!weight) {
		weight = 1;
	}
	if (!slave.scar.hasOwnProperty(scar)) {
		slave.scar[scar] = new App.Entity.scarState();
	}
	if (!slave.scar[scar].hasOwnProperty(design)) {
		slave.scar[scar][design] = weight;
	} else {
		slave.scar[scar][design] += weight;
	}
};
/**
 * Basic application of scar
 * @param {App.Entity.SlaveState} slave
 * @param {string} scar
 * @param {string} design
 */
App.Medicine.Modification.removeScar = function(slave, scar, design) {
	/*
	V.scarApplied = 1;
	V.degradation += 10;
	surgeryDamage(slave, 10); //dangerous to uncomment this as sometimes many scars are applied at once.
	cashX(forceNeg(surgery.costs), "slaveSurgery", slave);
	surgeryDamage(slave, (V.PC.skill.medicine >= 100) ? Math.round(surgery.healthCosts / 2) : surgery.healthCosts);*/
	if (slave.scar.hasOwnProperty(scar)) { // if scar object exists for this body part
		if (slave.scar[scar].hasOwnProperty(design)) { // if object has this kind of scar (might be custom)
			if (["generic", "whip", "chain", "burn", "menacing", "exotic", "surgical", "c-section", "cutting"].includes(design)) {
				slave.scar[scar][design] = 0;
			} else {
				delete slave.scar[scar][design]; // scar was custom
			}
		}
		// remove the scar object entirely if no entry is scarred:
		let weights = Object.values(slave.scar[scar]);
		let total = 0;
		let i;
		for (i = 0; i < weights.length; i++) {
			total += weights[i];
		}
		if (total === 0) {
			delete slave.scar[scar];
		}
	}
};

/**
 * Slave is whipped over the entire body, and strains in manacles so much that the wrists and ankles scar if present.
 * @param {App.Entity.SlaveState} slave
 * @param {number} weight
 */
App.Medicine.Modification.addScourged = function(slave, weight) {
	let scarArray = ["left breast", "right breast", "back", "lower back", "left buttock", "right buttock"];
	let i = 0;
	// Whip
	if (getLeftArmID(slave) === 1) {
		scarArray.push("left upper arm");
	}
	if (getRightArmID(slave) === 1) {
		scarArray.push("right upper arm");
	}
	if (getLeftLegID(slave) === 1) {
		scarArray.push("left thigh");
	}
	if (getRightLegID(slave) === 1) {
		scarArray.push("right thigh");
	}

	for (i = 0; i < scarArray.length; i++) {
		App.Medicine.Modification.addScar(slave, scarArray[i], "whip", weight);
	}
	// Manacles
	scarArray = [];
	if (getLeftArmID(slave) === 1) {
		scarArray.push("left wrist");
	}
	if (getRightArmID(slave) === 1) {
		scarArray.push("right wrist");
	}
	if (getLeftLegID(slave) === 1) {
		scarArray.push("left ankle");
	}
	if (getRightLegID(slave) === 1) {
		scarArray.push("right ankle");
	}
	for (i = 0; i < scarArray.length; i++) {
		App.Medicine.Modification.addScar(slave, scarArray[i], "chain", weight);
	}
};

/**
 * Scars a slave over a large section of their body.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location full, upper, lower, left or right
 * @param {string} type whip, burn, surgical, generic
 * @param {number} weight
 */
App.Medicine.Modification.addBulkScars = function(slave, location, type, weight) {
	let scarArray = [];

	/* Divide slave into quarters, and add each quarter as needed. */

	/* Top left */
	if (["left", "upper", "full"].includes(location)) {
		scarArray.push("left breast");
		if (getLeftArmID(slave) === 1) {
			scarArray.push("left upper arm", "left lower arm", "left hand");
		}
	}

	/* Top right */
	if (["right", "upper", "full"].includes(location)) {
		scarArray.push("right breast");
		if (getRightArmID(slave) === 1) {
			scarArray.push("right upper arm", "right lower arm", "right hand");
		}
	}

	/* Lower left */
	if (["left", "lower", "full"].includes(location)) {
		scarArray.push("left buttock");
		if (getLeftLegID(slave) === 1) {
			scarArray.push("left thigh", "left calf", "left foot");
		}
	}

	/* Lower Right */
	if (["right", "lower", "full"].includes(location)) {
		scarArray.push("right buttock");
		if (getRightLegID(slave) === 1) {
			scarArray.push("right thigh", "right calf", "right foot");
		}
	}

	/* Extra */
	if (["upper", "full"].includes(location)) {
		scarArray.push("back", "lower back");
	}

	let i = 0;
	for (i = 0; i < scarArray.length; i++) {
		App.Medicine.Modification.addScar(slave, scarArray[i], type, weight);
	}
};

/**
 * Adds a piercing to a slave.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {number} weight
 * @returns {string} slave reaction
 */
App.Medicine.Modification.setPiercing = function(slave, location, weight) {
	if (weight === 3) {
		// smart piercings cost more
		cashX(forceNeg(V.SPcost), "slaveMod", slave);
	} else {
		cashX(forceNeg(V.modCost), "slaveMod", slave);
	}

	// reaction
	const {He, he, His, his, him} = getPronouns(slave);
	const delta = weight - slave[`${location}Piercing`];
	let r = ` `;
	if (location === "tongue") {
		if (slave.fetishKnown && slave.fetish === "cumslut" && slave.fetishStrength > 10) {
			r += `Since ${he}'s an oral whore, ${he}'s `;
			if (delta > 0) {
				if (weight > 1) {
					r += `<span class="devotion inc">very happy</span> you took the time to personally pierce ${his} tongue so heavily. `;
				} else {
					r += `<span class="devotion inc">happy</span> to get a tongue piercing from you personally. `;
				}
				r += `After all, ${he}'s pretty sure it's a sign there will be plenty of ${V.PC.dick > 0 ? `dick for ${him} to suck` : `pussy for ${him} to eat`} in the future. `;
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r += `<span class="devotion dec">saddened</span> you decided to take out ${his} tongue piercings. ${He}'s afraid this means something about ${his} future as a suck slut. `;
				slave.devotion += 2 * delta;
			} else {
				r += `disapointed to lose ${his} tongue piercings, but accepts your will for ${his} body. `;
			}
		}
		if (slave.sexualFlaw === "hates oral" && weight > 0) {
			r += `${He} has trouble thinking of ${his} mouth as a warm, wet, playful hole, so ${his} new piercings will be therapeutic. Having something to suck on at all times should force ${him} past ${his} hang-ups. `;
		}
	} else if (location === "nipples" || location === "areolae") {
		if (slave.fetishKnown && slave.fetish === "boobs" && slave.fetishStrength > 10) {
			r += `Since ${he}'s fixated on ${his} boobs, ${he}'s `;
			if (delta > 0) {
				if (weight > 1) {
					r += `<span class="devotion inc">very happy</span> you took the time to personally pierce them so heavily. `;
				} else {
					r += `<span class="devotion inc">happy</span> to get them pierced by you personally. `;
				}
				r += `As far as ${he}'s concerned, more attention on ${his} tits is always good. `;
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r += `<span class="devotion dec">saddened</span> you decided to take out ${his} piercings. ${He} doesn't like anything that makes ${his} tits less distinctive. `;
				slave.devotion += 2 * delta;
			} else {
				r += `disapointed to lose ${his} the piercings in ${his} ${location}, but accepts your will for ${his} body. `;
			}
		}
	} else if (location === "corset") {
		if (slave.fetishKnown && slave.fetish === "masochist" && slave.fetishStrength > 10) {
			r += `Since ${he}'s a pain whore `;
			if (delta > 0) {
				r += `${he} <span class="devotion inc">got off</span> on you giving ${him} a corset piercing personally. ${He} loved the feeling of the metal entering ${his} flesh. `;
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r += `<span class="devotion dec">saddened</span> you decided to take out ${his} corset piercings.  ${He}'ll miss the constant slight discomfort they gave ${him}. `;
				slave.devotion += 2 * delta;
			} else {
				r += `disapointed to lose ${his} corset piercings, but accepts your will for ${his} body. `;
			}
		}
	} else if (location === "vagina") {
		if (slave.fetishKnown && slave.fetish === "pregnancy" && slave.fetishStrength > 10) {
			r += `Since ${he}'s a whore for impregnation, ${he}'s `;
			if (delta > 0) {
				if (weight > 1) {
					r += `<span class="devotion inc">very happy</span> you took the time to personally pierce ${his} pussylips so heavily. `;
				} else {
					r += `<span class="devotion inc">happy</span> to get pussy piercings from you personally. `;
				}
				r += `Like most pregnancy fetishists, ${he}'s a little desperate for dick, and anything that points towards more bareback sex is appealing to ${him}. `;
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r += `<span class="devotion dec">saddened</span> you decided to take out ${his} pussy piercings. Like most pregnancy fetishists, ${he}'s a little desperate for dick, and ${he}'s afraid of anything that points towards less attention focused on ${his} cunt. `;
				slave.devotion += 2 * delta;
			} else {
				r += `disapointed to lose ${his} pussy piercings, but accepts your will for ${his} body. `;
			}
		}
		if (slave.sexualFlaw === "hates penetration" && weight > 0) {
			r += `${He} has trouble thinking of ${his} vagina as a fuckhole rather than something special to protect and cherish, so ${his} new piercings will be therapeutic. The constant, inescapable stimulation of ${his} labia should force ${him} past ${his} hang-ups. `;
		}
	} else if (location === "dick") {
		if (slave.fetishKnown && slave.fetish === "pregnancy" && slave.fetishStrength > 10) {
			r += `Since ${he}'s fixated on using ${his} cock to impregnate other slaves, ${he}'s `;
			if (delta > 0) {
				if (weight > 1) {
					r += `<span class="devotion inc">very happy</span> you took the time to personally stick so much metal into ${his} dick`;
					if (slave.scrotum > 0) {
						r += ` and ballsack`;
					}
					r += `. `;
				} else {
					r += `<span class="devotion inc">happy</span> to get penis piercings from you personally. `;
				}
				r += `${He}'s extremely proud of ${his} newly decorated member. `;
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r += `<span class="devotion dec">saddened</span> you decided to take out ${his} dick piercings. ${He} passionately loves using ${his} penis, and ${he}'s concerned you're planning to let ${him} do less of that. `;
				slave.devotion += 2 * delta;
			} else {
				r += `disapointed to lose ${his} dick piercings, but accepts your will for ${his} body. `;
			}
		}
	} else if (location === "anus") {
		if (slave.fetishKnown && slave.fetish === "buttslut" && slave.fetishStrength > 10) {
			r += `Since ${he}'s an anal slut, ${he}'s `;
			if (delta > 0) {
				if (weight > 1) {
					r += `<span class="devotion inc">very happy</span> you took the time to personally pierce the entire area around ${his} whorish asspussy. `;
				} else {
					r += `<span class="devotion inc">happy</span> to get a piercing next to ${his} favorite hole from you personally. `;
				}
				r += `${He} can't wait to find out how the metal will feel against ${his} butthole when ${he} moves around. `;
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r += `<span class="devotion dec">saddened</span> you decided to take out ${his} backdoor piercings. ${He} will miss the constant anal titillation, and ${he}'s worried this means you're becoming less interested in ${his} butthole. `;
				slave.devotion += 2 * delta;
			} else {
				r += `disapointed to lose ${his} backdoor piercings, but accepts your will for ${his} body. `;
			}
		}
		if (slave.sexualFlaw === "hates anal" && weight > 0) {
			r += `${He} has trouble thinking of ${his} asshole as a sexy, fuckable hole, so ${his} new piercings will be therapeutic. The constant tickling back there should force ${him} past ${his} hang-ups. `;
		}
	}

	if (slave.genes === "XY" && slave.attrXY <= 35 && ["ear", "lips", "nose", "eyebrow", "navel"].contains(location)) {
		r += `${His} girly new `;
		switch (location) {
			case "ear":
				r += `pierced ears should help ${him} a little with $his issues about ${his} self-image as a fuckable slave girl. `;
				break;
			case "lips":
				r += `facial piercing, just below ${his} pretty mouth, should help ${him} get used to the idea of it being a warm, wet hole for cocks. `;
				break;
			case "nose":
				r += `nose piercing should make ${his} reflection in the mirror seem just a bit more fuckably feminine to ${him}. `;
				break;
			case "navel":
				r += `navel piercing should help ${him} see ${his} naked body in a submissively sexual way, especially as ${he} turns to hide it and present ${his} asspussy. `;
				break;
			case "eyebrow":
				r += `facial piercing should help destroy ${his} vestiges of sexual identity outside of ${his} life as a hole for cocks. `;
				break;
			default:
				r += `set of slutty facial piercings should help ${him} get used to the idea of being a girly slave meant to please dicks. `; /* impossible, but I'm leaving the text anyway */
		}
		if (slave.devotion < -20) {
			r += `Unfortunately, that positive effect will have to wait until ${he}'s a little less resistant to the idea of being a sex slave. `;
		}
	}

	slave[`${location}Piercing`] = weight;
	return r;
};

/**
 * Adds a tattoo to a slave.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {string|number} design (0 removes)
 * @returns {string} slave reaction
 */
App.Medicine.Modification.setTattoo = function(slave, location, design) {
	cashX(forceNeg(V.modCost), "slaveMod", slave);

	// reaction
	const {He, he, His, his, him} = getPronouns(slave);
	Enunciate(slave); // TODO: it'd be nice to return a deconstructable object from Enunciate like we do from getPronouns...
	const s = V.sEnunciate;
	const ss = V.sEnunciate;
	const x = V.xEnunciate;
	const c = V.cEnunciate;
	const Master = V.titleEnunciate;
	const say = V.sayEnunciate;
	let r = ` `;
	if (location === "anus" && design !== 0) {
		if (canSee(slave) && canTalk(slave)) {
			const anus = (function(s) {
				if (s.anus > 3) {
					return "anal gape";
				} else if (s.anus === 3) {
					return "relaxed asspussy";
				} else if (s.anus === 2) {
					return "soft butthole";
				} else {
					return "tight butthole";
				}
			})(slave);

			if (design === "bleached") {
				r += `${He} knew ${he} was getting ${his} ass bleached, of course. The stinging sensation was hard to miss. Even so, ${he} cranes ${his} neck around as soon as possible to look at ${his} ${anus} in the mirror. `;
			} else {
				r += `${He} knew ${he} was getting ${his} asshole tattooed, of course. ${He} cranes ${his} neck around as soon as possible to look at ${his} ${anus} in the mirror. `;
				if (slave.butt > 5) {
					r += `${His} huge buttocks are still held apart by the spreaders used to give the tattooing actuators access to ${his} most intimate area, giving ${him} a good view. `;
				}
			}
			if (slave.fetishKnown && slave.fetish === "buttslut") {
				switch (design) {
					case "bleached":
						r += `${He} giggles at ${his} crinkled fuckhole's clean, fuckable appearance, and starts squeezing ${his} sphincter muscles experimentally. "Thank you, ${Master}," ${he} gasps, flushing.`;
						break;
					case "flowers":
					case "tribal patterns":
						r += `${He} gasps at the beautiful design and then suddenly bursts into tears. "T-thank you, ${Master}," ${he} blubbers. "I'm ${s}-${s}uch an anal whore."`;
						break;
					case "advertisements":
						r += `${He} stares, ${his} mouth working as ${he} spells out `;
						if (slave.vagina > -1) {
							r += `'Fucktoy's Favorite Fuckhole.' ${He} smiles naughtily. "${Master}, it sure i${s}, `;
						} else {
							r += `'Spit First.' ${He} smiles naughtily. "${Master}, that work${s} for me. Lube'${s} good too. Or, um, dry'${s} fine too," `;
						}
						r += `${he} giggles.`;
						break;
					case "rude words":
						r += `$He stares, $his mouth working as $he spells out `;
						if (slave.vagina > -1) {
							r += `'Fucktoy's Favorite Fuckhole.' ${He} smiles naughtily. "${Master}, it sure i${s}, `;
						} else {
							r += `'Sissy Slut's Sodomy Slit.' ${He} smiles naughtily. "${Master}, I love it when you fuck my lewd butt ${s}lit," `;
						}
						r += `${he} giggles.`;
						break;
					case "sacrilege":
						r += `${He} stares, ${his} mouth working as ${he} reads the ring of Aramaic blasphemy around ${his} hole. Getting it, ${he} smiles naughtily. "${Master}, I'm a horrible little butthole ${s}uccubu${s}. Plea${s}e, ${Master}, feed me. I need cum in my a${ss} to ${s}urvive."`;
						break;
					case "sacrament":
						r += `${He} stares, ${his} mouth working as ${he} reads the ring of Aramaic around ${his} hole. Getting it, ${he} smiles beatifically. "${Master}, I alway${s} knew butt${s}e${x} was a ${s}acrament."`;
						break;
					case "degradation":
						r += `${He} stares, ${his} mouth working as ${he} spells out '${WrittenMaster(slave)} Made Me An Anal Slut.' ${He} smiles naughtily. "Oh ${Master}, you did," ${he} ${say}s gratefully. "And I love you for it."`;
						break;
					case "counting":
						r += `${He} stares, realizing that the markings denote how many times ${he}'s been sodomized. "${Master}, thank you, and, and, I hope I'll have to come back in here a lot," ${he} ${say}s. "Um, becau${s}e I have to have that updated. Becau${s}e I'm being fucked in the butt a lot," ${he} adds, wanting to be completely clear.`;
						break;
					case "bovine patterns":
						r += `${He} stares at ${his} new cow's anus. Finally, ${he} focuses on the upsides of being permanently transformed like this. "${Master}, I hope thi${s} mean${s} I'll have to be fed up the butt a lot," ${he} ${say}s, referencing the milking systems' anal feeders.`;
						break;
					case "possessive":
						r += `${He} stares, realizing that the ring of numbers around ${his} anus give the date ${he} was enslaved by you. "Be${s}t pla${c}e for that date, ${Master}," ${he} ${say}s. "Being a butt ${s}lut i${s} my life now."`;
						break;
					case "paternalist":
						r += `${He} stares, ${his} mouth working as ${he} spells out '${WrittenMaster(slave)} Helped Me Love Anal.' "Oh ${Master}, you did," ${he} coos. "You did! Thank you ${s}o much for helping me become the anal ${s}lut I wa${s} alway${s} meant to be!"`;
						break;
					default:
						r += `${He} smiles, pleased at the attention ${his} ${anus} is getting.`;
				}
			} else if (slave.devotion > 50) {
				switch (design) {
					case "bleached":
						r += `${He} gasps at how closely the crinkled skin around ${his} anal opening matches the rest of ${his} ${slave.skin} body. "Oh, it'${s} ${s}o beautiful! Thank you, ${Master}, thank you," ${he} exclaims lovingly.`;
						break;
					case "flowers":
					case "tribal patterns":
						r += `${He} gasps at the beautiful design. "It'${s} ${s}o pretty, ${Master}," $he ${say}s. "Thank you. I love you ${s}o much!"`;
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r += `${He} stares, ${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. "Thank you, ${Master}," ${he} ${say}s devotedly. "I love you and I'll ${s}erve you with my butthole a${s} be${s}t I can."`;
						break;
					default:
						r += `${He} smiles, pleased at the mark of your attention to ${his} body. "Thank you, ${Master}," ${he} ${say}s devotedly. "I love you and I'll ${s}erve you with my butthole a${s} be${s}t I can."`;
				}
			} else if (slave.sexualFlaw === "hates anal") {
				r += `${He} stares, `;
				switch (design) {
					case "bleached":
						r += `horrified, and then shudders convulsively, but can't look away. `;
						break;
					case "flowers":
					case "tribal patterns":
						r += `torn between fascination at the intricate design and horror at having ${his} anus permanently tattooed. `;
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r += `${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. ${He} starts to cry as their meaning sinks in. `;
						break;
					default:
						r += `lower lip quivering. `;
				}
				r += `${He} hates being assraped, and knows that this means there's lots of it in store for ${him}. "${Master}, p-plea${s}e," ${he} moans halfheartedly. "I d-don't like being b-butt f-fucked."`;
			} else if (slave.devotion > 20) {
				r += `${He} stares, `;
				switch (design) {
					case "bleached":
						r += `fascinated. $He doesn't seem sure what to make of this. `;
						break;
					case "flowers":
					case "tribal patterns":
						r += `torn between admiration at the intricate design and realization that ${his} anus has been permanently tattooed. `;
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r += `${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. ${He} shudders a little as they sink in and ${he} internalizes what they say about ${him} and ${his} asshole. `;
						break;
					default:
						r += `realizing that ${his} anus has been permanently tattooed. It's yet another proof that ${he}'s permanently a sex slave, and ${his} anus is for fucking. `;
				}
				r += `"Thank you, ${Master}," ${he} ${say}s, taking refuge in propriety. "Um, d-doe${s} thi${s} mean I'm going to be more of a, um, b-butt${s}lut?" ${he} asks hesitantly, not sounding very enthusiastic.`;
			} else if (slave.trust < -20) {
				r += `${He} stares, `;
				switch (design) {
					case "bleached":
						r += `trying to process the appearance of what must seem like an unnaturally clean-looking hole. `;
						break;
					case "flowers":
					case "tribal patterns":
						r += `struggling to process the fact that one of ${his} most intimate areas has been tattooed. Beautifully tattooed, but still." `;
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r += `${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. ${He} shudders as ${he} does ${his} best to conceal ${his} feelings about such a permanent display of ${his} status as an anal slave. `;
						break;
					default:
						r += `looking sad as the meaning of a permanent display of ${his} status as an anal slave sinks in. `;
				}
				r += `After a short pause ${he} remembers ${his} duties and stammers, "T-thank you, ${Master}." After a while longer ${he} turns ${his} head away, clearly not wanting to dwell on how ${his} anus is obviously being beautified to attract sexual attention.`;
			} else {
				switch (design) {
					case "bleached":
						r += `${His} face darkens as ${he} sees ${his} crinkled fuckhole's clean, fuckable appearance. "Don't you dare fucking a${ss}rape me!" ${he} bursts out.`;
						break;
					case "flowers":
					case "tribal patterns":
						r += `${He}'s momentarily surprised by the pretty design, but then ${his} face darkens. "That'${s} permanent!" ${he} bursts out. "My a${ss}hole i${s} going to look like that forever!"`;
						break;
					case "advertisements":
						r += `${He} stares, ${his} mouth working as ${he} spells out `;
						if (slave.vagina > -1) {
							r += `'Second Pussy.' ${His} face darkens. "No it'${s} not," ${he} bursts out. "Anal is dirty."`;
						} else {
							r += `'Spit First.' ${His} face darkens. "Gro${ss}," ${he} bursts out. "Gro${ss} and wrong!"`;
						}
						break;
					case "rude words":
						r += `${He} stares, ${his} mouth working as ${he} spells out `;
						if (slave.vagina > -1) {
							r += `'Fucktoy's Favorite Fuckhole.' ${His} face darkens. "No it'${s} not," ${he} bursts out. "It'${s} my a${ss}!"`;
						} else {
							r += `'Sissy Slut's Sodomy Slit.' ${His} face darkens. "No it'${s} not," ${he} bursts out. "I'm not a ${s}i${ss}y! Or a ${s}lut! And it'${s} not a ${s}lit!" Those are debatable, but they can all change, of course.`;
						}
						break;
					case "sacrament":
					case "sacrilege":
						r += `${He} stares, ${his} mouth working as ${he} reads the ring of Aramaic around ${his} hole. ${He} doesn't understand it, but ${he}'s not happy about having stuff permanently inscribed around ${his} ass.`;
						break;
					case "degradation":
						r += `${He} stares, ${his} mouth working as ${he} spells out '${WrittenMaster(slave)} Made Me An Anal Slut.' ${His} face darkens. "No I'm not," ${he} bursts out. That remains to be seen.`;
						break;
					case "counting":
						r += `${He} stares, realizing that the markings denote how many times ${he}'s been sodomized. ${His} face darkens. "I ${s}ee there'${s} room for more," ${he} bursts out. "Fucking gro${ss}."`;
						break;
					case "bovine patterns":
						r += `${He} stares at ${his} new cow's anus. "Fucking gro${ss}," ${he} bursts out. "I'm not an animal." That remains to be seen.`;
						break;
					case "possessive":
						r += `${He} stares, realizing that the ring of numbers around ${his} anus give the date ${he} was enslaved by you. ${His} face darkens. "Wor${s}t day of my life," ${he} bursts out.`;
						break;
					case "paternalist":
						r += `${He} stares, ${his} mouth working as ${he} spells out '${WrittenMaster(slave)} Helped Me Love Anal.' "I don't," ${he} bursts out. "It'${s} fucking gro${ss}."`;
						break;
					default:
						r += `${He} stares, horrified that you have defaced ${his} body in this way.`;
				}
			}
		}
	}
	// TODO: maybe some reactions for other kinds of tattoos would be nice too?

	slave[`${location}Tat`] = design;
	return r;
};
