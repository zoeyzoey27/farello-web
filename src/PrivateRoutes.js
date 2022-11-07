import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes = () => {
    let auth = localStorage.getItem('token_admin')
    return(
        auth ? <Outlet/> : <Navigate to="/admin/login"/>
    )
}

export const UserRoutes = () => {
    let userLogged = localStorage.getItem('token')
    return(
        userLogged ? <Outlet/> : <Navigate to="/login"/>
    )
}

export const UnLoggedRoutes = () => {
    let userLogged = localStorage.getItem('token')
    return(
        !userLogged ? <Outlet/> : <Navigate to="/"/>
    )
}