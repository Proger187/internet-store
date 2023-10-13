import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import Spiner from '../components/Spiner'
import { getMyOrders } from '../http/productApi'

const MyOrders = () => {
    const {user} = useContext(Context)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      getMyOrders().then(data =>setOrders(data.data)).finally(()=>setLoading(false))
    },[])
    if (loading) {
      return (<Spiner/>)
    }
  return (
    <main>
      {orders.map(el =>(
          <div key={el._id}>
            {el._id}
          </div>
        ))
      }
    </main>
  )
}

export default MyOrders