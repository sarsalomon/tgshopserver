const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.get('/',categoryController.getallcategories)
router.get('/subcategory',categoryController.getallsubcategories)
router.post('/add',categoryController.addcategory)
router.post('/addsubcategory',categoryController.addsubcategory)
router.post('/updatecategory',categoryController.updatecategory)
router.post('/updatesubcategory',categoryController.updatesubcategory)
router.post('/deletecategory',categoryController.deletecategory)
router.post('/deletesubcategory',categoryController.deletesubcategory)
router.get('/getcategory/:id',categoryController.getcategory)
router.get('/getsubcategory/:id',categoryController.getsubcategory)

module.exports = router