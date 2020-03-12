/* eslint-disable camelcase */
window.RevampedVectorArt = function(slave) {
	return App.Art.elementToMarkup(App.Art.revampedVectorArtElement(slave));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Art.revampedVectorArtElement = function(slave) {
	/**
	 * @param {string} id
	 * @returns {HTMLElement}
	 */
	function useSvg(id) {
		const cache = App.Data.Art.VectorRevamp;
		/** @type {HTMLElement} */
		const res = cache.nodes.children.item(cache.dict.get(id)).children.item(0).cloneNode(true);
		res.setAttribute("class", T.art_display_class);
		let transformNodes = res.querySelectorAll('g[data-transform]');
		for (const node of transformNodes) {
			switch (node.getAttribute("data-transform")) {
				case "boob_left":
					node.setAttribute("transform", T.revampedVectorArtControl.boobLeftArtTransform);
					break;
				case "boob_right":
					node.setAttribute("transform", T.revampedVectorArtControl.boobRightArtTransform);
					break;
				case "boob_outfit":
					node.setAttribute("transform", T.revampedVectorArtControl.boobOutfitArtTransform);
					break;
				case "pussy_tattoo_text":
					node.textContent = T.revampedVectorArtControl.pubicTattooText;
					break;
				// seem to be no default art transform?
			}
		}

		return res;
	}
	const T = State.temporary;

	if (T.art_display_id > 0) {
		T.art_display_id++;
	} else {
		T.art_display_id = 1;
	}
	T.art_display_class = `ad${T.art_display_id}`;

	/* Using JS from vectorRevampedArtControl.tw*/
	T.revampedVectorArtControl = getVectorArtRevampedControl(T.art_display_class, slave, V.seeVectorArtHighlights, V.showBodyMods);

	const res = document.createDocumentFragment();
	const style = document.createElement("style");
	style.innerHTML = T.revampedVectorArtControl.StylesCss;
	res.appendChild(style);

	T.revampedArtLayers = T.revampedVectorArtControl.Layers;
	T.art_transform = T.revampedVectorArtControl.artTransform;
	T.boob_right_art_transform = T.revampedVectorArtControl.boobRightArtTransform;
	T.boob_left_art_transform = T.revampedVectorArtControl.boobLeftArtTransform;
	T.boob_outfit_art_transform = T.revampedVectorArtControl.boobOutfitArtTransform;
	T.art_pussy_tattoo_text = T.revampedVectorArtControl.pubicTattooText;

	T.revampedArtLayers.forEach(function(s) { res.appendChild(useSvg(s)); });

	return res;
};

window.getVectorArtRevampedControl = function(artDisplayClass, artSlave, globalShowHighlights, globalShowBodyMods) {
	return new RevampedArtControl(artDisplayClass, artSlave, globalShowHighlights, globalShowBodyMods);
};

class ArtStyleEntry {
	constructor(name) {
		this.name = name;
	}

	toString() {
		let keys = Object.keys(this);
		let styleArray = [];
		if (keys !== null && keys !== undefined) {
			let styleObj = this;
			keys.forEach(function(key) {
				if (key !== "name") {
					let value = styleObj[key];
					styleArray.push(`${key}:${value}`);
				}
			});

			let styleValue = `${styleArray.join(";")};`;

			let cssDef = `{ ${styleValue} }`; // not sure if there should be padding here

			if (this.name.length > 0) { cssDef = `.${this.name}${cssDef}`; }

			return cssDef;
		}

		return "";
	}
}

class ArtStyleControl {
	constructor(artDisplayClass, artSlave) {
		this.artDisplayClass = artDisplayClass;
		this.artSlave = artSlave;
		this.styles = [];

		this.initDefaultValues();
		this.applyMakeup();
		this.applyCalcMuscleTone();
		this.applyEyeLensStyle();
	}

	applyMakeup() {
		let lipsColor = this.lips.fill;
		let lipsOpacity = this.lips["fill-opacity"];

		switch (this.artSlave.makeup) {
			case 1:
				// Nice
				lipsColor = "#ff69b4";
				lipsOpacity = 0.5;
				break;
			case 2:
				// Gorgeous
				lipsColor = "#8b008b";
				lipsOpacity = 0.7;
				break;
			case 3:
				// Hair coordinated
				lipsColor = this.hair.fill;
				lipsOpacity = 0.3;
				break;
			case 4:
				// Slutty
				lipsColor = "#ff0000";
				lipsOpacity = 1;
				break;
			case 5:
				// Neon
				lipsColor = "#DC143C";
				lipsOpacity = 1;
				break;
			case 6:
				// Neon hair coordinated
				lipsColor = this.hair.fill;
				lipsOpacity = 1;
				break;
			case 7:
				// Metallic
				lipsColor = "#b22222";
				lipsOpacity = 0.7;
				break;
			case 8:
				// Metallic hair coordinated
				lipsColor = this.hair.fill;
				lipsOpacity = 0.7;
				break;
			default:
		}

		this.lips.fill = lipsColor;
		this.lips["fill-opacity"] = lipsOpacity;
	}

	applyCalcMuscleTone() {
		let musclesValue = this.artSlave.muscles + 101;
		let musclesVisibility = 0.910239 * Math.log(0.02 * musclesValue);

		this.muscleTone["fill-opacity"] = musclesVisibility;
	}

	applyEyeLensStyle() {
		if (!hasAnyEyes(this.artSlave)) {
			return;
		}

		let eyeLens = hasLeftEye(this.artSlave) ? getLeftEyePupil(this.artSlave) : getRightEyePupil(this.artSlave);

		switch (eyeLens) {
			case "demonic":
				this.eyeball.fill = this.iris.fill;
				break;
			case "devilish":
				this.eyeball.fill = "#010101";
		}
	}

	/* currently unused, keeping for color reference - */
	parseSkinColorFromName(colorName) {
		// eslint-disable-next-line eqeqeq
		if (colorName == null) {
			return "#000000";
		}

		let skinPalette = [
			["light", "#feebe5"],
			["white", "#feebe5"],
			["fair", "#feebe5"],
			["lightened", "#feebe5"],
			["extremely pale", "#fff8f8"],
			["pale", "#f9ebf0"],
			["tanned", "#e8b693"],
			["natural", "#e8b693"],
			["olive", "#a46237"],
			["light olive", "#d4c6bb"],
			["dark", "#a46237"],
			["brown", "#845c44"],
			["dark brown", "#845c44"],
			["black", "#463a3a"],
			["camouflage patterned", "#78875a"],
			["dyed red", "#bc4949"],
			["dyed green", "#A6C373"],
			["dyed blue", "#5b8eb7"],
			["dyed pink", "#fe62b0"],
			["dyed gray", "#bdbdbd"],
			["tiger striped", "#e2d75d"]
		];

		let skinPaletteMap = new Map(skinPalette);
		colorName = colorName.toLowerCase();
		let colorValue = skinPaletteMap.get(colorName);
		if (!colorValue) {
			return this.parseColorFromName(colorName);
		}

		return colorValue;
	}
	/* - currently unused, keeping for color reference*/

	initDefaultValues() {
		let colorSlave = skinColorCatcher(this.artSlave);

		this.white = new ArtStyleEntry("white");
		this.white.fill = "#FFFFFF";

		this.skin = new ArtStyleEntry("skin");
		this.skin.fill = colorSlave.skinColor;

		this.arm = new ArtStyleEntry("arm.skin");
		this.arm.fill = this.skin.fill;

		this.head = new ArtStyleEntry("head");
		this.head.fill = this.skin.fill;

		this.torso = new ArtStyleEntry("torso");
		this.torso.fill = this.skin.fill;

		this.boob = new ArtStyleEntry("boob");
		this.boob.fill = this.skin.fill;

		this.penis = new ArtStyleEntry("penis");
		this.penis.fill = this.skin.fill;

		this.scrotum = new ArtStyleEntry("scrotum");
		this.scrotum.fill = this.skin.fill;

		this.areola = new ArtStyleEntry("areola");
		this.areola.fill = colorSlave.areolaColor;

		this.labia = new ArtStyleEntry("labia");
		this.labia.fill = colorSlave.labiaColor;

		this.hair = new ArtStyleEntry("hair");
		this.hair.fill = extractColor(this.artSlave.hColor);

		this.shoe = new ArtStyleEntry("shoe");
		this.shoe.fill = "#3E65B0";

		this.smartPiercing = new ArtStyleEntry("smart_piercing");
		this.smartPiercing.fill = "#4DB748";

		this.steelPiercing = new ArtStyleEntry("steel_piercing");
		this.steelPiercing.fill = "#c0c6c7";

		this.steelChastity = new ArtStyleEntry("steel_chastity");
		this.steelChastity.fill = "#c0c6c7";

		this.labiaSkin = new ArtStyleEntry("labia.skin");
		this.labiaSkin.fill = this.skin.fill;

		this.outfitBase = new ArtStyleEntry("outfit_base");
		this.outfitBase.fill = "#515351";

		this.shadow = new ArtStyleEntry("shadow");
		this.shadow.fill = "#010101";

		this.muscleTone = new ArtStyleEntry("muscle_tone");
		this.muscleTone.fill = "#010101";
		this.muscleTone["fill-opacity"] = 1;

		this.glasses = new ArtStyleEntry("glasses");
		this.glasses.fill = "#010101";

		this.lips = new ArtStyleEntry("lips");
		this.lips.fill = colorSlave.lipsColor;
		this.lips["fill-opacity"] = 0.6;

		this.eyeball = new ArtStyleEntry("eyeball");
		this.eyeball.fill = "#dfdfdf";

		this.iris = new ArtStyleEntry("iris");
		if (hasAnyEyes(this.artSlave)) {
			this.iris.fill = extractColor(hasLeftEye(this.artSlave) ? getLeftEyeColor(this.artSlave) : getRightEyeColor(this.artSlave), 1);
		} else {
			this.iris.fill = extractColor("brown", 1);
		}

		this.highlight1 = new ArtStyleEntry("highlight1");
		this.highlight1.fill = "#ffffff";
		this.highlight1["fill-opacity"] = 0.9;
		this.highlight1["mix-blend-mode"] = "soft-light";

		this.highlight2 = new ArtStyleEntry("highlight2");
		this.highlight2.fill = "#ffffff";
		this.highlight2["fill-opacity"] = 0.9;
		this.highlight2["mix-blend-mode"] = "soft-light";

		this.highlightStrong = new ArtStyleEntry("highlightStrong");
		this.highlightStrong.fill = "#ffffff";

		this.armpitHair = new ArtStyleEntry("armpit_hair");
		this.armpitHair.fill = extractColor(this.artSlave.underArmHColor);

		this.pubicHair = new ArtStyleEntry("pubic_hair");
		this.pubicHair.fill = extractColor(this.artSlave.pubicHColor);

		this.bellyDetails = new ArtStyleEntry("belly_details");
		this.bellyDetails["fill-opacity"] = 1;

		this.bellySkin = new ArtStyleEntry("belly.skin");
		this.bellySkin.fill = this.skin.fill;

		this.bellyUpperSkin = new ArtStyleEntry("belly_upper.skin");
		this.bellyUpperSkin.fill = this.skin.fill;

		this.neckSkin = new ArtStyleEntry("neck.skin");
		this.neckSkin.fill = this.skin.fill;

		this.legsSkin = new ArtStyleEntry("legs.skin");
		this.legsSkin.fill = this.skin.fill;

		this.buttSkin = new ArtStyleEntry("butt.skin");
		this.buttSkin.fill = this.skin.fill;

		this.feetSkin = new ArtStyleEntry("feet.skin");
		this.feetSkin.fill = this.skin.fill;

		this.shadowBoobInnerLowerShadow = new ArtStyleEntry("shadow.boob_inner_lower_shadow");
		this.shadowBoobInnerLowerShadow["fill-opacity"] = 1;

		this.shadowBoobInnerUpperShadow = new ArtStyleEntry("shadow.boob_inner_upper_shadow");
		this.shadowBoobInnerUpperShadow["fill-opacity"] = 1;

		this.gag = new ArtStyleEntry("gag");
		this.gag.fill = "#bf2126";
	}

	get StylesCss() {
		let mainStyle = new ArtStyleEntry("");
		mainStyle.position = "absolute";
		mainStyle.height = "100%";
		mainStyle["margin-left"] = "auto";
		mainStyle["margin-right"] = "auto";
		mainStyle.left = "0";
		mainStyle.right = "0";

		this.styles.push(this.white);
		this.styles.push(this.arm);
		this.styles.push(this.skin);
		this.styles.push(this.head);
		this.styles.push(this.torso);
		this.styles.push(this.boob);
		this.styles.push(this.penis);
		this.styles.push(this.scrotum);
		this.styles.push(this.areola);
		this.styles.push(this.labia);
		this.styles.push(this.hair);
		this.styles.push(this.shoe);
		this.styles.push(this.smartPiercing);
		this.styles.push(this.steelPiercing);
		this.styles.push(this.steelChastity);
		this.styles.push(this.labiaSkin);
		this.styles.push(this.outfitBase);
		this.styles.push(this.shadow);
		this.styles.push(this.muscleTone);
		this.styles.push(this.glasses);
		this.styles.push(this.lips);
		this.styles.push(this.eyeball);
		this.styles.push(this.iris);
		this.styles.push(this.highlight1);
		this.styles.push(this.highlight2);
		this.styles.push(this.highlightStrong);
		this.styles.push(this.armpitHair);
		this.styles.push(this.pubicHair);
		this.styles.push(this.bellyDetails);
		this.styles.push(this.bellySkin);
		this.styles.push(this.bellyUpperSkin);
		this.styles.push(this.neckSkin);
		this.styles.push(this.legsSkin);
		this.styles.push(this.buttSkin);
		this.styles.push(this.feetSkin);
		this.styles.push(this.shadowBoobInnerLowerShadow);
		this.styles.push(this.shadowBoobInnerUpperShadow);
		this.styles.push(this.gag);
		let stylesValues = [];

		let artDisplayClass = this.artDisplayClass;

		stylesValues.push(`.${artDisplayClass} ${mainStyle.toString()}`);
		this.styles.forEach(function(style) {
			stylesValues.push(`.${artDisplayClass} ${style.toString()}`);
		});

		return stylesValues.join(" ");
	}
}

class ClothingControl {
	get fuckdoll() {
		let defaultOutfitColor = "#515351";
		let areolaColor = "#383838";
		return {
			bodySettings: {
				showEyes: false,
				showPubic: false,
				showArmHair: false,
				showHair: false,
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				arm: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},
				head: {fill: defaultOutfitColor},
				neckSkin: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: areolaColor},
				labia: {fill: areolaColor},
				bellySkin: {fill: defaultOutfitColor},
				bellyUpperSkin: {fill: defaultOutfitColor},
				shoe: {fill: defaultOutfitColor},
				labiaSkin: {fill: defaultOutfitColor},
				lips: {fill: areolaColor}
			}
		};
	}

	get niceMaid() {
		return {
			bodySettings: {
				showPubic: false,
				showBoobs: false,
				showNipples: false,
				showPenis: false,
				showBalls: false,
				showBellyPiercings: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				bellySkin: {fill: "#FFFFFF"},
				bellyUpperSkin: {fill: "#FFFFFF"},
				bellyDetails: {"fill-opacity": 0}
			}
		};
	}

	get sluttyMaid() {
		return {
			bodySettings: {
				showBellyPiercings: false
			},
			styleSettings: {
				bellySkin: {fill: "#FFFFFF"},
				bellyDetails: {"fill-opacity": 0}
			}
		};
	}

	get restrictiveLatex() {
		let defaultOutfitColor = "#515351";
		let areolaColor = "#383838";	// FIXME: unused variable
		return {
			bodySettings: {
				showEyes: false,
				showPubic: false,
				showArmHair: false,
				showHair: false,
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true,
				showHeadPiercings: false,
				showBellyPiercings: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				arm: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},
				head: {fill: defaultOutfitColor},
				neckSkin: {fill: defaultOutfitColor},
				bellySkin: {fill: defaultOutfitColor},
				bellyUpperSkin: {fill: defaultOutfitColor},
				shoe: {fill: defaultOutfitColor}
			}
		};
	}

	get latexCatsuit() {
		let defaultOutfitColor = "#515351";
		let areolaColor = "#383838";
		return {
			bodySettings: {
				showPubic: false,
				showArmHair: false,
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showBellyPiercings: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				scrotum: {fill: defaultOutfitColor},
				arm: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},

				neckSkin: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: areolaColor},
				labia: {fill: areolaColor},
				bellySkin: {fill: defaultOutfitColor},
				bellyUpperSkin: {fill: defaultOutfitColor},
				shoe: {fill: defaultOutfitColor},
				labiaSkin: {fill: defaultOutfitColor}
			}
		};
	}

	get bodyOil() {
		return {
			bodySettings: {
				showLegHighlight: true,
				showTorsoHighlight: true,
				showBoobsHighlight: true,
				showHeadHighlight: true,
			},
			styleSettings: {

			}
		};
	}

	get bodysuit() {
		let defaultOutfitColor = "#162d50";
		return {
			bodySettings: {
				showPubic: false,
				showArmHair: false,
				showPussy: false,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showBellyPiercings: false,
				showNipplesPiercings: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				scrotum: {fill: defaultOutfitColor},
				arm: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				legsSkin: {fill: defaultOutfitColor},
				feetSkin: {fill: defaultOutfitColor},
				torso: {fill: defaultOutfitColor},
				buttSkin: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: defaultOutfitColor},
				bellySkin: {fill: defaultOutfitColor},
				bellyUpperSkin: {fill: defaultOutfitColor},
				shoe: {fill: defaultOutfitColor},
				muscleTone: {"fill-opacity": 0},
				bellyDetails: {"fill-opacity": 0}
			}
		};
	}

	get leotard() {
		let defaultOutfitColor = "#d35f8d";
		return {
			bodySettings: {
				showPubic: false,
				showArmHair: false,
				showPussy: false,
				showPussyPiercings: false,
				showPenisPiercings: false,
				showBellyPiercings: false,
				showNipplesPiercings: false,
				showNipples: false
			},
			styleSettings: {
				skin: {fill: defaultOutfitColor},
				scrotum: {fill: defaultOutfitColor},
				penis: {fill: defaultOutfitColor},
				torso: {fill: defaultOutfitColor},
				boob: {fill: defaultOutfitColor},
				areola: {fill: defaultOutfitColor},
				bellySkin: {fill: defaultOutfitColor},
				bellyUpperSkin: {fill: defaultOutfitColor},
				muscleTone: {"fill-opacity": 0},
				bellyDetails: {"fill-opacity": 0}
			}
		};
	}
}

class RevampedArtControl {
	constructor(artDisplayClass, artSlave, globalShowHighlights, globalShowBodyMods) {
		this.artDisplayClass = artDisplayClass;
		this.artSlave = artSlave;
		this.styleControl = new ArtStyleControl(artDisplayClass, artSlave);
		this.clothingControl = new ClothingControl();
		this.artTransform = "";
		this.boobRightArtTransform = "";
		this.boobLeftArtTransform = "";
		this.boobOutfitArtTransform = "";

		this.showArmHair = true;
		this.showHair = true;
		this.showPussy = true;
		this.showPubic = true;
		this.showChastityVaginal = true;
		this.showChastityAnal = true;
		this.showBalls = true;
		this.showPenis = true;
		this.showNipples = true;
		this.showBoobs = true;
		this.showEyes = true;
		this.showMouth = true;

		this.leftArmType = this.getLeftArmPosition;
		this.rightArmType = this.getRightArmPosition;

		this.hairLength = this.getHairLength;
		this.torsoSize = this.getTorsoSize;
		this.bellyLevel = this.getBellyLevel;

		this.showLegHighlight = false;
		this.showTorsoHighlight = false;
		this.showBoobsHighlight = false;
		this.showHeadHighlight = false;

		this.showPussyPiercings = true;
		this.showBellyPiercings = true;
		this.showPenisPiercings = true;
		this.showNipplesPiercings = true;
		this.showHeadPiercings = true;

		this.pubicTattooText = "";

		let clothing = this.getClothing();
		if (clothing !== null) {
			if (clothing.bodySettings !== null) {
				this.applyClothingSettings(clothing.bodySettings);
			}
			if (clothing.styleSettings !== null) {
				this.applyClothingStyleSettings(clothing.styleSettings);
			}
		}

		if (!globalShowHighlights) {
			this.showLegHighlight = false;
			this.showTorsoHighlight = false;
			this.showBoobsHighlight = false;
			this.showHeadHighlight = false;
		}
		if (!globalShowBodyMods) {
			this.showPussyPiercings = false;
			this.showBellyPiercings = false;
			this.showPenisPiercings = false;
			this.showNipplesPiercings = false;
			this.showHeadPiercings = false;
		}
	}

	copyProperties(objTo, objFrom) {
		for (let attr in objFrom) {
			if (objFrom.hasOwnProperty(attr)) { objTo[attr] = objFrom[attr]; }
		}
	}

	applyClothingSettings(clothingSettings) {
		this.copyProperties(this, clothingSettings);
	}

	applyClothingStyleSettings(styleSettings) {
		for (let attr in styleSettings) {
			if (styleSettings.hasOwnProperty(attr)) {
				this.copyProperties(this.styleControl[attr], styleSettings[attr]);
			}
		}
	}

	getClothing() {
		if (this.artSlave.fuckdoll > 0) {
			return this.clothingControl.fuckdoll;
		}
		let clothing = null;
		switch (this.artSlave.clothes) {
			case "a nice maid outfit":
				clothing = this.clothingControl.niceMaid;
				break;
			case "a slutty maid outfit":
				clothing = this.clothingControl.sluttyMaid;
				break;
			case "restrictive latex":
				clothing = this.clothingControl.restrictiveLatex;
				break;
			case "a latex catsuit":
				clothing = this.clothingControl.latexCatsuit;
				break;
			case "body oil":
				clothing = this.clothingControl.bodyOil;
				break;
			case "a comfortable bodysuit":
				clothing = this.clothingControl.bodysuit;
				break;
			case "a leotard":
				/* return this.clothingControl.leotard;*/
				break;
		}
		return clothing;
	}

	get getHairLength() {
		let result = "Short";
		if (this.artSlave.hLength >= 80) {
			result = "Long";
		} else if (this.artSlave.hLength >= 40) {
			result = "Medium";
		} else {
			result = "Short";
		}

		return result;
	}

	get getTorsoSize() {
		let torsoSize = "Normal";

		if (this.artSlave.waist < -40) {
			torsoSize = this.artSlave.weight > 30 ? "Hourglass" : "Unnatural";
		} else if (this.artSlave.waist <= 10) {
			torsoSize = this.artSlave.weight > 30 ? "Normal" : "Hourglass";
		} else {
			torsoSize = "Normal";
		}

		return torsoSize;
	}

	get getLeftArmPosition() {
		let leftArmType = "Low";

		if (this.artSlave.devotion > 50) {
			leftArmType = "High";
		} else if (this.artSlave.trust >= -20) {
			if (this.artSlave.devotion <= 20) {
				leftArmType = "Low";
			} else {
				leftArmType = "Mid";
			}
		} else {
			leftArmType = "Mid";
		}
		if (!hasLeftArm(this.artSlave)) {
			leftArmType= "";
		}

		return leftArmType;
	}

	get getRightArmPosition() {
		let rightArmType = "Low";

		if (this.artSlave.devotion > 50) {
			rightArmType = "High";
		} else if (this.artSlave.trust >= -20) {
			if (this.artSlave.devotion <= 20) {
				rightArmType = "Low";
			} else {
				rightArmType = "High";
			}
		} else {
			rightArmType = "Mid";
		}
		if (!hasRightArm(this.artSlave)) {
			rightArmType= "";
		}

		return rightArmType;
	}

	get getBellyLevel() {
		let bellyLevel = 0;
		if (this.artSlave.belly >= 120000) {
			bellyLevel = 9;
		} else if (this.artSlave.belly >= 90000) {
			bellyLevel = 8;
		} else if (this.artSlave.belly >= 50000) {
			bellyLevel = 7;
		} else if (this.artSlave.belly >= 30000) {
			bellyLevel = 6;
		} else if (this.artSlave.belly >= 15000) {
			bellyLevel = 5;
		} else if (this.artSlave.belly >= 10000) {
			bellyLevel = 4;
		} else if (this.artSlave.belly >= 5000) {
			bellyLevel = 3;
		} else if (this.artSlave.belly >= 1500) {
			bellyLevel = 2;
		} else if (this.artSlave.belly >= 500) {
			bellyLevel = 1;
		} else {
			bellyLevel = 0;
		}

		return bellyLevel;
	}

	get hairBackLayer() {
		let result = [];

		if (!this.showHair) {
			return result;
		}

		if (this.artSlave.hLength === 0) {
			return result;
		}

		switch (this.artSlave.hStyle) {
			case "neat":
				result.push(`Art_Vector_Revamp_Hair_Back_Neat_${this.hairLength}`);
				break;
			case "bun":
			case "up":
				result.push(`Art_Vector_Revamp_Hair_Back_Bun_${this.hairLength}`);
				break;
			case "tails":
				result.push(`Art_Vector_Revamp_Hair_Back_Tails_${this.hairLength}`);
				break;
			case "ponytail":
				result.push(`Art_Vector_Revamp_Hair_Back_Ponytail_${this.hairLength}`);
				break;
			case "braided":
				result.push(`Art_Vector_Revamp_Hair_Back_Braids_${this.hairLength}`);
				break;
			case "curled":
				result.push(`Art_Vector_Revamp_Hair_Back_Curled_${this.hairLength}`);
				break;
			case "cornrows":
				result.push(`Art_Vector_Revamp_Hair_Back_Cornrows_${this.hairLength}`);
				break;
			case "strip":
				result.push(`Art_Vector_Revamp_Hair_Back_Shaved_Sides_${this.hairLength}`);
				break;
			case "luxurious":
				result.push(`Art_Vector_Revamp_Hair_Back_Luxurious_${this.hairLength}`);
				break;
			case "afro":
				result.push(`Art_Vector_Revamp_Hair_Back_Afro_${this.hairLength}`);
				break;
			case "permed":
				result.push(`Art_Vector_Revamp_Hair_Back_Permed_${this.hairLength}`);
				break;
			case "dreadlocks":
				result.push(`Art_Vector_Revamp_Hair_Back_Dreadlocks_${this.hairLength}`);
				break;
			default:
				result.push(`Art_Vector_Revamp_Hair_Back_Messy_${this.hairLength}`);
		}

		return result;
	}

	get armLayer() {
		let result = [];

		let leftArmType = "";	// FIXME: unused variable
		let rightArmType = "";	// FIXME: unused variable

		if (!hasAnyArms(this.artSlave)) {
			result.push("Art_Vector_Revamp_Arm_Stump");
		} else {
			if (hasLeftArm(this.artSlave)) {
				result.push(`Art_Vector_Revamp_Arm_Left_${this.leftArmType}`);
			}
			if (hasRightArm(this.artSlave)) {
				result.push(`Art_Vector_Revamp_Arm_Right_${this.rightArmType}`);
			}
		}

		if (this.showArmHair && (!hasAnyArms(this.artSlave) || (this.leftArmType === "High"))) {
			switch (this.artSlave.underArmHStyle) {
				case "bushy":
					result.push("Art_Vector_Revamp_Arm_Up_Hair_Bushy");
					break;
				case "neat":
					result.push("Art_Vector_Revamp_Arm_Up_Hair_Neat");
					break;
				default:
			}
		}

		return result;
	}

	get buttLayer() {
		let result = [];
		let buttSize = 0;
		if (!hasAnyLegs(this.artSlave)) {
			return result;
		}

		if (this.artSlave.butt > 6) {
			buttSize = 3;
		} else if (this.artSlave.butt > 4) {
			buttSize = 2;
		} else if (this.artSlave.butt > 2) {
			buttSize = 1;
		} else {
			buttSize = 0;
		}

		result.push(`Art_Vector_Revamp_Butt_${buttSize}`);

		return result;
	}

	get legLayer() {
		let result = [];

		if (!hasAnyLegs(this.artSlave)) {
			result.push("Art_Vector_Revamp_Stump");
		} else {
			let legSize = "Normal";

			if (this.artSlave.hips < 0) {
				legSize = this.artSlave.weight > 95 ? "Normal" : "Narrow";
			} else if (this.artSlave.hips === 0) {
				legSize = this.artSlave.weight > 95 ? "Wide" : "Normal";
			} else if (this.artSlave.hips > 0) {
				legSize = "Wide";
			}

			result.push(`Art_Vector_Revamp_Leg_${legSize}`);

			if (this.showLegHighlight) {
				result.push("Art_Vector_Revamp_Leg_Highlights2");
				result.push("Art_Vector_Revamp_Leg_Highlights1");
			}
		}

		return result;
	}

	get feetLayer() {
		let result = [];

		if (!hasAnyLegs(this.artSlave)) {
			return result;
		}

		switch (this.artSlave.shoes) {
			case "heels":
				result.push("Art_Vector_Revamp_Shoes_Heel");
				break;
			case "extreme heels":
				result.push("Art_Vector_Revamp_Shoes_Exterme_Heel");
				break;
			case "boots":
				result.push("Art_Vector_Revamp_Shoes_Boot");
				break;
			case "flats":
				result.push("Art_Vector_Revamp_Shoes_Flat");
				break;
			default:
				result.push("Art_Vector_Revamp_Feet");
		}

		return result;
	}

	get torsoLayer() {
		let result = [];

		result.push(`Art_Vector_Revamp_Torso_${this.torsoSize}`);
		result.push("Art_Vector_Revamp_Clavicle");
		if (this.showTorsoHighlight) {
			result.push("Art_Vector_Revamp_Torso_Highlights2");
			result.push("Art_Vector_Revamp_Torso_Highlights1");
		}

		if (this.showArmHair && this.leftArmType !== "High" && hasAnyArms(this.artSlave)) {
			switch (this.artSlave.underArmHStyle) {
				case "bushy":
					result.push("Art_Vector_Revamp_Arm_Down_Hair_Bushy");
					break;
				case "neat":
					result.push("Art_Vector_Revamp_Arm_Down_Hair_Neat");
					break;
				default:
			}
		}

		return result;
	}

	get pussyLayer() {
		let result = [];

		if (this.showPussy && this.artSlave.vagina >= 0) {
			result.push("Art_Vector_Revamp_Pussy");
		}

		return result;
	}

	get pubicLayer() {
		let result = [];

		if (!this.showPubic) {
			return result;
		}

		if (this.artSlave.physicalAge < 12) {
			return result;
		}

		if (this.artSlave.vaginaTat === "rude words") {
			this.pubicTattooText = this.artSlave.dick !== 0 ? "Useless" : "Fucktoy";
			result.push("Art_Vector_Revamp_Pussy_Tattoo");
		}
		switch (this.artSlave.pubicHStyle) {
			case "strip":
			case "in a strip":
				result.push("Art_Vector_Revamp_Pubic_Hair_Strip");
				break;
			case "bushy":
			case "bushy in the front and neat in the rear":
			case "very bushy":
				result.push("Art_Vector_Revamp_Pubic_Hair_Bush");
				break;
			case "neat":
				result.push("Art_Vector_Revamp_Pubic_Hair_Neat");
				break;
			case "waxed":
				break;
			default:
		}

		return result;
	}

	get pussyPiercingsLayer() {
		let result = [];

		if (!this.showPussyPiercings) {
			return result;
		}

		if (this.artSlave.vaginaPiercing === 1) {
			result.push("Art_Vector_Revamp_Pussy_Piercing");
		} else if (this.artSlave.vaginaPiercing === 2) {
			result.push("Art_Vector_Revamp_Pussy_Piercing_Heavy");
		}

		if (this.artSlave.clitPiercing === 1) {
			result.push("Art_Vector_Revamp_Clit_Piercing");
		} else if (this.artSlave.clitPiercing === 2) {
			result.push("Art_Vector_Revamp_Clit_Piercing_Heavy");
		} else if (this.artSlave.clitPiercing === 3) {
			result.push("Art_Vector_Revamp_Clit_Piercing_Smart");
		}

		return result;
	}

	get chastityBeltLayer() {
		let result = [];

		let isChastityAnalWorn = this.artSlave.chastityAnus === 1;

		isChastityAnalWorn = isChastityAnalWorn && this.showChastityAnal;

		let isChastityVaginalWorn = this.artSlave.chastityVagina === 1;

		isChastityVaginalWorn = isChastityVaginalWorn && this.showChastityVaginal;

		if (isChastityAnalWorn) {
			result.push("Art_Vector_Revamp_Chastity_Anus");
		}

		if (isChastityVaginalWorn) {
			result.push("Art_Vector_Revamp_Chastity_Vagina");
		}

		if (isChastityAnalWorn || isChastityVaginalWorn) {
			result.push("Art_Vector_Revamp_Chastity_Base");
		}

		return result;
	}

	get torsoOutfitLayer() {
		let result = [];

		switch (this.artSlave.clothes) {
			case "uncomfortable straps":
				result.push(`Art_Vector_Revamp_Torso_Outfit_Straps_${this.torsoSize}`);
				break;
			case "a nice maid outfit":
				result.push(`Art_Vector_Revamp_Torso_Outfit_Maid_${this.torsoSize}`);
				break;
			case "a slutty maid outfit":
				result.push(`Art_Vector_Revamp_Torso_Outfit_Maid_Lewd_${this.torsoSize}`);
				break;
			default:
		}

		return result;
	}

	get ballsLayer() {
		let result = [];

		if (!this.showBalls || this.artSlave.scrotum <= 0 || this.artSlave.balls <= 0) {
			return result;
		}

		let ballsSize = 0;

		if (this.artSlave.scrotum >= 6) {
			ballsSize = 4;
		} else if (this.artSlave.scrotum >= 4) {
			ballsSize = 3;
		} else if (this.artSlave.scrotum >= 3) {
			ballsSize = 2;
		} else if (this.artSlave.scrotum >= 2) {
			ballsSize = 1;
		} else {
			ballsSize = 0;
		}

		result.push(`Art_Vector_Revamp_Balls_${ballsSize}`);

		return result;
	}

	get bellyLayer() {
		let result = [];

		if (this.bellyLevel > 0) {
			result.push(`Art_Vector_Revamp_Belly_${this.bellyLevel}`);

			if (this.showBellyPiercings) {
				if (this.artSlave.navelPiercing >= 1) {
					result.push(`Art_Vector_Revamp_Belly_${this.bellyLevel}_Piercing`);
				}

				if (this.artSlave.navelPiercing === 2) {
					result.push(`Art_Vector_Revamp_Belly_${this.bellyLevel}_Piercing_Heavy`);
				}
			}
		} else {
			if (this.showBellyPiercings) {
				if (this.artSlave.navelPiercing >= 1) {
					result.push("Art_Vector_Revamp_Navel_Piercing");
				}

				if (this.artSlave.navelPiercing === 2) {
					result.push("Art_Vector_Revamp_Navel_Piercing_Heavy");
				}
			}
		}

		return result;
	}

	get penisLayer() {
		let result = [];

		if (this.getBellyLevel >= 8) {
			return result;
		}

		let penisSize = -1;

		if (this.artSlave.dick >= 8) {
			penisSize = 6;
		} else if (this.artSlave.dick >= 7) {
			penisSize = 5;
		} else if (this.artSlave.dick >= 6) {
			penisSize = 4;
		} else if (this.artSlave.dick >= 5) {
			penisSize = 3;
		} else if (this.artSlave.dick >= 4) {
			penisSize = 2;
		} else if (this.artSlave.dick >= 2) {
			penisSize = 1;
		} else if (this.artSlave.dick >= 1) {
			penisSize = 0;
		} else {
			penisSize = -1;
		}

		if (!this.showPenis || penisSize < 0) {
			return result;
		}

		if (canAchieveErection(this.artSlave) && (this.artSlave.chastityPenis !== 1)) {
			result.push(`Art_Vector_Revamp_Penis_${penisSize}`);

			if (!this.showPenisPiercings) {
				return result;
			}

			if (this.artSlave.dickPiercing === 1) {
				result.push(`Art_Vector_Revamp_Penis_${penisSize}_Piercing`);
			} else if (this.artSlave.dickPiercing === 2) {
				result.push(`Art_Vector_Revamp_Penis_${penisSize}_Piercing_Heavy`);
			}
		} else {
			result.push(`Art_Vector_Revamp_Flaccid_${penisSize}`);

			if (this.artSlave.chastityPenis === 1) {
				result.push(`Art_Vector_Revamp_Chastity_Cage_${penisSize}`);
			}
		}

		return result;
	}

	get boobLayer() {
		let result = [];

		if (this.artSlave.boobs < 300) {
			if (this.showNipples) {
				let areolaeShape = "Normal";

				switch (this.artSlave.areolae) {
					case 0:
						areolaeShape = "Normal";
						break;
					case 1:
						areolaeShape = "Large";
						break;
					case 2:
						areolaeShape = "Wide";
						break;
					case 3:
						areolaeShape = "Huge";
						break;
					default:
				}
				switch (this.artSlave.areolaeShape) {
					case "heart":
						areolaeShape = "Heart";
						break;
					case "star":
						areolaeShape = "Star";
						break;
					default:
				}

				result.push(`Art_Vector_Revamp_Boob_None_Areola_${areolaeShape}`);
			}
		} else {
			let artScaleFactor = 0.804354 * Math.log(0.00577801 * this.artSlave.boobs);

			let boobRightArtTranslationX = 270 * ((-1 * artScaleFactor) + 1);
			let boobLeftArtTranslationX = 320 * ((-1 * artScaleFactor) + 1);
			let artTranslationX = -283.841 * artScaleFactor + 285.349;
			let artTranslationY = 198 * ((-1 * artScaleFactor) + 1);
			let artBoobTransform = `matrix(${artScaleFactor},0,0,${artScaleFactor},${artTranslationX},${artTranslationY})`;

			this.artTransform = artBoobTransform;

			if (!this.showBoobs) {
				return result;
			}

			let size = "Small";

			if (this.artSlave.boobs < 600) {
				artScaleFactor = 0.360674 * Math.log(0.0266667 * this.artSlave.boobs);

				boobRightArtTranslationX = 240 * ((-1 * artScaleFactor) + 1);
				boobLeftArtTranslationX = 300 * ((-1 * artScaleFactor) + 1);
				artTranslationY = 250 * ((-1 * artScaleFactor) + 1);
				size = "Small";
			} else if (this.artSlave.boobs < 15000) {
				size = "Medium";
			} else {
				size = "Huge";
				boobRightArtTranslationX = 252 * ((-1 * artScaleFactor) + 1);
				boobLeftArtTranslationX = 315 * ((-1 * artScaleFactor) + 1);
			}

			this.boobRightArtTransform = `matrix(${artScaleFactor},0,0,${artScaleFactor},${boobRightArtTranslationX},${artTranslationY})`;
			this.boobLeftArtTransform = `matrix(${artScaleFactor},0,0,${artScaleFactor},${boobLeftArtTranslationX},${artTranslationY})`;
			result.push(`Art_Vector_Revamp_Boob_${size}`);

			if (this.showNipples) {
				let areolaeShape = "Normal";

				switch (this.artSlave.areolae) {
					case 0:
						areolaeShape = "Normal";
						break;
					case 1:
						areolaeShape = "Large";
						break;
					case 2:
						areolaeShape = "Wide";
						break;
					case 3:
						areolaeShape = "Huge";
						break;
					default:
				}
				switch (this.artSlave.areolaeShape) {
					case "heart":
						areolaeShape = "Heart";
						break;
					case "star":
						areolaeShape = "Star";
						break;
					default:
				}

				result.push(`Art_Vector_Revamp_Boob_${size}_Areolae_${areolaeShape}`);
				result.push(`Art_Vector_Revamp_Boob_${size}_Nipples`);
			}
			if (this.showBoobsHighlight) {
				result.push(`Art_Vector_Revamp_Boob_${size}_Highlights2`);
				result.push(`Art_Vector_Revamp_Boob_${size}_Highlights1`);
			}
		}

		return result;
	}

	get boobAddonLayer() {
		let result = [];

		if (this.showNipplesPiercings) {
			let size = "Small";

			if (this.artSlave.boobs < 600) {
				size = "Small";
			} else if (this.artSlave.boobs < 15000) {
				size = "Medium";
			} else {
				size = "Huge";
			}

			if (this.artSlave.nipplesPiercing === 1) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Piercing");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Piercing`);
				}
			} else if (this.artSlave.nipplesPiercing === 2) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Piercing_Heavy");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Piercing_Heavy`);
				}
			}

			if (this.artSlave.areolaePiercing === 1) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Areola_Piercing");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Areola_Piercing`);
				}
			} else if (this.artSlave.areolaePiercing === 2) {
				if (this.artSlave.boobs < 300) {
					result.push("Art_Vector_Revamp_Boob_None_Areola_Piercing_Heavy");
				} else {
					result.push(`Art_Vector_Revamp_Boob_${size}_Areola_Piercing_Heavy`);
				}
			}
		}

		switch (this.artSlave.clothes) {
			case "uncomfortable straps":
				// if (this.artSlave.boobs >= 300)
				// result.push("Art_Vector_Revamp_Boob_Outfit_Straps");
				break;
			case "a nice maid outfit":
				if (this.artSlave.boobs >= 300) {
					if (this.artSlave.boobs < 600) {
						let artScaleFactor = 0.288539 * Math.log(0.106667 * this.artSlave.boobs);
						let artTranslationX = 270 * ((-1 * artScaleFactor) + 1);
						let artTranslationY = 198 * ((-1 * artScaleFactor) + 1); // -198.438*artScaleFactor+203.274;
						let artBoobTransform = `matrix(${artScaleFactor},0,0,${artScaleFactor},${artTranslationX},${artTranslationY})`;

						this.boobOutfitArtTransform = artBoobTransform;

						result.push("Art_Vector_Revamp_Boob_Small_Outfit_Maid");
					} else if (this.artSlave.boobs < 15000) {
						let artScaleFactor = 0.155334 * Math.log(1.04167 * this.artSlave.boobs);
						let artTranslationX = 270 * ((-1.25 * artScaleFactor) + 1.25);
						let artTranslationY = 198 * ((-0.8 * artScaleFactor) + 0.8); // -198.438*artScaleFactor+203.274;
						let artBoobTransform = `matrix(${artScaleFactor},0,0,${artScaleFactor},${artTranslationX},${artTranslationY})`;

						this.boobOutfitArtTransform = artBoobTransform;
						result.push("Art_Vector_Revamp_Boob_Medium_Outfit_Maid");
					} else {
						let artScaleFactor = 1.56609 * Math.log(0.00017373 * this.artSlave.boobs);
						let artTranslationX = 340 * ((-1 * artScaleFactor) + 1);
						let artTranslationY = 153 * ((-1 * artScaleFactor) + 1); // -198.438*artScaleFactor+203.274;
						let artBoobTransform = `matrix(${artScaleFactor},0,0,${artScaleFactor},${artTranslationX},${artTranslationY})`;

						this.boobOutfitArtTransform = artBoobTransform;
						result.push("Art_Vector_Revamp_Boob_Huge_Outfit_Maid");
					}
				}
				break;

			default:
		}

		return result;
	}

	get clavicleLayer() {
		let result = [];

		result.push("Art_Vector_Revamp_Clavicle");

		return result;
	}

	get collarLayer() {
		let result = [];

		switch (this.artSlave.collar) {
			case "leather with cowbell":
				result.push("Art_Vector_Revamp_Collar_Cowbell");
				break;
			case "heavy gold":
				result.push("Art_Vector_Revamp_Collar_Gold_Heavy");
				break;
			case "neck corset":
				result.push("Art_Vector_Revamp_Collar_Neck_Corset");
				break;
			case "pretty jewelry":
				result.push("Art_Vector_Revamp_Collar_Pretty_Jewelry");
				break;
			case "cruel retirement counter":
				result.push("Art_Vector_Revamp_Collar_Retirement_Cruel");
				break;
			case "nice retirement counter":
				result.push("Art_Vector_Revamp_Collar_Retirement_Nice");
				break;
			case "satin choker":
				result.push("Art_Vector_Revamp_Collar_Satin_Choker");
				break;
			case "shock punishment":
				result.push("Art_Vector_Revamp_Collar_Shock_Punishment");
				break;
			case "stylish leather":
				result.push("Art_Vector_Revamp_Collar_Stylish_Leather");
				break;
			case "tight steel":
				result.push("Art_Vector_Revamp_Collar_Tight_Steel");
				break;
			default:
		}

		return result;
	}

	get headLayer() {
		let result = [];

		result.push("Art_Vector_Revamp_Head");

		if (this.showHeadHighlight) {
			result.push("Art_Vector_Revamp_Face_Highlights");
		}

		if (!this.showHeadPiercings) {
			return result;
		}

		if (this.artSlave.earPiercing === 1) {
			result.push("Art_Vector_Revamp_Head_Ear_Piercing");
		} else if (this.artSlave.earPiercing === 2) {
			result.push("Art_Vector_Revamp_Head_Ear_Piercing_Heavy");
		}

		if (this.artSlave.nosePiercing === 1) {
			result.push("Art_Vector_Revamp_Head_Nose_Piercing");
		} else if (this.artSlave.nosePiercing === 2) {
			result.push("Art_Vector_Revamp_Head_Nose_Piercing_Heavy");
		}

		return result;
	}

	get eyesLayer() {
		let result = [];

		if (!this.showEyes) {
			return result;
		}

		if (this.artSlave.devotion > 50) {
			result.push("Art_Vector_Revamp_Eyes_Happy");
			result.push("Art_Vector_Revamp_Eyes_Happy_Highlights");

			if (this.showHeadPiercings) {
				if (this.artSlave.eyebrowPiercing === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Happy_Piercing");
				} else if (this.artSlave.eyebrowPiercing === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Happy_Piercing_Heavy");
				}
			}
		} else if (this.artSlave.devotion >= 0) {
			result.push("Art_Vector_Revamp_Eyes_Shy");
			result.push("Art_Vector_Revamp_Eyes_Shy_Highlights");

			if (this.showHeadPiercings) {
				if (this.artSlave.eyebrowPiercing === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Shy_Piercing");
				} else if (this.artSlave.eyebrowPiercing === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Shy_Piercing_Heavy");
				}
			}
		} else if (this.artSlave.devotion >= -50) {
			result.push("Art_Vector_Revamp_Eyes_Closed");

			if (this.showHeadPiercings) {
				if (this.artSlave.eyebrowPiercing === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Closed_Piercing");
				} else if (this.artSlave.eyebrowPiercing === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Closed_Piercing_Heavy");
				}
			}
		} else {
			result.push("Art_Vector_Revamp_Eyes_Angry");
			result.push("Art_Vector_Revamp_Eyes_Angry_Highlights");
			if (this.showHeadPiercings) {
				if (this.artSlave.eyebrowPiercing === 1) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Angry_Piercing");
				} else if (this.artSlave.eyebrowPiercing === 2) {
					result.push("Art_Vector_Revamp_Head_Eyebrow_Angry_Piercing_Heavy");
				}
			}
		}

		return result;
	}

	get mouthLayer() {
		let result = [];
		let lipsSize = "Normal";

		if (!this.showMouth) {
			return result;
		}

		if (this.artSlave.lips > 95) {
			lipsSize = "Enormous";
		} else if (this.artSlave.lips > 70) {
			lipsSize = "Huge";
		} else if (this.artSlave.lips > 50) {
			lipsSize = "Big";
		} else if (this.artSlave.lips > 30) {
			lipsSize = "Plush";
		} else if (this.artSlave.lips > 10) {
			lipsSize = "Normal";
		} else {
			lipsSize = "Thin";
		}

		if (this.artSlave.trust > 20) {
			result.push(`Art_Vector_Revamp_Makeup_Mouth_Happy_${lipsSize}`);
			result.push(`Art_Vector_Revamp_Mouth_Happy_${lipsSize}`);

			if (this.showHeadPiercings) {
				if (this.artSlave.lipsPiercing === 1) {
					result.push("Art_Vector_Revamp_Head_Mouth_Happy_Piercing");
				} else if (this.artSlave.lipsPiercing === 2) {
					result.push("Art_Vector_Revamp_Head_Mouth_Happy_Piercing_Heavy");
				}
			}
		} else {
			result.push(`Art_Vector_Revamp_Makeup_Mouth_Angry_${lipsSize}`);
			result.push(`Art_Vector_Revamp_Mouth_Angry_${lipsSize}`);

			if (this.showHeadPiercings) {
				if (this.artSlave.lipsPiercing === 1) {
					result.push("Art_Vector_Revamp_Head_Mouth_Angry_Piercing");
				} else if (this.artSlave.lipsPiercing === 2) {
					result.push("Art_Vector_Revamp_Head_Mouth_Angry_Piercing_Heavy");
				}
			}
		}

		return result;
	}
	get headAddonLayer() {
		let result = [];

		if (this.showEyes) {
			switch (this.artSlave.eyewear) {
				case "corrective glasses":
				case "glasses":
				case "blurring glasses":
					result.push("Art_Vector_Revamp_Glasses");
					break;
				default:
			}
		}

		if (this.showMouth) {
			switch (this.artSlave.collar) {
				case "dildo gag":
					result.push("Art_Vector_Revamp_Dildo_Gag");
					break;
				case "bit gag":
					result.push("Art_Vector_Revamp_Bit_Gag");
					break;
				case "ball gag":
					result.push("Art_Vector_Revamp_Ball_Gag");
					break;
				default:
			}
		}
		return result;
	}
	get hairForeLayer() {
		let result = [];

		if (!this.showHair) {
			return result;
		}

		if (this.artSlave.hLength === 0) {
			return result;
		}

		switch (this.artSlave.hStyle) {
			case "neat":
				result.push("Art_Vector_Revamp_Hair_Fore_Neat");
				break;
			case "bun":
			case "up":
			case "tails":
			case "ponytail":
				result.push("Art_Vector_Revamp_Hair_Fore_Bun");
				break;
			case "braided":
				result.push("Art_Vector_Revamp_Hair_Fore_Braids");
				break;
			case "curled":
				result.push("Art_Vector_Revamp_Hair_Fore_Curled");
				break;
			case "cornrows":
				result.push("Art_Vector_Revamp_Hair_Fore_Cornrows");
				break;
			case "strip":
				result.push("Art_Vector_Revamp_Hair_Fore_Shaved_Sides");
				break;
			case "luxurious":
				result.push("Art_Vector_Revamp_Hair_Fore_Luxurious");
				break;
			case "afro":
				result.push("Art_Vector_Revamp_Hair_Fore_Afro");
				break;
			case "permed":
				result.push("Art_Vector_Revamp_Hair_Fore_Permed");
				break;
			case "dreadlocks":
				result.push("Art_Vector_Revamp_Hair_Fore_Dreadlocks");
				break;
			default:
				result.push("Art_Vector_Revamp_Hair_Fore_Messy");
		}

		return result;
	}

	get StylesCss() {
		return this.styleControl.StylesCss;
	}

	get Layers() {
		let layers = [];

		Array.prototype.push.apply(layers, this.hairBackLayer);
		Array.prototype.push.apply(layers, this.armLayer);
		Array.prototype.push.apply(layers, this.buttLayer);
		Array.prototype.push.apply(layers, this.legLayer);
		Array.prototype.push.apply(layers, this.feetLayer);
		Array.prototype.push.apply(layers, this.torsoLayer);
		Array.prototype.push.apply(layers, this.clavicleLayer);
		Array.prototype.push.apply(layers, this.pussyLayer);
		Array.prototype.push.apply(layers, this.pubicLayer);
		Array.prototype.push.apply(layers, this.pussyPiercingsLayer);
		Array.prototype.push.apply(layers, this.chastityBeltLayer);
		Array.prototype.push.apply(layers, this.torsoOutfitLayer);
		Array.prototype.push.apply(layers, this.ballsLayer);
		Array.prototype.push.apply(layers, this.bellyLayer);
		Array.prototype.push.apply(layers, this.penisLayer);
		Array.prototype.push.apply(layers, this.boobLayer);
		Array.prototype.push.apply(layers, this.boobAddonLayer);
		Array.prototype.push.apply(layers, this.collarLayer);
		Array.prototype.push.apply(layers, this.headLayer);
		Array.prototype.push.apply(layers, this.eyesLayer);
		Array.prototype.push.apply(layers, this.mouthLayer);
		Array.prototype.push.apply(layers, this.headAddonLayer);
		Array.prototype.push.apply(layers, this.hairForeLayer);

		return layers;
	}
}
