const { ratingServiceSendMessage } = require("../bot/tg");
const Order = require("../model/model")

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
        let {categoryId,status,subcategoryId,productorservice} = req.query
        let orders
        if (!categoryId && !status && !subcategoryId && !productorservice) {
            orders = await Order.order.find().sort({ _id: -1 })
        }
        if (categoryId && !status && !subcategoryId && !productorservice) {
            orders = await Order.order.find({categoryId: categoryId}).sort({ _id: -1 })
        }
        if (categoryId && status && !subcategoryId && !productorservice) {
            orders = await Order.order.find({categoryId: categoryId, status: status}).sort({ _id: -1 })
        }
        if (categoryId && status && subcategoryId && !productorservice) {
            orders = await Order.order.find({categoryId: categoryId, status: status, subcategoryId: subcategoryId}).sort({ _id: -1 })
        }
        if (!categoryId && status && !subcategoryId && !productorservice) {
            orders = await Order.order.find({status: status}).sort({ _id: -1 })
        }
        if (!categoryId && !status && !subcategoryId && productorservice) {
            orders = await Order.order.find({productorservice: productorservice}).sort({ _id: -1 })
        }
        if (categoryId && status && subcategoryId && productorservice) {
            orders = await Order.order.find({categoryId: categoryId, status: status, subcategoryId: subcategoryId, productorservice: productorservice}).sort({ _id: -1 })
        }
        return res.json(orders)
    }
    
    async updateorder(req,res,next){
        const {id, status, ratingstatus} = req.body
        const updateproduct = await Order.order.findByIdAndUpdate(id, {status},{new:true})
        if(status == 4 && ratingstatus == 0){
            ratingServiceSendMessage('', '718439838', id)
        }
        return res.json(updateproduct)
    }

    async deleteorder(req,res,next){
        const deleteproduct = await Order.order.deleteMany()
        return res.json(deleteproduct)
    }
}

module.exports = new OrderController()