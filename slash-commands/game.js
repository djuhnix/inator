const { SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('djs-games');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDescription('Jouer à un jeu'),
	async execute(interaction) {
		if (interaction.isMessageComponent()) {
			console.log('interaction is message component, trying to start game...');
			const game = new TicTacToe({
				message: interaction.message,
				xEmoji: '❌',
				oEmoji: '0️⃣',
				xColor: 'PRIMARY',
				oColor: 'PRIMARY',
				opponent: interaction.member,
				embedDescription: 'Tic Tac Toe',
			});
			await game.start();
		}
		else {
			console.log('interaction is not message component');
		}
		await interaction.reply('Finish!');
	},
};