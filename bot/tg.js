require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const helper      = require('./helper')
const Member      = require("../model/model");
const Product     = require("../model/model");
const Order       = require("../model/model");
const User        = require("../model/model");
const Category    = require("../model/model");
const Smmember    = require("../model/model");
const Appsetting  = require("../model/model")
const { resolve } = require('path/posix');

let bookPages
let selectcategorybool = false
let selectcategoryid = ''
let userlang = ''
let currentLang
async function getmemberlang(chatId,msg) {
    let langs
    languages = await Member.member.findOne({chatId: chatId})
    if(languages == null){
        langs = 'uz'
        userlang = langs
    }else{
        langs = languages.lang
        userlang = langs
    }
    if(langs == 'uz'){
        return currentLang = {
            "hello": 'лавная страница на "RU"',
            "helloagain": 'Hush kelibsiz, sizni ko`rishimdan yana xursandman',
            "emptysector": 'Bu bo`limda hali hech narsa yo`q',
            "setting" : 'Sozlamalar',
            "emptycard": 'Sizda hali hech narsa yoq ekan',
            "addphone":'Raqam kiritin',
            "sendphone": 'Raqam yuborish 📲',
            "sendlocation": 'Manzilni yuborish 📍',
            "ball" : 'ga baholandi',
            "orders" : 'Buyurtmalar',
            "service" : 'Hizmatlar',
            "phoneupdate" : 'Raqamni yangilash',
            "updatelocation" : 'Manzilni yangilash',
            "updateaddress" : 'Manzil yangilandi',
            "products" : 'Mahsulotlar',
            "myOrder" : 'Mani buyurtmalarim',
            "thanks" : 'fikringiz uchun Rahmat',
            "back" :'Orqaga',
            "setLang" : 'Tilni tanlang',
            "updatePhone" : 'Telefon raqam yangilandi',
            "add" : 'Qo`shish',
            "added" : 'Qo`shildi',
            "successreg":'Rahmat ro`yxatdan o`tish tugadi',
            "delete" : 'O`chirish',
            "deleted" : 'O`chirildi',
            "soon" : 'Tez orada',
            "check" : "Tekshirib ko`rish",
            "supportPhone" : "Issiq liniya"
        },
        kb = {
            lang:{
                uz: 'Uz 🇺🇿',
                ru: 'Ru 🇷🇺'
            },
            home:{
                services: `${currentLang.service} 🪚⛏`,        
                orders: `${currentLang.orders} 🛒`,
                support: `${currentLang.supportPhone} ☎️`,
                setting: `${currentLang.setting} ⚙️`
            },
            phone:{
                phoneUpdate: `${currentLang.phoneupdate} 📱`
            },
            location:{
                locationUpdate: `${currentLang.updatelocation} 📍`
            },
            address:{
                addressUpdate: `${currentLang.updateaddress} 🏠`
            },
            fullname:{
                fullnameUpdate: `${currentLang.updatefullname} ✏️📄`
            },
            updatelang:{
                langUpdate : 'Update lang'
            },
            order:{
                myOrder: `${currentLang.myOrder} 🛍`
            },
            services:{
                service: `${currentLang.service} 🪚⛏`,
                products: `${currentLang.products}  🛍`
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
                [kb.services.service],
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
        return currentLang = {
            "hello": 'лавная страница на "RU"',
            "helloagain": 'Добро пожаловать я рада видеть тебя снова',
            "emptysector": 'В этом разделе еще ничего нет',
            "setting" : 'Настройки',
            "emptycard": 'У тебя еще ничего нет',
            "addphone": 'Введите номер',
            "sendphone": 'Отправить номер 📲',
            "sendlocation": 'Отправить локацию 📍',
            "ball" : 'Baholandi',
            "orders" : 'Заказы',
            "service" : 'Услуги',
            "phoneupdate" : 'Изменить номер',
            "updatelocation" : 'Изменить локацию',
            "updateaddress" : 'Адрес обновлен',
            "products" : 'Продукты',
            "myOrder" : 'Мои заказы',
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
            "check" : "Проверить",
            "supportPhone" : "Горячий номер"
        },
        kb = {
            lang:{
                uz: 'Uz 🇺🇿',
                ru: 'Ru 🇷🇺'
            },
            home:{
                services: `${currentLang.service} 🪚⛏`,        
                orders: `${currentLang.orders} 🛒`,
                support: `${currentLang.supportPhone} ☎️`,
                setting: `${currentLang.setting} ⚙️`
            },
            phone:{
                phoneUpdate: `${currentLang.phoneupdate} 📱`
            },
            location:{
                locationUpdate: `${currentLang.updatelocation} 📍`
            },
            address:{
                addressUpdate: `${currentLang.updateaddress} 🏠`
            },
            fullname:{
                fullnameUpdate: `${currentLang.updatefullname} ✏️📄`
            },
            updatelang:{
                langUpdate : 'Update lang'
            },
            order:{
                myOrder: `${currentLang.myOrder} 🛍`
            },
            services:{
                service: `${currentLang.service} 🪚⛏`,
                products: `${currentLang.products}  🛍`
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
                [kb.services.service],
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
};

const TOKEN = process.env.BOT_TOKEN
const BASEURL = process.env.TELEGRAM_APP_API_URL
const APPID = process.env.SETTING_ID

const ACTION_TYPE = {
    ADD_CART: 'ad',
    DELETE_ITEM: 'di',
    SUCCESS_ORDER: 'so',
    CHECK_STATUS: 'chs',
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

bot.on('message', msg=>{
        const text = msg.text;
        const chatId = helper.getChatId(msg)
        getmemberlang(chatId,msg)
        if (text === '/start'){
            registrationuser(chatId,msg)
        }
        if(msg.contact){
            updateInformation(chatId,'updatephone',msg) 
            checkregistrationuser(chatId,msg)
        }
        if(msg.location){
            updateInformation(chatId,'updatelocation',msg) 
            checkregistrationuser(chatId,msg)
        }
        switch (msg.text){
            case kb.lang.uz:
                updateInformation(chatId,'uz')
            break
            case kb.lang.ru:
                updateInformation(chatId,'ru')
            break
            case kb.home.setting:
                bot.sendMessage(chatId, `${currentLang.setting}`,{
                    reply_markup: {
                        keyboard: keyboard.setting
                    }
                });

            break
            case kb.home.support:
                sendContact(chatId)
            break
            case kb.home.services:
                selectCategory(chatId)
                deleteallmessage(chatId)
            break
            case kb.back.backButton:
                bot.sendMessage(chatId, `${currentLang.back}`,{
                    reply_markup:{
                        keyboard: keyboard.home
                    }
                })
                selectcategorybool=false
            break
        }
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
    if (type === ACTION_TYPE.CHECK_STATUS) {
        checkOrder(userId, query.id, productId, messageId,chatId, data)
    }
    if (type === ACTION_TYPE.RATING_ONE || type === ACTION_TYPE.RATING_TWO || type === ACTION_TYPE.RATING_THREE || type === ACTION_TYPE.RATING_FOUR || type === ACTION_TYPE.RATING_FIVE) {
        ratingServiceAdd(userId, query.id, productId, messageId, chatId, data)
    }

})

async function sendContact(chatId){
    const getsetting = await Appsetting.appsetting.findById(APPID)
    bot.sendContact(chatId, getsetting.phone, 'Imperia Service');
}

async function registrationuser(chatId,msg){
    const id = chatId
    const condidate = await Member.member.findOne({chatId: id})
    if(condidate){
        if(condidate.phone !== '' && condidate.location_latitude !== '' && condidate.location_longitude !== ''){
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

async function checkregistrationuser(chatId,msg){
    const id = chatId
    const condidate = await Member.member.findOne({chatId: id})
    if(condidate){

    }else{
        if(msg.from.last_name == undefined){
        
        }else{
            lastName = msg.from.last_name
        }
        const user = await Member.member.create({chatId,name: msg.from.first_name + ' ' + lastName,phone:'',username:msg.from.username,location_latitude:'',location_longitude:'',lang:''})
    }
}

async function updateInformation(chatId,val,msg){
    const condidate = await Member.member.findOne({chatId: chatId})
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
            bot.sendMessage(chatId, `Davom etirish uchun yashash manzilni kiritin`,{
                reply_markup: {
                    keyboard: keyboard.orderaddresssuccess
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
            bot.sendMessage(msg.chat.id, currentLang.successreg,{
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

async function addOrder(userId, queryId, productId, messageId, chatId){
    const findorder = await Order.order.findOne({memberId:userId, productId:productId})
    if(findorder){
        const orderdelete = await Order.order.deleteOne({memberId:userId, productId:productId})
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
    }else{
        const findproduct = await Product.product.findById(productId)
        const findcategory = await Category.category.findById(findproduct.categoryId)
        const finduser = await User.user.findById(findproduct.userId)
        console.log(findcategory)
        console.log(finduser)
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

async  function ratingServiceSendMessage(productId, chatId, orderId){
    text = `Working`
    img = 'https://hsto.org/r/w1560/webt/ql/c9/_t/qlc9_t6jziecxi7nnhgasn_rmlo.png'
    bot.sendPhoto(chatId, img, {
        caption: text,
        reply_markup:{
            inline_keyboard:[[
                {
                    text: "⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_ONE,
                        // productId: product._id,
                        orderId: orderId,
                        rating: 1
                    })
                },
                {
                    text: "⭐️⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_TWO,
                        // productId: product._id,
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
                        // productId: product._id,
                        orderId: orderId,
                        rating: 3
                    })
                }
                ,
                {
                    text: "⭐️⭐️⭐️⭐️",
                    callback_data: JSON.stringify({
                        type: ACTION_TYPE.RATING_FOUR,
                        // productId: product._id,
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
                        // productId: product._id,
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
    let succesrating = bot.answerCallbackQuery({callback_query_id: queryId, text: `${productId} ${data.rating} ${ratingtext}`});
    if(succesrating){
        const updateorder = await Order.order.findByIdAndUpdate(data.orderId, {ratingstatus: '1'},{new:true})
        const getproduct = await Order.order.findById(data.orderId)
        if(updateorder){
            let updateproduct
            if(data.rating == 1){
                updateproduct = await Product.product.findByIdAndUpdate(getproduct.productId, {ratingOne: '1'},{new:true})
            }else if(data.rating == 2){
                updateproduct = await Product.product.findByIdAndUpdate(getproduct.productId, {ratingTwo: '2'},{new:true})
            }else if(data.rating == 3){
                updateproduct = await Product.product.findByIdAndUpdate(getproduct.productId, {ratingThree: '3'},{new:true})
            }else if(data.rating == 4){
                updateproduct = await Product.product.findByIdAndUpdate(getproduct.productId, {ratingFour: '4'},{new:true})
            }else if(data.rating == 5){
                updateproduct = await Product.product.findByIdAndUpdate(getproduct.productId, {ratingFive: '5'},{new:true})
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
            img = 'https://hsto.org/r/w1560/webt/ql/c9/_t/qlc9_t6jziecxi7nnhgasn_rmlo.png'
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
                },addmessage(message))
    }
    for(j=0;j<products.length; j++){
        getIdFromUser(products[j]) 
    }
}

async function selectCategory(chatId) {
    const category = await Category.category.find()
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
    bot.sendMessage(chatId, `Category tanglang`,{
        reply_markup: JSON.stringify({
            keyboard:  menu
        })
    })
    selectcategorybool=true
}

async function getidc(chatId,category,msg){
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

bot.on('message', function (message) {
    const chatId = message.chat.id
    const txt = message.text
    if(selectcategorybool){  
        if(txt.includes("«") || txt.includes("-") || txt.includes("‹") || txt.includes("›") || txt.includes("»") || txt.includes("hammasini korish")){

        }else{
            getidc(chatId,txt,message)
        }
    }
    if (text==kb.back.backButton || text==kb.home.setting || text==kb.home.services || text==kb.services.products || text==kb.fullname.fullnameUpdate || text==kb.address.addressUpdate) {
        checkregistrationuser(chatId,msg)
    }
});

async function addmessage(msg){
    const messagec = await Smmember.smmember.create({chatId:msg.chat.id,messageId: msg.message_id,text:JSON.stringify(msg)})
}

module.exports.bot = bot;