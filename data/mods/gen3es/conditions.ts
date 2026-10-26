export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	par: {
		inherit: true,
		// Keep the Gen 3 Speed penalty, but never lose an action to paralysis.
		onBeforeMove: undefined,
	},
	frz: {
		inherit: true,
		onBeforeMove(pokemon) {
			pokemon.cureStatus();
		},
	},
	confusion: {
		inherit: true,
		onBeforeMove(pokemon) {
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
		},
	},
	stall: {
		inherit: true,
		onStallMove(pokemon) {
			delete pokemon.volatiles['stall'];
			return false;
		},
	},
};
