/**
 * Organs will usually be displayed in this order.
 * If an organ is not part of this array, it will be unreachable.
 *
 * @type {string[]}
 */
App.Medicine.OrganFarm.organDisplayOrder = ["penis", "testicles", "scrotum", "pigTesticles", "dogTesticles", "horseTesticles", "cowTesticles", "foreskin", "prostate", "ovaries", "asexualReproOvaries", "pigOvaries", "dogOvaries", "horseOvaries", "cowOvaries", "freshOvaries", "leftEye", "rightEye", "ears", "topEars", "cochleae", "voicebox", "mpreg", "mpregPig", "mpregDog", "mpregHorse", "mpregCow"];

App.Medicine.OrganFarm.init = function() {
	new App.Medicine.OrganFarm.Organ({
		type: "penis", name: "Penis", tooltip: "will add a prostate if one is not already present", cost: 5000, time: 5,
		canGrow: () => (V.seeDicks !== 0 || V.makeDicks === 1),
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 20, surgeryType: "addDick",
				canImplant: slave => (slave.dick <= 0),
				implantError: () => "this slave already has a penis",
				implant: slave => {
					if (slave.prostate === 0) {
						slave.prostate = 1;
					}
					slave.dick = 2;
					slave.clit = 0;
					slave.foreskin = slave.dick;
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Organ({
		type: "foreskin", name: "Foreskin", cost: 2500, time: 5,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Graft on", healthImpact: 10, surgeryType: "addForeskin",
				canImplant: slave => (slave.foreskin <= 0),
				implantError: slave => `This slave already has a ${slave.dick > 0 ? "foreskin" : "clitoral hood"}.`,
				implant: slave => {
					if (slave.dick > 0) {
						slave.foreskin = slave.dick;
					} else if (slave.clit > 0) {
						slave.foreskin = slave.clit;
					} else {
						slave.foreskin = 1;
					}
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Testicles({type: "testicles", name: "Testicles", ballType: "human", animal: false});
	new App.Medicine.OrganFarm.Testicles({type: "pigTesticles", name: "Pig testicles", ballType: "pig", animal: true});
	new App.Medicine.OrganFarm.Testicles({type: "dogTesticles", name: "Dog testicles", ballType: "dog", animal: true});
	new App.Medicine.OrganFarm.Testicles({type: "horseTesticles", name: "Horse testicles", ballType: "horse", animal: true});
	new App.Medicine.OrganFarm.Testicles({type: "cowTesticles", name: "Cow testicles", ballType: "cow", animal: true});

	new App.Medicine.OrganFarm.Organ({
		type: "scrotum", name: "Scrotum", tooltip: "requires balls for successful implantation", cost: 2500, time: 5,
		dependencies: ["testicles", "pigTesticles", "dogTesticles", "horseTesticles", "cowTesticles"],
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Graft on", healthImpact: 10, surgeryType: "addScrotum",
				canImplant: slave => (slave.scrotum <= 0 && slave.balls > 0),
				implantError: slave => (slave.scrotum > 0) ? "This slave already has a scrotum." : "This slave lacks the balls necessary to accept a scrotum.",
				implant: slave => {
					slave.scrotum = slave.balls;
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Ovaries({type: "ovaries", name: "Ovaries", eggType: "human", pregData: "human", animal: false});
	new App.Medicine.OrganFarm.Ovaries({type: "pigOvaries", name: "Pig ovaries", eggType: "pig", pregData: "pig", animal: true});
	new App.Medicine.OrganFarm.Ovaries({
		type: "dogOvaries",
		name: "Dog ovaries",
		eggType: "dog",
		pregData: "canineM",
		animal: true
	});
	new App.Medicine.OrganFarm.Ovaries({
		type: "horseOvaries",
		name: "Horse ovaries",
		eggType: "horse",
		pregData: "equine",
		animal: true
	});
	new App.Medicine.OrganFarm.Ovaries({type: "cowOvaries", name: "Cow ovaries", eggType: "cow", pregData: "cow", animal: true});

	new App.Medicine.OrganFarm.AnalWomb({
		type: "mpreg",
		name: "Anal womb and ovaries",
		eggType: "human",
		pregData: "human",
		animal: false
	});
	new App.Medicine.OrganFarm.AnalWomb({
		type: "mpregPig",
		name: "Anal pig womb and ovaries",
		eggType: "pig",
		pregData: "pig",
		animal: true
	});
	new App.Medicine.OrganFarm.AnalWomb({
		type: "mpregDog",
		name: "Anal dog womb and ovaries",
		eggType: "dog",
		pregData: "canineM",
		animal: true
	});
	new App.Medicine.OrganFarm.AnalWomb({
		type: "mpregHorse",
		name: "Anal horse womb and ovaries",
		eggType: "horse",
		pregData: "equine",
		animal: true
	});
	new App.Medicine.OrganFarm.AnalWomb({
		type: "mpregCow",
		name: "Anal cow womb and ovaries",
		eggType: "cow",
		pregData: "cow",
		animal: true
	});

	new App.Medicine.OrganFarm.Organ({
		type: "freshOvaries", name: "Younger Ovaries",
		tooltip: "requires a womb for successful implantation",
		cost: 10000, time: 10,
		canGrow: () => (V.youngerOvaries === 1),
		dependencies: ["ovaries", "pigOvaries", "dogOvaries", "horseOvaries", "cowOvaries", "mpreg", "mpregPig", "mpregDog", "mpregHorse", "mpregCow"],
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 20, surgeryType: "freshOvaries",
				canImplant: s => ((s.mpreg !== 0 || s.ovaries !== 0) && s.bellyImplant === -1 && s.physicalAge < 70),
				implantError: s => (s.physicalAge >= 70) ? "This slave's body is too old to handle pregnancy." : "This slave lacks a viable womb.",
				implant: s => {
					if (s.ovaryAge >= 47) {
						s.ovaryAge = 45;
					} else {
						s.ovaryAge = -2; // It shouldn't matter if this goes negative as it is just a signal for menopause to occur.
					}
					if (s.preg < 0) {
						s.preg = 0;
					}
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

	new App.Medicine.OrganFarm.Organ({
		type: "asexualReproOvaries", name: "Asexual reproduction modification",
		tooltip: "requires existing ovaries for successful implantation",
		cost: 10000, time: 10,
		canGrow: () => (V.asexualReproduction === 1),
		dependencies: ["ovaries", "pigOvaries", "dogOvaries", "horseOvaries", "cowOvaries", "mpreg", "mpregPig", "mpregDog", "mpregHorse", "mpregCow"],
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 20, surgeryType: "asexualReproOvaries",
				canImplant: s => (s.mpreg !== 0 || s.ovaries !== 0),
				implantError: () => "This slave lacks ovaries.",
				implant: s => {
					if (s.preg < 0) {
						s.preg = 0;
					}
					s.eggType = "human";
					s.pregData = clone(setup.pregData.human);
					if (s.pubertyXX === 0 && s.physicalAge >= V.fertilityAge) {
						if (V.precociousPuberty === 1) {
							s.pubertyAgeXX = s.physicalAge + 1;
						} else {
							s.pubertyXX = 1;
						}
					}
					s.ovaImplant = "asexual";
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Organ({
		type: "prostate", name: "Prostate", cost: 5000, time: 5,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 20, surgeryType: "addProstate",
				canImplant: s => (s.prostate === 0),
				implantError: () => "This slave already has a prostate.",
				implant: s => {
					s.prostate = 1;
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Organ({
		type: "leftEye", name: "Left Eye", cost: 5000, time: 10,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 10, surgeryType: "newEyes",
				canImplant: s => (getLeftEyeVision(s) === 0 && getBestVision(s) !== 0 && getLeftEyeType(s) !== 2),
				implantError: s => getLeftEyeVision(s) !== 0 ? "Slave has a working left eye." : "",
				implant: s => {
					eyeSurgery(s, "left", "normal");
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 10, surgeryType: "unblind",
				canImplant: s => (getBestVision(s) === 0 && getLeftEyeType(s) !== 2),
				implantError: () => "",
				implant: s => {
					eyeSurgery(s, "left", "normal");
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Replace", tooltip: "replace the existing ocular implant with an organic eye",
				healthImpact: 10, surgeryType: "newEyes", autoImplant: false,
				canImplant: s => (getLeftEyeType(s) === 2),
				implantError: () => "",
				implant: s => {
					eyeSurgery(s, "left", "normal");
				}
			})
		]
	});
	new App.Medicine.OrganFarm.Organ({
		type: "rightEye", name: "Right Eye", cost: 5000, time: 10,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 10, surgeryType: "newEyes",
				canImplant: s => (getRightEyeVision(s) === 0 && getBestVision(s) !== 0 && getRightEyeType(s) !== 2),
				implantError: s => getRightEyeVision(s) !== 0 ? "Slave has a working right eye." : "",
				implant: s => {
					eyeSurgery(s, "right", "normal");
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 10, surgeryType: "unblind",
				canImplant: s => (getBestVision(s) === 0 && getRightEyeType(s) !== 2),
				implantError: () => "",
				implant: s => {
					eyeSurgery(s, "right", "normal");
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Replace", tooltip: "replace the existing ocular implant with an organic eye",
				healthImpact: 20, surgeryType: "newEyes", autoImplant: false,
				canImplant: s => (getRightEyeType(s) === 2),
				implantError: () => "",
				implant: s => {
					eyeSurgery(s, "right", "normal");
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Organ({
		type: "ears", name: "Normal Ears", cost: 1000, time: 2,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Attach", healthImpact: 15, surgeryType: "earMinor",
				canImplant: s => (s.earShape === "none"),
				implantError: () => "This slave already has ears.",
				implant: s => {
					s.earShape = "normal";
					if (s.hears === -1) {
						s.hears = 0;
					}
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Replace", tooltip: "replace current ears with normal human ears",
				healthImpact: 20, surgeryType: "earMinor", autoImplant: false,
				canImplant: s => (s.earShape !== "normal"),
				implantError: () => "This slave already has normal ears.",
				implant: s => {
					s.earShape = "normal";
				}
			})
		]
	});
	new App.Medicine.OrganFarm.Organ({
		type: "topEars", name: "Top Ears", cost: 1000, time: 2,
		canGrow: () => (V.surgeryUpgrade >= 1),
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Attach", healthImpact: 10, surgeryType: "earMinor",
				canImplant: s => (s.earT === "none"),
				implantError: () => "This slave already has ears at the top of the head.",
				implant: s => {
					s.earT = "normal";
					s.earTColor = "hairless";
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Replace", tooltip: "replace current top ears with normal ears",
				healthImpact: 20, surgeryType: "earMinor", autoImplant: false,
				canImplant: s => (s.earT !== "normal"),
				implantError: () => "This slave already has normal ears at the top of the head.",
				implant: s => {
					s.earT = "normal";
					s.earTColor = "hairless";
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Organ({
		type: "cochleae", name: "Cochleae", cost: 8000, time: 6,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 20, surgeryType: "undeafen",
				canImplant: s => (s.hears <= -2 && s.earImplant === 0),
				implantError: () => "This slave already has working ears.",
				implant: s => {
					s.hears = 0;
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Replace", tooltip: "remove cochlear implants before implanting organic cochleae",
				healthImpact: 20, surgeryType: "newEars", autoImplant: false,
				canImplant: s => (s.earImplant === 1),
				implantError: () => "",
				implant: s => {
					s.hears = 0;
					s.earImplant = 0;
				}
			})
		]
	});

	new App.Medicine.OrganFarm.Organ({
		type: "voicebox", name: "Vocal Cords", cost: 5000, time: 5,
		actions: [
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Implant", healthImpact: 10, surgeryType: "restoreVoice",
				canImplant: s => (s.voice === 0 && s.electrolarynx === 0),
				implantError: () => "This slave is not mute.",
				implant: s => {
					if (s.ovaries === 1 && s.hormoneBalance >= 200) {
						s.voice = 3;
					} else if (s.balls > 0 || s.hormoneBalance < -20) {
						s.voice = 1;
					} else {
						s.voice = 2;
					}
				}
			}),
			new App.Medicine.OrganFarm.OrganImplantAction({
				name: "Replace", tooltip: "remove electrolarynx and implant organic vocal cords",
				healthImpact: 20, surgeryType: "newVoice", autoImplant: false,
				canImplant: s => (s.electrolarynx === 1),
				implantError: () => "",
				implant: s => {
					s.electrolarynx = 0;
					if (s.ovaries === 1 && s.hormoneBalance >= 200) {
						s.voice = 3;
					} else if (s.balls > 0 || s.hormoneBalance < -20) {
						s.voice = 1;
					} else {
						s.voice = 2;
					}
				}
			})
		]
	});
};
