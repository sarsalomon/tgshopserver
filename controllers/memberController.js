const Member = require("../model/model")

class MemberController{
    async getmembers(req,res,next){
        const members = await Member.member.find().sort({ _id: -1 })
        return res.json(members)
    }
    async deletealluser(req,res,next){
        const condidate = await Member.member.deleteMany()
        return res.json(condidate)
    }
    async deletemessage(req,res,next){
        const condidate = await Member.member.deleteMany()
        return res.json(condidate)
    }
}

module.exports = new MemberController()