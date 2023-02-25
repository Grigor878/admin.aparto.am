import React, { useEffect, Suspense } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../components/header/Header"
import AutoScroll from "../helpers/autoScroll"
import HelmetAsync from "../components/helmetAsync/HelmetAsync"
import Loading from "../components/loading/Loading"
import Footer from "../components/footer/Footer"
const Home = React.lazy(() => import('../pages/home/Home'))
const Rent = React.lazy(() => import('../pages/rent/Rent'))
const SubRent = React.lazy(() => import('../pages/rent/subRent/SubRent'))
const Sale = React.lazy(() => import('../pages/sale/Sale'))
const SubSale = React.lazy(() => import('../pages/sale/subSale/SubSale'))
const Services = React.lazy(() => import('../pages/services/Services'))
const Contact = React.lazy(() => import('../pages/contact/Contact'))
const Admin = React.lazy(() => import('../admin/Admin'))
const NotFound = React.lazy(() => import('../pages/404/NotFound'))

const View = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <Router>
            <Header />
            <AutoScroll />
            <HelmetAsync />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/for-rent" element={<Rent />} />
                    <Route path="/for-rent/:id" element={<SubRent />} />
                    <Route exact path="/for-sale" element={<Sale />} />
                    <Route path="/for-sale/:id" element={<SubSale />} />
                    <Route path="/our-services" element={<Services />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    )
}

export default View