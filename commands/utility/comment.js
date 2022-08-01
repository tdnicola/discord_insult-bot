module.exports = {
    name: "comment",
    description: "Send a suggestions or make a general comment on the bot",
    usage: "<comment> !comment can you add a pokemon random command to return random pokemon names?",
    args: false,
    execute(message, args, client, sendToOatmeal) {
        if (args.length >= 1) {
            sendToOatmeal(args.join(" "), message);

            return message.channel.send("Comment logged, Thank you.");
        } else {
            return message.channel.send(
                "What kinda comment is empty? The boring kind.."
            );
        }
    },
};
