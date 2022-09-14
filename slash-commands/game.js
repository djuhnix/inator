// const { SlashCommandBuilder } = require('discord.js'); // discord.js v14
const { SlashCommandBuilder } = require('@discordjs/builders');

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
		await interaction.reply('Début du jeu!');

		const message = await interaction.fetchReply();

		const game = new TicTacToe({
			message: message,
			xEmoji: '❌',
			oEmoji: '0️⃣',
			xColor: 'PRIMARY',
			oColor: 'PRIMARY',
			opponent: interaction.member,
			embedDescription: 'Tic Tac Toe',
		});
		await game.start();

		// await interaction.followUp('Finish!');
	},
};