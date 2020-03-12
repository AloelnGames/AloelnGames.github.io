App.SecExp.majorBattleState = class {
	constructor() {
		this.enabled = 1;
		this.gameOver = 1;
		this.force = 0;
		this.mult = 1;
	}
};

App.SecExp.battleState = class {
	constructor() {
		this.enabled = 1;
		this.frequency = 1;
		this.force = 0;
		this.allowSlavePrestige = 1;
		this.major = new App.SecExp.majorBattleState();
	}
};

App.SecExp.rebellionState = class {
	constructor() {
		this.enabled = 1;
		this.gameOver = 1;
		this.force = 0;
		this.speed = 1;
	}
};

App.SecExp.settingsState = class {
	constructor() {
		this.show = 0;
		this.difficulty = 1;
		this.unitDescriptions = 0;
		this.showStats = 0;
		this.battle = new App.SecExp.battleState();
		this.rebellion = new App.SecExp.rebellionState();
	}
};

App.SecExp.coreState = class {
	constructor() {
		this.trade = 0;
		this.authority = 0;
		this.crimeLow = 30;
	}
};

App.SecExp.securityState = class {
	constructor() {
		this.cap = 100;
	}
};

App.SecExp.propHubState = class {
	constructor() {
		this.active = 0;
		this.recuriterOffice = 0;
		this.campaign = 0;
		this.miniTruth = 0;
		this.secretService = 0;
		this.fakeNews = 0;
		this.controlLeaks = 0;
		this.marketInfiltration = 0;
		this.blackOps = 0;
		this.focus = "social engineering";
	}
};

App.SecExp.barracksUpgradesState = class {
	constructor() {
		this.size = 0;
		this.luxury = 0;
		this.training = 0;
		this.loyaltyMod = 0;
	}
};

App.SecExp.barracksState = class {
	constructor() {
		this.active = 0;
		this.upgrades = new App.SecExp.barracksUpgradesState();
	}
};

App.SecExp.buildingState = class {
	constructor() {
		this.propHub = new App.SecExp.propHubState();
		this.barracks = new App.SecExp.barracksState();
	}
};

App.SecExp.proclamationState = class {
	constructor() {
		this.cooldown = 0;
		this.currency = "cash";
		this.type = "crime";
	}
};

App.SecExp.SecurityExpansionState = class SecurityExpansionState {
	constructor() {
		this.settings = new App.SecExp.settingsState();
		this.core = new App.SecExp.coreState();
		this.security = new App.SecExp.securityState();
		this.buildings = new App.SecExp.buildingState();
		this.proclamation = new App.SecExp.buildingState();
	}

	/** Creates an object suitable for setting nested attributes as it would be a SecurityExpansionState
		* @returns {object} object containing all the attributes
		* that are complex objects in the SecurityExpansionState class
		*/
	static makeSecExpSkeleton() {
		return {
			settings: {
				battle: {
					major: {}
				},
				rebellion: {},
			},
			core: {},
			security: {},
			buildings: {
				propHub: {},
				barracks: {
					upgrades: {}
				},
			},
			proclamation: {},
		};
	}
};
