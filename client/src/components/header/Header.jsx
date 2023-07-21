import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/imgs/logo.png'
import Size from './components/size/Size'
import Exchange from './components/exchange/Exchange'
import Language from './components/language/Language'
import './Header.scss'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className='header'>
      <div className="contain">
        <nav className='header__nav'>
          <div className='header__left'>
            <Link to='/'>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className='header__right'>
            <NavLink to='/contact-us' className="header__contact">{t("header_services")}</NavLink>
            <NavLink to='/contact-us' className="header__contact">{t("header_contact")}</NavLink>
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