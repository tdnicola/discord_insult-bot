const { PREFIX, TOKEN } = require("./config.js");
const fs = require("fs");
const path = require("node:path");
const { Client, Events, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandFolder = fs.readdirSync("./commands");

for (const folder of commandFolder) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
            console.log(`Command set for ${command.data.name}`);
        } else {
            console.log(
                `[WARNING] The command ${file} is missing a required "data" or "execute" property.`
            );
        }
    }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(TOKEN);
