import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Spiner from "../components/Spiner";
import {acceptOrder} from "../http/productApi"
import { getOrder } from "../http/productApi";

const OrderPage = () => {
    const [order, setOrder] = useState({})
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        getOrder(id).then(data => setOrder(data.data)).finally(() => setLoading(false))
    }, [])
    function accept(){
        acceptOrder(id).then(data => console.log(data))
    }
    if (loading) {
        return(<Spiner/>)
    }
    return (
      <main>
              <div className='form'>
                <div className='order-details'>
                    <div className='order-detail'>
                       ФИО: {order.userData.fullName}
                    </div>
                    <div className='order-detail'>
                       Номер телефона: {order.userData.phoneNumber}
                    </div>
                    <div className='order-detail'>
                       Адресс: {order.address}
                    </div>
                    {order.products.map(product =>(
                        <div className='order' key={product}>
                            <div className='image'><img src={process.env.REACT_APP_API_URL+'/images/'+product.image} alt=""/></div>
                            <div className='order-content'>
                                <h4> {product.name}</h4>
                                <div className='order-count'>
                                    <b>{product.count} шт.</b>
                                    <b>{product.price}сом</b>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='order-detail'>
                        Заказ {order.accepted ?"Принят" :"Не принят"}
                    </div>
                    <div className='order-detail'>
                        Общая стоимость: {order.price} сом
                    </div>
                    {!order.accepted && <button className="active-btn" onClick={accept}>Принять</button>}
                </div>
                </div>
      </main>
    );
}

export default OrderPage