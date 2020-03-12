/**
 * @typedef {object} arcologyEnvironment
 * @property {string} location
 * @property {boolean} established
 * @property {string} fs
 */
/**
 * @typedef {object} buildingPreset
 * @property {function(arcologyEnvironment):boolean} isAllowed
 * @property {function(arcologyEnvironment):App.Arcology.Building} construct
 * @property {function():void} apply
 */

/**
 * @type {Array<buildingPreset>}
 */
App.Arcology.presets = (function() {
	/**
	 * @typedef {object} sectionTemplate
	 * @property {string} id
	 * @property {Array<string>} rows
	 * @property {boolean} [ground]
	 */
	/**
	 * @typedef {Array<sectionTemplate>} buildingTemplate
	 */

	/* NOTE: test new templates, broken templates WILL explode */
	/* t is markets, () is possible values for a sector, first is default */
	const templates = {
		default: [{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["aaaa", "aaaa", "aaaa"]},
			{id: "markets", rows: ["ttttt"], ground: true},
			{id: "manufacturing", rows: ["mmmmm"]}],
		urban: [{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["aaaa", "aaaa", "dddd"]},
			{id: "markets", rows: ["(dt)tt(dt)", "t(tm)(tm)t"], ground: true},
			{id: "manufacturing", rows: ["mmmm"]}],
		rural: [{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["aaaaa", "aaaaa"]},
			{id: "markets", rows: ["tt(mt)(mt)tt"], ground: true},
			{id: "manufacturing", rows: ["mmmmm"]}],
		ravine: [{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "ravine-markets", rows: ["ttttt"], ground: true},
			{id: "apartments", rows: ["aaaa", "aaaa", "aaaa"]},
			{id: "manufacturing", rows: ["mmmmm"]}],
		marine: [{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["ssss"]},
			{id: "apartments", rows: ["laal", "aaaa", "aaaa"]},
			{id: "markets", rows: ["tt(mt)tt"], ground: true},
			{id: "manufacturing", rows: ["(tm)mmm(tm)"]}],
		oceanic: [{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["llll", "aaaa", "aaaa"]},
			{id: "markets", rows: ["ttttt"], ground: true},
			{id: "manufacturing", rows: ["mmmmm"]}],
	};

	/**
	 * @param {buildingTemplate} template
	 * @returns {App.Arcology.Building}
	 */
	function templateToBuilding(template) {
		const sections = [];
		for (let sectionTemplate of template) {
			sections.push(getSection(sectionTemplate));
		}
		return new App.Arcology.Building(sections);

		/**
		 * @param {sectionTemplate} section
		 * @returns {App.Arcology.Section}
		 */
		function getSection(section) {
			const rows = [];
			for (const row of section.rows) {
				rows.push(getRow(row));
			}
			return new App.Arcology.Section(section.id, rows, section.ground === true /* to ensure no undefined gets trough */);
		}

		/**
		 * @param {string} rowTemplate
		 * @returns {[App.Arcology.Cell.BaseCell]}
		 */
		function getRow(rowTemplate) {
			const cells = [];
			const iter = rowTemplate[Symbol.iterator]();

			let next = iter.next();
			while (!next.done) {
				if (next.value === "(") {
					const cell = charToCell(iter.next().value).cell;
					next = iter.next();
					while (next.value !== ")") {
						cell.allowedConversions.push(charToCell(next.value).code);
						next = iter.next();
					}
					cells.push(cell);
				} else {
					cells.push(charToCell(next.value).cell);
				}
				next = iter.next();
			}

			return cells;
		}

		/**
		 * @param {string} char
		 * @returns {{cell: App.Arcology.Cell.BaseCell, code:string}}
		 */
		function charToCell(char) {
			switch (char) {
				case "p":
					return {cell: new App.Arcology.Cell.Penthouse(), code: "Penthouse"};
				case "s":
					return {cell: new App.Arcology.Cell.Shop(1), code: "Shop"};
				case "l":
					return {cell: new App.Arcology.Cell.Apartment(1, 1), code: "Apartment"};
				case "a":
					return {cell: new App.Arcology.Cell.Apartment(1), code: "Apartment"};
				case "d":
					return {cell: new App.Arcology.Cell.Apartment(1, 3), code: "Apartment"};
				case "t":
					return {cell: new App.Arcology.Cell.Market(1), code: "Market"};
				case "m":
					return {cell: new App.Arcology.Cell.Manufacturing(1), code: "Manufacturing"};
				default:
					return {cell: new App.Arcology.Cell.BaseCell(1), code: "BaseCell"};
			}
		}
	}

	return [
		/* basic types for controlled start */
		{
			isAllowed: env => !env.established && env.location === "default",
			construct: () => templateToBuilding(templates.default),
			apply() {}
		}, {
			isAllowed: env => !env.established && env.location === "urban",
			construct: () => templateToBuilding(templates.urban),
			apply() {}
		}, {
			isAllowed: env => !env.established && env.location === "rural",
			construct: () => templateToBuilding(templates.rural),
			apply() {}
		}, {
			isAllowed: env => !env.established && env.location === "ravine",
			construct: () => templateToBuilding(templates.ravine),
			apply() {}
		}, {
			isAllowed: env => !env.established && env.location === "marine",
			construct: () => templateToBuilding(templates.marine),
			apply() {}
		}, {
			isAllowed: env => !env.established && env.location === "oceanic",
			construct: () => templateToBuilding(templates.oceanic),
			apply() {}
		},
		/* crazy presets for established arcologies TODO */
		{
			isAllowed: env => env.established && env.location === "default",
			construct() { return templateToBuilding(templates.default); },
			apply() {}
		}, {
			isAllowed: env => env.established && env.location === "urban",
			construct() { return templateToBuilding(templates.urban); },
			apply() {}
		}, {
			isAllowed: env => env.established && env.location === "rural",
			construct() { return templateToBuilding(templates.rural); },
			apply() {}
		}, {
			isAllowed: env => env.established && env.location === "ravine",
			construct() { return templateToBuilding(templates.ravine); },
			apply() {}
		}, {
			isAllowed: env => env.established && env.location === "marine",
			construct() { return templateToBuilding(templates.marine); },
			apply() {}
		}, {
			isAllowed: env => env.established && env.location === "oceanic",
			construct() { return templateToBuilding(templates.oceanic); },
			apply() {}
		},
	];
}());

