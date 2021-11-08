const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    login:{type:String, enique:true},
    password:{type:String},
    role:{type:String},
    fish:{type:String},
    categoryId:{type:String},
    subcategoryId:{type:String},
    phone:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const MemberSchema = new Schema({
    memberId:{type:String},
    chatId:{type:String},
    name: {type:String},
    phone: {type:String},
    username:{type:String},
    location_latitude:{type:String},
    location_longitude:{type:String},
    lang:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const SendMessageSchema = new Schema({
    chatId:{type:String},
    messageId: {type:String},
    text: {type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const OrderSchema = new Schema({
    userId:{type:String},
    memberId:{type:String},
    categoryId:{type:String},
    productId:{type:String},
    qty:{type:Number},
    price:{type:Number},
    newprice:{type:Number},
    messageId:{type:String},
    status:{type:String},
    ratingstatus:{type:String},
    userName:{type:String},
    categoryName:{type:String},
    productName:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const CategorySchema =  new Schema({
    titleUz:{type:String},
    titleRu:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const SubCategorySchema = new Schema({
    subcategoryId:{type:String},
    titleUz:{type:String},
    titleRu:{type:String},
    categoryId:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const ProductSchema = new Schema({
    userId:{type:String},
    titleUz:{type:String},
    titleRu:{type:String},
    descriptionUz:{type:String},
    descriptionRu:{type:String},
    price:{type:Number},
    newprice:{type:Number},
    img:{type:String},
    productorservice:{type:String},
    сurrency:{type:String},
    item:{type:String},
    ratingOne:{type:String},
    ratingTwo:{type:String},
    ratingThree:{type:String},
    ratingFour:{type:String},
    ratingFive:{type:String},
    categoryId:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const ServiceSchema = new Schema({
    titleUz:{type:String},
    titleRu:{type:String},
    descriptionUz:{type:String},
    descriptionRu:{type:String},
    price:{type:Number},
    img:{type:String},
    rating:{type:Number},
    categoryId:{type:String},
    subcategoryId:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const BotLanguageSchema = new Schema({
    uztitle:{type:String},
    rutitle:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const LanguageSchema = new Schema({

}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

const AppSchema = new Schema({
    percent:{type:String},
    phone:{type:String}
}, { timestamps: { createdAt: 'createDate', updatedAt: 'updatedDate' } })

module.exports.user        = model('User', UserSchema)
module.exports.member      = model('Member',MemberSchema)
module.exports.smmember    = model('SendMessage',SendMessageSchema)
module.exports.order       = model('Order',OrderSchema)
module.exports.category    = model('Category', CategorySchema)
module.exports.subcategory = model("SubCategory", SubCategorySchema)
module.exports.product     = model('Product', ProductSchema)
module.exports.service     = model('Service', ServiceSchema)
module.exports.botlanguage = model('BotLanguage',BotLanguageSchema)
module.exports.language    = model('Language',LanguageSchema)
module.exports.appsetting  = model('AppSetting', AppSchema)