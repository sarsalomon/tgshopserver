require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const helper      = require('./helper')
const Member      = require("../model/model");
const Product     = require("../model/model");
const Order       = require("../model/model");
const User        = require("../model/model");
const Category    = require("../model/model");
const History     = require("../model/model");
const Appsetting  = require("../model/model")
const { resolve } = require('path/posix');

let selectcategorybool = false
let selectcategoryid = ''
let userlang = ''
let currentLang

async function getmemberlang(chatId,msg) {
    let langs
    languages = await Member.member.findOne({chatId: chatId})
    if(languages){

    if(languages == null){
        langs = 'uz'
        userlang = langs
    }else{
        langs = languages.lang
        userlang = langs
    }
    msgworking(chatId,msg)
    if(langs == 'uz'){
        currentLang = {
            "helloagain": 'Hush kelibsiz, sizni ko`rishimdan yana xursandman',
            "emptysector": 'Bu bo`limda hali hech narsa yo`q',
            "setting" : 'Sozlamalar',
            "addphone":'Raqam kiritin',
            "sendphone": 'Raqam yuborish 📲',
            "sendlocation": 'Manzilni yuborish 📍',
            "ball" : 'ga baholandi',
            "service" : 'Hizmatlar',
            "delivery" : 'Yetkazib berish',
            "phoneupdate" : 'Raqamni yangilash',
            "updatelocation" : 'Manzilni yangilash',
            "updateaddress" : 'Manzil yangilandi',
            "thanks" : 'Fikr-mulohazangiz uchun rahmat',
            "back" :'Orqaga',
            "setLang" : 'Tilni tanlang',
            "updatePhone" : 'Telefon raqam yangilandi',
            "add" : 'Qo`shish',
            "added" : 'Qo`shildi',
            "successreg":'Rahmat ro`yxatdan o`tish tugadi',
            "delete" : 'O`chirish',
            "deleted" : 'O`chirildi',
            "soon" : 'Tez orada',
            "supportPhone" : "Issiq liniya",
            "supportText" : "Qo`llab quvvatlash markazini raqami 📱",
            "setCategory" : "Toifani tanglang",
            "ordersuccess" : "Sizni buyurtmangiz bajarildi😊. Iltimos qilingan ishni bahalob bering⭐️"
        },
        kb = {
            lang:{
                uz: 'Uz 🇺🇿',
                ru: 'Ru 🇷🇺'
            },
            home:{
                services: `${currentLang.service} ⛏`,
                deliveries: `${currentLang.delivery} 🚚📦`,
                support: `${currentLang.supportPhone} ☎️`,
                setting: `${currentLang.setting} ⚙️`
            },
            phone:{
                phoneUpdate: `${currentLang.phoneupdate} 📱`
            },
            location:{
                locationUpdate: `${currentLang.updatelocation} 📍`
            },
            back:{
                backButton: `${currentLang.back} ⬅️`,
            }
        },
        keyboard = {  
            lang:[
                [kb.lang.uz],
                [kb.lang.ru]
            ],
            home:[
                [kb.home.services,kb.home.deliveries],
                [kb.home.setting,kb.home.support]
            ],
            setting:[
                [{text: kb.phone.phoneUpdate, request_contact: true},{text: kb.location.locationUpdate, request_location: true}],
                [kb.lang.uz,kb.lang.ru],
                [kb.back.backButton]
            ],
            orderphonesuccess:[
                [{text: currentLang.sendphone, request_contact: true}]
            ],
            orderaddresssuccess:[
                [{text: currentLang.sendlocation, request_location: true}]
            ],
            simpleback:[
                [kb.back.backButton]
            ]
        }
    }else{
        currentLang = {
            "helloagain": 'Добро пожаловать я рада видеть тебя снова',
            "emptysector": 'В этом разделе еще ничего нет',
            "setting" : 'Настройки',
            "addphone": 'Введите номер',
            "sendphone": 'Отправить номер 📲',
            "sendlocation": 'Отправить локацию 📍',
            "ball" : 'Baholandi',
            "service" : 'Услуги',
            "delivery" : 'Доставка',
            "phoneupdate" : 'Изменить номер',
            "updatelocation" : 'Изменить локацию',
            "updateaddress" : 'Адрес обновлен',
            "thanks" : 'Спасибо за отзыв',
            "back" :'Назад',
            "setLang" : 'Выберите язык',
            "updatePhone" : 'Номер телефона обновлен',
            "add" : 'Добавлять',
            "added": 'Добавлен',
            "successreg":'Спасибо, регистрация окончена',
            "delete" : 'Удалить',
            "deleted" : 'Удаленный',
            "soon" : "Скоро",
            "supportPhone" : "Горячий номер",
            "supportText" : "Номер центра поддержки 📱",
            "setCategory" : "Выбрать категорию",
            "ordersuccess" : "Ваш заказ выполнен😊. Пожалуйста оцените сделанную работу⭐️"
        },
        kb = {
            lang:{
                uz: 'Uz 🇺🇿',
                ru: 'Ru 🇷🇺'
            },
            home:{
                services: `${currentLang.service} ⛏`,
                deliveries: `${currentLang.delivery} 🚚📦`,
                support: `${currentLang.supportPhone} ☎️`,
                setting: `${currentLang.setting} ⚙️`
            },
            phone:{
                phoneUpdate: `${currentLang.phoneupdate} 📱`
            },
            location:{
                locationUpdate: `${currentLang.updatelocation} 📍`
            },
            back:{
                backButton: `${currentLang.back} ⬅️`,
            }
        },
        keyboard = {  
            lang:[
                [kb.lang.uz],
                [kb.lang.ru]
            ],
            home:[
                [kb.home.services,kb.home.deliveries],
                [kb.home.setting,kb.home.support]
            ],
            setting:[
                [{text: kb.phone.phoneUpdate, request_contact: true},{text: kb.location.locationUpdate, request_location: true}],
                [kb.lang.uz,kb.lang.ru],
                [kb.back.backButton]
            ],
            orderphonesuccess:[
                [{text: currentLang.sendphone, request_contact: true}]
            ],
            orderaddresssuccess:[
                [{text: currentLang.sendlocation, request_location: true}]
            ],
            simpleback:[
                [kb.back.backButton]
            ]
        }
    } 

}
await Promise.resolve();
};
async function msgworking(chatId,msg) {
    if(currentLang == undefined){
        getmemberlang(chatId,msg)
    }else{
        console.log(msg.text)
        if (msg.text == '/start'){
            registrationuser(chatId,msg)
        }
        if(msg.text == 'Uz 🇺🇿'){
            updateInformation(chatId,'uz')
        }else if(msg.text == 'Ru 🇷🇺'){
            updateInformation(chatId,'ru')
        }else if(msg.text == `${currentLang.setting} ⚙️`){
            bot.sendMessage(chatId, `${currentLang.setting}`,{
                reply_markup: {
                    keyboard: keyboard.setting
                }
            });
        }else if(msg.text == `${currentLang.supportPhone} ☎️`){
            sendContact(chatId)
        }else if(msg.text == `${currentLang.service} ⛏`){
            selectCategory(chatId)
        }else if(msg.text == `${currentLang.delivery} 🚚📦`){
            selectCategories(chatId)
        }else if(msg.text == `${currentLang.back} ⬅️`){
            selectcategorybool=false
            bot.sendMessage(chatId, currentLang.back,{
                reply_markup:{
                    keyboard: keyboard.home
                }
            })
        }else if(msg.contact){
            updateInformation(chatId,'updatephone',msg) 
        }else if(msg.location){
            updateInformation(chatId,'updatelocation',msg) 
        }
        if(selectcategorybool){
            getidc(chatId,msg.text,msg)
        }
    }
}
const TOKEN = process.env.BOT_TOKEN
const BASEURL = process.env.TELEGRAM_APP_API_URL
const APPID = process.env.SETTING_ID

const ACTION_TYPE = {
    ADD_CART: 'ad',
    DELETE_ITEM: 'di',
    SUCCESS_ORDER: 'so',
    RATING_ONE: 'ron',
    RATING_TWO: 'rtw',
    RATING_THREE: 'rtj',
    RATING_FOUR: 'rf',
    RATING_FIVE: 'rfi'
}

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        },
    }
});

helper.logStarted()

bot.onText(/workingbotnow/, (msg) => {
    bot.sendMessage(helper.getChatId(msg), 'of cource');
});
// bot.on("polling_error", (err) => console.log(err));
bot.on('message', msg=>{
        const text = msg;
        const chatId = msg.chat.id
        getmemberlang(chatId,msg)
})

bot.on('callback_query', query => {
    const userId = query.from.id
    let data
    try {
        data = JSON.parse(query.data)
    } catch(e){
        throw new Error('Data is not an object')
    } 

    const { type } = data
    const productId  = data.productId

    const messageId  = query.message.message_id
    const chatId = query.message.chat.id
    if (type === ACTION_TYPE.ADD_CART) {
        addOrder(userId, query.id, productId, messageId,chatId, data)
    }
    if (type === ACTION_TYPE.DELETE_ITEM) {
        deleteOrder(userId, query.id, productId, messageId,chatId, data)
    }
    if (type === ACTION_TYPE.SUCCESS_ORDER) {
        successOrder(userId, query.id, productId, messageId,chatId, data)
    }
    if (type === ACTION_TYPE.RATING_ONE || type === ACTION_TYPE.RATING_TWO || type === ACTION_TYPE.RATING_THREE || type === ACTION_TYPE.RATING_FOUR || type === ACTION_TYPE.RATING_FIVE) {
        ratingServiceAdd(userId, query.id, productId, messageId, chatId, data)
    }

})

async function sendContact(chatId){
    bot.sendMessage(chatId, currentLang.supportText);
    const getsetting = await Appsetting.appsetting.findById(APPID)
    if(getsetting){
        bot.sendContact(chatId, getsetting.phone, 'Imperia Service');
    }
}

async function registrationuser(chatId,msg){
    const id = chatId
    const condidate = await Member.member.findOne({chatId: id})
    if(condidate){
        console.log(condidate.lang)
        console.log(userlang)
        if(condidate.phone !== ''){
            bot.sendMessage(chatId, `${currentLang.helloagain} ${msg.from.first_name + ' ' + msg.from.last_name}`,{
                reply_markup: {
                    keyboard: keyboard.home
                }
            });
        }
        return false
    }else{
        if(msg.from.last_name == undefined){
            lastName = ''
        }else{
            lastName = msg.from.last_name
        }
        const user = await Member.member.create({chatId, name: msg.from.first_name + ' ' + lastName, phone:'', username:msg.from.username, location_latitude:'', location_longitude:'', lang:''})
        bot.sendMessage(chatId, `${currentLang.setLang}`,{
            reply_markup: {
                keyboard: keyboard.lang
            }
        });
        return true
    }
}

async function updateInformation(chatId,val,msg){
    const condidate = await Member.member.findOne({chatId: chatId})
    if(condidate){
        if(val == 'uz'){
            if(condidate.lang === ''){
                const user = await Member.member.findOneAndUpdate({chatId: chatId}, {lang: "uz"})
                bot.sendMessage(chatId, `O'zbek tili tanlandi`);
                bot.sendMessage(chatId, `Raqam kiritin`,{
                    reply_markup: {
                        keyboard: keyboard.orderphonesuccess
                    }
                });
            }else if(condidate.lang !== ''){
                const user = await Member.member.findOneAndUpdate({chatId: chatId}, {lang: "uz"})
                bot.sendMessage(chatId, `Обновился на Узбекский язык, нажмите еще раз /start, чтобы изменения вступили в силу`,{
                    reply_markup: {
                        keyboard: keyboard.setting
                    }
                });
            }
        }else if(val == 'ru'){
            if(condidate.lang === ''){
                const user = await Member.member.findOneAndUpdate({chatId: chatId}, {lang: "ru"})
                bot.sendMessage(chatId, `Был выбран русский язык`);
                bot.sendMessage(chatId, `Введите номер`,{
                    reply_markup: {
                        keyboard: keyboard.orderphonesuccess
                    }
                });
            }else if(condidate.lang !== ''){
                const user = await Member.member.findOneAndUpdate({chatId: chatId}, {lang: "ru"})
                bot.sendMessage(chatId, `Rus tiliga yangilandi, o'zgarish kuchiga kirish uchun qaytadan /start bosin`,{
                    reply_markup: {
                        keyboard: keyboard.setting
                    }
                });
            }
        }else if(val == 'updatephone'){
            if(condidate.phone === ''){
                const user = await Member.member.findOneAndUpdate({chatId: msg.contact.user_id}, {phone: msg.contact.phone_number})
                bot.sendMessage(chatId, `${msg.contact.phone_number} ${currentLang.added}`);
                bot.sendMessage(chatId, currentLang.successreg,{
                    reply_markup: {
                        keyboard: keyboard.home
                    }
                });
            }else if(condidate.phone !== '') {
                const user = await Member.member.findOneAndUpdate({chatId: msg.contact.user_id}, {phone: msg.contact.phone_number})
                bot.sendMessage(chatId, currentLang.updatePhone,{
                    reply_markup: {
                        keyboard: keyboard.setting
                    }
                });
            }
        }else if(val == 'updatelocation'){
            if(condidate.location_latitude === '' || condidate.location_longitude === ''){
                const user = await Member.member.findOneAndUpdate({chatId: msg.chat.id}, {location_latitude: msg.location.latitude,location_longitude: msg.location.longitude})
                bot.sendMessage(msg.chat.id, currentLang.updateaddress,{
                    reply_markup: {
                        keyboard: keyboard.home
                    }
                });
            }else if(condidate.location_latitude !== '' && condidate.location_longitude === '' || condidate.location_latitude === '' || condidate.location_longitude !== ''){
                const user = await Member.member.findOneAndUpdate({chatId: msg.chat.id}, {location_latitude: msg.location.latitude,location_longitude: msg.location.longitude})
                bot.sendMessage(msg.chat.id, currentLang.updateaddress,{
                    reply_markup: {
                        keyboard: keyboard.setting
                    }
                });
            }
        }
    }
}

async function addOrder(userId, queryId, productId, messageId, chatId){
    const findorder = await Order.order.findOne({memberId:userId, productId:productId})
    if(findorder){
        const orderdelete = await Order.order.deleteOne({memberId:userId, productId:productId})
        if(orderdelete){
            bot.editMessageReplyMarkup({
                inline_keyboard: [
                    [
                        {
                            text: currentLang.add,
                            callback_data: JSON.stringify({
                                type: ACTION_TYPE.ADD_CART,
                                productId: productId
                            })
                        }
                    ]
                ]
                }, {
                    chat_id: chatId, 
                    message_id: messageId
                });
            bot.answerCallbackQuery({callback_query_id: queryId, text: `${currentLang.deleted} ${productId}`});
        }
    }else{
        const findproduct = await Product.product.findById(productId)
        const findcategory = await Category.category.findById(findproduct.categoryId)
        const finduser = await User.user.findById(findproduct.userId)
        const order = await Order.order.create({
            userId: findproduct.userId,
            memberId: userId,
            categoryId: findproduct.categoryId,
            productId: productId,
            qty: '1',
            price: findproduct.price,
            newprice: findproduct.newprice,
            messageId: messageId,
            status: '1',
            ratingstatus: '0',
            userName: finduser.fish,
            categoryName: findcategory.titleUz + '-' + findcategory.titleRu,
            productName: findproduct.titleUz + '-' + findproduct.titleRu
        })
        if(order){
            bot.editMessageReplyMarkup({
                inline_keyboard: [
                    [
                        {
                            text: currentLang.delete,
                            callback_data: JSON.stringify({
                                type: ACTION_TYPE.DELETE_ITEM,
                                productId: productId
                            })
                        }
                    ]
                ]
                }, {
                    chat_id: chatId, 
                    message_id: messageId
                });
            bot.answerCallbackQuery({callback_query_id: queryId, text: `${currentLang.added} ${productId}`});
        }
    }
}

async function deleteOrder(queryId, productId, messageId, chatId){
    bot.editMessageReplyMarkup({
        inline_keyboard: [
            [
                {
                    text: currentLang.add,
                    callback_data: JSON.stringify({
                    })
                }
            ]
        ]
        }, {
            chat_id: chatId, 
            message_id: messageId
        });
    bot.answerCallbackQuery({callback_query_id: queryId, text: `${currentLang.delete} ${productId}`});
}

async  function ratingServiceSendMessage(productId, chatId, orderId, lang){
    selectcategorybool=true
    const getorder = await Order.order.findById(orderId)
    if(getorder){
        const getmember = await Member.member.findOne({chatId:getorder.memberId})
        if(getmember){
            const addhistory = await History.history.create({orderId:orderId,userId:getorder.userId,memberId:getorder.memberId,categoryId:getorder.categoryId,productId:getorder.productId,qty:getorder.qty,price:getorder.price,newprice:getorder.newprice,status:getorder.status,userName:getorder.userName,categoryName:getorder.categoryName,productName:getorder.productName,userPhone:getmember.phone})
            if(addhistory){
                const deleteorder = await Order.order.findByIdAndDelete(orderId)
            }
        }
    }
    const product = await Product.product.findById(productId)
    let text
    if(lang == 'uz'){
        text = `${currentLang.ordersuccess}\nNomi: ${product.titleUz}\nMa'lumot: ${product.descriptionUz}`
    }else if(lang == 'ru'){
        text = `${currentLang.ordersuccess}\nИмя: ${product.titleRu}\nОписание: ${product.descriptionRu}`
    }
    // img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png'
    img = BASEURL + 'api/' + product.img
    bot.sendPhoto(chatId, img, {
        caption: text,
        reply_markup:{
            inline_keyboard:[[
                {
                    text: "⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_ONE,
                        orderId: orderId,
                        rating: 1
                    })
                },
                {
                    text: "⭐️⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_TWO,
                        orderId: orderId,
                        rating: 2
                    })
                }
            ],
            [
                {
                    text: "⭐️⭐️⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_THREE,
                        orderId: orderId,
                        rating: 3
                    })
                }
                ,
                {
                    text: "⭐️⭐️⭐️⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_FOUR,
                        orderId: orderId,
                        rating: 4
                    })
                }
            ],
            [
                {
                    text: "⭐️⭐️⭐️⭐️⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_FIVE,
                        orderId: orderId,
                        rating: 5
                    })
                }
            ]
        ]
        }
    })
}

module.exports.ratingServiceSendMessage = ratingServiceSendMessage;

async function ratingServiceAdd(userId, queryId, productId, messageId, chatId, data){
    selectcategorybool=true
    let ratingtext
    if(data.rating == 1){
        ratingtext = '😓'
    }else if(data.rating == 2){
        ratingtext = '👎🏻'
    }else if(data.rating == 3){
        ratingtext = '👍🏻'
    }else if(data.rating == 4){
        ratingtext = '🔥'
    }else if(data.rating == 5){
        ratingtext = '💥'
    }
    let succesrating = bot.answerCallbackQuery({callback_query_id: queryId, text: `${currentLang.thanks}`});
    if(succesrating){
        const getorder = await History.history.findOne({orderId:data.orderId})
        if(getorder){
            let updateproduct
            if(data.rating == 1){
                getproduct = await Product.product.findById(getorder.productId)
                let countr
                let currentr
                if(getproduct.ratingOne == ''){
                    currentr = 0
                }else if(getproduct.ratingOne != ''){
                    currentr = getproduct.ratingOne
                }
                countr = Number(currentr) + Number(1)
                if(getproduct){
                    updateproduct = await Product.product.findByIdAndUpdate(getorder.productId, {ratingOne: countr},{new:true})
                }
            }else if(data.rating == 2){
                getproduct = await Product.product.findById(getorder.productId)
                let countr
                let currentr
                if(getproduct.ratingTwo == ''){
                    currentr = 0
                }else if(getproduct.ratingTwo != ''){
                    currentr = getproduct.ratingTwo
                }
                countr = Number(currentr) + Number(2)
                if(getproduct){
                    updateproduct = await Product.product.findByIdAndUpdate(getorder.productId, {ratingTwo: countr},{new:true})
                }
            }else if(data.rating == 3){
                getproduct = await Product.product.findById(getorder.productId)
                let countr
                let currentr
                if(getproduct.ratingThree == ''){
                    currentr = 0
                }else if(getproduct.ratingThree != ''){
                    currentr = getproduct.ratingThree
                }
                countr = Number(currentr) + Number(3)
                if(getproduct){
                    updateproduct = await Product.product.findByIdAndUpdate(getorder.productId, {ratingThree: countr},{new:true})
                }
            }else if(data.rating == 4){
                getproduct = await Product.product.findById(getorder.productId)
                let countr
                let currentr
                if(getproduct.ratingFour == ''){
                    currentr = 0
                }else if(getproduct.ratingFour != ''){
                    currentr = getproduct.ratingFour
                }
                countr = Number(currentr) + Number(4)
                if(getproduct){
                    updateproduct = await Product.product.findByIdAndUpdate(getorder.productId, {ratingFour: countr},{new:true})
                }
            }else if(data.rating == 5){
                getproduct = await Product.product.findById(getorder.productId)
                let countr
                let currentr
                if(getproduct.ratingFive == ''){
                    currentr = 0
                }else if(getproduct.ratingFive != ''){
                    currentr = getproduct.ratingFive
                }
                countr = Number(currentr) + Number(5)
                if(getproduct){
                    updateproduct = await Product.product.findByIdAndUpdate(getorder.productId, {ratingFive: countr},{new:true})
                }
            }
            if(updateproduct){
                bot.deleteMessage(chatId, messageId)
            }
        }
    }else{

    }
}

async function sendProducts(chatId,selectcategoryid,message){
    const products = await Product.product.find({categoryId:selectcategoryid}).sort({ _id: -1 })
    async function getIdFromUser(product){
        const findorder = await Order.order.findOne({memberId:chatId,productId:product._id})
        isCart = false
        if(findorder){
            isCart = true
        }
        isCartTex = isCart ? currentLang.delete : currentLang.add
        let avgr = (Number(product.ratingOne) + Number(product.ratingTwo) + Number(product.ratingThree) + Number(product.ratingFour) + Number(product.ratingFive))/5
        if(userlang == 'uz'){
            if(avgr === 0){
                text = `Nomi: ${product.titleUz}\nMa'lumot: ${product.descriptionUz}\nBaho: hali baho olmagan\nNarhi: ${product.newprice}\n`
            }else if(avgr >0){
                text = `Nomi: ${product.titleUz}\nMa'lumot: ${product.descriptionUz}\nBaho: ${avgr}⭐️\nNarhi: ${product.newprice}\n`
            }
        }else if(userlang == 'ru'){
            if(avgr === 0){
                text = `Имя: ${product.titleRu}\nОписание: ${product.descriptionRu}\nОценка: ещё не получил отзывы\nЦена: ${product.newprice}\n`
            }else if(avgr >0){
                text = `Имя: ${product.titleRu}\nОписание: ${product.descriptionRu}\nОценка: ${avgr}⭐️\nЦена: ${product.newprice}\n`
            }
        }
            // img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png'
            img = BASEURL + 'api/' + product.img
                bot.sendPhoto(chatId, img, {
                    caption: text,
                    reply_markup:{
                    inline_keyboard:[[
                        {
                            text: isCartTex,
                            callback_data: JSON.stringify({
                            type: ACTION_TYPE.ADD_CART,
                            productId: product._id
                            })
                        }
                        ]
                        ]
                    }
                })
    }
    if(products.length>0){
        for(j=0;j<products.length; j++){
            getIdFromUser(products[j]) 
        }
    }else{
        bot.sendMessage(chatId, currentLang.emptysector);
    }
}

async function selectCategory(chatId) {
    const countc = await Category.category.countDocuments()
    let cl = Number(countc) - 2
    const category = await Category.category.find().sort({ _id: -1 }).limit(cl)
    let menu = [];
    let keyboard = [];
    menu.push([{'text': `${currentLang.back} ⬅️`}]);
    for (let i = 0; i < category.length; i++) {
        keyboard.push(category[i].titleUz);
    }
    if(category.length % 2 == 1){
        keyboard.push(`${currentLang.soon}`);
    }
    for (var i = 0; i < keyboard.length; i+=2) {
        menu.push(keyboard[i/2] = [{'text': keyboard[i]}, {'text': keyboard[i+1]}]);
    }
    keyboard.length /= 2;
    menu.push([{'text': `${currentLang.back} ⬅️`}]);
    bot.sendMessage(chatId, currentLang.setCategory,{
        reply_markup: JSON.stringify({
            keyboard:  menu
        })
    })
    selectcategorybool=true
}

async function selectCategories(chatId) {
    const category = await Category.category.find().sort({ _id: 1 }).limit(2)
    let menu = [];
    let keyboard = [];
    menu.push([{'text': `${currentLang.back} ⬅️`}]);
    for (let i = 0; i < category.length; i++) {
        keyboard.push(category[i].titleUz);
    }
    if(category.length % 2 == 1){
        keyboard.push(`${currentLang.soon}`);
    }
    for (var i = 0; i < keyboard.length; i+=2) {
        menu.push(keyboard[i/2] = [{'text': keyboard[i]}, {'text': keyboard[i+1]}]);
    }
    keyboard.length /= 2;
    menu.push([{'text': `${currentLang.back} ⬅️`}]);
    bot.sendMessage(chatId, currentLang.setCategory,{
        reply_markup: JSON.stringify({
            keyboard:  menu
        })
    })
    selectcategorybool=true
}

async function getidc(chatId,category,msg){
    if(category != '' && category != 'Tez orada' && category != 'Скоро'){
        if(userlang == 'uz'){
            const idcget = await Category.category.findOne({titleUz: category})
            cgid = idcget._id
            selectcategoryid = cgid
            sendProducts(chatId,cgid,msg)
        }else if(userlang == 'ru'){
            const idcget = await Category.category.findOne({titleRu: category})
            cgid = idcget._id
            selectcategoryid = cgid
            sendProducts(chatId,cgid,msg)
        }
    }
}

module.exports.bot = bot;