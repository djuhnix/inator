const { SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('djs-games');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Jouer à un jeu')
		.addStringOption(option =>
			option.setName('game')
				.setDescription('Le jeu au quel tu veux jouer')
				.setRequired(true)
				.addChoices(
					{ name: 'Tic Tac Toe', value: 'ttt' },
				)),
	async execute(interaction) {
		console.log(interaction.options.data);
		const game = new TicTacToe({
			message: interaction.options.data,
			xEmoji: '❌',
			oEmoji: '0️⃣',
			xColor: 'PRIMARY',
			oColor: 'PRIMARY',
			opponent: interaction.member,
			embedDescription: 'Tic Tac Toe',
		});
		await game.start();

		await interaction.reply('Finish!');
	},
};