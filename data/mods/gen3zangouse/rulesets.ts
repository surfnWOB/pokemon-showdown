import { FormatsData } from './formats-data';

export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	zangouseroster: {
		effectType: 'ValidatorRule',
		name: 'ZangOuSe Roster',
		desc: 'Only Pokémon in the curated ZangOuSe roster may be used.',
		// Banned Pokémon must remain obtainable as parents for Gen 3 egg move validation.
		banlist: Object.entries(FormatsData).filter(([, data]) => data.tier === 'Illegal').map(([id]) => id),
	},
};
