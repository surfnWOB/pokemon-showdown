'use strict';

const assert = require('../assert');
const { Dex, Teams, TeamValidator } = require('../../dist/sim');
const { sampleTeamTexts } = require('../../dist/data/random-battles/gen3strb/sample-teams');

const FORMAT = 'gen3ousampleteamrandbats';

function roster(team) {
	return team.map(set => set.species).sort().join(',');
}

// Exercise every entry, including the end of the pool, without relying on random coverage.
function generateEntry(generator, index) {
	const random = Math.random;
	try {
		Math.random = () => (index + 0.5) / sampleTeamTexts.length;
		return generator.randomTeam();
	} finally {
		Math.random = random;
	}
}

describe('[Gen 3] OU Sample Team Randbats', () => {
	const samples = sampleTeamTexts.map(text => Teams.import(text));

	it('contains all 54 Revival entries and the three forum-only rosters', () => {
		assert.equal(samples.length, 57);
		for (const team of samples) assert.equal(team.length, 6);
		assert.equal(new Set(samples.map(roster)).size, 55);

		for (const species of [
			['Tyranitar', 'Forretress', 'Dugtrio', 'Blissey', 'Swampert', 'Gengar'],
			['Suicune', 'Dugtrio', 'Blissey', 'Claydol', 'Snorlax', 'Forretress'],
			['Tyranitar', 'Swampert', 'Registeel', 'Celebi', 'Raikou', 'Salamence'],
		]) {
			const matches = samples.filter(team => roster(team) === species.sort().join(','));
			assert.equal(matches.length, 1, `missing or duplicated forum-only roster: ${species}`);
		}
	});

	it('keeps the Revival Big 5 lead and sets without a second forum version', () => {
		const species = ['Tyranitar', 'Skarmory', 'Blissey', 'Swampert', 'Gengar', 'Starmie'];
		const matches = samples.filter(team => roster(team) === species.sort().join(','));
		assert.equal(matches.length, 1);
		assert.equal(matches[0][0].species, 'Tyranitar');
		const gengar = matches[0].find(set => set.species === 'Gengar');
		assert(gengar.moves.includes('Fire Punch'));
		assert(gengar.moves.includes('Giga Drain'));
	});

	it('retains both Revival alternatives when their six species overlap', () => {
		for (const [species, leads] of [
			[
				['Jirachi', 'Metagross', 'Salamence', 'Swampert', 'Tyranitar', 'Zapdos'],
				['Tyranitar', 'Zapdos'],
			],
			[
				['Cloyster', 'Gengar', 'Jolteon', 'Metagross', 'Swampert', 'Tyranitar'],
				['Swampert', 'Tyranitar'],
			],
		]) {
			const matches = samples.filter(team => roster(team) === species.sort().join(','));
			assert.deepEqual(matches.map(team => team[0].species).sort(), leads);
		}
	});

	it('generates every sample with its source order and legal sets under the format rules', () => {
		const format = Dex.formats.get(FORMAT);
		const generator = Teams.getGenerator(format, [1, 2, 3, 4]);
		// Disable only the supplied-team rejection; validate the actual randbats rules.
		const validator = new TeamValidator({ ...format, team: undefined });
		for (const [index, sample] of samples.entries()) {
			const team = generateEntry(generator, index);
			assert.deepEqual(team.map(set => set.species), sample.map(set => set.species));
			for (const [slot, set] of team.entries()) {
				assert.equal(set.level, 100);
				assert.equal(set.item, sample[slot].item);
				assert.equal(set.ability, sample[slot].ability);
				assert.equal(set.nature, sample[slot].nature);
				assert.deepEqual(set.moves, sample[slot].moves);
				assert.deepEqual(set.evs, sample[slot].evs);
			}
			// Validation normalizes sets in place; do not mutate the generator's cached samples.
			const problems = validator.validateTeam(structuredClone(team));
			assert(!problems, `sample ${index + 1}: ${problems}`);
		}
	});

	it('honors Adjust Level for every sample', () => {
		const generator = Teams.getGenerator(`${FORMAT}@@@Adjust Level = 50`, [1, 2, 3, 4]);
		for (const index of samples.keys()) {
			assert(generateEntry(generator, index).every(set => set.level === 50));
		}
	});
});
