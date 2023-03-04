import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import Sidebar from '../components/sidebar/Sidebar'
import AutoScroll from '../../helpers/autoScroll'

const LayoutDash = () => {
    return (
        <>
            <Sidebar />
            <AutoScroll />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense >
        </>
    )
}

export default LayoutDash