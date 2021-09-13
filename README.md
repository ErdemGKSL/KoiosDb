# What is this?

Folder (and json) based database Discord compatible database.

# Installation

`npm i @erdemgoksel/koiosdb`

## Example

```
let db = require('@erdemgoksel/koiosdb')


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

### db#user#push

```
db.user.push(discordUser,"index","value")
```

### db#user#add

```
db.user.add(discordUser,"index","value")
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
db.member.push(discordGuildMember,"index","value")
```

### db#member#add

```
db.member.add(discordGuildMember,"index","value")
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
db.guild.push(discordGuild,"index","value")
```

### db#guild#add

```
db.guild.add(discordGuild,"index","value")
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
db.global.push("index","value")
```

### db#global#add

```
db.global.add("index","value")
```