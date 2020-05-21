const { Client, MessageEmbed} = require('discord.js');
const client = new Client();
const fs = require('fs');

client.on('ready',()=>{
    console.log('BBAGUI IS READY!');
});

client.on('message',(msg) => {
    if (!msg.content.startsWith('빠귀야 ')) return;
    const args = msg.content.slice('빠귀야 '.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const result = require(`./msg/${command}.json`);
    
    if (result) {
        return msg.channel.send(result.args);
    } else {
        msg.channel.send(':(');
    }
})

client.on('message', (msg) => {
    if (!msg.content.startsWith('ㅃ!')) return;
    const args = msg.content.slice('ㅃ!'.length).trim().split(/ +/g);
    const msgauthor = msg.author.toString()
    const slicedauthor = msgauthor.substring(2, msgauthor.length -1)
    let usercoin = require(`./user/${slicedauthor}.json`)
    let coinnow = usercoin.coin
    let coins = coinnow + parseInt(args[1]);
    
    if (args[0] === '쓰기') {
        fs.writeFileSync(`./msg/${args[1]}.json`,`{"args":"${args[2]}"}`)
    } else if (args[0] === '등록') {
        fs.writeFileSync(`./user/${slicedauthor}.json`, '{"coin":1000}')
    } else if (args[0] === '대출') {
        if (args[1] === undefined) return;
            fs.writeFileSync(`./user/${slicedauthor}.json`, `{"coin":${coins},"borrow":${parseInt(args[1])}}`)
            msg.channel.send('빌린 금액:' + parseInt(args[1]) + ", 잔고:" + coins)
            return;
    }
})

client.login('NjU1MDIyNTAyMjE2NzI4NTc2.Xqzw2w.IQCkycqa-Xl5HBUeDe8uYjOQck8');