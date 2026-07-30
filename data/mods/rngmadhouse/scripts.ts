export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		// Every species can learn Guillotine, Fissure, Sheer Cold, Double Team, and Confuse Ray.
		for (const id in this.data.Pokedex) {
			if (this.data.Learnsets[id]?.learnset) {
				const learnset = this.modData('Learnsets', id).learnset;
				learnset.guillotine = ['9L1'];
				learnset.fissure = ['9L1'];
				learnset.sheercold = ['9L1'];
				learnset.doubleteam = ['9L1'];
				learnset.confuseray = ['9L1'];
			}
		}
	},
	actions: {
		inherit: true,
		modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = this.battle.gameType === 'freeforall' ? 0.5 : 0.75;
				this.battle.debug(`Spread modifier: ${spreadModifier}`);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}

			// weather modifier
			baseDamage = this.battle.priorityEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// RNG Madhouse: a critical hit OHKOs instead of getting a damage multiplier (see below)
			const isCrit = target.getMoveHitData(move).crit;

			// RNG Madhouse: flat 70% damage instead of the usual 85-100% random roll
			baseDamage = tr(baseDamage * 0.7);

			// STAB
			// The "???" type never gets STAB
			if (type !== '???') {
				let stab: number | [number, number] = 1;

				const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
				if (isSTAB) {
					stab = 1.5;
				}

				if (pokemon.terastallized === 'Stellar') {
					if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
						stab = isSTAB ? 2 : [4915, 4096];
						move.stellarBoosted = true;
						if (pokemon.species.name !== 'Terapagos-Stellar') {
							pokemon.stellarBoostedTypes.push(type);
						}
					}
				} else {
					if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
						stab = 2;
					}
					stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
				}

				baseDamage = this.battle.modify(baseDamage, stab);
			}

			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.battle.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.battle.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (this.battle.gen < 6 || move.id !== 'facade') {
					baseDamage = this.battle.modify(baseDamage, 0.5);
				}
			}

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			const bypassProtect = target.getMoveHitData(move).bypassProtect;
			if (bypassProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				if (bypassProtect !== true && bypassProtect.effectType === 'Ability') {
					this.battle.add('-ability', pokemon, bypassProtect.name);
				}
				this.battle.add('-zbroken', target);
			}

			if (!baseDamage) return 1;

			// RNG Madhouse: a critical hit OHKOs the target outright
			if (isCrit) return target.hp;

			return tr(baseDamage, 16);
		},
	},
	checkWin(faintData) {
		if (this.sides.every(side => !side.pokemonLeft)) {
			this.win(faintData && this.gen > 4 ? faintData.target.side : null);
			return true;
		}
		for (const side of this.sides) {
			if (!side.foePokemonLeft()) {
				// RNG Madhouse: 20% chance the losing side is arbitrarily granted the win instead
				if (this.randomChance(1, 5)) {
					this.add('-message', `${side.foe.name} choked at the worst possible moment! The result has been flipped!`);
					this.win(side.foe);
				} else {
					this.win(side);
				}
				return true;
			}
		}
	},
};
