//#region Setup Fonksiyonu ve İmport ve Tanımlama İşlemleri
const fs = require("fs");
var oku = (files) => JSON.parse(fs.readFileSync(files, "utf8"));
var yazdir = (files, data) =>
	fs.writeFileSync(files, JSON.stringify(data, null, 4));
const { User, Guild, GuildMember } = require("discord.js");
let pathlist = ["./db", "./db/guilds", "./db/users"];
let filelist = ["./db/general.json"];
let guildpathlist = ["./db/guilds/{0}", "./db/guilds/{0}/members"];
const guildfilelist = [{ path: "./db/guilds/{0}/main.json", default: {} }];
let notReady = true;
function setup() {
	return new Promise(async (resolve, reject) => {
		pathlist.forEach((x) => {
			if (!fs.existsSync(x)) {
				fs.mkdirSync(x, {
					recursive: true
				});
			}
		});
		filelist.forEach((x) => {
			if (!fs.existsSync(x)) {
				yazdir(x, {});
			}
		});
		resolve(true);
	});
}
//#endregion
//#region Guild ve Member Data Kaydetme
// member data okuma kaydetme fonksiyonları
module.exports.member = {
	/**
	 * @param {GuildMember} member
	 * @param {String} index
	 * @returns
	 */
	async get(member, index) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let value = null;
			try {
				let gdata = await oku(
					`./db/guilds/${member.guild.id}/members/${member.user.id}.json`
				);
				value = gdata[index];
			} catch {
				await yazdir(
					`./db/guilds/${member.guild.id}/members/${member.user.id}.json`,
					{}
				);
			}
			resolve(value);
		});
	},
	/**
	 * @param {GuildMember} member
	 * @param {String} index
	 * @returns
	 */
	async set(member, index, value) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(
					`./db/guilds/${member.guild.id}/members/${member.user.id}.json`
				);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(
				`./db/guilds/${member.guild.id}/members/${member.user.id}.json`,
				gdata
			);
			resolve(booo);
		});
	}
};
module.exports.guild = {
	/**
	 *
	 * @param {Guild} guild
	 * @returns
	 */
	async guildCheck(guild) {
		return new Promise((resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let id = guild.id;
			guildpathlist.forEach((x) => {
				let path = x.replace("{0}", id);
				if (!fs.existsSync(path)) {
					fs.mkdirSync(path, {
						recursive: true
					});
				}
			});
			guildfilelist.forEach((x) => {
				let path = x.path.replace("{0}", id);
				if (!fs.existsSync(path)) {
					yazdir(path, x.default);
				}
			});
			resolve(true);
		});
	},
	/**
	 * @param {Guild} guild
	 * @param {String} index
	 * @returns
	 */
	async get(guild, index) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let value = null;
			try {
				let gdata = await oku(`./db/guilds/${guild.id}/main.json`);
				value = gdata[index];
			} catch {
				await yazdir(`./db/guilds/${guild.id}/main.json`, {});
			}
			resolve(value);
		});
	},
	/**
	 * @param {Guild} guild
	 * @param {String} index
	 * @returns
	 */
	async set(guild, index, value) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./db/guilds/${guild.id}/main.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(`./db/guilds/${guild.id}/main.json`, gdata);
			resolve(booo);
		});
	}
};
//#endregion
module.exports.user = {
	/**
	 * @param {User} user
	 * @param {String} index
	 * @returns {*} Value
	 */
	async get(user, index) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let value = null;
			try {
				let gdata = await oku(`./db/users/${user.id}.json`);
				value = gdata[index];
			} catch {
				await yazdir(`./db/users/${user.id}.json`, {});
			}
			resolve(value);
		});
	},
	/**
	 * @param {User} user
	 * @param {String} index
	 * @param {*} value
	 * @returns {Boolean} Success
	 */
	async set(user, index, value) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./db/users/${user.id}.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(`./db/users/${user.id}.json`, gdata);
			resolve(booo);
		});
	}
};

module.exports.global = {
	/**
	 * @param {String} index
	 * @returns {*} Value
	 */
	async get(index) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let value = null;
			try {
				let gdata = await oku(`./db/general.json`);
				value = gdata[index];
			} catch {
				await yazdir(`./db/general.json`, {});
			}
			resolve(value);
		});
	},
	/**
	 * @param {String} index
	 * @param {*} value
	 * @returns {Boolean} Success
	 */
	async set(index, value) {
		return new Promise(async (resolve, reject) => {
			if (notReady) {
				await setup();
				notReady = false;
			}
			let gdata = {};
			let booo = false;
			try {
				gdata = await oku(`./db/general.json`);
				booo = true;
			} catch {
				gdata = {};
			}
			gdata[index] = value;
			await yazdir(`./db/general.json`, gdata);
			resolve(booo);
		});
	}
};
