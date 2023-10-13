import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { deleteProduct, fetchProducts } from '../http/productApi'

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        fetchProducts().then(data =>{ setProducts(data)})
    }, [])
    const history = useNavigate()
    const openProduct =(id) =>{
        history(`/product-update/${id}`)
    }
    const deleteClicked = async(id) =>{
        let data = await deleteProduct(id)
        history("/home")
    }
    return(
        <main>  
        <div>
            <div className='admin-products'>
            {products.map(el => (
                <div key={el._id} className="admin-product-block">
                    <div>{el.name}</div>
                    <div className='btns-group'>
                        <button className='danger-btn' onClick={() => deleteClicked(el._id)}>Удалить</button>
                        <button className='primary-btn' onClick={() => openProduct(el._id)}>Открыть</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
        </main>
    )
}


export default AdminProducts