/**
 * @param {string|Node} message
 * @param {number} week
 * @param {string} [category]
 */
App.Reminders.add = function(message, week, category = "manual") {
	if (message === "" || message === null) {
		return;
	}
	const entry = {message: message, week: week, category: category};

	// V.reminders is sorted by week from low to high, we insert at the correct place so it remains sorted.
	const index = V.reminders.findIndex(e => e.week >= week);
	if (index === -1) {
		V.reminders.push(entry);
	} else {
		V.reminders.splice(index, 0, entry);
	}
};

/**
 * @param {number} [maxFuture] how far into the future should reminders be displayed.
 * @param {string} [category]
 * @param {boolean} [link] show link to managePersonalAffairs.tw
 * @returns {HTMLSpanElement}
 */
App.Reminders.list = function list({maxFuture = Number.POSITIVE_INFINITY, category = "all", link = false} = {}) {
	if (V.reminders.length === 0) {
		return document.createDocumentFragment();
	}

	/**
	 * @param {string} c
	 * @returns {boolean}
	 */
	const includedCategory = category === "all" ? () => true : c => c === category;

	const replace = () => App.UI.DOM.replace("#reminderList", list({
		maxFuture: maxFuture,
		category: category,
		link: link
	}));

	/**
	 * @param {{}} entry
	 */
	function clearEntry(entry) {
		V.reminders.splice(V.reminders.indexOf(entry), 1);
		replace();
	}

	// We only want to remove visible entries
	function clearOverdue() {
		V.reminders = V.reminders.filter(e => e.week >= V.week || e.week > V.week + maxFuture || !includedCategory(e.category));
		replace();
	}

	function clearAll() {
		V.reminders = V.reminders.filter(e => e.week > V.week + maxFuture || !includedCategory(e.category));
		replace();
	}

	let outerSpan = document.createElement("span");
	outerSpan.id = "reminderList";

	let overdue = 0, any = false;

	V.reminders.filter(e => e.week <= V.week + maxFuture && includedCategory(e.category))
		.forEach(entry => {
			any = true;
			let week;
			let classes = []; // has to be an array, because makeElement takes no empty strings, but empty arrays.
			if (entry.week < V.week) {
				classes = ["red"];
				week = `${numberWithPluralOne(-(entry.week - V.week), 'week')} ago`;
				overdue++;
			} else if (entry.week === V.week) {
				classes = ["orange"];
				week = "today";
			} else {
				if (entry.week <= V.week + 5) {
					classes = ["green"];
				}
				week = `in ${numberWithPluralOne(entry.week - V.week, 'week')}`;
			}
			const div = document.createElement("div");
			div.append(entry.message,
				" ", App.UI.DOM.makeElement("span", week.toString(), classes),
				" ", App.UI.DOM.link("Clear", clearEntry, [entry]));
			outerSpan.append(div);
		});

	if (overdue > 0) {
		outerSpan.append(App.UI.DOM.makeElement("div", App.UI.DOM.link("Clear Overdue", clearOverdue)));
	}
	if (any) {
		outerSpan.append(App.UI.DOM.makeElement("div", App.UI.DOM.link("Clear all", clearAll)));
		if (link) {
			outerSpan.append(App.UI.DOM.makeElement("div", App.UI.DOM.passageLink("Manage Reminders", "Manage Personal Affairs",)));
		}
	}

	return outerSpan;
};

/**
 * @returns {HTMLDivElement}
 */
App.Reminders.addField = function() {
	const div = document.createElement("div");

	let entry = "";
	let week = 0;

	div.append(App.UI.DOM.makeTextBox("", v => { entry = v; }),
		" in ", App.UI.DOM.makeTextBox(0, v => { week = v; }, true), " weeks.",
		" ", App.UI.DOM.passageLink("Add", passage(), () => { App.Reminders.add(entry, V.week + week); }));

	return div;
};

/**
 * @returns {DocumentFragment}
 */
App.Reminders.fullDisplay = function() {
	let fragment = document.createDocumentFragment();

	fragment.append(App.UI.DOM.makeElement("h2", "Reminders"));

	let list = App.Reminders.list();
	if (list !== null) {
		fragment.append(App.UI.DOM.makeElement("p", list, "indent"));
	}

	fragment.append(App.UI.DOM.makeElement("h3", "Add new"));
	fragment.append(App.UI.DOM.makeElement("p", App.Reminders.addField()));

	return fragment;
};
