/*
This is a womb processor/simulator script. It takes care of calculation of belly sizes based on individual fetus sizes, with full support of broodmothers implant random turning on and off possibility. Also this can be expanded to store more parents data in each individual fetus in future.
Design limitations:
- Mother can't gestate children with different speeds at same time. All speed changes apply to all fetuses.
- Sizes of individual fetuses updated only on call of WombGetVolume - not every time as called WombProgress. This is for better overall code speed.
- For broodmothers we need actual "new ova release" code now. But it's possible to control how many children will be added each time, and so - how much children is ready to birth each time.

Usage from sugarcube code (samples):

WombInit($slave) - before first pregnancy, at slave creation, of as backward compatibility update.

WombImpregnate($slave, $fetus_count, $fatherID, $initial_age) - should be added after normal impregnation code, with already calculated fetus count. ID of father - can be used in future for processing children from different fathers in one pregnancy. Initial age normally 1 (as .preg normally set to 1), but can be raised if needed. Also should be called at time as broodmother implant add another fetus(es), or if new fetuses added from other sources in future (transplanting maybe?)

WombProgress($slave, $time_to_add_to_fetuses, $real_time_to_add_to_fetuses) - after code that update $slave.preg, time to add should be the same.

$isReady = WombBirthReady($slave, $birth_ready_age) - how many children ready to be birthed if their time to be ready is $birth_ready_age (40 is for normal length pregnancy). Return int - count of ready to birth children, or 0 if no ready exists.

$children = WombBirth($slave, $birth_ready_age) - for actual birth. Return array with fetuses objects that birthed (can be used in future) and remove them from womb array of $slave. Should be called at actual birth code in sugarcube. fetuses that not ready remained in womb (array).

WombFlush($slave) - clean womb (array). Can be used at broodmother birthstorm or abortion situations in game. But birthstorm logically should use WombBirth($slave, 35) or so before - some children in this event is live capable, others is not.

$slave.bellyPreg = WombGetVolume($slave) - return double, with current womb volume in CC - for updating $slave.bellyPreg, or if need to update individual fetuses sizes.

*/

// Init womb system.
window.WombInit = function(actor) {
	let i;

	if (!Array.isArray(actor.womb)) {
		// alert("creating new womb"); // debugging
		actor.womb = [];
	}

	// console.log("broodmother:" + typeof actor.broodmother);

	if (typeof actor.broodmother !== "number") {
		actor.broodmother = 0;
		actor.broodmotherFetuses = 0;
	}

	if (typeof actor.readyOva !== "number") {
		actor.readyOva = 0;
	}

	if (actor.pregData === undefined) {
		actor.pregData = clone(setup.pregData.human);
		// Setup should be through deep copy, so in future, if we like, these values can be changed individually. Gameplay expansion possibilities. But for dev time to simplify debugging:
		// actor.pregData = setup.pregData.human;  // any changes in setup pregData template will be applied immediately to all. But can't be made separate changes.
	}

	// backward compatibility setup. Fully accurate for normal pregnancy only.
	if (actor.womb.length > 0 && actor.womb[0].genetics === undefined && actor.eggType === "human") {
		i = 0;
		actor.womb.forEach(function(ft) {
			ft.genetics = generateGenetics(actor, actor.pregSource, i);
			i++;
		});
	} else if (actor.womb.length === 0 && actor.pregType > 0 && actor.broodmother === 0) {
		WombImpregnate(actor, actor.pregType, actor.pregSource, actor.preg);
	} else if (actor.womb.length === 0 && actor.pregType > 0 && actor.broodmother > 0 && actor.broodmotherOnHold < 1) {
		// sorry but for already present broodmothers it's impossible to calculate fully, approximation used.
		let pw = actor.preg,
			bCount, bLeft;
		if (pw > actor.pregData.normalBirth) { pw = actor.pregData.normalBirth; } // to avoid disaster.
		bCount = Math.floor(actor.pregType / pw);
		bLeft = actor.pregType - (bCount * pw);
		if (pw > actor.pregType) {
			pw = actor.pregType; // low children count broodmothers not supported here. It's emergency/backward compatibility code, and they not in game anyway. So minimum is 1 fetus in week.
			actor.preg = pw; // fixing initial pregnancy week.
		}
		for (i = 0; i < pw; i++) {
			WombImpregnate(actor, bCount, actor.pregSource, i); // setting fetuses for every week, up to 40 week at max.
		}

		if (bLeft > 0) {
			WombImpregnate(actor, bLeft, actor.pregSource, i + 1); // setting up leftover of fetuses.
		}
	}
};

window.WombImpregnate = function(actor, fCount, fatherID, age, surrogate) {
	let i;
	let tf;
	for (i = 0; i < fCount; i++) {
		tf = {}; // new Object
		tf.age = age; // initial age
		tf.realAge = 1; // initial real age (first week in mother)
		tf.fatherID = fatherID; // We can store who is father too.
		tf.volume = 1; // Initial, to create property. Updated with actual data after WombGetVolume call.
		tf.reserve = ""; // Initial, to create property. Used later to mark if this child is to be kept.
		tf.identical = 0; // Initial, to create property. Updated with actual data during fetalSplit call.
		tf.splitted = 0; // marker for already splitted fetus.
		if (surrogate) {
			tf.motherID = surrogate.ID; // Initial biological mother ID setup.
			if (actor.eggType === "human") {
				tf.genetics = generateGenetics(surrogate, fatherID, i + 1); // Stored genetic information.
			}
		} else {
			tf.motherID = actor.ID; // Initial biological mother ID setup.
			if (actor.eggType === "human") {
				tf.genetics = generateGenetics(actor, fatherID, i + 1); // Stored genetic information.
			}
		}
		tf.ID = generateNewID();

		try {
			if (actor.womb.length === 0) {
				actor.pregWeek = age;
				actor.preg = age;
			}
			actor.womb.push(tf);
		} catch (err) {
			WombInit(actor);
			actor.womb.push(tf);
			alert("WombImpregnate warning - " + actor.slaveName + " " + err);
		}
	}
	MissingParentIDCorrection(actor);
	WombUpdatePregVars(actor);
};

window.WombSurrogate = function(actor, fCount, mother, fatherID, age) {
	WombImpregnate(actor, fCount, fatherID, age, mother);
};

window.WombImpregnateClone = function(actor, fCount, mother, motherOriginal, age) {
	let i;
	let tf;
	for (i = 0; i < fCount; i++) {
		tf = {}; // new Object
		tf.age = age; // initial age
		tf.realAge = 1; // initial real age (first week in mother)
		tf.fatherID = mother.ID; // We can store who is father too.
		tf.volume = 1; // Initial, to create property. Updated with actual data after WombGetVolume call.
		tf.reserve = ""; // Initial, to create property. Used later to mark if this child is to be kept.
		tf.identical = 0; // Initial, to create property. Updated with actual data during fetalSplit call.
		tf.splitted = 0; // marker for already splitted fetus.
		tf.motherID = mother.ID; // Initial biological mother ID setup.
		tf.genetics = generateGenetics(mother, mother.ID, i + 1); // Stored genetic information.
		tf.ID = generateNewID();

		// Welcome to having to set up common relatives for the slave and her clone
		if (mother.father === 0 || (mother.father < -1 && mother.father >= -20 && mother.father !== -3)) {
			mother.father = State.variables.missingParentID;
			State.variables.missingParentID--;
		}
		if (mother.mother === 0 || (mother.mother < -1 && mother.mother >= -20 && mother.mother !== -3)) {
			mother.mother = State.variables.missingParentID;
			State.variables.missingParentID--;
		}

		// gene corrections
		tf.fatherID = -7;
		tf.genetics.gender = mother.genes;
		tf.genetics.mother = mother.mother;
		tf.genetics.father = mother.father;
		if (mother.ID === -1) {
			tf.genetics.motherName = mother.slaveName;
			tf.genetics.fatherName = mother.slaveName;
			tf.genetics.clone = PlayerName(mother);
			tf.genetics.cloneID = -1;
		} else {
			tf.genetics.motherName = mother.slaveName;
			tf.genetics.fatherName = mother.slaveName;
			tf.genetics.clone = SlaveFullName(mother);
			tf.genetics.cloneID = mother.ID;
		}
		tf.genetics.intelligence = motherOriginal.intelligence;
		tf.genetics.face = motherOriginal.face;
		tf.genetics.faceShape = motherOriginal.faceShape;
		tf.genetics.geneticQuirks = clone(mother.geneticQuirks);
		tf.genetics.skin = motherOriginal.skin;

		try {
			if (actor.womb.length === 0) {
				actor.pregWeek = age;
				actor.preg = age;
				actor.pregSource = -7;
			}
			actor.womb.push(tf);
		} catch (err) {
			WombInit(actor);
			actor.womb.push(tf);
			alert("WombImpregnate warning - " + actor.slaveName + " " + err);
		}
	}
	WombUpdatePregVars(actor);
};

// Should be used to set biological age for fetus (ageToAdd), AND chronological (realAgeToAdd). Speed up or slow down gestation drugs should affect ONLY biological.
window.WombProgress = function(actor, ageToAdd, realAgeToAdd = ageToAdd) {
	ageToAdd = Math.ceil(ageToAdd * 10) / 10;
	realAgeToAdd = Math.ceil(realAgeToAdd * 10) / 10;
	try {
		actor.womb.forEach(ft => {
			ft.age += ageToAdd;
			ft.realAge += realAgeToAdd;
		});
	} catch (err) {
		WombInit(actor);
		alert("WombProgress warning - " + actor.slaveName + " " + err);
	}
};

window.WombBirth = function(actor, readyAge) {
	try {
		WombSort(actor); // For normal processing fetuses that more old should be first. Now - they are.
	} catch (err) {
		WombInit(actor);
		alert("WombBirth warning - " + actor.slaveName + " " + err);
	}

	let birthed = [];
	let ready = WombBirthReady(actor, readyAge);
	let i;

	for (i = 0; i < ready; i++) { // here can't be used "for .. in .." syntax.
		birthed.push(actor.womb.shift());
	}

	return birthed;
};

window.WombFlush = function(actor) {
	actor.womb = [];
	WombUpdatePregVars(actor);
};

window.WombBirthReady = function(actor, readyAge) {
	let readyCnt = 0;
	try {
		readyCnt += actor.womb.filter(ft => ft.age >= readyAge).length;
	} catch (err) {
		WombInit(actor);
		alert("WombBirthReady warning - " + actor.slaveName + " " + err);
		return 0;
	}

	return readyCnt;
};

window.WombGetVolume = function(actor) { // most legacy code from pregJS.tw with minor adaptation.
	if (actor.pregData.sizeType === 0) {
		return getVolByLen(actor);
	} else if (actor.pregData.sizeType === 1) {
		return getVolByWeight(actor);
	} else if (actor.pregData.sizeType === 2) {
		return getVolByRaw(actor);
	} else {
		return 0;
	}

	function getCurData(actor, age) {
		let i = 0;
		let min, max, ageMin, ageMax, rateMin, rateMax, one, rateOne, rate, cage, csize;
		let data = {};

		while (actor.pregData.fetusWeek[i + 1] < age && i < actor.pregData.fetusWeek.length - 1) {
			i++;
		}

		min = actor.pregData.fetusSize[i];
		max = actor.pregData.fetusSize[i + 1];
		ageMin = actor.pregData.fetusWeek[i];
		ageMax = actor.pregData.fetusWeek[i + 1];
		rateMin = actor.pregData.fetusRate[i];
		rateMax = actor.pregData.fetusRate[i + 1];

		cage = age - ageMin;

		one = (max - min) / (ageMax - ageMin);
		rateOne = (rateMax - rateMin) / (ageMax - ageMin);

		rate = rateMin + (rateOne * cage);

		csize = (min + (one * cage));
		// console.log("min:"+min+"  max:"+max+"  ageMin:"+ageMin+"  ageMax:"+ageMax+"  one:"+one+"  rateOne:"+rateOne+"  cage:"+cage+"  rate:"+rate+"  csize:"+csize+"  final size:"+csize*rate);

		data.size = csize;
		data.rate = rate;

		return data; // csize * rate;
		// maybe not very effective code, but simple and easy to debug. May be optimized more in future.
	}

	function getVolByLen(actor) {
		let phi = 1.618;
		let targetData, targetLen;
		let wombSize = 0;

		try {
			actor.womb.forEach(ft => {
				/* legacy block for debug only
				let gestastionWeek = ft.age;
				let oldLen;
				let oldVol;
				if (gestastionWeek <= 32) {
					oldLen = (0.00006396 * Math.pow(gestastionWeek, 4)) -
						(0.005501 * Math.pow(gestastionWeek, 3)) +
						(0.161 * Math.pow(gestastionWeek, 2)) -
						(0.76 * gestastionWeek) +
						0.208;
				} else if (gestastionWeek <= 106) {
					oldLen = (-0.0000004675 * Math.pow(gestastionWeek, 4)) +
						(0.0001905 * Math.pow(gestastionWeek, 3)) -
						(0.029 * Math.pow(gestastionWeek, 2)) +
						(2.132 * gestastionWeek) -
						16.575;
				} else {
					oldLen = (-0.00003266 * Math.pow(gestastionWeek,2)) +
						(0.076 * gestastionWeek) +
						43.843;
				}
				*/

				targetData = getCurData(actor, ft.age);
				targetLen = targetData.size * targetData.rate;

				ft.volume = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((targetLen / 2), 3)));
				wombSize += ft.volume;

				// oldVol = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((oldLen / 2), 3))); // for debug

				// console.log("fetus.age:" + ft.age + "  oldLen:"+oldLen+"  targetLen:"+targetLen+"  ft.volume:"+ft.volume+ "  old volume:"+oldVol );
				/*
					I found, that previous targetLen calculation not exactly accurate if compared to the actual medical data chart for fetal length. It's been rough approximation based only on pregnancy week (giving smaller fetus size then it should in most cases). So I need all this debug code to compare data and verify calculations. After final tweaking I will remove or comment out legacy code. Please not touch this before it.
					Pregmodfan.
				*/
			});
		} catch (err) {
			WombInit(actor);
			alert("WombGetVolume warning - " + actor.slaveName + " " + err);
		}
		if (wombSize < 0) { // catch for strange cases, to avoid messing with outside code.
			wombSize = 0;
		}

		return wombSize;
	}


	function getVolByWeight(actor) {
		let targetData;
		let wombSize = 0;

		actor.womb.forEach(ft => {
			targetData = getCurData(actor, ft.age);

			wombSize += targetData.size * targetData.rate;
		});

		if (wombSize < 0) { // catch for strange cases, to avoid messing with outside code.
			wombSize = 0;
		}

		return wombSize;
	}


	function getVolByRaw(actor) {
		let targetData;
		let wombSize = 0;

		actor.womb.forEach(ft => {
			targetData = getCurData(actor, ft.age);

			wombSize += targetData.size;
		});

		if (wombSize < 0) { // catch for strange cases, to avoid messing with outside code.
			wombSize = 0;
		}

		return wombSize;
	}
};

window.FetusGetPrediction = function(actor, age) {
	let vol = 0.1;
	if (actor.pregData.sizeType === 0) {
		vol = getVolByLen(actor, age);
	} else if (actor.pregData.sizeType === 1) {
		vol = getVolByWeight(actor, age);
	} else if (actor.pregData.sizeType === 2) {
		vol = getVolByRaw(actor, age);
	}

	if (vol === 0) {
		vol = 0.1;
	}

	return vol;

	function getCurData(actor, age) {
		let i = 0;
		let min, max, ageMin, ageMax, rateMin, rateMax, one, rateOne, rate, cage, csize;
		let data = {};

		while (actor.pregData.fetusWeek[i + 1] < age && i < actor.pregData.fetusWeek.length - 1) {
			i++;
		}

		min = actor.pregData.fetusSize[i];
		max = actor.pregData.fetusSize[i + 1];
		ageMin = actor.pregData.fetusWeek[i];
		ageMax = actor.pregData.fetusWeek[i + 1];
		rateMin = actor.pregData.fetusRate[i];
		rateMax = actor.pregData.fetusRate[i + 1];

		cage = age - ageMin;

		one = (max - min) / (ageMax - ageMin);
		rateOne = (rateMax - rateMin) / (ageMax - ageMin);

		rate = rateMin + (rateOne * cage);

		csize = (min + (one * cage));
		// console.log("min:"+min+"  max:"+max+"  ageMin:"+ageMin+"  ageMax:"+ageMax+"  one:"+one+"  rateOne:"+rateOne+"  cage:"+cage+"  rate:"+rate+"  csize:"+csize+"  final size:"+csize*rate);

		data.size = csize;
		data.rate = rate;

		return data; // csize * rate;
		// maybe not very effective code, but simple and easy to debug. May be optimized more in future.
	}

	function getVolByLen(actor, age) {
		let phi = 1.618;
		let targetData, targetLen;
		let volume = 0;

		targetData = getCurData(actor, age);
		targetLen = targetData.size * targetData.rate;

		volume = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((targetLen / 2), 3)));

		if (volume < 0) { // catch for strange cases, to avoid messing with outside code.
			volume = 0;
		}

		return volume;
	}

	function getVolByWeight(actor, age) {
		let targetData;
		let volume = 0;

		targetData = getCurData(actor, age);

		volume += targetData.size * targetData.rate;

		if (volume < 0) { // catch for strange cases, to avoid messing with outside code.
			volume = 0;
		}

		return volume;
	}

	function getVolByRaw(actor) {
		let targetData;
		let volume = 0;

		targetData = getCurData(actor, age);

		volume += targetData.size;

		if (volume < 0) { // catch for strange cases, to avoid messing with outside code.
			volume = 0;
		}

		return volume;
	}
};

window.WombUpdatePregVars = function(actor) {
	WombSort(actor);
	if (actor.womb.length > 0) {
		if (actor.preg > 0 && actor.womb[0].age > 0) {
			actor.preg = actor.womb[0].age;
		}
		actor.pregType = actor.womb.length;
		actor.bellyPreg = WombGetVolume(actor);

		if (actor.womb[0].age >= 10 && actor.pregKnown === 0) {
			actor.pregKnown = 1;
		}
	} else {
		actor.pregType = 0;
		WombNormalizePreg(actor);
	}
};

window.WombMinPreg = function(actor) {
	WombSort(actor);
	if (actor.womb.length > 0) {
		return actor.womb[actor.womb.length - 1].age;
	} else {
		return 0;
	}
};

window.WombMaxPreg = function(actor) {
	WombSort(actor);
	if (actor.womb.length > 0) {
		return actor.womb[0].age;
	} else {
		return 0;
	}
};

window.WombNormalizePreg = function(actor) {
	// console.log("New actor: " + actor.slaveName + " ===============" + actor.name);
	WombInit(actor);

	// this is broodmother on hold.
	if (actor.womb.length === 0 && actor.broodmother >= 1) {
		actor.pregType = 0;
		actor.pregKnown = 0;

		// to avoid legacy code conflicts - broodmother on hold
		// can't be impregnated, but she is not on normal contraceptives.
		// So we set this for special case.
		if (actor.preg >= 0) {
			actor.preg = 0.1;
		}

		if (actor.pregSource !== 0) {
			actor.pregSource = 0;
		}

		if (actor.pregWeek > 0) {
			actor.pregWeek = 0;
		}

		actor.broodmotherCountDown = 0;
	}

	if (actor.womb.length > 0) {
		let max = WombMaxPreg(actor);
		// console.log("max: " + max);
		// console.log(".preg: "+ actor.preg);
		if (actor.pregWeek < 1) {
			actor.pregWeek = 1;
		}

		if (max < actor.preg) {
			WombProgress(actor, actor.preg - max, actor.preg - max);
			// console.log("progressin womb");
		} else if (max > actor.preg) {
			actor.preg = max;
			// console.log("advancing .preg");
		}

		if (actor.womb[0].age >= 10 && actor.pregKnown === 0) {
			actor.pregKnown = 1;
		}

		actor.pregType = actor.womb.length;
		actor.pregSource = actor.womb[0].fatherID;
	} else if (actor.womb.length === 0 && actor.broodmother < 1) {
		// not broodmother
		// console.log("preg fixing");
		actor.pregType = 0;
		actor.pregKnown = 0;

		if (actor.preg > 0) {
			actor.preg = 0;
		}

		if (actor.pregSource !== 0) {
			actor.pregSource = 0;
		}

		// We can't properly set postpartum here,
		// but can normalize obvious error with forgotten property.
		if (actor.pregWeek > 0) {
			actor.pregWeek = 0;
		}
	}
	actor.bellyPreg = WombGetVolume(actor);
};

window.WombZeroID = function(actor, id) {
	WombInit(actor);
	actor.womb
		.filter(ft => ft.fatherID === id)
		.forEach(ft => ft.fatherID = 0);
	WombNormalizePreg(actor);
};

window.WombChangeID = function(actor, fromID, toID) {
	WombInit(actor);
	actor.womb
		.filter(ft => ft.fatherID === fromID)
		.forEach(ft => ft.fatherID = toID);
	WombNormalizePreg(actor);
};

window.WombChangeGeneID = function(actor, fromID, toID) {
	WombInit(actor);
	actor.womb
		.filter(ft => ft.genetics.father === fromID)
		.forEach(ft => ft.genetics.father = toID);
	actor.womb
		.filter(ft => ft.genetics.mother === fromID)
		.forEach(ft => ft.genetics.mother = toID);
	WombNormalizePreg(actor);
};

/* Sorts the womb object by age with oldest and thus soonest to be born, first. This will be needed in the future once individual fertilization is a possibility.*/
window.WombSort = function(actor) {
	actor.womb.sort((a, b) => {
		return b.age - a.age;
	});
};

// now function work with chance. Literary we give it "one from X" as chance.
window.fetalSplit = function(actor, chance) {
	let nft;

	actor.womb.forEach(function(s) {
		if ((jsRandom(1, chance) >= chance) && s.splitted !== 1) {
			nft = {};
			nft.age = s.age;
			nft.realAge = s.realAge;
			nft.fatherID = s.fatherID;
			nft.motherID = s.motherID;
			nft.volume = s.volume;
			nft.reserve = ""; // splitted fetus is new separate, reserve - it's not genetic to split.
			nft.genetics = clone(s.genetics);
			s.splitted = 1; // this is marker that this is already splitted fetus (to not split second time in loop), only source fetus needed it.
			nft.identical = 1; // this is marker that this fetus has at least one twin.
			s.identical = 1; // this is marker that this fetus has at least one twin.

			if (s.twinID === "" || s.twinID === undefined) {
				s.twinID = generateNewID();
			}

			nft.twinID = s.twinID;

			actor.womb.push(nft);
		}
	});
	WombNormalizePreg(actor);
};

// safe alternative to .womb.length.
window.WombFetusCount = function(actor) {
	WombInit(actor);
	return actor.womb.length;
};

// give reference to fetus object, but not remove fetus, use for manipulation in the womb.
window.WombGetFetus = function(actor, fetusNum) {
	WombInit(actor);
	if (actor.womb.length >= fetusNum) {
		return actor.womb[fetusNum];
	} else {
		return null;
	}
};

// give reference to fetus object, and remove it form the womb.
window.WombRemoveFetus = function(actor, fetusNum) {
	WombInit(actor);
	if (actor.womb.length >= fetusNum) {
		let ft = actor.womb[fetusNum];
		actor.womb.splice(fetusNum, 1);
		WombUpdatePregVars(actor);
		return ft;
	} else {
		return null;
	}
};

/* to add fetus object in the womb. Be warned - you can add one single fetus to many wombs, or even add it many times to one womb. It will not show error, but behavior becomes strange, as fetus object will be the same - it's reference, not full copies. If this is not desired - use clone() on fetus before adding.*/
window.WombAddFetus = function(actor, fetus) {
	WombInit(actor);
	actor.womb.push(fetus);
	WombSort(actor);
};

// change property for all fetuses. Like fetus.age = X.
window.WombChangeFetus = function(actor, propName, newValue) {
	WombInit(actor);
	actor.womb.forEach(ft => ft[propName] = newValue);
};

// change genetic property of all fetuses. Like fetus.genetic.intelligence = X
window.WombChangeGene = function(actor, geneName, newValue) {
	WombInit(actor);
	actor.womb.forEach(ft => ft.genetics[geneName] = newValue);
};

// change genetic property of all fetuses based on race
window.WombFatherRace = function(actor, raceName) {
	let skinColor = randomRaceSkin(raceName);
	let eyeColor = randomRaceEye(raceName);
	let hairColor = randomRaceHair(raceName);
	WombChangeGene(actor, "race", raceName);
	WombChangeGene(actor, "skin", skinColor);
	WombChangeGene(actor, "eyeColor", eyeColor);
	WombChangeGene(actor, "hColor", hairColor);
};

// replaces untraceable fatherIDs with missingParentID. Required for concurrent pregnancy to differentiate between siblings.
window.MissingParentIDCorrection = function(actor) {
	WombInit(actor);
	actor.womb
		.filter(ft => (ft.genetics.father === 0 || (ft.genetics.father < -1 && ft.genetics.father >= -20 && ft.genetics.father !== -3)))
		.forEach(ft => ft.genetics.father = State.variables.missingParentID);
	State.variables.missingParentID--;
};

window.WombCleanYYFetuses = function(actor) {
	let reserved = [];

	let i = actor.womb.length - 1;
	let ft;

	while (i >= 0) {
		ft = actor.womb[i];

		if (ft.genetics.gender === "YY") {
			reserved.push(ft);
			actor.womb.splice(i, 1);
		}

		i--;
	}
	WombUpdatePregVars(actor);

	return reserved;
};

window.FetusGlobalReserveCount = function(reserveType) {
	let cnt = 0;

	if (typeof reserveType !== 'string') {
		return 0;
	}

	V.slaves.forEach(function(slave) {
		slave.womb.forEach(function(ft) {
			if (ft.reserve === reserveType) {
				cnt++;
			}
		});
	});

	V.PC.womb.forEach(function(ft) {
		if (ft.reserve === reserveType) {
			cnt++;
		}
	});

	return cnt;
};

window.WombSetGenericReserve = function(actor, type, count) {
	// console.log ("actor: " + actor + "  type: " + type + "  typeof: " + typeof type + "  count: " + count);
	actor.womb.forEach(function(ft) {
		// console.log ("  type: " + ft.reserve + "  typeof: " + typeof ft.reserve);
		if ((ft.reserve === "" || ft.reserve === type) && count > 0) {
			// console.log ("!trigger");
			ft.reserve = type;
			count--;
		}
	});
};

window.WombAddToGenericReserve = function(actor, type, count) {
	WombSetGenericReserve(actor, type, (WombReserveCount(actor, type) + count));
};

window.WombChangeReserveType = function(actor, oldType, newType) {
	let count = 0;

	actor.womb.forEach(function(ft) {
		if (ft.reserve === oldType) {
			ft.reserve = newType;
			count++;
		}
	});

	return count;
};

window.WombCleanGenericReserve = function(actor, type, count) {
	actor.womb.forEach(function(ft) {
		if (ft.reserve === type && count > 0) {
			ft.reserve = "";
			count--;
		}
	});
};

window.WombReserveCount = function(actor, type) {
	let cnt = 0;

	actor.womb.forEach(function(ft) {
		if (ft.reserve === type) /* the lazy equality will catch "" case */ {
			cnt++;
		}
	});

	return cnt;
};

window.WombGetReservedFetuses = function(actor, type) {
	let reserved = [];

	actor.womb.forEach(function(ft) {
		if (ft.reserve === type) {
			reserved.push(ft);
		}
	});

	return reserved;
};

window.WombRemoveReservedFetuses = function(actor, type) {
	let reserved = [];

	let i = actor.womb.length - 1;
	let ft;

	while (i >= 0) {
		ft = actor.womb[i];

		if (ft.reserve === type) {
			reserved.push(ft);
			actor.womb.splice(i, 1);
		}

		i--;
	}

	return reserved;
};

window.WombCleanAllReserve = function(actor) {
	actor.womb.forEach(function(ft) {
		ft.reserve = "";
	});
};

/*
Function return object with data about litters in actor womb. This data can be used for descriptions of pregnancy with complicated structure. What it contain:

data.litters.length = summary count of separate litters in the womb.
data.litters[x] = age (.realAge) of litter "x".
data.countLitter[x] = count of fetuses in "x" litter.

data.litterData[x] = contain array with actual fetuses that belong to a litter "x". Can be used to check anything related to fetus. (This is not copy, but reference to actual fetuses, so be careful with changes of this array).

Sample of usage in SugarScript:
---
<<set _wd = WombGetLittersData($activeSlave)>>
$He is _wd.litters[0] weeks pregnant with $his first set of _wd.countLitter[0] children<<if _wd.litters > 1>>, _wd.litters[1] weeks along with $his second set<</if>><<if _wd.litters > 2>>, _wd.litters[2] and _wd.litters[2] weeks along with $his third<</if>>.
In summary $he carry _wd.litters.length separate sets of children. $His most progressed fetus of second pregnancy is already reached _wd.litterData[1][0].age biological week of gestation.
---
*/
window.WombGetLittersData = function(actor) {
	let data = {};
	let unicLiters = []; // array with realAges of separate litters.
	let countLitter = [];
	let litterData = [];
	let tmp;

	// in first place we need to know how many litters here (Assuming that unique litter is have similar .realAge). Also we will know their ages.
	actor.womb.forEach(function(ft) {
		if (!unicLiters.includes(Math.ceil(ft.realAge))) {
			unicLiters.push(Math.ceil(ft.realAge));
		}
	});

	// now we should find and store separate litters data (count of fetuses):
	unicLiters.forEach(function(litter) {
		tmp = actor.womb.filter(ft => Math.ceil(ft.realAge) === litter);
		countLitter.push(tmp.length);
		litterData.push(tmp);
	});

	data.litters = unicLiters;
	data.countLitter = countLitter;
	data.litterData = litterData;

	return data;
};

window.BCReserveInit = function() {
	V.slaves.forEach(function(slave) {
		slave.womb.forEach(function(ft) {
			if (typeof ft.reserve !== 'string') {
				ft.reserve = "";
			}
			if (typeof ft.motherID !== 'number') { // setting missing biological mother ID for fetus.
				ft.motherID = slave.ID;
			}
			if (ft.ID === undefined) {
				ft.ID = generateNewID();
			}
			if (typeof ft.realAge !== 'number') { // setting missing chronological age
				ft.realAge = ft.age;
			}
		});
	});

	V.PC.womb.forEach(function(ft) {
		if (typeof ft.reserve !== 'string') {
			ft.reserve = "";
		}
		if (typeof ft.motherID !== 'number') {
			ft.motherID = V.PC.ID;
		}
		if (typeof ft.realAge !== 'number') { // setting missing chronological age
			ft.realAge = ft.age;
		}
	});
};
