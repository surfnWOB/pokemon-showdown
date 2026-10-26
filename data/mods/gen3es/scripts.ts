import { Battle } from '../../../sim/battle';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	gen: 3,

	start() {
		this.onEvent('BeforeSwitchIn', this.format, (
			pokemon: Pokemon
		) => {
			pokemon.m.usedHealingMove = false;
		});

		this.onEvent('ModifyCritRatio', this.format, { priority: -100 }, (
			critRatio: number,
			source: Pokemon, target: Pokemon, move: ActiveMove
		) => {
			if (
				source.hasAbility('merciless') &&
				target &&
				['psn', 'tox'].includes(target.status) &&
				move.willCrit !== false
			) {
				move.willCrit = true;
			}
		});

		this.onEvent('TryMove', this.format, (
			pokemon: Pokemon,
			target: Pokemon, move: ActiveMove
		) => {
			if (move.category === 'Status' && move.flags.heal) {
				pokemon.m.usedHealingMove = true;
			}
		});

		this.onEvent('CriticalHit', this.format, (
			target: Pokemon,
			source: Pokemon | null, move: ActiveMove
		) => {
			if (move.willCrit) return;

			const eligible =
				target.boosts.def > 0 ||
				target.boosts.spd > 0 ||
				target.m.usedHealingMove;

			if (!eligible) return false;
		});

		return Battle.prototype.start.call(this);
	},
};
