App.Data.Facilities.headGirlSuite = {
	baseName: "HGSuite",
	genericName: null,
	jobs: {
		HGToy: {
			position: "Head Girl's toy",
			assignment: "live with your Head Girl",
			publicSexUse: true,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `live in your Head Girl's private suite`
				}
			}
		}
	},
	defaultJob: "HGToy",
	manager: {
		position: "Head Girl",
		assignment: "be your Head Girl",
		careers: App.Data.misc.HGCareers,
		skill: "headGirl",
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

App.Entity.facilities.headGirlSuite = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.headGirlSuite
);
