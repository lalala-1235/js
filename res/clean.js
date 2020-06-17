module.exports = {
    run: async (message, args) => {
        if(!args) return;
        if(isNaN(args)) return message.send('숫자를 입력해주세요!')
        if(args > 100) return message.send('100개 이상의 메세지는 삭제할 수 없어요!');
        if(args < 1) return message.send('1개 이하의 메세지는 삭제할 수 없어요!')
        message.bunkDelete(5).then(messages => console.log('messages deleted')).catch(console.error())
    }
}