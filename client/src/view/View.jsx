import React, { lazy, Suspense, useEffect } from "react";
import pMinDelay from "p-min-delay";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import LayoutDash from "../admin/components/layout/LayoutDash";
import { useSelector } from "react-redux";
import AutoScroll from "../helpers/autoScroll";

const NotFound = lazy(() => import("../pages/404/NotFound"));

const Login = lazy(() => import("../admin/pages/login/Login"));
const Properties = lazy(() => import("../admin/pages/properties/Properties"));
const Profile = lazy(() => import("../admin/pages/profile/Profile"));
const SingleProperty = lazy(() =>
  pMinDelay(import("../admin/pages/properties/pages/SingleProperty"), 500)
);
const AddProperties = lazy(() =>
  import("../admin/pages/properties/pages/AddProperties")
);
const EditProperties = lazy(() =>
  pMinDelay(import("../admin/pages/properties/pages/EditProperties"), 500)
);
const Structure = lazy(() => import("../admin/pages/structure/Structure"));
const Users = lazy(() => import("../admin/pages/users/Users"));
const AddUsers = lazy(() => import("../admin/pages/users/pages/AddUsers"));
const EditUsers = lazy(() =>
  pMinDelay(import("../admin/pages/users/pages/EditUsers"), 500)
);
const Configs = lazy(() => import("../admin/pages/configs/Configs"));
const Crm = lazy(() => import("../admin/pages/crm/Crm"));
const AddClient = lazy(() => import("../admin/pages/crm/pages/AddClient"));
const EditClient = lazy(() => import("../admin/pages/crm/pages/EditClient"));

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
          element={authCheck ? <LayoutDash /> : <Navigate to="/" />}
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

// useEffect(() => {
//   if (!pathname.startsWith("/login") && !pathname.startsWith("/dashboard")) {
//     const pathParts = pathname.split("/");
//     const langFromUrl = pathParts[1];

//     const validLanguages = ["ru", "am", "en"];
//     const cookieLang = cookies.get("i18next") || "am";

//     if (langFromUrl && !validLanguages.includes(langFromUrl)) {
//       i18next.changeLanguage("am");
//       dispatch(setLanguage("am"));
//       // cookies.set("i18next", "am");
//       // cookies.set("lngFlag", "am");
//       window.location.href = `/am${pathname}`;
//     } else if (langFromUrl && langFromUrl !== language) {
//       i18next.changeLanguage(langFromUrl);
//       dispatch(setLanguage(langFromUrl));
//       // cookies.set("i18next", langFromUrl);
//       cookies.set("lngFlag", langFromUrl === "en" ? "gb" : langFromUrl);

//       if (pathname.includes(language)) {
//         window.location.href = `${pathname}`;
//       }
//     } else if (!langFromUrl) {
//       i18next.changeLanguage(cookieLang);
//       window.location.href = `/${cookieLang}${pathname.slice(2)}`;
//     }
//   }
// }, [dispatch, pathname, language, navigate]);
