const History = require("../model/model")

class HistoryController{
    async gethistory(req,res,next){
        const {id} = req.params
        const gethistory = await History.history.findById(id)
        return res.json(gethistory)
    }
    
    async getallhistories(req,res,next){
        let {categoryId,user} = req.query
        let histories
        if (!categoryId && !user) {
            histories = await History.history.find().sort({ _id: -1 })
        }
        if (categoryId && !user) {
            histories = await History.history.find({categoryId: categoryId}).sort({ _id: -1 })
        }
        if (!categoryId && user){
            histories = await History.history.find({userId: user}).sort({ _id: -1 })
        }
        if (categoryId && user) {
            histories = await History.history.find({categoryId: categoryId, userId: user}).sort({ _id: -1 })
        }
        return res.json(histories)
    }
}

module.exports = new HistoryController()