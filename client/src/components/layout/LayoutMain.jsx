import React, { Suspense } from "react"
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import AutoScroll from '../../helpers/autoScroll'
import HelmetAsync from '../helmetAsync/HelmetAsync'
import Loading from "../loading/Loading"
import Footer from '../footer/Footer'

const LayoutMain = () => {
  return (
    <>
      <Header />
      <AutoScroll />
      <HelmetAsync />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense >
      <Footer />
    </>
  )
}

export default LayoutMain