import React, { lazy, Suspense } from "react"
import pMinDelay from 'p-min-delay';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LayoutMain from "../components/layout/LayoutMain"
import LayoutDash from "../admin/components/layout/LayoutDash"
import {  useSelector } from "react-redux"
import AutoScroll from "../helpers/autoScroll"

const Home = lazy(() => pMinDelay(import('../pages/home/Home'), 1000))
const Result = lazy(() => import('../pages/result/Result'))
const ResultById = lazy(() => pMinDelay(import('../pages/result/ResultById'), 500))

const NotFound = lazy(() => import('../pages/404/NotFound'))

const Login = lazy(() => import('../admin/pages/login/Login'))
const Properties = lazy(() => import('../admin/pages/properties/Properties'))
const Profile = lazy(() => import('../admin/pages/profile/Profile'))
const SingleProperty = lazy(() => pMinDelay(import('../admin/pages/properties/pages/SingleProperty'), 500))
const AddProperties = lazy(() => import('../admin/pages/properties/pages/AddProperties'))
const EditProperties = lazy(() => pMinDelay(import('../admin/pages/properties/pages/EditProperties'), 500))
const Structure = lazy(() => import('../admin/pages/structure/Structure'))
const Users = lazy(() => import('../admin/pages/users/Users'))
const AddUsers = lazy(() => import('../admin/pages/users/pages/AddUsers'))
const EditUsers = lazy(() => pMinDelay(import('../admin/pages/users/pages/EditUsers'), 500))
const Configs = lazy(() => import('../admin/pages/configs/Configs'))
const Crm = lazy(() => import('../admin/pages/crm/Crm'))
const AddClient = lazy(() => import('../admin/pages/crm/pages/AddClient'))
const EditClient = lazy(() => import('../admin/pages/crm/pages/EditClient'))

const View = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)
    const { userGlobal } = useSelector((state => state?.userGlobal))
    
    const authCheck = isLoggedIn && (localStorage.getItem("token") === token)

    return (
        <Router>
            <Suspense fallback={null}>
                <AutoScroll />
                <Routes>
                    <Route path="/" element={<LayoutMain />}>
                        <Route index element={<Home />} />
                        <Route path="result" element={<Result />} />
                        <Route path="result/:id" element={<ResultById />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route path="/login">
                        <Route index element={authCheck ? <Navigate to="/dashboard/properties" /> : <Login />} />
                    </Route>

                    <Route
                        path="/dashboard"
                        element={authCheck ? <LayoutDash /> : <Navigate to="/login" />}
                    >
                        <Route index path="properties" element={<Properties />} />
                        <Route path="properties/:id" element={<SingleProperty />} />
                        <Route path="properties/add" element={<AddProperties />} />
                        <Route path="properties/edit/:id" element={<EditProperties />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="users" element={<Users />} />
                        <Route path="users/add" element={userGlobal?.role === "admin" ? <AddUsers /> : <Navigate to="/dashboard/users" />} />
                        <Route path="users/edit/:id" element={userGlobal?.role === "admin" ? <EditUsers /> : <Navigate to="/dashboard/users" />} />
                        <Route path="crm" element={<Crm />} />
                        <Route path="crm/add" element={<AddClient />} />
                        <Route path="crm/edit/:id" element={<EditClient />} />
                        {userGlobal?.role === "admin"
                            ? <>
                                <Route path="form-structure" element={<Structure />} />
                                <Route path="web-configs" element={<Configs />} />
                            </>
                            : null}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default View