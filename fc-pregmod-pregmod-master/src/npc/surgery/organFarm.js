/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Medicine.OrganFarm.growActions = function(slave) {
	const organOrder = App.Medicine.OrganFarm.organDisplayOrder;
	const O = App.Medicine.OrganFarm.Organs;

	// find already being grown/ready to implant organs
	const slaveOrgans = {};
	organOrder.forEach(organ => slaveOrgans[organ] = 0);
	V.completedOrgans.forEach(organ => {
		if (organ.ID === slave.ID) {
			slaveOrgans[organ.type] = -1;
		}
	});
	V.organs.forEach(organ => {
		if (organ.ID === slave.ID) {
			slaveOrgans[organ.type] = organ.weeksToCompletion;
		}
	});

	function weeksLeft(time) {
		if (V.organFarmUpgrade === 1) {
			return time;
		} else if (V.organFarmUpgrade === 2) {
			return Math.ceil(time / 2);
		} else {
			return Math.ceil(time / 4);
		}
	}

	const {His, him} = getPronouns(slave);

	// create entries for each organ
	let grow = "";
	let wait = [];
	for (const organ of organOrder) {
		if (slaveOrgans[organ] === 0) {
			if (O[organ].canGrow()) {
				grow += `<div>${App.UI.link(O[organ].name, App.Medicine.OrganFarm.growOrgan, [slave, organ], "Remote Surgery")}</div>`;
				grow += `<div class="detail">Costs ${cashFormat(O[organ].cost)}${O[organ].tooltip !== "" ? ` and ${O[organ].tooltip}` : ""}.</div>`;
			}
		} else if (slaveOrgans[organ] > 0) {
			// in growth organs at the end of the list
			wait.push({
				time: slaveOrgans[organ],
				text: `${His} ${O[organ].name.toLowerCase()} will be ready for implantation in ${weeksLeft(slaveOrgans[organ])} weeks.`
			});
		}
	}

	// put everything in one string
	let r = "";
	if (grow !== "") {
		// div.grid-2columns-auto is defined in mainStyleSheet.css
		r += `The fabricator is ready to grow an organ for ${him}. Extract tissue to begin growing:<div class="grid-2columns-auto">${grow}</div>`;
	}
	if (wait !== []) {
		// nearer to completion => higher up
		wait.sort((a, b) => a.time - b.time);
		for (let i = 0; i < wait.length; i++) {
			r += `<div>${wait[i].text}</div>`;
		}
	}

	return r;
};

App.Medicine.OrganFarm.growOrgan = function(slave, organType) {
	const organ = App.Medicine.OrganFarm.Organs[organType];

	V.organs.push({type: organType, weeksToCompletion: organ.time, ID: slave.ID});

	cashX(-organ.cost, "slaveSurgery", slave);
};

App.Medicine.OrganFarm.growIncubatorOrgan = function(slave, organType) {
	const organ = App.Medicine.OrganFarm.Organs[organType];

	V.incubatorOrgans.push({type: organType, weeksToCompletion: organ.time, ID: slave.ID});

	cashX(-organ.cost, "slaveSurgery", slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Medicine.OrganFarm.implantActions = function(slave) {
	let slaveOrgans = V.completedOrgans.filter(o => o.ID === slave.ID);
	if (slaveOrgans.length === 0) { return ""; }

	const F = App.Medicine.OrganFarm;
	let r = "";

	for (const organ of slaveOrgans) {
		r += `<div>${F.Organs[organ.type].name}:</div><div>`;

		let anyAction = false;
		let lines = [];
		for (let i = 0; i < F.Organs[organ.type].implantActions.length; i++) {
			const action = F.Organs[organ.type].implantActions[i];
			if (action.canImplant(slave)) {
				const implantLink = App.UI.link(action.name, App.Medicine.OrganFarm.implant, [slave, organ.type, i], "Surgery Degradation");
				lines.push(`<span class="detail">${action.tooltip === "" ? "" : `${capFirstChar(action.tooltip)}: `}</span>${implantLink}`);
				anyAction = true;
				break; // there can only be one implant action
			} else {
				const error = action.implantError(slave);
				if (error !== "") {
					lines.push(`ERROR: ${error} `);
				}
			}
		}

		// each error on a new line
		for (let i = 0; i < lines.length - 1; i++) {
			r += `<div>${lines[i]}</div>`;
		}

		// last error or implant action has "Discard" after them.
		r += `<div>${lines[lines.length - 1]}`;
		if (anyAction) {
			r += " | ";
		}
		r += `${App.UI.link("Discard", App.Medicine.OrganFarm.removeOrgan, [slave, organ.type], "Remote Surgery")}</div></div>`;
	}

	return `The fabricator has completed ${slaveOrgans.length} organ(s):<div class="grid-2columns-auto">${r}</div>`;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} type
 * @param {number} actionIndex
 */
App.Medicine.OrganFarm.implant = function(slave, type, actionIndex) {
	const A = App.Medicine.OrganFarm.Organs[type].implantActions[actionIndex];

	A.implant(slave);
	surgeryDamage(slave, A.healthImpact);
	if (V.organFarmUpgrade >= 2) {
		slave.chem += 20;
	}

	App.Medicine.OrganFarm.removeOrgan(slave, type);
	V.surgeryType = A.surgeryType;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} type
 */
App.Medicine.OrganFarm.removeOrgan = function(slave, type) {
	let organIndex = V.completedOrgans.findIndex(o => (o.ID === slave.ID && o.type === type));

	if (organIndex !== -1) {
		V.completedOrgans.deleteAt(organIndex);
	}
};

/**
 * Organs the that can be implanted on the slave, sorted by dependencies first
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {[string]}
 */
App.Medicine.OrganFarm.getSortedOrgans = function(slave) {
	const F = App.Medicine.OrganFarm;
	const organs = [];
	const dependencies = [];
	V.completedOrgans.forEach(organ => {
		if (organ.ID === slave.ID) {
			organs.push(organ.type);
		}
	});
	organs.forEach(o => {
		F.Organs[o].dependencies.forEach(d => {
			if (organs.includes(d)) { /* inefficient, is there a better way? */
				dependencies.push([d, o]);
			}
		});
	});
	try {
		return App.Utils.topologicalSort(organs, dependencies);
	} catch (e) { // closed loop
		console.log(e.message);
		return [];
	}
};

/**
 * Returns the full organ farm menu, hiding empty parts
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Medicine.OrganFarm.fullMenu = function(slave) {
	if (V.organFarmUpgrade >= 1 && slave.indentureRestrictions < 2) {
		let r = "";

		let actions = App.Medicine.OrganFarm.growActions(slave);
		if (actions !== "") {
			r += `<h3>Grow new organs</h3><div class="indent">${actions}</div>`;
		}

		actions = App.Medicine.OrganFarm.implantActions(slave);
		if (actions !== "") {
			r += `<h3>Implant organs</h3><div class="indent">${actions}</div>`;
		}

		if (r === "") {
			return "";
		}

		return `<h2>Organ Farm</h2>${r}`;
	} else {
		return "";
	}
};

App.Medicine.OrganFarm.currentlyGrowing = function() {
	function weeksToCompletion(weeks) {
		if (V.organFarmUpgrade === 1) {
			return weeks;
		} else if (V.organFarmUpgrade === 2) {
			return Math.ceil(weeks / 2);
		} else {
			return Math.ceil(weeks / 4);
		}
	}

	let r = "";

	let growLines = [];
	let finishLines = [];

	V.organs.forEach(o => {
		const index = V.slaveIndices[o.ID];
		if (index !== undefined) {
			growLines.push(`${V.slaves[index].slaveName}'s ${App.Medicine.OrganFarm.Organs[o.type].name}, ${
				weeksToCompletion(o.weeksToCompletion)} week(s) left.`);
		} else {
			growLines.push(`<span class="error">ERROR: No slave with ID ${o.ID} found.</span>`);
		}
	});
	V.incubatorOrgans.forEach(o => {
		const tank = V.tanks.find((t) => t.ID === o.ID);
		if (tank !== undefined) {
			if (o.weeksToCompletion <= 0) {
				finishLines.push(`${tank.slaveName}'s ${App.Medicine.OrganFarm.Organs[o.type].name}.`);
			} else {
				growLines.push(`${tank.slaveName}'s ${App.Medicine.OrganFarm.Organs[o.type].name}, ${
					weeksToCompletion(o.weeksToCompletion)} week(s) left.`);
			}
		} else {
			growLines.push(`<span class="error">ERROR: No tank with ID ${o.ID} found.</span>`);
		}
	});

	V.completedOrgans.forEach(o => {
		const index = V.slaveIndices[o.ID];
		if (index !== undefined) {
			finishLines.push(`${V.slaves[index].slaveName}'s ${App.Medicine.OrganFarm.Organs[o.type].name}.`);
		} else {
			finishLines.push(`<span class="error">ERROR: No slave with ID ${o.ID} found.</span>`);
		}
	});

	if (growLines.length > 0) {
		r += "<h3>Growing Organs</h3>";
	}
	growLines.forEach(l => {
		r += `<div>${l}</div>`;
	});

	if (finishLines.length > 0) {
		r += "<h3>Finished Organs</h3>";
	}
	finishLines.forEach(l => {
		r += `<div>${l}</div>`;
	});

	return r;
};
