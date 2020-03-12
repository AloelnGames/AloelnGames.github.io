App.Data.Facilities.schoolroom = {
	baseName: "schoolroom",
	genericName: null,
	jobs: {
		student: {
			position: "",
			assignment: "learn in the schoolroom",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `study in ${V.schoolroomName}`
				}
			}
		}
	},
	defaultJob: "student",
	manager: {
		position: "schoolteacher",
		assignment: "be the Schoolteacher",
		careers: App.Data.misc.schoolteacherCareers,
		skill: "teacher",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: false,
		shouldHold: false,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	}
};

App.Entity.Facilities.SchoolroomStudentJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -20, -51)) {
			r.push(`${slave.slaveName} is too resistant to learn.`);
		}

		const maxSkill = 10 + this.facility.upgrade("Skills") * 20; // maximal skill value the school can teach
		if (((slave.intelligenceImplant >= 30 && V.schoolroomRemodelBimbo !== 1) || (slave.intelligenceImplant <= -15 && V.schoolroomRemodelBimbo === 1)) &&
			(slave.voice === 0 || slave.accent + this.facility.upgrade("Language") <= 2) &&
			(slave.skill.oral > maxSkill) && (slave.skill.whoring > maxSkill) && (slave.skill.entertainment > maxSkill) &&
			(slave.skill.anal > maxSkill) && ((slave.vagina < 0) || (slave.skill.vaginal > maxSkill))) {
			r.push(`${slave.slaveName} has nothing left to learn.`);
		}

		if (slave.fetish === "mindbroken") {
			r.push(`${slave.slaveName}'s mind is fundamentally broken and can't learn`);
		}

		return r;
	}

	/** @private @override */
	get _employeeIDsVariableName() {
		return "SchlRiIDs";
	}
};

App.Entity.facilities.schoolroom = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.schoolroom,
	{
		student: new App.Entity.Facilities.SchoolroomStudentJob()
	}
);
