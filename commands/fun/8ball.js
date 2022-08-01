const unirest = require("unirest");

module.exports = {
    name: "8ball",
    description:
        "The magic 8ball that gives you all the answers.. Well sometimes.",
    args: true,
    usage: "<question> !8ball Why do i suck at league?",
    execute(message, args) {
        if (args.length >= 1) {
            const question = args.join(" ");
            const eightBallURL = `https://8ball.delegator.com/magic/JSON/${question}`;
            const req = unirest("get", eightBallURL);

            req.end((res) => {
                try {
                    return message.channel
                        .send(
                            "```" +
                                "Question: " +
                                res.body.magic.question +
                                "\n" +
                                "Answer: " +
                                res.body.magic.answer +
                                "```"
                        )
                        .then(() => {
                            stats.answer.update();
                        })
                        .catch((err) => {
                            return err;
                        });
                } catch (err) {
                    return err;
                }
            });
        } else {
            return message.channel.send("Gotta have words behind it homie.");
        }
    },
};
