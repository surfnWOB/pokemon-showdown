export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	cigarettes: {
		name: "Cigarettes",
		spritenum: 515, // reuse Toxic Orb's purple sprite
		fling: {
			basePower: 30,
			status: 'tox',
		},
		onStart(target) {
			if (target.ignoringItem()) return;
			this.add('-message', `${target.name} takes a puff of their cigarette!`);
			target.trySetStatus('tox', target);
		},
		num: 3001,
		gen: 3,
		isNonstandard: null,
	},
};
