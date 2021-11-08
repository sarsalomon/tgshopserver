const ApiError = require("../error/ApiError")
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')
const User     = require('../model/model')

const SECRET_KEY = process.env.SECRET_KEY

const generatorjwt = (id, login, role) =>{
    return jwt.sign(
        {id,login,role},
        SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class UserController {
    async registration(req,res,next){
        const {login, password, role, fish, phone} = req.body
      
        if(!login || !password){
            return next(ApiError.badRequest('Nekoretniy email ili passwordd'))
        }
        const condidate = await User.user.findOne({login:login})
        if(condidate){
            return next(ApiError.badRequest('Polzivatel uje est'))
        }
        // if(fish == condidate.fish){
        //     return next(ApiError.badRequest('Polzivatel uje sest'))
        // }

        const hashPassword = await bcrypt.hash(password,5)
        
        const user = await User.user.create({login, password:hashPassword, role, fish, phone})
        const token = generatorjwt(user.id,user.login,user.role)
        return res.json({token})    
    }

    async login(req,res,next){
        const {login,password} = req.body
        const user = await User.user.findOne({login:login})
        if(!user){
            return next(ApiError.internal('Polzivatel ne nayden'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Ne verniy parol'))
        }
        const token = generatorjwt(user.id, user.login, user.role)
        return res.json({token})    
    }

    async check(req,res,next){
        const token = generatorjwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
    
    async adduser(req,res,next){
        const {login, password, categoryId, fish, phone, role} = req.body
        console.log(req.body)
        const user = await User.user.create({login, password, role, fish, categoryId, phone});
        return res.json(user)
    }

    async getuser(req,res,next){
        const {id} = req.params
        const getuser = await User.user.findById(id)
        return res.json(getuser)
    }
    
    async getallusers(req,res,next){
        // let {categoryId, subcategoryId} = req.query
        // console.log(req.query)
        // let users
        // if(!categoryId && !subcategoryId){
        //     users = await User.user.find().sort({ _id: -1 })
        // }else if(categoryId && !subcategoryId){
        //     users = await User.user.find({categoryId: categoryId}).sort({ _id: -1 })
        // }else if(!categoryId && subcategoryId){
        //     users = await User.user.find({subcategoryId: subcategoryId}).sort({ _id: -1 })
        // }else if(categoryId && subcategoryId){
        //     users = await User.user.find({categoryId: categoryId, subcategoryId: subcategoryId}).sort({ _id: -1 })
        // }
        // return res.json(users)
        let {categoryId} = req.query
        let users
        if(!categoryId){
            users = await User.user.find().sort({ _id: -1 })
        }else if(categoryId){
            users = await User.user.find({categoryId: categoryId}).sort({ _id: -1 })
        }
        return res.json(users)
    }
    
    async getusers(req,res,next){
        let {categoryId, subcategoryId} = req.query
        const users = await User.user.find({categoryId: categoryId, subcategoryId: subcategoryId}).sort({ _id: -1 })
        return res.json(users)
    }

    async updateuser(req,res,next){
        const {id, titleUz, titleRu, price, categoryId, subcategoryId, userId, descriptionUz,descriptionRu} = req.body
        const updateuser = await User.user.findByIdAndUpdate(id, {titleUz, titleRu, price, categoryId, subcategoryId, userId, descriptionUz,descriptionRu},{new:true})
        return res.json(updateuser)
    }

    async deleteuser(req,res,next){
        const {id} = req.body
        const deleteuser = await User.user.findByIdAndDelete(id)
        return res.json(deleteuser)
    }
}

module.exports = new UserController()