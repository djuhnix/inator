const { SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('djs-games');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDescription('Jouer à un jeu'),
	async execute(interaction) {
		const game = new TicTacToe({
			message: interaction.message,
			xEmoji: '❌',
			oEmoji: '0️⃣',
			xColor: 'PRIMARY',
			oColor: 'PRIMARY',
			embedDescription: 'Tic Tac Toe',
		});
		await game.start();
		await interaction.reply('Finish!');
	},
};