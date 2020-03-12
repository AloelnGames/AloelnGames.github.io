/* Accordion 000-250-006 */
/* no-usedOnce */

/*
 * We're making changes to the DOM, so we need to make them *after* everything has been generated
 * Sticking this all in postdisplay calls reduces the chance of there being a timing conflict
 * with other scripts, since anything poking the DOM here will be done last
 *
 * Dev Note: The accordion mod should be able to turn *anything* into an accordion. This iteration
 * is configured tightly for the end of week report runs, but it shouldn't be that hard to adapt for
 * other uses, like character bios. For now, I'll see what other extra-long passages of cosmetic text
 * might benefit.
 *
 * 000-250-006 03092017
 */

postdisplay.doAccordionSet = function() {
	if (variables().useAccordion === 1) {
		Array.prototype.slice.call(document.querySelectorAll(".macro-include"))
			.forEach(function(element) {
				element.classList.add("accHidden");
			});
	}
};

postdisplay.doAccordion = function() {
	const acc = document.getElementsByClassName("accordion");

	for (let i = 0; i < acc.length; i += 1) {
		acc[i].onclick = function() {
			this.classList.toggle("active");
			let panel = this.nextElementSibling;
			if (panel === null || panel === undefined) {
				panel = document.getElementById(`${this.id}accHidden`);
				if (panel.style.display === "none") {
					panel.style.display = "";
				} else {
					panel.style.display = "none";
				}
			} else {
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = `${2 * panel.scrollHeight}px`;
				}
			}
		};
	}
};
