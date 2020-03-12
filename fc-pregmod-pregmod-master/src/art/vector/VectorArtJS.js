window.VectorArt = function(artSlave, artSize) {
	return App.Art.elementToMarkup(App.Art.SlaveArtElement(artSlave, artSize));
};

window.LegacyVectorArt = function(slave, artSize) {
	return App.Art.elementToMarkup(App.Art.legacyVectorArtElement(slave, artSize));
};

App.Art.vectorArtElement = (function() {
	"use strict";
	let T, slave;
	let leftArmType, rightArmType, legSize, torsoSize, buttSize, penisSize, hairLength, wearingLatex;
	let bellyScaleFactor, artBoobScaleFactor, heightScaleFactor;
	let artTranslationX, artTranslationY;
	let penisDrawtime, penisArt;
	/** @type {DocumentFragment} */
	let res;

	function VectorArt(artSlave, artSize) {
		/* set constants */
		T = State.temporary;
		slave = artSlave;
		wearingLatex = slave.clothes === "a Fuckdoll suit" || slave.clothes === "restrictive latex" || slave.clothes === "a latex catsuit";
		/* reset/initialize some variables */
		T.artTransformBelly = "";
		T.artTransformBoob = "";
		// eslint-disable-next-line camelcase
		T.art_transform = ""; /* in case other files are trying to use this, and expecting a string */

		res = document.createDocumentFragment();
		setStylesheet(artSize); /* initializes the stylesheet, and r */
		setArmType();
		setBoobScaling();
		setButtSize();
		setHairLength();
		setLegSize();
		setPenisSize();
		penisArtControl(); /* depends on setPenisSize and setBoobScaling, sets penisDrawtime and penisArtString */
		setTorsoSize();

		/*
		each function adds one layer of vector art
		vector art added later is drawn over previously added art
		(what is listed on the bottom in the code appears on the top of the image)
		*/
		ArtVectorHairBack();
		ArtVectorArm();
		ArtVectorAnalAccessories();
		ArtVectorButt();
		ArtVectorLeg();
		if (hasAnyLegs(slave)) {
			ArtVectorFeet(); /* includes shoes and leg outfits*/
		}
		ArtVectorTorso();
		ArtVectorPussy();
		ArtVectorPubicHair();
		if (slave.vaginaPiercing !== 0 || slave.clitPiercing !== 0) {
			ArtVectorPussyPiercings();
		}
		ArtVectorChastityBelt();
		ArtVectorTorsoOutfit(); /* note: clothing covers chastity belts */
		if (slave.scrotum > 0 && slave.balls > 0) {
			ArtVectorBalls();
		}
		if (penisDrawtime === 0) { /* for dicks behind boobs */
			res.appendChild(penisArt);
		}

		ArtVectorBelly(); /* includes navel piercing and belly-related clothing options */
		ArtVectorBoob(); /* includes areolae and piercings */
		if (penisDrawtime === 1) { /* for dicks in front of boobs */
			res.appendChild(penisArt);
		}

		ArtVectorBoobAddons(); /* piercings always appear in front of boobs AND dick */
		ArtVectorCollar(); /* includes clavicle artwork */
		ArtVectorHead(); /* glasses are drawn here */
		ArtVectorHairFore();

		return res;
	}

	function useSvg(id) {
		const cache = App.Data.Art.Vector;
		/** @type {HTMLElement} */
		const res = cache.nodes.children.item(cache.dict.get(id)).children.item(0).cloneNode(true);
		res.setAttribute("class", T.art_display_class);
		let transformNodes = res.querySelectorAll('g[data-transform]');
		for (const node of transformNodes) {
			switch (node.getAttribute("data-transform")) {
				case "boob":
					node.setAttribute("transform", T.artTransformBoob);
					break;
				case "belly":
					node.setAttribute("transform", T.artTransformBelly);
					break;
				case "balls":
					node.setAttribute("transform", T.artTransformBalls);
					break;
				case "art":
					if (T.art_transform) {
						node.setAttribute("transform", T.art_transform);
					}
					break;
			}
		}

		return res;
	}

	function setStylesheet(artSize) {
		let slaveHeightScale, margin, displayClass;

		/* prepare HTML color codes for slave display */
		/* note: latex clothing is mostly emulated by rubber color for skin (and shoes) */
		/* TODO: consistently use American "color" instead of "colour" for all identifiers */
		ArtVectorColor(slave);

		/* displayClass is the style class for this display */
		// eslint-disable-next-line camelcase
		if (T.art_display_id > 0) {
			T.art_display_id++;
		} else {
			// eslint-disable-next-line camelcase
			T.art_display_id = 1;
		}
		displayClass = `ad${T.art_display_id}`;
		// eslint-disable-next-line camelcase
		T.art_display_class = displayClass;

		/* setup height scaling and style */
		if (V.seeHeight === 0) {
			heightScaleFactor = 1;
		} else {
			heightScaleFactor = 200 / slave.height;
		}

		if (V.seeHeight === 0 || (V.seeHeight === 1 && artSize === 3)) {
			slaveHeightScale = 1;
			margin = 0;
		} else {
			slaveHeightScale = slave.height / 200;
			margin = Math.max(50 - (50 * slaveHeightScale), 0);
		}

		let st = document.createElement("style");
		st.innerHTML = `.${displayClass} {\
				position: absolute;\
				height: 100%;\
				transform: scale(${slaveHeightScale});\
				margin-top: ${margin}%;\
				margin-left: auto;\
				margin-right: auto;\
				left: 0;\
				right: 0;\
			}\
			.${displayClass} .white{ fill:#FFFFFF; }\
			.${displayClass} .skin{ fill:${T.skinColour}; }\
			.${displayClass} .head{ ${T.headSkinStyle}; }\
			.${displayClass} .torso{ ${T.torsoSkinStyle}; }\
			.${displayClass} .boob{ ${T.boobSkinStyle}; }\
			.${displayClass} .penis{ ${T.penisSkinStyle}; }\
			.${displayClass} .scrotum{ ${T.scrotumSkinStyle}; }\
			.${displayClass} .belly{ ${T.bellySkinStyle}; }\
			.${displayClass} .areola{ fill:${T.areolaStyle}; }\
			.${displayClass} .bellybutton{ fill:${T.bellybuttonStyle}; }\
			.${displayClass} .labia{ fill:${T.labiaStyle}; }\
			.${displayClass} .hair{ fill:${T.hairColour}; }\
			.${displayClass} .pubic_hair{ fill:${T.pubicHairColour}; }\
			.${displayClass} .underarm_hair{ fill:${T.underarmHairColour}; }\
			.${displayClass} .eyebrow_hair{ fill:${T.eyebrowHairColour}; }\
			.${displayClass} .shoe{ fill:${T.shoeColour}; }\
			.${displayClass} .shoe_shadow{ fill:${T.shoeShadowColour}; }\
			.${displayClass} .smart_piercing{ fill:#4DB748; }\
			.${displayClass} .steel_piercing{ fill:#787878; }\
			.${displayClass} .steel_chastity{ fill:#BABABA; }\
			.${displayClass} .outfit_base{ fill:${T.outfitBaseColour}; }\
			.${displayClass} .gag{ fill:#BF2126; }\
			.${displayClass} .shadow{ fill:#010101; }\
			.${displayClass} .glasses{ fill:${T.glassesColor}; }\
			.${displayClass} .eye{ fill:${T.eyeColor}; }\
			.${displayClass} .sclera{ fill:${T.sclerae}; }\
		`;
		res.appendChild(st);
	}

	function setArmType() {
		if (hasAnyArms(slave)) {
			if (slave.devotion > 50) {
				leftArmType = "High";
				rightArmType = "High";
			} else if (slave.trust >= -20) {
				if (slave.devotion < -20) {
					leftArmType = "Rebel";
					rightArmType = "Low";
				} else if (slave.devotion <= 20) {
					leftArmType = "Low";
					rightArmType = "Low";
				} else {
					leftArmType = "Mid";
					rightArmType = "High";
				}
			} else {
				leftArmType = "Mid";
				rightArmType = "Mid";
			}
			if (!hasLeftArm(slave)) {
				leftArmType = "None";
			} else if (!hasRightArm(slave)) {
				rightArmType = "None";
			}
		} else {
			leftArmType = "None";
			rightArmType = "None";
		}
	}

	function setBoobScaling() {
		/*
		Prepare SVG transform matrix for continuous boob scaling.
		This transform affects boobs, areolae and piercings.
		The parameters were fit by points (300,1.0) and (15000,2.5).
		See https://www.wolframalpha.com/input/?i=log+fit+%7B%7B300,1%7D,%7B15000,2.5%7D%7D .
		Boobs start at 300cc as of "flesh description widgets".
		Upper value was discussed at https://github.com/Free-Cities/Free-Cities/issues/950#issuecomment-321359466 .
		*/
		if (slave.boobs < 300) {
			artBoobScaleFactor = 1;
			artTranslationX = 22; /* a little shift to the right is needed due to perspective */
			artTranslationY = 0;
		} else {
			artBoobScaleFactor = 0.383433 * Math.log(0.0452403 * slave.boobs) * heightScaleFactor;
			artTranslationX = -282.841 * artBoobScaleFactor + 292.349;
			artTranslationY = -225.438 * artBoobScaleFactor + 216.274;
		}
		T.artTransformBoob = `matrix(${artBoobScaleFactor},0,0,${artBoobScaleFactor},${artTranslationX},${artTranslationY})`;
	}

	function setButtSize() {
		/* Size calculations - needs to be done even for amputees */
		buttSize = Math.clamp(Math.trunc(slave.butt), 1, 7) - 1;
	}

	function setHairLength() {
		hairLength = undefined;
		if (slave.hLength >= 60) {
			hairLength = "Long";
		} else if (slave.hLength >= 30) {
			hairLength = "Medium";
		} else if (slave.hLength >= 10) {
			hairLength = "Short";
		}
	}

	function setLegSize() {
		/* Leg wideness switch courtesy of Nov-X */
		/* needs to be done even for amputees */
		if (slave.hips === -2) {
			if (slave.weight <= 0) {
				legSize = "Narrow";
			} else if (slave.weight < 161) {
				legSize = "Normal";
			} else {
				legSize = "Wide";
			}
		} else if (slave.hips === -1) {
			if (slave.weight <= -11) {
				legSize = "Narrow";
			} else if (slave.weight < 96) {
				legSize = "Normal";
			} else {
				legSize = "Wide";
			}
		} else if (slave.hips === 0) {
			if (slave.weight <= -96) {
				legSize = "Narrow";
			} else if (slave.weight < 11) {
				legSize = "Normal";
			} else if (slave.weight < 131) {
				legSize = "Wide";
			} else {
				legSize = "Thick";
			}
		} else if (slave.hips === 1) {
			if (slave.weight <= -31) {
				legSize = "Normal";
			} else if (slave.weight < 31) {
				legSize = "Wide";
			} else {
				legSize = "Thick";
			}
		} else { /* .hips === 2 or 3 */
			if (slave.weight <= -11) {
				legSize = "Wide";
			} else {
				legSize = "Thick";
			}
		}
	}

	function setPenisSize() {
		penisSize = undefined;
		if ((slave.dick > 6 && slave.drugs !== "priapism agents") || (slave.dick > 0 && slave.belly <= 4000)) {
			penisSize = Math.clamp(slave.dick, 1, 11) - 1;
		}
	}

	function penisArtControl() {
		penisArt = document.createDocumentFragment();
		if (penisSize === undefined) {
			penisDrawtime = -1; /* no penis to draw */
		} else if (State.variables.showClothingErection) {
			penisDrawtime = 0; /* default is to draw before boobs/belly */
			switch (slave.clothes) {
				/* BULGE OUTFITS WITH ERECTION: LONG OUTFITS */
				case "an apron":
				case "a ball gown":
				case "a biyelgee costume":
				case "a comfortable bodysuit":
				case "a burkini":
				case "a burqa":
				case "a halter top dress":
				case "a hijab and abaya":
				case "a klan robe":
				case "a leotard":
				case "a slutty maid outfit":
				case "a military uniform":
				case "a mini dress":
				case "a monokini":
				case "a niqab and abaya":
				case "a nice nurse outfit":
				case "a one-piece swimsuit":
				case "a red army uniform":
				case "a schutzstaffel uniform":
				case "a slutty schutzstaffel uniform":
				case "a slave gown":
				case "a succubus outfit":
				case "nice business attire":
				case "a bunny outfit":
				case "a chattel habit":
				case "a huipil":
				case "a kimono":
				case "a maternity dress":
				case "a slutty qipao":
				case "a long qipao":
				case "a toga":
				case "a penitent nuns habit":
					if ((canAchieveErection(slave)) && (slave.chastityPenis !== 1)) {
						penisArt.appendChild(useSvg(`Art_Vector_Bulge_Outfit_Hard_${penisSize}`));
						break; /* IN CASE OF NO ERECTION, SKIP TO A NORMAL BULGE */	// FIXME: having a break in an if is bad code
					}
				/* BULGE OUTFITS LONG OUTFITS */
				// eslint-disable-next-line no-fallthrough
				case "a cheerleader outfit":
				case "battlearmor":
				case "battledress":
				case "cutoffs and a t-shirt":
				case "cutoffs":
				case "clubslut netting":
				case "a cybersuit":
				case "a latex catsuit":
				case "a nice maid outfit":
				case "a hijab and blouse":
				case "jeans":
				case "leather pants and a tube top":
				case "leather pants and pasties":
				case "leather pants":
				case "lederhosen":
				case "a slutty nurse outfit":
				case "a police uniform":
				case "a schoolgirl outfit":
				case "a slutty outfit":
				case "spats and a tank top":
				case "sport shorts":
				case "sport shorts and a sports bra":
				case "sport shorts and a t-shirt":
				case "slutty business attire":
				case "a sweater and cutoffs":
				case "a sweater and panties":
				case "a t-shirt and jeans":
				case "a t-shirt and panties":
				case "a tank-top and panties":
				case "conservative clothing":
				case "stretch pants and a crop-top":
					penisArt.appendChild(useSvg(`Art_Vector_Bulge_Outfit_${penisSize}`));
					break;
				/* SMALL BULGE ONLY (SHORT) OUTFITS */
				case "boyshorts":
				case "a button-up shirt and panties":
				case "kitty lingerie":
				case "a slutty klan robe":
				case "a mounty outfit":
				case "panties and pasties":
				case "panties":
				case "an oversized t-shirt and boyshorts":
				case "a scalemail bikini":
				case "a skimpy loincloth":
				case "striped panties":
				case "striped underwear":
				case "a t-shirt and thong":
				case "a thong":
				case "a tube top and thong":
				case "attractive lingerie for a pregnant woman":
				case "harem gauze":
					if (slave.belly <= 4000) {
						if (slave.dick > 3) {
							penisArt.appendChild(useSvg("Art_Vector_Bulge_Outfit_3"));
						} else {
							penisArt.appendChild(useSvg(`Art_Vector_Bulge_Outfit_${penisSize}`));
						}
					}
					break;
				/* NO BULGE, EVERYTHING HIDDEN */
				case "a dirndl":
				case "a gothic lolita dress":
				case "a hanbok":
					break;
				/* full frontal */
				default:
					if ((canAchieveErection(slave)) && (slave.chastityPenis !== 1)) {
						penisDrawtime = 1; /* draw erect penis over boobs if boobs do not hide the penis' base */
						if (artBoobScaleFactor < 3.7) {
							if (slave.foreskin !== 0) {
								penisArt.appendChild(useSvg(`Art_Vector_Penis_${penisSize}`));
							} else {
								penisArt.appendChild(useSvg(`Art_Vector_PenisCirc_${penisSize}`));
							}
						}
					} else {
						/* flaccid penises are drawn behind the boobs/belly */
						if (slave.foreskin !== 0) {
							penisArt.appendChild(useSvg(`Art_Vector_Flaccid_${penisSize}`));
						} else {
							penisArt.appendChild(useSvg(`Art_Vector_FlaccidCirc_${penisSize}`));
						}
						/* this draws chastity OVER latex catsuit. prndev finds this alright. */
						if (slave.chastityPenis === 1) {
							penisArt.appendChild(useSvg(`Art_Vector_Chastity_Cage_${penisSize}`));
						}
					}
			}
		} else {
			penisDrawtime = 0; /* default is to draw before boobs/belly */
			switch (slave.clothes) {
				/* BULGE OUTFITS LONG+MEDIUM OUTFITS */
				case "a ball gown":
				case "a biyelgee costume":
				case "a burkini":
				case "a burqa":
				case "a dirndl":
				case "a halter top dress":
				case "a hijab and abaya":
				case "a hijab and blouse":
				case "a kimono":
				case "a klan robe":
				case "a long qipao":
				case "a maternity dress":
				case "a military uniform":
				case "a mounty outfit":
				case "a nice maid outfit":
				case "a nice nurse outfit":
				case "a niqab and abaya":
				case "a police uniform":
				case "a red army uniform":
				case "a schutzstaffel uniform":
				case "a skimpy loincloth":
				case "a slave gown":
				case "a slutty nurse outfit":
				case "a slutty schutzstaffel uniform":
				case "a t-shirt and jeans":
				case "a toga":
				case "an apron":
				case "battlearmor":
				case "battledress":
				case "conservative clothing":
				case "jeans":
				case "leather pants":
				case "leather pants and a tube top":
				case "leather pants and pasties":
				case "lederhosen":
				case "nice business attire":
				case "slutty business attire":
				case "spats and a tank top":
				case "sport shorts":
				case "sport shorts and a sports bra":
				case "sport shorts and a t-shirt":
				case "stretch pants and a crop-top":
					penisArt.appendChild(useSvg(`Art_Vector_Bulge_Outfit_${penisSize}`));
					break;
				/* BULGE OUTFITS SHORT OUTFITS */
				case "a bunny outfit":
				case "a button-up shirt and panties":
				case "a chattel habit":
				case "a huipil":
				case "a leotard":
				case "a mini dress":
				case "a monokini":
				case "a one-piece swimsuit":
				case "a penitent nuns habit":
				case "a scalemail bikini":
				case "a slutty klan robe":
				case "a slutty maid outfit":
				case "a slutty outfit":
				case "a slutty qipao":
				case "a succubus outfit":
				case "a sweater and cutoffs":
				case "a sweater and panties":
				case "a t-shirt and panties":
				case "a t-shirt and thong":
				case "a tank-top and panties":
				case "a thong":
				case "a tube top and thong":
				case "an oversized t-shirt and boyshorts":
				case "attractive lingerie for a pregnant woman":
				case "boyshorts":
				case "cutoffs":
				case "cutoffs and a t-shirt":
				case "harem gauze":
				case "kitty lingerie":
				case "panties":
				case "panties and pasties":
				case "striped panties":
				case "striped underwear":
					if (slave.belly <= 4000) {
						if (slave.dick > 3) {
							penisArt.appendChild(useSvg("Art_Vector_Bulge_Outfit_3"));
						} else {
							penisArt.appendChild(useSvg(`Art_Vector_Bulge_Outfit_${penisSize}`));
						}
					}
					break;
				/* hide everything */
				case "a cheerleader outfit":
				case "a gothic lolita dress":
				case "a hanbok":
				case "a schoolgirl outfit":
					break;
				/* full frontal */
				default:
					if ((canAchieveErection(slave)) && (slave.chastityPenis !== 1)) {
						penisDrawtime = 1; /* draw erect penis over boobs if boobs do not hide the penis' base */
						if (artBoobScaleFactor < 3.7) {
							if (slave.foreskin !== 0) {
								penisArt.appendChild(useSvg(`Art_Vector_Penis_${penisSize}`));
							} else {
								penisArt.appendChild(useSvg(`Art_Vector_PenisCirc_${penisSize}`));
							}
						}
					} else {
						/* flaccid penises are drawn behind the boobs/belly */
						if (slave.foreskin !== 0) {
							penisArt.appendChild(useSvg(`Art_Vector_Flaccid_${penisSize}`));
						} else {
							penisArt.appendChild(useSvg(`Art_Vector_FlaccidCirc_${penisSize}`));
						}
						/* this draws chastity OVER latex catsuit. prndev finds this alright. */
						if (slave.chastityPenis === 1) {
							penisArt.appendChild(useSvg(`Art_Vector_Chastity_Cage_${penisSize}`));
						}
					}
			}
		}
	}

	function setTorsoSize() {
		/* Torso size switch courtesy of Nov-X */
		if (slave.waist >= 96) {
			if (slave.weight >= 96) {
				torsoSize = "Obese";
			} else if (slave.weight >= 11) {
				torsoSize = "Fat";
			} else if (slave.weight > -31) {
				torsoSize = "Chubby";
			} else {
				torsoSize = "Normal";
			}
		} else if (slave.waist >= 41) {
			if (slave.weight >= 131) {
				torsoSize = "Obese";
			} else if (slave.weight >= 31) {
				torsoSize = "Fat";
			} else if (slave.weight >= 0) {
				torsoSize = "Chubby";
			} else if (slave.weight > -96) {
				torsoSize = "Normal";
			} else {
				torsoSize = "Hourglass";
			}
		} else if (slave.waist >= 11) {
			if (slave.weight >= 161) {
				torsoSize = "Obese";
			} else if (slave.weight >= 96) {
				torsoSize = "Fat";
			} else if (slave.weight >= 11) {
				torsoSize = "Chubby";
			} else if (slave.weight > -31) {
				torsoSize = "Normal";
			} else {
				torsoSize = "Hourglass";
			}
		} else if (slave.waist > -11) {
			if (slave.weight >= 191) {
				torsoSize = "Obese";
			} else if (slave.weight >= 131) {
				torsoSize = "Fat";
			} else if (slave.weight >= 31) {
				torsoSize = "Chubby";
			} else if (slave.weight >= 0) {
				torsoSize = "Normal";
			} else if (slave.weight > -96) {
				torsoSize = "Hourglass";
			} else {
				torsoSize = "Unnatural";
			}
		} else if (slave.waist > -41) {
			if (slave.weight >= 161) {
				torsoSize = "Fat";
			} else if (slave.weight >= 96) {
				torsoSize = "Chubby";
			} else if (slave.weight >= 11) {
				torsoSize = "Normal";
			} else if (slave.weight > -31) {
				torsoSize = "Hourglass";
			} else {
				torsoSize = "Unnatural";
			}
		} else if (slave.waist > -96) {
			if (slave.weight >= 191) {
				torsoSize = "Fat";
			} else if (slave.weight >= 131) {
				torsoSize = "Chubby";
			} else if (slave.weight >= 31) {
				torsoSize = "Normal";
			} else if (slave.weight > -11) {
				torsoSize = "Hourglass";
			} else {
				torsoSize = "Unnatural";
			}
		} else {
			if (slave.weight >= 161) {
				torsoSize = "Chubby";
			} else if (slave.weight >= 96) {
				torsoSize = "Normal";
			} else if (slave.weight > 0) {
				torsoSize = "Hourglass";
			} else {
				torsoSize = "Unnatural";
			}
		}
	}

	function ArtVectorAnalAccessories() {
		if (slave.buttplug === "long plug") {
			res.appendChild(useSvg("Art_Vector_Plug_Long"));
		} else if (slave.buttplug === "large plug") {
			res.appendChild(useSvg("Art_Vector_Plug_Large"));
		} else if (slave.buttplug === "long, large plug") {
			res.appendChild(useSvg("Art_Vector_Plug_Large_Long"));
		} else if (slave.buttplug === "huge plug") {
			res.appendChild(useSvg("Art_Vector_Plug_Huge"));
		} else if (slave.buttplug === "long, huge plug") {
			res.appendChild(useSvg("Art_Vector_Plug_Huge_Long"));
		}

		if (slave.buttplugAttachment === "tail") {
			res.appendChild(useSvg("Art_Vector_Plug_Tail"));
		} else if (slave.buttplugAttachment === "cat tail") {
			res.appendChild(useSvg("Art_Vector_Cat_Tail"));
		}
	}

	function ArtVectorArm() {
		/* Arms position switch courtesy of Nov-X */
		/* Updated 2018-10-25 by Fr0g */
		/* - changed arm calculation block position*/
		/* - added brackets to make boolean logic run */

		/* Many amputee clothing art files exist, but draw nothing.They are excluded for now to reduce on rendering time. This is usually indicated by hasLeftArm(slave) checks and similar.
		res.appendChild(useSvg("Art_Vector_Arm_Right_None"));
		res.appendChild(useSvg("Art_Vector_Arm_Left_None"));
		*/

		/* left */
		if (hasLeftArm(slave)) {
			if (getLeftArmID(slave) === 1) {
				res.appendChild(useSvg(`Art_Vector_Arm_Left_${leftArmType}`));
				if (slave.muscles >= 6) {
					if (leftArmType === "High") {
						res.appendChild(useSvg("Art_Vector_Arm_Left_High_MLight"));
					} else if (leftArmType === "Mid") {
						res.appendChild(useSvg("Art_Vector_Arm_Left_Mid_MLight"));
					} else if (leftArmType === "Low") {
						res.appendChild(useSvg("Art_Vector_Arm_Left_Low_MLight"));
					} else if (leftArmType === "Rebel") {
						res.appendChild(useSvg("Art_Vector_Arm_Left_Rebel_MLight"));
					}
				}
			} else if (getLeftArmID(slave) === 2) {
				res.appendChild(useSvg(`Art_Vector_Arm_Left_ProstheticBasic_${rightArmType}`));
			} else if (getLeftArmID(slave) === 3) {
				res.appendChild(useSvg(`Art_Vector_Arm_Left_ProstheticSexy_${rightArmType}`));
			} else if (getLeftArmID(slave) === 4) {
				res.appendChild(useSvg(`Art_Vector_Arm_Left_ProstheticBeauty_${rightArmType}`));
			} else if (getLeftArmID(slave) === 5) {
				res.appendChild(useSvg(`Art_Vector_Arm_Left_ProstheticCombat_${rightArmType}`));
			} else if (getLeftArmID(slave) === 6) {
				res.appendChild(useSvg(`Art_Vector_Arm_Left_ProstheticSwiss_${rightArmType}`));
			}
		}


		/* right */
		if (hasRightArm(slave)) {
			if (getRightArmID(slave) === 1) {
				res.appendChild(useSvg(`Art_Vector_Arm_Right_${rightArmType}`));
				if (slave.muscles >= 6) {
					if (rightArmType === "High") {
						res.appendChild(useSvg("Art_Vector_Arm_Right_High_MLight"));
					} else if (rightArmType === "Mid") {
						res.appendChild(useSvg("Art_Vector_Arm_Right_Mid_MLight"));
					} else if (rightArmType === "Low") {
						res.appendChild(useSvg("Art_Vector_Arm_Right_Low_MLight"));
					}
				}
			} else if (getRightArmID(slave) === 2) {
				res.appendChild(useSvg(`Art_Vector_Arm_Right_ProstheticBasic_${rightArmType}`));
			} else if (getRightArmID(slave) === 3) {
				res.appendChild(useSvg(`Art_Vector_Arm_Right_ProstheticSexy_${rightArmType}`));
			} else if (getRightArmID(slave) === 4) {
				res.appendChild(useSvg(`Art_Vector_Arm_Right_ProstheticBeauty_${rightArmType}`));
			} else if (getRightArmID(slave) === 5) {
				res.appendChild(useSvg(`Art_Vector_Arm_Right_ProstheticCombat_${rightArmType}`));
			} else if (getRightArmID(slave) === 6) {
				res.appendChild(useSvg(`Art_Vector_Arm_Right_ProstheticSwiss_${rightArmType}`));
			}
		}

		/* shiny clothing */
		if (V.seeVectorArtHighlights === 1) {
			if (wearingLatex === true || slave.clothes === "body oil") {
				/* only some arm positions have art (feel free to add more) */
				if (leftArmType === "High") {
					res.appendChild(useSvg("Art_Vector_Arm_Outfit_Shine_Left_High"));
				} else if (leftArmType === "Mid") {
					res.appendChild(useSvg("Art_Vector_Arm_Outfit_Shine_Left_Mid"));
				} else if (leftArmType === "Low") {
					res.appendChild(useSvg("Art_Vector_Arm_Outfit_Shine_Left_Low"));
				}
			}
		}

		/* TODO: simplify selection (select prefix, infix and suffix and combine instead of using switch statements) */
		switch (slave.clothes) {
			case "a biyelgee costume":
			case "a burkini":
			case "a button-up shirt":
			case "a button-up shirt and panties":
			case "a cheerleader outfit":
			case "a dirndl":
			case "a gothic lolita dress":
			case "a hanbok":
			case "a hijab and blouse":
			case "a huipil":
			case "a kimono":
			case "a klan robe":
			case "a long qipao":
			case "a military uniform":
			case "a mounty outfit":
			case "a nice maid outfit":
			case "a nice nurse outfit":
			case "a police uniform":
			case "a red army uniform":
			case "a schoolgirl outfit":
			case "a slutty klan robe":
			case "a slutty nurse outfit":
			case "a slutty qipao":
			case "a sweater":
			case "a sweater and cutoffs":
			case "a sweater and panties":
			case "a t-shirt":
			case "a t-shirt and jeans":
			case "a t-shirt and panties":
			case "a t-shirt and thong":
			case "an oversized t-shirt":
			case "an oversized t-shirt and boyshorts":
			case "battlearmor":
			case "battledress":
			case "clubslut netting":
			case "conservative clothing":
			case "cutoffs and a t-shirt":
			case "lederhosen":
			case "nice business attire":
			case "slutty business attire":
			case "slutty jewelry":
			case "sport shorts and a t-shirt":
			case "Western clothing":
				if (hasRightArm(slave)) {
					res.appendChild(useSvg(`Art_Vector_Arm_Outfit_${clothing2artSuffix(slave.clothes)}_Right_${rightArmType}`));
				}
				if (hasLeftArm(slave)) {
					res.appendChild(useSvg(`Art_Vector_Arm_Outfit_${clothing2artSuffix(slave.clothes)}_Left_${leftArmType}`));
				}
				break;
			/* manually handle special cases */
			case "a schutzstaffel uniform":
			case "a slutty schutzstaffel uniform":
				if (hasRightArm(slave)) {
					res.appendChild(useSvg(`Art_Vector_Arm_Outfit_SchutzstaffelUniform_Right_${rightArmType}`));
				}
				if (hasLeftArm(slave)) {
					res.appendChild(useSvg(`Art_Vector_Arm_Outfit_SchutzstaffelUniform_Left_${leftArmType}`));
				}
				break;
			case "a hijab and abaya":
			case "a niqab and abaya":
			case "a burqa":
				if (hasRightArm(slave)) {
					res.appendChild(useSvg(`Art_Vector_Arm_Outfit_HijabAndAbaya_Right_${rightArmType}`));
				}
				if (hasLeftArm(slave)) {
					res.appendChild(useSvg(`Art_Vector_Arm_Outfit_HijabAndAbaya_Left_${leftArmType}`));
				}
				break;
			case "a slave gown":
				/* only some arm positions have art (feel free to add more) */
				if (hasLeftArm(slave)) {
					if (leftArmType !== "Rebel") {
						res.appendChild(useSvg(`Art_Vector_Arm_Outfit_SlaveGown_Left_${leftArmType}`));
					}
				}
		}
	}

	function ArtVectorBalls() {
		let ballsScaleFactor;
		switch (slave.clothes) {
			case "a bra":
			case "a button-up shirt":
			case "a comfortable bodysuit":
			case "a cybersuit":
			case "a fallen nuns habit":
			case "a latex catsuit":
			case "a nice pony outfit":
			case "a Santa dress":
			case "a slutty pony outfit":
			case "a sports bra":
			case "a string bikini":
			case "a striped bra":
			case "a sweater":
			case "a t-shirt":
			case "a tank-top":
			case "a tube top":
			case "an oversized t-shirt":
			case "attractive lingerie":
			case "body oil":
			case "chains":
			case "choosing her own clothes":
			case "clubslut netting":
			case "no clothing":
			case "overalls":
			case "restrictive latex":
			case "shibari ropes":
			case "slutty jewelry":
			case "uncomfortable straps":
			case "Western clothing":
				ballsScaleFactor = (slave.scrotum / 3) * heightScaleFactor;
				artTranslationX = -271 * (ballsScaleFactor - 1);
				artTranslationY = -453 * (ballsScaleFactor - 1);
				T.artTransformBalls = `matrix(${ballsScaleFactor},0,0,${ballsScaleFactor},${artTranslationX},${artTranslationY})`;
				res.appendChild(useSvg("Art_Vector_Balls"));
		}
	}

	function ArtVectorBelly() {
		if (slave.belly >= 2000) {
			/* add pregnancy belly, scale dynamically (clothing and addons can be scaled, too) */
			/* TODO: add check in penis control. do not draw penis atop belly if _art_belly_scale_factor > 1. */
			bellyScaleFactor = 0.300 * Math.log(0.011 * slave.belly) * heightScaleFactor;
			artTranslationX = -262 * (bellyScaleFactor - 1);
			artTranslationY = -284 * (bellyScaleFactor - 1);
			T.artTransformBelly = `matrix(${bellyScaleFactor},0,0,${bellyScaleFactor},${artTranslationX},${artTranslationY})`;

			if (slave.navelPiercing === 1) {
				res.appendChild(useSvg("Art_Vector_Belly_Pregnant_Piercing"));
			} else if (slave.navelPiercing === 2) {
				res.appendChild(useSvg("Art_Vector_Belly_Pregnant_Piercing_Heavy"));
			} else {
				res.appendChild(useSvg("Art_Vector_Belly"));
			}

			switch (slave.clothes) {
				case "a bra":
				case "a cybersuit":
				case "a Fuckdoll suit":
				case "a latex catsuit":
				case "a nice pony outfit":
				case "a Santa dress":
				case "overalls":
				case "a scalemail bikini":
				case "a skimpy loincloth":
				case "a slutty klan robe":
				case "a slutty outfit":
				case "a slutty pony outfit":
				case "a sports bra":
				case "a string bikini":
				case "a striped bra":
				case "a thong":
				case "a tube top":
				case "a tube top and thong":
				case "attractive lingerie":
				case "attractive lingerie for a pregnant woman":
				case "body oil":
				case "boyshorts":
				case "chains":
				case "choosing her own clothes":
				case "cutoffs":
				case "jeans":
				case "kitty lingerie":
				case "leather pants":
				case "leather pants and a tube top":
				case "leather pants and pasties":
				case "no clothing":
				case "panties":
				case "panties and pasties":
				case "pasties":
				case "restrictive latex":
				case "shibari ropes":
				case "slutty jewelry":
				case "sport shorts":
				case "sport shorts and a sports bra":
				case "stretch pants and a crop-top":
				case "striped panties":
				case "striped underwear":
				case "uncomfortable straps":
					break; /* do nothing for these choices */
				/* manually handle special cases */
				case "a slutty schutzstaffel uniform":
					res.appendChild(useSvg("Art_Vector_Belly_Outfit_SchutzstaffelUniform"));
					break;
				case "a niqab and abaya":
				case "a burqa":
					res.appendChild(useSvg("Art_Vector_Belly_Outfit_HijabAndAbaya"));
					break;
				default:
					res.appendChild(useSvg(`Art_Vector_Belly_Outfit_${clothing2artSuffix(slave.clothes)}`));
			}
			/* shiny clothing */
			if (V.seeVectorArtHighlights === 1) {
				if (wearingLatex === true || slave.clothes === "body oil") {
					res.appendChild(useSvg("Art_Vector_Belly_Outfit_Shine"));
				}
			}
		}
		/* belly piercings for flat bellies */
		if (slave.belly === 0) {
			if (slave.navelPiercing === 1) {
				res.appendChild(useSvg("Art_Vector_Belly_Piercing"));
			} else if (slave.navelPiercing === 2) {
				res.appendChild(useSvg("Art_Vector_Belly_Piercing_Heavy"));
			}
		}
		/* Torso Accessories */
		if ((slave.bellyAccessory === "a corset" || slave.bellyAccessory === "an extreme corset") && slave.belly <= 1500) {
			if (torsoSize === "Normal") {
				res.appendChild(useSvg("Art_Vector_Corsetnormal"));
			} else if (torsoSize === "Hourglass") {
				res.appendChild(useSvg("Art_Vector_Corsethourglass"));
			} else if (torsoSize === "Unnatural") {
				res.appendChild(useSvg("Art_Vector_Corsetunnatural"));
			}
		} else if (slave.bellyAccessory === "a small empathy belly") {
			res.appendChild(useSvg("Art_Vector_Empathy_Belly_Small"));
		} else if (slave.bellyAccessory === "a medium empathy belly") {
			res.appendChild(useSvg("Art_Vector_Empathy_Belly_Medium"));
		} else if (slave.bellyAccessory === "a large empathy belly") {
			res.appendChild(useSvg("Art_Vector_Empathy_Belly_Large"));
		} else if (slave.bellyAccessory === "a huge empathy belly") {
			res.appendChild(useSvg("Art_Vector_Empathy_Belly_Huge"));
		}
	}

	function ArtVectorBoob() {
		if (slave.boobs < 300) {
			/* BEWARE: this threshold may be used in other art-related code, too */
			/* boobs too small - draw areolae directly onto torso */
		} else {
			res.appendChild(useSvg("Art_Vector_Boob_Alt"));
			/* shiny clothing */
			if (V.seeVectorArtHighlights === 1) {
				if (slave.fuckdoll !== 0 || slave.clothes === "a latex catsuit" || slave.clothes === "body oil") {
					res.appendChild(useSvg("Art_Vector_Boob_Outfit_Shine"));
				}
			}
		}
		switch (slave.clothes) { /* display nipples/areola for the following clothes */
			case "a chattel habit":
			case "a fallen nuns habit":
			case "a Fuckdoll suit":
			case "a monokini":
			case "a nice pony outfit":
			case "a Santa dress":
			case "overalls":
			case "a skimpy loincloth":
			case "a slutty pony outfit":
			case "a string bikini":
			case "a succubus outfit":
			case "a thong":
			case "a toga":
			case "attractive lingerie for a pregnant woman":
			case "body oil":
			case "boyshorts":
			case "chains":
			case "choosing her own clothes":
			case "clubslut netting":
			case "cutoffs":
			case "jeans":
			case "leather pants":
			case "no clothing":
			case "panties":
			case "restrictive latex":
			case "shibari ropes":
			case "slutty jewelry":
			case "sport shorts":
			case "striped panties":
			case "uncomfortable straps":
				if (slave.areolaeShape === "star") {
					res.appendChild(useSvg("Art_Vector_Boob_Areola_Star"));
				} else if (slave.areolaeShape === "heart") {
					res.appendChild(useSvg("Art_Vector_Boob_Areola_Heart"));
				} else if (slave.areolae === 0) {
					res.appendChild(useSvg("Art_Vector_Boob_Areola"));
				} else if (slave.areolae === 1) {
					res.appendChild(useSvg("Art_Vector_Boob_Areola_Large"));
				} else if (slave.areolae === 2) {
					res.appendChild(useSvg("Art_Vector_Boob_Areola_Wide"));
				} else if (slave.areolae >= 3) {
					res.appendChild(useSvg("Art_Vector_Boob_Areola_Huge"));
				}

				if (slave.nipples === "tiny") {
					res.appendChild(useSvg("Art_Vector_Boob_NippleTiny"));
				} else if (slave.nipples === "cute") {
					res.appendChild(useSvg("Art_Vector_Boob_NippleCute"));
				} else if (slave.nipples === "puffy") {
					res.appendChild(useSvg("Art_Vector_Boob_NipplePuffy"));
				} else if (slave.nipples === "inverted") {
					res.appendChild(useSvg("Art_Vector_Boob_NippleInverted"));
				} else if (slave.nipples === "huge") {
					res.appendChild(useSvg("Art_Vector_Boob_NippleHuge"));
				} else if (slave.nipples === "partially inverted") {
					res.appendChild(useSvg("Art_Vector_Boob_NipplePartiallyInverted"));
				} else if (slave.nipples === "fuckable") {
					res.appendChild(useSvg("Art_Vector_Boob_NippleFuckable"));
				}
		}
	}

	function ArtVectorBoobAddons() {
		if (slave.boobs < 300) {
			/* boobs too small: do not show boob-related art */
			/* BEWARE: this threshold should be kept in sync with the one in Art_Vector_Boob_ */
		} else {
			switch (slave.clothes) {
				case "a chattel habit":
				case "a comfortable bodysuit":
				case "a cybersuit":
				case "a fallen nuns habit":
				case "a Fuckdoll suit":
				case "a latex catsuit":
				case "a nice pony outfit":
				case "a Santa dress":
				case "overalls":
				case "a skimpy loincloth":
				case "a slutty pony outfit":
				case "a succubus outfit":
				case "a thong":
				case "body oil":
				case "boyshorts":
				case "choosing her own clothes":
				case "cutoffs":
				case "jeans":
				case "leather pants":
				case "no clothing":
				case "panties":
				case "restrictive latex":
				case "sport shorts":
				case "striped panties":
				case "a bimbo outfit":
				case "a courtesan dress":
					break; /* do nothing for these choices */
				/* manually handle special cases */
				case "a slutty schutzstaffel uniform":
					res.appendChild(useSvg("Art_Vector_Boob_Outfit_SchutzstaffelUniform"));
					break;
				case "a niqab and abaya":
				case "a burqa":
					res.appendChild(useSvg("Art_Vector_Boob_Outfit_HijabAndAbaya"));
					break;
				case "pasties":
					res.appendChild(useSvg("Art_Vector_Boob_Outfit_PantiesAndPasties"));
					break;
				default:
					res.appendChild(useSvg(`Art_Vector_Boob_Outfit_${clothing2artSuffix(slave.clothes)}`));
			}
		}
		if (V.showBodyMods === 1 && (slave.nipplesPiercing > 0 || slave.areolaePiercing > 0)) {
			/* shows nipple piercings in game when selected; piercings will show on the outfits listed below */
			switch (slave.clothes) {
				case "a chattel habit":
				case "a comfortable bodysuit":
				case "a cybersuit":
				case "a fallen nuns habit":
				case "a latex catsuit":
				case "a monokini":
				case "a nice pony outfit":
				case "a penitent nuns habit":
				case "a Santa dress":
				case "overalls":
				case "a skimpy loincloth":
				case "a slutty pony outfit":
				case "a string bikini":
				case "a succubus outfit":
				case "a thong":
				case "an apron":
				case "attractive lingerie":
				case "attractive lingerie for a pregnant woman":
				case "body oil":
				case "boyshorts":
				case "chains":
				case "choosing her own clothes":
				case "cutoffs":
				case "jeans":
				case "leather pants":
				case "leather pants and a tube top":
				case "leather pants and pasties":
				case "no clothing":
				case "panties":
				case "restrictive latex":
				case "shibari ropes":
				case "slutty jewelry":
				case "sport shorts":
				case "striped panties":
				case "uncomfortable straps":
					if (slave.nipplesPiercing === 1) {
						res.appendChild(useSvg("Art_Vector_Boob_Piercing"));
					} else if (slave.nipplesPiercing > 1) {
						res.appendChild(useSvg("Art_Vector_Boob_Piercing_Heavy"));
					}

					if (slave.areolaePiercing === 1) {
						res.appendChild(useSvg("Art_Vector_Boob_Areola_Piercing"));
					} else if (slave.areolaePiercing > 1) {
						res.appendChild(useSvg("Art_Vector_Boob_Areola_Piercingheavy"));
					}
			}
		}
	}

	function ArtVectorButt() {
		if (getLeftLegID(slave) === 1) {
			res.appendChild(useSvg(`Art_Vector_Butt_${buttSize}`));
		} else if (getLeftLegID(slave) === 2) {
			res.appendChild(useSvg(`Art_Vector_Butt_ProstheticBasic_${buttSize}`));
		} else if (getLeftLegID(slave) === 3) {
			res.appendChild(useSvg(`Art_Vector_Butt_ProstheticSexy_${buttSize}`));
		} else if (getLeftLegID(slave) === 4) { /* reverted to regular SVG to match description */
			res.appendChild(useSvg(`Art_Vector_Butt_ProstheticBeauty_${buttSize}`));
		} else if (getLeftLegID(slave) === 5) {
			res.appendChild(useSvg(`Art_Vector_Butt_ProstheticCombat_${buttSize}`));
		} else if (getLeftLegID(slave) === 6) {
			res.appendChild(useSvg(`Art_Vector_Butt_ProstheticSwiss_${buttSize}`));
		}
	}

	function ArtVectorChastityBelt() {
		let bodySize = "";
		if (slave.waist >= 96) {
			if (slave.weight >= 11) {
				bodySize = "Fat";
			} else if (slave.weight > -31) {
				bodySize = "_Chubby";
			}
		} else if (slave.waist >= 41) {
			if (slave.weight >= 31) {
				bodySize = "Fat";
			} else if (slave.weight >= 0) {
				bodySize = "_Chubby";
			}
		} else if (slave.waist >= 11) {
			if (slave.weight >= 96) {
				bodySize = "Fat";
			} else if (slave.weight >= 11) {
				bodySize = "_Chubby";
			}
		} else if (slave.waist > -11) {
			if (slave.weight >= 131) {
				bodySize = "Fat";
			} else if (slave.weight >= 31) {
				bodySize = "_Chubby";
			}
		} else if (slave.waist > -41) {
			if (slave.weight >= 161) {
				bodySize = "Fat";
			} else if (slave.weight >= 96) {
				bodySize = "_Chubby";
			}
		} else if (slave.waist > -96) {
			if (slave.weight >= 191) {
				bodySize = "Fat";
			} else if (slave.weight >= 131) {
				bodySize = "_Chubby";
			}
		} else {
			if (slave.weight >= 31) {
				bodySize = "_Chubby";
			}
		}

		if (slave.chastityAnus === 1) {
			if (bodySize === "Fat") {
				res.appendChild(useSvg("Art_Vector_Chastity_Vagina_Fat"));
			} else {
				res.appendChild(useSvg("Art_Vector_Chastity_Anus"));
				res.appendChild(useSvg(`Art_Vector_Chastity_Base${bodySize}`));
			}
		}
		if (slave.chastityVagina === 1) {
			if (bodySize === "Fat") {
				res.appendChild(useSvg("Art_Vector_Chastity_Vagina_Fat"));
			} else {
				res.appendChild(useSvg("Art_Vector_Chastity_Vagina"));
				res.appendChild(useSvg(`Art_Vector_Chastity_Base${bodySize}`));
			}
		}
		if (slave.vaginalAccessory !== "none") {
			switch (slave.clothes) { /* shows vaginal accessories on the outfits below */
				case "a bra":
				case "a button-up shirt":
				case "a button-up shirt and panties":
				case "a chattel habit":
				case "a comfortable bodysuit":
				case "a fallen nuns habit":
				case "a Fuckdoll suit":
				case "a latex catsuit":
				case "a monokini":
				case "a nice pony outfit":
				case "a penitent nuns habit":
				case "a Santa dress":
				case "overalls":
				case "a slutty klan robe":
				case "a slutty outfit":
				case "a slutty pony outfit":
				case "a sports bra":
				case "a string bikini":
				case "a striped bra":
				case "a succubus outfit":
				case "a sweater":
				case "a t-shirt":
				case "a t-shirt and panties":
				case "a t-shirt and thong":
				case "a tank-top":
				case "a thong":
				case "a tube top":
				case "a tube top and thong":
				case "an apron":
				case "an oversized t-shirt":
				case "attractive lingerie":
				case "attractive lingerie for a pregnant woman":
				case "body oil":
				case "chains":
				case "choosing her own clothes":
				case "clubslut netting":
				case "cutoffs":
				case "harem gauze":
				case "no clothing":
				case "panties":
				case "panties and pasties":
				case "pasties":
				case "restrictive latex":
				case "shibari ropes":
				case "slutty jewelry":
				case "striped underwear":
				case "uncomfortable straps":
					if (slave.vaginalAccessory === "dildo") {
						res.appendChild(useSvg("Art_Vector_Dildo_Short"));
					} else if (slave.vaginalAccessory === "long dildo") {
						res.appendChild(useSvg("Art_Vector_Dildo_Long"));
					} else if (slave.clothes !== "a comfortable bodysuit" && slave.clothes !== "a string bikini" && slave.clothes !== "attractive lingerie for a pregnant woman" && slave.clothes !== "restrictive latex") {
						if (slave.vaginalAccessory === "large dildo") { /* additional outfits disabled due to the art breaking with the larger accessories */
							res.appendChild(useSvg("Art_Vector_Dildo_Large"));
						} else if (slave.vaginalAccessory === "long, large dildo") {
							res.appendChild(useSvg("Art_Vector_Dildo_Large_Long"));
						} else if (slave.vaginalAccessory === "huge dildo") {
							res.appendChild(useSvg("Art_Vector_Dildo_Huge"));
						} else if (slave.vaginalAccessory === "long, huge dildo") {
							res.appendChild(useSvg("Art_Vector_Dildo_Huge_Long"));
						}
					} /* else if (slave.vaginalAccessory === "bullet vibrator" || slave.vaginalAccessory === "smart bullet vibrator") {
						res.appendChild(useSvg("Art_Vector_Bullet_Vibrator"));
					} */
			}
		}
	}

	function ArtVectorColor() {
		let outfitBaseColour;

		/*
			WARNING: Some of these temporary variables are used in wardrobeUse.tw or salon.tw
			Known examples are _outfitBaseColour, _glassesColor, and _shoeColour
		*/
		setOutfitColor();
		setSkinColor();
		setHairColor();
		setShoeColor();

		function setOutfitColor() {
			/* TODO: rewrite all textual descriptions not to explicitly mention the latex being of black color. */
			if (wearingLatex === true || slave.clothes === "a cybersuit") {
				outfitBaseColour = slave.clothingBaseColor || "#515351"; /* use custom color, or use default latex color */
			} else if (slave.clothes === "a comfortable bodysuit") {
				outfitBaseColour = slave.clothingBaseColor || "#464646"; /* use custom color, or use default bodysuit color */
			}

			/* head addons */
			if (slave.collar === "porcelain mask") {
				T.glassesColor = slave.glassesColor || "#FFFFFF"; /* use custom color or white */
			} else {
				T.glassesColor = slave.glassesColor || "#010101"; /* use custom color or default */
			}

			if (hasAnyEyes(slave)) {
				T.eyeColor = extractColor(hasLeftEye(slave) ? getLeftEyeColor(slave) : getRightEyeColor(slave), 1);
			} else {
				T.eyeColor = extractColor("brown");
			}
			T.outfitBaseColour = outfitBaseColour;
		}

		function setSkinColor() {
			const colorSlave = skinColorCatcher(slave);

			/* setting default values */
			T.areolaStyle = colorSlave.areolaColor;
			T.bellybuttonStyle = colorSlave.areolaColor;
			T.labiaStyle = colorSlave.labiaColor;
			T.skinColour = colorSlave.skinColor;
			/* TODO: introduce fleshStyle */
			/* these need to be declared so they can be set conditionally */
			T.headSkinStyle = undefined;
			T.torsoSkinStyle = undefined;
			T.boobSkinStyle = undefined;
			T.penisSkinStyle = undefined;
			T.scrotumSkinStyle = undefined;
			T.bellySkinStyle = undefined;

			/* BEGIN SKIN COLOR OVERRIDES FOR LATEX CLOTHING EMULATION */
			if (slave.clothes === "a Fuckdoll suit") {
				/* slave is a fuckdoll - display all skin as if it was black rubber */
				T.skinColour = outfitBaseColour;
				T.areolaStyle = "fill:rgba(81,83,81,1);";
				T.labiaStyle = T.areolaStyle;
				T.bellybuttonStyle = T.areolaStyle;
			} else if (slave.clothes === "restrictive latex") {
				/* slave wears restrictive latex - display most skin as if it was rubber */
				/* nice latex does not cover any privates. */
				T.boobSkinStyle = `fill:${T.skinColour};`;
				T.penisSkinStyle = `fill:${T.skinColour};`;
				T.scrotumSkinStyle = `fill:${T.skinColour};`;
				T.torsoSkinStyle = `fill:${T.skinColour};`;
				/* rest of body is covered in latex */
				T.skinColour = outfitBaseColour;
				T.bellybuttonStyle = outfitBaseColour;
			} else if (slave.clothes === "a latex catsuit") {
				/* nice latex does not cover head. */
				T.headSkinStyle = `fill:${T.skinColour};`;
				/* rest of body is covered in latex */
				T.skinColour = outfitBaseColour;
				/* catsuit covers areolae and crotch, too */
				T.bellybuttonStyle = outfitBaseColour;
			} else if (slave.clothes === "a cybersuit") {
				/* rest of body is covered in latex */
				T.skinColour = outfitBaseColour;
				T.bellybuttonStyle = outfitBaseColour;
			} else if (slave.clothes === "a comfortable bodysuit") {
				/* nice bodysuit does not cover head. */
				T.headSkinStyle = `fill:${T.skinColour};`;
				/* rest of body is covered in bodysuit */
				T.skinColour = outfitBaseColour;
				T.bellySkinStyle = outfitBaseColour;
				T.bellybuttonStyle = outfitBaseColour;
			}
			/* END SKIN COLOR OVERRIDES FOR LATEX CLOTHING EMULATION */

			/* outfit dick coloring to match outfit rgba in svg */
			switch (slave.clothes) {
				case "a cheerleader outfit":
					T.scrotumSkinStyle = "fill:rgba(95,110,160,1);";
					T.bellySkinStyle = "fill:rgba(95,110,160,1);";
					break;
				case "cutoffs and a t-shirt":
					T.scrotumSkinStyle = "fill:rgba(81,124,211,1);";
					break;
				case "a halter top dress":
					T.scrotumSkinStyle = "fill:rgba(94,51,124,1);";
					T.bellySkinStyle = "fill:rgba(94,51,124,1);";
					break;
				case "a burqa":
				case "a hijab and abaya":
				case "a niqab and abaya":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "a hijab and blouse":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(85,0,34,1);";
					break;
				case "a burkini":
					T.scrotumSkinStyle = "fill:rgba(0,97,158,1);";
					T.bellySkinStyle = "fill:rgba(0,97,158,1);";
					break;
				case "a klan robe":
					T.scrotumSkinStyle = "fill:rgba(236,236,236,1);";
					T.bellySkinStyle = "fill:rgba(236,236,236,1);";
					break;
				case "a nice maid outfit":
				case "a slutty maid outfit":
					T.scrotumSkinStyle = "fill:rgba(225,225,225,1);";
					T.bellySkinStyle = "fill:rgba(225,225,225,1);";
					break;
				case "a leotard":
					T.scrotumSkinStyle = "fill:rgba(120,15,55,1);";
					T.bellySkinStyle = "fill:rgba(120,15,55,1);";
					break;
				case "a military uniform":
					T.scrotumSkinStyle = "fill:rgba(34,42,18,1);";
					T.bellySkinStyle = "fill:rgba(34,42,18,1);";
					break;
				case "a mini dress":
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					T.bellySkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "a nice nurse outfit":
					T.scrotumSkinStyle = "fill:rgba(0,128,128,1);";
					T.bellySkinStyle = "fill:rgba(0,128,128,1);";
					break;
				case "a slutty nurse outfit":
					T.scrotumSkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "a scalemail bikini":
					T.scrotumSkinStyle = "fill:rgba(133,146,158,1);";
					break;
				case "striped panties":
					T.scrotumSkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "a schoolgirl outfit":
					T.scrotumSkinStyle = "fill:rgba(28,31,36,1);";
					T.bellySkinStyle = "fill:rgba(28,31,36,1);";
					break;
				case "a ball gown":
					T.scrotumSkinStyle = "fill:rgba(128,0,0,1);";
					T.bellySkinStyle = "fill:rgba(128,0,0,1);";
					break;
				case "battledress":
					T.scrotumSkinStyle = "fill:rgba(34,42,18,1);";
					T.bellySkinStyle = "fill:rgba(34,42,18,1);";
					break;
				case "a slave gown":
					T.scrotumSkinStyle = "fill:rgba(200,200,200,1);";
					T.bellySkinStyle = "fill:rgba(200,200,200,1);";
					break;
				case "a slutty outfit":
					T.scrotumSkinStyle = "fill:rgba(63,126,181,1);";
					break;
				case "spats and a tank top":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "a succubus outfit":
					T.scrotumSkinStyle = "fill:rgba(128,0,0,1);";
					T.bellySkinStyle = "fill:rgba(128,0,0,1);";
					break;
				case "nice business attire":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "slutty business attire":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "attractive lingerie for a pregnant woman":
					T.scrotumSkinStyle = "fill:rgba(153,153,153,1);";
					break;
				case "a bunny outfit":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "conservative clothing":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "harem gauze":
					T.scrotumSkinStyle = "fill:rgba(0,168,131,1);";
					break;
				case "a huipil":
					T.scrotumSkinStyle = "fill:rgba(200,200,200,1);";
					T.bellySkinStyle = "fill:rgba(200,200,200,1);";
					break;
				case "a kimono":
					T.scrotumSkinStyle = "fill:rgba(0,91,150,1);";
					T.bellySkinStyle = "fill:rgba(0,91,150,1);";
					break;
				case "a maternity dress":
					T.scrotumSkinStyle = "fill:rgba(48,54,72,1);";
					T.bellySkinStyle = "fill:rgba(48,54,72,1);";
					break;
				case "a slutty qipao":
					T.scrotumSkinStyle = "fill:rgba(204,177,68,1);";
					T.bellySkinStyle = "fill:rgba(204,177,68,1);";
					break;
				case "stretch pants and a crop-top":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "a toga":
					T.scrotumSkinStyle = "fill:rgba(200,200,200,1);";
					T.bellySkinStyle = "fill:rgba(200,200,200,1);";
					break;
				case "a penitent nuns habit":
					T.scrotumSkinStyle = "fill:rgba(114,93,73,1);";
					break;
				case "a fallen nuns habit":
					T.bellySkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "a chattel habit":
					T.scrotumSkinStyle = "fill:rgba(200,200,200,1);";
					break;
				case "a monokini":
					T.scrotumSkinStyle = "fill:rgba(33,47,61,1);";
					break;
				case "a schutzstaffel uniform":
				case "a slutty schutzstaffel uniform":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "a red army uniform":
					T.scrotumSkinStyle = "fill:rgba(114,93,73,1);";
					T.bellySkinStyle = "fill:rgba(114,93,73,1);";
					break;
				case "an apron":
					T.scrotumSkinStyle = "fill:rgba(255,105,180,1);";
					T.bellySkinStyle = "fill:rgba(255,105,180,1);";
					break;
				case "a dirndl":
					T.scrotumSkinStyle = "fill:rgba(128,0,51,1);";
					T.bellySkinStyle = "fill:rgba(128,0,51,1);";
					break;
				case "lederhosen":
					T.scrotumSkinStyle = "fill:rgba(93,83,108,1);";
					break;
				case "a long qipao":
					T.scrotumSkinStyle = "fill:rgba(0,128,0,1);";
					break;
				case "a mounty outfit":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					T.bellySkinStyle = "fill:rgba(128,0,0,1);";
					break;
				case "battlearmor":
					T.scrotumSkinStyle = "fill:rgba(200,200,200,1);";
					break;
				case "striped underwear":
					T.scrotumSkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "panties":
					T.scrotumSkinStyle = "fill:rgba(255,170,238,1);";
					break;
				case "a thong":
					T.scrotumSkinStyle = "fill:rgba(34,28,36,1);";
					break;
				case "a button-up shirt and panties":
				case "a t-shirt and panties":
					T.scrotumSkinStyle = "fill:rgba(255,255,255,1);";
					T.bellySkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "a slutty klan robe":
					T.scrotumSkinStyle = "fill:rgba(128,0,0,1);";
					break;
				case "cutoffs":
					T.scrotumSkinStyle = "fill:rgba(81,124,211,1);";
					break;
				case "sport shorts":
				case "sport shorts and a sports bra":
					T.scrotumSkinStyle = "fill:rgba(51,51,51,1);";
					break;
				case "a t-shirt and thong":
					T.scrotumSkinStyle = "fill:rgba(200,55,171,1);";
					T.bellySkinStyle = "fill:rgba(200,55,171,1);";
					break;
				case "jeans":
					T.scrotumSkinStyle = "fill:rgba(81,124,211,1);";
					break;
				case "leather pants":
				case "leather pants and a tube top":
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "leather pants and pasties":
					T.scrotumSkinStyle = "fill:rgba(85,0,0,1);";
					break;
				case "a t-shirt and jeans":
					T.scrotumSkinStyle = "fill:rgba(81,124,211,1);";
					T.bellySkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "a tank-top and panties":
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					T.bellySkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "a tank-top":
					T.bellySkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "a tube top and thong":
					T.scrotumSkinStyle = "fill:rgba(34,28,36,1);";
					break;
				case "boyshorts":
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "an oversized t-shirt and boyshorts":
					T.bellySkinStyle = "fill:rgba(255,255,255,1);";
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "a sweater and panties":
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					T.bellySkinStyle = "fill:rgba(212,170,0,1);";
					break;
				case "a sweater and cutoffs":
					T.scrotumSkinStyle = "fill:rgba(77,77,77,1);";
					T.bellySkinStyle = "fill:rgba(85,0,0,1);";
					break;
				case "a police uniform":
					T.scrotumSkinStyle = "fill:rgba(11,23,40,1);";
					T.bellySkinStyle = "fill:rgba(11,23,40,1);";
					break;
				case "a one-piece swimsuit":
					T.scrotumSkinStyle = "fill:rgba(22,45,80,1);";
					T.bellySkinStyle = "fill:rgba(22,45,80,1);";
					break;
				case "a skimpy loincloth":
					T.scrotumSkinStyle = "fill:rgba(145,124,111,1);";
					break;
				case "kitty lingerie":
					T.scrotumSkinStyle = "fill:rgba(255,170,238,1);";
					break;
				case "an oversized t-shirt":
					T.bellySkinStyle = "fill:rgba(255,255,255,1);";
					break;
				case "a hanbok":
					T.bellySkinStyle = "fill:rgba(255,109,182,1);";
					break;
				case "a gothic lolita dress":
					T.bellySkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "a sweater":
					T.bellySkinStyle = "fill:rgba(85,0,0,1);";
					break;
				case "sport shorts and a t-shirt":
					T.scrotumSkinStyle = "fill:rgba(200,55,171,1);";
					T.bellySkinStyle = "fill:rgba(200,55,171,1);";
					break;
				case "a biyelgee costume":
					T.scrotumSkinStyle = "fill:rgba(33,68,120,1);";
					break;
				case "panties and pasties":
					T.scrotumSkinStyle = "fill:rgba(26,26,26,1);";
					break;
				case "clubslut netting":
					T.scrotumSkinStyle = "fill:rgba(248,175,206,1);";
			}
		}

		function setHairColor() {
			T.hairColour = extractColor(slave.hColor);
			T.pubicHairColour = extractColor(slave.pubicHColor);
			T.underarmHairColour = extractColor(slave.underArmHColor);
			T.eyebrowHairColour = extractColor(slave.eyebrowHColor);
			if (hasAnyEyes(slave)) {
				T.sclerae = extractColor(hasLeftEye(slave) ? slave.eye.left.sclera : slave.eye.right.sclera);
			} else {
				T.sclerae = extractColor("white");
			}
		}

		function setShoeColor() {
			/* BEWARE: _shoeColour is read by Wardrobe Use */
			/* note: only heels use this _shoeShadowColour */

			/* override color in case of full body latex outfit, or custom color*/
			if (slave.clothes === "a Fuckdoll suit" || slave.clothes === "restrictive latex") {
				T.shoeColour = T.skinColour;
				T.shoeShadowColour = `${T.shoeColour};opacity: 0.5`; /* TODO: do not abuse "color" variable for style definitions. do not rely on dark background for shadow effect either. */
			} else if (slave.shoeColor !== undefined) {
				T.shoeColour = `${slave.shoeColor};opacity: 0.4`; /* shoe color selected by user */
				T.shoeShadowColour = `${T.shoeColour};opacity: 0.5`; /* TODO: do not abuse "color" variable for style definitions. do not rely on dark background for shadow effect either. */
			} else {
				T.shoeShadowColour = "#616a6b";
				if (slave.shoes === "none") {
					T.shoeColour = "#595959";
				} else {
					T.shoeColour = "#80808080";
				}
			}
		}
	}

	function ArtVectorCollar() {
		res.appendChild(useSvg("Art_Vector_Clavicle"));
		/* TODO: find out where "uncomfortable leather" collar art went */
		switch (slave.collar) {
			case "leather with cowbell":
				res.appendChild(useSvg("Art_Vector_Collar_Cowbell"));
				break;
			case "heavy gold":
				res.appendChild(useSvg("Art_Vector_Collar_Gold_Heavy"));
				break;
			case "neck corset":
				res.appendChild(useSvg("Art_Vector_Collar_Neck_Corset"));
				break;
			case "pretty jewelry":
				res.appendChild(useSvg("Art_Vector_Collar_Pretty_Jewelry"));
				break;
			case "cruel retirement counter":
				res.appendChild(useSvg("Art_Vector_Collar_Retirement_Cruel"));
				break;
			case "nice retirement counter":
				res.appendChild(useSvg("Art_Vector_Collar_Retirement_Nice"));
				break;
			case "satin choker":
				res.appendChild(useSvg("Art_Vector_Collar_Satin_Choker"));
				break;
			case "shock punishment":
				res.appendChild(useSvg("Art_Vector_Collar_Shock_Punishment"));
				break;
			case "stylish leather":
				res.appendChild(useSvg("Art_Vector_Collar_Stylish_Leather"));
				break;
			case "tight steel":
				res.appendChild(useSvg("Art_Vector_Collar_Tight_Steel"));
				break;
			case "uncomfortable leather":
				res.appendChild(useSvg("Art_Vector_Collar_Leather_Cruel"));
				break;
			case "silk ribbon":
				res.appendChild(useSvg("Art_Vector_Collar_Silk_Ribbon"));
				break;
			case "bowtie":
				res.appendChild(useSvg("Art_Vector_Collar_Bowtie"));
				break;
			case "ancient Egyptian":
				res.appendChild(useSvg("Art_Vector_Collar_Ancientegyptian"));
		}
	}

	function ArtVectorFeet() {
		let outfit, stockings;
		if (slave.legAccessory === "short stockings") {
			stockings = "SS";
		} else if (slave.legAccessory === "long stockings") {
			stockings = "LL";
		}

		/* Updated 2018-10-25 by Fr0g */
		/* - added brackets to make boolean logic run */
		if (slave.shoes === "heels") {
			res.appendChild(useSvg("Art_Vector_Shoes_Heel"));
		} else if (slave.shoes === "pumps") {
			res.appendChild(useSvg("Art_Vector_Shoes_Pump"));
		} else if (slave.shoes === "extreme heels") {
			res.appendChild(useSvg(`Art_Vector_Shoes_Extreme_Heel_${legSize}`));
		} else if (slave.shoes === "boots") {
			res.appendChild(useSvg(`Art_Vector_Shoes_Boot_${legSize}`));
		} else if (slave.shoes === "flats") {
			res.appendChild(useSvg("Art_Vector_Shoes_Flat"));
		} else {
			if (hasBothNaturalLegs(slave)) {
				res.appendChild(useSvg("Art_Vector_Feet_Normal"));
			} else {
				if (getLeftLegID(slave) === 6 || getRightLegID(slave) === 6) {
					res.appendChild(useSvg("Art_Vector_Feet_ProstheticSwiss"));
				} else if (getLeftLegID(slave) === 5 || getRightLegID(slave) === 5) {
					res.appendChild(useSvg("Art_Vector_Feet_ProstheticCombat"));
				} else if (getLeftLegID(slave) === 4 || getRightLegID(slave) === 4) {
					res.appendChild(useSvg("Art_Vector_Feet_ProstheticBeauty"));
				} else if (getLeftLegID(slave) === 3 || getRightLegID(slave) === 3) {
					res.appendChild(useSvg("Art_Vector_Feet_ProstheticSexy"));
				} else if (getLeftLegID(slave) === 2 || getRightLegID(slave) === 2) {
					res.appendChild(useSvg("Art_Vector_Feet_ProstheticBasic"));
				} else if (getLeftLegID(slave) === 1 || getRightLegID(slave) === 1) {
					res.appendChild(useSvg("Art_Vector_Feet_Normal"));
				}
			}
		}
		if (stockings !== undefined && hasAnyLegs(slave)) {
			if (slave.shoes === "heels") {
				res.appendChild(useSvg(`Art_Vector_Shoes_Heel_${stockings}_${legSize}`));
			} else if (slave.shoes === "pumps") {
				res.appendChild(useSvg(`Art_Vector_Shoes_Pump_${stockings}_${legSize}`));
			} else if (slave.shoes === "flats") {
				res.appendChild(useSvg(`Art_Vector_Shoes_Flat_${stockings}_${legSize}`));
			} else if (slave.shoes === "none") {
				res.appendChild(useSvg(`Art_Vector_Shoes_Stockings_${stockings}_${legSize}`));
			}
		}
		switch (slave.clothes) {
			case "a bra":
			case "a button-up shirt":
			case "a button-up shirt and panties":
			case "a chattel habit":
			case "a comfortable bodysuit":
			case "a cybersuit":
			case "a gothic lolita dress":
			case "a hanbok":
			case "a leotard":
			case "a nice pony outfit":
			case "a one-piece swimsuit":
			case "a penitent nuns habit":
			case "a Santa dress":
			case "overalls":
			case "a scalemail bikini":
			case "a skimpy loincloth":
			case "a slutty klan robe":
			case "a slutty outfit":
			case "a slutty pony outfit":
			case "a sports bra":
			case "a string bikini":
			case "a striped bra":
			case "a sweater":
			case "a sweater and panties":
			case "a t-shirt":
			case "a t-shirt and panties":
			case "a t-shirt and thong":
			case "a tank-top":
			case "a tank-top and panties":
			case "a thong":
			case "a tube top":
			case "a tube top and thong":
			case "an oversized t-shirt":
			case "attractive lingerie for a pregnant woman":
			case "chains":
			case "choosing her own clothes":
			case "kitty lingerie":
			case "no clothing":
			case "panties":
			case "panties and pasties":
			case "pasties":
			case "shibari ropes":
			case "striped panties":
			case "striped underwear":
			case "uncomfortable straps":
			case "a bimbo outfit":
			case "a courtesan dress":
				break; /* do nothing for these cases */
			case "a Fuckdoll suit":
			case "a latex catsuit":
			case "body oil":
			case "restrictive latex":
				if (V.seeVectorArtHighlights === 1) { /* special case for shiny clothing */
					outfit = "Shine";
				}
				break;
			default:
				outfit = clothing2artSuffix(slave.clothes);
		}
		if (outfit !== undefined) {
			if (hasAnyLegs(slave)) {
				if (slave.clothes !== "a slutty qipao" && slave.clothes !== "harem gauze" && slave.clothes !== "slutty jewelry" && slave.clothes !== "Western clothing") { /* these clothes have a stump/leg outfit, but no butt outfit */
					res.appendChild(useSvg(`Art_Vector_Butt_Outfit_${outfit}_${buttSize}`));
				}
				if (slave.clothes !== "a schoolgirl outfit") { /* file is there, but contains no artwork */
					res.appendChild(useSvg(`Art_Vector_Leg_Outfit_${outfit}_${legSize}`));
				}
			} else {
				if (outfit === "Shine") { /* the only stump outfit that does not draw an empty svg */
					res.appendChild(useSvg(`Art_Vector_Leg_Outfit_${outfit}_Stump`));
				}
			}
		}
	}

	function ArtVectorHairBack() {
		if (hairLength !== undefined) { /* Don't draw hair if it isn't there */
			if (slave.fuckdoll !== 0 || (slave.bald !== 0 && slave.hStyle === "bald")) {
				res.appendChild(useSvg("Art_Vector_Hair_Back_NoHair"));
			} else {
				switch (slave.clothes) {
					case "a biyelgee costume":
					case "a burkini":
					case "a burqa":
					case "a chattel habit":
					case "a cybersuit":
					case "a fallen nuns habit":
					case "a hijab and abaya":
					case "a hijab and blouse":
					case "a klan robe":
					case "a military uniform":
					case "a mounty outfit":
					case "a niqab and abaya":
					case "a penitent nuns habit":
					case "a police uniform":
					case "a red army uniform":
					case "a schutzstaffel uniform":
					case "a slutty klan robe":
					case "a slutty nurse outfit":
					case "a slutty schutzstaffel uniform":
					case "battlearmor":
					case "restrictive latex":
					case "Western clothing":
						break; /* do nothing */
					default:
						switch (slave.hStyle) {
							case "buzzcut":
							case "shaved":
							case "shaved bald":
								res.appendChild(useSvg("Art_Vector_Hair_Back_NoHair"));
								break;
							case "afro":
								if (slave.hLength >= 150) {
									res.appendChild(useSvg("Art_Vector_Hair_Back_Afro_Giant"));
								} else {
									res.appendChild(useSvg(`Art_Vector_Hair_Back_Afro_${hairLength}`));
								}
								break;
							case "messy bun":
								res.appendChild(useSvg(`Art_Vector_Hair_Back_Ninja_${hairLength}`));
								break;
							case "strip":
								res.appendChild(useSvg("Art_Vector_Hair_Back_NoHair"));
								break;
							case "braided":
							case "bun":
							case "cornrows":
							case "curled":
							case "dreadlocks":
							case "eary":
							case "luxurious":
							case "messy":
							case "neat":
							case "permed":
							case "ponytail":
							case "tails":
							case "up":
								res.appendChild(useSvg(`Art_Vector_Hair_Back_${capFirstChar(slave.hStyle)}_${hairLength}`));
								break;
							default:
								res.appendChild(useSvg("Art_Vector_Hair_Back_Messy_Medium"));
						}
				}
			}
		}
		/* note: latex clothing actually shows some hair, but there is no appropriate art for it */
		if (slave.collar === "cat ears") {
			res.appendChild(useSvg("Art_Vector_Cat_Ear_Back"));
		}
	}

	function ArtVectorHairFore() {
		if (hairLength !== undefined) { /* Don't draw hair if it isn't there */
			if (slave.fuckdoll !== 0 || (slave.bald !== 0 && slave.hStyle === "bald")) {
				res.appendChild(useSvg("Art_Vector_Hair_Fore_NoHair"));
			} else {
				switch (slave.clothes) {
					case "a biyelgee costume":
					case "a burkini":
					case "a burqa":
					case "a chattel habit":
					case "a cybersuit":
					case "a fallen nuns habit":
					case "a hijab and abaya":
					case "a hijab and blouse":
					case "a klan robe":
					case "a military uniform":
					case "a mounty outfit":
					case "a niqab and abaya":
					case "a penitent nuns habit":
					case "a police uniform":
					case "a red army uniform":
					case "a schutzstaffel uniform":
					case "a slutty klan robe":
					case "a slutty nurse outfit":
					case "a slutty schutzstaffel uniform":
					case "battlearmor":
					case "restrictive latex":
					case "Western clothing":
						break; /* do nothing */
					default:
						switch (slave.hStyle) {
							case "buzzcut":
							case "shaved":
							case "shaved bald":
								res.appendChild(useSvg("Art_Vector_Hair_Fore_NoHair"));
								break;
							case "afro":
								if (slave.hLength >= 150) {
									res.appendChild(useSvg("Art_Vector_Hair_Fore_Afro_Giant"));
								} else {
									res.appendChild(useSvg(`Art_Vector_Hair_Fore_Afro_${hairLength}`));
								}
								break;
							case "messy bun":
								res.appendChild(useSvg(`Art_Vector_Hair_Fore_Ninja_${hairLength}`));
								break;
							case "bun":
							case "neat":
							case "ponytail":
								res.appendChild(useSvg(`Art_Vector_Hair_Fore_${capFirstChar(slave.hStyle)}`));
								break;
							case "braided":
							case "cornrows":
							case "curled":
							case "dreadlocks":
							case "eary":
							case "luxurious":
							case "messy":
							case "permed":
							case "strip":
							case "tails":
							case "up":
								res.appendChild(useSvg(`Art_Vector_Hair_Fore_${capFirstChar(slave.hStyle)}_${hairLength}`));
								break;
							default:
								res.appendChild(useSvg("Art_Vector_Hair_Fore_Messy_Medium"));
						}
				}
			}
		}
		/* note: latex clothing actually shows some hair, but there is no appropriate art for it */
		if (slave.collar === "cat ears") {
			res.appendChild(useSvg("Art_Vector_Cat_Ear_Fore"));
		}
	}

	function ArtVectorHead() {
		const eyebrowFullness = clothing2artSuffix(slave.eyebrowFullness); /* designed for clothing but works for eyebrows too. If other eyebrow styles are added, this may need to be changed. */
		const hasEyebrows = slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "shaved";

		res.appendChild(useSvg("Art_Vector_Head"));
		/* shiny clothing */
		if (V.seeVectorArtHighlights === 1) {
			if (wearingLatex === true) {
				res.appendChild(useSvg("Art_Vector_Head_Outfit_Shine"));
			}
		}
		if (slave.clothes !== "restrictive latex") {
			if (slave.markings === "beauty mark") {
				res.appendChild(useSvg("Art_Vector_Beauty_Mark"));
			} else if (slave.markings === "freckles") {
				res.appendChild(useSvg("Art_Vector_Freckles"));
			} else if (slave.markings === "heavily freckled") {
				res.appendChild(useSvg("Art_Vector_Freckles_Heavy"));
			} else if (slave.markings === "birthmark") {
				res.appendChild(useSvg("Art_Vector_Birthmark"));
			} else if (slave.minorInjury === "black eye") {
				res.appendChild(useSvg("Art_Vector_Black_Eye"));
			}
		}
		/* FACIAL APPEARANCE */
		if (V.seeFaces === 1) {
			if (slave.fuckdoll === 0 && slave.clothes !== "restrictive latex") {
				switch (slave.race) {
					case "southern european":
					case "white":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeD"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeF"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						}
						break;
					case "asian":
					case "malay":
					case "pacific islander":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeD"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeB"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (slave.eyebrowFullness === "pencil-thin") {
								res.appendChild(useSvg("Art_Vector_Eyebrow_TypeC_Pencilthin"));
							} else if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						}
						break;
					case "amerindian":
					case "latina":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeB_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeB"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeF"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeB"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						}
						break;
					case "black":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeD"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeF"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeB"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (slave.eyebrowFullness === "natural") {
								res.appendChild(useSvg("Art_Vector_Eyebrow_TypeB_Natural"));
							} else if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeF"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						}
						break;
					case "middle eastern":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeD"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeF"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeB_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeF"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						}
						break;
					case "semitic":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeD"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeF"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeB_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeF"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						}
						break;
					case "indo-aryan":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeF"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						}
						break;
					case "mixed race":
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeF"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeD"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeD_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						}
						break;
					default:
						if (slave.faceShape === "normal") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeA"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeA"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "masculine") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeD"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeF"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeF"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeE_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "androgynous") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeE"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeE"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeE"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeF_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "cute") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeB"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeB"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeD"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeA_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "sensual") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeC"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						} else if (slave.faceShape === "exotic") {
							res.appendChild(useSvg("Art_Vector_Eyes_TypeA"));
							res.appendChild(useSvg("Art_Vector_Mouth_TypeC"));
							res.appendChild(useSvg("Art_Vector_Nose_TypeC"));
							if (hasEyebrows === true) {
								res.appendChild(useSvg(`Art_Vector_Eyebrow_TypeC_${eyebrowFullness}`));
							}
						}
				}
			}
		}
		/* END FACIAL APPEARANCE */

		if (slave.eyebrowPiercing === 1) {
			res.appendChild(useSvg("Art_Vector_Eyebrow_Light"));
		} else if (slave.eyebrowPiercing === 2) {
			res.appendChild(useSvg("Art_Vector_Eyebrow_Heavy"));
		}

		if (slave.nosePiercing === 1) {
			res.appendChild(useSvg("Art_Vector_Nose_Light"));
		} else if (slave.nosePiercing === 2) {
			res.appendChild(useSvg("Art_Vector_Nose_Heavy"));
		}

		if (slave.lipsPiercing === 1) {
			res.appendChild(useSvg("Art_Vector_Lip_Light"));
		} else if (slave.lipsPiercing === 2) {
			res.appendChild(useSvg("Art_Vector_Lip_Heavy"));
		}

		/* ADDONS */
		if (slave.fuckdoll === 0) { /* Fuckdolls cannot be decorated */
			if (slave.collar === "dildo gag") {
				res.appendChild(useSvg("Art_Vector_Dildo_Gag"));
			} else if (slave.collar === "ball gag") {
				res.appendChild(useSvg("Art_Vector_Ball_Gag"));
			} else if (slave.collar === "bit gag") {
				res.appendChild(useSvg("Art_Vector_Bit_Gag"));
			} else if (slave.collar === "massive dildo gag") {
				res.appendChild(useSvg("Art_Vector_Massive_Dildo_Gag"));
			} else if (slave.collar === "porcelain mask") {
				res.appendChild(useSvg("Art_Vector_Porcelain_Mask"));
			}

			if (slave.eyewear === "corrective glasses" || slave.eyewear === "glasses" || slave.eyewear === "blurring glasses") {
				res.appendChild(useSvg("Art_Vector_Glasses"));
			}

			/* head clothing */
			switch (slave.clothes) {
				case "a biyelgee costume":
				case "a bunny outfit":
				case "a burkini":
				case "a burqa":
				case "a chattel habit":
				case "a cybersuit":
				case "a fallen nuns habit":
				case "a hijab and abaya":
				case "a hijab and blouse":
				case "a klan robe":
				case "a military uniform":
				case "a mounty outfit":
				case "a niqab and abaya":
				case "a penitent nuns habit":
				case "a police uniform":
				case "a red army uniform":
				case "a slutty klan robe":
				case "a slutty nurse outfit":
				case "a succubus outfit":
				case "battlearmor":
				case "harem gauze":
				case "Western clothing":
					res.appendChild(useSvg(`Art_Vector_Head_Outfit_${clothing2artSuffix(slave.clothes)}`));
					break;
				case "a schutzstaffel uniform":
				case "a slutty schutzstaffel uniform":
					res.appendChild(useSvg("Art_Vector_Head_Outfit_SchutzstaffelUniform"));
					break;
				case "kitty lingerie":
					res.appendChild(useSvg("Art_Vector_Cat_Ear_Fore"));
					res.appendChild(useSvg("Art_Vector_Cat_Ear_Back"));
			}
		}
	}

	function ArtVectorLeg() {
		/* Selection of matching SVG based on amputee level */
		if (hasBothNaturalLegs(slave)) {
			res.appendChild(useSvg(`Art_Vector_Leg_${legSize}`));
			if (slave.muscles >= 97) {
				res.appendChild(useSvg(`Art_Vector_Leg_${legSize}_MHeavy`));
			} else if (slave.muscles >= 62) {
				res.appendChild(useSvg(`Art_Vector_Leg_${legSize}_MMedium`));
			} else if (slave.muscles >= 30) {
				res.appendChild(useSvg(`Art_Vector_Leg_${legSize}_MLight`));
			}
		} else if (!hasAnyLegs(slave)) {
			res.appendChild(useSvg("Art_Vector_Stump"));
		} else {
			/* show the best leg */
			if (getLeftLegID(slave) === 6 || getRightLegID(slave) === 6) {
				res.appendChild(useSvg(`Art_Vector_Leg_ProstheticSwiss_${legSize}`));
			} else if (getLeftLegID(slave) === 5 || getRightLegID(slave) === 5) {
				res.appendChild(useSvg(`Art_Vector_Leg_ProstheticCombat_${legSize}`));
			} else if (getLeftLegID(slave) === 4 || getRightLegID(slave) === 4) {
				res.appendChild(useSvg(`Art_Vector_Leg_ProstheticBeauty_${legSize}`));
			} else if (getLeftLegID(slave) === 3 || getRightLegID(slave) === 3) {
				res.appendChild(useSvg(`Art_Vector_Leg_ProstheticSexy_${legSize}`));
			} else if (getLeftLegID(slave) === 2 || getRightLegID(slave) === 2) {
				res.appendChild(useSvg(`Art_Vector_Leg_ProstheticBasic_${legSize}`));
			} else {
				res.appendChild(useSvg(`Art_Vector_Leg_${legSize}`));
				if (slave.muscles >= 97) {
					res.appendChild(useSvg(`Art_Vector_Leg_${legSize}_MHeavy`));
				} else if (slave.muscles >= 62) {
					res.appendChild(useSvg(`Art_Vector_Leg_${legSize}_MMedium`));
				} else if (slave.muscles >= 30) {
					res.appendChild(useSvg(`Art_Vector_Leg_${legSize}_MLight`));
				}
			}
		}
	}

	function ArtVectorPubicHair() {
		if (slave.fuckdoll !== 0 || slave.clothes !== "a latex catsuit") {
			if (V.showBodyMods === 1 && slave.vaginaTat === "rude words") {
				if (slave.dick !== 0) {
					// eslint-disable-next-line camelcase
					T.art_pussy_tattoo_text = "Useless";
				} else {
					// eslint-disable-next-line camelcase
					T.art_pussy_tattoo_text = "Fucktoy";
				}
				res.appendChild(useSvg("Art_Vector_Pussy_Tattoo"));
			}
			if (slave.physicalAge < 11) {
				/* these art files exist, but draw empty svg's. Commented out for now to save on rendering time
				res.appendChild(useSvg("Art_Vector_Pubic_Hair_None"));
				res.appendChild(useSvg("Art_Vector_Pubic_Hair_Underarm_None"));
				*/
			} else if (slave.physicalAge <= 13) {
				if (slave.pubicHStyle !== "waxed" && slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless") {
					res.appendChild(useSvg("Art_Vector_Pubic_Hair_Wispy"));
				}
			} else if (slave.clothes !== "a comfortable bodysuit") {
				switch (slave.pubicHStyle) {
					case "bald":
					case "hairless":
					case "waxed":
						/* commented out to save on rendering time
						res.appendChild(useSvg("Art_Vector_Pubic_Hair_None"));
						*/
						break;
					case "strip":
					case "in a strip":
						if (torsoSize === "Obese" || torsoSize === "Fat") {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_StripFat"));
						} else {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_Strip"));
						}
						break;
					case "neat":
						if (torsoSize === "Obese" || torsoSize === "Fat") {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_NeatFat"));
						} else {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_Neat"));
						}
						break;
					case "bushy in the front and neat in the rear":
						if (torsoSize === "Obese" || torsoSize === "Fat") {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_BushFat"));
						} else {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_Bush"));
						}
						break;
					case "bushy":
						if (torsoSize === "Obese" || torsoSize === "Fat") {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_BushyFat"));
						} else {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_Bushy"));
						}
						break;
					case "very bushy":
						if (torsoSize === "Obese" || torsoSize === "Fat") {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_Very_BushyFat"));
						} else {
							res.appendChild(useSvg("Art_Vector_Pubic_Hair_Very_Bushy"));
						}
				}
				switch (slave.underArmHStyle) {
					case "hairless":
					case "waxed":
					case "bald":
						/* commented out to save on rendering time
						res.appendChild(useSvg("Art_Vector_Pubic_Hair_Underarm_None"));
						*/
						break;
					case "shaved":
						res.appendChild(useSvg("Art_Vector_Pubic_Hair_Underarm_Shaved"));
						break;
					case "neat":
						res.appendChild(useSvg("Art_Vector_Pubic_Hair_Underarm_Neat"));
						break;
					case "bushy":
						res.appendChild(useSvg("Art_Vector_Pubic_Hair_Underarm_Bushy"));
				}
			}
		}
	}

	function ArtVectorPussy() {
		if (slave.vagina >= 0 && slave.clothes !== "a latex catsuit" && slave.clothes !== "a comfortable bodysuit" && slave.clothes !== "a cybersuit") {
			res.appendChild(useSvg("Art_Vector_Pussy"));
		}
	}

	function ArtVectorPussyPiercings() {
		switch (slave.clothes) { /* piercings display on these clothes */
			case "a bra":
			case "a button-up shirt":
			case "a fallen nuns habit":
			case "a Fuckdoll suit":
			case "a nice pony outfit":
			case "a Santa dress":
			case "overalls":
			case "a slutty pony outfit":
			case "a sports bra":
			case "a string bikini":
			case "a striped bra":
			case "a sweater":
			case "a t-shirt":
			case "a tank-top":
			case "a tube top":
			case "an oversized t-shirt":
			case "attractive lingerie":
			case "body oil":
			case "chains":
			case "choosing her own clothes":
			case "no clothing":
			case "restrictive latex":
			case "shibari ropes":
			case "slutty jewelry":
			case "uncomfortable straps":
			case "Western clothing":
				/* piercinglevel = 1, Light; piercinglevel = 2, Heavy; piercinglevel = 3, Smart; piercinglevel = 0, None */
				if (slave.vaginaPiercing === 1) {
					res.appendChild(useSvg("Art_Vector_Pussy_Piercing"));
				} else if (slave.vaginaPiercing === 2) {
					res.appendChild(useSvg("Art_Vector_Pussy_Piercing_Heavy"));
				}

				if (slave.clitPiercing === 1) {
					res.appendChild(useSvg("Art_Vector_Clit_Piercing"));
				} else if (slave.clitPiercing === 2) {
					res.appendChild(useSvg("Art_Vector_Clit_Piercing_Heavy"));
				} else if (slave.clitPiercing === 3) {
					res.appendChild(useSvg("Art_Vector_Clit_Piercing_Smart"));
				}
		}
	}

	function ArtVectorTorso() {
		res.appendChild(useSvg(`Art_Vector_Torso_${torsoSize}`));
		if (slave.muscles >= 97) {
			res.appendChild(useSvg(`Art_Vector_Torso_${torsoSize}_MHeavy`));
		} else if (slave.muscles >= 62) {
			res.appendChild(useSvg(`Art_Vector_Torso_${torsoSize}_MMedium`));
		} else if (slave.muscles >= 30) {
			res.appendChild(useSvg(`Art_Vector_Torso_${torsoSize}_MLight`));
		}
	}

	function ArtVectorTorsoOutfit() {
		/* TODO: latex catsuit should cover vagina and its piercings, too */
		switch (slave.clothes) {
			case "a Fuckdoll suit":
			case "a latex catsuit":
			case "a nice pony outfit":
			case "a Santa dress":
			case "overalls":
			case "a slutty pony outfit":
			case "pasties":
			case "choosing her own clothes":
			case "no clothing":
			case "a bimbo outfit":
			case "a courtesan dress":
				break; /* no torso outfit */
			/* manually handle special cases */
			case "a cybersuit":
				res.appendChild(useSvg(`Art_Vector_Torso_Outfit_Latex_${torsoSize}`));
				break;
			case "a slutty schutzstaffel uniform":
				res.appendChild(useSvg(`Art_Vector_Torso_Outfit_SchutzstaffelUniform_${torsoSize}`));
				break;
			case "a niqab and abaya":
			case "a burqa":
				res.appendChild(useSvg(`Art_Vector_Torso_Outfit_HijabAndAbaya_${torsoSize}`));
				break;
			default:
				res.appendChild(useSvg(`Art_Vector_Torso_Outfit_${clothing2artSuffix(slave.clothes)}_${torsoSize}`));
		}
		if (V.seeVectorArtHighlights === 1) {
			if (wearingLatex === true) {
				if (hasLeftArm(slave)) {
					res.appendChild(useSvg("Art_Vector_Torso_Outfit_Shine_Shoulder"));
				}
				if (slave.preg <= 0) {
					res.appendChild(useSvg(`Art_Vector_Torso_Outfit_Shine_${torsoSize}`));
				}
			}
		}
	}

	return VectorArt;
}) ();


App.Art.legacyVectorArtElement = function() {
	const filePath = "resources/vector";
	/* const skinFilePath = `${filePath}/body/white`; */

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} artSize
	 * @returns {DocumentFragment}
	 */
	function render(slave, artSize) {
		const wearingLatex = slave.clothes === "a Fuckdoll suit" || slave.clothes === "restrictive latex" || slave.clothes === "a latex catsuit";
		let hairStyle, underArmHStyle, leftArmType, rightArmType, buttSize, legSize, shoesType, torsoSize, boobSize, ballSize, penisSize;
		let needBoobs = true;

		const res = document.createDocumentFragment();
		res.appendChild(App.Utils.htmlToElement(App.Utils.passageElement("SVG filters").textContent));

		/* Set skin color */
		let skinFilter = `filter: url(#skin-${_.kebabCase(slave.skin)});`;
		/* Set hair color */
		let hairFilter = `filter: url(#hair-${_.kebabCase(slave.hColor)});`;
		let underArmFilter = `filter: url(#hair-${_.kebabCase(slave.underArmHColor)});`;
		let pubesFilter = `filter: url(#hair-${_.kebabCase(slave.pubicHColor)});`;

		if (artSize === 1) {
			addImg(res, "test ui");
		}

		if (slave.custom.hairVector) {
			hairStyle = slave.custom.hairVector;
		} else {
			hairStyle = (["afro", "braided", "bun", "buzzcut", "dreadlocks", "eary", "luxurious", "messy", "neat", "ponytail", "strip", "tails", "trimmed", "up"].includes(slave.hStyle) ? slave.hStyle : "neat");
		}

		underArmHStyle = slave.underArmHStyle;

		/* Shoulder width and arm or no arm */
		if (slave.devotion > 50) {
			leftArmType = "High";
			rightArmType = "High";
		} else if (slave.trust >= -20) {
			if (slave.devotion < -20) {
				leftArmType = "Rebel";
				rightArmType = "Low";
			} else if (slave.devotion <= 20) {
				leftArmType = "Low";
				rightArmType = "Low";
			} else {
				leftArmType = "Mid";
				rightArmType = "High";
			}
		} else {
			leftArmType = "Mid";
			rightArmType = "Mid";
		}

		if (wearingLatex === false) {
			if (!hasRightArm(slave)) {
				addSkinImg(res, `arm right ${rightArmType}`, skinFilter);
			}
			if (slave.underArmHStyle === "bushy") {
				addImg(res, `hair/underArm ${underArmHStyle} right`, underArmFilter);
			}
		} else if (!hasRightArm(slave)) {
			if (slave.fuckdoll !== 0) {
				rightArmType = "mid";
			}
			addImg(res, `outfit/arm right ${rightArmType} latex`);
		}

		/* Hair Aft */
		if (slave.fuckdoll === 0) {
			switch (slave.hStyle) {
				case "eary":
				case "luxurious":
				case "messy":
				case "neat":
				case "tails":
				case "trimmed":
					addImg(res, `hair/${hairStyle} back`, hairFilter);
			}
		}

		/* Tailed Plug */
		if (slave.buttplugAttachment === "tail") {
			addImg(res, "outfit/tail plug", hairFilter);
		}

		/* Butt */
		if (hasAnyLegs(slave)) {
			if (slave.butt > 6) {
				buttSize = 3;
			} else if (slave.butt > 4) {
				buttSize = 2;
			} else if (slave.butt > 2) {
				buttSize = 1;
			} else {
				buttSize = 0;
			}

			if (wearingLatex === true) {
				addImg(res, `outfit/butt ${buttSize} latex`, skinFilter);
			} else {
				addSkinImg(res, `butt ${buttSize}`, skinFilter);
			}
		}

		/* Leg + 1 size up when chubby or fat */
		if (slave.hips < 0) {
			if (slave.weight > 95) { /* Chubby */
				legSize = "normal";
			} else {
				legSize = "narrow";
			}
		} else if (slave.hips === 0) {
			if (slave.weight > 95) { /* Chubby */
				legSize = "wide";
			} else {
				legSize = "normal";
			}
		} else {
			legSize = "wide";
		}
		if (!hasAnyLegs(slave)) {
			legSize = `stump ${legSize}`;
		}

		if (wearingLatex === true && hasAnyLegs(slave)) {
			addImg(res, `outfit/leg ${legSize} latex`);
		} else {
			addSkinImg(res, `leg ${legSize}`, skinFilter);
		}

		/* Feet */
		if (hasAnyLegs(slave)) {
			if (slave.shoes === "heels") {
				shoesType = "heel";
			} else if (slave.shoes === "extreme heels") {
				if (slave.weight > 95) { /* Chubby */
					shoesType = "extreme heel wide";
				} else {
					shoesType = "extreme heel";
				}
			} else if (slave.shoes === "boots") {
				if (slave.weight > 95) { /* Chubby */
					shoesType = "boot wide";
				} else {
					shoesType = "boot";
				}
			} else if (slave.shoes === "flats") {
				shoesType = "flat";
			} else {
				addSkinImg(res, "feet", skinFilter);
			}
			if (slave.shoes === "extreme heels" || slave.shoes === "boots") {
				addImg(res, `outfit/${shoesType}${wearingLatex ? " latex": ""}`);
			} else if (slave.shoes === "heels" || slave.shoes === "flats") {
				if (wearingLatex === true) {
					addImg(res, `outfit/${shoesType} latex`);
				} else {
					addSkinImg(res, `${shoesType}`, skinFilter);
				}
			}
		}

		/* Torso */
		if (slave.waist < -40) {
			if (slave.weight > 30) {
				torsoSize = "hourglass";
			} else {
				torsoSize = "unnatural";
			}
		} else if (slave.waist <= 10) {
			if (slave.weight > 30) {
				torsoSize = "normal";
			} else {
				torsoSize = "hourglass";
			}
		} else {
			torsoSize = "normal";
		}
		addSkinImg(res, `torso ${torsoSize}`, skinFilter);
		if (wearingLatex === true) {
			addImg(res, `outfit/torso ${torsoSize} latex`);
		} else if (slave.clothes === "uncomfortable straps") {
			addImg(res, `outfit/torso ${torsoSize} straps`);
		}

		if (wearingLatex === false) {
			if (hasLeftArm(slave) && leftArmType === "high") {
				addSkinImg(res, `arm left ${leftArmType}`, skinFilter);
			}
			if (slave.underArmHStyle === "bushy") {
				addImg(res, `hair/underArm ${underArmHStyle} left`, underArmFilter);
			}
			if (hasLeftArm(slave) && leftArmType !== "high") {
				addSkinImg(res, `arm left ${leftArmType}`, skinFilter);
			}
		} else if (hasLeftArm(slave)) {
			if (slave.fuckdoll !== 0) {
				leftArmType = "mid";
			}
			addImg(res, `outfit/arm left ${leftArmType} latex`);
		}

		/* Vagina */
		if (slave.vagina >= 0) {
			addSkinImg(res, "vagina", skinFilter);
			if (slave.clitPiercing === 1) {
				addImg(res, "body/addon/clit piercing");
			} else if (slave.clitPiercing === 2) {
				addImg(res, "body/addon/clit piercing heavy");
			} else if (slave.clitPiercing === 3) {
				addImg(res, "body/addon/clit piercing smart");
			}

			if (slave.vaginaPiercing === 1) {
				addImg(res, "body/addon/pussy piercing");
			} else if (slave.vaginaPiercing === 2) {
				addImg(res, "body/addon/pussy piercing heavy");
			}
		}

		/* Collar */
		switch (slave.collar) {
			case "nice retirement counter":
			case "cruel retirement counter":
			case "leather with cowbell":
			case "pretty jewelry":
			case "heavy gold":
			case "satin choker":
			case "stylish leather":
			case "neck corset":
			case "shock punishment":
			case "tight steel":
			case "uncomfortable leather":
			case "dildo gag":
				addImg(res, `outfit/${slave.collar}`);
		}

		/* Head base image */
		if (wearingLatex === true) {
			addImg(res, "outfit/head latex");
		} else {
			addSkinImg(res, "head", skinFilter);
		}

		/* Glasses */
		if (slave.eyewear === "corrective glasses" || slave.eyewear === "glasses" || slave.eyewear === "blurring glasses") {
			addImg(res, "outfit/glasses");
		}

		/* Chastity belt or Pubic hair */
		if (slave.chastityPenis === 1 || slave.chastityVagina === 1 || slave.chastityAnus === 1) {
			if (slave.chastityPenis === 1) {
				addImg(res, "outfit/chastity male aft");
			}
			if (slave.chastityVagina === 1) {
				addImg(res, "outfit/chastity female");
			}
			addImg(res, "outfit/chastity base");
		} else if (slave.pubicHStyle !== "waxed" && slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless") {
			let pubicHStyle = (slave.pubicHStyle === "in a strip" ? "strip" : slave.pubicHStyle);
			addImg(res, `hair/pubes ${pubicHStyle}`, pubesFilter);
		}

		/* if pregnant or has a belly */
		if (slave.belly >= 5000) {
			addSkinImg(res, "preg belly 5000", skinFilter);
			if (slave.navelPiercing >= 1) { /* Navel Piercing*/
				addImg(res, "body/addon/preg navel piercing");
			}
			if (slave.navelPiercing === 2) {
				addImg(res, "body/addon/preg navel piercing heavy");
			}
		} else if (slave.belly <= -100) { /* condition is currently reversed until the vector can be fixed */
			addSkinImg(res, "preg belly 100", skinFilter);
			/*
			if (slave.navelPiercing >= 1)/Navel Piercing/
				r += `<img class='paperdoll' src=${filePath}/body/addon/preg navel piercing.svg'/>`;
			if (slave.navelPiercing === 2)
				r += `<img class='paperdoll' src=${filePath}/body/addon/preg navel piercing heavy.svg'/>`;
			*/
		} else {
			if (slave.navelPiercing >= 1) { /* Navel Piercing*/
				addImg(res, "body/addon/navel piercing");
			}
			if (slave.navelPiercing === 2) {
				addImg(res, "body/addon/navel piercing heavy");
			}
		}

		/* Boob */
		if (slave.boobs < 300) {
			boobSize = 0;
		} else if (slave.boobs < 500) {
			boobSize = 1;
		} else if (slave.boobs < 800) {
			boobSize = 2;
		} else if (slave.boobs < 1600) {
			boobSize = 3;
		} else if (slave.boobs < 3200) {
			boobSize = 4;
		} else if (slave.boobs < 6400) {
			boobSize = 5;
		} else if (slave.boobs < 12000) {
			boobSize = 6;
		} else {
			boobSize = 7;
		}

		/* Scrotum */
		if (slave.scrotum > 0) {
			if (slave.scrotum >= 6) {
				ballSize = 4;
			} else if (slave.scrotum >= 4) {
				ballSize = 3;
			} else if (slave.scrotum >= 3) {
				ballSize = 2;
			} else if (slave.scrotum >= 2) {
				ballSize = 1;
			} else {
				ballSize = 0;
			}
		}

		/* Penis */
		if (slave.dick > 0) {
			if (slave.dick >= 8) {
				penisSize = 6;
			} else if (slave.dick >= 7) {
				penisSize = 5;
			} else if (slave.dick >= 6) {
				penisSize = 4;
			} else if (slave.dick >= 5) {
				penisSize = 3;
			} else if (slave.dick >= 4) {
				penisSize = 2;
			} else if (slave.dick >= 2) {
				penisSize = 1;
			} else {
				penisSize = 0;
			}
		}

		/* Boob */
		if (slave.dick > 0) {
			if (canAchieveErection(slave)) {
				if (boobSize < 6) {
					if (wearingLatex === true) {
						/* normal case: outfit hides boobs */
						addImg(res, `outfit/boob ${boobSize} latex`);
						if (slave.lactation > 0) {
							addSkinImg(res, `boob ${boobSize} areola`, skinFilter);
						}
					} else {
						addSkinImg(res, `boob ${boobSize}`, skinFilter);
						addSkinImg(res, `boob ${boobSize} areola`, skinFilter);
					}
					/* special case: straps are actually dawn over the boobs */
					if (slave.clothes === "uncomfortable straps") {
						addImg(res, `outfit/boob ${boobSize} straps`);
					}

					needBoobs = false;
				}
			}
		}
		if (slave.vagina > 0) {
			if (slave.dick > 0) {
				const divPenis = document.createElement("div");
				divPenis.className = "highPenis";
				res.appendChild(divPenis);
				if (slave.scrotum > 0) {
					addSkinImg(divPenis, `ball ${ballSize}`, skinFilter);
				}
				if (canAchieveErection(slave)) {
					addSkinImg(divPenis, `penis ${penisSize}`, skinFilter);
				} else {
					addSkinImg(divPenis, `flaccid ${penisSize}`, skinFilter);
					if (slave.chastityPenis === 1) {
						addImg(divPenis, `outfit/chastity male fore ${penisSize}`);
					}
				}
			}
		} else {
			if (slave.dick > 0) {
				const divPenis = document.createElement("div");
				divPenis.className = "lowPenis";
				res.appendChild(divPenis);
				if (slave.scrotum > 0) {
					addSkinImg(divPenis, `ball ${ballSize}`, skinFilter);
				}
				if (canAchieveErection(slave)) {
					addSkinImg(divPenis, `penis ${penisSize}`, skinFilter);
				} else {
					addSkinImg(divPenis, `flaccid ${penisSize}`, skinFilter);
					if (slave.chastityPenis === 1) {
						addImg(divPenis, `outfit/chastity male fore ${penisSize}`);
					}
				}
			}
		}
		if (needBoobs === true) {
			if (wearingLatex === true) {
				addImg(res, `outfit/boob ${boobSize} latex`);
				if (slave.lactation > 0) {
					addSkinImg(res, `boob ${boobSize} areola`, skinFilter);
				}
			} else {
				addSkinImg(res, `boob ${boobSize}`, skinFilter);
				addSkinImg(res, `boob ${boobSize} areola`, skinFilter);
			}
			/* special case: straps are actually dawn over the boobs */
			if (slave.clothes === "uncomfortable straps") {
				addImg(res, `outfit/boob ${boobSize} straps`);
			}
		}

		/* piercings */
		if (slave.nipplesPiercing === 1) {
			addImg(res, `body/addon/boob ${boobSize} piercing`);
		} else if (slave.nipplesPiercing === 2) {
			addImg(res, `body/addon/boob ${boobSize} piercing heavy`);
		}

		if (slave.areolaePiercing === 1) {
			addImg(res, `body/addon/boob ${boobSize} areola piercing`);
		}

		/* clavicle */
		addImg(res, "body/addon/clavicle");

		/* Hair Foreground */
		if (slave.hStyle !== "shaved" && slave.fuckdoll === 0) {
			addImg(res, `/hair/${hairStyle} front`, hairFilter);
		}

		return res;
	}

	/**
	 * @param {Node} container
	 * @param {string} artFile
	 * @param {string} [style]
	 */
	function addImg(container, artFile, style) {
		const res = document.createElement("img");
		res.setAttribute("class", "paperdoll");
		res.setAttribute("src", `${filePath}/${artFile}.svg`);
		if (style !== undefined) {
			res.setAttribute("style", style);
		}
		container.appendChild(res);
		return res;
	}

	/**
	 * @param {Node} container
	 * @param {string} artFile
	 * @param {string} [style]
	 */
	function addSkinImg(container, artFile, style) {
		return addImg(container, 'body/white/' + artFile, style);
	}

	return render;
}();
