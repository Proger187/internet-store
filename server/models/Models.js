const mongoose = require("../Db")
const Schema = mongoose.Schema
const productScheme = new Schema({
    name:String,
    image:String, 
    price:Number,
    categoryId:String
}, {
    versionKey: false,
    timestamps:true
});

const userScheme = new Schema({
    login:String,
    password:String,
    role:String
}, {    
    timestamps:true
})
const orderScheme = new Schema({
    userId:{type:String, required:true},
    products:{type:Array, required:true},
    price:{type:Number, required:true},
    address:{type:String, required:true},
    userData: {type:Object, required:true},
    accepted:{type:Boolean, required:true}
}, {
    timestamps:true
})

const categoryScheme = new Schema({
    name:String
}, {
    versionKey: false,
    timestamps:true
})

const Category = mongoose.model("Category", categoryScheme)
const User =  mongoose.model("Users", userScheme)
const Product = mongoose.model("Products", productScheme);
const Order = mongoose.model("Orders", orderScheme)

module.exports = {
    Product,
    Category,
    User,
    Order
}