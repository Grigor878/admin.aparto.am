import React, { lazy, Suspense, useEffect } from "react";
import pMinDelay from "p-min-delay";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import i18next from "i18next";
import LayoutMain from "../components/layout/LayoutMain";
import LayoutDash from "../admin/components/layout/LayoutDash";
import { useDispatch, useSelector } from "react-redux";
import AutoScroll from "../helpers/autoScroll";
import { setLanguage } from "../store/slices/homeSlice";
import cookies from "js-cookie";

const Home = lazy(() => pMinDelay(import("../pages/home/Home"), 500));
const Result = lazy(() => import("../pages/result/Result"));
const ResultById = lazy(() => import("../pages/result/ResultById"));
const BuyOrSell = lazy(() => import("../pages/services/BuyOrSell"));
const Rental = lazy(() => import("../pages/services/Rental"));
const Management = lazy(() => import("../pages/services/Management"));
const About = lazy(() => import("../pages/about/About"));
const Contact = lazy(() => import("../pages/contact/Contact"));

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
  const { language } = useSelector((state) => state.home);

  const { pathname } = useLocation();

  const authCheck = isLoggedIn && localStorage.getItem("token") === token;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!pathname.startsWith("/login") && !pathname.startsWith("/dashboard")) {
      const pathParts = pathname.split("/");
      const langFromUrl = pathParts[1];

      const validLanguages = ["ru", "am", "en"];
      const cookieLang = cookies.get("i18next") || "am";

      if (langFromUrl && !validLanguages.includes(langFromUrl)) {
        i18next.changeLanguage("am");
        dispatch(setLanguage("am"));
        window.location.href = `/am${pathname}`;
      } else if (langFromUrl && langFromUrl !== language) {
        i18next.changeLanguage(langFromUrl);
        dispatch(setLanguage(langFromUrl));
        cookies.set("lngFlag", langFromUrl === "en" ? "gb" : langFromUrl);
      } else if (!langFromUrl || langFromUrl !== cookieLang) {
        i18next.changeLanguage(cookieLang);
        dispatch(setLanguage(cookieLang));
        cookies.set("lngFlag", cookieLang === "en" ? "gb" : cookieLang);
        window.location.href = `/${cookieLang}${pathname}`;
      }
    }
  }, [dispatch, pathname, language]);

  return (
    <Suspense fallback={null}>
      <AutoScroll />
      <Routes>
        <Route path={`/${language}`} element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route
            path="result/:type?/:property?/:newbuild?/:commune?"
            // path="result/:type?/:property?/:newbuild?/:commune?/:street?"
            element={<Result />}
          />
          <Route path=":title?/:id" element={<ResultById />} />

          <Route path="services">
            <Route path="buying_selling" element={<BuyOrSell />} />
            <Route path="rental_in_yerevan" element={<Rental />} />
            <Route path="property_management" element={<Management />} />
          </Route>
          
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login">
          <Route
            index
            element={
              authCheck ? <Navigate to="/dashboard/properties" /> : <Login />
            }
          />
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
