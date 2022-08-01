const unirest = require("unirest");
const req = unirest("GET", "https://insult.mattbas.org/api/insult");
const stats = require("../.././statistics");

module.exports = {
    name: "insult",
    description: "Get gud noob!",
    usage: "<@user> !insult @professorOatmeal",
    args: true,
    execute(message, args) {
        let member = message.mentions.members.first();
        if (member == "" || member == null) {
            return message.reply(
                "Dude you had to include two things and you screwed that up..."
            );
        }
        // insults themself
        if (member.user.username === message.author.username) {
            message.reply("Dang hating on themself.. I mean I guess I can..");
        }
        req.end((res) => {
            if (res.error) {
                return res.error;
            }
            try {
                var insult = res.raw_body.toLowerCase();
                message.channel
                    .send(`<@${member.id}>, ${insult}`)
                    .then((e) => {
                        e.react("🔥");
                        stats.insult.update();
                    })
                    .catch((err) => {
                        return `insult error: ${err}`;
                    });
            } catch (err) {
                return err;
            }
        });
    },
};
