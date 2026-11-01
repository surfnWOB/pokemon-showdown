export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	meteormash: {
		inherit: true,
		accuracy: 100,
		secondary: undefined,
		secondaries: [],
		desc: "Deals damage with no additional effect.",
		shortDesc: "No additional effect.",
	},
	rockslide: {
		inherit: true,
		accuracy: 100,
		secondary: undefined,
		secondaries: [],
		desc: "Deals damage with no additional effect.",
		shortDesc: "No additional effect.",
	},
	protect: {
		inherit: true,
		desc: "The user is protected from most attacks made by other Pokemon this turn. Consecutive uses of Protect, Detect, or Endure, including mixed sequences, alternate between success and failure. Using a different move resets the sequence. Fails if the user moves last this turn.",
		shortDesc: "Protects user; repeated uses alternate.",
	},

	detect: {
		inherit: true,
		desc: "The user is protected from most attacks made by other Pokemon this turn. Consecutive uses of Protect, Detect, or Endure, including mixed sequences, alternate between success and failure. Using a different move resets the sequence. Fails if the user moves last this turn.",
		shortDesc: "Protects user; repeated uses alternate.",
	},

	endure: {
		inherit: true,
		desc: "The user survives attacks made by other Pokemon this turn with at least 1 HP. Consecutive uses of Protect, Detect, or Endure, including mixed sequences, alternate between success and failure. Using a different move resets the sequence. Fails if the user moves last this turn.",
		shortDesc: "Survive attacks at 1 HP; repeated uses alternate.",
	},

	toxic: {
		inherit: true,
		accuracy: 100,
	},
};
