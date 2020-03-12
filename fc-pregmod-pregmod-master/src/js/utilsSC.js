/**
 * circumvents SugarCube, allowing a plain HTML5 UI within it
 *
 * @param {function(HTMLElement): HTMLElement} passageFunction
 */
window.html5passage = function html5passage(passageFunction) {
	$(document).one(":passagedisplay", (ev) => {
		const element = document.createElement("div");
		element.classList.add("passage");
		document.getElementById("passages").appendChild(element);
		passageFunction(element);
		$(document).off(":passagedisplay");
	});
};

/**
 * If you want to include a SugarCube passage in a JS function use this. The result must be printed using the <<print>> macro.
 * @param {string} passageTitle
 * @returns {string}
 */
window.jsInclude = function(passageTitle) {
	if (Story.has(passageTitle)) {
		return Story.get(passageTitle).processText();
	} else {
		return `<span class="red">Error: Passage ${passageTitle} does not exist.</span>`;
	}
};

/**
 * Creates a HTML element with custom SugarCube attributes which works as a passage link
 *
 * The result works in the same way as the wiki markup in the SugarCube
 * @see https://www.motoslave.net/sugarcube/2/docs/#markup-html-attribute
 * @param {string} linkText link text
 * @param {string} passage the passage name to link to
 * @param {string} [setter=''] setter text (optional)
 * @param {string} [tooltip=''] tooltip text (optional)
 * @param {string} [elementType='a'] element type (optional) default is 'a'.
 * Could be any of 'a', 'audio', img', 'source', 'video'
 * @returns {string} element text
 *
 * @example
 * // equal to [[Go to town|Town]]
 * App.UI.passageLink("Go to town", "Town")
 */
App.UI.passageLink = function(linkText, passage, setter = '', tooltip = '', elementType = 'a') {
	let res = `<${elementType} data-passage="${passage}"`;
	if (setter) {
		res += ` data-setter="${App.Utils.escapeHtml(setter)}"`;
	}
	if (tooltip) {
		res += ` title="${tooltip}"`;
	}
	res += `>${linkText}</${elementType}>`;
	return res;
};

App.UI.link = function() {
	let counter = 0;

	// reset all handlers for each passage
	$(document).on(':passageinit', function() {
		State.temporary.linkHandlers = {};
		counter = 0;
	});

	return makeLink;

	/**
	 * Creates a markup for a SugarCube link which executes given function with given arguments
	 *
	 * @param {string} linkText link text
	 * @param {*} handler callable object
	 * @param {*} args arguments
	 * @param {string} [passage] the passage name to link to
	 * @returns {string} link in SC markup
	 */
	function makeLink(linkText, handler, args = [], passage = '', tooltip = '') {
		// pack handler and data
		State.temporary.linkHandlers[counter] = {
			f: handler,
			args: Array.isArray(args) ? args : [args]
		};

		// can't say _linkHandlers here because SC does not recognize its own notation in "..._varName"
		let SCHandlerText =
			`State.temporary.linkHandlers[${counter}].f(...State.temporary.linkHandlers[${counter}].args);`;
		++counter;

		if (passage) {
			return App.UI.passageLink(linkText, passage, SCHandlerText, tooltip);
		} else {
			if (tooltip) {
				throw "Tooltips are not supported by the <<link>> markup.";
			}
			// data-passage scheme does not work with empty passage name
			return `<<link "${linkText}">><<run ${SCHandlerText}>><</link>>`;
		}
	}
}();

/**
 * Replaces contents of the element, identified by the given selector, with wiki'ed new content
 *
 * The function is an analogue to the SugarCube <<replace>> macro (and is a simplified version of it)
 * @param {string} selector
 * @param {string} newContent
 */
App.UI.replace = function(selector, newContent) {
	let ins = jQuery(document.createDocumentFragment());
	ins.wiki(newContent);
	const target = $(selector);
	target.empty();
	target.append(ins);
};

/**
 * A simple macro which allows to create wrapping html elements with dynamic IDs.
 *
 * idea blatantly robbed from the spanMacroJS.tw but expanded to a more generic case, allowing <div>,
 * <button> or whatever you want elements, default is for the div though.
 * In addition, you can pass an object in as the first argument instead of an id, and each of the
 * object's attributes will become attributes of the generate tag.
 *
 * @example
 * htag('test', "red") // <div id="red">test</div>
 * htag('test', {class: red}); // <div class="red">test</div>
 * htag('test', {class: red, id: green}); // <div class="red" id="green">test</div>
 * @param {string} text
 * @param {string|object} attributes
 * @param {string} [tag='div'] (optional)
 * @returns {string}
 */
App.UI.htag = function(text, attributes, tag = 'div') {
	const payload = text.replace(/(^\n+|\n+$)/, "");

	if (typeof attributes === "object") {
		attributes = $.map(attributes, (val, key) => `${key}="${val}"`).join(" ");
	} else {
		attributes = `id="${attributes.trim()}"`;
	}

	return `<${tag} ${attributes}>${payload}</${tag}>`;
};

App.UI.tabbar = function() {
	return {
		openTab: openTab,
		tabButton: tabButton,
		tabButtonDOM: tabButtonDOM,
		makeTab: makeTab,
		makeTabDOM: makeTabDOM,
		handlePreSelectedTab: handlePreSelectedTab,
		tabChoiceVarName: tabChoiceVarName
	};

	function openTab(evt, tabName) {
		/* var passage = passage().trim().replace(/ /g,"+");*/
		const tabcontent = document.getElementsByClassName("tabcontent");
		for (let i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		const tablinks = document.getElementsByClassName("tablinks");
		for (let i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		V.tabChoice[tabChoiceVarName()] = tabName; /* The regex strips spaces and " ' " from passage names, making "Servants' Quarters" into "ServantsQuarters" and allowing it to be used as a label in this object. */
		document.getElementById(tabName).style.display = "block";
		evt.currentTarget.className += " active";
	}

	/**
	 * @param {string} name
	 * @param {string} text
	 * @returns {string}
	 */
	function tabButton(name, text) {
		return `<button class="tablinks" onclick="App.UI.tabbar.openTab(event, '${name}')" id="tab ${name}">${text}</button>`;
	}

	/**
	 * @param {string} name
	 * @param {string} text
	 * @param {boolean} [plainLink]
	 * @returns {HTMLButtonElement|HTMLAnchorElement}
	 */
	function tabButtonDOM(name, text, plainLink = false) {
		if (plainLink) {
			const link = document.createElement("a");
			link.classList.add("tablinks", "pure");
			link.id = `tab ${name}`;
			link.textContent = text;
			link.addEventListener('click', event => {
				openTab(event, name);
			});
			return link;
		} else {
			const button = document.createElement("button");
			button.classList.add("tablinks");
			button.id = `tab ${name}`;
			button.textContent = text;
			button.addEventListener('click', event => {
				openTab(event, name);
			});
			return button;
		}
	}

	/**
	 * @param {string} name
	 * @param {string} content
	 * @returns {string}
	 */
	function makeTab(name, content) {
		return `<div id="${name}" class="tabcontent"><div class="content">${content}</div></div>`;
	}

	/**
	 * @param {string} name
	 * @param {Node} content
	 * @returns {HTMLDivElement}
	 */
	function makeTabDOM(name, content) {
		const outerDiv = document.createElement("div");
		outerDiv.id = name;
		outerDiv.classList.add("tabcontent");
		const innerDiv = document.createElement("div");
		innerDiv.classList.add("content");
		innerDiv.append(content);
		outerDiv.append(innerDiv);
		return outerDiv;
	}

	function handlePreSelectedTab(defaultTab = "assign", immidiate = false) {
		let selectedTab = State.variables.tabChoice[tabChoiceVarName()];
		if (!selectedTab) {
			selectedTab = defaultTab;
		}

		function selectTab() {
			let tabBtn = document.getElementById(`tab ${selectedTab}`);
			if (!tabBtn) {
				tabBtn = document.getElementsByClassName('tablinks').item(0);
			}
			if (tabBtn) {
				tabBtn.click();
			}
		}
		if (immidiate) {
			selectTab();
		} else {
			$(document).one(':passageend', selectTab);
		}
	}

	function tabChoiceVarName() {
		return passage().trim().replace(/ |'/g, '');
	}
}();

/**
 * Creates a span for an link with tooltip containing the reasons why it is disabled
 * @param {string} link
 * @param {string[]} reasons
 * @returns {string}
 */
App.UI.disabledLink = function(link, reasons) {
	const tooltips = reasons.length === 1 ?
		`<span class="tooltip">${reasons}</span>` :
		`<div class="tooltip"><ul>${reasons.map(e => `<li>${e}</li>`).join('')}</ul></div>`;
	return `<span class="textWithTooltip">${link}${tooltips}</span>`;
};

/**
 * Generates a link which shows a slave description dialog for a specified slave.
 * Do not call from within another dialog.
 * @param {App.Entity.SlaveState} slave
 * @returns {string} link (in SC markup)
 */
App.UI.slaveDescriptionDialog = function(slave) {
	function showDialog() {
		const oldEventDescription = V.eventDescription;
		V.eventDescription = 1; // should be easy enough to use this for non-event cases too, but you'll need to fix the art display
		const oldActiveSlave = V.activeSlave;
		V.activeSlave = slave;
		Dialog.setup(SlaveFullName(slave));
		Dialog.wiki('<div class="imageRef medImg"><<= SlaveArt($activeSlave, 2, 0)>></div><<include "Long Slave Description">>');
		Dialog.open();
		V.activeSlave = oldActiveSlave;
		V.eventDescription = oldEventDescription;
	}

	return App.UI.link(SlaveFullName(slave), showDialog, []);
};
