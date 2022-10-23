const { getChatRoomChannel } = require('./index');
const { getFact } = require('./requests');
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
	getFact()
		.then(response => {
			const { fact } = response;
			console.log('fact retrieve successfully : ', fact);
			getChatRoomChannel(client)
				.send('Morning fact : \n'
					+ '> ' + fact,
				);
		});
}

module.exports = {
	sendMorningFact,
	sendMorningMessage,
};