/* eslint-disable no-unused-vars */
/* This file contains only JS functions without dependencies on FC specific variables/conventions and do not rely on
 * custom functions outside this file
 */

/**
 * Returns whether x is undefined. Port of SugarCube's def.
 * @param {any} x
 * @returns {boolean}
 */
function jsDef(x) {
	return (typeof x !== "undefined" && x !== null && x !== undefined);
}

/**
 * @param {number} n
 * @returns {boolean}
 */
function isFloat(n) {
	return Number.isFinite(n) && Math.floor(n) !== n;
}

/**
 * Determines if a is between low and high
 * @param {number} a
 * @param {number} low
 * @param {number} high
 * @returns {boolean}
 */
function between(a, low, high) {
	if (low === null) { low = -Infinity; }
	if (high === null) { high = Infinity; }
	return (a > low && a < high);
}

/**
 * @param {number[]} obj
 * @returns {number}
 */
function hashChoice(obj) {
	let randint = Math.floor(Math.random() * hashSum(obj));
	let ret;
	Object.keys(obj).some((key) => {
		if (randint < obj[key]) {
			ret = key;
			return true;
		} else {
			randint -= obj[key];
			return false;
		}
	});
	return ret;
}

/**
 * @param {number[]} obj
 * @returns {number}
 */
function hashSum(obj) {
	let sum = 0;
	Object.keys(obj).forEach((key) => {
		sum += obj[key];
	});
	return sum;
}

/**
 * @param {Array} arr
 * @returns {Object}
 */
function arr2obj(arr) {
	const obj = {};
	arr.forEach((item) => {
		obj[item] = 1;
	});
	return obj;
}

/**
 * @param {{}} object
 * @param rest
 */
function hashPush(object, ...rest) {
	rest.forEach((item) => {
		if (object[item] === undefined) {
			object[item] = 1;
		} else {
			object[item] += 1;
		}
	});
}

/**
 * @param {[]} array
 * @returns {{}}
 */
function weightedArray2HashMap(array) {
	const obj = {};
	array.forEach((item) => {
		if (obj[item] === undefined) {
			obj[item] = 1;
		} else {
			obj[item] += 1;
		}
	});
	return obj;
}

/**
 * generate a random, almost unique ID that is compliant (possibly) with RFC 4122
 *
 * @returns {string}
 */
function generateNewID() {
	let date = Date.now(); // high-precision timer
	let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		let r = (date + Math.random() * 16) % 16 | 0;
		date = Math.floor(date / 16);
		return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

/**
 * @param {Array} array
 * @param {number} indexA
 * @param {number} indexB
 */
function arraySwap(array, indexA, indexB) {
	const tmp = array[indexA];
	array[indexA] = array[indexB];
	array[indexB] = tmp;
}

/**
 * @param {string} string
 * @returns {string}
 */
function capFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.substr(1);
}

/**
 * @param {string} word
 * @returns {string}
 */
function addA(word) {
	let vocal = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
	if (vocal.includes(word.charAt(0))) {
		return `an ${word}`;
	}
	return `a ${word}`;
}

Object.defineProperty(Array.prototype, 'toStringExt', {
	/**
	 * @param {string} delimiter
	 * @param {string} lastDelimiter
	 * @returns {string}
	 */
	value(delimiter = ', ', lastDelimiter = ' and ') {
		if (this == null) {
			throw new TypeError('Array.prototype.toStringExt called on null or undefined');
		}
		if (this.length === 0) {
			return "none";
		}
		if (this.length === 1) {
			return this[0].toString();
		}
		const last = this.pop();
		let r = this.join(delimiter);
		this.push(last); // don't leave the array modified
		return `${r}${lastDelimiter}${last}`;
	}
});

/**
 * @param {number} i
 * @returns {string}
 */
function ordinalSuffix(i) {
	let j = i % 10;
	let k = i % 100;
	if (j === 1 && k !== 11) {
		return `${i}st`;
	}
	if (j === 2 && k !== 12) {
		return `${i}nd`;
	}
	if (j === 3 && k !== 13) {
		return `${i}rd`;
	}
	return `${i}th`;
}

/**
 * @param {number} i
 * @returns {string}
 */
function ordinalSuffixWords(i) {
	const text = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"];
	if (i < text.length) {
		return text[i];
	}
	return ordinalSuffix(i);
}

/**
 * @param {Iterable<any>} array
 * @returns {any[]}
 */
function removeDuplicates(array) {
	return [...new Set(array)];
}

/**
 * Maps an index from one list onto a matching index on the other.
 * The first and last indexes will be matched to the first and last indexes of the other list,
 * while indexes in between will go to the nearest index.
 * @param {number} index The index in original list to map to new list.
 * @param {*} originalList The original list the index refers into.
 * @param {*} newList The new list which we want an index for
 * @returns {number} The new index into newList
 */
App.Utils.mapIndexBetweenLists = function(index, originalList, newList) {
	if (index === 0) { return 0; }
	if (index === originalList.length - 1) { return newList.length - 1; }
	index--;
	const originalLimitedLength = originalList.length - 2;
	const newLimitedLength = newList.length - 2;
	return Math.round((index / originalLimitedLength) * newLimitedLength) + 1;
};

/**
 * replaces special HTML characters with their '&xxx' forms
 * @param {string} text
 * @returns {string}
 */
App.Utils.escapeHtml = function(text) {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, m => map[m]);
};

/**
 * Creates an object where the items are accessible via their ids.
 *
 * @param {Iterable} list
 * @returns {{}}
 */
function mapIdList(list) {
	let mappedList = {};
	for (const item of list) {
		mappedList[item.id] = item;
	}
	return mappedList;
}

/**
 * Topological sorting algorithm
 * https://gist.github.com/shinout/1232505
 * Added keys parameter since it better suits our needs and updated to project code style.
 *
 * @param {[]} keys
 * @param {[[]]} edges list of edges. each edge forms Array<ID,ID> e.g. [12 , 3]
 * @returns Array: topological sorted list of IDs
 * @throws Error: in case there is a closed chain.
 **/
App.Utils.topologicalSort = function(keys, edges) {
	let nodes = {}; // hash: stringified id of the node => { id: id, afters: list of ids }
	let sorted = []; // sorted list of IDs ( returned value )
	let visited = {}; // hash: id of already visited node => true

	const Node = function(id) {
		this.id = id;
		this.afters = [];
	};

	// 1. build data structures
	keys.forEach(key => {
		nodes[key] = new Node(key);
	});

	edges.forEach(edge => {
		const from = edge[0], to = edge[1];
		if (!nodes[from]) { nodes[from] = new Node(from); }
		if (!nodes[to]) { nodes[to] = new Node(to); }
		nodes[from].afters.push(to);
	});

	// 2. topological sort
	Object.keys(nodes).forEach(function visit(idstr, ancestors) {
		let node = nodes[idstr];
		let id = node.id;

		// if already exists, do nothing
		if (visited[idstr]) { return; }

		if (!Array.isArray(ancestors)) { ancestors = []; }

		ancestors.push(id);

		visited[idstr] = true;

		node.afters.forEach((afterID) => {
			if (ancestors.indexOf(afterID) >= 0) { // if already in ancestors, a closed chain exists.
				throw new Error('closed chain : ' + afterID + ' is in ' + id);
			}

			visit(afterID.toString(), ancestors.map(v => v)); // recursive call
		});

		sorted.unshift(id);
	});

	return sorted;
};

/**
 * Sorts an array of objects based on the order of the first array.
 * Sorts by values accessible by unsorted[key]
 * Values of the second array must be a subset of sorted
 *
 * O(n + m)
 *
 * @param {Array<any>} sorted
 * @param {Array<object>} unsorted
 * @param {string} key
 * @returns {Array<object>}
 */
function sortArrayByArray(sorted, unsorted, key) {
	const map = {};
	sorted.forEach((value, index) => {
		map[value] = index;
	});

	return unsorted.sort((a, b) => {
		return map[a[key]] - map[b[key]];
	});
}

/**
 * @param {object} target
 * @param {object} source
 */
function deepAssign(target, source) {
	function isObject(o) {
		return (o !== undefined && typeof o === 'object' && !Array.isArray(o));
	}

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (!source.hasOwnProperty(key)) { continue; }
			if (isObject(source[key])) {
				if (!target.hasOwnProperty(key)) { target[key] = {}; }
				deepAssign(target[key], source[key]);
			} else {
				Object.assign(target, {
					[key]: source[key]
				});
			}
		}
	}
}
