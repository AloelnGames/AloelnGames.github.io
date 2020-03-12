App.Data.Facilities.spa = {
	baseName: "spa",
	genericName: null,
	jobs: {
		assignee: {
			position: "",
			assignment: "rest in the spa",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `rest in ${V.spaName}`
				}
			}
		}
	},
	defaultJob: "assignee",
	manager: {
		position: "attendant",
		assignment: "be the Attendant",
		careers: App.Data.misc.attendantCareers,
		skill: "attendant",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: false,
		shouldHear: true,
		shouldTalk: false,
		shouldThink: true,
		requiredDevotion: 51
	}
};

App.Entity.Facilities.SpaAssigneeJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (
			slave.fetish !== "mindbroken" &&
			(
				slave.devotion < -20 ||
				(
					slave.health.tired < 20 &&
					slave.trust > 60 &&
					slave.devotion > 60 &&
					slave.sexualFlaw === "none" &&
					slave.behavioralFlaw === "none"
				)
			)
		) {
			r.push(`${slave.slaveName} will not benefit from time at ${this.facility.name}.`);
		}

		return r;
	}
};

App.Entity.facilities.spa = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.spa,
	{
		assignee: new App.Entity.Facilities.SpaAssigneeJob()
	}
);
