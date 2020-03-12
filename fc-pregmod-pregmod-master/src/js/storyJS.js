/* config.history.tracking = false;*/
// State.expired.disable;

/**
 * @param {number} x
 * @param {number} minValue
 * @param {number} maxValue
 * @param {number} [defaultValue=0]
 * @returns {number}
 */
window.variableAsNumber = function(x, minValue, maxValue, defaultValue = 0) {
	x = Number(x);
	if (isNaN(x)) {
		return defaultValue;
	}
	if (x < minValue) { // Works even if minValue is undefined.
		return minValue;
	}
	if (x > maxValue) { // Works even if maxValue is undefined.
		return maxValue;
	}
	return x;
};

if (typeof interpolate === "undefined") {
	const interpolate = function(x0, y0, x1, y1, x) {
		if (x <= x0) {
			return y0;
		} else if (x >= x1) {
			return y1;
		} else {
			return (x - x0) * ((y1 - y0) / (x1 - x0)) + y0;
		}
	};
	window.interpolate = interpolate;
}

/**
 * @param {any[]} arr
 * @param {any} val
 * @returns {any[]}
 */
window.removeFromArray = function(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (val === arr[i]) {
			return arr.splice(i, 1);
		}
	}
	return null;
};

/**
 * @param {any[]} arr
 * @param {any} callback
 * @param {any} thisArg
 * @returns {Array}
 */
window.filterInPlace = function(arr, callback, thisArg) {
	let j = 0;

	arr.forEach(function(e, i) {
		if (callback.call(thisArg, e, i, arr)) {
			arr[j++] = e;
		}
	});

	arr.length = j;
	return arr;
};

/** pregmod: are slave2's sperm compatible with slave1's eggs?
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {boolean}
 */
window.canBreed = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	}
	return (slave1.eggType === slave2.ballType);
};

/** assuming slave1 is fertile, could slave2 impregnate slave1?
 * slave2 must have dick and balls with compatible sperm;
 * both slaves must not be in chastity; slave2 need not achieve erection
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {boolean}
 */
window.canImpreg = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	} else if (slave2.dick < 1) {
		return false;
	} else if (slave2.balls < 1) {
		return false;
	} else if (slave2.chastityPenis === 1) {
		return false;
	} else if (slave2.pubertyXY === 0) {
		/* pregmod start */
		return false;
	} else if (slave2.vasectomy === 1) {
		return false;
	} else if (!canBreed(slave1, slave2)) {
		return false; /* pregmod end */
	} else if (!canGetPregnant(slave1)) {
		/* includes chastity checks */
		return false;
	} else {
		return true;
	}
};

/** assuming slave1 is fertile, could slave2 impregnate slave1?
 * slave2 must have balls with compatible sperm;
 * a special function intended for tribbing scenes;
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {boolean}
 */
window.canFemImpreg = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	} else if (slave2.balls < 1) {
		return false;
	} else if (slave2.chastityVagina === 1) {
		return false;
	} else if (slave2.pubertyXY === 0) {
		/* pregmod start */
		return false;
	} else if (slave2.vasectomy === 1) {
		return false;
	} else if (!canBreed(slave1, slave2)) {
		return false; /* pregmod end */
	} else if (!canGetPregnant(slave1)) {
		/* includes chastity checks */
		return false;
	} else {
		return true;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string|number}
 */
window.relationTargetWord = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.relation === "daughter") {
		return "mother";
	} else if (slave.relation === "mother") {
		return "daughter";
	}
	return slave.relation;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.milkAmount = function(slave) {
	let milk;
	let calcs;
	if (!slave) {
		return null;
	}
	calcs = slave.boobs - slave.boobsImplant - slave.boobsMilk;
	if (calcs > 40000) {
		milk = (158 + ((calcs - 40000) / 600));
	} else if (calcs > 25000) {
		milk = (128 + ((calcs - 25000) / 500));
	} else if (calcs > 10000) {
		milk = (78 + ((calcs - 10000) / 300));
	} else if (calcs > 5000) {
		milk = (53 + ((calcs - 5000) / 200));
	} else if (calcs > 2000) {
		milk = (29 + ((calcs - 2000) / 125));
	} else if (calcs > 800) {
		milk = (16 + ((calcs - 800) / 80));
	} else {
		milk = (8 + ((calcs - 400) / 50));
	}
	if (slave.boobsImplant > 0) {
		milk *= Math.max(0.25, (1 - (slave.boobsImplant / slave.boobs)));
	}
	if (slave.lactation === 2) {
		milk *= 1.2;
	}
	milk += (milk * ((slave.devotion - 50) / 200));
	calcs = (slave.hormoneBalance / 50);
	if (slave.balls !== 0 && calcs > -2) {
		calcs -= 1;
	} else if (slave.ovaries !== 1 && calcs < 2) {
		calcs += 1;
	}
	milk *= (1 + (calcs * 0.1));
	milk *= (1 + (slave.preg / 100));
	milk *= (1 + (slave.health.condition / 50));
	milk *= (1 + (slave.weight / 500));
	milk *= (1 + (slave.lactationAdaptation / 500));
	milk += (slave.boobsMilk / 100);
	milk *= healthPenalty(slave);
	milk = Math.trunc(milk);
	milk = Math.clamp(milk, 1, 1000000000000000000);
	return milk;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.cumAmount = function(slave) {
	let cum = 0;
	let calcs = 0;
	if (!slave) {
		return null;
	}
	if (slave.drugs === "testicle enhancement") {
		cum = ((slave.balls * 3.5) + 1);
	} else if (slave.drugs === "hyper testicle enhancement") {
		cum = ((slave.balls * 5) + 1);
	} else {
		cum = ((slave.balls * 2.5) + 1);
	}
	if (slave.ballType === "sterile") {
		cum *= 0.8;
	}
	if (slave.diet === "cum production") {
		cum *= 1.2;
	}
	calcs = (slave.hormoneBalance / 50);
	cum *= (1 - (calcs * 0.1));
	if (slave.scrotum === 0) {
		cum *= 0.8;
	}
	if (slave.prostate === 0) {
		cum *= 0.2; // being generous here
	} else if (slave.prostate === 2) {
		cum *= 1.2;
	} else if (slave.prostate === 3) {
		cum *= 1.5;
	}
	if (slave.devotion > 50) {
		cum += (cum * (slave.devotion / 100));
	} else if (slave.devotion < -50) {
		cum += (cum * (slave.devotion / 100));
	}
	if (slave.health.condition > 50) {
		cum += (cum * (slave.health.condition / 50));
	} else if (slave.health.condition < -50) {
		cum += (cum * (slave.health.condition / 50));
	}
	cum = Math.trunc(cum);
	cum = Math.clamp(cum, 1, 1000000000000000000);
	return cum;
};

/**
 * @param {string} text
 * @returns {string}
 */
window.lispReplace = function(text) {
	text = text.replace(/Sh/g, "Th");
	text = text.replace(/SS/g, "Th");
	text = text.replace(/Ss/g, "Th");
	text = text.replace(/sS/g, "Th");
	text = text.replace(/S/g, "Th");
	text = text.replace(/aX/g, "aKTH");
	text = text.replace(/eX/g, "eKTH");
	text = text.replace(/iX/g, "iKTH");
	text = text.replace(/oX/g, "oKTH");
	text = text.replace(/uX/g, "uKTH");
	text = text.replace(/yX/g, "yKTH");
	text = text.replace(/AX/g, "AKTH");
	text = text.replace(/EX/g, "EKTH");
	text = text.replace(/IX/g, "IKTH");
	text = text.replace(/OX/g, "OKTH");
	text = text.replace(/UX/g, "UKTH");
	text = text.replace(/YX/g, "YKTH");
	text = text.replace(/Xa/g, "Tha");
	text = text.replace(/Xe/g, "The");
	text = text.replace(/Xi/g, "Thi");
	text = text.replace(/Xo/g, "Tho");
	text = text.replace(/Xu/g, "Thu");
	text = text.replace(/Xy/g, "Thy");
	text = text.replace(/XA/g, "THA");
	text = text.replace(/XE/g, "THE");
	text = text.replace(/XI/g, "THI");
	text = text.replace(/XO/g, "THO");
	text = text.replace(/XU/g, "THU");
	text = text.replace(/XY/g, "THY");
	text = text.replace(/X/g, "EKTH");
	text = text.replace(/zZ/g, "Th");
	text = text.replace(/Zz/g, "Th");
	text = text.replace(/ZZ/g, "TH");
	text = text.replace(/Z/g, "Th");
	text = text.replace(/Cia/g, "Tha");
	text = text.replace(/Ci/g, "Thi");
	text = text.replace(/Ce/g, "The");
	text = text.replace(/Cy/g, "Thy");
	text = text.replace(/CIA/g, "THA");
	text = text.replace(/CI/g, "THI");
	text = text.replace(/CE/g, "THE");
	text = text.replace(/CY/g, "THY");
	text = text.replace(/ss/g, "th");
	text = text.replace(/sh/g, "th");
	text = text.replace(/s/g, "th");
	text = text.replace(/zz/g, "th");
	text = text.replace(/z/g, "th");
	text = text.replace(/ax/g, "akth");
	text = text.replace(/ex/g, "ekth");
	text = text.replace(/ix/g, "ikth");
	text = text.replace(/ox/g, "okth");
	text = text.replace(/ux/g, "ukth");
	text = text.replace(/yx/g, "ykth");
	text = text.replace(/Ax/g, "Akth");
	text = text.replace(/Ex/g, "Ekth");
	text = text.replace(/Ix/g, "Ikth");
	text = text.replace(/Ox/g, "Okth");
	text = text.replace(/Ux/g, "Ukth");
	text = text.replace(/Yx/g, "Ykth");
	text = text.replace(/xa/g, "tha");
	text = text.replace(/xe/g, "the");
	text = text.replace(/xi/g, "thi");
	text = text.replace(/xo/g, "tho");
	text = text.replace(/xu/g, "thu");
	text = text.replace(/xy/g, "thy");
	text = text.replace(/xA/g, "thA");
	text = text.replace(/xE/g, "thE");
	text = text.replace(/xI/g, "thI");
	text = text.replace(/xO/g, "thO");
	text = text.replace(/xU/g, "thU");
	text = text.replace(/xY/g, "thY");
	text = text.replace(/x/g, "ekth");
	text = text.replace(/cia/g, "tha");
	text = text.replace(/ci/g, "thi");
	text = text.replace(/ce/g, "the");
	text = text.replace(/cy/g, "thy");
	text = text.replace(/cI/g, "thI");
	text = text.replace(/cE/g, "thE");
	text = text.replace(/cY/g, "thY");
	return text;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object} arcology
 * @returns {number}
 */
window.repGainSacrifice = function(slave, arcology) {
	if (!slave || !arcology || arcology.FSAztecRevivalist === "unset" || arcology.FSAztecRevivalist <= 0) {
		return 0;
	}
	return Math.ceil(
		(Math.min(100, Math.pow(1.0926, State.variables.week - slave.weekAcquired)) + slave.prestige * 30) * arcology.FSAztecRevivalist / 100 / ((State.variables.slavesSacrificedThisWeek || 0) + 1));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.bodyguardSuccessorEligible = function(slave) {
	if (!slave) {
		return false;
	}
	return (slave.devotion > 50 && slave.muscles >= 0 && slave.weight < 100 && slave.boobs < 8000 && slave.butt < 10 && slave.belly < 5000 && slave.balls < 10 && slave.dick < 10 && slave.preg < 20 && slave.fuckdoll === 0 && slave.fetish !== "mindbroken" && canWalk(slave) && canHold(slave) && canSee(slave) && canHear(slave));
};

window.ngUpdateGenePool = function(genePool = []) {
	const transferredSlaveIds = (State.variables.slaves || [])
		.filter(s => s.ID >= 1200000)
		.map(s => s.ID - 1200000);
	return genePool
		.filter(s => (transferredSlaveIds.includes(s.ID)))
		.map(function(s) {
			const result = jQuery.extend(true, {}, s);
			result.ID += 1200000;
			return result;
		});
};

window.ngUpdateMissingTable = function(missingTable) {
	const newTable = {};

	(State.variables.slaves || [])
		.forEach(s => ([s.pregSource + 1200000, s.mother + 1200000, s.father + 1200000]
			.filter(i => (i in missingTable))
			.forEach(i => {
				newTable[i - 1200000] = missingTable[i];
				newTable[i - 1200000].ID -= 1200000;
			})));

	return newTable;
};

/**
 * @param {any} obj
 * @returns {string}
 */
window.toJson = function(obj) {
	let jsontext = JSON.stringify(obj);
	jsontext = jsontext.replace(/^{/, "");
	jsontext = jsontext.replace(/}$/, "");
	return jsontext;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.nippleColor = function(slave) {
	if (skinToneLevel(slave.skin) < 8) {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "brown";
		} else {
			return "pink";
		}
	} else if (skinToneLevel(slave.skin) < 14) {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "dark brown";
		} else {
			return "pink";
		}
	} else if (skinToneLevel(slave.skin) > 20) {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "black";
		} else {
			return "dark brown";
		}
	} else {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "dark brown";
		} else {
			return "brown";
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object} PC
 * @returns {number}
 */
window.overpowerCheck = function(slave, PC) {
	let strength;

	if (State.variables.arcologies[0].FSPhysicalIdealist !== "unset") {
		if (PC.title === 1) {
			strength = 130;
		} else {
			strength = 100;
		}
	} else if (PC.title === 1) {
		strength = 50;
	} else {
		strength = 30;
	}
	strength += (185-slave.height);
	strength -= (PC.belly/1000);
	strength += (PC.skill.warfare/3);
	strength -= (State.variables.PC.health.shortDamage);

	return strength;
};

/**
 * returns array of IDs of all characters who impregnated slave
 * @param {App.Entity.SlaveState} slave
 * @returns {number[]}
 */
window.impregnatedBy = function(slave) {
	const IDArray = [];
	if (!Array.isArray(slave.womb)) {
		WombInit(slave);
	}
	for (let i = 0; i < slave.womb.length; i++) {
		IDArray.push(slave.womb[i].fatherID);
	}
	return IDArray;
};

/**
 * returns true if mother was impregnated by father
 * @param {App.Entity.SlaveState} mother
 * @param {App.Entity.SlaveState} father
 * @returns {boolean}
 */
window.isImpregnatedBy = function(mother, father) {
	return impregnatedBy(mother).includes(father.ID);
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.SoftenBehavioralFlaw = function SoftenBehavioralFlaw(slave) {
	switch (slave.behavioralFlaw) {
		case "arrogant":
			slave.behavioralQuirk = "confident";
			break;
		case "bitchy":
			slave.behavioralQuirk = "cutting";
			break;
		case "odd":
			slave.behavioralQuirk = "funny";
			break;
		case "hates men":
			slave.behavioralQuirk = "adores women";
			break;
		case "hates women":
			slave.behavioralQuirk = "adores men";
			break;
		case "gluttonous":
			slave.behavioralQuirk = "fitness";
			break;
		case "anorexic":
			slave.behavioralQuirk = "insecure";
			break;
		case "devout":
			slave.behavioralQuirk = "sinful";
			break;
		case "liberated":
			slave.behavioralQuirk = "advocate";
			break;
	}
	slave.behavioralFlaw = "none";
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.SoftenSexualFlaw = function SoftenSexualFlaw(slave) {
	switch (slave.sexualFlaw) {
		case "hates oral":
			slave.sexualQuirk = "gagfuck queen";
			break;
		case "hates anal":
			slave.sexualQuirk = "painal queen";
			break;
		case "hates penetration":
			slave.sexualQuirk = "strugglefuck queen";
			break;
		case "shamefast":
			slave.sexualQuirk = "tease";
			break;
		case "idealistic":
			slave.sexualQuirk = "romantic";
			break;
		case "repressed":
			slave.sexualQuirk = "perverted";
			break;
		case "apathetic":
			slave.sexualQuirk = "caring";
			break;
		case "crude":
			slave.sexualQuirk = "unflinching";
			break;
		case "judgemental":
			slave.sexualQuirk = "size queen";
			break;
	}
	slave.sexualFlaw = "none";
};

/**
 * @param {object} PC
 */
window.generatePlayerPronouns = function(PC) {
	if (PC.title === 0) {
		PC.pronoun = App.Data.Pronouns.Kind.female;
	} else {
		PC.pronoun = App.Data.Pronouns.Kind.male;
	}
};

window.printTrinkets = function printTrinkets() {
	function trinketPluralReplacer(desc) {
		let r;
		switch (desc) {
			/* not supported
				best in show ribbons
				napkins
				saPorn trinkets
				wedding photos
			*/
			// should never have plurals
			case "a collection of diplomas from expensive schools":
			case "a framed low denomination piece of paper money from your native country":
			case "a battered old assault rifle":
			case "a framed picture of a slave with her sale price scrawled across the bottom":
			case "an artist's impression of an early arcology design":
			case "a framed copy of the first news story featuring yourself":
			case "a miniature model of your first arcology":
			case "a copy of the first porno you starred in":
			case "a framed picture of your late Master":
			case "your favorite handgun, whose sight has instilled fear in many":
			case "a news clipping of your first successful live hack":
			case "a damaged plate carrier bearing Daughters of Liberty insignia":
			case "a Daughters of Liberty flag that once hung in their forward command post within your arcology":
			case "a Daughters of Liberty brassard":
			case "a shot-torn flag of the failed nation whose militants attacked the Free City":
				return desc;
				// manual replacement
			case "a thank-you note from a MILF tourist whom you made feel welcome in the arcology":
				return "several thank-you notes from MILF tourists whom you made feel welcome in the arcology";
				// replacement by groups
			default:
				r = desc;
				if (desc.endsWith("citizen")) { // will not reduce spam from different future societies
					r = r.replace("message", "messages");
					r = r.replace("from a", "from");
					r = r.replace("a ", "several ");
					r = r.replace("citizen", "citizens");
					r = r.replace("number", "numbers");
					r = r.replace("test", "tests");
				} else if (desc.endsWith("acquaintance")) {
					r = r.replace("note", "notes");
					r = r.replace("from a", "from");
					r = r.replace("a ", "several ");
					r = r.replace("owner", "owners");
				}
				return r;
		}
	}

	if (State.variables.trinkets.length === 0) {
		return "";
	}

	const trinkets = weightedArray2HashMap(State.variables.trinkets);
	let trinketString = [];
	let plurals = false;

	for (const trinketDesc in trinkets) {
		if (trinkets[trinketDesc] === 1) {
			trinketString.push(trinketDesc);
		} else if (trinkets[trinketDesc] > 1) {
			trinketString.push(trinketPluralReplacer(trinketDesc));
			plurals = true;
		}
	}

	// depending on length of trinketString, add necessary conjunctions
	if (trinketString.length === 1) {
		if (plurals === false) {
			trinketString = `a single item: ${trinketString[0]}`;
		} else {
			trinketString = trinketString[0];
		}
	} else if (trinketString.length === 2 && plurals === false) {
		trinketString = `a couple of items: ${trinketString[0]}, and ${trinketString[1]}`;
	} else {
		trinketString[trinketString.length - 1] = `and ${trinketString[trinketString.length - 1]}`;
		trinketString = trinketString.join(", ");
	}
	return `There's a display case behind your desk, with ${trinketString}.`;
};

/**
 * @param {number} nmbr1
 * @param {number} nmbr2
 */
window.pregNumberName = function(nmbr1, nmbr2) {
	let pt = "";
	let p1 = nmbr1 % 10;
	let p2 = ((nmbr1 % 100) - (nmbr1 % 10)) / 10;
	let p3 = ((nmbr1 % 1000) - (nmbr1 % 100)) / 100;
	switch (nmbr1) {
		case 1:
			pt += "bab";
			break;
		case 2:
			pt += "twin";
			break;
		default:
			switch (nmbr1) {
				case 3:
					pt += "tri";
					break;
				case 4:
					pt += "quadru";
					break;
				case 5:
					pt += "quintu";
					break;
				case 6:
					pt += "sextu";
					break;
				case 7:
					pt += "septu";
					break;
				case 8:
					pt += "octu";
					break;
				case 9:
					pt += "nonu";
					break;
				default:
					switch (p1)	{
						case 1:
							pt += "un";
							break;
						case 2:
							pt += "duo";
							break;
						case 3:
							pt += "tre";
							break;
						case 4:
							pt += "quattuor";
							break;
						case 5:
							pt += "quin";
							break;
						case 6:
							pt += "sex";
							break;
						case 7:
							pt += "septen";
							break;
						case 8:
							pt += "octo";
							break;
						case 9:
							pt += "novem";
							break;
					}
					switch (p2)	{
						case 1:
							pt += "dec";
							break;
						case 2:
							pt += "vigint";
							break;
						case 3:
							pt += "trigint";
							break;
						case 4:
							pt += "quadragint";
							break;
						case 5:
							pt += "quinquagint";
							break;
						case 6:
							pt += "sexagint";
							break;
						case 7:
							pt += "septuagint";
							break;
						case 8:
							pt += "octogint";
							break;
						case 9:
							pt += "nonagint";
							break;
					}
					if (nmbr1 >= 100) {
						if (p2 !== 0) {
							pt += "i";
						}
						switch (p3)	{
							case 1:
								pt += "centu";
								break;
							case 2:
								pt += "bicentu";
								break;
							case 3:
								pt += "tricentu";
								break;
							case 4:
								pt += "quadricentu";
								break;
							case 5:
								pt += "quincentu";
								break;
							case 6:
								pt += "sexcentu";
								break;
							case 7:
								pt += "septemcentu";
								break;
							case 8:
								pt += "octocentu";
								break;
							case 9:
								pt += "novemcentu";
								break;
						}
					} else {
						pt += "u";
					}
			}
			pt += "plet";
	}
	if (nmbr2 === 2) {
		if (nmbr1 === 1) {
			pt += "ie";
		}
		pt += "s";
	} else {
		if (nmbr1 === 1) {
			pt += "y";
		}
	}
	return pt;
};
