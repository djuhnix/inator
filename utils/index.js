module.exports = {
	getChatRoomChannel(client) {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		return guild.channels.cache.get(process.env.CHAT_ROOM_ID);
	},
};