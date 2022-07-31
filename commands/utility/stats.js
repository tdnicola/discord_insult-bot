const stats = require("../.././statistics");

module.exports = {
    name: "stats",
    description: "stats about the discord bot!",
    execute(message, args) {
        statsInfo = "";

        stats.stats.update((result) => {
            statsInfo = result;
            console.log(statsInfo);
            try {
                return message.channel.send(
                    "```" +
                        "Insults: " +
                        statsInfo.insult +
                        "\n" +
                        "Praises: " +
                        statsInfo.praise +
                        "\n" +
                        "Gifs: " +
                        statsInfo.gif +
                        "\n" +
                        "CowSpeaks: " +
                        statsInfo.cow +
                        "\n" +
                        "Thanks given: " +
                        statsInfo.ty +
                        "\n" +
                        "8Balls: " +
                        statsInfo.answer +
                        "\n" +
                        "Incorrect channels (noobs): " +
                        statsInfo.move +
                        "```"
                );
            } catch (err) {
                return err;
            }
        });
    },
};
