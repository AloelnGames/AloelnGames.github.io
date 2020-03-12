window.removeActiveSlave = function removeActiveSlave() {
	"use strict";

	const AS_ID = V.activeSlave.ID;
	let LENGTH = V.slaves.length;
	const INDEX = V.slaveIndices[AS_ID];
	let missing = false;

	WombChangeID(V.PC, AS_ID, V.missingParentID);
	if (V.PC.pregSource === V.missingParentID) {
		missing = true;
	}

	if (V.PC.mother === AS_ID) {
		V.PC.mother = V.missingParentID;
		missing = true;
	}
	if (V.PC.father === AS_ID) {
		V.PC.father = V.missingParentID;
		missing = true;
	}
	if (V.PC.sisters > 0) {
		if (areSisters(V.PC, V.activeSlave) > 0) {
			V.PC.sisters--;
		}
	}
	if (V.PC.daughters > 0) {
		if (V.activeSlave.father === -1 || V.activeSlave.mother === -1) {
			V.PC.daughters--;
		}
	}

	if (INDEX >= 0 && INDEX < LENGTH) {
		if (V.incubator > 0) {
			V.tanks.forEach(child => {
				if (AS_ID === child.mother) {
					child.mother = V.missingParentID;
					missing = true;
				}
				if (AS_ID === child.father) {
					child.father = V.missingParentID;
					missing = true;
				}
			});
		}
		if (V.nursery > 0) {
			V.cribs.forEach(child => {
				if (AS_ID === child.mother) {
					child.mother = V.missingParentID;
					missing = true;
				}
				if (AS_ID === child.father) {
					child.father = V.missingParentID;
					missing = true;
				}
			});
		}
		V.slaves.forEach(slave => {
			WombChangeID(slave, AS_ID, V.missingParentID); /* This check is complex, should be done in JS now, all needed will be done here. */
			WombChangeGeneID(slave, AS_ID, V.missingParentID);
			if (slave.pregSource === V.missingParentID) {
				missing = true;
			}
			if (V.activeSlave.daughters > 0) {
				if (slave.mother === AS_ID) {
					slave.mother = V.missingParentID;
				}
				if (slave.father === AS_ID) {
					slave.father = V.missingParentID;
				}
				missing = true;
			}
			if (V.activeSlave.mother > 0 || V.activeSlave.father > 0) {
				if (V.activeSlave.mother === slave.ID || V.activeSlave.father === slave.ID) {
					slave.daughters--;
				}
			}
			if (V.activeSlave.sisters > 0) {
				if (areSisters(V.activeSlave, slave) > 0) {
					slave.sisters--;
				}
			}
			if (slave.ID === V.activeSlave.relationTarget) {
				slave.relation = 0;
				slave.relationTarget = 0;
			}
			if (slave.milkSource !== 0) {
				if (slave.milkSource === AS_ID) {
					slave.milkSource = 0;
					slave.inflation = 0;
					slave.inflationType = "none";
					slave.inflationMethod = 0;
				}
			}
			if (slave.cumSource !== 0) {
				if (slave.cumSource === AS_ID) {
					slave.cumSource = 0;
					slave.inflation = 0;
					slave.inflationType = "none";
					slave.inflationMethod = 0;
				}
			}
			if (slave.ID === V.activeSlave.relationshipTarget) {
				slave.relationship = 0;
				slave.relationshipTarget = 0;
			}
			if (slave.ID === V.activeSlave.rivalryTarget) {
				slave.rivalry = 0;
				slave.rivalryTarget = 0;
			}
			/* moved to saDevotion as a discovery event
				if (slave.origBodyOwnerID === AS_ID) {
				slave.origBodyOwnerID = 0;
				}
			*/
		});

		/* remove from Pit fighters list, if needed */
		V.fighterIDs.delete(AS_ID);

		/* remove from Coursing Association, if needed */
		if (V.Lurcher !== 0 && V.Lurcher.ID === AS_ID) {
			V.Lurcher = 0;
		}

		if (Array.isArray(V.personalAttention)) {
			V.personalAttention.deleteWith(s => s.ID === AS_ID);
			if (V.personalAttention.length === 0) {
				if (V.PC.career === "escort") {
					V.personalAttention = "whoring";
				} else if (V.PC.career === "servant") {
					V.personalAttention = "upkeep";
				} else {
					V.personalAttention = "business";
				}
			}
		}

		/* Remove from facility array or leadership role, if needed */
		removeJob(V.activeSlave, V.activeSlave.assignment);

		if (V.traitor !== 0) {
			missing = true; /* no exceptions, fetus system relies on this */
			if (AS_ID === V.traitor.pregSource) {
				V.traitor.pregSource = 0;
			}
			if (V.traitor.mother === AS_ID) {
				V.traitor.mother = V.missingParentID;
			}
			if (V.traitor.father === AS_ID) {
				V.traitor.father = V.missingParentID;
			}
			if (V.traitor.origBodyOwnerID === AS_ID) {
				V.traitor.origBodyOwnerID = 0;
			}
		}
		if (V.boomerangSlave !== 0) {
			missing = true;
			if (AS_ID === V.boomerangSlave.pregSource) {
				V.boomerangSlave.pregSource = 0;
			}
			if (V.boomerangSlave.mother === AS_ID) {
				V.boomerangSlave.mother = V.missingParentID;
			}
			if (V.boomerangSlave.father === AS_ID) {
				V.boomerangSlave.father = V.missingParentID;
			}
			if (V.boomerangSlave.origBodyOwnerID === AS_ID) {
				V.traitor.origBodyOwnerID = 0;
			}
		}

		V.organs.deleteWith(s => s.ID === AS_ID);
		V.completedOrgans.deleteWith(s => s.ID === AS_ID);

		for (let _o = 0; _o < V.adjustProsthetics.length; _o++) {
			if (V.adjustProsthetics[_o].ID === AS_ID) {
				V.adjustProsthetics.deleteAt(_o);
				V.adjustProstheticsCompleted--;
				_o--;
			}
		}

		const _geneIndex = V.genePool.findIndex(s => s.ID === AS_ID);
		if (_geneIndex !== -1) {
			let keep = false;
			if (V.traitor !== 0) {
				if (isImpregnatedBy(V.traitor, V.activeSlave) || V.traitor.ID === AS_ID) {
					/* did we impregnate the traitor, or are we the traitor? */
					keep = true;
				}
			}
			if (V.boomerangSlave !== 0) {
				if (isImpregnatedBy(V.boomerangSlave, V.activeSlave) || V.boomerangSlave.ID === AS_ID) {
					/* did we impregnate the boomerang, or are we the boomerang? */
					keep = true;
				}
			}
			if (isImpregnatedBy(V.PC, V.activeSlave)) {
				/* did we impregnate the PC */
				keep = true;
			}
			if (!keep) {
				/* avoid going through this loop if possible */
				keep = V.slaves.some(slave => {
					/* have we impregnated a slave that is not ourselves? */
					return (slave.ID !== AS_ID && isImpregnatedBy(slave, V.activeSlave));
				});
			}
			if (!keep) {
				V.genePool.deleteAt(_geneIndex);
			}
		}
		if (missing) {
			V.missingTable[V.missingParentID] = {
				slaveName: V.activeSlave.slaveName,
				slaveSurname: V.activeSlave.slaveSurname,
				fullName: SlaveFullName(V.activeSlave),
				dick: V.activeSlave.dick,
				vagina: V.activeSlave.vagina,
				ID: V.missingParentID
			};
			if (V.traitor.ID === V.activeSlave.ID) {
				/* To link developing fetuses to their parent */
				V.traitor.missingParentTag = V.missingParentID;
			} else if (V.boomerangSlave.ID === V.activeSlave.ID) {
				V.boomerangSlave.missingParentTag = V.missingParentID;
			}
			V.missingParentID--;
		}

		if (V.assignmentRecords[AS_ID]) {
			delete V.assignmentRecords[AS_ID];
		}

		removeSlave(INDEX);
		LENGTH--;
		V.activeSlave = 0;
		V.JobIDArray = resetJobIDArray(); /* need to call this once more to update count of resting slaves*/
	}
};
/**
 * @param {App.Entity.SlaveState} removedSlave
 */
window.removeNonNGPSlave = function removeNonNGPSlave(removedSlave) {
	"use strict";
	const ID = removedSlave.ID;
	let LENGTH = V.slaves.length;
	const INDEX = V.slaveIndices[ID];
	let missing = false;

	// Only bother if PC is being kept
	if (V.freshPC !== 1) {
		WombChangeID(V.PC, ID, V.missingParentID);
		if (V.PC.pregSource === V.missingParentID) {
			missing = true;
		}
		if (V.PC.mother === ID) {
			V.PC.mother = V.missingParentID;
			missing = true;
		}
		if (V.PC.father === ID) {
			V.PC.father = V.missingParentID;
			missing = true;
		}
		if (V.PC.sisters > 0) {
			if (areSisters(V.PC, removedSlave) > 0) {
				V.PC.sisters--;
			}
		}
		if (V.PC.daughters > 0) {
			if (removedSlave.father === -1 || removedSlave.mother === -1) {
				V.PC.daughters--;
			}
		}
	}

	if (INDEX >= 0 && INDEX < LENGTH) {
		V.slaves.forEach(slave => {
			if (slave.assignment === "be imported") {
				WombChangeID(slave, ID, V.missingParentID); /* This check is complex, should be done in JS now, all needed will be done here. */
				WombChangeGeneID(slave, ID, V.missingParentID);
				if (slave.pregSource === V.missingParentID) {
					missing = true;
				}
				if (removedSlave.daughters > 0) {
					if (slave.mother === ID) {
						slave.mother = V.missingParentID;
					}
					if (slave.father === ID) {
						slave.father = V.missingParentID;
					}
					missing = true;
				}
				if (slave.ID === removedSlave.relationTarget) {
					slave.relation = 0;
					slave.relationTarget = 0;
				}
				if (slave.milkSource !== 0) {
					if (slave.milkSource === ID) {
						slave.milkSource = 0;
						slave.inflation = 0;
						slave.inflationType = "none";
						slave.inflationMethod = 0;
					}
				}
				if (slave.cumSource !== 0) {
					if (slave.cumSource === ID) {
						slave.cumSource = 0;
						slave.inflation = 0;
						slave.inflationType = "none";
						slave.inflationMethod = 0;
					}
				}
				if (slave.ID === removedSlave.relationshipTarget) {
					slave.relationship = 0;
					slave.relationshipTarget = 0;
				}
				if (slave.ID === removedSlave.rivalryTarget) {
					slave.rivalry = 0;
					slave.rivalryTarget = 0;
				}
			}
		});

		const _geneIndex = V.genePool.findIndex(s => s.ID === ID);
		if (_geneIndex !== -1) {
			let keep = false;
			if (isImpregnatedBy(V.PC, removedSlave)) {
				/* did we impregnate the PC */
				keep = true;
			}
			if (!keep) {
				/* avoid going through this loop if possible */
				keep = V.slaves.some(slave => {
					/* have we impregnated a slave that is not ourselves? */
					return (slave.ID !== ID && isImpregnatedBy(slave, removedSlave));
				});
			}
			if (!keep) {
				V.genePool.deleteAt(_geneIndex);
			}
		}
		if (missing) {
			V.missingTable[V.missingParentID] = {
				slaveName: removedSlave.slaveName,
				slaveSurname: removedSlave.slaveSurname,
				fullName: SlaveFullName(removedSlave),
				dick: removedSlave.dick,
				vagina: removedSlave.vagina,
				ID: V.missingParentID
			};
			V.missingParentID--;
		}

		removeSlave(INDEX);
	}
};
