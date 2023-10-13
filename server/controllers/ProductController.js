const {Product} = require("../models/Models")
const path = require("path")
const {v4} = require("uuid")

class ProductController{
    async getAll(req, res){
        let {categoryId, query} = req.query
        let data;
        if(!categoryId && !query){
            data = await Product.find({});
        }
        if(categoryId){
            data = await Product.find({categoryId:categoryId})
        }
        if(query){
            const regex = new RegExp(query, 'i')
            data = await Product.find({name:{$regex:regex}})
        }
        res.send(data);
    }
    async getById(req, res) {
        let {id} = req.params
        let data = await Product.findById(id)
        res.send(data)
    }
    async create(req, res){
        try {
            const {image} = req.files;
            let filename = v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static/images', filename))
            const product = new Product({name:req.body.name, 
                price:req.body.price, image:filename, 
                categoryId:req.body.categoryId})
            await product.save()
            res.json(product)
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }
    async update(req, res){
        const {id} = req.params
        const newProduct = {
            name:req.body.name,
            price:req.body.price,
            categoryId:req.body.categoryId,
            // image:req.body.image,
        }
        if (req.files) {
            const {image} = req.files;
            let filename = v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static/images', filename))
            newProduct.image = filename
        }
        const product = await Product.findOneAndUpdate({_id: id}, newProduct); 
        if(product) res.send(product);
        else res.sendStatus(404)
    }
    async delete(req, res){
        const {id} = req.params;
        // удаляем по id 
        const product = await Product.findByIdAndDelete(id);
        if(product) res.json(product);
        else res.sendStatus(404);
    }
}

module.exports = new ProductController()