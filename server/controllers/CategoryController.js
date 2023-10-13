const {Category} = require("../models/Models")

class CategoryController{
    async getAll(req, res) {
        const data = await Category.find({});
        res.send(data);
    }
    async create(req, res){
        try {
            console.log(req.body);
            const category = new Category({name:req.body.name, })
            await category.save()
            res.json(category)
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }
    async delete(req, res){
        const {id} = req.params;
        // удаляем по id 
        const category = await Category.findByIdAndDelete(id);
        if(category) res.send(category);
        else res.sendStatus(404);
    }
}

module.exports = new CategoryController()