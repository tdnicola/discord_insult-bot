// const stats = require("../.././statistics");

// module.exports = {
//     name: "stats",
//     description: "stats about the discord bot.",
//     execute(message, args, client) {
//         statsInfo = "";
//         totalServerCount = client.guilds.cache.size;
//         stats.stats.update((result) => {
//             statsInfo = result;
//             function dontIndent(str) {
//                 return ("" + str).replace(/(\n)\s+/g, "$1");
//             }
//             try {
//                 return message.channel.send(
//                     dontIndent(
//                         `\`\`\`Insults: ${statsInfo.insult}
//                     Praises: ${statsInfo.praise}
//                     Gifs: ${statsInfo.gif}
//                     CowSpeaks: ${statsInfo.cow}
//                     Thanks given: ${statsInfo.ty}
//                     8Balls: ${statsInfo.answer}
//                     Bot currently on ${totalServerCount} servers
//                     \`\`\``
//                     )
//                 );
//             } catch (err) {
//                 return err;
//             }
//         });
//     },
// };
