/* see documentation for details /devNotes/Extended Family Mode Explained.txt */

window.isMotherP = function isMotherP(daughter, mother) {
	return daughter.mother === mother.ID;
};

window.isFatherP = function isFatherP(daughter, father) {
	return daughter.father === father.ID;
};

window.isParentP = function isParentP(daughter, parent) {
	return isMotherP(daughter, parent) || isFatherP(daughter, parent);
};

window.isGrandmotherP = function isGrandmotherP(granddaughter, grandmother) {
	let father;
	let mother;
	if (((mother = getSlave(granddaughter.mother)) && (mother.mother === grandmother.ID)) || ((father = getSlave(granddaughter.father)) && (father.mother === grandmother.ID))) {
		return true;
	}
	return false;
};

window.isGrandfatherP = function isGrandfatherP(granddaughter, grandfather) {
	let father;
	let mother;
	if (((mother = getSlave(granddaughter.mother)) && (mother.father === grandfather.ID)) || ((father = getSlave(granddaughter.father)) && (father.father === grandfather.ID))) {
		return true;
	}
	return false;
};

window.isGrandparentP = function isGrandparentP(granddaughter, grandparent) {
	return isGrandmotherP(granddaughter, grandparent) || isGrandfatherP(granddaughter, grandparent);
};

window.sameDad = function(slave1, slave2) {
	if ((slave1.father === slave2.father) && (specificDad(slave1))) {
		return true;
	}
	return false;
};

window.sameMom = function(slave1, slave2) {
	if ((slave1.mother === slave2.mother) && (specificMom(slave1))) {
		return true;
	}
	return false;
};

window.sameParent = function(slave1, slave2) {
	return sameMom(slave1, slave2) || sameDad(slave1, slave2);
};

window.specificDad = function(slave) {
	return (slave.father !== 0 && slave.father !== -2 && slave.father !== -4 && slave.father !== -5 && slave.father !== -6 && slave.father !== -7 && slave.father !== -8 && slave.father !== -9);
};

window.specificMom = function(slave) {
	return (slave.mother !== 0 && slave.mother !== -2 && slave.mother !== -4 && slave.mother !== -5 && slave.mother !== -6 && slave.mother !== -7 && slave.mother !== -8 && slave.mother !== -9);
};

/**
 * @param {App.Entity.SlaveState} niece
 * @param {App.Entity.SlaveState} aunt
 * @returns {boolean}
 */
window.isAunt = function(niece, aunt) {
	if (!State.variables.showDistantRelatives) {
		return false;
	}

	if (!niece || !aunt || (niece.ID === aunt.ID)) {
		return false;
	}
	let father;
	let mother;
	if ((mother = getSlave(niece.mother)) && (mother.ID !== aunt.ID) && !sameTParent(mother, aunt) && sameMom(mother, aunt) && sameDad(mother, aunt)) {
		return true;
	} else if ((father = getSlave(niece.father)) && (father.ID !== aunt.ID) && !sameTParent(father, aunt) && sameMom(father, aunt) && sameDad(father, aunt)) {
		return true;
	}

	return false;
};

// testtest catches the case if a mother is a father or a father a mother - thank you familyAnon, for this code
window.sameTParent = function(slave1, slave2) {
	if (slave1.mother === -1 && slave1.father === -1 && slave2.mother === -1 && slave2.father === -1) {
		return 1;
	} else if (slave1.mother === slave2.father && slave1.father === slave2.mother && specificMom(slave1) && specificDad(slave1) && slave1.mother !== slave1.father) {
		return 2;
	} else if ((slave1.mother === slave2.father || slave1.father === slave2.mother) && specificMom(slave1) && specificMom(slave2) && slave1.mother !== slave1.father) {
		return 3;
	}
	return 0;
};

/*
window.sameTParent = function(slave1, slave2) {
	if ((slave1.mother === slave2.father || slave1.father === slave2.mother) && (slave1.mother !== 0 && slave1.mother !== -2 && slave1.father !== 0 && slave1.father !== -2)) {
		return true; //testtest catches the case if a mother is a father or a father a mother
	} else {
		return false;
	}
};
*/

window.areTwins = function(slave1, slave2) {
	if (!sameDad(slave1, slave2)) {
		return false;
	} else if (!sameMom(slave1, slave2)) {
		return false;
	} else if (slave1.actualAge === slave2.actualAge && slave1.birthWeek === slave2.birthWeek) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {number}
 */
window.areSisters = function(slave1, slave2) {
	if (slave1.ID === slave2.ID) {
		return 0; // you are not your own sister
	} else if (!specificDad(slave1) && !specificMom(slave1)) {
		return 0; // not related
	} else {
		if (!sameDad(slave1, slave2) && sameMom(slave1, slave2)) {
			return 3; // half sisters
		} else if (sameDad(slave1, slave2) && !sameMom(slave1, slave2)) {
			return 3; // half sisters
		} else if (sameTParent(slave1, slave2) === 3) {
			return 3; // half sisters
		} else if (sameTParent(slave1, slave2) === 2) {
			return 2; // sisters
		} else if (sameDad(slave1, slave2) && sameMom(slave1, slave2)) {
			if (slave1.actualAge === slave2.actualAge && slave1.birthWeek === slave2.birthWeek) {
				return 1; // twins
			} else {
				return 2; // sisters
			}
		} else {
			return 0; // not related
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {boolean}
 */
window.areCousins = function(slave1, slave2) {
	if (!State.variables.showDistantRelatives) {
		return false;
	}

	if (!slave1 || !slave2 || (slave1.ID === slave2.ID) || areSisters(slave1, slave2)) {
		return false;
	}

	let slave1Mom;
	let slave1Dad;
	let slave2Mom;
	let slave2Dad;

	if ((slave1Mom = getSlave(slave1.mother)) && (slave2Mom = getSlave(slave2.mother)) && !sameTParent(slave1Mom, slave2Mom) && sameMom(slave1Mom, slave2Mom) && sameDad(slave1Mom, slave2Mom)) {
		return true;
	} else if ((slave1Mom = getSlave(slave1.mother)) && (slave2Dad = getSlave(slave2.father)) && !sameTParent(slave1Mom, slave2Dad) && sameMom(slave1Mom, slave2Dad) && sameDad(slave1Mom, slave2Dad)) {
		return true;
	} else if ((slave1Dad = getSlave(slave1.father)) && (slave2Mom = getSlave(slave2.mother)) && !sameTParent(slave1Dad, slave2Mom) && sameMom(slave1Dad, slave2Mom) && sameDad(slave1Dad, slave2Mom)) {
		return true;
	} else if ((slave1Dad = getSlave(slave1.father)) && (slave2Dad = getSlave(slave2.father)) && !sameTParent(slave1Dad, slave2Dad) && sameMom(slave1Dad, slave2Dad) && sameDad(slave1Dad, slave2Dad)) {
		return true;
	}

	return false;
};

/**
 * Returns whether two slaves are *closely* related (i.e. siblings or parent/child).
 * Distant relatives are not checked by this function.
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {boolean}
 */
window.areRelated = function(slave1, slave2) {
	if (V.familyTesting === 1) {
		return (slave1.father === slave2.ID || slave1.mother === slave2.ID || slave2.father === slave1.ID || slave2.mother === slave1.ID || areSisters(slave1, slave2) > 0);
	} else {
		return slave1.relationTarget === slave2.ID;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
window.totalRelatives = function(slave) {
	let relatives = 0;
	if (slave.mother > 0) {
		relatives += 1;
	}
	if (slave.father > 0) {
		relatives += 1;
	}
	if (slave.daughters > 0) {
		relatives += slave.daughters;
	}
	if (slave.sisters > 0) {
		relatives += slave.sisters;
	}
	return relatives;
};

/**
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @param {App.Entity.SlaveState[]} slaves
 * @returns {Array}	// I think
 */
window.mutualChildren = function(slave1, slave2, slaves) {
	return slaves.filter(function(s) {
		return s.ID !== slave1.ID && s.ID !== slave2.ID && s.mother > 0 && s.father > 0 && ((s.mother === slave1.ID && s.father === slave2.ID) || (s.mother === slave2.ID && s.father === slave1.ID));
	}).length;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {function(App.Entity.SlaveState): boolean} filterFunction
 * @returns {App.Entity.SlaveState}
 */
window.randomRelatedSlave = function(slave, filterFunction) {
	if (!slave || !SugarCube) {
		return undefined;
	}
	if (typeof filterFunction !== 'function') {
		filterFunction = function( /* s, index, array*/ ) {
			return true;
		};
	}
	const arr = V.slaves.filter(filterFunction);
	arr.shuffle();
	return arr.find(function(s) {
		return areSisters(slave, s) ||
			slave.ID === s.mother ||
			slave.ID === s.father ||
			s.ID === slave.mother ||
			s.ID === slave.father;
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomRelatedAvailableSlave = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return isSlaveAvailable(s);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomSister = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return areSisters(slave, s);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomTwinSister = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return areSisters(slave, s);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomAvailableSister = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return isSlaveAvailable(s) && areSisters(slave, s);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomAvailableTwinSister = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return isSlaveAvailable(s) && areSisters(slave, s);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomDaughter = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return s.mother === slave.ID || s.father === slave.ID;
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomAvailableDaughter = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return isSlaveAvailable(s) && (s.mother === slave.ID || s.father === slave.ID);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomParent = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return s.ID === slave.mother || s.ID === slave.father;
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {App.Entity.SlaveState}
 */
window.randomAvailableParent = function(slave) {
	return randomRelatedSlave(slave, function(s) {
		return isSlaveAvailable(s) && (s.ID === slave.mother || s.ID === slave.father);
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {object}
 */
window.availableRelatives = function(slave) {
	let avail = {
		mother: false, motherName: null, father: false, fatherName: null, sisters: 0, daughters: 0, oneSisterRel: null, oneDaughterRel: null
	};

	V.slaves.forEach((other) => {
		if (slave.mother === other.ID) {
			avail.motherName = other.slaveName;
		}
		if (slave.father === other.ID) {
			avail.fatherName = other.slaveName;
		}
		if (isSlaveAvailable(other)) {
			if (slave.mother === other.ID) {
				avail.mother = true;
			}
			if (slave.father === other.ID) {
				avail.father = true;
			}
			if (slave.ID === other.mother || slave.ID === other.father) {
				avail.daughters++;
				if (avail.daughters === 1) {
					avail.oneDaughterRel = relativeTerm(slave, other);
				}
			}
			if (areSisters(slave, other) > 0) {
				avail.sisters++;
				if (avail.sisters === 1) {
					avail.oneSisterRel = relativeTerm(slave, other);
				}
			}
		}
	});

	return avail;
};

window.totalPlayerRelatives = function(pc) {
	let relatives = 0;
	if (pc.mother > 0) {
		relatives += 1;
	}
	if (pc.father > 0) {
		relatives += 1;
	}
	if (pc.daughters > 0) {
		relatives += pc.daughters;
	}
	if (pc.sisters > 0) {
		relatives += pc.sisters;
	}
	return relatives;
};

/**
 * Returns the term for slave2's relationship to slave1 (i.e. "daughter" if slave2 is slave1's daughter).
 * Performs distant relative checking if enabled.
 * @param {App.Entity.SlaveState} slave1
 * @param {App.Entity.SlaveState} slave2
 * @returns {string|null} - returns null if the slaves are not related, even distantly.
 */
window.relativeTerm = function(slave1, slave2) {
	if (V.familyTesting === 1) {
		if (slave2.mother === slave1.ID || slave2.father === slave1.ID) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "son";
			} else {
				return "daughter";
			}
		} else if (slave1.mother === slave2.ID && slave1.father === slave2.ID) {
			return "sole parent";
		} else if (slave1.mother === slave2.ID) {
			return "mother";
		} else if (slave1.father === slave2.ID) {
			return "father";
		} else if (areSisters(slave2, slave1) === 1) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "twin brother";
			} else {
				return "twin sister";
			}
		} else if (areSisters(slave2, slave1) === 2) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "brother";
			} else {
				return "sister";
			}
		} else if (areSisters(slave2, slave1) === 3) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "half-brother";
			} else {
				return "half-sister";
			}
		} else if (isAunt(slave1, slave2)) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "nephew";
			} else {
				return "niece";
			}
		} else if (isAunt(slave2, slave1)) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "uncle";
			} else {
				return "aunt";
			}
		} else if (areCousins(slave2, slave1)) {
			return "cousin";
		} else if (isGrandfatherP(slave1, slave2)) {
			return "grandfather";
		} else if (isGrandmotherP(slave1, slave2)) {
			return "grandmother";
		} else if (isGrandparentP(slave2, slave1)) {
			if (slave2.genes === "XY" && V.diversePronouns) {
				return "grandson";
			} else {
				return "granddaughter";
			}
		}
	} else {
		if (slave2.relationTarget === slave1.ID && slave2.relation !== 0) {
			if (slave2.relation === "sister" || slave2.relation === "twin") {
				let r = (slave1.actualAge === slave2.actualAge) ? "twin " : "";
				if (slave2.genes === "XY" && V.diversePronouns) {
					return r + "brother";
				} else {
					return r + "sister";
				}
			}
			return slave2.relation;
		}
	}

	return null;
};
