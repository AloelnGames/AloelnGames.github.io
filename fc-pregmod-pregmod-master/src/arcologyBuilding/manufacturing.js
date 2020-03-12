App.Arcology.Cell.Manufacturing = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {number} owner
	 * @param {string} type
	 */
	constructor(owner, type = "Manufacturing") {
		super(owner);
		this.type = type;
	}

	static get cellName() {
		return "Manufacturing";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		switch (this.type) {
			case "Manufacturing":
				return "manufacturing";
			case "Dairy":
				return "diary";
			case "Farmyard":
				return "farmyard";
			case "Barracks":
				return "barracks";
			case "Weapon Manufacturing":
				return "weaponsManufacturing";
			case "Pens":
				return "pens";
			case "Sweatshops":
				return "sweatshops";
			default:
				return super.colorClass;
		}
	}

	/**
	 * @returns {boolean}
	 */
	isBaseType() {
		return this.type === "Manufacturing";
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		if (this.type === "Dairy") {
			const fragment = document.createDocumentFragment();
			fragment.append(App.UI.DOM.passageLink(dairyUIName(), "Dairy"),
				` (${V.DairyiIDs.length}${V.bioreactorsXY + V.bioreactorsXX + V.bioreactorsHerm + V.bioreactorsBarren > 0 ? "+" : ""}/${V.dairy})`);
			if (V.Milkmaid) {
				fragment.append(",L");
			}
			return fragment;
		}
		if (this.type === "Farmyard") {
			const fragment = document.createDocumentFragment();
			fragment.append(App.UI.DOM.passageLink("Farmyard", "Farmyard"),
				` (${V.FarmyardiIDs.length}/${V.farmyard})`);
			if (V.Farmer) {
				fragment.append(",L");
			}
			return fragment;
		}
		switch (this.type) {
			case "Manufacturing":
			case "Pens":
			case "Sweatshops":
				return App.Arcology.getCellLink(path, this.type);
			case "Barracks":
				return App.UI.DOM.passageLink("Barracks", "Barracks");
			case "Weapon Manufacturing":
				return App.UI.DOM.passageLink("Weapons Manufacturing", "weaponsManufacturing");
			default:
				return App.UI.DOM.makeElement("span", `ERROR: invalid type: ${this.type}`, "error");
		}
	}

	/**
	 * @returns {string|Node}
	 * @private
	 */
	_setting() {
		let r = "";

		switch (this.type) {
			case "Manufacturing":
				r = "rented to a variety of tenants for manufacturing purposes";
				if (this.owner === 1) {
					r += ". You control this part of the arcology and all these tenants pay you rent";
				}
				break;
			case "Sweatshops":
				if (this.owner === 1) {
					r = "designed for labor intensive manufacturing by menial slaves";
				} else {
					r = "rented to a variety of tenants for manufacturing purposes";
				}
				break;
			case "Pens":
				r = "designed to house hundreds of slaves for paying owners";
				if (this.owner === 1) {
					r += ". You control this part of the arcology. If you own menial slaves, they will be kept here; otherwise, unused space will be rented to other slave brokers";
				}
				break;
		}

		if (this.owner === 1) {
			return `This is a space in the arcology's service areas, ${r}.`;
		}
		return `This is a privately-owned space in the arcology's service areas, ${r}.`;
	}

	/**
	 * @returns {Node}
	 * @private
	 */
	_body() {
		const fragment = document.createDocumentFragment();

		const pensDOM = pens(this);
		if (pensDOM !== null) {
			console.log("if");
			fragment.append(pensDOM);

			const p = document.createElement("p");
			p.append(upgrades(this));
			console.log("up");
			fragment.append(p);
		} else {
			console.log("bor");
			fragment.append(upgrades(this));
		}

		return fragment;

		/**
		 * @param {App.Arcology.Cell.Manufacturing} thisCell this is apparently undefined inside???
		 * @returns {null|HTMLParagraphElement}
		 */
		function pens(thisCell) {
			if (thisCell.type !== "Pens") {
				return null;
			}

			const paragraph = document.createElement("p");

			paragraph.append(App.UI.DOM.makeElement("div", MenialPopCap()),
				App.UI.DOM.makeElement("div", `In total you are able to personally house a total of ${num(V.PopCap)} menial slaves.`));

			if (V.menials + V.menialBioreactors + V.fuckdolls > 0) {
				let r = "You own ";
				let list = [];
				if (V.menials > 0) {
					list.push(numberWithPluralOne(V.menials, "menial slave"));
				}
				if (V.menialBioreactors > 0) {
					list.push(numberWithPluralOne(V.menialBioreactors, "standard bioreactor"));
				}
				if (V.fuckdolls > 0) {
					list.push(numberWithPluralOne(V.fuckdolls, "standard Fuckdoll"));
				}

				r += `${list.toStringExt()}, `;

				if (V.menials + V.menialBioreactors + V.fuckdolls > 500) {
					r += "partially ";
				}

				r += "housed in this sector.";

				if (V.menials > 0 && V.Sweatshops > 0) {
					r += ` The simple labor slaves toil in ${V.arcologies[0].name}'s sweatshops, and only return here to sleep.`;
				}
				if (V.fuckdolls > 0 && V.arcade > 0) {
					r += ` The menial Fuckdolls are endlessly cycled through ${V.arcadeName}. They're restrained there and used by the public until their holes are no longer appealing, and then cycled back down here to rest until they've tightened up again.`;
				}
				if (V.menialBioreactors && V.dairyUpgradeMenials) {
					r += ` Whenever there's space in ${V.dairyName}, menial Bioreactors are taken out of storage here and restrained there, with ${V.dairyName}'s powerful hookups draining them of their useful fluids and feeding them generously so they can produce more.`;
				}

				paragraph.append(r);
			}

			return paragraph;
		}

		/**
		 * @param {App.Arcology.Cell.Manufacturing} thisCell
		 * @returns {DocumentFragment}
		 */
		function upgrades(thisCell) {
			const fragment = document.createDocumentFragment();
			const cost = Math.trunc(10000 * V.upgradeMultiplierArcology);

			if (V.dairy === 0) {
				fragment.append(thisCell._makeUpgrade(
					"Construct a dairy to milk slaves on an industrial scale",
					() => {
						V.dairy = 5;
						thisCell.type = "Dairy";
					}, cost, "and will incur upkeep costs"
				));
			}

			if (V.experimental.food === 1) {
				if (V.farmyard === 0) {
					fragment.append(thisCell._makeUpgrade(
						"Construct a farming facility to grow food for your arcology and house animals",
						() => {
							V.farmyard = 5;
							thisCell.type = "Farmyard";
						}, cost, "and will incur upkeep costs",
						// this only exists for the farmyard, remove feature once that is out of alpha
						App.UI.DOM.makeElement("span", "Alpha Content!", "warning")
					));
				}
			}

			if (V.mercenaries) {
				if (V.barracks !== 1) {
					fragment.append(thisCell._makeUpgrade(
						"Build an armory to properly house your mercenaries",
						() => {
							V.barracks = 1;
							thisCell.type = "Barracks";
						}, cost, "but will reduce mercenary upkeep"
					));
				}
			}

			if (V.secExpEnabled === 1) {
				if (V.weapManu !== 1) {
					fragment.append(thisCell._makeUpgrade(
						"Convert this sector to weapons manufacturing",
						() => {
							V.weapManu = 1;
							thisCell.type = "Weapon Manufacturing";
						}, cost, "but will provide a weekly income and will unlock upgrades for our troops"
					));
				}
			}

			if (thisCell.type !== "Pens") {
				fragment.append(thisCell._makeUpgrade(
					"Convert to pens to increase the number of menial slaves you can house",
					() => {
						thisCell.type = "Pens";
					}, cost
				));
			}

			if (thisCell.type !== "Sweatshops") {
				fragment.append(thisCell._makeUpgrade(
					"Convert these facilities to use the labor of menial slaves",
					() => {
						thisCell.type = "Sweatshops";
					}, cost
				));
			}

			if (thisCell.type !== "Manufacturing") {
				fragment.append(thisCell._makeUpgrade(
					"Return this sector to standard manufacturing",
					() => {
						thisCell.type = "Manufacturing";
					}, cost
				));
			}

			return fragment;
		}
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return ["Manufacturing", "Sweatshops", "Pens"].includes(this.type);
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Cell.Manufacturing())._init(this);
	}

	get className() {
		return "App.Arcology.Cell.Manufacturing";
	}
};
