import React, { useEffect, Suspense } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import HelmetAsync from '../helmetAsync/HelmetAsync'
import { Loader } from "../loader/Loader"
import Footer from '../footer/Footer'
// import Soon from "../../pages/soon/Soon"

const LayoutMain = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      {/* <Soon/> */}
      <Header />
      <HelmetAsync />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense >
      <Footer />
    </>
  )
}

export default LayoutMain