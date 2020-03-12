/**
 * @param {Array<number>} path
 * @param {string} message
 * @returns {Node}
 */
App.Arcology.getCellLink = function(path, message) {
	return App.UI.DOM.passageLink(message, "Cell", () => { V.cellPath = path; });
};

/**
 * Upgrades all instances of cellClass and cellType to newType.
 * Intended for use on guaranteed single hits.
 *
 * @param {App.Arcology.Building} building
 * @param {class} cellClass
 * @param {any} cellType
 * @param {any} newType
 * @param {string} [key]
 */
App.Arcology.cellUpgrade = function(building, cellClass, cellType, newType, key = "type") {
	building.findCells(cell => cell instanceof cellClass && cell[key] === cellType)
		.forEach(cell => { cell[key] = newType; });
};

/**
 * Updates V.arcologies[0].ownership.
 */
App.Arcology.updateOwnership = function() {
	const allCells = V.building.findCells(() => true);
	const ownedCells = allCells.filter(cell => cell.owner === 1);

	const ratio = ownedCells.length / allCells.length;

	V.arcologies[0].ownership = Math.round(100 * ratio);
};

/**
 * @param {string} location
 * @returns {App.Arcology.Building}
 */
App.Arcology.defaultBuilding = function(location = "default") {
	/**
	 * @type {arcologyEnvironment}
	 */
	const env = {location: location, established: false, fs: ""};
	const candidates = App.Arcology.presets.filter(preset => preset.isAllowed(env));
	return candidates.pluck().construct(env);
};

/**
 * Order of the building sections. All possible sections have to be added here.
 *
 * @type {string[]}
 */
App.Arcology.sectionOrder = ["penthouse", "spire", "shops", "ravine-markets", "apartments", "markets", "manufacturing"];

App.Arcology.Section = class extends App.Entity.Serializable {
	/**
	 * @param {string} id unique ID
	 * @param {Array<Array<App.Arcology.Cell.BaseCell>>} rows
	 * @param {boolean} groundLevel if the section the ground level, all lower layers are automatically in the basement
	 */
	constructor(id, rows, groundLevel = false) {
		super();
		/**
		 * @type {string}
		 */
		this.id = id;
		/**
		 * @type {Array<Array<App.Arcology.Cell.BaseCell>>}
		 */
		this.rows = rows;
		this.groundLevel = groundLevel;
	}

	get width() {
		let maxWidth = 0;

		this.rows.forEach(cells => {
			let width = 0;
			cells.forEach(cell => {
				width += cell.width;
			});
			maxWidth = Math.max(maxWidth, width);
		});
		return maxWidth;
	}

	/**
	 * @param {number} elementWidth in %
	 * @param {number} index
	 * @returns {DocumentFragment}
	 */
	render(elementWidth, index) {
		/**
		 * @param {App.Arcology.Cell.BaseCell} cell
		 * @param {number} rowIndex
		 * @param {number} cellIndex
		 * @returns {HTMLDivElement}
		 */
		function createCell(cell, rowIndex, cellIndex) {
			const outerCell = document.createElement("div");
			outerCell.classList.add("outerCell");
			outerCell.style.minWidth = `${elementWidth * cell.width}%`;
			outerCell.style.maxWidth = `${elementWidth * cell.width}%`;

			const innerCell = document.createElement("div");
			innerCell.classList.add("innerCell");
			innerCell.classList.add(cell.owner === 1 ? cell.colorClass : "private");
			innerCell.append(cell.cellContent([index, rowIndex, cellIndex]));

			outerCell.append(innerCell);

			return outerCell;
		}

		/**
		 * @param {Array<App.Arcology.Cell.BaseCell>} row
		 * @param {number} rowIndex
		 * @returns {HTMLDivElement}
		 */
		function createRow(row, rowIndex) {
			const div = document.createElement("div");
			div.classList.add("row");

			row.forEach((cell, cellIndex) => {
				div.append(createCell(cell, rowIndex, cellIndex));
			});

			return div;
		}

		const fragment = document.createDocumentFragment();

		this.rows.forEach((row, rowIndex) => {
			fragment.append(createRow(row, rowIndex));
		});

		return fragment;
	}

	/**
	 * @param {Array<number>} path of the form [i, j]
	 * @returns {App.Arcology.Cell.BaseCell}
	 */
	cellByPath(path) {
		return this.rows[path[0]][path[1]];
	}

	/**
	 * @param {function(App.Arcology.Cell.BaseCell): boolean} predicate
	 * @returns {Array<App.Arcology.Cell.BaseCell>}
	 */
	findCells(predicate) {
		const cells = [];
		for (const row of this.rows) {
			for (const cell of row) {
				if (predicate(cell)) {
					cells.push(cell);
				}
			}
		}
		return cells;
	}

	/**
	 * Replaces the first occurrence of oldCell with newCell
	 *
	 * @param {App.Arcology.Cell.BaseCell} oldCell
	 * @param {App.Arcology.Cell.BaseCell} newCell
	 * @returns {boolean}
	 */
	replaceCell(oldCell, newCell) {
		for (const row of this.rows) {
			for (let i = 0; i < row.length; i++) {
				if (row[i] === oldCell) {
					row[i] = newCell;
					return true;
				}
			}
		}
		return false;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Section())._init(this);
	}

	get className() { return "App.Arcology.Section"; }
};

App.Arcology.Building = class extends App.Entity.Serializable {
	/**
	 * @param {Array<App.Arcology.Section>} sections
	 */
	constructor(sections) {
		super();
		/**
		 * @type {Array<App.Arcology.Section>}
		 */
		this.sections = sections;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	render() {
		const fragment = document.createDocumentFragment();

		let maxWidth = 0;
		this.sections.forEach(section => {
			maxWidth = Math.max(section.width, maxWidth);
		});
		const elementWidth = 100 / maxWidth;

		const upperLevels = document.createElement("div");
		upperLevels.classList.add("building");
		const basement = document.createElement("div");
		basement.classList.add("building", "basement");

		let wrapper = upperLevels;
		sortArrayByArray(App.Arcology.sectionOrder, this.sections, "id")
			.forEach((section, index) => {
				wrapper.append(section.render(elementWidth, index));
				if (section.groundLevel) {
					// if there are multiple sections that are ground level the first (highest) section wins and all
					// others are in the basement.
					wrapper = basement;
				}
			});

		fragment.append(upperLevels, basement);
		return fragment;
	}

	/**
	 * @param {Array<any>} path
	 * @returns {App.Arcology.Cell.BaseCell}
	 */
	cellByPath(path) {
		return this.sections[path[0]].cellByPath(path.slice(1));
	}

	/**
	 * @param {function(App.Arcology.Cell.BaseCell): boolean} predicate
	 * @returns {Array<App.Arcology.Cell.BaseCell>}
	 */
	findCells(predicate) {
		return this.sections.reduce(
			(cells, section) => {
				cells.push(...section.findCells(predicate));
				return cells;
			}, []);
	}

	/**
	 * @param {App.Arcology.Cell.BaseCell} oldCell
	 * @param {App.Arcology.Cell.BaseCell} newCell
	 * @returns {boolean}
	 */
	replaceCell(oldCell, newCell) {
		for (let section of this.sections) {
			if (section.replaceCell(oldCell, newCell)) {
				return true;
			}
		}
		return false;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Building())._init(this);
	}

	get className() { return "App.Arcology.Building"; }
};
