
App.Data.Facilities.penthouse = {
	baseName: "",
	genericName: "Penthouse",
	jobs: {
		rest: {
			position: "Rest",
			assignment: "rest",
			publicSexUse: false,
			fuckdollAccepted: true
		},
		chooseOwn: {
			position: "Choose own",
			assignment: "choose her own job",
			publicSexUse: false,
			fuckdollAccepted: false,
			description: {
				rulesAssistant: {
					assigned:({pronouns:{his}})=>`select ${his} own assignments`,
					assignedType: "allowed"
				}
			}
		},
		fucktoy: {
			position: "Fucktoy",
			assignment: "please you",
			publicSexUse: false,
			fuckdollAccepted: true
		},
		classes: {
			position: "Classes",
			assignment: "take classes",
			publicSexUse: false,
			fuckdollAccepted: false
		},
		houseServant: {
			position: "House Servant",
			assignment: "be a servant",
			publicSexUse: false,
			fuckdollAccepted: false
		},
		whore: {
			position: "Whore",
			assignment: "whore",
			publicSexUse: true,
			fuckdollAccepted: false
		},
		publicServant: {
			position: "Public Servant",
			assignment: "serve the public",
			publicSexUse: true,
			fuckdollAccepted: false
		},
		subordinateSlave: {
			position: "Subordinate slave",
			assignment: "be a subordinate slave",
			publicSexUse: false,
			fuckdollAccepted: false
		},
		cow: {
			position: "Milked",
			assignment: "get milked",
			publicSexUse: false,
			fuckdollAccepted: false
		},
		gloryhole: {
			position: "Gloryhole",
			assignment: "work a glory hole",
			publicSexUse: false,
			fuckdollAccepted: true
		},
		confinement: {
			position: "Confinement",
			assignment: "stay confined",
			publicSexUse: false,
			fuckdollAccepted: true
		}
	},
	defaultJob: "rest",
	manager: {
		position: "Recruiter",
		assignment: "recruit girls",
		careers: App.Data.misc.recruiterCareers,
		skill: "recruiter",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: false,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	}
};
App.Entity.Facilities.PenthouseJob = class extends App.Entity.Facilities.Job {
	/**
	 * @override
	 * @returns {number[]} */
	employeesIndices() {
		const employees = State.variables.JobIDArray[this.desc.assignment];
		if (!employees) { return []; }
		const si = State.variables.slaveIndices;
		return employees.map(id => si[id]);
	}

	/**
	 * @override
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		const slaves = State.variables.slaves;
		return this.employeesIndices().map(idx => slaves[idx]);
	}
};

App.Entity.Facilities.PenthouseJobs = {
	Classes: class extends App.Entity.Facilities.PenthouseJob {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);
			if (slave.intelligenceImplant >= 15) {
				r.push(`${slave.slaveName} already has a basic education.`);
			}
			if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -20, -51)) {
				r.push(`${slave.slaveName} is too resistant to learn.`);
			}

			if (slave.fetish === "mindbroken") {
				r.push(`${slave.slaveName}'s mind is fundamentally broken and can't learn.`);
			}
			return r;
		}
	},
	HouseServant: class extends App.Entity.Facilities.PenthouseJob {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);

			if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -19, -51)) {
				r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
			}

			if (!canWalk(slave)) {
				r.push(`${slave.slaveName} can't walk and would be unable to properly clean.`);
			}
			if (!canSee(slave)) {
				r.push(`${slave.slaveName} is blind and would be unable to properly clean.`);
			}

			return r;
		}
	},

	SubordinateSlave: class extends App.Entity.Facilities.PenthouseJob {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);
			if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -19, -51)) {
				r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
			}
			return r;
		}

		assignmentLink(i, passage, callback, linkText) {
			return super.assignmentLink(i, "Subordinate Targeting",
				(assignment) => {
					return `<<run App.Utils.setActiveSlaveByIndex(${i})>>` + (callback !== undefined ? callback(assignment) : '');
				}, linkText);
		}

		assignmentLinkElement(i, passage, callback, linkText) {
			linkText = linkText || this.desc.position;
			return App.UI.DOM.assignmentLink(V.slaves[i], this.desc.assignment, "Subordinate Targeting",
				(slave, assignment) => {
					if (callback) {
						callback(slave, assignment);
					}
					App.Utils.setActiveSlaveByIndex(i);
					V.returnTo = passage;
				}, linkText);
		}
	},
	Cow: class extends App.Entity.Facilities.PenthouseJob {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);

			if ((slave.lactation <= 0) && (slave.balls <= 0)) {
				r.push(`${slave.slaveName} is not lactating` + ((State.variables.seeDicks > 0) ? ' or producing semen.' : '.'));
			}
			return r;
		}
	},
};

App.Entity.Facilities.Penthouse = class extends App.Entity.Facilities.Facility {
	constructor() {
		super(App.Data.Facilities.penthouse, {
			classes: new App.Entity.Facilities.PenthouseJobs.Classes(),
			houseServant: new App.Entity.Facilities.PenthouseJobs.HouseServant(),
			subordinateSlave: new App.Entity.Facilities.PenthouseJobs.SubordinateSlave(),
			cow: new App.Entity.Facilities.PenthouseJobs.Cow(),
		});
	}

	/** Facility slave capacity
	* @returns {number} */
	get capacity() {
		return State.variables.dormitory;
	}

	/** Number of already hosted slaves
	 * @returns {number} */
	get hostedSlaves() {
		return State.variables.dormitoryPopulation;
	}

	/** Penthouse can be overcrowded, so it always has free space
	 * @returns {boolean} */
	get hasFreeSpace() {
		return true;
	}

	/**
	 *
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	isHosted(slave) {
		return assignmentVisible(slave);
	}

	/**
	 * all slaves that are at the penthouse
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		return State.variables.slaves.filter( s => assignmentVisible(s));
	}

	/**
	 * Indices in the slaves array for all slaves that are at the penthouse
	 * @returns {number[]}
	 */
	employeesIndices() {
		return State.variables.slaves.reduce(
			(acc, cur, idx) => { if (assignmentVisible(cur)) { acc.push(idx); } return acc; }, []);
	}

	_createJob() {
		return new App.Entity.Facilities.PenthouseJob();
	}
};

App.Entity.facilities.penthouse = new App.Entity.Facilities.Penthouse();
