App.Arcology.Cell.Market = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {number} owner
	 * @param {string} type
	 */
	constructor(owner, type = "Markets") {
		super(owner);
		this.type = type;
	}

	static get cellName() {
		return "Markets";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		switch (this.type) {
			case "Markets":
				return "markets";
			case "Arcade":
				return "arcade";
			case "Pit":
				return "pit";
			case "Transport Hub":
				return "transportHub";
			case "Corporate Market":
				return "corporateMarket";
			default:
				return super.colorClass;
		}
	}

	isBaseType() {
		return this.type === "Markets";
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		if (this.type === "Arcade") {
			const fragment = document.createDocumentFragment();
			fragment.append(App.UI.DOM.passageLink(arcadeUIName(), "Arcade"),
				` (${V.ArcadeiIDs.length}/${V.arcade})`);
			return fragment;
		}
		if (this.type === "Pit") {
			const fragment = document.createDocumentFragment();
			fragment.append(App.UI.DOM.passageLink(pitUIName(), "Pit"),
				`(${V.fighterIDs.length})`);
			return fragment;
		}
		switch (this.type) {
			case "Markets":
				return App.Arcology.getCellLink(path, "Markets");
			case "Transport Hub":
				return App.UI.DOM.passageLink("Transport Hub", "transportHub");
			case "Corporate Market":
				return App.UI.DOM.passageLink("Corporate Market", "Corporate Market");
			default:
				return App.UI.DOM.makeElement("span", "ERROR: invalid type: " + this.type, "error");
		}
	}

	/**
	 * @returns {string|Node}
	 * @private
	 */
	_setting() {
		/* no need to check type, since you can only get here with the basic type */
		let r = "area of the concourse occupied by large stores and markets, many of which sell slaves";

		if (this.owner === 1) {
			return `This is an ${r}. You control this part of the arcology and all these tenants pay you rent.`;
		}
		return `This is a privately-owned ${r}.`;
	}

	/**
	 * @returns {Node}
	 * @private
	 */
	_body() {
		const fragment = document.createDocumentFragment();

		const cost = Math.trunc(10000 * V.upgradeMultiplierArcology);
		if (V.arcade === 0) {
			fragment.append(this._makeUpgrade(
				"Construct a sex arcade to present slaves' holes for public use",
				() => {
					this.type = "Arcade";
					V.arcade = 10;
				}, cost, "and will incur upkeep costs"
			));
		}

		if (V.pit === 0) {
			fragment.append(this._makeUpgrade(
				"Build a pit to host proper slave fights",
				() => {
					this.type = "Pit";
					V.pit = 1;
				}, cost
			));
		}

		if (V.secExpEnabled === 1 && V.transportHub === 0) {
			fragment.append(this._makeUpgrade(
				"Centralize and modernize the transport hub",
				() => {
					this.type = "Transport Hub";
					V.transportHub = 1;
					V.docks = 1;
					V.railway = 1;
					V.airport = 1;
				}, cost
			));
		}

		const corpCost = Math.trunc(10000 * V.upgradeMultiplierArcology);
		if (V.corp.Market === 0 && V.corp.Incorporated === 1) {
			fragment.append(this._makeUpgrade(
				"Create a flagship slave market for your corporation here",
				() => {
					this.type = "Corporate Market";
					V.corp.Market = 1;
					V.corp.Cash -= corpCost;
				}, 0, `Costs ${cashFormat(corpCost)} of the corporation's money`
			));
		}

		return fragment;
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return this.type === "Markets";
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Cell.Market())._init(this);
	}

	get className() { return "App.Arcology.Cell.Market"; }
};
