import React from 'react'
import { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Product from '../components/Product'
import {observer} from "mobx-react-lite"
import {Searcher} from "../components/Searcher"
import { fetchProducts, fetchProductsByCategory, fetchProductsByName } from '../http/productApi'

export const Home = observer(() => {
    const [products, setProducts] =useState([])
    useEffect(() => {
      fetchAllProducts()
    }, [])
    const fetchAllProducts = async() =>{
      const data = await fetchProducts()
      setProducts(data)
    }
    const filterProductsByName = async(query) =>{
      const data = await fetchProductsByName(query)
      setProducts(data)
    }
    const filterProducts = async(catId) =>{
      const data = await fetchProductsByCategory(catId)
      setProducts(data)
      
    }
    return (
        <main>
          <div className='filter'>
            <Categories onChoose={filterProducts} onAll={fetchAllProducts}/>
            <Searcher onSearch={filterProductsByName}/>
          </div>
          {products.length > 0 
          ?<div className='product-list'>
          {products.map(el => (
            <Product key={el._id} product={el}/>
          ))}
        </div>
          :<div className='nothing'>
            Ничего не найдено
          </div>
          }
        </main>
    )
})