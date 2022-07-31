module.exports = {
    name: "ping",
    description: "Ping!",
    args: false,
    execute(message, args) {
        return message.channel.send("Pong.");
    },
};
