const Discord = require('discord.js');
const client = new Discord.Client();

const logger = require('./res/logger');
const getQna = require('./res/getQna')

client.on('ready',() => {
    console.log('BBAGUI IS READY!');
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot || newMessage.author.bot) return;
    logger.messageEditEvent(oldMessage, newMessage);
})

client.on('messageDelete', (deletedMessage) => {
    if (deletedMessage.author.bot) return;
    logger.messageDeleteEvent(deletedMessage);
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
        return logger.guildMemberNicknameUpdateEvent(oldMember, newMember);
    }
})

client.on('guildMemberAdd', (member) => {
    return logger.guildMemberAdd(member);
})
client.on('message', message => {
    if(!message.content.startsWith('빠귀야')) return;
    let args = message.content.split(' ').splice(1);
    let command = args.shift();
    DB = getQna.run();
    DB = JSON.stringify(DB)
    DB = JSON.parse(DB);
    if (DB[command]) {
        message.channel.send(DB[command])
    } else {
        message.channel.send('그런 말은 몰라요!')
    }
});



client.login('NjU1MDIyNTAyMjE2NzI4NTc2.Xqzw2w.IQCkycqa-Xl5HBUeDe8uYjOQck8');