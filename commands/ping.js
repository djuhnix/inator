// eslint-disable-next-line no-unused-vars
const { Message } = require('discord.js');


module.exports = {
	name: 'ping',
	description: 'Ping me i\'m famous',
	usage: 'Ping!',
	/**
     *
     * @param {Message} message
     * @param {*} args
     */
	// eslint-disable-next-line no-unused-vars
	execute(message, args = '') {
		message.channel.send('Pong!')
			.then(() => {
				setTimeout(() => message.delete(), 10);
			});
	},
};