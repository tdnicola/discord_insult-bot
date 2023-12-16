const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("comment")
        .setDescription(
            "Send a comment or suggestion to the Developer. Post will be deleted after it is sent."
        )
        .addStringOption((option) =>
            option
                .setName("comment")
                .setRequired(true)
                .setDescription("Hey man can you add a random pokemon command?")
        ),
    async execute(interaction, sendToOatmeals) {
        const userComment = interaction.options.getString("comment");
        sendToOatmeals(`${userComment}`);
        await interaction.reply("Comment sent. Thank you");
    },
};
