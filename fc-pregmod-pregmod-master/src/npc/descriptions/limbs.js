App.Desc.limbChange = function() {
	return {
		currentLimbs: currentLimbs,
		amputate: amputate,
		prosthetic: prosthetic,
		selector: selector,
		applySelector: applySelector,
		reaction: reaction
	};

	/**
	 * Generates an object usable with the standard limb check functions.
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{}}
	 */
	function currentLimbs(slave) {
		let s = {arm: {left: {type: 1}, right: {type: 1}}, leg: {left: {type: 1}, right: {type: 1}}, PLimb: 0};
		if (hasLeftArm(slave)) {
			s.arm.left.type = getLeftArmID(slave);
		} else {
			s.arm.left = null;
		}
		if (hasRightArm(slave)) {
			s.arm.right.type = getRightArmID(slave);
		} else {
			s.arm.right = null;
		}
		if (hasLeftLeg(slave)) {
			s.leg.left.type = getLeftLegID(slave);
		} else {
			s.leg.left = null;
		}
		if (hasRightLeg(slave)) {
			s.leg.right.type = getRightLegID(slave);
		} else {
			s.leg.right = null;
		}
		s.PLimb = slave.PLimb;
		return s;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {{}} oldLimbs
	 * @param {string} returnTo
	 * @returns {string}
	 */
	function amputate(slave, oldLimbs, returnTo) {
		const {his} = getPronouns(slave);

		/**
		 * @param {number} id
		 */
		function install(id) {
			slave.PLimb = id;
			surgeryDamage(slave, 10);
			App.UI.replace("#amputate", App.Desc.limbChange().prosthetic(slave, oldLimbs, returnTo));
		}

		function noInstall() {
			App.UI.replace("#amputate", App.Desc.limbChange().reaction(slave, oldLimbs, returnTo));
		}

		let implant = false;
		let r = "";

		if (slave.PLimb < 1 && isProstheticAvailable(slave, "interfaceP1")) {
			implant = true;
			r += `<div>${App.UI.link("Install basic interface", install, [1])}</div>`;
		}
		if (slave.PLimb < 2 && isProstheticAvailable(slave, "interfaceP2")) {
			implant = true;
			r += `<div>${App.UI.link("Install advanced interface", install, [2])}</div>`;
		}

		if (implant) {
			return "<span id='amputate'>" +
				`<div>Since you already have a prosthetic interface prepared for this slave, you can install it during the operation. The procedure will put additional strain on ${his} health but less so than if you were to perform the procedures separately.</div>` +
				`${r}<div>${App.UI.link("Do not install", noInstall())}</div></span>`;
		}

		if (slave.PLimb > 0) {
			return prosthetic(slave, oldLimbs, returnTo);
		}
		return reaction(slave, oldLimbs, returnTo);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {{}} oldLimbs
	 * @param {string} returnTo
	 * @returns {string}
	 */
	function prosthetic(slave, oldLimbs, returnTo) {
		if (!(isProstheticAvailable(slave, "basicL") || isProstheticAvailable(slave, "sexL")
			|| isProstheticAvailable(slave, "beautyL") || isProstheticAvailable(slave, "combatL")
			|| (isProstheticAvailable(slave, "cyberneticL") && slave.PLimb > 1))) {
			return reaction(slave, oldLimbs, returnTo);
		}
		const {him} = getPronouns(slave);

		let r = `<div>Since you already have limbs prepared for ${him} you might as well attach them while you are working on ${him}:</div>` +
			selector(slave, oldLimbs, returnTo);

		return `<span id="selector">${r}</span>`;
	}

	/**
	 * Displays a selector for prosthetic limbs of $activeSlave
	 * @param {App.Entity.SlaveState} slave
	 * @param {{}} oldLimbs
	 * @param {string} [returnTo]
	 * @returns {string}
	 */
	function selector(slave, oldLimbs, returnTo = "") {
		if (hasAllNaturalLimbs((slave))) {
			return "<span class='detail'>You must amputate your slaves limbs before you can attach prosthetics.</span>";
		}
		if (slave.PLimb < 1) {
			return "<span class='detail'>You must install a prosthetic interface before you can attach prosthetics.</span>";
		}
		const state = currentState(slave);

		/**
		 * Generates an array with the current limbs of a slave.
		 * @param {App.Entity.SlaveState} slave
		 * @returns {[number]}
		 */
		function currentState(slave) {
			let a = [];
			a[0] = getLeftArmID(slave);
			a[1] = getRightArmID(slave);
			a[2] = getLeftLegID(slave);
			a[3] = getRightLegID(slave);
			return a;
		}

		/**
		 * @param {number} pos
		 * @param {number} id
		 * @returns {string}
		 */
		function entry(pos, id) {
			if (state[pos] === 1) {
				return "<div></div>";
			}
			return `<div><<radiobutton "_newState[${pos}]" ${id}${state[pos] === id ? " checked" : ""}>></div>`;
		}

		/**
		 * @param {string} title
		 * @param {number} id
		 * @returns {string}
		 */
		function row(title, id) {
			return `<div>${title}</div>${entry(0, id)}${entry(1, id)}${entry(2, id)}${entry(3, id)}`;
		}

		let r = "<div></div><div>Left Arm</div><div>Right Arm</div><div>Left Leg</div><div>Right Leg</div>";

		r += row("None", 0);
		if (isProstheticAvailable(slave, "basicL")) {
			r += row("Basic prosthetic", 2);
		}
		if (isProstheticAvailable(slave, "sexL")) {
			r += row("Advanced sex limb", 3);
		}
		if (isProstheticAvailable(slave, "beautyL")) {
			r += row("Advanced beauty limb", 4);
		}
		if (isProstheticAvailable(slave, "combatL")) {
			r += row("Advanced combat limb", 5);
		}
		if (isProstheticAvailable(slave, "cyberneticL")) {
			if (slave.PLimb > 1) {
				r += row("Cybernetic limb", 6);
			} else {
				r += "<div class=full'><span class='detail'>Install an advanced interface to attach cybernetic limbs.</span></div>";
			}
		}

		return `<<set _newState = [${state}]>><div class='limb-selector'>${r}</div>${apply()}`;

		function apply() {
			let s;
			if (!returnTo) {
				s = `<<set $prostheticsConfig = "limbs", $oldLimbs = ${JSON.stringify(oldLimbs)}>>` +
					'<<goto "Prosthetics Configuration">>';
			} else {
				s = `<<replace "#selector">><<= App.Desc.limbChange().reaction($activeSlave, ${JSON.stringify(oldLimbs)}, "${returnTo}")>><</replace>>`;
			}

			return `<<link "Apply">><<run App.Desc.limbChange().applySelector($activeSlave, _newState)>>${s}<</link>>`;
		}
	}

	/**
	 *
	 * @param {App.Entity.SlaveState} slave
	 * @param {[number]} newState
	 */
	function applySelector(slave, newState) {
		if (getLeftArmID(slave) !== newState[0]) {
			if (getLeftArmID(slave) > 1) {
				removeLimbs(slave, "left arm");
			}
			if (newState[0] > 1) {
				attachLimbs(slave, "left arm", newState[0]);
			}
		}
		if (getRightArmID(slave) !== newState[1]) {
			if (getRightArmID(slave) > 1) {
				removeLimbs(slave, "right arm");
			}
			if (newState[1] > 1) {
				attachLimbs(slave, "right arm", newState[1]);
			}
		}
		if (getLeftLegID(slave) !== newState[2]) {
			if (getLeftLegID(slave) > 1) {
				removeLimbs(slave, "left leg");
			}
			if (newState[2] > 1) {
				attachLimbs(slave, "left leg", newState[2]);
			}
		}
		if (getRightLegID(slave) !== newState[3]) {
			if (getRightLegID(slave) > 1) {
				removeLimbs(slave, "right leg");
			}
			if (newState[3] > 1) {
				attachLimbs(slave, "right leg", newState[3]);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {{}} oldLimbs
	 * @param {string} returnTo
	 * @returns {string}
	 */
	function reaction(slave, oldLimbs, returnTo = "") {
		let r = "";
		if (oldLimbs.PLimb !== slave.PLimb) {
			r += `Prosthetic interface was ${oldLimbs.PLimb === 0 ? "none" : "basic"} and is now ${slave.PLimb === 1 ? "basic" : "advanced"}. `;
		}
		if (getLeftArmID(oldLimbs) !== getLeftArmID(slave)) {
			r += `Left arm was ${idToDescription(getLeftArmID(oldLimbs))} and is now ${idToDescription(getLeftArmID(slave))}. `;
		}
		if (getRightArmID(oldLimbs) !== getRightArmID(slave)) {
			r += `Right arm was ${idToDescription(getRightArmID(oldLimbs))} and is now ${idToDescription(getRightArmID(slave))}. `;
		}
		if (getLeftLegID(oldLimbs) !== getLeftLegID(slave)) {
			r += `Left leg was ${idToDescription(getLeftLegID(oldLimbs))} and is now ${idToDescription(getLeftLegID(slave))}. `;
		}
		if (getRightLegID(oldLimbs) !== getRightLegID(slave)) {
			r += `Right leg was ${idToDescription(getRightLegID(oldLimbs))} and is now ${idToDescription(getRightLegID(slave))}. `;
		}

		r += "<br>";

		r += "<span style='font-style: italic'>Slave's reaction</span>";
		// TODO
		// reaction based on limb change & devotion/trust
		if (returnTo) {
			r = `<br><br>${r}<br>[[Continue|${returnTo}]]`;
		}
		return r;
	}
};
