App.Data.Facilities.arcade = {
	baseName: "arcade",
	genericName: null,
	jobs: {
		assignee: {
			position: "whore",
			assignment: "be confined in the arcade",
			publicSexUse: true,
			fuckdollAccepted: true,
			description: {
				rulesAssistant: {
					assigned:()=> `be confined in ${V.arcadeName}`
				}
			}
		},
	},
	defaultJob: "assignee",
	manager: null
};

App.Entity.Facilities.ArcadeJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * Can slave be employed at this position
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.indentureRestrictions > 0) {
			r.push(`${slave.slaveName}'s indenture forbids arcade service.`);
		}
		return r;
	}
};

App.Entity.facilities.arcade = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.arcade,
	{
		assignee: new App.Entity.Facilities.ArcadeJob()
	}
);
