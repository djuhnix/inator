// eslint-disable-next-line no-unused-vars
const { Message } = require('discord.js');
const fs = require('fs');
const { morningJobMessages } = JSON.parse(fs.readFileSync('config.json').toString());
module.exports = {
	name: 'morning',
	usage: 'morning',
	description: 'Donne au hasard une formule de salution utilisé par djuhnixinator.',
	/**
	 *
	 * @param {Message} message
	 * @param {String} args
	 */
	// eslint-disable-next-line no-unused-vars
	execute(message, args = '') {
		const answer = morningJobMessages[Math.floor(Math.random() * morningJobMessages.length)];
		message.channel.send(answer)
			.then((msg) => {
				setTimeout(() => msg.delete(), 10);
			});
		setTimeout(() => message.delete(), 10);
	},
};