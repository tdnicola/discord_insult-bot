const Discord = require('discord.js');
const { prefix, token, rapidAPIHost, rapidAPIKey } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('sup playa')
})

client.on('message', message => {

    if(message.content.startsWith(`${prefix}insult`)) {
        var unirest = require("unirest");

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
            var insult = res.raw_body.toLowerCase();
            let member = message.mentions.members.first()

            if (member == '' || member == null)
                message.reply('Dude you had to include two things and you screwed that up...');
            else {
            message.channel.send(member.displayName + ', ' + insult)
            }
        });
    }
    if (message.author != client.user ){
        return
    }
        message.react("🔥")
});

client.on('ready', () => {
    client.user.setActivity('for Noobs', { type: 'Watching' });
});

client.login(token)