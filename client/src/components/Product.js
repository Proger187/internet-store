import React, { useContext } from 'react'
import { Context } from '..'
import {useNavigate} from "react-router-dom"

const Product = ({product}) => {
  const {cart, user} = useContext(Context)
  const history = useNavigate()
  function addTocart () {
    if(user.isAuth){
      cart.addNewProduct(product)
      cart.saveCart()
    }else{
      history("/auth")
    }
  }
  return (
    <div className='product-block'>
            <div className='image'>
              <img src={process.env.REACT_APP_API_URL+'/images/'+product.image}/>
            </div>
            <h3>{product.name}</h3>
            <div className='price-block'>
              <b>{ product.price}сом</b>
              <button className='active-btn' onClick={addTocart}>В корзину</button>
            </div>
        </div>
  )
}

export default Product