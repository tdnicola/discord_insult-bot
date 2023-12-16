const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription(
            "The magic 8ball that gives you all the answers.. Well sometimes."
        )
        .addStringOption((option) =>
            option
                .setName("question")
                .setDescription("Will I win this game?")
                .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString("question");

        const questionURL = await request("https://www.eightballapi.com/api");
        const { reading } = await questionURL.body.json();
        await console.log(reading);
        await interaction.reply(
            `Question: ${question} \n Answer: ${reading}`
        );
    },
};
