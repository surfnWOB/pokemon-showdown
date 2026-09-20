// surfnWOB [Gen 3] ADV 200 Box mod.
//
// Inherits the upstream RS-only dex (gen3rs) and adds only the resources
// distributed through Pokemon Box: Ruby & Sapphire.
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3rs',
	gen: 3,
	init() {
		this.modData('Learnsets', 'zigzagoon').learnset.extremespeed = ["3S1"];
		this.modData('Learnsets', 'pichu').learnset.surf = ["3S0"];
		this.modData('Learnsets', 'swablu').learnset.falseswipe = ["3S0"];
		this.modData('Learnsets', 'skitty').learnset.payday = ["3S0"];
	},
};
