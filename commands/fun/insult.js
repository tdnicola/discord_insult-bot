const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");
const API_BASE_URL = process.env.API_BASE_URL || 'http://host.docker.internal:5000';


module.exports = {
    data: new SlashCommandBuilder()
        .setName("insult")
        .setDescription("Get gud Noob")
        .addUserOption((option) =>
            option.setName("user").setDescription("Let's insult somebody...")
        ),
    async execute(interaction) {
        const insultURL = await request(
            `${API_BASE_URL}/insult`
        );
        const body = await insultURL.body.json(); 
        const insult = body.message; 

        await interaction.deferReply();

        const message = await interaction.editReply(
            `${
                interaction.options.getUser("user") ?? interaction.user
            } ${insult}`
        );
        message.react("🔥");

    },
};
