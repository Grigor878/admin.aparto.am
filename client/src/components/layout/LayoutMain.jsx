import React, { useEffect, Suspense } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import HelmetAsync from '../helmetAsync/HelmetAsync'
import { Loader } from "../loader/Loader"
import Footer from '../footer/Footer'

const LayoutMain = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  // const [lang, setLang] = useState(cookies.get("i18next"));

  // const handleLanguageChange = (newLang) => {
  //   setLang(newLang);
  // };

  return (
    <div>
      {/* <Header onLanguageChange={handleLanguageChange} /> */}
      <Header />
      <HelmetAsync />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense >
      <Footer />
    </div>
  )
}

export default LayoutMain