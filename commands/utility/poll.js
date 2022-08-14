const Discord = require("discord.js");

module.exports = {
    name: "poll",
    description: "Let's see what the people want.",
    usage: "<Poll question +opt1 +opt2... etc>  !poll what is your favorite animal? +dog +cat",
    args: false,
    execute(message, args, client, sendToOatmeal) {
        separator = "+";
        questionArgs = args;

        const findQuestionSeperator = args.find((option) =>
            option.includes(separator)
        );

        pollOptions = message.content.split(separator);
        console.log(pollOptions);
        pollOptions.shift();

        if (pollOptions.length > 0) {
            const questionIndex = questionArgs.indexOf(findQuestionSeperator);
            questionArgs.length = questionIndex;
            question = questionArgs.join(" ");

            const alphabet = [
                "🇦",
                "🇧",
                "🇨",
                "🇩",
                "🇪",
                "🇫",
                "🇬",
                "🇭",
                "🇮",
                "🇯",
                "🇰",
                "🇱",
                "🇲",
                "🇳",
                "🇴",
                "🇵",
                "🇶",
                "🇷",
                "🇸",
                "🇹",
                "🇺",
                "🇻",
                "🇼",
                "🇽",
                "🇾",
                "🇿",
            ];

            // if (pollOptionsCount.length > alphabet.length) {
            //     return message.channel.send(
            //         "Too many poll options. Please use less than 26.. My goodness what kind of poll is this?"
            //     );
            // }
            const alphabetIconArray = [];

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`📊 ${question}`)
                .setAuthor(`${message.author.username}`);

            let count = 0;
            pollOptions.forEach((option) => {
                alphabetIconArray.push(alphabet[count] + " " + option);
                count++;
            });

            message.delete();

            exampleEmbed.setDescription(alphabetIconArray.join("\n\n"));

            message.channel.send(exampleEmbed).then((msg) => {
                for (let i = 0; i < pollOptions.length; i++) {
                    msg.react(alphabet[i]);
                }
            });
        } else {
            return message.channel.send(
                "What kind of poll does not have a question?"
            );
        }
    },
};
