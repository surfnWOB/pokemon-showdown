export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	// Pokemon whose otherFormes include Mega forms need updating so the
	// engine knows to look for them.  Entries that already list the right
	// formes in the parent data still need `inherit: true, gen: 3` so
	// their computed gen doesn't prevent the forme from loading.
	//
	// Each Mega keeps its intended (canonical or custom) ability; those
	// abilities are re-legalized for Gen 3 in abilities.ts. The exception is
	// Pixilate (Normal→Fairy), which can't work without the Fairy type, so the
	// Gardevoir/Altaria formes fall back to a Gen-3 ability below.

	// === GENERATION 1 ===
	fearow: { inherit: true, otherFormes: ["Fearow-Mega"] },
	fearowmega: { // 22
		num: 22, name: "Fearow-Mega", baseSpecies: "Fearow", forme: "Mega",
		types: ["Normal", "Flying"], baseStats: { hp: 100, atk: 100, def: 110, spa: 35, spd: 110, spe: 100 },
		abilities: { 0: "Anger Point" }, heightm: 1.2, weightkg: 38, color: "Brown",
		eggGroups: ["Flying"], requiredItem: "Fearite", gen: 3, isNonstandard: null,
	},
	wigglytuff: { inherit: true, otherFormes: ["Wigglytuff-Mega"] },
	wigglytuffmega: { // 40
		num: 40, name: "Wigglytuff-Mega", baseSpecies: "Wigglytuff", forme: "Mega",
		types: ["Normal"], baseStats: { hp: 140, atk: 70, def: 60, spa: 115, spd: 60, spe: 80 },
		abilities: { 0: "Saboteur" }, heightm: 1, weightkg: 12, color: "Pink",
		eggGroups: ["Fairy"], requiredItem: "Wigglytite", gen: 3, isNonstandard: null,
	},
	parasect: { inherit: true, otherFormes: ["Parasect-Mega"] },
	parasectmega: {
		num: 47, name: "Parasect-Mega", baseSpecies: "Parasect", forme: "Mega",
		types: ["Bug", "Ghost"], baseStats: { hp: 90, atk: 135, def: 100, spa: 50, spd: 100, spe: 30 },
		abilities: { 0: "Regenerator" }, heightm: 1, weightkg: 29.5, color: "Red",
		eggGroups: ["Bug", "Grass"], requiredItem: "Parasectite", gen: 3, isNonstandard: null,
	},
	venomoth: { inherit: true, otherFormes: ["Venomoth-Mega"] },
	venomothmega: {
		num: 49, name: "Venomoth-Mega", baseSpecies: "Venomoth", forme: "Mega",
		types: ["Bug", "Poison"], baseStats: { hp: 85, atk: 130, def: 80, spa: 50, spd: 80, spe: 120 },
		abilities: { 0: "Merciless" }, heightm: 1.5, weightkg: 12.5, color: "Purple",
		eggGroups: ["Bug"], requiredItem: "Venomite", gen: 3, isNonstandard: null,
	},
	rapidash: { inherit: true, otherFormes: ["Rapidash-Mega"] },
	rapidashmega: { // 78
		num: 78, name: "Rapidash-Mega", baseSpecies: "Rapidash", forme: "Mega",
		types: ["Fire", "Steel"], baseStats: { hp: 100, atk: 120, def: 90, spa: 105, spd: 80, spe: 105 },
		abilities: { 0: "3 Soda Pops" }, heightm: 1.7, weightkg: 95, color: "Yellow",
		eggGroups: ["Field"], requiredItem: "Rapidasite", gen: 3, isNonstandard: null,
	},
	kingler: { inherit: true, otherFormes: ["Kingler-Mega"] },
	kinglermega: { // 99
		num: 99, name: "Kingler-Mega", baseSpecies: "Kingler", forme: "Mega",
		types: ["Water", "Normal"], baseStats: { hp: 90, atk: 140, def: 115, spa: 50, spd: 90, spe: 90 },
		abilities: { 0: "Anger Shell" }, heightm: 1.3, weightkg: 60, color: "Red",
		eggGroups: ["Water 3"], requiredItem: "Kinglerite", gen: 3, isNonstandard: null,
	},
	hitmonchan: { inherit: true, otherFormes: ["Hitmonchan-Mega"], abilities: { 0: "Keen Eye" } },
	hitmonchanmega: {
		num: 107, name: "Hitmonchan-Mega", baseSpecies: "Hitmonchan", forme: "Mega",
		types: ["Fighting"], baseStats: { hp: 50, atk: 105, def: 79, spa: 110, spd: 110, spe: 101 },
		abilities: { 0: "Iron Fist" }, heightm: 1.4, weightkg: 50.2, color: "Brown",
		eggGroups: ["Human-Like"], requiredItem: "Hitmonchanite", gen: 3, isNonstandard: null,
	},
	ditto: { inherit: true, otherFormes: ["Ditto-Mega"] },
	dittomega: {
		num: 132, name: "Ditto-Mega", baseSpecies: "Ditto", forme: "Mega",
		types: ["Normal"], baseStats: { hp: 90, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 },
		abilities: { 0: "Imposter" }, heightm: 0.3, weightkg: 4, color: "Purple",
		eggGroups: ["Ditto"], requiredItem: "Dittite", gen: 3, isNonstandard: null,
	},
	flareon: { inherit: true, otherFormes: ["Flareon-Mega"] },
	flareonmega: { // 136
		num: 136, name: "Flareon-Mega", baseSpecies: "Flareon", forme: "Mega",
		types: ["Fire", "Normal"], baseStats: { hp: 65, atk: 130, def: 60, spa: 100, spd: 110, spe: 95 },
		abilities: { 0: "Adaptability" }, heightm: 0.9, weightkg: 25, color: "Red",
		eggGroups: ["Field"], requiredItem: "Flareite", gen: 3, isNonstandard: null,
	},

	// === GENERATION 2 ===
	yanmega: {
		inherit: true,
		gen: 3,
	},
	furret: { inherit: true, otherFormes: ["Furret-Mega-X", "Furret-Mega-Y"] },
	furretmegax: { // 162
		num: 162, name: "Furret-Mega-X", baseSpecies: "Furret", forme: "Mega-X",
		types: ["Fighting"], baseStats: { hp: 90, atk: 125, def: 75, spa: 44, spd: 75, spe: 110 },
		abilities: { 0: "Guts" }, heightm: 1.8, weightkg: 32.5, color: "Brown",
		eggGroups: ["Field"], requiredItem: "Furretite X", gen: 3, isNonstandard: null,
	},
	furretmegay: { // 162
		num: 162, name: "Furret-Mega-Y", baseSpecies: "Furret", forme: "Mega-Y",
		types: ["Dark"], baseStats: { hp: 80, atk: 66, def: 64, spa: 110, spd: 85, spe: 115 },
		abilities: { 0: "Bandito" }, heightm: 1.8, weightkg: 32.5, color: "Brown",
		eggGroups: ["Field"], requiredItem: "Furretite Y", gen: 3, isNonstandard: null,
	},
	noctowl: { inherit: true, otherFormes: ["Noctowl-Mega"] },
	noctowlmega: {
		num: 164, name: "Noctowl-Mega", baseSpecies: "Noctowl", forme: "Mega",
		types: ["Ghost", "Flying"], baseStats: { hp: 80, atk: 135, def: 58, spa: 86, spd: 96, spe: 105 },
		abilities: { 0: "Shady" }, heightm: 1.6, weightkg: 40.8, color: "Purple",
		eggGroups: ["Flying"], requiredItem: "Noctite", gen: 3, isNonstandard: null,
	},
	ledian: { inherit: true, otherFormes: ["Ledian-Mega"] },
	ledianmega: { // 166
		num: 166, name: "Ledian-Mega", baseSpecies: "Ledian", forme: "Mega",
		types: ["Bug", "Psychic"], baseStats: { hp: 90, atk: 35, def: 110, spa: 75, spd: 120, spe: 100 },
		abilities: { 0: "Star Screens" }, heightm: 1.4, weightkg: 35.6, color: "Red",
		eggGroups: ["Bug"], requiredItem: "Lediate", gen: 3, isNonstandard: null,
	},
	sudowoodo: { inherit: true, otherFormes: ["Sudowoodo-Mega-X", "Sudowoodo-Mega-Y"] },
	sudowoodomegax: { // 185
		num: 185, name: "Sudowoodo-Mega-X", baseSpecies: "Sudowoodo", forme: "Mega-X",
		types: ["Fighting"], baseStats: { hp: 90, atk: 115, def: 115, spa: 30, spd: 45, spe: 115 },
		abilities: { 0: "Illusion" }, heightm: 1.2, weightkg: 38, color: "Brown",
		eggGroups: ["Mineral"], requiredItem: "Sudowoodite X", gen: 3, isNonstandard: null,
	},
	sudowoodomegay: { // 185
		num: 185, name: "Sudowoodo-Mega-Y", baseSpecies: "Sudowoodo", forme: "Mega-Y",
		types: ["Rock"], baseStats: { hp: 90, atk: 115, def: 115, spa: 30, spd: 45, spe: 115 },
		abilities: { 0: "Illusion" }, heightm: 1.2, weightkg: 38, color: "Brown",
		eggGroups: ["Mineral"], requiredItem: "Sudowoodite Y", gen: 3, isNonstandard: null,
	},
	quagsire: { inherit: true, otherFormes: ["Quagsire-Mega"] },
	quagsiremega: {
		num: 196, name: "Quagsire-Mega", baseSpecies: "Quagsire", forme: "Mega",
		types: ["Water", "Ground"], baseStats: { hp: 110, atk: 95, def: 110, spa: 90, spd: 90, spe: 35 },
		abilities: { 0: "Unaware" }, heightm: 1.4, weightkg: 75, color: "Blue",
		eggGroups: ["Water 1", "Field"], requiredItem: "Quagsite", gen: 3, isNonstandard: null,
	},
	unown: { inherit: true, otherFormes: ["Unown-Mega"] },
	unownmega: { // 201
		num: 201, name: "Unown-Mega", baseSpecies: "Unown", forme: "Mega",
		types: ["Psychic"], baseStats: { hp: 80, atk: 100, def: 80, spa: 100, spd: 80, spe: 110 },
		abilities: { 0: "Unknown Power" }, heightm: 0.5, weightkg: 5, color: "Black",
		eggGroups: ["Undiscovered"], requiredItem: "Unknown Stone", gen: 3, isNonstandard: null,
	},
	magcargo: { inherit: true, otherFormes: ["Magcargo-Mega"] },
	magcargomega: {
		num: 219, name: "Magcargo-Mega", baseSpecies: "Magcargo", forme: "Mega",
		types: ["Fire", "Rock"], baseStats: { hp: 80, atk: 110, def: 125, spa: 110, spd: 125, spe: 30 },
		abilities: { 0: "Earth Eater" }, heightm: 0.8, weightkg: 55, color: "Red",
		eggGroups: ["Amorphous"], requiredItem: "Magcargoite", gen: 3, isNonstandard: null,
	},
	corsola: { inherit: true, otherFormes: ["Corsola-Galar", "Corsola-Mega"] },
	corsolamega: {
		num: 222, name: "Corsola-Mega", baseSpecies: "Corsola", forme: "Mega",
		types: ["Water", "Psychic"], baseStats: { hp: 105, atk: 55, def: 115, spa: 120, spd: 115, spe: 30 },
		abilities: { 0: "Natural Cure" }, heightm: 0.6, weightkg: 5, color: "Pink",
		eggGroups: ["Water 1", "Water 3"], requiredItem: "Corsolite", gen: 3, isNonstandard: null,
	},
	octillery: { inherit: true, otherFormes: ["Octillery-Mega"] },
	octillerymega: { // 224
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	mantine: { inherit: true, otherFormes: ["Mantine-Mega"] },
	mantinemega: {
		num: 226, name: "Mantine-Mega", baseSpecies: "Mantine", forme: "Mega",
		types: ["Water", "Dragon"], baseStats: { hp: 90, atk: 65, def: 100, spa: 120, spd: 110, spe: 100 },
		abilities: { 0: "Dragonize" }, heightm: 1, weightkg: 28.4, color: "Purple",
		eggGroups: ["Water 1"], requiredItem: "Mantite", gen: 3, isNonstandard: null,
	},

	// === GENERATION 3 ===
	mightyena: { inherit: true, otherFormes: ["Mightyena-Mega-X", "Mightyena-Mega-Y"] },
	mightyenamegax: {
		num: 262, name: "Mightyena-Mega-X", baseSpecies: "Mightyena", forme: "Mega-X",
		types: ["Dark"], baseStats: { hp: 61, atk: 110, def: 60, spa: 119, spd: 60, spe: 110 },
		abilities: { 0: "Serene Grace" }, heightm: 1, weightkg: 37, color: "Gray",
		eggGroups: ["Field"], requiredItem: "Mightyenite X", gen: 3, isNonstandard: null,
	},
	mightyenamegay: {
		num: 262, name: "Mightyena-Mega-Y", baseSpecies: "Mightyena", forme: "Mega-Y",
		types: ["Dark", "Poison"], baseStats: { hp: 100, atk: 100, def: 100, spa: 35, spd: 110, spe: 95 },
		abilities: { 0: "Fur Coat" }, heightm: 1, weightkg: 37, color: "Gray",
		eggGroups: ["Field"], requiredItem: "Mightyenite Y", gen: 3, isNonstandard: null,
	},
	beautifly: { inherit: true, otherFormes: ["Beautifly-Mega"] },
	beautiflymega: {
		num: 267, name: "Beautifly-Mega", baseSpecies: "Beautifly", forme: "Mega",
		types: ["Grass", "Flying"], baseStats: { hp: 90, atk: 10, def: 90, spa: 130, spd: 90, spe: 116 },
		abilities: { 0: "Mega Sol" }, heightm: 1, weightkg: 28.4, color: "Yellow",
		eggGroups: ["Bug"], requiredItem: "Beautiflite", gen: 3, isNonstandard: null,
	},
	masquerain: { inherit: true, otherFormes: ["Masquerain-Mega"] },
	masquerainmega: {
		num: 284, name: "Masquerain-Mega", baseSpecies: "Masquerain", forme: "Mega",
		types: ["Bug", "Water"], baseStats: { hp: 91, atk: 80, def: 84, spa: 90, spd: 110, spe: 95 },
		abilities: { 0: "Water Bubble" }, heightm: 0.8, weightkg: 3.6, color: "Blue",
		eggGroups: ["Water 1", "Bug"], requiredItem: "Masquerite", gen: 3, isNonstandard: null,
	},
	shedinja: { inherit: true, otherFormes: ["Shedinja-Mega"] },
	shedinjamega: {
		num: 292, name: "Shedinja-Mega", baseSpecies: "Shedinja", forme: "Mega",
		types: ["Bug", "Ghost"], baseStats: { hp: 4, atk: 121, def: 40, spa: 30, spd: 30, spe: 110 },
		maxHP: 4, abilities: { 0: "Wonder Guard" }, heightm: 0.8, weightkg: 1.2, color: "Brown",
		eggGroups: ["Mineral"], requiredItem: "Shedinjite", gen: 3, isNonstandard: null,
	},
	volbeat: { inherit: true, otherFormes: ["Volbeat-Mega"] },
	volbeatmega: {
		num: 313, name: "Volbeat-Mega", baseSpecies: "Volbeat", forme: "Mega",
		types: ["Bug", "Electric"], baseStats: { hp: 85, atk: 65, def: 75, spa: 90, spd: 90, spe: 125 },
		abilities: { 0: "Polar Switch" }, heightm: 0.7, weightkg: 17.7, color: "Gray",
		eggGroups: ["Bug", "Human-Like"], requiredItem: "Volbeatite", gen: 3, isNonstandard: null,
	},
	illumise: { inherit: true, otherFormes: ["Illumise-Mega"] },
	illumisemega: {
		num: 314, name: "Illumise-Mega", baseSpecies: "Illumise", forme: "Mega",
		types: ["Bug", "Electric"], baseStats: { hp: 70, atk: 70, def: 90, spa: 125, spd: 90, spe: 85 },
		abilities: { 0: "Prankster" }, heightm: 0.6, weightkg: 17.7, color: "Purple",
		eggGroups: ["Bug", "Human-Like"], requiredItem: "Illumite", gen: 3, isNonstandard: null,
	},
	grumpig: { inherit: true, otherFormes: ["Grumpig-Mega"] },
	grumpigmega: {
		num: 326, name: "Grumpig-Mega", baseSpecies: "Grumpig", forme: "Mega",
		types: ["Psychic", "Dark"], baseStats: { hp: 100, atk: 60, def: 80, spa: 125, spd: 125, spe: 80 },
		abilities: { 0: "Opportunist" }, heightm: 0.9, weightkg: 71.5, color: "Purple",
		eggGroups: ["Field"], requiredItem: "Grumpigite", gen: 3, isNonstandard: null,
	},
	flygon: { inherit: true, otherFormes: ["Flygon-Mega"] },
	flygonmega: {
		num: 330, name: "Flygon-Mega", baseSpecies: "Flygon", forme: "Mega",
		types: ["Ground", "Dragon"], baseStats: { hp: 80, atk: 100, def: 120, spa: 100, spd: 80, spe: 110 },
		abilities: { 0: "Sandy" }, heightm: 2, weightkg: 82, color: "Green",
		eggGroups: ["Bug", "Dragon"], requiredItem: "Flygonite", gen: 3, isNonstandard: null,
	},
	solrock: { inherit: true, otherFormes: ["Solrock-Mega"] },
	solrockmega: {
		num: 338, name: "Solrock-Mega", baseSpecies: "Solrock", forme: "Mega",
		types: ["Rock", "Psychic"], baseStats: { hp: 90, atk: 115, def: 110, spa: 90, spd: 85, spe: 90 },
		abilities: { 0: "High Noon" }, heightm: 1.2, weightkg: 154, color: "Red",
		eggGroups: ["Mineral"], requiredItem: "Sole Rock", gen: 3, isNonstandard: null,
	},
	cradily: { inherit: true, otherFormes: ["Cradily-Mega"] },
	cradilymega: { // 346
		num: 346, name: "Cradily-Mega", baseSpecies: "Cradily", forme: "Mega",
		types: ["Rock", "Grass"], baseStats: { hp: 100, atk: 117, def: 108, spa: 107, spd: 107, spe: 56 },
		abilities: { 0: "Unaware" }, heightm: 1.5, weightkg: 60.4, color: "Green",
		eggGroups: ["Water 3"], requiredItem: "Cradilite", gen: 3, isNonstandard: null,
	},
	armaldo: { inherit: true, otherFormes: ["Armaldo-Mega"] },
	armaldomega: { // 348
		num: 348, name: "Armaldo-Mega", baseSpecies: "Armaldo", forme: "Mega",
		types: ["Rock", "Bug"], baseStats: { hp: 75, atk: 125, def: 100, spa: 70, spd: 80, spe: 45 },
		abilities: { 0: "Spinner" }, heightm: 1.5, weightkg: 68.2, color: "Gray",
		eggGroups: ["Water 3"], requiredItem: "Armaldite", gen: 3, isNonstandard: null,
	},
	kecleon: { inherit: true, otherFormes: ["Kecleon-Mega-X", "Kecleon-Mega-Y"] },
	kecleonmegax: {
		num: 352, name: "Kecleon-Mega-X", baseSpecies: "Kecleon", forme: "Mega-X",
		types: ["Normal"], baseStats: { hp: 60, atk: 120, def: 60, spa: 110, spd: 120, spe: 105 },
		abilities: { 0: "Color Change" }, heightm: 1, weightkg: 22, color: "Green",
		eggGroups: ["Field"], requiredItem: "Kecleite X", gen: 3, isNonstandard: null,
	},
	kecleonmegay: {
		num: 352, name: "Kecleon-Mega-Y", baseSpecies: "Kecleon", forme: "Mega-Y",
		types: ["Normal"], baseStats: { hp: 100, atk: 100, def: 120, spa: 100, spd: 100, spe: 40 },
		abilities: { 0: "Protean" }, heightm: 1, weightkg: 22, color: "Green",
		eggGroups: ["Field"], requiredItem: "Kecleite Y", gen: 3, isNonstandard: null,
	},
	walrein: { inherit: true, otherFormes: ["Walrein-Mega"] },
	walreinmega: {
		num: 365, name: "Walrein-Mega", baseSpecies: "Walrein", forme: "Mega",
		types: ["Water", "Ice"], baseStats: { hp: 125, atk: 80, def: 100, spa: 100, spd: 115, spe: 80 },
		abilities: { 0: "Snow Warning" }, heightm: 1.4, weightkg: 150.6, color: "Blue",
		eggGroups: ["Water 1", "Field"], requiredItem: "Walrite", gen: 3, isNonstandard: null,
	},
	luvdisc: { inherit: true, otherFormes: ["Luvdisc-Mega"] },
	luvdiscmega: {
		num: 370, name: "Luvdisc-Mega", baseSpecies: "Luvdisc", forme: "Mega",
		types: ["Water"], baseStats: { hp: 45, atk: 70, def: 25, spa: 160, spd: 25, spe: 125 },
		abilities: { 0: "Soul-Heart" }, heightm: 0.6, weightkg: 8.7, color: "Pink",
		eggGroups: ["Water 2"], requiredItem: "Luvdite", gen: 3, isNonstandard: null,
	},

	// Rayquaza-Mega excluded: requires Dragon Ascent which doesn't exist in Gen 3

	// === Base-forme ability corrections ===
	// Re-legalizing later-gen abilities for the Mega formes (abilities.ts) had the
	// side effect of un-stripping the same abilities from their *base* formes: the
	// Gen-3 species loader only drops a slot-1 ability when its gen is exactly 4,
	// and re-legalizing rewrites that gen to 3. Pin these base formes back to their
	// real Gen-3 ability so e.g. Cloyster can't run Skill Link, Machamp No Guard.
	// (The Mega formes are separate species and keep their re-legalized ability.)
	mrmime: { inherit: true, abilities: { 0: "Soundproof" } },
	// Hitmonchan's base-forme ability correction (Keen Eye) is merged into its
	// otherFormes declaration above; a second `hitmonchan:` key here would
	// override that entry and drop Hitmonchan-Mega from the dex.
	tyrogue: { inherit: true, abilities: { 0: "Guts" } },
	hitmontop: { inherit: true, abilities: { 0: "Intimidate" } },
	meowth: { inherit: true, abilities: { 0: "Pickup" } },
	persian: { inherit: true, abilities: { 0: "Limber" } },
	machop: { inherit: true, abilities: { 0: "Guts" } },
	machoke: { inherit: true, abilities: { 0: "Guts" } },
	machamp: { inherit: true, abilities: { 0: "Guts" } },
	shellder: { inherit: true, abilities: { 0: "Shell Armor" } },
	cloyster: { inherit: true, abilities: { 0: "Shell Armor" } },
	scyther: { inherit: true, abilities: { 0: "Swarm" } },
	pinsir: { inherit: true, abilities: { 0: "Hyper Cutter" } },
	eevee: { inherit: true, abilities: { 0: "Run Away" } },
	sunkern: { inherit: true, abilities: { 0: "Chlorophyll" } },
	sunflora: { inherit: true, abilities: { 0: "Chlorophyll" } },
	scizor: { inherit: true, abilities: { 0: "Swarm" } },
	smeargle: { inherit: true, abilities: { 0: "Own Tempo" } },
	tropius: { inherit: true, abilities: { 0: "Chlorophyll" } },
};
