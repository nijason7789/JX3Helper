import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('returning Ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const newMessage = `API latency: ${Math.round(client.ws.ping)}\n Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        await interaction.editReply({
            content: newMessage,
        });
    },
};