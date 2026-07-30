export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	choiceband: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.3);
		},
	},
	choicespecs: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.3);
		},
	},
	choicescarf: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.3);
		},
	},
};
