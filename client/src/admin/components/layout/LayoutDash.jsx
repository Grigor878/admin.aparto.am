import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../../../components/loading/Loading'
import AutoScroll from '../../../helpers/autoScroll'
import Sidebar from '../sidebar/Sidebar'

const LayoutDash = () => {
    return (
        <div className='dashboard__layout'>
            <Sidebar />
            <AutoScroll />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense >
        </div>
    )
}

export default LayoutDash