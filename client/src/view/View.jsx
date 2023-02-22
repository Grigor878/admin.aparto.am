import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../components/Header/Header"
import AutoScroll from "../helpers/autoScroll"
import HelmetAsync from "../components/helmetAsync/HelmetAsync"
import Loading from "../components/loading/Loading"
import Footer from "../components/Footer/Footer"

const View = () => {
    return (
        <Router>
            <Header />
            <AutoScroll />
            <HelmetAsync/>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route exact path="/" />
                    <Route path="/" />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    )
}

export default View