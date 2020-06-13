const Discord = require('discord.js')

module.exports = {
    messageEditEvent: function(oldMessage, newMessage) {
        const guild = oldMessage.member.guild;
        const logChannel = guild.channels.cache.find(channel => channel.topic === '빠귀로그')

        const editEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('BBAGUI LOGGER')
        .setDescription('MESSAGE EDIT')
        .addFields(
            { name: '작성자', value: `${oldMessage.author.username}#${oldMessage.author.discriminator}`},
            { name: '변경 전 메세지', value: oldMessage, inline: true},
            { name: '변경 후 메세지', value: newMessage, inline: true}
        )
        .setTimestamp()
        .setFooter('by 라라라#6343')

        logChannel.send(editEmbed)
    },

    messageDeleteEvent: function(deletedMessage) {
        const guild = deletedMessage.member.guild;
        const logChannel = guild.channels.cache.find(channel => channel.topic === '빠귀로그')

        const deleteEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('BBAGUI LOGGER')
        .setDescription('MESSAGE DELETE')
        .addFields(
            { name: '작성자', value: `${deletedMessage.author.username}#${deletedMessage.author.discriminator}`},
            { name: '삭제된 메세지', value: deletedMessage, inline: true}
        )
        .setTimestamp()
        .setFooter('by 라라라#6343');

        logChannel.send(deleteEmbed);
    }
}