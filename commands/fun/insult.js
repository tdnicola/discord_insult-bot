const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");
const { updateInteractionStats } = require('../../db');
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("insult")
        .setDescription("Get gud Noob")
        .addUserOption((option) =>
            option.setName("user").setDescription("Let's insult somebody...")
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const sender = interaction.user;
        const target = interaction.options.getUser('user') || sender;
        try {
            const insultURL = await request(`${API_BASE_URL}/insult`);
            const body = await insultURL.body.json();
            const insult = body.message;
            const message = await interaction.editReply(`${target} ${insult}`);
            message.react("🔥");
            await updateInteractionStats(sender.id, sender.username, target.id, target.username, 'insult');
        } catch (err) {
            await interaction.editReply('⚠️ Could not reach the insult API. Try again later. Message sent to developer');
            interaction.client.sendToOatmeals(interaction, `Insult API error: ${err}`);
        }
    },
};
