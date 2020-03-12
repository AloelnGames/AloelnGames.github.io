window.physicalDevelopment = (function physicalDevelopment() {
	"use strict";

	let gigantomastiaMod;
	let rearQuirk;
	let rearQuirkDivider;
	let dickMod;

	return physicalDevelopment;

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function physicalDevelopment(slave) {
		if (slave.geneMods.NCS !== 1) {
			/* NCS completely blocks all natural physical growth: no height increases. It also blocks all hormonal secondary sexual * characteristics. So, on the female side: no boobs, no butt, no hips, and no labia. And on the male side: no dick, no clit, no balls, no scrotum, no shoulders. */
			/* so this is a big old NO-OP to skip the physical development. */
			if (slave.geneticQuirks.androgyny === 2) { /* takes a mix of both to create a very androgynous slave */
				if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
					increaseHeightDwarf(slave);
				} else if (slave.geneticQuirks.gigantism === 2) {
					increaseHeightGiant(slave);
				} else {
					increaseHeightXX(slave);
				}
				if (slave.boobs - slave.boobsImplant <= 300) {
					increaseBoobsXX(slave);
				}
				if (slave.dick > 0 && (slave.dick < 3 || slave.geneticQuirks.wellHung === 2)) {
					increaseDick(slave);
				}
				if (slave.balls > 0 && slave.balls < 3) {
					increaseBalls(slave);
				}
				if (slave.vagina > 0 && slave.ovaries > 0 && slave.physicalAge > slave.pubertyAgeXX) {
					increaseWetness(slave);
				}
				if (slave.waist < 10) {
					increaseWaistXY(slave);
				}
				if (slave.hips - slave.hipsImplant < 0) {
					increaseHipsXX(slave);
				}
				if (slave.butt - slave.buttImplant < 3) {
					increaseButtXX(slave);
				}
				increasePregAdaptationXX(slave);
			} else if (slave.genes === "XX") { /* loli becoming a woman */
				if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
					increaseHeightDwarf(slave);
				} else if (slave.geneticQuirks.gigantism === 2) {
					increaseHeightGiant(slave);
				} else {
					increaseHeightXX(slave);
				}
				if (slave.physicalAge === 13) {
					increaseFaceXX(slave);
					if (slave.voice > 0) {
						increaseVoiceXX(slave);
					}
				}
				increaseBoobsXX(slave);
				if (slave.clit > 0) {
					increaseClit(slave);
				}
				if (slave.vagina > 0 && slave.ovaries > 0 && slave.physicalAge > slave.pubertyAgeXX) {
					increaseWetness(slave);
				}
				increaseWaistXX(slave);
				increaseHipsXX(slave);
				increaseButtXX(slave);
				increasePregAdaptationXX(slave);
			} else {
				/* shota becoming a man */
				if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
					increaseHeightDwarf(slave);
				} else if (slave.geneticQuirks.gigantism === 2) {
					increaseHeightGiant(slave);
				} else {
					increaseHeightXY(slave);
				}
				if (slave.physicalAge === 13) {
					increaseFaceXY(slave);
					if (slave.voice > 1) {
						increaseVoiceXY(slave);
					}
				}
				increaseBoobsXY(slave);
				if (slave.dick > 0) {
					increaseDick(slave);
				}
				if (slave.balls > 0) {
					increaseBalls(slave);
				}
				increaseWaistXY(slave);
				increaseHipsXY(slave);
				increaseButtXY(slave);
				increasePregAdaptationXY(slave);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseHeightXX(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 91) {
					slave.height += jsEither([8, 8, 9, 9]);
				} else if (slave.height <= 101) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 101) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 109) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 109) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 116) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 116) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 124) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 131) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 163) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 163) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 168) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 168) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 171) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 171) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 173) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 91) {
					slave.height += jsEither([8, 8, 9, 9, 9]);
				} else if (slave.height <= 101) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 101) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 109) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 109) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 116) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 116) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 124) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([7, 7, 8, 8, 8]);
				} else if (slave.height <= 131) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 4, 5, 5, 5]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 163) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 163) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 168) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 168) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 171) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 171) {
					slave.height += jsEither([4, 4, 5, 5, 5]);
				} else if (slave.height <= 173) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 91) {
					slave.height += jsEither([9, 9, 9, 10, 10]);
				} else if (slave.height <= 101) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 101) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 109) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 109) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 116) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 116) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 124) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([8, 8, 8, 9, 9]);
				} else if (slave.height <= 131) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([5, 5, 5, 6, 6]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 156) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 163) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 163) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 168) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 168) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 171) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 171) {
					slave.height += jsEither([5, 5, 5, 6, 6]);
				} else if (slave.height <= 173) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 174) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 174) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 174) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 174) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 91) {
					slave.height += jsEither([8, 9, 9, 10, 10]);
				} else if (slave.height <= 101) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 101) {
					slave.height += jsEither([6, 7, 7, 8, 8]);
				} else if (slave.height <= 109) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 109) {
					slave.height += jsEither([6, 7, 7, 8, 8]);
				} else if (slave.height <= 116) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 116) {
					slave.height += jsEither([5, 6, 6, 7, 7]);
				} else if (slave.height <= 124) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([7, 8, 8, 9, 9]);
				} else if (slave.height <= 131) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 6, 6, 7, 7]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 5, 5, 6, 6]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([6, 7, 7, 8, 8]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 6, 6, 7, 7]);
				} else if (slave.height <= 163) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 163) {
					slave.height += jsEither([6, 7, 7, 8, 8]);
				} else if (slave.height <= 168) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 168) {
					slave.height += jsEither([5, 6, 6, 7, 7]);
				} else if (slave.height <= 171) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 171) {
					slave.height += jsEither([4, 5, 5, 6, 6]);
				} else if (slave.height <= 173) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 1, 1, 2, 2]);
				}
			}
		} else {
			if (slave.physicalAge === 3) {
				if (slave.height <= 91) {
					slave.height += jsEither([8, 8, 9, 9, 9, 10]);
				} else if (slave.height <= 101) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 101) {
					slave.height += jsEither([6, 6, 7, 7, 8, 8]);
				} else if (slave.height <= 109) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 109) {
					slave.height += jsEither([6, 6, 7, 7, 7, 8]);
				} else if (slave.height <= 116) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 116) {
					slave.height += jsEither([5, 5, 6, 6, 6, 7]);
				} else if (slave.height <= 124) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([7, 7, 8, 8, 8, 9]);
				} else if (slave.height <= 131) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 5, 6, 6, 6, 7]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 4, 5, 5, 5, 6]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([6, 6, 7, 7, 7, 8]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 5, 6, 6, 6, 7]);
				} else if (slave.height <= 163) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 163) {
					slave.height += jsEither([6, 6, 7, 7, 7, 8]);
				} else if (slave.height <= 168) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 168) {
					slave.height += jsEither([5, 5, 6, 6, 6, 7]);
				} else if (slave.height <= 171) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 171) {
					slave.height += jsEither([4, 4, 5, 5, 5, 6]);
				} else if (slave.height <= 173) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1, 2]);
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1, 2]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 174) {
					slave.height += jsEither([0, 0, 1, 1, 1, 2]);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseHeightXY(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 93) {
					slave.height += jsEither([9, 9, 10, 10]);
				} else if (slave.height <= 103) {
					slave.height += 6;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 103) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 110) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 110) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 117) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 117) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 124) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 131) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 150) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 150) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 162) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 162) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 170) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 170) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 177) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 177) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 184) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 184) {
					slave.height += jsEither([2, 2, 3, 3]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 185) {
					slave.height += jsEither([1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 186) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 93) {
					slave.height += jsEither([9, 9, 9, 10, 10]);
				} else if (slave.height <= 103) {
					slave.height += 6;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 103) {
					slave.height += jsEither([7, 7, 8, 8, 8]);
				} else if (slave.height <= 110) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 110) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 117) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 117) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 124) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 131) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 4, 5, 5, 5]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 150) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 150) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 5, 6, 6, 6]);
				} else if (slave.height <= 162) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 162) {
					slave.height += jsEither([7, 7, 8, 8, 8]);
				} else if (slave.height <= 170) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 170) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 177) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 177) {
					slave.height += jsEither([6, 6, 7, 7, 7]);
				} else if (slave.height <= 184) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 184) {
					slave.height += jsEither([2, 2, 3, 3, 3]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 185) {
					slave.height += jsEither([1, 1, 2, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 186) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 93) {
					slave.height += jsEither([10, 10, 11, 11]);
				} else if (slave.height <= 103) {
					slave.height += 6;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 103) {
					slave.height += jsEither([8, 8, 9, 9]);
				} else if (slave.height <= 110) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 110) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 117) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 117) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 124) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 131) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 150) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 150) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 156) {
					slave.height += jsEither([6, 6, 7, 7]);
				} else if (slave.height <= 162) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 162) {
					slave.height += jsEither([8, 8, 9, 9]);
				} else if (slave.height <= 170) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 170) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 177) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 177) {
					slave.height += jsEither([7, 7, 8, 8]);
				} else if (slave.height <= 184) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 184) {
					slave.height += jsEither([3, 3, 4, 4]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 185) {
					slave.height += jsEither([2, 2, 3, 3]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 186) {
					slave.height += jsEither([1, 1, 2, 2]);
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 93) {
					slave.height += jsEither([10, 10, 10, 11, 11]);
				} else if (slave.height <= 103) {
					slave.height += 6;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 103) {
					slave.height += jsEither([8, 8, 8, 9, 9]);
				} else if (slave.height <= 110) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 110) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 117) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 117) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 124) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 131) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([5, 5, 5, 6, 6]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 150) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 150) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 156) {
					slave.height += jsEither([6, 6, 6, 7, 7]);
				} else if (slave.height <= 162) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 162) {
					slave.height += jsEither([8, 8, 8, 9, 9]);
				} else if (slave.height <= 170) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 170) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 177) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 177) {
					slave.height += jsEither([7, 7, 7, 8, 8]);
				} else if (slave.height <= 184) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 184) {
					slave.height += jsEither([3, 3, 3, 4, 4]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 185) {
					slave.height += jsEither([2, 2, 2, 3, 3]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 186) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			}
		} else {
			if (slave.physicalAge === 3) {
				if (slave.height <= 93) {
					slave.height += jsEither([9, 9, 10, 10, 10, 11]);
				} else if (slave.height <= 103) {
					slave.height += 6;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 103) {
					slave.height += jsEither([7, 7, 8, 8, 9, 9]);
				} else if (slave.height <= 110) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 110) {
					slave.height += jsEither([6, 6, 7, 7, 8, 8]);
				} else if (slave.height <= 117) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 117) {
					slave.height += jsEither([6, 6, 7, 7, 8, 8]);
				} else if (slave.height <= 124) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 124) {
					slave.height += jsEither([6, 6, 7, 7, 8, 8]);
				} else if (slave.height <= 131) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 131) {
					slave.height += jsEither([5, 5, 6, 6, 7, 7]);
				} else if (slave.height <= 137) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 137) {
					slave.height += jsEither([4, 4, 5, 5, 5, 6]);
				} else if (slave.height <= 144) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 144) {
					slave.height += jsEither([5, 5, 6, 6, 7, 7]);
				} else if (slave.height <= 150) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 150) {
					slave.height += jsEither([5, 5, 6, 6, 6, 7]);
				} else if (slave.height <= 156) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 156) {
					slave.height += jsEither([5, 5, 6, 6, 7, 7]);
				} else if (slave.height <= 162) {
					slave.height += 3;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 162) {
					slave.height += jsEither([7, 7, 8, 8, 9, 9]);
				} else if (slave.height <= 170) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 170) {
					slave.height += jsEither([6, 6, 7, 7, 8, 8]);
				} else if (slave.height <= 177) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 177) {
					slave.height += jsEither([6, 6, 7, 7, 8, 8]);
				} else if (slave.height <= 184) {
					slave.height += 4;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 184) {
					slave.height += jsEither([2, 2, 3, 3, 4, 4]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 185) {
					slave.height += jsEither([1, 1, 2, 2, 3, 3]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 186) {
					slave.height += jsEither([0, 0, 1, 1, 2, 2]);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseHeightDwarf(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 80) {
					slave.height += jsEither([1, 1, 2, 2]);
				} else if (slave.height <= 84) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 84) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 90) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 90) {
					slave.height += jsEither([8, 8, 9, 9]);
				} else if (slave.height <= 100) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 100) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 105) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 105) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 109) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 109) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 114) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 114) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 118) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 118) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 122) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 122) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 127) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 127) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 132) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 132) {
					slave.height += jsEither([1, 1, 2, 2]);
				} else if (slave.height <= 135) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 135) {
					slave.height += jsEither([1, 1, 2, 2]);
				} else if (slave.height <= 138) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 138) {
					slave.height += jsEither([1, 1, 2, 2]);
				} else if (slave.height <= 141) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1]);
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 80) {
					slave.height += jsEither([1, 1, 2, 2, 2]);
				} else if (slave.height <= 84) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 84) {
					slave.height += jsEither([4, 4, 5, 5, 5]);
				} else if (slave.height <= 90) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 90) {
					slave.height += jsEither([8, 8, 9, 9, 9]);
				} else if (slave.height <= 100) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 100) {
					slave.height += jsEither([3, 3, 4, 4, 4]);
				} else if (slave.height <= 105) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 105) {
					slave.height += jsEither([2, 2, 3, 3, 3]);
				} else if (slave.height <= 109) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 109) {
					slave.height += jsEither([3, 3, 4, 4, 4]);
				} else if (slave.height <= 114) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 114) {
					slave.height += jsEither([2, 2, 3, 3, 3]);
				} else if (slave.height <= 118) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 118) {
					slave.height += jsEither([2, 2, 3, 3, 3]);
				} else if (slave.height <= 122) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 122) {
					slave.height += jsEither([3, 3, 4, 4, 4]);
				} else if (slave.height <= 127) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 127) {
					slave.height += jsEither([3, 3, 4, 4, 4]);
				} else if (slave.height <= 132) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 132) {
					slave.height += jsEither([1, 1, 2, 2, 2]);
				} else if (slave.height <= 135) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 135) {
					slave.height += jsEither([1, 1, 2, 2, 2]);
				} else if (slave.height <= 138) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 138) {
					slave.height += jsEither([1, 1, 2, 2, 2]);
				} else if (slave.height <= 141) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1, 1]);
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 80) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 84) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 84) {
					slave.height += jsEither([5, 5, 6, 6]);
				} else if (slave.height <= 90) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 90) {
					slave.height += jsEither([9, 9, 10, 10]);
				} else if (slave.height <= 100) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 100) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 105) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 105) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 109) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 109) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 114) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 114) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 118) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 118) {
					slave.height += jsEither([3, 3, 4, 4]);
				} else if (slave.height <= 122) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 122) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 127) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 127) {
					slave.height += jsEither([4, 4, 5, 5]);
				} else if (slave.height <= 132) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 132) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 135) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 135) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 138) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 138) {
					slave.height += jsEither([2, 2, 3, 3]);
				} else if (slave.height <= 141) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 143) {
					slave.height += jsEither([1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 143) {
					slave.height += jsEither([1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 143) {
					slave.height += jsEither([1, 1, 2, 2]);
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 3) {
				if (slave.height <= 80) {
					slave.height += jsEither([2, 2, 2, 3, 3]);
				} else if (slave.height <= 84) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 84) {
					slave.height += jsEither([5, 5, 5, 6, 6]);
				} else if (slave.height <= 90) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 90) {
					slave.height += jsEither([9, 9, 9, 10, 10]);
				} else if (slave.height <= 100) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 100) {
					slave.height += jsEither([4, 4, 4, 5, 5]);
				} else if (slave.height <= 105) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 105) {
					slave.height += jsEither([3, 3, 3, 4, 4]);
				} else if (slave.height <= 109) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 109) {
					slave.height += jsEither([4, 4, 4, 5, 5]);
				} else if (slave.height <= 114) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 114) {
					slave.height += jsEither([3, 3, 3, 4, 4]);
				} else if (slave.height <= 118) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 118) {
					slave.height += jsEither([3, 3, 3, 4, 4]);
				} else if (slave.height <= 122) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 122) {
					slave.height += jsEither([4, 4, 4, 5, 5]);
				} else if (slave.height <= 127) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 127) {
					slave.height += jsEither([4, 4, 4, 5, 5]);
				} else if (slave.height <= 132) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 132) {
					slave.height += jsEither([2, 2, 2, 3, 3]);
				} else if (slave.height <= 135) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 135) {
					slave.height += jsEither([2, 2, 2, 3, 3]);
				} else if (slave.height <= 138) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 138) {
					slave.height += jsEither([2, 2, 2, 3, 3]);
				} else if (slave.height <= 141) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 143) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 143) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 143) {
					slave.height += jsEither([1, 1, 1, 2, 2]);
				}
			}
		} else {
			if (slave.physicalAge === 3) {
				if (slave.height <= 80) {
					slave.height += jsEither([1, 1, 2, 2, 3, 3]);
				} else if (slave.height <= 84) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 4) {
				if (slave.height <= 84) {
					slave.height += jsEither([4, 4, 5, 5, 6, 6]);
				} else if (slave.height <= 90) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 5) {
				if (slave.height <= 90) {
					slave.height += jsEither([8, 8, 9, 9, 10, 10]);
				} else if (slave.height <= 100) {
					slave.height += 5;
				}
			} else if (slave.physicalAge === 6) {
				if (slave.height <= 100) {
					slave.height += jsEither([3, 3, 4, 4, 5, 5]);
				} else if (slave.height <= 105) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 7) {
				if (slave.height <= 105) {
					slave.height += jsEither([2, 2, 3, 3, 4, 4]);
				} else if (slave.height <= 109) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 8) {
				if (slave.height <= 109) {
					slave.height += jsEither([3, 3, 4, 4, 5, 5]);
				} else if (slave.height <= 114) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 9) {
				if (slave.height <= 114) {
					slave.height += jsEither([2, 2, 3, 3, 4, 4]);
				} else if (slave.height <= 118) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 10) {
				if (slave.height <= 118) {
					slave.height += jsEither([2, 2, 3, 3, 4, 4]);
				} else if (slave.height <= 122) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 11) {
				if (slave.height <= 122) {
					slave.height += jsEither([3, 3, 4, 4, 5, 5]);
				} else if (slave.height <= 127) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 12) {
				if (slave.height <= 127) {
					slave.height += jsEither([3, 3, 4, 4, 5, 5]);
				} else if (slave.height <= 132) {
					slave.height += 2;
				}
			} else if (slave.physicalAge === 13) {
				if (slave.height <= 132) {
					slave.height += jsEither([1, 1, 2, 2, 3, 3]);
				} else if (slave.height <= 135) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 14) {
				if (slave.height <= 135) {
					slave.height += jsEither([1, 1, 2, 2, 3, 3]);
				} else if (slave.height <= 138) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 15) {
				if (slave.height <= 138) {
					slave.height += jsEither([1, 1, 2, 2, 3, 3]);
				} else if (slave.height <= 141) {
					slave.height += 1;
				}
			} else if (slave.physicalAge === 16) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 17) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1, 2, 2]);
				}
			} else if (slave.physicalAge === 18) {
				if (slave.height <= 143) {
					slave.height += jsEither([0, 0, 1, 1, 2, 2]);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseHeightGiant(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge < 16) {
				if (slave.height <= 270) {
					slave.height += jsRandom(5, 12);
				}
			} else {
				if (slave.height <= 270) {
					slave.height += jsRandom(3, 7);
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge < 16) {
				if (slave.height <= 270) {
					slave.height += jsRandom(7, 15);
				}
			} else {
				if (slave.height <= 270) {
					slave.height += jsRandom(5, 7);
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge < 16) {
				if (slave.height <= 270) {
					slave.height += jsRandom(10, 25);
				}
			} else {
				if (slave.height <= 270) {
					slave.height += jsRandom(7, 13);
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge < 16) {
				if (slave.height <= 270) {
					slave.height += jsRandom(7, 22);
				}
			} else {
				if (slave.height <= 270) {
					slave.height += jsRandom(7, 12);
				}
			}
		} else {
			if (slave.physicalAge < 16) {
				if (slave.height <= 270) {
					slave.height += jsRandom(7, 20);
				}
			} else {
				if (slave.height <= 270) {
					slave.height += jsRandom(5, 10);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseBoobsXX(slave) {
		if (slave.geneticQuirks.gigantomastia === 2 && slave.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 3;
		} else if (slave.geneticQuirks.gigantomastia === 2) {
			gigantomastiaMod = 2;
		} else if (slave.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 1.5;
		} else if (slave.geneticQuirks.gigantomastia === 3) {
			gigantomastiaMod = 1.2;
		} else if (slave.geneticQuirks.macromastia === 3) {
			gigantomastiaMod = 1.1;
		} else {
			gigantomastiaMod = 1;
		}
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 8) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 9) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 10) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 11) {
				if (slave.boobs < (600 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 12) {
				if (slave.boobs < (700 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 13) {
				if (slave.boobs < (1000 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 14) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 15) {
				if (slave.boobs < (900 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 16) {
				if (slave.boobs < (1200 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 17) {
				if (slave.boobs < (1600 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 18) {
				if (slave.boobs < (2000 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 8) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 9) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 10) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 11) {
				if (slave.boobs < (500 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 12) {
				if (slave.boobs < (600 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 13) {
				if (slave.boobs < (900 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 14) {
				if (slave.boobs < (700 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 15) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 16) {
				if (slave.boobs < (1000 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 17) {
				if (slave.boobs < (1200 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 18) {
				if (slave.boobs < (1600 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge >= 11) {
				if (slave.boobs > 200 && gigantomastiaMod !== 3) {
					slave.boobs -= 100;
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge >= 11) {
				if (slave.boobs > 200 && gigantomastiaMod !== 3) {
					slave.boobs -= 50;
				}
			}
		} else {
			if (slave.physicalAge === 11) {
				if (slave.boobs < (300 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.boobs < (300 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.boobs < (400 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.boobs < (500 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.boobs < (500 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (50 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (60 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (70 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseBoobsXY(slave) {
		if (slave.geneticQuirks.gigantomastia === 2 && slave.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 3;
		} else if (slave.geneticQuirks.gigantomastia === 2) {
			gigantomastiaMod = 2;
		} else if (slave.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 1.5;
		} else if (slave.geneticQuirks.gigantomastia === 3) {
			gigantomastiaMod = 1.2;
		} else if (slave.geneticQuirks.macromastia === 3) {
			gigantomastiaMod = 1.1;
		} else {
			gigantomastiaMod = 1;
		}
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 8) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 9) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 10) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 11) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 12) {
				slave.boobs += 50;
			} else if (slave.physicalAge === 13) {
				if (slave.boobs < (1000 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 14) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 15) {
				if (slave.boobs < (900 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 16) {
				if (slave.boobs < (1200 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 17) {
				if (slave.boobs < (1600 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			} else if (slave.physicalAge === 18) {
				if (slave.boobs < (2000 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 100;
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 8) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 9) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 10) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 11) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 12) {
				slave.boobs += 25;
			} else if (slave.physicalAge === 13) {
				if (slave.boobs < (900 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 25;
			} else if (slave.physicalAge === 14) {
				if (slave.boobs < (700 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 15) {
				if (slave.boobs < (800 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 16) {
				if (slave.boobs < (1000 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 17) {
				if (slave.boobs < (1200 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			} else if (slave.physicalAge === 18) {
				if (slave.boobs < (1600 * gigantomastiaMod)) {
					if (jsRandom(1, 100) > (40 / gigantomastiaMod)) {
						slave.boobs += 100;
					}
				}
				slave.boobs += 50;
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge >= 11) {
				if (slave.boobs > 200 && gigantomastiaMod !== 3) {
					slave.boobs -= 100;
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge >= 11) {
				if (slave.boobs > 200 && gigantomastiaMod !== 3) {
					slave.boobs -= 50;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseHipsXX(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 99) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			}
		} else {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 60) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 60) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 60) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 60) {
						slave.hips++;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseHipsXY(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 90) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.hips++;
					}
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 8) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.hips++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 99) {
						slave.hips++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 95) {
						slave.hips++;
					}
				}
			}
		} else {
			if (slave.physicalAge === 14) {
				if (slave.hips < 2) {
					if (jsRandom(1, 100) > 60) {
						slave.hips++;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseButtXX(slave) {
		rearQuirk = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
		rearQuirkDivider = rearQuirk === 0 ? 1 : rearQuirk;

		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (20 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (20 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (20 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (40 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (40 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (40 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (95 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (95 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (95 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (60 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (60 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (60 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (60 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseButtXY(slave) {
		rearQuirk = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
		rearQuirkDivider = rearQuirk === 0 ? 1 : rearQuirk;
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (20 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (20 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (20 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (40 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.butt < (4 + rearQuirk)) {
					if (jsRandom(1, 100) > (40 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (90 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 8) {
				if (slave.butt < (3 + rearQuirk)) {
					if (jsRandom(1, 100) > (80 / rearQuirkDivider)) {
						slave.butt++;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseDick(slave) {
		dickMod = (slave.geneticQuirks.wellHung === 2 ? 2 : 1);

		if (slave.hormoneBalance >= 200) {
			//
		} else if (slave.hormoneBalance >= 100) {
			//
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.dick < 6 && dickMod === 2) {
					if (jsRandom(1, 100) > 70) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (50 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (20 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (20 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 8) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.dick < 6 && dickMod === 2) {
					if (jsRandom(1, 100) > 70) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (70 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (40 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (40 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (90 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			}
		} else {
			if (slave.physicalAge === 9) {
				if (slave.dick < 6 && dickMod === 2) {
					if (jsRandom(1, 100) > 70) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.dick < 6 && dickMod === 2) {
					if (jsRandom(1, 100) > 70) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.dick < 6 && dickMod === 2) {
					if (jsRandom(1, 100) > 70) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.dick < 6 && dickMod === 2) {
					if (jsRandom(1, 100) > 70) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (50 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (50 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.dick < 6) {
					if (jsRandom(1, 100) > (50 / dickMod)) {
						slave.dick++;
						if (slave.foreskin > 0) {
							slave.foreskin++;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseBalls(slave) {
		if (slave.hormoneBalance >= 200) {
			//
		} else if (slave.hormoneBalance >= 100) {
			//
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 10) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 50) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 20) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 20) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 8) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 30) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 90) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 90) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 90) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 70) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 40) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 40) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 90) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 90) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 90) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			}
		} else {
			if (slave.physicalAge === 8) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 50) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 50) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 50) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.balls < 6) {
					if (jsRandom(1, 100) > 50) {
						slave.balls++;
						if (slave.scrotum > 0) {
							slave.scrotum++;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseClit(slave) {
		if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.clit < 4) {
					if (jsRandom(1, 100) > 50) {
						slave.clit++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge === 8) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 90) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 9) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 90) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 10) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 90) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 11) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 12) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 13) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 14) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 15) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 16) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 17) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			} else if (slave.physicalAge === 18) {
				if (slave.clit > 0 && slave.clit < 4) {
					if (jsRandom(1, 100) > 70) {
						slave.clit++;
					}
				}
			}
		}
		if (slave.physicalAge >= 11 && slave.geneticQuirks.wellHung === 2 && slave.clit < 5 && jsRandom(1, 100) > 60) {
			slave.clit++;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseWetness(slave) {
		if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge === 8 || slave.physicalAge === 9) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 90) {
						slave.vaginaLube++;
					}
				}
			} else if (slave.physicalAge <= 12) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 60) {
						slave.vaginaLube++;
					}
				} else if (slave.vaginaLube < 2) {
					if (jsRandom(1, 100) > 80) {
						slave.vaginaLube++;
					}
				}
			} else if (slave.physicalAge <= 15) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 30) {
						slave.vaginaLube++;
					}
				} else if (slave.vaginaLube < 2) {
					if (jsRandom(1, 100) > 50) {
						slave.vaginaLube++;
					}
				}
			} else if (slave.physicalAge <= 18) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 10) {
						slave.vaginaLube++;
					}
				} else if (slave.vaginaLube < 2) {
					if (jsRandom(1, 100) > 20) {
						slave.vaginaLube++;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge > 9 && slave.physicalAge <= 12) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 70) {
						slave.vaginaLube++;
					}
				}
			} else if (slave.physicalAge <= 15) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 40) {
						slave.vaginaLube++;
					}
				} else if (slave.vaginaLube < 2) {
					if (jsRandom(1, 100) > 70) {
						slave.vaginaLube++;
					}
				}
			} else if (slave.physicalAge <= 18) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 20) {
						slave.vaginaLube++;
					}
				} else if (slave.vaginaLube < 2) {
					if (jsRandom(1, 100) > 40) {
						slave.vaginaLube++;
					}
				}
			}
		} else if (slave.hormoneBalance <= 20) {
			if (slave.physicalAge > 15 && slave.physicalAge <= 18) {
				if (slave.vaginaLube < 1) {
					if (jsRandom(1, 100) > 50) {
						slave.vaginaLube++;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseWaistXX(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge >= 12) {
				if (slave.waist > -60) {
					if (jsRandom(1, 100) > 20) {
						slave.waist -= 5;
					}
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge >= 12) {
				if (slave.waist > -30) {
					if (jsRandom(1, 100) > 20) {
						slave.waist -= 5;
					}
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge >= 12) {
				if (slave.waist < 60) {
					if (jsRandom(1, 100) > 20) {
						slave.waist += 5;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge >= 12) {
				if (slave.waist < 30) {
					if (jsRandom(1, 100) > 20) {
						slave.waist += 5;
					}
				}
			}
		} else {
			if (slave.physicalAge >= 12) {
				if (slave.waist > -20) {
					if (jsRandom(1, 100) > 60) {
						slave.waist -= 5;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseWaistXY(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.physicalAge >= 12) {
				if (slave.waist > -30) {
					if (jsRandom(1, 100) > 20) {
						slave.waist -= 5;
					}
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.physicalAge >= 12) {
				if (slave.waist > -15) {
					if (jsRandom(1, 100) > 20) {
						slave.waist -= 5;
					}
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.physicalAge >= 12) {
				if (slave.waist < 90) {
					if (jsRandom(1, 100) > 20) {
						slave.waist += 5;
					}
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.physicalAge >= 12) {
				if (slave.waist < 60) {
					if (jsRandom(1, 100) > 20) {
						slave.waist += 5;
					}
				}
			}
		} else {
			if (slave.physicalAge >= 12) {
				if (slave.waist < 20) {
					if (jsRandom(1, 100) > 60) {
						slave.waist += 5;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseFaceXX(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.face > 60) {
				if (jsRandom(1, 100) > 80) {
					slave.face += 5;
				}
			} else if (slave.face <= 60) {
				if (jsRandom(1, 100) > 30) {
					slave.face += 10;
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.face > 60) {
				if (jsRandom(1, 100) > 80) {
					slave.face += 5;
				}
			} else if (slave.face <= 60) {
				if (jsRandom(1, 100) > 30) {
					slave.face += 10;
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.face < 100) {
				if (jsRandom(1, 100) > 50) {
					slave.face -= 20;
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.face < 100) {
				if (jsRandom(1, 100) > 70) {
					slave.face -= 20;
				}
			}
		} else {
			if (slave.face > 60) {
				if (jsRandom(1, 100) > 90) {
					slave.face += 5;
				}
			} else if (slave.face <= 60) {
				if (jsRandom(1, 100) > 40) {
					slave.face += 10;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseFaceXY(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.face > 60) {
				if (jsRandom(1, 100) > 80) {
					slave.face += 5;
				}
			} else if (slave.face <= 60) {
				if (jsRandom(1, 100) > 50) {
					slave.face += 10;
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.face > 60) {
				if (jsRandom(1, 100) > 80) {
					slave.face += 10;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseVoiceXX(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.voice === 3) {
				if (jsRandom(1, 100) > 90) {
					slave.voice--;
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.voice === 3) {
				if (jsRandom(1, 100) > 80) {
					slave.voice--;
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.voice <= 3) {
				if (jsRandom(1, 100) > 30) {
					slave.voice--;
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.voice <= 3) {
				if (jsRandom(1, 100) > 60) {
					slave.voice--;
				}
			}
		} else {
			if (slave.voice === 3) {
				if (jsRandom(1, 100) > 60) {
					slave.voice--;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increaseVoiceXY(slave) {
		if (slave.hormoneBalance >= 200) {
			if (slave.voice < 2) {
				if (jsRandom(1, 100) > 50) {
					slave.voice--;
				}
			}
		} else if (slave.hormoneBalance >= 100) {
			if (slave.voice < 3) {
				if (jsRandom(1, 100) > 50) {
					slave.voice--;
				}
			}
		} else if (slave.hormoneBalance <= -200) {
			if (slave.voice > 1) {
				if (jsRandom(1, 100) > 10) {
					slave.voice--;
				}
			}
		} else if (slave.hormoneBalance <= -100) {
			if (slave.voice > 1) {
				if (jsRandom(1, 100) > 30) {
					slave.voice--;
				}
			}
		} else {
			if (slave.voice > 1) {
				if (jsRandom(1, 100) > 60) {
					slave.voice--;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increasePregAdaptationXX(slave) {
		if (slave.physicalAge === 3) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation = 5;
			}
		} else if (slave.physicalAge === 4) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 5) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 6) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 7) {
			if (slave.pregAdaptation < 6) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 8) {
			if (slave.pregAdaptation < 7) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 9) {
			if (slave.pregAdaptation < 8) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 10) {
			if (slave.pregAdaptation < 9) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 11) {
			if (slave.pregAdaptation < 10) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 12) {
			if (slave.pregAdaptation < 14) {
				slave.pregAdaptation += 4;
			}
		} else if (slave.physicalAge === 13) {
			if (slave.pregAdaptation < 18) {
				slave.pregAdaptation += 4;
			}
		} else if (slave.physicalAge === 14) {
			if (slave.pregAdaptation < 22) {
				slave.pregAdaptation += 4;
			}
		} else if (slave.physicalAge === 15) {
			if (slave.pregAdaptation < 28) {
				slave.pregAdaptation += 6;
			}
		} else if (slave.physicalAge === 16) {
			if (slave.pregAdaptation < 34) {
				slave.pregAdaptation += 6;
			}
		} else if (slave.physicalAge === 17) {
			if (slave.pregAdaptation < 42) {
				slave.pregAdaptation += 8;
			}
		} else if (slave.physicalAge === 18) {
			if (slave.pregAdaptation < 50) {
				slave.pregAdaptation += 8;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function increasePregAdaptationXY(slave) {
		if (slave.physicalAge === 3) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation = 5;
			}
		} else if (slave.physicalAge === 4) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 5) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 6) {
			if (slave.pregAdaptation < 5) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 7) {
			if (slave.pregAdaptation < 6) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 8) {
			if (slave.pregAdaptation < 7) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 9) {
			if (slave.pregAdaptation < 8) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 10) {
			if (slave.pregAdaptation < 9) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 11) {
			if (slave.pregAdaptation < 10) {
				slave.pregAdaptation++;
			}
		} else if (slave.physicalAge === 12) {
			if (slave.pregAdaptation < 12) {
				slave.pregAdaptation += 2;
			}
		} else if (slave.physicalAge === 13) {
			if (slave.pregAdaptation < 14) {
				slave.pregAdaptation += 2;
			}
		} else if (slave.physicalAge === 14) {
			if (slave.pregAdaptation < 16) {
				slave.pregAdaptation += 2;
			}
		} else if (slave.physicalAge === 15) {
			if (slave.pregAdaptation < 18) {
				slave.pregAdaptation += 2;
			}
		} else if (slave.physicalAge === 16) {
			if (slave.pregAdaptation < 20) {
				slave.pregAdaptation += 2;
			}
		} else if (slave.physicalAge === 17) {
			if (slave.pregAdaptation < 20) {
				slave.pregAdaptation += 2;
			}
		} else if (slave.physicalAge === 18) {
			if (slave.pregAdaptation < 20) {
				slave.pregAdaptation += 2;
			}
		}
	}
})();
