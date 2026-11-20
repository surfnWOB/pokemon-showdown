'use strict';

const assert = require('../../assert');
const common = require('../../common');
const { Dex } = require('../../../dist/sim');

describe('[Gen 3] RNGless', () => {
	let battle;
	afterEach(() => {
		battle?.destroy();
		battle = null;
	});

	function create(formatid = 'gen3rngless', ability = 'Synchronize', targetAbility = 'Synchronize') {
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
			const target = create('gen3rngless', 'Merciless');
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
			assert.equal(critical(create('gen3rngless', 'Merciless', ability), true), false);
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

	it('updates move accuracy and removes the two secondary effects only in RNGless', () => {
		const es = Dex.mod('gen3rngless');
		const gen3 = Dex.mod('gen3');
		for (const id of ['meteormash', 'rockslide', 'toxic', 'willowisp']) {
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

	it('uses normal ADV learnsets, without granting or requiring Extreme Speed', () => {
		const set = { species: 'Magikarp', ability: 'Swift Swim', moves: ['splash'], evs: { hp: 1 } };
		assert.legalTeam([set], 'gen3rngless');
		assert.false.legalTeam([{ ...set, moves: ['extremespeed'] }], 'gen3rngless');
		assert.false.legalTeam([{ species: 'Mewtwo', ability: 'Pressure', moves: ['psychic'], evs: { hp: 1 } }], 'gen3rngless');
		const format = Dex.formats.get('gen3rngless');
		assert.equal(format.searchShow, false);
		assert.equal(format.challengeShow, true);
	});

	it('preserves the full inherited data of Crunch, Fire Punch, and Flamethrower', () => {
		for (const id of ['crunch', 'firepunch', 'flamethrower']) {
			const move = Dex.mod('gen3rngless').moves.get(id);
			const original = Dex.mod('gen3').moves.get(id);
			for (const key of ['name', 'type', 'basePower', 'accuracy', 'pp', 'category', 'target']) {
				assert.equal(move[key], original[key], `${id}: ${key}`);
			}
			assert(!move.secondaries?.length);
			assert(original.secondaries?.length);
		}
		assert.equal(Dex.mod('gen3rngless').moves.get('meteormash').basePower, 90);
		assert.equal(Dex.mod('gen3').moves.get('meteormash').basePower, 100);
		assert(Dex.mod('gen3rngless').moves.get('icebeam').secondaries?.length);
	});

	for (const ability of ['Cute Charm', 'Effect Spore', 'Flame Body', 'Poison Point', 'Static']) {
		it(`disables ${ability}'s contact effect even when random rolls succeed`, () => {
			create('gen3rngless', 'Synchronize', ability);
			const attacker = battle.p1.active[0];
			const target = battle.p2.active[0];
			attacker.gender = 'M';
			target.gender = 'F';
			battle.actions.useMove('tackle', attacker, target);
			assert.equal(attacker.status, '');
			assert(!attacker.volatiles.attract);
		});
	}

	it('retains Hustle Attack without the accuracy penalty', () => {
		const target = create('gen3rngless', 'Hustle');
		const attacker = battle.p1.active[0];
		const move = battle.dex.getActiveMove('tackle');
		assert.equal(battle.runEvent('ModifyAccuracy', target, attacker, move, 100), 100);
		assert.equal(battle.runEvent('ModifyAtk', attacker, target, move, 100), 150);
	});

	it('retains Sand Veil sand immunity but not evasion', () => {
		const target = create('gen3rngless', 'Synchronize', 'Sand Veil');
		battle.field.setWeather('sandstorm', target);
		assert.equal(battle.runEvent('ModifyAccuracy', target, battle.p1.active[0], battle.dex.getActiveMove('tackle'), 100), 100);
		const hp = target.hp;
		battle.makeChoices('move splash', 'move recover');
		assert.equal(target.hp, hp);
	});

	it('does not double remaining secondaries with Serene Grace', () => {
		const target = create('gen3rngless', 'Serene Grace');
		const move = battle.dex.getActiveMove('icebeam');
		const modified = battle.runEvent('ModifyMove', battle.p1.active[0], target, move, move);
		assert.equal(modified.secondaries[0].chance, 10);
	});

	it('does not cure status with Shed Skin', () => {
		const target = create('gen3rngless', 'Synchronize', 'Shed Skin');
		target.setStatus('par');
		battle.makeChoices('move splash', 'move recover');
		assert.equal(target.status, 'par');
	});

	for (const item of ['Bright Powder', 'Lax Incense']) {
		it(`removes ${item}'s accuracy effect`, () => {
			const target = create();
			target.setItem(item);
			assert.equal(battle.runEvent('ModifyAccuracy', target, battle.p1.active[0], battle.dex.getActiveMove('tackle'), 100), 100);
		});
	}

	it('does not survive lethal damage with Focus Band', () => {
		const target = create();
		target.setItem('focusband');
		target.hp = 1;
		battle.actions.useMove('tackle', battle.p1.active[0], target);
		assert.equal(target.hp, 0);
	});

	it("does not add a flinch chance with King's Rock", () => {
		const target = create();
		const attacker = battle.p1.active[0];
		attacker.setItem('kingsrock');
		const move = battle.dex.getActiveMove('tackle');
		const modified = battle.runEvent('ModifyMove', attacker, target, move, move);
		assert(!modified.secondaries?.length);
	});

	it('disables Quick Claw in Gen 3 action ordering', () => {
		create();
		const attacker = battle.p1.active[0];
		attacker.setItem('quickclaw');
		battle.quickClawRoll = true;
		assert.equal(attacker.getActionSpeed(), attacker.getStat('spe'));
		battle.makeChoices('move splash', 'move recover');
		const moves = battle.log.filter(line => line.startsWith('|move|'));
		assert(moves[0].includes('p2a:'), 'The naturally faster Pokemon should act first');
	});

	for (const [item, nature] of [['Figy Berry', 'Modest'], ['Iapapa Berry', 'Lonely'], ['Mago Berry', 'Brave']]) {
		it(`heals with ${item} without confusing a Pokemon that dislikes its flavor`, () => {
			const target = create();
			target.set.nature = nature;
			target.setItem(item);
			target.hp = Math.floor(target.maxhp / 2);
			const hp = target.hp;
			battle.actions.useMove('splash', target);
			assert.equal(target.item, Dex.toID(item));
			battle.makeChoices('move splash', 'move protect');
			assert.equal(target.item, '');
			assert.equal(target.hp, hp + Math.floor(target.baseMaxhp / 8));
			assert(!target.volatiles.confusion);
		});
	}
});
