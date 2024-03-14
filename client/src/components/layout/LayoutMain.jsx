import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { Loader } from "../loader/Loader";
import Footer from "../footer/Footer";

const LayoutMain = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default LayoutMain;
