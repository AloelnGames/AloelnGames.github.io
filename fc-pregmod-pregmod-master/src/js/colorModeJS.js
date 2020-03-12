window.flipColors = function(lightColorMap) {
	if (!window.savedColorMap) {
		window.savedColorMap = setColors(lightColorMap);
	} else {
		restoreColors(window.savedColorMap);
		window.savedColorMap = null;
	}
};

window.setColors = function(colorMap) {
	let originalState = [];
	let props = ["color", "backgroundColor", "backgroundImage"];
	let styleSheetArray = Array.from(document.styleSheets);
	styleSheetArray.forEach(styleSheet => {
		let cssRules = Array.from(styleSheet.cssRules);
		cssRules.forEach(cssRule => {
			if (cssRule.type === 1) {
				props.forEach(propName => {
					let currentValue = cssRule.style[propName];
					if (
						currentValue !== "" &&
						currentValue !== "inherit" &&
						currentValue !== "transparent") {
						let newVal = colorMap[currentValue];
						if (typeof newVal !== "undefined") {
							cssRule.style[propName] = newVal;
							originalState.push({
								element: cssRule,
								propName: propName,
								value: currentValue
							});
						}
					}
				});
			}
		});
	});
	return originalState;
};

window.restoreColors = function(styleMap) {
	styleMap.forEach(
		item => {
			item.element.style[item.propName] = item.value;
		}
	);
};
