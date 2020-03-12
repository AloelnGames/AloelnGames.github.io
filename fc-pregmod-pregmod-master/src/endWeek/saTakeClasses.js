window.saTakeClasses = (function saTakeClasses() {
	"use strict";

	let r;

	let he, him, his, hers, himself, girl, loli, He, His;

	let learning;
	let teaching;

	return saTakeClasses;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function saTakeClasses(slave) {
		r = ` `;
		learning = 1;
		teaching = 0;
		({
			// eslint-disable-next-line no-unused-vars
			he, him, his, hers, himself, girl, He, His, loli
		} = getPronouns(slave));

		if (slave.fetish !== "mindbroken") {
			jobPreface(slave);
			learningDisability(slave);
			jobHealthImpact(slave);
			learningProgress(slave);
			if (slave.lactation > 0) {
				lactationBreak(slave);
			}
			skillLessons(slave);
			generalLessons(slave);
			if (slave.accent > 1 && slave.voice !== 0) {
				speechLessons(slave);
			}
		}
		graduation(slave);
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobPreface(slave) {
		if (slave.fetish === "mindbroken") {
			r += `is no longer mentally capable and <span class="noteworthy">has been dropped from class.</span>`;
			slave.health.tired = Math.clamp(slave.health.tired - 10, 0, 100); // Since they avoid the tired call altogether, just toss them some reduction. It's not like they were listening anyway.
			if (slave.assignment === "take classes") {
				removeJob(slave, "take classes");
			}
		} else {
			r += `takes courses in slavery`;
			if (V.schoolroomUpgradeSkills + V.schoolroomUpgradeRemedial + V.schoolroomUpgradeLanguage !== 0) {
				r += `, using ${V.schoolroomName}'s improved educational materials,`;
			}
			if (slave.assignment === "learn in the schoolroom" && V.Schoolteacher !== 0) {
				const schoolteacherPronouns = getPronouns(V.Schoolteacher);
				teaching = (V.Schoolteacher.intelligence + V.Schoolteacher.intelligenceImplant);
				if (V.Schoolteacher.visualAge > 35) {
					teaching += 10;
				}
				if (setup.schoolteacherCareers.includes(V.Schoolteacher.career)) {
					teaching += 10;
				} else if (V.Schoolteacher.skill.teacher >= V.masteredXP) {
					teaching += 10;
				}
				if (V.Schoolteacher.face > 40) {
					teaching += 10;
				}
				if (jsRandom(1, 150) < teaching) {
					learning += 1;
				}
				r += ` under ${V.Schoolteacher.slaveName}'s supervision;`;
				if (slave.devotion > 20) {
					r += ` ${he} is such an obedient slave that ${schoolteacherPronouns.pronoun} <span class="devotion inc">encourages ${him}</span> to be the best slave ${he} can.`;
					slave.devotion += 2;
				} else if (slave.trust < -20) {
					r += ` ${he} obeys out of fear, so ${schoolteacherPronouns.pronoun} <span class="devotion inc">encourages ${him}</span> to be a better slave.`;
					slave.devotion++;
				} else {
					r += ` ${he} is resistant, so ${schoolteacherPronouns.pronoun} ends up mostly <span class="trust dec">punishing ${him},</span> increasing ${his} <span class="devotion dec">dislike for slavery.</span>`;
					slave.devotion -= 2;
					slave.trust -= 4;
				}
			} else {
				r += ` under ${V.assistant.name}'s supervision;`;
				if (slave.devotion > 20) {
					r += ` ${he} is such an obedient slave that ${V.assistant.name} mostly <span class="devotion inc">encourages ${him}.</span>`;
					slave.devotion += 2;
				} else if (slave.trust < -20) {
					r += ` ${he} obeys out of fear, so ${V.assistant.name} mostly <span class="devotion inc">encourages ${him}</span> to be a better slave.`;
					slave.devotion++;
				} else {
					r += ` ${he} is resistant, so ${V.assistant.name} mostly <span class="trust dec">punishes ${him},</span> increasing ${his} <span class="devotion dec">dislike for slavery.</span>`;
					slave.devotion -= 2;
					slave.trust -= 4;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function learningDisability(slave) {
		if (!canHear(slave) && !canSee(slave)) {
			r += ` With ${his} inability to hear and see, absorbing the content is extremely difficult.`;
			learning -= 3;
		} else if (!canHear(slave) || !canSee(slave)) {
			r += ` With ${his} impairments, ${he} needs special lessons to properly learn.`;
			learning -= 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobHealthImpact(slave) {
		if (slave.health.illness > 0 || slave.health.tired > 90) {
			r += ` ${He} performed worse this week due to<span class="red">`;
			if (slave.health.illness === 1) {
				r += ` feeling under the weather`;
				learning--;
			} else if (slave.health.illness === 2) {
				r += ` a minor illness`;
				learning--;
			} else if (slave.health.illness === 3) {
				r += ` being sick`;
				learning -= 2;
			} else if (slave.health.illness === 4) {
				r += ` being very sick`;
				learning -= 2;
			} else if (slave.health.illness === 5) {
				r += ` a terrible illness`;
				learning -= 3;
			}
			if (slave.health.illness > 0 && slave.health.tired > 60) {
				r += ` and`;
			}
			if (slave.health.tired > 90) {
				r += ` exhaustion`;
				learning -= 3;
			} else if (slave.health.tired > 60) {
				r += ` fatigue`;
				learning--;
			}
			r += `.</span>`;
		}
		r += ` ${His} lessons are not physically demanding, `;
		if (slave.rules.living === "spare") {
			r += `allowing ${him} ample rest despite ${his} sparse living conditions.`;
		} else {
			r += `allowing ${him} ample time for rest.`;
		}
		if (slave.tired > 80) {
			r += ` ${He} still finds ${himself} dozing off during class, however.`;
			learning--;
		}
		tired(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function learningProgress(slave) {
		if (V.schoolroomRemodelBimbo !== 1 || slave.assignment !== "learn in the schoolroom") {
			if (slave.intelligence > 95) { /* 200% education for brilliant */
				learning += 2;
			} else if (slave.intelligence > 50) { /* normal for very smart */
				learning++;
			} else if (slave.intelligence > 15) { /* 70% for smart */
				if (jsRandom(1, 100) < 70) {
					learning++;
				}
			} else if (slave.intelligence >= -15) { /* 50% for average */
				if (jsRandom(1, 100) < 50) {
					learning++;
				}
			} else { /* slow, very slow, and retards */
				let slaveDensity = (50 + slave.intelligence);
				if (V.schoolroomUpgradeRemedial === 1 && jsRandom(1, 100) < 50) { /* 50% chance to benefit from upgrade */
					slaveDensity = 55;
				}
				if (jsRandom(1, 100) < slaveDensity) { /* 55% with upgrade, [-50 to 34]% without, mapped from [-100 to -16] intelligence */
					learning++;
				}
			}
		} else {
			if (slave.intelligence < -95) { /* 200% de-education for retards */
				learning += 2;
			} else if (slave.intelligence < -50) { /* normal for very slow */
				learning++;
			} else if (slave.intelligence < -15) { /* 70% for slow */
				if (jsRandom(1, 100) < 70) {
					learning++;
				}
			} else if (slave.intelligence <= 15) { /* 50% for average */
				if (jsRandom(1, 100) < 50) {
					learning++;
				}
			} else { /* smart, very smart, and brilliant */
				let slaveDensity = (50 - slave.intelligence);
				if (V.schoolroomUpgradeRemedial === 1 && jsRandom(1, 100) < 50) { /* 50% chance to benefit from upgrade */
					slaveDensity = 55;
				}
				if (jsRandom(1, 100) < slaveDensity) { /* 55% with upgrade, [-50 to 34]% without, mapped from [100 to 16] intelligence */
					learning++;
				}
			}
		}
		r += ` ${He} is `;
		if (slave.intelligence > 95) {
			r += `a genius,`;
		} else if (slave.intelligence > 50) {
			r += `highly intelligent`;
		} else if (slave.intelligence > 15) {
			r += `of above average intelligence`;
		} else if (slave.intelligence >= -15) {
			r += `of average intelligence`;
		} else if (slave.intelligence >= -50) {
			r += `of below average intelligence`;
		} else if (slave.intelligence >= -95) {
			r += `quite stupid`;
		} else {
			r += `an imbecile,`;
		}
		if (slave.devotion > 95) {
			r += ` and worshipful of you,`;
			learning++;
		} else if (slave.devotion > 50) {
			r += ` and devoted to you,`;
			if (jsRandom(1, 100) < 70) {
				learning++;
			}
		} else if (slave.devotion > 20) {
			r += ` and obedient to you,`;
			if (jsRandom(1, 100) < 50) {
				learning++;
			}
		} else if (slave.trust < -20) {
			r += ` and frightened of you,`;
			if (jsRandom(1, 100) < 40) {
				learning++;
			}
		} else {
			r += ` and neither likes you nor is afraid of you,`;
		}

		r += ` and ${he} `;
		if (V.schoolroomRemodelBimbo !== 1 || slave.assignment !== "learn in the schoolroom") {
			if (learning <= 1) {
				r += `learns slowly`;
			} else if (learning === 2) {
				r += `does well with ${his} studies`;
			} else {
				r += `is perfectly studious`;
			}
		} else {
			if (learning <= 1) {
				r += `struggles with the lessons`;
			} else if (learning === 2) {
				r += `makes progress with the materials`;
			} else {
				r += `breezes through ${his} lessons`;
			}
		}
		r += ` this week.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function lactationBreak(slave) {
		// room for growth — do so during lactation rules expansion
		if (slave.lactation === 1 && slave.assignment === "learn in the schoolroom" && V.Schoolteacher !== 0 && hasAnyArms(V.Schoolteacher)) {
			r += ` With ${his} natural lactation, ${he} often finds ${himself} milked before the class by ${V.Schoolteacher.slaveName} both to serve as a lesson and to keep ${him} from becoming a milky mess.`;
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function skillLessons(slave) {
		let undevoted = 0; // forces an obedience lesson to replace the first skill lesson
		let skillIncrease = 0;
		if (V.schoolroomRemodelBimbo !== 1 || slave.assignment !== "learn in the schoolroom") {
			skillIncrease = (10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32));
		} else {
			skillIncrease = (10 + (Math.abs(Math.floor((slave.intelligence + slave.intelligenceImplant) / 32))));
		}
		for (let lessons = 0; lessons < Math.max(1, learning); lessons++) {
			if (slave.devotion <= 20 && undevoted === 0) {
				r += ` Since ${he} is wanting in basic obedience, ${he} suffers through courses on <span class="devotion inc">${his} place</span> in the Free Cities world.`;
				slave.devotion += 10;
				undevoted++;
			} else if (slave.skill.oral <= 10) {
				r += ` Since ${he} is orally incompetent, ${he} is taught basic gag reflex suppression exercises and other simple oral things.`;
				r += ` ${SkillIncrease.Oral(slave, skillIncrease)}`;
			} else if (slave.skill.vaginal <= 10 && slave.vagina > 0 && canDoVaginal(slave)) {
				r += ` Since ${he} is unskilled at using ${his} pussy, ${he} is taught Kegel exercises and other simple vaginal skills.`;
				r += ` ${SkillIncrease.Vaginal(slave, skillIncrease)}`;
			} else if (slave.skill.vaginal <= 10 && slave.vagina >= 0) {
				r += ` Since ${he} is unskilled at using ${his} pussy and not permitted to learn through practice, ${he} is taught Kegel exercises, vaginal basics and several new positions.`;
				r += ` ${SkillIncrease.Vaginal(slave, skillIncrease)}`;
			} else if (slave.skill.anal <= 10 && slave.anus > 0 && canDoAnal(slave)) {
				r += ` Since ${he} is a novice at taking it up ${his} butt, ${he} is taught relaxation exercises and other simple anal basics.`;
				r += ` ${SkillIncrease.Anal(slave, skillIncrease)}`;
			} else if (slave.skill.anal <= 10 && slave.anus >= 0) {
				r += ` Since ${he} is a novice at taking it up ${his} butt and not permitted to learn through practice, ${he} is taught relaxation exercises and other simple anal basics.`;
				r += ` ${SkillIncrease.Anal(slave, skillIncrease)}`;
			} else if (slave.skill.whoring <= 10) {
				r += ` Since ${he} has little idea what's involved in selling ${his} body, ${he} is taught basic safety practices and other simple prostitution skills.`;
				r += ` ${SkillIncrease.Whore(slave, skillIncrease)}`;
			} else if (slave.skill.entertainment <= 10) {
				r += ` Since ${his} entertainment value is limited to ${his} holes, ${he} is taught simple conversational skills and other courtesan's essentials.`;
				r += ` ${SkillIncrease.Entertain(slave, skillIncrease)}`;
			} else if (V.schoolroomUpgradeSkills === 1) {
				if (slave.skill.oral <= 30) {
					r += ` Having completed the basic sex slave curriculum, ${he} studies more advanced ways to use ${his} lips and tongue to please cocks, cunts, and asses.`;
					r += ` ${SkillIncrease.Oral(slave, skillIncrease)}`;
				} else if (slave.skill.whoring <= 30) {
					r += ` Having completed the basic sex slave curriculum, ${he} studies intermediate prostitution, including how to stay as safe as possible and maximize ${his} efficiency.`;
					r += ` ${SkillIncrease.Whore(slave, skillIncrease)}`;
				} else if (slave.skill.entertainment <= 30) {
					r += ` Having completed the basic sex slave curriculum, ${he} studies courtesanship, including social dynamics and flirtation more subtle than straightforward begging for sex.`;
					r += ` ${SkillIncrease.Entertain(slave, skillIncrease)}`;
				} else if (slave.skill.vaginal <= 30 && slave.vagina >= 0) {
					r += ` Having completed the basic sex slave curriculum, ${he} studies more advanced techniques and exotic positions to make use of ${his} `;
					if (slave.vagina === 0) {
						r += `virgin pussy for use in ${his} first time.`;
					} else {
						r += `pussy.`;
					}
					r += ` ${SkillIncrease.Vaginal(slave, skillIncrease)}`;
				} else if (slave.skill.anal <= 30) {
					r += ` Having completed the basic sex slave curriculum, ${he} studies more advanced techniques and exotic positions to make use of ${his} `;
					if (slave.anus === 0) {
						r += `virgin ass for use in ${his} first time.`;
					} else {
						r += `ass.`;
					}
					r += ` ${SkillIncrease.Anal(slave, skillIncrease)}`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function generalLessons(slave) {
		if (V.schoolroomRemodelBimbo === 1 && slave.assignment === "learn in the schoolroom") {
			if (slave.intelligenceImplant > -15) {
				r += ` ${He} makes some progress `;
				if (slave.intelligenceImplant < 0) {
					r += `towards ${his} special education.`;
				} else {
					r += `in undoing ${his} education.`;
				}
				slave.intelligenceImplant -= Math.max(1, learning);
				if (slave.intelligenceImplant <= -15) {
					slave.intelligenceImplant = -15;
					r += ` ${He} has completed ${his} special education, and for most purposes ${he} has become <span class="education neg">less intelligent.</span>`;
				}
			}
		} else if (slave.intelligenceImplant < 30 && slave.assignment === "learn in the schoolroom") {
			r += ` ${He} makes some progress `;
			if (slave.intelligenceImplant < 15) {
				r += `towards a basic education.`;
			} else {
				r += `in furthering ${his} education.`;
			}
			slave.intelligenceImplant += Math.max(1, learning);
			if (slave.intelligenceImplant >= 30) {
				slave.intelligenceImplant = 30;
				r += ` ${He} has completed ${his} advanced education, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
			}
		} else if (slave.intelligenceImplant < 15 && slave.assignment === "take classes") {
			r += ` ${He} makes some progress towards a basic education.`;
			slave.intelligenceImplant += Math.max(1, learning);
			if (slave.intelligenceImplant >= 15) {
				slave.intelligenceImplant = 15;
				r += ` ${He} has completed a course of slave education, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function speechLessons(slave) {
		if (slave.intelligenceImplant >= 15 || slave.intelligenceImplant < 0) {
			if (slave.intelligence > jsRandom(-110, 110)) {
				if (slave.accent > 3) {
					const langWeekThreshold = (V.schoolroomUpgradeLanguage === 0) ? 24 : 16;
					if (V.week - slave.weekAcquired > langWeekThreshold) {
						r += ` ${He} has <span class="improvement">learned some ${V.language},</span> and can make ${his} point with some gesturing, though ${he} speaks ${V.language} horribly.`;
						slave.accent--;
						if (slave.rules.speech === "language lessons") {
							slave.rules.speech = "accent elimination";
						}
					}
				} else if (slave.accent === 3) {
					r += ` ${He} has <span class="improvement">learned functional ${V.language},</span> and can make ${himself} understood, though ${his} ${aNational(slave.nationality)} accent is still quite heavy.`;
					slave.accent--;
				} else if (slave.accent === 2 && V.schoolroomUpgradeLanguage === 1) {
					r += ` ${He} has <span class="improvement">learned decent ${V.language},</span> though ${he} retains enough of ${his} ${aNational(slave.nationality)} accent to make ${his} voice distinctly sexy.`;
					slave.accent--;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function graduation(slave) {
		if (slave.intelligenceImplant >= 15 && slave.assignment === "take classes") {
			if ((slave.voice === 0) || (slave.accent <= 1) || ((V.schoolroomUpgradeLanguage === 0 && slave.accent <= 2))) {
				if ((slave.skill.oral > 30) || (V.schoolroomUpgradeSkills === 0 && slave.skill.oral > 10)) {
					if ((slave.skill.whoring > 30) || (V.schoolroomUpgradeSkills === 0 && slave.skill.whoring > 10)) {
						if ((slave.skill.entertainment > 30) || (V.schoolroomUpgradeSkills === 0 && slave.skill.entertainment > 10)) {
							if ((slave.skill.anal > 30) || (V.schoolroomUpgradeSkills === 0 && slave.skill.anal > 10)) {
								if ((slave.skill.vaginal > 30) || (V.schoolroomUpgradeSkills === 0 && slave.skill.vaginal > 10) || (slave.vagina < 0)) {
									r += ` ${He} can learn little from further classes, <span class="noteworthy">`;
									if (V.assignmentRecords[slave.ID]) {
										let oldJob = V.assignmentRecords[slave.ID];
										assignJobSafely(slave, oldJob);
										if (slave.choosesOwnAssignment === 1) {
											t += ` so ${he} takes a break before choosing another task.`;
										} else if (slave.assignment === "rest") {
											if (oldJob !== "rest") {
												r += ` and since ${he} was unable to return to ${his} old task to ${oldJob}, ${his} assignment has defaulted to rest.`;
											} else {
												r += ` so ${he} has returned to resting.`;
											}
										} else {
											r += ` so ${he} goes back to ${oldJob}.`;
										}
									} else {
										r += ` so ${his} assignment has defaulted to rest.`;
										removeJob(slave, slave.assignment);
									}
									r += `</span>`;
								}
							}
						}
					}
				}
			}
		}
	}
})();
