import { check } from './http/userApi'
import { Context } from '.'
import { useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header'
import AppRouter from './components/AppRouter'
import {observer} from "mobx-react-lite"
import Spiner from './components/Spiner'


const App = observer(() =>{
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() =>{
      check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      }).finally(()=>setLoading(false))  
    } ,1000)
  }, [])
  if(loading){
    return (
      <Spiner/>
  )
  }
  return (
    <div className='App'>
        <Router>
          <Header/>
          <AppRouter/>
        </Router>
    </div>
  )
})

export default App
