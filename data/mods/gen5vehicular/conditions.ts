export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	// Battle-wide "mourning" flag raised after a fatal crash. It is not the skip
	// mechanism itself (a field pseudo-weather cannot cancel individual moves) —
	// it just records the turn the crash happened. The format's onBeforeMove
	// reads it and makes every Pokemon skip the *following* turn, then it expires.
	mourning: {
		duration: 2,
		onFieldStart() {
			this.effectState.startTurn = this.turn;
			this.add('-message', `A hush falls over the battlefield.`);
			this.add('-message', `A mourning session will be held next turn — every Pokemon skips its turn.`);
		},
		onFieldEnd() {
			this.add('-message', `The mourning session concludes. The battle resumes.`);
		},
	},
};
