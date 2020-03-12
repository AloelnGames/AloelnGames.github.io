/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Relevant slave tattoo, if present
 */
App.Desc.piercing = function(slave, surface) {
	"use strict";
	let r = ``;
	/* eslint-disable no-unused-vars*/
	const {
		he, him, his, hers, himself, boy, He, His
	} = getPronouns(slave);
	/* eslint-enable */
	if (V.showBodyMods !== 1) {
		return;
	}
	switch (surface) {
		case "ear": {
			r += `<<earPiercingDescription>>`;
			break;
		}
		case "nose": {
			r += `<<nosePiercingDescription>>`;
			break;
		}
		case "eyebrow": {
			r += `<<eyebrowPiercingDescription>>`;
			break;
		}
		case "lips": {
			r += `<<lipsPiercingDescription>>`;
			break;
		}
		case "tongue": {
			r += `<<tonguePiercingDescription>>`;
			break;
		}
		case "nipple": {
			r += `<<nipplesPiercingDescription>>`;
			break;
		}
		case "areolae": {
			r += `<<areolaePiercingDescription>>`;
			break;
		}
		case "navel": {
			r += `<<navelPiercingDescription>>`;
			break;
		}
		case "clit": {
			r += `<<clitPiercingDescription>>`;
			break;
		}
		case "vagina": {
			r += `<<vaginaPiercingDescription>>`;
			break;
		}
		case "dick": {
			r += `<<dickPiercingDescription>>`;
			break;
		}
		case "anus": {
			r += `<<anusPiercingDescription>>`;
			break;
		}
		case "corset": { // non anatomical
			r += `<<CorsetPiercingDescription>>`;
			break;
		}
		case "chastity": { // non anatomical
			r += `<<chastityPiercingDescription>>`;
			break;
		}
	}
	return r;
};
