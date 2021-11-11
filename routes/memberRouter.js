const Router = require('express')
const memberController = require('../controllers/memberController')
const router = new Router()

router.get('/',memberController.getmembers)
router.post('/del',memberController.deletealluser)
router.post('/message',memberController.deletemessage)

module.exports = router