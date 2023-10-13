import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Modal from '../components/Modal'
import { createCategory, createProduct, fetchCategories, getAllOrders } from '../http/productApi'

const NewCategory =(props) =>{
    const [value, setValue] = useState()
    const history = useNavigate()
    const Click = async() =>{
        let data = await createCategory(value)
        history("/home")
    }
    return (
        <div className='new-category'>
            <h3>Новая категория</h3>
            <input placeholder='Введите название категории' value={value} onChange={(e) => setValue(e.target.value)}/>
            <button className='active-btn' onClick={Click}>Добавить</button>
        </div>
    )
}
const NewProduct = (props) =>{
    const history = useNavigate()
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const [File, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const [SelectedCategory, setSelectedCategory] = useState("")
    const selectFile = e => {
        setFile(e.target.files[0]);
      }
    const click = async() =>{
        const formData = new FormData()
        formData.append('name', Name)
        formData.append('price', `${Price}`)
        formData.append('image', File)
        formData.append('categoryId', SelectedCategory)
        let data = await createProduct(formData)
        history("/home")
    }
    useEffect(() => {
        async function fetch(){
            const data = await fetchCategories()
            setCategories(data)
        }
        fetch()
    }, [])
    
    return (
        <div className='new-product'>
            <h3>Новый товар</h3>
            <input value={Name}
                type="text"
                placeholder="Название" 
                onChange={(e) => setName(e.target.value)}/>
            <input value={Price}
                type="number"
                placeholder="Ценна"
                onChange={(e) => setPrice(e.target.value)}/>
            <input type="file" 
                onChange={selectFile} 
                placeholder='Прикрепите фото устройства'/>
            <select value={SelectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(el =>(
                    <option key={el._id} value={el._id}>{el.name}</option>
                ))}
            </select>
            <button className='active-btn' onClick={click}>Добавить</button>
        </div>
    )
}

const AddForm = () =>{
    const [isCategory, setIsCategory] = useState(true)
    return (
            <div className="form">
            <div className='main'>
                {isCategory 
                ?<NewCategory/>
                :<NewProduct/>
                }
                <button className='btn-not-active' onClick={() => setIsCategory(!isCategory)}>
                    {isCategory
                    ?"Новый Товар"
                    :"Новая Категория"
                    }
                </button>
            </div>
        </div>
    )
}

const Admin = () => {
    const [displayForm, setDisplayForm] = useState(false)
    const history = useNavigate()
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        getAllOrders().then(data => setOrders(data.data))
    },[])
    // const [order, setOrder] = useState({})
    // const [displayModal, setDisplayModal] = useState(false)
    return(
        <main>  
        <div>
            {displayForm && <AddForm/>}
            <button className='active-btn' onClick={() => setDisplayForm(!displayForm)}>
                {displayForm
                ?"Закрыть Форму"
                :"Отрыть Форму"}
            </button>
            <button className='btn-not-active' onClick={()=> history("/admin/products")}>Просмотреть Товары</button>
            <div className='admin-products'>
            {orders.map(el => (
                <div key={el._id} className="admin-product-block">
                    <div>{el.userData.fullName}</div>
                    <div>{el.createdAt}</div>
                    <div className='btns-group'>
                        <button className='primary-btn' onClick={() => history(`/admin/order/${el._id}`)}>Открыть</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
        </main>
    )
}

export default Admin