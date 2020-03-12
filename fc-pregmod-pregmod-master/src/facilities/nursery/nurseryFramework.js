App.Data.Facilities.nursery = {
	baseName: "nursery",
	genericName: null,
	jobs: {
		nanny: {
			position: "nanny",
			assignment: "work as a nanny",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `work in ${V.nurseryName}`
				}
			}
		}
	},
	defaultJob: "nanny",
	manager: {
		position: "matron",
		assignment: "be the Matron",
		careers: App.Data.misc.matronCareers,
		skill: "matron",
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

App.Entity.Facilities.NurseryNannyJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, 51, 21, -20, -95)) {
			r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
		}

		return r;
	}
};

App.Entity.Facilities.Nursery = class extends App.Entity.Facilities.SingleJobFacility {
	constructor() {
		super(App.Data.Facilities.nursery,
			{
				nanny: new App.Entity.Facilities.NurseryNannyJob()
			});
	}

	// get capacity() {
	// 	return State.Variables.nurseryNannies;
	// }
};

App.Entity.facilities.nursery = new App.Entity.Facilities.Nursery();
