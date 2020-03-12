/**
 * returned string fits in a sentence like this:
 * She has {return}.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.eyesType = function(slave) {
	let r = "";
	if (hasBothEyes(slave)) {
		if (getLeftEyeType(slave) !== getRightEyeType(slave)) {
			r = `a ${App.Desc.eyeTypeToString(getRightEyeType(slave))} and a ${App.Desc.eyeTypeToString(getLeftEyeType(slave))} eye`;
		} else {
			r = `${App.Desc.eyeTypeToString(getRightEyeType(slave))} eyes`;
		}
	} else if (hasAnyEyes(slave)) {
		if (hasRightEye(slave)) {
			r = `a ${App.Desc.eyeTypeToString(getRightEyeType(slave))} eye`;
		} else if (hasLeftEye(slave)) {
			r = `a ${App.Desc.eyeTypeToString(getLeftEyeType(slave))} eye`;
		}
	} else {
		r = "no eyes";
	}

	return r;
};

/**
 * converts an eye type to a string
 * @param {number} type
 * @returns {string}
 */
App.Desc.eyeTypeToString = function(type) {
	switch (type) {
		case 1:
			return "natural";
		case 2:
			return "glass";
		case 3:
			return "artificial";
		default:
			return "unknown eye type: " + type;
	}
};

/**
 * Fits in a sentence like this:
 * She has {return}.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} [adj]
 * @param {string} [eye]
 * @param {string} [eyes]
 * @returns {string}
 */
App.Desc.eyesColor = function(slave, adj = "", eye = "eye", eyes = "eyes") {
	let r = "";
	if (hasBothEyes(slave)) {
		if (getLeftEyeColor(slave) !== getRightEyeColor(slave)) {
			r = `${getRightEyeColor(slave)} and ${getLeftEyeColor(slave)} ${adj} ${eyes}`;
		} else {
			r = `${getRightEyeColor(slave)} ${adj} ${eyes}`;
		}
	} else if (hasAnyEyes(slave)) {
		if (hasRightEye(slave)) {
			r = `a ${getRightEyeColor(slave)} ${adj} ${eye}`;
		} else if (hasLeftEye(slave)) {
			r = `a ${getLeftEyeColor(slave)} ${adj} ${eye}`;
		}
	} else {
		r = "no eyes";
	}

	return r;
};

/**
 * Fits in a sentence like this:
 * She has {return} eyes.
 * Prefer App.Desc.eyesColor if possible as it works reliably with only one eye.
 * Example where this is better: {return}-eyed gaze
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's eye color
 */
App.Desc.eyeColor = function(slave) {
	"use strict";
	let r;

	if (!hasAnyEyes(slave)) {
		r = "empty";
	} else if (hasBothEyes(slave)) {
		if (hasVisibleHeterochromia(slave)) {
			r = `heterochromatic ${getRightEyeColor(slave)} and ${getLeftEyeColor(slave)}`;
		} else {
			r = getLeftEyeColor(slave);
		}
	} else if (hasLeftEye(slave)) {
		r = getLeftEyeColor(slave);
	} else {
		r = getRightEyeColor(slave);
	}
	return r;
};

/**
 * returned string fits in a sentence like this:
 * She has {return}.
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.eyesVision = function(slave) {
	let r = "";
	if (hasBothEyes(slave)) {
		if (getLeftEyeVision(slave) !== getRightEyeVision(slave)) {
			r = `a ${App.Desc.eyeVisionToString(getRightEyeVision(slave))} and a ${App.Desc.eyeVisionToString(getLeftEyeVision(slave))} eye`;
		} else {
			r = `${App.Desc.eyeVisionToString(getRightEyeVision(slave))} eyes`;
		}
	} else if (hasAnyEyes(slave)) {
		if (hasRightEye(slave)) {
			r = `a ${App.Desc.eyeVisionToString(getRightEyeVision(slave))} eye`;
		} else if (hasLeftEye(slave)) {
			r = `a ${App.Desc.eyeVisionToString(getLeftEyeVision(slave))} eye`;
		}
	} else {
		r = "no eyes";
	}

	return r;
};

/**
 * converts an eye vision to a string
 * @param {number} type
 * @returns {string}
 */
App.Desc.eyeVisionToString = function(type) {
	switch (type) {
		case 0:
			return "blind";
		case 1:
			return "nearsighted";
		case 2:
			return "normal";
		default:
			return "unknown eye vision: " + type;
	}
};
