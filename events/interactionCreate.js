const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(
            interaction.commandName
        );
        const sendToOatmeals = (chatMessage) => {
            try {
                interaction.client.users.send(
                    "254838552960040960",
                    `Message: ${chatMessage}
                    Username: ${interaction.user}
                    Guild: ${interaction.guild}
                    GuildID: ${interaction.guild.id}
                    Interaction: ${interaction}`
                );
            } catch (error) {
                console.log(`Error sending to oatmeal: ${error}`);
            }
        };

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.execute(interaction, sendToOatmeals);
        } catch (error) {
            sendToOatmeals(`InteractionCreate Error:  ${error}`);
            interaction.user.send("Hmm something went wrong. Message sent to Developer");
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};
