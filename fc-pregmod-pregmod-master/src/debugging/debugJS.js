/* eslint-disable no-empty */
/* eslint-disable no-var */
/*
Given an object, this will return an array where for each property of the original object, we include the object
{variable: property, oldVal: _oldDiff.property, newVal: _newDiff.property}
*/
window.generateDiffArray = function generateDiffArray(obj) {
	let diffArray = Object.keys(obj).map(function(key) {
		return {variable: key, oldVal: State.temporary.oldDiff[key], newVal: State.temporary.newDiff[key]};
	});
	return diffArray;
};

/*
Shamelessly copied from https://codereview.stackexchange.com/a/11580
Finds and returns the difference between two objects. Potentially will have arbitrary nestings of objects.
*/
window.difference = function difference(o1, o2) {
	let k, kDiff, diff = {};
	for (k in o1) {
		if (!o1.hasOwnProperty(k)) {
		} else if (typeof o1[k] !== 'object' || typeof o2[k] !== 'object') {
			if (!(k in o2) || o1[k] !== o2[k]) {
				diff[k] = o2[k];
			}
		} else {
			kDiff = difference(o1[k], o2[k]);
			if (kDiff) {
				diff[k] = kDiff;
			}
		}
	}
	for (k in o2) {
		if (o2.hasOwnProperty(k) && !(k in o1)) {
			diff[k] = o2[k];
		}
	}
	for (k in diff) {
		if (diff.hasOwnProperty(k)) {
			return diff;
		}
	}
	return false;
};

/*
Shamelessly copied from https://stackoverflow.com/a/19101235
Flattens an object while concatenating property names.
For example {id: {number: 4, name: "A"}} --> {id.number: 4, id.name: "A"}
*/
window.diffFlatten = function diffFlatten(data) {
	let result = {};
	function recurse(cur, prop) {
		if (Object(cur) !== cur) {
			result[prop] = cur;
		} else if (Array.isArray(cur)) {
			// eslint-disable-next-line no-var
			for (var i=0, l=cur.length; i<l; i++) { // don't change the "var" to "let"
				recurse(cur[i], prop + "[" + i + "]");
			}
			// eslint-disable-next-line block-scoped-var
			if (l === 0) { result[prop] = []; }
		} else {
			let isEmpty = true;
			for (let p in cur) {
				isEmpty = false;
				recurse(cur[p], prop ? prop+"."+p : p);
			}
			if (isEmpty && prop) { result[prop] = {}; }
		}
	}
	recurse(data, "");
	return result;
};

/*
Finds all NaN values anywhere in the State.variables object. Returns an array with the names of the NaNed variables.
*/
window.findNaN = function findNan() {
	const flatV = diffFlatten(State.variables);
	let result = [];
	for (let key in flatV) {
		if (Number.isNaN(flatV[key])) {
			result.push('$$'+key); /* double dollar signs to escape sugarcube markup */
		}
	}
	return result;
};

/* no-usedOnce*/
/**
 * Dumps game save as a readable JSON to the browser for saving in a file
 */
App.Debug.dumpGameState = function() {
	// helper to download a blob
	// borrowed from stackexchange
	function downloadToFile(content, fileName, contentType) {
		let a = document.createElement("a");
		let file = new Blob([content], {
			type: contentType
		});
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}

	// we will replace SugarCube onSave handler
	let oldHandler = SugarCube.Config.saves.onSave;
	try {
		SugarCube.Config.saves.onSave = function(save) {
			if (oldHandler) {
				oldHandler(save);
			}
			downloadToFile(JSON.stringify(save, null, 2), save.id + ".json", "text/plain");
		};
		SugarCube.Save.serialize();
	} finally {
		SugarCube.Config.saves.onSave = oldHandler;
	}
};

App.Debug.slaveSummaryText = function(idx) {
	let span = document.createElement("span");
	span.appendChild(SlaveSummary(State.variables.slaves[idx]));
	return span.outerHTML;
};
