// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'pendu',
	description: '(Plus fonctionnelle) Commencer une partie de pendu. Taper `pendu` sans options pour plus de détails.',
	/**
	 * @param {Discord.Message} message
	 * @param {*} args
	 */
	// eslint-disable-next-line no-unused-vars
	async execute(message, args = '') {
		const data = [];
		data.push('Pour jouer au pendu il faut préciser le mode de jeu entre :');
		data.push('> `random` : je choisi un mot au hasard');
		data.push('> `random english` : pour un mot en anglais');
		data.push('> `random self` : pour jouer seul(e) automatiquement');
		data.push('> `custom` : un joueur élu choisi un mot');
		data.push('--');
		data.push('\nUtiliser désormais la commande slash `/pendu` pour pouvoir jouer au pendu.');
		return message.channel.send(data.join('\n'))
			.then(() => {
				setTimeout(() => message.delete(), 10);
			});
	},
};