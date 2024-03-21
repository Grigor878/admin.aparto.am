import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserGlobal } from "../../../store/slices/userGlobalSlice";
import { Navigate, useLocation } from "react-router-dom";
import { capitalize } from "../../../helpers/formatters";
import Sidebar from "../sidebar/Sidebar";
import { Loader } from "../../../components/loader/Loader";
import { Outlet } from "react-router-dom";

const LayoutDash = () => {
  const { pathname } = useLocation();

  const newPath = "Aparto | " + capitalize(pathname.substring(1));

  useEffect(() => {
    document.title = newPath;
  }, [newPath]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserGlobal());
  }, [dispatch, pathname]);

  if (pathname === "/dashboard") {
    return <Navigate replace to="/dashboard/properties" />;
  }

  return (
    <div className="dashboard__layout">
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LayoutDash;
