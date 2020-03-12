/**
 * @param {App.Entity.SlaveState} heroSlave
 * @param {App.Entity.SlaveState} baseHeroSlave
 * @returns {App.Entity.SlaveState}
 */
App.Utils.getHeroSlave = function(heroSlave, baseHeroSlave) {
	function repairLimbs(slave) {
		if (slave.hasOwnProperty("removedLimbs")) {
			if (slave.removedLimbs[0] === 1) {
				removeLimbs(slave, "left arm");
			}
			if (slave.removedLimbs[1] === 1) {
				removeLimbs(slave, "right arm");
			}
			if (slave.removedLimbs[2] === 1) {
				removeLimbs(slave, "left leg");
			}
			if (slave.removedLimbs[3] === 1) {
				removeLimbs(slave, "right leg");
			}
			delete slave.removedLimbs;
		}
	}

	const newSlave = clone(baseHeroSlave);
	let albinismOverride = null;
	if (heroSlave.albinismOverride !== null) {
		albinismOverride = heroSlave.albinismOverride;
		delete heroSlave.albinismOverride;
	}
	deepAssign(newSlave, heroSlave);
	newSlave.albinismOverride = albinismOverride;
	repairLimbs(newSlave);
	generatePuberty(newSlave);
	return newSlave;
};

/**
 * Marks limbs to be removed when going trough App.Utils.getHeroSlave.
 * Does not actually remove limbs, only use on slaves that go through App.Utils.getHeroSlave!!
 * @param {{}}hero
 * @param {string} limb
 */
App.Utils.removeHeroLimbs = function(hero, limb = "all") {
	if (!hero.hasOwnProperty("removedLimbs")) {
		hero.removedLimbs = [0, 0, 0, 0];
	}

	switch (limb) {
		case "all":
			hero.removedLimbs = [1, 1, 1, 1];
			break;
		case "left arm":
			hero.removedLimbs[0] = 1;
			break;
		case "right arm":
			hero.removedLimbs[1] = 1;
			break;
		case "left leg":
			hero.removedLimbs[2] = 1;
			break;
		case "right leg":
			hero.removedLimbs[3] = 1;
			break;
	}
};
