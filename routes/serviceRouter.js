const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')

router.post('/add',serviceController.addservice)
router.post('/updateservice',serviceController.updateservice)
router.post('/deleteservicet',serviceController.deleteservice)
router.get('/',serviceController.getallservices)
router.get('/getservice/:id',serviceController.getservice)

module.exports = router