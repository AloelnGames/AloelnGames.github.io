/* limb checker */

/**
 * True if slave has no limbs, neither natural nor prosthetic
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.isAmputee = function(slave) {
	return !(slave.leg.right || slave.leg.left || slave.arm.right || slave.arm.left);
};

/**
 * True if slave has at least one natural limb
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyNaturalLimbs = function(slave) {
	return getLeftArmID(slave) === 1 || getRightArmID(slave) === 1 || getLeftLegID(slave) === 1 || getRightLegID(slave) === 1;
};

/**
 * True if slave has at least one prosthetic limb
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyProstheticLimbs = function(slave) {
	return getLeftArmID(slave) > 1 || getRightArmID(slave) > 1 || getLeftLegID(slave) > 1 || getRightLegID(slave) > 1;
};

/**
 * True if slave has at least one leg
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyLegs = function(slave) {
	return !!slave.leg.right || !!slave.leg.left;
};

/**
 * True if slave has at least one arm
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyArms = function(slave) {
	return !!slave.arm.right || !!slave.arm.left;
};

/**
 * True if slave has at least one leg that is natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyNaturalLegs = function(slave) {
	return getLeftLegID(slave) === 1 || getRightLegID(slave) === 1;
};

/**
 * True if slave has at least one arm that is natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyNaturalArms = function(slave) {
	return getLeftArmID(slave) === 1 || getRightArmID(slave) === 1;
};

/**
 * True if slave has at least one leg that is prosthetic
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyProstheticLegs = function(slave) {
	return getLeftLegID(slave) > 1 || getRightLegID(slave) > 1;
};

/**
 * True if slave has at least one arm that is prosthetic
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyProstheticArms = function(slave) {
	return getLeftArmID(slave) > 1 || getRightArmID(slave) > 1;
};

/**
 * True if slave has both legs
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothLegs = function(slave) {
	return !!slave.leg.right && !!slave.leg.left;
};

/**
 * True if slave has both arms
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothArms = function(slave) {
	return !!slave.arm.right && !!slave.arm.left;
};

/**
 * True if slave has both legs and they are natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothNaturalLegs = function(slave) {
	return getLeftLegID(slave) === 1 && getRightLegID(slave) === 1;
};

/**
 * True if slave has both arms and they are natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothNaturalArms = function(slave) {
	return getLeftArmID(slave) === 1 && getRightArmID(slave) === 1;
};

/**
 * True if slave has both arms and they are artificial
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothProstheticArms = function(slave) {
	return getLeftArmID(slave) > 1 && getRightArmID(slave) > 1;
};

/**
 * True if slave has both legs and they are artificial
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothProstheticLegs = function(slave) {
	return getLeftLegID(slave) > 1 && getRightLegID(slave) > 1;
};

/**
 * True if slave has all limbs
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAllLimbs = function(slave) {
	return hasBothLegs(slave) && hasBothArms(slave);
};

/**
 * True if slave has all limbs and all are natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAllNaturalLimbs = function(slave) {
	return hasBothNaturalLegs(slave) && hasBothNaturalArms(slave);
};

/**
 * True if slave has left arm
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasLeftArm = function(slave) {
	return !!slave.arm.left;
};

/**
 * True if slave has right arm
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasRightArm = function(slave) {
	return !!slave.arm.right;
};

/**
 * True if slave has left leg
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasLeftLeg = function(slave) {
	return !!slave.leg.left;
};

/**
 * True if slave has right leg
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasRightLeg = function(slave) {
	return !!slave.leg.right;
};

/**
 * Returns limb ID of the left arm. Uses new IDs.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getLeftArmID = function(slave) {
	if (hasLeftArm(slave)) {
		return slave.arm.left.type;
	} else {
		return 0;
	}
};

/**
 * Returns limb ID of the right arm. Uses new IDs.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getRightArmID = function(slave) {
	if (hasRightArm(slave)) {
		return slave.arm.right.type;
	} else {
		return 0;
	}
};

/**
 * Returns limb ID of the left leg. Uses new IDs.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getLeftLegID = function(slave) {
	if (hasLeftLeg(slave)) {
		return slave.leg.left.type;
	} else {
		return 0;
	}
};

/**
 * Returns limb ID of the right leg. Uses new IDs.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getRightLegID = function(slave) {
	if (hasRightLeg(slave)) {
		return slave.leg.right.type;
	} else {
		return 0;
	}
};

/**
 * Returns a very short description of the specified limb ID. Uses new limb IDs.
 *
 * @param {number} id
 * @returns {string}
 */
window.idToDescription = function(id) {
	switch (id) {
		case 0:
			return "amputated";
		case 1:
			return "healthy";
		case 2:
			return "modern prosthetic";
		case 3:
			return "advanced, sex-focused prosthetic";
		case 4:
			return "advanced, beauty-focused prosthetic";
		case 5:
			return "advanced, combat-focused prosthetic";
		case 6:
			return "highly advanced cybernetic";
		default:
			return "unknown id: " + id;
	}
};

/**
 * Returns count of specified limb type. Uses new limb IDs:
 * 0: no limb
 * 1: natural
 * 2: basic
 * 3: sex
 * 4: beauty
 * 5: combat
 * 6: cybernetic
 *
 * Can also be used to check for groups:
 * 101: any limbs, that are not amputated
 * 102: prosthetic limbs off all kind
 * 103: sex-prosthetic
 * 104: beauty-prosthetic
 * 105: combat-prosthetic
 *
 * 103-105 mean the sum of 3-5 and 6 respectfully.
 *
 * No ID means all limbs = 101
 *
 * @param {App.Entity.SlaveState} slave
 * @param {number} [id]
 * @returns {number}
 */
window.getLimbCount = function(slave, id = 101) {
	if (id < 100) {
		let n = 0;
		if (getLeftArmID(slave) === id) {
			n++;
		}
		if (getRightArmID(slave) === id) {
			n++;
		}
		if (getLeftLegID(slave) === id) {
			n++;
		}
		if (getRightLegID(slave) === id) {
			n++;
		}
		return n;
	}
	switch (id) {
		case 101:
			return getLimbCount(slave, 1) + getLimbCount(slave, 102);
		case 102:
			return getLimbCount(slave, 2) + getLimbCount(slave, 3) + getLimbCount(slave, 4) + getLimbCount(slave, 5) + getLimbCount(slave, 6);
		case 103:
			return getLimbCount(slave, 3) + getLimbCount(slave, 6);
		case 104:
			return getLimbCount(slave, 4) + getLimbCount(slave, 6);
		case 105:
			return getLimbCount(slave, 5) + getLimbCount(slave, 6);
	}
	// unknown id defaults to 0
	return 0;
};

/**
 * Returns count of specified leg type. Uses new limb IDs.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {number} id
 * @returns {number}
 */
window.getLegCount = function(slave, id) {
	let n = 0;

	if (getLeftLegID(slave) === id) {
		n++;
	}
	if (getRightLegID(slave) === id) {
		n++;
	}

	return n;
};

/**
 * Returns count of specified arm type. Uses new limb IDs.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {number} id
 * @returns {number}
 */
window.getArmCount = function(slave, id) {
	let n = 0;

	if (getLeftArmID(slave) === id) {
		n++;
	}
	if (getRightArmID(slave) === id) {
		n++;
	}

	return n;
};

/**
 * Returns a string depending on the limbs a slave has.
 * By default a variation of "arms and legs", but this can be changed via parameters.
 * Expects the slave to at least have one limb.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} [arms]
 * @param {string} [arm]
 * @param {string} [legs]
 * @param {string} [leg]
 */
window.armsAndLegs = function(slave, arms = "arms", arm = "arm", legs = "legs", leg = "leg") {
	let r = "";
	if (hasAnyArms(slave)) {
		if (hasBothArms(slave)) {
			r += arms;
		} else {
			r += arm;
		}
		if (hasAnyLegs(slave)) {
			r += " and ";
		}
	}

	if (hasBothLegs(slave)) {
		r += legs;
	} else if (hasAnyLegs(slave)) {
		r += leg;
	}

	return r;
};
