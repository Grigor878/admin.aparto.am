import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import AutoScroll from '../../../helpers/autoScroll'
import HelmetAdmin from '../../../components/helmetAsync/HelmetAdmin'
import { Loading } from '../../../components/loading/Loading'
import { useDispatch } from 'react-redux'
import { getUserGlobal } from '../../../store/slices/userGlobalSlice'
import { getUsers } from '../../../store/slices/usersSlice'
// import baseApi from '../../../apis/baseApi'
// import { GetAxiosConfig } from '../../../apis/config'

const LayoutDash = () => {
    let location = useLocation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserGlobal())
        dispatch(getUsers())
    }, [dispatch])

    if (location.pathname === '/dashboard') {
        return <Navigate replace to='/dashboard/properties' />
    }


    return (
        <div className='dashboard__layout'>
            <Sidebar />
            <AutoScroll />
            <HelmetAdmin />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense >
        </div>
    )
}

export default LayoutDash