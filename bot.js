const Discord = require('discord.js');
const { prefix, token, rapidAPIHost, rapidAPIKey, gifToken } = require('./config.json');
const client = new Discord.Client();
var unirest = require("unirest");
var ytdl = require('ytdl-core');


client.once('ready', () => {
    console.log('sup playa');
});

client.on('message', async message => {

//Insults
    if(message.content.startsWith(`${prefix}insult`)) {
        var req = unirest("GET", "https://insult.mattbas.org/api/insult");

        // old insult site not currently working https://lakerolmaker-insult-generator-v1.p.rapidapi.com/
        // req.query({
        //     "mode": "random"
        // });

        // req.headers({
        //     "x-rapidapi-host": rapidAPIHost,
        //     "x-rapidapi-key": rapidAPIKey
        // });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            var insult = res.raw_body.toLowerCase();
            let member = message.mentions.members.first();

            if (member == '' || member == null) {
                message.reply('Dude you had to include two things and you screwed that up...');
            } else {
                message.channel.send(member + ', ' + insult + '.')
                    .then(e => {
                        e.react("🔥");
                    });
            }
        });
    }

//praises
    else if(message.content.startsWith(`${prefix}praise`)) {
        var req = unirest("GET", "https://complimentr.com/api");
        
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            var praise = String(res.body.compliment);
            let member = message.mentions.members.first();

            if (member == '' || member == null) {
                message.reply('Dude you had to include two things and you screwed that up...');
            } else {
                message.channel.send(member + ', ' + praise + '.')
                    .then(e => {
                        e.react("🙏");
                    });
            }
        });
    }

//Gifs
   else if(message.content.startsWith(`${prefix}gif`)) {
       //Removing emojis that crashed app
        noWeirdEmojis = message.content.replace(/[^\w\s]|_/g, "")
 
        let splitMessage = noWeirdEmojis.split(' ');

        if (splitMessage.length >= 2) {
            splitMessage.shift();
            splitMessage = splitMessage.join("+");

            var req = unirest("GET", "https://api.giphy.com/v1/gifs/search?&api_key=" + gifToken + "&q=" + splitMessage + '&limit=35');
            
            req.end(function (res) {
                var totalResponses = res.body.data.length;

                if (res.error) {
                    throw new Error(res.error);
                } else if (!totalResponses) {
                    message.channel.send('Weird search homie, no results..');
                } else {
                    // console.log(res)
                    var resIndex = Math.floor(Math.random() * (totalResponses));
                    var selectedGif = res.body.data[resIndex];

                    message.channel.send({files: [selectedGif.images.fixed_height.url]});
                }
            });
        } else {
            var req = unirest("GET", "http://api.giphy.com/v1/gifs/random?api_key=" + gifToken);
            
            req.end(function (res) {
                if (res.error) throw new Error(res.error);
                
                var gif = res.body.data.images.fixed_height.url;

                message.channel.send("I hope this is a good one..");
                message.channel.send({files: [gif]});
            });
        }
    }

// random mocking
    else if(message.content.includes('i like')) {
        if (message.author == client.user) return;
        message.channel.send('I\'m ' + message.author + ' and ' + message.content + ', herp derp...');
    }


//help
    else if(message.content.startsWith(`${prefix}help`)) {
            message.channel.send("Throw an insult with !insult @person");
            message.channel.send("Praise a homie with !praise @person");
            message.channel.send("Random gif? !gif ");
            message.channel.send("Search for a random gif? !gif fail");
            message.channel.send("CowSpeak? !moo");
    }

//cow speak
    else if (message.content.startsWith(`${prefix}moo`)) {
        let splitMessage = message.content.split(' ');

        if (splitMessage.length >= 2) {
            splitMessage.shift();
            splitMessage = splitMessage.join("+");

// working around when moospeak isn't formatted by discord..
            // var endOfMessage = [
            //         '+.+Dear+lord+make+this+pain+end...',
            //         '+.+I+hurt+so+much...',
            //         '+.+Please+stop+this...',
            //         '+soufojsfojlwdfbfbs....',
            //         '+.+Why+me...',
            // ]
            
            // var randomCow = Math.floor(Math.random() * (endOfMessage.length));
            // console.log(randomCow)


        var req = unirest('GET', "http://cowsay.morecode.org/say?message=" + splitMessage + '&format=text');

        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            message.channel.send('```' + res.body + '```');
            // console.log(res.body);
        });
        } else {
            message.channel.send("Gotta have words behind it homie.");
        }
    }

//YW message
    else if(message.content.startsWith(`ty bot`)) {
        message.author.send('You\'re welcome. Don\'t tell anyone I said that.')
    }

//8Ball
    else if (message.content.startsWith(`${prefix}8ball`)) {
        let query = message.content.split(' ')
        query.shift()
        let answer = query.join(' ')
        var req = unirest('get',"https://8ball.delegator.com/magic/JSON/" + answer)

        req.end((res) => {
            if (res.error) throw new Error(res.error);
            message.channel.send('```' + "Question: " + res.body.magic.question + '\n' + "Answer: " + res.body.magic.answer + '```');
            console.log(res.body);
        });

    }

//         let params = encodeURIComponent("Is today going to be a good day?");
// let uri = "https://8ball.delegator.com/magic/JSON/" + params;
// fetch(uri)
//   .then(response => response.json())
//   .then(json => {
//     console.log(json);
//   });
//     )
    //workinng with a music bot
    // else if (message.content.startsWith(`${prefix}play`)) {
    //     const voiceChannel = message.member.voiceChannel;
    //     if(!voiceChannel) return message.channel.send('join a voice channel homie');

    //     try {
    //         var connection = await voiceChannel.join();
    //     } catch (err) {
    //          console.log(`can\'t join ${err}`)
    //     }
    //     const dispatcher = connection.playStream(ytdl(args[1]))
    //         .on('end', () => {
    //             console.log('song ended')
    //             voiceChannel.leave();
    //         })
    //         .on('error', () => {
    //             console.error(error);
    //         })

    //         dispatcher.setVolumeLogarithmic(5 / 5);

    // }
});

client.on('ready', () => {
    client.user.setActivity(' !help for info', { type: 'Scanning for noobs' });
});

client.login(token);
