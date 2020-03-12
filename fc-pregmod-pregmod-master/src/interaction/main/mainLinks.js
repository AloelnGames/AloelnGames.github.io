/**
 * @returns {DocumentFragment}
 */
App.UI.View.mainLinks = function() {
	"use strict";
	const PA = Array.isArray(V.personalAttention) ? V.personalAttention.map(x => getSlave(x.ID)) : [];
	let fragment = document.createDocumentFragment();

	if (V.PC.health.shortDamage >= 30) {
		fragment.append(`The injuries received in the recent battle prevent you from undertaking tiring efforts.`);
	} else {
		switch (V.personalAttention) {
			case "business":
				fragment.append(`You plan to focus on business this week.`);
				break;
			case "whoring":
				fragment.append(`You plan to focus on earning extra money this week.`);
				break;
			case "upkeep":
				fragment.append(`You plan to focus on cleaning the penthouse this week.`);
				break;
			case "defensive survey":
				fragment.append(`You plan to survey ${V.arcologies[0].name}'s defenses in person this week.`);
				break;
			case "development project":
				fragment.append(`You plan on contributing to a local development project this week.`);
				break;
			case "smuggling":
				fragment.append(`You plan to make some easy (but dirty) money this week.`);
				break;
			case "HG":
				fragment.append(`You plan to support your Head Girl this week, `);
				if (V.HeadGirl) {
					const {he, his} = getPronouns(V.HeadGirl);
					fragment.append(`so ${he} can give more slaves ${his} attention.`);
				} else {
					fragment.append(`should you assign one.`);
				}
				break;
			case "sex":
				fragment.append(`You plan to have as much sex with your slaves as possible this week.`);
				break;
			case "trading":
				fragment.append(`This week you will learn trading.`);
				break;
			case "warfare":
				fragment.append(`This week you will learn modern combat tactics.`);
				break;
			case "slaving":
				fragment.append(`This week you will learn slaving.`);
				break;
			case "engineering":
				fragment.append(`This week you will learn engineering.`);
				break;
			case "medicine":
				fragment.append(`This week you will learn medicine.`);
				break;
			case "hacking":
				fragment.append(`This week you will learn hacking.`);
				break;
			case "proclamation":
				fragment.append(`This week you plan to issue a proclamation about ${V.SecExp.proclamation.type}.`);
				break;
			case "technical accidents":
				fragment.append(`This week you plan to sell your technical skills to the highest bidder.`);
				break;
			default:
				if (PA.length > 0) {
					fragment.append(`You plan to train `);

					const trainees = [];
					PA.forEach((trainee, i) => {
							trainees.push(App.UI.DOM.combineNodes(App.UI.DOM.makeElement("span", SlaveFullName(trainee), "slave-name"),
								` to ${V.personalAttention[i].trainingRegimen}`));
						}
					);
					fragment.append(App.UI.DOM.arrayToList(trainees));

					fragment.append(` this week.`);
				}
				break;
		}
	}

	if (V.PC.health.shortDamage < 30) {
		const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Change plans", "Personal Attention Select"), "major-link");
		link.id = "managePA";
		fragment.append(" ", link, " ", App.UI.DOM.makeElement("span", "[A]", "hotkey"));
	}

	if (V.useSlaveSummaryOverviewTab === 0) {
		let div = document.createElement("div");
		if (typeof V.slaveIndices[V.HeadGirl.ID] !== 'undefined') {
			div.append(App.UI.DOM.makeElement("span", SlaveFullName(V.HeadGirl), "slave-name"), " is serving as your Head Girl");
			if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
				div.append(` and Consort`);
			}
			div.append(". ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Head Girl", "HG Select"), "major-link"),
				" ", App.UI.DOM.makeElement("span", "[H]", "hotkey"));
			div.id = "manageHG";
		} else if (V.slaves.length > 1) {
			div.append(`You have not selected a Head Girl`);
			if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
				div.append(` and Consort`);
			}
			div.append(". ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select One", "HG Select"), "major-link"),
				" ", App.UI.DOM.makeElement("span", "[H]", "hotkey"));
			div.id = "manageHG";
		} else {
			div.append(App.UI.DOM.makeElement("span", "You do not have enough slaves to keep a Head Girl", "note"));
		}
		fragment.append(div);

		div = document.createElement("div");
		if (typeof V.slaveIndices[V.Recruiter.ID] !== 'undefined') {
			div.append(App.UI.DOM.makeElement("span", SlaveFullName(V.Recruiter), "slave-name"), " is working to recruit girls. ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Recruiter", "Recruiter Select"), "major-link"));
		} else {
			div.append("You have not selected a Recruiter. ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "Recruiter Select"), "major-link"));
		}
		div.append(" ", App.UI.DOM.makeElement("span", "[U]", "hotkey"));
		div.id = "manageRecruiter";
		fragment.append(div);

		if (V.dojo) {
			div = document.createElement("div");
			if (typeof V.slaveIndices[V.Bodyguard.ID] !== 'undefined') {
				div.append(App.UI.DOM.makeElement("span", SlaveFullName(V.Bodyguard), "slave-name"), " is serving as your bodyguard. ",
					App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Bodyguard", "BG Select"), "major-link"));
			} else {
				div.append("You have not selected a Bodyguard. ",
					App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "BG Select"), "major-link"));
			}
			div.append(" ", App.UI.DOM.makeElement("span", "[B]", "hotkey"));
			div.id = "manageBG";
			fragment.append(div);
		}
	}

	if (V.completedOrgans.length > 0) {
		/* first remove any organs with no corresponding slave */
		V.completedOrgans = V.completedOrgans.filter(organ => {
			return (typeof organ === 'object' && getSlave(organ.ID) !== undefined);
		});
		/* cycle through slaves, for each slave cycle through completed organs and track how many are of the interrogated slave (and if organs have a slaves to be implanted on) */
		for (let i = 0; i < V.slaves.length; i++) {
			const slaveOrgans = V.completedOrgans.reduce((acc, organ) => organ.ID === V.slaves[i].ID ? acc + 1 : acc, 0);
			/* if the interrogated slave has one or more organs ready: */
			if (slaveOrgans > 0) {
				const div = document.createElement("div");
				div.classList.add("yellow");
				div.append("The fabricator has completed ");
				if (slaveOrgans > 1) {
					div.append(`${slaveOrgans} organs`);
				} else {
					div.append('an organ');
				}
				div.append(" for ",
					App.UI.DOM.makeElement("span", App.UI.DOM.link(V.slaves[i].slaveName, () => { V.activeSlave = V.slaves[i], V.tabChoice.RemoteSurgery = "Structural"; }, [], "Remote Surgery"), "clear-formatting"),
					" which ");
				if (slaveOrgans > 1) {
					div.append('are');
				} else {
					div.append('is');
				}
				div.append(' ready to be implanted.');
				fragment.append(div);
			}
		}
	}

	if (V.adjustProstheticsCompleted > 0) {
		for (let j = 0; j < V.adjustProsthetics.length; j++) {
			if (getSlave(V.adjustProsthetics[j].slaveID) !== undefined) {
				const i = V.slaveIndices[V.adjustProsthetics[j].slaveID];
				if (V.adjustProsthetics[j].workLeft <= 0) {
					const div = document.createElement("div");
					div.classList.add("yellow");
					div.append(`The lab has completed ${addA(setup.prosthetics[V.adjustProsthetics[j].id].name)} for `,
						App.UI.DOM.makeElement("span", App.UI.DOM.link(SlaveFullName(V.slaves[i]), () => { V.activeSlave = V.slaves[i]; }, [], "Slave Interact"), "clear-formatting"),
						" which is ready to be attached.");
					fragment.append(div);
				}
			} else {
				V.adjustProsthetics.splice(j, 1);
				j--;
			}
		}
	}

	if (V.completedOrgans.length > 0 && V.adjustProstheticsCompleted > 0) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.passageLink("Implant and Attach", "Multiple Organ Implant"),
			App.UI.DOM.makeElement("span", " all organs and prosthetics that are ready.", "yellow"));
		fragment.append(div);
	} else if (V.completedOrgans.length > 1) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.passageLink("Implant", "Multiple Organ Implant"),
			App.UI.DOM.makeElement("span", " all organs that are ready for implantation.", "yellow"));
		fragment.append(div);
	} else if (V.adjustProstheticsCompleted > 1) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.passageLink("Attach", "Multiple Organ Implant"),
			App.UI.DOM.makeElement("span", " all prosthetics that are ready to be attached.", "yellow"));
		fragment.append(div);
	}

	const div = document.createElement("div");
	if (V.slaveCostFactor === 1) {
		div.append("The slave market is stable; the price of slaves is average.");
	} else {
		let r;
		if (V.slaveCostFactor > 1) {
			if (V.slaveCostFactor > 1.05) {
				r = "There is a bull market for slaves; the price of slaves is very high.";
			} else {
				r = "The slave market is bullish; the price of slaves is high.";
			}
		} else {
			if (V.slaveCostFactor < 0.95) {
				r = "There is a bear market for slaves; the price of slaves is very low.";
			} else {
				r = "The slave market is bearish; the price of slaves is low.";
			}
		}
		div.append(App.UI.DOM.makeElement("span", r, "yellow"));
	}

	const buySlaves = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Buy Slaves", "Buy Slaves"), "major-link");
	buySlaves.id = "buySlaves";
	div.append(" ", buySlaves, " ", App.UI.DOM.makeElement("span", "[S]", "hotkey"));

	fragment.append(div);

	/**
	 * @param {string} school
	 */
	function schoolSale(school) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.makeElement("span", "For your first purchase, ", "yellow"),
			App.UI.DOM.passageLink(school, school, () => { V.slavesSeen += 1; }),
			App.UI.DOM.makeElement("span", " will sell at half price this week.", "yellow"));
		fragment.append(div);
	}

	if (V.seeDicks !== 100) {
		if (V.TSS.schoolSale !== 0) {
			schoolSale("The Slavegirl School");
		}
		if (V.GRI.schoolSale !== 0) {
			schoolSale("Growth Research Institute");
		}
		if (V.SCP.schoolSale !== 0) {
			schoolSale("St. Claver Preparatory");
		}
		if (V.TCR.schoolSale !== 0) {
			schoolSale("The Cattle Ranch");
		}
		if (V.HA.schoolSale !== 0) {
			schoolSale("The Hippolyta Academy");
		}
	}
	if (V.seeDicks !== 0) {
		if (V.LDE.schoolSale !== 0) {
			schoolSale("L'École des Enculées");
		}
		if (V.TGA.schoolSale !== 0) {
			schoolSale("The Gymnasium-Academy");
		}
		if (V.TFS.schoolSale !== 0) {
			schoolSale("The Futanari Sisters");
		}
	}
	if (V.NUL.schoolSale !== 0) {
		schoolSale("Nueva Universidad de Libertad");
	}
	return fragment;
};
