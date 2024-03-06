import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserGlobal } from "../../../store/slices/userGlobalSlice";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import HelmetAdmin from "../../../components/helmetAsync/HelmetAdmin";
import { Loader } from "../../../components/loader/Loader";

const LayoutDash = () => {
  let {pathname} = useLocation();

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
      <HelmetAdmin />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LayoutDash;
