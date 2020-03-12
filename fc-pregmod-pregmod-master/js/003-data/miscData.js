App.Data.misc = {
	/* prosthetic stuff */
	/* do not change order, order = display order */
	prostheticIDs: ["interfaceP1", "interfaceP2", "basicL", "sexL", "beautyL", "combatL", "cyberneticL", "ocular", "cochlear", "electrolarynx", "interfaceTail", "modT", "sexT", "combatT", "erectile"],

	/* .name is expected to be singular and uncapitalized; 10 = 1 week without upgrades */
	prosthetics: {
		interfaceP1: {
			name: "basic prosthetic interface",
			adjust: 40,
			craft: 50,
			research: 100,
			level: 1,
			costs: 5000
		},
		interfaceP2: {
			name: "advanced prosthetic interface",
			adjust: 80,
			craft: 80,
			research: 160,
			level: 2,
			costs: 10000
		},
		basicL: {
			name: "set of basic prosthetic limbs",
			adjust: 40,
			craft: 40,
			research: 80,
			level: 1,
			costs: 7000
		},
		sexL: {
			name: "set of advanced sex limbs",
			adjust: 60,
			craft: 70,
			research: 140,
			level: 2,
			costs: 15000
		},
		beautyL: {
			name: "set of advanced beauty limbs",
			adjust: 60,
			craft: 70,
			research: 140,
			level: 2,
			costs: 15000
		},
		combatL: {
			name: "set of advanced combat limbs",
			adjust: 60,
			craft: 70,
			research: 140,
			level: 2,
			costs: 15000
		},
		cyberneticL: {
			name: "set of cybernetic limbs",
			adjust: 80,
			craft: 150,
			research: 250,
			level: 3,
			costs: 25000
		},
		ocular: {
			name: "ocular implant",
			adjust: 60,
			craft: 80,
			research: 150,
			level: 2,
			costs: 20000
		},
		cochlear: {
			name: "cochlear implant",
			adjust: 40,
			craft: 40,
			research: 80,
			level: 1,
			costs: 5000
		},
		electrolarynx: {
			name: "electrolarynx",
			adjust: 40,
			craft: 40,
			research: 40,
			level: 1,
			costs: 5000
		},
		interfaceTail: {
			name: "prosthetic tail interface",
			adjust: 50,
			craft: 60,
			research: 120,
			level: 1,
			costs: 5000
		},
		modT: {
			name: "modular tail",
			adjust: 40,
			craft: 40,
			research: 80,
			level: 1,
			costs: 5000
		},
		combatT: {
			name: "combat tail",
			adjust: 70,
			craft: 70,
			research: 140,
			level: 2,
			costs: 15000
		},
		sexT: {
			name: "pleasure tail",
			adjust: 60,
			craft: 60,
			research: 120,
			level: 2,
			costs: 10000
		},
		erectile: {
			name: "erectile implant",
			adjust: 40,
			craft: 50,
			research: 100,
			level: 1,
			costs: 7000
		}
	},
	/* prosthetic stuff end */

	/** * pregmod exclusive start ***/

	/* Double 20 week point for human data — not a bug. Do not change! (It's transfer point in data source, from data without CTR to with CTR) */
	/* Any profile graph data should begin from week 0. Size can be 0 or 1, but CTR should be set to the same value as next graph point.*/
	pregData: {

		human: {
			type: "human",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 40,
			minLiveBirth: 32,
			drugsEffect: 1,
			fetusWeek: [0, 9, 20, 20, 40, 52, 64, 80, 384, 99999],
			fetusSize: [1, 3, 16, 25.6, 51, 60, 67.5, 71.6, 129.5, 130],
			fetusRate: [1, 1, 1, 0.64, 0.6513, 0.6459, 0.644, 0.6393, 0.58, 0.51],
			sizeType: 0
		},

		humanWG: {
			type: "humanWG",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 40,
			minLiveBirth: 32,
			drugsEffect: 1,
			fetusWeek: [0, 8, 11, 15, 20, 28, 34, 38, 40, 42, 52, 64, 76, 88, 384, 99999],
			fetusSize: [0, 1, 7, 70, 300, 1005, 2146, 3088, 3462, 3685, 6300, 7700, 8400, 8800, 65000, 65000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		canineM: {
			type: "canineM",
			normalOvaMin: 4,
			normalOvaMax: 8,
			normalBirth: 9,
			minLiveBirth: 8,
			drugsEffect: 0.3,
			fetusWeek: [0, 4, 5, 9, 9 + 4 * 4, 9 + 12 * 4, 24 * 4, 99999],
			fetusSize: [0, 1, 165, 300, 9525, 17236, 18000, 18000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		canineL: {
			type: "canineL",
			normalOvaMin: 2,
			normalOvaMax: 6,
			normalBirth: 9,
			minLiveBirth: 8,
			drugsEffect: 0.3,
			fetusWeek: [0, 4, 5, 9, 9 + 4 * 4, 9 + 12 * 4, 24 * 4, 99999],
			fetusSize: [0, 1, 165, 453, 17236, 31751, 34000, 34000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		pig: {
			type: "pig",
			normalOvaMin: 8,
			normalOvaMax: 12,
			normalBirth: 16,
			minLiveBirth: 14,
			drugsEffect: 0.5,
			fetusWeek: [0, 3, 16, 16 + 28, 16 + 48, 99999],
			fetusSize: [0, 1, 1700, 94000, 170000, 170000],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		cow: {
			type: "cow",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 41,
			minLiveBirth: 38,
			drugsEffect: 0.05,
			fetusWeek: [0, 1 * 4, 2 * 4, 3 * 4, 4 * 4, 5 * 4, 6 * 4, 7 * 4, 8 * 4, 9 * 4, 9 * 4 + 90, 9 * 4 + 180, 99999],
			fetusSize: [0, 1, 20, 280, 1500, 3200, 6100, 15000, 23000, 50000, 350000, 500000, 500000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		equine: {
			type: "equine",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 48,
			minLiveBirth: 44,
			drugsEffect: 0.05,
			fetusWeek: [0, 5.7, 8.5, 11.4, 14.2, 21.4, 25.7, 34.2, 38.5, 45.7, 48, 192, 99999],
			fetusSize: [0, 14.1, 28.3, 56.7, 453, 2721, 11339, 20411, 34019, 54431, 57000, 600000, 600000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		}

	},
	/* Source data for canine include CTR (not head to toe size), so CTR do not apply anywhere, always 1.*/
	/* sizeType: control of source data type 0 - length in centimeters for fetusSize and CTR for fetusRate, 1 - weight in grams and womb to fetus rate, 2 - direct volume in cc, fetusRate not used*/

	/* equine: {type: "equine", normalOvaMin:1, normalOvaMax: 1, normalBirth: 48, minLiveBirth: 44, fetusWeek: [0, 4, 7, 9, 10, 12, 17, 21, 25, 34, 38, 48, 192, 99999], fetusSize: [0, 2.5, 3, 4, 6.3, 14, 17.7, 30, 61, 76.2, 92, 121, 235, 235], fetusRate: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] sizeType: 0} */

	filterRaces: ["Amerindian", "Asian", "Black", "Indo-Aryan", "Latina", "Malay", "Middle Eastern", "Mixed Race", "Pacific Islander", "Semitic", "Southern European", "White"],
	filterRacesLowercase: ["amerindian", "asian", "black", "indo-aryan", "latina", "malay", "middle eastern", "mixed race", "pacific islander", "semitic", "southern european", "white"],
	filterRegions: ["Africa", "Asia", "Australia", "Europe", "Middle East", "North America", "South America"],
	naturalSkins: ["pure white", "ivory", "white", "extremely pale", "very pale", "pale", "extremely fair", "very fair", "fair", "light", "light olive", "tan", "olive", "bronze", "dark olive", "dark", "light beige", "beige", "dark beige", "light brown", "brown", "dark brown", "black", "ebony", "pure black"],
	dyedSkins: ["camouflage patterned", "dyed blue", "dyed gray", "dyed green", "dyed pink", "dyed red", "tiger striped"],
	naturalNippleColors: ["black", "brown", "dark brown", "ebony", "ivory", "light brown", "pale pink", "pink"],

	/* START Custom Nationalities region filter */
	/* Not currently weighted, but will accept weights */
	northamericaNationalities: {
		"American": 1,
		"Antiguan": 1,
		"Aruban": 1,
		"Bahamian": 1,
		"Barbadian": 1,
		"Belizean": 1,
		"Bermudian": 1,
		"Canadian": 1,
		"Costa Rican": 1,
		"Cuban": 1,
		"Curaçaoan": 1,
		"Dominican": 1,
		"Dominiquais": 1,
		"Greenlandic": 1,
		"Grenadian": 1,
		"Guatemalan": 1,
		"Haitian": 1,
		"Honduran": 1,
		"Jamaican": 1,
		"Kittitian": 1,
		"Mexican": 1,
		"Nicaraguan": 1,
		"Panamanian": 1,
		"Puerto Rican": 1,
		"Saint Lucian": 1,
		"Salvadoran": 1,
		"Trinidadian": 1,
		"Vincentian": 1
	},

	southamericaNationalities: {
		"Argentinian": 1,
		"Bolivian": 1,
		"Brazilian": 1,
		"Chilean": 1,
		"Colombian": 1,
		"Ecuadorian": 1,
		"French Guianan": 1,
		"Guyanese": 1,
		"Paraguayan": 1,
		"Peruvian": 1,
		"Surinamese": 1,
		"Uruguayan": 1,
		"Venezuelan": 1
	},

	europeNationalities: {
		"Albanian": 1,
		"Andorran": 1,
		"Austrian": 1,
		"Belarusian": 1,
		"Belgian": 1,
		"Bosnian": 1,
		"British": 1,
		"Bulgarian": 1,
		"Catalan": 1,
		"Croatian": 1,
		"Czech": 1,
		"Danish": 1,
		"Dutch": 1,
		"Estonian": 1,
		"Finnish": 1,
		"French": 1,
		"German": 1,
		"Greek": 1,
		"Hungarian": 1,
		"Icelandic": 1,
		"Irish": 1,
		"Italian": 1,
		"Kosovan": 1,
		"Latvian": 1,
		"a Liechtensteiner": 1,
		"Lithuanian": 1,
		"Luxembourgian": 1,
		"Macedonian": 1,
		"Maltese": 1,
		"Moldovan": 1,
		"Monégasque": 1,
		"Montenegrin": 1,
		"Norwegian": 1,
		"Polish": 1,
		"Portuguese": 1,
		"Romanian": 1,
		"Russian": 1,
		"Sammarinese": 1,
		"Scottish": 1,
		"Serbian": 1,
		"Slovak": 1,
		"Slovene": 1,
		"Spanish": 1,
		"Swedish": 1,
		"Swiss": 1,
		"Ukrainian": 1,
		"Vatican": 1
	},

	asiaNationalities: {
		"Bangladeshi": 1,
		"Bhutanese": 1,
		"Bruneian": 1,
		"Burmese": 1,
		"Cambodian": 1,
		"Chinese": 1,
		"East Timorese": 1,
		"Filipina": 1,
		"Indian": 1,
		"Indonesian": 1,
		"Japanese": 1,
		"Kazakh": 1,
		"Korean": 1,
		"Kyrgyz": 1,
		"Laotian": 1,
		"Malaysian": 1,
		"Maldivian": 1,
		"Mongolian": 1,
		"Nepalese": 1,
		"Pakistani": 1,
		"Singaporean": 1,
		"Sri Lankan": 1,
		"Taiwanese": 1,
		"Tajik": 1,
		"Thai": 1,
		"Tibetan": 1,
		"Turkmen": 1,
		"Uzbek": 1,
		"Vietnamese": 1
	},

	middleeastNationalities: {
		"Afghan": 1,
		"Armenian": 1,
		"Azerbaijani": 1,
		"Bahraini": 1,
		"Cypriot": 1,
		"Egyptian": 1,
		"Emirati": 1,
		"Georgian": 1,
		"Iranian": 1,
		"Iraqi": 1,
		"Israeli": 1,
		"Jordanian": 1,
		"Kurdish": 1,
		"Kuwaiti": 1,
		"Lebanese": 1,
		"Omani": 1,
		"Palestinian": 1,
		"Qatari": 1,
		"Saudi": 1,
		"Syrian": 1,
		"Turkish": 1,
		"Yemeni": 1
	},

	africaNationalities: {
		"Algerian": 1,
		"Angolan": 1,
		"Beninese": 1,
		"Bissau-Guinean": 1,
		"Burkinabé": 1,
		"Burundian": 1,
		"Cameroonian": 1,
		"Cape Verdean": 1,
		"Central African": 1,
		"Chadian": 1,
		"Comorian": 1,
		"Congolese": 1,
		"Djiboutian": 1,
		"Equatoguinean": 1,
		"Eritrean": 1,
		"Ethiopian": 1,
		"Gabonese": 1,
		"Gambian": 1,
		"Ghanan": 1,
		"Guinean": 1,
		"Ivorian": 1,
		"Kenyan": 1,
		"Liberian": 1,
		"Libyan": 1,
		"Malagasy": 1,
		"Malawian": 1,
		"Malian": 1,
		"Mauritanian": 1,
		"Mauritian": 1,
		"Moroccan": 1,
		"Mosotho": 1,
		"Motswana": 1,
		"Mozambican": 1,
		"Namibian": 1,
		"Nigerian": 1,
		"Nigerien": 1,
		"Rwandan": 1,
		"Sahrawi": 1,
		"São Toméan": 1,
		"Senegalese": 1,
		"Seychellois": 1,
		"Sierra Leonean": 1,
		"Somali": 1,
		"South African": 1,
		"South Sudanese": 1,
		"Sudanese": 1,
		"Swazi": 1,
		"Tanzanian": 1,
		"Togolese": 1,
		"Tunisian": 1,
		"Ugandan": 1,
		"Zairian": 1,
		"Zambian": 1,
		"Zimbabwean": 1
	},

	australiaNationalities: {
		"Australian": 1,
		"a Cook Islander": 1,
		"Fijian": 1,
		"French Polynesian": 1,
		"Guamanian": 1,
		"I-Kiribati": 1,
		"Marshallese": 1,
		"Micronesian": 1,
		"Nauruan": 1,
		"New Caledonian": 1,
		"a New Zealander": 1,
		"Ni-Vanuatu": 1,
		"Niuean": 1,
		"Palauan": 1,
		"Papua New Guinean": 1,
		"Samoan": 1,
		"a Solomon Islander": 1,
		"Tongan": 1,
		"Tuvaluan": 1
	},

	/* END Custom Nationalities region filter */

	/** * pregmod exclusive end ***/

	/* Nationality-to-race weighted objects */
	raceSelector: {
		"Afghan": {"indo-aryan": 28, "middle eastern": 2, "mixed race": 2},
		"Albanian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 42
		},
		"Algerian": {"middle eastern": 38, "mixed race": 2, "southern european": 1},
		"American": {
			"amerindian": 1,
			"asian": 4,
			"black": 10,
			"indo-aryan": 3,
			"latina": 8,
			"malay": 1,
			"middle eastern": 4,
			"mixed race": 2,
			"pacific islander": 1,
			"semitic": 3,
			"southern european": 4,
			"white": 30
		},
		"Andorran": {
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 8,
			"white": 3
		},
		"Angolan": {"black": 14, "mixed race": 1, "white": 1},
		"Antiguan": {
			"black": 17,
			"indo-aryan": 1,
			"latina": 2,
			"mixed race": 4,
			"white": 1
		},
		"Argentinian": {
			"amerindian": 1,
			"latina": 8,
			"mixed race": 2,
			"southern european": 5,
			"white": 3
		},
		"Armenian": {
			"indo-aryan": 4,
			"mixed race": 2,
			"semitic": 9,
			"southern european": 1,
			"white": 2
		},
		"Aruban": {
			"amerindian": 2,
			"black": 4,
			"latina": 2,
			"mixed race": 12,
			"white": 2
		},
		"Australian": {
			"asian": 4,
			"black": 2,
			"indo-aryan": 1,
			"malay": 1,
			"mixed race": 2,
			"pacific islander": 6,
			"southern european": 1,
			"white": 18
		},
		"Austrian": {"indo-aryan": 1, "mixed race": 1, "white": 10},
		"Azerbaijani": {
			"indo-aryan": 14,
			"mixed race": 1,
			"semitic": 4,
			"white": 1
		},
		"Bahamian": {
			"asian": 1,
			"black": 36,
			"latina": 1,
			"mixed race": 1,
			"white": 1
		},
		"Bahraini": {"indo-aryan": 9, "middle eastern": 10, "mixed race": 2},
		"Bangladeshi": {"asian": 1, "indo-aryan": 32, "mixed race": 2},
		"Barbadian": {
			"black": 26,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Belarusian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"white": 17
		},
		"Belgian": {
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 2,
			"white": 10
		},
		"Belizean": {
			"amerindian": 1,
			"black": 2,
			"indo-aryan": 1,
			"latina": 8,
			"mixed race": 2,
			"white": 1
		},
		"Beninese": {"black": 22, "indo-aryan": 1, "mixed race": 2},
		"Bermudian": {
			"asian": 1,
			"black": 8,
			"mixed race": 2,
			"white": 5
		},
		"Bhutanese": {"asian": 12, "indo-aryan": 2, "mixed race": 1},
		"Bissau-Guinean": {"black": 47, "mixed race": 2, "southern european": 1},
		"Bolivian": {
			"amerindian": 9,
			"latina": 9,
			"mixed race": 3,
			"white": 1
		},
		"Bosnian": {"indo-aryan": 1, "mixed race": 1, "white": 23},
		"Brazilian": {
			"amerindian": 1,
			"asian": 1,
			"black": 2,
			"latina": 3,
			"mixed race": 4,
			"white": 6
		},
		"British": {
			"asian": 2,
			"black": 3,
			"indo-aryan": 3,
			"malay": 1,
			"middle eastern": 2,
			"mixed race": 2,
			"semitic": 2,
			"southern european": 4,
			"white": 34
		},
		"Bruneian": {
			"asian": 10,
			"indo-aryan": 5,
			"malay": 28,
			"mixed race": 1
		},
		"Bulgarian": {
			"indo-aryan": 4,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 44
		},
		"Burkinabé": {"black": 12, "middle eastern": 1, "mixed race": 1},
		"Burmese": {
			"asian": 8,
			"indo-aryan": 4,
			"malay": 1,
			"mixed race": 2
		},
		"Burundian": {"black": 48, "mixed race": 1, "white": 1},
		"Cambodian": {"asian": 23, "malay": 1, "mixed race": 1},
		"Cameroonian": {"black": 60, "middle eastern": 1, "mixed race": 1},
		"Canadian": {
			"amerindian": 2,
			"asian": 2,
			"black": 2,
			"indo-aryan": 2,
			"latina": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 2,
			"white": 28
		},
		"Cape Verdean": {
			"black": 6,
			"mixed race": 30,
			"southern european": 2,
			"white": 1
		},
		"Catalan": {
			"latina": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 14,
			"white": 1
		},
		"Central African": {"black": 14, "middle eastern": 1, "mixed race": 1},
		"Chadian": {"black": 15, "middle eastern": 3, "mixed race": 2},
		"Chilean": {
			"amerindian": 1,
			"latina": 6,
			"mixed race": 2,
			"southern european": 3,
			"white": 2
		},
		"Chinese": {"asian": 70, "indo-aryan": 1, "mixed race": 1},
		"Colombian": {
			"amerindian": 1,
			"black": 2,
			"latina": 20,
			"mixed race": 2,
			"southern european": 1,
			"white": 1
		},
		"Comorian": {"black": 11, "middle eastern": 2, "mixed race": 2},
		"Congolese": {"black": 18, "mixed race": 1, "white": 1},
		"a Cook Islander": {"mixed race": 2, "pacific islander": 30, "white": 1},
		"Costa Rican": {
			"amerindian": 1,
			"black": 1,
			"latina": 11,
			"mixed race": 2,
			"white": 2
		},
		"Croatian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 27
		},
		"Cuban": {
			"black": 3,
			"latina": 10,
			"mixed race": 4,
			"southern european": 2,
			"white": 1
		},
		"Curaçaoan": {
			"black": 7,
			"indo-aryan": 1,
			"latina": 1,
			"malay": 1,
			"mixed race": 1,
			"white": 1
		},
		"Cypriot": {
			"indo-aryan": 4,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 6
		},
		"Czech": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 1,
			"white": 26
		},
		"Danish": {
			"amerindian": 1,
			"indo-aryan": 2,
			"middle eastern": 2,
			"mixed race": 1,
			"white": 16
		},
		"Djiboutian": {
			"black": 18,
			"middle eastern": 4,
			"mixed race": 2,
			"southern european": 1,
			"white": 1
		},
		"Dominican": {
			"black": 2,
			"latina": 7,
			"mixed race": 2,
			"white": 2
		},
		"Dominiquais": {
			"amerindian": 1,
			"black": 11,
			"mixed race": 3,
			"white": 1
		},
		"Dutch": {
			"indo-aryan": 1,
			"malay": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 16
		},
		"East Timorese": {
			"asian": 1,
			"mixed race": 2,
			"malay": 8,
			"pacific islander": 3
		},
		"Ecuadorian": {
			"amerindian": 2,
			"black": 2,
			"latina": 9,
			"mixed race": 2,
			"southern european": 1,
			"white": 2
		},
		"Egyptian": {
			"black": 2,
			"indo-aryan": 1,
			"middle eastern": 25,
			"mixed race": 2,
			"semitic": 1
		},
		"Emirati": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 16,
			"middle eastern": 6,
			"mixed race": 2
		},
		"Equatoguinean": {"black": 22, "mixed race": 2, "southern european": 1},
		"Eritrean": {
			"black": 14,
			"middle eastern": 6,
			"mixed race": 2,
			"semitic": 2,
			"southern european": 1
		},
		"Estonian": {"mixed race": 1, "semitic": 1, "white": 23},
		"Ethiopian": {
			"black": 10,
			"middle eastern": 3,
			"mixed race": 1,
			"semitic": 2
		},
		"Fijian": {
			"asian": 1,
			"indo-aryan": 6,
			"mixed race": 1,
			"pacific islander": 8,
			"white": 1
		},
		"Filipina": {
			"asian": 4,
			"latina": 1,
			"malay": 10,
			"pacific islander": 4,
			"mixed race": 2,
			"southern european": 1
		},
		"Finnish": {
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 32
		},
		"French": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 2,
			"white": 22
		},
		"French Guianan": {
			"amerindian": 1,
			"asian": 1,
			"black": 3,
			"mixed race": 10,
			"southern european": 1,
			"white": 3
		},
		"French Polynesian": {
			"asian": 3,
			"mixed race": 1,
			"pacific islander": 15,
			"white": 1
		},
		"Gabonese": {"black": 21, "mixed race": 2, "white": 2},
		"Gambian": {"black": 28, "middle eastern": 1, "mixed race": 2},
		"Georgian": {
			"indo-aryan": 6,
			"mixed race": 1,
			"semitic": 7,
			"southern european": 1,
			"white": 2
		},
		"German": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 2,
			"white": 20
		},
		"Ghanan": {
			"asian": 1,
			"black": 14,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"semitic": 1
		},
		"Greek": {
			"indo-aryan": 2,
			"mixed race": 1,
			"southern european": 11,
			"white": 3
		},
		"Greenlandic": {"amerindian": 44, "mixed race": 1, "white": 6},
		"Grenadian": {
			"black": 18,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Guamanian": {
			"asian": 2,
			"malay": 1,
			"mixed race": 1,
			"pacific islander": 6,
			"white": 1
		},
		"Guatemalan": {
			"amerindian": 8,
			"latina": 9,
			"mixed race": 2,
			"white": 2
		},
		"Guinean": {"black": 33, "middle eastern": 1, "mixed race": 1},
		"Guyanese": {
			"amerindian": 2,
			"black": 4,
			"indo-aryan": 3,
			"mixed race": 1
		},
		"Haitian": {"black": 18, "mixed race": 1, "white": 1},
		"Honduran": {
			"amerindian": 10,
			"black": 1,
			"latina": 48,
			"mixed race": 4,
			"white": 1
		},
		"Hungarian": {"indo-aryan": 2, "mixed race": 1, "white": 9},
		"I-Kiribati": {"asian": 1, "mixed race": 2, "pacific islander": 22},
		"Icelandic": {"asian": 1, "mixed race": 1, "white": 50},
		"Indian": {
			"asian": 1,
			"indo-aryan": 70,
			"mixed race": 1,
			"white": 1
		},
		"Indonesian": {
			"asian": 4,
			"indo-aryan": 1,
			"malay": 39,
			"middle eastern": 2,
			"mixed race": 2,
			"pacific islander": 2
		},
		"Iranian": {
			"indo-aryan": 15,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1
		},
		"Iraqi": {
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 8,
			"mixed race": 1,
			"semitic": 2
		},
		"Irish": {"indo-aryan": 1, "mixed race": 1, "white": 28},
		"Israeli": {
			"black": 1,
			"indo-aryan": 1,
			"middle eastern": 2,
			"mixed race": 1,
			"semitic": 9,
			"white": 2
		},
		"Italian": {
			"asian": 1,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 10,
			"white": 4
		},
		"Ivorian": {
			"black": 16,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 1
		},
		"Jamaican": {"black": 11, "indo-aryan": 1, "mixed race": 2},
		"Japanese": {
			"asian": 71,
			"latina": 1,
			"mixed race": 1,
			"pacific islander": 1,
			"white": 1
		},
		"Jordanian": {
			"indo-aryan": 1,
			"middle eastern": 15,
			"mixed race": 3,
			"semitic": 3
		},
		"Kazakh": {
			"asian": 2,
			"indo-aryan": 6,
			"mixed race": 1,
			"semitic": 1,
			"white": 2
		},
		"Kenyan": {
			"black": 16,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 1
		},
		"Kittitian": {
			"black": 18,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Korean": {"asian": 28, "indo-aryan": 1, "mixed race": 1},
		"Kosovan": {
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 20
		},
		"Kurdish": {
			"indo-aryan": 10,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 2
		},
		"Kuwaiti": {
			"black": 1,
			"indo-aryan": 5,
			"middle eastern": 12,
			"mixed race": 2
		},
		"Kyrgyz": {
			"asian": 5,
			"indo-aryan": 9,
			"mixed race": 2,
			"white": 4
		},
		"Laotian": {"asian": 38, "malay": 1, "mixed race": 1},
		"Latvian": {
			"indo-aryan": 1,
			"mixed race": 2,
			"semitic": 1,
			"white": 51
		},
		"Lebanese": {
			"indo-aryan": 1,
			"middle eastern": 9,
			"mixed race": 2,
			"semitic": 2
		},
		"Liberian": {"black": 11, "middle eastern": 1, "mixed race": 2},
		"Libyan": {"black": 1, "middle eastern": 58, "mixed race": 1},
		"a Liechtensteiner": {
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 20
		},
		"Lithuanian": {
			"indo-aryan": 1,
			"mixed race": 2,
			"semitic": 1,
			"white": 56
		},
		"Luxembourgian": {"mixed race": 1, "southern european": 3, "white": 7},
		"Macedonian": {"indo-aryan": 2, "mixed race": 1, "white": 16},
		"Malagasy": {
			"asian": 1,
			"black": 10,
			"indo-aryan": 4,
			"mixed race": 2,
			"white": 1
		},
		"Malawian": {"black": 18, "indo-aryan": 1, "mixed race": 1},
		"Malaysian": {
			"asian": 2,
			"indo-aryan": 1,
			"malay": 7,
			"mixed race": 1
		},
		"Maldivian": {"indo-aryan": 14, "middle eastern": 1, "mixed race": 1},
		"Malian": {"black": 12, "middle eastern": 2, "mixed race": 1},
		"Maltese": {
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 20,
			"white": 5
		},
		"Marshallese": {"asian": 1, "mixed race": 1, "pacific islander": 10},
		"Mauritanian": {"black": 8, "middle eastern": 5, "mixed race": 1},
		"Mauritian": {
			"asian": 1,
			"black": 4,
			"indo-aryan": 8,
			"mixed race": 3,
			"white": 1
		},
		"Mexican": {
			"amerindian": 2,
			"asian": 1,
			"black": 2,
			"latina": 10,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 5
		},
		"Micronesian": {
			"asian": 1,
			"mixed race": 1,
			"pacific islander": 22,
			"white": 1
		},
		"Moldovan": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"white": 15
		},
		"Monégasque": {
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 14,
			"white": 14
		},
		"Mongolian": {"asian": 21, "indo-aryan": 2, "mixed race": 2},
		"Montenegrin": {"indo-aryan": 1, "mixed race": 1, "white": 14},
		"Moroccan": {
			"asian": 1,
			"black": 3,
			"middle eastern": 30,
			"mixed race": 2,
			"southern european": 1
		},
		"Mosotho": {"black": 68, "mixed race": 1, "white": 1},
		"Motswana": {"black": 38, "mixed race": 1, "white": 1},
		"Mozambican": {
			"black": 41,
			"indo-aryan": 1,
			"mixed race": 2,
			"southern european": 1
		},
		"Namibian": {"black": 21, "mixed race": 2, "white": 2},
		"Nauruan": {"asian": 1, "mixed race": 1, "pacific islander": 42},
		"Nepalese": {"asian": 8, "indo-aryan": 3, "mixed race": 1},
		"New Caledonian": {
			"asian": 1,
			"malay": 1,
			"mixed race": 1,
			"pacific islander": 6,
			"white": 3
		},
		"a New Zealander": {
			"asian": 3,
			"mixed race": 1,
			"pacific islander": 5,
			"white": 17
		},
		"Ni-Vanuatu": {"mixed race": 1, "pacific islander": 48, "white": 1},
		"Nicaraguan": {
			"amerindian": 1,
			"black": 3,
			"latina": 10,
			"mixed race": 1,
			"white": 6
		},
		"Nigerian": {
			"black": 36,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 1
		},
		"Nigerien": {"black": 18, "middle eastern": 1, "mixed race": 1},
		"Niuean": {
			"asian": 3,
			"pacific islander": 20,
			"mixed race": 5,
			"white": 3
		},
		"Norwegian": {
			"black": 1,
			"indo-aryan": 1,
			"mixed race": 1,
			"white": 27
		},
		"Omani": {
			"black": 3,
			"indo-aryan": 9,
			"malay": 2,
			"middle eastern": 9,
			"mixed race": 2
		},
		"Pakistani": {"indo-aryan": 28, "mixed race": 2, "semitic": 2},
		"Palauan": {"asian": 7, "mixed race": 1, "pacific islander": 25},
		"Palestinian": {
			"indo-aryan": 1,
			"middle eastern": 9,
			"mixed race": 1,
			"semitic": 2
		},
		"Panamanian": {
			"amerindian": 3,
			"asian": 1,
			"black": 2,
			"latina": 12,
			"mixed race": 2,
			"white": 3
		},
		"Papua New Guinean": {"malay": 6, "mixed race": 1, "pacific islander": 3},
		"Paraguayan": {
			"asian": 1,
			"black": 1,
			"latina": 15,
			"mixed race": 2,
			"white": 5
		},
		"Peruvian": {
			"amerindian": 12,
			"asian": 1,
			"latina": 9,
			"mixed race": 4,
			"southern european": 2
		},
		"Polish": {
			"asian": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 52
		},
		"Portuguese": {
			"black": 1,
			"indo-aryan": 1,
			"latina": 1,
			"mixed race": 2,
			"southern european": 11,
			"white": 2
		},
		"Puerto Rican": {
			"amerindian": 1,
			"asian": 1,
			"black": 2,
			"latina": 20,
			"mixed race": 2,
			"white": 12
		},
		"Qatari": {
			"asian": 2,
			"indo-aryan": 7,
			"middle eastern": 10,
			"mixed race": 1
		},
		"Romanian": {
			"indo-aryan": 3,
			"mixed race": 1,
			"semitic": 2,
			"white": 20
		},
		"Russian": {
			"amerindian": 1,
			"asian": 2,
			"indo-aryan": 5,
			"mixed race": 2,
			"semitic": 2,
			"southern european": 2,
			"white": 50
		},
		"Rwandan": {"black": 48, "mixed race": 1, "white": 1},
		"Sahrawi": {"black": 5, "middle eastern": 7, "mixed race": 2},
		"Saint Lucian": {"black": 11, "indo-aryan": 1, "mixed race": 3},
		"Salvadoran": {"latina": 9, "mixed race": 1, "white": 2},
		"Sammarinese": {"mixed race": 1, "southern european": 10, "white": 1},
		"Samoan": {"mixed race": 2, "pacific islander": 49, "white": 1},
		"São Toméan": {
			"asian": 1,
			"black": 6,
			"mixed race": 6,
			"southern european": 1
		},
		"Saudi": {
			"asian": 2,
			"black": 2,
			"indo-aryan": 2,
			"middle eastern": 20,
			"mixed race": 1
		},
		"Scottish": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 1,
			"white": 52
		},
		"Senegalese": {
			"asian": 1,
			"black": 42,
			"middle eastern": 2,
			"mixed race": 3,
			"white": 2
		},
		"Serbian": {"indo-aryan": 1, "mixed race": 1, "white": 10},
		"Seychellois": {
			"asian": 1,
			"black": 4,
			"indo-aryan": 1,
			"mixed race": 9,
			"southern european": 1,
			"white": 3
		},
		"Sierra Leonean": {"black": 15, "middle eastern": 1, "mixed race": 2},
		"Singaporean": {
			"asian": 16,
			"indo-aryan": 4,
			"malay": 6,
			"mixed race": 1
		},
		"Slovak": {"indo-aryan": 2, "mixed race": 1, "white": 22},
		"Slovene": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 22
		},
		"a Solomon Islander": {
			"asian": 1,
			"mixed race": 1,
			"pacific islander": 22,
			"white": 1
		},
		"Somali": {
			"black": 56,
			"indo-aryan": 1,
			"middle eastern": 2,
			"mixed race": 1
		},
		"South African": {
			"asian": 1,
			"black": 22,
			"indo-aryan": 1,
			"malay": 1,
			"mixed race": 5,
			"semitic": 1,
			"southern european": 1,
			"white": 5
		},
		"South Sudanese": {"black": 16, "middle eastern": 3, "mixed race": 1},
		"Spanish": {
			"asian": 1,
			"indo-aryan": 1,
			"latina": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"semitic": 1,
			"southern european": 15,
			"white": 3
		},
		"Sri Lankan": {
			"indo-aryan": 34,
			"malay": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 1,
			"white": 1
		},
		"Sudanese": {"black": 3, "middle eastern": 16, "mixed race": 1},
		"Surinamese": {
			"amerindian": 1,
			"black": 7,
			"indo-aryan": 7,
			"malay": 4,
			"mixed race": 3
		},
		"Swazi": {
			"black": 32,
			"indo-aryan": 1,
			"mixed race": 1,
			"white": 1
		},
		"Swedish": {
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 2,
			"mixed race": 1,
			"white": 18
		},
		"Swiss": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 2,
			"white": 10
		},
		"Syrian": {
			"indo-aryan": 2,
			"middle eastern": 8,
			"mixed race": 1,
			"semitic": 2
		},
		"Taiwanese": {"asian": 18, "malay": 1, "mixed race": 1},
		"Tajik": {
			"asian": 2,
			"indo-aryan": 11,
			"mixed race": 1,
			"white": 1
		},
		"Tanzanian": {
			"black": 46,
			"middle eastern": 2,
			"mixed race": 1,
			"semitic": 1
		},
		"Thai": {
			"asian": 25,
			"indo-aryan": 1,
			"malay": 4,
			"mixed race": 1,
			"white": 1
		},
		"Tibetan": {"asian": 14, "indo-aryan": 1, "mixed race": 1},
		"Togolese": {
			"black": 27,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 1
		},
		"Tongan": {
			"asian": 1,
			"mixed race": 1,
			"pacific islander": 47,
			"white": 1
		},
		"Trinidadian": {
			"black": 3,
			"indo-aryan": 3,
			"mixed race": 2,
			"white": 1
		},
		"Tunisian": {"middle eastern": 33, "mixed race": 1, "southern european": 1},
		"Turkish": {
			"indo-aryan": 33,
			"middle eastern": 2,
			"mixed race": 1,
			"semitic": 2,
			"southern european": 1,
			"white": 1
		},
		"Turkmen": {
			"asian": 2,
			"indo-aryan": 11,
			"mixed race": 1,
			"semitic": 1,
			"white": 3
		},
		"Tuvaluan": {"mixed race": 1, "pacific islander": 48, "white": 1},
		"Ugandan": {"black": 19, "indo-aryan": 1, "mixed race": 2},
		"Ukrainian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"white": 25
		},
		"Uruguayan": {
			"amerindian": 1,
			"black": 2,
			"latina": 12,
			"mixed race": 1,
			"southern european": 2,
			"white": 1
		},
		"Uzbek": {
			"asian": 3,
			"indo-aryan": 9,
			"mixed race": 1,
			"semitic": 2,
			"white": 3
		},
		"Vatican": {
			"latina": 2,
			"mixed race": 1,
			"southern european": 5,
			"white": 5
		},
		"Venezuelan": {
			"amerindian": 1,
			"black": 1,
			"latina": 15,
			"mixed race": 5,
			"white": 3
		},
		"Vietnamese": {"asian": 10, "malay": 1, "mixed race": 1},
		"Vincentian": {
			"black": 12,
			"indo-aryan": 2,
			"mixed race": 5,
			"white": 1
		},
		"Yemeni": {
			"black": 2,
			"indo-aryan": 1,
			"middle eastern": 8,
			"mixed race": 1,
			"semitic": 2
		},
		"Zairian": {"black": 23, "mixed race": 1, "white": 1},
		"Zambian": {
			"black": 38,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Zimbabwean": {"black": 28, "mixed race": 1, "white": 1},
		"": {"mixed race": 1, "white": 9} /* default mix */
	},

	servantMilkersJobs: ["be a servant", "be a subordinate slave", "please you", "recruit girls", "rest", "stay confined", "take classes", "work as a servant"],

	pettyCriminalPool: ["armed robbery", "arson", "assault", "battery", "blackmail", "burglary", "cat burglar", "child abuse", "child molestation", "domestic abuse", "illegal immigrant", "manslaughter", "mule", "murder", "petty theft", "pickpocketing", "rape", "robbery", "tax evasion", "theft"],

	gangCriminalPool: ["arms smuggler", "assassin", "attempted murder", "drug peddler", "drug smuggler", "fence", "gang assaulter", "gang bruiser", "gang murderer", "gang thief", "hitman", "manslaughter", "mule", "murder", "smuggler"],

	whiteCollarCriminalPool: ["abuse of power", "blackmail", "bribery", "embezzlement", "fraud", "malpractice", "racketeering", "tax evasion"],

	militaryCriminalPool: ["deserter", "gunner", "officer", "private", "sniper", "soldier", "specOps", "spy", "terrorist", "war criminal"],

	fakeBellies: ["a huge empathy belly", "a large empathy belly", "a medium empathy belly", "a small empathy belly"],
	/* lets fake bellies be separated from other .bellyAccessory */

	modestClothes: ["a ball gown", "a biyelgee costume", "a bunny outfit", "a burkini", "a burqa", "a comfortable bodysuit", "a cybersuit", "a dirndl", "a gothic lolita dress", "a halter top dress", "a hanbok", "a hijab and abaya", "a hijab and blouse", "a huipil", "a kimono", "a klan robe", "a latex catsuit", "a leotard", "a long qipao", "a maternity dress", "a military uniform", "a mini dress", "a mounty outfit", "a nice maid outfit", "a nice nurse outfit", "a niqab and abaya", "a one-piece swimsuit", "a penitent nuns habit", "a police uniform", "a red army uniform", "a schoolgirl outfit", "a schutzstaffel uniform", "a slave gown", "a slutty maid outfit", "a slutty nurse outfit", "a slutty qipao", "a sweater and cutoffs", "a t-shirt and jeans", "a toga", "an oversized t-shirt and boyshorts", "battlearmor", "battledress", "conservative clothing", "cutoffs and a t-shirt", "leather pants and a tube top", "lederhosen", "nice business attire", "restrictive latex", "slutty business attire", "spats and a tank top", "sport shorts and a sports bra", "sport shorts and a t-shirt", "stretch pants and a crop-top"],

	sluttyClothes: ["a bimbo outfit", "a chattel habit", "a cheerleader outfit", "a fallen nuns habit", "a schoolgirl outfit", "a skimpy loincloth", "a slutty klan robe", "a slutty maid outfit", "a slutty nurse outfit", "a slutty outfit", "a slutty pony outfit", "a slutty qipao", "a slutty schutzstaffel uniform", "a string bikini", "a succubus outfit", "a t-shirt and panties", "a t-shirt and thong", "a tank-top and panties", "a tube top and thong", "attractive lingerie", "attractive lingerie for a pregnant woman", "clubslut netting", "kitty lingerie", "leather pants and a tube top", "leather pants and pasties", "panties and pasties", "pasties", "slutty business attire", "slutty jewelry", "sport shorts and a sports bra", "striped underwear"],

	/* stuff that reveals genitals */
	humiliatingClothes: ["a bra", "a button-up shirt", "a chattel habit", "a fallen nuns habit", "a skimpy loincloth", "a sports bra", "a string bikini", "a striped bra", "a succubus outfit", "a sweater", "a t-shirt", "a tank-top", "a thong", "a tube top", "clubslut netting", "pasties", "restrictive latex", "shibari ropes", "slutty jewelry", "uncomfortable straps", "Western clothing"],

	highHeels: ["boots", "extreme heels", "extreme platform heels", "heels", "platform heels", "pumps"],
	heightBoostingShoes: ["extreme heels", "extreme platform heels", "heels", "platform heels", "platform shoes", "pumps"],

	veryYoungCareers: ["a babysitter", "a beggar", "a beggar", "a bully hunter", "a bully", "a camp counselor", "a cheerleader", "a child actress", "a child prodigy", "a child prostitute", "a child prostitute", "a child soldier", "a child soldier", "a club manager", "a club recruiter", "a club treasurer", "a cum dump", "a dropout", "a dropout", "a drug mule", "a farmer's daughter", "a girl scout", "a girl scout", "a hall monitor", "a handmaiden", "a hospital volunteer", "a housesitter", "a juvenile delinquent", "a juvenile delinquent", "a latchkey kid", "a lemonade stand operator", "a marching band leader", "a meat toilet", "a military brat", "a model-UN star", "a model", "a noblewoman", "a pageant star", "a paper girl", "a part-time farm laborer", "a pick-pocket", "a refugee", "a refugee", "a refugee", "a school nurse's assistant", "a shrine maiden", "a street thug", "a street urchin", "a street urchin", "a street urchin", "a student council president", "a student from a boarding school", "a student from a private school", "a student from a public school", "a student from a public school", "a student from a public school", "a student from a public school", "a student from a public school", "a sweatshop worker", "a sweatshop worker", "a sweatshop worker", "a sweatshop worker", "a teacher's pet", "an apprentice", "an aspiring pop star", "an idol", "an orphan", "an orphan", "an orphan", "an orphan", "an orphan", "being homeschooled by her parents", "captain of the kendo club", "from a lower class family", "from a lower class family", "from a lower class family", "from a middle class family", "from a middle class family", "from an upper class family", "homeless", "homeless", "homeless"],
	/* pregmod */

	youngCareers: ["a babysitter", "a ballerina", "a barista", "a bartender", "a beggar", "a blogger", "a butler", "a camgirl", "a camp counselor", "a camwhore", "a cashier", "a cheerleader", "a cocktail waitress", "a comedian", "a con artist", "a cook", "a courier", "a cowgirl", "a criminal", "a croupier", "a cum dump", "a dairy worker", "a dancer", "a delivery woman", "a dominatrix", "a drug mule", "a factory worker", "a farm laborer", "a farm laborer", "a farmer's daughter", "a florist", "a gang member", "a gang member", "a gardener", "a groomer", "a gymnast", "a handmaiden", "a house DJ", "a housesitter", "a housewife", "a law enforcement officer", "a lifeguard", "a magician's assistant", "a maid", "a mail-order bride", "a masseuse", "a meat toilet", "a mechanic", "a medical student", "a mistress", "a model", "a musician", "a noblewoman", "a nun", "a nurse", "a paramedic", "a party girl", "a personal assistant", "a personal trainer", "a pirate", "a political activist", "a porn star", "a prisoner", "a programmer", "a prostitute", "a racing driver", "a reality show star", "a receptionist", "a refugee", "a ride attendant", "a saleswoman", "a school nurse", "a secretary", "a security guard", "a service worker", "a shrine maiden", "a shut-in", "a soldier", "a street performer", "a street vendor", "a stripper", "a student", "a student", "a student", "a switchboard operator", "a teaching assistant", "a tour guide", "a trophy wife", "a truck driver", "a video game streamer", "a waitress", "a wet nurse", "a yoga instructor", "an actress", "an air hostess", "an apprentice", "an arcade attendant", "an artist", "an aspiring pop star", "an assassin", "an athlete", "an au pair", "an escort", "an exotic dancer", "an idol", "an installation technician", "an intern", "an office worker", "homeless", "in a militia", "unemployed", "unemployed", "unemployed", "unemployed", "unemployed"],

	educatedCareers: ["a ballerina", "a banker", "a bureaucrat", "a business owner", "a businessman", "a captain", "a chemist", "a chief of police", "a classical dancer", "a classical musician", "a coach", "a college scout", "a concierge", "a coroner", "a corporate executive", "a cosmetologist", "a counselor", "a criminal", "a critic", "a cult leader", "a dean", "a dentist", "a dentist", "a director", "a dispatch officer", "a doctor", "a historian", "a housekeeper", "a journalist", "a journalist", "a judge", "a lawyer", "a librarian", "a lobbyist", "a madam", "a manager", "a mechanic", "a mediator", "a medical student", "a mercenary", "a military officer", "a military recruiter", "a nanny", "a noblewoman", "a nun", "a painter", "a paramedic", "a personal assistant", "a pharmacist", "a photographer", "a physician", "a pilot", "a poet", "a police detective", "a police negotiator", "a police officer", "a political activist", "a politician", "a practitioner", "a principal", "a prison warden", "a private detective", "a private instructor", "a procuress", "a producer", "a professional bartender", "a professor", "a programmer", "a prostitute", "a psychologist", "a refugee", "a scholar", "a scientist", "a sculptor", "a secretary", "a serial divorcee", "a shut-in", "a stockbroker", "a surgeon", "a teacher", "a teaching assistant", "a therapist", "a train conductor", "a transporter", "a veterinarian", "a wedding planner", "a writer", "a zookeeper", "an actress", "an air hostess", "an animator", "an archaeologist", "an architect", "an artist", "an assassin", "an astronaut", "an economist", "an editor", "an engineer", "an escort", "an estate agent", "an investor", "an MS pilot", "an office worker", "an orchestra conductor", "retired", "unemployed"],

	uneducatedCareers: ["a baker", "a barber", "a barista", "a bartender", "a beekeeper", "a beggar", "a blacksmith", "a blogger", "a bodyguard", "a bouncer", "a bounty hunter", "a boxer", "a brewer", "a bullfighter", "a bus driver", "a butcher", "a butler", "a camgirl", "a camp counselor", "a camwhore", "a candlestick maker", "a caregiver", "a carpenter", "a cashier", "a charity worker", "a chauffeur", "a cheerleader", "a chiropractor", "a clown", "a cobbler", "a cocktail waitress", "a comedian", "a con artist", "a construction worker", "a cook", "a cowgirl", "a criminal", "a croupier", "a cum dump", "a dairy worker", "a dancer", "a delivery woman", "a dominatrix", "a driller", "a drug mule", "a factory worker", "a farm laborer", "a farmer's daughter", "a farmer", "a firefighter", "a fisherwoman", "a florist", "a fortune teller", "a gang leader", "a gang member", "a gardener", "a gravedigger", "a groomer", "a gymnast", "a handmaiden", "a hotel manager", "a house DJ", "a housewife", "a hunter", "a janitor", "a landlady", "a launderer", "a law enforcement officer", "a lifeguard", "a local news anchor", "a lumberjack", "a magician's assistant", "a maid", "a mail carrier", "a mail-order bride", "a masseuse", "a masseuse", "a meat toilet", "a medic", "a medic", "a medium", "a messenger", "a midwife", "a milkmaid", "a mime", "a miner", "a missionary", "a mistress", "a model", "a mortician", "a musician", "a nanny", "a nurse", "a paramedic", "a park ranger", "a party girl", "a peddler", "a personal trainer", "a pimp", "a pirate", "a plumber", "a political activist", "a prison guard", "a prisoner", "a procuress", "a prostitute", "a racing driver", "a radio show host", "a rancher", "a receptionist", "a referee", "a refugee", "a repairman", "a revolutionary", "a ride attendant", "a roadie", "a rodeo star", "a sailor", "a saleswoman", "a school nurse", "a seamstress", "a secretary", "a security guard", "a service worker", "a shepherd", "a shrine maiden", "a soldier", "a stage magician", "a street performer", "a street vendor", "a stripper", "a student", "a student athlete", "a stuntwoman", "a switchboard operator", "a tailor", "a talent scout", "a taxi driver", "a teacher", "a tour guide", "a trophy wife", "a truck driver", "a waitress", "a weathergirl", "a welder", "a wet nurse", "a whaler", "a wrestler", "a zookeeper", "an acrobat", "an actress", "an arcade attendant", "an artist", "an aspiring pop star", "an athlete", "an electrician", "an enforcer", "an enforcer", "an escort", "an exotic dancer", "an exterminator", "an innkeeper", "an installation technician", "an office worker", "an orderly", "homeless", "in a militia", "retired", "unemployed", "unemployed", "unemployed", "unemployed", "unemployed"],

	gratefulCareers: ["a beggar", "a drug mule", "a peddler", "a pick-pocket", "a prisoner", "a refugee", "a shut-in", "a street urchin", "a student from a boarding school", "a sweatshop worker", "a thief", "an orphan", "from a lower class family", "homeless", "unemployed"],

	menialCareers: ["a baker", "a blacksmith", "a bus driver", "a butcher", "a candlestick maker", "a carpenter", "a cashier", "a chauffeur", "a cobbler", "a construction worker", "a courier", "a croupier", "a delivery woman", "a driller", "a dropout", "a factory worker", "a farm laborer", "a firefighter", "a fisherwoman", "a florist", "a gardener", "a gravedigger", "a janitor", "a launderer", "a lumberjack", "a mail carrier", "a mechanic", "a messenger", "a miner", "a nun", "a paper girl", "a part-time farm laborer", "a pilot", "a plumber", "a private", "a programmer", "a receptionist", "a referee", "a repairman", "a ride attendant", "a roadie", "a sailor", "a seamstress", "a service worker", "a street vendor", "a student from a private school", "a student from a public school", "a student", "a switchboard operator", "a tailor", "a taxi driver", "a terrorist", "a tour guide", "a train conductor", "a truck driver", "a welder", "a whaler", "an apprentice", "an arcade attendant", "an electrician", "an engineer", "an exterminator", "an installation technician", "an intern"],

	entertainmentCareers: ["a ballerina", "a blogger", "a camgirl", "a camwhore", "a cheerleader", "a child actress", "a clown", "a cocktail waitress", "a comedian", "a gymnast", "a journalist", "a local news anchor", "a magician's assistant", "a medium", "a mime", "a painter", "a party girl", "a photographer", "a poet", "a racing driver", "a sculptor", "a stage magician", "a street performer", "a student athlete", "a stuntwoman", "a video game streamer", "a waitress", "a weathergirl", "a wrestler", "a writer", "an acrobat", "an actress", "an animator", "an artist", "an athlete"],

	whoreCareers: ["a bimbo", "a child prostitute", "a criminal", "a cum dump", "a Futanari Sister", "a juvenile delinquent", "a mail-order bride", "a meat toilet", "a mistress", "a model", "a pageant star", "a pirate", "a porn star", "a prostitute", "a reality show star", "a saleswoman", "a serial divorcee", "a stripper", "a trophy wife", "an escort", "an exotic dancer"],

	HGCareers: ["a captain", "a corporate executive", "a director", "a dominatrix", "a gang leader", "a judge", "a lawyer", "a leading arcology citizen", "a military officer", "a model-UN star", "a noblewoman", "a politician", "a Queen", "a slaver", "a student council president"],

	madamCareers: ["a banker", "a business owner", "a businessman", "a camp counselor", "a club manager", "a hotel manager", "a landlady", "a madam", "a manager", "a park ranger", "a pimp", "a procuress", "a stockbroker", "an innkeeper"],

	DJCareers: ["a classical dancer", "a classical musician", "a dancer", "a house DJ", "a marching band leader", "a musician", "a radio show host", "an aspiring pop star", "an idol", "an orchestra conductor"],

	bodyguardCareers: ["a bodyguard", "a boxer", "a bully hunter", "a child soldier", "a hitman", "a kunoichi", "a law enforcement officer", "a military brat", "a prince", "a revolutionary", "a sniper", "a soldier", "a transporter", "an assassin", "an MS pilot", "captain of the kendo club", "in a militia", "spec ops"],

	wardenessCareers: ["a bouncer", "a bounty hunter", "a bully", "a chief of police", "a gang member", "a hall monitor", "a mercenary", "a police detective", "a police officer", "a prison guard", "a prison warden", "a private detective", "a security guard", "a street thug", "an enforcer", "an orderly"],

	nurseCareers: ["a chemist", "a chiropractor", "a coroner", "a dentist", "a doctor", "a hospital volunteer", "a medic", "a medical student", "a midwife", "a mortician", "a nurse", "a paramedic", "a pharmacist", "a physician", "a school nurse's assistant", "a school nurse", "a surgeon"],

	attendantCareers: ["a barber", "a cosmetologist", "a counselor", "a dispatch officer", "a fortune teller", "a groomer", "a latchkey kid", "a lifeguard", "a masseuse", "a mediator", "a personal trainer", "a police negotiator", "a psychologist", "a therapist", "a yoga instructor"],

	matronCareers: ["a babysitter", "a nanny", "a practitioner", "a wet nurse", "an au pair"],

	milkmaidCareers: ["a cowgirl", "a dairy worker", "a farmer's daughter", "a milkmaid", "a shepherd", "a veterinarian"],

	farmerCareers: ["a beekeeper", "a bullfighter", "a farmer", "a farmhand", "a rancher", "a rodeo star", "a zookeeper"],

	stewardessCareers: ["a barista", "a bartender", "a brewer", "a bureaucrat", "a caregiver", "a charity worker", "a club treasurer", "a concierge", "a critic", "a housekeeper", "a housesitter", "a lemonade stand operator", "a personal assistant", "a professional bartender", "a secretary", "a wedding planner", "an air hostess", "an architect", "an editor", "an estate agent", "an investor", "an office worker"],

	schoolteacherCareers: ["a child prodigy", "a coach", "a dean", "a historian", "a librarian", "a principal", "a private instructor", "a professor", "a scholar", "a scientist", "a teacher's pet", "a teacher", "a teaching assistant", "an archaeologist", "an astronaut", "an economist"],

	recruiterCareers: ["a club recruiter", "a college scout", "a con artist", "a cult leader", "a girl scout", "a hunter", "a lobbyist", "a military recruiter", "a missionary", "a political activist", "a princess", "a spy", "a talent scout", "retired"],
	/* pregmod */

	servantCareers: ["a butler", "a cook", "a handmaiden", "a housewife", "a maid", "a shrine maiden"],

	/* 	otherCareers: ["a producer", "being homeschooled by her parents", "from a middle class family", "from an upper class family"]>> */

	baseNationalities: ["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentinian", "Armenian", "Aruban", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bermudian", "Bhutanese", "Bissau-Guinean", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabé", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Catalan", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comorian", "Congolese", "a Cook Islander", "Costa Rican", "Croatian", "Cuban", "Curaçaoan", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dominiquais", "Dutch", "East Timorese", "Ecuadorian", "Egyptian", "Emirati", "Equatoguinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipina", "Finnish", "French", "French Guianan", "French Polynesian", "Gabonese", "Gambian", "Georgian", "German", "Ghanan", "Greek", "Greenlandic", "Grenadian", "Guamanian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "I-Kiribati", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kittitian", "Korean", "Kosovan", "Kurdish", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "a Liechtensteiner", "Lithuanian", "Luxembourgian", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monégasque", "Mongolian", "Montenegrin", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Caledonian", "a New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "Niuean", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Puerto Rican", "Qatari", "Romanian", "Russian", "Rwandan", "Sahrawi", "Saint Lucian", "Salvadoran", "Sammarinese", "Samoan", "São Toméan", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovak", "Slovene", "a Solomon Islander", "Somali", "South African", "South Sudanese", "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Tibetan", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vatican", "Venezuelan", "Vietnamese", "Vincentian", "Yemeni", "Zairian", "Zambian", "Zimbabwean"],

	royalNationalities: ["Bahraini", "Belgian", "Bhutanese", "British", "Bruneian", "Cambodian", "Danish", "Dutch", "Emirati", "Japanese", "Jordanian", "Kuwaiti", "Luxembourgian", "Malaysian", "Monégasque", "Moroccan", "Mosotho", "Norwegian", "Omani", "Qatari", "Saudi", "Spanish", "Swazi", "Swedish", "Thai", "Tongan"],


	amerindianNationalities: {
		"Bolivian": 1,
		"Greenlandic": 1,
		"Guatemalan": 1,
		"Peruvian": 1
	},

	asianNationalities: {
		"Bhutanese": 1,
		"Burmese": 1,
		"Cambodian": 1,
		"Chinese": 1,
		"Japanese": 1,
		"Korean": 1,
		"Laotian": 1,
		"Mongolian": 1,
		"Nepalese": 1,
		"Singaporean": 1,
		"Taiwanese": 1,
		"Thai": 1,
		"Tibetan": 1,
		"Vietnamese": 1
	},

	blackNationalities: {
		"American": 1,
		"Angolan": 1,
		"Antiguan": 1,
		"Bahamian": 1,
		"Barbadian": 1,
		"Beninese": 1,
		"Bermudian": 1,
		"Bissau-Guinean": 1,
		"Burkinabé": 1,
		"Burundian": 1,
		"Cameroonian": 1,
		"Central African": 1,
		"Chadian": 1,
		"Comorian": 1,
		"Congolese": 1,
		"Curaçaoan": 1,
		"Djiboutian": 1,
		"Dominiquais": 1,
		"Equatoguinean": 1,
		"Eritrean": 1,
		"Ethiopian": 1,
		"Gabonese": 1,
		"Gambian": 1,
		"Ghanan": 1,
		"Grenadian": 1,
		"Guinean": 1,
		"Guyanese": 1,
		"Haitian": 1,
		"Ivorian": 1,
		"Jamaican": 1,
		"Kenyan": 1,
		"Kittitian": 1,
		"Liberian": 1,
		"Malagasy": 1,
		"Malawian": 1,
		"Malian": 1,
		"Mauritanian": 1,
		"Mosotho": 1,
		"Motswana": 1,
		"Mozambican": 1,
		"Namibian": 1,
		"Nigerian": 1,
		"Nigerien": 1,
		"Rwandan": 1,
		"Saint Lucian": 1,
		"São Toméan": 1,
		"Senegalese": 1,
		"Sierra Leonean": 1,
		"Somali": 1,
		"South African": 1,
		"South Sudanese": 1,
		"Surinamese": 1,
		"Swazi": 1,
		"Tanzanian": 1,
		"Togolese": 1,
		"Trinidadian": 1,
		"Ugandan": 1,
		"Vincentian": 1,
		"Zairian": 1,
		"Zambian": 1,
		"Zimbabwean": 1
	},

	indoaryanNationalities: {
		"Afghan": 1,
		"Azerbaijani": 1,
		"Bahraini": 1,
		"Bangladeshi": 1,
		"Burmese": 1,
		"Emirati": 1,
		"Georgian": 1,
		"Guyanese": 1,
		"Indian": 1,
		"Iranian": 1,
		"Kazakh": 1,
		"Kurdish": 1,
		"Kyrgyz": 1,
		"Maldivian": 1,
		"Mauritian": 1,
		"Omani": 1,
		"Pakistani": 1,
		"Sri Lankan": 1,
		"Surinamese": 1,
		"Tajik": 1,
		"Trinidadian": 1,
		"Turkish": 1,
		"Turkmen": 1,
		"Uzbek": 1
	},

	latinaNationalities: {
		"American": 1,
		"Argentinian": 1,
		"Belizean": 1,
		"Bolivian": 1,
		"Brazilian": 1,
		"Chilean": 1,
		"Colombian": 1,
		"Costa Rican": 1,
		"Cuban": 1,
		"Dominican": 1,
		"Ecuadorian": 1,
		"Guatemalan": 1,
		"Honduran": 1,
		"Mexican": 1,
		"Nicaraguan": 1,
		"Panamanian": 1,
		"Paraguayan": 1,
		"Peruvian": 1,
		"Puerto Rican": 1,
		"Salvadoran": 1,
		"Uruguayan": 1,
		"Venezuelan": 1
	},

	malayNationalities: {
		"Bruneian": 1,
		"East Timorese": 1,
		"Filipina": 1,
		"Indonesian": 1,
		"Malaysian": 1,
		"Papua New Guinean": 1
	},

	middleeasternNationalities: {
		"Algerian": 1,
		"Bahraini": 1,
		"Egyptian": 1,
		"Iraqi": 1,
		"Jordanian": 1,
		"Kuwaiti": 1,
		"Lebanese": 1,
		"Libyan": 1,
		"Moroccan": 1,
		"Omani": 1,
		"Palestinian": 1,
		"Qatari": 1,
		"Sahrawi": 1,
		"Saudi": 1,
		"Sudanese": 1,
		"Syrian": 1,
		"Tunisian": 1,
		"Yemeni": 1
	},

	mixedraceNationalities: {
		"Aruban": 1,
		"Cape Verdean": 1,
		"French Guianan": 1,
		"São Toméan": 1,
		"Seychellois": 1
	},

	pacificislanderNationalities: {
		"a Cook Islander": 1,
		"Fijian": 1,
		"French Polynesian": 1,
		"Guamanian": 1,
		"I-Kiribati": 1,
		"Marshallese": 1,
		"Micronesian": 1,
		"Nauruan": 1,
		"New Caledonian": 1,
		"Ni-Vanuatu": 1,
		"Niuean": 1,
		"Palauan": 1,
		"Samoan": 1,
		"a Solomon Islander": 1,
		"Tongan": 1,
		"Tuvaluan": 1
	},

	semiticNationalities: {"Armenian": 1, "Georgian": 1, "Israeli": 1},

	southerneuropeanNationalities: {
		"Andorran": 1,
		"Catalan": 1,
		"Cypriot": 1,
		"Greek": 1,
		"Italian": 1,
		"Maltese": 1,
		"Monégasque": 1,
		"Portuguese": 1,
		"Sammarinese": 1,
		"Spanish": 1,
		"Vatican": 1
	},

	whiteNationalities: {
		"Albanian": 1,
		"American": 1,
		"Austrian": 1,
		"Belarusian": 1,
		"Belgian": 1,
		"Bosnian": 1,
		"Brazilian": 1,
		"British": 1,
		"Bulgarian": 1,
		"Canadian": 1,
		"Croatian": 1,
		"Czech": 1,
		"Danish": 1,
		"Dutch": 1,
		"Estonian": 1,
		"Finnish": 1,
		"French": 1,
		"German": 1,
		"Hungarian": 1,
		"Icelandic": 1,
		"Irish": 1,
		"Kosovan": 1,
		"Latvian": 1,
		"a Liechtensteiner": 1,
		"Lithuanian": 1,
		"Luxembourgian": 1,
		"Macedonian": 1,
		"Moldovan": 1,
		"Monégasque": 1,
		"Montenegrin": 1,
		"a New Zealander": 1,
		"Norwegian": 1,
		"Polish": 1,
		"Romanian": 1,
		"Russian": 1,
		"Scottish": 1,
		"Serbian": 1,
		"Slovak": 1,
		"Slovene": 1,
		"Swedish": 1,
		"Swiss": 1,
		"Ukrainian": 1,
		"Vatican": 1
	},

	FutureSocieties: ["FSArabianRevivalist", "FSAssetExpansionist", "FSAztecRevivalist", "FSBodyPurist", "FSChattelReligionist", "FSChineseRevivalist", "FSDegradationist", "FSEdoRevivalist", "FSEgyptianRevivalist", "FSGenderFundamentalist", "FSGenderRadicalist", "FSHedonisticDecadence", "FSIntellectualDependency", "FSMaturityPreferentialist", "FSNull", "FSPastoralist", "FSPaternalist", "FSPetiteAdmiration", "FSPhysicalIdealist", "FSRepopulationFocus", "FSRestart", "FSRomanRevivalist", "FSSlaveProfessionalism", "FSSlimnessEnthusiast", "FSStatuesqueGlorification", "FSSubjugationist", "FSSupremacist", "FSTransformationFetishist", "FSYouthPreferentialist"],

	ArcologyNamesSupremacistAmerindian: ["Akilineq", "Amerindia", "Aquadoctan", "Cahokia", "Caral", "Chicora", "Cowee", "Cusco", "Dugiluyi", "Five Nations", "Gran Chaco", "Indigenismo", "Isunigu", "Moundville", "Norumbega", "Onaquaga", "Onondaga Lake", "Paititi", "Porcupine", "Pueblo de Taos", "Quito", "Red Power", "Saguenay", "Shackamaxon", "Tamoanchan", "The Confederated Tribes", "Werowocomoco"],
	ArcologyNamesSupremacistAsian: ["Asiatic Empire", "Ciimnuai", "Eastern Sun", "Greater Asia", "Jade Empire", "Jade Library", "Kalapa", "Mahoroba", "Pan-Asia", "Penglai", "Shambhala", "Shangri-La", "Sinosphere", "The Celestial Temple", "The Orient", "Tian", "Yangtze", "Yellow River", "Zhonghua Minzu"],
	ArcologyNamesSupremacistBlack: ["Africana", "Afrocentral", "Azania", "Benin", "Door of Return", "Great Zimbabwe", "Houssa", "Kwanzaa Island", "Liberia", "Mezzoramia", "Négritude", "New Afrika", "Nubia", "Pan-Africa", "Panther Valley", "Rhapta", "The Promised Land", "Timbuktu", "United Africa", "Wakanda", "Zazamanc"],
	ArcologyNamesSupremacistIndoAryan: ["Alaka", "Āryāvarta", "Dvārakā", "Indomania", "Indus Valley", "Kuru Kingdom", "Muziris", "New New Delhi", "Pialral", "Saket", "Swadeshi", "Swarga Loka", "Tamralipta", "The Raj", "The Subcontinent", "Ujjain", "Vaikuntha", "Vedic Empire", "Vindhya"],
	ArcologyNamesSupremacistLatina: ["Alcázar de Segovia", "Alhambra", "Aztlan", "Chicanismo", "Ciudad Blanca", "El Dorado", "Hispania", "Hispanismo", "La Sagrada", "Lake Parime", "Quivira", "Santa Bárbara", "Sierra de la Plata", "Tayopa", "Tenochtitlan"],
	ArcologyNamesSupremacistMalay: ["Austronesia", "Biringan", "Brunei", "Golden Peninsula", "Kaluwalhatian", "Kebangkitan Nasional", "Ketuanan Melayu", "Malacca", "Malaya", "Maphilindo", "Melayu Raya", "Nusantara", "Patani", "Srivijaya", "Suvarnadvipa", "Tanah Melayu"],
	ArcologyNamesSupremacistMiddleEastern: ["Arabia", "Asabiyyah", "Ba'ath", "Fertile Crescent", "Iram", "Jannah", "Kerma", "MENA", "Mesopotamia", "Mount Qaf", "New Cairo", "Pan-Arabia", "Sinai", "The Caliphate", "Ubar", "Wabar", "Wāḳwāḳ", "West Asia", "Zerzura"],
	ArcologyNamesSupremacistMixedRace: ["Desegregation", "Exogamy", "Fusion", "Heterogeneity", "Hybrid Vigor", "Integration", "Kaleidoscope", "Meltingpot", "Mosaic", "Multination", "Plaçage", "Pluralism", "Polychrome", "Rainbow Nation", "Salad Bowl", "The Mixer", "The Swirl"],
	ArcologyNamesSupremacistPacificIslander: ["Aotearoa", "Austronesia", "Baralku", "Burotu", "Dreamtime", "Hawai'i", "Hawaiki", "Iolani Palace", "Kibu", "King Country", "Maui", "Melanesia", "Micronesia", "Mokoia", "Oceania", "Pacifica", "Papahānaumokuākea", "Polynesia", "Pulotu", "Rapa Nui"],
	ArcologyNamesSupremacistSemitic: ["Arimathea", "Callipolis", "Dilmun", "Garden of Eden", "Greater Jerusalem", "Israel", "Jericho", "Judah", "Judea", "New Jerusalem", "Olam Ha-Ba", "Ophir", "Paradisus Judaeorum", "Pitchipoi", "Seron", "Tarshish", "The Fifth Temple", "The Levant", "The Promised Land", "Zion"],
	ArcologyNamesSupremacistSouthernEuropean: ["Arcadia", "Delian League", "Delphi", "Elysian Fields", "Fortunate Isles", "Hyperuranion", "Iberia", "Mare Nostrum", "Mediterranea", "New Athens", "New Rome", "Olympus", "Papal Supremacy", "Risorgimento", "Siglo de Oro", "Spazio Vitale"],
	ArcologyNamesSupremacistWhite: ["Avalon", "Baasskap", "Buyan", "Caucasia", "Cockaigne", "Eurocentral", "Europa", "Europe a Nation", "Fiery Cross", "Fourth Reich", "Gimlé", "Hy-Brasil", "Kitezh", "Klanbake", "New Australia", "Northwest Territory", "Opona", "Orania", "Pan-Europe", "The Old Dominion", "Thule", "Turner City", "Volkstaat", "Vyraj", "White Might"],
	ArcologyNamesSubjugationistAmerindian: ["Adlivun", "Bear River", "Cowboy Town", "Fire Waters", "Fort Laramie", "Fort Mystic", "Manifest Destiny", "Mazocoba", "Oklahoma", "Red Dead", "Río Negro", "Sand Creek", "Shobari Waka", "The Rez", "Trail of Tears", "Washita", "Worst Nation", "Wounded Knee"],
	ArcologyNamesSubjugationistAsian: ["Asiatic Exclusion", "Beriberi", "Defense of the Realm", "Diyu", "Hells Canyon", "Hiroshima", "Luzon", "Opium Den", "Pearl of the Orient", "Rock Springs", "Shakee", "Sinking Tide", "The East India Company", "Torreón", "Yellow Error", "Youdu"],
	ArcologyNamesSubjugationistBlack: ["Bantustan", "Crow's Nest", "Dixie", "El Corte", "Golden Circle", "Hetgwauge", "Kuzimu", "Lynchburg", "Middle Passage", "Richmond", "Rosewood", "Rubber Farm", "Sharpeville", "Soweto", "Strange Orchard", "Sundown Town", "The Confederacy", "The Plantation", "The Projects", "Three-Fifths", "Tulsa"],
	ArcologyNamesSubjugationistIndoAryan: ["Call Center", "Convenience Store", "Goa Inquisition", "Jallianwala Bagh", "Kalichi", "Macaulayism", "Naraka", "Navarino", "Qissa Khwani Bazaar", "Sepoy Mutiny", "Slumdog Kennels", "The East India Company", "Trade Fort", "UCIL Plant", "Uva Province"],
	ArcologyNamesSubjugationistLatina: ["All-Mexico", "Annual", "Banana Republic", "Bean Paste", "Bisbee", "Border Wall", "Chandler", "Downieville", "Fort Veracruz", "Hanigan Ranch", "La Migra", "Los Conquistados", "Los Gatos", "Porvenir", "Vergüenza", "Zoot Suit Riot"],
	ArcologyNamesSubjugationistMalay: ["Batavia", "Bencoolen", "East Indies", "Eastern Emporium", "Fort Marlborough", "Gimokodan", "Macunat School", "Moro Crater", "Pontianak", "Pulo Prabang", "Rawagede", "Soerabaja", "Spice Mine", "Watsonville"],
	ArcologyNamesSubjugationistMiddleEastern: ["Al-Dawayima", "Allon Plus", "Constantinople", "Countered Jihad", "Cronulla", "Frontier Wire", "Homeland Secured", "Kiryat Arba", "La Reconquista", "Lydda", "New Guantanamo", "Qibya", "Sétif", "Shu'ubiyya", "Tantura", "Vlad's Castle", "Well Fire", "Yalova Peninsula", "Zanzibar"],
	ArcologyNamesSubjugationistMixedRace: ["Apartheid", "Barriers", "Bloodlines", "Division", "Endogamy", "Ghetto Benches", "Homogeneity", "Monochrome", "Monoculture", "One-Drop", "Purity", "Redline", "Segregation", "Separate but Equal", "Separation", "The Divide"],
	ArcologyNamesSubjugationistPacificIslander: ["Blackbird", "Cargo Cult", "Castle Bravo", "Coniston", "Great Māhele", "Hula Hoop", "Moro Castle", "Murimuria", "Myall Creek", "Ōmiya-Jima", "Rabbit Fence", "Sapwuahfik", "The Leap", "Thurston", "Tourist Trap", "Waterloo Creek"],
	ArcologyNamesSubjugationistSemitic: ["Auschwitz", "Devil's Island", "Exodus", "Farhud", "Gehenna", "Intifada", "Kfar Etzion", "Kristallnacht", "Mawza Exile", "Mount Scopus", "New Canaan", "Pale of Settlement", "Pogrom", "Sheol", "Six Million Mile", "Solomon's Lament", "The Ghetto"],
	ArcologyNamesSubjugationistSouthernEuropean: ["Al-Andalus", "Apalachin", "Arandora Star", "Black Legend", "Braintree", "Carthage", "Charlestown State", "Chios", "Hades", "Istanbul", "Istria", "Kalavryta", "Parish Prison", "Smyrna", "Tartarus", "The Foibe", "Toronto Trouble"],
	ArcologyNamesSubjugationistWhite: ["Anaon", "Anticolonialism One", "Bleach Removal", "Camp des Saints", "Cawnpore", "Decolonization", "Greater Replacement", "Kaffa", "Killough", "Ladoga", "Mayocide", "Peklo", "Reparations", "Risen Tide", "Rope Burn", "Saint-Domingue", "The World Turned Upside Down", "Trailer Park", "Tuonela", "Uffern", "WASP Spray", "White Flight"],
	ArcologyNamesGenderRadicalist: ["Admah", "Aphroditus", "Bacchanalia", "Boeotia", "Brumalia", "Catamitus", "City of the Plain", "Crete", "Dionysia", "Ermenosity", "Gomorrah", "Hermaphroditus", "Impudicitia", "Liberalia", "Pessinus", "Saturnalia", "Sodom", "The Rosebud", "Thebes", "Vine of Sodom", "Zeboim"],
	ArcologyNamesGenderFundamentalist: ["The Arbor", "The Center", "The Core", "The Cradle", "The Entrance", "The Essence", "The Flower", "The Fruit", "The Jewel", "The Lily", "The Love", "The Moon", "The Origin", "The Pearl", "The Petal", "The Rose", "The Sheath", "The Source", "The Warmth"],
	ArcologyNamesPaternalist: ["Asylum", "Benevolence", "City of Refuge", "Fatherhood", "Glory", "Greater Good", "Haven", "Humanitaria", "Nanny State", "New Springfield", "Paterfamilias", "Paternalis", "Refuge", "Safe Harbor", "Safe Haven", "Safehouse", "Safety", "Sanctuary", "Sanctum", "Shelter", "The Sanctuary", "Welfare"],
	ArcologyNamesDegradationist: ["Akelarre", "Apocalyptica", "Armageddon", "Bald Mountain", "Black Sabbath", "Blåkulla", "Château de Silling", "Cruelty", "Damnation", "Degradation", "Diabolica", "Doomsday", "Dukkha", "Golgotha", "Hell on Earth", "Hell", "Inferno", "Misery", "Pain", "Schadenfreude", "Slaughterhouse", "Suffering", "The Pit", "The Tower", "Torment", "Torture Chamber", "Well to Hell"],
	ArcologyNamesBodyPurist: ["Antiplasto", "Au Naturel", "Elysium", "Injection Rejection", "L'Esprit Nouveau", "Natural Selection", "Natural State", "Nature Reserve", "New Eden", "Organics", "Pure Land", "Pure Shores", "Purification", "Purity Balls", "Purity Ring", "Purity", "Sanctity", "Scarless Fever", "Surgical Strike", "The Ark", "The Garden", "The Repository", "Unblemisht", "Walden"],
	ArcologyNamesTransformationFetishist: ["Arion Laboratory", "Barbie World", "Bimboden", "Bimboland", "Dow Corning", "Gillies Suite", "Guinea Pig Club", "Implantation Station", "Mad Mods", "Modding Community", "Mods Nexus", "Niptuck", "Plastic Beach", "Plasticland", "Silicone Valley", "Silicone Zone", "Stacy Malibu", "Strained Silicone", "Surgeon Generality", "The Dollhouse", "The Hospital", "Transformation Station", "Transformational Festival", "Under-Knife"],
	ArcologyNamesYouthPreferentialist: ["Cumfullton", "Dick U.", "Ephebophily", "Frat Party", "Fuck High", "Hebephily", "Homecoming", "Kid Row", "Prom Night", "Sex College", "Sorority Row", "Spring Break", "Sunnyside", "Teen Scene", "Teen Spirit", "Teenage Wasteland", "Teenybop", "Undergrad Pad", "Young Earth", "Youngling", "Youngtown", "Youth Culture", "Youth", "Youthanasia"],
	ArcologyNamesYouthPreferentialistLow: ["Cherry Fields", "Cherry Hills", "Comet Ping Pong", "Cummies Kindergarten", "Cunny Junction", "Dick Elementary", "Flatsville", "Groom Range", "Hanson City", "Hebephily", "Hotel Bangkok", "Kiddie Diddlebury", "Lil' Sluts Academy", "Lolita Complex", "Loliville", "Oingo Boingo", "Partyvanistan", "Pedophily", "Pomf Town", "Prepubescence", "Savile Row", "Statutoria", "The Cake Shop"],
	ArcologyNamesMaturityPreferentialist: ["Age Begets Beauty", "Annual Reunion", "Cougar Town", "Experience", "Fine Wine", "Gerontophily", "Mature Theme", "Maturity", "Mesophily", "MILF Haven", "MILF Heights", "MILFtown", "Old Flame", "Old Style", "Park Avenue Tower", "Phaedra Complex", "Robinsonade", "Shady Acres", "Yummy Mummy"],
	ArcologyNamesSlimnessEnthusiast: ["Aerobica", "Cardiode", "Emaciate State", "Lean Scene", "Less Is More", "Marathon", "National Diet", "Runway Way", "Size Zero", "Skin-and-Bones Zone", "Skinny Bop", "Skinny Dip", "Skinny House", "Slim City", "Slim Shades", "Slimming World", "The Island", "The Skinny", "The Thinning", "Underweight Way", "Upskirt", "Virginland", "Weigh Down Low"],
	ArcologyNamesAssetExpansionist: ["Asset Holdings", "Biggening", "Blow-Up", "Boobs Tower", "Expand Land", "Expansion Chamber", "Expansion Pack", "Growth Medium", "Inflation Station", "Tangible Assets", "The Bouncy Castle", "The Expanse", "The Mounds", "Twin Peaks", "Voluptuousity"],
	ArcologyNamesPastoralist: ["Abundance", "Big Milk", "Bounty", "Bucolica", "Cornucopia", "Dairy Farm", "Dairy Kingdom", "Friesland", "God's Country", "Green Acres", "Greener Pastures", "Lactophily", "Lactopia", "Land of Plenty", "Pastoral Romance", "Pasturelands", "Plenty", "Schleswig-Holstein", "The Dairy", "The Ranch"],
	ArcologyNamesPhysicalIdealist: ["Aegina", "Amazonia", "Athletica", "Buff Riders", "Buffton", "Cardiode", "Dahomey", "Exercise Ball", "Exercise Bend", "Exercism", "Fitness Center", "Gargarei", "Gymnasiade", "Iron Pumps", "Midgard", "Muscle Beach", "Muscle Shoals", "Olympia", "Performance Peak", "Protein Lake", "Skid Row", "Sparta", "Sthenolagny", "The Gymnasium", "Them Gains", "Themyscira", "Valhalla", "Work Out"],
	ArcologyNamesChattelReligionist: ["Blessings", "City on a Hill", "Deus Vult", "Eden", "Glory", "Heaven on Earth", "Heaven", "Holiness", "Light of the World", "New Covenant", "Pilgrim's Progress", "Prayer Service", "Redemption", "Salt and Light", "Salt of the Earth", "Salvation", "The Holy City", "The Light", "World to Come", "Worship"],
	ArcologyNamesRomanRevivalist: ["Abila", "Aeminium", "Aequum", "Agrigentum", "Ala", "Albanianis", "Ambianum", "Antaeopolis", "Antiochia", "Apulum", "Aquileia", "Argentoratum", "Ariminum", "Arsinoë", "Ascrivium", "Asculum", "Attalia", "Augusta Vindelicorum", "Barium", "Belum", "Berytus", "Biriciana", "Blestium", "Bonna", "Bononia", "Bovium", "Brixia", "Burgodunum", "Byzantium", "Caesaraugusta", "Caesarea", "Caesaromagus", "Calleva Atrebatum", "Camulodunum", "Capua", "Carthago Nova", "Catana", "Celeia", "Cibalae", "Clausentum", "Comum", "Condate", "Conimbriga", "Constantinopolis", "Corduba", "Coria", "Coriovallum", "Danum", "Deva Victrix", "Divodurum", "Dubris", "Durnovaria", "Durocornovium", "Duroliponte", "Dyrrachium", "Eboracum", "Eburobrittium", "Elysian Fields", "Emona", "Epidaurum", "Florentia", "Gerulata", "Gerunda", "Isca Augusta", "Italica", "Iuvavum", "Lacobrica", "Lagentium", "Lauri", "Lentia", "Leptis Magna", "Letocetum", "Lindinis", "Londinium", "Longaricum", "Lopodunum", "Lousonna", "Lugdunum", "Luguvalium", "Lutetia", "Mancunium", "Marsonia", "Massa", "Massalia", "Matilo", "Mediolanum", "Messana", "Mod", "Mogontiacum", "Moridunum", "Mursa", "Naissus", "Nauportus", "Neapolis", "Neviodunum", "Nicaea", "Nicomedia", "Nida", "Nova Roma", "Novaesium", "Noviomagus", "Olicana", "Olisippo", "Ostia", "Partiscum", "Patavium", "Pistoria", "Placentia", "Poetovio", "Polemonion", "Pomaria", "Pompeii", "Ragusium", "Ravenna", "Regulbium", "Rhegium", "Rutupiae", "Salernum", "Scalabis", "Segovia", "Sirmium", "Siscia", "Spalatum", "Sumelocenna", "Syracusae", "Tarraco", "Tarsus", "The City of the Seven Hills", "Theranda", "Thuburbo Majus", "Thubursicum", "Tilurium", "Tingi", "Traiectum", "Trapezus", "Turicum", "Venta Icenorum", "Verulamium", "Vesontio", "Vindobona", "Vinovia", "Volubilis"],
	ArcologyNamesAztecRevivalist: ["Acolmiztli", "Acozac", "Amaquemecan", "Anenecuilco", "Azcapotzalco", "Aztlan", "Calixtlahuaca", "Chalco", "Chapultepec", "Chicomoztoc", "Cholula", "Coixtlahuaca", "Coyoacan", "Coyoacán", "Cuautla", "Culhuacan", "Cuzcatlan", "Ecatepec", "Huitzilopochco", "Itzcahuacan", "Itztapalapan", "Iztapalapa", "Kaminaljuyu", "Malinalco", "Mexicatzinco", "Nojpetén", "Ocotelolco", "Ocuituco", "Omeyocan", "Otompan", "Oxwitik", "Quiahuiztlan", "Tacuba", "Tamoanchan", "Tenayuca", "Tenochtitlan", "Teopanzolco", "Teotihuacan", "Tepeticpac", "Tepetlaoztoc", "Tepozteco", "Texcoco", "Texcotzingo", "The Halls of Montezuma", "Tizatlan", "Tlacopan", "Tlalmanalco", "Tlatelolco", "Tollan", "Utatlán", "Xalapa", "Xaltocan", "Xochimilco", "Zacpeten"],
	ArcologyNamesEgyptianRevivalist: ["Aaru", "Abdju", "Abu", "Aka", "Akhetaten", "Amenemhat-itj-tawy", "Aneb-Hetch", "Ankh-Tawy", "Anpet", "Apu", "Aushamem", "Baki", "Behdet", "Behedet-jabtet", "Buhen", "Chenem-Waset", "Dehenet", "Dep", "Dja", "Djanet", "Djed-Sut", "Djedu", "Djerty", "Djew-Qa", "Gebtu", "Gesa", "Gesy", "Hapi", "Hebenu", "Henen-nesut", "Herwer", "Hut-hery-ib", "Hut-ka-ptah", "Hut-Repyt", "Hut-Sekhem", "Hut-waret", "Iken", "Imet", "Imu", "Imura", "Inbu-Hedj", "Ipet-Resyt", "Ipu", "Itjtawy", "Iu-miteru", "Iunet", "Iunu", "Iuny", "Iunyt", "Iushenshen", "Khasut", "Khem", "Khemenu", "Khent-min", "Kheny", "Khenyt", "Khito", "Khmun", "Kis", "Madu", "Men-nefer", "Menfe", "Mer-nefer", "Mesen", "Moph", "Napata", "Nay-Ta-Hut", "Nekheb", "Nekhen", "Nubt", "Pe", "Peguat", "Pekher-wer", "Per-Amun", "Per-Atum", "Per-Banebdjedet", "Per-Bast", "Per-Bastet", "Per-Hathor", "Per-Imen-mat-khent", "Per-Medjed", "Per-Nemty", "Per-Ra-mes-su", "Per-Ramesses", "Per-Sopdu", "Per-Usiri", "Per-Wadjet", "Piemro", "Pikaut", "Pikuat", "Pselqet", "Ptah", "Ptkheka", "Qedesh", "Qedshu", "Qis", "Râ-Kedet", "Raqote", "Rebu", "Saka", "Sangar", "Semabehdet", "Senet", "Sepermeru", "Seshesh", "Šetennu", "Shashotep", "Shasu", "Shedet", "Sheten", "Sumenu", "Swenett", "Ta-senet", "Tamiat", "Taremu", "Tayu-djayet", "Tepihu", "Timinhor", "Tjaru", "Tjebnutjer", "Tjebu", "Tjeku", "Tjenu", "Tpyhwt", "Waset", "Weprehwy", "Yamu", "Ypu", "Zau", "Zauti", "Zawty", "Zay"],
	ArcologyNamesEdoRevivalist: ["Amano-Iwato", "Ando", "Asakura", "Asuka", "Dejima", "Edo", "Hakodate", "Heian-kyō", "Heijō-kyō", "Hiraizumi", "Hirakata", "Idano", "Ise", "Isonokami", "Itsukushima", "Iware", "Izakaha", "Karu", "Karushima", "Kasagiyama", "Kashihara", "Katashiha", "Kawagoe", "Kawanakajima", "Kazuraki", "Kobe", "Kokyo", "Koryo", "Kuni-kyō", "Kuruda", "Kyotanabe", "Mahoroba", "Makimuko", "Mikatagahara", "Miki", "Miyajima", "Miyako", "Muro", "Nagaoka-kyō", "Nagashima", "Nagashino", "Nakatsukuni", "Naniwa", "Nara", "Negoro", "Neo Tokyo", "New Kyoto", "New Tokyo", "Odawara", "Okazaki", "Okehazama", "Onogoro", "Osaka", "Otsu", "Ryūgū-jō", "Sakurai", "Sekigahara", "Shiga", "Shika", "Shiki", "Shikoku", "Shimonoseki", "Shuri", "Sunpu", "Tajihi", "Takama-ga-hara", "Tanegashima", "Tengoku", "Tenmokuzan", "Tenri", "The Imperial Palace", "Ujiyamada", "Urasoe", "Waki-no-kami", "Yamazaki", "Yawata", "Yoshino"],
	ArcologyNamesArabianRevivalist: ["Abha", "Achir", "Al Bahah", "Al-Hasa", "Al-Mansuriya", "Al-Qata'i", "Aleppo", "Alhambra", "Amadiya", "Amid", "Arar", "Arbil", "Ardabil", "Arjish", "Arzan", "Badr", "Baghdad", "Basra", "Bayt al-Hikma", "Béjaïa", "Beni Hammad", "Buraidah", "Cairo", "Córdoba", "Damascus", "Dammam", "Dhala", "Diyarbakır", "El-Mansuriya", "Faiyum", "Fes-al-Bali", "Fes", "Fez", "Fustat", "Ha'il", "Hajar an-Nasar", "Hama", "Harput", "Harran", "Hasankeyf", "Hejaz", "Ifriqiya", "Isfahan", "Jannah", "Jenin", "Jerusalem", "Jizan", "Jubayl", "Kairouan", "Karbala", "Khilat", "Kirkuk", "Kufa", "Madinah", "Madinat al-Hareer", "Madinat al-Salam", "Madinat al-Yasmin", "Madinat al-Zahra", "Mahdia", "Makkah", "Manzikart", "Maragha", "Mardin", "Marrakech", "Marrakesh", "Marsala", "Mayyafariqin", "Mecca", "Medina", "Mosul", "Murakuc", "Najran", "Nekor", "Qatif", "Qazvin", "Raqqa", "Raqqada", "Resafa", "Riyadh", "Sakakah", "Samarra", "Saqifah", "Say'un", "Sidon", "Sulaimaniyah", "Suq Abdulla", "Tabriz", "Tabuk", "Tahert", "Tarim", "Temsaman", "Tlemcen", "Tunis", "Walilli", "Zabid"],
	ArcologyNamesChineseRevivalist: ["Acheng", "Anyang", "Anyi", "Balasagun", "Beijing", "Bian", "Bianjing", "Bianzhou", "Binzhou", "Bogu", "Boping", "Chang'an", "Changle", "Changping", "Changsha", "Chengdu", "Chengzhou", "Chuqiu", "Dadu", "Daliang", "Daming", "Danyang", "Datong", "Daxing", "Dinglian", "Diqiu", "Dongdu", "Dongjing", "Dujianshan", "Dunhuang", "Ezhou", "Fanyang", "Feng Huang", "Fenghao", "Fengxiang", "Fuhan", "Fusang", "Guanggu", "Guangling", "Guangzhou", "Gusu", "Guzang", "Handan", "Hangzhou", "Haojing", "Hefei", "Henglong", "Hezhou", "Huanbei", "Huangquan", "Huangzhong", "Huatai", "Huokang", "Ji", "Jian", "Jiang", "Jiangling", "Jiangning", "Jiankang", "Jianye", "Jicheng", "Jin Shan", "Jinan", "Jincheng", "Jingsha", "Jingzhao", "Jingzhou", "Jinling", "Jinyang", "Jiuquan", "Kaifeng", "Khanbaliq", "Kuaiji", "Laosicheng", "Ledu", "Lianchuan", "Liaodong", "Liaoyang", "Lin'an", "Linhuang", "Linxiang", "Linzi", "Lishi", "Liting", "Longcheng", "Lujiang", "Luoyang", "Luoyi", "Luyi", "Mingfu", "Moling", "Mount Tai", "Nan'an", "Nanchang", "Nanjing", "Nanjun", "Nanyang", "Panyu", "Peking", "Pengcheng", "Pingcheng", "Pingjiang", "Pingliang", "Pingyang", "Pingzhou", "Puzi", "Qi Lin", "Qian", "Qiantang", "Qiling", "Qin", "Quanqiu", "Qufu", "Quwo", "Ruyin", "Shangcai", "Shanggui", "Shangjing", "Shangqiu", "Shengjing", "Shengle", "Shouchun", "Suzhou", "Taiyuan", "Tang", "Tanheli", "Tanjiao", "Tanzhou", "Taoqiu", "The Forbidden Palace", "The Middle Kingdom", "Tianlin", "Tongwan", "Wanchuan", "Wangcheng", "Wanqiu", "Wu", "Wuchang", "Wudu", "Xi'an", "Xiacai", "Xiangguo", "Xiangning", "Xiangping", "Xianyang", "Xibo", "Xicheng", "Xin Hua", "Xincai", "Xingqing", "Xingwang", "Xintian", "Xinzheng", "Xiping", "Xuchang", "Yangcheng", "Yangzhai", "Yanjing", "Yanshi", "Yecheng", "Yewang", "Yin", "Yinfu", "Ying", "Yingdu", "Yingqiu", "Yingtian", "Yong", "Yongshicheng", "You", "Youdu", "Youming", "Youzhou", "Yueyang", "Yuezhou", "Yuhang", "Yushan", "Zhangye", "Zhangzi", "Zhaoge", "Zhending", "Zheng", "Zhenxun", "Zhongdu", "Zhongguo", "Zhongshan", "Zibo", "Zichuan"],

	/* pregmod FS */
	ArcologyNamesEugenics: ["Ascension", "Elitism", "Eugenica", "Eugeniculate", "Galton City", "Germinal Choice", "Good Stock", "Improvement", "Lebensborn", "Natural Selection", "Oneida Community", "Perfection", "Powered Elite", "Private Gene Pool", "Quality", "Rebirth", "Reprogenetics", "Second Chance", "Selection Rule", "Stirpiculture"],
	ArcologyNamesRepopulationist: ["Cultural Mandate", "Fruitful and Multiply", "Future", "Glorious Mother", "Haven of the Pregnant", "Holders of the Future", "Hope", "Motherhood", "Multiplication", "Preggonia", "Public Gene Pool", "Quantity", "Rabbit Hole", "Repoblación", "Sacred Womb", "The Womb"],
	ArcologyNamesHedonisticDecadence: ["All You Can Eat", "Aristippa", "Buffet", "Chubby Hole", "Cyrene", "Decadence", "Epicurea", "Gavage", "Glorious Food", "Gluttony", "Hedonic Calculator", "Hedonism Resort", "Hedonism Spot", "Indulgence", "Leblouh", "Libertinage", "New Wisconsin", "Pleasure", "Plumpland", "Sloth", "Smörgåsbord", "Stuffedtopia", "Yang"],
	ArcologyNamesCummunism: ["Arscrotzka", "Crusty Cummies", "Cumbria", "Cuming Inlet", "Cummins", "Cummunist Russwhore", "Cumstantine", "Cumstantinople", "Da Cumrade", "Erection Fluid", "Free Slave Central", "Jizzakh", "Jizzebel", "Jizzington upon Wank", "Mother Cumtry", "Semen Supreme", "Semenyih", "Sperm Atrium", "Sperm Banks", "Spermato Zoo", "Wankara"],
	ArcologyNamesIncestFetishist: ["All in the Family", "Blood Relations", "Consanguinity", "East Westermarck", "Electra Complex", "Familial Embrace", "Family Fortunes", "Family Ties", "Heredity", "Incestia", "Incestral Home", "Jocasta Complex", "Kinship", "Oedipal City", "Oedipus Complex", "Oeditropolis", "Pure Blood", "Sib City", "Snokhachestvo", "Tenth Abomination", "Unlash of Clans", "Wincest"],
	ArcologyNamesIntellectualDependency: ["Barbie World", "Bimbo Land", "Bimbotopia", "Dim City", "Dumbarton", "Dummy Thicc", "Followers of Bacchus", "Fool on the Hill", "Fun and Games", "Gump Forest", "Idiot City", "Imbecile Mile", "Loosu Pond", "Pretty in Pink", "Promiscuous", "Sex Essex", "Stupid Hoedown", "The Dropout", "Valley World"],
	ArcologyNamesSlaveProfessionalism: ["Braintree", "Diploma Mill", "Disciplined Minds", "Einstein Beach", "Followers of Minerva", "Genius Loci", "House of Wisdom", "Ingenium", "Intellectua", "Intelligence Star", "Intelligentsia", "Library of Alexandria", "Mensa Mesa", "Secretary State", "Smart City", "Smart Grid"],
	ArcologyNamesPetiteAdmiration: ["Bantam Battalion", "Dwarf Forest", "Dwarf Fortress", "Elf Village", "Haunchyville", "Midget Utopia", "Midgetville", "Mini World", "Munchkinland", "Napoleon Complex", "Petite Mesa", "Petite Pride", "Pygmalion", "Short Circuit", "Short Stirling", "The Short Stack", "Tiny Town"],
	ArcologyNamesStatuesqueGlorification: ["Basketball Court", "Castelnau", "Giant's Causeway", "Giraffe Manor", "Height Is Right", "High Hopes", "Highland", "Potsdam Battalion", "Rhodes", "St. Michael's Mount", "Tall Poppy Field", "Tall Trees", "Talleres", "The Bean Stalk", "The Heights", "Valley of Elah"],

	badWords: ["anus", "ass", "bitch", "boob", "butt", "cock", "crap", "cum", "cunny", "cunt", "dick", "fuck", "jizz", "junk", "piss", "prick", "pussy", "shit", "slave", "slut", "tit", "trash", "whore"],

	badNames: ["Ass Kisser", "Ass Licker", "Ass", "Assfucker", "Asshole", "Ballsack", "Bastard", "Bitch", "Cock", "Cocksucker", "Coward", "Creep", "Cum Rag", "Cunt", "Degenerate", "Despoiler", "Dick", "Dickhead", "Dicksucker", "Dickweed", "Dipshit", "Douchebag", "Dumbass", "DumbFuck", "Dunderfuck", "Faggot", "Fucker", "Fuckface", "Fuckhead", "Fucko", "Fucktard", "Fuckwit", "Idiot", "Inbred", "Jackass", "Jerk", "Jizz Stain", "Moron", "Motherfucker", "Nutsack", "Pissbaby", "Prick", "Pussy", "Rapist", "Ratfuck", "Retard", "Ruiner", "Schmuck", "Scumbag", "Shitbird", "Shithead", "Slave", "Slaver", "Sleazeball", "Slut", "Sodomite", "Thundercunt", "Traitor", "Trash", "Whore"],

	niceClothes: [{
			name: "Maternity lingerie",
			value: "attractive lingerie for a pregnant woman",
			fs: "FSRepopulationFocus",
			rs: "clothesBoughtMaternityLingerie"
		},
		{
			name: "Bunny outfit",
			value: "a bunny outfit",
			fs: "FSGenderFundamentalist",
			rs: "clothesBoughtBunny"
		},
		{
			name: "Body oil",
			value: "body oil",
			fs: "FSPhysicalIdealist",
			rs: "clothesBoughtOil"
		},
		{
			name: "Chattel habit",
			value: "a chattel habit",
			fs: "FSChattelReligionist",
			rs: "clothesBoughtHabit"
		},
		{
			name: "Conservative clothing",
			value: "conservative clothing",
			fs: "FSPaternalist",
			rs: "clothesBoughtConservative"
		},
		{
			name: "Harem gauze",
			value: "harem gauze",
			fs: "FSArabianRevivalist",
			rs: "clothesBoughtHarem"
		},
		{
			name: "Huipil",
			value: "a huipil",
			fs: "FSAztecRevivalist",
			rs: "clothesBoughtHuipil"
		},
		{
			name: "Kimono",
			value: "a kimono",
			fs: "FSEdoRevivalist",
			rs: {
				either: {
					clothesBoughtKimono: 1,
					continent: "Japan"
				}
			}
		},
		{
			name: "Maternity dress",
			value: "a maternity dress",
			fs: "FSRepopulationFocus",
			rs: "clothesBoughtMaternityDress"
		},
		{
			name: "Qipao (slutty)",
			value: "a slutty qipao",
			fs: "FSChineseRevivalist",
			rs: "clothesBoughtQipao"
		},
		{
			name: "Qipao (long)",
			value: "a long qipao",
			fs: "FSChineseRevivalist",
			rs: "clothesBoughtCultural"
		},
		{
			name: "Stretch pants and a crop-top",
			value: "stretch pants and a crop-top",
			fs: "FSHedonisticDecadence",
			rs: "clothesBoughtLazyClothes"
		},
		{
			name: "Toga",
			value: "a toga",
			fs: "FSRomanRevivalist",
			rs: "clothesBoughtToga"
		},
		{
			name: "Western clothing",
			value: "Western clothing",
			fs: "FSPastoralist",
			rs: "clothesBoughtWestern"
		},
		{
			name: "Courtesan dress",
			value: "a courtesan dress",
			fs: "FSSlaveProfessionalism",
			rs: "clothesBoughtCourtesan"
		},
		{
			name: "Bimbo outfit",
			value: "a bimbo outfit",
			fs: "FSIntellectualDependency",
			rs: "clothesBoughtBimbo"
		},
		{
			name: "Petite admi outfit",
			value: "petite admi outfit",
			fs: "FSPetiteAdmiration",
			rs: "clothesBoughtPetite"
		},
		{name: "Battlearmor", value: "battlearmor", rs: "clothesBoughtMilitary"},
		{name: "Military uniform", value: "a military uniform", rs: "clothesBoughtMilitary"},
		{name: "Red Army uniform", value: "a red army uniform", rs: "clothesBoughtMilitary"},
		{name: "Battledress", value: "battledress", rs: "clothesBoughtMilitary"},
		{name: "Biyelgee costume", value: "a biyelgee costume", rs: "clothesBoughtCultural"},
		{name: "Dirndl", value: "a dirndl", rs: "clothesBoughtCultural"},
		{name: "Lederhosen", value: "lederhosen", rs: "clothesBoughtCultural"},
		{name: "Mounty outfit", value: "a mounty outfit", rs: "clothesBoughtCultural"},
		{name: "Hanbok", value: "a hanbok", rs: "clothesBoughtCultural"},
		{
			name: "Burqa",
			value: "a burqa",
			rs: {
				either: {
					clothesBoughtMiddleEastern: 1,
					continent: "the Middle East"
				}
			}
		},
		{
			name: "Niqab and abaya",
			value: "a niqab and abaya",
			rs: {
				either: {
					clothesBoughtMiddleEastern: 1,
					continent: "the Middle East"
				}
			}
		},
		{
			name: "Hijab and blouse",
			value: "a hijab and blouse",
			rs: {
				either: {
					clothesBoughtConservative: 1,
					continent: "the Middle East"
				}
			}
		},
		{
			name: "Burkini",
			value: "a burkini",
			rs: {
				clothesBoughtSwimwear: 1,
				either: {
					clothesBoughtMiddleEastern: 1,
					continent: "the Middle East"
				}
			}
		},
		{name: "Santa dress", value: "a Santa dress", rs: "clothesBoughtCostume"},

		{name: "Klan robe", value: "a klan robe", rs: "clothesBoughtPol"},
		{name: "Slutty klan robe", value: "a slutty klan robe", rs: "clothesBoughtPol"},
		{name: "Schutzstaffel uniform", value: "a schutzstaffel uniform", rs: "clothesBoughtPol"},
		{name: "Slutty schutzstaffel uniform", value: "a slutty schutzstaffel uniform", rs: "clothesBoughtPol"},

		{name: "Nice business attire", value: "nice business attire", rs: "clothesBoughtCareer"},
		{name: "Nurse (nice)", value: "a nice nurse outfit", rs: "clothesBoughtCareer"},
		{name: "Police uniform", value: "a police uniform", rs: "clothesBoughtCareer"},
		{
			name: "Maid (nice)",
			value: "a nice maid outfit",
			rs: {
				either: {
					clothesBoughtCareer: 1,
					PC: {
						career: "servant"
					}
				}
			}
		},

		{name: "Ballgown", value: "a ball gown", rs: "clothesBoughtDresses"},
		{name: "Gothic lolita dress", value: "a gothic lolita dress", rs: "clothesBoughtDresses"},

		{name: "Cybersuit", value: "a cybersuit", rs: "clothesBoughtBodysuits"},
		{name: "Latex catsuit", value: "a latex catsuit", rs: "clothesBoughtBodysuits"},

		{name: "Button-up shirt and panties", value: "a button-up shirt and panties", rs: "clothesBoughtCasual"},
		{name: "Button-up shirt", value: "a button-up shirt", rs: "clothesBoughtCasual"},
		{name: "Cutoffs", value: "cutoffs", rs: "clothesBoughtCasual"},
		{name: "Jeans", value: "jeans", rs: "clothesBoughtCasual"},
		{name: "Leather pants and a tube top", value: "leather pants and a tube top", rs: "clothesBoughtCasual"},
		{name: "Leather pants", value: "leather pants", rs: "clothesBoughtCasual"},
		{name: "Oversized t-shirt", value: "an oversized t-shirt", rs: "clothesBoughtCasual"},
		{name: "Sweater and cutoffs", value: "a sweater and cutoffs", rs: "clothesBoughtCasual"},
		{name: "Sweater and panties", value: "a sweater and panties", rs: "clothesBoughtCasual"},
		{name: "Sweater", value: "a sweater", rs: "clothesBoughtCasual"},
		{name: "T-shirt and jeans", value: "a t-shirt and jeans", rs: "clothesBoughtCasual"},
		{name: "T-shirt and panties", value: "a t-shirt and panties", rs: "clothesBoughtCasual"},
		{name: "T-shirt", value: "a t-shirt", rs: "clothesBoughtCasual"},
		{name: "Tank-top and panties", value: "a tank-top and panties", rs: "clothesBoughtCasual"},
		{name: "Tank-top", value: "a tank-top", rs: "clothesBoughtCasual"},
		{name: "Tube top", value: "a tube top", rs: "clothesBoughtCasual"},

		{name: "Boyshorts", value: "boyshorts", rs: "clothesBoughtUnderwear"},
		{name: "Bra", value: "a bra", rs: "clothesBoughtUnderwear"},
		{name: "Kitty lingerie", value: "kitty lingerie", rs: "clothesBoughtUnderwear"},
		{name: "Panties and pasties", value: "panties and pasties", rs: "clothesBoughtUnderwear"},
		{name: "Skimpy loincloth", value: "a skimpy loincloth", rs: "clothesBoughtUnderwear"},
		{name: "Thong", value: "a thong", rs: "clothesBoughtUnderwear"},
		{name: "Pasties", value: "pasties", rs: "clothesBoughtUnderwear"},

		{
			name: "Leather pants and pasties",
			value: "leather pants and pasties",
			rs: {
				clothesBoughtUnderwear: 1,
				clothesBoughtCasual: 1
			}
		},
		{
			name: "T-shirt and thong",
			value: "a t-shirt and thong",
			rs: {
				clothesBoughtUnderwear: 1,
				clothesBoughtCasual: 1
			}
		},
		{
			name: "Tube top and thong",
			value: "a tube top and thong",
			rs: {
				clothesBoughtUnderwear: 1,
				clothesBoughtCasual: 1
			}
		},
		{
			name: "Oversized t-shirt and boyshorts",
			value: "an oversized t-shirt and boyshorts",
			rs: {
				clothesBoughtUnderwear: 1,
				clothesBoughtCasual: 1
			}
		},
		{name: "Sport shorts and a sports bra", value: "sport shorts and a sports bra", rs: "clothesBoughtSports"},
		{name: "Sport shorts", value: "sport shorts", rs: "clothesBoughtSports"},
		{name: "Sports bra", value: "a sports bra", rs: "clothesBoughtSports"},
		{
			name: "Sport shorts and a t-shirt",
			value: "sport shorts and a t-shirt",
			rs: {
				clothesBoughtSports: 1,
				clothesBoughtCasual: 1
			}
		},
		{name: "Pony outfit (nice)", value: "a nice pony outfit", rs: "clothesBoughtPony"},
		{name: "Pony outfit (slutty)", value: "a slutty pony outfit", rs: "clothesBoughtPony"},

		{name: "Monokini", value: "a monokini", rs: "clothesBoughtSwimwear"},
		{name: "One-piece swimsuit", value: "a one-piece swimsuit", rs: "clothesBoughtSwimwear"},

		{
			name: "Striped bra",
			value: "a striped bra",
			rs: {
				either: {
					clothesBoughtPantsu: 1,
					continent: "Japan"
				}
			}
		},
		{
			name: "Striped panties",
			value: "striped panties",
			rs: {
				either: {
					clothesBoughtPantsu: 1,
					continent: "Japan"
				}
			}
		},
		{
			name: "Striped underwear",
			value: "striped underwear",
			rs: {
				either: {
					clothesBoughtPantsu: 1,
					continent: "Japan"
				}
			}
		},

		// "Normal" things:
		{name: "Apron", value: "an apron"},
		{name: "Bangles", value: "slutty jewelry"},
		{name: "Clubslut netting", value: "clubslut netting"},
		{name: "Cutoffs and a t-shirt", value: "cutoffs and a t-shirt"},
		{name: "Bodysuit", value: "a comfortable bodysuit"},
		{name: "Cheerleader", value: "a cheerleader outfit"},
		{name: "Fallen nun", value: "a fallen nuns habit"},
		{name: "Hijab and abaya", value: "a hijab and abaya"},
		{name: "Leotard", value: "a leotard"},
		{name: "Maid (slutty)", value: "a slutty maid outfit"},
		{name: "Mini dress", value: "a mini dress"},
		{name: "Nice lingerie", value: "attractive lingerie"},
		{name: "Nurse (slutty)", value: "a slutty nurse outfit"},
		{name: "Overalls", value: "overalls"},
		{name: "Panties", value: "panties"},
		{name: "Scalemail bikini", value: "a scalemail bikini"},
		{name: "Schoolgirl", value: "a schoolgirl outfit"},
		{name: "Slutty outfit", value: "a slutty outfit"},
		{name: "Spats and a tank top", value: "spats and a tank top"},
		{name: "String bikini", value: "a string bikini"},
		{name: "Succubus costume", value: "a succubus outfit"},
		{name: "Suit (slutty)", value: "slutty business attire"},

		// {name: "Let them choose", value: "choosing her own clothes"},
		{name: "Haltertop dress", value: "a halter top dress"},
		{name: "Slave gown", value: "a slave gown"}
	],

	harshClothes: [{
			name: "Chains",
			value: "chains",
			fs: "FSDegradationist",
			rs: "clothesBoughtChains"
		},
		{name: "Go naked", value: "no clothing"},
		{name: "Penitent nun", value: "a penitent nuns habit"},
		{name: "Restrictive latex", value: "restrictive latex"},
		{name: "Shibari ropes", value: "shibari ropes"},
		{name: "Uncomfortable straps", value: "uncomfortable straps"}
	],

	niceCollars: [
		{name: "Stylish leather", value: "stylish leather"},
		{name: "Satin choker", value: "satin choker"},
		{name: "Silken ribbon", value: "silk ribbon"},
		{name: "Heavy gold", value: "heavy gold"},
		{name: "Pretty jewelry", value: "pretty jewelry"},
		{name: "Nice retirement counter", value: "nice retirement counter", rs: "seeAge"},
		{name: "Bell", value: "bell collar"},
		{name: "Cowbell", value: "leather with cowbell"},
		{
			name: "Bowtie collar",
			value: "bowtie",
			fs: "FSGenderFundamentalist",
			rs: "clothesBoughtBunny"
		},
		{
			name: "Ancient Egyptian",
			value: "ancient Egyptian",
			fs: "FSEgyptianRevivalist",
			rs: "clothesBoughtEgypt"
		},
	],

	harshCollars: [
		{name: "Tight steel", value: "tight steel"},
		{name: "Cruel retirement counter", value: "cruel retirement counter", rs: "seeAge"},
		{name: "Uncomfortable leather", value: "uncomfortable leather"},
		{name: "Pregnancy biometrics", value: "preg biometrics", rs: "seePreg"},
		{name: "Shock punishment", value: "shock punishment"},
		{name: "Dildo gag", value: "dildo gag"},
		{name: "Massive dildo gag", value: "massive dildo gag", rs: "buyGag"},
		{name: "Ball gag", value: "ball gag"},
		{name: "Bit gag", value: "bit gag"},
		{name: "Neck corset", value: "neck corset"},
		{name: "Porcelain mask", value: "porcelain mask"}
	],

	shoes: [
		{name: "Barefoot", value: "none"},
		{name: "Flats", value: "flats"},
		{name: "Heels", value: "heels"},
		{name: "Pumps", value: "pumps"},
		{name: "Thigh boots", value: "boots"},
		{name: "Painfully extreme heels", value: "extreme heels"},
		{
			name: "Platforms",
			value: "platform shoes",
			fs: "FSStatuesqueGlorification",
			rs: "shoesBoughtHeels"
		},
		{
			name: "Platform heels",
			value: "platform heels",
			fs: "FSStatuesqueGlorification",
			rs: "shoesBoughtHeels"
		},
		{
			name: "Painfully extreme platform heels",
			value: "extreme platform heels",
			fs: "FSStatuesqueGlorification",
			rs: "shoesBoughtHeels"
		}
	],

	bellyAccessories: [
		{name: "None", value: "none"},
		{name: "Tight corset", value: "a corset"},
		{name: "Extreme corset", value: "an extreme corset"},
		{name: "Supportive band", value: "a support band"},
		{
			name: "1st Trimester belly",
			value: "a small empathy belly",
			fs: "FSRepopulationFocus",
			rs: "clothesBoughtBelly"
		},
		{
			name: "2nd Trimester belly",
			value: "a medium empathy belly",
			fs: "FSRepopulationFocus",
			rs: "clothesBoughtBelly"
		},
		{
			name: "3rd Trimester belly",
			value: "a large empathy belly",
			fs: "FSRepopulationFocus",
			rs: "clothesBoughtBelly"
		},
		{
			name: "3rd Trimester twins belly",
			value: "a huge empathy belly",
			fs: "FSRepopulationFocus",
			rs: "clothesBoughtBelly"
		}
	],

	vaginalAccessories: [{
			name: "None",
			value: "none"
		},
		{
			name: "Bullet vibrator",
			value: "bullet vibrator"
		},
		{
			name: "Smart bullet vibrator",
			value: "smart bullet vibrator",
			rs: "toysBoughtSmartVibes"
		},
		{
			name: "Dildo",
			value: "dildo"
		},
		{
			name: "Long dildo",
			value: "long dildo",
			rs: "buyBigDildos"
		},
		{
			name: "Large dildo",
			value: "large dildo"
		},
		{
			name: "Long, large dildo",
			value: "long, large dildo",
			rs: "buyBigDildos"
		},
		{
			name: "Huge dildo",
			value: "huge dildo"
		},
		{
			name: "Long, huge dildo",
			value: "long, huge dildo",
			rs: "buyBigDildos"
		}
	],

	vaginalAttachments: [
		{name: "None", value: "none"},
		{
			name: "Vibrating attachment",
			value: "vibrator",
		}
	],

	dickAccessories: [
		{name: "None", value: "none"},
		{
			name: "Bullet vibrator",
			value: "bullet vibrator"
		},
		{
			name: "Smart bullet vibrator",
			value: "smart bullet vibrator"
		}
	],

	buttplugs: [{
			name: "None",
			value: "none"
		},
		{
			name: "Standard plug",
			value: "plug"
		},
		{
			name: "Long plug",
			value: "long plug",
			rs: "toysBoughtButtPlugs"
		},
		{
			name: "Large plug",
			value: "large plug"
		},
		{
			name: "Long, large plug",
			value: "long, large plug",
			rs: "toysBoughtButtPlugs",
		},
		{
			name: "Huge plug",
			value: "huge plug",
		},
		{
			name: "Long, huge plug",
			value: "long, huge plug",
			rs: "toysBoughtButtPlugs",
		}
	],

	buttplugAttachments: [
		{name: "None", value: "none"},
		{name: "Tail", value: "tail", rs: "toysBoughtButtPlugTails"},
		{name: "Fox tail", value: "fox tail", rs: "toysBoughtButtPlugTails"},
		{name: "Cat tail", value: "cat tail", rs: "toysBoughtButtPlugTails"},
		{name: "Cow tail", value: "cow tail", rs: "toysBoughtButtPlugTails"}
	],

	chastityDevices: [
		// '.value' must be a string, so using update slave so I can update multiple values.
		{
			name: "None",
			value: "none",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 0,
				chastityVagina: 0
			},
		},
		{
			name: "Anal chastity",
			value: "anal chastity",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 0,
				chastityVagina: 0
			}
		},
		{
			name: "Chastity belt",
			value: "chastity belt",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 0,
				chastityVagina: 1
			},
		},
		{
			name: "Combined chastity belt",
			value: "combined chastity belt",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 0,
				chastityVagina: 1
			},
		},
		{
			name: "Chastity cage",
			value: "chastity cage",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 1,
				chastityVagina: 0
			},
		},
		{
			name: "Combined chastity cage",
			value: "combined chastity cage",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 1,
				chastityVagina: 0
			},
		},
		{
			name: "Genital chastity",
			value: "genital chastity",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 1,
				chastityVagina: 1
			},
		},
		{
			name: "Full chastity",
			value: "full chastity",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 1,
				chastityVagina: 1
			},
		},
		{
			name: "Choose own chastity",
			value: "choose own chastity",
			fs: "FSRestart",
			updateSlave: {
				choosesOwnChastity: 1
			},
		},
		{
			name: "Revoke choosing own chastity",
			value: "revoke choosing own chastity",
			fs: "FSRestart",
			updateSlave: {
				choosesOwnChastity: 0
			},
		},
	],

	facilityCareers: ["be confined in the arcade", "be confined in the cellblock", "be the Attendant", "be the DJ", "be the Farmer", "be the Madam", "be the Matron", "be the Milkmaid", "be the Nurse", "be the Schoolteacher", "be the Stewardess", "be the Wardeness", "be your Concubine", "get treatment in the clinic", "learn in the schoolroom", "live with your Head Girl", "rest in the spa", "serve in the club", "serve in the master suite", "work as a farmhand", "work as a nanny", "work as a servant", "work in the brothel", "work in the dairy"],

	facilityHeads: ["be the Attendant", "be the DJ", "be the Farmer", "be the Madam", "be the Matron", "be the Milkmaid", "be the Nurse", "be the Schoolteacher", "be the Stewardess", "be the Wardeness", "be your Concubine"],

	secExCombatPrestige: ["$He is well known for being a great commander.", "$He is famous for being an incredible commander.", "$He is known as a legendary commander all over the world."],

	lightColorMap: {
		"rgb(0, 0, 0)": "rgb(255, 255, 255)",
		"rgb(255, 255, 0)": "rgb(255, 255, 0)",
		"rgb(238, 238, 238)": "rgb(17, 17, 17)",
		"rgb(17, 17, 17)": "rgb(238, 238, 238)",
		"linear-gradient(90deg, rgb(17, 17, 17), rgba(17, 17, 17, 0.8) 60%, rgba(17, 17, 17, 0))": "linear-gradient(90deg, rgb(238, 238, 238), rgba(238, 238, 238, 0.8) 60%, rgba(238, 238, 238, 0))",
		"red": "red",
		"rgb(102, 136, 221)": "rgb(102, 136, 221)",
		"rgb(136, 170, 255)": "rgb(136, 170, 255)",
		"rgb(204, 34, 34)": "rgb(204, 34, 34)",
		"rgb(238, 68, 68)": "rgb(238, 68, 68)",
		"rgb(170, 170, 170)": "rgb(170, 170, 170)",
		"rgb(51, 85, 170)": "rgb(118, 145, 214)",
		"rgb(85, 119, 204)": "rgb(85, 119, 204)",
		"rgb(68, 68, 68)": "rgb(187, 187, 187)",
		"rgb(51, 51, 51)": "rgb(204, 204, 204)",
		"rgb(85, 17, 17)": "rgb(85, 17, 17)",
		"rgb(187, 68, 68)": "rgb(187, 68, 68)",
		"rgb(153, 153, 153)": "rgb(153, 153, 153)",
		"rgb(34, 136, 34)": "rgb(34, 136, 34)",
		"rgb(68, 170, 68)": "rgb(68, 170, 68)",
		"rgb(34, 34, 34)": "rgb(221, 221, 221)",
		"rgb(34, 51, 68)": "rgb(34, 51, 68)",
		"rgb(85, 85, 85)": "rgb(170, 170, 170)",
		"rgba(0, 0, 0, 0.25)": "rgba(0, 0, 0, 0.25)",
		"rgb(46, 46, 46)": "rgb(209, 209, 208)",
		"rgb(119, 119, 119)": "rgb(136, 136, 136)",
		"rgb(0, 30, 0)": "rgb(220, 245, 220)",
		"rgb(15, 40, 15)": "rgb(245, 255, 245)",
		"green": "green",
		"aquamarine": "lightseagreen",
		"coral": "coral",
		"cyan": "darkcyan",
		"darkgoldenrod": "darkgoldenrod",
		"darkred": "darkred",
		"darkviolet": "darkviolet",
		"deeppink": "deeppink",
		"deepskyblue": "deepskyblue",
		"gold": "gold",
		"goldenrod": "goldenrod",
		"gray": "gray",
		"hotpink": "hotpink",
		"lawngreen": "darkgreen",
		"lightblue": "lightblue",
		"lightcoral": "lightcoral",
		"lightgreen": "lightgreen",
		"lightpink": "lightpink",
		"lightsalmon": "lightsalmon",
		"lime": "green",
		"limegreen": "limegreen",
		"magenta": "magenta",
		"mediumaquamarine": "mediumaquamarine",
		"mediumorchid": "mediumorchid",
		"mediumseagreen": "mediumseagreen",
		"orange": "orange",
		"orangered": "orangered",
		"orchid": "orchid",
		"pink": "deeppink",
		"seagreen": "seagreen",
		"springgreen": "green",
		"tan": "brown",
		"yellow": "orange",
		"yellowgreen": "yellowgreen"
	},

	defaultColorMap: {
		"rgb(0, 0, 0)": "rgb(0, 0, 0)",
		"rgb(255, 255, 0)": "rgb(255, 255, 0)",
		"rgb(238, 238, 238)": "rgb(238, 238, 238)",
		"rgb(17, 17, 17)": "rgb(17, 17, 17)",
		"linear-gradient(90deg, rgba(17,17,17,1), rgba(17,17,17,0.8) 60%, rgba(17,17,17,0))": "linear-gradient(90deg, rgba(17,17,17,1), rgba(17,17,17,0.8) 60%, rgba(17,17,17,0))",
		"red": "red",
		"rgb(102, 136, 221)": "rgb(102, 136, 221)",
		"rgb(136, 170, 255)": "rgb(136, 170, 255)",
		"rgb(204, 34, 34)": "rgb(204, 34, 34)",
		"rgb(238, 68, 68)": "rgb(238, 68, 68)",
		"rgb(170, 170, 170)": "rgb(170, 170, 170)",
		"rgb(51, 85, 170)": "rgb(51, 85, 170)",
		"rgb(85, 119, 204)": "rgb(85, 119, 204)",
		"rgb(68, 68, 68)": "rgb(68, 68, 68)",
		"rgb(51, 51, 51)": "rgb(51, 51, 51)",
		"rgb(85, 17, 17)": "rgb(85, 17, 17)",
		"rgb(187, 68, 68)": "rgb(187, 68, 68)",
		"rgb(153, 153, 153)": "rgb(153, 153, 153)",
		"rgb(34, 136, 34)": "rgb(34, 136, 34)",
		"rgb(68, 170, 68)": "rgb(68, 170, 68)",
		"rgb(34, 34, 34)": "rgb(34, 34, 34)",
		"rgb(34, 51, 68)": "rgb(34, 51, 68)",
		"rgb(85, 85, 85)": "rgb(85, 85, 85)",
		"rgba(0, 0, 0, 0.25)": "rgba(0, 0, 0, 0.25)",
		"rgb(46, 46, 46)": "rgb(46, 46, 46)",
		"rgb(119, 119, 119)": "rgb(119, 119, 119)",
		"green": "green",
		"aquamarine": "aquamarine",
		"coral": "coral",
		"cyan": "cyan",
		"darkgoldenrod": "darkgoldenrod",
		"darkred": "darkred",
		"darkviolet": "darkviolet",
		"deeppink": "deeppink",
		"deepskyblue": "deepskyblue",
		"gold": "gold",
		"goldenrod": "goldenrod",
		"gray": "gray",
		"hotpink": "hotpink",
		"lawngreen": "lawngreen",
		"lightblue": "lightblue",
		"lightcoral": "lightcoral",
		"lightgreen": "lightgreen",
		"lightpink": "lightpink",
		"lightsalmon": "lightsalmon",
		"lime": "lime",
		"limegreen": "limegreen",
		"magenta": "magenta",
		"mediumaquamarine": "mediumaquamarine",
		"mediumorchid": "mediumorchid",
		"mediumseagreen": "mediumseagreen",
		"orange": "orange",
		"orangered": "orangered",
		"orchid": "orchid",
		"pink": "pink",
		"seagreen": "seagreen",
		"springgreen": "springgreen",
		"tan": "tan",
		"yellow": "yellow",
		"yellowgreen": "yellowgreen"
	}
};

/* Nationalities based on $continent value. Note that $continent can be undefined! */
App.Data.misc.nationalityPoolSelector = {
	"North America": App.Data.misc.northamericaNationalities,
	"South America": App.Data.misc.southamericaNationalities,
	"Europe": App.Data.misc.europeNationalities,
	"Asia": App.Data.misc.asiaNationalities,
	"the Middle East": App.Data.misc.middleeastNationalities,
	"Africa": App.Data.misc.africaNationalities,
	"Australia": App.Data.misc.australiaNationalities,
	"Japan": App.Data.misc.asiaNationalities,
	"Brazil": App.Data.misc.southamericaNationalities
};

App.Data.weather = {
	nice: [
		{name: "Sunny", severity: 1},
		{name: "Cloudy", severity: 1},
		{name: "Partly Cloudy", severity: 1},
		{name: "Overcast", severity: 1},
		{name: "Light Wind", severity: 1},
		{name: "Clear and Calm", severity: 1},
		{name: "Light Rain", severity: 1},
		{name: "Heavy Rain", severity: 1},
		{name: "Smoke warning", severity: 1},
	],
	light: [
		{name: "High Winds", severity: 2},
		{name: "Acid Rain", severity: 2},
		{name: "T-Storm Warning", severity: 2},
		{name: "Flood Warning", severity: 2},
		{name: "Tornado Warning", severity: 2},
		{name: "Light Sandstorm", severity: 2},
		{name: "High Heat", severity: 2},
		{name: "Smoky", severity: 2},
	],
	heavy: [
		{name: "Extreme Winds", severity: 3},
		{name: "Heavy Acid Rain", severity: 3},
		{name: "Extreme T-storm", severity: 3},
		{name: "Flooding", severity: 3},
		{name: "Tornadoes", severity: 3},
		{name: "Sandstorm", severity: 3},
		{name: "Extreme Heat", severity: 3},
		{name: "Dense Smoke", severity: 3},
	],
	extreme: [
		{name: "Solar Flare", severity: 4},
		{name: "Ion Storm", severity: 4},
		{name: "Cataclysmic Rains", severity: 4},
		{name: "Cat 6 Hurricane", severity: 4},
		{name: "Abrasive Sandstorm", severity: 4},
		{name: "Radiological Warning", severity: 4},
	]
};
