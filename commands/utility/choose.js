module.exports = {
    name: "choose",
    description: "Choose which one for me",
    args: true,
    usage: "<option1 or option2> !choose league of legends or apex or..?",
    execute(message, args) {
        messageString = args.join(" ");
        separator = " or ";
        question = messageString.split(separator);
        randomAnswer = question[Math.floor(Math.random() * question.length)];

        message.channel.send(randomAnswer);
    },
};
