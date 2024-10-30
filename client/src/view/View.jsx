import React, { lazy, Suspense, useEffect } from "react";
import pMinDelay from "p-min-delay";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LayoutMain from "../components/layout/LayoutMain";
import LayoutDash from "../admin/components/layout/LayoutDash";
import { useDispatch, useSelector } from "react-redux";
import AutoScroll from "../helpers/autoScroll";
import { setLanguage } from "../store/slices/homeSlice";
import cookies from "js-cookie";

const Home = lazy(() => pMinDelay(import("../pages/home/Home"), 1000));
const Result = lazy(() => import("../pages/result/Result"));
const ResultById = lazy(() => import("../pages/result/ResultById"));

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
  const navigate = useNavigate();

  // useEffect(() => {
  //   const validLanguages = ["am", "en", "ru"];
  //   const cookieLng = cookies.get("i18next");
  //   const validPath = validLanguages?.includes(language);
  //   const validPathCookie = validLanguages?.includes(cookieLng);

  //   // if (pathname === "/" && validPathCookie) {
  //   //   window.location.href = `/${cookieLng}`;
  //   // }

  //   if (!validPath) {
  //     dispatch(setLanguage("am"));
  //     cookies.set("i18next", "am");
  //     cookies.set("lngFlag", "am");
  //     window.location.href = `/am${pathname}`;
  //   }
  // }, [dispatch, language, navigate, pathname]);

  useEffect(() => {
    if (!pathname.startsWith("/login") && !pathname.startsWith("/dashboard")) {
      const pathParts = pathname.split("/");
      const langFromUrl = pathParts[1];
  
      const validLanguages = ["ru", "am", "en"];
      const cookieLang = cookies.get("i18next") || "am";
  
      if (langFromUrl && !validLanguages.includes(langFromUrl)) {
        dispatch(setLanguage("am"));
        cookies.set("i18next", "am");
        cookies.set("lngFlag", "am");
        window.location.href = `/am${pathname}`;
      } else if (langFromUrl && langFromUrl !== language) {
        dispatch(setLanguage(langFromUrl));
        cookies.set("i18next", langFromUrl);
        cookies.set("lngFlag", langFromUrl === "en" ? "gb" : langFromUrl);
  
        if (pathname.includes(language)) {
          window.location.href = `${pathname}`;
        }
      } else if (!langFromUrl) {
        window.location.href = `/${cookieLang}${pathname.slice(2)}`;
      }
    }
  }, [dispatch, pathname, language, navigate]);
  

  // useEffect(() => {
  //   const pathParts = pathname.split("/");
  //   const langFromUrl = pathParts[1];

  //   if (langFromUrl && langFromUrl !== language) {
  //     dispatch(setLanguage(langFromUrl));
  //     cookies.set("i18next", langFromUrl);
  //     cookies.set("lngFlag", langFromUrl === "en" ? "gb" : langFromUrl);
  //   } else if (!langFromUrl) {
  //     const cookieLang = cookies.get("i18next") || "am";
  //     navigate(`/${cookieLang}${pathname.slice(2)}`, { replace: true });
  //   }
  // }, [dispatch, pathname, language, navigate]);

  return (
    <Suspense fallback={null}>
      <AutoScroll />
      <Routes>
        <Route path={`/${language}`} element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
          <Route path="result/:id" element={<ResultById />} />
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
