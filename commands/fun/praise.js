const stats = require("../.././statistics");
const unirest = require("unirest");
const req = unirest("GET", "https://complimentr.com/api");

module.exports = {
    name: "praise",
    description: "Praise me like you shoulddddddd...",
    usage: "<@user> !praise @professorOatmeal",
    args: false,
    execute(message, args) {
        let member = message.mentions.members.first();

        //no mention no api call
        if (member == "" || member == null) {
            return message.reply(
                "Dude you had to include two things and you screwed that up..."
            );
        }

        if (member.user.username === message.author.username) {
            return message.reply("We get it, you like yourself..");
        }

        req.end((res) => {
            var praise = String(res.body.compliment);
            try {
                return message.channel
                    .send(`<@${member.id}>, ${praise}.`)
                    .then((e) => {
                        e.react("🙏");
                        stats.praise.update();
                    })
                    .catch((err) => {
                        return `Praise error: ${err}`;
                    });
            } catch (err) {
                return `Praise error: ${err}`;
            }
        });
    },
};
