'use strict';

const assert = require('assert').strict;
const { TeamValidator } = require('../../../dist/sim/team-validator');

describe('[Gen 3] Colo-Only Doubles evolution events', () => {
	function validate(species, ability, moves, overrides = {}) {
		return new TeamValidator('gen3coloonlydoubles').validateSet({
			species, ability, moves, nature: 'Bold', gender: 'M', level: 100,
			evs: { hp: 4 }, ...overrides,
		});
	}

	for (const [species, ability, move] of [
		['Flaaffy', 'Static', 'Thunderbolt'],
		['Togetic', 'Serene Grace', 'Psychic'],
	]) {
		it(`allows ${species} TM-only sets without pre-evolution event restrictions`, () => {
			assert.equal(validate(species, ability, [move, 'Protect', 'Rest', 'Toxic']), null);
		});
	}

	for (const [species, ability, move, nature] of [
		['Mareep', 'Static', 'Thunderbolt', 'Mild'],
		['Togepi', 'Serene Grace', 'Psychic', 'Sassy'],
	]) {
		it(`preserves ${species}'s event restrictions`, () => {
			const moves = [move, 'Protect', 'Rest', 'Toxic'];
			const problems = validate(species, ability, moves);
			assert(problems?.some(problem => problem.includes(`${nature} nature`)));
			assert.equal(validate(species, ability, moves, {
				nature, gender: 'F', ivs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
			}), null);
		});
	}
});
