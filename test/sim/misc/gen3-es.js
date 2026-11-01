'use strict';

const assert = require('../../assert');
const common = require('../../common');
const { Dex } = require('../../../dist/sim');

describe('[Gen 3] ADV ES V4', () => {
	let battle;
	afterEach(() => {
		battle?.destroy();
		battle = null;
	});

	function create(formatid = 'gen3adves', ability = 'Synchronize', targetAbility = 'Synchronize') {
		battle = common.createBattle({ formatid, forceRandomChance: true }, [[
			{ species: 'Mew', ability, moves: ['tackle', 'splash'], ivs: { spe: 0 } },
		], [
			{ species: 'Mew', ability: targetAbility, moves: ['recover', 'rest', 'wish', 'protect'] },
			{ species: 'Celebi', ability: 'Natural Cure', moves: ['splash'] },
		]]);
		return battle.p2.active[0];
	}

	function critical(target, willCrit) {
		const move = battle.dex.getActiveMove('tackle');
		if (willCrit !== undefined) move.willCrit = willCrit;
		battle.actions.getDamage(battle.p1.active[0], target, move);
		return target.getMoveHitData(move).crit;
	}

	it('blocks ordinary crits until the target has positive Defense or Special Defense', () => {
		const target = create();
		assert.equal(critical(target), false);
		for (const stat of ['def', 'spd']) {
			target.boosts[stat] = 1;
			assert.equal(critical(target), true);
			target.boosts[stat] = -1;
			assert.equal(critical(target), false);
			target.boosts[stat] = 0;
		}
	});

	for (const move of ['recover', 'rest', 'wish']) {
		it(`allows crits after using ${move}, and resets healing history on switching`, () => {
			const target = create();
			target.hp -= 50;
			battle.actions.useMove(move, target);
			assert.equal(critical(target), true);
			battle.makeChoices('move splash', 'switch 2');
			battle.makeChoices('move splash', 'switch 2');
			assert.equal(critical(target), false);
		});
	}

	it('counts a healing move attempted at full HP', () => {
		const target = create();
		battle.actions.useMove('recover', target);
		assert.equal(critical(target), true);
	});

	it('does not count passive recovery or receiving a passed Wish', () => {
		create();
		battle.makeChoices('move splash', 'move wish');
		battle.makeChoices('move splash', 'switch 2');
		const target = battle.p2.active[0];
		assert.equal(critical(target), false);
		target.hp -= 50;
		battle.heal(25, target, target, battle.dex.items.get('leftovers'));
		assert.equal(critical(target), false);
	});

	it('permits guaranteed crits without boosts or healing', () => {
		assert.equal(critical(create(), true), true);
	});

	for (const status of ['psn', 'tox']) {
		it(`guarantees Merciless crits against ${status}`, () => {
			const target = create('gen3adves', 'Merciless');
			battle.forceRandomChance = false;
			target.status = status;
			assert.equal(critical(target), true);
			assert.equal(critical(target, false), false);
			target.status = '';
			assert.equal(critical(target), false);
		});
	}

	for (const ability of ['Battle Armor', 'Shell Armor']) {
		it(`preserves ${ability}'s crit immunity`, () => {
			assert.equal(critical(create('gen3adves', 'Merciless', ability), true), false);
		});
	}

	it('retains the paralysis Speed penalty without full paralysis', () => {
		const target = create();
		const speed = target.getStat('spe');
		target.setStatus('par');
		assert.equal(target.getStat('spe'), Math.floor(speed / 4));
		for (let i = 0; i < 4; i++) battle.makeChoices('move splash', 'move recover');
		assert(!battle.log.some(line => line.includes('|cant|') && line.endsWith('|par')));
		assert(target.m.usedHealingMove);
	});

	it('thaws a frozen Pokemon before it acts', () => {
		const target = create();
		target.setStatus('frz');
		battle.forceRandomChance = false;
		battle.makeChoices('move splash', 'move recover');
		assert.equal(target.status, '');
		assert(target.m.usedHealingMove);
	});

	it('never self-hits in confusion and still lets confusion expire', () => {
		const target = create();
		target.addVolatile('confusion');
		target.volatiles.confusion.time = 3;
		const hp = target.hp;
		for (let i = 0; i < 3; i++) battle.makeChoices('move splash', 'move recover');
		assert.equal(target.hp, hp);
		assert(!target.volatiles.confusion);
		assert(!battle.log.some(line => line.includes('[from] confusion')));
	});

	it('makes repeated Protect alternate success and failure', () => {
		create();
		const protectedTurns = [];
		for (let i = 0; i < 4; i++) {
			const start = battle.log.length;
			battle.makeChoices('move tackle', 'move protect');
			protectedTurns.push(battle.log.slice(start).some(line => line.includes('|-activate|') && line.includes('|Protect')));
		}
		assert.deepEqual(protectedTurns, [true, false, true, false]);
	});

	it('updates move accuracy and removes the two secondary effects only in ADV ES', () => {
		const es = Dex.mod('gen3es');
		const gen3 = Dex.mod('gen3');
		for (const id of ['meteormash', 'rockslide', 'toxic']) {
			assert.equal(es.moves.get(id).accuracy, 100);
			assert.notEqual(gen3.moves.get(id).accuracy, 100);
		}
		for (const id of ['meteormash', 'rockslide']) {
			assert(!es.moves.get(id).secondaries?.length);
			assert(gen3.moves.get(id).secondaries.length);
		}
		assert.equal(es.conditions.get('slp').onStart, gen3.conditions.get('slp').onStart);
	});

	it('leaves normal Gen 3 critical hits unchanged', () => {
		assert.equal(critical(create('gen3customgame')), true);
	});

	it('keeps Extreme Speed mandatory and universally learnable', () => {
		const set = { species: 'Magikarp', ability: 'Swift Swim', moves: ['extremespeed'], evs: { hp: 1 } };
		assert.legalTeam([set], 'gen3adves');
		assert.false.legalTeam([{ ...set, moves: ['splash'] }], 'gen3adves');
		for (const species of Dex.mod('gen3').species.all()) {
			if (species.gen > 3 || species.forme || species.isNonstandard) continue;
			const sources = Dex.mod('gen3es').species.getFullLearnset(species.id);
			assert(sources.some(data => data.learnset.extremespeed), species.name);
		}
	});
});
