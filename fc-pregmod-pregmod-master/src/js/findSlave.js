App.FindSlave = {};

/**
 * Fragment searching: See if every needle can found somewhere in the field of haystacks
 * @param {string[]} haystacks
 * @param {RegExp[]} needles
 * @returns {boolean}
 */
App.FindSlave._fragmentSearch = function(haystacks, needles) {
	const hs = haystacks.join(" ");
	return needles.every((needle) => { return needle.test(hs); });
};

/**
 * Get slave indices which match a predicate
 * @param {function(App.Entity.SlaveState): boolean} predicate
 * @returns {number[]}
 */
App.FindSlave._slaveIndices = function(predicate) {
	return V.slaves.reduce((acc, slave, ind) => {
		if (predicate(createReadonlyProxy(slave))) {
			acc.push(ind);
		}
		return acc;
	}, []);
};

/**
 * Generate a slave list as the result of fragment searching all the name-type fields
 * @param {string} query
 * @returns {DocumentFragment}
 */
App.FindSlave.searchByName = function(query) {
	const needles = query.split(" ").map((needle) => { return new RegExp(needle, "i"); });
	const indices = this._slaveIndices((slave) => { return this._fragmentSearch([slave.slaveName, slave.slaveSurname, slave.birthName, slave.birthSurname], needles); });
	return App.UI.SlaveList.render.listDOM(indices, [], App.UI.SlaveList.SlaveInteract.stdInteract);
};

/**
 * Generate a slave list as the result of fragment searching profession and origin
 * @param {string} query
 * @returns {DocumentFragment}
 */
App.FindSlave.searchByBackground = function(query) {
	const needles = query.split(" ").map((needle) => { return new RegExp(needle, "i"); });
	const indices = this._slaveIndices((slave) => { return this._fragmentSearch([slave.career, slave.origin], needles); });
	return App.UI.SlaveList.render.listDOM(indices, [], App.UI.SlaveList.SlaveInteract.stdInteract);
};

/**
 * Generate a slave list as the result of evaluating an expression
 * @param {string} query
 * @returns {DocumentFragment}
 */
App.FindSlave.searchByExpression = function(query) {
	const pred = new Function("slave", "return (" + query + ");");
	const indices = runWithReadonlyProxy(() => { return this._slaveIndices(pred); });
	return App.UI.SlaveList.render.listDOM(indices, [], App.UI.SlaveList.SlaveInteract.stdInteract);
};
