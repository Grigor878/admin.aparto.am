import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import Size from './components/size/Size'
import Exchange from './components/exchange/Exchange'
import Language from './components/language/Language'
import './Header.scss'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className='header'>

      <div className="top__header" style={{ background: "white" }}>
        <div className="conatin">
          <p style={{ marginBottom: "27px", padding: "9px", color: "#4a46f1", textAlign: "center", fontSize: "22px" }}>{t("remont")}</p>
        </div>
      </div>

      <div className="contain">
        <nav className='header__nav'>
          <div className='header__left'>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className='header__right'>
            <a href='#service' className="header__service">{t("header_service")}</a>
            <a href='#contact' className="header__contact">{t("header_contact")}</a>
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