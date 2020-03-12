/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
window.saRest = function saRest(slave) {
	/* eslint-disable no-unused-vars*/
	const {
		he, him, his, hers, himself, boy,
		He, His
	} = getPronouns(slave);
	/* eslint-enable */

	let t = " takes the week off.";

	if (slave.fuckdoll > 0) {
		t += ` ${He} has nothing to do but `;
		if (!hasBothLegs(slave)) {
			t += `lie `;
		} else {
			t += `stand `;
		}
		t += `in place.`;
	}

	if (slave.health.condition > 90) {
		t += ` ${His} health is so outstanding that rest does not improve it.`;
	} else if (slave.health.condition > -100) {
		t += ` ${His} <span class="health inc">health recovers</span> with rest.`;
		improveCondition(slave, 10);
		if (!(canHear(slave))) {
			t += ` Since ${he} is deaf, the hustle and bustle of daily life in the penthouse <span class="health inc">didn't bother ${him} at all.</span>`;
			improveCondition(slave, 3);
		} else if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs")) {
			t += ` Since ${he} is hard of hearing, the hustle and bustle of daily life in the penthouse <span class="health inc">didn't disturb ${his} rest as much.</span>`;
			improveCondition(slave, 1);
		}
	}

	if (slave.fuckdoll === 0 && slave.fetish !== "mindbroken") {
		if (slave.devotion > 20) {
			if (slave.trust <= 20) {
				t += ` Being allowed to rest <span class="trust inc">reduces ${his} fear</span> of you.`;
				slave.trust += 4;
			} else if (slave.trust <= 50) {
				t += ` Being allowed to rest <span class="trust inc">builds ${his} trust</span> in you.`;
				slave.trust += 2;
			} else {
				t += ` Being allowed to rest <span class="trust inc">confirms ${his} trust</span> in you.`;
				slave.trust += 2;
			}
		} else {
			if (slave.trust < -20) {
				t += ` Being allowed to rest <span class="trust inc">reduces ${his} fear</span> of you.`;
				slave.trust += 4;
			}
		}
	}

	if (slave.health.illness > 0 || slave.health.tired > 60) {
		t += ` Since ${he} is<span class="red">`;
		if (slave.health.illness === 1) {
			t += ` feeling under the weather`;
		} else if (slave.health.illness === 2) {
			t += ` somewhat ill`;
		} else if (slave.health.illness === 3) {
			t += ` sick`;
		} else if (slave.health.illness === 4) {
			t += ` very sick`;
		} else if (slave.health.illness === 5) {
			t += ` terribly ill`;
		}
		if (slave.health.illness > 0 && slave.health.tired > 60) {
			t += ` and`;
		}
		if (slave.health.tired > 90) {
			t += ` exhausted`;
		} else if (slave.health.tired > 60) {
			t += ` fatigued`;
		}
		t += `,</span> ${his} body appreciates being allowed to rest.`;
	}
	if (slave.health.tired > 30) {
		if (slave.assignment === "rest in the spa") {
			if (V.spaUpgrade > 0) {
				t += ` ${V.spaNameCaps}'s luxuries help ${him} relax.`;
			}
			if (V.Attendant !== 0) {
				t += ` ${V.Attendant.slaveName}'s fingers know just how to refresh ${his} tired body.`;
			}
		}
	}
	tired(slave);

	if (V.showVignettes === 1 && slave.assignment === Job.REST) {
		const _vignette = GetVignette(slave),
		FResultNumber = FResult(slave);

		t += ` <span class="story-label">This week</span> ${_vignette.text} `;
		if (_vignette.type === "cash") {
			if (_vignette.effect > 0) {
				t += `<span class="cash inc">making you an extra ${cashFormat(Math.trunc(FResultNumber * _vignette.effect))}.</span>`;
			} else if (_vignette.effect < 0) {
				t += `<span class="cash dec">losing you ${cashFormat(Math.abs(Math.trunc(FResultNumber * _vignette.effect)))}.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			cashX(Math.trunc(FResultNumber * _vignette.effect), "rest", slave);
		} else if (_vignette.type === "devotion") {
			if (_vignette.effect > 0) {
				if (slave.devotion > 50) {
					t += `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					t += `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
				} else if (slave.devotion > -10) {
					t += `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
				} else {
					t += `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
				}
			} else if (_vignette.effect < 0) {
				if (slave.devotion > 50) {
					t += `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					t += `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
				} else if (slave.devotion > -10) {
					t += `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
				} else {
					t += `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
				}
			} else {
				t += `an incident without lasting effect.`;
			}
			slave.devotion += (1 * _vignette.effect);
		} else if (_vignette.type === "trust") {
			if (_vignette.effect > 0) {
				if (slave.trust > 20) {
					t += `<span class="trust inc">increasing ${his} trust in you.</span>`;
				} else if (slave.trust > -10) {
					t += `<span class="trust inc">reducing ${his} fear of you.</span>`;
				} else {
					t += `<span class="trust inc">reducing ${his} terror of you.</span>`;
				}
			} else if (_vignette.effect < 0) {
				if (slave.trust > 20) {
					t += `<span class="trust dec">reducing ${his} trust in you.</span>`;
				} else if (slave.trust >= -20) {
					t += `<span class="trust dec">increasing ${his} fear of you.</span>`;
				} else {
					t += `<span class="trust dec">increasing ${his} terror of you.</span>`;
				}
			} else {
				t += `an incident without lasting effect.`;
			}
			slave.trust += (1 * _vignette.effect);
		} else if (_vignette.type === "health") {
			if (_vignette.effect > 0) {
				t += `<span class="health inc">improving ${his} health.</span>`;
				improveCondition(slave, 2 * _vignette.effect);
			} else if (_vignette.effect < 0) {
				t += `<span class="health dec">affecting ${his} health.</span>`;
				healthDamage(slave, 2 * _vignette.effect);
			} else {
				t += `an incident without lasting effect.`;
			}
		} else {
			if (_vignette.effect > 0) {
				t += `<span class="reputation inc">gaining you a bit of reputation.</span>`;
			} else if (_vignette.effect < 0) {
				t += `<span class="reputation dec">losing you a bit of reputation.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			repX((FResultNumber * _vignette.effect * 0.1), "vignette", slave);
		}
	}

	return t;
};
