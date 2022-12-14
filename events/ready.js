const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`ayyyy sup playa, ${client.user.tag}`);
    },
};
