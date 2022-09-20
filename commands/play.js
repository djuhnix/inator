// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const { TicTacToe } = require('djs-games');


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
				opponent: message.member,
				embedDescription: 'Tic Tac Toe',
			});
			await game.start();
			break;
		case 'snake':
			// TODO
		}
	},
};