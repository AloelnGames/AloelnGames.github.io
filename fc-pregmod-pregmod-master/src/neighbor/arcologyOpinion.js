window.arcologyOpinion = function(activeArcology, targetArcology) {
	if (typeof activeArcology.FSNull === "undefined") { activeArcology.FSNull = "unset"; }
	if (typeof targetArcology.FSNull === "undefined") { targetArcology.FSNull = "unset"; }

	let opinion = 0;

	if (activeArcology.FSSubjugationist !== "unset") {
		if (targetArcology.FSSubjugationist !== "unset") {
			if (targetArcology.FSSubjugationistRace === activeArcology.FSSubjugationistRace) {
				opinion += activeArcology.FSSubjugationist;
				opinion += targetArcology.FSSubjugationist;
			} else {
				opinion -= activeArcology.FSSubjugationist;
				opinion -= targetArcology.FSSubjugationist;
			}
		} else if (targetArcology.FSSupremacist !== "unset") {
			if (targetArcology.FSSupremacistRace === activeArcology.FSSubjugationistRace) {
				opinion -= activeArcology.FSSubjugationist;
				opinion -= targetArcology.FSSupremacist;
			}
		}
	}
	if (activeArcology.FSSupremacist !== "unset") {
		if (targetArcology.FSSupremacist !== "unset") {
			if (targetArcology.FSSupremacistRace === activeArcology.FSSupremacistRace) {
				opinion += activeArcology.FSSupremacist;
				opinion += targetArcology.FSSupremacist;
			} else {
				opinion -= activeArcology.FSSupremacist;
				opinion -= targetArcology.FSSupremacist;
			}
		} else if (targetArcology.FSSubjugationist !== "unset") {
			if (targetArcology.FSSubjugationistRace === activeArcology.FSSupremacistRace) {
				opinion -= activeArcology.FSSupremacist;
				opinion -= targetArcology.FSSubjugationist;
			}
		}
	}
	if (activeArcology.FSRepopulationFocus !== "unset") {
		if (targetArcology.FSRepopulationFocus !== "unset") {
			opinion += activeArcology.FSRepopulationFocus;
			opinion += targetArcology.FSRepopulationFocus;
		} else if (targetArcology.FSRestart !== "unset") {
			opinion -= activeArcology.FSRepopulationFocus;
			opinion -= targetArcology.FSRestart;
		}
	} else if (activeArcology.FSRestart !== "unset") {
		if (targetArcology.FSRestart !== "unset") {
			opinion += activeArcology.FSRestart;
			opinion += targetArcology.FSRestart;
		} else if (targetArcology.FSRepopulationFocus !== "unset") {
			opinion -= activeArcology.FSRestart;
			opinion -= targetArcology.FSRepopulationFocus;
		}
	}
	if (activeArcology.FSGenderRadicalist !== "unset") {
		if (targetArcology.FSGenderRadicalist !== "unset") {
			opinion += activeArcology.FSGenderRadicalist;
			opinion += targetArcology.FSGenderRadicalist;
		} else if (targetArcology.FSGenderFundamentalist !== "unset") {
			opinion -= activeArcology.FSGenderRadicalist;
			opinion -= targetArcology.FSGenderFundamentalist;
		}
	} else if (activeArcology.FSGenderFundamentalist !== "unset") {
		if (targetArcology.FSGenderFundamentalist !== "unset") {
			opinion += activeArcology.FSGenderFundamentalist;
			opinion += targetArcology.FSGenderFundamentalist;
		} else if (targetArcology.FSGenderRadicalist !== "unset") {
			opinion -= activeArcology.FSGenderFundamentalist;
			opinion -= targetArcology.FSGenderRadicalist;
		}
	}
	if (activeArcology.FSPaternalist !== "unset") {
		if (targetArcology.FSPaternalist !== "unset") {
			opinion += activeArcology.FSPaternalist;
			opinion += targetArcology.FSPaternalist;
		} else if (targetArcology.FSDegradationist !== "unset") {
			opinion -= activeArcology.FSPaternalist;
			opinion -= targetArcology.FSDegradationist;
		}
	} else if (activeArcology.FSDegradationist !== "unset") {
		if (targetArcology.FSDegradationist !== "unset") {
			opinion += activeArcology.FSDegradationist;
			opinion += targetArcology.FSDegradationist;
		} else if (targetArcology.FSPaternalist !== "unset") {
			opinion -= activeArcology.FSDegradationist;
			opinion -= targetArcology.FSPaternalist;
		}
	}
	if (activeArcology.FSBodyPurist !== "unset") {
		if (targetArcology.FSBodyPurist !== "unset") {
			opinion += activeArcology.FSBodyPurist;
			opinion += targetArcology.FSBodyPurist;
		} else if (targetArcology.FSTransformationFetishist !== "unset") {
			opinion -= activeArcology.FSBodyPurist;
			opinion -= targetArcology.FSTransformationFetishist;
		}
	} else if (activeArcology.FSTransformationFetishist !== "unset") {
		if (targetArcology.FSTransformationFetishist !== "unset") {
			opinion += activeArcology.FSTransformationFetishist;
			opinion += targetArcology.FSTransformationFetishist;
		} else if (targetArcology.FSBodyPurist !== "unset") {
			opinion -= activeArcology.FSTransformationFetishist;
			opinion -= targetArcology.FSBodyPurist;
		}
	}
	if (activeArcology.FSYouthPreferentialist !== "unset") {
		if (targetArcology.FSYouthPreferentialist !== "unset") {
			opinion += activeArcology.FSYouthPreferentialist;
			opinion += targetArcology.FSYouthPreferentialist;
		} else if (targetArcology.FSMaturityPreferentialist !== "unset") {
			opinion -= activeArcology.FSYouthPreferentialist;
			opinion -= targetArcology.FSMaturityPreferentialist;
		}
	} else if (activeArcology.FSMaturityPreferentialist !== "unset") {
		if (targetArcology.FSMaturityPreferentialist !== "unset") {
			opinion += activeArcology.FSMaturityPreferentialist;
			opinion += targetArcology.FSMaturityPreferentialist;
		} else if (targetArcology.FSYouthPreferentialist !== "unset") {
			opinion -= activeArcology.FSMaturityPreferentialist;
			opinion -= targetArcology.FSYouthPreferentialist;
		}
	}
	if (activeArcology.FSSlimnessEnthusiast !== "unset") {
		if (targetArcology.FSSlimnessEnthusiast !== "unset") {
			opinion += activeArcology.FSSlimnessEnthusiast;
			opinion += targetArcology.FSSlimnessEnthusiast;
		} else if (targetArcology.FSAssetExpansionist !== "unset") {
			opinion -= activeArcology.FSSlimnessEnthusiast;
			opinion -= targetArcology.FSAssetExpansionist;
		}
	} else if (activeArcology.FSAssetExpansionist !== "unset") {
		if (targetArcology.FSAssetExpansionist !== "unset") {
			opinion += activeArcology.FSAssetExpansionist;
			opinion += targetArcology.FSAssetExpansionist;
		} else if (targetArcology.FSSlimnessEnthusiast !== "unset") {
			opinion -= activeArcology.FSAssetExpansionist;
			opinion -= targetArcology.FSSlimnessEnthusiast;
		}
	}
	if (activeArcology.FSPastoralist !== "unset") {
		if (targetArcology.FSPastoralist !== "unset") {
			opinion += activeArcology.FSPastoralist;
			opinion += targetArcology.FSPastoralist;
		} else if (targetArcology.FSCummunism !== "unset") {
			opinion -= activeArcology.FSPastoralist;
			opinion -= targetArcology.FSCummunism;
		}
	} else if (activeArcology.FSCummunism !== "unset") {
		if (targetArcology.FSCummunism !== "unset") {
			opinion += activeArcology.FSCummunism;
			opinion += targetArcology.FSCummunism;
		} else if (targetArcology.FSPastoralist !== "unset") {
			opinion -= activeArcology.FSCummunism;
			opinion -= targetArcology.FSPastoralist;
		}
	}
	if (activeArcology.FSPhysicalIdealist !== "unset") {
		if (targetArcology.FSPhysicalIdealist !== "unset") {
			opinion += activeArcology.FSPhysicalIdealist;
			opinion += targetArcology.FSPhysicalIdealist;
		} else if (targetArcology.FSHedonisticDecadence !== "unset") {
			opinion -= activeArcology.FSPhysicalIdealist;
			opinion -= targetArcology.FSHedonisticDecadence;
		}
	} else if (activeArcology.FSHedonisticDecadence !== "unset") {
		if (targetArcology.FSHedonisticDecadence !== "unset") {
			opinion += activeArcology.FSHedonisticDecadence;
			opinion += targetArcology.FSHedonisticDecadence;
		} else if (targetArcology.FSPhysicalIdealist !== "unset") {
			opinion -= activeArcology.FSHedonisticDecadence;
			opinion -= targetArcology.FSPhysicalIdealist;
		}
	}
	if (activeArcology.FSIntellectualDependency !== "unset") {
		if (targetArcology.FSIntellectualDependency !== "unset") {
			opinion += activeArcology.FSIntellectualDependency;
			opinion += targetArcology.FSIntellectualDependency;
		} else if (targetArcology.FSSlaveProfessionalism !== "unset") {
			opinion -= activeArcology.FSIntellectualDependency;
			opinion -= targetArcology.FSSlaveProfessionalism;
		}
	} else if (activeArcology.FSSlaveProfessionalism !== "unset") {
		if (targetArcology.FSSlaveProfessionalism !== "unset") {
			opinion += activeArcology.FSSlaveProfessionalism;
			opinion += targetArcology.FSSlaveProfessionalism;
		} else if (targetArcology.FSIntellectualDependency !== "unset") {
			opinion -= activeArcology.FSSlaveProfessionalism;
			opinion -= targetArcology.FSIntellectualDependency;
		}
	}
	if (activeArcology.FSPetiteAdmiration !== "unset") {
		if (targetArcology.FSPetiteAdmiration !== "unset") {
			opinion += activeArcology.FSPetiteAdmiration;
			opinion += targetArcology.FSPetiteAdmiration;
		} else if (targetArcology.FSStatuesqueGlorification !== "unset") {
			opinion -= activeArcology.FSPetiteAdmiration;
			opinion -= targetArcology.FSStatuesqueGlorification;
		}
	} else if (activeArcology.FSStatuesqueGlorification !== "unset") {
		if (targetArcology.FSStatuesqueGlorification !== "unset") {
			opinion += activeArcology.FSStatuesqueGlorification;
			opinion += targetArcology.FSStatuesqueGlorification;
		} else if (targetArcology.FSPetiteAdmiration !== "unset") {
			opinion -= activeArcology.FSStatuesqueGlorification;
			opinion -= targetArcology.FSPetiteAdmiration;
		}
	}
	if (activeArcology.FSChattelReligionist !== "unset") {
		if (targetArcology.FSChattelReligionist !== "unset") {
			opinion += activeArcology.FSChattelReligionist;
			opinion += targetArcology.FSChattelReligionist;
		} else if (targetArcology.FSNull !== "unset") {
			opinion -= activeArcology.FSChattelReligionist;
			opinion -= targetArcology.FSNull;
		}
	} else if (activeArcology.FSNull !== "unset") {
		if (targetArcology.FSNull !== "unset") {
			opinion += activeArcology.FSNull;
			opinion += targetArcology.FSNull;
		} else if (targetArcology.FSChattelReligionist !== "unset") {
			opinion -= activeArcology.FSNull;
			opinion -= targetArcology.FSChattelReligionist;
		} else {
			opinion += activeArcology.FSNull;
		}
	} else if (targetArcology.FSNull !== "unset") {
		opinion += targetArcology.FSNull;
	}
	if (activeArcology.FSRomanRevivalist !== "unset") {
		if (targetArcology.FSRomanRevivalist !== "unset") {
			opinion += activeArcology.FSRomanRevivalist;
			opinion += targetArcology.FSRomanRevivalist;
		} else if (targetArcology.FSAztecRevivalist !== "unset") {
			opinion -= activeArcology.FSRomanRevivalist;
			opinion -= targetArcology.FSAztecRevivalist;
		} else if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion -= activeArcology.FSRomanRevivalist;
			opinion -= targetArcology.FSEgyptianRevivalist;
		} else if (targetArcology.FSEdoRevivalist !== "unset") {
			opinion -= activeArcology.FSRomanRevivalist;
			opinion -= targetArcology.FSEdoRevivalist;
		} else if (targetArcology.FSArabianRevivalist !== "unset") {
			opinion -= activeArcology.FSRomanRevivalist;
			opinion -= targetArcology.FSArabianRevivalist;
		} else if (targetArcology.FSChineseRevivalist !== "unset") {
			opinion -= activeArcology.FSRomanRevivalist;
			opinion -= targetArcology.FSChineseRevivalist;
		}
	} else if (activeArcology.FSAztecRevivalist !== "unset") {
		if (targetArcology.FSAztecRevivalist !== "unset") {
			opinion += activeArcology.FSAztecRevivalist;
			opinion += targetArcology.FSAztecRevivalist;
		} else if (targetArcology.FSRomanRevivalist !== "unset") {
			opinion -= activeArcology.FSAztecRevivalist;
			opinion -= targetArcology.FSRomanRevivalist;
		} else if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion -= activeArcology.FSAztecRevivalist;
			opinion -= targetArcology.FSEgyptianRevivalist;
		} else if (targetArcology.FSEdoRevivalist !== "unset") {
			opinion -= activeArcology.FSAztecRevivalist;
			opinion -= targetArcology.FSEdoRevivalist;
		} else if (targetArcology.FSArabianRevivalist !== "unset") {
			opinion -= activeArcology.FSAztecRevivalist;
			opinion -= targetArcology.FSArabianRevivalist;
		} else if (targetArcology.FSChineseRevivalist !== "unset") {
			opinion -= activeArcology.FSAztecRevivalist;
			opinion -= targetArcology.FSChineseRevivalist;
		}
	} else if (activeArcology.FSEgyptianRevivalist !== "unset") {
		if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion += activeArcology.FSEgyptianRevivalist;
			opinion += targetArcology.FSEgyptianRevivalist;
		} else if (targetArcology.FSRomanRevivalist !== "unset") {
			opinion -= activeArcology.FSEgyptianRevivalist;
			opinion -= targetArcology.FSRomanRevivalist;
		} else if (targetArcology.FSAztecRevivalist !== "unset") {
			opinion -= activeArcology.FSEgyptianRevivalist;
			opinion -= targetArcology.FSAztecRevivalist;
		} else if (targetArcology.FSEdoRevivalist !== "unset") {
			opinion -= activeArcology.FSEgyptianRevivalist;
			opinion -= targetArcology.FSEdoRevivalist;
		} else if (targetArcology.FSArabianRevivalist !== "unset") {
			opinion -= activeArcology.FSEgyptianRevivalist;
			opinion -= targetArcology.FSArabianRevivalist;
		} else if (targetArcology.FSChineseRevivalist !== "unset") {
			opinion -= activeArcology.FSEgyptianRevivalist;
			opinion -= targetArcology.FSChineseRevivalist;
		}
		if (targetArcology.FSIncestFetishist !== "unset") {
			opinion += activeArcology.FSEgyptianRevivalist;
			opinion += targetArcology.FSIncestFetishist;
		}
	} else if (activeArcology.FSEdoRevivalist !== "unset") {
		if (targetArcology.FSEdoRevivalist !== "unset") {
			opinion += activeArcology.FSEdoRevivalist;
			opinion += targetArcology.FSEdoRevivalist;
		} else if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion -= activeArcology.FSEdoRevivalist;
			opinion -= targetArcology.FSEgyptianRevivalist;
		} else if (targetArcology.FSRomanRevivalist !== "unset") {
			opinion -= activeArcology.FSEdoRevivalist;
			opinion -= targetArcology.FSRomanRevivalist;
		} else if (targetArcology.FSAztecRevivalist !== "unset") {
			opinion -= activeArcology.FSEdoRevivalist;
			opinion -= targetArcology.FSAztecRevivalist;
		} else if (targetArcology.FSArabianRevivalist !== "unset") {
			opinion -= activeArcology.FSEdoRevivalist;
			opinion -= targetArcology.FSArabianRevivalist;
		} else if (targetArcology.FSChineseRevivalist !== "unset") {
			opinion -= activeArcology.FSEdoRevivalist;
			opinion -= targetArcology.FSChineseRevivalist;
		}
	} else if (activeArcology.FSArabianRevivalist !== "unset") {
		if (targetArcology.FSArabianRevivalist !== "unset") {
			opinion += activeArcology.FSArabianRevivalist;
			opinion += targetArcology.FSArabianRevivalist;
		} else if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion -= activeArcology.FSArabianRevivalist;
			opinion -= targetArcology.FSEgyptianRevivalist;
		} else if (targetArcology.FSEdoRevivalist !== "unset") {
			opinion -= activeArcology.FSArabianRevivalist;
			opinion -= targetArcology.FSEdoRevivalist;
		} else if (targetArcology.FSRomanRevivalist !== "unset") {
			opinion -= activeArcology.FSArabianRevivalist;
			opinion -= targetArcology.FSRomanRevivalist;
		} else if (targetArcology.FSAztecRevivalist !== "unset") {
			opinion -= activeArcology.FSArabianRevivalist;
			opinion -= targetArcology.FSAztecRevivalist;
		} else if (targetArcology.FSChineseRevivalist !== "unset") {
			opinion -= activeArcology.FSArabianRevivalist;
			opinion -= targetArcology.FSChineseRevivalist;
		}
	} else if (activeArcology.FSChineseRevivalist !== "unset") {
		if (targetArcology.FSChineseRevivalist !== "unset") {
			opinion += activeArcology.FSChineseRevivalist;
			opinion += targetArcology.FSChineseRevivalist;
		} else if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion -= activeArcology.FSChineseRevivalist;
			opinion -= targetArcology.FSEgyptianRevivalist;
		} else if (targetArcology.FSEdoRevivalist !== "unset") {
			opinion -= activeArcology.FSChineseRevivalist;
			opinion -= targetArcology.FSEdoRevivalist;
		} else if (targetArcology.FSArabianRevivalist !== "unset") {
			opinion -= activeArcology.FSChineseRevivalist;
			opinion -= targetArcology.FSArabianRevivalist;
		} else if (targetArcology.FSRomanRevivalist !== "unset") {
			opinion -= activeArcology.FSChineseRevivalist;
			opinion -= targetArcology.FSRomanRevivalist;
		} else if (targetArcology.FSAztecRevivalist !== "unset") {
			opinion -= activeArcology.FSChineseRevivalist;
			opinion -= targetArcology.FSAztecRevivalist;
		}
	}
	if (activeArcology.FSIncestFetishist !== "unset") {
		if (targetArcology.FSIncestFetishist !== "unset") {
			opinion += activeArcology.FSIncestFetishist;
			opinion += targetArcology.FSIncestFetishist;
		}
		if (targetArcology.FSEgyptianRevivalist !== "unset") {
			opinion += activeArcology.FSIncestFetishist;
			opinion += targetArcology.FSEgyptianRevivalist;
		}
	}

	return opinion = Number(opinion) || 0;
};
