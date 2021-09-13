# What is this?

<!-- Folder (and json) based database Discord compatible database. -->
KoiosDb is a folder/JSON-based database designed for Discord.js projects.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```js
let db = require("@erdemgoksel/koiosdb");

client.on("ready", async () => {
  client.guilds.cache.forEach((g) => {
    db.guild.guildCheck(g);
  });
});

async function setMoney(discordUser, newMoney) {
  await db.user.set(discordUser, "money", newmoney);
  let money = await db.user.set(discordUser, "money");
  console.log("money set to " + money + "!");
}
```

# Methods List

## db#user

### db#user#get

```js
db.user.get(discordUser, "index");
```

### db#user#set

```js
db.user.set(discordUser, "index", "value");
```

## db#member

### db#member#get

```js
db.member.get(discordGuildMember, "index");
```

### db#member#set

```js
db.member.set(discordGuildMember, "index", "value");
```

## db#guild

### db#guild#get

```js
db.guild.get(discordGuild, "index");
```

### db#guild#set

```js
db.guild.set(discordGuild, "index", "value");
```

## db#global

### db#global#get

```js
db.global.get("index");
```

### db#global#set

```js
db.global.set("index", "value");
```
