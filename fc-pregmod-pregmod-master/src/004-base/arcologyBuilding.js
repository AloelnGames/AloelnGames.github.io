App.Arcology.Cell.BaseCell = class extends App.Entity.Serializable {
	/**
	 * @param {number} owner
	 */
	constructor(owner) {
		super();
		/**
		 * 0: private
		 * 1: player
		 * @type {number}
		 */
		this.owner = owner;
		/**
		 * List of classes this cell can be converted to.
		 * Format: "BaseCell" stands for App.Arcology.Cell.BaseCell
		 * Note: The current class needs to be included as well, otherwise converting back is not possible.
		 * @type {string[]}
		 */
		this.allowedConversions = [];
	}

	/**
	 * @returns {string}
	 */
	static get cellName() {
		return "baseCell";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		return "empty";
	}

	/**
	 * @returns {number}
	 */
	get width() {
		return 1;
	}

	/**
	 * @returns {boolean}
	 */
	isBaseType() {
		return true;
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		return document.createDocumentFragment();
	}

	/**
	 * @param {App.Arcology.Building} containingBuilding
	 * @returns {Node}
	 */
	cellPassage(containingBuilding) {
		const fragment = document.createDocumentFragment();

		const scene = document.createElement("p");
		scene.classList.add("scene-intro");
		scene.append(this._setting());
		if (this.canBeSold()) {
			scene.append(ownership(this));
		}
		fragment.append(scene);

		if (this.owner === 1) {
			const upgrades = document.createElement("p");

			upgrades.append(this._body());

			fragment.append(upgrades);
		}

		if (this.allowedConversions.length > 0 && this.isBaseType()) {
			const p = document.createElement("p");
			if (V.rep < 5000) {
				fragment.append(App.UI.DOM.makeElement("p", "You don't have the reputation required to convert the sector base type."));
			} else {
				for (const ac of this.allowedConversions) {
					const cellClass = eval(`App.Arcology.Cell.${ac}`);
					if (!(this instanceof cellClass)) {
						p.append(this._makeUpgrade(`Convert sector to ${cellClass.cellName}.`, () => {
							const newCell = new cellClass(1);
							newCell.allowedConversions = this.allowedConversions;
							containingBuilding.replaceCell(this, newCell);
							repX(-5000, "capEx");
						}, 50000, "and 5000 reputation as many citizens will lose most of what they own."));
					}
				}
			}
			fragment.append(p);
		}


		return fragment;

		/**
		 * @returns {DocumentFragment}
		 */
		function ownership(cell) {
			const fragment = document.createDocumentFragment();
			const A = V.arcologies[0];

			const price = 1000 * Math.trunc(A.prosperity * (1 + (A.demandFactor / 100)));
			if (cell.owner === 1) {
				fragment.append(`Selling this sector would relinquish a 4% interest in ${A.name}. Such an interest is worth ${cashFormat(price)}.`);

				if (A.ownership >= 4) {
					const span = document.createElement("span");
					span.classList.add("clear-formatting");
					span.append(App.UI.DOM.passageLink("Sell", "Main",
						() => {
							cashX(price, "capEx");
							App.Arcology.updateOwnership();
							A.demandFactor -= 20;
							cell.owner = 0;
						}));
					fragment.append(" ", span);
				}
			} else {
				fragment.append(`You will have to acquire an additional 4% interest in ${A.name} to take control of this sector. Such an interest is worth ${cashFormat(price)} and will require a transaction cost of ${cashFormat(10000)} to acquire for a total cost of ${cashFormat(price + 10000)}.`);
				if (A.ownership + A.minority <= 96) {
					const buySpan = document.createElement("span");
					buySpan.classList.add("clear-formatting");
					buySpan.append(App.UI.DOM.passageLink("Buy", "Main",
						() => {
							cashX(-(price + 10000), "capEx");
							A.demandFactor += 20;
							App.Arcology.updateOwnership();
							cell.owner = 1;
						}));
					fragment.append(" ", buySpan);

					if (V.rep >= 18000) {
						const repDiv = document.createElement("div");
						repDiv.classList.add("choices", "clear-formatting");

						const repPrice = Math.clamp(price / 2, 0, 18000);
						repDiv.append("You have so much political capital that you can spend reputation to acquire ownership by spending reputation.",
							App.UI.DOM.passageLink("Use reputation", "Main",
								() => {
									repX(-(repPrice), "capEx");
									A.demandFactor += 20;
									App.Arcology.updateOwnership();
									cell.owner = 1;
								}));
						fragment.append(repDiv);
					}
				} else {
					fragment.append("Too much of the arcology is owned by a single minority holder for you to force a purchase of this sector right now. Your control of the arcology should naturally resolve this situation in a few weeks.");
				}
			}
			return fragment;
		}
	}

	/**
	 * @returns {string|Node}
	 * @private
	 */
	_setting() {
		return "baseCell";
	}

	/**
	 * @returns {Node}
	 * @private
	 */
	_body() {
		return document.createDocumentFragment();
	}

	/**
	 * @param {string} name
	 * @param {function(): void} action
	 * @param {number} cost
	 * @param {string} [note]
	 * @param {Node} [domNote]
	 * @returns {HTMLDivElement}
	 * @protected
	 */
	_makeUpgrade(name, action, cost, note, domNote) {
		const div = document.createElement("div");

		div.append(App.UI.DOM.passageLink(name, "Main",
			() => {
				cashX(-cost, "capEx");
				action();
			}));

		if (cost > 0 || note === undefined) {
			note = ` Costs ${cashFormat(cost)}${note !== undefined ? ` ${note}` : ""}.`;
		}
		App.UI.DOM.appendNewElement("span", note, div, "detail");

		if (domNote !== undefined) {
			div.append(domNote); // this only exists for the farmyard, remove once that is out of alpha
		}

		return div;
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return false;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Cell.BaseCell())._init(this);
	}

	get className() { return "App.Arcology.Cell.BaseCell"; }
};
