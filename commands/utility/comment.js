const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("comment")
        .setDescription(
            "Send me a comment about the bot or a suggestion to add. Post will be deleted after it is sent."
        )
        .addStringOption((option) =>
            option
                .setName("comment")
                .setRequired(true)
                .setDescription("Hey man can you add a random pokemon command?")
        ),
    async execute(interaction, sendToOatmeals) {
        const userComment = interaction.options.getString("comment");
        sendToOatmeals(`${userComment}`);
        await interaction.reply("Comment sent. Thank you");
    },
};
/*


module.exports = {
    name: "comment",
    description: "Send a suggestions or make a general comment on the bot",
    usage: "<comment> !comment can you add a pokemon random command to return random pokemon names?",
    args: false,
    execute(message, args, client, sendToOatmeal) {
        if (args.length >= 1) {
            sendToOatmeal(args.join(" "), message);

            return message.channel.send("Comment logged, Thank you.");
        } else {
            return message.channel.send(
                "What kinda comment is empty? The boring kind.."
            );
        }
    },
};
*/
