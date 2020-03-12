/* intended to condense the clothing/toy/etc availability checks into something less asinine */

/**
 * Checks whether item is accessible
 * @param {string} string Name of wearable item
 * @returns {boolean}
 */
window.isItemAccessible = function(string) {
	if (V.cheatMode === 1) {
		return true;
	}
	switch (string) {
		/* no breaks needed because we always return */
		case "attractive lingerie for a pregnant woman":
			return (V.arcologies[0].FSRepopulationFocus > 0 || V.clothesBoughtMaternityLingerie === 1);
		case "a bunny outfit":
			return (V.arcologies[0].FSGenderFundamentalist > 0 || V.clothesBoughtBunny === 1);
		case "body oil":
			return (V.arcologies[0].FSPhysicalIdealist > 0 || V.clothesBoughtOil === 1);
		case "chains":
			return (V.arcologies[0].FSDegradationist > 0 || V.clothesBoughtChains === 1);
		case "a chattel habit":
			return (V.arcologies[0].FSChattelReligionist > 0 || V.clothesBoughtHabit === 1);
		case "conservative clothing":
			return (V.arcologies[0].FSPaternalist > 0 || V.clothesBoughtConservative === 1);
		case "harem gauze":
			return (V.arcologies[0].FSArabianRevivalist > 0 || V.clothesBoughtHarem === 1);
		case "a huipil":
			return (V.arcologies[0].FSAztecRevivalist > 0 || V.clothesBoughtHuipil === 1);
		case "a kimono":
			return (V.arcologies[0].FSEdoRevivalist > 0 || V.clothesBoughtKimono === 1 || V.continent === "Japan");
		case "a maternity dress":
			return (V.arcologies[0].FSRepopulationFocus > 0 || V.clothesBoughtMaternityDress === 1);
		case "a slutty qipao":
			return (V.arcologies[0].FSChineseRevivalist > 0 || V.clothesBoughtQipao === 1);
		case "a long qipao":
			return (V.arcologies[0].FSChineseRevivalist > 0 || V.clothesBoughtCultural === 1);
		case "stretch pants and a crop-top":
			return (V.arcologies[0].FSHedonisticDecadence > 0 || V.clothesBoughtLazyClothes === 1);
		case "a toga":
			return (V.arcologies[0].FSRomanRevivalist > 0 || V.clothesBoughtToga === 1);
		case "Western clothing":
			return (V.arcologies[0].FSPastoralist > 0 || V.clothesBoughtWestern === 1);
		case "a courtesan dress":
			return (V.arcologies[0].FSSlaveProfessionalism > 0 || V.clothesBoughtCourtesan === 1);
		case "a bimbo outfit":
			return (V.arcologies[0].FSIntellectualDependency > 0 || V.clothesBoughtBimbo === 1);
		case "petite admi outfit":
			return (V.arcologies[0].FSPetiteAdmiration > 0 || V.clothesBoughtPetite === 1);
		case "battlearmor":
		case "a military uniform":
		case "a red army uniform":
		case "battledress":
			return (V.clothesBoughtMilitary === 1);
		case "a biyelgee costume":
		case "a dirndl":
		case "lederhosen":
		case "a mounty outfit":
		case "a hanbok":
			return (V.clothesBoughtCultural === 1);
		case "a burqa":
		case "a niqab and abaya":
			return (V.clothesBoughtMiddleEastern === 1 || V.continent === "the Middle East");
		case "a hijab and blouse":
			return (V.clothesBoughtMiddleEastern === 1 || V.clothesBoughtConservative === 1 || V.continent === "the Middle East");
		case "a burkini":
			return (V.clothesBoughtMiddleEastern === 1 && V.clothesBoughtSwimwear === 1 || V.continent === "the Middle East");
		case "a Santa dress":
			return (V.clothesBoughtCostume === 1);
		case "a klan robe":
		case "a slutty klan robe":
		case "a schutzstaffel uniform":
		case "a slutty schutzstaffel uniform":
			return (V.clothesBoughtPol === 1);
		case "nice business attire":
		case "a nice nurse outfit":
		case "a police uniform":
			return (V.clothesBoughtCareer === 1);
		case "a nice maid outfit":
			return (V.clothesBoughtCareer === 1 || V.PC.career === "servant");
		case "a ball gown":
		case "a gothic lolita dress":
			return (V.clothesBoughtDresses === 1);
		case "a cybersuit":
		case "a latex catsuit":
			return (V.clothesBoughtBodysuits === 1);
		case "a button-up shirt and panties":
		case "a button-up shirt":
		case "cutoffs":
		case "jeans":
		case "leather pants and a tube top":
		case "leather pants":
		case "an oversized t-shirt":
		case "a sweater and cutoffs":
		case "a sweater and panties":
		case "a sweater":
		case "a t-shirt and jeans":
		case "a t-shirt and panties":
		case "a t-shirt":
		case "a tank-top and panties":
		case "a tank-top":
		case "a tube top":
			return (V.clothesBoughtCasual === 1);
		case "boyshorts":
		case "a bra":
		case "kitty lingerie":
		case "panties and pasties":
		case "a skimpy loincloth":
		case "a thong":
		case "pasties":
			return (V.clothesBoughtUnderwear === 1);
		case "leather pants and pasties":
		case "a t-shirt and thong":
		case "a tube top and thong":
		case "an oversized t-shirt and boyshorts":
			return (V.clothesBoughtUnderwear === 1 && V.clothesBoughtCasual === 1);
		case "sport shorts and a sports bra":
		case "sport shorts":
		case "a sports bra":
			return (V.clothesBoughtSports === 1);
		case "sport shorts and a t-shirt":
			return (V.clothesBoughtSports === 1 && V.clothesBoughtCasual === 1);
		case "a nice pony outfit":
		case "a slutty pony outfit":
			return (V.clothesBoughtPony === 1);
		case "a monokini":
		case "a one-piece swimsuit":
			return (V.clothesBoughtSwimwear === 1);
		case "a striped bra":
		case "striped panties":
		case "striped underwear":
			return (V.clothesBoughtPantsu === 1 || V.continent === "Japan");
		case "platform shoes":
		case "platform heels":
		case "extreme platform heels":
			return (V.arcologies[0].FSStatuesqueGlorification > 0 || V.shoesBoughtHeels === 1);
		case "bowtie":
			return (V.arcologies[0].FSGenderFundamentalist > 0 || V.clothesBoughtBunny === 1);
		case "ancient Egyptian":
			return (V.arcologies[0].FSEgyptianRevivalist > 0 || V.clothesBoughtEgypt === 1);
		case "massive dildo gag":
			return (V.toysBoughtGags === 1);
		case "a small empathy belly":
		case "a medium empathy belly":
		case "a large empathy belly":
		case "a huge empathy belly":
			return (V.arcologies[0].FSRepopulationFocus > 0 || V.clothesBoughtBelly === 1);
		case "bullet vibrator":
		case "smart bullet vibrator":
		case "long dildo":
		case "long, large dildo":
		case "long, huge dildo":
			return (V.toysBoughtDildos === 1);
		case "vibrator":
			return (V.toysBoughtVaginalAttachments === 1);
		case "long plug":
		case "long, large plug":
		case "long, huge plug":
			return (V.toysBoughtButtPlugs === 1);
		case "tail":
		case "cow tail":
		case "cat tail":
		case "fox tail":
			return (V.toysBoughtButtPlugTails === 1);
			// "Normal" things:
		case "an apron":
		case "slutty jewelry":
		case "clubslut netting":
		case "cutoffs and a t-shirt":
		case "a comfortable bodysuit":
		case "a cheerleader outfit":
		case "a fallen nuns habit":
		case "a hijab and abaya":
		case "a leotard":
		case "a slutty maid outfit":
		case "a mini dress":
		case "attractive lingerie":
		case "a slutty nurse outfit":
		case "overalls":
		case "panties":
		case "a scalemail bikini":
		case "a schoolgirl outfit":
		case "a slutty outfit":
		case "spats and a tank top":
		case "a string bikini":
		case "a succubus outfit":
		case "slutty business attire":
		case "no clothing":
		case "a penitent nuns habit":
		case "restrictive latex":
		case "shibari ropes":
		case "uncomfortable straps":
		case "choosing her own clothes":
		case "a halter top dress":
		case "a slave gown":
			return true;
		default:
			console.log(`${string} not found`);
			return true;
	}
};

window.isClothingAccessible = (function() {
	return {
		array: array,
		entry: entry,
	};

	/**
	 * Checks whether clothing is accessible
	 * @param {string} string Name of wearable item
	 * @param {string} category that item is in clothing, collar, etc
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean|string} Returns true if item is accessible, and false if it is not.  If the slave param is set, it may sometimes return a string instead of false, explaining why the item can't be used with that slave.
	 */
	function entry(string, category = "clothing", slave) {
		if (V.cheatMode === 1) {
			return true;
		}
		let niceDB = [];
		let harshDB = [];
		switch (category) {
			case "clothing":
			case "clothes":
				niceDB = App.Data.misc.niceClothes;
				harshDB = App.Data.misc.harshClothes;
				break;
			case "collar":
				niceDB = App.Data.misc.niceCollars;
				harshDB = App.Data.misc.harshCollars;
				break;
			case "bellyAccessory":
				niceDB = App.Data.misc.bellyAccessories;
				break;
			case "buttplug":
				niceDB = App.Data.misc.buttplugs;
				break;
			case "buttplugAttachment":
				niceDB = App.Data.misc.buttplugAttachments;
				break;
			case "vaginalAccessory":
				niceDB = App.Data.misc.vaginalAccessories;
				break;
			case "vaginalAttachment":
				niceDB = App.Data.misc.vaginalAttachments;
				break;
			case "dickAccessory":
				niceDB = App.Data.misc.vaginalAccessories;
				break;
			case "shoes":
				niceDB = App.Data.misc.shoes;
				break;
			case "chastity":
				niceDB = App.Data.misc.chastityDevices;
				break;
			default:
				console.log(`made a category for ${category} automatically, may need to define this by hand`);
				niceDB = App.Data.misc[category];
				break;
		}
		let item = niceDB.find((i) => i.value === string);
		if (!item && (typeof harshDB !== 'undefined')) {
			item = harshDB.find((i) => i.value === string);
		}
		if (!item) {
			console.log(`${string} is not a registered piece of clothing! Check App.Data.misc.${category}`);
			return false; /* couldn't be found */
		}
		return isAvailable(item, category, slave);
	}
	/**
	 * Returns array of wearable clothing in format [name, value], basically player facing / game data.
	 * @param {string} db Name of array to look in (such as "App.Data.misc.niceClothes")
	 * @returns {Array}
	 */
	function array(db) {
		const array = [];
		db.forEach((i) => {
			if (V.cheatMode || isAvailable(i)) {
				let name = i.name;
				if (i.fs) {
					name = i.name + ` (FS)`;
				}
				array.push([name, i.value]);
			}
		});
		return array;
	}

	function isAvailable(item, category, slave) {
		if (slave) {
			let slaveResults = isAvailableForSlave(item, category, slave);
			if (slaveResults !== true) { // If they are true we pass this check but want to run the others.
				return slaveResults;
			}
		}
		if (!(item.hasOwnProperty("fs")) && !(item.hasOwnProperty("rs"))) {
			// No restriction, this clothing item is available to everyone
			return true;
		}
		if (item.hasOwnProperty("rs")) {
			if (typeof item.rs === 'object' && item.rs !== null) {
				let fail = false;
				// Scan rs requirments one by one if they are an object
				Object.keys(item.rs).forEach((requirement) => {
					if (typeof item.rs[requirement] === 'object' && item.rs[requirement] !== null) {
						let eitherCheck = 0;
						if (requirement === "either") { // If we find the "either" nested object, we need to see if just one of the conditions in it are true.
							Object.keys(item.rs.either).forEach((nestedRequirement) => {
								if (typeof item.rs.either[nestedRequirement] === 'object' && item.rs.either[nestedRequirement] !== null) { // And yes sometimes even in either we have a nested object, to check V.PC mostly, so check for it.
									let insideEitherCheck = 0;
									Object.keys(item.rs.either[nestedRequirement]).forEach((insideNestedRequirement) => {
										if (V[nestedRequirement][insideNestedRequirement] === item.rs.either[nestedRequirement][insideNestedRequirement]) {
											insideEitherCheck++;
										}
									});
									if (insideEitherCheck > 0) {
										eitherCheck++;
									}
									if (V[nestedRequirement] === item.rs.either[nestedRequirement]) {
										eitherCheck++;
									}
								} else {
									if (item.rs.either[nestedRequirement] === V[nestedRequirement]) {
										eitherCheck++;
									}
								}
							});
						} else {
							Object.keys(item.rs.either).forEach((nestedRequirement) => { // Otherwise we are probably recording a nested V variable to be checked.
								if (V[requirement][nestedRequirement] === item.rs[requirement][nestedRequirement]) {
									eitherCheck++;
								}
							});
						}
						if (eitherCheck === 0) {
							fail = true;
						}
					} else {
						if (V[requirement] !== item.rs[requirement]) {
							fail = true;
						}
					}
				});
				if (fail) {
					return false;
				} else {
					return true;
				}
			} else { // string
				if (V[item.rs] < 1) {
					return false;
				} else {
					return true;
				}
			}
		}
		if (item.hasOwnProperty("fs")) {
			if (!(V.arcologies[0][item.fs] > 0)) {
				return false;
			}
		}
		return true;
	}

	function isAvailableForSlave(item, category, slave) {
		switch (category) {
			case "clothing":
			case "clothes":
				break;
			case "collar":
				break;
			case "bellyAccessory": {
				switch (item.value) {
					case "a support band": {
						if (slave.belly > 10000) {
							return true;
						} else {
							return `Slave belly too small for this`;
						}
					}
					case "a small empathy belly":
					case "a medium empathy belly":
					case "a large empathy belly":
					case "a huge empathy belly": {
						if (slave.belly < 1500 && slave.weight < 130) {
							return true;
						} else {
							return `Slave belly too big for this`;
						}
					}
					default:
						return true;
				}
			}
			case "buttplug": {
				switch (item.value) {
					case "huge plug": {
						if (slave.anus < 2) {
							return `Slave's anus is too small for this right now`;
						} else {
							return true;
						}
					}
					case "long plug":
					case "long, large plug": {
						if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					case "long, huge plug": {
						if (slave.anus < 2) {
							return `Slave's anus is too small for this right now`;
						} else if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					default:
						return true;
				}
			}
			case "buttplugAttachment":
				break;
			case "vaginalAccessory": {
				if (slave.vagina < 0) {
					return false;
				}
				switch (item.value) {
					case "huge dildo": {
						if (slave.vagina < 2) {
							return `Slave's vagina is too small for this right now`;
						} else {
							return true;
						}
					}
					case "long dildo":
					case "long, large dildo": {
						if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					case "long, huge dildo": {
						if (slave.vagina < 2) {
							return `Slave's vagina is too small for this right now`;
						} else if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					default:
						return true;
				}
			}
			case "vaginalAttachment": {
				if (slave.vagina < 0) {
					return false;
				}
				switch (item.value) {
					case "vibrator":
						if (slave.vaginalAccessory === "none") {
							return "No vaginal accessory to attach it to";
						} else if (slave.vaginalAccessory === "bullet vibrator" || slave.vaginalAccessory === "smart bullet vibrator") {
							return "Vaginal accessory already vibrates";
						} else {
							return true;
						}
				}
				break;
			}
			case "dickAccessory":
				if (slave.dick < 1) {
					return false;
				}
				return true;
			case "shoes":
				break;
			case "chastity": {
				switch (item.value) {
					case "chastity belt":
					case "combined chastity belt": {
						if (slave.vagina > -1) {
							return true;
						} else {
							return false;
						}
					}
					case "chastity cage":
					case "combined chastity cage": {
						if (slave.dick > 0) {
							return true;
						} else {
							return false;
						}
					}
					case "genital chastity":
					case "full chastity": {
						if (slave.vagina > -1 && slave.dick > 0) {
							return true;
						} else {
							return false;
						}
					}
					case "choose own chastity": {
						if (slave.choosesOwnChastity !== 1 && slave.devotion > 20 && slave.trust > 0) {
							if (slave.choosesOwnClothes === 1) {
								return "Slave is not choosing own clothing";
							} else {
								return true;
							}
						}
						return false;
					}
					case "revoke choosing own chastity": {
						if (slave.choosesOwnChastity > 0 && slave.devotion > 20 && slave.trust > 0) {
							if (slave.choosesOwnClothes === 1) {
								return "Slave is not choosing own clothing";
							} else {
								return true;
							}
						}
						return false;
					}
					default:
						return true;
				}
			}
			default:
				break;
		}
		return true;
	}
})();

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} prosthetic
 * @returns {boolean}
 */
window.isProstheticAvailable = function(slave, prosthetic) {
	return slave.readyProsthetics.findIndex(function(p) { return p.id === prosthetic; }) !== -1;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} prosthetic
 */
window.addProsthetic = function(slave, prosthetic) {
	if (!isProstheticAvailable(slave, prosthetic)) {
		let limb = prostheticToLimb(prosthetic);
		if (limb > 0) {
			let p = {
				id: prosthetic,
				arm: {left: new App.Entity.LimbState(), right: new App.Entity.LimbState()},
				leg: {left: new App.Entity.LimbState(), right: new App.Entity.LimbState()}
			};
			p.arm.left.type = limb;
			p.arm.right.type = limb;
			p.leg.left.type = limb;
			p.leg.right.type = limb;
			slave.readyProsthetics.push(p);
		} else {
			slave.readyProsthetics.push({id: prosthetic});
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} prosthetic
 * @returns {{}}
 */
window.findProsthetic = function(slave, prosthetic) {
	return slave.readyProsthetics.find(p => p.id === prosthetic);
};

/**
 * @param {string} prosthetic
 * @returns {number}
 */
window.prostheticToLimb = function(prosthetic) {
	switch (prosthetic) {
		case "basicL":
			return 2;
		case "sexL":
			return 3;
		case "beautyL":
			return 4;
		case "combatL":
			return 5;
		case "cyberneticL":
			return 6;
		default:
			return 0;
	}
};

/**
 *
 * @param {number} limb
 * @returns {string}
 */
window.limbToProsthetic = function(limb) {
	switch (limb) {
		case 2:
			return "basicL";
		case 3:
			return "sexL";
		case 4:
			return "beautyL";
		case 5:
			return "combatL";
		case 6:
			return "cyberneticL";
		default:
			return "";
	}
};
