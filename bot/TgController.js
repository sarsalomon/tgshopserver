// const Member  = require("../model/model");
// const TelegramBot = require('node-telegram-bot-api');
// require('dotenv').config()
// const TOKEN = process.env.BOT_TOKEN
// // создаем бота
// const bot = new TelegramBot(TOKEN, {
//     polling: {
//         interval: 300,
//         autoStart: true,
//         params: {
//             timeout: 10
//         },
//     }
// });


// class TgController {
//     async registrationser(chatId){
//         // const condidate = await Member.member.findOne({chatId: chatId})
//         // if(condidate){
//         //   bot.sendMessage(chatId, 'Find user of email');
//         // }
//         // const user = await User.Member.create({})
//         bot.sendMessage(chatId, `Test`);
//     }
// }

// module.exports = new TgController()