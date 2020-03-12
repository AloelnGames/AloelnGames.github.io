App.Corporate.Init_DivisionBase = function(shared) {
	App.Corporate.Division.Base = class {
		constructor({id, name, focusDescription, sizeCost, maintenance, founding, merger}) {
			this._const = {};
			this._const.id = id;
			this._const.corpId = `Div${capFirstChar(id)}`;
			this._const.cost = sizeCost;
			this._const.name = name;
			this._const.focusDescription = focusDescription;
			this._const.maintenance = {
				quadratic: maintenance.quadratic,
				linear: maintenance.linear,
				category: maintenance.category
			};
			if(founding != null) {
				this._const.founding = new shared.FoundingType(this, founding);
			}
			if(merger != null && _.isObject(merger) || (Array.isArray(merger) && merger.length > 0)) {
				if(!Array.isArray(merger)) {
					merger = [merger];
				}
				this._const.merger = merger;
			}
			this.relatedDivisions = new shared.RelatedDivisionType();
		}
		// initialized data
		get id()				  { return this._const.id; }
		get sizeCost()			{ return this._const.cost; }
		get name()				{ return this._const.name; }
		get focusDescription()	{ return this._const.focusDescription; }
		get founding()			{ return this._const.founding; }
		get nextDivisions()	   { return null; }
		get hasMergers()		  { return this._const.merger != null; }
		get mergerChoices()	   { return this._const.merger; }
		get maintenanceCategory() { return this._const.maintenance.category; }

		// stored variables
		get founded()			   { return this.getStored('') == 1; }
		get foundedDate()		   { return this.getStored('Founded'); }
		get developmentCount()	  { return this.getStored("Dev"); }
		set developmentCount(value) {
			if(value < 0) { throw "Cannot set development count to less than 0"; }
			// dissolve is the only function that sets founded to false.
			if(value == 0 && this.founded) { throw "Cannot set development count to 0; use dissolve instead."; }
			this.setStored("Dev", value);
		}

		// calculated
		get availableRoom()	   { return Math.max(0, this.developmentCount - this.activeSlaves); }
		get maintenanceCost() {
			return Math.trunc( this._const.maintenance.linear	* 1000 * this.developmentCount
							 + this._const.maintenance.quadratic * Math.pow(this.activeSlaves, 2));
		}
		get foundingCostDivision() { return this._const.founding.size * this.sizeCost; }
		get foundingCost()		 { return this.foundingCostDivision; }
		get canFoundCorporation()  { return this._const.founding != null; }
		get foundingCash() {
			if(!this.canFoundCorporation) { throw `${this.name} is not set up found a corporation`; }
			return 1000 * this._const.founding.startingPrice;
		}
		get value() {
			const developmentValue = this.developmentCount * this.sizeCost * 800;
			let slaveProcValue = 0;
			let slaveHeldValue = 0;

			if(this.activeSlaves > 0) { slaveProcValue = this.activeSlaves * this.purchasedSlaveValue * 1000; }
			if(this.heldSlaves > 0) { slaveHeldValue = this.heldSlaves * this.soldSlaveValue * 1000; }

			return developmentValue + slaveProcValue + slaveHeldValue;
		}

		// abstract virtual
		get fromMarket()					 { throw "Must be defined"; }
		get toMarket()					   { throw "Must be defined"; }
		get heldSlaves()					 { throw "Must be defined"; }
		set heldSlaves(value)				{ throw "Must be defined"; }
		get activeSlaves()				   { throw "Must be defined"; }
		set activeSlaves(value)			  { throw "Must be defined"; }
		get processRate()					{ throw "Must be defined"; }
		get initialSlaveValue()			  { throw "Must be defined"; }
		get soldSlaveValue()				 { throw "Must be defined"; }
		get slaveAction()					{ throw "Must be defined"; }
		get nounFinishedSlave()			  { throw "Must be defined"; }
		get nounSlaveFromMarket()			{ throw "Must be defined"; }
		messageSlaveCount()				  { throw "Must be defined"; }
		messageSlaveOutput()				 { throw "Must be defined"; }
		message_endWeek_Slaves(divLedger)	{ throw "Must be defined"; }
		endWeek_Slaves(ledger, divLedger)	{ throw "Must be defined"; }

		// The value of a slave ignoring enhancements from founded divisions
		// The actual value of a slave after all improvements
		get purchasedSlaveValue() {
			let cheapest  = {'value':Number.MAX_VALUE, 'div': null};
			let expensive = {'value': 0, 'div': null};
			for(let fromDiv of this.relatedDivisions.from) {
				let initialValue = fromDiv.initialSlaveValue;
				if(initialValue < cheapest.value) {
					cheapest.value = initialValue;
					cheapest.div = fromDiv;
				}
				if(fromDiv.founded) {
					let soldValue = fromDiv.soldSlaveValue;
					if(soldValue > expensive.value) {
						expensive.value = soldValue;
						expensive.div = fromDiv;
					}
				}
			}
			if(expensive.div != null && expensive.value != cheapest.value) {
				// The added value of an owned intermediary takes time to work its way through this division to the next
				let expensiveDiv = expensive.div;
				let valueDiff = expensive.value - cheapest.value;
				let weeksSinceFounding = V.week - (expensiveDiv.foundedDate || 0);
				let weeksToProcess = 10 * expensiveDiv.processRate;
				let multiplier = Math.min(weeksSinceFounding / weeksToProcess, 1);
				let finalAddedValue = valueDiff * multiplier;
				return cheapest.value + finalAddedValue;
			} else if(cheapest.div != null) {
				return cheapest.value;
			}
			throw "No route to acquisition found.";
		}
		get maintenanceSlaves() { return this.activeSlaves * this.processRate; }
		getDisplayMaintenanceCost() {
			const cost	= this.maintenanceCost;
			const processedCount = this.maintenanceSlaves;

			return {cost, perUnit: cost / processedCount};
		}
		getAutoSendToDivision(division) {
			return !App.Corporate.ownsIntermediaryDivision(this, division)
				&& this.getStored(`To${division.id}`) == 1;
		}
		setAutoSendToDivision(division, value) {
			this.setStored(`To${division.id}`, value ? 1 : 0);
		}
		getAutoSendToMarket() {
			return this.getStored("ToMarket") == 1;
		}
		setAutoSendToMarket(value) {
			this.setStored("ToMarket", value ? 1 : 0);
		}
		getAutoBuyFromMarket() {
			return this.getStored("FromMarket");
		}
		setAutoBuyFromMarket(value) {
			this.setStored("FromMarket", value ? 1 : 0);
		}
		endweek_Revenue(divLedger) {
			// Unless otherwise specified, divisions don't produce revenue directly.
		}
		endWeek_Transfer(divLedger) {
			let transferRetval = {total:0};
			let divisions = [];
			for(let otherDiv of this.relatedDivisions.to.filter(div=> div.founded && this.getAutoSendToDivision(div))) {
				const otherLedger = divLedger.weekLedger.getDivision(otherDiv);

				const room = otherDiv.availableRoom - otherLedger.transfer.in;
				if(room == 0) { continue; }
				divisions.push({division: otherDiv, room});
			}
			const fillDivisions = evenFillArray(divisions, this.heldSlaves, pair=>pair.room);
			for(const filled of fillDivisions) {
				const division = filled.item.division;
				const value = filled.value;
				divLedger.transfer.addDivision(division, value);
			}
		}
		endWeek_Market(divLedger) {
			if(this.getAutoSendToMarket()) {
				divLedger.market.sell = this.heldSlaves - divLedger.transfer.total;
			}
			if(this.getAutoBuyFromMarket()) {
				divLedger.market.buy = this.availableRoom - divLedger.transfer.in;
			}
			shared.SellUnhousedSlaves(this, divLedger, this.processRate);
		}

		create() {
			if(this.founded) { throw `${this.name} has already been founded.`; }

			App.Corporate.expandedDivision();
			App.Corporate.chargeAsset(this.foundingCostDivision * 1000, "development");
			this.setStored('', 1);
			this.developmentCount = this._const.founding.size;
			this.setStored('Founded', V.week);
		}
		dissolve() {
			this.setStored('', 0);
			App.Corporate.sellDevelopment(this);
			App.Corporate.dissolvedDivision();
			this.relatedDivisions.to.forEach(nextDep => delete V.corp[`${this._const.corpId}To${nextDep.id}`]);
		}

		// private helpers
		getStored(key	   ) { return V.corp[this._const.corpId + key];  }
		setStored(key, value) { V.corp[this._const.corpId + key] = value; }
	};
};
