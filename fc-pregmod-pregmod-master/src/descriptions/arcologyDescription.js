/**
 * @param {Node} [lastElement] will go on the same line as the last line
 * @returns {DocumentFragment}
 */
App.Desc.playerArcology = function(lastElement) {
	const A = V.arcologies[0];
	const fragment = document.createDocumentFragment();

	/**
	 * @returns {DocumentFragment}
	 */
	function location() {
		const fragment = document.createDocumentFragment();

		fragment.append(App.UI.DOM.makeElement("span", A.name, "name"),
			`, your arcology, is located in a Free City in  ${V.terrain === "oceanic" ? "the middle of the ocean" : V.continent}. It is a huge structure whose${V.arcologyUpgrade.apron === 1 ? " solar-paneled" : ""} skin gleams in the sunshine${V.arcologyUpgrade.hydro === 1 ? ", while verdant exterior hydroponics bays lend it an air of growth" : ""}. `);

		let buffer = [];
		if (V.weatherCladding === 1) {
			buffer.push(`Much of its beautiful exterior is now hidden behind dull panels of weather cladding${V.arcologyUpgrade.spire === 1 ? ", though its highest point is capped by a tall, elegant spire" : ""}.`);
		} else if (V.weatherCladding === 2) {
			buffer.push(`The entirety of its once dull exterior has been retrofitted with breathtaking golden sheets in eye catching designs${V.arcologyUpgrade.spire === 1 ? ", its highest point capped by a tall, magnificent spire" : ""}.`);
		}
		buffer.push(`Its${V.weatherCladding === 2 ? " glorious" : V.weatherCladding > 0 ? " dull" : V.arcologyUpgrade.apron === 1 ? " shining" : ""} bulk`);
		if (V.terrain === "urban") {
			buffer.push(`towers above the city around it; it is part of a cluster of arcologies that form a Free City in the midst of an old world urban area.`);
		} else if (V.terrain === "rural") {
			buffer.push(`rises above the buildings around it; it is part of a cluster of arcologies and smaller structures that form a Free City in the middle of a barren wilderness.`);
		} else if (V.terrain === "ravine") {
			buffer.push(`just barely peaks above the cliffs of its home valley; it is part of a cluster of arcologies and smaller structures that form a Free City in the depths of a deep ravine.`);
		} else if (V.terrain === "marine") {
			buffer.push(`rises above the shallow water all around it; it is part of a cluster of arcologies that form a Free City near the seashore.`);
		} else {
			buffer.push(`rises above the blue water all around it; it is part of a cluster of arcologies that form a Free City anchored over a seamount.`);
		}
		fragment.append(buffer.join(" "));

		return fragment;
	}

	let openDiv = App.UI.DOM.makeElement("div", location(), "indent");

	function deco100() {
		if (FutureSocieties.HighestDecoration() < 100) {
			return "";
		}

		let buffer = [];

		if (A.FSChattelReligionistDecoration >= 100) {
			buffer.push(`The uppermost point on the arcology is capped by a massive religious icon.`);
		}
		if (A.FSRomanRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of white stone, with graceful columns bringing Rome immediately to mind.`);
		} else if (A.FSAztecRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of obsidian, giving them a nice sheen as they absorb the sun's rays.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of sandstone, with richly carved columns bringing ancient Egypt immediately to mind.`);
		} else if (A.FSEdoRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of close fitted stone topped with the white walls of a feudal Japanese castle.`);
		} else if (A.FSArabianRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of warm stone and crowded with the busy commerce of an Arabian revival.`);
		} else if (A.FSChineseRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are guarded by bronze statues of traditional Chinese guardian spirits.`);
		}

		const {he: heP, his: hisP} = getPronouns(V.PC);
		let statue;
		if (V.PC.dick !== 0) {
			if (V.PC.vagina !== -1) {
				statue = "futanari";
			} else if (V.PC.boobs >= 300) {
				statue = "shemale";
			} else {
				statue = "male";
			}
		} else {
			statue = "female";
		}

		buffer.push(`Outside the main entrance, there is an enormous statue of an idealized figure with several statues of nude slaves at its feet.`);
		if (A.FSStatuesqueGlorification === 100) {
			buffer.push(`The central ${statue} figure towers over the area.`);
		}
		if (A.FSSupremacistDecoration === 100) {
			buffer.push(`The central ${statue} figure has distinctly ${A.FSSupremacistRace} features.`);
		}
		if (A.FSSubjugationistDecoration === 100) {
			buffer.push(`The slaves have exaggerated ${A.FSSubjugationistRace} features.`);
		}
		if (A.FSGenderRadicalistDecoration === 100) {
			buffer.push(`The slaves are all hermaphrodites.`);
		}
		if (A.FSGenderFundamentalistDecoration === 100) {
			buffer.push(`The slaves are all perfectly female.`);
		}
		if (A.FSPaternalistDecoration === 100) {
			buffer.push(`The slaves are gazing adoringly up at the central ${statue} figure.`);
		}
		if (A.FSDegradationistDecoration === 100) {
			buffer.push(`The slaves are cowering, and are wearing chains.`);
		}
		if (A.FSBodyPuristDecoration === 100) {
			buffer.push(`The slaves' bodies are idealized, too.`);
		}
		if (A.FSTransformationFetishistDecoration === 100) {
			buffer.push(`The slaves have unnaturally narrow waists and big breasts.`);
		}
		if (A.FSYouthPreferentialistDecoration === 100) {
			if (V.minimumSlaveAge < 13) {
				buffer.push(`The slaves are cute lolis with round, innocent faces.`);
			} else {
				buffer.push(`The slaves are young, with smooth, innocent faces.`);
			}
		}
		if (A.FSMaturityPreferentialistDecoration === 100) {
			buffer.push(`The slaves are mature, with motherly bodies.`);
		}
		if (A.FSSlimnessEnthusiastDecoration === 100) {
			buffer.push(`The slaves have pretty, girlish figures.`);
		}
		if (A.FSPetiteAdmirationDecoration === 100) {
			buffer.push(`The slaves are quite short.`);
		}
		if (A.FSAssetExpansionistDecoration === 100) {
			buffer.push(`The slaves' breasts are unrealistically huge, almost as large as the rest of their bodies.`);
		}
		if (A.FSRepopulationFocusDecoration === 100) {
			buffer.push(`The slaves are heavily pregnant${V.PC.vagina !== -1 ? `, as is the central${V.PC.dick !== 0 ? " futanari" : " female"}` : ""} figure.`);
		}
		if (A.FSRestartDecoration === 100) {
			buffer.push(`The central`);
			if (V.PC.dick > 0) {
				if (V.PC.vagina >= 0) {
					buffer.push(`futanari figure's balls are oversized and ${hisP} stomach slightly rounded,`);
				} else if (V.PC.boobs >= 300) {
					buffer.push(`shemale figure's balls are swollen with virile seed,`);
				} else {
					buffer.push(`male figure's balls are swollen with virile seed,`);
				}
			} else {
				buffer.push(`female figure's stomach is slightly rounded,`);
			}
			buffer.push(`announcing its fertility, while the slaves wear chastity devices.`);
		}
		if (A.FSPastoralistDecoration === 100) {
			buffer.push(`The statuary is located in the middle of a fountain; the slaves' nipples pour water into the pool beneath.`);
		}
		if (A.FSPhysicalIdealistDecoration === 100) {
			buffer.push(`Both the central ${statue} figure and the slaves are ${A.FSPhysicalIdealistLaw === 1 ? "quite fit" : "very muscular"}.`);
		}
		if (A.FSHedonisticDecadenceDecoration === 100) {
			buffer.push(`The central ${statue} figure has a distinct softness to its body, while the slaves are delightfully rotund.`);
		}
		if (A.FSIntellectualDependencyDecoration === 100) {
			buffer.push(`The slaves are visibly aroused.`);
		}
		if (A.FSSlaveProfessionalismDecoration === 100) {
			buffer.push(`The slaves have flawless posture.`);
		}
		if (A.FSChattelReligionistDecoration === 100) {
			buffer.push(`The central ${statue} figure has a halo behind ${hisP} head, and the slaves are in attitudes of worship.`);
		}
		if (A.FSRomanRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a toga; ${heP} has a laurel wreath about ${hisP} brow.`);
		}
		if (A.FSAztecRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a feathered cloak, ornamented with jewels; ${heP} has a giant headdress on ${hisP} head.`);
		}
		if (A.FSEgyptianRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a pharaoh's crown.`);
		}
		if (A.FSEdoRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure has a hand resting confidently on the hilts of the sheathed katana and wakizashi ${heP} has thrust through the sash about ${hisP} waist.`);
		}
		if (A.FSArabianRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a turban and flowing robes.`);
		}
		if (A.FSChineseRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing the robes of an ancient Chinese ${V.PC.title === 1 ? "Emperor" : "Empress"}.`);
		}

		return buffer.join(" ");
	}

	openDiv.append(deco100());

	/**
	 * @returns {string}
	 */
	function deco40() {
		if (FutureSocieties.HighestDecoration() < 40) {
			return "";
		}

		let buffer = [];
		buffer.push(`The entryway features the first of ${A.name}'s many banks of public screens.`);
		if (A.FSSupremacistDecoration >= 40) {
			buffer.push(`Some are showing talk shows and documentaries supporting A.FSSupremacistRace supremacy.`);
		}
		if (A.FSSubjugationistDecoration >= 40) {
			buffer.push(`Some are showing long pseudoscientific programs explaining A.FSSubjugationistRace degeneracy.`);
		}
		if (A.FSDegradationistDecoration >= 40) {
			buffer.push(`Some are showing abusive pornography involving slaves being beaten, sodomized, and modified against their will.`);
		}
		if (A.FSIntellectualDependencyDecoration >= 40) {
			buffer.push(`Some are showing simple, colorful, and very sexual programs made to excite slow slaves.`);
		}
		if (A.FSSlaveProfessionalismDecoration >= 40) {
			buffer.push(`Some are showing self-improvement shows on how to be a better slave for one's owner.`);
		}
		if (A.FSRepopulationFocusDecoration >= 40) {
			buffer.push(`Some are showing medical programs about pregnancy, interspersed with pornography starring slaves with big pregnant bellies.`);
		}
		if (A.FSRestartDecoration >= 40) {
			buffer.push(`Some are showing propaganda discouraging slave pregnancy, while encouraging the Elite to interbreed. Others urge free citizens to join the Societal Elite today.`);
		}
		if (A.FSGenderFundamentalistDecoration >= 40) {
			buffer.push(`Some are showing pornography starring women with perfect tits, tight asses and nice pussies.`);
		}
		if (A.FSPaternalistDecoration >= 40) {
			buffer.push(`Some are showing educational programs for the edification of slaves, and news programs featuring slave accomplishments.`);
		}
		if (A.FSDegradationistDecoration >= 40) {
			buffer.push(`Some are showing abusive pornography involving slaves being beaten, sodomized, and modified against their will.`);
		}
		if (A.FSBodyPuristDecoration >= 40) {
			buffer.push(`Some are showing sports programs, the latest games, and self-improvement videos.`);
		}
		if (A.FSTransformationFetishistDecoration >= 40) {
			buffer.push(`Some are showing medical programs about surgical transformation, interspersed with pornography starring slaves with fake tits.`);
		}
		if (A.FSYouthPreferentialist >= 40) {
			buffer.push(`Most of the girls featured are just over the age of majority.`);
		}
		if (A.FSMaturityPreferentialist >= 40) {
			buffer.push(`Most of the ladies featured are nice and mature.`);
		}
		if (A.FSStatuesqueGlorificationDecoration >= 40) {
			buffer.push(`Some are showing infomercials on how to appear taller, interspersed with pornography starring tall slaves.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 40) {
			buffer.push(`Some are showing infomercials for accommodating short slaves, interspersed with pornography focusing on the size differences between owners and slaves.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 40) {
			buffer.push(`Some are showing workout videos interspersed with pornography starring slim slaves.`);
		}
		if (A.FSAssetExpansionistDecoration >= 40) {
			buffer.push(`Some are playing pornography starring slaves with huge assets, interspersed with pharmaceutical advertisements.`);
		}
		if (A.FSPastoralistDecoration >= 40) {
			buffer.push(`Some are showing informational agricultural programs interspersed with pornography starring slaves who are lactating heavily${V.seePreg === 1 ? ", hugely pregnant, or often both" : ""}.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 40) {
			buffer.push(`Some are showing`);
			if (A.FSPhysicalIdealistLaw === 1) {
				buffer.push(`athletic competitions, advertisements for supplements, and pornography starring physically fit slaves.`);
			} else {
				buffer.push(`bodybuilding competitions, advertisements for supplements, and pornography starring hugely muscular slaves.`);
			}
		}
		if (A.FSHedonisticDecadenceDecoration >= 40) {
			buffer.push(`Some are showing pampering spas, advertisements for various eateries, and pornography starring corpulent slaves and food.`);
		}
		if (A.FSChattelReligionistDecoration >= 40) {
			buffer.push(`Some are showing religious services interspersed with serious programs on the compatibility of sexual slavery with the faith.`);
		}
		if (A.FSRomanRevivalistDecoration >= 40) {
			buffer.push(`Some are showing announcements on ${A.name}'s progress prepared by the state media for the edification of citizens.`);
		} else if (A.FSAztecRevivalistDecoration >= 40) {
			buffer.push(`Some are glorifying the Five Suns and the role of sacrifice and bloodletting.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 40) {
			buffer.push(`Some are showing educational and scientific programs interspersed with multicultural features.`);
		} else if (A.FSEdoRevivalistDecoration >= 40) {
			buffer.push(`Some are showing historical dramas set in Edo Japan.`);
		} else if (A.FSArabianRevivalistDecoration >= 40) {
			buffer.push(`Some are showing dramatic retellings of traditional Bedouin fables.`);
		} else if (A.FSChineseRevivalistDecoration >= 40) {
			buffer.push(`Some are showing ancient Chinese operas.`);
		}
		if (V.arcologyUpgrade.grid === 1) {
			buffer.push(`The programming is constantly updated to suit the individual viewer.`);
			if (V.brothelAdsSpending > 0) {
				buffer.push(`Pornographic advertisements for the brothel are interspersed with the programming.`);
				if (V.brothelAdsOld === 1) {
					buffer.push(`The featured slave actresses are all MILFs.`);
				} else if (V.brothelAdsOld === -1) {
					buffer.push(`The featured slave actresses are all nice and young.`);
				} else if (V.brothelAdsOld === -2) {
					buffer.push(`The featured slave actresses are all teenagers.`);
				} else if (V.brothelAdsOld === -3) {
					buffer.push(`The featured slave actresses are all lolis.`);
				} else {
					buffer.push(`The featured slave actresses vary in age.`);
				}
				if (V.brothelAdsStacked === 1) {
					buffer.push(`Lots of bouncing breasts and butts`);
				} else if (V.brothelAdsStacked === -1) {
					buffer.push(`Lots of trim breasts and shapely butts`);
				} else {
					buffer.push(`A variety of breast and butt sizes and shapes`);
				}
				buffer.push(`are on display, and`);
				if (V.brothelAdsImplanted === 1) {
					buffer.push(`most of these are augmented by implants.`);
				} else if (V.brothelAdsImplanted === -1) {
					buffer.push(`they're all natural.`);
				} else {
					buffer.push(`some are augmented by implants.`);
				}
				if (V.seePreg === 1) {
					if (V.brothelAdsPreg === 1) {
						buffer.push(`Most of slaves have firm, rounded bellies.`);
					} else if (V.brothelAdsPreg === -1) {
						buffer.push(`Most of the slaves have firm, flat bellies.`);
					} else {
						buffer.push(`Some of the slaves are pregnant.`);
					}
				}
				if (V.brothelAdsModded === 1) {
					buffer.push(`Everything is heavily pierced and tattooed.`);
				} else if (V.brothelAdsModded === -1) {
					buffer.push(`Everything is free of tattoos and piercings.`);
				} else {
					buffer.push(`Some of these assets are tattooed and pierced, and some aren't.`);
				}
				buffer.push(`The slaves in the ads are`);
				if (V.brothelAdsXX === 1) {
					buffer.push(`sucking dick and taking cock in their pussies and asses.`);
				} else if (V.brothelAdsXX === -1) {
					buffer.push(`sucking cock and being assfucked while their dicks flop around.`);
				} else {
					buffer.push(`sucking dick and taking anal, and the ones that have pussies are being fucked there, too.`);
				}
				const t = `As a result,  ${V.brothelName} is known as the place to go if you want to rent`;
				if (V.brothelAdsXX === 1) {
					if (V.brothelAdsImplanted === 1 && V.brothelAdsStacked === 1) {
						buffer.push(`${t} a${V.brothelAdsPreg === 1 ? " pregnant" : ""} bimbo's pussy.`);
					} else if (V.brothelAdsOld === 1) {
						buffer.push(`${t} a${V.brothelAdsPreg === 1 ? " pregnant" : ""} MILF's tits.`);
					} else if (V.brothelAdsOld === -3) {
						buffer.push(`${t} ${addA(`${V.brothelAdsPreg === 1 ? "pregnant " : ""}${V.brothelAdsStacked === 1 ? "oppai " : ""}loli.`)}`);
					} else if (V.brothelAdsPreg === 1) {
						buffer.push(`${t} a pregnant girl.`);
					}
				} else if (V.brothelAdsXX === -1) {
					if (V.brothelAdsStacked === 1) {
						buffer.push(`${t} a shemale's asspussy.`);
					} else if (V.brothelAdsStacked === -1) {
						buffer.push(`${t} a trap's tight ass.`);
					}
				}
			}
			if (V.clubAdsSpending > 0) {
				buffer.push(`Music videos set in  ${V.clubName} are also shown frequently.`);
				if (V.clubAdsOld === 1) {
					buffer.push(`The featured strippers are all MILFs.`);
				} else if (V.clubAdsOld === -1) {
					buffer.push(`The featured strippers are all nice and young.`);
				} else if (V.clubAdsOld === -2) {
					buffer.push(`The featured strippers are all teenagers.`);
				} else if (V.clubAdsOld === -3) {
					buffer.push(`The featured strippers are all lolis.`);
				} else {
					buffer.push(`The featured strippers vary in age.`);
				}
				if (V.clubAdsStacked === 1) {
					buffer.push(`Lots of bouncing breasts and butts`);
				} else if (V.clubAdsStacked === -1) {
					buffer.push(`Lots of trim breasts and shapely butts`);
				} else {
					buffer.push(`A variety of breast and butt sizes and shapes`);
				}
				buffer.push(`are on display, and`);
				if (V.clubAdsImplanted === 1) {
					buffer.push(`most of these are augmented by implants.`);
				} else if (V.clubAdsImplanted === -1) {
					buffer.push(`they're all natural.`);
				} else {
					buffer.push(`some are augmented by implants.`);
				}
				if (V.seePreg === 1) {
					if (V.clubAdsPreg === 1) {
						buffer.push(`Most of strippers have firm, rounded bellies.`);
					} else if (V.clubAdsPreg === -1) {
						buffer.push(`Most of the strippers have firm, flat bellies.`);
					} else {
						buffer.push(`Some of the strippers are pregnant.`);
					}
				}
				if (V.clubAdsModded === 1) {
					buffer.push(`Everything is heavily pierced and tattooed.`);
				} else if (V.clubAdsModded === -1) {
					buffer.push(`Everything is free of tattoos and piercings.`);
				} else {
					buffer.push(`Some of these assets are tattooed and pierced, and some aren't.`);
				}
				buffer.push(`The strippers get naked quickly, and show off`);
				if (V.clubAdsXX === 1) {
					buffer.push(`their pussies and assholes.`);
				} else if (V.clubAdsXX === -1) {
					buffer.push(`their assholes.`);
				} else {
					buffer.push(`their holes.`);
				}
				buffer.push(`The music videos are very popular.`);
				const t = `As a result,  ${V.clubName} is known as the place to spend a night partying with`;
				if (V.clubAdsXX === 1) {
					if (V.clubAdsImplanted === 1 && V.clubAdsStacked === 1) {
						buffer.push(`${t}${V.clubAdsPreg === 1 ? " pregnant" : ""} bimbos.`);
					} else if (V.clubAdsOld === 1) {
						buffer.push(`${t}${V.clubAdsPreg === 1 ? " pregnant" : ""} MILFs.`);
					} else if (V.clubAdsOld === -3) {
						buffer.push(`${t}${V.clubAdsPreg === 1 ? " pregnant" : ""}${V.brothelAdsStacked === 1 ? " oppai" : ""} lolis.`);
					} else if (V.clubAdsPreg === 1) {
						buffer.push(`${t} with pregnant sluts.`);
					}
				} else if (V.clubAdsXX === -1) {
					if (V.clubAdsStacked === 1) {
						buffer.push(`${t} with shemales.`);
					} else if (V.clubAdsStacked === -1) {
						buffer.push(`${t} traps.`);
					}
				}
			}
		}
		return buffer.join(" ");
	}

	const d40 = deco40();
	if (d40 !== "") {
		fragment.append(openDiv);
		// we have to reuse the variable because of scoping
		openDiv = App.UI.DOM.makeElement("div", d40, "indent");
	}

	/**
	 * @returns {string}
	 */
	function secExp() {
		if (V.secExpEnabled !== 1) {
			return "";
		}

		let buffer = [];
		if (V.SecExp.buildings.propHub.active === 1) {
			buffer.push(`A small street hides a surprisingly inconspicuous building, whose task is to manage your public image, protection and population control.`);
		}
		if (V.secHQ === 1) {
			buffer.push(`In a secure corner of the penthouse, the Security HQ silently works to build a safe and prosperous arcology.`);
		}
		if (V.SecExp.buildings.barracks.active === 1) {
			buffer.push(`At the center of the structure the barracks can be found filling the halls with the noise of ballistic weapons and training troops.`);
		}
		if (V.weapManu === 1) {
			buffer.push(`Down in the lower levels of the arcology the weapons manufacturing facility dominates the environment; there, armaments of all kind are produced and shipped away.`);
		}
		if (V.riotCenter === 1) {
			buffer.push(`Near the penthouse the riot control center can be found. Here dissidents and dangerous political forces of ${A.name} are carefully monitored and managed.`);
		}
		if (V.transportHub === 1) {
			buffer.push(`The transport hub, in the commercial section of the arcology, deals with new arrivals to ${A.name} via ${V.terrain === "oceanic" || V.terrain === "marine" ? "sea" : "land"} in addition to air.`);
		}
		return buffer.join(" ");
	}

	const se = secExp();
	if (se !== "") {
		fragment.append(openDiv);
		// we have to reuse the variable because of scoping
		openDiv = App.UI.DOM.makeElement("div", se, "indent");
	}

	function deco60() {
		if (FutureSocieties.HighestDecoration() < 60) {
			return "";
		}

		let buffer = [];
		buffer.push(`The central plaza is a large open atrium lined with banners.`);
		if (A.FSSupremacistDecoration >= 60) {
			buffer.push(`Some depict great achievements in ${A.FSSupremacistRace} history.`);
		}
		if (A.FSSubjugationistDecoration >= 60) {
			buffer.push(`Some depict crushing defeats in ${A.FSSubjugationistRace} history.`);
		}
		if (A.FSGenderRadicalistDecoration >= 60) {
			buffer.push(`Some are split horizontally in three: one part depicts penetration of a woman's pussy, another depicts penetration of a shemale's anus, and the third depicts simultaneous penetration of a hermaphrodite's pussy and anus. The order in which they appear, top to bottom, varies from banner to banner.`);
		}
		if (A.FSGenderFundamentalistDecoration >= 60) {
			buffer.push(`Some lovingly depict close-ups of pussies, a different one on each banner, in all their beauty and variation.`);
		}
		if (A.FSPaternalistDecoration >= 60) {
			buffer.push(`Some feature respectful portraits of some of the arcology's most talented slaves doing what they're best at.`);
		}
		if (A.FSRepopulationFocusDecoration >= 60) {
			buffer.push(`Some feature respectful portraits of happy pregnant women.`);
		}
		if (A.FSRestartDecoration >= 60) {
			buffer.push(`Some feature respectful portraits of society's finest.`);
		}
		if (A.FSBodyPuristDecoration >= 60) {
			buffer.push(`Some feature portraits of pristine nude bodies without a blemish or marking.`);
		}
		if (A.FSTransformationFetishistDecoration >= 60) {
			buffer.push(`Some depict sex featuring some of the arcology's most heavily implanted slaves.`);
		}
		if (A.FSYouthPreferentialistDecoration >= 60) {
			buffer.push(`Some depict idealized outlines of youthful bodies, with trim hips and pure faces.`);
		}
		if (A.FSMaturityPreferentialistDecoration >= 60) {
			buffer.push(`Some depict idealized outlines of mature bodies, with motherly hips and knowing faces.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 60) {
			buffer.push(`Some depict sex between bodies of vastly different sizes.`);
		}
		if (A.FSStatuesqueGlorificationDecoration >= 60) {
			buffer.push(`Some depict idealized outlines of statuesque bodies.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 60) {
			buffer.push(`Some feature artistic depictions of slender girls, running, dancing, and in the midst of the act of love.`);
		}
		if (A.FSAssetExpansionistDecoration >= 60) {
			buffer.push(`Some feature lewd close-ups of enormous breasts and giant asses.`);
		}
		if (A.FSPastoralistDecoration >= 60) {
			buffer.push(`Some feature prizewinning cows.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 60) {
			buffer.push(`Some feature`);
			if (A.FSPhysicalIdealistLaw === 1) {
				buffer.push(`athletic portraits of the arcology's fastest, strongest, and healthiest girls.`);
			} else {
				buffer.push(`some of the arcology's most swole ladies.`);
			}
		}
		if (A.FSHedonisticDecadenceDecoration >= 60) {
			buffer.push(`Many feature the most popular entertainment options your arcology has to offer.`);
		}
		if (A.FSChattelReligionistDecoration >= 60) {
			buffer.push(`Many include religious iconography.`);
		}
		if (A.FSSlaveProfessionalismDecoration >= 60) {
			buffer.push(`Most were handcrafted by the local chattel.`);
		}
		if (A.FSDegradationistDecoration >= 60) {
			buffer.push(`There are cages hanging from the ceiling of the central plaza; a naked slave occupies each one.`);
		}
		if (A.FSRomanRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a thriving Roman forum on market day.`);
		} else if (A.FSAztecRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a tribute to the gods, with huge statues, all looking in awe at the central temple. Many merchants peddle the goods of the new millennium.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a thriving ancient Egyptian market on a festival day.`);
		} else if (A.FSEdoRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a vision of urban Edo Japan, with strings of lanterns crisscrossing the space and the petals from cherry blossoms floating gently through the air.`);
		} else if (A.FSArabianRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a thriving Arabian slave market.`);
		} else if (A.FSChineseRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is constructed as a Chinese water market, with stalls set up to serve customers passing by on boats riding on shallow canals.`);
		}
		return buffer.join(" ");
	}

	const d60 = deco60();
	if (d60 !== "") {
		fragment.append(openDiv);
		// we have to reuse the variable because of scoping
		openDiv = App.UI.DOM.makeElement("div", d60, "indent");
		if (V.arcologyUpgrade.drones === 1) {
			openDiv.append(`A security drone occasionally flies across the open space.`);
		}
	} else if (V.arcologyUpgrade.drones === 1) {
		openDiv.append(` The central plaza is a large atrium; a security drone occasionally flies across the open space.`);
	}

	function deco80part1() {
		if (FutureSocieties.HighestDecoration() < 80) {
			return "";
		}

		let buffer = [];

		buffer.push(`There are numerous slaves stationed down on the plaza to greet visitors.`);
		if (A.FSSlaveProfessionalismDecoration >= 80) {
			buffer.push(`They're intelligent and articulate.`);
		}
		if (A.FSPaternalistDecoration >= 80) {
			buffer.push(`All are healthy and happy.`);
		}
		if (A.FSBodyPuristDecoration >= 80) {
			buffer.push(`Most are pretty and unspoiled.`);
		}
		if (A.FSStatuesqueGlorificationDecoration >= 80) {
			buffer.push(`Plenty are tall for their age.`);
		}
		if (A.FSTransformationFetishistDecoration >= 80) {
			if (A.FSTransformationFetishistResearch === 1) {
				buffer.push(`Most have absolutely enormous fake tits, lips and asses. Some even have breasts and butts larger than their entire bodies.`);
			} else {
				buffer.push(`Most have enormous fake tits, lips and asses.`);
			}
		}
		if (A.FSYouthPreferentialistDecoration >= 80) {
			buffer.push(`Most are quite young, and a fair amount of energetic giggling can be heard.`);
		}
		if (A.FSMaturityPreferentialistDecoration >= 80) {
			buffer.push(`Most are quite mature, and very experienced; they see nothing unusual about offering visitors public sex as a way to welcome them to ${A.name}.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 80) {
			buffer.push(`Many are girlish and energetic.`);
		}
		if (A.FSIntellectualDependencyDecoration >= 80) {
			buffer.push(`More than few are getting a little hands-on with the visitors.`);
		}
		if (A.FSAssetExpansionistDecoration >= 80) {
			if (A.FSAssetExpansionistResearch === 1) {
				buffer.push(`Many are using wheeled stands to permit them to stand despite their titanic breasts, massive asses, trunk-like cocks and boulder-sized balls.`);
			} else {
				buffer.push(`Many are wearing custom bras to manage their enormous breasts.`);
			}
		}
		if (A.FSRepopulationFocusDecoration >= 80) {
			buffer.push(`Most have large pregnant bellies.`);
		}
		if (A.FSRestartDecoration >= 80) {
			buffer.push(`All are either wearing chastity or are infertile.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 80) {
			buffer.push(`Most are making use of raised platforms to give guests a better view of their short figures.`);
		}
		if (A.FSPastoralistDecoration >= 80) {
			buffer.push(`Many of them can offer visitors a sample of ${A.name}'s pride and joy, straight from the nipple.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 80) {
			if (A.FSPhysicalIdealistLaw === 1) {
				buffer.push(`Their bodies are uniformly fit and healthy${A.FSRomanRevivalist > 0 ? " in the Hellenistic tradition" : ""}.`);
			} else {
				buffer.push(`Their musculature is uniformly stunning. Swole acceptance is high here.`);
			}
		}
		if (A.FSHedonisticDecadenceDecoration >= 80) {
			buffer.push(`Most are quite plush and often carry trays for visitors to sample the local pleasures.`);
		}
		if (A.FSRomanRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing authentic ancient Roman stolas and maintaining composed and dignified attitudes.`);
		} else if (A.FSAztecRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing authentic Aztec huipils, woven specifically to draw the attention of the visitors.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing authentic ancient Egyptian dresses, and are dancing and making merry when they aren't assisting people.`);
		} else if (A.FSEdoRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing daring kimonos, and politely greet visitors by their proper titles.`);
		} else if (A.FSArabianRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing beguiling harem girl outfits, and dance to set the little bells attached to the fabric jingling.`);
		} else if (A.FSChineseRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing qipaos cut very short, and jostle and chatter in the throng that packs the plaza.`);
		}
		if (A.FSGenderRadicalistDecoration >= 80) {
			if (A.FSGenderRadicalistResearch === 1) {
				buffer.push(`On several raised stands around the plaza, girls with dicks are stripping for the pleasure of passersby. Some of them are noticeably pregnant, despite lacking vaginas.`);
			} else {
				buffer.push(`On several raised stands around the plaza, girls with dicks are stripping for the pleasure of passersby.`);
			}
		}
		if (A.FSGenderFundamentalistDecoration >= 80) {
			buffer.push(`On several raised stands around the plaza, female slaves are stripping for the pleasure of passersby.`);
		}
		if (A.FSChattelReligionistDecoration >= 80) {
			buffer.push(`A handful of slaves are in religious attire, praying. They help if asked, and will even lead brief religious services if requested.`);
		}
		if (A.FSDegradationistDecoration >= 80) {
			buffer.push(`Numerous downtrodden slaves are working on the plaza at menial tasks. Some are even carrying citizens in sedan chairs.`);
		}
		if (A.FSSupremacistDecoration >= 80) {
			buffer.push(`Here and there around the plaza, slaves of every race besides ${A.FSSupremacistRace} people can be seen carrying things, cleaning, and even shining shoes.`);
		}
		if (A.FSSubjugationistDecoration >= 80) {
			buffer.push(`In the center of the plaza, an auction of a large group of frightened ${A.FSSubjugationistRace} slaves is taking place.`);
		}
		if (V.assistant.power > 0) {
			buffer.push(`The plaza is packed with citizens doing business.`);
		}

		return buffer.join(" ");
	}

	openDiv.append(deco80part1());

	fragment.append(openDiv);

	const citizenDiv = document.createElement("div");
	citizenDiv.classList.add("indent");

	function deco80part2() {
		if (FutureSocieties.HighestDecoration() < 80) {
			return "";
		}

		let buffer = [];
		if (A.FSSupremacistDecoration >= 80) {
			buffer.push(`The chanted sounds of indoctrination can faintly be heard in the plaza.`);
		}
		if (A.FSSubjugationistDecoration >= 80) {
			buffer.push(`Judging by the sound of leather on flesh, a whipping is happening somewhere close by the plaza.`);
		}
		if (A.FSGenderRadicalistDecoration >= 80) {
			buffer.push(`A slave is being sodomized in a parlor off the plaza, to go by the pained moaning.`);
		}
		if (A.FSGenderFundamentalistDecoration >= 80) {
			buffer.push(`A slave is being fucked in a parlor off the plaza, to go by the gasps of pleasure.`);
		}
		if (A.FSPaternalistDecoration >= 80) {
			buffer.push(`The sounds of orgasm are drifting out of a hallway off the plaza.`);
		}
		if (A.FSDegradationistDecoration >= 80) {
			buffer.push(`Agonized screaming is drifting out of a hallway off the plaza.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 80) {
			buffer.push(`The squeals of a slave being whisked off their feet somewhere off the plaza.`);
		}
		if (A.FSBodyPuristDecoration >= 80) {
			buffer.push(`Splashing water in a swimming pool can be heard from below the plaza.`);
		}
		if (A.FSRepopulationFocusDecoration >= 80) {
			buffer.push(`The sound of a woman in labor can be heard from somewhere off the plaza.`);
		}
		if (A.FSTransformationFetishistDecoration >= 80) {
			buffer.push(`The heavy beat of club music can be heard on the plaza.`);
		}
		if (A.FSSlaveProfessionalismDecoration >= 80) {
			buffer.push(`A deep discussion over sexual technique can be heard from a nearby balcony.`);
		}
		if (A.FSIntellectualDependencyDecoration >= 80) {
			buffer.push(`Giggles and moans are drifting out of a hallway off the plaza.`);
		}
		if (A.FSRestartDecoration >= 80) {
			buffer.push(`The sound of a fertile slave being viciously beaten can be heard from a side hall.`);
		}
		if (A.FSYouthPreferentialistDecoration >= 80) {
			buffer.push(`The squeals of a young slave taking cock in a tight hole are coming from somewhere off the plaza.`);
		}
		if (A.FSMaturityPreferentialistDecoration >= 80) {
			buffer.push(`The throaty laughter of an amused older woman is coming from somewhere off the plaza.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 80) {
			buffer.push(`The quiet murmur of feet on a running track can be heard from the club above the plaza.`);
		}
		if (A.FSAssetExpansionistDecoration >= 80) {
			buffer.push(`Stereotypical bimbo giggling can be heard from the club above the plaza.`);
		}
		if (A.FSStatuesqueGlorification >= 80) {
			buffer.push(`The sound of a short slave being bullied can be heard from somewhere off the plaza.`);
		}
		if (A.FSPastoralistDecoration >= 80) {
			buffer.push(`An indistinct gushing noise is coming from somewhere below the plaza.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 80) {
			buffer.push(`The clash of a deadlift bar being racked can be heard from a nearby gym.`);
		}
		if (A.FSHedonisticDecadenceDecoration >= 80) {
			buffer.push(`The sound of a rather heavy orgy can be heard from somewhere off the plaza.`);
		}
		if (A.FSChattelReligionistDecoration >= 80) {
			buffer.push(`A lovely hymn is drifting through the air.`);
		}
		if (A.FSRomanRevivalistDecoration >= 80 && A.FSRomanRevivalistSMR === 1) {
			buffer.push(`Faintly, the sound of cheering can be heard as`);
			if (A.FSPaternalist !== "unset") {
				buffer.push(`a slave achieves sexual victory over their partner`);
			} else if (V.pitKillsTotal > 0) {
				buffer.push(`a slave dies`);
			} else {
				buffer.push(`a slave successfully rapes`);
			}
			buffer.push(`in gladiatorial combat.`);
		} else if (A.FSAztecRevivalistDecoration >= 80) {
			buffer.push(`The sound of prayer and chanting echoes across the space, briefly accompanied by a sacrifice's  ${A.FSPaternalist !== "unset" ? "moaning" : "last scream"} as the rite completes.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 80) {
			buffer.push(`To the side of the plaza is a huge stone entryway heading down: the entrance to the tomb you have prepared for yourself.`);
		} else if (A.FSEdoRevivalistDecoration >= 80) {
			buffer.push(`Everyone maintains a certain air of decorum, and whenever two citizens meet they perform a polite ceremony of respectful greeting.`);
		} else if (A.FSArabianRevivalistDecoration >= 80) {
			buffer.push(`The throng packing the busy plaza must periodically give way before a new train of fresh slaves chained together at the neck, being led into the market by one of the arcology's many prosperous slavers.`);
		} else if (A.FSChineseRevivalistDecoration >= 80) {
			buffer.push(`The noise in the thriving open space is almost oppressive, with the sounds of drunken merriment, traditional music, and distant intercourse forming an omnipresent hum.`);
		}

		return buffer.join(" ");
	}

	citizenDiv.append(deco80part2());

	citizenDiv.append(` ${num(V.ACitizens)} citizens and ${num(V.ASlaves + V.slaves.length)} slaves live in ${A.name}.`);

	function fsLaws() {
		let buffer = [];
		if (A.FSSupremacistLawME === 1) {
			buffer.push(`The citizenry is entirely ${A.FSSupremacistRace}.`);
		}
		if (A.FSRomanRevivalistLaw === 1) {
			buffer.push(`Every citizen has military responsibilities, which are a point of pride to many, with most opting to wear utilitarian clothing even when off duty.`);
		}
		if (A.FSAztecRevivalistLaw === 1) {
			buffer.push(`Most citizens wear satin loincloths and cloaks, distinguished from those of slaves by the richness of their adornments.`);
		}
		if (A.FSMaturityPreferentialistLaw === 1) {
			buffer.push(`Most citizens are at least middle-aged, and graying hair on a citizen is considered attractive here.`);
		} else if (A.FSYouthPreferentialistLaw === 1) {
			buffer.push(`Most citizens shine with youth and enthusiasm.`);
		}
		if (A.FSGenderRadicalistDecoration === 100) {
			buffer.push(`Every single one of the slaves is female by virtue of her fuckable asshole.`);
		} else if (A.FSGenderFundamentalistSMR === 1) {
			buffer.push(`Almost every citizen is an upstanding man, while the slave population is almost completely female.`);
		}
		if (A.FSEgyptianRevivalistLaw === 1) {
			buffer.push(`Close relationships between citizens and slaves, especially slave siblings, are common.`);
		} else if (A.FSEgyptianRevivalistIncestPolicy === 1) {
			buffer.push(`Close relationships between citizens, slaves and siblings are common.`);
		}
		if (A.FSSubjugationistLawME === 1) {
			buffer.push(`${A.FSSubjugationistRace} subhumans form a majority of the slaves.`);
		}
		if (A.FSChattelReligionistLaw === 1) {
			buffer.push(`The slave population as a whole is unusually accepting of its station.`);
		}
		if (A.FSPaternalistLaw === 1) {
			buffer.push(`The slaves are well cared for, and it can sometimes be difficult to tell slaves from citizens.`);
		} else if (A.FSDegradationistLaw === 1) {
			buffer.push(`Most of the slaves are recent captures, since the vicious society that's taken root here uses people up quickly.`);
		}
		if (A.FSBodyPuristLaw === 1) {
			buffer.push(`The average slave is quite healthy.`);
		} else if (A.FSTransformationFetishistSMR === 1) {
			if (A.FSTransformationFetishistResearch === 1) {
				buffer.push(`Breast implants are almost universal;  ${A.FSSlimnessEnthusiast === "unset" ? "an M-cup bust is below average among the slave population" : "even the most lithe slave sports a pair of overly round chest balloons"}.`);
			} else {
				buffer.push(`Breast implants are almost universal;  ${A.FSSlimnessEnthusiast === "unset" ? "a D-cup bust is below average among the slave population" : "even the most lithe slave sports a pair of overly round chest balloons"}.`);
			}
		}
		if (A.FSIntellectualDependencySMR === 1) {
			buffer.push(`The average slave is entirely dependent on its master.`);
		} else if (A.FSSlaveProfessionalismSMR === 1) {
			buffer.push(`The average slave is entirely capable of acting on its master's behalf.`);
		}
		if (A.FSSlimnessEnthusiastSMR === 1) {
			buffer.push(`Most of the slave population is quite slim and physically fit.`);
		} else if (A.FSAssetExpansionistSMR === 1) {
			buffer.push(`${A.name}'s consumption of pharmaceuticals is impressive, since slave growth hormones are nearly ubiquitous.`);
		}
		if (A.FSPetiteAdmirationSMR === 1) {
			buffer.push(`Slaves are both easy to identify, but hard to find in a crowd given their short stature.`);
		} else if (A.FSStatuesqueGlorificationSMR === 1) {
			buffer.push(`${A.name}'s ${A.FSStatuesqueGlorificationLaw === 1 ? "entire" : "slave"} population stands taller than most visitors.`);
		}
		if (A.FSRepopulationFocusSMR === 1) {
			buffer.push(`Most of the slaves in the arcology are sporting pregnant bellies.`);
		} else if (A.FSRestartSMR === 1) {
			buffer.push(`Most of the slaves in the arcology are infertile.`);
		}
		if (A.FSRestartLaw === 1) {
			if (V.ACitizens < 600) {
				buffer.push(`Nearly every free woman is a member of the Elite and some degree pregnant.`);
			} else {
				buffer.push(`It isn't uncommon to see a free woman pregnant and proudly bearing the insignia of the Elite.`);
			}
		}
		if (A.FSRepopulationFocusLaw === 1) {
			buffer.push(`It isn't uncommon to see free women proudly sporting waist sizes over 100cm either.`);
		}
		if (A.FSPastoralistLaw === 1) {
			buffer.push(`Much of the menial slave labor force works to service ${A.name}'s hundreds of human cattle.`);
		}
		if (A.FSPhysicalIdealistSMR === 1) {
			buffer.push(`${A.name} must import a very large quantity of nutritive protein to nourish its slaves.`);
		}
		if (A.FSHedonisticDecadenceSMR === 1) {
			buffer.push(`${A.name} must import a very large quantity of fattening food to plump up its slaves.`);
		}

		return buffer.join(" ");
	}

	citizenDiv.append(fsLaws());

	citizenDiv.append(` Its lingua franca is ${V.language}.`);
	fragment.append(citizenDiv);

	/**
	 * @returns {HTMLDivElement}
	 */
	function peacekeepers() {
		const div = document.createElement("div");
		div.classList.add("indent");

		if (V.plot) {
			if (V.peacekeepers === 0) {
				if (V.invasionVictory) {
					div.append(`The area previously occupied by the little old world country whose collapse led to a failed invasion of the Free City is a lawless wilderness.`);
				} else if (V.week > 29) {
					div.append(`A small old world country near the arcology is in the process of collapse${V.nationHate ? ", and your opportunistic behavior towards it has caused hatred there" : ""}.`);
				} else {
					div.append(`There is nothing notable about the decaying old world countries ${V.terrain === "oceanic" ? "on the shoreline nearest" : "near"} the arcology.`);
				}
			} else {
				if (V.peacekeepers.strength >= 50) {
					div.append(`General  ${V.peacekeepers.generalName} now governs an area near the Free City as a warlord, using the men and women of his former peacekeeping forces to rule.`);
					if (V.peacekeepers.attitude >= 100) {
						div.append(` The area is a de facto client state of your arcology.`);
					} else {
						div.append(` He considers himself indebted to you, and delivers periodic tributes of menial slaves.`);
					}
				} else {
					// TODO create an actual framework for this behaviour (only refreshing a specific element)
					const undermine = function undermine() {
						const fragment = document.createDocumentFragment();

						fragment.append(`There's a peacekeeping force led by General ${V.peacekeepers.generalName} in the troubled area near the Free City.`);

						if (V.peacekeepers.undermining > 0) {
							fragment.append(` You are spending ¤`,
								App.UI.DOM.makeTextBox(V.peacekeepers.undermining, v => {
									V.peacekeepers.undermining = Math.clamp(Math.ceil(v / 1000) * 1000, 0, 10000);
									refresh();
								}, true),
								` each week to promote misinformation in the old world that undermines the peacekeepers.`);
						} else {
							fragment.append(`You are not undermining the peacekeepers. `,
								App.UI.DOM.link("Start a misinformation campaign", () => {
									V.peacekeepers.undermining = 1000;
									refresh();
								}));
						}

						return fragment;

						function refresh() {
							span.innerHTML = "";
							span.append(undermine());
						}
					};

					const span = document.createElement("span");
					span.append(undermine());
					div.append(span);
				}
			}
		}
		return div;
	}

	const peace = peacekeepers();
	if (lastElement !== undefined) {
		peace.append(" ", lastElement);
	}
	fragment.append(peace);

	return fragment;
};
