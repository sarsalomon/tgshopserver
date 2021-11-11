const Router = require('express')
const historyController = require('../controllers/historyController')
const router = new Router()

router.get('/',historyController.getallhistories)
router.get('/gethistory/:id',historyController.gethistory)

module.exports = router