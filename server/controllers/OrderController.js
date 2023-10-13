const {Order} = require("../models/Models")
const bcrypt = require("bcrypt")

class OrderController{
    async getAll(req, res){
        let data = await Order.find({})
        return res.send(data)
    }
    async getByUserId(req, res){
        const id = req.user.id
        let data = await Order.find({userId:id})
        return res.send(data)
    }
    async getOrderById(req, res){
        const {id} = req.params
        let data = await Order.findById(id)
        return res.send(data)
    }
    async CancelOrder(req, res){
        const userId = req.user.id
        const {id} = req.params
        let data = await Order.findById(id)
        if (data.userId !== userId) {
            return res.send({message:"Нет доступа"})
        }
        let respounce = await data.delete() 
        return res.send(respounce)
    }
    async newOrder(req, res){
        const id = req.user.id
        const {products, price, address, userData} = req.body
        let order = new Order({userId:id,price:price, userData:userData, accepted:false, address:address, products:products})
        await order.save()
        return res.send(order)
    }
    async acceptOrder(req, res){
        const {id} = req.params
        console.log(id);
        let data = await Order.findOneAndUpdate({_id: id}, {accepted:true})
        return res.send(data)
    }
}

module.exports = new OrderController()