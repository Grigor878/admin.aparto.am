import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import AutoScroll from "../helpers/autoScroll";

const NotFound = lazy(() => import("../pages/404/NotFound"));
const Login = lazy(() => import("../pages/login/Login"));
const Properties = lazy(() => import("../pages/properties/Properties"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const SingleProperty = lazy(() =>
  import("../pages/properties/pages/SingleProperty")
);
const AddProperties = lazy(() =>
  import("../pages/properties/pages/AddProperties")
);
const EditProperties = lazy(() =>
  import("../pages/properties/pages/EditProperties")
);
const Structure = lazy(() => import("../pages/structure/Structure"));
const Users = lazy(() => import("../pages/users/Users"));
const AddUsers = lazy(() => import("../pages/users/pages/AddUsers"));
const EditUsers = lazy(() =>
  import("../pages/users/pages/EditUsers")
);
const Configs = lazy(() => import("../pages/configs/Configs"));
const Crm = lazy(() => import("../pages/crm/Crm"));
const AddClient = lazy(() => import("../pages/crm/pages/AddClient"));
const EditClient = lazy(() => import("../pages/crm/pages/EditClient"));

const View = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const { userGlobal } = useSelector((state) => state?.userGlobal);
  const { pathname } = useLocation()

  const authCheck = isLoggedIn && localStorage.getItem("token") === token;

  const navigate = useNavigate()

  useEffect(() => {
    pathname?.includes("/login") && navigate('/')
  }, [pathname, navigate])

  return (
    <Suspense fallback={null}>
      <AutoScroll />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              authCheck ? <Navigate to="/dashboard/properties" /> : <Login />
            }
          />
        </Route>

        <Route
          path="/dashboard"
          element={authCheck ? <Layout /> : <Navigate to="/" />}
        >
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<SingleProperty />} />
          <Route path="properties/add" element={<AddProperties />} />
          <Route path="properties/edit/:id" element={<EditProperties />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route
            path="users/add"
            element={
              userGlobal?.role === "admin" ? (
                <AddUsers />
              ) : (
                <Navigate to="/dashboard/users" />
              )
            }
          />
          <Route
            path="users/edit/:id"
            element={
              userGlobal?.role === "admin" ? (
                <EditUsers />
              ) : (
                <Navigate to="/dashboard/users" />
              )
            }
          />
          <Route path="crm" element={<Crm />} />
          <Route path="crm/add" element={<AddClient />} />
          <Route path="crm/edit/:id" element={<EditClient />} />
          {userGlobal?.role === "admin" ? (
            <>
              <Route path="form-structure" element={<Structure />} />
              <Route path="web-configs" element={<Configs />} />
            </>
          ) : null}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default View;
