// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const hangman = require('discord-hangman');
const randomWordFR = require('random-word-fr');
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { hangmanOptions } = JSON.parse(fs.readFileSync('config.json').toString());

/**
 * @param interaction
 * @param data
 */
function onGameFinish(interaction, data) {
	// If the game is cancelled or no one joins it
	if(!data.game) return;

	const user = data.selector;
	if (data.game.status === 'won') {
		// data.selector is the user who chose the word (only in custom game mode)
		if (data.selector) interaction.followUp({ content: hangmanOptions.messages['successMsg'] + user + ' ... Pense à un mot plus compliqué la prochaine fois!' });

		else interaction.followUp({ content: hangmanOptions.messages['successMsg'] });
	}
	else if (data.game.status === 'lost') {
		if (data.selector) {
			interaction.followUp({
				content:
					`${user} Vous a tous battu(e)! C'est triste :sob:`
					+ hangmanOptions.messages.gameOverMsg.replace(/{word}/gi, data.game.word),
			});
		}
		else {
			interaction.followUp({
				content:
					hangmanOptions.messages.gameOver + ' '
					+ hangmanOptions.messages.gameOverMsg.replace(/{word}/gi, data.game.word),
			});
		}
	}
	else {
		// If no one answers for 15 minutes
		interaction.followUp({ content: hangmanOptions.messages['noAnswersMsg'] });
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pendu')
		.setDescription('Commencer une partie de pendu. Taper `pendu` sans options pour plus de détails.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('random')
				.setDescription('Mode random du pendu (le bot choisi le mot)')
				.addBooleanOption(option => option.setName('english').setDescription('Avec un mot en anglais')),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('custom')
				.setDescription('Mode custom du pendu (un joueur choisi le mot)'),
		),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();
		const inEnglish = interaction.options.getBoolean('english');
		const defaultOption = {
			messages: hangmanOptions.messages,
			players: [interaction.user],
		};
		switch (subcommand) {
		case 'custom':
			await hangman.create(interaction, subcommand, defaultOption)
				.then((data) => {
					onGameFinish(interaction, data);
				});
			break;
		case 'random':
			if (inEnglish) {
				await hangman.create(interaction, subcommand, defaultOption)
					.then((data) => {
						onGameFinish(interaction, data);
					});
			}
			else {
				await hangman.create(interaction, subcommand, {
					...defaultOption,
					word: randomWordFR(),
				})
					.then((data) => {
						onGameFinish(interaction, data);
					});
			}
			break;
		}
	},
};