import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { Loader } from "../loader/Loader";
import Footer from "../footer/Footer";

const LayoutMain = () => {
  const { language } = useSelector((state) => state.home);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
