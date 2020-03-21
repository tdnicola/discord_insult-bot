# Discord bot that insults/praises + more to your friends. 

## Throw a random insult/praise or just spice it up with a random/searched gif.

#### This little project started as something to insult friends with a random api. It since has become a fun project that quickly grew into much more. I use it to learn and try new concepts while adding new features to the bot.

___
<dl>
  <dt>Some highlights and things I've learned from this bot:</dt>

  <dd>5 different API's (insult, praise, gif, cowspeak, 8ball)</dd>
  <dd>PostgreSQL queries to update and get statistics of bot</dd>
  <dd>Learned/implemented about object oriented programming and polymorphism on statistics.js</dd>
</dl>

```
!insult @person

!praise @person

!gif

!gif searchterm

!moo sentence

!8ball question

!move to move a message (configure info below)

!help for info in chat on the commands


```

API links:

* ~~[Insults](https://rapidapi.com/Lakerolmaker/api/insult-generator/endpoints)~~ No longer works
* [Insults](https://insult.mattbas.org/api/insult)
* [Praises](https://complimentr.com/api)
* [Gifs](https://api.giphy.com/v1/gifs/random)
* [CowSay](http://cowsay.morecode.org/)
* [8Ball](https://8ball.delegator.com/)


Invite?

https://discordapp.com/api/oauth2/authorize?client_id=613364681750609943&permissions=0&scope=bot

<!-- Want to clone and run yourself?
git clone https://github.com/tdnicola/discord_insult-bot
npm i
update config files with tokens
comment out stat api calls
node bot.js -->

###### _!move requires some configuring to work and most likely won't work on the live version because right now it is specific to each server (emoji id)._

###### _Currently when called with !move it will search the last 20 messages in the channel it is called for an emoji (that you specify) on the message you would like to move. If no terms come after !move it defaults to move item to 'general' chat. if a term is after !move it searches for that channel to move to. !move chat will search the last 20 messages for the emoji id, if found it will move the message to the 'chat' channel._

###### _If you wanted to clone and run yourself to work with it you would need to pull the emoji id you would like it to search for to move the message. Feel free to email me if you have questions or are trying to do something yourself similiar, this one took me a little bit._

deployed on heroku