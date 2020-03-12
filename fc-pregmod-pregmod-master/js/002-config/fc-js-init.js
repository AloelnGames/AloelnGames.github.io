/* eslint-disable no-var */
// @ts-ignore
"use strict";

var App = { };

App.Arcology = {
	Cell: {},
};
App.Art = {};
App.Data = {};
App.Debug = {};
App.Encyclopedia = {};
App.Encyclopedia.Entries = {};
App.Entity = {};
App.Entity.Utils = {};
App.MainView = {};
App.UI = {};
App.UI.DOM = {};
App.UI.View = {};
App.UI.SlaveInteract = {};
App.Update = {};
App.Utils = {};
App.Interact = {};
App.Desc = {};
App.Facilities = {
	Brothel: {},
	Club: {},
	Dairy: {},
	Farmyard: {},
	ServantsQuarters: {},
	MasterSuite: {},
	Spa: {},
	Nursery: {},
	Clinic: {},
	Schoolroom: {},
	Cellblock: {},
	Arcade: {},
	HGSuite: {}
};
App.Medicine = {};
App.Medicine.OrganFarm = {};
App.Medicine.OrganFarm.Organs = {};
App.RA = {};
App.SF = {};
App.Corporate = {};
App.SecExp = {};
App.Reminders = {};


Object.defineProperty(App, "activeSlave", {
	get: () => State.variables.activeSlave,
	set: (slave) => { State.variables.activeSlave = slave; }
});
