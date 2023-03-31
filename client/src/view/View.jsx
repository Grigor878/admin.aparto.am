import React, { useEffect, lazy } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LayoutMain from "../components/layout/LayoutMain"
import LayoutDash from "../admin/components/layout/LayoutDash"
import { useSelector } from "react-redux"
const Home = lazy(() => import('../pages/home/Home'))
const Rent = lazy(() => import('../pages/rent/Rent'))
const SubRent = lazy(() => import('../pages/rent/subRent/SubRent'))
const Sale = lazy(() => import('../pages/sale/Sale'))
const SubSale = lazy(() => import('../pages/sale/subSale/SubSale'))
const Services = lazy(() => import('../pages/services/Services'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const Login = lazy(() => import('../admin/pages/login/Login'))
const NotFound = lazy(() => import('../pages/404/NotFound'))
const Profile = lazy(() => import('../admin/pages/profile/Profile'))
const Properties = lazy(() => import('../admin/pages/properties/Properties'))
const AddProperties = lazy(() => import('../admin/pages/properties/addProperties/AddProperties'))
const Structure = lazy(() => import('../admin/pages/structure/Structure'))
const Users = lazy(() => import('../admin/pages/users/Users'))
const AddUsers = lazy(() => import('../admin/pages/users/addUsers/AddUsers'))
const Configs = lazy(() => import('../admin/pages/configs/Configs'))
const Crm = lazy(() => import('../admin/pages/crm/Crm'))

const View = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    const auth = localStorage.getItem('auth')
    const { isLoggedIn } = useSelector((state) => state.auth)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<Home />} />
                    <Route path="for-rent" element={<Rent />} />
                    <Route path="for-rent/:id" element={<SubRent />} />
                    <Route path="for-sale" element={<Sale />} />
                    <Route path="for-sale/:id" element={<SubSale />} />
                    <Route path="our-services" element={<Services />} />
                    <Route path="contact-us" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/login">
                    <Route index element={auth || isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                </Route>

                <Route
                    path="/dashboard"
                    element={auth || isLoggedIn ? <LayoutDash /> : <Navigate to="/login" />}
                >
                    <Route index element={<Profile />} />
                    <Route path="properties" element={<Properties />} />
                    <Route path="properties/:id" element={<AddProperties />} />
                    <Route path="form-structure" element={<Structure />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:id" element={<AddUsers />} />
                    <Route path="web-configs" element={<Configs />} />
                    <Route path="crm" element={<Crm />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default View