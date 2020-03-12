interface Window {

	jsRandom(min: number, max: number): number;

	SlaveDataSchemeCleanup(slave: App.Entity.SlaveState): void;

	walkPasts(slave: App.Entity.SlaveState, seed: any): string;
	WombInit(actor: any): void;
	WombImpregnate(actor, fCount, fatherID, age, surrogate?): void;
	WombSurrogate(actor, fCount, mother, fatherID, age): void;
	WombSort(actor): void;

	capFirstChar(s: string): string;

	canWalk(slave: App.Entity.SlaveState): boolean;

	rulesAutosurgery: any;
	ruleApplied: any;
	SlaveSummary: any;
}

declare namespace App {
	namespace Art {}

	namespace Corporate {}

	namespace Data {
		namespace Pronouns {
			class Definition {
				pronoun: string;
				possessive: string;
				possessivePronoun: string;
				object: string;
				objectReflexive: string;
				noun: string;
			}
		}
	}

	namespace Debug {}
	namespace Desc {}

	namespace Encyclopedia {
		namespace Entries {}
	}

	namespace Entity {
		class Serializable {}

		namespace Utils {}
	}

	namespace Facilities {}

	namespace Interact {}

	namespace MainView {}

	namespace RA {
		class NumericTarget {
			cond: string;
			val: number;
		}

		class NumericRange {
			min: number;
			max: number;
		}

		class RuleConditions {
			function: boolean | string;
			data: any;
			assignment: string[];
			selectedSlaves: number[];
			excludedSlaves: number[];
		}

		class RuleSurgerySettings {
			eyes: number;
			hears: number;
			smells: number;
			tastes: number;
			lactation: number;
			prostate: number;
			cosmetic: number;
			accent: number;
			shoulders: number;
			shouldersImplant: number;
			boobs: NumericTarget;
			hips: number;
			hipsImplant: number;
			butt: NumericTarget;
			faceShape: string;
			lips: NumericTarget;
			holes: number;
			hair: number;
			bodyhair: number;
			vasectomy: boolean;
			bellyImplant: string;
			tummy: number;
			earShape: number;
			horn: number;
		}

		class RuleGrowthSetters {
			boobs: NumericTarget;
			butt: NumericTarget;
			lips: NumericTarget;
			dick: NumericTarget;
			balls: NumericTarget;
			intensity: number;
		}

		class RuleReleaseSetters {
			masturbation: number;
			partner: number;
			family: number;
			slaves: number;
			master: number;
		}

		class RuleSetters {
			releaseRules: RuleReleaseSetters;
			toyHole: string;
			clitSetting: string;
			clitSettingXY: number;
			clitSettingXX: number;
			clitSettingEnergy: number;
			speechRules: string;
			clothes: string;
			collar: string;
			shoes: string;
			armAccessory: string;
			legAccessory: string;
			chastityVagina: number;
			chastityAnus: number;
			chastityPenis: number;
			virginAccessory: string;
			aVirginAccessory: string;
			vaginalAccessory: string;
			aVirginDickAccessory: string;
			dickAccessory: string;
			bellyAccessory: string;
			aVirginButtplug: string;
			buttplug: string;
			vaginalAttachment: string;
			buttplugAttachment: string;
			eyeColor: string;
			makeup: number;
			nails: number;
			hColor: string;
			hLength: number;
			haircuts: number;
			hStyle: string;
			eyebrowHColor: string;
			eyebrowHStyle: string;
			eyebrowFullness: string;
			markings: string;
			pubicHColor: string;
			pubicHStyle: string;
			nipplesPiercing: number;
			areolaePiercing: number;
			clitPiercing: number;
			vaginaLube: number;
			vaginaPiercing: number;
			dickPiercing: number;
			anusPiercing: number;
			lipsPiercing: number;
			tonguePiercing: number;
			earPiercing: number;
			nosePiercing: number;
			eyebrowPiercing: number;
			navelPiercing: number;
			corsetPiercing: number;
			boobsTat: string | number;
			buttTat: string | number;
			vaginaTat: string | number;
			dickTat: string | number;
			lipsTat: string | number;
			anusTat: string | number;
			shouldersTat: string | number;
			armsTat: string | number;
			legsTat: string | number;
			backTat: string | number;
			stampTat: string | number;
			birthsTat: string | number;
			abortionTat: string | number;
			pitRules: number;
			curatives: number;
			livingRules: string;
			relationshipRules: string;
			standardPunishment: string;
			standardReward: string;
			weight: NumericRange;
			diet: string;
			dietCum: number;
			dietMilk: number;
			onDiet: number;
			muscles: NumericTarget;
			XY: number;
			XX: number;
			gelding: number;
			preg: boolean;
			abortion: string[];
			growth: RuleGrowthSetters;
			hyper_drugs: number;
			aphrodisiacs: number;
			autoSurgery: number;
			autoBrand: number;
			pornFeed: number;
			pornFameSpending: number;
			dietGrowthSupport: number;
			eyewear: string;
			earwear: string;
			setAssignment: string;
			facilityRemove: boolean;
			removalAssignment: string;
			surgery: RuleSurgerySettings;
			underArmHColor: string;
			underArmHStyle: string;
			drug: string;
			eyes: string;
			pregSpeed: string;
			bellyImplantVol: number;
			teeth: string;
			label: string;
			removeLabel: string;
			skinColor: string;
			inflationType: string;
			brandTarget: string;
			brandDesign: string;
			scarTarget: string;
			scarDesign: string;
			hornColor: string;
			labelTagsClear: boolean;
		}

		class Rule {
			ID: string;
			name: string;
			condition: RuleConditions;
			set: RuleSetters;
		}
	}

	namespace SecExp {}
	namespace SF {}

	namespace UI {
		namespace DOM {}
		namespace View {}
	}

	namespace Update {}
	namespace Utils {}

	namespace Medicine {
		namespace Surgery {
			/**
			 * Describes surgical procedure
			 */
			class Procedure {
				/**
				 * Type code that identifies this kind of procedure.
				 * Currently unused, but planned for future use by RA for prioritizing procedures
				 */
				typeId: string;
				/**
				 * Short label for the procedure. Can be used as a link text.
				 */
				label: string;
				/**
				 * If procedure is targeted at changing object characteristic, this is the net change (signed)
				 */
				targetEffect: number;
				/**
				 * Description of the procedure, more or less detailed
				 */
				description: string;
				/**
				 * Money costs (positive when you pay for it)
				 */
				costs: number;
				/**
				 * Projected health loss (positive when health decreases)
				 */
				healthCosts: number;
				/**
				 * Function to perform the procedure
				 * If action is undefined, the procedure can't be applied (and .description contains the reason)
				 */
				action: slaveOperation;
				/**
				 * surgery type for passages like "Surgery Degradation"
				 */
				surgeryType: string;
			}

			class SizingOptions {
				/** include possible augmentation procedures */
				augmentation?: boolean;
				/** include possible reduction procedures */
				reduction?: boolean;
				/** include option to install string implants */
				strings?: boolean;
				/** include implant change options */
				replace?: boolean;
			}
		}
		namespace OrganFarm {
			namespace Organs {
			}
		}
	}
}

const V: any;
