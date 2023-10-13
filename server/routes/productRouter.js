const {Router} = require("express")
const ProductController = require("../controllers/ProductController")
const productRouter = new Router()
const checkRole = require("../middleware/checkRole")
const {upload} = require("../controllers/FileUpload")

productRouter.get("/", ProductController.getAll)
productRouter.get("/:id", ProductController.getById)
productRouter.post("/", checkRole("ADMIN"), ProductController.create)
productRouter.delete("/:id",checkRole("ADMIN"), ProductController.delete)
productRouter.put("/:id", checkRole("ADMIN"), ProductController.update)

module.exports = productRouter