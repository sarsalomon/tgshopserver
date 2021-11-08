const uuid = require('uuid')
const path = require('path');
const Product  = require("../model/model");
const Category  = require("../model/model");
const Appsetting  = require("../model/model")
const ApiError = require('../error/ApiError');

class ProductController{
    async addproduct(req,res,next){
            const {titleUz, titleRu, price, categoryId, userId, descriptionUz, descriptionRu} = req.body
            if(!req.files){
                return next(ApiError.badRequest('Rasm tanlanmadi'))
            }else if(titleUz === ''){
                return next(ApiError.badRequest('Uzbekcha nomi yozilmagan'))
            }else if(titleRu === ''){
                return next(ApiError.badRequest('Ruscha nomi yozilmagan'))
            }else if(price === ''){
                return next(ApiError.badRequest('Narhi nberilmagan'))
            }else if(categoryId === ''){
                return next(ApiError.badRequest('Что то пустое categoryId'))
            }else if(descriptionUz === ''){
                return next(ApiError.badRequest('Uzbekcha ta`rigi yozilmagan'))
            }else if(userId === ''){
                return next(ApiError.badRequest('Ishchi tanlanmagan'))
            }else if(descriptionRu === ''){
                return next(ApiError.badRequest('Ruscha ta`rigi yozilmagan'))
            }else{
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const APPID = process.env.SETTING_ID
            const getsetting = await Appsetting.appsetting.findById(APPID)
            let newprice = Number(((price * getsetting.percent)/100)) + Number(price)
            const product = await Product.product.create({userId, titleUz, titleRu, price, newprice: newprice, categoryId, img: fileName,  descriptionUz, descriptionRu, ratingOne: '', ratingTwo: '', ratingThree: '', ratingFour: '', ratingFive: ''});
            return res.json(product)
        }
    }

    async getproduct(req,res,next){
        const {id} = req.params
        const getproduct = await Product.product.findById(id)
        return res.json(getproduct)
    }

    async getallproducts(req,res,next){
        let {categoryId, user} = req.query
        console.log(user)
        let products
        if(!categoryId && !user){
            products = await Product.product.find().sort({ _id: -1 })
        }else if(categoryId && !user ){
            products = await Product.product.find({categoryId: categoryId}).sort({ _id: -1 })
        }else if(!categoryId  && user ){
            products = await Product.product.find({userId: user}).sort({ _id: -1 })
        }else if(categoryId && user ){
            products = await Product.product.find({categoryId: categoryId, userId: user}).sort({ _id: -1 })
        }
        if(products.length>0){
            for(let j=0;j<products.length; j++){
                const getcategory = await Category.category.findById(products[j].categoryId)
                let cnama = getcategory.titleUz + '-' + getcategory.titleRu
                products[j].categoryId = cnama
            }
        }else{
            console.log('net')
        }
        return res.json(products)
    }

    async getallsubcategories(req,res,next){
        let {id} = req.params
        let subcategory
        if(id == ''){
        }else{
            subcategory = await Subcategory.subcategory.find({categoryId: id}).sort({ _id: -1 })
        }
        return res.json(subcategory)
    }

    async updateproduct(req,res,next){
        const {id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, file} = req.body
        if(!req.files){
            const getproduct = await Product.product.findById(id)
            const updateproduct = await Product.product.findByIdAndUpdate(id, {img: getproduct.img,titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, file},{new:true})
            return res.json(updateproduct)
        }else{
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const updateproduct = await Product.product.findByIdAndUpdate(id, {img: fileName,titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, file},{new:true})
            return res.json(updateproduct)
        }
      
    }

    async deleteproduct(req,res,next){
        const {id} = req.body
        const deleteproduct = await Product.product.findByIdAndDelete(id)
        return res.json(deleteproduct)
    }
}

module.exports = new ProductController()