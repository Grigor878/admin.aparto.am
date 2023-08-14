import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import HelmetAsync from "../helmetAsync/HelmetAsync";
import { Loader } from "../loader/Loader";
import Footer from "../footer/Footer";

const LayoutMain = () => {
  return (
    <>
      <Header />
      <HelmetAsync />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default LayoutMain;
