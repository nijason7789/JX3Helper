// Require the necessary discord.js classes
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = process.env;
const fs = require('fs');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}

}

client.handleCommands();
client.handleEvents();
client.login(token);