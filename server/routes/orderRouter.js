const {Router} = require("express")
const OrderController = require("../controllers/OrderController")
const authMiddleware = require("../middleware/authMiddleware")
const orderRouter = new Router()
const checkRole = require("../middleware/checkRole")

orderRouter.get("/", checkRole("ADMIN"), OrderController.getAll)
orderRouter.get("/user/",authMiddleware, OrderController.getByUserId)
orderRouter.post("/",authMiddleware, OrderController.newOrder)
orderRouter.get("/:id", OrderController.getOrderById)
orderRouter.put("/:id", checkRole("ADMIN"), OrderController.acceptOrder)
orderRouter.delete("/:id", authMiddleware, OrderController.CancelOrder)

module.exports = {orderRouter}