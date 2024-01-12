module.exports = {
    name: 'interaction',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            console.log('it is a input command!');
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'something went wrong for this command',
                    ephemeral: true,
                });
            }
        }
        else {
            console.log('not an InputCommand');
        }
    },
};