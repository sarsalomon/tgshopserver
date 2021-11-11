const ApiError = require("../error/ApiError")
const Appsetting  = require("../model/model")

class SettingController{
    async updatesetting(req,res,next){
        const {percent,phone} = req.body
        const APPID = process.env.SETTING_ID
        if(!percent){
            return next(ApiError.badRequest('Foiz berilmagan'))
        }
        const setting = await Appsetting.appsetting.findByIdAndUpdate(APPID, {percent,phone},{new:true})
        return res.json(setting)
    }

    async getsetting(req,res,next){
        const APPID = process.env.SETTING_ID
        const getsetting = await Appsetting.appsetting.findById(APPID)
        return res.json(getsetting)
    }
}

module.exports = new SettingController()