
window.averageRange = class {
	constructor({center, range}) {
		this._const = {
			center,
			range
		};
	}
	get center() { return this._const.center; }
	get range() { return this._const.range; }
	roll() {
		let roll = Math.clamp(gaussianPair(0, 0.2)[0], -0.5, 0.5);
		return {roll, value: (roll * this.range) + this.center};
	}
	rollInt() {
		let retval = this.roll();
		retval.value = Math.trunc(retval.value);
		return retval;
	}
};
window.evenFillArray = function(array, amount, lookupAmount) {
	let perItem, changed;
	let retval = [];
	do {
		let newArray = [];
		changed = false;
		perItem = Math.trunc(amount / array.length);
		for(let item of array) {
			let itemValue = lookupAmount(item);
			if(itemValue >= perItem) {
				newArray.push(item);
				continue;
			}

			amount -= itemValue;
			retval.push({item, value:itemValue});
			changed = true;
		}
		array = newArray;
	} while (changed);
	let remainder = amount % array.length;
	for(let item of array) {
		let extra = 0;
		if(remainder > 0) {
			remainder--;
			extra = 1;
		}
		retval.push({item, value: perItem + extra});
	}
	return retval;
};
window.typeHiddenMembers = class {
	constructor() {
		this._const = {};
		this._var   = {};
		this._cache = {};
	}
};
App.Corporate.Init = function() {
	const Ledger = class {
		constructor(corp, suffix="") {
			this.corp = corp;
			this.suffix = suffix;
			this.clear();
		}
		get operations(	 )	 { return this.getStored('OpCost'			  ); }
		set operations(value)	 { return this.setStored('OpCost', value); }

		get localRevenue(	 )   { return this.getStored('Rev'				 ); }
		set localRevenue(value)   { return this.setStored('Rev', value); }

		get development(	 )	{ return this.getStored('AssetsDev'		   ); }
		set development(value)	{ return this.setStored('AssetsDev', value); }

		get slaves(	 )		 { return this.getStored('AssetsSlave'		 ); }
		set slaves(value)		 { return this.setStored('AssetsSlave', value); }

		get overhead(	 )	   { return this.getStored('Overhead'			); }
		set overhead(value)	   { return this.setStored('Overhead', value); }

		get economicBoost(	 )  { return this.getStored('EconBonus'		   ); }
		set economicBoost(value)  { return this.setStored('EconBonus', value); }

		get economy(	 )		{ return this.getStored('Econ'		   ); }
		set economy(value)		{ return this.setStored('Econ', value); }

		get foreignRevenue(	 ) { return this.getStored('NeighborBonus'	   ); }
		set foreignRevenue(value) { return this.setStored('NeighborBonus', value); }

		copy(ledger) {
			this.operations	 = ledger.operations;
			this.localRevenue   = ledger.localRevenue;
			this.foreignRevenue = ledger.foreignRevenue;
			this.development	= ledger.development;
			this.slaves		 = ledger.slaves;
			this.overhead	   = ledger.overhead;
			this.economicBoost  = ledger.economicBoost;
			this.economy		= ledger.economy;
		}
		clear() {
			this.operations	 = 0;
			this.localRevenue   = 0;
			this.foreignRevenue = 0;
			this.development	= 0;
			this.slaves		 = 0;
			this.overhead	   = 0;
			this.economicBoost  = 0;
			this.economy		= 0;
		}
		release() {
			this.deleteStored('OpCost');
			this.deleteStored('Rev');
			this.deleteStored('AssetsDev');
			this.deleteStored('AssetsSlave');
			this.deleteStored('Overhead');
			this.deleteStored('EconBonus');
			this.deleteStored('Econ');
			this.deleteStored('NeighborBonus');
		}
		get profit() {
			return this.revenue + this.economicBoost
				 - this.development - this.slaves - this.overhead - this.operations;
		}
		get revenue() {
			return this.localRevenue + this.foreignRevenue;
		}
		setEconomy(economy) {
			this.economy = economy;

			// NOTE: Set economicBoost to 0 so it doesn't affect this.profit!
			this.economicBoost = 0; // <-- DO NOT delete
			this.economicBoost = Math.trunc(this.profit * (economy - 100) / 100);
		}
		// private access
		getStored(key) {
			return this.corp.getStored(key + this.suffix);
		}
		setStored(key, value) {
			return this.corp.setStored(key + this.suffix, value);
		}
		deleteStored(key){
			this.corp.deleteStored(key + this.suffix);
		}
	};
	const WeekProcessingEffeciencyLine = class {
		constructor() {
			this.value = 0;
			this.efficiency = 0;
		}
		apply(pair) {
			this.value = pair.value;
			this.efficiency = pair.efficiency;
		}
	};
	const WeekProcessingTransfer = class extends typeHiddenMembers {
		constructor(divLedger) {
			super();
			this._const.divLedger = divLedger;
			this._var.divisions = [];
			this._var.in = 0;
			this._var.out = 0;
		}
		addDivision(division, fill) {
			const otherLedger = this._const.divLedger.weekLedger.getDivision(division);

			this._var.out += fill;
			otherLedger.transfer.in += fill;

			this._var.divisions.push({division, fill});
		}
		get in() {
			return this._var.in;
		}
		set in(value) {
			if(value == this._var.in) { return; }
			if(this._const.divLedger.market.canBuy) {
				this._const.divLedger.market.buy -= value - this._var.in;
			}
			this._var.in = value;
		}
		get total() {
			return this._var.out;
		}
		get divisions() {
			return this._var.divisions;
		}
	};
	const WeekProcessingMarket = class extends typeHiddenMembers {
		constructor(divLedger) {
			super();

			this._const.divLedger = divLedger;
			this._var.canBuy = false;
			this._var.buy = 0;
			this._var.sell = 0;
		}
		get buy() {
			return this._var.buy;
		}
		set buy(value) {
			// Note: canBuy merely means we've set buy to some value, even 0.
			// Setting to 0 after setting to another value happens when we tried to buy some number, but couldn't afford it.
			this._var.canBuy = true;
			this._var.buy = value;
			this._cache.buyValue = null;
		}
		get sell() {
			return this._var.sell;
		}
		set sell(value) {
			this._var.sell = value;
			this._cache.sellValue = null;
		}
		get sellValue() {
			if(this._cache.sellValue == null) { this._cache.sellValue = App.Corporate.slaveMarketSellValue(this.division, this.sell); }
			return this._cache.sellValue;
		}
		get buyValue() {
			if(this._cache.buyValue == null) { this._cache.buyValue = App.Corporate.slaveMarketPurchaseValue(this.division, this.buy); }
			return this._cache.buyValue;
		}
		get canBuy() {
			return this._var.canBuy;
		}

		get divisionLedger() {
			return this._const.divLedger;
		}
		get division() {
			return this.divisionLedger.division;
		}
	};
	const WeekProcessingDivision = class extends typeHiddenMembers {
		constructor(division, weekLedger) {
			super();

			this._const.division = division;
			this._const.ledger = weekLedger;
			this._var.slaves   = new WeekProcessingEffeciencyLine();
			this._var.revenue  = new WeekProcessingEffeciencyLine();
			this._var.transfer = new WeekProcessingTransfer(this);
			this._var.market   = new WeekProcessingMarket(this);
		}
		get slaves() {
			return this._var.slaves;
		}
		get revenue() {
			return this._var.revenue;
		}
		get transfer() {
			return this._var.transfer;
		}
		get market() {
			return this._var.market;
		}
		get division() {
			return this._const.division;
		}
		get weekLedger() {
			return this._const.ledger;
		}
	};
	const WeekProcessingOverheadCategory = class extends typeHiddenMembers {
		constructor(categoryId) {
			super();

			this._const.category = App.Corporate.maintenance.divisionCategories[categoryId];
			if(this._const.category == null) { debugger; throw new "Invalid category id: " + categoryId; }
			this._var.divisions = [];
		}
		addDivision(division) {
			this._var.divisions.push(division);
		}
		get cost() {
			const category = this._const.category;
			const ownedDivisionCount = this._var.divisions.length - category.freeDivisions;
			const developmentCount   = this._var.divisions.reduce((r, div) => r + div.developmentCount, 0) - category.freeDevelopment;

			const divisionCost	= Math.trunc(Math.pow(Math.max(ownedDivisionCount, 0), 2) * category.divisionCost   );
			const developmentCost = Math.trunc(Math.pow(Math.max(developmentCount, 0), 2) * category.developmentCost);

			return divisionCost + developmentCost;
		}
	};
	const WeekProcessingLedger = class extends typeHiddenMembers {
		constructor() {
			super();

			this._var.divisions = {};
			this._var.maintenanceCategories = {};
			this._var.operatingCost = 0;
			this._var.canExpandNow = false;
			this._var.canSpecializeNow = false;
			this._var.dividend = 0;
			this._var.payout = 0;
		}

		getDivision(division) {
			if(!(division.id in this._var.divisions)) {
				this._var.divisions[division.id] = new WeekProcessingDivision(division, this);
			}
			return this._var.divisions[division.id];
		}
		get divisionLedgers() {
			return this._var.divisions;
		}

		registerMaintenanceForDivision(division) {
			let categoryId = division.maintenanceCategory;
			if(!(categoryId in this._var.maintenanceCategories)) {
				this._var.maintenanceCategories[categoryId] = new WeekProcessingOverheadCategory(categoryId);
			}
			let category = this._var.maintenanceCategories[categoryId];
			category.addDivision(division);
		}
		get maintenanceCategories() {
			return this._var.maintenanceCategories;
		}

		get operatingCost() {
			return this._var.operatingCost;
		}
		set operatingCost(value) {
			if(!Number.isFinite(value)) { debugger; throw "Operating cost wasn't finite "; }
			this._var.operatingCost = Math.trunc(value);
		}
		get overhead() {
			const divCount = App.Corporate.numDivisions;
			if(divCount <= 1) { return 0; }

			const divisionOverhead = Object.values(this.maintenanceCategories).reduce((r, categoryLedger) => r + categoryLedger.cost, 0);
			const corpMaintInfo = App.Corporate.maintenance.corporate;
			let corpOverhead = Math.pow(Math.max(divCount - corpMaintInfo.freeDivisions, 0), 2) * corpMaintInfo.divisionCost;
			let retval = (divisionOverhead + corpOverhead) * 1 - (5 - State.variables.baseDifficulty) / 8;
			return Math.trunc(retval);
		}
		get canExpandNow() { return this._var.canExpandNow; }
		set canExpandNow(value) { this._var.canExpandNow = value; }

		get hasDividend() { return this._var.dividend > 0; }
		get dividend() { return this._var.dividend; }
		set dividend(value) { this._var.dividend = value; }

		get hasPayout() { return this._var.payout > 0; }
		get payout() { return this._var.payout; }
		set payout(value) { this._var.payout = value; }

		get canSpecializeNow() { return this._var.canSpecializeNow; }
		set canSpecializeNow(value) { this._var.canSpecializeNow = value; }
	};
	App.Corporate.Division = {};
	const shared = {
		RelatedDivisionType: class {
			constructor() {
				this._var = {
					to:   [],
					from: [],
					all:  []
				};
			}
			get to()   { return this._var.to; }
			get from() { return this._var.from; }
			get all()  { return this._var.all; }
			addTo(value) {
				this._var.to.push(value);
				this._var.all.push(value);
			}
			addFrom(value) {
				this._var.from.push(value);
				this._var.all.push(value);
			}
			get anyFounded() { return this.all.some(div=>div.founded); }
		},
		FoundingType: class {
			constructor(division, {corporateCash, startingSize = 10}) {
				this._const = {
					division,
					cash: corporateCash,
					size: startingSize
				};
			}
			get cash() { return this._const.cash; }
			get size() { return this._const.size; }
			get startingPrice() {
				let div = this._const.division;
				return this._const.cash + div.foundingCost;
			}
		},
		SellOverflowSlaves: function(division) {
			const slavesToSell  = division.activeSlaves - division.developmentCount;
			if(slavesToSell > 0) {
				const slaveProcCost = Math.trunc(App.Corporate.slaveMarketPurchaseValue(division, -slavesToSell));
				App.Corporate.chargeAsset(slaveProcCost, "slaves");
				division.activeSlaves -= slavesToSell;
				V.menialDemandFactor -= slavesToSell;
			}
		},
		SellUnhousedSlaves: function(division, divLedger, rate) {
			if(divLedger.market.sell != 0) { return; }

			let housing = 2 * rate * division.developmentCount;
			let unhoused = division.heldSlaves - housing;
			if(unhoused <= 0) { return; }

			divLedger.market.sell = unhoused;
		},
		MessageProcessedSlaves: function(division, verbPhrase, color) {
			let procCount = Math.trunc(division.developmentCount * division.processRate);
			let slaveCountedNoun = numberWithPluralNonZero(procCount, "slave");

			return `It ${verbPhrase} approximately <span class="${color}">${slaveCountedNoun}</span> each week when operating at capacity (${division.developmentCount})`;
		},
		MessageSlaveToMarket: function(division) {
			return `The slaves from this division can be sold for <span class='yellowgreen'>${cashFormat(Math.trunc(division.soldSlaveValue * menialSlaveCost()))}</span> each.`;
		},
		EndWeekProcessing_Slaves: function(processingCount, rate) {
			const perDevPair = rate.roll();
			let slaveIncrease = perDevPair.value * processingCount;
			if(slaveIncrease < 1) {
				slaveIncrease = (slaveIncrease > Math.random() ? 1 : 0);
			}
			return {efficiency: perDevPair.roll, value: Math.trunc(slaveIncrease)};
		},
		FoundingSetupAutoBuy: function(division) {
			let foundedFrom = division.relatedDivisions.from.filter(div=>div.founded);
			if(foundedFrom.length == 0) {
				division.setAutoBuyFromMarket(true);
			} else {
				for(let otherDiv of foundedFrom) {
					if(otherDiv.getAutoSendToMarket()) {
						otherDiv.setAutoSendToDivision(division, true);
					}
				}
			}
		},
		FoundingSetupAutoSell: function(division) {
			let foundedTo = division.relatedDivisions.to.filter(div=>div.founded);
			if(foundedTo.length == 0) {
				division.setAutoSendToMarket(true);
			} else {
				for(let otherDiv of foundedTo) {
					if(otherDiv.getAutoBuyFromMarket()) {
						division.setAutoSendToDivision(otherDiv, true);
					}
				}
			}
		}
	};
	App.Corporate.Init_DivisionBase(shared);
	App.Corporate.Init_DivisionAcquiring(shared);
	App.Corporate.Init_DivisionProcessing(shared);
	App.Corporate.Init_DivisionWorking(shared);

	App.Corporate.InitConstants();
	if (!V.corp) { V.corp = {}; }
	let divisions = App.Corporate.divisions = mapIdList(App.Corporate.divisionList);
	App.Corporate.maintenance.divisionCategories = mapIdList(App.Corporate.maintenance.divisionCategoriesList);

	for(const divInfo of App.Corporate.divisionList.filter(div=>div.nextDivisions != null)) {
		const div = divisions[divInfo.id];
		for(const nextDepId of divInfo.nextDivisions) {
			let nextDiv = divisions[nextDepId];
			div.relatedDivisions.addTo(nextDiv);
			nextDiv.relatedDivisions.addFrom(div);
		}
	}
	let asDivision = function(division) {
		if(_.isObject(division)) { return division; }
		return App.Corporate.divisions[division];
	};
	App.Corporate.getStored	= function(key	   ) { return V.corp[key];  };
	App.Corporate.setStored	= function(key, value) { V.corp[key] = value; };
	App.Corporate.deleteStored = function(key	   ) { delete V.corp[key];  };

	// Integer properties starting with corp
	const propertyToStoryInt = {
		cash: "Cash",
		numDivisions: 'Div',
		foundedDate: 'Founded',
		dividend: "Dividend",
		specializations: "Spec",
		specializationTokens: "SpecToken",
		specializationTimer: "SpecTimer",
	};
	for(const property in propertyToStoryInt) {
		const key = propertyToStoryInt[property];
		Object.defineProperty(App.Corporate, property, {
		get: function(	 ) { return this.getStored(key); },
		set: function(value) {
			if(!Number.isFinite(value)) { throw "Unreal number " + key; }
			this.setStored(key, Math.trunc(value));
		}
		});
	}

	// Boolean properties starting with corp (true == 1, false == 0)
	const propertyToStoryBool = {
		founded: "Incorporated",
		hasMarket: "Market",
		payoutCash: "CashDividend",
		canExpand: 'ExpandToken',
	};
	for(const property in propertyToStoryBool) {
		const key = propertyToStoryBool[property];
		Object.defineProperty(App.Corporate, property, {
			get: function(	 ) { return this.getStored(key) === 1; },
			set: function(value) { this.setStored(key, value == true ? 1 : 0); }
		});
	}

	// Abnormal properties
	Object.defineProperty(App.Corporate, "value", {
		get: function() {
			if(!this.founded) { return 0; }
			let corpAssets = App.Corporate.divisionList
										  .filter(div=>div.founded)
										  .reduce((v, div)=>v + div.value, 0);
			return corpAssets + this.dividend + this.cash;
		}
	});
	Object.defineProperty(App.Corporate, "dividendRatio", {
		get: function(	 ) { return V.dividendRatio;		},
		set: function(value) {		V.dividendRatio = value; }
	});
	Object.defineProperty(App.Corporate, "dividendTimer", {
		get: function(	 ) { return V.dividendTimer;		},
		set: function(value) {		V.dividendTimer = value; }
	});
	Object.defineProperty(App.Corporate, "payoutAfterCash", {
		get: function() {
			return Math.max(Math.trunc(this.payoutCorpValueMultiplier * this.value), this.payoutMinimumCash);
		}
	});

	const SharesType = class {
		get personal()	  { return V.personalShares;		}
		set personal(value) {		V.personalShares = value; }
		get public()		{ return V.publicShares;		}
		set public(value)   {		V.publicShares   = value; }
		get total()		 { return this.personal + this.public; }
	};
	App.Corporate.shares = new SharesType();
	App.Corporate.ledger = {
		current: new Ledger(App.Corporate),
		old:	 new Ledger(App.Corporate, "Old"),
		swap: function() {
			this.old.copy(this.current);
			this.current.clear();
		},
		clear: function() {
			this.old.clear();
			this.current.clear();
		},
		release: function() {
			this.old.release();
			this.current.release();
		}
	};
	App.Corporate.foundingCostToPlayer = function(division, personalShares, publicShares) {
		division = asDivision(division);
		let costToPlayer = Math.trunc((division.foundingCash / (personalShares + publicShares)) * personalShares);
		return costToPlayer;
	};
	App.Corporate.create = function(division, personalShares, publicShares) {
		this.shares.personal = personalShares;
		this.shares.public   = publicShares;
		V.dividendTimer = 13;
		this.founded = true;
		this.foundedDate = V.week;
		this.dividend = 0;
		this.dividendRatio = 0;
		this.specializationTimer = 4;

		this.ledger.clear();

		// this will be updated by division.create
		this.numDivisions = 0;
		this.expansionTokens = 1;

		division = asDivision(division);
		cashX(forceNeg(App.Corporate.foundingCostToPlayer(division, personalShares, publicShares)), 'stocksTraded');
		this.cash = division.foundingCash;

		division.create(this);
		App.Corporate.ledger.swap();
	};
	App.Corporate.dissolve = function() {
		for(let division of this.divisionList.filter(x=>x.founded)) {
			division.dissolve();
		}
		this.founded = false;
		this.numDivisions = 0;
		this.expansionTokens = 0;
		this.setStored("Expand", 0);
		this.specializations = 0;
		this.specializationTokens = 0;
		this.setStored("SpecRaces", []);
		this.ledger.release();

		// Some of these will need to be refactored into App.Corporate.Specialization
		const toDeleteGlobal = [
			"personalShares",
			"publicShares",
			"dividendTimer",
		];
		toDeleteGlobal.forEach(id => delete V[id]);
		const toDeleteCorp = [
			"Cash",
			"Dividend",
			"SpecAccent",
			"SpecAge",
			"SpecAmputee",
			"SpecBalls",
			"SpecDevotion",
			"SpecDick",
			"SpecEducation",
			"SpecGender",
			"SpecGenitalia",
			"SpecWeight",
			"SpecHeight",
			"SpecHormones",
			"SpecImplants",
			"SpecInjection",
			"SpecIntelligence",
			"SpecMilk",
			"SpecMuscle",
			"SpecPussy",
			"SpecSexEd",
			"SpecTrust",
			"SpecVirgin"
		];
		toDeleteCorp.forEach(id => delete V.corp[id]);

		if(this.hasMarket) {
			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Market, "Corporate Market", "Markets");
			this.hasMarket = false;
		}
	};
	App.Corporate.expandedDivision = function() {
		this.numDivisions += 1;
		this.canExpand = false;
	};
	App.Corporate.dissolvedDivision = function() {
		this.numDivisions -= 1;
	};
	App.Corporate.chargeAsset = function(cost, type) {
		if(!Number.isFinite(cost)) { throw "The cost provided was not a real number"; }
		cost = Math.trunc(cost);
		if(!(type in this.ledger.current)) { throw `Ledger doesn't record '${type}' category.`; }
		if(cost == 0) { return; }

		this.ledger.current[type] += cost;
		this.cash -= cost;
	};
	App.Corporate.earnRevenue = function(cost, locality) {
		if(!Number.isFinite(cost)) { throw "The cost provided was not real"; }
		cost = Math.trunc(cost);
		let current = this.ledger.current;
		let key = `${locality}Revenue`;
		if(!(key in current)) { throw `Unknown locality '${locality}'`; }
		current[key] += cost;
		this.cash += cost;
	};
	App.Corporate.chargeDividend = function(cost, weekLedger) {
		if(!Number.isFinite(cost)) { throw "The cost provided was not real"; }
		cost = Math.trunc(cost);
		if(weekLedger == null) {
			debugger;
			throw "No weekLedger provided";
		}
		this.dividend += cost;
		this.cash -= cost;
		weekLedger.dividend += cost;
	};
	App.Corporate.creditEconomy = function() {
		this.ledger.current.setEconomy(V.localEcon);
		this.cash += this.ledger.current.economicBoost;
	};
	/* Need to prevent skipping intermediaries if they exist, ie break->surgery->train, you can skip surgery only if you don't have it.*/
	App.Corporate.ownsIntermediaryDivision = function(fromDivision, toDivision) {
		for(let intermediateDiv of toDivision.relatedDivisions
											 .from
											 .filter(iDep => iDep.id != fromDivision.id
														  && fromDivision.relatedDivisions.to.includes(iDep))) {
			if(intermediateDiv.founded) { return true; }
		}
		return false;
	};
	App.Corporate.slaveMarketPurchaseValue = function(division, count) {
		division = asDivision(division);
		let slaveValue = division.purchasedSlaveValue;
		let totalValue = slaveValue * count * menialSlaveCost(count);
		return Math.trunc(totalValue);
	};
	App.Corporate.slaveMarketSellValue = function(division, count) {
		division = asDivision(division);
		let slaveValue = division.soldSlaveValue;
		let totalValue = slaveValue * count * menialSlaveCost(count);
		return Math.trunc(totalValue);
	};
	App.Corporate.buySlaves = function(division, count) {
		if(count <= 0) { return 0; }

		division = asDivision(division);
		let purchasePrice = this.slaveMarketPurchaseValue(division, count);
		if(this.cash < purchasePrice) {
			throw "Attempted purchase without enough money";
		}

		this.chargeAsset(purchasePrice, "slaves");
		division.activeSlaves += count;
		V.menialSupplyFactor  -= count;
		return purchasePrice;
	};
	App.Corporate.sellSlaves = function(division, count) {
		if(count <= 0) { return 0; }

		division = asDivision(division);
		if(division.heldSlaves < count) { throw "Attempted to sell more slaves than held."; }

		let sellPrice = this.slaveMarketSellValue(division, count);
		this.earnRevenue(sellPrice, "local");
		division.heldSlaves -= count;
		V.menialDemandFactor -= count;
		return sellPrice;
	};
	App.Corporate.transferSlaves = function(fromDivision, toDivision, count) {
		fromDivision = asDivision(fromDivision);
		toDivision = asDivision(toDivision);
		// TODO: validate the from and to departments are directly connected.

		if(fromDivision.heldSlaves < count) { throw `Tried to move ${count} slaves out of ${fromDivision.name}, but it only had ${fromDivision.heldSlaves}`; }

		fromDivision.heldSlaves -= count;
		toDivision.activeSlaves += count;
	};

	App.Corporate.buyDevelopment = function(division, count) {
		division = asDivision(division);

		let cost = Math.trunc(division.sizeCost * count * 1000);

		this.chargeAsset(cost, "development");
		division.developmentCount += count;
	};
	App.Corporate.sellDevelopment = function(division, count) {
		division = asDivision(division);

		const devCount = division.developmentCount;
		count = count || devCount;
		if(count > devCount) { throw `Attempted to sell more of a division ${division.id} than exists (${count} of ${devCount})`; }
		const developmentCost = Math.trunc(count * division.sizeCost * 800);
		this.chargeAsset(-developmentCost, "development");
		division.developmentCount -= count;
	};
	App.Corporate.setAutoSendToDivision = function(fromDivision, toDivision, value) {
		fromDivision = asDivision(fromDivision);
		toDivision = asDivision(toDivision);

		fromDivision.setAutoSendToDivision(toDivision, value);
	};
	App.Corporate.setAutoSendToMarket = function(division, value) {
		division = asDivision(division);
		division.setAutoSendToMarket(value);
	};
	App.Corporate.setAutoBuyFromMarket = function(division, value) {
		division = asDivision(division);
		division.setAutoBuyFromMarket(value);
	};
	App.Corporate.calculateDividend = function(weekLedger) {
		let profit = this.ledger.current.profit;
		if(this.dividendRatio > 0 && profit > 0) {
			this.chargeDividend(profit * this.dividendRatio, weekLedger);
		}
		// Payout leftover cash should be the last thing the corporation does
		// in a week so that its cash will be at the payout amount.
		if(this.payoutCash) {
			let payoutAfter = this.payoutAfterCash;
			if(this.cash > payoutAfter) {
				this.chargeDividend(this.cash - payoutAfter, weekLedger);
			}
		}

		if(this.dividendTimer <= 1) {
			weekLedger.payout = Math.trunc(this.dividend * this.shares.personal / this.shares.total);
			cashX(weekLedger.payout, "stocks");
			this.dividendTimer = 14;// 13 for each quarter, but +1 because we're subtracting one below.
			this.dividend = 0;
		}

		this.dividendTimer--;
	};
	App.Corporate.endWeek = function() {
		let ledger = new WeekProcessingLedger();
		// Prepare requests
		for(let div of this.divisionList.filter(div=>div.founded)) {
			let divLedger = ledger.getDivision(div);

			ledger.operatingCost += div.maintenanceCost;
			ledger.registerMaintenanceForDivision(div);

			div.endweek_Revenue(divLedger);
			div.endWeek_Slaves(divLedger);
		}
		for(let divLedger of Object.values(ledger.divisionLedgers)) {
			let div = divLedger.division;
			div.endWeek_Transfer(divLedger);
			div.endWeek_Market(divLedger);
		}
		this.chargeAsset(ledger.operatingCost, "operations");
		this.chargeAsset(ledger.overhead, "overhead");
		// Execute sales requests, transfers, and earned revenue
		for(let divLedger of Object.values(ledger.divisionLedgers)) {
			let div = divLedger.division;
			this.earnRevenue(divLedger.revenue.value, "local");
			if(div.activeSlaves > 0) {
				shared.SellOverflowSlaves(div);
			}

			for(let otherDivPair of divLedger.transfer.divisions) {
				let otherDiv = otherDivPair.division;
				let count = otherDivPair.fill;
				if(count == 0) { continue; }

				this.transferSlaves(div, otherDiv, count);
			}
			if(divLedger.market.sell > 0) {
				divLedger.market.finalSale = this.sellSlaves(div, divLedger.market.sell);
			}
		}

		// Execute purchase requests
		// todo: Make a switch to allow the user to control purchasing behavior.
		// todo: Expensive first
		// todo: Cheapest first
		// Even purchase requsts:
		let purchaseValues = evenFillArray(Object.values(ledger.divisionLedgers)
												 .filter(divLedger=>divLedger.market.buy > 0)
										  , this.cash
										  , divLedger=>divLedger.market.buyValue);
		for(let divLedgerPair of purchaseValues) {
			let divLedger = divLedgerPair.item;
			let purchaseCost = divLedgerPair.value;
			let div = divLedger.division;

			if(divLedger.market.buyValue > purchaseCost) {
				// Estimate how many slaves we can afford within the purchase cost
				let perSlaveEstimate = Math.trunc(divLedger.market.buyValue / divLedger.market.buy);
				let numSlavesEstimate = Math.trunc(purchaseCost / perSlaveEstimate);

				if(numSlavesEstimate < 1) {
					divLedger.market.originalBuy = divLedger.market.buy;
					divLedger.market.buyShortMoney = divLedger.market.buyValue;
					divLedger.market.buyShortSlaves = divLedger.market.buy;
					divLedger.market.buy = 0;
				} else {
					divLedger.market.originalBuy = divLedger.market.buy;
					divLedger.market.buyShortMoney = divLedger.market.buyValue - purchaseCost;
					divLedger.market.buyShortSlaves = divLedger.market.buy - numSlavesEstimate;
					divLedger.market.buy = numSlavesEstimate;
				}
			}
			divLedger.market.finalPurchase = this.buySlaves(div, divLedger.market.buy);
		}
		this.creditEconomy();

		if(this.numDivisions < this.divisionList.length && !this.canExpand) {
			let expansionValue = Math.trunc(Math.pow(this.numDivisions, 1.5) + (5 * this.numDivisions + 2) / 4);
			if(this.value > expansionValue * 1000000) {
				ledger.canExpandNow = true;
				this.canExpand = true;
			}
		}
		let specializationExpansion = 1.6 * Math.pow(1.25, this.specializations) - 1.2;
		if(this.value > specializationExpansion * 1000000){
			this.specializationTokens++;
			this.specializations++;
			ledger.canSpecializeNow = true;
		}
		if(this.specializationTimer > 0) {
			this.specializationTimer--;
		}
		this.calculateDividend(ledger);

		return ledger;
	};
	App.Corporate.cheatCash = function(userCash) {
		userCash = Math.trunc(Number(userCash));
		if(Number.isFinite(userCash)) {
			this.cash = userCash;
			V.cheater = 1;
		}
	};

	App.Corporate.Backcompat = function(){
		// current foreignRevenue used to be used for old foreignRevenue
		let c = this.ledger.current;
		App.Corporate.ledger.old.foreignRevenue = c.foreignRevenue;
		if(c.operations === undefined) {
			c.operations = 0;
			c.overhead = 0;
			c.economicBoost = 0;
		}
	};

	if(V.corp.DivTrainSurgeryTimer !== undefined) {
		let timer = V.corp.DivTrainSurgeryTimer;
		// Note: originally the timer was capped at 20, so the founding week isn't guaranteed to be correct.
		V.corp.DivSurgeryFounded = V.week - timer;
		delete V.corp.DivTrainSurgeryTimer;
	}
};


// Corporation Share Price
// A positive q means adding shares to the market, negative means removing them

window.corpSharePrice = function(q = 0, personalShares = null, publicShares = null) {
	if (V.corp.Incorporated === 0) {
		return 0;
	}
	personalShares = personalShares || V.personalShares;
	publicShares   = publicShares   || V.publicShares;
	return Math.trunc(1000 * (App.Corporate.value / (personalShares + publicShares + q)));
};

// Corporation race blacklisting/whitelisting
// race is the lowercase string representing the race, 'blacklist' is either 1 or 0. 1 means we are blacklisting and 0 means we are whitelisting said race
window.corpBlacklistRace = function(race, blacklist) {
	let raceArray = State.variables.corpSpecRaces;
	if (raceArray.length > 0 && blacklist === 1) {
		raceArray.delete(race);
	} else if (blacklist === 1) {
		raceArray = setup.filterRacesLowercase.filter(x => x !== race);
	} else {
		raceArray.push(race);
	}
	return raceArray;
};
