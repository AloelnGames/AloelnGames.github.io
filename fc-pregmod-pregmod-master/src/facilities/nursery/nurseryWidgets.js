/* INFANTS */

/**
 * Displays a summary of the infant
 * @param {App.Entity.InfantState} child
 * @returns {string}
 */
App.Facilities.Nursery.InfantSummary = function(child) {
	"use strict";
	const
		weeksOwned = V.week - child.weekAcquired;

	let
		r = ``;

	function InfantSummaryUncached(child) {
		if (V.abbreviateHealth === 1) {
			// shortHealth(child);
		} else if (V.abbreviateHealth === 2) {
			// longHealth(child);
		}
		if (V.abbreviateNationality + V.abbreviateGenitalia + V.abbreviatePhysicals + V.abbreviateSkills + V.abbreviateMental !== 0) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
		}
		if (child.actualAge > 0) {
			if (child.actualAge > 1) {
				V.desc = `toddler`;
			} else {
				V.desc = `baby`;
			}
		} else {
			if (weeksOwned <= 1) {
				V.desc = `newborn`;
			} else {
				V.desc = `baby`;
			}
		}
		const firstLetter = V.desc.substring(0, 1).toUpperCase();
		V.desc = firstLetter + V.desc.substring(1);
		r += `<strong><span class="coral">${V.desc}${V.abbreviatePhysicals === 2? '.' : ''}</span></strong> `;
		if (V.seeRace) {
			r += `<span class="tan">`;
			if (V.abbreviateRace === 1) {
				shortRace(child);
			} else if (V.abbreviateRace === 2) {
				longRace(child);
			}
			r += `</span> `;
		}
		if (V.abbreviateNationality === 1) {
			shortNationality(child);
		} else if (V.abbreviateNationality === 2) {
			longNationality(child);
		}
		if (V.abbreviatePhysicals === 1) {
			shortSkin(child);
		} else {
			r += `<span class="pink">${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)} skin.</span> `;
		}
		if (V.abbreviatePhysicals === 1) {
			shortAge(child);
			shortFace(child);
			shortEyes(child);
			r += `</span> `;
		} else if (V.abbreviatePhysicals === 2) {
			longAge(child);
			longFace(child);
			longEyes(child);
			r += `</span> `;
		}
		r += `<br>`;
		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += "&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		if (V.abbreviateSkills === 1) {
			shortIntelligence(child);
			shortPrestige(child);
			shortPornPrestige(child);
		} else if (V.abbreviateSkills === 2) {
			longIntelligence(child);
			longPrestige(child);
			longPornPrestige(child);
		}
		if (V.abbreviateMental === 1) {
			shortBehaviorFlaw(child);
			shortSexFlaw(child);
		} else if (V.abbreviateMental === 2) {
			longBehaviorFlaw(child);
			longSexFlaw(child);
		}
		if ((child.relationship !== 0) || (child.relation !== 0) || (V.abbreviateClothes === 2) || (V.abbreviateRulesets === 2)) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			}
		}
		if (V.abbreviateMental === 1) {
			r += `<span class="lightgreen">`;
			shortExtendedFamily(child);
			r += `</span> `;
			shortRival(child);
		} else if (V.abbreviateMental === 2) {
			longExtendedFamily(child);
			longRival(child);
		}
		r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		if (V.abbreviateOrigins === 2 && child.origin !== 0) {
			origins(child);
		}
		return r;
	}

	// /**	TODO: add health to infants
	//  * @param {App.Entity.SlaveState} child
	//  */
	// function shortHealth(child) {
	// 	if (child.health.condition < -20) {
	// 		r += `<strong><span class="red">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
	// 	} else if (child.health.condition <= 20) {
	// 		r += `<strong><span class="yellow">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
	// 	} else if (child.health.condition > 20) {
	// 		r += `<strong><span class="green">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
	// 	}
	// 	r += " ";
	// }

	// /**
	//  * @param {App.Entity.SlaveState} child
	//  */
	// function longHealth(child) {
	// 	if (child.health.condition < -90) {
	// 		r += `<span class="red">On the edge of death ${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition < -50) {
	// 		r += `<span class="red">Extremely unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition < -20) {
	// 		r += `<span class="red">Unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition <= 20) {
	// 		r += `<span class="yellow">Healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition <= 50) {
	// 		r += `<span class="green">Very healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition <= 90) {
	// 		r += `<span class="green">Extremely healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else {
	// 		r += `<span class="green">Unnaturally healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	}
	// 	r += " ";
	// }

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRace(child) {
		switch (child.race) {
			case "white":
				r += `C`;
				break;
			case "asian":
				r += `A`;
				break;
			case "indo-aryan":
				r += `I`;
				break;
			case "latina":
				r += `L`;
				break;
			case "middle eastern":
				r += `ME`;
				break;
			case "black":
				r += `B`;
				break;
			case "pacific islander":
				r += `PI`;
				break;
			case "malay":
				r += `M`;
				break;
			case "amerindian":
				r += `AI`;
				break;
			case "semitic":
				r += `S`;
				break;
			case "southern european":
				r += `SE`;
				break;
			case "mixed race":
				r += `MR`;
				break;
			default:
				r += `${child.race.charAt(0).toUpperCase() + child.race.charAt(1) + child.race.charAt(2)}`;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRace(child) {
		switch (child.race) {
			case "white":
				r += `Caucasian. `;
				break;
			case "asian":
				r += `Asian. `;
				break;
			case "indo-aryan":
				r += `Indo-aryan. `;
				break;
			case "latina":
				r += `Latina. `;
				break;
			case "middle eastern":
				r += `Middle Eastern. `;
				break;
			case "black":
				r += `Black. `;
				break;
			case "pacific islander":
				r += `Pacific Islander. `;
				break;
			case "malay":
				r += `Malay. `;
				break;
			case "amerindian":
				r += `Amerindian. `;
				break;
			case "semitic":
				r += `Semitic. `;
				break;
			case "southern european":
				r += `Southern European. `;
				break;
			case "mixed race":
				r += `Mixed race. `;
				break;
			default:
				r += `${child.race.charAt(0).toUpperCase() + child.race.slice(1)}. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortNationality(child) {
		r += `<span class="tan">`;
		switch (child.nationality) {
			case "Afghan":
				r += `Afg`;
				break;
			case "Albanian":
				r += `Alb`;
				break;
			case "Algerian":
				r += `Alg`;
				break;
			case "American":
				r += `USA`;
				break;
			case "Andorran":
				r += `And`;
				break;
			case "Angolan":
				r += `Ang`;
				break;
			case "Antiguan":
				r += `AB`;
				break;
			case "Argentinian":
				r += `Arg`;
				break;
			case "Armenian":
				r += `Arm`;
				break;
			case "Aruban":
				r += `Aru`;
				break;
			case "Australian":
				r += `Aus`;
				break;
			case "Austrian":
				r += `Aut`;
				break;
			case "Azerbaijani":
				r += `Aze`;
				break;
			case "Bahamian":
				r += `Bah`;
				break;
			case "Bahraini":
				r += `Bah`;
				break;
			case "Bangladeshi":
				r += `Bgd`;
				break;
			case "Barbadian":
				r += `Bar`;
				break;
			case "Belarusian":
				r += `Ber`;
				break;
			case "Belgian":
				r += `Bel`;
				break;
			case "Belizean":
				r += `Blz`;
				break;
			case "Beninese":
				r += `Ben`;
				break;
			case "Bermudian":
				r += `Bmd`;
				break;
			case "Bhutanese":
				r += `Bhu`;
				break;
			case "Bissau-Guinean":
				r += `GB`;
				break;
			case "Bolivian":
				r += `Bol`;
				break;
			case "Bosnian":
				r += `Bos`;
				break;
			case "Brazilian":
				r += `Bra`;
				break;
			case "British":
				r += `UK`;
				break;
			case "Bruneian":
				r += `Bru`;
				break;
			case "Bulgarian":
				r += `Bul`;
				break;
			case "Burkinabé":
				r += `BF`;
				break;
			case "Burmese":
				r += `Bur`;
				break;
			case "Burundian":
				r += `Bnd`;
				break;
			case "Cambodian":
				r += `Kam`;
				break;
			case "Cameroonian":
				r += `Cam`;
				break;
			case "Canadian":
				r += `Can`;
				break;
			case "Cape Verdean":
				r += `CV`;
				break;
			case "Catalan":
				r += `Cat`;
				break;
			case "Central African":
				r += `CAR`;
				break;
			case "Chadian":
				r += `Cha`;
				break;
			case "Chilean":
				r += `Chl`;
				break;
			case "Chinese":
				r += `Chi`;
				break;
			case "Colombian":
				r += `Col`;
				break;
			case "Comorian":
				r += `Com`;
				break;
			case "Congolese":
				r += `RC`;
				break;
			case "a Cook Islander":
				r += `CI`;
				break;
			case "Costa Rican":
				r += `CR`;
				break;
			case "Croatian":
				r += `Cro`;
				break;
			case "Cuban":
				r += `Cub`;
				break;
			case "Curaçaoan":
				r += `Cur`;
				break;
			case "Cypriot":
				r += `Cyp`;
				break;
			case "Czech":
				r += `Cze`;
				break;
			case "Danish":
				r += `Den`;
				break;
			case "Djiboutian":
				r += `Dji`;
				break;
			case "Dominican":
				r += `DR`;
				break;
			case "Dominiquais":
				r += `Dom`;
				break;
			case "Dutch":
				r += `Nld`;
				break;
			case "East Timorese":
				r += `ET`;
				break;
			case "Ecuadorian":
				r += `Ecu`;
				break;
			case "Egyptian":
				r += `Egy`;
				break;
			case "Emirati":
				r += `UAE`;
				break;
			case "Equatoguinean":
				r += `EG`;
				break;
			case "Eritrean":
				r += `Eri`;
				break;
			case "Estonian":
				r += `Est`;
				break;
			case "Ethiopian":
				r += `Eth`;
				break;
			case "Fijian":
				r += `Fij`;
				break;
			case "Filipina":
				r += `Phl`;
				break;
			case "Finnish":
				r += `Fin`;
				break;
			case "French":
				r += `Fra`;
				break;
			case "French Guianan":
				r += `FG`;
				break;
			case "French Polynesian":
				r += `FP`;
				break;
			case "Gabonese":
				r += `Gab`;
				break;
			case "Gambian":
				r += `Gam`;
				break;
			case "Georgian":
				r += `Geo`;
				break;
			case "German":
				r += `Ger`;
				break;
			case "Ghanan":
				r += `Gha`;
				break;
			case "Greek":
				r += `Gre`;
				break;
			case "Greenlandic":
				r += `Grn`;
				break;
			case "Grenadian":
				r += `Gda`;
				break;
			case "Guamanian":
				r += `Gua`;
				break;
			case "Guatemalan":
				r += `Gtm`;
				break;
			case "Guinean":
				r += `Gui`;
				break;
			case "Guyanese":
				r += `Guy`;
				break;
			case "Haitian":
				r += `Hai`;
				break;
			case "Honduran":
				r += `Hon`;
				break;
			case "Hungarian":
				r += `Hun`;
				break;
			case "I-Kiribati":
				r += `Kir`;
				break;
			case "Icelandic":
				r += `Ice`;
				break;
			case "Indian":
				r += `Ind`;
				break;
			case "Indonesian":
				r += `Idn`;
				break;
			case "Iranian":
				r += `Irn`;
				break;
			case "Iraqi":
				r += `Irq`;
				break;
			case "Irish":
				r += `Irl`;
				break;
			case "Israeli":
				r += `Isr`;
				break;
			case "Italian":
				r += `Ita`;
				break;
			case "Ivorian":
				r += `IC`;
				break;
			case "Jamaican":
				r += `Jam`;
				break;
			case "Japanese":
				r += `Jpn`;
				break;
			case "Jordanian":
				r += `Jor`;
				break;
			case "Kazakh":
				r += `Kaz`;
				break;
			case "Kenyan":
				r += `Ken`;
				break;
			case "Kittitian":
				r += `SKN`;
				break;
			case "Korean":
				r += `Kor`;
				break;
			case "Kosovan":
				r += `Kos`;
				break;
			case "Kurdish":
				r += `Kur`;
				break;
			case "Kuwaiti":
				r += `Kuw`;
				break;
			case "Kyrgyz":
				r += `Kyr`;
				break;
			case "Laotian":
				r += `Lao`;
				break;
			case "Latvian":
				r += `Lat`;
				break;
			case "Lebanese":
				r += `Lbn`;
				break;
			case "Liberian":
				r += `Lib`;
				break;
			case "Libyan":
				r += `Lby`;
				break;
			case "a Liechtensteiner":
				r += `Lie`;
				break;
			case "Lithuanian":
				r += `Lit`;
				break;
			case "Luxembourgian":
				r += `Lux`;
				break;
			case "Macedonian":
				r += `Mac`;
				break;
			case "Malagasy":
				r += `Mad`;
				break;
			case "Malawian":
				r += `Mwi`;
				break;
			case "Malaysian":
				r += `Mys`;
				break;
			case "Maldivian":
				r += `Mdv`;
				break;
			case "Malian":
				r += `Mal`;
				break;
			case "Maltese":
				r += `Mlt`;
				break;
			case "Marshallese":
				r += `MI`;
				break;
			case "Mauritanian":
				r += `Mta`;
				break;
			case "Mauritian":
				r += `Mts`;
				break;
			case "Mexican":
				r += `Mex`;
				break;
			case "Micronesian":
				r += `FSM`;
				break;
			case "Moldovan":
				r += `Mol`;
				break;
			case "Monégasque":
				r += `Mnc`;
				break;
			case "Mongolian":
				r += `Mon`;
				break;
			case "Montenegrin":
				r += `Mng`;
				break;
			case "Moroccan":
				r += `Mor`;
				break;
			case "Mosotho":
				r += `Les`;
				break;
			case "Motswana":
				r += `Bot`;
				break;
			case "Mozambican":
				r += `Moz`;
				break;
			case "Namibian":
				r += `Nam`;
				break;
			case "Nauruan":
				r += `Nau`;
				break;
			case "Nepalese":
				r += `Npl`;
				break;
			case "New Caledonian":
				r += `NC`;
				break;
			case "a New Zealander":
				r += `NZ`;
				break;
			case "Ni-Vanuatu":
				r += `Van`;
				break;
			case "Nicaraguan":
				r += `Nic`;
				break;
			case "Nigerian":
				r += `Nga`;
				break;
			case "Nigerien":
				r += `Ngr`;
				break;
			case "Niuean":
				r += `Niu`;
				break;
			case "Norwegian":
				r += `Nor`;
				break;
			case "Omani":
				r += `Omn`;
				break;
			case "Pakistani":
				r += `Pak`;
				break;
			case "Palauan":
				r += `Plu`;
				break;
			case "Palestinian":
				r += `Pal`;
				break;
			case "Panamanian":
				r += `Pan`;
				break;
			case "Papua New Guinean":
				r += `PNG`;
				break;
			case "Paraguayan":
				r += `Par`;
				break;
			case "Peruvian":
				r += `Per`;
				break;
			case "Polish":
				r += `Pol`;
				break;
			case "Portuguese":
				r += `Por`;
				break;
			case "Puerto Rican":
				r += `PR`;
				break;
			case "Qatari":
				r += `Qat`;
				break;
			case "Romanian":
				r += `Rom`;
				break;
			case "Russian":
				r += `Rus`;
				break;
			case "Rwandan":
				r += `Rwa`;
				break;
			case "Sahrawi":
				r += `Sah`;
				break;
			case "Saint Lucian":
				r += `SL`;
				break;
			case "Salvadoran":
				r += `ES`;
				break;
			case "Sammarinese":
				r += `SM`;
				break;
			case "Samoan":
				r += `Sam`;
				break;
			case "São Toméan":
				r += `STP`;
				break;
			case "Saudi":
				r += `Sau`;
				break;
			case "Scottish":
				r += `Sco`;
				break;
			case "Senegalese":
				r += `Sen`;
				break;
			case "Serbian":
				r += `Srb`;
				break;
			case "Seychellois":
				r += `Sey`;
				break;
			case "Sierra Leonean":
				r += `Sie`;
				break;
			case "Singaporean":
				r += `Sng`;
				break;
			case "Slovak":
				r += `Svk`;
				break;
			case "Slovene":
				r += `Svn`;
				break;
			case "a Solomon Islander":
				r += `SI`;
				break;
			case "Somali":
				r += `Som`;
				break;
			case "South African":
				r += `RSA`;
				break;
			case "South Sudanese":
				r += `SS`;
				break;
			case "Spanish":
				r += `Spa`;
				break;
			case "Sri Lankan":
				r += `Sri`;
				break;
			case "Sudanese":
				r += `Sud`;
				break;
			case "Surinamese":
				r += `Sur`;
				break;
			case "Swazi":
				r += `Swa`;
				break;
			case "Swedish":
				r += `Swe`;
				break;
			case "Swiss":
				r += `Swi`;
				break;
			case "Syrian":
				r += `Syr`;
				break;
			case "Taiwanese":
				r += `Tai`;
				break;
			case "Tajik":
				r += `Taj`;
				break;
			case "Tanzanian":
				r += `Tza`;
				break;
			case "Thai":
				r += `Tha`;
				break;
			case "Tibetan":
				r += `Tib`;
				break;
			case "Togolese":
				r += `Tog`;
				break;
			case "Tongan":
				r += `Ton`;
				break;
			case "Trinidadian":
				r += `TT`;
				break;
			case "Tunisian":
				r += `Tun`;
				break;
			case "Turkish":
				r += `Tur`;
				break;
			case "Turkmen":
				r += `Tkm`;
				break;
			case "Tuvaluan":
				r += `Tuv`;
				break;
			case "Ugandan":
				r += `Uga`;
				break;
			case "Ukrainian":
				r += `Ukr`;
				break;
			case "Uruguayan":
				r += `Uru`;
				break;
			case "Uzbek":
				r += `Uzb`;
				break;
			case "Vatican":
				r += `VC`;
				break;
			case "Venezuelan":
				r += `Ven`;
				break;
			case "Vietnamese":
				r += `Vnm`;
				break;
			case "Vincentian":
				r += `SVG`;
				break;
			case "Yemeni":
				r += `Yem`;
				break;
			case "Zairian":
				r += `DRC`;
				break;
			case "Zambian":
				r += `Zam`;
				break;
			case "Zimbabwean":
				if (child.race === "white") {
					r += `Rho`;
				} else {
					r += `Zwe`;
				}
				break;
			case "Ancient Chinese Revivalist":
				r += `Chi Rev`;
				break;
			case "Ancient Egyptian Revivalist":
				r += `Egy Rev`;
				break;
			case "Arabian Revivalist":
				r += `Ara Rev`;
				break;
			case "Aztec Revivalist":
				r += `Azt Rev`;
				break;
			case "Edo Revivalist":
				r += `Edo Rev`;
				break;
			case "Roman Revivalist":
				r += `Rom Rev`;
				break;
			case "":
			case "none":
			case "child":
			case "Stateless":
				r += `None`;
				break;
			default:
				r += `${child.nationality.charAt(0) + child.nationality.charAt(1) + child.nationality.charAt(2)}`;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longNationality(child) {
		r += `<span class="tan">`;
		switch (child.nationality) {
			case "a Cook Islander":
				r += `Cook Islander. `;
				break;
			case "a Liechtensteiner":
				r += `Liechtensteiner. `;
				break;
			case "a New Zealander":
				r += `New Zealander. `;
				break;
			case "a Solomon Islander":
				r += `Solomon Islander. `;
				break;
			case "Zimbabwean":
				if (child.race === "white") {
					r += `Rhodesian. `;
				} else {
					r += `${child.nationality}. `;
				}
				break;
			case "child":
			case "none":
			case "":
			case "Stateless":
				r += `Stateless. `;
				break;
			default:
				r += `${child.nationality}. `;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSkin(child) {
		r += `<span class="pink">`;
		switch (child.skin) {
			case "pure white":
				r += `P. Whi`;
				break;
			case "extremely fair":
				r += `E. Fai`;
				break;
			case "very fair":
				r += `V. Fai`;
				break;
			case "extremely pale":
				r += `E. Pal`;
				break;
			case "very pale":
				r += `V. Pal`;
				break;
			case "light brown":
				r += `L. Br`;
				break;
			case "dark brown":
				r += `D. Br`;
				break;
			case "light olive":
				r += `L. Oli`;
				break;
			case "dark olive":
				r += `D. Oli`;
				break;
			case "light beige":
				r += `L. Bei`;
				break;
			case "dark beige":
				r += `D. Bei`;
				break;
			case "tan":
				r += `Tan`;
				break;
			case "bronze":
				r += `Bron`;
				break;
			case "ebony":
				r += `Ebon`;
				break;
			case "pure black":
				r += `P. Bla`;
				break;
			case "dark":
			case "fair":
			case "pale":
				r += `${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)}`;
				break;
			default:
				r += `${child.skin.charAt(0).toUpperCase() + child.skin.charAt(1) + child.skin.charAt(2)}`;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortAge(child) {
		r += `<span class="pink">`;
		if (V.showAgeDetail === 1) {
			if (child.actualAge > 0) {
				r += `${capFirstChar(num(child.actualAge))}yrs. `;
			} else {
				if (weeksOwned > 4) {
					r += `${capFirstChar(num(Math.trunc(weeksOwned / 4)))}mos. `;
				} else {
					if (weeksOwned <= 1) {
						r += `Nwbrn. `;
					} else {
						r += `${capFirstChar(num(weeksOwned))}wks. `;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortFace(child) {
		if (child.face < -95) {
			r += `<span class="red">Face---${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face < -40) {
			r += `<span class="red">Face--${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face < -10) {
			r += `<span class="red">Face-${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face <= 10) {
			r += `Face${V.summaryStats ? `[${child.face}]` : ''}`;
		} else if (child.face <= 40) {
			r += `<span class="pink">Face+${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face <= 95) {
			r += `<span class="pink">Face++${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else {
			r += `<span class="pink">Face+++${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortEyes(child) {
		if (!canSee(slave)) {
			r += `<span class="red">Blind</span> `;
		} else if (!canSeePerfectly(slave)) {
			r += `<span class="yellow">Sight-</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longAge(child) {
		r += `<span class="pink">`;
		if (V.showAgeDetail) {
			if (child.actualAge > 0) {
				r += `${capFirstChar(num(child.actualAge))}-year-old `;
				if (child.actualAge > 1) {
					r += `toddler. `;
				} else {
					r += `baby. `;
				}
			} else {
				if (weeksOwned > 4) {
					r += `${capFirstChar(num(Math.trunc(weeksOwned / 4)))} months old. `;
				} else {
					if (weeksOwned <= 1) {
						r += `Newborn. `;
					} else {
						r += `${capFirstChar(num(weeksOwned))} weeks old. `;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longFace(child) {
		r += `Likely to have a `;
		if (child.face < -95) {
			r += `<span class="red">very ugly${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face < -40) {
			r += `<span class="red">ugly${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face < -10) {
			r += `<span class="red">unattractive${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face <= 10) {
			r += `Average${V.summaryStats ? `[${child.face}]`: ''}`;
		} else if (child.face <= 40) {
			r += `<span class="pink">attractive${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face <= 95) {
			r += `<span class="pink">beautiful${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else {
			r += `<span class="pink">very beautiful${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		}
		r += `, ${child.faceShape} face. `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longEyes(child) {
		if (!canSee(child)) {
			r += `<span class="red">Blind.</span> `;
		} else if (!canSeePerfectly(child)) {
			r += `<span class="yellow">Nearsighted.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortIntelligence(child) {
		let intelligence = child.intelligence;
		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}
		if (child.fetish === "mindbroken") {
			return;
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 30) {
			if (intelligence >= 130) {
				r += `<span class="deepskyblue">I++++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I(e+)${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 15) {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I(e)${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		} else {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortPrestige(child) {
		if (child.prestige > 0) {
			r += `<span class="green">`;
			if (child.prestige > 2) {
				r += `Prest++`;
			} else if (child.prestige === 2) {
				r += `Prest+`;
			} else if (child.prestige === 1) {
				r += `Prest`;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortPornPrestige(child) {
		if (child.pornPrestige > 0) {
			r += `<span class="green">`;
			if (child.pornPrestige > 2) {
				r += `PPrest++`;
			} else if (child.pornPrestige === 2) {
				r += `PPrest+`;
			} else if (child.pornPrestige === 1) {
				r += `PPrest`;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longIntelligence(child) {
		let intelligence = child.intelligence;
		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}
		if (child.intelligence > 95) {
			r += `<span class="deepskyblue">Likely to be brilliant${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence > 50) {
			r += `<span class="deepskyblue">Likely to be very smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence > 15) {
			r += `<span class="deepskyblue">Likely to be smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence >= -15) {
			r += `Average intelligence${V.summaryStats ? `[${intelligence}]` : ''}. `;
		} else if (intelligence >= -50) {
			r += `<span class="orangered">Likely to be slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence >= -95) {
			r += `<span class="orangered">Likely to be very slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else {
			r += `<span class="orangered">Likely to be moronic${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longPrestige(child) {
		if (child.prestige > 0) {
			r += `<span class="green">`;
			if (child.prestige > 2) {
				r += `Extremely prestigious. `;
			} else if (child.prestige === 2) {
				r += `Very prestigious. `;
			} else if (child.prestige === 1) {
				r += `Prestigious. `;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longPornPrestige(child) {
		if (child.pornPrestige > 0) {
			r += `<span class="green">`;
			if (child.pornPrestige > 2) {
				r += `Porn star. `;
			} else if (child.pornPrestige === 2) {
				r += `Porn slut. `;
			} else if (child.pornPrestige === 1) {
				r += `Porn amateur. `;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortBehaviorFlaw(child) {
		r += `<span class="red">`;
		switch (child.behavioralFlaw) {
			case "arrogant":
				r += `Arrog`;
				break;
			case "bitchy":
				r += `Bitchy`;
				break;
			case "odd":
				r += `Odd`;
				break;
			case "hates men":
				r += `Men-`;
				break;
			case "hates women":
				r += `Women-`;
				break;
			case "gluttonous":
				r += `Glut`;
				break;
			case "anorexic":
				r += `Ano`;
				break;
			case "devout":
				r += `Dev`;
				break;
			case "liberated":
				r += `Lib`;
				break;
			default:
				child.behavioralFlaw = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexFlaw(child) {
		switch (child.sexualFlaw) {
			case "hates oral":
				r += `<span class="red">Oral-</span> `;
				break;
			case "hates anal":
				r += `<span class="red">Anal-</span> `;
				break;
			case "hates penetration":
				r += `<span class="red">Fuck-</span> `;
				break;
			case "shamefast":
				r += `<span class="red">Shame</span> `;
				break;
			case "idealistic":
				r += `<span class="red">Ideal</span> `;
				break;
			case "repressed":
				r += `<span class="red">Repre</span> `;
				break;
			case "apathetic":
				r += `<span class="red">Apath</span> `;
				break;
			case "crude":
				r += `<span class="red">Crude</span> `;
				break;
			case "judgemental":
				r += `<span class="red">Judge</span> `;
				break;
			case "cum addict":
				r += `<span class="yellow">CumAdd</span> `;
				break;
			case "anal addict":
				r += `<span class="yellow">AnalAdd</span> `;
				break;
			case "attention whore":
				r += `<span class="yellow">Attention</span> `;
				break;
			case "breast growth":
				r += `<span class="yellow">BoobObsess</span> `;
				break;
			case "abusive":
				r += `<span class="yellow">Abusive</span> `;
				break;
			case "malicious":
				r += `<span class="yellow">Malice</span> `;
				break;
			case "self hating":
				r += `<span class="yellow">SelfHatr</span> `;
				break;
			case "neglectful":
				r += `<span class="yellow">SelfNeglect</span> `;
				break;
			case "breeder":
				r += `<span class="yellow">BreedObsess</span> `;
				break;
			default:
				child.sexualFlaw = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBehaviorFlaw(child) {
		r += `<span class="red">`;
		switch (child.behavioralFlaw) {
			case "arrogant":
				r += `Arrogant. `;
				break;
			case "bitchy":
				r += `Bitchy. `;
				break;
			case "odd":
				r += `Odd. `;
				break;
			case "hates men":
				r += `Hates men. `;
				break;
			case "hates women":
				r += `Hates women. `;
				break;
			case "gluttonous":
				r += `Stress eater. `;
				break;
			case "anorexic":
				r += `Anorexic. `;
				break;
			case "devout":
				r += `Devoutly religious. `;
				break;
			case "liberated":
				r += `Mentally liberated. `;
				break;
			default:
				child.behavioralFlaw = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexFlaw(child) {
		switch (child.sexualFlaw) {
			case "hates oral":
				r += `<span class="red">Hates oral.</span> `;
				break;
			case "hates anal":
				r += `<span class="red">Hates anal.</span> `;
				break;
			case "hates penetration":
				r += `<span class="red">Hates penetration.</span> `;
				break;
			case "shamefast":
				r += `<span class="red">Shamefast.</span> `;
				break;
			case "idealistic":
				r += `<span class="red">Sexually idealistic.</span> `;
				break;
			case "repressed":
				r += `<span class="red">Sexually repressed.</span> `;
				break;
			case "apathetic":
				r += `<span class="red">Sexually apathetic.</span> `;
				break;
			case "crude":
				r += `<span class="red">Sexually crude.</span> `;
				break;
			case "judgemental":
				r += `<span class="red">Sexually judgemental.</span> `;
				break;
			case "cum addict":
				r += `<span class="yellow">Cum addict.</span> `;
				break;
			case "anal addict":
				r += `<span class="yellow">Anal addict.</span> `;
				break;
			case "attention whore":
				r += `<span class="yellow">Attention whore.</span> `;
				break;
			case "breast growth":
				r += `<span class="yellow">Breast obsession.</span> `;
				break;
			case "abusive":
				r += `<span class="yellow">Sexually abusive.</span> `;
				break;
			case "malicious":
				r += `<span class="yellow">Sexually malicious.</span> `;
				break;
			case "self hating":
				r += `<span class="yellow">Self hatred.</span> `;
				break;
			case "neglectful":
				r += `<span class="yellow">Self neglectful.</span> `;
				break;
			case "breeder":
				r += `<span class="yellow">Breeding obsession.</span> `;
				break;
			default:
				child.sexualFlaw = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortExtendedFamily(child) {
		let handled = 0;
		if (child.mother > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.mother === -1) {
			r += `Your daughter`;
			if (child.relationship < -1) {
				res += ` & ${PCrelationshipTerm(child)}`;
				handled = 1;
			}
			r += " ";
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s daughter `;
		}
		if (child.father > 0 && child.father !== child.mother) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.father === -1 && child.mother !== -1) {
			r += `Your daughter`;
			if (child.relationship < -1) {
				res += ` & ${PCrelationshipTerm(child)}`;
				handled = 1;
			}
			r += " ";
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s daughter`;
		}
		if (child.daughters === 1) {
			let _ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s mother`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
			_ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s father`;
				if (child.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.daughters > 1) {
			r += `multiple daughters `;
		}
		if (child.sisters === 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s sister`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += `& ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.sisters > 1) {
			r += `multiple sisters `;
		}
		if (child.relationship > 0 && handled !== 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s`;
				const friendShipShort = relationshipTermShort(child);
				r += ` ${friendShipShort}`;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `Your wife`;
		} else if (child.relationship === -2) {
			r += `E Bonded`;
		} else if (child.relationship === -1) {
			r += `E Slut`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRival(child) {
		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (_ssj !== -1) {
				r += `<span class="lightsalmon">`;
				if (child.rivalry <= 1) {
					r += `Disl ${SlaveFullName(V.slaves[_ssj])}`;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s rival`;
				} else {
					r += `Hates ${SlaveFullName(V.slaves[_ssj])}`;
				}
				r += `</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longExtendedFamily(child) {
		let handled = 0;
		if (child.mother > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.mother === -1) {
			r += `Your `;

			if (child.relationship < -1) {
				r += `<span class="lightgreen">daughter and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">daughter.</span> `;
			}
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s <span class="lightgreen">daughter.</span> `;
		}
		if (child.father > 0 && child.father !== child.mother) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.father === -1 && child.father !== child.mother) {
			r += `Your `;
			if (child.relationship < -1) {
				r += `<span class="lightgreen">daughter and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">daughter.</span> `;
			}
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s <span class="lightgreen">daughter.</span> `;
		}
		if (child.daughters === 1) {
			let _ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">mother`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
			_ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">father`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.daughters > 1) {
			if (child.daughters > 10) {
				r += `<span class="lightgreen">Has tons of daughters.</span> `;
			} else if (child.daughters > 5) {
				r += `<span class="lightgreen">Has many daughters.</span> `;
			} else {
				r += `<span class="lightgreen">Has several daughters.</span> `;
			}
		}
		if (child.sisters === 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">sister`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.sisters > 1) {
			if (child.sisters > 10) {
				r += `<span class="lightgreen">One of many sisters.</span> `;
			} else if (child.sisters > 5) {
				r += `<span class="lightgreen">Has many sisters.</span> `;
			} else {
				r += `<span class="lightgreen">Has several sisters.</span> `;
			}
		}
		if (child.relationship > 0 && handled !== 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				const friendship = relationshipTerm(child);
				r += `${SlaveFullName(V.slaves[_ssj])}'s `;
				r += `<span class="lightgreen">${friendship}.</span> `;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `<span class="lightgreen">Your wife.</span> `;
		} else if (child.relationship === -2) {
			r += `<span class="lightgreen">Emotionally bonded to you.</span> `;
		} else if (child.relationship === -1) {
			r += `<span class="lightgreen">Emotional slut.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRival(child) {
		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (_ssj !== -1) {
				if (child.rivalry <= 1) {
					r += `<span class="lightsalmon">Dislikes</span> ${SlaveFullName(V.slaves[_ssj])}. `;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightsalmon">rival.</span> `;
				} else {
					r += `<span class="lightsalmon">Hates</span> ${SlaveFullName(V.slaves[_ssj])}. `;
				}
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function origins(child) {
		r += `<br> `;
		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		}
		r += `<span class="gray">${child.origin}</span> `;
	}

	return InfantSummaryUncached(child);
};

/**
 * Displays a detailed description of the infant
 * @param {App.Entity.InfantState} child
 * @returns {string}
 */
App.Facilities.Nursery.LongInfantDescription = function(child) {
	"use strict";
	const
		PC = V.PC,
		arcology = V.arcologies[0],
		weeksOwned = V.week - child.weekAcquired;

	let
		r = ``,
		age,
		title,
		father = 0,
		fatherPC = 0,
		mother = 0,
		motherPC = 0;

	const
		{
			he, him, his, He, His
		} = getPronouns(child);

	if (child.father === -1 && child.mother === -1) {
		father = PC;
		fatherPC = 1;
		mother = PC;
		motherPC = 1;
	} else {
		if (child.father === -1) {
			father = PC;
			fatherPC = 1;
			mother = getSlave(child.mother);
		} else if (child.mother === -1) {
			father = getSlave(child.father);
			mother = PC;
			motherPC = 1;
		} else {
			if (child.father > 0) { /* Fathered by a current slave */
				father = getSlave(child.father);
			} else if (child.father < 0) { /* Fathered by a missing slave */
				father = -1;
			}
			if (child.father > 0) { /* Mothered by a current slave */
				mother = getSlave(child.mother);
			} else if (child.mother < 0) { /* Mothered by a missing slave */
				mother = -1;
			}
		}
	}

	// TODO: add infant art here

	r += `&nbsp;&nbsp;&nbsp;&nbsp; `;

	r += `<span id="childName"><strong><span class="pink">${SlaveFullName(child)}</span></strong></span> `;

	if (jsDef(child.custom)) {
		if (child.custom.label) {
			r += ` (<strong><span class="yellow">${child.custom.label}</span></strong>) `;
		}
	}

	if (child.actualAge > 0) {
		age = `${num(child.actualAge)}-year-old`;
		if (child.actualAge > 1) {
			title = `toddler`;
		} else {
			title = `baby`;
		}
	} else {
		if (weeksOwned > 4) {
			age = `${num(Math.trunc(weeksOwned / 4))}-month-old`;
			title = `baby`;
		} else {
			if (weeksOwned <= 1) {
				age = ``;
				title = `newborn`;
			} else {
				age = `${num(weeksOwned)}-week-old`;
				title = `baby`;
			}
		}
	}

	r += ` is a ${age} <strong><span class="coral">${title}.</span></strong> ${He} was born in ${arcology.name} ${weeksOwned > 4 ? weeksOwned < 9 ? `about a month` : `${num(weeksOwned)} months` : weeksOwned <= 1 ? `last week` : `${num(weeksOwned)} weeks`}${weeksOwned > 1 ? ` ago` : ``}`;

	if (jsDef(child.counter)) {
		const
			oral = child.counter.oral,
			vaginal = child.counter.vaginal,
			anal = child.counter.oral,
			mammary = child.counter.mammary,
			penetrative = child.counter.penetrative,
			total = oral + vaginal + anal + mammary + penetrative;

		if (total > 0) {
			r += ` and has been fucked about ${num(total)} times, including `;
			if ((vaginal + anal + mammary + penetrative) > 0) {
				if (vaginal > 0) {
					r += `${num(vaginal)} vanilla, `;
				}
				if (anal > 0) {
					r += `${num(anal)} anal, `;
				}
				if (mammary > 0) {
					r += `${num(mammary)} mammary `;
				}
				if (penetrative > 0) {
					r += `${num(penetrative)} penetrating, `;
				}
				r += ` and `;
			}
			r += `${num(oral)} oral sexual encounters. `;
		} else {
			if (weeksOwned >= 1) {
				r += ` and `;
			} else {
				r += `. ${He} `;
			}

			r += `has had little or no sexual experience `;
			if (child.weekAcquired !== 0) {
				r += `as your slave `;
			} else {
				r += `in your new arcology `;
			}
			r += `yet. `;

			let sortedCounts = [];
			sortedCounts.push(
				{type: "oral", value: oral},
				{type: "vaginal", value: vaginal},
				{type: "anal", value: anal},
				{type: "mammary", value: mammary},
				{type: "penetrative", value: penetrative}
			);
			sortedCounts = sortedCounts.sort(function(a, b) {	// sorts the counts from largest to smallest
				return b.value - a.value;
			});

			if (sortedCounts[0].type === "oral") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s sucked something off `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "vaginal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${his} pussy has been fucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "anal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s been buttfucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "mammary") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s put ${his} tits to work `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "penetrative") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s pounded a hole `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			}
		}
	} else {
		r += `. `;
	}

	/* OPEN FAMILY */

	if (fatherPC && motherPC) {
		r += `${He} is <span class="lightgreen">your child;</span> you knocked yourself up with ${him}. `;
	} else if (child.father === child.mother) {
		r += `${He} was <span class="lightgreen">both fathered and mothered by ${father.slaveName}.</span> `;
	} else {
		if (fatherPC) {
			r += `${He} is <span class="lightgreen">your child;</span> you knocked up ${his} mother, ${SlaveFullName(mother)}. `;
		} else if (motherPC) {
			r += `${He} is <span class="lightgreen">your child;</span> you gave birth to ${him}. `;
		} else {
			let pName;
			if (child.father !== 0) {
				if (V.showMissingSlaves && child.father in V.missingTable) {
					pName = `your former slave ${V.missingTable[child.father].slaveName}`;
				} else if (child.father in V.slaveIndices) {
					pName = V.slaves[V.slaveIndices[child.father]].slaveName;
				}
				if (pName) {
					r += `${He} was <span class="lightgreen">fathered by ${pName}'s</span> virile dick. `;
				}
			} else if (child.mother !== 0) {
				if (V.showMissingSlaves && child.mother in V.missingTable) {
					pName = `your former slave ${V.missingTable[child.mother].slaveName}`;
				} else if (child.mother in V.slaveIndices){
					pName = V.slaves[V.slaveIndices[child.mother]].slaveName;
				}
				if (pName) {
					r += `${He} was born from ${pName}'s fertile womb. `;
				}
			}
		}
	}

	function jsDef(x) {
		return typeof x !== "undefined";
	}

	if (V.showDistantRelatives) {
		const
			mi = mother,
			fi = father;

		let
			mmi,
			fmi,
			mfi,
			ffi;

		if (jsDef(mi)) {
			mmi = mother.mother;
			fmi = mother.father;
		} else if (mother === PC) {
			mmi = PC.mother;
			fmi = PC.father;
		}

		if (jsDef(fi)) {
			mfi = father.mother;
			ffi = father.father;
		} else if (fatherPC) {
			mfi = PC.mother;
			ffi = PC.father;
		}

		// grandparents
		if (jsDef(mi) || jsDef(fi) && !jsDef(mmi) && !jsDef(fmi) && !jsDef(mfi) && !jsDef(ffi)) {
			if (jsDef(mi)) {
				if (jsDef(fi) && mi === fi) {
					if (PC === mother.mother && PC === father.father) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You impregnated yourself with ${his} sole biological parent. `;
					} else if (PC === mother.mother) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to ${his} sole biological parent. `;
					} else if (PC === father.father) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered ${his} sole biological parent. `;
					}
				} else if (jsDef(fi) && PC === mother.mother && PC === father.mother) {
					r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to both of ${his} parents. `;
				} else if (jsDef(fi) && PC === mother.father && PC === father.father) {
					r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered both of ${his} parents. `;
				} else if (PC === mother.mother) {
					r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to ${his} mother. `;
				} else if (PC === mother.father) {
					r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered ${his} mother. `;
				}
			} else if (jsDef(fi)) {
				if (PC === father.mother) {
					r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to ${his} father. `;
				} else if (PC === father.father) {
					r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered ${his} father. `;
				}
			}
		} else {
			if (jsDef(mmi) && jsDef(ffi) && mmi === ffi) {
				r += `${His} sole granparent is ${mmi.slaveName}.</span> `;
			} else {
				if (jsDef(mmi) && jsDef(mfi) && mmi === mfi) {
					if (jsDef(mmi)) {
						r += `${His} sole <span class="lightgreen">grandparent is ${mmi}.</span> `;
					}
				} else {
					if (jsDef(mmi)) {
						r += `${His} maternal <span class="lightgreen">grandmother is ${mmi.slaveName}.</span> `;
					}
					if (jsDef(mfi)) {
						r += `${His} paternal <span class="lightgreen">grandmother is ${mfi.slaveName}.</span> `;
					}
				}
				if (jsDef(fmi) && jsDef(ffi) && fmi === ffi) {
					r += `${His} sole <span class="lightgreen">grandparent is ${ffi}.</span> `;
				} else {
					if (jsDef(fmi)) {
						r += `${His} maternal <span class="lightgreen">grandfather is ${fmi.slaveName}.</span> `;
					}
					if (jsDef(ffi)) {
						r += `${His} paternal <span class="lightgreen">grandfather is ${ffi.slaveName}.</span> `;
					}
				}
			}
		}

		// aunts and uncles
		let aunts = [], uncles = [];
		let momsiblings = V.slaves.filter((s) => { const sis = areSisters(s, child.mother); return sis === 1 || sis === 2; });
		let dadsiblings = V.slaves.filter((s) => { const sis = areSisters(s, child.father); return sis === 1 || sis === 2; });
		for (let i = 0; i < momsiblings.length; i++) {
			if (momsiblings[i].genes === "XX") {
				aunts.push(momsiblings[i]);
			} else {
				uncles.push(momsiblings[i]);
			}
		}
		for (let i = 0; i < dadsiblings.length; i++) {
			if (dadsiblings[i].genes === "XX") {
				aunts.push(dadsiblings[i]);
			} else {
				uncles.push(dadsiblings[i]);
			}
		}

		if (aunts.length > 0) {
			r += `${He} `;
			if (aunts.length > 2) {
				r += `has <span class="lightgreen">many aunts, ${aunts.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})}</span> `;
			} else if (aunts.length === 2) {
				r += `has <span class="lightgreen">two aunts, ${aunts[0].slaveName}, and ${aunts[1].slaveName}.</span> `;
			} else {
				r += `has <span class="lightgreen">an aunt, ${aunts[0].slaveName}.</span> `;
			}
		}

		if (uncles.length > 0) {
			r += `${He} `;
			if (uncles.length > 2) {
				r += `has <span class="lightgreen">many uncles, ${uncles.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})}</span> `;
			} else if (uncles.length === 2) {
				r += `has <span class="lightgreen">two uncles, ${uncles[0].slaveName}, and ${uncles[1].slaveName}.</span> `;
			} else {
				r += `has <span class="lightgreen">an uncle, ${uncles[0].slaveName}.</span> `;
			}
		}

		// nieces and nephews
		let nieces = $slaves.filter((s) => { return (isAunt(s, $activeSlave) && (s.genes === "XX")); });
		let nephews = $slaves.filter((s) => { return (isAunt(s, $activeSlave) && (s.genes === "XY")); });

		if (nieces.length > 0) {
			r += `${He} `;
			if (nieces.length > 2) {
				r += `has <span class="lightgreen">many nieces, ${nieces.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})}</span> `;
			} else if (nieces.length === 2) {
				r += `has <span class="lightgreen">two nieces, ${nieces[0].slaveName}, and ${nieces[1].slaveName}.</span> `;
			} else {
				r += `has <span class="lightgreen">a niece, ${nieces[0].slaveName}.</span> `;
			}
		}

		if (nephews.length > 0) {
			r += `${He} `;
			if (nephews.length > 2) {
				r += `has <span class="lightgreen">many nephews, ${nephews.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})}</span> `;
			} else if (nephews.length === 2) {
				r += `has <span class="lightgreen">two nephews, ${nephews[0].slaveName}, and ${nephews[1].slaveName}.</span> `;
			} else {
				r += `has <span class="lightgreen">a nephew, ${nephews[0].slaveName}.</span> `;
			}
		}

		let
			twins = [],
			sisters = [],
			brothers = [],
			halfSisters = [],
			halfBrothers = [],
			cousins = [];

		for (let i = 0; i < V.slaves.length; i++) {
			let sisterCheck = areSisters(V.slaves[i], child);
			if (sisterCheck === 1) {
				twins.push(V.slaves[i]);
			}
			if (sisterCheck === 2) {
				(V.slaves[i].genes === "XX" ? sisters : brothers).push(V.slaves[i]);
			}
			if (sisterCheck === 3) {
				(V.slaves[i].genes === "XX" ? halfSisters : halfBrothers).push(V.slaves[i]);
			}
			if (V.showDistantRelatives) {
				if (areCousins(V.slaves[i], child)) {
					cousins.push(V.slaves[i]);
				}
			}
		}

		// twins
		if (twins.length > 0) {
			r += `${He} `;
			if (twins.length > 2) {
				r += `<span class="lightgreen">shared a cramped womb with ${twins.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})}</span> `;
			} else if (twins.length === 2) {
				r += `is <span class="lightgreen">one of a set of triplets; ${twins[0].slaveName} and ${twins[1].slaveName}</span> complete the trio. `;
			} else {
				r += `is <span class="lightgreen">twins with ${twins[0].slaveName}.</span> `;
			}
		}

		// sisters
		if (sisters.length > 0) {
			if (sisters.length > 1) {
				r += `<span class="lightgreen">${sisters.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are ${his} sisters.</span> `;
			} else {
				r += `<span class="lightgreen">${sisters[0].slaveName} is ${his} sister. `;
			}
		}

		// brothers
		if (brothers.length > 0) {
			if (brothers.length > 1) {
				r += `<span class="lightgreen">${brothers.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are ${his} brothers.</span> `;
			} else {
				r += `<span class="lightgreen">${brothers[0].slaveName} is ${his} brother. `;
			}
		}

		// half-sisters
		V.children = V.slaves.filter(function(s) {
			return areSisters(child, s) === 3 && s.genes === "XX";
		});
		if (V.children.length > 0) {
			if (V.children.length > 2) {
				r += `<span class="lightgreen">${V.children.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are half-sisters to ${him}.</span> `;
			} else if (V.children.length === 2) {
				r += `<span class="lightgreen">${V.children[0].slaveName} and ${V.children[1].slaveName} are half-sisters to ${him}.</span> `;
			} else {
				r += `<span class="lightgreen">${V.children[0].slaveName} is a half-sister to ${him}.</span> `;
			}
		}

		// half-brothers
		V.children = V.slaves.filter(function(s) {
			return areSisters(child, s) === 3 && s.genes === "XY";
		});
		if (V.children.length > 0) {
			if (V.children.length > 2) {
				r += `<span class="lightgreen">${V.children.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are half-brothers to ${him}.</span> `;
			} else if (V.children.length === 2) {
				r += `<span class="lightgreen">${V.children[0].slaveName} and ${V.children[1].slaveName} are half-brothers to ${him}.</span> `;
			} else {
				r += `<span class="lightgreen">${V.children[0].slaveName} is a half-brother to ${him}.</span> `;
			}
		}

		// cousins
		V.children = V.slaves.filter(function(s) {
			return areCousins(child, s);
		});
		if (V.children.length > 0) {
			if (V.children.length > 2) {
				r += `<span class="lightgreen">${V.children.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are cousins to ${him}.</span> `;
			} else if (V.children.length === 2) {
				r += `<span class="lightgreen">${V.children[0].slaveName} and ${V.children[1].slaveName} are cousins to ${him}.</span> `;
			} else {
				r += `<span class="lightgreen">${V.children[0].slaveName} is a cousins to ${him}.</span> `;
			}
		}
	}

	/* CLOSE FAMILY */

	if (father && fatherPC) {
		if (child.eyeColor === PC.eye.origColor) {
			r += `${He} has your ${child.eyeColor} eyes, `;
		} else if (mother) {
			r += `${He} has ${his} mother ${mother.slaveName}'s ${child.eyeColor} eyes, `;
		}
	} else {
		if (father && child.eyeColor === father.eyeColor) {
			r += `${He} has ${his} father ${father.slaveName}'s ${child.eyeColor} eyes, `;
		} else if (mother) {
			r += `${He} has ${his} mother ${mother.slaveName}'s ${child.eyeColor} eyes, `;
		} else {
			r += `${He} has ${child.eyeColor} eyes, `;
		}
	}
	r += ` and ${he} will most likely have ${child.hColor} hair when ${he}'s older. `;

	r += `${He} ${V.seeRace ? `is ${child.race} and ${child.nationality}, and` : ``} has ${child.skin} skin. `;

	return r;
};

/* CHILDREN */

/**
 * Displays a summary of the child
 * @param {App.Entity.SlaveState} child
 * @returns {string}
 */
App.Facilities.Nursery.ChildSummary = function(child) {
	"use strict";

	let
		r = ``;

	/**
	 * @param {App.Entity.SlaveState} child
	 * @returns {string}
	 */
	function ChildSummaryUncached(child) {
		if (V.abbreviateDevotion === 1) {
			shortDevotion(child);
		} else if (V.abbreviateDevotion === 2) {
			longDevotion(child);
		}
		if (child.fuckdoll === 0) {
			if (V.abbreviateRules === 1) {
				shortRules(child);
			} else if (V.abbreviateRules === 2) {
				longRules(child);
			}
		}
		if (V.abbreviateDiet === 1) {
			shortWeight(child);
		} else if (V.abbreviateDiet === 2) {
			longWeight(child);
		}
		if (V.abbreviateDiet === 1) {
			shortDiet(child);
		} else if (V.abbreviateDiet === 2) {
			longDiet(child);
		}
		if (V.abbreviateHealth === 1) {
			shortHealth(child);
		} else if (V.abbreviateHealth === 2) {
			longHealth(child);
		}
		if (V.abbreviateDrugs === 1) {
			shortDrugs(child);
		} else if (V.abbreviateDrugs === 2) {
			longDrugs(child);
		}
		if (V.abbreviateNationality + V.abbreviateGenitalia + V.abbreviatePhysicals + V.abbreviateSkills + V.abbreviateMental !== 0) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
		}
		V.desc = SlaveTitle(child);
		const firstLetter = V.desc.substring(0, 1).toUpperCase();
		V.desc = firstLetter + V.desc.substring(1);
		r += `<strong><span class="coral">${V.desc}${V.abbreviatePhysicals === 2? '.' : ''}</span></strong> `;
		if (V.seeRace) {
			r += `<span class="tan">`;
			if (V.abbreviateRace === 1) {
				shortRace(child);
			} else if (V.abbreviateRace === 2) {
				longRace(child);
			}
			r += `</span> `;
		}
		if (V.abbreviateNationality === 1) {
			shortNationality(child);
		} else if (V.abbreviateNationality === 2) {
			longNationality(child);
		}
		if (V.abbreviatePhysicals === 1) {
			shortSkin(child);
		} else {
			r += `<span class="pink">${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)} skin.</span> `;
		}
		if (V.abbreviateGenitalia === 1) {
			shortGenitals(child);
		} else if (V.abbreviateGenitalia === 2) {
			longGenitals(child);
		}
		if (V.abbreviatePhysicals === 1) {
			shortAge(child);
			shortFace(child);
			shortEyes(child);
			shortEars(child);
			if (child.markings !== "none") {
				r += "Markings";
			}
			shortLips(child);
			shortTeeth(child);
			shortMuscles(child);
			r += App.Desc.shortLimbs(child);
			shortVoice(child);
			shortTitsAss(child);
			shortHips(child);
			shortWaist(child);
			shortImplants(child);
			shortLactation(child);
			// shortMods(child);
			r += `</span> `;
		} else if (V.abbreviatePhysicals === 2) {
			longAge(child);
			longFace(child);
			longEyes(child);
			longEars(child);
			longLips(child);
			longTeeth(child);
			longMuscles(child);
			r += App.Desc.longLimbs(child);
			longVoice(child);
			longTitsAss(child);
			longHips(child);
			longWaist(child);
			longImplants(child);
			longLactation(child);
			// longMods(child);
			if (!jQuery.isEmptyObject(child.brand)) {
				r += `Branded. `;
			}
			r += `</span> `;
		}
		if (V.abbreviateHormoneBalance === 1) {
			if (child.hormoneBalance <= -21) {
				r += `<span class="deepskyblue">`;
				r += ` <strong>HB:M</strong> `;
			} else if (child.hormoneBalance <= 20) {
				r += `<span class="pink">`;
				r += ` <strong>HB:N</strong> `;
			} else if (child.hormoneBalance <= 500) {
				r += `<span class="pink">`;
				r += ` <strong>HB:F</strong> `;
			}
			r += `</span> `;
		} else if (V.abbreviateHormoneBalance === 2) {
			r += `<span class=`;
			if (child.hormoneBalance <= -21) {
				r += `"deepskyblue"`;
			} else {
				r += `"pink"`;
			}
			r += `> `;
			if (child.hormoneBalance < -400) {
				r += `Overwhelmingly masculine`;
			} else if (child.hormoneBalance <= -300) {
				r += `Extremely masculine`;
			} else if (child.hormoneBalance <= -200) {
				r += `Heavily masculine`;
			} else if (child.hormoneBalance <= -100) {
				r += `Very masculine`;
			} else if (child.hormoneBalance <= -21) {
				r += `Masculine`;
			} else if (child.hormoneBalance <= 20) {
				r += `Neutral`;
			} else if (child.hormoneBalance <= 99) {
				r += `Feminine`;
			} else if (child.hormoneBalance <= 199) {
				r += `Very feminine`;
			} else if (child.hormoneBalance <= 299) {
				r += `Heavily feminine`;
			} else if (child.hormoneBalance <= 399) {
				r += `Extremely feminine`;
			} else if (child.hormoneBalance <= 500) {
				r += `Overwhelmingly feminine`;
			}
			r += ` hormone balance.</span> `;
		}
		r += `<br>`;
		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += "&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		if (V.abbreviateSkills === 1) {
			shortIntelligence(child);
			shortSexSkills(child);
			if (child.skill.combat > 0) {
				r += "C";
			}
			r += "</span> ";
			shortPrestige(child);
			shortPornPrestige(child);
		} else if (V.abbreviateSkills === 2) {
			longIntelligence(child);
			longSexSkills(child);
			if (child.skill.combat > 0) {
				r += `Trained fighter. `;
			}
			r += "</span> ";
			longPrestige(child);
			longPornPrestige(child);
		}
		if (V.abbreviateMental === 1) {
			if (child.fetish !== "mindbroken") {
				if (child.fetishKnown === 1) {
					shortFetish(child);
				}
				if (child.attrKnown === 1) {
					shortAttraction(child);
				}
			}
			if (child.clitPiercing === 3) {
				shortSmartFetish(child);
				shortSmartAttraction(child);
			}
			shortBehaviorFlaw(child);
			shortSexFlaw(child);
			shortBehaviorQuirk(child);
			shortSexQuirk(child);
		} else if (V.abbreviateMental === 2) {
			if (child.fetish !== "mindbroken") {
				if (child.fetishKnown === 1) {
					longFetish(child);
				}
				if (child.attrKnown === 1) {
					longAttraction(child);
				}
			}
			if (child.clitPiercing === 3) {
				longSmartFetish(child);
				longSmartAttraction(child);
			}
			longBehaviorFlaw(child);
			longSexFlaw(child);
			longBehaviorQuirk(child);
			longSexQuirk(child);
		}
		if (child.custom.label) {
			r += `<strong><span class="yellow">${capFirstChar(child.custom.label)}</span></strong> `;
		}
		if ((child.relationship !== 0) || (child.relation !== 0) || (V.abbreviateClothes === 2) || (V.abbreviateRulesets === 2)) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			}
		}
		if (V.abbreviateMental === 1) {
			r += `<span class="lightgreen">`;
			if (V.familyTesting === 1) {
				shortExtendedFamily(child);
			} else {
				shortLegacyFamily(child);
			}
			r += `</span> `;
			shortClone(child);
			shortRival(child);
		} else if (V.abbreviateMental === 2) {
			if (V.familyTesting === 1) {
				longExtendedFamily(child);
			} else {
				longLegacyFamily(child);
			}
			longClone(child);
			longRival(child);
		}
		if (child.fuckdoll === 0) {
			if (V.abbreviateClothes === 2) {
				r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
				if (child.choosesOwnClothes === 1) {
					r += "Dressing herself. ";
				}
				longClothes(child);
				longCollar(child);
				longBelly(child);
				if (hasAnyLegs(child)) {
					longLegs(child);
				}
				if (canWalk(child)) {
					longShoes(child);
				}
				longChastity(child);
				longVaginalAcc(child);
				longDickAcc(child);
				longButtplug(child);
			}
		}
		r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		rulesAssistant(child);
		if (V.abbreviateOrigins === 2 && child.origin !== 0) {
			origins(child);
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortDevotion(child) {
		r += `<br>`;
		if (child.fetish === "mindbroken") {
			r += `<span class="mindbroken">MB</span> `;
		} else if (child.devotion < -95) {
			r += `<span class="devotion hateful">Hate${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion < -50) {
			r += `<span class="devotion hateful">Hate${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion < -20) {
			r += `<span class="devotion resistant">Res${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion <= 20) {
			r += `<span class="devotion ambivalent">Ambiv${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion <= 50) {
			r += `<span class="devotion accept">Accept${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion <= 95) {
			r += `<span class="devotion devoted">Devo${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else {
			r += `<span class="devotion worship">Wor${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		}
		if (child.fetish === "mindbroken") {
			return;
		} else if (child.trust < -95) {
			r += `<span class="trust extremely-terrified">ETerr${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust < -50) {
			r += `<span class="trust terrified">Terr${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust < -20) {
			r += `<span class="trust frightened">Fright${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust <= 20) {
			r += `<span class="trust fearful">Fear${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust <= 50) {
			if (child.devotion < -20) {
				r += `<span class="defiant careful">Caref${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			} else {
				r += `<span class="trust careful">Caref${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			}
		} else if (child.trust < 95) {
			if (child.devotion < -20) {
				r += `<span class="defiant bold">Bold${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			} else {
				r += `<span class="trust trusting">Trust${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			}
		} else {
			if (child.devotion < -20) {
				r += `<span class="defiant full">Defiant${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			} else {
				r += `<span class="trust prof-trusting">VTrust ${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDevotion(child) {
		r += `<br>`;
		if (child.fetish === "mindbroken") {
			r += `<span class="mindbroken">Mindbroken.</span> `;
		} else if (child.devotion < -95) {
			r += `<span class="devotion hateful">Very hateful${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion < -50) {
			r += `<span class="devotion hateful">Hateful${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion < -20) {
			r += `<span class="devotion resistant">Resistant${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion <= 20) {
			r += `<span class="devotion ambivalent">Ambivalent${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion <= 50) {
			r += `<span class="devotion accept">Accepting${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion <= 95) {
			r += `<span class="devotion devoted">Devoted${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else {
			r += `<span class="devotion worship">Worshipful${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		}
		if (child.fetish === "mindbroken") {
			return;
		} else if (child.trust < -95) {
			r += `<span class="trust extremely-terrified">Extremely terrified${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust < -50) {
			r += `<span class="trust terrifies">Terrified${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust < -20) {
			r += `<span class="trust frightened">Frightened${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust <= 20) {
			r += `<span class="trust fearful">Fearful${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust <= 50) {
			if (child.devotion < -20) {
				r += `<span class="defiant careful">Careful${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			} else {
				r += `<span class="trust careful">Careful${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			}
		} else if (child.trust < 95) {
			if (child.devotion < -20) {
				r += `<span class="defiant bold">Bold${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			} else {
				r += `<span class="trust trusting">Trusting${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			}
		} else {
			if (child.devotion < -20) {
				r += `<span class="defiant full">Defiant${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			} else {
				r += `<span class="trust prof-trusting">Profoundly trusting${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRules(child) {
		switch (child.rules.living) {
			case "luxurious":
				r += `<strong>LS:Lux</strong> `;
				break;
			case "normal":
				r += `<strong>LS:Nor</strong> `;
				break;
			default:
				r += `<strong>LS:Spa</strong> `;
				break;
		}
		if (canTalk(child)) {
			switch (child.rules.speech) {
				case "permissive":
					r += `<strong>SpR:P</strong> `;
					break;
				case "accent elimination":
					r += `<strong>SpR:NoAcc</strong> `;
					break;
				case "language lessons":
					r += `<strong>SpR:LL</strong> `;
					break;
				default:
					r += `<strong>SpR:R</strong> `;
					break;
			}
			r += " ";
		}
		switch (child.rules.relationship) {
			case "permissive":
				r += `<strong>ReR:P</strong> `;
				break;
			case "just friends":
				r += `<strong>ReR:Fr</strong> `;
				break;
			default:
				r += `<strong>ReR:R</strong> `;
				break;
		}
		switch (child.rules.punishment) {
			case "confinement":
				r += `<strong>Pun:Conf</strong> `;
				break;
			case "whipping":
				r += `<strong>Pun:Whip</strong> `;
				break;
			case "chastity":
				r += `<strong>Pun:Chas</strong> `;
				break;
			default:
				r += `<strong>Pun:Situ</strong> `;
				break;
		}
		switch (child.rules.reward) {
			case "relaxation":
				r += `<strong>Rew:Relx</strong> `;
				break;
			case "drugs":
				r += `<strong>Rew:Drug</strong> `;
				break;
			case "orgasm":
				r += `<strong>Rew:Orga</strong> `;
				break;
			default:
				r += `<strong>Rew:Situ</strong> `;
				break;
		}
		r += `<strong>MaR:${App.Utils.releaseSummaryShort(child)}</strong> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRules(child) {
		r += `Living standard: ${child.rules.living}. `;
		if (canTalk(child)) {
			r += `Speech rules: ${child.rules.speech}. `;
		}
		r += `Relationship rules: ${child.rules.relationship}. `;
		r += `Typical punishment: ${child.rules.punishment}. `;
		r += `Typical reward: ${child.rules.reward}. `;
		r += `Release rules: ${App.Utils.releaseSummaryLong(child)}. `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortWeight(child) {
		if (child.weight < -95) {
			r += `<strong><span class="red">W---${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
		} else if (child.weight < -30) {
			if (child.hips < -1) {
				r += `<strong>W--${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W--${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight < -10) {
			r += `<strong>W-${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
		} else if (child.weight <= 10) {
			r += `<strong>W${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
		} else if (child.weight <= 30) {
			r += `<strong>W+${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
		} else if (child.weight <= 95) {
			if (child.hips > 1 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `<strong>W++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight <= 130) {
			if (child.hips > 2 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `<strong>W+++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W+++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight <= 160) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `<strong>W++++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W++++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight <= 190) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `<strong>W+++++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W+++++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `<strong>W++++++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W++++++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longWeight(child) {
		if (child.weight < -95) {
			r += `<span class="red">Emaciated${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
		} else if (child.weight < -30) {
			if (child.hips < -1) {
				r += `Model-thin${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Very thin${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight < -10) {
			r += `Thin${V.summaryStats ? `[${child.weight}]`: ''}. `;
		} else if (child.weight <= 10) {
			r += `Trim${V.summaryStats ? `[${child.weight}]`: ''}. `;
		} else if (child.weight <= 30) {
			r += `Plush ${V.summaryStats ? `[${child.weight}]`: ''}. `;
		} else if (child.weight <= 95) {
			if (child.hips > 1 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `Nicely chubby${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Overweight${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight <= 130) {
			if (child.hips > 2 || V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `Pleasantly soft and shapely${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Fat${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight <= 160) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `Amazingly voluptuous${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Obese${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight <= 190) {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `SSBBW${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Super Obese${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else {
			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				r += `Perfectly massive${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Dangerously Obese${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortDiet(child) {
		r += `<span class="teal">`;
		switch (child.diet) {
			case "restricted":
				r += `<strong>Di:W-</strong> `;
				break;
			case "fattening":
				r += `<strong>Di:W+</strong> `;
				break;
			case "XX":
				r += `<strong>Di:XX+</strong> `;
				break;
			case "XY":
				r += `<strong>Di:XY+</strong> `;
				break;
			case "XXY":
				r += `<strong>Di:XXY+</strong> `;
				break;
			case "muscle building":
				r += `<strong>Di:M+</strong> `;
				break;
			case "slimming":
				r += `<strong>Di:M-</strong> `;
				break;
			case "cum production":
				r += `<strong>Di:C+</strong> `;
				break;
			case "cleansing":
				r += `<strong>Di:H+</strong> `;
				break;
			case "fertility":
				r += `<strong>Di:F+</strong> `;
				break;
		}
		r += `</span> `;
		r += `<span class="cyan">`;
		if (child.dietCum === 2) {
			r += `<strong>Cum++</strong> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 0))) {
			r += `<strong>Cum+</strong> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 1))) {
			r += `<strong>Cum+ Milk+</strong> `;
		} else if (((child.dietCum === 0) && (child.dietMilk === 1))) {
			r += `<strong>Milk+</strong> `;
		} else if ((child.dietMilk === 2)) {
			r += `<strong>Milk++</strong> `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDiet(child) {
		r += `<span class="teal">`;
		switch (child.diet) {
			case "restricted":
				r += `Dieting. `;
				break;
			case "fattening":
				r += `Gaining weight. `;
				break;
			case "XX":
				r += `Estrogen rich. `;
				break;
			case "XY":
				r += `Testosterone rich. `;
				break;
			case "XXY":
				r += `Futanari mix. `;
				break;
			case "muscle building":
				r += `Pumping iron. `;
				break;
			case "slimming":
				r += `Slimming down. `;
				break;
			case "cum production":
				r += `Cum production. `;
				break;
			case "cleansing":
				r += `Cleansing. `;
				break;
			case "fertility":
				r += `Fertility. `;
				break;
		}
		r += `</span> `;
		if (child.dietCum === 2) {
			r += `Diet base: <span class="cyan">Cum Based.</span> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 0))) {
			r += `Diet base: <span class="cyan">Cum Added.</span> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 1))) {
			r += `Diet base: <span class="cyan">Milk & Cum Added.</span> `;
		} else if (((child.dietCum === 0) && (child.dietMilk === 1))) {
			r += `Diet base: <span class="cyan">Milk Added.</span> `;
		} else if ((child.dietMilk === 2)) {
			r += `Diet base: <span class="cyan">Milk Based.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortHealth(child) {
		if (child.health.condition < -20) {
			r += `<strong><span class="red">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
		} else if (child.health.condition <= 20) {
			r += `<strong><span class="yellow">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
		} else if (child.health.condition > 20) {
			r += `<strong><span class="green">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longHealth(child) {
		if (child.health.condition < -90) {
			r += `<span class="red">On the edge of death ${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition < -50) {
			r += `<span class="red">Extremely unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition < -20) {
			r += `<span class="red">Unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition <= 20) {
			r += `<span class="yellow">Healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition <= 50) {
			r += `<span class="green">Very healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition <= 90) {
			r += `<span class="green">Extremely healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else {
			r += `<span class="green">Unnaturally healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortDrugs(child) {
		r += `<span class="tan">`;
		switch (child.drugs) {
			case "breast injections":
				r += `<strong>Dr:Boobs+</strong> `;
				break;
			case "intensive breast injections":
				r += `<strong>Dr:Boobs++</strong> `;
				break;
			case "hyper breast injections":
				r += `<strong>Dr:Boobs+++</strong> `;
				break;
			case "butt injections":
				r += `<strong>Dr:Butt+</strong> `;
				break;
			case "intensive butt injections":
				r += `<strong>Dr:Butt++</strong> `;
				break;
			case "hyper butt injections":
				r += `<strong>Dr:Butt+++</strong> `;
				break;
			case "lip injections":
				r += `<strong>Dr:Lip+</strong> `;
				break;
			case "fertility drugs":
				r += `<strong>Dr:Fert+</strong> `;
				break;
			case "super fertility drugs":
				r += `<strong>Dr:Fert++</strong> `;
				break;
			case "penis enhancement":
				r += `<strong>Dr:Dick+</strong> `;
				break;
			case "intensive penis enhancement":
				r += `<strong>Dr:Dick++</strong> `;
				break;
			case "hyper penis enhancement":
				r += `<strong>Dr:Dick+++</strong> `;
				break;
			case "testicle enhancement":
				r += `<strong>Dr:Balls+</strong> `;
				break;
			case "intensive testicle enhancement":
				r += `<strong>Dr:Balls++</strong> `;
				break;
			case "hyper testicle enhancement":
				r += `<strong>Dr:Balls+++</strong> `;
				break;
			case "psychosuppressants":
				r += `<strong>Dr:Psych</strong> `;
				break;
			case "steroids":
				r += `<strong>Dr:Ster</strong> `;
				break;
			case "female hormone injections":
				r += `<strong>Dr:HormXX++</strong> `;
				break;
			case "male hormone injections":
				r += `<strong>Dr:HormXY++</strong> `;
				break;
			case "hormone enhancers":
				r += `<strong>Dr:Horm+</strong> `;
				break;
			case "hormone blockers":
				r += `<strong>Dr:Horm-</strong> `;
				break;
			case "anti-aging cream":
				r += `<strong>Dr:Age-</strong> `;
				break;
			case "appetite suppressors":
				r += `<strong>Dr:ApSup</strong> `;
				break;
			case "penis atrophiers":
				r += `<strong>Dr:Dick-</strong> `;
				break;
			case "testicle atrophiers":
				r += `<strong>Dr:Balls-</strong> `;
				break;
			case "clitoris atrophiers":
				r += `<strong>Dr:Clit-</strong> `;
				break;
			case "labia atrophiers":
				r += `<strong>Dr:Labia-</strong> `;
				break;
			case "nipple atrophiers":
				r += `<strong>Dr:Nipple-</strong> `;
				break;
			case "lip atrophiers":
				r += `<strong>Dr:Lip-</strong> `;
				break;
			case "breast redistributors":
				r += `<strong>Dr:Breast-</strong> `;
				break;
			case "butt redistributors":
				r += `<strong>Dr:Butt-</strong> `;
				break;
			case "sag-B-gone":
				r += `<strong>Dr:AntiSag</strong> `;
				break;
			case "growth stimulants":
				r += `<strong>Dr:groStim</strong> `;
				break;
		}
		r += `</span> `;
		r += `<span class="lightgreen">`;
		if (child.curatives === 2) {
			r += `<strong>Cura</strong> `;
		} else if (child.curatives === 1) {
			r += `<strong>Prev</strong> `;
		}
		r += `</span> `;
		if (child.aphrodisiacs !== 0) {
			r += `<span class="lightblue">`;
			if (child.aphrodisiacs === 1) {
				r += `<strong>Aph</strong> `;
			} else if (child.aphrodisiacs === 2) {
				r += `<strong>Aph++</strong> `;
			} else {
				r += `<strong>Anaph</strong> `;
			}
			r += `</span> `;
		}
		if (child.addict !== 0) {
			r += `<span class="cyan">Add</span> `;
		}
		r += `<span class="lightsalmon">`;
		if (child.hormones > 1) {
			r += `<strong>Ho:F+</strong> `;
		} else if (child.hormones > 0) {
			r += `<strong>Ho:F</strong> `;
		} else if (child.hormones < -1) {
			r += `<strong>Ho:M+</strong> `;
		} else if (child.hormones < 0) {
			r += `<strong>Ho:M</strong> `;
		}
		r += `</span> `;
		r += `<span class="mediumseagreen">`;
		if ((child.bellyImplant > -1)) {
			r += `<strong>Belly Imp</strong> `;
		} else if (((child.preg <= -2) || (child.ovaries === 0)) && (child.vagina !== -1)) {
			r += `<strong>Barr</strong> `;
		} else if (child.pubertyXX === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `<strong>Prepub</strong> `;
		} else if (child.ovaryAge >= 47 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `<strong>Meno</strong> `;
		} else if (child.pregWeek < 0) {
			r += `<strong>Postpartum</strong> `;
		} else if (child.preg === -1) {
			r += `<strong>CC</strong> `;
		} else if (child.preg === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `<strong>Fert+</strong> `;
			// } else if (((child.preg < child.pregData.normalBirth / 10) && (child.preg > 0) && child.pregKnown === 0) || child.pregWeek === 1) {
			//	r += `<strong>Preg?</strong> `;
		} else if (child.preg >= 36) {
			r += `<strong>Perm preg</strong> `;
		} else if (child.pregKnown === 1) {
			r += `<strong>${child.pregWeek} wks preg</strong> `;
		}
		r += `</span> `;
		if (child.induce === 1) {
			r += `<span class="orange"><strong>Early Labor</strong></span> `;
		}
		if (child.pubertyXY === 0 && child.balls > 0) {
			r += `<strong>Prepub balls</strong> `;
		}
		if (child.balls > 0 && child.vasectomy === 1) {
			r += `<strong>Vasect</strong> `;
		}
		r += `<span class="springgreen">`;
		if (child.inflation === 3) {
			r += `<strong>8 ltr ${child.inflationType}</strong> `;
		} else if (child.inflation === 2) {
			r += `<strong>4 ltr ${child.inflationType}</strong> `;
		} else if (child.inflation === 1) {
			r += `<strong>2 ltr ${child.inflationType}</strong> `;
		} else if (child.bellyFluid > 0) {
			r += `<strong>${child.bellyFluid}ccs ${child.inflationType}</strong> `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDrugs(child) {
		if ((child.drugs !== "no drugs") && (child.drugs !== "none")) {
			r += `<span class="tan">On ${child.drugs}.</span> `;
		}
		r += `<span class="lightgreen">`;
		if (child.curatives === 2) {
			r += `On curatives. `;
		} else if (child.curatives === 1) {
			r += `On preventatives. `;
		}
		r += `</span> `;
		r += `<span class="lightblue">`;
		if (child.aphrodisiacs > 0) {
			r += `On ${child.aphrodisiacs > 1 ? 'extreme': ''} aphrodisiacs. `;
		} else if (child.aphrodisiacs === -1) {
			r += `On anaphrodisiacs. `;
		}
		r += `</span> `;
		if (child.addict !== 0) {
			r += `<span class="cyan">Addict.</span> `;
		}
		r += `<span class="lightsalmon">`;
		if (child.hormones > 1) {
			r += `Heavy female hormones. `;
		} else if (child.hormones > 0) {
			r += `Female hormones. `;
		} else if (child.hormones < -1) {
			r += `Heavy male hormones. `;
		} else if (child.hormones < 0) {
			r += `Male hormones. `;
		}
		r += `</span> `;
		r += `<span class="mediumseagreen">`;
		if ((child.bellyImplant > -1)) {
			r += `Belly Implant. `;
		} else if (((child.preg <= -2) || (child.ovaries === 0)) && (child.vagina !== -1)) {
			r += `Barren. `;
		} else if (child.pubertyXX === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `Not ovulating yet. `;
		} else if (child.ovaryAge >= 47 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `Menopausal. `;
		} else if (child.pregWeek < 0) {
			r += `Postpartum. `;
		} else if (child.preg === -1) {
			r += `On contraceptives. `;
		} else if (child.preg === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `Fertile. `;
		} else if (((child.preg < child.pregData.normalBirth / 10) && (child.preg > 0) && child.pregKnown === 0) || child.pregWeek === 1) {
			r += `May be pregnant. `;
		} else if (child.preg >= 36) {
			r += `Permanently pregnant. `;
		} else if (child.pregKnown === 1) {
			if (child.pregType < 2) {
				r += `${child.pregWeek} weeks pregnant. `;
			} else {
				r += `${child.pregWeek} weeks pregnant with `;
				if (child.pregType >= 40) {
					r += `a tremendous brood of offspring. `;
				} else if (child.pregType >= 20) {
					r += `a brood of offspring. `;
				} else if (child.pregType >= 10) {
					r += `${child.pregType} babies. `;
				} else if (child.pregType === 9) {
					r += `nonuplets. `;
				} else if (child.pregType === 8) {
					r += `octuplets. `;
				} else if (child.pregType === 7) {
					r += `septuplets. `;
				} else if (child.pregType === 6) {
					r += `sextuplets. `;
				} else if (child.pregType === 5) {
					r += `quintuplets. `;
				} else if (child.pregType === 4) {
					r += `quadruplets. `;
				} else if (child.pregType === 3) {
					r += `triplets. `;
				} else {
					r += `twins. `;
				}
			}
			if (child.preg > child.pregData.normalBirth) { // TODO: double check this
				r += ` (Overdue.)`;
			}
		}
		r += `</span> `;
		if (child.induce === 1) {
			r += `<span class="orange">Showing signs of early labor.</span> `;
		}
		if (child.pubertyXY === 0 && child.balls > 0) {
			r += `Has not had first ejaculation. `;
		}
		if (child.balls > 0 && child.vasectomy === 1) {
			r += `Vasectomy. `;
		}
		r += `<span class="springgreen">`;
		if (child.inflation === 3) {
			r += `Filled with 8 liters of ${child.inflationType}. `;
		} else if (child.inflation === 2) {
			r += `Filled with 4 liters of ${child.inflationType}. `;
		} else if (child.inflation === 1) {
			r += `Filled with 2 liters of ${child.inflationType}. `;
		} else if (child.bellyFluid > 0) {
			r += `Stuffed with ${child.bellyFluid}ccs of ${child.inflationType}. `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRace(child) {
		switch (child.race) {
			case "white":
				r += `C`;
				break;
			case "asian":
				r += `A`;
				break;
			case "indo-aryan":
				r += `I`;
				break;
			case "latina":
				r += `L`;
				break;
			case "middle eastern":
				r += `ME`;
				break;
			case "black":
				r += `B`;
				break;
			case "pacific islander":
				r += `PI`;
				break;
			case "malay":
				r += `M`;
				break;
			case "amerindian":
				r += `AI`;
				break;
			case "semitic":
				r += `S`;
				break;
			case "southern european":
				r += `SE`;
				break;
			case "mixed race":
				r += `MR`;
				break;
			default:
				r += `${child.race.charAt(0).toUpperCase() + child.race.charAt(1) + child.race.charAt(2)}`;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRace(child) {
		switch (child.race) {
			case "white":
				r += `Caucasian. `;
				break;
			case "asian":
				r += `Asian. `;
				break;
			case "indo-aryan":
				r += `Indo-aryan. `;
				break;
			case "latina":
				r += `Latina. `;
				break;
			case "middle eastern":
				r += `Middle Eastern. `;
				break;
			case "black":
				r += `Black. `;
				break;
			case "pacific islander":
				r += `Pacific Islander. `;
				break;
			case "malay":
				r += `Malay. `;
				break;
			case "amerindian":
				r += `Amerindian. `;
				break;
			case "semitic":
				r += `Semitic. `;
				break;
			case "southern european":
				r += `Southern European. `;
				break;
			case "mixed race":
				r += `Mixed race. `;
				break;
			default:
				r += `${child.race.charAt(0).toUpperCase() + child.race.slice(1)}. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortNationality(child) {
		r += `<span class="tan">`;
		switch (child.nationality) {
			case "Afghan":
				r += `Afg`;
				break;
			case "Albanian":
				r += `Alb`;
				break;
			case "Algerian":
				r += `Alg`;
				break;
			case "American":
				r += `USA`;
				break;
			case "Andorran":
				r += `And`;
				break;
			case "Angolan":
				r += `Ang`;
				break;
			case "Antiguan":
				r += `AB`;
				break;
			case "Argentinian":
				r += `Arg`;
				break;
			case "Armenian":
				r += `Arm`;
				break;
			case "Aruban":
				r += `Aru`;
				break;
			case "Australian":
				r += `Aus`;
				break;
			case "Austrian":
				r += `Aut`;
				break;
			case "Azerbaijani":
				r += `Aze`;
				break;
			case "Bahamian":
				r += `Bah`;
				break;
			case "Bahraini":
				r += `Bah`;
				break;
			case "Bangladeshi":
				r += `Bgd`;
				break;
			case "Barbadian":
				r += `Bar`;
				break;
			case "Belarusian":
				r += `Ber`;
				break;
			case "Belgian":
				r += `Bel`;
				break;
			case "Belizean":
				r += `Blz`;
				break;
			case "Beninese":
				r += `Ben`;
				break;
			case "Bermudian":
				r += `Bmd`;
				break;
			case "Bhutanese":
				r += `Bhu`;
				break;
			case "Bissau-Guinean":
				r += `GB`;
				break;
			case "Bolivian":
				r += `Bol`;
				break;
			case "Bosnian":
				r += `Bos`;
				break;
			case "Brazilian":
				r += `Bra`;
				break;
			case "British":
				r += `UK`;
				break;
			case "Bruneian":
				r += `Bru`;
				break;
			case "Bulgarian":
				r += `Bul`;
				break;
			case "Burkinabé":
				r += `BF`;
				break;
			case "Burmese":
				r += `Bur`;
				break;
			case "Burundian":
				r += `Bnd`;
				break;
			case "Cambodian":
				r += `Kam`;
				break;
			case "Cameroonian":
				r += `Cam`;
				break;
			case "Canadian":
				r += `Can`;
				break;
			case "Cape Verdean":
				r += `CV`;
				break;
			case "Catalan":
				r += `Cat`;
				break;
			case "Central African":
				r += `CAR`;
				break;
			case "Chadian":
				r += `Cha`;
				break;
			case "Chilean":
				r += `Chl`;
				break;
			case "Chinese":
				r += `Chi`;
				break;
			case "Colombian":
				r += `Col`;
				break;
			case "Comorian":
				r += `Com`;
				break;
			case "Congolese":
				r += `RC`;
				break;
			case "a Cook Islander":
				r += `CI`;
				break;
			case "Costa Rican":
				r += `CR`;
				break;
			case "Croatian":
				r += `Cro`;
				break;
			case "Cuban":
				r += `Cub`;
				break;
			case "Curaçaoan":
				r += `Cur`;
				break;
			case "Cypriot":
				r += `Cyp`;
				break;
			case "Czech":
				r += `Cze`;
				break;
			case "Danish":
				r += `Den`;
				break;
			case "Djiboutian":
				r += `Dji`;
				break;
			case "Dominican":
				r += `DR`;
				break;
			case "Dominiquais":
				r += `Dom`;
				break;
			case "Dutch":
				r += `Nld`;
				break;
			case "East Timorese":
				r += `ET`;
				break;
			case "Ecuadorian":
				r += `Ecu`;
				break;
			case "Egyptian":
				r += `Egy`;
				break;
			case "Emirati":
				r += `UAE`;
				break;
			case "Equatoguinean":
				r += `EG`;
				break;
			case "Eritrean":
				r += `Eri`;
				break;
			case "Estonian":
				r += `Est`;
				break;
			case "Ethiopian":
				r += `Eth`;
				break;
			case "Fijian":
				r += `Fij`;
				break;
			case "Filipina":
				r += `Phl`;
				break;
			case "Finnish":
				r += `Fin`;
				break;
			case "French":
				r += `Fra`;
				break;
			case "French Guianan":
				r += `FG`;
				break;
			case "French Polynesian":
				r += `FP`;
				break;
			case "Gabonese":
				r += `Gab`;
				break;
			case "Gambian":
				r += `Gam`;
				break;
			case "Georgian":
				r += `Geo`;
				break;
			case "German":
				r += `Ger`;
				break;
			case "Ghanan":
				r += `Gha`;
				break;
			case "Greek":
				r += `Gre`;
				break;
			case "Greenlandic":
				r += `Grn`;
				break;
			case "Grenadian":
				r += `Gda`;
				break;
			case "Guamanian":
				r += `Gua`;
				break;
			case "Guatemalan":
				r += `Gtm`;
				break;
			case "Guinean":
				r += `Gui`;
				break;
			case "Guyanese":
				r += `Guy`;
				break;
			case "Haitian":
				r += `Hai`;
				break;
			case "Honduran":
				r += `Hon`;
				break;
			case "Hungarian":
				r += `Hun`;
				break;
			case "I-Kiribati":
				r += `Kir`;
				break;
			case "Icelandic":
				r += `Ice`;
				break;
			case "Indian":
				r += `Ind`;
				break;
			case "Indonesian":
				r += `Idn`;
				break;
			case "Iranian":
				r += `Irn`;
				break;
			case "Iraqi":
				r += `Irq`;
				break;
			case "Irish":
				r += `Irl`;
				break;
			case "Israeli":
				r += `Isr`;
				break;
			case "Italian":
				r += `Ita`;
				break;
			case "Ivorian":
				r += `IC`;
				break;
			case "Jamaican":
				r += `Jam`;
				break;
			case "Japanese":
				r += `Jpn`;
				break;
			case "Jordanian":
				r += `Jor`;
				break;
			case "Kazakh":
				r += `Kaz`;
				break;
			case "Kenyan":
				r += `Ken`;
				break;
			case "Kittitian":
				r += `SKN`;
				break;
			case "Korean":
				r += `Kor`;
				break;
			case "Kosovan":
				r += `Kos`;
				break;
			case "Kurdish":
				r += `Kur`;
				break;
			case "Kuwaiti":
				r += `Kuw`;
				break;
			case "Kyrgyz":
				r += `Kyr`;
				break;
			case "Laotian":
				r += `Lao`;
				break;
			case "Latvian":
				r += `Lat`;
				break;
			case "Lebanese":
				r += `Lbn`;
				break;
			case "Liberian":
				r += `Lib`;
				break;
			case "Libyan":
				r += `Lby`;
				break;
			case "a Liechtensteiner":
				r += `Lie`;
				break;
			case "Lithuanian":
				r += `Lit`;
				break;
			case "Luxembourgian":
				r += `Lux`;
				break;
			case "Macedonian":
				r += `Mac`;
				break;
			case "Malagasy":
				r += `Mad`;
				break;
			case "Malawian":
				r += `Mwi`;
				break;
			case "Malaysian":
				r += `Mys`;
				break;
			case "Maldivian":
				r += `Mdv`;
				break;
			case "Malian":
				r += `Mal`;
				break;
			case "Maltese":
				r += `Mlt`;
				break;
			case "Marshallese":
				r += `MI`;
				break;
			case "Mauritanian":
				r += `Mta`;
				break;
			case "Mauritian":
				r += `Mts`;
				break;
			case "Mexican":
				r += `Mex`;
				break;
			case "Micronesian":
				r += `FSM`;
				break;
			case "Moldovan":
				r += `Mol`;
				break;
			case "Monégasque":
				r += `Mnc`;
				break;
			case "Mongolian":
				r += `Mon`;
				break;
			case "Montenegrin":
				r += `Mng`;
				break;
			case "Moroccan":
				r += `Mor`;
				break;
			case "Mosotho":
				r += `Les`;
				break;
			case "Motswana":
				r += `Bot`;
				break;
			case "Mozambican":
				r += `Moz`;
				break;
			case "Namibian":
				r += `Nam`;
				break;
			case "Nauruan":
				r += `Nau`;
				break;
			case "Nepalese":
				r += `Npl`;
				break;
			case "New Caledonian":
				r += `NC`;
				break;
			case "a New Zealander":
				r += `NZ`;
				break;
			case "Ni-Vanuatu":
				r += `Van`;
				break;
			case "Nicaraguan":
				r += `Nic`;
				break;
			case "Nigerian":
				r += `Nga`;
				break;
			case "Nigerien":
				r += `Ngr`;
				break;
			case "Niuean":
				r += `Niu`;
				break;
			case "Norwegian":
				r += `Nor`;
				break;
			case "Omani":
				r += `Omn`;
				break;
			case "Pakistani":
				r += `Pak`;
				break;
			case "Palauan":
				r += `Plu`;
				break;
			case "Palestinian":
				r += `Pal`;
				break;
			case "Panamanian":
				r += `Pan`;
				break;
			case "Papua New Guinean":
				r += `PNG`;
				break;
			case "Paraguayan":
				r += `Par`;
				break;
			case "Peruvian":
				r += `Per`;
				break;
			case "Polish":
				r += `Pol`;
				break;
			case "Portuguese":
				r += `Por`;
				break;
			case "Puerto Rican":
				r += `PR`;
				break;
			case "Qatari":
				r += `Qat`;
				break;
			case "Romanian":
				r += `Rom`;
				break;
			case "Russian":
				r += `Rus`;
				break;
			case "Rwandan":
				r += `Rwa`;
				break;
			case "Sahrawi":
				r += `Sah`;
				break;
			case "Saint Lucian":
				r += `SL`;
				break;
			case "Salvadoran":
				r += `ES`;
				break;
			case "Sammarinese":
				r += `SM`;
				break;
			case "Samoan":
				r += `Sam`;
				break;
			case "São Toméan":
				r += `STP`;
				break;
			case "Saudi":
				r += `Sau`;
				break;
			case "Scottish":
				r += `Sco`;
				break;
			case "Senegalese":
				r += `Sen`;
				break;
			case "Serbian":
				r += `Srb`;
				break;
			case "Seychellois":
				r += `Sey`;
				break;
			case "Sierra Leonean":
				r += `Sie`;
				break;
			case "Singaporean":
				r += `Sng`;
				break;
			case "Slovak":
				r += `Svk`;
				break;
			case "Slovene":
				r += `Svn`;
				break;
			case "a Solomon Islander":
				r += `SI`;
				break;
			case "Somali":
				r += `Som`;
				break;
			case "South African":
				r += `RSA`;
				break;
			case "South Sudanese":
				r += `SS`;
				break;
			case "Spanish":
				r += `Spa`;
				break;
			case "Sri Lankan":
				r += `Sri`;
				break;
			case "Sudanese":
				r += `Sud`;
				break;
			case "Surinamese":
				r += `Sur`;
				break;
			case "Swazi":
				r += `Swa`;
				break;
			case "Swedish":
				r += `Swe`;
				break;
			case "Swiss":
				r += `Swi`;
				break;
			case "Syrian":
				r += `Syr`;
				break;
			case "Taiwanese":
				r += `Tai`;
				break;
			case "Tajik":
				r += `Taj`;
				break;
			case "Tanzanian":
				r += `Tza`;
				break;
			case "Thai":
				r += `Tha`;
				break;
			case "Tibetan":
				r += `Tib`;
				break;
			case "Togolese":
				r += `Tog`;
				break;
			case "Tongan":
				r += `Ton`;
				break;
			case "Trinidadian":
				r += `TT`;
				break;
			case "Tunisian":
				r += `Tun`;
				break;
			case "Turkish":
				r += `Tur`;
				break;
			case "Turkmen":
				r += `Tkm`;
				break;
			case "Tuvaluan":
				r += `Tuv`;
				break;
			case "Ugandan":
				r += `Uga`;
				break;
			case "Ukrainian":
				r += `Ukr`;
				break;
			case "Uruguayan":
				r += `Uru`;
				break;
			case "Uzbek":
				r += `Uzb`;
				break;
			case "Vatican":
				r += `VC`;
				break;
			case "Venezuelan":
				r += `Ven`;
				break;
			case "Vietnamese":
				r += `Vnm`;
				break;
			case "Vincentian":
				r += `SVG`;
				break;
			case "Yemeni":
				r += `Yem`;
				break;
			case "Zairian":
				r += `DRC`;
				break;
			case "Zambian":
				r += `Zam`;
				break;
			case "Zimbabwean":
				if (child.race === "white") {
					r += `Rho`;
				} else {
					r += `Zwe`;
				}
				break;
			case "Ancient Chinese Revivalist":
				r += `Chi Rev`;
				break;
			case "Ancient Egyptian Revivalist":
				r += `Egy Rev`;
				break;
			case "Arabian Revivalist":
				r += `Ara Rev`;
				break;
			case "Aztec Revivalist":
				r += `Azt Rev`;
				break;
			case "Edo Revivalist":
				r += `Edo Rev`;
				break;
			case "Roman Revivalist":
				r += `Rom Rev`;
				break;
			case "":
			case "none":
			case "child":
			case "Stateless":
				r += `None`;
				break;
			default:
				r += `${child.nationality.charAt(0) + child.nationality.charAt(1) + child.nationality.charAt(2)}`;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longNationality(child) {
		r += `<span class="tan">`;
		switch (child.nationality) {
			case "a Cook Islander":
				r += `Cook Islander. `;
				break;
			case "a Liechtensteiner":
				r += `Liechtensteiner. `;
				break;
			case "a New Zealander":
				r += `New Zealander. `;
				break;
			case "a Solomon Islander":
				r += `Solomon Islander. `;
				break;
			case "Zimbabwean":
				if (child.race === "white") {
					r += `Rhodesian. `;
				} else {
					r += `${child.nationality}. `;
				}
				break;
			case "child":
			case "none":
			case "":
			case "Stateless":
				r += `Stateless. `;
				break;
			default:
				r += `${child.nationality}. `;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSkin(child) {
		r += `<span class="pink">`;
		switch (child.skin) {
			case "pure white":
				r += `P. Whi`;
				break;
			case "extremely fair":
				r += `E. Fai`;
				break;
			case "very fair":
				r += `V. Fai`;
				break;
			case "extremely pale":
				r += `E. Pal`;
				break;
			case "very pale":
				r += `V. Pal`;
				break;
			case "light brown":
				r += `L. Br`;
				break;
			case "dark brown":
				r += `D. Br`;
				break;
			case "light olive":
				r += `L. Oli`;
				break;
			case "dark olive":
				r += `D. Oli`;
				break;
			case "light beige":
				r += `L. Bei`;
				break;
			case "dark beige":
				r += `D. Bei`;
				break;
			case "tan":
				r += `Tan`;
				break;
			case "bronze":
				r += `Bron`;
				break;
			case "ebony":
				r += `Ebon`;
				break;
			case "pure black":
				r += `P. Bla`;
				break;
			case "dark":
			case "fair":
			case "pale":
				r += `${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)}`;
				break;
			default:
				r += `${child.skin.charAt(0).toUpperCase() + child.skin.charAt(1) + child.skin.charAt(2)}`;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortGenitals(child) {
		if (child.dick > 0) {
			r += `<span class="pink">`;
			if (child.balls === 0) {
				r += `Geld`;
			}
			if ((child.dick > 8) && (child.balls > 8)) {
				r += `Junk+++`;
			} else if ((child.dick > 5) && (child.balls > 5)) {
				r += `Junk++`;
			} else if ((child.dick > 4) && (child.balls > 4)) {
				r += `Junk+`;
			} else if ((child.dick > 3) && (child.balls > 3)) {
				r += `Junk`;
			} else if (child.dick > 8) {
				r += `Dick+++`;
			} else if (child.dick > 5) {
				r += `Dick++`;
			} else if (child.dick > 4) {
				r += `Dick+`;
			} else if (child.dick > 3) {
				r += `Dick`;
			} else if (child.balls > 10) {
				r += `Balls+++`;
			} else if (child.balls > 5) {
				r += `Balls++`;
			} else if (child.balls > 4) {
				r += `Balls+`;
			} else if (child.balls > 3) {
				r += `Balls`;
			}
			r += `</span> `;
		}
		if (child.vagina === 0) {
			r += `<span class="lime">VV</span> `;
		} else if (child.pregKnown === 1 && canWalk(child) && child.clothes === "no clothing" && child.shoes === "none") {
			r += `<span class="pink">NBP</span> `;
		}
		if (child.anus === 0) {
			r += ` <span class="lime">AV</span> `;
		}
		r += `<span class="pink">`;
		if ((child.vagina > 3) && (child.anus > 3)) {
			r += ` V++A++`;
		} else if ((child.vagina > 2) && (child.anus > 2)) {
			r += ` V+A+`;
		} else if (child.vagina > 3) {
			r += ` V++`;
		} else if (child.vagina > 2) {
			r += ` V+`;
		} else if (child.anus > 3) {
			r += ` A++`;
		} else if (child.anus > 2) {
			r += ` A+`;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longGenitals(child) {
		if (child.dick > 0) {
			r += `<span class="pink">`;
			if (child.balls === 0) {
				r += `Gelded. `;
			}
			if ((child.dick > 8) && (child.balls > 8)) {
				r += `Hyper dick & balls. `;
			} else if ((child.dick > 5) && (child.balls > 5)) {
				r += `Monster dick & balls. `;
			} else if ((child.dick > 4) && (child.balls > 4)) {
				r += `Huge dick & balls. `;
			} else if ((child.dick > 3) && (child.balls > 3)) {
				r += `Big dick & balls. `;
			} else if (child.dick > 8) {
				r += `Hyper dong. `;
			} else if (child.dick > 5) {
				r += `Monster dong. `;
			} else if (child.dick > 4) {
				r += `Huge dick. `;
			} else if (child.dick > 3) {
				r += `Big dick. `;
			} else if (child.balls > 8) {
				r += `Hyper balls. `;
			} else if (child.balls > 5) {
				r += `Monstrous balls. `;
			} else if (child.balls > 4) {
				r += `Huge balls. `;
			} else if (child.balls > 3) {
				r += `Big balls. `;
			}
			r += `</span> `;
		}
		if (child.vagina === 0) {
			r += `<span class="lime">Virgin.</span> `;
		} else if (child.pregKnown === 1 && canWalk(child) && child.clothes === "no clothing" && child.shoes === "none") {
			r += `<span class="pink">Naked, barefoot, and pregnant.</span> `;
		}
		if (child.anus === 0) {
			r += `<span class="lime">Anal virgin.</span> `;
		}
		r += `<span class="pink">`;
		if ((child.vagina > 3) && (child.anus > 3)) {
			r += `Blown out holes. `;
		} else if ((child.vagina > 2) && (child.anus > 2)) {
			r += `High mileage. `;
		} else if (child.vagina > 3) {
			r += `Cavernous pussy. `;
		} else if (child.vagina > 2) {
			r += `Loose pussy. `;
		} else if (child.anus > 3) {
			r += `Permagaped anus. `;
		} else if (child.anus > 2) {
			r += `Gaping anus. `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortAge(child) {
		r += `<span class="pink">`;
		if (V.showAgeDetail === 1) {
			r += child.actualAge;
		}
		if (child.actualAge !== child.physicalAge) {
			r += ` w ${child.physicalAge}y-bdy`;
		}
		if (child.visualAge !== child.physicalAge) {
			r += ` Lks${child.visualAge}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortFace(child) {
		if (child.face < -95) {
			r += `<span class="red">Face---${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face < -40) {
			r += `<span class="red">Face--${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face < -10) {
			r += `<span class="red">Face-${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face <= 10) {
			r += `Face${V.summaryStats ? `[${child.face}]` : ''}`;
		} else if (child.face <= 40) {
			r += `<span class="pink">Face+${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face <= 95) {
			r += `<span class="pink">Face++${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else {
			r += `<span class="pink">Face+++${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortEyes(child) {
		if (!canSee(slave)) {
			r += `<span class="red">Blind</span> `;
		} else if (!canSeePerfectly(slave)) {
			r += `<span class="yellow">Sight-</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortEars(child) {
		if (child.hears === -2) {
			r += `<span class="red">Deaf</span> `;
		} else if ((child.hears === -1) && (child.earwear !== "hearing aids")) {
			r += `<span class="yellow">Hearing-</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortLips(child) {
		if (child.lips > 95) {
			r += `Facepussy`;
		} else if (child.lips > 70) {
			r += `Lips+++${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else if (child.lips > 40) {
			r += `Lips++${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else if (child.lips > 20) {
			r += `Lips+${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else if (child.lips > 10) {
			r += `Lips${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else {
			r += `<span class="red">Lips-${V.summaryStats ? `[${child.lips}]` : ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortTeeth(child) {
		if (child.teeth === "crooked") {
			r += `<span class="yellow">Cr Teeth</span> `;
		} else if (child.teeth === "gapped") {
			r += `<span class="yellow">Gap</span> `;
		} else if (child.teeth === "cosmetic braces") {
			r += `Cos Braces`;
		} else if (child.teeth === "straightening braces") {
			r += `Braces`;
		} else if (child.teeth === "removable") {
			r += `Rem Teeth`;
		} else if (child.teeth === "pointy") {
			r += `Fangs`;
		} else if (child.teeth === "baby") {
			r += `Baby`;
		} else if (child.teeth === "mixed") {
			r += `Mixed`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortMuscles(child) {
		if (child.muscles > 95) {
			r += `Musc++${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > 50) {
			r += `Musc+${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > 5) {
			r += `Fit${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > -6) {
			r += `Soft${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > -31) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				r += `<span class="red">Weak</span>${V.summaryStats ? `[${child.muscles}]`: ''}`;
			} else {
				r += `Soft${V.summaryStats ? `[${child.muscles}]`: ''}`;
			}
		} else if (child.muscles > -96) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				r += `<span class="red">Weak+</span>${V.summaryStats ? `[${child.muscles}]`: ''}`;
			} else {
				r += `Soft+${V.summaryStats ? `[${child.muscles}]`: ''}`;
			}
		} else {
			r += `<span class="red">Weak++</span>${V.summaryStats ? `[${child.muscles}]`: ''}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortVoice(child) {
		if (child.voice === 0) {
			r += `<span class="red">Mute</span> `;
		} else {
			if (child.accent === 3) {
				r += `<span class="red">Acc--</span> `;
			} else if (child.accent === 2) {
				r += `Acc-`;
			} else if (child.accent === 4) {
				r += `Acc--`;
			} else if (child.accent === 1) {
				r += `<span class="pink">Acc</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortTitsAss(child) {
		r += `<span class="pink">`;
		if ((child.boobs >= 12000) && (child.butt > 9)) {
			r += `T&A+++`;
		} else if ((child.boobs > 4000) && (child.butt > 8)) {
			r += `T&A++`;
		} else if ((child.boobs > 2000) && (child.butt > 6)) {
			r += `T&A+`;
		} else if ((child.boobs > 800) && (child.butt > 4)) {
			r += `T&A`;
		} else if ((child.boobs < 500) && (child.butt < 3) && (child.weight <= 10) && (child.muscles <= 30)) {
			r += `Girlish`;
		} else if (child.boobs >= 12000) {
			r += `Boobs+++`;
		} else if (child.boobs > 4000) {
			r += `Boobs++`;
		} else if (child.boobs > 2000) {
			r += `Boobs+`;
		} else if (child.boobs > 800) {
			r += `Boobs`;
		} else if (child.butt > 9) {
			r += `Ass+++`;
		} else if (child.butt > 8) {
			r += `Ass++`;
		} else if (child.butt > 6) {
			r += `Ass+`;
		} else if (child.butt > 4) {
			r += `Ass`;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortHips(child) {
		r += `<span class="red">`;
		if (child.hips < -1) {
			if (child.butt > 2 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
				r += `Disp+`;
			}
		} else if (child.hips < 0) {
			if (child.butt > 4 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
				r += `Disp+`;
			}
		} else if (child.hips > 2) {
			if (child.butt <= 8) {
				r += `Disp-`;
			}
		} else if (child.hips > 1) {
			if (child.butt <= 3 && (V.arcologies[0].FSSlimnessEnthusiast === "unset" || (child.boobs >= 500))) {
				r += `Disp-`;
			}
		} else if (child.hips > 0) {
			if (child.butt > 8) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
					r += `Disp+`;
				}
			} else if (child.butt <= 2 && (V.arcologies[0].FSSlimnessEnthusiast === "unset" || (child.boobs >= 500))) {
				r += `Disp-`;
			}
		} else {
			if (child.butt > 6) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset")) {
					r += `Disp+`;
				}
			} else if (child.butt <= 1 && (V.arcologies[0].FSSlimnessEnthusiast === "unset" || (child.boobs >= 500))) {
				r += `Disp-`;
			}
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortWaist(child) {
		if (child.waist > 95) {
			r += `<span class="red">Wst---${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else if (child.waist > 40) {
			r += `<span class="red">Wst--${V.summaryStats ? `[${child.waist}]`: ''}</span> `;
		} else if (child.waist > 10) {
			r += `<span class="red">Wst-${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else if (child.waist >= -10) {
			r += `Wst${V.summaryStats ? `[${child.waist}]`: ''}`;
		} else if (child.waist >= -40) {
			r += `<span class="pink">Wst+${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else if (child.waist >= -95) {
			r += `<span class="pink">Wst++${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else {
			r += `<span class="pink">Wst+++${V.summaryStats ? `[${child.waist}]`: ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortImplants(child) {
		r += `<span class="pink">`;
		if ((child.boobsImplant === 0) && (child.buttImplant === 0) && (child.waist >= -95) && (child.lipsImplant === 0) && (child.faceImplant <= 5) && (child.bellyImplant === -1)) {
			r += `Natr`;
		} else {
			r += `Impl`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortLactation(child) {
		if (child.lactation === 1) {
			r += `Lact`;
		} else if (child.lactation === 2) {
			r += `Lact++`;
		}
	}

	// /**	TODO:
	//  * @param {App.Entity.SlaveState} child
	//  */
	// function shortMods(child) {
	// 	V.modScore = SlaveStatsChecker.modScore(child);
	// 	if (child.corsetPiercing === 0 && V.piercingScore < 3 && V.tatScore < 2) {
	// 		return;
	// 	} else if (V.modScore > 15 || (V.piercingScore > 8 && V.tatScore > 5)) {
	// 		r += `Mods++`;
	// 	} else if (V.modScore > 7) {
	// 		r += `Mods+`;
	// 	} else {
	// 		r += `Mods`;
	// 	}
	// 	if (!jQuery.isEmptyObject(child.brand)) {
	// 		r += `Br`;
	// 	}
	// }

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longAge(child) {
		r += `<span class="pink">`;
		if (V.showAgeDetail === 1) {
			r += `Age ` + `${num(child.actualAge)}` + `. `;
		} else if (child.actualAge >= 40) {
			r += `Forties. `;
		} else if (child.actualAge >= 35) {
			r += `Late thirties. `;
		} else if (child.actualAge >= 30) {
			r += `Early thirties. `;
		} else if (child.actualAge >= 25) {
			r += `Late twenties. `;
		} else if (child.actualAge >= 20) {
			r += `Early twenties. `;
		} else if (child.actualAge >= 19) {
			r += `Nineteen. `;
		} else if (child.actualAge >= 18) {
			r += `Eighteen. `;
		} else {
			r += `Underage. `;
		}
		/*
		 ** No NCS, then do the standard, However because of the wrinkes of Incubators, as long as visual age is greater
		 ** than or equal to physical age, we do the old physical body/Looks for fresh out of the can NCS slaves.
		 */
		if (((child.geneMods.NCS === 0) || (child.visualAge >= child.physicalAge))) {
			if (child.actualAge !== child.physicalAge) {
				r += `${child.physicalAge}` + ` year old body. `;
			}
			if (child.visualAge !== child.physicalAge) {
				r += `Looks ` + `${child.visualAge}` + `. `;
			}
		} else {
			/*
			 ** Now the rub. The use of physical Age for the year old body above, basically conflicts with the changes
			 ** that NCS introduces, so here to *distinguish* the changes, we use visual age with the 'year old body'
			 ** and appears, for exampChild release from incubator at age 10, Her summary would show, 'Age 0. 10
			 ** year old body.' But if she's given NCS a few weeks after release, while she's still before her first
			 ** birthday, it'll appear the same. But once her birthday fires, if we ran with the above code it would
			 ** say: 'Age 1. 11 year old body.' -- this conflicts with the way NCS works though, because she hasn't
			 ** visually aged, so our change here makes it say 'Age 1. Appears to have a 10 year old body.'
			 */
			r += `Appears to have a ` + `${child.visualAge}` + ` year old body. `;
		}
		if (child.geneMods.NCS === 1) {
			r += `(<span class="orange">NCS</span>) `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longFace(child) {
		if (child.face < -95) {
			r += `<span class="red">Very ugly${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face < -40) {
			r += `<span class="red">Ugly${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face < -10) {
			r += `<span class="red">Unattractive${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face <= 10) {
			r += `Average${V.summaryStats ? `[${child.face}]`: ''}`;
		} else if (child.face <= 40) {
			r += `<span class="pink">Attractive${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face <= 95) {
			r += `<span class="pink">Beautiful${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else {
			r += `<span class="pink">Very beautiful${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		}
		r += ` ${child.faceShape} face. `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longEyes(child) {
		if (!canSee(slave)) {
			r += `<span class="red">Blind.</span> `;
		} else if (!canSeePerfectly(slave)) {
			r += `<span class="yellow">Nearsighted.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longEars(child) {
		if (child.hears <= -2) {
			r += `<span class="red">Deaf.</span> `;
		} else if ((child.hears === -1) && (child.earwear !== "hearing aids")) {
			r += `<span class="yellow">Hard of hearing.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLips(child) {
		if (child.lips > 95) {
			r += `Facepussy${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 70) {
			r += `Huge lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 40) {
			r += `Big lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 20) {
			r += `Pretty lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 10) {
			r += `Normal lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else {
			r += `<span class="red">Thin lips${V.summaryStats ? `[${child.lips}]`: ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longTeeth(child) {
		if (child.teeth === "crooked") {
			r += `<span class="yellow">Crooked teeth.</span> `;
		} else if (child.teeth === "gapped") {
			r += `<span class="yellow">Tooth gap.</span> `;
		} else if (child.teeth === "cosmetic braces") {
			r += `Cosmetic braces. `;
		} else if (child.teeth === "straightening braces") {
			r += `Braces. `;
		} else if (child.teeth === "removable") {
			r += `Removable teeth. `;
		} else if (child.teeth === "pointy") {
			r += `Sharp fangs. `;
		} else if (child.teeth === "baby") {
			r += `Baby teeth. `;
		} else if (child.teeth === "mixed") {
			r += `Mixed teeth. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longMuscles(child) {
		if (child.muscles > 95) {
			r += `Hugely muscular${V.summaryStats ? `[${child.muscles}]` : ''}. `;
		} else if (child.muscles > 50) {
			r += `Muscular${V.summaryStats ? `[${child.muscles}]`: ''}. `;
		} else if (child.muscles > 5) {
			r += `Fit${V.summaryStats ? `[${child.muscles}]`: ''}. `;
		} else if (child.muscles > -6) {
			r += `Soft${V.summaryStats ? `[${child.muscles}]`: ''}. `;
		} else if (child.muscles > -31) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				r += `<span class="red">Weak${V.summaryStats ? `[${child.muscles}]`: ''}.</span> `;
			} else {
				r += `Weak${V.summaryStats ? `[${child.muscles}]`: ''}. `;
			}
		} else if (child.muscles > -96) {
			if (V.arcologies[0].FSPhysicalIdealist === "unset") {
				r += `<span class="red">Very weak${V.summaryStats ? `[${child.muscles}]`: ''}.</span> `;
			} else {
				r += `Very weak${V.summaryStats ? `[${child.muscles}]`: ''}. `;
			}
		} else {
			r += `<span class="red">Frail${V.summaryStats ? `[${child.muscles}]`: ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longVoice(child) {
		if (child.voice === 0) {
			r += `<span class="red">Mute.</span> `;
		} else {
			if (child.accent === 3) {
				r += `<span class="red">Bad accent.</span> `;
			} else if (child.accent === 4) {
				r += `<span class="red">No language skills.</span> `;
			} else if (child.accent === 2) {
				r += `Accent. `;
			} else if (child.accent === 1) {
				r += `<span class="pink">Cute accent.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longTitsAss(child) {
		r += `<span class="pink">`;
		if ((child.boobs >= 12000) && (child.butt > 9)) {
			r += `Hyper T&A. `;
		} else if ((child.boobs > 4000) && (child.butt > 8)) {
			r += `Enormous T&A. `;
		} else if ((child.boobs > 2000) && (child.butt > 6)) {
			r += `Huge T&A. `;
		} else if ((child.boobs > 800) && (child.butt > 4)) {
			r += `Big T&A. `;
		} else if ((child.boobs < 500) && (child.butt < 3) && (child.weight <= 10) && (child.muscles <= 30)) {
			r += `Girlish figure. `;
		} else if (child.boobs >= 12000) {
			r += `Immobilizing tits. `;
		} else if (child.boobs > 4000) {
			r += `Monstrous tits. `;
		} else if (child.boobs > 2000) {
			r += `Huge tits. `;
		} else if (child.boobs > 800) {
			r += `Big tits. `;
		} else if (child.butt > 9) {
			r += `Hyper ass. `;
		} else if (child.butt > 8) {
			r += `Titanic ass. `;
		} else if (child.butt > 6) {
			r += `Huge ass. `;
		} else if (child.butt > 4) {
			r += `Big ass. `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longHips(child) {
		r += `<span class="red">`;
		if (child.hips < -1) {
			if (child.butt > 2 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset")) {
				r += `Disproportionately big butt. `;
			}
		} else if (child.hips < 0) {
			if (child.butt > 4 && (V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset")) {
				r += `Disproportionately big butt. `;
			}
		} else if (child.hips > 2) {
			if (child.butt <= 8) {
				r += `Disproportionately small butt. `;
			}
		} else if (child.hips > 1) {
			if (child.butt <= 3 && ((V.arcologies[0].FSSlimnessEnthusiast === "unset") || (child.boobs >= 500))) {
				r += `Disproportionately small butt. `;
			}
		} else if (child.hips > 0) {
			if (child.butt > 8) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset")) {
					r += `Disproportionately big butt. `;
				}
			} else if (child.butt <= 2 && ((V.arcologies[0].FSSlimnessEnthusiast === "unset") || (child.boobs >= 500))) {
				r += `Disproportionately small butt. `;
			}
		} else {
			if (child.butt > 6) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || V.arcologies[0].FSTransformationFetishist === "unset") && (V.arcologies[0].FSHedonisticDecadence < 20 || V.arcologies[0].FSHedonisticDecadence === "unset") && (V.arcologies[0].FSAssetExpansionist < 20 || V.arcologies[0].FSAssetExpansionist === "unset")) {
					r += `Disproportionately big butt. `;
				}
			} else if (child.butt <= 1 && ((V.arcologies[0].FSSlimnessEnthusiast === "unset") || (child.boobs >= 500))) {
				r += `Disproportionately small butt. `;
			}
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longWaist(child) {
		if (child.waist > 95) {
			r += `<span class="red">Masculine waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist > 40) {
			r += `<span class="red">Ugly waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist > 10) {
			r += `<span class="red">Unattractive waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist >= -10) {
			r += `Average waist${V.summaryStats ? `[${child.waist}]`: ''}. `;
		} else if (child.waist >= -40) {
			r += `<span class="pink">Feminine waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist >= -95) {
			r += `<span class="pink">Hourglass waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else {
			r += `<span class="pink">Absurdly narrow waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longImplants(child) {
		r += `<span class="pink">`;
		if ((child.boobsImplant !== 0) || (child.buttImplant !== 0) || (child.lipsImplant !== 0) || (child.bellyImplant !== -1)) {
			r += `Implants. `;
		} else if ((child.faceImplant >= 30) || (child.waist < -95)) {
			r += `Surgery enhanced. `;
		} else {
			r += `All natural. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLactation(child) {
		if (child.lactation === 1) {
			r += `Lactating naturally. `;
		} else if (child.lactation === 2) {
			r += `Heavy lactation. `;
		}
	}

	// /**	TODO:
	//  * @param {App.Entity.SlaveState} child
	//  */
	// function longMods(child) {
	// 	V.modScorChildStatsChecker.modScore(child);
	// 	if (child.corsetPiercing === 0 && V.piercingScore < 3 && V.tatScore < 2) {
	// 		return;
	// 	} else if (V.modScore > 15 || (V.piercingScore > 8 && V.tatScore > 5)) {
	// 		r += `Extensive body mods. `;
	// 	} else if (V.modScore > 7) {
	// 		r += `Noticeable body mods. `;
	// 	} else {
	// 		r += `Light body mods. `;
	// 	}
	// }

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortIntelligence(child) {
		let intelligence = child.intelligence;
		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}
		if (child.fetish === "mindbroken") {
			return;
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 30) {
			if (intelligence >= 130) {
				r += `<span class="deepskyblue">I++++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I(e+)${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 15) {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I(e)${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		} else {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexSkills(child) {
		let SSkills = child.skill.anal + child.skill.oral;
		r += `<span class="aquamarine">`;
		if (((SSkills + child.skill.whoring + child.skill.entertainment) >= 400) && ((child.vagina < 0) || (child.skill.vaginal >= 100))) {
			r += `MSS`;
		} else {
			SSkills += child.skill.vaginal;
			SSkills = Math.trunc(SSkills);
			if (SSkills > 180) {
				r += `S++`;
			} else if ((SSkills > 120) && (child.vagina < 0)) {
				r += `Sh++`;
			} else if (SSkills > 90) {
				r += `S+`;
			} else if (SSkills > 30) {
				r += `S`;
			} else {
				r += `S-`;
			}
			if (V.summaryStats) {
				r += `[${SSkills}] `;
			}
			r += " ";
			if (child.skill.whoring >= 100) {
				r += `W+++`;
			} else if (child.skill.whoring > 60) {
				r += `W++`;
			} else if (child.skill.whoring > 30) {
				r += `W+`;
			} else if (child.skill.whoring > 10) {
				r += `W`;
			}
			if (child.skill.whoring > 10) {
				if (V.summaryStats) {
					r += `[${child.skill.whoring}] `;
				}
			}
			r += " ";
			if (child.skill.entertainment >= 100) {
				r += `E+++`;
			} else if (child.skill.entertainment > 60) {
				r += `E++`;
			} else if (child.skill.entertainment > 30) {
				r += `E+`;
			} else if (child.skill.entertainment > 10) {
				r += `E`;
			}
			if (child.skill.entertainment > 10) {
				if (V.summaryStats) {
					r += `[${child.skill.entertainment}] `;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortPrestige(child) {
		if (child.prestige > 0) {
			r += `<span class="green">`;
			if (child.prestige > 2) {
				r += `Prest++`;
			} else if (child.prestige === 2) {
				r += `Prest+`;
			} else if (child.prestige === 1) {
				r += `Prest`;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortPornPrestige(child) {
		if (child.pornPrestige > 0) {
			r += `<span class="green">`;
			if (child.pornPrestige > 2) {
				r += `PPrest++`;
			} else if (child.pornPrestige === 2) {
				r += `PPrest+`;
			} else if (child.pornPrestige === 1) {
				r += `PPrest`;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longIntelligence(child) {
		let intelligence = child.intelligence;
		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}
		if (child.fetish === "mindbroken") {
			return;
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 30) {
			if (intelligence >= 130) {
				r += `<span class="deepskyblue">Genius${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 95) {
				r += `<span class="deepskyblue">Brilliant, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">Very smart, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">Smart, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -15) {
				r += `Average intelligence, well educated${V.summaryStats ? `[${intelligence}]` : ''}. `;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">Slow, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">Very slow, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else {
				r += `<span class="orangered">Moronic, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			}
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 15) {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">Brilliant, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">Very smart, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">Smart, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -15) {
				r += `Average intelligence, educated${V.summaryStats ? `[${intelligence}]` : ''}. `;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">Slow, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">Very slow, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else {
				r += `<span class="orangered">Moronic, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			}
		} else {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">Brilliant${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">Very smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">Smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -15) {
				r += `Average intelligence${V.summaryStats ? `[${intelligence}]` : ''}. `;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">Slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">Very slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else {
				r += `<span class="orangered">Moronic${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexSkills(child) {
		let SSkills = (child.skill.anal + child.skill.oral);
		r += `<span class="aquamarine">`;
		if (((SSkills + child.skill.whoring + child.skill.entertainment) >= 400) && ((child.vagina < 0) || (child.skill.vaginal >= 100))) {
			r += `Masterful Whore. `;
		} else {
			SSkills += child.skill.vaginal;
			if (SSkills > 180) {
				r += `Sex master${V.summaryStats ? `[${Math.trunc(SSkills)}]`: ''}. `;
			} else if ((SSkills > 120) && (child.vagina < 0)) {
				r += `Masterful shemale${V.summaryStats ? `[${Math.trunc(SSkills)}]`: ''}. `;
			} else if (SSkills > 90) {
				r += `Sexual expert${V.summaryStats ? `[${Math.trunc(SSkills)}]`: ''}. `;
			} else if (SSkills > 30) {
				r += `Sexually skilled${V.summaryStats ? `[${Math.trunc(SSkills)}]` : ''}. `;
			} else {
				r += `Sexually unskilled${V.summaryStats ? `[${Math.trunc(SSkills)}]` : ''}. `;
			}
			r += " ";
			if (child.skill.whoring >= 100) {
				r += `Masterful whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			} else if (child.skill.whoring >= 60) {
				r += `Expert whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			} else if (child.skill.whoring >= 30) {
				r += `Skilled whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			} else if (child.skill.whoring >= 10) {
				r += `Basic whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			}
			r += " ";
			if (child.skill.entertainment >= 100) {
				r += `Masterful entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			} else if (child.skill.entertainment >= 60) {
				r += `Expert entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			} else if (child.skill.entertainment >= 30) {
				r += `Skilled entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			} else if (child.skill.entertainment >= 10) {
				r += `Basic entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longPrestige(child) {
		if (child.prestige > 0) {
			r += `<span class="green">`;
			if (child.prestige > 2) {
				r += `Extremely prestigious. `;
			} else if (child.prestige === 2) {
				r += `Very prestigious. `;
			} else if (child.prestige === 1) {
				r += `Prestigious. `;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longPornPrestige(child) {
		if (child.pornPrestige > 0) {
			r += `<span class="green">`;
			if (child.pornPrestige > 2) {
				r += `Porn star. `;
			} else if (child.pornPrestige === 2) {
				r += `Porn slut. `;
			} else if (child.pornPrestige === 1) {
				r += `Porn amateur. `;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortFetish(child) {
		r += `<span class="lightcoral">`;
		switch (child.fetish) {
			case "submissive":
				if (child.fetishStrength > 95) {
					r += `Sub++`;
				} else if (child.fetishStrength > 60) {
					r += `Sub+`;
				} else {
					r += `Sub`;
				}
				break;
			case "cumslut":
				if (child.fetishStrength > 95) {
					r += `Oral++`;
				} else if (child.fetishStrength > 60) {
					r += `Oral+`;
				} else {
					r += `Oral`;
				}
				break;
			case "humiliation":
				if (child.fetishStrength > 95) {
					r += `Humil++`;
				} else if (child.fetishStrength > 60) {
					r += `Humil+`;
				} else {
					r += `Humil`;
				}
				break;
			case "buttslut":
				if (child.fetishStrength > 95) {
					r += `Anal++`;
				} else if (child.fetishStrength > 60) {
					r += `Anal+`;
				} else {
					r += `Anal`;
				}
				break;
			case "boobs":
				if (child.fetishStrength > 95) {
					r += `Boobs++`;
				} else if (child.fetishStrength > 60) {
					r += `Boobs+`;
				} else {
					r += `Boobs`;
				}
				break;
			case "sadist":
				if (child.fetishStrength > 95) {
					r += `Sadist++`;
				} else if (child.fetishStrength > 60) {
					r += `Sadist+`;
				} else {
					r += `Sadist`;
				}
				break;
			case "masochist":
				if (child.fetishStrength > 95) {
					r += `Pain++`;
				} else if (child.fetishStrength > 60) {
					r += `Pain+`;
				} else {
					r += `Pain`;
				}
				break;
			case "dom":
				if (child.fetishStrength > 95) {
					r += `Dom++`;
				} else if (child.fetishStrength > 60) {
					r += `Dom+`;
				} else {
					r += `Dom`;
				}
				break;
			case "pregnancy":
				if (child.fetishStrength > 95) {
					r += `Preg++`;
				} else if (child.fetishStrength > 60) {
					r += `Preg+`;
				} else {
					r += `Preg`;
				}
				break;
			default:
				r += `Vanilla`;
				break;
		}
		if (V.summaryStats) {
			r += `[${child.fetishStrength}]`;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortAttraction(child) {
		if (child.attrXY <= 5) {
			r += `<span class="red">XY---${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 15) {
			r += `<span class="red">XY--${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 35) {
			r += `<span class="red">XY-${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 65) {
			r += `XY${V.summaryStats ? `[${child.attrXY}]`: ''}`;
		} else if (child.attrXY <= 85) {
			r += `<span class="green">XY+${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">XY++${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXX > 95) {
			if (child.energy <= 95) {
				r += `<span class="green">Omni!</span> `;
			} else {
				r += `<span class="green">Omni+Nympho!!</span> `;
			}
		} else {
			r += `<span class="green">XY+++${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		}
		if (child.attrXX <= 5) {
			r += `<span class="red">XX---${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 15) {
			r += `<span class="red">XX--${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 35) {
			r += `<span class="red">XX-${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 65) {
			r += `XX${V.summaryStats ? `[${child.attrXX}]`: ''}`;
		} else if (child.attrXX <= 85) {
			r += `<span class="green">XX+${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 95) {
			r += `<span class="green">XX++${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">XX+++${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		}
		if (child.energy > 95) {
			if ((child.attrXY <= 95) || (child.attrXX <= 95)) {
				r += `<span class="green">Nympho!</span> `;
			}
		} else if (child.energy > 80) {
			r += `<span class="green">SD++${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else if (child.energy > 60) {
			r += `<span class="green">SD+${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else if (child.energy > 40) {
			r += `<span class="yellow">SD${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else if (child.energy > 20) {
			r += `<span class="red">SD-${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else {
			r += `<span class="red">SD--${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSmartFetish(child) {
		if (child.fetishKnown === 1) {
			if (child.clitSetting === "off") {
				r += `SP-`;
			} else if (((child.fetish !== "submissive") || (child.fetishStrength <= 95)) && (child.clitSetting === "submissive")) {
				r += `SP:sub`;
			} else if (((child.fetish !== "cumslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "oral")) {
				r += `SP:oral`;
			} else if (((child.fetish !== "humiliation") || (child.fetishStrength <= 95)) && (child.clitSetting === "humiliation")) {
				r += `SP:humil`;
			} else if (((child.fetish !== "buttslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "anal")) {
				r += `SP:anal`;
			} else if (((child.fetish !== "boobs") || (child.fetishStrength <= 95)) && (child.clitSetting === "boobs")) {
				r += `SP:boobs`;
			} else if (((child.fetish !== "sadist") || (child.fetishStrength <= 95)) && (child.clitSetting === "sadist")) {
				r += `SP:sade`;
			} else if (((child.fetish !== "masochist") || (child.fetishStrength <= 95)) && (child.clitSetting === "masochist")) {
				r += `SP:pain`;
			} else if (((child.fetish !== "dom") || (child.fetishStrength <= 95)) && (child.clitSetting === "dom")) {
				r += `SP:dom`;
			} else if (((child.fetish !== "pregnancy") || (child.fetishStrength <= 95)) && (child.clitSetting === "pregnancy")) {
				r += `SP:preg`;
			} else if (((child.fetish !== "none") && (child.clitSetting === "vanilla"))) {
				r += `SP:vanilla`;
			} else if ((child.energy <= 95) && (child.clitSetting === "all")) {
				r += `SP:all`;
			} else if ((child.energy > 5) && (child.clitSetting === "none")) {
				r += `SP:none`;
			} else if (!["women", "men", "anti-women", "anti-men"].includes(child.clitSetting)) {
				r += `SP:monitoring`;
			}
		} else {
			switch (child.clitSetting) {
				case "off":
					r += `SP-`;
					break;
				case "submissive":
					r += `SP:sub`;
					break;
				case "lesbian":
					r += `SP:les`;
					break;
				case "oral":
					r += `SP:oral`;
					break;
				case "humiliation":
					r += `SP:humil`;
					break;
				case "anal":
					r += `SP:anal`;
					break;
				case "boobs":
					r += `SP:boobs`;
					break;
				case "sadist":
					r += `SP:sade`;
					break;
				case "masochist":
					r += `SP:pain`;
					break;
				case "dom":
					r += `SP:dom`;
					break;
				case "pregnancy":
					r += `SP:pregnancy`;
					break;
				case "vanilla":
					r += `SP:vanilla`;
					break;
				case "all":
					r += `SP:all`;
					break;
				case "none":
					r += `SP:none`;
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSmartAttraction(child) {
		if (child.attrKnown === 1) {
			if (child.clitSetting === "women") {
				if (child.attrXX < 95) {
					r += `SP:women`;
				} else {
					r += `SP:monitoring`;
				}
			} else if (child.clitSetting === "men") {
				if (child.attrXY < 95) {
					r += `SP:men`;
				} else {
					r += `SP:monitoring`;
				}
			} else if (child.clitSetting === "anti-women") {
				if (child.attrXX > 0) {
					r += `SP:anti-women`;
				} else {
					r += `SP:monitoring`;
				}
			} else if (child.clitSetting === "anti-men") {
				if (child.attrXY > 0) {
					r += `SP:anti-men`;
				} else {
					r += `SP:monitoring`;
				}
			}
		} else {
			if (child.clitSetting === "women") {
				r += `SP:women`;
			} else if (child.clitSetting === "men") {
				r += `SP:men`;
			} else if (child.clitSetting === "anti-women") {
				r += `SP:anti-women`;
			} else if (child.clitSetting === "anti-men") {
				r += `SP:anti-men`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortBehaviorFlaw(child) {
		r += `<span class="red">`;
		switch (child.behavioralFlaw) {
			case "arrogant":
				r += `Arrog`;
				break;
			case "bitchy":
				r += `Bitchy`;
				break;
			case "odd":
				r += `Odd`;
				break;
			case "hates men":
				r += `Men-`;
				break;
			case "hates women":
				r += `Women-`;
				break;
			case "gluttonous":
				r += `Glut`;
				break;
			case "anorexic":
				r += `Ano`;
				break;
			case "devout":
				r += `Dev`;
				break;
			case "liberated":
				r += `Lib`;
				break;
			default:
				child.behavioralFlaw = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexFlaw(child) {
		switch (child.sexualFlaw) {
			case "hates oral":
				r += `<span class="red">Oral-</span> `;
				break;
			case "hates anal":
				r += `<span class="red">Anal-</span> `;
				break;
			case "hates penetration":
				r += `<span class="red">Fuck-</span> `;
				break;
			case "shamefast":
				r += `<span class="red">Shame</span> `;
				break;
			case "idealistic":
				r += `<span class="red">Ideal</span> `;
				break;
			case "repressed":
				r += `<span class="red">Repre</span> `;
				break;
			case "apathetic":
				r += `<span class="red">Apath</span> `;
				break;
			case "crude":
				r += `<span class="red">Crude</span> `;
				break;
			case "judgemental":
				r += `<span class="red">Judge</span> `;
				break;
			case "cum addict":
				r += `<span class="yellow">CumAdd</span> `;
				break;
			case "anal addict":
				r += `<span class="yellow">AnalAdd</span> `;
				break;
			case "attention whore":
				r += `<span class="yellow">Attention</span> `;
				break;
			case "breast growth":
				r += `<span class="yellow">BoobObsess</span> `;
				break;
			case "abusive":
				r += `<span class="yellow">Abusive</span> `;
				break;
			case "malicious":
				r += `<span class="yellow">Malice</span> `;
				break;
			case "self hating":
				r += `<span class="yellow">SelfHatr</span> `;
				break;
			case "neglectful":
				r += `<span class="yellow">SelfNeglect</span> `;
				break;
			case "breeder":
				r += `<span class="yellow">BreedObsess</span> `;
				break;
			default:
				child.sexualFlaw = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortBehaviorQuirk(child) {
		r += `<span class="green">`;
		switch (child.behavioralQuirk) {
			case "confident":
				r += `Confid`;
				break;
			case "cutting":
				r += `Cutting`;
				break;
			case "funny":
				r += `Funny`;
				break;
			case "fitness":
				r += `Fit`;
				break;
			case "adores women":
				r += `Women+`;
				break;
			case "adores men":
				r += `Men+`;
				break;
			case "insecure":
				r += `Insec`;
				break;
			case "sinful":
				r += `Sinf`;
				break;
			case "advocate":
				r += `Advoc`;
				break;
			default:
				child.behavioralQuirk = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexQuirk(child) {
		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `Gagfuck`;
				break;
			case "painal queen":
				r += `Painal`;
				break;
			case "strugglefuck queen":
				r += `Struggle`;
				break;
			case "tease":
				r += `Tease`;
				break;
			case "romantic":
				r += `Romantic`;
				break;
			case "perverted":
				r += `Perverted`;
				break;
			case "caring":
				r += `Caring`;
				break;
			case "unflinching":
				r += `Unflinch`;
				break;
			case "size queen":
				r += `SizeQ`;
				break;
			default:
				child.sexualQuirk = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longFetish(child) {
		r += `<span class="lightcoral">`;
		switch (child.fetish) {
			case "submissive":
				if (child.fetishStrength > 95) {
					r += `Complete submissive${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Submissive${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Submissive tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "cumslut":
				if (child.fetishStrength > 95) {
					r += `Cumslut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Oral fixation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Prefers oral${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "humiliation":
				if (child.fetishStrength > 95) {
					r += `Humiliation slut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Exhibitionist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Interest in humiliation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "buttslut":
				if (child.fetishStrength > 95) {
					r += `Buttslut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Anal fixation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Prefers anal${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "boobs":
				if (child.fetishStrength > 95) {
					r += `Boobslut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Breast fixation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Loves boobs${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "sadist":
				if (child.fetishStrength > 95) {
					r += `Complete sadist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Sadist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Sadistic tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "masochist":
				if (child.fetishStrength > 95) {
					r += `Complete masochist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Masochist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Masochistic tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "dom":
				if (child.fetishStrength > 95) {
					r += `Complete dom${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Dominant${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Dominant tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "pregnancy":
				if (child.fetishStrength > 95) {
					r += `Pregnancy fetish ${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Pregnancy kink${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Interest in impregnation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			default:
				r += `Sexually vanilla${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longAttraction(child) {
		if (child.attrXY <= 5) {
			r += `<span class="red">Disgusted by men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 15) {
			r += `<span class="red">Turned off by men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 35) {
			r += `<span class="red">Not attracted to men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 65) {
			r += `Indifferent to men${V.summaryStats ? `[${child.attrXY}]` : ''}, `;
		} else if (child.attrXY <= 85) {
			r += `<span class="green">Attracted to men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">Aroused by men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXX > 95) {
			if (child.energy <= 95) {
				r += `<span class="green">Omnisexual!</span> `;
			} else {
				r += `<span class="green">Omnisexual nymphomaniac!</span> `;
			}
		} else {
			r += `<span class="green">Passionate about men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		}
		if (child.attrXX <= 5) {
			r += `<span class="red">disgusted by women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 15) {
			r += `<span class="red">turned off by women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 35) {
			r += `<span class="red">not attracted to women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 65) {
			r += `indifferent to women${V.summaryStats ? `[${child.attrXX}]` : ''}. `;
		} else if (child.attrXX <= 85) {
			r += `<span class="green">attracted to women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 95) {
			r += `<span class="green">aroused by women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">passionate about women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		}
		if (child.energy > 95) {
			if ((child.attrXY <= 95) || (child.attrXX <= 95)) {
				r += `<span class="green">Nymphomaniac!</span> `;
			}
		} else if (child.energy > 80) {
			r += `<span class="green">Powerful sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else if (child.energy > 60) {
			r += `<span class="green">Good sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else if (child.energy > 40) {
			r += `<span class="yellow">Average sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else if (child.energy > 20) {
			r += `<span class="red">Poor sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else {
			r += `<span class="red">No sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSmartFetish(child) {
		if (child.fetishKnown === 1) {
			if (child.clitSetting === "off") {
				r += `SP off. `;
			} else if (((child.fetish !== "submissive") || (child.fetishStrength <= 95)) && (child.clitSetting === "submissive")) {
				r += `SP: submissive. `;
			} else if (((child.fetish !== "cumslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "oral")) {
				r += `SP: oral. `;
			} else if (((child.fetish !== "humiliation") || (child.fetishStrength <= 95)) && (child.clitSetting === "humiliation")) {
				r += `SP: humiliation. `;
			} else if (((child.fetish !== "buttslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "anal")) {
				r += `SP: anal. `;
			} else if (((child.fetish !== "boobs") || (child.fetishStrength <= 95)) && (child.clitSetting === "boobs")) {
				r += `SP: breasts. `;
			} else if (((child.fetish !== "sadist") || (child.fetishStrength <= 95)) && (child.clitSetting === "sadist")) {
				r += `SP: sadism. `;
			} else if (((child.fetish !== "masochist") || (child.fetishStrength <= 95)) && (child.clitSetting === "masochist")) {
				r += `SP: masochism. `;
			} else if (((child.fetish !== "dom") || (child.fetishStrength <= 95)) && (child.clitSetting === "dom")) {
				r += `SP: dominance. `;
			} else if (((child.fetish !== "pregnancy") || (child.fetishStrength <= 95)) && (child.clitSetting === "pregnancy")) {
				r += `SP: pregnancy. `;
			} else if ((child.fetish !== "none") && (child.clitSetting === "vanilla")) {
				r += `SP: vanilla. `;
			} else if ((child.energy <= 95) && (child.clitSetting === "all")) {
				r += `SP: all. `;
			} else if ((child.energy > 5) && (child.clitSetting === "none")) {
				r += `SP: none. `;
			} else if (!["women", "men", "anti-women", "anti-men"].includes(child.clitSetting)) {
				r += `SP: monitoring. `;
			}
		} else {
			switch (child.clitSetting) {
				case "off":
					r += `SP off. `;
					break;
				case "submissive":
					r += `SP: submissive. `;
					break;
				case "oral":
					r += `SP: oral. `;
					break;
				case "humiliation":
					r += `SP: humiliation. `;
					break;
				case "anal":
					r += `SP: anal. `;
					break;
				case "boobs":
					r += `SP: breasts. `;
					break;
				case "sadist":
					r += `SP: sadism. `;
					break;
				case "masochist":
					r += `SP: masochism. `;
					break;
				case "dom":
					r += `SP: dominance. `;
					break;
				case "pregnancy":
					r += `SP: pregnancy. `;
					break;
				case "vanilla":
					r += `SP: vanilla. `;
					break;
				case "all":
					r += `SP: all. `;
					break;
				case "none":
					r += `SP: none. `;
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSmartAttraction(child) {
		if (child.attrKnown === 1) {
			if ((child.attrXX < 100) && (child.clitSetting === "women")) {
				r += `SP: women. `;
			} else if ((child.attrXY < 100) && (child.clitSetting === "men")) {
				r += `SP: men. `;
			}
		} else {
			if (child.clitSetting === "women") {
				r += `SP: women. `;
			} else if (child.clitSetting === "men") {
				r += `SP: men. `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBehaviorFlaw(child) {
		r += `<span class="red">`;
		switch (child.behavioralFlaw) {
			case "arrogant":
				r += `Arrogant. `;
				break;
			case "bitchy":
				r += `Bitchy. `;
				break;
			case "odd":
				r += `Odd. `;
				break;
			case "hates men":
				r += `Hates men. `;
				break;
			case "hates women":
				r += `Hates women. `;
				break;
			case "gluttonous":
				r += `Stress eater. `;
				break;
			case "anorexic":
				r += `Anorexic. `;
				break;
			case "devout":
				r += `Devoutly religious. `;
				break;
			case "liberated":
				r += `Mentally liberated. `;
				break;
			default:
				child.behavioralFlaw = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexFlaw(child) {
		switch (child.sexualFlaw) {
			case "hates oral":
				r += `<span class="red">Hates oral.</span> `;
				break;
			case "hates anal":
				r += `<span class="red">Hates anal.</span> `;
				break;
			case "hates penetration":
				r += `<span class="red">Hates penetration.</span> `;
				break;
			case "shamefast":
				r += `<span class="red">Shamefast.</span> `;
				break;
			case "idealistic":
				r += `<span class="red">Sexually idealistic.</span> `;
				break;
			case "repressed":
				r += `<span class="red">Sexually repressed.</span> `;
				break;
			case "apathetic":
				r += `<span class="red">Sexually apathetic.</span> `;
				break;
			case "crude":
				r += `<span class="red">Sexually crude.</span> `;
				break;
			case "judgemental":
				r += `<span class="red">Sexually judgemental.</span> `;
				break;
			case "cum addict":
				r += `<span class="yellow">Cum addict.</span> `;
				break;
			case "anal addict":
				r += `<span class="yellow">Anal addict.</span> `;
				break;
			case "attention whore":
				r += `<span class="yellow">Attention whore.</span> `;
				break;
			case "breast growth":
				r += `<span class="yellow">Breast obsession.</span> `;
				break;
			case "abusive":
				r += `<span class="yellow">Sexually abusive.</span> `;
				break;
			case "malicious":
				r += `<span class="yellow">Sexually malicious.</span> `;
				break;
			case "self hating":
				r += `<span class="yellow">Self hatred.</span> `;
				break;
			case "neglectful":
				r += `<span class="yellow">Self neglectful.</span> `;
				break;
			case "breeder":
				r += `<span class="yellow">Breeding obsession.</span> `;
				break;
			default:
				child.sexualFlaw = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBehaviorQuirk(child) {
		r += `<span class="green">`;
		switch (child.behavioralQuirk) {
			case "confident":
				r += `Confident. `;
				break;
			case "cutting":
				r += `Cutting. `;
				break;
			case "funny":
				r += `Funny. `;
				break;
			case "fitness":
				r += `Fitness. `;
				break;
			case "adores women":
				r += `Adores women. `;
				break;
			case "adores men":
				r += `Adores men. `;
				break;
			case "insecure":
				r += `Insecure. `;
				break;
			case "sinful":
				r += `Sinful. `;
				break;
			case "advocate":
				r += `Advocate. `;
				break;
			default:
				child.behavioralQuirk = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexQuirk(child) {
		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `Gagfuck queen. `;
				break;
			case "painal queen":
				r += `Painal queen. `;
				break;
			case "strugglefuck queen":
				r += `Strugglefuck queen. `;
				break;
			case "tease":
				r += `Tease. `;
				break;
			case "romantic":
				r += `Romantic. `;
				break;
			case "perverted":
				r += `Perverted. `;
				break;
			case "caring":
				r += `Caring. `;
				break;
			case "unflinching":
				r += `Unflinching. `;
				break;
			case "size queen":
				r += `Size queen. `;
				break;
			default:
				child.sexualQuirk = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortExtendedFamily(child) {
		let handled = 0;
		if (child.mother > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.mother === -1) {
			r += `Your daughter`;
			if (child.relationship < -1) {
				res += ` & ${PCrelationshipTerm(child)}`;
				handled = 1;
			}
			r += " ";
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s daughter `;
		}
		if (child.father > 0 && child.father !== child.mother) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.father === -1 && child.mother !== -1) {
			r += `Your daughter`;
			if (child.relationship < -1) {
				res += ` & ${PCrelationshipTerm(child)}`;
				handled = 1;
			}
			r += " ";
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s daughter`;
		}
		if (child.daughters === 1) {
			let _ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s mother`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
			_ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s father`;
				if (child.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.daughters > 1) {
			r += `multiple daughters `;
		}
		if (child.sisters === 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s sister`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += `& ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.sisters > 1) {
			r += `multiple sisters `;
		}
		if (child.relationship > 0 && handled !== 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s`;
				const friendShipShort = relationshipTermShort(child);
				r += ` ${friendShipShort}`;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `Your wife`;
		} else if (child.relationship === -2) {
			r += `E Bonded`;
		} else if (child.relationship === -1) {
			r += `E Slut`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortLegacyFamily(child) {
		if (child.relation !== 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationTarget;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s ${child.relation}`;
			}
		}
		if (child.relationship > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				const friendship = relationshipTerm(child);
				if (child.relationshipTarget !== child.relationTarget) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s`;
				} else {
					r += ` &`;
				}
				r += ` ${friendship}`;
			}
		} else if (child.relationship === -3) {
			r += `Your wife`;
		} else if (child.relationship === -2) {
			r += `E Bonded`;
		} else if (child.relationship === -1) {
			r += `E Slut`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortClone(child) {
		if (child.clone !== 0) {
			r += ` Clone`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRival(child) {
		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (_ssj !== -1) {
				r += `<span class="lightsalmon">`;
				if (child.rivalry <= 1) {
					r += `Disl ${SlaveFullName(V.slaves[_ssj])}`;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s rival`;
				} else {
					r += `Hates ${SlaveFullName(V.slaves[_ssj])}`;
				}
				r += `</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longExtendedFamily(child) {
		let handled = 0;
		if (child.mother > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.mother === -1) {
			r += `Your `;
			if (child.relationship < -1) {
				r += `<span class="lightgreen">daughter and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">daughter.</span> `;
			}
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s <span class="lightgreen">daughter.</span> `;
		}
		if (child.father > 0 && child.father !== child.mother) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.father === -1 && child.father !== child.mother) {
			r += `Your `;
			if (child.relationship < -1) {
				r += `<span class="lightgreen">daughter and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">daughter.</span> `;
			}
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s <span class="lightgreen">daughter.</span> `;
		}
		if (child.daughters === 1) {
			let _ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">mother`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
			_ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">father`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.daughters > 1) {
			if (child.daughters > 10) {
				r += `<span class="lightgreen">Has tons of daughters.</span> `;
			} else if (child.daughters > 5) {
				r += `<span class="lightgreen">Has many daughters.</span> `;
			} else {
				r += `<span class="lightgreen">Has several daughters.</span> `;
			}
		}
		if (child.sisters === 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">sister`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.sisters > 1) {
			if (child.sisters > 10) {
				r += `<span class="lightgreen">One of many sisters.</span> `;
			} else if (child.sisters > 5) {
				r += `<span class="lightgreen">Has many sisters.</span> `;
			} else {
				r += `<span class="lightgreen">Has several sisters.</span> `;
			}
		}
		if (child.relationship > 0 && handled !== 1) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				const friendship = relationshipTerm(child);
				r += `${SlaveFullName(V.slaves[_ssj])}'s `;
				r += `<span class="lightgreen">${friendship}.</span> `;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `<span class="lightgreen">Your wife.</span> `;
		} else if (child.relationship === -2) {
			r += `<span class="lightgreen">Emotionally bonded to you.</span> `;
		} else if (child.relationship === -1) {
			r += `<span class="lightgreen">Emotional slut.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLegacyFamily(child) {
		if (child.relation !== 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationTarget;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s `;
				if (child.relationshipTarget !== child.relationTarget) {
					r += `<span class="lightgreen">${child.relation}.</span> `;
				} else {
					r += `<span class="lightgreen">${child.relation}</span> `;
				}
				if (child.relationship <= 0) {
					r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
				}
			}
		}
		if (child.relationship > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				const friendship = relationshipTerm(child);
				if (child.relationshipTarget !== child.relationTarget) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s `;
				} else {
					r += ` and `;
				}
				r += `<span class="lightgreen">${friendship}.</span> `;
			}
		} else if (child.relationship === -3) {
			r += `<span class="lightgreen">Your wife.</span> `;
		} else if (child.relationship === -2) {
			r += `<span class="lightgreen">Emotionally bonded to you.</span> `;
		} else if (child.relationship === -1) {
			r += `<span class="lightgreen">Emotional slut.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longClone(child) {
		if (child.clone !== 0) {
			r += ` <span class="skyblue">Clone of ${child.clone}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRival(child) {
		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (_ssj !== -1) {
				if (child.rivalry <= 1) {
					r += `<span class="lightsalmon">Dislikes</span> ${SlaveFullName(V.slaves[_ssj])}. `;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightsalmon">rival.</span> `;
				} else {
					r += `<span class="lightsalmon">Hates</span> ${SlaveFullName(V.slaves[_ssj])}. `;
				}
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longClothes(child) {
		switch (child.clothes) {
			case "a slave gown":
				r += `Slave gown. `;
				break;
			case "a mini dress":
				r += `Mini dress. `;
				break;
			case "a ball gown":
				r += `Ball gown. `;
				break;
			case "a schoolgirl outfit":
				r += `Schoolgirl outfit. `;
				break;
			case "a tank-top":
				r += `Nice tank-top. `;
				break;
			case "a tube top":
				r += `Nice tube top. `;
				break;
			case "a t-shirt":
				r += `T-shirt. `;
				break;
			case "an oversized t-shirt":
				r += `Nice over-sized t-shirt. `;
				break;
			default:
				r += `Naked. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longCollar(child) {
		switch (child.collar) {
			case "uncomfortable leather":
				r += `Leather collar. `;
				break;
			case "tight steel":
				r += `Steel collar. `;
				break;
			case "preg biometrics":
				r += `Pregnancy biometrics collar. `;
				break;
			case "cruel retirement counter":
				r += `Cruel counter collar. `;
				break;
			case "shock punishment":
				r += `Shock collar. `;
				break;
			case "dildo gag":
				r += `Dildo gag. `;
				break;
			case "massive dildo gag":
				r += `Throat-bulging dildo gag. `;
				break;
			case "neck corset":
				r += `Neck corset. `;
				break;
			case "stylish leather":
				r += `Stylish leather collar. `;
				break;
			case "satin choker":
				r += `Satin choker. `;
				break;
			case "silk ribbon":
				r += `Silken ribbon. `;
				break;
			case "heavy gold":
				r += `Gold collar. `;
				break;
			case "bowtie":
				r += `Bowtie collar. `;
				break;
			case "pretty jewelry":
				r += `Pretty collar. `;
				break;
			case "nice retirement counter":
				r += `Nice counter collar. `;
				break;
			case "bell collar":
				r += `Bell collar. `;
				break;
			case "leather with cowbell":
				r += `Cowbell collar. `;
				break;
			case "ancient Egyptian":
				r += `Wesekh. `;
				break;
			case "ball gag":
				r += `Ball gag. `;
				break;
			case "bit gag":
				r += `Bit gag. `;
				break;
			case "porcelain mask":
				r += `Porcelain mask. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBelly(child) {
		switch (child.bellyAccessory) {
			case "shapewear":
				r += `Shapewear. `;
				break;
			case "a small empathy belly":
				r += `Small fake belly. `;
				break;
			case "a medium empathy belly":
				r += `Medium fake belly. `;
				break;
			case "a large empathy belly":
				r += `Large fake belly. `;
				break;
			case "a huge empathy belly":
				r += `Huge fake belly. `;
				break;
			case "a corset":
				r += `Corset. `;
				break;
			case "an extreme corset":
				r += `Extreme corsetage. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLegs(child) {
		if (child.legAccessory === "short stockings") {
			r += `Short stockings. `;
		} else if (child.legAccessory === "long stockings") {
			r += `Long stockings. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longShoes(child) {
		if (child.shoes === "heels") {
			r += `Heels. `;
		} else if (child.shoes === "pumps") {
			r += `Pumps. `;
		} else if (child.shoes === "extreme heels") {
			r += `Extreme heels. `;
		} else if (child.shoes === "boots") {
			r += `Boots. `;
		} else if (child.heels === 1) {
			r += `<span class="yellow">Crawling.</span> `;
		} else if (child.shoes === "flats") {
			r += `Flats. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longChastity(child) {
		if (child.chastityAnus === 1 && child.chastityPenis === 1 && child.chastityVagina === 1) {
			r += `Full chastity. `;
		} else if (child.chastityPenis === 1 && child.chastityVagina === 1) {
			r += `Genital chastity. `;
		} else if ((child.chastityAnus === 1 && child.chastityVagina === 1) || (child.chastityAnus === 1 && child.chastityPenis === 1)) {
			r += `Combined chastity. `;
		} else if (child.chastityVagina === 1) {
			r += `Vaginal chastity. `;
		} else if (child.chastityPenis === 1) {
			r += `Chastity cage. `;
		} else if (child.chastityAnus === 1) {
			r += `Anal chastity. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longVaginalAcc(child) {
		if (child.vaginalAttachment !== "vibrator") {
			switch (child.vaginalAccessory) {
				case "bullet vibrator":
					r += `Attached bullet vibrator. `;
					break;
				case "smart bullet vibrator":
					r += `Attached smart bullet vibrator. `;
					break;
				case "dildo":
					r += `Vaginal dildo. `;
					break;
				case "large dildo":
					r += `Large vaginal dildo. `;
					break;
				case "huge dildo":
					r += `Huge vaginal dildo. `;
					break;
				case "long dildo":
					r += `Long vaginal dildo. `;
					break;
				case "long, large dildo":
					r += `Long and large vaginal dildo. `;
					break;
				case "long, huge dildo":
					r += `Long and wide vaginal dildo. `;
					break;
			}
		}
		if (child.vaginalAttachment !== "none") {
			switch (child.vaginalAttachment) {
				case "vibrator":
					r += `Vibrating dildo. `;
					break;
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDickAcc(child) {
		switch (child.dickAccessory) {
			case "sock":
				r += `Cock sock. `;
				break;
			case "bullet vibrator":
				r += `Frenulum bullet vibrator. `;
				break;
			case "smart bullet vibrator":
				r += `Smart frenulum bullet vibrator. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longButtplug(child) {
		switch (child.buttplug) {
			case "plug":
				r += `Buttplug. `;
				break;
			case "large plug":
				r += `Large buttplug. `;
				break;
			case "huge plug":
				r += `Huge buttplug. `;
				break;
			case "long plug":
				r += `Long buttplug. `;
				break;
			case "long, large plug":
				r += `Large, long buttplug. `;
				break;
			case "long, huge plug":
				r += `Enormous buttplug. `;
				break;
		}
		switch (child.buttplugAttachment) {
			case "tail":
				r += `Attached tail. `;
				break;
			case "cat tail":
				r += `Attached cat tail. `;
				break;
			case "fox tail":
				r += `Attached fox tail. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function rulesAssistant(child) {
		if (child.useRulesAssistant === 0) {
			r += `<span class="lightgreen">RA-Exempt</span> `;
		} else if (V.abbreviateRulesets === 2 && (child.currentRules !== undefined) && (child.currentRules.length > 0)) {
			r += `Rules: ${V.defaultRules.filter(x => ruleApplied(child, x)).map(x => x.name).join(", ")}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function origins(child) {
		r += `<br> `;
		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		}
		r += `<span class="gray">${child.origin}</span> `;
	}

	return ChildSummaryUncached(child);
};

/**
 * Displays a detailed description of the child
 * @param {App.Entity.SlaveState} child
 * @returns {string}
 */
App.Facilities.Nursery.LongChildDescription = function(child) {
	"use strict";

	// declarations
	const
		arcology = V.arcologies[0],
		PC = V.PC,
		slaves = V.slaves,
		desc = child.actualAge < 13 ? `child` : `teen`, // TODO:
		girl = V.girl,
		father = child.father === -1 ? PC : getSlave(child.father),
		mother = child.mother === -1 ? PC : getSlave(child.mother);

	let
		r = ``;

	const
		{
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(child);

	// helper functions
	function accent(child) {
		let
			r = ``,
			accent,
			nationality;

		switch (child.nationality) {
			case "a Cook Islander":
				nationality = `Cook Islander`;
				break;
			case "a Liechtensteiner":
				nationality = `Liechtensteiner`;
				break;
			case "a New Zealander":
				nationality = `New Zealander`;
				break;
			case "a Solomon Islander":
				nationality = `Solomon Islander`;
				break;
			default:
				nationality = child.nationality;
				break;
		}

		if (child.accent !== 0) {
			if (child.accent === 1) {
				accent = jsEither("a beautiful", "a distinctive", "an intriguing", "a light", "a lovely", "a mild", "a pleasant", "a rich", "a slight", "a smooth");
				r += `${He} speaks ${V.language} in ${accent} ${nationality} accent${child.rules.speech === "accent elimination" ? `, which the rules encourage ${him} to suppress` : ``}. `;
			} else if (child.accent === 2) {
				accent = jsEither("a broad", "a harsh", "a heavy", "an intense", "a marked", "a noticeable", "a rough", "a significant", "a stressed", "a strong", "a thick");
				r += `${He} speaks ${V.language} in ${accent} ${nationality} accent that can be hard to understand${child.rules.speech === "accent elimination" ? `, and the rules encourage ${him} to make an effort to suppress it` : ``}. `;
			} else {
				r += `${He} speaks little ${V.language}, but understands enough to be given orders. `;
			}
		}

		return r;
	}

	function accessories() {
		function buttplug(child) {
			let
				r = ``;

			if (V.showClothing && !V.saleDescription) {
				switch (child.clothes) {
					case "a slave gown":
						if (child.chastityAnus) {
							r += `${His} pretty gown hides ${his} anal chastity accessory underneath. `;
						} else {
							r += `Though ${his} gown is very pretty, ${his} asshole is bare beneath it. `;
						}
						break;
					case "a ball gown":
						if (child.chastityAnus) {
							r += `${His} fabulous silken ball gown hides ${his} anal chastity accessory underneath. `;
						} else {
							r += `Though ${his} silken ball gown is fabulous, ${his} asshole is bare beneath it. `;
						}
						break;
					case "a mini dress":
						r += `If ${he} bends over even slightly, the hem of ${his} short dress rides up to reveal ${his} `;
						if (child.chastityAnus) {
							r += `anal chastity accessory underneath. `;
						} else {
							if (child.anus > 1) {
								r += `lewd butthole. `;
							} else {
								r += `tight anus. `;
							}
						}
						break;
					case "a schoolgirl outfit":
						r += `The skirt is so short that it `;
						if (child.chastityAnus) {
							r += `reveals ${his} anal chastity accessory. `;
						} else {
							r += `doesn't even have to be lifted to fuck ${his} schoolgirl ass. `;
						}
						break;
					case "a tank-top":
					case "a tube top":
					case "a t-shirt":
					case "an oversized t-shirt":
						break;
					default:
						if (child.anus > 2) {
							if (child.chastityAnus) {
								r += `${His} bare buttocks and ${his} anal chastity accessory are very visible from the rear. `;
							} else {
								r += `With ${his} ass bare, ${his} huge asshole is very visible from the rear. `;
							}
						} else if (child.anus > 1) {
							if (child.chastityAnus) {
								r += `${His} bare buttocks and ${his} anal chastity accessory are very visible from the rear. `;
							} else {
								r += `With ${his} ass bare, ${his} loose asshole is visible from the rear. `;
							}
						} else {
							if (child.chastityAnus) {
								r += `${His} bare buttocks and ${his} anal chastity accessory are visible. `;
							} else {
								r += `With ${his} ass bare, there is an occasional glimpse of ${his} asshole. `;
							}
						}
						break;
				}
			}

			switch (child.buttplug) {
				case "plug":
					r += `It's filled by a standard `;
					if (child.anus > 2) {
						r += `buttplug, which is on the verge of falling out. `;
					} else {
						r += `buttplug. `;
					}

					if (child.buttplugAttachment === "tail") {
						r += `A tail protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `A bushy ${child.hColor} tail with a white tip protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `A slim, spotted tail with a cute tuft at its tip protudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `A tail protrudes from the back of the plug and springs upwards from ${his} rear. `;
					}
					break;
				case "long plug":
					r += `It's filled by a standard sized, overly long `;
					if (child.anus > 2) {
						r += `buttplug, which is on the verge of sliding out ${his} rear. `;
					} else {
						r += `buttplug. `;
					}
					r += `It causes a noticeable bulge in ${his} belly. `;

					if (child.buttplugAttachment === "tail") {
						r += `A tail protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `A bushy ${child.hColor} tail with a white tip protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `A slim, spotted tail with a cute tuft at its tip protudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `A tail protrudes from the back of the plug and springs upwards from ${his} rear. `;
					}
					break;
				case "large plug":
					r += `It's `;
					if (child.anus < 2) {
						r += `agonizingly stretched `;
					} else if (child.anus < 3) {
						r += `uncomfortably stretched `;
					} else {
						r += `comfortably stretched `;
					}
					r += `by a large buttplug. `;

					if (child.buttplugAttachment === "tail") {
						r += `${He} swings the tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} swings the bushy ${child.hColor} tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} swings the spotted tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} bounces the tail from side to side with every shift of ${his} rear. `;
					}
					break;
				case "long, large plug":
					r += `It's `;
					if (child.anus < 2) {
						r += `agonizingly stretched `;
					} else if (child.anus < 3) {
						r += `uncomfortably stretched `;
					} else {
						r += `comfortably stretched `;
					}
					r += `by a large and long buttplug. It causes a noticeable bulge in ${his} belly. `;

					if (child.buttplugAttachment === "tail") {
						r += `${He} swings the tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} swings the bushy ${child.hColor} tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} swings the spotted tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} bounces the tail from side to side with every shift of ${his} rear. `;
					}
					break;
				case "huge plug":
					if (child.anus < 4) {
						r += `It's agonizingly stretched by a plug so huge ${his} anus is probably being stretched into a permanent gape. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He}'s frequently in tears from the pain, which is so sharp it often tips ${him} over into spontaneous orgasm. `;
						} else {
							r += `${He} spends much of ${his} time sobbing with anal pain and fear at having ${his} hole ruined. `;
						}
					} else {
						r += `Its ridiculous gape is comfortably filled by a huge buttplug. `;
					}

					if (child.buttplugAttachment === "tail") {
						r += `${He} sways the tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} sways the bushy ${child.hColor} tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} sways the spotted tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} jiggles the tail back and forth with every ginger movement of ${his} rear. `;
					}
					break;
				case "long, huge plug":
					if (child.anus < 4) {
						r += `It's agonizingly stretched by a plug so huge it causes ${his} belly to bulge and is likely stretching ${his} anus into a permanent gape. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He}'s frequently in tears from the pain, which is so sharp it often tips ${him} over into spontaneous orgasm. `;
						} else {
							r += `${He} spends much of ${his} time sobbing with anal pain and fear at having ${his} hole ruined. `;
						}
					} else {
						r += `Its ridiculous gape is comfortably filled by a wide and long buttplug. It causes a noticeable bulge in ${his} belly. `;
					}

					if (child.buttplugAttachment === "tail") {
						r += `${He} sways the tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} sways the bushy ${child.hColor} tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} sways the spotted tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} jiggles the tail back and forth with every ginger movement of ${his} rear. `;
					}
					break;
			}

			return r;
		}

		accessories.buttplug = buttplug;

		function dick(child) {
			let
				r = ``;

			if (child.chastityPenis) {
				r += `${His} cock is encased in a tight chastity cage, which is designed to be comfortable as long as ${he} remains soft. `;
				if (child.energy > 95) {
					r += `The poor nympho looks painfully frustrated by this, and a long string of precum is dangling from the hole in the bottom of the cage. `;
				}
				if (arcology.FSRestart !== "unset") {
					r += `This pleases the Societal Elite. `;
				}
			}

			return r;
		}

		accessories.dick = dick;

		function vaginal(child) {
			let
				r = ``,
				held;

			if (child.chastityVagina) {
				held = `held in place by a chastity belt`;
			} else if (child.vaginalAccessory === "bullet vibrator" || child.vaginalAccessory === "smart bullet vibrator") {
				held = `held in place by a strap`;
			} else {
				held = `held in place by a strap, which ${he} can remove for vaginal intercourse`;
			}

			switch (child.vaginalAccessory) {
				case "bullet vibrator":
				case "smart bullet vibrator":
					r += `A bullet vibrator is attached on ${his} clit, ${held}. `;
					break;
				case "dildo":
					r += `${His} pussy is filled by a dildo ${held}. `;
					break;
				case "long dildo":
					r += `${His} pussy is filled by a very long dildo ${held}. It noticeably bulges ${his} stomach. `;
					break;
				case "large dildo":
					r += `${His} pussy is ${child.vagina < 2 ? `painfully stretched` : child.vagina < 3 ? `uncomfortably filled` : `comfortably filled`} by a large dildo ${held}. `;
					break;
				case "long, large dildo":
					r += `${His} pussy is ${child.vagina < 2 ? `painfully stretched` : child.vagina < 3 ? `uncomfortably filled` : `comfortably filled`} by a very long and large dildo ${held}. It noticeably bulges ${his} stomach. `;
					break;
				case "huge dildo":
					if (child.vagina < 4) {
						r += `${His} pussy is filled to the breaking point by an enormous dildo. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He} can barely move with the discomfort, but ${he} frequently climaxes with agony. `;
						} else {
							r += `${He} can barely move with the discomfort, and ${he} sometimes breaks down in tears at having ${his} cunt permanently stretched. `;
						}
					} else {
						r += `${His} cavernous pussy is comfortably filled by a huge dildo. `;
					}
					if (child.chastityVagina) {
						r += `A chastity belt locks it securely in place. `;
					}
					break;
				case "long, huge dildo":
					if (child.vagina < 4) {
						r += `${His} pussy is filled to the breaking point by an enormously wide and long dildo. It noticeably bulges ${his} stomach. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He} can barely move with the discomfort, but ${he} frequently climaxes with agony. `;
						} else {
							r += `${He} can barely move with the discomfort, and ${he} sometimes breaks down in tears at having ${his} cunt permanently stretched. `;
						}
					} else {
						r += `${His} cavernous pussy is comfortably filled by an enormously wide and long dildo. It noticeably bulges ${his} stomach. `;
					}
					if (child.chastityVagina) {
						r += `A chastity belt locks it securely in place. `;
					}
					break;
				default:
					if (child.chastityVagina) {
						r += `${His} pussy is protected by a chastity belt${child.clothes !== "no clothing" ? `worn under ${his} clothing` : ``}. `;
					}
					break;
			}

			if (child.chastityVagina && arcology.FSRestart !== "unset") {
				r += `This pleases the Societal Elite. `;
			}

			return r;
		}

		accessories.vaginal = vaginal;
	}

	function anus(child) {
		let
			r = ``,
			skinDesc,
			analSkinDesc,
			ass,
			anus = child.analArea - child.anus;

		if (skinToneLevel(child.skin) < 13) {
			skinDesc = "pink";
		} else if (child.anusTat === "bleached") {
			skinDesc = child.skin;
		} else if (skinToneLevel(child.skin) > 19) {
			skinDesc = "dark";
		} else {
			skinDesc = "darker";
		}

		analSkinDesc = jsEither("crinkled", "puckered", "puffy");

		if (child.anus === 0) {
			r += `${He} is an <span class="lime">anal virgin;</span> ${his} asshole is fresh and tight. `;
		} else if (child.anus === 1) {
			ass = jsEither("anal opening", "anus", "asshole", "butthole");
			r += `${His} ${ass} is ${jsEither("nice and", "very")} tight, `;
			if (anus > 3) {
				r += `but it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else if (anus > 2) {
				r += `but it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${jsEither("asscrack", "buttcrack")} ${ass}. `;
			} else if (anus > 1) {
				r += `but it's surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin. `;
			} else if (anus > 0) {
				r += `and it's surrounded by a cute ${jsEither("pucker", "ring", "rosebud")} ${ass} of ${skinDesc} skin. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, since it's been deflowered only recently. `;
			}
		} else if (child.anus === 2) {
			ass = jsEither("anal opening", "anus", "asshole", "asspussy", "butthole");
			r += `${His} ${ass} is ${anus > 1 ? `only ` : ``}${jsEither("relaxed", "loose", "accommodating")} ${ass}, `;
			if (anus > 2) {
				r += `but it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else if (anus > 1) {
				r += `but it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${jsEither("asscrack", "buttcrack")} ${ass}. `;
			} else if (anus > 0) {
				r += `and it's surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, suggesting it's getting used to being this way. `;
			}
		} else if (child.anus === 3) {
			ass = jsEither("anal opening", "anus", "asshole", "asspussy", "butthole");
			r += `${His} ${ass} is a ${jsEither("lewd", "loose", "relaxed", "welcoming")} ${ass} slit, `;
			if (anus > 1) {
				r += `and it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else if (anus > 0) {
				r += `and it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${jsEither("asscrack", "buttcrack")} ${ass}. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, suggesting ${he}'s getting used to having such a cock-hungry rear fuckhole. `;
			}
		} else {
			ass = jsEither("anal opening", "anal slit", "anus", "asshole", "asspussy", "butthole");
			r += `${His} ${ass} is a ${jsEither("loose", "open", "permanent", "relaxed")} ${ass} gape, `;
			if (anus > 0) {
				r += `and it's surrounded by a massive oval of ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, suggesting ${he}'s only recently had ${his} ass ruined. `;
			}
		}

		if (child.pubicHStyle === "bushy" || child.pubicHStyle === "very bushy") {
			if (child.physicalAge >= 13) {
				r += `Since ${he} has been left natural, ${he} has some light ${child.pubicHColor} pubic hair around ${his} ass. `;
			}
		}

		if (child.minorInjury === "sore ass") {
			r += `${His} asshole has seen hard use lately and looks a little sore. `;
		}

		if (V.saleDescription && V.gingering === "ginger") {
			r += `${His} asshole looks unusually puffy and sore. ${He}'s either been cruelly assraped lately, or ${he}'s had an irritant placed in ${his} anus. `;
		}

		r += accessories.buttplug(child);

		if (V.showBodyMods) {
			r += piercings.anus(child);
			r += tats.anus(child);
		}

		if (child.skill.anal >= 100) {
			r += `${He} is a <span class="aquamarine">masterful anal slut.</span> `;
		} else if (child.skill.anal > 60) {
			r += `${He} is an <span class="aquamarine">expert anal slut.</span> `;
		} else if (child.skill.anal > 30) {
			r += `${He} is a <span class="aquamarine">skilled anal slut.</span> `;
		} else if (child.skill.anal > 10) {
			r += `${He} has <span class="aquamarine">basic knowledge about anal.</span> `;
		} else {
			r += `${He} is unskilled at taking anal. `;
		}

		return r;
	}

	function butt(child) {
		let
			r = ``;

		if (V.showClothing && !V.saleDescription) {
			if (!V.surgeryDescription) {
				switch (child.clothes) {
					case "a schoolgirl outfit":
						r += `${His} skirt `;
						if (child.butt > 10) {
							r += `can't begin to cover ${his} massive butt, and just rests on top of ${his} buttocks, leaving virtually ${his} entire behind `;
						} else if (child.butt > 6) {
							r += `can't begin to cover ${his} huge butt, and just rests on top of ${his} buttocks, leaving virtually ${his} entire behind `;
						} else if (child.butt > 3) {
							r += `only covers the top of ${his} big butt, leaving most of ${his} bottom `;
						} else {
							r += `only covers the top half of ${his} butt, leaving the bottom half of ${his} behind `;
						}
						r += `bare. `;
						break;
					case "a slave gown":
						r += `${His} slave gown `;
						if (child.butt > 10) {
							r += `is tailored as tastefully as possible for ${his} inhuman `;
						} else if (child.butt > 6) {
							r += `is tailored as tastefully as possible for ${his} massive `;
						} else if (child.butt > 3) {
							r += `is tailored to flatter ${his} big `;
						} else {
							r += `tastefully clings to ${his} `;
						}
						r += `buttocks. `;
						break;
					case "a ball gown":
						r += `${His} fabulous silken ball gown is draped `;
						if (child.butt > 10) {
							r += `as tastefully as possible for ${his} inhuman `;
						} else if (child.butt > 6) {
							r += `as tastefully as possible for ${his} massive `;
						} else if (child.butt > 3) {
							r += `around ${his} big `;
						} else {
							r += `around ${his} `;
						}
						r += `buttocks. `;
						break;
					case "a mini dress":
						r += `${His} scandalously short dress `;
						if (child.butt > 10) {
							r += `is impossible to pull over ${his} enormous buttocks, leaving ${his} behind entirely exposed. `;
						} else if (child.butt > 6) {
							r += `is at constant risk of sliding above ${his} huge butt and leaving ${his} behind entirely exposed. `;
						} else if (child.butt > 3) {
							r += `barely covers half of ${his} ample buttocks. `;
						} else {
							r += `barely manages to cover ${his} buttocks. `;
						}
						break;
					case "a tank-top":
					case "a tube top":
					case "an oversized t-shirt":
					case "a t-shirt":
						r += `${His} clothing leaves ${his} `;
						if (child.butt > 10) {
							r += `mammoth ass completely bare. `;
						} else if (child.butt > 6) {
							r += `huge ass completely bare. `;
						} else if (child.butt > 3) {
							r += `big ass completely bare. `;
						} else {
							r += `ass completely bare. `;
						}
						break;
				}
			}
		}

		if (V.showBodyMods) {
			r += tats.stamp(child);
		}

		r += `${He}'s got a `;
		if (child.butt <= 1) {
			r += `flat and `;
			if (arcology.FSSlimnessEnthusiast > 20 && arcology.FSHedonisticDecadence === "unset") {
				r += `${jsEither("attractive", "enticing", "fashionable")} `;
			} else {
				r += `${jsEither("skinny", "slim", "taut")} `;
			}
			r += `ass. `;
		} else if (child.butt <= 2) {
			if (arcology.FSSlimnessEnthusiast > 20 && arcology.FSHedonisticDecadence === "unset") {
				r += `${jsEither("fashionable", "sleek and attractive", "small and enticing")} `;
			} else {
				r += `${jsEither("small, sleek", "small but rounded", "rounded, small")} `;
			}
			r += `rear end. `;
		} else if (child.butt <= 3) {
			r += `${jsEither("big and healthy", "curved and plump", "healthy and plump")} derrière. `;
		} else if (child.butt <= 4) {
			r += `${jsEither("big bubble", "curvy and enticing", "juicy and large")} butt. `;
		} else if (child.butt <= 5) {
			r += `${jsEither("huge", "juicy and huge", "massive and undeniable")} rear end. `;
		} else if (child.butt <= 6) {
			r += `${jsEither("enormous", "truly massive")} posterior. `;
		} else if (child.butt <= 7) {
			r += `${jsEither("gigantic", "titanic")} ass. `;
		} else if (child.butt <= 10) {
			r += `${jsEither("gigantic", "titanic")} ass. `;
			if (!canWalk(child)) {
				r += ` It's so big it would jiggle as ${he} walked — if ${he} could walk. `;
			} else {
				r += ` It's so big it jiggles as ${he} walks. `;
			}
		} else if (child.butt <= 14) {
			r += `${jsEither("cushion-like", "hall-crowding")} ass. `;
			if (!canWalk(child)) {
				r += ` It's so big it would jiggle nonstop as ${he} walked — if ${he} could walk. `;
			} else {
				r += ` It's so big it jiggles nonstop as ${he} walks. `;
			}
		} else {
			r += `${jsEither("bean bag sized", "room-crowding")} ass. `;
			if (!canWalk(child)) {
				r += ` It's so massive it would jiggle endlessly as ${he} walked — if ${he} could walk. `;
			} else {
				r += ` It's so massive it jiggles endlessly as ${he} walks. `;
			}
		}

		r += hips(child);

		if (V.showImplantEffects) {
			if (child.buttImplant === 1) {
				r += `${His} butt implants make ${his} ass look especially pert no matter how ${he} moves. `;
			} else if (child.buttImplant === 2) {
				r += `${His} big butt implants make ${his} ass jut out curvaceously whatever pose ${he}'s in. `;
			} else if (child.buttImplant > 17) {
				r += `${He} has oversized ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it is completely obvious. Whatever ${his} position, ${his} immense ass dominates ${his} surroundings with its unyielding mass. `;
			} else if (child.buttImplant > 12) {
				r += `${He} has oversized ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it is completely obvious. Whatever ${his} position, ${his} ass looks like someone shoved a pair of ready to burst weather balloons in ${his} buttcheeks. `;
			} else if (child.buttImplant > 7) {
				r += `${He} has oversized ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it is completely obvious. Whatever ${his} position, ${his} ass looks like someone shoved a pair of overinflated beachballs in ${his} buttcheeks. `;
			} else if (child.buttImplant > 2) {
				r += `${He} has ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it shows. Whatever ${his} position, ${his} ass looks just as artificially enticing. `;
			}
		}

		if (arcology.FSTransformationFetishist !== "unset") {
			if (child.buttImplant > 0) {
				r += `${His} rear is about Math.floor((child.buttImplant/child.butt)*100)>>% implant. `;
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			if (arcology.FSSlimnessEnthusiast !== "unset") {
				if (child.butt >= 3) {
					if (child.buttImplant / child.butt < .25) {
						r += `${His} ass is <span class="red">disgustingly natural</span> for its size. `;
					} else {
						r += `${His} asscheeks are <span class="green">obviously implants,</span> as they should be. `;
					}
				}
			} else {
				if (child.butt >= 6) {
					if (child.buttImplant / child.butt > .5) {
						r += `${His} ass is <span class="red">disgustingly natural</span> for its size. `;
					} else {
						r += `${His} asscheeks are <span class="green">obviously implants,</span> as they should be. `;
					}
				}
			}
		}

		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (child.butt > 6 && arcology.FSAssetExpansionist !== "unset") {
				r += `It's too big for the fashionable feminine ideal. `;
			} else if (child.butt > 4 && arcology.FSAssetExpansionist !== "unset") {
				r += `It's bigger than expected for the fashionable feminine ideal, but your arcology loves huge butts, so it's not a surprise. `;
			} else if (child.butt > 4) {
				r += `It's too big for the fashionable feminine ideal. `;
			} else if (child.butt < 3) {
				r += `It's too small for the fashionable feminine ideal. `;
			}
		} else if (arcology.FSSlimnessEnthusiastLaw && child.butt > 1) {
			r += `It's way too big for the fashionable feminine ideal. `;
		} else if (arcology.FSHedonisticDecadenceLaw2 && child.butt < 5) {
			r += `It's too small for the fashionable feminine ideal. `;
		}

		if (child.physicalAge <= 3) {
			if (child.butt >= 8) {
				if (canWalk(child)) {
					r += `${His} butt is so massive that it is difficult for ${him} to move. `;
					if (child.muscles > 95) {
						r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
					} else if (child.muscles > 30) {
						r += `${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} hands sunk into ${his} buttcheeks to help take their weight. `;
					} else if (child.muscles > 5) {
						r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can. `;
					} else {
						r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand. `;
					}
				} else {
					r += `Together it is nearly the same size as ${his} torso, making ${him} about half butt. `;
				}
			}
		}

		if (child.butt > 15) {
			if (V.buttAccessibility) {
				r += `Fortunately for ${him}, the penthouse is adapted for daily life with a rear `;
			} else {
				r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks `;
			}
			r += `wider than a standard doorway. `;
		}

		if (child.physicalAge <= 12) {
			if (child.butt >= 12) {
				if (canWalk(child)) {
					r += `${His} butt is so massive that it is difficult for ${him} to move. `;
					if (child.muscles > 95) {
						r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
					} else if (child.muscles > 30) {
						r += `${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} hands sunk into ${his} buttcheeks to help take their weight. `;
					} else if (child.muscles > 5) {
						r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can. `;
					} else {
						r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand. `;
					}
				} else {
					r += `Together it is nearly the same size as ${his} torso, making ${him} about half butt. `;
				}
			}

			if (child.butt > 15) {
				if (V.buttAccessibility) {
					r += `Fortunately for ${him}, the penthouse is adapted for daily life with a rear `;
				} else {
					r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks `;
				}
				r += `wider than a standard doorway. `;
			}
		} else if (child.physicalAge > 12) {
			if (child.butt > 17) {
				if (canWalk(child)) {
					r += `${His} butt is so massive that it is difficult for ${him} to move. `;
					if (child.muscles > 95) {
						r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
					} else if (child.muscles > 30) {
						r += `${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} hands sunk into ${his} buttcheeks to help take their weight. `;
					} else if (child.muscles > 5) {
						r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can. `;
					} else {
						r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand. `;
					}
				} else {
					r += `Together it is nearly the same size as ${his} torso, making ${him} about half butt. `;
				}

				if (child.butt > 15) {
					if (V.buttAccessibility) {
						r += `Fortunately for ${him}, the penthouse is adapted for daily life with a rear `;
					} else {
						r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks `;
					}
					r += `wider than a standard doorway. `;
				}
			}
		}

		if (child.markings === "heavily freckled") {
			r += `${His} freckles are particularly dense across ${his} lower back. `;
		} else if (child.markings === "freckles") {
			r += `${His} lower back is covered in a light speckling of freckles. `;
		}

		if (V.showBodyMods) {
			r += tats.butt(child);
		}

		return r;
	}

	function clothingCorset(child) {
		let
			r = ``;

		switch (child.clothes) {
			case "a slave gown":
				if (child.bellyAccessory === "a corset") {
					r += `${His} gown has an elegant integral corset. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} gown has extreme corsetage built into it. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is concealed by ${his} gown. `;
				}
				break;
			case "a ball gown":
				if (child.bellyAccessory === "a corset") {
					r += `The dress has an elegant integral corset. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `The dress has extreme corsetage built into it. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is hidden by ${his} gown. `;
				}
				break;
			case "a mini dress":
				if (child.bellyAccessory === "a corset") {
					r += `The dress also cleverly doubles as an overbust corset. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `The dress also cleverly doubles as an extreme overbust corset. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is hidden by ${his} dress. `;
				}
				break;
			case "a schoolgirl outfit":
				if (child.bellyAccessory === "a corset") {
					r += `The outline of ${his} corset can be seen through ${his} blouse. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `The outline of ${his} absurd corsetage can be seen through ${his} blouse. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band can be seen under ${his} blouse. `;
				}
				break;
			case "a tube top":
				if (child.bellyAccessory === "a corset") {
					r += `${His} sturdy corset is completely exposed. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} extreme corsetage is completely exposed. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is completely exposed. `;
				}
				break;
			case "a tank-top":
			case "a t-shirt":
			case "an oversized t-shirt":
				if (child.bellyAccessory === "a corset") {
					r += `${His} sturdy corset is hidden by ${his} clothing. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} extreme corsetage is hidden by ${his} clothing. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is hidden by ${his} clothing. `;
				}
				break;
			default:
				if (child.bellyAccessory === "a corset") {
					r += `${His} corset is ${his} only real piece of clothing. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} extreme corset is ${his} only real piece of clothing. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is ${his} only real piece of clothing. `;
				}
		}

		return r;
	}

	function collar(child) {
		let
			r = ``,
			daddy,
			pregCollar = jsEither(1, 2, 3);

		switch (child.collar) {
			case "uncomfortable leather":
				r += `${He} is wearing an uncomfortable leather collar with a useful steel ring in front. `;
				break;
			case "dildo gag":
				r += `${He} is wearing a sturdy leather collar that continues up to restrict ${his} jaw as well. It holds a ring gag in ${his} mouth, into which slots a formidable inward-facing dildo that reaches down ${his} throat. It can be removed to facefuck ${him}. `;
				break;
			case "massive dildo gag":
				r += `${He} is wearing a sturdy leather collar that continues up to restrict ${his} jaw as well. It acts as an anchor for an enormous inward-facing dildo that reaches deep down ${his} throat. The sheer size of the phallus forces ${his} mouth as wide as it will go and considerably bulges ${his} throat. Fortunately for ${him}, it is designed to allow ${him} to be able to breathe through ${his} nose; though when removed, the poor ${girl} finds ${himself} incapable of closing ${his} mouth for some time. `;
				break;
			case "preg biometrics":
				if (child.pregSource > 0) {
					daddy = findFather(child.pregSource), daddy = daddy.slaveName;
				}

				r += `${He} is wearing a heavy metal collar with a digital display; it currently reads: `;
				if (child.preg > 0 && !child.pregKnown) {
					r += `"I might be preggers! Rub my belly for luck!" `;
				} else {
					if (pregCollar === 1) {
						if (child.pregWeek < 0) {
							r += `"I'm a mommy now!" `;
						} else if (!child.pregKnown) {
							r += `"Knock me up!" `;
						} else if (child.pregKnown) {
							r += `"${child.pregType === 0 ? `1` : `${child.pregType}`} bab${child.pregType > 1 ? `ies` : `y`} on board!" `;
						} else {
							r += `"I'm infertile!" `;
						}
					} else if (pregCollar === 2) {
						if (child.pregWeek < 0) {
							r += `"${num(child.pregWeek * -1)} week${child.pregWeek !== -1 ? `s` : ``} until I can get preggers again!" `;
						} else if (child.pregKnown) {
							r += `"${40-child.preg} weeks till I pop!" `;
						} else {
							r += `"My womb needs filling!" `;
						}
					} else {
						if (child.pregWeek < 0) {
							r += `"I can't wait for my belly to swell with life again!" `;
						} else if (!child.pregKnown) {
							r += `"Put a baby in me today!" `;
						} else if (child.pregSource === -1) {
							r += `"Womb claimed by my ${WrittenMaster(child)}!" `;
						} else if (child.pregSource === -2 || child.pregSource === 0) {
							r += `"Baby made by slutting around!" `;
						} else if (child.pregSource === -7) {
							r += `"My baby was made with science!" `;
						} else if (child.pregSource === -9) {
							r += `"Futanari Sisters, now two for the price of one!" `;
						} else if (child.pregSource > 0) {
							r += `"Womb claimed by ${daddy}!" `;
						} else {
							r += `"Put a baby in me today!" `;
						}
					}
				}
				break;
			case "silk ribbon":
				r += `${He} is wearing a tight silk ribbon fitted to ${his} neck; it is oddly elegant. `;
				break;
			case "tight steel":
				r += `${He} is wearing a tight steel collar whose restricting metal touch ${he} cannot escape. `;
				break;
			case "porcelain mask":
				r += `${He} is wearing a beautiful porcelain mask to hide ${his} unsightly facial features. `;
				break;
			case "shock punishment":
				r += `${He} is wearing a utilitarian collar with a punishment device at ${his} throat to administer agonizing shocks. `;
				break;
			case "neck corset":
				r += `${He} is wearing a fitted leather neck corset that constricts ${his} breathing and holds ${his} head rigidly upright. `;
				break;
			case "stylish leather":
				r += `${He} is wearing a stylish leather collar buckled in the front, a classic accessory for the well behaved slave. `;
				break;
			case "satin choker":
				r += `${He} is wearing a steel reinforced black satin choker that is at once elegant and functional. `;
				break;
			case "heavy gold":
				r += `${He} is wearing a heavy gold collar, an outstanding bit of ostentation. `;
				break;
			case "pretty jewelry":
				r += `${He} is wearing a pretty slave collar that can almost be mistaken for jewelry. `;
				break;
			case "bell collar":
				r += `${He} is wearing a comfortable leather collar with a small brass bell at ${his} throat. `;
				break;
			case "leather with cowbell":
				r += `${He} is wearing a comfortable leather collar with a small steel cowbell at ${his} throat. `;
				break;
			case "bowtie":
				r += `${He} is wearing the collar from a white formal shirt, and a black bowtie, though these conceal an actual collar that works perfectly well for restraint. `;
				break;
			case "ancient Egyptian":
				r += `${He} is wearing a beautiful golden wesekh, a collar that spreads from ${his} neck out onto both shoulders and down ${his} front. `;
				break;
			case "ball gag":
				r += `${He} is wearing a mouth filling, ${child.makeup === 3 || child.makeup === 6 || child.makeup === 8 ? `${child.hColor}` : `red`} ball-shaped gag that prevents ${him} from uttering a word while keeping ${him} uncomfortably aware of ${his} status. `;
				break;
			case "bit gag":
				r += `${He} is wearing a jaw spreading, bar-shaped gag that prevents ${him} from speaking while keeping ${him} uncomfortably aware of ${his} status. `;
				break;
			case "cruel retirement counter":
			case "nice retirement counter":
				r += `${He} is wearing a ${child.collar === "cruel retirement counter" ? `heavy metal collar` : `nice collar, almost a necklace,`} with a small numerical display reading `;
				if (V.SexMilestoneRetirement) {
					r += `${retirementSex - (child.counter.oral + child.counter.anal + child.counter.vaginal + child.counter.penetrative + child.counter.mammary)}, for the number of cocks between ${him} and ${his} freedom. `;
				} else if (V.MilkMilestoneRetirement) {
					r += `${retirementMilk - child.counter.milk}, for the amount of milk ${he} has yet to give. `;
				} else if (V.CumMilestoneRetirement) {
					r += `${retirementCum - child.counter.cum}, for the amount of cum ${he} has yet to give. `;
				} else if (V.BirthsMilestoneRetirement) {
					r += `${retirementBirths - child.counter.births}, for the number of pregnancies still between ${him} and freedom. `;
				} else if (V.KillsMilestoneRetirement) {
					r += `${retirementKills - child.counter.pitKills}, for the number of lives still between ${him} and freedom. `;
				} else if (V.PhysicalRetirementAgePolicy !== 1) {
					r += `${(365*(retirementAge-child.actualAge))+(7*(52-child.birthWeek))}, the number of days of sexual slavery ahead of ${him}. `;
				} else {
					r += `${(365*(retirementAge-child.physicalAge))+(7*(52-child.birthWeek))}, the number of days of sexual slavery ahead of ${him}. `;
				}
				break;
		}

		return r;
	}

	function crotch(child) {
		let
			r = ``;

		if (V.showClothing && !V.saleDescription) {
			switch (child.clothes) {
				case "a slave gown":
					r += `${child.slaveName}'s `;
					if (child.dick > 6) {
						r += `lovely gown cannot hide the fact that something massive is lurking between ${his} legs. `;
					} else if (child.dick > 3) {
						r += `cock tents the front of ${his} lovely gown. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `hermaphroditic genitalia are hidden by ${his} lovely gown. `;
					} else if (child.dick > 0) {
						r += `cock is hidden by ${his} lovely gown. `;
					} else if (child.vagina === -1) {
						r += `featureless groin is concealed by ${his} lovely gown. `;
					} else {
						r += `pussy is concealed by ${his} lovely gown. `;
					}
					break;
				case "a ball gown":
					r += `${child.slaveName}'s `;
					if (child.dick > 3) {
						r += `cock tents the front of ${his} fabulous silken ball gown. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `hermaphroditic genitalia are hidden by ${his} fabulous silken ball gown. `;
					} else if (child.dick > 0) {
						r += `cock is hidden by ${his} fabulous silken ball gown. `;
					} else if (child.vagina === -1) {
						r += `featureless groin is hidden by ${his} fabulous silken ball gown. `;
					} else {
						r += `pussy is concealed by ${his} fabulous silken ball gown. `;
					}
					break;
				case "a mini dress":
					r += `${child.slaveName}'s `;
					if (child.dick > 5 && canAchieveErection(child) && child.devotion > 20 && child.belly >= 5000) {
						r += `massive erection is agonizingly pinned to the front of ${his} ${child.bellyPreg > 2000 ? `gravid` : bellyImplant > 2000 ? `rounded` : `swollen`} belly, entirely visible against the straining fabric of ${his} dress. `;
					} else if (child.dick > 5 && canAchieveErection(child) && child.devotion > 20) {
						r += `massive erection ascends up ${his} chest, entirely visible against the straining fabric of ${his} dress. `;
					} else if (child.dick > 3 && canAchieveErection(child) && child.devotion > 20 && child.belly >= 5000) {
						r += `erection lies flush against the bottom of ${his} ${child.bellyPreg > 2000 ? `gravid` : bellyImplant > 2000 ? `rounded` : `swollen`} stomach, visible under the tight fabric of ${his} dress. `;
					} else if (child.dick > 3 && canAchieveErection(child) && child.devotion > 20) {
						r += `erection lies flush against ${his} stomach, visible under the tight fabric of ${his} dress. `;
					} else if (child.dick > 5) {
						r += `short dress can't possibly conceal ${his} huge cock; its lower half sticks out below the hemline. `;
					} else if (child.dick > 3) {
						r += `short dress can't possibly conceal ${his} big cock; its head peeks out below the hemline. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `short dress scarcely covers the bulge of ${his} cock, while leaving a hint of ${his} bare pussy visible below the hemline. `;
					} else if (child.dick > 0) {
						r += `short dress scarcely covers the bulge of ${his} cock. `;
					} else if (child.chastityVagina) {
						r += `short dress leaves a hint of ${his} polished chastity belt below the hemline. `;
					} else if (child.chastityAnus) {
						r += `short dress leaves a hint of ${his} polished anal chastity belt below the hemline. `;
					} else if (child.vagina === -1) {
						r += `short dress leaves a hint of ${his} featureless groin below its hemline. `;
					} else {
						r += `short dress leaves a hint of ${his} bare pussy below the hemline. `;
					}
					break;
				case "a schoolgirl outfit":
					if (child.dick > 3) {
						r += `${child.slaveName}'s dickhead is visible, swinging below the hem of ${his} skirt. `;
					} else if (child.dick > 0) {
						r += `Something is pushing against the front of ${child.slaveName}'s plaid skirt. `;
					} else if (child.vagina === -1) {
						r += `${child.slaveName}'s plaid skirt lifts to show off ${his} featureless groin. `;
					} else {
						r += `${child.slaveName}'s plaid skirt lifts to show off ${his} pussy with the slightest provocation. `;
					}
					break;
				case "a tank-top":
				case "a tube top":
				case "a t-shirt":
					if (child.dick > 6) {
						r += `${his} outfit does nothing to conceal ${his} swinging cock. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} hermaphroditic genitalia. `;
					} else if (child.dick > 0) {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} cock. `;
					} else if (child.vagina === -1) {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} featureless groin. `;
					} else {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} pussy. `;
					}
					break;
				default:
					if (!child.chastityPenis) {
						if (child.vagina > -1) {
							r += `${child.slaveName}'s ${child.dick > 0 ? `hermaphrodite genitalia are` : `pussy is`} bare and available. `;
						} else if (child.dick > 0) {
							r += `${child.slaveName}'s `;

							switch (child.dick) {
								case 10:
									r += `inhuman cock hangs naked. `;
									break;
								case 9:
									r += `absurd cock hangs naked. `;
									break;
								case 8:
									r += `titanic${!canAchieveErection(child) ? `, flaccid` : ``} cock hangs naked. `;
									break;
								case 7:
									r += `gigantic${!canAchieveErection(child) ? `, flaccid` : ``} cock hangs naked. `;
									break;
								case 6:
									r += `huge${!canAchieveErection(child) ? `, flaccid` : ``} cock hangs naked. `;
									break;
								case 5:
									r += `imposing${!canAchieveErection(child) ? `, flaccid` : ``} cock swings naked. `;
									break;
								case 4:
									r += `big${!canAchieveErection(child) ? `, flaccid` : ``} cock dangles naked. `;
									break;
								case 3:
									r += `${!canAchieveErection(child) ? ` flaccid` : ``} cock dangles bare. `;
									break;
								case 2:
									r += `little${!canAchieveErection(child) ? ` flaccid` : ``} dick is bare. `;
									break;
								case 1:
									r += `tiny${!canAchieveErection(child) ? ` flaccid` : ``} dick is bare. `;
									break;
								default:
									r += `hypertrophied cock hangs naked. `;
									break;
							}
						} else {
							r += `${child.slaveName}'s ${child.balls > 0 ? `lonely balls are` : `featureless groin is`} bare and vulnerable. `;
						}
					}
					break;
			}
		}

		return r;
	}

	function dick(child) {
		let
			r = ``,
			scrotalFullness = child.scrotum - child.balls;

		if (child.dick > 0) {
			switch (child.dick) {
				case 10:
					if (V.showDickCMs) {
						r += `${His} awe-inspiring${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around ${dickToEitherUnit(child.dick)} long, `;
					} else {
						r += `${He} has an awe-inspiring${V.seeCircumcision ? `, uncut` : ` circumcised`} penis, `;
					}
					r += `a true masterpiece of modern growth hormone treatment, `;
					break;
				case 9:
					if (V.showDickCMs) {
						r += `${His} monstrous${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long, `;
					} else {
						r += `${He} has a monstrous${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `a work of modern pharmacological art, `;
					break;
				case 8:
					if (V.showDickCMs) {
						r += `${His} truly imposing${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long when as hard as it can get, `;
					} else {
						r += `${He} has a truly imposing${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `an obvious product of modern growth hormones, `;
					break;
				case 7:
					if (V.showDickCMs) {
						r += `${His} massive${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long when as hard as it can get, `;
					} else {
						r += `${He} has a massive${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `larger than a dick can grow naturally, `;
					break;
				case 6:
					r += `${showDickCMs ? `${His} enormous${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has an enormous${V.seeCircumcision ? `, uncut,` : `, circumcised,`} penis`}, a rival to the world's largest natural dicks, `;
					break;
				case 5:
					r += `${showDickCMs ? `${His} huge${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is more than${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has a huge${V.seeCircumcision ? `, uncut,` : `, circumcised,`} penis`}, large enough to be sexually inconvenient, `;
					break;
				case 4:
					r += `${showDickCMs ? `${His} large${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has a large${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis`}, big enough to be a source of pride on a male, `;
					break;
				case 3:
					r += `${showDickCMs ? `${His} average-sized${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`}s erect` : `${He} has an average-sized${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis`}, `;
					break;
				case 2:
					r += `${showDickCMs ? `${His} small${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has a small${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis`}, little enough to be a source of embarrassment on a male, `;
					break;
				case 1:
					r += `${showDickCMs ? `${His}${V.seeCircumcision ? `, uncut` : ` circumcised`} micropenis ${canAchieveErection(child) ? `is less than${dickToEitherUnit(child.dick)} long when` : `would be less than${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has ${V.seeCircumcision ? `an uncut` : `a circumcised`} micropenis`}, `;
					break;
				default:
					if (V.showDickCMs) {
						r += `${His} mind-shattering${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long, `;
					} else {
						r += `${He} has a mind-shattering${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `a true masterpiece of modern growth hormone treatment, `;
					break;
			}

			if (!child.scrotum) {
				if (child.vagina > -1) {
					r += `and is right above ${his} vagina. `;
				} else {
					r += `and rests above nothing but smooth, sensitive skin until `;

					switch (child.anus) {
						case 0:
							r += `the tiny crinkle of ${his} virgin asshole. `;
							break;
						case 1:
							r += `${his} tight little rosebud. `;
							break;
						case 2:
							r += `the bottom of the vertical slit formed by ${his} rear pussy. `;
							break;
						case 3:
							r += `the bottom of the soft slit formed by ${his} lewd rear pussy. `;
							break;
						default:
							r += `the edge of ${his} open anal gape. `;
							break;
					}
				}
			} else {
				switch (child.balls) {
					case 10:
						r += `and ${he} has an inhuman pair of testicles${V.showDickCMs ? `, nearly ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 9:
						r += `and ${he} has a titanic pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 8:
						r += `and ${he} has a gigantic pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 7:
						r += `and ${he} has a monstrous pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 6:
						r += `and ${he} has an enormous pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 5:
						r += `and ${he} has a huge pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 4:
						r += `and ${he} has a big pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 3:
						r += `and ${he} has an average pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 2:
						r += `and ${he} has a small pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 1:
						r += `and ${his} testicles are so small they have retreated up into ${his} abdomen. `;
						break;
					case 0:
						if (child.dick === 2) {
							r += `and ${he} lacks testicles. `;
						} else if (child.dick === 1) {
							r += `and ${he} lacks testicles: ${his} vestigial dick is functionally a large, soft clit. `;
						} else {
							r += `but ${he} lacks testicles. `;
						}
						break;
					default:
						r += `and ${he} has a hypertrophied, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}, a true masterpiece of modern growth hormone treatment. `;
						break;
				}
			}

			if (child.balls > 0 && child.scrotum > 0) {
				if (child.balls > 90) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they ${hasBothLegs(child) ? `drag along the floor` : `hang far from ${his} legless torso`}. `;
					}
				} else if (child.balls >= 20) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `to ${his} knees` : `quite the distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 5) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `halfway to ${his} knees` : `some distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 3) {
					if (scrotalFullness < -1) {
						r += `They're too big for ${his} tiny scrotum, which is stretched tight over each ball. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} soft scrotum allows them to rest comfortably ${hasBothLegs(child) ? `between ${his} legs` : `beneath ${his} legless torso`}. `;
					} else {
						r += `${He} has a loose, dangling scrotum that allows them to swing ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					}
				} else if (child.balls > 1) {
					if (scrotalFullness === -1) {
						r += `They're held tightly by a very minimal scrotum that turns them into a soft little bump. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable little scrotum allows them to rest softly. `;
					} else {
						r += `They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly. `;
					}
				} else {
					if (scrotalFullness === 0) {
						r += `${He} has a soft little trace of scrotum. `;
					} else {
						r += `They've left ${his} scrotum soft and empty. `;
					}
				}
			}

			if (child.mpreg && canAchieveErection(child) && child.belly >= 10000 && child.prostate > 0) {
				r += `${His} huge pregnancy puts pressure on ${his} prostate at all times, leaving ${him} fully erect and trailing cum. `;
			} else if (child.chastityPenis) {
				r += `As you watch, the machine detects that ${his} balls are ready for emptying. It reams ${his} ass until semen whitens the transparent tubing coming off the head of the receptacle covering ${his} dick. `;
			} else if (child.drugs === "priapism agents") {
				if (child.dick > 8) {
					r += accessories.dick(child);
				} else if (child.dick > 6) {
					r += `${He}'s painfully hard, despite the size of ${his} cock, and on the brink of losing consciousness, since a dangerous amount of ${his} blood volume is required to even get it to this point. `;
				} else {
					r += `${He}'s painfully erect, or as erect that a cock of that size could be, and ${he} must feel very faint, since even that requires much of ${his} blood volume. `;
				}
				r += `${He}'s painfully erect. `;
			} else if (child.dick > 8) {
				r += `${He}'s too huge for ${his} cardiovascular system to create even the beginnings of an erection. ${His} cock is a soft, sensitive monolith${child.dick * 6 > child.height ? ` bigger than ${his} body` : child.dick * 6 > child.height / 2 ? ` the size of one of ${his} legs` : ` the size of one of ${his} arms`}, `;
				if (hasAnyArms(child) && hasAnyLegs(child) && child.dick * 6 > child.height) {
					r += `or would be if ${he} had any of those. `;
				} else {
					r += `hanging with its head ${child.dick > 9 ? `below` : `between`} ${his} knees. `;
				}
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (V.saleDescription && V.gingering === "vasodilator") {
				r += `${He}'s painfully erect. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (child.aphrodisiacs > 1 || (child.inflationType === "aphrodisiac" && child.inflation > 1)) {
				r += `The aphrodisiacs have ${his} cock painfully hard${child.drugs === "hormone blockers" || !(child.balls > 0 ? child.hormoneBalance < 100 : child.hormoneBalance <= -100) || child.ballType === "sterile" ? `, despite ${his} usual inability to achieve erection` : ``}. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (child.balls > 0 && child.ballType === "sterile") {
				r += `Since ${he} has been chemically castrated, ${his} cock is soft. `;
				if (child.energy > 95) {
					r += `${He}'s such a nympho that despite this, ${his} limp member is tipped by a drop of precum. `;
				}
			} else if (!child.balls) {
				r += `Since ${he} `;
				if (child.genes === "XY") {
					r += `has been gelded, `;
				} else {
					r += `lacks testicles, `;
				}
				r += `${his} cock is soft. `;
				if (child.energy > 95) {
					r += `${He}'s such a nympho that despite this, ${his} limp member is tipped by a drop of precum. `;
				}
			} else if (child.dick > 0 && child.hormoneBalance >= 100) {
				r += `Since ${his} body is flooded with female hormones, ${his} cock is soft. `;
				if (child.devotion > 75) {
					r += `Despite this, ${he}'s so devoted to you that being near you has ${his} horny. ${His} limp member is tipped by a drop of precum. `;
				} else if (child.drugs === "testicle enhancement" || child.drugs === "hyper testicle enhancemet") {
					r += `Unfortunately for the poor slave, ${he}'s also on drugs that cause overproduction of cum. Since ${his} soft dick makes it difficult for ${him} to ejaculate properly, ${he}'s almost frantic with discomfort, and ${his} dickhead is dribbling excessive precum. `;
				}
			} else if (child.dick > 6) {
				r += `${His} cock is flirting with the limit of what the human cardiovascular system can bring erect: the best ${he} can manage is a half-hardness that's too soft to meaningfully fuck anything. If ${he} could somehow get fully erect, there are few holes ${he} could safely penetrate, anyway. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (child.dick > 1) {
				if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
					r += `The aphrodisiacs have ${his} cock hard${!canAchieveErection(child) ? `, despite ${his} usual inability to achieve erection` : ``}. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else if (child.energy > 95) {
					r += `As a nympho, ${he}'s almost constantly hard. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else if (child.fetishKnown && child.fetishStrength > 60) {
					switch (child.fetish) {
						case "buttslut":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about being buttfucked. `;
							break;
						case "cumslut":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about being facefucked. `;
							break;
						case "humiliation":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about being humiliated. `;
							break;
						case "submissive":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about submission. `;
							break;
						case "dom":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about dominating someone. `;
							break;
						case "masochist":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about pain. `;
							break;
						case "sadist":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about hurting someone. `;
							break;
						case "pregnancy":
							if (canGetPregnant(child)) {
								r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about sporting a huge pregnant belly. `;
							} else {
								r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about getting someone pregnant. `;
							}
							break;
						case "boobs":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about boobs. `;
							break;
					}
				} else if (child.devotion > 50) {
					r += `As a devoted sex slave, ${he} has no trouble keeping ${himself} hard for ${his} ${WrittenMaster(child)}. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else if (child.devotion > 20) {
					r += `As an obedient sex slave, ${he} does ${his} best to keep ${himself} hard for ${his} ${WrittenMaster(child)}. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else {
					r += `Judging by the softness of ${his} dick, ${he} doesn't find ${his} situation arousing. `;
				}
			} else {
				r += `You can't tell if ${he} is hard or soft at a glance, not that there is much of a size difference between it. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant; a swell that makes ${his} cock look even smaller by comparison. `;
				}
			}

			if (child.balls > 0 && child.vasectomy) {
				r += `${He} shoots blanks thanks to ${his} vasectomy. `;
			} else if (child.balls > 0 && child.ballType === "sterile") {
				r += `${He} no longer produces sperm, so ${his} ejaculate lacks potency. `;
			}

			if (child.physicalAge <= 3) {
				if (child.dick >= 15) {
					if (canWalk(child)) {
						r += `${His} penis so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely move ${his} penis, and usually walks carrying it in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much. `;
						}
					} else {
						r += `${His} penis is nearly the same size as ${his} torso, making ${him} about half cock. `;
					}

					if (child.dick >= 20) {
						if (V.dickAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with a cock `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with dicks `;
						}
						r += `bigger than they are. `;
					}
				}
			} else if (child.physicalAge <= 12) {
				if (child.dick >= 30) {
					if (canWalk(child)) {
						r += `${His} penis so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely to move ${his} penis, and usually walks carrying it in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much. `;
						}
					} else {
						r += `${His} penis is nearly the same size as ${his} torso, making ${him} about half cock. `;
					}

					if (child.dick >= 30) {
						if (V.dickAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with a cock `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with dicks `;
						}
						r += `bigger than they are. `;
					}
				}
			} else {
				if (child.dick >= 30) {
					if (canWalk(child)) {
						r += `${His} penis so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely to move ${his} penis, and usually walks carrying it in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much. `;
						}
					} else {
						r += `${His} penis is nearly the same size as ${his} torso, making ${him} about half cock. `;
					}

					if (child.dick >= 30) {
						if (V.dickAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with a cock `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with dicks `;
						}
						r += `bigger than they are. `;
					}
				}
			}

			if (child.balls >= 50) {
				r += `${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts in every direction. `;
			} else if (child.balls >= 37) {
				r += `${His} perpetual stream of semen-laced precum leaves a mess on the floor wherever ${he} goes${canAchieveErection(child) ? `, along with ${his} shaft and legs whenever ${he} is erect` : ``}. `;
			} else if (child.balls >= 25) {
				r += `Parts of the constant dribble coming out of the tip of ${his} dick are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release. `;
			} else if (child.balls >= 10) {
				r += `${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}. `;
			}

			if (child.prostate > 2) {
				r += `${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate. `;
			}

			if (child.physicalAge <= 3) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles each dwarf ${him}, making ${him} almost entirely testicle. `;
					} else {
						r += `${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else if (child.physicalAge <= 12) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles are each nearly the same size as ${him}, making ${him} mostly testicle. `;
					} else {
						r += `${His} testicles are each nearly the same size as ${his} torso, making a solid portion of ${his} mass testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle. `;
					} else {
						r += `Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			}

			if (child.foreskin > 0) {
				if (child.foreskin - child.dick < -1) {
					r += `${His} cockhead is much too large for ${his} foreskin, probably as a result of recent penis growth it hasn't had time to stretch to accommodate yet. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || V.saleDescription && V.gingering === "vasodilator" || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `The bit of erect dickhead visible at the tip of the uncomfortably stretched skin is an angry color from being squeezed so hard. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, but getting a hard-on will probably be very uncomfortable for ${him}. `;
					} else {
						r += `Fortunately for ${him}, ${he} can't get hard, making this merely uncomfortable for ${him}. `;
					}
				} else if (child.foreskin - child.dick < 0) {
					r += `${His} foreskin is stretched by ${his} dickhead, probably as a result of recent penis growth it hasn't had time to get used to yet. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || V.saleDescription && V.gingering === "vasodilator" || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `${His} erection has stretched the skin there taut. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, but getting a hard-on will probably be a bit uncomfortable for ${him}. `;
					} else {
						r += `Fortunately for ${him}, ${he} can't get hard, making this state merely odd-looking. `;
					}
				} else if (child.foreskin - child.dick > 0) {
					r += `${His} foreskin seems too large for ${his} dick, probably as a result of recent penis shrinkage. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || V.saleDescription && V.gingering === "vasodilator" || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `${His} erection cannot fully retract it, though it's loose enough that this doesn't look uncomfortable. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, making the tip of ${his} dick look shriveled. `;
					} else {
						r += `${He} can't get hard, making the tip of ${his} dick look shriveled. `;
					}
				} else if (child.foreskin - child.dick > 1) {
					r += `${His} foreskin is far too large for ${his} dick, probably as a result of recent penis shrinkage. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || V.saleDescription && V.gingering === "vasodilator" || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `${His} erection cannot retract it at all, though it's loose enough that this doesn't look uncomfortable. Orgasming, though, will likely produce a dribbling mess. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, so the excess skin droops lamely off ${his} cockhead. `;
					} else {
						r += `${He} can't get hard, so the excess skin droops lamely off ${his} cockhead. `;
					}
				}
			}

			if (child.dick < 3 && child.balls > 5) {
				r += `${His} cock is small enough that it does not hang past the bottom of ${his} gigantic ballsack when soft. `;
			} else if (child.dick < 2 && child.balls > 4) {
				r += `${His} cock is so small that it does not hang past the bottom of ${his} huge ballsack when soft. `;
			} else if (child.dick < 1 && child.balls > 3) {
				r += `${His} cock is so small that it barely protrudes from ${his} ample ballsack. `;
			}
		} else if (child.vagina === -1) {
			if (!child.scrotum) {
				r += `${He} has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, nothing but a tiny hole in the smooth ${child.skin} skin ${hasBothLegs(child) ? `between ${his} legs` : `at the base of ${his} hips`}. `;
			} else {
				r += `${He} has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, just a tiny hole above `;

				switch (child.balls) {
					case 6:
						r += `a gigantic, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 5:
						r += `a huge pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 4:
						r += `a big pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 3:
						r += `an average pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 2:
						r += `a small pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 1:
						r += `a soft little trace of scrotum, since ${his} testicles are so small they have retreated up into ${his} abdomen. `;
						break;
					case 0:
						r += `smooth ${child.skin} skin. `;
						break;
					default:
						r += `a hypertrophied, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}, a true masterpiece of modern growth hormone treatment. `;
						break;
				}
			}

			if (child.balls > 0 && child.scrotum > 0) {
				if (child.balls > 90) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they ${hasBothLegs(child) ? `drag along the floor` : `hang far from ${his} legless torso`}. `;
					}
				} else if (child.balls > 20) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `to ${his} knees` : `quite the distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 5) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `halfway to ${his} knees` : `some distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 3) {
					if (scrotalFullness < -1) {
						r += `They're too big for ${his} tiny scrotum, which is stretched tight over each ball. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} soft scrotum allows them to rest comfortably ${hasBothLegs(child) ? `between ${his} legs` : `beneath ${his} legless torso`}. `;
					} else {
						r += `${He} has a loose, dangling scrotum that allows them to swing ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					}
				} else if (child.balls > 1) {
					if (scrotalFullness === -1) {
						r += `They're held tightly by a very minimal scrotum that turns them into a soft little bump. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable little scrotum allows them to rest softly. `;
					} else {
						r += `They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly. `;
					}
				} else {
					if (scrotalFullness === 0) {
						r += `${He} has a soft little trace of scrotum. `;
					} else {
						r += `They've left ${his} scrotum soft and empty. `;
					}
				}
			}

			if (child.physicalAge <= 3) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles each dwarf ${him}, making ${him} almost entirely testicle. `;
					} else {
						r += `${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else if (child.physicalAge <= 12) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles are each nearly the same size as ${him}, making ${him} about mostly testicle. `;
					} else {
						r += `${His} testicles are each nearly the same size as ${his} torso, making ${him} about mostly testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle. `;
					} else {
						r += `Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			}

			if (child.prostate > 2) {
				r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum streams from the hole; ${his} artificially hyperactive prostate keeps ${him} that way. `;
			} else if (child.prostate > 1) {
				r += `${He}'s got a string of precum dangling from the hole; ${his} artificially hyperactive prostate keeps ${him} that way. `;
			}

			if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
				r += `The aphrodisiacs have ${him} so horny that there's a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum beading at`} the hole. `;
			} else if (child.energy > 95) {
				r += `As a nympho, ${he}'s almost always got a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole. `;
			} else if (child.fetishKnown) {
				if (child.fetishStrength > 60) {
					switch (child.fetish) {
						case "buttslut":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being buttfucked. `;
							break;
						case "cumslut":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being facefucked. `;
							break;
						case "humiliation":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being humiliated. `;
							break;
						case "submissive":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about submission. `;
							break;
						case "dom":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about dominating someone. `;
							break;
						case "masochist":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about pain. `;
							break;
						case "sadist":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about hurting someone. `;
							break;
						case "pregnancy":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about getting someone pregnant. `;
							break;
						case "boobs":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about boobs. `;
							break;
					}
				}
			}

			if (child.prostate > 2) {
				r += `This hole is normally almost invisible, making it absolutely shocking when ${he} orgasms and shoots a massive cumshot out of it. `;
			} else if (child.balls !== 0) {
				r += `This hole is normally almost invisible, making it quite surprising when ${he} orgasms and shoots cum out of it. `;
			} else if (child.prostate !== 0) {
				r += `This hole is normally almost invisible, though it does leak some watery ejaculate when ${he} orgasms. `;
			}

			if (child.balls >= 50) {
				r += `${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts down ${his} balls. `;
			} else if (child.balls >= 37) {
				r += `${His} perpetual stream of semen-laced precum running down ${his} balls leaves a mess on the floor wherever ${he} goes. `;
			} else if (child.balls >= 25) {
				r += `Parts of the constant dribble coming out of the hole are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release. `;
			} else if (child.balls >= 10) {
				r += `${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}. `;
			}

			if (child.prostate > 2) {
				r += `${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate. `;
			}

			if (child.balls > 0 && child.vasectomy) {
				r += `${He} shoots blanks thanks to ${his} vasectomy. `;
			} else if (child.balls > 0 && child.ballType === "sterile") {
				r += `${He} no longer produces sperm, so ${his} cum lacks potency. `;
			}
		} else if (child.balls > 0) {
			if (child.scrotum !== 0) {
				r += `${He} has no penis, just a tiny hole above `;

				switch (child.balls) {
					case 6:
						r += `a gigantic, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 5:
						r += `a huge pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 4:
						r += `a big pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 3:
						r += `an average pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 2:
						r += `a small pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 1:
						r += `a soft little trace of scrotum, since ${his} testicles are so small they have retreated up into ${his} abdomen. `;
						break;
					case 0:
						r += `smooth ${child.skin} skin. `;
						break;
					default:
						r += `a hypertrophied, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}, a true masterpiece of modern growth hormone treatment. `;
						break;
				}

				if (child.balls > 0 && child.scrotum > 0) {
					if (child.balls > 90) {
						if (scrotalFullness < -1) {
							r += `${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain. `;
						} else if (scrotalFullness === -1) {
							r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						} else {
							r += `Their weight and size has stretched ${his} scrotum downward, so that they ${hasBothLegs(child) ? `drag along the floor` : `hang far from ${his} legless torso`}. `;
						}
					} else if (child.balls >= 20) {
						if (scrotalFullness < -1) {
							r += `${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain. `;
						} else if (scrotalFullness === -1) {
							r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						} else {
							r += `Their weight and size has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `to ${his} knees` : `quite the distance from ${his} legless torso`}. `;
						}
					} else if (child.balls > 5) {
						if (scrotalFullness < -1) {
							r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony. `;
						} else if (scrotalFullness === -1) {
							r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						} else {
							r += `Their weight has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `halfway to ${his} knees` : `some distance from ${his} legless torso`}. `;
						}
					} else if (child.balls > 3) {
						if (scrotalFullness < -1) {
							r += `They're too big for ${his} tiny scrotum, which is stretched tight over each ball. `;
						} else if (scrotalFullness === -1) {
							r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
						} else if (scrotalFullness === 0) {
							r += `${His} soft scrotum allows them to rest comfortably ${hasBothLegs(child) ? `between ${his} legs` : `beneath ${his} legless torso`}. `;
						} else {
							r += `${He} has a loose, dangling scrotum that allows them to swing ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						}
					} else if (child.balls > 1) {
						if (scrotalFullness === -1) {
							r += `They're held tightly by a very minimal scrotum that turns them into a soft little bump. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable little scrotum allows them to rest softly. `;
						} else {
							r += `They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly. `;
						}
					} else {
						if (scrotalFullness === 0) {
							r += `${He} has a soft little trace of scrotum. `;
						} else {
							r += `They've left ${his} scrotum soft and empty. `;
						}
					}
				}

				if (child.physicalAge <= 3) {
					if (child.balls >= 25) {
						if (canWalk(child)) {
							r += `${His} balls are so massive that it is difficult for ${him} to move. `;
							if (child.muscles > 95) {
								r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
							} else if (child.muscles > 30) {
								r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
							} else if (child.muscles > 5) {
								r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
							} else {
								r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
							}
						} else if (child.balls >= 100) {
							r += `${His} testicles each dwarf ${him}, making ${him} almost entirely testicle. `;
						} else {
							r += `${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle. `;
						}

						if (child.balls > 90) {
							if (V.ballsAccessibility) {
								r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
							} else {
								r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
							}
							r += `wider than a standard doorway. `;
						}
					}
				} else if (child.physicalAge <= 12) {
					if (child.balls >= 25) {
						if (canWalk(child)) {
							r += `${His} balls are so massive that it is difficult for ${him} to move. `;
							if (child.muscles > 95) {
								r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
							} else if (child.muscles > 30) {
								r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
							} else if (child.muscles > 5) {
								r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
							} else {
								r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
							}
						} else if (child.balls >= 100) {
							r += `${His} testicles are each nearly the same size as ${him}, making ${him} about mostly testicle. `;
						} else {
							r += `${His} testicles are each nearly the same size as ${his} torso, making ${him} about mostly testicle. `;
						}

						if (child.balls > 90) {
							if (V.ballsAccessibility) {
								r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
							} else {
								r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
							}
							r += `wider than a standard doorway. `;
						}
					}
				} else {
					if (child.balls >= 25) {
						if (canWalk(child)) {
							r += `${His} balls are so massive that it is difficult for ${him} to move. `;
							if (child.muscles > 95) {
								r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
							} else if (child.muscles > 30) {
								r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
							} else if (child.muscles > 5) {
								r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
							} else {
								r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
							}
						} else if (child.balls >= 100) {
							r += `Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle. `;
						} else {
							r += `Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle. `;
						}

						if (child.balls > 90) {
							if (V.ballsAccessibility) {
								r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
							} else {
								r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
							}
							r += `wider than a standard doorway. `;
						}
					}
				}




				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum streams from the hole and down ${his} testicles; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the hole and down ${his} testicles; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}

				if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
					r += `The aphrodisiacs have ${him} so horny that there's a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum beading at`} the hole. `;
				} else if (child.energy > 95) {
					r += `As a nympho, ${he}'s almost always got a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole. `;
				} else if (child.fetishKnown) {
					if (child.fetishStrength > 60) {
						switch (child.fetish) {
							case "buttslut":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being buttfucked. `;
								break;
							case "cumslut":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being facefucked. `;
								break;
							case "humiliation":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being humiliated. `;
								break;
							case "submissive":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about submission. `;
								break;
							case "dom":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about dominating someone. `;
								break;
							case "masochist":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about pain. `;
								break;
							case "sadist":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about hurting someone. `;
								break;
							case "pregnancy":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about getting someone pregnant. `;
								break;
							case "boobs":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about boobs. `;
								break;
						}
					}
				}

				if (child.prostate > 2) {
					r += `This hole is normally almost invisible, making it absolutely shocking when ${he} orgasms and shoots a massive cumshot out of it. `;
				} else if (child.balls !== 0) {
					r += `This hole is normally almost invisible, making it quite surprising when ${he} orgasms and shoots cum out of it. `;
				} else if (child.prostate !== 0) {
					r += `This hole is normally almost invisible, though it does leak some watery ejaculate when ${he} orgasms. `;
				}

				if (child.balls >= 50) {
					r += `${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts down ${his} balls. `;
				} else if (child.balls >= 37) {
					r += `${His} perpetual stream of semen-laced precum running down ${his} balls leaves a mess on the floor wherever ${he} goes. `;
				} else if (child.balls >= 25) {
					r += `Parts of the constant dribble coming out of the hole are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release. `;
				} else if (child.balls >= 10) {
					r += `${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}. `;
				}

				if (child.prostate > 2) {
					r += `${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate. `;
				}
			} else {
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. `;
				}
			}
		}

		if (!child.prostate) {
			if (child.dick > 0 || child.balls > 0) {
				if (child.genes === "XY") {
					r += `Though it's not externally apparent, ${his} prostate has been removed, `;
				} else {
					r += `${He} is lacking a prostate, `;
				}
				r += `giving ${his} ejaculations less body${child.anus !== 0 ? ` and reducing the stimulation ${he} feels during anal sex` : ``}. `;
			}
		}

		if (V.showBodyMods) {
			r += tats.dick(child);
			r += piercings.dick(child);
		}
		r += App.Desc.brand(child, "penis");
		r += App.Desc.brand(child, "testicle");

		return r;
	}

	function ears(child) {
		let
			r = ``;

		switch (child.earShape) {
			case "none":
				if (child.earImplant) {
					if (child.earT !== "none") {
						r += `${He} has smooth skin where ${his} ears should be as ${his} hearing has been cybernetically rerouted to ${his} secondary ears. `;
					} else {
						r += `${He} has nothing but small, perforated metal disks where ${his} ears should be. `;
					}
				} else if (child.earWear === "none") {
					r += `${He} has small unsightly holes on the sides of ${his} head. `;
				} else {
					r += `The sides of ${his} head are smooth where ${his} ears should be, but upon closer inspection it is revealed that `;
					if (child.earWear === "hearing aids") {
						r += `${his} ear canals are fitted with hearing aids capped with a skin-matching sheet to obscure the hole. `;
					} else {
						r += `${his} ear canals are filled with plugs with skin-matching caps. `;
					}
				}
				break;
			case "damaged":
				r += `${His} outer ears have been severely damaged. `;
				break;
			case "normal":
				r += `${He} has perfectly ordinary ears. `;
				break;
			case "robot":
				r += `${He} has high tech cyber-ears that could be mistaken for headphones. `;
				break;
			case "pointy":
				r += `${His} small, ${jsEither("elfin", "leaf-shaped", "pointed")} ears are quite cute and give ${him} an exotic appearance. `;
				break;
			case "elven":
				r += `${He} has long, thin elven ears that ${jsEither(`tend to droop when ${he} is relaxed or sad`, `tend to waggle up and down when ${he} is excited`, `twitch at the slightest touch`)}. `;
				break;
			case "ushi":
				r += `${He} has long, floppy cow ears. `;
				break;
		}

		switch (child.earT) {
			case "neko":
				r += `${He} has cute, ${child.earTColor} cat ears on ${his} head, they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "inu":
				r += `${He} has cute, ${child.earTColor} dog ears on ${his} head, they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "kit":
				r += `${He} has elegant, ${child.earTColor} fox ears on ${his} head, they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "tanuki":
				r += `${He} has adorable, ${child.earTColor}, round tanuki ears on ${his} head; they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "normal":
				r += `${He} has ${child.earShape !== "none" ? `a second set` : `a pair`} of non-functioning ears grafted to the top of ${his} head. `;
				break;
		}

		if (child.hears < 0) {
			if (child.hears === -1) {
				r += `${His} hearing is noticeably impaired, `;
			} else if (child.hears < -1) {
				r += `${He} is completely deaf, `;
			}

			if (child.hears < -1 && child.earShape === "none") {
				r += `which is fitting due to ${his} lack of ears. `;
			} else {
				r += `but this isn't obvious just by looking at ${his} ears. `;
			}
		}

		return r;
	}

	function face(child) {
		let
			r = ``;

		r += `${His} <span class="pink">face is `;
		switch (child.faceShape) {
			case "masculine":
				if (child.face < -95) {
					r += `so ugly and masculine that ${his} designation as a slave girl is a mockery. `;
				} else if (child.face < -40) {
					r += `ugly and masculine, making ${him} a poor slave girl by appearance. `;
				} else if (child.face < -10) {
					r += `unattractively masculine. `;
				} else if (child.face <= 10) {
					r += `masculine, but not entirely unappealing. `;
				} else if (child.face <= 40) {
					r += `attractively masculine. `;
				} else if (child.face <= 95) {
					r += `quite handsome in a masculine way. `;
				} else {
					r += `the height of masculine handsomeness. `;
				}
				break;
			case "androgynous":
				if (child.face < -95) {
					r += `disturbingly androgynous and terribly ugly. `;
				} else if (child.face < -40) {
					r += `ugly and androgynous; ${he} has neither masculine nor feminine appeal. `;
				} else if (child.face < -10) {
					r += `strangely androgynous, and rather unattractive. `;
				} else if (child.face <= 10) {
					r += `strangely androgynous. `;
				} else if (child.face <= 40) {
					r += `androgynous, and attractive enough that this ambiguity is interesting. `;
				} else if (child.face <= 95) {
					r += `gorgeously androgynous in a complex way that captures the eye. `;
				} else {
					r += `so gorgeously androgynous that ${he} tends to induce sexual confusion. `;
				}
				break;
			case "cute":
				if (child.face < -95) {
					r += `very ugly, yet somehow cute; ${he}'s so unattractive that ${he} inspires pity. `;
				} else if (child.face < -40) {
					r += `ugly, but cute, with a pitiable appeal. `;
				} else if (child.face < -10) {
					r += `not attractive, but is appealingly cute. `;
				} else if (child.face <= 10) {
					r += `merely average, but is appealingly cute. `;
				} else if (child.face <= 40) {
					r += `both attractive and appealingly cute. `;
				} else if (child.face <= 95) {
					r += `beautiful, yet somehow also approachably cute. `;
				} else {
					r += `an impossibly perfect combination of beauty and girl-next-door cuteness. `;
				}
				break;
			case "sensual":
				if (child.face < -95) {
					r += `very ugly, yet naturally slutty, promising a decent fuck despite its appearance. `;
				} else if (child.face < -40) {
					r += `ugly, but also slutty, promising a good fuck despite its appearance. `;
				} else if (child.face < -10) {
					r += `not attractive, but it has a certain sensual appeal. `;
				} else if (child.face <= 10) {
					r += `merely average, but undeniably sensual. `;
				} else if (child.face <= 40) {
					r += `both attractive and naturally sultry. `;
				} else if (child.face <= 95) {
					r += `both beautiful and sultry, bringing sex to mind naturally. `;
				} else {
					r += `very beautiful in a consummately sexual way. `;
				}
				break;
			case "exotic":
				if (child.face < -95) {
					r += `very ugly and unusual, a real tragedy in flesh. `;
				} else if (child.face < -40) {
					r += `ugly and unusual, a real misfortune. `;
				} else if (child.face < -10) {
					r += `unattractive, and distinctive in its unattractiveness. `;
				} else if (child.face <= 10) {
					r += `quite average, but not uninteresting. `;
				} else if (child.face <= 40) {
					r += `attractive in an exotic and interesting way. `;
				} else if (child.face <= 95) {
					r += `exotic and beautiful, capable of catching the eye and keeping its gaze. `;
				} else {
					r += `very beautiful and exotic, almost to the point of alien fascination. `;
				}
				break;
			default:
				if (child.face < -95) {
					r += `very ugly. `;
				} else if (child.face < -40) {
					r += `quite ugly. `;
				} else if (child.face < -10) {
					r += `unattractive. `;
				} else if (child.face <= 10) {
					r += `average and conventionally feminine. `;
				} else if (child.face <= 40) {
					r += `conventionally attractive. `;
				} else if (child.face <= 95) {
					r += `conventionally beautiful. `;
				} else {
					r += `the height of conventional feminine beauty. `;
				}
				break;
		}
		r += `</span> `;

		if (child.weight > 190) {
			r += `${His} face is quite fat with ample excess chins. `;
		} else if (child.weight > 160) {
			r += `${His} face is round and plump with a trio of extra chins. `;
		} else if (child.weight > 130) {
			r += `${His} face is chubby with an obvious second chin. `;
		} else if (child.weight > 97) {
			r += `${His} face is soft with barely a second chin. `;
		}

		if (child.markings === "beauty mark") {
			if (child.face < -95) {
				r += `It bears a severely disfiguring, discolored mark. `;
			} else if (child.face < -40) {
				r += `It bears a couple of unsightly moles. `;
			} else if (child.face < -10) {
				r += `It bears an ugly mole. `;
			} else if (child.face <= 10) {
				r += `${He} has a distinctive beauty mark. `;
			} else if (child.face <= 40) {
				r += `${He} has a nice beauty mark. `;
			} else if (child.face <= 95) {
				r += `${He} has a beauty mark that adds to ${his} distinctiveness. `;
			} else {
				r += `${He} has a beauty mark that makes ${him} really memorable. `;
			}
		}

		if (child.faceImplant > 5) {
			r += `${He}'s `;
			if (child.faceImplant > 95) {
				r += `had so much cosmetic surgery that ${his} face is located at the bottom of the uncanny valley ${child.face < -10 ? `in addition to its ugliness` : child.face <= 10 ? `the only thing really distinctive about it` : `its attractiveness notwithstanding`}. `;
			} else if (child.faceImplant > 60) {
				r += `obviously gotten a lot of facial cosmetic surgery. `;
			} else if (child.faceImplant > 30) {
				r += `noticeably received facial cosmetic surgery. `;
			} else {
				if (PC.skill.medicine >= 100) {
					r += `Someone without your knowledge might miss it entirely. `;
				}
			}

			if (arcology.FSBodyPurist !== "unset") {
				if (child.faceImplant > 30) {
					r += `had some facial cosmetic surgery, though it's subtle. `;
				} else {
					r += `This is considered extremely tragic by a society that values bodily purity. `;
				}
			} else if (arcology.FSTransformationFetishist !== "unset") {
				if (child.faceImplant > 30) {
					r += `Since society values bodily purity, even this subtlety affects ${his} attractiveness when it's noticed. `;
				} else {
					r += `Your transformationist society doesn't think this ${child.face < -10 ? `makes ${him} uglier` : `reduces ${his} attractiveness`}. `;
				}
			} else {
				if (child.faceImplant > 30) {
					r += `The effect is enough to reduce ${his} attractiveness. `;
				}
			}
		}

		if (child.smells === -1) {
			r += `${He} has no sense of smell, but this isn't immediately obvious just by looking at ${his} nose. `;
		}

		if (V.showBodyMods) {
			if (!child.fuckdoll) {
				r += makeup(child);
				r += tats.lips(child);
			}
		}

		return r;
	}

	function flowers(child) {
		let
			r = ``;

		if (child.dick > 0 && !child.balls) {
			r += `a white orchid, its black stamen stiffly erect. `;
		} else if (child.dick > 0) {
			r += `a morning glory, light around its edges with a puckered pink center. `;
		} else if (child.addict > 5) {
			r += `a large poppy, its pod glistening with black opiate juice. `;
		} else if (child.vagina === 0) {
			r += `a white lily, pure and unspoiled. `;
		} else if (child.pregType > 3 && child.pregKnown) {
			r += `a pink lotus, beautiful and fertile. `;
		} else if (child.energy > 95) {
			r += `a flamboyant tiger lily. `;
		} else if (child.actualAge < 15) {
			r += `an innocent little peony. `;
		} else if (child.boobs > 2000) {
			r += `a huge round sunflower. `;
		} else {
			r += `a nice red rose. `;
		}

		return r;
	}

	function footwear(child) {
		let
			r = ``;

		if (hasAnyLegs(child)) {
			switch (child.clothes) {
				case "a slave gown":
					switch (child.shoes) {
						case "flats":
							r += `a pair of fashionable slingback sandals. `;
							break;
						case "boots":
							r += `elegant worked leather boots. `;
							break;
						case "pumps":
							r += `kitten heels. `;
							break;
						case "heels":
							r += `sleek pumps. `;
							break;
						case "extreme heels":
							r += `daring spike heels so high ${his} butt is at dick height. `;
							break;
						default:
							r += `nothing on ${his} bare feet. `;
							break;
					}
					break;
				case "a ball gown":
					switch (child.shoes) {
						case "flats":
							r += `a delicate pair of dancing slippers. `;
							break;
						case "boots":
							r += `a dainty pair of heeled booties. `;
							break;
						case "pumps":
							r += `an ornate pair of stiletto heels. `;
							break;
						case "heels":
							r += `an ornate pair of stiletto pumps. `;
							break;
						case "extreme heels":
							r += `an ornate pair of stiletto heels so extreme ${he} has to concentrate just to stand. `;
							break;
						default:
							r += `ridiculously bare stockinged feet. `;
							break;
					}
					break;
				case "a mini dress":
					switch (child.shoes) {
						case "flats":
							r += `suede flats. `;
							break;
						case "boots":
							r += `suede thigh-high boots. `;
							break;
						case "pumps":
							r += `suede ankle strap heels. `;
							break;
						case "heels":
							r += `suede ankle strap pumps. `;
							break;
						case "extreme heels":
							r += `suede ankle strap heels so tall, ${he} has to walk with ${his} ass sticking out. `;
							break;
						default:
							r += `bare feet. `;
							break;
					}
					break;
				case "a tube top":
				case "an oversized t-shirt":
				case "a t-shirt":
				case "a sweater":
				case "a tank-top":
					switch (child.shoes) {
						case "flats":
							r += `a pair of comfortable shoes. `;
							break;
						case "boots":
							r += `a pair of heeled boots. `;
							break;
						case "pumps":
							r += `a pair of heels. `;
							break;
						case "heels":
							r += `a pair of pumps. `;
							break;
						case "extreme heels":
							r += `a pair of heels so extreme ${he}'s practically on tiptoe. `;
							break;
						default:
							r += `nothing on ${his} feet. `;
							break;
					}
					break;
				case "a schoolgirl outfit":
					switch (child.shoes) {
						case "flats":
							r += `girly tennis shoes with bright white laces. `;
							break;
						case "boots":
							r += `brown leather riding boots with buckled tops. `;
							break;
						case "pumps":
							r += `black heels with little plaid bows. `;
							break;
						case "heels":
							r += `black pumps with little plaid bows. `;
							break;
						case "extreme heels":
							r += `tall black pump heels with little plaid bows. `;
							break;
						default:
							r += `bare feet. `;
							break;
					}
					break;
				default:
					switch (child.shoes) {
						case "flats":
							r += `a pair of simple sandals which just call attention to ${his} otherwise nude state. `;
							break;
						case "boots":
							r += `a pair of sexy leather boots which just call attention to ${his} otherwise nude state. `;
							break;
						case "pumps":
							r += `a pair of sexy heels which just call attention to ${his} otherwise nude state. `;
							break;
						case "heels":
							r += `a pair of sexy pumps which just call attention to ${his} otherwise nude state. `;
							break;
						case "extreme heels":
							r += `a pair of daringly high heels which just call attention to ${his} otherwise nude state. `;
							break;
						default:
							r += `nothing on ${his} bare feet either, naturally. `;
							break;
					}
					break;
			}
		}

		return r;
	}

	function hair(child) {
		let
			r = `${His} `,
			hLength;

		switch (child.hStyle) {
			case "bald":
				r += `hair no longer grows. If it did, it would be ${child.origHColor}. `;
				break;
			case "shaved":
			case "shaved bald":
				r += `hair has been shaved. If ${his} hair were visible, it would be ${child.hColor}. `;
				break;
			case "buzzcut":
				r += `${child.hColor} hair is in a short buzzcut. `;
				break;
			case "trimmed":
				r += `${child.hColor} hair is trimmed short. `;
				break;
			case "afro":
				r += `${child.hColor} hair is in a `;
				if (child.hLength > 100) {
					r += `gigantic puffed-up afro and looks ridiculous. `;
				} else if (child.hLength > 30) {
					r += `puffy afro. `;
				} else {
					r += `short afro. `;
				}
				break;
			case "cornrows":
				r += `${child.hColor} hair is formed tightly into cornrows in a decorative pattern on ${his} head, dangling `;
				if (child.hLength >= 150) {
					r += `down calf-length, `;
				} else if (child.hLength >= 100) {
					r += `down ass-length, `;
				} else if (child.hLength >= 30) {
					r += `down long, `;
				} else if (child.hLength >= 10) {
					r += `down shoulder-length, `;
				} else {
					r += `down, `;
				}
				r += `with colorful beads interspersed in them. `;
				break;
			case "bun":
				r += `${child.hColor} hair is `;
				if (child.hLength >= 100) {
					r += `packed tightly into a huge puffy `;
				} else if (child.hLength >= 30) {
					r += `packed into a large `;
				} else if (child.hLength >= 10) {
					r += `tied into a small `;
				} else {
					r += `tied into a `;
				}
				r += `bun. `;
				break;
			case "messy bun":
				r += `${child.hColor} hair is `;
				if (child.hLength >= 100) {
					r += `packed tightly into a huge messy `;
				} else if (child.hLength >= 30) {
					r += `packed into a large messy `;
				} else if (child.hLength >= 10) {
					r += `tied into a small messy `;
				} else {
					r += `tied into a messy `;
				}
				r += `bun. `;
				break;
			case "braided":
			case "curled":
			case "dreadlocks":
			case "luxurious":
			case "neat":
			case "permed":
			case "ponytail":
			case "strip":
			case "tails":
			case "up":
				hLength = child.hLength / child.height;
				if (child.hLength > 0.9) {
					r += `floor-length, `;
				} else if (hLength > 0.8) {
					r += `calf-length, `;
				} else if (hLength > 0.7) {
					r += `knee-length, `;
				} else if (hLength >= 0.6) {
					r += `thigh-length, `;
				} else if (hLength >= 0.4) {
					r += `ass-length, `;
				} else if (hLength >= 0.2) {
					r += `long, `;
				} else if (hLength >= 1.5) {
					r += `shoulder-length, `;
				} else {
					r += `short, `;
				}
				r += `${child.hColor} hair`;
				r += hairClothing(child);
				break;
			default:
				r += `${child.hColor} hair is ${child.hStyle}. `;
				break;
		}

		r += `${His} `;
		if (child.eyebrowHStyle === "bald") {
			r += `brows do not grow hair. ${His} eyebrows would be ${child.eyebrowHColor} in color if they did. `;
		} else if (child.eyebrowHStyle === "shaved") {
			r += `eyebrows have${child.hStyle === "shaved" || child.hStyle === "shaved bald" ? ` also` : ``} been shaved off. If they were visible, they would be ${child.eyebrowHColor} in color. `;
		} else {
			r += `${child.eyebrowHColor} eyebrows `;

			switch (child.eyebrowHStyle) {
				case "slanted inwards":
					r += `slant inwards from the sides of ${his} forehead down to the center of ${his} head. `;
					break;
				case "slanted outwards":
					r += `slant outwards from the center of ${his} head down to the sides of ${his} forehead. `;
					break;
				case "rounded":
					r += `form perfect semicircles. `;
					break;
				case "natural":
					r += `naturally contour to the shape of ${his} brow. `;
					break;
				case "curved":
					r += `form small "S"-shaped curves above ${his} eyes. `;
					break;
				case "straight":
					r += `are near perfectly straight, instead of curving. `;
					break;
				case "high-arched":
					r += `form tall arches on ${his} forehead. `;
					break;
				case "elongated":
					r += `are elongated to cover far more of ${his} brow than what would be considered average. `;
					break;
				case "shortened":
					r += `are shortened to cover far less of ${his} brow than what would be considered average. `;
					break;
				default:
					r += `are styled to be ${child.eyebrowHStyle}. `;
					break;
			}

			r += `They're `;

			switch (child.eyebrowFullness) {
				case "pencil-thin":
					r += `incredibly and unnaturally light and thin. `;
					break;
				case "thin":
					r += `considerably thinner than what would be considered average. `;
					break;
				case "threaded":
					r += `styled to be thinner on the sides but otherwise normal. `;
					break;
				case "natural":
					r += `kept to a natural level of fullness. `;
					break;
				case "tapered":
					r += `styled to be thicker in the center but otherwise normal. `;
					break;
				case "thick":
					r += `considerably thicker than what would be considered average. `;
					break;
				case "bushy":
					r += `incredibly and unnaturally full and bushy. `;
					break;
				default:
					r += `${child.eyebrowFullness}. `;
					break;
			}
		}

		return r;
	}

	function hairClothing(child) {
		let
			r = ``;

		switch (child.hStyle) {
			case "neat":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is kept out of ${his} face by a pastel-colored headband. `;
							break;
						default:
							r += `cascades almost to the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `flows fashionably down ${his} bare back. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is kept out of ${his} face by a pastel-colored headband. `;
							break;
						default:
							r += `is brushed back over ${his} shoulders. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `follows the latest fashion. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is kept out of ${his} face by a pastel-colored headband. `;
							break;
						default:
							r += `is brushed back. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a slave gown":
							r += `is gelled into a fashionable wave. `;
							break;
						case "a ball gown":
							r += `is gelled into a fashionable wave. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is neatly brushed. `;
							break;
					}
				}
				break;
			case "up":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is piled up on ${his} head in a perfect 60's beehive. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in a huge bun secured by a pastel scrunchy. `;
							break;
						default:
							r += `is back in an enormous bun. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is piled up on ${his} head in a perfect 60's beehive. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in a bun secured by a pastel scrunchy. `;
							break;
						default:
							r += `is back in a big bun. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is piled up on ${his} head in a perfect 60's 'do. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in a tight little bun secured by a pastel scrunchy. `;
							break;
						default:
							r += `is back in a tight little bun. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is combed back. `;
							break;
					}
				}
				break;
			case "tails":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in huge tails secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into beautiful long tails, one of which comes around to run down ${his} chest. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long tails and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long tails and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in twin tails that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in big tails secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into beautiful tails, one of which comes around to fall between ${his} breasts. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long tails and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long tails and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in long twin tails. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in short tails secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into short tails set low at the nape of ${his} neck. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in short braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in short braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in short braids. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is too short to be kept in proper tails, so it's simply combed back. `;
							break;
					}
				}
				break;
			case "ponytail":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in a huge ponytail secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into a beautiful long ponytail, which swooshes as ${he} moves. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in a ponytail that almost reaches the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in a big ponytail secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into a beautiful ponytail, which swooshes as ${he} moves. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in a long ponytail. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in a short ponytail secured by a hair tie with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into a short ponytail set low at the nape of ${his} neck. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in a ponytail and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in a ponytail and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in a short ponytail. `;
							break;
					}
				} else {
					r += `is too short to be kept in a proper ponytail, so it's simply combed back. `;
				}
				break;
			case "braided":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in huge braids secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into beautiful long braids, one of which comes around to run down ${his} chest. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in braids that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in long braids secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a ball gown":
						case "a slave gown":
							r += `is in beautiful braids, one of which comes around to fall between ${his} breasts. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in long braids. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in short braids secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into short braids set low at the nape of ${his} neck. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in short braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in short braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in short braids. `;
							break;
					}
				} else {
					switch (child.clothes) {
						default:
							r += `is too short to be kept in proper braids, so it's simply combed back. `;
							break;
					}
				}
				break;
			case "dreadlocks":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is in dreadlocks, some in ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is in dreadlocks, spreading out in many directions and almost reaching the ground. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long dreadlocks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long dreadlocks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in dreadlocks that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is in dreadlocks, some in hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
							r += `is in dreadlocks, spreading out in many directions. `;
							break;
						case "a ball gown":
							r += `is in dreadlocks, spreading out in many directions. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in dreadlocks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in dreadlocks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in dreadlocks. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is in short dreadlocks, some in hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is in short dreadlocks, spreading around ${his} head. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in short dreadlocks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in short dreadlocks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in short dreadlocks. `;
							break;
					}
				} else {
					switch (child.clothes) {
						default:
							r += `is too short to be kept in proper dreadlocks, so it's simply combed back. `;
							break;
					}
				}
				break;
			case "curled":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is curled into long flowing locks secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is curled into long flowing locks, almost reaching the ground. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is curled into long flowing locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is curled into long flowing locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is curled into long flowing locks that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is curled into long locks secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is curled into long locks, reaching past ${his} shoulders. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is curled into long locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is curled into long locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is curled into long locks. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is curled into short locks secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is curled into short locks. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is curled into short locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is curled into short locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is curled into short locks. `;
							break;
					}
				} else {
					switch (child.clothes) {
						default:
							r += `is in short curls. `;
							break;
					}
				}
				break;
			case "permed":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is permed into long flowing curls secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is permed into long flowing curls, almost reaching the ground. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is permed and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is permed and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is permed; ${his} curls almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is permed and secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is permed, reaching past ${his} shoulders. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is permed and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is permed and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is permed. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is permed into short waves secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is permed into short waves. `;
							break;
						case "a burkini":
						case "a burqa":
						case "a hijab and abaya":
						case "a hijab and blouse":
						case "a niqab and abaya":
							r += `is permed into short waves, but they're hidden by ${his} modest garb. `;
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r += `is permed into short waves, but they're hidden by ${his} hood. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is permed into short waves and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is permed into short waves and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is permed into short waves. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a burkini":
						case "a burqa":
						case "a hijab and abaya":
						case "a hijab and blouse":
						case "a niqab and abaya":
							r += `is hidden by ${his} modest garb. `;
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r += `is hidden by ${his} hood. `;
							break;
						default:
							r += `is permed into short curls. `;
							break;
					}
				}
				break;
			case "luxurious":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is in luxurious layered locks flowing gorgeously down ${his} bare back.habit": `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in luxurious layered locks kept out of ${his} face by a pastel-colored headband. `;
							r += `In ${his} hair is ${flowers(child)}`;
							break;
						default:
							r += `is in luxurious layered locks, cascading almost to the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is in luxurious layered locks flowing gorgeously down ${his} bare back.habit": `;
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r += `is in luxurious layered locks flowing gorgeously but not visible under ${his} modest head covering. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in luxurious layered locks kept out of ${his} face by a pastel-colored headband. `;
							r += `In ${his} hair is ${flowers(child)}`;
							break;
						default:
							r += `is brushed back over ${his} shoulders. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is in luxuriously styled short locks. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in luxuriously styled short locks kept out of ${his} face by a pastel-colored headband. `;
							r += `In ${his} hair is ${flowers(child)}`;
							break;
						default:
							r += `is brushed back. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is luxuriously styled and layered. `;
							break;
					}
				}
				break;
			case "strip":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a strip that cascades magnificently down ${his} back, with scores of tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved into a strip atop ${his} head that cascades magnificently down ${his} back. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a long braided strip with tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a long braided strip and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a long braided strip and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved into a long braided strip. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a strip down the middle of ${his} head with tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved into a strip. `;
							break;
					}
				} else {
					r += `is shaved into a mohawk. `;
				}
				break;
			case "bald":
				r += `is completely bald. `;
				break;
		}

		return r;
	}

	function heel(child) {
		let
			r = ``;

		if (child.heels) {
			r += `${His} <span class="pink">legs have been altered</span> so that ${he} must wear heels in order to walk. `;
		}

		if (V.showClothing && !V.saleDescription) {
			if (hasAnyLegs(child)) {
				if (child.shoes !== "none" && child.shoes !== "flats") {
					r += `${He} is, so ${he} can walk reasonably well. `;
				} else {
					r += `Since ${he} is without them, ${he}'s crawling on all fours. `;
				}
			}
		}

		return r;
	}

	function heightImplant(child) {
		let
			r = ``;

		if (child.heightImplant > 0) {
			r += `The proportions of ${his} arms and legs are odd, as though they have been artificially lengthened. `;
		} else if (child.heightImplant < 0) {
			r += `The proportions of ${his} arms and legs are odd, as though they have been surgically shortened. `;
		}

		return r;
	}

	function hips(child) {
		let
			r = ``;

		if (child.hips < -1) {
			if (child.butt > 2) {
				r += `${His} butt is `;
				if (arcology.FSHedonisticDecadence !== "unset") {
					r += `disproportionately large for ${his} narrow hips, but your hedonistic arcology finds this attractive. `;
				} else if (arcology.FSTransformationFetishist !== "unset") {
					r += `disproportionately large for ${his} narrow hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (arcology.FSAssetExpansionist !== "unset") {
					r += `disproportionately large for ${his} narrow hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} narrow hips. `;
				}
			} else {
				r += `${His} hips are very narrow. `;
			}
		} else if (child.hips < 0) {
			if (child.butt > 4) {
				r += `${His} butt is `;
				if (arcology.FSHedonisticDecadence !== "unset") {
					r += `disproportionately large for ${his} trim hips, but your hedonistic arcology finds this attractive. `;
				} else if (arcology.FSTransformationFetishist !== "unset") {
					r += `disproportionately large for ${his} trim hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (arcology.FSAssetExpansionist !== "unset") {
					r += `disproportionately large for ${his} trim hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} trim hips. `;
				}
			} else {
				r += `${His} butt is complemented by ${his} trim hips. `;
			}
		} else if (child.hips > 2) {
			if (child.butt <= 8) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} monstrous hips. `;
			} else {
				r += `${His} butt is fitting for ${his} monstrous hips. `;
			}
		} else if (child.hips > 1) {
			if (child.butt <= 3 && (arcology.FSSlimnessEnthusiast === "unset" || child.boobs >= 500)) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} very wide hips${arcology.FSSlimnessEnthusiast !== "unset" ? `, which your arcology finds unattractive on busty slaves` : ``}. `;
			} else {
				r += `${His} butt is flattered by ${his} very wide hips. `;
			}
		} else if (child.hips > 0) {
			if (child.butt > 8) {
				r += `${His} butt is `;
				if (arcology.FSHedonisticDecadence !== "unset") {
					r += `disproportionately large for ${his} broad hips, but your hedonistic arcology finds this attractive. `;
				} else if (arcology.FSTransformationFetishist !== "unset") {
					r += `disproportionately large for ${his} broad hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (arcology.FSAssetExpansionist !== "unset") {
					r += `disproportionately large for ${his} broad hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} broad hips. `;
				}
			} else if (child.butt <= 2 && (arcology.FSSlimnessEnthusiast === "unset" || child.boobs >= 500)) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} broad hips${arcology.FSSlimnessEnthusiast !== "unset" ? `, which your arcology finds unattractive on busty slaves` : ``}. `;
			} else {
				r += `${His} butt is complemented by ${his} broad hips. `;
			}
		} else {
			if (child.butt > 6) {
				r += `${His} butt is `;
				if (arcology.FSHedonisticDecadence !== "unset") {
					r += `disproportionately large for ${his} womanly hips, but your hedonistic arcology finds this attractive. `;
				} else if (arcology.FSTransformationFetishist !== "unset") {
					r += `disproportionately large for ${his} womanly hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (arcology.FSAssetExpansionist !== "unset") {
					r += `disproportionately large for ${his} womanly hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} womanly hips. `;
				}
			} else if (child.butt <= 1 && (arcology.FSSlimnessEnthusiast === "unset" || child.boobs >= 500)) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} ample hips${arcology.FSSlimnessEnthusiast !== "unset" ? `, which your arcology finds unattractive on busty slaves` : ``}. `;
			} else {
				r += `${His} butt is complemented by ${his} ample hips. `;
			}
		}

		switch (child.tailShape) {
			case "neko":
				r += `${He} has a long, slender, ${child.tailColor} cat tail which tends to sway side to side when ${he} is focused on a task. `;
				break;
			case "inu":
				r += `${He} has a bushy, ${child.tailColor} dog tail which tends to wag energetically when ${he} gets exited. `;
				break;
			case "kit":
				r += `${He} has a soft, fluffy, ${child.tailColor} fox tail. `;
				break;
			case "kitsune":
				r += `${He} has three incredibly soft, fluffy, ${child.tailColor} fox tails, they feel heavenly to the touch. `;
				break;
			case "tanuki":
				r += `${He} has a long, fluffy, ${child.tailColor} tanuki tail with a dark stripe running down the middle. `;
				break;
			case "ushi":
				r += `${He} has a long, ${child.tailColor} cow tail, it has a small tuft of hair at the end and tends to swat at things absentmindedly. `;
				break;
			default:
				if (child.tail === "combat") {
					r += `${He} has a very long ${child.tailColor} metallic tail that can lash out, constrict, and deploy razor sharp spikes on command. `;
				} else if (child.tail === "sex") {
					r += `${He} has a long, slender, ${child.tailColor} tail. While not strong it is very dexterous and has a small fleshy spade-shaped tip that can vibrate and dispense lube on command. `;
				}
		}

		return r;
	}

	function makeup(child) {
		let
			r = ``;

		if (child.makeup > 0) {
			switch (child.makeup) {
				case 1:
					r += `${He}'s wearing minimal makeup. `;
					break;
				case 2:
					r += `${He}'s wearing expensive, luxurious makeup. `;
					break;
				case 3:
					r += `${His} makeup is color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 4:
					r += `${He}'s wearing stereotypical, garish streetwalker makeup. `;
					break;
				case 5:
					r += `${He}'s wearing eye-catching neon makeup. `;
					break;
				case 6:
					r += `${His} neon makeup is color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 7:
					r += `${He}'s wearing expensive, metallic makeup. `;
					break;
				case 8:
					r += `${His} metallic makeup is color-coordinated with ${his} ${child.hColor} hair. `;
					break;
			}
		} else if (child.lipsTat === "permanent makeup") {
			r += `${His} face appears to bear very heavy, slutty makeup, but on closer inspection, the makeup is actually tattooed on. `;
		} else {
			r += `${His} face is makeup-free. `;
		}

		return r;
	}

	function master(child) {
		let
			r = ``;

		if (jsDef(child)) {
			Enunciate(child);
		} else if (!jsDef(V.titleEnunciate)) {
			Enunciate(child);
		}

		r += `${V.titleEnunciate}`;

		return r;
	}

	function mouth(child) {
		let
			r = ``;

		r += `${He} has `;
		if (child.lips <= 10) {
			r += `thin, unattractive lips. `;
		} else if (child.lips <= 20) {
			r += `normal lips. `;
		} else if (child.lips <= 40) {
			r += `full, attractive lips. `;
		} else if (child.lips <= 70) {
			r += `plump, beestung lips. `;
		} else if (child.lips <= 95) {
			r += `huge, obviously augmented lips. `;
		} else {
			r += `a facepussy: ${his} lips are so huge that they're always a bit parted in the middle, forming a moist, inviting hole${PC.dick ? ` for cock` : ``}. `;
		}

		if (V.showImplantEffects) {
			if (arcology.FSTransformationFetishist !== "unset") {
				if (child.lipsImplant > 0) {
					r += `They are about ${Math.floor((child.lipsImplant / child.lips) * 100)}% implant. `;
				}
				if (arcology.FSTransformationFetishist > 20) {
					if (child.lips > 70) {
						if (child.lipsImplant / child.lips < .50) {
							r += `${His} lips are huge and <span class="red">disgustingly natural</span> for their size. `;
						} else {
							r += `${His} lips are huge and <span class="green">obviously implants,</span> as they should be. `;
						}
					}
				}
			}
		}

		if (canTalk(child)) {
			if (child.lips > 70) {
				r += `${He} can barely enunciate past ${his} dick-sucking lips; '${WrittenMaster(child)}' comes out as '${master(child)}.' `;
			}
		}

		if (child.teeth !== "normal") {
			if (child.teeth === "crooked") {
				r += `${His} teeth are <span class="yellow">crooked,</span> detracting from ${his} beauty whenever ${he} opens ${his} mouth. `;
			} else if (child.teeth === "straightening braces") {
				r += `${He} has braces, ${child.visualAge < 15 ? `a cute look on such a young girl. ` : `and occasionally looks preoccupied with discomfort as they straighten ${his} teeth. `}`;
			} else if (child.teeth === "cosmetic braces") {
				r += `${He}'s wearing braces despite ${his} straight teeth, ${child.visualAge < 15 ? `a cute look on such a young girl. ` : `just for appearances. `}`;
			} else if (child.teeth === "gapped") {
				r += `${He} has a prominent gap between ${his} front teeth${child.faceShape === "cute" ? ` that suits ${his} cute face surprisingly well` : ``}. `;
				if (canTalk(child)) {
					r += `It also leaves ${him} with a slight lisp. `;
				}
			} else if (child.teeth === "removable") {
				r += `${His} teeth have been removed and replaced with high-quality dentures. It's difficult to tell anything's unusual until you take them out for gummy oral sex. `;
			} else if (child.teeth === "pointy") {
				r += `${His} teeth have been replaced with realistic implants that mimic the dentition of a carnivore. ${His} smiles are frightening, and ${he} can bare them to become truly terrifying. `;
			} else if (child.teeth === "baby") {
				r += `${He} still has ${his} baby teeth. `;
			} else if (child.teeth === "mixed") {
				r += `${He} is in the process of replacing ${his} baby teeth. `;
			}
		}

		if (child.tastes === -1) {
			r += `${He} has no sense of taste, but this isn't immediately obvious just by looking at ${his} tongue. `;
		}

		if (V.showBodyMods) {
			r += piercings.lips(child);
			r += piercings.tongue(child);
		}

		r += `${He} is `;
		if (child.skill.oral >= 100) {
			r += `an <span class="aquamarine">oral sex master.</span> `;
		} else if (child.skill.oral > 60) {
			r += `an <span class="aquamarine">expert at oral.</span> `;
		} else if (child.skill.oral > 30) {
			r += `<span class="aquamarine">orally skilled.</span> `;
		} else if (child.skill.oral > 10) {
			r += `<span class="aquamarine">capable of basic oral sex.</span> `;
		} else {
			r += `unskilled at oral sex. `;
		}

		return r;
	}

	function nails(child) {
		let
			r = ``;

		if (!hasAnyArms(child)) {
			r += `${He} has no hands, and thus, no nails. `;
		} else {
			switch (child.nails) {
				case 1:
					r += `${His} nails are long and elegant. `;
					break;
				case 2:
					r += `${His} nails are color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 3:
					r += `${His} nails are sharp and claw-like. `;
					break;
				case 4:
					r += `${His} nails are bright and glittery. `;
					break;
				case 5:
					r += `${His} nails are long and garish, streetwalker-style. `;
					break;
				case 6:
					r += `${His} nails are vivid and eye-catching. `;
					break;
				case 7:
					r += `${His} nails are vivid, eye-catching and color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 8:
					r += `${His} nails are shiny and metallic. `;
					break;
				case 9:
					r += `${His} nails are shiny, metallic and color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				default:
					r += `${His} nails are neatly clipped. `;
					break;
			}
		}

		return r;
	}

	function piercings() {
		function anus(child) {
			let
				r = ``;

			if (child.vagina > -1) {
				if (child.anusPiercing === 1) {
					r += `${He} has a simple piercing between ${his} pussy and ${his} asshole. `;
				} else if (child.anusPiercing === 2) {
					r += `${He} has a big ring between ${his} pussy and ${his} asshole and studs in all around ${his} anus. `;
				}
			} else {
				if (child.anusPiercing === 1) {
					r += `${He} has a simple perianal piercing between the base of ${his} dick and ${his} girly butthole. `;
				} else if (child.anusPiercing === 2) {
					r += `${He} has a big ring between the base of ${his} dick and ${his} girly butthole, which has studs all around it. `;
				}
			}

			return r;
		}

		piercings.anus = anus;

		function clit(child) {
			let
				r = ``;

			switch (child.clitPiercing) {
				case 3:
					if (child.vagina > -1) {
						r += `${He} has a smart piercing in ${his} clit. `;
					} else {
						r += `${He} has a smart frenulum piercing. `;
					}
					break;
				case 2:
					if (child.vagina > -1) {
						r += `${He} has a big ring in ${his} clit. `;
					} else {
						r += `${He} has a big ring in ${his} dickhead. `;
					}
					break;
				case 1:
					if (child.vagina > -1) {
						r += `${He} has a simple clitoral stud. `;
					} else {
						r += `${He} has a simple dickhead stud. `;
					}
					break;
			}

			return r;
		}

		piercings.clit = clit;

		function corset(child) {
			let
				r = ``;

			if (child.corsetPiercing > 0) {
				r += `${He} has a corset piercing, a ladder of steel rings running up each side of ${his} back: `;
				if (child.bellyAccessory === "a corset" || child.bellyAccessory === "an extreme corset") {
					r += `these are looped through special lugs in the back of ${his} actual corset, making it almost a part of ${his} body. `;
					if (child.devotion > 50) {
						r += `${He} couldn't remove it, even if ${he} wanted to. `;
					} else if (child.devotion >= -20) {
						r += `${He} couldn't remove it, even if ${he} were inclined to try. `;
					} else {
						r += `Any attempt to remove it will cause intense pain. `;
					}
				} else {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `${his} blouse hides them completely, but they're laced tightly, so ${he}'s aware they're there. `;
							break;
						case "a mini dress":
							r += `these are clipped into the mini dress covering them, making it almost a part of ${his} body. `;
							if (child.devotion > 50) {
								r += `${He} couldn't remove it, even if ${he} wanted to. `;
							} else if (child.devotion >= -20) {
								r += `${He} couldn't remove it, even if ${he} were inclined to try. `;
							} else {
								r += `Any attempt to remove it will cause intense pain. `;
							}
							break;
						case "a tube top":
							r += `the piercings are only partly visible on ${his} back. `;
							break;
						case "a t-shirt":
							r += `${his} shirt hides them completely, but they're laced tightly, so ${he}'s aware they're there. `;
							break;
						case "a slave gown":
							r += `they're revealed by the swooping back of ${his} gown and laced up with matching silk ribbon. `;
							break;
						default:
							r += `they're laced up with a ribbon, tightly enough to keep ${him} aware they're there. `;
							break;
					}
				}
			}

			return r;
		}

		piercings.corset = corset;

		function dick(child) {
			let
				r = ``;

			if (child.dick !== 0) {
				if (child.dickPiercing === 1) {
					r += `${He} has a row of studs down ${his} shaft. `;
				} else if (child.dickPiercing === 2) {
					r += `${He} has a row of heavy rings down ${his} shaft. `;
				}

				if (child.scrotum !== 0) {
					if (child.dickPiercing === 1) {
						r += `${He} has a couple of studs in ${his} ballsack. `;
					} else if (child.dickPiercing === 2) {
						r += `${He} has a row of rings down the center of ${his} ballsack, all the way from the base of ${his} shaft to ${his} perineum. `;
					}
				} else {
					if (child.dickPiercing === 1) {
						r += `${He} has a couple of studs beneath the base of ${his} dick. `;
					} else if (child.dickPiercing === 2) {
						r += `${He} has a row of rings all the way from the base of ${his} shaft to ${his} perineum. `;
					}
				}
			}

			return r;
		}

		piercings.dick = dick;

		function ears(child) {
			let
				r = ``;

			if (child.earPiercing > 0) {
				if (child.earPiercing === 1) {
					r += `${His} earlobes are conventionally pierced. `;
				} else {
					r += `${His} ears are heavily pierced, with multiple lobe piercings and a row of helix piercings. `;
				}

				switch (child.clothes) {
					case "a t-shirt":
						r += `${He}'s wearing plain but pretty earrings. `;
						break;
					case "a tube top":
						r += `${He}'s wearing large hoop earrings. `;
						break;
					case "a schoolgirl outfit":
						r += `${He}'s wearing small girlish earrings. `;
						break;
					case "a mini dress":
						r += `${He}'s wearing shiny pearl earrings. `;
						break;
					case "a slave gown":
					case "a ball gown":
						r += `${He}'s wearing lovely diamond earrings; the stones are cut in an alluring, feminine style. `;
						break;
				}
			}

			return r;
		}

		piercings.ears = ears;

		function eyebrows(child) {
			let
				r = ``;

			if (child.eyebrowPiercing === 1) {
				r += `${He} has a simple stud in one eyebrow. `;
			} else if (child.eyebrowPiercing === 2) {
				r += `${He} has multiple eyebrow rings. `;
			}

			return r;
		}

		piercings.eyebrows = eyebrows;

		function lips(child) {
			let
				r = ``;

			if (child.lipsPiercing === 1) {
				r += `${He} has a simple lip piercing. `;
			} else if (child.lipsPiercing === 2) {
				r += `${His} lips are heavily pierced. `;
			}

			return r;
		}

		piercings.lips = lips;

		function nipples(child) {
			let
				r = ``,
				nipColor = nippleColor(child);

			if (child.nipplesPiercing === 1) {
				r += `${His} ${nipColor} nipples have a simple piercing, which keeps them a little harder than they would normally be. `;
			} else if (child.nipplesPiercing === 2) {
				r += `${His} ${nipColor} nipples are heavily pierced with several rings and studs, and there is a chain between them. `;
				if (child.boobShape === "saggy" && child.boobs > 2500) {
					r += `It's been shortened to take advantage of the way ${his} tits sag, and holds ${his} ${nipColor} nipples almost together, producing cleavage that runs from ${his} ${nipColor} nipples all the way up to ${his} sternum. `;
				} else {
					r += `The constant tugging keeps ${his} ${nipColor} nipples erect. `;
				}

				if (child.nipplesPiercing > 0) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							if (child.boobs <= 2500) {
								r += `The piercings are tantalizingly visible under the thin material. `;
							}
							break;
						case "a mini dress":
							r += `The piercings are tantalizingly visible under the tight mini dress. `;
							break;
					}
				}
			}

			return r;
		}

		piercings.nipples = nipples;

		function nose(child) {
			let
				r = ``;

			if (child.nosePiercing === 1) {
				r += `${He} has simple studs in ${his} nose. `;
			} else if (child.nosePiercing === 2) {
				r += `${He} has nasal studs and a large septum ring. `;
			}

			return r;
		}

		piercings.nose = nose;

		function tongue(child) {
			let
				r = ``;

			if (child.tonguePiercing === 1) {
				r += `${His} tongue bears a single stud, so oral sex with ${him} is a bit more fun. `;
			} else if (child.tonguePiercing === 2) {
				r += `${His} tongue bears a row of studs, offering thorough stimulation to anyone ${he} blows. `;
			}
			if (canTalk(child) && child.lips <= 70 && child.lipsPiercing === 2) {
				r += `${He} can barely enunciate past ${his} piercings; '${WrittenMaster(child)}' comes out as '${master(child)}.' `;
			}

			return r;
		}

		piercings.tongue = tongue;

		function vagina(child) {
			let
				r = ``;

			if (child.vaginaPiercing > 0) {
				r += `${He} has a `;
				if (child.vaginaPiercing) {
					r += `simple row of studs `;
				} else {
					r += `row of big rings `;
				}
				r += `down ${his} labia. `;
			}

			return r;
		}

		piercings.vagina = vagina;
	}

	function shoulders(child) {
		let
			r = ``;

		if (child.shoulders < -1) {
			r += `${His} shoulders and chest are very narrow and `;
			if (child.boobs > 2000) {
				r += `feminine, forcing ${his} pressed-together tits to spread far beyond ${his} sides. `;
			} else {
				r += `feminine. `;
			}
		} else if (child.shoulders < 0) {
			r += `${His} shoulders and chest are quite `;
			if (child.boobs > 1200) {
				r += `feminine, causing a lot of cleavage and pressing ${his} boobs outward beyond ${his} sides. `;
			} else {
				r += `feminine. `;
			}
		} else if (child.shoulders > 1) {
			r += `${His} shoulders and chest are very `;
			if (child.boobs > 600) {
				r += `broad, making ${his} boobs look a lot smaller than they actually are. `;
			} else {
				r += `broad. `;
			}
		} else if (child.shoulders > 0) {
			r += `${His} shoulders and chest are fairly `;
			if (child.boobs > 600) {
				r += `broad, making ${his} tits look smaller than they actually are. `;
			} else {
				r += `broad. `;
			}
		} else {
			r += `${His} shoulders and chest are `;
			if (child.boobs > 800) {
				r += `feminine, flattering ${his} breasts. `;
			} else {
				r += `feminine. `;
			}
		}

		if (child.shoulders > child.hips) {
			r += `They're wider than ${his} hips, `;
			if (child.boobs > 2000 * (child.shoulders - child.hips)) {
				r += `but ${his} massive breasts make it hard to discern. `;
			} else if (arcology.FSGenderRadicalist !== "unset") {
				r += `giving ${him} a somewhat mannish appearance. `;
			} else if (arcology.FSGenderFundamentalist !== "unset") {
				r += `giving ${him} an <span class="red">ugly, mannish appearance.</span> `;
			} else {
				r += `giving ${him} an <span class="red">unattractive, somewhat mannish, appearance.</span> `;
			}
		}

		return r;
	}

	function skin(child) {
		let
			r = ``;

		if (V.seeNationality) {
			if (child.nationality === 0) {
				r += `Ethnically, ${he}'s `;
			} else if (child.nationality === "slave") {
				r += `${He}'s been chattel long enough that slavery is effectively ${his} nationality; ethnically, ${he}'s `;
			} else if (child.nationality === "Stateless") {
				r += `${He} has spent so much time in the Free Cities that their statelessness is effectively ${his} nationality; ethnically, ${he}'s `;
			} else if (child.nationality === "Zimbabwean" && child.race === "white") {
				r += `${He}'s originally <span class="tan">Rhodesian;</span> ethnically, ${he}'s `;
			} else if (child.nationality === "Vatican") {
				r += `${He}'s originally <span class="tan">from Vatican City;</span> ethnically, ${he}'s `;
			} else {
				r += `${He}'s originally <span class="tan">${child.nationality};</span> ethnically, ${he}'s `;
			}
			r += `<span class="tan">${child.race},</span> and ${his} skin is ${child.skin}${child.markings === "freckles" ? ` and lightly freckled${skinToneLevel(child.skin) > 5 && skinToneLevel(child.skin < 10) && child.hColor === "red" ? `, an attractive combination` : ``}` : child.markings === "heavily freckled" ? `and heavily freckled${skinToneLevel(child.skin > 5) && skinToneLevel(child.skin) < 10 && child.hColor === "red" ? `, an attractive combination` : ``}. ` : `. `}`;

			r += `${child.skin === "sun tanned" || child.skin === "spray tanned" ? `${His} skin has been tanned ${child.skin === "sun tanned" ? `to a natural, healthy-looking tone` : `with obvious, garish-looking makeup`}.` : ``}`;

			if (child.race !== child.origRace) {
				if (V.saleDescription) {
					if (PC.skill.medicine >= 100) {
						r += `Thanks to your medical experience, you can easily tell that ${he} was originally ${child.origRace}, but surgically modified. `;
					} else if (PC.skill.medicine >= 50) {
						r += `Oddly enough, ${he} appears to have a number of ${child.origRace} features. `;
					} else if (PC.skill.slaving >= 50) {
						r += `Thanks to your experience in buying and selling slaves, you can easily tell that ${he} is not naturally ${child.race}. `;
					} else if (jsRandom(0, 100) < PC.skill.medicine) {
						r += `${His} features seem slightly off. `;
					}
				} else {
					r += `${He} has received plastic surgery to appear ${child.race}; ${he} is originally ${child.origRace}. `;
				}
			}
		} else if (V.seeRace) {
			r += `Ethnically, ${he}'s <span class=tan>${child.race},</span> and ${his} skin is ${child.skin}${child.markings === "freckles" ? ` and lightly freckled${skinToneLevel(child.skin) > 5 && skinToneLevel(child.skin < 10) && child.hColor === "red" ? `, an attractive combination` : ``}` : child.markings === "heavily freckled" ? `and heavily freckled${skinToneLevel(child.skin > 5) && skinToneLevel(child.skin) < 10 && child.hColor === "red" ? `, an attractive combination` : ``}. ` : `. `}`;

			r += `${child.skin === "sun tanned" || child.skin === "spray tanned" ? `${His} skin has been tanned ${child.skin === "sun tanned" ? `to a natural, healthy-looking tone` : `with obvious, garish-looking makeup`}. ` : ``}`;

			if (child.race !== child.origRace) {
				if (V.saleDescription) {
					if (PC.skill.medicine >= 100) {
						r += `Thanks to your medical experience, you can easily tell that ${he} was originally ${child.origRace}, but surgically modified. `;
					} else if (PC.skill.medicine >= 50) {
						r += `Oddly enough, ${he} appears to have a number of ${child.origRace} features. `;
					} else if (PC.skill.slaving >= 50) {
						r += `Thanks to your experience in buying and selling slaves, you can easily tell that ${he} is not naturally ${child.race}. `;
					} else if (jsRandom(0, 100) < PC.skill.medicine) {
						r += `${His} features seem slightly off. `;
					}
				} else {
					r += `${He} has received plastic surgery to appear ${child.race}; ${he} is originally ${child.origRace}. `;
				}
			}
		} else {
			r += `${His} skin is ${child.skin}${child.markings === "freckles" ? ` and lightly freckled${skinToneLevel(child.skin) > 5 && skinToneLevel(child.skin < 10) && child.hColor === "red" ? `, an attractive combination` : ``}` : child.markings === "heavily freckled" ? `and heavily freckled${skinToneLevel(child.skin > 5) && skinToneLevel(child.skin) < 10 && child.hColor === "red" ? `, an attractive combination` : ``}. ` : `. `}`;

			r += `${child.skin === "sun tanned" || child.skin === "spray tanned" ? `${His} skin has been tanned ${child.skin === "sun tanned" ? `to a natural, healthy-looking tone` : `with obvious, garish-looking makeup`}.` : ``}`;
		}

		return r;
	}

	function tats() {
		function anus(child) {
			let
				r = ``;

			if (child.anusTat !== 0) {
				switch (child.anusTat) {
					case "bleached":
						r += `${His} anus is bleached. `;
						break;
					case "tribal patterns":
						r += `${His} anus is bleached. It is tattooed with a tribal pattern that changes interestingly when ${he} relaxes or tightens ${his} sphincter. `;
						break;
					case "flowers":
						r += `${He} has a huge blooming flower tattooed right over ${his} anus. `;
						break;
					case "counting":
						if (child.counter.anal === 0) {
							r += `${He} has a dashed line tattooed around ${his} anus as a guideline for where ${his} anal count will be inscribed. `;
						} else if (child.counter.anal < 1000) {
							r += `${He} has fine rings tattooed around ${his} anus, one for each hundred cocks. `;
						} else {
							r += `${He} has thick and fine rings tattooed around ${his} anus, for each thousand and hundred cocks. `;
						}
						break;
					case "advertisements":
						if (child.vagina > -1) {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Second Pussy.' `;
						} else {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Spit First.' `;
						}
						break;
					case "rude words":
						if (child.vagina > -1) {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Fucktoy's Favorite Fuckhole.' `;
						} else {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Sissy Slut's Sodomy Slit.' `;
						}
						break;
					case "degradation":
						r += `${His} anus is bleached. It is tattooed with gothic script in a ring around ${his} hole, reading '${WrittenMaster(child)} Made Me An Anal Slut.' `;
						break;
					case "bovine patterns":
						r += `${His} anus is tattooed to mimic the puffy, dark appearance of a cow's. `;
						break;
					case "sacrilege":
						r += `${He} has a ring of Aramaic text tattooed around ${his} anus, which translates to horrible blasphemy. `;
						break;
					case "sacrament":
						r += `${He} has a ring of Aramaic text tattooed around ${his} anus, which translates to a comforting blessing. `;
						break;
					case "possessive":
						r += `${He} has a ring of numbers around ${his} anus, detailing the date ${he} was enslaved by you. `;
						break;
					case "paternalist":
						r += `${His} anus is bleached. It is tattooed with text in a ring around ${his} hole, reading '${WrittenMaster(child)} Helped Me Love Anal.' `;
						break;
					case "Asian art":
						r += `${His} anus is bleached. `;
						break;
					default:
						r += `${child.anusTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "anus");
			r += App.Desc.brand(child, "asshole");

			return r;
		}

		tats.anus = anus;

		function arms(child) {
			let
				r = ``;

			if (child.armsTat !== 0) {
				switch (child.armsTat) {
					case "tribal patterns":
						r += `${His} tribal tattoos run down ${his} arms. `;
						break;
					case "flowers":
						r += `${His} floral tattoos run down ${his} arms to end in a pretty bloom on the back of each hand. `;
						break;
					case "counting":
						if (child.counter.oral === 0) {
							r += `There are horizontal lines tattooed around ${his} forearms, creating a blank space to permanently tally future sexual exploits. `;
						} else if (child.counter.oral < 500) {
							r += `Tiny dick, pussy, and anus symbols are tattooed on ${his} forearms, one for each organ ${he}'s manually pleasured. `;
						} else {
							r += `Tiny dick, pussy, and anus symbols are tattooed all over both ${his} arms, one for each organ ${he}'s manually pleasured. `;
						}
						break;
					case "advertisements":
						r += `${His} right arm is tattooed with a price list for use if ${he}'s whoring, and ${his} left with a simple tourist guide for use if ${he}'s serving the public. `;
						break;
					case "rude words":
						r += `${His} arms have helpful instructions on how to restrain ${him} for rape, including indications of the best anchor points at ${his} wrists. `;
						break;
					case "degradation":
						if (child.dick > 0) {
							if (child.vagina > -1) {
								if (child.boobs > 600) {
									r += `'Boobs Pussy Cock Asshole' is tattooed on ${his} left arm, and 'Suck Fuck Hurt Rape' is tattooed on ${his} right. `;
								} else {
									r += `'Half Pussy & Half Cock' is tattooed on ${his} left arm, and 'All Whore' is tattooed on ${his} right. `;
								}
							} else if (child.boobs > 600) {
								r += `'I didn't use to have boobs' is tattooed on ${his} left arm, and 'I didn't always take it up the ass' is tattooed on ${his} right. `;
							} else {
								r += `'I promise to cum buckets' is tattooed on ${his} left arm, and 'If you fuck my butt' is tattooed on ${his} right. `;
							}
						} else {
							if (child.boobs > 800 && child.lactation > 0) {
								r += `'Grade AAA Milker' is tattooed on ${his} left arm, and 'Grade AAA Breeder' is tattooed on ${his} right. `;
							} else if (child.visualAge < 15) {
								r += `'Teach me how to suck cock' is tattooed on ${his} left arm, and 'Teach me how to take dick' is tattooed on ${his} right. `;
							} else {
								r += `'There are many sex slaves like me' is tattooed on ${his} left arm, and 'But this one is ${WrittenMaster(child)}'s' is tattooed on ${his} right. `;
							}
						}
						break;
					case "Asian art":
						r += `Tattoos of fierce dragons wind around both ${his} arms. `;
						break;
					case "scenes":
						r += `${His} lewd tattoos cover ${his} arms; they include lots of little vignettes of sex, with dates to show when ${he} was first fucked like that. `;
						break;
					case "bovine pattern":
						r += `Tattoos of cow-like spots cover ${his} arms, but stop short of each of ${his} elbows. `;
						break;
					case "sacrilege":
						r += `Tattoos of swirling flames run down ${his} arms. `;
						break;
					case "sacrament":
						r += `Tattoos of swirling thorns run down ${his} arms, culminating in a stylized depiction of a bloody nail on the back of each hand. `;
						break;
					case "possessive":
						r += `${His} arm tattoos depict notable moments during ${his} enslavement by you, culminating in a stylized rendition of your first initial on ${his} left hand and your second on the right. `;
						break;
					case "paternalist":
						if (child.dick > 0) {
							if (child.vagina > -1) {
								if (child.boobs > 600) {
									r += `'Boobs Pussy Cock Asshole' is tattooed on ${his} left arm, and 'Caress Pleasure Stroke Stretch' is tattooed on ${his} right. `;
								} else {
									r += `'Half Pussy & Half Cock' is tattooed on ${his} left arm, and 'All Loved' is tattooed on ${his} right. `;
								}
							} else if (child.boobs > 600) {
								r += `'I didn't use to have boobs' is tattooed on ${his} left arm, and 'And now I do!' is tattooed on ${his} right. `;
							} else {
								r += `'I promise to cum buckets' is tattooed on ${his} left arm, and 'If you treat me right' is tattooed on ${his} right. `;
							}
						} else {
							if (child.boobs > 800 && child.lactation > 0) {
								r += `'Please drink' is tattooed on ${his} left arm, and 'All my milk' is tattooed on ${his} right. `;
							} else if (child.visualAge < 15) {
								r += `'Please teach me how to suck cock' is tattooed on ${his} left arm, and 'Please teach me how to fuck' is tattooed on ${his} right. `;
							} else {
								r += `'There are many sex slaves like me' is tattooed on ${his} left arm, and 'But ${WrittenMaster(child)} loves me' is tattooed on ${his} right. `;
							}
						}
						break;
					default:
						r += `${child.armsTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "upper arm");
			r += App.Desc.brand(child, "lower arm");
			r += App.Desc.brand(child, "hand");
			r += App.Desc.brand(child, "wrist");

			return r;
		}

		tats.arms = arms;

		function back(child) {
			let
				r = ``;

			if (child.backTat !== 0) {
				switch (child.backTat) {
					case "tribal pattern":
						r += `${He} has a totem of ${his} spirit animal tattooed across ${his} back. `;
						break;
					case "flowers":
						r += `${His} back is covered in hundreds of beautiful flower tattoos; one could spend half an hour examining them all. `;
						break;
					case "counting":
						r += `${His} back is tattooed with tick marks to count the days of ${his} sexual `;
						if (child.weekAcquired === 0) {
							r += `enslavement to you. There are a lot of them. `;
						} else {
							if (((V.week - child.weekAcquired) * 7) + jsRandom(-3, 3)) {
								r += `slavery here. There are only a few. `;
							} else {
								r += `slavery here: ${weeksOwned} of them. `;
							}
						}
						break;
					case "advertisements":
						r += `${He} has an ad for the arcology itself tattooed across ${his} back. `;
						break;
					case "rude words":
						r += `'Sex Slave' is tattooed across ${his} back; the tattoo uses the broad space to make each letter ${V.showInches === 2 ? `six inches` : `fifteen centimeters`} tall, so that ${his} identity can be read from hundreds of ${V.showInches === 2 ? `yards` : `meters`} off. `;
						break;
					case "degradation":
						r += `${He} has `;
						if (child.dick > 0) {
							if (child.vagina > -1) {
								if (child.boobs > 600) {
									r += `'Futa Slave'`;
								} else {
									r += `'Hermaphrodite'`;
								}
							} else if (child.boobs > 600) {
								r += `'Shemale Slave'`;
							} else {
								r += `'Dickgirl Slave'`;
							}
						} else {
							if (child.boobs > 800 && child.lactation > 0) {
								r += `'Slave Cow'`;
							} else if (child.visualAge < 15) {
								r += `'Slave Girl'`;
							} else {
								r += `'Sex Slave'`;
							}
						}
						r += `tattooed across ${his} back in gothic script. `;
						break;
					case "Asian art":
						r += `An Asian dragon is tattooed in a circle across ${his} back; the dragon has subtle features that, according to traditional meanings, relate it to ${his} personality. `;
						break;
					case "scenes":
						if (child.vagina === -1) {
							r += `A line-art rendition of ${child.slaveName} ${himself} cumming copiously while riding a dick is tattooed across ${his} entire back. `;
						} else if (child.lactation > 0) {
							r += `A line-art rendition of ${child.slaveName} ${himself} nursing a pair of ${his} fellow slaves is tattooed across ${his} entire back. `;
						} else if (child.skill.vaginal >= 100) {
							r += `A line-art rendition of ${child.slaveName} ${himself} performing reverse cowgirl and spreading ${his} pussy is tattooed across ${his} entire back. `;
						} else if (PC.vagina !== -1) {
							r += `A line-art rendition of ${child.slaveName} ${himself} eating pussy is tattooed across ${his} entire back. `;
						} else {
							r += `A line-art rendition of ${child.slaveName} ${himself} deepthroating a cock is tattooed across ${his} entire back. `;
						}
						break;
					case "bovine patterns":
						r += `${His} back is tattooed to resemble the dappled flank of a cow. `;
						break;
					case "sacrilege":
						r += `${He} has a pair of blackened wings tattooed across ${his} entire back. `;
						break;
					case "sacrament":
						r += `${He} has a pair of pure white wings tattooed across ${his} entire back. `;
						break;
					case "possessive":
						r += `An abridged and stylized version of ${his} slave contract is tattooed across ${his} entire back. `;
						break;
					case "paternalist":
						r += `${He} has your name and the location of your penthouse tattooed on ${his} upper back, so kind citizens can return ${him} to you if ${he} wanders off. `;
						break;
					default:
						r += `${child.backTat}`;
				}
			}

			r += App.Desc.brand(child, "back");

			return r;
		}

		tats.back = back;

		function boobs(child) {
			let
				r = ``;

			if (child.boobsTat !== 0) {
				switch (child.boobsTat) {
					case "tribal patterns":
						r += `${His} chest and breasts are tattooed with tribal patterns that focus attention on ${his} nipples. `;
						break;
					case "flowers":
						r += `${His} chest is tattooed with a pattern of flowering vines that delicately outlines ${his} breasts. `;
						break;
					case "counting":
						if (child.counter.mammary === 0) {
							r += `There is a horizontal line tattooed across ${his} middle chest for symbols counting ${his} mammary encounters to be inscribed under, once ${he} has some. `;
						} else if (child.counter.mammary < 500) {
							r += `Tiny dick, lips, breast, and even pussy symbols are tattooed all over ${his} cleavage, one for each of ${his} mammary encounters. `;
						} else {
							r += `Tiny dick, lips, breast, and even pussy symbols cover ${his} breasts, cleavage, and sides, one for each of ${his} mammary encounters. `;
						}
						break;
					case "advertisements":
						r += `'Fuck Me!' is tattooed across ${his} chest in such large letters that the word is visible a long way off. `;
						break;
					case "rude words":
						r += `'Fuckslave' is tattooed across ${his} chest in such large letters that the word is visible a long way off. `;
						break;
					case "degradation":
						r += `'${WrittenMaster(child)}'s' is tattooed across the top of ${his} right breast; 'Bitch' is tattooed across the top of ${his} left. `;
						break;
					case "Asian art":
						r += `An octopus is tattooed on ${his} upper chest; its tentacles reach down to envelop ${his} breasts, their tips reaching for but not quite reaching each nipple. `;
						break;
					case "scenes":
						r += `${His} chest is tattooed with lewd scenes; each of ${his} breasts shows a phallus receiving a titfuck while each of ${his} collarbones shows a ${woman} deepthroating a large phallus. `;
						break;
					case "bovine patterns":
						r += `${His} chest is tattooed to look like a Holstein cow's, with ${his} udders left bare to draw attention to them. `;
						break;
					case "sacrilege":
						r += `Each of ${his} breasts is tattooed with a depiction of a pentagram, with ${his} nipples forming the center. `;
						break;
					case "sacrament":
						r += `Each of ${his} breasts is tattooed with a depiction of a crucifix, with ${his} nipples forming the center. `;
						break;
					case "possessive":
						r += `Your personal symbol is tattooed above ${his} left breast, '${PlayerName()}' above ${his} right, leaving the rest of ${his} chest and breasts bare. `;
						break;
					case "paternalist":
						r += `'${WrittenMaster(child)}'s' is tattooed across the top of ${his} right breast; 'Darling' is tattooed across the top of ${his} left. `;
						break;
					default:
						r += `${child.boobsTat}`;
						break;
				}
			}

			return r;
		}

		tats.boobs = boobs;

		function butt(child) {
			let
				r = ``;

			if (child.buttTat !== 0) {
				switch (child.buttTat) {
					case "tribal patterns":
						r += `${His} buttocks and hips are tattooed with tribal patterns that emphasize ${his} womanly curves. `;
						break;
					case "flowers":
						r += `${His} hips are tattooed with a cute floral design. `;
						break;
					case "counting":
						if (child.counter.anal === 0) {
							r += `There is a horizontal line tattooed across the tops of ${his} buttocks for symbols counting ${his} anal exploits to be inscribed under, once ${he} has some. `;
						} else if (child.counter.anal < 500) {
							r += `Tiny dick symbols are tattooed all over the top of ${his} buttocks, one for every time ${he}'s been assfucked. `;
						} else {
							r += `Tiny dick symbols are tattooed all over ${his} entire buttocks, attesting to long anal slavery. `;
						}
						break;
					case "advertisements":
						r += `'Shove' is tattooed across ${his} left buttock; 'It In' is tattooed across ${his} right. `;
						break;
					case "rude words":
						r += `${child.vagina > 0 ? `'No. 2'` : `'No. 1'`} is tattooed across ${his} left buttock; 'Fuckhole' is tattooed across ${his} right. `;
						break;
					case "degradation":
						r += `'Treat it' is tattooed across ${his} left buttock; 'Like a Pussy' is tattooed across ${his} right. `;
						break;
					case "Asian art":
						r += `Each of ${his} buttocks bears a tattoo of a coiled dragon, advancing meaningfully towards ${his} anus. `;
						break;
					case "scenes":
						if (child.dick > 0 && child.balls > 0) {
							r += `${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a smiling shemale offering ${his} anus, while each of ${his} thighs shows a rear view of a shemale simultaneously being sodomized and sodomizing. `;
						} else if (child.dick > 0) {
							r += `${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a gelding, legs together to conceal ${his} cock and display ${his} anus, while each of ${his} thighs shows a gelding being double penetrated in ${his} gaping anus. `;
						} else {
							r += `${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a ${woman} being sodomized while each of ${his} thighs shows a ${woman} being gangbanged in all ${his} holes. `;
						}
						break;
					case "bovine patterns":
						r += `${His} buttocks are tattooed with large black splotches like those of a Holstein cow. `;
						break;
					case "sacrilege":
						r += `'It's not a sin' is tattooed across ${his} left buttock; ${child.vagina > -1 ? `'If I don't enjoy it'` : `'I'm a girl'`} is tattooed across ${his} right. `;
						break;
					case "sacrament":
						r += `'This is my penance' is tattooed across ${his} left buttock; ${child.vagina > -1 ? `'Make me suffer.'` : `'As a slave.'`} is tattooed across ${his} right. `;
						break;
					case "possessive":
						r += `'${PC.slaveName} made me their' is tattooed across ${his} left buttock; with '${desc}' tattooed across ${his} right. `;
						break;
					case "paternalist":
						r += `'Treat it' is tattooed across ${his} left buttock; 'Gently' is tattooed across ${his} right. `;
						break;
					default:
						r += `${child.buttTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "buttock");

			return r;
		}

		tats.butt = butt;

		function dick(child) {
			let
				r = ``;

			if (!child.fuckdoll) {
				if (child.dick !== 0 && child.dickTat !== 0) {
					switch (child.dickTat) {
						case "tribal patterns":
							r += `${His} cock is tattooed with tribal patterns. `;
							break;
						case "flowers":
							r += `${His} cock is tattooed with a vine that wraps around its shaft. `;
							break;
						case "counting":
							if (child.counter.penetrative === 0) {
								r += `There is a horizontal line tattooed around the base of ${his} dick for symbols counting ${his} penetrative exploits to be inscribed under, once ${he} has some. `;
							} else if (child.counter.penetrative < 500) {
								r += `Tiny anus, pussy and mouth symbols are tattooed all over ${his} dick, recounting ${his} penetrative exploits. `;
							} else {
								r += `Tiny anus, pussy and mouth symbols are tattooed all over ${his} dick, recounting ${his} penetrative exploits. ${He} has so many that they radiate out across ${his} crotch, too. `;
							}
							break;
						case "advertisements":
							r += `${His} cock reads 'Sissy Slut.' `;
							break;
						case "rude words":
							r += `${His} cock reads 'Bitchstick.' `;
							break;
						case "degradation":
							if (child.anus === 0) {
								r += `${His} cock reads '100% Virgin Anus.' `;
							} else {
								r += `${His} cock reads 'Comes When Assraped.' `;
							}
							break;
						case "Asian art":
							r += `${His} cock has an Asian dragon rushing down each side to the tip. `;
							break;
						case "bovine patterns":
							r += `${His} cock is tattooed to make it look a little like a bulls'. `;
							break;
						case "sacrilege":
							r += `${His} cock is covered in tiny words, each derived from a sacrilegious text. `;
							break;
						case "sacrament":
							r += `${His} cock is covered in tiny words, each derived from a sacred scripture. `;
							break;
						case "possessive":
							r += `${His} cock has an identification barcode tattooed on its side. `;
							break;
						case "paternalist":
							if (child.anus === 0) {
								r += `${His} cock reads 'Still an Ass Virgin.' `;
							} else {
								r += `${His} cock reads 'Comes When Stroked.' `;
							}
							break;
						default:
							r += `${child.dickTat}`;
					}
				}
			}

			return r;
		}

		tats.dick = dick;

		function lips(child) {
			let
				r = ``;

			if (child.lipsTat !== 0) {
				switch (child.lipsTat) {
					case "tribal patterns":
						r += `${His} face is tattooed with tribal patterns that make ${him} seem mysterious and exotic. `;
						break;
					case "flowers":
						r += `${His} minimal facial tattoos are limited to a cute flower on each cheek. `;
						break;
					case "counting":
						if (child.counter.oral === 0) {
							r += `There is a horizontal line tattooed across the ${his} cheeks for symbols counting ${his} oral totals to be inscribed under, once ${he} has some. `;
						} else if (child.counter.oral < 500) {
							r += `Tiny dick, pussy, and anus symbols are tattooed all over ${his} cheeks, one for every thing ${he}'s sucked. `;
						} else {
							r += `Tiny dick, pussy, and anus symbols are tattooed all over ${his} face, forehead, and neck, one for every thing ${he}'s sucked. `;
						}
						break;
					case "advertisements":
						r += `${His} facial tattoos include 'Facefuck Me' across ${his} forehead, 'Cock' to the left of ${his} mouth, and 'Sucker' to the right of it. `;
						break;
					case "rude words":
						r += `${His} facial tattoos include 'Sex Slave' across ${his} forehead, 'Face' to the left of ${his} mouth, and 'Pussy' to the right of it. `;
						break;
					case "degradation":
						r += `'${desc}' is tattooed across ${his} forehead. `;
						break;
					case "Asian art":
						r += `${He} has a blossoming cherry tree tattooed on one temple; its pink petals are dappled across ${his} cheeks. `;
						break;
					case "bovine patterns":
						r += `${His} face is subtly tattooed to give ${him} a somewhat bovine appearance. `;
						break;
					case "permanent makeup":
						if (child.makeup !== 0) {
							r += `${His} normal makeup is difficult to distinguish from the underlying tattoo. `;
						}
						break;
					case "sacrilege":
						r += `${His} face is subtly tattooed to give ${him} a decidedly demonic appearance. `;
						break;
					case "sacrament":
						r += `${His} face is subtly tattooed to give ${him} a decidedly angelic appearance. `;
						break;
					case "possessive":
						r += `'Property of ${PlayerName()}' is tattooed across ${his} forehead. `;
						break;
					case "paternalist":
						r += `'Beloved ${desc}' is tattooed across one of ${his} cheeks. `;
						break;
					default:
						r += `${child.lipsTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "lips");

			return r;
		}

		tats.lips = lips;

		function shoulders(child) {
			let
				r = ``;

			if (child.shouldersTat !== 0) {
				switch (child.shouldersTat) {
					case "tribal patterns":
						r += `Tribal tattoos encircle both ${his} shoulders in swirling patterns. `;
						break;
					case "flowers":
						r += `A gorgeous flower tattoo covers each shoulder. `;
						break;
					case "counting":
						r += `A '¤' tattoo counting ${his} earnings and acquirements cover ${his} shoulders. `;
						break;
					case "advertisements":
						if (child.vagina < 0) {
							r += `'Two Hole Whore' is tattooed on each of ${his} shoulders. `;
						} else {
							r += `'Three Hole Whore' is tattooed on each of ${his} shoulders. `;
						}
						break;
					case "rude words":
						r += `'Dickholster' is tattooed on ${his} left shoulder, and 'Fuckmeat' is tattooed on ${his} right. `;
						break;
					case "degradation":
						r += `'Hurt Me' is tattooed on ${his} left shoulder, and 'Rape Me' on ${his} right. `;
						break;
					case "Asian art":
						r += `Beautiful, colorful tattoos cover ${his} upper body: a line of wind-whipped waves lashing against mountains runs across ${his} collarbone and around both shoulders. `;
						break;
					case "scenes":
						if (child.vagina < 0) {
							r += `A stylized rendition of a dick plunging into an open mouth is tattooed on ${his} left shoulder, and a similar image of a dick entering an anus on ${his} right. `;
						} else {
							r += `A stylized rendition of a dick going into a pussy is tattooed on ${his} left shoulder, and a similar image of a dick entering an anus on ${his} right. `;
						}
						break;
					case "bovine patterns":
						r += `${His} shoulders are flecked with tattoos of bovine blotches. `;
						break;
					case "sacrilege":
						r += `Tattoos depicting demonic nude figures adorn ${his} shoulders. `;
						break;
					case "sacrament":
						r += `Tattoos depicting saintly nude figures adorn ${his} shoulders. `;
						break;
					case "possessive":
						r += `A rendition of your face inside a heart is tattooed onto ${his} left shoulder, and the words 'I love my ${WrittenMaster(child)}' inside an identical heart are tattooed on ${his} right. `;
						break;
					case "paternalist":
						r += `'Love Me' is tattooed on ${his} left shoulder, and 'Teach Me' on ${his} right. `;
						break;
				}
			}

			r += App.Desc.brand(child, "shoulder");

			return r;
		}

		tats.shoulders = shoulders;

		function stamp(child) {
			let
				r = ``;

			if (child.stampTat !== 0) {
				switch (child.stampTat) {
					case "tribal patterns":
						r += `${He} has a tribal-patterned tramp stamp. `;
						break;
					case "flowers":
						r += `${He} has a floral-patterned tramp stamp. `;
						break;
					case "counting":
						if (child.anus === 0) {
							r += `${He} has the dashed outline of a cock tattooed across ${his} lower back. `;
						} else {
							r += `${He} has the silhouette of the largest cock ${he}'s ever had up ${his} anus tattooed across ${his} lower back. `;
						}
						break;
					case "advertisements":
						r += `${He} has a tramp stamp which reads 'Fuck my ass!' `;
						break;
					case "rude words":
						r += `${He} has a tramp stamp which reads 'Rear Entrance,' with an arrow pointing downward. `;
						break;
					case "degradation":
						r += `${He} has a tramp stamp formed from gothic lettering that reads 'Anal Whore.' `;
						break;
					case "Asian art":
						r += `A traditional Asian household scene is tattooed on ${his} lower back, showing a rendition of ${child.slaveName}, dressed in rich silks, having sex with a ${PC.title ? `gentleman` : `lady`}. The slave and the ${PC.title ? `gentleman` : `lady`} are kissing passionately as ${PC.title ? `he` : `she`} `;
						if (child.vagina < 0) {
							r += `penetrates the child's anus. `;
						} else if (child.bellyPreg >= 1500 || child.bellyImplant >= 1500) {
							r += `embraces the child's ${child.pregKnown ? `pregnant` : `rounded`} belly. `;
						} else {
							r += `penetrates the child's vagina. `;
						}
						break;
					case "scenes":
						r += `${He} has a tramp stamp which shows a cock entering an anus, recognizably ${hers}. `;
						break;
					case "bovine patterns":
						r += `${He} has an identifying barcode tattooed across ${his} lower back. `;
						break;
					case "sacrilege":
						r += `${He} has a tramp stamp which reads 'Fuck my ass and be damned.' `;
						break;
					case "sacrament":
						r += `${He} has a tramp stamp which reads 'Fuck my ass and be blessed.' `;
						break;
					case "possessive":
						r += `${He} has a tramp stamp which reads '${PC.slaveName}'s $desc.' `;
						break;
					case "paternalist":
						r += `${He} has a tramp stamp which reads 'Fuck me slowly' with an arrow pointing downward. `;
						break;
					default:
						r += `${child.stampTat}`;
						break;
				}

				r += App.Desc.brand(child, "lower back");
			}

			return r;
		}

		tats.stamp = stamp;

		function vagina(child) {
			let
				r = ``;

			if (child.vaginaTat !== 0) {
				switch (child.vaginaTat) {
					case "tribal patterns":
						r += `${His} abdomen is tattooed with tribal patterns that draw the eye down toward ${his} ${child.dick ? `cock` : child.vagina === -1 ? `featureless crotch` : `vagina`}. `;
						break;
					case "flowers":
						r += `${His} abdomen bears a tasteful tattoo of a ${child.dick ? `lily with a large stamen` : `blooming flower`}. `;
						break;
					case "counting":
						if (child.counter.vaginal === 0) {
							r += `${His} abdomen reads 'count begins other side, sorry.' `;
						} else if (child.counter.vaginal < 500) {
							r += `Tiny dick symbols are tattooed all over ${his} abdomen, one for every time ${he}'s been fucked. `;
						} else {
							r += `Tiny dick symbols are tattooed all over ${his} abdomen, one for every time ${he}'s been fucked. There are so many that they spread up to ${his} breasts and around ${his} sides. `;
						}
						break;
					case "advertisements":
						r += `${His} abdomen reads ${child.vagina < 0 ? `'Rear Entrance Other Side.'` : `'Insert Cock' with an arrow pointing downward.`} `;
						break;
					case "rude words":
						r += `${His} abdomen reads ${child.vagina < 0 ? `'Useless, Rape Ass Instead' with an arrow pointing downward` : `'Fucktoy'`}. `;
						break;
					case "degradation":
						r += `${His} abdomen is tattooed with ${child.dick ? `a downward-pointing arrow which reads 'Bounces When Buttfucked.'` : `gothic script that reads '${PC.dick ? PC.vagina ? `Futa` : `Cock` : `Cunt`} Pleaser.'`} `;
						break;
					case "Asian art":
						r += `${He} has formal Asian characters tattooed across ${his} abdomen. To those who do not know the language, they look elegant, but roughly translated, they read `;
						if (child.dick > 0 && canAchieveErection(child)) {
							r += `'dick girl slut.' `;
						} else if (child.dick > 0) {
							r += `'limp dick slut.' `;
						} else if (child.pregKnown && child.bellyPreg >= 100) {
							r += `'pregnant cow.' `;
						} else if (child.physicalAge < 13) {
							r += `'horny little bitch.' `;
						} else {
							r += `'sex slave.' `;
						}
						break;
					case "scenes":
						r += `${His} abdomen is tattooed with lewd scenes. It entices with a depiction of ${child.dick ? child.balls ? `sodomy of a shemale` : `sodomy of a gelding` : child.vagina === -1 ? `sodomy of a null` : `loving intercourse`}. `;
						break;
					case "bovine patterns":
						r += `${His} abdomen is tattooed in a Holstein cow pattern. `;
						break;
					case "sacrilege":
						r += `${His} abdomen is tattooed with a variety of heretical symbols. `;
						break;
					case "sacrament":
						r += `${His} abdomen is tattooed with a variety of religious symbols. `;
						break;
					case "possessive":
						r += `${His} abdomen is tattooed with `;
						if (child.dick > 0 && canAchieveErection(child)) {
							r += `'Dick girl slave `;
						} else if (child.dick > 0) {
							r += `'Limp dick slave `;
						} else if (child.counter.births > 5) {
							r += `'Breeder slave `;
						} else if (child.actualAge < 13) {
							r += `'loli slave `;	// TODO: not sure about this
						} else {
							r += `'Sex slave `;
						}
						r += `of ${WrittenMaster(child)} ${PC.slaveName}.' `;
						break;
					case "paternalist":
						r += `${His} abdomen is tattooed with a downward-pointing arrow which reads 'Let's come together.' `;
						break;
					default:
						r += `${child.vaginaTat}`;
						break;
				}
			}

			return r;
		}

		tats.vagina = vagina;
	}

	function upperFace(child) {
		let r = ``;

		if (!child.fuckdoll) {
			if (hasAnyProstheticEyes(child)) {
				r += `${He} has ${App.Desc.eyesType(slave)}. `;
			}

			if (child.eyewear === "corrective glasses" || child.eyewear === "blurring glasses" || child.eyewear === "glasses") {
				r += `${He}'s wearing a pair of `;
				switch (child.clothes) {
					case "a ball gown":
					case "a slave gown":
						r += `nice frameless glasses,`;
						break;
					case "a schoolgirl outfit":
						r += `horn-rimmed glasses to improve ${his} schoolgirl look,`;
						break;
					default:
						r += `simple wire-frame glasses,`;
						break;
				}

				if (getWorstVision(child) >= 2) {
					if (child.eyewear === "blurring glasses") {
						r += ` which are designed to blur ${his} vision, making ${him} clumsy. `;
					} else {
						r += ` which are just for show. `;
					}
				} else if (getWorstVision(child) >= 1) {
					if (child.eyewear === "corrective glasses") {
						r += ` which correct ${his} vision. `;
					} else {
						r += ` which do nothing to help ${his} <span class="yellow">nearsightedness</span> and consequent clumsiness. `;
					}
				} else {
					r += ` which, since ${he} is <span class="red">blind,</span> are just for show. ${He} moves carefully as to not bump into things. `;
				}
			} else {
				if (getWorstVision(child) >= 2) {
					if (child.eyewear === "blurring contacts") {
						r += `${He}'s wearing contact lenses designed to blur ${his} vision, making ${him} clumsy. `;
					}
				} else if (getWorstVision(child) >= 2) {
					if (child.eyewear === "corrective contacts") {
						r += `${He}'s wearing contact lenses to correct ${his} <span class="yellow">nearsightedness.</span> `;
					} else {
						r += `${He}'s <span class="yellow">nearsighted,</span> and a bit clumsy as a result. `;
					}
				} else {
					r += `${He} is <span class="red">blind,</span> and moves very carefully as a result. `;
				}
			}

			if (child.earwear === "hearing aids" || child.earwear === "muffling ear plugs" || child.earwear === "deafening ear plugs") {
				r += `In ${his} ears, ${he} wears `;
				if (child.earwear === "hearing aids") {
					r += `a pair of hearing aids, `;
					if (child.hears > -1) {
						r += `which do little to correct ${his} already adequate hearing. `;
					} else if (child.hears === -1) {
						r += `which are used to correct ${his} <span class="yellow">hearing impairment.</span> `;
					} else {
						r += `which, due to ${his} <span class="red">deafness,</span> are useless. `;
					}
				} else if (child.earwear === "muffling ear plugs") {
					r += `a pair of small foam ear plugs, `;
					if (child.hears > -1) {
						r += `which noticeably <span class="yellow">muffle ${his} hearing.</span> `;
					} else if (child.hears === -1) {
						r += `which are pointless, as ${he} is already <span class="yellow">hard of hearing.</span> `;
					} else {
						r += `which are pointless, as ${he} is totally <span class="red">deaf.</span> `;
					}
				} else if (child.earwear === "deafening ear plugs") {
					r += `a pair of large silicone ear plugs, `;
					if (child.hears > -1) {
						r += `which <span class="red">nullify ${his} sense of hearing.</span> `;
					} else if (child.hears === -1) {
						r += `which impair ${his} hearing to the point of <span class="red">deafness.</span> `;
					} else {
						r += `which are pointless, as ${he} is already <span class="red">deaf.</span> `;
					}
				}
			} else {
				if (child.hears === -1) {
					r += `${He}'s <span class="yellow">hard of hearing,</span> and a bit nervous as a result. `;
				} else if (child.hears < -1) {
					r += `${He} is <span class="red">deaf,</span> and overly paranoid as a result. `;
				}
			}
		} else {
			r += `${His} face is featurelessly obscured by the Fuckdoll suit from the top of ${his} head down to ${his} face hole. `;
		}

		return r;
	}

	function vagina(child) {
		let
			r = ``,
			pubertyAge = Math.min(child.pubertyAgeXX, child.pubertyAgeXY);

		if (child.dick > 0) {
			if (child.vagina > -1) {
				r += `${His} `;
				if (child.genes === "XX") {
					r += `beautifully natural `;
				} else if (child.ovaries === 1) {
					r += `finely crafted `;
				} else {
					r += `artificial `;
				}
				r += `vagina is located beneath the base of ${his} penis, `;
				if (child.scrotum > 3 && child.balls <= child.scrotum) {
					r += `though it is almost completely hidden by ${his} hanging ballsack. `;
				} else if (child.scrotum > 1 && child.balls > 0) {
					r += `its upper part concealed by ${his} balls. `;
				} else if (canAchieveErection(child)) {
					r += `and merges seamlessly into ${his} shaft. `;
				} else {
					if (child.dick > 3) {
						r += `though it is almost completely hidden by ${his} soft cockmeat. `;
					} else {
						r += `which acts as a soft little dickclit for it. `;
					}
				}

				if (child.clit === 0) {
					r += `The base of ${his} cock is located where the clitoris would be on a normal woman. `;
				}
			}
		}

		if (child.vagina > -1) {
			switch (child.vagina) {
				case 10:
					r += `${His} pussy has been completely ruined from hundreds of births. One could fit their arm into it with minimal effort and ${he} can barely get off from vaginal sex now. ${His} pussy is abyssal, `;
					break;
				case 3:
					r += `${His} pussy is loose, `;
					break;
				case 2:
					r += `${His} pussy is reasonably tight, `;
					break;
				case 1:
					r += `${His} pussy is tight and appealing, `;
					break;
				case 0:
					r += `${He} is a <span class="lime">virgin.</span> ${His} pussy is fresh, `;
					break;
				default:
					r += `${His} pussy is utterly cavernous, `;
					break;
			}

			if (child.labia === 0) {
				r += ``;
			} else if (child.labia === 1) {
				r += ``;
			} else if (child.labia === 2) {
				r += ``;
			} else {
				r += ``;
			}

			if (V.seeRace) {
				switch (child.race) {
					case "white":
						r += `pink pussylips. `;
						break;
					case "asian":
						r += `dark ${child.race} pussylips. `;
						break;
					case "middle eastern":
						r += `dark ${child.race} pussylips. `;
						break;
					case "latina":
						r += `dark ${child.race} pussylips. `;
						break;
					case "black":
						r += `dark ${child.race} pussylips. `;
						break;
					default:
						r += `${child.skin} pussylips. `;
						break;
				}
			} else {
				r += `${child.skin} pussylips. `;
			}

			if (child.vagina > -1) {
				if (child.vaginaLube === 0) {
					if (child.vagina > 0 && !child.chastityVagina) {
						r += `${He} produces very little natural wetness, so ${he} is required to keep ${himself} artificially lubricated for anyone who wishes to use ${his} cunt. `;
					} else {
						r += `${He} produces very little natural wetness. `;
					}

					if (child.prostate !== 0) {
						if (child.dick === 0) {
							r += `In stark contrast, however, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, so despite ${his} dryness, ${he} squirts ${child.balls ? `semen` : `fluid`} when ${he} orgasms. `;
							if (child.prostate > 2) {
								r += `With the implant embedded in it, that squirt is more like a blast; ${he} will soak ${himself} and anyone near ${him}. `;
							}
						}
					}
				} else if (child.vaginaLube < 2) {
					if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiacs") {
						r += `The aphrodisiacs have them${child.aphrodisiacs > 1 || child.inflationType === "aphrodisiac" && child.inflation >= 2 ? ` sopping` : ``} wet. `;
					} else if (child.energy > 95) {
						r += `As a nympho, ${he}'s almost constantly wet. `;
					} else if (child.fetishStrength > 60 && child.fetishKnown) {
						r += `Judging by how wet ${he} is, ${he}'s probably fantasizing about`;

						switch (child.fetish) {
							case "buttslut":
								r += `being buttfucked. `;
								break;
							case "cumslut":
								r += `being facefucked. `;
								break;
							case "humiliation":
								r += `being humiliated. `;
								break;
							case "submissive":
								r += `submission. `;
								break;
							case "dom":
								r += `dominating someone. `;
								break;
							case "sadist":
								r += `hurting someone. `;
								break;
							case "masochist":
								r += `pain. `;
								break;
							case "pregnancy":
								r += `getting pregnant. `;
								break;
							case "boobs":
								r += `boobs. `;
								break;
							default:
								r += `getting fucked. `;
								break;
						}
					} else if (child.devotion > 50) {
						r += `As a devoted sex slave, ${he} has no trouble keeping ${himself} wet for ${his} ${WrittenMaster(child)}. `;
					} else if (child.devotion > 20) {
						r += `As an obedient sex slave, ${he} does ${his} best to keep ${himself} wet for ${his} ${WrittenMaster(child)}. `;
					}

					if (child.prostate !== 0) {
						if (child.dick === 0) {
							r += `Bizarrely, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, ${child.balls ? `which in combination with ${his} testicles make ${his} squirt copious amounts of fluids and semen with each orgasm` : `so ${he} squirts copiously when ${he} orgasms`}. `;
							if (child.prostate > 2) {
								r += `With the implant embedded in it; that gush is more like a flood. Changes of clothes are a must with ${him}, as ${he} can and will soak both you, ${himself} and what ${he} is getting fucked over. `;
							}
						}
					}
				} else {
					if (child.aphrodisiacs > 0 || (V.saleDescription && V.gingering === "vasodilator") || child.inflationType === "aphrodisiac") {
						r += `The combination of the aphrodisiacs and ${his} natural tendency to produce a lot of female lubricant is having a drastic effect. ${His} cunt is absolutely beribboned with femcum, and ${he} smells strongly of wet, clean pussy. `;
					} else if (child.energy > 95) {
						r += `${He} has a naturally wet cunt, and in combination with ${his} nymphomania, it's soaking. ${He} smells of good clean female arousal. `;
					} else if (child.fetishStrength > 60 && child.fetishKnown) {
						r += `${His} naturally wet cunt is almost dripping female lubricant, and ${he} smells of good clean female arousal. ${He}'s probably fantasizing about `;

						switch (child.fetish) {
							case "buttslut":
								r += `being buttfucked. `;
								break;
							case "cumslut":
								r += `being facefucked. `;
								break;
							case "humiliation":
								r += `being humiliated. `;
								break;
							case "submissive":
								r += `submission. `;
								break;
							case "dom":
								r += `dominating someone. `;
								break;
							case "sadist":
								r += `hurting someone. `;
								break;
							case "masochist":
								r += `pain. `;
								break;
							case "pregnancy":
								if (child.pregKnown) {
									r += `growing rounder. `;
								} else {
									r += `getting pregnant. `;
								}
								break;
							case "boobs":
								r += `boobs. `;
								break;
							default:
								r += `getting fucked. `;
								break;
						}
					} else if (child.devotion > 50) {
						r += `${His} cunt is almost always soaking wet, but being near you has ${his} almost dripping. `;
					} else if (child.devotion > 20) {
						r += `${His} cunt is almost always soaking wet, and being near you isn't affecting that. `;
					} else {
						r += `${His} cunt is almost always soaking wet, regardless of ${his} feelings. `;
					}

					if (child.prostate !== 0) {
						if (child.dick === 0) {
							r += `Bizarrely, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, ${child.balls ? `which in combination with ${his} testicles make ${his} squirt unreasonable volume of fluids and semen with each orgasm` : `meaning that when ${he} orgasms, ${he} squirts an unreasonable volume of fluid`}. `;
							if (child.prostate > 2) {
								r += `With the implant embedded in it; that gush is insane. Everything around ${him} is at risk of being splashed. Changes of clothes are a must with ${him}, as are supplies to mop up afterwards. `;
							}
						}
					}
				}
			}

			r += accessories.vaginal(child);

			if (child.ovaImplant !== 0) {
				switch (child.ovaImplant) {
					case "fertility":
						r += `${His} ovaries have a pair of implants attached to them to encourage ovulation${child.preg < -1 ? `, not that it does ${him} any good` : ``}. `;
						break;
					case "sympathy":
						r += `${His} ovaries have a pair of linked implants attached to them so that when one releases an egg the other does so as well. `;
						break;
					case "asexual":
						r += `One of ${his} ovaries has been replaced with a fabricated sperm sack designed to fertilize any eggs ${he} makes. `;
						break;
				}
			}

			if (!child.dick && !child.balls && child.vagina < 0 && arcology.FSRestart > 60) {
				r += `Society looks fondly on ${his} complete inability to reproduce. `;
			}

			switch (child.pubicHStyle) {
				case "hairless":
					r += `${He}'s naturally smooth and hairless. `;
					break;
				case "bald":
					r += `${He} is no longer able to grow pubic hair leaving ${him} hairless and smooth. `;
					break;
				case "waxed":
					r += `${He}'s waxed and smooth. `;
					break;
				case "in a strip":
					r += `${His} ${child.pubicHColor} pubic hair is waxed into a narrow strip above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
					break;
				case "neat":
					r += `${His} ${child.pubicHColor} pubic hair is waxed into a neat patch above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
					break;
				case "bushy in the front and neat in the rear":
					r += `${His} ${child.pubicHColor} pubic hair forms a natural bush above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
					break;
				case "bushy":
					r += `${His} ${child.pubicHColor} pubic hair forms a natural bush above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
					break;
				case "very bushy":
					r += `${His} ${child.pubicHColor} pubic hair forms a dense bush above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`} that trails up to ${his} navel. `;
					break;
				default:
					if (child.physicalAge < pubertyAge - 2) {
						r += `${He} is too sexually immature to have pubic hair. `;
					} else if (child.physicalAge < pubertyAge - 1) {
						r += `${He} has a few wisps of pubic hair. `;
					} else if (child.physicalAge < pubertyAge) {
						r += `${He} is on the verge of puberty and has a small patch of ${child.pubicHColor} pubic hair above ${his} ${child.dick > 0 ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
					}
			}

			r += App.Desc.brand(child, "pubic mound");

			if (!child.dick) {
				if (child.clit > 0) {
					if (child.foreskin === 0) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `${His} lack of hood makes it even more prominent. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `Lack of hood combined with its size means ${he} can't wear any clothes without being constantly stimulated. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis, it stands at attention but due to lack of erectile tissues it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is semi-erect since lack of erectile tissues means it can never become fully erect. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
						}
					} else if (child.foreskin === 1) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `${His} clitoral hood is stretched thin trying to cover it. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `${His} small hood is no longer able to cover it completely and large part of ${his} clitoris is always exposed. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `${His} hood can no longer contain it and has slid back causing ${his} clitoris to be always exposed. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis, it stands at attention but due to lack of erectile tissues it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back causing ${his} clitoris to be always exposed. `;
						}
					} else if (child.foreskin === 2) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `It is completely covered by its hood. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `Its hood is stretched thin trying to cover it. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `It's large enough that the hood can cover only half of it. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis, it stands at attention but due to lack of erectile tissues it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back causing ${his} clitoris to be always exposed. `;
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is semi-erect since lack of erectile tissues means it can never become fully erect. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back causing ${his} clitoris to be always exposed. `;
						}
					} else if (child.foreskin === 3) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `The hood covering it is quite large making stimulation difficult. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `${His} large hood completely covers it. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `${His} large hood covers all but the tip of ${his} clit even when aroused. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis, it stands at attention but due to lack of erectile tissues it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `Even ${his} large hood can't cover it, leaving over half of the clit exposed. `;
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is semi-erect since lack of erectile tissues means it can never become fully erect. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back causing ${his} clitoris to be always exposed. `;
						}
					} else {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `${His} large thick hood covering it makes any stimulation difficult. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `${His} large thick hood covering it makes any stimulation difficult. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `Matching its size is the thick hood covering it. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis, it stands at attention but due to lack of erectile tissues it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `${His} large hood covering over half of it adds to its penis-like appearance. `;
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is semi-erect, since lack of erectile tissues means it can never reach full erection. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
							r += `Not even its large hood can contain it, leaving over half of it exposed. `;
						}
					}
				}
			}

			if (V.showBodyMods) {
				r += piercings.vagina(child);
				r += piercings.clit(child);
				r += tats.vagina(child);
			}

			if (child.rules.release.masturbation === 1) {
				if ((child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") && child.drugs !== "priapism agent") {
					if (child.aphrodisiacs > 1 || (child.inflationType === "aphrodisiac" && child.inflation > 1)) {
						if (child.dick !== 0 && child.hormoneBalance >= 100 && !hasAnyArms(child)) {
							r += `The extreme dose of aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.balls > 0 && child.ballType === "sterile" && !hasAnyArms(child)) {
							r += `The extreme dose of aphrodisiacs combined with the chemical castration that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} limp dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls && !hasAnyArms(child)) {
							r += `The extreme dose of aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} limp dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.hormoneBalance >= 100) {
							r += `The extreme dose of aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls) {
							r += `The extreme dose of aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !canAchieveErection(child)) {
							r += `The extreme dose of aphrodisiacs combined with ${his} inability to become erect have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0) {
							r += `The extreme dose of aphrodisiacs has ${his} cock painfully erect and precum drips from its head. `;
						}
					} else {
						if (child.dick !== 0 && child.hormoneBalance >= 100 && isAmputee(child)) {
							r += `The aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} sexually frustrated; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.balls > 0 && child.ballType === "sterile" && isAmputee(child)) {
							r += `The aphrodisiacs combined with the chemical castration that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls && isAmputee(child)) {
							r += `The aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.hormoneBalance >= 100) {
							r += `The aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} sexually frustrated; ${he}'s touching ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously rubbing ${his} ass against whatever's next to ${him}` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls) {
							r += `The aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s touching ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously rubbing ${his} ass against whatever's next to ${him}` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						}
					}
				}
			}

			if (child.vagina === -1) {
				r += `${V.seeDicks < 100 && child.anus > 0 ? `Since ${he} lacks a vagina, ${he} takes it up ${V.seeRace ? `${his} ${child.race}` : `the`} ass instead.` : ``}`;
			} else if (child.skill.vaginal >= 100) {
				r += `${He} is a <span class="aquamarine">vanilla sex master.</span> `;
			} else if (child.skill.vaginal > 60) {
				r += `${He} is a <span class="aquamarine">vanilla sex expert.</span> `;
			} else if (child.skill.vaginal > 30) {
				r += `${He} is <span class="aquamarine">skilled at vanilla sex.</span> `;
			} else if (child.skill.vaginal > 10) {
				r += `${He} has <span class="aquamarine">basic knowledge about vanilla sex.</span> `;
			} else {
				r += `${He} is unskilled at vaginal sex. `;
			}
		}

		return r;
	}

	function waist(child) {
		let
			r = ``,
			belly;

		if (child.belly >= 1500) {
			belly = bellyAdjective(child);
		}

		r += `${He} has `;

		if (child.waist > 95) {
			r += `a badly <span class="red">masculine waist</span> that ruins ${his} figure${child.weight > 30 ? ` and greatly exaggerates how fat ${he} is` : ` despite how thin ${he} is`}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} thick waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly is hidden by ${his} thick waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can be seen around ${his} thick waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} thick waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} thick waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				}
			}
		} else if (child.waist > 40) {
			r += `a broad, <span class="red">ugly waist</span> that makes ${him} look mannish${child.weight > 30 ? ` and exaggerates how fat ${he} is` : ` despite how thin ${he} is`}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} chunky waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 150000) {
					r += `${His} ${belly} belly is hidden by ${his} chunky waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can be seen around ${his} chunky waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} chunky waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} chunky waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist > 10) {
			r += `an <span class="red">unattractive waist</span> that conceals ${his} girlish figure${child.weight > 30 ? ` and accentuates how fat ${he} is` : ` despite how thin ${he} is`}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 10000) {
					r += `From behind, ${his} figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 200000) {
					r += `From behind, ${his} figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly can be seen around ${his} waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist >= -10) {
			r += `an average waist for a ${boy}${child.weight > 30 ? `, though it looks broader since ${he}'s fat` : child.weight < -30 ? `, though it looks narrower since ${he}'s thin` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 10000) {
					r += `From behind, ${his} figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 200000) {
					r += `From behind, ${his} figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly can be seen around ${his} waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist >= -40) {
			r += `a nice <span class="pink">feminine waist</span> that gives ${him} a girlish figure${child.weight > 30 ? ` despite ${his} extra weight` : child.weight < -30 ? ` and accentuates how thin ${he} is` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 10000) {
					r += `From behind, ${his} figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 100000) {
					r += `From behind, ${his} figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly can be seen around ${his} waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist >= -95) {
			r += `a hot <span class="pink">wasp waist</span> that gives ${him} an hourglass figure${child.weight > 30 ? ` despite ${his} extra weight` : child.weight < -30 ? ` further accentuated by how thin ${he} is` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} narrow waist and continues ${child.belly >= 1000000 ? `quite the distance` : `over half a ${V.showInches === 2 ? `yard` : `meter`}`} farther to either side. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 5000) {
					r += `From behind, ${his} narrow figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 80000) {
					r += `From behind, ${his} narrow figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 100000) {
					r += `${His} ${belly} belly can be seen around ${his} narrow waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly lewdly extends past ${his} narrow waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges to either side of ${his} narrow waist and continues for nearly half a ${V.showInches === 2 ? `yard` : `meter`} in both directions. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline barely visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else {
			r += `an <span class="pink">absurdly narrow waist</span> that gives ${him} a cartoonishly hourglass figure${child.weight > 30 ? ` made even more ludicrous by ${his} extra weight` : child.weight < -30 ? ` made even more ludicrous by how thin ${he} is` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} narrow waist and continues ${child.belly >= 1000000 ? `quite the distance` : `over half a ${V.showInches === 2 ? `yard` : `meter`}`} farther to either side. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 2000) {
					r += `From behind, ${his} narrow figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 5000) {
					r += `From behind, ${his} narrow figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 8000) {
					r += `${His} ${belly} belly can be seen around ${his} narrow waist. `;
				} else if (child.belly < 15000) {
					r += `${His} ${belly} belly lewdly extends past ${his} narrow waist. `;
				} else if (child.belly < 45000) {
					r += `${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges to either side of ${his} narrow waist and continues for nearly half a ${V.showInches === 2 ? `yard` : `meter`} in both directions. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline barely visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		}

		return r;
	}

	// instantiation
	piercings();
	tats();
	accessories();

	/* 000-250-006 */
	if (V.seeImages) {
		if (V.imageChoice === 1) {
			r += `<div class="imageRef lrgVector"><div class="mask">&nbsp;</div>${SlaveArt(child, 3, 0)}</div> `;
		} else {
			r += `<div class="imageRef lrgRender"><div class="mask">&nbsp;</div>${SlaveArt(child, 3, 0)}</div> `;
		}
	}
	/* 000-250-006 */

	r += `&nbsp;&nbsp;&nbsp;&nbsp; `;

	r += `<span id="childName"><strong><span class="pink">${SlaveFullName(child)}</span></strong></span> `;

	if (child.custom.label) {
		r += ` (<strong><span class="yellow">${child.custom.label}</span></strong>) `;
	}

	r += ` is `;

	if (child.devotion < -95) {
		r += `a <span class="devotion hateful">hate-filled,</span> `;
	} else if (child.devotion < -50) {
		r += `a <span class="devotion hateful">hateful,</span> `;
	} else if (child.devotion < -20) {
		r += `a <span class="devotion resistant">reluctant,</span> `;
	} else if (child.devotion <= 20) {
		r += `a <span class="devotion ambivalent">hesitant,</span> `;
	} else if (child.devotion <= 50) {
		r += `an <span class="devotion accept">accepting,</span> `;
	} else if (child.devotion <= 95) {
		r += `a <span class="devotion devoted">devoted,</span> `;
	} else {
		r += `a <span class="devotion worship">worshipful,</span> `;
	}

	if (child.trust < -95) {
		r += `<span class="trust extremely-terrified">abjectly terrified</span> `;
	} else if (child.devotion < -50) {
		r += `<span class="trust terrified">terrified</span> `;
	} else if (child.devotion < -20) {
		r += `<span class="trust frightened">frightened</span> `;
	} else if (child.devotion <= 20) {
		r += `<span class="trust fearful">fearful</span> `;
	} else if (child.devotion <= 50) {
		if (child.devotion < -20) {
			r += `<span class="defiant careful">careful</span> `;
		} else {
			r += `<span class="trust careful">careful</span> `;
		}
	} else if (child.devotion <= 95) {
		if (child.devotion < -20) {
			r += `<span class="defiant bold">bold</span> `;
		} else {
			r += `<span class="trust trusting">trusting</span> `;
		}
	} else {
		if (child.devotion < -20) {
			r += `<span class="defiant full">defiant</span> `;
		} else {
			r += `<span class="trust prof-trusting">profoundly trusting</span> `;
		}
	}

	r += `<strong><span class="coral">${SlaveTitle(child)}.</span></strong> `;

	r += App.Desc.ageAndHealth(child);

	if (!V.saleDescription) {
		if (V.clinic && V.clinicUpgradeScanner) {
			if (child.chem > 15) {
				r += `${V.clinicNameCaps}'s scanners score long term carcinogenic buildup in ${his} body at <span class="cyan">${Math.ceil(child.chem/10)}.</span> `;
			} else {
				r += `${V.clinicNameCaps}'s scanners confirm that ${he} has good prospects for long term health. `;
			}
		}

		if (V.showSexualHistory && V.ui !== "start") {
			let weeksOwned = V.week - child.weekAcquired;

			r += `${He} was born in ${arcology.name} ${weeksOwned} week${weeksOwned !== 1 ? `s` : ``} ago`;

			let oral = child.counter.oral,
				vaginal = child.counter.vaginal,
				anal = child.counter.oral,
				mammary = child.counter.mammary,
				penetrative = child.counter.penetrative,
				total = oral + vaginal + anal + mammary + penetrative;

			if (total > 0) {
				r += ` and has been fucked about ${total} times, including `;
				if ((vaginal + anal + mammary + penetrative) > 0) {
					if (vaginal > 0) {
						r += `${vaginal} vanilla, `;
					}
					if (anal > 0) {
						r += `${anal} anal, `;
					}
					if (mammary > 0) {
						r += `${mammary} mammary `;
					}
					if (penetrative > 0) {
						r += `${penetrative} penetrating, `;
					}
					r += ` and `;
				}
				r += `${oral} oral sexual encounters. `;
			} else {
				if (weeksOwned >= 1) {
					r += ` and `;
				} else {
					r += `. ${He} `;
				}

				r += `has had little or no sexual experience `;
				if (child.weekAcquired !== 0) {
					r += `as your slave `;
				} else {
					r += `in your new arcology `;
				}
				r += `yet. `;
			}

			let sortedCounts = [];
			sortedCounts.push(
				{type: "oral", value: oral},
				{type: "vaginal", value: vaginal},
				{type: "anal", value: anal},
				{type: "mammary", value: mammary},
				{type: "penetrative", value: penetrative}
			);
			sortedCounts = sortedCounts.sort(function(a, b) {	// sorts the counts from largest to smallest
				return b.value - a.value;
			});

			if (sortedCounts[0].type === "oral") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s sucked something off `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "vaginal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${his} pussy has been fucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "anal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s been buttfucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "mammary") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s put ${his} tits to work `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "penetrative") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s pounded a hole `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			}
		}

		r += App.Desc.eyes(child);

		if (child.fetish === "mindbroken") {
			r += `However, <span class="coral">${his} mind is fundamentally broken;</span> everything ${he} experiences will quickly be forgotten. `;
		}

		switch (child.behavioralFlaw) {
			case "arrogant":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">arrogant</span> at heart, but does ${his} best to hide it out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">arrogant</span> and seems to think slavery beneath ${him}. `;
				} else if (child.devotion <= 20) {
					r += `Despite being well broken, ${he} seems to retain hints of <span class="red">arrogance.</span> `;
				} else {
					r += `${He} is <span class="red">bitchy</span> and insults you every chance ${he} gets. `;
				}
				break;
			case "bitchy":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">bitchy</span> at times, but does ${his} best to keep quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">bitchy</span> and constantly tries to get a word in edgewise. `;
				} else if (child.devotion <= 20) {
					r += `Since ${he} is well broken, ${he} tries to confine ${his} <span class="red">bitchy</span> remarks to your other slaves. `;
				} else {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and resists it as best ${he} can. `;
				}
				break;
			case "liberated":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but usually keeps quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and rarely misses a chance to complain about it. `;
				} else if (child.devotion <= 20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but has learned to keep it to ${himself}. `;
				} else {
					r += `${He} is <span class="red">devoutly religious,</span> `;
				}
				break;
			case "devout":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `and uses ${his} faith as a wellspring of resistance. `;
				} else if (child.devotion < -20) {
					r += `and uses ${his} faith as a place of refuge. `;
				} else if (child.devotion <= 20) {
					r += `and uses ${his} faith as a private place within ${himself}. `;
				} else {
					r += `but has learned to keep ${his} faith private. `;
				}
				break;
			case "odd":
				r += `${He} behaves <span class="red">oddly,</span> saying and doing random things. `;
				break;
			case "hates men":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXY >= 85 && child.energy >= 40) {
					r += `men; since ${he} loves the dick, ${he}'s forced to put up with them. `;
				} else if (child.attrXY >= 65 && child.energy >= 40) {
					r += `men; since ${he} likes the dick, ${he} reluctantly puts up with them. `;
				} else {
					r += `men. `;
				}
				break;
			case "hates women":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXX >= 85 && child.energy >= 40) {
					r += `women; since ${he} loves pussy, ${he}'s forced to put up with them. `;
				} else if (child.attrXX >= 65 && child.energy >= 40) {
					r += `women; since ${he} likes pussy, ${he} reluctantly puts up with them. `;
				} else {
					r += `women. `;
				}
				break;
			case "anorexic":
				r += `${He} suffers from <span class="red">anorexia.</span> `;
				break;
			case "gluttonous":
				r += `${He} <span class="red">tends to overeat</span> whenever ${he} can, reacting to the rigors of sexual slavery with overeating. `;
				break;
		}

		switch (child.behavioralQuirk) {
			case "confident":
				r += `${He}'s <span class="green">confident,</span> and believes that ${he} has something of value to offer, even as a child. `;
				break;
			case "cutting":
				r += `${He} often has a witty or <span class="green">cutting</span> remark ready, but knows when to keep them to ${himself}. `;
				break;
			case "funny":
				r += `${He}'s <span class="green">funny,</span> often providing a little comic relief. `;
				break;
			case "adores men":
				r += `${He} <span class="green">adores women,</span> and loves spending time with them. `;
				break;
			case "adores women":
				r += `${He} <span class="green">adores men,</span> and loves spending time with them. `;
				break;
			case "fitness":
				r += `${He}'s a <span class="green">fitness fanatic,</span> and almost gets off to a hard workout. `;
				break;
			case "insecure":
				r += `${He}'s <span class="green">insecure,</span> defining ${his} self worth by how much others want to fuck ${him}. `;
				break;
			case "sinful":
				if (arcology.FSChattelRelionist === "unset") {
					r += `${He}'s delightfully <span class="green">sinful,</span> taking real pleasure in breaking cultural mores. `;
				} else {
					r += `${He}'s a devout Chattel Religionist, and is aggressively <span class="green">sinful</span> against old world faiths. ${He} is enthusiastic about slutty religious clothing, and excited by intentional sacrilege like openly using old world religious icons as sex toys or having orgies on altars. `;
				}
				break;
			case "advocate":
				r += `${He}'s an <span class="green">advocate</span> for slavery, and can articulate what it's done for ${him}. `;
				break;
		}

		switch (child.sexualFlaw) {
			case "hates oral":
				r += `${He} <span class="red">hates</span> oral sex and tries to avoid it. `;
				break;
			case "hates anal":
				r += `${He} <span class="red">hates</span> anal sex and tries to avoid it. `;
				break;
			case "hates penetration":
				r += `${He} <span class="red">hates</span> penetration and tries to avoid it. `;
				break;
			case "repressed":
				r += `${He} is <span class="red">sexually repressed,</span> retaining a fundamental distaste for sex from ${his} upbringing. `;
				break;
			case "idealistic":
				r += `${He} is <span class="red">sexually idealistic,</span> retaining a belief that sex should be based on love and consent. `;
				break;
			case "shamefast":
				r += `${He} is <span class="red">shamefast,</span> suffering crippling anxiety when naked. `;
				break;
			case "apathetic":
				r += `${He} is <span class="red">sexually apathetic,</span> often slipping into inertness during sex. `;
				break;
			case "crude":
				r += `${He} is <span class="red">sexually crude,</span> and has little sense of what partners find disgusting during sex. `;
				break;
			case "judgemental":
				r += `${He} is <span class="red">sexually judgemental,</span> and often denigrates ${his} sexual partners' performance. `;
				break;
			case "cum addict":
				r += `${He}'s a <span class="yellow">cum addict:</span> ${he} has a deep psychological addiction to ${PC.dick ? `semen` : PC.dick && PC.vagina !== 0 ? ` and ` : PC.vagina !== 0 ? `pussyjuice` : ``} and becomes anxious if ${he} goes for a few hours without drinking any. `;
				break;
			case "anal addict":
				r += `${He}'s an <span class="yellow">anal addict:</span> ${he} has a deep psychological need to be fucked in the ass and becomes anxious if ${he} goes for a few hours without anal. `;
				break;
			case "attention whore":
				r += `${He}'s an <span class="yellow">attention whore:</span> shocking and titillating spectators is more important to ${him} than the actual pleasure of sex. `;
				break;
			case "breast growth":
				r += `${He} has a <span class="yellow">breast growth obsession:</span> ${he}'s nearly incapable of believing that ${his} breasts are big enough. `;
				break;
			case "abusive":
				r += `${He}'s sexually <span class="yellow">abusive:</span> ${he} prefers taking sexual pleasure by force to having it offered to ${him}. `;
				break;
			case "malicious":
				r += `${He}'s sexually <span class="yellow">malicious:</span> ${he} gets off on others' anguish. `;
				break;
			case "self hating":
				r += `${He}'s filled with <span class="yellow">self hatred,</span> and is disturbingly willing to comply with things that might hurt ${him}. `;
				break;
			case "neglectful":
				r += `${He}'s sexually <span class="yellow">self neglectful,</span> and often shows no interest in getting off ${himself}. `;
				break;
			case "breeder":
				r += `${He}'s <span class="yellow">obsessed with being bred</span> to the point of fetishizing pregnancy itself as much as any act that leads to it. `;
				break;
		}

		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `${He}'s a <span class="green">gagfuck queen:</span> ${he}'s able to safely take a rough facefuck. `;
				break;
			case "painal queen":
				r += `${He}'s a <span class="green">painal queen:</span> ${he} knows exactly how much ${he} can take without getting hurt. `;
				break;
			case "strugglefuck queen":
				r += `${He}'s a <span class="green">strugglefuck queen:</span> ${he} can gauge exactly how much resistance ${his} partners want. `;
				break;
			case "tease":
				r += `${He}'s a <span class="green">tease,</span> and often displays a little flash of ${himself} followed by a blush. `;
				break;
			case "romantic":
				r += `${He}'s a <span class="green">romantic,</span> and persists in innocent pleasure in the closeness of sex. `;
				break;
			case "perverted":
				r += `${He}'s <span class="green">perverted,</span> and enjoys breaking sexual boundaries. `;
				break;
			case "caring":
				r += `${He}'s <span class="green">caring,</span> and enjoys bringing partners pleasure more than getting off ${himself}. `;
				break;
			case "unflinching":
				r += `${He}'s <span class="green">unflinching,</span> willing to do anything, even by the standards of sex slaves. `;
				break;
			case "size queen":
				r += `${He}'s <span class="green">a size queen;</span> preferring big cock is almost ${his} trademark. `;
				break;
		}

		if (child.fetishKnown) {
			switch (child.fetish) {
				case "submissive":
					if (child.sexualFlaw === "apathetic") {
						r += `This sexual apathy plays into ${his} preference for <span class="lightcoral">submission.</span> `;
					} else if (child.behavioralFlaw === "arrogant") {
						r += `${His} arrogance is really just a thin shell to protect ${his} true need to <span class="lightcoral">submit.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s an extreme <span class="lightcoral">submissive,</span> and relishes the strictures of slavery. `;
					} else if (child.fetishStrength > 60) {
						r += `${He}'s a confirmed <span class="lightcoral">submissive,</span> and enjoys the strictures of slavery. `;
					} else {
						r += `${He} has <span class="lightcoral">submissive</span> tendencies, and likes the strictures of slavery. `;
					}
					break;
				case "cumslut":
					if (child.sexualFlaw === "hates oral") {
						r += `${He}'s torn between ${his} <span class="lightcoral">love of semen</span> and ${his} dislike of having cocks in ${his} mouth. `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">cumslut,</span> and loves giving blowjobs and receiving facials. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers giving oral,</span> and enjoys sucking dick and receiving facials. `;
					} else {
						r += `${He} has an <span class="lightcoral">oral fixation,</span> and likes giving blowjobs and receiving facials. `;
					}
					break;
				case "humiliation":
					if (child.behavioralFlaw === "bitchy") {
						r += `${His} bitchiness is really just an expression of ${his} deep need to be <span class="lightcoral">humiliated</span> ${himself}. `;
					} else if (child.sexualFlaw === "shamefast") {
						r += `${His} shame is genuine, and it is with real self-loathing that ${he} <span class="lightcoral">gets off on humiliation.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a slut for <span class="lightcoral">humiliation,</span> and gets off on having others see ${his} enslavement. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">humiliating</span> sex. `;
					} else {
						r += `${He} likes <span class="lightcoral">embarrassing</span> sex. `;
					}
					break;
				case "buttslut":
					if (child.sexualFlaw === "hates anal") {
						r += `${His} hatred is just pretense to cover ${his} shame about how much ${he} really loves getting <span class="lightcoral">fucked in the butt.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">buttslut,</span> happy to have anyone put anything up ${his} ass. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers anal.</span> `;
					} else {
						r += `${He} has an <span class="lightcoral">anal fixation.</span> `;
					}
					break;
				case "boobs":
					if (child.fetishStrength > 95) {
						r += `${He} <span class="lightcoral">prefers mammary intercourse</span> to any other kind of sex, and readily climaxes to nipple stimulation. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">breast play,</span> and is rapidly aroused by nipple stimulation. `;
					} else {
						r += `${He} <span class="lightcoral">really likes boobs,</span> ${hers} and others. `;
					}
					break;
				case "pregnancy":
					if (child.fetishStrength > 95) {
						r += `${He} has a <span class="lightcoral">pregnancy fetish,</span> and finds anything related to reproduction sexy. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has an <span class="lightcoral">impregnation fantasy,</span> and enjoys bareback sex. `;
					} else {
						r += `${He} has a recurring <span class="lightcoral">impregnation fantasy.</span> `;
					}
					break;
				case "dom":
					if (child.sexualFlaw === "apathetic") {
						r += `${He} is at war with ${himself}, since ${his} habitual apathy during sex barely masks a desire to <span class="lightcoral">dominate.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">complete dom;</span> with other slaves this is expressed as a strong preference to top, and with ${his} betters ${he}'s an almost competitive lover. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} likes to take an active, powerful role in sex; with other slaves this is expressed as <span class="lightcoral">dominance,</span> and with ${his} betters ${he}'s a very energetic lover. `;
					} else {
						r += `${He} prefers to take a <span class="lightcoral">dominant</span> sexual role. `;
					}
					break;
				case "sadist":
					if (child.fetishStrength > 95) {
						r += `${He} is an <span class="lightcoral">aggressive sadist;</span> ${he}'s constantly plotting to control, abuse, and hurt other slaves. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has <span class="lightcoral">sadistic tendencies;</span> ${he} enjoys watching other slaves in pain, but truly loves causing pain ${himself}. `;
					} else {
						r += `${He} gets off on <span class="lightcoral">the suffering of others;</span> ${he} enjoys watching other slaves in pain. `;
					}
					break;
				case "masochist":
					if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">pain slut.</span> `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">gets off on pain,</span> showing strong masochistic tendencies. `;
					} else {
						r += `${He} <span class="lightcoral">doesn't mind pain,</span> and shows some masochistic tendencies. `;
					}
					break;
				default:
					r += `${His} sexual tastes are <span class="pink">quite normal.</span> `;
					break;
			}
		} else {
			r += `${His} fetishes, if any, are not known to you. `;
		}

		if (child.attrKnown) {
			if (child.energy > 95) {
				r += `${He}'s a <span class="green">nymphomaniac.</span> `;
			} else if (child.energy > 80) {
				r += `${He}'s a <span class="green">sex addict.</span> `;
			} else if (child.energy > 60) {
				r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
			} else if (child.energy > 40) {
				r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
			} else if (child.energy > 20) {
				r += `${He} has a <span class="red">weak sex drive.</span> `;
			} else {
				r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
			}

			if (child.attrXY <= 5) {
				if (child.attrXX <= 5) {
					r += `${He}'s a <span class="green">nymphomaniac.</span> `;
				} else {
					r += `${He}'s a <span class="green">sex addict.</span> `;
					if (child.attrXX <= 15) {
						r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
					} else if (child.attrXX <= 35) {
						r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
					} else if (child.attrXX <= 65) {
						r += `${He} has a <span class="red">weak sex drive.</span> `;
					} else if (child.attrXX <= 85) {
						r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
					} else if (child.attrXX <= 95) {
						r += `${He} <span class="red">finds both men's and women's intimate areas quite repulsive,</span> an unfortunate state of affairs! `;
					} else {
						r += `${He} <span class="red">finds men sexually disgusting,</span> `;
					}
				}
			} else if (child.attrXY <= 15) {
				r += `${He} <span class="red">considers men's bodies a turnoff,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">actually disgusted by women's.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and <span class="red">feels the same about women's.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 35) {
				r += `${He} is <span class="red">finds most men unattractive,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 65) {
				r += `${He}'s indifferent to sex with men, `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">actually unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and feels the same about women, too. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 85) {
				r += `${He} <span class="green">finds men attractive,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `but <span class="green">likes women even more.</span> `;
				} else {
					r += `but is really <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 95) {
				r += `${He} <span class="green">is aroused by most men,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `and <span class="green">thinks most women are hot,</span> too. `;
				} else {
					r += `but is most <span class="green">passionate about women.</span> `;
				}
			} else {
				r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				if (child.attrXX > 95) {
					r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				} else {
					r += `${He}'s <span class="green">passionate about men,</span> `;
					if (child.attrXX <= 5) {
						r += `${He}'s <span class="green">passionate about men,</span> `;
					} else if (child.attrXX <= 15) {
						r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
					} else if (child.attrXX <= 35) {
						r += `but is <span class="red">turned off by women.</span> `;
					} else if (child.attrXX <= 65) {
						r += `but is <span class="red">unenthusiastic about women.</span> `;
					} else if (child.attrXX <= 85) {
						r += `but is indifferent to women. `;
					} else if (child.attrXX <= 95) {
						r += `but also <span class="green">likes women,</span> too. `;
					} else {
						r += `but also <span class="green">thinks most women are hot,</span> too. `;
					}
				}
			}
		} else {
			r += `You do not understand ${his} sexuality very well. `;
		}

		if (!V.saleDescription && !V.eventDescription) {
			if (canSee(child) && child.attrKnown) {
				if (child.attrXX > 85 && PC.boobs >= 300) {
					r += `${His} attraction to women is obvious: ${he} can't seem to stop staring at your breasts. `;
				} else if (child.attrXY > 85 && PC.dick) {
					r += `${His} attraction to men is obvious: ${he} can't seem to stop glancing down at your package. `;
				} else if (child.attrXY > 85 && PC.boobs < 300 && PC.title === 1) {
					r += `${His} attraction to men is obvious: ${he} can't seem to stop checking out your broad chest. `;
				}
			}
		}

		switch (child.behavioralFlaw) {
			case "arrogant":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">arrogant</span> at heart, but does ${his} best to hide it out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">arrogant</span> and seems to think slavery beneath ${him}. `;
				} else if (child.devotion <= 20) {
					r += `Despite being well broken, ${he} seems to retain hints of <span class="red">arrogance.</span> `;
				} else {
					r += `${He} is <span class="red">bitchy</span> and insults you every chance ${he} gets. `;
				}
				break;
			case "bitchy":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">bitchy</span> at times, but does ${his} best to keep quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">bitchy</span> and constantly tries to get a word in edgewise. `;
				} else if (child.devotion <= 20) {
					r += `Since ${he} is well broken, ${he} tries to confine ${his} <span class="red">bitchy</span> remarks to your other slaves. `;
				} else {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and resists it as best ${he} can. `;
				}
				break;
			case "liberated":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but usually keeps quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and rarely misses a chance to complain about it. `;
				} else if (child.devotion <= 20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but has learned to keep it to ${himself}. `;
				} else {
					r += `${He} is <span class="red">devoutly religious,</span> `;
				}
				break;
			case "devout":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `and uses ${his} faith as a wellspring of resistance. `;
				} else if (child.devotion < -20) {
					r += `and uses ${his} faith as a place of refuge. `;
				} else if (child.devotion <= 20) {
					r += `and uses ${his} faith as a private place within ${himself}. `;
				} else {
					r += `but has learned to keep ${his} faith private. `;
				}
				break;
			case "odd":
				r += `${He} behaves <span class="red">oddly,</span> saying and doing random things. `;
				break;
			case "hates men":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXY >= 85 && child.energy >= 40) {
					r += `men; since ${he} loves the dick, ${he}'s forced to put up with them. `;
				} else if (child.attrXY >= 65 && child.energy >= 40) {
					r += `men; since ${he} likes the dick, ${he} reluctantly puts up with them. `;
				} else {
					r += `men. `;
				}
				break;
			case "hates women":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXX >= 85 && child.energy >= 40) {
					r += `women; since ${he} loves pussy, ${he}'s forced to put up with them. `;
				} else if (child.attrXX >= 65 && child.energy >= 40) {
					r += `women; since ${he} likes pussy, ${he} reluctantly puts up with them. `;
				} else {
					r += `women. `;
				}
				break;
			case "anorexic":
				r += `${He} suffers from <span class="red">anorexia.</span> `;
				break;
			case "gluttonous":
				r += `${He} <span class="red">tends to overeat</span> whenever ${he} can, reacting to the rigors of sexual slavery with overeating. `;
				break;
		}

		switch (child.behavioralQuirk) {
			case "confident":
				r += `${He}'s <span class="green">confident,</span> and believes that ${he} has something of value to offer, even as a child. `;
				break;
			case "cutting":
				r += `${He} often has a witty or <span class="green">cutting</span> remark ready, but knows when to keep them to ${himself}. `;
				break;
			case "funny":
				r += `${He}'s <span class="green">funny,</span> often providing a little comic relief. `;
				break;
			case "adores men":
				r += `${He} <span class="green">adores women,</span> and loves spending time with them. `;
				break;
			case "adores women":
				r += `${He} <span class="green">adores men,</span> and loves spending time with them. `;
				break;
			case "fitness":
				r += `${He}'s a <span class="green">fitness fanatic,</span> and almost gets off to a hard workout. `;
				break;
			case "insecure":
				r += `${He}'s <span class="green">insecure,</span> defining ${his} self worth by how much others want to fuck ${him}. `;
				break;
			case "sinful":
				if (arcology.FSChattelRelionist === "unset") {
					r += `${He}'s delightfully <span class="green">sinful,</span> taking real pleasure in breaking cultural mores. `;
				} else {
					r += `${He}'s a devout Chattel Religionist, and is aggressively <span class="green">sinful</span> against old world faiths. ${He} is enthusiastic about slutty religious clothing, and excited by intentional sacrilege like openly using old world religious icons as sex toys or having orgies on altars. `;
				}
				break;
			case "advocate":
				r += `${He}'s an <span class="green">advocate</span> for slavery, and can articulate what it's done for ${him}. `;
				break;
		}

		switch (child.sexualFlaw) {
			case "hates oral":
				r += `${He} <span class="red">hates</span> oral sex and tries to avoid it. `;
				break;
			case "hates anal":
				r += `${He} <span class="red">hates</span> anal sex and tries to avoid it. `;
				break;
			case "hates penetration":
				r += `${He} <span class="red">hates</span> penetration and tries to avoid it. `;
				break;
			case "repressed":
				r += `${He} is <span class="red">sexually repressed,</span> retaining a fundamental distaste for sex from ${his} upbringing. `;
				break;
			case "idealistic":
				r += `${He} is <span class="red">sexually idealistic,</span> retaining a belief that sex should be based on love and consent. `;
				break;
			case "shamefast":
				r += `${He} is <span class="red">shamefast,</span> suffering crippling anxiety when naked. `;
				break;
			case "apathetic":
				r += `${He} is <span class="red">sexually apathetic,</span> often slipping into inertness during sex. `;
				break;
			case "crude":
				r += `${He} is <span class="red">sexually crude,</span> and has little sense of what partners find disgusting during sex. `;
				break;
			case "judgemental":
				r += `${He} is <span class="red">sexually judgemental,</span> and often denigrates ${his} sexual partners' performance. `;
				break;
			case "cum addict":
				r += `${He}'s a <span class="yellow">cum addict:</span> ${he} has a deep psychological addiction to ${PC.dick ? `semen` : PC.dick && PC.vagina !== 0 ? ` and ` : PC.vagina !== 0 ? `pussyjuice` : ``} and becomes anxious if ${he} goes for a few hours without drinking any. `;
				break;
			case "anal addict":
				r += `${He}'s an <span class="yellow">anal addict:</span> ${he} has a deep psychological need to be fucked in the ass and becomes anxious if ${he} goes for a few hours without anal. `;
				break;
			case "attention whore":
				r += `${He}'s an <span class="yellow">attention whore:</span> shocking and titillating spectators is more important to ${him} than the actual pleasure of sex. `;
				break;
			case "breast growth":
				r += `${He} has a <span class="yellow">breast growth obsession:</span> ${he}'s nearly incapable of believing that ${his} breasts are big enough. `;
				break;
			case "abusive":
				r += `${He}'s sexually <span class="yellow">abusive:</span> ${he} prefers taking sexual pleasure by force to having it offered to ${him}. `;
				break;
			case "malicious":
				r += `${He}'s sexually <span class="yellow">malicious:</span> ${he} gets off on others' anguish. `;
				break;
			case "self hating":
				r += `${He}'s filled with <span class="yellow">self hatred,</span> and is disturbingly willing to comply with things that might hurt ${him}. `;
				break;
			case "neglectful":
				r += `${He}'s sexually <span class="yellow">self neglectful,</span> and often shows no interest in getting off ${himself}. `;
				break;
			case "breeder":
				r += `${He}'s <span class="yellow">obsessed with being bred</span> to the point of fetishizing pregnancy itself as much as any act that leads to it. `;
				break;
		}

		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `${He}'s a <span class="green">gagfuck queen:</span> ${he}'s able to safely take a rough facefuck. `;
				break;
			case "painal queen":
				r += `${He}'s a <span class="green">painal queen:</span> ${he} knows exactly how much ${he} can take without getting hurt. `;
				break;
			case "strugglefuck queen":
				r += `${He}'s a <span class="green">strugglefuck queen:</span> ${he} can gauge exactly how much resistance ${his} partners want. `;
				break;
			case "tease":
				r += `${He}'s a <span class="green">tease,</span> and often displays a little flash of ${himself} followed by a blush. `;
				break;
			case "romantic":
				r += `${He}'s a <span class="green">romantic,</span> and persists in innocent pleasure in the closeness of sex. `;
				break;
			case "perverted":
				r += `${He}'s <span class="green">perverted,</span> and enjoys breaking sexual boundaries. `;
				break;
			case "caring":
				r += `${He}'s <span class="green">caring,</span> and enjoys bringing partners pleasure more than getting off ${himself}. `;
				break;
			case "unflinching":
				r += `${He}'s <span class="green">unflinching,</span> willing to do anything, even by the standards of sex slaves. `;
				break;
			case "size queen":
				r += `${He}'s <span class="green">a size queen;</span> preferring big cock is almost ${his} trademark. `;
				break;
		}

		if (child.fetishKnown) {
			switch (child.fetish) {
				case "submissive":
					if (child.sexualFlaw === "apathetic") {
						r += `This sexual apathy plays into ${his} preference for <span class="lightcoral">submission.</span> `;
					} else if (child.behavioralFlaw === "arrogant") {
						r += `${His} arrogance is really just a thin shell to protect ${his} true need to <span class="lightcoral">submit.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s an extreme <span class="lightcoral">submissive,</span> and relishes the strictures of slavery. `;
					} else if (child.fetishStrength > 60) {
						r += `${He}'s a confirmed <span class="lightcoral">submissive,</span> and enjoys the strictures of slavery. `;
					} else {
						r += `${He} has <span class="lightcoral">submissive</span> tendencies, and likes the strictures of slavery. `;
					}
					break;
				case "cumslut":
					if (child.sexualFlaw === "hates oral") {
						r += `${He}'s torn between ${his} <span class="lightcoral">love of semen</span> and ${his} dislike of having cocks in ${his} mouth. `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">cumslut,</span> and loves giving blowjobs and receiving facials. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers giving oral,</span> and enjoys sucking dick and receiving facials. `;
					} else {
						r += `${He} has an <span class="lightcoral">oral fixation,</span> and likes giving blowjobs and receiving facials. `;
					}
					break;
				case "humiliation":
					if (child.behavioralFlaw === "bitchy") {
						r += `${His} bitchiness is really just an expression of ${his} deep need to be <span class="lightcoral">humiliated</span> ${himself}. `;
					} else if (child.sexualFlaw === "shamefast") {
						r += `${His} shame is genuine, and it is with real self-loathing that ${he} <span class="lightcoral">gets off on humiliation.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a slut for <span class="lightcoral">humiliation,</span> and gets off on having others see ${his} enslavement. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">humiliating</span> sex. `;
					} else {
						r += `${He} likes <span class="lightcoral">embarrassing</span> sex. `;
					}
					break;
				case "buttslut":
					if (child.sexualFlaw === "hates anal") {
						r += `${His} hatred is just pretense to cover ${his} shame about how much ${he} really loves getting <span class="lightcoral">fucked in the butt.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">buttslut,</span> happy to have anyone put anything up ${his} ass. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers anal.</span> `;
					} else {
						r += `${He} has an <span class="lightcoral">anal fixation.</span> `;
					}
					break;
				case "boobs":
					if (child.fetishStrength > 95) {
						r += `${He} <span class="lightcoral">prefers mammary intercourse</span> to any other kind of sex, and readily climaxes to nipple stimulation. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">breast play,</span> and is rapidly aroused by nipple stimulation. `;
					} else {
						r += `${He} <span class="lightcoral">really likes boobs,</span> ${hers} and others. `;
					}
					break;
				case "pregnancy":
					if (child.fetishStrength > 95) {
						r += `${He} has a <span class="lightcoral">pregnancy fetish,</span> and finds anything related to reproduction sexy. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has an <span class="lightcoral">impregnation fantasy,</span> and enjoys bareback sex. `;
					} else {
						r += `${He} has a recurring <span class="lightcoral">impregnation fantasy.</span> `;
					}
					break;
				case "dom":
					if (child.sexualFlaw === "apathetic") {
						r += `${He} is at war with ${himself}, since ${his} habitual apathy during sex barely masks a desire to <span class="lightcoral">dominate.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">complete dom;</span> with other slaves this is expressed as a strong preference to top, and with ${his} betters ${he}'s an almost competitive lover. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} likes to take an active, powerful role in sex; with other slaves this is expressed as <span class="lightcoral">dominance,</span> and with ${his} betters ${he}'s a very energetic lover. `;
					} else {
						r += `${He} prefers to take a <span class="lightcoral">dominant</span> sexual role. `;
					}
					break;
				case "sadist":
					if (child.fetishStrength > 95) {
						r += `${He} is an <span class="lightcoral">aggressive sadist;</span> ${he}'s constantly plotting to control, abuse, and hurt other slaves. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has <span class="lightcoral">sadistic tendencies;</span> ${he} enjoys watching other slaves in pain, but truly loves causing pain ${himself}. `;
					} else {
						r += `${He} gets off on <span class="lightcoral">the suffering of others;</span> ${he} enjoys watching other slaves in pain. `;
					}
					break;
				case "masochist":
					if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">pain slut.</span> `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">gets off on pain,</span> showing strong masochistic tendencies. `;
					} else {
						r += `${He} <span class="lightcoral">doesn't mind pain,</span> and shows some masochistic tendencies. `;
					}
					break;
				default:
					r += `${His} sexual tastes are <span class="pink">quite normal.</span> `;
					break;
			}
		} else {
			r += `${His} fetishes, if any, are not known to you. `;
		}

		if (child.attrKnown) {
			if (child.energy > 95) {
				r += `${He}'s a <span class="green">nymphomaniac.</span> `;
			} else if (child.energy > 80) {
				r += `${He}'s a <span class="green">sex addict.</span> `;
			} else if (child.energy > 60) {
				r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
			} else if (child.energy > 40) {
				r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
			} else if (child.energy > 20) {
				r += `${He} has a <span class="red">weak sex drive.</span> `;
			} else {
				r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
			}

			if (child.attrXY <= 5) {
				if (child.attrXX <= 5) {
					r += `${He}'s a <span class="green">nymphomaniac.</span> `;
				} else {
					r += `${He}'s a <span class="green">sex addict.</span> `;
					if (child.attrXX <= 15) {
						r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
					} else if (child.attrXX <= 35) {
						r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
					} else if (child.attrXX <= 65) {
						r += `${He} has a <span class="red">weak sex drive.</span> `;
					} else if (child.attrXX <= 85) {
						r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
					} else if (child.attrXX <= 95) {
						r += `${He} <span class="red">finds both men's and women's intimate areas quite repulsive,</span> an unfortunate state of affairs! `;
					} else {
						r += `${He} <span class="red">finds men sexually disgusting,</span> `;
					}
				}
			} else if (child.attrXY <= 15) {
				r += `${He} <span class="red">considers men's bodies a turnoff,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">actually disgusted by women's.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and <span class="red">feels the same about women's.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 35) {
				r += `${He} is <span class="red">finds most men unattractive,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 65) {
				r += `${He}'s indifferent to sex with men, `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">actually unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and feels the same about women, too. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 85) {
				r += `${He} <span class="green">finds men attractive,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `but <span class="green">likes women even more.</span> `;
				} else {
					r += `but is really <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 95) {
				r += `${He} <span class="green">is aroused by most men,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `and <span class="green">thinks most women are hot,</span> too. `;
				} else {
					r += `but is most <span class="green">passionate about women.</span> `;
				}
			} else {
				r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				if (child.attrXX > 95) {
					r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				} else {
					r += `${He}'s <span class="green">passionate about men,</span> `;
					if (child.attrXX <= 5) {
						r += `${He}'s <span class="green">passionate about men,</span> `;
					} else if (child.attrXX <= 15) {
						r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
					} else if (child.attrXX <= 35) {
						r += `but is <span class="red">turned off by women.</span> `;
					} else if (child.attrXX <= 65) {
						r += `but is <span class="red">unenthusiastic about women.</span> `;
					} else if (child.attrXX <= 85) {
						r += `but is indifferent to women. `;
					} else if (child.attrXX <= 95) {
						r += `but also <span class="green">likes women,</span> too. `;
					} else {
						r += `but also <span class="green">thinks most women are hot,</span> too. `;
					}
				}
			}
		} else {
			r += `You do not understand ${his} sexuality very well. `;
		}
	}

	if (!V.saleDescription && !V.eventDescription) {
		if (canSee(child) && child.attrKnown) {
			if (child.attrXX > 85 && PC.boobs >= 300) {
				r += `${His} attraction to women is obvious: ${he} can't seem to stop staring at your breasts. `;
			} else if (child.attrXY > 85 && PC.dick) {
				r += `${His} attraction to men is obvious: ${he} can't seem to stop glancing down at your package. `;
			} else if (child.attrXY > 85 && PC.boobs < 300 && PC.title === 1) {
				r += `${His} attraction to men is obvious: ${he} can't seem to stop checking out your broad chest. `;
			}
		}
	}

	r += App.Desc.brand(child, "cheek");
	r += App.Desc.brand(child, "ear");
	r += App.Desc.brand(child, "neck");

	/* OPEN FAMILY */

	if (V.familyTesting) {
		if (father === PC && mother === PC) {
			r += `${He} is <span class="lightgreen">your child;</span> you knocked yourself up with ${him}. `;
		} else if (father === mother) {
			r += `He was <span class="lightgreen">both fathered and mothered by ${father.slaveName}.</span> `;
		} else {
			if (father === PC) {
				r += `${He} is <span class="lightgreen">your child;</span> you knocked up ${his} mother, ${SlaveFullName(mother)}. `;
			} else if (mother === PC) {
				r += `${He} is <span class="lightgreen">your child;</span> you gave birth to ${him}. `;
			} else {
				let pName;
				if (father > 0) {
					if (child.father in V.missingTable && V.showMissingSlaves) {
						pName = V.slaves[V.slaveIndices[child.father]].slaveName;
					} else {
						pName = `your former slave ${V.missingTable[child.father].slaveName}`;
					}
					r += `${He} was <span class="lightgreen">fathered by ${pName}'s</span> virile dick. `;
				} else if (mother > 0) {
					if (child.mother in V.missingTable && V.showMissingSlaves) {
						pName = V.slaves[V.slaveIndices[child.mother]].slaveName;
					} else {
						pName = `your former slave ${V.missingTable[child.mother].slaveName}`;
					}
					r += `${He} was born from ${pName}'s fertile womb. `;
				}
			}
		}

		if (V.showDistantRelatives) {
			const
				mi = mother,
				fi = father;

			let
				mmi,
				fmi,
				mfi,
				ffi;

			if (jsDef(mi)) {
				mmi = mother.mother;
				fmi = mother.father;
			} else if (mother === PC) {
				mmi = PC.mother;
				fmi = PC.father;
			}

			if (jsDef(fi)) {
				mfi = father.mother;
				ffi = father.father;
			} else if (father === PC) {
				mfi = PC.mother;
				ffi = PC.father;
			}

			// grandparents
			if (jsDef(mi) || jsDef(fi) && !jsDef(mmi) && !jsDef(fmi) && !jsDef(mfi) && !jsDef(ffi)) {
				if (jsDef(mi)) {
					if (jsDef(fi) && mi === fi) {
						if (PC === mother.mother && PC === father.father) {
							r += `${He} is <span class="lightgreen">your grandchild.</span> You impregnated yourself with ${his} sole biological parent. `;
						} else if (PC === mother.mother) {
							r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to ${his} sole biological parent. `;
						} else if (PC === father.father) {
							r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered ${his} sole biological parent. `;
						}
					} else if (jsDef(fi) && PC === mother.mother && PC === father.mother) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to both of ${his} parents. `;
					} else if (jsDef(fi) && PC === mother.father && PC === father.father) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered both of ${his} parents. `;
					} else if (PC === mother.mother) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to ${his} mother. `;
					} else if (PC === mother.father) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered ${his} mother. `;
					}
				} else if (jsDef(fi)) {
					if (PC === father.mother) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You gave birth to ${his} father. `;
					} else if (PC === father.father) {
						r += `${He} is <span class="lightgreen">your grandchild.</span> You fathered ${his} father. `;
					}
				}
			} else {
				if (jsDef(mmi) && jsDef(ffi) && mmi === ffi) {
					r += `${His} sole granparent is ${mmi.slaveName}.</span> `;
				} else {
					if (jsDef(mmi) && jsDef(mfi) && mmi === mfi) {
						if (jsDef(mmi)) {
							r += `${His} sole <span class="lightgreen">grandparent is ${mmi}.</span> `;
						}
					} else {
						if (jsDef(mmi)) {
							r += `${His} maternal <span class="lightgreen">grandmother is ${mmi.slaveName}.</span> `;
						}
						if (jsDef(mfi)) {
							r += `${His} paternal <span class="lightgreen">grandmother is ${mfi.slaveName}.</span> `;
						}
					}
					if (jsDef(fmi) && jsDef(ffi) && fmi === ffi) {
						r += `${His} sole <span class="lightgreen">grandparent is ${ffi}.</span> `;
					} else {
						if (jsDef(fmi)) {
							r += `${His} maternal <span class="lightgreen">grandfather is ${fmi.slaveName}.</span> `;
						}
						if (jsDef(ffi)) {
							r += `${His} paternal <span class="lightgreen">grandfather is ${ffi.slaveName}.</span> `;
						}
					}
				}
			}

			// aunts
			for (let i = 0; i < V.slaves.length; i++) {
				if (V.slaves[i] === mother || V.slaves[i] === father) {
					for (let j = 0; j < V.slaves.length; j++) {
						if (V.slaves[j].genes === "XX") {
							if (areSisters(V.slaves[i], V.slaves[j]) === 1 || areSisters(V.slaves[i], V.slaves[j] === 2)) {
								V.children.push(V.slaves[j]);
							}
						}
					}
				}
			}

			if (V.children.length > 0) {
				r += `${He} `;
				if (V.children.length > 2) {
					r += `has <span class="lightgreen">many aunts, `;
					for (j = 0; j < V.children.length; j++) {
						if (j < V.children.length - 1) {
							r += `${V.children[j].slaveName}, `;
						} else {
							r += `and ${V.children[j].slaveName}.</span> `;
						}
					}
				} else if (V.children.length === 2) {
					r += `has <span class="lightgreen">two aunts, ${V.children[0].slaveName}, and ${V.children[1].slaveName}.</span> `;
				} else {
					r += `has <span class="lightgreen">an aunt, ${V.children[0].slaveName}.</span> `;
				}
			}
			V.children = [];

			// uncles
			for (let i = 0; i < V.slaves.length; i++) {
				if (V.slaves[i] === mother || V.slaves[i] === father) {
					for (let j = 0; j < V.slaves.length; j++) {
						if (V.slaves[j].genes === "XY") {
							if (areSisters(V.slaves[i], V.slaves[j]) === 1 || areSisters(V.slaves[i], V.slaves[j] === 2)) {
								V.children.push(V.slaves[j]);
							}
						}
					}
				}
			}

			if (V.children.length > 0) {
				r += `${He} `;
				if (V.children.length > 2) {
					r += `has <span class="lightgreen">many uncles, `;
					for (j = 0; j < V.children.length; j++) {
						if (j < V.children.length - 1) {
							r += `${V.children[j].slaveName}, `;
						} else {
							r += `and ${V.children[j].slaveName}.</span> `;
						}
					}
				} else if (V.children.length === 2) {
					r += `has <span class="lightgreen">two uncles, ${V.children[0].slaveName}, and ${V.children[1].slaveName}.</span> `;
				} else {
					r += `has <span class="lightgreen">an uncle, ${V.children[0].slaveName}.</span> `;
				}
			}
			V.children = [];

			// nieces
			for (let i = 0; i < V.slaves.length; i++) {
				if (areSisters(V.slaves[i], child) === 1 || areSisters(V.slaves[i], child) === 2) {
					for (let j = 0; j < V.slaves.length; j++) {
						if (V.slaves[i].ID !== V.slaves[j].ID && V.slaves[j].genes === "XX") {
							if (V.slaves[i].ID === V.slaves[j].mother || V.slaves[i].ID === V.slaves[j].father) {
								V.children.push(V.slaves[j]);
							}
						}
					}
				}
			}

			if (V.children.length > 0) {
				r += `${He} `;
				if (V.children.length > 2) {
					r += `has <span class="lightgreen">many nieces, `;
					for (j = 0; j < V.children.length; j++) {
						if (j < V.children.length - 1) {
							r += `${V.children[j].slaveName}, `;
						} else {
							r += `and ${V.children[j].slaveName}.</span> `;
						}
					}
				} else if (V.children.length === 2) {
					r += `has <span class="lightgreen">two nieces, ${V.children[0].slaveName}, and ${V.children[1].slaveName}.</span> `;
				} else {
					r += `has <span class="lightgreen">a niece, ${V.children[0].slaveName}.</span> `;
				}
			}
			V.children = [];

			// nephews
			for (let i = 0; i < V.slaves.length; i++) {
				if (areSisters(V.slaves[i], child) === 1 || areSisters(V.slaves[i], child) === 2) {
					for (let j = 0; j < V.slaves.length; j++) {
						if (V.slaves[i].ID !== V.slaves[j].ID && V.slaves[j].genes === "XY") {
							if (V.slaves[i].ID === V.slaves[j].mother || V.slaves[i].ID === V.slaves[j].father) {
								V.children.push(V.slaves[j]);
							}
						}
					}
				}
			}

			if (V.children.length > 0) {
				r += `${He} `;
				if (V.children.length > 2) {
					r += `has <span class="lightgreen">many nephews, `;
					for (j = 0; j < V.children.length; j++) {
						if (j < V.children.length - 1) {
							r += `${V.children[j].slaveName}, `;
						} else {
							r += `and ${V.children[j].slaveName}.</span> `;
						}
					}
				} else if (V.children.length === 2) {
					r += `has <span class="lightgreen">two nephews, ${V.children[0].slaveName}, and ${V.children[1].slaveName}.</span> `;
				} else {
					r += `has <span class="lightgreen">a nephew, ${V.children[0].slaveName}.</span> `;
				}
			}
			V.children = [];

			let
				twins = [],
				sisters = [],
				brothers = [],
				halfSisters = [],
				halfBrothers = [],
				cousins = [];

			for (let i = 0; i < V.slaves.length; i++) {
				let sisterCheck = areSisters(V.slaves[i], child);
				if (sisterCheck === 1) {
					twins.push(V.slaves[i]);
				}
				if (sisterCheck === 2) {
					(V.slaves[i].genes === "XX" ? sisters : brothers).push(V.slaves[i]);
				}
				if (sisterCheck === 3) {
					(V.slaves[i].genes === "XX" ? halfSisters : halfBrothers).push(V.slaves[i]);
				}
				if (V.showDistantRelatives) {
					if (areCousins(V.slaves[i], child)) {
						cousins.push(V.slaves[i]);
					}
				}
			}

			// twins
			if (twins.length > 0) {
				r += `${He} `;
				if (twins.length > 2) {
					r += `<span class="lightgreen">shared a cramped womb with ${twins.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})}</span> `;
				} else if (twins.length === 2) {
					r += `is <span class="lightgreen">one of a set of triplets; ${twins[0].slaveName} and ${twins[1].slaveName}</span> complete the trio. `;
				} else {
					r += `is <span class="lightgreen">twins with ${twins[0].slaveName}.</span> `;
				}
			}

			// sisters
			if (sisters.length > 0) {
				if (sisters.length > 1) {
					r += `<span class="lightgreen">${sisters.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are ${his} sisters.</span> `;
				} else {
					r += `<span class="lightgreen">${sisters[0].slaveName} is ${his} sister. `;
				}
			}

			// brothers
			if (brothers.length > 0) {
				if (brothers.length > 1) {
					r += `<span class="lightgreen">${brothers.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are ${his} brothers.</span> `;
				} else {
					r += `<span class="lightgreen">${brothers[0].slaveName} is ${his} brother. `;
				}
			}

			// half-sisters
			V.children = V.slaves.filter(function(s) {
				return areSisters(child, s) === 3 && s.genes === "XX";
			});
			if (V.children.length > 0) {
				if (V.children.length > 2) {
					r += `<span class="lightgreen">${V.children.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are half-sisters to ${him}.</span> `;
				} else if (V.children.length === 2) {
					r += `<span class="lightgreen">${V.children[0].slaveName} and ${V.children[1].slaveName} are half-sisters to ${him}.</span> `;
				} else {
					r += `<span class="lightgreen">${V.children[0].slaveName} is a half-sister to ${him}.</span> `;
				}
			}

			// half-brothers
			V.children = V.slaves.filter(function(s) {
				return areSisters(child, s) === 3 && s.genes === "XY";
			});
			if (V.children.length > 0) {
				if (V.children.length > 2) {
					r += `<span class="lightgreen">${V.children.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are half-brothers to ${him}.</span> `;
				} else if (V.children.length === 2) {
					r += `<span class="lightgreen">${V.children[0].slaveName} and ${V.children[1].slaveName} are half-brothers to ${him}.</span> `;
				} else {
					r += `<span class="lightgreen">${V.children[0].slaveName} is a half-brother to ${him}.</span> `;
				}
			}

			// cousins
			V.children = V.slaves.filter(function(s) {
				return areCousins(child, s);
			});
			if (V.children.length > 0) {
				if (V.children.length > 2) {
					r += `<span class="lightgreen">${V.children.reduce(function(res, ch, i, arr) {
					return (res.slaveName || res) + (i === arr.length - 1 ? ` and ` : `, `) + ch.slaveName;
				})} are cousins to ${him}.</span> `;
				} else if (V.children.length === 2) {
					r += `<span class="lightgreen">${V.children[0].slaveName} and ${V.children[1].slaveName} are cousins to ${him}.</span> `;
				} else {
					r += `<span class="lightgreen">${V.children[0].slaveName} is a cousins to ${him}.</span> `;
				}
			}
		}

		if (child.relationship >= 3 && totalRelatives(child) > 0) {
			const lover = getSlave(child.relationshipTarget);
			if (jsDef(lover)) {
				if (child.mother === lover.ID) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} mother, ${SlaveFullName(lover)}.</span> `;
				} else if (child.father === lover.ID) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} father, ${SlaveFullName(lover)}.</span> `;
				} else if (lover.mother === child.ID || lover.father === child.ID) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} daughter, ${SlaveFullName(lover)}.</span> `;
				} else {
					switch (areSisters(child, lover)) {
						case 1:
							r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} twin, ${SlaveFullName(lover)}.</span> `;
							break;
						case 2:
							r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} sister, ${SlaveFullName(lover)}.</span> `;
							break;
						case 3:
							r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} half-sister, ${SlaveFullName(lover)}.</span> `;
							break;
					}
				}
			}
		} else if (child.relationship <= -2) {
			if (child.mother === -1 || child.father === -1) {
				if (child.mother === -1 && child.father === -1) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} sole parent, you.</span> `;
				} else if (child.mother === -1) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} mother, you.</span> `;
				} else if (child.father === -1) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} father, you.</span> `;
				}
			} else if (areSisters(PC, child) === 1) {
				if (PC.title === 1) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} twin brother, you.</span> `;
				} else if (PC.title === 0) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} twin sister, you.</span> `;
				}
			} else if (areSisters(PC, child) === 2) {
				if (PC.title === 1) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} brother, you.</span> `;
				} else if (PC.title === 0) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} sister, you.</span> `;
				}
			} else if (areSisters(PC, child) === 3) {
				if (PC.title === 1) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} half-brother, you.</span> `;
				} else if (PC.title === 0) {
					r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} half-sister, you.</span> `;
				}
			}
		}
	} else {
		if (child.relation !== 0) {
			let lcd = V.slaveIndices[child.relationTarget];
			if (jsDef(lcd)) {
				if (slaves[lcd].ID === child.relationshipTarget && child.relationship >= 3) {
					r += `${He} is <span class="lightgreen">${SlaveFullName(slaves[lcd])}'s ${child.relation}, making their relationship incestuous.</span> `;
				} else {
					r += `${He} is <span class="lightgreen">${SlaveFullName(slaves[lcd])}'s ${child.relation}.</span> `;
				}
			}
		}
	}

	/* CLOSE FAMILY */

	if (child.rivalry) {
		let lcd = V.slaveIndices[child.rivalryTarget];
		if (jsDef(lcd)) {
			r += `${He} `;
			if (child.rivalry <= 1) {
				r += `<span class="lightsalmon">dislikes</span> ${SlaveFullName(slaves[Lcd])}. `;
			} else if (child.rivalry <= 2) {
				r += `is ${SlaveFullName(slaves[Lcd])}>>'s <span class="lightsalmon">rival.</span> `;
			} else {
				r += `<span class="lightsalmon">bitterly hates</span> ${SlaveFullName(slaves[Lcd])}>>. `;
			}
		}
	}
	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp; `;
	// TODO: rework this subsection

	/*	for possible future inclusion
	if (child.prestige > 0) {
		if (child.prestigeDesc) {
			r += `${child.prestigeDesc} `;
		}
		if (child.prestige > 2) {
			r += `It is extremely prestigious to own ${him}. `;
		} else if (child.prestige > 1) {
			r += `It is quite prestigious to own ${him}. `;
		} else {
			r += `It is fairly prestigious to own ${him}. `;
		}
	}

	if (child.pornPrestige > 0) {
		if (child.pornPrestigeDesc) {
			r += `${child.pornPrestigeDesc} `;
		}
	}

	if (child.prestige > 0 || child.pornPrestige > 0) {
		if (child.pornPrestige > 2) {
			r += `As such, ${he} tends to gain a following wherever ${he} goes. `;
		} else if (child.pornPrestige > 1) {
			r += `As such, ${he} is recognized often. `;
		} else {
			r += `As such, ${he} is recognized occasionally. `;
		}
	}

	if (child.prestige > 0 || child.pornPrestige > 1) {
		if (child.markings === "birthmark") {
			r += `${He} has a large, liver-colored birthmark, but since ${he}'s well known, this uniqueness adds to ${his} beauty rather than detracting from it. `;
		}
	}
	*/

	// TODO: rewrite this to sound more natural
	if (child.skill.whoring <= 10) {
		if (child.skill.entertainment <= 10) {
			if (child.skill.entertainment <= 0) {
				r += ``;
			} else {
				r += `${He} is somewhat entertaining. `;
			}
		} else if (child.skill.entertainment <= 30) {
			r += `${He} is <span class=aquamarine>reasonably entertaining.</span> `;
		} else if (child.skill.entertainment <= 60) {
			r += `${He} is a <span class=aquamarine>skilled entertainer.</span> `;
		} else if (child.skill.entertainment < 100) {
			r += `${He} is an <span class=aquamarine>expert entertainer.</span> `;
		} else {
			r += `${He} is a <span class=aquamarine>master of entertainment.</span> `;
		}
	} else {
		if (child.skill.entertainment <= 10) {
			if (child.skill.entertainment <= 0) {
				r += ``;
			} else {
				r += `${He} is somewhat entertaining and `;
			}
		} else if (child.skill.entertainment <= 30) {
			r += `${He} is <span class=aquamarine>reasonably entertaining</span> and `;
		} else if (child.skill.entertainment <= 60) {
			r += `${He} is a <span class=aquamarine>skilled entertainer</span> and `;
		} else if (child.skill.entertainment < 100) {
			r += `${He} is an <span class=aquamarine>expert entertainer</span> and `;
		} else {
			r += `${He} is a <span class=aquamarine>master of entertainment</span> and `;
		}
	}
	if (child.skill.whoring <= 10) {
		if (child.skill.whoring <= 0) {
			r += ``;
		} else {
			r += `${He} has very little experience in selling ${his} body. `;
		}
	} else if (child.skill.whoring <= 30) {
		if (child.skill.entertainment <= 10) {
			r += `${He} `;
		}
		r += `has <span class=aquamarine>basic experience as a prostitute.</span> `;
	} else if (child.skill.whoring <= 60) {
		if (child.skill.entertainment <= 10) {
			r += `${He} is `;
		}
		r += `a <span class=aquamarine>skilled streetwalker.</span> `;
	} else if (child.skill.whoring < 100) {
		if (child.skill.entertainment <= 10) {
			r += `${He} is `;
		}
		r += `an <span class=aquamarine>expert working ${boy}.</span> `;
	} else {
		if (child.skill.entertainment <= 10) {
			r += `${He} is `;
		}
		r += `a <span class=aquamarine>masterful whore.</span> `;
	}

	if (child.custom.desc !== "" && jsDef(child.custom.desc)) {
		r += `${child.custom.desc} `;
	}

	if (arcology.FSGenderFundamentalistLawBeauty > 0 || arcology.FSGenderRadicalistLawBeauty > 0 || arcology.FSSlimnessEnthusiastLaw > 0 || arcology.FSHedonisticDecadenceLaw2 > 0 || arcology.FSRestartSMR > 0) {
		r += `${His} body is a perfect example of `;
		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (genderLawPass(child)) {
				r += `the fashionable feminine ideal. `;
			}
		} else if (arcology.FSSlimnessEnthusiastLaw) {
			if (slimPass(child)) {
				r += `the fashionable flat ideal. `;
			}
		} else if (arcology.FSHedonisticDecadenceLaw2) {
			if (child.boobs >= 2000 && child.butt >= 5 && child.weight > 95) {
				r += `the fashionable plump body. `;
			}
		}
		if (arcology.FSRestartSMR > 0 && arcology.FSRestart > 80 && !child.dick && !child.balls && !child.ovaries && !child.mpreg && child.vagina < 0) {
			r += `a subhuman who accepted their place in society. `;
		}
	}

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	r += App.Desc.limbs(child);

	if (V.showClothing && !V.saleDescription) {
		r += `${child.slaveName} is `;
		if (child.clothes === "choosing her own clothes") {
			r += `allowed to choose ${his} own clothes, but hasn't made a selection yet, `;
		} else {
			r += `wearing ${child.clothes}, `;
		}

		switch (child.clothes) {
			case "a slave gown":
				r += `a gorgeous affair ${!hasAnyLegs(child) ? `cleavage and a short skirt. ` : `with cuts that offer tantalizing glimpses of delicate flesh and ${footwear(child)}`}`;
				break;
			case "a ball gown":
				r += `a majestically grand silken dress for formal ${!hasAnyLegs(child) ? `back. ` : `occasions, stockings, and ${footwear(child)}`}`;
				break;
			case "a mini dress":
				r += `a body hugging strapless number that shows as much skin as it ${!hasAnyLegs(child) ? `everything. ` : `covers, paired with ${footwear(child)}`}`;
				break;
			case "a schoolgirl outfit":
				r += `which includes a tight white ${!hasAnyLegs(child) ? `pattern. ` : `blouse, a short plaid skirt, and ${footwear(child)}`}`;
				break;
			case "a sweater":
			case "a t-shirt":
			case "a tank-top":
			case "an oversized t-shirt":
				r += `which only covers ${his} ${!hasAnyLegs(child) ? `breasts. ` : `torso, and ${footwear(child)}`}`;
				break;
			default:
				r += `so ${his} nude body is on display. ${!hasAnyLegs(child) ? `In fact, ${he}'s devoid of even legs. ` : `${He} is wearing ${footwear(child)}`}`;
				break;
		}
	}

	if (V.showBodyMods) {
		r += clothingCorset(child);
	}

	if (V.showClothing && !V.saleDescription) {
		r += `${He}`;
	} else {
		r += `${child.slaveName}`;
	}
	let averageHeight = Height.mean(child);

	r += ` is `;

	// TODO: should these numbers be tweaked to account for smaller body sizes?
	if (child.height <= averageHeight + 5 && child.height >= averageHeight - 5) {
		r += `an average height`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height < averageHeight - 15) {
		r += `petite`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height < averageHeight - 5) {
		r += `short`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height > averageHeight + 15) {
		r += `very tall`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height > averageHeight + 5) {
		r += `tall`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	}
	if (V.showHeightCMs) {
		r += ` at ${heightToEitherUnit(child.height)},`;
	}

	r += ` and `;

	if (child.weight > 190) {
		if (arcology.FSHedonisticDecadence !== "unset") {
			r += `${jsEither("perfectly curvy", "perfectly plush")}. `;
		} else {
			r += `<span class="red">${jsEither("dangerously fat", "dangerously overweight", "extremely obese")}.</span> `;
		}
	} else if (child.weight > 160) {
		if (arcology.FSHedonisticDecadence !== "unset") {
			r += `${jsEither("spectacularly curvy", "spectacularly plush")}. `;
		} else {
			r += `<span class="red">${jsEither("extremely fat", "extremely overweight")}.</span> `;
		}
	} else if (child.weight > 130) {
		if (arcology.FSHedonisticDecadence !== "unset") {
			r += `${jsEither("amazingly curvy", "amazingly plush")}. `;
		} else {
			r += `<span class="red">${jsEither("very overweight", "obese", "very fat")}.</span> `;
		}
	} else if (child.weight > 95) {
		if (child.hips > 1) {
			r += `${"extremely curvy", "extremely plush"}, but ${his} huge hips make the extra weight attractive on ${him}. `;
		} else if (arcology.FSHedonisticDecadence !== "unset") {
			r += `${jsEither("extremely curvy", "extremely plush")}. `;
		} else {
			r += `<span class="red">${jsEither("carrying a lot of extra weight", "fat", "overweight")}.</span> `;
		}
	} else if (child.weight > 30) {
		if (child.hips > 1) {
			r += `${jsEither("quite curvy", "very plush")}, but ${his} motherly hips make the extra weight attractive on ${him}. `;
		} else if (arcology.FSHedonisticDecadence !== "unset") {
			r += `${jsEither("quite curvy", "very plush")}. `;
		} else {
			r += `<span class="red">${jsEither("carrying extra weight", "chubby")}.</span> `;
		}
	} else if (child.weight > 10) {
		r += `${jsEither("nicely plush", "pleasingly curvy")}. `;
	} else if (child.weight >= -10) {
		r += `${jsEither("a healthy weight", "an attractive weight")}. `;
	} else if (child.weight >= -30) {
		r += `${jsEither("appealingly skinny", "pleasingly thin")}. `;
	} else if (child.weight >= -95) {
		if (child.hips > 1) {
			r += `${jsEither("quite skinny", "very thin")}, but ${his} wide hips make the gap between ${his} thighs very noticeable. `;
		} else if (child.hips < -1) {
			r += `${jsEither("quite skinny", "very thin")}, but ${his} trim hips make ${him} look like a model. `;
		} else {
			r += `<span class="red">${"rail thin", "too skinny", "underweight"}.</span> `;
		}
	} else {
		r += `<span class="red">${"dangerously skinny", "emaciated"}.</span> `;
	}

	if (child.hips > 2) {
		r += `${His} hips are unrealistically wide; it is obvious they have been artificially widened. `;
	}

	r += waist(child);

	if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderFundamentalistLawBeauty > 0) {
		if (arcology.FSHedonisticDecadence === "unset" && arcology.FSPhyscialIdealistStrongFat === 0) {
			if (child.weight > 130) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight > 30) {
				r += `${He} is too fat for the fashionable feminine ideal. `;
			} else if (child.weight < -30) {
				r += `${He} is too skinny for the fashionable feminine ideal. `;
			}
		} else {
			if (child.weight > 130) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight < -30) {
				r += `${He} is too skinny for the fashionable feminine ideal. `;
			}
		}
	} else if (arcology.FSSlimnessEnthusiastLaw === 1) {
		if (arcology.FSHedonisticDecadence === "unset" && arcology.FSPhyscialIdealistStrongFat === 0) {
			if (child.weight > 30) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight > 10) {
				r += `${He} is too fat for the fashionable feminine ideal. `;
			}
		} else {
			if (child.weight > 60) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight > 30) {
				r += `${He} is too fat for the fashionable feminine ideal. `;
			}
		}
	} else if (arcology.FSHedonisticDecadenceLaw2) {
		if (child.weight <= 95) {
			r += `${He} is too thin for the fashionable feminine ideal. `;
		} else if (child.weight <= 10) {
			r += `${He} is much too thin for the fashionable feminine ideal. `;
		}
	}

	if (canWalk(child)) {
		if (child.weight > (170 + child.muscles / 5) && child.physicalAge >= 18) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		} else if (child.weight > (110 + child.muscles / 20) && child.physicalAge <= 3) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		} else if (child.weight > (140 + child.muscles / 15) && child.physicalAge <= 12) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		} else if (child.weight > (165 + child.muscles / 10 && child.physicalAge < 18)) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		}
	}

	r += heightImplant(child);

	r += `${He} is `;
	if (child.muscles > 95) {
		r += `<span class="pink">extremely muscular,</span> with defined pecs, powerful glutes, and massive traps`;
		if (child.weight > 95) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles > 50) {
		r += `<span class="pink">quite muscular,</span> with ripped abs, strong shoulders, and defined lats`;
		if (child.weight > 95) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles > 30) {
		r += `<span class="pink">well built,</span> yet feminine with defined abs and strong shapely muscles`;
		if (child.weight > 95) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles > 5) {
		r += `<span class="pink">well built,</span> yet feminine, with just-visible muscles`;
		if (child.weight > 30) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles >= -5) {
		r += `<span class="pink">soft and feminine,</span> with no visible muscles. `;
	} else if (child.muscles >= -30) {
		r += `<span class="pink">rather weak,</span> with barely any muscles. `;
	} else if (child.muscles >= -95) {
		r += `<span class="pink">very weak;</span> ${he} struggles with day-to-day tasks. `;
	} else {
		r += `<span class="red">frail;</span> ${he} can barely hold ${himself} up. `;
	}

	if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty + arcology.FSSlimnessEnthusiastLaw > 0 && arcology.FSPhysicalIdealist === "unset" && !arcology.FSHedonisticDecadenceStrongFat) {
		if (arcology.FSPhysicalIdealistLaw > 0 && child.muscles > 50) {
			r += `${He} is entirely too muscular for the fashionable feminine ideal. `;
		} else if (child.muscles > 30) {
			r += `${He} is entirely too muscular for the fashionable feminine ideal. `;
		}
	}

	if (hasAnyArms(child)) {
		let s = "s";
		let a = "";
		if (!hasBothArms(child)) {
			s = "";
			a = "a ";
		}
		if (child.weight > 190) {
			r += `${He} has ${a}hugely thick arm${s} with sagging fat rolls and `;
		} else if (child.weight > 160) {
			r += `${He} has ${a}thick arm${s} with drooping fat folds and `;
		} else if (child.weight > 130) {
			r += `${He} has ${a}plump arm${s} with `;
		} else if (child.weight > 97) {
			r += `${He} has ${a}chubby arm${s} with `;
		} else {
			r += `${He} has ${a}normal arm${s} with `;
		}

	if (child.muscles > 95) {
		r += `huge muscles`;
		if (child.weight > 95) {
			r += ` hidden beneath ${his} soft flesh`;
		}
		r += `. `;
	} else if (child.muscles > 30) {
		r += `obvious muscles`;
		if (child.weight > 95) {
			r += ` hidden beneath ${his} soft flesh`;
		}
		r += `. `;
	} else if (child.muscles > 5) {
		r += `toned muscles`;
		if (child.weight > 30) {
				r += ` hidden beneath ${his} soft flesh`;
			}
			r += `. `;
		} else {
			r += `little muscle to them. `;
		}
	}

	if (child.skill.combat > 0) {
		r += `${He} is <span class="aquamarine"skilled at combat:</span> ${he} is comfortable with the use of modern firearms and edges weapons, and ${his} limbs `;
		if (getLimbCount(child, 105) > 1) {
			r += `would be deadly weapons even if they weren't full of deadly weapons already`;
		} else if (!isAmputee(child)) {
			r += `would be deadly weapons if ${he} had any`;
		} else {
			r += `are deadly weapons`;
		}
		r += `. `;
	}

	if (child.counter.pitKills > 0) {
		r += `${child.counter.pitKills} slaves have died by ${his} hand in pit fights. `;
	}

	if (child.corsetPiercing > 0) {
		r += piercings.corset(child);
	}

	if (hasAnyLegs(child)) {
		let s = "s";
		let a = "";
		if (!hasBothLegs(child)) {
			s = "";
			a = "a ";
		}

		if (child.weight > 190) {
			r += `${He} has ${hasBothLegs(child) ? `` : `an `}extremely fat leg${s} with ${hasBothLegs(child) ? `` : `an `}immense soft, rather uneven thigh${s} and `;
		} else if (child.weight > 160) {
			r += `${He} has ${a}very fat leg${s} with ${a}massively thick, soft, somewhat uneven thigh${s} and `;
		} else if (child.weight > 130) {
			r += `${He} has ${a}fat leg${s} with ${a}hugely thick, soft thigh${s} and `;
		} else if (child.weight > 97) {
			r += `${He} has ${a}fat leg${s} with ${a}thick, soft thigh${s} and `;
		} else if (child.weight > 95) {
			r += `${He} has ${a}normal leg${s} with ${a}thick, soft thigh${s} and `;
		} else {
			r += `${He} has ${a}relatively normal leg${s} and thigh${s} with `;
		}

		if (child.muscles > 95) {
			r += `huge muscles`;
			if (child.weight > 95) {
				r += ` hidden beneath ${his} soft flab`;
			}
			r += `. `;
		} else if (child.muscles > 30) {
			r += `obvious muscles`;
			if (child.weight > 95) {
				r += ` hidden beneath ${his} soft flab`;
			}
			r += `. `;
		} else if (child.muscles > 5) {
			r += `toned muscles`;
			if (child.weight > 30) {
				r += ` hidden beneath ${his} soft flab`;
			}
			r += `. `;
		} else {
			r += `barely any muscle in them. `;
		}
	}

	r += heel(child);

	r += App.Desc.brand(child, "feet");
	r += App.Desc.brand(child, "calf");
	r += App.Desc.brand(child, "ankle");
	r += App.Desc.brand(child, "extra");

	r += skin(child);

	if (V.saleDescription) {
		r += accent(child);
	}

	if (child.markings === "birthmark" && !child.prestige && child.pornPrestige < 2) {
		r += `${He} has a large, liver-colored birthmark, detracting from ${his} beauty. `;
	}
	if (child.skin === "sun tanned") {
		if (App.Utils.hasNonassignmentSex(child)) {
			if (child.fetishKnown && child.fetishStrength > 60) {
				r += `${His} tan is slightly uneven, since ${he} enjoys`;
				switch (child.fetish) {
					case "buttslut":
						r += `letting other tanned slaves share a tanning bed with ${him} so they can sodomize ${him} while ${he} tans. `;
						break;
					case "cumslut":
						r += `letting other tanned slaves share a tanning bed with ${him} so they get oral from ${him} while ${he} tans. `;
						break;
					case "sadist":
						r += `forcing inferior slaves into the tanning beds with ${him} so ${he} can sodomize them while ${he} tans. `;
						break;
					case "dom":
						r += `bringing other slaves into the tanning beds with ${him} so ${he} can fuck them while ${he} tans. `;
						break;
					case "masochist":
					case "submissive":
						r += `letting other slaves into the tanning beds with ${him} so they can fuck ${him} while ${he} tans. `;
						break;
					case "boobs":
						r += `bringing other slaves into the tanning beds with ${him} so ${he} can tittyfuck them while ${he} tans. `;
						break;
					case "pregnancy":
						if (Math.random() * 100 < V.seeDicks) {
							r += `letting slaves with dicks into the tanning beds with ${him} so they can cum inside ${him} while ${he} tans. `;
						}
						break;
					default:
						r += `bringing other slaves into the tanning beds with ${him} to have sex while ${he} tans. `;
						break;
				}
			}
		}
	}

	if (V.showClothing && !V.saleDescription) {
		r += ears(child);
		r += upperFace(child);
		r += hair(child);
	} else {
		r += `${His} hair is ${child.hColor}`;
		if (child.hColor !== child.eyebrowHColor) {
			r += `, with ${child.eyebrowHColor} eyebrows`;
		}
		r += `. `;
		if (child.hColor === "red" && child.hLength >= 10) {
			if (child.markings === "freckles" || (child.markings === "heavily freckled")) {
				if (skinToneLevel(child.skin) > 5 && skinToneLevel(child) < 10) {
					r += `It goes perfectly with ${his} ${child.skin} skin and freckles. `;
				}
			}
		}
	}

	let pubertyAge = Math.max(child.pubertyAgeXX, child.pubertyAgeXY);
	if (child.physicalAge < pubertyAge - 2) {
		r += `${He} is too sexually immature to have armpit hair. `;
	} else if (child.underArmHStyle === "hairless") {
		r += `${His} armpits are perfectly smooth and naturally hairless. `;
	} else if (child.underArmHStyle === "bald") {
		r += `${His} armpits no longer grow hair, leaving them smooth and hairless. `;
	} else if (child.underArmHStyle === "waxed") {
		r += `${His} armpits are waxed and smooth. `;
	} else if (child.physicalAge < pubertyAge - 1) {
		r += `${He} has a few ${child.underArmHColor} wisps of armpit hair. `;
	} else if (child.physicalAge < pubertyAge) {
		r += `${He} is on the verge of puberty and has a small patch of ${child.underArmHColor} armpit hair. `;
	} else if (child.underArmHStyle === "shaved") {
		r += `${His} armpits appear hairless, but closer inspection reveals light, ${child.underArmHColor} stubble. `;
	} else if (child.underArmHStyle === "neat") {
		r += `${His} armpit hair is neatly trimmed `;
		if (!hasAnyArms(child)) {
			r += `since it is always in full view`;
		} else {
			r += ` to not be visible unless ${he} lifts ${his} arms`;
		}
		r += `. `;
	} else if (child.underArmHStyle === "bushy") {
		r += `${His} ${child.underArmHColor} armpit hair has been allowed to grow freely`;
		if (!hasAnyArms(child)) {
			r += ` creating two bushy patches under where ${his} arms used to be`;
		} else {
			r += ` and can be seen poking out from under ${his} arms at all times`;
		}
		r += `. `;
	}

	if (!child.voice) {
		r += `${He} is <span class="pink">completely silent,</span> which is understandable, since ${he}'s mute. `;
	} else {
		if (child.lips > 95) {
			r += `${He} is <span class="pink">effectively mute,</span> since ${his} lips are so large that ${he} can no longer speak intelligibly. ${He} can still `;
			if (child.devotion > 50) {
				r += `moan`;
			} else if (child.devotion > 20) {
				r += `whimper`;
			} else {
				r += `scream`;
			}
			r += ` through them, though. `;
		}
	}

	if (V.showBodyMods) {
		r += piercings.ears(child);
		r += piercings.nose(child);
		r += piercings.eyebrows(child);
		if (child.custom.tattoo !== "" && jsDef(child.custom.tattoo)) {
			r += `${child.custom.tattoo}`;
		}
	}

	r += face(child);
	r += mouth(child);

	if (V.showClothing && !V.saleDescription) {
		r += collar(child);
		if (child.relationship > 4) { // TODO: will children be able to get married?
			if (hasLeftArm(child)) {
				r += `${He} has a simple gold band on the little finger of ${his} left hand. `;
			} else if (hasRightArm(child)) {
				r += `${He} has a simple gold band on the little finger of ${his} right hand. `;
			} else {
				r += `${He} has a simple gold band on a length of chain around ${his} neck. `;
			}
		} else if (child.relationship === -3) {
			if (hasLeftArm(child)) {
				r += `${He} has a simple steel band on the little finger of ${his} left hand. `;
			} else if (hasRightArm(child)) {
				r += `${He} has a simple steel band on the little finger of ${his} right hand. `;
			} else {
				r += `${He} has a simple steel band on a length of cord around ${his} neck. `;
			}
		}
	}

	r += nails(child);
	if (V.showBodyMods) {
		r += tats.back(child);
		r += tats.shoulders(child);
		r += tats.arms(child);
	}

	if (child.minorInjury !== 0 && child.minorInjury !== "sore ass") {
		r += `${He} is sporting a <span class="red">${child.minorInjury},</span> covered by makeup. `;
	}

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	r += App.Desc.boobs(child);
	r += App.Desc.boobsExtra(child);
	if (V.showBodyMods) {
		r += tats.boobs(child);
	}
	r += App.Desc.brand(child, "chest");
	r += App.Desc.brand(child, "breast");
	r += shoulders(child);
	r += App.Desc.nipples(child);
	if (V.showBodyMods) {
		r += piercings.nipples(child);
	}
	r += App.Desc.areola(child);

	if (child.inflation > 0) {
		V.activeSlave = child;
		r += `<<BellyInflationDescription>> `; // TODO:
	} else if (child.bellyImplant >= 2000) {
		V.activeSlave = child;
		r += `<<BellyImplantDescription>> `; // TODO:
	} else {
		V.activeSlave = child;
		r += `<<BellyDescription>> `; // TODO:
	}
	r += butt(child);

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	r += crotch(child);
	r += dick(child);
	r += vagina(child);
	r += anus(child);

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	switch (child.drugs) {
		case "super fertility drugs":
			if (isFertile(child) && !child.preg) {
				r += `${He} is constantly dripping sexual fluids and ${his} breasts and belly are slightly swollen. The super fertility drugs have ${him} ready to be impregnated. `;
			}
			break;
		case "fertility drugs":
			if (isFertile(child) && !child.preg) {
				r += `${He} smells of sexual fluids and ${his} breasts are slightly swollen. The fertility drugs have ${him} ready to be impregnated. `;
			}
			break;
		case "intensive breast injections":
		case "hyper breast injections":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} tits uncomfortably` : `squirms under the unfamiliar weight on ${his} chest`}. The ${child.drugs === "hyper breast injections" ? `HA-HGH` : `A-HGH`} must be having an effect, painfully stretching ${his} breasts as the mammary and adipose tissue underneath grows explosively. `;
			break;
		case "intensive butt injections":
		case "hyper butt injections":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} butt uncomfortably` : `squirms under the unfamiliar weight on ${his} backside`}. The ${child.drugs === "hyper butt injections" ? `HA-HGH` : `A-HGH`} must be having an effect, painfully stretching ${his} buttocks as the muscular and adipose tissue underneath grows explosively. `;
			break;
		case "intensive penis enhancement":
		case "hyper penis enhancement":
			`${He} ${hasAnyArms(child) ? `massages ${his} ${child.dick > 0 ? `dick` : `clit`} uncomfortably` : `squirms under the unfamiliar weight in ${his} ${child.dick > 0 ? `dick` : `clit`}`}. The ${child.drugs === "hyper penis enhancement" ? `HA-HGH` : `A-HGH`} must be having an effect, painfully lengthening and thickening ${his} ${child.dick > 0 ? `dick` : `clit`}. `;
			break;
		case "intensive testicle enhancement":
		case "hyper testicle enhancement":
			r += `${He} ${hasAnyArms(child) ? `${He} massages ${his} balls uncomfortably` : `${He} squirms under the unfamiliar pressure in ${his} balls`} as `;
			if (child.drugs === "hyper testicle enhancement") {
				if (child.balls < 20) {
					r += ` as cum drools from the tip of ${his} dick. `;
				} else if (child.balls >= 50) {
					r += ` as a thick cascade of cum pours from the tip of ${his} cock. `;
				} else if (child.balls >= 37) {
					r += ` as cum freely flows from the tip of ${his} cock, pooling under ${him}. `;
				} else if (child.balls >= 20) {
					r += ` as precum pools under ${him}. `;
				}
				r += `The HA-HGH must be having an effect, painfully expanding ${his} testicles. `;
			} else {
				r += `a bead of cum forms on tip of ${his} dick. The A-HGH must be having an effect, painfully expanding ${his} testicles. `;
			}
			break;
		case "female hormone injections":
		case "male hormore injections":
			r += `${He} looks very ill, likely a side effect of the extreme hormone injections. `;
			break;
		case "appetite suppresors":
			r += `Despite how little ${he} has been eating lately, ${his} stomach barely growls at all. `;
			break;
		case "penis atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} dick uncomfortably` : `squirms in respose to the discomfort in ${his} dick`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} dick. `;
			break;
		case "testicle atropiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} balls uncomfortably` : `squirms in respose to the discomfort in ${his} balls`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} balls. `;
			break;
		case "clitoris atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} clit uncomfortably` : `squirms in respose to the discomfort in ${his} clit`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} clit. `;
			break;
		case "labia atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} pussy uncomfortably` : `squirms in respose to the discomfort in ${his} pussy`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} pussy. `;
			break;
		case "nipple atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} nipples uncomfortably` : `squirms in respose to the discomfort in ${his} nipples`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} nipples. `;
			break;
		case "lip atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} lips uncomfortably` : `licks ${his} lips uncomfortably`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} lips. `;
			break;
		case "breast redistributors":
		case "butt redistributors":
			r += `${He} ${hasAnyArms(child) ? `pinches at the fat building on ${his} belly and lets off a sigh` : `squirms under the added weight building on ${his} belly`}. The RDST-D must be having an effect, encouraging ${his} body to redistribute ${his} ${child.drugs === "breast redistributors" ? `breasts'` : `buttocks'`} adipose tissue to ${his} middle. `;
			break;
		case "sag-B-gone":
			r += `${His} breasts are shiny from the layer of anti-sag cream rubbed onto them. They might be a little perkier, or not. `;
			break;
	}

	if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiacs") {
		if (child.inflationType === "aphrodisiacs") {
			r += `${He}'s literally full of`;
			if (isAmputee(child)) {
				r += `aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more. `;
			} else if (child.chastityVagina) {
				r += `aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0 && child.vagina === -1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}${His} frantic masturbation forces ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft and pussy with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}${His} frantic masturbation forces ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
			} else if (child.rules.release.masturbation === 1 && child.vagina !== -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he} `;
				if (child.anus === 0) {
					r += `plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other, desperately trying to get ${himself} off. ${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
				} else {
					r += `uses `;
					if (child.anus > 2) {
						r += `${his} entire hand, formed into a beak shape,`;
					} else if (child.anus > 1) {
						r += `two fingers`;
					} else {
						r += `a finger`;
					}
					r += ` to fuck ${his} own ass. ${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
				}
			} else if (child.rules.release.masturbation === 1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} clit with one hand while ${he} fingers ${his} anus with the other. `;
			} else if (child.dick !== 0) {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} crotch, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.vagina === -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} asshole, desperately hoping you'll fuck ${his} only real source of relief. `;
			} else {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} pussy, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. `;
			}
		} else if (child.aphrodisiacs > 1) {
			r += `${He}'s swimming in`;
			if (isAmputee(child)) {
				r += `aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}. `;
			} else if (child.chastityVagina) {
				r += `aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0 && child.vagina === -1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft and pussy with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.rules.release.masturbation === 1 && child.vagina !== -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he}`;
				if (child.anus === 0) {
					r += `plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other, desperately trying to get ${himself} off. `;
				} else {
					r += `uses `;
					if (child.anus > 2) {
						r += `${his} entire hand, formed into a beak shape,`;
					} else if (child.anus > 1) {
						r += `two fingers`;
					} else {
						r += `a finger`;
					}
					r += ` to fuck ${his} own ass. `;
				}
			} else if (child.rules.release.masturbation === 1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} clit with one hand while ${he} fingers ${his} anus with the other. `;
			} else if (child.dick !== 0) {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} crotch, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.vagina === -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} asshole, desperately hoping you'll fuck ${his} only real source of relief. `;
			} else {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} pussy, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. `;
			}
		} else {
			if (isAmputee(child)) {
				r += `${He}'s on aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with sexual frustration. `;
			} else if (child.chastityVagina) {
				r += `${He}'s on aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with sexual frustration. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0 && child.vagina === -1) {
				r += `${He}'s on aphrodisiacs and is allowed to masturbate, so as ${he} obeys your commands ${he} idly rubs ${his} shaft with one hand while the other pinches a nipple. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0) {
				r += `${He}'s on aphrodisiacs and is allowed to masturbate, so as ${he} obeys your commands ${he} idly rubs ${his} shaft and pussy with one hand while the other pinches a nipple. `;
			} else if (child.rules.release.masturbation === 1) {
				r += `${He}'s on aphrodisiacs and is allowed to masturbate, so as ${he} obeys your commands ${he} idly rubs ${his} pussy with one hand while the other pinches a nipple. `;
			} else if (child.dick !== 0 && canPenetrate(child)) {
				r += `${He}'s on aphrodisiacs and is not allowed to masturbate, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably. ${His} erect dick sways as ${he} does. `;
			} else {
				r += `${He}'s on aphrodisiacs and is not allowed to masturbate, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably. `;
			}
		}
	}

	if (child.addict > 0 && child.addict < 3) {
		r += `${He} is a new <span class="cyan">aphrodisiac addict.</span> `;
	} else if (child.addict > 0 && child.addict < 10) {
		r += `${He} is a confirmed <span class="cyan">aphrodisiac addict.</span> `;
	} else if (child.addict > 0) {
		r += `${He} is completely <span class="cyan">dependent on aphrodisiacs,</span> and it is unlikely you will ever be able to wean ${him} off them. `;
	}

	V.saleDescription = 0, V.applyLaw = 0;

	return r;
};

/* UTILITY */

/**
 * Displays a list of the children in the Nursery
 * @returns {string}
 */
App.Facilities.Nursery.childList = function() {
	"use strict";
	const
		cribs = V.cribs;

	let
		r = ``;

	for (let i = 0; i < cribs.length; i++) {
		r += `<hr style="margin:0">`;
		const
			child = cribs[i],
			weeksOwned = V.week - child.weekAcquired,
			weeksLeft = (V.targetAgeNursery * 52) - weeksOwned,
			he = child.genes === "XX" ? `she` : `he`,
			him = child.genes === "XX" ? `her` : 'him',
			He = capFirstChar(he);

		if (child.actualAge < 3) {
			r += App.UI.passageLink(`${SlaveFullName(child)}`, "Infant Interact", `$activeChild = $cribs[${i}]`);	// FIXME: figure out why "V.activeChild = child" doesn't work
			r += App.Facilities.Nursery.InfantSummary(child);
		} else {
			r += App.UI.passageLink(`${SlaveFullName(child)}`, "Child Interact", `$activeChild = $cribs[${i}]`);
			r += App.Facilities.Nursery.ChildSummary(child);
		}

		if (child.actualAge >= 18) {
			V.nurseryOldID = child.ID;
			if (child.targetLocation === "freedom") {
				V.freedSlaves.push(cribs[i]);
			}
			V.readySlave = cribs.pluck([i], [i]);
			r += `<<goto "Nursery Retrieval Workaround">>`;
			return r;
		}

		if (child.growTime <= 0 || child.actualAge >= V.targetAgeNursery) {
			r += `<br>`;
			r += `${He} is ready to leave ${V.nurseryName} and ${child.targetLocation === "slavery" ? `join your ménage` : `become a free citizen`}. `;
			r += `<<link ${child.targetLocation === "slavery" ? `"Introduce ${him} to life as a slave"` : `"Set ${him} free"`} "Nursery Retrieval Workaround">>`;	// FIXME: figure out why App.UI.passageLink doesn't work here
			V.readySlave = cribs.pluck([i], [i]);
			r += `<</link>>`;
		} else {
			r += `<br>`;
			r += `${He} is to continue staying in ${V.nurseryName} for another ${years(weeksLeft)}.
				${He} is destined for ${child.targetLocation} once ${he} is of age. `;
		}
	}

	return r;
};

/**
 * Converts the infant object into a new child object
 * @param {object} child
 */
App.Facilities.Nursery.infantToChild = function infantToChild(child) {
	child.abortionTat = -1,
	child.accent = 0,
	child.addict = 0,
	child.ageImplant = 0,
	child.arm = {
		left: new App.Entity.LimbState(),
		right: new App.Entity.LimbState()
	},
	child.leg = {
		left: new App.Entity.LimbState(),
		right: new App.Entity.LimbState()
	},
	child.analArea = 0,
	child.anus = 0,
	child.anusPiercing = 0,
	child.anusTat = 0,
	child.aphrodisiacs = 0,
	child.areolae = 0,
	child.areolaePiercing = 0,
	child.areolaeShape = "circle",
	child.armAccessory = "none",
	child.armsTat = 0,
	child.attrKnown = 0,
	child.attrXX = 0,
	child.attrXY = 0,
	child.backAccessory = "none",
	child.backTat = 0,
	child.bald = 0,
	child.balls = 0,
	child.behavioralFlaw = "none",
	child.belly = 0,
	child.bellyAccessory = "none",
	child.bellyFluid = 0,
	child.bellyImplant = -1,
	child.bellyPreg = 0,
	child.bellySag = 0,
	child.bellySagPreg = 0,
	child.bellyTat = 0,
	child.bodySwap = 0,
	child.boobShape = "normal",
	child.boobs = jsRandom(200, 500),
	child.boobsImplant = 0,
	child.boobsImplantType = "none",
	child.boobsTat = 0,
	child.brand = {},
	child.breastMesh = 0,
	child.breedingMark = 0,
	child.butt = jsRandom(0, 3),
	child.buttImplant = 0,
	child.buttImplantType = "none",
	child.buttTat = 0,
	child.buttplug = "none",
	child.buttplugAttachment = "none",
	child.canRecruit = 0,
	child.chastityAnus = 0,
	child.chastityPenis = 0,
	child.chastityVagina = 0,
	child.chem = 0,
	child.childsFathered = 0,
	child.childsKnockedUp = 0,
	child.choosesOwnClothes = 0,
	child.clit = jsRandom(0, 2),
	child.clitPiercing = 0,
	child.clone = 0,
	child.clothes = "no clothing",
	child.collar = "none",
	child.corsetPiercing = 0,
	child.counter = {
		PCChildrenFathered: 0,
		PCKnockedUp: 0,
		anal: 0,
		births: 0,
		birthsTotal: 0,
		cum: 0,
		laborCount: 0,
		mammary: 0,
		milk: 0,
		oral: 0,
		penetrative: 0,
		pitKills: 0,
		publicUse: 0,
		slavesFathered: 0,
		slavesKnockedUp: 0,
		vaginal: 0
	},
	child.curatives = 0,
	child.custom = {
		desc: "",
		hairVector: "",
		image: null,
		label: "",
		tattoo: "",
		title: "",
		titleLisp: ""
	},
	child.daughters = 0,
	child.devotion = 40,	// TODO:
	child.dick = 0,
	child.dickAccessory = "none",
	child.dickPiercing = 0,
	child.dickTat = 0,
	child.diet = "healthy",
	child.dietCum = 0,
	child.dietMilk = 0,
	child.drugs = "no drugs",
	child.earImplant = 0,
	child.earPiercing = 0,
	child.earShape = "normal",
	child.earT = "none",
	child.earTColor = "hairless",
	child.earwear = "none",
	child.electrolarynx = 0,
	child.energy = 0,
	child.eyebrowFullness = "natural",
	child.eyebrowHStyle = "natural",
	child.eyebrowPiercing = 0,
	child.eye = new App.Entity.EyeState(),
	child.eyewear = "none",
	child.faceImplant = 0,
	child.fertKnown = 1,
	child.fertPeak = 0,
	child.fetishKnown = 0,
	child.fetishStrength = 0,
	child.foreskin = 0,
	child.geneMods = {
		NCS: 0,
		rapidCellGrowth: 0
	},
	child.geneticQuirks = {
		albinism: 0,
		androgyny: 0,
		dwarfism: 0,
		fertility: 0,
		gigantism: 0,
		gigantomastia: 0,
		heterochromia: 0,
		hyperFertility: 0,
		mGain: 0,
		mLoss: 0,
		macromastia: 0,
		pFace: 0,
		rearLipedema: 0,
		superfetation: 0,
		uFace: 0,
		wGain: 0,
		wLoss: 0,
		wellHung: 0
	},
	child.genetics = {},
	child.hLength = jsRandom(30, 70),
	child.hStyle = "long",
	child.haircuts = 0,
	child.headAccessory = "none",
	setHealth(child, jsRandom(80, 100), 0, 0, 0, 0);
	child.hears = 0,
	child.heels = 0,
	child.height = jsRandom(85, 105),
	child.hips = 0,
	child.hormoneBalance = 0,
	child.hormones = 0,
	child.horn = "none",
	child.hornColor = "none",
	child.induce = 0,
	child.induceLactation = 0,
	child.intelligence = 100,
	child.intelligenceImplant = 0,
	child.labia = jsRandom(0, 2),
	child.labor = 0,
	child.lactation = 0,
	child.lactationAdaptation = 0,
	child.lactationDuration = 0,
	child.rules.lactation = "none",
	child.legAccessory = "none",
	child.legsTat = 0,
	child.lips = jsRandom(10, 30),
	child.lipsImplant = 0,
	child.lipsPiercing = 0,
	child.lipsTat = 0,
	child.rules.living = "normal",
	child.makeup = 0,
	child.markings = "none",
	child.minorInjury = 0,
	child.mpreg = 0,
	child.muscles = jsRandom(-10, 10),
	child.nails = 0,
	child.navelPiercing = 0,
	child.need = 0,
	child.nipples = "cute",
	child.nipplesAccessory = "none",
	child.nipplesPiercing = 0,
	child.nosePiercing = 0,
	child.oldDevotion = 0,	// TODO:
	child.oldTrust = 0,		// TODO:
	child.onDiet = 0,
	child.origRace = child.race,
	child.eye = new App.Entity.EyeState(),
	child.eye.orig = child.eyeColor,
	child.origHColor = child.hColor,
	child.origSkin = child.skin,
	child.ovaries = child.genes === "XX" ? 1 : 0,
	child.ovaryAge = child.actualAge,
	/* eslint-disable camelcase */
	child.override_Arm_H_Color = 0,
	child.override_Brow_H_Color = 0,
	child.override_Eye_Color = 0,
	child.override_H_Color = 0,
	child.override_Pubic_H_Color = 0,
	child.override_Race = 0,
	child.override_Skin = 0,
	/* eslint-enable camelcase */
	child.physicalAge = child.actualAge,
	child.porn = new App.Entity.SlavePornPerformanceState(),
	child.pregAdaptation = 50,
	child.pregControl = "none",
	child.pregData = {
		drugsEffect: 1,
		fetusRate: [1, 1, 1, 0.64, 0.6513, 0.6459, 0.644, 0.6393, 0.58, 0.51],
		fetusSize: [1, 3, 16, 25.6, 51, 60, 67.5, 71.6, 129.5, 130],
		fetusWeek: [0, 9, 20, 20, 40, 52, 64, 80, 384, 99999],
		minLiveBirth: 32,
		normalBirth: 40,
		normalOvaMax: 1,
		normalOvaMin: 1,
		sizeType: 0,
		type: "human"
	},
	child.pregKnown = 0,
	child.pregSource = 0,
	child.pregType = 0,
	child.pregWeek = 0,
	child.premature = 0,
	child.prematureBirth = 0,
	child.prestige = 0,
	child.prostate = 0,
	child.pubertyAgeXX = 10,
	child.pubertyAgeXY = 12,
	child.pubertyXX = 1,
	child.pubicHColor = "black",
	child.pubicHStyle = "bushy",
	child.readyOva = 0,
	child.rearAccessory = "none",
	child.relationship = 0,
	child.rules.relationship = "restrictive",	// TODO:
	child.relationshipTarget = 0,
	child.rules.release = new App.Entity.ReleaseRulesState(),	// TODO:
	child.rivalry = 0,
	child.rivalryTarget = 0,
	child.rudeTitle = 0,
	child.scars = 0,
	child.scrotum = 0,
	child.shoes = "none",
	child.shoulders = 0,
	child.shouldersTat = 0,
	child.sisters = 0,
	child.skill = {
		DJ: 0,
		anal: 0,
		attendant: 0,
		bodyguard: 0,
		combat: 0,
		entertainer: 0,
		entertainment: 0,
		farmer: 0,
		headGirl: 0,
		madam: 0,
		matron: 0,
		milkmaid: 0,
		nurse: 0,
		oral: 0,
		recruiter: 0,
		servant: 0,
		stewardess: 0,
		teacher: 0,
		vaginal: 0,
		wardeness: 0,
		whore: 0,
		whoring: 8
	},
	child.smells = 0,
	child.rules.speech = "restrictive",	// TODO:
	child.stampTat = 0,
	child.rules.punishment = "situational",	// TODO:
	child.rules.reward = "situational",	// TODO:
	child.tail = "none",
	child.tailColor = "none",
	child.tailShape = "none",
	child.tastes = 0,
	child.teeth = "baby",
	child.tonguePiercing = 0,
	child.training = 0,
	child.trust = 0,	// TODO:
	child.underArmHStyle = "natural",
	child.vagina = child.genes === "XX" ? 0 : -1,
	child.vaginaLube = 0,
	child.vaginaPiercing = 0,
	child.vaginaTat = 0,
	child.vaginalAccessory = "none",
	child.vaginalAttachment = "none",
	child.vaginalAttachments = "none",
	child.vasectomy = 0,
	child.visualAge = child.actualAge,
	child.voice = 1,
	child.voiceImplant = 0,
	child.waist = 0,
	child.weeksLeft = 0,
	child.weight = jsRandom(-10, 10),
	child.womb = [],
	child.wombImplant = "none";
	generatePronouns(child);

	return child;
};

/**
 * Allows the player to name the infant
 * FIXME: Does not currently work
 * @param {object} child
 * @returns {string}
 */
App.Facilities.Nursery.nameChild = function nameChild(child) {
	const
		PC = V.PC,
		arcology = V.arcologies[0],
		girl = child.genes === "XX" ? "girl" : "boy";

	let
		r = ``,
		father = 0,
		mother = 0;

	if (child.father === -1 && child.mother === -1) {
		father = PC;
		mother = PC;
	} else {
		if (child.father === -1) {
			father = PC;
			mother = getSlave(child.mother);
		} else if (child.mother === -1) {
			father = getSlave(child.father);
			mother = PC;
		} else {
			father = getSlave(child.father);
			mother = getSlave(child.mother);
		}
	}

	function newChildName(child) {
		const
			V = State.variable;

		child.birthName = generateName(child.nationality, child.race, child.genes === "XY");

		if (child.genes === "XY" && !V.allowMaleSlaveNames && isMaleName(child.birthName, child.nationality, child.race)) {
			child.slaveName = generateName(child.nationality, child.race, false);
		} else {
			child.slaveName = child.birthName;
		}
	}

	function parentNames(parent, child) {
		const
			slaves = V.slaves;

		let
			currentSlaveNames = slaves.map(s => s.slaveName),
			continentNationality;

		child.slaveName = generateName(parent.nationality, parent.race, parent.genes === "XY", sn => !currentSlaveNames.includes(sn));

		if (!child.slaveName) {
			for (let i = 0; i < 10; i++) {
				continentNationality = hashChoice(V.nationalities);
				child.slaveName = generateName(continentNationality, child.race, child.genes === "XY", sn => !currentSlaveNames.includes(sn));
			}
		}
		if (!child.slaveName) {
			child.slaveName = generateName(parent.nationality, parent.race, parent.genes === "XY");
		}
	}

	r += `You can name the new child, if you so desire. `;

	r += `<br><<textbox "${child.slaveName}" ${child.slaveName}>>`;
	r += App.UI.passageLink("Commit name", "Nursery Workaround", `${child.birthName = child.slaveName}, ${App.UI.replace("#naming", `You instruct ${V.assistant.name} to register the new ${girl} as "${child.slaveName}" in the slave registry.`)}`);
	r += `<br>`;
	r += App.UI.passageLink(`Have your PA assign ${him} a random name`, "Nursery Workaround", `${App.UI.replace("#naming", `${newChildName(child)}<br>${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.`)}`);

	if (arcology.FSPastoralist !== "unset") {
		if (child.lactation > 0) {
			r += `<br>
			<<link "Have your PA assign ${him} a random cow name">>
			<<replace "#naming">>`;
			child.slaveName = setup.cowSlaveNames.random();
			child.birthName = child.slaveName;
			r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
			<</link>>`;
		}
	}
	if (arcology.FSChattelReligionist !== "unset") {
		r += `<br>
		<<link "Have your PA assign ${him} a random devotional name">>
			<<replace "#naming">>`;
			child.slaveName = setup.chattelReligionistSlaveNames.random();
			child.birthName = child.slaveName;
			`${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	}
	if (arcology.FSRomanRevivalist !== "unset") {
		r += `<br>
		<<link "Have your PA assign ${him} a random Roman name">>
			<<replace "#naming">>`;
			child.slaveName = setup.romanSlaveNames.random();
			child.birthName = child.slaveName;
			`${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	} else if (arcology.FSAztecRevivalist !== "unset") {
		r += `<br>
		<<link "Have your PA assign ${him} a random Aztec name">>
			<<replace "#naming">>`;
			child.slaveName = setup.aztecSlaveNames.random();
			child.birthName = child.slaveName;
			`${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	} else if (arcology.FSEgyptianRevivalist !== "unset") {
		r += `<br>
		<<link "Have your PA assign ${him} a random ancient Egyptian name">>
			<<replace "#naming">>`;
			child.slaveName = setup.ancientEgyptianSlaveNames.random();
			child.birthName = child.slaveName;
			`${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	} else if (arcology.FSEdoRevivalist !== "unset") {
		r += `<br>
		<<link "Have your PA assign ${him} a random feudal Japanese name">>
			<<replace "#naming">>`;
			child.slaveName = setup.edoSlaveNames.random();
			child.birthName = child.slaveName;
			`${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	}
	if (arcology.FSDegradationist !== "unset") {
		r += `<br>
		<<link "Have your PA assign ${him} a degrading name">>
			<<replace "#naming">>`;
			DegradingName(child);
			child.birthName = child.slaveName;
			`${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	}
	if (mother !== PC && mother !== 0) {
		App.Utils.setLocalPronouns(mother, 2);
		if (jsDef(V.Concubine) && mother.ID === V.Concubine.ID) {
			r += `<br>
			<<link "Permit your Concubine to name _his2 daughter">>
				<<replace "#naming">>`;
					parentNames(mother, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${mother.slaveName} picks a name ${he2} thinks you might find attractive; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (mother.relationship === -3 && mother.devotion >= -20) {
			r += `<br>
			<<link "Permit your wife to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(mother, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${mother.slaveName} picks a name suitable for your daughter; from now on ${he2} will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (jsDef(V.Bodyguard) && mother.ID === V.Bodyguard.ID) {
			r += `<br>
			<<link "Permit your bodyguard to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(mother, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${mother.slaveName} decides on "${child.slaveName}" for ${his2} daughter. ${He2} hopes you'll find it fitting ${his} station.
				<</replace>>
			<</link>>`;
		} else if (jsDef(V.Headgirl) && mother.ID === V.Headgirl.ID) {
			r += `<br>
			<<link "Permit your Head Girl to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(mother, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${mother.slaveName} decides on "${child.slaveName}" for ${his2} daughter, and hopes it will be a name your other slaves will learn to respect.
				<</replace>>
			<</link>>`;
		} else if (mother.devotion > 50 && mother.trust > 50) {
			r += `<br>
			<<link "Permit ${his} devoted mother to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(mother, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${mother.slaveName} picks a name ${he2} hopes you'll like; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		}
	}
	if (father !== PC && father !== 0 && father !== mother) {
		App.Utils.setLocalPronouns(father, 2);
		if (jsDef(V.Concubine) && father.ID === V.Concubine.ID) {
			r += `<br>
			<<link "Permit your Concubine to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(father, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${father.slaveName} picks a name ${he2} thinks you might find attractive; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (father.relationship === -3 && father.devotion >= -20) {
			r += `<br>
			<<link "Permit your wife to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(father, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${father.slaveName} picks a name suitable for your daughter; from now on ${he} will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (jsDef(V.Bodyguard) && father.ID === V.Bodyguard.ID) {
			r += `<br>
			<<link "Permit your bodyguard to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(father, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${father.slaveName} decides on "${child.slaveName}" for ${his2} daughter. ${He2} hopes you'll find it fitting ${his} station.
				<</replace>>
			<</link>>`;
		} else if (jsDef(V.Headgirl) && father.ID === V.Headgirl.ID) {
			r += `<br>
			<<link "Permit your Head Girl to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(father, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${father.slaveName} decides on "${child.slaveName}" for ${his2} daughter, and hopes it will be a name your other slaves will learn to respect.
				<</replace>>
			<</link>>`;
		} else if (father.devotion > 50 && father.trust > 50) {
			r += `<br>
			<<link "Permit ${his} devoted father to name ${his2} daughter">>
				<<replace "#naming">>`;
					parentNames(father, child);
					child.birthName = child.slaveName;
					`After some careful consideration, ${father.slaveName} picks a name ${he2} hopes you'll like; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		}
	}

	return r;
};

/**
 * Creates a new child object
 * @param {App.Entity.ChildState} child
 */
App.Facilities.Nursery.newChild = function newChild(child) {

	child.ID = generateSlaveID();

	child.actualAge = 0;
	child.birthWeek = 0;

	if (child.override_Race !== 1) {
		child.origRace = child.race;
	}

	if (child.override_Eye_Color !== 1) {
		resetEyeColor(child, "both");
	}
	if (child.override_H_Color !== 1) {
		child.hColor = getGeneticHairColor(child);
	}
	if (child.override_Arm_H_Color !== 1) {
		child.underArmHColor = getGeneticHairColor(child);
	}
	if (child.override_Pubic_H_Color !== 1) {
		child.pubicHColor = getGeneticHairColor(child);
	}
	if (child.override_Brow_H_Color !== 1) {
		child.eyebrowHColor = getGeneticHairColor(child);
	}
	if (child.override_Skin !== 1) {
		child.origSkin = getGeneticSkinColor(child);
	}
	/* eslint-disable camelcase*/
	child.override_Race = 0;
	child.override_H_Color = 0;
	child.override_Arm_H_Color = 0;
	child.override_Pubic_H_Color = 0;
	child.override_Brow_H_Color = 0;
	child.override_Skin = 0;
	child.override_Eye_Color = 0;
	/* eslint-enable */

	child.arm = {
		left: new App.Entity.LimbState(),
		right: new App.Entity.LimbState()
	};
	child.leg = {
		left: new App.Entity.LimbState(),
		right: new App.Entity.LimbState()
	};

	if (V.surnamesForbidden === 1) {
		child.childSurname = 0;
	}

	if (child.clone !== 0) {
		child.canRecruit = 0;
	}
	generatePronouns(child);
	child.origin = `$He was born and raised in your arcology. `;
	child.targetLocation = "slavery";
	child.growTime = V.targetAgeNursery * 52;
	V.cribs.push(child);
	V.nurseryBabies++;
};

/**
 * @param {App.Entity.ChildState[]} [cribs]
 * @returns {Object.<number, number>}
 */
App.Facilities.Nursery.cribsToIndices = function cribsToIndices(cribs = State.variables.cribs) {
	return cribs.reduce((acc, child, i) => { acc[child.ID] = i; return acc; }, {});
};

/**
 * Returns index in the children array for the given ID
 * @param {number} ID child's ID
 * @returns {number}
 */
App.Facilities.Nursery.childIndexForID = function childIndexForID(id) {
	return State.variables.cribsIndices[id];
};

/**
 * Removes the child using the child's ID
 * @param {number} index
 * @returns {Array}
 */
App.Facilities.Nursery.removeChild = function removeChild(index) {
	return State.variables.cribs.deleteAt(index);
};

/**
 * Displays a list of slaves with children eligible for the Nursery
 * FIXME: Does not currently work
 * @returns {string}
 */
App.Facilities.Nursery.nurserySort = function nurserySort() {
	"use strict";
	const
		PC = V.PC,
		SL = V.slaves.length,
		arcology = V.arcologies[0];

	let
		r = ``,
		eligibility = 0,
		sortNurseryList = V.sortNurseryList || "Unsorted",
		childrenReservedNursery = false,	// TODO: rename this to avoid confusion
		reservedChildrenNursery = FetusGlobalReserveCount("nursery");

		r += `<br><i>Sorting:</i> <b><span id="qlNurserySort">${sortNurseryList}</span>.</b> `;
		r += `${App.UI.passageLink("Sort by Name", "Nursery", `${sortNurseryList = "Name"}, ${App.UI.replace(`#qlNurserySort`, sortNurseryList)}, ${byName()}`)} | `;
		r += `${App.UI.passageLink("Sort by Reserved Nursery Spots", "Nursery", `${sortNurseryList = "Reserved Nursery Spots"}, ${App.UI.replace(`#qlNurserySort`), sortNurseryList}, ${byReservedSpots()}`)} | `;
		r += `${App.UI.passageLink("Sort by Pregnancy Week", "Nursery", `${sortNurseryList = "Pregnancy Week"}, ${App.UI.replace(`#qlNurserySort`, sortNurseryList)}, ${byPregnancyWeek()}`)} | `;
		r += `${App.UI.passageLink("Sort by Number of Children", "Nursery", `${sortNurseryList = "Number of Children"}, ${App.UI.replace(`#qlNurserySort`, sortNurseryList)}, ${byPregnancyCount()}`)}`;
		r += `<br>`;

		r += `<div id="qlNursery">`;

		for (let i = 0; i < SL; i++) {
			const slave = V.slaves[i];

			App.Utils.setLocalPronouns(slave);

			if (slave.preg > 0 && !slave.broodmother && slave.pregKnown && slave.eggType === "human") {
				if (slave.assignment !== "work in the dairy" && V.dairyPregSetting <= 0) {
					const
						slaveID = "slave-" + slave.ID,
						WL = slave.womb.length,
						reservedNursery = WombReserveCount(slave, "nursery"),
						reservedIncubator = WombReserveCount(slave, "incubator"),
						pregWeek = slave.pregWeek,
						slaveName = SlaveFullName(slave);

					r += `<div class="possible" @id="${slaveID}" @data-preg-count="${WL}" @data-reserved-spots="${reservedNursery}" @data-preg-week="${pregWeek}" @data-name="${slaveName}">`;

					r += `${App.UI.passageLink(`${slaveName}`, "Long Slave Description", `${V.activeSlave = slave}, ${V.nextLink = passage()}`)} is ${pregWeek} weeks pregnant with `;

					switch (slave.pregSource) {
						case 0:
							r += `someone's${slave.preg <= 5 ? `, though it is too early to tell whose,` : ``}`;
							break;
						case -1:
							r += `your`;
							break;
						case -2:
							r += `a citizen's`;
							break;
						case -3:
							r += `your Master's`;
							break;
						case -4:
							r += `another arcology owner's`;
							break;
						case -5:
							r += `your client's`;
							break;
						case -6:
							r += `the Societal Elite's`;
							break;
						case -7:
							r += `the lab's`;
							break;
						case -9:
							r += `the Futanari Sister's`;
							break;
						default:
							if (slave.preg <= 5) {
								r += `someone's, though it is too early to tell whose,`;
							} else {
								let t = V.slaveIndices[slave.pregSource];
								if (jsDef(t)) {
									r += `${V.slaves[t].slaveName}'s`;
								}
							}
							break;
					}
					r += ` ${WL > 1 ? `babies` : `baby`}. `;

					if (reservedNursery > 0) {
						childrenReservedNursery = true;
						if (WL === 1) {
							r += `${His} child will be placed in ${V.nurseryName}. `;
						} else if (reservedNursery < WL) {
							r += `${reservedNursery} of ${his} children will be placed in ${V.nurseryName}. `;
						} else if (WL === 2) {
							r += `Both of ${his} children will be placed in ${V.nurseryName}. `;
						} else {
							r += `All ${reservedNursery} of ${his} children will be placed in ${V.nurseryName}. `;
						}

						if ((reservedIncubator + reservedNursery < WL) && (reservedChildrenNursery < V.freeCribs)) {
							r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
							r += App.UI.passageLink("Keep another child", "Nursery", `${WombAddToGenericReserve(slave, "nursery", 1)}`);
							if (reservedNursery > 0) {
								r += ` | ${App.UI.passageLink("Keep one less child", "Nursery", `${WombCleanGenericReserve(slave, "nursery", 1)}`)}`;
							}
							if (reservedNursery > 1) {
								r += ` | ${App.UI.passageLink(`Keep none of ${his} children`, "Nursery", `${WombCleanGenericReserve(slave, "nursery", 9999)}`)}`;
							}
							if (reservedChildrenNursery + WL - reservedNursery <= V.freeCribs) {
								r += ` | ${App.UI.passageLink(`Keep the rest of ${his} children`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 9999)}`)}`;
							}
						} else if (reservedNursery === WL || reservedChildrenNursery === V.freeCribs || reservedIncubator + reservedNursery === WL) {
							r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
							r += App.UI.passageLink("Keep one less child", "Nursery", `${WombCleanGenericReserve(slave, "nursery", 1)}`);
							if (reservedNursery > 1) {
								r += ` | ${App.UI.passageLink(`Keep none of ${his} children`, "Nursery", `${WombCleanGenericReserve(slave, "nursery", 9999)}`)}`;
							}
						}
					} else if (reservedChildrenNursery < V.freeCribs && V.freeCribs > WL) {
						if (WL - reservedIncubator === 0) {
							r += `<i>${His} children are already reserved for ${V.incubatorName}</i>`;
							r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
							r += App.UI.passageLink(`Keep ${his} child${WL > 1 ? `ren` : ``} here instead`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 1)}`);
						} else {
							r += `You have ${V.freeCribs === 1 ? `an ` : ``}<span class="lime">available room${V.freeCribs > 1 ? `s` : ``}.</span> `;
							r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
							r += App.UI.passageLink(`Keep ${WL > 1 ? `a` : `the`} child`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 1)}`);
							if (WL > 1 && (reservedChildrenNursery + WL - reservedNursery <= V.freeCribs)) {
								r += ` | ${App.UI.passageLink(`Keep all of ${his} children`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 9999)}`)}`;
							}
						}
					} else if (reservedChildrenNursery === V.freeCribs) {
						r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
						r += `You have <span class="red">no room for ${his} offspring.</span> `;
					}

					eligibility = 1;
					r += `</div>`;
				}
			}
		}

		r += `</div>`;

		$('div#qlNursery').ready(byPreviousSort);

		if (!eligibility) {
			r += `<br>`;
			r += `<i>You have no pregnant slave bearing eligile children</i>`;
		}

		if (PC.pregKnown && (arcology.FSRestart === "unset" || V.eugenicsFullControl || (PC.pregSource !== -1 && PC.pregSource !== -6))) {
			const
				WL = PC.womb.length;

			let
				reservedIncubator = WombReserveCount(PC, "incubator"),
				reservedNursery = WombReserveCount(PC, "nursery");

			r += `<br><b><span class="pink">You're pregnant</span></b> and going to have ${WL === 1 ? `a baby. ` : pregNumberName(WL, 1)} `;

			if (reservedNursery > 0) {
				childrenReservedNursery = 1;
				if (WL === 1) {
					r += `Your child will be placed in ${V.nurseryName}.`;
				} else if (reservedNursery < WL) {
					r += `${reservedNursery} of your children will be placed in ${V.nurseryName}.`;
				} else if (WL === 2) {
					r += `Both of your children will be placed in ${V.nurseryName}.`;
				} else {
					r += `All ${reservedNursery} of your children will be placed in ${V.nurseryName}.`;
				}

				if (reservedNursery < WL && reservedChildrenNursery < V.freeCribs && reservedNursery - reservedIncubator > 0) {
					r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
					r += App.UI.passageLink("Keep another child", "Nursery", `${reservedNursery += 1}, ${reservedChildrenNursery += 1}`);
					if (reservedNursery > 0) {
						r += ` | ${App.UI.passageLink("Keep one less child", "Nursery", `${reservedNursery -= 1}, ${reservedChildrenNursery -= 1}`)}`;
					}

					if (reservedNursery > 1) {
						r += ` | ${App.UI.passageLink("Keep none of your children", "Nursery", `${reservedChildrenNursery -= reservedNursery}, ${reservedChildrenNursery = 0}`)}`;
					}

					if (reservedChildrenNursery + WL - reservedNursery <= V.freeCribs) {
						r += ` | ${App.UI.passageLink("Keep the rest of your children", "Nursery", `${reservedChildrenNursery += (WL - reservedNursery)}, ${reservedNursery += (WL - reservedNursery)}`)}`;
					}
				} else if (reservedNursery === WL || reservedChildrenNursery === V.freeCribs || reservedNursery - reservedIncubator >= 0) {
					r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
					r += App.UI.passageLink("Keep one less child", "Nursery", `${reservedNursery -= 1}, ${reservedChildrenNursery -= 1}`);
					if (reservedNursery > 1) {
						r += App.UI.passageLink("Keep none of your children", "Nursery", `${reservedChildrenNursery -= reservedNursery}, ${reservedNursery = 0}`);
					}
				}
			} else if (reservedChildrenNursery < V.freeCribs) {
				if (WL - reservedIncubator === 0) {
					r += `<i>Your child${WL > 1 ? `ren are` : ` is`} already reserved for ${V.incubatorName}</i>`;
					r += App.UI.passageLink(`Keep your child${WL > 1 ? `ren` : ``} here instead`, "Nursery", `${reservedNursery += WL}, ${reservedIncubator = 0}`);
				} else {
					r += `You have ${V.freeCribs === 1 ? `an ` : ``}<span class="lime">available room${V.freeCribs > 1 ? `s` : ``}. `;
					r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
					r += App.UI.passageLink(`Keep ${WL > 1 ? `a` : `your`} child`, "Nursery", `${reservedNursery += 1}, ${reservedChildrenNursery += 1}`);
					if (WL > 1 && (reservedChildrenNursery + WL - reservedNursery <= V.freeCribs)) {
						r += ` | ${App.UI.passageLink("Keep all of your children", "Nursery", `${reservedChildrenNursery += WL}, ${reservedNursery += WL}`)}`;
					}
				}
			} else if (reservedChildrenNursery === V.freeCribs) {
				r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
				r += `You have <span class="red">no room for your offspring.</span> `;
			}
		}

		if (reservedChildrenNursery || childrenReservedNursery) {
			r += `<br>`;
			r += App.UI.passageLink("Clear all reserved children", "Nursery", `${V.slaves.forEach(WombCleanGenericReserve(slave, "nursery", 9999))}, ${WombCleanGenericReserve(PC, "nursery", 9999)}`);
		}

		function byName() {
			let sortedNurseryPossibles = $('#qlNursery div.possible').detach();
			sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-name');
			$(sortedNurseryPossibles).appendTo($('#qlNursery'));
		}

		function byReservedSpots() {
			let sortedNurseryPossibles = $('#qlNursery div.possible').detach();
			sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-reserved-spots');
			$(sortedNurseryPossibles).appendTo($('#qlNursery'));
		}

		function byPregnancyWeek() {
			let sortedNurseryPossibles = $('#qlNursery div.possible').detach();
			sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-preg-week');
			$(sortedNurseryPossibles).appendTo($('#qlNursery'));
		}

		function byPregnancyCount() {
			let sortedNurseryPossibles = $('#qlNursery div.possible').detach();
			sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-preg-count');
			$(sortedNurseryPossibles).appendTo($('#qlNursery'));
		}

		function byPreviousSort() {
			let sort = State.variables.sortNurseryList;
			if (sort !== 'unsorted') {
				if (sort === 'Name') {
					sortNurseryPossiblesByName();
				} else if (sort === 'Reserved Nursery Spots') {
					sortNurseryPossiblesByReservedSpots();
				} else if (sort === 'Pregnancy Week') {
					sortNurseryPossiblesByPregnancyWeek();
				} else if (sort === 'Number of Children') {
					sortNurseryPossiblesByPregnancyCount();
				}
			}
		}

	return r;
};

/* CLASSES */

/**
 * Contains a list of the properties the infant object has
 * May need another look-over
 */
App.Facilities.Nursery.InfantState = class InfantState {
	constructor() {
		/** Child's current name */
		this.slaveName = "blank";
		/** Child's current surname
		 * @type {string|number} */
		this.slaveSurname = 0;
		this.genes = "XX";
		this.pronoun = App.Data.Pronouns.Kind.female;
		/** game week child was acquired.
		 *
		 * _0: Obtained prior to game start / at game start_ */
		this.weekAcquired = 0;
		this.father = 0;
		this.mother = 0;
		this.daughters = 0;
		this.sisters = 0;
		/** week she was born (int between 0-51) */
		this.birthWeek = jsRandom(0, 51);
		/** How old she really is. */
		this.actualAge = 18;
		/** child's race */
		this.race = "white";
		/**
		 * child markings
		 * * "beauty mark"
		 * * "birthmark"
		 * * "freckles"
		 * * "heavily freckled"
		 */
		this.markings = "none";
		/** eye color */
		this.eyeColor = "brown";
		/** hair color */
		this.hColor = "brown";
		/** pubic hair color */
		this.pubicHColor = "brown";
		/** armpit hair style */
		this.underArmHColor = "brown";
		/** eyebrowHColor*/
		this.eyebrowHColor = "brown";
		/** skin color */
		this.skin = "light";
		/** pubic hair style */
		this.pubicHStyle = "neat";
		/** armpit hair style */
		this.underArmHStyle = "neat";
		/**
		 * face attractiveness
		 *
		 * * -96 - : very ugly
		 * * -95 - -41: ugly
		 * * -40 - -11: unattractive
		 * * -10 - 10: attractive
		 * * 11 - 40: very pretty
		 * * 41 - 95: gorgeous
		 * * 96+: mind blowing
		 */
		this.face = 0;
		/**
		 * accepts string (will be treated as "normal")
		 * * "normal"
		 * * "masculine"
		 * * "androgynous"
		 * * "cute"
		 * * "sensual"
		 * * "exotic"
		 */
		this.faceShape = "normal";
		/**
		 * child intelligence
		 * * -100 - -96: borderline retarded
		 * * -95 - -51: very slow
		 * * -50 - -16: slow
		 * * -15 - 15: average
		 * * 16 - 50: smart
		 * * 51 - 95: very smart
		 * * 96 - 100: brilliant
		 */
		this.intelligence = 0;
		/**
		 * * "none"
		 * * "mindbroken"
		 * * "submissive"
		 * * "cumslut"
		 * * "humiliation"
		 * * "buttslut"
		 * * "boobs"
		 * * "sadist"
		 * * "masochist"
		 * * "dom"
		 * * "pregnancy"
		 */
		this.fetish = "none";
		/**
		 * * "none"
		 * * "arrogant": clings to her dignity, thinks slavery is beneath her
		 * * "bitchy": can 't keep her opinions to herself
		 * * "odd": says and does odd things
		 * * "hates men": hates men
		 * * "hates women": hates women
		 * * "gluttonous": likes eating, gains weight
		 * * "anorexic": dislikes eating and being forced to eat, loses weight
		 * * "devout": resistance through religious faith
		 * * "liberated": believes slavery is wrong
		 */
		this.behavioralFlaw = "none";
		/**
		 * * "none"
		 * * "hates oral": hates oral sex
		 * * "hates anal": hates anal sex
		 * * "hates penetration": dislikes penetrative sex
		 * * "shamefast": nervous when naked
		 * * "idealistic": believes sex should be based on love and consent
		 * * "repressed": dislikes sex
		 * * "apathetic": inert during sex
		 * * "crude": sexually crude and has little sense of what partners find disgusting during sex
		 * * "judgemental": sexually judgemental and often judges her sexual partners' performance
		 * * "neglectful": disregards herself in sex
		 * * "cum addict": addicted to cum
		 * * "anal addict": addicted to anal
		 * * "attention whore": addicted to being the center of attention
		 * * "breast growth": addicted to her own breasts
		 * * "abusive": sexually abusive
		 * * "malicious": loves causing pain and suffering
		 * * "self hating": hates herself
		 * * "breeder": addicted to being pregnant
		 */
		this.sexualFlaw = "none";
		/** 0: does not have; 1: carrier; 2: active
		 * * heterochromia is an exception. String = active
		 */
		this.geneticQuirks = {
			/** Oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced. */
			macromastia: 0,
			/** Greatly oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced.
			 *
			 * **macromastia + gigantomastia** - Breasts never stop growing. Increased growth rate, no shrink rate. */
			gigantomastia: 0,
			/** is prone to having twins, shorter pregnancy recovery rate */
			fertility: 0,
			/** is prone to having multiples, even shorter pregnancy recovery rate
			 *
			 * **fertility + hyperFertility** - will have multiples, even shorter pregnancy recovery rate */
			hyperFertility: 0,
			/** pregnancy does not block ovulation, child can become pregnant even while pregnant */
			superfetation: 0,
			/** is abnormally tall. gigantism + dwarfism - is very average*/
			gigantism: 0,
			/** is abnormally short. gigantism + dwarfism - is very average*/
			dwarfism: 0,
			/** has a flawless face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			pFace: 0,
			/** has a hideous face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			uFace: 0,
			/** has pale skin, white hair and red eyes */
			albinism: 0,
			/** may have mismatched eyes */
			heterochromia: 0,
			/** ass never stops growing. Increased growth rate, reduced shrink rate. */
			rearLipedema: 0,
			/** has (or will have) a huge dong */
			wellHung: 0,
			/** constantly gains weight unless dieting, easier to gain weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wGain: 0,
			/** constantly loses weight unless gaining, easier to lose weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wLoss: 0,
			/** body attempts to normalize to an androgynous state */
			androgyny: 0,
			/** child can only ever birth girls */
			girlsOnly: 0
		};
		/** how many weeks until the child is ready for release */
		this.growTime = 156;
	}
};

/**
 * Contains a list of properties the child object has
 * Will need to be pared down
 */
App.Facilities.Nursery.ChildState = class ChildState {
	constructor() {
		/** Child's current name */
		this.slaveName = "blank";
		/** Child's current surname
		 * @type {string|number} */
		this.slaveSurname = 0;
		/** Child's original name */
		this.birthName = "blank";
		/** Child's original surname
		* @type {string|number} */
		this.birthSurname = 0;
		/** Slave sex ("XX", "XY") */
		this.genes = "XX";
		/** @type {number} */
		this.pronoun = App.Data.Pronouns.Kind.female;
		/** Game week slave was acquired.
		*
		* _0: Obtained prior to game start / at game start_ */
		this.weekAcquired = 0;
		/** Child's origin
		* @type {string|number} */
		this.origin = "$He was born and raised in your arcology.";
		/** Career prior to enslavement
		* @type {string|number} */
		this.career = 0;
		/** Child's ID */
		this.ID = 0;
		/** Relation to relationTarget
		* @type {string|number} */
		this.relation = 0;
		/** Target of relation (ID) */
		this.relationTarget = 0;
		/**
		 * TODO:
		 *  Child's relationship
		 * * -3: married to you
		 * * -2: emotionally bound to you
		 * * -1: emotional slut
		 * * 0: none
		 * * 1: friends with relationshipTarget
		 * * 2: best friends with relationshipTarget
		 * * 3: friends with benefits with relationshipTarget
		 * * 4: lover with relationshipTarget
		 * * 5: relationshipTarget 's slave wife
		 */
		this.relationship = 0;
		/** Target of relationship (ID) */
		this.relationshipTarget = 0;
		/**
		* Child's rivalry
		* * 0: none
		* * 1: dislikes rivalryTarget
		* * 2: rival of rivalryTarget
		* * 3: bitterly hates rivalryTarget
		*/
		this.rivalry = 0;
		/** Target of rival (ID) */
		this.rivalryTarget = 0;
		/** Slave will serve subTarget (ID) */
		this.subTarget = 0;
		this.father = 0;
		this.mother = 0;
		this.daughters = 0;
		this.sisters = 0;
		this.canRecruit = 0;
		/**
		* can slave choose own assignment
		*
		* 0: no; 1: yes */
		this.choosesOwnAssignment = 0;
		/** Child's assignment
		 * TODO:
		*/
		this.assignment = "rest";
		/** How far along slave is with being trained (skills, flaws, quirks)
		 * TODO:
		*/
		this.training = 0;
		/** Week she was born (int between 0-51) */
		this.birthWeek = jsRandom(0, 51);
		/** How old she really is. */
		this.actualAge = 18;
		/** How old her body looks. */
		this.visualAge = 18;
		/** How old her body is. */
		this.physicalAge = 18;
		/** How old her ovaries are. (used to trick menopause) */
		this.ovaryAge = 18;
		/** Has had facial surgery to reduce age. 0: no, 1: yes */
		this.ageImplant = 0;
		this.health = {
			/**
			* Child's health
			* * -90 - : On the edge of death
			* * -90 - -51: Extremely unhealthy
			* * -50 - -21: Unhealthy
			* * -20 -  20: Healthy
			* * 21  -  50: Very healthy
			* * 50  -  90: Extremely healthy
			* * 90  -  : Unnaturally healthy
			*/
			condition: 0,
			/** Child's short term health damage */
			shortDamage: 0,
			/** Child's long term health damage */
			longDamage: 0,
			/**
			* Child's current illness status
			* * 0 : Not ill
			* * 1 : A little under the weather
			* * 2 : Minor illness
			* * 3 : Ill
			* * 4 : serious illness
			* * 5 : dangerous illness
			*/
			illness: 0,
			/**
			* Child's current level of exhaustion
			* * 0  - 50 : Perfectly fine
			* * 50 - 80 : tired
			* * 80 - 100 : exhausted
			*/
			tired: 0,
			/** Child's combined health (condition - short - long) */
			health: 0
		}
		/**
		* slave has a minor injury ("black eye", "bruise", "split lip")
		* @type {number | string}
		*/
		this.minorInjury = 0;
		/**
		* slave 's trust.
		* * -96-: abjectly terrified
		* * -95 - -51: terrified
		* * -50 - -21: frightened
		* * -20 - 20: fearful
		* * 21 - 50: careful
		* * 51 - 95: trusting
		* * 96+: profoundly trusting
		*/
		this.trust = 0;
		/** Used to calculate trust loss/gain */
		this.oldTrust = 0;
		/**
		* slave 's devotion
		* * -96 - : hate-filled
		* * -95 - -51: hateful
		* * -50 - -21: reluctant
		* * -20 - 20: careful
		* * 21 - 50: accepting
		* * 51 - 95: devoted
		* * 96+: worshipful */
		this.devotion = 0;
		/** Used to calculate devotion loss/gain */
		this.oldDevotion = 0;
		/**
			* slave 's weight
			* * 191+: dangerously obese
			* * 190 - 161: super obese
			* * 160 - 131: obese
			* * 130 - 96: fat
			* * 95 - 31: overweight
			* * 30 - 11: curvy
			* * 10 - -10: neither too fat nor too skinny
			* * -11 - -30: thin
			* * -31 - -95: very thin
			* * -96 - : emaciated
			*/
		this.weight = 0;
		/**
		* slave 's muscles
		* * 96+ : extremely muscular
		* * 31 - 95: muscular
		* * 6 - 30: toned
		* * -5 - 5: none
		* * -30 - -6: weak
		* * -95 - -31: very weak
		* * -96- : frail
		*/
		this.muscles = 0;
		/**
		* Child's height in cm
		* * < 150: petite
		* * 150 - 159: short
		* * 160 - 169: average
		* * 170 - 185: tall
		* * 186+ : very tall
		*/
		this.height = 170;
		/** Slave has height implant
		* -1: -10 cm, 0: none, 1: +10 cm */
		this.heightImplant = 0;
		/** Child's nationality */
		this.nationality = "slave";
		/** Child's race */
		this.race = "white";
		/** Child's original race */
		this.origRace = "white";
		/**
		* slave markings
		* * "beauty mark"
		* * "birthmark"
		* * "freckles"
		* * "heavily freckled"
		*/
		this.markings = "none";
		/**
		 * Eyes of the slave.
		 * @type {App.Entity.EyeState}
		 */
		this.eye = new App.Entity.EyeState();
		/** "none", "glasses", "blurring glasses", "corrective glasses", "blurring contacts", "corrective contacts" */
		this.eyewear = "none";
		/** Slave hearing
		*
		* -2: deaf; -1: hard of hearing; 0: normal */
		this.hears = 0;
		/** "none", "hearing aids", "muffling ear plugs", "deafening ear plugs" */
		this.earwear = "none";
		/** Is there an inner ear implant device
		* 0: no; 1: yes */
		this.earImplant = 0;
		/** The shape of their outer ears
			* "none", "damaged", "normal", "pointy", "elven", "ushi" */
		this.earShape = "normal";
		/** Type of kemonomimi ears if any
			* "neko", "inu", "kit", "tanuki" */
		this.earT = "none";
		/** Kemonomimi ear color
			* "hairless" */
		this.earTColor = "hairless";
		/** Sense of smell
		0 - yes, -1 - no */
		this.smells = 0;
		/** Sense of taste
		0 - yes, -1 - no */
		this.tastes = 0;
		/** Horn type if any
			* "none", "curved succubus horns", "backswept horns", "cow horns", "one long oni horn", "two long oni horns", "small horns" */
		this.horn = "none";
		/** Horn color */
		this.hornColor = "none";
		/** Type of tail installed
			* "none", "mod", "combat", "sex"*/
		this.tail = "none";
		/**
			* Does she have a tail interface installed
			* * 0: no
			* * 1: yes
			*/
		this.PTail = 0;
		/** The current shape of their modular tail
			* "none", "neko", "inu", "kit", "kitsune", "tanuki", "ushi" */
		this.tailShape = "none";
		/** Tail color */
		this.tailColor = "none";
		/** Child's original hair color, defaults to their initial hair color. */
		this.origHColor = "brown";
		/** Hair color */
		this.hColor = "brown";
		/** Pubic hair color */
		this.pubicHColor = "brown";
		/** Armpit hair style */
		this.underArmHColor = "brown";
		/** eyebrowHColor*/
		this.eyebrowHColor = "brown";
		/** Child's original skin color. */
		this.origSkin = "light";
		/** Skin color */
		this.skin = "light";
		/**
		* hair length
		* * 150: calf-length
		* * 149-100: ass-length
		* * 99-30: long
		* * 29-10: shoulder-length
		* * 9-0: short
		*/
		this.hLength = 60;
		/**
		* eyebrow thickness
		* * "pencil-thin"
		* * "thin"
		* * "threaded"
		* * "natural"
		* * "tapered"
		* * "thick"
		* * "bushy"
		*/
		this.eyebrowFullness = "natural";
		/** Hair style */
		this.hStyle = "short";
		/** Pubic hair style */
		this.pubicHStyle = "neat";
		/** Armpit hair style */
		this.underArmHStyle = "neat";
		/** EyebrowHStyle */
		this.eyebrowHStyle = "natural";
		/**
		* slave waist
		* * 96+: masculine
		* * 95 - 41: ugly
		* * 40 - 11: unattractive
		* * 10 - -10: average
		* * -11 - -40: feminine
		* * -40 - -95: hourglass
		* * -96-: absurd
		*/
		this.waist = 0;
		/** Series of rings up the back that can be tied together. 0: no, 1: yes */
		this.corsetPiercing = 0;
		/**
			* What level of prosthetic interface she has installed
			* * 0: no interface
			* * 1: basic interface
			* * 2: advanced interface
			*/
		this.PLimb = 0;
		/*
		 * legs of the slave
		 * * type:0: no leg
		 * * type:1: has leg
		 * * 2: simple prosthetic
		 * * 3: artificial leg - Sex
		 * * 4: artificial leg - Beauty
		 * * 5: artificial leg - Combat
		 * * 6: swiss army leg
		 */
		this.leg = {
			left: new App.Entity.LimbState(),
			right: new App.Entity.LimbState()
		};
		/**
		 * arms of the slave
		 * * type:0: no arm
		 * * type:1: has arm
		 * * 2: simple prosthetic
		 * * 3: artificial arm - Sex
		 * * 4: artificial arm - Beauty
		 * * 5: artificial arm - Combat
		 * * 6: swiss army arm
		 */
		this.arm = {
			left: new App.Entity.LimbState(),
			right: new App.Entity.LimbState()
		};
		/** Are heels clipped
		*
		* 0: no, 1: yes */
		this.heels = 0;
		/** Slave voice
		*
		* 0: mute, 1: deep, 2: feminine, 3: high, girly */
		this.voice = 2;
		/** Has voice implant
		*
		* 0: no; 1: yes, high; -1: yes, low */
		this.voiceImplant = 0;
		/** Has cybernetic voicebox
		*
		* 0: no; 1: yes */
		this.electrolarynx = 0;
		/**
		* slave accent
		* * 0: none
		* * 1: attractive
		* * 2: heavy
		* * 3: does not speak language
		*/
		this.accent = 0;
		/**
		* shoulder width
		* * -2: very narrow
		* * -1: narrow
		* * 0: feminine
		* * 1: broad
		* * 2: very broad
		*/
		this.shoulders = 0;
		/**
		* has shoulder implant
		*
		* * -1: shoulders -1
		* * 0: none
		* * 1: shoulders +1
		*/
		this.shouldersImplant = 0;
		/**
			*  slave boob size (in cc)
			* * 0-299	- flat;
			* * 300-399   - A-cup;
			* * 400-499   - B-cup
			* * 500-649   - C-cup
			* * 650-799   - D-cup
			* * 800-999   - DD-cup
			* * 1000-1199 - F-cup
			* * 1200-1399 - G-cup
			* * 1400-1599 - H-cup
			* * 1600-1799 - I-cup
			* * 1800-2049 - J-cup
			* * 2050-2299 - K-cup
			* * 2300-2599 - L-cup
			* * 2600-2899 - M-cup
			* * 2900-3249 - N-cup
			* * 3250-3599 - O-cup
			* * 3600-3949 - P-cup
			* * 3950-4299 - Q-cup
			* * 4300-4699 - R-cup
			* * 4700-5099 - S-cup
			* * 5100-5499 - T-cup
			* * 5500-6499 - U-cup
			* * 6500-6999 - V-cup
			* * 7000-7499 - X-cup
			* * 7500-7999 - Y-cup
			* * 8000-8499 - Z-cup
			* * 8500-14999 - obscenely massive
			* * 15000-24999 - arm filling
			* * 25000-39999 - figure dominating
			* * 40000-54999 - beanbag sized
			* * 55000-69999 - door jamming
			* * 70000-89999 - hall clearing
			* * 90000-100000 - hall jamming
			*/
		this.boobs = 0;
		/** Breast engorgement from unmilked tits */
		this.boobsMilk = 0;
		/**
		*  slave implant size
		* * 0: no implants;
		* * 1-199: small implants;
		* * 200-399: normal implants;
		* * 400-599: large implants;
		* * 600+: boobsImplant size fillable implants
		*/
		this.boobsImplant = 0;
		/**
		 * Implant type
		 * * "none"
		 * * "normal"
		 * * "string"
		 * * "fillable"
		 * * "advanced fillable"
		 * * "hyper fillable"
		 */
		this.boobsImplantType = "none";
		/**
		* breast shape
		* * "normal"
		* * "perky"
		* * "saggy"
		* * "torpedo-shaped"
		* * "downward-facing"
		* * "wide-set"
		*/
		this.boobShape = "normal";
		/**
		* nipple shape
		* * "huge"
		* * "puffy"
		* * "inverted"
		* * "tiny"
		* * "cute"
		* * "partially inverted"
		* * "fuckable"
		*/
		this.nipples = "cute";
		/**
		* nipple are pierced
		* @default 0
		* 0: none; 1: yes; 2: heavily */
		this.nipplesPiercing = 0;
		/** What accessory, if any, or on her nipples */
		this.nipplesAccessory = "none";
		/** Slave areolae
			*
			* 0: normal; 1: large; 2: unusually wide; 3: huge, 4: massive */
		this.areolae = 0;
		/** Edge of areolae are pierced
		* @default 0
		* 0: none; 1: yes; 2: heavy */
		this.areolaePiercing = 0;
		/** Slave areolae shape ("heart"; "star"; "circle") */
		this.areolaeShape = "circle";
		/**
		* boobs tattoo
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string | number}
		*/
		this.boobsTat = 0;
		/** Slave lactation
		*
		* 0: none; 1: natural; 2: implant */
		this.lactation = 0;
		/** How many more weeks until lactation dries up
		*
		* usually 2 as interactions and lact. implant reset it to 2 */
		this.lactationDuration = 0;
		/**
		* odds of inducing lactation
		*
		* begins trying on breast play if over 10 */
		this.induceLactation = 0;
		/** 0: 10: not used to producing milk(no bonuses);
		* 11: 50: used to producing milk;
		* 51: 100: heavily adapted to producing milk(big bonus) */
		this.lactationAdaptation = 0;
		/**
		*  hip size
		* * -2: very narrow
		* * -1: narrow
		* * 0: normal
		* * 1: wide hips
		* * 2: very wide hips
		* * 3: inhumanly wide hips
		*/
		this.hips = 0;
		/** Slave has hip implant
		*
		* -1: hips -1; 0: none; 1: hips +1 */
		this.hipsImplant = 0;
		/**
		*  butt size
		* * 0	: flat
		* * 1	: small
		* * 2   : plump *
		* * 3	: big bubble butt
		* * 4	: huge
		* * 5	: enormous
		* * 6	: gigantic
		* * 7	: ridiculous
		* * 8 - 10: immense
		* * 11 - 20: inhuman
		*
		* _* Descriptions vary for just how big 2 is, as such, it may be better to just go with 3_
		*/
		this.butt = 0;
		/**
		* butt implant type and size
		*
		* * 0: none
		* * 1: butt implant
		* * 2: big butt implant
		* * 3: fillable butt implants
		* * 5 - 8: advanced fillable implants
		* * 9+: hyper fillable implants
		*/
		this.buttImplant = 0;
		/**
		 * Implant type
		 * * "none"
		 * * "normal"
		 * * "string"
		 * * "fillable"
		 * * "advanced fillable"
		 * * "hyper fillable"
		 */
		this.buttImplantType = "none";
		/**
		* butt tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.buttTat = 0;
		/**
		* face attractiveness
		*
		* * -96 - : very ugly
		* * -95 - -41: ugly
		* * -40 - -11: unattractive
		* * -10 - 10: attractive
		* * 11 - 40: very pretty
		* * 41 - 95: gorgeous
		* * 96+: mind blowing
		*/
		this.face = 0;
		/**
		* facial surgery degree
		*
		* * 0 - 14: none
		* * 15 - 34: Subtle Improvements
		* * 35 - 64: Noticeable Work
		* * 65 - 99: Heavily Reworked
		* * 100: Uncanny Valley
		*/
		this.faceImplant = 0;
		/**
		* accepts string (will be treated as "normal")
		* * "normal"
		* * "masculine"
		* * "androgynous"
		* * "cute"
		* * "sensual"
		* * "exotic"
		*/
		this.faceShape = "normal";
		/**
		* lip size (0 - 100)
		* * 0 - 10: thin
		* * 11 - 20: normal
		* * 21 - 40: pretty
		* * 41 - 70: plush
		* * 71 - 95: huge(lisps)
		* * 96 - 100: facepussy(mute)
		*/
		this.lips = 15;
		/**
		* how large her lip implants are
		* @see lips
		*/
		this.lipsImplant = 0;
		/**
		* lips pierced
		*
		* 0: no; 1: yes; 2: heavy */
		this.lipsPiercing = 0;
		/**
		* lip tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "permanent makeup"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.lipsTat = 0;
		/**
		* teeth type
		* * "normal"
		* * "crooked"
		* * "straightening braces"
		* * "cosmetic braces"
		* * "removable"
		* * "pointy"
		* * "baby"
		* * "mixed"
		*/
		this.teeth = "normal";
		/**
		* has tongue piercing
		*
		* 0: no; 1: yes; 2: heavy */
		this.tonguePiercing = 0;
		/**
		* vagina type
		* * -1: no vagina
		* * 0: virgin
		* * 1: tight
		* * 2: reasonably tight
		* * 3: loose
		* * 4: cavernous
		* * 10: ruined
		*/
		this.vagina = 0;
		/** How wet she is
		*
		* 0: dry; 1: wet; 2: soaking wet */
		this.vaginaLube = 0;
		/** Has vagina piercing
		*
		* 0: no; 1: yes; 2: heavy */
		this.vaginaPiercing = 0;
		/**
		* vagina tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.vaginaTat = 0;
		/**
		* pregnancy time or state.See Pregnancy Control section for more.
		* * -3: sterilized
		* * -2: sterile
		* * -1: contraceptives
		* * 0: fertile
		* * 1 - 10: pregnant, not showing
		* * 11 - 20: showing
		* * 21 - 30: pregnant
		* * 30 - 35: very pregnant
		*/
		this.preg = -1;
		/**
			* accepts ID See Pregnancy Control section for more.
			*
			* Who sired her pregnancy
			* * -9: a futanari sister
			* * -8: an animal
			* * -7: designer baby
			* * -6: a member of the Societal Elite
			* * -5: one of your clients
			* * -4: another arcology owner
			* * -3: your former Master
			* * -2: citizen of your arcology
			* * -1: you
			* * 0: Unidentifiable
			*/
		this.pregSource = 0;
		/**
		* Number of children.
		*
		* **Warning!** Should be not changed after initial impregnation setup.
		* See Pregnancy Control section for more.
		*/
		this.pregType = 0;
		/**
		* Number of ready to be impregnated ova (override normal cases),
		*
		* For delayed impregnations with multiples.Used onetime on next call of the SetPregType
		* widget. After SetPregType use it to override .pregType, it set back to 0 automatically.
		*/
		this.pregAdaptation = 50;
		/**
		* Ovary implant type.
		*
		* * 0: no implants
		* * "fertility": higher chance of twins (or more)
		* * "sympathy": doubles eggs released
		* * "asexual": self-fertilizing
		*/
		this.ovaImplant = 0;
		/**
		* Womb focused enhancements.
		*
		* * "none"
		* * "restraint": Provides structural support for extremely oversized pregnancies
		*/
		this.wombImplant = "none";
		/**
			* Menstrual cycle known variable. To be used for fert cycle discover and things like pregnancy without a first period
			*
			* * 0: no
			* * 1: yes
			*/
		this.fertKnown = 0;
		/**
			* Menstrual cycle control variable.
			*
			* * 0: Danger week
			* * 1+: safe week
			*/
		this.fertPeak = 0;
		/**
			* has the slave been turned into a broodmother
			*
			* * 0: no
			* * 1: standard 1 birth / week
			* * 2: black market 12 births / week
			* * 3: black market upgrade for implant firmware, to allow change weekly number
			* of ova in range of 1 to 12 in remote surgery block. (broodmotherFetuses change
			* through remote surgery). (future usage)
			*/
		this.broodmother = 0;
		/**
			* count of ova that broodmother implant force to release.
			*
			* Should be set with "broodmother" property together. If broodmother === 0 has no meaning.
			*/
		this.broodmotherFetuses = 0;
		/**
		* If broodmother implant set to pause it 's work.
		*
		* 1: implant on pause !1: working.
		*
		* If broodmother birth her last baby and her implant is on pause, she will be in contraception like state.
		*/
		this.broodmotherOnHold = 0;
		/**
		* Number of weeks left until last baby will be birthed.
		*
		* Mainly informative only. Updated automatically at birth process based on remaining fetuses. 0 - 37
		*/
		this.broodmotherCountDown = 0;
		/**
		* variable used to set off the birth events
		*
		* 1: birth this week; 0: not time yet */
		this.labor = 0;
		/**
		* may accept strings, use at own risk
		*
		* * "none"
		* * "a small empathy belly"
		* * "a medium empathy belly"
		* * "a large empathy belly"
		* * "a huge empathy belly"
		* * "a corset"
		* * "an extreme corset"
		*/
		this.bellyAccessory = "none";
		/**
		* labia type
		* * 0: minimal
		* * 1: big
		* * 2: huge
		* * 3: huge dangling
		*/
		this.labia = 0;
		/**
		* clit size
		* * 0: normal
		* * 1: large
		* * 2: huge
		* * 3: enormous
		* * 4: penis-like
		* * 5: like a massive penis
		*/
		this.clit = 0;
		/**
		* is clit pierced
		* * 0: no
		* * 1: yes
		* * 2: heavy
		* * 3: smart
		*/
		this.clitPiercing = 0;
		/**
		* smart piercing setting
		* * "off"
		* * "none"
		* * "all"
		* * "no default setting"
		* * "women"
		* * "men"
		* * "vanilla"
		* * "oral"
		* * "anal"
		* * "boobs"
		* * "submissive"
		* * "humiliation"
		* * "pregnancy"
		* * "dom"
		* * "masochist"
		* * "sadist"
		*/
		this.clitSetting = "vanilla";
		/** 0: circumcised; 1+:uncut, also affects foreskin size */
		this.foreskin = 0;
		/**
		* anus size
		* * 0: virgin
		* * 1: tight
		* * 2: loose
		* * 3: very loose
		* * 4: gaping
		*/
		this.anus = 0;
		/**
		* dick size
		* * 0: none
		* * 1: tiny
		* * 2: little
		* * 3: normal
		* * 4: big
		* * 5: huge
		* * 6: gigantic
		* * 7: massive/gigantic
		* * 8: truly imposing/titanic
		* * 9: monstrous/absurd
		* * 10: awe-inspiring/inhuman
		* * 11+: hypertrophied
		*/
		this.dick = 0;
		/** Used to calculate size of area around anus. */
		this.analArea = 1;
		/**
		* is dick pierced
		* * 0: no
		* * 1: yes
		* * 2: heavy
		*/
		this.dickPiercing = 0;
		/**
		* dick tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.dickTat = 0;
		/**
		* does the slave have a prostate?
		* * 0: no
		* * 1: normal
		* * 2: hyperstimulated +20%
		* * 3: modified hyperstimulated +50%
		*/
		this.prostate = 0;
		/**
		* ball size
		* * 0: none
		* * 1: vestigial
		* * 2: small
		* * 3: average
		* * 4: large
		* * 5: massive
		* * 6: huge
		* * 7: giant
		* * 8: enormous
		* * 9: monstrous
		* * 10: inhuman
		* * 11+: hypertrophied
		*/
		this.balls = 0;
		/**
			* scrotum size
			*
			* function relative to .balls
			*
			* *If .balls > 0 and .scrotum === 0, balls are internal*
			*/
		this.scrotum = 0;
		/** Has ovaries
		*
		* 0: no; 1: yes */
		this.ovaries = 0;
		/** Has anus piercing
		*
		* 0: no; 1: yes; 2: heavy */
		this.anusPiercing = 0;
		/**
		* anus tattoo
		*
		* takes one of the following strings or 0
		* * "bleached"
		* * "tribal patterns"
		* * "flowers"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.anusTat = 0;
		/**
		* has makeup
		* * 0: none
		* * 1: minimal
		* * 2: expensive, luxurious
		* * 3: color-coordinated with hair
		* * 4: heavy
		* * 5: neon
		* * 6: color-coordinated neon
		* * 7: metallic
		* * 8: color-coordinated metallic
		*/
		this.makeup = 0;
		/**
		* nail type
		* * 0: neatly clipped
		* * 1: long and elegant
		* * 2: color-coordinated with hair
		* * 3: sharp and claw-like
		* * 4: bright and glittery
		* * 5: very long and garish
		* * 6: neon
		* * 7: color-coordinated neon
		* * 8: metallic
		* * 9: color-coordinated metallic
		*/
		this.nails = 0;
		/**
			* brand
			*
			* @type {Object.<string, string>} */
		this.brand = {};
		/** Has pierced ears
		*
		* 0: no; 1: yes; 2: heavy */
		this.earPiercing = 0;
		/** Has pierced nose
		*
		* 0: no; 1: yes; 2: heavy */
		this.nosePiercing = 0;
		/** Has eyebrow piercing
		*
		* 0: no; 1: yes; 2: heavy */
		this.eyebrowPiercing = 0;
		/** Has navel piercing
		*
		* 0: no; 1: yes; 2: heavy */
		this.navelPiercing = 0;
		/**
		* shoulder tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.shouldersTat = 0;
		/**
		* arm tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.armsTat = 0;
		/**
		* leg tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		*  @type {string|number} */
		this.legsTat = 0;
		/**
		* back tattoo
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.backTat = 0;
		/**
		* tramp stamp
		*
		* takes one of the following strings or 0
		* * "tribal patterns"
		* * "flowers"
		* * "scenes"
		* * "Asian art"
		* * "degradation"
		* * "counting"
		* * "advertisements"
		* * "rude words"
		* * "bovine patterns"
		* * "sacrament"
		* * "Sacrilege"
		* * "Possessive"
		* * "Paternalist"
		* @type {string|number} */
		this.stampTat = 0;
		/**
			* * "spare"
			* * "normal"
			* * "luxurious"
			*/
		this.rules.living = "spare";
		/**
		* * "restrictive"
		* * "permissive"
		* * "accent elimination"
		* * "language lessons"
		*/
		this.rules.speech = "restrictive";
		this.rules.release = new App.Entity.ReleaseRulesState();
		/**
		* * "restrictive"
		* * "just friends"
		* * "permissive"
		*/
		this.rules.relationship = "restrictive";
		/**
		* * "none"
		* * "induce"
		* * "maintain"
		*/
		this.rules.lactation = "none";
		/**
		* * "confinement"
		* * "whipping"
		* * "chastity"
		* * "situational"
		*/
		this.rules.punishment = "situational";
		/**
		* * "relaxation"
		* * "drugs"
		* * "orgasm"
		* * "situational"
		*/
		this.rules.reward = "situational";
		/** Follows rules or is exempt from them
		*
		* 0: exempt; 1: obeys */
		this.useRulesAssistant = 1;
		/**
		* * "healthy"
		* * "restricted"
		* * "muscle building"
		* * "fattening"
		* * "slimming"
		* * "XX"
		* * "XY"
		* * "XXY"
		* * "cum production"
		* * "cleansing"
		* * "fertility"
		*/
		this.diet = "healthy";
		/** How much of her diet is cum
		*
		* 0: none; 1: supplemented; 2: nearly entirely */
		this.dietCum = 0;
		/** How much of her diet is milk
		*
		* 0: none; 1: supplemented; 2: nearly entirely */
		this.dietMilk = 0;
		/**
		* * -2: heavy male hormones
		* * -1: male hormones
		* * 0: none
		* * 1: female hormones
		* * 2: heavy female hormones
		*/
		this.hormones = 0;
		/**
		* * "no drugs"
		* * "breast injections"
		* * "butt injections"
		* * "lip injections"
		* * "fertility drugs"
		* * "penis enhancement"
		* * "testicle enhancement"
		* * "psychosuppressants"
		* * "steroids"
		* * "hormone enhancers"
		* * "hormone blockers"
		* * "super fertility drugs"
		* * "hyper breast injections"
		* * "hyper butt injections"
		* * "hyper penis enhancement"
		* * "hyper testicle enhancement"
		* * "female hormone injections"
		* * "male hormone injections"
		* * "anti-aging cream"
		* * "appetite suppressors"
		* * "penis atrophiers"
		* * "testicle atrophiers"
		* * "clitoris atrophiers"
		* * "labia atrophiers"
		* * "nipple atrophiers"
		* * "lip atrophiers"
		* * "breast redistributors"
		* * "butt redistributors"
		* * "sag-B-gone"
		* * "growth stimulants"
		*/
		this.drugs = "no drugs";
		/**
		 * * "none"
		 * * "preventatives"
		 * * "curatives"
		 */
		this.curatives = "none";
		/** If greater than 10 triggers side effects from drug use. */
		this.chem = 0;
		/**
		 * * "none"
		 * * applied
		 * * "extreme"
		 * * "anaphrodisiacs"
		 */
		this.aphrodisiacs = "none";
		/**
		 * TODO:
		* how addict to aphrodisiacs slave is
		* * 0: not
		* * 1-2: new addict
		* * 3-9: confirmed addict
		* * 10+: dependent
		*/
		this.addict = 0;
		/** 0: no; 1: yes */
		this.choosesOwnClothes = 0;
		/**
			* may accept strings, use at own risk
			*
			* * "choosing her own clothes"
			* * "no clothing"
			* * "a ball gown"
			* * "a mini dress"
			* * "an oversized t-shirt"
			* * "a schoolgirl outfit"
			* * "a slave gown"
			* * "a sweater"
			* * "a t-shirt"
			*/
		this.clothes = "no clothing";
		/**
			* may accept strings, use at own risk
			* * "none"
			* * "ancient Egyptian"
			* * "cruel retirement counter"
			* * "uncomfortable leather"
			* * "tight steel"
			* * "shock punishment"
			* * "dildo gag"
			* * "heavy gold"
			* * "pretty jewelry"
			* * "nice retirement counter"
			* * "bell collar"
			* * "leather with cowbell"
			* * "bowtie"
			* * "neck corset"
			* * "stylish leather"
			* * "satin choker"
			* * "preg biometrics"
			* * "massive dildo gag"
			* * "silk ribbon"
			* * "ball gag"
			* * "bit gag"
			* * "ring gag"
			* * "porcelain mask"
			*/
		this.collar = "none";
		/**
		* may accept strings, use at own risk
		* * "none"
		* * "heels"
		* * "pumps"
		* * "extreme heels"
		* * "boots"
		* * "flats"
		*/
		this.shoes = "none";
		/**
			* may accept strings, use at own risk
			* * "none"
			* * "bullet vibrator"
			* * "smart bullet vibrator"
			* * "dildo"
			* * "large dildo"
			* * "huge dildo"
			* * "long dildo"
			* * "long, large dildo"
			* * "long, huge dildo"
			*/
		this.vaginalAccessory = "none";
		/**
			* may accept strings, use at own risk
			* * "none"
			* * "vibrator"
			*/
		this.vaginalAttachment = "none";
		/**
			* may accept strings, use at own risk
			* * "none"
			* * "sock"
			* * "vibrator"
			*/
		this.dickAccessory = "none";
		/**
			* whether the slave has a chastity device on their anus
			* 0 - no
			* 1 - yes
			*/
		this.chastityAnus = 0;
		/**
			* whether the slave has a chastity device on their penis
			* 0 - no
			* 1 - yes
			*/
		this.chastityPenis = 0;
		/**
			* whether the slave has a chastity device on their vagina
			* 0 - no
			* 1 - yes
			*/
		this.chastityVagina = 0;
		/**
			* may accept strings, use at own risk
			* * "none"
			* * "hand gloves"
			* * "elbow gloves"
			*/
		this.armAccessory = "none";
		/**
			* may accept strings, use at own risk
			* * "none"
			* * "short stockings"
			* * "long stockings"
			*/
		this.legAccessory = "none";
		/**
		* may accept strings, use at own risk
		* * "none"
		* * "plug"
		* * "large plug"
		* * "huge plug"
		* * "long plug"
		* * "long, large plug"
		* * "long, huge plug"
		*/
		this.buttplug = "none";
		/**
		* Does the slave have an attachment on their buttplug
		*
		*  may accept strings, use at own risk
		* * "none"
		* * "tail"
		* * "fox tail"
		* * "cat tail"
		* * "cow tail"
		*/
		this.buttplugAttachment = "none";
		/**
		* slave intelligence
		* * -100 - -96: borderline retarded
		* * -95 - -51: very slow
		* * -50 - -16: slow
		* * -15 - 15: average
		* * 16 - 50: smart
		* * 51 - 95: very smart
		* * 96 - 100: brilliant
		*/
		this.intelligence = 0;
		/**
		* Degree of slave 's education
		* * 0: uneducated
		* * 1+: partial education (not really used)
		* * 15+: educated
		* * 30: well educated
		*/
		this.intelligenceImplant = 0;
		/**
		* sex drive
		* * 0 - 20: no sex drive
		* * 21 - 40: poor sex drive
		* * 41 - 60: average sex drive
		* * 61 - 80: good sex drive
		* * 81 - 95: powerful sex drive
		* * 96+: nymphomaniac
		*/
		this.energy = 50;
		/**
			* The amount of sex the slave had with customers for certain jobs during a week
			*/
		this.sexAmount = 0;
		/**
			* The 'quality' of the sex a slave had with customers. High quality means they fetch a higher price for their services
			*/
		this.sexQuality = 0;
		/**
			* how badly she needs sex.
			*
			*  0: sated
			*/
		this.need = 0;
		/**
		* attraction to women
		* * 0 - 5: disgusted by women
		* * 6 - 15: turned off by women
		* * 15 - 35: not attracted to women
		* * 36 - 65: indifferent to women
		* * 66 - 85: attracted to women
		* * 86 - 95: aroused by women
		* * 96+: passionate about women
		*
		* *if both attrXX and attrXY > 95, slave will be omnisexual*
		*
		* *if energy > 95 and either attrXX or attrXY > 95, slave will be nymphomaniac*
		*/
		this.attrXX = 0;
		/**
			* attraction to men
			* * 0 - 5: disgusted by men
			* * 6 - 15: turned off by men
			* * 15 - 35: not attracted to men
			* * 36 - 65: indifferent to men
			* * 66 - 85: attracted to men
			* * 86 - 95: aroused by men
			* * 96+: passionate about men
			*
			* *if both attrXX and attrXY > 95, slave will be omnisexual*
			*
			* *if energy > 95 and either attrXX or attrXY > 95, slave will be nymphomaniac*
			*/
		this.attrXY = 0;
		/** 0: no; 1: yes */
		this.attrKnown = 0;
		/**
		* * "none"
		* * "mindbroken"
		* * "submissive"
		* * "cumslut"
		* * "humiliation"
		* * "buttslut"
		* * "boobs"
		* * "sadist"
		* * "masochist"
		* * "dom"
		* * "pregnancy"
		*/
		this.fetish = "none";
		/** How strong her fetish is (10-100)
		*
		* 10+: enjoys fetish; 60+: likes fetish; 95+: loves fetish */
		this.fetishStrength = 70;
		/** Is fetish known to player
		*
		* 0: no; 1: yes */
		this.fetishKnown = 0;
		/**
		* * "none"
		* * "arrogant": clings to her dignity, thinks slavery is beneath her
		* * "bitchy": can 't keep her opinions to herself
		* * "odd": says and does odd things
		* * "hates men": hates men
		* * "hates women": hates women
		* * "gluttonous": likes eating, gains weight
		* * "anorexic": dislikes eating and being forced to eat, loses weight
		* * "devout": resistance through religious faith
		* * "liberated": believes slavery is wrong
		*/
		this.behavioralFlaw = "none";
		/**
		* * "none"
		* * "confident": believes she has value as a slave
		* * "cutting": often has as witty or cunning remark ready, knows when to say it
		* * "funny": is funny
		* * "fitness": loves working out
		* * "adores women": likes spending time with women
		* * "adores men": likes spending time with men
		* * "insecure": defines herself on the thoughts of others
		* * "sinful": breaks cultural norms
		* * "advocate": advocates slavery
		*/
		this.behavioralQuirk = "none";
		/**
		* * "none"
		* * "hates oral": hates oral sex
		* * "hates anal": hates anal sex
		* * "hates penetration": dislikes penetrative sex
		* * "shamefast": nervous when naked
		* * "idealistic": believes sex should be based on love and consent
		* * "repressed": dislikes sex
		* * "apathetic": inert during sex
		* * "crude": sexually crude and has little sense of what partners find disgusting during sex
		* * "judgemental": sexually judgemental and often judges her sexual partners' performance
		* * "neglectful": disregards herself in sex
		* * "cum addict": addicted to cum
		* * "anal addict": addicted to anal
		* * "attention whore": addicted to being the center of attention
		* * "breast growth": addicted to her own breasts
		* * "abusive": sexually abusive
		* * "malicious": loves causing pain and suffering
		* * "self hating": hates herself
		* * "breeder": addicted to being pregnant
		*/
		this.sexualFlaw = "none";
		/**
		* * "none"
		* * "gagfuck queen": can take a facefucking
		* * "painal queen": knows how far she can go without getting hurt
		* * "strugglefuck queen": knows how much resistance her partners want
		* * "tease": is a tease
		* * "romantic": enjoys the closeness of sex
		* * "perverted": enjoys breaking sexual boundaries
		* * "caring": enjoys bring her partners to orgasm
		* * "unflinching": willing to do anything
		* * "size queen": prefers big cocks
		*/
		this.sexualQuirk = "none";
		/** 0: does not have; 1: carrier; 2: active
			* * heterochromia is an exception. String = active
			*/
		this.geneticQuirks = {
			/** Oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced. */
			macromastia: 0,
			/** Greatly oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced.
			*
			* **macromastia + gigantomastia** - Breasts never stop growing. Increased growth rate, no shrink rate. */
			gigantomastia: 0,
			/** Is prone to having twins, shorter pregnancy recovery rate */
			fertility: 0,
			/** Is prone to having multiples, even shorter pregnancy recovery rate
			*
			* **fertility + hyperFertility** - will have multiples, even shorter pregnancy recovery rate */
			hyperFertility: 0,
			/** Pregnancy does not block ovulation, slave can become pregnant even while pregnant */
			superfetation: 0,
			/** Is abnormally tall. gigantism + dwarfism - is very average*/
			gigantism: 0,
			/** Is abnormally short. gigantism + dwarfism - is very average*/
			dwarfism: 0,
			/** Has a flawless face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			pFace: 0,
			/** Has a hideous face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			uFace: 0,
			/** Has pale skin, white hair and red eyes */
			albinism: 0,
			/** May have mismatched eyes */
			heterochromia: 0,
			/** Ass never stops growing. Increased growth rate, reduced shrink rate. */
			rearLipedema: 0,
			/** Has (or will have) a huge dong */
			wellHung: 0,
			/** Constantly gains weight unless dieting, easier to gain weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wGain: 0,
			/** Constantly loses weight unless gaining, easier to lose weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wLoss: 0,
			/** Body attempts to normalize to an androgynous state */
			androgyny: 0,
			/** Constantly gains muscle mass, easier to gain muscle. mGain + mLoss - muscle gain/loss aplified, passively lose muscle unless building */
			mGain: 0,
			/** Constantly loses muscle mass, easier to gain muscle. mGain + mLoss - muscle gain/loss aplified, passively lose muscle unless building */
			mLoss: 0,
			/** Slave can only ever birth girls */
			girlsOnly: 0
		};
		/** Counts various acts slave participated in */
		this.counter = new App.Entity.ChildActionsCountersState();
		/** Values provided by players */
		this.custom = new App.Entity.ChildCustomAddonsState();
		/** Does this slave refer to you rudely?
		*
		* 0: not being rude; 1: insists on calling you a rude title */
		this.rudeTitle = 0;
		/** @type {string[]} */
		this.currentRules = [];
		/**
		* Child has a tattoo that is only recognizable when she has a big belly.
		* * "a heart"
		* * "a star"
		* * "a butterfly"
		* @type {string|number} */
		this.bellyTat = 0;
		/**
			* Child has a series of tattoos to denote how many abortions she has had.
			* * -1: no tattoo
			* *  0: assigned to have tattoo, may not have one yet
			* * 1+: number of abortion tattoos she has
			*/
		this.abortionTat = -1;
		/**
			* Child has a series of tattoos to denote how many times she has given birth.
			* * -1: no tattoo
			* *  0: assigned to have tattoo, may not have one yet
			* * 1+: number of birth tattoos she has
			*/
		this.birthsTat = -1;
		/** Child will give birth this week.
		*
		* 1: true; 0: false */
		this.induce = 0;
		/** Male slave has an anal womb and can get pregnant.
		*
		* 1: true; 0: false */
		this.mpreg = 0;
		/** How much fluid is distending the slave.
		*
		* 1: 2L; 2: 4L; 3: 8L */
		this.inflation = 0;
		/**
		* What kind of fluid is in the slave.
		* * "none"
		* * "water"
		* * "cum"
		* * "milk"
		* * "food"
		* * "aphrodisiac"
		* * "curative"
		* * "tightener"
		* * "urine"
		*/
		this.inflationType = "none";
		/**
		* How she is being filled.
		* * 0: not
		* * 1: oral
		* * 2: anal
		* * 3: orally by another slave
		*/
		this.inflationMethod = 0;
		/** If inflationMethod === 3, ID of the slave filling her with milk. */
		this.milkSource = 0;
		/** If inflationMethod 3, ID of the slave filling her with cum. */
		this.cumSource = 0;
		/** Child's internals have ruptured. Used with poor health and overinflation.
		*
		* 1: true; 0: false */
		this.burst = 0;
		/** Do you and the slave know she is pregnant.
		*
		* 0: no; 1: yes */
		this.pregKnown = 0;
		/** How long she has been pregnant
		*
		* used in place of .preg when pregnancy speed up and slow down are used on a slave
		*
		* if negative, designates postpartum. */
		this.pregWeek = 0;
		/**
			* how big their belly is in CCs
			*
			* ||thresholds:|
			* |-|-|
			* 100	| bloated
			* 1500   | early pregnancy
			* 5000   | obviously pregnant
			* 10000  | very pregnant
			* 15000  | full term
			* 30000  | full term twins
			* 45000  | full term triplets
			* 60000  | full term quads
			* 75000  | full term quints
			* 90000  | full term sextuplets
			* 105000 | full term septuplets
			* 120000 | full term octuplets
			* 150000 | oversized pregnancy
			* 300000 | hyperpreg state 1
			* 450000 | hyperpreg state 2
			* 600000 | hyperpreg state 3
			* 750000 | hyperpreg state 4
			*/
		this.belly = 0;
		/**
			* how big their belly is in CCs (pregnancy only)
			*
			* ||thresholds|
			* |-|-|
			* 100	| bloated
			* 1500   | early pregnancy
			* 5000   | obviously pregnant
			* 10000  | very pregnant
			* 15000  | full term
			* 30000  | full term twins
			* 45000  | full term triplets
			* 60000  | full term quads
			* 75000  | full term quints
			* 90000  | full term sextuplets
			* 105000 | full term septuplets
			* 120000 | full term octuplets
			* 150000 | oversized pregnancy (9+ babies)
			* 300000 | hyperpreg state 1 (20+ babies)
			* 450000 | hyperpreg state 2 (30+ babies)
			* 600000 | hyperpreg state 3 (40+ babies)
			* 750000 | hyperpreg state 4 (50+ babies)
			*/
		this.bellyPreg = 0;
		/**
		* how big their belly is in CCs (fluid distension only)
		*
		* ||thresholds|
		* |-|-|
		* 100   | bloated
		* 2000  | clearly bloated (2 L)
		* 5000  | very full (~1 gal)
		* 10000 | full to bursting (~2 gal)
		*/
		this.bellyFluid = 0;
		/**
			* Does the slave have a fillable abdominal implant.
			* * -1: no
			* * 0+: yes
			* * 2000+: Early pregnancy
			* * 4000+: looks pregnant
			* * 8000+: looks full term
			* * 16000+: hyperpregnant 1
			* * 32000+: hyperpregnant 2
			*/
		this.bellyImplant = -1;
		/** How saggy her belly is after being distended for too long.
		*
		* 1+ changes belly description */
		this.bellySag = 0;
		/** How saggy her belly is from being too pregnant.
		*
		* 1+ changes belly description and overrides/coincides with bellySag */
		this.bellySagPreg = 0;
		/**
		* Has the slave 's belly implant been filled this week. Causes health damage for overfilling.
		*
		* 0: no pain; 1: will experience pain; 2: cannot be filled this week */
		this.bellyPain = 0;
		/** Does the slave have a cervical implant that slowly feeds cum from being fucked into a fillable implant.
		*
		* 0: no; 1: vaginal version only; 2: anal version only; 3: both vaginal and anal */
		this.cervixImplant = 0;
		/** Target .physicalAge for female puberty to occur. */
		this.pubertyAgeXX = 13;
		/** Has the slave gone through female puberty.
		*
		* 0: no; 1: yes */
		this.pubertyXX = 0;
		/** Target .physicalAge for male puberty to occur. */
		this.pubertyAgeXY = 13;
		/** Has the slave gone through male puberty.
		*
		* 0: no; 1: yes */
		this.pubertyXY = 0;
		/**
		* not fully implemented.
		* * 0: no scars
		* * 1: light scarring
		* * 2: heavy scarring
		* * 3: fresh scarring
		* * 4: burns
		* * 5: menacing scar
		* * 6: exotic scar
		*/
		this.scars = 0;
		/**
		* In a eugenics society, this slave is a designated breeder.
		*
		* 1: yes; 0: no */
		this.breedingMark = 0;
		/**  Is the Head Girl permitted to fuck this slave pregnant.
		*
		* 0: no; 1: yes */
		this.HGExclude = 0;
		/**
		* What species of sperm she produces.
		* * "human"
		* * "sterile"
		* * "dog"
		* * "pig"
		* * "horse"
		* * "cow"
		*/
		this.ballType = "human";
		/**
		* What species of ovum she produces.
		* * "human"
		* * "dog"
		* * "pig"
		* * "horse"
		* * "cow"
		*/
		this.eggType = "human";
		/** Eugenics variable. Is the slave allowed to choose to wear chastity.
		*
		* 0: no; 1: yes */
		this.choosesOwnChastity = 0;
		/**
		* Is she on gestation altering drugs?
		* * "none"
		* * "slow gestation"
		* * "speed up"
		* * "labor suppressors"
		*/
		this.pregControl = "none";
		/**
			* Array that holds a slaves fitted prosthetics. Objects are used to ensure easier expansion later (tattoos for limbs and similar).
			*
			* Elements of the array should be objects.
			* * .id: ID of the prosthetic, see setup.prostheticIDs
			* @type {Array.<{id:string}>} */
		this.readyProsthetics = [];
		/**  */
		this.ageAdjust = 0;
		/** Child has undergone hair removal surgery
		*
		* 0: no; 1: yes */
		this.bald = 0;
		/** Child is in original body.
			*
			* 0: yes; 1+: number of swaps (increases upkeep each time) */
		this.bodySwap = 0;
		/** Who, if relevant, the body belonged to. */
		this.origBodyOwner = "";
		/** Who, if relevant, the body belonged to. */
		this.origBodyOwnerID = 0;
		/** Cause of slave death. */
		this.death = "";
		/**
			* Child's current hormonal balance, directs saHormones changes
			*
			* ||thresholds|
			* |-|-|
			* -500 - -400 | overwhelmingly masculine
			* -399 - -300 | extremely masculine
			* -299 - -200 | heavily masculine
			* -199 - -100 | very masculine
			* -99 - -21 | masculine
			* -20 - 20 | neutral
			* 21 - 99 | feminine
			* 100 - 199 | very feminine
			* 200 - 299 | heavily feminine
			* 300 - 399 | extremely feminine
			* 400 - 500 | overwhelmingly feminine
			*/
		this.hormoneBalance = 0;
		/** Whether a slave is permitted to eat Hedonistic Decadence's specialized slave food.
		*
		* 0: no; 1: yes */
		this.onDiet = 0;
		/** Does the slave have the breast shape maintaining mesh implant.
		*
		* 0: no; 1: yes */
		this.breastMesh = 0;
		/** Used to denote a slave giving birth prematurely.
		*
		* 0: no; 1: yes */
		this.prematureBirth = 0;
		/** Was the slave born prematurely?
		*
		* 0: no; 1: yes */
		this.premature = 0;
		/** Has the slave had a vasectomy?
		*
		* 0: no; 1: yes */
		this.vasectomy = 0;
		/** Is the Child's hair under constant maintenance?
		*
		* 0: no; 1: yes */
		this.haircuts = 0;
		/** Used to tell if the slave is from this game or a previous.
		*
		* 0: no; 1: yes */
		this.newGamePlus = 0;
		/** Her skills */
		this.skill = new App.Entity.ChildSkillsState();
		/** Whether she was put in the incubator at birth
		*
		* 0: no; 1: yes, comforting; 2: yes, terrifying */
		this.tankBaby = 0;
		/** */
		this.clone = 0;
		/**  */
		this.geneMods = {
			/** Does slave have induced NCS?
			*
			* 0: no; 1: yes */
			NCS: 0,
			/** Has the slave undergone the elasticity (plasticity) treatment?
			*
			* 0: no; 1: yes */
			rapidCellGrowth: 0
		};
		/* eslint-disable camelcase*/
		this.NCSyouthening = 0;
		this.override_Race = 0;
		this.override_Skin = 0;
		this.override_Eye_Color = 0;
		this.override_H_Color = 0;
		this.override_Pubic_H_Color = 0;
		this.override_Arm_H_Color = 0;
		this.override_Brow_H_Color = 0;
		/** Erratic weight gain
		*
		* 0: stable; 1: gaining; -1: losing */
		this.weightDirection = 0;
		/** @type {{skin:string, eyeColor:string, hColor:string}} */
		this.albinismOverride = null;
		/* eslint-enable */
		/** Amount of cash paid to acquire the slave
		*
		* accepts negative numbers, 0, or 1.
		* 1: unknown price; 0: free; negative: amount paid */
		this.slaveCost = 0;
		/** Amount of cash you have spent because of this slave
		*
		* accepts negative numbers or 0 */
		this.lifetimeCashExpenses = 0;
		/** Total amount of cash you have earned because of this slave
		*
		* accepts positive numbers or 0 */
		this.lifetimeCashIncome = 0;
		/**  Amount of cash you have earned because of this slave last week
		*
		* accepts positive numbers or 0 */
		this.lastWeeksCashIncome = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lifetimeRepExpenses = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lifetimeRepIncome = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lastWeeksRepIncome = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lastWeeksRepExpenses = 0;
	}
};

/* REPORTS */

/**
 * Details week-to-week changes in children in the Nursery
 * @returns {string}
 */
App.Facilities.Nursery.childrenReport = function childrenReport() {
	"use strict";

	const
		Matron = V.Matron,
		NL = V.NurseryiIDs.length,
		CL = V.cribs.length;

	let
		r = ``;

	for (let i = 0; i < CL; i++) {
		const
			child = V.cribs[i];
			// {
			// he, him, his, He, His
			// } = getPronouns(child);

		let
			he,
			his,
			him,
			He,
			His;

		// FIXME: get pronoun system to work with child objects
		if (child.genes === "XX") {
			he = "she",
			him = "her",
			his = "her";
		} else {
			he = "he",
			him = "him",
			his = "his";
		}
		He = capFirstChar(he), His = capFirstChar(his);

		child.birthWeek++;

		if (child.birthWeek >= 52) {
			child.birthWeek = 0;
			if (V.seeAge) {
				child.actualAge++, child.ovaryAge++;
			}
		}

		if (child.growTime > 0) {
			child.growTime--;
			r += `<br><span class="pink">${child.slaveName}</span> is growing steadily. ${He} will be ready for release in about ${years(child.growTime)}. `;
		} else {
			r += `<span class="pink">${child.slaveName}</span> is <span class="lime">ready for release.</span> ${He} will be removed from ${V.nurseryName} upon your approach.`;
		}

		// TODO: add Matron and nanny effects
		if (child.actualAge >= 3) {
			if (Matron || NL) {
				let
					chance = jsRandom(1, 100);

				if (jsDef(Matron)) {
					if (Matron.fetish !== "none") {
						if (chance > 90) {
							if (child.fetish === "none") {
								// TODO: clean up the following blocks
								r += `${child.slaveName} has taken a few cues from ${Matron.slaveName}, and `;
								switch (child.fetish) {
									case "submissive":
										r += `is now a submissive`;
										break;
									case "cumslut":
										r += `is now a cumslut`;
										break;
									case "humiliation":
										r += `now has a fetish for humiliation`;
										break;
									case "buttslut":
										r += `is now a buttslut`;
										break;
									case "boobs":
										r += `now has a fetish for boobs and breastplay`;	// TODO: not happy with this wording
										break;
									case "sadist":
										r += `now gets off on causing pain`;
										break;
									case "masochist":
										r += `now gets off on pain`;
										break;
									case "dom":
										r += `is now very sexually dominant`;
										break;
									case "pregnancy":
										r += `has developed a facination for all things pregnancy-related`;
										break;
								}
								r += `. `;
								child.fetish = Matron.fetish;
							} else {
								if (chance > 95) {
									r += `${Matron.slaveName} has rubbed off on ${child.slaveName}, in more ways than one. ${He} `;
									switch (child.fetish) {
										case "submissive":
											r += `is now a submissive`;
											break;
										case "cumslut":
											r += `is now a cumslut`;
											break;
										case "humiliation":
											r += `now has a fetish for humiliation`;
											break;
										case "buttslut":
											r += `is now a buttslut`;
											break;
										case "boobs":
											r += `now has a fetish for boobs and breastplay`;	// TODO: not happy with this wording
											break;
										case "sadist":
											r += `now gets off on causing pain`;
											break;
										case "masochist":
											r += `now gets off on pain`;
											break;
										case "dom":
											r += `is now very sexually dominant`;
											break;
										case "pregnancy":
											r += `has developed a facination for all things pregnancy-related`;
											break;
									}
									r += `. `;
									child.fetish = Matron.fetish;
								}
							}
						}
					}
				}

				if (NL > 0) {
					for (let j = 0; j < NL; j++) {
						const
							slave = getSlave(V.NurseryiIDs[j]);

						if (slave.fetish !== "none") {
							if (chance > 85) {
								if (child.fetish === "none") {
									r += `${slave.slaveName} has left quite an impression on ${child.slaveName}, and ${he} `;
									switch (child.fetish) {
										case "submissive":
											r += `is now a submissive`;
											break;
										case "cumslut":
											r += `is now a cumslut`;
											break;
										case "humiliation":
											r += `now has a fetish for humiliation`;
											break;
										case "buttslut":
											r += `is now a buttslut`;
											break;
										case "boobs":
											r += `now has a fetish for boobs and breastplay`;	// TODO: not happy with this wording
											break;
										case "sadist":
											r += `now gets off on causing pain`;
											break;
										case "masochist":
											r += `now gets off on pain`;
											break;
										case "dom":
											r += `is now very sexually dominant`;
											break;
										case "pregnancy":
											r += `has developed a facination for all things pregnancy-related`;
											break;
									}
									r += `. `;
									child.fetish = slave.fetish;
								} else {
									if (chance > 90) {
										r += `${child.slaveName} seems to have taken to ${slave.slaveName}'s example, and `;
										switch (child.fetish) {
										case "submissive":
											r += `is now a submissive`;
											break;
										case "cumslut":
											r += `is now a cumslut`;
											break;
										case "humiliation":
											r += `now has a fetish for humiliation`;
											break;
										case "buttslut":
											r += `is now a buttslut`;
											break;
										case "boobs":
											r += `now has a fetish for boobs and breastplay`;	// TODO: not happy with this wording
											break;
										case "sadist":
											r += `now gets off on causing pain`;
											break;
										case "masochist":
											r += `now gets off on pain`;
											break;
										case "dom":
											r += `is now very sexually dominant`;
											break;
										case "pregnancy":
											r += `has developed a facination for all things pregnancy-related`;
											break;
									}
									r += `. `;
										child.fetish = slave.fetish;
									}
								}
							}
						}
					}
				}

				// TODO: add education system
				if (jsDef(Matron) && Matron) {
					const {
						// eslint-disable-next-line no-unused-vars
						he2, him2, his2, hers2, himself2, boy2, He2, His2
					} = getPronouns(Matron).appendSuffix('2');

					if (Matron.intelligence + Matron.intelligenceImplant > 65) {
						r += `${Matron.slaveName} is so intelligent and well-educated that ${he2} is able to teach ${CL > 1 ? `the children` : `${child.slaveName}`} very effectively, and so ${CL > 1 ? child.slaveName : `${he}`} gradually grows smarter. `;	// TODO: not happy with this
						child.intelligenceImplant += 3;	// TODO: should this raise intelligence instead?
					} else if (Matron.intelligenceImplant > 30) {
						r += `${Matron.slaveName}'s education makes up for the fact that ${CL > 1 ? child.slaveName : `${he}`} isn't the brightest and allows ${him2} to teach ${CL > 1 ? `the children` : `${child.slaveName}`} quite effectively, and so ${CL > 1 ? child.slaveName : `${he}`} grows a bit smarter. `;	// TODO:
						child.intelligenceImplant += 2;
					} else if (Matron.intelligence > 50) {
						r += `Though ${Matron.slaveName} has had little to no formal education, ${his2} natural brilliance allows ${him2} to teach ${CL > 1 ? `the children` : `${child.slaveName}`} quite effectively, and so ${CL > 1 ? child.slaveName : `${he}`} grows a bit smarter. `;	// TODO:
						child.intelligenceImplant += 2;
					} else {
						r += `${Matron.slaveName} isn't the brightest, and isn't as effective at teaching as ${he2} otherwise could be. ${He2} is only somewhat effective at teaching ${CL > 1 ? `the children` : `${child.slaveName}`}, and so ${CL > 1 ? child.slaveName : `${he}`} grows just a little bit smarter. `;	// TODO:
						child.intelligenceImplant++;
					}
				}

				if (NL > 0) {
					let
						averageIntelligence,
						averageIntelligenceImplant;

					for (let j = 0; j < NL; j++) {
						averageIntelligence += V.slaves[V.slaveIndices[NurseryiIDs[j]]].intelligence;
						averageIntelligenceImplant += V.slaves[V.slaveIndices[NurseryiIDs[j]]].intelligenceImplant;
					}

					averageIntelligence = averageIntelligence / NL;
					averageIntelligenceImplant = averageIntelligenceImplant / NL;

					if (averageIntelligence + averageIntelligenceImplant > 65) {
						r += `${NL > 1 ? `The nannies are mostly` : `${V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} is`} very intelligent and well educated and are able to teach ${CL > 1 ? `the children` : child.slaveName} very effectively. `;
						child.intelligenceImplant += 3;
					} else if (averageIntelligence > 50) {
						r += `${NL > 1 ? `The nannies are mostly` : `${V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} is`} very intelligent and able to teach ${CL > 1 ? `the children` : child.slaveName} quite effectively. `;
						child.intelligenceImplant += 2;
					} else if (averageIntelligenceImplant > 25) {
						r += `${NL > 1 ? `The nannies are mostly` : `${V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} is`} very well educated and able to teach ${CL > 1 ? `the children` : child.slaveName} quite effectively. `;
						child.intelligenceImplant += 2;
					} else if (averageIntelligenceImplant > 15) {
						r += `${NL > 1 ? `The nannies are mostly` : `${V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} is`} well educated and able to teach ${CL > 1 ? `the children` : child.slaveName} fairly effectively. `;
						child.intelligenceImplant++;
					}
				}

				// TODO: add fitness system
				if (jsDef(Matron) && Matron) {
					// TODO:
				}

				if (NL > 0) {
					// TODO:
				}
			}

			// TODO: add friend / rivalry system
			// TODO: add relations to friend system
			for (let j = 0; j < CL; j++) {
				const
					c = V.cribs[j];

				let
					friend = 0,
					rival = 0,
					chance = jsRandom(1, 100);

				if (c.actualAge >= 3) {
					if (c.fetish === child.fetish) {
						r += ``; // TODO:
						friend++;
					}

					if (c.sexualQuirk === child.sexualQuirk || c.behavioralQuirk === child.behavioralQuirk) {
						r += ``; // TODO:
						friend++;
					}

					if (c.fetish === "sadist" || c.fetish === "dom") {
						r += ``; // TODO:
						rival++;
					} else if (child.fetish === "sadist" || child.fetish === "dom") {
						r += ``; // TODO:
						rival++;
					}

					if (friend) {
						if (rival) {
							if (friend > rival) {
								if (chance > 75) {
									r += ``;	// TODO:
									child.relationship = 1, child.relationshipTarget = c.ID;
									c.relationship = 1, c.relationshipTarget = child.ID;
								}
							}
						} else {
							if (chance > 60) {
								r += ``;	// TODO:
								child.relationship = 1, child.relationshipTarget = c.ID;
								c.relationship = 1, c.relationshipTarget = child.ID;
							}
						}
					}

					if (rival) {
						if (friend) {
							if (rival > friend) {
								if (chance > 75) {
									r += ``;	// TODO:
								}
							}
						} else {
							if (chance > 60) {
								r += ``;	// TODO:
							}
						}
					}
				}
			}

			// TODO: rework these entirely
			if (Matron || NL) {
				if (V.nurseryWeight) {
					r += `<br>`;
					if (V.nurseryWeightSetting === 1) {
						if (child.weight < 200) {
							child.weight += 5;
						}
						r += `${He} is being fed an excessive amount of food, causing <span class="red">rapid weight gain.</span> `;
					} else if (V.nurseryWeightSetting === 2) {
						if (child.weight > 10) {
							child.weight--;
							r += `${Matron ? Matron.slaveName : NL > 1 ? `A nanny` : V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} notices ${he} is overweight and <span class="green">decreases the amount of food ${he} eats.</span> `;
						} else if (child.weight <= -10) {
							child.weight++;
							r += `${Matron ? Matron.slaveName : NL > 1 ? `A nanny` : V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} notices ${he} is underweight and <span class="green">increases the amount of food ${he} eats.</span> `;
						} else {
							r += `${He} is <span class="lime">currently a healthy weight;</span> efforts will be made to maintain it. `;
						}
					} else if (V.nurseryWeightSetting === 0) {
						if (child.weight > -20) {
							r += `${His} developing body <span class="red">quickly sheds its gained weight.</span> `;
							child.weight -= 40;
						}
					}
				} else {
					if (child.weight > -20) {
						child.weight -= 40;
						r += `${His} developing body <span class="red">quickly sheds its gained weight.</span>`;
					}
				}

				// TODO: rewrite these
				if (V.nurseryMuscles) {
					r += `${He} is being given anabolic steroids causing <span class="green">rapid muscle development.</span> `;	// TODO: not happy with this
					if (V.nurseryMusclesSetting === 2) {
						if (child.muscles < 100) {
							child.muscles += 5;
						}
						r += `${Matron ? Matron : NL > 1 ? `A nanny` : V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} notices ${he} is overly muscular and <span class="green">decreases ${his} steroid dosage.</span> `;
					} else if (V.nurseryMusclesSetting === 1) {
						if (child.muscles > 10) {
							child.muscles--;
							r += `${Matron ? Matron : NL > 1 ? `A nanny` : V.slaves[V.slaveIndices[NurseryiIDs[j]]].slaveName} notices ${he} is weak and <span class="green">increases ${his} steroid dosage.</span> `;
						} else if (child.muscles < -10) {
							child.muscles++;
							r += `${He} has <span class="lime">a healthy musculature;</span> efforts will be made to maintain it. `;
						} else {
							r += `${His} developing body <span class="red">quickly loses its gained muscle.</span> `;
						}
					} else if (V.nurseryMusclesSetting === 0) {
						if (child.muscles > -100) {
							child.muscles -= 40;
							r += `${His} developing body <span class="red">quickly loses its gained muscle.</span> `;
						}
					}
				}
			}
		} else {
			// TODO:
		}
		r += `<br>`;
	}

	return r;
};

/**
 * Creates a full report of the Nursery
 * @returns {string}
 */
// TODO: refactor this
App.Facilities.Nursery.nurseryReport = function nurseryReport() {
	"use strict";

	let r = ``;

	const
		Matron = getSlave(V.Matron.ID),
		arcology = V.arcologies[0];

	let
		NL = V.NurseryiIDs.length,
		healthBonus = 0,
		trustBonus = 0,
		idleBonus = 0,
		devBonus = 0;

	if (V.nurseryDecoration !== "standard") {
		devBonus = 1;
	}

	if (Matron) {
		const
			{
				he, him, his, himself, He, His
			} = getPronouns(Matron);

		if (Matron.health.condition < 100) {
			improveCondition(Matron, 20);
		}
		if (Matron.devotion <= 60) {
			Matron.devotion++;
		}
		if (Matron.trust <= 60) {
			Matron.trust++;
		}
		if (Matron.rules.living !== "luxurious") {
			Matron.rules.living = "luxurious";
		}

		let FLsFetish = 0;

		if (Matron.fetishStrength <= 95) {
			if (Matron.fetish !== "caring") {
				if (fetishChangeChance(Matron > jsRandom(0, 100))) {
					FLsFetish = 1, Matron.fetishKnown = 1, Matron.fetish = "caring";
				}
			} else if (!Matron.fetishKnown) {
				FLsFetish = 1, Matron.fetishKnown = 1;
			} else {
				FLsFetish = 2, Matron.fetishStrength += 4;
			}
		}

		if (Matron.fetish === "none" || Matron.fetish === "caring") {
			devBonus++;
		}

		Matron.devotion += devBonus;

		if (V.Matron !== Matron) {
			V.Matron = Matron;
		}

		r += `&nbsp;&nbsp;&nbsp;&nbsp;${SlaveFullName(Matron)} is serving as ${V.nurseryName} matron. `;

		if (Matron.relationship === -3 && Matron.devotion > 50) {
			r += `${He} tries ${his} best to ${V.nurseryChildren ? `properly take care of and raise the children` : `look after ${V.nurseryName} and keep it tidy and running smoothly`}. `;
		}

		if (FLsFetish === 1) {
			r += `${He} ${V.nurseryChildren ? `seems to have a real soft spot for children, and enjoys working with the child${V.nurseryChildren > 1 ? `ren` : ``} in ${V.nurseryName} and raising ${V.nurseryChildren > 1 ? `them` : V.cribs[0].genes === "XX" ? `her` : `him`} to be ${V.nurseryChildren > 1 ? `good slaves` : `a good slave`}` : ``/* TODO: */}. ${He} finds real satisfaction in helping your slaves find sexual gratification, and <span class="lightsalmon">becomes more caring.</span> `;
		} else if (FLsFetish === 2) {
			r += `Every new slave in the nursery is a new person ${he} gets to connect with and serve. Sexually. <span class='lightsalmon'>${He} becomes more caring.</span>`;	// TODO:
		}

		// TODO:
		if (setup.matronCareers.includes(Matron.career)) {
			r += `${He} has experience with childcare from ${his} life before ${he} was a slave, making ${him} better at properly raising children, and giving ${him} a better chance of softening flaws into beneficial quirks. `;
			idleBonus++;
		} else if (Matron.skill.matron >= V.masteredXP) {
			r += `${He} has experience with childcare from working for you, making ${him} better at properly raising children, and giving ${him} a better chance of softening flaws into beneficial quirks. `;
			idleBonus++;
		} else {
			Matron.skill.matron += jsRandom(1, (Matron.intelligence + 4) * 2);
		}

		// TODO:
		if (Matron.fetish === "none") {
			r += `${Matron.slaveName} respects the slaves working in the nursery, allowing them to care for the children more effectively. `;
			idleBonus++;
		} else if (Matron.fetish === "dom") {
			r += `${Matron.slaveName} enjoys being able to have control over the nannies. `;
			idleBonus++;
		} else if (Matron.fetishKnown) {
			r += `${Matron.slaveName} can't keep ${his} hands to ${himself}, preventing the slaves in the nursery from relaxing completely. `;
		}

		// TODO:
		if (Matron.visualAge > 35) {
			r += `${His} apparent maturity encourages the slaves in the nursery to relax and pour out their troubles to ${him}. `;
		}

		// TODO:
		if (Matron.intelligence > 0) {
			r += `${He}'s so intelligent ${he} can suss out the cause of slaves' emotional issues and counsel them effectively. `;
		}

		// TODO: write more

		if (NL < V.nursery) {
			let seed = jsRandom(1, 10) + ((V.nursery - NL) * (jsRandom(150, 170) + (idleBonus * 10)));
			cashX(seed, "nursery", Matron);
			r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;Since ${he} doesn't have enough children to occupy all ${his} time, ${V.nurseryName} takes in citizens' children on a contract basis and ${he} cares for them too, earning <span class='yellowgreen'>${cashFormat(seed)}.</span> `;
		}

		if (arcology.FSRepopulationFocus > 0 && V.nurseryBabies > 0) {
			r += `Society <span class='green'>loves</span> the way you are raising more children for ${arcology.name}. `;
			FSChange("Repopulationist", 2);
		}

		if (NL > 0) {
			r += `<br><br>`;
		}
	}

	if (NL > 0) {
		r += `&nbsp;&nbsp;&nbsp;&nbsp;<strong>${NL > 1 ? `There are ${NL} slaves` : `There is one slave`} working in ${V.nurseryName}.</strong> `;
		if (arcology.FSRepopulationFocus > 0 && V.nurseryBabies > 0) {
			r += `Society <span class="green">approves</span> of your bringing more children into this world. `;
		} else if (arcology.FSGenderFundamentalist > 0) {
			r += `Society <span class="green">approves</span> of your assigning slaves to a traditionally feminine role. `;
		}
	}

	if (Matron) {
		V.i = V.slaveIndices[Matron.ID];
		if (V.showEWD) {
			// TODO: all this
			r += `<br><br>`;
			/* 000-250-006 */
			if (V.seeImages && V.seeReportImages) {
				r += `<div class="imageRef medImg">${SlaveArt(Matron, 2, 0)}</div>`;
			}
			/* 000-250-006 */
			r += `<strong><u><span class="pink">${SlaveFullName(Matron)}</span></u></strong> is serving as the Matron in ${V.nurseryName}.`;
			r += `${saChoosesOwnClothes(Matron)}`;
			r += `<<include "SA rules">>`;
			r += `<<include "SA diet">>`;
			r += `<<include "SA long term effects">>`;
			r += `${saDrugs(Matron)}`;
			r += `<<include "SA relationships">>`;
			r += `<<include "SA rivalries">>`;
			r += `<br><<include "SA devotion">>`;
		} else {
			r += `<<silently>>
			${saChoosesOwnClothes(Matron)};
			<<include "SA rules">>
			<<include "SA diet">>
			<<include "SA long term effects">>
			${saDrugs(Matron)};
			<<include "SA relationships">>
			<<include "SA rivalries">>
			<<include "SA devotion">>
			<</silently>>`;
		}
	}

	for (let dI = 0; dI < NL; dI++) {
		const
			slave = getSlave(V.NurseryiIDs[dI]);

		V.i = App.Utils.slaveIndexForId(slave.ID);

		slave.devotion += devBonus, slave.trust += trustBonus;
		improveCondition(slave, healthBonus);

		// TODO: rework these
		if (slave.devotion < 60 && slave.trust < 60) {
			slave.devotion++, slave.trust++;
		} else if (slave.devotion < 40) {
			slave.devotion += 10;
		} else if (slave.trust < 40) {
			slave.trust += 10;
		}

		// TODO: rework this
		if (V.nurseryUpgrade === 1 && slave.health.condition < 20) {
			improveCondition(slave, 3);
		}

		// TODO:
		switch (V.nurseryDecoration) {
			case "Repopulationist":
				slave.rules.living = "luxurious";
				break;
			case "Degradationist":
				slave.rules.living = "spare";
				break;
			default:
				slave.rules.living = "normal";
				break;
		}

		// TODO:
		if (V.showEWD) {
			const
				He = slave.genes === "XX" ? `She` : `He`;

			r += `<br><br>`;
			/* 000-250-006 */
			if (V.seeImages && V.seeReportImages) {
				r += `<div class="imageRef smlImg">${SlaveArt(slave, 0, 0)}</div>`;
			}
			/* 000-250-006 */
			r += `<strong><u><span class="pink">${SlaveFullName(slave)}</span></u></strong>`;
			if (slave.choosesOwnAssignment === 2) {
				r += `${choosesOwnJob(slave)}`;
			} else {
				r += ` is working in ${V.nurseryName}. `;
			}
			// TODO: clean this mess up
			r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;${He} ${saNanny(slave)}<br>&nbsp;&nbsp;&nbsp;`;
			r += `${saChoosesOwnClothes(slave)} ${saRules(slave)}`;
			r += `<<include "SA diet">>`;					// TODO:
			r += `<<include "SA long term effects">>`;		// TODO:
			r += `${saDrugs(slave)}`;						// TODO:
			r += `<<include "SA relationships">>`;			// TODO:
			r += `<<include "SA rivalries">>`;				// TODO:
			r += `<br><<include "SA devotion">>`;			// TODO:
		} else {
			r += `<<silently>>`;
			r += `${choosesOwnJob(slave)} ${saNanny(slave)} ${saChoosesOwnClothes(slave)} ${saRules(slave)}`;
			r += `<<include "SA diet">>`;
			r += `<<include "SA long term effects">>`;
			r += `${saDrugs(slave)}`;
			r += `<<include "SA relationships">>`;
			r += `<<include "SA rivalries">>`;
			r += `<<include "SA devotion">>`;
			r += `<</silently>>`;
		}
	}

	if (NL > 0 || Matron) {
		r += `<br><br>`;
	}

	function choosesOwnJob(slave) {
		let r = ``;

		if (V.universalRulesAssignsSelfFacility && slave.devotion > 50 && canWalk(slave) && canSee(slave) && slave.sexualQuirk === "caring" && V.nurseryNannies > NL) {
			slave.choosesOwnAssignmentText += ` enjoys taking care of children, so ${he} decides to work in ${V.nurseryName}. `;
			r = slave.choosesOwnAssignmentText;
			assignJob(slave, "work as a nanny");
		}

		return r;
	}

	// function diet(slave) {
	// 	let r = ``;

	// 	return r;
	// }

	// function longTermEffects(slave) {
	// 	let r = ``;

	// 	return r;
	// }

	// function drugs(slave) {
	// 	let r = ``;

	// 	return r;
	// }

	// function relationships(slave) {
	// 	let r = ``;

	// 	return r;
	// }

	// function rivalries(slave) {
	// 	let r = ``;

	// 	return r;
	// }

	// function devotion(slave) {
	// 	let r = ``;

	// 	return r;
	// }

	return r;
};
