(function() {
	const readOnlySymbol = Symbol("readonly proxy");
	window.createReadonlyProxy = function(target) {
		if (target == null) return target; //intentionally ==
		if (target[readOnlySymbol]) { return target; }
		if (_.isArray(target)) {
			return new Proxy(target, {
				get:function(o, prop) {
					if(prop === readOnlySymbol) { return true; }
					const val = o[prop];
					if (typeof val === 'function') {
						if (['push', 'unshift', 'pop'].includes(prop)) {
							return function () {
								throw Error("Cannot modify a readonly array");
							}
						}
						return val.bind(target);
					}
					return createReadonlyProxy(val);
				},
				set:function(o, prop, value) {
					return true;
				},
				deleteProperty:function(o, prop) {
					return true;
				}
			});
		}
		if (_.isObject(target)) {
			return new Proxy(target, {
				get:function(o, prop) {
					if(prop === readOnlySymbol) { return true; }
					return createReadonlyProxy(o[prop]);
				},
				set:function(o, prop, value) {
					return true;
				},
				deleteProperty:function(o, prop) {
					return true;
				}
			});
		}
		return target;
	};
	const cheaterSymbol = Symbol("cheating proxy");
	window.createCheatProxy = function(target) {
		if (target == null) return target; //intentionally ==
		if (target[cheaterSymbol]) { return target; }
		if (_.isArray(target)) {
			return new Proxy(target, {
				get:function(o, prop) {
					if(prop === cheaterSymbol) { return true; }
					const val = o[prop];
					if (typeof val === 'function') {
						if (['push', 'unshift', 'pop'].includes(prop)) {
							return function (el) {
								const retval = Array.prototype[prop].apply(o, arguments);
								//Make sure we set cheater after calling the function
								State.variables.cheater = 1;//Can't use `V` because it probably points to a proxy.
								return retval;
							}
						}
						return val.bind(target);
					}
					return createCheatProxy(val);
				},
				set:function(o, prop, value) {
					o[prop] = value;
					State.variables.cheater = 1;//Can't use `V` because it probably points to a proxy.
					return true;
				},
				deleteProperty:function(o, prop) {
					delete o[prop];
					State.variables.cheater = 1;//Can't use `V` because it probably points to a proxy.
					return true;
				}
			});
		}
		if (_.isObject(target)) {
			return new Proxy(target, {
				get:function(o, prop) {
					if(prop === cheaterSymbol) { return true; }
					return createCheatProxy(o[prop]);
				},
				set:function(o, prop, value) {
					o[prop] = value;
					State.variables.cheater = 1;
					return true;
				},
				deleteProperty:function(o, prop) {
					delete o[prop];
					State.variables.cheater = 1;
					return true;
				}
			});
		}
		return target;
	};
})();
Object.defineProperty(window, "V", {
	get: function() {
		if (window.storyProxy != null) { return window.storyProxy; }
		return State.variables;
	}
});
//This should be used if the user might use V under normal, non-cheating circumstances but shouldn't be punished for accidentally setting the value. The attempt to make the change will simply be disregarded.
window.runWithReadonlyProxy = function(callback) {
	window.storyProxy = createReadonlyProxy(State.variables);
	try {
		return callback();
	} finally {
		window.storyProxy = null;
	}
};
// This should be used if setting values would constitute cheating. For example, a debug view that shows all variables in an editable form; showing isn't cheating, but making a change would be.
window.runWithCheatProxy = function(callback) {
	window.storyProxy = createCheatProxy(State.variables);
	try {
		return callback();
	} finally {
		window.storyProxy = null;
	}
};
