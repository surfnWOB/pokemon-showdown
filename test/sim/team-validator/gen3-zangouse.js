'use strict';

const assert = require('../../assert');
const { TeamValidator } = require('../../../dist/sim/team-validator');

describe('Gen 3 ZangOuSe breeding legality', () => {
	it('should allow Weezing to inherit Will-O-Wisp and Pain Split together', () => {
		for (const format of ['gen3ou', 'gen3zangouse']) {
			assert.legalTeam([
				{ species: 'Weezing', ability: 'Levitate', moves: ['willowisp', 'painsplit'], evs: { hp: 1 } },
			], format);
		}
	});

	it('should still reject moves Weezing cannot learn', () => {
		assert.false.legalTeam([
			{ species: 'Weezing', ability: 'Levitate', moves: ['surf'], evs: { hp: 1 } },
		], 'gen3zangouse');
	});

	it('should still reject genuinely incompatible egg moves', () => {
		for (const format of ['gen3ou', 'gen3zangouse']) {
			assert.false.legalTeam([
				{ species: 'Bulbasaur', ability: 'Overgrow', moves: ['charm', 'curse'], evs: { hp: 1 } },
			], format);
		}
	});

	it('should enforce the existing roster across every base Gen 3 species', () => {
		const validator = new TeamValidator('gen3zangouse');
		for (const species of validator.dex.species.all()) {
			if (species.gen > 3 || species.forme) continue;
			const set = { species: species.name, name: species.name };
			const problem = validator.checkSpecies(set, species, species, {});
			assert.equal(!!problem, species.tier === 'Illegal', species.name);
		}
	});

	it('should keep excluded breeding parents off teams', () => {
		for (const [species, ability, moves] of [
			['Dusclops', 'Pressure', ['willowisp', 'painsplit']],
			['Smeargle', 'Own Tempo', ['spore']],
		]) {
			assert.legalTeam([{ species, ability, moves, evs: { hp: 1 } }], 'gen3ou');
			assert.false.legalTeam([{ species, ability, moves, evs: { hp: 1 } }], 'gen3zangouse');
		}
	});
});
