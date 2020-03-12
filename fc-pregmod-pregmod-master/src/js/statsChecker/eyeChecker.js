/**
 * True if slave has at least one eye
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyEyes = function(slave) {
	return !!slave.eye.right || !!slave.eye.left;
};

/**
 * True if slave has at least one eye that is natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyNaturalEyes = function(slave) {
	return getLeftEyeType(slave) === 1 || getRightEyeType(slave) === 1;
};

/**
 * True if slave has at least one eye that is prosthetic (cyber or glass)
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyProstheticEyes = function(slave) {
	return getLeftEyeType(slave) > 1 || getRightEyeType(slave) > 1;
};

/**
 * True if slave has at least one eye that is cybernetic
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasAnyCyberneticEyes = function(slave) {
	return getLeftEyeType(slave) === 3 || getRightEyeType(slave) === 3;
};

/**
 * True if slave has both eyes
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothEyes = function(slave) {
	return !!slave.eye.right && !!slave.eye.left;
};

/**
 * True if slave has both eyes and they are natural
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothNaturalEyes = function(slave) {
	return getLeftEyeType(slave) === 1 && getRightEyeType(slave) === 1;
};

/**
 * True if slave has both eyes and they are prosthetic (cyber or glass)
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothProstheticEyes = function(slave) {
	return getLeftEyeType(slave) > 1 && getRightEyeType(slave) > 1;
};

/**
 * True if slave has both eyes and they are cybernetic
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasBothCyberneticEyes = function(slave) {
	return getLeftEyeType(slave) === 3 && getRightEyeType(slave) === 3;
};

/**
 * True if slave has left eye
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasLeftEye = function(slave) {
	return !!slave.eye.left;
};
/**
 * True if slave has right eye
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasRightEye = function(slave) {
	return !!slave.eye.right;
};

/**
 * Returns type of the left eye.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getLeftEyeType = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.type;
	} else {
		return 0;
	}
};

/**
 * Returns type of the right eye.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getRightEyeType = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.type;
	} else {
		return 0;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getLeftEyeVision = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.vision;
	} else {
		return 0;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getRightEyeVision = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.vision;
	} else {
		return 0;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getBestVision = function(slave) {
	return Math.max(getRightEyeVision(slave), getLeftEyeVision(slave));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getWorstVision = function(slave) {
	return Math.min(getRightEyeVision(slave), getLeftEyeVision(slave));
};

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @param {number} vision
 * @returns {boolean}
 */
window.anyVisionEquals = function(slave, vision) {
	return getRightEyeVision(slave) === vision || getLeftEyeVision(slave) === vision;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getLeftEyeColor = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.iris;
	} else {
		return "empty";
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getRightEyeColor = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.right.iris;
	} else {
		return "empty";
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getLeftEyePupil = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.pupil;
	} else {
		return "circular";
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.getRightEyePupil = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.right.pupil;
	} else {
		return "circular";
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
window.hasVisibleHeterochromia = function(slave) {
	return hasAnyEyes(slave) && getLeftEyeColor(slave) !== getRightEyeColor(slave);
};

/**
 * Gives the genetic color of the specified eye.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} side
 * @returns {string}
 */
window.getGeneticEyeColor = function(slave, side) {
	if (side !== "left" && side !== "right") { return "ERROR:" + side; }

	if (slave.geneticQuirks.albinism === 2) {
		return slave.albinismOverride.eyeColor;
	} else {
		if (side === "left" && typeof slave.geneticQuirks.heterochromia === "string") {
			return slave.geneticQuirks.heterochromia;
		} else {
			return slave.eye.origColor;
		}
	}
};

/**
 * Counts the number of eyes that are not the genetic color
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.getLenseCount = function(slave) {
	let count = 0;

	if (hasRightEye(slave) && getRightEyeColor(slave) !== getGeneticEyeColor(slave, "right")) {
		count++;
	}

	if (hasLeftEye(slave) && getLeftEyeColor(slave) !== getGeneticEyeColor(slave, "left")) {
		count++;
	}

	return count;
};
