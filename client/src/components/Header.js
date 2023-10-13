import React, { useContext, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCoffee, faCartPlus, faUser, faPlusCircle, faUserLock} from "@fortawesome/free-solid-svg-icons"
import { Context } from '../index'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react-lite'
import {useNavigate} from "react-router-dom"



const Header = observer(() => {
    const {user, cart} = useContext(Context)
    const history = useNavigate()
    const logOut = () =>{
        localStorage.setItem("token", "")
        user.setUser({})
        user.setIsAuth(false)
    }
    const [display, setDisplay] = useState(false)
    const NoneOrFlex = () =>{
        if (display) {
            return "menu-list active"
        } 
        return "menu-list"
    }
    function cartClicked(){
        if(user.isAuth){
            history("/cart")
        }
        else{
            history("/auth")
        }
    }
  return (
    <header>
        <div className='logo'>
            <FontAwesomeIcon icon={faCoffee} className='logo-icon'/>
            <span>Food</span>
        </div>
        <div className='menu'>
            <ul className={NoneOrFlex()}>
                <li onClick={() => history("/home")}>
                    Home
                </li>
                <li>
                    About
                </li>
                <li>
                    Popular
                </li>
                <li onClick={() => history("/orders")}>
                    My orders
                </li>
                <li>
                    Order
                </li>
                <li>
                    Blogs
                </li>
            </ul>
        </div>
        <div className='icons'>
            <div className='icons-btn' id='menu-btn' onClick={() => setDisplay(!display)}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <div className='icons-btn' onClick={cartClicked}>
                <div className='cart-items'>{cart.totalCount}</div>
                <FontAwesomeIcon icon={faCartPlus}/>
            </div>  
            {user.isAuth 
                ?<div onClick={logOut} className='icons-btn'>
                    <FontAwesomeIcon icon={faUserLock}/>
                </div>
                :<div onClick={() => history("/auth")} className='icons-btn'>
                    <FontAwesomeIcon icon={faUser}/>
                </div>
            }
            {user.user.role === "ADMIN" &&  
            <div onClick={() => history("/admin")} className='icons-btn'>
                <FontAwesomeIcon icon={faPlusCircle}/>
            </div>}
        </div>
    </header>
  )
})

export default Header