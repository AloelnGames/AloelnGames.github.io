/**
 * @callback passageLinkHandler
 * @returns {void}
 */
/**
 * Creates a HTML element with custom SugarCube attributes which works as a passage link
 *
 * The result works in the same way as the wiki markup in the SugarCube
 * @see https://www.motoslave.net/sugarcube/2/docs/#markup-html-attribute
 * @param {string} linkText link text
 * @param {string} passage the passage name to link to
 * @param {passageLinkHandler} [handler] setter text (optional)
 * @param {string} [tooltip=''] tooltip text (optional)
 * @param {string} [elementType='a'] element type (optional) default is 'a'.
 * Could be any of 'a', 'audio', img', 'source', 'video'
 * @returns {HTMLElement} element text
 *
 * @example
 * // equal to [[Go to town|Town]]
 * App.UI.passageLink("Go to town", "Town")
 */
App.UI.DOM.passageLink = function(linkText, passage, handler, tooltip = '', elementType = 'a') {
	let res = document.createElement(elementType);
	res.setAttribute("data-passage", passage);
	res.onclick = (ev) => {
		ev.preventDefault();
		if (handler) {
			handler();
		}
		Engine.play(passage);
	};

	if (tooltip) {
		res.title = tooltip;
	}
	res.textContent = linkText;
	return res;
};

/**
 * Returns link element for an assignment
 * @param {App.Entity.SlaveState} slave
 * @param {string} assignment
 * @param {string} [passage] passage to go to
 * @param {assignmentCallback} [action] action that changes slave state. The default one is a call to assignJob()
 * @param {string} [linkText]
 * @returns {HTMLAnchorElement}
 */
App.UI.DOM.assignmentLink = function(slave, assignment, passage, action, linkText) {
	let res = document.createElement("a");
	res.textContent = linkText;
	res.onclick = (e) => {
		e.preventDefault();
		if (action) {
			action(slave, assignment);
		} else {
			assignJob(slave, assignment);
		}
		if (passage !== '') {
			SugarCube.Engine.play(passage);
		}
	};
	return res;
};

/**
 * Creates a markup for a SugarCube link which executes given function with given arguments
 *
 * @param {string} linkText link text
 * @param {function(...any):void} handler callable object
 * @param {any|Array<any>} args arguments
 * @param {string} [passage] the passage name to link to
 * @param {string} [tooltip]
 * @returns {HTMLAnchorElement} link in SC markup
 */
App.UI.DOM.link = function(linkText, handler, args = [], passage = "", tooltip = "") {
	const hArgs = Array.isArray(args) ? args : [args];
	const link = document.createElement("a");
	link.textContent = linkText;
	link.title = tooltip;
	link.onclick = () => {
		handler(...hArgs);
		if (passage !== '') {
			SugarCube.Engine.play(passage);
		}
	};
	return link;
};

/**
 * Creates a span for an link with tooltip containing the reasons why it is disabled
 * @param {string} link
 * @param {string[]} reasons
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.disabledLink = function(link, reasons) {
	/** @type {HTMLElement} */
	let tooltip;
	if (reasons.length === 1) {
		tooltip = document.createElement("span");
		tooltip.textContent = reasons[0];
	} else {
		tooltip = document.createElement("div");
		let ul = document.createElement("ul");
		tooltip.appendChild(ul);
		for (const li of reasons.map(r => {
			const li = document.createElement("li");
			li.textContent = r;
			return li;
		})) {
			ul.appendChild(li);
		}
	}
	tooltip.className = "tooltip";
	let res = document.createElement("span");
	res.textContent = link;
	res.className = "textWithTooltip";
	res.appendChild(tooltip);
	return res;
};

/**
 * @param {string} tag - valid HTML tag
 * @param {string|Node} content
 * @param {string|Array<string>} [classNames]
 * @returns {HTMLElement}
 */
App.UI.DOM.makeElement = function(tag, content, classNames) {
	const element = document.createElement(tag);
	if (classNames !== undefined) {
		if (Array.isArray(classNames)) {
			element.classList.add(...classNames);
		} else {
			element.classList.add(classNames);
		}
	}
	element.append(content);
	return element;
};

/**
 * @param {string} tag - valid HTML tag
 * @param {string|Node} content
 * @param {ParentNode} parent
 * @param {string|Array<string>} [classNames]
 * @returns {HTMLElement}
 */
App.UI.DOM.appendNewElement = function(tag, content, parent, classNames) {
	const element = App.UI.DOM.makeElement(tag, content, classNames);
	parent.append(element);
	return element;
};

/**
 * @param {string} linkText
 * @param {string|Node} newContent
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.linkReplace = function(linkText, newContent) {
	const span = document.createElement("span");
	span.append(App.UI.DOM.link(linkText, () => {
		span.innerHTML = "";
		span.append(newContent);
	}));
	return span;
};

/**
 * @param {string} selector for jQuery
 * @param {Node} newContent
 */
App.UI.DOM.replace = function(selector, newContent) {
	const target = $(selector);
	target.empty();
	target.append(newContent);
};

/**
 * @param {string} passage
 * @returns {Element}
 */
App.Utils.passageElement = function(passage) {
	return document.querySelector(`tw-passagedata[name="${passage}"]`);
};

/**
 * @param {Node|string} content
 * @returns {DocumentFragment}
 */
App.UI.DOM.combineNodes = function(...content) {
	let fragment = document.createDocumentFragment();
	fragment.append(...content);
	return fragment;
};

/**
 * @param {string|number} defaultValue
 * @param {function(string):void|function(number):void} onEnter - accepts number if numberOnly = true, otherwise string
 * @param {boolean} [numberOnly]
 * @returns {HTMLInputElement}
 */
App.UI.DOM.makeTextBox = function(defaultValue, onEnter, numberOnly = false) {
	const input = document.createElement("input");
	input.type = "text";
	input.value = defaultValue;

	let updateValue;
	if (numberOnly) {
		/*
		We could use input.type = "number", but at least in firefox submitting an invalid value will set input.value
		to 0 and trigger a change event we can't distinguish from setting the value to 0 explicitly.
		The workaround is resetting the value to the last known valid value and not triggering onEnter.
		*/
		updateValue = event => {
			const newValue = Number(event.target.value);
			if (!Number.isNaN(newValue)) {
				onEnter(newValue);
				event.target.oldValue = newValue;
			} else {
				// reset the value to the last known valid value
				event.target.value = event.target.oldValue;
			}
		};
		input.oldValue = defaultValue;
	} else {
		updateValue = e => { onEnter(e.target.value); };
	}
	input.addEventListener('change', updateValue);

	return input;
};

/**
 * @param {string|number} defaultValue
 * @param {function(string):void} onEnter
 * @returns {HTMLInputElement}
 */
App.UI.DOM.colorInput = function(defaultValue, onEnter) {
	const input = document.createElement("input");
	input.type = "color";
	input.value = defaultValue;

	let updateValue = e => { onEnter(e.target.value); };

	input.addEventListener('change', updateValue);

	return input;
};

/**
 * @param {Node} node
 * @param {string} uniqueID - should be unique in the whole passage
 * @param {string} [tag]
 * @returns {string}
 */
App.UI.DOM.includeDOM = function(node, uniqueID, tag = "span") {
	$(document).one(':passagedisplay', () => { $(`#inclDOM${uniqueID}`).append(node); });

	return `<${tag} id='inclDOM${uniqueID}'></${tag}>`;
};

/**
 * Concats an array of DOM nodes or strings into a human readable list.
 *
 * @param {Array<Node|string>} content
 * @param {string} [delimiter]
 * @param {string} [lastDelimiter]
 * @returns {Node|string}
 */
App.UI.DOM.arrayToList = function(content, delimiter = ", ", lastDelimiter = " and ") {
	if (content.length === 0) {
		return "none";
	}
	if (this.length === 1) {
		return content[0];
	}
	const fragment = document.createDocumentFragment();
	const last = content.pop();
	for (let i = 0; i < content.length; i++) {
		fragment.append(content[i]);
		if (i < content.length - 1) {
			fragment.append(delimiter);
		}
	}
	content.push(last); // don't leave the array modified
	fragment.append(lastDelimiter, last);
	return fragment;
};

/**
 * @param {string} text
 * @returns {HTMLElement}
 */
App.Utils.htmlToElement = function(text) {
	const template = document.createElement("template");
	text = text.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = text;
	// @ts-ignore
	return template.content.firstChild;
};

/*
 * Shows tooltips if they are enabled. Must be called on every passage load, because <body> gets reset.
 */
$(document).on(":passagestart", event => {
	if (V.tooltipsEnabled === 1) {
		event.content.classList.add("tooltipsEnabled");
	}
});
