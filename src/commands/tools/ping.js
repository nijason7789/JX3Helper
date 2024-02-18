const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('returning Ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const newMessage = `API latency: ${client.ws.ping}\n Client Ping: ${message.createTimestamp - interaction.createTimestamp}`;
        await interaction.editReply({
            content: newMessage,
        });
    },
};