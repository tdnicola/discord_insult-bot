const { PREFIX } = require("../.././config.js");

module.exports = {
    name: "help",
    description: "List all of the commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push(
                "Here's a list of all my commands, use ! infront of the command:"
            );
            data.push(commands.map((command) => command.name).join(", "));
            data.push(
                `\nYou can send \`${PREFIX}help <command>\` to get info on a specific command.`
            );

            return message.reply(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("cmon now...Reading is are good");
        }

        data.push(`**Name:** ${command.name}`);

        if (command.description)
            data.push(`**Description:** ${command.description}`);
        if (command.usage)
            data.push(`**Usage:** ${PREFIX}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};
