App.Medicine.OrganFarm.TesticlesImplantAction = class extends App.Medicine.OrganFarm.OrganImplantAction {
	/**
	 * @param {string} name
	 * @param {string} tooltip
	 * @param {string} ballType
	 * @param {boolean} animal
	 * @param {boolean} autoImplant
	 * @param {function(App.Entity.SlaveState):boolean} canImplant
	 * @param {function(App.Entity.SlaveState):string} implantError
	 * @param {function(App.Entity.SlaveState)} implant
	 */
	constructor({name, tooltip = "", animal, autoImplant = true, canImplant, implantError, implant} = {}) {
		super({
			name: name,
			tooltip: tooltip,
			healthImpact: 20,
			surgeryType: animal ? "addAnimalBalls" : "addBalls",
			autoImplant: autoImplant,
			canImplant: s => (!this.animal || V.animalTesticles > 0) && canImplant(s),
			implantError: s => (this.animal && V.animalTesticles === 0) ? "" : implantError(s),
			implant: implant
		});
		this.animal = animal;
	}
};

App.Medicine.OrganFarm.Testicles = class extends App.Medicine.OrganFarm.Organ {
	/**
	 * @param {string} type
	 * @param {string} name
	 * @param {string} ballType
	 * @param {boolean} animal
	 */
	constructor({type, name, ballType, animal} = {}) {
		super({
			type: type, name: name,
			tooltip: "will add a prostate if one is not already present; requires a penis for successful implantation",
			cost: 5000, time: 10,
			canGrow: () => (!this.animal || V.animalTesticles > 0), dependencies: ["penis"],
			actions: [
				new App.Medicine.OrganFarm.TesticlesImplantAction({
					name: "Implant", ballType: ballType, animal: animal,
					canImplant: slave => (slave.balls <= 0 && slave.dick > 0),
					implantError: slave => {
						if (slave.dick === 0) {
							return "This slave lacks the penis necessary to accept testicles.";
						} else {
							return "This slave already has testicles.";
						}
					},
					implant: slave => {
						if (slave.prostate === 0) {
							slave.prostate = 1;
						}
						slave.balls = 2;
						slave.ballType = this.ballType;
						slave.scrotum = 2;
						if (slave.pubertyAgeXY === 0) {
							if (V.precociousPuberty === 1) {
								if (slave.physicalAge >= V.potencyAge) {
									slave.pubertyAgeXY = slave.physicalAge + 1;
								}
							} else {
								if (slave.physicalAge >= V.potencyAge) {
									slave.pubertyXY = 1;
								}
							}
						}
					}
				}),
				new App.Medicine.OrganFarm.TesticlesImplantAction({
					name: "Implant",
					tooltip: "you can forgo standard procedure and implant testicles directly into $his abdomen",
					ballType: ballType, animal: animal, surgeryType: "addTesticles", autoImplant: false,
					canImplant: slave => (slave.dick === 0 && slave.balls <= 0),
					implantError: slave => ((slave.balls > 0) ? "This slave already has testicles." : ""),
					implant: slave => {
						if (slave.prostate === 0) {
							slave.prostate = 1;
						}
						slave.balls = 2;
						slave.ballType = this.ballType;
						if (slave.pubertyAgeXY === 0) {
							if (V.precociousPuberty === 1) {
								if (slave.physicalAge >= V.potencyAge) {
									slave.pubertyAgeXY = slave.physicalAge + 1;
								}
							} else {
								if (slave.physicalAge >= V.potencyAge) {
									slave.pubertyXY = 1;
								}
							}
						}
					}
				}),
				new App.Medicine.OrganFarm.TesticlesImplantAction({
					name: "Replace",
					tooltip: "you can replace the existing testicles with a new pair",
					healthImpact: 20,
					surgeryType: "addTesticles",
					autoImplant: false,
					canImplant: slave => (slave.balls > 0 && slave.ballType !== this.ballType),
					implantError: slave => (slave.balls > 0 ? `This slave already has ${this.ballType} testicles.` : ""),
					implant: slave => {
						slave.balls = 2;
						slave.ballType = this.ballType;
						if (slave.pubertyAgeXY === 0) {
							if (V.precociousPuberty === 1) {
								if (slave.physicalAge >= V.potencyAge) {
									slave.pubertyAgeXY = slave.physicalAge + 1;
								}
							} else {
								if (slave.physicalAge >= V.potencyAge) {
									slave.pubertyXY = 1;
								}
							}
						}
					}
				})
			]
		});
		this.animal = animal;
		this.ballType = ballType;
	}
};

App.Medicine.OrganFarm.OvariesImplantAction = class extends App.Medicine.OrganFarm.OrganImplantAction {
	/**
	 * @param {string} name
	 * @param {string} tooltip
	 * @param {boolean} animal
	 * @param {boolean} autoImplant
	 * @param {function(App.Entity.SlaveState):boolean} canImplant
	 * @param {function(App.Entity.SlaveState):string} implantError
	 * @param {function(App.Entity.SlaveState)} implant
	 */
	constructor({name, tooltip = "", animal, autoImplant = true, canImplant, implantError, implant} = {}) {
		super({
			name: name, tooltip: tooltip, healthImpact: 20,
			surgeryType: animal ? "addAnimalOvaries" : "addOvaries", autoImplant: autoImplant,
			canImplant: s => (!this.animal || V.animalTesticles > 0) && canImplant(s),
			implantError: s => (this.animal && V.animalTesticles === 0) ? "" : implantError(s),
			implant: implant
		});
		this.animal = animal;
	}
};

App.Medicine.OrganFarm.Ovaries = class extends App.Medicine.OrganFarm.Organ {
	/**
	 * @param {string} type
	 * @param {string} name
	 * @param {string} eggType
	 * @param {string} pregData
	 * @param {boolean} animal
	 */
	constructor({type, name, eggType, pregData, animal} = {}) {
		super({
			type: type, name: name, tooltip: "requires a vagina for successful implantation",
			cost: 10000, time: 10,
			canGrow: () => (!this.animal || V.animalTesticles > 0),
			actions: [
				new App.Medicine.OrganFarm.OvariesImplantAction({
					name: "Implant", animal: animal,
					canImplant: s => (s.vagina >= 0 && s.ovaries <= 0 && s.mpreg === 0 && s.bellyImplant === -1),
					implantError: s => {
						if (s.vagina < 0) { return "This slave lacks the vagina necessary to accept ovaries."; }
						if (s.ovaries >= 0) { return "This slave already has ovaries."; }
						return "This slave's body cavity is filled with another organ.";
					},
					implant: s => {
						s.ovaries = 1;
						s.eggType = this.eggType;
						s.preg = 0;
						s.pregData = clone(setup.pregData[this.pregData]);
						if (s.pubertyXX === 0 && s.physicalAge >= V.fertilityAge) {
							if (V.precociousPuberty === 1) {
								s.pubertyAgeXX = s.physicalAge + 1;
							} else {
								s.pubertyXX = 1;
							}
						}
					}
				}),
				new App.Medicine.OrganFarm.OvariesImplantAction({
					name: "Replace",
					tooltip: "you can replace the existing ovaries with a new pair",
					animal: animal,
					autoImplant: false,
					canImplant: s => (s.vagina >= 0 && s.mpreg === 0 && s.bellyImplant === -1 && (s.eggType !== this.eggType || s.preg === -3)),
					implantError: s => (s.eggType === this.eggType) ? `This slave already has ${s.eggType} ovaries.` : "",
					implant: s => {
						s.eggType = this.eggType;
						s.preg = 0;
						s.pregData = clone(setup.pregData[this.pregData]);
						if (s.pubertyXX === 0 && s.physicalAge >= V.fertilityAge) {
							if (V.precociousPuberty === 1) {
								s.pubertyAgeXX = s.physicalAge + 1;
							} else {
								s.pubertyXX = 1;
							}
						}
					}
				})
			]
		});
		this.animal = animal;
		this.eggType = eggType;
		this.pregData = pregData;
	}
};

App.Medicine.OrganFarm.AnalWombImplantAction = class extends App.Medicine.OrganFarm.OrganImplantAction {
	/**
	 * @param {string} eggType
	 * @param {string} pregData
	 * @param {boolean} animal
	 */
	constructor({eggType, pregData, animal} = {}) {
		super({
			name: "Implant", healthImpact: 40,
			surgeryType: "mpreg",
			canImplant: s => ((!this.animal || V.animalTesticles > 0) && s.ovaries === 0 && s.vagina <= -1 && s.mpreg === 0 && s.bellyImplant < 0),
			implantError: s => {
				if (this.animal && V.animalTesticles === 0) { return ""; }
				if (s.bellyImplant >= 0) {return "This slave has a fillable abdominal implant."; }
				return "This slave has existing reproductive Organs.";
			},
			implant: s => {
				s.mpreg = 1;
				s.eggType = this.eggType;
				s.preg = 0;
				s.pregData = clone(setup.pregData[this.pregData]);
				if (s.pubertyXX === 0 && s.physicalAge >= V.fertilityAge) {
					if (V.precociousPuberty === 1) {
						s.pubertyAgeXX = s.physicalAge + 1;
					} else {
						s.pubertyXX = 1;
					}
				}
			}
		});
		this.animal = animal;
		this.eggType = eggType;
		this.pregData = pregData;
	}
};

App.Medicine.OrganFarm.AnalWomb = class extends App.Medicine.OrganFarm.Organ {
	/**
	 * @param {string} type
	 * @param {string} name
	 * @param {string} eggType
	 * @param {string} pregData
	 * @param {boolean} animal
	 */
	constructor({type, name, eggType, pregData, animal} = {}) {
		super({
			type: type, name: name,
			tooltip: "the slave must not have female reproductive organs for successful implantation",
			cost: 20000, time: 10,
			canGrow: () => (V.arcologies[0].FSGenderRadicalistResearch === 1 && (!this.animal || V.animalMpreg > 0)),
			actions: [
				new App.Medicine.OrganFarm.AnalWombImplantAction({
					eggType: eggType,
					pregData: pregData,
					animal: animal
				})
			]
		});
		this.animal = animal;
	}
};
