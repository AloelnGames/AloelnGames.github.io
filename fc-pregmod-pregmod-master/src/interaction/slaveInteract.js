/* eslint-disable no-unused-vars */ // TODO: remove after testing
App.UI.SlaveInteract.placeInLine = function(slave) {
	let slavesInLine = [];
	let activeSlaveIndex = V.slaveIndices[slave.ID];
	let SL = V.slaves.length;

	if (assignmentVisible(slave)) {
		for (let pil = activeSlaveIndex - 1; pil !== activeSlaveIndex; pil--) {
			/* loops backwards through the V.slaves array */
			if (pil < 0) {
				pil = SL;
				continue;
			}
			if (assignmentVisible(V.slaves[pil])) {
				slavesInLine.push(pil); /* index of the previous slave in line */
				break;
			}
		}
		for (let pil = activeSlaveIndex + 1; pil !== activeSlaveIndex; pil++) {
			/* this loops forwards through the V.slaves array */
			if (pil === SL) {
				pil = -1;
				continue;
			}
			if (assignmentVisible(V.slaves[pil])) {
				slavesInLine.push(pil); /* index of the next slave in line */
				break;
			}
		}
	} else {
		for (let pil = activeSlaveIndex - 1; pil !== activeSlaveIndex; pil--) {
			/* loops backwards through the V.slaves array */
			if (pil < 0) {
				pil = SL;
				continue;
			}
			if (V.slaves[pil].assignment === slave.assignment) {
				slavesInLine.push(pil); /* index of the previous slave in line */
				break;
			}
		}
		for (let pil = activeSlaveIndex + 1; pil !== activeSlaveIndex; pil++) {
			/* this loops forwards through the V.slaves array */
			if (pil === SL) {
				pil = -1;
				continue;
			}
			if (V.slaves[pil].assignment === slave.assignment) {
				slavesInLine.push(pil); /* index of the next slave in line */
				break;
			}
		}
	}

	if (slavesInLine.length === 0) {
		/* if there are no other slaves available, set previous/next slave to self */
		slavesInLine[0] = activeSlaveIndex;
		slavesInLine[1] = activeSlaveIndex;
	}
	return slavesInLine;
};

App.UI.SlaveInteract.fucktoyPref = function(slave) {
	/** @type {App.Entity.SlaveState} */
	const {his} = getPronouns(slave);
	let el = document.createElement('div');
	let links = [];

	if ((slave.assignment === "please you") || (slave.assignment === "serve in the master suite") || (slave.assignment === "be your Concubine")) {
		let storyLabel = document.createElement('span');
		storyLabel.className = "story-label";
		storyLabel.textContent = `Fucktoy use preference:`;
		el.appendChild(storyLabel);

		el.append(` `);

		let hole = document.createElement('span');
		hole.style.fontWeight = "bold";
		hole.textContent = `${slave.toyHole}. `;
		el.appendChild(hole);

		/** @type {object} */

		links.push({text: `Mouth`, toyHole: `mouth`});
		links.push({text: `Tits`, toyHole: `boobs`});
		if ((slave.vagina > 0) && canDoVaginal(slave)) {
			links.push({text: `Pussy`, toyHole: `pussy`});
		} else if (slave.vagina === 0) {
			links.push({text: `Pussy`, disabled: `Take ${his} virginity before giving ${his} pussy special attention`});
		}
		if ((slave.anus > 0) && canDoAnal(slave)) {
			links.push({text: `Ass`, toyHole: `ass`});
		} else {
			links.push({text: `Ass`, disabled: `Take ${his} anal virginity before giving ${his} ass special attention`});
		}
		if ((slave.dick > 0) && canPenetrate(slave)) {
			links.push({text: `Dick`, toyHole: `dick`});
		}
		links.push({text: `No Preference`, toyHole: `all ${his} holes`});
	}
	el.appendChild(generateRows(links));

	function generateRows(toyHoleArray) {
		let row = document.createDocumentFragment();
		for (let i = 0; i < toyHoleArray.length; i++) {
			let link;
			const separator = document.createTextNode(` | `);
			const keys = Object.keys(toyHoleArray[i]);

			// Test to see if there was a problem with the key
			for (let j = 0; j < keys.length; j++) {
				if (["text", "toyHole", "disabled"].includes(keys[j])) {
					continue;
				} else {
					toyHoleArray[i].text += " ERROR, THIS SCENE WAS NOT ENTERED CORRECTLY";
					console.log("Trash found while generateRows() was running: " + keys[j] + ": " + toyHoleArray[i][keys[j]]);
					break;
				}
			}
			// is it just text?
			if (toyHoleArray[i].disabled) {
				link = App.UI.DOM.disabledLink(toyHoleArray[i].text, [toyHoleArray[i].disabled]);
				// Are they already on this toyHole?
			} else if (toyHoleArray[i].toyHole === slave.toyHole) {
				link = document.createTextNode(toyHoleArray[i].text);
				// Set up the link
			} else {
				link = App.UI.DOM.link(
					toyHoleArray[i].text,
					() => {
						slave.toyHole = toyHoleArray[i].toyHole,
							App.UI.SlaveInteract.fucktoyPref(slave);
					},
				);

				// add a note node if required
				if (toyHoleArray[i].note) {
					let note = document.createElement('span');
					note.textContent = `${toyHoleArray[i].note} `;
					note.className = "note";
					link.appendChild(note);
				}
			}
			row.appendChild(link);
			if (i < toyHoleArray.length - 1) {
				row.appendChild(separator);
			}
		}

		return row;
	}
	return jQuery('#fucktoypref').empty().append(el);
};

App.UI.SlaveInteract.assignmentBlock = function(blockId, slave) {
	let el = document.createElement('div');
	let title = document.createElement('div');
	let separator = document.createTextNode(` | `);
	title.append(`Assignment: `);

	let assign = document.createElement('span');
	assign.style.fontWeight = "bold";
	if (slave.sentence) {
		assign.textContent = `${slave.assignment} (${slave.sentence} weeks). `;
	} else {
		assign.textContent = `${slave.assignment}. `;
	}
	title.appendChild(assign);
	if (slave.assignment === "be a subordinate slave") {
		const target = getSlave(slave.subTarget);
		let linkText = ``;
		if (target) {
			title.appendChild(document.createTextNode(`Serving ${target.slaveName} exclusively. `));
			linkText = `Change`;
		} else {
			title.appendChild(document.createTextNode(`Serving all your other slaves. `));
			linkText = `Choose a specific slave to submit to`;
		}
		title.appendChild(App.UI.DOM.passageLink(linkText, "Subordinate Targeting", () => { V.returnTo = "Slave Interact"; }));
	}
	if (V.assignmentRecords[slave.ID] && V.assignmentRecords[slave.ID] !== slave.assignment) {
		title.append(`Previously: `);
		assign = document.createElement('span');
		assign.style.fontWeight = "bold";
		assign.textContent = `${V.assignmentRecords[slave.ID]}. `;
		title.appendChild(assign);
	}
	if (slave.assignment !== "choose her own job") {
		title.appendChild(
			App.UI.DOM.link(
				`Stay on this assignment for another month`,
				() => {
					slave.sentence += 4,
						App.UI.SlaveInteract.assignmentBlock(blockId, slave);
				},
			)
		);
	}
	el.appendChild(title);

	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(
		App.UI.jobLinks.assignmentsFragment(
			V.slaveIndices[slave.ID], passage(),
			(slave, assignment) => {
				assignJob(slave, assignment),
					V.activeSlave = slave;
			}
		)
	);
	el.appendChild(links);
	return jQuery(`#${blockId}`).empty().append(el);
};

App.UI.SlaveInteract.drugs = function(slave) {
	let el = document.createElement('div');

	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	const drugOptions = [];
	const drugLevelOptions = [];

	if (slave.drugs !== "no drugs") {
		drugLevelOptions.push({text: `None`, updateSlave: {drugs: `no drugs`}});
	}
	if (slave.indentureRestrictions < 2) {
		if (
			slave.drugs === "intensive breast injections" ||
			slave.drugs === "intensive butt injections" ||
			slave.drugs === "intensive penis enhancement" ||
			slave.drugs === "intensive testicle enhancement"
		) {
			switch (slave.drugs) {
				case "intensive breast injections":
					drugLevelOptions.push({text: `Moderate`, updateSlave: {drugs: `breast injections`}});
					break;
				case "intensive butt injections":
					drugLevelOptions.push({text: `Moderate`, updateSlave: {drugs: `butt injections`}});
					break;
				case "intensive penis enhancement":
					drugLevelOptions.push({text: `Moderate`, updateSlave: {drugs: `penis enhancement`}});
					break;
				case "intensive testicle enhancement":
					drugLevelOptions.push({text: `Moderate`, updateSlave: {drugs: `testicle enhancement`}});
					break;
			}
		} else if (slave.drugs === "breast injections" || slave.drugs === "butt injections" || slave.drugs === "penis enhancement" || slave.drugs === "testicle enhancement") {
			drugLevelOptions.push({text: `Intensify`, updateSlave: {drugs: "intensive " + slave.drugs}});
		}
		if (slave.intelligence > -100 && slave.indentureRestrictions < 1) {
			drugOptions.push({text: `Psychosuppressants`, updateSlave: {drugs: `psychosuppressants`}});
		} else if (slave.intelligence > -100) {
			drugOptions.push({text: `Psychosuppressants`, disabled: `Cannot suppress indentured slave`});
		} else if (slave.indentureRestrictions < 1) {
			drugOptions.push({text: `Psychosuppressants`, disabled: `Too stupid to suppress`});
		} else {
			drugOptions.push({text: `Psychosuppressants`, disabled: `Too stupid and indentured to suppress`});
		}
		if (V.arcologies[0].FSSlaveProfessionalismResearch === 1) {
			if (canImproveIntelligence(slave)) {
				drugOptions.push({text: `Psychostimulants`, updateSlave: {drugs: `psychostimulants`}});
			} else {
				drugOptions.push({text: `Psychostimulants`, disabled: `Cannot improve intelligence`});
			}
		}
		if (slave.boobs < 48000) {
			drugOptions.push({text: `Breasts`, updateSlave: {drugs: `breast injections`}});
		} else {
			drugOptions.push({text: `Breasts`, disabled: `Boobs are too large`});
		}
		if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
			if (slave.boobs < 25000) {
				drugOptions.push({text: `Hyper-Breasts`, updateSlave: {drugs: `hyper breast injections`}});
			} else {
				drugOptions.push({text: `Hyper Breasts`, disabled: `Boobs are too large`});
			}
		}
		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			if ((slave.boobs - slave.boobsImplant - slave.boobsMilk) > 100) {
				drugOptions.push({text: `Breast reducers`, updateSlave: {drugs: `breast redistributors`}});
			} else {
				drugOptions.push({text: `Breast reducers`, disabled: `Boobs are too small`});
			}
			if (slave.nipples === "huge" || slave.nipples === "puffy" || slave.nipples === "cute") {
				drugOptions.push({text: `Nipple reducers`, updateSlave: {drugs: `nipple atrophiers`}});
			} else {
				drugOptions.push({text: `Nipple reducers`, disabled: `Nipples are ${slave.nipples}`});
			}
		}
		if (slave.butt < 9) {
			drugOptions.push({text: `Buttocks`, updateSlave: {drugs: `butt injections`}});
		} else {
			drugOptions.push({text: `Buttocks`, disabled: `Butt is too large`});
		}
		if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
			if (slave.butt < 20) {
				drugOptions.push({text: `Hyper-Buttocks`, updateSlave: {drugs: `hyper butt injections`}});
			} else {
				drugOptions.push({text: `Hyper Buttocks`, disabled: `Butt is too large`});
			}
		}
		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			if (slave.butt - slave.buttImplant > 0) {
				drugOptions.push({text: `Butt reducers`, updateSlave: {drugs: `butt redistributors`}});
			} else {
				drugOptions.push({text: `Butt reducers`, disabled: `Butt is too small`});
			}
		}
		if (slave.lips <= 95 || (slave.lips <= 85 && V.seeExtreme !== 1)) {
			drugOptions.push({text: `Lips`, updateSlave: {drugs: `lip injections`}});
		} else {
			drugOptions.push({text: `Lips`, disabled: `Lips are too large`});
		}
		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			if (slave.lips - slave.lipsImplant > 0) {
				drugOptions.push({text: `Lip reducers`, updateSlave: {drugs: `lip atrophiers`}});
			} else {
				drugOptions.push({text: `Lip reducers`, disabled: `Lips are too small`});
			}
		}
		if (V.growthStim === 1) {
			if (canImproveHeight(slave)) {
				drugOptions.push({text: `Growth Stimulants`, updateSlave: {drugs: `growth stimulants`}});
			} else {
				drugOptions.push({text: `Growth Stimulants`, disabled: `Cannot increase height further`});
			}
		}
		drugOptions.push({text: `Fertility`, updateSlave: {drugs: `fertility drugs`}});
		if (V.seeHyperPreg === 1 && slave.indentureRestrictions < 1 && V.superFertilityDrugs === 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
			drugOptions.push({text: `Fertility+`, updateSlave: {drugs: `super fertility drugs`}});
		}
		if (slave.dick > 0) {
			if (slave.dick < 10) {
				drugOptions.push({text: `Penis enhancement`, updateSlave: {drugs: `penis enhancement`}});
			} else {
				drugOptions.push({text: `Penis enhancement`, disabled: `Dick is too large`});
			}
		} else {
			if (slave.clit < 5) {
				drugOptions.push({text: `Clitoris enhancement`, updateSlave: {drugs: `penis enhancement`}});
			} else {
				drugOptions.push({text: `Clitoris enhancement`, disabled: `Clit is too large`});
			}
		}
		if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
			if (slave.dick > 0) {
				if (slave.dick < 31) {
					drugOptions.push({text: `Hyper penis enhancement`, updateSlave: {drugs: `hyper penis enhancement`}});
				} else {
					drugOptions.push({text: `Hyper penis enhancement`, disabled: `Dick is too large`});
				}
			} else {
				if (slave.clit < 5) {
					drugOptions.push({text: `Hyper clitoris enhancement`, updateSlave: {drugs: `penis enhancement`}});
				} else {
					drugOptions.push({text: `Hyper clitoris enhancement`, disabled: `Clit is too large`});
				}
			}
		}
		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			if (slave.dick > 1) {
				drugOptions.push({text: `Penis reducers`, updateSlave: {drugs: `penis atrophiers`}});
			} else if (slave.dick === 1) {
				drugOptions.push({text: `Penis reducers`, disabled: `Dick is already at minimum size`});
			}
		}
		if (slave.dick > 0 && slave.dick < 11 && !canAchieveErection(slave) && slave.chastityPenis !== 1) {
			drugOptions.push({text: `Erectile dysfunction circumvention`, updateSlave: {drugs: `priapism agents`}});
		}
		if (slave.balls > 0) {
			drugOptions.push({text: `Testicle enhancement`, updateSlave: {drugs: `testicle enhancement`}});
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				drugOptions.push({text: `Hyper testicle enhancement`, updateSlave: {drugs: `hyper testicle enhancement`}});
			}
		}
		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			if (slave.balls > 1) {
				drugOptions.push({text: `Testicle reducers`, updateSlave: {drugs: `testicle atrophiers`}});
			} else if (slave.balls === 1) {
				drugOptions.push({text: `Testicle reducers`, disabled: `Balls are already at minimum size`});
			}
			if (slave.clit > 0) {
				drugOptions.push({text: `Clitoris reducers`, updateSlave: {drugs: `clitoris atrophiers`}});
			}
			if (slave.labia > 0) {
				drugOptions.push({text: `Labia reducers`, updateSlave: {drugs: `labia atrophiers`}});
			}
		}
		if (V.arcologies[0].FSYouthPreferentialistResearch === 1) {
			if (slave.visualAge > 18) {
				drugOptions.push({text: `Anti-aging cream`, updateSlave: {drugs: `anti-aging cream`}});
			} else {
				drugOptions.push({text: `Anti-aging cream`, disabled: `Slave already looks young enough`});
			}
		}
		drugOptions.push({text: `Steroids`, updateSlave: {drugs: `steroids`}});
		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			if (slave.weight > -95) {
				drugOptions.push({text: `Weight loss pills`, updateSlave: {drugs: `appetite suppressors`}});
			} else {
				drugOptions.push({text: `Weight loss pills`, disabled: `Slave is already at low weight`});
			}
		}
		if (V.precociousPuberty === 1 && V.pubertyHormones === 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
			if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 0) {
				drugOptions.push({text: `Female hormone injections`, updateSlave: {drugs: `female hormone injections`}});
			}
			if (slave.balls > 0 && slave.pubertyXY === 0) {
				drugOptions.push({text: `Male hormone injections`, updateSlave: {drugs: `male hormone injections`}});
			}
		}
		drugOptions.push({text: `Hormone enhancers`, updateSlave: {drugs: `hormone enhancers`}});
		drugOptions.push({text: `Hormone blockers`, updateSlave: {drugs: `hormone blockers`}});
		if (slave.boobs > 250 && slave.boobShape !== "saggy" && V.purchasedSagBGone === 1) {
			drugOptions.push({text: `Sag-B-Gone breast lifting cream`, updateSlave: {drugs: `sag-B-gone`}});
		}
	}

	let title = document.createElement('div');
	title.textContent = `Drugs: `;
	let chosenDrug = document.createElement('span');
	chosenDrug.textContent = `${capFirstChar(slave.drugs)} `;
	chosenDrug.style.fontWeight = "bold";
	title.append(chosenDrug);
	title.appendChild(App.UI.SlaveInteract.generateRows(drugLevelOptions, slave));
	el.append(title);

	let drugLinks = document.createElement('div');
	drugLinks.appendChild(App.UI.SlaveInteract.generateRows(drugOptions, slave));
	drugLinks.className = "choices";
	el.append(drugLinks);

	return jQuery('#drugs').empty().append(el);
};

App.UI.SlaveInteract.useSlaveDisplay = function(slave) {
	// Goal: Be able to write the entire "use her" block with only dom fragments.
	let el = document.createElement('div');

	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);

	/*
	Array of objects.  Each object follows the form: {
		text: "Link text",
		scene: "scene to include",
		goto: if another passage is needed
		updateSlave: update slave itself if needed, like {trust: 2},
		update: updates V.,
		note: if a note must appear after the link
	}
	*/
	const sexOptions = [];
	const fillFaceOptions = [];
	const fillAssOptions = [];
	// if no scene, it's just text, no link.  Italicize it.

	if (slave.fuckdoll === 0) {
		if (slave.vagina > -1) {
			if (canDoVaginal(slave)) {
				sexOptions.push({text: `Fuck ${him}`, scene: `FVagina`});
				if (canDoAnal(slave)) {
					sexOptions.push({text: `Use ${his} holes`, scene: `FButt`});
				}
				if (slave.bellyPreg >= 300000) {
					sexOptions.push({text: `Fuck ${him} on ${his} belly`, scene: `FBellyFuck`});
				}
				if (slave.bellyPreg >= 300000 && V.pregInventions >= 1) {
					sexOptions.push({text: `Fuck ${him} in ${his} maternity swing`, scene: `FMaternitySwing`});
				}
				if (slave.bellyPreg >= 300000 && V.pregInventions >= 1) {
					sexOptions.push({text: `Fuck ${him} with the help of ${his} assistants`, scene: `FAssistedSex`});
				}
				if (slave.bellyPreg >= 300000 && V.pregInventions >= 1) {
					sexOptions.push({text: `Fuck ${him} in your goo pool`, scene: `FPoolSex`});
				}
			} else {
				sexOptions.push({text: `Fuck ${him}`, disabled: `Remove ${his} chastity belt if you wish to fuck ${him}`});
			}
		}
		if (slave.bellyPreg >= 300000) {
			if (canDoVaginal(slave) || canDoAnal(slave)) {
				sexOptions.push({text: `Fuck ${him} on ${his} belly`, scene: `FBellyFuck`});
				if (V.pregInventions >= 1) {
					sexOptions.push({text: `Fuck ${him} in ${his} maternity swing`, scene: `FMaternitySwing`});
					sexOptions.push({text: `Fuck ${him} with the help of ${his} assistants`, scene: `FAssistedSex`});
					sexOptions.push({text: `Fuck ${him} in your goo pool`, scene: `FPoolSex`});
				}
			}
		}

		if (canDoAnal(slave)) {
			sexOptions.push({text: `Fuck ${his} ass`, scene: `FAnus`});
		} else {
			sexOptions.push({text: `Fuck ${his} ass`, disabled: `Remove ${his} chastity belt if you wish to fuck ${his} ass`});
		}
		sexOptions.push({text: `Use ${his} mouth`, scene: `FLips`});
		sexOptions.push({text: `Kiss ${him}`, scene: `FKiss`});
		if (hasAnyLegs(slave)) {
			sexOptions.push({text: `Have ${him} dance for you`, scene: `FDance`});
		}

		sexOptions.push({text: `Play with ${his} tits`, scene: `FBoobs`});

		sexOptions.push({text: `Caress ${him}`, scene: `FCaress`});

		sexOptions.push({text: `Give ${him} a hug`, scene: `FEmbrace`});
		if (V.cheatMode === 1) {
			sexOptions.push({text: `Pat ${his} head`, scene: `FPat`});
		}

		sexOptions.push({text: `Grope ${his} boobs`, scene: `FondleBoobs`});
		if (slave.nipples === "fuckable" && V.PC.dick > 0) {
			sexOptions.push({text: `Fuck ${his} nipples`, scene: `FNippleFuck`});
		}
		if (slave.lactation > 0 && slave.boobs >= 2000 && slave.belly < 60000 && hasAnyArms(slave)) {
			sexOptions.push({text: `Drink ${his} milk`, scene: `FSuckle`});
		}

		if (canDoAnal(slave)) {
			sexOptions.push({text: `Grope ${his} butt`, scene: `FondleButt`});
		}


		if (slave.vagina > -1) {
			if (canDoVaginal(slave)) {
				sexOptions.push({text: `Grope ${his} pussy`, scene: `FondleVagina`});
			}
		}

		if (slave.dick > 0) {
			if (!(slave.chastityPenis)) {
				sexOptions.push({text: `Grope ${his} dick`, scene: `FondleDick`});
				if (canPenetrate(slave)) {
					if (V.sexualOpeness === 1 || slave.toyHole === "dick") {
						sexOptions.push({text: `Ride ${his} dick`, scene: `FDick`});
					}
				}
			} else {
				sexOptions.push({text: `Use ${his} dick`, disabled: `Remove ${his} dick chastity belt if you wish to play with ${his} cock`});
			}
		}

		if (hasAnyLegs(slave) && V.PC.dick > 0) {
			sexOptions.push({text: `Get a footjob`, scene: `FFeet`});
		}

		if (canGetPregnant(slave) && (slave.geneticQuirks.superfetation !== 2 || V.geneticMappingUpgrade !== 0) && (slave.fuckdoll === 0) && V.seePreg !== 0) {
			if (canImpreg(slave, V.PC)) {
				sexOptions.push({text: `Impregnate ${him} yourself`, scene: `FPCImpreg`});
			}
			if (canImpreg(slave, slave)) {
				sexOptions.push({text: `Use ${his} own seed to impregnate ${him}`, scene: `FSlaveSelfImpreg`});
			}
			sexOptions.push({text: `Use another slave to impregnate ${him}`, scene: `FSlaveImpreg`});
		}
		if (slave.assignment !== "work in the dairy" && slave.assignment !== "be confined in the arcade" && slave.assignment !== "be confined in the cellblock") {
			if (V.dairyPiping === 1) {
				if ((V.milkPipeline > 88 && V.milkPipeline !== 0) || V.arcologies[0].FSPastoralistLaw === 1) {
					if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
						if (slave.inflationType === "milk" || slave.inflationType === "none") {
							fillAssOptions.push({text: `Milk`, scene: `FillUpButt`, updateSlave: {inflationType: "milk", inflationMethod: 2}});
							fillFaceOptions.push({text: `Milk`, scene: `FillUpFace`, updateSlave: {inflationType: "milk", inflationMethod: 1}});
						}
					}
				} else {
					fillAssOptions.push({text: `Milk`, disabled: `${V.dairyNameCaps} is not producing enough milk to pump through the pipes`});
					fillFaceOptions.push({text: `Milk`, disabled: `${V.dairyNameCaps} is not producing enough milk to pump through the pipes`});
				}
				if ((V.cumPipeline > 88 && V.cumPipeline !== 0) || V.arcologies[0].FSPastoralistLaw === 1) {
					if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
						if (slave.inflationType === "cum" || slave.inflationType === "none") {
							fillAssOptions.push({text: `Cum`, scene: `FillUpButt`, updateSlave: {inflationType: "cum", inflationMethod: 2}});
							fillFaceOptions.push({text: `Cum`, scene: `FillUpFace`, updateSlave: {inflationType: "cum", inflationMethod: 1}});
						}
					}
				} else {
					fillAssOptions.push({text: `Cum`, disabled: `${V.dairyNameCaps} is not producing enough cum to pump through the pipes`});
					fillFaceOptions.push({text: `Cum`, disabled: `${V.dairyNameCaps} is not producing enough cum to pump through the pipes`});
				}
			} /* dairyPiping === 1 */
			if (V.enema === 1) {
				if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
					if (slave.inflationType === "water" || slave.inflationType === "none") {
						fillAssOptions.push({text: `Water`, scene: `FillUpButt`, updateSlave: {inflationType: "water", inflationMethod: 2}});
					}
					if (V.medicalEnema === 1) {
						if (slave.inflationType === "aphrodisiac" || slave.inflationType === "none") {
							fillAssOptions.push({text: `Aphrodisiacs`, scene: `FillUpButt`, updateSlave: {inflationType: "aphrodisiac", inflationMethod: 2}});
						}
						if (slave.inflationType === "curative" || slave.inflationType === "none") {
							fillAssOptions.push({text: `Curatives`, scene: `FillUpButt`, updateSlave: {inflationType: "curative", inflationMethod: 2}});
						}
						if (slave.inflationType === "tightener" || slave.inflationType === "none") {
							fillAssOptions.push({text: `Rectal tighteners`, scene: `FillUpButt`, updateSlave: {inflationType: "tightener", inflationMethod: 2}});
						}
					}
				} /* inflation < 3 */
			} /* enema === 1 */
			if (V.wcPiping === 1) {
				if ((slave.inflation < 3 && slave.pregKnown === 0 && slave.bellyImplant < 1500) || slave.inflation < 1) {
					if (slave.inflationType === "urine" || slave.inflationType === "none") {
						fillAssOptions.push({text: `Urine`, scene: `FillUpButt`, updateSlave: {inflationType: "urine", inflationMethod: 2}});
					}
				}
			} /* wcPiping === 1 */
		} /* assigned to dairy or arcade */
		if (slave.inflation === 0 && slave.bellyImplant < 1500) {
			if (slave.assignment !== "work in the dairy" && slave.assignment !== "be confined in the arcade" && slave.assignment !== "be confined in the cellblock") {
				if (V.buckets === 1) {
					fillFaceOptions.push({text: `Two liters of slave food`, scene: `forceFeeding`, updateSlave: {inflation: 1, inflationType: "food", inflationMethod: 1}});
					if (slave.pregKnown === 0) {
						fillFaceOptions.push({text: `A gallon of slave food`, scene: `forceFeeding`, updateSlave: {inflation: 2, inflationType: "food", inflationMethod: 1}});
						fillFaceOptions.push({text: `Two gallons of slave food`, scene: `forceFeeding`, updateSlave: {inflation: 3, inflationType: "food", inflationMethod: 1}});
					}
				}
				fillFaceOptions.push({text: `Get another slave to do it`, goto: `SlaveOnSlaveFeedingWorkAround`});
			}
		}
		if (canDoVaginal(slave)) {
			sexOptions.push({text: `Have another slave fuck ${his} pussy`, scene: `FSlaveSlaveVag`});
		}
		if (canPenetrate(slave)) {
			sexOptions.push({text: `Have another slave ride ${his} cock`, scene: `FSlaveSlaveDick`});
		} else if (slave.clit >= 4) {
			sexOptions.push({text: `Have another slave ride ${his} clit-dick`, scene: `FSlaveSlaveDick`});
		}
		if (V.seeBestiality === 1 && V.cheatMode === 1) {
			if (V.farmyardKennels > 0 && V.activeCanine !== 0) {
				sexOptions.push({text: `Have a ${V.activeCanine.species} mount ${him}`, scene: `BeastFucked`, update: {animalType: "canine"}});
			}
			if (V.farmyardStable > 0 && V.activeHooved !== 0) {
				sexOptions.push({text: `Let a ${V.activeHooved.species} mount ${him}`, scene: `BeastFucked`, update: {animalType: "hooved"}});
			}
			if (V.farmyardCages > 0 && V.activeFeline !== 0) {
				sexOptions.push({text: `Have a ${V.activeFeline.species} mount ${him}`, scene: `BeastFucked`, update: {animalType: "feline"}});
			}
		}
		sexOptions.push({text: `Abuse ${him}`, scene: `FAbuse`});
		if (V.seeIncest === 1) {
			if (V.familyTesting === 1) {
				const availRelatives = availableRelatives(slave);
				if (availRelatives.mother) {
					sexOptions.push({text: `Fuck ${him} with ${his} mother`, scene: `FRelation`, update: {partner: "mother"}});
				} else if (availRelatives.motherName !== null) {
					sexOptions.push({text: `${His} mother, ${availRelatives.motherName}, is unavailable`});
				}
				/*
				if (availRelatives.father) {
					sexOptions.push({text: `Fuck ${him} with ${his} father`, scene: `FRelation`, update: {partner: "father"}});
				} else if (availRelatives.fatherName !== null) {
					sexOptions.push({text: `${His} father, ${availRelatives.motherName}, is unavailable`});
				}
				*/
				if (slave.daughters > 0) {
					if (availRelatives.daughters === 0) {
						if (slave.daughters === 1) {
							sexOptions.push({text: `Fuck ${him} with ${his} daughter`, disabled: `${His} ${availRelatives.oneDaughterRel} is unavailable`});
						} else {
							sexOptions.push({text: `Fuck ${him} with one of ${his} daughters`, disabled: `${His} daughters are unavailable`});
						}
					} else {
						if (slave.daughters === 1) {
							sexOptions.push({text: `Fuck ${him} with ${his} ${availRelatives.oneDaughterRel}`, scene: `FRelation`, update: {partner: "daughter"}});
						} else {
							sexOptions.push({text: `Fuck ${him} with one of ${his} daughters`, scene: `FRelation`, update: {partner: "daughter"}});
						}
						/*
						if (availRelatives.daughters > 1) {
							sexOptions.push({text: `Fuck ${him} with ${his} daughters`, scene: `FRelation`, update: {partner: "daughter"}});
						}
						*/
					}
				}
				if (slave.sisters > 0) {
					if (availRelatives.sisters === 0) {
						if (slave.sisters === 1) {
							sexOptions.push({text: `Fuck ${him} with ${his} sister`, disabled: `${His} ${availRelatives.oneSisterRel} is unavailable`});
						} else {
							sexOptions.push({text: `Fuck ${him} with one of ${his} sisters`, disabled: `${His} sisters are unavailable`});
						}
					} else {
						if (slave.sisters === 1) {
							sexOptions.push({text: `Fuck ${him} with ${his} ${availRelatives.oneSisterRel}`, scene: `FRelation`, update: {partner: "sister"}});
						} else {
							sexOptions.push({text: `Fuck ${him} with one of ${his} sisters`, scene: `FRelation`, update: {partner: "sister"}});
						}
						/*
						if (availRelatives.sisters > 1) {
							sexOptions.push({text: `Fuck ${him} with ${his} sisters`, scene: `FRelation`, update: {partner: "sisters}});
						}
						*/
					}
				}
			} else {
				if (slave.relation !== 0) {
					let assayedSlave = getSlave(slave.relationTarget);
					const {
						daughter: daughter2,
						mother: mother2,
						sister: sister2
					} = getPronouns(assayedSlave);
					if (isSlaveAvailable(assayedSlave)) {
						if (slave.relation === "mother") {
							sexOptions.push({text: `Fuck ${him} with ${his} ${daughter2}`, scene: `FRelation`, update: {partner: "relation"}});
						} else if (slave.relation === "daughter") {
							sexOptions.push({text: `Fuck ${him} with ${his} ${mother2}`, scene: `FRelation`, update: {partner: "relation"}});
						} else if (slave.relation === "sister") {
							sexOptions.push({text: `Fuck ${him} with ${his} ${sister2}`, scene: `FRelation`, update: {partner: "relation"}});
						} else if (slave.relation === "twin") {
							sexOptions.push({text: `Fuck ${him} with ${his} twin`, scene: `FRelation`, update: {partner: "relation"}});
						}
					} else {
						sexOptions.push({text: `Fuck ${him} with ${his} sibling`, disabled: `${assayedSlave.slaveName} is unavailable`});
					}
				}
			}
		}
		if (slave.relationship > 0) {
			const lover = getSlave(slave.relationshipTarget);
			if (isSlaveAvailable(lover)) {
				sexOptions.push({text: `Fuck ${him} with ${his} ${relationshipTermShort(slave)} ${SlaveFullName(lover)}`, scene: `FRelation`, update: {partner: "relationship"}});
			} else {
				if (lover.assignment === "be your agent") {
					if (slave.broodmother < 2) {
						sexOptions.push({text: `Send ${him} to live with your agent ${SlaveFullName(lover)}`, goto: `Agent Company`, update: {subSlave: lover}});
					} else {
						sexOptions.push({text: `A hyper-broodmother cannot be sent to live with your agent`});
					}
				} else {
					sexOptions.push({text: `${SlaveFullName(lover)} is unavailable`});
				}
			}
		}
		if (slave.rivalryTarget !== 0 && hasAllLimbs(slave)) {
			const rival = getSlave(slave.relationshipTarget);
			if (isSlaveAvailable(rival) && hasAnyLegs(rival)) {
				sexOptions.push({text: `Abuse ${his} rival with ${him}`, scene: `FRival`});
			}
		}
		if (slave.fetish !== "mindbroken" && (canTalk(slave) || hasAnyArms(slave))) {
			sexOptions.push({text: `Ask ${him} about ${his} feelings`, scene: `FFeelings`});
			if (V.PC.dick > 0) {
				sexOptions.push({text: `Make ${him} beg`, scene: `FBeg`});
			}
		}
		if (slave.devotion >= 100 && slave.relationship < 0 && slave.relationship > -3) {
			sexOptions.push({text: `Talk to ${him} about relationships`, goto: `Matchmaking`, update: {subSlave: 0, eventSlave: slave}});
		}
		let ML = V.marrying.length;
		if ((V.MixedMarriage === 1 || V.cheatMode === 1) && slave.relationship !== 5 && slave.relationship !== -3) {
			if (V.marrying.includes(slave.ID)) {
				sexOptions.push({text: `Marry ${him}`, disabled: `You are already marrying ${him} this weekend`});
			} else {
				if (ML < 2) {
					if (V.cheatMode === 1 || ML === 0) {
						sexOptions.push({text: `Marry ${him}`, goto: "FMarry"});
					} else {
						sexOptions.push({text: `Marry ${him}`, disabled: `You already have a wedding planned for this weekend`});
					}
				} else {
					sexOptions.push({text: `Marry ${him}`, disabled: `You can only marry up to two slaves per week`});
				}
			}
		}
		if (V.cheatMode === 1) {
			sexOptions.push({text: `Check ${his} stats`, scene: `Slave Stats`});
		}
	} else {
		/* IS A FUCKDOLL */
		sexOptions.push({text: `Fuck ${his} face hole`, scene: `FFuckdollOral`});
		if (canDoVaginal(slave)) {
			sexOptions.push({text: `Fuck ${his} front hole`, scene: `FFuckdollVaginal`});
		}
		if (canGetPregnant(slave) && (slave.geneticQuirks.superfetation !== 2 || V.geneticMappingUpgrade !== 0) && V.seePreg !== 0) {
			if (canImpreg(slave, V.PC)) {
				sexOptions.push({text: `Put a baby in ${him}`, scene: `FFuckdollImpreg`});
			}
		}
		if (canDoAnal(slave)) {
			sexOptions.push({text: `Fuck ${his} rear hole`, scene: `FFuckdollAnal`});
		}
	}
	let activeSlaveRepSacrifice = repGainSacrifice(slave, V.arcologies[0]);
	if (activeSlaveRepSacrifice > 0 && V.arcologies[0].FSPaternalist === "unset" && (slave.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || V.arcologies[0].FSRestart === "unset")) {
		sexOptions.push({
			text: `Sacrifice ${him} on the altar`,
			goto: `Aztec Slave Sacrifice`,
			note: `This will kill ${him} and gain you ${activeSlaveRepSacrifice} reputation`,
			update: {sacrificeType: "life"}
		});
	}
	el.append(`Or use ${him} here: `);
	el.appendChild(generateRows(sexOptions));
	if (!jQuery.isEmptyObject(fillFaceOptions)) {
		let fill = document.createElement('div');
		fill.appendChild(document.createTextNode(` Fill ${his} mouth with: `));
		fill.appendChild(generateRows(fillFaceOptions));
		el.appendChild(fill);
	}
	if (!jQuery.isEmptyObject(fillAssOptions)) {
		let fill = document.createElement('div');
		fill.appendChild(document.createTextNode(` Fill ${his} ass with: `));
		fill.appendChild(generateRows(fillAssOptions));
		el.appendChild(fill);
	}

	function generateRows(sexArray) {
		let row = document.createElement('span');
		for (let i = 0; i < sexArray.length; i++) {
			let link;
			const separator = document.createTextNode(` | `);
			const keys = Object.keys(sexArray[i]);

			// Test to see if there was a problem with the key
			for (let j = 0; j < keys.length; j++) {
				if (["text", "scene", "goto", "updateSlave", "update", "note", "disabled"].includes(keys[j])) {
					continue;
				} else {
					sexArray[i].text += " ERROR, THIS SCENE WAS NOT ENTERED CORRECTLY";
					console.log("Trash found while generateRows() was running: " + keys[j] + ": " + sexArray[i][keys[j]]);
					break;
				}
			}
			// is it just text?
			if (sexArray[i].disabled) {
				link = App.UI.DOM.disabledLink(sexArray[i].text, [sexArray[i].disabled]);
			} else {
				let passage = "";
				if (sexArray[i].goto) {
					passage = sexArray[i].goto;
				}

				// Set up the link
				link = App.UI.DOM.link(
					sexArray[i].text,
					() => { click(sexArray[i]); },
					[],
					passage
				);

				// add a note node if required
				if (sexArray[i].note) {
					let note = document.createElement('span');
					note.textContent = `${sexArray[i].note} `;
					note.className = "note";
					link.appendChild(note);
				}
			}
			row.appendChild(link);
			if (i < sexArray.length - 1) {
				row.appendChild(separator);
			}
		}

		return row;

		function click(sexOption) {
			if (sexOption.updateSlave) {
				Object.assign(slave, sexOption.updateSlave);
			}
			if (sexOption.update) {
				Object.assign(V, sexOption.update);
			}

			// Scene
			if (sexOption.scene) {
				App.UI.replace('#miniscene', `<<include "${sexOption.scene}">>`);
			} else if (sexOption.goto) {
				App.UI.replace('#miniscene', `<<goto "${sexOption.goto}">>`);
			}

			App.UI.SlaveInteract.refreshAll(V.slaves[V.slaveIndices[V.activeSlave.ID]]);
			return;
		}
	}
	return jQuery('#useSlave').empty().append(el);
};

App.UI.SlaveInteract.bloating = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	let bloating = document.createElement('div');
	if (slave.inflation > 0) {
		let intro = document.createElement('span');
		intro.textContent = "Required Bloating";
		intro.style.textDecoration = "underline";
		bloating.append(intro);

		bloating.append(": ");

		let requirement = document.createElement('span');
		requirement.style.fontWeight = "bold";
		requirement.id = "inflate";
		if (slave.inflation === 3) {
			requirement.textContent = `${He} is required to keep 2 gallons of ${slave.inflationType} in ${him} at all times`;
		} else if (slave.inflation === 2) {
			requirement.textContent = `${He} is required to keep 4 liters of ${slave.inflationType} in ${him} at all times`;
		} else if (slave.inflation === 1) {
			requirement.textContent = `${He} is required to keep 2 liters of ${slave.inflationType} in ${him} at all times`;
		}
		bloating.append(requirement);
		bloating.append(". ");

		if (slave.inflationMethod === 3) {
			let link = App.UI.DOM.link(
				`Let ${him} deflate`,
				() => {
					slave.inflation = 0,
						slave.inflationType = "none",
						slave.inflationMethod = 0,
						slave.cumSource = 0,
						slave.milkSource = 0,
						SetBellySize(slave),
						App.UI.SlaveInteract.refreshAll(slave);
				},
			);
			bloating.append(link);
		} else {
			let link = App.UI.DOM.link(
				`Let ${him} deflate`,
				() => {
					slave.inflation = 0,
						slave.inflationType = "none",
						slave.inflationMethod = 0,
						SetBellySize(slave),
						App.UI.SlaveInteract.refreshAll(slave);
				},
			);
			bloating.append(link);
		}
	}
	// make sure it updates itself after run
	return jQuery('#bloating').empty().append(bloating);
};

App.UI.SlaveInteract.fertility = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	const separator = document.createTextNode(` | `);
	let fertilityblock = document.createElement('span');
	let link = document.createElement('div');
	link.className = "choices";
	if (slave.ovaries === 1 || slave.mpreg === 1 || slave.preg > 0) {
		let note = document.createTextNode(``);
		note.className = "note";
		if (slave.preg < -1) {
			note.textContent += `${He} is sterile`;
		} else if (slave.pubertyXX === 0 && slave.preg < 1) {
			note.textContent += `${He} is not yet fertile`;
		} else if (slave.ovaryAge >= 47 && slave.preg < 1) {
			note.textContent += `${He} is too old to become pregnant`;
			if (slave.preg === -1) {
				slave.preg = 0;
				SetBellySize(slave);
			}
		} else if (slave.broodmotherOnHold === 1) {
			note.textContent += `${His} pregnancy implant is turned off`;
			if (slave.broodmotherCountDown > 0) {
				note.textContent += `${he} is expected to be completely emptied of ${his} remaining brood in ${slave.broodmotherCountDown} week`;
				if (slave.broodmotherCountDown > 1) {
					note.textContent += `s`;
				}
				note.textContent += `.`;
				link.append(App.UI.DOM.link(
					`Turn on implant`,
					() => {
						slave.broodmotherOnHold = 0,
							slave.broodmotherCountDown = 0;
					},
					[],
					"Slave Interact"
				));
				fertilityblock.append(link);
			}
		} else if (slave.preg >= -1) {
			fertilityblock.append("Contraception: ");
			let fertility = document.createElement('span');
			// fertility.id = "fertility";
			fertility.style.fontWeight = "bold";
			if (slave.preg === -1) {
				fertility.textContent = "using contraceptives";
			} else if (slave.pregWeek < 0) {
				fertility.textContent = "postpartum";
			} else if (slave.preg === 0) {
				fertility.textContent = "fertile";
			} else if (slave.preg < 4) {
				fertility.textContent = "may be pregnant";
			} else {
				fertility.textContent = `${slave.preg} weeks pregnant`;
			}
			fertility.textContent += ". ";
			fertilityblock.appendChild(fertility);
			if (slave.preg > 0 && V.pregnancyMonitoringUpgrade === 1) {
				fertilityblock.append(App.UI.DOM.passageLink("Inspect pregnancy", "Analyze Pregnancy"));
				fertilityblock.append(separator);
			}
			if (slave.preg === 0) {
				link.appendChild(App.UI.DOM.link(
					`Use contraceptives`,
					() => {
						slave.preg = -1,
							App.UI.SlaveInteract.refreshAll(slave);
					},
				));
				fertilityblock.append(link);
			} else if (slave.preg === -1) {
				link.appendChild(App.UI.DOM.link(
					`Let ${him} get pregnant`,
					() => {
						slave.preg = 0,
							App.UI.SlaveInteract.refreshAll(slave);
					},
				));
				fertilityblock.append(link);
			} else if (slave.induce === 1) {
				note.textContent += `Hormones are being slipped into ${his} food; ${he} will give birth suddenly and rapidly this week`;
			} else if (slave.preg > slave.pregData.normalBirth - 2 && slave.preg > slave.pregData.minLiveBirth && slave.broodmother === 0 && slave.labor === 0) {
				link.appendChild(App.UI.DOM.link(
					`Induce labor`,
					() => {
						slave.labor = 1,
							slave.induce = 1,
							V.birthee = 1;
					},
					[],
					"Slave Interact"
				));
				fertilityblock.append(link);
				fertilityblock.appendChild(separator);
				fertilityblock.append(App.UI.DOM.passageLink(`Give ${him} a cesarean section`, "csec"));
			} else if (slave.broodmother > 0) {
				if (slave.broodmotherOnHold !== 1) {
					link.appendChild(App.UI.DOM.link(
						`Turn off implant`,
						() => {
							slave.broodmotherOnHold = 1,
								slave.broodmotherCountDown = 38 - WombMinPreg(slave);
						},
					));
					fertilityblock.append(link);
				}
				if (slave.broodmotherOnHold !== 1 && slave.preg >= 36) {
					fertilityblock.appendChild(separator);
				}
				fertilityblock.appendChild(separator);
				if (slave.preg > 37) {
					fertilityblock.append(App.UI.DOM.passageLink(`Induce mass childbirth`, "BirthStorm"));
				}
			} else if (slave.preg > slave.pregData.minLiveBirth) {
				link.appendChild(App.UI.DOM.link(
					`Give  ${him} a cesarean section`,
					() => {
						slave.broodmotherOnHold = 0,
							slave.broodmotherCountDown = 0;
					},
					[],
					"csec"
				));
				fertilityblock.append(link);
			} else if (slave.preg > 0 && slave.breedingMark === 1 && V.propOutcome === 1 && V.arcologies[0].FSRestart !== "unset" && V.eugenicsFullControl !== 1 && (slave.pregSource === -1 || slave.pregSource === -6)) {
				note.textContent += "You are forbidden from aborting an Elite child";
			} else if (slave.preg > 0) {
				link.appendChild(App.UI.DOM.link(
					`Abort ${his} pregnancy`,
					() => {
						slave.broodmotherOnHold = 0,
							slave.broodmotherCountDown = 0;
					},
					[],
					"Abort"
				));
				fertilityblock.append(link);
			}
			fertilityblock.append(note);
		}
	}
	if (
		(slave.pregKnown === 1) &&
		(V.pregSpeedControl === 1) &&
		(
			slave.breedingMark !== 1 ||
			V.propOutcome === 0 ||
			V.eugenicsFullControl === 1 ||
			V.arcologies[0].FSRestart === "unset"
		) &&
		(slave.indentureRestrictions < 1) &&
		(slave.broodmother === 0) &&
		V.seePreg !== 0
	) {
		let title = document.createElement('div');
		let underline = document.createElement('span');
		link = document.createElement('div');
		link.className = "choices";

		underline.style.textDecoration = "underline";
		underline.textContent = "Pregnancy control";
		title.appendChild(underline);
		title.append(": ");

		if (slave.pregControl === "labor suppressors") {
			title.append("Labor is suppressed. ");
		} else if (slave.pregControl === "slow gestation") {
			title.append("Slowed gestation speed. ");
		} else if (slave.pregControl === "speed up") {
			title.append("Faster gestation speed, staffed clinic recommended. ");
		} else {
			title.append("Normal gestation and birth. ");
		}
		fertilityblock.appendChild(title);
		if (slave.preg >= slave.pregData.minLiveBirth) {
			if (slave.pregControl === "labor suppressors") {
				link.appendChild(App.UI.DOM.link(
					`Normal Birth`,
					() => {
						slave.pregControl = "none",
							App.UI.SlaveInteract.fertility(slave);
					},
				));
			} else {
				link.appendChild(App.UI.DOM.link(
					`Suppress Labor`,
					() => {
						slave.pregControl = "labor suppressors",
							App.UI.SlaveInteract.fertility(slave);
					},
				));
			}
		} else if (slave.preg < slave.pregData.normalBirth) {
			if (slave.pregControl !== "none") {
				link.appendChild(App.UI.DOM.link(
					`Normal Gestation`,
					() => {
						slave.pregControl = "none",
							App.UI.SlaveInteract.fertility(slave);
					},
				));
			}
			if (slave.pregControl !== "slow gestation") {
				link.append(separator);
				link.appendChild(App.UI.DOM.link(
					`Slow Gestation`,
					() => {
						slave.pregControl = "slow gestation",
							App.UI.SlaveInteract.fertility(slave);
					},
				));
			}
			if (slave.pregControl !== "speed up") {
				link.append(separator);
				link.appendChild(App.UI.DOM.link(
					`Fast Gestation`,
					() => {
						slave.pregControl = "speed up",
							App.UI.SlaveInteract.fertility(slave);
					},
				));
			}
		}
		fertilityblock.appendChild(link);
	}
	return jQuery('#fertilityblock').empty().append(fertilityblock);
};

App.UI.SlaveInteract.curatives = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	const curativeOptions = [];

	curativeOptions.push({text: `None`, updateSlave: {curatives: 0}});
	curativeOptions.push({text: `Preventatives`, updateSlave: {curatives: 1}});
	curativeOptions.push({text: `Curatives`, updateSlave: {curatives: 2}});

	let el = document.createElement('div');
	let title = document.createElement('div');
	title.append(`Health: `);
	let chosenOption = document.createElement('span');
	chosenOption.style.fontWeight = "bold";
	if (slave.curatives > 1) {
		chosenOption.textContent = `curatives`;
	} else if (slave.curatives > 0) {
		chosenOption.textContent = `preventatives`;
	} else {
		chosenOption.textContent = `none`;
	}
	title.appendChild(chosenOption);
	title.append(`.`);
	let link = document.createElement('div');
	link.className = "choices";
	link.appendChild(App.UI.SlaveInteract.generateRows(curativeOptions, slave));
	el.append(title);
	el.append(link);
	return jQuery('#curatives').empty().append(el);
};

App.UI.SlaveInteract.aphrodisiacs = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	const aphrodisiacOptions = [];

	aphrodisiacOptions.push({text: `None`, updateSlave: {aphrodisiacs: 0}});
	aphrodisiacOptions.push({text: `Aphrodisiacs`, updateSlave: {aphrodisiacs: 1}});
	aphrodisiacOptions.push({text: `Extreme aphrodisiacs`, updateSlave: {aphrodisiacs: 2}});
	aphrodisiacOptions.push({text: `Anaphrodisiacs`, updateSlave: {aphrodisiacs: -1}, note: `Supresses libido`});


	let el = document.createElement('div');
	let title = document.createElement('div');
	title.append(`Aphrodisiacs: `);
	let chosenOption = document.createElement('span');
	chosenOption.style.fontWeight = "bold";
	if (slave.aphrodisiacs > 1) {
		chosenOption.textContent = `extreme`;
	} else if (slave.aphrodisiacs > 0) {
		chosenOption.textContent = `applied`;
	} else if (slave.aphrodisiacs === -1) {
		chosenOption.textContent = `anaphrodisiacs`;
	} else {
		chosenOption.textContent = `none`;
	}
	title.appendChild(chosenOption);
	title.append(`.`);
	let link = document.createElement('div');
	link.className = "choices";
	link.appendChild(App.UI.SlaveInteract.generateRows(aphrodisiacOptions, slave));
	el.append(title);
	el.append(link);
	return jQuery('#aphrodisiacs').empty().append(el);
};

App.UI.SlaveInteract.incubator = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	V.reservedChildren = FetusGlobalReserveCount("incubator");
	let _reservedIncubator = WombReserveCount(slave, "incubator");
	let _reservedNursery = WombReserveCount(slave, "nursery");
	let _WL = slave.womb.length;
	let el = document.createElement('div');

	if (V.incubator > 0) {
		if (slave.preg > 0 && slave.broodmother === 0 && slave.pregKnown === 1 && slave.eggType === "human") {
			if ((slave.assignment === "work in the dairy" && V.dairyPregSetting > 0) || (slave.assignment === "work in the farmyard" && V.farmyardBreeding > 0)) {} else {
				let title = document.createElement('div');
				let link = document.createElement('div');
				link.className = "choices";
				if (_WL - _reservedNursery === 0) {
					title.textContent = `${His} children are already reserved for ${V.nurseryName}`;
					title.style.fontStyle = "italic";
				} else {
					V.freeTanks = (V.incubator - V.tanks.length);
					if (_reservedIncubator > 0) {
						if (_WL === 1) {
							title.textContent = `${His} child will be placed in ${V.incubatorName}. `;
						} else if (_reservedIncubator < _WL) {
							title.textContent = `${_reservedIncubator} of ${his} children will be placed in ${V.incubatorName}.`;
						} else if (_WL === 2) {
							title.textContent = `Both of ${his} children will be placed in ${V.incubatorName}. `;
						} else {
							title.textContent = `All ${_reservedIncubator} of ${his} children will be placed in ${V.incubatorName}. `;
						}
						if ((_reservedIncubator + _reservedNursery < _WL) && (V.reservedChildren < V.freeTanks)) {
							link.appendChild(
								App.UI.DOM.link(
									`Keep another child`,
									() => {
										WombAddToGenericReserve(slave, "incubator", 1);
										V.slaves[V.slaveIndices[slave.ID]] = slave;
										V.reservedChildren = FetusGlobalReserveCount("incubator");
										App.UI.SlaveInteract.refreshAll(slave);
									}
								)
							);
							if (_reservedIncubator > 0) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep one less child`,
										() => {
											WombCleanGenericReserve(slave, "incubator", 1);
											V.slaves[V.slaveIndices[slave.ID]] = slave;
											V.reservedChildren = FetusGlobalReserveCount("incubator");
											App.UI.SlaveInteract.refreshAll(slave);
										}
									)
								);
							}
							if (_reservedIncubator > 1) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep none of ${his} children`,
										() => {
											WombCleanGenericReserve(slave, "incubator", 9999);
											V.slaves[V.slaveIndices[slave.ID]] = slave;
											V.reservedChildren = FetusGlobalReserveCount("incubator");
											App.UI.SlaveInteract.refreshAll(slave);
										}
									)
								);
							}
							if ((V.reservedChildren + _WL - _reservedIncubator) <= V.freeTanks) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep the rest of ${his} children`,
										() => {
											WombAddToGenericReserve(slave, "incubator", 9999);
											V.slaves[V.slaveIndices[slave.ID]] = slave;
											V.reservedChildren = FetusGlobalReserveCount("incubator");
											App.UI.SlaveInteract.refreshAll(slave);
										}
									)
								);
							}
						} else if ((_reservedIncubator === _WL) || (V.reservedChildren === V.freeTanks) || (_reservedIncubator - _reservedNursery >= 0)) {
							link.appendChild(
								App.UI.DOM.link(
									`Keep one less child`,
									() => {
										WombCleanGenericReserve(slave, "incubator", 1);
										V.slaves[V.slaveIndices[slave.ID]] = slave;
										V.reservedChildren = FetusGlobalReserveCount("incubator");
										App.UI.SlaveInteract.refreshAll(slave);
									}
								)
							);
							if (_reservedIncubator > 1) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep none of ${his} children`,
										() => {
											WombCleanGenericReserve(slave, "incubator", 9999);
											V.slaves[V.slaveIndices[slave.ID]] = slave;
											V.reservedChildren = FetusGlobalReserveCount("incubator");
											App.UI.SlaveInteract.refreshAll(slave);
										}
									)
								);
							}
						}
					} else if (V.reservedChildren < V.freeTanks) {
						title.textContent = `${He} is pregnant and you have `;
						if (V.freeTanks === 1) {
							title.textContent += `an `;
						}
						let tank = document.createElement('span');
						tank.className = "lime";
						tank.textContent = `available aging tank`;
						if (V.freeTanks > 1) {
							tank.textContent += `s`;
						}
						tank.textContent += `.`;
						let _cCount = (_WL > 1 ? "a" : "the");
						link.appendChild(
							App.UI.DOM.link(
								`Keep ${_cCount} child`,
								() => {
									WombAddToGenericReserve(slave, "incubator", 1);
									V.slaves[V.slaveIndices[slave.ID]] = slave;
									V.reservedChildren = FetusGlobalReserveCount("incubator");
									App.UI.SlaveInteract.refreshAll(slave);
								}
							)
						);
						title.appendChild(tank);
						if ((_WL > 1) && (V.reservedChildren + _WL) <= V.freeTanks) {
							link.append(` | `);
							link.appendChild(
								App.UI.DOM.link(
									`Keep all of ${his} children`,
									() => {
										WombAddToGenericReserve(slave, "incubator", 9999);
										V.slaves[V.slaveIndices[slave.ID]] = slave;
										V.reservedChildren = FetusGlobalReserveCount("incubator");
										App.UI.SlaveInteract.refreshAll(slave);
									}
								)
							);
						}
					} else if (V.reservedChildren === V.freeTanks) {
						title.textContent = `You have no available tanks for ${his} children. `;
					}
				}
				el.append(title);
				el.append(link);
			}
		}
	}
	return jQuery('#incubator').empty().append(el);
};

App.UI.SlaveInteract.nursery = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
		he,
		him,
		his,
		hers,
		himself,
		boy,
		He,
		His
	} = getPronouns(slave);
	let el = document.createElement('div');
	if (V.nursery > 0) {
		V.reservedChildrenNursery = FetusGlobalReserveCount("nursery");
		let _reservedIncubator = WombReserveCount(slave, "incubator");
		let _reservedNursery = WombReserveCount(slave, "nursery");
		let _WL = slave.womb.length;
		if (slave.preg > 0 && slave.broodmother === 0 && slave.pregKnown === 1 && slave.eggType === "human") {
			if ((slave.assignment === "work in the dairy" && V.dairyPregSetting > 0) || (slave.assignment === "work in the farmyard" && V.farmyardBreeding > 0)) {} else {
				let title = document.createElement('div');
				let link = document.createElement('div');
				link.className = "choices";
				if (_WL - _reservedIncubator === 0) {
					V.reservedChildren = 0;
					title.textContent = `${His} children are already reserved for ${V.incubatorName}`;
					title.style.fontStyle = "italic";
				} else {
					V.freeCribs = (V.nursery - V.cribs.length);
					if (_reservedNursery > 0) {
						if (_WL === 1) {
							title.textContent = `${His} child will be placed in ${V.nurseryName}. `;
						} else if (_reservedNursery < _WL) {
							title.textContent = `_reservedNursery of ${his} children will be placed in ${V.nurseryName}.`;
						} else if (_WL === 2) {
							title.textContent = `Both of ${his} children will be placed in ${V.nurseryName}. `;
						} else {
							title.textContent = `All ${_reservedNursery} of ${his} children will be placed in ${V.nurseryName}. `;
						}
						if ((_reservedIncubator + _reservedNursery < _WL) && (V.reservedChildrenNursery < V.freeCribs)) {
							link.appendChild(
								App.UI.DOM.link(
									`Keep another child`,
									() => {
										WombAddToGenericReserve(slave, "nursery", 1);
										V.slaves[V.slaveIndices[slave.ID]] = slave;
										V.reservedChildren = FetusGlobalReserveCount("nursery");
										App.UI.SlaveInteract.refreshAll(slave);
									}
								)
							);

							if (_reservedNursery > 0) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep one less child`,
										() => {
											WombCleanGenericReserve(slave, "nursery", 1);
											V.slaves[V.slaveIndices[slave.ID]] = slave;
											V.reservedChildren = FetusGlobalReserveCount("nursery");
											App.UI.SlaveInteract.refreshAll(slave);
										}
									)
								);
							}
							if (_reservedNursery > 1) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep none of ${his} children`,
										() => {
											WombCleanGenericReserve(slave, "nursery", 9999);
											App.UI.SlaveInteract.refreshAll(slave);
											// TODO: Copying this from the SC, but it's not three lines like the others? -LCD
										}
									)
								);
							}
							if ((V.reservedChildrenNursery + _WL - _reservedNursery) <= V.freeCribs) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep the rest of ${his} children`,
										() => {
											WombAddToGenericReserve(slave, "nursery", 9999);
											App.UI.SlaveInteract.refreshAll(slave);
											// TODO: Copying this from the SC, but it's not three lines like the others? -LCD
										}
									)
								);
							}
						} else if ((_reservedNursery === _WL) || (V.reservedChildrenNursery === V.freeCribs) || (_reservedNursery - _reservedIncubator >= 0)) {
							link.appendChild(
								App.UI.DOM.link(
									`Keep one less child`,
									() => {
										WombCleanGenericReserve(slave, "nursery", 1);
										V.slaves[V.slaveIndices[slave.ID]] = slave;
										V.reservedChildren = FetusGlobalReserveCount("nursery");
										App.UI.SlaveInteract.refreshAll(slave);
									}
								)
							);

							if (_reservedNursery > 1) {
								link.append(` | `);
								link.appendChild(
									App.UI.DOM.link(
										`Keep none of ${his} children`,
										() => {
											WombCleanGenericReserve(slave, "nursery", 9999);
											V.slaves[V.slaveIndices[slave.ID]] = slave;
											V.reservedChildren = FetusGlobalReserveCount("nursery");
											App.UI.SlaveInteract.refreshAll(slave);
										}
									)
								);
							}
						}
					} else if (V.reservedChildrenNursery < V.freeCribs) {
						title.textContent = `${He} is pregnant and you have `;
						if (V.freeCribs === 1) {
							title.textContent += `an `;
						}
						let crib = document.createElement('span');
						crib.className = "lime";
						crib.textContent = `available room`;
						if (V.freeCribs > 1) {
							crib.textContent += `s`;
						}
						crib.textContent += `.`;
						let _cCount = (_WL > 1 ? "a" : "the");
						link.appendChild(
							App.UI.DOM.link(
								`Keep ${_cCount} child`,
								() => {
									WombAddToGenericReserve(slave, "nursery", 1);
									V.slaves[V.slaveIndices[slave.ID]] = slave;
									V.reservedChildren = FetusGlobalReserveCount("nursery");
									App.UI.SlaveInteract.refreshAll(slave);
								}
							)
						);
						title.appendChild(crib);
						if ((_WL > 1) && (V.reservedChildrenNursery + _WL) <= V.freeCribs) {
							link.append(` | `);
							link.appendChild(
								App.UI.DOM.link(
									`Keep all of ${his} children`,
									() => {
										WombAddToGenericReserve(slave, "nursery", 9999);
										V.slaves[V.slaveIndices[slave.ID]] = slave;
										V.reservedChildren = FetusGlobalReserveCount("nursery");
										App.UI.SlaveInteract.refreshAll(slave);
									}
								)
							);
						}
					} else if (V.reservedChildrenNursery === V.freeCribs) {
						title.textContent = `You have no available rooms for ${his} children. `;
					}
				}
				el.append(title);
				el.append(link);
			}
		}
	}
	return jQuery('#nursery').empty().append(el);
};

App.UI.SlaveInteract.custom = (function() {
	let el;
	let label;
	let links;
	let result;
	let textbox;
	return custom;

	function custom(slave) {
		let title;
		el = document.createElement('div');

		el.appendChild(intro(slave));

		title = document.createElement('h3');
		title.textContent = `Art`;
		el.appendChild(title);
		el.appendChild(customSlaveImage(slave));
		el.appendChild(customHairImage(slave));

		title = document.createElement('h3');
		title.textContent = `Names`;
		el.appendChild(title);
		el.appendChild(playerTitle(slave));
		el.appendChild(slaveFullName(slave));

		title = document.createElement('h3');
		title.textContent = `Desctiption`;
		el.appendChild(title);
		el.appendChild(hair(slave));
		el.appendChild(eyeColor(slave));
		el.appendChild(customTattoo(slave));
		el.appendChild(customOriginStory(slave));
		el.appendChild(customDescription(slave));
		el.appendChild(customLabel(slave));

		return jQuery('#custom').empty().append(el);
	}

	function intro(slave) {
		V.oldName = slave.slaveName, V.oldSurname = slave.slaveSurname;
		let intro = document.createElement('p');
		intro.className = "scene-intro";
		intro.append(`You may enter custom descriptors for your slave's hair color, hair style, tattoos, or anything else here. After typing, press `);
		let introPiece = document.createElement('kbd');
		introPiece.textContent = `enter`;
		intro.appendChild(introPiece);
		intro.append(` to commit your change. These custom descriptors will appear in descriptions of your slave, but will have no gameplay effect. Changing them is free.`);
		return intro;
	}

	function playerTitle(slave) {
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);
		let playerTitle = document.createElement('p');
		label = document.createElement('div');
		if (slave.devotion >= -50) {
			if (slave.custom.title !== "") {
				label.textContent = `You have instructed ${him} to always refer to you as ${slave.custom.title}, which, should ${he} lisp, comes out as ${slave.custom.titleLisp}. `;
			} else {
				label.textContent = `You expect ${him} to refer to you as all your other slaves do. `;
			}
			result = document.createElement('div');
			result.id = "result";
			result.className = "choices";

			let hiddenTextBox = document.createElement('span');
			let shownTextBox = document.createElement('span');
			if (slave.custom.title === "") {
				hiddenTextBox.appendChild(
					App.UI.DOM.link(
						`Set a custom title for ${him} to address you as`,
						() => {
							jQuery('#result').empty().append(shownTextBox);
						}
					)
				);
				result.appendChild(hiddenTextBox);
				shownTextBox.textContent = `Custom title: `;
				textbox = App.UI.DOM.makeTextBox(
					"",
					v => {
						slave.custom.title = v,
							jQuery('#result').empty().append(
								document.createTextNode(`${He}'ll try ${his} best to call you ${slave.custom.title}. `)
							),
							slave.custom.titleLisp = lispReplace(slave.custom.title);
					});
				shownTextBox.appendChild(textbox);
			} else {
				result.append(`${He}'s trying ${his} best to call you `);
				textbox = App.UI.DOM.makeTextBox(
					slave.custom.title,
					v => {
						slave.custom.title = v,
							jQuery('#result').empty().append(
								document.createTextNode(`${He}'ll try ${his} best to call you ${slave.custom.title}. `)
							),
							slave.custom.titleLisp = lispReplace(slave.custom.title);
					});
				result.appendChild(textbox);
				result.appendChild(
					App.UI.DOM.link(
						` Stop using a custom title`,
						() => {
							jQuery('#result').empty().append(
									document.createTextNode(`${He} will no longer refer to you with a special title.`)
								),
								slave.custom.title = "";
							slave.custom.titleLisp = "";
						}
					)
				);
			}
			label.appendChild(result);
		} else {
			label.textContent = `You must break ${his} will further before ${he} will refer to you by a new title. `;
			if (SlaveStatsChecker.checkForLisp(slave)) {
				if (slave.custom.titleLisp && slave.custom.titleLisp !== "") {
					label.textContent += `For now, ${he} intends to keep calling you "${slave.custom.titleLisp}."`;
				}
			} else {
				if (slave.custom.title && slave.custom.title !== "") {
					label.textContent += `For now, ${he} intends to keep calling you "${slave.custom.title}."`;
				}
			}
		}
		playerTitle.appendChild(label);
		return playerTitle;
	}

	function slaveFullName(slave) {
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);
		let slaveFullNameNode = document.createElement('span');
		if (
			((slave.devotion >= -50 || slave.trust < -20) && (slave.birthName !== slave.slaveName)) ||
			(slave.devotion > 20 || slave.trust < -20)
		) {
			slaveFullNameNode.appendChild(slaveName());
			slaveFullNameNode.appendChild(slaveSurname());
		} else {
			slaveFullNameNode.textContent = `You must break ${his} will further before you can successfully force a new name on ${him}. `;
			slaveFullNameNode.className = "note";
		}

		return slaveFullNameNode;

		function slaveName() {
			// Slave Name
			let slaveNameNode = document.createElement('p');
			label = document.createElement('div');
			result = document.createElement('div');
			result.id = "result";
			result.className = "choices";

			label.append(`Change ${his} given name`);
			if (slave.birthName !== slave.slaveName) {
				label.append(` (${his} birth name was ${slave.birthName})`);
			}
			label.append(`: `);

			textbox = App.UI.DOM.makeTextBox(
				slave.slaveName,
				v => {
					slave.slaveName = v,
						App.UI.SlaveInteract.custom(slave);
				});
			label.appendChild(textbox);

			slaveNameNode.appendChild(label);

			result.appendChild(App.UI.DOM.link(
				` Restore ${his} birth name`,
				() => {
					slave.slaveName = slave.birthName,
						App.UI.SlaveInteract.custom(slave);
				}
			));

			if (V.arcologies[0].FSPastoralist !== "unset") {
				if (slave.lactation > 0) {
					result.append(` | `);
					result.appendChild(App.UI.DOM.link(
						`Give ${him} a random cow given name`,
						() => {
							slave.slaveName = setup.cowSlaveNames.random(),
								App.UI.SlaveInteract.custom(slave);
						}
					));
				}
			}
			if (V.arcologies[0].FSIntellectualDependency !== "unset") {
				if (slave.intelligence + slave.intelligenceImplant < -10) {
					result.append(` | `);
					result.appendChild(App.UI.DOM.link(
						`Give ${him} a random stipper given name`,
						() => {
							slave.slaveName = setup.bimboSlaveNames.random(),
								App.UI.SlaveInteract.custom(slave);
						}
					));
				}
			}
			if (V.arcologies[0].FSChattelReligionist !== "unset") {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Give ${him} a random devotional given name`,
					() => {
						slave.slaveName = setup.chattelReligionistSlaveNames.random(),
							App.UI.SlaveInteract.custom(slave);
					}
				));
			}
			slaveNameNode.appendChild(result);
			return slaveNameNode;
		}

		function slaveSurname() {
			// Slave Surname
			let slaveSurnameNode = document.createElement('p');
			label = document.createElement('div');
			result = document.createElement('div');
			result.id = "result";
			result.className = "choices";

			label.append(`Change ${his} surname`);
			if (slave.birthSurname !== slave.slaveSurname) {
				label.append(` (${his} birth surname was ${slave.birthSurname})`);
			}
			label.append(`: `);

			textbox = App.UI.DOM.makeTextBox(
				slave.slaveSurname,
				v => {
					slave.slaveSurname = textbox.value,
						App.UI.SlaveInteract.custom(slave);
				});
			label.appendChild(textbox);

			slaveSurnameNode.appendChild(label);

			result.appendChild(App.UI.DOM.link(
				` Restore ${his} birth surname`,
				() => {
					slave.slaveSurname = slave.birthSurname,
						App.UI.SlaveInteract.custom(slave);
				}
			));

			if (slave.slaveSurname) {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Take ${his} surname away`,
					() => {
						slave.slaveSurname = 0,
							App.UI.SlaveInteract.custom(slave);
					}
				));
			}
			if (slave.relationship >= 5) {
				for (let _i = 0; _i < V.slaves.length; _i++) {
					if (slave.relationshipTarget === V.slaves[_i].ID) {
						if (V.slaves[_i].slaveSurname) {
							if (slave.slaveSurname !== V.slaves[_i].slaveSurname) {
								result.append(` | `);
								const wifePronouns = getPronouns(V.slaves[_i]);
								result.appendChild(App.UI.DOM.link(
									`Give ${him} ${his} ${wifePronouns.wife}'s surname`,
									() => {
										slave.slaveSurname = V.slaves[_i].slaveSurname,
											App.UI.SlaveInteract.custom(slave);
									}
								));
								break;
							}
						}
					}
				}
			}
			if (slave.relationship === -3) {
				if (V.PC.slaveSurname) {
					if (slave.slaveSurname !== V.PC.slaveSurname) {
						result.append(` | `);
						result.appendChild(App.UI.DOM.link(
							`Give ${him} your surname`,
							() => {
								slave.slaveSurname = V.PC.slaveSurname,
									App.UI.SlaveInteract.custom(slave);
							}
						));
					}
				}
			}
			if (V.arcologies[0].FSRomanRevivalist !== "unset") {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Give ${him} a random full Roman name`,
					() => {
						slave.slaveName = setup.romanSlaveNames.random(),
							slave.slaveSurname = setup.romanSlaveSurnames.random(),
							App.UI.SlaveInteract.custom(slave);
					}
				));
			} else if (V.arcologies[0].FSAztecRevivalist !== "unset") {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Give ${him} a random full Aztec name`,
					() => {
						slave.slaveName = setup.aztecSlaveNames.random(),
							slave.slaveSurname = 0,
							App.UI.SlaveInteract.custom(slave);
					}
				));
			} else if (V.arcologies[0].FSEgyptianRevivalist !== "unset") {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Give ${him} a random full ancient Egyptian name`,
					() => {
						slave.slaveName = setup.ancientEgyptianSlaveNames.random(),
							slave.slaveSurname = 0,
							App.UI.SlaveInteract.custom(slave);
					}
				));
			} else if (V.arcologies[0].FSEdoRevivalist !== "unset") {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Give ${him} a random full feudal Japanese name`,
					() => {
						slave.slaveName = setup.edoSlaveNames.random(),
							slave.slaveSurname = setup.edoSlaveSurnames.random(),
							App.UI.SlaveInteract.custom(slave);
					}
				));
			}
			if (V.arcologies[0].FSDegradationist > -1) {
				result.append(` | `);
				result.appendChild(App.UI.DOM.link(
					`Give ${him} a degrading full name`,
					() => {
						DegradingName(slave),
							App.UI.SlaveInteract.custom(slave);
					}
				));
			}
			slaveSurnameNode.appendChild(result);
			return slaveSurnameNode;
		}
	}

	function hair(slave) {
		let hairNode = new DocumentFragment();
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);

		hairNode.appendChild(hairStyle());
		hairNode.appendChild(hairColor());
		return hairNode;

		function hairStyle() {
			let hairStyleNode = document.createElement('p');
			let label = document.createElement('div');
			label.append(`Custom hair description: `);

			let textbox = App.UI.DOM.makeTextBox(
				slave.hStyle,
				v => {
					slave.hStyle = v,
						App.UI.SlaveInteract.custom(slave);
				});
			label.appendChild(textbox);

			switch (slave.hStyle) {
				case "tails":
				case "dreadlocks":
				case "cornrows":
					label.append(` "${His} hair is in ${slave.hStyle}."`);
					break;
				case "ponytail":
					label.append(` "${His} hair is in a ${slave.hStyle}."`);
					break;
				default:
					label.append(` "${His} hair is ${slave.hStyle}."`);
					break;
			}
			hairStyleNode.appendChild(label);

			let choices = document.createElement('div');
			choices.className = "choices";
			let note = document.createElement('span');
			note.className = "note";
			note.textContent = ` For best results, use a short, uncapitalized and unpunctuated description; for example: 'back in a ponytail'`;
			choices.appendChild(note);
			hairStyleNode.appendChild(choices);
			return hairStyleNode;
		}

		function hairColor() {
			let hairStyleNode = document.createElement('p');
			let label = document.createElement('div');
			label.append(`Custom hair color: `);

			let textbox = App.UI.DOM.makeTextBox(
				slave.hColor,
				v => {
					slave.hColor = v,
						App.UI.SlaveInteract.custom(slave);
				});
			label.appendChild(textbox);
			label.append(` "${His} hair is ${slave.hColor}."`);
			hairStyleNode.appendChild(label);

			let choices = document.createElement('div');
			choices.className = "choices";
			let note = document.createElement('span');
			note.className = "note";
			note.textContent = ` For best results, use a short, uncapitalized and unpunctuated description; for example: 'black with purple highlights'`;
			choices.appendChild(note);
			hairStyleNode.appendChild(choices);
			return hairStyleNode;
		}
	}



	function eyeColor(slave) {
		let eyeColorNode = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);
		let label = document.createElement('div');
		if (getLenseCount(slave) > 0) {
			label.textContent = `${He} is wearing ${App.Desc.eyesColor(slave, "", "lense", "lenses")}.`;
		} else {
			label.textContent = `${He} has ${App.Desc.eyesColor(slave)}.`;
		}
		eyeColorNode.appendChild(label);

		let choices = document.createElement('div');
		choices.className = "choices";

		let eye;
		let textbox;

		if (hasLeftEye(slave)) {
			eye = document.createElement('div');
			eye.append(`Custom left eye color: `);
			textbox = App.UI.DOM.makeTextBox(
				slave.eye.left.iris,
				v => {
					slave.eye.left.iris = v,
						App.UI.SlaveInteract.custom(slave);
				});
			eye.appendChild(textbox);
			choices.appendChild(eye);
		}
		if (hasRightEye(slave)) {
			eye = document.createElement('div');
			eye.append(`Custom right eye color: `);
			textbox = App.UI.DOM.makeTextBox(
				slave.eye.right.iris,
				v => {
					slave.eye.right.iris = v,
						App.UI.SlaveInteract.custom(slave);
				});
			eye.appendChild(textbox);
			choices.appendChild(eye);
		}
		let note = document.createElement('span');
		note.className = "note";
		note.textContent = `For best results, use a short, uncapitalized and unpunctuated description; for example: 'blue'`;
		choices.appendChild(note);
		eyeColorNode.appendChild(choices);
		return eyeColorNode;
	}

	function customTattoo(slave) {
		let el = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);
		el.append(`Change ${his} custom tattoo: `);
		el.appendChild(App.UI.DOM.makeTextBox(
			slave.custom.tattoo,
			v => {
				slave.custom.tattoo = v,
					App.UI.SlaveInteract.custom(slave);
			}));

		let choices = document.createElement('div');
		choices.className = "choices";

		let note = document.createElement('span');
		note.className = "note";
		note.textContent = `For best results, use complete sentences; for example: '${He} has blue stars tattooed along ${his} cheekbones.'`;
		choices.appendChild(note);
		el.appendChild(choices);

		return el;
	}

	function customOriginStory(slave) {
		let el = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);

		el.append(`Change ${his} origin story: `);
		el.appendChild(App.UI.DOM.makeTextBox(
			slave.origin,
			v => {
				slave.origin = v,
					App.UI.SlaveInteract.custom(slave);
			}));

		let choices = document.createElement('div');
		choices.className = "choices";

		let note = document.createElement('span');
		note.className = "note";
		note.textContent = ` For best results, use complete, capitalized and punctuated sentences; for example: '${He} followed you home from the pet store.'`;
		choices.appendChild(note);
		el.appendChild(choices);

		return el;
	}

	function customDescription(slave) {
		let el = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);

		el.append(`Change ${his} custom description: `);
		el.appendChild(App.UI.DOM.makeTextBox(
			slave.custom.desc,
			v => {
				slave.custom.desc = v,
					App.UI.SlaveInteract.custom(slave);
			}));

		let choices = document.createElement('div');
		choices.className = "choices";

		let note = document.createElement('span');
		note.className = "note";
		note.textContent = ` For best results, use complete, capitalized and punctuated sentences; for example: '${He} has a beauty mark above ${his} left nipple.'`;
		choices.appendChild(note);
		el.appendChild(choices);

		return el;
	}

	function customLabel(slave) {
		let el = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);

		el.append(`Change ${his} custom label: `);
		el.appendChild(App.UI.DOM.makeTextBox(
			slave.custom.label,
			v => {
				slave.custom.label = v,
					App.UI.SlaveInteract.custom(slave);
			}));

		let choices = document.createElement('div');
		choices.className = "choices";

		let note = document.createElement('span');
		note.className = "note";
		note.textContent = ` For best results, use a short phrase; for example: 'Breeder.'`;
		choices.appendChild(note);
		el.appendChild(choices);

		return el;
	}


	function customSlaveImage(slave) {
		let el = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);
		el.append(`Assign ${him} a custom image: `);

		let textbox = document.createElement("INPUT");
		textbox.id = "customImageValue";
		el.appendChild(textbox);


		let kbd = document.createElement('kbd');
		let select = document.createElement('SELECT');
		select.id = "customImageFormatSelector";
		select.style.border = "none";

		let filetypes = [
			"png",
			"jpg",
			"gif",
			"webm",
			"webp",
			"mp4"
		];

		filetypes.forEach((fileType) => {
			let el = document.createElement('OPTION');
			el.value = fileType;
			el.text = fileType.toUpperCase();
			select.add(el);
		});
		kbd.append(`.`);
		kbd.appendChild(select);
		el.appendChild(kbd);

		el.appendChild(
			App.UI.DOM.link(
				` Reset`,
				() => {
					slave.custom.image = null,
						App.UI.SlaveInteract.custom(slave),
						App.Art.refreshSlaveArt(slave, 3, "artFrame");
				},
			)
		);

		let choices = document.createElement('div');
		choices.className = "choices";
		let note = document.createElement('span');
		note.className = "note";
		note.append(`Place file in the `);

		kbd = document.createElement('kbd');
		kbd.append(`resources`);
		note.appendChild(kbd);

		note.append(` folder. Choose the extension from the menu first, then enter the filename in the space and press enter. For example, for a file with the path `);

		kbd = document.createElement('kbd');
		kbd.textContent = `\\bin\\resources\\headgirl.`;
		let filetypeDesc = document.createElement('span');
		filetypeDesc.id = "customImageFormatValue";
		filetypeDesc.textContent = "png";
		kbd.appendChild(filetypeDesc);
		note.appendChild(kbd);

		note.append(`, enter `);

		kbd = document.createElement('kbd');
		kbd.textContent = `headgirl`;
		note.appendChild(kbd);

		note.append(` then choose `);

		kbd = document.createElement('kbd');
		kbd.textContent = `JPG`;
		note.appendChild(kbd);

		note.append(`.`);
		choices.appendChild(note);
		el.appendChild(choices);

		jQuery(function() {
			function activeSlave() {
				return slave;
			}

			jQuery("#customImageFormatValue").text(activeSlave().custom.image === null ? "png" : activeSlave().custom.image.format);
			jQuery("#customImageValue")
				.val(activeSlave().custom.image === null ?
					"" : activeSlave().custom.image.filename)
				.on("change", function(e) {
					const c = activeSlave().custom;
					if (this.value.length === 0) {
						c.image = null;
					} else {
						if (c.image === null) {
							c.image = {
								filename: this.value,
								format: jQuery("#customImageFormatSelector").val()
							};
							App.Art.refreshSlaveArt(slave, 3, "artFrame");
						} else {
							c.image.filename = this.value;
							App.Art.refreshSlaveArt(slave, 3, "artFrame");
						}
					}
				});
			jQuery("#customImageFormatSelector")
				.val(activeSlave().custom.image ? activeSlave().custom.image.format : "png")
				.on("change", function(e) {
					if (activeSlave().custom.image !== null) {
						activeSlave().custom.image.format = this.value;
					}
					jQuery("#customImageFormatValue").text(this.value);
				});
		});
		return el;
	}

	function customHairImage(slave) {
		let el = document.createElement('p');
		const {
			// eslint-disable-next-line no-unused-vars
			he,
			him,
			his,
			hers,
			himself,
			boy,
			He,
			His
		} = getPronouns(slave);

		if (V.seeImages === 1 && V.imageChoice === 1) {
			if (!slave.custom.hairVector) {
				slave.custom.hairVector = 0;
			}
			el.append(`Assign ${him} a custom hair SVG image: `);

			el.appendChild(App.UI.DOM.makeTextBox(
				slave.custom.hairVector,
				v => {
					slave.custom.hairVector = v,
						App.UI.SlaveInteract.custom(slave);
				}));

			el.appendChild(
				App.UI.DOM.link(
					` Reset`,
					() => {
						slave.custom.hairVector = 0,
							App.UI.SlaveInteract.custom(slave),
							App.Art.refreshSlaveArt(slave, 3, "artFrame");
					},
				)
			);
		}

		return el;
	}
})();

App.UI.SlaveInteract.generateRows = function(array, slave, category, accessCheck = false) { // category should be in the form of slave.category, the thing we want to update.
	let row = document.createElement('span');
	let useSep = false;
	for (let i = 0; i < array.length; i++) {
		let link;
		const separator = document.createTextNode(` | `);
		const keys = Object.keys(array[i]);

		// Test to see if there was a problem with the key
		for (let j = 0; j < keys.length; j++) {
			if (["FS", "text", "updateSlave", "update", "note", "disabled"].includes(keys[j])) {
				continue;
			} else {
				array[i].text += " ERROR, THIS SCENE WAS NOT ENTERED CORRECTLY";
				console.log("Trash found while generateRows() was running: " + keys[j] + ": " + array[i][keys[j]]);
				break;
			}
		}
		// Some items will never be in App.data.misc, especially "none" if it falls in between harsh and nice data sets.  Trying to look it up would cause an error, which is what access check works around.
		let unlocked = false;
		if (accessCheck === true) {
			if (category === "chastity") {
				let text = array[i].text.toLowerCase(); // Yucky.  Category name does not match for chastity (since it sets multiple kinds of chastity at once).  Compare using a lowercased name instead.
				unlocked = isClothingAccessible.entry(text, `${category}`, slave, true);
			} else {
				unlocked = isClothingAccessible.entry(array[i].updateSlave[category], `${category}`, slave, true);
			}
		}
		if (accessCheck === false || unlocked) {
			if (i < array.length && i !== 0 && useSep === true) { // start with separator (after first loop); can't after since the last loop may not have any text.
				row.appendChild(separator);
			}
			useSep = true;  // First item may not appear and if it doesn't we don't want the second to start with a '|'
			// is it just text?
			if (array[i].disabled) {
				link = App.UI.DOM.disabledLink(array[i].text, [array[i].disabled]);
			} else if (typeof unlocked === 'string') {
				link = App.UI.DOM.disabledLink(array[i].text, [unlocked]);
			} else {
				link = document.createElement('span');

				// Set up the link
				link.appendChild(
					App.UI.DOM.link(
						`${array[i].text} `,
						() => { click(array[i]); },
					)
				);

				if (array[i].FS) {
					let FS = array[i].FS.substring(2); // Given "FSEdoRevivalist", cut off the first two letters to start a user friendly tooltip
					FS = FS.replace(/([A-Z])/g, ` $1`); // Given "EdoRevivalist", find every capital letter and put a space in front of it
					FS = App.UI.DOM.disabledLink(`FS`, [FS]); // Tooltip should read "Edo Revivalist"
					FS.style.fontStyle = "italic";
					link.appendChild(FS);
				}

				// add a note node if required
				if (array[i].note) {
					let note = document.createElement('span');
					note.textContent = (` ${array[i].note}`);
					note.className = "note";
					link.appendChild(note);
				}
			}
			row.appendChild(link);
		}
	}

	return row;

	function click(arrayOption) {
		if (arrayOption.updateSlave) {
			Object.assign(slave, arrayOption.updateSlave);
		}
		if (arrayOption.update) {
			Object.assign(V, arrayOption.update);
		}
		App.UI.Wardrobe.refreshAll(slave);
		App.UI.SlaveInteract.refreshAll(slave);
		return;
	}
};

App.UI.SlaveInteract.refreshAll = function(slave) {
	App.UI.SlaveInteract.fucktoyPref(slave);
	App.UI.SlaveInteract.assignmentBlock("assignmentLinks", slave);
	App.UI.SlaveInteract.drugs(slave);
	App.UI.SlaveInteract.useSlaveDisplay(slave);
	App.UI.SlaveInteract.bloating(slave);
	App.UI.SlaveInteract.fertility(slave);
	App.UI.SlaveInteract.curatives(slave);
	App.UI.SlaveInteract.aphrodisiacs(slave);
	App.UI.SlaveInteract.incubator(slave);
	App.UI.SlaveInteract.nursery(slave);
	App.UI.SlaveInteract.custom(slave);
};
