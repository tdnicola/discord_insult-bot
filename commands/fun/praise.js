const { request } = require(`undici`);
const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`praise`)
        .setDescription(`Hey you're pretty cool.`)
        .addUserOption((option) =>
            option.setName(`user`).setDescription(`Let's be nice to people`)
        ),
    async execute(interaction) {
        const insultURL = await request(
            `http://host.docker.internal:5000/compliment`
        );
        const body = await insultURL.body.json(); 
        const compliment = body.message; 

        await interaction.deferReply();

        const message = await interaction.editReply(
            `${
                interaction.options.getUser("user") ?? interaction.user
            } ${compliment}`
        );
        message.react(`🙏`);
        /*
        	if (commandName === 'react') ${
		const message = await interaction.reply(${ content: 'You can react with Unicode emojis!', fetchReply: true });
		message.react('😄');
	}
        */
    },
};
