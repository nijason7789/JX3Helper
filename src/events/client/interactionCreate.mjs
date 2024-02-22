export default {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            console.log('it is a command!');
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            console.log(`${commandName} command triggered.`);
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