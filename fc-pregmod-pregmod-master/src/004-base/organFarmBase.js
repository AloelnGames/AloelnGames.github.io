App.Medicine.OrganFarm.Organ = class {
	/**
	 * @param {string} type - unique type of organ, used as key
	 * @param {string} name - display name
	 * @param {string} tooltip - full sentence, uncapitalized and unpunctuated
	 * @param {number} cost - how much it costs to grow the organ
	 * @param {number} time - how long it takes to grow the organ (without upgrades)
	 * @param {function(App.Entity.SlaveState):boolean} canGrow
	 * @param {string[]} dependencies - organs that are implanted first if possible, use type of other organs as values
	 * @param {App.Medicine.OrganFarm.OrganImplantAction[]} actions
	 */
	constructor({type: type, name, tooltip= "", cost, time, canGrow = () => true, dependencies = [], actions= []} = {}) {
		this.type = type;
		this.name = name;
		this.tooltip = tooltip;
		this.cost = cost;
		this.time = time;
		/** @type {function(App.Entity.SlaveState):boolean} */
		this.canGrow = canGrow;
		/** @type {string[]} */
		this.dependencies = dependencies;
		/** @type {App.Medicine.OrganFarm.OrganImplantAction[]} */
		this.implantActions = actions;

		App.Medicine.OrganFarm.Organs[type] = this;
	}
};

App.Medicine.OrganFarm.OrganImplantAction = class {
	/**
	 * @param {string} name - display name
	 * @param {string} tooltip - full sentence, uncapitalized and unpunctuated
	 * @param {number} healthImpact
	 * @param {string} surgeryType - for use with surgery degradation
	 * @param {boolean} autoImplant
	 * @param {function(App.Entity.SlaveState):boolean} canImplant
	 * @param {function(App.Entity.SlaveState):string} implantError - message to show if this action cannot be used
	 * @param {function(App.Entity.SlaveState)} implant
	 */
	constructor({name, tooltip = "", healthImpact, surgeryType, autoImplant = true, canImplant, implantError, implant} = {}) {
		this.name = name;
		this.tooltip = tooltip;
		this.healthImpact = healthImpact;
		this.surgeryType = surgeryType;
		this.autoImplant = autoImplant;
		/**
		 * True if this action can implant the organ
		 * @type {function(App.Entity.SlaveState):boolean}
		 */
		this.canImplant = canImplant;
		/**
		 * Error message if the organ cannot be implanted.
		 * @type {function(App.Entity.SlaveState):string}
		 */
		this.implantError = implantError;
		/**
		 * Implant the organ
		 * @type {function(App.Entity.SlaveState)}
		 */
		this.implant = implant;
	}
};
