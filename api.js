const { prefix, token, rapidAPIHost, rapidAPIKey } = require('./config.json');
var unirest = require("unirest");

module.exports.run = (bot, message, args) => {
    if (message.content.startsWith(config.prefix)) {
        let member = message.mentions.members.first();

        var req = unirest("GET", "https://lakerolmaker-insult-generator-v1.p.rapidapi.com/");

        req.query({
            "mode": "random"
        });

        req.headers({
            "x-rapidapi-host": rapidAPIHost,
            "x-rapidapi-key": rapidAPIKey
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            var insult = result.raw_body.toLowerCase();
            
            if (member == '' || member == null)
                    message.reply('Dude you need two things and you can\'t even get that right...');
            else {
                message.channel.send(member + ', ' + insult);
            }
        });
    }
}
