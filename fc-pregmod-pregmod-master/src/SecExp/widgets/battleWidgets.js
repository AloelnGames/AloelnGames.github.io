window.calcSFStatistics = function() {
	let upgradesSum = V.SF.Squad.Armoury + V.SF.Squad.Drugs + (V.SF.Squad.AA+V.SF.Squad.TA < 1) + (V.SF.Squad.AV+V.SF.Squad.TV);
	if (!Number.isInteger(upgradesSum)) {
		upgradesSum = jsRandom(10, 15);
	}

	if (V.slaveRebellion !== 1 || V.citizenRebellion !== 1) {
		/* atk, def */
		V.SFatk = Math.trunc(0.65 * upgradesSum);
		V.SFdef = Math.trunc(0.40 * upgradesSum);
		/* hp */
		V.carriableSoldiers = 125 * (V.SF.Squad.GunS + ((V.SF.Squad.AV + V.SF.Squad.TV)/2));
		if (!Number.isInteger(V.carriableSoldiers)) {
			V.carriableSoldiers = V.SF.Squad.Troops / 10;
		}
		if (V.SF.Squad.Troops > V.carriableSoldiers) {
			V.SFhp = V.carriableSoldiers * V.SFBaseHp;
		} else {
			V.carriableSoldiers = V.SF.Squad.Troops;
			V.SFhp = V.carriableSoldiers * V.SFBaseHp;
		}
	} else {
		/* atk, def */
		V.SFatk = Math.trunc(0.75 * upgradesSum);
		V.SFdef = Math.trunc(0.50 * upgradesSum);
		/* hp */
		V.SFhp = V.SF.Squad.Troops * V.SFBaseHp;
	}
};

/**
 * @param {Array<number>} rebellionIDs Array of unit IDs to be removed.
 */
window.removeUnits = function(rebellionIDs) {
	V.militiaUnits = V.militiaUnits.filter(unit => !rebellionIDs.includes(unit.ID));
	V.slaveUnits = V.slaveUnits.filter(unit => !rebellionIDs.includes(unit.ID));
	V.mercUnits = V.mercUnits.filter(unit => !rebellionIDs.includes(unit.ID));
};
