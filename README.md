# What is this?

Folder (and json) based Discord(discord.js v13/12) compatible database.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```
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

```
db.userGet(discordUser,"index")
```

### db#userSet

```
db.userSet(discordUser,"index","value")
```

### db#userPush

```
db.userPush(discordUser,"ArrayIndex","value")
```

### db#userAdd

```
db.userAdd(discordUser,"NumberIndex","value")
```

## db#member

### db#memberGet

```
db.memberGet(discordGuildMember,"index")
```

### db#memberSet

```
db.memberSet(discordGuildMember,"index","value")
```

### db#memberPush

```
db.memberPush(discordGuildMember,"ArrayIndex","value")
```

### db#memberAdd

```
db.memberAdd(discordGuildMember,"NumberIndex","value")
```

## db#guild

### db#guildGet

```
db.guildGet(discordGuild,"index")
```

### db#guildSet

```
db.guildSet(discordGuild,"index","value")
```

### db#guildPush

```
db.guildPush(discordGuild,"ArrayIndex","value")
```

### db#guildAdd

```
db.guildAdd(discordGuild,"NumberIndex","value")
```

## db#global

### db#get

```
db.get("index")
```

### db#set

```
db.set("index","value")
```

### db#push

```
db.push("ArrayIndex","value")
```

### db#add

```
db.add("NumberIndex","value")
```