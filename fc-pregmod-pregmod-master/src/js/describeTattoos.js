/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Relevant slave tattoo, if present
 */
App.Desc.tattoo = function(slave, surface) {
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
		case "shoulder": {
			r += `<<shouldersTatDescription>>`;
			break;
		}
		case "lips": {
			r += `<<lipsTatDescription>>`;
			break;
		}
		case "breast": {
			r += `<<boobsTatDescription>>`;
			break;
		}
		case "upper arm": { /* technically the old widget describes the ENTIRE arm, but we are going to display it here to preserve order */
			r += `<<armsTatDescription>>`;
			break;
		}
		case "back": {
			r += `<<backTatDescription>>`;
			break;
		}
		case "lower back": {
			r += `<<stampTatDescription>>`;
			break;
		}
		case "buttock": {
			r += `<<buttTatDescription>>`;
			break;
		}
		case "vagina": {
			r += `<<vaginaTatDescription>>`;
			break;
		}
		case "dick": {
			r += `<<dickTatDescription>>`;
			break;
		}
		case "anus": {
			r += `<<anusTatDescription>>`;
			break;
		}
		case "thigh": { /* technically the old widget describes the ENTIRE leg, but we are going to display it here to preserve order */
			r += `<<legsTatDescription>>`;
			break;
		}
	}
	return r;
};
