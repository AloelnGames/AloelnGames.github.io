/**
 * @returns {DocumentFragment}
 */
App.MainView.errors = function() {
	const fragment = document.createDocumentFragment();

	/**
	 * @returns {HTMLParagraphElement}
	 */
	function newError() {
		const error = document.createElement("p");
		fragment.append(error);
		return error;
	}

	// check for correct version
	if (V.releaseID >= 1000 || ["0.9", "0.8", "0.7", "0.6"].includes(V.ver)) {
		if (V.releaseID < App.Version.release) {
			newError().append(App.UI.DOM.makeElement("span", "INCOMPATIBILITY WARNING:", "major-warning"),
				` Your saved game was created using version: ${V.ver}, build: ${V.releaseID}. You must run `,
				App.UI.DOM.passageLink("Backwards Compatibility", "Backwards Compatibility"));
		}
	} else {
		newError().append(App.UI.DOM.makeSpan("INCOMPATIBLE SAVE WARNING:", "major-warning"),
			` Your saved game was created using version: ${V.ver}, and you are using a later version which New Game Plus cannot reconcile. Please start a new game.`);
	}

	// check for correct rules
	if (V.defaultRules.length > 0 && (V.defaultRules[0].condition === undefined || V.defaultRules[0].set === undefined)) {
		const error = newError();
		error.append(App.UI.DOM.makeElement("span", "INCOMPATIBILITY WARNING:", "major-warning"),
			" The rules assistant format has changed. In the Options Menu, please ");
		const ra = document.createElement("strong");
		ra.append("Reset RA Rules");
		error.append(ra);
	}

	// check for NaN
	if (V.NaNArray.length > 0) {
		const error = newError();
		error.id = "NaNArray";
		error.append(App.UI.DOM.makeElement("span", "ERROR: The following variables are NaN! Please report this.", "error"));
		V.NaNArray.forEach(e => {
			const div = document.createElement("div");
			div.append(e);
			error.append(div);
		});
		error.append(App.UI.DOM.link("Hide NaN variables until next week",
			() => {
				error.outerHTML = "";
				V.NaNArray = [];
			})
		);
	}

	// check custom slaves
	if (App.Utils.IsCustomSlaveMutated(V.customSlave)) {
		newError().append(App.UI.DOM.makeElement("span", "ERROR: Your custom slave order has taken on a mutated life of its own and has been summarily shot. Refile your custom slave order, if necessary, and notify the appropriate authorities if you see this message again.", "error"));
		V.customSlave = new App.Entity.CustomSlaveOrder();
	}
	if (App.Utils.IsCustomSlaveMutated(V.huskSlave)) {
		newError().append(App.UI.DOM.makeElement("span", "ERROR: Your husk slave order has taken on a mutated life of its own and has been summarily shot. Refile your husk slave order, if necessary, and notify the appropriate authorities if you see this message again.", "error"));
		V.huskSlave = new App.Entity.CustomSlaveOrder();
	}

	return fragment;
};

/**
 * @returns {Text}
 */
App.MainView.fcnn = function() {
	let text;

	if (V.FCNNstation !== 1 && V.week >= 90) {
		text = "FCNN: FCNN service has been temporarily suspended. Please stand by.";
	} else {
		text = V.fcnn.random();
	}

	return document.createTextNode(`${text} `);
};

App.MainView.useFucktoys = function() {
	const fragment = document.createDocumentFragment();
	for (const slave of V.slaves) {
		if (slave.assignment !== "please you") {
			continue;
		}
		fragment.append(App.MainView.useFucktoy(slave));
	}
	return fragment;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLDivElement}
 */
App.MainView.useFucktoy = function(slave) {
	const fragment = document.createDocumentFragment();

	function setEnvironment() {
		V.activeSlave = slave;
		V.nextButton = "Back";
		V.nextLink = "AS Dump";
		V.returnTo = passage();
	}

	const {him, his} = getPronouns(slave);

	const div = document.createElement("div");
	div.classList.add("note");

	div.append(App.Interact.ToyChest(slave));

	div.append(" In the coming week you plan to concentrate on ");

	if (slave.toyHole !== "all her holes") {
		div.append(`${his} ${slave.toyHole}`);
	} else {
		div.append(`all of ${his} holes equally`);
	}

	if (slave.fuckdoll === 0) {
		div.append(", but for now:");

		const optionDiv = document.createElement("div");
		optionDiv.classList.add("indent");

		optionDiv.append(App.UI.DOM.passageLink(`Use ${his} mouth`, "FLips", setEnvironment),
			" | ", App.UI.DOM.passageLink("Play with " + his + " tits", "FBoobs", setEnvironment));

		if (canDoVaginal(slave)) {
			optionDiv.append(" | ", App.UI.DOM.passageLink(`Fuck ${him}`, "FVagina", setEnvironment));
			if (canDoAnal(slave)) {
				optionDiv.append(" | ", App.UI.DOM.passageLink(`Use ${his} holes`, "FButt", setEnvironment));
			}
		}
		if (canDoAnal(slave)) {
			optionDiv.append(" | ", App.UI.DOM.passageLink(`Fuck ${his} ass`, "FAnus", setEnvironment));
		}
		if (canDoVaginal(slave) || canDoAnal(slave)) {
			if (slave.belly >= 300000) {
				optionDiv.append(" | ", App.UI.DOM.passageLink(`Fuck ${him} over ${his} belly`, "FBellyFuck", setEnvironment));
			}
		}
		if (canPenetrate(slave)) {
			optionDiv.append(" | ", App.UI.DOM.passageLink(`Ride ${him}`, "FDick", setEnvironment));
		}
		optionDiv.append(" | ", App.UI.DOM.passageLink(`Abuse ${him}`, "FAbuse", setEnvironment));

		div.append(optionDiv);
	} else {
		div.append(".");
	}
	fragment.append(div);

	return div;
};

/**
 * @returns {HTMLDivElement}
 */
App.MainView.useGuard = function() {
	const guard = V.slaves[V.slaveIndices[V.Bodyguard.ID]];

	const outerDiv = document.createElement("div");

	if (guard === undefined || guard.assignment !== "guard you") {
		return outerDiv;
	}

	App.UI.DOM.appendNewElement("span", App.Interact.guardPose(guard), outerDiv, "scene-intro");

	function setEnvironment() {
		V.activeSlave = guard;
		V.nextButton = "Back";
		V.nextLink = "AS Dump";
		V.returnTo = passage();
	}

	const {him, his} = getPronouns(guard);
	const optionDiv = document.createElement("div");
	optionDiv.classList.add("indent");

	optionDiv.append(
		App.UI.DOM.passageLink(`Use ${his} mouth`, "FLips", setEnvironment),
		" | ",
		App.UI.DOM.passageLink(`Play with ${his} tits`, "FBoobs", setEnvironment)
	);

	if (canDoVaginal(guard)) {
		optionDiv.append(" | ", App.UI.DOM.passageLink(`Fuck ${him}`, "FVagina", setEnvironment));
		if (canDoAnal(guard)) {
			optionDiv.append(" | ", App.UI.DOM.passageLink(`Use ${his} holes`, "FButt", setEnvironment));
		}
		if (guard.belly >= 300000) {
			optionDiv.append(" | ", App.UI.DOM.passageLink(`Fuck ${him} over ${his} belly`, "FBellyFuck", setEnvironment));
		}
	}

	if (canPenetrate(guard)) {
		optionDiv.append(" | ", App.UI.DOM.passageLink(`Ride ${him}`, "FDick", setEnvironment));
	}
	if (canDoAnal(guard)) {
		optionDiv.append(" | ", App.UI.DOM.passageLink(`Fuck ${his} ass`, "FAnus", setEnvironment));
	}
	optionDiv.append(" | ", App.UI.DOM.passageLink(`Abuse ${him}`, "Gameover", () => { V.gameover = "idiot ball"; }));

	outerDiv.append(optionDiv);

	return outerDiv;
};

App.MainView.full = function() {
	function mainMenu() {
		const div = document.createElement("div");

		div.append(App.UI.DOM.makeElement("span", "MAIN MENU", "name"));
		const span = document.createElement("span");
		span.classList.add("tab", "note");
		span.append(App.UI.DOM.passageLink("Summary Options", "Summary Options"));

		if (V.rulesAssistantMain !== 0) {
			const raLink = document.createElement("span");
			raLink.id = "RAButton";
			raLink.append(" | ", App.UI.DOM.passageLink("Rules Assistant Options", "Rules Assistant"),
				" ", App.UI.DOM.makeElement("span", "[R]", ["clear-formatting", "hotkey"]));
			span.append(raLink);

			if (V.rulesAssistantAuto !== 1) {
				span.append(" | ", App.UI.DOM.passageLink("Apply Rules Assistant at week end", "Main", () => { V.rulesAssistantAuto = 1; }));
			} else {
				span.append(" | ", App.UI.DOM.passageLink("Stop applying Rules Assistant at week end", "Main", () => { V.rulesAssistantAuto = 0; }));
			}
			span.append(" | ");
			if (DefaultRulesError()) {
				span.append(App.UI.DOM.makeElement("span", "WARNING: One or more rules' custom conditions has errors!", "warning"));
			}
			span.append(App.UI.DOM.passageLink("Re-apply Rules Assistant now (this will only check slaves in the Penthouse)", "Main", () => {
				for (const slave of V.slaves) {
					if (assignmentVisible(slave) && slave.useRulesAssistant === 1) {
						DefaultRules(slave);
					}
				}
			}));
		}
		div.append(" ", span);
		return div;
	}

	const fragment = document.createDocumentFragment();

	fragment.append(App.Reminders.list({maxFuture: 5, link: true}));

	if (V.seeFCNN === 1) {
		const div = document.createElement("div");
		div.classList.add("main-fcnn");
		div.append(App.MainView.fcnn(),
			App.UI.DOM.passageLink("Hide", passage(), () => { V.seeFCNN = 0; })
		);
		fragment.append(div);
	}

	fragment.append(mainMenu());

	fragment.append(App.UI.SlaveList.penthousePage());

	if (V.fucktoyInteractionsPosition === 0) {
		fragment.append(App.MainView.useFucktoys());
	}
	if (V.useSlaveSummaryOverviewTab === 0) {
		fragment.append(App.MainView.useGuard());
	}

	return App.UI.DOM.includeDOM(fragment, "mainFullDOM");
};
