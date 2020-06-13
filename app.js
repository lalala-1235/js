const Discord = require('discord.js');
const client = new Discord.Client();

const logger = require('./res/logger');

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

try {
    client.on('message', message => {
        if(!message.content.startsWith('빠귀야')) return;
        let args = message.content.split(' ').splice(1);
        let command = args.shift();
        async function init() {
            const sheet = require('./res/getSheet');
            let result = await sheet('1LYyhpqHlc8IUNEgCxnjBmJEWfJIG3qzn-QAKry8FYJE', null);
            result = result["table"].rows.slice(1)
            var DB = {};
            for (let i=0;i<result.length;i++) {
                    let Q = result[i]["c"][0]["v"];
                    let A = result[i]["c"][1]["v"]
                    DB[Q] = A;
                }
                DB = JSON.stringify(DB)
                DB = JSON.parse(DB);
                if (DB[command]) {
                    message.channel.send(DB[command])
                } else {
                    message.channel.send('그런 말은 몰라요!')
                }
            }
            
            init()
        
    });
} catch(err) {
    throw err;
}



client.login('NjU1MDIyNTAyMjE2NzI4NTc2.Xqzw2w.IQCkycqa-Xl5HBUeDe8uYjOQck8');