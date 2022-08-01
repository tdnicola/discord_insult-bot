# Discord bot that insults/praises + more to your friends.

## Throw a random insult/praise or just spice it up with a random/searched gif.

## Invite?

https://discordapp.com/api/oauth2/authorize?client_id=613364681750609943&permissions=0&scope=bot

#### This little project started as something to insult friends with a random api. It since has become a fun project. I use it to learn and try new concepts while adding new features to the bot.

---

<dl>
  <dt>Some highlights and things I've learned from this bot:</dt>

  <dd>6 different API's (insult, praise, gif, cowspeak, 8ball, Postgres)</dd>
  <dd>PostgreSQL queries to update and get statistics of bot</dd>
  <dd>Learned/implemented about object oriented programming and polymorphism on statistics.js</dd>
  <dd>Learned/implemented a command handler for ease of adding commands and just general code viewing</dd>
</dl>

```
!insult @person

!praise @person

!gif

!gif searchterm

!moo sentence

!8ball question

!timer 5 mins

!comment hey can we add this feature?

!help for a list of commands


```

API links:

-   ~~[Insults](https://rapidapi.com/Lakerolmaker/api/insult-generator/endpoints)~~ No longer works
-   [Insults](https://insult.mattbas.org/api/insult)
-   [Praises](https://complimentr.com/api)
-   [Gifs](https://api.giphy.com/v1/gifs/random)
-   [CowSay](http://cowsay.morecode.org/)
-   [8Ball](https://8ball.delegator.com/)

## Requirements

1. [Need Node.js and Discord.js installed](https://discordjs.guide/preparations/#installing-node-js)
2. Create discord account for your bot and add it to your server. Add token to config.json

## Installation

1. git clone https://github.com/tdnicola/discord_insult-bot
2. npm i
3. update config.json file with tokens:

-   Token: discord bot token
-   Prefix: currently !
-   Giftoken: giphy token
-   ConnectionString: heroku postgres string (if wanted to your own tracking. Would have to set up own server)

4. comment out stat api calls if no need for tracking stats
5. node bot.js

#### Current Stats 7/31/22:

###### Currently on 38 servers

| Command                     | Counts |
| --------------------------- | ------ |
| Insults:                    | 581    |
| Praises:                    | 379    |
| Gifs:                       | 638    |
| CowSpeaks:                  | 99     |
| Thanks given:               | 6      |
| 8Balls:                     | 103    |
| Incorrect channels (noobs): | 9      |

deployed on heroku
