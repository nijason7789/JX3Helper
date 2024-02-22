import HandleCommands from '../src/functions/handlers/handleCommands.mjs';
import HandleEvents from '../src/functions/handlers/handleEvents.mjs';

export default function initializeBot(client) {
    const handleEvents = new HandleEvents();
    const handleCommands = new HandleCommands();
    handleCommands.setup(client);
    handleEvents.setup(client);
}