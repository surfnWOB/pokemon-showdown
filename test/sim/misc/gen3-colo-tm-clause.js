'use strict';

const assert = require('assert').strict;
const { TeamValidator } = require('../../../dist/sim/team-validator');

describe('[Gen 3] Colo-Only Doubles TM Clause', () => {
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
