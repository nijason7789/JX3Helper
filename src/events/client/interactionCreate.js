module.exports = {
    name: 'interaction',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.exectue(interaction, client);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'something went wrong for this command',
                    ephemeral: true,
                });
            }
        }
    },
};