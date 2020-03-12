/* eslint-disable no-case-declarations */

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} job
 * @returns {string}
 */
window.assignJob = function assignJob(slave, job) {
	"use strict";
	let r = "";
	let oldJob = slave.assignment;

	if (job === "Pit" || job === "Coursing Association") { return r; }

	removeJob(slave, slave.assignment, true);
	const idx = V.slaveIndices[slave.ID];

	const uniqueJob = function(propName) {
		// this helper makes sure global references ($HeadGirl, etc) are set correctly
		if (V[propName] !== 0 && V[propName].ID !== slave.ID) {
			removeJob(V[propName], job, true);
		}
		V[propName] = slave;
	};

	/* Tracking for the following cases: */
	if (oldJob !== job && V.assignmentRecords[slave.ID] !== job && oldJob !== "rest") { // Check that there is a real change happening.  Sometimes when you send someone to a classroom or something, this fires twice.
		switch (job.toLowerCase()) {
			case "be confined in the cellblock":
			case "cellblock":
				if (oldJob !== "be confined in the cellblock") { // Due to the way assignJob fires twice on assigning to a building, we have to make sure that we are keeping the original record.
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
			case "get treatment in the clinic":
			case "clinic":
				if (oldJob !== "get treatment in the clinic") {
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
			case "learn in the schoolroom":
			case "schoolroom":
				if (oldJob !== "learn in the schoolroom") {
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
			case "rest in the spa":
			case "spa":
				if (oldJob !== "rest in the spa") {
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
		}
	}
	/* use .toLowerCase() to get rid of a few dupe conditions. */
	switch (job.toLowerCase()) {
		case "be confined in the arcade":
		case "arcade":
			slave.assignment = "be confined in the arcade";
			V.ArcadeiIDs.push(slave.ID);
			if (slave.clothes !== "a fuckdoll suit") {
				slave.clothes = "no clothing";
			}
			slave.shoes = "none";
			slave.collar = "none";
			slave.rules.living = "spare";
			break;

		case "work in the brothel":
		case "brothel":
			slave.assignment = "work in the brothel";
			V.BrothiIDs.push(slave.ID);
			switch (V.brothelDecoration) {
				case "Degradationist":
				case "standard":
					slave.rules.living = "spare";
					break;
				default:
					slave.rules.living = "normal";
					break;
			}
			break;

		case "be confined in the cellblock":
		case "cellblock":
			slave.assignment = "be confined in the cellblock";
			V.CellBiIDs.push(slave.ID);
			switch (V.cellblockDecoration) {
				case "Paternalist":
					slave.rules.living = "normal";
					break;
				default:
					slave.rules.living = "spare";
					break;
			}
			break;

		case "get treatment in the clinic":
		case "clinic":
			slave.assignment = "get treatment in the clinic";
			V.CliniciIDs.push(slave.ID);
			switch (V.clinicDecoration) {
				case "Repopulation Focus":
				case "Eugenics":
				case "Gender Radicalist":
				case "Gender Fundamentalist":
				case "Paternalist":
				case "Maturity Preferentialist":
				case "Youth Preferentialist":
				case "Slimness Enthusiast":
				case "Hedonistic":
				case "Intellectual Dependency":
				case "Petite Admiration":
				case "Statuesque Glorification":
					slave.rules.living = "luxurious";
					break;

				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Egyptian Revivalist":
				case "Arabian Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
					slave.rules.living = "normal";
					break;

				default:
					slave.rules.living = "spare";
					break;
			}
			break;

		case "serve in the club":
		case "club":
			slave.assignment = "serve in the club";
			V.ClubiIDs.push(slave.ID);
			slave.rules.living = "normal";
			break;

		case "work in the dairy":
		case "dairy":
			slave.assignment = "work in the dairy";
			V.DairyiIDs.push(slave.ID);
			switch (V.dairyDecoration) {
				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
					slave.rules.living = "spare";
					break;
				default:
					slave.rules.living = "normal";
					break;
			}
			break;

		case "work as a farmhand":
		case "farmyard":
			slave.assignment = "work as a farmhand";
			V.FarmyardiIDs.push(slave.ID);
			switch (V.farmyardDecoration) {
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
					slave.rules.living = "spare";
					break;
				case "Roman Revivalist":
					slave.rules.living = "luxurious";
					break;
				default:
					slave.rules.living = "normal";
					break;
			}
			break;

		case "live with your head girl":
		case "head girl suite":
		case "hgsuite":
			slave.assignment = "live with your Head Girl";
			V.HGSuiteiIDs.push(slave.ID);
			slave.rules.living = "luxurious";
			break;

		case "serve in the master suite":
		case "master suite":
		case "mastersuite":
			slave.assignment = "serve in the master suite";
			V.MastSiIDs.push(slave.ID);
			if (V.masterSuiteUpgradeLuxury > 0) {
				slave.rules.living = "luxurious";
			} else {
				slave.rules.living = "normal";
			}
			break;

		case "learn in the schoolroom":
		case "schoolroom":
			slave.assignment = "learn in the schoolroom";
			V.SchlRiIDs.push(slave.ID);
			slave.rules.living = "normal";
			break;

		case "work as a servant":
		case "servants' quarters":
		case "servantsquarters":
			slave.assignment = "work as a servant";
			V.ServQiIDs.push(slave.ID);
			switch (V.servantsQuartersDecoration) {
				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
					slave.rules.living = "spare";
					break;
				case "Slave Professionalism":
					if (slave.intelligence + slave.intelligenceImplant > 15) {
						slave.rules.living = "normal";
					} else {
						slave.rules.living = "spare";
					}
					break;
				case "Petite Admiration":
				case "Statuesque Glorification":
					if (heightPass(slave)) {
						slave.rules.living = "normal";
					} else {
						slave.rules.living = "spare";
					}
					break;
				default:
					slave.rules.living = "normal";
					break;
			}
			break;

		case "rest in the spa":
		case "spa":
			slave.assignment = "rest in the spa";
			V.SpaiIDs.push(slave.ID);
			switch (V.spaDecoration) {
				case "Chattel Religionist":
				case "Chinese Revivalist":
					slave.rules.living = "normal";
					break;
				case "Degradationist":
					slave.rules.living = "spare";
					break;
				default:
					slave.rules.living = "luxurious";
					break;
			}
			break;

		case "work as a nanny":
		case "nursery":
			slave.assignment = "work as a nanny";
			V.NurseryiIDs.push(slave.ID);
			slave.rules.living = "normal";
			break;

		case "be the attendant":
			uniqueJob("Attendant");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the matron":
			uniqueJob("Matron");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the dj":
			uniqueJob("DJ");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the madam":
			uniqueJob("Madam");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the milkmaid":
			uniqueJob("Milkmaid");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the farmer":
			uniqueJob("Farmer");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the nurse":
			uniqueJob("Nurse");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the schoolteacher":
			uniqueJob("Schoolteacher");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the stewardess":
			uniqueJob("Stewardess");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "be the wardeness":
			uniqueJob("Wardeness");
			slave.assignment = job;
			slave.rules.living = "luxurious";
			break;

		case "recruit girls":
			uniqueJob("Recruiter");
			slave.assignment = job;
			break;

		case "be your concubine":
			uniqueJob("Concubine");
			slave.assignment = job;
			if (V.masterSuiteUpgradeLuxury > 0) {
				slave.rules.living = "luxurious";
			} else {
				slave.rules.living = "normal";
			}
			break;

		case "be your head girl":
			uniqueJob("HeadGirl");
			slave.assignment = job;
			if (V.HGSuite === 1) {
				slave.rules.living = "luxurious";
			}
			V.HGTimeInGrade = 0;
			break;

		case "guard you":
			uniqueJob("Bodyguard");
			slave.assignment = job;
			if (V.dojo > 1) {
				slave.rules.living = "luxurious";
			}
			if (V.pitBG === 1 && V.fighterIDs.includes(slave.ID)) { V.fighterIDs.delete(slave.ID); }
			break;

		case "be your agent":
		case "live with your agent":
			slave.assignment = job;
			slave.useRulesAssistant = 0; /* non-visible roles exempt from Rules Assistant */
			WombCleanGenericReserve(slave, 'incubator', 9999);
			WombCleanGenericReserve(slave, 'nursery', 9999);
			if (job === "be your agent") {
				V.leaders.push(slave);
				App.activeArcology().leaderID = slave.ID;
				App.activeArcology().government = "your agent";
			}
			break;

		case "choose her own job":
			slave.assignment = job;
			slave.choosesOwnAssignment = 1;
			break;

		default:
			slave.assignment = job; /* removeJob already set choosesOwnAssignment = 0 */
			break;
	}

	if (!assignmentVisible(slave) && Array.isArray(V.personalAttention)) {
		if (V.personalAttention.deleteWith(s => s.ID === slave.ID).length > 0) {
			if (V.personalAttention.length === 0) {
				if (V.PC.career === "escort") {
					V.personalAttention = "whoring";
				} else if (V.PC.career === "servant") {
					V.personalAttention = "upkeep";
				} else {
					V.personalAttention = "business";
				}
				r += `${slave.slaveName} no longer has your personal attention; you plan to focus on ${V.personalAttention}.`;
			} else {
				r += `${slave.slaveName} no longer has your personal attention.`;
			}
		}
	}
	V.JobIDArray = resetJobIDArray();
	if (idx >= 0) { V.slaves[idx] = slave; }

	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} assignmentStr
 */
window.assignJobSafely = function assignJobSafely(slave, assignmentStr) {
	if (V.assignmentRecords[slave.ID] === "choose her own job") {
		assignJob(slave, "rest");
		slave.choosesOwnAssignment = 1;
	} else if (!App.Utils.jobForAssignment(assignmentStr).canEmploy(slave).length) {  // If nothing complains about job requirements not being met
		assignJob(slave, assignmentStr);
	} else {
		assignJob(slave, "rest");
	}
	// Whether they manage to go back or they default to rest, we don't need their record:
	if (V.assignmentRecords[slave.ID]) {
		delete V.assignmentRecords[slave.ID];
	}
};


/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} assignment
 * @param {boolean} saveRecord
 * @returns {string}
 */
window.removeJob = function removeJob(slave, assignment, saveRecord) {
	"use strict";
	let r = "";
	if (typeof saveRecord === undefined) {
		saveRecord = false;
	}

	if (slave === 0) {
		// it is well-formed, but does nothing, to remove an assignment from nobody.
		// this lets us call <<run removeJob($HeadGirl, "be your Head Girl")>> and similar,
		// without first checking to see whether a slave is really assigned to $HeadGirl or not.
		return r;
	}

	if (V.assignmentRecords[slave.ID] && (saveRecord === false)) {
		delete V.assignmentRecords[slave.ID];
	}

	const idx = V.slaveIndices[slave.ID];

	if (assignment === "Pit") {
		V.fighterIDs.delete(slave.ID);
	} else if (assignment === "Coursing Association") {
		V.Lurcher = 0;
	} else {
		if (V.HeadGirl !== 0 && slave.ID === V.HeadGirl.ID) {
			V.HeadGirl = 0;
		} else if (V.Recruiter !== 0 && slave.ID === V.Recruiter.ID) {
			V.Recruiter = 0;
			V.recruiterIOUs = 0;
		} else if (V.Bodyguard !== 0 && slave.ID === V.Bodyguard.ID) {
			V.Bodyguard = 0;
		} else if (V.Madam !== 0 && slave.ID === V.Madam.ID) {
			V.Madam = 0;
		} else if (V.DJ !== 0 && slave.ID === V.DJ.ID) {
			V.DJ = 0;
		} else if (V.Milkmaid !== 0 && slave.ID === V.Milkmaid.ID) {
			V.Milkmaid = 0;
		} else if (V.Farmer !== 0 && slave.ID === V.Farmer.ID) {
			V.Farmer = 0;
		} else if (V.Schoolteacher !== 0 && slave.ID === V.Schoolteacher.ID) {
			V.Schoolteacher = 0;
		} else if (V.Attendant !== 0 && slave.ID === V.Attendant.ID) {
			V.Attendant = 0;
		} else if (V.Matron !== 0 && slave.ID === V.Matron.ID) {
			V.Matron = 0;
		} else if (V.Nurse !== 0 && slave.ID === V.Nurse.ID) {
			V.Nurse = 0;
		} else if (V.Stewardess !== 0 && slave.ID === V.Stewardess.ID) {
			V.Stewardess = 0;
		} else if (V.Wardeness !== 0 && slave.ID === V.Wardeness.ID) {
			V.Wardeness = 0;
		} else if (V.Concubine !== 0 && slave.ID === V.Concubine.ID) {
			V.Concubine = 0;
		} else if (V.Collectrix !== 0 && slave.ID === V.Collectrix.ID) {
			V.Collectrix = 0;
		}

		/* use .toLowerCase() to get rid of a few dupe conditions. */
		switch (assignment.toLowerCase()) {
			case "be confined in the arcade":
			case "arcade":
				slave.assignment = "work a glory hole";
				V.ArcadeiIDs.delete(slave.ID);
				break;

			case "work in the brothel":
			case "brothel":
				slave.assignment = "whore";
				V.BrothiIDs.delete(slave.ID);
				break;

			case "be confined in the cellblock":
			case "cellblock":
				slave.assignment = "rest";
				if (slave.inflation > 0) {
					slave.inflation = 0;
					slave.inflationType = "none";
					slave.inflationMethod = 0;
					SetBellySize(slave);
				}
				V.CellBiIDs.delete(slave.ID);
				break;

			case "get treatment in the clinic":
			case "clinic":
				slave.assignment = "rest";
				V.CliniciIDs.delete(slave.ID);
				break;

			case "serve in the club":
			case "club":
				slave.assignment = "serve the public";
				V.ClubiIDs.delete(slave.ID);
				break;

			case "work in the dairy":
			case "dairy":
				slave.assignment = "get milked";
				V.DairyiIDs.delete(slave.ID);
				break;

			case "work as a farmhand":
			case "farmyard":
				slave.assignment = "rest";
				V.FarmyardiIDs.delete(slave.ID);
				break;

			case "learn in the schoolroom":
			case "schoolroom":
				slave.assignment = "rest";
				V.SchlRiIDs.delete(slave.ID);
				break;

			case "rest in the spa":
			case "spa":
				slave.assignment = "rest";
				V.SpaiIDs.delete(slave.ID);
				break;

			case "work as a servant":
			case "servants' quarters":
			case "servantsquarters":
				slave.assignment = "be a servant";
				V.ServQiIDs.delete(slave.ID);
				break;

			case "serve in the master suite":
			case "master suite":
			case "mastersuite":
				slave.assignment = "please you";
				V.MastSiIDs.delete(slave.ID);
				break;

			case "live with your head girl":
			case "head girl suite":
			case "hgsuite":
				slave.assignment = "rest";
				V.HGSuiteiIDs.delete(slave.ID);
				break;

			case "work as a nanny":
			case "nursery":
				slave.assignment = "rest";
				V.NurseryiIDs.delete(slave.ID);
				break;

			case "be your head girl":
				let attentionCheck = 1;
				slave.assignment = "rest";
				const HGSlave = V.slaves.findIndex(s => s.assignment === "live with your Head Girl");
				if (HGSlave !== -1) {
					if (V.HGSuiteEquality === 1) {
						if (V.slaves[HGSlave].devotion > 50) {
							removeJob(V.slaves[HGSlave], "live with your Head Girl");
							assignJob(V.slaves[HGSlave], "be your Head Girl");
							V.HeadGirl = V.slaves[HGSlave];
							V.slaves[HGSlave].diet = "healthy";
							attentionCheck = 0;
						} else {
							removeJob(V.slaves[HGSlave], "live with your Head Girl");
						}
					} else {
						removeJob(V.slaves[HGSlave], "live with your Head Girl");
					}
				}
				if (V.personalAttention === "HG" && attentionCheck === 1) {
					if (V.PC.career === "escort") {
						V.personalAttention = "whoring";
					} else if (V.PC.career === "servant") {
						V.personalAttention = "upkeep";
					} else {
						V.personalAttention = "business";
					}

					r += `You no longer have a slave assigned to be your Head Girl, so you turn your personal attention to focus on ${V.personalAttention}.`;
				}
				V.HGTimeInGrade = 0;
				break;

			case "be your agent":
			case "live with your agent":
				if (slave.assignment === "be your agent") {
					const arc = V.arcologies.find((a) => a.leaderID === slave.ID);
					arc.leaderID = 0;
					arc.government = "your trustees";
				}
				slave.assignment = "rest";
				V.leaders.deleteWith(s => s.ID === slave.ID);
				if (slave.relationshipTarget > 0) {
					/* following code assumes there can be at most one companion */
					const _lover = V.slaves.findIndex(s => haveRelationshipP(s, slave) && s.assignment === "live with your agent");
					if (_lover !== -1) {
						V.slaves[_lover].assignment = "rest";
					}
				}
				break;

			default:
				slave.assignment = "rest";
				break;
		}

		if (slave.rules.living === "luxurious" && !assignmentVisible(slave)) {
			slave.rules.living = "normal";
		}

		slave.choosesOwnAssignment = 0;
		slave.sentence = 0;
		slave.subTarget = 0;
	}
	V.JobIDArray = resetJobIDArray();
	if (idx >= 0) {
		V.slaves[idx] = slave;
	}

	return r;
};

/**
 * Indicate whether a slave's current assignment is shown in Main
 * Often used as a proxy for "penthouse slave"
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.assignmentVisible = function assignmentVisible(slave) {
	switch (slave.assignment) {
		/* normal out-of-penthouse jobs */
		case "be confined in the arcade":
		case "work in the brothel":
		case "be confined in the cellblock":
		case "get treatment in the clinic":
		case "serve in the club":
		case "work in the dairy":
		case "work as a farmhand":
		case "live with your Head Girl":
		case "serve in the master suite":
		case "learn in the schoolroom":
		case "work as a servant":
		case "rest in the spa":
		case "work as a nanny":
			return false;

		/* outside leadership jobs */
		case "be the Attendant":
		case "be the Matron":
		case "be the DJ":
		case "be the Madam":
		case "be the Milkmaid":
		case "be the Farmer":
		case "be the Nurse":
		case "be the Schoolteacher":
		case "be the Stewardess":
		case "be the Wardeness":
		case "be your Concubine":
			return false;

		/* agents are not in the arcology at all */
		case "be your agent":
		case "live with your agent":
			return false;

		/* transition state */
		case "choose her own job":
			return true; // show
	}

	/* all other jobs are shown in penthouse */
	return true;
};

window.resetJobIDArray = function resetJobIDArray() {
	/* todo: expand to all assignments */

	/** @type {Array<App.Entity.SlaveState>} */
	const slaves = State.variables.slaves;
	const JobIDArray = {
		"rest": [],
		"please you": [],
		"work a glory hole": [],
		"take classes": [],
		"be a servant": [],
		"whore": [],
		"serve the public": [],
		"get milked": [],
		"stay confined": [],
		"be a subordinate slave": []
	};

	slaves.forEach(function(slave) {
		if (JobIDArray.hasOwnProperty(slave.assignment)) {
			JobIDArray[slave.assignment].push(slave.ID);
		}
	});

	return JobIDArray;
};

/**
 * Generates string with links for changing slave assignment
 */
App.UI.jobLinks = function() {
	"use strict";
	const facilitiesOrder = [
		/* sorted by improvement before work, within improvement in order of progress, within work alphabetical for facilities*/
		App.Entity.facilities.penthouse,
		App.Entity.facilities.cellblock,
		App.Entity.facilities.nursery,
		App.Entity.facilities.schoolroom,
		App.Entity.facilities.clinic,
		App.Entity.facilities.spa,
		App.Entity.facilities.arcade,
		App.Entity.facilities.brothel,
		App.Entity.facilities.club,
		App.Entity.facilities.dairy,
		App.Entity.facilities.farmyard,
		App.Entity.facilities.masterSuite,
		App.Entity.facilities.servantsQuarters
	];

	return {
		assignments: assignmentLinks,
		transfers: transferLinks,
		assignmentsFragment: assignmentsFragment,
		transfersFragment: transfersFragment
	};

	/**
	 * Generates assignment links
	 * @param {number} index in the slaves array or -1 for the activeSlave
	 * @param {string} [passage] optional next passage to go to
	 * @param {linkCallback} [callback]
	 * @returns {string}
	 */
	function assignmentLinks(index, passage, callback) {
		let penthouseJobs = App.Entity.facilities.penthouse.assignmentLinks(index, undefined, passage, callback);
		const slave = App.Utils.slaveByIndex(index);
		const sp = getPronouns(slave);

		if (slave.fuckdoll === 0) {
			const assignment = "choose her own job";
			if (slave.assignment !== assignment) {
				const linkAction = callback !== undefined ? callback(assignment) : '';
				penthouseJobs.push(`<<link "Let ${sp.object} choose" ${passage !== undefined ? `"${passage}"` : ''}>><<= assignJob(${App.Utils.slaveRefString(index)}, "${assignment}")>>${linkAction}<</link>>`);
			}
		} else {
			penthouseJobs.push(App.UI.disabledLink(`Let ${sp.object} choose`, ["Fuckdolls can't choose their job"]));
		}

		return penthouseJobs.join("&thinsp;|&thinsp;");
	}

	function transferLinks(index) {
		/** @type {string[]} */
		const transfers = [];
		const slave = App.Utils.slaveByIndex(index);

		for (const f of facilitiesOrder) {
			if (!f.established) { continue; }
			const rejects = f.canHostSlave(slave);
			if (rejects.length === 0) {
				transfers.push(f.transferLink(index, undefined, passage()));
			} else {
				transfers.push(App.UI.disabledLink(f.genericName, rejects));
			}
		}

		return transfers.join('&thinsp;|&thinsp;');
	}

	/**
	 *
	 * @param {number} index
	 * @param {string} passage
	 * @param {assignmentCallback} [callback]
	 * @returns {DocumentFragment}
	 */
	function assignmentsFragment(index, passage, callback) {
		let penthouseJobs = App.Entity.facilities.penthouse.assignmentLinkElements(index, undefined, passage, callback);
		const slave = App.Utils.slaveByIndex(index);
		const sp = getPronouns(slave);

		if (slave.fuckdoll === 0) {
			const assignment = "choose her own job";
			if (slave.assignment !== assignment) {
				penthouseJobs.push(
					App.UI.DOM.assignmentLink(State.variables.slaves[index],
						assignment, passage, callback, `Let ${sp.object} choose`));
			}
		} else {
			penthouseJobs.push(App.UI.DOM.disabledLink(`Let ${sp.object} choose`, ["Fuckdolls can't choose their job"]));
		}
		let res = document.createDocumentFragment();
		// there is always at least one job
		res.appendChild(penthouseJobs[0]);
		for (let i = 1; i < penthouseJobs.length; ++i) {
			res.appendChild(document.createTextNode(" | "));
			res.appendChild(penthouseJobs[i]);
		}
		return res;
	}

	function transfersFragment(index, callback) {
		/** @type {HTMLElement[]} */
		const transfers = [];
		const slave = App.Utils.slaveByIndex(index);

		for (const f of facilitiesOrder) {
			if (!f.established) { continue; }
			const rejects = f.canHostSlave(slave);
			if (rejects.length === 0) {
				transfers.push(f.transferLinkElement(index, undefined, passage(), callback));
			} else {
				transfers.push(App.UI.DOM.disabledLink(f.genericName, rejects));
			}
		}

		let res = document.createDocumentFragment();
		// there is always at least one job
		res.appendChild(transfers[0]);
		for (let i = 1; i < transfers.length; ++i) {
			res.appendChild(document.createTextNode(" | "));
			res.appendChild(transfers[i]);
		}
		return res;
	}
}();

App.activeArcology = function() {
	return V.arcologies[V.activeArcologyIdx];
};

App.currentAgent = function(arcology) {
	return V.leaders.find((f) => f.ID === V.arcologies[arcology].leaderID);
};

/**
 * Remove all workers from the facility changing their assignments
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [managerAssignment="rest"] new assignment for the facility manager
 * @param {string} [workerAssignment="rest"] new assignment for the facility workers
 */
App.Utils.moveFacilityWorkers = function(facility, managerAssignment = "rest", workerAssignment = "rest") {
	if (facility.manager && facility.manager.currentEmployee) {
		assignJob(facility.manager.currentEmployee, managerAssignment);
	}

	for (const w of facility.employees()) {
		assignJob(w, workerAssignment);
	}
};

App.Utils.jobForAssignment = function() {
	const map = new Map();
	function fillMap() {
		/**
		 * @param {Map} m
		 * @param {App.Entity.Facilities.Facility} f
		 */
		function addFacility(m, f) {
			if (f.manager) {
				m.set(f.desc.manager.assignment, f.manager);
			}
			for (const j of f.jobsNames) {
				m.set(f.desc.jobs[j].assignment, f.job(j));
			}
		}

		for (const f in App.Entity.facilities) {
			if (f.length > 0) {
				addFacility(map, App.Entity.facilities[f]);
			}
		}
	}

	/**
	 * @param {string} assignment
	 * @returns {App.Entity.Facilities.Job}
	 */
	function getJob(assignment) {
		if (map.size === 0) {
			fillMap();
		}
		const res = map.get(assignment);
		if (!res) {
			throw Error(`Can't find job object for assignment '${assignment}'`);
		}
		return res;
	}
	return getJob;
}();
