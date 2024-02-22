import { REST, Routes } from 'discord.js';
import fs from 'fs';

export default class handleCommands {
    constructor(client) {
        this.client = client;
    }
    async setup(client) {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.mjs'));
            const commandPromise = commandFiles.map(file => import(`../../commands/${folder}/${file}`));
            const commandLoad = await Promise.all(commandPromise);
            const { commands, commandArray } = client;

            for (const command of commandLoad) {
                commands.set(command.default.data.name, command.default);
                commandArray.push(command.default.data.toJSON());
                console.log(`Command: ${command.default.data.name} has be through this handler`);
            }
        }
        const clientID = '1194622455701045248';
        const guildID = '878903798314201088';
        const rest = new REST({ version: '9' }).setToken(process.env.token);

        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: client.commandArray });
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    }
}

