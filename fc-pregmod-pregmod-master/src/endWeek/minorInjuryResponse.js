/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.minorInjuryResponse = function minorInjuryResponse(slave) {
	const arcology = State.variables.arcologies[0];
	const arcologyUpgrade = State.variables.arcologyUpgrade;
	const {he, himself, He} = getPronouns(slave);
	let r = "";

	if (arcology.FSDegradationist > 20) {
		r += ` ${He} carries on, knowing that in your degradationist arcology, this is accepted behavior.`;
	} else if (arcology.FSPaternalist > 20) {
		if (arcologyUpgrade.drones === 1 && jsRandom(1, 100) > 50) {
			r += ` The security drones successfully detain him and oblige him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
			cashX(50, "slaveUpkeep", slave);
		} else if (arcologyUpgrade.grid === 1 && jsRandom(1, 100) > 50) {
			r += ` The computer systems successfully detain him and require him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
			cashX(50, "slaveUpkeep", slave);
		} else if (slave.skill.whoring > jsRandom(1, 100)) {
			r += ` ${slave.slaveName} is used to this sort of thing, and convinces him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
			cashX(50, "slaveUpkeep", slave);
		} else if (slave.skill.combat > 0) {
			r += ` ${slave.slaveName} can take care of ${himself}, and ${he} successfully forces him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
			cashX(50, "slaveUpkeep", slave);
		}
	} else {
		if (arcologyUpgrade.drones === 1 && jsRandom(1, 100) > 50) {
			r += ` The security drones successfully detain him and oblige him to pay minor <span class="yellowgreen">compensation.</span>`;
			cashX(10, "slaveUpkeep", slave);
		} else if (arcologyUpgrade.grid === 1 && jsRandom(1, 100) > 50) {
			r += ` The computer systems successfully detain him and require him to pay minor <span class="yellowgreen">compensation.</span>`;
			cashX(10, "slaveUpkeep", slave);
		} else if (slave.skill.whoring > jsRandom(1, 100)) {
			r += ` ${slave.slaveName} is used to this sort of thing, and convinces him to pay minor <span class="yellowgreen">compensation.</span>`;
			cashX(10, "slaveUpkeep", slave);
		} else if (slave.skill.combat > 0) {
			r += ` ${slave.slaveName} can take care of ${himself}, and ${he} successfully forces him to pay minor <span class="yellowgreen">compensation.</span>`;
			cashX(10, "slaveUpkeep", slave);
		}
	}

	return r;
};
