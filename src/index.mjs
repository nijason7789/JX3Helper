import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import initializeBot from './bot.mjs';
const { token } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

// Load functions
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) {
		import(`./functions/${folder}/${file}`).then((module) => module.default(client));
	}
}
// Load bot module
initializeBot(client);
client.login(token);