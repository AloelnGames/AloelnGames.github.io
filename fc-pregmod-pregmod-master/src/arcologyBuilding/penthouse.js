App.Arcology.Cell.Penthouse = class extends App.Arcology.Cell.BaseCell {
	constructor() {
		super(1);
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		return "penthouse";
	}

	/**
	 * @returns {number}
	 */
	get width() {
		return 2;
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		const fragment = document.createDocumentFragment();

		const link = App.UI.DOM.passageLink("Penthouse", "Manage Penthouse");
		const hotkey = App.UI.DOM.makeElement("span", "[P]", "hotkey");
		if (V.verticalizeArcologyLinks === 0) {
			const div = document.createElement("div");
			div.append(link, " ", hotkey);
			fragment.append(div);
		} else {
			fragment.append(link, " ", hotkey);
		}

		let wrapper = getWrapper(fragment);

		if (V.masterSuite) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(masterSuiteUIName(), "Master Suite"),
				`(${V.MastSiIDs.length}/${V.masterSuite}${V.Concubine ? ", C" : ""})`));
		}

		if (V.HGSuite) {
			const link = App.UI.DOM.passageLink(headGirlSuiteUIName(), "Head Girl Suite");

			if (V.HeadGirl !== 0) {
				wrapper.append(createFacilityDiv(link, `(HG${V.HGSuiteiIDs.length > 0 ? ", 1" : ""})`));
			} else {
				wrapper.append(createFacilityDiv(link));
			}
		}

		if (V.dojo > 1) {
			const link = App.UI.DOM.passageLink("Armory", "BG Select");

			if (V.Bodyguard !== 0) {
				wrapper.append(createFacilityDiv(link, "BG"));
			} else {
				wrapper.append(createFacilityDiv(link));
			}
		}

		if (V.servantsQuarters) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(servantQuartersUIName(), "Servants' Quarters"),
				`(${V.ServQiIDs.length}/${V.servantsQuarters}${V.Stewardess ? ", L" : ""})`));
		}

		if (V.spa) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(spaUIName(), "Spa"),
				`(${V.SpaiIDs.length}/${V.spa}${V.Attendant ? ", L" : ""})`));
		}

		if (V.nursery) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(nurseryUIName(), "Nursery"),
				`(${numberWithPluralOne(V.nursery - V.nurseryBabies, "empty room")}, ${V.NurseryiIDs.length}/${V.nurseryNannies}${V.Matron ? ", L" : ""})`));
		}

		if (V.clinic) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(clinicUIName(), "Clinic"),
				`(${V.CliniciIDs.length}/${V.clinic}${V.Nurse ? ", L" : ""})`));
		}

		if (V.schoolroom) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(schoolRoomUIName(), "Schoolroom"),
				`(${V.SchlRiIDs.length}/${V.schoolroom}${V.Schoolteacher ? ", L" : ""})`));
		}

		if (V.cellblock) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink(cellblockUIName(), "Cellblock"),
				`(${V.CellBiIDs.length}/${V.cellblock}${V.Wardeness ? ", L" : ""})`));
		}

		if (V.incubator) {
			const link = App.UI.DOM.passageLink(incubatorUIName(), "Incubator");
			const desc = `(${numberWithPluralOne(V.incubator - V.tanks.length, "empty tank")})`;

			if (V.readySlaves > 0) {
				wrapper.append(createFacilityDiv(link, desc, App.UI.DOM.makeElement("span", "[!]", "noteworthy")));
			} else {
				wrapper.append(createFacilityDiv(link, desc));
			}
		}

		if (V.researchLab.level > 0) {
			wrapper.append(createFacilityDiv(App.UI.DOM.passageLink("Prosthetic Lab", "Prosthetic Lab")));
		}

		return fragment;

		/**
		 * @returns {Node}
		 */
		function getWrapper(outer) {
			const wrapper = document.createElement("div");
			if (V.verticalizeArcologyLinks !== 0) {
				let gridClass = `grid${V.verticalizeArcologyLinks}`;
				wrapper.classList.add("gridWrapper", gridClass);
			}
			outer.append(wrapper);
			return wrapper;
		}

		/**
		 *
		 * @param {HTMLElement} link
		 * @param {Node|string} content
		 * @returns {HTMLDivElement}
		 */
		function createFacilityDiv(link, ...content) {
			const div = document.createElement("div");
			div.append(link);
			// in collapsed mode additional information needs to be in it's own div to stop linebreaks at weird places
			if (V.verticalizeArcologyLinks === 0) {
				div.classList.add("collapsed");
				div.append(" ", ...content);
			} else {
				const innerDiv = document.createElement("div");
				innerDiv.append(...content);
				div.append(" ", innerDiv);
			}
			return div;
		}
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Cell.Penthouse())._init(this);
	}

	get className() { return "App.Arcology.Cell.Penthouse"; }
};
