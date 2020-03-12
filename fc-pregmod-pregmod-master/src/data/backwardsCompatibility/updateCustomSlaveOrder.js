/** Update custom slave orders (customSlave/huskSlave).
 * @param {App.Entity.CustomSlaveOrder} customSlaveOrder
 */
App.Update.CustomSlaveOrder = function(customSlaveOrder) {
	if (!customSlaveOrder.hasOwnProperty("leg")) {
		if (jsDef(customSlaveOrder.amp) && customSlaveOrder.amp === 1) {
			customSlaveOrder.leg = {left: null, right: null};
		} else {
			customSlaveOrder.leg = {left: new App.Entity.LimbState(), right: new App.Entity.LimbState()};
		}
	}

	if (!customSlaveOrder.hasOwnProperty("arm")) {
		if (jsDef(customSlaveOrder.amp) && customSlaveOrder.amp === 1) {
			customSlaveOrder.arm = {left: null, right: null};
		} else {
			customSlaveOrder.arm = {left: new App.Entity.LimbState(), right: new App.Entity.LimbState()};
		}
	}

	if (customSlaveOrder.hasOwnProperty("amp")) {
		delete customSlaveOrder.amp;
	}

	if (!customSlaveOrder.hasOwnProperty("skill")) {
		customSlaveOrder.skill = {whore: 15, combat: 0};
	}

	if (customSlaveOrder.hasOwnProperty("whoreSkills")) {
		customSlaveOrder.skill.whore = customSlaveOrder.whoreSkills;
		delete customSlaveOrder.whoreSkills;
	}

	if (customSlaveOrder.hasOwnProperty("combatSkills")) {
		customSlaveOrder.skill.combat = customSlaveOrder.combatSkills;
		delete customSlaveOrder.combatSkills;
	}

	if (V.releaseID < 1059) {
		customSlaveOrder.eye = new App.Entity.EyeState();
		delete customSlaveOrder.eyes;
	}
};
