module.exports = {
    logStarted(){
        console.log('Bot has been started ...')
    },
    getChatId(msg){
        return msg.chat.id
    },
    getChatText(msg){
        return msg.text
    }
}