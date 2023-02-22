import React, { useEffect, Suspense } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../components/Header/Header"
import AutoScroll from "../helpers/autoScroll"
import HelmetAsync from "../components/helmetAsync/HelmetAsync"
import Loading from "../components/loading/Loading"
import Footer from "../components/Footer/Footer"
const Admin = React.lazy(() => import('../admin/Admin'))
const Rent = React.lazy(() => import('../pages/rent/Rent'))
const SubRent = React.lazy(() => import('../pages/rent/subRent/SubRent'))
const Sale = React.lazy(() => import('../pages/sale/Sale'))
const SubSale = React.lazy(() => import('../pages/sale/subSale/SubSale'))
const Services = React.lazy(() => import('../pages/services/Services'))
const Contact = React.lazy(() => import('../pages/contact/Contact'))
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
                    <Route exact path="/" />
                    <Route exact path="/for-rent" component={<Rent />} />
                    <Route path="/for-rent/:id" component={<SubRent />} />
                    <Route exact path="/for-sale" component={<Sale />} />
                    <Route path="/for-sale/:id" component={<SubSale />} />
                    <Route path="/our-services" component={<Services />} />
                    <Route path="/contact-us" component={<Contact />} />
                    <Route path="/admin" component={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    )
}

export default View