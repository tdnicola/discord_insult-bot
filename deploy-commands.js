const { REST, Routes } = require("discord.js");
const { CLIENTID, GUILDID, TOKEN } = require("./config.js");
const fs = require("node:fs");

const commands = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
const commandFolder = fs.readdirSync("./commands");

for (const folder of commandFolder) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
            console.log(`Command ${command.data.name} added for refresh`);
        } else {
            console.log(
                `[WARNING] The command ${file} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENTID, GUILDID),
            { body: commands }
        );
        /*
        //Global
        await rest.put(Routes.applicationCommands(CLIENTID), {
            body: commands,
        });
        */
        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
