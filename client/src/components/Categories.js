import React, {useEffect, useState} from 'react'
import axios from "axios"
import { fetchCategories } from '../http/productApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Categories = (props) => {
    useEffect(() => {
        async function fetch(){
            const data = await fetchCategories()
            setCategories(data)
        }
        fetch()
    }, [])
    const [categories, setCategories] = useState([])
    
  return (
        <div className='categories'>
            <div onClick={props.onAll}>
                Все
            </div>
            {categories.map(el => (
                <div key={el._id} onClick={() => { props.onChoose(el._id)}}>{el.name}</div>
            ))}
        </div>
  )
}

export default Categories