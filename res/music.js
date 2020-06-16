const Discord = require('discord');
const ytdl = require('ytdl-core');
const ytsearch = require('yt-search')
const queue = new Map();
const setting = new Map();

module.exports = {
    commands: ["재생", "스킵", "정지", "검색", "목록"],
    run: async function(command, args, message) {
        if(!setting.get(message.guild.id)) {
            const settingContruct = {
                autoPlay: false
            };
            settings.set(message.guild.id, settingContruct)
        }
        const serverQueue = queue.get(message.guild.id);
        const serverSetting = setting.get(message.guild.id);

        if(command === '재생') {
            if (args === undefined) return message.reply()
        }
    }
}