'use strict';

const assert = require('../../assert');
const { Battle, Dex } = require('../../../dist/sim');
const { Format } = require('../../../dist/sim/dex-formats');

describe('Shadow Storm (Shadow Colosseum DX)', () => {
	for (const shadow of [false, true]) {
		it(`should calculate damage against a ${shadow ? 'Shadow' : 'normal'} target`, () => {
			const format = new Format({ ...Dex.formats.get('gen3customgame'), mod: 'gen3shadowcolosseumdx' });
			const battle = new Battle({
				format, seed: [1, 2, 3, 4],
				p1: { team: [{ species: 'Espeon', ability: 'Synchronize', moves: ['shadowstorm'] }] },
				p2: { team: [{ species: 'Snorlax', ability: 'Immunity', moves: ['splash'] }] },
			});
			try {
				const source = battle.p1.active[0];
				const target = battle.p2.active[0];
				if (shadow) target.addVolatile('shadow');
				const damage = battle.actions.getDamage(source, target, 'shadowstorm');
				assert(typeof damage === 'number' && damage > 0, 'Shadow Storm must calculate positive damage');
			} finally {
				battle.destroy();
			}
		});
	}
});
