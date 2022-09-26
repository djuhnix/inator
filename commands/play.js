// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const { TicTacToe, RockPaperScissors, ConnectFour, Snake} = require('djs-games');


module.exports = {
	name: 'play',
	description: 'Jouer à un jeu.',
	usage: '[mode]',
	/**
	 * @param {Discord.Message} message
	 * @param {*} args
	 */
	async execute(message, args = '') {
		const prefix = process.env.BOT_COMMAND_PREFIX;
		if (!args.length) {
			const data = [];
			data.push('Pour utiliser cette commande il faut préciser le jeu au quel vous souhaitez jouer :\n');
			data.push('> `ttt` : pour le tic tac toe\n');
			data.push('> `ttt @adversaire` : pour jouer contre quelqu\'un\n');
			data.push('> `ppc` : pour le pierre-papier-ciseaux\n');
			data.push('> `ppc @adversaire` : pour jouer contre quelqu\'un\n');
			data.push('> `p4 @adversaire` : pour jouer au puissance 4 contre quelqu\'un\n');
			data.push('> `snake` : pour le snake (coming soon)\n');
			// data.push('> `custom` : un joueur élu choisi un mot\n');
			data.push(`\nEssai \`${prefix}play ttt\`.`);
			return message.channel.send(data, { split: true })
				.then(() => {
					message.delete({ timeout: 10, reason: 'Commande confirmée' });
				});
		}
		const mode = args[0];
		let game;
		switch (mode) {
		case 'ttt':
			game = new TicTacToe({
				message: message,
				xEmoji: '❌',
				oEmoji: '0️⃣',
				xColor: 'PRIMARY',
				oColor: 'PRIMARY',
				opponent: message.mentions.members.first() || message.member,
				embedDescription: 'Tic Tac Toe',
			});
			await game.start();
			break;
		case 'ppc':
			game = new RockPaperScissors({
				message: message,
			});
			await game.start();
			break;
		case 'p4':
			game = new ConnectFour({
				message: message,
			});
			await game.start();
			break;
		case 'snake':
			// TODO
			game = new Snake({
				message: message,
				buttons: true,
				snake: '🟩',
				apple: '🍎',
				embedColor: 'RANDOM',
				leftButton: '◀',
				rightButton: '▶',
				upButton: '▲',
				downButton: '▼',
			});
			await game.start();
		}
	},
};