# What is this?

Folder (and json) based database Discord compatible database.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```
let db = require('@erdemgoksel/koiosdb')

db.setup();

client.on("ready",async () => {
	client.guilds.cache.forEach((g) => {
		db.guild.guildCheck(g);
	});
});

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

## db#member

### db#member#get

```
db.member.get(discordGuildMember,"index")
```

### db#member#set

```
db.member.set(discordGuildMember,"index","value")
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
## db#global

### db#global#get

```
db.global.get("index")
```

### db#global#set

```
db.global.set("index","value")
```