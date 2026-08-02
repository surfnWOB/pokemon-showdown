function statusDuration(sourceEffect: Effect | null) {
	if (sourceEffect?.id === 'rest') return 4;
	if (sourceEffect?.id === 'darkvoid') return 3;
	return sourceEffect?.effectType === 'Move' && (sourceEffect as Move).category !== 'Status' ? 3 : 5;
}

function refreshStatus(target: Pokemon, id: string, sourceEffect: Effect | null) {
	target.volatiles[id].duration = statusDuration(sourceEffect);
}

function statDuration(sourceEffect: Effect | null) {
	if (sourceEffect?.effectType === 'Move' && (sourceEffect as Move).category !== 'Status') return 3;
	switch (sourceEffect?.id) {
	case 'shelter': case 'bulkup': case 'calmmind': case 'victorydance': return 4;
	default: return 5;
	}
}

function refreshStat(target: Pokemon, id: string, sourceEffect: Effect | null) {
	target.volatiles[id].duration = statDuration(sourceEffect);
}

export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	lockedmove: {
		inherit: true,
		onModifyDamage() {
			if (['iceball', 'rollout', 'petaldance', 'outrage', 'ragingfury'].includes(this.effectState.move)) {
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage() {
			if (['iceball', 'rollout', 'petaldance', 'outrage', 'ragingfury'].includes(this.effectState.move)) {
				return this.chainModify(4 / 3);
			}
		},
	},
	plafrostbite: {
		name: 'Frostbite',
		durationCallback(target, source, sourceEffect) {
			return statusDuration(sourceEffect);
		},
		onStart(target) {
			this.add('-start', target, 'Frostbite');
		},
		onSetStatus() { return false; },
		onRestart(target, source, sourceEffect) {
			refreshStatus(target, 'plafrostbite', sourceEffect);
			this.add('-start', target, 'Frostbite', '[refresh]');
		},
		onEnd(target) {
			this.add('-end', target, 'Frostbite');
		},
		onModifySpA(spa) {
			return this.chainModify(0.5);
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	pladrowsy: {
		name: 'Drowsy',
		durationCallback(target, source, sourceEffect) {
			return statusDuration(sourceEffect);
		},
		onStart(target) {
			this.add('-start', target, 'Drowsy');
		},
		onSetStatus() { return false; },
		onRestart(target, source, sourceEffect) {
			refreshStatus(target, 'pladrowsy', sourceEffect);
			this.add('-start', target, 'Drowsy', '[refresh]');
		},
		onEnd(target) {
			this.add('-end', target, 'Drowsy');
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'Drowsy');
				return false;
			}
		},
		onSourceModifyDamage(damage, source, target) {
			return this.chainModify([4, 3]);
		},
	},
	plaparalysis: {
		name: 'Paralysis',
		durationCallback(target, source, sourceEffect) {
			return statusDuration(sourceEffect);
		},
		onStart(target) {
			this.add('-start', target, 'Paralysis');
		},
		onSetStatus() { return false; },
		onRestart(target, source, sourceEffect) {
			refreshStatus(target, 'plaparalysis', sourceEffect);
			this.add('-start', target, 'Paralysis', '[refresh]');
		},
		onEnd(target) {
			this.add('-end', target, 'Paralysis');
		},
		onModifySpePriority: -101,
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'Paralysis');
				return false;
			}
		},
	},
	plapoison: {
		name: 'Poison',
		durationCallback(target, source, sourceEffect) {
			return statusDuration(sourceEffect);
		},
		onStart(target) {
			this.add('-start', target, 'Poison');
		},
		onSetStatus() { return false; },
		onRestart(target, source, sourceEffect) {
			refreshStatus(target, 'plapoison', sourceEffect);
			this.add('-start', target, 'Poison', '[refresh]');
		},
		onEnd(target) {
			this.add('-end', target, 'Poison');
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	plapowerboost: {
		name: 'Power Boost',
		durationCallback(target, source, sourceEffect) { return statDuration(sourceEffect); },
		onRestart(target, source, sourceEffect) { refreshStat(target, 'plapowerboost', sourceEffect); },
		onModifyAtk() { return this.chainModify(1.5); },
		onModifySpA() { return this.chainModify(1.5); },
	},
	plaguardboost: {
		name: 'Guard Boost',
		durationCallback(target, source, sourceEffect) { return statDuration(sourceEffect); },
		onRestart(target, source, sourceEffect) { refreshStat(target, 'plaguardboost', sourceEffect); },
		onModifyDef() { return this.chainModify(1.5); },
		onModifySpD() { return this.chainModify(1.5); },
	},
	plapowerdrop: {
		name: 'Power Drop',
		durationCallback(target, source, sourceEffect) { return statDuration(sourceEffect); },
		onRestart(target, source, sourceEffect) { refreshStat(target, 'plapowerdrop', sourceEffect); },
		onModifyAtk() { return this.chainModify(2 / 3); },
		onModifySpA() { return this.chainModify(2 / 3); },
	},
	plaguarddrop: {
		name: 'Guard Drop',
		durationCallback(target, source, sourceEffect) { return statDuration(sourceEffect); },
		onRestart(target, source, sourceEffect) { refreshStat(target, 'plaguarddrop', sourceEffect); },
		onModifyDef() { return this.chainModify(2 / 3); },
		onModifySpD() { return this.chainModify(2 / 3); },
	},
	plaobscured: {
		name: 'Obscured', duration: 4,
		onRestart(target, source, sourceEffect) { refreshStat(target, 'plaobscured', sourceEffect); },
		onModifyAccuracy(accuracy) { return this.chainModify(3 / 4); },
	},
	plaprimed: {
		name: 'Primed', duration: 3,
		onRestart(target, source, sourceEffect) { refreshStat(target, 'plaprimed', sourceEffect); },
		onModifyDamage() { return this.chainModify(1.5); },
	},
	placritboost: {
		name: 'Critical Hit Boost', duration: 3,
		onRestart(target, source, sourceEffect) { refreshStat(target, 'placritboost', sourceEffect); },
		onModifyCritRatio(critRatio) { return critRatio + 1; },
	},
	plasplinters: {
		name: 'Splinters', duration: 3,
		onStart(target, source, sourceEffect) {
			this.effectState.type = sourceEffect?.type || 'Rock';
			this.add('-start', target, `Splinters${this.effectState.duration}`);
		},
		onRestart(target, source, sourceEffect) {
			target.volatiles['plasplinters'].duration = 3;
			target.volatiles['plasplinters'].type = sourceEffect?.type || 'Rock';
			this.add('-start', target, 'Splinters3');
		},
		onEnd(target) { this.add('-end', target, 'Splinters'); },
		onResidualOrder: 10,
		onResidual(pokemon) {
			const source = this.effectState.source as Pokemon;
			if (!source?.hp) return;
			const duration = pokemon.volatiles['plasplinters'].duration;
			this.add('-start', pokemon, `Splinters${duration}`);
			const move = this.dex.getActiveMove({
				id: 'splinters', name: 'Splinters', effectType: 'Move', basePower: 25,
				category: 'Physical', type: this.effectState.type, accuracy: true, pp: 1,
				priority: 0, target: 'normal', noDamageVariance: true,
			});
			const damage = this.actions.getDamage(source, pokemon, move, true);
			if (damage) this.damage(damage, pokemon, source, move);
		},
	},
	plaregigigasslowstart: {
		name: 'Slow Start',
		duration: 5,
		onStart(target) { this.add('-start', target, 'Slow Start'); },
		onEnd(target) { this.add('-end', target, 'Slow Start'); },
		onModifyAtk() { return this.chainModify(0.5); },
		onModifySpe() { return this.chainModify(0.5); },
	},
};
