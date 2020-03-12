App.Data.Facilities.farmyard = {
	baseName: "farmyard",
	genericName: null,
	jobs: {
		farmhand: {
			position: "farmhand",
			assignment: "work as a farmhand",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `work in ${V.farmyardName}`
				}
			}
		}
	},
	defaultJob: "farmhand",
	manager: {
		position: "farmer",
		assignment: "be the Farmer",
		careers: App.Data.misc.farmerCareers,
		skill: "farmer",
		publicSexUse: false,
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

App.Entity.facilities.farmyard = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.farmyard
);
