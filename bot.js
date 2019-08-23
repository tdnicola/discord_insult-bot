const Discord = require('discord.js');
const { prefix, token, rapidAPIHost, rapidAPIKey, gifToken } = require('./config.json');
const client = new Discord.Client();
var unirest = require("unirest");


client.once('ready', () => {
    console.log('sup playa')
})

client.on('message', message => {

    // if (message.author == client.user ){
    //     return
    // }

    if(message.content.startsWith(`${prefix}insult`)) {
        // if (message.author == client.user ) return

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
            let member = message.mentions.members.first();

            if (member == '' || member == null)
                message.reply('Dude you had to include two things and you screwed that up...');
            else {
            message.channel.send('@' + member.displayName + ', ' + insult + '.');
            message.react("🔥");
            
            }
        });
    }

    else if(message.content.startsWith(`${prefix}praise`)) {

        var req = unirest("GET", "https://complimentr.com/api");
        
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            var praise = String(res.body.compliment);
            let member = message.mentions.members.first();

            if (member == '' || member == null)
                message.reply('Dude you had to include two things and you screwed that up...');
            else {
            message.channel.send('I\'m sorry I insulted you @' + member.displayName + ', ' + praise + '.');
            message.react("🙏");
            }
        });
    }

   else if(message.content.startsWith(`${prefix}gif`)) {
        var req = unirest("GET", "http://api.giphy.com/v1/gifs/random?api_key=" + gifToken);
        
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            var gif = res.body.data.url;

            message.channel.send("I hope this is a good one..")
            message.channel.send(gif)
        });
    }

    else if(message.content.startsWith(`${prefix}help`)) {
            message.channel.send("Throw and insult with !insult @person")
            message.channel.send("Praise a homie with !praise @person")
            message.channel.send("Random gif? !gif ")
    }
});


client.on('ready', () => {
    client.user.setActivity('for Noobs. !help for info', { type: 'Poon' });
});

client.login(token);
