const Router = require('express')
const router = new Router()
const userRouter     = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const memberRouter   = require('./memberRouter')
const productRouter  = require('./productRouter')
const serviceRouter  = require('./serviceRouter')
const orderRouter    = require('./orderRouter')
const settingRouter    = require('./settingRouter')

router.use('/user',userRouter)
router.use('/category',categoryRouter)
router.use('/member',memberRouter)
router.use('/product',productRouter)
router.use('/service',serviceRouter)
router.use('/order',orderRouter)
router.use('/setting',settingRouter)

module.exports = router