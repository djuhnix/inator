const { getChatRoomChannel } = require('./index');
const { getFact } = require('./facts');
const fs = require('fs');
const { morningJobMessages } = JSON.parse(fs.readFileSync('config.json').toString());

function sendMorningMessage(client, lastMessage) {
	let message;
	do {
		message = morningJobMessages[Math.floor(Math.random() * morningJobMessages.length)];
	} while (message === lastMessage);
	getChatRoomChannel(client)
		.send(message);
	return message;
}

function sendMorningFact(client) {
	const { fact } = getFact();
	getChatRoomChannel(client)
		.send('Morning fact : \n'
            + '>' + fact,
		);
}

module.exports = {
	sendMorningFact,
	sendMorningMessage,
};