export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Mega Sol makes the holder treat the weather as Sunny Day, but it does so
	// purely through Pokemon.effectiveWeather() — it never sets real field
	// weather. The Gen 4 versions of the weather-heal moves (inherited here via
	// gen3) check this.field.isWeather(), so they never see Mega Sol and fall
	// through to the 50% heal. Re-point them at the *Pokemon's* effective
	// weather so a Mega Sol holder gets the 2/3 sun heal, while keeping the exact
	// Gen 4 heal amounts for everyone else.
	lightscreen: {
		num: 113,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Light Screen",
		pp: 30,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		sideCondition: 'lightscreen',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('starscreen')) {
					return 10;
				}
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
		target: "allySide",
		type: "Psychic",
		zMove: { boost: { spd: 1 } },
		contestType: "Beautiful",
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			const weather = pokemon.effectiveWeather();
			if (weather === 'sunnyday' || weather === 'desolateland') {
				this.heal(pokemon.maxhp * 2 / 3);
			} else if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(weather)) {
				this.heal(pokemon.baseMaxhp / 4);
			} else {
				this.heal(pokemon.baseMaxhp / 2);
			}
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			const weather = pokemon.effectiveWeather();
			if (weather === 'sunnyday' || weather === 'desolateland') {
				this.heal(pokemon.maxhp * 2 / 3);
			} else if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(weather)) {
				this.heal(pokemon.baseMaxhp / 4);
			} else {
				this.heal(pokemon.baseMaxhp / 2);
			}
		},
	},
	reflect: {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		sideCondition: 'reflect',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('starscreen')) {
					return 10;
				}
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		target: "allySide",
		type: "Psychic",
		zMove: { boost: { def: 1 } },
		contestType: "Clever",
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			const weather = pokemon.effectiveWeather();
			if (weather === 'sunnyday' || weather === 'desolateland') {
				this.heal(pokemon.maxhp * 2 / 3);
			} else if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(weather)) {
				this.heal(pokemon.baseMaxhp / 4);
			} else {
				this.heal(pokemon.baseMaxhp / 2);
			}
		},
	},
};
