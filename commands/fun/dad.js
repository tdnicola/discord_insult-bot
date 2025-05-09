const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");
const { updateUserAction } = require('../../db'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dadjoke")
        .setDescription(
            "I'm hungry. Hello Hungry I'm dad."
        ),
      
    async execute(interaction) {
        const dadJokeURL = await request("https://icanhazdadjoke.com", {headers: {Accept: "application/json"}});
        const {joke}  = await dadJokeURL.body.json()
        await interaction.reply(`${joke}`);
        await updateUserAction(interaction.user.id, interaction.user.username, 'dadjoke_told');

    },
};
