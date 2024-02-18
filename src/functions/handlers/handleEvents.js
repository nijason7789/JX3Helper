const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync('./src/events');
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.js'));
            switch (folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        console.log(`${event.name}`);
                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args, client));
                            console.log('once');
                            console.log(`${event.name} loaded.`);
                        }
                        else {
                            client.on(event.name, (...args) => event.execute(...args, client));
                            console.log('not once');
                            console.log(`${event.name} loaded.`);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    };
};