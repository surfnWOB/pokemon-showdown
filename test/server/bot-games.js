'use strict';

const assert = require('assert').strict;
const { makeUser } = require('../users-utils');

describe('Bot battle announcements', () => {
	let lobby, bots, battle;
	let previous;
	const players = [];

	beforeEach(() => {
		previous = {
			reportbattles: Config.reportbattles,
			botgamesroom: Config.botgamesroom,
			ladderbots: Config.ladderbots,
		};
		Config.reportbattles = ['botgameslobby'];
		Config.botgamesroom = 'Bots Games';
		Config.ladderbots = ['Practice Bot'];
		lobby = Rooms.createChatRoom('botgameslobby', 'Test Lobby');
		bots = Rooms.createChatRoom('botsgames', 'Bots Games');
	});

	afterEach(() => {
		if (battle) battle.destroy();
		battle = null;
		for (const player of players.splice(0)) {
			player.disconnectAll();
			player.destroy();
		}
		lobby.destroy();
		bots.destroy();
		Object.assign(Config, previous);
	});

	function startBattle(names, rated = false) {
		players.push(...names.map(name => makeUser(name)));
		battle = Rooms.createBattle({
			format: 'gen9customgame',
			rated,
			players: players.map(user => ({ user, team: 'Pikachu||||thunderbolt|||||||' })),
		});
	}

	function announcedIn(room) {
		return room.log.log.some(line => line.startsWith(`|b|${battle.roomid}|`));
	}

	it('announces bot challenges in Bots Games instead of the lobby', () => {
		startBattle(['Human Player', 'Practice Bot']);
		assert(announcedIn(bots), 'bot battle should be announced in Bots Games');
		assert(!announcedIn(lobby), 'bot battle should not be announced in the lobby');
	});

	it('keeps human battles in the lobby after reporting a bot battle', () => {
		const reports = Config.reportbattles;
		startBattle(['Human Player', 'Practice Bot']);
		battle.destroy();
		for (const player of players.splice(0)) {
			player.disconnectAll();
			player.destroy();
		}
		startBattle(['Human Player', 'Another Human']);
		assert(announcedIn(lobby));
		assert(!announcedIn(bots));
		assert.equal(Config.reportbattles, reports);
	});

	it('also routes rated battles with the bot as the first player', () => {
		startBattle(['Practice Bot', 'Human Player'], 1200);
		assert(announcedIn(bots));
		assert(!announcedIn(lobby));
	});

	it('uses the configured account list, not names that merely contain bot', () => {
		startBattle(['Human Player', 'Not A Bot']);
		assert(announcedIn(lobby));
		assert(!announcedIn(bots));
	});

	it('supports the existing comma-separated bot account configuration', () => {
		Config.ladderbots = 'Other Bot, Practice Bot';
		startBattle(['Human Player', 'Practice Bot']);
		assert(announcedIn(bots));
		assert(!announcedIn(lobby));
	});

	it('preserves ordinary reporting when no bot room is configured', () => {
		Config.botgamesroom = '';
		startBattle(['Human Player', 'Practice Bot']);
		assert(announcedIn(lobby));
		assert(!announcedIn(bots));
	});
});
