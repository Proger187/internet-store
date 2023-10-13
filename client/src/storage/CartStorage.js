export default class CartStorage{
    constructor(){
        this._products = []
        try {
            let data = JSON.parse(localStorage.getItem("products"))
            if (data) {
                this._products = data
            }
        } catch (error) {
            console.log(error);
        }
    }
    clearCart(){
        localStorage.setItem("products", "")
        this._products = []
    }
    get totalCount(){
        let count = 0;
        this._products.forEach(el => {
            count += el.count
        });
        return count
    }
    saveCart(){
        let data = JSON.stringify(this._products)
        localStorage.setItem("products", data)
    }
    addNewProduct(product){
        const existing = this._products.find(el => el._id === product._id)
        if(existing){
            existing.count += 1
            this._products = this._products.map(el => el._id !== product._id ?el :existing)
        }else{
            const NewProduct = product
            NewProduct.count = 1
            this._products.push(NewProduct)
        }
    }
    productDecrease(id){
        const existing = this._products.find(el => el._id === id)
        if(existing.count >1){
            existing.count -= 1
            this._products = this._products.map(el => el._id !== id ?el :existing)
        }else{
            this._products = this._products.filter(el => el._id !== id)
        }
    }
    deleteProduct(id){
        this._products = this._products.filter(el => el._id !== id)
    }
    get products(){
        return this._products
    }
}