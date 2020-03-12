window.basePlayer = function basePlayer() {
	return new App.Entity.PlayerState();
};

/**
 * Helper function returning PC's title
 * @returns {string}
 */
window.properTitle = function properTitle() {
	const PC = State.variables.PC;
	if (PC.customTitle) {
		return PC.customTitle;
	} else if (PC.title !== 0) {
		return "Sir";
	} else {
		return "Ma'am";
	}
};

/**
 * Helper function returning slave's title for PC in situations where WrittenMaster() is inappropriate
 * @returns {string}
 */
window.properMaster = function properMaster() {
	const PC = State.variables.PC;
	if (PC.customTitle) {
		return PC.customTitle;
	} else if (PC.title !== 0) {
		return "Master";
	} else {
		return "Mistress";
	}
};

window.PlayerName = function PlayerName() {
	const names = V.PC.slaveSurname ? [V.PC.slaveName, V.PC.slaveSurname] : [V.PC.slaveName];
	if ((V.surnameOrder !== 1 && ["Cambodian", "Chinese", "Hungarian", "Japanese", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(V.PC.nationality)) || (V.surnameOrder === 2)) {
		names.reverse();
	}
	return names.join(" ");
};

window.PCTitle = function PCTitle() {
	const titles = [];

	V.PCTitle = PlayerName();

	if (V.cheater === 1) {
		V.PCTitle = (`${V.PCTitle} the Cheater`);
	} else if (V.arcologies[0].FSRestart > 10) {
		V.PCTitle = (`${V.PCTitle} of the Societal Elite`);
	} else if (V.rep > 18000) {
		V.PCTitle = (`${V.PCTitle} the Great`);
	} else if (V.rep > 17000) {
		V.PCTitle = (`the exalted ${V.PCTitle}`);
	} else if (V.rep > 16000) {
		V.PCTitle = (`the illustrious ${V.PCTitle}`);
	} else if (V.rep > 15000) {
		V.PCTitle = (`the prestigious ${V.PCTitle}`);
	} else if (V.rep > 14000) {
		V.PCTitle = (`the renowned ${V.PCTitle}`);
	} else if (V.rep > 13000) {
		V.PCTitle = (`the famed ${V.PCTitle}`);
	} else if (V.rep > 12000) {
		V.PCTitle = (`the celebrated ${V.PCTitle}`);
	} else if (V.rep > 11000) {
		V.PCTitle = (`the honored ${V.PCTitle}`);
	} else if (V.rep > 10000) {
		V.PCTitle = (`the acclaimed ${V.PCTitle}`);
	} else if (V.rep > 9000) {
		V.PCTitle = (`the eminent ${V.PCTitle}`);
	} else if (V.rep > 8250) {
		V.PCTitle = (`the prominent ${V.PCTitle}`);
	} else if (V.rep > 7500) {
		V.PCTitle = (`the distinguished ${V.PCTitle}`);
	} else if (V.rep > 6750) {
		V.PCTitle = (`the admired ${V.PCTitle}`);
	} else if (V.rep > 6000) {
		V.PCTitle = (`the esteemed ${V.PCTitle}`);
	} else if (V.rep > 5250) {
		V.PCTitle = (`the respected ${V.PCTitle}`);
	} else if (V.rep > 4500) {
		V.PCTitle = (`the known ${V.PCTitle}`);
	} else if (V.rep > 3750) {
		V.PCTitle = (`the recognized ${V.PCTitle}`);
	} else if (V.rep > 3000) {
		V.PCTitle = (`the rumored ${V.PCTitle}`);
	}

	V.PCTitle = (`${V.PCTitle}, `);

	if (V.PC.name === "FC Dev") {
		titles.push("the Creator");
	}

	if (V.plot === 1) {
		if (V.invasionVictory === 3) {
			if (V.PC.title === 1) {
				titles.push("Hero of the City");
			} else {
				titles.push("Heroine of the City");
			}
		} else if (V.invasionVictory === 2) {
			titles.push("Defender of the City");
		}
		if (V.daughtersVictory === 3) {
			titles.push("Destroyer of the Daughters");
		} else if (V.daughtersVictory === 2) {
			if (V.PC.title === 1) {
				titles.push("Victor over the Daughters");
			} else {
				titles.push("Victrix over the Daughters");
			}
		}
	}

	if (V.SF.Toggle && V.SF.FS.Tension > 100) {
		switch (V.SF.FS.BadOutcome) {
			case 'MIGRATION':
				titles.push("The Abandoned");
				break;
			case 'Revolt':
				titles.push("The Betrayed");
				break;
			case 'ANNIHILATION':
				titles.push("The Runner");
				break;
			case 'OCCUPATION':
				titles.push("The Occupied");
				break;
			case 'ASSIMILATION':
				titles.push("The Deceived");
				break;
			case 'ISOLATION':
				titles.push("The Ignored");
				break;
		}
	}

	if (V.mercenaries >= 5) {
		if (V.mercenariesTitle === "Evocati") {
			titles.push(`Princeps of the ${V.mercenariesTitle}`);
		} else if (V.mercenariesTitle === "Knights") {
			if (V.PC.title === 1) {
				titles.push(`Lord Commander of the ${V.mercenariesTitle}`);
			} else {
				titles.push(`Lady Commander of the ${V.mercenariesTitle}`);
			}
		} else if (V.mercenariesTitle === "Immortals") {
			titles.push(`Tyrant of the ${V.mercenariesTitle}`);
		} else {
			titles.push(`Commander of the ${V.mercenariesTitle}`);
		}
	} else if (V.mercenaries >= 1) {
		titles.push("Commander of the Mercenaries");
	}

	if (V.dispensary === 1) {
		if (V.PC.title === 1) {
			titles.push("Pharmacologos");
		} else {
			titles.push("Pharmacologes");
		}
	}

	if (V.arcologies[0].FSSupremacist >= V.FSLockinLevel * 0.9) {
		titles.push("Grand Champion of the Blood");
	} else if (V.arcologies[0].FSSupremacist >= V.FSLockinLevel * 0.6) {
		titles.push("Champion of the Blood");
	} else if (V.arcologies[0].FSSupremacist >= V.FSLockinLevel * 0.3) {
		titles.push("Defender of the Blood");
	}

	if (V.arcologies[0].FSSubjugationist >= V.FSLockinLevel * 0.9) {
		titles.push("Grand Overseer of the Inferior Race");
	} else if (V.arcologies[0].FSSubjugationist >= V.FSLockinLevel * 0.6) {
		titles.push("Overseer of the Inferior Race");
	} else if (V.arcologies[0].FSSubjugationist >= V.FSLockinLevel * 0.3) {
		titles.push("Subduer of the Inferior Race");
	}

	if (V.arcologies[0].FSGenderRadicalist >= V.FSLockinLevel * 0.9) {
		titles.push("Buttfucker of All Slaves");
	} else if (V.arcologies[0].FSGenderRadicalist >= V.FSLockinLevel * 0.6) {
		titles.push("Sodomizer of the Traps");
	} else if (V.arcologies[0].FSGenderRadicalist >= V.FSLockinLevel * 0.3) {
		if (V.PC.title === 1) {
			titles.push("Penetrator of the Sissies");
		} else {
			titles.push("Penetratrix of the Sissies");
		}
	}

	if (V.arcologies[0].FSGenderFundamentalist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("Father to the City");
		} else {
			titles.push("Mother to the City");
		}
	} else if (V.arcologies[0].FSGenderFundamentalist >= V.FSLockinLevel * 0.6) {
		titles.push("Defender of Women");
	} else if (V.arcologies[0].FSGenderFundamentalist >= V.FSLockinLevel * 0.3) {
		titles.push("Restorer of Morals");
	}

	if (V.arcologies[0].FSPaternalist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("Protector to All Slaves");
		} else {
			titles.push("Protectrix to All Slaves");
		}
	} else if (V.arcologies[0].FSPaternalist >= V.FSLockinLevel * 0.6) {
		if (V.PC.title === 1) {
			titles.push("Benefactor of Slaves");
		} else {
			titles.push("Benefactrix of Slaves");
		}
	} else if (V.arcologies[0].FSPaternalist >= V.FSLockinLevel * 0.3) {
		titles.push("Pursuer of Justice");
	}

	if (V.arcologies[0].FSRepopulationFocus >= V.FSLockinLevel * 0.9) {
		titles.push("the Savior of the Future");
	} else if (V.arcologies[0].FSRepopulationFocus >= V.FSLockinLevel * 0.6) {
		titles.push("the Holder of the Future");
	} else if (V.arcologies[0].FSRepopulationFocus >= V.FSLockinLevel * 0.3) {
		titles.push("the Repopulist");
	}

	if (V.arcologies[0].FSDegradationist >= V.FSLockinLevel * 0.9) {
		titles.push("Holder of the Rod and the Lash");
	} else if (V.arcologies[0].FSDegradationist >= V.FSLockinLevel * 0.6) {
		titles.push("Subduer of Slaves");
	} else if (V.arcologies[0].FSDegradationist >= V.FSLockinLevel * 0.3) {
		titles.push("Pursuer of Justice");
	}

	if (V.arcologies[0].FSIntellectualDependency >= V.FSLockinLevel * 0.9) {
		titles.push("Sovereign of Bimbos");
	} else if (V.arcologies[0].FSIntellectualDependency >= V.FSLockinLevel * 0.6) {
		titles.push("Shepherd of the Slow");
	} else if (V.arcologies[0].FSIntellectualDependency >= V.FSLockinLevel * 0.3) {
		titles.push("Lover of Bimbos");
	}

	if (V.arcologies[0].FSSlaveProfessionalism >= V.FSLockinLevel * 0.9) {
		titles.push("the Mastermind");
	} else if (V.arcologies[0].FSSlaveProfessionalism >= V.FSLockinLevel * 0.6) {
		titles.push("the Genius");
	} else if (V.arcologies[0].FSSlaveProfessionalism >= V.FSLockinLevel * 0.3) {
		titles.push("the Smart");
	}

	if (V.arcologies[0].FSBodyPurist >= V.FSLockinLevel * 0.9) {
		titles.push("the Purifier of the Breasts");
	} else if (V.arcologies[0].FSBodyPurist >= V.FSLockinLevel * 0.6) {
		titles.push("the Discerning");
	} else if (V.arcologies[0].FSBodyPurist >= V.FSLockinLevel * 0.3) {
		titles.push("the Tasteful");
	}

	if (V.arcologies[0].FSAssetExpansionist >= V.FSLockinLevel * 0.9) {
		titles.push("the Expander of the Breasts");
	} else if (V.arcologies[0].FSAssetExpansionist >= V.FSLockinLevel * 0.6) {
		titles.push("the Expander");
	} else if (V.arcologies[0].FSAssetExpansionist >= V.FSLockinLevel * 0.3) {
		if (V.PC.title === 1) {
			titles.push("the Implanter");
		} else {
			titles.push("the Implantrix");
		}
	}

	if (V.arcologies[0].FSStatuesqueGlorification >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("He Who Stands Above All");
		} else {
			titles.push("She Who Stands Above All");
		}
	} else if (V.arcologies[0].FSStatuesqueGlorification >= V.FSLockinLevel * 0.6) {
		titles.push("Agent of Growth");
	} else if (V.arcologies[0].FSStatuesqueGlorification >= V.FSLockinLevel * 0.3) {
		titles.push("height fetishist");
	}

	if (V.arcologies[0].FSPetiteAdmiration >= V.FSLockinLevel * 0.9) {
		titles.push("Supporter of the Small");
	} else if (V.arcologies[0].FSPetiteAdmiration >= V.FSLockinLevel * 0.6) {
		titles.push("the Size Enthusiast");
	} else if (V.arcologies[0].FSPetiteAdmiration >= V.FSLockinLevel * 0.3) {
		titles.push("height fetishist");
	}

	if (V.arcologies[0].FSPastoralist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("the Master of Stock");
		} else {
			titles.push("the Mistress of Stock");
		}
	} else if (V.arcologies[0].FSPastoralist >= V.FSLockinLevel * 0.6) {
		titles.push("the Rancher");
	} else if (V.arcologies[0].FSPastoralist >= V.FSLockinLevel * 0.3) {
		titles.push("the Farmer");
	}

	if (V.arcologies[0].FSPhysicalIdealist >= V.FSLockinLevel * 0.9) {
		titles.push("beloved of Brodin");
	} else if (V.arcologies[0].FSPhysicalIdealist >= V.FSLockinLevel * 0.6) {
		if (V.PC.title === 1) {
			titles.push("he of the godlike Body");
		} else {
			titles.push("she of the godlike Body");
		}
	} else if (V.arcologies[0].FSPhysicalIdealist >= V.FSLockinLevel * 0.3) {
		titles.push("advancer of Gains");
	}

	if (V.arcologies[0].FSHedonisticDecadence >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("Master of Softness");
		} else {
			titles.push("Lady of Softness");
		}
	} else if (V.arcologies[0].FSHedonisticDecadence >= V.FSLockinLevel * 0.6) {
		titles.push("Thickness Enthusiast");
	} else if (V.arcologies[0].FSHedonisticDecadence >= V.FSLockinLevel * 0.3) {
		titles.push("the Feeder");
	}

	if (V.arcologies[0].FSMaturityPreferentialist >= V.FSLockinLevel * 0.9) {
		titles.push("Grand Preserver of MILFS");
	} else if (V.arcologies[0].FSMaturityPreferentialist >= V.FSLockinLevel * 0.6) {
		titles.push("Fucker of MILFS");
	} else if (V.arcologies[0].FSMaturityPreferentialist >= V.FSLockinLevel * 0.3) {
		if (V.PC.title === 1) {
			titles.push("he of the notorious MILF preference");
		} else {
			titles.push("she of the notorious MILF preference");
		}
	}

	if (V.arcologies[0].FSYouthPreferentialist >= V.FSLockinLevel * 0.9) {
		titles.push("Keeper of the Magnificent Young Harem");
	} else if (V.arcologies[0].FSYouthPreferentialist >= V.FSLockinLevel * 0.6) {
		titles.push("Keeper of Virgins");
	} else if (V.arcologies[0].FSYouthPreferentialist >= V.FSLockinLevel * 0.3) {
		titles.push("the Virginbreaker");
	}

	if (V.arcologies[0].FSChattelReligionistLaw === 1) {
		titles.push("the Prophet");
	} else if (V.arcologies[0].FSChattelReligionist >= V.FSLockinLevel * 0.9) {
		titles.push("Keeper of the Blade and Chalice");
	} else if (V.arcologies[0].FSChattelReligionist >= V.FSLockinLevel * 0.6) {
		titles.push("Champion of the Faith");
	} else if (V.arcologies[0].FSChattelReligionist >= V.FSLockinLevel * 0.3) {
		titles.push("the Holy");
	}

	if (V.arcologies[0].FSRomanRevivalist >= V.FSLockinLevel * 0.9) {
		titles.push("First Consul");
	} else if (V.arcologies[0].FSRomanRevivalist >= V.FSLockinLevel * 0.6) {
		titles.push("Aedile");
	} else if (V.arcologies[0].FSRomanRevivalist >= V.FSLockinLevel * 0.3) {
		titles.push("Quaestor");
	}

	if (V.arcologies[0].FSAztecRevivalist >= V.FSLockinLevel * 0.9) {
		titles.push("Tlatcani");
	} else if (V.arcologies[0].FSAztecRevivalist >= V.FSLockinLevel * 0.6) {
		titles.push("Cihuacoatl");
	} else if (V.arcologies[0].FSAztecRevivalist >= V.FSLockinLevel * 0.3) {
		titles.push("Tlatoani");
	}

	if (V.arcologies[0].FSEgyptianRevivalist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("the Living God");
		} else {
			titles.push("the Living Goddess");
		}
	} else if (V.arcologies[0].FSEgyptianRevivalist >= V.FSLockinLevel * 0.6) {
		titles.push("Pharaoh");
	} else if (V.arcologies[0].FSEgyptianRevivalist >= V.FSLockinLevel * 0.3) {
		if (V.PC.title === 1) {
			titles.push("Prince of the Nile");
		} else {
			titles.push("Princess of the Nile");
		}
	}

	if (V.arcologies[0].FSEdoRevivalist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("Emperor and Descendant of Amaterasu");
		} else {
			titles.push("Amaterasu Reborn");
		}
	} else if (V.arcologies[0].FSEdoRevivalist >= V.FSLockinLevel * 0.6) {
		titles.push("Shogun");
	} else if (V.arcologies[0].FSEdoRevivalist >= V.FSLockinLevel * 0.3) {
		titles.push("Daimyo");
	}

	if (V.arcologies[0].FSArabianRevivalist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("Caliph");
		} else {
			titles.push("Handmaiden of Allah");
		}
	} else if (V.arcologies[0].FSArabianRevivalist >= V.FSLockinLevel * 0.6) {
		if (V.PC.title === 1) {
			titles.push("Sultan");
		} else {
			titles.push("Sultana");
		}
	} else if (V.arcologies[0].FSArabianRevivalist >= V.FSLockinLevel * 0.3) {
		titles.push("Beloved of Allah");
	}

	if (V.arcologies[0].FSChineseRevivalist >= V.FSLockinLevel * 0.9) {
		if (V.PC.title === 1) {
			titles.push("Emperor and Holder of the Mandate of Heaven");
		} else {
			titles.push("Empress and Holder of the Mandate of Heaven");
		}
	} else if (V.arcologies[0].FSChineseRevivalist >= V.FSLockinLevel * 0.6) {
		if (V.PC.title === 1) {
			titles.push("Emperor");
		} else {
			titles.push("Empress");
		}
	} else if (V.arcologies[0].FSChineseRevivalist >= V.FSLockinLevel * 0.3) {
		if (V.PC.title === 1) {
			titles.push("Governor of the Province");
		} else {
			titles.push("Governess of the Province");
		}
	}

	if (V.BrothiIDs.length >= 15) {
		if (V.PC.title === 1) {
			titles.push("Procurator of the Brothel");
		} else {
			titles.push("Procuratrix of the Brothel");
		}
	}

	if (V.ClubiIDs.length >= 15) {
		titles.push("First on the Club");
	}
	if (V.DairyiIDs.length >= 15) {
		titles.push("Keeper of the Cattle");
	}
	if (V.cumSlaves >= 15) {
		if (V.PC.title === 1) {
			titles.push("Extractor of the Ejaculate");
		} else {
			titles.push("Extractrix of the Ejaculate");
		}
	}
	if (V.ServQiIDs.length >= 15) {
		if (V.PC.title === 1) {
			titles.push("Director of the Servants");
		} else {
			titles.push("Directrix of the Servants");
		}
	}
	if (V.SchlRiIDs.length >= 10) {
		if (V.PC.title === 1) {
			titles.push("Educator of the Slaves");
		} else {
			titles.push("Educatrix of the Slaves");
		}
	}
	if (V.SpaiIDs.length >= 10) {
		titles.push("Order of the Bath");
	}
	if (V.ArcadeiIDs.length >= 15) {
		titles.push("Comptroller of the Arcade");
	}
	if (V.nurseryBabies >= 10) {
		titles.push("Caretaker of the Youth");
	}

	const schoolsPresent = [];
	const schoolsPerfected = [];
	let schoolTitle = "";
	if (V.TSS.schoolProsperity >= 10) {
		schoolsPerfected.push("The Slave School");
	} else if (V.TSS.schoolPresent === 1) {
		schoolsPresent.push("The Slave School");
	}
	if (V.GRI.schoolProsperity >= 10) {
		schoolsPerfected.push("The Growth Research Institute");
	} else if (V.GRI.schoolPresent === 1) {
		schoolsPresent.push("The Growth Research Institute");
	}
	if (V.SCP.schoolProsperity >= 10) {
		schoolsPerfected.push("St. Claver Preparatory");
	} else if (V.SCP.schoolPresent === 1) {
		schoolsPresent.push("St. Claver Preparatory");
	}
	if (V.LDE.schoolProsperity >= 10) {
		schoolsPerfected.push("L'École des Enculées");
	} else if (V.LDE.schoolPresent === 1) {
		schoolsPresent.push("L'École des Enculées");
	}
	if (V.TGA.schoolProsperity >= 10) {
		schoolsPerfected.push("The Gymnasium-Academy");
	} else if (V.TGA.schoolPresent === 1) {
		schoolsPresent.push("The Gymnasium-Academy");
	}
	if (V.HA.schoolProsperity >= 10) {
		schoolsPerfected.push("The Hippolyta Academy");
	} else if (V.HA.schoolPresent === 1) {
		schoolsPresent.push("The Hippolyta Academy");
	}
	if (V.TCR.schoolProsperity >= 10) {
		schoolsPerfected.push("The Cattle Ranch");
	} else if (V.TCR.schoolPresent === 1) {
		schoolsPresent.push("The Cattle Ranch");
	}
	if (V.NUL.schoolProsperity >= 10) {
		schoolsPerfected.push("Nueva Universidad de Libertad");
	} else if (V.NUL.schoolPresent === 1) {
		schoolsPresent.push("Nueva Universidad de Libertad");
	}
	if (schoolsPerfected.length > 0) {
		if (V.PC.title === 1) {
			schoolTitle = "Benefactor of ";
		} else {
			schoolTitle = "Benefactrix of ";
		}
		if (schoolsPerfected.length === 1) {
			schoolTitle += schoolsPerfected[0];
		} else if (schoolsPerfected.length === 2) {
			schoolTitle += `${schoolsPerfected[0]} and ${schoolsPerfected[1]}`;
		} else {
			schoolsPerfected[schoolsPerfected.length - 1] = `and ${schoolsPerfected[schoolsPerfected.length - 1]}`;
			schoolTitle += schoolsPerfected.join(", ");
		}
		titles.push(schoolTitle);
	}

	if (schoolsPresent.length > 0) {
		schoolTitle = "Supporter of ";
		if (schoolsPresent.length === 1) {
			schoolTitle += schoolsPresent[0];
		} else if (schoolsPresent.length === 2) {
			schoolTitle += `${schoolsPresent[0]} and ${schoolsPresent[1]}`;
		} else {
			schoolsPresent[schoolsPresent.length - 1] = `and ${schoolsPresent[schoolsPresent.length - 1]}`;
			schoolTitle += schoolsPresent.join(", ");
		}
		titles.push(schoolTitle);
	}

	if (V.TFS.schoolProsperity >= 10) {
		titles.push("Honorary Sibling of the Futanari Sisters");
	} else if (V.TFS.schoolPresent === 1) {
		if (V.PC.title === 1) {
			titles.push("Protector of the Futanari Sisters");
		} else {
			titles.push("Protectrix of the Futanari Sisters");
		}
	}

	if (V.slaves.length > 50) {
		if (V.PC.title === 1) {
			titles.push("Master of Slaves");
		} else {
			titles.push("Mistress of Slaves");
		}
	} else if (V.slaves.length > 40) {
		titles.push("Holder of Slaves");
	} else if (V.slaves.length > 30) {
		titles.push("Keeper of Slaves");
	} else if (V.slaves.length > 20) {
		titles.push("Manager of Slaves");
	} else if (V.slaves.length > 10) {
		titles.push("owner of slaves");
	}
	const corpValue = App.Corporate.value;
	if (corpValue > 500000) {
		titles.push("Corporate Titan");
	} else if (corpValue > 250000) {
		titles.push("corporate innovator");
	} else if (corpValue > 100000) {
		titles.push("corporate founder");
	} else if (corpValue > 0) {
		if (V.PC.title === 1) {
			titles.push("noted corporate businessman");
		} else {
			titles.push("noted corporate businesswoman");
		}
	}

	if (V.rep > 18000) {
		if (V.PC.title === 1) {
			titles.push("unquestioned Master of the Arcology");
		} else {
			titles.push("unquestioned Mistress of the Arcology");
		}
	} else if (V.rep > 15000) {
		if (V.PC.title === 1) {
			titles.push("Lord of the Arcology");
		} else {
			titles.push("Lady of the Arcology");
		}
	} else if (V.rep > 12000) {
		titles.push("Ruler of the Arcology");
	} else if (V.rep > 9000) {
		titles.push("chief officer of the arcology");
	} else {
		titles.push("owner of the arcology");
	}

	if (titles.length === 1) {
		V.PCTitle += titles[0];
	} else if (titles.length === 2) {
		V.PCTitle += `${titles[0]} and ${titles[1]}`;
	} else {
		titles[titles.length - 1] = `and ${titles[titles.length - 1]}`;
		V.PCTitle += titles.join(", ");
	}
};

/**
 * @param {string} input
 * @param {number} [increase=1]
 * @returns {string}
 */
window.IncreasePCSkills = function(input, increase = 1) {
	if (Array.isArray(input)) {
		return input.reduce((r, inputArray) => r + IncreasePCSkills(inputArray, increase), '');
	}
	const player = V.PC,
	oldSkill = player.skill[input];
	player.skill[input] += increase; let t = ``;

	if (oldSkill < 10 && player.skill[input] >= 10) {
	 t += `<span class="green"> \nYou have gained basic knowledge in ${input}.</span>`;
	} else if (oldSkill < 30 && player.skill[input] >= 30) {
	 t += `<span class="green"> \nYou have gained some knowledge in ${input}.</span>`;
	} else if (oldSkill < 60 && player.skill[input] >= 60) {
	 t += `<span class="green"> \nYou have become an expert in ${input}.</span>`;
	} else if (oldSkill < 100 && player.skill[input] >= 100) {
	 t += `<span class="green"> \nYou have mastered ${input}.</span>`;
	}
	return t;
};
