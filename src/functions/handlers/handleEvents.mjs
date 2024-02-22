import fs from 'fs';

export default class HandleEvents {
    constructor(client) {
        this.client = client;
    }
    async setup(client) {
        const eventFolders = fs.readdirSync('./src/events');
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.mjs'));
            const eventPromises = eventFiles.map(file => import(`../../events/${folder}/${file}`));
            const events = await Promise.all(eventPromises);

            switch (folder) {
                case 'client':
                    for (const event of events) {
                        if (event.once) {
                            client.once(event.default.name, (...args) => event.default.execute(...args, client));
                            console.log('once');
                            console.log(`${event.default.name} loaded.`);
                        }
                        else {
                            client.on(event.default.name, (...args) => event.default.execute(...args, client));
                            console.log('not once');
                            console.log(`${event.default.name} loaded.`);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
}