import React from 'react'
import { Navigate } from 'react-router-dom'
import LayoutDash from '../admin/components/layout/LayoutDash'

const PriviteRoutes = () => {
    let auth = { 'token': false }

    return (
        auth.token ? <LayoutDash /> : <Navigate to="/login" />
    )
}

export default PriviteRoutes