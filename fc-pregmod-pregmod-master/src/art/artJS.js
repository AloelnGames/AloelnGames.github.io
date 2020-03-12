/* eslint-disable no-console */
/* eslint-disable no-undef */
/**
 * Call as <<= SlaveArt(...)>> or <<print SlaveArt(...)>>Displays slave images. Currently passage-based.
 * @param {App.Entity.SlaveState} artSlave Slave
 * @param {number} artSize Image size/center:
 * * 3: Large, right. Example: long slave description.
 * * 2: Medium, right. Example: random events.
 * * 1: Small, left. Example: lists.
 * * 0: Tiny, left. Example: facilities
 * @param {number} [UIDisplay] (optional, only used by legacy art): icon UI Display for vector art, 1 for on
 * @returns {string}
 */
window.SlaveArt = function(artSlave, artSize, UIDisplay) {
	const imageChoice = State.variables.imageChoice;
	if (artSlave.custom.image !== null && artSlave.custom.image.filename !== "") {
		return CustomArt(artSlave, artSize);
	} else if (imageChoice === 1) { /* VECTOR ART BY NOX/DEEPMURK */
		return VectorArt(artSlave, artSize);
	} else if (imageChoice === 2) { /* VECTOR ART BY NOX - Pregmod Legacy Version */
		return LegacyVectorArt(artSlave, UIDisplay);
	} else if (imageChoice === 3) { /* VECTOR ART REVAMP*/
		return RevampedVectorArt(artSlave);
	} else { /* RENDERED IMAGES BY SHOKUSHU */
		return ArtControlRendered(artSlave, artSize);
	}
};

/**
 * @param {App.Entity.SlaveState} artSlave Slave
 * @param {number} artSize Image size/center:
 * * 3: Large, right. Example: long slave description.
 * * 2: Medium, right. Example: random events.
 * * 1: Small, left. Example: lists.
 * * 0: Tiny, left. Example: facilities
 * @param {number} [UIDisplay] (optional, only used by legacy art): icon UI Display for vector art, 1 for on
 * @returns {DocumentFragment|HTMLElement}
 */
App.Art.SlaveArtElement = function(artSlave, artSize, UIDisplay) {
	const imageChoice = State.variables.imageChoice;
	if (artSlave.custom.image !== null && artSlave.custom.image.filename !== "") {
		return App.Art.customArtElement(artSlave, artSize);
	} else if (imageChoice === 1) { /* VECTOR ART BY NOX/DEEPMURK */
		return App.Art.vectorArtElement(artSlave, artSize);
	} else if (imageChoice === 2) { /* VECTOR ART BY NOX - Pregmod Legacy Version */
		return App.Art.legacyVectorArtElement(artSlave, UIDisplay);
	} else if (imageChoice === 3) { /* VECTOR ART REVAMP*/
		return App.Art.revampedVectorArtElement(artSlave);
	} else { /* RENDERED IMAGES BY SHOKUSHU */
		return App.Art.renderedArtElement(artSlave, artSize);
	}
};

/**
 * @param {App.Entity.SlaveState} artSlave Slave
 * @param {number} artSize Image size/center:
 * * 3: Large, right. Example: long slave description.
 * * 2: Medium, right. Example: random events.
 * * 1: Small, left. Example: lists.
 * * 0: Tiny, left. Example: facilities
 * @param {string} elementID the html element that is being updated
 * @param {number} [UIDisplay] (optional, only used by legacy art): icon UI Display for vector art, 1 for on
 */
App.Art.refreshSlaveArt = function(artSlave, artSize, elementID, UIDisplay=0) {
	if ($('#'+elementID).length) {
		if (V.seeImages === 1 && V.eventDescription !== 1) {
			let image = document.createElement('div');
			if (artSize === 3) {
				if (V.imageChoice === 1) {
					image.className = "imageRef lrgVector";
				} else {
					image.className = "imageRef lrgRender";
				}
				let mask = document.createElement('div');
				mask.className = "mask";
				mask.textContent = " ";
				image.appendChild(mask);
			} else if (artSize === 2) {
				image.className = "imageRef medImg";
			} else if (artsize < 2) {
				image.className = "imageRef smlImg";
			}
			image.appendChild(App.Art.SlaveArtElement(artSlave, artSize, UIDisplay));
			return jQuery('#'+elementID).empty().append(image);
		}
	}
	return;
};

window.ArtControlRendered = function ArtControlRendered(slave, sizePlacement) {
	return App.Art.elementToMarkup(App.Art.renderedArtElement(slave, sizePlacement));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} imageSize
 * @returns {string}
 */
window.CustomArt = function(slave, imageSize) {
	return App.Art.elementToMarkup(App.Art.customArtElement(slave, imageSize));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} artSize
 * @returns {HTMLElement}
 */
App.Art.renderedArtElement = function(slave, artSize) {
	let fileName = "resources/renders/";

	if (slave.belly > 1500) {
		fileName += "preg ";
	}
	if (slave.vagina > -1) {
		if (slave.dick > 0) {
			if (slave.balls > 0) {
				fileName += "futanari";
			} else {
				fileName += "herm";
			}
		} else {
			fileName += "female";
		}
	} else {
		if (slave.balls > 0) {
			fileName += "shemale";
		} else {
			fileName += "gelding";
		}
	}
	if (slave.boobs < 400) {
		fileName = `${fileName} small`;
	} else if (slave.boobs < 800) {
		fileName = `${fileName} big`;
	} else if (slave.boobs < 6000) {
		fileName = `${fileName} huge`;
	} else {
		fileName = `${fileName} hyper`;
	}
	if (slave.muscles > 30) {
		fileName = `${fileName} muscle`;
	} else {
		fileName = `${fileName} soft`;
	}
	if (slave.fuckdoll > 0) {
		fileName = `${fileName} rebellious`;
	} else if (slave.devotion <= 20) {
		if (slave.trust < -20) {
			fileName = `${fileName} reluctant`;
		} else {
			fileName = `${fileName} rebellious`;
		}
	} else if (slave.fetish === "mindbroken") {
		fileName = `${fileName} reluctant`;
	} else if (slave.devotion <= 50 || slave.fetishKnown !== 1 || (V.seeMainFetishes === 0 && artSize < 2)) {
		fileName = `${fileName} obedient`;
	} else {
		if (slave.fetish === "none") {
			fileName = `${fileName} obedient`;
		} else {
			fileName = `${fileName} ${slave.fetish}`;
		}
	}
	fileName += ".png";

	const res = document.createElement("img");
	res.setAttribute("src", fileName);
	const sz = this.artSizeToPx(artSize);
	if (sz) {
		res.setAttribute("width", sz);
		res.setAttribute("height", sz);
	}
	return res;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} imageSize
 * @returns {HTMLElement}
 */
App.Art.customArtElement = function(slave, imageSize) {
	const fileType = slave.custom.image.format || "png";
	const fileName = `resources/${slave.custom.image.filename}.${fileType}`;
	let elementType = "img";
	let attributes = [];
	if (fileType === "webm" || fileType === "mp4") {
		elementType = "video";
		attributes = ["loop", "autoplay"];
	}

	const res = document.createElement(elementType);
	attributes.forEach((an) => {
		res.setAttribute(an, "");
	});

	res.setAttribute("src", fileName);
	res.setAttribute("style", "float:right; border:3px hidden; object-fit:contain; height:100%; width:100%;");
	const sz = this.artSizeToPx(imageSize);
	if (sz) {
		res.setAttribute("width", sz);
		res.setAttribute("height", sz);
	}
	return res;
};

App.Art.artSizeToPx = function(artSize) {
	switch (artSize) {
		case 3:
			return null;
		case 2:
			return "300";
		case 1:
			return "150";
		default:
			return "120";
	}
};

/*
This takes a textual hair color description and tries to guess the appropriate HTML compliant color code.
Color should be a color name, but can also be a string describing hair color.
eyes can be nearly anything, it only indicates that the function is being used for eye color instead of hair color.
This code's working is described to the user in the Encyclopedia, chapter "Lore", section "Dyes".
*/

window.extractColor = function(color, eyes) {
	/*
	these are color names known and used in FreeCities
	attributed color names are at the front of the array
	*/
	let FCname2HTMLarray = [
		["amber", "#ffbf00"],
		["auburn", "#a53f2a"],
		["black", "#171717"],
		["blazing red", "#E00E2B"],
		["blonde", "#F4F1A3"],
		["blue", "#4685C5"],
		["blue-violet", "#8790B7"],
		["brown", "#7e543e"],
		["burgundy", "#34000d"],
		["chestnut", "#663622"],
		["chocolate", "#402215"],
		["copper", "#e29c58"],
		["dark blue", "#000034"],
		["dark brown", "#4b3225"],
		["dark orchid", "#9932CC"],
		["deep red", "#6D1318"],
		["ginger", "#da822d"],
		["golden", "#ffd700"],
		["green", "#5FBA46"],
		["green-yellow", "#ADFF2F"],
		["grey", "#8d8d8d"],
		["hazel", "#8d6f1f"],
		["jet black", "#060606"],
		["light olive", "#806b00"],
		["neon blue", "#0e85fd"],
		["neon green", "#25d12b"],
		["neon pink", "#fc61cd"],
		["pale-grey", "#b3b3b3"],
		["pink", "#D18CBC"],
		["platinum blonde", "#fcf3c1"],
		["purple", "#800080"],
		["red", "#BB2027"],
		["sea green", "#2E8B57"],
		["silver", "#d9d9d9"],
		["strawberry-blonde", "#e5a88c"],
		/* these are not actually FreeCities canon, but like to appear in custom descriptions */
		["brunette", "#6d4936"],
		["dark", "#463325"]
	];

	/* these are HTML color names supported by most browsers */
	let HTMLstandardColors = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
	let FCnames = new Map(FCname2HTMLarray);
	color = color.toLowerCase(); /* normalization: lowercase color name */
	let colorCode = FCnames.get(color); /* look up in FreeCities color names */
	if (!colorCode) { /* not a FreeCities color name*/
		if (HTMLstandardColors.includes(color) || color.match(/^#([0-9a-f]{3}){1,2}$/) !== null) {
			colorCode = color; /* is a HTML color name or value, use it directly */
		} else {
			/*
			is not even a HTML color name. color probably is a description.
			look for anything resembling a valid color name within the description.
			*/
			let colorNoSpaces = color.replace(/\s+/g, ''); /* remove all spaces from description */
			let FCkeys = Array.from(FCnames.keys());
			let colorCodes = [
				FCnames.get(FCkeys.find(function(e) {
					return color.startsWith(e);
				})),
				HTMLstandardColors.find(function(e) {
					return colorNoSpaces.startsWith(e);
				}),
				FCnames.get(FCkeys.find(function(e) {
					return color.includes(e);
				})),
				HTMLstandardColors.find(function(e) {
					return colorNoSpaces.includes(e);
				})
			];
			colorCode = colorCodes.find(function(e) {
				return e;
			}); /* picks the first successful guess */
		}
	}
	if (!colorCode) {
		console.log("Art Color Tools JS: Unable to determine HTML compliant color code for color string '" + color + "'.");
		if (eyes) {
			colorCode = "#89b7ff";
		} else {
			colorCode = "fuchsia"; /* use fuchsia as error marker */
		}
	}
	return colorCode;
};

window.clothing2artSuffix = function(v) {
	if (v === "restrictive latex") {
		v = "latex";
	} /* universal "special case": latex art is actually "restrictive latex" TODO: align name in vector source */
	return v.replace(/^a[n]? /, "") /* remove "a" and "an" from the beginning*/
		.replace(/ ?(outfit|clothing) ?/, "") /* remove "outfit" and "clothing" (redundant) */
		.replace("-", "") /* remove minus character */
		.replace(/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() +
					txt.substr(1).toLowerCase();
			}
		) /* CamelCase by whitespace */
		.replace(/\W/g, ""); /* remove remaining whitespace */
};

window.skinColorCatcher = function(artSlave) {
	let colorSlave = {
		skinColor: "#e8b693",
		areolaColor: "#d76b93",
		labiaColor: "#d76b93",
		lipsColor: "#ff69b4"
	};
	if (artSlave.skin === "camouflage patterned") {
		colorSlave.skinColor = "#78875a";
		colorSlave.areolaColor = "#939F7A";
		colorSlave.labiaColor = "#F977A3";
		colorSlave.lipsColor = "#708050";
	} else if (artSlave.skin === "dyed red") {
		colorSlave.skinColor = "#bc4949";
		colorSlave.areolaColor = "#C96D6D";
		colorSlave.labiaColor = "#F977A3";
		colorSlave.lipsColor = "#b04040";
	} else if (artSlave.skin === "dyed green") {
		colorSlave.skinColor = "#A6C373";
		colorSlave.areolaColor = "#B7CF8F";
		colorSlave.labiaColor = "#F977A3";
		colorSlave.lipsColor = "#A0C070";
	} else if (artSlave.skin === "dyed blue") {
		colorSlave.skinColor = "#5b8eb7";
		colorSlave.areolaColor = "#7BA4C5";
		colorSlave.labiaColor = "#F977A3";
		colorSlave.lipsColor = "#5080b0";
	} else if (artSlave.skin === "dyed pink") {
		colorSlave.skinColor = "#fe62b0";
		colorSlave.areolaColor = "#fc45a1";
		colorSlave.labiaColor = "#fba2c0";
		colorSlave.lipsColor = "#ff4291";
	} else if (artSlave.skin === "dyed gray") {
		colorSlave.skinColor = "#bdbdbd";
		colorSlave.areolaColor = "#666666";
		colorSlave.labiaColor = "#8C8C8C";
		colorSlave.lipsColor = "#171717";
	} else if (artSlave.skin === "tiger striped") {
		colorSlave.skinColor = "#e2d75d";
		colorSlave.areolaColor = "#E7DF7D";
		colorSlave.labiaColor = "#F977A3";
		colorSlave.lipsColor = "#e0d050";
	} else { /* natural colors */
		switch (artSlave.race) {
			case "white":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#F4EAF0";
						colorSlave.areolaColor = "#FCCCDC";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#F4EAF0";
						colorSlave.areolaColor = "#FCCCDC";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#F5E1DF";
						colorSlave.areolaColor = "#EFBFCA";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#F5E1DF";
						colorSlave.areolaColor = "#EFBFCA";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#F5D5C9";
						colorSlave.areolaColor = "#E2B4B9";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#F5D5C9";
						colorSlave.areolaColor = "#E2B4B9";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#F4C9AA";
						colorSlave.areolaColor = "#F19795";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#E1B585";
						colorSlave.areolaColor = "#C39696";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#E1B585";
						colorSlave.areolaColor = "#C39696";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#D58E5F";
						colorSlave.areolaColor = "#B17777";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#D58E5F";
						colorSlave.areolaColor = "#B17777";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#A2805C";
						colorSlave.areolaColor = "#8E6454";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#825633";
						colorSlave.areolaColor = "#734B2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#784F2F";
						colorSlave.areolaColor = "#583E2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#784F2F";
						colorSlave.areolaColor = "#583E2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
						colorSlave.skinColor = "#65422C";
						colorSlave.areolaColor = "#4A3A33";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "black":
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#D58E5F";
						colorSlave.areolaColor = "#B17777";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "black":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FEE4CA";
						colorSlave.areolaColor = "#E0B3A2";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FEE4CA";
						colorSlave.areolaColor = "#E0B3A2";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#E3C5A7";
						colorSlave.areolaColor = "#EFBDC9";
						colorSlave.labiaColor = "#CC9B88";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#E3C5A7";
						colorSlave.areolaColor = "#CC9B88";
						colorSlave.labiaColor = "#CC9B88";
						break;
					case "very fair":
						colorSlave.skinColor = "#DEB892";
						colorSlave.areolaColor = "#AB806F";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#DEB892";
						colorSlave.areolaColor = "#AB806F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#D59D73";
						colorSlave.areolaColor = "#8D6859";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#AC7C4A";
						colorSlave.areolaColor = "#7C594B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#AC7C4A";
						colorSlave.areolaColor = "#7C594B";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#985C34";
						colorSlave.areolaColor = "#764B3A";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#985C34";
						colorSlave.areolaColor = "#764B3A";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#745C42";
						colorSlave.areolaColor = "#63463B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#65422C";
						colorSlave.areolaColor = "#4B3121";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#5A3C24";
						colorSlave.areolaColor = "#493326";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#5A3C24";
						colorSlave.areolaColor = "#493326";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#46362C";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "black":
						colorSlave.skinColor = "#583D3D";
						colorSlave.areolaColor = "#3B3028";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#4A3A33";
						colorSlave.areolaColor = "#332B27";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#312926";
						colorSlave.areolaColor = "#181616";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#985C34";
						colorSlave.areolaColor = "#764B3A";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "latina":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FEDECE";
						colorSlave.areolaColor = "#E3BBAB";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FEDECE";
						colorSlave.areolaColor = "#E3BBAB";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#E6C2B0";
						colorSlave.areolaColor = "#D1A695";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#E6C2B0";
						colorSlave.areolaColor = "#D1A695";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#E1B59F";
						colorSlave.areolaColor = "#B48D7E";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#E1B59F";
						colorSlave.areolaColor = "#B48D7E";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#DAA782";
						colorSlave.areolaColor = "#9E7666";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#B27554";
						colorSlave.areolaColor = "#92684C";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#B27554";
						colorSlave.areolaColor = "#92684C";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#8B644F";
						colorSlave.areolaColor = "#7B5749";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#775031";
						colorSlave.areolaColor = "#69452F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#774A31";
						colorSlave.areolaColor = "#614330";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#774A31";
						colorSlave.areolaColor = "#614330";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
						colorSlave.skinColor = "#74523E";
						colorSlave.areolaColor = "#573F30";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "black":
						colorSlave.skinColor = "#6B4B4B";
						colorSlave.areolaColor = "#473426";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#634F45";
						colorSlave.areolaColor = "#4D3A2E";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#634F45";
						colorSlave.areolaColor = "#4D3A2E";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "asian":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FFF8EE";
						colorSlave.areolaColor = "#F7DBD0";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FFF8EE";
						colorSlave.areolaColor = "#F7DBD0";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#F5E7DC";
						colorSlave.areolaColor = "#EABFB3";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#F5E7DC";
						colorSlave.areolaColor = "#EABFB3";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#F5D4B5";
						colorSlave.areolaColor = "#CB988B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#F5D4B5";
						colorSlave.areolaColor = "#CB988B";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#F4D1A3";
						colorSlave.areolaColor = "#BA8E83";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#CFB48D";
						colorSlave.areolaColor = "#AC8074";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#CFB48D";
						colorSlave.areolaColor = "#AC8074";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#C38C4D";
						colorSlave.areolaColor = "#A67A6F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#C38C4D";
						colorSlave.areolaColor = "#A67A6F";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#9A774A";
						colorSlave.areolaColor = "#855E4E";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#855834";
						colorSlave.areolaColor = "#734B2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#83522B";
						colorSlave.areolaColor = "#68442A";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#83522B";
						colorSlave.areolaColor = "#68442A";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#724826";
						colorSlave.areolaColor = "#5C3D26";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#C38C4D";
						colorSlave.areolaColor = "#A67A6F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "middle eastern":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#E8CFCF";
						colorSlave.areolaColor = "#DCADBC";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#E8CFCF";
						colorSlave.areolaColor = "#DCADBC";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#FBCCC6";
						colorSlave.areolaColor = "#E79E8B";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#FBCCC6";
						colorSlave.areolaColor = "#E79E8B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#EAAB92";
						colorSlave.areolaColor = "#D27B64";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#EAAB92";
						colorSlave.areolaColor = "#D27B64";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#EDA571";
						colorSlave.areolaColor = "#B16854";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#CC8D53";
						colorSlave.areolaColor = "#A7624F";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#CC8D53";
						colorSlave.areolaColor = "#A7624F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#CA7136";
						colorSlave.areolaColor = "#9B5959";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#CA7136";
						colorSlave.areolaColor = "#9B5959";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#84684A";
						colorSlave.areolaColor = "#735143";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#684528";
						colorSlave.areolaColor = "#563826";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#6E4730";
						colorSlave.areolaColor = "#604534";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#6E4730";
						colorSlave.areolaColor = "#604534";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#604534 ";
						colorSlave.areolaColor = "#514039";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#CA7136";
						colorSlave.areolaColor = "#9B5959";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "amerindian":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FDE4BF";
						colorSlave.areolaColor = "#F0BEAA";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FDE4BF";
						colorSlave.areolaColor = "#F0BEAA";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#F5E7DC";
						colorSlave.areolaColor = "#CDA499";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#F5E7DC";
						colorSlave.areolaColor = "#CDA499";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#F5D4B5";
						colorSlave.areolaColor = "#CB988B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#F5D4B5";
						colorSlave.areolaColor = "#CB988B";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#F4D1A3";
						colorSlave.areolaColor = "#BA8E83";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#CFB48D";
						colorSlave.areolaColor = "#AC8074";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#CFB48D";
						colorSlave.areolaColor = "#AC8074";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#C38C4D";
						colorSlave.areolaColor = "#A67A6F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#C38C4D";
						colorSlave.areolaColor = "#A67A6F";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#9A774A";
						colorSlave.areolaColor = "#855E4E";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#855834";
						colorSlave.areolaColor = "#734B2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#83522B";
						colorSlave.areolaColor = "#68442A";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#83522B";
						colorSlave.areolaColor = "#68442A";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#724826";
						colorSlave.areolaColor = "#5C3D26";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#C38C4D";
						colorSlave.areolaColor = "#A67A6F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "southern european":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#EBDBE4";
						colorSlave.areolaColor = "#FFE4E0";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#EBDBE4";
						colorSlave.areolaColor = "#FFE4E0";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#F0D0CC";
						colorSlave.areolaColor = "#EAACBA";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#F0D0CC";
						colorSlave.areolaColor = "#EAACBA";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#F1C6B5";
						colorSlave.areolaColor = "#DCA2A9";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#F1C6B5";
						colorSlave.areolaColor = "#DCA2A9";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#F2BC94";
						colorSlave.areolaColor = "#EE8280";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#DCA972";
						colorSlave.areolaColor = "#BF7577";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#DCA972";
						colorSlave.areolaColor = "#BF7577";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#D0814C";
						colorSlave.areolaColor = "#A96767";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#D0814C";
						colorSlave.areolaColor = "#A96767";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#937453";
						colorSlave.areolaColor = "#7F5A4B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#7F5431";
						colorSlave.areolaColor = "#734B2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#784F2F";
						colorSlave.areolaColor = "#583E2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#784F2F";
						colorSlave.areolaColor = "#583E2F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#65422C";
						colorSlave.areolaColor = "#4A3A33";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#D0814C";
						colorSlave.areolaColor = "#A96767";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "semitic":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#E8CFCF";
						colorSlave.areolaColor = "#DCADBC";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#E8CFCF";
						colorSlave.areolaColor = "#DCADBC";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#FBCCC6";
						colorSlave.areolaColor = "#E79E8B";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#FBCCC6";
						colorSlave.areolaColor = "#E79E8B";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#EAAB92";
						colorSlave.areolaColor = "#D27B64";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#EAAB92";
						colorSlave.areolaColor = "#D27B64";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#EDA571";
						colorSlave.areolaColor = "#B16854";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#CC8D53";
						colorSlave.areolaColor = "#A7624F";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#CC8D53";
						colorSlave.areolaColor = "#A7624F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#CA7136";
						colorSlave.areolaColor = "#9B5959";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#CA7136";
						colorSlave.areolaColor = "#9B5959";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#84684A";
						colorSlave.areolaColor = "#735143";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#684528";
						colorSlave.areolaColor = "#563826";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#6E4730";
						colorSlave.areolaColor = "#604534";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#6E4730";
						colorSlave.areolaColor = "#604534";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#604534 ";
						colorSlave.areolaColor = "#514039";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#CA7136";
						colorSlave.areolaColor = "#9B5959";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "malay":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FBD1B2";
						colorSlave.areolaColor = "#F39E7D";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FBD1B2";
						colorSlave.areolaColor = "#F39E7D";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#E8B892";
						colorSlave.areolaColor = "#E2856C";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#E8B892";
						colorSlave.areolaColor = "#E2856C";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#EA9870";
						colorSlave.areolaColor = "#BE6C56";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#EA9870";
						colorSlave.areolaColor = "#BE6C56";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#EA9760";
						colorSlave.areolaColor = "#AB6755";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#BA855E";
						colorSlave.areolaColor = "#976051";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#BA855E";
						colorSlave.areolaColor = "#976051";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#A46138";
						colorSlave.areolaColor = "#8F5E51";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#A46138";
						colorSlave.areolaColor = "#8F5E51";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#7C563C";
						colorSlave.areolaColor = "#70493A";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#804A28";
						colorSlave.areolaColor = "#5F3F27";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#6F4523";
						colorSlave.areolaColor = "#623C20";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#6F4523";
						colorSlave.areolaColor = "#623C20";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#6F3E27";
						colorSlave.areolaColor = "#553823";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#A46138";
						colorSlave.areolaColor = "#8F5E51";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "indo-aryan":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#F8D4BE";
						colorSlave.areolaColor = "#F8B6A4";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#F8D4BE";
						colorSlave.areolaColor = "#F8B6A4";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#EFCCAF";
						colorSlave.areolaColor = "#EA9B86";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#EFCCAF";
						colorSlave.areolaColor = "#EA9B86";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#FCC49A";
						colorSlave.areolaColor = "#D29577";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#FCC49A";
						colorSlave.areolaColor = "#D29577";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#E8B68E";
						colorSlave.areolaColor = "#D08661";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#C17848";
						colorSlave.areolaColor = "#C36E45";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#C17848";
						colorSlave.areolaColor = "#C36E45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#C17848";
						colorSlave.areolaColor = "#A75A34";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#C17848";
						colorSlave.areolaColor = "#A75A34";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#83684B";
						colorSlave.areolaColor = "#715043";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#8A593C";
						colorSlave.areolaColor = "#714931";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#845834";
						colorSlave.areolaColor = "#614635";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#845834";
						colorSlave.areolaColor = "#614635";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#7C5842";
						colorSlave.areolaColor = "#5F4538";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#6B5449";
						colorSlave.areolaColor = "#473C37";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#6B5449";
						colorSlave.areolaColor = "#473C37";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#C17848";
						colorSlave.areolaColor = "#A75A34";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "pacific islander":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FBD1B2";
						colorSlave.areolaColor = "#F39E7D";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FBD1B2";
						colorSlave.areolaColor = "#F39E7D";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#E8B892";
						colorSlave.areolaColor = "#E2856C";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#E8B892";
						colorSlave.areolaColor = "#E2856C";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#EA9870";
						colorSlave.areolaColor = "#BE6C56";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#EA9870";
						colorSlave.areolaColor = "#BE6C56";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#EA9760";
						colorSlave.areolaColor = "#AB6755";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#BA855E";
						colorSlave.areolaColor = "#976051";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#BA855E";
						colorSlave.areolaColor = "#976051";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#A46138";
						colorSlave.areolaColor = "#8F5E51";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#A46138";
						colorSlave.areolaColor = "#8F5E51";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#7C563C";
						colorSlave.areolaColor = "#70493A";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#804A28";
						colorSlave.areolaColor = "#5F3F27";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#6F4523";
						colorSlave.areolaColor = "#623C20";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#6F4523";
						colorSlave.areolaColor = "#623C20";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
					case "black":
						colorSlave.skinColor = "#6F3E27";
						colorSlave.areolaColor = "#553823";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#583E2F";
						colorSlave.areolaColor = "#3F3A38";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#A46138";
						colorSlave.areolaColor = "#8F5E51";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			case "mixed race":
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FEE5CC";
						colorSlave.areolaColor = "#E3BBAB";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FEE5CC";
						colorSlave.areolaColor = "#E3BBAB";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#E6C2B0";
						colorSlave.areolaColor = "#D1A695";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#E6C2B0";
						colorSlave.areolaColor = "#D1A695";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#E1B59F";
						colorSlave.areolaColor = "#B48D7E";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#E1B59F";
						colorSlave.areolaColor = "#B48D7E";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#DAA782";
						colorSlave.areolaColor = "#9E7666";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#B27554";
						colorSlave.areolaColor = "#92684C";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#B27554";
						colorSlave.areolaColor = "#92684C";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#8B644F";
						colorSlave.areolaColor = "#7B5749";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#775031";
						colorSlave.areolaColor = "#69452F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#774A31";
						colorSlave.areolaColor = "#5E4434";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#774A31";
						colorSlave.areolaColor = "#5E4434";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
						colorSlave.skinColor = "#74523E";
						colorSlave.areolaColor = "#574135";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "black":
						colorSlave.skinColor = "#6B4B4B";
						colorSlave.areolaColor = "#413228";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#634F45";
						colorSlave.areolaColor = "#4E3C32";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#634F45";
						colorSlave.areolaColor = "#4E3C32";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
				break;

			default:
				switch (artSlave.skin) {
					case "pure white":
					case "ivory":
					case "white":
						colorSlave.skinColor = "#FEE5CC";
						colorSlave.areolaColor = "#E3BBAB";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "extremely pale":
					case "very pale":
						colorSlave.skinColor = "#FEE5CC";
						colorSlave.areolaColor = "#E3BBAB";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "pale":
						colorSlave.skinColor = "#E6C2B0";
						colorSlave.areolaColor = "#D1A695";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ffb9ca";
						break;
					case "extremely fair":
						colorSlave.skinColor = "#E6C2B0";
						colorSlave.areolaColor = "#D1A695";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "very fair":
						colorSlave.skinColor = "#E1B59F";
						colorSlave.areolaColor = "#B48D7E";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "fair":
						colorSlave.skinColor = "#E1B59F";
						colorSlave.areolaColor = "#B48D7E";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light":
						colorSlave.skinColor = "#DAA782";
						colorSlave.areolaColor = "#9E7666";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#ce6876";
						break;
					case "light olive":
						colorSlave.skinColor = "#B27554";
						colorSlave.areolaColor = "#92684C";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "tan":
						colorSlave.skinColor = "#B27554";
						colorSlave.areolaColor = "#92684C";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#c1a785";
						break;
					case "olive":
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
						break;
					case "bronze":
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark olive":
						colorSlave.skinColor = "#8B644F";
						colorSlave.areolaColor = "#7B5749";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "dark":
					case "light beige":
						colorSlave.skinColor = "#775031";
						colorSlave.areolaColor = "#69452F";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "beige":
					case "dark beige":
					case "light brown":
						colorSlave.skinColor = "#774A31";
						colorSlave.areolaColor = "#5E4434";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#5d2f1b";
						break;
					case "brown":
						colorSlave.skinColor = "#774A31";
						colorSlave.areolaColor = "#5E4434";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#714536";
						break;
					case "dark brown":
						colorSlave.skinColor = "#74523E";
						colorSlave.areolaColor = "#574135";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "black":
						colorSlave.skinColor = "#6B4B4B";
						colorSlave.areolaColor = "#413228";
						colorSlave.labiaColor = "#F977A3";
						break;
					case "ebony":
						colorSlave.skinColor = "#634F45";
						colorSlave.areolaColor = "#4E3C32";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#403030";
						break;
					case "pure black":
						colorSlave.skinColor = "#634F45";
						colorSlave.areolaColor = "#4E3C32";
						colorSlave.labiaColor = "#F977A3";
						break;
					default:
						colorSlave.skinColor = "#B6784E";
						colorSlave.areolaColor = "#8F5A45";
						colorSlave.labiaColor = "#F977A3";
						colorSlave.lipsColor = "#9e4c44";
				}
		}
	}
	return colorSlave;
};


App.Art.cacheArtData = function() {
	/**
	 * @param {NodeListOf<Element>} imagePassages
	 * @param {object} obj
	 */
	function cacheImages(imagePassages, obj) {
		obj.nodes = document.createDocumentFragment();
		obj.dict = new Map();

		for (const ip of imagePassages) {
			const name = ip.attributes.getNamedItem("name").value;
			let div = document.createElement("div");
			div.id = "div-" + name;
			const svgData = atob(ip.innerHTML.replace(/data:image\/svg\+xml;base64,/, ''));
			div.innerHTML = svgData;
			obj.nodes.appendChild(div);
			obj.dict.set(name, obj.dict.size);
		}
	}
	App.Data.Art = {};

	App.Data.Art.Vector = {};
	cacheImages(document.querySelectorAll('[tags="Twine.image"][name^="Art_Vector"]:not([ame^="Art_Vector_Revamp"])'), App.Data.Art.Vector);
	App.Data.Art.VectorRevamp = {};
	cacheImages(document.querySelectorAll('[tags="Twine.image"][name^="Art_Vector_Revamp"]'), App.Data.Art.VectorRevamp);
};

/**
 * @param {Element|DocumentFragment} e
 * @returns {string}
 */
App.Art.elementToMarkup = function(e) {
	const div = document.createElement("div");
	div.appendChild(e);
	// stripping <div>...</div>. This is probably not the wiser approach
	let s = div.outerHTML;
	return s.substr(5, s.length - 11);
};
