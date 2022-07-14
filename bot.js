const { Client, MessageEmbed } = require("discord.js");
const { prefix, token, gifToken } = require("./config.json");
const client = new Client({
    partials: ["REACTION", "MESSAGE"],
    ws: { intents: ["GUILDS", "GUILD_MESSAGES"] },
});
const unirest = require("unirest");

const stats = require("./statistics");
console.log();
// token = process.env.token || token
// gifToken = process.env.gifToken || gifToken

client.once("ready", () => {
    console.log("sup playa");
});

// activity
client.on("ready", () => {
    client.user.setActivity(" !help for info", { type: "WATCHING" });
});

client.login(token);

client.on("message", async (message) => {
    //Error Messages
    const errorMessage = (error) => {
        message.channel.send(
            `Hmmm something went wrong with the result.. Try again? Error logged. \n ${error}`
        );
    };

    //make shift error handling, send myself a message
    const oatMeal = (message) => {
        client.users.fetch("254838552960040960", false).then((user) => {
            user.send(message);
        });
    };

    //return if author is bot
    if (message.author.bot) return;
    //HELP
    else if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send(
            `Throw an insult with !insult @person \nPraise a homie with !praise @person \nRandom gif? !gif \nSearch for a random gif? !gif fail \nCowSpeak? !moo \nMagic 8ball to answer your questions? !8ball why do we suck at league? \nCurrently running on ${client.guilds.cache.size} servers`
        );
        // \nStats? !stats --STATS NOT DISPLAYING CORRECTLY -NOT WORKING
        //  \nIf you\'re special, emojie gtfo on a message and !move -- CAUSING CRASHING. TEMP REMOVED
    }

    if (message.content.startsWith(`${prefix}test`)) {
        try {
            const replyMessage = await oatMeal(message);
            // replyMessage.react("🔥");
        } catch (err) {
            console.log(err);
        }
    }

    //INSULT API
    if (message.content.startsWith(`${prefix}insult`)) {
        var req = unirest("GET", "https://insult.mattbas.org/api/insult");

        //no mention no api call
        let member = message.mentions.members.first();
        if (member == "" || member == null) {
            return message.reply(
                "Dude you had to include two things and you screwed that up..."
            );
        }

        //insults themself
        if (member.user.username === message.author.username) {
            message.reply("Dang hating on themself.. I mean I guess I can..");
        }
        req.end((res) => {
            if (res.error) {
                errorMessage(res.error);
                oatMeal("insult error URL " + res.error);
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
                        oatMeal("insult error " + err);
                    });
            } catch (err) {
                oatMeal("insult api error " + err);
                errorMessage();
            }
        });
    }

    //PRAISE API
    else if (message.content.startsWith(`${prefix}praise`)) {
        var req = unirest("GET", "https://complimentr.com/api");
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

        console.log(member.user);
        req.end((res) => {
            var praise = String(res.body.compliment);
            try {
                message.channel
                    .send(`<@${member.id}>, ${praise}.`)
                    .then((e) => {
                        e.react("🙏");
                        stats.praise.update();
                    })
                    .catch((err) => {
                        oatMeal("praise stat error " + err);
                    });
            } catch (err) {
                oatMeal("praise api error " + err);
                errorMessage();
            }
        });
    }

    //GIF api
    else if (message.content.startsWith(`${prefix}gif`)) {
        //Removing emojis that crashed app
        noWeirdEmojis = message.content.replace(/[^\w\s]|_/g, "");

        let splitMessage = noWeirdEmojis.split(" ");

        //emoji has search term behind the 1st word
        if (splitMessage.length >= 2) {
            splitMessage.shift();
            splitMessage = splitMessage.join("+");

            var req = unirest(
                "GET",
                "https://api.giphy.com/v1/gifs/search?&api_key=" +
                    gifToken +
                    "&q=" +
                    splitMessage +
                    "&limit=35"
            );

            req.end((res) => {
                var totalResponses = res.body.data.length;
                var resIndex = Math.floor(Math.random() * totalResponses);
                var selectedGif = res.body.data[resIndex];

                if (res.error) {
                    errorMessage(res.error);
                    oatMeal("insult error URL " + res.error);
                }

                if (!totalResponses) {
                    return message.channel.send(
                        "Weird search homie, no results.."
                    );
                }

                try {
                    message.channel
                        .send({ files: [selectedGif.images.fixed_height.url] })
                        .then(() => {
                            stats.gif.update();
                        })
                        .catch((err) => {
                            oatMeal("gif update error " + err);
                        });
                } catch (err) {
                    errorMessage();
                    oatMeal("gif post error " + err);
                }
            });

            // no search term and results in random gif
        } else {
            var req = unirest(
                "GET",
                "http://api.giphy.com/v1/gifs/random?api_key=" + gifToken
            );

            req.end((res) => {
                if (res.error) {
                    errorMessage(res.error);
                    oatMeal("insult error URL " + res.error);
                }

                var gif = res.body.data.images.fixed_height.url;
                message.channel.send("I hope this is a good one..");
                try {
                    message.channel
                        .send({ files: [gif] })
                        .then(() => {
                            stats.gif.update();
                        })
                        .catch((err) => {
                            oatMeal("gif update error " + err);
                        });
                } catch (err) {
                    oatMeal("gif post error " + err);
                    errorMessage();
                }
            });
        }
    }

    // RANDOM mocking
    else if (message.content.includes("i like")) {
        if (message.author == client.user) return;
        message.channel.send(
            "I'm " +
                message.author.username +
                " and " +
                message.content +
                ", herp derp..."
        );
    }

    //COW speak
    else if (message.content.startsWith(`${prefix}moo`)) {
        let splitMessage = message.content.split(" ");

        if (splitMessage.length >= 2) {
            splitMessage.shift();
            splitMessage = splitMessage.join("+");

            var req = unirest(
                "GET",
                "http://cowsay.morecode.org/say?message=" +
                    splitMessage +
                    "&format=text"
            );

            req.end((res) => {
                if (res.error) {
                    errorMessage(res.error);
                    oatMeal("insult error URL " + res.error);
                }
                try {
                    message.channel
                        .send("```" + res.body + "```")
                        .then(() => {
                            stats.cow.update();
                        })
                        .catch((err) => {
                            oatMeal("cow error " + err);
                        });
                } catch (error) {
                    oatMeal("message send error " + error);
                }
            });
        } else {
            message.channel.send("Gotta have words behind it homie.");
        }
    }

    //Someone thanks the bot, YW message
    else if (message.content.toLowerCase().startsWith(`ty bot`)) {
        message.author
            .send("You're welcome. Don't tell anyone I said that.")
            .then(() => {
                stats.ty.update();
            })
            .catch((err) => {
                oatMeal("ty error " + err);
            });
    } else if (message.content.startsWith(`${prefix}testing`)) {
        const embed = new MessageEmbed()
            // Set the title of the field
            // .setTitle('A slick little embed')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            // .setDescription('Worms Mcscrommyss Poopy pants is streaming')
            .setAuthor(message.author.username);
        // .setURL('https://google.com')

        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
    //8BALL random answer
    else if (message.content.startsWith(`${prefix}8ball`)) {
        let query = message.content.split(" ");

        if (query.length >= 2) {
            query.shift();
            let answer = query.join(" ");
            var req = unirest(
                "get",
                "https://8ball.delegator.com/magic/JSON/" + answer
            );

            req.end((res) => {
                try {
                    message.channel
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
                            oatMeal("8ball stats error " + err);
                        });
                } catch (err) {
                    oatMeal("8ball error " + err);
                    errorMessage();
                }
            });
        } else {
            message.channel.send("Gotta have words behind it homie.");
        }
    } else if (message.content.startsWith(`${prefix}live`)) {
        // Dank dungeon id 242174042046595073
        // Gets the online users.
        // message.guild.members.cache.forEach(member =>console.log(member.user))

        if (message.author.username == "sonofkratos") {
            message.channel.send("https://www.twitch.tv/hitchinandwitchin");
        } else if (message.author.username == "ICHOR") {
            message.channel.send("https://www.twitch.tv/gnarly_bones");
        } else if (message.author.username == "grish") {
            message.channel.send("https://www.twitch.tv/grishyabish");
        } else if (message.author.username == "WormyMcSquirmy") {
            message.channel.send("https://www.twitch.tv/wormsmcsquirms");
        }
        // TODO add whisper to message me to add their live link
    }

    //MOVING messages from one channel to another, default move channel is 'general' if no words behind move
    // channels.find( is not a function -- REMOVING TEMPORARILY. CAUSING APP TO CRASH
    //   else if (message.content.startsWith(`${prefix}move`)) {
    //     const generalChannel = message.guild.channels.find(
    //       (channel) => channel.name === "general"
    //     );
    //     const wrongChannelName = message.channel.name;
    //     const wrongChannel = message.guild.channels.find(
    //       (channel) => channel.name === wrongChannelName
    //     );
    //     const query = message.content.split(" ");

    //     //checking admin privileges
    //     if (message.member.roles.find((r) => r.name === "admin")) {
    //       // fetching last 20 messages to see if the emoji is on any to move
    //       wrongChannel
    //         .fetchMessages({ limit: 20 })
    //         .then((messages) =>
    //           messages.map((message) => {
    //             message.reactions.map((single) => {
    //               // custom emoji id

    //               if (
    //                 single._emoji.id == "685883353773244435" ||
    //                 single._emoji.id == "685995515795734559"
    //               ) {
    //                 // if query length is greater than than 1 then split names to get channel name
    //                 if (query.length >= 2) {
    //                   removeFirstContent = query.shift();

    //                   //servers names do not have any spaces, if spaces are received, default to dashes
    //                   newChannelName = query.join("-");

    //                   //getting new channel name
    //                   const newChannelSend = message.guild.channels.find(
    //                     (channel) => channel.name === newChannelName
    //                   );
    //                   newChannelSend
    //                     .send(
    //                       message.author.username +
    //                         " on channel " +
    //                         wrongChannelName +
    //                         " says: " +
    //                         message.content
    //                     )
    //                     .then(() => {
    //                       stats.move.update();
    //                     })
    //                     .catch((err) => {
    //                       oatMeal("moved error " + err);
    //                     });
    //                 } else {
    //                   //default to send to general channel
    //                   generalChannel
    //                     .send(
    //                       message.author.username +
    //                         " on channel " +
    //                         wrongChannelName +
    //                         " says: " +
    //                         message.content
    //                     )
    //                     .then(() => {
    //                       stats.move.update();
    //                     })
    //                     .catch((err) => {
    //                       oatMeal("moved error " + err);
    //                     });
    //                 }
    //               } else {
    //                 oatMeal("emoji find error");
    //               }
    //               //delete emojie message
    //               message.delete();
    //             });
    //           })
    //         )
    //         .catch(console.error);

    //       // if no admin privileges then message be whispered to them
    //     } else {
    //       message.author.send("noob of the noobs");
    //     }

    //     //delete !move message
    //     message.delete();
    //   }
    else if (message.content.startsWith(`${prefix}stats`)) {
        statsInfo = "";
        // message.channel.send("hello");
        stats.stats.update((result) => {
            statsInfo = result;
            console.log(statsInfo);
            try {
                console.log(statsInfo.insult);
                message.channel.send(
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
                console.log(err);
                oatMeal("stats err: " + err);
            }
        });
    }
});
