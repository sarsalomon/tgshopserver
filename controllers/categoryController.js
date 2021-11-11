const ApiError = require("../error/ApiError")
const  Category  = require("../model/model")
const  Subcategory  = require("../model/model")

class CategoryController{
    async addcategory(req,res,next){
        const {titleUz, titleRu} = req.body
        if(!titleUz || !titleRu){
            return next(ApiError.badRequest('Empty uz or ru'))
        }
        const uztitlefind = await Category.category.findOne({titleUz})
        const rutitlefind = await Category.category.findOne({titleRu})
        if(uztitlefind){
            return next(ApiError.badRequest('Exits uz title'))
        }else if(rutitlefind){
            return next(ApiError.badRequest('Exits ru title'))
        }else{
            const category = await Category.category.create({titleUz, titleRu})
            return res.json(category)
        }
    }

    async addsubcategory(req,res,next){
        const {categoryId, subcategoryUz, subcategoryRu} = req.body
        if(!subcategoryUz){
            return next(ApiError.badRequest('Uzbek tilida yozilmagan'))
        }else if(!subcategoryRu){
            return next(ApiError.badRequest('Rus tilida yozilmagan'))
        }else if(!categoryId){
            return next(ApiError.badRequest('Kategoriya tanlanmadi'))
        }
        const uztitlefind = await Subcategory.subcategory.findOne({titleUz: subcategoryUz,categoryId})
        const rutitlefind = await Subcategory.subcategory.findOne({titleRu: subcategoryRu,categoryId})
        if(uztitlefind){
            return next(ApiError.badRequest('Bunaqa nom bor ekan Uzbek tilida'))
        }else if(rutitlefind){
            return next(ApiError.badRequest('Bunaqa nom bor ekan tilida'))
        }else{
            const findlasid = await Subcategory.subcategory.findOne().sort({ _id: -1 })
            let newid
            if(findlasid == null){
                newid = 1
            }else if(findlasid.subcategoryId > 0){
                newid = Number(findlasid.subcategoryId) + Number(1)
            }
            const subcategory = await Subcategory.subcategory.create({subcategoryId: newid,titleUz: subcategoryUz, titleRu: subcategoryRu, categoryId})
            return res.json(subcategory)
        }
    }

    async getcategory(req,res,next){
        const {id} = req.params
        const getcategory = await Category.category.findById(id)
        return res.json(getcategory)
    }

    async getsubcategory(req,res,next){
        const {id} = req.params
        const getsubcategory = await Subcategory.subcategory.findById(id)
        return res.json(getsubcategory)
    }

    async getallcategories(req,res,next){
        const categories = await Category.category.find().sort({ _id: -1 })
        return res.json(categories)
    }

    async getallsubcategories(req,res,next){
        let {categoryId} = req.query
        let subcategory
        if(categoryId == ''){
            subcategory = await Category.category.find().sort({ _id: -1 })
        }else{
            subcategory = await Subcategory.subcategory.find({categoryId: categoryId}).sort({ _id: -1 })
        }
        return res.json(subcategory)
    }

    async updatecategory(req,res,next){
        const {id, titleUz, titleRu} = req.body
        const updatecategory = await Category.category.findByIdAndUpdate(id, {titleUz, titleRu},{new:true})
        return res.json(updatecategory)
    }

    async updatesubcategory(req,res,next){
        const {id, titleUz, titleRu, categoryId} = req.body
        const updatesubcategory = await Subcategory.subcategory.findByIdAndUpdate(id, {titleUz, titleRu, categoryId},{new:true})
        return res.json(updatesubcategory)
    }

    async deletecategory(req,res,next){
        const {id} = req.body      
        const deletecategory = await Category.category.findByIdAndDelete(id)
        return res.json(deletecategory)
    }

    async deletesubcategory(req,res,next){
        const {id} = req.body
        const deletecategory = await Subcategory.subcategory.findByIdAndDelete(id)
        return res.json(deletecategory)
    }
}

module.exports = new CategoryController()