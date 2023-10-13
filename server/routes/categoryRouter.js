const {Router} = require("express")
const categoryRouter = new Router()
const CategoryController = require("../controllers/CategoryController")
const checkRole = require("../middleware/checkRole")

categoryRouter.get('/', CategoryController.getAll)
categoryRouter.post('/', checkRole("ADMIN"), CategoryController.create)
categoryRouter.delete("/:id", checkRole("ADMIN"), CategoryController.delete)

module.exports ={
    categoryRouter
}
