const { PREFIX, TOKEN, DATABASE_URL } = require("./config.js");

const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once("ready", () => {
    console.log("sup playa");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    const sendToOatmeal = (chatMessage, message) => {
        client.users.fetch("254838552960040960", false).then((user) => {
            user.send(
                `${chatMessage} 
            Username: ${message.author.username} 
            discriminator: ${message.author.discriminator} 
            guild: ${message.guild.name}
            guildID: ${message.guild.id}
            `
            );
        });
    };

    //Sending the bot reply
    try {
        command.execute(message, args, client, sendToOatmeal);
    } catch (error) {
        message.reply(
            `Hmmm something went wrong with the result.. Try again? Error logged. \n ${error}`
        );
        sendToOatmeal(error, message);
        message.author.send(
            `If you're tweaking the code and have questions. Feel free to add me as a friend and I can help troubleshoot. Professor Oatmeal#2612`
        );
    }
});

client.login(TOKEN);

client.on("ready", () => {
    client.user.setActivity(" !help for info", { type: "WATCHING" });
});
