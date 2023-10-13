import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { Context } from '..'
import CartProduct from '../components/CartProduct';
import { newOrder } from '../http/productApi';

const ShowNothing =() =>{
    return(
        <div className='nothing'>
            Корзина пустая
          </div>
    )
}

const CartPage = observer(() => {
    const {cart, user} = useContext(Context)
    let summ = 0
    cart.products.forEach(el => {
        summ += el.count*Number.parseFloat(el.price)
    });
    const history = useNavigate()
    const [address,setAddress] = useState("")
    const [number,setNumber] = useState("+996")
    const [name,setName] = useState("")
    const [products, setProducts] = useState(cart.products)
    // const [products, setProducts] = useState(cart.products)
    const deleteProduct = (id) =>{
        // setProducts(products.filter(el => el._id !== id))
        cart.deleteProduct(id)
        cart.saveCart()
        setProducts(cart.products)
    }
    const OrderHandle = async() =>{
        let order = {
            products:products,
            price:summ,
            address:address,
            userData:{
                fullName:name,
                phoneNumber:number
            },
            userId:user.user._id
        }
        if(summ > 0 && address!=""){
            let data = await newOrder(order)
            if(data.status === 200){
                cart.clearCart()
                history("/home")
            }else{
                alert("Заказ не отправлен")
            }
        }else{
            alert("Заказ не Может быть отправлен, так как вы что-то не указали")
        }
    }
    const ProductDecrease =(id) =>{
        // const existing = products.find(el => el._id === id)
        // existing.count -= 1
        // setProducts(products.map(el => el._id !== id ?el :existing))
        cart.productDecrease(id)
        cart.saveCart()
        setProducts(cart.products)
    }
    const ProductIncrease = (product) =>{
        cart.addNewProduct(product)
        cart.saveCart()
        setProducts(cart.products)
    }
  return (
    <main>
        <div className='form' style={{width:"90%"}}>
        <input required style={{margin:30}} type="text" placeholder='Ваш Адресс' value={address} onChange={e => setAddress(e.target.value)}/>
        <input required style={{margin:30}} type="tel" placeholder='Ваш Номер' value={number} onChange={e => setNumber(e.target.value)}/>
        <input required style={{margin:30}} type="text" placeholder='ФИО' value={name} onChange={e => setName(e.target.value)}/>
            {products.length > 0 ?
                    products.map(el => (
                        <CartProduct onIncrease={ProductIncrease} onDecrease={ProductDecrease} onDelete={deleteProduct} key={el._id} product={el}/>
                    ))
            :<ShowNothing/>
            }
            <b>
                Общая Сумма: {summ} сом
            </b>
            <button onClick={OrderHandle} className='active-btn' style={{margin:30}}>Заказать</button>
        </div>
    </main>
  ) 
})

export default CartPage