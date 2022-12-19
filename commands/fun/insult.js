const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("insult")
        .setDescription("Get gud Noob")
        .addUserOption((option) =>
            option.setName("user").setDescription("Let's insult somebody...")
        ),
    async execute(interaction) {
        const insultURL = await request(
            `https://insult.mattbas.org/api/insult.json`
        );
        const { insult } = await insultURL.body.json();

        await interaction.reply(
            `${
                interaction.options.getUser("user") ?? interaction.user
            } ${insult}`
        );

        /*
        	if (commandName === 'react') {
		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}
        */
    },
};
