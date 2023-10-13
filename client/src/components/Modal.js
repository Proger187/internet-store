import React, { useState } from 'react'

const Modal = (props) => {
    const {order} = props
    return (
      <div>

          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <span className="close-modal" onClick={props.onClose}>
                &times;
              </span>
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
                        <div className='order'>
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
                        Общая стоимость: {order.price} сом
                    </div>
                </div>
                </div>
            </div>
          </div>
        
      </div>
    );
}

export default Modal