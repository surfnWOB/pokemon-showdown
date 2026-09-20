import RandomGen4Teams from '../gen4/teams';
import { Teams } from '../../../sim/teams';
import { sampleTeamTexts } from './sample-teams';

// Parse lazily so the Dex is loaded before a battle first requests a team.
let sampleTeamsData: PokemonSet[][] | null = null;
function getSampleTeams(): PokemonSet[][] {
	if (!sampleTeamsData) {
		sampleTeamsData = sampleTeamTexts
			.map(text => Teams.import(text))
			.filter((team): team is PokemonSet[] => !!team && team.length > 0);
	}
	return sampleTeamsData;
}

function randomIntFromInterval(max: number) {
	return Math.floor(Math.random() * (max));
}

export class RandomGen3Teams extends RandomGen4Teams {
	override randomTeam() {
		const teams = getSampleTeams();
		const selectedTeam = teams[randomIntFromInterval(teams.length)];
		const members = [];
		for (const member of selectedTeam) {
			const set = {
				...member,
				name: member.species,
				// Honor value rules such as "Adjust Level"; default to 100 otherwise.
				level: this.adjustLevel || 100,
				shiny: this.randomChance(1, 8192),
			};
			// Sample sets frequently declare a Hidden Power type but omit (or mis-specify) the
			// matching IV spread, which then fails team validation. Reapply the canonical Gen 3
			// Hidden Power IVs whenever the current IVs don't already produce the declared type.
			const hpMove = set.moves.find(move => move.startsWith('Hidden Power'));
			if (hpMove) {
				const hpType = hpMove.slice('Hidden Power '.length).replace(/[[\]]/g, '').trim();
				const type = this.dex.types.get(hpType);
				if (type.exists && this.dex.getHiddenPower(set.ivs).type !== type.name) {
					set.ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...type.HPivs };
				}
			}
			members.push(set);
		}
		return members;
	}
}

export default RandomGen3Teams;
