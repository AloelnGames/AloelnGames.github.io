window.FutureSocieties = (function() {
	"use strict";
	const FSString2Property = { // blame Hedonism and Eugenics for this
		Supremacist: "FSSupremacist",
		Subjugationist: "FSSubjugationist",
		GenderRadicalist: "FSGenderRadicalist",
		GenderFundamentalist: "FSGenderFundamentalist",
		Degradationist: "FSDegradationist",
		Paternalist: "FSPaternalist",
		BodyPurist: "FSBodyPurist",
		TransformationFetishist: "FSTransformationFetishist",
		YouthPreferentialist: "FSYouthPreferentialist",
		MaturityPreferentialist: "FSMaturityPreferentialist",
		SlimnessEnthusiast: "FSSlimnessEnthusiast",
		AssetExpansionist: "FSAssetExpansionist",
		Pastoralist: "FSPastoralist",
		PhysicalIdealist: "FSPhysicalIdealist",
		Hedonistic: "FSHedonisticDecadence",
		Hedonism: "FSHedonisticDecadence",
		ChattelReligionist: "FSChattelReligionist",
		RomanRevivalist: "FSRomanRevivalist",
		EgyptianRevivalist: "FSEgyptianRevivalist",
		EdoRevivalist: "FSEdoRevivalist",
		ArabianRevivalist: "FSArabianRevivalist",
		ChineseRevivalist: "FSChineseRevivalist",
		AztecRevivalist: "FSAztecRevivalist",
		RepopulationFocus: "FSRepopulationFocus",
		Repopulationist: "FSRepopulationFocus",
		Eugenics: "FSRestart",
		IntellectualDependency: "FSIntellectualDependency",
		SlaveProfessionalism: "FSSlaveProfessionalism",
		PetiteAdmiration: "FSPetiteAdmiration",
		StatuesqueGlorification: "FSStatuesqueGlorification"
	};
	const SocietyList = [...new Set(Object.keys(FSString2Property).map(key => FSString2Property[key]))]; // This returns an array containing the unique values of FSString2Property. E.g. "FSSupremacist" and "FSSubjugationist"
	const NPCSocietyList = [ "FSCummunism", "FSIncestFetishist" ]; // NPC arcologies may use these FSes, but the PC can't

	return {
		activeCount: activeCount,
		applyBroadProgress: applyBroadProgress,
		overflowToInfluence: overflowToInfluence,
		remove: removeFS,
		DecorationCleanup: DecorationCleanup,
		Change: FSChange,
		ChangePorn: FSChangePorn,
		HighestDecoration: FSHighestDecoration
	};

	// helper function, not callable externally
	function activeFSes(arcologyID) {
		let isSet = (fs) => V.arcologies[arcologyID][fs] !== "unset";
		const npcFSes = arcologyID !== 0 ? NPCSocietyList.filter(isSet) : [];
		return SocietyList.filter(isSet).concat(npcFSes);
	}

	// call as FutureSocieties.activeCount(arcologyID)
	function activeCount(arcologyID) {
		return activeFSes(arcologyID).length;
	}

	// call as FutureSocieties.applyBroadProgress(arcologyID, progress)
	function applyBroadProgress(arcologyID, progress) {
		for (const fs of activeFSes(arcologyID)) {
			V.arcologies[arcologyID][fs] += progress;
		}
	}

	// call as FutureSocieties.overflowToInfluence(arcologyID)
	// converts excess progress into influence bonus
	function overflowToInfluence(arcologyID) {
		const arcology = V.arcologies[arcologyID];
		for (const fs of activeFSes(arcologyID)) {
			if (arcology[fs] > V.FSLockinLevel) {
				arcology.influenceBonus += arcology[fs] - V.FSLockinLevel;
				arcology[fs] = V.FSLockinLevel;
			}
		}
	}

	// call as FutureSocieties.remove(FS)
	// FS must be a string (e.g. "FSPaternalist" or "FSDegradationist").
	function removeFS(FS) {
		const arcology = V.arcologies[0];
		const FSDecoration = `${FS}Decoration`;
		const FSSMR = `${FS}SMR`;
		let FSLaw = `${FS}Law`;
		if (arcology[FS] === undefined) {
			// eslint-disable-next-line no-console
			console.log(`ERROR: bad FS reference, $arcologies[0].${FS} not defined`);
			return;
		}

		if (FS === "FSSupremacist" || FS === "FSSubjugationist") { FSLaw += "ME"; }
		if (FS !== "FSNull") { arcology[FSDecoration] = 20; }
		arcology[FS] = "unset";
		switch (FS) {
			case "FSPaternalist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				V.slaveWatch = 0;
				break;
			case "FSDegradationist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				V.liveTargets = 0;
				break;
			case "FSGenderRadicalist":
				arcology.FSGenderRadicalistLawBeauty = 0;
				arcology.FSGenderRadicalistLawFuta = 0;
				break;
			case "FSGenderFundamentalist":
				arcology.FSGenderFundamentalistLawBeauty = 0;
				arcology.FSGenderFundamentalistLawBimbo = 0;
				arcology.FSGenderFundamentalistSMR = 0;
				break;
			case "FSSupremacist":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				V.noSubhumansInArmy = 0;
				break;
			case "FSTransformationFetishist":
			case "FSAssetExpansionist":
				arcology[FSSMR] = 0;
				break;
			case "FSPhysicalIdealist":
				arcology.FSPhysicalIdealistLaw = 0;
				arcology.FSPhysicalIdealistSMR = 0;
				arcology.FSPhysicalIdealistStrongFat = 0;
				V.martialSchool = 0;
				break;
			case "FSHedonisticDecadence":
				arcology.FSHedonisticDecadenceLaw = 0;
				arcology.FSHedonisticDecadenceLaw2 = 0;
				arcology.FSHedonisticDecadenceSMR = 0;
				arcology.FSHedonisticDecadenceStrongFat = 0;
				break;
			case "FSChattelReligionist":
				arcology.FSChattelReligionistLaw = 0;
				arcology.FSChattelReligionistSMR = 0;
				arcology.FSChattelReligionistCreed = 0;
				V.subsidyChurch = 0;
				break;
			case "FSRepopulationFocus":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				V.universalRulesChildrenBecomeBreeders = 0;
				V.pregExemption = 0;
				break;
			case "FSRestart":
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				V.eliteOfficers = 0;
				V.propOutcome = 0;
				V.failedElite = 0;
				break;
			case "FSIntellectualDependency":
				arcology.FSIntellectualDependencyLaw = 0;
				arcology.FSIntellectualDependencyLawBeauty = 0;
				arcology.FSIntellectualDependencySMR = 0;
				break;
			case "FSPetiteAdmiration":
				arcology.FSPetiteAdmirationLaw = 0;
				arcology.FSPetiteAdmirationLaw2 = 0;
				arcology.FSPetiteAdmirationSMR = 0;
				break;
			case "FSStatuesqueGlorification":
				arcology.FSStatuesqueGlorificationLaw = 0;
				arcology.FSStatuesqueGlorificationLaw2 = 0;
				arcology.FSStatuesqueGlorificationSMR = 0;
				break;
			case "FSNull":
				break;
			default: // all others have one law and one SMR
				arcology[FSLaw] = 0;
				arcology[FSSMR] = 0;
				break;
		}

		DecorationCleanup();
		resetFSCredits();
	}

	/* helper function, not callable */
	function resetFSCredits() {
		const arcology = V.arcologies[0];
		let activeFS = 0;
		for (let i = 0; i < SocietyList.length; i++) {
			if (arcology[SocietyList[i]] > 0) {
				activeFS++;
			}
		}
		if (arcology.FSNull > 0) { // multiculturalism is accounted for separately
			if (V.FSCreditCount === 4) {
				activeFS += arcology.FSNull / 25;
			} else if (V.FSCreditCount === 6) {
				activeFS += arcology.FSNull / 17;
			} else if (V.FSCreditCount === 7) {
				activeFS += arcology.FSNull / 15;
			} else {
				activeFS += arcology.FSNull / 20;
			}
		}
		V.FSCredits = Math.max(Math.trunc(V.FSGotRepCredits - activeFS), 0);
	}

	/* call as FutureSocieties.DecorationCleanup() */
	function DecorationCleanup() {
		ValidateFacilityDecoration("brothelDecoration");
		ValidateFacilityDecoration("dairyDecoration");
		ValidateFacilityDecoration("clubDecoration");
		ValidateFacilityDecoration("servantsQuartersDecoration");
		ValidateFacilityDecoration("schoolroomDecoration");
		ValidateFacilityDecoration("spaDecoration");
		ValidateFacilityDecoration("clinicDecoration");
		ValidateFacilityDecoration("arcadeDecoration");
		ValidateFacilityDecoration("cellblockDecoration");
		ValidateFacilityDecoration("masterSuiteDecoration");
		ValidateFacilityDecoration("nurseryDecoration");
		ValidateFacilityDecoration("farmyardDecoration");
	}

	/* helper function, not callable */
	/* decoration should be passed as "facilityDecoration" in quotes. For example, ValidateFacilityDecoration("brothelDecoration"). The quotes are important, do not pass it as a story variable. */
	function ValidateFacilityDecoration(decoration) {
		const FSString = V[decoration].replace(/ /g, ''); // removes spaces
		const activeFS = FSString2Property[FSString]; // gets the property name

		if (FSString === "standard") {
			// nothing to do
		} else if (activeFS === undefined) {
			// eslint-disable-next-line no-console
			console.log(`Error: $${decoration} is ${V[decoration]}`);
			V[decoration] = "standard";
		} else if (!Number.isFinite(V.arcologies[0][activeFS])) {
			if (V.arcologies[0][activeFS] !== "unset") {
				// eslint-disable-next-line no-console
				console.log(`Error: $arcologies[0].${activeFS} is ${V.arcologies[0][activeFS]}`);
			}
			V[decoration] = "standard";
		}
	}

	/* call as FutureSocieties.Change() */
	/* FSString should be in the FSString2Property object above */
	function FSChange(FSString, magnitude, bonusMultiplier = 1) {
		const arcology = V.arcologies[0];
		const activeFS = FSString2Property[FSString];

		if (activeFS === undefined) {
			return "<span class='red'>ERROR: bad FS reference</span>";
		} else if (Number.isFinite(arcology[activeFS])) {
			if (magnitude < 0) {
				repX(magnitude * V.FSSingleSlaveRep * (arcology[activeFS] / V.FSLockinLevel) / 3, 'futureSocieties'); // Reducing the reputation impact of slaves that are not adhering to societal ideals properly
			} else {
				repX(magnitude * V.FSSingleSlaveRep * (arcology[activeFS] / V.FSLockinLevel), 'futureSocieties');
			}
			arcology[activeFS] += 0.05 * magnitude * V.FSSingleSlaveRep * bonusMultiplier;
		}
	}

	/* call as FutureSocieties.ChangePorn() */
	/* FSString should be in the FSString2Property object above */
	function FSChangePorn(FSString, magnitude) {
		return FSChange(FSString, magnitude, State.variables.pornFameBonus);
	}

	/**
	 * Returns the highest decoration level of active future societies, call as FutureSocieties.HighestDecoration()
	 * @returns {number}
	 */
	function FSHighestDecoration() {
		const arcology = State.variables.arcologies[0];
		const decorationList = SocietyList.map(FS => `${FS}Decoration`);
		let level = 20; // All decorations start at 20

		for (let i = 0; i < decorationList.length; i++) {
			if (arcology[decorationList[i]] > level) {
				level = arcology[decorationList[i]];
			}
		}
		return level;
	}
})();
