const { Events , ActivityType} = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        let serverCount = client.guilds.cache.size;
        client.users.send("254838552960040960", `BotStart Up, ${serverCount} servers`);
        console.log(`ayyyy sup playa, ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: `you`, type: ActivityType.Watching }]
          });    },
};
