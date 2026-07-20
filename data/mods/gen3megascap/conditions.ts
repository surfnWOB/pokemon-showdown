/* eslint-disable @stylistic/max-len */

// Moves the Supreme Power ability (abilities.ts) hands out to a whole side.
const SUPREME_POWER_MOVES = ['superpower', 'cosmicpower', 'ancientpower'];

// Push the bonus move slots onto `pokemon` if it doesn't already have them.
// We write to `moveSlots` (the live copy), not `baseMoveSlots`: switching out
// rebuilds moveSlots from base (sim/pokemon.ts), which cleanly drops the bonus
// moves, and the aura re-grants them via onSwitchIn. A Pokemon that legitimately
// carries one of these moves is skipped (no duplicate slot).
function grantSupremePower(battle: Battle, pokemon: Pokemon) {
	for (const id of SUPREME_POWER_MOVES) {
		if (pokemon.moveSlots.some(ms => ms.id === id)) continue;
		const move = battle.dex.moves.get(id);
		pokemon.moveSlots.push({
			move: move.name, id: move.id, pp: move.pp, maxpp: move.pp,
			target: move.target, disabled: false, disabledSource: '', used: false,
		});
	}
}

// Remove only the bonus slots we added: one of the three moves AND not part of
// the Pokemon's real (base) moveset. This preserves battle-used PP on real moves
// and never strips a move the Pokemon genuinely carries (e.g. its own Superpower).
function removeSupremePower(pokemon: Pokemon) {
	pokemon.moveSlots = pokemon.moveSlots.filter(
		ms => !(SUPREME_POWER_MOVES.includes(ms.id) && !pokemon.baseMoveSlots.some(b => b.id === ms.id))
	);
}

export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	supremepoweraura: {
		name: 'supremepoweraura',
		// No `duration` while a Supreme Power user is on the field, so the aura
		// persists indefinitely — with neither a callback nor a duration it never
		// enters the residual-decrement list (sim/battle.ts). The ability's onEnd
		// sets duration:3 when the user leaves; the residual loop then ticks it down
		// and removes it via onSideEnd.
		onSideStart(side) {
			this.add('-message', `Supreme Power radiates across ${side.name}'s team — Superpower, Cosmic Power, and Ancient Power for all!`);
			for (const ally of side.active) {
				if (ally) grantSupremePower(this, ally);
			}
		},
		onSideRestart(side) {
			// A Supreme Power user (re-)entered: re-arm the indefinite aura, cancelling
			// any pending 3-turn countdown, and top up anyone already on the field.
			this.effectState.duration = undefined;
			for (const ally of side.active) {
				if (ally) grantSupremePower(this, ally);
			}
			return true;
		},
		onSwitchIn(pokemon) {
			// Grant to any ally that switches in while the aura is up, including during
			// the 3-turn grace window after the user has left the field.
			grantSupremePower(this, pokemon);
		},
		onSideResidualOrder: 28,
		onSideEnd(side) {
			this.add('-message', `Supreme Power fades from ${side.name}'s team.`);
			for (const ally of side.active) {
				if (ally) removeSupremePower(ally);
			}
		},
	},
	slp: {
		name: 'slp', effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Move') this.add('-status', target, 'slp', `[from] move: ${sourceEffect.name}`);
			else this.add('-status', target, 'slp');
			this.effectState.time = this.random(2, 6);
			this.effectState.skippedTime = 0;
			if (target.removeVolatile('nightmare')) this.add('-end', target, 'Nightmare', '[silent]');
		},
		onSwitchIn(target) { this.effectState.time += this.effectState.skippedTime; this.effectState.skippedTime = 0; },
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) pokemon.statusState.time--;
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) { pokemon.cureStatus(); return; }
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) { this.effectState.skippedTime++; return; }
			this.effectState.skippedTime = 0;
			return false;
		},
	},
	par: {
		name: 'par', effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			else this.add('-status', target, 'par');
		},
		onModifySpePriority: -101,
		onModifySpe(spe, pokemon) { spe = this.finalModify(spe); if (!pokemon.hasAbility('quickfeet')) spe = Math.floor(spe * 25 / 100); return spe; },
		onBeforeMovePriority: 1,
	},
	frz: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.dex.moves.get(move.id).type === 'Fire' && move.category !== 'Status') target.cureStatus();
		},
	},
	sandstorm: { inherit: true, onModifySpD: undefined },
};
