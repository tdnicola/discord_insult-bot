const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("praise")
        .setDescription("Hey you're pretty cool.")
        .addUserOption((option) =>
            option.setName("user").setDescription("Let's be nice to people")
        ),
    async execute(interaction) {
        const complimentURL = await request(`https://complimentr.com/api`);
        const { compliment } = await complimentURL.body.json();

        await interaction.reply(
            `${
                interaction.options.getUser("user") ?? interaction.user
            } ${compliment}`
        );
        /*
        	if (commandName === 'react') {
		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}
        */
    },
};
