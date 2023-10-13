import React, { useContext, useState } from 'react'
import { Context } from '../index'
import {SingIn, registration} from "../http/userApi"
import { observer } from 'mobx-react-lite'
import {useNavigate} from "react-router-dom"
import Header from '../components/Header'

const Auth = observer(() => {
    const [isLogin, setIsLogin] = useState(false)
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const {user} = useContext(Context)
    const history = useNavigate()
    const click = async() =>{
        let data;
        if (isLogin) {
           data = await SingIn(login, password)
        } else {
            data =await registration(login, password)
        }
        user.setUser(data)
        user.setIsAuth(true)
        history("/home")
        window.location.reload()
    }
    return (
        <main>
        <div className='form'>
            <h3>{isLogin ? "Войти" :"Регистрация"}</h3>
            <input placeholder='Введите логин' type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
            <input placeholder='Введите пароль' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className='btns-row'>
                <button className='active-btn' onClick={click}>
                {isLogin ? "Войти" :"Регистрация"}
                </button>
                <button className='btn-not-active' onClick={() => setIsLogin(!isLogin)}>{isLogin ?"Регистрация" :"Войти"}</button>
            </div>
        </div>
        </main>
    )
})

export default Auth