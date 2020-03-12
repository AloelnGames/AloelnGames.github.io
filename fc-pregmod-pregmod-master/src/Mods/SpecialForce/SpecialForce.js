// V=SugarCube.State.variables, T=SugarCube.State.temporary;

App.SF.Caps = function() {
	return capFirstChar(V.SF.Lower);
}

App.SF.Init = function() {
	V.SF.Toggle = V.SF.Toggle || 0;
	if (passage() === "init" || passage() === "New Game Plus") {
		V.SF = {Active: -1, Toggle:V.SF.Toggle};
	}
	V.SF.FS = V.SF.FS || {};
	V.SF.FS.Tension = V.SF.FS.Tension || -1;
	if (V.SF.Toggle && V.SF.Active >= 1) {
		V.SF.UC = V.SF.UC || {};
		V.SF.Depravity = V.SF.Depravity || 0;
		V.SF.Size = V.SF.Size || 0;
		V.SF.Upgrade = V.SF.Upgrade || 0;
		V.SF.Gift = V.SF.Gift || 0;
		V.SF.UC.Assign = V.SF.UC.Assign || 0;
		V.SF.UC.Lock = V.SF.UC.Lock || 0;
		V.SF.ROE = V.SF.ROE || "hold";
		V.SF.Target = V.SF.Target || "recruit";
		V.SF.Regs = V.SF.Regs || "strict";
		V.SF.Lower = V.SF.Lower || "the special force";

		V.SF.Squad = V.SF.Squad || {};
		V.SF.Squad.Troops = V.SF.Squad.Troops || 40;
		V.SF.Squad.Armoury = V.SF.Squad.Armoury || 0;
		V.SF.Squad.Firebase = V.SF.Squad.Firebase || 0;
		V.SF.Squad.AV = V.SF.Squad.AV || 0;
		V.SF.Squad.TV = V.SF.Squad.TV || 0;
		V.SF.Squad.Drones = V.SF.Squad.Drones || 0;
		V.SF.Squad.Drugs = V.SF.Squad.Drugs || 0;
		V.SF.Squad.PGT = V.SF.Squad.PGT || 0;
		V.SF.Squad.AA = V.SF.Squad.AA || 0;
		V.SF.Squad.TA = V.SF.Squad.TA || 0;
		V.SF.Squad.SpacePlane = V.SF.Squad.SpacePlane || 0;
		V.SF.Squad.GunS = V.SF.Squad.GunS || 0;

		V.SF.Squad.Satellite = V.SF.Squad.Satellite || {};
		V.SF.Squad.Satellite.lv = V.SF.Squad.Satellite.lv || 0;
		V.SF.Squad.Satellite.InOrbit = V.SF.Squad.Satellite.InOrbit || 0;
		V.SF.Squad.GiantRobot = V.SF.Squad.GiantRobot || 0;
		V.SF.Squad.MissileSilo = V.SF.Squad.MissileSilo || 0;
		V.SF.Squad.AircraftCarrier = V.SF.Squad.AircraftCarrier || 0;
		V.SF.Squad.Sub = V.SF.Squad.Sub || 0;
		V.SF.Squad.HAT = V.SF.Squad.HAT || 0;

		V.SF.Colonel = V.SF.Colonel || {};
		V.SF.Colonel.Core = V.SF.Colonel.Core || "";
		V.SF.Colonel.Talk = V.SF.Colonel.Talk || 0;
		V.SF.Colonel.Fun = V.SF.Colonel.Fun || 0;
		V.SF.Colonel.Status = V.SF.Colonel.Status || 0;

		V.SF.MercCon = V.SF.MercCon || {};
		V.SF.MercCon.History = V.SF.MercCon.History || 0;
		V.SF.MercCon.CanAttend = V.SF.MercCon.CanAttend || -2;
		V.SF.MercCon.Income = V.SF.MercCon.Income || 0;
		V.SF.MercCon.Revenue = V.SF.MercCon.Revenue || 0;
		V.SF.MercCon.Mercs = V.SF.MercCon.Mercs || 0;
		V.SF.MercCon.Menials = V.SF.MercCon.Menials || 0;
		V.SF.MercCon.TotalMenials = V.SF.MercCon.TotalMenials || 0;
		V.SF.MercCon.TotalMercs = V.SF.MercCon.TotalMercs || 0;
	}
	// V.arcologies[0].SFRaid = 1; V.arcologies[0].SFRaidTarget = -1;
	/* if (typeof V.SF.Facility === "undefined") {
		V.SF.Facility = {
			Toggle:0, Active:0, LC:0, Workers:0, Max:5,
			Caps:"Special force support facility", Lower:"special force support facility",
			Decoration:"standard", Speed:0, Upgrade:0, IDs:[]
		};
	}*/
};

/* no-usedOnce */
App.SF.BC = function() {

	function InitClean() {
		delete V.SFMODToggle;
		delete V.securityForceActive;
		delete V.securityForceCreate;
		delete V.securityForceEventSeen;
	}

	function MainClean() {
		delete V.securityForceActive;
		delete V.securityForceRecruit;
		delete V.securityForceTrade;
		delete V.securityForceBooty;
		delete V.securityForceIncome;
		delete V.securityForceMissionEfficiency;
		delete V.securityForceProfitable;
		delete V.TierTwoUnlock;
		delete V.securityForceDepravity;
		delete V.SFAO;
		delete V.securityForceUpgradeTokenReset;
		delete V.securityForceUpgradeToken;
		delete V.securityForceGiftToken;
		delete V.securityForceRulesOfEngagement;
		delete V.securityForceFocus;
		delete V.securityForceAccountability;
		delete V.securityForceName;
		delete V.SubsidyActive;
		delete V.securityForceSubsidyActive;
	}

	function ColonelClean() {
		delete V.ColonelCore;
		delete V.securityForceColonelToken;
		delete V.securityForceColonelSexed;
		delete V.ColonelRelationship;
		delete V.securityForceSexedColonelToken;
	}

	function TradeShowClean() {
		delete V.OverallTradeShowAttendance;
		delete V.CurrentTradeShowAttendance;
		delete V.TradeShowIncome;
		delete V.TotalTradeShowIncome;
		delete V.TradeShowHelots;
		delete V.TotalTradeShowHelots;
	}

	function UnitsClean() {
		delete V.securityForceInfantryPower;
		delete V.securityForceArcologyUpgrades;
		delete V.securityForceVehiclePower;
		delete V.securityForceDronePower;
		delete V.securityForceStimulantPower;
		delete V.securityForceHeavyBattleTank;
		delete V.securityForceAircraftPower;
		delete V.securityForceSpacePlanePower;
		delete V.securityForceAC130;
		delete V.securityForceSatellitePower;
		delete V.securityForceGiantRobot;
		delete V.securityForceMissileSilo;
		delete V.securityForceAircraftCarrier;
		delete V.securityForceSubmarine;
		delete V.securityForceHeavyAmphibiousTransport;
		delete V.securityForcePersonnel;
		delete V.securityForceFortressZeppelin;
		delete V.securityForceHeavyTransport;
	}

	if (typeof V.SF !== "object") {
		if (V.securityForceEventSeen < 1) {
			V.securityForceActive = -1;
		} else {
			V.securityForceActive = 2;
		}
		V.SF = {Toggle: V.SFMODToggle, Active: V.securityForceActive};
		InitClean();
		if (V.securityForceName === undefined) {
			V.securityForceName = "the special force";
		}
		if (V.SF.Active >= 1) {
			Object.assign(V.SF, {
				Depravity: V.securityForceDepravity,
				Size: V.SFAO,
				Upgrade: V.securityForceUpgradeToken,
				Gift: V.securityForceGiftToken,
				UC: {Assign: V.SF.SpecOps, Lock: V.SF.SpecOpsLock},
				ROE: V.securityForceRulesOfEngagement,
				Target: V.securityForceFocus,
				Regs: V.securityForceAccountability,
				Lower: V.securityForceName,
				Caps: capFirstChar(V.securityForceName),
			});
			MainClean();

			if (V.ColonelCore === undefined) {
				V.ColonelCore = "";
			}
			if (V.ColonelDiscussion === undefined) {
				V.ColonelDiscussion = 0;
			}
			if (V.ColonelSexed === undefined) {
				V.ColonelSexed = 0;
			}
			V.SF.Colonel = {
				Core: V.ColonelCore,
				Talk: V.securityForceColonelToken,
				Fun: V.securityForceColonelSexed,
				Status: V.ColonelRelationship
			};
			ColonelClean();

			if (V.TradeShowIncome === undefined) {
				V.TradeShowIncome = 0;
			}
			if (V.TotalTradeShowIncome === undefined) {
				V.TotalTradeShowIncome = 0;
			}
			if (V.TradeShowHelots === undefined) {
				V.TradeShowHelots = 0;
			}
			if (V.TotalTradeShowHelots === undefined) {
				V.TotalTradeShowHelots = 0;
			}
			V.SF.MercCon = {
				History: V.OverallTradeShowAttendance,
				CanAttend: V.CurrentTradeShowAttendance,
				Income: V.TradeShowIncome,
				Revenue: V.TotalTradeShowIncome,
				Menials: V.TradeShowHelots,
				TotalMenials: V.TotalTradeShowHelots,
				Mercs: 0,
				TotalMercs: 0
			};
			TradeShowClean();
			if (V.SF.MercCon.History > 0) {
				V.SF.MercCon.CanAttend = 1;
			}

			if (V.securityForceHeavyBattleTank === undefined) {
				V.securityForceHeavyBattleTank = 0;
			}
			if (V.securityForceSpacePlanePower === undefined) {
				V.securityForceSpacePlanePower = 0;
			}
			if (V.securityForceAC130 === undefined) {
				V.securityForceAC130 = 0;
			}
			if (V.securityForceSatellitePower === undefined) {
				V.securityForceSatellitePower = 0;
			}
			if (V.securityForceGiantRobot === undefined) {
				V.securityForceGiantRobot = 0;
			}
			if (V.securityForceMissileSilo === undefined) {
				V.securityForceMissileSilo = 0;
			}
			if (V.securityForceAircraftCarrier === undefined) {
				V.securityForceAircraftCarrier = 0;
			}
			if (V.securityForceSubmarine === undefined) {
				V.securityForceSubmarine = 0;
			}
			if (V.securityForceHeavyAmphibiousTransport === undefined) {
				V.securityForceHeavyAmphibiousTransport = 0;
			}
			V.SF.Squad = {
				Troops: V.securityForcePersonnel,
				Armoury: V.securityForceInfantryPower,
				Firebase: V.securityForceArcologyUpgrades,
				AV: V.securityForceVehiclePower,
				TV: V.securityForceVehiclePower,
				Drones: V.securityForceDronePower,
				Drugs: V.securityForceStimulantPower,
				PGT: V.securityForceHeavyBattleTank,
				AA: V.securityForceAircraftPower,
				TA: V.securityForceAircraftPower,
				SpacePlane: V.securityForceSpacePlanePower,
				GunS: V.securityForceAC130,
				Satellite: {lv: V.securityForceSatellitePower, InOrbit: 0},
				GiantRobot: V.securityForceGiantRobot,
				MissileSilo: V.securityForceMissileSilo,
				AircraftCarrier: V.securityForceAircraftCarrier,
				Sub: V.securityForceSubmarine,
				HAT: V.securityForceHeavyAmphibiousTransport
			};
			UnitsClean();
		} else {
			App.SF.Init();
		}
	} else if (typeof V.SF === "object") {
		App.SF.Init();

		if (V.SF.MercCon !== undefined) {
			if( V.SF.MercCon.View !== undefined) {
				delete V.SF.MercCon.View;
			}
			if (V.SF.MercCon.Helots !== undefined) {
				V.SF.MercCon.Menials = V.SF.MercCon.Helots;
				delete V.SF.MercCon.Helots;
			}
			if (V.SF.MercCon.TotalHelots !== undefined) {
				V.SF.MercCon.TotalMenials = V.SF.MercCon.TotalHelots;
				delete V.SF.MercCon.TotalHelots;
			}
		}

		if (V.SF.SpecOps !== undefined && V.SF.SpecOpsLock !== undefined) {
			V.SF.UC = {Assign: V.SF.SpecOps, Lock: V.SF.SpecOpsLock};
		}
		delete V.SF.SpecOps;
		delete V.SF.SpecOpsLock;
		if (V.SFUC !== undefined) {
			V.SF.UC.num = V.SFUC || 0;
		}
		delete V.SFUC;

		if (V.SF.MWU !== undefined) {
			delete V.SF.MWU;
		}
		if (V.SpecOpsLock !== undefined) {
			V.SF.SpecOpsLock = V.SpecOpsLock;
		}
		delete V.SpecOpsLock;
		if (V.SF.U !== undefined) {
			V.SF.Upgrade = V.SF.U || 0;
		}
		delete V.SF.U;
		if (V.SF.WG !== undefined) {
			V.SF.Gift = V.SF.WG || 0;
		}
		delete V.SF.WG;

		if (V.SF.Bonus !== undefined) {
			delete V.SF.Bonus;
		}
		if (V.SF.Depravity < 0) {
			V.SF.Depravity = 0;
		}
		if (V.SF.Units !== undefined) {
			V.SF.Size = V.SF.Units;
		}
		delete V.SF.Units;
		if (V.SFUnit !== undefined) {
			if (V.SFUnit.AT !== undefined) {
				V.SFUnitTA = 0;
			}
			if (V.SFTradeShow !== undefined) {
				V.SF.MercCon = V.SFTradeShow;
			}
			delete V.SFTradeShow;
			if (V.SFColonel !== undefined) {
				V.SF.Colonel = V.SFColonel;
			}
			delete V.SFColonel;
			if (V.SF.Squad !== undefined && V.SF.Squad.Satellite !== undefined && V.SatLaunched !== undefined) {
				V.SF.Squad.Sat = {lv: V.SF.Squad.Satellite, InOrbit: V.SatLaunched};
				V.SF.Squad.Satellite = V.SF.Squad.Sat;
				delete V.SF.Squad.Sat;
				delete V.SatLaunched;
				delete V.SFUnit;
			}
		}
	}
	InitClean();
	MainClean();
	ColonelClean();
	TradeShowClean();
	UnitsClean();
	delete V.SF.Subsidy;
	if (jsDef(V.SF.UC)) {
		delete V.SF.UC.num;
	}
	if (V.week < 72 && V.SF.Active !== -1) { V.SF.Active = -1; }
};
/* usedOnce */

App.SF.fsIntegration = function(input = 'Menu', textDisplay = 100, text = `\n`) {
	const Revivalisms = ['Arabian_Revivalism', 'Aztec_Revivalism', 'Chinese_Revivalism', 'Edo_Revivalism', 'Egyptian_Revivalism', 'Multiculturalism', 'Roman_Revivalism'];
	let FS_OPTIONS = ['Asset_Expansionism', 'Body_Purism', 'Chattel_Religionism', 'Degradationism', 'Eugenics', 'Gender_radicalism', 'Gender_traditionalism', 'Hedonistic_Decadence', 'Maturity_Preferentialism', 'Paternalism', 'Physical_Idealism', 'Repopulation', 'Slave_Pastoralism', 'Slimness_Enthusiasm', 'Transformation_Fetishism', 'Youth_Preferentialism'];
	FS_OPTIONS = FS_OPTIONS.concat(Revivalisms);

	function validityTester() {
		if (V.SF.FS.Repopulation.lv > V.SF.FS.Eugenics.lv) {
			V.SF.FS.Eugenics.vaildOption = 0;
		} else if (V.SF.FS.Eugenics.lv > V.SF.FS.Repopulation.lv) {
			V.SF.FS.Repopulation.vaildOption = 0;
		}

		if (V.SF.FS.Gender_radicalism.lv > V.SF.FS.Gender_traditionalism.lv) {
			V.SF.FS.Gender_traditionalism.vaildOption = 0;
		} else if (V.SF.FS.Gender_traditionalism.lv > V.SF.FS.Gender_radicalism.lv) {
			V.SF.FS.Gender_radicalism.vaildOption = 0;
		}

		if (V.SF.FS.Body_Purism.lv > V.SF.FS.Transformation_Fetishism.lv) {
			V.SF.FS.Transformation_Fetishism.vaildOption = 0;
		} else if (V.SF.FS.Transformation_Fetishism.lv > V.SF.FS.Body_Purism.lv) {
			V.SF.FS.Body_Purism.vaildOption = 0;
		}

		if (V.SF.FS.Youth_Preferentialism.lv > V.SF.FS.Maturity_Preferentialism.lv) {
			V.SF.FS.Maturity_Preferentialism.vaildOption = 0;
		} else if (V.SF.FS.Maturity_Preferentialism.lv > V.SF.FS.Youth_Preferentialism.lv) {
			V.SF.FS.Youth_Preferentialism.vaildOption = 0;
		}

		if (V.SF.FS.Slimness_Enthusiasm.lv > V.SF.FS.Asset_Expansionism.lv) {
			V.SF.FS.Asset_Expansionism.vaildOption = 0;
		} else if (V.SF.FS.Asset_Expansionism.lv > V.SF.FS.Slimness_Enthusiasm.lv) {
			V.SF.FS.Slimness_Enthusiasm.vaildOption = 0;
		}

		let ChosenRevivalism;
		for (let i = 0; i < Revivalisms.length; i++) {
			if (V.SF.FS[Revivalisms[i]].lv > 0) {
				ChosenRevivalism = V.SF.FS[Revivalisms[i]];
			}
		}
		if (ChosenRevivalism) {
			for (let i = 0; i < Revivalisms.length; i++) {
				if (V.SF.FS[Revivalisms[i]] !== ChosenRevivalism) {
					V.SF.FS[Revivalisms[i]].vaildOption = 0;
				}
			}
		}
	}

	function OptionsMenu(selectedFS, fsIncrease = 5, cost = 150000) {
		let InputText1 = ``,
			InputText0 = ``;
		if (fsIncrease > 0) {
			if (V.SF.FS[selectedFS].lv === 0) {
				InputText1 += `Foods`;
			} else if (V.SF.FS[selectedFS].lv === 5) {
				InputText1 += `Media`;
			} else if (V.SF.FS[selectedFS].lv === 10) {
				InputText1 += `Slaves`;
			} else if (V.SF.FS[selectedFS].lv === 15) {
				InputText1 += `Slave Processing Cages decorations`;
			} else if (V.SF.FS[selectedFS].lv === 20) {
				InputText1 += `Common Area decorations`;
			} else if (V.SF.FS[selectedFS].lv === 25) {
				InputText1 += `Barracks decorations`;
			} else if (V.SF.FS[selectedFS].lv === 30) {
				InputText1 += `Armory decorations`;
			} else if (V.SF.FS[selectedFS].lv === 35) {
				InputText1 += `Command Center decorations`;
			} else if (V.SF.FS[selectedFS].lv === 40) {
				InputText1 += `Drug Lab decorations`;
			} else if (V.SF.FS[selectedFS].lv === 45) {
				InputText1 += `Personal Items`;
			} else if (V.SF.FS[selectedFS].lv === 50) {
				InputText1 += `Drone Bay decorations`;
			} else if (V.SF.FS[selectedFS].lv === 55) {
				InputText1 += `Garage decorations`;
			} else if (V.SF.FS[selectedFS].lv === 60) {
				InputText1 += `Vehicle modifications`;
			} else if (V.SF.FS[selectedFS].lv === 65) {
				InputText1 += `Hangar decorations`;
			} else if (V.SF.FS[selectedFS].lv === 70) {
				InputText1 += `Aircraft modifications`;
			} else if (V.SF.FS[selectedFS].lv === 75) {
				InputText1 += `Luxuries facilities`;
			} else if (V.SF.FS[selectedFS].lv === 80) {
				InputText1 += `Perimeter decorations`;
			} else if (V.SF.FS[selectedFS].lv === 85) {
				InputText1 += `Mandate FS-Roleplaying`;
			} else if (V.SF.FS[selectedFS].lv === 90) {
				InputText1 += `Talk The Colonel into Compliance`;
			}
		}

		if (V.SF.FS[selectedFS].lv === 90) {
			fsIncrease = 10;
			cost = 0;
		} else if (fsIncrease === 0 || V.SF.FS[selectedFS].lv === 85) {
			cost = 250000;
		} else if (V.SF.FS[selectedFS].lv >= 60 && V.SF.FS[selectedFS].lv < 85) {
			cost = 200000;
		} else if (V.SF.FS[selectedFS].lv <= 10) {
			cost = 50000;
		}

		switch (selectedFS) {
			case 'Repopulation':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nRepopulation efforts: focus on mass breeding in order to repopulate the future world.`;
				}
				break;
			case 'Eugenics':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nEugenics: rebuilding society using restrictive breeding programs reserved solely for society's finest. `;
				}
				break;
			case 'Gender_radicalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nGender radicalism: a radical redefinition of gender that identifies powerful people as male, and everyone else as female.`;
				}
				break;
			case 'Gender_traditionalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nGender traditionalism: a societal preference for feminine slaves and support for slave pregnancy. `;
				}
				break;
			case 'Paternalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nPaternalism: a vision of slave improvement, including slaves' health, mental well-being, and education. `;
				}
				break;
			case 'Degradationism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nDegradationism: a belief that slaves are not human and should not be treated decently.`;
				}
				break;
			case 'Body_Purism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nBody Purism: societal disapproval of implant surgery. `;
				}
				break;
			case 'Transformation_Fetishism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nTransformation Fetishism: societal fetishization of implant surgery.`;
				}
				break;
			case 'Youth_Preferentialism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nYouth Preferentialism: increased interest in girls just past their majority. `;
				}
				break;
			case 'Maturity_Preferentialism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nMaturity Preferentialism: increased interest in mature slaves. `;
				}
				break;
			case 'Slimness_Enthusiasm':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nSlimness Enthusiasm: a fashion for slaves with girlish figures.`;
				}
				break;
			case 'Asset_Expansionism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nAsset Expansionism: societal hunger for huge assets of whatever origin.`;
				}
				break;
			case 'Slave_Pastoralism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nSlave Pastoralism: societal acceptance of slave products like milk.`;
				}
				break;
			case 'Physical_Idealism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nPhysical Idealism: societal reverence for the idealized human form, including height, health and muscle.`;
				}
				break;
			case 'Hedonistic_Decadence':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nHedonistic Decadence: societal acceptance of overindulgence and immediate gratification. Be it food, drink, sex, drugs or whatever one's desire may be.`;
				}
				break;
			case 'Chattel_Religionism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nChattel Religionism: a new strain of religion that emphasizes the slaveholding portions of religious history.`;
				}
				break;
			case 'Roman_Revivalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nRoman Revivalism: a vision of a new Rome.`;
				}
				break;
			case 'Aztec_Revivalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nAztec Revivalism: a vision of a new Aztec Empire.`;
				}
				break;
			case 'Egyptian_Revivalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nEgyptian Revivalism: a vision of a Pharaoh's Egypt.`;
				}
				break;
			case 'Edo_Revivalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nEdo Revivalism: a vision of Edo Japan.`;
				}
				break;
			case 'Arabian_Revivalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nArabian Revivalism: a vision of the Sultanate of old.`;
				}
				break;
			case 'Chinese_Revivalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nChinese Revivalism: a vision of ancient China.`;
				}
				break;
			case 'Multiculturalism':
				if (fsIncrease > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
					InputText0 += `\nMulticulturalism: a commitment to allow your arcology's citizens cultural freedom.`;
				}
				break;
		}

		let var0 = 15,
			var1 = 0;
		if (V.SF.FS[selectedFS].gift > 0) {
			var1 = 1;
		}
		if (fsIncrease > 0) {
			InputText0 += `\n&nbsp;Smuggle in FS-optimized (${V.SF.FS[selectedFS].lv}%): `;
		} else {
			var0 = -15;
			var1 = 1;
			InputText0 += `\n&nbsp;`;
			InputText1 += `Buy The Colonel a personal gift `;
		}

		if (V.SF.FS[selectedFS].gift < 1 || (V.SF.FS[selectedFS].lv < 100 && V.SF.FS[selectedFS].vaildOption > 0)) {
			const InputText2 = `[[${InputText1}|Firebase][cashX(-${cost}, "specialForces"), $SF.FS.Tension += ${var0}, $SF.FS.${[selectedFS]}.gift = ${var1}, $SF.FS.${[selectedFS]}.lv += ${fsIncrease}, $SF.FS.upgrade = 1]]`;
			InputText0 += InputText2;
			if (fsIncrease > 0) {
				InputText0 += ` (FS acceptance:<span class='green'>+${fsIncrease}%,</span>`;
			}
			if (cost > 0) {
				if (fsIncrease > 0) {
					InputText0 += ` `;
				} else {
					InputText0 += ` (`;
				}
			}
			InputText0 += `<span class='red'>${cashFormat(cost)},</span> `;
			InputText0 += `tension:`;
			if (fsIncrease > 0) {
				InputText0 += `<span class='red'>+`;
			} else {
				InputText0 += `<span class='green'>-`;
			}
			InputText0 += `15%</span>)`;
			if (fsIncrease === 0 || V.SF.FS[selectedFS].gift > 0 || V.SF.FS[selectedFS].vaildOption < 1) {
				InputText0 += `\n`;
			}
			text += InputText0;
		}
	}

	if (input === 'Menu') {
		if (V.SF.FS.Tension === -1) {
			text += `<<link "Talk to The Colonel about Future Society integration">> <<replace "#result0">> \n\n`;
			text += `You bring up the topic of cultural development with The Colonel, and in doing so, you share your hopes that she might be willing to help you better acquaint the troops with your cultural mores. Her response was less than positive: `;
			switch (V.SF.Colonel.Core) {
				case "kind":
					text += `"To be honest, I'm not too happy about this idea. Your plans for cultural development are too... extreme. All we need to focus on is security, raiding, and recruiting. That is what my contract, OUR contract, states in the print. I'm sorry, but innovating upon our culture was not part of our agreement."`;
					break;
				case "cruel":
					text += `"What the fuck? Didn't we talk about this, like, way back? No 'future society' bullshit! That was our agreement, boss. Do not bother me with this."`;
					break;
				case "brazen":
					text += `"Sir, I distinctly remember asking you not to bring any social experiments down here. This is a military installation. These are soldiers, sir. Professional contractors, one and all. I don't want them getting distracted by any sort of cosplay craziness. We have a job to do."`;
					break;
				case "shell shocked":
					text += `"Oh no, not this shit again. You know, I had another boss a few years back. Just like you... Slick arcology owner who wanted all of us hired guns to dress and act all weird, like we were in some sort of fucking movie. But we did what he asked, and the arcology burnt to the ground anyway... I knew from then on that Future Societies are bullshit..."`;
					break;
				case "jaded":
					text += `"Seriously? Why? Your society stuff is stupid. There is a reason that I asked you not to bring that sort of thing down here. We run a tight ship. Its not always the most fun, but it works. Why wear ourselves out playing dress up? That's stupid. Leave us alone."`;
					break;
			}
			text += ` [[Fine|Firebase][$SF.FS.Tension = 0]]\n <</replace>> <</link>>`;
		} else if (V.SF.FS.Tension < 100) {
			text += `<<link "Chat with the Troops">> <<replace "#result0">> \n\n`;
			text += `You walk past The Colonel and move towards the common area to meet with an exclusive group of her very influential officers that are currently relaxing at their favorite table. These men and women are known for their competence, popularity, and authority within in their respective divisions of the ${V.SF.Lower}, they are hard to replace, and they are always looking to earn more coin; they are the perfect weak link for trickling your Future Society influences down into the Firebase. As the officers make room at their table for you to sit and join them for discussion, you spot The Colonel staring at you from afar, and she does not look happy with you. As you are her employer, she cannot stop you from speaking with her soldiers or moving around as you please, but she can tell that you are up to no good:\nTension: ${V.SF.FS.Tension}%\n`;
			validityTester();
			for (let i = 0; i < FS_OPTIONS.length; i++) {
				if (V.SF.FS[FS_OPTIONS[i]].vaildOption !== 0 && V.SF.FS[FS_OPTIONS[i]].lv < 100) {
					OptionsMenu(FS_OPTIONS[i]);
				}
				if (V.SF.FS[FS_OPTIONS[i]].gift < 1) {
					OptionsMenu(FS_OPTIONS[i], 0);
				}
			}
			text += `<</replace>> <</link>>`;
		}
		return text;
	} else if (input === 'OptionsFlavourText') {
		text = ``;
		if (textDisplay === -1) {
			text += `\n__Colonel's gift(s)__`;
		}
		if (textDisplay === 5) {
			text += `\n__FS Foods__`;
		}
		if (textDisplay === 10) {
			text += `\n__FS Media__`;
		}
		if (textDisplay === 15) {
			text += `\n__FS Slaves__`;
		}
		if (textDisplay === 20) {
			text += `\n__Slave Processing Cages decorations__`;
		}
		if (textDisplay === 25) {
			text += `\n__Common Area decorations__`;
		}
		if (textDisplay === 30) {
			text += `\n__Barracks decorations__`;
		}
		if (textDisplay === 35) {
			text += `\n__Armory decorations__`;
		}
		if (textDisplay === 40) {
			text += `\n__Command Center decorations__`;
		}
		if (textDisplay === 45) {
			text += `\n__Drug Lab decorations__`;
		}
		if (textDisplay === 50) {
			text += `\n__Personal Items__`;
		}
		if (textDisplay === 55) {
			text += `\n__Drone Bay decorations__`;
		}
		if (textDisplay === 60) {
			text += `\n__Garage decorations__`;
		}
		if (textDisplay === 65) {
			text += `\n__Vehicle modifications__`;
		}
		if (textDisplay === 70) {
			text += `\n__Hangar modifications__`;
		}
		if (textDisplay === 75) {
			text += `\n__Aircraft modifications__`;
		}
		if (textDisplay === 80) {
			text += `\n__Luxuries facilities__`;
		}
		if (textDisplay === 85) {
			text += `\n__Perimeter decorations__`;
		}
		if (textDisplay === 90) {
			text += `\n__Mandate FS-Roleplaying__`;
		}
		if (textDisplay === 100) {
			text += `\n__Colonel's compliance__`;
		} // (default value)
		const hyperPreg0 = V.seeHyperPreg > 0 ? 'hyper-' : '';
		const hyperPreg1 = V.seeHyperPreg > 0 ? 'hyper' : '';
		for (let i = 0; i < FS_OPTIONS.length; i++) {
			switch (FS_OPTIONS[i]) {
				case 'Repopulation':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nTo ease The Colonel's hostility towards Repopulationism, you have gifted her with a very large and unusually shaped armored Command Vehicle; it is designed to fully support The Colonel herself and all of her Command & Communications needs in the field. Given its one-occupant design, it comes well supported with its global-uplink communications array, onboard super computer, shock and blast resistant interior foam padding, adjustable body harness, extended life support & CBRN protection suites, advanced waste removal systems, and its in-built pregnancy-support systems. Should she ever decide to take to the battlefield whilst ${hyperPreg1} pregnant herself, there is no vehicle in the world she would prefer over this one. Despite not yet being ${hyperPreg0}pregnant, she is impressed by how roomy, comfortable, and capable her new Command Vehicle is, despite its large profile. You see her using it quite a bit too, despite her body still being much smaller than the unit was designed for.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe troops enjoy their Repopulationist food, which tastes better than the old food, while being completely unaware that they increase semen production and promote ovulation.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMagazines and porn featuring ${hyperPreg1} pregnant women are widely dispersed among troops to increase their interest in reproduction; many of sex scenes they view now feature heavily pregnant women.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are now some ${hyperPreg1} pregnant slaves present. Many of the new recruits are morbidly curious about these beings, and the female recruits ask them many questions whenever they have time.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAn hour after reception, all captives with pussies are promptly strapped down to an inspection chair and In-Vitro Fertilized by the doctors, before being dragged off the nearby maternity clinic. Your Firebase's soldiers bid for the privilege of having their sperm used for the fertilization of new captives, and childbirth is a requisite for pussy-slaves to qualify for basic training.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are many double-decker baby carriages found both lined up on the outskirts of the common area and on the sides of several tables, and a good amount of them have small babies in them, awaiting their father or mother's attention. Someday soon, all of the carriages will be full.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOff the side of the barracks lies an empty backroom that has since been repurposed into a proper nursery staffed by caring slaves. Conventional incubators for the newborns of the grunts have been installed, and there is even an advanced incubator installed in the corner to age officers' slave children very rapidly.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe Armory has a small and transparent soundproofed chamber off its side where an old soldier nearing retirement teaches basic firearm safety and marksmanship to a groups of very young children born and being raised in the Firebase. Meanwhile, the troopers that come here to retrieve their weapons often name their armament after their own families. Word has it that the current Firebase tradition in effect is to name your service rifle after your firstborn, your sidearm after your second born, and your grenades after your bastards.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a large soundproofed playpen, built with frosted glass, in the middle of the Command Center. It is filled with all sorts of toys and luxuries for the children kept inside, alongside the trusted and suitably modest hired nannies. Here, the surrounding command and control staff on-shift visit and play with their numerous children within, whenever they are not directing field operations.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe drug laboratory has been supplemented by a large pediatric clinic room, where various drugs that foster and enhance healthy physical and mental development in children are researched, developed, tested, and delivered to the progeny of the Firebase.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the lockers and duffel bags of the majority of Firebase soldiers, you can find a variety of books about parenthood and large household management. You can also find several bundles of baby apparel, as well as a bottle or two of fertility pills, which vary in function depending on the inventory owner's gender.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour slave-capture drones have all been covered with tiny loudspeakers that emit messages reassuring the soon-to-be-captives that the drones engage with that their bloodlines will surely be continued in their new lives within your arcology.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage has an additional machine room installed, but this one has a special purpose; it is a private research facility for the creation, improvement, and installation of newer, better, and more portable incubators. These incubators are cutting edge by global standards, pioneering the complex science of growing existing babies to become bigger, stronger, smarter, more beautiful, and of course, more fertile. All of this special machinery has a purpose, of course; the next generation of skilled mechanics and crewmen is fast approaching.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery main battle tank you have features a much broader and taller turret than before, and even more strangely, each turret is egg-shaped. This peculiar shape accommodates an extreme functionality; the multi-pregnancy cockpit - in which tankers not only control their vehicles, but also conceive, deliver, and incubate their own babies. The latest in compact conventional incubators line the interior walls of the turret, and through these, your tanker crews are known to make and sustain all of their newest children throughout their careers in your armor units. It is well known that your tank crews rarely spend much time away from their vehicles for this very reason, and their offspring often choose to become tankers themselves.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar is a cavernous place, and when takeoffs and landings are not in progress there are many open spaces for gangs of playing children to run around and play, as well as lots of places to simply stow baby carriages out of the way of important airman crews. At any given time, these open spaces are in heavy use by the unattended children of the airmen and airwomen who are busy at work here. The longest wall of the hangar is also host to a massive and beautiful mural altogether depicting all of the newborn children fathered or mothered by the Firebase's pilots and airmen thus far. While artful, this mural also holds the promise that through this multitude of progeny, the hangar will always have a rich supply of dedicated pilots and service personnel for the foreseeable future.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWithin the numerous transport aircraft of the hangar, a unique change can be found; since greater human quantity is a focus and priority of the Firebase, more seating has been carefully welded into the interiors of every passenger section, leading to tighter fits, but bigger troop payloads once the transport aircraft touch down. While it currently is uncomfortable for the troops, once the great many claimed and registered children of the current generation of Firebase troops grow up and seek to follow in their parent's footsteps, these abundant seating arrangements will be downright necessary to transport sufficient amounts of these hordes of hopefuls to and from future battles without leaving too many behind.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nNear the barracks, the residents of the Firebase are grateful to have the aid of the All-In-One Parenthood Infirmary. This impressively large and well-equipped facility is staffed with professionals from all over the arcology, and these certified midwives and midmen carry out all the services needed to help this place function as a refuge for personnel during all stages of parenthood; it contains rooms for a fertility clinic, a delivery clinic, a post-natal workshop, and even a high-capacity daycare center.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe outside entrance of the Firebase features a modest outdoor playground, complete with jungle gyms, see saws, sandboxes, a few kiddie pools and many other children's amusements. The playground is surrounded by tall barbed wire fences however, and in the center is an imposing guard tower that serves as a useful vantage point for the squad of snipers and spotter assigned to there to keep watch.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nBy now, most of the men of the Firebase are fathers, and the vast majority of the slaves present are visibly pregnant. An envied few are enjoying their ${hyperPreg1}pregnancies too, as those slaves are given reduced duties and more rest and food out of necessity. Worth noting is the surprisingly high number of pregnant soldiers and staff members absent from their units; a nice portion of them are enjoying their maternity leave benefits as they wait out their pregnancies or post-natal recoveries in either the Firebase's facilities or the perceived comfort and privacy of your arcology above. Progeny of varying ages can be seen just about anywhere in the Firebase; either in rows of cozy bedding or baby carriages (for the abundance of claimed and properly registered children), or in the stacks of baby cages that once again await transport to the slave orphanages (for the multitude of newborn bastards).\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nRepopulation: The Colonel has spent considerable savings creating and incubating a slave that looks exactly like a younger version of her (but with that steel collar she's wearing, she'll never fool anyone). The Slave has since been repeatedly fertilized with The Colonel's DNA, since The Colonel has no desire to get pregnant herself. The Slave is on many fertility pills, and is currently kept in a special secluded part of the Firebase to study child-rearing skills and wait out her ${hyperPreg0}pregnancy, after which she will train and heal up to recover. Of course, next year, The Slave will be fertilized again, to add another batch to the pile...\n`;
					}
					break;
				case 'Eugenics':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nTo ease The Colonel's hostility towards Eugenics, you have gifted her with a very rare and prestigious personal vehicle to demonstrate the pedigree of the Elite: you have given The Colonel a custom-built designer Super Car, designed to allow her to drive flawlessly both on-road and off-road in finest aesthetic style, whilst boasting excellent speeds all the same. It also has absurd durability and reliability, able to survive and continue driving even after sustaining direct RPG fire. It boasts a rare lightweight composite material chassis, onboard voice-activated AI personal assistant, advanced ballistics-retardant windows, Kevlar-lined run-flat tires, mine-resistant undercarriage, integrated long-term life support and CBRN protection systems, and even a passenger's seat to bring a friend along. She is floored by how exotic and capable her magnificent new car is. You see her using it quite a bit too, for both joyrides and casual errands around the Free City.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFor the male soldiers who eat in-house, every meal comes with a free condom. Instead of a condom, female soldiers are instead given a tiny packet of contraceptive pills that are disguised as sweet tasting hard candies.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFree booklets about the many risks of unprotected sex are available by the stack in most rooms of the Firebase, and a great deal of the porn available to the troops feature attractive performers who use condoms exclusively.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMany of the slaves serving here are sterilized, and those that are not carry condoms on their person at all times.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery new slave is rigorously inspected by 'personnel' experts send by your arcology's Elite. Those few that meet the exacting standards are housed in the superior individual cages in the rear of the slave processing area. Their training will be distinctive.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area now includes a small den serving as an office for soldiers interested in taking the arcology's Elite citizenship exams. As you pass by, you actually see one of the newer troopers leaving the den. There is a hopeful look on their face.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe simple staff room next to the storage room of the barracks has been expanded and upgraded to serve as a luxurious 'Officers Club'. This warrior lounge admits only those of adequate rank and status, and comes complete with a private bar, private theaters, a conference room, an indoor garden, and premium, exclusive sex slaves.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA finely groomed coterie of Elite armorers descended from higher society has been assigned to the Firebase on a permanent rotation basis. They work diligently on repainting, retooling, refurbishing, or recalibrating each and every piece of kit, as needed, in between missions while using only the finest of modern instruments and materials. As such, your troops represent your arcology with some of the best kept battle gear in the world.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a discreet team of 'personnel experts' to be found in each station of the command center. These scorekeepers are charged with constantly tallying the talents, successes and failures, and genetic traits of the commanders and officers on duty. Those with the best scores at the end of each half-year are recommended for immediate promotion to Elite status by reports that the teams compile. For their own part, they are very steadfast and brutally honest in their work, and seemingly immune to intimidation and bribery.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe drug laboratory has been supplemented with a luxurious rehabilitation clinic, where soldiers and staff who tend to indulge a bit too much and need to regain control of themselves are free to get the help they need to take back their dignity.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the lockers and duffel bags of the majority of Firebase soldiers, you can find a variety of self-help books and self-improvement literature. You can also find several bundles of fine dress suits and/or dresses, along with some custom tailored casual clothing. There is usually also an assortment of handkerchiefs and other accessories, which vary in quality depending on the inventory's owner.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour slave-capture drones have all been covered with tiny loudspeakers that emit messages reassuring the soon-to-be-captives that the drones engage with that their time will now surely be better spent serving their betters within your arcology.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage has an additional service room installed, but this one has a special purpose; it is a private command facility intended for the creation, improvement, and implementation of newer and better armor formation strategies and maneuvers. These stratagems are cutting edge by global standards, pioneering the complex science of attacking a variety of opposing forces so as to minimize overall casualties and maximize the demoralization, pacification, and capture of enemy personnel.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery vehicle crew leader in the Firebase is an Elite, and is thus privy to the contents of these strategy meetings. As such, every vehicle crew has a great deal of power in determining their own armor kits and loadouts to best fit the tactics used for their next mission. Every crewman is handpicked, and every single vehicle unit is unique, with the only similarity being the common ground vehicle chassis types between them. Your tanker crews have been known to snatch victory from the jaws of defeat with the help of their unique and unpredictable individuality and unconventional unit compositions throughout their careers in your armor units. Inspired of these glorious service records, their offspring often choose to become vehicle crewmen themselves.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar is a cavernous place, and when takeoffs and landings are not in progress there are many open spaces for gangs of ambitious air force understudies to gather around veterans and teachers and learn more about their craft, as well as lots of places to simply kick back with a good book and await the next summons for a CASEVAC, air assault, or assault support flight mission. At any given time, these open spaces are in heavy use by the airmen and airwomen who are not busy at work here. The longest wall of the hangar is also host to a massive and beautiful mural altogether depicting all of the renowned aces and flight instructors the Firebase has known throughout its history thus far. While artful, this mural also holds the promise that through this multitude of Elite personnel, the hangar should always have a rich pool of skillful pilots and maintenance personnel for the good of the service.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWithin the numerous transport aircraft of the hangar, a unique change can be found; since greater human quality is a focus and priority of the Firebase, the seating for passengers has been completely replaced by rows of specialized transport pods; every passenger now has a life-support enabled, environmentally-sealed, shock-absorbent, blast-resistant, and fireproof individual pod to climb into and remain inside of until their aircraft arrives at their intended destination. These pods are welded into the interiors of every passenger section, leading to an extreme degree of passenger survivability, even when crashed or shot down by enemy fire, but at the cost of smaller troop payloads once the transport aircraft touch down. While it currently is uncomfortable for the troops, once the proud few, specially bred and registered children of the current generation of Firebase troops grow up and seek to follow in their parent's footsteps, these advanced 'seating' arrangements will be downright necessary to protect the lives of the Firebase's greatest and scarcest asset; it's Elite fighting personnel.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nNear the barracks, the residents of the Firebase are grateful to have the aid of the Aristocracy Academy. This impressively large and well-equipped facility is staffed with Elites from all over the arcology, and these impeccable men and women carry out all the services needed to help this place function as a part-time 'Finishing School' for all members of the Firebase; the curriculum specializes in training unkempt soldiers and staff to become proper ladies and gentlemen; how to dress, speak, behave, dance, and handle a wide variety of decidedly civilian scenarios in the classiest manner possible.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe outside entrance of the Firebase features a distinguished officer's academy, complete with a state-of-the-art lecture hall, multipurpose war rooms, combat drill chambers, private lodging cabins, a few sand pits, and many other training necessities. The faculty consists of decorated veteran officers, and throughout the structure there are stationed honor guard sentries assigned to ensure the safety of the Elite officer cadets busily training all around them.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe Firebase is clean and posh; whatever the festivity or facility, the staff and soldiery carry themselves with an air of superior esteem and dignity and are given only the finest of materials and tools to use when performing their duties. However, a strong social strata is clear those proud few who passed the Elite testing make up the overwhelming majority of the higher command staff and officer ranks, whilst those who have not passed the test are mostly their subordinates. Elites of the Firebase sit first, eat first, and get first pickings of battle loot, captives, promotions, and of course, sanctioned breeding partners. Without fail, everyone in the Firebase has taken the Elite test, and without fail, everyone Who flunked it has been issued their complimentary vasectomy or hysterectomy.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEugenics: The Colonel has her 'Right To Breed' Certificate hung up on her pavilion for all to see. She easily passed all of your society's tests, and is now proudly among your Societal Elite. Next to her certificate you also see a framed picture: this is a photograph she took on her tablet not long ago, showing an Elite staring into the camera and holding his bloody nose after he pressed her just a bit too much about having children with him. On her pavilion, you also see a small cardboard box containing some top quality condoms and spermicides. It seems she's enjoying the privilege of having her pick of any attractive youngster she desires on the upper levels.\n`;
					}
					break;
				case 'Gender_radicalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nThe Colonel is a sophisticated sort of woman; the kind that is genuinely skeptical of the crass, fast & loose values of your raunchy Radicalist society. To ease her further into the Radicalist mindset, you've gone all out: You've carved out an unused sidewall of the Firebase to build her a private champagne room, complete with several stripper stages with exotic lighting options, highly trained stripper slaves, an AI DJ, a marble bar counter with barstools, a cozy long sofa with cooler armrests, and plenty of chairs for lap dances. When she first entered this little house room, she also found the extravagant lingerie wardrobe you've had made to her exact measurements, for her off days. And to ensure that her after-hours retreat is extra enjoyable, you have not forgotten to provide her with a specific premium surgery voucher, to grant her a free organ cloning & grafting futanarization procedure at any clinic in the arcology, at any time of her choosing.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMost foods within the Firebase are now laced with minor and tasteless testosterone additives to gradually promote more masculinity in the troops, while the slave food is specially made with estrogen additives to foster femininity. With each meal, troops are also given a tiny plastic vial of lube, for later use.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMuch of the porn and movies seen in the Firebase now feature obvious trannies along with some very convincing traps and sissies. They are all depicted as submitting to powerful characters of both genders, and even the occasional futanari, both sexually and non-sexually.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSome of the slaves you see now sound, appear, and act very effeminate, despite their gender. Your gay male soldiers use these slaves quite a bit, and your female soldiers sometimes even chat with them on occasion.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThanks to the guards, the many dickgirl slaves the Firebase brings in are discreetly offered considerable rewards to sodomize a fellow dickgirl. During daily showers, the slaves are lined up in groups near the shower wall, and given a bar of soap that they are amusedly instructed not to drop.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe pleasure dens have been neatly rearranged into a small grid of sorts, with straight walkways lying neatly between them, and they now feature gaudy red neon lighting alongside clear glass window booths for the androgynous slave whores inside to advertise their mouths, butts, and if available, cocks. It all comes together to form a seedy 'Red Light' district of the Firebase, one amiably reminiscent of its counterparts in some Old World cities.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe storage room of the barracks has become something of a soundproofed strip club. With crates piled high to the sides to make room, a dozen stripper poles, huge speakers, sofas, a DJ booth, and private 'dance' booths come together to dominate the mood. Soldiers and dancers go to and fro, and the room smells strongly of cigarette smoke, alcohol, and ass.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEach rack, shelf, and locker in the armory has an obnoxious neon sign above it indicating its purpose and contents. The metallic walls and flooring are covered in frequently updating, advanced motion picture wallpapers depicting animated illustrations of Firebase troops corralling naked civilians and surrendering soldiers at gunpoint. In these animations, the few captives that are not being prodded into transports are being held down and taken anally. The buttstocks of most rifles and machine guns in the armory are hallowed out to make room for a slim vial of lube to be slotted in too. Just in case.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a discreet row of small cubicles near the exit of the command center. Each cubicle has an anonymous but skilled sex slave inside and a square hole and condom dispenser at waist level so that deserving commanders have a place to relieve their loins and stress after a tense mission. They cannot discern any details about the slave on the other side; the gender and looks of their attendant are as unknown to them as they are irrelevant.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a funky nightclub room branching out of the drug laboratory, and it is a great place to experience new highs. There is a DJ table with jumbo speakers, and a technicolor disco ball overlooking a dancefloor surrounded by colorful sofas; this is a place where the many partygoers in the Firebase are invited to collectively let loose as they try out the newest recreational substances the drug lab has invented.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase personnel can often be seen wearing obnoxious makeup, taking futanari-optimized herbal products & supplements, and renting the services of the dolled-up futanari-slaves available.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour flying hunter-killer drones have been modified to entirely resemble the male genitalia, much like giant flying realistic dildoes; the main hull and body of the drone looks like a giant ballsack, whilst the main armament has been redecorated to look like a giant cock. Of course, the tracers these dick-drones fire are also bright white.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOn the longest wall of the garage is a cartoonish motion picture illustration depicting quite a lively, lurid scene; every fighting vehicle used in the Firebase is depicted on shown with a phallic turret, and they are all shown to be blasting away at enemy vehicles and fortifications with very fast streams of burning hot semen that melt them on contact.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOf course, due to their immense power, every combat vehicle in the garage is regarded as being 'male', and to celebrate this, every gun barrel and missile launcher that your ground vehicles use have been specially customized to now resemble phalluses. Your dick-shaped cannons now strike as much fear into the enemy as the vehicles they are attached too.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWith its high-ceiling and many light fixtures, the hangar is distinctive in its appearance and function; the conventional overhead lighting has been replaced with provocative neon lighting that makes the work stations below perpetually look like naughty nighttime city streets. And in a way, they are. Chain-smoking tranny hookers streetwalk the hangar's many dark corners, while the bathroom's many stalls are infested with scribbled vulgar writings and well-used gloryholes. A shady looking deli shop and adjacent ATM machine lie near the entrance too, their flickering lights almost daring the staff and pilots of the hangar to enter.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe aircraft themselves have taken on a particular mood too. The individual aircraft are refereed to as 'male' so as to acknowledge their inherent power and superiority on the battlefield. Bright neon lights line interiors of the cockpits and/or passenger sections of each craft. The nose-mounted and door gunner armaments of the various craft have been modified to resemble dicks too, even going to far as to have the ammunition drums attached to their bases resemble ballsacks. Of course, the tracers these phallic weapons fire are colored bright white too, much like semen. Therefore, the enemy units that find themselves facing their wrath are quite literally 'Fucked'.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAdjacent to the command center is the notorious 'sex stage'. Exhibitionism is king here, obviously. Those off-duty employees who have something to prove, something to show off, have a big load to blow, or are just a bit drunk are known to bring their partners and/or slaves to this place to put on a good show for their fellows. The stage itself is just an elevated platform with a few stairs, and atop it is a large but otherwise simple leather couch surrounded by several king sized mattresses to allow for quite a few 'performances' simultaneously. In front of the stage are a few folding chairs, folding tables, and drink coolers, and during busy nights there will be competitions in which bookies pass by to collect bets.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe grounds leading up to the entrance admitting land vehicles are paved over with an impressively thick layer of cement. This cement layering is fortified with numerous concrete barricades and proximity mines, and although your vehicle units know which routes to use to avoid these traps, an invading opponent will not.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a powerful trend of redefined sexuality in the Firebase, as many of the soldiers enlisted in your service have come out as openly homosexual, bisexual, or pansexual. Futanari transformation options have taken the public psyche by storm as well, as your gay, lesbian, and bi/pan-sexual personnel have taken the plunge and joined the futanari movement. One can see the results of their surgeries proudly on display during the more frequent public nudity and public sex episodes visible throughout the environment as well. Especially notable is the expression and recognition of gender within the Firebase; every free person who has been sufficiently promoted is regarded as being 'Male' and every slave and rookie soldier or staff member is considered as female, regardless of their actual biology. Finally, the remaining demographic of ardently heterosexual men and women find their refuge in the new fashion for sexy futanari slaves. These slaves are prized and shared for their sexual versatility, with their tits, curves, genitalia, and skills, they thankfully have something for everybody. These juicy innovations form the core of your fluid, lurid cultural norm.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nGender Radicalism: The Colonel is now a futanari with a hefty package; you see her having fun with it quite often with the slavegirls on her couch. When she's not on her pavilion you see her slaves cleaning off cum stains on the couch and table; it seems she enjoys having her own dick and balls quite a bit.\n`;
					}
					break;
				case 'Gender_traditionalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nThe Colonel is a modern 'liberated' sort of woman; the kind that is genuinely skeptical of old-timey priorities like marriage and family. To ease her further into the Fundamentalist mindset, you've gone all out: You've carved out an unused sidewall of the Firebase to build her a private master bedroom, complete with a custom-made double king-sized marital bed, with a programmable memory foam mattress & various in-built massage features. When she first entered the bedroom, she found the deluxe diamond ring set you bought for her and her future spouse. She also saw the extravagant modular wedding gown you've had made to her exact measurements, for her special day. And to ensure her special day is extra special, you have not forgotten to provide her with a specific premium surgery voucher, to grant her a free virginity restoration procedure at any clinic in the arcology, at any time of her choosing.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe meals served in the Firebase come with free chocolates and other sweet natural aphrodisiacs to put the troops in the mood to make love with the submissive feminine slaves all around them\n.`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPosters pinned-up all around the Firebase depict gorgeous naked women in tantalizing poses, and sleek porn-filled tablets featuring lots of deep vaginal creampies are passed around everywhere. The female soldiers have been issued free paperback copies of old romantic classics as well.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSome of the slaves you see are very feminine, which matches their beautifully natural vaginas and the pregnant bellies that some of them have. All of these slaves are sporting demure lipstick and neatly combed hair.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nUniforms are issued to the slaves present, in which slave with pussies wear simple utilitarian prison dresses, whereas slaves with dicks wear simple utilitarian jumpsuits. Every cage contains a Free Cities graphic novel omnibus featuring the sexually explicit chronicles of a Gender Fundamentalist slave.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe bars in the common area have been refurbished with fine wooden counters, barstools, and cozy couches for drunks, and are stocked with a continuous supply of some of the world's finest stiff drinks, all in remembrance of manly tradition. On request the slavegirls wear bunny outfits or classic Old World barmaid getups along with lipstick to maximize their appeal. They also give handjobs on demand to the soldiers while they drink, and sometimes flash soldiers that walk by if business is slow.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe dormitories are given delicate care, as a small legion of slave maids service the dorms at all times. Housed soldiers no longer need to clean up after themselves at all, and when the slave-maids aren't making the beds, they are warming them.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMost stations of the armory are now staffed with a wide variety of topless females, clad only in boots and pants fatigues. However, these are not slaves, but rather qualified maintenance specialists and quartermasters who have been sufficiently compensated for their now-mandatory lack of dress. Their varied sweated-sheened tits sway and bob freely as they type reports, clean weapon systems, repair armor rigs, restock racks & shelves, and carry ammunition cans to and fro.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center has been furnished much like a bachelor's mansion; a mini bar, plush spinning chairs and leather sofas, wallscreen TVs mounted to walls and displaying high definition erotica, and most of all, lots of bunny suit-clad slavegirls going to and fro. The slavegirls are giving out soft drinks and blowjobs in equal measure while the commanders run their ops, and even now you can see one kneeling between the legs of a sitting logistics officer as he reviews supply shipment reports for this month.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a classy condominium branching out of the drug laboratory, and it is a great place to experience new delights. There is a small kitchen with a few chefs and waitresses, and a wall-sized wallscreen TV overlooking a dining room surrounded by discreet bedrooms; this is a place where the many romantics of the Firebase are invited to enjoy dinner and a movie as they and their dates sample the newest recreational substances the drug lab has invented.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase personnel can often be seen wearing proper pajama sets or negligees to bed, purchasing flowers & gifts for their crush or significant other, and renting the services of the beautified female-slaves available.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour flying pack-mule drones have been modified to entirely resemble the female genitalia, much like giant flying realistic fleshlights; the main hull and body of the drone looks like a giant fleshy vagina, such that the soldiers that these drones fly into combat with can simply reach inside the flappy drone-pussy and pull out additional magazines, grenades, medkits, rations, or whatever else the pussy-drone might have been packed with.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOn the longest wall of the garage is a cartoonish motion picture illustration depicting quite a lovely, lavish scene; every fighting vehicle used in the Firebase is depicted as being on parade, streaming past the arcology in precise rows of vehicles that form an endless tide of disciplined armor units obviously on their way to their next victory. Flanking the armor columns are a long crowd of women throwing colorful flowers of all kinds\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour crewmen feel very attached to the vehicles they have been given charge of, and as such every single vehicle is the garage has a feminine name and is affectionately regarded as 'female'. To celebrate this, every vehicle hull has been decorated with a beautiful high-resolution pin-up illustration of a unique, sexy, sassy, scantily-clad lady with her name (and thus that vehicle's name) drawn right next to her.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWith its high-ceiling and many light fixtures, the hangar is distinctive in its appearance and function; the conventional overhead lighting has been replaced with elegant chandelier lighting that makes the work stations below perpetually look like tables at a classy gala. And in a way, they are. Well-stocked juice bars occupy the hangar's busier corners, while the bathroom's many stalls are kept spotless by a well-staffed janitorial outfit. An inviting but expensive deli-grocery shop and adjacent ATM machine lie near the entrance too, their clean presentation almost beckoning to the staff and pilots of the hangar to enter.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe aircraft themselves have taken on a particular mood too. The individual aircraft are referred to as 'female' so as to acknowledge their beauty and their subservience to the will of their operators. High Resolution colorful pin-up girls adorn the exteriors of every aircraft in use via advanced and interactive motion illustration wallpapers, with every individual aircraft having a bodacious, responsive, and unique mascot character representing it. Therefore, some of the enemy units that find themselves targeting your aircraft at close range are sometimes reluctant to open fire upon them, not desiring to destroy such lovely ladies.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAdjacent to the command center is the esteemed 'wedding hall'. Matrimony makes its home here. Those off-duty employees who are ready to make their love and commitment to their partners official are known to bring their partners and/or slaves to this place to say their vows in the sight of their fellows. The stage itself is just an elevated platform flanked by majestic arches, but atop it is a large pulpit from which the ordained officer guides the soon-to-be newlyweds through the wedding ceremony. In front of the stage are a few polished chairs and ornately clothed tables. During actual wedding nights the larger of the tables are used for holding drinks, foods, and wedding cake, and during such events there will be all manner of jovial wedding games held.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe grounds leading up to the entrance admitting land vehicles are paved over with an impressively thick layer of sand. This sandy layering is fortified with numerous heavy tank traps, huge boulders, and camouflaged pillboxes, and although your vehicle units have nothing to fear from these obstacles, an invading opponent will not.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a powerful trend of tradition and conservatism in the Firebase, as many of the men and women enlisted in your service have tied the knot and taken the plunge into marriage, far earlier than their closest comrades had previously assumed they would. As sexual exclusivity and romantic attachment have grown, public nudity and public sex between soldiers have been on the decline. A stronger priority has been placed on couples' privacy as a result. Finally, more and more army wives are finding themselves pregnant, and some have already given birth. The children of Firebase couples are prized and raised by the entire community. Their entire childhood are a diversified, 'slow burn' form of training. By the time they are adolescents, every child will have has an excellent physical, vocational, and military education involving dozens of seasoned mentors. By the time they are adults, they've gotten a damn god sexual education too, and several enviable job prospects in both the Firebase and the wider arcology. This familial innovation you've introduced has formed a core part of life in the Firebase community.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nGender Fundamentalism: The Colonel has adopted three very young children that you often see her playing with. She's decided to give motherhood a shot, and surprisingly she even keeps a few dresses in her collection for when she goes on outings with them. The children are all named after different people she's deserted her old world army with in the past. They idolize their mother and try to imitate her as much as they can. Her soldiers know to give them a wide berth, and to do their part in keeping them out of the many unsavory and hazardous parts of The Firebase.\n`;
					}
					break;
				case 'Body_Purism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nA powerful experimental serum has been synthesized within your arcology recently, and it has been making waves in the private medical circles of your domain for its vast effects in improving test subjects' natural immuno-responsiveness, bone & muscle density, cellular regeneration, cognition, and lifespan. Still very much a prototype, and still far too expensive for any sort of widespread use, it is available only in small, specially ordered quantities. One such quantity has been gifted to The Colonel, via a sealed serum syringe package. If, one day, The Colonel decides that she trusts you enough to inject the battery of syringes into her bloodstream, she will experience a complete bodily rejuvenation, free from any kind of surgery or artificial modification. At any rate, The Colonel was genuinely impressed that you and your people believe in the Purism ideal enough to make an actual medical innovation based on it.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll of the food is rigorously examined before passing into the Firebase for preparation. It is not even kept in storage for long, often being cooked and served within hours of arriving, for optimal freshness. It is all healthy too, with plentiful salads, fruits, and vegetables served at every turn.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFree Cities' premium Wellness magazines featuring both articles about health & purity and porn spreads depicting spotless & gleaming all-natural models are freely available in magazine racks throughout the Firebase via monthly delivery.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA significant portion of the slaves in the Firebase have very clean, pure skin, and look reasonably healthy. None of these slaves have breast, butt, or lip implants of any kind.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe slave processing cages have an obsession with cleanliness. Slaves are made to drink large amounts of thoroughly filtered water everyday, and each morning, every captive interred here is given a soapy sponge and a hand towel and made to make the facility spotless, at gunpoint. Purity in all forms is the pervasive reality here.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMassive air filtration machines are installed into the walls of the Firebase to help purify the area in every way possible. The effects are felt everywhere, but are most clearly felt in the common area, where the air takes on a whole new level of crispness and clarity. It feels very pleasant to be here, and the new recruits often comment on it as they sip water drawn from the new alkaline water dispensers located throughout the commons alongside the new indoor plants. The filters and new water dispensers are all surrounded by lush, slave-tended flora as well, giving the Firebase a luxuriant appearance altogether.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe barracks has had an additional wing constructed, with the express purpose of hosting several dozen compact private massage rooms for deserving soldiers. Each room is well stocked and soundproofed for total serenity, and the massage tables have a hole near their centers that allow them to double as 'milking' tables too.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTranquil, is this armory. Soothing live music is being played by a professional musician in the background while a platoon files in to get equipped, setting them into a peaceful mindset before they head off to fight their little war. Meanwhile, a set of powerful but pleasant calming incense sticks burn in each corner of the place, slowly but forcefully easing their anxiety. Next to the central quartermaster's booth are a group of large meditation mats for several simultaneous squad-level group mediation sessions. It all comes together to create an optimal environment, free of all toxicity and fear.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center is verdant and clean. Potted plants and flowerbeds occupy quite a bit of the floorspace, the area has a lovely smell overall. There is even a modest micro water fountain set up on the coffee table. Where appropriate, the equipment and surfaces of the area are painted in calming green, brown, and blue hues as well, solidifying the focus on nature. The ceiling above has a stunning nighttime sky painting as well, giving the aesthetic impression that the command center is actually part of the great outdoors.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the 'clinical trials chamber' of the drug laboratory facility, there are many man-sized pits that comprise the floors of the space; when a new drug variant is ready to be tested, the pits are filled with the drug substance, and then slaves are lowered slowly into them. Every detail of the slaves' vitals are monitored closely for every hour they spend in the pits, and every slave that manages to emerge from their pit is a new creation indeed.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers and staff within the Firebase are very careful about their health and consumption, and they are very keen on purchasing, refrigerating, and later consuming a myriad of healthy foods, detoxifying herbs, lots of flavored and mineral waters, and handmade skin creams.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour combat-drones look like flying plants, with mud and thin-topsoil integrated onto their frames, and heavy foliage, moss, or seaweed pinned down onto them. This allows the drones to integrate better into many different terrain types in preparation for ambushes or assaults.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIt is worth noting that the garage has taken on many characteristics of a sandy beach, harkening back to the amphibious landings of times both past and present. The entire garage floor is covered in a thick blanket of sand, complete with small sand dunes, patches of marram grass, rocky outcroppings, an enormous overhead fluorescent light fixture to mimic the sun, and even an artificial breeze from powerful new air filtration systems. Work stations are protectively sectioned off with hand-crafted wooden palisades, and vehicles are tended to on raised wooden platforms meant to help keep the sand out of the machinery. Meanwhile tiny communities of crabs, lobsters, frogs, and other natural amphibians gravitate towards the small refillable pool installed next to the far wall of the building.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWithin the garage, extreme attention to detail is paid to the subject of camouflage. Every ground vehicle is camouflaged extremely well, with a hefty reserve supply of custom handmade and semi-adhesive frost, mud, foliage, rubble, and many other forms of concealment kept on stock at all times to tailor the appearance of each vehicle precisely to the mission. The staff of the garage are some of the best vehicle camouflage outfitters in the world, and your ground vehicles are often not spotted by enemy combatants until it is far too late.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe floor of the hangar is a thick bed of rich, moist brown soil, complete with its own grass patches, stone footpaths, and flowerbeds. It is a lively place, and spaces that are not filled with clean and filtered air are rather filled with the smell of burning hemp and soft melodic music. The hangar's breakroom has become a yoga room, complete with hired instructors, and the various workstations often feature little potted plants that have been given pet names by the staff. Moss and vines are covering many of the walls in the hangar, with overgrowth being regularly pruned by on-slaves when there are no other duties to perform. The same can be said for the weeds that frequently crop up throughout the facility.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe aircraft deployed from the garage are distinguished for their eco-friendliness. They are maintained and flown with a very low carbon footprint and heat signature thanks to the domestically-made custom fuels and engine systems employed to keep the Firebase's impact on the natural environment minimal. Your air force is proud to do all that it can to preserve the FIELD in BATTLEFIELD.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhereas some peoples make their camps within the forest, your people have their forest within their camp. The lush botanical gardens grow proudly before the entrance of the common area, and they are sight of behold. Trees, bushes, and flowers in a dizzying myriad of colors and sizes are arranged here with all the ingenuity of the Firebase's precise and dedicated gardeners and floral hobbyists, who regularly volunteer to prune, water, and weed the garden and supply the special nutrients needed to sustain the plants without authentic sunlight. This fan-sourced plant project is a fine testament to the beauty of nature's organic design.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the entrance grounds to the arcology's Firebase, there is a peaceful-looking miniature forest (or jungle) to be found. However, for an invading opponent, this place will be anything but serene. The few patches of tall grass or thick mud, rows of flowery bushes, lively swamps, or alcoves of blossoming trees may contain anything from punji traps, to tripwire explosives, to natural predators, to hidden gunner nests. Departing or returning troops can safely pass using the explosives-rigged, sniper-guarded roadway the circumvents all of this, but your enemies have no such luck.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nHealth and Purity have taken on special importance in the Firebase subculture. Everyone here has had their bodies picked clean of implant s and tattoos, but the purity does not stop there. The troops have abandoned many substances considered unnatural, and they only consume alcohols, tobaccos, and opiates that are homegrown and processed within the Firebase under the very strictest of hygienic conditions. Even more impressive are the sub-contracted flash-cloning modules employed within the Firebase's intensive care facilities; great pains are taken to replace battle-damaged body parts with vat-grown copies as needed. Longevity and Harmony seem to be strong personal priorities for most individuals here, and this is visible in the way they treat themselves and their environment.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nBody Purism: The Colonel is looking a lot fresher; a mixture of curatives, moisturizers, and tattoo removal can do wonders, apparently. She seems to be taking much better care of herself too. You do not see her drinking or drugging as frequently as she used to, and she even uses a lot more 'All Natural' products than before.\n`;
					}
					break;
				case 'Transformation_Fetishism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nAn extensive and revolutionary cybernetic modification scheme has been perfected within your arcology recently, and it has been making waves in the private medical circles of your domain for the vast effectiveness of its implanted bio-synthetic bone & muscle reinforcement weaves, and ubiquitous subdermal nanite colonies for enhanced cellular regeneration, immuno-response, cognition, and lifespan. Utilizing extreme bio-mechanical prototypes, and being far too expensive for widespread use, it is offered only to select VIP's... Such as The Colonel, who has already been gifted a paperback manual detailing exactly what her slot-reserved surgery will entail and provide. If, one day, The Colonel decides that she trusts you enough to consent to the procedure, she will experience a complete bodily transformation, free from many weaknesses of flesh.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nDishes served in the Firebase all come with thoroughly processed meat, and vending machines containing all manner of processed snack foods are widely available.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are new magazines and tablets full of pornography being given out and traded between troops in the Firebase, and they are loaded with scenes of surgery-enhanced bimbos being used and enjoyed in all manner of ways.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA significant portion of the slaves in the Firebase have breast, butt, or lip implants of varying sizes, giving their assets a very well-rounded, almost uniform look.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEach captive brought to the cages is 'initiated' by surgery: Facial surgeries and basic implants are an experience every slave endures, and the mirrors in every Cage do not allow the inmates to forget what has been given to them.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA small den serves as a compact plastic surgery clinic off the side of the common area. Its reputable surgeon frequently speaks to your troops about her services for both male and female clients, and often tells stories to anyone interested about how she successfully pulled off some of the more extreme procedures the Free Cities are now notorious for.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe bunkbeds of the dormitories have undergone a radical change: Each on now has two 'lite' tanning bed roof attachments, which can be pulled over the top or bottom bunk to gradually change the user's skin to whatever color they desire whilst they sleep, while also providing extra warmth. Quite a few of your soldiers now sleep naked and eschew the use of blankets. They have interesting new skin colors as well.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe tables, chairs, doors, booths, racks, shelves, lockers, and maintenance utensils of the armory are made from the latest in durable lightweight poly-plastic and composite metallic materials, giving the armory a very post-modern and space age feel. Every surface and door features small motion-sensitive adjustable lights too, illuminating every inch of the armory and forcing troops to take note of the small details in their war gear. As a final touch, the female staff members assigned to the armory have been given obvious breast implants. This is an armory of the future.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center seems to have such a harsh mechanization focus that it comes just short of OSHA-compliance violations. Thick and high voltage power cords, electrical wires, and reinforced fiber-optic cables are ran and draped all over the command center's floors, walls, and tables. They are only kept in line by dozens of channel raceway mounts placed throughout. Large and powerful new heavy computing and printing machinery can be seen and heard running intensively all around as the staff put them to constant use.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the 'clinical trials chamber' of the drug laboratory facility, there are many man-sized mechanical sarcophagus pods that line the walls of the space; when a new drug variant is ready to be tested, the sarcophagi pods are loaded with drug substance, and then slaves are quickly loaded into them. Every detail of the slaves' vitals are monitored closely for every hour they spend in the pods, and every slave that manages to emerge from their pod is a new creation indeed.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers and staff within the Firebase are very liberal about their appearance and substance usage, and they are very keen on researching, purchasing, and later using a myriad of body scent additives, synthetic 'designer drink' concoctions, skin and hair dyes, and collapsible handheld electronics.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour combat-drones look like flying mirrors, with digitally-rendered reflective panels integrated onto their frames, therefore enabling them to better replicate the many different environments they will find themselves in, in preparation for ambushes or assaults.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIt is worth noting that the garage has taken on many characteristics of an amphibious assault ship's well deck, hearkening back to the amphibious landings of times both past and present. The entire garage floor is covered in a thick layer of water, complete with hoses and drains, shallow water fishes, rows of standardized fluorescent lighting, and even a powerful breeze that is felt every time the main entrance 'ramp' of the 'well deck' is lowered to allow entry or exit for both personnel and vehicles. Work stations are sectioned off with pre-fabricated synthetic walls, and vehicles are tended to on heavy hydraulic platforms that can be raised at will to assist crews in their repairs. Meanwhile, captured crabs, lobsters, frogs, and other natural amphibians are grilled regularly at the community barbecue that is set up at the far wall of the facility.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWithin the garage, extreme attention to detail is paid to the subject of versatility. Every ground vehicle is fitted with a hefty retractable amphibian kit complete with flotation and propulsion mounts, wide tracks or tires to enable operation in arctic and swamp environments, and a remarkable degree of automation. These expensive augmentations are made to allow each vehicle to rapidly adapt to just about any mission requirement in the field, and transition from one combat environment to another without losing operational momentum.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe floor of the hangar is a thin arrangement of pre-fabricated composite plastics, complete with its own metal grates, LED-illuminated footpaths, and 3D holographic display tables to scan and analyze debriefed aircraft and indicate damaged and worn out components. It is a controlled environment, and there are few spaces that are not flooded with screen lights from one information display or another. The hangar's breakroom has become an additional flight control room, complete with additional specialists that help coordinate landing and repair efforts and maximize overall efficiency. Meanwhile, primitive nanite colonies originally intended for autonomous wall and floor repair are now covering many of the walls in the hangar, with nanite overgrowths that frequently crop up throughout the facility being regularly pruned by dedicated teams of search-and-destroy slaves.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe aircraft deployed from the garage are distinguished for their massive energy outputs. They are maintained and flown with a very high carbon footprint and heat signature thanks to the domestically-made custom nuclear-powered engine systems employed to ensure that the Firebase's air power is extremely capable. Your air force is proud to do all that it can to channel the FIRE in FIREBASE.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhereas some peoples make changes to the technology they use, your people have their technology make changes to them. The brightly backlit transformation tower stands arrogantly before the entrance of the common area, and it is a sight of behold. Inside the tower, Robotic arms featuring finely-calibrated surgical instruments and independent AI operational systems whirr overhead in a dizzying variety. Those who enter always leave exactly one hour later, physically transformed in some manner, be it minor or major. The Firebase's precise and dedicated machinists and hacker hobbyists regularly volunteer to mod, update, and debug the devices here and keep it supplied with all the synthetic parts needed to continue making modifications to those who enter. This fan-sourced mathematical masterpiece a fine testament to the wonders of artificial design.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the entrance grounds to the arcology's Firebase, there is a rustic miniature township to be found, complete with paved roads, brick houses, and even its own town hall. However, for an invading opponent, this place will be anything but welcoming. The few 'houses', 'shops', 'diners', and other structures feature anything from explosives-rigged cars parked outside, to hidden snipers, to hidden anti tank teams. Departing or returning troops can safely pass using the explosives-rigged, sniper-guarded roadway the circumvents all of this, but your enemies have no such luck.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEndurance and Adaptability have taken on special importance in the Firebase subculture. Everyone here has taken on some level of personal enhancement; Faces and other body parts surgically lifted, breasts and buts shaped up with implants for the ladies, and plenty of personalized tattoos abound. 3D printed designer foods, lab-concocted superdrinks, and experimental nanotech drugs are not only a fashion, but a focus, as the punks of the Firebase race towards the future. Even more impressive are the sub-contracted bionic installation modules employed within the Firebase's intensive care facilities; great pains are taken to replace battle-damaged body parts with domestically-manufactured replacements as needed. Evolution and Progress seem to be strong personal priorities for most individuals here, and this can be seen in the way they push themselves to become... More.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTransformation Fetishism: The Colonel is sporting some very small breast and butt implants, just enough to undo some of the recent sagging she's been secretly bothered by. When she's not properly dressed, your trained eye can detect that her tits and ass are just a little too round and perfect nowadays to be fully natural. Nevertheless, she's happier with the way she looks now, and so are you.\n`;
					}
					break;
				case 'Youth_Preferentialism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nYour influence has long given you an inside track on the bleeding edge developments in the world of Youth Enthusiast pharmaceuticals, and this is exactly the reason you've been able to get and give out two small vials of the lauded 'Benjamin Serums'. The first vial of the powerful Benjamin Serum, when metabolized, will radically reverse the aging processes of the body, so as to gradually halt and then continuously reverse all of the effects of aging within the user. After enough years have passed, and the user is on the verge of regressing back towards adolescence or even childhood, they can ingest the second vial to restore their body back to normal functioning. Surprisingly enough, The Colonel has already taken the first vial, and is already looking a bit younger for it. You eagerly await the passing of years, so as to see just how far back The Colonel will allow her age to regress. You've always wanted to see what she looked like as a younger woman.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe food choices are very novel and colorful nowadays, with lively menu options being served daily, and changing frequently. In general, it all looks and sounds very fun to eat, and some of the foods are quite sweet.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA good amount of the media being shown or enjoyed in the Firebase features predominately youthful casts and a great deal of attention to recent memes and pop culture. Some of the porn even features participants of questionable age.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPlenty of the slaves visible look to be on the younger side, and have youthful energy. They like to chatter amongst themselves in their scant time off-duty.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nNewcomers to the slave cages are strapped to a nearby inspection chair, and have their holes examined by a doctor for virginities. Those found wanting are surgically corrected. Each cage features a vibrant Free Cities comic omnibus that makes light of the daily realities of slavery.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe tables of the common area and walls of its numerous dens are now all painted with glorious graffiti, handcrafted through costly commission by your arcology's most creative young artists. The colorful designs make playful parodies of both the activities that go on at each respective surface, and the stationed slaves providing these services. Some of it even spoofs the troops themselves, all in good humor. One of the artists was even brave enough to draw a parody of The Colonel herself, and he even drew it on a table near her pavilion.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAn unused backroom is now the new 'Gameroom' of the barracks. Rows of gaming stands and arcade machines bring joyful noise to the Barracks as troops flock here to spend their off time on surprisingly innocent fun. The only slaves here are the numerous attendants staffing the concessions stands in the corner, giving out warm baked treats and sweets to those that approach.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA wide variety of music videos are played from the large wallscreen televisions atop the weapons, ammunitions, and amour racks of the armory. Across from each of them is a weathered but surprisingly comfortable plush sofa, where soldiers sip sodas or beers and smoke light sundries while they finish preparing their weapons and armor. The lockers and walls of the armory are also painted with some graffiti designs painted onto them by the troops themselves.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhere appropriate, the command center has been repainted from the ground up with bright neon colors, and some tables and chairs have even been redecorated with funky and exotic graffiti. On a large operations table, you see lots of painted 28mm miniatures sprawled out over a tactical map, obviously representing friendly and opposing forces the troops may soon encounter. Oddly enough, on some days there are also some potato chips, dice, rulers, and even 'rulebooks' on this operations table as well.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the bright lobby of the drug laboratory facility, there is massive fountain bristling with incredibly clear, vibrant waters. Oddly enough, visitors are encouraged to strip down and enter the fountain directly, to just soak their whole bodies in it for a time. Even more oddly than this is the fact that those that emerge from the fountain report miraculously having smoother skin, fewer pains, better vision, and more energy. Has the drug laboratory mastered the secrets of youth?\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThroughout each day, one is very likely to see the military population of the Firebase making casual and frequent use of energy drinks, candies, portable audio 'pills', aerosol graffiti cans, roller-skating wheel-heels in their shoes and boots, and long-term age-reversal treatments.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour support-drones are covered in graffiti, with myriad messages, patterns, and designs painted in every imaginable color and combination. When stealth is required, these flying canvasses are simply covered in miniature camo nets to subdue the intense color.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is an undercurrent of "artistry" prevailing in the garage. Graffiti is everywhere here; on the walls, on the tables, and even on the many mechanical tools and utensils applied in daily use. At the end of every month, each of the walls are cleared out with white paint make space for new creations. Each garage staff member employed here has worked both their technical and aesthetic artistry on various parts of both the garage and several of the vehicles it contains, with the use of various paints, aerosols, chalks, and stencils that the garage keeps impressive stocks of. Also, any piece of furniture or gear that is even slightly damaged or out of date is replaced immediately too, meaning that the garage always looks 'new'. Of course, loud music is on play throughout the garage, and every duty station has a different musician's works on their speakers. Parties are usually held whenever a new shipment of replacement vehicles arrives, or better yet, a new shipment of high-tech acquisitions meant to replace older vehicle platforms. So-called 'Legacy' systems are scorned for their advanced age, and both the maintenance crews and the vehicle crews regularly draw lots to determine who will operate on them next.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nRemarkably, artful graffiti is visible upon the surfaces of both the interior and exterior of every ground vehicle the garage has, with subject matter varying wildly from artist to artist. Crews and passengers are treated to the sight of the mechanics' handiwork every time they enter their vehicles. For combat operations where stealth and discretion are required, these are obscured by whatever camouflage materials are chosen, but in most raids and assaults these bright and daring prints are on proud display - and are often the last thing opposing forces ever see.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar is a pretty fun place to be most of the time. The strapping young flight technicians and pilots are very ambitious, and work hard to showcase their skills to their peers and superiors and get promoted so that they can start making more money. Of course, said money is spent on better gadgets and apparel; maintenance crews like to buy shiny and newly released repair implements to use and show off on the job, while pilots like to get their hands on ever-better flight suits and amenities to affix into their aircraft's cockpit. Every pilot like to personalize their cockpit, treating it as a second home.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase aircraft have a feature that many other aircraft do not: All over the front of each aircraft are bright and boldly written taunts enthusiastically spray-painted on by the pilot of that aircraft. Of course, these 'messages' are transparent from inside the craft and do not impede the pilot's field of vision in any way, but to your enemies, these juvenile taunts are often the last thing they see before they die.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAn impressive skating rink hs been built just next to the common area, complete with grindable metal railings, risky ramps, and broad curving slopes. Here soldiers and staff of all ages and stripes are welcome to give their all and spend time to practice or invent some new moves and cool tricks on their skateboards, roller skates, or wheel-heels. In addition to being a popular hangout spot, this place is an important proving ground of sorts, where social hierarchies are partially determined as visitors compete are prove themselves in yet another area of expertise\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the territory surrounding the Free City itself, there are several scenic and very innocent-looking campsites established, complete with folding chairs & tables, food & drink coolers, colorful tents, clotheslines, and port-a-johns. They sometimes even have impromptu campfires if the Firebase scouts occupying them have returned from their field exercises. These campsites act as listening posts that monitor incoming and outgoing traffic concerning the arcology, and if attacked, they can be abandoned and later replaced very quickly and easily.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe soldiers of the Firebase are generally both idealistic and hot blooded; always looking for a fight, with each soldier very assured of their own 'awesomeness'. Gossip and constant comparison between troopers is rife, and every soldier is vested in their interest in the latest 'tacti-cool' fashions, footwear, and equipment. Younger soldiers are prized for their mileage and potential, and given special care and attention when they first enlist. Those youngsters that show any special talent or unique ability are promoted and fast tracked as much as feasibly possible.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYouth Preferentialism: The Colonel looks much younger thanks to some advanced age treatment therapy she's gotten. She's got a bit more bounce in her step too, if that's possible. Everyday she's proving that her age is just a number.\n`;
					}
					break;
				case 'Maturity_Preferentialism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nYour influence has long given you an inside track on the archaeological discoveries made by the excavation and salvage teams that now dig up and study the Free Cities' very first [failed] arcologies. This is the very reason why you've been able to finally verify and procure a precious rare vial of the vaunted 'Methuselah Serum'. This recovered vial of the powerful Methuselah Serum, when metabolized, will radically slacken and prolong the natural aging processes of the body, so as to gradually and tremendously increase the overall lifespan of the user and preserve their physical and mental viability. Only after enough decades have passed will the user finally begin showing wrinkles, greyer hairs, and other signs of advanced aging as their body starts fight back to restore normal functioning. Surprisingly enough, The Colonel has already taken the serum, and is already looking forward to living a much longer, fuller life because of it. You now know what she will look like as an 'old' woman; not much different than what she looks like right now.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe food choices available are very broad, with accommodations made for the preparation of a very wide variety of classic dishes, all holdovers from the Old World or 'Free Cities originals' salvaged from the glory days of the first arcologies.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA lot of the porn, movies, games, and graphic novels distributed here seem to focus on magnificent MILFs or DILFs as either protagonists, love interests, or pure fanservice characters.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPlenty of the slaves visible look to be on the older side, and have a caution and sense of tact that is borne of their maturity. Many seem rather reflective.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe slave processing cages have the weight of history imposed upon them. Every new inmate is made to engrave their name once onto a wall or floorspace of their cage. When new captives come to inhabit the cage weeks later, they only see the evidence of the many slaves who were once where they are now, before being made to add their own names to that body of evidence and thereby join the annals of your Firebase's history.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area has been remade in grand style, now resembling a great hall from the noble medieval houses of old. The tables and chairs of the common area are now made from finely sculpted wood, with the borders of the common area now being marked by grand wooden arches that extend to the ceiling, masquerading as additional supports. The drink dispensers found here have been remodeled to look like large wooden kegs, and even the very dens that provide numerous services to the men and women here have been rebuilt with stone walls and thatched roofs instead of the usual pre-fabricated materials.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAn unused backroom is now the new 'Library' of the Barracks. Rows of bookshelves and reading tables bring quiet enlightenment to the Barracks as troops flock here to spend their off time on surprisingly cerebral pursuits. The only slaves here are the numerous attendants making rounds throughout the room, either tending the shelves or lending their assistance in finding certain books, as needed.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe armory has quite a few traditional touches; many of the shelves and closets here are made of hard and thick wood, and the central quartermaster booth has stacks of ordinance papers on file; upon leaving the armory, each soldier must sign off on every piece of equipment they are leaving with. However, they now do so with simple pen and paper rather than digital inputs. On the walls, there are colorfully illustrated posters displaying public service advisory messages for the benefit of the troops about to take to the field. The weapons and armors themselves have a bit of history behind them; each and every weapon and armor piece has its own unique name, given by its original owner, and the names of both every former user and every battle its ever served in are engraved somewhere upon it, giving each piece an almost legendary stature after enough time has passed.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center has an almost rustic look. Most of the original chairs and tables have been replaced with polished wooden variants, and the flooring and support columns have been given full wooden paneling as well to complete the look. The noteworthy details of each and every mission directed here are recorded by slave-scribes in large hardcover paper tomes that are kept in a section of the command center's huge bookshelf, adjacent to the other sections that contain many informative physical books written by former military officers, great leaders, and war heroes over the ages.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe darkened lobby of the drug laboratory facility is a great hall, built entirely from stone. However, it is a shadowy and quiet place; one that speaks of many secrets laboriously accumulated over time. Reinforcing this notion is the fact that the staff of the drug lab wear long thick robes with pointed hoods as they move, speak, and work silently, jealously preserving, guarding, and innovating upon the secret pharmaceutical recipes their cabal creates.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThroughout each day, one is very likely to see the military population of the Firebase making casual and frequent use of coffee drinks, stylish canes or staffs, hardcover novels and notebooks, aging or outright vintage alcohols, and massive cloaks that are often worn during any occasion.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour combat-drones are covered in scrawled bold lettering, with unique names, ranks, and nationalities painted onto each individual drone unit so as to depict the full identities of every person that particular drone has killed. When stealth is required, these flying memorials are simply covered in miniature camo nets to subdue the bright writing.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is an undercurrent of "legacy" prevailing in the garage. The names and summarized service records of distinguished or deceased maintenance staff members and vehicle crewmen are inscribed throughout the duty stations the garage. Realistic etched illustrations of both retired and legacy vehicle systems known to the Firebase have been rendered all over the walls of the garage as well. History is everywhere here; scrapes, burns, and tears can be seen on the walls, on the tables, and even on the many mechanical tools and utensils applied in daily use, and all of the evidence of use serves to add much character to the place. Furniture and equipment pieces used here have been in place for years, constantly repaired, sometimes tweaked, but almost never replaced. Each garage staff member employed here has contributed their technical mastery on various parts of both the garage and several of the vehicles it contains, and the evidence of this can be seen in the monolithic maintenance logbook and maintenance guidebook tomes that these staff members, retired and active, have written and stored on the garage's impressive bookshelf section. Of course, several retired mechanics and crewmen still spend much of their time here, relaxing at coffee tables and often trading stories and advisement with their somewhat younger active duty counterparts at each duty station.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nRemarkably, vehicle memoirs are written in dull but permanent paints upon the surfaces of both the interior and exterior of every ground vehicle the garage has, with every vehicle bearing a ballad of that vehicle's complete combat history. Crewmen, passengers, and enemies alike are treated to a small piece of your military's story every time they get near your ground vehicles, as these ever-growing ballads detail that vehicle's battle fought, kill count, hits sustained and survived, and so on. In most raids and assaults these detailed and boastful prints are often the last thing opposing forces ever see.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar is a pretty interesting place to be most of the time. The wise senior flight technicians and pilots are very pragmatic, and work hard to utilize their skills so as to protect their comrades-in-arms and ensure that their juniors live long enough to get promoted and replace them one day. Of course, said juniors spend their time learning under these expert veterans as apprentices or wingmen, always following their mentors around, assisting them, and learning carefully from each story told and demonstration given. Every pilot likes to keep their cockpit clean and tidy for the next use, treating it as a private office of sorts.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase aircraft have a feature that many other aircraft do not: All over the front of each aircraft is the full name and callsign of the pilot of that aircraft, proudly spray-painted on by said pilot. Of course, these 'messages' are transparent from inside the craft and do not impede the pilot's field of vision in any way, but to your enemies, the full name and identity of the man or woman about to kill them is often the last thing they see before they die.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAn imposing museum has been built just next to the common area, complete with antique artifacts from earlier Firebase history, preserved possessions of legendary Firebase war heroes, and dioramas of the most important battles of your arcology's history. The contents of the museum are updated and rearranged quite frequently too, meaning that regular visitors can reliably expect a novel experience when they arrive. It is here that soldiers and staff of all ages and stripes are welcome to pay their respects and spend time to learn about the history of the organization they serve.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the territory surrounding the Free City itself, there are several unassuming and very ancient-looking cave formations established, complete with rocky outcroppings, discreet mouths for entry and exit, and hidden underground tunnels shafts leading out of them. They sometimes even have crude glyphs drawn into them if the Firebase scouts occupying them get bored enough. These cave landforms act as listening posts that monitor incoming and outgoing traffic concerning the arcology, and are rigged to detonate if attacked.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe soldiers of the Firebase are generally both reserved and focused; there is always going to be another battle to fight, after all. They usually have a quiet air about them, but whenever eating or just relaxing, they all have many stories to tell and much advice to give to one another, both personal and professional. There is a lot of mutual respect between the soldiers of the community, on the basis of the wealth of hard experience they share. Older soldiers are prized for their veterancy, and given special assistance and acclaim when they first enlist. Those seniors that demonstrate special insight or mastery are promoted and fast tracked as much as feasibly possible.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMaturity Preferentialism: The Colonel has been a bit more concerned about her legacy as of late; she's working on her autobiography and two other books, has arranged for some of her younger relatives to move to your arcology for safety, and she's even written her will. She's also a celebrated citizen of your arcology when she makes her appearances, and is widely respected by your people for her prowess and long experience in both military and sexual matters.\n`;
					}
					break;
				case 'Paternalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nPaternalism is all about improving and saving human lives within the context of Free Cities existence, and you are proud to have granted The Colonel a direct manifestation of this powerful ideal via air power. The Colonel has been delivered her very own OMEGA-series MEDIVAC V/STOL aircraft. This flying monolith is very difficult to manufacture, for it is designed to reach embattled trouble zones very quickly despite its massive weight, make rapid landings in impromptu LZ's despite its massive bulk, and endure heavy fire and extreme weather to evacuate wounded personnel despite being a lightly armored aircraft. This variant of the OMEGA-series can take in hundreds of casualties for the onboard staff to stabilize, before dropping them off at the Firebase for truly intensive care. Given its prestige, ease of use, and tremendous durability, The Colonel has been known to occasionally use it to personally evacuate endangered friendly platoons in the field or sometimes even desperate refugees, whenever she needs a productive diversion from her usual duties.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase cuisine is prepared with exceptional care, the talented slave-cooks put lots of attention in replicating their family specialty dishes as best they can whenever asked. The troops love the food they get, and mealtimes here frequently prove to be great occasions for bonding.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhen they eat, the troops are sometimes treated to weekly FC TV fantasy series broadcasts often featuring chivalrous knights and plucky heroes fighting and winning classic battles of good and evil, before said champions take to enjoying explicit, yet wholesome sex with the numerous maidens, housewives, noblewomen, and queens they rescue.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery slave here is allotted regular breaks, issued protective gloves and aprons for their work, and even receive regular medical checkups. Numerous slaves have also befriended some soldiers, and even sometimes see these soldiers off on their regular deployments.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe new captives brought to the processing cages are all given 'slave manuals', printed in their declared native language. The manuals are meant to thoroughly inform them of how they should best serve and survive in their new lives. They are all given clean bedrolls to spare them from sleeping on the floor of their cages, and they are also given regular psychiatric and physical evaluations to ensure sound body and mind.'\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nComfort is king here. Every chair now enjoys soft fluffy padding while every table is fully adjustable in height. The large and well-maintained side dens that serve as the local slave quarters all feature simple-yet-comfortable bunk beds, proper plumbing and heating, and even their very own soft drink dispensers.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe barracks are certainly not the first of their kind in the Free Cities, but they are among the first to provide an actual side room for Barracks-slaves to relax in when their shifts are done. The Slave Lounge is very well furnished, with soft furniture and a large wallscreen television to maximize comfort. Sometimes the occasional soldier will even drop by when they want to spend time with some 'civvies' for a change.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOn the largest wall in the armory, there is a massive wallscreen. This wallscreen serves as an interactive digital plaque of commemoration. Upon it lie the listed names of every retired and deceased former member of the Firebase, and one only has to touch it to see a listee's profile, search for a specific name, or scroll up or down the immense list. If one were only to touch a name, they will see a profile pop-up containing the full life story of that soldier -- or at least as much of it as they wanted to share -- along with their full service records, with special emphasis placed on any heroic deeds in battle or valorous conduct in general. On tiny wallspeakers, triumphant music gently plays while onlookers scroll. On both flanks of the wallscreen, an honor guard stands vigil.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center has been made extremely comfortable. The tables and chairs are adjustable, each battle station has its own heating and air conditioning unit for highly localized climate control, and there is are monthly rewards for commanders who manage to keep soldier, slave, and civilian casualties especially low. There is a long sofa near the entrance for obedient slaves assigned here to relax and chat on when not being called to serve. Next to the sofa there is also a big plush rug piled with soft pillows if a deserving commander or two wants to have a relaxing fuck with unoccupied slaves. The atmosphere is relaxed and cordial by military standards, even between the slaves and staff.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the 'special projects chamber' of the drug laboratory, the balcony's sealed control room overlooks a hopeful sight: rows upon rows of rejuvenation tanks installed here house dozens of critically injured soldiers and slaves from all around the Firebase, and even a few dying citizens from the main arcology; here the drug laboratory tests, applies, and perfects its newest curative formulae and solutes on emergency patients that need them most.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe proud slave owners in the Firebase can be seen donating portions of their free time to studying and applying the slave improvement materials in their possession; best-selling slave-training books, novelty slave clothing, and slave nutrition meal plans are all commonplace tools to slavemaster hobbyists in your martial employ. Especially notable are the slave-oriented gifts such as slave-written gift books or randomized gift boxes for deserving slaves who like surprises.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe many slave-capture drones have all been equipped with helpful light cyber-warfare suites meant to take over nearby enemy and civilian devices to display or broadcast simple messages; unprotected PDA's, computers, smartphones, radios, comm-beads, and so on are hijacked to communicate placative statements like "PLEASE SURRENDER", "DON'T SHOOT", or "WE'RE HERE TO HELP".\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSafety, Survivability, and Dependability are very high priorities for the dedicated maintenance and refitting crews of the garage. There are safety notices pasted onto the walls of many duty stations within the garage, clearly encouraging mechanics and crewmen to exercise great caution and best practices in dealing with the vehicles in their care. Additional safety instructions and even some well-wishes painted on by the staff can be found inside the vehicles as well.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEven more important are the extensive armor kits that are added to every vehicle; RPG cages, NERA and TUSK armor plate kits, active protection systems, chaff and smoke dispensers, and more are in plentiful stock within the garage, and very few of the Firebase's ground vehicles lack at least one of these features.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAt the discretion of the air force's lieutenant colonel, safety railing, emergency deployable arrestor wires, composite metal revetments, reinforced vehicle suspension mechanisms, and explosives-grade ballistic glass walls all occupy the space of the hangar as needed. This is all to ensure optimal safety for staff, pilots, and visitors present even if the most severe of landing/takeoff accidents or maintenance errors were to occur. Drills are taken every month to ensure ideal responses to various disasters such as aircraft crash incidents or in-house fire breakouts, with the emphasis on recovering as many wounded survivors as possible from such hazardous situations.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe Paternalism-inspired aircraft are favored for their dedication to survivability; Kevlar plating has been integrated into most of the airframes in use, and every single aircraft comes with a variety of chaff & smoke munitions, lightweight smoke generation machinery, MEDIVAC equipment to stabilize wounded soldiers and captives, and shock-absorbent seating with redundant seatbelts to minimize crash casualties. When landing, your transport aircraft are known for the utterly massive mountains of smoke they can generate within their chosen Landing Zones to obscure and conceal dismounting soldiers from enemy observation and fire. You have every intention of keeping your people alive, and they all know and appreciate this.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a modest slave training academy not very far from the relatively-pristine slave processing cages, and it has much to offer. Etiquette, obedience, sex tips, roleplay skills, housekeeping, vocational knowledge, street smarts, and physical & mental conditioning are all taught with great efficiency here using very humane teaching and motivational techniques. Remarkably, this location even provides complimentary psychological treatments to students suffering from PTSD or related conditions. Firebase-resident slaveowners often bring their newest purchases or captures to this place to fast track their slaves' mental development, and it is not hard to see why, despite the high prices.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA fully furnished, equipped, and staffed high-capacity military hospital complex has been established on the outskirts of the Firebase entrance. With its large rooftop helipads and a spacious reinforced parking lot, it can receive and process vast quantities of wounded personnel from all means at all times to ensure that every wounded person is secured and treated within the 'golden hour'. Thanks to this facility, far fewer lives are wasted through battle; since its creation even most enemy casualties have been successfully rescued, healed, and later sold off for profits. During the more peaceful, less intense weeks of operation, the complex is even known to 'generously' take in entire mobs of haggard refugees and nomads in need in 'free' food, housing, and medical care; they are welcomed in, nursed completely to health over several weeks, and finally enslaved and bulk sold to another Paternalist arcology as payment for their care. The Firebase has always contained its own dedicated medical facilities of course, but now, it enjoys truly peerless lifesaving provisions.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTrustworthiness and Fidelity are sacrosanct in your Firebase, and this is making the "esprit de corps" very formidable as the months pass by. This enclave places great importance on the community's development and wellbeing, and more personnel than ever are investing in their futures with health therapy regimens or higher education courses. Because of this, new recruits are accorded with respect and careful attention; the priority is weeding out aspirants too selfish for the Firebase's good, and instilling knowledge and professionalism into those that are left. Staff, Soldier, and Slaves, are all honorbound to accord each other esteem and respect, with politeness and honesty being the standard expected of all. At the bottom of it all are the slaves; nearly everyone has to shoulder some portion of the grand task of liquidating the old world in your name. To cope with the many risks and pressures of their jobs, your soldiers rely upon the available slaves. The many slaves present serve as caretakers, confessors, and concubines, and efforts ar taken to remind them that their work is appreciated. At any time, one can see an off duty veteran teaching survival lessons to a new recruit. Over by the triage, a medic is patiently tending the injuries of POWs recently taken from a raided enemy camp. Elsewhere, a group of slaves is playing cards in the last few minutes of their free time. An optimistic mindset has taken hold of the Firebase, and you doubt it will lt go anytime soon. `;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPaternalism: The Colonel is behaving much more kindly towards those she considers her people; wages and bonuses have been increased, she keeps an open-door policy with her troops, and she is happy to occasionally take the lead in some of the trainings and the tours of The Firebase that are given to newcomers. She takes efforts to make sure her people see her as trustworthy.\n`;
					}
					break;
				case 'Degradationism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nDegradationism is all about belittling or destroying others' lives for one's own benefit, and you are proud to have granted The Colonel a direct manifestation of this powerful ideal via air power. The Colonel has been delivered her very own ALPHA-series STARSCREAM fighter-bomber aircraft. This flying behemoth is very difficult to manufacture, for it is designed to reach and dominate contested air spaces very quickly despite its massive weight and make rapid & precise bombing runs landings in tight urban environments despite its massive bulk. This variant of the ALPHA-series can rake in hundreds of casualties per minute with the help of its onboard targeting AI's, numerous swiveling autocannons & missile bays, and its wide onboard assortment of modern multi-munitions payloads for truly intensive carnage. Given its prestige, ease of use, and tremendous lethality, The Colonel has been known to occasionally use it to personally strike exposed enemy platoons in the field or sometimes even desperate refugees that get just a little too close to the Free City.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase cuisine is prepared with exceptional care; after all, human meat is no joke, and cannibalism in the Free Cities is a very controversial and esoteric topic as is. Regardless, the troops love the food they get, even after they learn the truth about the food they consume. As such the Firebase is one of the rare testbeds around the world for this daring new frontier of diet. `;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhen they eat, the troops are sometimes treated to weekly FC TV gritty series broadcasts often featuring villainous protagonists outsmarting and outfighting multitudes of do-gooders and rivals, before they take to enjoying explicit, very rough sex with the numerous schoolgirls, housewives, businesswomen, and policewomen they kidnap.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll of the slaves are hounded; much is asked of them, and soldiers are encouraged to beat them liberally if fail in the slightest. They have all been branded, and they always seem worried for themselves and each other.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe built-in shower wall used by the processing cages has been dubbed by the captives brought there as the 'Wall Of Blood'; for even minor infractions or failures, new slaves are lined up against the ceramic tiles and whipped bloody.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nGames will be had. Bets will be taken. The chairs and tables present are all arranged in loose circles throughout the common area, and for one purpose: Slave Fights. At any time, any two random slaves can be plucked from menial duties to be fed into the open space within one of the circles to beat each other for the soldiers' amusement.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEach bed unit has 4 pairs of shackles attached; one for each corner post. As they please, soldiers will chain their favorite personal slave to their bed to wait for them until their return from duties, a meal, or a deployment. You see several dozen slaves confined to the barracks in this manner from where you are standing.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOn the largest wall in the armory, there is a massive wallscreen. This wallscreen serves as an interactive digital map of conquest, displaying the entire theater of operation in tremendous detail. Scattered upon this zoomable mega map lies the many marker dots placed over it, each marking a specific past location that the Firebase's soldiers have fought at or raided. One only has to touch the screen to see a full profile of a prior combat engagement, search for a specific engagement, or zoom in or out of any point on the immense map. If one were only to touch a marker dots, they will see a full battle profile pop-up containing the brutal After Action Report of that battle, along with graphic pictures and video footage of it. Special emphasis is placed on treatment of captured soldiers and/or civilians after each battle, with several uncensored clips available on many of the profiles depicting beatdowns, mutilations, burnings, or literally anything else your soldiers felt like doing to their captives. The screaming can be heard in high-definition surround sound thanks to the tiny wallspeakers present. On both flanks of the wallscreen, a tightly bound slave is kneeling, with a ring gag in their mouth, so that onlookers can get a quick blowjob while they browse the records.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are copious splatters of blood and semen to be found in the middle of the command center, and for good reason; there is a circle of pillories there, each loaded with a gagged and bloodied rebellious slave. During or after missions that prove to be frustrating or humiliating, commanders are free to take out their full frustrations on the pillory slaves. After pleasing victories, the command staff are known to attack the pillory slaves en masse, for a circular group victory fuck.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the 'special projects chamber' of the drug laboratory, the balcony's sealed control room overlooks a dreadful sight: a cold concrete floor holds dozens of unbroken slaves and disobedient soldiers from all around the Firebase and even a few undesirable citizens from the main arcology; here the drug laboratory tests and perfects its newest hallucinogenic, poison, and irritant formulae and gases on deserving individuals so as to maximize your military's psychological and NBC warfare capabilities.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe prideful slave owners in the Firebase can be seen donating portions of their free time to studying and applying the slave debasement materials in their possession; best-selling slave-breaking books, harsh bondage apparel with complimentary rope or chain-link restraints, and slave discipline whips and prods are all commonplace tools to slavemaster hobbyists in your martial employ. Especially notable is the casual manner in which these slave-hostile materials are purchased.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe many slave-capture drones have all been equipped with helpful light cyber-warfare suites meant to take over nearby enemy and civilian devices to display or broadcast simple messages; unprotected PDA's, computers, smartphones, radios, comm-beads, and so on are hijacked to communicate belittling statements like "SURRENDER BITCH", "DON'T BOTHER", or "RESISTING MAKES IT WORSE".\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAggression, Lethality, and Versatility are very high priorities for the dedicated maintenance and refitting crews of the garage. There are killcount chalkboards posted onto the walls of many duty stations within the garage, clearly encouraging mechanics and crewmen to do their best to better augment and utilize the vehicles in their charge and compete against their sibling units. Every week, new taunts and insults can be found crudely painted onto the interior of each vehicle, no doubt planted there by hecklers from a rival sibling unit aiming to goad that crew into another killing contest.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEven more important are the extensive weapon kits that are added to every vehicle; ATGM mounts, SAM and AAMG turret kits, quad-machine gun mounts, automatic grenade launchers, and more are in plentiful stock within the garage, and very few of the Firebase's ground vehicles lack at least one of these features.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAs dictated by the air force's lieutenant colonel, concrete barricades, barbed wire fences, a composite metal brig, reinforced vehicle scrapping mechanisms, and explosives-grade ballistic glass observation decks all occupy the space of the hangar as needed. Of course, their purpose is to ensure optimal intimidation for the staff, pilots, and visitors present. If even the most minor of landing/takeoff accidents or maintenance errors were to occur, punishments for those responsible are public, lengthy, and brutal spectacles. Drills are taken every month to ensure ideal responses to various disasters such as aircraft crash incidents or in-house fire breakouts, with the emphasis on recovering as much salvageable hardware as possible from such hazardous situations.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe Degradationism-inspired aircraft are favored for their dedication to lethality; every month, fresh POW's are chained up to the outside of tasked VTOLs for decoration, and every single aircraft comes augmented with many strands of barbed wire, many hull portholes for passengers to shoot enemies from, and additional hardpoints for attaching missile launcher tubes. When landing, your transport aircraft are known for the utterly massive torrents of suppressing fire they can generate within their chosen Landing Zones to disable and kill nearby combatants that are targeting dismounting soldiers. You have every intention of demoralizing and destroying anyone standing in opposition to your people, and your people all know and appreciate this.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere is a discreet slave breaking dungeon not very far from the relatively-harsh slave processing cages, and it has much to offer. Obsequience, submission, righteous terror are instilled with great efficiency into every slave interned here through nonstop physical & mental torture. Remarkably, this location even provides complete personality reconstruction services, which involve deliberately mindbreaking inmates through intensive traumatization, before promptly rebuilding their minds and personae into the exact form desired by the clientele. Firebase-resident slaveowners often bring their newest purchases or captures to this place to fast track their slaves' transition into slave life, and it is not hard to see why, despite the high prices.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA fully furnished, equipped, and staffed maximum-security military prison complex has been established on the outskirts of the Firebase entrance. With its tall rooftop watchtower and a spacious reinforced central courtyard, it can retain and retrain vast quantities of future slaves using the many tools and trainers available at all times to ensure that every captured person can be quickly made ready for a life of labor, be it sexual or otherwise. The trainers and prison guards are clinical and unsympathetic in their duties, and thanks to this facility's vast capacity, excess slaves that the Firebase cannot hold are no longer left behind after raids. Since the creation of the complex, the Firebase can now accommodate as many slaves as it wants, and now entire townships can be casually picked clean of human life and have their populations be fully trained at the Firebase's leisure before sale. The Firebase has always contained its own dedicated slaveholding and slave training facilities of course, but now, it enjoys truly peerless enslavement provisions.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nDominance and Greed are sacrosanct in your Firebase, and this is making the "esprit de corps" very fearsome as the months pass by. This clan places great importance on the community's violence of action, and more personnel than ever are stacking the odds in their favor with close quarters combat regimens or advanced interrogation courses. Because of this, new recruits are accorded with hostility and careful scrutiny; the priority is weeding out aspirants too squeamish for the Firebase's good, and instilling ferocity and determination into those that are left. Staff and soldiers alike are bound to their strict and highly competitive social totem poles, where esteem and respect comes strictly from each member's skills, kills, or wealth. Politeness and Compassion are seen as signs of weakness, of course. At the bottom of it all are the slaves; bar The Colonel and her top dogs, nearly everyone here is getting taken advantage of by those higher up, and thus everyone in need of a release valve for their rage will simply snatch up the nearest available slave. Therefore, unproved beatings, torturings, and rapings of the many slaves present are so common that they are ignored. At any time, one can see a few off duty veterans hazing the shit out of a new recruit. Over by the bars, two troopers are brawling in front of a jeering crowd, duking it out over some perceived slight or another. Elsewhere, a group of slaves is huddling together for warmth in the last few minutes of their sleep time. A predatory mindset has taken hold of the Firebase, and you doubt it will lt go anytime soon.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nDegradationism: The Colonel is on the prowl; she is more reckless, impulsive, and aggressive than before, as if there is some demanding beast inside of her that she can't quite satisfy. Her personality itself hasn't changed; she speaks with you just as affably as before... Her actions are what's different: prisoners of war, slave captives, and civilians are treated with no dignity at all, and she seems to greatly enjoy punishing her troops harshly for transgressions and failures. She still generously rewards successes, however.\n`;
					}
					break;
				case 'Physical_Idealism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWith the help of her own personal Amphibious Assault Landship, The Colonel can stage a miniature invasion or expedition behind enemy lines or unclaimed territories whenever she pleases, independent of what the rest of the Firebase is up to. This massive, high-performance, quad tracked vehicle can seamlessly transition from land to sea and vice-versa, while sporting a turret armed with a recoilless main gun, and carrying a company-sized element of light infantry and a week's worth of their supplies. This vehicle's long range and hefty versatility makes it a perfect vehicle for The Colonel to stay productive during her more independent, adventurous moods.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTender meats of all kinds are made available in abundance, with a free protein powder packet or nutrition bar provided with each meal. Sweetened protein drinks are available in all forms and varieties as well, including milkshakes and even alcoholic beverages.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are several monthly Free Cities fitness magazine deliveries to ensure everyone gets their free copy. In true Free Cities fashion the magazines are one third informative and well-written articles, and two thirds explicit full-color sex spreads featuring very muscular women and men vigorously going at it. \n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMany of the slaves here are all in excellent physical shape: All the slaves are musclebound to varying degrees, with biceps, shoulders, glutes, traps, and other muscles all large size and sharply defined. They are required to strip naked and exercise intensely before and after their assigned work shifts in order to maintain their gains, prior to showering and dressing, and they do all these things in full view of the soldiers.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEach cage contains a pair of dumbbells and a discarded Free Cities bodybuilding magazine containing workouts, fitness articles, and musclegirl porn. Everyday, each captive is brought out of their cage to perform a workout from their magazine from memory, and they are punished if they fail or refuse.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe west end of the common area has the tables and chairs there packed much more tightly together than before, and for good reason; the entire wing is dominated by an Olympic swimming pool, flanked on both sides by weight benches, exercise machines, weight racks, and even unisex standing showers and lockers. This open air gym is a widely frequented attraction; with support staff, soldiers, and even some highly-favored slaves partaking of its attractions whenever they have the time. Music is playing loudly, and you see a few beach balls floating idly in the pool.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery single bed has been reinforced to serve as a makeshift ab-work platform, with strengthened posts and a small rack attached for the medicine ball each bed unit is issued. With their daily workout now within arms reach, soldiers too lazy or busy to hit the gym can now squeeze out a few sets before sleeping or after waking up. No Excuses.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe armory looks and smells like a sports team locker room, and even has its own shower room. Next to the central quartermasters booth lies a large wallscreen that shows that week's combat cam 'highlight reels', and 'MVP' or 'Most Valuable Platoon' reels, which gives the troopers that come here a strong sense of competitiveness, as it is prestigious to have one's own combat footage or combat unit be represented on such a public platform. Each trooper keeps their favored performance boosters and energy drinks in their personal lockers too, and often sit together on the long polished wooded benches nearby to do final checks on their gear before heading out.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhen important operations are not in progress, the command center is know to play very motivating workout soundtracks on their new built-in loudspeakers. The command staff within is also known to wear only light fitness clothing, since the spend much of their free time in the luxurious gym that exists in the right flank of the commander center when not on mission. For them, exercise is a healthy escape from the stresses and guilts of commanding your military forces.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe distribution point of the drug laboratory is designed much like a supplement store, with inspiring music playing in the background, and neat shelvings and aisles for soldiers to stroll through and select the drugs, proteins, and powders they need to improve their muscle gains, their combat potential, or both.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nNaturally, your military employees living here have learned to stay active; when off-duty, and even sometimes on-duty, you can see any of them wearing heavily weighted clothing, sweat bands on their wrists and foreheads, resistance bands for casual pumping whenever idle, earphones and portable music players strapped to their arms, huge and durable insulated flasks full of fluids to ingest when thirsty from their exertions, or some other hardcore fitness paraphernalia.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour drone technicians are proud of how much weight the drones they work on can carry, how long they can do so, and how fast they can do so. Your drones have been upgraded meticulously for endurance and sheer power output, and of course the added weight from these modification means that they can serve as fantastic medicine balls as well.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hulls of many of the ground vehicles in the garage are mildly enlarged, and it is easy to see why. All around the garage there are impressively large [and sometimes even downright massive] engines, auxiliary systems, and fuel tanks suspended from overhead racks and awaiting either customization, retooling, or installation into their intended vehicles. The gruff and tough mechanics here are obviously hard at work to advance a new generation of 'muscle' tanks, trucks, and transports.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery vehicle unit is customized; none of them have the exact same components they shipped in with, but rather garage-made improved versions of those same components that are made to make each vehicle bigger, stronger, faster. And just like the many musclebound mechanics that work on these vehicles and parts, these vehicles need a lot more fuel to get the most out of their gains. Advanced new super-diesels are produced within the garage backrooms to maximize reliability and mileage, and this powerful sustenance gives your mechanized units a lot more kick. In the field, your ground vehicles are every bit as 'ripped' and 'tough' as the men and women who drive them.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe personnel within the hangar exercise with great diligence, with every person's working shift beginning with a challenging workout (barring a direct attack on the arcology). Your staff and pilots are aware that their combat role is not as physically strenuous as that of their mechanized and infantry comrades, and they fully intend to get just as much exercise as their field fellows do. All around the hangar, right next to well-serviced aircraft, you can see 'idle' personnel doing pull-ups with dangling overhead chains, push-ups and sit-ups on the ground, bicep or tricep curls using small missile tubes or heavy spare parts, and so on. Your pilots are ripped too, with their excellent physical condition being a powerful asset in their high-speed flight missions that sometimes require them to endure taxing g-forces. As such, your ace pilots are some of the best-conditioned athletes you've ever seen.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe personnel of the hangar are impressively bulked on their own, but they seem to have applied their dedication to development to the vehicles in their care as well. Every airframe has been carefully enlarged to fit ever more powerful engines and additional fuel reserves into every aircraft. Powerful, 'muscular' aircraft are the sought-after goal, and each one is frequently checked and modified to enable even minor improvements. After all, isn't continuous improvement a key aspect of Idealism?\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA grandiose open-air gymnasium occupies the space near the drug laboratory, where it can receive easy shipments of steroid syringes and protein supplements from the lab for the sake of any gymrat interested in such things. Within this spacious zone lie a broad variety of barbell-weights, machine-weights, exercise machines, huge discarded tires, battle ropes, punching bags & speed bags, training dummies, and even a few martial arts sparring cages are here, providing the fitness-obsessed population with powerful workout venues that they cannot replicate elsewhere within the Firebase, and eliminating the need to settle for dumbbells & bodyweight exercises or to waste their free time traveling to the gyms in the arcology above. Your warriors and their support staff are all grateful for the opportunity to begin making truly extensive gains.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nCrossfit has long been a popular interest in your Firebase subculture, and now, your personnel have a worthy environment to explore that interest. A large gauntlet of equipment and arrangements meant for aerobic, acrobatic, and athletic challenges are set up on this field to host a variety of competitions within quick succession. There are even stands for a limited audience, a commentator's booth, and a restroom.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers are rather idealistic about themselves and their bodies; the Firebase is a place of little compromise. Discipline and Comradery are values of choice, as the weekly races, weightlifting competitions, and exhibitions require constant training and therapy from all personnel. The peer pressure to compete and place or improve one's competitive rankings is inescapable, and squad by squad, off-duty units of the Firebase can always be seen participating in group training or group therapy sessions. Obviously, every person down here, bar some of the newer recruits, is in magnificent shape, man, woman, and slave alike. Some are bulked. Others are shredded. Some are just toned. However, everyone is thoroughly proud of their development thus far.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPhysical Idealism: The Colonel was ripped before, but now she is absolutely shredded. Her muscles are even bigger and more defined than before, and there is a small rack full of heavy barbells on her pavilion for bodily maintenance. Her body still has its feminine appeal however, thanks to her curves.\n`;
					}
					break;
				case 'Hedonistic_Decadence':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nWith the help of her own personal Amphibious Resupply Landship, The Colonel can support ongoing operations within friendly lines while doing very little work herself, independent of whatever the rest of the Firebase is up to. This massive, high-capacity, quad tracked vehicle can seamlessly transition from land to sea and vice-versa, while supporting dozens of heavy ammo crates, several refueling hoses & fuel pumps, and a whole week's worth of rations and recreational refreshments for an entire infantry company. This vehicles long range and ease of use makes it a perfect vehicle for The Colonel to stay productive during her more lackadaisical moods.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nDelightful platters of bewildering varieties of foods and baked treats are available on demand, as the cooks and slave-cooks toil day and night on rotation to keep it all coming. Each soldier gets a tray at every meal to fill and stack as he or she pleases, with a small free packet of recreational drugs given with every meal.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nQuotes, Stories, and Essays from across the ages written on the topics of desire, indulgence, pleasure, or the importance of these things to the human experience are all available in lots of little booklets available by the stack throughout the Firebase. Meanwhile, pornography featuring curvy, plush, or even obese women is easily accessible on the laminated tablets that have been distributed throughout the Firebase.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMany of the slaves here are quite hardworking; they need to supply a constant amount of food, drink, drugs, games, media, clean holes, and other entertainments to the impatient soldiers around, who are in constant need of fast gratification. The slaves deal with all the stress and anxiety by indulging in some extra drinks and drugs themselves, and they have some extra soft padding on their bodies and assets to prove it.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSex toys, and a generous supply of snack bars, porn magazines, and electric cigarettes are issued to every cage inmate upon internment. The captives are free to relieve their anxieties at any time, and are encouraged to do so.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe east end of the common area has the tables and chairs there packed much more tightly together than before, and for good reason; the entire wing is dominated by an Olympic-sized hot tub, flanked on both sides by beach chairs, food vendors, LAN party lounges, and even unisex changing rooms. This open air resort is a widely frequented attraction; with support staff, soldiers, and even some highly-favored slaves partaking of its attractions whenever they have the time. The air is heavy with drug fumes and the smell of food. You see a few empty alcohol bottles floating idly in the steamy water.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery bed unit has a tiny refrigerator unit attached at the head. At any given time, a cold drink, some cool leftovers, or a chilled shot of injections is just within arms reach for any soldier resting. Above soldiers' heads is a small touchscreen monitor attached to an adjustable arm, so that troops are never without options for entertainment either.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nCushioned couches, lounge chairs, and futons lie all around the armory, and on every last one of them lies a debriefed soldier sleeping off their last deployment with the help of some opium. Most of them haven't even bothered to change out of their fatigues, and many have their weapons and body armor strewn carelessly on the floor beside them. Further still, a few have their pants pulled down to their ankles, whilst an intoxicated slave-whore lazily rides them. Heavy smoke fills the air, and adjacent to the central quartermaster's booth is a tidy fast food bar where shots of soft drinks, small plates of fried foods, and tiny condiments are always in quick supply for those that the time to spare.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are drug platters, snack bowls, and punch bowls for every battle station of the command center. During combat maneuvers the staff here are especially ravenous, chugging down large amounts of substance while they send messages that carry power over life and death. The pressure to succeed and secure victory is high, and in order to cope, the staff consume.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe distribution point of the drug laboratory is an eerie place, with a very thick white mist for soldiers to stroll through on their way to the drug selection buffet. The mist is so dense and rich that many soldiers report feeling either high or buzzed after just a few minutes inside of it.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nNaturally, your military employees living here have learned to make life easier for themselves; when off-duty, and even sometimes on-duty, you can see any of them wearing light & airy clothing, snack pouches strapped to their wrists, memory foam pillow-coats for casual snoozing whenever idle, drug-filled auto-injection needle pistons strapped to their arms, cozy haptic-operated mechanized wheelchairs equipped with built-in tablets & speakers & coolers, or some other leisure-related paraphernalia.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour drone technicians are proud of how little upkeep the drones they work on require, how little time they need to spend on tune-ups whenever maintenance time does finally come around, and how easy said maintenance is. Your drones haven't been upgraded too often, as their sheer power output is high enough to be sufficient for operational requirements for a long time to come.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThere are treats of all kinds all over the garage, to set the hardworking staff here at ease. Unclad sex slaves bounce up and down on the laps of debriefed crewmen while waitress slaves rush about carrying platters of hors d'oeuvres to mechanics that summon them, feeding the mechanics hand-to-mouth while they make their adjustments. There are drugs all over the garage too, half-snorted, half-injected, and half smoked. Substances pepper the garage as the workmen get their fixes in between the fixes they perform on the vehicles. It is not uncommon to find tweakers passed out underneath or next to the vehicles they were just tweaking because of this.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe staff of the garage work hard within a very comfortable environment, and according to them they need their many comforts, but your combat-active crewmen deserve some comforts as well. On the interior of every vehicle are very plush massage-chair seats, powerful air conditioning suites, and of course, delightful compact pill dispensers that help ensure that no deployment is ever a dull one.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe personnel within the hangar work with great levity, with every person's working shift beginning with a tall glass of beer (barring a direct attack on the arcology). Your staff and pilots are aware that their combat role is not as physically strenuous as that of their mechanized and infantry comrades, and they fully intend on taking advantage of that fact to get more partying done. All around the hangar, right next to well-serviced aircraft, you can see idle personnel doing lines on the nearest available surface, dancing together in empty spaces, enjoying succulent desert foods and expensive drinks large trays, and so on. Your pilots are very relaxed too, with their drug-induced states being a useful asset in their high-risk flight missions that sometimes require them to make very brave maneuvers in order to more effectively engage enemy forces. As such, your ace pilots are some of the most high-tolerance users you've ever seen.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe personnel of the hangar are impressively pampered on their own, but they seem to have applied their dedication to delight to the vehicles in their care as well. Every airframe has been carefully enlarged to fit ever more luxuries and comforts into every aircraft. Internal heating and cooling systems are enhanced, every passenger compartment comes with its own wallscreen HDTV, and soft padded reclining seats line each passenger compartment, among other accommodations. No effort is spared in ensuring deployed troops and pilots are put at ease as soon as they mount up. After all, isn't continuous gratification a key aspect of Hedonism?\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA stark narrow building occupies the space near the drug laboratory, where it can receive easy shipments anesthetics, filtrates, and detoxifying substances from the lab for the sake of any visitor in need of them. Within this spacious zone lie a long row of surgical chairs, where occupants can simply sit down and be placed into a deep rest by the numerous attendants, before being operated upon by the autosurgery suites above to receive advanced liposuction, carcinogenic filtration, and curative injection procedures that quickly and somewhat painlessly prolongs their lives and repairs the damage to their bodies incurred by their wild are carefree lifestyles within the Firebase. For those willing to pay the fees, this place provides the pleasure-obsessed population with powerful longevity solutions that they cannot replicate elsewhere within the Firebase, and eliminating the need to settle for intermittent diet & exercise or to waste their free time traveling to the crowded clinics in the arcology above. Your warriors and their support staff are all grateful for the opportunity to sustain their truly decadent lifestyles without guilt or consequence.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLuxury cruises have long been a popular interest in your Firebase subculture, and now, your personnel have a worthy environment to explore that interest. A small artificial lake has been built outside the Firebase entrance to host a small but well furnished premium yacht. The yacht lazily makes its daily revolutions around this lake, filled with rare and ever-changing entertainments that once cannot find inside the Firebase itself.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers are rather lackadaisical about themselves and their bodies; the Firebase is a carefree place. Fun and Relaxation are pursuits of choice, as the weekly orgies, eating competitions, and drug exhibitions require little effort to enjoy. The peer pressure to indulge and make the most of each day is inescapable, and every individual has been seen participating in most of the delights available at least once. Obviously, every person down here, bar some of the newer recruits, has a very jolly disposition. Some are drunk, high, or both. Others are passed out. Some are just laughing at the others. However, everyone is thoroughly entertained.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nDecadent Hedonism: The Colonel has a thin layer of fat covering her muscles and overall body, making her appealingly 'thicc' without making her slow or weak; she even jiggles in the precisely correct places when she walks. Every weekend she has entire trays of food and substances brought to her pavilion on rotation, and you have no idea where she manages to put it all. She's certainly indulging her desires a lot more. She visits her doctors more often and regularly joins the training platoons in their daily runs to keep her body healthy.\n`;
					}
					break;
				case 'Slave_Pastoralism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nYou've purchased unused land just outside of the Free City, and cultivated it into a very unique farm, with its own fully furnished farmhouse & manger, several acres of parish & pasture, farming vehicles & tools, and of course, a fully upgraded dairy for human livestock to enjoy. It even comes with its own horse. This is The Colonel's farm now, and from here she is free to grow, tend, milk, harvest, store, and sell whatever she pleases. You do not know if she grew up in a rural, agricultural setting like this, but you do note that she did appreciate having such a tranquil retreat away from the sex, violence, and noise of the Free City proper. Even she needs a few quiet peaceful days sometimes.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFor a multitude of dishes and drinks where normal animal milk is a key ingredient, human milk now substitutes. There are even chilled drink dispensers filled with human milk, right next to the standard water dispensers.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe troops also find their devices periodically updated with new folders featuring lots of additional erotic material featuring heavy lactation, massive cumshots, and even explicit slave-dairy documentaries, docu-dramas, or soap opera/sitcom episodes. The novel subject matter is surprisingly fun to watch, many realize.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe slaves' breasts here lactate, and slaves are required to squirt their milk into soldier drinks if and when ordered to. A few female soldiers even ask particular slaves for some ejaculate in their drinks or food on occasion as well.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSex toys, and a generous supply of snack bars, porn magazines, and electric cigarettes are issued to every cage inmate upon internment. The captives are free to relieve their anxieties at any time, and are encouraged to do so.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe smell of milk has slowly spread throughout the Firebase, especially in the vicinity of the open-air ranch on the northern outskirts of the common area. This place supplies most of the milk used in preparing Firebase meals. Here, dozens of diverse, prized slave-cows are lined up on adjustable milk racks and serviced by cheerful, seasoned farmers from around the arcology. Visiting soldiers are rewarded for hand-milking the cows themselves, with both a bottle of the free warm milk (or cum) they just squeezed out and with permission to fuck a choice cow in any position they desire. It's a good deal, and this place is frequented quite a bit by men who like milky tits and women who like the huge bull-dicks.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTroop bedding is clearly separated by drawn boundaries on the ground every 50 bunks, and for good reason: For every 50 troops, there is a designated slave cow assigned to service them and only them. During mornings and evenings, these cows wander along their assigned bunks to attend to the physical needs of their soldiers, be those needs sexual or nutritional.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe armory has many aesthetic touches reminiscent of a barn, but in particular, it represents a rancher's tool shed. The ceiling has uneven, almost ramshackle wooden paneling that cleverly covers and obscures just a tiny bit of the light fixtures, making the armory look as if the sun is shining down directly into it, thanks to all the cracks and rays of 'sunlight' visible. Complementing the effect are the hidden ventilation machines throughout that give the place an airy, breezy feeling, as if actual wind were blowing through it. But that's not all. It smells like milk, thanks to the milk tap, drain, and metal gallon bucket found near the entrance, where troops are subtly encouraged to fill their water canteens with human milk. Huge piles of hay are stacked in one corner, and off-duty soldiers can be found sleeping or chatting on them on occasion, or even taking 'a roll in the hay' with a personal slave if they feel like it.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nCommand center has an extravagant exclusive spa room that is stocked with a variety of dairy soaps and shampoos to use in the several specialized hot tubs inside. This spa room is reserved for end of day bathing for each shift's command staff, and after very victory, warm and cool milk baths are on offer alongside regular baths, giving officers ample opportunities to enjoy the creamy fruits of their labor. The coffee counter of the command center has bovine designs upon it, and its very own award winning human cow on standby to provide milk too.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe drug laboratory now features its very own wafflehouse. Of course, its waffles and pancakes are prepared with human milk drawn straight from the kitchen cows, and there is a coffee counter staffed by topless lactation slaves who cream patrons' coffee themselves when asked. Due to its closeness with the drug lab, pharmaceutical staff frequent this place as often as the troops do, and are keen to speak with the soldiers they encounter about the newest drug developments over breakfast. Needless to say, the cows here are a testbed for the latest and greatest lactation drugs the lab devises, and visitors are always polled about the taste of their meals.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hardworking staff, infantry, tankers, drivers, pilots, and officers of the Firebase have a greatly developed interest in the dairy industry. Entire cliques of compatriots here own the thick rubber gloves, thick leather aprons, and thick rubber boots iconic of Free Cities slave milkers, and it is common practice for such gangs to their own private milking clubs in which all members pool their money together to buy, train, and develop a hucow that might put their peers to shame. As such, handheld milking pumps, temperature-regulated metal milk jugs, wheelbarrows, and heavy bags of cowfeed can be found in many barrack rooms. And even those picky few that have no interest in slave-cows or milk can be seen wearing tanned-hide boots, jackets, gloves, and so on.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery support-drone has been augmented with a discreet little red 'mohawk' and golden 'beak' as well as a large quantity of large artificial colored 'feathers' glued onto each combat-drone's hull. Somehow, your drone technicians think that this gives your drones the appearance of flying chickens, so as to match your ongoing agricultural theme. Somehow, they haven't been fired for this yet.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage resembles a large farm's toolshed, only this toolshed is very big, and it definitely has more than one tractor. Most of the walls of the garage have been covered with decorative wooden planks to resemble the walls of a barn, as have most of its tables and counterspaces. Duty stations have been separated by imperfect high wooden gates and fences as well, to give the impression of having 'stables' for the various vehicle 'steeds' around as well. Naturally, there are a few cows tied down to some of the workstations, next to wooden tables stacked with cups. After all what hardworking mechanics doesn't want a sweet warm glass of milk after completing a job well done?\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTo their good credit, the mechanics have also managed to affix compact chilled human milk dispensers to the interiors of the ground vehicles too. The seating for pilots have been reupholstered with tanned hide materials upon request, many of the interiors have been repainted with farmland or bovine designs, and even the floors have been given a light blanket of straw covering.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar's appearance is somewhat reminiscent of that of improvised rural airfields of the sort found in farmland countrysides all over the world; tall rows of crops and plowed fields of dirt now surround or flank the runways and landing pads of the hangar, while the walls themselves are mostly covered in an active illustration wallpaper that depicts the outdoor sky in colors that change to reflect the actual time of day.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe Pastoralist modifications made by the hangar to its aircraft are surprisingly modest. Of particular note are the tanned hide leather upholstery placed on all of every aircraft's seating, and the milky white artificial contrails that every aircraft has been modified to optionally leave behind during any flight mission, regardless of weather conditions.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAn actual live-in barn had been manifest within the Firebase, right next to the Firebase's storage sector. Whereas before, aspiring ranchers and hucow hobbyists had to either purchase cow slaves from costly outside sources or purchase a relatively normal slave and them gradually develop them into becoming proper cowslaves over a long time period, they can now simply walk in the barn with their savings and purchase numerous fully-developed slave-cows at competitive rates. The barn is opened regularly to host sale events, with handmade and sanded wooden tables and chairs laid out to accommodate buyers, and all who arrive are welcomed with a glass of warm milk and a slice of freshly baked fruit pie to enjoy as they peruse and choose in the minutes before auction time. With its homely paint job and wooden constitution, the building itself is robust and welcoming. Freshly-laid hay and the smell of squeezed milk, cream, and sawdust in the air greet visitors each day that the barn is opened to receive or sell more cattle, but the open windows overhead help keep the air pleasant. In time, this place will become the cornerstone of the Firebase's dairy culture.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe open air ranch that accompanies the Firebase exterior is very important to your dairy culture. It is a very specialized slave training facility, fenced off with wooden fences and metal barbed wires, meant to demonstrate, with absolute clarity, to those captives sent here to train that they are indeed livestock. After each day's training, the new slaves are released to wander and graze outdoors among the animal chickens, bulls, and cows before returning to their rustic farmhouse to turn in every night.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe Firebase has both heard and answered the call to agriculture. At every venue of the Firebase, human milk is consumed as a beverage, alcohol additive, or key cooking ingredient for recipes. Human ejaculate is in vogue too, for the discerning consumer to incorporate into her own or his own delicacy salad dressings, dairy creamers, cake frostings, flavorings, and so on. Milking hucows has become a popular hobby as well, with entire milking competitions even being held sometimes. Finally, you note with satisfaction that many soldiers who live to complete their contracts and retire often choose to become ranchers themselves as they return to civilian life. You breathe deep, sucking in the heavy smell of cream in the air. This is a place you'd be happy to call home.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSlave Pastoralism: The Colonel has taken to getting her own personal cow, who serves her milk during her meals on her pavilion. Some of her personal care and hygiene products are made using treated human milk as well. It seems she only likes the milk. You heard that she once tasted cum by accident and several people almost died.\n`;
					}
					break;
				case 'Chattel_Religionism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nYou've purchased an unused storefront just outside of the arcology's central business district, and redecorated it to serve as a unique cathedral for a distinct sect of your Chattel Religionist faith; a cult that observes The Colonel as your divinely chosen apostle, who has come to carry your arcology to its glorious future. This is The Colonel's cult now, and from here she is free to cultivate her very own band of devotees. You do not know if she grew up regularly attending a religious setting like this, but you do note that she did appreciate having such a sycophantic retreat away from the sex, violence, and noise of the Firebase underground. Even she needs a few quiet meditative days sometimes.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe food supplies packages the Firebase receives daily now come with consecrated 'purity seals', assuring the cooks as to the food's freshness and holiness. The food itself hasn't changed much, but each meal now comes with a small side dish featuring plain white bread slices and a shot of red wine, so as to signify a sacrifice or meditation of some kind.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTelevangelical film broadcasts of the religious services conducted on the upper levels play here regularly, and are shown live on the holy days. They show every bit of each service, from opening hymns and prayers to final announcements, and always in precise high definition film (especially during the ceremonial orgies).\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSelect slaves among the slave population wear the proper chattel habits and garbs of the slave-ministry; during slave meals the slave-priests preach to the mass of slaves present, galvanizing them for future service with their stirring sermons. The (wo)men of the cloth speak of loyalty, faith, rewards to come, the righteousness of You and your 'Crusaders'.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEveryday, the captives kept in the processing cages must learn a new hymn or a new chapter from the Holy Book, word for word. Backsliders who do not learn the assigned content by end of day are made to repent of their faithlessness, through whipping and the gnashing of teeth.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery chair is engraved with a powerful verse of scripture from your Holy Book, and a large ornate den has been constructed on the eastern fringe of the common area to serve as the Firebase's orthodox confession booths. War is hell, and here, soldiers are often invited to speak anonymously with the compassionate and unjudgmental priests of the faith to share their most troublesome memories. It is only here that they can safely unload their emotional burdens of guilt, anxiety, and fear to the benevolent unseen listener, and receive absolution.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOn every wall of the barracks, the authoritative scripture in boldly inscribed in fine calligraphy. Disguised speakers tucked away in corners play gentle, unobtrusive hymns that ease the troops to sleep at nights, and the beds themselves are painted in majestic colors that herald the glorious destinies of the faithful that use them.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAt the entrance of the armory, a pair of priests stand ready to greet every single entrant with an oil anointment and quickly chanted Prayer of Protection. For those that finish their battle preparations quickly and seek additional enchantment, horizontal stone slabs are to be found along a wall near the exit, where one can lie down and receive a laying of hands upon themselves by chattel habit-clad slavegirls with well oiled hands and a hymn of their lips. In one corner, a few squads of fully-kitted soldiers huddle around a fiery chaplain, as his sermon riles them up for their righteous task ahead!\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA massive chandelier dominates the ceiling of the command center, shining a golden shining light over the entire command space. A pair of chaplains stand vigil at the entrance, granting anointments and quick ritual blessings upon staff members that come onto their shift, and each command shift starts with the relevant staff gathering together to say ritual prayers for sound judgement, swift decision-making, and furious conquest in your name.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nStorage rooms within the drug laboratory have a unique addition; a well-kept shrine is to be found in each one. Each shrine serves as an anointed packaging center, staffed by clergy who are busy in prayer and packing, simultaneously both safeguarding and enchanting the drugs they organize and store behind them, with the help of the mystical spiritual energy that only they can provide.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPleasing is the sight of the Firebase's humble supplicants making use of the trinkets purchased in the name of the faith. Of course, your Holy Book is a best seller around here, but so are supplementary items like hymn books, tapers, wood or metal carved holy symbols or prayer beads, blessed oils, and robes, head coverings, & habits for every rank of believer. Of course premium services like burial ceremonies or the granting of indulgences are popular selections too, for those who feel sufficient conviction to need them and have the money to afford them.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery inch of your reconnaissance drones has been carefully repainted to make them directly resemble ghastly flying skulls. As they hover above the battlefield, those few enemies that spot them and futile try to shoot them down are deftly reminded by their appearance that death is nigh, and that the final demise is coming soon.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSome would say that the Firebase's garage is ruled by superstition. Of course, the garage staff disagrees with this notion; in the garage, there is only Rite and Rote. The colorfully robed technological priests of the garage facility always take care to perform all necessary rituals before, during, and after each repair, inspection, and augmentation of each vehicle. Chants and incantations of all measures are properly recited during routine maintenance jobs so as to properly honor every vehicle's presence, and properly blessed vehicles that crewmen should place their faith in are properly marked with sacred seals, with veteran and distinguished crews having privileged access to these exalted vessels. Overall, repairs take a bit longer to perform due to the extra ritualism, but since these ministrations provide divine protection, as well as further distinction from the heathens who do not pray as such, is that really a loss?\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery vehicle unit comes with several holy book and hymn book copies in a special fireproof underneath the driver's seat; it is hoped that these extra copies might be used in the field to help spread the faith to heathen lands that your vehicle units visit. Handwritten prayers have been scrawled onto the interior surfaces of many vehicles of well, to attract good fortunes, and blessed wax candles are sometimes brought along by the crewmen and burnt before combat for this purpose as well.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour original hangar staff have submitted themselves completely to faith and become a sacred order of robed technological priests. This ministry of flight takes its calling very seriously; its members have even replaced their organic arms with modular bionic arms that can attach and detach all manner of intricate power tools at will. Every act of repair and improvement is consecrated by an episode of prayer and ritual; scented oils lubricant your flying machines while holy mechanical instruments assemble and dissemble airframe components according to the sanctified maintenance guidelines. With this level of devotion and care, any instance of malfunction or failure from your aircraft during future operations can be considered nothing short of a bad omen.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nNot willing to risk desecrating the numerous litanies of the faith by exposing them to enemy fire on the outside of your craft, your selected personal favorite songs of prayer and excerpts of scripture are instead diligently inscribed onto every inch the interior of the aircraft's cockpits and passenger sections, where vehicle occupants can see them and have their resolve and conviction bolstered by them before and after battle. The ceilings of each aircraft's interior must be scrubbed clean of soot every week as well, since thick and tall handmade wax candles are burnt inside of the aircraft interiors during all hours of aircraft operation so as to appease the spirit and grant divine protections.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA grand chapel now occupies the prime area behind the common area. The peculiar architecture of the structure, combined with the highly specific paint scheme and meticulous interior decoration, makes the building itself demand a certain respect from all who enter. The layout of the building is complex, with sections for laying and using prayer mats, rows of pews for adherents to sit and be ministered to, and platforms for clergy and choir to take their place upon during services. It is also a place of great beauty; unique paintings and huge stained glass mosaic windows adorn the walls and ceilings as they illustrate the faith in ways that mere words would fail to do. On holy days, hymnal music and calls to prayer can be heard from within the building, inviting all to come and partake of the fellowship, prayer, and release within. There is no doubt that this holy temple serves as the centerpiece to the Firebase's spiritual culture.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA carefully placed artificial pond occupies the exterior of the Firebase, with impossibly clear, and supposedly blessed, waters filling it. It plays host to the regular water immersion spiritual ceremonies performed upon new recruits in order to initiate them into the Firebase population and culture, and religious chants and songs can frequently be heard from the robed clergymen as they perform their duties.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nPrayer and fasting have become regular activities in the Firebase, and as far as you can tell, the adherence is genuine. Your exciting new religion fills a void within your warriors that killing, drugging, and whoring do not. For many it provides comfort, and for those who do not ask too many questions, it provides answers. Rather than face cremation, the bodies of your fallen are ritually buried, ensuring optimal passage into the next life. Weekly ceremonies are held for community meditation on matters of the spirit, and the tenants of your faith are taught consistently throughout basic training alongside the conventional curricula. Soldiers and staff can be heard humming hymns or quietly chanting sacraments as they clean weapons and tools, get dressed, move about, and perform many other typical tasks, including fucking. Quite a few officers and NCO's double as priests too, and army chaplains are a coveted addition to any platoon that doesn't already have one. It is common for deployed troops to pray for protection for themselves and their comrades before mounting up and heading for battle, and as you see a fully kitted infantry section huddled in a prayer circle right now, you are confident that the new faith has succeeded.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nChattel Religionism: The Colonel is wearing your holy symbol on a discreet necklace, and no longer criticizes The Faith as harshly as she used to. Sometimes you even see her flipping through the copy of your Holy Book that she keeps around, with a neutral expression instead of her usual sneer. It seems she's stuck in a transition of sorts. You never see her praying or speaking with your priests though. She'll come around some day. They always do...\n`;
					}
					break;
				case 'Multiculturalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nIn anticipation of the impending global meltdown that doomsday preppers are currently preparing for all around the world, you've had a secret location installed in the arcology, created to match the essential specifications of a modern luxury 'doomsday' bunker. To guarantee The Colonel's survival and comfort in the event of an apocalyptic crisis, you've gone all out: You've carved out an underground formation far underneath the arcology's foundations to build her a private fallout shelter, complete with a secure communications center, her overseer bedroom and several private bedrooms & bathrooms, an artificial aquifer, an agricultural greenhouse, a gymnasium & swimming pool, a fireproof storeroom packed with years worth of dried rations & medical supplies, a stocked munitions room, and a sealed underground passageway leading back up to the surface. When she first entered the overseer bedroom, she found the various emergency survival tomes you've bought for her and her future fellow dwellers. She also saw the extraordinary modular HazMat suit you've had made to her exact measurements, for that special day when she will be ready to emerge from shelter and take on whatever is left of the world.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe troops are provided their pick of foods from many Old World countries and many 'New World' Free Cities alike. Delicacies and drinks from nearly every part of the world are available, with many soldiers even being acquainted with the histories and variations of their favorite dishes.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe porn the troops are given reflects variety; the troops are shown many sexual films encompassing many genres. These films hail from arcologies and societies around the world that specialize in their respective genres, and watching such exquisitely crafted content broadens the troops' sexual horizons immensely and makes for much discussion.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSelect slaves among the slave population wear proper business attire with their collars; during slave meals these slave-lecturers terrify the mass of slaves present with dire and truthful news of recent events in the Old World, and even other arcologies. The unspoken implications are heard by all in attendance: They are all best off where they already are; there is no safety in 'freedom'.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAt the start of each day, the inmates of the slave processing cages are made to stand at attention in neat groups and carry out role call. Each group member is shackled together to form chain-gangs, before these chained groups are herded by armed wardens to perform various harsh menial tasks just outside the Firebase, like digging ditches and trenches, or laying barbed wires or service roads.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nFirebase kitchen organization and common area seating layouts have undergone major overhauls, all to make the Firebase strongly resemble an Old World shopping mall's food court. Food preparation crews have been heavily splintered to staff the dozens of food hut 'restaurants' that now encircle the common area; each 'restaurant' handles a different kind of food exclusively, and what used to be a very unified and versatile staff has now become very scattered and specialized. Every few tables or so has a quaint attraction such as a water fountain, a statue of a war hero or legendary slave, a luxury automobile display, or some other kind of diversion. Such eye candy is emplaced for all to see, each one complete with small benches nearby for sitting, chatting, and admiring.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe barracks formerly had a lackadaisical attitude towards segregation of genders (as some private militaries of the Free Cities are wont to do), but no more. As per Old World regulations, The Barracks now has very clearly defined 'Male', 'Female', and 'Other' Dormitories, Restrooms, and Locker Rooms. There are also stern warnings posted on the nearby bulletin concerning trespassing these boundaries outside of emergency situations.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLuxury has taken hold of the armory, since it has been decorated to resemble a high-society gun club of the sort growing in popularity in the increasingly dangerous Old World. Fine redwood chairs and tables lie to the side of the main munitions stores, and squads of veterans sit around each table to talk about their day's assignment as they don their war gear or assemble weaponry. The flags of your arcology and its allies hang proudly overhead from every wall, and upon their fatigues your soldiers proudly wear arm patches sporting the flags of their home country or native arcology, right below the flag of your arcology. In a specially-built side room lies an advanced AI-managed shooting range, where soldiers can try out an exotic range of the newest high-tech munitions from the world's most advanced Old World countries and Free Cities alike.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe battle stations of the command center have been rearranged very traditionally. Instead of the previously loose, flexible, and modular floorplan originally employed, the command center's floorplan is now a rough rectangle, with tables, kiosks, and equipment now structured into neat rows and columns according to unit jurisdiction and function. All slave activities are kept strictly to one side of the command center to minimize distractions, as well.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe drug laboratory has secret underground tunnels trailing out of it, leading to secretive drop-off points where the unique concoctions synthesized within the Firebase are sold to anonymous drug traffickers hailing from a multitude of countries and arcologies. In the numerous storage rooms, naked slaves supervised by armed guards are tasked with packaging the many drug kilos that are meant for both Firebase personnel and outside clients. The cash your drug staff makes from its many covert international dealings is crudely piled up, one plastic-foil wrapped bundle after another, all over the drug lab facility, and you see several well-dressed and well-armed 'salesmen' surveying their earnings as they pass. These liberal touches, along with the ubiquitous surplus drug piles, drug-addicted hookers, masked thugs visible, all give this place the air of an Old World drug cartel's villa.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nBeautiful is the sight of the Firebase's diverse population making use of the trinkets purchased through the freedom of multiculturalism. Of course, numerous international best selling media works are sold around here, but so are supplementary items like tourism books & tourist maps for faraway destinations, exotic sculptures and jewelries, exotic incenses and perfumes, and foreign garments and accessories from every visiting culture. Of course premium services like private lessons in esoteric forms of cooking, dance, painting, or any other pastime you can imagine are all here too, for those who feel curious enough to explore them and have the money to afford them.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery inch of your reconnaissance drones has been carefully repainted to make them directly resemble a globe-shaped representation of the planet Earth. As they hover above the battlefield, those few enemies that spot them and futile try to shoot them down are deftly reminded by their appearance that the earth abides, and that the world will go on just fine without them.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSome would say that the Firebase's garage has become a mere showroom. Of course, the garage staff disagrees with this notion; the garage has become a place of demonstration and opportunity. The entire garage has been carefully rearranged; the repair, maintenance, and upgrade bays have been tightly reconfigured to fit snugly into the rear sections of the facility; the forefront of the floorspace has been repurposed to showcase the Firebase's newest and most exciting ground warfare vehicle platforms and upgrades to merchants, commanders, representatives, and dignitaries from a variety of allied and neutral territories and arcologies, as a basis for prospective future cooperation and trade deals, and of course, a form of threat deterrence against those secretly plotting hostilities. Exotic foods and wines are kept on store and made available during exhibition events so as to properly honor each VIP's prescience, and sometimes properly distinguished garage staff and vehicle crews are made to dress up and be introduced to these powerful figures as exalted VIP's in their own right. Overall, repairs take a bit longer to perform due to the troublesome reduction in operating space the workers have, but since these trade shows provide unique support and permissions from abroad, as well as further distinction from the multitude of less cooperative arcologies who do not form international ties as such, is that really a loss?\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery vehicle unit comes with several empty and half-empty scrapbooks, lots of gel pens, and several modern Polaroid & HD cameras with extra film and hard disks in reserve, all packed within a special fireproof box underneath the driver's seat; it is hoped that these materials might be used in the field to help vehicle crews capture and better documents the experiences, sights, and discoveries of your vehicle units as they explore, learn, and fight through foreign lands.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour original hangar staff have socialized themselves completely to the multiculturalist agenda, and have become a well-connected group within the Free Cities' international aviation engineering community. This flight club takes its profession very seriously; its members have even invested in modular bionic exosuits that can attach and detach all manner of intricate power tools at will. Every act of repair and improvement is cross-checked and verified by several qualified personnel before the serviced aircraft is approved for its net flight. Scented candles from abroad alleviate the stench of the heavy oils that lubricate your flying machines, while trendy global-trotting music drowns out the sound of heavy mechanical instruments at work. With this level of oversight and professionalism, any instance of malfunction or failure from your aircraft during future operations can be considered nothing short of sheer coincidence.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nUnbeknownst to the variety of non-hostile actors that your aircraft must pass overhead in order to reach their next mission, your selected personal favorite quotes, books & articles excerpts, and works of art taken from your multiculturalist collection are diligently inscribed onto every inch the interior of the aircraft's cockpits and passenger sections, where vehicle occupants can see them and have their resolve and conviction bolstered by them before and after battle. The ceilings of each aircraft's interior must be scrubbed clean of soot every week as well, since thick and tall imported wax candles are burnt inside of the aircraft interiors during all hours of aircraft operation in remembrance of every pilot and passenger that has died while operating from that aircraft.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA grand supermarket now occupies the prime area behind the common area. The familiar architecture of the structure, combined with the highly prolific paint scheme and globalized interior decoration, makes the building itself achieve a certain rapport with all who enter. The layout of the building is complex, with sections for buying international delicacy foods, rows of racks for shoppers to buy rare and specialized tools and trinkets, and platforms for customers to browse all manner of Free Cities and Old World apparels, luxury cars, exotic pets, and many other amusements. It is also a place of great finds; highly coveted niche publications and artworks are on offer in the less frequented corners, and huge high resolution wallscreens adorn the walls and ceilings as they illustrate the newest products and clearance sales on offer. Everyday, upbeat music and audio adverts can be heard from within the building, inviting all to come and partake of the fun within. There is no doubt that this place serves as the centerpiece to the Firebase's materialistic culture.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA carefully paved world-class swimming pool occupies the exterior of the Firebase, with an integrated water heater, several water slides, and even a built-in waterfall. The pool and its surrounding platform plays host to the regular pool parties and swimming competitions that are open to all soldiers and staff that have some free time. Laughter can frequently be heard from the swimwear-clad partygoers as they hang out and socialize here.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLenghty, good-spirited debates and competitions have become regular activities in the Firebase, and that is to be expected. Your exciting, inclusive tolerant, and artistic multiculture fills a void within your warriors that killing, drugging, and whoring do not. For many it provides new outlooks on life, for those that delve deep enough, it provides novel reams of worldly wisdom. Rather than take up space in cemeteries, the bodies of your fallen are promptly cremated to make more room for the living. Every week, ceremonies are held in honor of Life itself. Sanctioned protocols for properly interacting with non-hostile civilians, soldiers, and slaves from foreign countries and arcologies are taught consistently throughout basic training alongside the conventional curricula, which has so far worked well in avoiding faux pas that could have lead to needless conflict with members of other cultures. Soldiers and staff can be heard humming internationally-popular songs or quietly chanting military cadences as they clean weapons and tools, get dressed, move about, and perform many other typical tasks, including fucking. Quite a few officers and NCO's double as language teachers too, and trained interpreters are a coveted addition to any platoon that doesn't already have one. It is common for deployed troops to exchange gifts with one another before mounting up and heading for battle, and as you see a fully kitted infantry section huddled around an ornate tree right now, you are confident that the globalization effort has succeeded.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMulticulturalism: Sometimes when The Colonel is making her rounds in the Firebase, you'll see her wearing a finely tailored business suit, complete with jacket and skirt, much like many wealthy and powerful women these days. Sometimes when she is relaxing or sleeping she'll wear just a simple comfortable bra and panties, like most women around the world do by now too. Her pavilion contains a wide assortment of goods made from countries all over the world, not just this part of it. Her combat battledress now features a simple cloth beret and a collapsible ballistic shield painted to look like the flag of the ${V.SF.Lower}.\n`;
					}
					break;
				case 'Slimness_Enthusiasm':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nIn celebration of Slimness Enthusiasm, you've gifted The Colonel with her very own fleet of small single-seater reconnaissance buggies, all made from extremely lightweight-yet-durable alloys, and precisely engineered miniature nuclear reactors meant to allow each vehicle in the fleet to achieve obscene speeds in the field in all terrains. They even come with roof hardpoint mounts for mounting light remote-operated weapons. Thanks to their stellar support systems they also ensure driver safety and orientation during use, reliably absorbing and redistributing the energy received from the multitude of shocks, bounces, g-forces, jolts, jumps, and other maneuverability hiccups that would make these vehicles impossible to handle without them. All that being said, they are very fun to drive and eventually master. Also, their extreme mobility, tiny target profiles, quiet engines, and ease of camouflage all make them excellent recon vehicles for The Colonel and her friends to use for races, scouting missions, and raids whenever things in the Firebase get too boring.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe meals are prepared and presented as low-calorie or even calorie-free, stripping fatty content wherever possible. Smaller portions and slices than market standard are not uncommon either.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMuch of the movies and porn videos the troops receive prominently feature glamorous model-thin actors and actresses alike, with tiny tits and asses, and usually very little bodyfat. With bodies so light and thin, every endeavor onscreen, from fight scenes to sex scenes, is usually very intense and fast paced. \n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA good portion of the slaves in the Firebase are quite skinny. They have slim assets on their bodies and are generally lightweight. A few discerning troops are seen checking them out from afar, from time to time.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe new slaves kept in the processing cages are aggressively slimmed down. They are given only one medium-sized meal at midday, and yet they are required to work and train for their new lives just as hard as any other slave.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAlong the greatest length of the common area, there is a full proper running track, complete with laid tarmac and white paint. It is comparable to the tracks used by any modern sports team, and even has a tiny booth staffed by in-house bookies, where troopers go to place their bets or collect their prizes for the weekly slave Races and monthly Coursing games. This track also has a feature you wouldn't find on most tracks, which are the compact wheeled cages on either end, for owners to store their prized runner slaves, or collect a runner slave they just won through their bets. Aside from concession stands, raised seats are lined up on the sides of the racetrack, for spectators and judges to observe and film the footraces themselves.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTo emphasize the fashion for slimmer slaves and soldiers, the rooms of the Barracks have been renovated to make each one smaller, with thinner walls. This has the secondary effect of freeing up space for a few additional rooms altogether.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery single weapon and armor rig in the armory has been stripped to its bare essentials, and every soldier is incentivized and encouraged to find innovative new ways to make their assigned weapon even lighter while preserving as much as possible of its performance. Many assets and materials are provided freely within the armory for this purpose, with soldiers often coming here on their off hours to make use of the hired gunsmiths, installed workbenches, and 3D printer fabricators on-site to make additional weight reducing tweaks to their hardware.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nBattlestations within the command center are tightly packed together to maximize the space available, thus making room for even more command areas to be squeezed in. Thankfully, this allows for the command staff to run more operations simultaneously than ever before, considerably increasing their tactical capacity. This is possible because the existing furniture and equipment of the area, including the slaves assigned here, have been replaced with slimmer variants that perform just as well, thus freeing up space.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe drug lab facility has a built-up concert hall extension where off duty personnel can come and PARTY! Performers from all across the Free Cities are hired to come and give remote 3D hologram performances to the weekend crowds that come here, and there is a great deal of jumping and shouting as part of the activities. Spicing up the festivities is the abundance of newfangled trial drugs freely given to those who come, since your chemical engineers are happy to let visitors be their second test population for the effects of their newer substances. After each event, hundreds of empty syringes and cups alike can be seen all over the floors.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour Firebase people like to keep things light. Duffel bags, handbags, and other form of off-duty carriage are now rather small, as you troops like to keep only bare essentials with them. Tight, form fitting clothing is the norm, and it has been noted that even personal computers, smartphones, flash drives, and so on are only available in downright tiny variants, as if lugging around even normal size, somewhat-bulkier equipment were a social taboo. Since smaller luggage has become the standard, the personnel have become minimalists too. Many of the Firebase population have drastically downsized their personal in-house inventories to better fit in, with many people making use of premium storage containers for excess possessions. 'Less is more' is no longer just a saying, after all.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMost of the drones of the Firebase have been slimmed down through very skillful remodeling, so as to give them a seeker profile and smaller target signature.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAdvanced technologies were always implemented within the Firebase, and the garage is no different. Slimness Enthusiasm mania has pushed the garages procurement specialists working out of the rear offices of the facility to acquire complex new ultra-lightweight vehicle chassis kits for your ground vehicles.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSince their initial delivery into the Firebase, your ground vehicles have been nearly completely rebuilt using the finest in modern lightweight metal composite kits, replacing your vehicles' original heavy metal composition with much lighter alternatives. These modification have made your ground units lighter (allowing most of their vehicles to be air-liftable so as to better carry out advanced air assaults) as well as faster and slimmer. Of course, some degree of amour protection and survivability was sacrificed to achieve this.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nShort, thin, and narrow revetments separate each of the aircraft stored in the hangar, and the thin airmen that occupy the hangar have no trouble squeezing under and in between the tight spaces around in order to work on the many aircraft. There is quite a bit of free space in between each workstation because every area of the facility has become so very trim and tightly packed.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe aircraft within the hangar cannot be slimmed down too much without stripping away at key systems and compromising their functionality, so instead the staff have settled for modifying their weight. Great expense has been taken to replace each airframe hull component with durable lightweight composite metal alloys, giving each aircraft a lighter weight and higher speed while retaining just as much of its original constitution. Because of this, Firebase aircraft are renowned on the battlefield for their speed, and despised for just how hard they are to score hits on because of their great speed.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe barracks themselves have a new section built, and this section is very special: It is a comfortable, if minimalist, public housing condominium intended to host the families of those officers who desire to have their loved ones live in the comfort and safety of the Free Cities at minimal cost. Much like the building itself, each apartment of the condominium is slim but luxurious, and for the families that have chosen to live in this place, there is much fun to be had on the roof, which has its very own civilian-only swimming pool, hot tub, and barbecue platforms overlooking the rest of the Firebase.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe colossal retractable blast doors that seal the Firebase whenever entry or exit are not required are no longer covered with only mere composite armor plating; the exterior armor plating is now itself covered by two massive interactive motion wallpapers depicting several very slim and very beautiful girls that are always beckoning incoming parties and even casual onlookers to enter.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe population of the Firebase is slim-bodied. All personnel, from cooks, to pilots, to infantry, have some form of size reduction done to themselves; liposuctions have become quite popular, and breast and buttocks reductions procedures are in vogue. Cash bonus incentives as well as positive peer pressure are used as useful forces to push new recruits into the slimness mindset. Sleek is sexy, and your soldiers embrace this attitude wholesale, with the compactness of one's body parts and possessions considered a key indicator of social status as well as personal areas of continuous improvement.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSlimness Enthusiasm: The Colonel has gotten several additional slaves for her pavilion, and they are very trim, with flat bellies and minimal assets. Sometimes you spot The Colonel casually picking one of them up wholesale and carrying them over her shoulder to her couch for use.\n`;
					}
					break;
				case 'Asset_Expansionism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nIn celebration of Asset Expansionism, you've gifted The Colonel with her very own super-heavy missile tank. Making up its shape are its four wide tracks and its thoroughly protective armoring that includes thick Chobham-based armor, overlapping detachable NERA plates, a mine-resistant underbelly, and broad RPG cages along the turret, roof, & hull. It has equally excessive weaponry too; with its large crew, its high-caliber quad-barrel autocannons, automatic grenade launchers, and its ATGM hunter-killer turrets, it can engage myriad opponents simultaneously. The missile tank's computing systems maximize it's crew's situational awareness using thousands of real-time data sources, ensuring that the crew always has optimal targeting solutions and can avoid enemy strafing and flanking attempts. These features make this mobile weapons platform a great asset in the field, despite its large target profile. All in all it is a very fun vehicle for The Colonel and her friends to take onto the battlefield for explosions and giggles whenever things in the Firebase get too boring. `;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEach food item that ends up on the plate of your soldiers is bigger than it might normally be. For example, in the fast food section, everything served, from the meat patties to the buns to the French fries and the soda tubs that come with them, are all individually huge by Old World standards, filling the plates and paper bags they come in rather easily. Colossal cakes, pies, and other goodies are on display next to the other foods on offer in your Firebase, which are also bigger than they should be.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMany device screens in the Firebase are utterly filled with asses and tits, as truly stacked slavegirls star in all manner of pornos. Some of these screens are instead filled with 'big junk', as massively endowed male actors use their large equipment on their partners in all manner of positions too.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nA good portion of the slaves in the Firebase are quite stacked. They have large assets on their bodies and are generally heavy from the weight of all that extra flesh. A few boisterous troops are seen ogling them from afar, from time to time.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nGrowth hormones are given in small doses every week to the captives in the processing cages every week. It doesn't take long before each new batch is populated by slavefolk with impressive proportions.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery chair and table in the common area has been heavily reinforced to safely handle the weight of the slaves, should they be brought to bear. In addition, they have all been significantly widened as well to accommodate for the vast proportions. No matter how stacked the slave, or how said slave is being utilized, they shall be easily handled now.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTo emphasize the fashion for well-endowed slaves and soldiers, the beds of the Barracks have been reinforced to make each one wider, with stronger bedframes. This has the secondary effect of freeing up space for a few additional sex slaves in each bed, or a single greatly stacked one.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe men and women of the Firebase are always encouraged to expand upon their weaponry, and for most, the armory is the place to do exactly that. In the center of the armory lies a massive table that hosts a dizzying and splendid assortment of magnetic picatinny rails, huge under-barrel shotguns or grenade launchers, tritium iron sights, broad and adjustable laser sights, large zoomable scopes, collapsible tactical bipods and tripods, extended or reinforced gun barrels, adjustable stocks, extended magazines, massive drum magazines, terrifyingly large bayonets and combat knives, bulky grenades with extra fragmentation effects, and so on, and so forth. Troops are encouraged to pile as many attachments and accessories onto their weapons as practically possible, and by the time they are done, you could swear that their weapons are almost as big as they are.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nBattlestations within the command center are twice as tall as they were before, due to the implementation of universal equipment redundancies. Every wall-mounted machine, holographic operations table, computer console, digital archive, and backup hard drive has been bolstered with the existence of new identical back up copies, ensuring that no data is lost should some terrible accident, physical attack, or cyber breach occur. These backups have been stacked vertically to avoid taking up precious floorspace.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe drug lab facility has a built-up topless bar extension where off duty personnel can come and drink themselves silly. All manner of typical bar snacks and games can be found, with darts, beer pong, and other games of marksmanship being particularly popular. Of course, the men will sometimes tire of these games and decide to play with one of the numerous big-tittied barmaids instead. Spicing up the festivities is the abundance of newfangled trial drugs freely given to those who come, since your chemical engineers are happy to let bar patrons be their second test population for the effects of their newer substances. After each event, lots of empty syringes and spilt beer alike can be seen all over the floors.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour Firebase people like to go heavy. Duffel bags, handbags, and other form of off-duty carriage are now rather large, as your troops like to keep all of their conveniences on hand. Elastic, form fitting clothing is the norm, and it has been noted that even personal computers, smartphones, flash drives, and so on are only available in downright massive variants, as if toting around even normal size, somewhat-sleeker equipment were a social taboo. Since bigger luggage has become the standard, the personnel have become maximalists too. Many of the Firebase population have drastically upsized their personal in-house inventories to better fill their baggage out, with many people making use of premium storage containers for excess possessions. 'More is more' is no longer just a saying, after all.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMost of the drones of the Firebase have been bulked up through very skillful refitting, so as to give them bulkier profile and greater armor protection.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAdvanced technologies were always implemented within the Firebase, and the garage is no different. Asset Expansionism mania has pushed the garages procurement specialists working out of the rear offices of the facility to acquire complex new high-caliber vehicle armament suites for your ground vehicles.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSince their initial delivery into the Firebase, your ground vehicles have been nearly completely rearmed using the finest in modern composite-material multipurpose heavy guns and heavy autocannons, replacing your vehicles' original general purpose weaponry with much more destructive alternatives. These modifications have made your ground units much bulkier, as well as heavier (preventing some units from being air-lifted for advanced air assaults) but much more terrifying and deadly, as your vast tank barrel can be seen even from afar. Of course, some degree of mobility was sacrificed to achieve this.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nTall, thick, and wide revetments separate each of the aircraft stored in the hangar, and the well-endowed airmen that occupy the hangar have gotten used to squeezing under and in between the tight spaces around in order to work on the many aircraft. There is not much free space in between each workstation because each individual workstation has been made huge in order to handle bigger workloads.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe aircraft within the hangar cannot be bulked up too much without increasing their weight significantly and thus compromising their functionality, so instead the staff have settled for modifying their appearance. Great expense has been taken to augment each airframe with an integrated 360 degree long-range holographic projector, giving each aircraft an utterly massive false appearance that is intended to terrify enemy ground troops and cause many of their active shooters to miss, as their shots pass harmlessly through some of the airspace that the aircraft's hologram is projected through. Because of this, Firebase aircraft are renowned on the battlefield for their apparent size, and despised for just how hard they are to score real hits on despite their large target profile.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe barracks themselves have a new section built, and this section is very special: It is a spacious public housing condominium intended to host the families of those officers who desire to have their loved ones live in the comfort and safety of the Free Cities at minimal cost. Much like the building itself, each apartment of the condominium is expansive but plain, and for the families that have chosen to live in this place, there is much fun to be had in the lobby, which has its very own civilian-only movie theater, recreation center, and sports arenas independent of the rest of the Firebase.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe colossal retractable blast doors that seal the Firebase whenever entry or exit are not required are no longer covered with only mere composite armor plating; the exterior armor plating is now itself covered by two massive interactive motion wallpapers depicting several very busty and very beautiful girls that just beckoning incoming parties and even casual onlookers to enter.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe population of the Firebase is big-bodied. All personnel, from cooks, to pilots, to infantry, have some form of size increase to bear; genital enlargement, breast enlargement, and buttocks enlargement options are all available and widely used, with lenient but firmly enforced size limitations existing only to ensure the troops remain proportionate enough to carry out their duties effectively. Bigger is better, and your soldiers embrace this attitude wholesale, with the volume of one's body parts and possessions considered a key indicator of social status as well as personal areas of continuous improvement.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAsset Expansionism: The Colonel has actually gotten herself some respectable breasts and buttocks; they are perky and big by most Old Worlder's standards, but come just short of being truly cumbersome to a warrior like herself. To your trained eye, her enhancements are even natural, probably from A-HGH injections. You are impressed. When she gets ready, she'll have one of her newer, very sizable slaves come up so play with her. There is this one very well endowed male slave she has that you almost pity; she gets endless amusement from frequently blue-balling him with her hands, feet, enhanced breasts or buttocks, or even pussylips whilst mocking him for getting his hopes up yet again.\n`;
					}
					break;
				case 'Roman_Revivalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nThe Colonel has been bestowed with an unmistakable and peerless. badge of office - a mastercrafted SPATHI sword, forged from nigh-unbreakable metals, made extremely sharp with the help of a machine that she also now owns, and equipped with an inbuilt communications array, holographic display projector, recharging port, and fingerprint scanner that delivers electric shocks to anyone other than The Colonel when wielded. It comes with an immaculate sheath, and a complementary gold-wrought laurel wreath and fine linen toga, further enabling her to command the legions of the Firebase with absolute authority and authenticity within the Roman tradition.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou spare no expense to supply your troops with increasingly rare boar and deer meat, distinctive of Roman cuisine.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers also enjoy fresh fruits while watching gladiator games, public speakings of famous orators or the history of Ancient Rome on wall-screen TV.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll of the slaves serving here are from outside of your arcology, captured during the many military expeditions staged from the Firebase.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll new slaves are being re-educated in the specially-built Paedagogia, busily learning the Latin dialect and Roman mannerisms and customs.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area has been stylized to look like an Ancient Roman forum, where the spirit of greatest Empire is still alive.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers sleep and live in dormitories built in classic roman design, being accented with both marble pillars and marble statues.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe weapons and armor of your troops are stylized after the Roman Legions of old, with each soldier gifted with a modernized gladius.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center is a bastion of the Roman spirit, adorned with reliefs depicting the Gods and great battles in history of Imperium Romanum; a grand exaltation of discipline and militarism.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMeanwhile, the local Valetudinarium serves a place of healing and enhancement, where miracles of cutting-edge modern medicine as well as more traditional cures are available for your legionnaires.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLuxurious togas and (especially for many women) elaborate jewelry have become a widely popular fashion for your troops in between missions.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe nearby drone bay section, dubbed 'De Spelunca Harpyis', contains quick and deadly 'mechanica harpyis' drones with stylized wings, ready to deploy.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage, also known as the Stabula Machinis, is filled with noise of mechanicuses performing check-ups, upgrades, and repairs on your vehicles, making sure that Roman engineering is still the best in the world.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nParticular vehicles within the garage have been painted and modified to look more like quadrigas of old, with four horse heads and intricate reliefs of wheels.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar, also known as the Aer Navale, is filled with noise of mechanicuses performing check-ups, upgrades, and repairs on your aircraft, while the stalwart nauta caeli prepare for their next flight to ensure your dominance.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery single aircraft hull in the hangar is numbered with Roman numerals as opposed to modern digits.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou also spot a distinguished citizens here and there browsing nearby vendors that are selling trophies and loot acquired from previous missions and raids. These wares are not being sold by the legionnaires themselves, of course, as such a task is beneath their status. After their missions your soldiers also visit Thermae - a popular place to relax and socialize.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOutside the Firebase gates, several dozen crucifixes stand tall and erect; captured deserters and informants, would-be assassins and enemy scouts, exposed spies and infiltrators, reviled enemy leaders, and incompetent or uncommitted Firebase soldiers are tied to the crosses and made to hang from them. Their sentences there can last for hours, days, or until death, depending on the severity of their transgressions as determined by the officers involved in their detainment.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers put in effort carry themselves in a stoic, disciplined, and dignified manner at all times. They identify first and foremost as 'legionnaires', and are proud to have an efficient state such as yours to all home and fight for. In their personal dealings, they do their best to handle most affairs using the esteemed Latin dialect, and they avoid unseemly things like debt, lying, and oath-breaking like the plagues that they are. These are true Roman men and women, and they will bravely carry your society into the future as they carry your name through the lands.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nRoman Revivalism: Sometimes when The Colonel is relaxing or just making her rounds in the Firebase, you'll see her wearing nothing but her laurel wreath and toga. She also likes to sleep in such attire. Her pavilion sports four white marble columns in its corners, topped by a white marble roof with light fixtures installed. Her combat battledress now features an ornate golden helm, sword, and cape as well.\n`;
					}
					break;
				case 'Aztec_Revivalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nIn honor of the soaring Aztec Revivalism of the Firebase, you've granted The Colonel a little Aztec empire of her own; you've purchased and rejuvenated a distant outcropping of ideal land, seeding it with the proper flora and fauna of the rainforest and constructing within them a modest step pyramid, a sacrificial altar, a miniature palace retreat for her lodging, and a few dozen huts populated by low-class Aztec Revivalists who pay their taxes to her during her visits here. Regardless of her feelings about Aztec Revivalism, The Colonel is flattered and amused to have her own little province to rule as she pleases.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou spare no expense to supply your troops with increasingly rare fruits and vegetables, distinctive of Aztec cuisine.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers can also enjoy poaceae plants, like famed corn, while playing patolli or watching ullamaliztli on wall-screen TV.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nDown here, the slaves are eager to please their masters; each slave consistently works hard in hopes of earning their freedom someday.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll new slaves are being re-educated in the Tezcatlipoca's temple, diligently learning about Aztec manners, culture, and language.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area has been stylized to look like the ceremonial center of an Aztec city, where the gaze of bloodthirsty Gods can be felt.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers sleep and live in dormitories built in pre-European Mesoamerican design, adorned with gold, carved stone, and fine hand-crafted furniture.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe weapons and armor of your troops are stylized after the otomi's ones in the ancient Aztec army, with each soldier gifted with a modernized huitzauhqui.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center of the Otomies is adorned with statue depictions of the Gods made from pure gold, and wall paintings of great battles in history of Excan Tlahtoloyan that serve as praise of fierceness and bravery.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMeanwhile, the local Temple of Patecatl and Ixtlilton serves as a place of healing and enhancement, where miracles of cutting-edge modern medicine as well as more traditional cures are available for your yaoquizqueh.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nJewelry made from gold and jade, as well as elaborate headdress from quetzal and cotinga feathers grown in your very arcology have became a wide popular fashion for your troops in between missions.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the nearby temple of Xolotl, engineer-priests prepare the mechanical xoloitzcuintli for the next hunt.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAside from normal duties, engineers also make sacrifices to the Gods in hopes to please them and ensure that the vehicles do not malfunction.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nParticular vehicles within the garage have been painted in many bright colors and modified to make them appear more animalistic and primal in nature.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAside from normal duties, engineers also make sacrifices to the Gods in hopes of pleasing them; they need to ensure that the aircraft do not malfunction and that the winds prove favorable in the field.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nBefore every mission, a handful of blood from the most recent sacrifice is taken and ritually sprinkled across the hull of each aircraft due for deployment, thus ensuring their flight mission readiness.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou also spot vendors selling exotic ancient Mesoamerican clothing, rare war paint, feathers strike the eye with their bright colors, and mannequins in full Aztec clothing as you pass. Nearby, a sacrificial altar in the shrine of Huitzilopochtli is almost always wet with blood.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOutside the Firebase gates, a small stony step pyramid has been carefully erected; captured deserters and informants, would-be assassins and enemy scouts, exposed spies and infiltrators, reviled enemy leaders, and incompetent or uncommitted Firebase soldiers are brought here for ritual sacrifice. Their execution rituals there can last for a few seconds, minutes, or hours, depending on the severity of their transgressions as determined by the officer-priests involved in their detainment.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers put in effort to always be fierce, courageous, and ambitious at all times. They identify first and foremost as modern Aztec 'warriors' of your arcology, and are quite proud to have such a blessed empire such as yours to call home and fight for. In their personal dealings, they do their best to handle most affairs using proper Aztec dialect, and they are not hesitant to give their regular blood tithes as tribute to help ensure the arcology's prosperity. These are true Aztec men and women, and they will ferociously carry your society into the future as they slash and burn their way through your many enemies.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAztec Revivalism: Sometimes when The Colonel is relaxing or just making her rounds in the Firebase, you'll see her wearing nothing but her leather loincloth and feathered hat. She also likes to sleep in such attire. Her pavilion sports a lot of indoor plants now. She has some Aztec-inspired tattoos. Her combat battledress now features gold highlights and a camouflaged loincloth as well.\n`;
					}
					break;
				case 'Egyptian_Revivalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nIn honor of the prevailing Egyptian Revivalism of the Firebase, you've granted The Colonel a little Egyptian empire of her own; you've purchased and rejuvenated a distant outcropping of pristine land, seeding it with the proper flora and fauna of the Nile valley and constructing within it a modest proper pyramid, a majestic sphinx, a miniature palace retreat for her lodging, and a few dozen huts populated by low-class Egyptian Revivalists who pay their taxes to her during her visits here. Regardless of her feeling about Egyptian Revivalism, The Colonel is flattered and amused to have her own little province to rule as she pleases.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou spare no expense to supply your troops with increasingly rare plants and meat of animals living in the Land of the Nile.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers also enjoy fresh barley beer, while watching festivals in honor of various Gods or stories and dramas of Ancient Egypt on wall-screen TV.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMany among the diverse crowd of slaves here are communal, with most of them belonging to the military itself instead of any individual soldier.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll new slaves are being re-educated in the nearby Temple of Toth, steadily learning about Ancient Egyptian customs and dialect.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area has been stylized to look like an Ancient Egyptian urban district, with temples and public places, where the spirit of Ancient Egypt is reborn.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers sleep and live in dormitories built in Ancient Egyptian design, adorned with hieroglyphs and pictures of battles the occupants were a part of.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWeapons and armor of your troops are stylized after the armies of the New Kingdom, with each soldier gifted with a modernized khopesh.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center is monumental, adorned with hieroglyphs and depictions of the Gods and great battles in the history of Kemet, and hieroglyphic wall inscriptions praising loyalty to the Pharaoh and glorifying him.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMeanwhile, the local Temple of Imhotep serves as a place of healing and enhancement, where miracles of cutting-edge modern medicine as well as more traditional cures are available for your nakhtu-aa.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nElaborate jewelry, luxurious tunics, wigs, and even burning perfume cones have become popular fashion trends for off-duty personnel to wear in between missions.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nIn the nearby temple of Am-heh, engineer-priests prepare his mechanical hounds for the next hunt.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage, also known as The Temple of Ptah, is filled with noise of reureiopes performing check-ups, upgrades, and repairs on your vehicles, thus continuing the legacy of their ancient predecessors.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nParticular vehicles within the garage have been painted and modified to look more like chariots of Ancient Egypt, being adorned with golden reliefs as they are.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar, also known as the Temple of Shu, is filled with noise of reureiopes performing check-ups, upgrades, and repairs on your aircraft. Now even the skies are ruled by their Pharaoh.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe interior cockpit of every vehicle contains weathered scrolls depicting every battle that particular aircraft has been in thus far, as well as that aircraft's role within said battles.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou also spot jewelry and clothing in Ancient Egyptian style, exotic perfumes, and incenses all being sold in specialized shops around the common area. Nearby, a shrine to Montu is often visited by the soldiers.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOutside the Firebase gates, a respectable limestone sloped pyramid has been carefully built with deep underground crypts for the benefit of deceased distinguished individuals; officers slain in the line of duty, retired officers deceased of natural causes, deceased scouts and informants that have done invaluable work for the Firebase, honored civilian leaders from the arcology proper, and heroic and legendary Firebase soldiers are all brought here for ritual burial, should they request for this honor whilst still alive.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers put in effort carry themselves in an enlightened, tolerant, and open-minded manner at all times. They identify first and foremost as the defenders of your 'New Kingdom', and are proud to have an ascendant nation-state such as yours to call home and fight for. In their personal dealings, they do their best to handle most affairs using the preferred Egyptian dialect, and they avoid unseemly things like uncleanliness, ignorance, and stagnation like the plagues that they are. These are true Egyptian men and women, and they will boldly carry your society into the future as the scribes record the history of your conquest through the lands.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEgyptian Revivalism: Sometimes when The Colonel is relaxing or just making her rounds in the Firebase, you'll see her wearing nothing but her sandals, a linen skirt, and a linen sports bra. She also likes to sleep in such attire. She has many hieroglyphics tattooed onto her back and arms as well, depicting a summarized account of her life story. Her pavilion sports four limestone pillars in its corners, all covered with hieroglyphs, holding up a limestone roof with light fixtures installed. Her combat battledress now features hieroglyphics depicting previous victories as well.\n`;
					}
					break;
				case 'Edo_Revivalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nWith your wealth and influence, you've managed to compile the world's most comfortable, sophisticated, durable, and expensive fabrics into one magnificent garment; The Colonel's Kimono. It is an article of unmatched beauty, modernity, and comfort: Its soft, sweat-wicking cloth interior make it an airy albeit form-fitting dress, while its waterproof exterior ripstop digital cloth-screen fabric allows it to adopt any appearance or combination of appearances The Colonel desires. Between the two, a thin soft padding of lab-grown silk-Kevlar hybrid weave allows the kimono to resist direct hits from knives, shrapnel, and even intermediate small arms fire, and between the weave layers lies internal heating and cooling wiring that serve to ensure she is always at a good temperature. Combine this super-dress with the collapsible titanium razor-sharp oriental fan and chopsticks that the Kimono came with, and The Colonel is now one of the best dressed and best protected women in the entire arcology.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou spare no expense to supply your troops with increasingly rare marine dishes, distinctive of Japanese cuisine.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers can also enjoy sake, while watching kabuki performances and dramas of Edo Japan on wall-screen TV.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nComfort slaves make up a the large part of slave population here, which is a natural state of affairs for a Free Cities military base.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll new slaves are being re-educated in the specially-built Terakoya, rapidly studying their way through the complexities of Edo period Japan's manners and language.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area has been stylized to look like a samurai district, where the Bushido Code is alive and thriving once more.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers sleep and live in dormitories built in traditional Japanese design in style of shoin-zukuri, adorned with wood and rooms separated by shoji.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe weapons and armor of your troops are stylized after the armies of Edo Bakufu, with each soldier gifted with a modernized katana.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center has an interior of a samurai's keep, adorned with weapons, armor-stand,s and art depicting great battles in the history of Nippon and framed calligraphy praising the adherence to bushido.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMeanwhile, the local Byoin serves as a place of healing and enhancement, where miracles of cutting-edge modern medicine as well as kanpo igaku are available for your samurai.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLuxurious kimonos, expensive weapons, and heavy makeup have became a popular fashion for your female soldiers in between missions.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe nearby drone bay section, dubbed 'Karasu No Su', contains chibi-karuras upgraded with flamethrowers, ready to deploy.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage, also known as the Shuri-ya, is filled with noise of gishis performing check-ups, upgrades, and repairs on your vehicles, only striving to achieve nothing less than perfection.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nParticular vehicles within the garage have been modified to be intimidating with painted or adorned demonic heads.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar, also known as the Eadokkuyado, is filled with noise of gishis performing check-ups, upgrades, and repairs on your aircraft, while the stalwart hiko-shi prepare for the next flight for the glory of their Tenno.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEvery single aircraft hull in the hangar is numbered with Kanji and Katakana numerals as opposed to modern digits.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou also spot nearby specialty shops selling high-quality traditional Japanese weaponry and clothing. These shops flank the luxurious Edo restaurant where off-duty soldiers can come to enjoy fresh sake with sushi, onigiri, and other traditional Japanese delicacies. In nearby dojo, some of your soldiers drill and improve their martial arts skills as part of their personal development.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOutside the Firebase gates, a multi-storied Japanese teahouse carefully built to conform to Edo aesthetics can be found; foreign traders and diplomats, aspiring recruits and job applicants, brave journalists and researchers, prestigious arcology citizens and tourists, ambitious businessmen and PMC talent scouts, and even retired Firebase soldiers looking to catch up with old friends are all invited here to partake of the tea, sake, and tantalizing slave-geisha performances and talk shop with the very well informed, charismatic, and articulate public relations personnel assigned here to deal with guests and address the outsiders' questions and concerns about the Firebase and its people.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers put in effort carry themselves in an elitist, industrious, and proud manner at all times. They identify first and foremost as soldiers of 'the emperor', and are proud to have a rising sun such as your arcology to call home and fight for. In their personal dealings, they do their best to handle most affairs using the esteemed Japanese dialect, and they avoid unseemly things like rudeness, impropriety, and dishonor like the plagues that they are. These are true Edo men and women, and they will passionately carry your society into the future as they fight in your name, through the lands.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nEdo Revivalism: Sometimes when The Colonel is relaxing or just making her rounds in the Firebase, you'll see her wearing nothing but a yukata and sandals. She also likes to sleep in such attire. She has also had a summarized account of her life story tattooed onto her back and arms, some parts in Kanji and some parts in Katakana. Her pavilion floor is now covered in high quality tatami mats. Her combat battledress now features an Oni mask, Katana, and some lightweight Samurai-inspired plating as well.\n`;
					}
					break;
				case 'Arabian_Revivalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nWith your wealth and influence, you've managed to compile the world's most comfortable, sophisticated, durable, and expensive fabrics into one magnificent garment: The Colonel's abaya. It is an article of unmatched grace, modesty, and comfort. Its soft, sweat-wicking cloth interior make it an airy albeit form-fitting dress, while its exterior ripstop light-absorbing carbon-black fabric allow The Colonel to simply disappear at will into shadows and dark rooms when she so pleases, especially if she decides to use the detachable niqab the garment came with. Underneath the dark exterior, a thin soft padding of lab-grown silk-Kevlar hybrid weave allows the abaya to resist direct hits from knives, shrapnel, and even intermediate small arms fire, and between the weave layers lies internal heating and cooling wiring that serve to ensure she is always at a good temperature. With a dress like this, The Colonel is now one of the best dressed and classiest women in the entire arcology.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou spare no expense to supply your troops with increasingly rare lamb and chicken meat, distinctive of Arabic cuisine.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers can also enjoy high quality coffee and arak, while smoking hookahs and watching middle-eastern dances or programs about philosophy and history of the Old Caliphate as well as the emerging new one on wall-screen TV.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMost of the slaves here are concubines in the personal harems of your wealthiest soldiers.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll new slaves are being re-educated in the specially-built Dar Al-Hekma, learning everything they need to know about the Sharia law, the Quran, and the Arabic language.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area is constructed in accordance with Sharia Law, with divisions introduced and enforced between genders, ethnic origins, and cultural perspectives. As a result, the common area is now a very fragmented place.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers sleep and live in dormitories built in traditional Arab design, adorned with girih tiles, carpets, and ivory or wooden carvings.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe weapons and armor of your troops are stylized after the armies of the Old Caliphates, with each soldier gifted with modernized saifs.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center is a bastion of Arab spirit, adorned with reliefs depicting the great battles in history of the Islamic Golden Age and framed excerpts from the Quran praising courage and faith in Allah.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMeanwhile, the local Dar al-Shifa serves as a place of healing and enhancement, where miracles of cutting-edge modern medicine as well as more traditional cures are available for your junud.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLuxurious clothing, jewelry, and intricate devices imbued with gold and gems became a fashion standard for your troops to wear in between missions.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe nearby drone bay section, dubbed 'Eash Alrukh' contains sturdy and powerful 'saghir alrukh' drones with stylized wings, ready to deploy.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage, also known as the Kiraj, is filled with noise of muhandises performing check-ups, upgrades, and repairs on your vehicles, thus continuing to impress the world with arab ingenuity.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nParticular vehicles within the garage have been painted and modified separately, with much inspiration taken from camel cavalry of old; these 'cavalry' vehicles have been equipped with two turrets mounted on their roofs.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar, also known as Hazirat Al-Tayirat, is filled with noise of muhandises performing check-ups, upgrades, and repairs on your aircraft, while the stalwart altayarayn prepare to strike the enemies of the new Caliphate from above.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hulls of every aircraft in the hangar are painted with Arabian war chants, written in the Arabic dialect with the help of bold and heavy black paint.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou also spot a wide variety of goods being sold here: from Arabic coffee and Alyans to clothing and trinkets for both wealthy soldiers/masters and the numerous slaves in their harems. Meanwhile, new asasiyun are created in a facility that improves soldiers' drug usage in battle.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOutside the Firebase gates, a very large and luxurious tent has been permanently erected; recently captured singers and dancers, barely-legal virgin teens, sexually attractive enemy soldiers, exposed spies and infiltrators, minor performers and pornstars in the region, and indebted or extremely adventurous arcology citizens are brought here for intensive and advanced training and aesthetic adjustments. Such is the expertise and equipment of the slavers inside, that on the last day of every month, a lineup of very expensive, but very desirable and exceptionally obedient slaves is made available for a sizable crowd of known wealthy from your arcology to bid on and add to their harems.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers put in effort carry themselves in a pious, privileged, and proud manner at all times, befitting their status as masters or mistresses. They identify first and foremost as 'freedom fighters' of the new Caliphate, and are proud to risk their lives fighting against the freedom of others. In their personal dealings, they do their best to handle most affairs using the esteemed Arabic dialect, and they avoid stress and worry as best they can, content to while away the hours enjoying the many entertainments on offer, including those offered by their own harems, provided they have them. These are true Arabian men and women, and they will gladly carry your society into the future as they conquer new peoples and divide ever more new slavegirls amongst themselves.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nArabian Revivalism: Sometimes when The Colonel is relaxing or just making her rounds in the Firebase, you'll see her wearing nothing but a loose abaya and sandals. She also likes to sleep in such attire. She has also had a summarized account of her life story tattooed onto her back and arms in Arabic. Her pavilion also has a large, festive prayer mat on it, but since she only does her daily workout on it, you suspect she just likes the way it looks. Her combat battledress now features a camouflaged shemagh to keep dust out of her face, and a large billowing abaya with open sides to conceal the rest of her worn battle gear.\n`;
					}
					break;
				case 'Chinese_Revivalism':
					if (textDisplay === -1 && V.SF.FS[FS_OPTIONS[i]].gift > 0) {
						text += `\nIn honor of the prevailing Chinese Revivalism of the Firebase, you've granted The Colonel a little Chinese empire of her own; you've purchased and rejuvenated a distant outcropping of bountiful land, seeding it with the exotic flora and fauna China is known for, and constructing within it a miniature forbidden city, complete with fields of potted flowers, a majestic courtyard, and a palace retreat for her lodging. It is populated by low-class Chinese Revivalists who ac as her personal staff of servants and guards during her visits here. Regardless of her feelings about Chinese Revivalism, The Colonel is flattered and amused to have her own little palace to play Empress in.\n`;
					}
					if (textDisplay === 5 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou spare no expense to supply your troops with increasingly rare Chinese delicacies. While rice-based food is a standard, soldiers can also enjoy a multitude of exotic dishes and beverages of Imperial China.\n`;
					}
					if (textDisplay === 10 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSome of the personnel play lively games of Go or watch Chinese opera on a wall-screen TV.\n`;
					}
					if (textDisplay === 15 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMost of the hard menial labor around here is done by eunuchs, while the proper slave-girls entertain their off-duty masters.\n`;
					}
					if (textDisplay === 20 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nAll new slaves are being re-educated in the specially-built Xu School, with each student patiently being taught the ancient wisdom and language of Imperial China.\n`;
					}
					if (textDisplay === 25 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe common area is stylized to look like the inner sanctum of Imperial China's Forbidden City, reviving the glory of the Middle Kingdom.\n`;
					}
					if (textDisplay === 30 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nSoldiers sleep and live in dormitories built in traditional Chinese design, adorned with wooden carvings and intricate furniture.\n`;
					}
					if (textDisplay === 35 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe weapons and armor of your troops are stylized after the armies of Imperial China, with each soldier gifted with modernized jians.\n`;
					}
					if (textDisplay === 40 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe command center is luxurious, adorned with expensive stylized furniture and art that depicts the great generals and battles in history of Zhonghuá. It also contains framed excerpts from The Art Of War, and framed Chinese writings praising intelligence and cunning.\n`;
					}
					if (textDisplay === 45 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nMeanwhile, the local Yiyuàn serves as a place of healing and enhancement, where miracles of cutting-edge modern medicine as well as zhongyi are available for your shìbing.\n`;
					}
					if (textDisplay === 50 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nLuxurious robes, jade carvings, and intricate jewelry became a popular fashion for your troops in between missions.\n`;
					}
					if (textDisplay === 55 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe nearby drone bay section, dubbed 'Jia Lu Dá De Cháo', contains 'xiao jia lu dá' drones upgraded with flamethrowers, ready to deploy.\n`;
					}
					if (textDisplay === 60 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe garage, also known as the Chekù, is filled with noise of jìshis performing check-ups, upgrades, and repairs on your vehicles, thus ensuring that Chinese works still leave the world in awe.\n`;
					}
					if (textDisplay === 65 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nParticular vehicles within the garage have been painted with your Imperial coat of arms and decorated with intimidating dragon's heads on their fronts.\n`;
					}
					if (textDisplay === 70 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nThe hangar, also known as the Jikù, is filled with noise of jìshis performing check-ups, upgrades, and repairs on your aircraft, while the stalwart feixíngyuán prepare to extend your reach to the Heavens themselves.\n`;
					}
					if (textDisplay === 75 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nWhen the mission allows, the military aircraft deployed beyond your arcology's airspace are decorated with brightly-glowing neon yellow chrysanthemum-symbol decals that herald the incoming domination of the emperor's special forces.\n`;
					}
					if (textDisplay === 80 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYou also notice that the several nearby vendors here are proper and respectable establishments offering a variety of goods and services: from classes teaching ancient Chinese arts, to beautiful clothes and jewelry, these shops cater grandly towards the culture. At the nearby officers' workshop, an veteran commander conducts a detailed review of 'The Art of War' to the inexperienced new NCO's in attendance.\n`;
					}
					if (textDisplay === 85 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nOutside the Firebase gates, a majestic walled perimeter has been carefully erected so as to make the outside grounds of the Firebase more closely resemble the Forbidden City; a broad garden of bright yellow chrysanthemums, a heavily reinforced stone roadway with accompanying stone footpaths, finely sanded wooden benches and fences, and brightly colored walls and gates greet any who would presume to enter or exit the Firebase domain... Besides you, of course.\n`;
					}
					if (textDisplay === 90 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nYour soldiers put in effort carry themselves in a manner befitting such a communal setting; they are cooperative, diligent, and disciplined at all times. They identify first and foremost as warriors of 'the emperor', and are proud to have a powerful empire such as your arcology to call home and fight for. In their personal dealings, they do their best to handle most affairs using the esteemed Mandarin dialect, and they avoid unseemly things like disloyalty, foolishness, and dishonor like the plagues that they are. These are true Imperial men and women, and they will relentlessly carry your society into the future as they fight to impress your name upon both Heaven and Earth themselves.\n`;
					}
					if (textDisplay === 100 && V.SF.FS[FS_OPTIONS[i]].lv >= textDisplay) {
						text += `\nChinese Revivalism: Sometimes when The Colonel is relaxing or just making her rounds in the Firebase, you'll see her wearing a long qipao cut high along the sides for ease of movement. She is known to prefer going commando, and the slits sometimes part to tease what's underneath for anyone watching her. She keeps a number of intelligent eunuchs in her company often, and they usually scurry along behind her to record everything that she says and does for later review. Her pavilion is lavishly furnished and concubines wait on her hand and foot when she rests. Her combat battledress now features lacquered armor and a golden burnished helm signifying her position as leader.\n`;
					}
					break;
			}
		}
		return text;
	} else if (input === 'BadOutcome') {
		V.arcologies[0].prosperity -= 50;
		cashX(-V.cash * 0.25, "specialForces");
		let r = ``,
			BadOutcome = '';
		if (V.rep > 17500) {
			V.rep = 17500;
		}
		switch (V.SF.Colonel.Core) {
			case "kind":
				BadOutcome += 'MIGRATION';
				V.trinkets.push("The Colonel's handkerchief");
				r += `Your Colonel has had enough of your meddling. In her eyes, you've broken faith with her. She asked one thing of you in return for her full support, and you could not even give her that.`;
				r += `\nAt midnight, a great mechanized convoy, the biggest you've seen in a long while, streams out of your Arcology. Troop Carriers, Aircraft, Heavy Trucks, and other war machines of varying sizes pour out of the Firebase in tight formation. The Colonel is refusing your calls, and you know it would be ill advised to go out there yourself or to try to stop them with force. The many bandits and mercenary groups that the convoy will inevitably pass by will probably feel this way as well. You have no idea where they are going or how they will end up, but with their wealth and weaponry, you are not worried.`;
				r += `\nUpon your inspection of the abandoned firebase itself, most of the heavier installations have been dismantled and carried away, but about ${cashFormat(55000)} in miscellaneous supplies and 73 menials have been left behind, presumably because the convoy had no space for them. On The Colonel's old pavilion, you see a white gift card standing upright.`;
				r += `\nWhen you climb the crates to take it and read it, you see The Colonel's handwritten sentiments about the way things turned out; her gratitude for taking her in when you did, her disappointment in your actions, a detailed account of your failings, her regrets that things had to end this way, and finally, her well wishes for your future endeavors.`;
				r += `\nDisgusted, you pocket the gift card and leave your employees and menials to gather up the valuables here before stalking back to your Penthouse. The former Firebase is returned to being a warehouse facility.`;
				break;
			case "cruel":
				if (jsRandom > 50) {
					BadOutcome += 'Revolt';
					V.trinkets.push("The Colonel's dog tags");
					r += `<br>Finally fed up with your constant intrusions into her territory and crew, The Colonel riles up her people for an utterly ferocious rebellion. The promises of rape and plunder and dominion over some of the wealthiest tenants in the entire Free City (and their world-class slaves) are all that's needed to give the selfish lot of them a nearly unshakable resolve in the task of delivering their overlord Her most coveted prize: You.`;
					r += `<br>It is now midnight. The lights are the first thing they disable, as they still have the excellent night vision equipment you purchased for them. Some of your citizens start panicking almost immediately at the sudden blackout; this is very reminiscent of the Daughters of Liberty attack that still haunts many of their memories. Things like this were never supposed to happen again. You had promised them that you'd create an army that would protect them...`;
					r += `<br>Her army vanguard strikes fast and hard throughout the main Plaza, cutting through your security personnel, defensive platoons, and drones with an ease that stinks of months of careful planning and study. Your defensive platoons, veterans of many Battles, are outmaneuvered at every turn; their hidden ammunition caches are found empty, their communications networks are mysteriously scrambled, and key chokepoints are found to be booby-trapped before your men can even get to them; their well-rehearsed arcology defense routines have gone to ash. Assuming you ever get a chance to speak to The Colonel again, you would ask if her betrayal was actually inevitable rather than something you triggered.`;
					r += `<br>You watch with immense disappointment as the very APC's and IFV's that you paid for now charge into resisting storefronts to storm the armed civilians inside with heavy infantry at point blank range. Battle Tanks trample wounded civilians in the streets as they maneuver to blast your citizens' hastily-made holdouts to pieces, burying dozens of civilian loyalists under mountains of rubble while hundreds more are gunned down in the streets for want of adequate cover. The Plaza is lost; the enemy vanguard has gained access to the Residential Sectors upstairs. Enticed, entire platoons of her vanguard decide to become bandits, ignoring their Colonel's orders and scattering off from the main force to kick down many apartment doors and help themselves to whatever desirable goods or inhabitants they find within.`;
					r += `<br>Outside, her many aircraft swarm the local airspace to patrol the Arcology outskirts, conduct recon scans of the upper levels, or monitor your sealed penthouse outside the range of your SAM turrets, while shooting down any other fleeing VTOL's. You will not be escaping by air today. No one will. No escaping by land either: Swarms of her drones are tasing fleeing noncombatants by the hundreds for later enslavement, as the remainder of her army begins to pour into the bloody Plaza. This is your Arcology's darkest hour.`;
					r += `<br>And yet your Mercenaries stand ready. On security feeds throughout the Residential Sectors and Garrison you see your elite sellswords charging out of their lodgings in full kit. They are few, but this is their home, and you are their Patron and Commander. They hold firm, fighting like legends of old in some places, and fighting like animals in others. The Mercenaries trapped downstairs near The Garrison take to the Markets, pinning down most of The Colonel's reinforcements from various shopping outlets using towed quad anti-aircraft guns, and ultimately cutting off many of the assets needed for The Colonel's ongoing assault upstairs. Enemy troop carriers laden with heavy infantry breach the shopping centers in order to dislodge them, only to have their inhabitants cooked alive before they can disembark in time or shot to pieces even when they do. Keeping these Mercenaries alive are the roving exosuit-clad tank hunter duos that frag entire armor platoons en route to these shopping outlets, resorting to carving open enemy AFV's up close with their powered CQB weapons once they've run out of missiles. Back in the Residencies upstairs, in the still-evacuating streets and atriums, your actively-camouflaged snipers take up choice positions on various balconies and overpasses, sowing panic among the advancing traitors with their impressive anti-material rifles with one explosive headshot after another, sometimes even hitting them through walls and buildings. In large indoor parks leading up to the main Residential courtyard, Mercenary fireteams force enemy flankers to flee every single footpath they walk through, harassing constantly and preventing any hostile reconnaissance or infiltration from being done.`;
					r += `<br>The main Residential courtyard features the Residential Sectors' massive elevator complex, which will give The Colonel's forces rapid access to the Promenade, and ultimately, You. In front of it, your Mercenary Captain stands atop one of the many meters-thick sandbag walls his men just assembled there, leading the raging defensive blockade in bringing the vanguard's assault to a gory halt. ${V.SF.Lower}'s bodies and bits and debris pile up in small walls on the outskirts under the burning heat of hundreds of flying autocannon rounds and dozens of screeching missiles. Before the vanguard's morale can break however, The Colonel shows up in person behind her own lines, kitted in a customized power armor and dragging, of all things, a hydraulic trebuchet loaded with a crudely-welded large metal box. She launches the box from beyond your Mercenaries' line of sight, sending it reeling towards them and predicting that they will try to shoot it out of the sky. They do, not wanting the slow but strange projectile to hit them directly, only learning of their folly when the metal 'box' detonates midair and releases a dense cloud of cluster bombs over their position. The munitions themselves disable some of the exosuits, but they don't kill too many on their own. However, the bomblets do succeed in detonating the various ammo dumps that were feeding your Mercenaries' blazing guns. The chain explosions, resulting fires, destroyed cover, and widespread casualties and confusion all create the perfect opportunity for The Colonel to storm the previously implacable barricade at the head of her troops, with her followers rushing the merc lines and blasting off the heavy armor plating of your disoriented Mercenaries themselves before stabbing them to death, or in some cases, hauling off the dis-armored and defeated female Mercenaries they discover for immediate use. As the few intact Mercenaries remaining desperately struggle to hold off the advancing horde with their remaining ammo, The Colonel takes on your dazed Mercenary Captain in single combat. When their ammunition runs dry, and their blasted battlesuits break down, they both eject, and then the knives come out. Minutes later, she stabs him in the side of his skull after she dodges yet another attempt to land a killing blow on her. With the source of Mercenary command and control gone, The Colonel staunches her own bleeding, yanks a trooper out of a near-pristine battlesuit that she now claims for herself, and directly organizes the isolation and extermination of the smaller teams of Mercenaries that are bleeding her troops everywhere else. She routs your Mercenaries for good with the razing of their Garrison structure. The ${V.SF.Lower} now enjoys absolute air and ground superiority. Soon the surviving rear of her army is brought upstairs from the killing floors down in the Markets, and the many elevators and cargo lifts of the elevator complex are boarded, with your executive override codes to remotely shut down the elevators somehow being manually bypassed by her combat engineers. It won't be long now.`;
					r += `<br>Dawn has broken over the Free City. Only five hours into the slaughter (of which your Mercenaries no doubt bought you at least three), it becomes very clear to you that the only way to save your arcology is to destroy it. Everything and Everyone will burn before you let this crazy bitch and her rabid dogs get their dirty hands on you or your slaves. On your order, your most loyal subordinates, the ones who were with you since the early days to patrol your arcology before you even had drones to protect it, fight their way to through the carnage of your panicking civilians on The Promenade to get to the exact hidden elevators that your Personal Assistant specifies for them. Their destination is the arcology's reactor complex, of course. Following the PA's instructions precisely, they arm their many high-yield explosive charges on your now-exposed and de-stabilized reactor, and in one final service to you, detonate them, creating a colossal explosion. The rapidly ascending heretics quite literally have the rug pulled from under them, as the blast takes out nearly all of the arcology's lesser foundational support beams, thus collapsing many thousands of metric tons of concrete, steel, plastic, and plaster out from underneath the upward bound Colonel and her men... And everyone else, unfortunately. With no foundation any longer, all of your arcology's interior Sectors are utterly gutted from the bottom-up by gravity itself, and everything beneath your ration-stocked, backup-powered Penthouse crumbles to the earth. The massive cloud of dust created by the widespread fires and interior collapse ends up covering the entire Free City for hours. Her aircraft, now bereft of their logistical support and command structure, immediately fly off to neighboring arcologies to offer their services to the various employers there, seeing as the coup has failed and they have nowhere else to go. The skies are free for You to travel as you please, but You aren't going anywhere.`;
					r += `<br>It is late evening when the tremors finally stop. Everything below your Penthouse is ruin, and your arcology, its population, and your reputation are now essentially dust. However, the arcology did not fall. It. Is. Still. Yours. You shall rise again, not flee this tragedy in shame. Of course, no one will ever know that you sacrificed the arcology deliberately in order to save yourself; it is all too easy to claim that The Colonel carelessly damaged the reactor complex during her assault, ironically causing her own defeat. Frankly, sacrificing most of your tenants doesn't bother you as much as it probably should; maybe its because you know that if The Colonel and her men had won, all those people were as good as dead anyway.`;
					r += `<br>You know that if you want to survive, you'll need to surround yourself with workers and allies to rebuild fast, else your rivals gobble you up. It costs you a horrific sum to clear and process the wreckage and rebuild the basic Sector superstructures and infrastructure for your arcology on such short notice, even after liquidating everything your workers salvage. Your powerful friends still residing in the old world or other Free Cities have lent you a surprising amount of aid too, with quite a few lent super-heavy construction assets getting huge amounts of work done quickly. Even then, what you've been able to rebuild is very little. After a nearly sleepless, sexless week of immense toil, you've successfully organized tens of thousands of people in restoring the arcology to a barely functional condition (along with rudimentary imitations of all your upgrades), and you've even got some new Garrison Mercenaries in by week's end too... But its just not the same. If it weren't for your bruised weather-plating your arcology would look like a giant skeleton. Inside, it feels like a concrete boneyard; everything has been built cheap and utilitarian, and the walls aren't even painted. With only a few operational services staffed by commuters from neighboring arcologies, there is just an eerie silence just about everywhere. With few amenities for relief, there are going to be many long days ahead for your few tenants, most of them being wealthy but distraught returning travelers who left before the attack. Maybe your slaves can help entertain them. A lot of these people are VIP's it seems.`;
					r += `<br>It is now midnight. In a rare moment of reflection, you contemplate that what The Colonel just did to your arcology was exactly what you were all too happy to have her do to dozens, if not hundreds of innocent villages and townships under your shadow during her 'Raiding and Slaving' operations. Nevertheless, You have hard work ahead of you, especially now that your enemies see that you are now much weaker than you have ever been.`;
					r += `<br>The Colonel's body was never found.`;
				} else {
					BadOutcome += 'ANNIHILATION';
					V.trinkets.push("The Colonel's combat knife");
					r += `Finally fed up with your constant intrusions into her territory and crew, The Colonel riles up her people for a full takeover against your arcology. The promises of plunder and dominion over some of the wealthiest tenants in the entire Free City (and their world-class slaves), including you, are all that's needed to get things started. However, not every soldier is eager to betray you.`;
					r += `\nIt is now Midnight. The lights are the first thing The Colonel's forces disable, as they still have the excellent night vision equipment you purchased for them. Some of your citizens start panicking almost immediately at the sudden blackout; this is very reminiscent of the Daughters of Liberty attack that still haunts many of their memories. Her horde of marauders purges the plaza and lower floors of the arcology mercilessly, thoughtlessly cutting through your tenants with an ease that stinks of true jealously and hatred. Most disturbingly, your penthouse's communications networks are all but destroyed, and your PA has been unreachable, seemingly hacked by some obscure technology you figure only The Colonel's contacts and few others could provide. As bad as all of this is, it is merely meant to distract and disrupt your mercenaries. The real threat is aerial.`;
					r += `\nOutside the arcology, her many aircraft swarm the local airspace to patrol the arcology outskirts, conduct recon scans of the upper levels, or monitor your now-secured penthouse, while shooting down any other fleeing VTOL's. You will not be escaping by air. No one will. No escaping by land either: Swarms of her drones are tasing fleeing noncombatants by the hundreds for resale, as the remainder of her army seizes control of vital arcology infrastructure. As you take note of this while donning your bathrobe, several missiles from attack VTOL's come crashing through your penthouse before detonating. Miraculously, no one is harmed by this, and it has even created a gap in a nearby wall for you to escape the penthouse through, but this is but a small comfort in the wake of the squads of disembarking troops, lead by The Colonel herself, rappelling into your penthouse to capture you directly.`;
					r += `\nYou run. You run faster than you ever have in your life, past burning shops, burning vehicles, burning crowds, and burning bodies. An entire team of The Colonel's men are chasing you, lead by The Colonel herself, with their heavy kit probably the only reason they haven't caught you yet. They obviously want you alive, and you have been sharp enough to realize that this is very bad news for you. During your sprint, you also happen to run past several security cameras that impassively capture high-definition full-color footage of your retreat. When you eventually bump into one of your mercenaries and are escorted to a shelter, the personnel responsible for overseeing the camera feeds upload the footage of your great chase to the internet, where the entire world can see you being hounded by the men and women you personally hired to protect you and your arcology.`;
					r += `\nEventually, The Colonel's coup collapses. The selfish and malevolent troops following her, easily distracted by the myriad opportunities for rich plunder all around them, end up scattering throughout the arcology and losing cohesion, allowing for your much better organized security forces, mercenary hunter-killer teams, and even local enraged citizens to regroup and eventually overwhelm each enemy looter gang individually until a grinding total victory is achieved by the end of the week. The Colonel never finds, captures, or kills you. Nor is she ever found, captured, or killed herself. But she did set you on the run, and humiliatingly enough, the entire Free City now knows about it. Everyone has seen the clip. When you think about it she did manage to kill you after all, in a manner of speaking.`;
					r += `\nYour arcology is once more yours, but your people will never forget the horrifying week they spent being slaughtered and hunted by The Colonel's marauders, butchered by the army that you convinced them to allow, or the fact that you couldn't save them because you were very busy being hunted yourself.`;
				}
				break;
			case "brazen":
				BadOutcome += 'OCCUPATION';
				V.trinkets.push("The Colonel's sidearm");
				r += `Finally fed up with your constant intrusions into her territory and crew, The Colonel riles up her people for a full takeover against your arcology. The promises of plunder and dominion over some of the wealthiest tenants in the entire Free City (and their world-class slaves), including you, are all that's needed to get things started.`;
				r += `\nAt midnight, the lights are the first thing The Colonel's forces disable, as they still have the excellent night vision equipment you purchased for them. Some of your citizens panic almost immediately at the sudden blackout; this is very reminiscent of the Daughters of Liberty attack that still haunts many of their memories. Her army vanguard strikes fast and hard throughout, cutting through your security units and drones with an ease that stinks of months of careful planning and study. Most disturbingly, your penthouse's communications networks are all but destroyed, and your PA has been unreachable, seemingly hacked by some obscure technology you figure only The Colonel's contacts and few others could provide.`;
				r += `\nOutside, her many aircraft swarm the local airspace to patrol the arcology outskirts, conduct recon scans of the upper levels, or monitor your now-secured penthouse, while shooting down any other fleeing VTOL's. You will not be escaping by air. No one will. No escaping by land either: Swarms of her drones are tasing fleeing noncombatants by the hundreds for detainment, as the remainder of her army seizes control of vital arcology infrastructure. After just a few days, the entire arcology falls under her direct control, all dissidents, criminals, and rebels hopelessly outgunned by her lavishly equipped and experienced warriors.`;
				r += `\nYou are trapped inside your Penthouse by the detachment of infantry guarding its exits in order to keep you in, probably with the goal of starving you out until you surrender yourself. With your communications down as well. your penthouse might as well be an island. You only salvation comes in the form of your neighboring arcologies and their respective mercenary contingents. They are intervening on your behalf out of paranoia; Free Cities are extremely wary of military power buildups near their borders, and they absolutely will not tolerate a full scale military cup within its borders. Fighting men and women from all over the City are seen battling in the streets of your arcology in a brutal blitzkrieg that your own tenants and mercenaries quickly join in on, pushing The Colonel's forces back gradually with sheer numbers. Eventually they are forced back into the Firebase proper, where they are sealed inside by using explosives to collapse part of the arcology atop them, rendering the Firebase itself totally defunct. Only a few small groups manage to scatter and flee this holding action, and your intelligence networks suspects that The Colonel herself was among one of them.`;
				r += `With the help of some unlikely intervention, you've won this little war. Your arcology is once more yours, but your people will never forget the traumatic week they spent under the heel of the army that you convinced them to allow, or the fact that it took an entire coalition of outsiders to save them.`;
				break;
			case "jaded":
				BadOutcome += 'ASSIMILATION';
				V.trinkets.push("The Colonel's canteen");
				r += `Finally weary of your constant intrusions into her territory and crew, The Colonel gathers up her people for a full scale liquidation and dispersal of personnel and assets throughout the Free City itself; they are going to discreetly sell off the majority of their military hardware, assume new identities and melt into the fabric of the Free City's wider population. Gone are the days of plunder and dominion, as this retirement plan will make many of them some of the wealthiest tenants in the entire Free City, and they will no longer need to break their backs living the lives of soldiers. With the liquidation complete and the money distributed, the army moves on to the net stage of the plan.`;
				r += `\nAt midnight, the lights are the first thing The Colonel's forces disable, as they still have the excellent night vision equipment you purchased for them. Some of your citizens panic almost immediately at the sudden blackout; this is very reminiscent of the Daughters of Liberty attack that still haunts many of their memories. Her army moves fast and quietly throughout the arcology and the streets outside of it, slipping through your security units and drones with an ease that stinks of months of careful planning and study. Most disturbingly, your penthouse's communications networks are all but destroyed, and your PA has been unreachable, seemingly hacked by some obscure technology you figure only The Colonel's contacts and few others could provide.`;
				r += `\nOutside, her many aircraft escape the local airspace to patrol the arcology outskirts, evading recon scans, the monitoring systems of your secured penthouse, and the feeble attempts of your sentries to shoot them down. A great many of them will be escaping by air, it seems. Many are escaping by land too: Swarms of personnel carriers and utility trucks are driving off to neighboring arcologies or even neighboring Free Cities by the dozens for retirement, as the remainder of her army purchase new apartments and properties in various arcologies nearby while being dressed in civilian clothing. After just a few days, the entire army has essentially disappeared, hopelessly obscured by mountains of digital noise, detailed fake backstories, lavish fake identities, and lots of bribes and carefully destroyed digital and physical records. Your special force has gone completely AWOL and there is nothing you or anyone can do about it. It seems your experienced former warriors have an eye for deception too.`;
				r += `\nYou are trapped inside your Penthouse by the electricity-cutting digital virus that has kept you inside and communicatively isolated for the past week. Probably with the goal of keeping you in the dark, figuratively and literally, so that you could not intervene in The Colonel's total assimilation into the Free Cities. The lazy bitch did not want to cooperate with your Future Societies plans, so she and her men decided to stop being soldiers altogether, and live off of their savings. Your only relief comes at the midnight of the seventh day, when the virus self-terminates and the arcology's electricity, PA, and communications lines return to full functioning.`;
				r += `\nYour arcology is once more yours, but your people will never forget the troubling week they spent in total darkness and lockdown, or the sudden mass desertion and disappearance of the army that you convinced them to allow, or the fact that there was nothing you could do to prevent or mitigate any of it.`;
				break;
			case "shell shocked":
				BadOutcome += 'ISOLATION';
				V.trinkets.push("The Colonel's explosives detonator");
				r += `Unnerved by your ever-increasing influence over your men and undercutting of her authority, The Colonel uses heavy explosives at Midnight to seal off The Firebase from your access. When you step off of your express elevator, you are met not with two guards, but several armed proximity mines next to an incredibly thick wall of smoking rubble. No doubt there are machine gun nests, anti-tank nests, and lots more proximity mines just waiting for you on the other side, should you somehow get through the wall of debris.`;
				r += `\nThe ${V.SF.Lower} still deploys into the old world to plunder as it pleases, but no longer for you. You receive no money from their exploits, and their total defiance and independence of you is a permanent stain on your reputation. Of course, you'll never have the needed military power to dislodge them, especially with all the redundant fortifications, crossfire envelopes, and myriad traps that paranoid bitch had built around each entrance ever since she went rouge. Trying to sabotage certain support beams from above to make the Firebase facility collapse in on itself could easily cause enough damage to topple other parts of the arcology too, and such a thing would be very difficult to cover up. In other words, you're stuck with them. The Firebase has become a permanent tumor on your arcology and good name.`;
				break;
		}
		const Obj = {
			Active: -2,
			Toggle: V.SF.Toggle,
			Squad:{Troops:V.SF.Squad.Troops},
			Size:V.SF.Size,
			FS: {
				Tension: V.SF.FS.Tension,
				BadOutcome: BadOutcome
			}
		};
		V.SF = Obj;
		return r;
	} else if (input === 'BadOutcome_Firebase') {
		const x = `Visiting the Firebase just takes you to`;
		switch (V.SF.FS.BadOutcome) {
			case 'MIGRATION':
				return `${x} an empty, eerie storeroom now.`;
			case 'ANNIHILATION':
				return `${x} a charnel house of dead bodies, spent ammo casings, collapsed sub-structure, unstable rubble, and live munitions & duds that can detonate at the slightest disturbance. This chamber has proven so troublesome, tedious, and dangerous to clear out that you've decided to halt all salvage operations for the foreseeable future.\n`;
			case 'OCCUPATION':
				return `${x} its entrance. The two guards that usually let you in will now shoo you away at gunpoint.\n`;
			case 'ASSIMILATION':
				return `${x} a very trashy floorspace full of discarded food, apparel, and furniture, as well as piles of empty boxes and crates. The filthy bastards didn't even bother to clean up after themselves.\n`;
			case 'ISOLATION':
				return `${x} a thick wall of rubble. You no longer have any way of reaching out to the Special Force.\n`;
		}
	}
};

App.SF.AAR = function(endWeekCall = 1) {
	const
		T = State.temporary,
		S = V.SF.Squad,
		target = 50000,
		baseLine = 5000;
	let profit = 0,
		upkeep = 0,
		income = 0,
		SFSubsidy = 0,
		r = ``;
	if (V.SF.FS.Tension > 100 && endWeekCall > 0) {
		if (V.SF.FS.BadOutcome === undefined) {
			App.SF.fsIntegration('BadOutcome');
		} else {
			r += `This week your arcology lost a bit of prosperity and large amount of reputation, due to the looming threat that The Colonel and her forces may resurface.`;
			V.arcologies[0].prosperity -= 25;
			if (V.rep > 17500) {
				V.rep = 17500;
			}
		}
	} else if (V.SF.FS.Tension < 100) {
		let Multiplier = {
			action: 1,
			troop: 1,
			unit: 1,
			depravity: 1
		};
		let FNG = 10,
			unitCap = 2500,
			Trade = 0.025;
		let cost = {a: 0.01, b: 2.5},
			NO = 1 + (V.SF.Size / 5),
			N1 = 1 + (V.SF.Size / 5);

		App.SF.Count();
		let SFD = V.SF.Depravity;
		if (profit < 1) {
			cost.a = 10;
		}
		cost.b = 0.1;
		NO = 1;
		N1 = 0.1;

		if (S.Troops > unitCap) {
			S.Troops = unitCap;
		}
		if (endWeekCall > 0) {
			if (S.Troops < 100) {
				S.Troops += Math.ceil(jsRandom(2, 5));
			} else {
				if (V.SF.Target === "recruit") {
					S.Troops -= Math.ceil(jsRandom(1 * S.Troops / 1000, 0));
				} else if (V.SF.Target === "raiding") {
					S.Troops -= Math.ceil(jsRandom(1.15 * S.Troops / 1000, -1.20 * S.Troops / 1000));
				} else {
					S.Troops -= Math.ceil(jsRandom(1.10 * S.Troops / 1000, -1.15 * S.Troops / 1000));
				}
			}
		}
		if (S.Troops > 200) {
			Trade += 0.05 * (S.Troops / 200);
			Multiplier.troop += S.Troops / 200;
			upkeep += (S.Troops * 25) / cost.a;
			if (V.secExpEnabled > 0 && endWeekCall > 0) {
				V.SecExp.core.authority += 25 * (Math.ceil(S.Troops / 200));
				V.SecExp.core.authority += V.SF.Size * 10;
				V.SecExp.core.authority = Math.clamp(V.SecExp.core.authority, 0, 20000);
			}
		}

		if (S.Firebase > 0) {
			FNG += S.Firebase;
			Trade += 0.5 * S.Firebase;
			Multiplier.unit += 7.5 * S.Firebase + 2 * Math.pow(S.Firebase, 2) * cost.a;
			upkeep += (95 * 10 + S.Firebase) * cost.b;
		}
		if (S.Armoury > 0) {
			FNG += 2 * S.Armoury;
			Trade += 0.25 * S.Armoury;
			Multiplier.unit += 7.5 * S.Armoury + 2 * Math.pow(S.Armoury, 2) * cost.a;
			upkeep += (55 * S.Armoury) * cost.b;
		}
		if (S.Drugs > 0) {
			FNG += S.Drugs;
			Trade += 0.25 * S.Drugs;
			Multiplier.unit += 7.5 * S.Drugs + 2 * Math.pow(S.Drugs, 2) * cost.a;
			upkeep += (35 * S.Drugs) * cost.b;
		}
		if (S.Firebase >= 1) {
			if (S.AV > 0) {
				FNG += S.AV;
				Trade += 0.25 * S.AV;
				Multiplier.unit += 7.5 * S.AV + 2 * Math.pow(S.AV, 2) * cost.a;
				upkeep += (89 * S.AV) * cost.b;
			}
			if (S.TV > 0) {
				FNG += S.TV;
				Trade += 0.25 * S.TV;
				Multiplier.unit += 7.5 * S.TV + 2 * Math.pow(S.TV, 2) * cost.a;
				upkeep += (89 * S.TV) * cost.b;
			}
			if (S.PGT > 0) {
				FNG += S.PGT;
				Trade += 0.25 * S.PGT;
				Multiplier.unit += 15 * S.PGT + 3 * Math.pow(S.PGT, 2) * cost.a;
				upkeep += (100 * S.PGT) * cost.b;
			}
		}

		if (S.Firebase >= 2 && S.Drones > 0) {
			FNG += S.Drones;
			Trade += 0.5 * S.Drones;
			Multiplier.unit += 7.5 * S.Drones + 2 * Math.pow(S.Drones, 2) * cost.a;
			upkeep += (50 * S.Drones) * cost.b;
		}

		if (S.Firebase >= 4) {
			if (S.AA > 0) {
				FNG += S.AA;
				Trade += 0.25 * S.AA;
				Multiplier.unit += 7.5 * S.AA + 2 * Math.pow(S.AA, 2) * cost.a;
				upkeep += (100 * S.AA) * cost.b;
			}
			if (S.TA > 0) {
				FNG += S.TA;
				Trade += 0.25 * S.TA;
				Multiplier.unit += 7.5 * S.TA + 2 * Math.pow(S.TA, 2) * cost.a;
				upkeep += (100 * S.TA) * cost.b;
			}
			if (S.SpacePlane > 0) {
				FNG += S.SpacePlane;
				Trade += 0.25 * S.SpacePlane;
				Multiplier.unit += 7.5 * S.SpacePlane + 2 * Math.pow(S.SpacePlane, 2) * cost.a;
				upkeep += (100 * S.SpacePlane) * cost.b;
			}
			if (S.GunS > 0) {
				FNG += S.GunS;
				Trade += 0.25 * S.GunS;
				Multiplier.unit += 12 * S.GunS + 3 * Math.pow(S.GunS, 2) * cost.a;
				upkeep += 70 * S.GunS;
			}
			if (S.Satellite.lv > 0 && S.Satellite.InOrbit > 0) {
				FNG += S.Satellite.lv;
				Trade += 0.25 * S.Satellite.lv;
				Multiplier.unit += 15 * S.Satellite.lv + 5 * Math.pow(S.Satellite.lv, 2) * cost.a;
				upkeep += (85 * S.Satellite.lv) * cost.b;
			}
			if (S.GiantRobot > 0) {
				FNG += S.GiantRobot;
				Trade += 0.25 * S.GiantRobot;
				Multiplier.unit += 15 * S.GiantRobot + 5 * Math.pow(S.GiantRobot, 2) * cost.a;
				upkeep += (95 * S.GiantRobot) * cost.b;
			}
			if (S.MissileSilo > 0) {
				FNG += S.MissileSilo;
				Trade += 0.25 * S.MissileSilo;
				Multiplier.unit += 15 * S.MissileSilo + 5 * Math.pow(S.MissileSilo, 2) * cost.a;
				upkeep += (100 * S.MissileSilo) * cost.b;
			}
		}

		if (S.AircraftCarrier > 0) {
			FNG += S.AircraftCarrier;
			Trade += 0.25 * S.AircraftCarrier;
			Multiplier.unit += 9 * S.AircraftCarrier + 3 * Math.pow(S.AircraftCarrier, 2) * cost.a;
			upkeep += (80 * S.AircraftCarrier) * cost.b;
		}
		if (S.Sub > 0) {
			FNG += S.Sub;
			Trade += 0.25 * S.Sub;
			Multiplier.unit += 7.5 * S.Sub + 2 * Math.pow(S.Sub, 2) * cost.a;
			upkeep += (90 * S.Sub) * cost.b;
		}
		if (S.HAT > 0) {
			FNG += S.HAT;
			Trade += 0.25 * S.HAT;
			Multiplier.unit += 7.5 * S.HAT + 2 * Math.pow(S.HAT, 2) * cost.a;
			upkeep += (70 * S.HAT) * cost.b;
		}

		switch (V.SF.Colonel.Core) {
			case "kind":
				FNG += 10;
				Trade += 0.15;
				SFD -= 0.15;
				break;
			case "cruel":
				Trade -= 0.15;
				SFD += 0.15;
				break;
			case "brazen":
				FNG += 15;
				Multiplier.unit += 0.5;
				break;
			case "jaded":
				Trade -= 0.05;
				SFD += 0.05;
				break;
			case "shell shocked":
				Trade += 0.05;
				SFD -= 0.05;
				Multiplier.unit -= 0.5;
				break;
		}

		if (V.SF.Target === "raiding") {
			SFD += 0.05;
			Multiplier.action += 0.5;
		} else if (V.SF.Target === "secure") {
			SFD -= 0.05;
			Multiplier.action += 0.2;
		} else {
			SFD -= 0.1;
			Multiplier.action -= 0.5;
		}
		if (V.SF.ROE === "free") {
			Multiplier.action *= 0.8;
			SFD += 0.05;
			Trade += Trade * 0.95;
		} else if (V.SF.ROE === "hold") {
			Multiplier.action *= 1.1;
			SFD -= 0.05;
			Trade += Trade * 1.05;
		}
		if (V.SF.Regs === "none") {
			Multiplier.action *= 0.8;
			SFD += 0.05;
			Trade += Trade * 0.95;
		} else if (V.SF.Regs === "strict") {
			Multiplier.action *= 1.1;
			SFD -= 0.05;
			Trade += Trade * 1.05;
			Multiplier.depravity = 1 + SFD;
		}
		if (SFD > -2) {
			Trade *= 1 + SFD / 2;
		}

		if (V.SF.Target === "recruit") {
			FNG += FNG * 0.95;
		} else {
			FNG += FNG * 0.25;
		}
		FNG = Math.ceil(FNG / 2);

		if (endWeekCall > 0) {
			if (V.SF.Target === "secure") {
				repX((Math.ceil(V.rep * ((Trade / 100) * 0.95))), "specialForces");
				V.arcologies[0].prosperity = Math.ceil((V.arcologies[0].prosperity + (Trade / 10) * 0.95));
			} else {
				repX((Math.ceil(V.rep * (Trade / 100) * 0.25)), "specialForces");
				V.arcologies[0].prosperity = Math.ceil(V.arcologies[0].prosperity + (Trade / 10) * 0.25);
			}
		}

		income += ((baseLine * (1 + Multiplier.troop / NO).toFixed(2) * (1 + Multiplier.unit / NO).toFixed(2) * (1 + Multiplier.action / NO).toFixed(2) * (1 + Multiplier.depravity / NO).toFixed(2)) - (upkeep * N1).toFixed(2)) / ((V.SF.Size / 2 + S.Troops / 2) * 5);
		if (V.SF.Target === "raiding") {
			income *= 1.25;
		} else {
			income *= 1.15;
		}
		if (V.economy < 100) {
			if (V.SF.Target === "raiding") {
				income *= 14.25;
			} else {
				income *= 14.15;
			}
		} // Remove line if hard mode ever gets fixed.
		if (endWeekCall > 0) { S.Troops += FNG; }
		income = Math.ceil(income);
		if (V.debugMode > 0 && endWeekCall > 0) {
			r += `<br>income:${num(income)}, troop:${num((0.09+Multiplier.troop/NO).toFixed(2))}, unit:${num((0.09+Multiplier.unit/NO).toFixed(2))}, action:${num((0.09+Multiplier.action/NO).toFixed(2))}, depravity:${num((0.09+Multiplier.depravity/NO).toFixed(2))}, upkeep:${num((upkeep*N1).toFixed(2))}`;
		}

		if (income >= target) {
			profit = 1;
		} else {
			profit = 0;
			SFSubsidy = 1;
		}

		if (endWeekCall > 0) {
			cashX(income, "specialForces");
			if (S.Troops > unitCap) {
				S.Troops = unitCap;
			}
			if (V.arcologies[0].prosperity > V.AProsperityCap) {
				V.arcologies[0].prosperity = V.AProsperityCap;
			}

			if (V.SF.UC.Assign === 1 && V.SF.UC.Lock < 1) {
				V.SF.UC.Assign = 0;
			}

			V.SF.Gift = 0;
			V.SF.Colonel.Talk = 0;
			V.SF.Colonel.Fun = 0;
			V.SF.Upgrade = 0;

			r += `<h3>Week ${V.week} (AO: ${V.terrain}) operational report for ${V.SF.Lower}:</h3>`;
			r += `${App.SF.Caps()} focused their ${num(S.Troops)} troops on `;

			if (V.SF.Target === "recruit") {
				r += `recruiting and training more personnel. Smaller parties ventured out to protect the arcology's trade routes and strike targets of opportunity.`;
			} else if (V.SF.Target === "secure") {
				r += `securing the trade routes between the arcology and the surrounding area. Smaller parties ventured out to strike targets of opportunity and process new recruits.`;
			} else {
				r += `locating and striking targets of opportunity, capturing both material loot and new slaves. Smaller parties secured the most important of the arcology's trade routes and processed new recruits.`;
			}

			if (V.SF.UC.Assign > 0) {
				r += `<br>A ${V.SF.UC.Assign < 2 ? 'small':'large'} portion of the force was assigned as ${V.SF.UC.Assign < 2 ? 'part':'full'} time undercover officers.`;
			}

			r += `<br>These activities have, overall, <span class='green'>improved your arcology's prosperity.</span>`;
			r += ` The goods procured by ${V.SF.Lower} after accounting for the spoils retained by individual soldiers were `;

			if (profit > 0) {
				r += `<span class='green'>more than sufficient to cover expenses.</span> Excess material and human assets totaling <span class='yellowgreen'>${cashFormat(income)}</span> (after liquidation) were transferred to your accounts.`;
				if (V.economy < 100) {
					r += ` The rapidly degrading global economy has one upside,<span class='green'> ${App.SF.Caps()} was able to more easily use more 'persuasive' techniques thus leading to an increase in profit.</span>`;
				}
			} else {
				r += `<span class='red'>barely enough to cover expenses.</span> More growth will be needed to ensure profitability, <span class='yellow'>hopefully purchasing more upgrades will help.</span>`;
				r += ` Per the estimates that ${App.SF.SFC()} provides, an additional <span class='yellowgreen'>${cashFormat(target-income)}</span> is required for sufficient cover.`;
			}

			r += ` ${App.SF.Caps()} managed to recruit ${FNG} new soldiers this week, and your reputation has <span class='green'>increased through the improvement of trade security.</span>`;
			r += `<h3>Your instructions to ${App.SF.SFC()}:</h3>`;

			r += `&nbsp;Deployment focus: `;
			r += `<span id="focus"> <<if $SF.Target == "recruit">> <b>Recruiting and Training</b> <<elseif $SF.Target == "secure">> <b>Securing Trade Routes</b> <<else>> <b>Raiding and Slaving</b> <</if>></span>&nbsp;&nbsp;`;
			r += `<br>&nbsp;&nbsp; <<link "Recruit and Train">> <<set $SF.Target = "recruit">> <<replace "#focus">> <b>Recruiting and Training</b> <</replace>> <</link>> <span class="detail">Increases the amount of FNGs at the cost of revenue.</span>`;
			r+= `<br>&nbsp;&nbsp; <<link "Secure Trade Routes">> <<set $SF.Target = "secure">> <<replace "#focus">> <b>Securing Trade Routes</b> <</replace>> <</link>> <span class="detail">Increases trade and reputation at the cost of revenue.</span>`;
			r += `<br>&nbsp;&nbsp; <<link "Raiding and Slaving">> <<set $SF.Target = "raiding">> <<replace "#focus">> <b>Raiding and Slaving</b> <</replace>> <</link>> <span class="detail">Increases revenue at the cost of less FNGs and increased force depravity.</span>`;

			r += `<br>&nbsp;Rules of Engagement: `;
			r += `<span id="roe"> <<if $SF.ROE === "hold">> <b>Hold Fire</b> <<elseif $SF.ROE === "limited">> <b>Limited Fire</b> <<else>> <b>Free Fire</b> <</if>></span>&nbsp;&nbsp;`;
			r += `<br>&nbsp;&nbsp; <<link "Hold Fire">> <<set $SF.ROE = "hold">> <<replace "#roe">> <b>Hold Fire</b> <</replace>> <</link>> <span class="detail">Reduces force depravity.</span>`;
			r += `<br>&nbsp;&nbsp; <<link "Limited Fire">> <<set $SF.ROE = "limited">> <<replace "#roe">> <b>Limited Fire</b> <</replace>> <</link>> <span class="detail">Does not adjust force depravity.</span>`;
			r += `<br>&nbsp;&nbsp; <<link "Free Fire">> <<set $SF.ROE = "free">> <<replace "#roe">> <b>Free Fire</b> <</replace>> <</link>> <span class="detail">Increases force depravity.</span>`;

			r += `<br>&nbsp;Accountability: `;
			r += `<span id="accountability"> <<if $SF.Regs === "strict">> <b>Strict Accountability</b> <<elseif $SF.Regs === "some">> <b>Some Accountability</b> <<else>> <b>No Accountability</b> <</if>></span>&nbsp;&nbsp;`;
			r += `<br>&nbsp;&nbsp; <<link "Strict Accountability">> <<set $SF.Regs = "strict">> <<replace "#accountability">> <b>Strict Accountability</b> <</replace>> <</link>> <span class="detail">Reduces force depravity.</span>`;
			r += `<br>&nbsp;&nbsp; <<link "Some Accountability">> <<set $SF.Regs = "some">> <<replace "#accountability">> <b>Some Accountability</b> <</replace>> <</link>> <span class="detail">Does not adjust force depravity.</span>`;
			r += `<br>&nbsp;&nbsp; <<link "No Accountability">> <<set $SF.Regs = "none">> <<replace "#accountability">> <b>No Accountability</b> <</replace>> <</link>> <span class="detail">Increases force depravity.</span>`;

			r += `<br><br>Force depravity affects trade.`;

			if (V.SF.MercCon.CanAttend === 1) {
				V.SF.MercCon.Income = 0;
				V.SF.MercCon.Menials = 0;
				V.SF.MercCon.CanAttend = -1;
				let tradeShowAttendes = 200,
					menialGiftsPerAttendee = 5,
					NewMercs = 0;
				let menialGifts = Math.ceil(jsRandom(1, ((tradeShowAttendes * menialGiftsPerAttendee) / 10)));
				let TSProfit = Math.ceil(500000 * (1 + (V.SF.Size / 1000)) * (1 + (V.arcologies[0].prosperity / 1000)) * T.Env);

				V.SF.MercCon.Menials += menialGifts;
				V.SF.MercCon.TotalMenials += menialGifts;
				V.menials += menialGifts;
				V.SF.MercCon.History += 1;
				V.SF.MercCon.Income += TSProfit;
				V.SF.MercCon.Revenue += TSProfit;
				cashX(TSProfit, "specialForces");

				if (V.secExpEnabled > 0 && V.mercenaries > 0) {
					V.SF.MercCon.Mercs = 0;
					NewMercs = jsRandom(1, (tradeShowAttendes / 10));
					V.mercFreeManpower += NewMercs;
					V.SF.MercCon.TotalMercs += NewMercs;
					V.SF.MercCon.Mercs += NewMercs;
				}
				r += `<br> <b>TradeShow</b>: During a break, The Colonel managed to sell some generic schematics to the ${tradeShowAttendes} attendees, some of whom decided to also give a few menial slaves as a bonus.`;
			}
		}
	}
	if (endWeekCall > 0) {
		return r;
	} else {
		return SFSubsidy;
	}
};

App.SF.Count = function() {
	const
		T = State.temporary,
		C = Math.clamp, // sure that's correct? // Yes it works as intended.
		S = V.SF.Squad,
		E = V.economy;
	T.FU = 10;
	S.Firebase = C(S.Firebase, 0, T.FU);
	T.AU = 10;
	S.Armoury = C(S.Armoury, 0, T.AU);
	T.DrugsU = 10;
	S.Drugs = C(S.Drugs, 0, T.DrugsU);
	T.DU = 10;
	S.Drones = C(S.Drones, 0, T.DU);
	T.AVU = 10;
	S.AV = C(S.AV, 0, T.AVU);
	T.TVU = 10;
	S.TV = C(S.TV, 0, T.TVU);
	T.AAU = 10;
	S.AA = C(S.AA, 0, T.AAU);
	T.TAU = 10;
	S.TA = C(S.TA, 0, T.TAU);

	if (V.PC.skill.warfare >= 75) {
		T.PGTU = 10;
		T.SPU = 10;
		T.GunSU = 10;
		T.SatU = 10;
		T.GRU = 10;
		T.MSU = 10;
		T.ACU = 10;
		T.SubU = 10;
		T.HATU = 10;
	} else if (V.PC.skill.warfare >= 50) {
		T.PGTU = 9;
		T.SPU = 9;
		T.GunSU = 9;
		T.SatU = 9;
		T.GRU = 9;
		T.MSU = 9;
		T.ACU = 9;
		T.SubU = 9;
		T.HATU = 9;
	} else {
		T.PGTU = 8;
		T.SPU = 8;
		T.GunSU = 8;
		T.SatU = 8;
		T.GRU = 8;
		T.MSU = 8;
		T.ACU = 8;
		T.SubU = 8;
		T.HATU = 8;
	}

	S.PGT = C(S.PGT, 0, T.PGTU);
	S.SpacePlane = C(S.SpacePlane, 0, T.SPU);
	S.GunS = C(S.GunS, 0, T.GunSU);
	S.Satellite.lv = C(S.Satellite.lv, 0, T.SatU);
	S.GiantRobot = C(S.GiantRobot, 0, T.GRU);
	S.MissileSilo = C(S.MissileSilo, 0, T.MSU);
	S.AircraftCarrier = C(S.AircraftCarrier, 0, T.ACU);
	S.Sub = C(S.Sub, 0, T.SubU);
	S.HAT = C(S.HAT, 0, T.HATU);
	T.GU = T.AVU + T.TVU + T.PGTU;
	T.G = S.AV + S.TV + S.PGT;
	T.H = S.AA + S.TA + S.SpacePlane + S.GunS;
	T.HU = T.AAU + T.TAU + T.SPU + T.GunSU;
	T.LBU = T.SatU + T.MSU;
	T.LB = S.Satellite.lv + S.MissileSilo;
	T.Base = S.Firebase + S.Armoury + S.Drugs + S.Drones + T.H;
	T.max = T.FU + T.AU + T.DrugsU + T.DU + T.HU;
	// if (V.SF.Facility.Toggle > 0) T.Base + = 1; T.max + = 1;

	if (V.terrain !== "oceanic" && V.terrain !== "marine") {
		T.LBU += T.GRU;
		T.LB += S.GiantRobot;
		T.Base += T.G;
		T.max += T.GU;
		T.max += T.LBU;
		T.Base += T.LB;
	} else {
		T.NY = S.AircraftCarrier + S.Sub + S.HAT;
		T.Base += T.NY;
		T.NYU = T.ACU + T.SubU + T.HATU;
		T.max += T.NYU;
	}
	V.SF.Size = T.Base;
	V.SF.Size = C(V.SF.Size, 0, T.max);
	T.T1 = 0;

	if (V.SF.FS.Tension === -1) {
		const Revivalisms = ['Roman_Revivalism', 'Aztec_Revivalism', 'Egyptian_Revivalism', 'Edo_Revivalism', 'Arabian_Revivalism', 'Chinese_Revivalism', 'Multiculturalism'];
		let FS_OPTIONS = ['Repopulation', 'Eugenics', 'Gender_radicalism', 'Gender_traditionalism', 'Paternalism', 'Degradationism', 'Body_Purism', 'Transformation_Fetishism', 'Youth_Preferentialism', 'Maturity_Preferentialism', 'Slimness_Enthusiasm', 'Asset_Expansionism', 'Slave_Pastoralism', 'Physical_Idealism', 'Hedonistic_Decadence', 'Chattel_Religionism'];
		FS_OPTIONS = FS_OPTIONS.concat(Revivalisms);
		for (let i = 0; i < FS_OPTIONS.length; i++) {
				if (V.SF.FS[FS_OPTIONS[i]] === undefined) {
					V.SF.FS[FS_OPTIONS[i]] = {lv: 0, vaildOption: 1, gift: 0};
				}
			}
	}

	if (E > 100) {
		T.Env = 4;
	} else if (E > 67) {
		T.Env = 3;
	} else {
		T.Env = 2;
	}

	if (V.SF.Size >= 30) {
		T.T1 = 1;
	}

	if (V.SF.IntroProgress > -1) {
		delete V.SF.IntroProgress;
	}

	if (V.SF.Size === T.max) {
		delete V.SF.Upgrade;
	}

	if (V.SF.BadOutcome !== undefined) {
		delete V.SF.BadOutcome;
	}

	if (V.Tour !== undefined) {
		V.SF.tour = V.Tour || 0;
		delete V.Tour;
	}
	V.SF.tour = V.SF.tour || 0;

	if (V.arcologies[0].SFRaid !== undefined) {
		delete V.arcologies[0].SFRaid;
	}

	if (V.arcologies[0].SFRaidTarget !== undefined) {
		delete V.arcologies[0].SFRaidTarget;
	}

	if (V.SF.Facility !== undefined) {
		delete V.SF.Facility;
	}
};

App.SF.UpgradeCost = function(cost, unit) {
	"use strict";
	const
		T = State.temporary,
		S = V.SF.Squad;
	let value = cost * T.Env * (1.15 + (V.SF.Size / 10)) * (1.15 + (unit / 100));
	if ([S.AircraftCarrier, S.Drones, S.GiantRobot, S.GunS, S.MissileSilo, S.Satellite.lv, S.SpacePlane, S.Sub].includes(unit)) {
		value *= V.HackingSkillMultiplier;
	}
	return Math.ceil(value);
};

App.SF.progress = function(x, max) {
	"use strict";
	let out = `⏐`,
		z, i;
	if (max === undefined) {
		Math.clamp(x, 0, 10);
		if (State.variables.SF.Size < 30) {
			z = 5 - x;
			for (i = 0; i < x; i++) {
				out += `█⏐`;
			}
			for (i = 0; i < z; i++) {
				out += `<span style='opacity: 0;'>█</span>⏐`;
			}
			for (i = 0; i < 5; i++) {
				out += `░⏐`;
			}
		} else {
			z = 10 - x;
			for (i = 0; i < x; i++) {
				out += `█⏐`;
			}
			for (i = 0; i < z; i++) {
				out += `<span style='opacity: 0;'>█</span>⏐`;
			}
		}
	} else {
		Math.clamp(x, 0, max);
		x = Math.floor(10 * x / max);
		z = 10 - x;
		for (i = 0; i < x; i++) {
			out += `█⏐`;
		}
		for (i = 0; i < z; i++) {
			out += `<span style='opacity: 0;'>█</span>⏐`;
		}
	}
	return `${out}`;
};

App.SF.SFC = function() {
	if (V.SF.MercCon.CanAttend === -1) {
		return `The Colonel`;
	} else {
		/* if (V.SF.Facility.LCActive > 0) {
			* return `Lieutenant Colonel ${SlaveFullName(V.SF.Facility.LC)}`;
			}*/
		return `a designated soldier`;
	}
};

App.SF.ColonelStatus = function() {
	const
		C = V.SF.Colonel;
	if (C.Status <= 19) {
		return `boss`;
	} else if (C.Status <= 39) {
		return `friend`;
	} else {
		return `fuckbuddy`;
	}
};

App.SF.Interactions = function() {
	"use strict";
	let choice = ``,
		time = ``;
	const
		C = V.SF.Colonel;
	if (V.SF.Gift > 0) {
		if (V.choice === 1) {
			choice += `${App.SF.Caps()} is turning over spare capital in tribute this week. `;
			if (V.SF.MercCon.CanAttend === -1 && (C.Talk + C.Fun !== 1)) {
				choice += `"I think I can find <span class='yellowgreen'>${cashFormat(Math.ceil(V.CashGift))}</span> for you, boss."`;
			} else {
				choice += `"We can spare <span class='yellowgreen'>${cashFormat(Math.ceil(V.CashGift))}</span> in tribute this week, boss".`;
			}
		} else if (V.choice === 2) {
			choice += `${App.SF.Caps()} will be throwing a military parade this week. `;
			if (V.SF.MercCon.CanAttend === -1 && (C.Talk + C.Fun !== 1)) {
				choice += `"I expect the <span class='green'>public to enjoy</span> the parade, boss."`;
			} else {
				choice += `"I'll have plans for a <span class='green'>popular parade</span> on your desk, boss".`;
			}
		} else if (V.choice === 3) {
			choice += `${App.SF.Caps()} will be conducting corporate sabotage on rival arcologies' businesses. `;
			if (V.SF.MercCon.CanAttend === -1 && (C.Talk + C.Fun !== 1)) {
				choice += `"Our interests should see a <span class='yellowgreen'>big boost,</span> boss."`;
			} else {
				choice += `"Your <span class='yellowgreen'>arcology's business prospects should see an improvement</span> this week, boss".`;
			}
		}
	}
	if (C.Talk + C.Fun > 0) {
		time = `<br>The Colonel is busy for the rest of the week, so the Lieutenant Colonel will assist you.`;
	}
	return `${time} <br>${choice}`;
};

App.SF.UnitText = function(input) {
	"use strict";
	const
		S = V.SF.Squad;
	// Sorted by case
	let appear = `is currently constructed in a haphazard fashion.`;
	let barracks = `Soldiers' cots are mixed in with weapons crates and ammunition.`;
	let slave = `Cages for processing slaves lie off to one side,`;
	let common = `and in the center is a common area with tables for soldiers to gather around for meals or rowdy conversations.`;
	let garage = ``,
		drone = ``,
		hangar = ``,
		launch = ``,
		artillery = ``;
	let comms = ``,
		training = ``;

	const Quantity = `the ${num(S.Troops)} members of ${V.SF.Lower}`;

	let weapons = `The weapons are mostly worn rifles that have already seen years of service before ${V.SF.Lower} acquired them.`;
	let armor1 = `The body armor is enough to stop smaller calibers, but nothing serious.`;
	let radio = ``,
		helmets = ``,
		ammo0 = ``,
		uniforms = ``,
		special = ``;
	let exo = ``;

	let amphet = ``,
		phen = ``,
		steroid = ``,
		downer = ``,
		concen = ``;
	let stimpack = ``,
		stabilizer = ``;

	let a = `have been recommissioned for use by ${V.SF.Lower}`,
		b = `.`,
		c = ``;
	let d = ``,
		e = ``,
		f = ``,
		g = ``,
		h = ``,
		i = ``,
		j = ``,
		k = ``;

	let activate = `has been recommissioned for use by ${V.SF.Lower}. They`;
	let mechanics = `, and mechanics are methodically checking the recent purchases for battle-readiness`;
	let MG = `120 mm main gun is enough to handle the majority of opponents around the Free Cities.`;
	let engine1 = ``,
		armor2 = ``,
		armor22 = ``,
		ammo1 = ``,
		mg = ``;
	let fireC0 = ``,
		fireC1 = ``,
		fireC2 = ``,
		fireC3 = ``,
		turret = ``;

	let B = `has been recommissioned for use by ${V.SF.Lower}. They`;
	let C = `, mechanics are giving the new purchases a final tune-up`;
	let squad = `a squad`,
		G1 = `20`,
		G2 = `in a firefight`;
	let e0 = `The engine has been`,
		engine3 = ``,
		armor3 = ``,
		tires = ``;
	let m1 = ``,
		m2 = ``,
		pod1 = ``,
		pod2 = ``;

	let b1 = `has been sold to ${V.SF.Lower} through back channels to support a failing old world nation. The tank is so large it cannot fit inside the garage, and has`;
	let c1 = ``,
		engines4 = `. Two engines power the left and right sides of the tank separately, leaving it underpowered and slow`;
	let gun0 = ``,
		gun1 = ``,
		gun2 = `an undersized main gun and makeshift firing system from a standard battle tank`;
	let armor5 = ``,
		armor6 = ``,
		cannon = ``,
		laser = ``,
		PGTframe = ``;

	let W1 = `only armed`,
		W2 = `;`,
		W3 = `a poor weapon against flying targets, but enough to handle ground forces`;
	let group = `A small group of attack VTOL have been recommissioned for use by ${V.SF.Lower}, enough to make up a squadron`;
	let engines = ``,
		TAI = ``,
		lock = ``,
		support = ``,
		stealth = ``;
	let scramble = ``,
		PAI = ``;

	let Num = `number`,
		type = `tiltrotor`,
		capacity = `small platoon or 15`;
	let engines0 = ``,
		engines01 = ``,
		Radar = ``,
		Armor = ``,
		landing = ``;
	let miniguns = ``,
		counter = ``;

	let engine20 = `ramjet engines in the atmosphere that can reach Mach 10`;
	let b5 = `has been purchased from an insolvent old world nation. It `;
	let shield = ``,
		camera = ``,
		efficiency = ``,
		camera2 = ``,
		drag = ``;
	let crew = ``,
		engine2 = ``,
		skin = ``;

	let activate2 = `has been recommissioned for use by ${V.SF.Lower}. Currently, it `;
	let barrels = `Miniguns and Gatling cannons line`,
		distance = `, though the distance to ground targets renders the smaller calibers somewhat less useful`;
	let b4 = ``,
		c2 = ``,
		fuel = ``,
		gsSpeed = ``,
		countermeasures = ``,
		ammunition = ``,
		DFA = ``,
		autocannon = ``;

	let loc1 = `An unused science satellite has been purchased from an old world nation. While currently useless, it holds potential to be a powerful tool.`;
	let gyro = ``,
		telemetry = ``,
		thrusters = ``,
		solar = ``,
		surviv = ``;
	let laser1 = ``,
		heat = ``,
		reactor = ``,
		lens = ``,
		kin = ``;

	let loc = `has been purchased from a crumbling old world nation. It`;
	let power = `Large batteries mounted in oversized shoulders power the robot for up to ten minutes of use, though they make for large targets.`;
	let knife = `simply a 8.5 meter long knife, though additional weapons are under development.`;
	let armor8 = ``,
		actuator = ``,
		cannon1 = ``,
		heatsink = ``,
		ammo2 = ``;
	let missile = ``;

	let a4 = `A cruise missile launch site has been constructed near the base of`;
	let b2 = `outdated, something quickly rigged together to give the launch site something to fire in the case of an attack`;
	let c8 = ``,
		d1 = ``,
		e1 = ``,
		f1 = ``,
		g1 = ``,
		h1 = ``;

	let recom1 = `has been recommissioned from the old world for ${V.SF.Lower}. It`;
	let jets = `Formerly mothballed strike jets`,
		radar = ``,
		AAG = ``;
	let prop = ``,
		torp = ``,
		armor9 = ``,
		power1 = ``,
		scramble1 = ``;

	let recom = `has been recommissioned from the old world, and`;
	let reactor0 = `Because diesel engines provide power and breathing oxygen is kept in pressurized canisters, the sub must frequently surface.`;
	let reactor1 = ``,
		cal = ``,
		hull = ``,
		tubes = ``,
		torpedoes = ``,
		sonar = ``;
	let control = ``,
		missiles = ``;

	let recom2 = `has been recommissioned for use by ${V.SF.Lower}. It `;
	let tons = `200`,
		skirt = ``,
		guns = ``,
		guns2 = ``,
		fans = ``,
		speed = ``;
	let turbines = ``,
		armor10 = ``,
		ramps = ``,
		HATframe = ``,
		loadout = ``;

	let loc2 = ``;
	if (V.week % 6 === 0) {
			loc2 += `is`;
			if (input !== 'HAT') {
				loc2 += ` moored to`;
			} else {
				loc2 += ` parked on`;
			}
			loc2 += ` the pier in the Naval Yard`;
			if (input === 'HAT') {
				loc2 += `, ready to ferry ${tons} tons of soldiers and vehicles`;
			}
		} else {
			loc2 += `is patrolling the waters near ${V.arcologies[0].name}`;
		}
	switch (input) {
		case 'firebase':
			if (S.Firebase >= 0) {
				const text0 = `<br> <b>Firebase:</b>`;
				if (S.Firebase >= 1) {
					appear = `has had some organization put into it.`;
					barracks = `The majority of weapons, armor, and ammunition have been separated from the soldiers' cots into their own armory.`;
					garage = `A section near the outer wall of the arcology has been converted to a garage with an adjoining vehicle maintenance bay`;
					drone = `.`;
				}
				if (V.terrain === "oceanic") {
					garage += ` for inter-arcology travel`;
				}
				if (S.Firebase >= 2) {
					barracks = `A barracks has been constructed near the armory, allowing soldiers a quieter place to sleep and store their personal spoils.`;
					drone = `; as well as a facility for the storage, maintenance, and deployment of armed combat drones.`;
				}
				if (S.Firebase >= 3) {
					appear = `has become more permanent.`;
					barracks = `A command center has been constructed near the barracks and armory, allowing for additional support personnel.`;
				}
				if (S.Firebase >= 4) {
					hangar = `Hangar space for storing and repairing aircraft has been converted from unused space on the other side of the garage.`;
				}
				if (S.Firebase >= 5) {
					appear = `is nearing the appearance of a military base.`;
					launch = `The rest of the Firebase has been designated for special projects.`;
					artillery = `Artillery batteries are set around the base of the arcology.`;
				}
				if (V.terrain === "oceanic" || V.terrain === "marine") {
					launch += ` A Naval Yard has been constructed in the waters near the arcology.`;
				}
				if (S.Firebase >= 6) {
					common = `and in the center is a common area for recreation, including a small movie theater and a mess hall.`;
				}
				if (S.Firebase >= 7) {
					slave = `A slave detention facility has been sectioned off to one side`;
					if (V.SF.Depravity > 1.5) {
						slave += ` emanating the sounds of rape and torture`;
					}
					slave += `;`;
				}
				if (S.Firebase >= 8) {
					appear = `has become a fully fledged military base.`;
					comms = `A Free City-wide communication network for ${V.SF.Lower} has been constructed to facilitate faster responses and efficient monitoring of the surrounding area.`;
				}
				if (S.Firebase >= 9) {
					training = `A high-tech killhouse has been constructed to aid in soldier training.`;
				}
				if (S.Firebase >= 10) {
					artillery = `Railgun artillery batteries are set around the base of the arcology, capable of accurately destroying enemies an absurd distance away.`;
				}
				return `${text0} The firebase ${appear} ${barracks} ${comms} ${training} ${slave} ${common} ${garage}${drone} ${hangar} ${launch} ${artillery}`;
			}
			break;
		case 'troop':
			if (S.Troops > 0) {
				const text1 = `<br>&nbsp;The large dormitories are`;
				if (S.Troops < 100) {
					return `${text1} sparsely occupied, ${Quantity} residing within them concentrating together in a corner. The hundreds of empty beds and lockers visibly herald the future.`;
				} else if (S.Troops < 400) {
					return `${text1} lightly occupied, with ${Quantity} starting to spread out across them.`;
				} else if (S.Troops < 800) {
					return `${text1} moderately occupied, though ${Quantity} residing within have a considerable amount of extra room.`;
				} else if (S.Troops < 1500) {
					return `${text1} well-occupied, and ${Quantity} residing within have started to form small cliques based on section and row.`;
				} else {
					return `${text1} near capacity, and ${Quantity} often barter their personal loot, whether it be monetary or human, for the choicest bunks.`;
				}
			}
			break;
		case 'armory':
			if (S.Armoury >= 0) {
				const text2 = `\n\n<b>Armory:</b><br>`;
				if (S.Armoury >= 2) {
					radio = `Radios have been wired into the soldiers helmets`;
					helmets = `.`;
				}
				if (S.Armoury >= 2) {
					helmets = ` and a HUD has been integrated into the soldier's eyewear.`;
				}
				if (S.Armoury >= 3) {
					ammo0 = `Tactical vests have been provided, allowing soldiers to carry additional ammo.`;
				}
				if (S.Armoury >= 4) {
					armor1 = `The body armor is a newer variant, able to stop small arms fire and protect against shrapnel.`;
				}
				if (S.Armoury >= 5) {
					weapons = `The weapons are modern rifles and sidearms, putting ${V.SF.Lower} on par with rival mercenary outfits.`;
				}
				if (S.Armoury >= 6) {
					uniforms = `New uniforms have been distributed that are more comfortable and made of breathable fabric to keep soldiers from overheating.`;
				}
				if (S.Armoury >= 7) {
					special = `Specialized weaponry is available for many roles, allowing more flexibility in planning.`;
				}
				if (S.Armoury >= 8) {
					helmets = `and a HUD and camera display have been integrated into soldiers' eyewear, enabling accurate aim around corners or from behind cover.`;
				}
				if (S.Armoury >= 9) {
					exo = `An exosuit has been developed to reduce the amount of weight soldiers carry, increase lifting strength, and move faster in combat.`;
				}
				if (S.Armoury >= 10) {
					weapons = `Cutting-edge weaponry is available to ${V.SF.Lower}, far outpacing the ability of rival mercenary outfits.`;
				}
				return `${text2} The armory holds soldiers' weapons and gear while not in training or combat. ${weapons} ${special} ${armor1} ${radio} ${helmets} ${ammo0} ${uniforms} ${exo}`;
			}
			break;
		case 'drugs':
			if (S.Drugs >= 0) {
				const text3 = `\n\n<b>Drug Lab:</b>`;
				if (S.Drugs >= 2) {
					amphet = `Amphetamines have been added to the cocktail at a low dosage to act as a stimulant, physical performance enhancer, and cognition control enhancer. Some side-effects exist.`;
				}
				if (S.Drugs >= 2) {
					phen = `Phencyclidine has been added to the cocktail at a low dosage as a dissociative psychotropic for soldiers in battle to introduce feelings of detachment, strength and invincibility, and aggression. Some side-effects reduce the tolerable dosage before soldiers go on uncontrollable violent outbreaks.`;
				}
				if (S.Drugs >= 3) {
					steroid = `Testosterone is being produced for soldiers in training as a natural muscle growth stimulant and to invoke aggression.`;
				}
				if (S.Drugs >= 4) {
					downer = `Zaleplon is being produced as a downer to counteract the battle cocktail and encourage rest before combat.`;
				}
				if (S.Drugs >= 5) {
					concen = `Methylphenidate has been added to the cocktail as a stimulant and to improve soldier concentration.`;
				}
				if (S.Drugs >= 6) {
					phen = `A phencyclidine-based drug has been added to the cocktail as a dissociative psychotropic for soldiers in battle to introduce controllable feelings of detachment, strength and invincibility, and aggression.`;
				}
				if (S.Drugs >= 7) {
					steroid = `Low levels of anabolic steroids are being produced for soldiers in training to stimulate muscle growth and invoke aggression.`;
				}
				if (S.Drugs >= 8) {
					amphet = `Diphenylmethylsulfinylacetamide has been added to the cocktail to counteract the effects of sleep deprivation and promote alertness.`;
				}
				if (S.Drugs >= 9) {
					stimpack = `A stimpack of the battle cocktail is being given to soldiers in battle to take if the original dose wears off before the battle is over.`;
				}
				if (S.Drugs >= 10) {
					stabilizer = `A stabilizer has been added to the battle cocktail that helps tie effects together while reducing side-effects, leading to an effectively safe supersoldier drug.`;
				}
				return `${text3} A drug lab has been established to increase the effectiveness of ${V.SF.Lower}'s soldiers. Many of these chemicals are mixed into a single 'battle cocktail' to be taken before combat. ${amphet} ${phen} ${concen} ${steroid} ${downer} ${stimpack} ${stabilizer}`;
			}
			break;
		case 'UAV':
			if (S.Firebase >= 2 && S.Drones >= 1) {
				const text4 = `\n\n<b>Drone Bay:</b>`;
				if (S.Drones >= 2) {
					a = `equipped with missiles are resting on one side of the drone bay`;
					b = `; as well as destroying the occasional target.`;
				}
				if (S.Drones >= 3) {
					c = `A fleet of`;
					d = `large delivery quadcopters have been converted for military service to support ground forces as combat drones.`;
				}
				if (S.Drones >= 4) {
					d = `combat drones take up the rest of the space in the drone bay. They have a`;
					e = `small automatic rifle`;
					f = `mounted to the underside.`;
				}
				if (S.Drones >= 5) {
					g = `Armor has been added to protect vulnerable components from small arms fire.`;
				}
				if (S.Drones >= 6) {
					h = `The fleet's batteries have been replaced with higher capacity models, increasing the functional time spent in combat.`;
				}
				if (S.Drones >= 7) {
					i = `The propellers and motors have been upgraded, increasing maneuverability and speed.`;
				}
				if (S.Drones >= 8) {
					j = `The drone control signal has been boosted and encrypted, giving the drones a greater range and protecting against electronic warfare.`;
				}
				if (S.Drones >= 9) {
					e = `light machine gun`;
				}
				if (S.Drones >= 10) {
					k = `A drone-to-drone network has been installed, allowing drones to swarm, maneuver, and attack targets autonomously.`;
				}
				return `${text4} Surveillance drones ${a}. During combat, they supply aerial intel to commanders and act as the communications network for ground forces${b} ${c} ${d} ${e} ${f} ${g} ${h} ${i} ${j} ${k}`;
			}
			break;
		case 'AV':
			if (S.AV >= 1) {
				const text5 = `<br>&nbsp;&nbsp;<b>Assault:</b>`;
				if (S.AV >= 2) {
					engine1 = `The engine has been overhauled, allowing much faster maneuvering around the battlefield.`;
					activate = ``;
					mechanics = ``;
				}
				if (S.AV >= 3) {
					armor2 = `A composite ceramic armor has replaced the original, offering much greater protection from attacks.`;
				}
				if (S.AV >= 4) {
					ammo1 = `The tanks have been outfitted with additional types of ammo for situational use.`;
				}
				if (S.AV >= 5) {
					mg = `A remote-controlled .50 cal machine gun has been mounted on the turret to handle infantry and low-flying aircraft.`;
				}
				if (S.AV >= 6) {
					fireC0 = `A fire-control system`;
					fireC3 = `been installed, guaranteeing`;
					fireC2 = `has`;
					fireC1 = `accurate fire.`;
				}
				if (S.AV >= 7) {
					fireC1 = `rapid, accurate fire while separating the crew from the stored ammunition in the event the ammo cooks off.`;
					fireC2 = `and an autoloader have`;
				}
				if (S.AV >= 8) {
					armor22 = `A reactive armor system has been added, giving the tank an additional, if temporary, layer of protection.`;
				}
				if (S.AV >= 9) {
					turret = `The turret has been massively redesigned, lowering the tank profile and increasing the efficiency of the mechanisms within.`;
				}
				if (S.AV >= 10) {
					MG = `140 mm main gun can quash anything even the greatest old world nations could muster.`;
				}
				return `${text5} A fleet of main battle tanks ${activate} are parked in the garage${mechanics}. ${turret} The ${MG} ${ammo1} ${mg} ${fireC0} ${fireC2} ${fireC3} ${fireC1} ${engine1} ${armor2} ${armor22}`;
			}
			break;
		case 'TV':
			if (S.TV >= 1) {
				const text6 = `<br>&nbsp;&nbsp;<b>Transport:</b>`;
				if (S.TV >= 2) {
					engine3 = `${e0} overhauled, allowing for higher mobility.`;
					C = ``;
					B = ``;
				}
				if (S.TV >= 3) {
					armor3 = `Composite armor has been bolted to the exterior, increasing the survivability of an explosive attack for the crew and passengers.`;
				}
				if (S.TV >= 4) {
					tires = `The tires have been replaced with a much more durable version that can support a heavier vehicle.`;
				}
				if (S.TV >= 5) {
					m1 = `An automatic missile defense system has been installed,`;
					m2 = `targeting any guided missiles with laser dazzlers and deploying a smokescreen.`;
				}
				if (S.TV >= 6) {
					pod1 = `An anti-tank missile pod`;
					pod2 = `has been installed on the side of the turret.`;
				}
				if (S.TV >= 7) {
					G1 = `25`;
					G2 = `by attacking enemies through cover and destroying light armor`;
				}
				if (S.TV >= 8) {
					pod2 = `and an anti-aircraft missile pod have been installed on either side of the turret.`;
				}
				if (S.TV >= 9) {
					squad = `two squads`;
					armor3 = ``;
					m2 = `destroying any incoming missiles with a high-powered laser. Some of the now redundant composite armor has been removed, and the reclaimed space allows for more passengers.`;
				}
				if (S.TV >= 10) {
					engine3 = `${e0} replaced with the newest model, allowing the vehicle to get in and out of the conflict extremely quickly.`;
				}
				return `${text6} A fleet of infantry fighting vehicles ${B} are parked in the garage${C}. The IFVs can carry ${squad} of 6 to a firezone. The ${G1} mm autocannon supports infantry ${G2}. ${pod1} ${pod2} ${engine3} ${armor3} ${tires} ${m1} ${m2}`;
			}
			break;
		case 'PGT':
			if (S.PGT >= 1) {
				const text7 = `<br>&nbsp;<b>Prototype Goliath Tank:</b>`;
				if (S.PGT >= 2) {
					c1 = `rests in`;
					b1 = ``;
					engines4 = ` and powered by their own engine, allowing the tank to travel with an unsettling speed for its massive bulk`;
				}
				if (S.PGT >= 3) {
					gun0 = `a railgun capable of`;
					gun1 = `firing steel slugs`;
					gun2 = `through one tank and into another`;
				}
				if (S.PGT >= 4) {
					armor5 = `The armor has been`;
					armor6 = `reinforced, increasing survivability for the crew inside.`;
				}
				if (S.PGT >= 5) {
					cannon = `A coaxial 30mm autocannon has been installed in the turret, along with automated .50 cal machine guns mounted over the front treads.`;
				}
				if (S.PGT >= 6) {
					laser = `Laser anti-missile countermeasures have been installed, destroying any subsonic ordinance fired at the Goliath.`;
				}
				if (S.PGT >= 7) {
					PGTframe = `The frame has been reinforced, allowing the Goliath to carry more armor and guns.`;
				}
				if (S.PGT >= 8) {
					armor6 = `redesigned with sloping and state-of-the-art materials, allowing the Goliath to shrug off even the most advanced armor-piercing tank rounds.`;
				}
				if (S.PGT >= 9) {
					gun1 = `firing guided projectiles`;
				}
				if (S.PGT >= 10) {
					gun0 = `a twin-barreled railgun capable of rapidly`;
				}
				return `${text7} A prototype Goliath tank ${b1}${c1} its own garage housing built outside the arcology. The massive bulk is spread out over 8 tracks, two for each corner of the tank${engines4}. The turret is equipped with ${gun0} ${gun1} ${gun2}. ${cannon} ${armor5} ${armor6} ${laser} ${PGTframe}`;
			}
			break;
		case 'AA':
			if (S.AA >= 1) {
				const text8 = `<br>&nbsp;&nbsp;<b>Assault:</b>`;
				if (S.AA >= 2) {
					W1 = `armed`;
					W2 = ` and air-to-air missiles,`;
					W3 = `a combination that can defend the arcology from enemy aircraft, as well as`;
					support = ` support ground troops`;
				}
				if (S.AA >= 3) {
					engines = `The engines have been tuned, allowing faster flight with greater acceleration.`;
				}
				if (S.AA >= 4) {
					TAI = `An advanced targeting AI has been installed to handle all control of weapons, allowing much more efficient use of ammunition and anti-countermeasure targeting.`;
				}
				if (S.AA >= 5) {
					lock = `Installed multispectrum countermeasures protect against all types of missile locks.`;
				}
				if (S.AA >= 6) {
					group = `A respectable number of attack VTOL protect your arcology, split into a few squadrons`;
				}
				if (S.AA >= 7) {
					support = ` attack ground targets`;
					W2 = `; rocket pods, and air-to-air missiles,`;
				}
				if (S.AA >= 8) {
					stealth = `The old skin has been replaced with a radar-absorbent material, making the aircraft difficult to pick up on radar.`;
				}
				if (S.AA >= 9) {
					scramble = `The VTOLs can scramble to react to any threat in under three minutes.`;
				}
				if (S.AA >= 10) {
					PAI = `A piloting AI has been installed, allowing the VTOLs to perform impossible maneuvers that cannot be done by a human pilot. This removes the need for a human in the aircraft altogether.`;
				}
				return `${text8} ${group}. Several of the landing pads around ${V.arcologies[0].name} host groups of four fighters, ready to defend the arcology. ${scramble} The attack VTOL are currently ${W1} with a Gatling cannon${W2} ${W3}${support}. ${TAI} ${PAI} ${engines} ${lock} ${stealth}`;
			}
			break;
		case 'TA':
			if (S.TA >= 1) {
				const text9 = `<br>&nbsp;&nbsp;<b>Transport:</b>`;
				if (S.TA >= 2) {
					engines0 = `The tiltrotor engines have been replaced with a more powerful engine, allowing faster travel times.`;
				}
				if (S.TA >= 3) {
					counter = `Multispectrum countermeasures have been added to protect against guided missiles.`;
				}
				if (S.TA >= 4) {
					miniguns = `Mounted miniguns have been installed to cover soldiers disembarking in dangerous areas.`;
				}
				if (S.TA >= 5) {
					Num = `large number`;
				}
				if (S.TA >= 6) {
					landing = `The landing equipment has been overhauled, protecting personnel and cargo in the event of a hard landing or crash.`;
				}
				if (S.TA >= 7) {
					Armor = `Armor has been added to protect passengers from small arms fire from below.`;
				}
				if (S.TA >= 8) {
					capacity = `large platoon or 20`;
					engines01 = `Further tweaks to the engine allow for greater lifting capacity.`;
				}
				if (S.TA >= 9) {
					Radar = `Radar-absorbent materials have replaced the old skin, making it difficult to pick up the VTOL on radar.`;
				}
				if (S.TA >= 10) {
					type = `tiltjet`;
					engines01 = ``;
					engines0 = `The tiltrotors have been replaced with tiltjets, allowing for much greater airspeed and acceleration.`;
				}
				return `${text9} A ${Num} of transport ${type} VTOL have been recommissioned for use by ${V.SF.Lower}. The VTOLs are resting on large pads near the base to load either a ${capacity} tons of material. ${engines0} ${engines01} ${Armor} ${landing} ${counter} ${Radar} ${miniguns}`;
			}
			break;
		case 'SP':
			if (S.SpacePlane >= 1) {
				const text10 = `<br>&nbsp;<b>Spaceplane:</b>`;
				if (S.SpacePlane >= 2) {
					b5 = ``;
					shield = `The current heat shielding has been upgraded, reducing the likelihood of heat damage during reentry.`;
				}
				if (S.SpacePlane >= 3) {
					engine2 = ` and liquid rocket engines in orbit that can reach an equivalent Mach 18`;
				}
				if (S.SpacePlane >= 4) {
					camera = `A state-of-the-art camera has been installed in the underbelly that takes incredibly high resolution photos, but requires the frictionless environment of space to focus.`;
				}
				if (S.SpacePlane >= 5) {
					efficiency = `Tweaks to the engines have increased fuel efficiency to the point where midflight refueling is no longer necessary.`;
				}
				if (S.SpacePlane >= 6) {
					camera2 = `The camera sensor is capable of taking IR shots.`;
				}
				if (S.SpacePlane >= 7) {
					drag = `Miraculous advances in aerodynamics and materials allow frictionless flight, even while in the atmosphere.`;
				}
				if (S.SpacePlane >= 8) {
					crew = `Increased the crew comfort and life support systems to increase operational time.`;
				}
				if (S.SpacePlane >= 9) {
					skin = `Replaced the underbelly skin with a chameleon kit, matching the color to the sky above it.`;
				}
				if (S.SpacePlane >= 10) {
					engine2 = ` and liquid rocket engines in orbit that can reach an equivalent Mach 25`;
					engine20 = `experimental scramjet engines in the atmosphere that can reach Mach 15`;
				}
				return `${text10} A prototype spaceplane ${b5} rests in the hangar, its black fuselage gleaming. The craft is powered by ${engine20}${engine2}. ${efficiency} ${shield} ${camera} ${camera2} ${drag} ${crew} ${skin}`;
			}
			break;
		case 'GunS':
			if (S.GunS >= 1) {
				const text11 = `<br>&nbsp;<b>Gunship:</b>`;
				if (S.GunS >= 2) {
					b4 = `Infrared sensors have been added for the gunners to better pick targets.`;
					activate2 = ``;
				}
				if (S.GunS >= 3) {
					c2 = `The underside of the aircraft has been better armored against small-arms fire`;
					countermeasures = `.`;
				}
				if (S.GunS >= 4) {
					fuel = `Larger fuel tanks have been installed in the wings and fuselage, allowing the gunship to provide aerial support for longer periods before refueling.`;
				}
				if (S.GunS >= 5) {
					barrels = `25 mm Gatling cannons`;
					distance = `; allowing the gunship to eliminate infantry`;
					DFA = ` and light vehicles from above`;
					autocannon = ` and a 40 mm autocannon are mounted on`;
				}
				if (S.GunS >= 6) {
					gsSpeed = `The engines have been replaced, allowing both faster travel to a target, and slower travel around a target.`;
				}
				if (S.GunS >= 7) {
					countermeasures = `; and multi-spectrum countermeasures have been installed to protect against guided missiles.`;
				}
				if (S.GunS >= 8) {
					b4 = `Upgraded multi-spectrum sensors can clearly depict targets even with IR shielding.`;
				}
				if (S.GunS >= 9) {
					ammunition = `The ammunition storage has been increased, only slightly depriving loaders of a place to sit.`;
				}
				if (S.GunS >= 10) {
					DFA = `; both light and heavy vehicles, and most enemy cover from above`;
					autocannon = `; a 40 mm autocannon, and a 105 mm howitzer are mounted on`;
				}
				return `${text11} A large gunship ${activate2} is being refueled in the hangar. ${barrels}${autocannon} the port side of the fuselage${distance}${DFA}. ${b4} ${ammunition} ${gsSpeed} ${c2}${countermeasures} ${fuel}`;
			}
			break;
		case 'sat':
			if (S.Satellite.lv >= 1) {
				const text12 = `<br>&nbsp;<b>Satellite:</b>`;
				if (S.Satellite.lv >= 2) {
					if (V.SF.Squad.Satellite.InOrbit < 1) {
						loc1 = `The satellite is being worked on in the Launch Bay.`;
					} else {
						loc1 = `The satellite is in geosynchronous orbit, far above the arcology.`;
					}
					gyro = `A suite of sensors have been installed to ensure the satellite can detect attitude and orbital altitude.`;
				}
				if (S.Satellite.lv >= 3) {
					telemetry = `Telemetry systems have been installed to communicate with the satellite in orbit, with strong encryption measures.`;
				}
				if (S.Satellite.lv >= 4) {
					thrusters = `Thrusters have been installed to control satellite attitude and orbit.`;
				}
				if (S.Satellite.lv >= 5) {
					solar = `A massive folding solar panel array, combined with the latest in battery technology allow the satellite to store an enormous amount of energy relatively quickly.`;
					surviv = `Enough of the satellite has been finished that it can expect to survive for a significant period of time in space.`;
				}
				if (S.Satellite.lv >= 6) {
					laser1 = `A laser cannon has been mounted facing the earth, capable of cutting through steel in seconds`;
					heat = ` while generating a large amount of heat.`;
				}
				if (S.Satellite.lv >= 7) {
					heat = `. The installed heatsink allows the laser cannon to fire more frequently without damaging the satellite.`;
				}
				if (S.Satellite.lv >= 8) {
					reactor = `A small, efficient nuclear reactor has been installed to continue generating energy while in the Earth's shadow.`;
				}
				if (S.Satellite.lv >= 9) {
					lens = `A higher quality and adjustable lens has been installed on the laser, allowing scalpel precision on armor or wide-area blasts on unarmored targets.`;
				}
				if (S.Satellite.lv >= 10) {
					kin = `A magazine of directable tungsten rods have been mounted to the exterior of the satellite, allowing for kinetic bombardment roughly equal to a series of nuclear blasts.`;
				}
				return `${text12} ${loc1} ${gyro} ${thrusters} ${telemetry} ${solar} ${reactor} ${surviv} ${laser1} ${heat} ${lens} ${kin}`;
			}
			break;
		case 'GR':
			if (S.GiantRobot >= 1) {
				const text13 = `<br>&nbsp;<b>Giant Robot:</b>`;
				if (S.GiantRobot >= 2) {
					loc = ``;
					armor8 = `Armor plating has been mounted over the majority of the robot.`;
				}
				if (S.GiantRobot >= 3) {
					power = `The robot is now powered by an umbilical cable system instead of bulky and short-lived batteries.`;
				}
				if (S.GiantRobot >= 4) {
					knife = `a 25 meter plasma sword. The cutting edge uses plasma to melt and cut through targets, reducing the strain on the sword.`;
				}
				if (S.GiantRobot >= 5) {
					actuator = `The limb actuators have been replaced with a faster and more powerful variant, granting the robot the same.`;
				}
				if (S.GiantRobot >= 6) {
					cannon1 = `A custom 45 mm Gatling cannon rifle has been developed for ranged use`;
					ammo2 = `; though it lacks enough ammo storage for a main weapon.`;
				}
				if (S.GiantRobot >= 7) {
					heatsink = `Large heatsinks have been installed out of the back to solve a massive overheating problem. These heatsinks resemble wings, and tend to glow red with heat when in heavy use.`;
				}
				if (S.GiantRobot >= 8) {
					armor8 = ``;
					actuator = `Final actuator tweaks have allowed for the addition of exceptionally thick armor without any loss in speed or power.`;
				}
				if (S.GiantRobot >= 9) {
					ammo2 = `; with spare ammunition drums kept along the robot's waist.`;
				}
				if (S.GiantRobot >= 10) {
					missile = `Missile pods have been mounted on the shoulders.`;
				}
				return `${text13} A prototype giant robot ${loc} rests in a gantry along the side of the arcology. The robot is as tall as a medium-sized office building, focusing on speed over other factors. ${power} ${armor8} ${actuator} ${heatsink} The main armament is ${knife} ${cannon1}${ammo2} ${missile}`;
			}
			break;
		case 'ms':
			if (S.MissileSilo >= 1) {
				const text14 = `<br>&nbsp;<b>Cruise Missile:</b>`;
				if (S.MissileSilo >= 2) {
					b2 = `a modern missile`;
					c8 = `; tipped with a conventional warhead`;
				}
				if (S.MissileSilo >= 3) {
					d1 = `The launch systems have been overhauled, allowing a launch within seconds of an attack order being given.`;
				}
				if (S.MissileSilo >= 4) {
					e1 = `The missile engines have been tweaked, giving them a greater range.`;
				}
				if (S.MissileSilo >= 5) {
					f1 = `A passive radar has been installed, allowing the missile to follow moving targets.`;
				}
				if (S.MissileSilo >= 6) {
					a4 = `Several cruise missile launch sites have been constructed around`;
				}
				if (S.MissileSilo >= 7) {
					e1 = `The engine has been replaced, giving the missiles greater range and supersonic speeds.`;
				}
				if (S.MissileSilo >= 8) {
					g1 = `The ability to pick new targets should the original be lost has been added.`;
				}
				if (S.MissileSilo >= 9) {
					h1 = `The missile now uses its remaining fuel to create a thermobaric explosion, massively increasing explosive power.`;
				}
				if (S.MissileSilo >= 10) {
					c8 = ` that can be tipped with either a conventional or nuclear warhead`;
				}
				return `${text14} ${a4} the arcology. The current missile armament is ${b2}${c8}. ${d1} ${e1} ${f1} ${g1} ${h1}`;
			}
			break;
		case 'AC':
			if (S.AircraftCarrier >= 1) {
				const text15 = `<br>&nbsp;<b>Aircraft Carrier:</b>`;
				if (S.AircraftCarrier >= 2) {
					radar = `The island's radar and comms have been improved.`;
					recom1 = ``;
				}
				if (S.AircraftCarrier >= 3) {
					AAG = `The antiair guns have been updated to automatically track and predict enemy aircraft movement.`;
				}
				if (S.AircraftCarrier >= 4) {
					jets = `Modern strike jets with state-of-the-art armaments`;
				}
				if (S.AircraftCarrier >= 5) {
					prop = `The propellers have been redesigned, granting greater speed with less noise.`;
				}
				if (S.AircraftCarrier >= 6) {
					torp = `An anti-torpedo system detects and destroys incoming torpedoes.`;
				}
				if (S.AircraftCarrier >= 7) {
					armor9 = `Additional armor has been added to the hull and deck.`;
				}
				if (S.AircraftCarrier >= 8) {
					power1 = `The power plant has been converted to provide nuclear power.`;
				}
				if (S.AircraftCarrier >= 9) {
					scramble1 = `The catapult has been converted to an electromagnetic launch system, halving the time it takes to scramble jets.`;
				}
				if (S.AircraftCarrier >= 10) {
					jets = `Attack VTOL from the converted for carrier capability`;
				}
				return `${text15} An aircraft carrier ${recom1} ${loc2}. ${jets} serve as its airpower. ${scramble1} ${power1} ${radar} ${AAG} ${torp} ${prop} ${armor9}`;
			}
			break;
		case 'Sub':
			if (S.Sub >= 1) {
				const text16 = `<br>&nbsp;<b>Submarine:</b>`;
				if (S.Sub >= 2) {
					recom = ``;
					reactor0 = `A nuclear reactor provides power`;
					reactor1 = `; but because oxygen is still kept in pressurized canisters the sub must frequently surface to replenish its oxygen stocks.`;
				}
				if (S.Sub >= 3) {
					reactor1 = ` and an oxygen generator pulls O₂ from the surrounding seawater, allowing the submarine to remain underwater for months if necessary.`;
				}
				if (S.Sub >= 4) {
					cal = `Calibration of the propulsion systems has reduced the telltale hum of a moving sub to a whisper.`;
				}
				if (S.Sub >= 5) {
					hull = `The outer hull has been redesigned for hydrodynamics and sonar absorption.`;
				}
				if (S.Sub >= 6) {
					tubes = `The torpedo tubes have been redesigned for faster loading speeds`;
					torpedoes = `.`;
				}
				if (S.Sub >= 7) {
					sonar = `The passive sonar has been finely tuned to detect mechanical noises miles away.`;
				}
				if (S.Sub >= 8) {
					control = `The control room computers have been upgraded to automate many conn duties.`;
				}
				if (S.Sub >= 9) {
					torpedoes = `and launch more agile torpedoes.`;
				}
				if (S.Sub >= 10) {
					missiles = `The submarine has been outfitted with several cruise missiles to attack land or sea-based targets.`;
				}
				return `${text16} An attack submarine ${recom} ${loc2}. ${reactor0}${reactor1} ${cal} ${hull} ${tubes}${torpedoes} ${sonar} ${control} ${missiles}`;
			}
			break;
		case 'HAT':
			if (S.HAT >= 1) {
				const text17 = `<br>&nbsp;<b>Amphibious Transport:</b>`;
				if (S.HAT >= 2) {
					skirt = `The skirt has been upgraded to increase durability and improve cushion when traveling over uneven terrain and waves.`;
					recom2 = ``;
				}
				if (S.HAT >= 3) {
					guns = `A minigun`;
					guns2 = `has been mounted on the front corners of the craft to defend against attackers.`;
				}
				if (S.HAT >= 4) {
					fans = `The turbines powering the rear fans`;
					speed = `acceleration and speed.`;
					turbines = `have been replaced with a more powerful version, allowing greater`;
				}
				if (S.HAT >= 5) {
					armor10 = `The armor protecting its cargo has been increased.`;
				}
				if (S.HAT >= 6) {
					tons = `300`;
					fans = `The turbines powering the rear fans and impeller`;
					speed = `acceleration, speed, and carrying capacity.`;
				}
				if (S.HAT >= 7) {
					guns = `A minigun and grenade launcher`;
				}
				if (S.HAT >= 8) {
					ramps = `The loading ramps have been improved, allowing for faster unloading.`;
				}
				if (S.HAT >= 9) {
					HATframe = `The frame has been widened and reinforced, allowing for more space on the deck.`;
				}
				if (S.HAT >= 10) {
					loadout = `An experimental loadout sacrifices all carrying capacity to instead act as a floating gun platform by mounting several rotary autocannons the deck, should the need arise.`;
				}
				return `${text17} An air cushion transport vehicle, or hovercraft; ${recom2}${loc2}. ${guns} ${guns2} ${fans} ${turbines} ${speed} ${skirt} ${armor10} ${ramps} ${HATframe} ${loadout}`;
			}
			break;
	}
};
