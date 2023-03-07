import React, { useEffect, lazy } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LayoutMain from "../components/layout/LayoutMain"
import LayoutDash from "../admin/components/layout/LayoutDash"
const Home = lazy(() => import('../pages/home/Home'))
const Rent = lazy(() => import('../pages/rent/Rent'))
const SubRent = lazy(() => import('../pages/rent/subRent/SubRent'))
const Sale = lazy(() => import('../pages/sale/Sale'))
const SubSale = lazy(() => import('../pages/sale/subSale/SubSale'))
const Services = lazy(() => import('../pages/services/Services'))
const Contact = lazy(() => import('../pages/contact/Contact'))
const Login = lazy(() => import('./login/Login'))
const NotFound = lazy(() => import('../pages/404/NotFound'))
const Properties = lazy(() => import('../admin/pages/properties/Properties'))
const SubProperties = lazy(() => import('../admin/pages/properties/subProperties/SubProperties'))
const Structure = lazy(() => import('../admin/pages/structure/Structure'))
const Users = lazy(() => import('../admin/pages/users/Users'))
const Website = lazy(() => import('../admin/pages/website/Website'))

const View = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    let auth = { 'token': true }

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
                    <Route index element={<Login />} />
                </Route>

                <Route
                    path="/dashboard"
                    element={auth.token ? <LayoutDash /> : <Navigate to="/login" />}
                >
                    <Route index path="properties" element={<Properties />} />
                    <Route path="properties/:id" element={<SubProperties />} />
                    <Route path="form-structure" element={<Structure />} />
                    <Route path="users" element={<Users />} />
                    <Route path="website" element={<Website />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default View