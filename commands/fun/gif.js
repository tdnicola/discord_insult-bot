const { request } = require("undici");
const { SlashCommandBuilder } = require("discord.js");
const { GIF_TOKEN } = require("../.././config.js");
// var searchGifURLBase = `https://api.giphy.com/v1/gifs/search?&api_key=${GIF_TOKEN}&q=`;
// var randomGifURLBase = `https://api.giphy.com/v1/gifs/random?api_key=${GIF_TOKEN}`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("giphy you for me")
        .addStringOption((option) =>
            option
                .setName("search")
                .setDescription(
                    "Search for a random gif or no search term for completely random gif."
                )
        ),
    async execute(interaction) {
        const gifSearchTerm = interaction.options.getString("search");

        if (!gifSearchTerm) {
            var gifURLBase = `http://api.giphy.com/v1/gifs/random?api_key=${GIF_TOKEN}`;

            const gifURL = await request(gifURLBase);

            const { data } = await gifURL.body.json();

            await interaction.reply({
                files: [data.images.fixed_height.url],
                ephemeral: true,
            });
        } else {
            splitMessage = gifSearchTerm.split(" ");
            gifSearchSplitMessage = splitMessage.join("+");
            var gifURLBase = `https://api.giphy.com/v1/gifs/search?&api_key=${GIF_TOKEN}&q=${gifSearchSplitMessage}&limit=35`;

            const gifURL = await request(gifURLBase);

            // const { url } = await gifURL.body.data.images.fixed_height.json();
            const { data } = await gifURL.body.json();

            var totalResponses = await data.length;
            var resIndex = Math.floor(Math.random() * totalResponses);
            var selectedGif = data[resIndex];

            if (!totalResponses) {
                return await interaction.reply(
                    "Weird search homie, no results.."
                );
            }

            await interaction.reply({
                files: [selectedGif.images.fixed_height.url],
            });
        }
    },
};
