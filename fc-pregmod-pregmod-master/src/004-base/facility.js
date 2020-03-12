
App.Data.JobDesc = class {
	constructor() {
		this.position = "";
		this.assignment = "";
		this.publicSexUse = false;
		this.fuckdollAccepted = false;
		/** @type {boolean|undefined} */
		this.broodmotherAccepted = false;
		/** workers can take part time jobs in addition to their main (full-time) one */
		this.partTime = false;
	}
};

App.Data.ManagerJobDesc = class extends App.Data.JobDesc {
	constructor() {
		super();
		this.shouldWalk = true;
		this.shouldHold = true;
		this.shouldSee = true;
		this.shouldHear = true;
		this.shouldTalk = true;
		this.shouldThink = true;
		this.requiredDevotion = 50;
		/**
		 * Applicable careers
		 * @type {string[]} */
		this.careers = [];
		/**
		 * Applicable skill name
		 * @type {string} */
		this.skill = null;
	}
};

App.Data.FacilityDesc = class {
	constructor() {
		/** Base name for state variables */
		this.baseName = "";
		/** Generic name for UI (Brothel, Club, etc.)
		 * If null, baseName is used instead
		*/
		this.genericName = "";
		/** @type {Object.<string, App.Data.JobDesc>} */
		this.jobs = {};
		this.defaultJob = "";
		/** @type {App.Data.ManagerJobDesc} */
		this.manager = null;
	}
};

App.Data.Facilities = {};
App.Entity.Facilities = {};

App.Entity.Facilities.Job = class {
	constructor() {
		/** @type {App.Data.JobDesc} */
		this.desc = null;
		/** @type {App.Entity.Facilities.Facility} */
		this.facility = null;
	}

	/**
	 * Does slave meet the requirements for this job
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = [];
		if (this.desc.publicSexUse &&
			(slave.breedingMark === 1 && State.variables.propOutcome === 1 && State.variables.eugenicsFullControl !== 1 && State.variables.arcologies[0].FSRestart !== "unset")) {
			r.push(`${slave.slaveName} is for private use only.`);
		}
		if (!this.desc.fuckdollAccepted && slave.fuckdoll > 0) {
			r.push(`Fuckdolls can't ${this.desc.assignment} at ${this.facility.name}.`);
		}
		if (!this.desc.broodmotherAccepted && slave.preg > 37 && slave.broodmother === 2) {
			r.push(`Birthing broodmothers can't ${this.desc.assignment}.`);
		}
		return r;
	}

	/**
	 * Can slave be employed at this position
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	canEmploy(slave) {
		if (this.isEmployed(slave)) {
			return [`${slave.slaveName} is already assigned to ${this.desc.assignment} at ${this.facility.name}.`];
		}
		if (!this._facilityHasFreeSpace) {
			return [`Capacity of ${this.facility.name} exceeded.`];
		}
		if (slave.assignment === this.desc.assignment) {
			return [`${slave.slaveName} is already assigned to ${this.desc.assignment}.`];
		}

		return this.checkRequirements(slave);
	}

	/**
	 * Is slave already assigned to this job
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	isEmployed(slave) {
		return slave.assignment === this.desc.assignment;
	}

	/**
	 * @callback linkCallback
	 * @param {string} assignment new assignment
	 * @returns {string} code to include into the <<link>><</link>>
	 */

	/**
	 * @callback assignmentCallback
	 * @param {App.Entity.SlaveState} slave the slave whose assignment changes
	 * @param {string} assignment new assignment
	 * @returns {void}
	 */

	/**
	 * Returns link text for the penthouse assignment
	 * @param {number} i slave index
	 * @param {string} [passage] passage to go to
	 * @param {linkCallback} [callback]
	 * @param {string} [linkText]
	 * @returns {string}
	 */
	assignmentLink(i, passage, callback, linkText) {
		linkText = linkText || this.desc.position;
		const linkAction = callback !== undefined ? callback(this.desc.assignment) : '';
		return `<<link "${linkText}"${passage !== undefined ? ' "' + passage + '"' : ''}>><<= assignJob(${App.Utils.slaveRefString(i)}, "${this.desc.assignment}")>>${linkAction}<</link>>`;
	}

	/**
	 * Returns link text for the penthouse assignment
	 * @param {number} i slave index
	 * @param {string} [passage] passage to go to
	 * @param {assignmentCallback} [callback]
	 * @param {string} [linkText]
	 * @returns {HTMLAnchorElement}
	 */
	assignmentLinkElement(i, passage, callback, linkText) {
		linkText = linkText || this.desc.position;
		return App.UI.DOM.assignmentLink(State.variables.slaves[i], this.desc.assignment, passage, callback, linkText);
	}

	/**
	 * all slaves that are employed at this job
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		return State.variables.slaves.filter( s => s.assignment === this.desc.assignment);
	}

	/**
	 * Indices in the slaves array for all slaves that are employed at this job
	 * @returns {number[]}
	 */
	employeesIndices() {
		return State.variables.slaves.reduce(
			(acc, cur, idx) => { if (cur.assignment === this.desc.assignment) { acc.push(idx); } return acc; }, []);
	}

	/**
	 * IDs for all slaves that are employed at this job
	 * @returns {number[]}
	 */
	employeesIds() {
		return this.employees().map(s => s.ID);
	}

	/**
	 * Tests if slave is broken enough
	 * @protected
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [pureDevotion=50] Minimal devotion level to pass test with any trust
	 * @param {number} [devotion=-50] Minimal devotion for slaves with enough fear
	 * @param {number} [trust=-21] Maximal trust (i.e. minimal fear) for the less devotional (see above)
	 * @param {number} [pureFear=-51] Maximal low trust to pass test with any devotion (because of the fear)
	 * @param {number} [pureTrust=101] Minimal high trust level to pass test without devotion
	 * @returns {boolean}
	 */
	static _isBrokenEnough(slave, pureDevotion, devotion, trust, pureFear, pureTrust) {
		if ((slave.devotion < (pureDevotion || 50)) &&
			(slave.trust < (pureTrust || 101)) && (slave.trust > (pureFear || -51)) &&
			((slave.devotion <= (devotion || -51)) || (slave.trust >= (trust || -21)))) {
			return false;
		}
		return true;
	}

	/**
	 * @protected
	 * Standard message that slave is not broken enough
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	static _stdBreakageMessage(slave) {
		return `${slave.slaveName} must be either more fearful of you or devoted to you.`;
	}

	/** @private */
	get _facilityHasFreeSpace() {
		return this.facility.hasFreeSpace;
	}
};

App.Entity.Facilities.ManagingJob = class extends App.Entity.Facilities.Job {
	constructor() {
		super();
		/** @type {App.Data.ManagerJobDesc} */
		this.desc = null;
	}

	/**
	 * Can slave be employed at this position
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.devotion < this.desc.requiredDevotion) {
			r.push(`${slave.slaveName} must be more devoted to you.`);
		}
		if (this.desc.shouldWalk && !canWalk(slave)) {
			r.push(`${slave.slaveName} must be able to walk.`);
		}
		if (this.desc.shouldHold && !canHold(slave)) {
			r.push(`${slave.slaveName} must be able to hold on to objects.`);
		}
		if (this.desc.shouldSee && !canSee(slave)) {
			r.push(`${slave.slaveName} must have working eyes.`);
		}
		if (this.desc.shouldHear && !canHear(slave)) {
			r.push(`${slave.slaveName} must be able to hear.`);
		}
		if (this.desc.shouldTalk && !canTalk(slave)) {
			r.push(`${slave.slaveName} must be able to talk.`);
		}
		if (this.desc.shouldThink && slave.fetish === "mindbroken") {
			r.push(`${slave.slaveName} must possess cognition.`);
		}
		return r;
	}
	/**
	 * Returns true if slave has enough applicable skill or career
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	slaveHasExperience(slave) {
		return (this.desc.skill !== null && slave.skill[this.desc.skill] >= State.variables.masteredXP) ||
			(typeof slave.career === 'string' && this.desc.careers.includes(slave.career));
	}

	/** @returns {App.Entity.SlaveState} */
	get currentEmployee() {
		const obj = State.variables[capFirstChar(this.desc.position)];
		return obj === undefined || obj === 0 ? null : obj;
	}

	/** @private */
	get _facilityHasFreeSpace() {
		return true;
	}
};

App.Entity.Facilities.Facility = class {
	/**
	 * @param {App.Data.FacilityDesc} desc defines state variable for this facility
	 * @param {Object.<string, App.Entity.Facilities.Job>} [jobs] job object that are not default
	 * @param {App.Entity.Facilities.ManagingJob} [manager]
	 */
	constructor(desc, jobs, manager) {
		this.desc = desc;
		jobs = jobs || {};
		/** @private @type {Object.<string, App.Entity.Facilities.Job>} */
		this._jobs = {};

		for (const jn in this.desc.jobs) {
			if (jobs[jn] !== undefined) {
				this._jobs[jn] = jobs[jn];
			} else {
				this._jobs[jn] = this._createJob(jn);
			}
			this._jobs[jn].facility = this;
			this._jobs[jn].desc = desc.jobs[jn];
		}

		if (manager === undefined) {
			// default manager job implementation
			manager = (this.desc.manager !== null) ? new App.Entity.Facilities.ManagingJob() : null;
		}
		/** @private */
		this._manager = manager;
		if (this._manager !== null) {
			this._manager.facility = this;
			this._manager.desc = this.desc.manager;
		}
	}

	/** Facility display name
	 * @returns {string} */
	get name() {
		const res = State.variables[this.desc.baseName + "Name"];
		return res !== undefined ? res : 'the ' + this.genericName;
	}

	/** Facility generic name ("Brothel", "Schoolroom", etc.)
	 * @returns {string} */
	get genericName() {
		return this.desc.genericName !== null ? this.desc.genericName : capFirstChar(this.desc.baseName);
	}

	/** All jobs at this facility
	 * @returns {string[]}
	 */
	get jobsNames() {
		return Object.keys(this.desc.jobs);
	}

	/**
	 * Returns job description
	 * @param {string} [name] job name; the default job will be used if omitted
	 * @returns {App.Entity.Facilities.Job}
	 */
	job(name) {
		return this._jobs[name || this.desc.defaultJob];
	}

	get manager() {
		return this._manager;
	}

	/** Facility slave capacity
	 * @returns {number} */
	get capacity() {
		return State.variables[this.desc.baseName];
	}

	get established() {
		return this.capacity > 0;
	}

	/** Number of already hosted slaves
	 * @returns {number} */
	get hostedSlaves() {
		const job = this.job();
		return job ? job.employeesIds().length : 0;
	}

	get hasFreeSpace() {
		return this.capacity > this.hostedSlaves;
	}

	/**
	 * @param {string} name
	 * @returns {number}
	 */
	option(name) {
		return State.variables[this.desc.baseName + name];
	}

	/**
	 * @param {string} name
	 * @returns {number}
	 */
	upgrade(name) {
		return this.option("Upgrade" + name);
	}

	/**
	 * Can this facility host the given slave
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} [job]
	 * @returns {string[]} array with rejection reasons. Slave can be hosted if this is empty.
	 */
	canHostSlave(slave, job) {
		job = job || this.desc.defaultJob;
		const j = this.job(job);
		if (j === undefined) {
			console.log(`Can't find job ${job} at ${this.name}.`); // eslint-disable-line no-console
		}
		// if there are more than one jobs at this facility, test them too
		if (Object.keys(this.desc.jobs).length > 1 && this.isHosted(slave)) {
			return [`${slave.slaveName} is already assigned to ${slave.assignment} at ${this.name}.`];
		}
		return j.canEmploy(slave);
	}

	/**
	 * Does the given slave work at this facility
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	isHosted(slave) {
		for (const j in this._jobs) {
			if (this._jobs[j].isEmployed(slave)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns link text for the job assignments
	 * @param {number} i slave index
	 * @param {string} [job] generate link only for this job
	 * @param {string} [passage]
	 * @param {linkCallback} callback
	 * @returns {string[]}
	 */
	assignmentLinks(i, job, passage, callback) {
		/** @type {App.Entity.SlaveState} */
		const slave = App.Utils.slaveByIndex(i);
		const jobs = job === undefined ? this._jobs : {job: this._jobs[job]};

		let res = [];
		for (const jn in jobs) {
			const j = jobs[jn];
			let rejects = j.canEmploy(slave);
			if (rejects.length === 0) {
				res.push(j.assignmentLink(i, passage, callback));
			} else {
				res.push(App.UI.disabledLink(j.desc.position, rejects));
			}
		}
		return res;
	}

	/**
	 * Returns link text for the job assignments
	 * @param {number} i slave index
	 * @param {string} [job] generate link only for this job
	 * @param {string} [passage]
	 * @param {assignmentCallback} callback
	 * @returns {HTMLElement[]}
	 */
	assignmentLinkElements(i, job, passage, callback) {
		/** @type {App.Entity.SlaveState} */
		const slave = App.Utils.slaveByIndex(i);
		const jobs = job === undefined ? this._jobs : {job: this._jobs[job]};

		let res = [];
		for (const jn in jobs) {
			const j = jobs[jn];
			let rejects = j.canEmploy(slave);
			if (rejects.length === 0) {
				res.push(j.assignmentLinkElement(i, passage, callback));
			} else {
				res.push(App.UI.DOM.disabledLink(j.desc.position, rejects));
			}
		}
		return res;
	}

	/**
	 * Returns link text for the facility transfer
	 * @param {number} i slave index
	 * @param {string} [job] transfer to this job (uses default job if this is undefined)
	 * @param {string} [passage]
	 * @param {linkCallback} [callback]
	 * @returns {string}
	 */
	transferLink(i, job, passage, callback) {
		job = job || this.desc.defaultJob;
		return this._jobs[job].assignmentLink(i, passage, callback, this.genericName);
	}

	/**
	 * Returns link text for the facility transfer
	 * @param {number} i slave index
	 * @param {string} [job] transfer to this job (uses default job if this is undefined)
	 * @param {string} [passage]
	 * @param {linkCallback} [callback]
	 * @returns {HTMLElement}
	 */
	transferLinkElement(i, job, passage, callback) {
		job = job || this.desc.defaultJob;
		return this._jobs[job].assignmentLinkElement(i, passage, callback, this.genericName);
	}

	/**
	 * all slaves that are employed at this job
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		if (Object.keys(this._jobs).length === 1) {
			return this.job().employees();
		}
		/** @type {App.Entity.Facilities.Job[]} */
		let jobArray = [];
		for (const jn in this._jobs) {
			jobArray.push(this._jobs[jn]);
		}
		return State.variables.slaves.filter(s => jobArray.some(j => j.isEmployed(s)));
	}

	/**
	 * Indices in the slaves array for all slaves that are employed at this job
	 * @returns {number[]}
	 */
	employeesIndices() {
		if (Object.keys(this._jobs).length === 1) {
			return this.job().employeesIndices();
		}
		/** @type {App.Entity.Facilities.Job[]} */
		let jobArray = [];
		for (const jn in this._jobs) {
			jobArray.push(this._jobs[jn]);
		}
		return State.variables.slaves.reduce(
			(acc, cur, idx) => { if (jobArray.some(j => j.isEmployed(cur))) { acc.push(idx); } }, []);
	}

	/**
	 * @protected
	 * @param {string} jobName
	 * @returns {App.Entity.Facilities.Job}
	 */
	_createJob(jobName) { /* eslint-disable-line no-unused-vars*/
		return new App.Entity.Facilities.Job();
	}
};

/**
 * Job for a facility with a single job option
 */
App.Entity.Facilities.FacilitySingleJob = class extends App.Entity.Facilities.Job {
	/**
	 * Returns link text for the penthouse assignment
	 * @param {number} i slave index
	 * @param {string} [passage] passage to go to
	 * @param {linkCallback} [callback]
	 * @param {string} [linkText]
	 * @returns {string}
	 */
	assignmentLink(i, passage, callback, linkText) {
		linkText = linkText || this.facility.genericName;
		const linkAction = callback !== undefined ? callback(this.desc.assignment) : '';
		const psg = passage === undefined ? '' : `, $returnTo = "${passage}"`;
		return `<<link "${linkText}" "Assign">><<set $assignTo = "${this.facility.genericName}", $i = ${i}${psg}>>${linkAction}<</link>>`;
	}

	/**
	 * @param {number} i slave index
	 * @param {string} [targetPassage] passage to go to
	 * @param {assignmentCallback} [callback]
	 * @param {string} [linkText]
	 * @returns {HTMLAnchorElement}
	 */
	assignmentLinkElement(i, targetPassage, callback, linkText) {
		linkText = linkText || this.desc.position;
		return App.UI.DOM.assignmentLink(State.variables.slaves[i], this.desc.assignment, "Assign",
			(slave, assignment) => {
				if (callback) {
					callback(slave, assignment);
				}
				// Set up environment for the "Assign" passage
				V.i = V.slaveIndices[slave.ID];
				V.activeSlave = slave;
				V.assignTo = this.facility.genericName;
				V.returnTo = targetPassage ? targetPassage : passage();
			}, linkText);
	}

	/** @returns {number[]} */
	employeesIndices() {
		const si = V.slaveIndices;
		const ids = V[this._employeeIDsVariableName]; // updated by assignJob()/removeJob()
		return ids.map(id => si[id]);
	}

	employeesIds() {
		return State.variables[this._employeeIDsVariableName]; // updated by assignJob()/removeJob();
	}

	/** @returns {App.Entity.SlaveState[]} */
	employees() {
		/** @type {App.Entity.SlaveState[]} */
		const slaves = State.variables.slaves;
		return this.employeesIndices().map(ind => slaves[ind]);
	}

	/** @private */
	get _employeeIDsVariableName() {
		return this.facility.genericName + "iIDs";
	}
};

App.Entity.Facilities.SingleJobFacility = class extends App.Entity.Facilities.Facility {
	/**
	 * @override
	 * @protected
	 * @returns {App.Entity.Facilities.FacilitySingleJob}
	 */
	_createJob() {
		return new App.Entity.Facilities.FacilitySingleJob();
	}
};

/** Instances of all facility objects */
App.Entity.facilities = {};
