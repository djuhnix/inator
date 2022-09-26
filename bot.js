require('dotenv').config();

const { Client, Collection, Intents } = require('discord.js');
const cron = require('cron');
const { refreshCommands } = require('./deploy-commands.js');
require('colors');

// const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // discord.js v14
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();
client.slashCommands = new Collection();
client.jobs = new Collection();

const fs = require('fs');
const prefix = process.env.BOT_COMMAND_PREFIX;
const { morningJobMessages } = JSON.parse(fs.readFileSync('config.json').toString());
console.log('Loading classic commands...');
/**
 * @constant {}
 */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Creation d'un nouvel index dynamiquement
	client.commands.set(command.name, command);
}
console.log('Classic commands loaded...');


console.log('Loading (/) commands...');

const slashCommandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./slash-commands/${file}`);
	// Creation d'un nouvel index dynamiquement
	client.slashCommands.set(command.data.name, command);
}
console.log('Application (/) Commands loaded...');

// ------------------------------------------------------------------------

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Bot command prefix: ${process.env.BOT_COMMAND_PREFIX}`);

	// slash commands refresh
	// refreshCommands().then(() => console.log('Guild (/) commands refreshed'));

	// add a morning job to send a message every 8am
	let lastMessage = '';
	const morningJob = new cron.CronJob('00 00 09 * * *', () => {
		// This runs every day at 08:00:00, you can do anything you want
		// Specifing your guild (server) and your channel
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const channel = guild.channels.cache.get(process.env.CHAT_ROOM_ID);
		let message = '';
		while (message === lastMessage) {
			message = morningJobMessages[Math.floor(Math.random() * morningJobMessages.length)];
		}
		channel.send(message);
		lastMessage = message;
	}, null, true, 'Europe/Paris');

	// When you want to start it, use:
	morningJob.start();

	// console.log(client.users)

	// console.log(client.commands)

	// client.user.setActivity(`🛠️ En maintenance 🛠️`)

	// client.user.setUsername("🛠️ En maintenance 🛠️")

});

client.on('messageCreate', message => {

	// On analyse uniquement les messages qui nous intéresse
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	console.log('message receive', message.content);

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Si on ne connaît pas la commande
	if (!client.commands.has(command)) {
		message.delete({ timeout: 10, reason: 'Commande inconnue' });
		console.log(`${message.author.username}`.yellow + ' a exécuter une commande inconnue: ' + `${command}`.red);
		return message.channel.send(`Commande \`${command} ${args.toString().replace(',', ' ') || ''}\` inconnue. Merci quand même ${message.author}`);
	}

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.delete({ timeout: 10, reason: 'Erreur lors de l\'exécution de la commande' });
		message.channel.send(`Une erreur est survenue lors de l'exécution de \`${command} ${args}\``);
	}

});

// migration to discord.js v13 (slash commands)

client.on('interactionCreate', async interaction => {
	// if (!interaction.isChatInputCommand()) return; // discord.js v14
	if (!interaction.isCommand()) return;

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande :(', ephemeral: true });
	}
});


client.login(process.env.BOT_TOKEN).then(() => console.log('Client logged in successfuly'));
