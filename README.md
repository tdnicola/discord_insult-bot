# Discord bot that insults your friends. 

## Throw a random insult/praise or just spice it up with a random/searched gif.

#### This little project started as something to insult friends with a random api. It since has become a fun project that quickly grew into much more. I use it to learn and try new concepts while adding new features to the bot.

___
<dl>
  <dt>Some highlights and things I've learned from this bot:</dt>

  <dd>5 different API's (insult, praise, gif, cowspeak, 8ball)</dd>
  <dd>PostgreSQL queries to update and get statistics of bot</dd>
  <dd>Learned/implemented about polymorphism on statistics.js</dd>
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

Insults from:

https://rapidapi.com/Lakerolmaker/api/insult-generator/endpoints API.

Praises from: 

https://complimentr.com/api

Gifs from:

https://api.giphy.com/v1/gifs/random

CowSay from:

http://cowsay.morecode.org/

CowSay from:

http://cowsay.morecode.org/

8Ball from:

https://8ball.delegator.com/

Invite?

https://discordapp.com/api/oauth2/authorize?client_id=613364681750609943&permissions=0&scope=bot


###### _!move requires some configuring to work and most likely won't work on the live version because right now it is specific to each server (emoji id)._

###### _Currently when called with !move it will search the last 20 messages in the channel it is called for an emoji (that you specify) on the message you would like to move. If no terms come after !move it defaults to move item to 'general' chat. if a term is after !move it searches for that channel to move to. !move chat will search the last 20 messages for the emoji id, if found it will move the message to the 'chat' channel._

###### _If you wanted to clone and run yourself to work with it you would need to pull the emoji id you would like it to search for to move the message. Feel free to email me if you have questions or are trying to do something yourself similiar, this one took me a little bit._

deployed on heroku