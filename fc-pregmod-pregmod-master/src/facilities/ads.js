App.Ads = {};
App.Ads.Categories = {};

/* Ad categories can classify individual slaves into many values, but at the facility level they get reduced to positive, zero, and negative to see whether the ads were effective */

App.Ads.Categories.age = {
	varSuffix: "Old",

	classifySlave: function(slave) {
		if (isYoung(slave)) {
			if (slave.physicalAge >= 18) {
				return -1; // young adult
			} else if (slave.physicalAge >= 13) {
				return -2; // teen
			} else {
				return -3; // loli
			}
		}
		return 1; // mature
	},

	classifyLocalPreference: function() {
		if ((V.arcologies[0].FSMaturityPreferentialist !== "unset") && (V.arcologies[0].FSMaturityPreferentialist >= 80)) {
			return 1; // mature
		} else if ((V.arcologies[0].FSYouthPreferentialist !== "unset") && (V.arcologies[0].FSYouthPreferentialist >= 80)) {
			return -1; // young
		}
		return 0;
	}
};

App.Ads.Categories.assetSize = {
	varSuffix: "Stacked",

	classifySlave: function(slave) {
		if (isStacked(slave)) {
			return 1;
		} else if (isSlim(slave)) {
			return -1;
		} else {
			return 0;
		}
	},

	classifyLocalPreference: function() {
		if ((V.arcologies[0].FSAssetExpansionist !== "unset") && (V.arcologies[0].FSAssetExpansionist >= 80)) {
			return 1; // stacked
		} else if ((V.arcologies[0].FSSlimnessEnthusiast !== "unset") && (V.arcologies[0].FSSlimnessEnthusiast >= 80)) {
			return -1; // slim
		}
		return 0;
	}
};

App.Ads.Categories.assetOrigin = {
	varSuffix: "Implanted",

	classifySlave: function(slave) {
		if (isSurgicallyImproved(slave)) {
			return 1;
		} else if (isPure(slave)) {
			return -1;
		}
		return 0;
	},

	classifyLocalPreference: function() {
		if ((V.arcologies[0].FSTransformationFetishist !== "unset") && (V.arcologies[0].FSTransformationFetishist >= 80)) {
			return 1; // implanted
		} else if ((V.arcologies[0].FSBodyPurist !== "unset") && (V.arcologies[0].FSBodyPurist >= 80)) {
			return -1; // natural
		}
		return 0;
	}
};

App.Ads.Categories.mods = {
	varSuffix: "Modded",

	classifySlave: function(slave) {
		if (SlaveStatsChecker.isModded(slave)) {
			return 1;
		} else if (SlaveStatsChecker.isUnmodded(slave)) {
			return -1;
		}
		return 0;
	},

	classifyLocalPreference: function() {
		if ((V.arcologies[0].FSDegradationist !== "unset") && (V.arcologies[0].FSDegradationist >= 80)) {
			return 1; // modded
		} else if ((V.arcologies[0].FSBodyPurist !== "unset") && (V.arcologies[0].FSBodyPurist >= 80)) {
			return -1; // natural
		}
		return 0;
	}
};

App.Ads.Categories.preg = {
	varSuffix: "Preg",

	classifySlave: function(slave) {
		if (isPreg(slave)) {
			return 1;
		} else if (isNotPreg(slave)) {
			return -1;
		}
		return 0;
	},

	classifyLocalPreference: function() {
		if ((V.arcologies[0].FSRepopulationFocus !== "unset") && (V.arcologies[0].FSRepopulationFocus >= 80)) {
			return 1; // pregnant
		} else if ((V.arcologies[0].FSRestart !== "unset") && (V.arcologies[0].FSRestart >= 80)) {
			return -1; // non-pregnant
		}
		return 0;
	}
};

App.Ads.Categories.genitalia = {
	varSuffix: "XX",

	classifySlave: function(slave) {
		if (slave.dick === 0 && slave.vagina > -1) {
			return 1; // pussies, no dicks
		} else if (slave.dick > 0) {
			return -1; // dicks, pussies optional
		}
		return 0; // null?
	},

	classifyLocalPreference: function() {
		if ((V.arcologies[0].FSGenderFundamentalist !== "unset") && (V.arcologies[0].FSGenderFundamentalist >= 80)) {
			return 1; // pussies, no dicks
		} else if ((V.arcologies[0].FSGenderRadicalist !== "unset") && (V.arcologies[0].FSGenderRadicalist >= 80)) {
			return -1; // dicks, pussies optional
		}
		return 0;
	}
};

/** Returns all the ad categories in the system. */
App.Ads.getAllCategories = function() {
	return _.values(App.Ads.Categories);
};


/** categorizes a girl in all the categories and returns the total categories in which she matches the advertisements */
App.Ads.getMatchedCategoryCount = function(slave, facility) {
	let matchedCategories = 0;

	for (const cat of App.Ads.getAllCategories()) {
		const result = cat.classifySlave(slave);
		if (result === V[`${facility}Ads${cat.varSuffix}`]) {
			++matchedCategories;
		}
	}

	return matchedCategories;
};

/** Manages the ads for a facility.  Use example: <<set _adMgr = new App.Ads.AdManager("brothel")>> */
App.Ads.AdManager = class {
	constructor(facility) {
		this.varPrefix = `${facility}Ads`;
		this.totalSlaves = 0;
		this.missedBonuses = 0;
		for (const cat of App.Ads.getAllCategories()) {
			this[`tally${cat.varSuffix}`] = new Map();
		}
	}

	/** categorizes a girl in all the categories and adds the results to the running totals */
	tallySlave(slave) {
		++this.totalSlaves;
		for (const cat of App.Ads.getAllCategories()) {
			const result = cat.classifySlave(slave);
			this[`tally${cat.varSuffix}`].set(result, (this[`tally${cat.varSuffix}`].get(result) || 0) + 1);
		}
	}

	_coalesceTally(category) {
		const catMap = this[`tally${category.varSuffix}`];
		let neg = 0;
		let pos = 0;
		for (let [key, tally] of catMap) {
			if (key < 0) {
				neg += tally;
			} else if (key > 0) {
				pos += tally;
			} /* index == 0 is deliberately ignored */
		}
		return {neg, pos};
	}

	/** returns -1 if the majority of the girls have a negative value, +1 if the majority of the girls have a positive value, and 0 otherwise */
	slavesMajority(category) {
		const {neg, pos} = this._coalesceTally(category);
		if (neg > this.totalSlaves * 0.5) {
			return -1;
		} else if (pos > this.totalSlaves * 0.5) {
			return +1;
		} else {
			return 0;
		}
	}

	/** returns true if the majority of the girls fit the local preferences in the given category */
	slavesMatchPrefs(category) {
		const majority = this.slavesMajority(category);
		return (majority !== 0 && majority === category.classifyLocalPreference());
	}

	/** returns true if the majority of the girls fit the ad campaign in the given category */
	slavesMatchAds(category) {
		const majority = this.slavesMajority(category);
		return (majority !== 0 && majority === V[`${this.varPrefix}${category.varSuffix}`]);
	}

	/** returns true if the local preferences match the ad campaign in the given category */
	prefsMatchAds(category) {
		const prefs = category.classifyLocalPreference();
		return (prefs !== 0 && prefs === V[`${this.varPrefix}${category.varSuffix}`]);
	}

	/** returns -1 if the category qualifies for a variety bonus but the facility failed to get it, 1 if the category qualifies for a variety bonus and the facility got it, or 0 if it did not qualify */
	varietyBonus(category) {
		// qualifies for variety bonus only if the category has no preference, we are spending money on ads, and our ads show no preference
		if (category.classifyLocalPreference() !== 0 || V[`${this.varPrefix}Spending`] === 0 || V[`${this.varPrefix}${category.varSuffix}`] !== 0) {
			return 0;
		}
		// check to see if we achieved variety bonus
		const {neg, pos} = this._coalesceTally(category);
		if (neg > 0 && pos > 0 && Math.abs(pos - neg) <= (this.totalSlaves / 3)) {
			return 1; // got it
		} else {
			this.missedBonuses++;
			return -1; // qualified but failed
		}
	}

	overallVarietyBonus() {
		return (this.missedBonuses === 0);
	}
};

App.Ads.report = function(building, preview) {
	"use strict";
	if (typeof preview === undefined) {
		preview =false;
	}
	let r = ``;

	let ids;
	if (building === "brothel") {
		ids = "BrothiIDs";
	} else {
		ids = (capFirstChar(building) + "iIDs");
	}

	const DL = V[ids].length;

	let adMgr = new App.Ads.AdManager(building);
	for (let dI = 0; dI < DL; dI++) {
		adMgr.tallySlave(V.slaves[V.slaveIndices[V[ids][dI]]]);
	}
	if (building === "brothel") {
		if (V.Madam !== 0) {
			adMgr.tallySlave(V.Madam);
		}
	} else if (building === "club") {
		if (V.DJ !== 0) {
			adMgr.tallySlave(V.DJ);
		}
	}

	let adCampaign = {
		stacked: V[building + "AdsStacked"],
		preg: V[building + "AdsPreg"],
		modded: V[building + "AdsModded"],
		implanted: V[building + "AdsImplanted"],
		XX: V[building + "AdsXX"],
		age: V[building + "AdsOld"],
		spending: V[building + "AdsSpending"]
	};

	return report(building, preview);

	function report(building, preview) {
		if (preview) {
			r += `<p><h3>Asset size</h3>`;
			r += stacked(building, preview);
			r += links(building, "stacked");
			r += `</p>`;

			r += `<p><h3>Asset origin</h3>`;
			r += implanted(building, preview);
			r += links(building, "implanted");
			r += `</p>`;

			r += `<p><h3>Body mods</h3>`;
			r += modded(building, preview);
			r += links(building, "modded");
			r += `</p>`;

			if (V.seePreg !== 0) {
				r += `<p><h3>Pregnancy</h3>`;
				r += preg(building, preview);
				r += links(building, "preg");
				r += `</p>`;
			}

			r += `<p><h3>Age: under 30 or above</h3>`;
			r += age(building, preview);
			r += links(building, "age");
			r += `</p>`;

			if (V.seeDicks !== 0) {
				r += `<p><h3>Genitalia</h3>`;
				r += XX(building, preview);
				r += links(building, "XX");
				r += `</p>`;
			}

			r += `<p>`;
			r += final(building, preview);
			r += `</p>`;
		} else {
			r += `<p>`;
			r += intro(building, preview);
			r += `</p><p>`;
			r += stacked(building, preview);
			r += `</p><p>`;
			r += preg(building, preview);
			r += `</p><p>`;
			r += modded(building, preview);
			r += `</p><p>`;
			r += implanted(building, preview);
			r += `</p><p>`;
			r += XX(building, preview);
			r += `</p><p>`;
			r += age(building, preview);
			r += `</p><p>`;
			r += final(building, preview);
			r += `</p>`;
		}
		return r;
	}
	function intro(building, preview) {
		let t = ``;
		if (adCampaign.spending !== 0) {
			if (building === "brothel") {
				t += `<div>An ad campaign is supporting business there, and `;
				if (building === "brothel") {
					t += `whores `;
				 } else {
					t += `sluts `;
				 }
				 t += `that match it make more ¤.</div>`;
			} else if (building === "club") {
				t += `<div>An ad campaign is getting citizens into the ${building} every night, and sluts that match it gratify patrons.</div>`;
			}
		}
		return t;
	}

	function payVarietyBonus() {
		if (!preview) {
			if (building === "brothel") {
				const adsIncome = DL*random(20, 30);
				V.facility[building].adsIncome += adsIncome;
				cashX(adsIncome, (building + "Ads"));
			} else if (building === "club") {
				V.clubBonuses++;
				repX(DL*random(5, 10), (building + "Ads"));
			}
		}
	}

	function payAdBonus() {
		if (!preview) {
			if (building === "brothel") {
				const adsIncome = DL*random(20, 30);
				V.facility[building].adsIncome += adsIncome;
				cashX(adsIncome, (building + "Ads"));
			} else if (building === "club") {
				V.clubBonuses++;
				repX(DL*random(5, 10), (building + "Ads"));
			}
		}
	}

	function stacked(building, preview) {
		let t = ``;
		const pref = App.Ads.Categories.assetSize.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.assetSize);
		if (V.debugMode === 1) { t += `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.stacked}`; }

		// Ads
		if (adCampaign.spending !== 0) {
			t += `<div>`;
			if (adCampaign.stacked === 1) {
				t += `Its advertisements feature girls with plenty up top and rears to match. `;
			} else if (adCampaign.stacked === -1) {
				t += `Its advertisements feature trim girls with little in the way of T&A. `;
			} else {
			t += `Its advertisements feature a variety of girls, some that are trim and others that are curvaceous. `;
			}
			t += `</div>`;
		}

		// Preferences
		if (pref === 1) {
			t += `Most customers prefer their girls well endowed. `;
		} else if (pref === -1) {
			t += `Most customers prefer their girls light. `;
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.assetSize);
			if (variety === 1) {
				payVarietyBonus();
				t += `The ${building} offers a `;
				if (building === "brothel") {
					t+= `<span class="yellowgreen">`;
				} else if (building === "club") {
					t+= `<span class="green">`;
				}
				t += `wide</span> variety of slim and stacked slaves. `;
			}
			t += `Most customers don't mind the selection of assets. `;
		}

		// Girls
		if (girls === -1) {
			t += `Most of the slaves in the ${building} have small tits and asses. `;
		} else if (girls === 1) {
			t += `Most of the slaves in the ${building} have large tits and asses. `;
		} else {
			t += `The slaves in the ${building} vary in asset size. `;
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.stacked === pref) && (girls === adCampaign.stacked)) {
				payAdBonus();
				t += `Its advertising for `;
				if (adCampaign.stacked === 1) {
					t += `stacked `;
				} else if (adCampaign.stacked === -1) {
					t += `trim `;
				}
				t += `girls matched most customers' preferences and the girls in the ${building} matched its advertisements. `;
				t += reputation(building, 1, preview);
			} else if ((adCampaign.stacked === pref) && (girls !== adCampaign.stacked)) {
				t += `Its advertising for `;
				if (adCampaign.stacked === 1) {
					t += `stacked `;
				} else if (adCampaign.stacked === -1) {
					t += `trim `;
				}
				t += `girls matched most customers preferences, but most of the girls in the ${building} were not as advertised. `;
				t += reputation(building, -1, preview);
			} else if ((girls === pref) && (girls !== adCampaign.stacked)) {
				t += `The `;
				if (girls === 1) {
					t += `stacked `;
				} else if (girls === -1) {
					t += `trim `;
				}
				t += `girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for `;
				if (pref === 1) {
					t += `stacked `;
				} else if (pref === -1) {
					t += `slim `;
				}
				t += `girls, `;
				t += reputation(building, 0, preview);
			} else if (girls !== pref) {
				t += `Some customers were put off since the `;
				if (girls === 1) {
					t += `stacked `;
				} else if (girls === -1) {
					t += `trim `;
				}
				t += `girls there did not match their preferences for `;
				if (pref === 1) {
					t += `stacked `;
				} else if (pref === -1) {
					t += `slim `;
				}
				t += `girls. `;
				t += reputation(building, -1, preview);
			}
		} else {
			if (girls === pref) {
				t += `The `;
				if (girls === 1) {
					t += `stacked `;
				} else if (girls === -1) {
					t += `trim `;
				}
				t += `girls in the ${building} match most customers' preferences for `;
				if (pref === 1) {
					t += `stacked `;
				} else if (pref === -1) {
					t += `slim `;
				}
				t += `girls. `;
				t += reputation(building, 1, preview);
			} else {
				t += `Some customers were put off since the `;
				if (girls === 1) {
					t += `stacked `;
				} else if (girls === -1) {
					t += `trim `;
				}
				t += `girls there did not match their preferences for `;
				if (pref === 1) {
					t += `large `;
				} else if (pref === -1) {
					t += `slim `;
				}
				t += `girls. `;
				t += reputation(building, -1, preview);
			}
		}
		return t;
	}

	function preg(building, preview) {
		let t = ``;
		const pref = App.Ads.Categories.preg.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.preg);
		if (V.debugMode === 1) { t += `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.preg}`; }
		if (V.seePreg === 1) {
			// Ads
			if (adCampaign.spending > 0) {
				t += `<div>`;
				if (adCampaign.preg === 1) {
					t += `Its advertisements feature girls that are clearly pregnant. `;
				} else if (adCampaign.preg === -1) {
					t += `Its advertisements feature girls that have flat, usually firm, bellies. `;
				} else {
					t += `Its advertisements feature some girls that are pregnant. `;
				}
				t += `</div>`;
			}

			// Preferences
			if (pref === 1) {
				t += `Most customers prefer their girls rounded with child. `;
			} else if (pref === -1) {
				t += `Most customers prefer girls that aren't gravid. `;
			} else {
				let variety = adMgr.varietyBonus(App.Ads.Categories.preg);
				if (variety === 1) {
					payVarietyBonus();
					t += `The ${building} offers a `;
					if (building === "brothel") {
						t+= `<span class="yellowgreen">`;
					} else if (building === "club") {
						t+= `<span class="green">`;
					}
					t += `wide</span> selection of slaves with a variety of middles. `;
				}
				t += `Most customers don't have preferences for either big-bellied or flat-bellied girls. `;
			}

			// Girls
			if (girls === -1) {
				t += `Most of the slaves in the ${building} sport flat bellies. `;
			} else if (girls === 1) {
				t += `Most of the slaves in the ${building} sport gravid middles. `;
			} else {
				t += `The slaves in the ${building} vary in belly type. `;
			}

			// Results
			if (pref === 0) { /* customers don't care*/
			} else if (adCampaign.spending > 0) {
				if ((adCampaign.preg === pref) && (girls === adCampaign.preg)) {
					payAdBonus();
					t += `Its advertising for `;
					if (adCampaign.preg === 1) {
						t += `pregnant `;
					} else if (adCampaign.preg === -1) {
						t += `flat-bellied `;
					}
					t += `girls matched most customers' preferences and the girls in the ${building} matched its advertisements. `;
					t += reputation(building, 1, preview);
				} else if ((adCampaign.preg === pref) && (girls !== adCampaign.preg)) {
					t += `Its advertising for `;
					if (adCampaign.preg === 1) {
						t += `pregnant `;
					} else if (adCampaign.preg === -1) {
						t += `flat-bellied `;
					}
					t += `girls matched most customers' preferences, but the girls in the ${building} did not. `;
					t += reputation(building, -1, preview);
				} else if ((girls === pref) && (girls !== adCampaign.preg)) {
					t += `The `;
					if (girls === 1) {
						t += `pregnant `;
					} else if (girls === -1) {
						t += `flat-bellied `;
					}
					t += `girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for `;
					if (pref === 1) {
						t += `fecund `;
					} else if (pref === -1) {
						t += `flat-bellied `;
					}
					t += `girls, `;
					t += reputation(building, 0, preview);
				} else if (girls !== pref) {
					t += `Some customers were put off since the `;
					if (girls === 1) {
						t += `pregnant `;
					} else if (girls === -1) {
						t += `flat-bellied `;
					}
					t += `girls there did not match their preferences for `;
					if (pref === 1) {
						t += `fecund `;
					} else if (pref === -1) {
						t += `flat-bellied `;
					}
					t += `girls. `;
					t += reputation(building, -1, preview);
				}
			} else {
				if (girls === pref) {
					t += `The `;
					if (girls === 1) {
						t += `pregnant `;
					} else if (girls === -1) {
						t += `flat-bellied `;
					}
					t += `girls in the ${building} match most customers' preferences for `;
					if (pref === 1) {
						t += `fecund `;
					} else if (pref === -1) {
						t += `	flat-bellied `;
					}
					t += `girls. `;
					t += reputation(building, 1, preview);
				} else {
					t += `Some customers were put off since the `;
					if (girls === 1) {
						t += `pregnant `;
					} else if (girls === -1) {
						t += `flat-bellied `;
					}
					t += `girls there did not match their preferences for `;
					if (pref === 1) {
						t += `fecund `;
					} else if (pref === -1) {
						t += `flat-bellied `;
					}
					t += `girls. `;
					t += reputation(building, -1, preview);
				}
			}
		}
		return t;
	}

	function modded(building, preview) {
		let t = ``;
		const pref = App.Ads.Categories.mods.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.mods);
		if (V.debugMode === 1) { t += `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.modded}`; }

		// Ads
		if (adCampaign.spending > 0) {
			t += `<div>`;
			if (adCampaign.modded === 1) {
				t += `Its advertisements feature girls that are heavily pierced and tattooed. `;
			} else if (adCampaign.modded === -1) {
				t += `Its advertisements feature girls that are free from piercings and tattoos. `;
			} else {
				t += `Its advertisements feature some girls that are tattooed and pierced, and some that aren't. `;
			}
			t += `</div>`;
		}

		// Preferences
		if (pref === 1) {
			t += `Most customers prefer heavily modified girls. `;
		} else if (pref === -1) {
			t += `Most customers prefer natural girls. `;
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.mods);
			if (variety === 1) {
				payVarietyBonus();
				t += `The ${building} offers `;
				if (building === "brothel") {
					t+= `<span class="yellowgreen">`;
				} else if (building === "club") {
					t+= `<span class="green">`;
				}
				t += `both</span> a selection of heavily altered slaves and those with more natural bodies. `;
			}
			t += `Most customers don't have preferences for either modded or natural slaves. `;
		}

		// Girls
		if (girls === 1) {
			t += `Most of the slaves in the ${building} are heavily pierced and tattooed. `;
		} else if (girls === -1) {
			t += `Most of the slaves in the ${building} have natural, unmodded bodies. `;
		} else {
			t += `Some girls in the ${building} have piercings or tattoos, some have none and others have both. `;
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.modded === pref) && (girls === adCampaign.modded)) {
				payAdBonus();
				t += `Its advertising for `;
				if (adCampaign.modded === 1) {
					t += `heavily modified `;
				} else if (adCampaign.modded === -1) {
					t += `natural bodied `;
				}
				t += `girls matched most customers' preferences and the girls in the ${building} matched its advertisements. `;
				t += reputation(building, 1, preview);
			} else if ((adCampaign.modded === pref) && (girls !== adCampaign.modded)) {
				t += `Its advertising for `;
				if (adCampaign.modded === 1) {
					t += `heavily modified ;`;
				} else if (adCampaign.modded === -1) {
					t += `natural bodied `;
				}
				t += `girls matched most customers preferences, but the girls in the ${building} did not. `;
				t += reputation(building, -1, preview);
			} else if ((girls === pref) && (girls !== adCampaign.modded)) {
				t += `The `;
				if (girls === 1) {
					t += `heavily modified `;
				} else if (girls === -1) {
					t += `natural bodied `;
				}
				t += `girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for `;
				if (pref === 1) {
					t += `heavily modded `;
				} else if (pref === -1) {
					t += `natural bodied `;
				}
				t += `girls, `;
				t += reputation(building, 0, preview);
			} else if (girls !== pref) {
				t += `Some customers were put off since the `;
				if (girls === 1) {
					t += `heavily modified `;
				} else if (girls === -1) {
					t += `natural bodied `;
				}
				t += `girls there did not match their preferences for `;
				if (pref === 1) {
					t += `heavily modded `;
				} else if (pref === -1) {
					t += `natural bodied `;
				}
				t += `girls. `;
				t += reputation(building, -1, preview);
			}
		} else {
			if (girls === pref) {
				t += `The `;
				if (girls === 1) {
					t += `heavily modified `;
				} else if (girls === -1) {
					t += `natural bodied `;
				}
				t += `girls in the ${building} match most customers' preferences for `;
				if (pref === 1) {
					t += `heavily modded `;
				} else if (pref === -1) {
					t += `natural unmodded `;
				}
				t += `girls. `;
				t += reputation(building, 1, preview);
			} else {
				t += `Some customers were put off since the `;
				if (girls === 1) {
					t += `heavily modified `;
				} else if (girls === -1) {
					t += `natural bodied `;
				}
				t += `girls there did not match their preferences for `;
				if (pref === 1) {
					t += `heavily modded `;
				} else if (pref === -1) {
					t += `natural bodied `;
				}
				t += `girls. `;
				t += reputation(building, -1, preview);
			}
		}
		return t;
	}

	function implanted(building, preview) {
		let t = ``;
		const pref = App.Ads.Categories.assetOrigin.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.assetOrigin);
		if (V.debugMode === 1) { t += `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.implanted}`; }

		// Ads
		if (adCampaign.spending > 0) {
			t += `<div>`;
			if (adCampaign.implanted === 1) {
				t += `Its advertisements feature girls that are augmented by implants or improved surgically. `;
			} else if (adCampaign.implanted === -1) {
				t += `Its advertisements feature girls that have all natural bodies. `;
			} else {
				t += `Its advertisements feature some girls that are surgically improved and implanted and some that are all-natural. `;
			}
			t += `</div>`;
		}

		// Preferences
		if (pref === 1) {
			t += `Most customers prefer heavily implanted and surgically enhanced girls. `;
		} else if (pref === -1) {
			t += `Most customers prefer all-natural girls. `;
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.assetOrigin);
			if (variety === 1) {
				payVarietyBonus();
				t += `The ${building} offers `;
				if (building === "brothel") {
					t+= `<span class="yellowgreen">`;
				} else if (building === "club") {
					t+= `<span class="green">`;
				}
				t+= `both</span> all-natural girls, and slaves whose beauty has been improved by surgical means. `;
			}
			t += `Most customers don't have preferences for either all-natural or surgically enhanced and implanted girls. `;
		}

		// Girls
		if (girls === 1) {
			t += `Most of the slaves in the ${building} are heavily implanted or surgically enhanced. `;
		} else if (girls === -1) {
			t += `Most of the slaves in the ${building} have naturally pure bodies. `;
		} else {
			t += `The slaves in the ${building} vary in body modification. `;
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.implanted === pref) && (girls === adCampaign.implanted)) {
				payAdBonus();
				t += `Its advertising for `;
				if (adCampaign.implanted === 1) {
					t += `implanted or surgically improved `;
				} else if (adCampaign.implanted === -1) {
					t += `naturally pure `;
				}
				t += `girls matched most customers' preferences and the girls in the ${building} matched its advertisements. `;
				t += reputation(building, 1, preview);
			} else if ((adCampaign.implanted === pref) && (girls !== adCampaign.implanted)) {
				t += `Its advertising for `;
				if (adCampaign.implanted === 1) {
					t += `implanted or surgically improved `;
				} else if (adCampaign.implanted === -1) {
					t += `naturally pure `;
				}
				t += `girls matched most customers preferences, but the girls in the ${building} did not. `;
				t += reputation(building, -1, preview);
			} else if ((girls === pref) && (girls !== adCampaign.implanted)) {
				t += `The `;
				if (girls === 1) {
					t += `implanted or surgically improved `;
				} else if (girls === -1) {
					t += `naturally pure `;
				}
				t += `girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for `;
				if (pref === 1) {
					t += `implanted or surgically improved `;
				} else if (pref === -1) {
					t += `naturally pure `;
				}
				t += `girls, `;
				t += reputation(building, 0, preview);
			} else if (girls !== pref) {
				t += `Some customers were put off since the `;
				if (girls === 1) {
					t += `implanted or surgically improved `;
				} else if (girls === -1) {
					t += `naturally pure `;
				}
				t += `girls there did not match their preferences for `;
				if (pref === 1) {
					t += `implanted or surgically improved `;
				} else if (pref === -1) {
					t += `naturally pure `;
				}
				t += `girls. `;
				t += reputation(building, -1, preview);
			}
		} else {
			if (girls === pref) {
				t += `The `;
				if (girls === 1) {
					t += `implanted or surgically improved `;
				} else if (girls === -1) {
					t += `naturally pure `;
				}
				t += `girls in the ${building} match most customers' preferences for `;
				if (pref === 1) {
					t += `implanted or surgically improved `;
				} else if (pref === -1) {
					t += `natural unmodded `;
				}
				t += `girls. `;
				t += reputation(building, 1, preview);
			} else {
				t += `Some customers were put off since the `;
				if (girls === 1) {
					t += `implanted or surgically improved `;
				} else if (girls === -1) {
					t += `naturally pure `;
				}
				t += `girls there did not match their preferences for `;
				if (pref === 1) {
					t += `implanted or surgically improved `;
				} else if (pref === -1) {
					t += `naturally pure `;
				}
				t += `girls. `;
				t += reputation(building, -1, preview);
			}
		}
		return t;
	}

	function XX(building, preview) {
		let t = ``;
		const pref = App.Ads.Categories.genitalia.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.genitalia);
		if (V.debugMode === 1) { t += `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.XX}`; }
		if (V.seeDicks !== 0) {
			// Ads
			if (adCampaign.spending > 0) {
				t += `<div>`;
				if (adCampaign.XX === 1) {
					t += `Its advertisements feature girls with female genitalia. `;
				} else if (adCampaign.XX === -1) {
					t += `Its advertisements feature girls with male genitalia. `;
				} else {
					t += `Its advertisements feature a variety of girls with both male and female genitalia. `;
				}
				t += `</div>`;
			}

			// Preferences
			if (pref === 1) {
				t += `Most customers prefer girls with pussies. `;
			} else if (pref === -1) {
				t += `Most customers prefer girls with dicks. `;
			} else {
				let variety = adMgr.varietyBonus(App.Ads.Categories.genitalia);
				if (variety === 1) {
					payVarietyBonus();
					t += `The ${building} offers a `;
					if (building === "brothel") {
						t+= `<span class="yellowgreen">`;
					} else if (building === "club") {
						t+= `<span class="green">`;
					}
					t += `mix</span> of `;
					if (building === "brothel") {
						t += `whores `;
					 } else {
						t += `sluts `;
					 }
					t+= `that can appeal to varied tastes in genitalia. `;
				}
				t += `Most customers don't have preferences for either girls with dicks or girls with pussies. `;
			}

			// Girls
			if (girls === 1) {
				t += `Most of the slaves in the ${building} have female genitalia. `;
			} else if (girls === -1) {
				t += `Most of the slaves in the ${building} have male genitalia. `;
			} else {
				t += `The slaves in the ${building} vary in genitalia. `;
			}

			// Results
			if (pref === 0) { /* customers don't care*/
			} else if (adCampaign.spending > 0) {
				if ((adCampaign.XX === pref) && (girls === adCampaign.XX)) {
					payAdBonus();
					t += `Its advertising for girls `;
					if (adCampaign.XX === 1) {
						t += `with pussies `;
					} else if (adCampaign.XX === -1) {
						t += `with dicks `;
					}
					t += `matches most customers' preferences as advertised. `;
					t += reputation(building, 1, preview);
				} else if ((adCampaign.XX === pref) && (girls !== adCampaign.XX)) {
					t += `Its advertising for girls `;
					if (adCampaign.XX === 1) {
						t += `with pussies `;
					} else if (adCampaign.XX === -1) {
						t += `with dicks `;
					}
					t += `matched most customers preferences, but the girls in the ${building} are not as advertised. `;
					t += reputation(building, -1, preview);
				} else if ((girls === pref) && (girls !== adCampaign.XX)) {
					t += `The girls `;
					if (girls === 1) {
						t += ` with pussies`;
					} else if (girls === -1) {
						t += ` with dicks`;
					}
					t += `in the ${building} did not match the advertisements, but since the girls in the ${building} matched most customers preferences for girls`;
					if (pref === 1) {
						t += ` with pussies`;
					} else if (pref === -1) {
						t += ` with dicks`;
					}
					t += `, `;
					t += reputation(building, 0, preview);
				} else if (girls !== pref) {
					t += `Some customers were put off since the girls `;
					if (girls === 1) {
						t += `with female genitalia `;
					} else if (girls === -1) {
						t += `with male genitalia `;
					}
					t += `did not match their preferences for girls`;
					if (pref === 1) {
						t += ` with pussies`;
					} else if (pref === -1) {
						t += ` with dicks`;
					}
					t += `. `;
					t += reputation(building, -1, preview);
				}
			} else {
				if (girls === pref) {
					t += `The girls in the ${building} match most customers preferences for girls `;
					if (girls === 1) {
						t += `with female genitalia `;
					} else if (girls === -1) {
						t += `with male genitalia `;
					}
					t += `. `;
					t += reputation(building, 1, preview);
				} else {
					t += `Some customers were put off since the girls `;
					if (girls === 1) {
						t += `with female genitalia `;
					} else if (girls === -1) {
						t += `with male genitalia `;
					}
					t += `did not match their preferences for girls `;
					if (pref === 1) {
						t += `with pussies`;
					} else if (pref === -1) {
						t += `with dicks`;
					}
					t += `. `;
					t += reputation(building, -1, preview);
				}
			}
		}
		return t;
	}

	function age(building, preview) {
		let t = ``;
		const pref = App.Ads.Categories.age.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.age);
		if (V.debugMode === 1) { t += `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.age}`; }

		// Ads
		if (adCampaign.spending > 0) {
			t += `<div>`;
			switch (adCampaign.age) {
				case 1:
					t += `Its advertisements feature mature slaves. `;
					break;
				case -1:
					t += `Its advertisements feature young slaves. `;
					break;
				case -2:
					t += `Its advertisements feature teenagers. `;
					break;
				case -3:
					t += `Its advertisements feature lolis. `;
					break;
				default:
					t += `Its advertisements feature slaves of a variety of ages. `;
					break;
			}
			t += `</div>`;
		}

		// Preferences
		if (pref === 1) {
			t += `Most customers prefer mature girls. `;
		} else if (pref === -1) {
			t += `Most customers prefer young girls. `;
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.age);
			if (variety === 1) {
				payVarietyBonus();
				t += `The ${building} offers girls `;
				if (building === "brothel") {
					t+= `<span class="yellowgreen">`;
				} else if (building === "club") {
					t+= `<span class="green">`;
				}
				t += `both</span> young and mature. `;
			}
			t += `Most customers don't have preferences for either mature or young girls. `;
		}

		// Girls
		if (girls === -1) {
			t += `Most of the slaves in the ${building} are young. `;
		} else if (girls === 1) {
			t += `Most of the slaves in the ${building} are mature. `;
		} else {
			t += `The slaves in the ${building} vary in age. `;
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.age === pref) && (girls === adCampaign.age)) {
				payAdBonus();
				t += `Its advertising matches most customers' age preferences and the girls in the ${building} match the ages as advertised. `;
				t += reputation(building, 1, preview);
			} else if ((adCampaign.age === pref) && (girls !== adCampaign.age)) {
				t += `Its advertising matched most customers age preferences, but the girls in the ${building} are not as advertised. `;
				t += reputation(building, -1, preview);
			} else if ((girls === pref) && (girls !== adCampaign.age)) {
				t += `The ages of girls in the ${building} did not match the ages as advertised, but since the girls in the ${building} matched most customers age preferences, `;
				t += reputation(building, 0, preview);
			} else if (girls !== pref) {
				t += `Some customers were put off since the ages of girls there did not match their preferences. `;
				t += reputation(building, -1, preview);
			}
		} else {
			if (girls === pref) {
				t += `The girls in the ${building} match most customers' age preferences. `;
				t += reputation(building, 1, preview);
			} else {
				t += `Some customers were put off since the ages of girls there did not match their preferences. `;
				t += reputation(building, -1, preview);
			}
		}
		return t;
	}

	function final(building, preview) {
		let t = ``;
		if (adMgr.overallVarietyBonus()) {
			if (!preview) {
				if (building === "brothel") {
					const adsIncome = DL*random(40, 60);
					V.facility[building].adsIncome += adsIncome;
					cashX(adsIncome, (building + "Ads"));
				} else if (building === "club") {
					repX(DL*random(10, 15), (building + "Ads"));
				}
			}
			t += `<div>There is a `;
			if (building === "brothel") {
				t += `<span class="yellowgreen" style="font-weight:bold">perfect variety</span> of slave whores `;
			} else if (building === "club") {
				t += `<span class="green" style="font-weight:bold">perfect variety</span> of slave sluts `;
			}
			t += `working in the ${building}.</div>`;
		} else {
			if (building === "club") {
				t += `<div>${V.clubNameCaps} does not offer enough variety to satisfy all visitors.</div>`;
			}
		}
		return t;
	}

	function reputation(building, change, preview) {
		const minBonus = 50;
		const maxBonus = 150;
		if (change > 0) {
			if (preview) {
				return `<div>The current campaign would <span class="green">increase</span> your reputation.</div>`;
			} else {
				repX(random(minBonus, maxBonus), building);
				return `Your <span class="green">reputation</span> increased slightly as a result. `;
			}
		} else if (change < 0) {
			if (preview) {
				return `<div>The current campaign would <span class="red">lower</span> your reputation.</div>`;
			} else {
				repX(forceNeg(random(minBonus, maxBonus)), building);
				return `Your <span class="red">reputation</span> dropped slightly as a result. `;
			}
		} else if (change === 0) {
			if (preview) {
				return `<div>your reputation would not be affected.</div>`;
			} else {
				return `your reputation was not affected. `;
			}
		}
	}

	function links(building, category) {
		let r = ``;
		let passage = (capFirstChar(building) + " Advertisement");

		function radioLink(name, variable, value, last) {
			let r = ``;
			if (V[variable] !== value) {
				r += App.UI.passageLink(name, passage, `$${variable} = ${value}`);
			} else {
				r += name;
			}
			if (!last) {
				r += " | ";
			}
			return r;
		}

		switch (category) {
			case "stacked":
				r+= `<div>`;
				r+= radioLink("Stacked", `${building}AdsStacked`, 1, false);
				r+= radioLink("Slim", `${building}AdsStacked`, -1, false);
				r+= radioLink("Variety", `${building}AdsStacked`, 0, true);
				r+= `</div>`;
				return r;
			case "preg":
				r+= `<div>`;
				r+= radioLink("Gravid", `${building}AdsPreg`, 1, false);
				r+= radioLink("None", `${building}AdsPreg`, -1, false);
				r+= radioLink("Variety", `${building}AdsPreg`, 0, true);
				r+= `</div>`;
				return r;
			case "modded":
				r+= `<div>`;
				r+= radioLink("Modded", `${building}AdsModded`, 1, false);
				r+= radioLink("Unmodded", `${building}AdsModded`, -1, false);
				r+= radioLink("Variety", `${building}AdsModded`, 0, true);
				r+= `</div>`;
				return r;
			case "implanted":
				r+= `<div>`;
				r+= radioLink("Implants", `${building}AdsImplanted`, 1, false);
				r+= radioLink("All natural", `${building}AdsImplanted`, -1, false);
				r+= radioLink("Variety", `${building}AdsImplanted`, 0, true);
				r+= `</div>`;
				return r;
			case "XX":
				r+= `<div>`;
				r+= radioLink("Pussies", `${building}AdsXX`, 1, false);
				r+= radioLink("Dicks", `${building}AdsXX`, -1, false);
				r+= radioLink("Variety", `${building}AdsXX`, 0, true);
				r+= `</div>`;
				return r;
			case "age":
				r+= `<div>`;
				r+= radioLink("MILF", `${building}AdsOld`, 1, false);
				r+= radioLink("Young", `${building}AdsOld`, -1, false);
				if (V.minimumSlaveAge < 18) {
					r+= radioLink("Teen", `${building}AdsOld`, -2, false);
				}
				if (V.minimumSlaveAge < 13) {
					r+= radioLink("Loli", `${building}AdsOld`, -3, false);
				}
				r+= radioLink("Variety", `${building}AdsOld`, 0, true);
				r+= `</div>`;
				return r;
			default:
				console.log("You done fucked up.  Building: " + building + " Category: " + category);
		}
	}
};
