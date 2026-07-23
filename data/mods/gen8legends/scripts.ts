export const Scripts: ModdedBattleScriptsData = {
	gen: 8,
	inherit: 'gen8',
	init() {
		// Legends: Arceus has neither held items nor ordinary Abilities. Individual
		// exceptions (Cherrim and Regigigas) are implemented as format mechanics.
		this.modData('Abilities', 'noability').isNonstandard = null;
		for (const id in this.data.Pokedex) {
			this.modData('Pokedex', id).abilities = { 0: 'No Ability' };
		}
	},
};
