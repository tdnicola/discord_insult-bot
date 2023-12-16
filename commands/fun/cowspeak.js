const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("moo")
        .setDescription("Cowspeak, Moo i'm a cow...!")
        .addStringOption((option) =>
            option.setName("cowspeak").setDescription("The text for cowspeak")
        ),
    async execute(interaction) {
        const cowspeakText =
            interaction.options.getString("cowspeak") ?? "HoW I sPeAk CoW?/";
        splitMessage = cowspeakText.split(" ");
        joinedMessage = splitMessage.join("+");

        const mooURL = await request(
            `https://cowsay.morecode.org/say?message=${joinedMessage}&format=json`
        );
        const { cow } = await mooURL.body.json();
        await interaction.deferReply();
        await interaction.editReply("```" + cow + "```");
    },
};
