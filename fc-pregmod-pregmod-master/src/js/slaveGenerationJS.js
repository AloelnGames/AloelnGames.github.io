/**
 * @param {App.Entity.SlaveState} slave
 */
window.nationalityToRace = function nationalityToRace(slave) {
	slave.race = hashChoice(setup.raceSelector[slave.nationality] || setup.raceSelector[""]);
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.raceToNationality = function raceToNationality(slave) {
	/* consider this placeholder until raceNationalities gets fixed up */
	slave.nationality = hashChoice(V.nationalities);
	/* Maximum of 100 attempts */
	let i = 0;
	for (; setup.raceSelector[slave.nationality] && !(slave.race in setup.raceSelector[slave.nationality]) && i < 100; i++) {
		slave.nationality = hashChoice(V.nationalities);
	}
	/* No success after 100 attempts, so just randomize according to race */
	if (setup.raceSelector[slave.nationality] && !(slave.race in setup.raceSelector[slave.nationality]) && i === 100) {
		const nationalityKey = `${slave.race.toLowerCase().replace(/[ -]/g, "")}Nationalities`;
		if (nationalityKey in setup) {
			slave.nationality = hashChoice(setup[nationalityKey]);
		} else {
			slave.nationality = "Stateless";
		}
	}
};

/**
 * @param {string | object} nationality
 * @param {string | object} race
 * @param {boolean} male
 * @param {undefined} [filter] Default: allow all
 * @returns {string}
 */
window.generateName = function generateName(nationality, race, male, filter = _.stubTrue) {
	const lookup = (male ? setup.malenamePoolSelector : setup.namePoolSelector);
	const result = jsEither(
		(lookup[`${nationality}.${race}`] || lookup[nationality] ||
			(male ? setup.whiteAmericanMaleNames : setup.whiteAmericanSlaveNames)).filter(filter));
	/* fallback for males without specific male name sets: return female name */
	if (male && !result) {
		return generateName(nationality, race, false);
	}
	return result;
};

/**
 * @param {string | number} nationality
 * @param {any} race
 * @param {any} male
 * @param {Function} [filter] Default: allow all
 * @returns {string}
 */
window.generateSurname = function generateSurname(nationality, race, male, filter = _.stubTrue) {
	const result = jsEither(
		(setup.surnamePoolSelector[`${nationality}.${race}`] ||
			setup.surnamePoolSelector[nationality] ||
			setup.whiteAmericanSlaveSurnames).filter(filter));
	if (male) {
		/* see if we have male equivalent of that surname, and return that if so */
		const maleLookup = setup.maleSurnamePoolSelector[`${nationality}.${race}`] || setup.maleSurnamePoolSelector[nationality];
		if (maleLookup && maleLookup[result]) {
			return maleLookup[result];
		}
	}
	return result || 0;
};

/**
 * @param {string} name
 * @param {string | object} nationality
 * @param {any} race
 * @returns {boolean}
 */
window.isMaleName = function isMaleName(name, nationality, race) {
	const names = setup.malenamePoolSelector[`${nationality}.${race}`] ||
		setup.malenamePoolSelector[nationality] ||
		setup.whiteAmericanMaleNames;
	return names && names.includes(name);
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.nationalityToName = function nationalityToName(slave) {
	const male = (slave.genes === "XY");

	slave.birthName = generateName(slave.nationality, slave.race, male);
	slave.birthSurname = generateSurname(slave.nationality, slave.race, male);
	if (male && isMaleName(slave.birthName, slave.nationality, slave.race) && !V.allowMaleSlaveNames) {
		slave.slaveName = generateName(slave.nationality, slave.race, false);
	} else {
		slave.slaveName = slave.birthName;
	}
	slave.slaveSurname = slave.birthSurname;
	if (V.useFSNames === 1) {
		if (V.FSNamePref === 0) {
			if (V.arcologies[0].FSChattelReligionist > 20) {
				slave.slaveName = jsEither(setup.chattelReligionistSlaveNames);
				slave.slaveSurname = 0;
			} else if (V.arcologies[0].FSRomanRevivalist > 20) {
				slave.slaveName = jsEither(setup.romanSlaveNames);
				slave.slaveSurname = jsEither(setup.romanSlaveSurnames);
			} else if (V.arcologies[0].FSAztecRevivalist > 20) {
				slave.slaveName = jsEither(setup.aztecSlaveNames);
				slave.slaveSurname = 0;
			} else if (V.arcologies[0].FSEgyptianRevivalist > 20) {
				slave.slaveName = jsEither(setup.ancientEgyptianSlaveNames);
				slave.slaveSurname = 0;
			} else if (V.arcologies[0].FSEdoRevivalist > 20) {
				slave.slaveName = jsEither(setup.edoSlaveNames);
				slave.slaveSurname = jsEither(setup.edoSlaveSurnames);
			} else if (V.arcologies[0].FSDegradationist !== "unset") {
				DegradingName(slave);
			}
		} else if (V.FSNamePref === 1) {
			slave.slaveName = jsEither(setup.chattelReligionistSlaveNames);
			slave.slaveSurname = 0;
		} else if (V.FSNamePref === 2) {
			slave.slaveName = jsEither(setup.romanSlaveNames);
			slave.slaveSurname = jsEither(setup.romanSlaveSurnames);
		} else if (V.FSNamePref === 3) {
			slave.slaveName = jsEither(setup.aztecSlaveNames);
			slave.slaveSurname = 0;
		} else if (V.FSNamePref === 4) {
			slave.slaveName = jsEither(setup.ancientEgyptianSlaveNames);
			slave.slaveSurname = 0;
		} else if (V.FSNamePref === 5) {
			slave.slaveName = jsEither(setup.edoSlaveNames);
			slave.slaveSurname = jsEither(setup.edoSlaveSurnames);
		} else if (V.FSNamePref === 6) {
			DegradingName(slave);
		} else if (V.FSNamePref === 7) {
			PaternalistName(slave);
		} else if (V.FSNamePref === 8) {
			slave.slaveName = jsEither(setup.bimboSlaveNames);
			slave.slaveSurname = 0;
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.nationalityToAccent = function nationalityToAccent(slave) {
	const naturalAccent = jsEither([0, 1, 1, 2, 2, 2, 3, 3, 3, 3]);

	switch (slave.nationality) {
		case "Afghan":
			if (V.language === "Pashto") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Dari") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Persian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Albanian":
			slave.accent = naturalAccent;
			break;
		case "Algerian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "American":
			if (V.language === "English") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Spanish" && slave.race === "latina") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Chinese" && slave.race === "asian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Arabic" && slave.race === "middle eastern") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Andorran":
			slave.accent = (V.language === "Catalan") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Angolan":
			slave.accent = (V.language === "Portuguese") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Antiguan":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Argentinian":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Armenian":
			if (V.language === "Russian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Aruban":
			if (V.language === "Dutch") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Portuguese") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Australian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Austrian":
			if (V.language === "German") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Serbian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Slovene") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Turkish" && slave.race === "indo-aryan") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Azerbaijani":
			slave.accent = naturalAccent;
			break;
		case "Bahamian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Bahraini":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Bangladeshi":
			if (V.language === "Bengali") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Hindi") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Barbadian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Belarusian":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Belgian":
			if (V.language === "Dutch") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "German") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Belizean":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Beninese":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Bermudian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Bhutanese":
			slave.accent = (V.language === "Dzongkha") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Bissau-Guinean":
			slave.accent = (V.language === "Portuguese") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Bolivian":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Bosnian":
			if (V.language === "Croatian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Serbian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Brazilian":
			if (V.language === "Portuguese") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Spanish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "British":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Hindi" && slave.race === "indo-aryan") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Bruneian":
			if (V.language === "Malay") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Bulgarian":
			slave.accent = naturalAccent;
			break;
		case "Burkinabé":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Burmese":
			slave.accent = naturalAccent;
			break;
		case "Burundian":
			slave.accent = (V.language === "Kirundi") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Cambodian":
			if (V.language === "Khmer") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Cham") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Cameroonian":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Canadian":
			if (V.language === "English") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Cape Verdean":
			slave.accent = (V.language === "Portuguese") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Catalan":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Central African":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Chadian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Chilean":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Chinese":
			if (V.language === "Tibetan") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Korean") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Kazakh") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Colombian":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Comorian":
			if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Congolese":
			if (V.language === "Lingala") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Kikongo") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "a Cook Islander":
			if (V.language === "Cook Islands Māori") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Costa Rican":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Croatian":
			if (V.language === "Bosnian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Serbian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Cuban":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Curaçaoan":
			if (V.language === "Dutch") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Portuguese") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Cypriot":
			if (V.language === "Greek") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Turkish") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Czech":
			if (V.language === "Slovak") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Vietnamese" && slave.race === "asian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Danish":
			slave.accent = naturalAccent;
			break;
		case "Djiboutian":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Dominican":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Dominiquais":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Dutch":
			slave.accent = naturalAccent;
			break;
		case "East Timorese":
			if (V.language === "Tetum") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Portuguese") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Malay") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Ecuadorian":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Egyptian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Emirati":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Equatoguinean":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Eritrean":
			if (V.language === "Tigrinya") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Estonian":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Ethiopian":
			if (V.language === "Amharic") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Tigrinya") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Fijian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Filipina":
			if (V.language === "Filipino") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Tagalog") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Spanish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Finnish":
			slave.accent = (V.language === "Swedish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "French":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Spanish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "German") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Arabic" && slave.race === "middle eastern") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Catalan") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "French Guianan":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "French Polynesian":
			if (V.language === "Tahitian") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Chinese") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Gabonese":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Gambian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Georgian":
			slave.accent = (V.language === "Abkhaz") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "German":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Turkish" && slave.race === "indo-aryan") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Ghanan":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Hausa") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Greek":
			slave.accent = naturalAccent;
			break;
		case "Greenlandic":
			slave.accent = (V.language === "Danish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Grenadian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Guamanian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Guatemalan":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Guinean":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Guyanese":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Haitian":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Honduran":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Hungarian":
			if (V.language === "German") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "I-Kiribati":
			if (V.language === "Gilbertese") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Icelandic":
			if (V.language === "Danish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Indian":
			if (V.language === "Hindi") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Indonesian":
			if (V.language === "Javanese") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Malay") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Iranian":
			if (V.language === "Persian") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Iraqi":
			if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Kurdish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Irish":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Israeli":
			if (V.language === "Hebrew") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Yiddish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Italian":
			slave.accent = naturalAccent;
			break;
		case "Ivorian":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Jamaican":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Japanese":
			slave.accent = naturalAccent;
			break;
		case "Jordanian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Kazakh":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Kenyan":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Kittitian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Korean":
			slave.accent = (V.language === "Chinese") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Kosovan":
			if (V.language === "Albanian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Serbian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Kurdish":
			if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Turkish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Kuwaiti":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Kyrgyz":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Laotian":
			if (V.language === "Lao") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Khmu") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Latvian":
			slave.accent = naturalAccent;
			break;
		case "Lebanese":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Liberian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Libyan":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "a Liechtensteiner":
			slave.accent = (V.language === "German") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Lithuanian":
			slave.accent = naturalAccent;
			break;
		case "Luxembourgian":
			if (V.language === "Luxembourgish") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "German") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Macedonian":
			slave.accent = naturalAccent;
			break;
		case "Malagasy":
			if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Malawian":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Chichewa") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Malaysian":
			slave.accent = (V.language === "Malay") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Maldivian":
			slave.accent = naturalAccent;
			break;
		case "Malian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Maltese":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Italian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Marshallese":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Mauritanian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Mauritian":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Mexican":
			if (V.language === "Spanish") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Nahuatl" && slave.race === "amerindian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Micronesian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Moldovan":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Monégasque":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Mongolian":
			slave.accent = naturalAccent;
			break;
		case "Montenegrin":
			slave.accent = (V.language === "Serbian") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Moroccan":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Mosotho":
			slave.accent = (V.language === "Sesotho") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Motswana":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Mozambican":
			if (V.language === "Portuguese") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Makhuwa") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Sena") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Swahili") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Namibian":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Afrikaans") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Nauruan":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Nepalese":
			if (V.language === "Nepali") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Maithili") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Bhojpuri") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "New Caledonian":
			if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Nengone") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Drehu") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "a New Zealander":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Māori" && slave.race === "pacific islander") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Ni-Vanuatu":
			if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Nicaraguan":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Nigerian":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Hausa") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Nigerien":
			if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Hausa") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Niuean":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Norwegian":
			slave.accent = naturalAccent;
			break;
		case "Omani":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Pakistani":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Palauan":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Sonsorolese") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Tobian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Japanese") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Palestinian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Panamanian":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Papua New Guinean":
			slave.accent = naturalAccent;
			break;
		case "Paraguayan":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Peruvian":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Polish":
			slave.accent = naturalAccent;
			break;
		case "Portuguese":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Puerto Rican":
			if (V.language === "Spanish") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Qatari":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Romanian":
			slave.accent = naturalAccent;
			break;
		case "Russian":
			slave.accent = naturalAccent;
			break;
		case "Rwandan":
			slave.accent = (V.language === "Kinyarwanda") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Sahrawi":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Saint Lucian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Salvadoran":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Sammarinese":
			slave.accent = (V.language === "Italian") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Samoan":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "São Toméan":
			slave.accent = (V.language === "Portuguese") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Saudi":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Scottish":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Senegalese":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Serbian":
			if (V.language === "Bosnian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Serbian") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Seychellois":
			if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Sierra Leonean":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Singaporean":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Chinese") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Malay") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Tamil") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Slovak":
			slave.accent = (V.language === "Czech") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Slovene":
			slave.accent = naturalAccent;
			break;
		case "a Solomon Islander":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Somali":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "South African":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Afrikaans") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Dutch") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "South Sudanese":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Spanish":
			slave.accent = (V.language === "Catalan") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Sri Lankan":
			if (V.language === "Sinhalese") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Tamil") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Sudanese":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Surinamese":
			slave.accent = (V.language === "Dutch") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Swazi":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Afrikaans") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Tsonga") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Zulu") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Swedish":
			if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Finnish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Norwegian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "German") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Swiss":
			if (V.language === "German") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Italian") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Syrian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Taiwanese":
			slave.accent = (V.language === "Chinese") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Tajik":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Tanzanian":
			slave.accent = (V.language === "Swahili") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Thai":
			if (V.language === "Chinese") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Malay") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Khmer") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Tibetan":
			slave.accent = (V.language === "Chinese") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Togolese":
			slave.accent = (V.language === "French") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Tongan":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Trinidadian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Tunisian":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Turkish":
			if (V.language === "Arabic") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Kurdish") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "Zaza") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Turkmen":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Tuvaluan":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Ugandan":
			slave.accent = (V.language === "Swahili") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Ukrainian":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Uruguayan":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Uzbek":
			slave.accent = (V.language === "Russian") ? jsEither([0, 1, 2, 2, 2, 3, 3]) : naturalAccent;
			break;
		case "Vatican":
			if (V.language === "Italian") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Latin") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "German") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Venezuelan":
			slave.accent = (V.language === "Spanish") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Vietnamese":
			if (V.language === "Chinese") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 2, 2, 2, 3, 3]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Vincentian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Yemeni":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Zairian":
			if (V.language === "Lingala") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Kikongo") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Swahili") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "French") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Zambian":
			slave.accent = (V.language === "English") ? jsEither([0, 1, 1, 1, 1, 2]) : naturalAccent;
			break;
		case "Zimbabwean":
			if (V.language === "Shona") {
				slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
			} else if (V.language === "Ndebele") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "Chewa") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else if (V.language === "English") {
				slave.accent = jsEither([0, 1, 1, 1, 1, 2]);
			} else {
				slave.accent = naturalAccent;
			}
			break;
		case "Ancient Chinese Revivalist":
			slave.accent = (V.language === "Chinese") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Ancient Egyptian Revivalist":
			slave.accent = (V.language === "Ancient Egyptian") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Arabian Revivalist":
			slave.accent = (V.language === "Arabic") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Aztec Revivalist":
			slave.accent = (V.language === "Nahuatl") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Edo Revivalist":
			slave.accent = (V.language === "Japanese") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		case "Roman Revivalist":
			slave.accent = (V.language === "Latin") ? jsEither([0, 0, 0, 0, 0, 0, 1]) : naturalAccent;
			break;
		default:
			slave.accent = naturalAccent;
			break;
	}

	if (slave.nationality === V.language) {
		slave.accent = jsEither([0, 0, 0, 0, 0, 0, 1]);
	}
};

/*
Backup and then apply gingering modifiers to $activeSlave - no changes should be made to $activeSlave until after calling removeGingering() to restore the backup
Called from lawCompliance
*/
window.checkForGingering = function checkForGingering() {
	let r = "";
	const {he, him, his, He, His} = getPronouns(V.activeSlave);

	/* reset in case gingered slaves were viewed but not purchased (no newSlaveIntro) */
	V.gingering = 0;
	V.gingeringDetected = 0;
	V.gingeringDetection = 0;
	V.toSearch = V.activeSlave.origin;
	if (V.applyLaw === 1 && V.HonestySMR === 1) {
		/* SMR prohibits gingering and is enforced for this slave - do nothing */
	} else if (V.activeSlave.indenture > 0) {
		/* indentured servants cannot be gingered */
	} else if (V.toSearch !== 0 && V.toSearch.includes("Shelter")) {
		/* is a Shelter slave - do nothing */
	} else {
		V.beforeGingering = clone(V.activeSlave);
		if (V.activeSlave.trust < -20 && jsRandom(1, 3) === 1) {
			V.gingering = "antidepressant";
			V.activeSlave.trust += jsRandom(10, 40);
		} else if (V.activeSlave.devotion < -20 && jsRandom(1, 3) === 1) {
			V.gingering = "depressant";
			V.activeSlave.devotion += jsRandom(10, 40);
		} else if (V.activeSlave.health.condition < 60 && jsRandom(1, 3) === 1) {
			V.gingering = "stimulant";
			improveCondition(V.activeSlave, jsRandom(20, 40));
		} else if (V.activeSlave.balls > 0 && V.activeSlave.dick > 2 && jsRandom(1, 3) === 1) {
			V.gingering = "vasoconstrictor";
			V.activeSlave.dick -= jsRandom(1, 2);
		} else if (V.activeSlave.balls > 0 && V.activeSlave.dick < 5 && jsRandom(1, 3) === 1) {
			V.gingering = "vasodilator";
			V.activeSlave.dick += jsRandom(1, 2);
		} else if (V.activeSlave.attrKnown === 0 && jsRandom(1, 3) === 1) {
			V.gingering = "aphrodisiac";
			V.activeSlave.aphrodisiacs = 2;
			V.activeSlave.attrKnown = 1;
			V.activeSlave.attrXX = jsRandom(60, 90);
			V.activeSlave.attrXY = jsRandom(60, 90);
			V.activeSlave.energy = jsRandom(50, 90);
		} else if (V.activeSlave.anus > 0 && V.activeSlave.fetishKnown === 0 && jsRandom(1, 3) === 1) {
			V.gingering = "ginger";
			V.activeSlave.fetish = "buttslut";
			V.activeSlave.fetishKnown = 1;
			V.activeSlave.fetishStrength = 65;
		}
	}
	if (V.gingering !== 0) {
		if (V.PC.skill.slaving >= 100) {
			V.gingeringDetected = 1;
			V.gingeringDetection = "slaver";
			switch (V.gingering) {
				case "antidepressant":
					r += `${He} is acting dazed and unfocused. ${He}'s obviously been given antidepressants to make ${him} appear less fearful, and will be considerably less trusting than ${he} seems.`;
					break;
				case "depressant":
					r += `${He} is acting languid and drugged. ${He}'s obviously been given a depressant to make ${him} appear less hateful, and will be considerably less accepting of slavery than ${he} seems.`;
					break;
				case "stimulant":
					r += `${He} is acting twitchy and hyperactive. ${He}'s obviously been given a stimulant to make ${him} seem healthier and more energetic, and is a lot less healthy than ${he} looks.`;
					break;
				case "vasoconstrictor":
					r += `${His} lips have the slightest blue tinge, making it obvious ${he}'s been given a vasoconstrictor. ${His} cock is a lot less of a girldick than it looks right now.`;
					break;
				case "vasodilator":
					r += `${He} has an impressive erection, but it seems quite unconnected to the rest of ${him}, as if ${he} doesn't know what to do with it. ${He}'s obviously been given a vasodilator to make ${his} dick seem a little less pathetic.`;
					break;
				case "aphrodisiac":
					r += `${His} pupils are slightly dilated, ${his} breath comes in fast pants, and ${his} skin is flushed. ${He}'s obviously been given as big of a dose of aphrodisiacs as ${he} can handle without a heart attack.`;
					break;
				default:
					r += `${He} is acting oddly, presenting ${his} ass in an awkward way and acting uncomfortable. ${He}'s obviously had an irritant shoved up ${his} butt to make ${him} act like an anal whore.`;
			}
			r += ` It's a trick you're very familiar with, given your <span class="springgreen">training as a slaver.</span>`;
		} else {
			/* not slaver */
			if (V.PC.skill.warfare >= 100 && jsRandom(1, 2) === 1) {
				V.gingeringDetected = 1;
				V.gingeringDetection = "mercenary";
			} else if (V.PC.rumor === "force" && jsRandom(1, 2) === 1) {
				V.gingeringDetected = 1;
				V.gingeringDetection = "force";
			} else if (jsRandom(1, 3) === 1) {
				V.gingeringDetected = 1;
			}
			if (V.gingeringDetected === 1) {
				switch (V.gingering) {
					case "antidepressant":
						r += `${He} is acting dazed and unfocused, like ${he}'s been given antidepressants to make ${him} appear less fearful. ${He} may be considerably less trusting than ${he} seems. `;
						break;
					case "depressant":
						r += `${He} is acting languid and drugged, like ${he}'s been given a depressant to make ${him} appear less hateful. ${He} may be considerably less accepting of slavery than ${he} seems. `;
						break;
					case "stimulant":
						r += `${He} is acting twitchy and hyperactive, like ${he}'s been given a stimulant to make ${him} seem healthier and more energetic. ${He} may be considerably less vital than ${he} seems. `;
						break;
					case "vasoconstrictor":
						r += `${His} lips have the slightest blue tinge, suggesting that ${he} may have been given a vasoconstrictor. If ${he} has, ${his} cock may be considerably less feminine and demure than it now seems. `;
						break;
					case "vasodilator":
						r += `${He} has an impressive erection, but it seems quite unconnected to the rest of ${him}, as if ${he} doesn't know what to do with it. ${He} may have been given a vasodilator. If ${he} has, ${his} cock may be considerably less impressive than it now seems. `;
						break;
					case "aphrodisiac":
						r += `${His} pupils are slightly dilated, ${his} breath comes in fast pants, and ${his} skin is flushed. These are the characteristic symptoms of a dose of aphrodisiacs limited only by a desire to avoid giving ${him} a heart attack. `;
						break;
					default:
						r += `${He} is acting oddly, presenting ${his} ass in an awkward way and acting uncomfortable. ${He} may be considerably less interested in anal sex than ${he} seems. `;
				}
				if (V.gingeringDetection === "mercenary") {
					r += `The nervous seller confirms this in response to a direct inquiry. Your intimidating reputation from your <span class="springgreen">extensive combat training</span> has its uses.`;
				} else if (V.gingeringDetection === "force") {
					r += `The nervous seller confirms this in response to a direct inquiry. Your reputation as a <span class="springgreen"> ${V.PCTitle ? "man" : "woman"} of blood</span> has its uses.`;
				}
			}
		} /* gingering detected */
	} /* gingering !== 0 */
	return r;
};

/*
Retrieve original $activeSlave without gingering modifiers
Call as removeGingering()
Called from newSlaveIntro, bulkSlaveGenerate
*/
window.removeGingering = function removeGingering() {
	if (V.gingering !== 0 && V.beforeGingering !== 0 && V.activeSlave !== 0 && V.beforeGingering.ID === V.activeSlave.ID) {
		/* extra checks to ensure gingering state is not left over from a different slave that was inspected but not purchased */
		V.activeSlave = V.beforeGingering;
		V.beforeGingering = 0;
	} else {
		/* clear left over state from a different slave without modifying activeSlave
		 */
		V.gingering = 0;
		V.beforeGingering = 0;
	}
};

/**
 * @param {App.Entity.SlaveState} slave*/
window.randomizeAttraction = function randomizeAttraction(slave) {
	const sexuality = jsRandom(0, 100);
	let attraction = Math.clamp(slave.energy * 2, 60, 180);

	if (slave.balls > 0) {
		if (sexuality > 90) {
			slave.attrXY = Math.clamp(attraction, 0, 100);
			attraction -= slave.attrXY;
			slave.attrXX = Math.clamp(attraction, 0, 100);
		} else if (sexuality > 70) {
			slave.attrXY = Math.clamp(attraction + jsRandom(-5, 5), 0, 100);
			slave.attrXX = Math.clamp(attraction + jsRandom(-5, 5), 0, 100);
		} else {
			slave.attrXX = Math.clamp(attraction, 0, 100);
			attraction -= slave.attrXX;
			slave.attrXY = Math.clamp(attraction, 0, 100);
		}
	} else {
		if (sexuality > 90) {
			slave.attrXX = Math.clamp(attraction, 0, 100);
			attraction -= slave.attrXX;
			slave.attrXY = Math.clamp(attraction, 0, 100);
		} else if (sexuality > 60) {
			slave.attrXY = Math.clamp(attraction + jsRandom(-5, 5), 0, 100);
			slave.attrXX = Math.clamp(attraction + jsRandom(-5, 5), 0, 100);
		} else {
			slave.attrXY = Math.clamp(attraction, 0, 100);
			attraction -= slave.attrXY;
			slave.attrXX = Math.clamp(attraction, 0, 100);
		}
	}
	slave.attrXX = Math.clamp(slave.attrXX + jsRandom(-5, 5), 0, 100);
	slave.attrXY = Math.clamp(slave.attrXY + jsRandom(-5, 5), 0, 100);
};

window.BaseSlave = function BaseSlave() {
	return new App.Entity.SlaveState();
};

/**
 * @param {App.Entity.SlaveState} slave*/
window.generatePronouns = function generatePronouns(slave) {
	if (slave.fuckdoll > 0) {
		slave.pronoun = App.Data.Pronouns.Kind.toy;
	} else if (slave.dick > 0 && slave.vagina === -1 && State.variables.diversePronouns === 1) {
		slave.pronoun = App.Data.Pronouns.Kind.male;
	} else {
		slave.pronoun = App.Data.Pronouns.Kind.female;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.generatePuberty = function(slave) {
	if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.physicalAge >= slave.pubertyAgeXX) {
		slave.pubertyXX = 1;
	} else {
		slave.pubertyXX = 0;
	}
	if (slave.balls > 0 && slave.ballType !== "sterile" && slave.physicalAge >= slave.pubertyAgeXY) {
		slave.pubertyXY = 1;
	} else {
		slave.pubertyXY = 0;
	}
};

/**
 * Apply the effects of an age lift (make them appear younger than they do currently)
 * @param {App.Entity.SlaveState} slave
 */
window.applyAgeImplant = function(slave) {
	if (slave.visualAge >= 25) {
		slave.ageImplant = 1;
		/* roughly: 25 -> 19, 35 -> 25, 50 -> 32, 80 -> 40, 130 -> 50 */
		slave.visualAge = Math.round(18.5 * Math.log(slave.visualAge) - 40);
	}
};

/**
 * Makes someone appear older than they do currently
 * @param {App.Entity.SlaveState} slave
 */
window.applyAgeImplantOlder = function(slave) {
	if (slave.visualAge < 80) {
		// doesn't currently set ageImplant
		/* roughly: 5 -> 20, 35 -> 45, 50 -> 56, 60 -> 64, 79 -> 80 */
		slave.visualAge = Math.round(0.8 * slave.visualAge + 16);
	}
};
