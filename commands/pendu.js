// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const hangman = require('discord-hangman');
const fs = require('fs');
const { hangmanOptions } = JSON.parse(fs.readFileSync('config.json').toString());

/**
 *
 * @param {Discord.Message} message
 * @param data
 */
function onGameFinish(message, data) {
	// If the game is cancelled or no one joins it
	if(!data.game) return;

	if (data.game.status === 'won') {
		// data.selector is the user who chose the word (only in custom game mode)
		if (data.selector) message.channel.send(hangmanOptions.message['successMsg'] + ` ${data.selector.username}... Pense à un mot plus compliqué la prochaine fois!`);

		else message.channel.send(hangmanOptions.message['successMsg']);
	}
	else if (data.game.status === 'lost') {
		if (data.selector) {
			message.channel.send(
				`${data.selector.username} Vous a tous battu(e)!`
				+ hangmanOptions.message.gameOverMsg.replace(/{word}/gi, data.game.word),
			);
		}
		else {
			message.channel.send(
				hangmanOptions.message.gameOver + ' '
				+ hangmanOptions.message.gameOverMsg.replace(/{word}/gi, data.game.word),
			);
		}
	}
	else {
		// If no one answers for 15 minutes
		message.channel.send(hangmanOptions.message['noAnswersMsg']);
	}
}
module.exports = {
	name: 'pendu',
	description: 'Commencer une partie de pendu',
	usage: '[mode]',
	/**
	 * @param {Discord.Message} message
	 * @param {*} args
	 */
	async execute(message, args = '') {
		const prefix = process.env.BOT_COMMAND_PREFIX;
		if (!args.length) {
			const data = [];
			data.push('Pour jouer au pendu il faut préciser le mode de jeu entre :\n');
			data.push('> `random` : je choisi un mot au hasard\n');
			data.push('> `custom` : un joueur élu choisi un mot\n');
			data.push(`\nEssai \`${prefix}pendu random\`.`);
			return message.channel.send(data, { split: true })
				.then(() => {
					message.delete({ timeout: 10, reason: 'Commande confirmée' });
				});
		}
		const mode = args[0];
		switch (mode) {
		case 'custom':
			await hangman.create(message.channel, mode, {
				message: hangmanOptions.message,
			})
				.then((data) => {
					onGameFinish(message, data);
				});
			break;
		case 'random':
			if (args.length < 2) {
				await hangman.create(message.channel, mode, {
					message: hangmanOptions.message,
				})
					.then((data) => {
						onGameFinish(message, data);
					});
			}
			else {
				await hangman.create(message.channel, mode, {
					message: hangmanOptions.message,
					word: args[1],
				})
					.then((data) => {
						onGameFinish(message, data);
					});
			}
			break;
		}
	},
};