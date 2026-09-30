'use strict';

const assert = require('assert').strict;
const { Dex } = require('../../../dist/sim/dex');
const { TeamValidator } = require('../../../dist/sim/team-validator');

describe('[Gen 3] Colo-Only Doubles TM Clause', () => {
	const dex = Dex.mod('gen3colodoubles');
	it('enforces the same level boundary for Damp Quagsire', () => {
		const sets = [
			{ species: 'Quagsire', ability: 'Damp', level: 30, moves: ['Earthquake'] },
			{ species: 'Granbull', moves: ['Earthquake'] },
		];
		assert.deepEqual(validateSets(sets), [
			'TM Clause: Earthquake has only one obtainable TM, but is required by Quagsire, Granbull.',
		]);
		sets[0].level = 42;
		assert.equal(validateSets(sets), null);
	});

	function validateSets(sets) {
		const team = [
			...sets,
			{ species: 'Espeon', moves: ['Protect'] },
			{ species: 'Umbreon', moves: ['Protect'] },
		].map(set => ({
			ability: dex.species.get(set.species).abilities[0], nature: 'Hardy', evs: { hp: 4 }, ...set,
		}));
		return new TeamValidator('gen3coloonlydoubles').validateTeam(team);
	}

	// Independent inventory: every finite Colosseum TM must reject two TM-dependent users.
	const finiteTMPairs = [
		['Focus Punch', 'Pikachu', 'Quilava'],
		['Dragon Claw', 'Feraligatr', 'Flygon'],
		['Roar', 'Quilava', 'Croconaw'],
		['Toxic', 'Pikachu', 'Bayleef'],
		['Hail', 'Croconaw', 'Qwilfish'],
		['Sunny Day', 'Togetic', 'Jumpluff'],
		['Taunt', 'Granbull', 'Sudowoodo'],
		['Rain Dance', 'Pikachu', 'Togetic'],
		['Giga Drain', 'Bayleef', 'Ariados'],
		['Solar Beam', 'Togetic', 'Jumpluff'],
		['Iron Tail', 'Pikachu', 'Bayleef'],
		['Earthquake', 'Meganium', 'Typhlosion'],
		['Return', 'Pikachu', 'Bayleef'],
		['Shadow Ball', 'Togetic', 'Granbull'],
		['Brick Break', 'Pikachu', 'Quilava'],
		['Sludge Bomb', 'Granbull', 'Qwilfish'],
		['Sandstorm', 'Hitmontop', 'Magcargo'],
		['Torment', 'Granbull', 'Murkrow'],
		['Rest', 'Pikachu', 'Bayleef'],
		['Attract', 'Pikachu', 'Bayleef'],
		['Thief', 'Granbull', 'Hitmontop'],
		['Steel Wing', 'Togetic', 'Vibrava'],
		['Skill Swap', 'Misdreavus', 'Stantler'],
		['Snatch', 'Aipom', 'Murkrow'],
	];
	for (const [move, first, second] of finiteTMPairs) {
		it(`enforces the finite ${move} TM across species`, () => {
			for (const user of [first, second]) {
				assert.equal(validateSets([
					{ species: first, moves: [user === first ? move : 'Protect'] },
					{ species: second, moves: [user === second ? move : 'Protect'] },
				]), null);
			}
			assert.deepEqual(validateSets([
				{ species: first, moves: [move] }, { species: second, moves: [move] },
			]), [
				`TM Clause: ${move} has only one obtainable TM, but is required by ${first}, ${second}.`,
			]);
		});
	}

	// All finite-TM level-up boundaries in this mod, including inherited sources.
	const levelBoundaries = [
		['Bayleef', 'Solar Beam', 55, 'Togetic'],
		['Meganium', 'Solar Beam', 55, 'Togetic'],
		['Vibrava', 'Sandstorm', 49, 'Hitmontop'],
		['Flygon', 'Sandstorm', 49, 'Hitmontop'],
		['Furret', 'Rest', 48, 'Pikachu'],
		['Quagsire', 'Rain Dance', 49, 'Pikachu'],
		['Quagsire', 'Earthquake', 42, 'Meganium'],
		['Tyranitar', 'Earthquake', 61, 'Meganium'],
	];
	for (const [species, move, learnLevel, partner] of levelBoundaries) {
		it(`counts ${species}'s ${move} TM only below level ${learnLevel}`, () => {
			assert.equal(validateSets([
				{ species, level: learnLevel - 1, moves: [move] },
				{ species: partner, moves: ['Protect'] },
			]), null);
			assert.deepEqual(validateSets([
				{ species, level: learnLevel - 1, moves: [move] },
				{ species: partner, moves: [move] },
			]), [
				`TM Clause: ${move} has only one obtainable TM, but is required by ${species}, ${partner}.`,
			]);
			assert.equal(validateSets([
				{ species, level: learnLevel, moves: [move] },
				{ species: partner, moves: [move] },
			]), null);
		});
	}

	it('allows repeated use of renewable TMs', () => {
		assert.equal(validateSets([
			{ species: 'Quagsire', moves: ['Protect', 'Ice Beam', 'Blizzard'] },
			{ species: 'Suicune', moves: ['Protect', 'Ice Beam', 'Blizzard'] },
		]), null);
	});

	function validate(level, quagsireMove = 'Earthquake', granbullMove = 'Earthquake', filler = {}) {
		const team = [
			{ species: 'Quagsire', ability: 'Water Absorb', level, moves: [quagsireMove] },
			{ species: 'Granbull', ability: 'Intimidate', moves: [granbullMove] },
			{ species: 'Espeon', ability: 'Synchronize', moves: ['Protect'], ...filler },
			{ species: 'Umbreon', ability: 'Synchronize', moves: ['Protect'] },
		].map(set => ({ nature: 'Hardy', evs: { hp: 4 }, ...set }));
		return new TeamValidator('gen3coloonlydoubles').validateTeam(team);
	}

	for (const level of [30, 41]) {
		it(`counts level ${level} Quagsire's Earthquake against the TM limit`, () => {
			assert.equal(validate(level, 'Earthquake', 'Protect'), null);
			assert.deepEqual(validate(level), [
				'TM Clause: Earthquake has only one obtainable TM, but is required by Quagsire, Granbull.',
			]);
		});
	}

	for (const level of [42, 100]) {
		it(`allows level ${level} Quagsire to learn Earthquake without the TM`, () => {
			assert.equal(validate(level), null);
		});
	}

	it('applies the level requirement to other finite TMs', () => {
		assert.deepEqual(validate(48, 'Rain Dance', 'Rain Dance'), [
			'TM Clause: Rain Dance has only one obtainable TM, but is required by Quagsire, Granbull.',
		]);
		assert.equal(validate(49, 'Rain Dance', 'Rain Dance'), null);
	});

	it('preserves event-move exemptions', () => {
		assert.equal(validate(30, 'Protect', 'Roar', {
			species: 'Quilava', ability: 'Blaze', moves: ['Roar'],
		}), null);
	});
});
