App.Medicine.Surgery = {};
/**
 * Composes the Procedure object from its parts
 *
 * This function has the only purpose to ensure the result object has all required properties
 * @param {string} typeId
 * @param {string} label
 * @param {number} effect
 * @param {string} desc
 * @param {slaveOperation} [action]
 * @param {number} [costs] money costs
 * @param {number} [hCosts] health costs
 * @param {string} [surgeryType]
 * @returns {App.Medicine.Surgery.Procedure}
 */
App.Medicine.Surgery.makeOption = function(typeId, label, effect, desc, action, costs, hCosts, surgeryType) {
	return {
		typeId: typeId,
		label: label,
		targetEffect: effect,
		description: desc,
		costs: costs,
		healthCosts: hCosts,
		action: action,
		surgeryType: surgeryType
	};
};

/**
 * Composes the procedure option with empty .action, i.e. a procedure that can't be applied
 * @param {string} typeId
 * @param {string} label
 * @param {string} desc
 * @returns {App.Medicine.Surgery.Procedure}
 */
App.Medicine.Surgery.makeImpossibleOption = function(typeId, label, desc) {
	return this.makeOption(typeId, label, 0, desc);
};

/**
 * Various constants for procedures
 */
App.Medicine.Keys = {
	Surgery: {
		Target: {
			/**
			 * Type id's for breast-related procedures
			 */
			breast: {
				installImplant: "breast.implant.install",
				removeImplant: "breast.implant.remove",
				fillUp: "breast.implant.fill",
				drain: "breast.implant.drain",
				changeImplant: "breast.implant.replace",
				reduction: "breast.tissue.reduce",
			},
			/**
			 * Type id's for butt-related procedures
			 */
			butt: {
				installImplant: "butt.implant.install",
				removeImplant: "butt.implant.remove",
				fillUp: "butt.implant.fill",
				drain: "butt.implant.drain",
				changeImplant: "but.implant.replace",
				reduction: "butt.tissue.reduce",
			}
		}
	}
};

/**
 * Commit procedure, executing its action and subtracting its costs
 * @param {App.Medicine.Surgery.Procedure} surgery
 * @param {App.Entity.SlaveState} slave
 */
App.Medicine.Surgery.commit = function(surgery, slave) {
	V.surgeryType = surgery.surgeryType;
	surgery.action(slave);
	cashX(forceNeg(surgery.costs), "slaveSurgery", slave);
	surgeryDamage(slave, surgery.healthCosts);
};

/**
 * Returns markup for a link to execute the given procedure
 * @param {string} passage Passage to go after the surgery
 * @param {App.Medicine.Surgery.Procedure} surgery
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Medicine.Surgery.makeLink = function(passage, surgery, slave) {
	if (surgery.action === undefined) {
		return App.UI.disabledLink(surgery.label, [surgery.description]);
	}

	function healthCosts() {
		const hc = (State.variables.PC.skill.medicine >= 100) ? Math.round(surgery.healthCosts / 2) : surgery.healthCosts;
		if (hc > 30) {
			return 'substantial';
		} else if (hc > 20) {
			return 'significant';
		} else if (hc > 10) {
			return 'moderate';
		} else if (hc > 5) {
			return 'light';
		}
		return 'insignificant';
	}

	return App.UI.link(surgery.label, App.Medicine.Surgery.commit, [surgery, slave], passage,
		`${capFirstChar(surgery.description)}.\nSurgery costs: ${cashFormat(surgery.costs)}.\nProjected health damage: ${healthCosts()}.`);
};

/**
 * Helpers for composing procedure descriptions
 */
App.Medicine.Surgery.ListHelpers = class {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} bodyPart
	 * @param {Object.<string, string>} keys
	 * @param {App.Utils.Pronouns} pronouns
	 * @param {boolean} showCCs
	 */
	constructor(slave, bodyPart, keys, pronouns, showCCs) {
		/** @private */
		this._slave = slave;
		/** @private */
		this._bodyPart = bodyPart;
		/** @private */
		this._keys = keys;
		/** @private */
		this._pronouns = pronouns;
		/** @private */
		this._V = State.variables;
		this._showCCs = showCCs;
	}

	/**
	 * @param {string} name
	 * @param {string} implantType
	 * @param {number} size
	 * @returns {App.Medicine.Surgery.Procedure}
	 */
	installImplants(name, implantType, size) {
		return App.Medicine.Surgery.makeOption(this._keys.installImplant, `${capFirstChar(name)} implants`, size,
			`place ${name}${this._showCCs ? ` ${size}cc` : ''} implants into ${this._pronouns.his} ${this._bodyPart}`,
			slave => {
				slave[`${this._bodyPart}Implant`] = size;
				slave[`${this._bodyPart}ImplantType`] = implantType;
				slave[this._bodyPart] += size;
			}, this._V.surgeryCost, 10, this._bodyPart
		);
	}

	removeImplants() {
		return App.Medicine.Surgery.makeOption(this._keys.removeImplant, "Remove implants",
			-this._slave[`${this._bodyPart}Implant`],
			`remove ${this._pronouns.his} ${this._bodyPart} implants`,
			slave => {
				slave[`${this._bodyPart}`] -= slave[`${this._bodyPart}Implant`];
				slave[`${this._bodyPart}Implant`] = 0;
				slave[`${this._bodyPart}ImplantType`] = "none";
			}, this._V.surgeryCost, 5, `${this._bodyPart}Loss`
		);
	}

	/**
	 * @param {string} name
	 * @param {number} implantType
	 * @param {number} size
	 * @param {number} [implantPrice=0]
	 * @returns {App.Medicine.Surgery.Procedure}
	 */
	replaceImplants(name, implantType, size, implantPrice = 0) {
		return App.Medicine.Surgery.makeOption(this._keys.changeImplant, `${capFirstChar(name)} implants`,
			size - this._slave.boobsImplant,
			`replace ${this._pronouns.his} ${this._bodyPart} implants with ${name}${this._showCCs ? ` (${size}cc)` : ''} ones`,
			slave => {
				slave[this._bodyPart] += size - slave[`${this._bodyPart}Implant`];
				slave[`${this._bodyPart}Implant`] = size;
				slave[`${this._bodyPart}ImplantType`] = implantType;
			}, this._V.surgeryCost + implantPrice, 10, this._bodyPart
		);
	}

	/**
	 * @param {number} volume
	 * @returns {App.Medicine.Surgery.Procedure}
	 */
	fillUp(volume) {
		return App.Medicine.Surgery.makeOption(this._keys.fillUp, "Add inert filler", volume,
			`add ${this._showCCs ? `${volume}cc of` : 'some'} inert filler to each of ${this._pronouns.his} ${this._bodyPart} implants`,
			slave => {
				slave[`${this._bodyPart}Implant`] += volume;
				slave[this._bodyPart] += volume;
			},
			this._V.surgeryCost, 10, this._bodyPart
		);
	}

	/**
	 * @param {number} volume
	 * @returns {App.Medicine.Surgery.Procedure}
	 */
	drain(volume) {
		return App.Medicine.Surgery.makeOption(this._keys.drain, `Drain ${volume}cc`, -volume,
			`drain ${this._showCCs ? `${volume}cc of` : 'some'} inert filler from ${this._pronouns.his} ${this._bodyPart} implants`,
			slave => {
				slave[`${this._bodyPart}Implant`] -= volume;
				slave[this._bodyPart] -= volume;
			}, this._V.surgeryCost, 5, `${this._bodyPart}Loss`
		);
	}

	/**
	 * @param {string} procedureName
	 * @param {number} sizeChange
	 * @returns {App.Medicine.Surgery.Procedure}
	 */
	reduce(procedureName, sizeChange) {
		return App.Medicine.Surgery.makeOption(this._keys.reduction,
			`${capFirstChar(procedureName)} ${this._bodyPart}`, -200,
			`${procedureName} ${this._pronouns.his} ${this._bodyPart}`,
			slave => {
				slave[this._bodyPart] -= sizeChange;
			}, this._V.surgeryCost, 5, `${this._bodyPart}Loss`
		);
	}
};

/**
 * Returns options to accept all possible surgeries
 * @returns {App.Medicine.Surgery.SizingOptions}
 */
App.Medicine.Surgery.allSizingOptions = function() {
	return {
		augmentation: true,
		reduction: true,
		strings: true,
		replace: true
	};
};

App.Medicine.Surgery.sizingProcedures = function() {
	return {
		bodyPart: bodyPart,
		boobs: boobSizingProcedures,
		butt: buttSizingProcedures
	};

	/**
	 * for implants that we potentially order abroad :)
	 * @param {App.Medicine.Surgery.Procedure} op
	 */
	function _advFillablePriceModifier(op) {
		if (V.ImplantProductionUpgrade !== 1) {
			op.costs += 10000;
			op.label += " (special order)";
			op.description += " (special order)";
		}
		return op;
	}

	/**
	 * Returns list of available surgeries targeted at changing size of the given body part
	 * @param {string} bodyPart
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Medicine.Surgery.SizingOptions} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function bodyPart(bodyPart, slave, options) {
		switch (bodyPart) {
			case "boob":
			case "boobs":
			case "breast":
			case "breasts":
				return boobSizingProcedures(slave, options);
			case "ass":
			case "booty":
			case "butt":
				return buttSizingProcedures(slave, options);
			default:
				throw `No sizing procedures for ${bodyPart}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Medicine.Surgery.SizingOptions} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function boobSizingProcedures(slave, options = {}) {
		const thisArcology = V.arcologies[0];
		const largeImplantsAvailable = thisArcology.FSTransformationFetishistResearch === 1;
		const advancedFillableImplantsAvailable = V.ImplantProductionUpgrade === 1;
		const advancedSurgeryAvailable = V.ImplantProductionUpgrade === 1;
		const pronouns = getPronouns(slave);
		const {he, His} = pronouns;

		const types = App.Medicine.Keys.Surgery.Target.breast; // shortcuts
		const helper = new App.Medicine.Surgery.ListHelpers(slave, "boobs", types, pronouns, V.showBoobCCs);

		const areStringsInstalled = slave.boobsImplantType === "string";
		const areFillablesInstalled = ["fillable", "advanced fillable", "hyper fillable"].includes(slave.boobsImplantType);
		const curSize = slave.boobsImplant;
		const implantType = slave.boobsImplantType;

		let r = [];
		if (options.augmentation) {
			if (slave.indentureRestrictions >= 2) {
				r.push(App.Medicine.Surgery.makeImpossibleOption(types.installImplant, "Change boob size", `<em>${His} indenture forbids elective surgery</em>`));
			} else if (slave.breastMesh === 1) {
				r.push(App.Medicine.Surgery.makeImpossibleOption(types.installImplant, "Put implants", `<em>${His} supportive mesh implant blocks implantation</em>`));
			} else if (curSize === 0) {
				if (options.strings) {
					r.push(helper.installImplants("string", "string", 400));
				}
				if (advancedSurgeryAvailable) {
					r.push(helper.installImplants("large", "normal", 600));
				}
				r.push(helper.installImplants("standard", "normal", 400));
				r.push(helper.installImplants("small", "normal", 200));
			} else if (implantType === "normal") {
				if (curSize > 400) {
					r.push(helper.replaceImplants("fillable", "fillable", 800));
				} else if (curSize > 200) {
					r.push(helper.replaceImplants("large", "normal", 600));
				} else {
					r.push(helper.replaceImplants("standard", "normal", 400));
					r.push(helper.replaceImplants("large", "normal", 600));
				}
			} else if (implantType === "hyper fillable") {
				if (slave.boobs >= 50000) {
					r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Increase boobs", `<em>${His} breasts are as large as ${he} can physically support</em>`));
				} else {
					r.push(helper.fillUp(1000));
				}
			} else if (implantType === "advanced fillable") {
				if (curSize >= 10000) {
					r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Increase boobs", `<em>${His} implants are filled to capacity</em>`));
					if (largeImplantsAvailable) {
						r.push(helper.replaceImplants("hyper fillable", "hyper fillable", 11000));
					}
				} else {
					r.push(helper.fillUp(400));
				}
			} else if (implantType === "fillable") {
				if (curSize >= 1800) {
					r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Add inert filler", `<em>${His} implants are filled to capacity</em>`));
					r.push(_advFillablePriceModifier(helper.replaceImplants("advanced fillable", "advanced fillable", 2200)));
				} else {
					r.push(helper.fillUp(200));
				}
			}
		}

		if (options.replace && slave.indentureRestrictions < 2 && curSize > 0) {
			if (!areStringsInstalled && curSize < 600) {
				r.push(helper.replaceImplants("string", "string", 400));
			} else if (areStringsInstalled){
				// we have engorged string implants, suggest replacing with normal implants of similar size
				if (curSize > 10000) {
					if (largeImplantsAvailable) {
						if (slave.boobs < 50000) {
							r.push(helper.replaceImplants("hyper fillable", "hyper fillable", Math.round(curSize / 1000) * 1000));
						}
					}
				} else if (curSize > 2200) {
					r.push(_advFillablePriceModifier(helper.replaceImplants("advanced fillable", "advanced fillable", Math.round(curSize / 400) * 400)));
				} else if (curSize > 400) {
					r.push(helper.replaceImplants("fillable", "fillable", Math.round(curSize / 200) * 200));
				} else {
					r.push(helper.replaceImplants("standard", "normal", 400));
				}
			}
		}

		if (options.reduction && (slave.boobs > 300 || curSize > 0)) {
			if (curSize > 0) {
				if (areStringsInstalled && curSize > 400) {
					if (curSize > 8000) {
						r.push(helper.drain(1000));
					} else if (curSize > 5000) {
						r.push(helper.drain(750));
					} else if (curSize > 2000) {
						r.push(helper.drain(500));
					} else if (curSize > 1000) {
						r.push(helper.drain(250));
					} else if (curSize > 500) {
						r.push(helper.drain(100));
					}
				} else if (areFillablesInstalled) {
					if (implantType === "hyper fillable") {
						if (curSize <= 10000) {
							r.push(App.Medicine.Surgery.makeImpossibleOption(types.drain, "Remove filler", `<em>${His} implants are empty</em>`));
						} else {
							r.push(helper.drain(1000));
						}
					} else if (implantType === "advanced fillable") {
						if (curSize <= 1000) {
							r.push(App.Medicine.Surgery.makeImpossibleOption(types.drain, "Remove filler", `<em>${His} implants are empty</em>`));
						} else {
							r.push(helper.drain(500));
						}
					} else if (implantType === "fillable") {
						if (curSize <= 500) {
							r.push(App.Medicine.Surgery.makeImpossibleOption(types.drain, "Remove filler", `<em>${His} implants are empty</em>`));
						} else {
							r.push(helper.drain(100));
						}
					}
				}
				if (slave.indentureRestrictions < 2) {
					r.push(helper.removeImplants());
				}
			}
			if ((slave.boobs > 300) && (curSize === 0) && slave.indentureRestrictions < 2) {
				r.push(helper.reduce("reduce", 200));
				if (slave.boobs < 675) {
					r.push(helper.reduce("slightly reduce", 25));
				}
			}
			if ((curSize === 0) && slave.indentureRestrictions < 2 && (slave.breedingMark !== 1 || V.propOutcome !== 1 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
				if (slave.boobs >= 7000) {
					r.push(App.Medicine.Surgery.makeOption(types.reduction, "Mastectomy", 300 - slave.boobs,
						"perform mastectomy",
						slave => {
							slave.boobs = 300;
						},
						V.surgeryCost, 30, "mastectomy+"
					));
				} else if (slave.boobs >= 2000) {
					r.push(App.Medicine.Surgery.makeOption(types.reduction, "Mastectomy", 300 - slave.boobs,
						"perform mastectomy",
						slave => {
							slave.boobs = 300;
						},
						V.surgeryCost, 30, "mastectomy"
					));
				}
			}
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Medicine.Surgery.SizingOptions} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function buttSizingProcedures(slave, options = {}) {
		const thisArcology = V.arcologies[0];
		const largeImplantsAvailable = thisArcology.FSTransformationFetishistResearch === 1;
		const advancedFillableImplantsAvailable = V.ImplantProductionUpgrade === 1;
		const advancedSurgeryAvailable = V.ImplantProductionUpgrade === 1;
		const pronouns = getPronouns(slave);
		const {he, His} = pronouns;

		const types = App.Medicine.Keys.Surgery.Target.butt; // shortcuts
		const helper = new App.Medicine.Surgery.ListHelpers(slave, "butt", types, pronouns, false);

		const areStringsInstalled = slave.buttImplantType === "string";
		const areFillablesInstalled = ["fillable", "advanced fillable", "hyper fillable"].includes(slave.buttImplantType);
		const curSize = slave.buttImplant;
		const implantType = slave.buttImplantType;

		let r = [];

		if (options.augmentation) {
			if (slave.indentureRestrictions >= 2) {
				r.push(App.Medicine.Surgery.makeImpossibleOption(types.installImplant, "Change butt size", `<em>${His} indenture forbids elective surgery</em>`));
			} else if (slave.butt > 19 && areFillablesInstalled) {
				r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Increase butt", `<em>${His} butt is as large as it can possibly get</em>`));
			} else if (curSize === 0) {
				if (options.strings) {
					r.push(helper.installImplants("string", "string", 1));
				}
				if (advancedSurgeryAvailable) {
					r.push(helper.installImplants("big", "normal", 2));
				}
				r.push(helper.installImplants("standard", "normal", 1));
			} else if (implantType === "normal") {
				if (curSize >= 5) {
					r.push(_advFillablePriceModifier(helper.replaceImplants("advanced fillable", "advanced fillable", curSize)));
				} else if (curSize >= 2) {
					r.push(helper.replaceImplants("fillable", "fillable", 3));
				} else if (curSize === 1) {
					r.push(helper.replaceImplants("bigger", "normal", 2));
				}
			} else if (implantType === "hyper fillable") {
				if (curSize > 19) {
					r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Increase butt", `<em>${His} butt implants are filled to capacity</em>`));
				} else {
					r.push(helper.fillUp(1));
				}
			} else if (implantType === "advanced fillable") {
				if (curSize > 7) {
					r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Increase butt", `<em>${His} butt implants are filled to capacity</em>`));
					if (largeImplantsAvailable) {
						r.push(helper.replaceImplants("hyper fillable", "hyper fillable", 9));
					}
				} else {
					r.push(helper.fillUp(1));
				}
			} else if (implantType === "fillable") {
				if (curSize >= 4) {
					r.push(App.Medicine.Surgery.makeImpossibleOption(types.fillUp, "Increase size", `<em>${His} implants are filled to capacity</em>`));
					r.push(_advFillablePriceModifier(helper.replaceImplants("advanced fillable", "advanced fillable", 5)));
				} else {
					r.push(helper.fillUp(1));
				}
			}
		}

		if (options.replace && slave.indentureRestrictions < 2 && curSize > 0) {
			if (!areStringsInstalled && curSize === 1) {
				r.push(helper.replaceImplants("string", "string", 1));
			} else if (areStringsInstalled) {
				// we have engorged string implants, suggest replacing with normal implants of similar size
				if (curSize >= 9) {
					if (largeImplantsAvailable) {
						r.push(helper.replaceImplants("hyper fillable", "hyper fillable", curSize));
					}
				} else if (curSize >= 5) {
					r.push(_advFillablePriceModifier(helper.replaceImplants("advanced fillable", "advanced fillable", curSize)));
				} else if (curSize >= 3) {
					r.push(helper.replaceImplants("fillable", "fillable", curSize));
				} else if (curSize === 2) {
					r.push(helper.replaceImplants("big", "normal", curSize));
				} else {
					r.push(helper.replaceImplants("standard", "normal", curSize));
				}
			}
		}

		if (options.reduction) {
			if (curSize > 0) {
				if (areStringsInstalled && curSize > 1) {
					r.push(helper.drain(1));
				} else if (areFillablesInstalled) {
					if (implantType === "hyper fillable") {
						if (curSize <= 5) {
							r.push(App.Medicine.Surgery.makeImpossibleOption(types.drain, "Remove filler", `<em>${His} implants are empty</em>`));
						} else {
							r.push(helper.drain(1));
						}
					} else if (implantType === "advanced fillable") {
						if (curSize <= 3) {
							r.push(App.Medicine.Surgery.makeImpossibleOption(types.drain, "Remove filler", `<em>${His} implants are empty</em>`));
						} else {
							r.push(helper.drain(1));
						}
					} else if (implantType === "fillable") {
						if (curSize <= 1) {
							r.push(App.Medicine.Surgery.makeImpossibleOption(types.drain, "Remove filler", `<em>${His} implants are empty</em>`));
						} else {
							r.push(helper.drain(1));
						}
					}
				}
				if (slave.indentureRestrictions < 2) {
					r.push(helper.removeImplants());
				}
			}
			if ((slave.butt > 1) && (curSize === 0)) {
				if (slave.indentureRestrictions < 2) {
					r.push(helper.reduce("reduce", 1));
				}
			}
		}
		return r;
	}
}();

/**
 * Clean up extremities on removal or piercings, tats, and brands
 * For limbs use removeLimbs()
 * @param {App.Entity.SlaveState} slave
 * @param {string} part
 */
window.surgeryAmp = function(slave, part) {
	switch (part) {
		case "left ear":
			delete slave.brand["left ear"];
			slave.earShape = "none";
			slave.earT = "none";
			slave.earPiercing = 0;
			surgeryDamage(slave, 10);
			break;
		case "right ear":
			delete slave.brand["right ear"];
			slave.earShape = "none";
			slave.earT = "none";
			slave.earPiercing = 0;
			surgeryDamage(slave, 10);
			break;
		case "dick":
			slave.dick = 0;
			slave.foreskin = 0;
			slave.skill.vaginal = 0;
			slave.dickPiercing = 0;
			slave.dickTat = 0;
			slave.dickAccessory = "none";
			slave.chastityPenis = 0;
			surgeryDamage(slave, 20);
			break;
		case "vagina":
			slave.vagina = -1;
			slave.ovaries = 0;
			slave.preg = -2;
			slave.pregSource = 0;
			slave.skill.vaginal = 0;
			slave.vaginaTat = 0;
			slave.vaginalAccessory = "none";
			slave.vaginalAttachment = "none";
			slave.chastityVagina = 0;
			surgeryDamage(slave, 20);
			break;
		case "horn":
			slave.horn = "none";
			slave.hornColor = "none";
			surgeryDamage(slave, 10);
			break;
		case "voicebox":
			slave.voice = 0;
			slave.voiceImplant = 0;
			surgeryDamage(slave, 10);
			break;
		case "lips":
			slave.lips -= slave.lipsImplant;
			slave.lipsImplant = 0;
			if (slave.skill.oral > 10) {
				slave.skill.oral -= 10;
			}
			break;
		default:
			// eslint-disable-next-line no-console
			console.log(`ERROR: Unknown amputation type: ` + part);
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} side
 * @param {string} action
 */
window.eyeSurgery = function(slave, side, action) {
	if (side === "both") {
		eyeSurgery(slave, "left", action);
		eyeSurgery(slave, "right", action);
		return;
	}

	if (side !== "left" && side !== "right") { return; } // make sure side can be used to access the object
	let eyeExists = slave.eye[side] !== null;

	/* actions that don't need an eye */
	switch (action) {
		case "normal":
			addEye(slave); // color overwritten by genetics
			return;
		case "glass":
			if (!eyeExists) { // color stays the same if possible
				addEye(slave);
			}
			slave.eye[side].type = 2;
			slave.eye[side].vision = 0;
			return;
		case "cybernetic":
			if (!eyeExists) { // color stays the same if possible
				addEye(slave);
			}
			slave.eye[side].type = 3;
			slave.eye[side].vision = 2;
			return;
	}

	function addEye(slave) {
		slave.eye[side] = new App.Entity.SingleEyeState();
		resetEyeColor(slave, side);
	}

	/* actions that need an eye */
	if (!eyeExists) { return; } // make sure the eye exists

	switch (action) {
		case "remove":
			slave.eye[side] = null;
			break;
		case "blind":
			slave.eye[side].vision = 0;
			break;
		case "blur":
			slave.eye[side].vision = 1;
			break;
		case "fix":
			slave.eye[side].vision = 2;
			break;
		default:
			// eslint-disable-next-line no-console
			console.log(`ERROR: Unknown surgery action: ` + action);
	}
};

/**
 * To be used during slave generation or slave styling (auto salon)
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} color to set eye to
 * @param {string} [side] "left", "right", "both"
 */
window.setEyeColor = function setEyeColor(slave, color, side = "both") {
	if (side === "both") {
		setEyeColor(slave, color, "left");
		setEyeColor(slave, color, "right");
		return;
	}

	if (side !== "left" && side !== "right") { return; }

	slave.eye[side].iris = color;
};

/**
 * Set all colors of the eye.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} iris
 * @param {string} pupil
 * @param {string} sclera
 * @param {string} side
 */
window.setEyeColorFull = function setEyeColorFull(slave, iris, pupil, sclera, side) {
	if (side === "both") {
		setEyeColorFull(slave, iris, pupil, sclera, "left");
		setEyeColorFull(slave, iris, pupil, sclera, "right");
		return;
	}

	if (side !== "left" && side !== "right") { return; }

	if (iris !== "") {
		slave.eye[side].iris = iris;
	}
	if (pupil !== "") {
		slave.eye[side].pupil = pupil;
	}
	if (sclera !== "") {
		slave.eye[side].sclera = sclera;
	}
};

/**
 * Set genetic eye color
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} color
 * @param {boolean} heterochromia
 */
window.setGeneticEyeColor = function(slave, color, heterochromia = false) {
	if (heterochromia) {
		slave.geneticQuirks.heterochromia = color;
	} else {
		slave.eye.origColor = color;
	}
};

/**
 * Sets the eye color to the genetic color.
 * Takes heterochromia and albinism into account.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} [side]
 */
window.resetEyeColor = function(slave, side = "both") {
	if (side === "both") {
		resetEyeColor(slave, "left");
		resetEyeColor(slave, "right");
		return;
	}

	if (side !== "left" && side !== "right") { return; }

	slave.eye[side].iris = getGeneticEyeColor(slave, side);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} level
 */
window.induceAlbinism = function(slave, level) {
	slave.geneticQuirks.albinism = level;
	if (level < 2) {
		slave.albinismOverride = null;
		return;
	}
	slave.albinismOverride = {
		skin: 0,
		eyeColor: "red",
		hColor: "white"
	};
	switch (slave.race) {
		case "black":
		case "indo-aryan":
		case "malay":
		case "pacific islander":
		case "amerindian":
			slave.albinismOverride.skin = "very fair";
			break;
		case "latina":
			slave.albinismOverride.skin = "extremely fair";
			break;
		case "asian":
		case "middle eastern":
		case "semitic":
		case "southern european":
		case "white":
			slave.albinismOverride.skin = "pure white";
			break;
		default:
			slave.albinismOverride.skin = "pure white";
	}
};

/**
 * Allowed values for limb:
 * left arm, right arm, left leg, right leg, all
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} limb
 */
window.removeLimbs = function(slave, limb) {
	function remove(limb, side) {
		const prosthetic = findProsthetic(slave, limbToProsthetic(slave[limb][side].type));

		if (prosthetic) {
			prosthetic[limb][side] = slave[limb][side];
		}

		slave[limb][side] = null;
	}

	switch (limb) {
		case "left arm":
			if (!hasLeftArm(slave)) {
				return;
			}
			remove("arm", "left");
			delete slave.brand["left upper arm"];
			delete slave.brand["left lower arm"];
			delete slave.brand["left wrist"];
			delete slave.brand["left hand"];
			// slave.armsTat = 0;
			if (!hasAnyArms(slave)) {
				slave.armAccessory = "none";
				// slave.nails = 0;
			}
			break;
		case "right arm":
			if (!hasRightArm(slave)) {
				return;
			}
			remove("arm", "right");
			delete slave.brand["right upper arm"];
			delete slave.brand["right lower arm"];
			delete slave.brand["right wrist"];
			delete slave.brand["right hand"];
			// slave.armsTat = 0;
			if (!hasAnyArms(slave)) {
				slave.armAccessory = "none";
				// slave.nails = 0;
			}
			break;
		case "left leg":
			if (!hasLeftLeg(slave)) {
				return;
			}
			remove("leg", "left");
			delete slave.brand["left thigh"];
			delete slave.brand["left calf"];
			delete slave.brand["left ankle"];
			delete slave.brand["left foot"];
			if (!hasAnyLegs(slave)) {
				slave.legsTat = 0;
				slave.shoes = "none";
				slave.legAccessory = "none";
				slave.heightImplant = 0;
				slave.heels = 0;
			}
			break;
		case "right leg":
			if (!hasRightLeg(slave)) {
				return;
			}
			remove("leg", "right");
			delete slave.brand["right thigh"];
			delete slave.brand["right calf"];
			delete slave.brand["right ankle"];
			delete slave.brand["right foot"];
			if (!hasAnyLegs(slave)) {
				slave.legsTat = 0;
				slave.shoes = "none";
				slave.legAccessory = "none";
				slave.heightImplant = 0;
				slave.heels = 0;
			}
			break;
		case "all":
			removeLimbs(slave, "left arm");
			removeLimbs(slave, "right arm");
			removeLimbs(slave, "left leg");
			removeLimbs(slave, "right leg");
			break;
	}
};

/**
 * Expects amputated limbs. Will overwrite existing limbs.
 *
 * Allowed values for limb:
 * left arm, right arm, left leg, right leg, all
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} limb
 * @param {number} id
 */
window.attachLimbs = function(slave, limb, id) {
	function attach(limb, side) {
		let prosthetic = findProsthetic(slave, limbToProsthetic(id));

		if (prosthetic) {
			slave[limb][side] = prosthetic[limb][side];
		} else {
			slave[limb][side] = new App.Entity.LimbState();
			slave[limb][side].type = id;
		}
	}

	switch (limb) {
		case "left arm":
			attach("arm", "left");
			break;
		case "right arm":
			attach("arm", "right");
			break;
		case "left leg":
			attach("leg", "left");
			break;
		case "right leg":
			attach("leg", "right");
			break;
		case "all":
			attachLimbs(slave, "left arm", id);
			attachLimbs(slave, "right arm", id);
			attachLimbs(slave, "left leg", id);
			attachLimbs(slave, "right leg", id);
			break;
		default:
			// eslint-disable-next-line no-console
			console.log(`ERROR: Unknown attach point: ` + limb);
	}
};

window.upgradeLimbs = function(slave, newId) {
	let changed = false;

	/**
	 * @param {number} oldId
	 * @returns {number}
	 */
	function computeUpgrade(oldId) {
		if (newId < 2) {
			return oldId;
		} else if (newId === 2 && oldId === 0) {
			return 2;
		} else if (newId < 6 && oldId <= 2) {
			return newId;
		} else if (newId > oldId) {
			return newId;
		} else {
			return oldId;
		}
	}

	/**
	 * @param {string} limb
	 * @param {function(App.Entity.SlaveState): number} idFunction
	 */
	function upgradeLimb(limb, idFunction) {
		let oldId = idFunction(slave);
		if (oldId === 1) {
			return;
		}
		if (oldId > 1) {
			removeLimbs(slave, limb);
		}
		if (newId > 1) {
			attachLimbs(slave, limb, computeUpgrade(oldId));
		}
		if (oldId !== idFunction(slave)) {
			changed = true;
		}
	}

	upgradeLimb("left arm", getLeftArmID);
	upgradeLimb("right arm", getRightArmID);
	upgradeLimb("left leg", getLeftLegID);
	upgradeLimb("right leg", getRightLegID);

	return changed;
};

/**
 * Changes a slaves limbs to the specified value AND sets all related variables.
 * Intended for giving prosthetics during slave generation and events.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} limb
 * @param {number} id
 * @param {boolean} clean if the slave should be cleaned of all existing
 */
window.configureLimbs = function(slave, limb, id, clean = false) {
	if (limb === "all") {
		configureLimbs(slave, "left arm", id);
		configureLimbs(slave, "right arm", id);
		configureLimbs(slave, "left leg", id);
		configureLimbs(slave, "right leg", id);
		return;
	}

	if (clean) {
		slave.PLimb = 0;
		slave.readyProsthetics = [];
	}

	let p = limbToProsthetic(id);
	if (p) {
		addProsthetic(slave, p);
	}

	if (id >= 6 && slave.PLimb < 2) {
		slave.PLimb = 2;
		addProsthetic(slave, "interfaceP2");
	} else if (id >= 2 && slave.PLimb < 1) {
		slave.PLimb = 1;
		addProsthetic(slave, "interfaceP1");
	}

	switch (limb) {
		case "left arm":
			if (id !== getLeftArmID(slave)) {
				removeLimbs(slave, "left arm");
				if (id > 0) {
					attachLimbs(slave, "left arm", id);
				}
			}
			break;
		case "right arm":
			if (id !== getRightArmID(slave)) {
				removeLimbs(slave, "right arm");
				if (id > 0) {
					attachLimbs(slave, "right arm", id);
				}
			}
			break;
		case "left leg":
			if (id !== getLeftLegID(slave)) {
				removeLimbs(slave, "left leg");
				if (id > 0) {
					attachLimbs(slave, "left leg", id);
				}
			}
			break;
		case "right leg":
			if (id !== getRightLegID(slave)) {
				removeLimbs(slave, "right leg");
				if (id > 0) {
					attachLimbs(slave, "right leg", id);
				}
			}
			break;
	}
};

/**
 * Prepare and set up for new Fuckdoll
 * @param {App.Entity.SlaveState} slave
 */
window.beginFuckdoll = function(slave) {
	slave.fuckdoll = 1;
	slave.toyHole = "all her holes";
	if ((slave.pubicHStyle !== "bald") && (slave.pubicHStyle !== "hairless")) {
		slave.pubicHStyle = "waxed";
	}
	slave.rules.living = "spare";
	slave.rules.speech = "restrictive";
	slave.rules.release.masturbation = 0;
	slave.rules.release.partner = 0;
	slave.rules.release.family = 0;
	slave.rules.release.slaves = 0;
	slave.rules.relationship = "restrictive";
	slave.choosesOwnClothes = 0;
	slave.clothes = "a Fuckdoll suit";
	slave.collar = "none";
	if ((!hasAnyLegs(slave)) || (slave.shoes !== "none")) {
		slave.shoes = "heels";
	}
	slave.armAccessory = "none";
	slave.legAccessory = "none";
	slave.vaginalAccessory = "none";
	slave.vaginalAttachment = "none";
	slave.dickAccessory = "none";
	slave.buttplug = "none";
	slave.chastityAnus = 0;
	slave.chastityPenis = 0;
	slave.chastityVagina = 0;
	slave.attrKnown = 1;
	slave.fetishKnown = 1;
	slave.subTarget = 0;
	slave.sentence = 0;
	slave.training = 0;
	slave.inflation = 0;
	slave.inflationType = "none";
	slave.inflationMethod = 0;
	slave.milkSource = 0;
	slave.cumSource = 0;
};
