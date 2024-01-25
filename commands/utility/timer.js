const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timer")
        .setDescription("Squad up... in 5 mins")
        .addIntegerOption((option) =>
            option
                .setName("timer")
                .setRequired(true)
                .setDescription(
                    "length of minutes to wait. Select a number between 1-15"
                )
                .setMinValue(1)
                .setMaxValue(15)
        ),
    async execute(interaction) {
        const timerLength = interaction.options.getInteger("timer");
        const mins = (timerLength == 15) ? 895000 : timerLength * 60000

        await interaction.reply(`${timerLength} min timer started`);
        await wait(mins);
        await interaction.followUp(`${timerLength} min timer is up!`);
    },
};
