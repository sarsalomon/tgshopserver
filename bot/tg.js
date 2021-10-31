require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const helper      = require('./helper')
const Member      = require("../model/model");
const Product     = require("../model/model");
const Order       = require("../model/model");
const Category    = require("../model/model");
const Subcategory    = require("../model/model");
const Smmember    = require("../model/model");
const { resolve } = require('path/posix');

let bookPages
let selectcategorybool = false
let selectsubcategorybool = false
let selectcategoryid = ''
let selectsubcategoryid = ''
let userlang = ''

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
    // console.log(langs)
    if(langs == 'uz'){
        return currentLang = {
            "hello": 'лавная страница на "RU"',
            "helloagain": 'Hush kelibsiz, sizni ko`rishimdan yana xursandman',
            "emptysector": 'Bu bo`limda hali hech narsa yo`q',
            "setting" : 'Sozlamalar',
            "emptycard": 'Sizda hali hech narsa yoq ekan',
            "addphone":'Raqam kiritin',
            "ball" : 'ga baholandi',
            "orders" : 'Buyurtmalar',
            "service" : 'Hizmatlar',
            "phoneupdate" : 'Telefon raqamni yangilash',
            "updatelocation" : 'Lokatsiyani yangilash',
            "updateaddress" : 'Manzilni yangilash',
            "updatefullname" : 'Ismni yangilash',
            "products" : 'Mahsulotlar',
            "myOrder" : 'Mani buyurtmalarim',
            "thanks" : 'fikringiz uchun Rahmat',
            "back" :'Orqaga',
            "setLang" : 'Tilni tanlang',
            "updatePhone" : 'Telefon raqam yangilandi',
            "add" : 'Qo`shish',
            "added" : 'Qo`shildi',
            "delete" : 'O`chirish',
            "deleted" : 'O`chirildi',
            "soon" : 'Tez orada',
            "check" : "Tekshirib ko`rish"
        },
        kb = {
            lang:{
                uz: 'Uz 🇺🇿',
                ru: 'Ru 🇷🇺'
            },
            home:{
                services: `${currentLang.service} 🪚⛏`,        
                orders: `${currentLang.orders} 🛒`,
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
                [kb.home.services,kb.home.orders],
                [kb.home.setting]
            ],
            service:[
                [kb.services.service,kb.services.products],
                [kb.back.backButton]
            ],    
            order:[
                [kb.back.backButton]
            ],
            setting:[
                [{text: kb.phone.phoneUpdate, request_contact: true},{text: kb.location.locationUpdate, request_location: true}],
                [kb.fullname.fullnameUpdate,kb.address.addressUpdate],
                [kb.lang.uz,kb.lang.ru],
                [kb.back.backButton]
            ],
            orderphonesuccess:[
                [kb.back.backButton,{text: currentLang.addphone, request_contact: true}]
            ],
            orderaddresssuccess:[
                [kb.back.backButton,kb.address.addressUpdate]
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
            "addphone": 'Введите номер ',
            "ball" : 'Baholandi',
            "orders" : 'Заказы',
            "service" : 'Услуги',
            "phoneupdate" : 'Изменить номер',
            "updatelocation" : 'Изменить локацию',
            "updateaddress" : 'Изменить адрес',
            "updatefullname" : 'Изменить имя',
            "products" : 'Продукты',
            "myOrder" : 'Мои заказы',
            "thanks" : 'Спасибо за отзыв',
            "back" :'Назад',
            "setLang" : 'Выберите язык',
            "updatePhone" : 'Номер телефона обновлен',
            "add" : 'Добавлять',
            "added" : 'Добавлень',
            "delete" : 'Удалить',
            "deleted" : 'Удаленный',
            "soon" : "Скоро",
            "check" : "Проверить"
        },
        kb = {
            lang:{
                uz: 'Uz 🇺🇿',
                ru: 'Ru 🇷🇺'
            },
            home:{
                services: `${currentLang.service} 🪚⛏`,        
                orders: `${currentLang.orders} 🛒`,
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
                [kb.home.services,kb.home.orders],
                [kb.home.setting]
            ],
            service:[
                [kb.services.service,kb.services.products],
                [kb.back.backButton]
            ],    
            order:[
                [kb.back.backButton]
            ],
            setting:[
                [{text: kb.phone.phoneUpdate, request_contact: true},{text: kb.location.locationUpdate, request_location: true}],
                [kb.fullname.fullnameUpdate,kb.address.addressUpdate],
                [kb.lang.uz,kb.lang.ru],
                [kb.back.backButton]
            ],
            orderphonesuccess:[
                [kb.back.backButton,{text: currentLang.addphone, request_contact: true}]
            ],
            orderaddresssuccess:[
                [kb.back.backButton,kb.address.addressUpdate]
            ],
            simpleback:[
                [kb.back.backButton]
            ]
        }
    }
};

async function findallProduct(chatId,cgid,msg) {
    bookPages = await Product.product.countDocuments({subcategoryId: cgid})
    console.log(`dawdaw : `,bookPages)
    if(bookPages == 0){
        selectcategorybool=false
        selectsubcategorybool=false
        bot.sendMessage(chatId, `${currentLang.emptysector}`,{
            reply_markup:{
                keyboard: keyboard.home
            }
        })
    }else{
        // console.log(bookPages)
        lastDigit = bookPages % 10;
        if(lastDigit < 5){
            bookPages = bookPages-lastDigit
        }else if(lastDigit > 5){
            bookPages = bookPages-(lastDigit-5)
        }else if(lastDigit == 5){
            bookPages
        }
        bot.sendMessage(chatId, 'Tanla category', getPagination(1,bookPages), addmessage(msg));
    }
    await Promise.resolve();
  };

const TOKEN = process.env.BOT_TOKEN

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
bot.onText(/findusers/, (msg) => {
    findalluser(helper.getChatId(msg), 'hozir')
});

bot.on('message', msg=>{
        const text = msg.text;
        const chatId = helper.getChatId(msg)
        getmemberlang(chatId,msg)
        switch (msg.text){
            case kb.lang.uz:
                updateInformation(chatId,'uz')
            break
            case kb.lang.ru:
                updateInformation(chatId,'ru')
            break
            case kb.home.orders:
               findOrder(chatId,msg)
            break
            case kb.home.setting:
                bot.sendMessage(chatId, `${currentLang.setting}`,{
                    reply_markup: {
                        keyboard: keyboard.setting
                    }
                });
            break
            case kb.home.services:
                bot.sendMessage(chatId, `Tesx`,{
                    reply_markup:{
                        keyboard: keyboard.service
                    },
                    resize_keyboard: true
                });
                deleteallmessage(chatId)
            break
            case kb.services.products:
                 selectCategory(chatId)
                // selectCategory(chatId)
            break
            case kb.fullname.fullnameUpdate:
                updateInformation('','updatesurname',msg)
            break
            case kb.address.addressUpdate:
                updateInformation('','updateaddress',msg)
            break
            case kb.back.backButton:
                bot.sendMessage(chatId, `${currentLang.back}`,{
                    reply_markup:{
                        keyboard: keyboard.home
                    }
                })
                selectcategorybool=false
                selectsubcategorybool=false
            break
        }
        if (text === '/start'){   
            registrationuser(chatId,msg)
        }
        if (text === '/deletealluser'){   
            deletealluser(chatId)
        }
})

bot.on('message', msg=>{
    // console.log(msg)
    const text = msg.text;
    const chatId = helper.getChatId(msg)
    // bot.sendMessage(chatId, "The message id is: "  + msg.message_id  +" This chat ID is: ")
    if (text==kb.back.backButton || text==kb.home.setting || text==kb.home.services || text==kb.services.products || text==kb.fullname.fullnameUpdate || text==kb.address.addressUpdate) {
        checkregistrationuser(chatId,msg)
    }
})

bot.on('contact', msg=>{
    const chatId = helper.getChatId(msg)
    updateInformation('','updatephone',msg) 
    checkregistrationuser(chatId,msg)
})

bot.on('location', msg=>{
    const chatId = helper.getChatId(msg)
    updateInformation('','updatelocation',msg) 
    checkregistrationuser(chatId,msg)
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

async function registrationuser(chatId,msg){
    const id = chatId
    const condidate = await Member.member.findOne({chatId: id})
    if(condidate){
        bot.sendMessage(chatId, `${currentLang.helloagain} ${msg.from.first_name + ' ' + msg.from.last_name}`,{
            reply_markup: {
                keyboard: keyboard.home
            }
        });
        return false
    }else{
        if(msg.from.last_name == undefined){
            lastName = ''
        }else{
            lastName = msg.from.last_name
        }
        const user = await Member.member.create({chatId,name: msg.from.first_name + ' ' + lastName,phone:'',username:msg.from.username,location:'',lang:'',region:'',address:''})
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
        // console.log('exits chechre')
    }else{
        if(msg.from.last_name == undefined){
            lastName = 'яв'
        }else{
            lastName = msg.from.last_name
        }
        const user = await Member.member.create({chatId,name: msg.from.first_name + ' ' + lastName,phone:'',username:msg.from.username,location:'',lang:'fjsf',region:'',address:''})
    }
}

async function updateInformation(chatId,val,msg){
    if(val == 'uz'){
        const user = await Member.member.findOneAndUpdate({chatId: chatId}, {lang: "uz"})
        bot.sendMessage(chatId, `Обновился на Узбекский язык, нажмите еще раз /start, чтобы изменения вступили в силу`,{
            reply_markup: {
                keyboard: keyboard.home
            }
        });
    }else if(val == 'ru'){
        const user = await Member.member.findOneAndUpdate({chatId: chatId}, {lang: "ru"})
        bot.sendMessage(chatId, `Rus tiliga yangilandi, o'zgarish kuchiga kirish uchun qaytadan /start bosin`,{
            reply_markup: {
                keyboard: keyboard.home
            }
        });
    }else if(val == 'updatephone'){
        const user = await Member.member.findOneAndUpdate({chatId: msg.contact.user_id}, {phone: msg.contact.phone_number})
        bot.sendMessage(msg.contact.user_id, `${currentLang.updatePhone} ${msg.contact.phone_number} ga`,{
            reply_markup: {
                keyboard: keyboard.simpleback
            }
        });
    }else if(val == 'updatelocation'){
        const user = await Member.member.findOneAndUpdate({chatId: msg.chat.id}, {location_latitude: msg.location.latitude,location_longitude: msg.location.longitude})
        bot.sendMessage(msg.chat.id, `Nuqta raqam yangilanddi ${msg.location.latitude} ${msg.location.longitude} ga`,{
            reply_markup: {
                keyboard: keyboard.setting
            }
        });
    }else if(val == 'updatesurname'){
        // const user = await Member.member.findOneAndUpdate({chatId: msg.chat.id}, {location_latitude: msg.location.latitude,location_longitude: msg.location.longitude})
        // bot.sendMessage(msg.chat.id, `Nuqta raqam yangilanddi ${msg.location.latitude} ${msg.location.longitude} ga`,{
        //     reply_markup: {
        //         keyboard: keyboard.setting
        //     }
        // });
    }else if(val == 'updateaddress'){
        // const user = await Member.member.findOneAndUpdate({chatId: msg.chat.id}, {location_latitude: msg.location.latitude,location_longitude: msg.location.longitude})
        // bot.sendMessage(msg.chat.id, `Nuqta raqam yangilanddi ${msg.location.latitude} ${msg.location.longitude} ga`,{
        //     reply_markup: {
        //         keyboard: keyboard.setting
        //     }
        // });
    }
}

async function addOrder(userId, queryId, productId, messageId, chatId){
    const findorder = await Order.order.findOne({memberId:userId, serviceId:productId})
    if(findorder){
        const orderdelete = await Order.order.deleteOne({memberId:userId, serviceId:productId})
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
        let ratingorder
        if(findproduct.rating == ''){
            ratingorder = ''
        }else{
            ratingorder = findproduct.rating
        }
        const order = await Order.order.create({
            memberId:userId, 
            categoryId: findproduct.categoryId,  
            subcategoryId: findproduct.subcategoryId, 
            productId:productId,
            productorservice:findproduct.productorservice,
            qty: '1', 
            cost: findproduct.price, 
            newprice: findproduct.newprice,
            messageId:messageId,
            status: '1',
            ratingstatus: '0'})
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

async function deleteOrder(userId, queryId, productId, messageId, chatId){
    const orderdelete = await Order.order.findOneAndDelete(productId, {memberId:chatId})
    bot.answerCallbackQuery({callback_query_id: queryId, text: `${currentLang.deleted} ${productId}`});
    bot.deleteMessage(chatId, messageId)
}

async function findOrder(chatId,msg){
    const findorder = await Order.order.find({memberId:chatId})
    if (findorder.length==0) {
        bot.sendMessage(chatId, `${currentLang.emptycard}`,{
            reply_markup:{
                keyboard: keyboard.service
            },
            resize_keyboard: true
        });
    }else{
        async function getOrderFromUser(product){
            console.log(product)
            const id = product.productId
            const findorder = await Product.product.findById(id)
            if(findOrder != ''){
            }
            console.log(findorder)
            const orderfind = await Order.order.findOne({memberId:chatId,serviceId:findorder._id})
            istreatment = false
            istreatmentType = false
            if(orderfind.status = 1){
                istreatment = true
                istreatmentType = true
            }
            istreatmentText = istreatment ? "Obrabotka" : "Succes"
            istreatmentTypeText = istreatment ? ACTION_TYPE.SUCCESS_ORDER : ACTION_TYPE.CHECK_STATUS
            if(userlang == 'uz'){
                text = `Nomi: ${findorder.titleRu}\nMalumot: ${findorder.descriptionRu}\nNarhi: ${findorder.newprice}\n`
            }else if(userlang == 'ru'){
                text = `Имя: ${findorder.titleRu}\nОписание: ${findorder.descriptionRu}\nЦена: ${findorder.newprice}\n`
            }
            console.log(userlang)
            img = 'https://olympic.uz/wp-content/uploads/2020/06/telegram.png'
            console.log(img)
            // console.log('id: '+product._id)
            bot.sendPhoto(chatId, img, {
                caption: text,
                reply_markup:{
                    inline_keyboard:[[
                        {
                            text: currentLang.delete,
                            callback_data: JSON.stringify({
                                type: ACTION_TYPE.DELETE_ITEM,
                                productId: product._id
                            })
                        },
                        {
                            text: istreatmentText,
                            callback_data: JSON.stringify({
                                type: istreatmentTypeText,
                                productId: product._id
                            })
                        }
                    ]
                ]
                }
            })
        }
        findorder.map(product=>{
            getOrderFromUser(product)
        })
    }
}

async function successOrder(userId, queryId, productId, messageId, chatId){
    const condidate = await Member.member.findOne({chatId: chatId})
    if(condidate.phone === ''){
        bot.sendMessage(chatId, `${currentLang.addphone}`,{
            reply_markup: {
                keyboard: keyboard.orderphonesuccess
            }
        });
    // }else if (condidate.address === '') {
    //     bot.sendMessage(chatId, `Davom etirish uchun yashash manzilni kiritin`,{
    //         reply_markup: {
    //             keyboard: keyboard.orderaddresssuccess
    //         }
    //     });
    }else{
        const orderupdate = await Order.order.findOneAndUpdate({memberId: chatId}, {status: '1'})
        bot.answerCallbackQuery({callback_query_id: queryId, text: `Success ${productId}`});
        bot.editMessageReplyMarkup({
            inline_keyboard: [
                [
                    {
                        text: currentLang.delete,
                        callback_data: JSON.stringify({
                            type: ACTION_TYPE.DELETE_ITEM,
                            productId: productId
                        })
                    },             
                    {
                        text: `🔄 ${currentLang.check}`,
                        callback_data: JSON.stringify({
                            type: ACTION_TYPE.CHECK_STATUS,
                            productId: productId
                        })
                    }
                ]
            ]
            }, {
                chat_id: chatId, 
                message_id: messageId
            });
    }
}

async function checkOrder(userId, queryId, productId, messageId, chatId){
    // console.log(productId)
    // console.log(chatId)
    const getitem = Order.order.findOne({memberId:chatId, serviceId:productId})
    // console.log(getitem)
    text = 'Nam1e213'
    bot.answerCallbackQuery({callback_query_id: queryId, text: `cheking ${productId}`});
    // bot.editMessageCaption(text,{
    //     chat_id: chatId,
    //     message_id: messageId,
    //     caption: 'asdad',
    //     reply_markup: {
    //         inline_keyboard: [
    //             [
    //                 {
    //                     text: "Delete",
    //                     callback_data: JSON.stringify({
    //                         type: ACTION_TYPE.ADD_CART,
    //                         productId: productId
    //                     })
    //                 },             
    //                 {
    //                     text: "check",
    //                     callback_data: JSON.stringify({
    //                         type: ACTION_TYPE.CHECK_STATUS,
    //                         productId: productId
    //                     })
    //                 }
    //             ]
    //         ]
    //     }
    //   })
    // bot.editMessageCaption(chatId, messageId, caption, {
    //     parse_mode: 'Markdown'
    //  })
}

async  function ratingServiceSendMessage(productId, chatId, orderId){
    // getmemberlang(chatId)
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
        // const rating = await Order.order.deleteOne({chatId, productId})
    // console.log(data)
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
        const updateproduct = await Order.order.findByIdAndUpdate(data.orderId, {ratingstatus: '1'},{new:true})
        if(updateproduct){
            bot.deleteMessage(chatId, messageId)
        }
    }else{
        // console.log('not(')
    }
}
async function getproductbylimit(chatId,i,selectsubcategoryid,msg){
    // console.log(i)
    if (i == 1) {
        q=1
    }else{
        q=5
    }
    if(i == 5){
        ni = 1
    }else if(i>9){
        ni = i-4
    }else{
        ni = 0
    }
    // console.log(i)
    if(bookPages<4){
        const products = await Product.product.find({subcategoryId:selectsubcategoryid}).sort({ _id: -1 })
        async function getIdFromUser(product){
            const findorder = await Order.order.findOne({memberId:chatId,serviceId:product._id})
            isCart = false
            if(findorder){
                isCart = true
            }
            isCartTex = isCart ? currentLang.delete : currentLang.add
            if(userlang == 'uz'){
                text = `Nomi: ${product.titleUz}\nMalumot: ${product.descriptionUz}\nNarhi: ${product.newprice}\n`
            }else if(userlang == 'ru'){
                text = `Имя: ${product.titleRu}\nОписание: ${product.descriptionRu}\nЦена: ${product.newprice}\n`
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
            })
        }
        for(j=0;j<products.length; j++)
        {
            // console.log(products[j]) 
            if(j<5){
                getIdFromUser(products[j]) 
            } 
        }
    }else{
        const products = await Product.product.find({subcategoryId:selectsubcategoryid}).sort({ _id: -1 }).limit(q).skip(ni)
        async function getIdFromUser(product,i){
            console.log(product)
            const findorder = await Order.order.findOne({memberId:chatId,serviceId:product._id})
            isCart = false
            if(findorder){
                isCart = true
            }
            isCartTex = isCart ? currentLang.delete : currentLang.add
            console.log(findorder)
            console.log(userlang)
            if(userlang == 'uz'){
                text = `Nomi: ${product.titleUz}\nMalumot: ${product.descriptionUz}\nNarhi: ${product.newprice}\n`
            }else if(userlang == 'ru'){
                text = `Имя: ${product.titleRu}\nОписание: ${product.descriptionRu}\nЦена: ${product.newprice}\n`
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
            })
        }
        for(j=0;j<products.length; j++)
        {
            // console.log(j)
            if(j<5 && j==4){
                let ew = bookPages - i + 5
                bot.sendMessage(chatId,`${ew/5}/${bookPages/5}`,getPagination(i,bookPages), addmessage(msg))
            }
            if(j==0 && j<1 && j>0){
                bot.sendMessage(chatId,`Eng yangi Taklif`,getPagination(i,bookPages), addmessage(msg))
            }
            let lastDigit = bookPages % 10;
            // console.log('um: '+bookPages)
            // console.log('qoldiq: '+lastDigit)
            // console.log(j)      
            if(lastDigit == 5 && j==3 && j>4){
                bot.sendMessage(chatId,`1/${bookPages/5}`,getPagination(i,bookPages), addmessage(msg))
            }
            if(lastDigit == 0 && j==3){
                bot.sendMessage(chatId,`1/${bookPages/5}`,getPagination(i,bookPages), addmessage(msg))
            }
            if(j<5){
                getIdFromUser(products[j],i) 
            } 
        }
    }
}

function getPagination( current, maxpage) {
    // console.log('c: '+current)
    // console.log('m: '+maxpage)
    let keys = [];
    if(bookPages<5){
        keys.push({ text: `hammasini korish`});
    }else{
        if (current>1) keys.push({ text: `«1`});
        if(current==5){
        }else{
        if (current>2) keys.push({ text: `‹${current-5}`});
        }
        keys.push({ text: `-${current}-`});
        if (current==1) {
        if (current<maxpage-5) keys.push({ text: `${current+4}›`})
        }else{
        if (current<maxpage-5) keys.push({ text: `${current+5}›`})
        }
        if (current<maxpage) keys.push({ text: `${maxpage}»`});
    }
  return {
    reply_markup: JSON.stringify({
        keyboard: [ keys, [`${currentLang.back} ⬅️`]]
    })
  };
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

async function selectSubCategory(chatId,categoryId) {
    const category = await Category.category.findOne({titleUz: categoryId.text})
    const subcategory = await Subcategory.subcategory.find({categoryId: category._id})
    let submenu = [];
    let keyboard = [];
    submenu.push([{'text': `${currentLang.back} ⬅️`}]);
    for (let i = 0; i < subcategory.length; i++) {
        keyboard.push(subcategory[i].titleUz);
    }
    if(subcategory.length % 2 == 1){
        keyboard.push(`${currentLang.soon}`);
    }
    for (var i = 0; i < keyboard.length; i+=2) {
        submenu.push(keyboard[i/2] = [{'text': keyboard[i]}, {'text': keyboard[i+1]}]);
    }
    keyboard.length /= 2;
    submenu.push([{'text': `${currentLang.back} ⬅️`}]);
    bot.sendMessage(chatId, `SubCategory tanglang`,{
        reply_markup: JSON.stringify({
            keyboard:  submenu
        })
    })
    selectcategorybool=true
    selectsubcategorybool=true
}

bot.on('message', function (message) {
    if(selectcategorybool && selectsubcategorybool){  
        const chatId = message.chat.id
        const txt = message.text
        if(txt.includes("«") || txt.includes("-") || txt.includes("‹") || txt.includes("›") || txt.includes("»") || txt.includes("hammasini korish")){
            // console.log('not woriking cfidg')
        }else{
            getidc(chatId,txt,message)
        }
    }else if(selectcategorybool){  
        const chatId = message.chat.id
        const txt = message.text
        if(txt.includes("«") || txt.includes("-") || txt.includes("‹") || txt.includes("›") || txt.includes("»") || txt.includes("hammasini korish")){
            // console.log('not woriking cfidg')
        }else{
            selectSubCategory(chatId,message)
        }
    }
});

async function getidc(chatId,category,msg){
    const idcget = await Subcategory.subcategory.findOne({titleUz: category})
    cgid = idcget._id
    // console.log(cgid)
    selectsubcategoryid = cgid
    findallProduct(chatId,cgid,msg)
}

bot.on('message', function (message) {
    // console.log(message)
    const chatId = message.chat.id
    const txt = message.text
    if (txt == "«1") {
        const lastp =  Number(1)
        getproductbylimit(chatId,lastp,selectsubcategoryid,message)
        getPagination(1,bookPages)
        // deletepostmessage(message)
    }else if(txt == `${bookPages}»`){
        const lastp =  Number(bookPages)
        getproductbylimit(chatId,lastp,selectsubcategoryid,message)
        deletepostmessage(message)
    }else if(txt == `-1-`){
        getproductbylimit(chatId,1,selectsubcategoryid,message)
    }else if(txt == `hammasini korish`){
        getproductbylimit(chatId,0,selectsubcategoryid,message)
    }else{
        for(let i=0; i< bookPages; i++){
        fivedrop = i % 5 == 0
            if (fivedrop) {
                if (txt == `‹${i}`) {
                    getproductbylimit(chatId,i,selectsubcategoryid,message)
                    deletepostmessage(message)
                }
                if (txt == `-${i}-`) {
                }
                if (txt == `${i}›`) {
                    getproductbylimit(chatId,i,selectsubcategoryid,message)
                    deletepostmessage(message)
                }
            }
        }
    }
});

async function addmessage(msg){
    const messagem2 = await Smmember.smmember.create({chatId:msg.chat.id,messageId: msg.message_id-2,text:JSON.stringify(msg)})
    const messagem1 = await Smmember.smmember.create({chatId:msg.chat.id,messageId: msg.message_id-1,text:JSON.stringify(msg)})
    const messagec = await Smmember.smmember.create({chatId:msg.chat.id,messageId: msg.message_id,text:JSON.stringify(msg)})
    const messagep1 = await Smmember.smmember.create({chatId:msg.chat.id,messageId: msg.message_id+1,text:JSON.stringify(msg)})
    const messagep2 = await Smmember.smmember.create({chatId:msg.chat.id,messageId: msg.message_id+2,text:JSON.stringify(msg)})
}

async function deletepostmessage(msg){
    current = Number(msg.message_id)
    conditionid = Number(msg.message_id)-6
    for(let i=conditionid;i<current;i++){
        bot.deleteMessage(msg.chat.id, i)
    }
}

async function deletemessage(chatId){
    const findmessage = await Smmember.smmember.find({chatId:chatId})
    async function dm(message){
        bot.deleteMessage(chatId, message.messageId)
        const deletemessage = await Smmember.smmember.deleteMany({chatId:chatId}) 
    }
    if(findmessage.length > 0){
        findmessage.map(message=>{
            dm(message)
        })
    }
}

async function deleteallmessage(chatId){
    const deletemessage = await Smmember.smmember.deleteMany({chatId:chatId}) 
    console.log(deletemessage)
}
module.exports.bot = bot;