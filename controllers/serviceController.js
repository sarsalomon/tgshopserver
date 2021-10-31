const uuid = require('uuid')
const path = require('path');
const Service  = require("../model/model");
const ApiError = require('../error/ApiError');

class ServiceController{
    async addservice(req,res,next){
            const {titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu} = req.body
            const {img} = req.files
            if(titleUz === ''){
                return next(ApiError.badRequest('Что то пустое titleUz'))
            }else if(titleRu === ''){
                return next(ApiError.badRequest('Что то пустое titleRu'))
            }else if(price === ''){
                return next(ApiError.badRequest('Что то пустое price'))
            }else if(categoryId === ''){
                return next(ApiError.badRequest('Что то пустое categoryId'))
            }else if(subcategoryId === ''){
                return next(ApiError.badRequest('Что то пустое subcategoryId'))
            }else if(descriptionUz === ''){
                return next(ApiError.badRequest('Что то пустое descriptionUz'))
            }else if(descriptionRu === ''){
                return next(ApiError.badRequest('Что то пустое descriptionRu'))
            }else{
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const service = await Service.service.create({titleUz,titleRu, price, categoryId, subcategoryId, img: fileName,  descriptionUz, descriptionRu});
            return res.json(service)
        }
    }

    async getservice(req,res,next){
        const {id} = req.params
        const getservice = await Service.service.findById(id)
        return res.json(getservice)
    }

    async getallservices(req,res,next){
        const services = await Service.service.find().sort({ _id: -1 })
        return res.json(services)
    }
    
    async updateservice(req,res,next){
        const {id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz,descriptionRu} = req.body
        const updateservice = await Service.service.findByIdAndUpdate(id, {titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz,descriptionRu},{new:true})
        return res.json(updateservice)
    }

    async deleteservice(req,res,next){
        const {id} = req.body
        const deleteservice = await Service.service.findByIdAndDelete(id)
        return res.json(deleteservice)
    }
}

module.exports = new ServiceController()