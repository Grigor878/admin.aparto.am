import React, { lazy, Suspense } from "react"
import pMinDelay from 'p-min-delay';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LayoutMain from "../components/layout/LayoutMain"
import LayoutDash from "../admin/components/layout/LayoutDash"
import { useSelector } from "react-redux"
import AutoScroll from "../helpers/autoScroll"

const Home = lazy(() => pMinDelay(import('../pages/home/Home'),1500))
const Result = lazy(() => pMinDelay(import('../pages/result/Result'),500))
const ResultById = lazy(() => pMinDelay(import('../pages/result/ResultById'),500))

const NotFound = lazy(() => pMinDelay(import('../pages/404/NotFound'),500))

const Login = lazy(() => pMinDelay(import('../admin/pages/login/Login'),500))
const Profile = lazy(() => pMinDelay(import('../admin/pages/profile/Profile'),500))
const Properties = lazy(() => pMinDelay(import('../admin/pages/properties/Properties'),500))
const SingleProperty = lazy(() => pMinDelay(import('../admin/pages/properties/pages/SingleProperty'),500))
const AddProperties = lazy(() => pMinDelay(import('../admin/pages/properties/pages/AddProperties'),500))
const EditProperties = lazy(() => pMinDelay(import('../admin/pages/properties/pages/EditProperties'),500))
const Structure = lazy(() => pMinDelay(import('../admin/pages/structure/Structure'),500))
const Users = lazy(() => pMinDelay(import('../admin/pages/users/Users'),500))
const AddUsers = lazy(() => pMinDelay(import('../admin/pages/users/pages/AddUsers'),500))
const EditUsers = lazy(() => pMinDelay(import('../admin/pages/users/pages/EditUsers'),500))
const Configs = lazy(() => pMinDelay(import('../admin/pages/configs/Configs'),500))
const Crm = lazy(() => pMinDelay(import('../admin/pages/crm/Crm'),500))

const View = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth)
    const { role } = useSelector((state => state.userGlobal.userGlobal))

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
                        <Route index element={isLoggedIn && token ? <Navigate to="/dashboard/properties" /> : <Login />} />
                    </Route>

                    <Route
                        path="/dashboard"
                        element={isLoggedIn && token ? <LayoutDash /> : <Navigate to="/login" />}
                    >
                        <Route index path="properties" element={<Properties />} />
                        <Route path="properties/:id" element={<SingleProperty />} />
                        <Route path="properties/add" element={<AddProperties />} />
                        <Route path="properties/edit/:id" element={<EditProperties />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="users" element={<Users />} />
                        <Route path="users/add" element={role === "admin" ? <AddUsers /> : <Navigate to="/dashboard/users" />} />
                        <Route path="users/edit/:id" element={role === "admin" ? <EditUsers /> : <Navigate to="/dashboard/users" />} />
                        {role === "admin"
                            ? <>
                                <Route path="form-structure" element={<Structure />} />
                                <Route path="web-configs" element={<Configs />} />
                                <Route path="crm" element={<Crm />} />
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