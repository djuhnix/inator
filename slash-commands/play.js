// const { SlashCommandBuilder } = require('discord.js'); // discord.js v14
const { SlashCommandBuilder } = require('@discordjs/builders');
const prefix = process.env.BOT_COMMAND_PREFIX;

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
		await interaction.reply('Travail en cours...');
		await interaction.followUp(`Essai la commande \`${prefix}play\`.`);
	},
};