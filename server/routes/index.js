const {Router} = require("express")
const productRouter = require("./productRouter")
const {categoryRouter} = require("./categoryRouter")
const {userRouter} = require("./userRouter")
const {orderRouter} = require("./orderRouter")
const router = new Router()

router.use("/user", userRouter)
router.use("/order", orderRouter)
router.use("/products", productRouter)
router.use("/categories", categoryRouter)

module.exports = {router}