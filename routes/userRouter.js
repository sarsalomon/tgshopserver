const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.get('/search',userController.getusers)
router.post('/adduser',userController.adduser)
router.get('/',userController.getallusers)
router.post('/deleteuser',userController.deleteuser)
router.get('/getuser/:id',userController.getuser)

module.exports = router