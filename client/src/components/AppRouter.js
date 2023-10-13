import React, { useContext } from 'react'
import { Context } from '..'
import {Route, Routes, Navigate} from "react-router-dom"
import { adminRoutes, authRoutes, publicRoutes } from '../routes'


const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.user.role === "ADMIN" && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {(user.isAuth && user.user.role !== "ADMIN") && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to ="/home" />}/>
        </Routes>
    )
}
export default AppRouter