# What is this?

Folder (and json) based Discord(discord.js v13/12) compatible database.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```
let db = require('@erdemgoksel/koiosdb')

async function setMoney(discordUser,newMoney) {
    await db.user.set(discordUser,"money",newmoney);
    let money = await db.user.set(discordUser,"money");
    console.log("money set to " + money + "!");
}
```

# Methods List

## db#user

### db#user#get

```
db.user.get(discordUser,"index")
```

### db#user#set

```
db.user.set(discordUser,"index","value")
```

### db#user#push

```
db.user.push(discordUser,"ArrayIndex","value")
```

### db#user#add

```
db.user.add(discordUser,"NumberIndex","value")
```

## db#member

### db#member#get

```
db.member.get(discordGuildMember,"index")
```

### db#member#set

```
db.member.set(discordGuildMember,"index","value")
```

### db#member#push

```
db.member.push(discordGuildMember,"ArrayIndex","value")
```

### db#member#add

```
db.member.add(discordGuildMember,"NumberIndex","value")
```

## db#guild

### db#guild#get

```
db.guild.get(discordGuild,"index")
```

### db#guild#set

```
db.guild.set(discordGuild,"index","value")
```

### db#guild#push

```
db.guild.push(discordGuild,"ArrayIndex","value")
```

### db#guild#add

```
db.guild.add(discordGuild,"NumberIndex","value")
```

## db#global

### db#global#get

```
db.global.get("index")
```

### db#global#set

```
db.global.set("index","value")
```

### db#global#push

```
db.global.push("ArrayIndex","value")
```

### db#global#add

```
db.global.add("NumberIndex","value")
```