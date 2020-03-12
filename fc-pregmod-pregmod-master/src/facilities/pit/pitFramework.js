App.Data.Facilities.pit = {
	baseName: "pit",
	genericName: null,
	jobs: {
		fighter: {
			position: "fighter",
			assignment: "",
			publicSexUse: false,
			fuckdollAccepted: false,
			partTime: true
		}
	},
	defaultJob: "fighter",
	manager: null
};

App.Entity.Facilities.PitFighterJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.breedingMark === 1 && State.variables.propOutcome === 1 && State.variables.eugenicsFullControl !== 1 && State.variables.arcologies[0].FSRestart !== "unset") {
			r.push(`${slave.slaveName} may not participate in combat.`);
		}
		if (slave.indentureRestrictions > 1) {
			r.push(`${slave.slaveName}'s indenture forbids fighting.`);
		}
		if ((slave.indentureRestrictions > 0) && (this.facility.option("Lethal") === 1)) {
			r.push(`${slave.slaveName}'s indenture forbids lethal fights.`);
		}
		return r;
	}

	isEmployed(slave) {
		return State.variables.fighterIDs.includes(slave.ID);
	}

	employeesIndices() {
		const si = V.slaveIndices;
		return V.fighterIDs.map(id => si[id]);
	}
};

App.Entity.Facilities.Pit = class extends App.Entity.Facilities.SingleJobFacility {
	constructor() {
		super(App.Data.Facilities.pit,
			{
				fighter: new App.Entity.Facilities.PitFighterJob()
			});
	}

	get capacity() {
		return State.variables[this.desc.baseName] > 0 ? Number.MAX_VALUE : 0;
	}

	get hostedSlaves() {
		return State.variables.fighterIDs.length;
	}
};

App.Entity.facilities.pit = new App.Entity.Facilities.Pit();
