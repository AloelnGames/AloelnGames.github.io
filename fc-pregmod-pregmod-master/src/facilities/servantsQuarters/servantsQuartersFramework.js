App.Data.Facilities.servantsQuarters = {
	baseName: "servantsQuarters",
	genericName: "Servants' Quarters",
	jobs: {
		servant: {
			position: "servant",
			assignment: "work as a servant",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `work in ${V.servantsQuartersName}`
				}
			}
		}
	},
	defaultJob: "servant",
	manager: {
		position: "stewardess",
		assignment: "be the Stewardess",
		careers: App.Data.misc.stewardessCareers,
		skill: "stewardess",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	}
};

App.Entity.Facilities.ServantsQuartersServantJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, 20, -21)) {
			r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
		}
		if (!window.canWalk(slave)) {
			r.push(`${slave.slaveName} can't walk and would be unable to properly clean.`);
		}
		if (!canSee(slave)) {
			r.push(`${slave.slaveName} is blind and would be unable to properly clean.`);
		}
		return r;
	}

	/** @private @override */
	get _employeeIDsVariableName() {
		return "ServQiIDs";
	}
};

App.Entity.Facilities.ServantsQuartersStewardessJob = class extends App.Entity.Facilities.ManagingJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			r.push(`${slave.slaveName} is not intelligent enough.`);
		}
		return r;
	}
};

App.Entity.facilities.servantsQuarters = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.servantsQuarters,
	{
		servant: new App.Entity.Facilities.ServantsQuartersServantJob()
	},
	new App.Entity.Facilities.ServantsQuartersStewardessJob()
);
