App.Data.Facilities.clinic = {
	baseName: "clinic",
	genericName: null,
	jobs: {
		patient: {
			position: "patient",
			assignment: "get treatment in the clinic",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:()=> `get treatment in ${V.clinicName}`
				}
			}
		}
	},
	defaultJob: "patient",
	manager: {
		position: "nurse",
		assignment: "be the Nurse",
		careers: App.Data.misc.nurseCareers,
		skill: "nurse",
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

App.Entity.Facilities.ClinicPatientJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if ((slave.health.illness === 0 && slave.health.shortDamage < 20 && slave.health.condition >= 40) &&
			(V.Nurse === 0 || ((slave.chem <= 15 || this.facility.upgrade("Filters") !== 1) &&
				(V.bellyImplants !== 1 || slave.bellyImplant <= -1) &&
				(slave.pregKnown !== 1 || (this.facility.option("SpeedGestation") <= 0 && slave.pregControl !== "speed up")) &&
				(this.facility.option("ObservePregnancy") !== 1 || slave.pregAdaptation * 1000 >= slave.bellyPreg && slave.preg <= slave.pregData.normalBirth / 1.33)))) {
			r.push(`${slave.slaveName} cannot benefit from ${this.facility.name}.`);
		}

		return r;
	}
};

App.Entity.facilities.clinic = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.clinic,
	{
		patient: new App.Entity.Facilities.ClinicPatientJob()
	}
);
