import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import Size from './components/size/Size'
import Exchange from './components/exchange/Exchange'
import Language from './components/language/Language'
import './Header.scss'

const Header = () => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  const headerRef = useRef()

  useEffect(() => {

    const handleScroll = () => {
      const header = headerRef?.current
      if (pathname === "/" && window.scrollY > 0) {
        header.style.background = "#ffffff"
        header.style.borderBottom = "1px solid #e7e9f0"
      } else {
        header.style.background = "#f3f4f8"
        header.style.borderBottom = "1px solid transparent"
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname])

  return (
    <header ref={headerRef} className={pathname === "/" ? 'header' : 'header2'}>
      <div className="contain">
        <nav className='header__nav'>
          <div className='header__left'>
            <Link className='header__left-link' to='/' onClick={() => window.scrollTo(0, 0)}>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className='header__right'>
            {pathname === "/" &&
              <>
                <a href='#service' className="header__service">{t("header_service")}</a>
                <a href='#contact' className="header__contact">{t("header_contact")}</a>
              </>}
            <Size />
            <Exchange />
            <Language />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

// {/* <div className="top__header" style={{ background: "white" }}>
//         <div className="conatin">
//           <p style={{ marginBottom: "27px", padding: "9px", color: "#4a46f1", textAlign: "center", fontSize: "22px" }}>{t("remont")}</p>
//         </div>
//       </div> */}