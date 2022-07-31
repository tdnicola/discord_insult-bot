const unirest = require("unirest");

module.exports = {
    name: "moo",
    description: "Cowspeak, Moo i'm a cow...",
    usage: "<request> !moo i am a cow.",
    args: true,
    execute(message, args) {
        if (args.length >= 1) {
            joinedMessage = args.join("+");

            const mooURL = `http://cowsay.morecode.org/say?message=${joinedMessage}&format=text`;
            var req = unirest("GET", mooURL);

            req.end((res) => {
                if (res.error) {
                    return res.error;
                }
                try {
                    return message.channel
                        .send("```" + res.body + "```")
                        .then(() => {
                            stats.cow.update();
                        })
                        .catch((err) => {
                            return err;
                        });
                } catch (error) {
                    return error;
                }
            });
        } else {
            return message.channel.send("Gotta have words behind it homie.");
        }
    },
};
