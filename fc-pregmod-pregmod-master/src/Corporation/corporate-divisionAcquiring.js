App.Corporate.Init_DivisionAcquiring = function(shared) {
	App.Corporate.Division.Acquiring = class extends App.Corporate.Division.Base {
		constructor({slaveValue, acquiring, mercenaryHelp, nextDivision}) {
			super(arguments[0]);
			this._const.slaveValue = slaveValue;
			this._const.acquiring = new averageRange(acquiring);
			this._const.nextDivisions = nextDivision;
			if(mercenaryHelp != null) {
				this._const.mercenaryHelp = {
					level: mercenaryHelp.level,
					cost: mercenaryHelp.cost
				};
			}
		}
		// abstract virtual definitions
		get fromMarket()		  { return false; }
		get toMarket()			{ return true; }
		get heldSlaves()		  { return this.getStored("Slaves"); }
		set heldSlaves(value)	 { this.setStored("Slaves", Math.trunc(value)); }
		get activeSlaves()		{ return 0; }
		set activeSlaves(value)   { throw "Cannot set active slaves for acquiring divisions"; }
		get processRate()		 { return this._const.acquiring.center; }
		get purchasedSlaveValue() { return null; }
		get initialSlaveValue()   { return this.soldSlaveValue; }
		get soldSlaveValue()	  { return this._const.slaveValue; }
		get nounFinishedSlave()   { return "slave"; }
		get nounSlaveFromMarket() { return "slave"; }
		messageSlaveCount() {
			return `It averages <span class="green">${numberWithPluralNonZero(this.developmentCount, "new slave")}</span> each week.`;
		}
		messageSlaveOutput() {
			return shared.MessageSlaveToMarket(this);
		}
		message_endWeek_Slaves(divLedger) {
			let newSlaves = divLedger.slaves.value;
			if(newSlaves > 0) {
				return `<span class="green">acquired ${numberWithPlural(newSlaves, "slave")}</span>`
					 + (this.hadMercenaryHelp ? " with the help of your mercenaries" : "");
			} else {
				return `<span class="red">failed to acquire any slaves</span>`
					 + (this.hadMercenaryHelp ? " even with the help of your mercenaries" : "");
			}
		}
		endWeek_Slaves(divLedger) {
			let slaves = shared.EndWeekProcessing_Slaves(this.developmentCount, this._const.acquiring);
			this.heldSlaves += slaves.value;
			return divLedger.slaves.apply(slaves);
		}
		// virtual overrides
		get nextDivisions()	   { return this._const.nextDivisions; }
		dissolve() {
			App.Corporate.sellSlaves(this, this.heldSlaves);
			super.dissolve();
			delete V.corp[`${this._const.corpId}Slaves`];
		}
		getAutoBuyFromMarket() {
			return false;
		}
		setAutoBuyFromMarket(value) {
			throw "Acquiring divisions cannot acquire from the market";
		}

		get availableRoom() { return 0; }
		get maintenanceSlaves() { return this.developmentCount; }
		get maintenanceCost() {
			// If it makes sense to have mercenaries help with other types of divisions, this code and the mercenaryHelp property will need to be moved into the super class.
			let baseCost = super.maintenanceCost;

			if(this.hadMercenaryHelp) {
				const mercHelpCost = Math.trunc((V.mercenaries - this._const.mercenaryHelp.level) * this._const.mercenaryHelp.cost * 1000);
				baseCost += mercHelpCost;
			}
			return baseCost;
		}

		create() {
			super.create();
			this.heldSlaves = 0;
			shared.FoundingSetupAutoSell(this);
		}

		get hadMercenaryHelp() { return this._const.mercenaryHelp != null && V.mercenariesHelpCorp === 1 && V.mercenaries > this._const.mercenaryHelp.level; }
	};
};
