// eslint-disable-next-line no-unused-vars
const { Message } = require('discord.js');

module.exports = {
	name: 'activity',
	usage: 'activity [url]',
	description: 'Met à jour l\'activité du BOT si un paramètre est passé. Sinon récupère l\'activité actuelle du BOT pour l\'afficher dans le salon textuel.',
	/**
     *
     * @param {Message} message
     * @param {String} args
     */
	execute(message, args = '') {
		const prefix = process.env.BOT_COMMAND_PREFIX;
		if(args.length > 0) {
			const activity = args.join(' ');
			message.client.user.setActivity({ type: 'WATCHING', name: `${activity}` })
				.then(() => {
					message.channel
						.send(`${message.author} vient de changer l'activité actuelle sur: ${activity}`)
						.then(() => {
							message.delete({ timeout: 10 });
						});
				});
		}

		if (args.length <= 0) {
			const activities = message.client.user.presence.activities;
			if(activities.length === 0) {
				message.channel.send(`${message.author} Il n'y a actuellement aucune activité en cours. Utilise \`${prefix}${this.name} [nom de l'activité]\` pour modifier l'activité`)
					.then(() => {
						message.delete({ timeout: 10 });
					});
			}
			else {
				message.client.user.presence.activities.forEach((value, index) => {
					message.channel.send(`${message.author} Voici l'activité actuelle: ${value}`)
						.then(() => {
							message.delete({ timeout: 10 });
						});
				});
			}
		}
	},
};