export default {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! ${client.user.tag} is Logged in.`);
    },
};