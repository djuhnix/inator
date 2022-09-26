// const { SlashCommandBuilder } = require('discord.js'); // discord.js v14
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getFact } = require('../utils/facts');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fact')
		.setDescription('Get a random fact'),
	async execute(interaction) {
		const { fact } = getFact();
		await interaction.reply({ content: fact });
	},
};
