const { ratingServiceSendMessage } = require("../bot/tg");
const Order = require("../model/model")
const Category = require("../model/model")
const Product = require("../model/model")
const Member = require("../model/model")
const User = require("../model/model")

class OrderController{
    async addorder(req,res,next){
        const {memberId, serviceId, status} = req.body
        const order = await Order.order.create({memberId, serviceId, status});
        return res.json(order) 
    }
    
    async getorder(req,res,next){
        const {id} = req.params
        const getorder = await Order.order.findById(id)
        return res.json(getorder)
    }
    
    async getallorders(req,res,next){
        let {categoryId,user,status} = req.query
        let orders
        if (!categoryId && !user && !status) {
            orders = await Order.order.find().sort({ _id: -1 })
        }
        if (categoryId && !user && !status) {
            orders = await Order.order.find({categoryId: categoryId}).sort({ _id: -1 })
        }
        if (categoryId && user && !status) {
            orders = await Order.order.find({categoryId: categoryId, userId: user}).sort({ _id: -1 })
        }
        if (categoryId && user && status) {
            orders = await Order.order.find({categoryId: categoryId, userId: user, status: status}).sort({ _id: -1 })
        }
        return res.json(orders)

    }
    
    async updateorder(req,res,next){
        const {id, productId, chatId, status} = req.body
        const updateproduct = await Order.order.findByIdAndUpdate(id, {status},{new:true})
        const getmember = await Member.member.findOne({chatId:chatId})
        if(getmember){
            if(status == 4){
                ratingServiceSendMessage(productId, chatId, id, getmember.lang)
            }
            return res.json(updateproduct)
        }
    }

    async deleteorder(req,res,next){
        const deleteproduct = await Order.order.deleteMany()
        return res.json(deleteproduct)
    }
    
    async getcategory(req,res,next){
        const {id} = req.params
        const getcategory = await Category.category.findById(id)
        return res.json(getcategory)
    }
    
    async getproduct(req,res,next){
        const {id} = req.params
        const getproduct = await Product.product.findById(id)
        return res.json(getproduct)
    }
    
    async getuser(req,res,next){
        const {id} = req.params
        const getuser = await User.user.findById(id)
        return res.json(getuser)
    }
        
    async getmember(req,res,next){
        const {id} = req.params
        const getmember = await Member.member.findOne({chatId:id})
        return res.json(getmember)
    }

    async deleteorder(req,res,next){
        const {id} = req.body
        const deleteorder = await Order.order.findByIdAndDelete(id)
        return res.json(deleteorder)
    }
}

module.exports = new OrderController()