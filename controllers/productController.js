const uuid = require('uuid')
const path = require('path');
const Product  = require("../model/model");
const Subcategory  = require("../model/model");
const Appsetting  = require("../model/model")
const ApiError = require('../error/ApiError');

class ProductController{
    async addproduct(req,res,next){
            const {titleUz, titleRu, price, сurrency, item, productorservice, categoryId, subcategoryId, userId, descriptionUz, descriptionRu} = req.body
            if(!req.files){
                return next(ApiError.badRequest('Rasm tanlanmadi'))
            }else if(titleUz === ''){
                return next(ApiError.badRequest('Uzbekcha nomi yozilmagan'))
            }else if(titleRu === ''){
                return next(ApiError.badRequest('Ruscha nomi yozilmagan'))
            }else if(price === ''){
                return next(ApiError.badRequest('Narhi nberilmagan'))
            }else if(сurrency === ''){
                return next(ApiError.badRequest('Narhi nberilmagan'))
            }else if(item === ''){
                return next(ApiError.badRequest('Narhi nberilmagan'))
            }else if(productorservice === ''){
                return next(ApiError.badRequest('Narhi nberilmagan'))
            }else if(categoryId === ''){
                return next(ApiError.badRequest('Что то пустое categoryId'))
            }else if(subcategoryId === ''){
                return next(ApiError.badRequest('Что то пустое subcategoryId'))
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
            let id = '61668f225971c93c410bf10b'
            const getsetting = await Appsetting.appsetting.findById(id)
            let newprice = Number(((price * getsetting.percent)/100)) + Number(price)
            const findlasid = await Product.product.findOne().sort({ _id: -1 })
            let newid
            if(findlasid == null || findlasid.productId == '' || !findlasid.productId){
                newid = 1
            }else if(findlasid.productId > 0){
                newid = Number(findlasid.productId) + Number(1)
            }
            const product = await Product.product.create({productId: newid,titleUz,titleRu, price, newprice: newprice, сurrency, item, productorservice, categoryId, subcategoryId, userId, img: fileName,  descriptionUz, descriptionRu});
            // console.log(product)
            return res.json(product)
        }
    }

    async getproduct(req,res,next){
        const {id} = req.params
        const getproduct = await Product.product.findById(id)
        return res.json(getproduct)
    }

    async getallproducts(req,res,next){
        let {categoryId, subcategoryId, productorservice} = req.query
        let products
        if(!categoryId && !subcategoryId && !productorservice){
            products = await Product.product.find().sort({ _id: -1 })
        }else if(categoryId && !subcategoryId && !productorservice ){
            products = await Product.product.find({categoryId: categoryId}).sort({ _id: -1 })
        }else if(categoryId && subcategoryId && !productorservice ){
            products = await Product.product.find({categoryId: categoryId, subcategoryId: subcategoryId}).sort({ _id: -1 })
        }else if(categoryId && subcategoryId && productorservice ){
            products = await Product.product.find({categoryId: categoryId, subcategoryId: subcategoryId, productorservice: productorservice}).sort({ _id: -1 })
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
        const {id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, item} = req.body
        const updateproduct = await Product.product.findByIdAndUpdate(id, {titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, сurrency, productorservice, item},{new:true})
        return res.json(updateproduct)
    }

    async deleteproduct(req,res,next){
        const {id} = req.body
        const deleteproduct = await Product.product.findByIdAndDelete(id)
        return res.json(deleteproduct)
    }
}

module.exports = new ProductController()