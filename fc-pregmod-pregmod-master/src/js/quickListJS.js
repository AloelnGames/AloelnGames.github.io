window.sortDomObjects = function(objects, attrName, reverse = 0) {
	reverse = (reverse) ? -1 : 1;

	function sortingByAttr(a, b) {
		let aVal = a.getAttribute(attrName);
		let bVal = b.getAttribute(attrName);
		let aInt = parseInt(aVal);
		if (!isNaN(aInt)) {
			return ((parseInt(bVal) - aInt) * reverse);
		} else if (bVal > aVal) {
			return -1 * reverse;
		}
		return ((aVal === bVal) ? 0 : 1) * reverse;
	}
	return objects.toArray().sort(sortingByAttr);
};

window.sortButtonsByDevotion = function() {
	let $sortedButtons = $('#qlWrapper button').remove();
	$sortedButtons = sortDomObjects($sortedButtons, 'data-devotion');
	$($sortedButtons).appendTo($('#qlWrapper'));
	quickListBuildLinks();
};

window.sortButtonsByTrust = function() {
	let $sortedButtons = $('#qlWrapper button').remove();
	$sortedButtons = sortDomObjects($sortedButtons, 'data-trust');
	$($sortedButtons).appendTo($('#qlWrapper'));
	quickListBuildLinks();
};

window.quickListBuildLinks = function() {
	$("[data-scroll-to]").click(App.UI.quickBtnScrollToHandler);
};

App.UI.quickBtnScrollToHandler = function() {
	let $this = $(this),
		$toElement = $this.attr('data-scroll-to');
	// note the * 1 enforces $offset to be an integer, without
	// it we scroll to True, which goes nowhere fast.
	let $offset = $this.attr('data-scroll-offset') * 1 || 0;
	let $speed = $this.attr('data-scroll-speed') * 1 || 500;
	// Use javascript scrollTop animation for in page navigation.
	$('html, body').animate({
		scrollTop: $($toElement).offset().top + $offset
	}, $speed);
};

window.sortIncubatorPossiblesByName = function() {
	let $sortedIncubatorPossibles = $('#qlIncubator div.possible').detach();
	$sortedIncubatorPossibles = sortDomObjects($sortedIncubatorPossibles, 'data-name');
	$($sortedIncubatorPossibles).appendTo($('#qlIncubator'));
};

window.sortIncubatorPossiblesByPregnancyWeek = function() {
	let $sortedIncubatorPossibles = $('#qlIncubator div.possible').detach();
	$sortedIncubatorPossibles = sortDomObjects($sortedIncubatorPossibles, 'data-preg-week');
	$($sortedIncubatorPossibles).appendTo($('#qlIncubator'));
};

window.sortIncubatorPossiblesByPregnancyCount = function() {
	let $sortedIncubatorPossibles = $('#qlIncubator div.possible').detach();
	$sortedIncubatorPossibles = sortDomObjects($sortedIncubatorPossibles, 'data-preg-count');
	$($sortedIncubatorPossibles).appendTo($('#qlIncubator'));
};

window.sortIncubatorPossiblesByReservedSpots = function() {
	let $sortedIncubatorPossibles = $('#qlIncubator div.possible').detach();
	$sortedIncubatorPossibles = sortDomObjects($sortedIncubatorPossibles, 'data-reserved-spots');
	$($sortedIncubatorPossibles).appendTo($('#qlIncubator'));
};

window.sortIncubatorPossiblesByPreviousSort = function() {
	let sort = State.variables.sortIncubatorList;
	if (sort !== 'unsorted') {
		if (sort === 'Name') {
			sortIncubatorPossiblesByName();
		} else if (sort === 'Reserved Incubator Spots') {
			sortIncubatorPossiblesByReservedSpots();
		} else if (sort === 'Pregnancy Week') {
			sortIncubatorPossiblesByPregnancyWeek();
		} else if (sort === 'Number of Children') {
			sortIncubatorPossiblesByPregnancyCount();
		}
	}
};

window.sortNurseryPossiblesByName = function() {
	let $sortedNurseryPossibles = $('#qlNursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-name');
	$($sortedNurseryPossibles).appendTo($('#qlNursery'));
};

window.sortNurseryPossiblesByPregnancyWeek = function() {
	let $sortedNurseryPossibles = $('#qlNursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-preg-week');
	$($sortedNurseryPossibles).appendTo($('#qlNursery'));
};

window.sortNurseryPossiblesByPregnancyCount = function() {
	let $sortedNurseryPossibles = $('#qlNursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-preg-count');
	$($sortedNurseryPossibles).appendTo($('#qlNursery'));
};

window.sortNurseryPossiblesByReservedSpots = function() {
	let $sortedNurseryPossibles = $('#qlNursery div.possible').detach();
	$sortedNurseryPossibles = sortDomObjects($sortedNurseryPossibles, 'data-reserved-spots');
	$($sortedNurseryPossibles).appendTo($('#qlNursery'));
};

window.sortNurseryPossiblesByPreviousSort = function() {
	let sort = State.variables.sortNurseryList;
	if (sort !== 'unsorted') {
		if (sort === 'Name') {
			sortNurseryPossiblesByName();
		} else if (sort === 'Reserved Nursery Spots') {
			sortNurseryPossiblesByReservedSpots();
		} else if (sort === 'Pregnancy Week') {
			sortNurseryPossiblesByPregnancyWeek();
		} else if (sort === 'Number of Children') {
			sortNurseryPossiblesByPregnancyCount();
		}
	}
};
