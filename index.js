//#region Setup Fonksiyonu ve İmport ve Tanımlama İşlemleri
const fs = require("fs");
var oku = (files) => JSON.parse(fs.readFileSync(files, "utf8"));
var yazdir = (files, data) =>
	fs.writeFileSync(files, JSON.stringify(data, null, 4));
const { User, Guild, GuildMember, Collection } = require("discord.js");
let dblist = new Collection();

//#endregion
//#region Guild ve Member Data Kaydetme
// member data okuma kaydetme fonksiyonları
class Database {
	/**
	 * @param {String} databaseName
	 */
	constructor(databaseName) {
		this.db_name = databaseName && databaseName != "" ? databaseName : "db";
		let olddb = dblist.get(this.db_name);
		if (olddb) {
			return olddb;
		}
		this.checkedGuilds = [];
		this.notReady = true;
		dblist.set(this.db_name, this);
	}
	#setup() {
		return new Promise(async (resolve, reject) => {
			let pathlist = [
				"./" + this.db_name + "",
				"./" + this.db_name + "/guilds",
				"./" + this.db_name + "/users"
			];
			pathlist.forEach((x) => {
				if (!fs.existsSync(x)) {
					fs.mkdirSync(x, {
						recursive: true
					});
				}
			});
			let filelist = ["./" + this.db_name + "/general.json"];
			filelist.forEach((x) => {
				if (!fs.existsSync(x)) {
					yazdir(x, {});
				}
			});
			resolve(true);
		});
	}
	// member = {
	/**
	 * @param {GuildMember} member
	 * @param {String} index
	 * @returns
	 */
	async memberGet(member, index) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(member.guild.id)) {
				await this.#guildCheck(member.guild);
				this.checkedGuilds.push(member.guild.id);
			}
			let value = null;
			try {
				let gdata = await oku(
					`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`
				);
				value = gdata[index];
			} catch {
				await yazdir(
					`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`,
					{}
				);
			}
			resolve(value);
		});
	}
	/**
	 * @param {GuildMember} member
	 * @param {String} index
	 * @returns
	 */
	async memberSet(member, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(member.guild.id)) {
				await this.#guildCheck(member.guild);
				this.checkedGuilds.push(member.guild.id);
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(
				`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`,
				gdata
			);
			resolve(booo);
		});
	}
	/**
	 * @param {GuildMember} member
	 * @param {String} index
	 * @param {Number} value
	 * @returns
	 */
	async memberAdd(member, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(member.guild.id)) {
				await this.#guildCheck(member.guild);
				this.checkedGuilds.push(member.guild.id);
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!gdata[index]) gdata[index] = 0;
			if (typeof gdata[index] !== "number")
				throw new Error("The Indexed Data is not a number!");
			if (typeof value !== "number")
				throw new Error("The Value is not a number!");
			gdata[index] += value;
			await yazdir(
				`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`,
				gdata
			);
			resolve(booo);
		});
	}
	/**
	 * @param {GuildMember} member
	 * @param {String} index
	 * @returns
	 */
	async memberPush(member, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(member.guild.id)) {
				await this.#guildCheck(member.guild);
				this.checkedGuilds.push(member.guild.id);
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}

			if (!Array.isArray(gdata[index])) gdata[index] = [];
			arr = gdata[index];
			arr.push(value);
			await yazdir(
				`./${this.db_name}/guilds/${member.guild.id}/members/${member.user.id}.json`,
				gdata
			);
			resolve(booo);
		});
	}
	// };

	// guild = {
	/**
	 * @param {Guild} guild
	 * @param {String} index
	 * @returns
	 */
	async guildGet(guild, index) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(guild.id)) {
				await this.#guildCheck(guild);
				this.checkedGuilds.push(guild.id);
			}
			let value = null;
			try {
				let gdata = await oku(
					`./${this.db_name}/guilds/${guild.id}/main.json`
				);
				value = gdata[index];
			} catch {
				await yazdir(
					`./${this.db_name}/guilds/${guild.id}/main.json`,
					{}
				);
			}
			resolve(value);
		});
	}
	/**
	 * @param {Guild} guild
	 * @param {String} index
	 * @returns
	 */
	async guildSet(guild, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(guild.id)) {
				await this.#guildCheck(guild);
				this.checkedGuilds.push(guild.id);
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./${this.db_name}/guilds/${guild.id}/main.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(
				`./${this.db_name}/guilds/${guild.id}/main.json`,
				gdata
			);
			resolve(booo);
		});
	}
	/**
	 * @param {Guild} guild
	 * @param {String} index
	 * @param {Number} value
	 * @returns
	 */
	async guildAdd(guild, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(guild.id)) {
				await this.#guildCheck(guild);
				this.checkedGuilds.push(guild.id);
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./${this.db_name}/guilds/${guild.id}/main.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!gdata[index]) gdata[index] = 0;
			if (typeof gdata[index] !== "number")
				throw new Error("The Indexed Data is not a number!");
			if (typeof value !== "number")
				throw new Error("The Value is not a number!");
			gdata[index] += value;
			await yazdir(
				`./${this.db_name}/guilds/${guild.id}/main.json`,
				gdata
			);
			resolve(booo);
		});
	}
	/**
	 * @param {Guild} guild
	 * @param {String} index
	 * @returns
	 */
	async guildPush(guild, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			if (!this.checkedGuilds.includes(guild.id)) {
				await this.#guildCheck(guild);
				this.checkedGuilds.push(guild.id);
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./${this.db_name}/guilds/${guild.id}/main.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!Array.isArray(gdata[index])) gdata[index] = [];
			arr = gdata[index];
			arr.push(value);
			await yazdir(
				`./${this.db_name}/guilds/${guild.id}/main.json`,
				gdata
			);
			resolve(booo);
		});
	}
	// };
	//#endregion
	// user = {
	/**
	 * @param {User} user
	 * @param {String} index
	 * @returns {*} Value
	 */
	async userGet(user, index) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let value = null;
			try {
				let gdata = await oku(
					`./${this.db_name}/users/${user.id}.json`
				);
				value = gdata[index];
			} catch {
				await yazdir(`./${this.db_name}/users/${user.id}.json`, {});
			}
			resolve(value);
		});
	}
	/**
	 * @param {User} user
	 * @param {String} index
	 * @param {*} value
	 * @returns {Boolean} Success
	 */
	async userSet(user, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./${this.db_name}/users/${user.id}.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(`./${this.db_name}/users/${user.id}.json`, gdata);
			resolve(booo);
		});
	}
	/**
	 * @param {User} user
	 * @param {String} index
	 * @param {Number} value
	 * @returns {Boolean} Success
	 */
	async userAdd(user, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./${this.db_name}/users/${user.id}.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!gdata[index]) gdata[index] = 0;
			if (typeof gdata[index] !== "number")
				throw new Error("The Indexed Data is not a number!");
			if (typeof value !== "number")
				throw new Error("The Value is not a number!");
			gdata[index] += value;
			await yazdir(`./${this.db_name}/users/${user.id}.json`, gdata);
			resolve(booo);
		});
	}
	/**
	 * @param {User} user
	 * @param {String} index
	 * @param {*} value
	 * @returns {Boolean} Success
	 */
	async userPush(user, index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./${this.db_name}/users/${user.id}.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!Array.isArray(gdata[index])) gdata[index] = [];
			arr = gdata[index];
			arr.push(value);
			await yazdir(`./${this.db_name}/users/${user.id}.json`, gdata);
			resolve(booo);
		});
	}
	// };

	// global = {
	/**
	 * @param {String} index
	 * @returns {*} Value
	 */
	async get(index) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let value = null;
			try {
				let gdata = await oku(`./${this.db_name}/general.json`);
				value = gdata[index];
			} catch {
				await yazdir(`./${this.db_name}/general.json`, {});
			}
			resolve(value);
		});
	}
	/**
	 * @param {String} index
	 * @param {*} value
	 * @returns {Boolean} Success
	 */
	async set(index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./${this.db_name}/general.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(`./${this.db_name}/general.json`, gdata);
			resolve(booo);
		});
	}
	/**
	 * @param {String} index
	 * @param {Number} value
	 * @returns {Boolean} Success
	 */
	async add(index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./${this.db_name}/general.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!gdata[index]) gdata[index] = 0;
			if (typeof gdata[index] !== "number")
				throw new Error("The Indexed Data is not a number!");
			if (typeof value !== "number")
				throw new Error("The Value is not a number!");
			gdata[index] += value;
			await yazdir(`./${this.db_name}/general.json`, gdata);
			resolve(booo);
		});
	}
	/**
	 * @param {String} index
	 * @param {*} value
	 * @returns {Boolean} Success
	 */
	async push(index, value) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./${this.db_name}/general.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			if (!Array.isArray(gdata[index])) gdata[index] = [];
			arr = gdata[index];
			arr.push(value);
			await yazdir(`./${this.db_name}/general.json`, gdata);
			resolve(booo);
		});
	}
	// };

	/**
	 *
	 * @param {Guild} guild
	 * @returns
	 */
	async #guildCheck(guild) {
		return new Promise(async (resolve, reject) => {
			if (this.notReady) {
				await this.#setup();
				this.notReady = false;
			}
			let id = guild.id;
			let guildpathlist = [
				"./" + this.db_name + "/guilds/{0}",
				"./" + this.db_name + "/guilds/{0}/members"
			];
			guildpathlist.forEach((x) => {
				let path = x.replace("{0}", id);
				if (!fs.existsSync(path)) {
					fs.mkdirSync(path, {
						recursive: true
					});
				}
			});
			let guildfilelist = [
				{
					path: "./" + this.db_name + "/guilds/{0}/main.json",
					default: {}
				}
			];
			guildfilelist.forEach((x) => {
				let path = x.path.replace("{0}", id);
				if (!fs.existsSync(path)) {
					yazdir(path, x.default);
				}
			});
			resolve(true);
		});
	}
}

module.exports = Database;
