import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import AutoScroll from '../../../helpers/autoScroll'
import HelmetAdmin from '../../../components/helmetAsync/HelmetAdmin'
import Loading from '../../../components/loading/Loading'

const LayoutDash = () => {
    return (
        <div className='dashboard__layout'>
            <Sidebar />
            <AutoScroll />
            <HelmetAdmin/>
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense >
        </div>
    )
}

export default LayoutDash

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// const LayoutDash = () => {
//     const [authenticated, setauthenticated] = useState(null);
//     useEffect(() => {
//         const loggedInUser = localStorage.getItem("auth");
//         if (loggedInUser) {
//             setauthenticated(loggedInUser);
//         }
//     }, []);

//     if (!authenticated) {
//         return <Navigate replace to="/login" />;
//     } else {
//         return (
//             <div>
//                 <p>Welcome to your Dashboard</p>
//             </div>
//         );
//     }
// };

// export default LayoutDash;