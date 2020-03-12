(function() {
	"use strict";

	const
		PC = V.PC,
		energy = V.freeSexualEnergy,
		averageDick = V.averageDick;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function saRules(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let
			release = slave.rules.release;

		let r = ``;

		// TODO: may need updating to detail effect of chastity

		if (!slave.fuckdoll) {
			r += `${He} `;
			if (slave.fetish === "mindbroken") {
				r += `is mentally broken so none of the rules have any impact. `;
			} else {
				let
					punishments = 0,
					rewards = 3;

				switch (slave.assignment) {
					case "be the Nurse":
					case "get treatment in the clinic":
					case "be the Wardeness":
					case "be confined in the cellblock":
					case "be the Attendant":
					case "rest in the spa":
					case "be the Matron":
					case "work as a nanny":
						// TODO: this will all need to be rewritten
						if (slave.devotion < -50) {
							r += `is so unhappy that ${he} has little interest in getting off. `;
							slave.need = 0;
						} else if (slave.energy <= 20) {
							r += `is frigid and has little interest in getting off. `;
							slave.need = 0;
						} else if (V.Matron) {
							r += `is routinely relieved of any built up tension by ${V.Matron.slaveName} and ${his}`;
							if (canPenetrate(slave) && V.Matron.boobs >= 500) {
								r += `luscious breasts. `;
								actX(slave, "mammary", 14);
							} else {
								if (slave.lips > 40) {
									r += `luscious lips. `;
								} else if (slave.skill.oral > 30) {
									r += `skilled tongue. `;
								} else {
									r += `willing mouth. `;
								}
								actX(slave, "oral", 14);
							}
							slave.need = -60;
						} else {
							if (!App.Utils.hasNonassignmentSex(slave) && release.masturbation === 0) {
								if (release.master === 1) {
									if (slave.devotion <= 50) {
										if (slave.devotion <= 20) {
											if (slave.trust > -20) {
												r += `refuses to come up to the penthouse for sexual release and is <span class="gold">severely punished</span> for illicit masturbation. `;
												slave.trust -= 2;
												slave.need -= 10;
											} else {
												r += `occasionally comes to the penthouse to beg for sexual release. `;
											}
										} else {
											r += `doesn't mind having to come to the penthouse to beg for sexual release. `;
										}
										r += `${playerEnergy(slave)}`;
									} else {
										r += `willingly comes up to the penthouse and begs you to ${playerFetishPlay(slave)} whenever the urge strikes. ${playerEnergy(slave)}`;
									}
									r += `${playerDiscoversFetish(slave)} ${playerDrugEffects(slave)}`;
								} else {
									if (disobedience(slave) > jsRandom(0, 100)) {
										r += `is forbidden to masturbate or seek sexual release. In ${his} <span class="mediumorchid">intense frustration</span> ${he} breaks the rules and is <span class="gold">severely punished</span> for illicit masturbation. `;
										slave.devotion -= 2;
										slave.trust -= 2;
										slave.need -= 10;
									} else {
										r += `is forbidden to masturbate or seek sexual release, which <span class="mediumorchid">highly frustrates</span> ${him}. `;
										slave.devotion -= 2;
									}
									/* r += `${noReleaseDrugEffects(slave)}`; - port it from saRulesWidgets when we need it */
								}
							} else if (!App.Utils.hasNonassignmentSex(slave) && release.masturbation === 1) {
								if (slave.devotion <= 20) {
									if (slave.trust > -20) {
										r += `takes solace in ${his} permission to masturbate rather than being forced to beg for sex, <span class="mediumaquamarine">reducing ${his} fear</span> of you. `;
										slave.trust += 2;
										slave.need = 0;
									} else {
										r += `enjoys being allowed to masturbate rather than trading sex with other slaves, <span class="mediumaquamarine">slightly reducing ${his} fear</span> of you but <span class="mediumorchid">allowing ${him} to remain in control of ${him} sexuality. </span>`;
										slave.devotion--;
										slave.trust++;
										slave.need = 0;
									}
								} else if (slave.devotion <= 50) {
									r += `accepts having to relieve ${himself} solely through masturbation. `;
									slave.need = 0;
								} else if (slave.devotion <= 80) {
									r += `is a little disappointed that ${he}'s limited to ${his} hands and toys, but <span class="mediumaquamarine">trusts you know what's best for ${him}. </span>`;
									slave.trust++;
									slave.need = 0;
								} else {
									r += `<span class="mediumaquamarine">trusts your judgment</span> that only ${he} really knows how to pleasure ${himself}`;
									if (release.master === 0) {
										r += `, though ${he} <span class="mediumorchid">often wonders why you don't use ${him}. </span>`;
										slave.devotion -= 2;
									} else {
										r += `.`;
									}
									slave.trust++;
									slave.need = 0;
								}

								if (slave.devotion >= 20) {
									r += `When ${he} does play with ${himself}, ${he} ${masturbationFetishPlay(slave)} ${masturbationDiscoversFetish(slave)}`;
								}
								r += `${masturbationDrugEffects(slave)}`;
							} else { // hasNonassignmentSex is true
								if (!App.Utils.hasFamilySex(slave) && release.slaves === 0) {
									// no family and no other slaves, so must be his partner
									r += `finds frequent sexual release with his ${relationshipTerm(slave)} <span class="lightgreen">${getSlave(slave.relationshipTarget).slaveName},</span> which he is <span class="mediumaquamarine">thankful for.</span> `;
									/* r += `${partnerDrugEffects(slave)}`; - port it from saRulesWidgets when we need it */
									slave.need -= 20; // TODO: probably should be based on BOTH slaves' need, leaving the less needy partner slightly frustrated
									slave.trust++;
								} else if (!V.universalRulesConsent) {
									const whom = (release.slaves === 1) ? `other slaves` : `${his} family`;
									if (slave.devotion <= 20) {
										if (slave.trust > -20) {
											if (release.masturbation === 1) {
												r += `masturbates whenever ${he} can find a private moment to take care of the urges induced by the food, <span class="mediumaquamarine">slightly reducing ${his} fear</span> of you. `;
												slave.trust++;
												slave.need = 0;
											} else {
												r += `refuses to ask ${whom} for sex, and is <span class="gold">severely punished</span> for illicit masturbation. `;
												slave.trust -= 2;
												slave.need -= 10;
											}
										} else {
											if (release.masturbation === 1) {
												r += `prefers to masturbate rather than demanding sex from ${whom}, <span class="mediumaquamarine">slightly reducing ${his} fear</span> of you. `;
												slave.trust++;
												slave.need = 0;
											} else {
												r += `is forced by the urges induced by the food to demand sex from ${whom}, and <span class="hotpink">hates ${himself}</span> for it. `;
												slave.devotion++;
												slave.need = 0;
											}
										}
									} else if (slave.devotion <= 50) {
										r += `<span class="hotpink">accepts the need</span> to ${rapeFetish(slave)} ${rapeDiscoversFetish(slave)}`;
										slave.devotion++;
										slave.need = 0;
									} else {
										r += `happily <span class="mediumaquamarine">avails ${himself}</span> of your permission to ${rapeFetish(slave)} ${rapeDiscoversFetish(slave)}`;
										slave.trust++;
										slave.need = 0;
									}
								} else {
									if (slave.devotion <= 20) {
										if (slave.trust > -20) {
											if (release.masturbation === 1) {
												r += `prefers to masturbate rather than asking ${whom} for sex or giving free samples, <span class="mediumaquamarine">slightly reducing ${his} fear</span> of you. `;
												slave.trust++;
												slave.need = 0;
											} else {
												r += `refuses to ask ${whom} for sex, and is <span class="gold">severely punished</span> for illicit masturbation. `;
												slave.trust -= 2;
												slave.need -= 10;
											}
										} else {
											if (release.masturbation === 1) {
												r += `prefers to masturbate rather than trading sex with ${whom}, <span class="mediumaquamarine">slightly reducing ${his} fear</span> of you. `;
												slave.trust++;
												slave.need = 0;
											} else {
												r += `is forced by the urges induced by the food to swap sex with ${whom}, and <span class="hotpink">hates ${himself}</span> for it. `;
												slave.devotion++;
												slave.need *= 0.5;
											}
										}
									} else if (slave.devotion <= 50) {
										r += `<span class="hotpink">accepts having to ask</span> ${whom} for sex, ${consentFetish(slave)} ${consentDiscoversFetish(slave)}`;
										slave.devotion++;
										slave.need = 0;
									} else {
										r += `<span class="mediumaquamarine">relies</span> on your ${whom} for mutual satisfaction, ${consentFetish(slave)} ${consentDiscoversFetish(slave)}`;
										slave.trust++;
										slave.need = 0;
									}
								}
								r += `${permissiveDrugEffects(slave)}`;
							}
						}

						if (slave.devotion <= 20) {
							if (!slave.voice) {
								r += `Living as a mute <span class="hotpink">molds ${him}</span> to your will. `;
							} else if (slave.lips > 95) {
								r += `Being unable to speak through ${his} facepussy <span class="hotpink">molds ${him}</span> to your will. `;
							} else if (slave.rules.speech === "restrictive") {
								r += `Living under enforced silence <span class="hotpink">molds ${him}</span> to your will. `;
							}
							slave.devotion++;

							switch (V.nurseryDecoration) {
								case "Chinese Revivalist":
									r += `The Oriental artwork in ${his} personal room reminds ${him} of where ${he} is and <span class="hotpink">dulls ${his} will. </span>`;
									slave.devotion++;
									break;
								case "Chattel Religionist":
									r += `${He} gets a space of ${his} own in the communal slave quarters, but the constant sexual presence of the other slaves <span class="hotpink">get ${him} used</span> to the routine of`;
									if (slave.trust >= 20) {
										r += `slavery and <span class="gold">keep ${him} aware of ${his} lowly place. </span>`;
										slave.trust--;
									} else {
										r += `slavery. `;
									}
									slave.devotion++;
									break;
								case "Degradationist":
									r += `${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it didn't have numerous cameras watching ${his} every move. The conditions <span class="hotpink">get ${him} used</span> to the routine of`;
									if (slave.trust >= 20) {
										r += `slavery and <span class="gold">keep ${him} aware of ${his} lowly place. </span>`;
										slave.trust--;
									} else {
										r += `slavery. `;
									}
									break;
								case "Asset Expansionist":
								case "Transformation Fetishist":
								case "Pastoralist":
									r += `${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it weren't filled with constant reminders of ${his} changing body. The conditions <span class="hotpink">get ${him} used</span> to the routine of`;
									if (slave.trust >= 20) {
										r += `slavery and <span class="gold">keep ${him} aware of ${his} lowly place. </span>`;
										slave.trust--;
									} else {
										r += `slavery. `;
									}
									break;
								default:
									r += `${He} gets a comfortable little room all to ${himself}, allowing ${him} to let down ${his} guard and <span class="mediumaquamarine">feel self-reliant. </span>`;
									slave.trust++;
									break;
							}
						} else {
							switch (V.nurseryDecoration) {
								case "Chinese Revivalist":
									r += `The Oriental artwork in ${his} personal room reminds ${him} of ${his} position and <span class="hotpink">renders ${him} even more submissive. </span>`;
									slave.devotion++;
									break;
								case "Chattel Religionist":
									r += `${He} likes ${his} personal space in ${V.nurseryName}, even if it constantly reminds ${him} that ${he} is naught but a servant to the Prophet. `;
									break;
								case "Degradationist":
									if (slave.trust >= 40) {
										r += `The invasive living conditions of ${V.nurseryName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life. `;
										slave.trust -= 2;
									} else if (slave.trust >= 10) {
										r += `The invasive living conditions of ${V.nurseryName} <span class="gold">keep ${him} aware of ${his} place. </span>`;
										slave.trust--;
									}
									break;
								case "Asset Expansionist":
								case "Transformation Fetishist":
								case "Pastoralist":
									r += `${He} likes ${his} little room in ${V.nurseryName}, ${slave.boobs < 10000 ? `even if ${his} boobs are too small to make the most of it` : `even more so, since it accommodates ${his} expansive bust`}. `;	// TODO:
									break;
								default:
									r += `${He} loves ${his} little room in ${V.nurseryName}. It's the perfect end to a busy day of taking care of children. `;
									slave.trust++;
									break;
							}
						}

						if (!V.universalRulesConsent) {
							if (slave.devotion <= 20) {
								if (slave.trust > -10) {
									if (V.NurseryiIDs.length > 2) {
										r += `Under the rules, ${he} finds ${himself} constantly molested by other slaves, and lives ${his} life constantly <span class="gold">afraid. </span>`;
									} else {
										r += `Under the rules, ${he} is free game for other slaves to molest, and lives ${his} life constantly <span class="gold">afraid</span> of the day another slave grabs ${him} from under the water. `;
									}
									slave.trust -= 2;
								} else {
									if (V.NurseryiIDs.length > 2) {
										r += `Under the rules, ${he} finds ${himself} constantly molested by other slaves, but ${he}'s already in such constant terror it doesn't seriously affect ${him}. `;
									} else {
										r += `Under the rules, ${he} will someday find ${himself} constantly molested by other slaves, but ${he}'s already in such constant terror it that it doesn't cross ${his} mind. `;
									}
								}
							} else if (release.slaves === 1) {
								if (slave.energy > 95) {
									if (V.NurseryiIDs.length > 2) {
										r += `Under the rules, ${he}'s allowed to demand that other slaves get ${him} off, and ${he} <span class="hotpink">adores</span> you for providing plentiful outlets for ${his} nymphomania. `;
									} else {
										r += `Under the rules, ${he}'s allowed to demand that other slaves get ${him} off, and ${he} <span class="hotpink">eagerly awaits</span> the day ${V.Matron ? `more of your slaves join ${him} in ${V.nurseryName} ` : `you assign more nurses to ${V.nurseryName} to help ${him} relieve ${his} ${slave.balls ? `swollen balls` : `tension`}`}. `;	// TODO:
									}
								} else if (slave.fetishKnown && slave.fetishStrength > 60) {
									if (slave.fetish === "sadist") {
										if (V.NurseryiIDs.length > 2) {
											r += `Under the rules, ${he}'s allowed to sexually abuse other slaves, and ${he} <span class="hotpink">adores</span> you for providing a whole nursery of slaves for ${him} to rape. `;
										} else {
											r += `Under the rules, ${he}'s allowed to sexually abuse other slaves, and ${he} <span class="hotpink">eagerly awaits</span> the day ${V.Matron ? `more of your slaves join ${him} in ${V.nurseryName}` : `you assign more nurses to ${V.nurseryName} to help ${him} unwind`}. `;
										}
									} else if (slave.fetish === "dom") {
										if (V.NurseryiIDs.length > 2) {
											r += `Under the rules, ${he}'s allowed to force other slaves to have sex with ${him}, and ${he} <span class="hotpink">adores</span> you for providing a whole nursery of slaves for ${him} to dominate. `;
										} else {
											r += `Under the rules, ${he}'s allowed to force other slaves to have sex with ${him}, and ${he} <span class="hotpink">eagerly awaits</span> the day ${V.Matron ? `more of your slaves join ${him} in ${V.nurseryName}` : `you assign more nurses to ${V.nurseryName} to help ${him} unwind`}. `;
										}
									}
								}
								slave.devotion++;
							}
						} else {
							if (slave.devotion <= 20 && slave.devotion > -20) {
								if (V.NurseryiIDs.length > 2) {
									r += `Since ${he}'s low in the slave hierarchy, <span class="mediumaquamarine">${he} knows</span> that the rule that slaves must get consent before having sex with ${him} are all that protect ${him} from abuse. `;
								} else {
									r += `Since ${he}'s low in the slave hierarchy, <span class="mediumaquamarine">${he} knows</span> that the rule that slaves must get consent before having sex with ${him} are all that protect ${him} from abuse. Well, that and the fact ${V.nurseryName} is ${V.Matron ? `mostly frequented by other slaveowners' stock` : `${his} little private sanctuary`}. `;
								}
								slave.trust++;
							}
						}

						if (!slave.attrKnown) {
							if ((V.week - slave.weekAcquired > 4) && slave.energy > 20) {
								r += `${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} mingles with other busily working slaves, analyzing ${his} sexual tastes. It seems ${he} is ${attractionDiscovery(slave)}`;
								slave.attrKnown = 1;
							}
						}

						if (slave.devotion >= 50) {
							r += `${He} does ${his} best for you, so ${he} frequently deserves a reward and never needs to be punished. `;
							punishments = 0;
							rewards = 3;
						} else if (slave.devotion >= 20) {
							r += `${He}'s obedient out of acceptance of ${his} place, so ${he} often deserves a reward and rarely needs to be punished. `;
							punishments = 1;
							rewards = 2;
						} else if (slave.devotion > -20) {
							if (slave.trust < -20) {
								r += `${He}'s obedient out of fear, so ${he} only rarely deserves a reward and sometimes needs to be punished. `;
								punishments = 1;
								rewards = 1;
							} else {
								r += `${He}'s too trusting for obedience and often needs to be punished. `;
								punishments = 2;
								rewards = 0;
							}
						} else {
							if (slave.trust < -50) {
								r += `${He}'s only obedient out of terror, so ${he} sometimes needs to be punished. `;
								punishments = 1;
								rewards = 0;
							} else {
								r += `${He} hates you too much to obey, so ${he} needs constant punishment. `;
								punishments = 3;
								rewards = 0;
							}
						}

						if (rewards) {
							switch (slave.rules.reward) {
								case "relaxation":
									r += `${He}'s given free time, which ${he}`;
									if (V.spa && V.spaSpots > 0) {
										r += `usually spends in ${V.spaName}${V.Attendant ? ` enjoying ${Attendant.slaveName}'s care` : ``}. `;
										improveCondition(slave, rewards * 2);
										slave.health.tired -= Math.ceil(Math.max(normalRandInt(rewards * 3), 1) * (1 + V.spaUpgrade / 2));
										V.spaSpots -= rewards * 2;
									} else if (V.spa) {
										r += 'mostly spends relaxing in the penthouse slave quarters because the spa was too busy. ';
										improveCondition(slave, rewards);
										slave.health.tired -= Math.max(normalRandInt(rewards * 2), 1);
									} else {
										r += `usually spends relaxing in the penthouse slave quarters. `;
										improveCondition(slave, rewards);
										slave.health.tired -= Math.max(normalRandInt(rewards * 2), 1);
									}

									if (slave.relationship) {
										r += `${He} often asks to save these breaks so ${he} can spend them with ${his} ${slave.relationship === 1 ? `friend` : slave.relationship === 2 ? `best friend` : slave.relationship === 3 ? `friend with benefits` : slave.relationship === 4 ? `sweetheart` : `wife`}. `;
									}
									r += `These breaks are <span class="green">good for ${him}. </span>`;
									break;
								case "drugs":
									r += `${He}'s <span class="hotpink">rewarded</span> with hits of mild recreational drugs, which <span class="red">isn't healthy,</span> but helps bind ${him} to you strongly. `;
									healthDamage(slave, rewards * 2);
									slave.devotion += rewards * 2;
									if (V.spa) {
										if (V.spaSpots > 0) {
											r += `${He} is also allowed to make use of the spa and <span class="green">relax a little. </span>`;
											slave.health.tired -= Math.max(normalRandInt(rewards), 1);
											V.spaSpots -= rewards;
										} else {
											r += `${He} can't relax in the spa, because it is full. `;
										}
									}
									break;
								case "orgasm":
									r += `${He}'s <span class="hotpink">rewarded</span> with`;
									if (slave.clitPiercing === 3) {
										r += `sustained orgasm from ${his} ${slave.dick ? `dick` : `clit`} piercing,`;
									} else if (slave.rules.release.slaves === 1) {
										r += `immediate sex with any nearby slave,`;
									} else {
										r += `a quick climax from a vibrator,`;
									}
									r += `<span class="green">boosting ${his} libido. </span>`;
									if (slave.energy < 98) {
										slave.energy += rewards;
									}
									slave.need -= rewards * 10;
									slave.devotion += rewards;
									if (V.spa) {
										if (V.spaSpots > 0) {
											r += `${He} is also allowed to make use of the spa and <span class="green">relax a little. </span>`;
											slave.health.tired -= Math.max(normalRandInt(rewards), 1);
											V.spaSpots -= rewards;
										} else {
											r += `${He} can't relax in the spa, because it is full. `;
										}
									}
									break;
								default:
									r += `${He}'s <span class="hotpink">rewarded</span>`;
									if (punishments && slave.rules.punishment === "situational") {
										r += ` and <span class="gold">punished</span>`;
									}
									r += ` situationally, letting ${him} develop normally. `;
									slave.devotion += rewards;
									if (V.spa) {
										if (V.spaSpots > 0) {
											r += `${He} is also allowed to make use of the spa and <span class="green">relax a little. </span>`;
											slave.health.tired -= Math.max(normalRandInt(rewards), 1);
											V.spaSpots -= rewards;
										} else {
											r += `${He} can't relax in the spa, because it is full. `;
										}
									}
									break;
							}
						}

						if (punishments) {
							switch (slave.rules.punishment) {
								case "confinement":
									r += `When ${he} disobeys, ${he}'s`;
									if (V.cellblock) {
										r += `<span class="gold">put in $cellblockName</span>${V.Wardeness ? `, where ${he} can experience ${Wardeness.slaveName}'s tender mercies` : ``}. `;
									} else {
										r += `<span class="gold">shut up in a box</span> until ${he} behaves. `;
									}
									slave.trust -= punishments;
									break;
								case "whipping":
									r += `When ${he} disobeys, ${he}'s <span class="gold">whipped,</span> not hard enough to mark ${him}, but hard enough to <span class="red">hurt,</span> breaking ${him} quickly. `;
									healthDamage(slave, punishments);
									slave.trust -= 2 * punishments;
									break;
								case "chastity":
									r += `When ${he} disobeys, ${he}'s <span class="gold">denied</span> ${his} next orgasm, <span class="red">reducing ${his} libido</span> but breaking ${him} to <span class="hotpink">sexual obedience. </span>`;
									if (slave.energy > 2) {
										slave.energy -= 2 * punishments;
									}
									slave.devotion += punishments;
									slave.trust -= punishments;
									break;
								default:
									if (!rewards || slave.rules.reward !== "situational") {
										r += `When ${he} disobeys, ${he}'s <span class="gold">punished</span> situationally, letting ${him} develop normally. `;
									}
									slave.trust -= punishments;
									break;
							}
						}

						break;
				}
			}
		}

		return r;
	}

	function attractionDiscovery(slave) {
		let r = ``;

		if (slave.attrXY <= 5) {
			r += `<span class="red">disgusted by men</span>`;
		} else if (slave.attrXY <= 15) {
			r += `<span class="red">turned off by men</span>`;
		} else if (slave.attrXY <= 35) {
			r += `<span class="red">not attracted to men</span>`;
		} else if (slave.attrXY <= 65) {
			r += `indifferent to men`;
		} else if (slave.attrXY <= 85) {
			r += `<span class="green">attracted to men</span>`;
		} else if (slave.attrXY <= 95) {
			r += `<span class="green">aroused by men</span>`;
		} else {
			r += `<span class="green">passionate about men</span>`;
		}
		r += ` and `;
		if (slave.attrXX <= 5) {
			r += `<span class="red">disgusted by women</span>`;
		} else if (slave.attrXX <= 15) {
			r += `<span class="red">turned off by women</span>`;
		} else if (slave.attrXX <= 35) {
			r += `<span class="red">not attracted to women</span>`;
		} else if (slave.attrXX <= 65) {
			r += `indifferent to women. `;
		} else if (slave.attrXX <= 85) {
			r += `<span class="green">attracted to women</span>`;
		} else if (slave.attrXX <= 95) {
			r += `<span class="green">aroused by women</span>`;
		} else {
			r += `<span class="green">passionate about women</span>`;
		}

		return r;
	}

	function playerFetishPlay(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (slave.fetishKnown && slave.fetishStrength >= 60) {
			switch (slave.fetish) {
				case "submissive":
					r += `hold ${him} down and fuck ${him}`;
					break;
				case "cumslut":
					if (PC.dick) {
						r += `cum in ${his} mouth`;
					} else {
						r += `use your strap-on on ${his} mouth`;
					}
					break;
				case "humiliation":
					r += `use ${him} in public`;
					break;
				case "buttslut":
					r += `fuck ${his} butt`;
					break;
				case "boobs":
					r += `fondle ${his} breasts`;
					if (slave.lactation > 0) {
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}
					break;
				case "sadist":
					r += `let ${him} help you abuse other slaves`;
					break;
				case "masochist":
					r += `hurt ${him}`;
					break;
				case "dom":
					r += `let ${him} help you use other slaves`;
					break;
				case "pregnancy":
					if (isFertile(slave) && PC.dick) {
						r += `put a baby in ${him}`;
					} else if (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500) {
						r += `enjoy ${his} fecund curves`;
					} else {
						r += `breed ${him}`;
					}
					break;
				default:
					r += `fuck ${him}`;
					break;
			}
		} else {
			r += `fuck ${him}`;
		}
		return r;
	}

	function playerEnergy(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (energy > 0) {
			if (energy === 3) {
				r += `You have surplus sexual energy to burn, even when ${he} doesn't ask, and ${he}`;
				if (slave.devotion < -20) {
					r += `<span class="hotpink">hates ${himself}</span> for how often ${he} gets off on you relieving your needs with ${his} body. `;
				} else if (slave.devotion <= 50 || slave.trust <= 20) {
					r += `<span class="hotpink">gets used to being a sex slave</span> every time ${he} climaxes as you use ${him}. `;
				} else {
					r += `<span class="hotpink">eagerly looks forward</span> to each climax ${he} shares with you. `;
				}
				slave.devotion += 2;
				slave.need = 0;
				SimpleSexAct.Player(slave, 10);
			} else if (energy === 2) {
				r += `You have surplus sexual energy to fuck ${him} whenever <<if $slaves[$i].relationship == -3>> you notice ${his} need<<else>>${he} forces ${himself} to ask<</if>>, and ${he} is <span class="hotpink">sexually dependent</span> on you. `;
				slave.devotion++;
				slave.need -= 40;
				SimpleSexAct.Player(slave, 5);
			} else if (slave.relationship === -3) {
				r += `You have little surplus sexual energy, but you make sure to keep your wife's needs in mind<<if $slaves[$i].devotion < -20>>, even if ${he} doesn't want it<</if>>. `;
				slave.need -= 40;
				SimpleSexAct.Player(slave, 5);
			} else {
				r += `You have little surplus sexual energy, and occasionally, ${he} asks in vain. `;
				slave.need -= 20;
				SimpleSexAct.Player(slave, 2);
			}
		} else {
			r += `You have no surplus sexual energy, and ${he} asks in vain, <span class="gold">reducing ${his} trust</span> in you. `;
			slave.trust--;
		}

		return r;
	}

	function playerDiscoversFetish(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (!slave.fetishKnown) {
			if (energy > 0) {
				if (energy > jsRandom(0, 5)) {
					r += `You discover that ${he} really likes it when you`;
					switch (slave.fetish) {
						case "submissive":
							r += `hold ${him} down and fuck ${him}; <span class="lightcoral">${he}'s a submissive!</span>`;
							break;
						case "cumslut":
							if (PC.dick) {
								r += `cum in ${his} mouth; <span class="lightcoral">${he}'s a cumslut!</span>`;
							} else {
								r += `use your strap-on in ${his} mouth; <span class="lightcoral">${he}'s a cumslut!</span>`;
							}
							break;
						case "humiliation":
							r += `use ${him} in public; <span class="lightcoral">${he}'s a humiliation fetishist!</span>`;
							break;
						case "buttslut":
							r += `<<if canDoAnal($slaves[$i])>>fuck ${his} butt<<else>>tease ${his} anus<</if>>; <span class="lightcoral">${he}'s an anal slut!</span>`;
							break;
						case "boobs":
							r += `fondle ${his} breasts; <span class="lightcoral">${he}'s a boob fetishist!</span>`;
							break;
						case "sadist":
							r += `let ${him} help you abuse other slaves; <span class="lightcoral">${he}'s a sadist!</span>`;
							break;
						case "masochist":
							r += `hurt ${him}; <span class="lightcoral">${he}'s a masochist!</span>`;
							break;
						case "dom":
							r += `let ${him} help you use other slaves; <span class="lightcoral">${he}'s dominant!</span>`;
							break;
						case "pregnancy":
							if (PC.dick) {
								if (!slave.mpreg) {
									r += `come <<if canDoVaginal($slaves[$i])>>inside<<else>>on<</if>> ${him}; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
								} else {
									r += `come <<if canDoAnal($slaves[$i])>>inside<<else>>on<</if>> ${him}; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
								}
							} else {
								r += `talk dirty and call ${him} a mother; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
							}
							break;
						default:
							r += `fuck ${him}; <span class="lightcoral">${he}'s got a normal sexuality. </span>`;
							break;
					}
					slave.fetishKnown = 1;
				}
			}
		}

		return r;
	}

	function playerDrugEffects(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (slave.balls > 0) {
			if (slave.drugs === "testicle enhancement" || slave.drugs === "intensive testicle enhancement") {
				if (slave.devotion >= 20 || slave.trust < -20) {
					if (slave.hormoneBalance >= 100) {
						r += `${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to relieve the pressure:`;
						if (slave.dick) {
							r += `${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						} else {
							r += `${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						}
						r += `This forces ${him} to come to you for release many times a day, and ${he} <span class="mediumaquamarine">is desperately reliant</span>`;
						if (slave.anus > 0 && canDoAnal(slave) && energy > 0) {
							r += `on your <<if $PC.dick == 0>>strap-on<<else>>penis<</if>> inside ${his} ass as a source of relief. `;
						} else {
							r += `on you for relief. `;
						}
						slave.trust += 2;
					} else {
						r += `${His} terribly swollen balls force ${him} to come to you for release several times a day, and ${he} <span class="mediumaquamarine">learns to rely</span>`;
						if (slave.anus > 0 && canDoAnal(slave) && energy > 0) {
							r += `on your <<if $PC.dick == 0>>strap-on<<else>>penis<</if>> inside ${his} ass as a source of relief. `;
						} else {
							r += `on you for relief. `;
						}
						slave.trust++;
					}
				} else {
					r += `${He} refuses to come to you for help with ${his} terribly swollen balls, no matter how backed up ${he} becomes. The intense blue-balling only <span class="mediumorchid">makes ${him} dislike you more. </span>`;
					slave.devotion--;
				}
			} else if (slave.drugs === "hyper testicle enhancement") {
				if (slave.devotion >= 20 || slave.trust < -20) {
					if (slave.hormoneBalance >= 100) {
						r += `${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure:`;
						if (slave.dick) {
							r += `${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						} else {
							r += `${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						}
						r += `This forces ${him} to come to you for release many times a day, and ${he} <span class="mediumaquamarine">is desperately reliant</span>`;
						if (slave.anus > 0 && canDoAnal(slave) && energy > 0) {
							r += `on your <<if $PC.dick == 0>>strap-on<<else>>penis<</if>> inside ${his} ass as a source of relief. `;
						} else {
							r += `on you for relief. `;
						}
						slave.trust += 2;
					} else {
						r += `${His} grotesquely swollen balls force ${him} to come to you for release dozens of times a day, and ${he} <span class="mediumaquamarine">is desperately reliant</span>`;
						if (slave.anus > 0 && canDoAnal(slave) && energy > 0) {
							r += `on your <<if $PC.dick == 0>>strap-on<<else>>penis<</if>> inside ${his} ass as a source of relief. `;
						} else {
							r += `on you for relief. `;
						}
						slave.trust++;
					}
				} else {
					r += `${He} refuses to come to you for help with ${his} grotesquely swollen balls, no matter how backed up and sore ${he} becomes. The intense blue-balling only <span class="mediumorchid">makes ${him} hate you more. </span>`;
					slave.devotion -= 3;
				}
			}
		}

		if (slave.drugs === "super fertility drugs" && canImpreg(slave, PC)) {
			if (slave.devotion >= 20 || slave.trust < -20) {
				r += `${His} reproductive system is in overdrive leading ${him} to come to you for insemination several times a day; ${he} <span class="mediumaquamarine">desperately hopes</span> for the day your seed takes root in ${his} womb. `;
				slave.trust++;
			}
		}

		return r;
	}

	function masturbationFetishPlay(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (slave.fetishKnown && slave.fetishStrength >= 60) {
			switch (slave.fetish) {
				case "submissive":
					r += `frequently pretends to be getting held down and dominated. `;
					break;
				case "cumslut":
					if (slave.dick > 5) {
						r += `enjoys giving ${himself} head. `;
					} else if (slave.dick) {
						r += `enjoys licking up ${his} own cum. `;
					} else {
						r += `always has a dildo in ${his} mouth. `;
					}
					break;
				case "humiliation":
					r += `usually does it out in the open for all to see. `;
					break;
				case "buttslut":
					if (slave.anus > 0) {
						r += `usually pounds ${his} ass with the largest dildo ${he} can find. `;
					} else {
						r += `enjoys fiddling with ${his} virgin asshole. `;
					}
					break;
				case "boobs":
					r += `pays extra attention to ${his} breasts and nipples. `;
					if (slave.lactation) {
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					} else {
						induceLactation(slave);
					}
					break;
				case "sadist":
					r += `frequently poses threats at ${himself}. `;
					break;
				case "masochist":
					r += `frequently pretends to be getting held down and forcibly raped. `;
					break;
				case "dom":
					r += `usually pretends to dominate ${himself}. `;
					break;
				case "pregnancy":
					if (slave.belly > 1500) {
						let belly = bellyAdjective(slave);
						r += `always rubs and teases ${his} ${belly} belly while doing so. `;
					} else if (isItemAccessible("a small empathy belly")) {
						r += `frequently straps on a fake belly to enhance ${his} fun. `;
					} else {
						r += `frequently pretends to be`;
						if (slave.balls) {
							r += `getting a girl pregnant. `;
						} else {
							r += `getting knocked up. `;
						}
					}
					break;
				default:
					if (slave.energy > 95) {
						r += `strives to achieve as many orgasms as ${he} can in one session. `;
					} else {
						r += `quickly gets off and moves on. `;
					}
					break;
			}
		} else if (slave.energy > 95) {
			r += `strives to achieve as many orgasms as ${he} can in one session. `;
		} else {
			r += `quickly gets off and moves on. `;
		}

		return r;
	}

	function masturbationDiscoversFetish(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (!slave.fetishKnown && jsRandom(1, 20) === 1) {
			r += `However, you start to notice a trend in ${his} fantasies,`;
			switch (slave.fetish) {
				case "submissive":
					r += `${he} likes to tie ${himself} up and boss ${himself} around; <span class="lightcoral">${he}'s a submissive!</span>`;
					break;
				case "cumslut":
					if (slave.dick) {
						r += `${he} often eats ${his} own cum when ${he}'s finished; <span class="lightcoral">${he}'s a cumslut!</span>`;
					} else {
						r += `${he} likes to have something, anything, in ${his} mouth while ${he} masturbates; <span class="lightcoral">${he}'s a cumslut!</span>`;
					}
					break;
				case "humiliation":
					r += `${he} tends to masturbate in places where others can walk in on ${him}; <span class="lightcoral">${he}'s a humiliation fetishist!</span>`;
					break;
				case "buttslut":
					r += `${he} always pays special attention to ${his} butthole; <span class="lightcoral">${he}'s an anal slut!</span>`;
					break;
				case "boobs":
					r += `${he} always has a hand to ${his} nipples; <span class="lightcoral">${he}'s a boob fetishist!</span>`;
					if (slave.lactation) {
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					} else {
						induceLactation(slave);
					}
					break;
				case "sadist":
					r += `${he} tends to threaten ${his} toys; <span class="lightcoral">${he}'s a sadist!</span>`;
					break;
				case "masochist":
					r += `${he} often to abuses ${himself}; <span class="lightcoral">${he}'s a masochist!</span>`;
					break;
				case "dom":
					r += `${he} sometimes bosses ${his} toys around; <span class="lightcoral">${he}'s dominant!</span>`;
					break;
				case "pregnancy":
					r += `${he} frequently pretends to either get pregnant, be pregnant, or get someone else pregnant; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
					break;
				default:
					if (slave.energy > 95) {
						r += `${he}'s always horny; <span class="lightcoral">${he}'s a nympho!</span>`;
					} else {
						r += `<span class="lightcoral">they are incredibly mundane. </span>`;
					}
					break;
			}
		}

		return r;
	}

	function masturbationDrugEffects(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (slave.balls) {
			if (slave.drugs === "testicle enhancement" || slave.drugs === "intensive testicle enhancement") {
				if (slave.hormoneBalance >= 100) {
					r += `${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to get relieve the pressure:`;
					if (slave.dick) {
						r += `${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
					} else {
						r += `${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
					}
					r += `${He} masturbates as often as ${he} can, but <span class="mediumorchid">can't find relief. </span>`;
					slave.devotion--;
				} else {
					r += `${His} terribly swollen balls force ${him} to masturbate several times a day, cultivating a need for sex that <span class="mediumorchid">${he} can't fulfill. </span>`;
					slave.devotion--;
				}
			} else if (slave.drugs === "hyper testicle enhancement") {
				if (slave.hormoneBalance >= 100) {
					r += `${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure:`;
					if (slave.dick) {
						r += `${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
					} else {
						r += `${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
					}
					r += `${He} masturbates non-stop, but <span class="mediumorchid">can't find relief. </span>`;
					slave.devotion -= 3;
				} else {
					r += `${His} grotesquely swollen balls force ${him} to masturbate constantly, cultivating a need for sex that <span class="mediumorchid">${he} can't fulfill. </span>`;
					slave.devotion--;
				}

				if (slave.energy > 40) {
					r += `The constant orgasms steadily lose their impact, <span class="red">weakening ${his} sex drive. </span>`;
					slave.energy -= 2;
				}
			}
		}

		if (slave.drugs === "super fertility drugs" && canGetPregnant(slave)) {
			r += `${His} reproductive system is in overdrive,`;
			if (slave.dick > 9) {
				r += `leaving ${him} <span class="mediumorchid">desperately fucking ${himself}</span> in an effort to get pregnant since <span class="gold">you won't <<if $PC.dick>>give ${him}<<else>>let ${him} find<</if>> the dick ${he} needs. </span>`;
				if (canImpreg(slave, slave)) {
					knockMeUp(slave, 5, 2, slave.ID, 1);
				}
				if (slave.mpreg && slave.anus === 0) {
					r += `<span class="lime">${He} is so baby crazed ${he} takes ${his} own anal virginity. </span>`;
					slave.anus++;
				} else if (slave.vagina === 0) {
					r += `<span class="lime">${He} is so baby crazed ${he} takes ${his} own virginity. </span>`;
					slave.vagina++;
				}
				slave.devotion -= 3;
				slave.trust -= 2;
			} else if (slave.devotion >= -20) {
				r += `leaving ${him} <span class="mediumorchid">completely unfulfilled</span> since <span class="gold">you won't <<if $PC.dick>>give ${him}<<else>>let ${him} find<</if>> the dick ${he} needs. </span>`;
				slave.devotion -= 3;
				slave.trust -= 2;
			} else {
				r += `leaving ${him} desperate for a thorough seeding <span class="mediumorchid">that you've forbidden ${him} from having. </span>`;
				slave.devotion -= 3;
			}
		}

		if (slave.energy >= 60) {
			r += `${His} chronic masturbation <span class="red">steadily dulls</span> ${his} sexual pleasure. `;
			slave.energy--;
		}

		return r;
	}

	function rapeFetish(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let
			r = ``,
			who = (slave.rules.release.slaves === 1) ? `other slaves` : `${his} family`; // should be the only two choices if we get here

		if (slave.fetishKnown && slave.fetishStrength >= 60) {
			switch (slave.fetish) {
				case "submissive":
					r += `plead that ${who} fuck ${him}. `;
					if (averageDick > 4) {
						if (slave.anus > 0 && slave.anus < 3 && canDoAnal(slave)) {
							if ((slave.anus * 40) - (averageDick * 5) < jsRandom(1, 100)) {
								r += `<span class="lime">${His} asshole is loosened</span> during sex with ${who}, since most of the cocks ${he} enticed a dominating buttfuck from are `;
								slave.anus++;
								actX(slave, "anal", 3);
							}

							if (averageDick > 5) {
								if (slave.vagina > 0 && slave.vagina < 3 && canDoVaginal(slave)) {
									if ((slave.vagina * 40) - (averageDick * 5) < jsRandom(1, 100)) {
										r += `Since most of the slaves ${he} enticed a pounding from are extremely hung, <span class="lime">${his} cunt gets stretched out. </span>`;
										slave.vagina++;
										actX(slave, "vaginal", 3);
									}
								}
							}
						}
					}
					SimpleSexAct.Slave(slave, 7);
					break;
				case "cumslut":
					if (slave.rules.release.slaves === 1) {
						r += `suck or be sucked by any slave ${he} fancies. `;
					} else {
						r += `suck or be sucked by any relative ${he} fancies. `;
					}
					actX(slave, "oral", jsRandom(5, 15));
					break;
				case "humiliation":
					r += `demand that ${who} let ${him} fuck them in public. `;
					if (!slave.rivalry) {
						let rival = randomRapeRivalryTarget(slave, (s) => { return s.devotion <= 20 && s.trust < -20; });
						if (jsDef(rival)) {
							r += `Craving a rush, ${he} repeatedly forces a reluctant ${SlaveFullName(rival)} to have sex with ${him} in public. ${rival.slaveName} resents this, and ${slave.slaveName}'s ongoing sexual abuse <span class="lightsalmon">starts a rivalry</span> between them. `;
							slave.rivalry = 1;
							rival.rivalry = 1;
							slave.rivalryTarget = rival.ID;
							rival.rivalryTarget = slave.ID;
							SimpleSexAct.Slave(rival, 4);
							if (canPenetrate(rival)) {
								actX(rival, "penetrative", jsRandom(1, 3));
							}

							if (!App.Utils.sexAllowed(slave, rival)) {
								r += `As the rules do not permit ${slave.slaveName} and ${rival.slaveName} to have sex, ${he} is <span class="yellow">severely punished.</span> `;
								slave.trust -= 4;
							}
						}
					}
					SimpleSexAct.Slave(slave, 4);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(1, 3));
					}
					break;
				case "buttslut":
					r += `demand that ${who} penetrate ${his} anus. `;
					if (averageDick > 4) {
						if (slave.anus > 0 && slave.anus < 3 && canDoAnal(slave)) {
							if ((slave.anus * 30) - (averageDick * 5) < jsRandom(1, 100)) {
								r += `Since most of the slaves ${he} demands anal sex from are extremely hung, <span class="lime">${his} asshole gets stretched out. </span>`;
								slave.anus++;
							}
						}
					}
					actX(slave, "anal", jsRandom(5, 12));
					break;
				case "boobs":
					r += `demand that ${who} massage ${his} breasts. `;
					if (slave.lactation) {
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					} else {
						induceLactation(slave);
					}
					actX(slave, "mammary", jsRandom(10, 25));
					break;
				case "sadist":
					if (slave.rules.release.slaves === 1) {
						r += `force the most reluctant slaves to let ${him} fuck them. `;
					} else { // should imply hasFamilySex
						r += `force ${his} most reluctant family members to let ${him} fuck them. `;
					}
					if (!slave.rivalry) {
						let rival = randomRapeRivalryTarget(slave, (s) => { return s.devotion <= 50 && s.sexualFlaw !== "none"; });
						if (jsDef(rival)) {
							const {
								// eslint-disable-next-line no-unused-vars
								he2, him2, his2, hers2, himself2, boy2, He2, His2
							} = getPronouns(rival).appendSuffix('2');

							r += `${He} focuses on ${SlaveFullName(rival)}, who has a sexual flaw ${slave.slaveName} can exploit. ${He} sadistically`;
							if (rival.sexualFlaw === "hates oral") {
								r += `rapes the poor slave's face${!canAchieveErection(slave) ? ` with ${his} fingers` : ``}. ${rival.slaveName} hates oral`;
							} else if (rival.sexualFlaw === "hates penetration" && canDoVaginal(rival)) {
								r += `rapes the poor slave's pussy${!canAchieveErection(slave) ? ` with ${his} fingers` : ``}. ${rival.slaveName} hates penetration`;
							} else if ((rival.sexualFlaw === "hates anal" || rival.sexualFlaw === "hates penetration") && canDoAnal(rival)) {
								r += `rapes the poor slave's ass${!canAchieveErection(slave) ? ` with ${his} fingers` : ``}. ${rival.slaveName} hates anal`;
							} else if (rival.sexualFlaw === "shamefast") {
								r += `rapes the poor slave in public. ${rival.slaveName} is terribly shamefast`;
							} else if (rival.sexualFlaw === "idealistic") {
								r += `rapes the poor slave every time ${he} catches ${him2} being romantic. ${rival.slaveName} is still idealistic`;
							} else {
								r += `rapes the poor slave every chance ${he} gets,`;
							}
							r += ` and the sexual abuse <span class="lightsalmon">starts a rivalry</span> between them. `;
							slave.rivalry = 1;
							rival.rivalry = 1;
							slave.rivalryTarget = rival.ID;
							rival.rivalryTarget = slave.ID;
							SimpleSexAct.Slave(rival, 4);
							if (canPenetrate(rival)) {
								actX(rival, "penetrative", jsRandom(1, 3));
							}
							if (!App.Utils.sexAllowed(slave, rival)) {
								r += `As the rules do not permit ${slave.slaveName} and ${rival.slaveName} to have sex, ${he} is <span class="yellow">severely punished.</span> `;
								slave.trust -= 4;
							}
						}
					}
					SimpleSexAct.Slave(slave, 4);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(1, 3));
					}
					break;
				case "masochist":
					r += `demand that ${who} hurt ${him}. `;
					if (averageDick > 4) {
						if (slave.anus > 0 && slave.anus < 3 && canDoAnal(slave)) {
							if ((slave.anus * 30) - (averageDick * 5) < jsRandom(1, 100)) {
								r += `<span class="lime">${His} asshole is loosened</span> during sex with hung slaves, since ${he} often relies on painal to address ${his} needs. `;
								slave.anus++;
								actX(slave, "anal", 3);
							}
						}

						if (averageDick > 5) {
							if (slave.vagina > 0 && slave.vagina < 3 && canDoVaginal(slave)) {
								if ((slave.vagina * 30) - (averageDick * 5) < jsRandom(1, 100)) {
									r += `Since ${he} usually demands that hung slaves fuck ${him} hard enough to make ${his} pussy hurt, <span class="lime">${his} cunt gets stretched out. </span>`;
									slave.vagina++;
									actX(slave, "vaginal", 3);
								}
							}
						}
					}
					SimpleSexAct.Slave(slave, 12);
					break;
				case "dom":
					r += `force ${who} to submit to ${him}. `;
					if (!slave.rivalry) {
						let rival = randomRapeRivalryTarget(slave, (s) => { return s.devotion <= 20 && s.trust < -20; });
						if (jsDef(rival)) {
							r += `${He} repeatedly rapes a reluctant ${SlaveFullName(rival)}; ${he} can't seem to keep ${his} hands off the poor slave, who can't avoid ${him}. Not surprisingly, ${rival.slaveName} resents this, and ${slave.slaveName}'s ongoing sexual abuse <span class="lightsalmon">starts a rivalry</span> between them. `;
							slave.rivalry = 1;
							rival.rivalry = 1;
							slave.rivalryTarget = rival.ID;
							rival.rivalryTarget = slave.ID;
							SimpleSexAct.Slave(rival, 4);

							if (!App.Utils.sexAllowed(slave, rival)) {
								r += `As the rules do not permit ${slave.slaveName} and ${rival.slaveName} to have sex, ${he} is <span class="yellow">severely punished.</span> `;
								slave.trust -= 4;
							}
						}
					}
					SimpleSexAct.Slave(slave, 7);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(6, 9));
					}
					break;
				case "pregnancy":
					r += `demand that ${who} indulge ${his} pregnancy fetish. `;
					if (averageDick > 5) {
						if (!slave.mpreg) {
							if (slave.vagina > 0 && slave.vagina < 3 && canDoVaginal(slave)) {
								if ((slave.vagina * 40) - (averageDick * 5) < jsRandom(1, 100)) {
									r += `Since ${he} constantly demands to be fucked deeply to get ${his} womb filled with cum, <span class="lime">${his} cunt gets stretched out. </span>`;
									slave.vagina++;
									actX(slave, "vaginal", jsRandom(7, 14));
								}
							}
						} else {
							if (slave.anus > 0 && slave.anus < 3 && canDoAnal(slave)) {
								if ((slave.anus * 40) - (averageDick * 5) < jsRandom(1, 100)) {
									r += `Since ${he} constantly demands to be fucked deeply to get ${his} womb filled with cum, <span class="lime">${his} ass gets stretched out. </span>`;
									slave.anus++;
									actX(slave, "anal", jsRandom(7, 14));
								}
							}
						}
					}

					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(6, 9));
					}
					break;
				default:
					if (slave.energy > 95) {
						r += `demand that ${who} satisfy ${his} formidable appetites. `;
						if (averageDick > 4) {
							if (slave.anus > 0 && slave.anus < 3 && canDoAnal(slave)) {
								if ((slave.anus * 30) - (averageDick * 5) < jsRandom(1, 100)) {
									r += `<span class="lime">${His} asshole is loosened</span> during sex with well endowed slaves, since ${he}'s so addicted to sex all ${his} holes see heavy traffic. `;
									slave.anus++;
									actX(slave, "anal", 3);
								}
							}
							if (averageDick > 5) {
								if (slave.vagina > 0 && slave.vagina < 3 && canDoVaginal(slave)) {
									if ((slave.vagina * 30) - (averageDick * 5) < jsRandom(1, 100)) {
										r += `${He} indulges in non-stop sex with your well endowed slaves, so much so that <span class="lime">${his} cunt gets stretched out. </span>`;
										slave.vagina++;
										actX(slave, "vaginal", 3);
									}
								}
							}
						}
						SimpleSexAct.Slave(slave, 7);
						if (canPenetrate(slave)) {
							actX(slave, "penetrative", jsRandom(3, 6));
						}
					} else {
						r += `demand that ${who} have sex with ${him}. `;
						SimpleSexAct.Slave(slave, 7);
						if (canPenetrate(slave)) {
							actX(slave, "penetrative", jsRandom(3, 6));
						}
					}
					break;
			}
		} else {
			r += `demand that ${who} have sex with ${him}. `;
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				actX(slave, "penetrative", jsRandom(3, 6));
			}
		}

		return r;
	}

	function rapeDiscoversFetish(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (!slave.fetishKnown) {
			if (jsRandom(1, 2) === 1) {
				slave.fetishKnown = 1;
				r += `You discover that ${he} really likes it when the other slaves`;
				switch (slave.fetish) {
					case "submissive":
						r += `hold ${him} down and fuck ${him}; <span class="lightcoral">${he}'s a submissive!</span>`;
						break;
					case "cumslut":
						r += `cum in ${his} mouth; <span class="lightcoral">${he}'s a cumslut!</span>`;
						break;
					case "humiliation":
						r += `use ${him} in public; <span class="lightcoral">${he}'s a humiliation fetishist!</span>`;
						break;
					case "buttslut":
						if (slave.anus > 0) {
							r += `<<if canDoAnal($slaves[$i])>>fuck ${his} butt<<else>>tease ${his} anus<</if>>;`;
						} else {
							r += `tease ${his} virgin anus;`;
						}
						r += `<span class="lightcoral">${he}'s an anal slut!</span>`;
						break;
					case "boobs":
						r += `fondle ${his} breasts; <span class="lightcoral">${he}'s a boob fetishist!</span>`;
						if (slave.lactation) {
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						} else {
							induceLactation(slave);
						}
						break;
					case "sadist":
						r += `let ${him} abuse them; <span class="lightcoral">${he}'s a sadist!</span>`;
						break;
					case "masochist":
						r += `hurt ${him}; <span class="lightcoral">${he}'s a masochist!</span>`;
						break;
					case "dom":
						r += `let ${him} dominate them; <span class="lightcoral">${he}'s dominant!</span>`;
						break;
					case "pregnancy":
						if (!slave.mpreg) {
							r += `come <<if canDoVaginal($slaves[$i])>>inside<<else>>on<</if>> ${him}; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
						} else {
							r += `come <<if canDoAnal($slaves[$i])>>inside<<else>>on<</if>> ${him}; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
						}
						break;
					default:
						r += `fuck ${him}; <span class="lightcoral">${he}'s got a normal sexuality. </span>`;
						break;
				}
			}
		}

		return r;
	}

	function consentFetish(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (slave.fetishKnown && slave.fetishStrength >= 60) {
			switch (slave.fetish) {
				case "submissive":
					r += `usually pairing off with a more dominant slave. `;
					if (largeDicks(slave, 40)) {
						r += `<span class="lime">${His} asshole is loosened</span> during sex with other slaves, since most of the cocks ${he} lets dominate ${his} backdoor are very `;
						slave.anus++;
						actX(slave, "anal", 3);
						if (hugeDicks(slave, 40)) {
							r += `Since most of the slaves ${he} takes a pounding from are extremely hung, <span class="lime">${his} cunt gets stretched out .</span>`;
							slave.vagina++;
							actX(slave, "vaginal", 3);
						}
					}
					SimpleSexAct.Slave(slave, 7);
					break;
				case "cumslut":
					r += `and is popular for ${his} willingness to give oral. `;
					actX(slave, "oral", jsRandom(5, 15));
					break;
				case "humiliation":
					r += `usually asking them to fuck out in the open. `;
					SimpleSexAct.Slave(slave, 7);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(1, 3));
					}
					break;
				case "buttslut":
					r += `looking after anyone who will`;
					if (slave.anus > 0) {
						if (canDoAnal(slave)) {
							r += `penetrate`;
							actX(slave, "anal", jsRandom(5, 12));
						} else {
							r += `tease`;
						}
						r += `${his} ass`;
					} else {
						r += `tease ${his} virgin anus`;
					}
					r += `in return. `;
					if (largeDicks(slave, 30)) {
						r += `Since most of the slaves ${he} enjoys anal sex with are extremely hung, <span class="lime">${his} asshole gets stretched out .</span>`;
					}
					break;
				case "boobs":
					r += `seeing to anyone who will show ${his} breasts some love. `;
					if (slave.lactation) {
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					} else {
						induceLactation(slave);
					}
					actX(slave, "mammary", jsRandom(10, 25));
					break;
				case "sadist":
					r += `usually pairing off with a masochistic slave willing to accept ${his} abuse. `;
					SimpleSexAct.Slave(slave, 7);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(1, 3));
					}
					break;
				case "masochist":
					r += `usually pairing off with an abusive slave. `;
					if (largeDicks(slave, 30)) {
						r += `<span class="lime">${His} asshole is loosened,</span> since ${he} begs hung slaves to fuck ${his} butt until ${he} cries. `;
						slave.anus++;
						actX(slave, "anal", 3);
						if (hugeDicks(slave, 30)) {
							r += `Since ${he} eagerly begs hung slaves to fuck ${him} until ${he} cries, <span class="lime">${his} cunt gets stretched out .</span>`;
							slave.vagina++;
							actX(slave, "vaginal", 3);
						}
					}
					SimpleSexAct.Slave(slave, 6);
					break;
				case "dom":
					r += `usually pairing off with a submissive bitch. `;
					SimpleSexAct.Slave(slave, 6);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(1, 3));
					}
					break;
				case "pregnancy":
					r += `doing ${his} best to pair off with any pregnant slaves. `;
					if (!slave.mpreg) {
						if (hugeDicks(slave, 40)) {
							r += `${He} also takes cock whenever ${he} can, begging to be fucked deeply to get ${his} womb filled with cum, so <span class="lime">${his} cunt gets stretched out. </span>`;
							slave.vagina++;
							actX(slave, "vaginal", 3);
						}
					} else {
						if (hugeDicks(slave, 40)) {
							r += `${He} also takes cock whenever ${he} can, begging to be fucked deeply to get ${his} womb filled with cum, so <span class="lime">${his} ass gets stretched out. </span>`;
							slave.anus++;
							actX(slave, "anal", 3);
						}
					}
					SimpleSexAct.Slave(slave, 7);
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", jsRandom(6, 9));
					}
					break;
				default:
					if (slave.energy > 95) {
						r += `and has to give out a lot of favors to get enough attention for ${himself}. `;
						if (largeDicks(slave, 30)) {
							r += `<span class="lime">${His} asshole is loosened</span> during sex with well endowed slaves, since ${he}'s so addicted to sex all ${his} holes see heavy traffic. `;
							slave.anus++;
							actX(slave, "anal", 3);
							if (hugeDicks(slave, 30)) {
								r += `${He} indulges in non-stop sex with your well endowed slaves, so much so that <span class="lime">${his} cunt gets stretched out. </span>`;
								slave.vagina++;
								actX(slave, "vaginal", 3);
							}
						}
						SimpleSexAct.Slave(slave, 7);
						if (canPenetrate(slave)) {
							actX(slave, "penetrative", jsRandom(3, 6));
						}
					} else {
						r += `doing ${his} best to get off and move on. `;
						SimpleSexAct.Slave(slave, 7);
						if (canPenetrate(slave)) {
							actX(slave, "penetrative", jsRandom(3, 6));
						}
					}
					break;
			}
		} else {
			r += `doing ${his} best to get off and move on. `;
			SimpleSexAct.Slave(slave, 7);
			if (canPenetrate(slave)) {
				actX(slave, "penetrative", jsRandom(3, 6));
			}
		}

		return r;
	}

	function consentDiscoversFetish(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (!slave.fetishKnown) {
			if (jsRandom(1, 2) === 1) {
				slave.fetishKnown = 1;
				r += `However, one of ${his} partners`;
				switch (slave.fetish) {
					case "submissive":
						r += `holds ${him} down, and ${he} loves it; <span class="lightcoral">${he}'s a submissive!</span>`;
						break;
					case "cumslut":
						r += `finally has to push ${him} away to get ${him} to stop sucking; <span class="lightcoral">${he}'s a cumslut!</span>`;
						break;
					case "humiliation":
						r += `fucks ${him} in public, and ${he} loves it; <span class="lightcoral">${he}'s a humiliation fetishist!</span>`;
						break;
					case "buttslut":
						if (slave.anus > 0) {
							r += `<<if canDoAnal($slaves[$i])>>fucks ${his} butt<<else>>teases ${his} anus<</if>>, and ${he} loves it;`;
						} else {
							r += `teases ${his} virgin anus, and ${he} loves it;`;
						}
						r += `<span class="lightcoral">${he}'s an anal slut!</span>`;
						break;
					case "boobs":
						r += `fondles ${his} breasts, and ${he} loves it; <span class="lightcoral">${he}'s a boob fetishist!</span>`;
						if (slave.lactation) {
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						} else {
							induceLactation(slave);
						}
						break;
					case "sadist":
						r += `asks $slaves[$i].slaveName to hit ${him}, which $slaves[$i].slaveName enjoys doing; <span class="lightcoral">${he}'s a sadist!</span>`;
						break;
					case "masochist":
						r += `hits $slaves[$i].slaveName while fucking ${him}, which only makes ${him} hornier; <span class="lightcoral">${he}'s a masochist!</span>`;
						break;
					case "dom":
						r += `asks $slaves[$i].slaveName to make them $slaves[$i].slaveName's bitch, which $slaves[$i].slaveName manages like a natural; <span class="lightcoral">${he}'s dominant!</span>`;
						break;
					case "pregnancy":
						r += `pretends to get ${him} pregnant, which ${he} really enjoys; <span class="lightcoral">${he}'s a pregnancy fetishist!</span>`;
						break;
					default:
						if (slave.energy > 95) {
							r += `discovers that ${he} cannot be satisfied; <span class="lightcoral">${he}'s a nympho!</span>`;
						} else {
							r += `discovers that ${he} isn't terribly exciting; <span class="lightcoral">${he}'s got a normal sexuality. </span>`;
						}
				}
			}
		}

		return r;
	}

	function permissiveDrugEffects(slave) {
		const
			{
				// eslint-disable-next-line no-unused-vars
				he, him, his, hers, himself, boy, He, His
			} = getPronouns(slave);

		let r = ``;

		if (slave.balls) {
			if (slave.drugs === "testicle enhancement" || slave.drugs === "intensive testicle enhancement") {
				if (slave.devotion >= 20 || slave.trust < -20) {
					if (slave.hormoneBalance >= 100) {
						r += `${He} can't seem to get enough cum out of ${his} terribly swollen balls in one orgasm to relieve the pressure:`;
						if (slave.dick) {
							r += `${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						} else {
							r += `${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						}
						r += `${He} is very reliant on your other slaves to help ${him}, which <span class="mediumaquamarine">habituates ${him}</span> to slave sex. `;
					} else {
						r += `${His} terribly swollen balls force ${him} to rely on other slaves for release several times a day, and jetting cum into and onto them <span class="mediumaquamarine">habituates ${him}</span> to slave sex. `;
					}
					slave.trust++;
				} else {
					r += `${He} can't seem to get enough cum out of ${his} terribly swollen balls to relieve the pressure and is either unwilling or unable to get help with it, something ${he} <span class="mediumorchid">blames you for. </span>`;
					slave.devotion--;
				}
			} else if (slave.drugs === "hyper testicle enhancement") {
				if (slave.devotion >= 20 || slave.trust < -20 || !canPenetrate(slave)) {
					if (slave.hormoneBalance >= 100) {
						r += `${He} can't seem to get enough cum out of ${his} grotesquely swollen balls in one orgasm to get relieve the pressure:`;
						if (slave.dick) {
							r += `${his} poor soft dick produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						} else {
							r += `${his} cumhole produces slow, anemic ejaculations, no matter how backed up ${he} is. `;
						}
						r += `${He} is completely dependent on your other slaves to help ${him}, which <span class="mediumaquamarine">habituates ${him}</span> to slave sex. `;
					} else {
						r += `${His} grotesquely swollen balls force ${him} to rely on other slaves for release throughout times a day, and swelling them with cum <span class="mediumaquamarine">habituates ${him}</span> to slave sex, though you have to take precautions so ${he} doesn't knock up your entire stock. `;
					}
					slave.trust++;
				} else {
					r += `${He} can't seem to get enough cum out of ${his} grotesquely swollen balls to relieve the pressure and is either unwilling or unable to get help with it, something ${he} <span class="mediumorchid">blames you for. </span>`;
					slave.devotion--;
				}
			}
		}
		if (slave.drugs === "super fertility drugs" && canGetPregnant(slave)) {
			r += `${His} reproductive system is in overdrive leading ${him} to seek out any dicked slaves ${he} can find several times a day. ${He} <span class="mediumaquamarine">desperately longs</span> for the day ${his} efforts fill ${his} womb with child. `;
			slave.trust++;
		}

		return r;
	}

	function largeDicks(slave, x) {
		if (averageDick > 4) {
			if (slave.anus > 0 && slave.anus < 3 && canDoAnal(slave)) {
				if ((slave.anus * x) - (averageDick * 5) < jsRandom(1, 100)) {
					return true;
				}
			}
		}
		return false;
	}

	function hugeDicks(slave, x) {
		if (averageDick > 5) {
			if (slave.vagina > 0 && slave.vagina < 3 && canDoVaginal(slave)) {
				if ((slave.vagina * x) - (averageDick * 5) < jsRandom(1, 100)) {
					return true;
				}
			}
		}
		return false;
	}

	window.saRules = saRules;
})();
