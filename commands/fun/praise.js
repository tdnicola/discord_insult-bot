const { request } = require(`undici`);
const { SlashCommandBuilder } = require(`discord.js`);
const { updateInteractionStats } = require('../../db'); 
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`praise`)
        .setDescription(`Hey you're pretty cool.`)
        .addUserOption((option) =>
            option.setName(`user`).setDescription(`Let's be nice to people`)
        ),
    async execute(interaction) {
        const sender = interaction.user;
        const insultURL = await request(
            `${API_BASE_URL}/compliment`
        );
        const body = await insultURL.body.json(); 
        const compliment = body.message; 
        const target = interaction.options.getUser('user') ?? sender;

        await interaction.deferReply();

        const message = await interaction.editReply(
            `${
                target
            } ${compliment}`
        );
        message.react(`🙏`);

        await updateInteractionStats(
            sender.id,
            sender.username,
            target.id,
            target.username,
            'praise'
          );
    },
};
