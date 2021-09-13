# What is this?

KoiosDb is a folder/JSON-based database designed for Discord.js projects.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```js
const koiosdb = require("@erdemgoksel/koiosdb");
let db = new koiosdb("db");

async function setMoney(discordUser,newMoney) {
    await db.userSet(discordUser,"money",newmoney);
    let money = await db.userGet(discordUser,"money");
    console.log("money set to " + money + "!");
}
```

# Methods List

## db#user

### db#userGet

```js
db.userGet(discordUser,"index")
```

### db#userSet

```js
db.userSet(discordUser,"index","value")
```

### db#userPush

```js
db.userPush(discordUser,"ArrayIndex","value")
```

### db#userAdd

```js
db.userAdd(discordUser,"NumberIndex","value")
```

## db#member

### db#memberGet

```js
db.memberGet(discordGuildMember,"index")
```

### db#memberSet

```js
db.memberSet(discordGuildMember,"index","value")
```

### db#memberPush

```js
db.memberPush(discordGuildMember,"ArrayIndex","value")
```

### db#memberAdd

```js
db.memberAdd(discordGuildMember,"NumberIndex","value")
```

## db#guild

### db#guildGet

```js
db.guildGet(discordGuild,"index")
```

### db#guildSet

```js
db.guildSet(discordGuild,"index","value")
```

### db#guildPush

```js
db.guildPush(discordGuild,"ArrayIndex","value")
```

### db#guildAdd

```js
db.guildAdd(discordGuild,"NumberIndex","value")
```

## db#global

### db#get

```js
db.get("index")
```

### db#set

```js
db.set("index","value")
```

### db#push

```js
db.push("ArrayIndex","value")
```

### db#add

```js
db.add("NumberIndex","value")
```