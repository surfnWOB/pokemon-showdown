export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	yipsrule: {
		effectType: 'Rule',
		name: 'Yips Rule',
		desc: "10% chance each turn that a Pokémon yips and fails to use its move, independent of paralysis, confusion, or flinch.",
		onBeforeMovePriority: -100,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 10)) {
				this.add('cant', pokemon, 'move: Yips');
				return false;
			}
		},
	},
	halvedcritsrule: {
		effectType: 'Rule',
		name: 'Halved Crits Rule',
		desc: "Critical hit chance is halved.",
		onCriticalHit(target, source, move) {
			return this.randomChance(1, 2);
		},
	},
};
