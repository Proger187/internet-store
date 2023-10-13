import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faMinus, faTrash} from "@fortawesome/free-solid-svg-icons"    

const CartProduct = ({product, onDelete, onDecrease, onIncrease}) =>{
    let price = product.count * product.price
  return (
    <div className='order'>
            <div className='image'><img src={process.env.REACT_APP_API_URL+'/images/'+product.image} alt=""/></div>
            <div className='order-content'>
                <h4> {product.name}</h4>
                <div className='order-count'>
                <b>{product.price}сом</b>
                <b>Всего: {price} сом</b>
                  <div className='arrows'>
                    <FontAwesomeIcon className='fa-icon' onClick={() => onIncrease(product)} icon={faPlus}/>
                    <span>{product.count}</span>
                    <FontAwesomeIcon className='fa-icon' onClick={() => onDecrease(product._id)} icon={faMinus}/>
                  </div>
                  <FontAwesomeIcon className='fa-icon' onClick={() => onDelete(product._id)} icon={faTrash}/>
                </div>
            </div>  
        </div>
  )
}

export default CartProduct