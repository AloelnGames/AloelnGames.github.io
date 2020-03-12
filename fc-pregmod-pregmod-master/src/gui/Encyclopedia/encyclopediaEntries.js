/* TODO: add entries for Nursery */

App.Encyclopedia.Entries = (function() {
	/**
	 * @param {string} topic
	 * @returns {HTMLElement}
	 */
	function topic(topic) {
		return App.UI.DOM.makeElement("span", topic, ["encyclopedia", "topic"]);
	}

	/**
	 * @param {string} linkText
	 * @param {string} topic
	 * @returns {HTMLElement}
	 */
	function encyLink(linkText, topic) {
		return App.UI.DOM.passageLink(linkText, "Encyclopedia", () => {
			V.encyclopedia = topic;
			if (passage() !== "Encyclopedia") {
				V.nextButton = "Back";
				V.nextLink = "Main";
			}
		});
	}

	const entries = {};

	entries.attendingClasses = () =>
		App.UI.DOM.combineNodes(topic("Attending classes"),
			" is an assignment which educates the slave, raising intelligence if possible. Being educated raises value and is useful for some jobs and leadership positions.");

	entries.confinement = () =>
		App.UI.DOM.combineNodes(topic("Confinement"),
			" is an assignment which accelerates breaking for disobedient slaves. If a slave isn't obedient enough to work and isn't ",
			encyLink("unhealthy", "Health"), " enough to need rest, this will make them useful sooner.");

	entries.fucktoy = () =>
		App.UI.DOM.combineNodes(topic("Fucktoy service"),
			" is an assignment which keeps the slave close and under the player's eye. It's mostly just for fun, but fucktoys can improve reputation based on their beauty, and the player character's attention can be targeted to areas of the slave's body with possible fetish effects on happy slaves.");

	entries.gloryHole = () =>
		App.UI.DOM.combineNodes(topic("Occupying a glory hole"),
			" is an assignment which makes money off of slaves regardless of their beauty, skills, or feelings; it's not fun or ",
			encyLink("healthy", "Health"), " but very powerful for extracting ¤ out of otherwise useless slaves.");

	entries.milking = () => {
		const fragment = document.createDocumentFragment();

		fragment.append(topic("Getting milked"),
			" is an assignment which makes money from lactation based on a slave's breasts, ", encyLink("health", "Health"),
			" and hormonal status.");
		if (V.seeDicks > 0) {
			fragment.append(" Cows with balls will also give semen.");
		}
		fragment.append(` Creates profit quickly from slaves with big tits${V.seeDicks ? " or balls" : ""}.`);

		return fragment;
	};

	entries.farming = function() {
		const fragment = document.createDocumentFragment();
		fragment.append(topic("Farming"), " is an assignment which produces ", encyLink("food", "Food"),
			" from your slaves' hard work");
		if (V.seeBestiality === 1) {
			fragment.append(" and allows you to breed slaves with animals");
		}
		fragment.append(". Can also reduce arcology upkeep with upgrades in the ",
			encyLink("Farmyard", "Farmyard"));
		return fragment;
	};

	entries.publicService = () =>
		App.UI.DOM.combineNodes(topic("Public Service"),
			" is an assignment which increases reputation based on a slave's beauty, sexual appeal, and skills. Very similar to whoring, but for reputation rather than money.");

	entries.rest = () =>
		App.UI.DOM.combineNodes(topic("Rest"), " is an assignment mostly used to improve ", encyLink("health", "Health"),
			". It can be useful to order slaves you wish to intensively modify to rest, since most modifications damage health. It will synergize with curative treatments, providing bonus healing when both are simultaneously applied.");


	entries.sexualServitude = () =>
		App.UI.DOM.combineNodes(topic("Sexual servitude"),
			" is an assignment which pleases other slaves by forcing the slave to service them sexually. Useful for driving the targeted slave's ",
			encyLink("devotion", "Devotion"), "up quickly.");

	entries.servitude = () =>
		App.UI.DOM.combineNodes(topic("Servitude"), " is an assignment which reduces your upkeep based on the slave's ",
			encyLink("devotion", "Devotion"),
			" Available at lower obedience than other jobs, is insensitive to the quality of a slave's body, and doesn't require skills; a good transitional assignment. Unusually, low sex drive is advantageous as a servant, since it reduces distraction. Lactating slaves are slightly better at this job, since they can contribute to their fellow slaves' nutrition.");

	entries.whoring = () =>
		App.UI.DOM.combineNodes(topic("Whoring"), " is an assignment which makes money based on a slave's beauty, sexual appeal, and skills. Good whores take a long time to train and beautify but become very profitable.");

	return entries;
})();
