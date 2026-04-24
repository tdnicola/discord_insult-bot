const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            interaction.client.sendToOatmeals(interaction, `InteractionCreate Error: ${error}`);
            interaction.user.send("Hmm something went wrong. Message sent to Developer");
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};
