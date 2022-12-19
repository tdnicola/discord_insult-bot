const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.users.send("254838552960040960", "BotStart Up");
        console.log(`ayyyy sup playa, ${client.user.tag}`);
    },
};
