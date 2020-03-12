App.Data.Facilities.arcologyAgent = {
	baseName: "arcology",
	genericName: null,
	jobs: {
		agentsSlave: {
			position: "agent's toy",
			assignment: "live with your agent",
			publicSexUse: true,
			fuckdollAccepted: false
		}
	},
	defaultJob: "agentsSlave",
	manager: {
		position: "agent",
		assignment: "be your agent",
		careers: "an arcology owner",
		skill: "headGirl",
		publicSexUse: true,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 21
	}
};

App.Entity.Facilities.AgentJob = class extends App.Entity.Facilities.ManagingJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.intelligence + slave.intelligenceImplant <= 15) {
			r.push(`${slave.slaveName} is not intelligent enough to be your agent.`);
		}
		return r;
	}
};

App.Entity.facilities.arcologyAgent = new App.Entity.Facilities.Facility(
	App.Data.Facilities.arcologyAgent,
	new App.Entity.Facilities.AgentJob()
);
