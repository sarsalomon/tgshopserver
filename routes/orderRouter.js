const Router = require('express')
const orderController = require('../controllers/orderController')
const router = new Router()

router.post('/add',orderController.addorder)
router.post('/updateorder',orderController.updateorder)
router.get('/',orderController.getallorders)
router.get('/del',orderController.deleteorder)
router.get('/getorder/:id',orderController.getorder)

module.exports = router