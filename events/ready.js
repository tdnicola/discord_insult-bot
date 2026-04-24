const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        const ownerId = process.env.OWNER_ID;
        const serverCount = client.guilds.cache.size;
        if (ownerId) {
            client.users.send(ownerId, `BotStart Up, ${serverCount} servers`);
        } else {
            console.warn('OWNER_ID not set — skipping startup DM');
        }
        console.log(`ayyyy sup playa, ${client.user.tag}`);
        client.user.setPresence({
            activities: [{ name: `you`, type: ActivityType.Watching }]
        });
    },
};
