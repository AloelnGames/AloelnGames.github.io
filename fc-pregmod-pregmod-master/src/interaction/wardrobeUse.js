App.UI.Wardrobe = {};

App.UI.Wardrobe.clothes = function(slave) {
	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');
	let links;
	if (slave.fuckdoll === 0) {
		// <<ClothingDescription>>

		let label = document.createElement('div');
		label.append(`Clothes: `);

		let choice = document.createElement('span');
		choice.style.fontWeight = "bold";
		choice.textContent = (`${slave.clothes} `);
		label.appendChild(choice);

		// Choose her own
		if (slave.clothes !== `choosing her own clothes`) {
			let choiceOptionsArray = [];
			choiceOptionsArray.push({text: `Let ${him} choose`, updateSlave: {clothes: `choosing her own clothes`, choosesOwnClothes: 1}});
			label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "clothes", false));
		}
		el.appendChild(label);


		let niceOptionsArray = [];
		let harshOptionsArray = [];

		let clothingOption;
		// Nice clothes
		App.Data.misc.niceClothes.forEach(item => {
			clothingOption = {
				text: item.name,
				updateSlave: {clothes: item.value, choosesOwnClothes: 0}
			};
			if (item.fs) {
				clothingOption.FS = item.fs;
			}
			niceOptionsArray.push(clothingOption);
		});
		// Harsh clothes
		App.Data.misc.harshClothes.forEach(item => {
			clothingOption = {
				text: item.name,
				updateSlave: {clothes: item.value, choosesOwnClothes: 0}
			};
			if (item.fs) {
				clothingOption.FS = item.fs;
			}
			if (item.value !== "choosing her own clothes") {
				harshOptionsArray.push(clothingOption);
			}
		});

		// Sort
		niceOptionsArray = niceOptionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);
		harshOptionsArray = harshOptionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

		// Nice options
		links = document.createElement('div');
		links.className = "choices";
		links.append(`Nice: `);
		links.appendChild(App.UI.SlaveInteract.generateRows(niceOptionsArray, slave, "clothes", true));
		el.appendChild(links);

		// Harsh options
		links = document.createElement('div');
		links.className = "choices";
		links.append(`Harsh: `);
		links.appendChild(App.UI.SlaveInteract.generateRows(harshOptionsArray, slave, "clothes", true));
		el.appendChild(links);
	}
	if (slave.fuckdoll !== 0 || slave.clothes === "restrictive latex" || slave.clothes === "a latex catsuit" || slave.clothes === "a cybersuit" || slave.clothes === "a comfortable bodysuit") {
		if (V.seeImages === 1 && V.imageChoice === 1) {
			// Color options
			links = document.createElement('div');
			links.className = "choices";
			links.append(`Color: `);
			links.appendChild(App.UI.Wardrobe.colorOptions(slave, "clothingBaseColor"));
			el.appendChild(links);
		}
	}

	return jQuery('#clothes').empty().append(el);
};

App.UI.Wardrobe.collar = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}
	// <<collarDescription>>
	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Collar: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.collar} `);
	label.appendChild(choice);

	// Choose her own
	if (slave.collar !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {collar: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "collar", false));
	}

	el.appendChild(label);

	let niceOptionsArray = [];
	let harshOptionsArray = [];

	let clothingOption;
	// Nice collar
	App.Data.misc.niceCollars.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {collar: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}
		niceOptionsArray.push(clothingOption);
	});
	// Harsh collar
	App.Data.misc.harshCollars.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {collar: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}
		harshOptionsArray.push(clothingOption);
	});

	// Sort
	niceOptionsArray = niceOptionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);
	harshOptionsArray = harshOptionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Nice options
	let links = document.createElement('div');
	links.className = "choices";
	links.append(`Nice: `);
	links.appendChild(App.UI.SlaveInteract.generateRows(niceOptionsArray, slave, "collar", true));
	el.appendChild(links);

	// Harsh options
	links = document.createElement('div');
	links.className = "choices";
	links.append(`Harsh: `);
	links.appendChild(App.UI.SlaveInteract.generateRows(harshOptionsArray, slave, "collar", true));
	el.appendChild(links);

	if (slave.eyewear === "corrective glasses" || slave.eyewear === "glasses" || slave.eyewear === "blurring glasses" || slave.collar === "porcelain mask") {
		// Color options
		links = document.createElement('div');
		links.className = "choices";
		links.append(`Color: `);
		links.appendChild(App.UI.Wardrobe.colorOptions(slave, "glassesColor"));
		let note = document.createElement('span');
		note.className = "note";
		note.textContent = ` Only glasses and porcelain masks support a custom color. If both are worn, they will share the same color.`;
		links.appendChild(note);
		el.appendChild(links);
	}

	return jQuery('#collar').empty().append(el);
};

App.UI.Wardrobe.armAccessory = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}

	let el = document.createElement('div');
	// <<armwearDescription>>

	let label = document.createElement('div');
	label.append(`Arm accessory: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.armAccessory} `);
	label.appendChild(choice);

	let array = [];

	// Choose her own
	if (slave.armAccessory !== "none") {
		array.push({text: `None`, updateSlave: {armAccessory: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(array, slave, "armAccessory", false));
	}

	el.appendChild(label);

	let links = document.createElement('div');
	links.className = "choices";
	array = [
		{text: "Hand gloves", updateSlave: {armAccessory: "hand gloves"}},
		{text: "Elbow gloves", updateSlave: {armAccessory: "elbow gloves"}}
	];
	links.appendChild(App.UI.SlaveInteract.generateRows(array, slave, "armAccessory", false));
	el.appendChild(links);

	return jQuery('#armAccessory').empty().append(el);
};

App.UI.Wardrobe.shoes = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}

	const
		{
			// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Shoes: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.shoes} `);
	label.appendChild(choice);

	/* We have "barefoot" in App.Data.Misc to cover for this
	// Choose her own
	if (slave.shoes !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {shoes: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "shoes", false));
	}
	*/
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.shoes.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {shoes: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}
		optionsArray.push(clothingOption);
	});

	// Sort
	// No sort here since we want light -> advanced.  optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "shoes", true));
	el.appendChild(links);

	if (V.seeImages === 1 && V.imageChoice === 1 && slave.shoes !== "none") {
		// Color options
		links = document.createElement('div');
		links.className = "choices";
		links.append(`Color: `);
		links.appendChild(App.UI.Wardrobe.colorOptions(slave, "shoeColor"));
		el.appendChild(links);
	}

	return jQuery('#shoes').empty().append(el);
};

App.UI.Wardrobe.legAccessory = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}

	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Leg accessory: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.legAccessory} `);
	label.appendChild(choice);

	let array = [];

	// Choose her own
	if (slave.legAccessory !== "none") {
		array.push({text: `None`, updateSlave: {legAccessory: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(array,  slave, "legAccessory", false));
	}

	el.appendChild(label);

	let links = document.createElement('div');
	links.className = "choices";
	array = [
		{text: "Short stockings", updateSlave: {legAccessory: "short stockings"}},
		{text: "Long stockings", updateSlave: {legAccessory: "long stockings"}}
	];
	links.appendChild(App.UI.SlaveInteract.generateRows(array, slave, "legAccessory", false));
	el.appendChild(links);

	return jQuery('#legAccessory').empty().append(el);
};

App.UI.Wardrobe.bellyAccessory = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}
	// <<waistDescription>><<pregnancyDescription>><<clothingCorsetDescription>>

	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let choiceOptionsArray = [];
	choiceOptionsArray.push({text: `None`, updateSlave: {bellyAccessory: `none`}});

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.bellyAccessories.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {bellyAccessory: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}
		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});
	// Sort
	// No sort here since we want small -> large.optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Belly accessory: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.bellyAccessory} `);
	label.appendChild(choice);

	// Choose her own
	if (slave.bellyAccessory !== `none`) {
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "bellyAccessory", false));
	}

	el.appendChild(label);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "bellyAccessory", true));
	if (slave.pregKnown === 1) {
		let note = document.createElement('span');
		note.className = "note";
		note.textContent = ` Extreme corsets will endanger the life within ${him}.`;
		links.appendChild(note);
	}
	el.appendChild(links);

	return jQuery('#bellyAccessory').empty().append(el);
};

App.UI.Wardrobe.buttplug = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}
	// <<buttplugDescription>>

	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Anal accessory: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.buttplug} `);
	label.appendChild(choice);

	if (slave.buttplug !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {buttplug: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "buttplug", false));
	}
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.buttplugs.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {buttplug: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}

		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});

	// Sort
	// No sort here since we want small -> large.  optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "buttplug", true));
	el.appendChild(links);

	return jQuery('#buttplug').empty().append(el);
};

App.UI.Wardrobe.buttplugAttachment = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	} else if (slave.buttplug === "none") {
		return jQuery('#buttplugAttachment').empty();
	}

	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Anal accessory attachment: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.buttplugAttachment} `);
	label.appendChild(choice);

	if (slave.buttplugAttachment !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {buttplugAttachment: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "buttplugAttachment", false));
	}
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.buttplugAttachments.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {buttplugAttachment: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}

		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});

	// Sort
	optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "buttplugAttachment", true));
	el.appendChild(links);

	return jQuery('#buttplugAttachment').empty().append(el);
};

App.UI.Wardrobe.vaginalAccessory = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}

	// <<vaginalAccessoryDescription>>
	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Vaginal accessory: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.vaginalAccessory} `);
	label.appendChild(choice);

	if (slave.vaginalAccessory !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {vaginalAccessory: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "vaginalAccessory", false));
	}
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.vaginalAccessories.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {vaginalAccessory: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}

		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});

	// Sort
	// No sort here since we want small -> large.  optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "vaginalAccessory", true));
	el.appendChild(links);

	return jQuery('#vaginalAccessory').empty().append(el);
};

App.UI.Wardrobe.vaginalAttachment = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	} else if (slave.vaginalAccessory === "none") {
		return jQuery('#vaginalAttachment').empty();
	}
	// <<vaginalAttachmentDescription>>

	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Vaginal accessory attachment: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.vaginalAttachment} `);
	label.appendChild(choice);

	if (slave.vaginalAttachment !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {vaginalAttachment: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "vaginalAttachment", false));
	}
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.vaginalAttachments.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {vaginalAttachment: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}

		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});

	// Sort
	optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "vaginalAttachment", true));
	el.appendChild(links);

	return jQuery('#vaginalAttachment').empty().append(el);
};

App.UI.Wardrobe.dickAccessory = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}
	// <<dickAccessoryDescription>>

	const {
		// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, boy, He, His
		} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Dick accessory: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	choice.textContent = (`${slave.dickAccessory} `);
	label.appendChild(choice);

	if (slave.dickAccessory !== `none`) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({text: `None`, updateSlave: {dickAccessory: `none`}});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "dickAccessory", false));
	}
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.dickAccessories.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {dickAccessory: item.value}
		};
		if (item.fs) {
			clothingOption.FS = item.fs;
		}

		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});

	// Sort
	// No sort here since we want small -> large.  optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "dickAccessory", true));
	el.appendChild(links);

	return jQuery('#dickAccessory').empty().append(el);
};

App.UI.Wardrobe.chastity = function(slave) {
	if (slave.fuckdoll !== 0) {
		return;
	}

	const {
		// eslint-disable-next-line no-unused-vars
		he,	him, his, hers, himself, boy, He, His
	} = getPronouns(slave);

	let el = document.createElement('div');

	let label = document.createElement('div');
	label.append(`Chastity devices: `);

	let choice = document.createElement('span');
	choice.style.fontWeight = "bold";
	if (slave.choosesOwnChastity === 1) {
		choice.textContent = `choosing ${his} own chastity `;
	} else if (slave.chastityAnus === 1 && slave.chastityPenis === 1 && slave.chastityVagina === 1) {
		choice.textContent = `full chastity `;
	} else if (slave.chastityPenis === 1 && slave.chastityVagina === 1) {
		choice.textContent = `genital chastity `;
	} else if (slave.chastityAnus === 1 && slave.chastityPenis === 1) {
		choice.textContent = `combined chastity cage `;
	} else if (slave.chastityAnus === 1 && slave.chastityVagina === 1) {
		choice.textContent = `combined chastity belt `;
	} else if (slave.chastityVagina === 1) {
		choice.textContent = `chastity belt `;
	} else if (slave.chastityPenis === 1) {
		choice.textContent = `chastity cage `;
	} else if (slave.chastityAnus === 1) {
		choice.textContent = `anal chastity `;
	} else if (slave.chastityAnus === 0 && slave.chastityPenis === 0 && slave.chastityVagina === 0) {
		choice.textContent = `none `;
	} else {
		choice.textContent = `THERE HAS BEEN AN ERROR `;
	}
	label.appendChild(choice);

	if (slave.chastityAnus !== 0 || slave.chastityPenis !== 0 || slave.chastityVagina !== 0) {
		let choiceOptionsArray = [];
		choiceOptionsArray.push({
			text: `None`,
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 0,
				chastityVagina: 0
			}
		});
		label.appendChild(App.UI.SlaveInteract.generateRows(choiceOptionsArray, slave, "chastity", false));
	}
	el.appendChild(label);

	let optionsArray = [];

	let clothingOption;
	App.Data.misc.chastityDevices.forEach(item => {
		clothingOption = {
			text: item.name,
			updateSlave: {}
		};
		Object.assign(clothingOption.updateSlave, item.updateSlave);
		if (item.fs) {
			clothingOption.FS = item.fs;
		}
		if (item.value !== "none") {
			// skip none in set, we set the link elsewhere.
			optionsArray.push(clothingOption);
		}
	});

	// Sort
	// skip sort for this one too. optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

	// Options
	let links = document.createElement('div');
	links.className = "choices";
	links.appendChild(App.UI.SlaveInteract.generateRows(optionsArray, slave, "chastity", true));
	el.appendChild(links);

	return jQuery('#chastity').empty().append(el);
};

App.UI.Wardrobe.shopping = function(slave) {
	return jQuery('#shopping').empty().append(
		App.UI.DOM.link(
			` Go shopping for more options`,
			() => {},
			[],
			"Wardrobe"
		)
	);
};

/**
 * @param {SlaveState} slave
 * @param {string} update
 * @returns {Node}
 */
App.UI.Wardrobe.colorOptions = function(slave, update) {
	let el = new DocumentFragment();
	let colorChoice = App.UI.DOM.colorInput(
		slave[update],
		v => {
			slave[update] = v,
			App.UI.Wardrobe.refreshAll(slave);
		}
	);
	el.appendChild(colorChoice);

	if (slave[update]) {
		el.appendChild(
			App.UI.DOM.link(
				` Reset`,
				() => {
					delete slave[update],
					App.UI.Wardrobe.refreshAll(slave);
				},
			)
		);
	}
	return el;
};

App.UI.Wardrobe.refreshAll = function(slave) {
	App.UI.Wardrobe.clothes(slave);
	App.UI.Wardrobe.collar(slave);
	App.UI.Wardrobe.armAccessory(slave);
	App.UI.Wardrobe.shoes(slave);
	App.UI.Wardrobe.legAccessory(slave);
	App.UI.Wardrobe.bellyAccessory(slave);
	App.UI.Wardrobe.buttplug(slave);
	App.UI.Wardrobe.buttplugAttachment(slave);
	App.UI.Wardrobe.vaginalAccessory(slave);
	App.UI.Wardrobe.vaginalAttachment(slave);
	App.UI.Wardrobe.dickAccessory(slave);
	App.UI.Wardrobe.chastity(slave);
	App.Art.refreshSlaveArt(slave, 3, "artFrame");
	return;
};
