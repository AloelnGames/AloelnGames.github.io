/**
 * @param {App.Entity.SlaveState} slave
 */
window.SetBellySize = function SetBellySize(slave) {
	WombNormalizePreg(slave); /* now with support for legacy code that advances pregnancy by setting .preg++ */

	const _implantSize = (slave.bellyImplant > 0) ? slave.bellyImplant : 0;

	if (slave.inflation === 3) {
		slave.bellyFluid = 10000;
	} else if (slave.inflation === 2) {
		slave.bellyFluid = 5000;
	} else if (slave.inflation === 1) {
		slave.bellyFluid = 2000;
	} else {
		slave.bellyFluid = 0;
	}

	slave.belly = slave.bellyPreg + slave.bellyFluid + _implantSize;
};
