App.Data.Facilities.armory = {
	baseName: "dojo",
	genericName: "armory",
	jobs: {	},
	defaultJob: null,
	manager: {
		position: "bodyguard",
		assignment: "guard you",
		careers: App.Data.misc.bodyguardCareers,
		skill: "bodyguard",
		publicSexUse: true,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: false,
		shouldThink: true,
		requiredDevotion: 51
	}
};

App.Entity.facilities.armory = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.armory
);
