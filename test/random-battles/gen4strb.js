'use strict';

const assert = require('../assert');
const { Dex, Teams, TeamValidator, Battle } = require('../../dist/sim');
const { sampleTeamTexts } = require('../../dist/data/random-battles/gen4strb/sample-teams');

const FORMAT = 'gen4ousampleteamrandbats';

function generateEntry(generator, index) {
	const sample = generator.sample;
	try {
		generator.sample = teams => teams[index];
		return generator.randomTeam();
	} finally {
		generator.sample = sample;
	}
}

describe('[Gen 4] OU Sample Team Randbats', () => {
	it('exposes a ladderable DPP format with the current OU rules', () => {
		const format = Dex.formats.get(FORMAT);
		assert(format.exists);
		assert.equal(format.mod, 'gen4strb');
		assert.equal(format.team, 'random');
		assert(format.searchShow && format.challengeShow && format.rated);
		const rules = Dex.formats.getRuleTable(format);
		assert(rules.has('sleepmovesclause'));
		assert(!rules.has('teampreview'));
		for (const rule of Dex.formats.getRuleTable(Dex.formats.get('gen4ou')).keys()) {
			assert(rules.has(rule), rule);
		}
	});

	it('generates all 13 current samples with legal sets and their source leads', () => {
		const samples = sampleTeamTexts.map(text => Teams.import(text));
		assert.equal(samples.length, 13);
		const generator = Teams.getGenerator(FORMAT, [1, 2, 3, 4]);
		const validator = new TeamValidator({ ...Dex.formats.get(FORMAT), team: undefined });
		assert.deepEqual(samples.map(team => team[0].species), [
			'Azelf', 'Latias', 'Empoleon', 'Skarmory', 'Skarmory', 'Skarmory', 'Uxie',
			'Zapdos', 'Hippowdon', 'Bronzong', 'Tyranitar', 'Hippowdon', 'Latias',
		]);
		for (const [index, sample] of samples.entries()) {
			const team = generateEntry(generator, index);
			assert.equal(team.length, 6);
			assert.deepEqual(team.map(set => set.species), sample.map(set => set.species));
			for (const [slot, set] of team.entries()) {
				assert.equal(set.level, 100);
				for (const key of ['item', 'ability', 'nature', 'moves', 'evs', 'gender']) {
					assert.deepEqual(set[key], sample[slot][key], `sample ${index + 1}, slot ${slot + 1}: ${key}`);
				}
				for (const move of set.moves.filter(move => move.startsWith('Hidden Power'))) {
					assert.equal(generator.dex.getHiddenPower(set.ivs).type, move.slice(13).replace(/[[\]]/g, ''));
				}
			}
			assert.equal(validator.validateTeam(structuredClone(team)), null, `sample ${index + 1}`);
		}
	});

	it('reproduces team assignments from the battle seed', () => {
		for (let i = 0; i < 10; i++) {
			const seed = [i, 2, 3, 4];
			assert.deepEqual(Teams.generate(FORMAT, { seed }), Teams.generate(FORMAT, { seed }));
		}
	});

	it('isolates generated sets from the cached samples', () => {
		const generator = Teams.getGenerator(FORMAT, [1, 2, 3, 4]);
		const team = generateEntry(generator, 0);
		team[0].moves.length = 0;
		team[0].evs.atk = 0;
		team[0].ivs.spe = 0;
		const fresh = generateEntry(generator, 0);
		const source = Teams.import(sampleTeamTexts[0]);
		assert.deepEqual(fresh[0].moves, source[0].moves);
		assert.deepEqual(fresh[0].evs, source[0].evs);
		assert.equal(fresh[0].ivs.spe, source[0].ivs.spe);
	});

	it('honors Adjust Level for every sample', () => {
		const generator = Teams.getGenerator(`${FORMAT}@@@Adjust Level = 50`, [1, 2, 3, 4]);
		for (const index of sampleTeamTexts.keys()) {
			assert(generateEntry(generator, index).every(set => set.level === 50));
		}
	});

	it('starts a battle with two generated samples and plays a turn', () => {
		const battle = new Battle({ formatid: FORMAT, seed: [1, 2, 3, 4] });
		try {
			battle.setPlayer('p1', { name: 'Alice', seed: [1, 2, 3, 4] });
			battle.setPlayer('p2', { name: 'Bob', seed: [5, 6, 7, 8] });
			assert.equal(battle.gen, 4);
			assert.equal(battle.p1.pokemon.length, 6);
			assert.equal(battle.p2.pokemon.length, 6);
			assert.equal(battle.turn, 1);
			battle.makeChoices('move 1', 'move 1');
			assert(!battle.log.some(line => line.startsWith('|error|')));
			assert(battle.log.some(line => line.startsWith('|move|')));
		} finally {
			battle.destroy();
		}
	});
});
