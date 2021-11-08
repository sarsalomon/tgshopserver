const Router = require('express')
const orderController = require('../controllers/orderController')
const router = new Router()

router.post('/add',orderController.addorder)
router.post('/updateorder',orderController.updateorder)
router.get('/',orderController.getallorders)
router.get('/del',orderController.deleteorder)
router.get('/getorder/:id',orderController.getorder)
router.get('/getcategory/:id',orderController.getcategory)
router.get('/getproduct/:id',orderController.getproduct)
router.get('/getuser/:id',orderController.getuser)
router.get('/getmember/:id',orderController.getmember)
router.post('/deleteorder',orderController.deleteorder)

module.exports = router