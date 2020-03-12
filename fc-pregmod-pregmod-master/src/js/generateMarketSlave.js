/* eslint-disable camelcase */
window.generateMarketSlave = function(market = "kidnappers", numArcology = 1) {
	let r = ``;
	let sisterAge;
	let minHeight;
	let criminal;
	let pronounsGenerated = false;
	let pronoun;
	let opinion;

	switch (market) {
		case "corporate":
			if (V.corp.SpecAge === 1) {
				r += `Teenage slaves are strongly favored for training. `;
				V.activeSlaveOneTimeMinAge = V.minimumSlaveAge;
				V.activeSlaveOneTimeMaxAge = 19;
			} else if (V.corp.SpecAge === 3) {
				r += `Newly enslaved MILFs are strongly favored for training. `;
				if (V.pedo_mode === 1) {
					V.activeSlaveOneTimeMinAge = 24;
					V.activeSlaveOneTimeMaxAge = V.retirementAge-1;
				} else {
					V.activeSlaveOneTimeMinAge = 36;
					V.activeSlaveOneTimeMaxAge = V.retirementAge-1;
				}
			} else {
				r += `Promising slaves are trained without special sorting based on age. `;
			}
			V.one_time_age_overrides_pedo_mode = 1;
			if (V.corp.SpecRaces.length > 0) {
				V.fixedRace = jsEither(V.corp.SpecRaces);
			}
			if (V.corp.SpecGender === 1) {
				r += `Slaves without pussies are not trained. `;
				V.activeSlave = GenerateNewSlave("XX");
			} else if (V.corp.SpecGender === 2) {
				r += `Slaves without dicks are not trained. `;
				V.activeSlave = GenerateNewSlave("XY");
			} else {
				r += `Slaves are passed to training regardless of whether they have dicks or pussies. `;
				V.activeSlave = GenerateNewSlave();
			}
			V.activeSlave.origin = "$He was enslaved and trained by your corporation.";
			V.activeSlave.devotion = jsRandom(-30, 0);
			V.activeSlave.trust = jsRandom(-45, -25);
			setHealth(V.activeSlave, jsRandom(25, 50), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 0.5), 0), jsRandom(10, 40));
			if (V.corp.SpecDevotion > 0) {
				V.activeSlave.devotion = jsRandom(-120, -90) + V.corp.SpecDevotion * 30;
				if (V.corp.SpecDevotion === 1) {
					r += `It does everything it can to make trainees furious. `;
				} else if (V.corp.SpecDevotion === 2) {
					r += `It makes no effort to tame trainees. `;
				} else if (V.corp.SpecDevotion === 4) {
					r += `It focuses on selecting trainees predisposed towards obedience. `;
				} else if (V.corp.SpecDevotion === 5) {
					r += `It focuses on selecting trainees predisposed towards devotion to their owner. `;
				}
			} else {
				r += `It does not select trainees based on their initial feelings about slavery. `;
			}
			if (V.corp.SpecIntelligence === 3) {
				r += `Intelligent slaves have a high priority for training. `;
				V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [30, 100]});
			} else if (V.corp.SpecIntelligence === 1) {
				r += `Stupid slaves have a high priority for training. `;
				V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-100, -30]});
			} else {
				r += `Slaves' intelligence is not given special consideration. `;
			}
			if (V.corp.SpecRaces.length === 0 || V.corp.SpecRaces.length === 12) {
				r += `There is no racial element to trainee selection. `;
			} else if (V.corp.SpecRaces.length === 1) {
				r += `The corporation specializes in ${V.corp.SpecRaces[0]} slaves. `;
			} else {
				r += `The corporation selects slaves based on race. `; /* getting into the specifics of which races exactly is a hellhole I'd rather not jump into*/
			}
			if (V.corp.SpecTrust > 0) {
				V.activeSlave.trust = jsRandom(-105, -85) + V.corp.SpecTrust * 20;
				if (V.corp.SpecTrust === 1) {
					r += `The corporation applies extremely brutal slave breaking techniques, uncontrollable sobbing and bloodcurdling screams are heard around the clock. `;
				} else if (V.corp.SpecTrust === 2) {
					r += `The corporation applies brutal slave breaking techniques. `;
				} else if (V.corp.SpecTrust === 4) {
					r += `The corporation applies caring slave breaking techniques. `;
				} else {
					r += `The corporation applies surprisingly caring slave breaking techniques that sometimes convince refugees and similar downtrodden people that slavery is a step up for them. `;
				}
			} else {
				r += `The corporation applies standard slave breaking techniques. `;
			}
			if (V.corp.SpecHeight > 0) {
				V.activeSlave.height = Math.trunc(Height.random(V.activeSlave, {limitMult: [V.corp.SpecHeight - 4, V.corp.SpecHeight - 2]}));
				if (V.corp.SpecHeight === 1) {
					r += `The corporation specifically targets very short slaves. `;
				} else if (V.corp.SpecHeight === 2) {
					r += `The corporation targets short slaves. `;
				} else if (V.corp.SpecHeight === 4) {
					r += `The corporation targets tall slaves. `;
				} else if (V.corp.SpecHeight === 5) {
					r += `The corporation specifically targets incredibly tall slaves. `;
				}
			}
			if (V.corp.SpecVirgin === 1) {
				r += `The corporation ensures its slaves are virgins. `;
				V.activeSlave.anus = 0;
				if (V.activeSlave.vagina > 0) {
					V.activeSlave.vagina = 0;
				}
			}
			if (V.corp.SpecWeight > 0) {
				V.activeSlave.weight = jsRandom(-85 + V.corp.SpecWeight * 20, -65 + V.corp.SpecWeight * 30);
				if (V.corp.SpecWeight === 1) {
					r += `Trainees are practically starved through a rigorous diet. `;
				} else if (V.corp.SpecWeight === 2) {
					r += `Trainees are put on a diet to get them nice and thin. `;
				} else if (V.corp.SpecWeight === 3) {
					r += `Thin trainees are fattened up; fat trainees are slimmed down. `;
				} else if (V.corp.SpecWeight === 5) {
					r += `Trainees are fattened until they're nice and curvy. `;
				} else {
					r += `Trainees are fed as much as they can stomach. `;
				}
			} else {
				r += `Only the unhealthiest trainees are fed special diets. `;
			}
			if (V.corp.SpecMuscle > 0) {
				V.activeSlave.muscles = jsRandom(-85, -65) + V.corp.SpecMuscle * 25;
				if (V.corp.SpecMuscle === 1) {
					r += `Trainees are kept physically inactive and frail. `;
				} else if (V.corp.SpecMuscle === 2) {
					r += `Trainees are kept physically weak. `;
				} else if (V.corp.SpecMuscle === 3) {
					r += `Trainees' muscles are kept soft. `;
				} else if (V.corp.SpecMuscle === 4) {
					r += `Trainees are brought up to a good state of physical fitness. `;
				} else if (V.corp.SpecMuscle === 5) {
					r += `Trainees are subjected to punishing workout routines and only sold when ripped. `;
				}
			} else {
				r += `Trainees are not subjected to any special workout routine. `;
			}
			if (V.corp.SpecAccent === 1) {
				r += `The corporation teaches its trainees the lingua franca but allows them to retain distinctive accents. `;
				V.activeSlave.accent = Math.clamp(V.activeSlave.accent, 0, 1);
			} else if (V.corp.SpecAccent === 2) {
				r += `The corporation teaches its trainees to speak the lingua franca without accent. `;
				V.activeSlave.accent = 0;
			} else {
				r += `The corporation does not expend any special effort teaching language. `;
			}
			if (V.corp.SpecEducation > 0) {
				V.activeSlave.intelligenceImplant = 15 * V.corp.SpecEducation;
				V.activeSlave.skill.whoring = Math.clamp(V.activeSlave.skill.whoring, 15 * V.corp.SpecEducation, 100);
				V.activeSlave.skill.entertainment = Math.clamp(V.activeSlave.skill.entertainment, 15 * V.corp.SpecEducation, 100);
				if (V.corp.SpecEducation === 1) {
					r += `Its slave students receive basic slave educations. `;
				} else if (V.corp.SpecEducation === 2) {
					r += `Its slave students receive advanced slave educations. `;
				}
			} else {
				r += `Its slaves are not given special educational attention. `;
			}
			if (V.corp.SpecSexEd > 0) {
				V.activeSlave.skill.oral = Math.clamp(V.activeSlave.skill.oral, 15 * V.corp.SpecSexEd, 100);
				if (V.activeSlave.anus > 0) {
					V.activeSlave.skill.anal = Math.clamp(V.activeSlave.skill.anal, 15 * V.corp.SpecSexEd, 100);
				} else if (V.activeSlave.anus === 0) {
					V.activeSlave.skill.anal = Math.clamp(V.activeSlave.skill.anal, 15, 100);
				}
				if (V.activeSlave.vagina > 0) {
					V.activeSlave.skill.vaginal = Math.clamp(V.activeSlave.skill.vaginal, 15 * V.corp.SpecSexEd, 100);
				} else if (V.activeSlave.vagina === 0) {
					V.activeSlave.skill.vaginal = Math.clamp(V.activeSlave.skill.vaginal, 15, 100);
				}
				if (V.corp.SpecSexEd === 1) {
					r += `Trainees spend many hours learning sexual competence. `;
				} else if (V.corp.SpecSexEd === 2) {
					r += `Trainees spend days learning sexual skills. `;
				}
			} else {
				r += `No special sexual training is applied. `;
			}
			if (V.corp.SpecCosmetics === 1) {
				r += `The corporation uses subtle cosmetic surgery to improve its slaves for sale. `;
				if ((V.activeSlave.anus > 3)) {
					V.activeSlave.anus = 3;
					if (V.activeSlave.skill.anal > 10) {
						V.activeSlave.skill.anal -= 10;
					}
				}
				if (V.activeSlave.vagina > 3) {
					V.activeSlave.vagina = 3;
					if (V.activeSlave.skill.vaginal > 10) {
						V.activeSlave.skill.vaginal -= 10;
					}
				}
				if (V.activeSlave.faceImplant <= 30 && V.activeSlave.face <= 95) {
					if (V.activeSlave.faceShape === "masculine") {
						V.activeSlave.faceShape = "androgynous";
					}
					V.activeSlave.faceImplant = 20;
					V.activeSlave.face = Math.clamp(V.activeSlave.face+20, -100, 100);
				}
				if ((V.activeSlave.ageImplant !== 1) && (V.activeSlave.visualAge >= 25)) {
					applyAgeImplant(V.activeSlave);
				}
				if ((V.activeSlave.voice === 1) && (V.activeSlave.voiceImplant === 0)) {
					V.activeSlave.voice += 1;
					V.activeSlave.voiceImplant += 1;
				}
				V.activeSlave.waist = Math.trunc(V.activeSlave.waist, -100, -15);
				if (((V.activeSlave.boobShape === "saggy") || (V.activeSlave.boobShape === "downward-facing"))) {
					V.activeSlave.boobShape = "normal";
				}
				if (((V.activeSlave.boobShape === "normal") || (V.activeSlave.boobShape === "wide-set"))) {
					if (V.activeSlave.boobs > 800) {
						V.activeSlave.boobShape = "torpedo-shaped";
					} else {
						V.activeSlave.boobShape = "perky";
					}
				}
			} else {
				r += `The corporation does not use cosmetic surgery to improve its slaves for sale. `;
			}
			if (V.corp.SpecPussy === 1) {
				r += `The corporation adds pussies where needed. `;
				V.activeSlave.vagina = 0;
				V.activeSlave.ovaries = 1;
			} else if (V.corp.SpecPussy === -1) {
				r += `The corporation removes pussies where possible. `;
				V.activeSlave.vagina = -1;
				V.activeSlave.ovaries = 0;
			}
			if (V.corp.SpecDick === 1) {
				r += `The corporation adds dicks where needed. `;
				V.activeSlave.dick = 2;
				V.activeSlave.prostate = 1;
			} else if (V.corp.SpecDick === -1) {
				r += `The corporation removes dicks where possible. `;
				V.activeSlave.dick = 0;
				V.activeSlave.prostate = 0;
			}
			if (V.corp.SpecBalls === 1 && V.activeSlave.dick > 0) {
				r += `The corporation adds balls where needed. `;
				V.activeSlave.balls = 2;
				V.activeSlave.scrotum = 2;
			} else if (V.corp.SpecBalls === -1) {
				r += `The corporation removes balls where possible. `;
				V.activeSlave.balls = 0;
				V.activeSlave.scrotum = 0;
			}
			if (typeof V.corp.SpecPussy === "undefined" && typeof V.corp.SpecDick === "undefined" && typeof V.corp.SpecBalls === "undefined") {
				r += `The corporation does not reconfigure slave genitalia. `;
			}
			if (V.corp.SpecHormones === 1) {
				r += `It applies almost universal female hormone therapy. `;
				if ((V.activeSlave.dick > 0)) {
					V.activeSlave.dick = Math.clamp(V.activeSlave.dick-1, 1, 6);
				}
				if ((V.activeSlave.balls > 0)) {
					V.activeSlave.balls = Math.clamp(V.activeSlave.balls-1, 1, 6);
				}
				if ((V.activeSlave.clit > 0)) {
					V.activeSlave.clit = Math.clamp(V.activeSlave.clit-1, 0, 3);
				}
				if ((V.activeSlave.voice < 3) && (V.activeSlave.voice > 0)) {
					V.activeSlave.voice = Math.clamp(V.activeSlave.voice+1, 1, 3);
				}
				if ((V.activeSlave.vagina > -1) && (V.activeSlave.ovaries !== 0) && (V.activeSlave.vaginaLube < 2)) {
					V.activeSlave.vaginaLube = Math.clamp(V.activeSlave.vaginaLube+1, 0, 2);
				}
				if (((V.activeSlave.butt-V.activeSlave.buttImplant) < 2)) {
					V.activeSlave.butt = Math.clamp(V.activeSlave.butt+1, 0, 10);
				}
				if (((V.activeSlave.boobs-V.activeSlave.boobsImplant) < 500)) {
					V.activeSlave.boobs = Math.clamp(V.activeSlave.boobs+400, 0, 10000);
				}
				if (V.activeSlave.face <= 95) {
					V.activeSlave.face = Math.clamp(V.activeSlave.face+20, -100, 100);
				}
				if ((V.activeSlave.faceShape === "masculine")) {
					V.activeSlave.faceShape = "androgynous";
				} else if ((V.activeSlave.faceShape === "androgynous")) {
					V.activeSlave.faceShape = "normal";
				}
				if ((V.activeSlave.physicalAge < 25)) {
					V.activeSlave.shoulders = Math.clamp(V.activeSlave.shoulders-1, -2, 2);
					V.activeSlave.hips = Math.clamp(V.activeSlave.hips+1, -2, 2);
				}
				if ((V.activeSlave.muscles > 30) && (V.activeSlave.diet !== "muscle building") && (V.generalUpgradeMuscle !== "toned") && (V.generalUpgradeMuscle !== "ripped")) {
					V.activeSlave.muscles = Math.clamp(V.activeSlave.muscles-10, 0, 30);
				}
				if ((V.activeSlave.nipples === "tiny")) {
					V.activeSlave.nipples = "cute";
				}
				if ((V.activeSlave.height > 180)) {
					V.activeSlave.height -= jsRandom(3, 6);
				}
				V.activeSlave.devotion += jsRandom(5, 10);
				V.activeSlave.trust += jsRandom(5, 10);
				V.activeSlave.attrXY = Math.clamp(V.activeSlave.attrXY+jsRandom(5, 10), 0, 100);
			} else if (V.corp.SpecHormones === 2) {
				r += `It applies almost universal male hormone therapy. `;
				if ((V.activeSlave.dick > 0)) {
					V.activeSlave.dick = Math.clamp(V.activeSlave.dick+1, 1, 6);
				}
				if ((V.activeSlave.balls > 0)) {
					V.activeSlave.balls = Math.clamp(V.activeSlave.balls+1, 1, 6);
				}
				if ((V.activeSlave.clit > 0) && (V.activeSlave.dick === 0)) {
					V.activeSlave.clit = Math.clamp(V.activeSlave.clit+1, 0, 3);
				}
				if ((V.activeSlave.voice > 1)) {
					V.activeSlave.voice = Math.clamp(V.activeSlave.voice-1, 1, 3);
				}
				if ((V.activeSlave.vagina > -1) && (V.activeSlave.vaginaLube > 0)) {
					V.activeSlave.vaginaLube = Math.clamp(V.activeSlave.vaginaLube-1, 0, 2);
				}
				V.activeSlave.butt = Math.clamp(V.activeSlave.butt-1, 0, 10);
				V.activeSlave.boobs = Math.clamp(V.activeSlave.boobs-400, 0, 10000);
				if (V.activeSlave.face > 10) {
					V.activeSlave.face = Math.clamp(V.activeSlave.face-20, -100, 100);
				}
				if (V.activeSlave.faceShape === "androgynous" || V.activeSlave.faceShape === "masculine" || V.activeSlave.faceShape === "normal") {
					V.activeSlave.faceShape = "masculine";
				} else {
					V.activeSlave.faceShape = "androgynous";
				}
				if ((V.activeSlave.physicalAge < 25)) {
					V.activeSlave.shoulders = Math.clamp(V.activeSlave.shoulders+1, -2, 2);
					V.activeSlave.hips = Math.clamp(V.activeSlave.hips-1, -2, 2);
				}
				if ((V.activeSlave.muscles <= 95) && (V.activeSlave.diet !== "slimming")) {
					V.activeSlave.muscles = Math.clamp(V.activeSlave.muscles+20, 0, 3);
				}
				if ((V.activeSlave.nipples === "huge")) {
					V.activeSlave.nipples = "cute";
				}
				if ((V.activeSlave.height < 155)) {
					V.activeSlave.height += jsRandom(3, 6);
				}
				V.activeSlave.devotion -= jsRandom(5, 10);
				V.activeSlave.trust -= jsRandom(5, 10);
				V.activeSlave.attrXX = Math.clamp(V.activeSlave.attrXX+jsRandom(5, 10), 0, 100);
			} else {
				r += `It does not use hormones on a systematic level. `;
			}
			if (V.corp.SpecInjection > 0) {
				if (V.corp.SpecInjection === 1) {
					r += `If anything, hormones are used to reduce asset sizes. `;
					V.activeSlave.lips = jsRandom(0, 20);
					V.activeSlave.butt = jsRandom(1, 2);
					V.activeSlave.boobs = 10 * jsRandom(30, 60);
					V.activeSlave.nipples = jsEither(["cute", "tiny"]);
					if (V.activeSlave.dick > 0) {
						V.activeSlave.dick = jsRandom(1, 2);
					}
					if (V.activeSlave.balls > 0) {
						V.activeSlave.balls = jsRandom(1, 2);
					}
				} else if (V.corp.SpecInjection === 2) {
					r += `Growth hormones are used to correct flat chests and butts. `;
					V.activeSlave.lips = jsRandom(25, 45);
					V.activeSlave.butt = jsRandom(3, 4);
					V.activeSlave.boobs = 10 * jsRandom(70, 100);
					V.activeSlave.nipples = jsEither(["cute", "partially inverted"]);
					if (V.activeSlave.dick > 0) {
						V.activeSlave.dick = jsRandom(3, 4);
					}
					if (V.activeSlave.balls > 0) {
						V.activeSlave.balls = jsRandom(3, 4);
					}
				} else if (V.corp.SpecInjection === 3) {
					r += `Growth hormones are used throughout slave training to ensure expansion. `;
					V.activeSlave.lips = jsRandom(35, 55);
					V.activeSlave.butt = jsRandom(4, 5);
					V.activeSlave.boobs = 10 * jsRandom(120, 180);
					V.activeSlave.nipples = jsEither(["cute", "partially inverted"]);
					if (V.activeSlave.dick > 0) {
						V.activeSlave.dick = jsRandom(4, 5);
					}
					if (V.activeSlave.balls > 0) {
						V.activeSlave.balls = jsRandom(4, 5);
					}
				} else if (V.corp.SpecInjection === 4) {
					r += `Advanced growth hormones are applied on a grand scale. `;
					V.activeSlave.lips = jsRandom(55, 85);
					V.activeSlave.butt = jsRandom(6, 8);
					V.activeSlave.boobs = 100 * jsRandom(40, 60);
					V.activeSlave.nipples = jsEither(["huge", "inverted"]);
					if (V.activeSlave.dick > 0) {
						V.activeSlave.dick = jsRandom(5, 6);
					}
					if (V.activeSlave.balls > 0) {
						V.activeSlave.balls = jsRandom(5, 6);
					}
				} else if (V.corp.SpecInjection === 5) {
					r += `Advanced growth hormones are applied with total focus on increasing slaves' productiveness. `;
					V.activeSlave.lips = jsRandom(35, 65);
					V.activeSlave.butt = jsRandom(4, 6);
					V.activeSlave.boobs = 100 * jsRandom(60, 80);
					V.activeSlave.nipples = jsEither(["huge", "inverted"]);
					if (V.activeSlave.dick > 0) {
						V.activeSlave.dick = jsRandom(6, 8);
					}
					if (V.activeSlave.balls > 0) {
						V.activeSlave.balls = jsRandom(5, 7);
					}
				}
			} else {
				r += `Growth hormones are not applied. `;
			}
			if (V.corp.SpecImplants === 1) {
				r += `Slaves are given tasteful breast, butt, and lip implants. `;
				V.activeSlave.buttImplant = 1;
				V.activeSlave.butt = Math.clamp(V.activeSlave.butt+V.activeSlave.buttImplant, 0, 10);
				V.activeSlave.buttImplantType = "normal";
				V.activeSlave.boobsImplant = 600;
				V.activeSlave.boobs = Math.clamp(V.activeSlave.boobs+V.activeSlave.boobsImplant, 0, 10000);
				V.activeSlave.boobsImplantType = "normal";
				V.activeSlave.lipsImplant = 20;
				V.activeSlave.lips = Math.clamp(V.activeSlave.lips+V.activeSlave.lipsImplant, 0, 55);
			} else if (V.corp.SpecImplants === 2) {
				r += `Slaves are given absurd breast, butt, and lip implants. `;
				V.activeSlave.buttImplant = 4;
				V.activeSlave.buttImplantType = "fillable";
				V.activeSlave.butt = Math.clamp(V.activeSlave.butt+V.activeSlave.buttImplant, 0, 10);
				V.activeSlave.boobsImplant = 2400;
				V.activeSlave.boobsImplantType = "advanced fillable";
				V.activeSlave.boobs = Math.clamp(V.activeSlave.boobs+V.activeSlave.boobsImplant, 0, 10000);
				V.activeSlave.lipsImplant = 60;
				V.activeSlave.lips = Math.clamp(V.activeSlave.lipsImplant+V.activeSlave.buttImplant, 0, 100);
			} else {
				r += `Slaves are not given breast, butt, or lip implants. `;
			}
			if (V.corp.SpecAmputee === 1) {
				r += `The corporation removes all limbs from its slaves. `;
				removeLimbs(V.activeSlave, "all");
			}
			if (V.corp.SpecMilk === 1) {
				r += `The corporation provides naturally lactating slaves `;
				V.activeSlave.lactation = 1;
				V.activeSlave.lactationDuration = 2;
				V.activeSlave.lactationAdaptation = 15;
			} else if (V.corp.SpecMilk === 2) {
				r += `The corporation provides slaves with chemically induced lactation. `;
				V.activeSlave.lactation = 2;
				V.activeSlave.lactationDuration = 2;
			}
			break;
		case "neighbor":
			if ((numArcology < V.arcologies.length) && (numArcology > 0)) {
				market = numArcology;
			} else {
				market = 1;
			}
			opinion = arcologyOpinion(V.arcologies[0], V.arcologies[market]);
			opinion = Math.trunc(opinion/20);
			opinion = Math.clamp(opinion, -10, 10);

			if (V.arcologies[market].FSSubjugationist > 20) {
				V.fixedRace = V.arcologies[market].FSSubjugationistRace;
			}
			V.activeSlave = GenerateNewSlave();
			generatePronouns(V.activeSlave);
			pronounsGenerated = true;
			pronoun = getPronouns(V.activeSlave);
			V.activeSlave.origin = "You bought $him from ";
			V.activeSlave.origin += V.arcologies[market].name;
			V.activeSlave.origin += ".";
			V.activeSlave.devotion = -20 + Math.trunc(V.arcologies[market].prosperity/10) + jsRandom(0, 10);
			V.activeSlave.trust = -20 + Math.trunc(V.arcologies[market].prosperity/10) + jsRandom(0, 10);
			setHealth(V.activeSlave, -50 + Math.trunc(V.arcologies[market].prosperity/25) + jsRandom(0, 5), Math.max(15 - V.arcologies[market].prosperity/20 + normalRandInt(0, 2), 0), Math.max(15 - V.arcologies[market].prosperity/20 + normalRandInt(0, 2), 0), undefined, Math.max(jsRandom(10, 40) - V.arcologies[market].prosperity/15, 0));
			if (jsRandom(1, 100) < V.arcologies[market].prosperity / 10 + 50) {
				V.activeSlave.health.illness = 0;
			}
			if (V.activeSlave.vagina > 0) {
				V.activeSlave.skill.vaginal += Math.clamp(V.arcologies[market].prosperity/2, 15, 100);
			}
			if (V.activeSlave.anus > 0) {
				V.activeSlave.skill.anal += Math.clamp(V.arcologies[market].prosperity/2, 15, 100);
			}
			V.activeSlave.skill.oral += Math.clamp(V.arcologies[market].prosperity/2, 15, 100);
			V.activeSlave.attrKnown = 1;
			V.activeSlave.fetishKnown = 1;
			if (V.activeSlave.accent >= 3) {
				if (V.arcologies[market].prosperity > jsRandom(0, 200)) {
					V.activeSlave.accent -= 1;
				}
			}
			if (V.arcologies[market].prosperity > jsRandom(0, 200)) {
				V.activeSlave.sexualFlaw = "none";
			}
			if (V.arcologies[market].prosperity > jsRandom(0, 200)) {
				V.activeSlave.behavioralFlaw = "none";
			}
			if (V.arcologies[market].FSSubjugationist > 20) {
				r += `They're universally ${V.arcologies[market].FSSubjugationistRace}. `;
			}
			if (V.arcologies[market].FSYouthPreferentialist > 20) {
				r += `They're usually on the younger side. `;
				if (V.activeSlave.actualAge > 30) {
					if (jsRandom(0, 1) === 0) {
						V.activeSlave.actualAge = jsRandom(18, 25);
						V.activeSlave.visualAge = V.activeSlave.actualAge;
						V.activeSlave.physicalAge = V.activeSlave.actualAge;
						V.activeSlave.ovaryAge = V.activeSlave.actualAge;
						if (V.activeSlave.boobs > 400) {
							V.activeSlave.boobs -= 100*jsRandom(0, 2);
						}
						if (V.activeSlave.butt > 3) {
							V.activeSlave.butt -= jsRandom(0, 2);
						}
					} else if (V.arcologies[market].FSYouthPreferentialistResearch === 1) {
						if (V.activeSlave.actualAge > 30) {
							r += `Well, all of them certainly look it. Always best to check their ages before buying. `;
							V.activeSlave.visualAge = jsRandom(18, 25);
							V.activeSlave.chem += jsRandom(10, 40);
						}
					} else {
						r += `And if they aren't, they sure don't look their age. `;
						V.activeSlave.faceImplant += jsRandom(10, 30);
						applyAgeImplant(V.activeSlave);
					}
				}
			} else if (V.arcologies[market].FSMaturityPreferentialist > 20) {
				r += `They're usually on the more mature side. `;
				if (V.activeSlave.actualAge < 30) {
					if (jsRandom(0, 1) === 0) {
						V.activeSlave.actualAge = jsRandom(36, V.retirementAge-1);
						V.activeSlave.visualAge = V.activeSlave.actualAge;
						V.activeSlave.physicalAge = V.activeSlave.actualAge;
						V.activeSlave.ovaryAge = V.activeSlave.actualAge;
						if (V.activeSlave.boobs < 400) {
							V.activeSlave.boobs += 100*jsRandom(0, 2);
						}
						if (V.activeSlave.butt < 3) {
							V.activeSlave.butt += jsRandom(0, 2);
						}
					}
				}
			}
			if (V.arcologies[market].FSRepopulationFocus > 50) {
				r += `They are exclusively female and all extremely pregnant. `;
				V.activeSlave.genes = "XX";
				V.activeSlave.ovaries = 1;
				V.activeSlave.vagina = either(0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3);
				V.activeSlave.dick = 0;
				V.activeSlave.balls = 0;
				V.activeSlave.scrotum = 0;
				if (V.activeSlave.physicalAge < V.fertilityAge) {
					if (V.precociousPuberty === 0) {
						V.activeSlave.physicalAge = V.fertilityAge;
						V.activeSlave.visualAge = V.fertilityAge;
						V.activeSlave.actualAge = V.fertilityAge;
						V.activeSlave.ovaryAge = V.fertilityAge;
					}
				}
				V.activeSlave.pubertyXX = 1;
				if (V.activeSlave.ovaryAge >= 42) {
					/* corrects menopausal mothers */
					V.activeSlave.ovaryAge = 40;
				}
				V.activeSlave.preg = 0; /* removing contraception of default slave generation so isFertile can work right*/
				if (isFertile(V.activeSlave)) {
					V.activeSlave.vagina = jsRandom(1, 4);
					V.activeSlave.preg = jsRandom(21, 39);
					if (jsRandom(1, 2) === 1 && V.seeHyperPreg === 1) {
						V.activeSlave.pregType = jsRandom(3, 29);
						V.activeSlave.pregAdaptation = 250;
					} else {
						V.activeSlave.pregType = jsRandom(3, 8);
						V.activeSlave.pregAdaptation = 100;
					}
					SetBellySize(V.activeSlave);
				}
				V.activeSlave.lactation = jsRandom(0, 1);
				if (V.activeSlave.lactation > 0) {
					V.activeSlave.lactationDuration = 2;
				}
			} else if (V.arcologies[market].FSRestart > 50) {
				r += `They have all been rendered unable to reproduce. `;
				if (V.activeSlave.ovaries === 1) {
					V.activeSlave.preg = -2;
					V.activeSlave.belly = 0;
					V.activeSlave.bellyPreg = 0;
				}
				if (V.activeSlave.balls > 0) {
					V.activeSlave.balls = 0;
				}
				if (V.arcologies[market].FSRestartResearch === 1) {
					r += `Smart and attractive slaves are beginning to be a rarity lately. `;
					if (V.activeSlave.face >= 0) {
						V.activeSlave.face -= 100;
					}
					if (V.activeSlave.intelligence >= 0) {
						V.activeSlave.intelligence -= 100;
					}
					V.activeSlave.chem = jsRandom(40, 100);
					V.activeSlave.addict = jsEither([0, 0, 0, 0, 0, 0, 0, 0, 5, 20, 20, 50, 100]);
				}
			}
			if (V.arcologies[market].FSGenderRadicalist > 50) {
				r += `They all show signs of intensive hormone therapy. `;
				V.activeSlave.chem += jsRandom(10, 100);
				if (V.activeSlave.dick > 0) {
					V.activeSlave.boobs += 100*jsRandom(0, 4);
					V.activeSlave.butt += jsRandom(0, 2);
					if (V.activeSlave.hips < 2) {
						V.activeSlave.hips += jsRandom(0, 1);
					}
					if (V.activeSlave.shoulders > -2) {
						V.activeSlave.shoulders -= jsRandom(0, 1);
					}
					if (V.activeSlave.face < 80) {
						V.activeSlave.face += jsRandom(0, 20);
					}
					if (V.activeSlave.faceShape === "masculine") {
						if (jsRandom(0, 1) === 0) {
							V.activeSlave.faceShape = "androgynous";
						}
					}
					if (V.activeSlave.dick > 2) {
						V.activeSlave.dick -= jsRandom(0, 2);
					}
					if (V.activeSlave.balls > 2) {
						V.activeSlave.balls -= jsRandom(0, 2);
					}
					if (V.arcologies[market].FSGenderRadicalistResearch === 1 && jsRandom(1, 100) <= 20) {
						r += `This one has a notably rounded belly for a slave with no vagina. `;
						V.activeSlave.ovaries = 0;
						V.activeSlave.vagina = -1;
						V.activeSlave.mpreg = 1;
						if (isFertile(V.activeSlave)) {
							V.activeSlave.preg = jsRandom(1, 39);
							V.activeSlave.pregType = setPregType(V.activeSlave);
							SetBellySize(V.activeSlave);
						}
					}
				} else {
					V.activeSlave.boobs -= 100*jsRandom(0, 2);
					V.activeSlave.butt -= jsRandom(0, 1);
					if (V.activeSlave.hips > -2) {
						V.activeSlave.hips -= jsRandom(0, 1);
					}
					if (V.activeSlave.shoulders < 2) {
						V.activeSlave.shoulders += jsRandom(0, 1);
					}
					if (V.activeSlave.face >= -80) {
						V.activeSlave.face -= jsRandom(0, 20);
					}
					if (V.activeSlave.faceShape !== "androgynous") {
						if (jsRandom(0, 1) === 0) {
							V.activeSlave.faceShape = "androgynous";
						}
					}
					V.activeSlave.clit += jsRandom(0, 2);
					V.activeSlave.labia += jsRandom(0, 1);
					if (V.activeSlave.muscles <= 95) {
						V.activeSlave.muscles += jsRandom(0, 20);
					}
				}
			} else if (V.arcologies[market].FSGenderFundamentalist > 50) {
				r += `Fertile slaves from there almost never appear without swollen bellies and sensitive nipples. `;
				V.activeSlave.preg = 0; /* removing contraception of default slave generation so isFertile can work right*/
				if (isFertile(V.activeSlave)) {
					V.activeSlave.preg = jsRandom(1, 40);
					V.activeSlave.pregType = setPregType(V.activeSlave);
					SetBellySize(V.activeSlave);
					V.activeSlave.lactation = jsRandom(0, 1);
					if (V.activeSlave.lactation > 0) {
						V.activeSlave.lactationDuration = 2;
					}
				}
			}
			if (V.arcologies[market].FSPaternalist > 20) {
				r += `They're often gratifyingly devoted and trusting. `;
				if (V.activeSlave.devotion < 10) {
					V.activeSlave.devotion += jsRandom(0, 8);
				}
				if (V.activeSlave.trust < 50) {
					V.activeSlave.trust += jsRandom(0, 8);
				}
			} else if (V.arcologies[market].FSDegradationist > 20) {
				r += `They can be depended upon to be terrified into abject submission. `;
				DegradingName(V.activeSlave);
				if (V.activeSlave.trust > -10) {
					V.activeSlave.trust -= jsRandom(0, 10);
				}
				if (jsRandom(1, 100) > 90) {
					// one in twenty slaves has only one blind eye.
					if (jsRandom(1, 20) > 1) {
						if (jsRandom(1, 2) === 1) {
							eyeSurgery(V.activeSlave, "left", "blind");
						} else {
							eyeSurgery(V.activeSlave, "right", "blind");
						}
					} else {
						eyeSurgery(V.activeSlave, "blind", "blind");
					}
				}
				if (jsRandom(1, 100) > 90) {
					V.activeSlave.hears = -2;
				}
				if (V.arcologies[market].FSRepopulationFocus === "unset" && V.arcologies[market].FSBodyPurist === "unset") {
					if (isFertile(V.activeSlave) && jsRandom(1, 10) === 9) {
						V.activeSlave.abortionTat = jsRandom(1, (Math.min(V.activeSlave.physicalAge-V.fertilityAge, V.activeSlave.physicalAge-V.minimumSlaveAge))*2);
					}
				}
				let i = 0;
				if (jsRandom(1, 100) > 10) {
					// tat em up
					let tattoos = ["boobsTat", "buttTat", "lipsTat", "vaginaTat", "dickTat", "anusTat", "shouldersTat", "armsTat", "legsTat", "backTat", "stampTat", "bellyTat", "abortionTat", "birthsTat"];
					let modPool = jsRandom(1, 10);
					for (i = 0; i < modPool; i++) {
						let tat = tattoos[Math.floor(Math.random() * tattoos.length)];
						V.activeSlave[tat] = "degradation";
					}
				}
				if (jsRandom(1, 100) > 10) {
					// pierce em up
					let piercings = ["corsetPiercing", "nipplesPiercing", "areolaePiercing", "lipsPiercing", "tonguePiercing", "anusPiercing"];
					if (V.activeSlave.dick > 0) {
						piercings.push("dickPiercing");
					}
					if (V.activeSlave.vagina !== -1) {
						piercings.push("vaginaPiercing");
					}
					if ((V.activeSlave.vagina !== -1) || (V.activeSlave.dick !== 0)) {
						piercings.push("clitPiercing");
					}
					let modPool = jsRandom(5, 15);
					let pierce;
					for (i = 0; i < modPool; i++) {
						pierce = piercings[Math.floor(Math.random() * piercings.length)];
						if (V.activeSlave[pierce] < 2) {
							V.activeSlave[pierce]++;
						}
					}
				}
				if (jsRandom(1, 100) > 20) {
					// scar em up
					if (jsRandom(1, 100) > 70) {
						// They got whipped too
						App.Medicine.Modification.addScourged(V.activeSlave);
					}
					let scars = ["back", "lower back", "left thigh", "right thigh"];
					let modPool = jsRandom(1, 10);
					let scar;
					for (i = 0; i < modPool; i++) {
						scar = scars[Math.floor(Math.random() * scars.length)];
						App.Medicine.Modification.addScar(V.activeSlave, scar, "generic");
					}
				}
				if (jsRandom(1, 100) > 80) {
					// brand em up
					if (jsRandom(1, 100) > 50) {
						V.activeSlave.brand["left buttock"] = "SLUT";
					} else {
						V.activeSlave.brand["left buttock"] = "Slave";
					}
				}
			}
			if (V.arcologies[market].FSIntellectualDependency > 20) {
				r += `The only thing that rivals their idiocy is their uncontrollable libido. `;
				V.activeSlave.slaveName = setup.bimboSlaveNames.random();
				if (V.activeSlave.intelligence > -50) {
					V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-100, -50]});
				}
				V.intelligenceImplant = 0;
				if (V.activeSlave.energy < 80) {
					V.activeSlave.energy = jsRandom(80, 100);
				}
			} else if (V.arcologies[market].FSSlaveProfessionalism > 20) {
				r += `They possess brilliant minds and expert training; a slave that truly knows their role in life. `;
				if (V.activeSlave.intelligence <= 50) {
					V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [51, 100]});
				}
				V.intelligenceImplant = 30;
				if (V.activeSlave.energy > 40) {
					V.activeSlave.energy -= 30;
				}
				if (V.activeSlave.vagina > 0) {
					V.activeSlave.skill.vaginal += Math.clamp(V.arcologies[market].prosperity/2, 20, 100);
					V.activeSlave.skill.vaginal = Math.clamp(V.activeSlave.skill.vaginal, 50, 100);
				}
				if (V.activeSlave.anus > 0) {
					V.activeSlave.skill.anal += Math.clamp(V.arcologies[market].prosperity/2, 20, 100);
					V.activeSlave.skill.anal = Math.clamp(V.activeSlave.skill.anal, 50, 100);
				}
				V.activeSlave.skill.oral += Math.clamp(V.arcologies[market].prosperity/2, 20, 100);
				V.activeSlave.skill.oral = Math.clamp(V.activeSlave.skill.oral, 50, 100);
				V.activeSlave.skill.entertainment += Math.clamp(V.arcologies[market].prosperity/2, 20, 100);
				V.activeSlave.skill.entertainment = Math.clamp(V.activeSlave.skill.entertainment, 50, 100);
				V.activeSlave.skill.whoring += Math.clamp(V.arcologies[market].prosperity/2, 20, 100);
				V.activeSlave.skill.whoring = Math.clamp(V.activeSlave.skill.whoring, 50, 100);
				V.activeSlave.sexualFlaw = "none";
				V.activeSlave.behavioralFlaw = "none";
				V.activeSlave.fetishKnown = 1;
				V.activeSlave.attrKnown = 1;
			}
			if (V.arcologies[market].FSBodyPurist > 80) {
				r += `They're quite pristine, free of any genomic damage or addictions regardless of any transformations they've had. `;
				// clean out any changes those filthy impure degradationsts may have made
				V.activeSlave.brand = {};
				V.activeSlave.scar = {};
				V.activeSlave.chem = 0;
				V.activeSlave.addict = 0;
				V.activeSlave.boobsTat = 0;
				V.activeSlave.buttTat = 0;
				V.activeSlave.lipsTat = 0;
				V.activeSlave.vaginaTat = 0;
				V.activeSlave.dickTat = 0;
				V.activeSlave.anusTat = 0;
				V.activeSlave.shouldersTat = 0;
				V.activeSlave.armsTat = 0;
				V.activeSlave.legsTat = 0;
				V.activeSlave.backTat = 0;
				V.activeSlave.stampTat = 0;
				V.activeSlave.bellyTat = 0;
				V.activeSlave.abortionTat = 0;
				V.activeSlave.birthsTat = 0;
				V.activeSlave.corsetPiercing = 0;
				V.activeSlave.nipplesPiercing = 0;
				V.activeSlave.areolaePiercing = 0;
				V.activeSlave.lipsPiercing = 0;
				V.activeSlave.tonguePiercing = 0;
				V.activeSlave.vaginaPiercing = 0;
				V.activeSlave.clitPiercing = 0;
				V.activeSlave.dickPiercing = 0;
				V.activeSlave.anusPiercing = 0;
			} else if (V.arcologies[market].FSTransformationFetishist > 80) {
				r += `They vary in terms of what size their implants are, not whether they have them. `;
				V.activeSlave.chem += jsRandom(10, 100);
				V.activeSlave.boobsImplant = 200*jsRandom(2, 20);
				if (V.activeSlave.boobsImplant > 10000) {
					V.activeSlave.boobsImplantType = "hyper fillable";
				} else if (V.activeSlave.boobsImplant > 2200) {
					V.activeSlave.boobsImplantType = jsEither(["advanced fillable", "advanced fillable", "advanced fillable", "string"]);
				} else if (V.activeSlave.boobsImplant > 1000) {
					V.activeSlave.boobsImplantType = jsEither(["fillable", "fillable", "normal", "string"]);
				} else {
					V.activeSlave.boobsImplantType = jsEither(["normal", "normal", "normal", "string"]);
				}
				V.activeSlave.boobs += V.activeSlave.boobsImplant;
				V.activeSlave.buttImplant = jsRandom(2, 5);
				if (V.activeSlave.buttImplant > 4) {
					V.activeSlave.buttImplantType = jsEither(["fillable", "fillable", "normal", "string"]);
				} else {
					V.activeSlave.buttImplantType = jsEither(["normal", "normal", "normal", "string"]);
				}
				V.activeSlave.butt += V.activeSlave.buttImplant;
				V.activeSlave.lipsImplant = jsEither([10, 20]);
				V.activeSlave.lips += V.activeSlave.lipsImplant;
				if (V.arcologies[market].FSTransformationFetishistResearch === 1 && jsRandom(1, 100) <= 20) {
					r += `This one's implants are unusually large; a showcase of what ${pronoun.possessive} home arcology is capable of. `;
					V.activeSlave.boobsImplant += 200*jsRandom(100, 200);
					V.activeSlave.boobs += V.activeSlave.boobsImplant;
					V.activeSlave.boobsImplantType = "hyper fillable";
					V.activeSlave.buttImplant += jsRandom(7, 12);
					V.activeSlave.butt += V.activeSlave.buttImplant;
					V.activeSlave.buttImplantType = "hyper fillable";
				}
			}
			if (V.arcologies[market].FSPetiteAdmiration > 20) {
				r += `They tend to be short, some far more than others. `;
				if (V.activeSlave.height >= 160) {
					V.activeSlave.height = Math.trunc(Height.random(V.activeSlave, {limitMult: [-2, 0]}));
					if (V.activeSlave.height >= 160) {
						V.activeSlave.height = Math.trunc(Height.random(V.activeSlave, {limitMult: [-3, -1]}));
						if (V.activeSlave.height >= 160) {
							V.activeSlave.height = jsRandom(90, 130);
							V.activeSlave.geneticQuirks.dwarfism = 2;
						}
					}
				}
			} else if (V.arcologies[market].FSStatuesqueGlorification > 20) {
				r += `They tend to be tall, if not unbelievably so. `;
				if (V.activeSlave.height < 170) {
					V.activeSlave.height = Math.trunc(Height.random(V.activeSlave, {limitMult: [0, 2]}));
					if (V.activeSlave.height < 170) {
						V.activeSlave.height = Math.trunc(Height.random(V.activeSlave, {limitMult: [1, 3]}));
						if (V.activeSlave.height < 170) {
							V.activeSlave.height = jsRandom(200, 264);
							V.activeSlave.geneticQuirks.gigantism = 2;
						}
					}
				}
			}
			if (V.arcologies[market].FSSlimnessEnthusiast > 20) {
				r += `They're never overweight, and are often quite lithe. `;
				if (V.activeSlave.boobs > 400) {
					V.activeSlave.boobs -= 100*jsRandom(0, 2);
				}
				if (V.activeSlave.butt > 3) {
					V.activeSlave.butt -= jsRandom(0, 2);
				}
				if (V.activeSlave.weight > 10) {
					V.activeSlave.weight = jsRandom(-30, 0);
				}
				if (V.arcologies[market].FSSlimnessEnthusiastResearch === 1 && jsRandom(1, 100) <= 50) {
					r += `This one is perfectly flat; an ideal showcase of ${pronoun.possessive} home arcology's tastes. `;
					V.activeSlave.boobs = 100;
					V.activeSlave.butt = 0;
					V.activeSlave.weight = jsRandom(-30, 0);
				}
			} else if (V.arcologies[market].FSAssetExpansionist > 20) {
				r += `Their butts are usually imposing, but their tits are what's often most impressive. `;
				V.activeSlave.chem += jsRandom(10, 100);
				if (V.activeSlave.boobs < 5000) {
					V.activeSlave.boobs += 100*jsRandom(5, 50);
				}
				if (V.activeSlave.butt < 6) {
					V.activeSlave.butt += jsRandom(2, 4);
				}
				if (V.activeSlave.weight < -10) {
					V.activeSlave.weight += jsRandom(0, 20);
				}
				if (V.arcologies[market].FSAssetExpansionistResearch === 1 && jsRandom(1, 100) <= 20) {
					r += `This one is unusually large; a showcase of what ${pronoun.possessive} home arcology is capable of. `;
					V.activeSlave.boobs = 200*jsRandom(100, 200);
					V.activeSlave.butt = jsRandom(10, 20);
					if (V.activeSlave.dick > 0 && V.seeDicks !== 0) {
						V.activeSlave.dick = jsRandom(20, 30);
						V.activeSlave.balls = jsRandom(20, 125);
					}
				}
			}
			if (V.arcologies[market].FSPhysicalIdealist > 20) {
				r += `They're usually quite muscular, some to a truly imposing degree, and they're almost never unhealthy. `;
				V.activeSlave.muscles = jsRandom(10, 100);
				if (V.activeSlave.health.condition < 20) {
					improveCondition(V.activeSlave, jsRandom(0, 8));
				}
			} else if (V.arcologies[market].FSHedonisticDecadence > 20) {
				if (V.arcologies[market].FSSlimnessEnthusiast > 20) {
					r += `They're quite soft, usually sporting a cute muffin top, and rather laid back. `;
					V.activeSlave.weight = jsRandom(10, 25);
				} else {
					r += `They're usually very soft and rather laid back. `;
					V.activeSlave.weight = jsRandom(30, 180);
				}
				r += `Though they often come with intense fetishes. `;
				V.activeSlave.muscles = jsRandom(-50, 0);
				V.activeSlave.trust += jsRandom(5, 15);
				V.activeSlave.energy += jsRandom(0, 10);
				if (V.arcologies[market].FSHedonisticDecadenceResearch === 1) {
					r += `They appear to have greatly enjoyed their stay at ${V.arcologies[market].name}. `;
					V.activeSlave.energy += jsRandom(0, 10);
					V.activeSlave.trust += jsRandom(10, 20);
					V.activeSlave.devotion += jsRandom(10, 20);
				}
				if (jsRandom(0, 3) === 0) {
					V.activeSlave.behavioralFlaw = "gluttonous";
				}
				if (V.activeSlave.fetish === "none") {
					V.activeSlave.fetish = jsEither(["boobs", "buttslut", "cumslut", "dom", "humiliation", "masochist", "pregnancy", "sadist", "submissive"]);
				}
				V.activeSlave.fetishStrength = jsRandom(60, 90);
				if (jsRandom(1, 100) <= 5 && V.activeSlave.fetish !== "mindbroken") {
					switch (V.activeSlave.fetish) {
						case "submissive":
							V.activeSlave.sexualFlaw = "neglectful"; break;
						case "cumslut":
							V.activeSlave.sexualFlaw = "cum addict"; break;
						case "humiliation":
							V.activeSlave.sexualFlaw = "attention whore"; break;
						case "buttslut":
							V.activeSlave.sexualFlaw = "anal addict"; break;
						case "boobs":
							V.activeSlave.sexualFlaw = "breast growth"; break;
						case "pregnancy":
							V.activeSlave.sexualFlaw = "breeder"; break;
						case "dom":
							V.activeSlave.sexualFlaw = "abusive"; break;
						case "sadist":
							V.activeSlave.sexualFlaw = "malicious"; break;
						case "masochist":
							V.activeSlave.sexualFlaw = "self hating";
					}
					V.activeSlave.fetishStrength = 100;
				}
			}
			if (V.arcologies[market].FSPastoralist > 20) {
				r += `Lactation is nearly universal among them, sometimes in ludicrous quantities. They tend to have huge udders, as well. `;
				V.activeSlave.chem += jsRandom(10, 100);
				if (V.activeSlave.boobs < 5000) {
					V.activeSlave.boobs += 100*jsRandom(5, 50);
				}
				if (V.activeSlave.lactation === 0) {
					V.activeSlave.lactation = jsEither([0, 1, 1, 1, 1, 2]);
				}
				if (V.activeSlave.lactation > 0) {
					V.activeSlave.lactationDuration = 2;
				}
				if (V.activeSlave.weight < -10) {
					V.activeSlave.weight += jsRandom(0, 20);
				}
			} else if (V.arcologies[market].FSCummunism > 20) {
				r += `Big balls and huge loads are commonplace among them, even if they sometimes lack dicks. They tend to be hard workers, as well. `;
				V.activeSlave.chem += jsRandom(10, 100);
				if (V.arcologies[market].FSRestart > 50) {
					V.activeSlave.dick = 0;
					V.activeSlave.vagina = -1;
				}
				if (V.activeSlave.balls < 20) {
					V.activeSlave.balls += jsRandom(5, 20);
				}
				V.activeSlave.scrotum = V.activeSlave.balls-5;
				V.activeSlave.prostate = jsEither([1, 1, 1, 2, 2, 3]);
				if (V.activeSlave.muscles < 30) {
					V.activeSlave.muscles += jsRandom(0, 20);
				}
			}
			if (V.arcologies[market].FSChattelReligionist > 20) {
				r += `They're rarely anything but devoted, and sometimes present interesting peccadilloes. `;
				V.activeSlave.slaveName = setup.chattelReligionistSlaveNames.random();
				if (V.activeSlave.devotion < 10) {
					V.activeSlave.devotion += jsRandom(0, 10);
				}
				if (V.activeSlave.devotion < 10) {
					V.activeSlave.devotion += jsRandom(0, 10);
				}
				if (jsRandom(0, 1) === 0) {
					V.activeSlave.behavioralQuirk = "sinful";
				}
			}
			if (V.arcologies[market].FSRomanRevivalist > 20) {
				r += `They've often `;
				if (!canSee(V.activeSlave)) {
					r += `been party to`;
				} else {
					r += `seen`;
				}
				r += ` things that drive any squeamishness out of them. `;
				V.activeSlave.slaveName = setup.romanSlaveNames.random();
				if (jsRandom(0, 1) === 0) {
					V.activeSlave.sexualQuirk = "unflinching";
				}
			} else if (V.arcologies[market].FSAztecRevivalist > 20) {
				r += `They've seen sights that will traumatize almost anyone`;
				if (!canSee(V.activeSlave)) {
					r += ", so to speak. ";
				} else {
					r += ". ";
				}
				V.activeSlave.slaveName = setup.aztecSlaveNames.random();
				if (jsRandom(0, 1) === 0) {
					V.activeSlave.trust = -30;
				}
			} else if (V.arcologies[market].FSEgyptianRevivalist > 20) {
				r += `They've often done things that give them a distinct appetite for perversion. `;
				V.activeSlave.slaveName = setup.ancientEgyptianSlaveNames.random();
				if (jsRandom(0, 1) === 0) {
					V.activeSlave.sexualQuirk = "perverted";
				}
			} else if (V.arcologies[market].FSEdoRevivalist > 20) {
				r += `They have frequently absorbed much culture there. `;
				V.activeSlave.slaveName = setup.edoSlaveNames.random();
				V.activeSlave.skill.entertainment = Math.clamp(V.activeSlave.skill.entertainment, 35, 100);
			} else if (V.arcologies[market].FSArabianRevivalist > 20) {
				r += `They've often been part of large harems in which selflessness is prized. `;
				if (jsRandom(0, 1) === 0) {
					V.activeSlave.sexualQuirk = "caring";
				}
			} else if (V.arcologies[market].FSChineseRevivalist > 20) {
				r += `They've all passed through a thorough and uncompromising educational system for slaves. `;
				V.activeSlave.intelligenceImplant = 30;
				if (V.arcologies[market].FSIntellectualDependency === "unset") {
					if (V.activeSlave.intelligence < 60) {
						V.activeSlave.intelligence += jsRandom(0, 20);
					}
				}
			}
			if (V.arcologies[market].FSIncestFetishist > 20) {
				r += `Incest is acceptable, if not preferable to them. `;
				if (V.activeSlave.sexualQuirk === "none" && V.activeSlave.behavioralQuirk === "none") {
					if (jsRandom(0, 1) === 0) {
						V.activeSlave.sexualQuirk = "perverted";
					} else {
						V.activeSlave.behavioralQuirk = "sinful";
					}
				} else if (V.activeSlave.sexualQuirk === "none" || V.activeSlave.sexualQuirk === "perverted") {
					V.activeSlave.sexualQuirk = "perverted";
				} else {
					V.activeSlave.behavioralQuirk = "sinful";
				}
			}
			if ((V.arcologies[0].FSDegradationist !== "unset") && (V.arcologies[market].FSPaternalist !== "unset")) {
				V.activeSlave.devotion = jsRandom(-90, -60);
				V.activeSlave.trust = -20;
				r += `<b>${V.arcologies[market].name}</b> is Paternalist, and your arcology is Degradationist. To its slaves, other niceties of social alignment are trivial. They view your arcology as a literal Hell on Earth. `;
			} else if ((V.arcologies[0].FSPaternalist !== "unset") && (V.arcologies[market].FSDegradationist !== "unset")) {
				V.activeSlave.devotion = jsRandom(60, 90);
				V.activeSlave.trust = 20;
				r += `<b>${V.arcologies[market].name}</b> is Degradationist, and your arcology is Paternalist. To its slaves, other niceties of social alignment are trivial. They view your arcology as a promised land. `;
			} else if (opinion !== 0) {
				V.activeSlave.devotion += opinion;
				V.activeSlave.trust += opinion;
				V.activeSlave.devotion = Math.clamp(V.activeSlave.devotion, -100, 75);
				V.activeSlave.trust = Math.clamp(V.activeSlave.trust, -100, 75);
				if (opinion > 2) {
					r += `Your arcology's close social alignment with <b>${V.arcologies[market].name}</b> makes its slaves more accepting of the prospect of life in your arcology, and willing to trust that they'll know how to survive there. `;
				} else if (opinion < -2) {
					r += `Your arcology's very different culture from <b>${V.arcologies[market].name}</b>'s makes its slaves unhappy with the prospect of life in your arcology, and afraid of what will happen to them there. `;
				}
			}
			break;
		case "heap":
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from a body dump, completely broken.";
			V.activeSlave.devotion = 0;
			V.activeSlave.trust = 0;
			V.activeSlave.career = "a slave";
			V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-100, 0]});
			V.activeSlave.intelligenceImplant = 0;
			setHealth(V.activeSlave, jsRandom(-50, 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0), 0), jsRandom(40, 90));
			V.activeSlave.weight = jsRandom(-100, 0);
			if (jsRandom(1, 8) === 1) {
				eyeSurgery(V.activeSlave, "both", "blind");
			} else if (jsRandom(1, 7) <= 4) {
				eyeSurgery(V.activeSlave, "both", "blur");
			}
			V.activeSlave.hears = jsEither([-2, -1, -1, -1, -1, 0, 0, 0]);
			if (V.seeExtreme === 1 && jsRandom(0, 2) === 2) {
				// TODO: maybe only partly amputee?
				removeLimbs(V.activeSlave, "all");
			}
			if (hasAnyLegs(V.activeSlave)) {
				V.activeSlave.heels = jsEither([0, 0, 0, 0, 0, 1, 1]);
			}
			V.activeSlave.voice = jsRandom(0, 2);
			V.activeSlave.face = jsRandom(-100, 20);
			if (V.activeSlave.vagina > -1) {
				V.activeSlave.vagina = jsEither([1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 10]);
				V.activeSlave.preg = jsRandom(-3, -1);
				V.activeSlave.belly = 0;
				V.activeSlave.bellyPreg = 0;
				V.activeSlave.counter.vaginal += jsRandom(0, 300);
			}
			V.activeSlave.anus = jsEither([1, 2, 2, 3, 3, 3, 3, 4, 4, 4]);
			if (V.activeSlave.balls > 1) {
				if (jsRandom(1, 100) > 50) {
					V.activeSlave.balls = 0;
				}
			}
			V.activeSlave.counter.oral += jsRandom(0, 300);
			V.activeSlave.counter.anal += jsRandom(0, 300);
			if (V.activeSlave.boobs > 500) {
				V.activeSlave.counter.mammary += jsRandom(0, 300);
			}
			V.activeSlave.skill.vaginal = 0;
			V.activeSlave.skill.oral = 0;
			V.activeSlave.skill.anal = 0;
			V.activeSlave.skill.whoring = 0;
			V.activeSlave.skill.entertainment = 0;
			V.activeSlave.skill.combat = 0;
			V.activeSlave.addict = jsEither([0, 0, 0, 10, 10, 20, 30]);
			V.activeSlave.chem = jsRandom(0, 1000);
			V.activeSlave.behavioralFlaw = "none";
			V.activeSlave.behavioralQuirk = "none";
			V.activeSlave.sexualFlaw = "none";
			V.activeSlave.sexualQuirk = "none";
			V.activeSlave.fetish = "mindbroken";
			V.activeSlave.fetishStrength = 0;
			break;
		case "wetware":
			V.fixedNationality = "Stateless";
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from a wetware CPU farm, $his body ruined but $his mind subjected to a simulated career.";
			V.activeSlave.devotion = 40;
			V.activeSlave.trust = -100;
			V.activeSlave.career = jsEither(["a business owner", "a college scout", "a counselor", "a dairy worker", "a doctor", "a house DJ", "a politician", "a prison guard", "a secretary", "a soldier", "a teacher", "a lawyer"]);
			V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [50, 100]});
			V.activeSlave.intelligenceImplant = 30;
			setHealth(V.activeSlave, jsRandom(-50, -10), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0), 0), jsRandom(40, 90));
			V.activeSlave.weight = jsRandom(-100, -50);
			V.activeSlave.muscles = jsRandom(-100, -50);
			eyeSurgery(V.activeSlave, "both", "blind");
			V.activeSlave.hears = -2;
			V.activeSlave.smells = -1;
			V.activeSlave.tastes = -1;
			if (V.seeExtreme === 1) {
				removeLimbs(V.activeSlave, "all");
				V.activeSlave.earShape = "none";
			}
			if (hasAnyLegs(V.activeSlave)) {
				V.activeSlave.heels = 1;
			}
			V.activeSlave.voice = 0;
			V.activeSlave.face = jsRandom(-50, 75);
			V.activeSlave.butt = 0;
			if (V.activeSlave.vagina > -1) {
				V.activeSlave.vagina = jsEither([1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 10]);
				V.activeSlave.preg = jsRandom(-3, -1);
				V.activeSlave.counter.vaginal += jsRandom(0, 300);
			}
			V.activeSlave.anus = jsEither([1, 2, 2, 3, 3, 3, 3, 4, 4, 4]);
			if (V.activeSlave.balls > 1 && jsRandom(1, 100) > 50) {
				V.activeSlave.balls = 0;
			}
			V.activeSlave.counter.oral += jsRandom(0, 300);
			V.activeSlave.counter.anal += jsRandom(0, 300);
			if (V.activeSlave.boobs > 500) {
				V.activeSlave.counter.mammary += jsRandom(0, 300);
			}
			V.activeSlave.skill.vaginal = jsRandom(80, 100);
			V.activeSlave.skill.oral = jsRandom(80, 100);
			V.activeSlave.skill.anal = jsRandom(80, 100);
			V.activeSlave.skill.whoring = jsRandom(80, 100);
			V.activeSlave.skill.entertainment = jsRandom(80, 100);
			switch (V.activeSlave.career) {
				case "a lawyer":
					V.activeSlave.slaveName = "WCPU-HG"; break;
				case "a college scout":
					V.activeSlave.slaveName = "WCPU-RC"; break;
				case "a business owner":
					V.activeSlave.slaveName = "WCPU-MD"; break;
				case "a house DJ":
					V.activeSlave.slaveName = "WCPU-DJ"; break;
				case "a soldier":
					V.activeSlave.slaveName = "WCPU-BG"; break;
				case "a prison guard":
					V.activeSlave.slaveName = "WCPU-WD"; break;
				case "a doctor":
					V.activeSlave.slaveName = "WCPU-NS"; break;
				case "a counselor":
					V.activeSlave.slaveName = "WCPU-AT"; break;
				case "a dairy worker":
					V.activeSlave.slaveName = "WCPU-MK"; break;
				case "a secretary":
					V.activeSlave.slaveName = "WCPU-ST"; break;
				case "a teacher":
					V.activeSlave.slaveName = "WCPU-TE";
			}
			V.activeSlave.slaveSurname = `#${V.activeSlave.skill.vaginal}${V.activeSlave.skill.oral}${V.activeSlave.skill.anal}${V.activeSlave.skill.whoring}${V.activeSlave.skill.entertainment}-${V.activeSlave.intelligence} `;
			V.activeSlave.birthName = "";
			V.activeSlave.birthSurname = "";
			if (V.activeSlave.career === "a soldier") {
				V.activeSlave.skill.combat = 1;
			} else {
				V.activeSlave.skill.combat = 0;
			}
			V.activeSlave.addict = jsEither([0, 0, 0, 10, 10, 20, 30]);
			V.activeSlave.chem = jsRandom(500, 1000);
			V.activeSlave.behavioralFlaw = "none";
			V.activeSlave.behavioralQuirk = "none";
			V.activeSlave.sexualFlaw = "none";
			V.activeSlave.sexualQuirk = "none";
			V.activeSlave.fetish = "none";
			V.activeSlave.fetishStrength = 0;
			break;
		case "kidnappers":
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from the kidnappers' slave market, so $he was probably forced into slavery.";
			V.activeSlave.devotion -= 5;
			V.activeSlave.trust = jsRandom(-45, -25);
			V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-90, 45]});
			setHealth(V.activeSlave, jsRandom(-80, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(0, 0.7), 0), jsRandom(30, 70));
			if (V.activeSlave.vagina > 1 && isFertile(V.activeSlave)) {
				V.activeSlave.preg = jsEither([-2, -1, -1, -1, -1, -1, -1, -1, 1, 20, 40]);
				if (V.activeSlave.preg > 0) {
					V.activeSlave.pregType = setPregType(V.activeSlave);
				}
				SetBellySize(V.activeSlave);
			}
			break;
		case "indentures":
			V.oneTimeDisableDisability = 1;
			if (V.arcologies[0].FSSupremacistLawME === 1) {
				V.fixedRace = V.arcologies[0].FSSupremacistRace;
			} else if (V.arcologies[0].FSSubjugationistLawME === 1) {
				const races = setup.filterRacesLowercase.filter(race => race !== V.arcologies[0].FSSubjugationistRace);
				V.fixedRace = jsEither(races);
			}
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You purchased $his indenture contract, making $him yours for as long as it lasts.";
			V.activeSlave.indentureRestrictions = jsEither([0, 1, 1, 2, 2, 2, 2]);
			if (V.activeSlave.indentureRestrictions >= 2) {
				V.activeSlave.devotion = jsRandom(25, 45);
				V.activeSlave.trust = jsRandom(-20, 20);
			} else if (V.activeSlave.indentureRestrictions === 1) {
				V.activeSlave.devotion = jsRandom(-20, 20);
				V.activeSlave.trust = jsRandom(-45, -25);
			} else {
				V.activeSlave.devotion = jsRandom(-45, -25);
				V.activeSlave.trust = jsRandom(-75, -60);
			}
			V.activeSlave.indenture = jsEither([26, 52, 104, 156, 208]);

			break;
		case "hunters":
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from the runaway hunters' slave market after they recaptured $him and $his original owner did not pay their fee.";
			V.activeSlave.devotion = -20;
			V.activeSlave.trust = jsRandom(-15, 15);
			V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [0, 100]});
			V.activeSlave.intelligenceImplant = 15;
			if (V.activeSlave.physicalAge >= 12) {
				V.activeSlave.teeth = "normal";
			}
			setHealth(V.activeSlave, jsRandom(-10, 70), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(30, 70));
			if (V.activeSlave.vagina > -1) {
				V.activeSlave.preg = jsEither([-2, -1, -1, -1, -1, -1, -1, -1, 1, 1]);
				if (V.activeSlave.physicalAge < V.activeSlave.pubertyAgeXX) {
					V.activeSlave.preg = -1;
				}
				if (V.activeSlave.preg > 0) {
					V.activeSlave.pregType = setPregType(V.activeSlave);
				}
				SetBellySize(V.activeSlave);
				V.activeSlave.skill.vaginal = jsRandom(15, 100);
				V.activeSlave.vagina = jsRandom(1, 3);
			}
			if (V.activeSlave.balls > 0) {
				if (jsRandom(1, 3) === 1) {
					V.activeSlave.balls = 0;
				}
			}
			V.activeSlave.skill.combat = jsEither([0, 0, 0, 0, 0, 1]);
			V.activeSlave.skill.entertainment = jsRandom(15, 100);
			V.activeSlave.skill.whoring = jsRandom(15, 100);
			V.activeSlave.skill.oral = jsRandom(15, 100);
			V.activeSlave.skill.anal = jsRandom(15, 100);
			V.activeSlave.anus = jsRandom(1, 3);
			V.activeSlave.weight = Math.clamp(-25, 25, V.activeSlave.weight);
			V.activeSlave.behavioralFlaw = jsEither(["anorexic", "arrogant", "bitchy", "devout", "gluttonous", "hates men", "hates women", "hates women", "liberated", "odd"]);
			V.activeSlave.sexualFlaw = jsEither(["apathetic", "crude", "hates anal", "hates oral", "hates penetration", "idealistic", "judgemental", "repressed", "shamefast"]);
			if (jsRandom(1, 2) === 1) {
				let slaveGen = jsRandom(2, 8)*200;
				V.activeSlave.boobs += slaveGen;
				V.activeSlave.boobsImplant += slaveGen;
				if (V.activeSlave.boobsImplant > 1000) {
					V.activeSlave.boobsImplantType = jsEither(["fillable", "fillable", "normal", "string"]);
				} else {
					V.activeSlave.boobsImplantType = jsEither(["normal", "normal", "normal", "string"]);
				}
				slaveGen = jsRandom(1, 3);
				V.activeSlave.butt += slaveGen;
				V.activeSlave.buttImplant += slaveGen;
				V.activeSlave.buttImplantType = "normal";
				slaveGen = jsEither([10, 20]);
				V.activeSlave.lips += slaveGen;
				V.activeSlave.lipsImplant += slaveGen;
				V.activeSlave.waist = Math.trunc(V.activeSlave.waist, -100, 15);
				if (V.activeSlave.face < 40) {
					V.activeSlave.faceImplant = 20*jsRandom(0, 1);
					V.activeSlave.face = Math.clamp(V.activeSlave.face+V.activeSlave.faceImplant, -100, 100);
				}
				if (V.activeSlave.physicalAge >= 30) {
					if (jsRandom(0, 1) > 0) {
						applyAgeImplant(V.activeSlave);
					}
				}
			}
			if (V.arcologies[0].FSPaternalistSMR === 0) {
				V.activeSlave.heels = 1;
			}
			break;
		case "underage raiders":
			V.activeSlaveOneTimeMinAge = V.minimumSlaveAge;
			V.activeSlaveOneTimeMaxAge = V.fertilityAge;
			V.one_time_age_overrides_pedo_mode = 1; // Must not have had their first period.
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from the underage raiders' slave market.";
			V.activeSlave.trust -= 25;
			setHealth(V.activeSlave, jsRandom(-30, 70), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 0.7), 0), jsRandom(20, 60));
			V.activeSlave.career = setup.veryYoungCareers.random();
			V.activeSlave.birthWeek = 0;
			if (V.activeSlave.vagina !== -1) {
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.vagina = 0;
				V.activeSlave.trueVirgin = 1;
				V.activeSlave.preg = 0;
				SetBellySize(V.activeSlave);
			}
			V.activeSlave.skill.anal = 0;
			V.activeSlave.anus = 0;
			V.activeSlave.skill.oral = 0;
			V.activeSlave.skill.whoring = 0;

			break;
		case "raiders":
			V.activeSlaveOneTimeMinAge = 18;
			V.activeSlaveOneTimeMaxAge = 18;
			V.one_time_age_overrides_pedo_mode = 1; // Supposed to have just reached the age of majority.
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from the $girl raiders' slave market the week $he reached $his majority.";
			V.activeSlave.trust -= 25;
			setHealth(V.activeSlave, jsRandom(-30, 70), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0, 3), 0), Math.max(normalRandInt(0, 0.7), 0), jsRandom(30, 70));
			V.activeSlave.career = jsEither(["a cheerleader", "a farm laborer", "a party girl", "a student", "a student", "a student", "a student", "a student"]);
			V.activeSlave.birthWeek = 0;
			if (V.activeSlave.vagina !== -1) {
				if (jsRandom(1, 2) === 1) {
					V.activeSlave.skill.vaginal = 0;
					V.activeSlave.vagina = 0;
					V.activeSlave.trueVirgin = 1;
					V.activeSlave.preg = 0;
					SetBellySize(V.activeSlave);
				}
			}
			if (jsRandom(1, 2) === 1) {
				V.activeSlave.skill.anal = 0;
				V.activeSlave.anus = 0;
			}
			if (jsRandom(1, 2) === 1) {
				V.activeSlave.skill.oral = 0;
			}
			V.activeSlave.skill.whoring = 0;

			break;
		case "trainers":
			V.activeSlaveOneTimeMaxAge = 42;
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from the trainers' slave market after they put $him through basic training.";
			V.activeSlave.devotion += 40;
			V.activeSlave.trust += 40;
			setHealth(V.activeSlave, jsRandom(-20, 80), Math.max(normalRandInt(0, 2), 0), undefined, Math.max(normalRandInt(0, 0.4), 0));
			if (V.activeSlave.vagina !== -1) {
				V.activeSlave.skill.vaginal += 15;
			} else {
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.clit = 0;
			}
			if (V.activeSlave.vagina === 0) {
				V.activeSlave.vagina += 1;
			}
			if (V.activeSlave.anus === 0) {
				V.activeSlave.anus += 1;
			}
			V.activeSlave.skill.oral += 15;
			V.activeSlave.skill.anal += 15;
			V.activeSlave.fetishKnown = 1;
			if (V.activeSlave.accent >= 3) {
				V.activeSlave.accent -= 1;
			}
			if (jsRandom(1, 100) > 50) {
				V.activeSlave.sexualFlaw = "none";
			}
			if (jsRandom(1, 100) > 50) {
				V.activeSlave.behavioralFlaw = "none";
			}
			break;
		case "TSS":
			if (V.TSS.schoolUpgrade === 1) {
				V.activeSlaveOneTimeMinAge = 36;
			} else {
				V.activeSlaveOneTimeMaxAge = 18;
			}
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave("XX");
			V.activeSlave.career = "a slave";
			V.activeSlave.butt = jsEither([1, 2, 2, 3]);
			V.activeSlave.boobs = jsEither([200, 300, 300, 400]);
			if (V.TSS.schoolUpgrade === 1) {
				V.activeSlave.origin = "You bought $him fresh from the new Slavegirl School after $he was retrained as a slave $girl.";
				V.activeSlave.butt += 1;
				V.activeSlave.boobs += 200;
				V.activeSlave.anus = 1;
				V.activeSlave.vagina = 1;
			} else {
				V.activeSlave.origin = "You bought $him fresh from the Slavegirl School right after $his majority.";
				V.activeSlave.anus = 0;
				V.activeSlave.vagina = 0;
				V.activeSlave.trueVirgin = 1;
				V.activeSlave.birthWeek = 0;
			}
			V.activeSlave.intelligenceImplant = 30;
			if (V.activeSlave.physicalAge >= 12) {
				V.activeSlave.teeth = "normal";
			}
			V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-20, 70]});
			V.activeSlave.devotion = jsRandom(25, 45);
			V.activeSlave.trust = jsRandom(25, 45);
			setHealth(V.activeSlave, jsRandom(50, 60), 0, Math.max(normalRandInt(0), 0), 0, jsRandom(0, 20));
			V.activeSlave.preg = 0;
			SetBellySize(V.activeSlave);
			V.activeSlave.weight = 0;
			V.activeSlave.waist = jsRandom(-30, 10);
			V.activeSlave.chem = 20;
			if (V.TSS.schoolUpgrade === 0) {
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.skill.oral = 0;
				V.activeSlave.skill.anal = 0;
				V.activeSlave.skill.whoring = 0;
				V.activeSlave.skill.entertainment = 15;
			} else {
				V.activeSlave.skill.vaginal = 15;
				V.activeSlave.skill.oral = 15;
				V.activeSlave.skill.anal = 15;
				V.activeSlave.skill.whoring = 15;
				V.activeSlave.skill.entertainment = 15;
			}
			V.activeSlave.skill.combat = 0;
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.underArmHStyle = "waxed";
			V.activeSlave.sexualFlaw = "none";
			V.activeSlave.behavioralFlaw = "none";
			V.activeSlave.hStyle = "tails";
			V.activeSlave.custom.tattoo = "$He has the simple logo of the corporation that operates The Slavegirl School tattooed on $his left cheek.";

			break;
		case "GRI":
			V.activeSlaveOneTimeMinAge = 16;
			V.activeSlaveOneTimeMaxAge = 19;
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave("XX");
			V.activeSlave.origin = "You bought $him from the Growth Research Institute right after $his use as a test subject ended.";
			V.activeSlave.career = "a slave";
			V.activeSlave.intelligenceImplant = 0;
			V.activeSlave.devotion = jsRandom(-15, -5);
			V.activeSlave.trust = jsRandom(-25, -45);
			V.activeSlave.chem = 100;
			if (V.GRI.schoolUpgrade === 1) {
				setHealth(V.activeSlave, 200, 0, Math.max(normalRandInt(0), 0), 0, 0);
			} else {
				setHealth(V.activeSlave, jsRandom(-50, 100), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0, 0.5), 0), jsRandom(0, 20));
			}
			V.activeSlave.height = jsRandom(160, 210);
			V.activeSlave.butt = jsRandom(4, 10);
			if (V.GRI.schoolUpgrade === 2) {
				V.activeSlave.boobs = 200*jsRandom(15, 30);
				V.activeSlave.lactation = 2;
				V.activeSlave.lactationDuration = 2;
			} else {
				V.activeSlave.boobs = 200*jsRandom(4, 20);
			}
			V.activeSlave.nipples = jsEither(["huge", "inverted"]);
			V.activeSlave.areolae = jsEither([0, 1, 2, 3, 4]);
			V.activeSlave.clit = jsEither([0, 1, 2, 3]);
			V.activeSlave.lips = jsRandom(5, 85);
			V.activeSlave.anus = 0;
			V.activeSlave.vagina = 0;
			V.activeSlave.preg = 0;
			SetBellySize(V.activeSlave);
			V.activeSlave.weight = 0;
			V.activeSlave.waist = jsRandom(-20, 30);
			V.activeSlave.skill.vaginal = 0;
			V.activeSlave.skill.oral = 0;
			V.activeSlave.skill.anal = 0;
			V.activeSlave.skill.whoring = 0;
			V.activeSlave.skill.entertainment = 0;
			V.activeSlave.skill.combat = 0;
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.birthWeek = 0;
			V.activeSlave.behavioralFlaw = "odd";
			V.activeSlave.hStyle = "shaved";
			V.activeSlave.hLength = 0;
			V.activeSlave.custom.tattoo = "$He has a barcode that identified $him when $he was a test subject at the Growth Research Institute tattooed on $his left cheek.";

			break;
		case "SCP":
			V.activeSlaveOneTimeMinAge = 16;
			V.activeSlaveOneTimeMaxAge = 19;
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave("XX");
			V.activeSlave.origin = "You bought $him from St. Claver Preparatory after $he served as a plastic surgeon's passing final exam.";
			V.activeSlave.chem = 20;
			V.activeSlave.career = "a slave";
			if (V.SCP.schoolUpgrade === 1) {
				V.activeSlave.intelligenceImplant = 0;
				V.activeSlave.intelligence = -60;
				V.activeSlave.devotion = 100;
				V.activeSlave.trust = 100;
			} else {
				V.activeSlave.intelligenceImplant = 15;
				V.activeSlave.teeth = "normal";
				V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-30, 60]});
				V.activeSlave.devotion = jsRandom(25, 45);
				V.activeSlave.trust = jsRandom(25, 45);
			}
			setHealth(V.activeSlave, 100, Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(5, 4), 0), 0, jsRandom(0, 20));
			V.activeSlave.heightImplant = 1;
			V.activeSlave.height += 10;
			V.activeSlave.buttImplant = (4-V.activeSlave.butt);
			V.activeSlave.buttImplantType = "normal";
			V.activeSlave.butt += V.activeSlave.buttImplant;
			V.activeSlave.boobsImplant = (2000-V.activeSlave.boobs);
			V.activeSlave.boobs += V.activeSlave.boobsImplant;
			V.activeSlave.boobsImplantType = "fillable";
			V.activeSlave.nipples = "tiny";
			V.activeSlave.areolae = 0;
			V.activeSlave.clit = 0;
			V.activeSlave.lipsImplant = (20-V.activeSlave.lips);
			V.activeSlave.lips += V.activeSlave.lipsImplant;
			V.activeSlave.faceImplant = 40;
			V.activeSlave.face = Math.clamp(V.activeSlave.face+V.activeSlave.faceImplant, -100, 100);
			V.activeSlave.faceShape = "normal";
			V.activeSlave.anus = 0;
			V.activeSlave.vagina = 0;
			V.activeSlave.preg = 0;
			SetBellySize(V.activeSlave);
			V.activeSlave.weight = -20;
			V.activeSlave.waist = -50;
			if (V.SCP.schoolUpgrade === 2) {
				V.activeSlave.skill.vaginal = 15;
				V.activeSlave.skill.oral = 15;
				V.activeSlave.skill.anal = 15;
				V.activeSlave.skill.whoring = 15;
				V.activeSlave.skill.entertainment = 15;
			} else {
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.skill.oral = 0;
				V.activeSlave.skill.anal = 0;
				V.activeSlave.skill.whoring = 0;
				V.activeSlave.skill.entertainment = 0;
			}
			V.activeSlave.skill.combat = 0;
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.underArmHStyle = "waxed";
			V.activeSlave.birthWeek = 0;
			V.activeSlave.sexualFlaw = "none";
			V.activeSlave.behavioralFlaw = "none";
			V.activeSlave.hStyle = "tails";
			V.activeSlave.pubicHColor = "blonde";
			V.activeSlave.underArmHColor = "blonde";
			V.activeSlave.eyebrowHColor = "blonde";
			V.activeSlave.race = "white";
			V.activeSlave.skin = "sun tanned";
			V.activeSlave.override_H_Color = 1;
			V.activeSlave.override_Race = 1;
			V.activeSlave.override_Skin = 1;
			V.activeSlave.custom.tattoo = "$He has the coat of arms of St. Claver Preparatory tattooed on $his left cheek.";

			break;
		case "LDE":
			V.activeSlaveOneTimeMinAge = 16;
			V.activeSlaveOneTimeMaxAge = 19;
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave("XY");
			V.activeSlave.origin = "You bought $him from the innovative École des Enculées right after $his graduation.";
			V.activeSlave.career = "a slave";
			V.activeSlave.intelligenceImplant = 0;
			V.activeSlave.chem = 100;
			if (V.LDE.schoolUpgrade === 1) {
				V.activeSlave.devotion = 100;
				V.activeSlave.trust = 100;
			} else {
				V.activeSlave.devotion = jsRandom(60, 75);
				V.activeSlave.trust = jsRandom(55, 60);
			}
			setHealth(V.activeSlave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 2), 0), 0, jsRandom(0, 20));
			V.activeSlave.muscles = 0;
			V.activeSlave.butt = jsEither([4, 5]);
			V.activeSlave.face = jsRandom(15, 55);
			V.activeSlave.faceShape = "androgynous";
			V.activeSlave.boobs = jsEither([500, 650, 800]);
			V.activeSlave.waist = -15;
			V.activeSlave.lips = 35;
			if (V.LDE.schoolUpgrade === 2) {
				V.activeSlave.dick = jsEither([3, 4]);
				V.activeSlave.balls = jsEither([3, 4]);
				if (V.activeSlave.foreskin > 0) {
					V.activeSlave.foreskin = V.activeSlave.dick;
				}
				if (V.activeSlave.balls > 0) {
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
			} else {
				V.activeSlave.dick = jsEither([1, 1, 1, 2]);
				V.activeSlave.balls = jsEither([1, 1, 1, 2]);
				if (V.activeSlave.foreskin > 0) {
					V.activeSlave.foreskin = V.activeSlave.dick;
				}
				if (V.activeSlave.balls > 0) {
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
				V.activeSlave.pubertyXY = 0;
				V.activeSlave.pubertyAgeXY = jsRandom(24, 50);
			}
			V.activeSlave.anus = 2;
			V.activeSlave.vagina = -1;
			V.activeSlave.preg = 0;
			SetBellySize(V.activeSlave);
			V.activeSlave.weight = jsRandom(0, 20);
			V.activeSlave.skill.vaginal = 0;
			V.activeSlave.skill.oral = 15;
			V.activeSlave.skill.anal = 100;
			V.activeSlave.skill.whoring = 15;
			V.activeSlave.skill.entertainment = 15;
			V.activeSlave.skill.combat = 0;
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.birthWeek = 0;
			V.activeSlave.sexualFlaw = "none";
			V.activeSlave.behavioralFlaw = jsEither(["none", "odd"]);
			V.activeSlave.fetishStrength = jsEither([1, 2]);
			V.activeSlave.fetish = "buttslut";
			V.activeSlave.fetishKnown = 1;
			V.activeSlave.attrKnown = 1;
			V.activeSlave.hStyle = "tails";
			V.activeSlave.hLength = 100;
			V.activeSlave.custom.tattoo = "$He has the buttock-shaped symbol of the École des Enculées that created $him tattooed on $his left cheek.";

			break;
		case "TGA":
			V.activeSlaveOneTimeMinAge = 16;
			V.activeSlaveOneTimeMaxAge = 19;
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave("XY");
			V.activeSlave.origin = "You bought $him fresh from the intense Gymnasium-Academy right after $his majority.";
			V.activeSlave.career = "a slave";
			V.activeSlave.intelligenceImplant = 30;
			V.activeSlave.teeth = "normal";
			V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [-20, 60]});
			V.activeSlave.chem = 20;
			if (V.TGA.schoolUpgrade === 1) {
				V.activeSlave.devotion = 100;
				V.activeSlave.trust = 100;
			} else {
				V.activeSlave.devotion = jsRandom(25, 45);
				V.activeSlave.trust = jsRandom(25, 45);
			}
			setHealth(V.activeSlave, 100, 0, undefined, Math.max(normalRandInt(0, 0.4), 0), jsRandom(0, 30));
			V.activeSlave.muscles = jsEither([20, 50, 50]);
			V.activeSlave.butt = jsEither([2, 2, 3]);
			V.activeSlave.boobs = jsEither([100, 200]);
			V.activeSlave.dick = jsRandom(3, 5);
			V.activeSlave.balls = jsRandom(3, 5);
			V.activeSlave.anus = 0;
			V.activeSlave.vagina = -1;
			V.activeSlave.preg = 0;
			SetBellySize(V.activeSlave);
			V.activeSlave.weight = 0;
			V.activeSlave.waist = jsRandom(-10, 30);
			V.activeSlave.skill.vaginal = 0;
			V.activeSlave.skill.oral = 0;
			V.activeSlave.skill.anal = 0;
			V.activeSlave.skill.whoring = 0;
			V.activeSlave.skill.entertainment = 0;
			if (V.TGA.schoolUpgrade === 2) {
				V.activeSlave.skill.combat = 1;
			} else {
				V.activeSlave.skill.combat = 0;
			}
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.underArmHStyle = "waxed";
			V.activeSlave.birthWeek = 0;
			V.activeSlave.sexualFlaw = jsEither(["apathetic", "none"]);
			V.activeSlave.behavioralFlaw = jsEither(["arrogant", "none", "odd"]);
			V.activeSlave.hStyle = "short";
			V.activeSlave.hLength = 2;
			V.activeSlave.brand["left cheek"] = "the baroque crest of the Gymnasium-Academy that trained $him";
			break;
		case "TCR":
			if (V.TCR.schoolUpgrade === 2 && jsRandom(1, 100) <= 20) {
				V.activeSlaveOneTimeMinAge = V.fertilityAge;
				V.activeSlaveOneTimeMaxAge = 18;
				V.one_time_age_overrides_pedo_mode = 1;
				V.oneTimeDisableDisability = 1;
				V.activeSlave = GenerateNewSlave("XX");
				V.activeSlave.origin = "You bought $him from The Cattle Ranch.";
				V.activeSlave.career = "a dairy slave";
				V.activeSlave.slaveName = setup.cowSlaveNames.random();
				V.activeSlave.slaveSurname = 0;
				V.activeSlave.butt = jsEither([2, 2, 3, 3, 3, 4, 4]);
				V.activeSlave.boobs = ((V.activeSlave.physicalAge*100)*2)+jsEither([-100, -100, 0, 0, 100, 100, 200, 200, 300, 500]);
				V.activeSlave.lactation = 0;
				V.activeSlave.lactationAdaptation = 0;
				V.activeSlave.lactationDuration = 0;
				V.activeSlave.anus = 0;
				V.activeSlave.vagina = 0;
				V.activeSlave.trueVirgin = 1;
				V.activeSlave.vaginaLube = jsEither([1, 1, 2]);
				V.activeSlave.intelligenceImplant = 0;
				V.activeSlave.devotion = -20;
				V.activeSlave.trust = -20;
				setHealth(V.activeSlave, jsRandom(20, 30), 0, Math.max(normalRandInt(0, 4), 0), 0);
				V.activeSlave.preg = 0;
				SetBellySize(V.activeSlave);
				V.activeSlave.hips = jsEither([0, 0, 1, 1, 1, 2]);
				V.activeSlave.weight = jsRandom(-20, 10);
				V.activeSlave.waist = jsRandom(-30, 10);
				V.activeSlave.muscles = 0;
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.skill.oral = 0;
				V.activeSlave.skill.anal = 0;
				V.activeSlave.skill.whoring = 0;
				V.activeSlave.skill.entertainment = 0;
				V.activeSlave.skill.combat = 0;
				V.activeSlave.pubicHStyle = "waxed";
				V.activeSlave.underArmHStyle = "waxed";
				V.activeSlave.heels = 1;
				V.activeSlave.hStyle = "neat";
				V.activeSlave.collar = "leather with cowbell";
				V.activeSlave.brand["right thigh"] = "the logo of the Cattle Ranch";
			} else if (V.TCR.schoolUpgrade === 1 && jsRandom(1, 100) <= 20) {
				V.activeSlaveOneTimeMinAge = V.potencyAge+1;
				V.activeSlaveOneTimeMaxAge = 24;
				V.one_time_age_overrides_pedo_mode = 1;
				V.oneTimeDisableDisability = 1;
				V.activeSlave = GenerateNewSlave("XY");
				V.activeSlave.slaveName = setup.cowSlaveNames.random();
				V.activeSlave.slaveSurname = 0;
				V.activeSlave.origin = "You bought $him from The Cattle Ranch.";
				V.activeSlave.career = "a breeding bull";
				V.activeSlave.butt = jsEither([3, 3, 4, 4, 4, 5, 6]);
				V.activeSlave.boobs = 100;
				V.activeSlave.anus = 0;
				V.activeSlave.intelligence = -100;
				V.activeSlave.intelligenceImplant = 0;
				V.activeSlave.devotion = 100;
				V.activeSlave.trust = 100;
				setHealth(V.activeSlave, jsRandom(20, 30), 0, Math.max(normalRandInt(0, 4), 0), 0);
				V.activeSlave.hips = jsEither([1, 1, 1, 2, 2]);
				V.activeSlave.dick = 6;
				V.activeSlave.foreskin = 0;
				V.activeSlave.balls = jsRandom(19, 30);
				V.activeSlave.scrotum = 10;
				V.activeSlave.prostate = 2;
				V.activeSlave.weight = jsRandom(10, 30);
				V.activeSlave.waist = jsRandom(0, 100);
				V.activeSlave.muscles = jsRandom(80, 100);
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.skill.oral = 0;
				V.activeSlave.skill.anal = 0;
				V.activeSlave.skill.whoring = 0;
				V.activeSlave.skill.entertainment = 0;
				V.activeSlave.skill.combat = 0;
				V.activeSlave.pubicHStyle = "waxed";
				V.activeSlave.underArmHStyle = "waxed";
				V.activeSlave.heels = 1;
				V.activeSlave.energy = 100;
				V.activeSlave.fetish = "mindbroken";
				V.activeSlave.fetishStrength = 10;
				V.activeSlave.fetishKnown = 1;
				V.activeSlave.sexualFlaw = "none";
				V.activeSlave.behavioralFlaw = "none";
				V.activeSlave.sexualQuirk = "none";
				V.activeSlave.behavioralQuirk = "none";
				V.activeSlave.hStyle = "neat";
				V.activeSlave.brand["right thigh"] = "the logo of the Cattle Ranch";
			} else {
				V.activeSlaveOneTimeMinAge = 19;
				V.activeSlaveOneTimeMaxAge = 24;
				V.one_time_age_overrides_pedo_mode = 1;
				V.oneTimeDisableDisability = 1;
				V.activeSlave = GenerateNewSlave("XX");
				V.activeSlave.slaveName = setup.cowSlaveNames.random();
				V.activeSlave.slaveSurname = 0;
				V.activeSlave.origin = "You bought $him from The Cattle Ranch.";
				V.activeSlave.career = "a dairy cow";
				V.activeSlave.butt = jsEither([3, 3, 4, 4, 4, 5, 6]);
				V.activeSlave.boobs = ((V.activeSlave.physicalAge*100)*2)+jsEither([-100, -100, 0, 0, 100, 100, 200, 200, 300, 500]);
				V.activeSlave.lactation = 1;
				V.activeSlave.lactationDuration = 2;
				V.activeSlave.lactationAdaptation = 100;
				V.activeSlave.anus = 1;
				V.activeSlave.vagina = 3;
				V.activeSlave.vaginaLube = 2;
				V.activeSlave.intelligence = jsEither([-100, -100, -100, -100, -60, -60, -30]);
				V.activeSlave.intelligenceImplant = 0;
				V.activeSlave.devotion = 100;
				V.activeSlave.trust = 100;
				setHealth(V.activeSlave, jsRandom(20, 30), 0, Math.max(normalRandInt(0, 4), 0), 0);
				V.activeSlave.preg = jsRandom(10, 40);
				V.activeSlave.pregType = jsRandom(1, 5);
				V.activeSlave.pregKnown = 1;
				SetBellySize(V.activeSlave);
				V.activeSlave.bellySag = 2;
				V.activeSlave.bellySagPreg = 2;
				V.activeSlave.hips = jsEither([1, 1, 1, 2, 2]);
				V.activeSlave.counter.birthsTotal = jsRandom(1, 7);
				V.activeSlave.pregAdaptation = 120;
				V.activeSlave.weight = jsRandom(20, 90);
				V.activeSlave.waist = jsRandom(-10, 50);
				V.activeSlave.muscles = jsRandom(60, 80);
				V.activeSlave.chem = 0;
				V.activeSlave.skill.vaginal = 0;
				V.activeSlave.skill.oral = 0;
				V.activeSlave.skill.anal = 0;
				V.activeSlave.skill.whoring = 0;
				V.activeSlave.skill.entertainment = 0;
				V.activeSlave.skill.combat = 0;
				V.activeSlave.pubicHStyle = "waxed";
				V.activeSlave.underArmHStyle = "waxed";
				V.activeSlave.heels = 1;
				V.activeSlave.fetish = "mindbroken";
				V.activeSlave.fetishStrength = 10;
				V.activeSlave.fetishKnown = 1;
				V.activeSlave.sexualFlaw = "none";
				V.activeSlave.behavioralFlaw = "none";
				V.activeSlave.sexualQuirk = "none";
				V.activeSlave.behavioralQuirk = "none";
				V.activeSlave.hStyle = "neat";
				V.activeSlave.collar = "leather with cowbell";
				V.activeSlave.brand["right thigh"] = "the logo of the Cattle Ranch";
			}
			break;
		case "TFS":
			V.activeSlaveOneTimeMinAge = 25;
			V.activeSlaveOneTimeMaxAge = 29;
			V.one_time_age_overrides_pedo_mode = 1;
			V.oneTimeDisableDisability = 1;
			if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek+15 <= V.week) {
				V.activeSlave = GenerateNewSlave();
			} else {
				V.activeSlave = GenerateNewSlave("XY");
			}
			V.activeSlave.origin = "You bought $him from the enigmatic Futanari Sisters after they sold $him into slavery.";
			V.activeSlave.career = "a Futanari Sister";
			V.activeSlave.faceShape = jsEither(["exotic", "sensual"]);
			V.activeSlave.pubertyXY = 1;
			sisterAge = jsRandom(1, 5);
			if (sisterAge === 1) {
				V.activeSlave.intelligence = -60;
				V.activeSlave.hips = 0;
				V.activeSlave.face = jsEither([35, 35, 35, 75, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek+15 <= V.week) {
					if (V.activeSlave.genes === "XY") {
						V.activeSlave.balls = 6;
						V.activeSlave.scrotum = V.activeSlave.balls;
					} else {
						V.activeSlave.balls = 1;
						V.activeSlave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					V.activeSlave.balls = 1;
					V.activeSlave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					V.activeSlave.balls = 6;
					V.activeSlave.scrotum = V.activeSlave.balls;
				} else {
					V.activeSlave.balls = jsRandom(2, 3);
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
				V.activeSlave.lips = 10;
				V.activeSlave.weight = 0;
				V.activeSlave.waist = jsRandom(-30, 10);
				V.activeSlave.actualAge = jsRandom(19, 24);
				V.activeSlave.physicalAge = V.activeSlave.actualAge;
				V.activeSlave.visualAge = V.activeSlave.actualAge;
				V.activeSlave.ovaryAge = V.activeSlave.actualAge;
				V.activeSlave.vagina = 2;
				V.activeSlave.anus = 2;
				V.activeSlave.fetish = "submissive";
			} else if (sisterAge === 2) {
				V.activeSlave.intelligence = -30;
				V.activeSlave.hips = 1;
				V.activeSlave.face = jsEither([35, 35, 35, 75, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek+15 <= V.week) {
					if (V.activeSlave.genes === "XY") {
						V.activeSlave.balls = 7;
						V.activeSlave.scrotum = V.activeSlave.balls;
					} else {
						V.activeSlave.balls = 1;
						V.activeSlave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					V.activeSlave.balls = 1;
					V.activeSlave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					V.activeSlave.balls = 6;
					V.activeSlave.scrotum = V.activeSlave.balls;
				} else {
					V.activeSlave.balls = jsRandom(2, 3);
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
				V.activeSlave.lips = 0;
				V.activeSlave.weight = 0;
				V.activeSlave.waist = jsRandom(-30, 10);
				V.activeSlave.vagina = 2;
				V.activeSlave.anus = 2;
				V.activeSlave.fetish = jsEither(["buttslut", "cumslut", "submissive"]);
			} else if (sisterAge === 3) {
				V.activeSlave.intelligence = 0;
				V.activeSlave.hips = 2;
				V.activeSlave.face = jsEither([35, 35, 75, 75, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek+15 <= V.week) {
					if (V.activeSlave.genes === "XY") {
						V.activeSlave.balls = 8;
						V.activeSlave.scrotum = V.activeSlave.balls;
					} else {
						V.activeSlave.balls = 1;
						V.activeSlave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					V.activeSlave.balls = 1;
					V.activeSlave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					V.activeSlave.balls = 6;
					V.activeSlave.scrotum = V.activeSlave.balls;
				} else {
					V.activeSlave.balls = jsRandom(3, 4);
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
				V.activeSlave.lips = jsRandom(15, 25);
				V.activeSlave.weight = 20;
				V.activeSlave.waist = jsRandom(-30, 20);
				V.activeSlave.actualAge = jsRandom(30, 34);
				V.activeSlave.physicalAge = V.activeSlave.actualAge;
				V.activeSlave.visualAge = V.activeSlave.actualAge;
				V.activeSlave.ovaryAge = V.activeSlave.actualAge;
				V.activeSlave.vagina = 2;
				V.activeSlave.anus = 2;
				V.activeSlave.fetish = jsEither(["buttslut", "cumslut"]);
			} else if (sisterAge === 4) {
				V.activeSlave.intelligence = 30;
				V.activeSlave.hips = 2;
				V.activeSlave.face = jsEither([35, 75, 75, 100, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
					if (V.activeSlave.genes === "XY") {
						V.activeSlave.balls = 9;
						V.activeSlave.scrotum = V.activeSlave.balls;
					} else {
						V.activeSlave.balls = 1;
						V.activeSlave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					V.activeSlave.balls = 1;
					V.activeSlave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					V.activeSlave.balls = 6;
					V.activeSlave.scrotum = V.activeSlave.balls;
				} else {
					V.activeSlave.balls = jsRandom(4, 5);
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
				V.activeSlave.lips = jsRandom(25, 55);
				V.activeSlave.weight = 20;
				V.activeSlave.waist = jsRandom(-30, 20);
				V.activeSlave.actualAge = jsRandom(35, 39);
				V.activeSlave.physicalAge = V.activeSlave.actualAge;
				V.activeSlave.visualAge = V.activeSlave.actualAge;
				V.activeSlave.ovaryAge = V.activeSlave.actualAge;
				V.activeSlave.vagina = 3;
				V.activeSlave.anus = 3;
				V.activeSlave.fetish = jsEither(["buttslut", "cumslut", "dom"]);
			} else {
				V.activeSlave.intelligence = 60;
				V.activeSlave.hips = 2;
				V.activeSlave.face = jsEither([35, 75, 100, 100, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek+15 <= V.week) {
					if (V.activeSlave.genes === "XY") {
						V.activeSlave.balls = 10;
						V.activeSlave.scrotum = V.activeSlave.balls;
					} else {
						V.activeSlave.balls = 1;
						V.activeSlave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					V.activeSlave.balls = 1;
					V.activeSlave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					V.activeSlave.balls = 6;
					V.activeSlave.scrotum = V.activeSlave.balls;
				} else {
					V.activeSlave.balls = jsRandom(5, 6);
					V.activeSlave.scrotum = V.activeSlave.balls;
				}
				V.activeSlave.lips = jsRandom(25, 55);
				V.activeSlave.weight = 50;
				V.activeSlave.waist = jsRandom(-50, 20);
				V.activeSlave.actualAge = jsRandom(40, 42);
				V.activeSlave.physicalAge = V.activeSlave.actualAge;
				V.activeSlave.visualAge = V.activeSlave.actualAge;
				V.activeSlave.ovaryAge = V.activeSlave.actualAge;
				V.activeSlave.vagina = 3;
				V.activeSlave.anus = 3;
				V.activeSlave.fetish = "dom";
			}
			V.activeSlave.chem = 100+(sisterAge*50);
			V.activeSlave.butt = sisterAge+jsRandom(2, 4);
			V.activeSlave.boobs = 50*((10*sisterAge)+jsRandom(10, 20));
			V.activeSlave.dick = sisterAge+jsRandom(1, 2);
			if (V.activeSlave.foreskin > 0) {
				V.activeSlave.foreskin = V.activeSlave.dick;
			}
			V.activeSlave.preg = -3;
			if (V.TFS.farmUpgrade > 0) {
				V.activeSlave.ovaries = 1;
				V.activeSlave.preg = -1;
				V.activeSlave.pubertyXX = 1;
				if (V.TFS.farmUpgrade >= 2) {
					if (V.week - V.TFS.farmUpgradeAsked < 35) {
						V.activeSlave.preg = jsRandom(1, (V.week - V.TFS.farmUpgradeAsked));
					} else {
						V.activeSlave.preg = jsRandom(1, 40);
					}
					if (V.TFS.farmUpgrade === 3) {
						V.activeSlave.pregType = jsRandom(20, 40);
						V.activeSlave.pregAdaptation = 500;
					} else {
						V.activeSlave.pregType = 1;
					}
					V.activeSlave.pregWeek = V.activeSlave.preg;
					V.activeSlave.pregSource = -9;
				}
			}
			SetBellySize(V.activeSlave);
			V.activeSlave.intelligenceImplant = 30;
			V.activeSlave.teeth = "normal";
			if (V.TFS.schoolUpgrade === 2) {
				V.activeSlave.energy = 100;
			} else {
				V.activeSlave.energy = V.activeSlave.physicalAge+jsRandom(20, 30);
			}
			V.activeSlave.devotion = jsRandom(30, 40);
			V.activeSlave.trust = jsRandom(60, 75);
			setHealth(V.activeSlave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 4), 0), 0, jsRandom(0, 20));
			V.activeSlave.muscles = 20;
			if (V.activeSlave.genes === "XY") {
				V.activeSlave.shoulders = 1;
			}
			V.activeSlave.skill.vaginal = 100;
			V.activeSlave.skill.oral = 100;
			V.activeSlave.skill.anal = 100;
			V.activeSlave.skill.whoring = 15;
			V.activeSlave.skill.entertainment = 100;
			V.activeSlave.skill.combat = 0;
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.underArmHStyle = "waxed";
			if (V.TFS.schoolUpgrade === 1) {
				V.activeSlave.sexualQuirk = "caring";
			}
			V.activeSlave.sexualFlaw = jsEither(["hates women", "none"]);
			V.activeSlave.behavioralFlaw = jsEither(["arrogant", "none"]);
			V.activeSlave.fetishStrength = 100;
			V.activeSlave.fetishKnown = 0;
			V.activeSlave.attrKnown = 0;
			V.activeSlave.hStyle = "neat";
			V.activeSlave.hLength = 150;
			V.activeSlave.custom.tattoo = "$He has a simple pink heart tattooed on $his right temple.";
			V.activeSlave.trueVirgin = 1;
			break;
		case "HA":
			V.activeSlaveOneTimeMinAge = 22;
			V.activeSlaveOneTimeMaxAge = 26;
			V.one_time_age_overrides_pedo_mode = 1;
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave("XX");
			V.activeSlave.origin = "You bought $him from the prestigious Hippolyta Academy.";
			V.activeSlave.career = "a bodyguard";
			V.activeSlave.intelligenceImplant = 30;
			V.activeSlave.faceShape = jsEither(["cute", "normal"]);
			V.activeSlave.face = jsEither([35, 35, 35, 50, 75, 100]);
			V.activeSlave.lips = jsRandom(0, 25);
			V.activeSlave.actualAge = jsRandom(20, 25);
			V.activeSlave.physicalAge = V.activeSlave.actualAge;
			V.activeSlave.visualAge = V.activeSlave.actualAge;
			V.activeSlave.ovaryAge = V.activeSlave.actualAge;
			V.activeSlave.hips = 0;
			V.activeSlave.vagina = jsRandom(0, 1);
			V.activeSlave.anus = jsRandom(0, 1);
			V.activeSlave.fetish = "none";
			V.activeSlave.chem = 10 * jsRandom(1, 3);
			V.activeSlave.butt = jsRandom(2, 4);
			V.activeSlave.boobs = jsRandom(3, 6) * 100;
			V.activeSlave.preg = 0;
			SetBellySize(V.activeSlave);
			V.activeSlave.teeth = "normal";
			V.activeSlave.devotion = jsRandom(60, 75);
			V.activeSlave.trust = jsRandom(60, 75);
			setHealth(V.activeSlave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 2), 0), 0, jsRandom(0, 20));
			minHeight = jsRandom(170, 180);
			if (V.HA.schoolUpgrade === 2) {
				V.activeSlave.height = Math.trunc(Math.clamp(Height.random(V.activeSlave, {limitMult: [2, 15], spread: 0.1}), minHeight, 274));
				V.activeSlave.muscles = jsRandom(40, 80);
			} else {
				V.activeSlave.height = Math.trunc(Math.clamp(Height.random(V.activeSlave, {limitMult: [1, 4]}), minHeight, 274));
				V.activeSlave.muscles = jsRandom(20, 40);
			}
			if (V.HA.schoolUpgrade === 3) {
				V.activeSlave.weight = jsEither([10, 20, 20, 30, 30, 40, 40, 50]);
				V.activeSlave.waist = jsRandom(-10, 40);
			} else {
				V.activeSlave.weight = -10;
				V.activeSlave.waist = jsRandom(-20, 10);
			}
			V.activeSlave.shoulders = 0;
			if (V.HA.schoolUpgrade === 1) {
				V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [20, 70]});
				V.activeSlave.skill.vaginal = jsEither([20, 20, 40]);
				V.activeSlave.skill.oral = jsEither([20, 20, 40]);
				V.activeSlave.skill.anal = jsEither([20, 20, 40]);
				V.activeSlave.skill.whoring = jsEither([20, 20, 40]);
				V.activeSlave.skill.entertainment = jsEither([60, 80, 80, 100]);
			} else {
				V.activeSlave.intelligence = jsRandom(0, 20);
				V.activeSlave.skill.vaginal = 10;
				V.activeSlave.skill.oral = 10;
				V.activeSlave.skill.anal = 10;
				V.activeSlave.skill.whoring = 10;
				V.activeSlave.skill.entertainment = jsEither([20, 40, 40, 60]);
			}
			V.activeSlave.skill.combat = 1;
			V.activeSlave.pubicHStyle = "waxed";
			V.activeSlave.underArmHStyle = "waxed";
			V.activeSlave.sexualQuirk = jsEither(["caring", "none", "none", "unflinching"]);
			V.activeSlave.sexualFlaw = jsEither(["apathetic", "judgemental", "none", "none"]);
			V.activeSlave.behavioralFlaw = jsEither(["arrogant", "none"]);
			V.activeSlave.behavioralQuirk = jsEither(["confident", "fitness", "none", "none"]);
			V.activeSlave.fetishStrength = 0;
			V.activeSlave.fetishKnown = 0;
			V.activeSlave.attrKnown = 0;
			V.activeSlave.hStyle = jsEither(["braided", "bun", "neat", "ponytail", "tails"]);
			V.activeSlave.hLength = jsRandom(5, 50);
			V.activeSlave.clothes = "a nice maid outfit";
			V.activeSlave.custom.tattoo = "$He has the sword and eagle symbol of the Hippolyta Academy tattooed on $his left shoulder.";
			break;
		case "NUL":
			V.activeSlaveOneTimeMinAge = 16;
			V.activeSlaveOneTimeMaxAge = 24;
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave();
			V.activeSlave.origin = "You bought $him from Nueva Universidad de Libertad right after $his graduation.";
			V.activeSlave.career = "a slave";
			setHealth(V.activeSlave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 4), 0), 0, jsRandom(0, 20));
			V.activeSlave.devotion = jsRandom(60, 75);
			V.activeSlave.trust = jsRandom(60, 75);
			V.activeSlave.intelligenceImplant = 30;
			if (V.NUL.schoolUpgrade === 1) {
				V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [50, 70]});
				V.activeSlave.skill.whoring = jsRandom(70, 80);
				V.activeSlave.skill.entertainment = jsRandom(70, 80);
			} else {
				V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [20, 50]});
				V.activeSlave.skill.whoring = jsRandom(40, 50);
				V.activeSlave.skill.entertainment = jsRandom(40, 50);
			}
			if (V.NUL.schoolUpgrade === 2) {
				V.activeSlave.skill.anal = jsRandom(60, 80);
				V.activeSlave.skill.oral = jsRandom(70, 90);
				V.activeSlave.anus = jsRandom(1, 3);
			} else {
				V.activeSlave.skill.anal = jsRandom(10, 30);
				V.activeSlave.skill.oral = jsRandom(20, 40);
				V.activeSlave.anus = jsEither([0, 0, 0, 0, 1, 1, 1]);
			}
			V.activeSlave.muscles = 0;
			V.activeSlave.face = jsRandom(15, 55);
			V.activeSlave.faceShape = "androgynous";
			V.activeSlave.hips = 0;
			V.activeSlave.shoulders = 0;
			V.activeSlave.boobs = jsRandom(1, 7) * 50;
			V.activeSlave.butt = jsRandom(0, 3);
			V.activeSlave.vagina = -1;
			V.activeSlave.clit = 0;
			V.activeSlave.dick = 0;
			V.activeSlave.balls = 0;
			V.activeSlave.preg = 0;
			V.activeSlave.eyebrowHStyle = "bald";
			V.activeSlave.underArmHStyle = "bald";
			V.activeSlave.pubicHStyle = "bald";
			V.activeSlave.hStyle = "bald";
			V.activeSlave.behavioralFlaw = jsEither(["none", "odd"]);
			V.activeSlave.custom.tattoo = "$He has the abstract symbol of Nueva Universidad de Libertad tattooed on $his left shoulder.";
			break;
		case "gangs and smugglers":
			if (V.pedo_mode === 1) {
				V.activeSlaveOneTimeMinAge = 6;
				V.activeSlaveOneTimeMaxAge = 18;
				V.one_time_age_overrides_pedo_mode = 1;
			} else {
				V.activeSlaveOneTimeMinAge = 16;
				if (V.retirementAge > 56) {
					V.activeSlaveOneTimeMaxAge = 55;
				} else {
					V.activeSlaveOneTimeMaxAge = V.retirementAge-2;
				}
			}
			V.oneTimeDisableDisability = 1;
			if (V.seeDicks === 0) {
				V.activeSlave = GenerateNewSlave("XX");
			} else {
				V.activeSlave = GenerateNewSlave("XY");
			}

			criminal = setup.gangCriminalPool.random();

			switch (criminal) {
				case "mule":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling illegal contraband inside $his body.";
					V.prisonCrime = "is incarcerated for being a willing drug mule.";
					V.activeSlave.career = "a drug mule";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(-100, -25);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([-100, -100, -60, -60, -60, -30, -30]);
					setHealth(V.activeSlave, jsRandom(-50, 20), undefined, undefined, undefined, jsRandom(30, 80));
					V.activeSlave.anus = 4;
					V.activeSlave.chem = 10 * jsRandom(1, 3);
					V.activeSlave.addict = 100; break;
				case "arms smuggler":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling arms to forces antagonistic to the Free Cities.";
					V.prisonCrime = "is incarcerated for being an arms dealer.";
					V.activeSlave.career = "an arms dealer";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(-60, 25);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(0, 60);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(30, 80));
					V.activeSlave.weight = jsRandom(-30, 10);
					V.activeSlave.waist = jsRandom(-10, 50);
					V.activeSlave.muscles = jsRandom(10, 40); break;
				case "drug smuggler":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling drugs into the Free City.";
					V.prisonCrime = "is incarcerated for smuggling drugs.";
					V.activeSlave.career = "a drug smuggler";
					V.activeSlave.devotion = jsRandom(-60, -20);
					V.activeSlave.trust = jsRandom(-60, 40);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-60, 60);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(30, 80)); break;
				case "smuggler":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling goods into the Free City.";
					V.prisonCrime = "is incarcerated for smuggling goods.";
					V.activeSlave.career = "a smuggler";
					V.activeSlave.devotion = jsRandom(-80, -20);
					V.activeSlave.trust = jsRandom(-100, 40);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(0, 60);
					setHealth(V.activeSlave, jsRandom(-20, 40), undefined, undefined, undefined, jsRandom(30, 80)); break;
				case "fence":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for dealing in stolen goods.";
					V.prisonCrime = "is incarcerated for buying and selling stolen goods.";
					V.activeSlave.career = "a fence";
					V.activeSlave.devotion = jsRandom(-100, -20);
					V.activeSlave.trust = jsRandom(-20, 40);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-60, 30);
					setHealth(V.activeSlave, jsRandom(-20, 60), undefined, undefined, undefined, jsRandom(30, 80)); break;
				case "gang murderer":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related murder.";
					V.prisonCrime = "is incarcerated for gang related murders.";
					V.activeSlave.career = "a gang member";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(0, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([-30, -20, 0, 0, 20, 40, 60]);
					V.activeSlave.behavioralFlaw = "arrogant";
					setHealth(V.activeSlave, jsRandom(-20, 20), Math.max(normalRandInt(5, 3), 0), Math.max(normalRandInt(5, 3), 0), undefined, jsRandom(20, 70));
					V.activeSlave.muscles = jsRandom(20, 80);
					V.activeSlave.chem = 10 * jsRandom(1, 3);
					V.activeSlave.custom.tattoo = "The prominent emblem of a local gang spans the length of his shoulders.";
					V.activeSlave.skill.combat = 1; break;
				case "gang assaulter":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related extortion of local businesses.";
					V.prisonCrime = "is incarcerated for gang related activities.";
					V.activeSlave.career = "a gang member";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(0, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-100, 0);
					V.activeSlave.behavioralFlaw = "arrogant";
					setHealth(V.activeSlave, jsRandom(-20, 20), Math.max(normalRandInt(5, 3), 0), Math.max(normalRandInt(5, 3), 0), undefined, jsRandom(20, 70));
					V.activeSlave.muscles = jsRandom(40, 80);
					V.activeSlave.weight = jsRandom(-30, 10);
					V.activeSlave.waist = jsRandom(10, 50);
					V.activeSlave.chem = 10 * jsRandom(1, 3);
					V.activeSlave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					V.activeSlave.skill.combat = 1; break;
				case "gang bruiser":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for a gang related beating of a local businessman.";
					V.prisonCrime = "is incarcerated for gang related activities.";
					V.activeSlave.career = "a gang member";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(0, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-100, 0);
					V.activeSlave.behavioralFlaw = "arrogant";
					setHealth(V.activeSlave, jsRandom(-20, 20), Math.max(normalRandInt(8, 3), 0), Math.max(normalRandInt(8, 3), 0), undefined, jsRandom(20, 60));
					V.activeSlave.muscles = jsRandom(60, 80);
					V.activeSlave.weight = jsRandom(-30, 10);
					V.activeSlave.waist = jsRandom(10, 70);
					V.activeSlave.chem = 10 * jsRandom(1, 3);
					V.activeSlave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					V.activeSlave.skill.combat = 1; break;
				case "gang thief":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related raiding of several local warehouses.";
					V.prisonCrime = "is incarcerated for gang related activities.";
					V.activeSlave.career = "a gang member";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(0, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-40, 60);
					V.activeSlave.behavioralFlaw = "arrogant";
					setHealth(V.activeSlave, jsRandom(-20, 20), Math.max(normalRandInt(3, 3), 0), Math.max(normalRandInt(3, 3), 0), undefined, jsRandom(20, 70));
					V.activeSlave.muscles = jsRandom(20, 80);
					V.activeSlave.weight = jsRandom(-30, 30);
					V.activeSlave.waist = jsRandom(10, 70);
					V.activeSlave.chem = 10 * jsRandom(1, 3);
					V.activeSlave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					V.activeSlave.skill.combat = 1; break;
				case "drug peddler":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related drug distribution.";
					V.prisonCrime = "is incarcerated for gang related activities.";
					V.activeSlave.career = "a drug pusher";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(0, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-40, 60);
					setHealth(V.activeSlave, jsRandom(-20, 20), Math.max(normalRandInt(3, 3), 0), Math.max(normalRandInt(3, 3), 0), undefined, jsRandom(20, 70));
					V.activeSlave.muscles = jsRandom(20, 40);
					V.activeSlave.chem = 10 * jsRandom(3, 5);
					V.activeSlave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					V.activeSlave.skill.combat = 1; break;
				case "hitman":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for a series of high profile murders.";
					V.prisonCrime = "is incarcerated for a series of murders-for-hire.";
					V.activeSlave.career = "a hitman";
					V.activeSlave.devotion = jsRandom(-75, -50);
					V.activeSlave.trust = jsRandom(-60, 25);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(0, 100);
					setHealth(V.activeSlave, jsRandom(-20, 60), undefined, undefined, undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-30, 10);
					V.activeSlave.waist = jsRandom(-10, 50);
					V.activeSlave.muscles = jsRandom(20, 40);
					V.activeSlave.skill.combat = 1; break;
				case "assassin":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for a high profile assassination.";
					V.prisonCrime = "is incarcerated for an assassination.";
					V.activeSlave.career = "an assassin";
					V.activeSlave.devotion = -100;
					V.activeSlave.trust = 100;
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = 100;
					setHealth(V.activeSlave, jsRandom(-20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-30, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(20, 40);
					V.activeSlave.skill.combat = 1; break;
				case "murder":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat murder.";
					V.prisonCrime = "is incarcerated for murder.";
					V.activeSlave.career = "a murderer";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(0, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-40, 60);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(30, 80));
					V.activeSlave.muscles = jsRandom(20, 80);
					V.activeSlave.skill.combat = 1; break;
				case "manslaughter":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter.";
					V.prisonCrime = "is incarcerated for manslaughter.";
					V.activeSlave.career = "a criminal";
					V.activeSlave.devotion = jsRandom(-20, 50);
					V.activeSlave.trust = jsRandom(0, 20);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-40, 60);
					setHealth(V.activeSlave, jsRandom(-40, 0), undefined, undefined, undefined, jsRandom(30, 80)); break;
				case "attempted murder":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for attempted murder of a prominent individual.";
					V.prisonCrime = "is incarcerated for an attempted murder.";
					V.activeSlave.career = "a criminal";
					V.activeSlave.devotion = jsRandom(-20, 50);
					V.activeSlave.trust = jsRandom(0, 20);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-100, 0);
					setHealth(V.activeSlave, jsRandom(-40, 0), undefined, undefined, undefined, jsRandom(30, 80));
			}
			break;
		case "military prison":
			if (V.pedo_mode === 1) {
				V.activeSlaveOneTimeMinAge = 12;
				V.activeSlaveOneTimeMaxAge = 18;
				V.one_time_age_overrides_pedo_mode = 1;
			} else {
				V.activeSlaveOneTimeMinAge = 18;
				if (V.retirementAge > 56) {
					V.activeSlaveOneTimeMaxAge = 55;
				} else {
					V.activeSlaveOneTimeMaxAge = V.retirementAge-2;
				}
			}
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave();

			/*
				if (V.activeSlave.dick > 0) {
					V.activeSlave.chastityPenis = 1
				}
				if (V.activeSlave.vagina > -1) {
					V.activeSlave.chastityVagina = 1
				}
			*/

			criminal = setup.militaryCriminalPool.random();

			switch (criminal) {
				case "spy":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was a spy captured while infiltrating the Free City.";
					V.prisonCrime = "is incarcerated for spying.";
					V.activeSlave.career = "a spy";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = -100;
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(20, 100);
					V.activeSlave.intelligenceImplant = 30;
					setHealth(V.activeSlave, jsRandom(-40, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(10, 40));
					V.activeSlave.weight = jsRandom(-30, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(20, 40);
					V.activeSlave.skill.combat = 1; break;
				case "terrorist":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was a terrorist captured when $his attempt to destroy a public building and the people within was foiled.";
					V.prisonCrime = "is incarcerated for terrorism.";
					V.activeSlave.career = "a terrorist";
					V.activeSlave.devotion = jsRandom(-80, -20);
					V.activeSlave.trust = -100;
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-100, 0);
					setHealth(V.activeSlave, jsRandom(-50, 20), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), undefined, jsRandom(40, 90));
					V.activeSlave.weight = jsRandom(-100, 10);
					V.activeSlave.waist = jsRandom(-10, 10); break;
				case "war criminal":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was a soldier imprisoned for committing unspeakable atrocities, even by the standards of an apocalyptic slave trading society.";
					V.prisonCrime = "is incarcerated for a series of war crimes.";
					V.activeSlave.career = "a soldier";
					V.activeSlave.devotion = jsRandom(-100, -80);
					V.activeSlave.trust = jsRandom(20, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-20, 100);
					V.activeSlave.intelligenceImplant = 30;
					setHealth(V.activeSlave, jsRandom(-40, 60), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(30, 80));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(20, 60);
					V.activeSlave.skill.combat = 1;
					V.activeSlave.behavioralFlaw = "arrogant"; break;
				case "deserter":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was a soldier that abandoned $his post.";
					V.prisonCrime = "is incarcerated for going A.W.O.L.";
					V.activeSlave.career = "a soldier";
					V.activeSlave.devotion = jsRandom(-100, -80);
					V.activeSlave.trust = jsRandom(-100, -80);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-60, 40);
					setHealth(V.activeSlave, jsRandom(-40, 60), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(30, 80));
					V.activeSlave.weight = jsRandom(-50, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.skill.combat = 1; break;
				case "officer":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was an officer that over-extended $his forces and was overwhelmed.";
					V.prisonCrime = "is a captured enemy officer.";
					V.activeSlave.career = "a military officer";
					V.activeSlave.devotion = jsRandom(-40, 20);
					V.activeSlave.trust = jsRandom(-50, 0);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(0, 100);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(0, 60), undefined, Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(20, 40);
					V.activeSlave.skill.combat = 1; break;
				case "specOps":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was a special operations officer that acted on bad intel and ended up captured.";
					V.prisonCrime = "is a captured enemy special operations officer.";
					V.activeSlave.career = "spec ops";
					V.activeSlave.devotion = jsRandom(-80, -50);
					V.activeSlave.trust = jsRandom(-100, 100);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([60, 80, 100]);
					V.activeSlave.intelligenceImplant = 30;
					setHealth(V.activeSlave, jsRandom(0, 60), undefined, Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(30, 60);
					V.activeSlave.skill.combat = 1; break;
				case "sniper":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was an enemy sniper that was captured after $his company lost to your military might.";
					V.prisonCrime = "is a captured enemy sniper.";
					V.activeSlave.career = "a sniper";
					V.activeSlave.devotion = jsRandom(-50, -20);
					V.activeSlave.trust = jsRandom(-100, -80);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([60, 80, 100]);
					V.activeSlave.intelligenceImplant = 20;
					setHealth(V.activeSlave, jsRandom(0, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(30, 60);
					V.activeSlave.skill.combat = 1;
					if (V.activeSlave.boobs > 400) {
						V.activeSlave.boobs = 400;
					}
					break;
				case "gunner":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was an enemy machine gunner that was captured after $his company lost to your military might.";
					V.prisonCrime = "is a captured enemy gunner.";
					V.activeSlave.career = "a soldier";
					V.activeSlave.devotion = jsRandom(-50, -20);
					V.activeSlave.trust = jsRandom(-50, -20);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(0, 90);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(0, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(50, 60);
					V.activeSlave.skill.combat = 1; break;
				case "soldier":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was an enemy soldier that was captured after $his company lost to your military might.";
					V.prisonCrime = "is a captured enemy soldier.";
					V.activeSlave.career = "a soldier";
					V.activeSlave.devotion = jsRandom(-100, -20);
					V.activeSlave.trust = jsRandom(-50, 20);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(0, 60);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(0, 40), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(30, 60);
					V.activeSlave.skill.combat = 1; break;
				case "private":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was an enemy grunt that was captured after $his company lost to your military might.";
					V.prisonCrime = "is a captured enemy private.";
					V.activeSlave.career = "a private";
					V.activeSlave.devotion = jsRandom(-40, -20);
					V.activeSlave.trust = jsRandom(-100, -80);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-90, 70);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(0, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(30, 80));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(10, 40);
					V.activeSlave.skill.combat = 1;
			}
			break;
		case "white collar":
			if (V.pedo_mode === 1) {
				V.activeSlaveOneTimeMinAge = 16;
				V.activeSlaveOneTimeMaxAge = 45;
				V.one_time_age_overrides_pedo_mode = 1;
			} else {
				V.activeSlaveOneTimeMinAge = 25;
				if (V.retirementAge > 66) {
					V.activeSlaveOneTimeMaxAge = 65;
				} else {
					V.activeSlaveOneTimeMaxAge = V.retirementAge-2;
				}
			}
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave();

			criminal = setup.whiteCollarCriminalPool.random();

			switch (criminal) {
				case "racketeering":
					V.activeSlave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was convicted of racketeering.`;
					V.prisonCrime = "is incarcerated for racketeering.";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(-20, 20);
					V.activeSlave.intelligence = jsRandom(0, 99);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60)); break;
				case "bribery":
					V.activeSlave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was arrested and sentenced for bribing government officials.`;
					V.prisonCrime = "is incarcerated for bribery.";
					V.activeSlave.devotion = jsRandom(-50, -20);
					V.activeSlave.trust = jsRandom(20, 50);
					V.activeSlave.intelligence = jsRandom(0, 99);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60));
					V.activeSlave.behavioralFlaw = "arrogant"; break;
				case "blackmail":
					V.activeSlave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was convicted of blackmail against a sorority of university students, forcing them to do sexual favors.`;
					V.prisonCrime = "is incarcerated for blackmail.";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(20, 50);
					V.activeSlave.intelligence = jsRandom(0, 99);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60));
					V.activeSlave.behavioralFlaw = "arrogant";
					V.activeSlave.fetish = "sadist";
					V.activeSlave.fetishStrength = 100; break;
				case "embezzlement":
					V.activeSlave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was involved in a scandal and convicted of embezzlement.`;
					V.prisonCrime = "is incarcerated for embezzlement.";
					V.activeSlave.devotion = jsRandom(0, 20);
					V.activeSlave.trust = jsRandom(-10, 10);
					V.activeSlave.intelligence = jsRandom(0, 99);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60)); break;
				case "fraud":
					V.activeSlave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was convicted of fraud.`;
					V.prisonCrime = "is incarcerated for fraud.";
					V.activeSlave.devotion = jsRandom(20, 40);
					V.activeSlave.trust = jsRandom(20, 50);
					V.activeSlave.intelligence = jsRandom(0, 99);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60)); break;
				case "tax evasion":
					V.activeSlave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was convicted of tax evasion.`;
					V.prisonCrime = "is incarcerated for tax evasion.";
					V.activeSlave.devotion = jsRandom(-20, 0);
					V.activeSlave.trust = jsRandom(20, 50);
					V.activeSlave.intelligence = jsRandom(0, 99);
					V.activeSlave.intelligenceImplant = 15;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60)); break;
				case "malpractice":
					V.activeSlave.career = jsEither(["a doctor", "a nurse", "a physician"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was ${V.activeSlave.career} that took advantage of $his position to molest and modify $his patients.`;
					V.prisonCrime = "is incarcerated for malpractice.";
					V.activeSlave.devotion = jsRandom(-50, 0);
					V.activeSlave.trust = jsRandom(-100, -50);
					V.activeSlave.intelligence = jsRandom(55, 99);
					V.activeSlave.intelligenceImplant = 30;
					setHealth(V.activeSlave, jsRandom(-40, 20), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(40, 70)); break;
				case "abuse of power":
					V.activeSlave.career = jsEither(["a judge", "a lawyer", "a police officer"]);
					V.activeSlave.origin = `You purchased $his life at a prison sale. $He was ${V.activeSlave.career} that took advantage of $his position for $his own benefit.`;
					V.prisonCrime = "is incarcerated for abuse of power.";
					V.activeSlave.devotion = jsRandom(-100, 0);
					V.activeSlave.trust = jsRandom(-50, 50);
					V.activeSlave.intelligence = jsRandom(60, 99);
					V.activeSlave.intelligenceImplant = 30;
					setHealth(V.activeSlave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(30, 60));
					V.activeSlave.behavioralFlaw = "arrogant";
			}
			break;
		case "low tier criminals":
			if (V.pedo_mode === 1) {
				V.activeSlaveOneTimeMinAge = 6;
				V.activeSlaveOneTimeMaxAge = 18;
				V.one_time_age_overrides_pedo_mode = 1;
			} else {
				V.activeSlaveOneTimeMinAge = 16;
				if (V.retirementAge > 56) {
					V.activeSlaveOneTimeMaxAge = 55;
				} else {
					V.activeSlaveOneTimeMaxAge = V.retirementAge-2;
				}
			}
			V.oneTimeDisableDisability = 1;
			V.activeSlave = GenerateNewSlave();

			/*
	if (V.activeSlave.dick > 0) {
		V.activeSlave.chastityPenis = 1
	}
if (V.activeSlave.vagina > -1) {
		V.activeSlave.chastityVagina = 1
	}
*/

			criminal = setup.pettyCriminalPool.random();

			switch (criminal) {
				case "robbery":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for robbery.";
					V.prisonCrime = "is incarcerated for robbery.";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(-60, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([-100, -100, -80, -60, -40, -30, -20, -5, 0, 5, 20]);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				case "armed robbery":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for armed robbery.";
					V.prisonCrime = "is incarcerated for armed robbery.";
					V.activeSlave.devotion = jsRandom(-50, -20);
					V.activeSlave.trust = jsRandom(-20, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-80, 60);
					setHealth(V.activeSlave, jsRandom(-10, 20), undefined, Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(10, 40);
					V.activeSlave.skill.combat = 1;
					break;
				case "murder":
					if (jsRandom(1, 100) > 70) {
						V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for murder. $His actions weigh heavily on $his conscience.";
						V.activeSlave.devotion = 0;
						V.activeSlave.trust = 0;
						setHealth(V.activeSlave, jsRandom(-50, 20), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(40, 90));
						V.activeSlave.fetish = "mindbroken";
					} else {
						V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for murder.";
						V.activeSlave.devotion = jsRandom(-50, -20);
						V.activeSlave.trust = jsRandom(-20, 60);
						setHealth(V.activeSlave, jsRandom(-10, 20), undefined, undefined, undefined, jsRandom(20, 70));
					}
					V.prisonCrime = "is incarcerated for murder.";
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-80, 70);
					break;
				case "arson":
					if (jsRandom(1, 100) > 50) {
						V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for arson. $His actions, and those $he inadvertently killed, weigh heavily on $his conscience.";
						V.activeSlave.devotion = 0;
						V.activeSlave.trust = 0;
						setHealth(V.activeSlave, jsRandom(-50, 20), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(40, 90));
						V.activeSlave.fetish = "mindbroken";
					} else {
						V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for arson.";
						V.activeSlave.devotion = jsRandom(-70, -50);
						V.activeSlave.trust = jsRandom(0, 60);
						setHealth(V.activeSlave, jsRandom(-10, 20), undefined, undefined, undefined, jsRandom(20, 70));
					}
					V.prisonCrime = "is incarcerated for arson.";
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-80, 70);
					break;
				case "burglary":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for burglary.";
					V.prisonCrime = "is incarcerated for burglary.";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(-60, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-100, 20);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				case "cat burglar":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat burglary.";
					V.prisonCrime = "is incarcerated for career burglary.";
					V.activeSlave.career = "a cat burglar";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(-60, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([60, 80, 100]);
					setHealth(V.activeSlave, jsRandom(0, 60), undefined, undefined, undefined, jsRandom(10, 50));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(10, 40);
					break;
				case "petty theft":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for petty theft.";
					V.prisonCrime = "is incarcerated for petty theft.";
					V.activeSlave.career = "a thief";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(-100, -60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([-100, -100, -80, -60, -40, -30, -20, -5, 0, 5, 20]);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				case "theft":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for theft.";
					V.prisonCrime = "is incarcerated for theft.";
					V.activeSlave.career = "a thief";
					V.activeSlave.devotion = jsRandom(-50, 0);
					V.activeSlave.trust = jsRandom(-100, -60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-80, 70);
					setHealth(V.activeSlave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				case "pickpocketing":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat pick-pocketing.";
					V.prisonCrime = "is incarcerated for pick-pocketing.";
					V.activeSlave.career = "a pick-pocket";
					V.activeSlave.devotion = jsRandom(-20, 0);
					V.activeSlave.trust = jsRandom(-100, -60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-80, 70);
					setHealth(V.activeSlave, jsRandom(-60, 0), undefined, Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(20, 70));
					break;
				case "manslaughter":
					if (jsRandom(1, 100) > 60) {
						V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter. $His actions weigh heavily on $his conscience.";
						V.activeSlave.devotion = 0;
						V.activeSlave.trust = 0;
						setHealth(V.activeSlave, jsRandom(-50, -20), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(40, 90));
						V.activeSlave.fetish = "mindbroken";
					} else {
						V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter.";
						V.activeSlave.devotion = jsRandom(-70, -50);
						V.activeSlave.trust = jsRandom(0, 60);
						setHealth(V.activeSlave, jsRandom(-10, 20), undefined, undefined, undefined, jsRandom(20, 70));
					}
					V.prisonCrime = "is incarcerated for manslaughter.";
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsRandom(-80, 70);
					break;
				case "blackmail":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for blackmail.";
					V.prisonCrime = "is incarcerated for blackmail.";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(-100, -60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = jsEither([60, 80, 100]);
					setHealth(V.activeSlave, jsRandom(0, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 50));
					break;
				case "assault":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for assault.";
					V.prisonCrime = "is incarcerated for assault.";
					V.activeSlave.devotion = jsRandom(-70, -50);
					V.activeSlave.trust = jsRandom(-20, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(30, 60);
					V.activeSlave.skill.combat = 1;
					break;
				case "battery":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for battery.";
					V.prisonCrime = "is incarcerated for battery.";
					V.activeSlave.devotion = jsRandom(-100, -70);
					V.activeSlave.trust = jsRandom(20, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(40, 60);
					V.activeSlave.skill.combat = 1;
					break;
				case "tax evasion":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for tax evasion.";
					V.prisonCrime = "is incarcerated for tax evasion.";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(0, 60);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					V.activeSlave.intelligence = Intelligence.random({limitIntelligence: [0, 100]});
					setHealth(V.activeSlave, jsRandom(0, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					break;
				case "rape":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for rape.";
					V.prisonCrime = "is incarcerated for rape.";
					V.activeSlave.devotion = jsRandom(-100, -50);
					V.activeSlave.trust = jsRandom(-20, 80);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					V.activeSlave.weight = jsRandom(-10, 10);
					V.activeSlave.waist = jsRandom(-10, 10);
					V.activeSlave.muscles = jsRandom(30, 60);
					V.activeSlave.fetish = "sadist";
					V.activeSlave.fetishStrength = 80;
					break;
				case "child molestation":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for child molestation.";
					V.prisonCrime = "is incarcerated for child molestation.";
					if (V.minimumSlaveAge < 13) {
						V.activeSlave.devotion = jsRandom(-20, 0);
						V.activeSlave.trust = jsRandom(-20, 0);
					} else {
						V.activeSlave.devotion = jsRandom(-50, -20);
						V.activeSlave.trust = jsRandom(-100, 0);
					}
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-10, 40), Math.max(normalRandInt(5, 4), 0), undefined, undefined, jsRandom(40, 90));
					V.activeSlave.muscles = jsRandom(10, 40);
					V.activeSlave.fetish = "sadist";
					V.activeSlave.fetishStrength = 80;
					break;
				case "child abuse":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for child abuse.";
					V.prisonCrime = "is incarcerated for child abuse.";
					if (V.minimumSlaveAge < 13) {
						V.activeSlave.devotion = jsRandom(-20, 0);
						V.activeSlave.trust = jsRandom(-20, 50);
					} else {
						V.activeSlave.devotion = jsRandom(-50, -20);
						V.activeSlave.trust = jsRandom(-50, 50);
					}
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					V.activeSlave.muscles = jsRandom(10, 40);
					V.activeSlave.fetish = "sadist";
					V.activeSlave.fetishStrength = 100;
					V.activeSlave.sexualFlaw = "malicious";
					break;
				case "domestic abuse":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for domestic abuse.";
					V.prisonCrime = "is incarcerated for domestic abuse.";
					V.activeSlave.devotion = jsRandom(-50, -20);
					V.activeSlave.trust = jsRandom(-100, 50);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					V.activeSlave.muscles = jsRandom(10, 40);
					V.activeSlave.fetish = "sadist";
					V.activeSlave.fetishStrength = 50;
					break;
				case "illegal immigrant":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for illegal immigration.";
					V.prisonCrime = "is incarcerated for illegally entering the Free City.";
					V.activeSlave.career = "a refugee";
					V.activeSlave.devotion = jsRandom(0, 20);
					V.activeSlave.trust = jsRandom(-100, -50);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-50, -40), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), undefined, jsRandom(40, 90));
					break;
				case "mule":
					V.activeSlave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling illegal contraband inside $his body.";
					V.prisonCrime = "is incarcerated for smuggling drugs in $his body.";
					V.activeSlave.career = "a drug mule";
					V.activeSlave.devotion = jsRandom(-20, 20);
					V.activeSlave.trust = jsRandom(0, 25);
					V.activeSlave.hStyle = "buzzcut";
					V.activeSlave.hLength = 0;
					setHealth(V.activeSlave, jsRandom(-50, 20), undefined, undefined, undefined, jsRandom(20, 70));
					if (V.activeSlave.ovaries === 1 && V.activeSlave.vagina > 0) {
						V.activeSlave.vagina = 4;
						V.activeSlave.bellySag += 5;
					}
					V.activeSlave.anus = 4;
					V.activeSlave.bellySag += 5;
					V.activeSlave.chem = 10 * jsRandom(1, 3);
					V.activeSlave.addict = 100;
			}
			break;
		default:
			r += "Someone messed up. Market is not known.";
			break;
	}
	if (!pronounsGenerated) {
		generatePronouns(V.activeSlave);
	}
	return r;
};
