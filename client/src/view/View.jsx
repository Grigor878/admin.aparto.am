import React, { lazy, Suspense } from "react"
import { Loading } from "../components/loading/Loading"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LayoutMain from "../components/layout/LayoutMain"
import LayoutDash from "../admin/components/layout/LayoutDash"
import { useSelector } from "react-redux"
import YandexMap from "../components/yandexMap/YandexMap"
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
const EditProperties = lazy(() => import('../admin/pages/properties/editProperties/EditProperties'))
const Structure = lazy(() => import('../admin/pages/structure/Structure'))
const Users = lazy(() => import('../admin/pages/users/Users'))
const AddUsers = lazy(() => import('../admin/pages/users/pages/AddUsers'))
const EditUsers = lazy(() => import('../admin/pages/users/pages/EditUsers'))
const Configs = lazy(() => import('../admin/pages/configs/Configs'))
const Crm = lazy(() => import('../admin/pages/crm/Crm'))

const View = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)

    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<LayoutMain />}>
                        <Route index element={<Home />} />
                        <Route path="for-rent" element={<Rent />} />
                        <Route path="for-rent/:id" element={<SubRent />} />
                        <Route path="for-sale" element={<Sale />} />
                        <Route path="for-sale/:id" element={<SubSale />} />
                        <Route path="our-services" element={<Services />} />
                        <Route path="contact-us" element={<Contact />} />
                        <Route path="yandex" element={<YandexMap />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route path="/login">
                        <Route index element={isLoggedIn && token ? <Navigate to="/dashboard/properties" /> : <Login />} />
                    </Route>

                    <Route
                        path="/dashboard"
                        element={isLoggedIn && token ? <LayoutDash /> : <Navigate to="/login" />}
                    >
                        <Route index path="properties" element={<Properties />} />
                        <Route path="properties/add" element={<AddProperties />} />
                        <Route path="properties/edit" element={<EditProperties />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="form-structure" element={<Structure />} />
                        <Route path="users" element={<Users />} />
                        <Route path="users/add" element={<AddUsers />} />
                        <Route path="users/edit/:id" element={<EditUsers />} />
                        <Route path="web-configs" element={<Configs />} />
                        <Route path="crm" element={<Crm />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default View