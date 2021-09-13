# What is this?

KoiosDb is a folder/JSON-based database designed for Discord.js projects.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```js
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

```js
db.user.get(discordUser,"index")
```

### db#user#set

```js
db.user.set(discordUser,"index","value")
```

### db#user#push

```js
db.user.push(discordUser,"ArrayIndex","value")
```

### db#user#add

```js
db.user.add(discordUser,"NumberIndex","value")
```

## db#member

### db#member#get

```js
db.member.get(discordGuildMember,"index")
```

### db#member#set

```js
db.member.set(discordGuildMember,"index","value")
```

### db#member#push

```js
db.member.push(discordGuildMember,"ArrayIndex","value")
```

### db#member#add

```js
db.member.add(discordGuildMember,"NumberIndex","value")
```

## db#guild

### db#guild#get

```js
db.guild.get(discordGuild,"index")
```

### db#guild#set

```js
db.guild.set(discordGuild,"index","value")
```

### db#guild#push

```js
db.guild.push(discordGuild,"ArrayIndex","value")
```

### db#guild#add

```js
db.guild.add(discordGuild,"NumberIndex","value")
```

## db#global

### db#global#get

```js
db.global.get("index")
```

### db#global#set

```js
db.global.set("index","value")
```

### db#global#push

```js
db.global.push("ArrayIndex","value")
```

### db#global#add

```js
db.global.add("NumberIndex","value")
```
