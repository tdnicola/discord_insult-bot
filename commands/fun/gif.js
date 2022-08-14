const { GIF_TOKEN } = require("../.././config.js");
var searchGifURLBase = `https://api.giphy.com/v1/gifs/search?&api_key=${GIF_TOKEN}&q=`;
var randomGifURLBase = `http://api.giphy.com/v1/gifs/random?api_key=${GIF_TOKEN}`;
const stats = require("../.././statistics");
const unirest = require("unirest");

module.exports = {
    name: "gif",
    description: "giphy you for me!",
    args: false,
    usage: "<searchterm> !gif dogs . For a random gif just !gif",
    execute(message, args) {
        noWeirdEmojis = message.content.replace(/[^\w\s]|_/g, "");

        let splitMessage = noWeirdEmojis.split(" ");

        //emoji has search term behind the 1st word
        if (splitMessage.length >= 2) {
            splitMessage.shift();
            splitMessage = splitMessage.join("+");
            console.log(splitMessage);
            joinedArgs = args.join("+");
            console.log(joinedArgs);

            var gifSearchURL = `${searchGifURLBase}${splitMessage}&limit=35`;
            var req = unirest("GET", gifSearchURL);

            req.end((res) => {
                var totalResponses = res.body.data.length;
                var resIndex = Math.floor(Math.random() * totalResponses);
                var selectedGif = res.body.data[resIndex];

                if (res.error) {
                    return res.error;
                }

                if (!totalResponses) {
                    return message.channel.send(
                        "Weird search homie, no results.."
                    );
                }

                try {
                    return message.channel
                        .send({ files: [selectedGif.images.fixed_height.url] })
                        .then(() => {
                            stats.gif.update();
                        })
                        .catch((err) => {
                            return err;
                        });
                } catch (err) {
                    return err;
                }
            });

            // no search term and results in random gif
        } else {
            var req = unirest("GET", randomGifURLBase);

            req.end((res) => {
                if (res.error) {
                    return res.error;
                }

                var gif = res.body.data.images.fixed_height.url;
                message.channel.send("I hope this is a good one..");
                try {
                    return message.channel
                        .send({ files: [gif] })
                        .then(() => {
                            stats.gif.update();
                        })
                        .catch((err) => {
                            return err;
                        });
                } catch (err) {
                    return err;
                }
            });
        }
    },
};
