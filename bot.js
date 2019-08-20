const Discord = require('discord.js');
const { prefix, token, rapidAPIHost, rapidAPIKey } = require('./config.json');
const client = new Discord.Client();
// const insult = require('./api');


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
            // insult = res.body
            // return insult
            console.log(res.body);
        });
    
        let member = message.mentions.members.first()
        message.channel.send(member.displayName + ', ' )
        // console.log(insult)
    }
});

// console.log(res.body)
client.login(token)