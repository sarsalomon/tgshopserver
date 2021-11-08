const ApiError = require("../error/ApiError")
const Appsetting  = require("../model/model")

class SettingController{
    async updatesetting(req,res,next){
        const {percent,phone} = req.body
        let id = '61830efe8115721cf71666de'
        if(!percent){
            return next(ApiError.badRequest('Foiz berilmagan'))
        }
        const setting = await Appsetting.appsetting.findByIdAndUpdate(id, {percent,phone},{new:true})
        return res.json(setting)
    }

    async getsetting(req,res,next){
        let id = '61830efe8115721cf71666de'
        const getsetting = await Appsetting.appsetting.findById(id)
        return res.json(getsetting)
    }
}

module.exports = new SettingController()