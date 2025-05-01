# Discord bot that insults/praises + more to your friends.

## Throw a random insult/praise or just spice it up with a random/searched gif.

## Invite?

https://discord.com/api/oauth2/authorize?client_id=613364681750609943&permissions=8&scope=bot

#### This little project started as something to insult friends with a random api. It since has become a fun project. I use it to learn and try new concepts while adding new features to the bot.

#### Please feel free to ping me with suggestions or requests!

---

<dl>
  <dt>Some highlights and things I've learned from this bot:</dt>

  <dd>6 different API's (insult, praise, gif, cowspeak)</dd>
  <dd>PostgreSQL queries to update and get statistics of bot</dd>
  <dd>Learned/implemented about object oriented programming and polymorphism on statistics.js</dd>
  <dd>Learned/implemented a command handler for ease of adding commands and just general code viewing</dd>
</dl>

```
/insult @person

/praise @person

/gif

/gif searchterm

/moo sentence

/8ball question

/timer 5 mins

/choose this or that?

/dadjoke

/poll Which number is better? +1 +2

/comment hey can we add this feature?

/help for a list of commands


```

API links:

-   ~~[Insults](https://rapidapi.com/Lakerolmaker/api/insult-generator/endpoints)~~ No longer works
-   ~~[Insults](https://insult.mattbas.org/api/insult)~~ Inconsistent
-   [Insults](https://github.com/tdnicola/toast_and_roast_api) Made one I know should always be up. But don't quote me on that...
-   ~~[Praises](https://complimentr.com/api)~~ No longer works
-   [Praises](https://github.com/tdnicola/toast_and_roast_api)
-   [Gifs](https://api.giphy.com/v1/gifs/random)
-   [CowSay](http://cowsay.morecode.org/)
-   ~~[8Ball](https://8ball.delegator.com/)~~ RIP from Heroku
-   [8Ball](https://eightballapi.com/api) --possible replacement. WIP 12/19/22
-   [dadJoke](http://icanhazdadjoke.com) 

## Requirements

1. [Need Node.js and Discord.js installed](https://discordjs.guide/preparations/#installing-node-js)
2. [Create discord bot account](https://discordpy.readthedocs.io/en/stable/discord.html) and add it to your server. Add token to .env

## Installation

1. git clone https://github.com/tdnicola/discord_insult-bot
2. npm i
3. create .env file based on env.sample file

-   TOKEN=discord bot token
-   ~~PREFIX=currently !~~ --Unused now, changed to slash commands
-   GIF_TOKEN=giphy token
-   DATABASE_URL=heroku postgres string (if wanted to your own tracking. Would have to set up own server)

4. comment out stat api calls if no need for tracking stats
5. node bot.js
6. comment out sendToOatmeal function in interactionCreate.js Or change the userID to yours. (This is sending errors to me for troubleshooting)

#### FINAL HEROKU POSTGRES STATS 12/5/22: RIP HOMIE

| Command                     | Counts |
| --------------------------- | ------ |
| Insults:                    | 804    |
| Praises:                    | 446    |
| Gifs:                       | 704    |
| CowSpeaks:                  | 107    |
| Thanks given:               | 6      |
| 8Balls:                     | 146    |
| Incorrect channels (noobs): | 9      |

~~deployed on heroku~~ Local home server
