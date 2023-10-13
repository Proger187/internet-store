import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import Spiner from '../components/Spiner'
import { deleteProduct, fetchCategories, getProductById, updateProduct } from '../http/productApi'

const ProductPage = () => {
    const params = useParams()
    const history = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        getProductById(params.id).then(data => {
            setName(data.name)
            setId(data._id)
            setPrice(data.price)
            setSelectedCategory(data.categoryId)
            setFileName(data.image)
        }).finally(()=> setLoading(false))
    },[])
    const [id, setId] = useState("")
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const [fileName, setFileName] = useState("")
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
        if(File !== null){
            formData.append('image', File)
        }
        formData.append('categoryId', SelectedCategory)
        let data = await updateProduct(id, formData)
        history("/home")
    }
    useEffect(() => {
        async function fetch(){
            const data = await fetchCategories()
            setCategories(data)
        }
        fetch()
    }, [])
    if (loading) {
        return (<Spiner/>)
    }
    return (
        <main>
        <div className='form'>
            <h3>Обновление Товара</h3>
            <div className='image'>
                <img src={process.env.REACT_APP_API_URL+'/images/'+fileName}/>
            </div>
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
            <button className='active-btn' onClick={click}>Обновить</button>
        </div>
        </main>
    )
}

export default ProductPage