import RandomGen4Teams from '../gen4/teams';
import { Teams } from '../../../sim/teams';
import { sampleTeamTexts } from './sample-teams';

// Parse lazily so the Dex is loaded before a battle first requests a team.
let sampleTeams: PokemonSet[][] | null = null;

export class RandomDPPTeams extends RandomGen4Teams {
	override randomTeam(): RandomTeamsTypes.RandomSet[] {
		sampleTeams ||= sampleTeamTexts.map(text => Teams.import(text)!);
		// Use the battle PRNG so a seeded battle reproduces its team assignment.
		const team = structuredClone(this.sample(sampleTeams)).map(set => ({
			...set,
			name: set.species,
			gender: set.gender || '',
			level: this.adjustLevel || 100,
			shiny: this.randomChance(1, 8192),
		}));
		for (const set of team) {
			// Imports default omitted IVs to 31. Supply the declared Hidden Power
			// type when those IVs do not match, as validation does for pasted teams.
			const hpMove = set.moves.find(move => move.startsWith('Hidden Power'));
			if (hpMove) {
				const hpType = hpMove.slice('Hidden Power '.length).replace(/[[\]]/g, '').trim();
				const type = this.dex.types.get(hpType);
				if (type.exists && this.dex.getHiddenPower(set.ivs).type !== type.name) {
					set.ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...type.HPivs };
				}
			}
		}
		return team;
	}
}

export default RandomDPPTeams;
