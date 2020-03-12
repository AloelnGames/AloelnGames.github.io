window.assistant = (function() {
	return {
		BC: BC,
		object: manage,
		pronouns: pronouns,
	};

	function BC() {
		function convert(oldVar, variable, value = null) {
			if (jsDef(V[oldVar])) {
				if (typeof V[oldVar] !== "number" || (typeof V[oldVar] === "number" && V[oldVar] > 0)) {
					V.assistant[variable] = value === null ? V[oldVar] : value;
				}
			}
			delete V[oldVar];
		}

		const object = Object.assign({},
		{
		personality: V.assistant,
		name: V.assistantName,
		power: V.assistantPower,
		appearance: V.assistantAppearance,
		});
		V.assistant = object;
		delete V.assistantName; delete V.assistantPower;
		delete V.assistantAppearance; delete V.assistantPronouns;

		convert('marketAssistantAnnounced', 'market', {});
		convert('assistantExtra1', 'Extra1');
		convert('assistantExtra2', 'Extra2');
		convert('assistantNameAnnounced', 'announcedName');
		convert('assistantBodyDesire', 'bodyDesire');
		convert('assistantOptions', 'options');
		convert('assistantFSOptions', 'fsOptions');
		convert('assistantFSAppearance', 'fsAppearance');

		if (V.assistant.market) {
			Object.assign(V.assistant.market,
			{
			relationship: V.marketAssistantRelationship,
			limit: V.marketAssistantLimit,
			aggressiveness: V.marketAssistantAggressiveness,
			});
		}
		delete V.marketAssistantRelationship; delete V.marketAssistantLimit;
		delete V.marketAssistantAggressiveness; delete V.marketAssistantPronouns;
	}

	function pronouns() {
		let o = {};
		if (V.assistant.personality === 0 || V.assistant.appearance === "normal") {
			o.main = o.market = {pronoun: App.Data.Pronouns.Kind.ai};
		} else {
			if (V.assistant.appearance === "incubus" && V.diversePronouns > 0) {
				o.main = {pronoun: App.Data.Pronouns.Kind.male};
				o.market = {pronoun: App.Data.Pronouns.Kind.female};
			} else if (V.assistantAppearance === "succubus" && V.diversePronouns > 0) {
				o.main = {pronoun: App.Data.Pronouns.Kind.female};
				o.market = {pronoun: App.Data.Pronouns.Kind.male};
			} else {
				o.main = o.market = {pronoun: App.Data.Pronouns.Kind.female};
			}
		}
		return o;
	}

	function manage() {
		V.assistant = V.assistant || {};
		Object.assign(V.assistant,
		{
		personality: V.assistant.personality || 0,
		name: V.assistant.name || "your personal assistant",
		power: V.assistant.power || 0,
		appearance: V.assistant.appearance || "normal",
		});

		if (V.assistant.market) {
			Object.assign(V.assistant.market,
			{
			relationship: V.assistant.market.relationship || "cute",
			limit: V.assistant.market.limit || 0,
			aggressiveness: V.assistant.market.aggressiveness || 0,
			});
		}
		if (V.week < 18) {
			delete V.assistant.options;
		}
	}
})();
