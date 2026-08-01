export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	par: {
		inherit: true,
		// RNG Madhouse: 33% full paralysis instead of the base 25%
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 3)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	frz: {
		inherit: true,
		// RNG Madhouse: Freeze is permanent and unclaused - no thaw roll, no defrost moves, no thaw-on-Fire-hit
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove: undefined,
		onAfterMoveSecondary: undefined,
		onDamagingHit: undefined,
	},
};
