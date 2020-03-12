/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's eyes
 */
App.Desc.eyes = function(slave) {
	"use strict";
	let r = ``;
	/* eslint-disable no-unused-vars*/
	const {
		he, him, his, hers, himself, boy, He, His
	} = getPronouns(slave);
	/* eslint-enable */

	if (getBestVision(slave) === 0) {
		if (!hasAnyEyes(slave)) {
			r += `${His} gaze is empty`;
		} else if (getLeftEyeType(slave) === 2 && getRightEyeType(slave) === 2) {
			r += `${He} has ${App.Desc.eyesColor(slave, "colored glass")}`;
		} else {
			const HC = hasVisibleHeterochromia(slave) ? 1 : 0;
			if (hasBothEyes(slave)) {
				r += `${His} eyes are dull`;
			} else {
				r += `${His} eye is dull`;
			}
			if (V.saleDescription && V.PC.skill.medicine >= 50 || V.PC.skill.slaving >= 50) {
				r += `, unfocused`;
				if (HC) {
					r += `, heterochromatic,`;
				}
				r += ` and clearly nonfunctional`;
			} else {
				if (HC) {
					r += `, heterochromatic,`;
				}
				r += ` and unfocused`;
			}
		}
		r += `, `;
		if (slave.intelligence > 95) {
			r += `but ${his} facial expressions reveal ${he} is incisive, quick, cunning; `;
			if (slave.intelligence + slave.intelligenceImplant >= 130) {
				r += `with ${his} education, ${he} is so far <span class="deepskyblue">beyond brilliant</span> that ${he} is nearly peerless. `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 95) {
				r += `with ${his} miseducation, however, ${he} is merely <span class="orangered">highly intelligent.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `${he} is both <span class="deepskyblue">brilliant</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				// placeholder as this is a technical impossibility for now
			} else {
				r += `${he} is so <span class="deepskyblue">brilliant</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 50) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				r += `but ${his} facial expressions reveal ${he} is incisive, quick, cunning; with ${his} education, ${he} can be considered <span class="deepskyblue">brilliant.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 50) {
				r += `but ${his} face is alive with intelligence; with ${his} miseducation, however, ${he} performs merely <span class="orangered">above average.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} face is alive with intelligence; ${he} is both <span class="deepskyblue">highly intelligent</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else {
				r += `but ${his} face is alive with intelligence; ${he} is so <span class="deepskyblue">highly intelligent</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else if (slave.intelligenceImplant <= -15) {
					r += `miseducation`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 15) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r += `but ${his} face is alive with intelligence; with ${his} education, ${he} can be considered <span class="deepskyblue">highly intelligent.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; with ${his} miseducation, however, ${he} performs merely <span class="orangered">averagely.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; ${he} is of <span class="deepskyblue">above average intelligence</span> and`;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; ${he} is of <span class="deepskyblue">above average intelligence</span> despite ${his} miseducation. `;
			} else {
				r += `but ${his} facial expressions reveal ${his} cleverness; ${he} is of <span class="deepskyblue">above average intelligence</span> despite being undereducated. `;
			}
		} else if (slave.intelligence >= -15) {
			if (slave.intelligence + slave.intelligenceImplant > 15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; with ${his} education, ${he} can be considered of <span class="deepskyblue">above average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -15) {
				r += `but ${his} facial expressions reveal ${his} alertness; with ${his} miseducation, however, ${he} exibits <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${his} alertness; ${he} is of average intelligence due to being `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${his} alertness; ${he} is of average intelligence even with ${his} miseducation. `;
			} else {
				r += `but ${his} facial expressions reveal ${his} alertness; ${he} is of average intelligence and is undereducated. `;
			}
		} else if (slave.intelligence >= -50) {
			if (slave.intelligence + slave.intelligenceImplant >= -15) {
				r += `but ${his} facial expressions reveal ${his} alertness; with ${his} education, ${he} can be considered of average intelligence. `;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; with ${his} miseducation, however, ${he} may as well be <span class="orangered">an idiot.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; ${he} is of <span class="orangered">below average intelligence</span> despite having been `;
				if (slave.intelligenceImplant >= 30) {
					r += `thoroughly `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; ${he} is <span class="orangered">below average intelligence</span> before taking ${his} miseducation into account. `;
			} else {
				r += `but ${his} facial expressions reveal ${he} is rather dim; ${he} is of <span class="orangered">below average intelligence</span> and is poorly educated. `;
			}
		} else if (slave.intelligence >= -95) {
			if (slave.intelligence + slave.intelligenceImplant >= -50) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; even with ${his} education, ${he} can only be considered of <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -95) {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; with ${his} miseducation, however, ${he} may as well be <span class="orangered">a complete moron.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; ${he} is <span class="orangered">quite stupid</span> despite having `;
				if (slave.intelligenceImplant >= 30) {
					r += `an advanced`;
				} else {
					r += `some`;
				}
				r += ` education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; ${he} is <span class="orangered">so stupid</span> ${his} miseducation had little effect. `;
			} else {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; ${he} is <span class="orangered">quite stupid</span> and ignorant. `;
			}
		} else {
			r += `though you doubt it would be much different if ${he} could see; `;
			if (slave.intelligence + slave.intelligenceImplant >= -95) {
				r += `even with ${his} education, ${he} is still <span class="orangered">really stupid.</span>`;
			} else if (slave.intelligence + slave.intelligenceImplant < -115) {
				r += `with ${his} miseducation, ${he} may as well be <span class="orangered">brain dead</span> given how long it takes for ${him} to form a coherent thought. `;
			} else if (slave.intelligenceImplant > 0) {
				r += `${he} is <span class="orangered">a moron,</span> yet somehow still remembers the basics of an education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `${he} is such <span class="orangered">a moron</span> that ${his} miseducation is completely unapparent. `;
			} else {
				r += `${he} is <span class="orangered">a moron,</span> and ignorant to boot. `;
			}
		}
	} else {
		if (slave.intelligence > 95) {
			r += `${His} ${App.Desc.eyeColor(slave)}-eyed gaze is incisive, quick, cunning; `;
			if (slave.intelligence + slave.intelligenceImplant >= 130) {
				r += `with ${his} education, ${he} is so far <span class="deepskyblue">beyond brilliant</span> that ${he} is nearly peerless. `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 95) {
				r += `with ${his} miseducation, however, ${he} is merely <span class="orangered">highly intelligent.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `${he} is both <span class="deepskyblue">brilliant</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				// placeholder as this is a technical impossibility for now
			} else {
				r += `${he} is so <span class="deepskyblue">brilliant</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 50) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				r += `${His} ${App.Desc.eyeColor(slave)}-eyed gaze is incisive, quick, cunning; with ${his} education, ${he} can be considered <span class="deepskyblue">brilliant.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 50) {
				r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} alive with intelligence; with ${his} miseducation, however, ${he} performs merely <span class="orangered">above average.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} alive with intelligence; ${he} is both <span class="deepskyblue">highly intelligent</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else {
				r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} alive with intelligence; ${he} is so <span class="deepskyblue">highly intelligent</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else if (slave.intelligenceImplant <= -15) {
					r += `miseducation`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 15) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} `;
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r += `alive with intelligence; with ${his} education, ${he} can be considered <span class="deepskyblue">highly intelligent.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 15) {
				r += `clever; with ${his} miseducation, however, ${he} performs merely <span class="orangered">averagely.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `clever; ${he} is of <span class="deepskyblue">above average intelligence</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `clever; ${he} is of <span class="deepskyblue">above average intelligence</span> despite ${his} miseducation. `;
			} else {
				r += `clever; ${he} is of <span class="deepskyblue">above average intelligence</span> despite being undereducated. `;
			}
		} else if (slave.intelligence >= -15) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} `;
			if (slave.intelligence + slave.intelligenceImplant > 15) {
				r += `clever; with ${his} education, ${he} can be considered of <span class="deepskyblue">above average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -15) {
				r += `alert; with ${his} miseducation, however, ${he} exibits <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `alert; ${he} is of average intelligence due to being `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `alert; ${he} is of average intelligence even with ${his} miseducation. `;
			} else {
				r += `alert; ${he} is of average intelligence and is undereducated. `;
			}
		} else if (slave.intelligence >= -50) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} `;
			if (slave.intelligence + slave.intelligenceImplant >= -15) {
				r += `alert; with ${his} education, ${he} can be considered of average intelligence. `;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += `dim; with ${his} miseducation, however, ${he} may as well be <span class="orangered">an idiot.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `dim; ${he} is of <span class="orangered">below average intelligence</span> despite having been `;
				if (slave.intelligenceImplant >= 30) {
					r += `thoroughly `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `dim; ${he} is <span class="orangered">below average intelligence</span> before taking ${his} miseducation into account. `;
			} else {
				r += `dim; ${he} is of <span class="orangered">below average intelligence</span> and is poorly educated. `;
			}
		} else if (slave.intelligence >= -95) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye is", "eyes are")} `;
			if (slave.intelligence + slave.intelligenceImplant >= -50) {
				r += `dim; even with ${his} education, ${he} can only be considered of <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -95) {
				r += `dull; with ${his} miseducation, however, ${he} may as well be <span class="orangered">a complete moron.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `dull; ${he} is <span class="orangered">quite stupid</span> despite having `;
				if (slave.intelligenceImplant >= 30) {
					r += `an advanced`;
				} else {
					r += `some`;
				}
				r += ` education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `dull; ${he} is <span class="orangered">so stupid</span> ${his} miseducation had little effect. `;
			} else {
				r += `dull; ${he} is <span class="orangered">quite stupid</span> and ignorant. `;
			}
		} else {
			r += `${His} ${App.Desc.eyeColor(slave)}-eyed gaze betrays near-total insensibility; `;
			if (slave.intelligence + slave.intelligenceImplant >= -95) {
				r += `even with ${his} education, ${he} is still <span class="orangered">really stupid.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -115) {
				r += `with ${his} miseducation, ${he} may as well be <span class="orangered">brain dead</span> given how long it takes for ${him} to form a coherent thought. `;
			} else if (slave.intelligenceImplant > 0) {
				r += `${he} is <span class="orangered">a moron,</span> yet somehow still remembers the basics of an education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `${he} is such <span class="orangered">a moron</span> that ${his} miseducation is completely unapparent. `;
			} else {
				r += `${he} is <span class="orangered">a moron,</span> and ignorant to boot. `;
			}
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's age and health
 */
App.Desc.ageAndHealth = function(slave) {
	"use strict";
	const H = slave.health;
	let r = ``;
	/* eslint-disable no-unused-vars*/
	let pronouns = getPronouns(slave);
	let he = pronouns.pronoun;
	let him = pronouns.object;
	let his = pronouns.possessive;
	let hers = pronouns.possessivePronoun;
	let himself = pronouns.objectReflexive;
	let boy = pronouns.noun;
	let woman = pronouns.woman;
	let He = capFirstChar(he);
	let His = capFirstChar(his);
	/* eslint-enable */
	let age;
	let birthday = "";
	if (V.seeAge !== 0) {
		if (slave.birthWeek === 51) {
			birthday = `; ${his} birthday is next week`;
		} else {
			birthday = `; ${his} birthday is in ${52-slave.birthWeek} weeks`;
		}
	}

	if (!slave.fuckdoll) {
		if (H.health < -90) {
			r += `${He} is nearly unresponsive and obviously <span class="red">dangerously unhealthy.</span>`;
		} else if (H.health < -50) {
			r += `${He} is <span class="red">very unhealthy.</span>`;
		} else if (H.health < -20) {
			r += `${He} is <span class="red">unhealthy.</span>`;
		} else if (H.health <= 20) {
			r += `${He} is in <span class="yellow">fair health.</span>`;
		} else if (H.health <= 50) {
			r += `${He} seems to be in <span class="green">good health.</span>`;
		} else if (H.health <= 90) {
			r += `${He} seems to be in <span class="green">great health.</span>`;
		} else {
			r += `${He} almost gleams; ${he}'s in the absolute <span class="green">best of health.</span>`;
		}

		if (H.shortDamage !== 0 || H.longDamage !== 0 || H.condition < 0) {
			r += ` Upon closer inspection you note that ${he}`;

			if (H.shortDamage >= 100) {
				r += ` looks <span class="red">absolutely brutalized</span> and will never be quite the way ${he} was`;
			} else if (H.shortDamage >= 70) {
				r += ` is <span class="red">gravely injured</span> with assured lasting effects`;
			} else if (H.shortDamage >= 40) {
				r += ` is <span class="red">seriouly injured</span> with some lasting effects`;
			} else if (H.shortDamage >= 20) {
				r += ` is <span class="orange">injured</span>`;
			} else if (H.shortDamage > 0) {
				r += ` seems to have suffered a <span class="yellow">minor injury</span> recently`;
			}

			if (H.shortDamage !== 0 && H.longDamage !== 0 && H.condition < 0) {
				r += `,`;
			} else if ((H.shortDamage !== 0 && H.longDamage !== 0) || (H.shortDamage !== 0 && H.condition < 0)) {
				r += ` and`;
			}

			if (H.longDamage >= 70) {
				r += ` is suffering heavily under accumulated <span class="red">permanent health problems</span>`;
			} else if (H.longDamage >= 40) {
				r += ` has some clear <span class="red">permanent health issues</span>`;
			} else if (H.longDamage >= 20) {
				r += ` shows signs of <span class="orange">lasting health problems</span>`;
			} else if (H.longDamage > 0) {
				r += ` carries some <span class="yellow">minor niggles</span>`;
			}

			if ((H.shortDamage !== 0 || H.longDamage !== 0) && H.condition < 0) {
				r += ` and`;
			}

			if (H.condition < -80 && H.shortDamage !== 0 && H.longDamage !== 0) {
				r += ` has been treated so badly ${he} <span class="red">is close to the brink</span>`;
			} else if (H.condition < -50) {
				r += ` appears to be in <span class="red">terrible condition</span>`;
			} else if (H.condition < -20) {
				r += ` appears to be in <span class="orange">poor condition</span>`;
			} else if (H.condition < 0) {
				r += ' could be in <span class="yellow">better condition</span>';
			}

			r += `.`;
		}

		if (H.tired > 30) {
			r += ` Additionally, ${he} is also `;
			if (H.tired > 90) {
				r += ` <span class="red">exhausted.</span>`;
			} else if (H.tired > 60) {
				r += ` <span class="orange">fatigued.</span>`;
			} else {
				r += ` <span class="yellow">tired.</span>`;
			}
		}
		age = slave.actualAge + 1;
		r += ` ${He} is `;
		if (slave.birthWeek >= 52 && V.seeAge) {
			r += `going to turn ${age} this week,`;
		} else if (slave.actualAge < 3) {
			r += `an infant, only `;
			if (V.showAgeDetail) {
				if (!slave.actualAge) {
					r += `${0 + V.week-slave.weekAcquired} weeks old${birthday}. `;
				} else if (slave.actualAge) {
					r += `${num(slave.actualAge)} year old${birthday}. `;
				} else {
					r += `${num(slave.actualAge)} years old${birthday}. `;
				}
			} else {
				if (!slave.actualAge) {
					r += `${0 + V.week-slave.weekAcquired} weeks old. `;
				} else if (slave.actualAge) {
					r += `${num(slave.actualAge)} year old. `;
				} else {
					r += `${num(slave.actualAge)} years old. `;
				}
			}
		} else if (slave.actualAge < 5) {
			r += `a toddler, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `only ${num(slave.actualAge)} years old. `;
			}
		} else if (slave.actualAge < 13) {
			r += `a little ${boy}, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `only ${num(slave.actualAge)} years old. `;
			}
		} else if (slave.actualAge < 16) {
			r += `almost a child, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `less than 17 years old. `;
			}
		} else if (slave.actualAge < 17) {
			r += `young and fresh at ${num(slave.actualAge)}${birthday}. `;
		} else if (slave.actualAge < 18) {
			r += `young, fresh, and nearly 18${birthday}`;
			if (V.showAgeDetail && V.seeAge !== 0) {
				if (V.seeAge) {
					r += ` and people are already beginning to eye ${him}`;
				}
			}
			r += `. `;
		} else if (slave.actualAge < 19) {
			if (!slave.birthWeek && V.seeAge) {
				r += `just turned ${num(slave.actualAge)} this week, which many citizens find especially appealing. `;
			} else if (slave.birthWeek < 4 && V.seeAge) {
				r += `only turned ${num(slave.actualAge)} this month. `;
			} else {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			}
		} else if (slave.actualAge < 20) {
			r += `in ${his} final year as a teenager at age 19${birthday}. `;
		} else if (slave.actualAge < 26) {
			r += `a young ${woman}, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} early twenties. `;
			}
		} else if (slave.actualAge < 30) {
			r += `a younger ${woman}, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} late twenties. `;
			}
		} else if (slave.actualAge < 36) {
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} early thirties. `;
			}
		} else if (slave.actualAge < 40) {
			r += `middle-aged for a slave, `;
			if (V.showAgeDetail) {
				r += `at ${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} late thirties. `;
			}
		} else {
			r += `old for a slave, `;
			if (V.showAgeDetail) {
				r += `at ${num(slave.actualAge)} years old${birthday}. `;
			} else {
				if (slave.actualAge < 50) {
					r += `in ${his} forties. `;
				} else if (slave.actualAge < 60) {
					r += `in ${his} fifties. `;
				} else if (slave.actualAge < 70) {
					r += `extremely old for a slave, in ${his} sixties. `;
				} else if (slave.actualAge < 80) {
					r += `extremely old for a slave, in ${his} seventies. `;
				} else if (slave.actualAge < 90) {
					r += `extremely old for a slave, in ${his} eighties. `;
				} else if (slave.actualAge < 100) {
					r += `extremely old for a slave, in ${his} nineties. `;
				} else if (slave.actualAge >= 100) {
					r += `ancient by any measure, over a century old. `;
				}
			}
			if (slave.actualAge !== slave.physicalAge) {
				r += ` However, ${he} has the body of a ${num(slave.physicalAge)}-year-old; `;
				if (slave.physicalAge < 18 && slave.actualAge >= 18) {
					r += `a stark contrast given ${his} maturity. `;
				} else if (slave.physicalAge < 18 && slave.actualAge < 18) {
					r += `a noticeable difference thanks to ${his} immaturity. `;
				} else if (slave.physicalAge <= slave.actualAge - 20 || slave.physicalAge >= slave.actualAge + 20) {
					r += `a shocking difference from ${his} actual age. `;
				} else if (slave.physicalAge <= slave.actualAge - 10 || slave.physicalAge >= slave.actualAge + 10) {
					r += `a noticeable difference from ${his} actual age. `;
				} else if (slave.physicalAge <= slave.actualAge - 5 || slave.physicalAge >= slave.actualAge + 5) {
					r += `a barely noticeable difference from ${his} actual age. `;
				} else {
					r += `though it is hard to tell the difference from ${his} actual age. `;
				}
			}
			/*
			 ** This section replaces the age/therapy texts, giving more details for the NCS condition.
			 */
			if (slave.geneMods.NCS) {
				let bodyNCS;
				if (slave.vagina < 0 && slave.dick <= 0) {
					bodyNCS = "childlike";
				} else if (slave.vagina < 0 && slave.dick > 0) {
					bodyNCS = "shota";
				} else if (slave.vagina > 0 && slave.dick <= 0) {
					bodyNCS = "loli";
				} else {
					bodyNCS = "loli/shota";
				}
				r += ` ${He} appears to be ${slave.visualAge} years old and ${he} `;
				if (slave.visualAge <= 8) {
					r += `has induced <span class="orange">NCS</span> and will always have a ${bodyNCS} body, no matter how long ${he} lives. `;
				} else if (slave.visualAge < 13) {
					r += `has induced <span class="orange">NCS</span> and will have a ${bodyNCS} body for the rest of ${his} life. `;
				} else if (slave.visualAge < 20) {
					r += `still has a teen body for now, but with ${his} <span class="orange">NCS,</span> ${he} will eventually regress in age to look like a little ${boy} again. `;
				} else {
					r += `still has the body of an adult, but ${his} <span class="orange">NCS</span> has `;
					if (slave.physicalAge - slave.visualAge <= 5) {
						r += `not really begun to youthen ${his} appearance yet. `;
					} else if (slave.physicalAge - slave.visualAge <= 10) {
						r += `clearly been at work on ${him}, making ${him} appear younger. `;
					} else if (slave.physicalAge - slave.visualAge <= 20) {
						r += `obviously helped take more than a decade off of ${his} age. `;
					} else {
						r += `intensely youthened ${him}. `;
					}
				}
			} else if (slave.physicalAge !== slave.visualAge) {
				if (slave.visualAge <= slave.physicalAge - 20 || slave.visualAge >= slave.physicalAge + 20) {
					r += ` ${He} has undergone radical age therapy that makes ${him} look `;
				} else if (slave.visualAge <= slave.physicalAge - 10 || slave.visualAge >= slave.physicalAge + 10) {
					r += ` ${He} has undergone drastic age therapy that makes ${him} look `;
				} else if (slave.visualAge <= slave.physicalAge - 5 || slave.visualAge >= slave.physicalAge + 5) {
					r += ` ${He} has undergone noticeable age therapy that makes ${him} look `;
				} else {
					r += ` For various reasons, ${he} looks `;
				}
				if (slave.physicalAge > slave.visualAge) {
					if (slave.physicalAge < slave.visualAge + 5) {
						r += `a slightly younger ${slave.visualAge}. `;
					} else if (slave.visualAge < 20) {
						r += `like ${he}'s barely an adult. `;
					} else if (slave.visualAge < 25) {
						r += `barely into ${his} early twenties. `;
					} else if (slave.visualAge < 30) {
						r += `like ${he}'s still in ${his} twenties. `;
					} else if (slave.visualAge < 35) {
						r += `barely thirty. `;
					} else if (slave.visualAge < 40) {
						r += `still in ${his} thirties. `;
					} else if (slave.visualAge < 45) {
						r += `barely forty. `;
					} else if (slave.visualAge < 50) {
						r += `still in ${his} forties. `;
					} else if (slave.visualAge < 55) {
						r += `barely fifty. `;
					} else if (slave.visualAge < 60) {
						r += `still in ${his} fifties. `;
					} else if (slave.visualAge < 65) {
						r += `barely sixty. `;
					} else if (slave.visualAge < 70) {
						r += `still in ${his} sixties. `;
					} else if (slave.visualAge < 75) {
						r += `barely seventy. `;
					} else if (slave.visualAge < 80) {
						r += `still in ${his} seventies. `;
					} else if (slave.visualAge < 85) {
						r += `barely eighty. `;
					} else if (slave.visualAge < 90) {
						r += `still in ${his} eighties. `;
					} else if (slave.visualAge < 95) {
						r += `barely ninety. `;
					} else if (slave.visualAge < 100) {
						r += `still in ${his} nineties. `;
					} else {
						r += `a younger ${slave.visualAge}. `;
					}
				} else {
					if (slave.physicalAge > slave.visualAge - 5) {
						r += `a slightly older ${slave.visualAge}. `;
					} else if (slave.visualAge < 20) {
						r += `like a fresh adult. `;
					} else if (slave.visualAge < 25) {
						r += `just over twenty. `;
					} else if (slave.visualAge < 30) {
						r += `nearly thirty. `;
					} else if (slave.visualAge < 35) {
						r += `just over thirty. `;
					} else if (slave.visualAge < 40) {
						r += `nearly forty. `;
					} else if (slave.visualAge < 45) {
						r += `just over forty. `;
					} else if (slave.visualAge < 50) {
						r += `nearly fifty. `;
					} else if (slave.visualAge < 55) {
						r += `just over fifty. `;
					} else if (slave.visualAge < 60) {
						r += `nearly sixty. `;
					} else if (slave.visualAge < 65) {
						r += `just over sixty. `;
					} else if (slave.visualAge < 70) {
						r += `nearly seventy. `;
					} else if (slave.visualAge < 75) {
						r += `just over seventy. `;
					} else if (slave.visualAge < 80) {
						r += `nearly eighty. `;
					} else if (slave.visualAge < 85) {
						r += `just over eighty. `;
					} else if (slave.visualAge < 90) {
						r += `nearly ninety. `;
					} else if (slave.visualAge < 95) {
						r += `just over ninety. `;
					} else {
						r += `an ancient ${slave.visualAge}. `;
					}
				}
			}
		}
	} else {
		r += ` The Fuckdoll gives no external indication of ${his} health or age, but upon query ${his} systems reports that ${he} is `;
		if (H.health < -90) {
			r += `<span class="red"> in dangerously poor health,</span>`;
		} else if (H.health < -50) {
			r += `<span class="red"> in poor health,</span>`;
		} else if (H.health < -20) {
			r += `<span class="red"> unhealthy,</span>`;
		} else if (H.health <= 20) {
			r += `<span class="yellow">healthy,</span>`;
		} else if (H.health <= 50) {
			r += `<span class="green">very healthy,</span>`;
		} else {
			r += `<span class="green">extremely healthy,</span>`;
		}
		r += ` and ${slave.physicalAge} years old.`;

		if (H.shortDamage !== 0 || H.longDamage !== 0 || H.illness > 1) {
			r += ` Diagnostics also report that`;

			if (H.shortDamage > 0) {
				r += ` ${he} is`;
			}
			if (H.shortDamage >= 100) {
				r += ` <span class="red">critically damaged</span>`;
			} else if (H.shortDamage >= 70) {
				r += ` <span class="red">gravely damaged</span>`;
			} else if (H.shortDamage >= 40) {
				r += ` <span class="red">seriouly damaged</span>`;
			} else if (H.shortDamage >= 20) {
				r += ` <span class="red">damaged</span>`;
			} else if (H.shortDamage > 0) {
				r += ` <span class="yellow">slightly damaged</span>`;
			}

			if (H.shortDamage !== 0 && H.longDamage !== 0 && H.illness > 1) {
				r += `,`;
			} else if (H.shortDamage !== 0 && H.longDamage !== 0) {
				r += ` and`;
			}
			if (H.longDamage > 0) {
				r += ` projected physical performance falls`;
			}
			if (H.longDamage >= 50) {
				r += ` <span class="red">far below benchmark margins</span>`;
			} else if (H.longDamage >= 30) {
				r += ` <span class="red">below benchmark margins</span>`;
			} else if (H.longDamage >= 10) {
				r += ` <span class="red">barely within benchmark margins</span>`;
			} else if (H.longDamage > 0) {
				r += ` <span class="yellow">just short of the optimal benchmark</span>`;
			}

			if ((H.shortDamage !== 0 || H.longDamage !== 0) && H.illness > 1) {
				r += ` and`;
			}
			if (H.illness > 1) {
				r += ` ${he} is`;
			}
			if (slave.health.illness === 2) {
				r += ` <span class="yellow">affected by a minor illness</span>`;
			} else if (slave.health.illness === 3) {
				r += ` <span class="red">affected by an illness</span>`;
			} else if (slave.health.illness === 4) {
				r += ` <span class="red">seriously affected by an illness</span>`;
			} else if (slave.health.illness === 5) {
				r += ` <span class="red">dangerously affected by an illness</span>`;
			}
		}
		r += `.`;
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's mods.
 */
App.Desc.mods = function(slave, surface) {
	if (V.showBodyMods !== 1) {
		return;
	}
	if (slave.fuckdoll !== 0 && !["anus", "lips", "vagina"].includes(surface)) { /* Fuckdoll vulva and anus alone are visible, plus enormous lips */
		return App.Desc.piercing(slave, surface); // Most piercings are part of the suit and have appropriate descriptions
	}
	return (
		App.Desc.piercing(slave, surface) +
		App.Desc.tattoo(slave, surface) +
		App.Desc.brand(slave, surface) +
		App.Desc.scar(slave, surface)
	);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's brand. Slave is the slave in question, but call the body part without modifiers. Rather than using "left breast" and "right breast" just use "breast". The function will then describe any brands on the breasts, if present, in natural language.
 */
App.Desc.brand = function(slave, surface) {
	"use strict";
	let r = ``;
	const bellyAccessory = slave.bellyAccessory;
	/* eslint-disable no-unused-vars*/
	const {
		he, him, his, hers, himself, boy, He, His
	} = getPronouns(slave);
	/* eslint-enable */
	if (State.variables.showBodyMods === 1) {
		if (surface === "extra") { // Make a sentence that describes all body parts that aren't explicitly described elsewhere in longSlave. If you brand a slave on her thumb, for instance. But why.
			let extraMarks = App.Desc.extraMarks(slave, "brand");
			extraMarks = Object.keys(extraMarks);
			let length = extraMarks.length;
			if (length === 0) {
				return r;
			} else if (length === 1) {
				r += `${He} also has a single unusual brand: `;
			} else {
				r += `${He} also has several unusual brands: `;
			}

			// If L/R parts of this object match, they will be described in the same phrase. Length is used only to calculate punctuation, so we prepare to skip.
			for (const bodyPart of extraMarks) {
				if (bodyPart.startsWith("left ")) {
					let right = "right " + bodyPart.replace("left ", "");
					if (slave.brand[bodyPart] && slave.brand[right]) {
						length--;
					}
				}
			}
			let counter = 0;
			for (const bodyPart of extraMarks) {
				counter++;
				surface = App.Desc.oppositeSides(bodyPart);
				if (slave.brand[surface.center]) { // center defined, body part has no mirror.
					r += `${slave.brand[surface.center]} branded into the flesh of ${his} ${surface.center}`;
				} else { // Center not defined, body part has a mirror.
					if (!slave.brand[surface.left] && !slave.brand[surface.right]) {
						// no marks
					} else if (bodyPart.startsWith("right ") && slave.brand[surface.left]) {
						// we already described it on the left
					} else if (slave.brand[surface.left] === slave.brand[surface.right]) {
						// matching places and marks
						// note that the slave.brand object won't have slave.brand["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
						r += `${slave.brand[surface.left]} branded into the flesh of both ${his} ${surface.both}`;
					} else if (slave.brand[surface.left] && slave.brand[surface.right]) {
						// matching places but different marks
						r += `both ${slave.brand[surface.left]} branded into the flesh of ${his} ${surface.left}, and ${slave.brand[surface.right]} branded into ${his} ${surface.right}`;
					} else if (slave.brand[surface.left]) {
						// left
						r += `${slave.brand[surface.left]} branded into the flesh of ${his} ${surface.left}`;
					} else if (slave.brand[surface.right]) {
						// right
						r += `${slave.brand[surface.right]} branded into the flesh of ${his} ${surface.right}`;
					}
				}
				if (counter === length) {
					r += `. `;
				} else if (counter === length - 1) {
					r += `, and `;
				} else if (counter < length) {
					r += `, `;
				}
			}
		} else if (surface) { /* describes a single branded body part */
			if (surface === "belly" && setup.fakeBellies.includes(bellyAccessory) && slave.brand.belly) {
				r += `${His} fake belly has the same brand, ${slave.brand.belly}, as ${his} real one. `;
			} else {
				surface = App.Desc.oppositeSides(surface);
				if (slave.brand[surface.center]) { // center defined, body part has no mirror.
					r += `${He} has ${slave.brand[surface.center]} branded into the flesh of ${his} ${surface.center}. `;
				} else { // Center not defined, body part has a mirror.
					if (!slave.brand[surface.left] && !slave.brand[surface.right]) {
						// no marks
					} else if (slave.brand[surface.left] === slave.brand[surface.right]) {
						// matching places and marks
						// note that the slave.brand object won't have slave.brand["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
						r += `${He} has ${slave.brand[surface.left]} branded into the flesh of both ${his} ${surface.both}. `;
					} else if (slave.brand[surface.left] && slave.brand[surface.right]) {
						// matching places but different marks
						r += `${He} has both ${slave.brand[surface.left]} branded into the flesh of ${his} ${surface.left}, and ${slave.brand[surface.right]} branded into ${his} ${surface.right}. `;
					} else if (slave.brand[surface.left]) {
						// left
						r += `${He} has ${slave.brand[surface.left]} branded into the flesh of ${his} ${surface.left}. `;
					} else if (slave.brand[surface.right]) {
						// right
						r += `${He} has ${slave.brand[surface.right]} branded into the flesh of ${his} ${surface.right}. `;
					}
				}
			}
		} else { /* describes all branded body parts */
			for (let [key, value] of Object.entries(slave.brand)) {
				if (r === ``) {
					r += `${He} has `;
				}
				if (key === "belly" && setup.fakeBellies.includes(bellyAccessory) && slave.brand.belly) {
					r += `${value} branded on both ${his} real belly and ${his} fake one, `;
				} else {
					r += `${value} branded into the flesh of ${his} ${key}, `;
				}
			}
			if (r !== ``) {
				r += `marking ${him} as yours. `;
			} else {
				r += `${His} body is unmarked by brands. `;
			}
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's scar. Slave is the slave in question, but call the body part without modifiers. Rather than using "left breast" and "right breast" just use "breast". The function will then describe any scars on the breasts, if present, in natural language.
 */
App.Desc.scar = function(slave, surface) {
	"use strict";
	let r = ``;
	const bellyAccessory = slave.bellyAccessory;
	/* eslint-disable no-unused-vars*/
	const {
		he, him, his, hers, himself, boy, He, His
	} = getPronouns(slave);
	/* eslint-enable */
	if (State.variables.showBodyMods === 1) {
		if (surface === "extra") { // Make a sentence that describes all body parts that aren't explicitly described elsewhere in longSlave. If you scar a slave on her thumb, for instance. But why.
			let extraMarks = App.Desc.extraMarks(slave, "scar");
			extraMarks = Object.keys(extraMarks);
			let length = extraMarks.length;
			if (length === 0) {
				return r;
			} else if (length === 1) {
				r += `${He} also has a single unusual scar: `;
			} else {
				r += `${He} also has several unusual scars: `;
			}

			// If L/R parts of this object match, they will be described in the same phrase. Length is used only to calculate punctuation, so we prepare to skip.
			for (const bodyPart of extraMarks) {
				if (bodyPart.startsWith("left ")) {
					let right = "right " + bodyPart.replace("left ", "");
					if (slave.scar[bodyPart] && slave.scar[right]) {
						length--;
					}
				}
			}
			let counter = 0;
			for (const bodyPart of extraMarks) {
				counter++;
				surface = App.Desc.oppositeSides(bodyPart);
				if (slave.scar[surface.center]) { // center defined, body part has no mirror.
					r += `${App.Desc.expandScarString(slave, surface.center)} on ${his} ${surface.center}`;
				} else { // Center not defined, body part has a mirror.
					let left = App.Desc.expandScarString(slave, surface.left);
					let right = App.Desc.expandScarString(slave, surface.right);
					if (!slave.scar[surface.left] && !slave.scar[surface.right]) {
						// no marks
					} else if (bodyPart.startsWith("right ") && slave.scar[surface.left]) {
						// we already described it on the left
					} else if (left === right) {
						// matching places and marks
						// note that the slave.scar object won't have slave.scar["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
						r += `${left} on both ${his} ${surface.both}`;
					} else if (slave.scar[surface.left] && slave.scar[surface.right]) {
						// matching places but different marks
						r += `both ${left} on ${his} ${surface.left}, and ${right} scared into ${his} ${surface.right}`;
					} else if (slave.scar[surface.left]) {
						// left
						r += `${left} on ${his} ${surface.left}`;
					} else if (slave.scar[surface.right]) {
						// right
						r += `${right} on ${his} ${surface.right}`;
					}
				}
				if (counter === length) {
					r += `. `;
				} else if (counter === length - 1) {
					r += `, and `;
				} else if (counter < length) {
					r += `, `;
				}
			}
		} else if (surface) { /* describes a single scarred body part */
			surface = App.Desc.oppositeSides(surface);
			if (surface.center === "belly" && setup.fakeBellies.includes(bellyAccessory) && slave.scar.hasOwnProperty("belly")) {
				r += `${His} fake belly has the same scar, ${App.Desc.expandScarString(slave, surface.center)}, as ${his} real one. `;
			} else {
				if (slave.scar[surface.center]) { // center defined, body part has no mirror.
					r += `${He} has ${App.Desc.expandScarString(slave, surface.center)} on ${his} ${surface.center}. `;
				} else { // Center not defined, body part has a mirror.
					let left = App.Desc.expandScarString(slave, surface.left);
					let right = App.Desc.expandScarString(slave, surface.right);
					if (!slave.scar[surface.left] && !slave.scar[surface.right]) {
						// no marks
					} else if (left === right) {
						// matching places and marks
						// note that the slave.scar object won't have slave.scar["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
						r += `${He} has ${left} on both ${his} ${surface.both}. `;
					} else if (slave.scar[surface.left] && slave.scar[surface.right]) {
						// matching places but different marks
						r += `${He} has both ${left} on ${his} ${surface.left}, and ${right} scared into ${his} ${surface.right}. `;
					} else if (slave.scar[surface.left]) {
						// left
						r += `${He} has ${left} on ${his} ${surface.left}. `;
					} else if (right) {
						// right
						r += `${He} has ${right} on ${his} ${surface.right}. `;
					}
				}
			}
		} else { /* describes all scarred body parts */
			for (let [key, value] of Object.entries(slave.scar)) {
				if (r === ``) {
					r += `${He} has `;
				}
				if (key === "belly" && setup.fakeBellies.includes(bellyAccessory) && slave.scar.hasOwnProperty("belly")) {
					r += `${value} scared on both ${his} real belly and ${his} fake one, `;
				} else {
					r += `${value} on ${his} ${key}, `;
				}
			}
			if (r !== ``) {
				r += `marking ${him} as yours. `;
			} else {
				r += `${His} body is unmarked by scars. `;
			}
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's scar. Slave is the slave in question, but call the body part without modifiers. Rather than using "left breast" and "right breast" just use "breast". The function will then describe any scars on the breasts, if present, in natural language.
 */
App.Desc.expandScarString = function(slave, surface) { // scars can sometimes be an int. This function generates a reasonable description. It can later be expanded to apply to different body parts, or include features of the slave such as skin tone or weight
	let r = "";
	if (!slave.scar[surface]) {
		return r;
	}
	const bodypart = Object.keys(slave.scar[surface]);
	for (const kind of bodypart) {
		let scar = slave.scar[surface][kind];
		if (scar === 0) {
			continue;
		}
		if (r !== "") {
			r += ", ";
		}
		switch (kind) {
			case "generic":
				r += "a generic scar";
				break;
			case "whip":
				if (["back"].includes(surface)) {
					r += "a ";
					if (scar > 2) {
						r += "deeply scored ";
					}
					if (scar > 1) {
						r += "network of welts like a map of hell";
					} else {
						r += "record of being beaten";
					}
				} else if (["left breast", "right breast", "left buttock", "right buttock"].includes(surface)) {
					if (scar > 2) {
						r += "thick ";
					} else {
						r += "thin ";
					}
					r += "raised lines from a whip tracing the curves";
				} else if (["left upper arm", "right upper arm"].includes(surface)) {
					r += "rough edges where a whip abused $his skin";
				} else {
					if (scar > 2) {
						r += "frightening ";
					} else if (scar > 1) {
						r += "serious ";
					}
					r += "whip scars";
				}
				break;
			case "chain":
				if (["left wrist", "right wrist", "left ankle", "right ankle"].includes(surface)) {
					if (scar > 1) {
						r += "scars from heavy manacles";
					} else {
						r += "scars from manacles";
					}
				} else {
					if (scar > 1) {
						r += "scars from heavy chains";
					} else {
						r += "scars from chains";
					}
				}
				break;
			case "burn":
				if (scar > 2) {
					r += "frightening ";
				} else if (scar > 1) {
					r += "serious ";
				}
				r += "burn scars";
				break;
			case "menacing":
				r += "a menacing scar";
				break;
			case "exotic":
				r += "an exotic scar";
				break;
			case "surgical":
				if (surface === "left breast" || surface === "right breast") {
					if (slave.boobsImplant > 0) {
						r += "scars from ";
						if (scar > 3) {
							r += "horribly botched ";
						} else if (scar > 2) {
							r += "sloppily inserted ";
						} else if (scar > 1) {
							r += "carelessly inserted ";
						}
						r += "implants";
					} else {
						r += "scars from ";
						if (scar > 3) {
							r += "horribly botched ";
						} else if (scar > 2) {
							r += "sloppily done ";
						} else if (scar > 1) {
							r += "carelessly done ";
						}
						r += "surgery to remove implants";
					}
				} else if (surface === "left buttock" || surface === "right buttock") {
					if (slave.buttImplant > 0) {
						r += "scars from ";
						if (scar > 3) {
							r += "horribly botched ";
						} else if (scar > 2) {
							r += "sloppily inserted ";
						} else if (scar > 1) {
							r += "carelessly inserted ";
						}
						r += "implants";
					} else {
						r += "scars from ";
						if (scar > 3) {
							r += "horribly botched ";
						} else if (scar > 2) {
							r += "sloppily done ";
						} else if (scar > 1) {
							r += "carelessly done ";
						}
						r += "surgery to remove implants";
					}
				} else if (surface === "belly" ) {
					r += "scars from ";
					if (scar > 1) {
						r += "a crazy network of scars, as though a hack had tried internal surgery";
					} else {
						r += "some faint scarring as though from internal surgery";
					}
				} else {
					r += "a ";
					if (scar > 1) {
						r += "pronounced ";
					} else {
						r += "faint ";
					}
					r += "surgical scar";
				}
				break;
			case "c-section":
				r += "an ";
				if (scar > 1) {
					r += "especially ";
				}
				r += "unsightly c-section scar";
				break;
			case "cutting":
				if (["left wrist", "right wrist", "neck"].includes(surface)) {
					r += "some scars as though $he attempted self harm";
				} else {
					r += "some cuts as though from a razor";
				}
				break;
			default:
				if (scar > 2) {
					r += "serious ";
				} else if (scar) {
					r += kind;
				}
				break;
		}
	}
	r = r.replace(/,(?=[^,]*$)/, ' and'); /* replace the last comma with the word "and" so we can use this in a sentence.*/
	return r;
};


/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Description of slave's limbs
 */
App.Desc.limbs = function(slave) {
	"use strict";
	let r = ``;
	/* eslint-disable no-unused-vars*/
	const {
		he, his, He
	} = getPronouns(slave);
	/* eslint-enable */

	/* TODO @Arkerthan
	description similar in style to the commented out one instead of this simple version.
	*/

	if (isAmputee(slave)) {
		r += `${He} is a quadruple amputee and has not been equipped with prosthetics`;
	} else if (getLeftArmID(slave) === getRightArmID(slave) &&
		getLeftArmID(slave) === getLeftLegID(slave) &&
		getLeftArmID(slave) === getRightLegID(slave)) {
		if (getLeftArmID(slave) !== 1) {
			r += `${He} has ${idToDescription(getLeftArmID(slave))} limbs`;
		}
	} else {
		if (!hasAnyArms(slave)) {
			r += `Both of ${his} arms have been amputated`;
		} else if (!hasBothArms(slave)) {
			if (hasLeftArm(slave)) {
				r += `${He} has ${addA(idToDescription(getLeftArmID(slave)))} left arm, but ${his} right has been amputated,`;
			} else {
				r += `${He} has ${addA(idToDescription(getRightArmID(slave)))} right arm, but ${his} left has been amputated,`;
			}
		} else {
			if (getLeftArmID(slave) === getRightArmID(slave)) {
				r += `${He} has ${idToDescription(getLeftArmID(slave))} arms`;
			} else {
				r += `${He} has ${addA(idToDescription(getRightArmID(slave)))} right arm, but ${addA(idToDescription(getLeftArmID(slave)))} left arm`;
			}
		}
		r += ` and `;
		if (!hasAnyLegs(slave)) {
			r += `both of ${his} legs have been amputated`;
		} else if (!hasBothLegs(slave)) {
			if (hasLeftLeg(slave)) {
				r += `${he} has ${addA(idToDescription(getLeftLegID(slave)))} left leg, but ${his} right has been amputated`;
			} else {
				r += `${he} has ${addA(idToDescription(getRightLegID(slave)))} right leg, but ${his} left has been amputated`;
			}
		} else {
			if (getLeftLegID(slave) === getRightLegID(slave)) {
				r += `${he} has ${idToDescription(getLeftLegID(slave))} legs`;
			} else {
				r += `${he} has ${addA(idToDescription(getRightLegID(slave)))} right leg, but ${addA(idToDescription(getLeftLegID(slave)))} left leg`;
			}
		}
	}

	if (r !== "") {
		return r + `. `;
	}
	/*
	if (slave.am p) {
		if (slave.am p === -1) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with a set of modern prosthetic limbs that allow ${him} a fairly normal life. `;
		} else if (slave.am p === -2) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with P-Limbs customized for sex. ${His} fingertips vibrate, ${his} finger joints are masked to prevent pinching, and ${his} hands can dispense lube. `;
		} else if (slave.am p === -3) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with P-Limbs customized to look natural. They are covered in a material that closely mimics living ${slave.skin} skin, and their servos are noise dampened. `;
		} else if (slave.am p === -4) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with P-Limbs customized for combat. They're hardened, strengthened, and more responsive, and they conceal taser knuckles and extensible forearm blades. `;
		} else if (slave.am p === -5) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with advanced cybernetic P-Limbs. The ultimate fusion of combat effectiveness and instruments of pleasure, they're capable of performing multiple functions. They can enhance sex through ${his} vibrating hands and increase ${his} combat skills with hardened, yet flexible artificial muscles. They have an advanced artificial skin that can send electrical impulses that can cause stimulation or extreme pain. `;
		} else if (slave.am p > 0) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> making ${him} a convenient torso-only sex toy. `;
		} else {
			r += `The most obvious thing about ${slave.slaveName} is that ${he} is a <span class="pink">quadruple amputee:</span> ${he} has neither arms nor legs. `;
		}
		return r;
	}*/
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.inscrip = function(slave) {
	function fetishToObject() {
		switch (slave.fetish) {
			case "buttslut":
				return "Buttsex!";
			case "cumslut":
				return "Cum!";
			case "masochist":
			case "sadist":
				return "Rape!";
			case "dom":
				return "Topping!";
			case "submissive":
				return "Subbing!";
			case "boobs":
				return "Tits!";
			case "pregnancy":
				return "Sperm!";
		}
		if (slave.energy > 95) {
			return "Cock!";
		}
		return null;
	}

	let object = slave.fetishKnown === 1 ? fetishToObject() : null;
	if (!object) {
		object = V.PC.title === 0 ? "Mistress!" : "Master!";
	}
	return `"I <3 ${object}"`;
};

/**
 * @param {string} surface
 * @returns {object} Checks if body part has an opposite side. Returns an object with the appropriate part as center if it has no mirror, or left/right/both if it does.
 */
App.Desc.oppositeSides = function(surface) {
	let parts = {};
	if (["ear", "cheek", "shoulder", "breast", "upper arm", "lower arm", "hand", "wrist", "testicle", "buttock", "thigh", "calf", "ankle", "foot"].includes(surface) || surface.startsWith("left ") || surface.startsWith("right ")) {
		// set up a left part and a right to check for a mirror brand or marking
		if (surface.startsWith("left ") || surface.startsWith("right ")) {
			// find root word
			if (surface.startsWith("left ")) {
				surface = surface.replace("left ", "");
			} else if (surface.startsWith("right ")) {
				surface = surface.replace("right ", "");
			}
		} else if (surface === "feet") {
			parts.both = surface;
			surface = "foot";
		} else if (surface === "calves") {
			parts.both = surface;
			surface = "calf";
		}
		parts.left = "left " + surface;
		parts.right = "right " + surface;
		if (!parts.both) {
			parts.both = surface + "s";
		}
	} else {
		parts.center = surface;
	}
	return parts;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} markType
 * @returns {object} Returns an object containing marks that are not explicitly described elsewhere, so they can be placed in a single sentence.
 */
App.Desc.extraMarks = function(slave, markType) {
	let extras = {};
	let slaveMarks = Object.keys(slave[markType]);
	if (["brand", "scar"].includes(markType)) {
		for (const bodyPart of slaveMarks) {
			if ([
				"left ear", "right ear",
				"left cheek", "right cheek",
				"lips", "neck",
				"left shoulder", "right shoulder",
				"left breast", "right breast",
				"left upper arm", "right upper arm",
				"left lower arm", "right lower arm",
				"left hand", "right hand",
				"left wrist", "right wrist",
				"back", "lower back",
				"penis",
				"left testicle", "right testicle",
				"pubic mound",
				"belly",
				"left buttock", "right buttock",
				"anus", "asshole",
				"left thigh", "right thigh",
				"left calf", "right calf",
				"left ankle", "right ankle",
				"left foot", "right foot"
			].includes(bodyPart)) {
				continue;
			} else {
				extras[bodyPart] = slave[markType][bodyPart];
			}
		}
	}
	return extras;
};


/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} short description of the slaves limbs.
 */
App.Desc.shortLimbs = function(slave) {
	let r = "";
	function desc(id, limb) {
		switch (id) {
			case 0:
				return limb + "Amp ";
			case 1:
				return "";
			case 2:
				return limb + "P-Limb ";
			case 3:
				return limb + "Sex P-Limb ";
			case 4:
				return limb + "Beauty P-Limb ";
			case 5:
				return limb + "Combat P-Limb ";
			case 6:
				return limb + "Cyber P-Limb ";
			default:
				return "unknown ID: " + id;
		}
	}

	if (getLeftArmID(slave) === getRightArmID(slave) &&
			getLeftArmID(slave) === getLeftLegID(slave) &&
			getLeftArmID(slave) === getRightLegID(slave)) {
		r += desc(getLeftArmID(slave), "");
	} else {
		if (getLeftArmID(slave) === getRightArmID(slave)) {
			r += desc(getLeftArmID(slave), "Arms:");
		} else {
			r += desc(getLeftArmID(slave), "LArm:");
			r += desc(getRightArmID(slave), "RArm:");
		}

		if (getLeftLegID(slave) === getRightLegID(slave)) {
			r += desc(getLeftLegID(slave), "Legs:");
		} else {
			r += desc(getLeftLegID(slave), "LLeg:");
			r += desc(getRightLegID(slave), "RLeg:");
		}
	}

	r += " ";
	if (!canWalk(slave)) {
		r += " Immob ";
	}
	if (slave.heels === 1) {
		r += " Heel ";
	}

	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} long description of the slaves limbs.
 */
App.Desc.longLimbs = function(slave) {
	let r = "";
	switch (getLimbCount(slave, 0)) {
		case 1:
			r += "Amputee. ";
			break;
		case 2:
			r += "Double Amputee. ";
			break;
		case 3:
			r += "Triple Amputee. ";
			break;
		case 4:
			r += "Quadruple Amputee. ";
			break;
	}

	if (hasAnyProstheticLimbs(slave)) {
		// count limbs
		switch (getLimbCount(slave, 102)) {
			case 1:
				r = "One ";
				break;
			case 2:
				r = "Two ";
				break;
			case 3:
				r = "Three ";
				break;
			case 4:
				r = "Four ";
				break;
		}

		// find out if all prosthetics are the same:
		let id;
		let count = 0;

		if (getLeftArmID(slave) >= 2) {
			id = getLeftArmID(slave);
			count++;
		}
		if (getRightArmID(slave) >= 2) {
			if (id) {
				if (id === getRightArmID(slave)) {
					count++;
				}
			} else {
				id = getRightArmID(slave);
				count++;
			}
		}
		if (getLeftLegID(slave) >= 2) {
			if (id) {
				if (id === getLeftLegID(slave)) {
					count++;
				}
			} else {
				id = getLeftLegID(slave);
				count++;
			}
		}
		if (getRightLegID(slave) >= 2) {
			if (id) {
				if (id === getRightLegID(slave)) {
					count++;
				}
			} else {
				id = getRightLegID(slave);
				count++;
			}
		}

		if (count === getLimbCount(slave, 102)) { // all prosthetics are the same
			switch (id) {
				case 3:
					r += "sexy ";
					break;
				case 4:
					r += "beautiful ";
					break;
				case 5:
					r += "deadly ";
					break;
				case 6:
					r += "cyber ";
					break;
			}
			if (count > 1) {
				r += "prosthetic limbs. ";
			} else {
				r += "prosthetic limb. ";
			}
		} else {
			// only reachable with count > 1
			r += "mixed prosthetic limbs. ";
		}
	}

	if (!canWalk(slave)) {
		r += "Immobile. ";
	}
	if (slave.heels === 1) {
		r += "Heeled. ";
	}

	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} long description of the slave's sexual history.
 */
App.Desc.sexualHistory = function(slave) {
	const {He, he, his} = getPronouns(slave);
	const weeksOwned = V.week - slave.weekAcquired;

	let r = `${He} has been with you `;
	if (slave.weekAcquired === 0) {
		r += `since before you owned the arcology, `;
	} else if (slave.weekAcquired === 1) {
		r += `since you first took control of the arcology, `;
	} else {
		r += `${numberWithPluralOne(Math.max(weeksOwned, 1), "week")}, `;
	}

	const sexTypes = ["mammary", "vaginal", "anal", "penetrative", "oral"];
	const totalSex = sexTypes.reduce((res, el) => res += slave.counter[el], 0);
	if (totalSex > 0) {
		r += `and has been fucked about ${num(totalSex)} times, including `;
		const sexNames = {
			mammary: "mammary",
			vaginal: "vanilla",
			anal: "anal",
			penetrative: "penetrating",
			oral: "oral"
		};
		r += sexTypes.filter((t) => slave.counter[t] > 0)
					 .map((t) => `${num(slave.counter[t])} ${sexNames[t]}`)
					 .reduce((res, ch, i, arr) => res + (i === arr.length - 1 ? ' and ' : ', ') + ch);
		r += ` sexual encounters. `;
	} else {
		r += `and has had little or no sexual experience ${slave.weekAcquired > 0 ? "as your slave" : "in your new arcology"} yet. `;
	}

	if (weeksOwned > 0) {
		const sexDescriptions = {
			mammary: `${he}'s put his tits to work`,
			vaginal: `${his} pussy has been fucked`,
			anal: `${he}'s been buttfucked`,
			penetrative: `${he}'s pounded a hole`,
			oral: `${he}'s sucked something off`
		};
		const getSexTypeScaled = (t) => slave.counter[t] * ((t === "oral") ? 0.5 : 1.0);
		const biggestSexType = sexTypes.reduce((res, el) => (getSexTypeScaled(el) > getSexTypeScaled(res)) ? el : res);
		const frequency = (weeksOwned * 112) / slave.counter[biggestSexType];
		if (frequency < 4.5) {
			r += `Remarkably, this means ${sexDescriptions[biggestSexType]} `;
			if (frequency < 1) {
				r += `more than once every hour `;
			} else if (frequency < 1.5) {
				r += `about once every hour `;
			} else {
				r += `about once every ${num(Math.round(frequency), true)} hours `;
			}
			r += `${he}'s spent awake. `;
		}
	}

	if (slave.lactation > 0 && slave.counter.milk < 20) {
		r += `${He} has given a small quantity of milk `;
		if (slave.counter.cum > 0) {
			r += ` and about ${num(slave.counter.cum)} deciliters of cum`;
		}
		r += `. `;
	} else if (slave.counter.milk > 1) {
		r += `${He} has given about ${num(slave.counter.milk)} liters of milk`;
		if (slave.counter.cum > 0) {
			r += ` and about ${num(slave.counter.cum)} deciliters of cum`;
		}
		r += `. `;
	}

	if (slave.counter.birthsTotal > 0) {
		r += `${He} has given birth a total of ${numberWithPluralOne(slave.counter.birthsTotal, "time")}; `;
		if (slave.counter.birthsTotal === slave.counter.births) {
			if (slave.counter.births === 1) {
				r += `it happened `;
			} else if (slave.counter.births === 2) {
				r += `both of them happened `;
			} else {
				r += `all of them happened `;
			}
		} else if (slave.counter.births === 1) {
			r += `one of them happened `;
		} else if (slave.counter.births > 1) {
			r += `${slave.counter.births} of them happened `;
		} else if (slave.counter.birthsTotal === 1) {
			r += `it did not happen `;
		} else {
			r += `none of them happened `;
		}
		r += `within the walls of ${V.arcologies[0].name}. `;
	}

	if (slave.counter.slavesKnockedUp > 0) {
		r += `${He}'s knocked up ${numberWithPluralOne(slave.counter.slavesKnockedUp, "other slave girl")} `;
		if (slave.counter.slavesFathered > 0) {
			r += `and fathered ${numberWithPluralOne(slave.counter.slavesKnockedUp, "new slave")} `;
		}
		r += `for you. `;
	} else if (slave.counter.slavesFathered > 0) {
		r += `${He}'s fathered ${numberWithPluralOne(slave.counter.slavesKnockedUp, "new slave")} for you. `;
	}
	if (slave.counter.PCKnockedUp > 0) {
		r += `${He}'s managed to knock you up ${numberWithPluralOne(slave.counter.PCKnockedUp, "time")}`;
		if (slave.counter.PCChildrenFathered > 0) {
			r += ` and is the father of ${slave.counter.PCChildrenFathered} of your children`;
		}
		r += `. `;
	} else if (slave.counter.PCChildrenFathered > 0) {
		r += `${He}'s the father of ${slave.counter.PCChildrenFathered} of your children.`;
	}

	return r;
};
