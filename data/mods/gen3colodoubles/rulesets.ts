const FINITE_TMS = new Set([
	'focuspunch', 'dragonclaw', 'roar', 'toxic', 'hail',
	'sunnyday', 'taunt', 'raindance', 'gigadrain', 'solarbeam',
	'irontail', 'earthquake', 'return', 'shadowball', 'brickbreak',
	'sludgebomb', 'sandstorm', 'torment', 'rest', 'attract',
	'thief', 'steelwing', 'skillswap', 'snatch',
]);

export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		desc: "The standard ruleset for Colo-Only Doubles.",
		ruleset: [
			'Obtainable', 'Accuracy Trap Clause', 'Freeze Clause Mod',
			'Sleep Clause Mod', 'Switch Priority Clause Mod', 'Species Clause',
			'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause',
			'Evasion Moves Clause', 'Endless Battle Clause',
			'HP Percentage Mod', 'Cancel Mod', 'TM Clause',
		],
	},
	tmclause: {
		effectType: 'ValidatorRule',
		name: 'TM Clause',
		desc: "Allows only one use of each finite Colosseum TM.",
		onValidateTeam(team) {
			const uses = new Map<string, string[]>();

			for (const set of team) {
				const species = this.dex.species.get(set.species);

				for (const moveName of set.moves) {
					const move = this.dex.moves.get(moveName);
					if (!FINITE_TMS.has(move.id)) continue;

					let hasTMSource = false;

					let hasNonTMSource = false;

					for (const { learnset } of this.dex.species.getFullLearnset(species.id)) {
						for (const source of learnset[move.id] || []) {
							if (source === '3M') {
								hasTMSource = true;
							} else {
								hasNonTMSource = true;
							}
						}
					}
					// Native/event/inherited users do not consume the TM.
					if (!hasTMSource || hasNonTMSource) continue;

					const users = uses.get(move.id) || [];
					users.push(species.name);
					uses.set(move.id, users);
				}
			}
			const problems: string[] = [];
			for (const [moveID, users] of uses) {
				if (users.length <= 1) continue;
				problems.push(
					`TM Clause: ${this.dex.moves.get(moveID).name} ` +
					`has only one obtainable TM, but is required by ` +
					`${users.join(', ')}.`
				);
			}
			return problems.length ? problems : undefined;
		},
	},
};
