window.generateRandomEventPoolStandard = function(eventSlave) {
	/* STANDARD EVENTS */

	if (eventSlave.fetish !== "mindbroken") {
		if (hasAnyArms(eventSlave) && hasAnyLegs(eventSlave)) {
			if (canTalk(eventSlave)) {
				if (State.variables.RECockmilkInterceptionIDs.length > 1 || (State.variables.RECockmilkInterceptionIDs.length === 1 && eventSlave.ID !== State.variables.RECockmilkInterceptionIDs[0])) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.dietCum > 0 || (eventSlave.fetishKnown && eventSlave.fetish === "cumslut")) {
							State.variables.RETSevent.push("cockmilk interception");
						}
					}
				}

				if (State.variables.REInterslaveBeggingIDs.length > 1 || (State.variables.REInterslaveBeggingIDs.length === 1 && eventSlave.ID !== State.variables.REInterslaveBeggingIDs[0])) {
					if (State.variables.universalRulesConsent === 1) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.energy > 40) {
								if (canPenetrate(eventSlave)) {
									if (canSee(eventSlave)) {
										if (eventSlave.rules.release.slaves === 1) {
											State.variables.RETSevent.push("interslave begging");
										}
									}
								}
							}
						}
					}
				}

				if (State.variables.seeIncest === 1) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.sexualQuirk === "perverted" || eventSlave.energy > 80) {
							if (eventSlave.belly < 100000) {
								if (eventSlave.lactation > 0) {
									if (eventSlave.nipples !== "fuckable") {
										if (eventSlave.rules.release.family === 1) {
											if (State.variables.familyTesting === 0) {
												if (eventSlave.relation === "mother") {
													State.variables.RETSevent.push("incestuous nursing");
												}
											} else {
												if (eventSlave.daughters > 0) {
													State.variables.RETSevent.push("incestuous nursing");
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.intelligence + eventSlave.intelligenceImplant > 50) {
					if (eventSlave.devotion > 50) {
						if (eventSlave.intelligenceImplant >= 15) {
							if (eventSlave.accent < 4) {
								State.variables.RESSevent.push("devoted educated slave");
							}
						}
					}
				}

				if (eventSlave.skill.entertainment >= 60 || ["a ballerina", "a camgirl", "a camwhore", "a cheerleader", "a classical dancer", "a dancer", "a house DJ", "a party girl", "an aspiring pop star", "an exotic dancer", "an idol"].includes(eventSlave.career)) {
					if (canHear(eventSlave)) {
						if (eventSlave.health.condition > 40) {
							if (eventSlave.devotion > 50) {
								if (eventSlave.trust > 50) {
									State.variables.RESSevent.push("happy dance");
								}
							}
						}
					}
				}

				if (State.variables.RERepressedAnalVirginSubIDs.length > 0) {
					if (eventSlave.anus === 0) {
						if (eventSlave.devotion >= -50) {
							if (eventSlave.trust >= -50) {
								if (eventSlave.sexualFlaw === "repressed") {
									State.variables.RETSevent.push("repressed anal virgin");
								}
							}
						}
					}
				}

				if (State.variables.assistant > 0) {
					if (State.variables.assistant.appearance !== "normal") {
						if (eventSlave.devotion >= -20) {
							if (canSee(eventSlave)) {
								if (eventSlave.devotion <= 50) {
									if (eventSlave.assignment === "be a servant") {
										if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
											State.variables.RESSevent.push("PA servant");
										}
									}
								} else if (eventSlave.trust > 75) {
									if (eventSlave.energy > 60) {
										if ((canDoAnal(eventSlave) && eventSlave.anus > 0) || (canDoVaginal(eventSlave) && eventSlave.vagina > 0)) {
											State.variables.RESSevent.push("PA flirting");
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.clothes === "a succubus outfit") {
					if (eventSlave.devotion > 20) {
						if (eventSlave.trust > 20) {
							State.variables.RESSevent.push("sexy succubus");
						}
					}
				}

				if (State.variables.HeadGirl !== 0) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.anus !== 0 && canDoAnal(eventSlave)) {
							if (State.variables.HGSeverity >= 0) {
								State.variables.events.push("RE anal punishment");
							}
							State.variables.events.push("RE shower punishment");
						}
					}
					if (eventSlave.ID === State.variables.HeadGirl.ID) {
						if (eventSlave.trust > 50) {
							State.variables.RESSevent.push("trusting HG");
						}
					}
					if (eventSlave.ID !== State.variables.HeadGirl.ID) {
						if (canSee(eventSlave) && canWalk(eventSlave)) {
							if (eventSlave.rules.speech !== "restrictive") {
								if (eventSlave.trust > 75) {
									if (eventSlave.devotion > 50) {
										if (eventSlave.skill.oral > 30) {
											if (eventSlave.intelligence + eventSlave.intelligenceImplant >= State.variables.HeadGirl.intelligence + State.variables.HeadGirl.intelligenceImplant) {
												if (eventSlave.skill.oral > State.variables.HeadGirl.skill.oral) {
													State.variables.events.push("RE HG replacement");
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.rules.living === "spare") {
					if (eventSlave.devotion <= 20) {
						if (eventSlave.devotion > -10) {
							State.variables.RESSevent.push("sleeping ambivalent");
						}
						if (eventSlave.trust < -20) {
							State.variables.RESSevent.push("bad dream");
						}
					}
				}

				if (eventSlave.devotion <= 50) {
					if (eventSlave.devotion >= -20) {
						if (eventSlave.weekAcquired > 0) {
							if (State.variables.week - eventSlave.weekAcquired < 10) {
								if (eventSlave.energy > 20) {
									if (eventSlave.anus !== 0) {
										if (eventSlave.vagina !== 0) {
											State.variables.RESSevent.push("ignorant horny");
										}
									}
								}
							}
						}
					}
				}

				if (State.variables.RETasteTestSubIDs.length > 1) {
					if (eventSlave.rules.living === "luxurious") {
						if (eventSlave.devotion > 20) {
							if (eventSlave.energy > 80) {
								if (canTaste(eventSlave)) {
									State.variables.RETSevent.push("taste test");
								}
							}
						}
					}
				}

				if (State.variables.modRequestsAllowed > 0) {
					if (eventSlave.trust > 50) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.dick !== 0 || eventSlave.vagina !== -1) {
								if (eventSlave.nipples !== "fuckable") {
									if (eventSlave.rules.speech === "permissive") {
										if (eventSlave.corsetPiercing === 0) {
											if (eventSlave.tonguePiercing === 0) {
												if (eventSlave.anusPiercing === 0) {
													if (eventSlave.nipplesPiercing === 0) {
														if (eventSlave.dickPiercing === 0) {
															if (eventSlave.vaginaPiercing === 0) {
																if (eventSlave.lipsTat === 0 || eventSlave.lipsTat === "none") {
																	if (eventSlave.vaginaTat === 0 || eventSlave.vaginaTat === "none") {
																		State.variables.RESSevent.push("mods please");
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.muscles > 5) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.diet !== "slimming") {
							State.variables.RESSevent.push("sore shoulders");
						}
					}
				}

				if (eventSlave.relationship > 3) {
					let relationshipSlave = State.variables.slaves.find(s => s.ID === eventSlave.relationshipTarget);
					if (relationshipSlave.devotion > 20) {
						if (canWalk(relationshipSlave)) {
							if (canTalk(relationshipSlave)) {
								if (eventSlave.devotion > 50) {
									if (eventSlave.trust > 50) {
										if (eventSlave.rules.speech !== "restrictive") {
											State.variables.RETSevent.push("date please");
										}
										if (relationshipSlave.anus !== 0) {
											if (relationshipSlave.dick !== 1) {
												if (relationshipSlave.dick === 0 || canAchieveErection(relationshipSlave)) {
													if (relationshipSlave.fetish === "dom" || relationshipSlave.fetish === "sadist") {
														State.variables.RETSevent.push("top exhaustion");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (State.variables.REAnalCowgirlSubIDs.length > 1 || (State.variables.REAnalCowgirlSubIDs.length === 1 && eventSlave.ID !== State.variables.REAnalCowgirlSubIDs[0])) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.rules.release.slaves === 1) {
							if (eventSlave.fetish === "buttslut" || eventSlave.fetish === "sadist" || eventSlave.fetish === "dom") {
								if ((eventSlave.chastityPenis !== 1) || (eventSlave.dick === 0)) {
									State.variables.RETSevent.push("anal cowgirl");
								}
							}
						}
					}
				}

				if (State.variables.REBoobCollisionSubIDs.length > 1) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.trust > 20) {
							if (eventSlave.boobs > 3000) {
								if (eventSlave.attrXX >= 50 || (eventSlave.fetish === "boobs" && eventSlave.fetishStrength > 95)) {
									State.variables.RETSevent.push("boob collision");
								}
							}
						}
					}
				}

				if (State.variables.weatherToday.severity <= 1) {
					if (eventSlave.trust > 50) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.anus !== 0 && canDoAnal(eventSlave)) {
								if (eventSlave.vagina !== 0) {
									State.variables.RESSevent.push("confident tanning");
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 50) {
					if (eventSlave.trust > 50) {
						let giver = 0;
						if (State.variables.HeadGirl === 0) {
							giver = 1;
						} else if (State.variables.HeadGirl.ID !== eventSlave.ID) {
							giver = 1;
						}
						if (giver === 1) {
							State.variables.RESSevent.push("a gift");
						}
					}
				}

				if (eventSlave.relationship >= 2) {
					if (eventSlave.relationship < 5) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.trust >= -20) {
								State.variables.events.push("RE relationship advice");
							}
						}
					}
				}

				if (eventSlave.devotion > 50) {
					if (eventSlave.anus > 0) {
						if (eventSlave.vagina !== 0) {
							if (eventSlave.trust > 20) {
								State.variables.RESSevent.push("devoted exhibition");
								State.variables.RESSevent.push("devoted lotion");
							}
							if (eventSlave.energy > 95 && canDoAnal(eventSlave)) {
								State.variables.RESSevent.push("devoted nympho");
							}
							if (eventSlave.rules.release.masturbation === 1) {
								if (hasBothArms(eventSlave)) {
									if ((eventSlave.chastityPenis !== 1) || (eventSlave.dick === 0)) {
										State.variables.RESSevent.push("permitted masturbation");
									}
								}
							}
						}
					}
				}

				if (eventSlave.trust < -50) {
					if (eventSlave.devotion <= 20) {
						State.variables.RESSevent.push("terrified inspection");
					}
				}

				if (eventSlave.dick > 0) {
					if (eventSlave.anus > 0) {
						if (eventSlave.devotion >= 10) {
							if (State.variables.REFeminizationCheckinIDs.includes(eventSlave.ID)) {
								State.variables.RECIevent.push("feminization");
							}
							if (eventSlave.trust >= 10) {
								if (canAchieveErection(eventSlave)) {
									if (State.variables.REFutaSisterCheckinIDs.includes(eventSlave.ID)) {
										State.variables.RECIevent.push("futa");
									}
								}
							}
						}
					}
				}

				if (eventSlave.skill.anal > 30) {
					if (eventSlave.devotion >= 10) {
						if (State.variables.REMILFCheckinIDs.includes(eventSlave.ID)) {
							State.variables.RECIevent.push("MILF");
						}
					}
				}

				if (eventSlave.attrXY > 50) {
					if (eventSlave.anus !== 0) {
						if (eventSlave.vagina !== 0) {
							if (eventSlave.devotion >= 10) {
								if (State.variables.REOrientationCheckinIDs.includes(eventSlave.ID)) {
									State.variables.RECIevent.push("orientation");
								}
							}
						}
					}
				}

				if (eventSlave.face >= -10) {
					if (eventSlave.devotion >= 10) {
						if (["serve the public", "whore"].includes(eventSlave.assignment)) {
							if (State.variables.REUglyCheckinIDs.includes(eventSlave.ID)) {
								State.variables.RECIevent.push("ugly");
							}
						}
					}
				}

				if (eventSlave.anus > 1) {
					if (eventSlave.anus < 4) {
						if (eventSlave.analArea > 1) {
							if (eventSlave.devotion > 50) {
								if (eventSlave.trust > 50) {
									if (State.variables.REButtholeCheckinIDs.includes(eventSlave.ID)) {
										State.variables.RECIevent.push("butthole");
									}
								}
							}
						}
					}
				}

				/*
				if(eventSlave.drugs === "breast injections") {
					if(eventSlave.anus > 0 || eventSlave.vagina > 0) {
						if(eventSlave.devotion <= 50) {
							if(eventSlave.devotion >= -20) {
								if(eventSlave.trust >= -50) {
									if(State.variables.REReductionCheckinIDs.includes(eventSlave.ID)) {
										State.variables.RECIevent.push("reduction");
									}
								}
							}
						}
					}
				}
				*/

				if (eventSlave.assignment === "be a servant") {
					if (eventSlave.devotion <= 95) {
						if (eventSlave.intelligence + eventSlave.intelligenceImplant < -50) {
							State.variables.RESSevent.push("cooler lockin");
						}
					}
				}

				if (State.variables.universalRulesConsent === 0) {
					if (eventSlave.devotion > 50) {
						if (eventSlave.fetish === "sadist" || eventSlave.fetish === "dom" || eventSlave.energy > 95) {
							if (State.variables.REShowerForceSubIDs.length > 0) {
								if (eventSlave.trust <= 75) {
									State.variables.RETSevent.push("shower force");
								}
							}
							if (eventSlave.anus > 0) {
								if (State.variables.RESadisticDescriptionSubIDs.length > 0) {
									State.variables.RETSevent.push("sadistic description");
								}
							}
							if (State.variables.cockFeeder > 0) {
								if (canPenetrate(eventSlave) || eventSlave.dick === 0) {
									State.variables.RESSevent.push("kitchen molestation");
								}
							}
						}
						if (State.variables.REIfYouEnjoyItSubIDs.length > 0) {
							State.variables.RETSevent.push("if you enjoy it");
						}
						if (State.variables.RESimpleAssaultIDs.length > 0) {
							if (canPenetrate(eventSlave)) {
								State.variables.RETSevent.push("simple assault");
							}
						}
					}
				}

				if (eventSlave.devotion < -50) {
					if (eventSlave.trust >= -20) {
						if (eventSlave.rules.speech === "restrictive") {
							State.variables.RESSevent.push("vocal disobedience");
						}
					}
				}

				if (State.variables.boobAccessibility !== 1 && State.variables.ballsAccessibility !== 1 && State.variables.pregAccessibility !== 1) {
					if (eventSlave.boobs > 10000) {
						if (eventSlave.devotion >= -20) {
							if (State.variables.slaves.length > 2) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									State.variables.RESSevent.push("huge tits");
								}
							}
						}
					}
				}

				if (eventSlave.physicalAge > 30) {
					if (eventSlave.ageImplant > 0) {
						if (eventSlave.devotion > 20) {
							State.variables.RESSevent.push("age implant");
						}
					}
				}

				if (State.variables.seeAge !== 0) {
					if (eventSlave.devotion > 50) {
						if (eventSlave.rules.speech !== "restrictive") {
							if (eventSlave.birthWeek >= 51) {
								/* let's give this a much higher chance of appearing */
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
							}
						}
					}
				}

				if (eventSlave.clothes === "a penitent nuns habit") {
					if (eventSlave.anus > 0) {
						if (eventSlave.devotion >= -20) {
							if (eventSlave.devotion <= 50) {
								State.variables.RESSevent.push("penitent");
							}
						}
					}
				}

				if (eventSlave.slaveName !== eventSlave.birthName && eventSlave.birthName !== "") {
					if (eventSlave.devotion <= 20) {
						if (eventSlave.trust >= -20) {
							if (eventSlave.anus > 0 && canDoAnal(eventSlave)) {
								State.variables.RESSevent.push("not my name");
							}
						}
					}
				}

				if (State.variables.slaves.length > 2) {
					if (eventSlave.devotion >= -20) {
						if (eventSlave.heels === 1) {
							if (eventSlave.shoes === "heels" || eventSlave.shoes === "boots" || eventSlave.shoes === "extreme heels") {
								State.variables.RESSevent.push("tendon fall");
							}
						}
					}
				}

				if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.vagina < 0) {
							if (canDoAnal(eventSlave)) {
								if (eventSlave.anus > 0) {
									if (eventSlave.skill.anal <= 30) {
										State.variables.RESSevent.push("obedient shemale");
									}
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 50) {
					if (eventSlave.trust > 20) {
						if (eventSlave.physicalAge > 37) {
							if (eventSlave.anus > 0) {
								if (eventSlave.vagina > 0) {
									State.variables.RESSevent.push("devoted old");
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > 20) {
						if (eventSlave.actualAge > 35) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								if (State.variables.PC.actualAge < 25) {
									State.variables.RESSevent.push("young PC age difference");
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > 20) {
						if (eventSlave.actualAge < 22) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								if (State.variables.PC.actualAge >= 50) {
									State.variables.RESSevent.push("old PC age difference");
								}
							}
						}
					}
				}

				if (eventSlave.fetish === "humiliation" || eventSlave.energy > 95) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.devotion >= -20) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								if (eventSlave.vagina !== 0) {
									if (eventSlave.anus !== 0) {
										if (eventSlave.fetishKnown === 1) {
											State.variables.RESSevent.push("fearful humiliation");
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.rules.living === "luxurious") {
					if (eventSlave.devotion <= 75) {
						if (eventSlave.devotion > 50) {
							State.variables.RESSevent.push("newly devoted sunrise");
						}
					}
				}

				if (State.variables.PC.dick > 0) {
					if (State.variables.PC.belly < 5000) {
						if (eventSlave.assignment === "be a servant") {
							if (eventSlave.attrXY <= 35 || eventSlave.behavioralFlaw === "hates men" || eventSlave.sexualFlaw === "repressed") {
								if (eventSlave.devotion >= -20) {
									if (eventSlave.trust > 20) {
										State.variables.RESSevent.push("frightening dick");
									}
								}
							}
						}
					}
				}

				if (State.variables.spa > 0) {
					if (eventSlave.boobs > 2000) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.trust > 20) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									State.variables.RESSevent.push("spa boobs");
								}
							}
						}
					}
				}

				if (eventSlave.lactation > 0) {
					if (eventSlave.boobs > 800) {
						if (eventSlave.nipples !== "fuckable") {
							if (eventSlave.devotion > 20) {
								if (eventSlave.trust > 20) {
									State.variables.RESSevent.push("cow milking");
								}
							}
						}
					}
				}

				if (eventSlave.dietCum > 0) {
					if (eventSlave.devotion <= 20) {
						if ((eventSlave.fetish !== "cumslut" && eventSlave.fetish !== "masochist" && eventSlave.fetishStrength < 60) || eventSlave.fetishKnown === 0) {
							State.variables.RESSevent.push("retching cum feeding");
						}
					}
				}

				if (State.variables.arcologies[0].FSSubjugationist !== "unset") {
					if (eventSlave.race !== State.variables.arcologies[0].FSSubjugationistRace) {
						if (State.variables.week - eventSlave.weekAcquired > 1) {
							if (State.variables.week - eventSlave.weekAcquired < 10) {
								if (eventSlave.devotion < -20) {
									if (eventSlave.trust >= -20) {
										if (eventSlave.health.condition > -20) {
											if (eventSlave.race === eventSlave.origRace) {
												if (eventSlave.indentureRestrictions < 1) {
													State.variables.RESSevent.push("subjugation blues");
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (canTalk(eventSlave)) {
					if (eventSlave.dietCum > 0) {
						if (eventSlave.diet === "fattening") {
							if (eventSlave.trust >= -50) {
								if (eventSlave.fetish !== "cumslut") {
									if (eventSlave.weight < -30) {
										if (eventSlave.health.condition > -80) {
											if (eventSlave.behavioralFlaw !== "anorexic") {
												if (eventSlave.sexualFlaw !== "self hating") {
													if (eventSlave.fetishStrength <= 60 || eventSlave.fetishKnown !== 1) {
														State.variables.RESSevent.push("too thin for cum diet");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.drugs === "intensive breast injections" || eventSlave.drugs === "hyper breast injections") {
					if (eventSlave.boobs <= 8000) {
						if (eventSlave.boobs > 2000) {
							if (eventSlave.devotion <= 50) {
								if (eventSlave.devotion >= -50) {
									if (eventSlave.trust >= -50) {
										if (eventSlave.fetish !== "boobs") {
											if (eventSlave.intelligence + eventSlave.intelligenceImplant >= -50) {
												State.variables.RESSevent.push("breast expansion blues");
											}
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.physicalAge > 35) {
					if (eventSlave.rules.speech !== "restrictive") {
						if (["serve the public", "whore"].includes(eventSlave.assignment)) {
							if (eventSlave.devotion >= -20) {
								if (eventSlave.devotion <= 95) {
									State.variables.RESSevent.push("ara ara");
								}
							}
						}
					}
				}

				if (eventSlave.anus > 3) {
					if (eventSlave.devotion > 50) {
						if (eventSlave.trust > 50) {
							State.variables.RESSevent.push("gaped asshole");
						}
					}
				}

				if (eventSlave.health.condition > 90) {
					if (eventSlave.muscles > 5) {
						if (eventSlave.weight <= 30) {
							if (eventSlave.weight >= -30) {
								if (eventSlave.trust > 50) {
									if (eventSlave.devotion > 50) {
										State.variables.RESSevent.push("passing declaration");
									}
								}
							}
						}
					}
				}

				if (eventSlave.trust < -50) {
					if (eventSlave.devotion <= 50) {
						State.variables.RESSevent.push("im scared");
					}
				}

				if (eventSlave.fetish === "sadist") {
					if (eventSlave.fetishStrength > 20) {
						if (State.variables.ArcadeiIDs.length > 0) {
							if (eventSlave.trust >= -20) {
								if (eventSlave.devotion > 50) {
									if (eventSlave.belly < 300000) {
										State.variables.RESSevent.push("arcade sadist");
									}
								}
							}
						}
					}
				}

				if (eventSlave.dick === 0) {
					if (eventSlave.vagina === -1) {
						if (canDoAnal(eventSlave)) {
							if (eventSlave.energy > 20) {
								if (eventSlave.devotion >= -50) {
									if (eventSlave.fetish !== "buttslut" || eventSlave.fetishStrength <= 20) {
										if (eventSlave.nipples !== "fuckable") {
											State.variables.RESSevent.push("desperate null");
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 20) {
					if (eventSlave.boobs > 2000) {
						State.variables.RESSevent.push("back stretch");
					}
				}

				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > 20) {
						if (eventSlave.rules.speech !== "restrictive") {
							if (eventSlave.choosesOwnClothes !== 1) {
								if (setup.modestClothes.includes(eventSlave.clothes)) {
									State.variables.RESSevent.push("modest clothes");
								}
							}
						}
					}
				}

				if (State.variables.PC.vagina > -1) {
					if (eventSlave.devotion <= 20) {
						if ((eventSlave.trust >= -20 && eventSlave.behavioralFlaw === "arrogant") || (eventSlave.trust > 20)) {
							if (eventSlave.muscles > 30) {
								if (eventSlave.health.condition > 20) {
									if (eventSlave.energy > 50) {
										if (canPenetrate(eventSlave)) {
											if (State.variables.Bodyguard === 0) {
												State.variables.RESSevent.push("mutinery attempt");
											}
										}
									}
								}
							}
						}
					}
				}
			} /* closes mute exempt */

			if (eventSlave.devotion > 20) {
				if (["ball gag", "bit gag", "dildo gag", "massive dildo gag"].includes(eventSlave.collar)) {
					State.variables.RESSevent.push("gagged slave");
				}
			}

			if (eventSlave.devotion > 20) {
				if (eventSlave.butt > 5) {
					if (["a bimbo outfit", "a biyelgee costume", "a bunny outfit", "a burkini", "a cheerleader outfit", "a comfortable bodysuit", "a dirndl", "a fallen nuns habit", "a huipil", "a latex catsuit", "a leotard", "a long qipao", "a maternity dress", "a military uniform", "a monokini", "a mounty outfit", "a nice nurse outfit", "a red army uniform", "a scalemail bikini", "a schoolgirl outfit", "a schutzstaffel uniform", "a slutty nurse outfit", "a slutty outfit", "a slutty qipao", "a slutty schutzstaffel uniform", "a succubus outfit", "attractive lingerie for a pregnant woman", "attractive lingerie", "battlearmor", "chains", "clubslut netting", "conservative clothing", "cutoffs and a t-shirt", "kitty lingerie", "lederhosen", "nice business attire", "overalls", "restrictive latex", "striped panties", "slutty business attire", "slutty jewelry", "spats and a tank top", "stretch pants and a crop-top", "uncomfortable straps", "Western clothing"].includes(eventSlave.clothes)) {
						State.variables.RESSevent.push("ass fitting");
					}
				}
			}

			if (eventSlave.trust > 20) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.energy > 40) {
						if (eventSlave.belly < 300000) {
							if (State.variables.PC.belly < 5000 && State.variables.PC.balls < 10) {
								if (canSee(eventSlave)) {
									State.variables.RESSevent.push("comfortable seat");
								}
							}
						}
					}
				}
			}

			if (eventSlave.vaginaLube > 1) {
				if (eventSlave.devotion > 20) {
					if (canDoVaginal(State.variables.activeSlave)) {
						State.variables.RESSevent.push("moist pussy");
					}
				}
			}

			if (eventSlave.devotion <= 20) {
				if (eventSlave.trust <= -20) {
					if (eventSlave.genes === "XY") {
						if (eventSlave.dick > 0) {
							if (eventSlave.chastityPenis !== 1) {
								if (eventSlave.vagina === -1) {
									if (eventSlave.attrXY < 50) {
										State.variables.RESSevent.push("transition anxiety");
									}
								}
							}
						}
					}
				}
			}

			if (State.variables.seeAge === 1) {
				if (eventSlave.actualAge < 18) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.ovaries === 1) {
							if (eventSlave.pubertyXX === 0) {
								if (eventSlave.preg === 0) {
									if (eventSlave.physicalAge + eventSlave.birthWeek / 52 >= eventSlave.pubertyAgeXX - 0.5) {
										State.variables.RESSevent.push(...Array.from({length: 10}, () => "first period"));
									}
								}
							}
						}
						if (canPenetrate(eventSlave)) {
							if (eventSlave.balls > 0) {
								if (eventSlave.pubertyXY === 0) {
									if (eventSlave.physicalAge + eventSlave.birthWeek / 52 >= eventSlave.pubertyAgeXY - 0.5) {
										State.variables.RESSevent.push(...Array.from({length: 10}, () => "wet dreams"));
									}
								}
							}
						}
					}
				}
			} /* closes aging exemption */


			if (eventSlave.devotion >= -150) {
				if (eventSlave.devotion <= 50) {
					State.variables.events.push("RE standard punishment");
				}
			}

			if (eventSlave.boobs > 600) {
				if (eventSlave.boobShape === "torpedo-shaped") {
					if (eventSlave.devotion >= -50) {
						State.variables.RESSevent.push("torpedo squeeze");
					}
				}
			}

			if (eventSlave.assignment === "serve the public") {
				if (eventSlave.fetishKnown === 1) {
					if (State.variables.arcologies[0].FSDegradationist === "unset") {
						if (State.variables.arcologyUpgrade.drones === 1) {
							State.variables.RESSevent.push("mean girls");
						}
					}
				}
			}

			if (eventSlave.balls > 0) {
				if (eventSlave.hormoneBalance >= 100) {
					if (State.variables.hormoneUpgradeMood === 0) {
						if (eventSlave.trust >= -50) {
							if (eventSlave.devotion >= -20) {
								if (eventSlave.devotion <= 50) {
									State.variables.RESSevent.push("orchiectomy please");
								}
							}
						}
					}
				}
			}

			if (eventSlave.trust > 20) {
				if (eventSlave.devotion > 50) {
					if (State.variables.PC.belly < 5000) {
						State.variables.RESSevent.push("shower slip");
					}
					if (getLimbCount(eventSlave, 102) === 4) {
						State.variables.RESSevent.push("plimb help");
					}
				}
			}

			if (eventSlave.devotion <= 20) {
				if (eventSlave.devotion >= -50) {
					if (eventSlave.trust >= -20) {
						if (State.variables.suppository !== 0) {
							if (eventSlave.fetish !== "buttslut") {
								State.variables.RESSevent.push("suppository resistance");
							}
						}
						if (State.variables.cockFeeder !== 0) {
							if (eventSlave.fetish !== "cumslut") {
								State.variables.RESSevent.push("cockfeeder resistance");
							}
						}
					}
				}
			}

			if (eventSlave.relationship <= -2) {
				if (eventSlave.trust > 50) {
					if (eventSlave.devotion > 50) {
						State.variables.RESSevent.push("bonded love");
					}
				}
			}

			if (eventSlave.trust > 20) {
				if (eventSlave.devotion > 50) {
					State.variables.RESSevent.push("objectifying visit");
				}
			}

			if (canWalk(eventSlave)) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > -10) {
						if (eventSlave.ID !== State.variables.HeadGirl.ID) {
							if (eventSlave.ID !== State.variables.Concubine.ID) {
								State.variables.RESSevent.push("refreshment delivery");
							}
						}
					}
				}
			}

			if (eventSlave.dick > 8) {
				if (eventSlave.balls > 0) {
					if (eventSlave.energy > 60) {
						if (eventSlave.devotion > 50) {
							if (eventSlave.trust > 50) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									if (eventSlave.belly < 100000) {
										State.variables.RESSevent.push("dick wringing");
									}
								}
							}
						}
					}
				}
			}

			if (eventSlave.balls > 0) {
				if (eventSlave.scrotum > 0) {
					if (eventSlave.chastityPenis === 1) {
						if (eventSlave.devotion <= 95) {
							if (eventSlave.energy > 50) {
								if (eventSlave.energy < 95) {
									if (eventSlave.devotion >= -20 || eventSlave.trust < -20) {
										State.variables.RESSevent.push("cage relief");
									}
								}
							}
						}
					}
				}
			}

			if (State.variables.PC.dick > 0) {
				if (State.variables.PC.boobs >= 300) {
					if (canSee(eventSlave)) {
						if (eventSlave.devotion <= 50) {
							if (eventSlave.devotion >= -20) {
								if (((eventSlave.attrXY <= 35) && (eventSlave.attrXX > 65)) || ((eventSlave.attrXX <= 35) && (eventSlave.attrXY > 65))) {
									State.variables.RESSevent.push("dickgirl PC");
								}
							}
						}
					}
				}
			}

			if (eventSlave.voice > 0) {
				if (eventSlave.lips <= 95) {
					if (!["ball gag", "bit gag", "dildo gag", "massive dildo gag"].includes(eventSlave.collar)) {
						if (eventSlave.accent === 3) {
							if (eventSlave.devotion <= 50) {
								if (eventSlave.trust > -10) {
									if (eventSlave.devotion >= -20 || eventSlave.trust < -20) {
										State.variables.RESSevent.push("language lesson");
									}
								}
							}
						}
					}
				}
			}

			if (eventSlave.energy > 40) {
				if (canSee(eventSlave)) {
					if (eventSlave.trust >= -50) {
						if (eventSlave.devotion > 0) {
							if (eventSlave.devotion <= 50) {
								if (((eventSlave.attrXX >= 50) && (State.variables.PC.boobs >= 300 || State.variables.PC.title === 0) && (State.variables.PC.belly < 5000)) ||
									((eventSlave.attrXY >= 50) && (State.variables.PC.dick > 0) && (State.variables.PC.boobs < 300) && (State.variables.PC.belly < 1500)) ||
									(eventSlave.fetish === "pregnancy" && State.variables.PC.belly >= 5000) ||
									(eventSlave.fetish === "boobs" && State.variables.PC.belly < 5000 && State.variables.PC.boobs >= 1000)) {
									State.variables.RESSevent.push("hot PC");
								}
							}
						}
					}
				}
			}

			if (eventSlave.trust <= 20) {
				if (eventSlave.trust >= -75) {
					if (eventSlave.devotion <= 30) {
						if (eventSlave.devotion >= -20) {
							State.variables.RESSevent.push("like me");
						}
					}
				}
			}

			if (eventSlave.boobs >= 2000) {
				if (eventSlave.boobsImplant === 0) {
					if (eventSlave.nipples !== "tiny" && eventSlave.nipples !== "fuckable") {
						if (eventSlave.devotion > 20) {
							State.variables.RESSevent.push("huge naturals");
						}
					}
				}
			}

			if (eventSlave.boobs > 800) {
				if (Math.floor(eventSlave.boobsImplant / eventSlave.boobs) >= 0.60) {
					if (eventSlave.devotion > 20) {
						State.variables.RESSevent.push("implant inspection");
					}
				}
			}

			if (eventSlave.devotion < -20) {
				if (eventSlave.trust >= -20) {
					if (eventSlave.clothes === "uncomfortable straps") {
						State.variables.RESSevent.push("bondage gear");
					}
				}
			}

			if (eventSlave.labia > 1 && eventSlave.vagina >= 0) {
				if (eventSlave.muscles > 5 || eventSlave.diet === "muscle building") {
					if (eventSlave.belly < 10000) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.trust > 20) {
								State.variables.RESSevent.push("inconvenient labia");
							}
						}
					}
				}
			}

			if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
				if (eventSlave.addict > 20) {
					if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
						State.variables.RESSevent.push("obedient addict");
					}
				}
			}

			if (eventSlave.devotion < -50) {
				if (eventSlave.trust >= -50) {
					if (eventSlave.assignment !== "stay confined") {
						if (eventSlave.heels !== 1) {
							State.variables.RESSevent.push("escapee");
						}
					}
				}
			}

			if (eventSlave.devotion <= 50) {
				if (eventSlave.trust >= -50) {
					if (eventSlave.behavioralFlaw === "gluttonous") {
						if (eventSlave.diet === "restricted") {
							State.variables.RESSevent.push("diet");
						}
					}
				}
			}

			if (eventSlave.devotion <= 20) {
				if (eventSlave.devotion >= -50) {
					State.variables.RESSevent.push("resistant shower");
				}
			}

			if (eventSlave.rules.speech !== "restrictive") {
				if (eventSlave.devotion >= -20) {
					if (eventSlave.trust >= -20) {
						if (eventSlave.energy > 75) {
							if (eventSlave.fetish !== "buttslut") {
								if (eventSlave.vagina !== 0 || eventSlave.anus !== 0) {
									State.variables.RESSevent.push("night visit");
								}
							}
						}
					}
				}
			}

			if (eventSlave.rules.release.masturbation === 0 && !App.Utils.hasNonassignmentSex(eventSlave)) {
				if (eventSlave.need) {
					if (eventSlave.devotion <= 95) {
						if (eventSlave.trust >= -20) {
							if ((eventSlave.chastityPenis !== 1) || (eventSlave.dick === 0)) {
								State.variables.RESSevent.push("forbidden masturbation");
							}
						}
					}
					if (eventSlave.devotion >= -20) {
						if (eventSlave.trust >= -50) {
							State.variables.RESSevent.push("desperately horny");
						}
					}
				}
			}

			if (App.Utils.hasFamilySex(eventSlave) || eventSlave.rules.release.slaves === 1) {
				if (canPenetrate(eventSlave)) {
					State.variables.RESSevent.push("slave dick on slave");
				}
			}

			if (eventSlave.muscles > 30) {
				if (eventSlave.weight <= 10) {
					if (eventSlave.anus !== 0 || State.variables.PC.dick === 0) {
						if (eventSlave.vagina !== -1 || State.variables.PC.dick === 0) {
							State.variables.RESSevent.push("muscles");
						}
					}
				}
			}

			if (eventSlave.devotion >= -20) {
				if (eventSlave.lactation > 1) {
					if (canDoVaginal(eventSlave) || canDoAnal(eventSlave)) {
						State.variables.RESSevent.push("milkgasm");
					}
				}
			}

			if (eventSlave.waist < -95) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.trust >= -20) {
						if (eventSlave.belly < 30000) {
							if (eventSlave.weight <= 95) {
								State.variables.RESSevent.push("devoted waist");
							}
						}
					}
				}
			}

			if (eventSlave.skill.entertainment >= 100) {
				if (eventSlave.trust > 50) {
					if (eventSlave.assignment === "serve the public") {
						State.variables.RESSevent.push("masterful entertainer");
					}
				}
			}

			if (eventSlave.skill.whoring >= 100) {
				if (eventSlave.trust > 50) {
					if (eventSlave.assignment === "whore") {
						State.variables.RESSevent.push("masterful whore");
					}
				}
			}

			if (eventSlave.dick > 0) {
				if (eventSlave.balls === 0) {
					if (eventSlave.genes === "XY") {
						if (eventSlave.devotion <= 50) {
							if (eventSlave.trust < -50) {
								if (eventSlave.anus > 0) {
									if (canDoAnal(eventSlave)) {
										State.variables.RESSevent.push("resistant gelding");
									}
								}
							}
						}
					}
				}
			}

			if (State.variables.seePreg !== 0) {
				if (isFertile(eventSlave)) {
					if (eventSlave.devotion > 50) {
						if (State.variables.PC.dick !== 0) {
							if (eventSlave.fetish === "pregnancy" || eventSlave.energy > 95) {
								if (eventSlave.eggType === "human") {
									if (eventSlave.fetishKnown === 1) {
										if (eventSlave.vagina !== 0) {
											if (eventSlave.anus > 0) {
												if (eventSlave.geneticQuirks.superfetation === 2 && (eventSlave.intelligence + eventSlave.intelligenceImplant > 15) && eventSlave.womb.length > 0) {
													if (eventSlave.belly < (eventSlave.pregAdaptation * 1750)) {
														State.variables.RESSevent.push("impregnation please");
													}
												} else {
													State.variables.RESSevent.push("impregnation please");
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}

			if (["huge plug", "large plug", "long, huge plug", "long, large plug"].includes(eventSlave.buttplug)) {
				if (eventSlave.assignment !== "stay confined" && isSlaveAvailable(eventSlave)) {
					if (eventSlave.devotion <= 20) {
						if (eventSlave.trust >= -50) {
							if (eventSlave.anus < 3) {
								State.variables.RESSevent.push("plug disobedience");
							}
						}
					}
				}
			}

			if (["serve the public", "whore"].includes(eventSlave.assignment)) {
				if (eventSlave.vagina !== 0) {
					if (eventSlave.anus !== 0) {
						if (canDoAnal(eventSlave)) {
							if (eventSlave.devotion <= 50) {
								State.variables.RESSevent.push("used whore");
							}
						}
					}
				}
			}

			if (eventSlave.assignment === "serve the public") {
				if (eventSlave.devotion >= -20) {
					if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
						State.variables.RESSevent.push("nice guys");
					}
				}
			}

			if (eventSlave.assignment === "please you") {
				if (eventSlave.devotion > 20) {
					State.variables.RESSevent.push("lazy evening");
				}
			}

			if (eventSlave.height < (Height.mean(eventSlave) * 0.95)) {
				if (eventSlave.physicalAge > 12) {
					if (canDoAnal(eventSlave)) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.trust <= 95) {
								State.variables.RESSevent.push("devoted shortstack");
							}
						}
					}
				}
			}
		} /* closes amp/crawling exempt */

		if (canTalk(eventSlave)) {
			if (eventSlave.rules.speech !== "restrictive") {
				if (eventSlave.boobsImplant > 400) {
					if (eventSlave.lipsImplant >= 30) {
						if (eventSlave.buttImplant > 3) {
							if (eventSlave.boobs < 9000 || eventSlave.butt < 8) {
								State.variables.RESSevent.push("surgery addict");
							}
						}
					}
				}
			}

			if (["be your Concubine", "please you", "serve in the master suite"].includes(eventSlave.assignment)) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.trust >= -20) {
						if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
							if ((eventSlave.chastityPenis !== 1) || (eventSlave.dick === 0)) {
								if (State.variables.corpIncorporated !== 0) {
									State.variables.RESSevent.push("shift sleep");
								}
								if (canWalk(eventSlave)) {
									if (eventSlave.rules.release.masturbation === 1) {
										State.variables.RESSevent.push("shift masturbation");
									}
								}
								if (eventSlave.skill.entertainment >= 60) {
									State.variables.RESSevent.push("shift doorframe");
								}
							}
							if (canDoVaginal(eventSlave)) {
								if (State.variables.PC.vagina > -1) {
									if (eventSlave.dick === 0) {
										if (State.variables.fuckSlaves > 2) {
											State.variables.RESSevent.push("fucktoy tribbing");
										}
									}
								}
							}
						}
					}
				}
			}

			if (eventSlave.rules.speech !== "restrictive") {
				if (eventSlave.counter.oral + eventSlave.counter.vaginal + eventSlave.counter.anal > 900) {
					if (eventSlave.counter.oral + eventSlave.counter.vaginal + eventSlave.counter.anal < 1100) {
						if (eventSlave.vagina !== 0) {
							if (eventSlave.anus > 0) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									State.variables.RESSevent.push("millenary");
								}
							}
						}
					}
				}
			}

			if (eventSlave.assignment === "stay confined") {
				if (eventSlave.devotion <= 50) {
					State.variables.RESSevent.push("solitary desperation");
				}
			}

			if (eventSlave.rules.speech === "restrictive") {
				if (eventSlave.devotion > 60) {
					if (eventSlave.trust >= -20) {
						State.variables.RESSevent.push("restricted profession");
					}
				}
			}

			if (eventSlave.rules.speech === "restrictive") {
				if (eventSlave.intelligence > 15) {
					if (eventSlave.trust >= -20) {
						if (eventSlave.devotion <= 20) {
							State.variables.RESSevent.push("restricted smart");
						}
					}
				}
			}

			if (State.variables.expansionRequestsAllowed > 0) {
				if (eventSlave.drugs === "no drugs") {
					if (eventSlave.rules.speech === "permissive") {
						if (eventSlave.health.condition > 20) {
							if (eventSlave.devotion >= -20) {
								if (eventSlave.trust > 20) {
									if (State.variables.arcologies[0].FSSlimnessEnthusiast === "unset") {
										State.variables.RESSevent.push("injections please");
									}
								}
							}
						}
					}
				}
			}

			if (eventSlave.assignment === "serve the public") {
				if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
					if (eventSlave.devotion > 50) {
						State.variables.RESSevent.push("serve the public devoted");
					}
				}
			}

			if (eventSlave.behavioralFlaw === "bitchy") {
				if (canSee(eventSlave)) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.trust >= -20) {
							State.variables.RESSevent.push("obedient bitchy");
						}
					}
				}
			}
		} /* closes mute exempt */

		if (State.variables.cockFeeder === 0) {
			if (eventSlave.intelligence + eventSlave.intelligenceImplant < -50) {
				if (eventSlave.devotion <= 50) {
					if (eventSlave.devotion >= -20 || eventSlave.trust < -20) {
						State.variables.RESSevent.push("obedient idiot");
					}
				}
			}
		}

		if (eventSlave.boobs > 25000) {
			if (eventSlave.belly < 100000) {
				State.variables.RESSevent.push("tittymonster inspection");
			}
		}

		if (State.variables.assistant > 1) {
			if (eventSlave.fetishKnown === 1) {
				if (eventSlave.energy > 95) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.rules.release.masturbation === 1) {
							State.variables.RESSevent.push("nympho with assistant");
						}
					}
				}
			}
		}

		if (eventSlave.devotion > 50) {
			if (eventSlave.trust > 50) {
				if (["be your Concubine", "please you", "serve in the master suite"].includes(eventSlave.assignment)) {
					State.variables.RESSevent.push("bed snuggle");
				}
			}
		}

		if (eventSlave.minorInjury === "sore ass") {
			if (eventSlave.devotion <= 50) {
				State.variables.RESSevent.push("sore ass");
			}
		}

		if (eventSlave.sexualFlaw === "hates oral") {
			if (State.variables.PC.dick !== 0) {
				if (eventSlave.devotion <= 50) {
					State.variables.RESSevent.push("hates oral");
				}
			}
		}

		if (eventSlave.vagina === 0) {
			if (eventSlave.devotion > 50) {
				if (eventSlave.trust > 20) {
					if (eventSlave.rules.speech !== "restrictive") {
						State.variables.RESSevent.push("devoted virgin");
					}
				}
			}
		}

		if (eventSlave.anus === 0) {
			if (eventSlave.devotion > 50) {
				if (eventSlave.trust > 20) {
					if (eventSlave.rules.speech !== "restrictive") {
						State.variables.RESSevent.push("devoted anal virgin");
					}
				}
			}
		}

		if (State.variables.seeExtreme === 1) {
			if (eventSlave.balls > 1) {
				if (eventSlave.scrotum > 0) {
					if (eventSlave.devotion <= 20) {
						if (eventSlave.trust <= 20) {
							if (eventSlave.rules.speech !== "restrictive") {
								State.variables.RESSevent.push("fearful balls");
							}
						}
					}
				}
			}
		}

		if (eventSlave.devotion <= 50) {
			if (eventSlave.assignment === "work as a servant" || eventSlave.assignment === "be a servant") {
				State.variables.RESSevent.push("scrubbing");
			}
		}

		if (eventSlave.devotion <= 20) {
			if (eventSlave.assignment === "work as a servant" || eventSlave.assignment === "be a servant") {
				if (eventSlave.clothes === "a slutty maid outfit" || eventSlave.clothes === "a nice maid outfit") {
					State.variables.RESSevent.push("servant maid");
				}
			}
		}

		if (eventSlave.rules.speech !== "restrictive") {
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.fetish !== "buttslut") {
					if (eventSlave.vagina === 0) {
						if (eventSlave.anus !== 0) {
							if (eventSlave.counter.oral + eventSlave.counter.vaginal + eventSlave.counter.anal > 100) {
								State.variables.RESSevent.push("unhappy virgin");
							}
						}
					}
				}
			}
		}

		if (eventSlave.aphrodisiacs > 1 || eventSlave.inflationType === "aphrodisiac") {
			if (eventSlave.rules.speech === "restrictive" && eventSlave.rules.release.master === 1 && App.Utils.releaseRestricted(eventSlave)) {
				State.variables.RESSevent.push("extreme aphrodisiacs");
			}
		}

		if (App.Utils.hasFamilySex(eventSlave) || eventSlave.rules.release.slaves === 1) {
			if (eventSlave.clit > 2) {
				State.variables.RESSevent.push("slave clit on slave");
			}
		}

		if (eventSlave.rules.release.masturbation === 1) {
			if (eventSlave.dick > 4) {
				if (hasAnyArms(eventSlave)) {
					if (canAchieveErection(eventSlave)) {
						if (eventSlave.belly < 10000) {
							if (eventSlave.chastityPenis !== 1) {
								State.variables.RESSevent.push("slave dick huge");
							}
						}
					}
				}
			}
		}

		if (eventSlave.heels === 1) {
			if (eventSlave.shoes === "heels" || eventSlave.shoes === "extreme heels") {
				if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
					State.variables.RESSevent.push("heels");
				}
			}
		}

		if (eventSlave.rules.release.masturbation === 1) {
			if (eventSlave.belly < 300000) {
				if (eventSlave.anus > 2) {
					if (eventSlave.fetish === "buttslut" || eventSlave.energy > 95) {
						if (eventSlave.fetish !== "none") {
							if (canHold(eventSlave)) {
								if (canDoAnal(eventSlave)) {
									State.variables.RESSevent.push("loose buttslut");
								}
							}
						}
					}
				}
			}
		}

		if (eventSlave.assignment === "whore") {
			if (canDoAnal(eventSlave) && (eventSlave.vagina < 0 || canDoVaginal(eventSlave))) {
				if (eventSlave.devotion < -20 && eventSlave.trust >= -20) {
					State.variables.RESSevent.push("whore rebellious");
				}
			}
		}

		if (isAmputee(eventSlave)) {
			if (eventSlave.devotion > 20) {
				if (eventSlave.anus > 0 && canDoAnal(eventSlave)) {
					State.variables.RESSevent.push("devoted amp");
				}
			}
			if (eventSlave.assignment === "rest") {
				State.variables.RESSevent.push("resting amp");
			}
		}

		if (eventSlave.boobs < 500) {
			if (eventSlave.butt < 3) {
				if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.devotion > 20 && eventSlave.trust >= -20) {
							if (eventSlave.weight <= 10) {
								if (eventSlave.muscles <= 30) {
									State.variables.RESSevent.push("obedient girlish");
								}
							}
						}
					}
				}
			}
		}

		if (eventSlave.boobs > 1200) {
			if (eventSlave.areolaeShape !== "circle") {
				if (eventSlave.devotion > 50) {
					State.variables.RESSevent.push("shaped areolae");
				}
			}
		}

		if (eventSlave.behavioralFlaw === "arrogant") {
			if (eventSlave.devotion < -50) {
				if (eventSlave.trust >= -50) {
					State.variables.RESSevent.push("rebellious arrogant");
				}
			}
		}

		if (State.variables.seePreg !== 0) {
			if (eventSlave.bellyPreg >= 10000) {
				State.variables.RESSevent.push("hugely pregnant");
			}
		}

		if (eventSlave.hormoneBalance >= 50) {
			if (eventSlave.vagina === -1) {
				if (eventSlave.balls >= 0) {
					if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
						if (eventSlave.devotion <= 50) {
							if (eventSlave.fetish !== "buttslut") {
								if (eventSlave.rules.speech === "permissive") {
									State.variables.RESSevent.push("hormone dysfunction");
								}
							}
						}
					}
				}
			}
		}

		if (eventSlave.vaginaPiercing > 1) {
			if (eventSlave.nipplesPiercing > 1) {
				if (eventSlave.clitPiercing > 1) {
					if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
						if (eventSlave.devotion <= 50) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								State.variables.RESSevent.push("heavy piercing");
							}
						}
					}
				}
			}
		}

		if (eventSlave.fetishKnown === 1) {
			if (eventSlave.fetish === "cumslut" || eventSlave.energy > 95) {
				if (["serve the public", "whore", "work a glory hole"].includes(eventSlave.assignment)) {
					if (eventSlave.devotion > 20) {
						if (State.variables.PC.dick !== 0) {
							State.variables.RESSevent.push("cumslut whore");
						}
					}
				}
			}
		}

		if (eventSlave.anus === 0) {
			if (eventSlave.devotion < -20) {
				if (eventSlave.trust >= -20) {
					State.variables.RESSevent.push("resistant anal virgin");
				}
			}
		}

		if (State.variables.PC.dick !== 0) {
			if (eventSlave.bellyPreg >= 300000) {
				State.variables.RESSevent.push("hyperpreg stuck");
			}
		}

		if (eventSlave.devotion >= 50) {
			if (eventSlave.trust <= 20) {
				if (canWalk(eventSlave)) {
					State.variables.RESSevent.push("devoted fearful slave");
				}
			}
		}

		if (eventSlave.prestige === 0) {
			if (eventSlave.devotion > 50) {
				if (eventSlave.trust > 50) {
					if (eventSlave.skill.entertainment >= 100) {
						if (eventSlave.assignment === "serve the public") {
							State.variables.events.push("RE legendary entertainer");
						}
					}

					if (eventSlave.skill.whoring >= 100) {
						if (eventSlave.assignment === "whore") {
							State.variables.events.push("RE legendary whore");
						}
					}

					if (eventSlave.lactation > 0) {
						if ((eventSlave.boobs - eventSlave.boobsImplant) > 6000) {
							if (eventSlave.assignment === "get milked") {
								State.variables.events.push("RE legendary cow");
							}
						}
					}

					if (eventSlave.bellyPreg >= 14000) {
						if (eventSlave.broodmother === 0) {
							if (eventSlave.counter.births > 10) {
								if (eventSlave.assignment === "whore" || eventSlave.assignment === "serve the public") {
									if (!isAmputee(eventSlave)) {
										State.variables.events.push("RE legendary womb");
									}
								}
							}
						}
					}

					if (eventSlave.balls > 6) {
						if (eventSlave.dick > 6) {
							if (eventSlave.assignment === "get milked") {
								State.variables.events.push("RE legendary balls");
							}
						}
					}

					if (eventSlave.origin === "You sentenced $him to enslavement as a punishment for attempted theft of a slave." || eventSlave.origin === "$He is an enslaved Daughter of Liberty." || eventSlave.origin === "You got $him at the Slave Shelter. $He is an enslaved Daughter of Liberty, caught some weeks after the failed coup. $His previous owner used $him as a punching bag and dart board, then when he was bored of $him tattooed obscenities all over $his body and threw $him away." || eventSlave.origin === "$He is an enslaved member of an anti-slavery extremist group." || eventSlave.career === "an antislavery activist") {
						if (eventSlave.devotion > 95 && eventSlave.assignment === "please you") {
							State.variables.events.push("RE former abolitionist");
						}
					}
				}
			}
		}

		if (eventSlave.relationship === 4) {
			if (eventSlave.devotion > 20) {
				if (eventSlave.trust > 20) {
					State.variables.events.push("RE slave marriage");
				}
			}
		}

		if (V.PSnatch === 0 && eventSlave.origin === "$He is your share of a raid on an illegal laboratory by your mercenaries." && eventSlave.newGamePlus === 0) {
			if (V.geneticMappingUpgrade === 2 && eventSlave.health.condition > 25 && eventSlave.devotion > 50 && V.cash > V.surgeryCost*4) {
				/* only one slave ever qualifies, so give it a bit more weight */
				V.events.push("RE snatch and grab followup");
				V.events.push("RE snatch and grab followup");
				V.events.push("RE snatch and grab followup");
			}
		}

		/* NICKNAME EVENTS */

		if (State.variables.nicknamesAllowed === 1) {
			let toSearch = eventSlave.slaveName.toLowerCase();
			if (!toSearch.includes("'")) {
				if (State.variables.week - eventSlave.weekAcquired >= 4) {
					State.variables.events.push("RE nickname");
					State.variables.seed = 0;
				}
			} /* closes nickname check */
		} /* closes no nicknames option */
	} /* closes mindbreak exempt */

	if (eventSlave.fetish === "mindbroken") {
		if (canWalk(eventSlave)) {
			State.variables.RESSevent.push("mindbroken morning");
		}
		if (eventSlave.kindness !== undefined && eventSlave.kindness >= 100) {
			if ((isSlaveAvailable(eventSlave) && canWalk(eventSlave)) || (["be your Concubine", "please you", "serve in the master suite"].includes(eventSlave.assignment))) {
				if (eventSlave.relationship === -3) {
					if (jsRandom(1, 200) < eventSlave.kindness || V.cheatMode) {
						State.variables.RESSevent.push("surprising wakeup");
					}
				}
			}
		}
		if (eventSlave.career === "a breeding bull" && canImpreg(V.PC, eventSlave) && eventSlave.assignment === "serve in the master suite" && canPenetrate(eventSlave) && eventSlave.dick >= 5 && hasAllLimbs(eventSlave) && V.PC.vagina > -1 && V.PC.preg === 0 && (eventSlave.muscles > 30 || eventSlave.weight > 30)) {
			State.variables.RESSevent.push("breeding bull");
			if (State.variables.PC.fertDrugs > 0) {
				State.variables.RESSevent.push("breeding bull");
				State.variables.RESSevent.push("breeding bull");
			}
			if (State.variables.PC.forcedFertDrugs > 0) {
				State.variables.RESSevent.push("breeding bull");
				State.variables.RESSevent.push("breeding bull");
			}
		}
	}
};

/* servants spend a lot of time in the penthouse, so should be eligible for a number (but not all) random events */
window.generateRandomEventPoolServant = function(eventSlave) {
	/* STANDARD EVENTS */

	if (eventSlave.fetish !== "mindbroken") {
		if (hasAnyArms(eventSlave) && hasAnyLegs(eventSlave)) {
			if (canTalk(eventSlave)) {
				if (State.variables.RECockmilkInterceptionIDs.length > 1 || (State.variables.RECockmilkInterceptionIDs.length === 1 && eventSlave.ID !== State.variables.RECockmilkInterceptionIDs[0])) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.dietCum > 0 || (eventSlave.fetishKnown && eventSlave.fetish === "cumslut")) {
							State.variables.RETSevent.push("cockmilk interception");
						}
					}
				}

				if (State.variables.REInterslaveBeggingIDs.length > 1 || (State.variables.REInterslaveBeggingIDs.length === 1 && eventSlave.ID !== State.variables.REInterslaveBeggingIDs[0])) {
					if (State.variables.universalRulesConsent === 1) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.energy > 40) {
								if (canPenetrate(eventSlave)) {
									if (canSee(eventSlave)) {
										if (eventSlave.rules.release.slaves === 1) {
											State.variables.RETSevent.push("interslave begging");
										}
									}
								}
							}
						}
					}
				}

				if (State.variables.seeIncest === 1) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.sexualQuirk === "perverted" || eventSlave.energy > 80) {
							if (eventSlave.belly < 100000) {
								if (eventSlave.lactation > 0) {
									if (eventSlave.nipples !== "fuckable") {
										if (eventSlave.rules.release.family === 1) {
											if (State.variables.familyTesting === 0) {
												if (eventSlave.relation === "mother") {
													State.variables.RETSevent.push("incestuous nursing");
												}
											} else {
												if (eventSlave.daughters > 0) {
													State.variables.RETSevent.push("incestuous nursing");
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (State.variables.assistant > 0) {
					if (State.variables.assistant.appearance !== "normal") {
						if (eventSlave.devotion >= -20) {
							if (canSee(eventSlave)) {
								if (eventSlave.devotion <= 50) {
									if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
										State.variables.RESSevent.push("PA servant");
									}
								}
							}
						}
					}
				}

				if (State.variables.HeadGirl !== 0) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.anus !== 0 && canDoAnal(eventSlave)) {
							if (State.variables.HGSeverity >= 0) {
								State.variables.events.push("RE anal punishment");
							}
							State.variables.events.push("RE shower punishment");
						}
					}
				}

				if (State.variables.RETasteTestSubIDs.length > 1) {
					if (eventSlave.rules.living === "luxurious") {
						if (eventSlave.devotion > 20) {
							if (eventSlave.energy > 80) {
								if (canTaste(eventSlave)) {
									State.variables.RETSevent.push("taste test");
								}
							}
						}
					}
				}

				if (eventSlave.relationship > 3) {
					let relationshipSlave = State.variables.slaves.find(s => s.ID === eventSlave.relationshipTarget);
					if (relationshipSlave.devotion > 20) {
						if (canWalk(relationshipSlave)) {
							if (canTalk(relationshipSlave)) {
								if (eventSlave.devotion > 50) {
									if (eventSlave.trust > 50) {
										if (relationshipSlave.anus !== 0) {
											if (relationshipSlave.dick !== 1) {
												if (relationshipSlave.dick === 0 || canAchieveErection(relationshipSlave)) {
													if (relationshipSlave.fetish === "dom" || relationshipSlave.fetish === "sadist") {
														State.variables.RETSevent.push("top exhaustion");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (State.variables.weatherToday.severity <= 1) {
					if (eventSlave.trust > 50) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.anus !== 0 && canDoAnal(eventSlave)) {
								if (eventSlave.vagina !== 0) {
									State.variables.RESSevent.push("confident tanning");
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 50) {
					if (eventSlave.trust > 50) {
						let giver = 0;
						if (State.variables.HeadGirl === 0) {
							giver = 1;
						} else if (State.variables.HeadGirl.ID !== eventSlave.ID) {
							giver = 1;
						}
						if (giver === 1) {
							State.variables.RESSevent.push("a gift");
						}
					}
				}

				if (eventSlave.devotion > 50) {
					if (eventSlave.anus > 0) {
						if (eventSlave.vagina !== 0) {
							if (eventSlave.trust > 20) {
								State.variables.RESSevent.push("devoted lotion");
							}
						}
					}
				}

				if (eventSlave.devotion <= 95) {
					if (eventSlave.intelligence + eventSlave.intelligenceImplant < -50) {
						State.variables.RESSevent.push("cooler lockin");
					}
				}

				if (State.variables.universalRulesConsent === 0) {
					if (eventSlave.devotion > 50) {
						if (eventSlave.fetish === "sadist" || eventSlave.fetish === "dom" || eventSlave.energy > 95) {
							if (State.variables.REShowerForceSubIDs.length > 0) {
								if (eventSlave.trust <= 75) {
									State.variables.RETSevent.push("shower force");
								}
							}
							if (eventSlave.anus > 0) {
								if (State.variables.RESadisticDescriptionSubIDs.length > 0) {
									State.variables.RETSevent.push("sadistic description");
								}
							}
							if (State.variables.cockFeeder > 0) {
								if (canPenetrate(eventSlave) || eventSlave.dick === 0) {
									State.variables.RESSevent.push("kitchen molestation");
								}
							}
						}
						if (State.variables.REIfYouEnjoyItSubIDs.length > 0) {
							State.variables.RETSevent.push("if you enjoy it");
						}
						if (State.variables.RESimpleAssaultIDs.length > 0) {
							if (canPenetrate(eventSlave)) {
								State.variables.RETSevent.push("simple assault");
							}
						}
					}
				}

				if (State.variables.boobAccessibility !== 1 && State.variables.ballsAccessibility !== 1 && State.variables.pregAccessibility !== 1) {
					if (eventSlave.boobs > 10000) {
						if (eventSlave.devotion >= -20) {
							if (State.variables.slaves.length > 2) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									State.variables.RESSevent.push("huge tits");
								}
							}
						}
					}
				}

				if (State.variables.seeAge !== 0) {
					if (eventSlave.devotion > 50) {
						if (eventSlave.rules.speech !== "restrictive") {
							if (eventSlave.birthWeek >= 51) {
								/* let's give this a much higher chance of appearing */
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
								State.variables.RESSevent.push("birthday");
							}
						}
					}
				}

				if (eventSlave.slaveName !== eventSlave.birthName && eventSlave.birthName !== "") {
					if (eventSlave.devotion <= 20) {
						if (eventSlave.trust >= -20) {
							if (eventSlave.anus > 0 && canDoAnal(eventSlave)) {
								State.variables.RESSevent.push("not my name");
							}
						}
					}
				}

				if (State.variables.slaves.length > 2) {
					if (eventSlave.devotion >= -20) {
						if (eventSlave.heels === 1) {
							if (eventSlave.shoes === "heels" || eventSlave.shoes === "boots" || eventSlave.shoes === "extreme heels") {
								State.variables.RESSevent.push("tendon fall");
							}
						}
					}
				}

				if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.vagina < 0) {
							if (canDoAnal(eventSlave)) {
								if (eventSlave.anus > 0) {
									if (eventSlave.skill.anal <= 30) {
										State.variables.RESSevent.push("obedient shemale");
									}
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 50) {
					if (eventSlave.trust > 20) {
						if (eventSlave.physicalAge > 37) {
							if (eventSlave.anus > 0) {
								if (eventSlave.vagina > 0) {
									State.variables.RESSevent.push("devoted old");
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > 20) {
						if (eventSlave.actualAge > 35) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								if (State.variables.PC.actualAge < 25) {
									State.variables.RESSevent.push("young PC age difference");
								}
							}
						}
					}
				}

				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > 20) {
						if (eventSlave.actualAge < 22) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								if (State.variables.PC.actualAge >= 50) {
									State.variables.RESSevent.push("old PC age difference");
								}
							}
						}
					}
				}

				if (eventSlave.fetish === "humiliation" || eventSlave.energy > 95) {
					if (eventSlave.devotion <= 50) {
						if (eventSlave.devotion >= -20) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								if (eventSlave.vagina !== 0) {
									if (eventSlave.anus !== 0) {
										if (eventSlave.fetishKnown === 1) {
											State.variables.RESSevent.push("fearful humiliation");
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.rules.living === "luxurious") {
					if (eventSlave.devotion <= 75) {
						if (eventSlave.devotion > 50) {
							State.variables.RESSevent.push("newly devoted sunrise");
						}
					}
				}

				if (State.variables.PC.dick > 0) {
					if (State.variables.PC.belly < 5000) {
						if (eventSlave.attrXY <= 35 || eventSlave.behavioralFlaw === "hates men" || eventSlave.sexualFlaw === "repressed") {
							if (eventSlave.devotion >= -20) {
								if (eventSlave.trust > 20) {
									State.variables.RESSevent.push("frightening dick");
								}
							}
						}
					}
				}

				if (State.variables.spa > 0) {
					if (eventSlave.boobs > 2000) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.trust > 20) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									State.variables.RESSevent.push("spa boobs");
								}
							}
						}
					}
				}

				if (eventSlave.lactation > 0) {
					if (eventSlave.boobs > 800) {
						if (eventSlave.nipples !== "fuckable") {
							if (eventSlave.devotion > 20) {
								if (eventSlave.trust > 20) {
									State.variables.RESSevent.push("cow milking");
								}
							}
						}
					}
				}

				if (State.variables.arcologies[0].FSSubjugationist !== "unset") {
					if (eventSlave.race !== State.variables.arcologies[0].FSSubjugationistRace) {
						if (State.variables.week - eventSlave.weekAcquired > 1) {
							if (State.variables.week - eventSlave.weekAcquired < 10) {
								if (eventSlave.devotion < -20) {
									if (eventSlave.trust >= -20) {
										if (eventSlave.health.condition > -20) {
											if (eventSlave.race === eventSlave.origRace) {
												if (eventSlave.indentureRestrictions < 1) {
													State.variables.RESSevent.push("subjugation blues");
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (canTalk(eventSlave)) {
					if (eventSlave.dietCum > 0) {
						if (eventSlave.diet === "fattening") {
							if (eventSlave.trust >= -50) {
								if (eventSlave.fetish !== "cumslut") {
									if (eventSlave.weight < -30) {
										if (eventSlave.health.condition > -80) {
											if (eventSlave.behavioralFlaw !== "anorexic") {
												if (eventSlave.sexualFlaw !== "self hating") {
													if (eventSlave.fetishStrength <= 60 || eventSlave.fetishKnown !== 1) {
														State.variables.RESSevent.push("too thin for cum diet");
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				if (eventSlave.health.condition > 90) {
					if (eventSlave.muscles > 5) {
						if (eventSlave.weight <= 30) {
							if (eventSlave.weight >= -30) {
								if (eventSlave.trust > 50) {
									if (eventSlave.devotion > 50) {
										State.variables.RESSevent.push("passing declaration");
									}
								}
							}
						}
					}
				}

				if (eventSlave.fetish === "sadist") {
					if (eventSlave.fetishStrength > 20) {
						if (State.variables.ArcadeiIDs.length > 0) {
							if (eventSlave.trust >= -20) {
								if (eventSlave.devotion > 50) {
									if (eventSlave.belly < 300000) {
										State.variables.RESSevent.push("arcade sadist");
									}
								}
							}
						}
					}
				}

				if (State.variables.PC.vagina > -1) {
					if (eventSlave.devotion <= 20) {
						if ((eventSlave.trust >= -20 && eventSlave.behavioralFlaw === "arrogant") || (eventSlave.trust > 20)) {
							if (eventSlave.muscles > 30) {
								if (eventSlave.health.condition > 20) {
									if (eventSlave.energy > 50) {
										if (canPenetrate(eventSlave)) {
											if (State.variables.Bodyguard === 0) {
												State.variables.RESSevent.push("mutinery attempt");
											}
										}
									}
								}
							}
						}
					}
				}
			} /* closes mute exempt */

			if (eventSlave.devotion > 20) {
				if (["ball gag", "bit gag", "dildo gag", "massive dildo gag"].includes(eventSlave.collar)) {
					State.variables.RESSevent.push("gagged slave");
				}
			}

			if (eventSlave.trust > 20) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.energy > 40) {
						if (eventSlave.belly < 300000) {
							if (State.variables.PC.belly < 5000 && State.variables.PC.balls < 10) {
								if (canSee(eventSlave)) {
									State.variables.RESSevent.push("comfortable seat");
								}
							}
						}
					}
				}
			}

			if (State.variables.seeAge === 1) {
				if (eventSlave.actualAge < 18) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.ovaries === 1) {
							if (eventSlave.pubertyXX === 0) {
								if (eventSlave.preg === 0) {
									if (eventSlave.physicalAge >= eventSlave.pubertyAgeXX - 0.5) {
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
										State.variables.RESSevent.push("first period");
									}
								}
							}
						}
						if (canPenetrate(eventSlave)) {
							if (eventSlave.balls > 0) {
								if (eventSlave.pubertyXY === 0) {
									if (eventSlave.physicalAge >= eventSlave.pubertyAgeXY - 0.5) {
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
										State.variables.RESSevent.push("wet dreams");
									}
								}
							}
						}
					}
				}
			} /* closes aging exemption */


			if (eventSlave.devotion >= -150) {
				if (eventSlave.devotion <= 50) {
					State.variables.events.push("RE standard punishment");
				}
			}

			if (eventSlave.trust > 20) {
				if (eventSlave.devotion > 50) {
					if (State.variables.PC.belly < 5000) {
						State.variables.RESSevent.push("shower slip");
					}
					if (getLimbCount(eventSlave, 102) === 4) {
						State.variables.RESSevent.push("plimb help");
					}
				}
			}

			if (eventSlave.devotion <= 20) {
				if (eventSlave.devotion >= -50) {
					if (eventSlave.trust >= -20) {
						if (State.variables.suppository !== 0) {
							if (eventSlave.fetish !== "buttslut") {
								State.variables.RESSevent.push("suppository resistance");
							}
						}
						if (State.variables.cockFeeder !== 0) {
							if (eventSlave.fetish !== "cumslut") {
								State.variables.RESSevent.push("cockfeeder resistance");
							}
						}
					}
				}
			}

			if (eventSlave.relationship <= -2) {
				if (eventSlave.trust > 50) {
					if (eventSlave.devotion > 50) {
						State.variables.RESSevent.push("bonded love");
					}
				}
			}

			if (eventSlave.trust > 20) {
				if (eventSlave.devotion > 50) {
					State.variables.RESSevent.push("objectifying visit");
				}
			}

			if (canWalk(eventSlave)) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.trust > -10) {
						if (eventSlave.ID !== State.variables.HeadGirl.ID) {
							if (eventSlave.ID !== State.variables.Concubine.ID) {
								State.variables.RESSevent.push("refreshment delivery");
							}
						}
					}
				}
			}

			if (eventSlave.dick > 8) {
				if (eventSlave.balls > 0) {
					if (eventSlave.energy > 60) {
						if (eventSlave.devotion > 50) {
							if (eventSlave.trust > 50) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									if (eventSlave.belly < 100000) {
										State.variables.RESSevent.push("dick wringing");
									}
								}
							}
						}
					}
				}
			}

			if (eventSlave.balls > 0) {
				if (eventSlave.scrotum > 0) {
					if (eventSlave.chastityPenis === 1) {
						if (eventSlave.devotion <= 95) {
							if (eventSlave.energy > 50) {
								if (eventSlave.energy < 95) {
									if (eventSlave.devotion >= -20 || eventSlave.trust < -20) {
										State.variables.RESSevent.push("cage relief");
									}
								}
							}
						}
					}
				}
			}

			if (State.variables.PC.dick > 0) {
				if (State.variables.PC.boobs >= 300) {
					if (canSee(eventSlave)) {
						if (eventSlave.devotion <= 50) {
							if (eventSlave.devotion >= -20) {
								if (((eventSlave.attrXY <= 35) && (eventSlave.attrXX > 65)) || ((eventSlave.attrXX <= 35) && (eventSlave.attrXY > 65))) {
									State.variables.RESSevent.push("dickgirl PC");
								}
							}
						}
					}
				}
			}

			if (eventSlave.energy > 40) {
				if (canSee(eventSlave)) {
					if (eventSlave.trust >= -50) {
						if (eventSlave.devotion > 0) {
							if (eventSlave.devotion <= 50) {
								if (((eventSlave.attrXX >= 50) && (State.variables.PC.boobs >= 300 || State.variables.PC.title === 0) && (State.variables.PC.belly < 5000)) ||
									((eventSlave.attrXY >= 50) && (State.variables.PC.dick > 0) && (State.variables.PC.boobs < 300) && (State.variables.PC.belly < 1500)) ||
									(eventSlave.fetish === "pregnancy" && State.variables.PC.belly >= 5000) ||
									(eventSlave.fetish === "boobs" && State.variables.PC.belly < 5000 && State.variables.PC.boobs >= 1000)) {
									State.variables.RESSevent.push("hot PC");
								}
							}
						}
					}
				}
			}

			if (eventSlave.trust <= 20) {
				if (eventSlave.trust >= -75) {
					if (eventSlave.devotion <= 30) {
						if (eventSlave.devotion >= -20) {
							State.variables.RESSevent.push("like me");
						}
					}
				}
			}

			if (eventSlave.devotion < -20) {
				if (eventSlave.trust >= -20) {
					if (eventSlave.clothes === "uncomfortable straps") {
						State.variables.RESSevent.push("bondage gear");
					}
				}
			}

			if (eventSlave.labia > 1 && eventSlave.vagina >= 0) {
				if (eventSlave.muscles > 5 || eventSlave.diet === "muscle building") {
					if (eventSlave.belly < 10000) {
						if (eventSlave.devotion > 20) {
							if (eventSlave.trust > 20) {
								State.variables.RESSevent.push("inconvenient labia");
							}
						}
					}
				}
			}

			if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
				if (eventSlave.addict > 20) {
					if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
						State.variables.RESSevent.push("obedient addict");
					}
				}
			}

			if (eventSlave.devotion < -50) {
				if (eventSlave.trust >= -50) {
					if (eventSlave.heels !== 1) {
						State.variables.RESSevent.push("escapee");
					}
				}
			}

			if (eventSlave.devotion <= 50) {
				if (eventSlave.trust >= -50) {
					if (eventSlave.behavioralFlaw === "gluttonous") {
						if (eventSlave.diet === "restricted") {
							State.variables.RESSevent.push("diet");
						}
					}
				}
			}

			if (eventSlave.devotion <= 20) {
				if (eventSlave.devotion >= -50) {
					State.variables.RESSevent.push("resistant shower");
				}
			}

			if (eventSlave.rules.speech !== "restrictive") {
				if (eventSlave.devotion >= -20) {
					if (eventSlave.trust >= -20) {
						if (eventSlave.energy > 75) {
							if (eventSlave.fetish !== "buttslut") {
								if (eventSlave.vagina !== 0 || eventSlave.anus !== 0) {
									State.variables.RESSevent.push("night visit");
								}
							}
						}
					}
				}
			}

			if (eventSlave.rules.release.masturbation === 0) {
				if (eventSlave.need) {
					if (eventSlave.devotion <= 95) {
						if (eventSlave.trust >= -20) {
							if ((eventSlave.chastityPenis !== 1) || (eventSlave.dick === 0)) {
								State.variables.RESSevent.push("forbidden masturbation");
							}
						}
					}
					if (eventSlave.devotion >= -20) {
						if (eventSlave.trust >= -50) {
							State.variables.RESSevent.push("desperately horny");
						}
					}
				}
			}

			if (App.Utils.hasFamilySex(eventSlave) || eventSlave.rules.release.slaves === 1) {
				if (canPenetrate(eventSlave)) {
					State.variables.RESSevent.push("slave dick on slave");
				}
			}

			if (eventSlave.muscles > 30) {
				if (eventSlave.weight <= 10) {
					if (eventSlave.anus !== 0 || State.variables.PC.dick === 0) {
						if (eventSlave.vagina !== 0 || State.variables.PC.dick === 0) {
							State.variables.RESSevent.push("muscles");
						}
					}
				}
			}

			if (eventSlave.devotion >= -20) {
				if (eventSlave.lactation > 1) {
					if (canDoVaginal(eventSlave) || canDoAnal(eventSlave)) {
						State.variables.RESSevent.push("milkgasm");
					}
				}
			}

			if (eventSlave.waist < -95) {
				if (eventSlave.devotion > 20) {
					if (eventSlave.trust >= -20) {
						if (eventSlave.belly < 30000) {
							if (eventSlave.weight <= 95) {
								State.variables.RESSevent.push("devoted waist");
							}
						}
					}
				}
			}

			if (eventSlave.dick > 0) {
				if (eventSlave.balls === 0) {
					if (eventSlave.genes === "XY") {
						if (eventSlave.devotion <= 50) {
							if (eventSlave.trust < -50) {
								if (eventSlave.anus > 0) {
									if (canDoAnal(eventSlave)) {
										State.variables.RESSevent.push("resistant gelding");
									}
								}
							}
						}
					}
				}
			}

			if (State.variables.seePreg !== 0) {
				if (isFertile(eventSlave)) {
					if (eventSlave.devotion > 50) {
						if (State.variables.PC.dick !== 0) {
							if (eventSlave.fetish === "pregnancy" || eventSlave.energy > 95) {
								if (eventSlave.eggType === "human") {
									if (eventSlave.fetishKnown === 1) {
										if (eventSlave.vagina !== 0) {
											if (eventSlave.anus > 0) {
												if (eventSlave.geneticQuirks.superfetation === 2 && (eventSlave.intelligence + eventSlave.intelligenceImplant > 15) && eventSlave.womb.length > 0) {
													if (eventSlave.belly < (eventSlave.pregAdaptation * 1750)) {
														State.variables.RESSevent.push("impregnation please");
													}
												} else {
													State.variables.RESSevent.push("impregnation please");
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}

			if (["huge plug", "large plug", "long, huge plug", "long, large plug"].includes(eventSlave.buttplug)) {
				if (isSlaveAvailable(eventSlave)) {
					if (eventSlave.devotion <= 20) {
						if (eventSlave.trust >= -50) {
							if (eventSlave.anus < 3) {
								State.variables.RESSevent.push("plug disobedience");
							}
						}
					}
				}
			}
		} /* closes amp/crawling exempt */

		if (canTalk(eventSlave)) {
			if (eventSlave.rules.speech !== "restrictive") {
				if (eventSlave.boobsImplant > 400) {
					if (eventSlave.lipsImplant >= 30) {
						if (eventSlave.buttImplant > 3) {
							if (eventSlave.boobs < 9000 || eventSlave.butt < 8) {
								State.variables.RESSevent.push("surgery addict");
							}
						}
					}
				}
			}

			if (eventSlave.rules.speech !== "restrictive") {
				if (eventSlave.counter.oral + eventSlave.counter.vaginal + eventSlave.counter.anal > 900) {
					if (eventSlave.counter.oral + eventSlave.counter.vaginal + eventSlave.counter.anal < 1100) {
						if (eventSlave.vagina !== 0) {
							if (eventSlave.anus > 0) {
								if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
									State.variables.RESSevent.push("millenary");
								}
							}
						}
					}
				}
			}

			if (State.variables.expansionRequestsAllowed > 0) {
				if (eventSlave.drugs === "no drugs") {
					if (eventSlave.rules.speech === "permissive") {
						if (eventSlave.health.condition > 20) {
							if (eventSlave.devotion >= -20) {
								if (eventSlave.trust > 20) {
									if (State.variables.arcologies[0].FSSlimnessEnthusiast === "unset") {
										State.variables.RESSevent.push("injections please");
									}
								}
							}
						}
					}
				}
			}

			if (eventSlave.behavioralFlaw === "bitchy") {
				if (canSee(eventSlave)) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.trust >= -20) {
							State.variables.RESSevent.push("obedient bitchy");
						}
					}
				}
			}
		} /* closes mute exempt */

		if (State.variables.cockFeeder === 0) {
			if (eventSlave.intelligence + eventSlave.intelligenceImplant < -50) {
				if (eventSlave.devotion <= 50) {
					if (eventSlave.devotion >= -20 || eventSlave.trust < -20) {
						State.variables.RESSevent.push("obedient idiot");
					}
				}
			}
		}

		if (State.variables.assistant > 1) {
			if (eventSlave.fetishKnown === 1) {
				if (eventSlave.energy > 95) {
					if (eventSlave.devotion > 20) {
						if (eventSlave.rules.release.masturbation === 1) {
							State.variables.RESSevent.push("nympho with assistant");
						}
					}
				}
			}
		}


		if (eventSlave.minorInjury === "sore ass") {
			if (eventSlave.devotion <= 50) {
				State.variables.RESSevent.push("sore ass");
			}
		}

		if (eventSlave.sexualFlaw === "hates oral") {
			if (State.variables.PC.dick !== 0) {
				if (eventSlave.devotion <= 50) {
					State.variables.RESSevent.push("hates oral");
				}
			}
		}

		if (eventSlave.vagina === 0) {
			if (eventSlave.devotion > 50) {
				if (eventSlave.trust > 20) {
					if (eventSlave.rules.speech !== "restrictive") {
						State.variables.RESSevent.push("devoted virgin");
					}
				}
			}
		}

		if (eventSlave.anus === 0) {
			if (eventSlave.devotion > 50) {
				if (eventSlave.trust > 20) {
					if (eventSlave.rules.speech !== "restrictive") {
						State.variables.RESSevent.push("devoted anal virgin");
					}
				}
			}
		}

		if (eventSlave.devotion <= 50) {
			State.variables.RESSevent.push("scrubbing");
		}

		if (eventSlave.devotion <= 20) {
			if (eventSlave.clothes === "a slutty maid outfit" || eventSlave.clothes === "a nice maid outfit") {
				State.variables.RESSevent.push("servant maid");
			}
		}

		if (eventSlave.aphrodisiacs > 1 || eventSlave.inflationType === "aphrodisiac") {
			if (eventSlave.rules.speech === "restrictive" && eventSlave.rules.release.master === 1 && App.Utils.releaseRestricted(eventSlave)) {
				State.variables.RESSevent.push("extreme aphrodisiacs");
			}
		}

		if (App.Utils.hasFamilySex(eventSlave) || eventSlave.rules.release.slaves === 1) {
			if (eventSlave.clit > 2) {
				State.variables.RESSevent.push("slave clit on slave");
			}
		}

		if (eventSlave.rules.release.masturbation === 1) {
			if (eventSlave.dick > 4) {
				if (hasAnyArms(eventSlave)) {
					if (canAchieveErection(eventSlave)) {
						if (eventSlave.belly < 10000) {
							if (eventSlave.chastityPenis !== 1) {
								State.variables.RESSevent.push("slave dick huge");
							}
						}
					}
				}
			}
		}

		if (eventSlave.heels === 1) {
			if (eventSlave.shoes === "heels" || eventSlave.shoes === "extreme heels") {
				if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
					State.variables.RESSevent.push("heels");
				}
			}
		}

		if (eventSlave.rules.release.masturbation === 1) {
			if (eventSlave.belly < 300000) {
				if (eventSlave.anus > 2) {
					if (eventSlave.fetish === "buttslut" || eventSlave.energy > 95) {
						if (eventSlave.fetish !== "none") {
							if (canHold(eventSlave)) {
								if (canDoAnal(eventSlave)) {
									State.variables.RESSevent.push("loose buttslut");
								}
							}
						}
					}
				}
			}
		}

		if (eventSlave.boobs > 1200) {
			if (eventSlave.areolaeShape !== "circle") {
				if (eventSlave.devotion > 50) {
					State.variables.RESSevent.push("shaped areolae");
				}
			}
		}

		if (State.variables.seePreg !== 0) {
			if (eventSlave.bellyPreg >= 10000) {
				State.variables.RESSevent.push("hugely pregnant");
			}
		}

		if (eventSlave.hormoneBalance >= 50) {
			if (eventSlave.vagina === -1) {
				if (eventSlave.balls >= 0) {
					if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
						if (eventSlave.devotion <= 50) {
							if (eventSlave.fetish !== "buttslut") {
								if (eventSlave.rules.speech === "permissive") {
									State.variables.RESSevent.push("hormone dysfunction");
								}
							}
						}
					}
				}
			}
		}

		if (eventSlave.vaginaPiercing > 1) {
			if (eventSlave.nipplesPiercing > 1) {
				if (eventSlave.clitPiercing > 1) {
					if (eventSlave.devotion > 20 || eventSlave.trust < -20) {
						if (eventSlave.devotion <= 50) {
							if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
								State.variables.RESSevent.push("heavy piercing");
							}
						}
					}
				}
			}
		}

		if (eventSlave.anus === 0) {
			if (eventSlave.devotion < -20) {
				if (eventSlave.trust >= -20) {
					State.variables.RESSevent.push("resistant anal virgin");
				}
			}
		}

		if (State.variables.PC.dick !== 0) {
			if (eventSlave.bellyPreg >= 300000) {
				State.variables.RESSevent.push("hyperpreg stuck");
			}
		}

		if (eventSlave.devotion >= 50) {
			if (eventSlave.trust <= 20) {
				if (canWalk(eventSlave)) {
					State.variables.RESSevent.push("devoted fearful slave");
				}
			}
		}

		if (eventSlave.relationship === 4) {
			if (eventSlave.devotion > 20) {
				if (eventSlave.trust > 20) {
					State.variables.events.push("RE slave marriage");
				}
			}
		}

		if (V.PSnatch === 0 && eventSlave.origin === "$He is your share of a raid on an illegal laboratory by your mercenaries." && eventSlave.newGamePlus === 0) {
			if (V.geneticMappingUpgrade === 2 && eventSlave.health.condition > 25 && eventSlave.devotion > 50 && V.cash > V.surgeryCost*4) {
				/* only one slave ever qualifies, so give it a bit more weight */
				V.events.push("RE snatch and grab followup");
				V.events.push("RE snatch and grab followup");
				V.events.push("RE snatch and grab followup");
			}
		}

		/* NICKNAME EVENTS */

		if (State.variables.nicknamesAllowed === 1) {
			let toSearch = eventSlave.slaveName.toLowerCase();
			if (!toSearch.includes("'")) {
				if (State.variables.week - eventSlave.weekAcquired >= 4) {
					State.variables.events.push("RE nickname");
					State.variables.seed = 0;
				}
			} /* closes nickname check */
		} /* closes no nicknames option */
	} /* closes mindbreak exempt */

	if (eventSlave.fetish === "mindbroken") {
		if (canWalk(eventSlave)) {
			State.variables.RESSevent.push("mindbroken morning");
		}
	}
};

window.populateEventArray = function(RESS = State.variables.RESSevent.length, RESSTR = State.variables.RESSTRevent.length, RETS = State.variables.RETSevent.length, RECI = State.variables.RECIevent.length) {
	/* EVENT RANDOMIZATION */
	let events = State.variables.events;
	let i = 0;

	for (i = 0; i < RESS; i++) {
		events.push("RESS");
	}
	for (i = 0; i < RESSTR; i++) {
		events.push("RESSTR");
	}
	for (i = 0; i < RETS; i++) {
		events.push("RETS");
	}
	for (i = 0; i < RECI; i++) {
		events.push("RECI");
	}
	if (events.length === 0) {
		events.push("RE no event");
	}

	return events;
};
