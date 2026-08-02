export const Scripts: ModdedBattleScriptsData = {
	gen: 8,
	inherit: 'gen8',
	actions: {
		inherit: true,
		modifyDamage(baseDamage, pokemon, target, move, suppressMessages = false) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;
			baseDamage += 2;
			if (move.spreadHit) {
				baseDamage = this.battle.modify(baseDamage, this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				baseDamage = this.battle.modify(baseDamage, this.battle.gen > 6 ? 0.25 : 0.5);
			}
			baseDamage = this.battle.priorityEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
			if (!move.noDamageVariance) baseDamage = this.battle.randomizer(baseDamage);
			if (type !== '???' && move.id !== 'splinters') {
				let stab: number | [number, number] = 1;
				const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
				if (isSTAB) stab = 1.5;
				if (pokemon.terastallized === 'Stellar') {
					if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
						stab = isSTAB ? 2 : [4915, 4096];
						move.stellarBoosted = true;
						if (pokemon.species.name !== 'Terapagos-Stellar') pokemon.stellarBoostedTypes.push(type);
					}
				} else {
					if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) stab = 2;
					stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
				}
				baseDamage = this.battle.modify(baseDamage, stab);
			}
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.battle.add('-supereffective', target);
				for (let i = 0; i < typeMod; i++) baseDamage *= 2;
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);
				for (let i = 0; i > typeMod; i--) baseDamage = tr(baseDamage / 2);
			}
			if (isCrit && !suppressMessages) this.battle.add('-crit', target);
			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (this.battle.gen < 6 || move.id !== 'facade') baseDamage = this.battle.modify(baseDamage, 0.5);
			}
			if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);
			const bypassProtect = target.getMoveHitData(move).bypassProtect;
			if (bypassProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				if (bypassProtect !== true && bypassProtect.effectType === 'Ability') this.battle.add('-ability', pokemon, bypassProtect.name);
				this.battle.add('-zbroken', target);
			}
			if (this.battle.gen !== 5 && !baseDamage) return 1;
			return tr(baseDamage, 16);
		},
	},
	init() {
		// Legends: Arceus has neither held items nor ordinary Abilities. Individual
		// exceptions (Cherrim and Regigigas) are implemented as format mechanics.
		this.modData('Abilities', 'noability').isNonstandard = null;
		for (const id in this.data.Pokedex) {
			this.modData('Pokedex', id).abilities = { 0: 'No Ability' };
		}
	},
};
