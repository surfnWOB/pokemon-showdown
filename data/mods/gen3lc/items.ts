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
			// Koffing is a living cloud of gas: it savors the fumes and heals
			// each turn (see onResidual) instead of being poisoned.
			if (target.species.id === 'koffing') {
				this.add('-message', `${target.name} greedily huffs the smoke — the toxic fumes are pure bliss!`);
				return;
			}
			this.add('-message', `${target.name} takes a puff of their cigarette!`);
			target.trySetStatus('tox', target);
		},
		onResidualOrder: 5,
		onResidual(target) {
			if (target.ignoringItem()) return;
			if (target.species.id !== 'koffing') return;
			this.heal(target.baseMaxhp * 12 / 100);
		},
		num: 3001,
		gen: 3,
		isNonstandard: null,
	},
};
