const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/add',productController.addproduct)
router.post('/updateproduct',productController.updateproduct)
router.post('/deleteproduct',productController.deleteproduct)
router.get('/',productController.getallproducts)
router.get('/getproduct/:id',productController.getproduct)
router.get('/getsubcategory/:id',productController.getallsubcategories)

module.exports = router