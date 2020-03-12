/**
 * @param {App.Entity.SlaveState} slave
 * @param {object[]} rules
 * @returns {boolean}
 */
window.hasSurgeryRule = function(slave, rules) {
	return rules.some(
		rule => ruleApplied(slave, rule) && rule.set.autoSurgery > 0);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object[]} rules
 * @param {string} what
 * @returns {boolean}
 */
window.hasRuleFor = function(slave, rules, what) {
	return rules.some(
		rule => ruleApplied(slave, rule) && rule[what] !== null);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object[]} rules
 * @returns {boolean}
 */
window.hasHColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hColor");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.RA.Rule[]} rules
 * @returns {boolean}
 * */
window.hasHStyleRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hStyle");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.RA.Rule[]} rules
 * @returns {boolean}
 * */
window.hasEyeColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "eyeColor");
};

/**
 * return if a rule is applied on a slave
 * @param {App.Entity.SlaveState} slave
 * @param {App.RA.Rule[]} rules
 * @returns {boolean}
 */
window.lastPregRule = function(slave, rules) {
	return rules.some(rule =>
		ruleApplied(slave, rule) && rule.set.preg === -1);
};

/**
 * @param {App.RA.RuleSetters[]} rules
 * @returns {App.RA.RuleSetters}
 */
window.mergeRules = function(rules) {
	if (rules.length === 0) {
		return emptyDefaultRule().set;
	}

	const combinedRule = emptyDefaultRule().set;

	rules.forEach(rule => {
		App.RA.ruleDeepAssign(combinedRule, rule);
	});
	return combinedRule;
};

/**
 * return if a rule is applied on a slave
 * @param {App.Entity.SlaveState} slave
 * @param {App.RA.Rule} rule
 * @returns {boolean}
 */
window.ruleApplied = function(slave, rule) {
	return slave.currentRules.includes(rule.ID);
};

/**
 * remove slave from the facility described by the rule
 * @param {App.Entity.SlaveState} slave
 * @param {object} rule
 * @returns {string}
 */
window.RAFacilityRemove = function RAFacilityRemove(slave, rule) {
	let r = "";
	if (!rule.facilityRemove) { return r; }
	switch (rule.setAssignment) {
		case "be confined in the arcade":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.arcadeName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "work in the brothel":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.brothelName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "serve in the club":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.clubName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "work in the dairy":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.dairyName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "work as farmhand":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.farmyardName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "rest in the spa":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.spaName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "work as a nanny":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.nurseryName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "get treatment in the clinic":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>{slave.slaveName} has been removed from ${V.clinicName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "serve in the master suite":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>{slave.slaveName} has been removed from ${V.masterSuiteName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "live with your Head Girl":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.HGSuiteName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "work as a servant":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.servantsQuartersName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "learn in the schoolroom":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.schoolroomName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;

		case "be confined in the cellblock":
			if (slave.assignment === rule.setAssignment) {
				r += `<br>${slave.slaveName} has been removed from ${V.cellblockName} and has been assigned to ${rule.removalAssignment}.`;
				assignJob(slave, rule.removalAssignment);
			}
			break;
	}
};

/**
 * return whether the rule applies to the slave
 * @param {App.RA.RuleConditions} cond
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean} flag */
window.ruleAppliesP = function ruleAppliesP(cond, slave) {
	let flag = true;
	// attribute / function check
	switch (cond.function) {
		case false: // never applies
			flag = false;
			break;
		case "between": // between two values of a slave's attribute
			let slaveAttribute = slave[cond.data.attribute];
			if (slaveAttribute === undefined && cond.data.attribute.includes(".")) {
				slaveAttribute = cond.data.attribute
				.split(".")
				.reduce(
					(reduceSlave, attribute) =>
					(reduceSlave && reduceSlave[attribute] !== undefined)
						? reduceSlave[attribute]
						: undefined,
					slave
				);
			}
			flag = between(
				slaveAttribute,
				cond.data.value[0],
				cond.data.value[1]);
			break;
		case "belongs": // the attribute belongs in the list of values
			flag = cond.data.value.includes(slave[cond.data.attribute]);
			break;
		case "custom": // user provided JS function
			// TODO: This should use a cached Function instead of 'eval'ing
			flag = eval(cond.data)(slave);
			break;
	}
	if (!flag) {
		return false;
	}
	// assignment / facility / special slaves / specific slaves check

	return (cond.assignment.length === 0 || cond.assignment.includes(slave.assignment)) &&
		(cond.selectedSlaves.length === 0 || cond.selectedSlaves.includes(slave.ID)) &&
		!(cond.excludedSlaves.includes(slave.ID));
};

App.RA.newRule = function() {
	return {
		rule: emptyRule,
		conditions: emptyConditions,
		setters: emptySetters,
		growth: emptyGrowth,
		surgery: emptySurgery
	};

	/** @returns {App.RA.Rule} */
	function emptyRule() {
		const id = generateNewID();
		return {
			ID: id,
			name: `Rule ${id}`,
			condition: emptyConditions(),
			// TODO: rename properties in snake_case to camelCase?
			set: emptySetters()
		};
	}

	/** @returns {App.RA.RuleConditions} */
	function emptyConditions() {
		return {
			function: false,
			data: {},
			assignment: [],
			selectedSlaves: [],
			excludedSlaves: [],
		};
	}
	/** @returns {App.RA.RuleSetters} */
	function emptySetters() {
		return {
			releaseRules: emptyRelease(),
			toyHole: null,
			clitSetting: null,
			clitSettingXY: null,
			clitSettingXX: null,
			clitSettingEnergy: null,
			speechRules: null,
			clothes: null,
			collar: null,
			shoes: null,
			armAccessory: null,
			legAccessory: null,
			chastityVagina: null,
			chastityAnus: null,
			chastityPenis: null,
			virginAccessory: null,
			aVirginAccessory: null,
			vaginalAccessory: null,
			aVirginDickAccessory: null,
			dickAccessory: null,
			bellyAccessory: null,
			aVirginButtplug: null,
			buttplug: null,
			buttplugAttachment: null,
			vaginalAttachment: null,
			eyeColor: null,
			makeup: null,
			nails: null,
			hColor: null,
			hornColor: null,
			hLength: null,
			haircuts: null,
			hStyle: null,
			eyebrowHColor: null,
			eyebrowHStyle: null,
			eyebrowFullness: null,
			markings: null,
			pubicHColor: null,
			pubicHStyle: null,
			nipplesPiercing: null,
			areolaePiercing: null,
			clitPiercing: null,
			vaginaLube: null,
			vaginaPiercing: null,
			dickPiercing: null,
			anusPiercing: null,
			lipsPiercing: null,
			tonguePiercing: null,
			earPiercing: null,
			nosePiercing: null,
			eyebrowPiercing: null,
			navelPiercing: null,
			corsetPiercing: null,
			boobsTat: null,
			buttTat: null,
			vaginaTat: null,
			dickTat: null,
			lipsTat: null,
			anusTat: null,
			shouldersTat: null,
			armsTat: null,
			legsTat: null,
			backTat: null,
			stampTat: null,
			birthsTat: null,
			abortionTat: null,
			brandDesign: null,
			brandTarget: null,
			scarTarget: null,
			scarDesign: null,
			curatives: null,
			livingRules: null,
			relationshipRules: null,
			standardPunishment: null,
			standardReward: null,
			weight: null,
			diet: null,
			dietCum: null,
			dietMilk: null,
			onDiet: null,
			muscles: null,
			XY: null,
			XX: null,
			gelding: null,
			preg: null,
			abortion: null,
			growth: emptyGrowth(),
			// eslint-disable-next-line camelcase
			hyper_drugs: 0,
			aphrodisiacs: null,
			autoSurgery: 0,
			autoBrand: 0,
			pornFeed: null,
			pornFameSpending: null,
			dietGrowthSupport: 0,
			eyewear: null,
			earwear: null,
			setAssignment: null,
			pitRules: null,
			facilityRemove: false,
			removalAssignment: "rest",
			surgery: emptySurgery(),
			underArmHColor: null,
			underArmHStyle: null,
			drug: null,
			eyes: null,
			pregSpeed: null,
			bellyImplantVol: -1,
			teeth: null,
			label: null,
			removeLabel: null,
			skinColor: null,
			inflationType: null,
		};
	}

	/** @returns {App.RA.RuleReleaseSetters} */
	function emptyRelease() {
		return {
			masturbation: null,
			partner: null,
			family: null,
			slaves: null,
			master: null
		};
	}

	/** @returns {App.RA.RuleGrowthSetters} */
	function emptyGrowth() {
		return {
			boobs: null,
			butt: null,
			lips: null,
			dick: null,
			balls: null,
			intensity: 0
		};
	}

	/** @returns {App.RA.RuleSurgerySettings} */
	function emptySurgery() {
		return {
			eyes: null,
			hears: null,
			smells: null,
			tastes: null,
			lactation: null,
			prostate: null,
			cosmetic: null,
			accent: null,
			shoulders: null,
			shouldersImplant: null,
			boobs: null,
			hips: null,
			hipsImplant: null,
			butt: null,
			faceShape: null,
			lips: null,
			holes: null,
			tummy: null,
			hair: null,
			bodyhair: null,
			vasectomy: null,
			earShape: null,
			horn: null,
			bellyImplant: null
		};
	}
}();

/**
 * @returns {App.RA.Rule}
 */
window.emptyDefaultRule = App.RA.newRule.rule;

/**
 * Saves the slave, silently fires the RA, saves the slave's after-RA state, and then reverts the slave.
 * Call and then check potential change against $slaveAfterRA to see if the RA would revert it.
 * @param {App.Entity.SlaveState} slave
 */
window.RulesDeconfliction = function RulesDeconfliction(slave) {
	const before = clone(slave);
	DefaultRules(slave);
	State.variables.slaveAfterRA = clone(slave);
	slave = before;
};

/**
 * Creates a table to summarize RA
 * @returns {string}
 */
window.RASummaryCell = function() {
	/**
	 * @param {object[]} objects
	 * @param {string[]} member
	 */
	function collectMemberFromObjects(objects, member) {
		let r = [];
		for (const o of objects) {
			let to = o;
			for (const m of member) {
				to = to[m];
			}
			r.push(to);
		}
		return r;
	}

	/**
	 * @callback objectWalker
	 * @param {object} obj
	 * @param {string[]} memberPath
	 */

	/**
	 * @param {object} obj
	 * @param {objectWalker} walker
	 * @param {string[]} path
	 */
	function walkObject(obj, walker, path) {
		for (const prop in obj) {
			const v = obj[prop];
			const vp = path.concat([prop]);
			if (v !== null && typeof v === 'object') {
				walkObject(v, walker, vp);
			} else {
				walker(obj, vp);
			}
		}
	}

	/**
	 * @param {string[]} path
	 * @param {Array} cells
	 * @param {string[]} table
	 */
	function addRow(path, cells, table) {
		if (!cells.some(v => v !== null)) { // skip empty rows
			return;
		}

		function ruleSetValueToString(v) {
			if (typeof v === 'object') {
				if(v.hasOwnProperty('cond') && v.hasOwnProperty('val')) {
					return `<nowiki>${v.cond}</nowiki>&nbsp;${v.val}`;
				} else if(v.hasOwnProperty('min') && v.hasOwnProperty('max')) {
					return `${v.min} to ${v.max}`;
				} else {
					return JSON.stringify(v);
				}
			}
			return `${v}`;
		}

		let r = `<td>${path.join('.')}</td>`;
		for (const cell of cells) {
			r += cell !== null ? `<td>${ruleSetValueToString(cell)}</td>` : '<td></td>';
		}
		table.push(r);
	}
	/** @type {App.RA.Rule[]} */
	const rules = V.defaultRules;
	let r = "";

	if (rules.length === 0) {
		return '';
	}

	/* start row title */
	r += `<tr><th style="position:sticky; top:0px; background:#111"></th>`;

	/* make rest of row title */
	for (const rule of rules) {
		r += `<th style="position:sticky; top:0px; background:#111">${rule.name}</th>`;
	}
	r += `</tr>`;

	const setters = rules.map(r => r.set);
	/* A row for every condition the RA can set. */
	/* start loop for row*/

	let tableRows = [];
	walkObject(emptyDefaultRule().set, (obj, path) => {
		addRow(path, collectMemberFromObjects(setters, path), tableRows);
	}, []);

	for (const row of tableRows) {
		r += `<tr>${row}</tr>`;
	}
	return r;
};

/**
 * Creates RA target object used in rules for body properties
 * @param {string} condition comparison condition. One of '==', '>=', '<=', '>', '<'
 * @param {number} val target value
 * @returns {App.RA.NumericTarget}
 */
App.RA.makeTarget = function(condition, val) {
	return {
		cond: condition,
		val: val
	};
};

/**
 * Creates RA range object used in rules
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {App.RA.NumericRange}
 */
App.RA.makeRange = function(minValue, maxValue) {
	return {
		min: minValue, max: maxValue
	};
};

/**
 * Shall the current value be increased according to the target and condition
 * @param {number} current
 * @param {App.RA.NumericTarget} target
 * @param {number} [step=1] change step
 * @returns {boolean}
 */
App.RA.shallGrow = function(current, target, step = 1) {
	return target && (((current < target.val - step) && (target.cond === '==')) ||
		((current < target.val) && (target.cond === '>=' || target.cond === '>')) ||
		(current === target.val && target.cond === '>'));
};

/**
 * Shall the current value be decreased according to the target and condition
 * @param {number} current
 * @param {App.RA.NumericTarget} target
 * @param {number} [step=1]
 * @returns {boolean}
 */
App.RA.shallShrink = function(current, target, step = 1) {
	return target && (((current > target.val + step) && (target.cond === '==')) ||
		((current > target.val) && (target.cond === '<=' || target.cond === '<')) ||
		(current === target.val && target.cond === '<'));
};

App.RA.ruleDeepAssign = function deepAssign(target, source) {
	function isObject(o) {
		return (o !== undefined && o !== null && typeof o === 'object' && !Array.isArray(o));
	}

	for (const key in source) {
		if (!source.hasOwnProperty(key)) {
			continue;
		}
		if (isObject(source[key])) {
			if (!target.hasOwnProperty(key) || target[key] === null) {
				target[key] = {};
			}
			deepAssign(target[key], source[key]);
		} else if (key === "label" || key === "removeLabel") {
			if (source[key] != null) {
				if (target[key] != null) {
					target[key] += "|" + source[key];
				} else {
					target[key] = source[key];
				}
			}
		} else {
			// A rule overrides any preceding ones if,
			// * there are no preceding ones,
			// * or it sets autoBrand,
			// * or it does not set autoBrand and is not null
			const overrides = (
				target[key] === undefined || target[key] === null ||
				(key === "autoBrand" && source[key]) ||
				(key !== "autoBrand" && source[key] !== null));
			if (overrides) {
				target[key] = source[key];
			}
		}
	}
	return target;
};
