/**
 * @file Functions for rendering lists of slave summaries for various purposes. This includes
 * lists for the penthouse/facilities, selecting a slaves, facility leaders.
 *
 * For documentation see devNotes/slaveListing.md
 */

App.UI.SlaveList = {};

/**
 * @callback slaveTextGenerator
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @returns {string}
 */

/**
 * @callback slaveToElement
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @returns {HTMLElement|DocumentFragment}
 */

App.UI.SlaveList.render = function() {
	'use strict';

	/** @type {string} */
	let passageName;
	/** @type {App.Entity.SlaveState[]} */
	let slaves;

	// potentially can be a problem if played long enough to reach Number.MAX_SAFE_INTEGER
	let listID = Number.MIN_SAFE_INTEGER;

	/** @type {Object.<number, Node>}*/
	const readyResults = {

	};

	return {
		listMarkup: listMarkup,
		listDOM: listDOM
	};

	/**
	 * @param {number[]} indices
	 * @param {Array.<{index: number, rejects: string[]}>} rejectedSlaves
	 * @param {slaveToElement} interactionLink
	 * @param {slaveToElement} [postNote]
	 * @returns {DocumentFragment}
	 */
	function listDOM(indices, rejectedSlaves, interactionLink, postNote) {
		passageName = passage();
		slaves = V.slaves;
		V.assignTo = passageName; // would be passed to the "Assign" passage

		let res = document.createDocumentFragment();

		if (V.useSlaveListInPageJSNavigation === 1) {
			res.appendChild(createQuickList(indices));
		}

		const fcs = App.Entity.facilities;

		// can't simply loop over fcs attributes, as there is the penthouse among them, which always exists
		const anyFacilityExists = fcs.brothel.established || fcs.club.established || fcs.dairy.established || fcs.farmyard.established || fcs.servantsQuarters.established || fcs.masterSuite.established || fcs.spa.established || fcs.clinic + fcs.schoolroom.established || fcs.cellblock.established || fcs.arcade.established || fcs.headGirlSuite.established;

		let showTransfers = false;
		if (anyFacilityExists) {
			if (passageName === "Main" || passageName === "Head Girl Suite" || passageName === "Spa" || passageName === "Brothel" || passageName === "Club" || passageName === "Arcade" || passageName === "Clinic" || passageName === "Schoolroom" || passageName === "Dairy" || passageName === "Farmyard" || passageName === "Servants' Quarters" || passageName === "Master Suite" || passageName === "Cellblock") {
				V.returnTo = passageName;
				showTransfers = true;
			}
		}

		for (const _si of indices) {
			let ss = renderSlave(_si, interactionLink, showTransfers, postNote);
			let slaveDiv = document.createElement("div");
			slaveDiv.id = `slave-${slaves[_si].ID}`;
			slaveDiv.classList.add("slaveSummary");
			if (V.slavePanelStyle === 2) {
				slaveDiv.classList.add("card");
			}
			slaveDiv.appendChild(ss);
			res.appendChild(slaveDiv);
		}

		for (const rs of rejectedSlaves) {
			const slave = slaves[rs.index];
			const rejects = rs.rejects;
			const slaveName = SlaveFullName(slave);
			let slaveDiv = document.createElement("div");
			slaveDiv.id = `slave-${slave.ID}`;
			slaveDiv.style.setProperty("clear", "both");
			if (rejects.length === 1) {
				slaveDiv.innerHTML = rejects[0];
			} else {
				slaveDiv.appendChild(document.createTextNode(`${slaveName}: `));
				let ul = document.createElement("ul");
				for (const rr of rejects) {
					const li = document.createElement("li");
					li.innerHTML = rr;
					ul.appendChild(li);
				}
				slaveDiv.appendChild(ul);
			}
			res.appendChild(slaveDiv);
		}

		return res;
	}

	/**
	 * @param {number[]} indices
	 * @param {Array.<{index: number, rejects: string[]}>} rejectedSlaves
	 * @param {slaveToElement} interactionLink
	 * @param {slaveToElement} [postNote]
	 * @returns {string}
	 */
	function listMarkup(indices, rejectedSlaves, interactionLink, postNote) {
		const listIDStr = `slave-list-${listID}`;
		readyResults[listID] = listDOM(indices, rejectedSlaves, interactionLink, postNote);

		$(document).one(':passagedisplay', function() {
			for (const e of document.querySelectorAll('[id^=slave-list]')) {
				const id = e.getAttribute("data-listId");
				if (readyResults.hasOwnProperty(id)) {
					if (e.childNodes.length > 0) {
						e.innerHTML = '';
					}
					e.appendChild(readyResults[id]);
					delete readyResults[id];
				}
			}
		});

		let resMarkup = `<div id="${listIDStr}" data-listId="${listID}"></div>`;
		++listID;

		return resMarkup;
	}


	/**
	 * @param {number} index
	 * @param {slaveToElement} interactionLink
	 * @param {boolean} showTransfers
	 * @param {slaveToElement} [postNote]
	 * @returns {DocumentFragment}
	 */
	function renderSlave(index, interactionLink, showTransfers, postNote) {
		let res = document.createDocumentFragment();
		if (V.slavePanelStyle === 0) {
			res.appendChild(document.createElement("br"));
		} else if (V.slavePanelStyle === 1) {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			res.appendChild(hr);
		}
		const slave = slaves[index];

		if ((V.seeImages === 1) && (V.seeSummaryImages === 1)) {
			let imgDiv = document.createElement("div");
			imgDiv.classList.add("imageRef");
			imgDiv.classList.add("smlImg");
			imgDiv.appendChild(App.Art.SlaveArtElement(slave, 1));
			res.appendChild(imgDiv);
		}
		// res.push(dividerAndImage(slave));
		res.appendChild(interactionLink(slave, index));

		if ((slave.choosesOwnClothes === 1) && (slave.clothes === "choosing her own clothes")) {
			const _oldDevotion = slave.devotion;
			saChoosesOwnClothes(slave);
			slave.devotion = _oldDevotion; /* restore devotion value so repeatedly changing clothes isn't an exploit */
		}

		SlaveStatClamp(slave);
		slave.trust = Math.trunc(slave.trust);
		slave.devotion = Math.trunc(slave.devotion);
		slave.health.condition = Math.trunc(slave.health.condition);
		slave.health.shortDamage = Math.trunc(slave.health.shortDamage);
		slave.health.longDamage = Math.trunc(slave.health.longDamage);
		slave.health.illness = Math.trunc(slave.health.illness);
		slave.health.tired = Math.trunc(slave.health.tired);
		slave.health.health = Math.trunc(slave.health.health);
		res.appendChild(document.createTextNode(' will '));
		const assignment = document.createElement("span");
		if ((slave.assignment === "rest") && (slave.health.condition >= -20)) {
			assignment.className = "freeAssignment";
			assignment.innerText = slave.assignment;
		} else if ((slave.assignment === "stay confined") && ((slave.devotion > 20) || ((slave.trust < -20) && (slave.devotion >= -20)) || ((slave.trust < -50) && (slave.devotion >= -50)))) {
			assignment.innerText = slave.assignment;
			if (slave.sentence > 0) {
				assignment.innerText += ` (${slave.sentence} weeks)`;
			}
		} else if (slave.choosesOwnAssignment === 1) {
			assignment.innerText = `choose ${getPronouns(slave).possessive} own job`;
		} else {
			assignment.innerText = slave.assignment;
			if (slave.sentence > 0) {
				assignment.innerText += ` ${slave.sentence} weeks`;
			}
		}
		if (slave.assignment === "get treatment in the clinic") {
			let list = [];
			let i;
			if (slave.health.condition <= 40) {
				list.push(`poor health`);
			}
			if (slave.health.shortDamage >= 10) {
				list.push(`injuries`);
			}
			if (V.Nurse !== 0) {
				if ((slave.chem > 15) && (V.clinicUpgradeFilters === 1)) {
					list.push(`unhealthy chemicals`);
				}
				if ((V.clinicInflateBelly > 0) && (slave.bellyImplant >= 0) && (slave.bellyImplant <= (V.arcologies[0].FSTransformationFetishistResearch ? 800000 : 130000))) {
					list.push(`implant filling`);
				}
				if ((slave.pregKnown === 1) && (V.clinicSpeedGestation > 0 || slave.pregControl === "speed up") && ((slave.pregAdaptation*1000 < slave.bellyPreg || slave.preg > slave.pregData.normalBirth/1.33))) {
					list.push(`observation of accelerated pregnancy`);
				} else if ((slave.pregKnown === 1) && (V.clinicSpeedGestation > 0 || slave.pregControl === "speed up")) {
					list.push(`safely hurrying pregnancy along`);
				} else if ((slave.pregAdaptation*1000 < slave.bellyPreg || slave.preg > slave.pregData.normalBirth/1.33)) {
					list.push(`observation during pregnancy`);
				}
			}
			if (list.length > 0) {
				assignment.innerText += " for ";
			} else {
				assignment.innerText += ", preparing to check out";
			}
			for (i = 0; i < list.length; i++) {
				assignment.innerText += list[i];
				if (i === (list.length - 2)) {
					assignment.innerText += " and ";
				} else if (i < (list.length - 2)) {
					assignment.innerText += ", ";
				}
			}
		} else if (slave.assignment === "rest in the spa") {
			let list = [];
			let i;
			if (slave.fetish === "mindbroken") {
				assignment.innerText += `, mindbroken`;
			} else {
				if ((slave.sexualFlaw !== "none") || (slave.behavioralFlaw !== "none")) {
					list.push(`overcoming flaws`);
				}
				if ((slave.trust < 60) || (slave.devotion < 60)) {
					list.push(`learning to accept life as a slave`);
				}
				if (slave.health.condition < 20) {
					list.push(`improving in health`);
				}
				if (list.length > 0) {
					assignment.innerText += ", ";
				} else {
					assignment.innerText += ", preparing to move out";
				}
				for (i = 0; i < list.length; i++) {
					assignment.innerText += list[i];
					if (i === (list.length - 2)) {
						assignment.innerText += " and ";
					} else if (i < (list.length - 2)) {
						assignment.innerText += ", ";
					}
				}
			}
		} else if (slave.assignment === "learn in the schoolroom") {
			let lessons = [];
			let i;
			if ((V.schoolroomRemodelBimbo === 1 && slave.intelligenceImplant > -15) || (V.schoolroomRemodelBimbo === 0 && slave.intelligenceImplant < 30)) {
				lessons.push("general");
			}
			if (!((slave.voice === 0) || (slave.accent <= 1) || ((V.schoolroomUpgradeLanguage === 0) && (slave.accent <= 2)))) {
				lessons.push("speech");
			}
			if (!((slave.skill.oral > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.oral > 10)))) {
				lessons.push("oral");
			}
			if (!((slave.skill.whoring > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.whoring > 10)))) {
				lessons.push("whoring");
			}
			if (!((slave.skill.entertainment > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.entertainment > 10)))) {
				lessons.push("entertainment");
			}
			if (!((slave.skill.anal > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.anal > 10)))) {
				lessons.push("anal");
			}
			if (!((slave.skill.vaginal > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.vaginal > 10)) || (slave.vagina < 0))) {
				lessons.push("vaginal");
			}
			if (lessons.length > 0) {
				assignment.innerText += ", practicing: ";
			} else {
				assignment.innerText += ", studying for finals";
			}
			for (i = 0; i < lessons.length; i++) {
				assignment.innerText += lessons[i];
				if (i === (lessons.length - 2)) {
					assignment.innerText += " and ";
				} else if (i < (lessons.length - 2)) {
					assignment.innerText += ", ";
				}
			}
		} else if (slave.assignment === "be a subordinate slave") {
			if (slave.subTarget !== 0) {
				assignment.innerText += ", serving " + SlaveFullName(slaves[V.slaveIndices[slave.subTarget]]) + " exclusively";
			}
		}
		assignment.innerText += ".";
		if (V.assignmentRecords[slave.ID]) {
			assignment.innerText += ` Last assigned to ${V.assignmentRecords[slave.ID]}.`;
		}
		res.appendChild(assignment);
		res.appendChild(document.createTextNode(' '));

		if ((V.displayAssignments === 1) && (passageName === "Main") && (slave.ID !== V.HeadGirl.ID) && (slave.ID !== V.Recruiter.ID) && (slave.ID !== V.Bodyguard.ID)) {
			res.appendChild(App.UI.jobLinks.assignmentsFragment(index, "Main", (slave, assignment) => { App.UI.SlaveList.ScrollPosition.record(); assignJob(slave, assignment); }));
		}
		if (showTransfers) {
			res.appendChild(document.createElement("br"));
			res.appendChild(document.createTextNode('Transfer to: '));
			res.appendChild(App.UI.jobLinks.transfersFragment(index, (slave, assignment) => { App.UI.SlaveList.ScrollPosition.record(); assignJob(slave, assignment); }));
		}

		res.appendChild(SlaveSummary(slave));

		if (postNote !== undefined) {
			const pn = postNote(slave, index);
			if (pn) {
				let r = document.createElement("p");
				r.classList.add("si");
				r.appendChild(pn);
				res.appendChild(r);
			}
		}

		return res;
	}

	/**
	 * @param {number[]} indices
	 * @returns {DocumentFragment}
	 */
	function createQuickList(indices) {
		/**
		 *
		 * @param {Node} container
		 * @param {string} tagName
		 * @param {string} [content]
		 * @param {string|string[]} [classNames]
		 * @param {Object.<string, any>} [attributes]
		 * @returns {HTMLElement}
		 */
		function makeElement(container, tagName, content, classNames, attributes) {
			let res = document.createElement(tagName);
			container.appendChild(res);
			if (content) {
				res.textContent = content;
			}
			if (Array.isArray(classNames)) {
				for (const c of classNames) {
					res.classList.add(c);
				}
			} else if (classNames !== undefined) {
				res.classList.add(classNames);
			}

			if (attributes) {
				for (const [k, v] of Object.entries(attributes)) {
					res.setAttribute(k, v);
				}
			}
			return res;
		}

		const res = document.createDocumentFragment();

		/* Useful for finding weird combinations — usages of this passage that don't yet generate the quick index.
		*	<<print 'pass/count/indexed/flag::[' + passageName + '/' + _Count + '/' + _indexed + '/' + $SlaveSummaryFiler + ']'>>
		*/

		if (indices.length > 1 && passageName === "Main") {
			const _buttons = [];
			let _offset = -50;
			if (/Select/i.test(passageName)) {
				_offset = -25;
			}
			res.appendChild(document.createElement("br"));
			/*
			 * we want <button data-quick-index="<<= listID>>">...
			 */
			const quickIndexBtn = document.createElement("button");
			res.appendChild(quickIndexBtn);
			quickIndexBtn.id = `quick-list-toggle${listID}`;
			quickIndexBtn.setAttribute('data-quick-index', listID.toString());
			quickIndexBtn.onclick = function(ev) {
				let which = ev.target.attributes["data-quick-index"].value;
				let quick = $("div#list_index" + which);
				quick.toggleClass("hidden");
			};
			/*
			 * we want <div id="list_index3" class=" hidden">...
			 */
			const listIndex = makeElement(res, "div", undefined, "hidden");
			listIndex.id = `list_index${listID}`;

			for (const _ssii of indices) {
				const _IndexSlave = slaves[_ssii];
				const _indexSlaveName = SlaveFullName(_IndexSlave);
				const _devotionClass = getSlaveDevotionClass(_IndexSlave);
				const _trustClass = getSlaveTrustClass(_IndexSlave);
				_buttons.push({
					"data-name": _indexSlaveName,
					"data-scroll-to": `#slave-${_IndexSlave.ID}`,
					"data-scroll-offset": _offset,
					"data-devotion": _IndexSlave.devotion,
					"data-trust": _IndexSlave.trust,
					"class": `${_devotionClass} ${_trustClass}`
				});
			}
			if (_buttons.length > 0) {
				V.sortQuickList = V.sortQuickList || 'Devotion';
				makeElement(listIndex, "em", "Sorting: ");
				const qlSort = makeElement(listIndex, "span", V.sortQuickList, "strong");
				qlSort.id = "qlSort";
				listIndex.appendChild(document.createTextNode(". "));
				const linkSortByDevotion = makeElement(listIndex, "a", "Sort by Devotion");
				linkSortByDevotion.onclick = (ev) => {
					ev.preventDefault();
					State.variables.sortQuickList = "Devotion";
					$("#qlSort").text(State.variables.sortQuickList);
					$("#qlWrapper").removeClass("trust").addClass("devotion");
					sortButtonsByDevotion();
				};
				const linkSortByTrust = makeElement(listIndex, "a", "Sort by Trust");
				linkSortByTrust.onclick = (ev) => {
					ev.preventDefault();
					State.variables.sortQuickList = "Trust";
					$("#qlSort").text(State.variables.sortQuickList);
					$("#qlWrapper").removeClass("devotion").addClass("trust");
					sortButtonsByTrust();
				};
				makeElement(listIndex, "br");
				const qlWrapper = makeElement(listIndex, "div", undefined, ["quicklist", "devotion"]);
				qlWrapper.id = "qlWrapper";
				for (const _button of _buttons) {
					const btn = makeElement(listIndex, 'button', _button['data-name'], undefined, _button);
					btn.onclick = App.UI.quickBtnScrollToHandler;
				}
			}
		}
		return res;
	}
}();

App.UI.SlaveList.Decoration = {};
/**
 * returns "HG", "BG", "PA", and "RC" prefixes
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
App.UI.SlaveList.Decoration.penthousePositions = (slave) => {
	if (App.Data.Facilities.headGirlSuite.manager.assignment === slave.assignment) {
		return App.UI.DOM.makeElement("span", 'HG', ['lightcoral', 'strong']);
	}
	if (App.Data.Facilities.penthouse.manager.assignment === slave.assignment) {
		return App.UI.DOM.makeElement("span", 'RC', ['lightcoral', 'strong']);
	}
	if (App.Data.Facilities.armory.manager.assignment === slave.assignment) {
		return App.UI.DOM.makeElement("span", 'BG', ['lightcoral', 'strong']);
	}
	if (Array.isArray(State.variables.personalAttention) && State.variables.personalAttention.findIndex(s => s.ID === slave.ID) !== -1) {
		return App.UI.DOM.makeElement("span", 'PA', ['lightcoral', 'strong']);
	}
	return null;
};

App.UI.SlaveList.ScrollPosition = (function() {
	let lastPassage = null;
	let position = 0;

	return {
		reset : function() {
			lastPassage = null;
			position = 0;
		},

		record : function() {
			lastPassage = passage();
			position = window.pageYOffset;
		},

		restore : function() {
			$(document).one(':passageend', () => {
				if (lastPassage === passage()) {
					window.scrollTo(0, position);
				}
				this.reset();
			});
		}
	};
})();

App.UI.SlaveList.SlaveInteract = {};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @returns {HTMLElement}
 */
App.UI.SlaveList.SlaveInteract.stdInteract = (slave, index) =>
	App.UI.DOM.passageLink(SlaveFullName(slave), 'Slave Interact', () => { App.UI.SlaveList.ScrollPosition.record(); App.Utils.setActiveSlaveByIndex(index); });


/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} index
 * @returns {DocumentFragment|HTMLElement}
 */
App.UI.SlaveList.SlaveInteract.penthouseInteract = (slave, index) => {
	let decoration = App.UI.SlaveList.Decoration.penthousePositions(slave);
	let stdLink = App.UI.SlaveList.SlaveInteract.stdInteract(slave, index);
	if (decoration) {
		let fr = document.createDocumentFragment();
		fr.appendChild(decoration);
		fr.appendChild(document.createTextNode(' '));
		fr.appendChild(stdLink);
		return fr;
	}
	return stdLink;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
App.UI.SlaveList.SlaveInteract.personalAttention = (slave) =>
	App.UI.DOM.passageLink(SlaveFullName(slave), undefined,
		() => { App.UI.selectSlaveForPersonalAttention(slave.ID); });

/**
 * Adds/removes a slave with the given id to/from the personal attention array
 * @param {number} id slave id
 */
App.UI.selectSlaveForPersonalAttention = function(id) {
	if (!Array.isArray(V.personalAttention)) {
		/* first PA target */
		V.personalAttention = [{
			ID: id,
			trainingRegimen: "undecided"
		}];
	} else {
		const _pai = V.personalAttention.findIndex(s => s.ID === id);
		if (_pai === -1) {
			/* not already a PA target; add */
			V.activeSlave = getSlave(id);
			V.personalAttention.push({
				ID: id,
				trainingRegimen: "undecided"
			});
		} else {
			/* already a PA target; remove */
			V.personalAttention.deleteAt(_pai);
			if (V.personalAttention.length === 0) {
				V.personalAttention = "sex";
			}
		}
	}
	SugarCube.Engine.play("Personal Attention Select");
};

/**
 * Generates fragment with sorting options, that link to the given passage
 * @param {string} passage The passage to link to
 * @returns {string}
 */
App.UI.SlaveList.sortingLinks = function(passage) {
	let r = '&nbsp;&nbsp;&nbsp;&nbsp;Sort by: ';
	let textify = (cc) => capFirstChar(cc.replace(/([A-Z])/g, " $1"));
	r += ["devotion", "name", "assignment", "seniority", "actualAge", "visualAge", "physicalAge", "weeklyIncome"]
		.map(so => V.sortSlavesBy !== so ?
			App.UI.passageLink(textify(so), passage, `$sortSlavesBy = "${so}"`) : textify(so))
		.join("&thinsp;|&thinsp;");

	r += '&nbsp;&nbsp;&nbsp;&nbsp;Sort: ';
	r += ["descending", "ascending"].map(so => V.sortSlavesOrder !== so ?
		App.UI.passageLink(capFirstChar(so), passage, `$sortSlavesOrder = "${so}"`) : capFirstChar(so))
		.join("&thinsp;|&thinsp;");
	return r;
};

/**
 * @param {string} passage
 * @returns {*}
 */
App.UI.SlaveList.sortingLinksDOM = function(passage) {
	const outerDiv = document.createElement("div");
	outerDiv.classList.add("flex-container");
	const textify = string => capFirstChar(string.replace(/([A-Z])/g, " $1"));

	let innerDiv = App.UI.DOM.makeElement("div", "Sort by: ", "indent");
	let order = ["devotion", "name", "assignment", "seniority", "actualAge", "visualAge", "physicalAge", "weeklyIncome"]
		.map(so => V.sortSlavesBy !== so ?
			App.UI.DOM.passageLink(textify(so), passage, () => { V.sortSlavesBy = so; }) : textify(so));
	innerDiv.append(App.UI.DOM.arrayToList(order, " | ", " | "));
	outerDiv.append(innerDiv);

	innerDiv = App.UI.DOM.makeElement("div", "Sort: ", "indent");
	order = ["descending", "ascending"].map(so => V.sortSlavesOrder !== so ?
		App.UI.DOM.passageLink(textify(so), passage, () => { V.sortSlavesOrder = so; }) : textify(so));
	innerDiv.append(App.UI.DOM.arrayToList(order, " | ", " | "));
	outerDiv.append(innerDiv);

	return outerDiv;
};

/**
 * Standard tabs for a facility with a single job (SJ)
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [facilityPassage]
 * @param {boolean} [showTransfersTab=false]
 * @param {{assign: string, remove: string, transfer: (string| undefined)}} [tabCaptions]
 * @returns {string}
 */
App.UI.SlaveList.listSJFacilitySlaves = function(facility, facilityPassage, showTransfersTab = false, tabCaptions = undefined) {
	const job = facility.job();

	facilityPassage = facilityPassage || passage();
	tabCaptions = tabCaptions || {
		assign: 'Assign a slave',
		remove: 'Remove a slave',
		transfer: 'Transfer from Facility'
	};
	let r = '';
	if (V.sortSlavesMain) {
		r += this.sortingLinks(facilityPassage) + '<br>';
	}
	r += '<div class="tabbar">' +
		App.UI.tabbar.tabButton('assign', tabCaptions.assign) +
		App.UI.tabbar.tabButton('remove', tabCaptions.remove) +
		(showTransfersTab ? App.UI.tabbar.tabButton('transfer', tabCaptions.transfer) : '') +
		'</div>';

	if (facility.hostedSlaves > 0) {
		let facilitySlaves = job.employeesIndices();
		SlaveSort.indices(facilitySlaves);
		r += App.UI.tabbar.makeTab("remove", App.UI.SlaveList.render.listMarkup(facilitySlaves, [],
			App.UI.SlaveList.SlaveInteract.stdInteract,
			(slave, index) => App.UI.DOM.passageLink(`Retrieve ${getPronouns(slave).object} from ${facility.name}`, "Retrieve",
				() => { variables().i = index; })));
	} else {
		r += App.UI.tabbar.makeTab("remove", `<em>${capFirstChar(facility.name)} is empty for the moment</em>`);
	}

	/**
	 * @param {number[]} slaveIdxs
	 * @returns {string}
	 */
	function assignableTabContent(slaveIdxs) {
		SlaveSort.indices(slaveIdxs);
		const slaves = V.slaves;
		let rejectedSlaves = [];
		let passedSlaves = [];
		slaveIdxs.forEach((idx) => {
			const rejects = facility.canHostSlave(slaves[idx]);
			if (rejects.length > 0) {
				rejectedSlaves.push({index: idx, rejects: rejects});
			} else {
				passedSlaves.push(idx);
			}
		}, []);
		return App.UI.SlaveList.render.listMarkup(passedSlaves, rejectedSlaves,
			App.UI.SlaveList.SlaveInteract.stdInteract,
			(slave, index) => App.UI.DOM.passageLink(`Send ${getPronouns(slave).object} to ${facility.name}`, "Assign",
				() => { variables().i = index; }));
	}
	if (facility.hasFreeSpace) {
		const assignableSlaveIdxs = job.desc.partTime ?
			Array.apply(null, {length: V.slaves.length}).map(Number.call, Number) : // all slaves can work here
			App.Entity.facilities.penthouse.employeesIndices(); // only slaves from the penthouse can be transferred here
		r += App.UI.tabbar.makeTab("assign", assignableTabContent(assignableSlaveIdxs));
	} else {
		r += App.UI.tabbar.makeTab("assign", `<strong>${capFirstChar(facility.name)} is full and cannot hold any more slaves</strong>`);
	}

	if (showTransfersTab) {
		if (facility.hasFreeSpace) {
			// slaves from other facilities can be transferred here
			const transferableIndices = V.slaves.reduce((acc, slave, ind) => {
				if (!assignmentVisible(slave) && !facility.isHosted(slave)) {
					acc.push(ind);
				}
				return acc;
			}, []);
			r += App.UI.tabbar.makeTab("transfer", assignableTabContent(transferableIndices));
		} else {
			r += App.UI.tabbar.makeTab("transfer", `<strong>${capFirstChar(facility.name)} is full and cannot hold any more slaves</strong>`);
		}
	}
	App.UI.tabbar.handlePreSelectedTab();

	return r;
};

/**
 * @param {string[]} classNames
 */
App.UI.SlaveList.makeNameDecorator = function(classNames) {
	return (slave) => {
		const r = document.createElement("span");
		for (const c of classNames) {
			r.classList.add(c);
		}
		r.textContent = SlaveFullName(slave);
		return r;
	};
};

/**
 * @returns {string}
 */
App.UI.SlaveList.listNGPSlaves = function() {
	const thisPassage = 'New Game Plus';
	let r = this.sortingLinks(thisPassage) + '<br>';

	r += '<div class="tabbar">' +
		App.UI.tabbar.tabButton('assign', 'Import a slave') +
		App.UI.tabbar.tabButton('remove', 'Remove from import') +
		'</div>';

	const NGPassignment = "be imported";
	/** @type {App.Entity.SlaveState[]} */
	const slaves = V.slaves;

	if (V.slavesToImport > 0) {
		const importedSlavesIndices = slaves.reduce((acc, s, i) => {
			if (s.assignment === NGPassignment) {
				acc.push(i);
			}
			return acc;
		}, []);
		SlaveSort.indices(importedSlavesIndices);
		r += App.UI.tabbar.makeTab("remove", App.UI.SlaveList.render.listMarkup(importedSlavesIndices, [],
			App.UI.SlaveList.makeNameDecorator(["emphasizedSlave", "pink"]),
			(s, i) => App.UI.DOM.passageLink('Remove from import list', thisPassage,
				() => { variables().slavesToImport -= 1; removeJob(variables().slaves[i], NGPassignment); }
			)));
	} else {
		r += App.UI.tabbar.makeTab("remove", `<em>No slaves will go with you to the new game</em>`);
	}

	if (V.slavesToImport < V.slavesToImportMax) {
		const slavesToImportIndices = slaves.reduce((acc, s, i) => { if (s.assignment !== NGPassignment) { acc.push(i); } return acc; }, []);
		SlaveSort.indices(slavesToImportIndices);
		r += App.UI.tabbar.makeTab("assign", App.UI.SlaveList.render.listMarkup(slavesToImportIndices, [],
			App.UI.SlaveList.makeNameDecorator(["emphasizedSlave", "pink"]),
			(s, i) => App.UI.DOM.passageLink('Add to import list', thisPassage,
				() => { variables().slavesToImport += 1; assignJob(variables().slaves[i], NGPassignment); }
			)));
	} else {
		r += App.UI.tabbar.makeTab("assign", `<strong>Slave import limit reached</strong>`);
	}

	App.UI.tabbar.handlePreSelectedTab();
	return r;
};

/**
 * Renders facility manager summary or a note with a link to select one
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [selectionPassage] passage name for manager selection. "${Manager} Select" if omitted
 * @returns {string}
 */
App.UI.SlaveList.displayManager = function(facility, selectionPassage) {
	const managerCapName = capFirstChar(facility.desc.manager.position);
	selectionPassage = selectionPassage || `${managerCapName} Select`;
	const manager = facility.manager.currentEmployee;
	if (manager) {
		return this.render.listMarkup([App.Utils.slaveIndexForId(manager.ID)], [],
			App.UI.SlaveList.SlaveInteract.stdInteract,
			() => App.UI.DOM.passageLink(`Change or remove ${managerCapName}`, selectionPassage));
	} else {
		return `You do not have a slave serving as a ${managerCapName}. ${App.UI.passageLink(`Appoint one`, selectionPassage, "")}`;
	}
};

/**
 * Displays standard facility page with manager and list of workers
 * @param {App.Entity.Facilities.Facility} facility
 * @param {boolean} [showTransfersPage]
 * @returns {string}
 */
App.UI.SlaveList.stdFacilityPage = function(facility, showTransfersPage) {
	return this.displayManager(facility) + '<br><br>' + this.listSJFacilitySlaves(facility, passage(), showTransfersPage);
};

App.UI.SlaveList.penthousePage = function() {
	const ph = App.Entity.facilities.penthouse;

	function overviewTabContent() {
		const fragment = document.createDocumentFragment();
		const A = V.arcologies[0];

		let slaveWrapper = document.createElement("div"); // first is a div so we have no space between slave and buttons
		if (V.HeadGirl) {
			/** @type {App.Entity.SlaveState} */
			const HG = V.HeadGirl;
			slaveWrapper.append(App.UI.DOM.makeElement("span", SlaveFullName(HG), "slave-name"),
				" is serving as your Head Girl");
			if (A.FSEgyptianRevivalistLaw === 1) {
				slaveWrapper.append(" and Consort");
			}
			slaveWrapper.append(". ");
			const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Head Girl", "HG Select"), "major-link");
			link.id = "manageHG";
			slaveWrapper.append(link, " ", App.UI.DOM.makeElement("span", "[H]", "hotkey"));
			slaveWrapper.append(App.UI.SlaveList.render.listDOM([App.Utils.slaveIndexForId(HG.ID)], [],
				App.UI.SlaveList.SlaveInteract.penthouseInteract));
		} else {
			if (V.slaves.length > 1) {
				slaveWrapper.append("You have ", App.UI.DOM.makeElement("span", "not", "warning"), " selected a Head Girl");
				if (A.FSEgyptianRevivalistLaw === 1) {
					slaveWrapper.append(" and Consort");
				}
				slaveWrapper.append(". ", App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select One", "HG Select"), "major-link"),
					" ", App.UI.DOM.makeElement("span", "[H]", "hotkey"));
				slaveWrapper.id = "manageHG";
				if (V.slavePanelStyle === 2) {
					slaveWrapper.classList.add("slaveSummary", "card");
				}
			} else {
				slaveWrapper.append("You do not have enough slaves to keep a Head Girl");
				slaveWrapper.classList.add("note");
			}
		}
		fragment.append(slaveWrapper);

		slaveWrapper = document.createElement("p");
		if (V.Recruiter) {
			/** @type {App.Entity.SlaveState} */
			const RC = V.Recruiter;
			const {he} = getPronouns(RC);
			slaveWrapper.append(App.UI.DOM.makeElement("span", SlaveFullName(RC), "slave-name"),
				" is working");
			if (V.recruiterTarget !== "other arcologies") {
				slaveWrapper.append(" to recruit girls");
			} else {
				slaveWrapper.append(" as a Sexual Ambassador");
				if (A.influenceTarget === -1) {
					slaveWrapper.append(", but ", App.UI.DOM.makeElement("span", `${he} has no target to influence.`, "warning"));
				} else {
					const targetName = V.arcologies.find(a => a.direction === A.influenceTarget).name;
					slaveWrapper.append(` to ${targetName}.`);
				}
			}
			slaveWrapper.append(". ");
			const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Recruiter", "Recruiter Select"), "major-link");
			link.id = "manageRecruiter";
			slaveWrapper.append(link, " ", App.UI.DOM.makeElement("span", "[U]", "hotkey"));
			slaveWrapper.append(App.UI.SlaveList.render.listDOM([App.Utils.slaveIndexForId(RC.ID)], [],
				App.UI.SlaveList.SlaveInteract.penthouseInteract));
		} else {
			slaveWrapper.append("You have ", App.UI.DOM.makeElement("span", "not", "warning"), " selected a Recruiter. ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "Recruiter Select"), "major-link"),
				" ", App.UI.DOM.makeElement("span", "[U]", "hotkey"));
			slaveWrapper.id = "manageRecruiter";
			if (V.slavePanelStyle === 2) {
				slaveWrapper.classList.add("slaveSummary", "card");
			}
		}
		fragment.append(slaveWrapper);

		if (V.dojo) {
			slaveWrapper = document.createElement("p");
			/** @type {App.Entity.SlaveState} */
			const BG = V.Bodyguard;
			if (BG) {
				slaveWrapper.append(App.UI.DOM.makeElement("span", SlaveFullName(BG), "slave-name"),
					" is serving as your bodyguard. ");
				const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Bodyguard", "BG Select"), "major-link");
				link.id = "manageBG";
				slaveWrapper.append(link, " ", App.UI.DOM.makeElement("span", "[B]", "hotkey"));
				slaveWrapper.append(App.UI.SlaveList.render.listDOM([App.Utils.slaveIndexForId(BG.ID)], [],
					App.UI.SlaveList.SlaveInteract.penthouseInteract));
				slaveWrapper.append(App.MainView.useGuard());
			} else {
				slaveWrapper.append("You have ", App.UI.DOM.makeElement("span", "not", "warning"), " selected a Bodyguard. ",
					App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "BG Select"), "major-link"),
					" ", App.UI.DOM.makeElement("span", "[B]", "hotkey"));
				slaveWrapper.id = "manageBG";
				if (V.slavePanelStyle === 2) {
					slaveWrapper.classList.add("slaveSummary", "card");
				}
			}

			fragment.append(slaveWrapper);
		}
		return fragment;
	}

	/**
	 * @param {string} job
	 * @returns {{n: number, dom: DocumentFragment}}
	 */
	function _slavesForJob(job) {
		const employeesIndices = job === 'all' ? ph.employeesIndices() : ph.job(job).employeesIndices();
		if (employeesIndices.length === 0) {
			return {n: 0, dom: document.createDocumentFragment()};
		}

		SlaveSort.indices(employeesIndices);

		if (V.fucktoyInteractionsPosition === 1 && job === "fucktoy") {
			const fragment = document.createDocumentFragment();
			for (const i of employeesIndices) {
				fragment.append(App.UI.SlaveList.render.listDOM([i], [], App.UI.SlaveList.SlaveInteract.penthouseInteract));
				fragment.append(App.MainView.useFucktoy(V.slaves[i]));
			}
			return {
				n: employeesIndices.length,
				dom: fragment
			};
		}

		return {
			n: employeesIndices.length,
			dom: App.UI.SlaveList.render.listDOM(employeesIndices, [], App.UI.SlaveList.SlaveInteract.penthouseInteract)
		};
	}


	/**
	 * @typedef tabDesc
	 * @property {string} tabName
	 * @property {string} caption
	 * @property {Node} content
	 */

	/**
	 * @param {string} tabName
	 * @param {string} caption
	 * @param {Node} content
	 * @returns {tabDesc}
	 */
	function makeTabDesc(tabName, caption, content) {
		return {
			tabName: tabName,
			caption: caption,
			content: content
		};
	}

	/**
	 * Displays encyclopedia entries for occupations at the top of the tab, if enabled
	 * @returns {HTMLSpanElement}
	 */
	function encycTips(jn) {
		const span = document.createElement("span");
		span.classList.add("note");
		if (V.showTipsFromEncy) {
			switch (jn) {
				case "rest":
					span.append(App.Encyclopedia.Entries.rest());
					break;
				case "chooseOwn":
					break; /* no entry written for choose own */
				case "fucktoy":
					span.append(App.Encyclopedia.Entries.fucktoy());
					break;
				case "classes":
					span.append(App.Encyclopedia.Entries.attendingClasses());
					break;
				case "houseServant":
					span.append(App.Encyclopedia.Entries.servitude());
					break;
				case "whore":
					span.append(App.Encyclopedia.Entries.whoring());
					break;
				case "publicServant":
					span.append(App.Encyclopedia.Entries.publicService());
					break;
				case "subordinateSlave":
					span.append(App.Encyclopedia.Entries.sexualServitude());
					break;
				case "cow":
					span.append(App.Encyclopedia.Entries.milking());
					break;
				case "gloryhole":
					span.append(App.Encyclopedia.Entries.gloryHole());
					break;
				case "confinement":
					span.append(App.Encyclopedia.Entries.confinement());
					break;
				default:
					span.append(App.UI.DOM.makeElement("span", "missing tip for this tab", "error"));
					break;
			}
		}
		return span;
	}

	function allTab() {
		const penthouseSlavesIndices = ph.employeesIndices();
		SlaveSort.indices(penthouseSlavesIndices);
		return makeTabDesc('all', `All${V.useSlaveSummaryTabs > 0 ? ` (${penthouseSlavesIndices.length})` : ""}`,
			App.UI.SlaveList.render.listDOM(penthouseSlavesIndices, [], App.UI.SlaveList.SlaveInteract.penthouseInteract));
	}

	let fragment = document.createDocumentFragment();

	if (V.positionMainLinks >= 0) {
		fragment.append(App.UI.DOM.makeElement("div", App.UI.View.mainLinks(), "center"));
	}

	if (V.sortSlavesMain) {
		fragment.append(App.UI.SlaveList.sortingLinksDOM("Main"));
	}

	/** @type {tabDesc[]} */
	let tabs = [];

	// Overview tab
	if (V.useSlaveSummaryOverviewTab) {
		tabs.push(makeTabDesc('overview', "Special Roles", overviewTabContent()));
	}

	if (V.useSlaveSummaryTabs === 0) {
		tabs.push(allTab());
	}

	// tabs for each assignment
	for (const jn of ph.jobsNames) {
		const slaves = _slavesForJob(jn);
		if (slaves.n > 0) {
			tabs.push(makeTabDesc(jn, `${ph.desc.jobs[jn].position}${V.useSlaveSummaryTabs > 0 ? ` (${slaves.n})` : ""}`, App.UI.DOM.combineNodes(encycTips(jn), slaves.dom)));
		} else if (V.useSlaveSummaryTabs === 0) {
			tabs.push(makeTabDesc(jn, ph.desc.jobs[jn].position, encycTips(jn)));
		}
	}

	if (V.useSlaveSummaryTabs > 0) {
		tabs.push(allTab());
	}

	const div = document.createElement("div");
	div.classList.add("tabbar");
	if (V.useSlaveSummaryTabs === 0) {
		const links = [];
		for (const tab of tabs) {
			links.push(App.UI.tabbar.tabButtonDOM(tab.tabName, tab.caption, true));
		}
		div.append(App.UI.DOM.arrayToList(links, " | ", " | "));
	} else {
		for (const tab of tabs) {
			const button = App.UI.tabbar.tabButtonDOM(tab.tabName, tab.caption);
			if (V.useSlaveSummaryTabs === 2) {
				button.classList.add("card");
			}
			div.append(button);
		}
	}
	fragment.append(div);

	for (const tab of tabs) {
		const div = App.UI.tabbar.makeTabDOM(tab.tabName, tab.content);
		if (V.useSlaveSummaryTabs === 0) {
			div.classList.add("noFade");
		} else if (V.useSlaveSummaryTabs === 2) {
			div.classList.add("card");
		}
		fragment.append(div);
	}

	if (V.positionMainLinks <= 0) {
		fragment.append(App.UI.DOM.makeElement("div", App.UI.View.mainLinks(), "center"));
	}

	App.UI.tabbar.handlePreSelectedTab();
	return fragment;
};

/**
 * @callback assignmentFilterGenerateCallback
 * @param {string} value
 * @returns {string}
 */

/**
 * @callback slaveFilterCallbackReasoned
 * @param {App.Entity.SlaveState} slave
 * @returns {string[]}
 */

/**
 * @callback slaveFilterCallbackSimple
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */

App.UI.SlaveList.slaveSelectionList = function() {
	const selectionElementId = "slaveSelectionList";

	return selection;

	/**
	 * @typedef ListOptions
	 * @property {slaveFilterCallbackReasoned|slaveFilterCallbackSimple} filter
	 * @property {slaveTestCallback} [expCheck]
	 * @property {slaveToElement} interactionLink
	 * @property {slaveToElement} [postNote]
	 */

	/**
	 * @param {slaveFilterCallbackReasoned|slaveFilterCallbackSimple} filter
	 * @param {slaveToElement} interactionLink
	 * @param {slaveTestCallback} [experianceChecker]
	 * @param {slaveToElement} [postNote]
	 * @returns {string}
	 */
	function selection(filter, interactionLink, experianceChecker, postNote) {
		if (experianceChecker === null) { experianceChecker = undefined; }
		State.temporary.slaveSelection = {
			filter: filter,
			expCheck: experianceChecker,
			interactionLink: interactionLink,
			postNote: postNote,
			update: _updateList
		};

		$(document).one(':passagedisplay', () => { _updateList('all'); });
		return `<div>${_assignmentFilter(s => `<<run _slaveSelection.update('${s}')>>`, experianceChecker !== undefined)} <div id=${selectionElementId}></div></div>`;
	}

	function _updateList(assignment) {
		const e = document.getElementById(selectionElementId);
		e.innerHTML = '';
		e.appendChild(_listSlaves(assignment, State.temporary.slaveSelection));
	}
	/**
	 * Displays assignment filter links, whose action are generated by the callback
	 * @param {assignmentFilterGenerateCallback} callback
	 * @param {boolean} includeExperienced
	 * @returns {string}
	 */
	function _assignmentFilter(callback, includeExperienced) {
		let filters = {
			all: "All"
		};
		let fNames = Object.keys(App.Entity.facilities);
		fNames.sort();
		for (const fn of fNames) {
			/** @type {App.Entity.Facilities.Facility} */
			const f = App.Entity.facilities[fn];
			if (f.established && f.hostedSlaves > 0) {
				filters[fn] = f.name;
			}
		}
		let links = [];
		/* seems like SC2 does not process data-setter when data-passage is not set
		for (const f in filters) {
			links.push(App.UI.passageLink(filters[f], passage, callback(f)));
		}
		if (includeExperienced) {
			links.push(`<span class="lime">${App.UI.passageLink('Experienced', passage, callback('experienced'))}</span>`);
		}*/
		for (const f in filters) {
			links.push(`<<link "${filters[f]}">>${callback(f)}<</link>>`);
		}
		if (includeExperienced) {
			links.push(`<span class="lime"><<link "Experienced">>${callback('experienced')}<</link>></span>`);
		}

		return links.join('&thinsp;|&thinsp;');
	}

	/**
	 *
	 * @param {string} assignmentStr
	 * @param {ListOptions} options
	 * @returns {DocumentFragment}
	 */
	function _listSlaves(assignmentStr, options) {
		/** @type {App.Entity.SlaveState[]} */
		const slaves = State.variables.slaves;
		let unfilteredIndices = [];
		switch (assignmentStr) {
			case 'all':
				unfilteredIndices = Array.from({length: slaves.length}, (v, i) => i);
				break;
			case 'experienced':
				unfilteredIndices = slaves.reduce((acc, s, idx) => {
					if (options.expCheck(s)) {
						acc.push(idx);
					}
					return acc;
				}, []);
				break;
			default:
				unfilteredIndices = App.Entity.facilities[assignmentStr].employeesIndices();
				break;
		}
		SlaveSort.indices(unfilteredIndices);
		let passingIndices = [];
		let rejects = [];

		unfilteredIndices.forEach(idx => {
			const fr = options.filter(slaves[idx]);
			if (fr === true || (Array.isArray(fr) && fr.length === 0)) {
				passingIndices.push(idx);
			} else {
				if (Array.isArray(fr)) { rejects.push({index: idx, rejects: fr}); }
			}
		});

		// clamsi fragment to create a function which combines results of two optional tests
		// done this way to test for tests presence only once
		const listPostNote = options.expCheck ?
			(options.postNote ?
				(s, i) => options.expCheck(s) ? App.UI.DOM.combineNodes(
					App.UI.DOM.makeElement("span", "Has applicable career experience.", "lime"),
					document.createElement("br"),
					options.postNote(s, i)
				) : options.postNote(s, i) :
				(s) => options.expCheck(s) ? App.UI.DOM.makeElement("span", "Has applicable career experience.", "lime") : null) :
			options.postNote ?
				(s, i) => options.postNote(s, i) :
				() => null;

		return App.UI.SlaveList.render.listDOM(passingIndices, rejects, options.interactionLink, listPostNote);
	}
}();

/**
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} passage go here after the new facility manager is selected
 * @returns {string}
 */
App.UI.SlaveList.facilityManagerSelection = function(facility, passage) {
	return this.slaveSelectionList(slave => facility.manager.canEmploy(slave),
		(slave) => App.UI.DOM.passageLink(SlaveFullName(slave), passage,
			() => { assignJob(slave, facility.manager.desc.assignment); }),
		slave => facility.manager.slaveHasExperience(slave));
};
