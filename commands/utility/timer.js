module.exports = {
    name: "timer",
    description: "time out!",
    usage: "<1-20> !timer 5 mins for a 5 min timer",
    args: true,
    execute(message, args) {
        let numberFound = undefined;

        if (args[0] >= 1 && args[0] <= 20) {
            numberFound = args[0];
        }

        if (!numberFound) {
            return message.channel.send(
                "Please pick a timer between 1 and 20 minutes."
            );
        } else {
            message.channel.send(`${numberFound} min timer started`);
            let timerTimeout = numberFound * 60000;
            setTimeout(() => {
                message.reply(`${numberFound} minute timer is up.`);
            }, timerTimeout);
        }
    },
};
