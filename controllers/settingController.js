const ApiError = require("../error/ApiError")
const Appsetting  = require("../model/model")

class SettingController{
    async updatesetting(req,res,next){
        const {percent} = req.body
        let id = '61668f225971c93c410bf10b'
        if(!percent){
            return next(ApiError.badRequest('Foiz berilmagan'))
        }
        const setting = await Appsetting.appsetting.findByIdAndUpdate(id, {percent},{new:true})
        return res.json(setting)
    }

    async getsetting(req,res,next){
        let id = '61668f225971c93c410bf10b'
        const getsetting = await Appsetting.appsetting.findById(id)
        return res.json(getsetting)
    }
}

module.exports = new SettingController()