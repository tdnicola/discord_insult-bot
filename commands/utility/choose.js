const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("choose")
        .setDescription("I can't decide... Decide for me.")
        .addStringOption((option) =>
            option
                .setName("choices")
                .setRequired(true)
                .setDescription("What Choices? Seperate choices by using or")
        ),
    async execute(interaction) {
        const choiceInput = interaction.options.getString("choices");
        splitOptions = choiceInput.split(" or ");
        randomAnswer =
            splitOptions[Math.floor(Math.random() * splitOptions.length)];
        await interaction.reply(
            "```" + interaction.user.username + " asks: " + choiceInput + "```"
        );
        await interaction.channel.send(randomAnswer);
    },
};
