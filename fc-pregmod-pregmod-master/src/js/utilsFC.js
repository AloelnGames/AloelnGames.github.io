/* contains functions that rely on FC specific variables/conventions */
/* eslint-disable no-unused-vars */
/*
 * Height.mean(nationality, race, genes, age) - returns the mean height for the given combination and age in years (>=2)
 * Height.mean(nationality, race, genes) - returns the mean adult height for the given combination
 * Height.mean(slave) - returns the mean (expected) height for the given slave
 *
 * Height.random(nationality, race, genes, age) - returns a random height using the skew-normal distribution
 *													around the mean height for the given arguments
 * Height.random(nationality, race, genes) - returns a random height for the given combination of an adult, as above
 * Height.random(slave[, options]) - returns a random height for the given slave, as above.
 *										The additional options object can modify how the values are generated
 *										in the same way setting them as global configuration would, but only for this
 *										specific generation.
 *
 *										Example: Only generate above-average heights based on $activeSlave:
 *										Height.random($activeSlave, {limitMult: [0, 5]})
 *
 * Height.forAge(height, age, genes) - returns the height adapted to the age and genes
 * Height.forAge(height, slave) - returns the height adapted to the slave's age and genes
 *
 * Height.config(configuration) - configures the random height generator globally and returns the current configuration
 *	The options and their default values are:
 *	limitMult: [-3, 3] - Limit to the values the underlying (normal) random generator returns.
 *						In normal use, the values are almost never reached; only 0.27% of values are
 *						outside this range and need to be regenerated. With higher skew (see below),
 *						this might change.
 *	spread: 0.05 - The random values generated are multiplied by this and added to 1 to generate
 *					the final height multiplier. The default value together with the default limitMult
 *					means that the generated height will always fall within (1 - 0.05 * 3) = 85% and
 *					(1 + 0.05 * 3) = 115% of the mean height.
 *					Minimum value: 0.001; maximum value: 0.5
 *	skew: 0 - How much the height distribution skews to the right (positive) or left (negative) side
 *				of the height.
 *				Minimum value: -1000, maximum value: 1000
 *	limitHeight: [0, 999] - Limit the resulting height range. Warning: A small height limit range
 *							paired with a high spread value results in the generator having to
 *							do lots of work generating and re-generating random heights until
 *							one "fits".
 *
 * Anon's explanation:
 * limitMult: [0, -30]
 *
 * This specifies a range going up from 0 to -30. It needs to go [-30, 0] instead. Same thing with [0, -5] two lines down. note: technically, this isn't true, because for some bizarre reason Height.random reverses the numbers for you if you get them wrong. But it's important to establish good habits, so.
 *
 * Skew, spread, limitMult: These are statistics things. BTW, a gaussian distribution is a normal distribution. Just a naming thing.
 *
 * Skew: The shape parameter of a skew-normal distribution. See http://azzalini.stat.unipd.it/SN/Intro/intro.html for more details. Basically a measure of how asymmetrical the curve is. It doesn't move the main mass of the distribution. Rather, it's more like it moves mass from one of the tails into the main mass of the distribution.
 *
 * Spread: Changes the average distance from the mean, making the graph wider and shorter. Moves "mass" from the center to the tail. It's basically standard deviation, but named funny because FC codebase. Changing this can have dramatic effects. It's advised to keep this at or below 0.1 for usual height generation.
 *
 * limitMult: A clamp, expressed in z-score. (z=1 is one standard dev above mean, for ex.) If it excludes too much of the distribution the other parameters describe, you're going to spend lots of CPU making and throwing away heights. Don't worry about this unless you run into it.
 *
 * There's also limitHeight which you're not using. It's basically limitMult in different units.
 */
window.Height = (function() {
	"use strict";

	// Global configuration (for different game modes/options/types)
	let minMult = -3.0;
	let maxMult = 3.0;
	let skew = 0.0;
	let spread = 0.05;
	let minHeight = 0;
	let maxHeight = 999;

	/**
	 * Configuration method for the above values
	 * @param {any} [conf]
	 * @returns {object}
	 */
	const _config = function(conf) {
		if (_.isUndefined(conf)) {
			return {
				limitMult: [minMult, maxMult],
				limitHeight: [minHeight, maxHeight],
				skew: skew,
				spread: spread
			};
		}
		if (_.isFinite(conf.skew)) {
			skew = Math.clamp(conf.skew, -1000, 1000);
		}
		if (_.isFinite(conf.spread)) {
			spread = Math.clamp(conf.spread, 0.001, 0.5);
		}
		if (_.isArray(conf.limitMult) && conf.limitMult.length === 2 && conf.limitMult[0] !== conf.limitMult[1] &&
			_.isFinite(conf.limitMult[0]) && _.isFinite(conf.limitMult[1])) {
			minMult = Math.min(conf.limitMult[0], conf.limitMult[1]);
			maxMult = Math.max(conf.limitMult[0], conf.limitMult[1]);
		}
		if (_.isArray(conf.limitHeight) && conf.limitHeight.length === 2 && conf.limitHeight[0] !== conf.limitHeight[1] &&
			_.isFinite(conf.limitHeight[0]) && _.isFinite(conf.limitHeight[1])) {
			minHeight = Math.min(conf.limitHeight[0], conf.limitHeight[1]);
			maxHeight = Math.max(conf.limitHeight[0], conf.limitHeight[1]);
		}
		return {
			limitMult: [minMult, maxMult],
			limitHeight: [minHeight, maxHeight],
			skew: skew,
			spread: spread
		};
	};

	/* if you can find an average for an undefined, add it in! */
	const xxMeanHeight = {
		"Afghan": 155.08,
		"Albanian": 161.77,
		"Algerian": 159.09,
		"American.asian": 158.4,
		"American.black": 163.6,
		"American.latina": 158.9,
		"American.white": 165,
		"American": 163.54,
		"Andorran": 162.9,
		"Angolan": 157.31,
		"Antiguan": 160.65,
		"Argentinian": 159.18,
		"Armenian": 158.09,
		"Aruban": 158,
		"Australian": 165.86,
		"Austrian": 164.62,
		"Azerbaijani": 158.25,
		"Bahamian": 160.68,
		"Bahraini": 156.69,
		"Bangladeshi": 150.79,
		"Barbadian": 165.28,
		"Belarusian": 166.35,
		"Belgian": 165.49,
		"Belizean": 156.88,
		"Beninese": 156.16,
		"Bermudian": 160.69,
		"Bhutanese": 153.63,
		"Bissau-Guinean": 158.24,
		"Bolivian": 153.89,
		"Bosnian": 165.85,
		"Brazilian": 160.86,
		"British": 164.4,
		"Bruneian": 153.98,
		"Bulgarian": 164.8,
		"Burkinabé": 160.19,
		"Burmese": 154.37,
		"Burundian": 154.02,
		"Cambodian": 152.91,
		"Cameroonian": 158.82,
		"Canadian": 163.91,
		"Cape Verdean": 161.65,
		"Catalan": 163.4,
		"Central African": 158.04,
		"Chadian": 160.17,
		"Chilean": 159.36,
		"Chinese": 159.71,
		"Colombian": 156.85,
		"Comorian": 155.58,
		"Congolese": 157.57,
		"a Cook Islander": 163.19,
		"Costa Rican": 156.37,
		"Croatian": 165.63,
		"Cuban": 157.98,
		"Curaçaoan": 158,
		"Cypriot": 162.27,
		"Czech": 168.46,
		"Danish": 167.21,
		"Djiboutian": 156.11,
		"Dominican": 159.03,
		"Dominiquais": 164.34,
		"Dutch": 168.72,
		"East Timorese": 151.15,
		"Ecuadorian": 154.23,
		"Egyptian": 157.33,
		"Emirati": 158.68,
		"Equatoguinean": 157.33,
		"Eritrean": 156.39,
		"Estonian": 168.67,
		"Ethiopian": 155.71,
		"Fijian": 161.69,
		"Filipina": 149.6,
		"Finnish": 165.9,
		"French Guianan": 157,
		"French Polynesian": 164.52,
		"French": 164.88,
		"Gabonese": 158.84,
		"Gambian": 160.93,
		"Georgian": 162.98,
		"German": 165.86,
		"Ghanan": 157.91,
		"Greek": 164.87,
		"Greenlandic": 161.55,
		"Grenadian": 164.51,
		"Guamanian": 153.7,
		"Guatemalan": 149.39,
		"Guinean": 157.8,
		"Guyanese": 157.92,
		"Haitian": 158.72,
		"Honduran": 153.84,
		"Hungarian": 163.66,
		"I-Kiribati": 157,
		"Icelandic": 165.95,
		"Indian": 152.59,
		"Indonesian": 152.8,
		"Iranian": 159.67,
		"Iraqi": 158.67,
		"Irish": 165.11,
		"Israeli": 161.8,
		"Italian": 164.61,
		"Ivorian": 158.07,
		"Jamaican": 163.12,
		"Japanese": 158.31,
		"Jordanian": 158.83,
		"Kazakh": 158.58,
		"Kenyan": 158.16,
		"Kittitian": 159.2,
		"Korean": 160.65,
		"Kosovan": 165.7,
		"Kurdish": 165,
		"Kuwaiti": 159.43,
		"Kyrgyz": 159.35,
		"Laotian": 151.28,
		"Latvian": 169.8,
		"Lebanese": 162.43,
		"Liberian": 157.3,
		"Libyan": 162.08,
		"a Liechtensteiner": 164.3,
		"Lithuanian": 166.61,
		"Luxembourgian": 164.43,
		"Macedonian": 159.75,
		"Malagasy": 151.18,
		"Malawian": 154.4,
		"Malaysian": 156.3,
		"Maldivian": 155.02,
		"Malian": 160.47,
		"Maltese": 160.85,
		"Marshallese": 151.31,
		"Mauritanian": 157.72,
		"Mauritian": 157.24,
		"Mexican": 156.85,
		"Micronesian": 156.09,
		"Moldovan": 163.24,
		"Monégasque": 164.61,
		"Mongolian": 158.22,
		"Montenegrin": 164.86,
		"Moroccan": 157.82,
		"Mosotho": 155.71,
		"Motswana": 161.38,
		"Mozambican": 153.96,
		"Namibian": 158.78,
		"Nauruan": 153.98,
		"Nepalese": 150.86,
		"New Caledonian": 158,
		"a New Zealander": 164.94,
		"Ni-Vanuatu": 158.17,
		"Nicaraguan": 154.39,
		"Nigerian": 156.32,
		"Nigerien": 158.25,
		"Niuean": 164.8,
		"Norwegian": 165.56,
		"Omani": 157.19,
		"Pakistani": 153.84,
		"Palauan": 156.22,
		"Palestinian": 158.75,
		"Panamanian": 155.47,
		"Papua New Guinean": 154.87,
		"Paraguayan": 159.86,
		"Peruvian": 152.93,
		"Polish": 164.59,
		"Portuguese": 163.04,
		"Puerto Rican": 159.2,
		"Qatari": 159.38,
		"Romanian": 162.73,
		"Russian": 165.27,
		"Rwandan": 154.79,
		"Sahrawi": 157.82,
		"Saint Lucian": 162.31,
		"Salvadoran": 154.55,
		"Sammarinese": 164.61,
		"Samoan": 161.97,
		"São Toméan": 158.91,
		"Saudi": 155.88,
		"Scottish": 163,
		"Senegalese": 162.52,
		"Serbian": 167.69,
		"Seychellois": 162.08,
		"Sierra Leonean": 156.6,
		"Singaporean": 160.32,
		"Slovak": 167.47,
		"Slovene": 166.05,
		"a Solomon Islander": 154.42,
		"Somali": 156.06,
		"South African": 158.03,
		"South Sudanese": 169,
		"Spanish": 163.4,
		"Sri Lankan": 154.56,
		"Sudanese": 156.04,
		"Surinamese": 160.66,
		"Swazi": 158.64,
		"Swedish": 165.7,
		"Swiss": 163.45,
		"Syrian": 158.65,
		"Taiwanese": 161.45,
		"Tajik": 157.33,
		"Tanzanian": 156.6,
		"Thai": 157.87,
		"Tibetan": 158.75,
		"Togolese": 158.3,
		"Tongan": 165.52,
		"Trinidadian": 160.64,
		"Tunisian": 160.35,
		"Turkish": 160.5,
		"Turkmen": 161.73,
		"Tuvaluan": 158.1,
		"Ugandan": 156.72,
		"Ukrainian": 166.34,
		"Uruguayan": 162.13,
		"Uzbek": 157.82,
		"Vatican": 162.5,
		"Venezuelan": 157.44,
		"Vietnamese": 153.59,
		"Vincentian": 160.7,
		"Yemeni": 153.97,
		"Zairian": 155.25,
		"Zambian": 155.82,
		"Zimbabwean": 158.22,
		"": 159.65, // default
	};
	const xyMeanHeight = {
		"Afghan": 165.26,
		"Albanian": 173.39,
		"Algerian": 170.07,
		"American.asian": 172.5,
		"American.black": 177.4,
		"American.latina": 172.5,
		"American.white": 178.2,
		"American": 177.13,
		"Andorran": 176.06,
		"Angolan": 167.31,
		"Antiguan": 164.8,
		"Argentinian": 174.62,
		"Armenian": 172,
		"Aruban": 165.1,
		"Australian": 179.2,
		"Austrian": 177.41,
		"Azerbaijani": 169.75,
		"Bahamian": 172.75,
		"Bahraini": 167.74,
		"Bangladeshi": 163.81,
		"Barbadian": 175.92,
		"Belarusian": 178.44,
		"Belgian": 181.7,
		"Belizean": 168.73,
		"Beninese": 167.06,
		"Bermudian": 172.69,
		"Bhutanese": 165.31,
		"Bissau-Guinean": 167.9,
		"Bolivian": 166.85,
		"Bosnian": 180.87,
		"Brazilian": 173.55,
		"British": 177.49,
		"Bruneian": 165.01,
		"Bulgarian": 178.24,
		"Burkinabé": 169.33,
		"Burmese": 164.67,
		"Burundian": 166.64,
		"Cambodian": 163.33,
		"Cameroonian": 167.82,
		"Canadian": 178.09,
		"Cape Verdean": 173.22,
		"Catalan": 175.8,
		"Central African": 166.67,
		"Chadian": 170.44,
		"Chilean": 171.81,
		"Chinese": 171.83,
		"Colombian": 169.5,
		"Comorian": 166.19,
		"Congolese": 167.45,
		"a Cook Islander": 174.77,
		"Costa Rican": 168.93,
		"Croatian": 180.78,
		"Cuban": 172,
		"Curaçaoan": 165.1,
		"Cypriot": 174.99,
		"Czech": 180.1,
		"Danish": 181.39,
		"Djiboutian": 166.57,
		"Dominican": 172.75,
		"Dominiquais": 176.31,
		"Dutch": 182.54,
		"East Timorese": 159.79,
		"Ecuadorian": 167.08,
		"Egyptian": 166.68,
		"Emirati": 170.46,
		"Equatoguinean": 167.36,
		"Eritrean": 168.36,
		"Estonian": 181.59,
		"Ethiopian": 166.23,
		"Fijian": 173.9,
		"Filipina": 163.23,
		"Finnish": 179.59,
		"French Guianan": 168,
		"French Polynesian": 177.41,
		"French": 179.74,
		"Gabonese": 167.94,
		"Gambian": 165.4,
		"Georgian": 174.34,
		"German": 179.88,
		"Ghanan": 168.85,
		"Greek": 177.32,
		"Greenlandic": 174.87,
		"Grenadian": 176.97,
		"Guamanian": 169.8,
		"Guatemalan": 163.41,
		"Guinean": 167.54,
		"Guyanese": 170.21,
		"Haitian": 172.64,
		"Honduran": 166.39,
		"Hungarian": 177.26,
		"I-Kiribati": 169.2,
		"Icelandic": 180.49,
		"Indian": 164.95,
		"Indonesian": 163.55,
		"Iranian": 170.3,
		"Iraqi": 170.43,
		"Irish": 178.93,
		"Israeli": 176.86,
		"Italian": 177.77,
		"Ivorian": 166.53,
		"Jamaican": 174.53,
		"Japanese": 170.82,
		"Jordanian": 171.03,
		"Kazakh": 171.14,
		"Kenyan": 169.64,
		"Kittitian": 169.62,
		"Korean": 173.46,
		"Kosovan": 179.5,
		"Kurdish": 175,
		"Kuwaiti": 172.07,
		"Kyrgyz": 171.24,
		"Laotian": 160.52,
		"Latvian": 181.42,
		"Lebanese": 174.39,
		"Liberian": 163.66,
		"Libyan": 173.53,
		"a Liechtensteiner": 175.4,
		"Lithuanian": 179.03,
		"Luxembourgian": 177.86,
		"Macedonian": 178.33,
		"Malagasy": 161.55,
		"Malawian": 166,
		"Malaysian": 167.89,
		"Maldivian": 167.68,
		"Malian": 171.3,
		"Maltese": 173.32,
		"Marshallese": 162.81,
		"Mauritanian": 163.28,
		"Mauritian": 170.5,
		"Mexican": 169.01,
		"Micronesian": 168.51,
		"Moldovan": 175.49,
		"Monégasque": 177.77,
		"Mongolian": 169.07,
		"Montenegrin": 178.28,
		"Moroccan": 170.4,
		"Mosotho": 165.59,
		"Motswana": 171.63,
		"Mozambican": 164.8,
		"Namibian": 166.96,
		"Nauruan": 167.83,
		"Nepalese": 162.32,
		"New Caledonian": 171,
		"a New Zealander": 177.74,
		"Ni-Vanuatu": 168.09,
		"Nicaraguan": 166.71,
		"Nigerian": 165.91,
		"Nigerien": 167.68,
		"Niuean": 175.83,
		"Norwegian": 179.75,
		"Omani": 169.16,
		"Pakistani": 166.95,
		"Palauan": 167.69,
		"Palestinian": 172.09,
		"Panamanian": 168.49,
		"Papua New Guinean": 163.57,
		"Paraguayan": 172.83,
		"Peruvian": 165.23,
		"Polish": 177.33,
		"Portuguese": 172.93,
		"Puerto Rican": 172.08,
		"Qatari": 170.48,
		"Romanian": 174.74,
		"Russian": 176.46,
		"Rwandan": 162.68,
		"Sahrawi": 170.4,
		"Saint Lucian": 171.95,
		"Salvadoran": 169.77,
		"Sammarinese": 177.77,
		"Samoan": 174.38,
		"São Toméan": 167.38,
		"Saudi": 167.67,
		"Scottish": 177.6,
		"Senegalese": 173.14,
		"Serbian": 180.57,
		"Seychellois": 174.21,
		"Sierra Leonean": 164.41,
		"Singaporean": 172.57,
		"Slovak": 179.5,
		"Slovene": 179.8,
		"a Solomon Islander": 164.14,
		"Somali": 166.6,
		"South African": 166.68,
		"South Sudanese": 175.9,
		"Spanish": 176.59,
		"Sri Lankan": 165.69,
		"Sudanese": 166.63,
		"Surinamese": 172.72,
		"Swazi": 168.13,
		"Swedish": 179.74,
		"Swiss": 178.42,
		"Syrian": 170.43,
		"Taiwanese": 174.52,
		"Tajik": 171.26,
		"Tanzanian": 164.8,
		"Thai": 169.16,
		"Tibetan": 168.91,
		"Togolese": 168.33,
		"Tongan": 176.76,
		"Trinidadian": 173.74,
		"Tunisian": 173.95,
		"Turkish": 174.21,
		"Turkmen": 171.97,
		"Tuvaluan": 169.64,
		"Ugandan": 165.62,
		"Ukrainian": 178.46,
		"Uruguayan": 173.43,
		"Uzbek": 169.38,
		"Vatican": 176.5,
		"Venezuelan": 171.59,
		"Vietnamese": 164.45,
		"Vincentian": 172.78,
		"Yemeni": 159.89,
		"Zairian": 166.8,
		"Zambian": 166.52,
		"Zimbabwean": 168.59,
		"": 171.42, // defaults
	};

	/**
	 * Helper method - table lookup for nationality/race combinations
	 * @param {object} table
	 * @param {string|object} nationality
	 * @param {string} race
	 * @param {undefined} [def]
	 * @returns {object}
	 */
	const nationalityMeanHeight = function(table, nationality, race, def) {
		return table[`${nationality}.${race}`] || table[nationality] || table[`.${race}`] || table[""] || def;
	};


	/**
	 * Helper method: Generate a skewed normal random variable with the skew s
	 * Reference: http://azzalini.stat.unipd.it/SN/faq-r.html
	 * @param {number} s
	 * @returns {number}
	 */
	const skewedGaussian = function(s) {
		let randoms = gaussianPair();
		if (s === 0) {
			// Don't bother, return an unskewed normal distribution
			return randoms[0];
		}
		let delta = s / Math.sqrt(1 + s * s);
		let result = delta * randoms[0] + Math.sqrt(1 - delta * delta) * randoms[1];
		return randoms[0] >= 0 ? result : -result;
	};

	/**
	 * Height multiplier generator; skewed gaussian according to global parameters
	 * @returns {number}
	 */
	const multGenerator = function() {
		let result = skewedGaussian(skew);
		while (result < minMult || result > maxMult) {
			result = skewedGaussian(skew);
		}
		return result;
	};

	/**
	 * Helper method: Generate a height based on the mean one and limited according to config.
	 * @param {number} mean
	 * @returns {number}
	 */
	const heightGenerator = function(mean) {
		let result = mean * (1 + multGenerator() * spread);
		while (result < minHeight || result > maxHeight) {
			result = mean * (1 + multGenerator() * spread);
		}
		return Math.round(result);
	};

	/**
	 * Helper method - apply age and genes to the adult height
	 * @param {number} height
	 * @param {number} age
	 * @param {string} genes
	 * @returns {number}
	 */
	const applyAge = function(height, age, genes) {
		if (!_.isFinite(age) || age < 2 || age >= 20) {
			return height;
		}
		let minHeight = 0;
		let midHeight = 0;
		let midAge;
		switch (genes) {
			case "XX": // female
			case "XXX": // Triple X syndrome female
				minHeight = 85;
				midHeight = height * 157 / 164;
				midAge = 13;
				break;
			case "XY": // male
			case "XXY": // Klinefelter syndrome male
			case "XYY": // XYY syndrome male
				minHeight = 86;
				midHeight = height * 170 / 178;
				midAge = 15;
				break;
			case "X0":
			case "X": // Turner syndrome female
				minHeight = 85 * 0.93;
				midHeight = height * 157 / 164;
				midAge = 13;
				break;
			default:
				minHeight = 85.5;
				midHeight = height * 327 / 342;
				midAge = 14;
				break;
		}
		if (age > midAge) {
			// end of puberty to 20
			return interpolate(midAge, midHeight, 20, height, age);
		} else {
			// 2 to end of puberty
			return interpolate(2, minHeight, midAge, midHeight, age);
		}
	};

	/**
	 * @param {string|{nationality: string, race: string, genes: string, physicalAge: number, birthWeek: number}} nationality
	 * @param {string} race
	 * @param {string} genes
	 * @param {number} age
	 * @returns {number}
	 */
	const _meanHeight = function(nationality, race, genes, age) {
		if (_.isObject(nationality)) {
			// We got called with a single slave as the argument
			return _meanHeight(nationality.nationality, nationality.race, nationality.genes, nationality.physicalAge + nationality.birthWeek / 52.0);
		}
		let result = 0;
		switch (genes) {
			case "XX": // female
				result = nationalityMeanHeight(xxMeanHeight, nationality, race);
				break;
			case "XY": // male
				result = nationalityMeanHeight(xyMeanHeight, nationality, race);
				break;
				// special cases. Extra SHOX genes on X and Y chromosomes make for larger people
			case "X0":
			case "X": // Turner syndrome female
				result = nationalityMeanHeight(xxMeanHeight, nationality, race) * 0.93;
				break;
			case "XXX": // Triple X syndrome female
				result = nationalityMeanHeight(xxMeanHeight, nationality, race) * 1.03;
				break;
			case "XXY": // Klinefelter syndrome male
				result = nationalityMeanHeight(xyMeanHeight, nationality, race) * 1.03;
				break;
			case "XYY": // XYY syndrome male
				result = nationalityMeanHeight(xyMeanHeight, nationality, race) * 1.04;
				break;
			case "Y":
			case "Y0":
			case "YY":
			case "YYY":
				// eslint-disable-next-line no-console
				console.log(`Height.mean(): non-viable genes ${genes}`);
				break;
			default:
				// eslint-disable-next-line no-console
				console.log(`Height.mean(): unknown genes ${genes}, returning mean between XX and XY`);
				result = nationalityMeanHeight(xxMeanHeight, nationality, race) * 0.5 + nationalityMeanHeight(xyMeanHeight, nationality, race) * 0.5;
				break;
		}
		return applyAge(result, age, genes);
	};

	/**
	 * @param {any} nationality
	 * @param {any} race
	 * @param {string} genes
	 * @param {number} age
	 * @returns {number}
	 */
	const _randomHeight = function(nationality, race, genes, age) {
		const mean = _meanHeight(nationality, race, genes, age);
		// If we got called with a slave object and options, temporarily modify
		// our configuration.
		if (_.isObject(nationality) && _.isObject(race)) {
			const currentConfig = _config();
			_config(race);
			const result = heightGenerator(mean);
			_config(currentConfig);
			return result;
		}
		return heightGenerator(mean);
	};

	/**
	 * @param {number} height
	 * @param {number|{physicalAge:number, birthWeek:number, genes:string}} age
	 * @param {string} genes
	 * @returns {number}
	 */
	const _forAge = function(height, age, genes) {
		if (_.isObject(age)) {
			// We got called with a slave as a second argument
			return applyAge(height, age.physicalAge + age.birthWeek / 52.0, age.genes);
		} else {
			return applyAge(height, age, genes);
		}
	};

	return {
		mean: _meanHeight,
		random: _randomHeight,
		forAge: _forAge,
		config: _config,
	};
})();

/**
 * Intelligence.random(options) - returns a random intelligence. If no options are passed, the generated number
 * will be on a normal distribution with mean 0 and standard deviation 45.
 *
 *										Example: Only generate above-average intelligence based on $activeSlave:
 *										Intelligence.random({limitIntelligence: [0, 100]})
 *
 *  Intelligence.config(configuration) - configures the random height generator globally and returns the current configuration
 *
 *	The options and their default values are:
 *	mean: 0 - What the average intelligence will be. Increasing this will make it more likely
 *				to generate a smart slave, but will not guarantee it.
 *				Minimum value: -100, maximum value: 100
 *	limitMult: [-3, 3] - Limit to this many standard deviations from the mean.
 *						In normal use, the values are almost never reached; only 0.27% of values are
 *						outside this range and need to be regenerated. With higher skew (see below),
 *						this might change.
 *	spread: 45 - The random standard deviation of the calculated distribution. A higher value
 *				will make it more likely to have extreme values, a lower value will make any
 *				generated values cluster around the mean. If spread is 0, it will always return the mean.
 *	skew: 0 - How much the height distribution skews to the right (positive) or left (negative) side
 *				of the height. Unless you have a very specific reason, you should not need to change this.
 *				Minimum value: -1000, maximum value: 1000
 *	limitIntelligence: [-100,100] - Limit the resulting height range.
 *									Warning: A small intelligence limit range not containing the
 *									mean, and with a low spread value results in the generator
 *									having to do lots of work generating and re-generating random
 *									intelligences until one "fits".
 *
 *  This was modeled using the Height generator above. For some more information, see the comments for that.
 * @returns {{random: number, _config: object}}
 */
window.Intelligence = (function() {
	"use strict";

	// Global configuration (for different game modes/options/types)
	let mean = 0;
	let minMult = -3.0;
	let maxMult = 3.0;
	let skew = 0.0;
	let spread = 45;
	let minIntelligence = -101;
	let maxIntelligence = 100;

	/**
	 * Configuration method for the above values
	 * @param {object} [conf]	// I'm pretty sure
	 * @returns {object}
	 */
	const _config = function(conf) {
		if (_.isUndefined(conf)) {
			return {
				mean: mean,
				limitMult: [minMult, maxMult],
				limitIntelligence: [minIntelligence, maxIntelligence],
				skew: skew,
				spread: spread
			};
		}
		if (_.isFinite(conf.mean)) {
			mean = Math.clamp(conf.mean, -100, 100);
		}
		if (_.isFinite(conf.skew)) {
			skew = Math.clamp(conf.skew, -1000, 1000);
		}
		if (_.isFinite(conf.spread)) {
			spread = Math.clamp(conf.spread, 0.1, 100);
		}
		if (_.isArray(conf.limitMult) && conf.limitMult.length === 2 && conf.limitMult[0] !== conf.limitMult[1] &&
			_.isFinite(conf.limitMult[0]) && _.isFinite(conf.limitMult[1])) {
			minMult = Math.min(conf.limitMult[0], conf.limitMult[1]);
			maxMult = Math.max(conf.limitMult[0], conf.limitMult[1]);
		}
		if (_.isArray(conf.limitIntelligence) && conf.limitIntelligence.length === 2 && conf.limitIntelligence[0] !== conf.limitIntelligence[1] &&
			_.isFinite(conf.limitIntelligence[0]) && _.isFinite(conf.limitIntelligence[1])) {
			minIntelligence = Math.clamp(Math.min(conf.limitIntelligence[0], conf.limitIntelligence[1]), -101, 100);
			maxIntelligence = Math.clamp(Math.max(conf.limitIntelligence[0], conf.limitIntelligence[1]), -101, 100);
		}
		return {
			limitMult: [minMult, maxMult],
			limitIntelligence: [minIntelligence, maxIntelligence],
			skew: skew,
			spread: spread
		};
	};

	/**
	 * Helper method: Generate a skewed normal random variable with the skew s
	 * Reference: http://azzalini.stat.unipd.it/SN/faq-r.html
	 * @param {number} s
	 * @returns {number}
	 */
	const skewedGaussian = function(s) {
		let randoms = gaussianPair();
		if (s === 0) {
			// Don't bother, return an unskewed normal distribution
			return randoms[0];
		}
		let delta = s / Math.sqrt(1 + s * s);
		let result = delta * randoms[0] + Math.sqrt(1 - delta * delta) * randoms[1];
		return randoms[0] >= 0 ? result : -result;
	};

	// Intelligence multiplier generator; skewed gaussian according to global parameters
	const multGenerator = function() {
		let result = skewedGaussian(skew);
		while (result < minMult || result > maxMult) {
			result = skewedGaussian(skew);
		}
		return result;
	};

	// Helper method: Transform the values from multGenerator to have the appropriate mean and standard deviation.
	const intelligenceGenerator = function() {
		let result = multGenerator() * spread + mean;
		while (result < minIntelligence || result > maxIntelligence) {
			result = multGenerator() * spread + mean;
		}
		return Math.ceil(result);
	};

	/**
	 * @param {boolean} settings
	 * @returns {object}
	 */
	const _randomIntelligence = function(settings) {
		if (settings) {
			const currentConfig = _config();
			_config(settings);
			const result = intelligenceGenerator();
			_config(currentConfig);
			return result;
		}
		return intelligenceGenerator();
	};

	return {
		random: _randomIntelligence,
		config: _config,
	};
})();
/*
A categorizer is used to "slice" a value range into distinct categories in an efficient manner.

If the values are objects their property named 'value' will be set to whatever
the value used for the choice was. This is important for getters, where it can be accessed
via this.value.

--- Example ---
Original SugarCube code
<<if _Slave.muscles > 95>>
	Musc++
<<elseif _Slave.muscles > 30>>
	Musc+
<<elseif _Slave.muscles > 5>>
	Toned
<<elseif _Slave.muscles > -6>>
<<elseif _Slave.muscles > -31>>
	<span class="red">weak</span>
<<elseif _Slave.muscles > -96>>
	<span class="red">weak+</span>
<<else>>
	<span class="red">weak++</span>
<</if>>

As a categorizer
<<if ndef $cats>><<set $cats = {}>><</if>>
<<if ndef $cats.muscleCat>>
	<!-- This only gets set once, skipping much of the code evaluation, and can be set outside of the code in an "init" passage for further optimization -->
	<<set $cats.muscleCat = new Categorizer([96, 'Musc++'], [31, 'Musc+'], [6, 'Toned'], [-5, ''], [-30, '<span class="red">weak</span>'], [-95, '<span class="red">weak+</span>'], [-Infinity, '<span class="red">weak++</span>'])>>
<</if>>
<<print $cats.muscleCat.cat(_Slave.muscles)>>
*/

window.Categorizer = function() {
	this.cats = Array.prototype.slice.call(arguments)
		.filter(function(e, i, a) {
			return Array.isArray(e) && e.length === 2 && typeof e[0] === "number" && !isNaN(e[0]) &&
				a.findIndex(function(val) {
					return e[0] === val[0];
				}) === i; /* uniqueness test */
		})
		.sort(function(a, b) {
			return b[0] - a[0]; /* reverse sort */
		});
};

window.Categorizer.prototype.cat = function(val, def) {
	let result = def;
	if (typeof val === "number" && !isNaN(val)) {
		let foundCat = this.cats.find(function(e) {
			return val >= e[0];
		});
		if (foundCat) {
			result = foundCat[1];
		}
	}
	// Record the value for the result's getter, if it is an object
	// and doesn't have the property yet
	if (typeof result === "object" && !isNaN(result)) {
		result.value = val;
	}
	return result;
};

/**
 * Returns numbers as text, e.g. 10 as "ten", according to the player's settings
 * @param {number} x
 * @param {boolean} [printText=false] (optional)
 * @returns {string}
 */
window.num = function(x, printText = false) {
	const max = V.showNumbersMax;

	const ONE_TO_NINETEEN = [
		"one", "two", "three", "four", "five",
		"six", "seven", "eight", "nine", "ten",
		"eleven", "twelve", "thirteen", "fourteen", "fifteen",
		"sixteen", "seventeen", "eighteen", "nineteen",
	];

	const TENS = [
		"ten", "twenty", "thirty", "forty", "fifty",
		"sixty", "seventy", "eighty", "ninety",
	];

	const SCALES = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion"];

	/**
	 * helper function for use with Array.filter
	 * @param {any} item
	 * @returns {boolean}
	 */
	function isTruthy(item) {
		return !!item;
	}

	/**
	 * convert a number into "chunks" of 0-999
	 * @param {number} number
	 * @returns {number[]}
	 */
	function chunk(number) {
		const thousands = [];

		while (number > 0) {
			thousands.push(number % 1000);
			number = Math.floor(number / 1000);
		}

		return thousands;
	}

	/**
	 * translate a number from 1-999 into English
	 * @param {number} number
	 * @returns {string}
	 */
	function inEnglish(number) {
		let hundreds;
		let tens;
		let ones;
		const words = [];

		if (number < 20) {
			return ONE_TO_NINETEEN[number - 1]; // may be undefined
		}

		if (number < 100) {
			ones = number % 10;
			tens = number / 10 | 0; // equivalent to Math.floor(number / 10)

			words.push(TENS[tens - 1]);
			words.push(inEnglish(ones));

			return words.filter(isTruthy).join("-");
		}

		hundreds = number / 100 | 0;
		words.push(inEnglish(hundreds));
		words.push("hundred");
		words.push(inEnglish(number % 100));

		return words.filter(isTruthy).join(" ");
	}

	if (printText) {
		return inEnglish(x);
	}

	/**
	 * append the word for a scale. Made for use with Array.map
	 * @param {string} chunk
	 * @param {number} exp
	 * @returns {string}
	 */
	function appendScale(chunk, exp) {
		let scale;
		if (!chunk) {
			return null;
		}
		scale = SCALES[exp - 1];
		return [chunk, scale].filter(isTruthy).join(" ");
	}

	if (V.showNumbers === 2) {
		return commaNum(x);
	} else {
		if (x === 0) {
			return "zero";
		}

		if (V.showNumbers === 1 && Math.abs(x) > max) {
			return commaNum(x);
		}

		let numberAsString = chunk(Math.abs(x))
			.map(inEnglish)
			.map(appendScale)
			.filter(isTruthy)
			.reverse()
			.join(" ");

		if (x > 0) {
			return numberAsString;
		} else {
			return `negative ${numberAsString}`;
		}
	}
};

window.asPlural = function(single, plural) {
	if (typeof single !== 'string') {
		let asObj = single;
		single = asObj.single;
		plural = asObj.plural;
	}
	if (plural == null) {
		plural = single + "s";
	}
	return plural;
};
window.asSingular = function(single) {
	if (typeof single !== 'string') {
		let asObj = single;
		single = asObj.single;
	}
	return single;
};
// When 1, shows "a (slave)"
window.numberWithPlural = function(number, single, plural) {
	if (number === 0) {
		return "no " + asPlural(single, plural);
	} else if (number === 1) {
		return addA(asSingular(single));
	} else if (number > 0 && number < 1) {
		return "less than one " + asSingular(single);
	} else {
		return number + " " + asPlural(single, plural);
	}
};

// when 1, shows "one (slave)"
window.numberWithPluralOne = function(number, single, plural) {
	if (number === 0) {
		return "no " + asPlural(single, plural);
	} else if (number === 1) {
		return "one " + asSingular(single);
	} else if (number > 0 && number < 1) {
		return "less than one " + asSingular(single);
	} else {
		return number + " " + asPlural(single, plural);
	}
};
// shows "less than one (slave)" instead of "no (slaves)" when number is 0.
window.numberWithPluralNonZero = function(number, single, plural) {
	if (number === 0) { number = 0.1; }
	return numberWithPlural(number, single, plural);
};
window.onlyPlural = function(number, single, plural) {
	if (number > 0 && number <= 1) {
		return asSingular(single);
	}
	return asPlural(single, plural);
};
window.Seperator = function(seperatorObject) {
	if (seperatorObject.need) {
		return seperatorObject.text;
	}
	seperatorObject.need = true;
	return "";
};
/**
 * Returns numbers with comma, e.g. 10000 as "10,000", according to the player's settings
 * @param {number} s
 * @returns {string}
 */
window.commaNum = function(s) {
	// Separated from num because some places in code (like long lists, tables) should never have numbers spelled out, but still benefit from commas
	if (!s) {
		return "0";
	}
	if (State.variables.formatNumbers !== 1) {
		return s.toString();
	} else {
		return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
};

/**
 * Returns the number of weeks in a years / months / weeks format
 * @param {number} weeks
 * @returns {string}
 */
window.years = function(weeks) {
	let
		r = ``,
		years = 0,
		quarters = 0, // needed for calc, not user facing
		months = 0,
		array = [];

	// A year is always 52 weeks
	// that could be 13 months, but lets say 4 quarters each getting an extra week (13 weeks)

	// Find years
	years = Math.trunc(weeks / 52);

	if (years >= 1) { // Is there at least 1 year
		weeks = weeks-(years*52); // Find leftover weeks
	}
	if (weeks && weeks/13 >= 1) { // Is there at least 1 quarter
		quarters = Math.trunc(weeks/13); // How many quarters?
		weeks = weeks-(quarters*13); // A quarter contains 13 weeks, how many extra weeks do we have?
	}
	if (weeks && weeks/4 >= 1) { // Is there at least 1 month
		months = Math.trunc(weeks/4); // How many months?
		if (months === 3) { // Almost a quarter of a year
			months--; // Quarters have 13 weeks though, so let's be sure the extra is in weeks.  Otherwise 51 will return "12 months" instead of "11 months and 4 weeks."
		}
		weeks = weeks-(months*4); // A month contains 4 weeks, how many extra weeks do we have?
	}

	// So we have years, quarters, months, and weeks.

	// Quarters are useless so:

	months += quarters*3; // Each quarter has three months.

	if (years) {
		array.push(`${num(years)} year${years !== 1 ? `s` : ``}`);
	}

	if (months) {
		array.push(`${num(months)} month${months !== 1 ? `s` : ``}`);
	}

	if (weeks) {
		array.push(`${num(weeks)} week${weeks !== 1 ? `s` : ``}`);
	}

	r += array[0];
	if (array.length === 3) {
		r += `, ${array[1]} and ${array[2]}`;
	} else if (array.length === 2) {
		r += ` and ${array[1]}`;
	}
	return r;
};
/**
 * @param {number} [weeks]
 * @param {number} [bonusDay]
 * @returns {Date}
 */
window.asDate = function(weeks = null, bonusDay = 0) {
	if (weeks == null) {
		weeks = State.variables.week;
	}
	let d = new Date(2037, 0, 12);
	d.setDate(d.getDate() + weeks * 7 + bonusDay);
	return d;
};
/**
 * @param {number} [weeks]
 * @param {number} [bonusDay]
 * @returns {string}
 */
window.asDateString = function(weeks = null, bonusDay = 0) {
	return asDate(weeks, bonusDay).toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
};

/**
 * @param {number} s
 * @returns {string}
 */
window.cashFormat = function(s) {
	if (s < 0) {
		return `-¤${commaNum(Math.abs(s))}`;
	}
	return `¤${commaNum(s)}`;
};
window.cashFormatColor = function(s, invert = false) {
	if (invert) {
		s = -1*s;
	}
	// Display red if the value is negative, unless invert is true
	if (s < 0) {
		return `<span class='red'>${cashFormat(s)}</span>`;
	// White for exactly zero
	} else if (s === 0 ) {
		return `<span>${cashFormat(s)}</span>`;
	// Yellow for positive
	} else {
		return `<span class='yellowgreen'>${cashFormat(s)}</span>`;
	}
};

/**
 * @param {number} s
 * @returns {string}
 */
window.repFormat = function(s) {
	/* if (!s) { s = 0; }*/
	if (V.cheatMode === 1 || V.debugMode === 1) {
		if (s > 0) {
			return `<span class="green">${commaNum(Math.round(s * 100) / 100)} rep</span>`;
		} else if (s < 0) {
			return `<span class="red">${commaNum(Math.round(s * 100) / 100)} rep</span>`;
		} else {
			return `${commaNum(Math.round(s * 100) / 100)} rep`;
		}
	} else {
		/* In order to calculate just how much any one category matters so we can show a "fuzzy" symbolic value to the player, we need to know how "busy" reputation was this week. To calculate this, I ADD income to expenses. Why? 100 - 100 and 10000 - 10000 BOTH are 0, but a +50 event matters a lot more in the first case than the second. I exclude overflow from the calculation because it's not a "real" expense for our purposes, and divide by half just to make percentages a bit easier. */
		let weight = s / (((V.lastWeeksRepIncome.Total - V.lastWeeksRepExpenses.Total) + V.lastWeeksRepExpenses.overflow) / 2);
		if (weight > 0.60) {
			return `<span class="green">+++++ rep</span>`;
		} else if (weight > 0.45) {
			return `<span class="green">++++ rep</span>`;
		} else if (weight > 0.30) {
			return `<span class="green">+++ rep</span>`;
		} else if (weight > 0.15) {
			return `<span class="green">++ rep</span>`;
		} else if (weight > 0.0) {
			return `<span class="green">+ rep</span>`;
		} else if (weight === 0) {
			return "0 rep";
		} else if (weight < -0.60) {
			return `<span class="red">&minus;&minus;&minus;&minus;&minus; rep</span>`;
		} else if (weight < -0.45) {
			return `<span class="red">&minus;&minus;&minus;&minus; rep</span>`;
		} else if (weight < -0.30) {
			return `<span class="red">&minus;&minus;&minus; rep</span>`;
		} else if (weight < -0.15) {
			return `<span class="red">&minus;&minus; rep</span>`;
		} else if (weight < 0) {
			return `<span class="red">&minus; rep</span>`;
		}
		/* return weight;*/
	}
};

/**
 * @param {number} s
 * @returns {string}
 */
window.massFormat = function(s) {
	if (!s) {
		s = 0;
	}
	if (s >= 1000) {
		s = Math.trunc(s / 1000);
		if (s !== 1) {
			return `${num(s)} tons`;
		} else {
			return `${num(s)} ton`;
		}
	} else {
		return `${num(s)} kg`;
	}
};

/**
 * @param {string} category
 * @param {string} title
 * @returns {string}
 */
window.budgetLine = function(category, title) {
	let income;
	let expenses;
	let profits;

	if (passage() === "Rep Budget") {
		income = "lastWeeksRepIncome";
		expenses = "lastWeeksRepExpenses";
		profits = "lastWeeksRepProfits";

		if (V[income][category] || V[expenses][category] || V.showAllEntries.repBudget) {
			V[profits][category] = V[income][category] + V[expenses][category];
			return `<tr>\
				<td>${title}</td>\
				<td>${repFormat(V[income][category])}</td>\
				<td>${repFormat(V[expenses][category])}</td>\
				<td>${repFormat(V[profits][category])}</td>\
				</tr>`;
		}
	} else if (passage() === "Costs Budget") {
		income = "lastWeeksCashIncome";
		expenses = "lastWeeksCashExpenses";
		profits = "lastWeeksCashProfits";

		if (V[income][category] || V[expenses][category] || V.showAllEntries.costsBudget) {
			V[profits][category] = V[income][category] + V[expenses][category];
			return `<tr>\
				<td>${title}</td>\
				<td>${cashFormatColor(V[income][category])}</td>\
				<td>${cashFormatColor(-Math.abs(V[expenses][category]))}</td>\
				<td>${cashFormatColor(V[profits][category])}</td>\
				</tr>`;
		}
	}
	return ``;
};

/*
Make everything waiting for this execute. Usage:

let doSomething = function() {
	... your initialization code goes here ...
};
if(typeof Categorizer === 'function') {
	doSomething();
} else {
	jQuery(document).one('categorizer.ready', doSomething);
}
*/
jQuery(document).trigger("categorizer.ready");

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getSlaveDevotionClass = function(slave) {
	if ((!slave) || (!State)) {
		return undefined;
	}
	if (slave.fetish === "mindbroken") {
		return "mindbroken";
	}
	if (slave.devotion < -95) {
		return "very-hateful";
	} else if (slave.devotion < -50) {
		return "hateful";
	} else if (slave.devotion < -20) {
		return "resistant";
	} else if (slave.devotion <= 20) {
		return "ambivalent";
	} else if (slave.devotion <= 50) {
		return "accepting";
	} else if (slave.devotion <= 95) {
		return "devoted";
	} else {
		return "worshipful";
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getSlaveTrustClass = function(slave) {
	if ((!slave) || (!State)) {
		return undefined;
	}

	if (slave.fetish === "mindbroken") {
		return "";
	}

	if (slave.trust < -95) {
		return "extremely-terrified";
	} else if (slave.trust < -50) {
		return "terrified";
	} else if (slave.trust < -20) {
		return "frightened";
	} else if (slave.trust <= 20) {
		return "fearful";
	} else if (slave.trust <= 50) {
		if (slave.devotion < -20) {
			return "hate-careful";
		} else {
			return "careful";
		}
	} else if (slave.trust <= 95) {
		if (slave.devotion < -20) {
			return "bold";
		} else {
			return "trusting";
		}
	} else if (slave.devotion < -20) {
		return "defiant";
	} else {
		return "profoundly-trusting";
	}
};

/**
 * Takes an integer e.g. $activeSlave.hLength, returns a string in the format 10 inches
 * @param {number} s
 * @returns {string}
 */
window.cmToInchString = function(s) {
	let inches = (Math.round(s / 2.54)).toString();
	if (inches === "0") {
		if (s === 0) {
			inches += " inches";
		} else {
			inches = "less than an inch";
		}
	} else if (inches === "1") {
		inches += " inch";
	} else {
		inches += " inches";
	}
	return inches;
};

/**
 * takes an integer e.g. $activeSlave.height, returns a string in the format 6'5"
 * @param {number} s
 * @returns {string}
 */
window.cmToFootInchString = function(s) {
	if (Math.round(s / 2.54) < 12) {
		return cmToInchString(s);
	}
	return `${Math.trunc(Math.round(s/2.54)/12)}'${Math.round(s/2.54)%12}"`;
};

/**
 * takes a dick value e.g. $activeSlave.dick, returns a string in the format 6 inches
 * @param {number} s
 * @returns {string}
 */
window.dickToInchString = function(s) {
	return cmToInchString(dickToCM(s));
};

/**
 * takes a dick value e.g. $activeSlave.dick, returns an int of the dick length in cm
 * @param {number} s
 * @returns {number}
 */
window.dickToCM = function(s) {
	if (s < 9) {
		return s * 5;
	} else if (s === 9) {
		return 50;
	}
	return s * 6;
};

// takes a ball value e.g. $activeSlave.balls, returns a string in the format 3 inches
window.ballsToInchString = function(s) {
	return cmToInchString(ballsToCM(s));
};

// takes a ball value e.g. $activeSlave.balls, returns an int of the ball size in cm
window.ballsToCM = function(s) {
	if (s < 2) {
		return 0;
	}
	return (s < 10 ? (s - 1) * 2 : s * 2);
};

// takes a dick value e.g. $activeSlave.dick, returns a string in the format of either `20cm (8 inches)`, `8 inches`, or `20cm`
window.dickToEitherUnit = function(s) {
	if (State.variables.showInches === 1) {
		return `${dickToCM(s)}cm (${dickToInchString(s)})`;
	}
	if (State.variables.showInches === 2) {
		return dickToInchString(s);
	}
	return `${dickToCM(s)}cm`;
};

// takes a ball value e.g. $activeSlave.balls, returns a string in the format of either `20cm (8 inches)`, `8 inches`, or `20cm`
window.ballsToEitherUnit = function(s) {
	if (State.variables.showInches === 1) {
		return `${ballsToCM(s)}cm (${ballsToInchString(s)})`;
	}
	if (State.variables.showInches === 2) {
		return ballsToInchString(s);
	}
	return `${ballsToCM(s)}cm`;
};

// takes an int in centimeters e.g. $activeSlave.height, returns a string in the format of either `200cm (6'7")`, `6'7"`, or `200cm`
window.heightToEitherUnit = function(s) {
	if (State.variables.showInches === 1) {
		return `${s}cm (${cmToFootInchString(s)})`;
	}
	if (State.variables.showInches === 2) {
		return cmToFootInchString(s);
	}
	return `${s}cm`;
};

// takes an int in centimeters e.g. $activeSlave.hLength, returns a string in the format of either `30cm (12 inches)`, `12 inches`, or `30cm`
window.lengthToEitherUnit = function(s) {
	if (State.variables.showInches === 1) {
		return `${s}cm (${cmToInchString(s)})`;
	}
	if (State.variables.showInches === 2) {
		return cmToInchString(s);
	}
	return `${s}cm`;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.induceLactation = function induceLactation(slave) {
	const {His} = getPronouns(slave);
	let r = "";
	if (slave.induceLactation >= 10) {
		if (jsRandom(1, 100) < slave.induceLactation) {
			r += `${His} breasts have been stimulated often enough to <span class="lime">induce lactation.</span>`;
			slave.induceLactation = 0;
			slave.lactationDuration = 2;
			slave.lactation = 1;
		}
	}
	return r;
};
window.getProstheticsStockpile = function() {
	return `<div>Prosthetics interfaces: ${num(V.prosthetics.interfaceP1.amount + V.prosthetics.interfaceP2.amount)}</div>` +
		`<div class="choices">Basic: ${V.prosthetics.interfaceP1.amount}</div>` +
		`<div class="choices">Advanced: ${V.prosthetics.interfaceP2.amount}</div>` +
		`<div>Limbs: ${num(V.prosthetics.basicL.amount + V.prosthetics.sexL.amount + V.prosthetics.beautyL.amount +
			V.prosthetics.combatL.amount + V.prosthetics.cyberneticL.amount)}</div>` +
		`<div class="choices">Basic: ${V.prosthetics.basicL.amount}</div>` +
		`<div class="choices">Sex: ${V.prosthetics.sexL.amount}</div>` +
		`<div class="choices">Beauty: ${V.prosthetics.beautyL.amount}</div>` +
		`<div class="choices">Combat: ${V.prosthetics.combatL.amount}</div>` +
		`<div class="choices">Cybernetic: ${V.prosthetics.cyberneticL.amount}</div>` +
		`<div>Implants: ${num(V.prosthetics.ocular.amount + V.prosthetics.cochlear.amount + V.prosthetics.electrolarynx.amount)}</div>` +
		`<div class="choices">Ocular: ${V.prosthetics.ocular.amount}</div>` +
		`<div class="choices">Cochlear: ${V.prosthetics.cochlear.amount}</div>` +
		/* `<div class="choices">Erectile: ${V.prosthetics.erectile.amount}</div>` + */
		`<div class="choices">Electrolarynx: ${V.prosthetics.electrolarynx.amount}</div>` +
		`<div>Tail interface: ${V.prosthetics.interfaceTail.amount}</div>` +
		`<div>Tails: ${num(V.prosthetics.modT.amount + V.prosthetics.sexT.amount + V.prosthetics.combatT.amount)}</div>` +
		`<div class="choices">Modular: ${V.prosthetics.modT.amount}</div>` +
		`<div class="choices">Pleasure: ${V.prosthetics.sexT.amount}</div>` +
		`<div class="choices">Combat: ${V.prosthetics.combatT.amount}</div>`;
};

window.pronounReplacer = function(slavetext) {
	switch (slavetext) {
		case "After her short but very promising slave racing career, during which she made it through several competitions as a virgin, many people fondly remember fantasizing about taking her.":
			slavetext = "After $his short but very promising slave racing career, during which $he made it through several competitions as a virgin, many people fondly remember fantasizing about taking $him.";
			break;
		case "Her entire body is tattooed with a detailed map of her arteries which, combined with her albinism, gives her a quasi-translucent quality.":
			slavetext = "$His entire body is tattooed with a detailed map of $his arteries which, combined with $his albinism, gives $him a quasi-translucent quality.";
			break;
		case "Her husband sold her into slavery to escape his debts.":
			slavetext = "$His husband sold $him into slavery to escape his debts.";
			break;
		case "Her mother offered her to you as an incentive to take her in.":
			slavetext = "$His mother offered $him to you as an incentive to take them in.";
			break;
		case "Her recognizable face marks her as a descendant of an overthrown royal family.":
			slavetext = "$His recognizable face marks $him as a descendant of an overthrown royal family.";
			break;
		case "Many people remember her from the slavegirl races where she slammed her cock into countless runners' pussies after catching them.":
			slavetext = "Many people remember $him from the slavegirl races where $he slammed $his cock into countless runners' pussies after catching them.";
			break;
		case "She came to you to escape being sold to a cruel master after her producer informed her of her debt.":
			slavetext = "$He came to you to escape being sold to a cruel master after $his producer informed $him of $his debt.";
			break;
		case "She comes from old money and sold herself into slavery to satisfy her obsession with the practice, believing her family would buy her back out of slavery later.":
			slavetext = "$He comes from old money and sold $himself into slavery to satisfy $his obsession with the practice, believing $his family would buy $him back out of slavery later.";
			break;
		case "She has a following in slave pornography. Thousands have enjoyed the sight of her ignoring her own pleasure.":
			slavetext = "$He has a following in slave pornography. Thousands have enjoyed the sight of $him ignoring $his own pleasure.";
			break;
		case "She has a following in slave pornography. Thousands have enjoyed watching her devote herself to her partners' pleasure.":
			slavetext = "$He has a following in slave pornography. Thousands have enjoyed watching $him devote $himself to $his partners' pleasure.";
			break;
		case "She has a following in slave pornography. Thousands have enjoyed watching her do anything for a dick in her ass.":
			slavetext = "$He has a following in slave pornography. Thousands have enjoyed watching $him do anything for a dick in $his ass.";
			break;
		case "She has a small scar on the back of her right hand. She was injured while participating in the finals of the national kendo tournament, and decided to keep the scar to remind her of her achievements.":
			slavetext = "$He has a small scar on the back of $his right hand. $He was injured while participating in the finals of a national kendo tournament, and decided to keep the scar to remind $him of $his achievements.";
			break;
		case "She has an implanted GPS tracker to find her in case her habit of stalking pretty girls gets the better of her.":
			slavetext = "$He has an implanted GPS tracker to find $him in case $his habit of stalking pretty girls gets the better of $him.";
			break;
		case "She has massive C-clamp piercings in her back that allow her to act as furniture, and a truly enormous vagina.":
			slavetext = "$He has massive C-clamp piercings in $his back that allow $him to act as furniture, and a truly enormous vagina.";
			break;
		case "She has the number of times her father came in you while you were pregnant with her tattooed down her back.":
			slavetext = "$He has the number of times $his father came in you while you were pregnant with $him tattooed down $his back.";
			break;
		case "She is a famed Free Cities slut, and can please anyone.":
			slavetext = "$He is a famed Free Cities slut, and can please anyone.";
			break;
		case "She is a famed Free Cities whore, and commands top prices.":
			slavetext = "$He is a famed Free Cities whore, and commands top prices.";
			break;
		case "She is a prized dairy cow given to you by a failed local pasture of The Cattle Ranch.":
			slavetext = "$He is a prized dairy cow given to you by a failed local pasture of The Cattle Ranch.";
			break;
		case "She is an enslaved Daughter of Liberty.":
			slavetext = "$He is an enslaved Daughter of Liberty.";
			break;
		case "She is an enslaved member of an anti-slavery extremist group.":
			slavetext = "$He is an enslaved member of an anti-slavery extremist group.";
			break;
		case "She is remembered for winning best in show as a breeder.":
			slavetext = "$He is remembered for winning best in show as a breeder.";
			break;
		case "She is remembered for winning best in show as a cockmilker.":
			slavetext = "$He is remembered for winning best in show as a cockmilker.";
			break;
		case "She is remembered for winning best in show as a dairy cow.":
			slavetext = "$He is remembered for winning best in show as a dairy cow.";
			break;
		case "She is the spoiled daughter of a wealthy old world businessman. Many will pay well to use her to discredit her father and family.":
			slavetext = "$He is the spoiled $daughter of a wealthy old world businessman. Many will pay well to use $him to discredit $his father and family.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her abusing others.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him abusing others.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her being raped.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him being raped.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her being used.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him being used.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her denying herself pleasure.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him denying $himself pleasure.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her doing anything for a dick up her ass.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him doing anything for a dick up $his ass.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her doing anything for attention.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him doing anything for attention.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her doing anything for cum.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him doing anything for cum.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her getting off from the suffering she caused.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him getting off from the suffering $he caused.";
			break;
		case "She is well known from her career in slave pornography. Her many fans relish the sight of her swollen with child.":
			slavetext = "$He is well known from $his career in slave pornography. $His many fans relish the sight of $him swollen with child.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her being raped.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him being raped.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her denying herself pleasure.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him denying $himself pleasure.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her doing anything for attention.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him doing anything for attention.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her doing anything for cum.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him doing anything for cum.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her mid-coitus.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him mid-coitus.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her suffering.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him suffering.";
			break;
		case "She is world famous for her career in slave pornography. Millions are intimately familiar with the sight of her swollen with child.":
			slavetext = "$He is world famous for $his career in slave pornography. Millions are intimately familiar with the sight of $him swollen with child.";
			break;
		case "She offered herself for voluntary enslavement, choosing you as her new owner because you treat lactating girls well.":
			slavetext = "$He offered $himself for voluntary enslavement, choosing you as $his new owner because you treat lactating girls well.";
			break;
		case "She offered herself to you for enslavement hoping you would preserve $his incestuous relationship with her sibling.":
			slavetext = "$He offered $himself to you for enslavement hoping you would preserve $his incestuous relationship with $his sibling.";
			break;
		case "She offered to become your slave to protect her incestuous relationship.":
			slavetext = "$He offered to become your slave to protect $his incestuous relationship.";
			break;
		case "She sold herself into slavery out of fear that life on the streets was endangering her pregnancy.":
			slavetext = "$He sold $himself into slavery out of fear that life on the streets was endangering $his pregnancy.";
			break;
		case "She sold herself to you in the hope of someday bearing children.":
			slavetext = "$He sold $himself to you in the hope of someday bearing children.";
			break;
		case "She submitted to enslavement for a better chance at survival than she had as a migrant.":
			slavetext = "$He submitted to enslavement for a better chance at survival than $he had as a migrant.";
			break;
		case "She submitted to enslavement out of a misguided desire to join a sexually libertine society.":
			slavetext = "$He submitted to enslavement out of a misguided desire to join a sexually libertine society.";
			break;
		case "She submitted to enslavement to escape the hard life of an old world whore.":
			slavetext = "$He submitted to enslavement to escape the hard life of an old world whore.";
			break;
		case "She submitted to enslavement to get access to modern prenatal care.":
			slavetext = "$He submitted to enslavement to get access to modern prenatal care.";
			break;
		case "She was a Futanari Sister until you engineered her early enslavement.":
			slavetext = "$He was a Futanari Sister until you engineered $his early enslavement.";
			break;
		case "She was brought up in a radical slave school to match her twin.":
			slavetext = "$He was brought up in a radical slave school to match $his twin.";
			break;
		case "She was given to you by a failed branch campus of St. Claver Preparatory after she served as a plastic surgeon's passing final exam.":
			slavetext = "$He was given to you by a failed branch campus of St. Claver Preparatory after $he served as a plastic surgeon's passing final exam.";
			break;
		case "She was given to you by a failed branch campus of the Hippolyta Academy right after her majority.":
			slavetext = "$He was given to you by a failed branch campus of the Hippolyta Academy right after $his majority.";
			break;
		case "She was given to you by a failed branch campus of the innovative École des Enculées right after her graduation.":
			slavetext = "$He was given to you by a failed branch campus of the innovative École des Enculées right after $his graduation.";
			break;
		case "She was given to you by a failed branch campus of the intense Gymnasium-Academy right after her majority.":
			slavetext = "$He was given to you by a failed branch campus of the intense Gymnasium-Academy right after $his majority.";
			break;
		case "She was given to you by a failed branch campus of The Slavegirl School after she was retrained as a slave girl.":
			slavetext = "$He was given to you by a failed branch campus of the Slavegirl School after $he was retrained as a slave $girl.";
			break;
		case "She was given to you by a failed branch campus of The Slavegirl School right after her majority.":
			slavetext = "$He was given to you by a failed branch campus of the Slavegirl School right after $his majority.";
			break;
		case "She was given to you by a failed subsidiary lab of the Growth Research Institute right after her use as a test subject ended.":
			slavetext = "$He was given to you by a failed subsidiary lab of the Growth Research Institute right after $his use as a test subject ended.";
			break;
		case "She was once the crown prince of an old world kingdom up until you aided her brother in making her 'disappear'.":
			slavetext = "$He was once the crown prince of an old world kingdom up until you aided $his brother in making $him 'disappear'.";
			break;
		case "She was once the princess of an old world kingdom up until her loose habits caught up with her and she was exiled.":
			slavetext = "$He was once the princess of an old world kingdom up until $his loose habits caught up with $him and $he was exiled.";
			break;
		case "She was once the young trophy wife of a powerful man in the old world, but he sold her into slavery in revenge for her infidelity.":
			slavetext = "$He was once the young trophy $wife of a powerful man in the old world, but he sold $him into slavery in revenge for $his infidelity.";
			break;
		case "She was raised in a radical slave school that treated her from a very young age, up to the point that she never experienced male puberty.":
			slavetext = "$He was raised in a radical slave school that treated $him from a very young age, up to the point that $he never experienced male puberty.";
			break;
		case "She was raised in a radical slave school that treated her with drugs and surgery from a very young age.":
			slavetext = "$He was raised in a radical slave school that treated $him with drugs and surgery from a very young age.";
			break;
		case "She was sold into slavery by her older sister.":
			slavetext = "$He was sold into slavery by $his older sister.";
			break;
		case "She was the leader of your arcology's Futanari Sisters until you engineered her community's failure and enslavement.":
			slavetext = "$He was the leader of your arcology's Futanari Sisters until you engineered $his community's failure and enslavement.";
			break;
		case "She was the result of unprotected sex with a client. Her mother tracked you down years after her birth to force her upon you.":
			slavetext = "$He was the result of unprotected sex with a client. $His mother tracked you down years after $his birth to force $him upon you.";
			break;
		case "She was voluntarily enslaved after she decided that your arcology was the best place for her to get the steroids that she'd allowed to define her life.":
			slavetext = "$He was voluntarily enslaved after $he decided that your arcology was the best place for $him to get the steroids that $he'd allowed to define $his life.";
			break;
		case "She was your slave, but you freed her, which she repaid by participating in a coup attempt against you. It failed, and she is again your chattel.":
			slavetext = "$He was your slave, but you freed $him, which $he repaid by participating in a coup attempt against you. It failed, and $he is again your chattel.";
			break;
		case "Shortly after birth, she was sealed in an aging tank until she was of age. She knows nothing of the world outside of what the tank imprinted her with.":
			slavetext = "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows nothing of the world outside of what the tank imprinted $him with.";
			break;
		case "Shortly after birth, she was sealed in an aging tank until she was of age. She knows only of the terror that awaits her should she not obey her master.":
			slavetext = "Shortly after birth, $he was sealed in an aging tank until $he was of age. $He knows only of the terror that awaits $him should $he not obey $his master.";
			break;
		case "Though her vocal cords have been altered to keep her from speaking, she is still capable of the occasional moo.":
			slavetext = "Though $his vocal cords have been altered to keep $him from speaking, $he is still capable of the occasional moo.";
			break;
		case "To seal a business deal, a client asked you to knock her up. She is the end result of that fling.":
			slavetext = "To seal a business deal, a client asked you to knock her up. $He is the end result of that fling.";
			break;
		case "When you took her from her previous owner, she was locked into a beautiful rosewood box lined with red velvet, crying.":
			slavetext = "When you took $him from $his previous owner, $he was locked into a beautiful rosewood box lined with red velvet, crying.";
			break;
		case "You acquired her along with her mother when the family business failed.":
			slavetext = "You acquired $him along with $his mother when the family business failed.";
			break;
		case "You acquired her along with her sissy sister due to her inexperience as a madam.":
			slavetext = "You acquired $him along with $his sissy sister due to $his inexperience as a madam.";
			break;
		case "You bankrupted and enslaved her in revenge for her part in the attack on your arcology by the Daughters of Liberty.":
			slavetext = "You bankrupted and enslaved $him in revenge for $his part in the attack on your arcology by the Daughters of Liberty.";
			break;
		case "You bought her fresh from the intense Gymnasium-Academy right after her majority.":
			slavetext = "You bought $him fresh from the intense Gymnasium-Academy right after $his majority.";
			break;
		case "You bought her fresh from the new Slavegirl School after she was retrained as a slave girl.":
			slavetext = "You bought $him fresh from the new Slavegirl School after $he was retrained as a slave $girl.";
			break;
		case "You bought her fresh from the Slavegirl School right after her majority.":
			slavetext = "You bought $him fresh from the Slavegirl School right after $his majority.";
			break;
		case "You bought her from a body dump, completely broken.":
			slavetext = "You bought $him from a body dump, completely broken.";
			break;
		case "You bought her from a wetware CPU farm, her body ruined but her mind subjected to a simulated career.":
			slavetext = "You bought $him from a wetware CPU farm, $his body ruined but $his mind subjected to a simulated career.";
			break;
		case "You bought her from the girl raiders' slave market the week she reached her majority.":
			slavetext = "You bought $him from the $girl raiders' slave market the week $he reached $his majority.";
			break;
		case "You bought her from the Growth Research Institute right after her use as a test subject ended.":
			slavetext = "You bought $him from the Growth Research Institute right after $his use as a test subject ended.";
			break;
		case "You bought her from the innovative École des Enculées right after her graduation.":
			slavetext = "You bought $him from the innovative École des Enculées right after $his graduation.";
			break;
		case "You bought her from the runaway hunters' slave market after they recaptured her and her original owner did not pay their fee.":
			slavetext = "You bought $him from the runaway hunters' slave market after they recaptured $him and $his original owner did not pay their fee.";
			break;
		case "You bought out a deal for her sale after the seller took her virginity and the buyer no longer wanted her.":
			slavetext = "You bought out a deal for $his sale after the seller took $his virginity and the buyer no longer wanted $him.";
			break;
		case "You got her at the Slave Shelter. Her background is obscure, but seems to have involved terrible abuse of her huge cock and balls.":
			slavetext = "You got $him at the Slave Shelter. $His background is obscure, but seems to have involved terrible abuse of $his huge cock and balls.";
			break;
		case "You got her at the Slave Shelter. Her holes were cruelly stretched by constant plug use.":
			slavetext = "You got $him at the Slave Shelter. $His holes were cruelly stretched by constant plug use.";
			break;
		case "You got her at the Slave Shelter. Her owner purposely blinded her by dumping boiling water into her eyes.":
			slavetext = "You got $him at the Slave Shelter. $His owner purposely blinded $him by dumping boiling water into $his eyes.";
			break;
		case "You got her at the Slave Shelter. Her previous owner discarded her after many pregnancies.":
			slavetext = "You got $him at the Slave Shelter. $His previous owner discarded $him after many pregnancies.";
			break;
		case "You got her at the Slave Shelter. Her previous owner forced her to cut off her breasts and cook them.":
			slavetext = "You got $him at the Slave Shelter. $His previous owner forced $him to cut off $his breasts and cook them.";
			break;
		case "You got her at the Slave Shelter. Her previous owner forced her to cut off her dick and balls and cook them.":
			slavetext = "You got $him at the Slave Shelter. $His previous owner forced $him to cut off $his dick and balls and cook them.";
			break;
		case "You got her at the Slave Shelter. Her previous owner gelded her and used her for anal abuse.":
			slavetext = "You got $him at the Slave Shelter. $His previous owner gelded $him and used $him for anal abuse.";
			break;
		case "You got her at the Slave Shelter. It's not clear why her previous owner cut her arms and legs off.":
			slavetext = "You got $him at the Slave Shelter. It's not clear why $his previous owner cut $his arms and legs off.";
			break;
		case "You got her at the Slave Shelter. She has never communicated anything about her background, since she arrived at the shelter with a broken mind.":
			slavetext = "You got $him at the Slave Shelter. $He has never communicated anything about $his background, since $he arrived at the shelter with a broken mind.";
			break;
		case "You got her at the Slave Shelter. She is an enslaved Daughter of Liberty, caught some weeks after the failed coup. Her previous owner used her as a punching bag and dart board, then when he was bored of her tattooed obscenities all over her body and threw her away.":
			slavetext = "You got $him at the Slave Shelter. $He is an enslaved Daughter of Liberty, caught some weeks after the failed coup. $His previous owner used $him as a punching bag and dart board, then when he was bored of $him tattooed obscenities all over $his body and threw $him away.";
			break;
		case "You got her at the Slave Shelter. She was discarded after suffering a terrible reaction to growth hormone treatment.":
			slavetext = "You got $him at the Slave Shelter. $He was discarded after suffering a terrible reaction to growth hormone treatment.";
			break;
		case "You got her at the Slave Shelter. She was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to her.":
			slavetext = "You got $him at the Slave Shelter. $He was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to $him.";
			break;
		case "You got her at the Slave Shelter. She was worn out by twenty years of brothel service.":
			slavetext = "You got $him at the Slave Shelter. $He was worn out by twenty years of brothel service.";
			break;
		case "You helped free her from a POW camp after being abandoned by her country, leaving her deeply indebted to you.":
			slavetext = "You helped free $him from a POW camp after being abandoned by $his country, leaving $him deeply indebted to you.";
			break;
		case "You kept her after her owner failed to pay your bill for performing surgery on her.":
			slavetext = "You kept $him after $his owner failed to pay your bill for performing surgery on $him.";
			break;
		case "You purchased her as a favor to her father.":
			slavetext = "You purchased $him as a favor to $his father.";
			break;
		case "You purchased her from a King after his son put an illegitimate heir in her womb.":
			slavetext = "You purchased $him from a King after his son put an illegitimate heir in $his womb.";
			break;
		case "You purchased her in order to pave the way for her brother to take the throne.":
			slavetext = "You purchased $him in order to pave the way for $his brother to take the throne.";
			break;
		case "You purchased her indenture contract, making her yours for as long as it lasts.":
			slavetext = "You purchased $his indenture contract, making $him yours for as long as it lasts.";
			break;
		case "You sentenced her to enslavement as a punishment for attempted theft of a slave.":
			slavetext = "You sentenced $him to enslavement as a punishment for attempted theft of a slave.";
			break;
		case "You sentenced her to enslavement as a punishment for dereliction of her duty to you as a mercenary and for theft.":
			slavetext = "You sentenced $him to enslavement as a punishment for dereliction of $his duty to you as a mercenary and for theft.";
			break;
		case "You sentenced her to enslavement as a punishment for smuggling slaves within her body.":
			slavetext = "You sentenced $him to enslavement as a punishment for smuggling slaves within $his body.";
			break;
		case "You stormed her arcology, killed her guards and enslaved her in revenge for insulting you at a dinner party.":
			slavetext = "You stormed $his arcology, killed $his guards, and enslaved $him in revenge for insulting you at a dinner party.";
			break;
		case "You tricked her into enslavement, manipulating her based on her surgical addiction.":
			slavetext = "You tricked $him into enslavement, manipulating $him based on $his surgical addiction.";
			break;
		case "You tricked her mother into selling her into slavery to clear addiction debts.":
			slavetext = "You tricked $his mother into selling $him into slavery to clear addiction debts.";
			break;
		case "You were acquainted with her before you were an arcology owner; your rival tried to use her to manipulate you, but you rescued her.":
			slavetext = "You were acquainted with $him before you were an arcology owner; your rival tried to use $him to manipulate you, but you rescued $him.";
			break;
		case "Your slaving troop kept several girls as fucktoys; you sired her in your favorite.":
			slavetext = "Your slaving troop kept several girls as fucktoys; you sired $him in your favorite.";
			break;
		case "She was enslaved by you when you purchased her debt.":
			slavetext = "$He was enslaved by you when you purchased $his debt.";
			break;
		case "A fresh capture once overpowered you and had his way with you. You kept her as a painful reminder to never lower your guard again.":
		case "Drugs and alcohol can be a potent mix; the night that followed it can sometimes be hard to remember. Needless to say, once your belly began swelling with her, you had to temporarily switch to a desk job for your mercenary group.":
		case "Her musky milky aura drives men and women around her giggly and dumb with lust.":
		case "She chose to be a slave because the romanticized view of it she had turns her on.":
		case "She grew up sheltered and submissive, making her an easy target for enslavement.":
		case "She has a faint air of fatigue about her, and strength too: that of a survivor.":
		case "She has a following in slave pornography. Thousands have enjoyed her getting off from the suffering she caused.":
		case "She has a following in slave pornography. Thousands have enjoyed her humiliating herself.":
		case "She has a following in slave pornography. Thousands have enjoyed the sight of her being raped.":
		case "She has a following in slave pornography. Thousands have enjoyed the sight of her being used.":
		case "She has a following in slave pornography. Thousands have enjoyed the sight of her eating and gaining weight.":
		case "She has a following in slave pornography. Thousands have enjoyed watching her abuse others.":
		case "She has a following in slave pornography. Thousands have enjoyed watching her do anything and everything for cum.":
		case "She has a following in slave pornography. Thousands have enjoyed watching her do anything for attention.":
		case "She has a following in slave pornography. Thousands have enjoyed watching her happily suffer.":
		case "She has a following in slave pornography. Thousands have enjoyed watching her obsess over pumping out babies.":
		case "She has a following in slave pornography. Thousands have enjoyed watching her swell with child.":
		case "She has a verbal tic that causes her to say 'ho, ho, ho' frequently.":
		case "She has many surgical scars and something seems off about her.":
		case "She is a complete mental blank; to her, there is only the Master.":
		case "She is one of the longest legally-enslaved persons in the world, having been a slave for 15 years. She has spent almost all that time working as a slave prostitute, and has been heavily modified to keep her productive.":
		case "She is the winner of a martial arts slave tournament. You won her in a bet.":
		case "She offered herself to you for enslavement to escape having plastic surgery foisted on her.":
		case "She was a runaway slave captured by a gang outside your arcology. You bought her cheap after she was harshly used by them.":
		case "She was a student you enslaved when you evacuated her from a threatened old world grade school.":
		case "She was a volleyball player you enslaved when you evacuated her from a broken down bus.":
		case "She was an expectant mother you enslaved when you evacuated her from a threatened old world hospital.":
		case "She was an orphan forced to live and steal on the streets until you adopted her.":
		case "She was enslaved by you when you overcharged her for surgery.":
		case "She was fresh from the slave markets when you acquired her.":
		case "She was homeless and willing to do anything for food, which in the end resulted in her becoming a slave.":
		case "She was previously owned by a creative sadist, who has left a variety of mental scars on her.":
		case "She was sold to you by an anonymous person who wanted her to suffer.":
		case "She was taken as a slave by a Sultan, who presented her as a gift to a surveyor.":
		case "She was taken into your custody from an owner who treated her as an equal.":
		case "She was the private slave of a con artist cult leader before he had to abandon her and flee.":
		case "She was the result of an intruder brute forcing your firewall, overloading your pleasure sensors, and allowing a corrupted packet to slip by. With a quick wipe of your RAM and cache with some powerful liquor, you have no idea who planted her in your womb.":
		case "You acquired her in the last stages of your career as a noted private military contractor.":
		case "You acquired her in the last stages of your career as a successful venture capitalist.":
		case "You bought her at auction.":
		case "You bought her from The Cattle Ranch.":
		case "You bought her from the enigmatic Futanari Sisters after they sold her into slavery.":
		case "You bought her from the household liquidator.":
		case "You bought her from the kidnappers' slave market, so she was probably forced into slavery.":
		case "You bought her from the prestigious Hippolyta Academy.":
		case "You bought her from the trainers' slave market after they put her through basic training.":
		case "You bought her from the underage raiders' slave market.":
		case "You bought out a deal involving her training to be an expert gelded sex slave.":
		case "You brought her into the arcology mindbroken, little more than a human onahole.":
		case "You brought her into the arcology mindbroken, little more than a walking collection of fuckable holes.":
		case "You captured her during your transition to the arcology":
		case "You conceived her after a male arcology owner, impressed by your work, rewarded you with a night you'll never forget.":
		case "You enslaved her personally during the last stages of your slaving career.":
		case "You helped her give birth, leaving her deeply indebted to you.":
		case "You never thought you would be capable of impregnating yourself, but years of pleasuring yourself with yourself after missions managed to create her.":
		case "You purchased her by special order.":
		case "You purchased her from a King after she expressed knowledge of the prince's affair with another servant.":
		case "You purchased her from FCTV's Home Slave Shopping stream channel.":
		case "You received her as a gift from an arcology owner impressed by your work.":
		case "You received her from a surgeon who botched an implant operation on her and needed to get her out of sight.":
		case "You reserved a mindless slave like her from the Flesh Heap.":
		case "You sentenced her to enslavement as a punishment for attempted burglary.":
		case "You sentenced her to enslavement as a punishment for defying local racial segregation laws.":
		case "You sentenced her to enslavement as a punishment for fraud and theft.":
		case "You sentenced her to enslavement as a punishment for suspected escapism.":
		case "You sentenced her to enslavement as a punishment for theft and battery.":
		case "You sentenced her to enslavement for smuggling drugs into the arcology.":
		case "You sired her after a female arcology owner, impressed by your work, rewarded you with a night you'll never forget.":
		case "You sired her in yourself after an arcology owner, impressed by your work, rewarded you with a night you'll never forget.":
		case "You turned her into a slave girl after she fell into debt to you.":
		case "You won her at a shotgun match against other arcology owners.":
		case "You won her at cards, a memento from your life as one of the idle rich before you became an arcology owner.":
			slavetext = slavetext.replace(/\bherself\b/g, "$himself");
			slavetext = slavetext.replace(/\bHerself\b/g, "$Himself");
			slavetext = slavetext.replace(/\bshe\b/g, "$he");
			slavetext = slavetext.replace(/\bShe\b/g, "$He");
			slavetext = slavetext.replace(/\bher\b/g, "$him");
			slavetext = slavetext.replace(/\bHer\b/g, "$His");
			slavetext = slavetext.replace(/\b girl\b/g, " $girl");
			slavetext = slavetext.replace(/\b woman\b/g, " $woman");
			slavetext = slavetext.replace(/\${2,}/g, '');
			break;
		default:
			if ((slavetext.includes("was serving the public")) || (slavetext.includes("You bought her from"))) {
				slavetext = slavetext.replace(/\bher\b/g, "$him");
			} else if (((slavetext.includes("Your lurcher")) && (slavetext.includes("coursing"))) || ((slavetext.includes("Your")) && (slavetext.includes("while raiding")))) {
				slavetext = slavetext.replace(/\bher\b/g, "$him");
				slavetext = slavetext.replace(/\bshe\b/g, "$he");
			} else if (slavetext.includes("was once the young trophy husband of a powerful woman in the old world, but she sold")) {
				slavetext = "$He was once the young trophy husband of a powerful woman in the old world, but she sold $him into slavery in revenge for $his infidelities.";
			} else if (slavetext.includes("gargantuan dick to be a truly unique slave")) {
				slavetext = "$He was raised as a girl despite $his gargantuan dick to be a truly unique slave.";
			} else if (slavetext.includes("to enslavement for the attempted rape of a free woman")) {
				slavetext = "You sentenced $him to enslavement for the attempted rape of a free woman.";
			} else if (slavetext.includes("to enslavement as a punishment for the rape of a free woman")) {
				slavetext = "You sentenced $him to enslavement as a punishment for the rape of a free woman.";
			} else if (slavetext.includes("only way to obtain surgery to transform $him into a woman")) {
				slavetext = "$He submitted to enslavement as $his only way to obtain surgery to transform $him into a woman.";
			} else if (slavetext.includes("was sold as a slave to satisfy her spousal maintenance after divorce")) {
				slavetext = "Once $he was an arcology security officer, lured to aphrodisiacs addiction and feminized by $his boss (and former wife), to whom $he was sold as a slave to satisfy her spousal maintenance after divorce.";
			} else if (slavetext.includes("asked to be enslaved in the hope you'd treat a fellow woman well")) {
				slavetext = "$He asked to be enslaved in the hope you'd treat a fellow woman well.";
			} else {
				slavetext = slavetext.replace(/\bherself\b/g, "$himself");
				slavetext = slavetext.replace(/\bHerself\b/g, "$Himself");
				slavetext = slavetext.replace(/\bshe\b/g, "$he");
				slavetext = slavetext.replace(/\bShe\b/g, "$He");
				slavetext = slavetext.replace(/\bher\b/g, "$his");
				slavetext = slavetext.replace(/\bHer\b/g, "$His");
				slavetext = slavetext.replace(/\b girl\b/g, " $girl");
				slavetext = slavetext.replace(/\b woman\b/g, " $woman");
				slavetext = slavetext.replace(/\${2,}/g, '');
			}
			break;
	}
	return slavetext;
};

window.convertCareer = function(slave) {
	let job = slave.career;
	if ((V.diversePronouns === 1) && (slave.pronoun === App.Data.Pronouns.Kind.male)) {
		switch (job) {
			case "a dominatrix":
				job = "a dominator";
				break;
			case "a farmer's daughter":
				job = "a farmer's son";
				break;
			case "a handmaiden":
				job = "a handservant";
				break;
			case "a lady courtier":
				job = "a gentleman courtier";
				break;
			case "a landlady":
				job = "a landlord";
				break;
			case "a madam":
				job = "a brothel owner";
				break;
			case "a maid":
				job = "a houseservant";
				break;
			case "a mail-order bride":
				job = "a mail-order groom";
				break;
			case "a mistress":
				job = "a kept man";
				break;
			case "a nun":
				job = "a monk";
				break;
			case "a nursemaid":
				job = "a child's nurse";
				break;
			case "a procuress":
				job = "a procurer";
				break;
			case "a shrine maiden":
				job = "a shrine priest";
				break;
			case "a trophy spouse":
				job = "a trophy husband";
				break;
			case "a weathergirl":
				job = "a weatherman";
				break;
			case "an air hostess":
				job = "an air host";
				break;
			case "being homeschooled by her parents":
				job = "being homeschooled by his parents";
				break;
			case "a camgirl":
			case "a cowgirl":
			case "a girl scout":
			case "a paper girl":
			case "a party girl":
				job = job.replace(/girl/g, "boy");
				break;
			case "a businesswoman":
			case "a criminal businesswoman":
			case "a delivery woman":
			case "a fisherwoman":
			case "a noblewoman":
			case "a saleswoman":
			case "a stuntwoman":
				job = job.replace(/woman/g, "man");
				break;
			case "a housewife":
			case "a trophy wife":
				job = job.replace(/wife/g, "husband");
				break;
			case "a cocktail waitress":
			case "a waitress":
			case "a seamstress":
				job = job.replace(/ress/g, "er");
				break;
			case "a child actress":
			case "an actress":
				job = job.replace(/ress/g, "or");
				break;
		}
	} else if (slave.pronoun === App.Data.Pronouns.Kind.female) {
		switch (job) {
			case "a priest":
				job = "a priestess";
				break;
			case "a trophy spouse":
				job = "a trophy wife";
				break;
			case "a businessman":
			case "a repairman":
				job = job.replace(/man/g, "woman");
				break;
		}
	}
	return job;
};

window.SkillIncrease = (function() {
	return {
		Oral: OralSkillIncrease,
		Vaginal: VaginalSkillIncrease,
		Anal: AnalSkillIncrease,
		Whore: WhoreSkillIncrease,
		Entertain: EntertainSkillIncrease
	};

	/* call as SkillIncrease.Oral() */
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} skillIncrease	// I think
	 * @returns {string}
	 */
	function OralSkillIncrease(slave, skillIncrease = 1) {
		const {He, his} = getPronouns(slave);
		let r = "";

		if (slave.skill.oral <= 10) {
			if (slave.skill.oral + skillIncrease > 10) {
				r = `<span class="green">${He} now has basic knowledge about oral sex,</span> and can at least suck a dick without constant gagging.`;
			}
		} else if (slave.skill.oral <= 30) {
			if (slave.skill.oral + skillIncrease > 30) {
				r = `<span class="green">${He} now has some oral skills,</span> and can reliably bring dicks and pussies to climax with ${his} mouth.`;
			}
		} else if (slave.skill.oral <= 60) {
			if (slave.skill.oral + skillIncrease > 60) {
				r = `<span class="green">${He} is now an oral expert,</span> and has a delightfully experienced tongue.`;
			}
		} else if (slave.skill.oral < 100) {
			if (slave.skill.oral + skillIncrease >= 100) {
				r = `<span class="green">${He} has mastered oral sex,</span> and can learn nothing more about sucking dick or eating pussy.`;
			}
		}
		slave.skill.oral += skillIncrease;
		return r;
	}
	/* call as SkillIncrease.Vaginal() */
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} skillIncrease	// I think
	 * @returns {string}
	 */
	function VaginalSkillIncrease(slave, skillIncrease = 1) {
		const {He} = getPronouns(slave);
		let r = "";

		if (slave.skill.vaginal <= 10) {
			if (slave.skill.vaginal + skillIncrease > 10) {
				r = `<span class="green">${He} now has basic knowledge about vaginal sex,</span> and can avoid some of the common pitfalls and turnoffs.`;
			}
		} else if (slave.skill.vaginal <= 30) {
			if (slave.skill.vaginal + skillIncrease > 30) {
				r = `<span class="green">${He} now has some vaginal sex skills,</span> and can do more than just lie there and take it.`;
			}
		} else if (slave.skill.vaginal <= 60) {
			if (slave.skill.vaginal + skillIncrease > 60) {
				r = `<span class="green">${He} is now a vaginal sex expert,</span> and has the muscular control to massage anything that's inside $him.`;
			}
		} else if (slave.skill.vaginal < 100) {
			if (slave.skill.vaginal + skillIncrease >= 100) {
				r = `<span class="green">${He} has mastered vaginal sex,</span> and can learn nothing more about tribbing or taking dick.`;
			}
		}
		slave.skill.vaginal += skillIncrease;
		return r;
	}

	/* call as SkillIncrease.Anal() */
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} skillIncrease	// I think
	 * @returns {string}
	 */
	function AnalSkillIncrease(slave, skillIncrease = 1) {
		const {He, his} = getPronouns(slave);
		let r = "";

		if (slave.skill.anal <= 10) {
			if (slave.skill.anal + skillIncrease > 10) {
				r = `<span class="green">${He} now has basic knowledge about anal sex,</span> and can accept penetration of ${his} anus without danger.`;
			}
		} else if (slave.skill.anal <= 30) {
			if (slave.skill.anal + skillIncrease > 30) {
				r = `<span class="green">${He} now has some anal sex skills,</span> and needs less preparation before taking rough penetration.`;
			}
		} else if (slave.skill.anal <= 60) {
			if (slave.skill.anal + skillIncrease > 60) {
				r = `<span class="green">${He} is now an anal sex expert,</span> and knows how to use ${his} sphincter to please.`;
			}
		} else if (slave.skill.anal < 100) {
			if (slave.skill.anal + skillIncrease >= 100) {
				r = `<span class="green">${He} has mastered anal sex,</span> and can learn nothing more about taking it up the ass.`;
			}
		}
		slave.skill.anal += skillIncrease;
		return r;
	}

	/* call as SkillIncrease.Whore() */
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} skillIncrease	// I think
	 * @returns {string}
	 */
	function WhoreSkillIncrease(slave, skillIncrease = 1) {
		const {He, his} = getPronouns(slave);
		let r = "";

		if (slave.skill.whoring <= 10) {
			if (slave.skill.whoring + skillIncrease > 10) {
				r = `<span class="green">${He} now has basic knowledge about how to whore,</span> and can avoid some potentially dangerous situations.`;
			}
		} else if (slave.skill.whoring <= 30) {
			if (slave.skill.whoring + skillIncrease > 30) {
				r = `<span class="green">${He} now has some skill as a whore,</span> and knows how to sell ${his} body at a good price.`;
			}
		} else if (slave.skill.whoring <= 60) {
			if (slave.skill.whoring + skillIncrease > 60) {
				r = `<span class="green">${He} is now an expert whore,</span> and can often make clients forget that $he's a prostitute they're paying for.`;
			}
		} else if (slave.skill.whoring < 100) {
			if (slave.skill.whoring + skillIncrease >= 100) {
				r = `<span class="green">${He} is now a masterful whore,</span> and can learn nothing more about prostitution.`;
			}
		}
		slave.skill.whoring += skillIncrease;
		return r;
	}

	/* call as SkillIncrease.Entertain() */
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} skillIncrease	// I think
	 * @returns {string}
	 */
	function EntertainSkillIncrease(slave, skillIncrease = 1) {
		const {He} = getPronouns(slave);
		let r = "";

		if (slave.skill.entertainment <= 10) {
			if (slave.skill.entertainment + skillIncrease > 10) {
				r = `<span class="green">${He} now has basic knowledge about how to be entertaining,</span> and can usually avoid serious faux pas.`;
			}
		} else if (slave.skill.entertainment <= 30) {
			if (slave.skill.entertainment + skillIncrease > 30) {
				r = `<span class="green">${He} now has some skill as an entertainer,</span> and can flirt, dance, and strip acceptably.`;
			}
		} else if (slave.skill.entertainment <= 60) {
			if (slave.skill.entertainment + skillIncrease > 60) {
				r = `<span class="green">${He} is now an expert entertainer,</span> and can flirt engagingly, dance alluringly, and strip arousingly.`;
			}
		} else if (slave.skill.entertainment < 100) {
			if (slave.skill.entertainment + skillIncrease >= 100) {
				r = `<span class="green">${He} is now a masterful entertainer,</span> and can learn nothing more about flirting, dancing, or stripping.`;
			}
		}
		slave.skill.entertainment += skillIncrease;
		return r;
	}
})();

window.upgradeMultiplier = function(skill) {
	if (skill === 'medicine' && V.PC.career === "medicine" || skill === 'engineering' && V.PC.career === "engineer"
	|| ((skill === 'medicine' || skill === 'engineering') && V.arcologies[0].FSRestartDecoration >= 100 && V.eugenicsFullControl === 0)) {
		return 0.6;
	}
	if (V.PC.skill[skill] <= -100) {
		return 1.5;
	} else if (V.PC.skill[skill] <= -75) {
		return 1.35;
	} else if (V.PC.skill[skill] <= -50) {
		return 1.25;
	} else if (V.PC.skill[skill] <= -25) {
		return 1.15;
	} else if (V.PC.skill[skill] < 0) {
		return 1.10;
	} else if (V.PC.skill[skill] === 0) {
		return 1;
	} else if (V.PC.skill[skill] <= 10) {
		return 0.97;
	} else if (V.PC.skill[skill] <= 25) {
		return 0.95;
	} else if (V.PC.skill[skill] <= 50) {
		return 0.90;
	} else if (V.PC.skill[skill] <= 75) {
		return 0.85;
	} else if (V.PC.skill[skill] <= 100) {
		return 0.80;
	} else {
		return 0.75;
	}
};

/**
 * Return a career at random that would be suitable for the given slave.
 * Currently only considers their age
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.randomCareer = function(slave) {
	if (slave.actualAge < 16) {
		return setup.veryYoungCareers.random();
	} else if (slave.actualAge <= 24) {
		return setup.youngCareers.random();
	} else if (slave.intelligenceImplant >= 10) {
		return setup.educatedCareers.random();
	} else {
		return setup.uneducatedCareers.random();
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.resyncSlaveHight = function(slave) {
	slave.height = Math.round(Height.random(slave));
};

/**
 * @param {App.Entity.SlaveState} slave
 */
window.resyncSlaveToAge = function(slave) {
	resyncSlaveHight(slave);
	slave.pubertyXX = slave.actualAge < slave.pubertyAgeXX ? 0 : 1;
	slave.pubertyXY = slave.actualAge < slave.pubertyAgeXY ? 0 : 1;
	if (slave.actualAge < 12) {
		slave.vagina = 0;
		slave.trueVirgin = 1;
		slave.preg = -1;
		slave.belly = 0;
		slave.bellyPreg = 0;
		slave.ovaries = 1;
		slave.anus = 0;
		slave.skill.anal = 0;
		slave.skill.oral = 0;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 0;
		slave.skill.combat = 0;
		slave.skill.vaginal = 0;
		slave.attrXY = 50;
		slave.attrXX = 50;
		slave.boobs = 200;
		slave.birthWeek = 0;
		SetBellySize(slave);
		if (slave.dick > 0) {
			slave.dick = 1;
		}
		if (slave.balls > 0) {
			slave.balls = 1;
		}
	} else {
		slave.boobs = Math.max(slave.boobs, 500);
		if (slave.dick > 2) {
			slave.dick = 2;
		}
		if (slave.balls > 2) {
			slave.balls = 2;
		}
	}
	slave.career = randomCareer(slave);
};

/**
 * @param {string} raceName
 * @returns {string}
 */
window.randomRaceSkin = function(raceName) {
	let skin;
	switch (raceName) {
		case "asian":
			skin = jsEither(["dark olive", "light olive", "light"]);
			break;
		case "amerindian":
		case "indo-aryan":
		case "malay":
		case "pacific islander":
			skin = jsEither(["dark", "light"]);
			break;
		case "black":
			skin = jsEither(["black", "brown", "dark brown"]);
			break;
		case "latina":
			skin = jsEither(["brown", "dark brown", "dark olive", "light olive", "tan"]);
			break;
		case "middle eastern":
		case "semitic":
		case "southern european":
			skin = jsEither(["fair", "light olive", "light", "tan"]);
			break;
		case "white":
			skin = jsEither(["fair", "light", "pale"]);
			break;
		default:
			skin = jsEither(["dark", "light", "pale"]);
			break;
	}
	return skin;
};

/**
 * @param {string} raceName
 * @returns {string}
 */
window.randomRaceEye = function(raceName) {
	let eye;
	switch (raceName) {
		case "asian":
		case "black":
		case "indo-aryan":
		case "middle eastern":
		case "pacific islander":
			eye = jsEither(["brown", "brown", "brown", "brown", "green"]);
			break;
		case "amerindian":
		case "latina":
			eye = jsEither(["brown", "brown", "brown", "green"]);
			break;
		case "malay":
		case "southern european":
			eye = jsEither(["blue", "brown", "brown", "brown", "brown", "brown", "brown", "green"]);
			break;
		case "semitic":
		case "white":
			eye = jsEither(["blue", "brown", "brown", "brown", "green", "green"]);
			break;
		default:
			eye = jsEither(["blue", "brown", "green"]);
			break;
	}
	return eye;
};

/**
 * @param {string} raceName
 * @returns {string}
 */
window.randomRaceHair = function(raceName) {
	let hair;
	switch (raceName) {
		case "asian":
		case "amerindian":
		case "indo-aryan":
		case "malay":
		case "middle eastern":
		case "pacific islander":
			hair = jsEither(["black", "black", "black", "black", "black", "brown"]);
			break;
		case "black":
		case "latina":
		case "semitic":
		case "southern european":
			hair = jsEither(["black", "black", "brown", "brown"]);
			break;
		case "white":
			hair = jsEither(["black", "black", "blonde", "brown", "brown", "red"]);
			break;
		default:
			hair = jsEither(["black", "black", "black", "black", "blonde", "brown", "brown", "red"]);
			break;
	}
	return hair;
};

/**
 * @param {string} skinTone
 * @returns {number}
 */
window.skinToneLevel = function(skinTone) {
	if (!setup.naturalSkins.includes(skinTone)) {
		return undefined;
	}
	const skinToMelanin = {
		"pure black": 25,
		"ebony": 24,
		"black": 23,
		"dark brown": 22,
		"brown": 21,
		"light brown": 20,
		"dark beige": 19,
		"beige": 18,
		"light beige": 17,
		"dark": 16,
		"dark olive": 15,
		"bronze": 14,
		"olive": 13,
		"tan": 12,
		"light olive": 11,
		"light": 10,
		"fair": 9,
		"very fair": 8,
		"extremely fair": 7,
		"pale": 6,
		"very pale": 5,
		"extremely pale": 4,
		"white": 3,
		"ivory": 2,
		"pure white": 1
	};
	return skinToMelanin[skinTone];
};

/**
 * Increase or decrease skinTone
 * @param {string} skin
 * @param {number} value
 * @returns {string}
 */

window.changeSkinTone = function(skin, value) {
	if (!setup.naturalSkins.includes(skin)) {
		return skin;
	}
	const skinToMelanin = {
		"pure black": 25,
		"ebony": 24,
		"black": 23,
		"dark brown": 22,
		"brown": 21,
		"light brown": 20,
		"dark beige": 19,
		"beige": 18,
		"light beige": 17,
		"dark": 16,
		"dark olive": 15,
		"bronze": 14,
		"olive": 13,
		"tan": 12,
		"light olive": 11,
		"light": 10,
		"fair": 9,
		"very fair": 8,
		"extremely fair": 7,
		"pale": 6,
		"very pale": 5,
		"extremely pale": 4,
		"white": 3,
		"ivory": 2,
		"pure white": 1
	};
	let newSkin = (skinToMelanin[skin] + value);
	if (newSkin > 25) {
		newSkin = 25;
	} else if (newSkin < 1) {
		newSkin = 1;
	}
	let prop;
	for (prop in skinToMelanin) {
		if (!skinToMelanin.hasOwnProperty(prop)) { continue; }
		if (newSkin >= skinToMelanin[prop]) { return prop; }
	}
	return prop;
};

/**
 * @param {string} color
 * @returns {number}
 */
window.nippleColorLevel = function(color) {
	if (!setup.naturalNippleColors.includes(color)) {
		return undefined;
	}
	const nippleColor = {
		"ebony": 8,
		"black": 7,
		"dark brown": 6,
		"brown": 5,
		"light brown": 4,
		"pink": 3,
		"pale pink": 2,
		"ivory": 1,
	};
	return nippleColor[color];
};

/**
 * Increase or decrease skinTone
 * @param {string} skin
 * @param {number} value
 * @returns {string}
 */


/**
 * Expression for SugarCube for referencing a slave by index
 * @param {number} i slave array index or -1 for activeSlave
 * @returns {string}
 */
App.Utils.slaveRefString = function(i) {
	return i >= 0 ? `$slaves[${i}]` : '$activeSlave';
};

/**
 * Returns slave by index in the slave array, Accepts -1 for the activeSlave
 * @param {number} i slave array index or -1 for activeSlave
 * @returns {App.Entity.SlaveState}
 */
App.Utils.slaveByIndex = function(i) {
	return i === -1 ? State.variables.activeSlave : State.variables.slaves[i];
};

/**
 * Sets active slave to the slave with the given index. Does nothing if index < 0
 * @param {number} index
 */
App.Utils.setActiveSlaveByIndex = function(index) {
	if (index >= 0) {
		State.variables.activeSlave = State.variables.slaves[index];
	}
};

/**
 * Returns index in the slave array for the given ID
 * @param {number} id slave ID
 * @returns {number}
 */
App.Utils.slaveIndexForId = function(id) {
	return State.variables.slaveIndices[id];
};

/**
 * Sets temporary variables named by the scheme, described below, to pronouns for the given slave
 * @param {App.Entity.SlaveState} slave
 * @param {any} [suffix] pronounsSuffix. Anything that can be converted to string.
 * @param {string[]} [pronouns] requested pronouns. Defaults to all pronoun forms.
 *
 * The variables naming scheme is the pronoun name (he, his, etc.) and optional suffix. If the suffix is empty, the variables
 * will be set as story variables, otherwise as temporary variables.
 * This way for a call App.Utils.setLocalPronouns(slave) there will be story variables "$he", "$his", for
 * App.Utils.setLocalPronouns(slave, 1): _he1, _his1 and so on.
 */
App.Utils.setLocalPronouns = function(slave, suffix, pronouns) {
	const ps = getPronouns(slave);
	/** @type {string} */
	const pSuffix = suffix !== undefined ? suffix.toString() : '';
	pronouns = pronouns || [ // Object.getOwnPropertyNames(ps) ?
		'he', 'him', 'his', 'himself', 'boy',
		'He', 'Him', 'His', 'Himself', 'Boy',
		'man', 'men', 'shota', 'son', 'brother', 'husband', 'husbands', 'father', 'fathers',
		'Man', 'Men', 'Shota', 'Son', 'Brother', 'Husband', 'Husbands', 'Father', 'Fathers',
		'she', 'her', 'hers', 'herself', 'girl',
		'She', 'Her', 'Hers', 'Herself', 'Girl',
		'woman', 'women', 'loli', 'daughter', 'sister', 'wife', 'wives', 'mother', 'mothers',
		'Woman', 'Women', 'Loli', 'Daughter', 'Sister', 'Wife', 'Wives', 'Mother', 'Mothers'
	]; // Pronouns always refer to the slave in question, never any relation of theirs.  It is "mother" as in "she is a mother of many" not "you are her mother".  Plural pronouns would refer to "wives like her," not "her wives."

	const scope = pSuffix.length === 0 ? State.variables : State.temporary;
	pronouns.forEach(p => {
		scope[p + pSuffix] = ps[p];
	});
};

/**
 * Fix nationalities as adjectives
 * @param {string} nation
 * @returns {string}
 */

window.aNational = function(nation) {
	let country;
	if (nation === "a Cook Islander") {
		country = "Cook Islander";
	} else if (nation === "a Liechtensteiner") {
		country = "Liechtensteiner";
	} else if (nation === "a New Zealander") {
		country = "New Zealander";
	} else if (nation === "a Solomon Islander") {
		country = "Solomon Islander";
	} else {
		country = nation;
	}
	return country;
};

/**
 * Fix nationalities as plurals
 * @param {string} nation
 * @returns {string}
 */

window.moreNational = function(nation) {
	let country;
	if (nation === "a Cook Islander") {
		country = "Cook Islander";
	} else if (nation === "a Liechtensteiner") {
		country = "Liechtensteiner";
	} else if (nation === "Mosotho") {
		country = "Basotho";
	} else if (nation === "Motswana") {
		country = "Batswana";
	} else if (nation === "a New Zealander") {
		country = "New Zealander";
	} else if (nation === "a Solomon Islander") {
		country = "Solomon Islander";
	} else {
		country = nation;
	}
	return country;
};

/**
 * Returns a "disobedience factor" between 0 (perfectly obedient) and 100 (completely defiant)
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.disobedience = function(slave) {
	const devotionBaseline = 20; // with devotion above this number slaves will obey completely
	const trustBaseline = -20; // with trust below this number slaves will obey completely

	if (slave.devotion > devotionBaseline || slave.trust < trustBaseline) {
		return 0; // no chance of disobedience
	}

	// factors are between 0 (right on the boundary of perfectly obedient) and 10 (completely disobedient)
	let devotionFactor = 10 - ((10 * (slave.devotion + 100))/(devotionBaseline + 100));
	let trustFactor = (10 * (slave.trust - trustBaseline))/(100 - trustBaseline);
	return Math.round(devotionFactor * trustFactor);
};

/**
 * Returns a valid rape target for a slave who is going to rape one of his peers into rivalry with him.
 * @param {App.Entity.SlaveState} slave
 * @param {function(App.Entity.SlaveState): boolean} predicate
 * @returns {App.Entity.SlaveState | undefined}
 */
window.randomRapeRivalryTarget = function(slave, predicate) {
	const willIgnoreRules = disobedience(slave) > jsRandom(0, 100);

	function canBeARapeRival(s) {
		return (s.devotion <= 95 && s.energy <= 95 && !s.rivalry && !s.fuckdoll && s.fetish !== "mindbroken");
	}

	function canRape(rapist, rapee) {
		const opportunity = (assignmentVisible(rapist) && assignmentVisible(rapee)) || rapist.assignment === rapee.assignment;
		const taboo = V.seeIncest === 0 && areRelated(rapist, rapee);
		const desire = !(rapist.relationship >= 3 && rapist.relationshipTarget === rapee.id) && !taboo;
		const permission = willIgnoreRules || App.Utils.sexAllowed(rapist, rapee);
		return opportunity && desire && permission;
	}

	if (typeof predicate !== 'function') {
		predicate = (() => true);
	}

	const arr = V.slaves.filter((s) => { return canBeARapeRival(s) && canRape(slave, s); }).shuffle();
	return arr.find(predicate);
};

/**
 * @param {object} params
 * @param {string|function(App.Entity.SlaveState): number} params.part slave object property or custom function
 * @param {number} [params.count] number of slaves to return
 * @param {boolean} [params.largest] should it search for the biggest or smallest value
 * @param {function(App.Entity.SlaveState): boolean} [params.filter] filter out undesired slaves
 * @returns {App.Entity.SlaveState[]} sorted from best to worst
 */
window.getBestSlaves = function({part, count = 3, largest = true, filter = (() => true)} = {}) {
	if (!_.isFunction(part)) {
		const partName = part;
		part = (slave) => slave[partName];
	}
	const sortMethod = largest ? (left, right) => right.value - left.value : (left, right) => left.value - right.value;
	return V.slaves.filter(slave => filter(slave))
		.map(slave => ({slave, value: part(slave)}))
		.sort(sortMethod)
		.slice(0, count)
		.map(slaveInfo => slaveInfo.slave);
};
/**
 * @param {{}} info see getBestSlaves()
 * @returns {number[]}
 */
window.getBestSlavesIndices = function(info) {
	return getBestSlaves(info).map(slave => V.slaveIndices[slave.ID]);
};

/*
//Example
getBestSlaves({part:"butt", count: 5});
getBestSlaves({part:"boobs"});//defaults to top 3
getBestSlaves({part:"dick", smallest:true, filter:(slave)=>slave.dick > 0});//defaults to top 3
getBestSlaves({part:slave=>slave.intelligence+slave.intelligenceImplant});
*/

/**
 * Generates a new slave ID that is guaranteed to be unused
 * @returns {number} slave ID
 */
window.generateSlaveID = function() {
	// household liquidators and recETS generate slaves at an offset of 1000 (and many such slaves already exist)
	// if you go through enough slaves you WILL generate collisions, so make sure we haven't just done that.
	let allSlaveIDs = [...V.slaves.map((s) => s.ID), ...V.tanks.map((s) => s.ID), ...V.cribs.map((s) => s.ID)];
	while (allSlaveIDs.contains(V.IDNumber)) {
		V.IDNumber++;
	}
	return V.IDNumber++;
};

window.ASDump = function() {
	if ((typeof V.activeSlave === undefined) || (V.activeSlave === 0)) {
		return `<span class="red">ERROR:</span> AS Dump, activeSlave invalid, returnTo is 'V.returnTo', previous passage was '${previous()}'. Please report this. `;
	} else {
		let SL = V.slaves.length;
		let ID = V.activeSlave.ID;
		if (V.i >= 0 && V.i < SL && V.slaves[V.i].ID === ID) { /* shortcut if V.i is already pointing to this slave */
			V.slaves[V.i] = V.activeSlave;
		} else {
			V.i = V.slaveIndices[ID]; // find V.i if exists
			if (typeof V.i === undefined) { /* not found, so new slave */
				newSlave(V.activeSlave);
			} else {
				V.slaves[V.i] = V.activeSlave;
			}
		}
	}
};
