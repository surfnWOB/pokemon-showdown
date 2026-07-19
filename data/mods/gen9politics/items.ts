export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Party badges. Affiliation is read from which badge a Pokemon holds
	// (see the "Political Affiliation Mod" ruleset). Badges cannot be removed
	// by any means (onTakeItem returns false) and have no fling data, so
	// Knock Off / Trick / Switcheroo / Thief / Covet / Corrosive Gas / Fling
	// etc. can never strip them.
	solarrosette: {
		name: "Solar Rosette",
		spritenum: 515,
		onTakeItem: false,
		num: 4001,
		gen: 9,
		isNonstandard: null,
	},
	lunarrosette: {
		name: "Lunar Rosette",
		spritenum: 581,
		onTakeItem: false,
		num: 4002,
		gen: 9,
		isNonstandard: null,
	},
	centristpin: {
		name: "Centrist Pin",
		spritenum: 288,
		onTakeItem: false,
		num: 4003,
		gen: 9,
		isNonstandard: null,
	},
};
