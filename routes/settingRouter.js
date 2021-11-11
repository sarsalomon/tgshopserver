const Router = require('express')
const settingController = require('../controllers/settingController')
const router = new Router()

router.post('/appupdate',settingController.updatesetting)
router.get('/',settingController.getsetting)

module.exports = router