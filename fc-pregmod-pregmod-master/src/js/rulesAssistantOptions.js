/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// rewrite of the rules assistant options page in javascript
// uses an object-oriented widget pattern
// wrapped in a closure so as not to pollute the global namespace
// the widgets are generic enough to be reusable; if similar user interfaces are ported to JS, we could move the classes to the global scope

window.rulesAssistantOptions = (function() {
	"use strict";
	const noDefaultSetting = {value: "!NDS!", text: "no default setting"};

	/** @type {App.RA.Rule} */
	let current_rule, root;

	function rulesAssistantOptions(element) {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		V.returnTo = "Main";
		V.showEncyclopedia = 1;
		V.encyclopedia = "Personal Assistant";
		if (V.currentRule !== null) {
			const idx = V.defaultRules.findIndex(rule => rule.ID === V.currentRule);
			if (idx === -1) {
				current_rule = V.defaultRules[0];
			} else {
				current_rule = V.defaultRules[idx];
			}
		}
		root = new Root(element);
	}

	function returnP(e) { return e.keyCode === 13; }

	function newRule() {
		const rule = emptyDefaultRule();
		V.defaultRules.push(rule);
		V.currentRule = rule.ID;
		reload();
	}

	function removeRule() {
		const idx = V.defaultRules.findIndex(rule => rule.ID === current_rule.ID);
		V.defaultRules.splice(idx, 1);
		if (V.defaultRules.length > 0) {
			const new_idx = idx < V.defaultRules.length ? idx : V.defaultRules.length - 1;
			V.currentRule = V.defaultRules[new_idx].ID;
		} else {
			V.currentRule = null;
		}
		reload();
	}

	function lowerPriority() {
		if (V.defaultRules.length === 1) { return; } // nothing to swap with
		const idx = V.defaultRules.findIndex(rule => rule.ID === current_rule.ID);
		if (idx === 0) { return; } // no lower rule
		arraySwap(V.defaultRules, idx, idx - 1);
		reload();
	}

	function higherPriority() {
		if (V.defaultRules.length === 1) { return; } // nothing to swap with
		const idx = V.defaultRules.findIndex(rule => rule.ID === current_rule.ID);
		if (idx === V.defaultRules.length - 1) { return; } // no higher rule
		arraySwap(V.defaultRules, idx, idx + 1);
		reload();
	}

	function changeName(name) {
		if (name === current_rule.name) { return; }
		current_rule.name = name;
		reload();
	}

	// reload the passage
	function reload() {
		const elem = root.element;
		elem.innerHTML = "";
		rulesAssistantOptions(elem);
	}

	const parse = {
		integer(string) {
			let n = parseInt(string, 10);
			return isNaN(n) ? 0 : n;
		},
		boobs(string) {
			return Math.clamp(parse.integer(string), 0, 48000);
		},
		butt(string) {
			return Math.clamp(parse.integer(string), 0, 20);
		},
		lips(string) {
			return Math.clamp(parse.integer(string), 0, 100);
		},
		dick(string) {
			return Math.clamp(parse.integer(string), 0, 30);
		},
		balls(string) {
			return Math.clamp(parse.integer(string), 0, 125);
		},
	};

	// the Element class wraps around a DOM element and adds extra functionality
	// this is safer than extending DOM objects directly
	// it also turns DOM manipulation into an implementation detail
	class Element {
		constructor(...args) {
			this.parent = null;
			this.element = this.render(...args);
			this.children = [];
		}

		/**
		 * @param {Element} child
		 */
		appendChild(child) {
			child.parent = this;
			this.children.push(child);
			child._appendContentTo(this.element);
			this.element.appendChild(child.element);
		}

		/**
		 * returns the first argument to simplify creation of basic container items
		 * @returns {*}
		 */
		render(...args) {
			return args[0];
		}

		remove() {
			const idx = this.parent.children.findIndex(child => child === this);
			this.parent.children.slice(idx, 1);
			this.element.remove();
		}

		/**
		 * @protected
		 * @param {HTMLElement} container
		 */
		_appendContentTo(container) {
			container.appendChild(this.element);
		}
	}

	class Section extends Element {
		constructor(header, hidden = false) {
			super(header);
			this.hidey = this.element.querySelector("div");
			if (hidden) { this.toggle_hidey(); }
		}

		render(header) {
			const section = document.createElement("section");
			section.classList.add("rajs-section");
			const h1 = document.createElement("h1");
			h1.onclick = () => { this.toggle_hidey(); };
			h1.innerHTML = header;
			const hidey = document.createElement("div");
			section.appendChild(h1);
			section.appendChild(hidey);
			return section;
		}

		appendChild(child) {
			child.parent = this;
			this.children.push(child);
			child._appendContentTo(this.hidey);
		}

		toggle_hidey() {
			switch (this.hidey.style.display) {
				case "none":
					this.hidey.style.display = "initial";
					break;
				default:
					this.hidey.style.display = "none";
					break;
			}
		}
	}

	class Tab extends Element {
		/**
		 *
		 * @param {string} name
		 * @param {string} label
		 * @param {HTMLDivElement} tabButtonsContainer
		 */
		constructor(name, label, tabButtonsContainer) {
			super(name);
			tabButtonsContainer.appendChild(Tab.makeTabButton(name, label));
		}
		render(name) {
			const tab = document.createElement("div");
			tab.id = name;
			tab.className = "tabcontent";

			this.tabContent_ = document.createElement("div");
			this.tabContent_.classList.add("content");
			this.tabContent_.classList.add("ra-container");
			tab.appendChild(this.tabContent_);

			return tab;
		}

		appendChild(child) {
			child.parent = this;
			this.children.push(child);
			child._appendContentTo(this.tabContent_);
		}

		static makeTabButton(name, text) {
			const btn = document.createElement("button");
			btn.className = "tablinks";
			btn.id = `tab ${name}`;
			btn.innerHTML = text;
			btn.onclick = (event) => App.UI.tabbar.openTab(event, name);
			return btn;
		}
	}

	class ElementWithLabel extends Element {
		/**
		 * @param {string} label
		 * @param {*} args
		 */
		constructor(label, ...args) {
			super(...args);
			this.labelElement_ = document.createElement("span");
			this.labelElement_.className = "ra-label";
			this.labelElement_.innerHTML = label;
		}

		/**
		 * @protected
		 * @param {HTMLElement} container
		 */
		_appendContentTo(container) {
			container.appendChild(this.labelElement_);
			super._appendContentTo(container);
		}
	}

	let _blockCallback=Symbol("Block Callback");
	// list of clickable elements
	// has a short explanation (the prefix) and a value display
	// value display can optionally be an editable text input field
	// it can be "bound" to a variable by setting its "onchange" method
	class EditorWithShortcuts extends ElementWithLabel {
		/**
		 *
		 * @param {string} prefix
		 * @param {Array} [data=[]]
		 * @param {boolean} [allowNullValue=true]
		 * @param {boolean} [editor=false]
		 * @param {boolean} [capitalizeShortcuts]
		 * @param {...any} args
		 */
		constructor(prefix, data = [], allowNullValue = true, editor = false, capitalizeShortcuts = false, ...args) {
			super(prefix, editor, ...args);
			this[_blockCallback] = false;
			this.selectedItem = null;
			/** @protected */
			this._allowNullValue = allowNullValue;
			/** @private */
			this._capitalizeShortcuts = capitalizeShortcuts;
			if (allowNullValue) {
				this.appendChild(new ListItem(capFirstChar(noDefaultSetting.text), null));
			}
			data.forEach(item => this.appendChild(this._createListItem(item)));
		}

		createEditor(...args) { return null; }

		createValueElement() { return document.createElement("strong"); }

		render(editor, ...args) {
			const elem = document.createElement("div");
			this.value = editor ? this.createEditor(...args) : this.createValueElement();
			if (this.value !== null) {
				elem.appendChild(this.value);
			}
			elem.classList.add("rajs-list");
			return elem;
		}


		inputEdited() {
			if (this.selectedItem) { this.selectedItem.deselect(); }
			this.setValue(this.getTextData());
			this.propagateChange();
		}

		selectItem(item) {
			if (this.selectedItem) { this.selectedItem.deselect(); }
			this.setValue(item.data);
			this.propagateChange();
		}
		trySetValue(what) {
			if(what == null && this._allowNullValue) {
				this.setValue(what);
				return;
			}
			const selected = this.children.filter(listItem => _.isEqual(listItem.data, what));
			if(selected != null && selected.length === 1) {
				this.selectItem(selected[0]);
			} else if(this._allowNullValue) {
				this.setValue(null);
			}
		}
		setValue(what) {
			if(what == null && !this._allowNullValue) { what = ""; }
			this.realValue = what;
			if(this[_blockCallback]) { return; }
			try {
				this[_blockCallback] = true;
				this.setTextValue(what);
				this.updateSelected();
			} finally {
				this[_blockCallback] = false;
			}
		}
		setTextValue(what) {
			const str = what === null ? "no default setting" : `${what}`;
			if (this.value) {
				if (this.value.tagName === "INPUT") {
					this.value.value = str;
				} else {
					this.value.innerHTML = str;
				}
			}
		}

		getData() {
			return this.realValue;
		}
		getTextData() {
			return (this.value.tagName === "INPUT" ? this.parse(this.value.value) : this.selectedItem.data);
		}

		// customizable input field parser / sanity checker
		parse(what) { return what; }

		propagateChange() {
			if (this.onchange instanceof Function) {
				this.onchange(this.getData());
			}
		}
		dataEqual(left, right) {
			return _.isEqual(left, right);
		}
		updateSelected() {
			const dataValue = this.getData();
			let selected;
			if(dataValue == null) {
				selected = this.children.filter(listItem => listItem.data == null);
			} else {
				selected = this.children.filter(listItem => this.dataEqual(listItem.data, dataValue));
			}
			if (selected.length > 1) { debugger; throw Error(`Multiple shortcuts matched ${JSON.stringify(dataValue)}`); }
			if (selected.length === 1) {
				const listItem = selected[0];
				listItem.select(false);
				if(this.selectedItem != null
				&& !_.isEqual(this.selectedItem, listItem)) {
					this.selectedItem.deselect();
				}
				this.selectedItem = listItem;
			}
		}

		/**
		 * @private
		 * @param {string|string[]} item
		 * @returns {ListItem}
		 */
		_createListItem(item) {
			let display = '';
			let data = null;
			if (Array.isArray(item)) {
				display = item[0];
				data = item.length > 1 ? item[1] : display;
			} else {
				display = item;
				data = item;
			}
			if (this._capitalizeShortcuts) {
				display = capFirstChar(display);
			}
			return new ListItem(display, data);
		}
	}

	// a clickable item of a list
	class ListItem extends Element {
		constructor(displayvalue, data) {
			super(displayvalue);
			this.data = data !== undefined ? data : displayvalue;
			this.selected = false;
		}

		render(displayvalue) {
			const elem = document.createElement("span");
			elem.classList.add("rajs-listitem");
			elem.innerHTML = displayvalue;
			elem.onclick = () => { return this.select(); };
			return elem;
		}

		select(notify = true) {
			if (this.selected) { return false; }
			this.selected = true;
			this.element.classList.add("selected");
			if(notify) { this.parent.selectItem(this); }
			return true;
		}

		deselect() {
			this.element.classList.remove("selected");
			this.selected = false;
		}
	}

	class ListSelector extends ElementWithLabel {
		constructor(prefix, data = [], allowNullValue = true) {
			super(prefix, data, allowNullValue);
		}

		render(data, allowNullValue) {
			const elem = document.createElement("div");
			this.value = document.createElement("select");
			elem.appendChild(this.value);
			elem.classList.add("rajs-list");
			this.values_ = new Map();
			// now add options
			if (allowNullValue) {
				let nullOpt = document.createElement("option");
				nullOpt.value = noDefaultSetting.value;
				nullOpt.text = capFirstChar(noDefaultSetting.text);
				this.value.appendChild(nullOpt);
				this.values_.set(nullOpt.value, null);
			}
			for (const dr of data) {
				const dv = Array.isArray(dr) ? (dr.length > 1 ? [dr[1], dr[0]] : [dr[0], dr[0]]) : [dr, dr];
				let opt = document.createElement("option");
				opt.value = dv[0];
				opt.text = capFirstChar(dv[1]);
				this.value.appendChild(opt);
				this.values_.set(opt.value, dv[0]);
			}
			this.value.onchange = () => {
				this.inputEdited();
			};
			return elem;
		}

		getData() {
			return this.values_.get(this.value.value);
		}

		setValue(what) {
			this.value.value = what === null ? noDefaultSetting.value : what;
		}

		inputEdited() {
			this.propagateChange();
		}

		propagateChange() {
			if (this.onchange instanceof Function) {
				this.onchange(this.getData());
			}
		}
	}

	/**
	 * Displays the <select> element with multiple choices
	 */
	class MultiListSelector extends ListSelector {
		constructor(prefix, data = []) {
			super(prefix, data, false);
		}

		render(data, allowNullValue) {
			const res = super.render(data, allowNullValue);
			this.value.multiple = true;
			return res;
		}

		getData() {
			const res = [];
			for (const opt of this.value.selectedOptions) {
				res.push(this.values_.get(opt.value));
			}
			return res;
		}

		setValue(what) {
			what = what || [];
			if (!Array.isArray(what)) {
				what = [what];
			}
			const vs = new Set(what);
			for (const opt of this.value.options) {
				opt.selected = vs.has(this.values_.get(opt.value));
			}
		}
	}

	class RadioSelector extends ElementWithLabel {
		/**
		 *
		 * @param {string} prefix
		 * @param {Array} [data=[]]
		 * @param {boolean} [allowNullValue=true]
		 */
		constructor(prefix, data = [], allowNullValue = true) {
			super(prefix, prefix, data, allowNullValue);
		}

		render(prefix, data, allowNullValue) {
			this.name_ = prefix.replace(' ', '_');
			const elem = document.createElement("div");
			this.values_ = new Map();
			this.radios_ = new Map();

			let values = [];
			if (allowNullValue) {
				values.push([noDefaultSetting.value, noDefaultSetting.text]);
				this.values_.set(noDefaultSetting.value, null);
			}
			for (const dr of data) {
				const dv = Array.isArray(dr) ? (dr.length > 1 ? [dr[1], dr[0]] : [dr[0], dr[0]]) : [dr, dr];
				values.push(dv);
				this.values_.set(`${dv[0]}`, dv[0]);
			}

			for (const v of values) {
				let inp = document.createElement("input");
				inp.type = "radio";
				inp.name = this.name_;
				inp.id = `${prefix}_${v[0]}`;
				inp.value = v[0];

				let lbl = document.createElement("label");
				lbl.htmlFor = inp.id;
				lbl.className = "ra-radio-label";
				lbl.innerHTML = capFirstChar(v[1]);
				inp.onclick = () => { this.inputEdited(); };
				this.radios_.set(v[0], inp);

				elem.appendChild(inp);
				elem.appendChild(lbl);
			}
			return elem;
		}

		getData() {
			return this.values_.get($(`input[name='${this.name_}']:checked`).val());
		}

		setValue(what) {
			this.radios_.get(what === null ? noDefaultSetting.value : what).checked = true;
		}

		inputEdited() {
			this.propagateChange();
		}

		propagateChange() {
			if (this.onchange instanceof Function) {
				this.onchange(this.getData());
			}
		}
	}

	class List extends EditorWithShortcuts {
		constructor(prefix, data = [], allowNullValue = true, textinput = false, capitalizeShortcuts = true) {
			super(prefix, data, allowNullValue, textinput, capitalizeShortcuts);
			this.values = new Map();
			if (allowNullValue) {
				this.values.set(noDefaultSetting.value, noDefaultSetting.text);
			}
			data.forEach(d => {
				if (Array.isArray(d) && d.length > 1) {
					this.values.set(d[1], d[0]);
				} else {
					this.values.set(d, d);
				}
			});
			this.selectedValue = null;
		}

		createEditor() {
			let res = document.createElement("input");
			res.setAttribute("type", "text");
			res.classList.add("rajs-value"); //
			// call the variable binding when the input field is no longer being edited, and when the enter key is pressed
			res.onblur = () => {
				this.inputEdited();
			};
			res.onkeypress = (e) => {
				if (returnP(e)) { this.inputEdited(); }
			};
			return res;
		}

		getTextData() {
			return this.selectedValue;
		}

		setTextValue(what) {
			this.selectedValue = what;
			if (this.values.has(what)) {
				super.setTextValue(this.values.get(what));
			} else {
				super.setTextValue(what);
			}
		}
	}

	class StringEditor extends EditorWithShortcuts {
		constructor(prefix, data = [], allowNullValue = true, capitalizeShortcuts = true) {
			super(prefix, data, allowNullValue, true, capitalizeShortcuts);
		}

		createEditor() {
			let res = document.createElement("input");
			res.setAttribute("type", "text");
			res.classList.add("rajs-value");
			// call the variable binding when the input field is no longer being edited, and when the enter key is pressed
			res.onblur = () => {
				this.inputEdited();
			};
			res.onkeypress = (e) => {
				if (returnP(e)) { this.inputEdited(); }
			};
			$(res).click(()=>res.setAttribute("placeholder", ""));
			return res;
		}
		setValue(what) {
			super.setValue(what);
			this.value.setAttribute("placeholder", what == null
												 ? `(${capFirstChar(noDefaultSetting.text)})`
												 : '');
		}

		getTextData() {
			return this.value.value;
		}

		setTextValue(what) {
			this.value.value = what;
		}
	}

	class BooleanSwitch extends ElementWithLabel {
		/**
		 * @param {string} prefix
		 * @param {Array} values for "false" and "true"
		 */
		constructor(prefix, values = [false, true]) {
			super(prefix, prefix);

			/** @private */
			this.values_ = {
				false: values[0],
				true: values[1]
			};
		}

		render(prefix) {
			const elem = document.createElement("div");
			let switchContainer = document.createElement("div");
			switchContainer.className = "ra-onoffswitch";
			this.checkBox_ = document.createElement("input");
			this.checkBox_.type = "checkbox";
			this.checkBox_.className = "ra-onoffswitch-checkbox";
			this.checkBox_.id = `ra-option-${prefix}`;
			let switchLabel = document.createElement("label");
			switchLabel.className = "ra-onoffswitch-label";
			switchLabel.htmlFor = this.checkBox_.id;
			let innerSpan = document.createElement("span");
			innerSpan.className = "ra-onoffswitch-inner";
			let switchSpan = document.createElement("span");
			switchSpan.className = "ra-onoffswitch-switch";
			switchLabel.appendChild(innerSpan);
			switchLabel.appendChild(switchSpan);
			switchContainer.appendChild(this.checkBox_);
			switchContainer.appendChild(switchLabel);
			elem.appendChild(switchContainer);
			elem.classList.add("rajs-list");

			this.checkBox_.onchange = () => { this.inputEdited(); };
			return elem;
		}

		getData() {
			return this.values_[this.checkBox_.checked];
		}

		setValue(what) {
			this.checkBox_.checked = this.values_.true === what;
		}

		inputEdited() {
			this.propagateChange();
		}

		propagateChange() {
			if (this.onchange instanceof Function) {
				this.onchange(this.getData());
			}
		}
	}

	class NumericTargetEditor extends EditorWithShortcuts {
		/**
		 * @param {string} prefix
		 * @param {Array} [data=[]]
		 * @param {boolean} [allowNullValue=true]
		 * @param {number} [min=0]
		 * @param {number} [max=100]
		 * @param {boolean} [spinBox=false]
		 */
		constructor(prefix, data = [], allowNullValue = true, min = 0, max = 100, spinBox = false) {
			super(prefix, data, allowNullValue, spinBox, true, min, max);
		}

		createEditor(min, max) {
			function makeOp(op, ui) {
				return {op: op, ui: ui};
			}
			this.opSelector = document.createElement("select");
			for (const o of [makeOp('==', '='), makeOp('>=', "⩾"), makeOp('<=', '⩽'), makeOp('>', '>'), makeOp('<', '<')]) {
				let opt = document.createElement("option");
				opt.textContent = o.ui;
				opt.value = o.op;
				this.opSelector.appendChild(opt);
			}
			this.opSelector.classList.add("rajs-list");
			this.opSelector.onchange = () => {
				this.inputEdited();
			};

			this.numEditor = document.createElement("input");
			this.numEditor.type = "number";
			this.numEditor.min = min;
			this.numEditor.max= max;
			this.numEditor.classList.add("rajs-value"); //
			this.numEditor.onblur = () => {
				this.inputEdited();
			};
			this.numEditor.onkeypress = (e) => {
				if (returnP(e)) { this.inputEdited(); }
			};

			const res = document.createElement("span");
			res.appendChild(this.opSelector);
			res.appendChild(this.numEditor);
			return res;
		}

		parse(what) {
			return what === "" ? null : parseInt(what);
		}

		setTextValue(what) {
			if (typeof what === 'number') { // comes from a pre-set
				this.numEditor.value = what.toString();
			} else if (what === null) {
				this.numEditor.value = null;
				this.opSelector.value = '==';
			} else if (typeof what === 'object') {
				this.numEditor.value = what.val;
				this.opSelector.value = what.cond;
			}
		}

		getTextData() {
			const v = this.parse(this.numEditor.value);
			return v === null ? null : App.RA.makeTarget(this.opSelector.value, v);
		}

		dataEqual(left, right) {
			if (left == null && right == null) { return true; }
			if (left == null || right == null) { return false; }
			// ignore the operator
			if(_.isObject(left )) { left = left .val; }
			if(_.isObject(right)) { right = right.val; }
			return left === right;
		}
	}

	class NumericRangeEditor extends EditorWithShortcuts {
		/**
		 * @param {string} prefix
		 * @param {Array} [data=[]]
		 * @param {boolean} [allowNullValue=true]
		 * @param {number} [min=0]
		 * @param {number} [max=100]
		 */
		constructor(prefix, data = [], allowNullValue = true, min = 0, max = 100) {
			super(prefix, data, allowNullValue, true, true, min, max);
		}

		createEditor(min, max) {
			this._min = min;
			this._max = max;
			let res = document.createElement("span");

			function makeElem(lbl, container, editor) {
				const spinBox = document.createElement("input");
				spinBox.type = "number";
				spinBox.min = min;
				spinBox.max = max;

				const label = document.createElement("span");
				label.textContent = lbl;
				label.className = "ra-inline-label";

				const elem = document.createElement("span");
				elem.appendChild(label);
				elem.appendChild(spinBox);
				container.appendChild(elem);

				spinBox.onblur = () => {
					editor.inputEdited();
				};
				spinBox.onkeypress = (e) => {
					if (returnP(e)) { editor.inputEdited(); }
				};

				return spinBox;
			}

			this._minEditor = makeElem("Min", res, this);
			this._maxEditor = makeElem("Max", res, this);

			this._minEditor.addEventListener("input", event => {
				const v = parseInt(this._minEditor.value);
				if (!Number.isNaN(v)) {
					this._maxEditor.min = Math.max(this._min, v).toString();
				}
			});

			this._maxEditor.addEventListener("input", event => {
				const v = parseInt(this._maxEditor.value);
				if (!Number.isNaN(v)) {
					this._minEditor.max = Math.min(this._max, v).toString();
				}
			});

			return res;
		}

		getTextData() {
			function parse(what) {
				return what === "" ? null : parseInt(what);
			}

			const vMin = parse(this._minEditor.value);
			const vMax = parse(this._maxEditor.value);
			return (vMin === null && vMax === null) ? null :
				App.RA.makeRange(vMin !== null ? vMin : this._min, vMax !== null ? vMax : this._max);
		}

		setTextValue(what) {
			if (what === null) {
				this._minEditor.value = null;
				this._maxEditor.value = null;
			} else {
				this._minEditor.value = what.min;
				this._maxEditor.value = what.max;
			}
		}
	}

	// a way to organize lists with too many elements in subsections
	// children are bound to the master list
	class ListSubSection extends ElementWithLabel {
		constructor(parent, label, pairs) {
			super(label);
			this.parent = parent;
			this.labelElement_.className = "ra-sub-label";
			pairs.forEach(item => this.appendChild(Array.isArray(item) ? new ListItem( ...item) : new ListItem(item)));
		}

		render() {
			return document.createElement("div");
		}

		appendChild(child) {
			super.appendChild(child);
			child.parent = this.parent;
			this.parent.children.push(child);
		}
	}

	// similar to list, but is just a collection of buttons
	class Options extends Element {
		constructor(elements = []) {
			super();
			elements.forEach(element => { this.appendChild(element); });
		}

		render() {
			const elem = document.createElement("div");
			elem.classList.add("rajs-list");
			return elem;
		}
	}

	class OptionsWithLabel extends Options {
		constructor(prefix, elements = []) {
			super(elements);
			this.labelElement_ = document.createElement("span");
			this.labelElement_.className = "ra-label";
			this.labelElement_.innerHTML = prefix;
		}

		/**
		 * @protected
		 * @param {HTMLElement} container
		 */
		_appendContentTo(container) {
			container.appendChild(this.labelElement_);
			super._appendContentTo(container);
		}
	}

	// options equivalent of ListItem
	class OptionsItem extends Element {
		constructor(label, onclick) {
			super(label);
			this.label = label;
			this.onclick = onclick;
		}
		render(label, onclick) {
			const elem = document.createElement("span");
			elem.classList.add("rajs-listitem");
			elem.innerHTML = label;
			elem.onclick = () => { return this.onclick(this); };
			return elem;
		}
	}

	class ButtonList extends Element {
		render(label) {
			const elem = document.createElement("div");
			const labelel = document.createElement("span");
			labelel.innerHTML = label += ": ";
			elem.appendChild(labelel);
			return elem;
		}

		getSelection() {
			return (this.children
				.filter(child => child.selected)
				.map(child => child.setvalue)
			);
		}

		getAllValues() {
			return this.children.map(child => child.setvalue);
		}

		onchange() { return; }
	}

	class ButtonItem extends Element {
		constructor(label, setvalue, selected = false) {
			super(label, selected);
			this.selected = selected;
			this.setvalue = setvalue ? setvalue : label;
		}

		render(label, selected) {
			const container = document.createElement("div");
			container.classList.add("rajs-listitem");

			const labelel = document.createElement("span");
			labelel.innerHTML = label;

			const button = document.createElement("input");
			button.setAttribute("type", "checkbox");
			button.checked = selected;
			button.onchange = () => this.onchange(button.checked);
			labelel.onclick = () => button.click();

			container.appendChild(labelel);
			container.appendChild(button);

			return container;
		}

		onchange(value) {
			this.selected = value;
			this.parent.onchange(this);
		}
	}

	// rule import field
	class NewRuleField extends Element {
		constructor() {
			super();
		}

		render() {
			let element = document.getElementById("importfield");
			if (element !== null) {
				return element;
			}
			const container = document.createElement("div");
			container.id = "importfield";
			const textarea = document.createElement("textarea");
			textarea.placeholder = "Paste your rule here";
			container.appendChild(textarea);
			this.textarea = textarea;
			const button = document.createElement("button");
			button.name = "Load";
			button.innerHTML = "Load";
			button.onclick = () => { this.loadNewRule(); };
			container.appendChild(button);
			return container;
		}

		loadNewRule() {
			const text = this.textarea.value;
			try {
				const rule = JSON.parse(text);
				if (Array.isArray(rule)) {
					rule.forEach(r => {
						V.defaultRules.push(App.Entity.Utils.RARuleDatatypeCleanup(r));
					});
				} else {
					V.defaultRules.push(App.Entity.Utils.RARuleDatatypeCleanup(rule));
				}
				reload();
			} catch (e) {
				alert(`Couldn't import that rule:\n${e.message}`);
			}
		}
	}

	// the base element, parent of all elements
	class Root extends Element {
		constructor(element) {
			super(element);
			if (V.defaultRules.length === 0) {
				const paragraph = document.createElement("p");
				paragraph.innerHTML = "<strong>No rules</strong>";
				this.appendChild(new Element(paragraph));
				this.appendChild(new NoRules(this));
				return;
			}
			this.appendChild(new RuleSelector(this));
			this.appendChild(new RuleOptions(this));
			this.appendChild(new ConditionEditor(this));
			this.appendChild(new EffectEditor(this));
			App.UI.tabbar.handlePreSelectedTab("appearance", true);
		}

		render(element) {
			const greeting = document.createElement("p");
			greeting.innerHTML = `<em>${properTitle()}, I will review your slaves and make changes that will have a beneficial effect. Apologies, ${properTitle()}, but this function is... not fully complete. It may have some serious limitations. Please use the '${noDefaultSetting.text}' option to identify areas I should not address.</em>`;
			element.appendChild(greeting);
			return element;
		}
	}

	// options displayed when there are no rules
	class NoRules extends Options {
		constructor() {
			super();
			const newrule = new OptionsItem("Add a new rule", () => { newRule(); });
			this.appendChild(newrule);
			const importrule = new OptionsItem("Import a rule", () => { root.appendChild(new NewRuleField()); });
			this.appendChild(importrule);
		}
	}

	// buttons for selecting the current rule
	class RuleSelector extends List {
		constructor() {
			super("Current rule", V.defaultRules.map(i => [(i.name + (RuleHasError(i) ? " <span class='yellow'>[!]</span>" : "")), i]), false);
			this.setValue(current_rule.name);
			this.onchange = function(rule) {
				V.currentRule = rule.ID;
				reload();
			};
		}
	}

	// buttons for doing transformations on rules
	class RuleOptions extends Options {
		constructor() {
			super();
			this.appendChild(new OptionsItem("New Rule", newRule));
			this.appendChild(new OptionsItem("Remove Rule", removeRule));
			this.appendChild(new OptionsItem("Apply rules", () => this.appendChild(new ApplicationLog())));
			this.appendChild(new OptionsItem("Lower Priority", lowerPriority));
			this.appendChild(new OptionsItem("Higher Priority", higherPriority));
			this.appendChild(new OptionsItem("Rename", () => this.appendChild(new RenameField())));
			this.appendChild(new OptionsItem("Export this rule", () => this.appendChild(new ExportField(current_rule))));
			this.appendChild(new OptionsItem("Export all rules", () => this.appendChild(new ExportField(...V.defaultRules))));
			this.appendChild(new OptionsItem("Import rule(s)", () => this.appendChild(new NewRuleField())));
		}
	}

	class ApplicationLog extends Element {
		render() {
			const elem = document.querySelector("#application-log") || document.createElement("div");
			elem.id = "application-log";
			elem.innerHTML = V.slaves.map(slave => DefaultRules(slave)).join("");
			return elem;
		}
	}

	class RenameField extends Element {
		constructor() {
			super();
			this.element.onblur = () => changeName(this.element.value);
			this.element.onkeypress = (e) => { if (returnP(e)) { changeName(this.element.value); } };
		}

		render() {
			const elem = document.createElement("input");
			elem.setAttribute("type", "text");
			elem.setAttribute("value", current_rule.name);
			return elem;
		}
	}

	class ExportField extends Element {
		render(...args) {
			let element = document.getElementById("exportfield");
			if (element === null) {
				element = document.createElement("textarea");
				element.id = "exportfield";
			}
			element.value = JSON.stringify(args, null, 2);
			return element;
		}
	}

	// parent section for condition editing
	class ConditionEditor extends Section {
		constructor() {
			super("Activation Condition");
			this.appendChild(new ConditionFunction());
			this.appendChild(new AssignmentInclusion());
			this.appendChild(new FacilityHeadAssignmentInclusion());
			this.appendChild(new SpecificInclusionExclusion());
		}
	}

	class ConditionFunction extends Element {
		constructor() {
			super();
			const items = [
				["Never", false],
				["Always", true],
				["Custom", "custom"],
				["Devotion", "devotion"],
				["Trust", "trust"],
				["Health", "health.condition"],
				["Sex", "genes"],
				["Sex drive", "energy"],
				["Height", "height"],
				["Weight", "weight"],
				["Age", "actualAge"],
				["Body Age", "physicalAge"],
				["Visible Age", "visualAge"],
				["Muscles", "muscles"],
				["Lactation", "lactation"],
				["Pregnancy", "preg"],
				["Pregnancy Multiples", "pregType"],
				["Belly Implant", "bellyImplant"],
				["Belly Size", "belly"],
				["Education", "intelligenceImplant"],
				["Intelligence", "intelligence"],
				["Fetish", "fetish"],
				["Accent", "accent"],
				["Waist", "waist"],
				["Amputation", "amp"],
			];
			this.fnlist = new List("Activation function", items, false);
			this.fnlist.setValue(["between", "belongs"].includes(current_rule.condition.function) ? current_rule.condition.data.attribute : current_rule.condition.function);
			this.fnlist.onchange = (value) => this.fnchanged(value);
			this.appendChild(this.fnlist);
			this.fneditor = null;

			switch (current_rule.condition.function) {
				case false:
				case true:
					break;
				case "custom":
					this.show_custom_editor(CustomEditor, current_rule.condition.data);
					break;
				case "between":
					this.show_custom_editor(RangeEditor, current_rule.condition.function, current_rule.condition.data);
					break;
				case "belongs":
					this.show_custom_editor(ItemEditor, current_rule.condition.function, current_rule.condition.data);
					break;
			}
		}

		betweenP(attribute) {
			return [
				"devotion",
				"trust",
				"health.condition",
				"energy",
				"height",
				"weight",
				"actualAge",
				"physicalAge",
				"visualAge",
				"muscles",
				"lactation",
				"preg",
				"pregType",
				"bellyImplant",
				"belly",
				"intelligenceImplant",
				"intelligence",
				"accent",
				"waist",
			].includes(attribute);
		}

		belongsP(attribute) {
			return [
				"fetish",
				"amp",
				"genes",
			].includes(attribute);
		}

		show_custom_editor(what, ...args) {
			if (this.custom_editor !== null) { this.hide_custom_editor(); }
			this.custom_editor = new what(...args);
			this.appendChild(this.custom_editor);
		}

		hide_custom_editor() {
			if (this.custom_editor) {
				this.custom_editor.remove();
				this.custom_editor = null;
			}
		}

		render() {
			return document.createElement("div");
		}

		fnchanged(value) {
			if (this.fneditor !== null) {
				this.fneditor.element.remove();
				this.fneditor = null;
			}
			if (value === true || value === false) {
				current_rule.condition.function = value;
				current_rule.condition.data = {};
				this.hide_custom_editor();
			} else if (value === "custom") {
				current_rule.condition.function = "custom";
				current_rule.condition.data = "";
				this.show_custom_editor(CustomEditor, current_rule.condition.data);
			} else if (this.betweenP(value)) {
				current_rule.condition.function = "between";
				current_rule.condition.data = {attribute: value, value: [null, null]};
				this.show_custom_editor(RangeEditor, current_rule.condition.function, current_rule.condition.data);
			} else if (this.belongsP(value)) {
				current_rule.condition.function = "belongs";
				current_rule.condition.data = {attribute: value, value: []};
				this.show_custom_editor(ItemEditor, current_rule.condition.function, current_rule.condition.data);
			}
		}
	}

	class CustomEditor extends Element {
		constructor(data) {
			if (data.length === 0) { data = "(slave) => slave.slaveName === 'Fancy Name'"; }
			super(data);
		}

		render(data) {
			const elem = document.createElement("div");
			const textarea = document.createElement("textarea");
			textarea.innerHTML = data;
			$(textarea).blur(() => {
				current_rule.condition.data = textarea.value;
				// TODO: this would be a good place to cache the Function object that will be used by RuleHasError and ruleAppliesP
				reload();
			});
			elem.appendChild(textarea);

			if(RuleHasError(current_rule)) {
				const errorMessage = document.createElement("div");
				$(errorMessage).addClass("yellow");
				errorMessage.innerText = "WARNING: There are errors in this condition. Please ensure the syntax is correct and equality is either '==' or '===', not '='";
				elem.appendChild(errorMessage);
			}

			const explanation = document.createElement("div");
			explanation.innerHTML = "Insert a valid <a target='_blank' class='link-external' href='https://www.w3schools.com/js/js_comparisons.asp'>JavaScript comparison and/or logical operation</a>.";
			elem.appendChild(explanation);
			return elem;
		}
	}


	class RangeEditor extends Element {
		render(fn, data) {
			const elem = document.createElement("div");

			const minlabel = document.createElement("label");
			minlabel.innerHTML = "Lower bound: ";
			elem.appendChild(minlabel);

			const min = document.createElement("input");
			min.setAttribute("type", "text");
			min.value = `${data.value[0]}`;
			min.onkeypress = e => { if (returnP(e)) { this.setmin(min.value); } };
			min.onblur = e => this.setmin(min.value);
			this.min = min;
			elem.appendChild(min);

			elem.appendChild(document.createElement("br"));

			const maxlabel = document.createElement("label");
			maxlabel.innerHTML = "Upper bound: ";
			elem.appendChild(maxlabel);

			const max = document.createElement("input");
			max.setAttribute("type", "text");
			max.value = `${data.value[1]}`;
			max.onkeypress = e => { if (returnP(e)) { this.setmax(max.value); } };
			max.onblur = e => this.setmax(max.value);
			this.max = max;
			elem.appendChild(max);

			const infobar = document.createElement("div");
			infobar.innerHTML = this.info(data.attribute);
			elem.appendChild(infobar);

			return elem;
		}

		parse(value) {
			value = value.trim();
			if (value === "null") {
				value = null;
			} else {
				value = parseInt(value);
				if (isNaN(value)) { value = null; }
			}
			return value;
		}

		setmin(value) {
			current_rule.condition.data.value[0] = this.parse(value);
			this.min.value = `${current_rule.condition.data.value[0]}`;
		}

		setmax(value) {
			current_rule.condition.data.value[1] = this.parse(value);
			this.max.value = `${current_rule.condition.data.value[1]}`;
		}

		info(attribute) {
			return ({
				"devotion": "Very Hateful: (-∞, -95), Hateful: [-95, -50), Resistant: [-50, -20), Ambivalent: [-20, 20], Accepting: (20, 50], Devoted: (50, 95], Worshipful: (95, ∞)",
				"trust": "Extremely terrified: (-∞, -95), Terrified: [-95, -50), Frightened: [-50, -20), Fearful: [-20, 20], Careful: (20, 50], Trusting: (50, 95], Total trust: (95, ∞)",
				"health.condition": "Death: (-∞, -100), Near Death: [-100, -90), Extremely Unhealthy: [-90, -50), Unhealthy: [-50, -20), Healthy: [-20, 20], Very Healthy: (20, 50], Extremely Healthy: (50, 90], Unnaturally Healthy: (90, ∞)",
				"energy": "Frigid: (-∞, 20], Poor: (20, 40], Average: (40, 60], Powerful: (60, 80], Sex Addict: (80, 100), Nympho: 100",
				"weight": "Emaciated: (-∞, -95), Skinny: [-95, -30), Thin: [-30, -10), Average: [-10, 10], Plush: (10, 30], Fat: (30, 95], Overweight: (95, ∞)",
				"lactation": "None: 0, 1: Natural, 2: Lactation implant",
				"preg": "Barren: -2, On contraceptives: -1, Not pregnant: 0, Pregnancy weeks: [1, ∞)",
				"pregType": "Fetus count, known only after the 10th week of pregnancy",
				"bellyImplant": "Volume in CCs. None: -1",
				"belly": "Volume in CCs, any source",
				"intelligenceImplant": "Education level. 0: uneducated, 15: educated, 30: advanced education, (0, 15): incomplete education.",
				"intelligence": "From moronic to brilliant: [-100, 100]",
				"accent": "No accent: 0, Nice accent: 1, Bad accent: 2, Can't speak language: 3 and above",
				"waist": "Masculine waist: (95, ∞), Ugly waist: (40, 95], Unattractive waist: (10, 40], Average waist: [-10, 10], Feminine waist: [-40, -10), Wasp waist: [-95, -40), Absurdly narrow: (-∞, -95)",
			} [attribute] || " ");
		}
	}

	class ItemEditor extends Element {
		render(fn, data) {
			const elem = document.createElement("div");

			const input = document.createElement("input");
			input.setAttribute("type", "text");
			input.value = JSON.stringify(data.value);
			input.onkeypress = e => { if (returnP(e)) { this.setValue(input); } };
			input.onblur = e => this.setValue(input);
			this.input = input;
			elem.appendChild(input);

			const infobar = document.createElement("div");
			infobar.innerHTML = this.info(data.attribute);
			elem.appendChild(infobar);

			return elem;
		}

		info(attribute) {
			return `Insert a valid JSON array. Known values: ${{
				"fetish": "buttslut, cumslut, masochist, sadist, dom, submissive, boobs, pregnancy, none (AKA vanilla)",
				"amp": "Amputated: 1, Not amputated: 0",
				"genes": "XX, XY",
			}[attribute]}`;
		}

		setValue(input) {
			try {
				const arr = JSON.parse(input.value);
				current_rule.condition.data.value = arr;
				input.value = JSON.stringify(arr);
			} catch (e) {
				alert(e);
			}
		}
	}

	class AssignmentInclusionBase extends ButtonList {
		/**
		 * @param {string} label
		 * @param {App.Data.JobDesc[]} [jobs]
		 * @param {App.Entity.Facilities.SingleJobFacility[]} [facilities]
		 */
		constructor(label, jobs, facilities) {
			super(label);
			this._attributes = {};
			if (jobs !== undefined) {
				jobs.forEach(job => {
					this._attributes[capFirstChar(job.position)] = job.assignment;
				});
			}
			if (facilities !== undefined) {
				facilities.forEach(f => {
					if (f.established && f.desc.defaultJob != null) { /* eslint-disable-line eqeqeq */
						const displayName = f.name === "the " + f.genericName ? f.genericName : f.name;
						this._attributes[displayName] = f.desc.jobs[f.desc.defaultJob].assignment;
					}
				});
			}
			for (const i in this._attributes) {
				this.appendChild(new ButtonItem(i, this.getAttribute(i), current_rule.condition.assignment.includes(this.getAttribute(i))));
			}
		}

		onchange() {
			const allValues = this.getAllValues();
			current_rule.condition.assignment = this.getSelection().concat(current_rule.condition.assignment.filter(a => !allValues.includes(a)));
		}

		getAttribute(what) {
			return this._attributes[what];
		}
	}


	class AssignmentInclusion extends AssignmentInclusionBase {
		constructor() {
			let facilities = [];
			for (const f of Object.values(App.Entity.facilities)) {
				if (f === App.Entity.facilities.penthouse) {
					continue;
				}
				if (f.established) {
					facilities.push(f);
				}
			}
			super("Apply to assignments and facilities", Object.values(App.Data.Facilities.penthouse.jobs), facilities);
		}
	}

	class FacilityHeadAssignmentInclusion extends AssignmentInclusionBase {
		constructor() {
			const jobs = [];
			for (const f of Object.values(App.Entity.facilities)) {
				if (f.established && f.desc.manager !== null) {
					jobs.push(f.desc.manager);
				}
			}
			super("Apply to facility heads", jobs);
		}
	}

	class SpecificInclusionExclusion extends Options {
		constructor() {
			super();
			this.appendChild(new OptionsItem("Limit to specific slaves", () => this.show_slave_selection()));
			this.appendChild(new OptionsItem("Exclude specific slaves", () => this.show_slave_exclusion()));
			this.subwidget = null;
		}

		show_slave_selection() {
			if (this.subwidget) { this.subwidget.remove(); }
			this.subwidget = new SlaveSelection();
			this.appendChild(this.subwidget);
		}

		show_slave_exclusion() {
			if (this.subwidget) { this.subwidget.remove(); }
			this.subwidget = new SlaveExclusion();
			this.appendChild(this.subwidget);
		}
	}

	class SlaveSelection extends ButtonList {
		constructor() {
			super("Include specific slaves");
			V.slaves.forEach(slave => this.appendChild(new ButtonItem(
				[slave.slaveName, slave.slaveSurname].join(" "),
				slave.ID,
				current_rule.condition.selectedSlaves.includes(slave.ID))));
		}

		onchange() {
			current_rule.condition.selectedSlaves = this.getSelection();
		}
	}

	class SlaveExclusion extends ButtonList {
		constructor() {
			super("Exclude specific slaves");
			V.slaves.forEach(slave => this.appendChild(new ButtonItem(
				[slave.slaveName, slave.slaveSurname].join(" "),
				slave.ID,
				current_rule.condition.excludedSlaves.includes(slave.ID))));
		}

		onchange() {
			current_rule.condition.excludedSlaves = this.getSelection();
		}
	}

	// parent section for effect editing
	class EffectEditor extends Element {
		constructor() {
			super();
			this.appendChild(new AppearanceTab(this.tabButtons_));
			this.appendChild(new CosmeticTab(this.tabButtons_));
			this.appendChild(new BodyModTab(this.tabButtons_));
			this.appendChild(new AutosurgeryTab(this.tabButtons_));
			this.appendChild(new RegimenTab(this.tabButtons_));
			this.appendChild(new BehaviourTab(this.tabButtons_));
			this.appendChild(new OtherTab(this.tabButtons_));
		}

		render() {
			const element = document.createElement("div");
			element.className = "ra-setters";
			this.tabButtons_ = document.createElement("div");
			this.tabButtons_.className = "tab";
			element.appendChild(this.tabButtons_);
			return element;
		}
	}

	class AppearanceTab extends Tab {
		constructor(tabButtons) {
			super("appearance", "Appearance", tabButtons);
			this.appendChild(new ClothesList());
			this.appendChild(new CollarList());
			this.appendChild(new ShoeList());
			this.appendChild(new CorsetList());
			this.appendChild(new GlovesList());
			this.appendChild(new LeggingsList());
			this.appendChild(new VagChastityList());
			this.appendChild(new VagAccVirginsList());
			this.appendChild(new VagAccAVirginsList());
			this.appendChild(new VagAccOtherList());
			this.appendChild(new VaginalAttachmentsList());
			if (V.seeDicks !== 0 || V.makeDicks !== 0) {
				this.appendChild(new DickChastityList());
				this.appendChild(new DickAccVirginsList());
				this.appendChild(new DickAccOtherList());
			}
			this.appendChild(new AnalChastityList());
			this.appendChild(new ButtplugsVirginsList());
			this.appendChild(new ButtplugsOtherList());
			this.appendChild(new ButtplugAttachmentsList());
			this.appendChild(new ImplantVolumeList());
		}
	}

	class RegimenTab extends Tab {
		constructor(tabButtons) {
			super("regimen", "Physical Regimen", tabButtons);
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				this.appendChild(new HyperGrowthSwitch());
			}
			this.appendChild(new IntensiveGrowthSwitch());
			this.appendChild(new GrowthList());
			this.appendChild(new CurrativesList());
			this.appendChild(new AphrodisiacList());
			this.appendChild(new ContraceptiveList());
			this.appendChild(new AbortionList());
			if (V.pregSpeedControl) {
				this.appendChild(new PregDrugsList());
			}
			this.appendChild(new FemaleHormonesList());
			this.appendChild(new ShemaleHormonesList());
			this.appendChild(new GeldingHormonesList());
			this.appendChild(new OtherDrugsList());
			if (V.enema === 1) {
				this.appendChild(new EnemaList());
			}
			this.appendChild(new WeightEditor());
			this.appendChild(new DietList());
			this.appendChild(new DietGrowthList());
			this.appendChild(new DietBaseList());
			if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
				this.appendChild(new DietSolidFoodList());
			}
			this.appendChild(new MuscleList());
			this.appendChild(new BraceList());
		}
	}

	class BehaviourTab extends Tab {
		constructor(tabButtons) {
			super("behavior", "Behavior", tabButtons);
			this.appendChild(new AutomaticAssignmentList());
			if (V.pit === 1) {
			this.appendChild(new PitAssignmentList());
			}
			this.appendChild(new LivingStandardList());
			this.appendChild(new PunishmentList());
			this.appendChild(new RewardList());
			this.appendChild(new ReleaseMasturbationSwitch());
			this.appendChild(new ReleasePartnerSwitch());
			this.appendChild(new ReleaseFamilySwitch());
			this.appendChild(new ReleaseSlavesSwitch());
			this.appendChild(new ReleaseMasterSwitch());
			this.appendChild(new ToyHoleList());
			this.appendChild(new SmartFetishList());
			this.appendChild(new SmartXYAttractionList());
			this.appendChild(new SmartXXAttractionList());
			this.appendChild(new SmartEnergyList());
			this.appendChild(new SpeechList());
			this.appendChild(new RelationshipList());
			if (V.studio === 1) {
				this.appendChild(new PornBroadcastStatus());
				this.appendChild(new PornList());
			}
		}
	}

	class OtherTab extends Tab {
		constructor(tabButtons) {
			super("other", "Other", tabButtons);
			this.appendChild(new ClearLabelSwitch());
			this.appendChild(new LabelList());
			this.appendChild(new LabelRemoveList());
		}
	}

	class ClearLabelSwitch extends BooleanSwitch {
		constructor() {
			super("Remove all tags (Global switch)", [false, true]);
			this.setValue(current_rule.set.labelTagsClear);
			this.onchange = (value) => current_rule.set.labelTagsClear = value;
		}
	}

	class CosmeticTab extends Tab {
		constructor(tabButtons) {
			super("cosmetic", "Cosmetic", tabButtons);
			this.appendChild(new EyewearList());
			this.appendChild(new LensesList());
			this.appendChild(new EarwearList());
			this.appendChild(new MakeupList());
			this.appendChild(new NailsList());
			this.appendChild(new HairLengthList());
			this.appendChild(new HaircutsList());
			this.appendChild(new HairColorList());
			this.appendChild(new HairStyleList());
			this.appendChild(new EyebrowColorList());
			this.appendChild(new EyebrowStyleList());
			this.appendChild(new EyebrowFullnessList());
			this.appendChild(new PubicHairColorList());
			this.appendChild(new PubicHairStyleList());
			this.appendChild(new ArmpitHairColorList());
			this.appendChild(new ArmpitHairStyleList());
			this.appendChild(new SkinColorList());
			this.appendChild(new MarkingsList());
			this.appendChild(new HornColorList());
		}
	}

	class BodyModTab extends Tab {
		constructor(tabButtons) {
			super("bodyMod", "Body Mod", tabButtons);
			this.appendChild(new EarPiercingList());
			this.appendChild(new NosePiercingList());
			this.appendChild(new EyebrowPiercingList());
			this.appendChild(new NavelPiercingList());
			this.appendChild(new NipplePiercingList());
			this.appendChild(new AreolaPiercingList());
			this.appendChild(new LipPiercingList());
			this.appendChild(new TonguePiercingList());
			this.appendChild(new ClitPiercingList());
			this.appendChild(new LabiaPiercingList());
			this.appendChild(new ShaftPiercingList());
			this.appendChild(new PerineumPiercingList());
			this.appendChild(new CorsetPiercingList());

			this.appendChild(new AutoBrandingList());
			this.appendChild(new BrandingLocationList());
			this.appendChild(new BrandDesignList());

			this.appendChild(new FaceTattooList());
			this.appendChild(new ShoulderTattooList());
			this.appendChild(new ChestTattooList());
			this.appendChild(new ArmTattooList());
			this.appendChild(new UpperBackTattooList());
			this.appendChild(new LowerBackTattooList());
			this.appendChild(new AbdomenTattooList());
			if (V.seeDicks || V.makeDicks) {
				this.appendChild(new DickTattooList());
			}
			this.appendChild(new ButtockTattooList());
			this.appendChild(new AnalTattooList());
			this.appendChild(new LegTattooList());

			this.appendChild(new BirthsTattooList());
			this.appendChild(new AbortionTattooList());
		}
	}

	class AutosurgeryTab extends Tab {
		constructor(tabButtons) {
			super("autosurgery", "Autosurgery", tabButtons);
			this.appendChild(new AutosurgerySwitch());
			this.appendChild(new VisionSurgeryList());
			this.appendChild(new HearingSurgeryList());
			this.appendChild(new SmellSurgeryList());
			this.appendChild(new TasteSurgeryList());
			this.appendChild(new LactationSurgeryList());
			if (V.seeDicks || V.makeDicks) {
				this.appendChild(new SemenSurgeryList());
				this.appendChild(new VasectomyList());
			}
			this.appendChild(new CosmeticSurgeryList());
			this.appendChild(new LipSurgeryList());
			this.appendChild(new ButtSurgeryList());
			this.appendChild(new BreastSurgeryList());
			this.appendChild(new TighteningSurgeryList());
			this.appendChild(new TummyTuckSurgeryList());
			this.appendChild(new BodyHairSurgeryList());
			this.appendChild(new HairSurgeryList());
			if (V.bellyImplants > 0) {
				this.appendChild(new BellyImplantList());
			}
			this.appendChild(new EarShapeSurgeryList());
			this.appendChild(new HornSurgeryList());
		}
	}

	class ClothesList extends List {
		constructor() {
			const items = [
				["Select her own outfit", "choosing her own clothes"]
			];
			super("Clothes", items);

			const nclothes = isClothingAccessible.array(App.Data.misc.niceClothes);
			nclothes.sort(function(a, b) { if (a[0] < b[0]) { return -1; } if (a[0] > b[0]) { return 1; } return 0; });
			this._nice = new ListSubSection(this, "Nice", nclothes);

			const hclothes = isClothingAccessible.array(App.Data.misc.harshClothes);
			hclothes.sort(function(a, b) { if (a[0] < b[0]) { return -1; } if (a[0] > b[0]) { return 1; } return 0; });

			this._harsh = new ListSubSection(this, "Harsh", hclothes);

			this.setValue(current_rule.set.clothes);
			this.onchange = (value) => current_rule.set.clothes = value;
		}

		_appendContentTo(container) {
			super._appendContentTo(container);
			this._nice._appendContentTo(container);
			this._harsh._appendContentTo(container);
		}
	}

	class CollarList extends List {
		constructor() {
			const items = [
				["No collar", "none"],
			];
			super("Collar", items);

			const niceCollars = isClothingAccessible.array(App.Data.misc.niceCollars);
			niceCollars.sort(function(a, b) { if (a[0] < b[0]) { return -1; } if (a[0] > b[0]) { return 1; } return 0; });
			this._nice = new ListSubSection(this, "Nice", niceCollars);

			const harshCollars = isClothingAccessible.array(App.Data.misc.harshCollars);
			harshCollars.sort(function(a, b) { if (a[0] < b[0]) { return -1; } if (a[0] > b[0]) { return 1; } return 0; });
			this._harsh = new ListSubSection(this, "Harsh", harshCollars);

			this.setValue(current_rule.set.collar);
			this.onchange = (value) => current_rule.set.collar = value;
		}

		_appendContentTo(container) {
			super._appendContentTo(container);
			this._nice._appendContentTo(container);
			this._harsh._appendContentTo(container);
		}
	}

	class ShoeList extends ListSelector {
		constructor() {
			const shoes = [];
			setup.shoes.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					shoes.push([acc.name, acc.value]);
				} else if (acc.fs === "statuesque" && V.arcologies[0].FSStatuesqueGlorification !== "unset") {
					shoes.push([`${acc.name} (FS)`, acc.value]);
				} else if (acc.rs === "shoesBoughtHeels" && V.shoesBoughtHeels === 1) {
					shoes.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Shoes", shoes);
			this.setValue(current_rule.set.shoes);
			this.onchange = (value) => current_rule.set.shoes = value;
		}
	}

	class CorsetList extends ListSelector {
		constructor() {
			const bellies = [];
			setup.bellyAccessories.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					bellies.push([acc.name, acc.value]);
				} else if (acc.fs === "repopulation" && V.arcologies[0].FSRepopulationFocus !== "unset") {
					bellies.push([`${acc.name} (FS)`, acc.value]);
				} else if (acc.rs === "clothesBoughtBelly" && V.clothesBoughtBelly === 1) {
					bellies.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Corsetage", bellies);
			this.setValue(current_rule.set.bellyAccessory);
			this.onchange = (value) => current_rule.set.bellyAccessory = value;
		}
	}

	class GlovesList extends ListSelector {
		constructor() {
			const items = [
				["none"],
				["hand gloves"],
				["elbow gloves"],
			];
			super("Arm accessory", items, true, false, true);
			this.setValue(current_rule.set.armAccessory);
			this.onchange = (value) => current_rule.set.armAccessory = value;
		}
	}

	class LeggingsList extends ListSelector {
		constructor() {
			const items = [
				["none"],
				["short stockings"],
				["long stockings"],
			];
			super("Leg accessory", items, true, false, true);
			this.setValue(current_rule.set.legAccessory);
			this.onchange = (value) => current_rule.set.legAccessory = value;
		}
	}

	class VagChastityList extends RadioSelector {
		constructor() {
			const chaste = [
				["none", 0],
				["chastity", 1],
			];
			super("Vaginal chastity", chaste, true);
			this.setValue(current_rule.set.chastityVagina);
			this.onchange = (value) => current_rule.set.chastityVagina = value;
		}
	}

	class VagAccVirginsList extends ListSelector {
		constructor() {
			const accs = [];
			setup.vaginalAccessories.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "buyBigDildos" && V.toysBoughtDildos === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Vaginal accessories for virgins", accs);
			this.setValue(current_rule.set.virginAccessory);
			this.onchange = (value) => current_rule.set.virginAccessory = value;
		}
	}

	class VagAccAVirginsList extends ListSelector {
		constructor() {
			const accs = [];
			setup.vaginalAccessories.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "buyBigDildos" && V.toysBoughtDildos === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Vaginal accessories for anal virgins", accs);
			this.setValue(current_rule.set.aVirginAccessory);
			this.onchange = (value) => current_rule.set.aVirginAccessory = value;
		}
	}

	class VagAccOtherList extends ListSelector {
		constructor() {
			const accs = [];
			setup.vaginalAccessories.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "buyBigDildos" && V.toysBoughtDildos === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Vaginal accessories for other slaves", accs);
			this.setValue(current_rule.set.vaginalAccessory);
			this.onchange = (value) => current_rule.set.vaginalAccessory = value;
		}
	}

	class VaginalAttachmentsList extends ListSelector {
		constructor() {
			const accs = [];
			setup.vaginalAttachments.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "buyVaginalAttachments" && V.toysBoughtVaginalAttachments === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Vaginal attachments for slaves with vaginal accessories", accs);
			this.setValue(current_rule.set.vaginalAttachment);
			this.onchange = (value) => current_rule.set.vaginalAttachment = value;
		}
	}

	class DickChastityList extends RadioSelector {
		constructor() {
			const items = [
				["none", 0],
				["chastity cage", 1],
			];
			super("Penile chastity", items, true);
			this.setValue(current_rule.set.chastityPenis);
			this.onchange = (value) => current_rule.set.chastityPenis = value;
		}
	}

	class DickAccVirginsList extends ListSelector {
		constructor() {
			super("Dick accessories for anal virgins", setup.dickAccessories.map(i => [i.name, i.value]));
			this.setValue(current_rule.set.aVirginDickAccessory);
			this.onchange = (value) => current_rule.set.aVirginDickAccessory = value;
		}
	}

	class DickAccOtherList extends ListSelector {
		constructor() {
			super("Dick accessories for other slaves", setup.dickAccessories.map(i => [i.name, i.value]));
			this.setValue(current_rule.set.dickAccessory);
			this.onchange = (value) => current_rule.set.dickAccessory = value;
		}
	}

	class AnalChastityList extends RadioSelector {
		constructor() {
			const items = [
				["none", 0],
				["chastity", 1],
			];
			super("Anal chastity", items, true);
			this.setValue(current_rule.set.chastityAnus);
			this.onchange = (value) => current_rule.set.chastityAnus = value;
		}
	}

	class ButtplugsVirginsList extends ListSelector {
		constructor() {
			const accs = [];
			setup.buttplugs.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "toysBoughtButtPlugs" && V.toysBoughtButtPlugs === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Buttplugs for anal virgins", accs);
			this.setValue(current_rule.set.aVirginButtplug);
			this.onchange = (value) => current_rule.set.aVirginButtplug = value;
		}
	}

	class ButtplugsOtherList extends ListSelector {
		constructor() {
			const accs = [];
			setup.buttplugs.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "toysBoughtButtPlugs" && V.toysBoughtButtPlugs === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Buttplugs for other slaves", accs);
			this.setValue(current_rule.set.buttplug);
			this.onchange = (value) => current_rule.set.buttplug = value;
		}
	}

	class ButtplugAttachmentsList extends ListSelector {
		constructor() {
			const accs = [];
			setup.buttplugAttachments.forEach(acc => {
				if (acc.fs === undefined && acc.rs === undefined) {
					accs.push([acc.name, acc.value]);
				} else if (acc.rs === "toysBoughtButtPlugTails" && V.toysBoughtButtPlugTails === 1) {
					accs.push([`${acc.name} (Purchased)`, acc.value]);
				}
			});
			super("Buttplug attachments for slaves with buttplugs", accs);
			this.setValue(current_rule.set.buttplugAttachment);
			this.onchange = (value) => current_rule.set.buttplugAttachment = value;
		}
	}

	class ImplantVolumeList extends ListSelector {
		constructor() {
			const pairs = [
				["no changes", -1],
				["empty implant", 0],
				["early pregnancy", 1500],
				["second trimester pregnancy", 5000],
				["full-term pregnancy", 15000],
				["full-term with twins", 30000],
				["full-term with triplets", 45000],
				["full-term with quadruplets", 60000],
				["full-term with quintuplets", 75000],
				["full-term with sextuplets", 90000],
				["full-term with septuplets", 105000],
				["full-term with octuplets", 120000]
			];
			super("Belly implant target volume (if present)", pairs, false);
			this.setValue(current_rule.set.bellyImplantVol);
			this.onchange = (value) => current_rule.set.bellyImplantVol = value;
		}
	}

	class AutosurgerySwitch extends BooleanSwitch {
		constructor() {
			super("Assistant-applied implants (Autosurgery global switch)", [0, 1]);
			this.setValue(current_rule.set.autoSurgery);
			this.onchange = (value) => current_rule.set.autoSurgery = value;
		}
	}

	class IntensiveGrowthSwitch extends BooleanSwitch {
		constructor() {
			super("Use intensive growth drugs for healthy slaves", [0, 1]);
			this.setValue(current_rule.set.growth.intensity);
			this.onchange = (value) => current_rule.set.growth.intensity = value;
		}
	}

	class HyperGrowthSwitch extends BooleanSwitch {
		constructor() {
			super("Use hyper growth drugs", [0, 1]);
			this.setValue(current_rule.set.hyper_drugs);
			this.onchange = (value) => current_rule.set.hyper_drugs = value;
		}
	}

	class GrowthList extends OptionsWithLabel {
		constructor() {
			super("Growth hormone regimes for healthy slaves");
			this.sublists = [];
			const pairs = [
				[capFirstChar(noDefaultSetting.text), () => this.nds()],
				["Girlish figure", () => this.girlish()],
				["Stacked figure", () => this.stacked()],
				["Huge but functional", () => this.huge()],
				["Unlimited", () => this.unlimited()],
				["None", () => this.none()]
			];
			pairs.forEach(pair => this.appendChild(new OptionsItem(...pair)));

			this.breasts = new BreastGrowthList();
			this.butts = new ButtGrowthList();
			this.lips = new LipGrowthList();
			this.sublists.push(this.breasts, this.butts, this.lips);

			if (V.seeDicks > 0 || V.makeDicks > 0) {
				this.dicks = new DickGrowthList();
				this.balls = new BallGrowthList();
				this.sublists.push(this.dicks, this.balls);
			}
		}

		_appendContentTo(container) {
			super._appendContentTo(container);
			this.sublists.forEach(i => i._appendContentTo(container));
		}

		nds() {
			[this.breasts, this.butts, this.lips, this.dicks, this.balls].forEach(i => {
				i.setValue(null);
				i.propagateChange();
			});
		}

		girlish() {
			this.breasts.setValue(App.RA.makeTarget('<=', 350));
			this.butts.setValue(App.RA.makeTarget('<=', 2));
			this.lips.setValue(App.RA.makeTarget('<=', 25));
			if (this.dicks) { this.dicks.setValue(App.RA.makeTarget('==', 0)); }
			if (this.balls) { this.balls.setValue(App.RA.makeTarget('==', 0)); }
			this.sublists.forEach(i => i.propagateChange());
		}

		stacked() {
			this.breasts.setValue(App.RA.makeTarget('>=', 1000));
			this.butts.setValue(App.RA.makeTarget('>=', 5));
			this.lips.setValue(App.RA.makeTarget('>=', 25));
			if (this.dicks) { this.dicks.setValue(App.RA.makeTarget('>=', 4)); }
			if (this.balls) { this.balls.setValue(App.RA.makeTarget('>=', 4)); }
			this.sublists.forEach(i => i.propagateChange());
		}

		huge() {
			this.breasts.setValue(App.RA.makeTarget('>=', 9000));
			this.butts.setValue(App.RA.makeTarget('>=', 10));
			this.lips.setValue(App.RA.makeTarget('>=', 45));
			if (this.dicks) { this.dicks.setValue(App.RA.makeTarget('>=', 6)); }
			if (this.balls) { this.balls.setValue(App.RA.makeTarget('>=', 6)); }
			this.sublists.forEach(i => i.propagateChange());
		}

		unlimited() {
			this.breasts.setValue(App.RA.makeTarget('>=', 48000));
			this.butts.setValue(App.RA.makeTarget('>=', 20));
			this.lips.setValue(App.RA.makeTarget('>=', 100));
			if (this.dicks) { this.dicks.setValue(App.RA.makeTarget('>=', 30)); }
			if (this.balls) { this.balls.setValue(App.RA.makeTarget('>=', 125)); }
			this.sublists.forEach(i => i.propagateChange());
		}

		none() {
			this.sublists.forEach(i => {
				i.setValue(App.RA.makeTarget('==', 0));
				i.propagateChange();
			});
		}
	}

	class BreastGrowthList extends NumericTargetEditor {
		constructor() {
			const pairs = [
				["B-Cup", 350],
				["D-Cup", 1000],
				["monstrous", 9000],
				["unlimited", 48000],
				["none", 0]
			];
			super("Breasts", pairs, true, 0, 48000, true);
			this.setValue(current_rule.set.growth.boobs);
			this.onchange = (value) => current_rule.set.growth.boobs = value;
		}
	}

	class ButtGrowthList extends NumericTargetEditor {
		constructor() {
			const pairs = [
				["cute", 2],
				["big", 4],
				["huge", 6],
				["unlimited", 20],
				["none", 0]
			];
			super("Butts", pairs, true, 0, 20, true);
			this.setValue(current_rule.set.growth.butt);
			this.onchange = (value) => current_rule.set.growth.butt = value;
		}
	}

	class LipGrowthList extends NumericTargetEditor {
		constructor() {
			const pairs = [
				["plump", 25],
				["beestung", 45],
				["facepussy", 100],
				["none", 0]
			];
			super("Lips", pairs, true, 0, 100, true);
			this.setValue(current_rule.set.growth.lips);
			this.onchange = (value) => current_rule.set.growth.lips = value;
		}
	}

	class DickGrowthList extends NumericTargetEditor {
		constructor() {
			const pairs = [
				["above average", 4],
				["pornstar", 6],
				["unlimited", 30],
				["none", 0]
			];
			super("Dicks, if present", pairs, true, 0, 30, true);
			this.setValue(current_rule.set.growth.dick);
			this.onchange = (value) => current_rule.set.growth.dick = value;
		}
	}

	class BallGrowthList extends NumericTargetEditor {
		constructor() {
			const pairs = [
				["sizable", 4],
				["cumslave", 6],
				["unlimited", 125],
				["none", 0]
			];
			super("Balls, if present", pairs, true, 0, 125, true);
			this.setValue(current_rule.set.growth.balls);
			this.onchange = (value) => current_rule.set.growth.balls = value;
		}
	}

	class CurrativesList extends ListSelector {
		constructor() {
			const pairs = [
				["none", 0],
				["preventatives", 1],
				["curatives", 2],
			];
			super("Health drugs", pairs, true, false, true);
			this.setValue(current_rule.set.curatives);
			this.onchange = (value) => current_rule.set.curatives = value;
		}
	}

	class AphrodisiacList extends ListSelector {
		constructor() {
			const pairs = [
				["none", 0],
				["standard", 1],
				["extreme", 2],
				["anaphrodisiacs", -1]
			];
			super("Aphrodisiacs", pairs);
			this.setValue(current_rule.set.aphrodisiacs);
			this.onchange = (value) => current_rule.set.aphrodisiacs = value;
		}
	}

	class ContraceptiveList extends RadioSelector {
		constructor() {
			const drugs = [
				["yes", true],
				["no", false],
			];
			super("Contraceptives for fertile slaves", drugs, true);
			this.setValue(current_rule.set.preg);
			this.onchange = (value) => current_rule.set.preg = value;
		}
	}

	class AbortionList extends MultiListSelector {
		constructor() {
			const pairs = [
				["none"],
				["all", "all"],
			];
			if (V.pregnancyMonitoringUpgrade === 1 && V.geneticMappingUpgrade >= 1) {
				pairs.push(["boys", "male"]);
				pairs.push(["girls", "female"]);
				for (let i = 0; i < App.Data.misc.filterRaces.length; ++i) {
					pairs.push([App.Data.misc.filterRaces[i], "race:" + App.Data.misc.filterRacesLowercase[i]]);
				}
			}
			super("Pregnancy termination", pairs);
			this.setValue(current_rule.set.abortion);
			this.onchange = (value) => current_rule.set.abortion = value;
		}
	}

	class PregDrugsList extends ListSelector {
		constructor() {
			const pairs = [
				["none"],
				["fast gestation", "fast"],
				["slow gestation", "slow"],
				["birth suppressors", "suppress"],
				["birth stimulators", "stimulate"]
			];
			super("Pregnancy control agents for pregnant slaves", pairs);
			this.setValue(current_rule.set.pregSpeed);
			this.onchange = (value) => current_rule.set.pregSpeed = value;
		}
	}

	class FemaleHormonesList extends ListSelector {
		constructor() {
			const pairs = [
				["Intensive Female", 2],
				["Female", 1],
				["None", 0],
				["Male", -1],
				["Intensive Male", -2]
			];
			super("Hormones for female slaves", pairs);
			this.setValue(current_rule.set.XX);
			this.onchange = (value) => current_rule.set.XX = value;
		}
	}

	class GeldingHormonesList extends ListSelector {
		constructor() {
			const pairs = [
				["Intensive Female", 2],
				["Female", 1],
				["None", 0],
				["Male", -1],
				["Intensive Male", -2]
			];
			super("Hormones for geldings", pairs);
			this.setValue(current_rule.set.gelding);
			this.onchange = (value) => current_rule.set.gelding = value;
		}
	}

	class ShemaleHormonesList extends ListSelector {
		constructor() {
			const pairs = [
				["Intensive Female", 2],
				["Female", 1],
				["None", 0],
				["Male", -1],
				["Intensive Male", -2]
			];
			super("Hormones for shemales", pairs);
			this.setValue(current_rule.set.XY);
			this.onchange = (value) => current_rule.set.XY = value;
		}
	}

	class OtherDrugsList extends ListSelector {
		constructor() {
			const drugs = [["no drugs"]];

			// Lips
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["lip atrophiers"]);
			}
			drugs.push(["lip injections"]);

			// Breasts
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["breast redistributors"]);
			}
			drugs.push(["breast injections"]);
			drugs.push(["intensive breast injections"]);
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				drugs.push(["hyper breast injections"]);
			}
			if (V.purchasedSagBGone === 1) {
				drugs.push(["Sag-B-gone (Product)", "sag-B-gone"]);
			}
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["nipple atrophiers"]);
			}

			// Womb
			drugs.push(["fertility drugs"]);
			if (V.seeHyperPreg === 1 && V.superFertilityDrugs === 1) {
				drugs.push(["Super fertility drugs", "super fertility drugs"]);
			}
			if (V.precociousPuberty === 1 && V.pubertyHormones) {
				drugs.push(["Female hormone injections (Research)", "female hormone injections"]);
			}

			// Vagina
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["labia atrophiers"]);
				drugs.push(["clitoris atrophiers"]);
			}

			// Dicks
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["penis atrophiers"]);
			}
			drugs.push(["penis enhancement"]);
			drugs.push(["intensive penis enhancement"]);
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				drugs.push(["hyper penis enhancement"]);
			}
			drugs.push(["Erectile dysfunction circumvention", "priapism agents"]);

			// Balls
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["testicle atrophiers"]);
			}
			drugs.push(["testicle enhancement"]);
			drugs.push(["intensive testicle enhancement"]);
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				drugs.push(["hyper testicle enhancement"]);
			}
			if (V.precociousPuberty === 1 && V.pubertyHormones) {
				drugs.push(["Male hormone injections (Research)", "male hormone injections"]);
			}

			// Butt
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["butt redistributors"]);
			}
			drugs.push(["butt injections"]);
			drugs.push(["intensive butt injections"]);
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				drugs.push(["hyper butt injections"]);
			}

			// Body
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				drugs.push(["Weight loss pills (FS)", "appetite suppressors"]);
			}
			drugs.push(["steroids"]);
			if (V.growthStim === 1) {
				drugs.push(["Growth Stimulants (Research)", "growth stimulants"]);
			}

			// Mind
			drugs.push(["psychosuppressants"]);
			if (V.arcologies[0].FSSlaveProfessionalismResearch === 1) {
				drugs.push(["Mental stimulants (FS)", "psychostimulants"]);
			}

			// Hormones
			drugs.push(["hormone blockers"]);
			drugs.push(["Natural hormone enhancers", "hormone enhancers"]);

			// Age
			if (V.arcologies[0].FSYouthPreferentialistResearch === 1) {
				drugs.push(["Anti-aging cream (FS)", "anti-aging cream"]);
			}
			super("Other drugs", drugs);
			this.setValue(current_rule.set.drug);
			this.onchange = (value) => current_rule.set.drug = value;
		}
	}

	class EnemaList extends ListSelector {
		constructor() {
			const enemas = [
				["none"],
				["water"]
			];
			if (V.medicalEnema === 1) {
				enemas.push(
					["aphrodisiac"],
					["curative"],
					["tightener"]
				);
			}
			if (V.wcPiping === 1) {
				enemas.push(["urine"]);
			}
			super("Enemas", enemas);
			this.setValue(current_rule.set.inflationType);
			this.onchange = (value) => current_rule.set.inflationType = value;
		}
	}

	class WeightEditor extends NumericRangeEditor {
		constructor() {
			const hdp = V.arcologies[0].FSHedonisticDecadence !== "unset";
			const pairs = [
				["emaciated", App.RA.makeRange(-100, -96)],
				["very thin", App.RA.makeRange(-95, -31)],
				["pleasingly thin", App.RA.makeRange(-30, -11)],
				["healthy", App.RA.makeRange(-10, 10)],
				["nicely plush", App.RA.makeRange(11, 30)],
				[hdp ? "quite curvy" : "chubby", App.RA.makeRange(31, 95)],
				[hdp ? "extremely curvy": "overweight", App.RA.makeRange(96, 130)],
				[hdp ? "amazingly curvy": "very overweight", App.RA.makeRange(131, 160)],
				[hdp ? "spectacularly curvy": "extremely overweight", App.RA.makeRange(161, 190)],
				[hdp ? "perfectly curvy" : "dangerously overweight", App.RA.makeRange(191, 200)]
			];
			super("Weight", pairs, true, -100, 200);
			this.setValue(current_rule.set.weight);
			this.onchange = (value) => current_rule.set.weight = value;
		}
	}

	class DietList extends ListSelector {
		constructor() {
			const diets = [
				["Healthy diet", "healthy"],
				["fix fat and skinny slaves", "attractive"],
			];
			if (V.feeder === 1) {
				diets.push(
					["feminine", "XX"],
					["masculine", "XY"]
				);
				if (V.dietXXY === 1) {
					diets.push(["futanari", "XXY"]);
				}
			}
			if (V.dietCleanse === 1) {
				diets.push(["cleansing"]);
			}
			if (V.dietFertility === 1) {
				diets.push(["fertility"]);
			}
			if (V.cumProDiet === 1) {
				diets.push(["cum production"]);
			}

			super("Special diets", diets);
			this.setValue(current_rule.set.diet);
			this.onchange = (value) => current_rule.set.diet = value;
		}
	}

	class DietGrowthList extends BooleanSwitch {
		constructor() {
			super("Diet support for growth drugs", [0, 1]);
			this.setValue(current_rule.set.dietGrowthSupport);
			this.onchange = (value) => current_rule.set.dietGrowthSupport = value;
		}
	}

	const dietAddedText = function(value) {
		switch(value) {
			case 0:
				return "None";
			case 1:
				return "Added";
			case 2:
				return "Based";
			default:
				return value;
		}
	};
	class DietBaseList extends List {
		constructor() {
			// TODO: better data structure?
			const pairs = [
				[capFirstChar(noDefaultSetting.text), {cum: null, milk: null}],
				["Normal Diet", {cum: 0, milk: 0}],
				["Cum Added", {cum: 1, milk: 0}],
				["Milk Added", {cum: 0, milk: 1}],
				["Cum &amp; Milk Added", {cum: 1, milk: 1}],
				["Cum-Based", {cum: 2, milk: 0}],
				["Milk-Based", {cum: 0, milk: 2}],
			];
			super("Diet base", pairs, false);
			this.setValue({cum: current_rule.set.dietCum, milk: current_rule.set.dietMilk});
			this.onchange = (value) => {
				current_rule.set.dietCum = value.cum;
				current_rule.set.dietMilk = value.milk;
				this.setValue(value);
			};
		}
		setTextValue(what) {
			if(what.cum == null && what.milk == null) {
				super.setTextValue(capFirstChar(noDefaultSetting.text));
			} else {
				super.setTextValue(`Cum: ${dietAddedText(what.cum)}, Milk: ${dietAddedText(what.milk)}`);
			}
		}
	}

	class DietSolidFoodList extends RadioSelector {
		constructor() {
			const pairs = [
				["permitted", 0],
				["forbidden", 1],
			];
			super("Solid food access", pairs, true);
			this.setValue(current_rule.set.onDiet);
			this.onchange = (value) => current_rule.set.onDiet = value;
		}
	}

	class MuscleList extends NumericTargetEditor {
		constructor() {
			const pairs = [
				["none", 0],
				["toned", 20],
				["ripped", 50],
				["massive", 100],
				["weak", -20]
			];
			super("Muscles", pairs, true, -20, 100, true);
			this.setValue(current_rule.set.muscles);
			this.onchange = (value) => current_rule.set.muscles = value;
		}
	}

	class BraceList extends ListSelector {
		constructor() {
			const pairs = [
				["none"],
				["straighten"],
				["universal"]
			];
			super("Braces", pairs);
			this.setValue(current_rule.set.teeth);
			this.onchange = (value) => current_rule.set.teeth = value;
		}
	}

	class LivingStandardList extends ListSelector {
		constructor() {
			const pairs = [
				["luxurious"],
				["normal"],
				["spare"]
			];
			super("Living standard", pairs);
			this.setValue(current_rule.set.livingRules);
			this.onchange = (value) => current_rule.set.livingRules = value;
		}
	}

	class PunishmentList extends ListSelector {
		constructor() {
			const pairs = [
				["confinement"],
				["whipping"],
				["chastity"],
				["situational"]
			];
			super("Typical punishment", pairs);
			this.setValue(current_rule.set.standardPunishment);
			this.onchange = (value) => current_rule.set.standardPunishment = value;
		}
	}

	class RewardList extends ListSelector {
		constructor() {
			const pairs = [
				["relaxation"],
				["drugs"],
				["orgasm"],
				["situational"]
			];
			super("Typical reward", pairs);
			this.setValue(current_rule.set.standardReward);
			this.onchange = (value) => current_rule.set.standardReward = value;
		}
	}

	class ReleaseMasturbationSwitch extends RadioSelector {
		constructor() {
			const pairs = [
				["Allowed", 1],
				["Forbidden", 0],
			];
			super("Masturbation", pairs);
			this.setValue(current_rule.set.releaseRules.masturbation);
			this.onchange = (value) => current_rule.set.releaseRules.masturbation = value;
		}
	}

	class ReleasePartnerSwitch extends RadioSelector {
		constructor() {
			const pairs = [
				["Allowed", 1],
				["Forbidden", 0],
			];
			super("Sex with partner", pairs);
			this.setValue(current_rule.set.releaseRules.partner);
			this.onchange = (value) => current_rule.set.releaseRules.partner = value;
		}
	}

	class ReleaseFamilySwitch extends RadioSelector {
		constructor() {
			const pairs = [
				["Allowed", 1],
				["Forbidden", 0],
			];
			super("Sex with family", pairs);
			this.setValue(current_rule.set.releaseRules.family);
			this.onchange = (value) => current_rule.set.releaseRules.family = value;
		}
	}

	class ReleaseSlavesSwitch extends RadioSelector {
		constructor() {
			const pairs = [
				["Allowed", 1],
				["Forbidden", 0],
			];
			super("Sex with other slaves", pairs);
			this.setValue(current_rule.set.releaseRules.slaves);
			this.onchange = (value) => current_rule.set.releaseRules.slaves = value;
		}
	}

	class ReleaseMasterSwitch extends RadioSelector {
		constructor() {
			const pairs = [
				["Granted", 1],
				["Denied", 0],
			];
			super(`Routine sex with ${properMaster()}`, pairs);
			this.setValue(current_rule.set.releaseRules.master);
			this.onchange = (value) => current_rule.set.releaseRules.master = value;
		}
	}

	class ToyHoleList extends ListSelector {
		constructor() {
			const pairs = [
				["all her holes"],
				["mouth"],
				["boobs"],
				["pussy"],
				["ass"],
				["dick"]
			];
			super("Fucktoy use preference", pairs);
			this.setValue(current_rule.set.toyHole);
			this.onchange = (value) => current_rule.set.toyHole = value;
		}
	}

	class SmartFetishList extends ListSelector {
		constructor() {
			const pairs = [
				["vanilla"],
				["oral"],
				["anal"],
				["boobs"],
				["Sub", "submissive"],
				["dom"],
				["humiliation"],
				["Preg", "pregnancy"],
				["Pain", "masochist"],
				["Sadism", "sadist"]
			];
			super("Smart piercing fetish target", pairs);
			this.setValue(current_rule.set.clitSetting);
			this.onchange = (value) => current_rule.set.clitSetting = value;
		}
	}

	class SmartXYAttractionList extends ListSelector {
		constructor() {
			const pairs = [
				["passionate", 100],
				["attracted", 75],
				["indifferent", 45],
				["none", 0]
			];
			super("Smart piercing XY attraction target", pairs);
			this.setValue(current_rule.set.clitSettingXY);
			this.onchange = (value) => current_rule.set.clitSettingXY = value;
		}
	}

	class SmartXXAttractionList extends ListSelector {
		constructor() {
			const pairs = [
				["passionate", 100],
				["attracted", 75],
				["indifferent", 45],
				["none", 0]
			];
			super("Smart piercing XX attraction target", pairs);
			this.setValue(current_rule.set.clitSettingXX);
			this.onchange = (value) => current_rule.set.clitSettingXX = value;
		}
	}

	class SmartEnergyList extends ListSelector {
		constructor() {
			const pairs = [
				["nympho", 95],
				["sex addict", 85],
				["powerful", 65],
				["healthy", 45],
				["weak", 25],
				["frigid", 0]
			];
			super("Smart piercing sex drive target", pairs);
			this.setValue(current_rule.set.clitSettingEnergy);
			this.onchange = (value) => current_rule.set.clitSettingEnergy = value;
		}
	}

	class SpeechList extends RadioSelector {
		constructor() {
			const pairs = [
				["permissive"],
				["suppress accents", "accent elimination"],
				["restrictive"]
			];
			super("Speech rules", pairs, true);
			this.setValue(current_rule.set.speechRules);
			this.onchange = (value) => current_rule.set.speechRules = value;
		}
	}

	class RelationshipList extends RadioSelector {
		constructor() {
			const pairs = [
				["permissive"],
				["just friends"],
				["restrictive"]
			];
			super("Relationship rules", pairs, true);
			this.setValue(current_rule.set.relationshipRules);
			this.onchange = (value) => current_rule.set.relationshipRules = value;
		}
	}

	class PornBroadcastStatus extends RadioSelector {
		constructor() {
			const pairs = [
				["disabled", 0],
				["enabled", 1]
			];
			super("Porn Broadcasting Status", pairs, true);
			this.setValue(current_rule.set.pornFeed);
			this.onchange = (value) => current_rule.set.pornFeed = value;
		}
	}

	class PornList extends ListSelector {
		constructor() {
			const pairs = [
				/* ["No broadcasting", -1], **This has changed, it would now use pornFeed** */
				["no subsidy", 0],
				["1000", 1000],
				["2000", 2000],
				["3000", 3000],
				["4000", 4000],
				["5000", 5000]
			];
			super("Weekly porn publicity subsidy", pairs);
			this.setValue(current_rule.set.pornFameSpending);
			this.onchange = (value) => current_rule.set.pornFameSpending = value;
		}
	}

	class EyewearList extends ListSelector {
		constructor() {
			const pairs = [
				["none"],
				["correct with glasses"],
				["correct with contacts"],
				["universal glasses"],
				["blur with glasses"],
				["blur with contacts"]
			];
			super("Eyewear", pairs);
			this.setValue(current_rule.set.eyewear);
			this.onchange = (value) => current_rule.set.eyewear = value;
		}
	}

	class LensesList extends List {
		constructor() {
			super("Eye coloring");
			this.colorlist = new LensesColorList(this);
			this.shapelist = new LensesShapeList(this);
			this.colorlist.onchange = () => this.setValue(undefined);
			this.shapelist.onchange = () => this.setValue(undefined);
			this.setValue(current_rule.set.eyeColor);
			this.onchange = (value) => current_rule.set.eyeColor = value;
		}

		_appendContentTo(container) {
			super._appendContentTo(container);
			this.colorlist._appendContentTo(container);
			this.shapelist._appendContentTo(container);
		}

		combine() {
			const lst = [];
			if (this.colorlist.getData() !== null) { lst.push(this.colorlist.getData()); }
			if (this.shapelist.getData() !== null) { lst.push(this.shapelist.getData()); }
			return (lst.length === 0) ? null : lst.join(" ");
		}

		setValue(val) {
			if (val === undefined) {
				val = this.combine();
			} else {
				if (val === noDefaultSetting.value || val === null) {
					this.colorlist.setValue(val);
					this.shapelist.setValue(val);
				} else {
					let list = val.split(' ');
					if(list.length === 2) {
						this.colorlist.setValue(list[0]);
						this.shapelist.setValue(list[1]);
					} else if(list.length === 1) {
						this.colorlist.trySetValue(list[0]);
						this.shapelist.trySetValue(list[0]);
					}
				}
			}
			super.setValue(val);
			current_rule.set.eyeColor = val;
		}
	}

	class LensesColorList extends List {
		constructor(parent) {
			const items =
				[
					"blue",
					"black",
					"brown",
					"green",
					"turquoise",
					"sky-blue",
					"hazel",
					"pale-grey",
					"white",
					"pink",
					"yellow",
					"orange",
					"amber",
					"red"
				];
			super("Color", items);
			this.labelElement_.className = "ra-sub-label";
			this.parent = parent;
		}

		createValueElement() {
			return null;
		}
	}

	class LensesShapeList extends List {
		constructor(parent) {
			const items =
				[
					"catlike",
					"serpent-like",
					"goat-like",
					"devilish",
					"demonic",
					"hypnotic",
					"heart-shaped",
					"star-shaped",
					"wide-eyed",
					"almond-shaped",
					"bright",
					"teary",
					"vacant"
				];
			super("Shape", items);
			this.labelElement_.className = "ra-sub-label";
			this.parent = parent;
		}

		createValueElement() {
			return null;
		}
	}

	class EarwearList extends ListSelector {
		constructor() {
			const pairs = [
				["none"],
				["correct with hearing aids"],
				["muffle with ear plugs"],
				["deafen with ear plugs"]
			];
			super("Earwear", pairs, true);
			this.setValue(current_rule.set.earwear);
			this.onchange = (value) => current_rule.set.earwear = value;
		}
	}

	class MakeupList extends ListSelector {
		constructor() {
			const pairs = [
				["makeup-free", 0],
				["nice", 1],
				["gorgeous", 2],
				["color-coordinate with hair", 3],
				["slutty", 4]
			];
			super("Makeup", pairs);
			this.setValue(current_rule.set.makeup);
			this.onchange = (value) => current_rule.set.makeup = value;
		}
	}

	class NailsList extends ListSelector {
		constructor() {
			const pairs = [
				["clipped", 0],
				["extended", 1],
				["color-coordinate with hair", 2],
				["sharp and claw-like", 3],
				["bright and glittery", 4],
				["hooker nails", 5],
				["neon colored", 6],
				["neon color-coordinate with hair", 7],
				["metallic painted", 8],
				["metallic color-coordinate with hair", 9]
			];
			super("Nails", pairs);
			this.setValue(current_rule.set.nails);
			this.onchange = (value) => current_rule.set.nails = value;
		}
	}

	class HairLengthList extends ListSelector {
		constructor() {
			const pairs = [
				["very short", 5],
				["short", 10],
				["shoulder length", 30],
				["long", 60],
				["very long", 100],
				["floor length", 150]
			];
			super("Hair length", pairs, true, false, true);
			this.setValue(current_rule.set.hLength);
			this.onchange = (value) => current_rule.set.hLength = value;
		}
	}

	class HaircutsList extends ListSelector {
		constructor() {
			const pairs = [
				["maintain hair length", 1],
				["do not maintain hair length", 0]
			];
			super("Hair length maintenance", pairs, true, false, true);
			this.setValue(current_rule.set.haircuts);
			this.onchange = (value) => current_rule.set.haircuts = value;
		}
	}

	class HairColorList extends ListSelector {
		constructor() {
			const pairs = [
				["blonde"],
				["golden"],
				["platinum blonde"],
				["strawberry-blonde"],
				["copper"],
				["ginger"],
				["red"],
				["deep red"],
				["green"],
				["blue"],
				["pink"],
				["dark brown"],
				["brown"],
				["auburn"],
				["burgundy"],
				["chocolate"],
				["chestnut"],
				["hazel"],
				["jet black"],
				["black"],
				["grey"],
				["silver"],
				["white"],
				["blue-violet"],
				["purple"],
				["dark orchid"],
				["sea green"],
				["green-yellow"],
				["dark blue"],
				["blazing red"],
				["neon green"],
				["neon blue"],
				["neon pink"]
			];
			super("Hair color", pairs);
			this.setValue(current_rule.set.hColor);
			this.onchange = (value) => current_rule.set.hColor = value;
		}
	}

	class HornColorList extends ListSelector {
		constructor() {
			const pairs = [
				["golden"],
				["copper"],
				["red"],
				["deep red"],
				["green"],
				["pink"],
				["dark brown"],
				["brown"],
				["burgundy"],
				["jet black"],
				["black"],
				["grey"],
				["silver"],
				["white"],
				["blue-violet"],
				["purple"],
				["dark orchid"],
				["sea green"],
				["green-yellow"],
				["dark blue"],
				["blazing red"],
				["neon green"],
				["neon blue"],
				["neon pink"]
			];
			super("Horn color", pairs);
			this.setValue(current_rule.set.hornColor);
			this.onchange = (value) => current_rule.set.hornColor = value;
		}
	}

	class HairStyleList extends ListSelector {
		constructor() {
			const pairs = [
				["neat"],
				["shaved"],
				["trimmed"],
				["buzzcut"],
				["up"],
				["ponytail"],
				["bun"],
				["messy bun"],
				["messy"],
				["curled"],
				["permed"],
				["luxurious"],
				["dreadlocks"],
				["cornrows"],
				["braided"],
				["tails"],
				["eary"],
				["afro"],
				["strip"]
			];
			super("Hair style", pairs);
			this.setValue(current_rule.set.hStyle);
			this.onchange = (value) => current_rule.set.hStyle = value;
		}
	}

	class EyebrowColorList extends ListSelector {
		constructor() {
			const pairs = [
				["blonde"],
				["golden"],
				["platinum blonde"],
				["strawberry-blonde"],
				["copper"],
				["ginger"],
				["red"],
				["deep red"],
				["green"],
				["blue"],
				["pink"],
				["dark brown"],
				["brown"],
				["auburn"],
				["burgundy"],
				["chocolate"],
				["chestnut"],
				["hazel"],
				["jet black"],
				["black"],
				["grey"],
				["silver"],
				["white"],
				["blue-violet"],
				["purple"],
				["dark orchid"],
				["sea green"],
				["green-yellow"],
				["dark blue"],
				["blazing red"],
				["neon green"],
				["neon blue"],
				["neon pink"]
			];
			super("Eyebrow hair color, when present", pairs);
			this.setValue(current_rule.set.eyebrowHColor);
			this.onchange = (value) => current_rule.set.eyebrowHColor = value;
		}
	}

	class EyebrowStyleList extends ListSelector {
		constructor() {
			const pairs = [
				["shaved"],
				["straight"],
				["rounded"],
				["natural"],
				["slanted inwards"],
				["slanted outwards"],
				["high-arched"],
				["elongated"],
				["shortened"],
				["curved"]
			];
			super("Eyebrow style", pairs);
			this.setValue(current_rule.set.eyebrowHStyle);
			this.onchange = (value) => current_rule.set.eyebrowHStyle = value;
		}
	}

	class EyebrowFullnessList extends ListSelector {
		constructor() {
			const pairs = [
				["pencil-thin"],
				["thin"],
				["threaded"],
				["natural"],
				["tapered"],
				["thick"],
				["bushy"]
			];
			super("Eyebrow fullness", pairs);
			this.setValue(current_rule.set.eyebrowFullness);
			this.onchange = (value) => current_rule.set.eyebrowFullness = value;
		}
	}

	class MarkingsList extends ListSelector {
		constructor() {
			const pairs = [
				["remove beauty marks"],
				["remove birthmarks"],
				["remove both"]
			];
			super("Facial markings", pairs, true, false, true);
			this.setValue(current_rule.set.markings);
			this.onchange = (value) => current_rule.set.markings = value;
		}
	}

	class PubicHairColorList extends ListSelector {
		constructor() {
			const pairs = [
				["blonde"],
				["golden"],
				["platinum blonde"],
				["strawberry-blonde"],
				["copper"],
				["ginger"],
				["red"],
				["deep red"],
				["green"],
				["blue"],
				["pink"],
				["dark brown"],
				["brown"],
				["auburn"],
				["burgundy"],
				["chocolate"],
				["chestnut"],
				["hazel"],
				["jet black"],
				["black"],
				["grey"],
				["silver"],
				["white"],
				["blue-violet"],
				["purple"],
				["dark orchid"],
				["sea green"],
				["green-yellow"],
				["dark blue"],
				["blazing red"],
				["neon green"],
				["neon blue"],
				["neon pink"]
			];
			super("Pubic hair color, when present", pairs);
			this.setValue(current_rule.set.pubicHColor);
			this.onchange = (value) => current_rule.set.pubicHColor = value;
		}
	}

	class PubicHairStyleList extends ListSelector {
		constructor() {
			const pairs = [
				["waxed"],
				["in a strip"],
				["neat"],
				["bushy"],
				["bushy in the front and neat in the rear"],
				["very bushy"]
			];
			super("Pubic hairstyle", pairs);
			this.setValue(current_rule.set.pubicHStyle);
			this.onchange = (value) => current_rule.set.pubicHStyle = value;
		}
	}

	class ArmpitHairColorList extends ListSelector {
		constructor() {
			const pairs = [
				["blonde"],
				["golden"],
				["platinum blonde"],
				["strawberry-blonde"],
				["copper"],
				["ginger"],
				["red"],
				["deep red"],
				["green"],
				["blue"],
				["pink"],
				["dark brown"],
				["brown"],
				["auburn"],
				["burgundy"],
				["chocolate"],
				["chestnut"],
				["hazel"],
				["jet black"],
				["black"],
				["grey"],
				["silver"],
				["white"],
				["blue-violet"],
				["purple"],
				["dark orchid"],
				["sea green"],
				["green-yellow"],
				["dark blue"],
				["blazing red"],
				["neon green"],
				["neon blue"],
				["neon pink"]
			];
			super("Underarm hair color, when present", pairs);
			this.setValue(current_rule.set.underArmHColor);
			this.onchange = (value) => current_rule.set.underArmHColor = value;
		}
	}

	class ArmpitHairStyleList extends ListSelector {
		constructor() {
			const pairs = [
				["waxed"],
				["shaved"],
				["neat"],
				["bushy"]
			];
			super("Underarm hair style", pairs);
			this.setValue(current_rule.set.underArmHStyle);
			this.onchange = (value) => current_rule.set.underArmHStyle = value;
		}
	}

	function piercingTypes(smartEnabled = false) {
		let res = [
			["none", 0],
			["light", 1],
			["heavy", 2]
		];
		if (smartEnabled) {
			res.push(["Smart (expensive)", 3]);
		}
		return res;
	}

	class EarPiercingList extends ListSelector {
		constructor() {
			super("Ear piercings", piercingTypes());
			this.setValue(current_rule.set.earPiercing);
			this.onchange = (value) => current_rule.set.earPiercing = value;
		}
	}

	class NosePiercingList extends ListSelector {
		constructor() {
			super("Nasal piercings", piercingTypes());
			this.setValue(current_rule.set.nosePiercing);
			this.onchange = (value) => current_rule.set.nosePiercing = value;
		}
	}

	class EyebrowPiercingList extends ListSelector {
		constructor() {
			super("Eyebrow piercings", piercingTypes());
			this.setValue(current_rule.set.eyebrowPiercing);
			this.onchange = (value) => current_rule.set.eyebrowPiercing = value;
		}
	}

	class NavelPiercingList extends ListSelector {
		constructor() {
			super("Navel piercings", piercingTypes());
			this.setValue(current_rule.set.navelPiercing);
			this.onchange = (value) => current_rule.set.navelPiercing = value;
		}
	}

	class NipplePiercingList extends ListSelector {
		constructor() {
			super("Nipple piercings", piercingTypes());
			this.setValue(current_rule.set.nipplesPiercing);
			this.onchange = (value) => current_rule.set.nipplesPiercing = value;
		}
	}

	class AreolaPiercingList extends ListSelector {
		constructor() {
			const pairs = [
				["none", 0],
				["studded", 1]
			];
			super("Areola studs", pairs, true, false, true);
			this.setValue(current_rule.set.areolaePiercing);
			this.onchange = (value) => current_rule.set.areolaePiercing = value;
		}
	}

	class LipPiercingList extends ListSelector {
		constructor() {
			super("Lip piercings", piercingTypes());
			this.setValue(current_rule.set.lipsPiercing);
			this.onchange = (value) => current_rule.set.lipsPiercing = value;
		}
	}

	class TonguePiercingList extends ListSelector {
		constructor() {
			super("Tongue piercing", piercingTypes());
			this.setValue(current_rule.set.tonguePiercing);
			this.onchange = (value) => current_rule.set.tonguePiercing = value;
		}
	}

	class ClitPiercingList extends ListSelector {
		constructor() {
			super("Clit piercing", piercingTypes(true));
			this.setValue(current_rule.set.clitPiercing);
			this.onchange = (value) => current_rule.set.clitPiercing = value;
		}
	}

	class LabiaPiercingList extends ListSelector {
		constructor() {
			super("Pussylips piercings", piercingTypes());
			this.setValue(current_rule.set.vaginaPiercing);
			this.onchange = (value) => current_rule.set.vaginaPiercing = value;
		}
	}

	class ShaftPiercingList extends ListSelector {
		constructor() {
			super("Shaft piercings", piercingTypes());
			this.setValue(current_rule.set.dickPiercing);
			this.onchange = (value) => current_rule.set.dickPiercing = value;
		}
	}

	class PerineumPiercingList extends ListSelector {
		constructor() {
			super("Perianal piercings", piercingTypes());
			this.setValue(current_rule.set.anusPiercing);
			this.onchange = (value) => current_rule.set.anusPiercing = value;
		}
	}

	class CorsetPiercingList extends ListSelector {
		constructor() {
			const pairs = [
				["none", 0],
				["applied", 1]
			];
			super("Corset piercings", pairs, true, false, true);
			this.setValue(current_rule.set.corsetPiercing);
			this.onchange = (value) => current_rule.set.corsetPiercing = value;
		}
	}

	class AutoBrandingList extends BooleanSwitch {
		constructor() {
			super("Automatic branding", [0, 1]);
			this.setValue(current_rule.set.autoBrand);
			this.onchange = (value) => current_rule.set.autoBrand = value;
		}
	}

	class BrandingLocationList extends List {
		constructor() {
			super("Your preferred location for brands is", []);

			// I sorted this next section from top of body down, to make it easier to read for users. Hopefully when making similar lists elsewhere in the game, folks will use the same order. Makes it much easier to compare and make sure nothing is missing. And alphabetical is a poor choice for user facing lists.

			// Head
			this._cheeks = new ListSubSection(this, "Cheeks", [
				["Left", "left cheek"],
				["Right", "right cheek"],
				["Both", "cheeks"]
			]);

			this._ears = new ListSubSection(this, "Ears", [
				["Left", "left ear"],
				["Right", "right ear"],
				["Both", "ears"]

			]);

			// Torso
			this._breasts = new ListSubSection(this, "Breasts", [
				["Left", "left breast"],
				["Right", "right breast"],
				["Both", "breasts"]

			]);

			// Arms
			this._shoulders = new ListSubSection(this, "Shoulders", [
				["Left", "left shoulder"],
				["Right", "right shoulder"],
				["Both", "shoulders"]

			]);

			this._upperArms = new ListSubSection(this, "Arms, upper", [
				["Left", "left upper arm"],
				["Right", "right upper arm"],
				["Both", "upper arms"]

			]);

			this._lowerArms = new ListSubSection(this, "Arms, lower", [
				["Left", "left lower arm"],
				["Right", "right lower arm"],
				["Both", "lower arms"]
			]);

			this._wrist = new ListSubSection(this, "Wrist", [
				["Left", "left wrist"],
				["Right", "right wrist"],
				["Both", "wrists"]
			]);

			this._hand = new ListSubSection(this, "Hand", [
				["Left", "left hand"],
				["Right", "right hand"],
				["Both", "hands"]
			]);

			// Legs
			this._buttocks = new ListSubSection(this, "Buttocks", [
				["Left", "left buttock"],
				["Right", "right buttock"],
				["Both", "buttocks"]
			]);

			this._thigh = new ListSubSection(this, "Thigh", [
				["Left", "left thigh"],
				["Right", "right thigh"],
				["Both", "thighs"]
			]);

			this._calf = new ListSubSection(this, "Calf", [
				["Left", "left calf"],
				["Right", "right calf"],
				["Both", "calves"]
			]);

			this._ankle = new ListSubSection(this, "Ankle", [
				["Left", "left ankle"],
				["Right", "right ankle"],
				["Both", "ankles"]
			]);

			this._feet = new ListSubSection(this, "Feet", [
				["Left", "left foot"],
				["Right", "right foot"],
				["Both", "feet"]
			]);

			// Other
			this._other = new ListSubSection(this, "Other", [
				["Neck", "neck"],
				["Chest", "chest"],
				["Back", "back"],
				["Lower Back", "lower back"],
				["Belly", "belly"],
				["Pubic mound", "pubic mound"]
			]);

			// Ignoring testicles and penis for now, as not all slaves have them.

			this.setValue(current_rule.set.brandTarget);
			this.onchange = (value) => current_rule.set.brandTarget = value;
		}

		_appendContentTo(container) {
			super._appendContentTo(container);
			this._cheeks._appendContentTo(container);
			this._ears._appendContentTo(container);
			this._breasts._appendContentTo(container);
			this._shoulders._appendContentTo(container);
			this._upperArms._appendContentTo(container);
			this._lowerArms._appendContentTo(container);
			this._wrist._appendContentTo(container);
			this._hand._appendContentTo(container);
			this._buttocks._appendContentTo(container);
			this._thigh._appendContentTo(container);
			this._calf._appendContentTo(container);
			this._ankle._appendContentTo(container);
			this._feet._appendContentTo(container);
			this._other._appendContentTo(container);
		}
	}

	class BrandDesignList extends StringEditor {
		constructor() {
			const items = [
				["Your slaving emblem", "your personal symbol"],
				["Your initials", "your initials"],
				["SLUT"],
				["WHORE"],
				["SLAVE"],
				["COW"],
				["MEAT"],
				["CUMDUMP"],
				["LOVER"],
				["Pussy symbol", "a pussy symbol"],
				["Anus symbol", "an anus symbol"],
				["Penis symbol", "a penis symbol"],
				["Lady", "a lady silhouette"],
				["Princess", "a princess silhouette"],
				["Queen", "a queen silhouette"],
				["Angel", "an angel silhouette"],
				["Devil", "a devil silhouette"]
			];

			if (V.arcologies[0].FSSupremacist !== "unset" || V.arcologies[0].FSSubjugationist !== "unset") {
				items.push(["(FS) Racial Slur", "a racial slur"]);
			}

			if (V.arcologies[0].FSSupremacist !== "unset" && V.arcologies[0].FSSupremacistRace === "white") {
				items.push(["(FS) Swastika", "a swastika"]);
			}

			if (V.arcologies[0].FSSubjugationist !== "unset" && V.arcologies[0].FSSubjugationistRace === "semitic") {
				items.push(["(FS) Star of David", "a Star of David"]);
			}

			if (V.arcologies[0].FSGenderRadicalist !== "unset" || V.arcologies.FSGenderFundamentalist !== "unset") {
				items.push(["(FS) Gender Symbol", "a gender symbol"]);
			}

			if (V.arcologies[0].FSPaternalist !== "unset") {
				items.push(["(FS) Personal Symbol", "$his own personal symbol"]);
			}

			if (V.arcologies[0].FSDegradationist !== "unset") {
				items.push(["(FS) Chain Symbol", "a chain symbol"]);
			}

			if (V.arcologies[0].FSIntellectualDependency !== "unset") {
				items.push(["(FS) Scores", "how much sex $he needs per day"]);
			}

			if (V.arcologies[0].FSSlaveProfessionalism !== "unset") {
				items.push(["(FS) Scores", "$his average slave aptitude test scores"]);
			}

			if (V.arcologies[0].FSBodyPurist !== "unset") {
				items.push(["(FS) Vitruvian Man", "a Vitruvian man"]);
			}

			if (V.arcologies[0].FSTransformationFetishist !== "unset") {
				items.push(["(FS) Most Desired Implants", "a shortlist of desired implants"]);
			}

			if (V.arcologies[0].FSYouthPreferentialist !== "unset") {
				items.push(["(FS) Virginity Status", "$his virginity status"]);
			}

			if (V.arcologies[0].FSMaturityPreferentialist !== "unset") {
				items.push(["(FS) Sexual Skill Info", "$his sexual skills"]);
			}

			if (V.arcologies[0].FSPetiteAdmiration !== "unset" || V.arcologies[0].FSStatuesqueGlorification !== "unset") {
				items.push(["(FS) Current height", "$his current height"]);
			}

			if (V.arcologies[0].FSSlimnessEnthusiast !== "unset") {
				items.push(["(FS) Breast Ceiling", "$his absolute maximum breast size"]);
			}

			if (V.arcologies[0].FSAssetExpansionist !== "unset") {
				items.push(["(FS) Breast Floor", "$his absolute minimum breast size"]);
			}

			if (V.arcologies[0].FSPastoralist !== "unset") {
				items.push(["(FS) Product Quality", "$his body product quality"]);
			}

			if (V.arcologies[0].FSPhysicalIdealist !== "unset") {
				items.push(["(FS) Deadlift Info", "$his deadlift record"]);
			}

			if (V.arcologies[0].FSHedonisticDecadence !== "unset") {
				items.push(["(FS) Weight Record", "$his highest weigh-in"]);
			}

			if (V.arcologies[0].FSHedonisticDecadence && V.PC.refreshmentType === 2) {
				items.push(["(FS) Favorite Food", `a big helping of ${V.PC.refreshment}`]);
			}

			if (V.arcologies[0].FSRepopulationFocus !== "unset") {
				items.push(["(FS) Birth Count", "the number of children $he has birthed"]);
			}

			if (V.arcologies[0].FSChattelReligionist !== "unset") {
				items.push(["(FS) Religious Symbol", "a religious symbol"]);
			}

			if (V.arcologies[0].FSRomanRevivalist !== "unset") {
				items.push(["(FS) Republican Crest", "a small crest of your Republic"]);
			}

			if (V.arcologies[0].FSAztecRevivalist !== "unset") {
				items.push(["(FS) Seven Serpents", "a small symbol of the Aztec gods"]);
			}

			if (V.arcologies[0].FSEgyptianRevivalist !== "unset") {
				items.push(["(FS) Dynastic Sigil", "a small sigil of your Dynasty"]);
			}

			if (V.arcologies[0].FSEdoRevivalist !== "unset") {
				items.push(["(FS) Mon", "a small image of the Shogunate's mon"]);
			}

			if (V.arcologies[0].FSArabianRevivalist !== "unset") {
				items.push(["(FS) Caliphate Symbol", "a small symbol of the Caliphate"]);
			}

			if (V.arcologies[0].FSChineseRevivalist !== "unset") {
				items.push(["(FS) Imperial Seal", "a small image of your Imperial Seal"]);
			}

			super("Your brand design is", items, true, true);
			this.setValue(current_rule.set.brandDesign);
			this.onchange = (value) => current_rule.set.brandDesign = value;
		}
	}

	function commonTattoos() {
		return [
			["none", 0],
			["tribal patterns"],
			["flowers"],
			["counting"],
			["advertisements"],
			["rude words"],
			["degradation"],
			["bovine patterns"],
			["Asian art"],
			["permanent makeup"],
			["sacrament"],
			["sacrilege"],
			["possessive"],
			["paternalist"]
		];
	}

	class FaceTattooList extends ListSelector {
		constructor() {
			super("Facial tattoos", commonTattoos());
			this.setValue(current_rule.set.lipsTat);
			this.onchange = (value) => current_rule.set.lipsTat = value;
		}
	}

	class ShoulderTattooList extends ListSelector {
		constructor() {
			super("Shoulder tattoos", commonTattoos());
			this.setValue(current_rule.set.shouldersTat);
			this.onchange = (value) => current_rule.set.shouldersTat = value;
		}
	}

	class ChestTattooList extends ListSelector {
		constructor() {
			super("Chest tattoos", commonTattoos());
			this.setValue(current_rule.set.boobsTat);
			this.onchange = (value) => current_rule.set.boobsTat = value;
		}
	}

	class ArmTattooList extends ListSelector {
		constructor() {
			super("Arm tattoos", commonTattoos());
			this.setValue(current_rule.set.armsTat);
			this.onchange = (value) => current_rule.set.armsTat = value;
		}
	}

	class UpperBackTattooList extends ListSelector {
		constructor() {
			super("Upper back tattoos", commonTattoos());
			this.setValue(current_rule.set.backTat);
			this.onchange = (value) => current_rule.set.backTat = value;
		}
	}

	class LowerBackTattooList extends ListSelector {
		constructor() {
			super("Lower back tattoos", commonTattoos());
			this.setValue(current_rule.set.stampTat);
			this.onchange = (value) => current_rule.set.stampTat = value;
		}
	}

	class AbdomenTattooList extends ListSelector {
		constructor() {
			super("Abdomen tattoos", commonTattoos());
			this.setValue(current_rule.set.vaginaTat);
			this.onchange = (value) => current_rule.set.vaginaTat = value;
		}
	}

	class DickTattooList extends ListSelector {
		constructor() {
			super("Dick tattoos", commonTattoos());
			this.setValue(current_rule.set.dickTat);
			this.onchange = (value) => current_rule.set.dickTat = value;
		}
	}

	class ButtockTattooList extends ListSelector {
		constructor() {
			super("Buttock tattoos:", commonTattoos());
			this.setValue(current_rule.set.buttTat);
			this.onchange = (value) => current_rule.set.buttTat = value;
		}
	}

	class AnalTattooList extends ListSelector {
		constructor() {
			super("Anal tattoo or bleaching", commonTattoos().concat([['bleached']]));
			this.setValue(current_rule.set.anusTat);
			this.onchange = (value) => current_rule.set.anusTat = value;
		}
	}

	class LegTattooList extends ListSelector {
		constructor() {
			super("Leg tattoos", commonTattoos());
			this.setValue(current_rule.set.legsTat);
			this.onchange = (value) => current_rule.set.legsTat = value;
		}
	}

	class BirthsTattooList extends RadioSelector {
		constructor() {
			const items = [
				["remove", "remove"],
				["enabled", 0],
				["disabled", -1],
			];
			super("Tattoo a mark for each successful birth", items, true);
			this.setValue(current_rule.set.birthsTat);
			this.onchange = (value) => current_rule.set.birthsTat = value;
		}
	}

	class AbortionTattooList extends RadioSelector {
		constructor() {
			const items = [
				["remove", "remove"],
				["enabled", 0],
				["disabled", -1],
			];
			super("Tattoo a mark for each abortion", items, true);
			this.setValue(current_rule.set.abortionTat);
			this.onchange = (value) => current_rule.set.abortionTat = value;
		}
	}

	class VisionSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["fixed", 1],
				["blurred", -1],
			];
			super("Vision correction", items, true);
			this.setValue(current_rule.set.surgery.eyes);
			this.onchange = (value) => current_rule.set.surgery.eyes = value;
		}
	}

	class HearingSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["fixed", 0],
				["muffled", -1],
			];
			super("Hearing correction", items, true);
			this.setValue(current_rule.set.surgery.hears);
			this.onchange = (value) => current_rule.set.surgery.hears = value;
		}
	}

	class SmellSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["fixed", 0],
				["disabled", -1],
			];
			super("Olfactory correction", items, true);
			this.setValue(current_rule.set.surgery.smells);
			this.onchange = (value) => current_rule.set.surgery.smells = value;
		}
	}

	class TasteSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["fixed", 0],
				["disabled", -1],
			];
			super("Gustatory correction", items, true);
			this.setValue(current_rule.set.surgery.tastes);
			this.onchange = (value) => current_rule.set.surgery.tastes = value;
		}
	}

	class LactationSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["implanted", 1],
				["removed", 0],
			];
			super("Lactation drug implants", items, true);
			this.setValue(current_rule.set.surgery.lactation);
			this.onchange = (value) => current_rule.set.surgery.lactation = value;
		}
	}

	class SemenSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["implanted", 1],
				["removed", 0],
			];
			super("Prostate production enhancing drug implants", items, true);
			this.setValue(current_rule.set.surgery.prostate);
			this.onchange = (value) => current_rule.set.surgery.prostate = value;
		}
	}

	class VasectomyList extends RadioSelector {
		constructor() {
			const items = [
				["apply vasectomy", true],
				["undo vasectomy", false],
			];
			super("Apply or undo vasectomy for slaves with testicles", items, true);
			this.setValue(current_rule.set.surgery.vasectomy);
			this.onchange = (value) => current_rule.set.surgery.vasectomy = value;
		}
	}

	class CosmeticSurgeryList extends ListSelector {
		constructor() {
			const items = [
				["none", 0],
				["subtle", 1],
				["invasive", 2],
			];
			super("Cosmetic Surgery", items, true);
			this.setValue(current_rule.set.surgery.cosmetic);
			this.onchange = (value) => current_rule.set.surgery.cosmetic = value;
		}
	}

	class LipSurgeryList extends NumericTargetEditor {
		constructor() {
			const items = [
				["removed", 0],
				["plush", 20],
				["big", 40],
				["huge", 70],
				["facepussy", 95],
			];
			super("Lip implants", items, true, 0, 95, true);
			this.setValue(current_rule.set.surgery.lips);
			this.onchange = (value) => current_rule.set.surgery.lips = value;
		}
	}

	class ButtSurgeryList extends NumericTargetEditor {
		constructor() {
			const items = [
				["removed", 0],
				["slim", 2],
				["stacked", 4],
				["huge", 6],
				["maximized", 9],
			];
			super("Buttock implants", items, true, 0, 9, true);
			this.setValue(current_rule.set.surgery.butt);
			this.onchange = (value) => current_rule.set.surgery.butt = value;
		}
	}

	class BreastSurgeryList extends NumericTargetEditor {
		constructor() {
			const items = [
				["removed", 0],
				["slim", 400],
				["stacked", 1000],
				["huge", 2000],
				["barely functional", 9000],
				["maximized", 48000]
			];
			super("Breast implants", items, true, 0, 48000, true);
			this.setValue(current_rule.set.surgery.boobs);
			this.onchange = (value) => current_rule.set.surgery.boobs = value;
		}
	}

	class TighteningSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["tightening", 1],
				["virginity restoration", 2],
			];
			super("Orifice Tightening", items, true);
			this.setValue(current_rule.set.surgery.holes);
			this.onchange = (value) => current_rule.set.surgery.holes = value;
		}
	}

	class TummyTuckSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["tuck", 1],
			];
			super("Tummy Tuck", items, true);
			this.setValue(current_rule.set.surgery.tummy);
			this.onchange = (value) => current_rule.set.surgery.tummy = value;
		}
	}

	class BodyHairSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["keep", 1],
				["removal", 2],
			];
			super("Body Hair", items, true);
			this.setValue(current_rule.set.surgery.bodyhair);
			this.onchange = (value) => current_rule.set.surgery.bodyhair = value;
		}
	}

	class HairSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["keep", 1],
				["removal", 2],
			];
			super("Hair", items, true);
			this.setValue(current_rule.set.surgery.hair);
			this.onchange = (value) => current_rule.set.surgery.hair = value;
		}
	}

	class EarShapeSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["normal ears", 1],
				["small eflin ears", 2],
				["long elfin ears", 3],
				["bovine ears", 4],
			];
			super("Ear Shape", items, true);
			this.setValue(current_rule.set.surgery.earShape);
			this.onchange = (value) => current_rule.set.surgery.earShape = value;
		}
	}

	class HornSurgeryList extends RadioSelector {
		constructor() {
			const items = [
				["none", 1],
				["curved succubus horns", 2],
				["backswept horns", 3],
				["cow horns", 4],
				["one long oni horn", 5],
				["two long oni horns", 6],
				["small horns", 7],
			];
			super("Horn Implants", items, true);
			this.setValue(current_rule.set.surgery.horn);
			this.onchange = (value) => current_rule.set.surgery.horn = value;
		}
	}

	class AutomaticAssignmentList extends ListSelector {
		constructor() {
			const items = [
				["Rest", "rest"],
				["Fucktoy", "please you"],
				["Subordinate Slave", "be a subordinate slave"],
				["House Servant", "be a servant"],
				["Confined", "stay confined"],
				["Whore", "whore"],
				["Public Servant", "serve the public"],
				["Classes", "take classes"],
				["Milked", "get milked"],
				["Gloryhole", "work a glory hole"],
				["Choose Her Own", "choose her own job"]
			];

			if (V.HGSuite > 0) {
				items.push(["Head Girl Suite", "live with your Head Girl"]);
			}
			if (V.brothel > 0) {
				items.push(["Brothel", "work in the brothel"]);
			}
			if (V.club > 0) {
				items.push(["Club", "serve in the club"]);
			}
			if (V.arcade > 0) {
				items.push(["Arcade", "be confined in the arcade"]);
			}
			if (V.dairy > 0) {
				items.push(["Dairy", "work in the dairy"]);
			}
			if (V.farmyard > 0) {
				items.push(["Farmyard", "work as a farmhand"]);
			}
			if (V.servantsQuarters > 0) {
				items.push(["Servant Quarters", "work as a servant"]);
			}
			if (V.masterSuite > 0) {
				items.push(["Master Suite", "serve in the master suite"]);
			}
			if (V.schoolroom > 0) {
				items.push(["Schoolroom", "learn in the schoolroom"]);
			}
			if (V.spa > 0) {
				items.push(["Spa", "rest in the spa"]);
			}
			if (V.clinic > 0) {
				items.push(["Clinic", "get treatment in the clinic"]);
			}
			if (V.cellblock > 0) {
				items.push(["Cellblock", "be confined in the cellblock"]);
			}

			super("Automatically set assignment", items);
			this.setValue(current_rule.set.setAssignment);
			this.onchange = (value) => current_rule.set.setAssignment = value;
		}
	}

	class PitAssignmentList extends ListSelector{
		constructor() {
			const items =[["remove from pit", 0], ["assign to pit", 1]];
			super("Pit assignment", items);
			this.setValue(current_rule.set.pitRules);
			this.onchange = (value) => current_rule.set.pitRules = value;
		}
	}

	class BellyImplantList extends RadioSelector {
		constructor() {
			const items = [
				["install", "install"],
				["remove", "remove"],
			];
			super("Belly implant", items, true);
			this.setValue(current_rule.set.surgery.bellyImplant);
			this.onchange = (value) => current_rule.set.surgery.bellyImplant = value;
		}
	}

	class LabelList extends StringEditor {
		constructor() {
			super("Custom label(s) (separate by '|')", [], true, true);
			this.setValue(current_rule.set.label);
			this.onchange = (value) => current_rule.set.label = value;
		}
	}

	class LabelRemoveList extends StringEditor {
		constructor() {
			super("Remove custom label(s) (separate by '|')", [], true, true);
			this.setValue(current_rule.set.removeLabel);
			this.onchange = (value) => current_rule.set.removeLabel = value;
		}
	}

	class SkinColorList extends ListSelector {
		constructor() {
			const items = [
				["natural"],
				["pure white"],
				["ivory"],
				["white"],
				["extremely pale"],
				["very pale"],
				["pale"],
				["extremely fair"],
				["very fair"],
				["fair"],
				["light"],
				["light olive"],
				["tan"],
				["olive"],
				["bronze"],
				["dark olive"],
				["dark"],
				["light beige"],
				["beige"],
				["dark beige"],
				["light brown"],
				["brown"],
				["dark brown"],
				["black"],
				["ebony"],
				["pure black"],
				["sun tanned"],
				["spray tanned"],
				["dyed red"],
				["dyed green"],
				["dyed blue"],
				["dyed pink"],
				["dyed gray"],
				["tiger striped"],
				["camouflage patterned"],
			];
			super("Dye or tan skin", items);
			this.setValue(current_rule.set.skinColor);
			this.onchange = (x) => current_rule.set.skinColor = x;
		}
	}

	return rulesAssistantOptions;
})();
