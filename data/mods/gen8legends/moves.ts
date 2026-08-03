import { applyPLAStatus } from './conditions';

function applyPLAStat(target: Pokemon, status: string, source: Pokemon, move: ActiveMove) {
	const opposite: { [k: string]: string } = {
		plapowerboost: 'plapowerdrop', plapowerdrop: 'plapowerboost',
		plaguardboost: 'plaguarddrop', plaguarddrop: 'plaguardboost',
	};
	if (opposite[status]) target.removeVolatile(opposite[status]);
	return target.addVolatile(status, source, move);
}

function thawFrostbite(target: Pokemon) {
	if (target.volatiles['plafrostbite']) target.removeVolatile('plafrostbite');
}

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	absorb: {
		inherit: true,
		basePower: 30,
		pp: 20,
		accuracy: 100,
	},

	acidarmor: {
		inherit: true,
		pp: 20,
		accuracy: true,
	},

	acidspray: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
	},

	aerialace: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: true,
	},

	aircutter: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 95,
	},

	airslash: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 95,
	},

	ancientpower: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
		secondary: {
			chance: 100,
			self: {
				onHit(target, source, move) {
					applyPLAStat(target, 'plapowerboost', source, move);
					applyPLAStat(target, 'plaguardboost', source, move);
				},
			},
		},
	},

	aquajet: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
	},

	aquatail: {
		inherit: true,
		basePower: 85,
		pp: 10,
		accuracy: 90,
	},

	astonish: {
		inherit: true,
		basePower: 30,
		pp: 25,
		accuracy: 100,
	},

	aurasphere: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: true,
	},

	babydolleyes: {
		inherit: true,
		pp: 20,
		accuracy: 100,
	},

	barbbarrage: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
		secondary: { chance: 50, onHit(target, source, move) { applyPLAStatus(target, 'plapoison', source, move); } },
	},

	bite: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: 100,
	},

	bittermalice: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } },
	},

	bleakwindstorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		accuracy: 80,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } },
	},

	blizzard: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 75,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } },
	},

	bravebird: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	bubble: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
	},

	bugbuzz: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	bulkup: {
		inherit: true,
		pp: 10,
		accuracy: true,
		boosts: undefined,
		onHit(target, source, move) {
			applyPLAStat(target, 'plapowerboost', source, move);
			return applyPLAStat(target, 'plaguardboost', source, move);
		},
	},

	bulldoze: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: 100,
		secondary: undefined,
	},

	bulletpunch: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
	},

	calmmind: {
		inherit: true,
		pp: 10,
		accuracy: true,
		boosts: undefined,
		onHit(target, source, move) {
			applyPLAStat(target, 'plapowerboost', source, move);
			return applyPLAStat(target, 'plaguardboost', source, move);
		},
	},

	ceaselessedge: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 90,
		secondary: { chance: 100, volatileStatus: 'plasplinters' },
	},

	chargebeam: {
		inherit: true,
		basePower: 50,
		pp: 15,
		accuracy: 90,
	},

	chloroblast: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 95,
	},

	closecombat: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
		self: { onHit(target, source, move) { return applyPLAStat(target, 'plaguarddrop', source, move); } },
	},

	confusion: {
		inherit: true,
		basePower: 50,
		pp: 20,
		accuracy: 100,
	},

	crosspoison: {
		inherit: true,
		basePower: 70,
		pp: 15,
		accuracy: 100,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plapoison', source, move); } },
	},

	crunch: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 100, onHit(target, source, move) { applyPLAStat(target, 'plaguarddrop', source, move); } },
	},

	crushgrip: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	darkpulse: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: true,
		secondary: undefined,
	},

	darkvoid: {
		inherit: true,
		pp: 10,
		accuracy: 90,
		onHit(target, source, move) { return applyPLAStatus(target, 'pladrowsy', source, move); },
	},

	dazzlinggleam: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
	},

	direclaw: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'pladrowsy', source, move); } },
	},

	doubleedge: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	doublehit: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	dracometeor: {
		inherit: true,
		basePower: 110,
		pp: 5,
		accuracy: 90,
	},

	dragonclaw: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	dragonpulse: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: true,
	},

	drainingkiss: {
		inherit: true,
		basePower: 50,
		pp: 15,
		accuracy: 100,
	},

	drainpunch: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
	},

	earthpower: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	ember: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
	},

	energyball: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	esperwing: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 90,
		priority: 1,
		secondary: undefined,
	},

	extrasensory: {
		inherit: true,
		basePower: 70,
		pp: 15,
		accuracy: 100,
	},

	fairywind: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
	},

	falseswipe: {
		inherit: true,
		basePower: 40,
		pp: 30,
		accuracy: 100,
	},

	fireblast: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 85,
	},

	firefang: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 95,
	},

	firepunch: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
	},

	flamethrower: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	flamewheel: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: 100,
		onModifyMove(move, source) { thawFrostbite(source); },
		onHit(target) { thawFrostbite(target); },
	},

	flareblitz: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
		onModifyMove(move, source) { thawFrostbite(source); },
		onHit(target) { thawFrostbite(target); },
	},

	flashcannon: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	focusenergy: {
		inherit: true,
		pp: 20,
		accuracy: true,
	},

	gigaimpact: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 90,
	},

	gust: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
	},

	headlongrush: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	headsmash: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 80,
	},

	hex: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 100,
	},

	hiddenpower: {
		inherit: true,
		basePower: 50,
		pp: 15,
		accuracy: 100,
	},

	highhorsepower: {
		inherit: true,
		basePower: 85,
		pp: 10,
		accuracy: 95,
	},

	hurricane: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 75,
	},

	hydropump: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 85,
	},

	hyperbeam: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 90,
	},

	hypnosis: {
		inherit: true,
		pp: 20,
		accuracy: 70,
		onHit(target, source, move) { return applyPLAStatus(target, 'pladrowsy', source, move); },
	},

	iceball: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 90,
	},

	icebeam: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } },
	},

	icefang: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 95,
		secondaries: [{ chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } }],
	},

	icepunch: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } },
	},

	iceshard: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
	},

	iciclecrash: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 90,
	},

	icywind: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: 95,
	},

	infernalparade: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
	},

	irondefense: {
		inherit: true,
		pp: 20,
		accuracy: true,
	},

	ironhead: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	irontail: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 75,
	},

	judgment: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	leafage: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
	},

	leafblade: {
		inherit: true,
		basePower: 85,
		pp: 10,
		accuracy: 100,
	},

	leafstorm: {
		inherit: true,
		basePower: 110,
		pp: 5,
		accuracy: 90,
	},

	leechlife: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
	},

	liquidation: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	lunarblessing: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	machpunch: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
	},

	magicalleaf: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: true,
	},

	magmastorm: {
		inherit: true,
		basePower: 90,
		pp: 5,
		accuracy: 75,
	},

	megahorn: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 85,
	},

	mimic: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	moonblast: {
		inherit: true,
		basePower: 85,
		pp: 10,
		accuracy: 100,
	},

	mountaingale: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 85,
	},

	mudbomb: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 85,
	},

	mudslap: {
		inherit: true,
		basePower: 30,
		pp: 20,
		accuracy: 100,
	},

	mysticalfire: {
		inherit: true,
		basePower: 70,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 100, onHit(target, source, move) { applyPLAStat(target, 'plapowerdrop', source, move); } },
	},

	mysticalpower: {
		inherit: true,
		basePower: 70,
		pp: 10,
		accuracy: 90,
	},

	nastyplot: {
		inherit: true,
		pp: 20,
		accuracy: true,
		boosts: undefined, onHit(target, source, move) { return applyPLAStat(target, 'plapowerboost', source, move); },
	},

	nightslash: {
		inherit: true,
		basePower: 70,
		pp: 15,
		accuracy: 100,
	},

	octazooka: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 85,
	},

	ominouswind: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
		secondary: {
			chance: 100,
			self: {
				onHit(target, source, move) {
					applyPLAStat(target, 'plapowerboost', source, move);
					applyPLAStat(target, 'plaguardboost', source, move);
				},
			},
		},
	},

	outrage: {
		inherit: true,
		basePower: 90,
		pp: 10,
		accuracy: 85,
	},

	overheat: {
		inherit: true,
		basePower: 110,
		pp: 5,
		accuracy: 90,
	},

	petaldance: {
		inherit: true,
		basePower: 90,
		pp: 10,
		accuracy: 85,
	},

	pinmissile: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		secondary: { chance: 100, volatileStatus: 'plasplinters' },
	},

	playrough: {
		inherit: true,
		basePower: 85,
		pp: 10,
		accuracy: 90,
	},

	poisongas: {
		inherit: true,
		pp: 20,
		accuracy: 90,
		onHit(target, source, move) { return applyPLAStatus(target, 'plapoison', source, move); },
	},

	poisonjab: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plapoison', source, move); } },
	},

	poisonpowder: {
		inherit: true,
		pp: 20,
		accuracy: 80,
		onHit(target, source, move) { return applyPLAStatus(target, 'plapoison', source, move); },
	},

	poisonsting: {
		inherit: true,
		basePower: 30,
		pp: 20,
		accuracy: 100,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plapoison', source, move); } },
	},

	powdersnow: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plafrostbite', source, move); } },
	},

	powergem: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	powershift: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	psychic: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	psychocut: {
		inherit: true,
		basePower: 70,
		pp: 15,
		accuracy: 100,
	},

	psyshieldbash: {
		inherit: true,
		basePower: 70,
		pp: 10,
		accuracy: 90,
	},

	quickattack: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
	},

	ragingfury: {
		inherit: true,
		basePower: 90,
		pp: 10,
		accuracy: 85,
	},

	recover: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	rest: {
		inherit: true,
		pp: 10,
		accuracy: true,
		onTry(source) {
			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
		},
		onHit(target, source, move) {
			const result = applyPLAStatus(target, 'pladrowsy', source, move);
			if (result) this.heal(target.maxhp);
			return result;
		},
	},

	roaroftime: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 90,
	},

	rockslide: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 90,
	},

	rocksmash: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
	},

	rollout: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 90,
	},

	roost: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	sandsearstorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		accuracy: 80,
	},

	seedflare: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 85,
	},

	selfdestruct: {
		inherit: true,
		basePower: 150,
		pp: 5,
		accuracy: 100,
		selfdestruct: undefined, recoil: [80, 100],
	},

	shadowball: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	shadowclaw: {
		inherit: true,
		basePower: 70,
		pp: 15,
		accuracy: 100,
	},

	shadowforce: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	shadowsneak: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
	},

	shelter: {
		inherit: true,
		pp: 10,
		accuracy: true,
		boosts: undefined,
		onHit(target, source, move) {
			applyPLAStat(target, 'plaguardboost', source, move);
			return target.addVolatile('plaobscured', source, move);
		},
	},

	silverwind: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
	},

	slash: {
		inherit: true,
		basePower: 70,
		pp: 15,
		accuracy: 100,
	},

	sleeppowder: {
		inherit: true,
		pp: 20,
		accuracy: 80,
		onHit(target, source, move) { return applyPLAStatus(target, 'pladrowsy', source, move); },
	},

	sludgebomb: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plapoison', source, move); } },
	},

	snarl: {
		inherit: true,
		basePower: 60,
		pp: 15,
		accuracy: 100,
	},

	softboiled: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	spacialrend: {
		inherit: true,
		basePower: 90,
		pp: 5,
		accuracy: 95,
	},

	spark: {
		inherit: true,
		basePower: 65,
		pp: 20,
		accuracy: 100,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plaparalysis', source, move); } },
	},

	spikes: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		category: 'Physical', target: 'normal', sideCondition: undefined, secondary: { chance: 100, volatileStatus: 'plasplinters' },
	},

	splash: {
		inherit: true,
		pp: 40,
		accuracy: true,
	},

	spore: {
		inherit: true,
		pp: 10,
		accuracy: 100,
	},

	springtidestorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		accuracy: 80,
	},

	stealthrock: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
		category: 'Physical', target: 'normal', sideCondition: undefined, secondary: { chance: 100, volatileStatus: 'plasplinters' },
	},

	steelbeam: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 95,
	},

	stoneaxe: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 90,
		secondary: { chance: 100, volatileStatus: 'plasplinters' },
	},

	stoneedge: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 80,
	},

	struggle: {
		inherit: true,
		basePower: 50,
		pp: 1,
		accuracy: true,
	},

	strugglebug: {
		inherit: true,
		basePower: 40,
		pp: 20,
		accuracy: 100,
	},

	stunspore: {
		inherit: true,
		pp: 20,
		accuracy: 80,
		onHit(target, source, move) { return applyPLAStatus(target, 'plaparalysis', source, move); },
	},

	swift: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: true,
	},

	swordsdance: {
		inherit: true,
		pp: 20,
		accuracy: true,
		boosts: undefined, onHit(target, source, move) { return applyPLAStat(target, 'plapowerboost', source, move); },
	},

	tackle: {
		inherit: true,
		basePower: 40,
		pp: 30,
		accuracy: 100,
	},

	takeheart: {
		inherit: true,
		pp: 10,
		accuracy: true,
	},

	teleport: {
		inherit: true,
		pp: 20,
		accuracy: true,
	},

	thunder: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 75,
		secondary: { chance: 30, onHit(target, source, move) { applyPLAStatus(target, 'plaparalysis', source, move); } },
	},

	thunderbolt: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plaparalysis', source, move); } },
	},

	thunderfang: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 95,
		secondaries: [{ chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plaparalysis', source, move); } }],
	},

	thunderpunch: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
	},

	thundershock: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
		secondary: { chance: 10, onHit(target, source, move) { applyPLAStatus(target, 'plaparalysis', source, move); } },
	},

	thunderwave: {
		inherit: true,
		pp: 20,
		accuracy: 90,
		onHit(target, source, move) { return applyPLAStatus(target, 'plaparalysis', source, move); },
	},

	triattack: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
		secondary: {
			chance: 20,
			onHit(target, source, move) {
				const status = this.sample(['plafrostbite', 'plaparalysis', 'plapoison']);
				applyPLAStatus(target, status, source, move);
			},
		},
	},

	triplearrows: {
		inherit: true,
		basePower: 50,
		pp: 15,
		accuracy: 100,
	},

	twister: {
		inherit: true,
		basePower: 40,
		pp: 25,
		accuracy: 100,
	},

	venoshock: {
		inherit: true,
		basePower: 65,
		pp: 15,
		accuracy: 100,
	},

	victorydance: {
		inherit: true,
		pp: 10,
		accuracy: true,
		boosts: undefined,
		onHit(target, source, move) {
			applyPLAStat(target, 'plapowerboost', source, move);
			applyPLAStat(target, 'plaguardboost', source, move);
			return target.addVolatile('plaprimed', source, move);
		},
	},

	volttackle: {
		inherit: true,
		basePower: 120,
		pp: 5,
		accuracy: 100,
	},

	waterpulse: {
		inherit: true,
		basePower: 60,
		pp: 20,
		accuracy: true,
		secondary: undefined,
	},

	wavecrash: {
		inherit: true,
		basePower: 75,
		pp: 10,
		accuracy: 100,
		priority: 1,
	},

	wildboltstorm: {
		inherit: true,
		basePower: 95,
		pp: 5,
		accuracy: 80,
	},

	wildcharge: {
		inherit: true,
		basePower: 85,
		pp: 10,
		accuracy: 100,
	},

	woodhammer: {
		inherit: true,
		basePower: 100,
		pp: 5,
		accuracy: 100,
	},

	xscissor: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 100,
	},

	zenheadbutt: {
		inherit: true,
		basePower: 80,
		pp: 10,
		accuracy: 90,
	},
};
